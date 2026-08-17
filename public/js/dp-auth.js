(function () {
  const SUPA_KEY = 'sb-atkwvwhwbkerezdmipxw-auth-token';

  // Garante o analytics compartilhado (GA + Clarity + dpTrack) nas páginas de
  // ferramenta, que não passam pelo layout do Next.
  if (!window.dpTrack) {
    var _an = document.createElement('script');
    _an.src = '/js/dp-analytics.js';
    (document.head || document.documentElement).appendChild(_an);
  }

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

  // ── Cliente Supabase carregado sob demanda (só quando o portão de e-mail é usado) ──
  const SUPA_URL  = 'https://atkwvwhwbkerezdmipxw.supabase.co';
  const SUPA_ANON = 'sb_publishable_zWPrTWOrbMSCnD1uwOWulg_borGCRbZ';
  var _sbPromise = null;
  function loadSupabase() {
    if (window.__dpSb) return Promise.resolve(window.__dpSb);
    if (_sbPromise) return _sbPromise;
    _sbPromise = new Promise(function (resolve, reject) {
      function make() {
        try { window.__dpSb = window.supabase.createClient(SUPA_URL, SUPA_ANON); resolve(window.__dpSb); }
        catch (e) { reject(e); }
      }
      if (window.supabase && window.supabase.createClient) return make();
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
      s.onload = make;
      s.onerror = function () { reject(new Error('supabase load failed')); };
      (document.head || document.documentElement).appendChild(s);
    });
    return _sbPromise;
  }

  // ── Portão "Comece grátis com o e-mail" — aparece quando a pessoa tenta gerar sem estar logada.
  //    Resolve com o access_token (sessão criada) ou null (cancelou / precisa confirmar e-mail).
  function showEmailGate() {
    return new Promise(function (resolve) {
      var old = document.getElementById('dp-gate'); if (old) old.remove();
      var overlay = document.createElement('div');
      overlay.id = 'dp-gate';
      overlay.className = 'dp-no-print';
      overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Outfit,system-ui,sans-serif;';
      var card = document.createElement('div');
      card.className = 'dp-no-print';
      card.style.cssText = 'background:#fff;color:#1a1917;max-width:380px;width:100%;border-radius:16px;padding:26px 24px;box-shadow:0 14px 44px rgba(0,0,0,.3);';
      card.innerHTML =
        '<div style="font-size:30px;margin-bottom:8px;">✨</div>' +
        '<div style="font-size:19px;font-weight:700;margin-bottom:6px;">Comece grátis agora</div>' +
        '<div style="font-size:13px;color:#6b6560;line-height:1.5;margin-bottom:16px;">Digite seu e-mail e ganhe <strong>10 materiais grátis</strong> para gerar. Sem cartão, sem senha.</div>' +
        '<input id="dp-gate-email" type="email" placeholder="seuemail@escola.com" style="width:100%;padding:12px 14px;border:1.5px solid #ddd;border-radius:10px;font-size:14px;font-family:inherit;margin-bottom:8px;box-sizing:border-box;" />' +
        '<div id="dp-gate-msg" style="font-size:12px;color:#d95f3b;min-height:16px;margin-bottom:8px;"></div>' +
        '<button id="dp-gate-go" style="width:100%;background:#c8963e;color:#fff;border:none;border-radius:10px;padding:13px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;">Começar grátis →</button>' +
        '<button id="dp-gate-cancel" style="width:100%;background:transparent;color:#8a8785;border:none;padding:10px;font-size:13px;cursor:pointer;font-family:inherit;margin-top:4px;">Agora não</button>' +
        '<div style="font-size:11px;color:#8a8785;text-align:center;margin-top:8px;">Já tem conta? <a href="/conta.html" style="color:#c8963e;font-weight:600;text-decoration:none;">Entrar</a></div>';
      overlay.appendChild(card);
      document.body.appendChild(overlay);
      if (window.dpTrack) window.dpTrack('gate_shown');

      var emailEl = card.querySelector('#dp-gate-email');
      var msgEl   = card.querySelector('#dp-gate-msg');
      var goBtn   = card.querySelector('#dp-gate-go');
      var cancelBtn = card.querySelector('#dp-gate-cancel');
      setTimeout(function () { try { emailEl.focus(); } catch (_) {} }, 50);

      function finish(tokenOrNull) { overlay.remove(); resolve(tokenOrNull); }
      cancelBtn.onclick = function () { finish(null); };
      overlay.addEventListener('click', function (e) { if (e.target === overlay) finish(null); });
      emailEl.addEventListener('keydown', function (e) { if (e.key === 'Enter') goBtn.click(); });

      goBtn.onclick = function () {
        var email = (emailEl.value || '').trim();
        if (!email || email.indexOf('@') < 0) { msgEl.style.color = '#d95f3b'; msgEl.textContent = 'Digite um e-mail válido.'; return; }
        msgEl.style.color = '#d95f3b'; msgEl.textContent = '';
        goBtn.textContent = 'Começando...'; goBtn.disabled = true;
        var sbRef = null;
        loadSupabase().then(function (sb) {
          sbRef = sb;
          var senha = 'Dp-' + ((window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + 'x' + Math.random().toString(36).slice(2)));
          return sb.auth.signUp({ email: email, password: senha, options: { data: { nome: email.split('@')[0], nivel: '' } } });
        }).then(function (res) {
          if (res.error) {
            var m = (res.error.message || '').toLowerCase();
            if (m.indexOf('already') >= 0 || m.indexOf('registered') >= 0 || m.indexOf('exists') >= 0) {
              msgEl.innerHTML = 'Você já tem conta. <a href="/conta.html" style="color:#c8963e;font-weight:600;">Entrar →</a>';
            } else {
              msgEl.textContent = res.error.message || 'Não foi possível começar.';
            }
            goBtn.textContent = 'Começar grátis →'; goBtn.disabled = false; return;
          }
          if (res.data && res.data.session && res.data.session.access_token) {
            var tok = res.data.session.access_token, uid = res.data.user && res.data.user.id;
            if (window.dpTrack) window.dpTrack('sign_up', { method: 'gate' });
            var done = function () { finish(tok); };
            // garante o perfil (normalmente um trigger cria; isto é um seguro). Segue mesmo se falhar (duplicado).
            if (uid) { sbRef.from('profiles').insert({ id: uid, nome: email.split('@')[0], nivel: '' }).then(done, done); }
            else { done(); }
            return; // sessão criada → garante perfil → segue a geração
          }
          // sem sessão (confirmação de e-mail ligada) → não dá pra continuar agora
          msgEl.style.color = '#2d6e6e';
          msgEl.textContent = '✅ Enviamos um link de acesso ao seu e-mail. Clique nele e volte aqui.';
          goBtn.textContent = 'Começar grátis →'; goBtn.disabled = false;
        }).catch(function () {
          msgEl.style.color = '#d95f3b'; msgEl.textContent = 'Erro de conexão. Tente novamente.';
          goBtn.textContent = 'Começar grátis →'; goBtn.disabled = false;
        });
      };
    });
  }

  const _fetch = window.fetch.bind(window);
  function withAuth(init, token) {
    init = init || {};
    init.headers = Object.assign({}, init.headers, { 'Authorization': 'Bearer ' + token });
    return init;
  }
  function unauthorized() {
    return new Response(JSON.stringify({ error: 'Não autenticado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  function gateThenRetry(input, init) {
    return showEmailGate().then(function (token) {
      if (!token) token = getToken();           // caso a sessão tenha sido persistida
      if (!token) return unauthorized();        // cancelou ou precisa confirmar e-mail
      return _fetch(input, withAuth(init, token));
    });
  }
  // Funil: marca "material_gerado" quando uma geração via /api/claude dá certo.
  // Fica aqui porque é o ponto único por onde TODAS as ferramentas passam.
  function trackGen(url) {
    return function (res) {
      try {
        if (res && res.ok && typeof url === 'string' && url.indexOf('/api/claude') >= 0 && window.dpTrack) {
          window.dpTrack('material_gerado');
        }
      } catch (e) {}
      return res;
    };
  }

  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input
      : input instanceof Request ? input.url : '';
    const isAI = url.includes('/api/claude') || url.includes('/api/salvar-atividade') || url.includes('/api/pexels') || url.includes('/api/imagem');
    if (!isAI) return _fetch(input, init);
    // Só a geração de conteúdo/imagem abre o portão; endpoints auxiliares só anexam o token se houver.
    const needsGate = url.includes('/api/claude') || url.includes('/api/imagem');
    const token = getToken();
    if (token) {
      return _fetch(input, withAuth(init, token)).then(function (res) {
        if (res.status === 401 && needsGate) return gateThenRetry(input, init); // token expirou → reentra
        return res;
      }).then(trackGen(url));
    }
    if (needsGate) return gateThenRetry(input, init).then(trackGen(url));
    return _fetch(input, init);
  };

  // Exposto para páginas que precisam do portão fora do fetch de IA
  // (ex.: download de atividade pronta atrás de cadastro). Resolve com o
  // access_token da sessão criada, ou null se cancelar/confirmar por e-mail.
  window.dpEmailGate = showEmailGate;
})();
