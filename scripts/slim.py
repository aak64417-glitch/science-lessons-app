# -*- coding: utf-8 -*-
"""Make lesson/tool pages light: move every embedded (base64) image/font into a shared,
content-hashed file under assets/, so pages download fast and each asset is cached once.
Idempotent: safe to run after every build.  Usage: python3 slim.py <repo>"""
import re, sys, os, glob, base64, hashlib, io
from PIL import Image
REPO = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(REPO, 'assets'); os.makedirs(A, exist_ok=True)
DATA = re.compile(r'data:([\w/+.-]+);base64,([A-Za-z0-9+/=]{1500,})')
EXT = {'font/woff2': 'woff2', 'font/woff': 'woff', 'application/font-woff2': 'woff2', 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/jpg': 'jpg',
       'image/png': 'png', 'image/gif': 'gif', 'image/svg+xml': 'svg'}
cache = {}

def store(mime, b64):
    key = hashlib.sha1(b64.encode()).hexdigest()
    if key in cache: return cache[key]
    raw = base64.b64decode(b64); ext = EXT.get(mime)
    if ext is None: cache[key] = None; return None
    if ext in ('jpg', 'png'):  # re-encode photos as webp (smaller, same look)
        try:
            im = Image.open(io.BytesIO(raw)); im.load()
            buf = io.BytesIO(); alpha = im.mode in ('RGBA', 'LA', 'P')
            (im.convert('RGBA') if alpha else im.convert('RGB')).save(buf, 'WEBP', quality=82, method=5)
            if buf.tell() < len(raw): raw, ext = buf.getvalue(), 'webp'
        except Exception: pass
    name = hashlib.sha1(raw).hexdigest()[:16] + '.' + ext
    p = os.path.join(A, name)
    if not os.path.exists(p): open(p, 'wb').write(raw)
    cache[key] = name; return name

def slim(path):
    s = open(path, encoding='utf-8').read(); before = len(s)
    def rep(m):
        n = store(m.group(1), m.group(2)); return '../assets/' + n if n else m.group(0)
    s = DATA.sub(rep, s)
    def js(m):
        b = m.group(1)
        if len(b) < 30000: return m.group(0)
        n = hashlib.sha1(b.encode()).hexdigest()[:16] + '.js'; p = os.path.join(A, n)
        if not os.path.exists(p): open(p, 'w', encoding='utf-8').write(b)
        return '<script src="../assets/%s"></script>' % n
    s = re.sub(r'<script>(.*?)</script>', js, s, flags=re.S)
    s = re.sub(r'<img(?![^>]*\bloading=)', '<img loading="lazy" decoding="async"', s)
    if len(s) != before: open(path, 'w', encoding='utf-8').write(s)
    return before, len(s)

tot0 = tot1 = 0
for f in sorted(glob.glob(os.path.join(REPO, 'lessons', '*.html')) + glob.glob(os.path.join(REPO, 'tools', '*.html'))):
    a, b = slim(f); tot0 += a; tot1 += b
print('pages: %.1f MB -> %.1f MB; assets: %d files %.1f MB' % (tot0 / 1048576, tot1 / 1048576, len(os.listdir(A)), sum(os.path.getsize(os.path.join(A, x)) for x in os.listdir(A)) / 1048576))
