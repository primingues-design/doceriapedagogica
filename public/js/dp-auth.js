(function () {
  const SUPA_KEY = 'sb-atkwvwhwbkerezdmipxw-auth-token';

  // Garante o analytics compartilhado (GA + Clarity + dpTrack) nas páginas de
  // ferramenta, que não passam pelo layout do Next.
  if (!window.dpTrack) {
    var _an = document.createElement('script');
    _an.src = '/js/dp-analytics.js';
    (document.head || document.documentElement).appendChild(_an);
  }
  function track(ev, p) { try { if (window.dpTrack) window.dpTrack(ev, p); } catch (e) {} }

  /* ── Sessão salva pelo Supabase no navegador ── */
  function stored() {
    try { return JSON.parse(localStorage.getItem(SUPA_KEY)); } catch (e) { return null; }
  }
  function getToken() {
    var s = stored();
    return (s && s.access_token) || null;
  }
  function tokenVencido() {
    var s = stored();
    return !s || !s.expires_at || s.expires_at < Date.now() / 1000 + 30;
  }
  // Visitante que entrou sem cadastro (usuário anônimo do Supabase)
  function isAnon() {
    var s = stored();
    return !!(s && s.user && s.user.is_anonymous);
  }
  window.dpIsAnon = isAnon;

  /**
   * Exibe mensagem de sem créditos com link para planos.
   * Uso: dpHandleNoCredits(document.getElementById('errBox'))
   */
  window.dpHandleNoCredits = function (errBox) {
    var msg = '⚠️ Seus créditos acabaram. Você ganha 1 material grátis por semana — ou ' +
      '<a href="/conta.html" style="color:#2d6e6e;font-weight:600;text-decoration:underline;">compre créditos avulsos →</a>';
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
        '<a href="/conta.html" style="color:#fff;font-weight:700;text-decoration:underline;">Ver créditos →</a>';
      document.body.appendChild(t);
      setTimeout(function () { if (t.parentNode) t.remove(); }, 7000);
    }
  };

  // ── Cliente Supabase carregado sob demanda ──
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
      s.onerror = function () { _sbPromise = null; reject(new Error('supabase load failed')); };
      (document.head || document.documentElement).appendChild(s);
    });
    return _sbPromise;
  }
  // Token válido: renova a sessão se venceu (o Supabase usa o refresh token)
  function tokenFresco() {
    return loadSupabase().then(function (sb) { return sb.auth.getSession(); })
      .then(function (r) { return (r && r.data && r.data.session && r.data.session.access_token) || null; })
      .catch(function () { return null; });
  }
  // Entrada SEM cadastro: cria um visitante anônimo (3 gerações grátis).
  // Se o anônimo estiver desligado no Supabase, devolve null e o site cai no portão de e-mail.
  function entrarAnonimo() {
    return loadSupabase().then(function (sb) { return sb.auth.signInAnonymously(); })
      .then(function (r) {
        if (r && !r.error && r.data && r.data.session) { track('entrada_anonima'); return r.data.session.access_token; }
        return null;
      })
      .catch(function () { return null; });
  }

  /* ── Portão de e-mail ──
     • Visitante anônimo  → coloca o e-mail na MESMA conta (mantém histórico) e ganha +2.
     • Sem sessão nenhuma → cria a conta só com o e-mail (senha gerada nos bastidores).
     opts.motivo: 'creditos' (acabaram as 3 grátis) | 'download' (baixar/imprimir) | padrão
     Resolve com o access_token, ou null se cancelar / precisar confirmar por e-mail. */
  function showEmailGate(opts) {
    opts = opts || {};
    var converter = isAnon();
    var titulo, texto, botao;
    if (converter && opts.motivo === 'creditos') {
      titulo = 'Seus 3 materiais grátis acabaram 🎉';
      texto = 'Gostou? Coloque seu e-mail para continuar e ganhe <strong>mais 2 materiais grátis</strong>. Sem cartão, sem senha.';
      botao = 'Continuar grátis →';
    } else if (converter) {
      titulo = 'Falta só o seu e-mail';
      texto = 'Deixe seu e-mail para continuar — e ganhe <strong>mais 2 materiais grátis</strong> na Doceria. Sem cartão, sem senha.';
      botao = 'Continuar →';
    } else {
      titulo = 'Comece grátis agora';
      texto = 'Digite seu e-mail e ganhe <strong>5 materiais grátis</strong> na Doceria. Sem cartão, sem senha.';
      botao = 'Começar grátis →';
    }
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
        '<div style="font-size:19px;font-weight:700;margin-bottom:6px;">' + titulo + '</div>' +
        '<div style="font-size:13px;color:#6b6560;line-height:1.5;margin-bottom:16px;">' + texto + '</div>' +
        '<input id="dp-gate-email" type="email" placeholder="seuemail@escola.com" style="width:100%;padding:12px 14px;border:1.5px solid #ddd;border-radius:10px;font-size:14px;font-family:inherit;margin-bottom:8px;box-sizing:border-box;" />' +
        '<div id="dp-gate-msg" style="font-size:12px;color:#d95f3b;min-height:16px;margin-bottom:8px;"></div>' +
        '<button id="dp-gate-go" style="width:100%;background:#c8963e;color:#fff;border:none;border-radius:10px;padding:13px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;">' + botao + '</button>' +
        '<button id="dp-gate-cancel" style="width:100%;background:transparent;color:#8a8785;border:none;padding:10px;font-size:13px;cursor:pointer;font-family:inherit;margin-top:4px;">Agora não</button>' +
        '<div style="font-size:11px;color:#8a8785;text-align:center;margin-top:8px;">Já tem conta? <a href="/conta.html" style="color:#c8963e;font-weight:600;text-decoration:none;">Entrar</a></div>';
      overlay.appendChild(card);
      document.body.appendChild(overlay);
      track('gate_shown', { modo: converter ? 'converter' : 'cadastro', motivo: opts.motivo || '' });

      var emailEl = card.querySelector('#dp-gate-email');
      var msgEl   = card.querySelector('#dp-gate-msg');
      var goBtn   = card.querySelector('#dp-gate-go');
      var cancelBtn = card.querySelector('#dp-gate-cancel');
      setTimeout(function () { try { emailEl.focus(); } catch (_) {} }, 50);

      function finish(tokenOrNull) { overlay.remove(); resolve(tokenOrNull); }
      function erro(m) { msgEl.style.color = '#d95f3b'; msgEl.innerHTML = m; goBtn.textContent = botao; goBtn.disabled = false; }
      function jaTemConta() { erro('Esse e-mail já tem conta. <a href="/conta.html" style="color:#c8963e;font-weight:600;">Entrar →</a>'); }
      function ehJaCadastrado(e) { var m = ((e && e.message) || '').toLowerCase(); return m.indexOf('already') >= 0 || m.indexOf('registered') >= 0 || m.indexOf('exists') >= 0; }
      cancelBtn.onclick = function () { finish(null); };
      overlay.addEventListener('click', function (e) { if (e.target === overlay) finish(null); });
      emailEl.addEventListener('keydown', function (e) { if (e.key === 'Enter') goBtn.click(); });

      goBtn.onclick = function () {
        var email = (emailEl.value || '').trim().toLowerCase();
        if (!email || email.indexOf('@') < 0) { erro('Digite um e-mail válido.'); return; }
        msgEl.textContent = '';
        goBtn.textContent = 'Um instante...'; goBtn.disabled = true;
        var senha = 'Dp-' + ((window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (Date.now() + 'x' + Math.random().toString(36).slice(2)));

        loadSupabase().then(function (sb) {
          if (converter) {
            // MESMA conta: o visitante anônimo passa a ter e-mail (o servidor dá o bônus de +2)
            return sb.auth.updateUser({ email: email, data: { nome: email.split('@')[0] } }).then(function (res) {
              if (res.error) { if (ehJaCadastrado(res.error)) return jaTemConta(); return erro(res.error.message || 'Não foi possível continuar.'); }
              var u = res.data && res.data.user;
              if (u && (u.email || '').toLowerCase() === email) {
                track('sign_up', { method: 'anon_convert' });
                var seguir = function () {
                  return sb.auth.refreshSession().then(function (r) {
                    finish((r && r.data && r.data.session && r.data.session.access_token) || getToken());
                  }, function () { finish(getToken()); });
                };
                // senha gerada nos bastidores (a pessoa entra depois por "esqueci a senha / link")
                return sb.auth.updateUser({ password: senha }).then(seguir, seguir);
              }
              // e-mail pendente de confirmação
              msgEl.style.color = '#2d6e6e';
              msgEl.textContent = '✅ Enviamos um link para o seu e-mail. Clique nele e volte aqui.';
              goBtn.textContent = botao; goBtn.disabled = false;
            });
          }
          return sb.auth.signUp({ email: email, password: senha, options: { data: { nome: email.split('@')[0], nivel: '' } } }).then(function (res) {
            if (res.error) { if (ehJaCadastrado(res.error)) return jaTemConta(); return erro(res.error.message || 'Não foi possível começar.'); }
            if (res.data && res.data.session && res.data.session.access_token) {
              var tok = res.data.session.access_token, uid = res.data.user && res.data.user.id;
              track('sign_up', { method: 'gate' });
              var done = function () { finish(tok); };
              // garante o perfil (normalmente o trigger cria; isto é um seguro). Segue mesmo se falhar.
              if (uid) { sb.from('profiles').insert({ id: uid, nome: email.split('@')[0], nivel: '' }).then(done, done); }
              else { done(); }
              return;
            }
            msgEl.style.color = '#2d6e6e';
            msgEl.textContent = '✅ Enviamos um link de acesso ao seu e-mail. Clique nele e volte aqui.';
            goBtn.textContent = botao; goBtn.disabled = false;
          });
        }).catch(function () { erro('Erro de conexão. Tente novamente.'); });
      };
    });
  }

  const _fetch = window.fetch.bind(window);
  function withAuth(init, token) {
    init = Object.assign({}, init || {});
    var extra = { 'Authorization': 'Bearer ' + token };
    // autorização de imagens recebida na última geração (a IA de imagem só responde com ela)
    try { var it = sessionStorage.getItem('dp_img_token'); if (it) extra['X-Img-Token'] = it; } catch (e) {}
    init.headers = Object.assign({}, init.headers, extra);
    return init;
  }
  function unauthorized() {
    return new Response(JSON.stringify({ error: 'Não autenticado' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
  // Funil: marca "material_gerado" quando uma geração via /api/claude dá certo.
  function trackGen(url, res) {
    try { if (res && res.ok && url.indexOf('/api/claude') >= 0) track('material_gerado', { anonimo: isAnon() }); } catch (e) {}
    try { var it = res && res.headers.get('X-Img-Token'); if (it) sessionStorage.setItem('dp_img_token', it); } catch (e) {}
    return res;
  }

  /* Geração de conteúdo/imagem: garante uma sessão (sem pedir nada) e trata créditos.
     1) token salvo (renova se venceu) → 2) entra como visitante anônimo → 3) portão de e-mail */
  async function gerar(input, init, url) {
    var token = getToken();
    if (token && tokenVencido()) token = (await tokenFresco()) || null;
    if (!token) token = await entrarAnonimo();
    if (!token) token = await showEmailGate();
    if (!token) return unauthorized();

    var res = await _fetch(input, withAuth(init, token));
    if (res.status === 401) {                       // sessão inválida → renova, senão portão
      token = (await tokenFresco()) || (await showEmailGate());
      if (!token) return res;
      res = await _fetch(input, withAuth(init, token));
    }
    if (res.status === 402) {                       // visitante usou as 3 grátis → e-mail (+2)
      var info = await res.clone().json().catch(function () { return {}; });
      if (info && info.precisaEmail) {
        var t2 = await showEmailGate({ motivo: 'creditos' });
        if (t2) res = await _fetch(input, withAuth(init, t2));
      }
    }
    return trackGen(url, res);
  }

  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input
      : input instanceof Request ? input.url : '';
    const isAI = url.includes('/api/claude') || url.includes('/api/consumir') || url.includes('/api/salvar-atividade') || url.includes('/api/pexels') || url.includes('/api/imagem');
    if (!isAI) return _fetch(input, init);
    // Só a geração de conteúdo/imagem garante sessão; endpoints auxiliares só anexam o token se houver.
    if (url.includes('/api/claude') || url.includes('/api/imagem') || url.includes('/api/consumir')) return gerar(input, init, url);
    const token = getToken();
    return token ? _fetch(input, withAuth(init, token)) : _fetch(input, init);
  };

  // Para páginas que pedem e-mail fora da IA (ex.: baixar/imprimir atividade pronta).
  // Visitante anônimo é convertido na mesma conta. Resolve com o token ou null.
  window.dpEmailGate = function (opts) { return showEmailGate(Object.assign({ motivo: 'download' }, opts || {})); };

  // Vindo do painel ("Gerar parecido" ou a busca): ?tema= já preenche o tema da ferramenta.
  function preencherTema() {
    try {
      var t = new URLSearchParams(location.search).get('tema');
      if (!t) return;
      var el = ['tema', 'a_tema', 'inTema'].map(function (i) { return document.getElementById(i); }).filter(Boolean)[0];
      if (el && !el.value) { el.value = t; el.dispatchEvent(new Event('input', { bubbles: true })); }
    } catch (e) {}
  }
  // Topo das centrais: quem tem conta vê "Minha conta" no lugar de "Entrar" / "Testar grátis".
  function ajustarTopo() {
    var s = stored();
    if (!(s && s.user && !s.user.is_anonymous)) return;
    document.querySelectorAll('a[href="/conta.html"]').forEach(function (a) {
      if (a.textContent.trim() === 'Entrar') a.textContent = 'Minha conta';
    });
    var cta = document.querySelector('.cta-top');
    if (cta && /Testar/.test(cta.textContent)) { cta.textContent = 'Minha conta'; cta.setAttribute('href', '/conta.html'); }
  }
  function aoCarregar() { preencherTema(); ajustarTopo(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aoCarregar);
  else aoCarregar();

  // Atividade pronta das centrais (folha ou kit): desconta 1 crédito antes de imprimir.
  // Mesmo fluxo da IA: entra como visitante, pede e-mail ao zerar os 3 grátis. Resolve true/false.
  window.dpCobrar = async function (item) {
    try {
      var res = await window.fetch('/api/consumir', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ item: item || '' }),
      });
      if (res.ok) {
        track('download_atividade', { item: item || '', pago: true, anonimo: isAnon() });
        return true;
      }
      if (res.status === 402) window.dpHandleNoCredits(null);
      return false;
    } catch (e) {
      return false;
    }
  };
})();
