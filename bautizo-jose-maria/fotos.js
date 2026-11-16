/* =========================================================
   Álbum de fotos en vivo (integrado con el Apps Script + Google Drive)
   ========================================================= */
(function fotos() {
  const $ = id => document.getElementById(id);
  const EP = CONFIG.RSVP_ENDPOINT;
  const DEMO = !EP;
  const MIAS_LS = 'bautizo-mis-fotos';
  const CLIENTE_LS = 'bautizo-cliente';
  const cliente = localStorage.getItem(CLIENTE_LS) || (() => { const c = Math.random().toString(36).slice(2, 12); localStorage.setItem(CLIENTE_LS, c); return c; })();
  const mias = new Set((() => { try { return JSON.parse(localStorage.getItem(MIAS_LS)) || []; } catch (_) { return []; } })());
  const guardarMias = () => { try { localStorage.setItem(MIAS_LS, JSON.stringify([...mias].slice(-300))); } catch (_) {} };

  /* ---------- Modo externo (respaldo) ---------- */
  if (CONFIG.ALBUM_MODO === 'externo') {
    ['subir', 'galeria', 'g-vacia'].forEach(id => { $(id).hidden = true; });
    document.querySelector('.galeria-cab').hidden = true;
    $('album-externo').hidden = false;
    const url = (CONFIG.ALBUM_URL || '').trim();
    if (!url) return;
    $('album-pronto').hidden = true;
    const btn = $('album-btn'); btn.href = url; btn.hidden = false;
    if (window.qrcode) {
      const q = qrcode(0, 'M'); q.addData(url); q.make();
      const n = q.getModuleCount(); let d = '';
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c},${r}h1v1h-1z`;
      $('album-qr').innerHTML = `<svg viewBox="-2 -2 ${n + 4} ${n + 4}" role="img" aria-label="Código QR del álbum"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><path d="${d}" fill="#5b5e3a" shape-rendering="crispEdges"/></svg>`;
      $('album-qr').hidden = false;
    }
    return;
  }

  $('f-demo').hidden = !DEMO;
  $('f-ayuda').textContent = `Hasta ${CONFIG.FOTOS_POR_LOTE} fotos por vez. Las hacemos más ligeras y les quitamos la ubicación antes de subirlas.`;

  /* ---------- URLs de Drive ---------- */
  const miniatura = (id, w = 800) => `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${w}`;
  const respaldo = (id, w = 800) => `https://lh3.googleusercontent.com/d/${encodeURIComponent(id)}=w${w}`;
  const descarga = id => `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}`;

  /* ---------- Galería ---------- */
  let fotos = [];               // [{f, n, fa, t, src?, full?}]  f = fileId
  const pintadas = new Map();   // fileId -> <li>
  const galeria = $('galeria');

  function srcDe(p, w) { return p.src ? (w > 900 ? p.full || p.src : p.src) : miniatura(p.f, w); }
  function crearItem(p, nueva) {
    const li = document.createElement('li');
    li.className = 'galeria__item' + (nueva ? ' es-nueva' : '');
    li.dataset.f = p.f;
    const b = document.createElement('button'); b.type = 'button';
    b.setAttribute('aria-label', `Ver foto${p.n ? ' de ' + p.n : ''}`);
    const img = document.createElement('img');
    img.loading = 'lazy'; img.decoding = 'async'; img.alt = p.n ? `Foto de ${p.n}` : 'Foto del bautizo';
    img.src = srcDe(p, 800);
    img.onerror = () => { if (!p.src && !img.dataset.r) { img.dataset.r = 1; img.src = respaldo(p.f, 800); } else li.classList.add('sin-img'); };
    img.onload = () => li.classList.add('cargada');
    b.append(img);
    if (mias.has(p.f)) { const t = document.createElement('span'); t.className = 'galeria__tuya'; t.textContent = 'Tuya'; b.append(t); }
    if (p.n) { const c = document.createElement('span'); c.className = 'galeria__autor'; c.textContent = p.n; b.append(c); }
    b.addEventListener('click', () => abrirVisor(p.f));
    li.append(b);
    return li;
  }
  function pintar(lista, animar) {
    fotos = lista;
    const ids = new Set(lista.map(p => p.f));
    for (const [id, li] of pintadas) if (!ids.has(id)) { li.remove(); pintadas.delete(id); }   // ocultadas por moderación
    // más nuevas primero
    lista.forEach((p, i) => {
      let li = pintadas.get(p.f);
      if (!li) { li = crearItem(p, animar); pintadas.set(p.f, li); }
      if (galeria.children[i] !== li) galeria.insertBefore(li, galeria.children[i] || null);
    });
    $('g-vacia').hidden = lista.length > 0;
    $('g-cuenta').textContent = lista.length ? `${lista.length} ${lista.length === 1 ? 'foto' : 'fotos'}` : '';
  }

  /* ---------- Lectura (polling solo con la pestaña visible) ---------- */
  const demoBase = () => [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({ f: `demo-${i}`, n: ['EJEMPLO Tía Lupita', 'EJEMPLO Carlos', '', 'EJEMPLO Ana', 'EJEMPLO Juan', '', 'EJEMPLO Marta', 'EJEMPLO Luis'][i - 1], fa: '', t: '', src: `assets/demo-fotos/ejemplo-${i}.jpg` }));
  let demoMias = [];
  let version = '';
  async function leer(animar) {
    if (DEMO) { pintar([...demoMias, ...demoBase()], animar); return; }
    try {
      const r = await fetch(`${EP}?action=listFotos`, { cache: 'no-store' });
      const j = await r.json();
      if (!j.ok || j.v === version) return;
      version = j.v;
      pintar(j.fotos, animar && galeria.children.length > 0);
    } catch (_) { /* sin señal: se intenta en la siguiente vuelta */ }
  }
  let timer = null;
  function programar() {
    clearTimeout(timer);
    if (document.visibilityState !== 'visible') return;
    const ms = (CONFIG.GALERIA_CADA_SEG || 15) * 1000 * (0.85 + Math.random() * 0.3);   // con variación para no llegar todos juntos
    timer = setTimeout(async () => { await leer(true); programar(); }, ms);
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { leer(true); programar(); } else clearTimeout(timer); });
  // empieza cuando la sección está cerca de verse
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); leer(false); programar(); } }, { rootMargin: '600px' });
  io.observe($('fotos'));

  /* ---------- Visor (lightbox) ---------- */
  const visor = $('visor'); let actual = -1;
  function abrirVisor(id) {
    actual = fotos.findIndex(p => p.f === id); if (actual < 0) return;
    mostrar(); if (!visor.open) visor.showModal();
  }
  function mostrar() {
    const p = fotos[actual];
    const img = $('visor-img');
    img.dataset.r = '';
    img.onerror = () => { if (!p.src && !img.dataset.r) { img.dataset.r = 1; img.src = respaldo(p.f, 1600); } };
    img.src = srcDe(p, 1600);
    img.alt = p.n ? `Foto de ${p.n}` : 'Foto del bautizo';
    $('visor-info').textContent = `${actual + 1} / ${fotos.length}${p.n ? ' · ' + p.n : ''}${mias.has(p.f) ? ' · tuya' : ''}`;
    const d = $('visor-descargar');
    d.href = p.src ? (p.full || p.src) : descarga(p.f);
    d.setAttribute('download', `bautizo-jose-maria-${actual + 1}.jpg`);
  }
  const mover = k => { if (!fotos.length) return; actual = (actual + k + fotos.length) % fotos.length; mostrar(); };
  $('visor-prev').addEventListener('click', () => mover(-1));
  $('visor-next').addEventListener('click', () => mover(1));
  $('visor-cerrar').addEventListener('click', () => visor.close());
  visor.addEventListener('click', e => { if (e.target === visor) visor.close(); });
  visor.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') mover(-1); if (e.key === 'ArrowRight') mover(1); });
  let x0 = null;
  visor.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  visor.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) mover(dx < 0 ? 1 : -1); x0 = null; });

  /* ---------- Subida ---------- */
  const cola = $('f-cola');
  const input = $('f-archivos');
  let enCurso = 0; const pendientes = [];
  const CONCURRENCIA = 2;

  async function comprimir(file) {
    const max = CONFIG.FOTOS_LADO_MAX || 1600;
    let bmp;
    try { bmp = await createImageBitmap(file, { imageOrientation: 'from-image' }); }
    catch (_) {
      bmp = await new Promise((ok, mal) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => mal(new Error('formato')); im.src = URL.createObjectURL(file); });
    }
    const w0 = bmp.width, h0 = bmp.height, k = Math.min(1, max / Math.max(w0, h0));
    const w = Math.round(w0 * k), h = Math.round(h0 * k);
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, w, h); cx.drawImage(bmp, 0, 0, w, h);
    if (bmp.close) bmp.close();
    // volver a codificar en un canvas elimina EXIF (incluida la ubicación GPS)
    const blob = await new Promise(ok => cv.toBlob(ok, 'image/jpeg', CONFIG.FOTOS_CALIDAD || 0.8));
    if (!blob) throw new Error('formato');
    return blob;
  }
  const aBase64 = blob => new Promise((ok, mal) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(',')[1]); r.onerror = mal; r.readAsDataURL(blob); });

  function enviarXHR(cuerpo, onProg) {
    return new Promise((ok, mal) => {
      const x = new XMLHttpRequest();
      x.open('POST', EP); x.timeout = 90000;
      x.upload.onprogress = e => { if (e.lengthComputable) onProg(e.loaded / e.total); };
      x.onload = () => { try { const j = JSON.parse(x.responseText); j.ok ? ok(j) : mal(Object.assign(new Error(j.error || 'error'), { definitivo: !!j.definitivo })); } catch (e) { mal(new Error('respuesta')); } };
      x.onerror = () => mal(new Error('red')); x.ontimeout = () => mal(new Error('tiempo'));
      x.send(cuerpo);  // text/plain: sin "preflight" de CORS
    });
  }
  function enviarDemo(onProg, intento, tarea) {
    return new Promise((ok, mal) => {
      let p = 0; const t = setInterval(() => {
        p += 0.08; onProg(Math.min(p, 1));
        if (tarea.fallaDemo && intento === 1 && p > 0.45) { clearInterval(t); mal(new Error('red')); }
        if (p >= 1) { clearInterval(t); ok({ ok: true, fileId: 'local-' + Math.random().toString(36).slice(2, 9) }); }
      }, 260);
    });
  }

  const esperarConexion = () => navigator.onLine ? Promise.resolve() : new Promise(ok => window.addEventListener('online', ok, { once: true }));
  const dormir = ms => new Promise(ok => setTimeout(ok, ms));

  function crearFila(t) {
    const li = document.createElement('li'); li.className = 'cola__item';
    li.innerHTML = `<img alt=""><div class="cola__txt"><p class="cola__nombre"></p><p class="cola__estado">En espera</p><div class="cola__barra"><span></span></div></div><button type="button" class="cola__reintentar" hidden>Reintentar</button>`;
    li.querySelector('.cola__nombre').textContent = t.file.name || 'Foto';
    li.querySelector('img').src = URL.createObjectURL(t.file);
    li.querySelector('.cola__reintentar').addEventListener('click', () => { t.intento = 0; t.estado = 'espera'; actualizar(t, 'En espera', 0); li.querySelector('.cola__reintentar').hidden = true; pendientes.push(t); siguiente(); });
    cola.prepend(li); t.li = li;
  }
  function actualizar(t, txt, prog, cls) {
    t.li.querySelector('.cola__estado').textContent = txt;
    t.li.querySelector('.cola__barra span').style.width = `${Math.round((prog || 0) * 100)}%`;
    t.li.className = 'cola__item' + (cls ? ' ' + cls : '');
  }

  async function procesar(t) {
    try {
      actualizar(t, 'Preparando…', 0.02);
      if (!t.blob) t.blob = await comprimir(t.file);
      const kb = Math.round(t.blob.size / 1024);
      const fam = await familiaPromesa;
      for (t.intento = 1; t.intento <= 4; t.intento++) {
        await esperarConexion();
        const etiqueta = t.intento > 1 ? `Reintentando (${t.intento - 1}) · ${kb} KB` : `Subiendo · ${kb} KB`;
        actualizar(t, etiqueta, 0.05, 'subiendo');
        try {
          let r;
          if (DEMO) r = await enviarDemo(p => actualizar(t, etiqueta, 0.05 + p * 0.9, 'subiendo'), t.intento, t);
          else {
            const data = await aBase64(t.blob);
            r = await enviarXHR(JSON.stringify({ action: 'uploadFoto', data, nombre: $('f-nombre').value.trim(), familia: fam ? fam.grupo : '', id: fam ? fam.id : '', cliente }),
              p => actualizar(t, etiqueta, 0.05 + p * 0.9, 'subiendo'));
          }
          mias.add(r.fileId); guardarMias();
          if (DEMO) { const url = URL.createObjectURL(t.blob); demoMias.unshift({ f: r.fileId, n: $('f-nombre').value.trim(), src: url, full: url }); }
          actualizar(t, '¡Lista! Ya está en el álbum', 1, 'lista');
          setTimeout(() => { t.li.classList.add('se-va'); setTimeout(() => t.li.remove(), 600); }, 9000);
          leer(true);
          return;
        } catch (e) {
          if (e.definitivo) throw e;
          if (t.intento < 4) { actualizar(t, 'Señal débil · reintentamos en unos segundos…', 0.05, 'reintento'); await dormir([0, 2000, 5000, 10000][t.intento]); }
          else throw e;
        }
      }
    } catch (e) {
      const msg = e.message === 'formato' ? 'Formato no compatible' : (e.definitivo ? e.message : 'No se pudo subir');
      actualizar(t, msg, 0, 'fallo');
      if (e.message !== 'formato' && !e.definitivo) t.li.querySelector('.cola__reintentar').hidden = false;
    }
  }
  async function siguiente() {
    while (enCurso < CONCURRENCIA && pendientes.length) {
      const t = pendientes.shift(); enCurso++;
      procesar(t).finally(() => { enCurso--; siguiente(); });
    }
  }
  input.addEventListener('change', () => {
    const files = [...input.files].filter(f => /^image\//.test(f.type) || /\.(jpe?g|png|heic|heif|webp)$/i.test(f.name));
    const lim = CONFIG.FOTOS_POR_LOTE || 20;
    if (files.length > lim) alert(`Puedes subir hasta ${lim} fotos por vez. Subiremos las primeras ${lim}; después elige las demás.`);
    files.slice(0, lim).forEach((file, i) => { const t = { file, intento: 0, fallaDemo: DEMO && i === 2 }; crearFila(t); pendientes.push(t); });
    input.value = '';
    siguiente();
  });
})();
