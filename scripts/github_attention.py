"""Reconcile daily public snapshots. Keep the archive in the last deployed feed."""
import datetime as dt
import hashlib
import json
import urllib.request

OWNER='StarDust0083-GP03'
LIVE='https://stardust0083-gp03.github.io/data/milestones.json'

def pages(path, headers, accept):
    for page in range(1,1001):
        req=urllib.request.Request(f'https://api.github.com/users/{OWNER}/{path}&per_page=100&page={page}',headers={**headers,'Accept':accept})
        with urllib.request.urlopen(req,timeout=30) as res:
            rows=json.load(res); more='rel="next"' in res.headers.get('Link','')
        yield from rows
        if not more:return
    raise ValueError('incomplete GitHub pagination')

def reconcile(previous,current,history,now):
    changes={c['id']:c for c in history}
    for key in sorted(previous.keys() | current.keys()):
        old,new=previous.get(key),current.get(key)
        if old and new and old['since']==new['since']:continue  # includes renames
        item=new or old; kind=key.split(':')[0]; label={'star':'Star','fork':'Fork'}[kind]
        when=item['since'] if new else now
        action=label if new else label+' 移出公开列表'
        if old and new: action='重新 '+label
        elif new and any(c.get('repoKey')==key and c.get('since')==item['since'] for c in history):
            action=label+' 重新出现在公开列表';when=now
        fingerprint=hashlib.sha256(f'{key}|{action}|{when}|{now if old else ""}'.encode()).hexdigest()[:20]
        id='attention:'+fingerprint
        changes[id]={'id':id,'repoKey':key,'since':item['since'],'category':'learning','action':kind,'source':'GitHub','event':action,'date':when[:10],'at':when,'title':item['name'],'url':'https://github.com/'+item['name']}
    return list(changes.values())

def collect(headers):
    now=dt.datetime.now(dt.timezone.utc).isoformat(timespec='seconds')
    # Fail closed if the previous archive cannot be read; never silently reset it.
    with urllib.request.urlopen(LIVE+'?build='+now[:19],timeout=25) as r: last=json.load(r)
    current={}
    for row in pages('starred?sort=created',headers,'application/vnd.github.star+json'):
        r=row['repo']
        if not r['private']:current['star:'+str(r['id'])]={'name':r['full_name'],'since':row['starred_at']}
    for r in pages('repos?type=owner',headers,'application/vnd.github+json'):
        if r['fork'] and not r['private']:current['fork:'+str(r['id'])]={'name':r['full_name'],'since':r['created_at']}
    history=[c for c in last['cards'] if c['id'].startswith('attention:')]
    return current,reconcile(last.get('githubAttention',{}),current,history,now)
