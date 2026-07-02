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
  var fitCbs = [];

  // executa os callbacks de "encaixe" (ajuste de tamanho dos jogos)
  function runFit() {
    for (var i = 0; i < fitCbs.length; i++) {
      try { fitCbs[i](ativo); } catch (e) {}
    }
  }

  // mede a altura REAL da tela (corrige barras de navegador no celular)
  function recalc() {
    document.documentElement.style.setProperty('--apz-vh', window.innerHeight + 'px');
    runFit();
  }

  /* Ajusta um GRID quadrado (caça-palavras, cruzadinha, memória, trilha...)
     para caber inteiro na tela cheia, centralizado.
     grid  = elemento .grid  |  cols = nº de colunas
     opts.reserveTop = altura reservada no topo (HUD) em px
     opts.gap, opts.min, opts.max, opts.padW, opts.padH */
  function fitGrid(grid, cols, opts) {
    opts = opts || {};
    if (!grid || !ativo || !cols) return;
    var n = opts.count || grid.children.length;
    if (!n) return;
    var rows = opts.rows || Math.ceil(n / cols);
    var cs = getComputedStyle(grid);
    var gap = parseFloat(cs.rowGap || cs.gap) || opts.gap || 6;
    var reserveTop = opts.reserveTop || 0;
    var padW = opts.padW != null ? opts.padW : 0.04;
    var padH = opts.padH != null ? opts.padH : 0.06;
    var availW = window.innerWidth * (1 - padW) - (opts.reserveSide || 0);
    var availH = window.innerHeight * (1 - padH) - reserveTop;
    var cell = Math.floor(Math.min(
      (availW - (cols - 1) * gap) / cols,
      (availH - (rows - 1) * gap) / rows
    ));
    cell = Math.max(opts.min || 42, Math.min(opts.max || 300, cell));
    grid.style.gridTemplateColumns = 'repeat(' + cols + ',' + cell + 'px)';
    if (opts.setRows) grid.style.gridTemplateRows = 'repeat(' + rows + ',' + cell + 'px)';
    grid.style.width = 'max-content';
    grid.style.margin = '0 auto';
    grid.style.setProperty('--cell', cell + 'px');
    return cell;
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
    // registra um callback chamado ao entrar/sair/redimensionar a apresentação.
    // recebe (ativo:boolean). Se já estiver apresentando, roda na hora.
    onFit: function (cb) {
      if (typeof cb === 'function') { fitCbs.push(cb); try { cb(ativo); } catch (e) {} }
    },
    // reajusta agora (usar quando o jogo trocar de tela/render dentro da apresentação)
    refit: function () { runFit(); },
    fitGrid: fitGrid,
    showButton: function (v) {
      var b = window.__apzEnterBtn;
      if (b) b.style.display = v ? 'inline-flex' : 'none';
    }
  };
})();
