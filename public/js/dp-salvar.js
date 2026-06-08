// Helper para salvar atividade gerada no histórico do usuário.
// Deve ser carregado DEPOIS de dp-auth.js (que injeta o token automaticamente).
(function () {
  // Extrai todos os <style> inline da página (sem CORS de folhas externas)
  function extractInlineStyles() {
    return Array.from(document.querySelectorAll('style'))
      .map(s => s.textContent || '')
      .join('\n');
  }

  // Retorna HTML auto-suficiente para reimprimir o conteúdo
  function buildPrintPage(contentHtml) {
    const styles = extractInlineStyles();
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Reimprimir — Doceria Pedagógica</title>
<style>${styles}</style>
</head>
<body>${contentHtml}</body>
</html>`;
  }

  // Fire-and-forget: salva sem bloquear a UI
  window.dpSalvar = function (tipo, tema, nivel, titulo, contentSelector) {
    try {
      const el = typeof contentSelector === 'string'
        ? document.querySelector(contentSelector)
        : contentSelector; // aceita elemento direto
      if (!el) return;

      const conteudo_html = buildPrintPage(el.outerHTML);

      fetch('/api/salvar-atividade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo, tema, nivel, titulo, conteudo_html }),
      }).catch(() => {}); // silencia erros de rede — não afeta a experiência
    } catch (_) {}
  };
})();
