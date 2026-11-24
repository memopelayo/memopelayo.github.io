/* La configuración está en config.js */

// Un solo evento para el calendario. La hora de fin NO se muestra en la página;
// el calendario necesita una, así que se usan 5 h internas (12:00–17:00).
const EVENTO = {
  titulo: 'Bautizo de José María',
  inicio: '2026-11-28T12:00:00-06:00',
  fin: '2026-11-28T17:00:00-06:00',
  lugar: 'Exconvento de Santa María Magdalena, Av. Libertad Sur 101, Centro, San Martín Texmelucan, Puebla',
  geo: '19.282878;-98.437575',
  detalle: liga => [
    'Ceremonia: 12:00 h en el Exconvento de Santa María Magdalena. Empieza puntual: te recomendamos llegar a las 11:45 h.',
    'Estacionamiento: Gran Plaza La Estación (de pago), a la vuelta de la iglesia.',
    'Recepción: 13:00 h en Jardín Casa Pelayo · https://tinyurl.com/casapelayo',
    '',
    'Invitación: ' + liga,
  ].join('\n'),
};

/* ---------- Cuenta regresiva ---------- */
(function cuenta() {
  const meta = new Date(CONFIG.INICIO).getTime();
  const el = document.getElementById('countdown');
  const fin = document.getElementById('countdown-fin');
  const u = k => el.querySelector(`[data-u="${k}"]`);
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const diff = meta - Date.now();
    if (diff <= 0) {
      el.hidden = true; fin.hidden = false;
      fin.textContent = diff > -1000 * 60 * 60 * 8 ? '¡Hoy es el gran día!' : '¡Gracias por acompañarnos!';
      return;
    }
    const s = Math.floor(diff / 1000);
    u('d').textContent = Math.floor(s / 86400);
    u('h').textContent = pad(Math.floor(s / 3600) % 24);
    u('m').textContent = pad(Math.floor(s / 60) % 60);
    u('s').textContent = pad(s % 60);
    setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();
})();

/* ---------- Calendario (.ics y Google) ---------- */
const utc = iso => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
function googleUrl(e) {
  const p = new URLSearchParams({
    action: 'TEMPLATE', text: e.titulo, dates: `${utc(e.inicio)}/${utc(e.fin)}`,
    details: e.detalle, location: e.lugar, ctz: 'America/Mexico_City',
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}
function icsTexto(id, e) {
  const esc = s => s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Bautizo Jose Maria//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:bautizo-jose-maria-${id}@invitacion`,
    `DTSTAMP:${utc(new Date().toISOString())}`,
    `DTSTART:${utc(e.inicio)}`, `DTEND:${utc(e.fin)}`,
    `SUMMARY:${esc(e.titulo)}`, `LOCATION:${esc(e.lugar)}`, `DESCRIPTION:${esc(e.detalle)}`,
    ...(e.geo ? [`GEO:${e.geo}`] : []),
    'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', 'DESCRIPTION:Mañana es el bautizo de José María', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR', '',
  ].map(plegar).join('\r\n');
}
// RFC 5545: líneas de máximo 75 bytes (continuación con espacio)
function plegar(l) {
  const enc = new TextEncoder(); if (enc.encode(l).length <= 75) return l;
  const out = []; let cur = '', n = 0;
  for (const ch of l) { const b = enc.encode(ch).length; if (n + b > (out.length ? 74 : 75)) { out.push(cur); cur = ''; n = 0; } cur += ch; n += b; }
  out.push(cur); return out.join('\r\n ');
}
function pintarCalendario(liga) {
  const e = { ...EVENTO, detalle: EVENTO.detalle(liga) };
  document.querySelectorAll('[data-cal]').forEach(a => {
    if (a.dataset.cal === 'google') { a.href = googleUrl(e); return; }
    if (a.dataset.url) URL.revokeObjectURL(a.dataset.url);
    a.href = a.dataset.url = URL.createObjectURL(new Blob([icsTexto('evento', e)], { type: 'text/calendar;charset=utf-8' }));
    a.download = 'bautizo-jose-maria.ics';
  });
}
// Cierra el menú de calendario al tocar fuera
document.addEventListener('click', ev => {
  document.querySelectorAll('details.cal[open]').forEach(d => { if (!d.contains(ev.target)) d.open = false; });
});

/* ---------- Envío genérico (simulado o real) ---------- */
async function enviar(endpoint, datos) {
  if (!endpoint) { await new Promise(r => setTimeout(r, 600)); return { ok: true, simulado: true }; }
  if (CONFIG.RSVP_PROVIDER === 'web3forms') {
    const r = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: CONFIG.WEB3FORMS_KEY, subject: 'Bautizo José María: ' + (datos.tipo || 'RSVP'), from_name: 'Invitación bautizo', ...datos }),
    });
    return { ok: r.ok };
  }
  // Google Apps Script: no-cors (la respuesta es opaca, se asume éxito si no hay error de red)
  await fetch(endpoint, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(datos) });
  return { ok: true };
}

/* ---------- RSVP personalizado por familia ---------- */
const sha256 = async txt => new Uint8Array(await crypto.subtle.digest('SHA-256', typeof txt === 'string' ? new TextEncoder().encode(txt) : txt));
const hex = b => Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
async function abrirFamilia(slug) {
  const datos = window.INVITADOS || {};
  const id = 'f' + hex(await sha256('id|' + slug)).slice(0, 16);
  const sobre = datos[id];
  if (!sobre) return null;
  const [iv, ct] = sobre.split('.').map(b64);
  const llave = await sha256('key|' + slug);
  const plano = new Uint8Array(ct.length);
  for (let i = 0, bloque = 0; i < ct.length; bloque++) {
    const sem = new Uint8Array(32 + 16 + 4); sem.set(llave, 0); sem.set(iv, 32);
    new DataView(sem.buffer).setUint32(48, bloque);
    const flujo = await sha256(sem);
    for (let j = 0; j < 32 && i < ct.length; j++, i++) plano[i] = ct[i] ^ flujo[j];
  }
  const d = JSON.parse(new TextDecoder().decode(plano));
  const personas = d.p || [];
  const roles = Array.isArray(d.r) && d.r.length === personas.length ? d.r : personas.map(() => '');
  return { id, slug, grupo: d.f, personas, mesa: d.m, roles };
}

const desdeFecha = f => (f ? Date.now() >= new Date(f + 'T00:00:00-06:00').getTime() : false);
const MODO_GRACIAS = desdeFecha(CONFIG.AGRADECIMIENTO_DESDE);
const familiaPromesa = (async () => {
  const slug = (new URLSearchParams(location.search).get('f') || '').trim().toLowerCase();
  try {
    if (/^[a-z0-9-]{6,60}$/.test(slug)) {
      const fam = await abrirFamilia(slug);
      // Recordar a la familia en este teléfono (para etiquetar sus fotos, también en /fotos/)
      if (fam) try {
        localStorage.setItem('bautizo-familia', JSON.stringify({ id: fam.id, slug: fam.slug, grupo: fam.grupo }));
        localStorage.removeItem('bautizo-familia-no');
      } catch (_) {}
      return fam;
    }
  } catch (_) {}
  return null;
})();

// Calendario: con la liga general y, si abrieron su liga personal, con esa
pintarCalendario(CONFIG.SITIO_URL);
familiaPromesa.then(f => { if (f) pintarCalendario(`${CONFIG.SITIO_URL}?f=${f.slug}`); });

/* ---------- Modo agradecimiento (después del evento) ---------- */
(async function agradecimiento() {
  if (!MODO_GRACIAS) return;
  const $ = id => document.getElementById(id);
  document.body.classList.add('modo-gracias');
  $('hero-normal').hidden = true; $('hero-gracias').hidden = false;
  $('rsvp-t').textContent = 'Gracias';
  $('rsvp-plazo').hidden = true;
  const fam = await familiaPromesa;
  const uno = fam && fam.personas.length === 1;
  if (fam) $('hero-gracias-para').textContent = `Gracias, ${fam.grupo}`;
  if (fam) { $('post-titulo').textContent = '¡Gracias,'; $('post-familia').textContent = `${fam.grupo}!`; $('post-familia').hidden = false; }
  let t = CONFIG.TEXTO_AGRADECIMIENTO;
  if (uno) t = t.replace('Tenerlos', 'Tenerte').replace('tomaron', 'tomaste').replace('las subieran', 'las subieras').replace('quieren', 'quieres');
  $('post-texto').textContent = t.replace('{nombre}', fam ? fam.grupo : '');
  $('post-ejemplo').hidden = !CONFIG.MOSTRAR_EJEMPLO_AGRADECIMIENTO;
  ['rsvp-cargando', 'rsvp-form', 'rsvp-ya'].forEach(id => { $(id).hidden = true; });
  $('rsvp-post').hidden = false; $('rsvp').hidden = false;
})();

(async function rsvp() {
  if (MODO_GRACIAS) return;
  const $ = id => document.getElementById(id);
  const fam = await familiaPromesa;
  // Sin liga personal (o liga inválida): solo información general; la sección de confirmación no existe.
  if (!fam) { $('hero-cta').classList.remove('cta-espera'); return; }

  const estados = ['rsvp-cargando', 'rsvp-form', 'rsvp-ya'];
  const mostrar = id => estados.forEach(e => { $(e).hidden = e !== id; });
  $('rsvp').hidden = false; mostrar('rsvp-cargando');
  const uno = fam.personas.length === 1;
  const plural = (s, p) => (uno ? s : p);
  const rolDe = i => String((fam.roles && fam.roles[i]) || '').toLowerCase();
  const esFijo = i => rolDe(i) === 'padrino' || rolDe(i) === 'madrina';
  const etiquetaRol = rol => rol === 'padrino' ? 'Padrino' : rol === 'madrina' ? 'Madrina' : '';
  function conFijos(lista) {
    const set = new Set(Array.isArray(lista) ? lista : []);
    fam.personas.forEach((n, i) => { if (esFijo(i)) set.add(n); });
    return fam.personas.filter(n => set.has(n));
  }
  $('rsvp-demo').hidden = !!CONFIG.RSVP_ENDPOINT;
  $('hero-para').textContent = `Invitación para ${fam.grupo}`; $('hero-para').hidden = false;
  $('skip').href = '#rsvp'; $('skip').textContent = 'Ir a tu invitación';

  // Parámetros de prueba (solo sin Apps Script): &demo=confirmado, &demo=mesa, &demo=cerrado (se pueden combinar con comas)
  const demo = CONFIG.RSVP_ENDPOINT ? [] : (new URLSearchParams(location.search).get('demo') || '').split(',').map(s => s.trim());
  const verMesa = demo.includes('mesa') || desdeFecha(CONFIG.MOSTRAR_MESA_DESDE) || !CONFIG.MOSTRAR_MESA_DESDE;
  const cierreFam = (CONFIG.CIERRE_EXCEPCIONES || {})[fam.slug] || CONFIG.CIERRE_CONFIRMACION;
  const cerrado = demo.includes('cerrado') || desdeFecha(cierreFam);

  const KEY = 'bautizo-rsvp-' + fam.id;
  const guardada = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch (_) { return null; } };
  // Texto del botón de portada desde el primer momento (sin parpadeo de "Ver detalles")
  if (guardada()) { $('hero-cta').textContent = 'Ver detalles'; $('hero-cta').href = '#evento'; }
  else { $('hero-cta').textContent = uno ? 'Confirmar mi asistencia' : 'Confirmar asistencia'; $('hero-cta').href = '#rsvp'; $('hero-cta').classList.add('btn--barro'); }
  $('hero-cta').classList.remove('cta-espera');

  // Estado en el servidor (también ve lo registrado desde el panel). Máximo 6 s; si falla, se usa lo de este teléfono.
  let servidor = null;
  if (CONFIG.RSVP_ENDPOINT) {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
    try {
      const j = await (await fetch(`${CONFIG.RSVP_ENDPOINT}?action=estado&id=${fam.id}`, { signal: ctl.signal })).json();
      if (j && j.ok) servidor = j;
    } catch (_) {} finally { clearTimeout(t); }
  } else if (demo.includes('confirmado') || (demo.includes('mesa') && !demo.includes('cerrado'))) {
    servidor = { ok: true, confirmado: true, confirmados: fam.personas.length, mesa: fam.mesa || '' };
  }
  const mesa = servidor && servidor.mesa != null && servidor.mesa !== '' ? String(servidor.mesa) : (fam.mesa || '');

  function pintarListo(tipo, asistenN, opts = {}) {
    // tipo: 'confirmado' | 'cerrado'
    const nadie = tipo === 'confirmado' && asistenN === 0;
    $('rsvp-t').textContent = tipo === 'cerrado' ? 'Confirmación' : plural('Tu confirmación', 'Su confirmación');
    $('rsvp-plazo').hidden = true;
    if (tipo === 'cerrado') {
      $('ya-titulo').textContent = '¡Hola!';
      $('ya-texto').textContent = 'La confirmación ya cerró. Si tienes dudas, escríbenos por WhatsApp.';
    } else if (opts.actualizado) {
      $('ya-titulo').textContent = plural('¡Listo! Actualizamos tu confirmación', '¡Listo! Actualizamos su confirmación');
      $('ya-texto').textContent = nadie
        ? plural('¡Te vamos a extrañar!', '¡Los vamos a extrañar!')
        : `${plural('Te', 'Los')} esperamos el sábado 28 de noviembre. Recuerda llegar a las 11:45 h.`;
    } else if (nadie) {
      $('ya-titulo').textContent = 'Gracias por avisarnos';
      $('ya-texto').textContent = plural('¡Te vamos a extrañar!', '¡Los vamos a extrañar!');
    } else {
      $('ya-titulo').textContent = '¡Gracias por confirmar!';
      $('ya-texto').textContent = `${plural('Te', 'Los')} esperamos el sábado 28 de noviembre. Recuerda llegar a las 11:45 h.`;
    }
    const conMesa = !nadie && verMesa && !!mesa;
    $('mesa-etiqueta').textContent = plural('Tu mesa es la', 'Su mesa es la');
    $('mesa-numero').textContent = conMesa ? mesa : '';
    $('rsvp-mesa').hidden = !conMesa;
    const pronto = tipo === 'confirmado' && !nadie && !conMesa;
    $('mesa-pronto').textContent = verMesa
      ? plural('Tu número de mesa aparecerá aquí muy pronto.', 'Su número de mesa aparecerá aquí muy pronto.')
      : plural('Tu número de mesa aparecerá aquí a partir del viernes 27 de noviembre.', 'Su número de mesa aparecerá aquí a partir del viernes 27 de noviembre.');
    $('mesa-pronto').hidden = !pronto;
    const puedeCambiar = tipo === 'confirmado' && !cerrado;
    const btnTxt = uno ? 'Modificar mi confirmación' : 'Modificar mis invitados';
    $('ya-cambiar').textContent = btnTxt;
    $('ya-cambiar').setAttribute('aria-label', btnTxt);
    $('ya-cambiar-plazo').textContent = uno
      ? 'Puedes modificarla hasta el martes 24 de noviembre.'
      : 'Puedes modificarlos hasta el martes 24 de noviembre.';
    $('ya-cambiar').hidden = !puedeCambiar;
    $('ya-cambiar-plazo').hidden = !puedeCambiar;
    $('ya-mas').hidden = tipo !== 'confirmado';
    if (puedeCambiar) {
      $('ya-ayuda').hidden = true;
    } else if (tipo === 'confirmado') {
      $('ya-ayuda').textContent = 'Si necesitas cambiar algo, escríbenos por WhatsApp.';
      $('ya-ayuda').hidden = false;
    } else {
      $('ya-ayuda').hidden = true;
    }
    if (conMesa) {
      $('hero-cta').textContent = plural('Ver mi mesa', 'Ver su mesa');
      $('hero-cta').href = '#rsvp';
    } else {
      $('hero-cta').textContent = 'Ver detalles';
      $('hero-cta').href = '#evento';
    }
    $('hero-cta').classList.remove('btn--barro');
    $('rsvp').classList.add('rsvp--listo');
    mostrar('rsvp-ya');
  }

  // El formulario se arma siempre, por si quieren cambiar su respuesta después de confirmar.
  $('rsvp-hola').textContent = `${fam.grupo}!`;
  $('rsvp-lugares').hidden = uno;
  $('rsvp-lugares').textContent = uno ? '' : `Les reservamos ${fam.personas.length} lugares`;
  $('rsvp-instr').textContent = uno ? '' : 'Todos aparecen como “asiste”. Solo desmarca a quien no podrá ir:';
  const lista = $('rsvp-personas');
  if (!uno) {
    fam.personas.forEach((n, i) => {
      const li = document.createElement('li');
      const fijo = esFijo(i);
      const rol = rolDe(i);
      li.innerHTML = `<label class="persona${fijo ? ' persona--fijo' : ''}"><input type="checkbox" checked name="p${i}"${fijo ? ' disabled' : ''}><span class="persona__nombre"></span><span class="persona__estado" aria-hidden="true"></span></label>`;
      li.querySelector('.persona__nombre').textContent = n;
      if (fijo) {
        const input = li.querySelector('input');
        input.setAttribute('aria-disabled', 'true');
        input.setAttribute('aria-label', `${n}, ${etiquetaRol(rol)}, confirmado`);
      }
      lista.append(li);
    });
  }
  const form = $('rsvp-form');
  form.classList.toggle('rsvp-form--uno', uno);
  $('rsvp-grupo').hidden = uno;
  $('rsvp-conteo').hidden = uno;
  $('rsvp-no').hidden = !uno;
  // Para una sola persona: el botón principal confirma asistencia; "No podré asistir" manda asisten=[].
  let intencion = 'si';
  const leer = () => {
    if (uno) {
      const n = fam.personas[0];
      return intencion === 'si' ? { asisten: [n], no: [] } : { asisten: [], no: [n] };
    }
    const asisten = [], no = [];
    fam.personas.forEach((n, i) => ((esFijo(i) || form[`p${i}`].checked) ? asisten : no).push(n));
    return { asisten, no };
  };
  function actualizar() {
    if (uno) {
      $('rsvp-conteo').textContent = '';
      $('rsvp-enviar').textContent = 'Confirmar mi asistencia';
      $('rsvp-enviar').setAttribute('aria-label', 'Confirmar mi asistencia');
      $('rsvp-no').disabled = false;
      $('rsvp-no').textContent = 'No podré asistir';
      return;
    }
    const { asisten } = leer();
    form.querySelectorAll('.persona').forEach((l, i) => {
      const rol = rolDe(i);
      const ok = esFijo(i) || l.querySelector('input').checked;
      l.classList.toggle('no', !ok);
      l.querySelector('.persona__estado').textContent = etiquetaRol(rol) || (ok ? 'Asiste' : 'No podrá ir');
    });
    $('rsvp-conteo').textContent = asisten.length
      ? `Confirman ${asisten.length} de ${fam.personas.length} ${fam.personas.length === 1 ? 'lugar' : 'lugares'}`
      : 'Nos avisan que nadie podrá venir';
    $('rsvp-enviar').textContent = asisten.length ? 'Confirmar' : 'Confirmar que no podremos ir';
  }
  form.addEventListener('change', actualizar);

  function rellenar(prev) {
    if (!uno) {
      fam.personas.forEach((n, i) => {
        // Lista guardada en este teléfono: se respeta quién asiste. Si solo hay estado del servidor, todos quedan marcados.
        // Padrino/madrina siempre asisten, aunque una respuesta anterior no los traiga.
        form[`p${i}`].checked = esFijo(i) || !(prev && Array.isArray(prev.asisten)) || prev.asisten.includes(n);
      });
    }
    form.mensaje.value = (prev && typeof prev.mensaje === 'string') ? prev.mensaje : '';
    const btn = $('rsvp-enviar'); btn.disabled = false;
    actualizar();
  }

  function mostrarFormulario(prev) {
    $('rsvp-t').textContent = 'Confirma tu asistencia';
    $('rsvp-plazo').hidden = false;
    $('rsvp').classList.remove('rsvp--listo');
    $('hero-cta').textContent = uno ? 'Confirmar mi asistencia' : 'Confirmar asistencia';
    $('hero-cta').href = '#rsvp';
    $('hero-cta').classList.add('btn--barro');
    intencion = 'si';
    rellenar(prev);
    mostrar('rsvp-form');
  }

  let yaConfirmado = !!(guardada() || (servidor && servidor.confirmado));
  $('ya-cambiar').addEventListener('click', () => {
    mostrarFormulario(guardada());
    $('rsvp-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $('rsvp-enviar').addEventListener('click', () => { intencion = 'si'; });
  $('rsvp-no').addEventListener('click', () => {
    intencion = 'no';
    form.requestSubmit();
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const { asisten, no } = leer();
    const r = { fecha: new Date().toISOString(), asisten, no, mensaje: form.mensaje.value.trim() };
    const datos = {
      id: fam.id, familia: fam.grupo, lugares: fam.personas.length,
      confirmados: asisten.length, no_asisten_total: no.length,
      asisten: asisten.join(', '), no_asisten: no.join(', '), mensaje: r.mensaje, enviado: r.fecha,
    };
    const btn = $('rsvp-enviar'); const btnNo = $('rsvp-no');
    btn.disabled = true; btn.textContent = 'Enviando…';
    if (uno) { btnNo.disabled = true; }
    try {
      const res = await enviar(CONFIG.RSVP_ENDPOINT, datos);
      if (!res.ok) throw new Error('envío');
      try { localStorage.setItem(KEY, JSON.stringify(r)); } catch (_) {}
      const actualizado = yaConfirmado;
      yaConfirmado = true;
      pintarListo('confirmado', asisten.length, { actualizado }); $('rsvp-ya').focus();
    } catch (_) {
      alert('No pudimos enviar tu confirmación. Revisa tu conexión e inténtalo de nuevo.');
      btn.disabled = false; actualizar();
    }
  });

  const local = guardada();
  if ((servidor && servidor.confirmado) || local) {
    let n;
    if (local && Array.isArray(local.asisten)) n = conFijos(local.asisten).length;
    else if (servidor && servidor.confirmado) n = Number(servidor.confirmados);
    if (n == null || isNaN(n)) n = Math.max(fam.personas.filter((_, i) => esFijo(i)).length, 1);
    pintarListo('confirmado', n);
    return;
  }
  if (cerrado) { pintarListo('cerrado'); return; }
  mostrarFormulario(null);
})();

/* ---------- Buenos deseos ---------- */
(function deseos() {
  const form = document.getElementById('deseo-form');
  const lista = document.getElementById('deseos-lista');
  const KEY = 'bautizo-deseos';
  const leer = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) { return []; } };
  function pintar() {
    const items = leer();
    lista.replaceChildren();
    if (!items.length) {
      const li = document.createElement('li'); li.className = 'vacio';
      li.textContent = 'Aún no hay mensajes. ¡Sé el primero en dejarle uno!'; lista.append(li); return;
    }
    items.slice().reverse().forEach(it => {
      const li = document.createElement('li');
      const q = document.createElement('blockquote'); q.textContent = it.mensaje;
      const c = document.createElement('cite'); c.textContent = '— ' + it.nombre;
      li.append(q, c); lista.append(li);
    });
  }
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const nombre = form.nombre.value.trim(), mensaje = form.mensaje.value.trim();
    const mal = !nombre || !mensaje;
    document.getElementById('e-deseo').hidden = !mal;
    form.nombre.classList.toggle('invalido', !nombre); form.mensaje.classList.toggle('invalido', !mensaje);
    if (mal) return;
    await enviar(CONFIG.DESEOS_ENDPOINT, { tipo: 'Buen deseo', nombre, mensaje, fecha_envio: new Date().toISOString() });
    const items = leer(); items.push({ nombre, mensaje });
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (_) {}
    form.reset(); pintar();
  });
  pintar();
})();

/* ---------- Mapa interactivo (Leaflet + OSM), se carga al acercarse ---------- */
(function mapa() {
  const el = document.getElementById('mapa');
  if (!el) return;
  const PUNTOS = {
    iglesia: { lat: 19.282878, lng: -98.437575, titulo: 'Exconvento de Santa María Magdalena', sub: 'Ceremonia · 12:00 h (llega 11:45 h)',
      url: 'https://www.google.com/maps/search/?api=1&query=Exconvento%20de%20Santa%20Mar%C3%ADa%20Magdalena%2C%20San%20Mart%C3%ADn%20Texmelucan' },
    estacionamiento: { lat: 19.282709, lng: -98.438242, titulo: 'Estacionamiento recomendado (de pago)', sub: 'Plaza La Estación · Calle Mújica y Osorio',
      url: 'https://www.google.com/maps/search/?api=1&query=19.282709%2C-98.438242' },
  };
  function iniciar() {
    if (!window.L || el.dataset.listo) return;
    el.dataset.listo = '1';
    const m = L.map(el, { scrollWheelZoom: false, tap: true }).setView([19.28282, -98.43790], 18);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; colaboradores de <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(m);
    const icono = (cls, txt) => L.divIcon({ className: '', html: `<div class="pin ${cls}">${txt}</div>`, iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -16] });
    const pop = p => `<strong>${p.titulo}</strong><br>${p.sub}<br><a href="${p.url}" target="_blank" rel="noopener">Abrir en Google Maps</a>`;
    L.marker([PUNTOS.iglesia.lat, PUNTOS.iglesia.lng], { icon: icono('pin--iglesia', '✝'), title: 'Iglesia', alt: 'Iglesia' }).addTo(m).bindPopup(pop(PUNTOS.iglesia));
    L.marker([PUNTOS.estacionamiento.lat, PUNTOS.estacionamiento.lng], { icon: icono('pin--p', 'P'), title: 'Estacionamiento', alt: 'Estacionamiento' }).addTo(m).bindPopup(pop(PUNTOS.estacionamiento));
    m.fitBounds([[PUNTOS.iglesia.lat, PUNTOS.iglesia.lng], [PUNTOS.estacionamiento.lat, PUNTOS.estacionamiento.lng]], { padding: [70, 70], maxZoom: 18 });
  }
  const arrancar = () => { if (window.L) iniciar(); else window.addEventListener('load', iniciar, { once: true }); };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); arrancar(); } }, { rootMargin: '400px' });
    io.observe(el);
  } else arrancar();
})();

/* ---------- Carta cápsula (privada, nunca se muestra en la página) ---------- */
(function capsula() {
  const $ = id => document.getElementById(id);
  const form = $('capsula-form'), gracias = $('capsula-gracias');
  const endpoint = CONFIG.CARTAS_ENDPOINT || CONFIG.RSVP_ENDPOINT;
  $('capsula-demo').hidden = !!endpoint;
  form.carta.addEventListener('input', () => { $('c-cuenta').textContent = `${form.carta.value.length} / 8000`; });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const nombre = form.nombre.value.trim(), carta = form.carta.value.trim();
    const mal = !nombre || !carta;
    $('e-capsula').hidden = !mal;
    form.nombre.classList.toggle('invalido', !nombre); form.carta.classList.toggle('invalido', !carta);
    if (mal) return;
    const fam = await familiaPromesa;
    const btn = $('capsula-enviar'); btn.disabled = true; btn.textContent = 'Guardando…';
    try {
      const r = await enviar(endpoint, { tipo: 'Carta cápsula', nombre, carta, familia: fam ? fam.grupo : '', id: fam ? fam.id : '', enviado: new Date().toISOString() });
      if (!r.ok) throw new Error('envío');
      $('capsula-gracias-texto').textContent = `Gracias, ${nombre.split(' ')[0]}. Tu carta quedó guardada y José María la leerá cuando cumpla 18 años.`;
      form.reset(); $('c-cuenta').textContent = '0 / 8000';
      form.hidden = true; gracias.hidden = false; gracias.focus();
    } catch (_) {
      alert('No pudimos guardar tu carta. Revisa tu conexión e inténtalo de nuevo.');
    } finally { btn.disabled = false; btn.textContent = 'Guardar mi carta'; }
  });
  $('capsula-otra').addEventListener('click', () => { gracias.hidden = true; form.hidden = false; form.nombre.focus(); });
})();

/* ---------- Accesos rápidos: barra inferior en móvil ---------- */
(function accesos() {
  const barra = document.getElementById('barra');
  const hero = document.getElementById('inicio');
  const visor = document.getElementById('visor');
  let pasoPortada = false, escribiendo = false;
  const pintar = () => { barra.hidden = !pasoPortada || escribiendo || (visor && visor.open); };
  new IntersectionObserver(es => { pasoPortada = !es[0].isIntersecting; pintar(); }, { threshold: 0, rootMargin: '-60% 0px 0px 0px' }).observe(hero);
  // con el teclado abierto (input con foco) la barra se esconde
  const esCampo = el => el && el.matches && el.matches('input:not([type=checkbox]):not([type=radio]):not([type=file]), textarea, select');
  document.addEventListener('focusin', e => { if (esCampo(e.target)) { escribiendo = true; pintar(); } });
  document.addEventListener('focusout', e => { if (esCampo(e.target)) { escribiendo = false; setTimeout(pintar, 120); } });
  // lightbox de fotos
  if (visor) {
    new MutationObserver(pintar).observe(visor, { attributes: true, attributeFilter: ['open'] });
    visor.addEventListener('close', pintar);
  }
  // resaltar la sección que se está viendo
  const items = [...barra.querySelectorAll('[data-sec]')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    const it = items.find(i => i.dataset.sec === e.target.id);
    if (it) it.classList.toggle('activo', e.isIntersecting);
  }), { rootMargin: '-45% 0px -45% 0px' });
  items.forEach(i => { const s = document.getElementById(i.dataset.sec); if (s) io.observe(s); });

  // Al tocar un acceso: bajar a la sección y corregir si las fotos (que cargan al pasar) movieron la página
  document.querySelectorAll('.accesos a, .barra a, .rsvp-mas a').forEach(a => a.addEventListener('click', ev => {
    const id = a.getAttribute('href').slice(1), dest = document.getElementById(id);
    if (!dest) return;
    ev.preventDefault();
    history.pushState(null, '', '#' + id);
    dest.scrollIntoView({ behavior: 'smooth', block: 'start' });
    let tocado = false; const parar = () => { tocado = true; };
    ['touchstart', 'wheel', 'keydown', 'focusin'].forEach(t => window.addEventListener(t, parar, { once: true, passive: true }));
    [900, 1600, 2400].forEach(ms => setTimeout(() => {
      if (tocado) return;
      const top = dest.getBoundingClientRect().top;
      const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (Math.abs(top) > 8 && !(top > 0 && alFinal)) dest.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, ms));
  }));
})();

/* ---------- Clima del sábado (Open-Meteo, sin clave). Si falla o aún no hay pronóstico, no se muestra ---------- */
(function clima() {
  const caja = document.getElementById('clima');
  if (!caja || !window.fetch) return;
  const DIA = '2026-11-28';
  const hoy = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City' }).format(new Date());
  if (hoy > DIA) return;                       // después del evento: nada
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=19.2829&longitude=-98.4376'
    + '&hourly=temperature_2m,precipitation_probability,weather_code&timezone=America%2FMexico_City'
    + `&start_date=${DIA}&end_date=${DIA}`;
  const ICONOS = {
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    nubes: '<path d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6 1.2A3.4 3.4 0 0 0 7 18z"/>',
    lluvia: '<path d="M7 14.5h10a3.6 3.6 0 0 0 .4-7.2 5 5 0 0 0-9.6 1.1A3.1 3.1 0 0 0 7 14.5z"/><path d="M8.5 17.5l-1 2.5M12.5 17.5l-1 2.5M16.5 17.5l-1 2.5"/>',
  };
  const svg = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">${ICONOS[k]}</svg>`;
  const ctl = new AbortController(); setTimeout(() => ctl.abort(), 8000);
  fetch(url, { signal: ctl.signal }).then(r => r.ok ? r.json() : null).then(d => {
    const h = d && d.hourly; if (!h || !h.time) return;
    const fila = hr => { const i = h.time.indexOf(`${DIA}T${hr}:00`); return i < 0 ? null : { t: h.temperature_2m[i], p: h.precipitation_probability[i], c: h.weather_code[i] }; };
    const evento = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21'].map(fila).filter(x => x && x.t != null);
    const medio = fila('12');
    if (!medio || medio.t == null || evento.length < 6) return;
    const r = n => Math.round(n);
    const tarde = ['17', '18', '19', '20', '21'].map(fila).filter(x => x && x.t != null);
    const minTarde = Math.min(...(tarde.length ? tarde : evento).map(x => x.t));
    const lluvia = Math.max(...evento.map(x => x.p || 0));
    const llueve = evento.some(x => x.c >= 51);
    const icono = (lluvia >= 50 || llueve) ? 'lluvia' : (medio.c <= 1 ? 'sol' : 'nubes');
    let tip;
    const frio = minTarde <= 12, fresco = minTarde <= 16;
    if (lluvia >= 50) tip = frio ? 'Lleva chamarra y paraguas: se espera lluvia y hará frío.' : 'Lleva paraguas y un suéter ligero.';
    else if (frio) tip = lluvia >= 25 ? 'Lleva chamarra para la tarde y, por si acaso, un paraguas.' : 'Lleva chamarra: en la tarde hace frío.';
    else if (fresco) tip = 'Lleva un suéter para la tarde.';
    else tip = 'Ropa ligera está bien; un suéter delgado para la noche no sobra.';
    document.getElementById('clima-icono').innerHTML = svg(icono);
    document.getElementById('clima-mediodia').textContent = `${r(medio.t)} °C`;
    document.getElementById('clima-tarde').textContent = `${r(minTarde)} °C`;
    document.getElementById('clima-lluvia').textContent = `${r(lluvia)} %`;
    document.getElementById('clima-tip').innerHTML = `${tip}<small class="clima__fuente">San Martín Texmelucan · Open-Meteo, puede cambiar</small>`;
    caja.hidden = false;
  }).catch(() => {});
})();
