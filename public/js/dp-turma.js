/* ════════════════════════════════════════════════════════════
   TURMA DA MISSÃO MATEMÁTICA — personagens vivos (SVG) compartilhados pelos jogos
   Lia, Téo, Duda e Vô Zé. Usar com /css/dp-turma.css.
   charSVG(id,classeExtra) → string SVG | mood(el,"idle|happy|wow|think|sad")
   look(el,x,y) olhar · talk(el,ms) falar · celebrate(el) comemorar · shake(el) balançar
   ════════════════════════════════════════════════════════════ */
const CHARS={
  duda:{nome:'Duda',skin:'#6A402A',skinL:'#83563A',hair:'#22140D',shirt:'#FFFFFF',shirtD:'#EADFE3',lips:'#5A2420'},
  lia:{nome:'Lia',skin:'#8E5B3D',skinL:'#A6714F',hair:'#2A1810',shirt:'#F7B928',shirtD:'#DC9C12',lips:'#6A2A22'},
  teo:{nome:'Téo',skin:'#B77A50',skinL:'#CB9066',hair:'#3A2214',shirt:'#3F7FD8',shirtD:'#2E66B7',lips:'#7A3A2A'},
  vo:{nome:'Vô Zé',skin:'#E3AE87',skinL:'#F0C29E',hair:'#ECE7E0',shirt:'#4CAF50',shirtD:'#3A9140',lips:'#9A4A3A'}
};
let charSeq=0;
function charSVG(id,extra=''){
  const c=CHARS[id],u='c'+(++charSeq);
  const hairBack={
    duda:`<circle cx="52" cy="66" r="27" fill="${c.hair}"/><circle cx="148" cy="66" r="27" fill="${c.hair}"/>`,
    lia:`<circle cx="100" cy="40" r="22" fill="${c.hair}"/><path d="M52 104c-6-30 8-60 48-62 40 2 54 32 48 62l-6 18H58z" fill="${c.hair}"/>`,
    teo:``,
    vo:`<ellipse cx="56" cy="98" rx="12" ry="20" fill="${c.hair}"/><ellipse cx="144" cy="98" rx="12" ry="20" fill="${c.hair}"/>`
  }[id];
  const hairFront={
    duda:`<path d="M54 92c-2-30 18-48 46-48s48 18 46 48c-10-14-26-20-46-20s-36 6-46 20z" fill="${c.hair}"/>`,
    lia:`<path d="M52 98c-2-34 20-54 48-54 30 0 50 20 48 54-8-16-24-26-40-27 4 6 4 12 0 16-6-10-22-14-34-10-10 4-18 12-22 21z" fill="${c.hair}"/><rect x="112" y="30" width="26" height="10" rx="5" transform="rotate(28 125 35)" fill="#EC4F7A"/>`,
    teo:`<path d="M52 94c-4-32 16-52 46-52 32 0 52 18 50 50-6-12-14-18-22-20 2 6 0 10-4 12-4-8-12-12-22-12 2 5 0 9-4 11-6-8-16-10-26-6-8 4-14 10-18 17z" fill="${c.hair}"/>`,
    vo:`<path d="M60 74c8-18 24-28 40-28s32 10 40 28c-12-6-26-9-40-9s-28 3-40 9z" fill="${c.hair}" opacity=".9"/>`
  }[id];
  const hat=id==='duda'?`<g><rect x="66" y="42" width="68" height="18" rx="6" fill="#fff" stroke="#EADFE3" stroke-width="2"/><circle cx="76" cy="30" r="15" fill="#fff"/><circle cx="100" cy="20" r="19" fill="#fff"/><circle cx="124" cy="30" r="15" fill="#fff"/><rect x="70" y="26" width="60" height="22" fill="#fff"/><path d="M78 52h44" stroke="#F0568A" stroke-width="4" stroke-linecap="round"/></g>`:'';
  const glasses=id==='vo'?`<g fill="none" stroke="#3A2A22" stroke-width="3"><circle cx="82" cy="104" r="13"/><circle cx="118" cy="104" r="13"/><path d="M95 103q5-4 10 0M69 102l-12-4M131 102l12-4"/></g><path d="M86 124q14-8 28 0q-6 8-14 4q-8 4-14-4z" fill="#F4F1EC"/>`:'';
  const outfit={
    duda:`<path d="M66 176h68l8 54H58z" fill="#F0568A"/><path d="M84 170l16 14 16-14" fill="none" stroke="#F0568A" stroke-width="5" stroke-linecap="round"/><path d="M92 198c0-6 8-8 8-2 0-6 8-4 8 2 0 6-8 10-8 12-0-2-8-6-8-12z" fill="#fff"/><rect x="80" y="210" width="40" height="14" rx="4" fill="#C93468"/>`,
    lia:`<path d="M84 162q16 12 32 0" fill="none" stroke="${c.shirtD}" stroke-width="4"/>`,
    teo:`<text x="100" y="212" text-anchor="middle" font-family="Baloo 2,Arial" font-weight="800" font-size="34" fill="#fff">10</text><path d="M80 164l20 16 20-16" fill="none" stroke="#fff" stroke-width="5"/>`,
    vo:`<path d="M82 160l18 18 18-18" fill="#fff"/><path d="M100 178v52" stroke="${c.shirtD}" stroke-width="3"/><circle cx="100" cy="196" r="3" fill="#fff"/><circle cx="100" cy="214" r="3" fill="#fff"/>`
  }[id];
  const browColor=id==='vo'?c.hair:c.hair;
  return `<svg class="char char-${id} ${extra}" data-mood="idle" viewBox="0 0 200 232" style="--bd:${(Math.random()*2).toFixed(2)}s" aria-label="${c.nome}" role="img">
  <defs><radialGradient id="${u}s" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="${c.skinL}"/><stop offset="1" stop-color="${c.skin}"/></radialGradient></defs>
  <g class="arm arm-l"><path d="M54 176c-14 8-22 26-24 50" stroke="${c.shirt}" stroke-width="22" stroke-linecap="round" fill="none"/><circle cx="30" cy="228" r="11" fill="${c.skin}"/></g>
  <g class="arm arm-r"><path d="M146 176c14 8 22 26 24 50" stroke="${c.shirt}" stroke-width="22" stroke-linecap="round" fill="none"/><circle cx="170" cy="228" r="11" fill="${c.skin}"/></g>
  <g class="c-body"><path d="M38 232c0-46 26-68 62-68s62 22 62 68z" fill="${c.shirt}"/><path d="M38 232c0-46 26-68 62-68" fill="none" stroke="${c.shirtD}" stroke-width="3" opacity=".6"/>${outfit}</g>
  <g class="c-head">
    <rect x="88" y="140" width="24" height="28" rx="10" fill="${c.skin}"/>
    ${hairBack}
    <circle cx="50" cy="108" r="11" fill="${c.skin}"/><circle cx="150" cy="108" r="11" fill="${c.skin}"/>
    <ellipse cx="100" cy="102" rx="50" ry="52" fill="url(#${u}s)"/>
    ${hairFront}${hat}
    <ellipse cx="72" cy="122" rx="9" ry="5.5" fill="#FF7E86" opacity=".32"/><ellipse cx="128" cy="122" rx="9" ry="5.5" fill="#FF7E86" opacity=".32"/>
    <g class="eyes">
      <g transform="translate(82 104)"><ellipse rx="9.5" ry="11" fill="#fff"/><g class="pupil"><circle r="6.6" fill="#2B1810"/><circle cx="-2.2" cy="-2.6" r="2.3" fill="#fff"/><circle cx="2.4" cy="2.2" r="1" fill="#fff" opacity=".8"/></g><rect class="lid" x="-11" y="-12" width="22" height="24" rx="10" fill="${c.skin}"/></g>
      <g transform="translate(118 104)"><ellipse rx="9.5" ry="11" fill="#fff"/><g class="pupil"><circle r="6.6" fill="#2B1810"/><circle cx="-2.2" cy="-2.6" r="2.3" fill="#fff"/><circle cx="2.4" cy="2.2" r="1" fill="#fff" opacity=".8"/></g><rect class="lid" x="-11" y="-12" width="22" height="24" rx="10" fill="${c.skin}"/></g>
    </g>
    <g class="brows" stroke="${browColor}" stroke-width="${id==='vo'?6:4.5}" stroke-linecap="round" fill="none">
      <path class="brow-l" d="M72 86q10-6 19-1"/><path class="brow-r" d="M109 85q9-5 19 1"/>
    </g>
    <path d="M97 116q3 3 6 0" stroke="${c.lips}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".55"/>
    ${glasses}
    <g class="mouths">
      <path class="m m-smile" d="M86 128q14 13 28 0" stroke="${c.lips}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <g class="m m-open"><path d="M83 125q17 26 34 0z" fill="#6E1F22"/><ellipse cx="100" cy="135" rx="9" ry="5" fill="#FF8D9A"/><path d="M86 126h28" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>
      <ellipse class="m m-o" cx="100" cy="131" rx="6.5" ry="8" fill="#6E1F22"/>
      <path class="m m-flat" d="M90 131q10 3 20-2" stroke="${c.lips}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path class="m m-sad" d="M88 134q12-9 24 0" stroke="${c.lips}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse class="m m-talk" cx="100" cy="130" rx="8" ry="6" fill="#6E1F22"/>
    </g>
  </g>
</svg>`;
}
function mood(el,m){if(el)el.setAttribute('data-mood',m);}
function look(el,x,y){if(el){el.style.setProperty('--lx',x+'px');el.style.setProperty('--ly',y+'px');}}
let talkTimers=new Map();
function talk(el,ms=1600){if(!el)return;clearInterval(talkTimers.get(el));let on=false;const t=setInterval(()=>{on=!on;el.classList.toggle('talk-b',on);},130);talkTimers.set(el,t);setTimeout(()=>{clearInterval(t);el.classList.remove('talk-b');},ms);}
function celebrate(el){if(!el)return;el.classList.remove('cele');void el.getBoundingClientRect();el.classList.add('cele');mood(el,'happy');setTimeout(()=>el.classList.remove('cele'),1300);}
function shake(el){if(!el)return;el.classList.remove('shake');void el.getBoundingClientRect();el.classList.add('shake');}
