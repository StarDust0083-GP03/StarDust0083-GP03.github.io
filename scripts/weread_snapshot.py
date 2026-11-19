"""Run only on the private server. Publish a snapshot for one approved book."""
import datetime as dt
import json
import os
from pathlib import Path
import urllib.request

BOOK = '25016193'
DEST = Path('/var/lib/stardust-public-feed/reading.json')
class Direct(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*args): return None
key = Path('/etc/stardust-sync/weread.key').read_text().strip()
req = urllib.request.Request('https://i.weread.qq.com/api/agent/gateway',data=json.dumps({'api_name':'/book/getprogress','bookId':BOOK,'skill_version':'1.0.6'}).encode(),headers={'Content-Type':'application/json','Authorization':'Bearer '+key})
with urllib.request.build_opener(Direct).open(req,timeout=20) as response:
    p=json.load(response)['book']
progress=p['progress']
if type(progress) not in (int,float) or not 0<=progress<=100: raise ValueError('invalid progress')
zone=dt.timezone(dt.timedelta(hours=8)); date=dt.datetime.fromtimestamp(p['updateTime'],zone).date().isoformat()
base={'source':'微信读书','title':'奔跑吧，程序员：从零开始打造产品、技术和团队','date':date,'progress':progress,'event':f'已读至 {progress:g}%','url':'https://weread.qq.com/web/search/books?keyword=%E5%A5%94%E8%B7%91%E5%90%A7%EF%BC%8C%E7%A8%8B%E5%BA%8F%E5%91%98'}
old=json.loads(DEST.read_text()) if DEST.exists() else {'cards':[]}
history=[c for c in old['cards'] if not c['id'].endswith(':current')]
prev=max((c['progress'] for c in old['cards']),default=-1)
crossed=[v for v in (25,50,75,100) if prev<v<=progress]
if prev<0 or crossed:
    stage=str(max(crossed)) if crossed else 'baseline'; cid=f'weread:{BOOK}:{stage}'
    if not any(c['id']==cid for c in history): history.append(dict(base,id=cid))
cards=history if any(c['progress']==progress for c in history) else history+[dict(base,id=f'weread:{BOOK}:current')]
tmp=DEST.with_suffix('.tmp');tmp.write_text(json.dumps({'checkedAt':dt.datetime.now(zone).isoformat(),'cards':cards},ensure_ascii=False));os.chmod(tmp,0o644);os.replace(tmp,DEST)
