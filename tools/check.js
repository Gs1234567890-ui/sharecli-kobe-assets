function __lines(el){const r=document.createRange();r.selectNodeContents(el);const rs=[...r.getClientRects()].filter(q=>q.width>1&&q.height>1);
  const tops=[];for(const q of rs){const t=tops.find(t=>Math.abs(t.top-q.top)<q.height*0.5);if(!t)tops.push({top:q.top,left:q.left,right:q.right,h:q.height});else{t.left=Math.min(t.left,q.left);t.right=Math.max(t.right,q.right)}}
  return tops.sort((a,b)=>a.top-b.top)}
function checkLayout(root,W,H){
  const out=[];const all=[...root.querySelectorAll('*')];
  const vis=e=>{let n=e;while(n&&n!==root){const cs=getComputedStyle(n);if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)<0.5)return false;n=n.parentElement}return true};
  const own=e=>[...e.childNodes].some(c=>c.nodeType===3&&c.textContent.trim());
  let tx=all.filter(e=>!(e instanceof SVGElement)&&own(e)&&vis(e));tx=tx.filter(e=>!tx.some(o=>o!==e&&o.contains(e)));
  const gx=[...root.querySelectorAll('img, svg > g, .gxbox')].filter(e=>vis(e));
  const R=e=>{if(e.tagName!=='g'&&e.tagName!=='IMG'&&!e.classList.contains('gxbox')){const ls=__lines(e);if(ls.length){return{l:Math.min(...ls.map(q=>q.left)),r:Math.max(...ls.map(q=>q.right)),t:ls[0].top,b:ls[ls.length-1].top+ls[ls.length-1].h}}}const b=e.getBoundingClientRect();return{l:b.left,r:b.right,t:b.top,b:b.bottom}};
  const name=e=>(e.tagName==='IMG'?'[キャラ画像]':e.tagName==='g'?'[キャラ]':e.classList.contains('gxbox')?'[枠]':'「'+e.textContent.trim().replace(/\s+/g,'').slice(0,14)+'」');
  const items=[...tx.map(e=>({e,k:'t',r:R(e)})),...gx.map(e=>({e,k:'g',r:R(e)}))];
  const ov=(a,b)=>Math.max(0,Math.min(a.r,b.r)-Math.max(a.l,b.l))*Math.max(0,Math.min(a.b,b.b)-Math.max(a.t,b.t));
  for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){const a=items[i],b=items[j];if(a.k==='g'&&b.k==='g')continue;
    if(a.e.contains(b.e)||b.e.contains(a.e))continue;
    if(ov(a.r,b.r)>40)out.push('重なり: '+name(a.e)+' × '+name(b.e))}
  for(const it of items){const r=it.r;if(r.l<-1||r.t<-1||r.r>W+1||r.b>H+1)out.push('はみ出し: '+name(it.e))}
  for(const e of tx){const ls=__lines(e);const fsz=parseFloat(getComputedStyle(e).fontSize);
    if(ls.length>1){const last=ls[ls.length-1];if(last.right-last.left<fsz*1.6)out.push('1文字だけの改行: '+name(e))}
    const exp=(e.innerText.match(/\n/g)||[]).length+1;
    if((e.tagName==='H1'||e.closest('.item')||e.classList.contains('bubble'))&&ls.length>exp)out.push('想定外の改行: '+name(e)+' '+ls.length+'行');
  }
  return out}
