/* GA4 custom events (G-EDZFC471Q7). Guarded if gtag missing. */
(function () {
  function track(name, params) {
    try {
      if (typeof gtag !== 'function') return;
      var p = params || {};
      gtag('event', name, p);
    } catch (e) {}
  }
  function toolNameFromPath() {
    var p = location.pathname || '';
    if (/tools-deck-doctor/.test(p)) return 'deck_doctor';
    if (/tools-scope/.test(p)) return 'scope_scout';
    if (/tools-palette/.test(p)) return 'hue_hunter';
    if (/tools-type/.test(p)) return 'glyph_mate';
    if (/tools-contrast/.test(p)) return 'lumen_judge';
    if (/tools\.html$/.test(p) || /\/tools\/?$/.test(p)) return 'tools_hub';
    return null;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a,button');
    if (!a) return;
    /* mailto / contact */
    if (a.matches('a[href^="mailto:"], a[href*="#contact"], a.btn[href*="contact"]') || (a.classList && a.classList.contains('mto'))) {
      track('contact_click', { link_url: (a.getAttribute('href') || '').slice(0, 120), location: location.pathname });
    }
    /* outbound Behance / LinkedIn */
    var href = a.getAttribute('href') || '';
    if (/behance\.net/i.test(href)) track('outbound_click', { destination: 'behance', link_url: href });
    if (/linkedin\.com/i.test(href)) track('outbound_click', { destination: 'linkedin', link_url: href });
    /* language toggle */
    if (a.hasAttribute('data-lang-switch') || (a.classList && a.classList.contains('lang-switch'))) {
      track('language_toggle', { to: a.getAttribute('hreflang') || a.getAttribute('data-lang') || a.textContent.trim() });
    }
    /* Lumen Judge use suggested color */
    if (a.id === 'cc-use') track('use_suggested_color', { tool_name: 'lumen_judge' });
    /* Glyph Mate generate / next */
    if (a.id === 'tp-go') {
      track('tool_use', { tool_name: 'glyph_mate', action: 'generate' });
    }
    if (a.id === 'tp-next') {
      track('tool_use', { tool_name: 'glyph_mate', action: 'next_page' });
    }
  }, true);

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (!f || !f.id) return;
    var map = { dd: 'deck_doctor', sc: 'scope_scout', tp_form: 'glyph_mate', 'tp-form': 'glyph_mate' };
    var tool = map[f.id];
    if (tool) track('tool_use', { tool_name: tool, action: 'submit' });
  }, true);

  /* Deck Doctor PDF upload (no file content) */
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t && t.id === 'dd-pdf' && t.files && t.files[0]) {
      track('pdf_upload', { tool_name: 'deck_doctor', file_size: t.files[0].size, file_type: t.files[0].type || 'application/pdf' });
      track('tool_use', { tool_name: 'deck_doctor', action: 'pdf_upload' });
    }
    if (t && t.id === 'pl-f' && t.files && t.files[0]) {
      track('tool_use', { tool_name: 'hue_hunter', action: 'image_upload' });
    }
  }, true);

  /* Palette color input / contrast live check — debounced meaningful use */
  var colorTimer = null;
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (!t || !t.id) return;
    if (t.id === 'pl-c') {
      clearTimeout(colorTimer);
      colorTimer = setTimeout(function () { track('tool_use', { tool_name: 'hue_hunter', action: 'pick_color' }); }, 800);
    }
    if (t.id === 'cc-a' || t.id === 'cc-b') {
      clearTimeout(colorTimer);
      colorTimer = setTimeout(function () { track('tool_use', { tool_name: 'lumen_judge', action: 'check' }); }, 800);
    }
  }, true);

  /* Expose for tools.js optional calls */
  window.gpTrack = track;
  window.gpToolName = toolNameFromPath;

  /*
   * Microsoft Clarity — PLACEHOLDER (disabled).
   * To enable: create a Clarity project, paste the project ID below, and uncomment.
   *
   * (function(c,l,a,r,i,t,y){
   *   c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
   *   t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
   *   y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
   * })(window, document, "clarity", "script", "YOUR_CLARITY_PROJECT_ID");
   */
})();
