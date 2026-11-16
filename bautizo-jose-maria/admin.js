/* Panel privado de invitados. La seguridad la pone el Apps Script (revisa la clave en cada llamada). */
(function () {
  const $ = id => document.getElementById(id);
  const DEMO = !CONFIG.RSVP_ENDPOINT;
  const KEY_LS = 'bautizo-admin-key';
  let datos = null, filtro = 'todas', abierto = {};

  /* ---------------- Datos de demostración ---------------- */
  const SEMILLA = [
    { id: 'fdemo000000000001', familia: 'Familia Ejemplo Uno', mesa: '7', telefono: '522220000001', personas: ['EJEMPLO Juan Pérez', 'EJEMPLO Ana López', 'EJEMPLO Sofía Pérez'],
      respuesta: { asisten: ['EJEMPLO Juan Pérez', 'EJEMPLO Ana López'], mensaje: 'Sofía tiene escuela ese día', origen: 'web', fecha: '2026-11-15T20:59:00-06:00' } },
    { id: 'fdemo000000000002', familia: 'Familia Ejemplo Dos', mesa: '', telefono: '', personas: ['EJEMPLO Carlos Ruiz', 'EJEMPLO Marta Díaz'], respuesta: null },
    { id: 'fdemo000000000003', familia: 'EJEMPLO Tía Lupita', mesa: '', telefono: '522220000003', personas: ['EJEMPLO Guadalupe Torres'], respuesta: null },
    { id: 'fdemo000000000004', familia: 'Familia Ejemplo Cuatro', mesa: '3', telefono: '522220000004', personas: ['EJEMPLO Luis Gómez', 'EJEMPLO Rosa Ortiz', 'EJEMPLO Pablo Gómez', 'EJEMPLO Inés Gómez'],
      respuesta: { asisten: ['EJEMPLO Luis Gómez', 'EJEMPLO Rosa Ortiz', 'EJEMPLO Pablo Gómez', 'EJEMPLO Inés Gómez'], mensaje: '', origen: 'web', fecha: '2026-11-14T18:10:00-06:00' } },
    { id: 'fdemo000000000005', familia: 'EJEMPLO Tíos Abuelos', mesa: '', telefono: '522220000005', personas: ['EJEMPLO Tío Ramón', 'EJEMPLO Tía Chela'], respuesta: null },
    { id: 'fdemo000000000006', familia: 'Familia Ejemplo Seis', mesa: '', telefono: '', personas: ['EJEMPLO Diego Mora', 'EJEMPLO Paty Mora'],
      respuesta: { asisten: [], mensaje: 'Estaremos fuera de la ciudad', origen: 'web', fecha: '2026-11-13T09:30:00-06:00' } },
  ];
  function demoCargar() {
    try { const g = JSON.parse(localStorage.getItem('bautizo-admin-demo')); if (g) return g; } catch (_) {}
    return JSON.parse(JSON.stringify(SEMILLA));
  }
  function demoCalcular(fams) {
    const familias = fams.map(f => {
      const lugares = f.personas.length; let r = null, estado = 'pendiente';
      if (f.respuesta) {
        const a = f.respuesta.asisten, no = f.personas.filter(n => !a.includes(n));
        r = { fecha: f.respuesta.fecha, confirmados: a.length, noTotal: no.length, asisten: a.join(', '), noAsisten: no.join(', '), mensaje: f.respuesta.mensaje, origen: f.respuesta.origen };
        estado = a.length >= lugares ? 'confirmó' : (a.length === 0 ? 'no asisten' : 'parcial');
      }
      return { id: f.id, familia: f.familia, lugares, mesa: f.mesa, personas: f.personas, telefono: f.telefono,
        liga: `${CONFIG.SITIO_URL}?f=ejemplo-${f.id.slice(-4)}`, estado, respuesta: r };
    });
    const t = { lugares: 0, confirmados: 0, noAsisten: 0, pendientes: 0, familiasPendientes: 0 };
    familias.forEach(f => { t.lugares += f.lugares; if (f.respuesta) { t.confirmados += f.respuesta.confirmados; t.noAsisten += f.respuesta.noTotal; } else { t.pendientes += f.lugares; t.familiasPendientes++; } });
    return { ok: true, familias, totales: t, generado: new Date().toISOString() };
  }
  async function demoApi(action, d) {
    await new Promise(r => setTimeout(r, 250));
    const fams = demoCargar();
    const f = fams.find(x => x.id === d.id);
    if (action === 'saveAdmin' && f) f.respuesta = { asisten: d.asisten, mensaje: d.nota, origen: 'admin', fecha: new Date().toISOString() };
    if (action === 'setMesa' && f) f.mesa = d.mesa;
    localStorage.setItem('bautizo-admin-demo', JSON.stringify(fams));
    return demoCalcular(fams);
  }

  /* ---------------- API ---------------- */
  async function api(action, d = {}) {
    const key = localStorage.getItem(KEY_LS) || '';
    if (DEMO) return demoApi(action, d);
    // text/plain evita la "preflight" de CORS; Apps Script lee el JSON de postData.contents
    const r = await fetch(CONFIG.RSVP_ENDPOINT, { method: 'POST', body: JSON.stringify({ key, action, ...d }) });
    const j = await r.json();
    if (j.auth === false) { localStorage.removeItem(KEY_LS); mostrarLogin(j.error); throw new Error(j.error); }
    if (!j.ok) throw new Error(j.error || 'Error');
    return j;
  }

  /* ---------------- Mensajes de WhatsApp ---------------- */
  const esUno = f => f.personas.length === 1;
  const saludo = f => f.familia;
  const MSG = {
    invitacion: f => esUno(f)
      ? `¡Hola, ${saludo(f)}! 🤍\n\nCon mucho cariño te invitamos al bautizo de nuestro hijo *José María* el *sábado 28 de noviembre*.\n\n⛪ Ceremonia: 12:00 h en el Exconvento de Santa María Magdalena, San Martín Texmelucan. Empieza puntual, así que te pedimos llegar a las 11:45 h.\n🌿 Recepción: 13:00 h en Jardín Casa Pelayo.\n\nTe reservamos *1 lugar*. Confírmanos a más tardar el *miércoles 18 de noviembre* en tu liga personal:\n${f.liga}\n\nAhí también vienen la ubicación y dónde estacionarte. ¡Nos encantará verte!\nViridiana y Guillermo`
      : `¡Hola, ${saludo(f)}! 🤍\n\nCon mucho cariño los invitamos al bautizo de nuestro hijo *José María* el *sábado 28 de noviembre*.\n\n⛪ Ceremonia: 12:00 h en el Exconvento de Santa María Magdalena, San Martín Texmelucan. Empieza puntual, así que les pedimos llegar a las 11:45 h.\n🌿 Recepción: 13:00 h en Jardín Casa Pelayo.\n\nLes reservamos *${f.lugares} lugares*. Confírmennos a más tardar el *miércoles 18 de noviembre* en su liga personal:\n${f.liga}\n\nAhí solo tienen que marcar si alguien no podrá ir. También vienen la ubicación y dónde estacionarse. ¡Nos encantará verlos!\nViridiana y Guillermo`,
    mesa: f => esUno(f)
      ? `Hola, ${saludo(f)}: tu mesa es la ${f.mesa}. Te esperamos el sábado 28, la misa es a las 12:00 (llega a las 11:45). Tu liga: ${f.liga}`
      : `Hola, ${saludo(f)}: su mesa es la ${f.mesa}. Los esperamos el sábado 28, la misa es a las 12:00 (lleguen a las 11:45). Su liga: ${f.liga}`,
    recordatorio: f => esUno(f)
      ? `¡Hola, ${saludo(f)}! 🤍 Te recordamos confirmar tu asistencia al bautizo de José María (sábado 28 de noviembre). Es muy rápido: abre tu liga y, si no puedes venir, desmarca tu nombre. Te agradeceremos hacerlo a más tardar el miércoles 18 de noviembre:\n${f.liga}\n¡Gracias! Viridiana y Guillermo`
      : `¡Hola, ${saludo(f)}! 🤍 Les recordamos confirmar su asistencia al bautizo de José María (sábado 28 de noviembre). Es muy rápido: abran su liga y solo desmarquen a quien no pueda ir. Les agradeceremos hacerlo a más tardar el miércoles 18 de noviembre:\n${f.liga}\n¡Gracias! Viridiana y Guillermo`,
  };
  const tel = t => { let d = String(t || '').replace(/\D/g, ''); if (d.length === 10) d = '52' + d; return d.length >= 11 ? d : ''; };
  const waUrl = (f, tipo) => `https://wa.me/${tel(f.telefono)}?text=${encodeURIComponent(MSG[tipo](f))}`.replace('https://wa.me/?', 'https://wa.me/?');

  /* ---------------- Interfaz ---------------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const toast = t => { const el = $('toast'); el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { el.hidden = true; }, 2600); };
  const fechaCorta = iso => { try { return new Date(iso).toLocaleString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'America/Mexico_City' }); } catch (_) { return ''; } };
  const ESTADO = { 'pendiente': ['Pendiente', 'pendiente'], 'confirmó': ['Confirmó', 'confirmó'], 'parcial': ['Parcial', 'parcial'], 'no asisten': ['No asisten', 'no'] };

  function mostrarLogin(err) {
    $('panel').hidden = true; $('salir').hidden = true; $('login').hidden = false;
    $('login-error').hidden = !err; $('login-error').textContent = err || '';
    $('clave').focus();
  }

  function pintarTotales() {
    const t = datos.totales;
    $('totales').innerHTML = `
      <div class="adm-total"><b>${t.confirmados}</b><span>Confirmados</span><small>de ${t.lugares} lugares</small></div>
      <div class="adm-total"><b>${t.noAsisten}</b><span>No asisten</span></div>
      <div class="adm-total"><b>${t.pendientes}</b><span>Pendientes</span><small>${t.familiasPendientes} ${t.familiasPendientes === 1 ? 'familia' : 'familias'}</small></div>`;
    $('actualizado').textContent = 'Actualizado ' + fechaCorta(datos.generado);
  }

  function tarjeta(f) {
    const [etq, cls] = ESTADO[f.estado];
    const r = f.respuesta;
    const conf = r ? r.confirmados : 0;
    const asisten = r ? r.asisten.split(',').map(s => s.trim()).filter(Boolean) : f.personas;
    const ab = abierto[f.id] || '';
    const sinMesa = !f.mesa;
    return `<li class="fam" data-id="${esc(f.id)}">
      <div class="fam__cab">
        <div style="flex:1">
          <p class="fam__nombre">${esc(f.familia)}</p>
          <p class="fam__meta">${r ? `${conf} de ${f.lugares} confirmados` : `${f.lugares} ${f.lugares === 1 ? 'lugar' : 'lugares'}, sin respuesta`}${f.mesa ? ` · Mesa ${esc(f.mesa)}` : ''}${f.telefono ? '' : ' · sin teléfono'}</p>
        </div>
        <span class="estado estado--${cls}">${etq}</span>
      </div>
      ${r && r.noAsisten ? `<p class="fam__no">No asisten: ${esc(r.noAsisten)}</p>` : ''}
      ${r && r.mensaje ? `<p class="fam__nota">“${esc(r.mensaje)}”${r.origen === 'admin' ? ' · registrado desde el panel' : ''} · ${fechaCorta(r.fecha)}</p>` : ''}
      <div class="fam__acciones">
        <button type="button" data-abrir="resp">${r ? 'Cambiar respuesta' : 'Registrar respuesta'}</button>
        <button type="button" data-abrir="mesa">Mesa</button>
        ${filtro === 'pendiente' && !r ? `<a class="wa" href="${waUrl(f, 'recordatorio')}" target="_blank" rel="noopener">Recordatorio</a>` : ''}
        <button type="button" class="wa" data-abrir="wa">WhatsApp</button>
      </div>
      ${ab === 'resp' ? `<form class="fam__panel" data-form="resp">
          <ul class="personas">${f.personas.map((n, i) => `<li><label class="persona${asisten.includes(n) ? '' : ' no'}"><input type="checkbox" name="p${i}" value="${esc(n)}" ${asisten.includes(n) ? 'checked' : ''}><span class="persona__nombre">${esc(n)}</span><span class="persona__estado">${asisten.includes(n) ? 'Asiste' : 'No asiste'}</span></label></li>`).join('')}</ul>
          <div class="fam__fila"><input name="nota" value="Registrado por Guillermo" aria-label="Nota"></div>
          <button class="btn btn--solido btn--ancho" type="submit">Guardar respuesta</button>
        </form>` : ''}
      ${ab === 'mesa' ? `<form class="fam__panel" data-form="mesa">
          <label class="fam__fila"><span>Mesa</span><input name="mesa" value="${esc(f.mesa)}" inputmode="numeric" maxlength="10" placeholder="Ej. 7"><button class="btn btn--solido" type="submit">Guardar</button></label>
          <p class="ayuda">La familia la verá en su liga a partir del ${esc(CONFIG.MOSTRAR_MESA_DESDE || 'momento de guardarla')}.</p>
        </form>` : ''}
      ${ab === 'wa' ? `<div class="fam__panel wa-menu">
          ${f.telefono ? '' : '<p class="ayuda">Sin teléfono: WhatsApp te pedirá elegir el contacto.</p>'}
          <a href="${waUrl(f, 'invitacion')}" target="_blank" rel="noopener">Invitación con su liga <small>abrir WhatsApp ›</small></a>
          <a href="${waUrl(f, 'mesa')}" target="_blank" rel="noopener" ${sinMesa ? 'aria-disabled="true"' : ''}>Recordatorio de mesa <small>${sinMesa ? 'sin mesa asignada' : 'abrir WhatsApp ›'}</small></a>
          <a href="${waUrl(f, 'recordatorio')}" target="_blank" rel="noopener" ${r ? 'aria-disabled="true"' : ''}>Recordatorio para confirmar <small>${r ? 'ya respondió' : 'abrir WhatsApp ›'}</small></a>
          <pre>${esc(sinMesa ? MSG.invitacion(f) : MSG.mesa(f))}</pre>
        </div>` : ''}
    </li>`;
  }

  function pintarLista() {
    const q = $('buscar').value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const fams = datos.familias.filter(f => (filtro === 'todas' || f.estado === filtro) &&
      (!q || norm(f.familia + ' ' + f.personas.join(' ')).includes(q)));
    $('lista').innerHTML = fams.length ? fams.map(tarjeta).join('') : '<li class="adm-vacio">No hay familias con ese filtro.</li>';
  }
  const pintar = () => { pintarTotales(); pintarLista(); };

  async function cargar() {
    $('login').hidden = true; $('panel').hidden = false; $('salir').hidden = false;
    $('lista').innerHTML = '<li class="adm-vacio">Cargando…</li>';
    try { datos = await api('list'); pintar(); } catch (e) { if (localStorage.getItem(KEY_LS)) toast('No se pudo cargar: ' + e.message); }
  }

  /* ---------------- Eventos ---------------- */
  $('login').addEventListener('submit', e => {
    e.preventDefault();
    const k = $('clave').value.trim(); if (!k) return;
    localStorage.setItem(KEY_LS, k); $('clave').value = ''; cargar();
  });
  $('salir').addEventListener('click', () => { localStorage.removeItem(KEY_LS); mostrarLogin(); });
  $('buscar').addEventListener('input', pintarLista);
  $('chips').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    filtro = b.dataset.f; abierto = {}; $('chips').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); pintarLista();
  });
  $('lista').addEventListener('click', e => {
    const b = e.target.closest('[data-abrir]'); if (!b) return;
    const id = b.closest('.fam').dataset.id; const p = b.dataset.abrir;
    abierto = { [id]: abierto[id] === p ? '' : p }; pintarLista();
  });
  $('lista').addEventListener('change', e => {
    const l = e.target.closest('.persona'); if (!l) return;
    l.classList.toggle('no', !e.target.checked); l.querySelector('.persona__estado').textContent = e.target.checked ? 'Asiste' : 'No asiste';
  });
  $('lista').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target, id = form.closest('.fam').dataset.id;
    const btn = form.querySelector('[type=submit]'); btn.disabled = true; const txt = btn.textContent; btn.textContent = 'Guardando…';
    try {
      if (form.dataset.form === 'resp') {
        const asisten = [...form.querySelectorAll('input[type=checkbox]:checked')].map(i => i.value);
        datos = await api('saveAdmin', { id, asisten, nota: form.nota.value.trim() || 'Registrado por Guillermo' });
        toast('Respuesta guardada');
      } else {
        datos = await api('setMesa', { id, mesa: form.mesa.value.trim() });
        toast('Mesa guardada');
      }
      abierto = {}; pintar();
    } catch (err) { toast('No se pudo guardar: ' + err.message); btn.disabled = false; btn.textContent = txt; }
  });

  /* ---------------- Inicio ---------------- */
  $('demo').hidden = !DEMO;
  if (localStorage.getItem(KEY_LS)) cargar(); else mostrarLogin();
})();
