/* يحفظ التطبيق ودروسه على الجهاز ليعمل دون إنترنت، ويحدّثها عند توفر الاتصال */
const CACHE='science-app-v13';
const SHELL=['./','index.html','catalog-v4.json','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png',
 'fonts/lalezar.woff2','fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2','fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2','fonts/ibm-plex-sans-arabic-latin-400-normal.woff2','fonts/ibm-plex-sans-arabic-latin-600-normal.woff2',
 'img/scene.webp','img/g7.webp','img/g8.webp','img/g9.webp','img/flask.webp','img/books.webp',
 'tools/kit.css','tools/kit.js','tools/modes.js','tools/games.js','img/t_lab.webp','img/t_activity.webp','img/t_contest.webp','img/t_assess.webp','img/t_video.webp','img/t_sheet.webp','img/t_extra.webp'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())) });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())) });
self.addEventListener('message',e=>{ if(e.data&&e.data.cache){ caches.open(CACHE).then(c=>Promise.all(e.data.cache.map(u=>c.match(u).then(m=>m||c.add(u).catch(()=>{}))))) } });
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET'||new URL(req.url).origin!==location.origin) return;
  /* الفهرس والصفحة الرئيسية: الشبكة أولًا ثم النسخة المحفوظة؛ بقية الملفات: المحفوظ أولًا مع تحديث في الخلفية */
  const fresh=/catalog(-v4)?\.json$|\/tools\/(kit|modes|games)\.(js|css)$|\/$|index\.html$|manifest\.webmanifest$|sw\.js$/.test(new URL(req.url).pathname);
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(req,{ignoreSearch:true});
    const net=fetch(req).then(r=>{ if(r&&r.ok) c.put(req,r.clone()); return r }).catch(()=>null);
    if(fresh){ const r=await net; return r||hit||new Response('غير متصل',{status:503}) }
    return hit||(await net)||new Response('غير متاح دون اتصال',{status:503});
  }));
});
