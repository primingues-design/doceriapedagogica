(function () {
  const SUPA_KEY = 'sb-atkwvwhwbkerezdmipxw-auth-token';

  function getToken() {
    try {
      const raw = localStorage.getItem(SUPA_KEY);
      if (!raw) return null;
      return JSON.parse(raw)?.access_token || null;
    } catch {
      return null;
    }
  }

  /**
   * Exibe mensagem de sem créditos com link para planos.
   * Uso: dpHandleNoCredits(document.getElementById('errBox'))
   */
  window.dpHandleNoCredits = function (errBox) {
    var msg = '⚠️ Seus créditos acabaram. ' +
      '<a href="/conta.html" style="color:#2d6e6e;font-weight:600;text-decoration:underline;">Ver planos →</a>';
    if (errBox) {
      errBox.innerHTML = msg;
      errBox.style.display = 'block';
      errBox.classList.add('show');
    } else {
      // fallback: toast no topo da tela
      var t = document.createElement('div');
      t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);' +
        'background:#d95f3b;color:#fff;padding:14px 22px;border-radius:10px;' +
        'font-size:13px;z-index:99999;box-shadow:0 4px 20px rgba(0,0,0,.25);' +
        'font-family:Outfit,sans-serif;text-align:center;';
      t.innerHTML = '⚠️ Seus créditos acabaram. ' +
        '<a href="/conta.html" style="color:#fff;font-weight:700;text-decoration:underline;">Ver planos →</a>';
      document.body.appendChild(t);
      setTimeout(function () { if (t.parentNode) t.remove(); }, 7000);
    }
  };

  const _fetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input
      : input instanceof Request ? input.url : '';
    if (url.includes('/api/claude') || url.includes('/api/salvar-atividade') || url.includes('/api/pexels')) {
      const token = getToken();
      if (token) {
        init = init || {};
        init.headers = Object.assign({}, init.headers, { 'Authorization': 'Bearer ' + token });
      }
    }
    return _fetch(input, init);
  };
})();
