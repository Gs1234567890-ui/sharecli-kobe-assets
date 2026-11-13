const IGCSS = `
.ig{position:relative;overflow:hidden;font-family:"Noto Sans CJK JP","Noto Sans JP","Hiragino Sans","Yu Gothic",sans-serif;color:#12313A;
  background:linear-gradient(165deg,#E3F3F7 0%,#FFFFFF 52%,#D6EDF3 100%);box-sizing:border-box}
.ig *{box-sizing:border-box}
.ig .blob{position:absolute;border-radius:50%;background:#C6E6EE}
.ig .top{position:absolute;left:64px;right:64px;top:56px;display:flex;justify-content:space-between;align-items:center}
.ig .brand{font-size:34px;font-weight:900;letter-spacing:.06em;color:#1F7F96}
.ig .chip{font-size:30px;font-weight:700;background:#1F7F96;color:#fff;padding:8px 26px;border-radius:99px}
.ig.cat-ダイエット .chip{background:#2C8C6A}
.ig.cat-男性の悩み .chip{background:#24506F}
.ig.cat-女性の悩み .chip{background:#C2577A}
.ig h1{position:absolute;left:64px;right:64px;margin:0;font-weight:900;line-height:1.28;letter-spacing:.01em;white-space:pre-line}
.ig .bubble{position:absolute;white-space:pre-line;text-wrap:balance;background:#fff;border:5px solid #1F7F96;border-radius:36px;font-size:40px;font-weight:700;line-height:1.45;padding:26px 34px;color:#12313A}
.ig .bubble::after{content:"";position:absolute;right:-30px;top:50%;width:0;height:0;border:18px solid transparent;border-left:28px solid #1F7F96;transform:translateY(-50%)}
.ig .doc{position:absolute}
.ig .doc svg{width:100%;height:auto;display:block}
.ig .foot{position:absolute;left:0;right:0;bottom:0;background:#1F7F96;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px}
.ig .foot b{font-size:46px;font-weight:900;letter-spacing:.06em}
.ig .foot small{font-size:24px;opacity:.9}
.ig .num{font-weight:900;color:#1F7F96}
.ig::after{content:"";position:absolute;inset:0;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.25 0 0 0 0 0.18 0 0 0 0.09 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E");z-index:50}
.ig .card{position:absolute;background:#fff;border-radius:40px;box-shadow:0 10px 40px rgba(31,127,150,.15)}
`;

const FT=["秋のシミ、\n夏の紫外線が\n原因かも","オンライン診療って\n何を聞かれる？","肌の内側ケアは\n「3ヶ月」が目安","メディカル\nダイエットってなに？","登録から処方までの\n5ステップ","秋は抜け毛が\n増えやすい？","STEP1\nLINE登録は30秒","シミと\n肝斑の違い","費用と\n送料のこと","始めてすぐ抜け毛が\n増えることがある？","髪のための\n睡眠習慣","初めてでも安心な\n3つの理由","30秒でできる\n薄毛セルフチェック","STEP2・3\n予約とビデオ通話の診察","繰り返す\n大人ニキビ","診察の前に\n準備するもの","飲み忘れを防ぐ\n3つのコツ","GLP-1は\n飲み薬と注射がある","医師に相談する\nメリット","市販の育毛剤と\n医療機関、何が違う？","STEP4・5\nお支払いと届くまで","冬に向けた\n乾燥肌対策","副作用が\n心配なときは？","GLP-1は\n3〜12ヶ月が目安","GLP-1が使えない人・\n注意が必要な人","よくある質問\nまとめ","20代でも\n薄毛は始まる？","届いた後も\n相談できる","冬のくすみ、\n原因は3つ","自由診療って？\n18歳未満は？"];
const HB={"オンライン診療が初めての人へ":"オンライン診療が\n初めての人へ","続けている人がやっている3つ":"続けている人が\nやっている3つ","市販の育毛剤で効果が分からない人へ":"市販の育毛剤で\n効果が分からない人へ","副作用が不安な人へ":"副作用が\n不安な人へ","始める前に知っておきたい3つのこと":"始める前に\n知っておきたい3つのこと","GLP-1は“続け方”が大事":"GLP-1は\n“続け方”が大事","食事制限が続かない人へ":"食事制限が\n続かない人へ","通院ゼロ。スマホで5ステップ":"通院ゼロ。\nスマホで5ステップ","あなたはいくつ当てはまる？":"あなたは\nいくつ当てはまる？"};
function brk(t){if(HB[t])return HB[t];if(t.includes("\n"))return t;const m=t.match(/^(.+?[、？→＝])(.+)$/);return m?m[1]+"\n"+m[2]:t}
function fs(t,w,max){const L=Math.max(...t.split("\n").map(l=>[...l].reduce((a,c)=>a+(/[ -~]/.test(c)?.55:1),0)));return Math.min(max,Math.floor(w/L))}

/* シバ先生 — hand-drawn illustration style: brown wobbly outline, flat fills, crayon grain. poses: smile | point | phone */
let __si=0;
function doctorSVG(pose){
  const id="i"+(++__si);
  const L='stroke="#5B3A2C" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"';
  const l='stroke="#5B3A2C" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"';
  const BLK="#4A4B50", CRM="#FBF6EC", TAN="#E0A86A", COAT="#FFFFFF", TEAL="#2A8AA2";
  const paw=(cx,cy,r)=>`<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r*0.9}" fill="${CRM}" ${l}/>
    <path d="M${cx-r*0.32} ${cy-r*0.85} L${cx-r*0.32} ${cy-r*0.45} M${cx+r*0.12} ${cy-r*0.9} L${cx+r*0.12} ${cy-r*0.5}" ${l} fill="none" stroke-width="3.5"/>`;
  const arm = pose==="point" ? `
    <path d="M300 470 C302 426 308 392 316 358 L358 362 C358 400 350 434 346 470 Z" fill="${COAT}" ${L}/>
    ${paw(338,332,28)}
    <ellipse cx="338" cy="340" rx="9" ry="7" fill="#F4AFAE"/>` :
   pose==="phone" ? `
    <rect x="160" y="352" width="80" height="124" rx="14" fill="#3B4249" ${l}/>
    <rect x="168" y="362" width="64" height="100" rx="8" fill="#B8E2EA"/>
    <circle cx="200" cy="398" r="14" fill="#fff"/>
    <path d="M193 398 a7 7 0 0 1 14 0 v5 h-14z" fill="${TEAL}"/>
    <rect x="184" y="436" width="32" height="11" rx="5.5" fill="#3CC46E"/>
    ${paw(160,436,22)}${paw(240,436,22)}` : "";
  return `<svg viewBox="0 0 400 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="シバ先生">
  <defs>
    <filter id="${id}r" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="4.5" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="g"/>
      <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 0.62" result="ga"/>
      <feComposite in="d" in2="ga" operator="in" result="tex"/>
      <feBlend in="d" in2="tex" mode="multiply"/>
    </filter>
  </defs>
  <g filter="url(#${id}r)">
  <!-- tail -->
  <path d="M332 420 C354 418 380 404 382 380 C384 354 360 344 346 356 C334 366 344 384 358 378" stroke="#5B3A2C" stroke-width="30" fill="none" stroke-linecap="round"/>
  <path d="M332 420 C354 418 380 404 382 380 C384 354 360 344 346 356 C334 366 344 384 358 378" stroke="${BLK}" stroke-width="18" fill="none" stroke-linecap="round"/>
  <!-- coat -->
  <path d="M50 470 C54 380 102 332 174 312 L226 312 C298 332 346 380 350 470 Z" fill="${COAT}" ${L}/>
  <path d="M176 308 L200 370 L224 308 Z" fill="#E6F2F5" ${l}/>
  <path d="M195 318 L205 318 L209 332 L203 396 L197 396 L191 332 Z" fill="${TEAL}" ${l} stroke-width="4"/>
  <path d="M176 310 L156 342 L190 424 L200 370 Z" fill="${COAT}" ${l}/>
  <path d="M224 310 L244 342 L210 424 L200 370 Z" fill="${COAT}" ${l}/>
  <circle cx="230" cy="410" r="5" fill="#fff" ${l} stroke-width="3"/><circle cx="224" cy="440" r="5" fill="#fff" ${l} stroke-width="3"/>
  <!-- stethoscope -->
  <path d="M168 302 C142 338 142 382 164 406" stroke="#5B3A2C" stroke-width="13" fill="none" stroke-linecap="round"/>
  <path d="M168 302 C142 338 142 382 164 406" stroke="${TEAL}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M232 302 C256 332 258 360 248 384" stroke="#5B3A2C" stroke-width="13" fill="none" stroke-linecap="round"/>
  <path d="M232 302 C256 332 258 360 248 384" stroke="${TEAL}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <circle cx="166" cy="418" r="15" fill="#D8E0E3" ${l}/>
  <!-- badge -->
  <rect x="244" y="388" width="50" height="32" rx="7" fill="${TEAL}" ${l} stroke-width="4"/>
  <ellipse cx="269" cy="408" rx="7" ry="6" fill="#fff"/>
  <circle cx="260" cy="399" r="3" fill="#fff"/><circle cx="266" cy="396" r="3" fill="#fff"/><circle cx="272" cy="396" r="3" fill="#fff"/><circle cx="278" cy="399" r="3" fill="#fff"/>
  <!-- chest fur -->
  <path d="M162 276 C178 288 222 288 238 276 L238 306 C224 318 176 318 162 306 Z" fill="${CRM}" ${l}/>
  <g transform="translate(200 300) scale(1.06) translate(-200 -272)">
  <!-- ears -->
  <path d="M118 128 L128 44 C130 34 140 32 148 40 L196 94 Z" fill="${BLK}" ${L}/>
  <path d="M282 128 L272 44 C270 34 260 32 252 40 L204 94 Z" fill="${BLK}" ${L}/>
  <path d="M136 106 L142 62 L178 98 Z" fill="${TAN}"/>
  <path d="M264 106 L258 62 L222 98 Z" fill="${TAN}"/>
  <!-- head -->
  <path d="M200 80 C270 80 304 122 304 174 C304 228 262 262 200 262 C138 262 96 228 96 174 C96 122 130 80 200 80 Z" fill="${BLK}" ${L}/>
  <!-- face mask -->
  <path d="M200 194 C214 182 236 178 256 182 C284 188 296 208 288 228 C278 254 242 266 200 266 C158 266 122 254 112 228 C104 208 116 188 144 182 C164 178 186 182 200 194 Z" fill="${CRM}" ${l}/>
  <path d="M118 210 C122 196 134 188 146 186 M282 210 C278 196 266 188 254 186" stroke="${TAN}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <!-- brows -->
  <ellipse cx="160" cy="134" rx="13" ry="8" transform="rotate(-12 160 134)" fill="${TAN}"/>
  <ellipse cx="240" cy="134" rx="13" ry="8" transform="rotate(12 240 134)" fill="${TAN}"/>
  <!-- eyes -->
  <ellipse cx="164" cy="166" rx="11" ry="12" fill="#2A1E19"/>
  <ellipse cx="236" cy="166" rx="11" ry="12" fill="#2A1E19"/>
  <circle cx="168" cy="161" r="4" fill="#fff"/><circle cx="240" cy="161" r="4" fill="#fff"/>
  <!-- blush -->
  <ellipse cx="142" cy="222" rx="14" ry="8" fill="#F4AFAE" opacity=".85"/>
  <ellipse cx="258" cy="222" rx="14" ry="8" fill="#F4AFAE" opacity=".85"/>
  <!-- nose + mouth -->
  <path d="M186 205 C188 196 212 196 214 205 C214 214 205 219 200 219 C195 219 186 214 186 205 Z" fill="#3A2A26" ${l} stroke-width="3"/>
  <ellipse cx="195" cy="202" rx="5" ry="2.5" fill="#fff" opacity=".7"/>
  <path d="M200 219 L200 227" ${l} fill="none" stroke-width="4"/>
  <path d="M194 231 C194 245 206 245 206 231 Z" fill="#EE8E95" ${l} stroke-width="3"/>
  <path d="M182 226 C186 236 196 236 200 228 C204 236 214 236 218 226" ${l} fill="none" stroke-width="4.5"/>
  </g>
  ${arm}
  </g>
</svg>`;
}

