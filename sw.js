/* يحفظ التطبيق ودروسه على الجهاز ليعمل دون إنترنت، ويحدّثها عند توفر الاتصال */
const CACHE='science-app-v97';
const ASSETS='science-assets-v1'; /* صور وخطوط ومكتبات مشتركة بأسماء ثابتة المحتوى: تُحفظ مرة واحدة ولا تُحذف عند التحديث */
const SHELL=['./','index.html','catalog-v4.json','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png',
 'fonts/lalezar.woff2','fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2','fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2','fonts/ibm-plex-sans-arabic-latin-400-normal.woff2','fonts/ibm-plex-sans-arabic-latin-600-normal.woff2',
 'img/scene.webp','img/g7.webp','img/g8.webp','img/g9.webp','img/flask.webp','img/books.webp',
 'pen.js','tools/kit.css','tools/kit.js','tools/modes.js','tools/games.js','img/t_lab.webp','img/t_activity.webp','img/t_contest.webp','img/t_assess.webp','img/t_video.webp','img/t_sheet.webp','img/t_extra.webp','img/t_game.webp','tools/arena.js','fonts/readex-pro-arabic-600.woff2','fonts/readex-pro-arabic-700.woff2','fonts/readex-pro-latin-700.woff2'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())) });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k!==ASSETS).map(k=>caches.delete(k)))).then(()=>self.clients.claim())) });
/* حفظ الدروس للعمل دون إنترنت: ملفًا واحدًا كل مرة وبعد مهلة، حتى لا ينافس الدرس الذي يفتحه المستخدم */
let Q=[],busy=false;
async function drain(){ if(busy) return; busy=true; const c=await caches.open(CACHE); await new Promise(r=>setTimeout(r,8000));
  while(Q.length){ const u=Q.shift(); try{ if(!(await c.match(u,{ignoreSearch:true}))) await c.add(u) }catch(_){} await new Promise(r=>setTimeout(r,150)) } busy=false }
self.addEventListener('message',e=>{ if(e.data&&e.data.cache){ const seen=new Set(Q); e.data.cache.forEach(u=>{ if(!seen.has(u)) Q.push(u) }); drain() } });
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET'||new URL(req.url).origin!==location.origin) return;
  const path=new URL(req.url).pathname;
  /* الملفات المشتركة (assets): من الجهاز مباشرة، وتُحمَّل من الشبكة مرة واحدة فقط */
  if(/\/assets\//.test(path)){ e.respondWith(caches.open(ASSETS).then(async c=>{ const hit=await c.match(req); if(hit) return hit;
    const r=await fetch(req).catch(()=>null); if(r&&r.ok) c.put(req,r.clone()); return r||new Response('',{status:503}) })); return; }
  /* الفهرس والدروس والأدوات: أحدث نسخة من الشبكة، وإن تأخرت الشبكة أكثر من ثانيتين تُعرض النسخة المحفوظة فورًا */
  const fresh=/catalog(-v4)?\.json$|\/tools\/|\/lessons\/|\/$|index\.html$|manifest\.webmanifest$|sw\.js$|pen\.js$/.test(path);
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(req,{ignoreSearch:true});
    const net=fetch(fresh?new Request(req,{cache:'no-cache'}):req).then(r=>{ if(r&&r.ok) c.put(req,r.clone()); return r }).catch(()=>null);
    if(fresh){ if(!hit){ const r=await net; return r||new Response('غير متصل',{status:503}) }
      const r=await Promise.race([net,new Promise(ok=>setTimeout(()=>ok(null),2000))]); return r||hit }
    return hit||(await net)||new Response('غير متاح دون اتصال',{status:503});
  }));
});
