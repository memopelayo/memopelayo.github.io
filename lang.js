/* EN/ES toggle. Remembers choice in localStorage. No auto-redirect. */
(function () {
  var KEY = 'gp-lang';
  function isEs() {
    var lang = (document.documentElement.lang || '').toLowerCase();
    return lang.indexOf('es') === 0 || document.documentElement.getAttribute('data-lang') === 'es';
  }
  function pairPath(pathname) {
    var p = pathname || '/';
    /* normalize */
    if (p === '' || p === '/') p = '/index.html';
    var es = isEs();
    if (es) {
      /* /es/foo.html -> /foo.html ; /es/ -> / */
      if (p === '/es' || p === '/es/' || p === '/es/index.html') return '/';
      if (p.indexOf('/es/') === 0) return p.replace(/^\/es\//, '/');
      return '/';
    } else {
      if (p === '/' || p === '/index.html') return '/es/';
      if (p.indexOf('/es/') === 0) return p;
      return '/es' + (p.charAt(0) === '/' ? p : '/' + p);
    }
  }
  function enhance() {
    var links = document.querySelectorAll('[data-lang-switch]');
    var target = pairPath(location.pathname) + location.search + location.hash;
    links.forEach(function (a) {
      a.setAttribute('href', target);
      a.setAttribute('hreflang', isEs() ? 'en' : 'es-MX');
      a.setAttribute('data-lang', isEs() ? 'en' : 'es');
      a.textContent = isEs() ? 'EN' : 'ES';
      a.setAttribute('aria-label', isEs() ? 'English version' : 'Versión en español');
      a.addEventListener('click', function () {
        try { localStorage.setItem(KEY, isEs() ? 'en' : 'es'); } catch (e) {}
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
})();
