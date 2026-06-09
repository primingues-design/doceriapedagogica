/**
 * dp-print.js — Impressão/PDF compatível com iOS Safari
 *
 * window.print() foi suportado no iOS Safari apenas a partir do iOS 16.4 (mar/2023).
 * Em versões anteriores era silenciosamente ignorado.
 * Este helper:
 *   1. Detecta iOS/iPadOS
 *   2. Mostra um toast com instruções passo a passo para salvar PDF no iPhone
 *   3. Chama window.print() sincronamente (exigido pelo iOS para user-gesture)
 *
 * Uso: substitua window.print() por dpPrint() em todos os geradores.
 */

(function () {
  var IOS_GUIDE_ID = 'dp-ios-print-guide';

  function isIOS() {
    var ua = navigator.userAgent || '';
    return (
      /iPad|iPhone|iPod/.test(ua) ||
      // iPad com iPadOS 13+ se identifica como MacIntel mas tem maxTouchPoints > 1
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  }

  function showIOSGuide() {
    // Remove toast anterior se ainda estiver na tela
    var old = document.getElementById(IOS_GUIDE_ID);
    if (old) old.remove();

    var el = document.createElement('div');
    el.id = IOS_GUIDE_ID;
    el.style.cssText = [
      'position:fixed',
      'bottom:28px',
      'left:50%',
      'transform:translateX(-50%)',
      'background:#1a1917',
      'color:#faf7f2',
      'padding:16px 22px',
      'border-radius:14px',
      'font-size:13px',
      'line-height:1.7',
      'max-width:320px',
      'width:calc(100% - 48px)',
      'text-align:center',
      'z-index:99999',
      'box-shadow:0 4px 28px rgba(0,0,0,0.35)',
      'font-family:Outfit,system-ui,sans-serif',
      'pointer-events:none',
    ].join(';');

    el.innerHTML =
      '<div style="font-size:22px;margin-bottom:8px;">📱</div>' +
      '<strong>Salvar como PDF no iPhone:</strong><br>' +
      '1. Na prévia que abrir, <strong>belisque para ampliar</strong><br>' +
      '2. Toque no ícone <strong>Compartilhar (□↑)</strong><br>' +
      '3. Escolha <strong>"Salvar em Arquivos"</strong>';

    document.body.appendChild(el);

    // Remove o toast após 9 segundos
    setTimeout(function () {
      if (el.parentNode) el.remove();
    }, 9000);
  }

  /**
   * Função principal — use no lugar de window.print()
   */
  window.dpPrint = function () {
    if (isIOS()) {
      showIOSGuide();
    }
    // Chamada síncrona — obrigatório para iOS Safari respeitar o gesto do usuário
    window.print();
  };
})();
