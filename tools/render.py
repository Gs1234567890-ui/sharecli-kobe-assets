# シェアクリ神戸 素材レンダラー
# 使い方（リポジトリ直下で実行）:
#   python3 tools/render.py check  1116 1117 ...   レイアウト自動チェック（チェック1回目）
#   python3 tools/render.py build  1116 1117 ...   リール/カルーセル/ストーリーズを生成して reels/ carousel/ stories/ に保存
#   python3 tools/render.py sheets 1116 1117 ...   目視チェック用の一覧画像を sheets/ に作成（チェック2・3回目）
#   python3 tools/render.py captions               plan.js から captions.json を作り直す
# 日付キーは MMDD。plan.js の P 配列に該当日 (d:"11/16" 形式) が必要。
import os, sys, json, base64, subprocess, shutil, glob
from playwright.sync_api import sync_playwright
T=os.path.dirname(os.path.abspath(__file__)); R=os.path.dirname(T)
rd=lambda f:open(os.path.join(T,f)).read()
b64=lambda f:'data:image/png;base64,'+base64.b64encode(open(f,'rb').read()).decode()
SH="const SHIBA_IMG="+json.dumps({k:b64(os.path.join(T,'char',f'shibasensei_{k}.png')) for k in ['smile','point','phone']})+";"
JS="\n".join([rd('reelcss.js'),rd('lib.js'),rd('plan.js'),rd('tpl2.js'),SH,rd('check.js')])
mode=sys.argv[1]; keys=sys.argv[2:]

if mode=='captions':
    out=subprocess.run(['node','-e',rd('plan.js')+';const o={};for(const x of P){o[x.d.replace("/","")]={date:x.d,carousel:!!x.car,caption:fullCap2(x)}};console.log(JSON.stringify(o,null,1))'],capture_output=True,text=True,check=True).stdout
    open(os.path.join(R,'captions.json'),'w').write(out); print('captions.json:',len(json.loads(out)),'days'); sys.exit()

if mode=='sheets':
    from PIL import Image
    os.makedirs(os.path.join(R,'sheets'),exist_ok=True)
    rows=[k for k in keys if os.path.exists(os.path.join(R,'reels',k+'.mp4'))]
    c=Image.new('RGB',(180*10,320*len(rows)),'white')
    for r,k in enumerate(rows):
        for j,t in enumerate([2.0,8.2,11.2,14.8]):
            subprocess.run(['ffmpeg','-y','-loglevel','error','-ss',str(t),'-i',os.path.join(R,'reels',k+'.mp4'),'-frames:v','1','/tmp/_v.jpg'],check=True)
            c.paste(Image.open('/tmp/_v.jpg').resize((180,320)),(j*180,r*320))
        st=os.path.join(R,'stories',k+'.jpg')
        if os.path.exists(st): c.paste(Image.open(st).resize((180,320)),(4*180,r*320))
        for n in range(1,6):
            f=os.path.join(R,'carousel',f'{k}_{n}.jpg')
            if os.path.exists(f): c.paste(Image.open(f).resize((180,225)),((4+n)*180,r*320+48))
    p=os.path.join(R,'sheets',f'check_{keys[0]}-{keys[-1]}.jpg'); c.save(p,quality=88); print('sheet:',p); sys.exit()

with sync_playwright() as p:
    pg=p.chromium.launch().new_page(viewport={'width':1080,'height':1920})
    pg.set_content('<body style="margin:0"><div id="s"></div><div id="R" style="display:none"></div></body>')
    pg.add_script_tag(content=JS+";document.head.insertAdjacentHTML('beforeend','<style>'+IGCSS+CSS2+REEL_CSS+'</style>')")
    idx={}
    for k in keys:
        i=pg.evaluate(f"P.findIndex(x=>x.d.replace('/','')==='{k}')")
        if i<0: sys.exit(f'plan.js に {k} がありません')
        idx[k]=i
    car=lambda i:pg.evaluate(f"!!P[{i}].car")
    if mode=='check':
        iss={}
        def chk(lbl,js,W,H,root):
            pg.evaluate(js); pg.wait_for_timeout(20); r=pg.evaluate(f"checkLayout(document.querySelector('{root}'),{W},{H})")
            if r: iss[lbl]=r
        for k,i in idx.items():
            pg.evaluate("document.getElementById('R').style.display='none'")
            if car(i):
                for n in range(1,6): chk(f'CAR {k}-{n}',f"document.getElementById('s').innerHTML=slideHTML(P[{i}],{n})",1080,1350,'#s > div')
            chk(f'STORY {k}',f"document.getElementById('s').innerHTML=story2HTML(P[{i}])",1080,1920,'#s > div')
            pg.evaluate("document.getElementById('s').innerHTML='';document.getElementById('R').style.display='block'")
            for t in [2.0,8.2,11.2,14.8]: chk(f'REEL {k} t={t}',f"document.getElementById('R').innerHTML=frameR({i},{t})",1080,1920,'#R')
        for a,v in iss.items(): print(a,'|',' / '.join(v))
        print('TOTAL',len(iss)); sys.exit(1 if iss else 0)
    if mode=='build':
        from PIL import Image
        for d in ['reels','carousel','stories']: os.makedirs(os.path.join(R,d),exist_ok=True)
        tmp='/tmp/_shot.png'
        for k,i in idx.items():
            pg.evaluate("document.getElementById('R').style.display='none'")
            if car(i):
                for n in range(1,6):
                    pg.set_viewport_size({'width':1080,'height':1350}); pg.evaluate(f"document.getElementById('s').innerHTML=slideHTML(P[{i}],{n})")
                    pg.screenshot(path=tmp,clip={'x':0,'y':0,'width':1080,'height':1350})
                    Image.open(tmp).convert('RGB').save(os.path.join(R,'carousel',f'{k}_{n}.jpg'),quality=92)
            pg.set_viewport_size({'width':1080,'height':1920}); pg.evaluate(f"document.getElementById('s').innerHTML=story2HTML(P[{i}])")
            pg.screenshot(path=tmp,clip={'x':0,'y':0,'width':1080,'height':1920})
            Image.open(tmp).convert('RGB').save(os.path.join(R,'stories',f'{k}.jpg'),quality=92)
            pg.evaluate("document.getElementById('s').innerHTML='';document.getElementById('R').style.display='block'")
            fr=f'/tmp/_fr{k}'; shutil.rmtree(fr,ignore_errors=True); os.makedirs(fr)
            for n in range(450):
                pg.evaluate(f"document.getElementById('R').innerHTML=frameR({i},{n/30})")
                pg.screenshot(path=os.path.join(fr,f'{n:04d}.jpg'),type='jpeg',quality=90)
            subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','30','-i',os.path.join(fr,'%04d.jpg'),'-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-movflags','+faststart',os.path.join(R,'reels',k+'.mp4')],check=True)
            shutil.rmtree(fr); print('built',k,flush=True)
