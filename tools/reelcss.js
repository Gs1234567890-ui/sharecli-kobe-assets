function fs(t,w,max){const L=Math.max(...t.split("\n").map(l=>[...l].reduce((a,c)=>a+(/[ -~]/.test(c)?.55:1),0)));return Math.min(max,Math.floor(w/L))}
const REEL_CSS = `
#R{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:"Noto Sans CJK JP",sans-serif;color:#12313A;background:linear-gradient(170deg,#E3F3F7 0%,#FFFFFF 55%,#D6EDF3 100%)}
#R .sc{position:absolute;inset:0}
#R::after{content:"";position:absolute;inset:0;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.25 0 0 0 0 0.18 0 0 0 0.09 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E");z-index:50}
#R .brand{position:absolute;left:70px;top:150px;font-size:36px;font-weight:900;color:#1F7F96;letter-spacing:.06em}
#R h1{position:absolute;left:70px;right:70px;margin:0;font-weight:900;line-height:1.3;white-space:pre-line}
#R .item{position:absolute;left:90px;right:150px;background:#fff;border-radius:32px;padding:34px 40px;font-size:52px;font-weight:700;box-shadow:0 10px 30px rgba(31,127,150,.15);display:flex;gap:26px;align-items:center}
#R .item b{flex:none;width:76px;height:76px;border-radius:50%;background:#1F7F96;color:#fff;display:flex;align-items:center;justify-content:center;font-size:42px}
#R .bubble{position:absolute;background:#fff;border:6px solid #1F7F96;border-radius:40px;font-size:54px;font-weight:700;line-height:1.45;padding:30px 40px}
#R .note{position:absolute;left:0;right:0;bottom:120px;text-align:center;font-size:26px;color:#4C6A73}
`;
