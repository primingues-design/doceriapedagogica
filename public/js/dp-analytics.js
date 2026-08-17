/* Doceria — analytics compartilhado.
   Garante Google Analytics (GA4) + Microsoft Clarity em QUALQUER página
   (inclusive as estáticas de /public, que não passam pelo layout do Next),
   sem carregar duas vezes. Expõe window.dpTrack(nome, params) para marcar
   os degraus do funil (cadastro, geração, checkout, compra). */
(function () {
  var GA = 'G-D20QSCLT8C';
  var CLARITY = 'x30n5e0ymc';

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
