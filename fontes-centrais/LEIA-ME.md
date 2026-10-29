# Fontes das centrais (História, Geografia, Ciências, Português, Ensino Religioso)

As páginas `public/atividades-*.html` dessas centrais são **montadas** por estes arquivos.
Para mudar uma central, edite a parte dela e rode o montador — ele reescreve a página em `public/`.

- `historia-body.html` — Central de História **e** o código comum de todas (topo, rodapé, caça-palavras, impressão, kits, caixa alta).
- `geo-parts.js`, `cien-parts.js`, `port-parts.js`, `er-parts.js` — o que é próprio de cada central (banco de dados, geradores, kits).
- `build-*.js` — montadores. Uso (na pasta do projeto):

```
node fontes-centrais/build-historia.js public fontes-centrais
node fontes-centrais/build-geografia.js public fontes-centrais
node fontes-centrais/build-ciencias.js public fontes-centrais
node fontes-centrais/build-portugues.js public fontes-centrais
node fontes-centrais/build-religioso.js public fontes-centrais
```

Mudou o `historia-body.html`? Rode **todos** os montadores, porque o código comum vai para todas.

`ferramentas/`: servidor de prévia (`serve.js`), pins do Pinterest (`pins.js`, precisa de `sharp`), folha de contato de imagens (`sheet.js`) e gerador de fotos de paisagem (`gen-paisagem.js`, usa a FAL_KEY do `.env.local`).
