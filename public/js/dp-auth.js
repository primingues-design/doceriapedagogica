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

  const _fetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input
      : input instanceof Request ? input.url : '';
    if (url.includes('/api/claude') || url.includes('/api/salvar-atividade')) {
      const token = getToken();
      if (token) {
        init = init || {};
        init.headers = Object.assign({}, init.headers, { 'Authorization': 'Bearer ' + token });
      }
    }
    return _fetch(input, init);
  };
})();
