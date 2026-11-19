"""Build a public feed from the approved server snapshot and public sources only."""
import datetime as dt
import json
import os
from pathlib import Path
import re
import sys
import urllib.request

root=Path(__file__).resolve().parents[1]
snapshot=json.loads(Path(sys.argv[1]).read_text())
age=dt.datetime.now(dt.timezone.utc)-dt.datetime.fromisoformat(snapshot['checkedAt'])
if not dt.timedelta(minutes=-10)<age<dt.timedelta(hours=36): raise ValueError('server snapshot is stale')
cards=[]
for c in snapshot['cards']:
    if not c['id'].startswith('weread:25016193:') or not 0<=c['progress']<=100 or not c['url'].startswith('https://weread.qq.com/'):raise ValueError('invalid public reading milestone')
    cards.append({k:c[k] for k in ('id','date','title','event','source','progress','url')})
if not cards:raise ValueError('missing approved book')
for f in (root/'src/content/posts/zh').rglob('*.md'):
    head=f.read_text().split('---',2)[1]
    fields={k:json.loads(v) for k,v in re.findall(r'^(title|translationKey|date|category|slug): (".*")$',head,re.M)}
    cards.append({'id':'note:'+fields['translationKey'],'source':'Obsidian','title':fields['title'],'event':'公开笔记','date':fields['date'][:10],'url':'/zh/{category}/{slug}/'.format(**fields)})
headers={'User-Agent':'StarDust-public-milestones'}
if os.environ.get('GH_TOKEN'):headers['Authorization']='Bearer '+os.environ['GH_TOKEN']
request=urllib.request.Request('https://api.github.com/users/StarDust0083-GP03/events/public?per_page=100',headers=headers)
with urllib.request.urlopen(request,timeout=20) as response:events=json.load(response)
for e in events:
    if e['type']!='ReleaseEvent' or e['payload'].get('action')!='published':continue
    name=e['repo']['name']; rel=e['payload'].get('release') or {}
    if name.split('/')[0].lower()!='stardust0083-gp03' or not rel.get('html_url','').startswith('https://github.com/'):continue
    cards.append({'id':'release:'+str(rel['id']),'source':'GitHub','title':name,'event':'发布 '+rel['tag_name'],'date':e['created_at'][:10],'url':rel['html_url']})
cards.sort(key=lambda c:(c['date'],c['id']),reverse=True)
out=root/'public/data/milestones.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps({'schemaVersion':1,'cards':cards},ensure_ascii=False,indent=2)+'\n')
print('Public milestone cards:',len(cards))
