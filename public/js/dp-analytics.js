/* Doceria — analytics compartilhado.
   Garante Google Analytics (GA4) + Microsoft Clarity em QUALQUER página
   (inclusive as estáticas de /public, que não passam pelo layout do Next),
   sem carregar duas vezes. Expõe window.dpTrack(nome, params) para marcar
   os degraus do funil (cadastro, geração, checkout, compra). */
(function () {
  var GA = 'G-D20QSCLT8C';
  var CLARITY = 'x30n5e0ymc';

  /* "Sou eu": a dona do site abre ?sou-eu UMA vez em cada aparelho e aquele
     navegador deixa de ser contado (Analytics + Clarity), mesmo se o IP mudar.
     ?nao-sou-eu volta a contar. Guardado no localStorage (dp_interno). */
  var interno = false;
  try {
    var q = location.search;
    if (/[?&]nao-sou-eu\b/.test(q)) { localStorage.removeItem('dp_interno'); avisar('Este navegador volta a ser contado nas estatísticas.'); }
    else if (/[?&]sou-eu\b/.test(q)) { localStorage.setItem('dp_interno', '1'); avisar('Pronto! Este navegador não será mais contado nas estatísticas. ✔️'); }
    interno = localStorage.getItem('dp_interno') === '1';
  } catch (e) {}
  function avisar(msg) {
    function show() {
      var d = document.createElement('div');
      d.textContent = msg;
      d.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:99999;background:#2d6e6e;color:#fff;font:700 15px system-ui,sans-serif;padding:12px 18px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.25);max-width:90vw;text-align:center';
      document.body.appendChild(d);
      setTimeout(function () { d.remove(); }, 5000);
    }
    if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
  }
  if (interno) {
    window['ga-disable-' + GA] = true;          // desliga o GA mesmo se outro script já o carregou
    window.dpTrack = function () {};
    return;                                     // não injeta GA nem Clarity
  }

  // Google Analytics — só injeta se ainda não estiver na página
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    (document.head || document.documentElement).appendChild(g);
    window.gtag('js', new Date());
    window.gtag('config', GA);
  }

  // Microsoft Clarity — só injeta se ainda não estiver na página
  if (!window.clarity) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY);
  }

  // Marcador de eventos do funil (seguro: nunca quebra a página)
  window.dpTrack = function (name, params) {
    try { if (window.gtag) window.gtag('event', name, params || {}); } catch (e) {}
    try { if (window.clarity) window.clarity('event', name); } catch (e) {}
  };
})();
