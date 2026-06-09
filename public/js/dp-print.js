/**
 * dp-print.js — Impressão/PDF com tratamento ISOLADO para iOS
 *
 * REGRA DE OURO: a lógica de impressão dos navegadores padrão NÃO é alterada.
 *   Safari (iOS/Mac), Chrome/Edge/Firefox desktop, Android  →  window.print() direto.
 *
 * Único caso tratado especialmente: navegadores que, no iOS, falham
 * silenciosamente ao imprimir/baixar (WKWebView interno de apps como
 * Google/GSA, Instagram, Facebook... e o Chrome do iPhone / CriOS).
 * Nesses casos NÃO chamamos window.print() (não faz nada ali). Em vez disso,
 * mostramos um aviso NA PÁGINA pedindo para abrir no Safari.
 *
 * IMPORTANTE: qualquer elemento de aviso recebe a classe .dp-no-print e há uma
 * regra @media print que o esconde — assim ele NUNCA pode entrar dentro do PDF.
 */

(function () {
  // ── Garante que avisos nossos nunca apareçam no PDF impresso ──
  function ensurePrintHideStyle() {
    if (document.getElementById('dp-print-hide-style')) return;
    var s = document.createElement('style');
    s.id = 'dp-print-hide-style';
    s.textContent = '@media print { .dp-no-print { display: none !important; } }';
    (document.head || document.documentElement).appendChild(s);
  }

  function isIOS() {
    var ua = navigator.userAgent || '';
    return (
      /iPad|iPhone|iPod/.test(ua) ||
      // iPad com iPadOS 13+ se identifica como MacIntel mas tem toque
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  }

  /**
   * Detecta navegadores do iOS onde imprimir/baixar falha silenciosamente:
   *  - Navegadores internos de apps (WKWebView): Google (GSA), Instagram,
   *    Facebook, Line, WeChat, Twitter/X, LinkedIn, TikTok, etc.
   *  - Chrome do iPhone (CriOS): window.print() é historicamente não confiável.
   *
   * Safari de verdade NÃO bate em nenhum desses tokens → segue para window.print().
   *
   * Ajuste fino: se você confirmar que o Chrome do iPhone imprime bem, basta
   * remover o /CriOS/ da linha "chromeIOS" abaixo.
   */
  function precisaDeSafari() {
    if (!isIOS()) return false;
    var ua = navigator.userAgent || '';
    var inApp = /(GSA|FBAN|FBAV|FB_IAB|Instagram|Line\/|MicroMessenger|Twitter|LinkedInApp|Snapchat|Pinterest|musical_ly|Bytedance|TikTok)/i.test(ua);
    var chromeIOS = /CriOS/i.test(ua);
    return inApp || chromeIOS;
  }

  // ── Aviso NA PÁGINA (nunca no PDF) para abrir no Safari ──
  function mostrarAvisoSafari() {
    ensurePrintHideStyle();

    var anterior = document.getElementById('dp-safari-notice');
    if (anterior) anterior.remove();

    var overlay = document.createElement('div');
    overlay.id = 'dp-safari-notice';
    overlay.className = 'dp-no-print';
    overlay.setAttribute('role', 'dialog');
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:2147483647',
      'background:rgba(0,0,0,0.55)', 'display:flex',
      'align-items:center', 'justify-content:center',
      'padding:24px', 'font-family:Outfit,system-ui,sans-serif'
    ].join(';');

    var card = document.createElement('div');
    card.className = 'dp-no-print';
    card.style.cssText = [
      'background:#fff', 'color:#1a1917', 'max-width:340px', 'width:100%',
      'border-radius:16px', 'padding:24px 22px', 'text-align:center',
      'box-shadow:0 14px 44px rgba(0,0,0,0.3)'
    ].join(';');

    card.innerHTML =
      '<div style="font-size:34px;margin-bottom:10px;">📲</div>' +
      '<div style="font-size:17px;font-weight:700;margin-bottom:8px;">Abra no Safari para baixar</div>' +
      '<div style="font-size:14px;line-height:1.55;color:#4a4845;margin-bottom:18px;">' +
        'Para baixar as atividades no iPhone, abra este site no <strong>Safari</strong>.<br><br>' +
        'Toque no ícone <strong>•••</strong> ou de <strong>compartilhar</strong> e escolha ' +
        '<strong>“Abrir no Safari”</strong>.' +
      '</div>';

    var copiar = document.createElement('button');
    copiar.className = 'dp-no-print';
    copiar.textContent = '🔗 Copiar link do site';
    copiar.style.cssText = 'display:block;width:100%;background:#c8742a;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;margin-bottom:10px;';
    copiar.onclick = function () {
      var url = window.location.href;
      var feito = function () { copiar.textContent = '✓ Link copiado!'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(feito, function () { copiarFallback(url); feito(); });
      } else { copiarFallback(url); feito(); }
    };

    var fechar = document.createElement('button');
    fechar.className = 'dp-no-print';
    fechar.textContent = 'Fechar';
    fechar.style.cssText = 'display:block;width:100%;background:transparent;color:#8a8785;border:none;padding:8px;font-size:14px;cursor:pointer;font-family:inherit;';
    fechar.onclick = function () { overlay.remove(); };

    card.appendChild(copiar);
    card.appendChild(fechar);
    overlay.appendChild(card);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
  }

  function copiarFallback(text) {
    try {
      var t = document.createElement('textarea');
      t.value = text;
      t.className = 'dp-no-print';
      t.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
      document.body.appendChild(t);
      t.focus(); t.select();
      document.execCommand('copy');
      t.remove();
    } catch (_) {}
  }

  /**
   * Função pública — usada no lugar de window.print() nos geradores.
   */
  window.dpPrint = function () {
    if (precisaDeSafari()) {
      mostrarAvisoSafari();   // aviso na PÁGINA — nunca dentro do PDF
      return;                 // não chama print (falha silenciosa nesses navegadores)
    }
    window.print();           // CAMINHO PADRÃO — inalterado (Safari/Android/desktop)
  };

  // Aplica a regra de print-hide o quanto antes
  if (document.head) ensurePrintHideStyle();
  else document.addEventListener('DOMContentLoaded', ensurePrintHideStyle);
})();
