// Parte visual da Central de AEE (o código fica em aee-ger.js). Montador: fontes-centrais/build-aee.js
module.exports = {
css: `:root{--rosa:#6A4FD8;--rosa-bg:#EEE9FF}
.eyebrow{border-color:rgba(106,79,216,.3);color:#6A4FD8}
.seg button.sel{color:#45309E}
.btn-print{box-shadow:0 5px 0 #45309E}
.tabs{grid-template-columns:repeat(9,1fr)}
@media(max-width:1000px){.tabs{grid-template-columns:repeat(4,1fr)}}
@media(max-width:560px){.tabs{grid-template-columns:repeat(2,1fr)}}
/* painel */
.pick{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;max-height:330px;overflow:auto;padding:2px}
.pick button{border:2px solid #EEDFD0;background:#fff;border-radius:10px;padding:5px 3px;font:inherit;font-size:11px;font-weight:800;display:flex;flex-direction:column;align-items:center;gap:2px;position:relative;cursor:pointer;line-height:1.1;color:var(--ink)}
.pick button.sel{border-color:var(--rosa);background:var(--rosa-bg)}
.pick button b{position:absolute;top:2px;left:4px;background:var(--rosa);color:#fff;border-radius:99px;font-size:11px;padding:0 6px}
.mini{width:34px;height:34px}
.mini-btn{margin-top:8px;border:2px solid #EEDFD0;background:#fff;border-radius:10px;padding:5px 10px;font:inherit;font-weight:800;cursor:pointer}
.sel-p{width:100%;border:2px solid #EEDFD0;border-radius:12px;padding:8px;font:inherit;font-weight:700;background:#fff}
/* cartões de pictograma */
.pc{border:3px solid #333;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;text-align:center;font-weight:700;font-size:18px;gap:4px;line-height:1.15}
.pc .pimg{width:90px;height:90px}
.pc.p{font-size:14px;padding:5px}.pc.p .pimg{width:66px;height:66px}
.pc.g{font-size:24px}.pc.g .pimg{width:150px;height:150px}
.pc.gg{font-size:32px;padding:14px 18px}.pc.gg .pimg{width:220px;height:220px}
.pc.h{flex-direction:row;justify-content:flex-start;gap:16px;font-size:23px;padding:4px 14px;flex:1;text-align:left}.pc.h .pimg{width:60px;height:60px}
.pc.h.big{font-size:28px;padding:8px 16px}.pc.h.big .pimg{width:92px;height:92px}
.corte{border-style:dashed}
.lista,.passos{display:flex;flex-direction:column;gap:8px}
.lista-i,.passo{display:flex;align-items:center;gap:12px}
.lista-i>b,.passo>b{font-family:'Baloo 2';font-size:28px;width:32px;text-align:center}
.feito{width:52px;height:52px;border:3px solid #333;border-radius:10px;flex:none}
.tira{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin-top:6px}
.tira-i{display:flex;flex-direction:column;align-items:center;gap:4px}.tira-i b{font-family:'Baloo 2';font-size:24px}
.tira .pc{width:100%;aspect-ratio:1}
.pd{display:flex;align-items:center;justify-content:center;gap:12px;margin:34px 0 10px}
.pd-col{display:flex;flex-direction:column;align-items:center;gap:10px}
.pd-t{font-family:'Baloo 2';font-size:32px;font-weight:800}
.pd-seta{font-size:56px;color:#6A4FD8}
.base{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin:6px 0 18px}
.base-i{display:flex;flex-direction:column;align-items:center;gap:4px}.base-i b{font-family:'Baloo 2';font-size:24px}
.vazio{width:126px;height:126px;border:3px dashed #999;border-radius:14px;flex:none}
.base-par{grid-template-columns:1fr 1fr}.base-par .base-i{flex-direction:row;justify-content:center;gap:14px}
.recorte{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;border-top:2px dashed #999;padding-top:14px}
.recorte .pc.p{width:126px;height:126px}
.prancha{display:grid;gap:6px}.prancha .pc{aspect-ratio:1;padding:4px}
.leg-f{display:flex;flex-wrap:wrap;gap:6px 14px;justify-content:center;margin-top:12px;font-size:13px;font-weight:700}
.leg-f i{display:inline-block;width:14px;height:14px;border:1.5px solid #333;border-radius:3px;margin-right:5px;vertical-align:-2px}
.apoio{display:grid;gap:16px;justify-items:center;align-content:start}
.apoio.a2{grid-template-columns:1fr}.apoio.a4,.apoio.a6{grid-template-columns:1fr 1fr}
.apoio.a6 .pc.g .pimg{width:118px;height:118px}.apoio .pc{width:100%}
.fichas-q{border:3px solid #333;border-radius:18px;padding:16px}
.fq-top{display:flex;align-items:center;justify-content:space-between;gap:12px;font-family:'Baloo 2';font-size:28px;font-weight:800}
.fq-slots{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:16px}
.slot{width:96px;height:96px;border:3px dashed #999;border-radius:50%}.n10 .slot{width:74px;height:74px}
.tokens{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.token{width:86px;height:86px;border:2px dashed #999;border-radius:50%;display:grid;place-items:center}.token .pimg{width:66px;height:66px}
.lig-par{display:grid;grid-template-columns:auto 1fr auto;row-gap:14px;align-items:center;margin-top:6px}
.lp-l,.lp-r{display:flex;align-items:center;gap:10px}
.pal-p{font-size:30px;font-weight:700;border:3px solid #333;border-radius:12px;padding:10px 18px}
.dica{font-size:13.5px;color:#555;background:#F7F4FF;border-radius:10px;padding:8px 12px;margin:14px 0 0;line-height:1.4}
.cred-p{font-size:10px;color:#999;text-align:center;margin-top:auto;padding-top:8px}
/* fotos */
.pimg.foto,.mini.foto{object-fit:cover;border-radius:10px}
.pc .pimg.foto{border:2px solid rgba(0,0,0,.15)}
.nota-p{font-size:12.5px;color:var(--mut);font-weight:700;line-height:1.35;margin:4px 0 8px}
.minhas{display:flex;flex-direction:column;gap:5px;max-height:260px;overflow:auto}
.mi{display:flex;align-items:center;gap:8px;border:1.5px solid #EEDFD0;border-radius:10px;padding:4px 6px;font-size:13px;font-weight:800}
.mi span{flex:1}
.mi button{border:0;background:var(--rosa-bg);color:#45309E;border-radius:8px;padding:4px 8px;font:inherit;font-size:12px;font-weight:900;cursor:pointer}
/* adaptador de atividades (Fase 2) — tamanho "bem grande" (l-g) é o padrão; "grande" (l-m) logo abaixo */
.ad-ta{width:100%;min-height:140px;border:2px solid #EEDFD0;border-radius:12px;padding:10px;font:inherit;font-size:14px;font-weight:600;resize:vertical}
.ad-msg{font-size:13px;font-weight:700;color:#7D5A44;margin-top:6px}
.ad-folha{display:flex;flex-direction:column;flex:1}
.ad-pag{text-align:right;font-size:12px;color:#888;font-weight:700;margin:-4px 0 4px}
.ad-txt{display:flex;flex-direction:column;gap:18px;margin-top:14px}
.ad-fr{display:flex;align-items:center;gap:18px;font-size:30px;font-weight:600;line-height:1.3}
.ad-fi{width:80px;height:80px;flex:none}
.ad-its{display:flex;flex-direction:column;gap:18px;margin-top:6px;flex:1;justify-content:flex-start}
.ad-it{border:2.5px solid #333;border-radius:16px;padding:14px 18px;break-inside:avoid}
.ad-q{display:flex;gap:14px;align-items:flex-start}
.ad-n{font-family:"Baloo 2";font-size:28px;background:#333;color:#fff;border-radius:50%;width:46px;height:46px;display:grid;place-items:center;flex:none;line-height:1}
.ad-cmd{font-size:18px;color:#444}
.ad-pq{font-size:30px;font-weight:700;line-height:1.25}
.ad-kw{display:flex;gap:18px;margin:10px 0 0 60px}
.ad-kw span{display:flex;flex-direction:column;align-items:center;font-size:15px;font-weight:700}.ad-kw i{font-style:normal}
.ad-ic{width:62px;height:62px}
.ad-ops{display:flex;gap:16px;justify-content:center;margin-top:12px;flex-wrap:wrap}
.ad-op{border:2.5px solid #333;border-radius:14px;padding:10px 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:25px;font-weight:700;min-width:170px;max-width:220px;text-align:center;line-height:1.15}
.ad-oi{width:90px;height:90px}
.ad-ops.apontar .ad-op{min-width:190px;font-size:27px}.ad-ops.apontar .ad-oi{width:110px;height:110px}
.ad-ops.marcar{flex-direction:column;align-items:flex-start;margin-left:60px;gap:10px}
.ad-ops.marcar .ad-op{flex-direction:row;border:0;padding:0;min-width:0;max-width:none;gap:14px}
.ad-x{width:40px;height:40px;border:3px solid #333;border-radius:6px;flex:none}
.ad-ops.marcar .ad-oi{width:56px;height:56px}
.ad-cola{width:180px;height:140px;border:3px dashed #999;border-radius:14px;margin:12px auto 0}
.ad-recorte{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;border-top:2px dashed #999;padding-top:14px;margin-top:16px}
.ad-recorte .ad-op{width:180px;height:140px;border-style:dashed;padding:6px;font-size:21px;min-width:0}.ad-recorte .ad-oi{width:72px;height:72px}
.ad-banco{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:12px}.ad-banco span{border:2px solid #999;border-radius:10px;padding:5px 14px;font-size:24px;font-weight:700}
.ad-lin{border-bottom:2px solid #555;height:54px;margin:4px 20px 0 60px}
.ad-desenho{height:240px;border:3px dashed #999;border-radius:14px;margin-top:12px}
.l-m .ad-pq{font-size:24px}.l-m .ad-fr{font-size:24px}.l-m .ad-fi{width:62px;height:62px}.l-m .ad-cmd{font-size:16px}.l-m .ad-ic{width:50px;height:50px}
.l-m .ad-op{font-size:20px;min-width:140px}.l-m .ad-oi{width:66px;height:66px}.l-m .ad-ops.apontar .ad-oi{width:88px;height:88px}.l-m .ad-ops.apontar .ad-op{font-size:23px}
.l-m .ad-banco span{font-size:20px}.l-m .ad-ops.marcar .ad-oi{width:46px;height:46px}
/* histórias sociais (Fase 3) */
.sc-in{width:100%;border:2px solid #EEDFD0;border-radius:12px;padding:10px;font:inherit;font-weight:700}
.sc-grid{flex:1;display:grid;gap:12px;min-height:0}
.sc-grid.g4{grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}
.sc-grid.g2{grid-template-columns:1fr;grid-template-rows:1fr 1fr}
.sc-cena{border:2.5px dashed #999;border-radius:16px;padding:14px 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;position:relative;min-height:0;overflow:hidden}
.sc-cena p{margin:0;font-size:24px;font-weight:700;line-height:1.3}
.sc-grid.g2 .sc-cena p{font-size:30px}
.sc-ic{width:140px;height:140px}.sc-grid.g2 .sc-ic{width:190px;height:190px}
.sc-n{position:absolute;top:8px;left:12px;font-family:"Baloo 2";font-size:22px;color:#888}
.sc-cena.capa{border-style:solid;border-color:#333;background:#F7F4FF}
.sc-cena.capa h4{font-family:"Baloo 2";font-size:34px;line-height:1.1;margin:0}
.sc-grid.g2 .sc-cena.capa h4{font-size:44px}
.sc-nome{align-self:stretch;text-align:left;font-size:16px;font-weight:700;border-bottom:1.5px solid #555;padding-bottom:4px;margin-top:6px}
.sc-tic{width:52px;height:52px;vertical-align:middle;margin-right:10px}
.sc-il{width:230px;height:230px;border-radius:14px;object-fit:cover;flex:none}.sc-grid.g2 .sc-il{width:300px;height:300px}
.sc-cena.capa .sc-il{width:250px;height:250px}.sc-grid.g2 .sc-cena.capa .sc-il{width:320px;height:320px}
.sc-lil{width:110px;height:110px;border-radius:12px;object-fit:cover;flex:none}
.sc-lista{display:flex;flex-direction:column;gap:16px;margin-top:10px}
.sc-li{display:flex;align-items:center;gap:18px;font-size:26px;font-weight:600;line-height:1.3}
.sc-lic{width:70px;height:70px;flex:none}
.sc-vazio{margin:auto;text-align:center;font-size:22px;font-weight:700;color:#666;max-width:480px}
.em-breve{display:grid;grid-template-columns:1fr;max-width:560px;gap:14px}
@media(max-width:860px){.em-breve{grid-template-columns:1fr}}
.em-breve div{background:#fff;border:2px dashed #C9BFF0;border-radius:20px;padding:16px}
.em-breve b{font-family:'Baloo 2';font-size:19px;display:block;margin-bottom:4px}
.em-breve p{margin:0;color:var(--mut);font-weight:600;font-size:14px}`,

hero: `<div class="hero">
  <div class="blob" style="width:480px;height:480px;background:#E5DEFF;top:-180px;left:-160px"></div>
  <div class="blob" style="width:380px;height:380px;background:#FFE9A8;top:40px;right:-120px"></div>
  <div class="blob" style="width:300px;height:300px;background:#DDF7EE;bottom:-160px;left:40%"></div>
  <div class="hero-in">
    <div>
      <div class="eyebrow">🧩 Central de AEE</div>
      <h1>Recursos de AEE <em>para imprimir</em></h1>
      <p>Rotina visual, quadro "primeiro → depois", passo a passo de higiene, prancha de comunicação, cartões de apoio, quadro de fichas e pareamento — com <b>pictogramas</b> ou <b>fotos realistas</b>, e você ainda pode <b>usar as suas próprias fotos</b>. Tudo pronto para plastificar. <b>Novo:</b> a IA adapta qualquer atividade para o seu aluno, com leitura fácil e pictogramas, e você monta <b>histórias sociais</b> para preparar o aluno para situações novas.</p>
      <div class="chips"><span>🎁 Comece grátis, sem cadastro</span><span>✨ Adaptador de atividades com IA</span><span>📘 Histórias sociais</span><span>📷 Pictograma, foto ou a sua foto</span><span>🔒 Sem pedir diagnóstico</span><span>🔠 Opção caixa alta</span></div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="letra" style="--r:-8deg;background:#6A4FD8;left:2%;top:8%">🗓️</div>
      <div class="letra" style="--r:6deg;background:#F2A900;right:4%;top:0;animation-delay:-2s">⭐</div>
      <div class="letra" style="--r:-4deg;background:#2C9C7E;left:14%;top:46%;animation-delay:-4s">➡️</div>
      <div class="letra" style="--r:8deg;background:#E85A7D;right:8%;top:42%;animation-delay:-3s">💬</div>
      <div class="lia"><div data-char="teo"></div></div>
    </div>
  </div>
</div>`,

secoes: `<section id="geradores" style="padding-top:20px"><div class="wrap">
  <div class="kicker">Recursos para montar</div>
  <h2 class="sec-title">Monte, imprima e plastifique</h2>
  <p class="sec-sub">Escolha o recurso e personalize no painel. A folha aparece ao lado. Imprimir ou salvar em PDF usa 1 crédito — e você começa com 3 grátis.</p>
  <div class="tabs" id="tabs"></div>
  <div class="gen">
    <div class="panel">
      <div id="opts"></div>
      <div id="fotosPanel"></div><input type="file" id="fotoInput" accept="image/*" hidden>
      <div class="field" id="fQtd" style="display:none"><label>Quantidade</label><div class="seg" id="segQtd"></div></div>
      <button class="btn3d btn-new" onclick="outraFolha()">🔄 Gerar outra folha</button>
      <button class="btn3d btn-print" onclick="imprimir()">🖨️ Imprimir<small>usa 1 crédito</small></button>
      <div class="cred">✨ Você tem <b>3 materiais grátis</b> — sem cadastro. Com o e-mail, ganha mais 2.</div>
    </div>
    <div>
      <div class="paper-wrap"><div class="paper" id="paper"></div></div>
      <div class="gaba-tag">📌 Dica: imprima em papel mais grosso e plastifique. Velcro atrás dos cartões deixa tudo reutilizável.</div>
    </div>
  </div>
</div></section>

<section style="padding-top:10px"><div class="wrap">
  <div class="kicker">Atividades prontas</div>
  <h2 class="sec-title">Kits completos para imprimir</h2>
  <p class="sec-sub">Conjuntos prontos para começar a semana. Imprimir o kit inteiro usa só 1 crédito.</p>
  <div class="cards">
    <button class="card" onclick="abrirKit('sala')" style="--sh:#EEE9FF;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#EEE9FF">🗓️</div><h3>Rotina da sala</h3><p>Rotina em lista e em tira, quadro "primeiro → depois" e quadro de fichas.</p><span class="tag" style="background:#EEE9FF;color:#45309E">👀 Ver o kit · 4 páginas</span></button>
    <button class="card" onclick="abrirKit('higiene')" style="--sh:#DDF7EE;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#DDF7EE">🧼</div><h3>Higiene passo a passo</h3><p>Lavar as mãos, escovar os dentes e ir ao banheiro, em tiras para a parede.</p><span class="tag" style="background:#DDF7EE;color:#1E8A72">👀 Ver o kit · 3 páginas</span></button>
    <button class="card" onclick="abrirKit('comunica')" style="--sh:#FDE3E6;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#FDE3E6">💬</div><h3>Comunicação</h3><p>Prancha com 20 figuras e os 8 cartões de apoio (espera, acabou, pausa…).</p><span class="tag" style="background:#FDE3E6;color:#A01528">👀 Ver o kit · 3 páginas</span></button>
  </div>
  <div id="kitView"></div>
</div></section>

<section style="padding-top:10px"><div class="wrap">
  <div class="kicker">Em breve na Central de AEE</div>
  <h2 class="sec-title">Os próximos recursos</h2>
  <div class="em-breve">
    <div><b>🎮 Jogos de baixo estímulo</b><p>Pareamento e sequência na tela, sem cronômetro, sem som de erro e com cores calmas.</p></div>
  </div>
</div></section>

<section class="faq" style="padding-top:10px"><div class="wrap" style="max-width:820px">
  <h2 class="sec-title" style="text-align:center;margin-bottom:18px">Perguntas frequentes</h2>
  <details><summary>Para quem são esses recursos?</summary><p>Para professoras e professores do AEE, da sala comum e de apoio, e para famílias. Eles ajudam estudantes que se beneficiam de apoio visual — com ou sem laudo. Aqui você escolhe pelo <b>apoio que o aluno precisa</b>, não pelo diagnóstico.</p></details>
  <details><summary>Como funciona o adaptador de atividades?</summary><p>Cole o texto de uma atividade (ou envie uma foto dela) e clique em "Adaptar com IA". A IA reescreve em <b>leitura fácil</b> (frases curtas, uma ideia por frase), coloca <b>pictogramas</b> nas palavras-chave e cria opções de resposta. Depois você escolhe, sem gastar outro crédito, <b>como o aluno responde</b> (circular, marcar X, apontar, recortar e colar ou escrever), quantas perguntas vão em cada página e se quer só as essenciais. A IA pode errar: revise sempre antes de imprimir. Não escreva o nome nem o diagnóstico do aluno.</p></details>
  <details><summary>O que é uma história social?</summary><p>É uma história curta, na primeira pessoa ("eu"), que explica com calma uma situação: o que vai acontecer, onde, quem estará lá e o que as pessoas sentem. Ela ajuda o aluno a se preparar para algo novo ou difícil, como ir ao dentista ou esperar a vez. A maioria das frases <b>descreve</b>; poucas frases sugerem o que fazer, sempre de forma positiva ("Eu posso respirar fundo"). Leia com o aluno alguns dias antes da situação. São 8 histórias prontas, e você pode criar outra com a IA.</p></details>
  <details><summary>Pictograma ou foto: qual usar?</summary><p>Depende do aluno. Muitos reconhecem primeiro a <b>foto</b> e, com o tempo, passam a entender o <b>pictograma</b>. Para quem precisa do mais concreto, use <b>a sua foto</b>: o banheiro da escola, a mochila do próprio aluno. Alguns conceitos abstratos, como "acabou" e "agora não", ficam sempre como pictograma, porque a figura explica melhor.</p></details>
  <details><summary>As minhas fotos vão para a internet?</summary><p>Não. Quando você usa "Usar a minha foto", a imagem é reduzida e guardada <b>só neste navegador</b>, no seu computador ou celular. Ela não é enviada para a Doceria. Para apagar, use o botão "Apagar minhas fotos" no painel. As fotos realistas que já vêm no site mostram pessoas que não existem, criadas para a Doceria.</p></details>
  <details><summary>Preciso informar o diagnóstico do aluno?</summary><p>Não. A Doceria não pede nem guarda diagnóstico ou dados de saúde. O nome do aluno só aparece se você escrever à mão na folha impressa.</p></details>
  <details><summary>De onde vêm os pictogramas?</summary><p>Do <a href="https://openmoji.org" target="_blank" rel="noopener">OpenMoji</a>, uma biblioteca aberta de pictogramas (licença CC BY-SA 4.0). Usamos sempre o mesmo desenho para a mesma palavra, porque a consistência é essencial para quem aprende por imagens.</p></details>
  <details><summary>Qual é a base legal do AEE?</summary><p>A Política Nacional de Educação Especial na Perspectiva da Educação Inclusiva (2008), a Lei Brasileira de Inclusão (Lei nº 13.146/2015) e o Decreto nº 7.611/2011, que trata do Atendimento Educacional Especializado.</p></details>
  <details><summary>Como funcionam os créditos?</summary><p>Você pode montar e ver quantas folhas quiser. Para imprimir ou salvar em PDF, cada folha usa 1 crédito — e você começa com 3 grátis, sem cadastro. Com o e-mail ganha mais 2 e, depois, 1 grátis por semana. Cada kit inteiro usa só 1 crédito.</p></details>
</div></section>`
};
