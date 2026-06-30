/* ============================================================
   MODO APRESENTAÇÃO — módulo reutilizável (Doceria Pedagógica)
   Fullscreen API + fallback. Expõe window.Apresentacao.
   Uso no jogo:
     1) <link rel="stylesheet" href="/css/apresentacao.css">
     2) marcar o elemento a apresentar com  data-palco
     3) <script src="/js/apresentacao.js"></script>
   API: Apresentacao.enter() / .exit() / .toggle() / .showButton(bool)
   Eventos: dispara 'apz:enter' e 'apz:exit' em window.
   ============================================================ */
(function () {
  var ativo = false;

  // mede a altura REAL da tela (corrige barras de navegador no celular)
  function recalc() {
    document.documentElement.style.setProperty('--apz-vh', window.innerHeight + 'px');
  }
  function fsEl() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null;
  }

  function enter() {
    if (ativo) return;
    ativo = true;
    recalc();
    document.documentElement.classList.add('apresentando');
    var el = document.documentElement;
    var req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (req) { try { Promise.resolve(req.call(el)).catch(function () {}); } catch (e) {} }
    // recalcula após a transição de fullscreen
    setTimeout(recalc, 120);
    setTimeout(recalc, 400);
    try { window.dispatchEvent(new Event('apz:enter')); } catch (e) {}
  }

  function exit() {
    if (!ativo) return;
    ativo = false;
    document.documentElement.classList.remove('apresentando');
    var ex = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
    if (fsEl() && ex) { try { Promise.resolve(ex.call(document)).catch(function () {}); } catch (e) {} }
    recalc();
    try { window.dispatchEvent(new Event('apz:exit')); } catch (e) {}
  }

  function toggle() { ativo ? exit() : enter(); }

  // se o usuário sair da tela cheia pelo gesto/ESC do sistema, sincroniza
  function onFsChange() {
    if (!fsEl() && ativo) {
      ativo = false;
      document.documentElement.classList.remove('apresentando');
      try { window.dispatchEvent(new Event('apz:exit')); } catch (e) {}
    }
    recalc();
  }

  function build() {
    if (document.querySelector('.apz-enter')) return; // evita duplicar
    var enterBtn = document.createElement('button');
    enterBtn.className = 'apz-enter';
    enterBtn.type = 'button';
    enterBtn.setAttribute('title', 'Apresentar em tela cheia (TV/projetor)');
    enterBtn.innerHTML = '⛶ Apresentação';
    enterBtn.addEventListener('click', enter);

    var exitBtn = document.createElement('button');
    exitBtn.className = 'apz-exit';
    exitBtn.type = 'button';
    exitBtn.setAttribute('aria-label', 'Sair da apresentação');
    exitBtn.innerHTML = '✕ Sair';
    exitBtn.addEventListener('click', exit);

    document.body.appendChild(enterBtn);
    document.body.appendChild(exitBtn);
    window.__apzEnterBtn = enterBtn;
    recalc();
  }

  document.addEventListener('fullscreenchange', onFsChange);
  document.addEventListener('webkitfullscreenchange', onFsChange);
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.keyCode === 27) && ativo) exit();
  });
  window.addEventListener('resize', recalc);
  window.addEventListener('orientationchange', function () { setTimeout(recalc, 300); });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

  window.Apresentacao = {
    enter: enter,
    exit: exit,
    toggle: toggle,
    isActive: function () { return ativo; },
    showButton: function (v) {
      var b = window.__apzEnterBtn;
      if (b) b.style.display = v ? 'inline-flex' : 'none';
    }
  };
})();
