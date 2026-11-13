/* Phase-2 templates. Needs: P (data2.js), fs() & REEL_CSS (build/reelcss.js), IGCSS (build/lib.js), SHIBA_IMG */
const SLB = {
 "11/13":["肌の水分が減ると、きめが乱れて\n毛穴の影が目立ちやすくなることがあります。","・夕方になると毛穴が目立つ\n・洗顔後につっぱる\n・化粧ノリが悪い","・洗顔はぬるま湯でやさしく\n・洗顔後すぐに保湿\n・乾燥する日は重ね塗りも"],
 "11/16":["季節の変わり目は、抜け毛が\n気になりやすい時期といわれています。","・抜け毛の量が続けて多い\n・生え際の形が変わった\n・髪が細くなってきた","自然に良くなるとは限りません。\n気になったときが相談のタイミングです。"],
 "11/18":["紫外線などが原因で、\n境目がはっきりしやすいのが特徴です。","頬に左右対称に、\nもやっと出やすいのが特徴です。","小さな点が、頬や鼻のまわりに\n散らばるように出ます。"],
 "11/20":["洗顔やタオルでこすると、\n肌への負担になります。","紫外線は冬にも降り注いでいます。\n日焼け止めは通年で。","シミの種類でケアは変わります。\n迷ったら相談を。"],
 "11/23":["男性型脱毛症は、20代から\n気になり始める方もいます。","自然に良くなるとは限らないため、\n早めに知っておくことが大切です。","ビデオ通話なら、誰にも会わずに\nスマホから相談できます。"],
 "11/25":["食欲や血糖値のコントロールに\n関わるホルモンです。","・飲み薬：1日1回、起床時に服用\n・注射：自分で皮下注射\n（毎日タイプ・週1回タイプ）","妊娠中・授乳中の方や、\n糖尿病の治療薬を使っている方などは\n使えません。"],
 "11/27":["□ 寝る時間がバラバラ\n□ 甘いものをよく食べる\n□ スマホを触った手で顔に触れる\n□ メイクをしたまま寝がち","生活習慣が、ニキビに\n影響しているかもしれません。","・寝る時間をそろえる\n・顔を触るクセに気づく\n・メイクは寝る前に落とす"],
 "11/30":["紫外線は冬にも降り注いでいます。\n冬も対策を続けましょう。","乾燥しにくい、\n保湿成分入りのタイプがおすすめです。","シミの種類でケアは変わります。\n迷ったら医師に相談を。"],
 "12/02":["頬に左右対称に出やすい、\nシミの一種です。","・洗顔やクレンジング\n・マッサージ\n・タオルで拭くとき","・泡で包むように洗う\n・タオルは押さえるように\n・自己判断でケアを続けない"],
 "12/04":["熱いお湯で洗うと\nさっぱりして肌にいい？","保湿は\n入浴後すぐがおすすめ？","冬は日焼け止めは\nいらない？"],
 "12/07":["すぐに効果が出る\n→ 変化を感じるまでには\n時間がかかります","若いと相談できない\n→ 20代の方も相談できます","病院に行くしかない\n→ ビデオ通話で\nスマホから相談できます"],
 "12/09":["食事の最初に野菜を食べるのは、\n食べすぎを防ぐ工夫のひとつです。","ひと口ごとに箸を置くなど、\nゆっくり食べる工夫を。","食べすぎた翌日は、\n野菜中心の食事で整えましょう。"],
 "12/11":["旅行や帰省の荷物に、\n忘れず入れておきましょう。","歯みがきの後など、毎日の習慣と\n一緒にすると忘れにくくなります。","年末年始は配送に時間がかかることも。\n次の受け取りは早めに確認を。"]
};
const SL5 = {"12/04":"答え：Q1 ×　Q2 〇　Q3 ×"};
const GLPNOTE = "GLP-1製剤は肥満治療目的では国内未承認の医薬品です（詳細はキャプションへ）";
const CSS2 = `
.ig.cat2-女性の肌 .chip{background:#C2577A}.ig.cat2-男性の薄毛 .chip{background:#24506F}.ig.cat2-ダイエット .chip{background:#2C8C6A}
.ig.cat2-セルフチェック .chip{background:#8A6A1F}
.ig .sw{position:absolute;right:64px;bottom:186px;font-size:30px;font-weight:700;color:#1F7F96}
.ig .pg{position:absolute;left:64px;bottom:186px;font-size:28px;font-weight:700;color:#5B6F76;font-family:"Noto Sans CJK JP",sans-serif}
.ig .body2{position:absolute;left:64px;right:64px;background:#fff;border-radius:36px;padding:44px 48px;font-weight:700;line-height:1.6;white-space:pre-line;box-shadow:0 10px 40px rgba(31,127,150,.12)}
.ig .gnote{position:absolute;left:40px;right:40px;text-align:center;font-size:22px;color:#4C6A73;line-height:1.5}
`;
function cat2(x){return `cat2-${x.c}`}
/* ---------- carousel ---------- */
function slideHTML(x,k){
  const top=`<div class="top"><span class="brand">シェアクリ神戸</span><span class="chip">${x.c}</span></div>`;
  const foot=`<div class="foot" style="height:150px"><b>初めてでも安心｜LINEで完結</b><small>PR</small></div>`;
  const pg=`<div class="pg">${k} / 5</div>`;
  if(k===1){const f=fs(x.hook,880,108);
    return `<div class="ig feed ${cat2(x)}" style="width:1080px;height:1350px"><div class="blob" style="width:900px;height:900px;right:-260px;bottom:-200px"></div>${top}
    <h1 style="top:190px;font-size:${f}px">${x.hook}</h1>
    <div class="tx" style="position:absolute;left:64px;right:64px;top:${190+f*1.28*x.hook.split("\n").length+40}px;font-size:40px;font-weight:700;color:#4C6A73;text-wrap:balance;word-break:auto-phrase">${x.sub}</div>
    <img src="${SHIBA_IMG.point}" style="position:absolute;right:30px;bottom:150px;width:520px">
    <div class="pg">${k} / 5</div><div class="sw" style="right:620px">スワイプして見てね →</div>${foot}</div>`;}
  if(k<=4){const t=x.slides[k-1].replace(/^表紙：/,""), b=SLB[x.d][k-2], L=Math.max(...b.split("\n").map(s=>[...s].length)), bf=Math.min(50,Math.floor(840/L));
    const tf=fs(t,900,76);
    return `<div class="ig feed ${cat2(x)}" style="width:1080px;height:1350px"><div class="blob" style="width:700px;height:700px;right:-240px;bottom:-160px"></div>${top}
    <div style="position:absolute;left:64px;top:160px;font-size:40px;font-weight:900;color:#1F7F96;font-family:'Noto Sans CJK JP',sans-serif">POINT ${k-1}</div>
    <h1 style="top:230px;font-size:${tf}px">${t}</h1>
    <div class="body2" style="top:${230+tf*1.28+70}px;font-size:${bf}px">${b}</div>
    <img src="${SHIBA_IMG.smile}" style="position:absolute;right:20px;bottom:150px;width:330px">
    ${pg}${foot}</div>`;}
  const ans=SL5[x.d];
  return `<div class="ig feed ${cat2(x)}" style="width:1080px;height:1350px"><div class="blob" style="width:900px;height:900px;left:90px;bottom:-260px"></div>${top}
    ${ans?`<h1 style="top:170px;font-size:72px;text-align:center">${ans}</h1>`:""}
    <div class="bubble" style="left:150px;right:150px;top:${ans?300:200}px;width:auto;text-align:center;font-size:${Math.min(48,fs(x.q,700,48))}px;white-space:pre-line">${x.q}</div>
    <img src="${SHIBA_IMG.point}" style="position:absolute;left:340px;top:${ans?540:500}px;width:400px">
    <div class="card" style="left:110px;right:110px;bottom:${x.glp?230:200}px;height:120px;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:900;color:#1F7F96">相談はプロフィールのリンクから</div>
    ${x.glp?`<div class="gnote" style="bottom:166px">${GLPNOTE}</div>`:""}
    ${foot}</div>`;
}
/* ---------- story ---------- */
function storyQ(x){const m=x.st.match(/「([^」]+)」/);return m?m[1]:x.t}
const SB={"ニキビができやすいのは？":"ニキビが\nできやすいのは？","冬も日焼け止め塗ってる？":"冬も\n日焼け止め塗ってる？","シバ先生に聞きたいこと":"シバ先生に\n聞きたいこと","目もとの皮膚は顔の他の部分より？":"目もとの皮膚は\n顔の他の部分より？","LINE登録したら何が届く？":"LINE登録したら\n何が届く？","冬は日焼け止めいらない？":"冬は\n日焼け止めいらない？","費用で気になることは？":"費用で\n気になることは？","今年中に始めたいのは？":"今年中に\n始めたいのは？","持病・飲んでいる薬は必ず伝えよう":"持病・飲んでいる薬は\n必ず伝えよう","頬に左右対称に出やすいのは？":"頬に左右対称に\n出やすいのは？","GLP-1で知りたいこと":"GLP-1で\n知りたいこと","初めての人がつまずく3つ":"初めての人が\nつまずく3つ","〇×クイズ 冬の肌ケア":"〇×クイズ\n冬の肌ケア"};
function story2HTML(x){
  const q=storyQ(x), br=SB[q]||(()=>{const c=q.indexOf("、");return (c>0&&c<q.length-1)?q.slice(0,c+1)+"\n"+q.slice(c+1):q})();
  const f=fs(br,900,110);
  return `<div class="ig story ${cat2(x)}" style="width:1080px;height:1920px"><div class="blob" style="width:1100px;height:1100px;left:-10px;bottom:120px"></div>
  <div class="top" style="top:180px"><span class="brand">シェアクリ神戸</span><span class="chip">${x.c}</span></div>
  <h1 style="top:320px;font-size:${f}px;text-align:center">${br}</h1>
  <div class="card" style="left:200px;right:200px;top:${320+f*1.28*br.split("\n").length+50}px;height:110px;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:700;color:#5B6F76;border:4px dashed #9FCFDB;box-shadow:none;background:rgba(255,255,255,.7)">ここにスタンプを置いてね</div>
  <img src="${SHIBA_IMG[x.car?"point":"smile"]}" style="position:absolute;left:260px;bottom:470px;width:560px">
  <div class="card" style="left:90px;right:90px;bottom:250px;height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px">
    <div style="font-size:44px;font-weight:900">今日のリールもチェックしてね</div>
    <div style="font-size:32px;color:#1F7F96;font-weight:700">相談はプロフィールのリンクからLINEへ</div></div>
  <div class="foot" style="height:200px;padding-bottom:30px"><b>初めてでも安心｜LINEで完結</b><small>受付 10:00〜20:00｜PR</small></div></div>`;
}
/* ---------- reel (15s) ---------- */
const eR=(t,a,b)=>{const v=Math.min(1,Math.max(0,(t-a)/(b-a)));return 1-Math.pow(1-v,3)};
function frameR(i,t){
  const x=P[i], fadeR=(a,b)=>Math.min(eR(t,a,a+0.35),t>b-0.35?1-eR(t,b-0.35,b):1);
  const note=x.glp?`<div class="note tx" style="bottom:100px;line-height:1.5">PR｜自由診療（保険適用外）<br>${GLPNOTE}</div>`:`<div class="note tx">PR｜自由診療（保険適用外）</div>`;
  let h=t<11.8?`<div class="brand tx">シェアクリ神戸</div>`:"";
  if(t<2.6){const k=eR(t,0.05,0.5),hf=fs(x.hook,900,124);
    h+=`<div class="sc" style="opacity:${fadeR(0,2.6)}"><h1 class="tx" style="top:${560-40*k}px;font-size:${hf}px;opacity:${k}">${x.hook}</h1>
    <div class="tx" style="position:absolute;left:70px;right:70px;top:1180px;font-size:${Math.min(50,fs(x.sub,900,50))}px;font-weight:700;color:#4C6A73;opacity:${eR(t,0.7,1.2)}">${x.sub}</div></div>`+note;}
  else if(t<8.8){const m=x.p.length,gap=m>3?28:44;
    h+=`<div class="sc" style="opacity:${fadeR(2.6,8.8)}"><h1 class="tx" style="top:380px;font-size:${fs(x.hd,900,88)}px">${x.hd}</h1>
    <div style="position:absolute;left:80px;right:140px;top:600px;display:flex;flex-direction:column;gap:${gap}px">`+
    x.p.map((s,j)=>{const k=eR(t,3.0+j*0.6,3.5+j*0.6);const L=Math.max(...s.split("\n").map(z=>[...z].length));const f=Math.min(48,Math.floor(680/Math.max(L,1)));
      return `<div class="item tx" style="position:relative;left:auto;right:auto;opacity:${k};transform:translateX(${(1-k)*-80}px);white-space:pre-line;font-size:${f}px;padding:30px 36px"><b>${j+1}</b><span>${s}</span></div>`}).join("")+`</div></div>`+note;}
  else if(t<11.8){const d=eR(t,8.9,9.5),bb=eR(t,9.4,9.8);const pose=x.car?"point":"smile";
    h+=`<div class="sc" style="opacity:${fadeR(8.8,11.8)}">
    <div style="position:absolute;width:960px;height:960px;border-radius:50%;background:#C6E6EE;left:60px;top:740px"></div>
    <div class="bubble tx" style="left:90px;right:150px;top:${400+(1-bb)*30}px;opacity:${bb};text-align:center;white-space:pre-line;font-size:${Math.min(56,fs(x.q,700,56))}px">${x.q}</div>
    <img class="gx" src="${SHIBA_IMG[pose]}" style="position:absolute;left:190px;top:${770+(1-d)*100}px;width:700px;opacity:${d}">
    <div class="tx" style="position:absolute;left:70px;right:70px;top:1640px;text-align:center;font-size:44px;font-weight:700;color:#1F7F96;opacity:${eR(t,10,10.5)}">シバ先生</div></div>`+note;}
  else {const o=eR(t,11.8,12.1),c=eR(t,12.1,12.6),cta=x.cta.replace(/(コメントしてね|コメントで教えてね)$/,"\n$1");
    h=`<div class="sc" style="opacity:${o};background:linear-gradient(170deg,#1F7F96,#165E70)">
    <div class="tx" style="position:absolute;left:70px;top:150px;font-size:36px;font-weight:900;color:#fff;letter-spacing:.06em">シェアクリ神戸</div>
    <div class="tx" style="position:absolute;background:#fff;border-radius:40px;box-shadow:0 10px 30px rgba(0,0,0,.15);left:90px;right:150px;top:420px;padding:50px 40px;opacity:${c};text-align:center;font-size:${Math.min(56,fs(cta,760,56))}px;font-weight:900;line-height:1.5;white-space:pre-line;color:#12313A">${cta}</div>
    <h1 class="tx" style="top:900px;font-size:96px;color:#fff;text-align:center;opacity:${eR(t,12.6,13.0)}">初めてでも安心<br><span style="color:#BFF0D4">LINEで完結</span></h1>
    <div class="tx" style="position:absolute;left:70px;right:70px;top:1260px;text-align:center;font-size:52px;font-weight:900;color:#fff;opacity:${eR(t,13.2,13.6)}">相談はプロフィールのリンクから</div>
    ${x.glp?`<div class="note tx" style="color:#D6EEF3;bottom:100px;line-height:1.5">PR｜自由診療（保険適用外）｜受付 10:00〜20:00<br>${GLPNOTE}</div>`:`<div class="note tx" style="color:#D6EEF3">PR｜自由診療（保険適用外）｜受付 10:00〜20:00</div>`}</div>`;}
  return h;
}
