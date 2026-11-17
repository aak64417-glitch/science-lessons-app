/* ===== party.js — ألعاب الفرق الكبرى: ركلات الترجيح بالأسماء، خلية الحروف، من سيربح المليون =====
   تُحمَّل من arena.js عند الطلب، وتستخدم بنك أسئلة الدرس + بقية دروس الفصل. */
(function () {
  'use strict';
  if (window.PARTY) return;
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const AD = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  const MON = n => Number(n).toLocaleString('en-US');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = t => 1 - Math.pow(1 - t, 3), easeIO = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const LET = ['أ', 'ب', 'ج', 'د'];
  let G = null, BACK = null, ROOT = null, RAF = 0, TIMERS = [];
  const later = (fn, ms) => { const id = setTimeout(fn, ms); TIMERS.push(id); return id; };
  function clearAll() { TIMERS.forEach(clearTimeout); TIMERS = []; cancelAnimationFrame(RAF); AU.stopLoop(); if (typeof CS !== 'undefined') CS.stopAll(); }

  /* ---------------- الصوت: مؤثرات مركّبة بالكامل (لا ملفات) ---------------- */
  const AU = {
    ctx: null, out: null, muted: false, loop: null,
    init() { try { if (!this.ctx) { const C = window.AudioContext || window.webkitAudioContext; this.ctx = new C(); this.out = this.ctx.createGain(); this.out.gain.value = .85; const comp = this.ctx.createDynamicsCompressor(); this.out.connect(comp); comp.connect(this.ctx.destination); } if (this.ctx.state === 'suspended') this.ctx.resume(); } catch (e) { } return this.ctx; },
    tone(f, d, o) { o = o || {}; if (this.muted || !this.init()) return; const c = this.ctx, t0 = c.currentTime + (o.at || 0), os = c.createOscillator(), g = c.createGain(); os.type = o.type || 'sine'; os.frequency.setValueAtTime(f, t0); if (o.to) os.frequency.exponentialRampToValueAtTime(o.to, t0 + d); if (o.det) os.detune.value = o.det;
      let node = os; if (o.lp) { const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = o.lp; os.connect(fl); node = fl; }
      if (o.vib) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = o.vib; lg.gain.value = o.vd || 20; l.connect(lg); lg.connect(os.frequency); l.start(t0); l.stop(t0 + d + .1); }
      const v = o.vol == null ? .2 : o.vol, a = o.a || .01; g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + a); if (o.hold) g.gain.setValueAtTime(v, t0 + a + o.hold); g.gain.exponentialRampToValueAtTime(.0005, t0 + d); node.connect(g); g.connect(this.out); os.start(t0); os.stop(t0 + d + .05); },
    noise(d, o) { o = o || {}; if (this.muted || !this.init()) return; const c = this.ctx, t0 = c.currentTime + (o.at || 0), len = Math.ceil(c.sampleRate * d), b = c.createBuffer(1, len, c.sampleRate), ch = b.getChannelData(0); for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
      const s = c.createBufferSource(); s.buffer = b; const f = c.createBiquadFilter(); f.type = o.ft || 'bandpass'; f.frequency.setValueAtTime(o.f || 1000, t0); if (o.f2) f.frequency.exponentialRampToValueAtTime(o.f2, t0 + d); f.Q.value = o.q || 1; const g = c.createGain(), v = o.vol == null ? .2 : o.vol, a = o.a || .01;
      g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + a); if (o.hold) g.gain.setValueAtTime(v, t0 + a + o.hold); g.gain.exponentialRampToValueAtTime(.0005, t0 + d); if (o.trem) { const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = o.trem; lg.gain.value = v * .6; l.connect(lg); lg.connect(g.gain); l.start(t0); l.stop(t0 + d); }
      s.connect(f); f.connect(g); g.connect(this.out); s.start(t0); s.stop(t0 + d); },
    chord(fs, d, o) { fs.forEach((f, i) => this.tone(f, d, Object.assign({}, o, { at: (o && o.at || 0) + (o && o.arp ? i * o.arp : 0) }))); },
    startLoop(fn, ms) { clearInterval(this.loop); let k = 0; fn(k++); this.loop = setInterval(() => fn(k++), ms); },
    stopLoop() { clearInterval(this.loop); this.loop = null; CS.stopAll(); }
  };
  /* ---------------- أصوات يضعها المعلم بنفسه (تُحفظ على الجهاز في IndexedDB) ---------------- */
  const CS = {
    db: null, urls: {}, cur: {},
    open() { return new Promise(res => { if (this.db) return res(this.db); try { const r = indexedDB.open('party-sounds', 1); r.onupgradeneeded = () => r.result.createObjectStore('s'); r.onsuccess = () => { this.db = r.result; res(this.db); }; r.onerror = () => res(null); } catch (e) { res(null); } }); },
    async loadAll() { const db = await this.open(); if (!db) return; await new Promise(res => { try { const rq = db.transaction('s').objectStore('s').openCursor(); rq.onsuccess = () => { const c = rq.result; if (c) { if (this.urls[c.key]) URL.revokeObjectURL(this.urls[c.key]); this.urls[c.key] = URL.createObjectURL(c.value); c.continue(); } else res(); }; rq.onerror = () => res(); } catch (e) { res(); } }); },
    async put(k, blob) { const db = await this.open(); if (!db) return false; return new Promise(res => { const tx = db.transaction('s', 'readwrite'); tx.objectStore('s').put(blob, k); tx.oncomplete = () => { if (this.urls[k]) URL.revokeObjectURL(this.urls[k]); this.urls[k] = URL.createObjectURL(blob); res(true); }; tx.onerror = () => res(false); }); },
    async del(k) { const db = await this.open(); this.stop(k); if (this.urls[k]) URL.revokeObjectURL(this.urls[k]); delete this.urls[k]; if (!db) return; return new Promise(res => { const tx = db.transaction('s', 'readwrite'); tx.objectStore('s').delete(k); tx.oncomplete = () => res(); tx.onerror = () => res(); }); },
    has(k) { return !!this.urls[k]; }, count() { return Object.keys(this.urls).length; },
    play(k, o) { if (!this.urls[k]) return false; if (AU.muted) return true; this.stop(k); const a = new Audio(this.urls[k]); a.loop = !!(o && o.loop); a.play().catch(() => { }); this.cur[k] = a; a.onended = () => { if (this.cur[k] === a) delete this.cur[k]; }; return true; },
    stop(k, fade) { const a = this.cur[k]; if (!a) return; delete this.cur[k]; if (!fade) { try { a.pause(); } catch (e) { } return; } const v0 = a.volume; let i = 0; const id = setInterval(() => { i++; a.volume = Math.max(0, v0 * (1 - i / 10)); if (i >= 10) { clearInterval(id); try { a.pause(); } catch (e) { } } }, fade / 10); },
    stopAll() { Object.keys(this.cur).forEach(k => this.stop(k)); }
  };
  async function readZip(file) {
    const buf = new Uint8Array(await file.arrayBuffer()), dv = new DataView(buf.buffer); let e = buf.length - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--; if (e < 0) throw new Error('zip');
    const n = dv.getUint16(e + 10, true); let p = dv.getUint32(e + 16, true); const out = [];
    for (let i = 0; i < n; i++) { const method = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), lo = dv.getUint32(p + 42, true); const name = new TextDecoder('utf-8').decode(buf.subarray(p + 46, p + 46 + nl)); p += 46 + nl + xl + cl; const st = lo + 30 + dv.getUint16(lo + 26, true) + dv.getUint16(lo + 28, true); out.push({ name, method, data: buf.slice(st, st + csize) }); }
    return out;
  }
  async function unzipEntry(z) { if (z.method === 0) return new Blob([z.data]); const ds = new DecompressionStream('deflate-raw'); return new Response(new Blob([z.data]).stream().pipeThrough(ds)).blob(); }
  /* يطابق ملفات الحزمة مع لحظات اللعبة حسب رقم الملف أو كلمات اسمه */
  function slotFor(name) { const b = name.split('/').pop(), num = parseInt(b, 10), byNum = { 1: 'intro', 2: 'loop1', 3: 'q', 4: 'lock', 5: 'wrong', 6: 'right', 7: 'trans', 8: 'hover', 9: 'click' };
    const kw = [[/مقدم/, 'intro'], [/خلفي|اثناء|أثناء/, 'loop1'], [/بدء|بداية_السؤال/, 'q'], [/ترقب|تفكير/, 'lock'], [/خاطئ/, 'wrong'], [/صحيح/, 'right'], [/فاصل|انتقال/, 'trans'], [/تمرير|مؤشر/, 'hover'], [/نقر/, 'click'], [/مليون/, 'million'], [/جمهور/, 'aud'], [/صديق|اتصال/, 'phone'], [/50|٥٠|حذف/, 'fifty'], [/انسحاب/, 'walk']];
    for (const [re, k] of kw) if (re.test(b)) return k; return byNum[num] || null; }
  async function importZip(file) { const ents = (await readZip(file)).filter(z => /\.(mp3|m4a|wav|ogg|aac)$/i.test(z.name)); let n = 0; for (const z of ents) { const k = slotFor(z.name); if (!k) continue; const blob = await unzipEntry(z); const ext = z.name.split('.').pop().toLowerCase(); await CS.put(k, new Blob([blob], { type: { mp3: 'audio/mpeg', m4a: 'audio/mp4', wav: 'audio/wav', ogg: 'audio/ogg', aac: 'audio/aac' }[ext] || 'audio/mpeg' })); n++; } return n; }
  const SLOTS = [['intro', 'بداية اللعبة'], ['q', 'ظهور السؤال'], ['loop1', 'موسيقى الأسئلة ١–٥'], ['loop2', 'موسيقى الأسئلة ٦–١٠'], ['loop3', 'موسيقى الأسئلة ١١–١٥'], ['lock', 'الإجابة النهائية (الترقّب)'], ['right', 'إجابة صحيحة'], ['wrong', 'إجابة خاطئة'], ['fifty', 'حذف إجابتين'], ['aud', 'رأي الجمهور'], ['phone', 'الاتصال بصديق'], ['walk', 'الانسحاب'], ['million', 'ربح المليون'], ['trans', 'الفاصل والنتيجة النهائية'], ['hover', 'مرور المؤشر على الإجابة'], ['click', 'النقر على الإجابة']];
  try { AU.muted = localStorage.getItem('arena-snd') === '0'; } catch (e) { }
  const SFX = {
    click() { AU.tone(880, .06, { type: 'square', vol: .04 }); },
    tick() { AU.tone(700, .12, { type: 'triangle', vol: .12 }); },
    whistle() { AU.tone(2650, .45, { vib: 32, vd: 160, vol: .14, hold: .3 }); },
    kick() { AU.tone(150, .18, { to: 40, vol: .7 }); AU.noise(.06, { f: 1800, vol: .3 }); },
    cheer(big) { AU.noise(big ? 3.2 : 2, { f: 1100, q: .6, vol: big ? .32 : .22, a: .25, hold: big ? 1.2 : .6 }); AU.noise(big ? 3 : 1.8, { f: 2600, q: .8, vol: .1, a: .3, at: .1 }); for (let k = 0; k < (big ? 7 : 3); k++) AU.tone(500 + Math.random() * 500, .5, { type: 'sawtooth', lp: 1400, vol: .03, at: .2 + Math.random() * 1.2, to: 700 + Math.random() * 400 }); },
    groan() { AU.noise(1.4, { ft: 'lowpass', f: 500, vol: .25, a: .2 }); AU.tone(320, 1.2, { to: 140, type: 'sawtooth', lp: 600, vol: .06, a: .15 }); },
    post() { [1180, 1770, 2360].forEach((f, i) => AU.tone(f, 1.1 - i * .25, { type: 'triangle', vol: .12 / (i + 1) })); AU.tone(90, .2, { vol: .3 }); },
    horn() { AU.chord([233, 294, 349], .9, { type: 'sawtooth', lp: 1600, vol: .07, hold: .5 }); },
    ok() { AU.chord([523, 659, 784, 1047], .35, { type: 'triangle', vol: .14, arp: .07 }); },
    no() { AU.tone(240, .5, { to: 120, type: 'sawtooth', lp: 900, vol: .12 }); },
    flip() { AU.noise(.25, { f: 900, f2: 3000, vol: .12 }); AU.tone(660, .25, { to: 990, type: 'triangle', vol: .1 }); },
    win() { [[523, 0], [659, .14], [784, .28], [1047, .42], [784, .6], [1047, .74]].forEach(([f, at]) => AU.tone(f, .45, { type: 'triangle', vol: .16, at })); AU.chord([262, 330, 392], 1.6, { type: 'sawtooth', lp: 1800, vol: .05, at: .74, hold: .6 }); },
    whoosh() { AU.noise(.6, { f: 300, f2: 4000, q: 1.2, vol: .22, a: .15 }); }
  };

  /* ---------------- بنك الأسئلة: الدرس + بقية دروس الفصل، والأسئلة الجديدة أولًا ---------------- */
  let POOL = null;
  async function loadPool() {
    if (POOL) return POOL;
    const seen = new Set(), out = [];
    const add = (qs, src) => (qs || []).forEach(q => { if (!q || !q.q || !Array.isArray(q.o) || q.o.length < 2) return; const k = q.q.trim(); if (seen.has(k)) return; seen.add(k); out.push(Object.assign({ src }, q)); });
    add(G.qs, 'lesson');
    try {
      const cat = await (await fetch('../catalog-v4.json', { cache: 'force-cache' })).json();
      const me = location.pathname.split('/').pop();
      const sib = (cat.items || []).filter(i => i.type === 'game' && i.grade === G.lesson.grade && i.chapter === G.lesson.chapter && i.file && i.file.split('/').pop() !== me);
      await Promise.all(sib.map(async i => { try { const t = await (await fetch('../' + i.file)).text(); const m = t.match(/window\.GAME=(\{[\s\S]*?\});<\/script>/); if (m) add(JSON.parse(m[1]).qs, 'chapter'); } catch (e) { } }));
    } catch (e) { }
    POOL = out; return POOL;
  }
  const SEENK = () => 'party-seen-' + (G.lesson.grade || '') + '-' + (G.lesson.chapter || G.lesson.id || '');
  function seenSet() { try { return new Set(JSON.parse(localStorage.getItem(SEENK()) || '[]')); } catch (e) { return new Set(); } }
  function markSeen(list) { try { const s = seenSet(); list.forEach(q => s.add(q.q.trim())); let a = [...s]; if (a.length > 400) a = a.slice(-400); localStorage.setItem(SEENK(), JSON.stringify(a)); } catch (e) { } }
  /* ترتيب جديد في كل مرة: غير المستخدمة أولًا ثم المستخدمة، مع خلط الخيارات */
  function freshOrder(pool, filter) {
    let p = pool.filter(filter || (() => true)); const s = seenSet(); let un = shuffle(p.filter(q => !s.has(q.q.trim()))), old = shuffle(p.filter(q => s.has(q.q.trim())));
    if (!un.length) { try { localStorage.removeItem(SEENK()); } catch (e) { } }
    return un.concat(old);
  }
  function mixQ(q) { const idx = shuffle(q.o.map((_, i) => i)); return { q: q.q, o: idx.map(i => q.o[i]), a: idx.indexOf(q.a), ex: q.ex || '', raw: q }; }
  function Queue(filter) { let list = [], used = []; const self = { next() { if (!list.length) { list = freshOrder(POOL, filter); if (!list.length) list = shuffle(POOL); } const q = list.shift(); used.push(q); return mixQ(q); }, size: () => POOL.filter(filter || (() => true)).length, done() { markSeen(used); } }; return self; }

  /* ---------------- كشف الطلاب الموحّد (durus-classes) ---------------- */
  function roster() { try { const s = JSON.parse(localStorage.getItem('durus-classes') || 'null'); if (s && s.classes) return { cur: s.cur || '', classes: s.classes }; } catch (e) { } return { cur: '', classes: {} }; }
  const clean = a => (a || []).map(x => String(typeof x === 'string' ? x : (x && (x.n || x.name)) || '').trim()).filter(Boolean);

  /* ---------------- واجهة مشتركة ---------------- */
  const CSS = `
#pty{position:fixed;inset:0;z-index:60;background:#0b1220;direction:rtl;font-family:'IBM Plex Sans Arabic',Tahoma,sans-serif;font-weight:600;color:#0f172a;overflow:hidden;font-size:clamp(12px,1.05vmin + .55vw,24px);-webkit-tap-highlight-color:transparent;user-select:none}
#pty button{font:inherit;font-family:'Readex Pro','IBM Plex Sans Arabic',Tahoma,sans-serif;cursor:pointer;border:0}
#pty .ptb{position:absolute;top:8px;left:8px;z-index:40;display:flex;gap:6px}#pty .ptb button{width:2.4em;height:2.4em;border-radius:12px;background:rgba(15,23,42,.78);color:#fff;border:2px solid rgba(255,255,255,.3);font-size:1em;display:grid;place-items:center}
#pty .ptb button.wide{width:auto;padding:0 .8em}
.pt-scr{position:absolute;inset:0;overflow:auto;display:flex;align-items:center;justify-content:center;padding:3.2em 2vmin 2vmin}
.pt-set{width:min(1180px,100%);color:#fff;text-align:center}
.pt-set h1{font-family:'Readex Pro',sans-serif;font-size:2.1em;margin:0 0 .1em}.pt-set .sub{color:#bfdbfe;margin:0 0 .8em}
.pt-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:20px;padding:.9em 1.1em;margin:.6em 0;text-align:right}
.pt-card h3{margin:0 0 .5em;font-family:'Readex Pro',sans-serif;font-size:1.05em;color:#fde68a}
.chips{display:flex;flex-wrap:wrap;gap:.4em}.chip{background:rgba(255,255,255,.12);color:#fff;border-radius:99px;padding:.35em 1em;border:2px solid rgba(255,255,255,.22)!important}.chip[aria-pressed=true]{background:#fde047;color:#1f2937;border-color:#fde047!important}
.pt-ta{width:100%;min-height:5.5em;border-radius:12px;border:2px solid rgba(255,255,255,.3);background:rgba(0,0,0,.25);color:#fff;font:inherit;padding:.5em;margin-top:.5em;direction:rtl}
.teams2{display:grid;grid-template-columns:1fr 1fr;gap:.8em}.tcol{border-radius:16px;padding:.6em .8em;background:color-mix(in srgb,var(--tc) 22%,rgba(0,0,0,.25));border:2px solid var(--tc)}
.tcol input{width:100%;font:inherit;font-family:'Readex Pro',sans-serif;background:transparent;border:0;border-bottom:2px dashed rgba(255,255,255,.35);color:#fff;font-size:1.1em;margin-bottom:.4em;text-align:right}
.tcol ol{margin:0;padding:0;list-style:none;display:grid;grid-template-columns:1fr 1fr;column-gap:1em;font-size:.9em;color:#e2e8f0;max-height:12em;overflow:auto;counter-reset:n}.tcol li{padding:.1em 0;counter-increment:n;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.tcol li::before{content:counter(n,arabic-indic) '. ';color:#fde68a}
.row{display:flex;gap:.6em;align-items:center;flex-wrap:wrap;margin:.35em 0}.row>span{color:#cbd5e1;min-width:7.5em}
.gobtn{background:linear-gradient(#22c55e,#15803d);color:#fff;font-size:1.45em;padding:.45em 2.4em;border-radius:18px;box-shadow:0 6px 0 #14532d;margin-top:.6em}
.gobtn:active{transform:translateY(3px);box-shadow:0 3px 0 #14532d}
.mini{background:rgba(255,255,255,.14);color:#fff;border-radius:12px;padding:.35em .9em;border:2px solid rgba(255,255,255,.25)!important}
.pt-confetti{position:fixed;inset:0;pointer-events:none;z-index:90}
.pop{animation:pop .5s cubic-bezier(.2,1.6,.4,1)}@keyframes pop{0%{transform:scale(.4);opacity:0}100%{transform:scale(1);opacity:1}}
.fadeup{animation:fadeup .5s ease both}@keyframes fadeup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
`;
  function confetti(n, dur) { const c = document.createElement('canvas'); c.className = 'pt-confetti'; ROOT.appendChild(c); const W = c.width = innerWidth, H = c.height = innerHeight, x = c.getContext('2d'), P = []; for (let i = 0; i < (n || 160); i++) P.push({ x: Math.random() * W, y: -20 - Math.random() * H * .5, v: 2 + Math.random() * 4, r: 5 + Math.random() * 6, c: ['#FFC53D', '#2F7BF6', '#F2545B', '#18A058', '#A855F7', '#fff'][i % 6], w: Math.random() * 6, s: Math.random() * 6 }); const t0 = performance.now(); (function f(t) { x.clearRect(0, 0, W, H); P.forEach(p => { p.y += p.v; p.x += Math.sin(t / 300 + p.w) * 1.8; x.save(); x.translate(p.x, p.y); x.rotate(p.s + t / 200); x.fillStyle = p.c; x.fillRect(-p.r / 2, -p.r * .3, p.r, p.r * .6); x.restore(); }); if (t - t0 < (dur || 3200) && c.isConnected) requestAnimationFrame(f); else c.remove(); })(t0); }
  function toolbar(extra) {
    const b = document.createElement('div'); b.className = 'ptb';
    b.innerHTML = `<button class="wide" data-k="back">↩ الألعاب</button><button data-k="snd">${AU.muted ? '🔇' : '🔊'}</button><button data-k="fs">⛶</button>${extra || ''}`;
    b.onclick = e => { const k = e.target.closest('button') && e.target.closest('button').dataset.k; if (k === 'back') close(); else if (k === 'snd') { AU.muted = !AU.muted; e.target.textContent = AU.muted ? '🔇' : '🔊'; try { localStorage.setItem('arena-snd', AU.muted ? '0' : '1'); } catch (er) { } } else if (k === 'fs') { const d = document, el = d.documentElement; if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d); else (el.requestFullscreen || el.webkitRequestFullscreen || function () { }).call(el); } };
    ROOT.appendChild(b); return b;
  }
  function close() { clearAll(); window.PARTY_ON = false; if (ROOT) ROOT.remove(); ROOT = null; if (BACK) BACK(); }
  function mount() { clearAll(); if (!$('#pty-css')) document.head.insertAdjacentHTML('beforeend', '<style id="pty-css">' + CSS + '</style>'); if (ROOT) ROOT.remove(); ROOT = document.createElement('div'); ROOT.id = 'pty'; window.PARTY_ON = true; document.body.appendChild(ROOT); return ROOT; }

  /* شاشة إعداد الفريقين (مشتركة بين ركلات الترجيح وخلية الحروف) */
  function teamSetup(o, onStart) {
    mount(); const R = roster(), keys = Object.keys(R.classes); let cls = R.cur && R.classes[R.cur] ? R.cur : (keys[0] || ''), manual = !keys.length, typed = '', T = null, names = o.names.slice(), opts = Object.assign({}, o.defaults);
    function src() { if (manual) return typed.split(/[\n،,]+/).map(s => s.trim()).filter(Boolean); return clean(R.classes[cls]); }
    function split() { const s = shuffle(src()); if (!s.length) { const k = o.anon || 6; T = [Array.from({ length: k }, (_, i) => 'لاعب ' + AD(i + 1)), Array.from({ length: k }, (_, i) => 'لاعب ' + AD(i + 1))]; return; } T = [[], []]; s.forEach((n, i) => T[i % 2].push(n)); }
    split();
    function draw() {
      const sc = ROOT.querySelector('.pt-scr'); if (sc) sc.remove();
      const d = document.createElement('div'); d.className = 'pt-scr'; d.style.background = o.bg;
      d.innerHTML = `<div class="pt-set"><h1>${o.icon} ${esc(o.title)}</h1><p class="sub">${esc(o.sub)} — ${esc(G.lesson.title)}</p>
        <div class="pt-card"><h3>👥 الطلاب</h3><div class="chips">${keys.map(k => `<button class="chip" data-c="${esc(k)}" aria-pressed="${!manual && k === cls}">الفصل ${esc(k)} (${AD(clean(R.classes[k]).length)})</button>`).join('')}<button class="chip" data-c="__m" aria-pressed="${manual}">✍ أسماء أكتبها</button></div>
          ${manual ? `<textarea class="pt-ta" placeholder="اكتب أسماء الطلاب، كل اسم في سطر (أو اتركها فارغة للعب بأرقام اللاعبين)">${esc(typed)}</textarea>` : ''}
          ${!keys.length ? '<p style="color:#fca5a5;margin:.4em 0 0;font-size:.85em">لا توجد فصول محفوظة في المنصة بعد — أضفها من كشف الطلاب الموحّد، أو اكتب الأسماء هنا.</p>' : ''}</div>
        <div class="pt-card"><h3 style="display:flex;justify-content:space-between;align-items:center">⚖ الفريقان <button class="mini" id="rs">🔀 توزيع عشوائي جديد</button></h3>
          <div class="teams2">${[0, 1].map(i => `<div class="tcol" style="--tc:${o.colors[i]}"><input data-t="${i}" value="${esc(names[i])}"><ol>${T[i].map(n => `<li>${esc(n)}</li>`).join('')}</ol></div>`).join('')}</div></div>
        <div class="pt-card">${o.options.map(op => `<div class="row"><span>${op.label}</span><span class="chips" data-o="${op.k}">${op.v.map(([val, lab]) => `<button class="chip" data-v="${val}" aria-pressed="${String(opts[op.k]) === String(val)}">${lab}</button>`).join('')}</span></div>`).join('')}</div>
        <button class="gobtn" id="go">${o.go}</button></div>`;
      ROOT.appendChild(d);
      $$('.chip[data-c]', d).forEach(b => b.onclick = () => { SFX.click(); if (b.dataset.c === '__m') manual = true; else { manual = false; cls = b.dataset.c; } split(); draw(); });
      const ta = $('.pt-ta', d); if (ta) ta.oninput = () => { typed = ta.value; split(); $$('.tcol ol', d).forEach((ol, i) => ol.innerHTML = T[i].map(n => `<li>${esc(n)}</li>`).join('')); };
      $$('.tcol input', d).forEach(inp => inp.oninput = () => { names[+inp.dataset.t] = inp.value || o.names[+inp.dataset.t]; });
      $('#rs', d).onclick = () => { SFX.flip(); split(); $$('.tcol ol', d).forEach((ol, i) => { ol.innerHTML = T[i].map(n => `<li>${esc(n)}</li>`).join(''); ol.classList.remove('pop'); void ol.offsetWidth; ol.classList.add('pop'); }); };
      $$('[data-o]', d).forEach(g => $$('button', g).forEach(b => b.onclick = () => { SFX.click(); const v = b.dataset.v; opts[g.dataset.o] = isNaN(+v) ? v : +v; $$('button', g).forEach(x => x.setAttribute('aria-pressed', x === b)); }));
      $('#go', d).onclick = () => { AU.init(); onStart({ teams: [{ name: names[0], col: o.colors[0], players: T[0].slice() }, { name: names[1], col: o.colors[1], players: T[1].slice() }], opts }); };
    }
    toolbar(); draw();
  }

  /* =====================================================================
     ١) ركلات الترجيح بالأسماء
     ===================================================================== */
  const PK_CSS = `
.pk{position:absolute;inset:0;display:flex;flex-direction:column;background:#0b1220}
.pk-top{flex:1 1 0;min-height:0;position:relative;overflow:hidden}.pk-top canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.pk-side{position:absolute;top:3.4em;bottom:.7em;width:20.5%;display:flex;flex-direction:column;background:#fdf8ec;border-radius:20px;border:4px solid #fde7a8;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:box-shadow .3s,transform .3s}
.pk-side.r{right:1%}.pk-side.l{left:1%}
.pk-side.on{box-shadow:0 0 0 4px #fbbf24,0 0 30px rgba(251,191,36,.7);transform:translateY(-2px)}
.pk-hd{border-radius:15px 15px 0 0;display:flex;align-items:center;justify-content:space-between;gap:.5em;background:linear-gradient(color-mix(in srgb,var(--tc) 80%,#fff),var(--tc));color:#fff;padding:.35em .7em;font-family:'Readex Pro',sans-serif}
.pk-hd span{font-size:1.25em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pk-hd b{font-size:1.9em;line-height:1;padding-inline-start:.4em;border-inline-start:2px solid rgba(255,255,255,.5)}
.pk-badge{position:absolute;top:-.1em;right:50%;transform:translate(50%,-50%);background:#fde68a;color:#7c4a03;border-radius:99px;padding:.15em .9em;font-family:'Readex Pro',sans-serif;font-size:.85em;display:none;box-shadow:0 2px 8px rgba(0,0,0,.25)}
.pk-side.on .pk-badge{display:block}
.pk-cur{text-align:center;padding:.4em .5em .3em}.pk-cur small{display:block;color:#a16207;font-size:.78em}
.pk-cur .nm{display:flex;align-items:center;justify-content:center;gap:.4em;font-family:'Readex Pro',sans-serif;font-size:1.3em;color:#1e293b;margin:.15em 0;line-height:1.3;min-height:2.7em}.pk-cur .nm span{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.pk-cur .nm i{flex:none;width:1.9em;height:1.9em;border-radius:50%;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--tc) 45%,#fff),var(--tc));color:#fff;display:grid;place-items:center;font-style:normal;font-size:.75em;box-shadow:0 0 0 3px #fff,0 3px 8px rgba(0,0,0,.3)}
.pk-dots{display:flex;flex-wrap:wrap;gap:.25em;justify-content:center;margin:.25em 0}.pk-dots i{width:.85em;height:.85em;border-radius:50%;background:#e2e8f0;box-shadow:inset 0 1px 2px rgba(0,0,0,.2)}.pk-dots i.g{background:#22c55e}.pk-dots i.m{background:#ef4444}.pk-dots i.n{background:#60a5fa;box-shadow:0 0 0 3px rgba(96,165,250,.35)}
.pk-list{list-style:none;margin:0;padding:.3em .5em .5em;overflow:auto;flex:1;min-height:0;border-radius:0 0 16px 16px}.pk-list li{display:flex;justify-content:space-between;align-items:center;gap:.4em;background:#fff;border-radius:10px;padding:.32em .6em;margin:.25em 0;font-size:.86em;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.pk-list li em{font-style:normal;color:#94a3b8;font-size:.9em;white-space:nowrap}.pk-list li.g em{color:#16a34a}.pk-list li.m em{color:#dc2626}.pk-list li.now{background:#fef3c7;box-shadow:0 0 0 2px #f59e0b}
.pk-sb{position:absolute;top:2.6%;right:50%;transform:translateX(50%);display:flex;align-items:center;gap:.35em;background:linear-gradient(#1e3a5f,#0f2440);border:3px solid #cbd5e1;border-radius:16px;padding:.05em .7em;font-family:'Readex Pro',sans-serif;font-size:2.6em;line-height:1.2;box-shadow:0 8px 20px rgba(0,0,0,.4);direction:ltr}
.pk-sb b{min-width:.8em;text-align:center}.pk-sb b.bump{animation:bump2 .8s}@keyframes bump2{30%{transform:scale(1.6)}}
.pk-st{position:absolute;top:calc(2.6% + 3.9em);right:50%;transform:translateX(50%);background:rgba(30,58,95,.92);color:#fff;border-radius:99px;padding:.3em 1.2em;font-family:'Readex Pro',sans-serif;font-size:1.15em;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.35);max-width:48%;overflow:hidden;text-overflow:ellipsis}
.pk-q{flex:0 0 auto;padding:.5em 1.2%;background:linear-gradient(#123d1c,#0b2612)}
.pk-qb{max-width:1500px;margin:0 auto;background:linear-gradient(#fffaf0,#f8ecd2);border-radius:22px;padding:.5em .7em;border:3px solid #f2d78f;box-shadow:0 -4px 20px rgba(0,0,0,.3);text-align:center}
.pk-qt{font-size:1.3em;line-height:1.45;color:#1f2937;padding:.15em .5em}.pk-qt small{display:block;font-size:.62em;color:#92400e}
.pk-tm{height:7px;border-radius:5px;background:#e2e8f0;margin:.35em auto;width:86%;overflow:hidden}.pk-tm i{display:block;height:100%;width:100%;background:#22c55e;transform-origin:right}
.pk-op{display:grid;grid-template-columns:repeat(4,1fr);gap:.45em;margin-top:.3em}.pk-op.two{grid-template-columns:repeat(2,1fr)}
.pk-op button{display:flex;align-items:center;gap:.5em;background:#fff;border:4px solid var(--c)!important;border-radius:16px;padding:.4em .6em;min-height:2.9em;text-align:right;line-height:1.35;box-shadow:0 4px 0 rgba(0,0,0,.18);color:#1f2937;font-family:'IBM Plex Sans Arabic',sans-serif!important;font-weight:600}
.pk-op button b{flex:none;width:1.8em;height:1.8em;border-radius:50%;display:grid;place-items:center;color:#fff;background:var(--c);font-family:'Readex Pro',sans-serif}
.pk-op button.ok{background:#dcfce7;border-color:#16a34a!important}.pk-op button.no{background:#fee2e2;border-color:#dc2626!important}.pk-op button.dim{opacity:.45}
.pk-res{display:flex;gap:.8em;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:.35em;color:#334155;font-size:.95em}.pk-res b{color:#15803d}.pk-res b.x{color:#b91c1c}
.pk-nx{background:linear-gradient(#f59e0b,#d97706);color:#fff;border-radius:14px;padding:.4em 1.4em;box-shadow:0 4px 0 #92400e;font-size:1.05em}
.pk-big{background:linear-gradient(#4ade80,#16a34a);color:#fff;font-size:1.7em;padding:.35em 2.2em;border-radius:22px;box-shadow:0 6px 0 #166534,0 10px 24px rgba(0,0,0,.25)}
.pk-skip{background:#e2e8f0;color:#475569;border-radius:12px;padding:.3em .9em;font-size:.85em}
.pk-end{position:absolute;inset:0;z-index:30;background:radial-gradient(circle,rgba(15,23,42,.75),rgba(2,6,23,.92));display:flex;align-items:center;justify-content:center;padding:2vmin;color:#fff;text-align:center}
.pk-end .card{width:min(980px,100%);background:linear-gradient(#1e3a5f,#0f2440);border:3px solid #fde68a;border-radius:26px;padding:1em 1.4em;box-shadow:0 20px 60px rgba(0,0,0,.5)}
.pk-end h2{font-family:'Readex Pro',sans-serif;font-size:2.3em;margin:.1em 0}.pk-end .fs{display:flex;justify-content:center;gap:1em;align-items:stretch;margin:.6em 0}
.pk-end .fs>div{flex:1;border-radius:18px;padding:.5em;background:color-mix(in srgb,var(--tc) 30%,#0f172a);border:3px solid var(--tc)}.pk-end .fs>div.w{box-shadow:0 0 0 4px #fde047}
.pk-end .fs b{display:block;font-family:'Readex Pro',sans-serif;font-size:2.8em;line-height:1.1}.pk-end .fs p{margin:.2em 0 0;font-size:.82em;color:#e2e8f0;line-height:1.6}
`;
  function penalty() {
    teamSetup({ icon: '⚽', title: 'ركلات الترجيح بالأسماء', sub: 'كل طالب يسدد ركلة بعد أن يجيب عن سؤاله', bg: 'radial-gradient(circle at 50% 20%,#166534,#052e16 75%)', names: ['الفريق الأحمر', 'الفريق الأزرق'], colors: ['#dc3545', '#2563eb'], go: '⚽ إلى الملعب',
      defaults: { k: 5, time: 30 },
      options: [{ k: 'k', label: 'ركلات كل فريق', v: [[3, '٣'], [5, '٥'], [10, '١٠'], ['all', 'كل الطلاب']] }, { k: 'time', label: 'زمن السؤال', v: [[20, '٢٠ ث'], [30, '٣٠ ث'], [45, '٤٥ ث'], [0, 'بلا وقت']] }]
    }, cfg => pkGame(cfg));
  }
  function pkGame(cfg) {
    mount(); if (!$('#pk-css')) document.head.insertAdjacentHTML('beforeend', '<style id="pk-css">' + PK_CSS + '</style>');
    const T = cfg.teams, Q = Queue(), K0 = cfg.opts.k === 'all' ? Math.max(T[0].players.length, T[1].players.length) : cfg.opts.k;
    T.forEach(t => t.players = shuffle(t.players));
    const st = { idx: [0, 0], res: [[], []], sc: [0, 0], turn: 0, K: K0, phase: 'ready', q: null, timer: 0, kicks: [] };
    ROOT.innerHTML = `<div class="pk"><div class="pk-top"><canvas></canvas>
      ${[0, 1].map(i => `<div class="pk-side ${i ? 'l' : 'r'}" data-t="${i}" style="--tc:${T[i].col}"><div class="pk-badge">الدور الآن</div><div class="pk-hd"><span>${esc(T[i].name)}</span><b>0</b></div><div class="pk-cur"></div><ul class="pk-list"></ul></div>`).join('')}
      <div class="pk-sb"><b style="color:${T[1].col}">0</b><span style="color:#cbd5e1">:</span><b style="color:${T[0].col}">0</b></div><div class="pk-st">الفريقان جاهزان</div></div>
      <div class="pk-q"><div class="pk-qb"></div></div></div>`;
    toolbar();
    const cv = $('canvas', ROOT), ctx = cv.getContext('2d'), SS = pkScene();
    let last = performance.now(), t = 0;
    (function frame(now) { const dt = Math.min(.05, (now - last) / 1000); last = now; t += dt; const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); if (r.width > 4) { if (cv.width !== Math.round(r.width * d) || cv.height !== Math.round(r.height * d)) { cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); } SS.draw(ctx, cv.width, cv.height, t, dt, T); } RAF = requestAnimationFrame(frame); })(last);
    const player = i => T[i].players.length ? T[i].players[st.idx[i] % T[i].players.length] : '—';
    const resTxt = { goal: '⚽ هدف', save: '🧤 تصدّى', post: '🥅 القائم', over: '⬆ فوق العارضة', skip: 'غائب' };
    function sides() {
      [0, 1].forEach(i => {
        const el = $(`.pk-side[data-t="${i}"]`, ROOT), on = st.turn === i && st.phase !== 'end', P = T[i].players, cur = player(i), n = P.length;
        el.classList.toggle('on', on); $('.pk-hd b', el).textContent = st.sc[i];
        const kk = Math.max(st.K, st.res[i].length + (on ? 1 : 0));
        $('.pk-cur', el).innerHTML = `<small>${on ? 'دور الطالب' : 'الطالب التالي'}</small><div class="nm"><i>${esc(cur.trim()[0] || '؟')}</i><span>${esc(cur)}</span></div><small>الطالب ${AD((st.idx[i] % Math.max(1, n)) + 1)} من ${AD(n)}</small><div class="pk-dots">${Array.from({ length: kk }, (_, j) => { const r = st.res[i][j]; return `<i class="${r === true ? 'g' : r === false ? 'm' : (on && j === st.res[i].length ? 'n' : '')}"></i>`; }).join('')}</div>`;
        const last = {}; st.kicks.filter(k => k.t === i).forEach(k => last[k.p] = k.r);
        const lst = $('.pk-list', el); lst.innerHTML = P.map((p, j) => { const r = last[p], isNow = on && j === st.idx[i] % n; return `<li class="${r === 'goal' ? 'g' : r && r !== 'skip' ? 'm' : ''}${isNow ? ' now' : ''}"><span>${esc(p)}</span><em>${r ? resTxt[r] : 'لم يسدد بعد'} ${isNow ? '⬅' : ''}</em></li>`; }).join('');
        const nowLi = $('li.now', lst); if (nowLi) nowLi.scrollIntoView({ block: 'nearest' });
      });
      const sb = $$('.pk-sb b', ROOT); [[1, 0], [0, 1]].forEach(([ti, bi]) => { if (sb[bi].textContent !== String(st.sc[ti])) { sb[bi].textContent = st.sc[ti]; sb[bi].classList.remove('bump'); void sb[bi].offsetWidth; sb[bi].classList.add('bump'); } });
    }
    const status = s => { $('.pk-st', ROOT).textContent = s; };
    const QB = $('.pk-qb', ROOT);
    function ready() { st.phase = 'ready'; sides(); status('الفريقان جاهزان'); QB.innerHTML = `<button class="pk-big" id="pkgo">⚽ ابدأ المباراة</button><div style="color:#92400e;margin-top:.3em;font-size:.85em">توزيع عشوائي جاهز — ${AD(K0)} ركلات لكل فريق، ثم ركلات حاسمة عند التعادل</div>`; $('#pkgo').onclick = () => { SFX.whistle(); ask(); }; }
    function ask() {
      st.phase = 'q'; st.q = Q.next(); const q = st.q, i = st.turn; sides(); status('دور: ' + player(i)); SS.reset();
      QB.innerHTML = `<div class="pk-qt fadeup"><small>سؤال ${esc(T[i].name)} — ${esc(player(i))}</small>${esc(q.q)}</div>${cfg.opts.time ? '<div class="pk-tm"><i></i></div>' : ''}<div class="pk-op${q.o.length <= 2 ? ' two' : ''}">${q.o.map((o, k) => `<button data-k="${k}" style="--c:${['#d62f2f', '#16803a', '#2547a8', '#d9600f'][k]}" class="fadeup"><b>${LET[k]}</b><span>${esc(o)}</span></button>`).join('')}</div><div class="pk-res"><button class="pk-skip" id="pksk">⏭ الطالب غائب — التالي</button></div>`;
      $$('.pk-op button', QB).forEach(b => b.onclick = () => answer(+b.dataset.k));
      $('#pksk').onclick = () => { st.kicks.push({ t: i, p: player(i), r: 'skip' }); st.idx[i]++; ask(); };
      clearInterval(st.timer); if (cfg.opts.time) { const t0 = performance.now(), bar = $('.pk-tm i', QB), T0 = cfg.opts.time; let ls = -1; st.timer = setInterval(() => { const el = (performance.now() - t0) / 1000, f = 1 - el / T0, sec = Math.ceil(T0 - el); if (sec <= 5 && sec > 0 && sec !== ls) { ls = sec; SFX.tick(); } bar.style.transform = `scaleX(${Math.max(0, f)})`; bar.style.background = f < .3 ? '#ef4444' : f < .6 ? '#f59e0b' : '#22c55e'; if (f <= 0) answer(-1); }, 100); TIMERS.push(st.timer); }
    }
    function answer(k) {
      if (st.phase !== 'q') return; st.phase = 'kick'; clearInterval(st.timer); const q = st.q, ok = k === q.a, i = st.turn, who = player(i);
      $$('.pk-op button', QB).forEach((b, j) => { b.onclick = null; b.classList.add(j === q.a ? 'ok' : j === k ? 'no' : 'dim'); }); const sk = $('#pksk'); if (sk) sk.remove();
      ok ? SFX.ok() : SFX.no();
      const out = ok ? 'goal' : ['save', 'save', 'post', 'over'][Math.floor(Math.random() * 4)];
      status(ok ? 'إجابة صحيحة… ' + who + ' يسدد!' : (k < 0 ? 'انتهى الوقت… ' : 'إجابة خاطئة… ') + who + ' يسدد');
      later(() => SS.kick(out, i, () => {
        st.res[i].push(ok); if (ok) st.sc[i]++; st.kicks.push({ t: i, p: who, r: out }); st.idx[i]++;
        status({ goal: '⚽ هدف! ' + who, save: '🧤 الحارس يتصدى!', post: '🥅 ارتطمت بالقائم!', over: '⬆ فوق العارضة!' }[out]);
        st.turn = 1 - i; const done = checkEnd(); sides();
        const res = document.createElement('div'); res.className = 'pk-res fadeup'; res.innerHTML = `<span>${ok ? '<b>✔ إجابة صحيحة</b>' : '<b class="x">✘ الإجابة الصحيحة: ' + esc(q.o[q.a]) + '</b>'}${q.ex ? ' — ' + esc(q.ex) : ''}</span><button class="pk-nx">${done ? 'النتيجة النهائية 🏆' : 'الركلة التالية ←'}</button>`;
        QB.appendChild(res); $('.pk-nx', res).onclick = () => done ? end() : ask();
      }), 900);
    }
    function checkEnd() {
      const [a, b] = st.sc, ka = st.res[0].length, kb = st.res[1].length, K = st.K;
      if (ka <= K && kb <= K && !(ka === K && kb === K)) { if (a + (K - ka) < b || b + (K - kb) < a) return true; return false; }
      if (ka === kb) { if (a !== b) return true; st.K = ka + 1; status('تعادل! ركلات حاسمة ⚡'); return false; }
      return false;
    }
    function end() {
      st.phase = 'end'; Q.done(); sides(); const [a, b] = st.sc, w = a > b ? 0 : 1; SFX.win(); SFX.cheer(true); confetti(220);
      const scorers = i => st.kicks.filter(k => k.t === i && k.r === 'goal').map(k => k.p);
      const e = document.createElement('div'); e.className = 'pk-end'; e.innerHTML = `<div class="card pop"><div style="font-size:3.4em">🏆</div><h2>فاز ${esc(T[w].name)}!</h2>
        <div class="fs">${[0, 1].map(i => `<div class="${i === w ? 'w' : ''}" style="--tc:${T[i].col}">${i === w ? '👑 ' : ''}${esc(T[i].name)}<b>${st.sc[i]}</b><p>${scorers(i).length ? '⚽ ' + scorers(i).map(esc).join('، ') : 'لا أهداف'}</p></div>`).join('')}</div>
        <button class="gobtn" id="pka">↺ مباراة جديدة بأسئلة جديدة</button> <button class="gobtn" id="pkb" style="background:linear-gradient(#3b82f6,#1d4ed8);box-shadow:0 6px 0 #1e3a8a">🔀 فرق جديدة</button></div>`;
      ROOT.appendChild(e); $('#pka').onclick = () => pkGame(cfg); $('#pkb').onclick = penalty;
    }
    ready();
  }

  /* ---------- مشهد الملعب: صورة ملعب ثلاثية الأبعاد + حارس وكرة متحركان ---------- */
  const PKIMG = {}; ['stadium', 'keeper', 'ball'].forEach(k => { const im = new Image(); im.src = '../img/pk-' + k + '.webp'; PKIMG[k] = im; });
  function pkScene() {
    const IW = 1672, IH = 941, GL = 262, GR = 1418, GT = 168, GB = 636, SPOT = { x: 833, y: 784, r: 86 }, KC = { x: 833, y: 450, w: 386, h: 382 };
    const S = { k: null, cheer: [0, 0], shake: 0, net: { x: 0, y: 0, a: 0 }, fl: null, post: 0, flash: 0, spark: [] };
    const ready = () => PKIMG.stadium.complete && PKIMG.stadium.naturalWidth && PKIMG.keeper.complete && PKIMG.ball.complete;
    function txt(c, s, x, y, size, col, sc) { c.font = `700 ${size}px 'Readex Pro','IBM Plex Sans Arabic',sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.direction = 'rtl'; c.lineJoin = 'round'; c.lineWidth = size * .16; c.strokeStyle = sc || 'rgba(0,0,0,.6)'; c.strokeText(s, x, y); c.fillStyle = col; c.fillText(s, x, y); c.direction = 'ltr'; }
    function ball(c, x, y, r, rot) { c.save(); c.translate(x, y); c.rotate(rot); c.drawImage(PKIMG.ball, -r * 1.023, -r * 1.023, r * 2.046, r * 2.046); c.restore(); }
    function shadow(c, x, y, rx, ry, a) { c.save(); c.translate(x, y); c.scale(1, ry / rx); const g = c.createRadialGradient(0, 0, 0, 0, 0, rx); g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.beginPath(); c.arc(0, 0, rx, 0, 7); c.fill(); c.restore(); }
    function keeper(c, x, y, rot, t, idle) { const br = idle ? 1 + Math.sin(t * 3.2) * .012 : 1; shadow(c, x, GB + 6, 150 - Math.abs(rot) * 30, 16, .28); c.save(); c.translate(x, y); c.rotate(rot); c.scale(1 / br * 1, br); c.drawImage(PKIMG.keeper, -KC.w / 2, -KC.h / 2, KC.w, KC.h); c.restore(); }
    function plate(c, cw, s, ox, oy) {
      const st = PKIMG.stadium, w = IW * s, h = IH * s;
      if (oy > 0) { const g = c.createLinearGradient(0, 0, 0, oy + 2); g.addColorStop(0, '#2f7fdc'); g.addColorStop(1, '#4b98e6'); c.fillStyle = g; c.fillRect(0, 0, cw, oy + 2); }
      c.drawImage(st, ox, oy, w, h);
      if (ox > 0) { c.save(); c.translate(ox, 0); c.scale(-1, 1); c.drawImage(st, 0, 0, Math.min(IW, ox / s + 4), IH, 0, oy, Math.min(IW, ox / s + 4) * s, h); c.restore();
        c.save(); c.translate(ox + w, 0); c.scale(-1, 1); const sw = Math.min(IW, ox / s + 4); c.drawImage(st, IW - sw, 0, sw, IH, -sw * s, oy, sw * s, h); c.restore(); }
    }
    const self = {
      reset() { S.k = null; S.fl = null; },
      kick(res, team, cb) {
        const cols = [-1, 0, 1], col = cols[Math.floor(Math.random() * 3)], high = Math.random() < .5;
        let tx = 840 + col * 380, ty = high ? 290 : 540, kd = col, kh = high;
        if (res === 'goal') { kd = col ? -col : (Math.random() < .5 ? -1 : 1); kh = Math.random() < .5; if (col === 0) { tx = 840 + (Math.random() < .5 ? -1 : 1) * 90; ty = 250; kd = Math.random() < .5 ? -1 : 1; kh = false; } }
        if (res === 'save' && col === 0) { kd = 0; kh = high; }
        if (res === 'post') { const sd = Math.random() < .5 ? -1 : 1; tx = sd < 0 ? GL : GR; ty = 260 + Math.random() * 280; kd = -sd; kh = Math.random() < .5; }
        if (res === 'over') { tx = 840 + (Math.random() - .5) * 700; ty = GT - 50; kd = cols[Math.floor(Math.random() * 3)]; kh = true; }
        S.k = { t0: null, res, tx, ty, kd, kh, team, cb, done: false, snd: false };
      },
      draw(c, cw, ch, t, dt, T) {
        c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = '#2f7fdc'; c.fillRect(0, 0, cw, ch); if (!ready()) return;
        const s = Math.min(.55 * cw / (GR - GL), ch / 860), ox = cw / 2 - 840 * s, oy = ch - 905 * s;
        S.shake = Math.max(0, S.shake - dt * 1.6); const shx = S.shake ? (Math.random() - .5) * 18 * S.shake : 0, shy = S.shake ? (Math.random() - .5) * 12 * S.shake : 0;
        c.save(); c.translate(shx, shy); plate(c, cw, s, ox, oy); c.restore();
        c.setTransform(s, 0, 0, s, ox + shx, oy + shy);
        S.cheer = S.cheer.map(x => Math.max(0, x - dt * .35));
        /* ومضات كاميرات الجمهور عند الهتاف */
        const ch2 = Math.max(S.cheer[0], S.cheer[1]); if (ch2 > .1 && Math.random() < ch2 * .9) S.spark.push({ x: Math.random() < .5 ? Math.random() * 240 : Math.random() < .5 ? 1440 + Math.random() * 232 : 300 + Math.random() * 1070, y: 230 + Math.random() * 300, a: 1 });
        S.spark = S.spark.filter(p => (p.a -= dt * 4) > 0); S.spark.forEach(p => { c.fillStyle = `rgba(255,255,240,${p.a})`; c.beginPath(); c.arc(p.x, p.y, 5 * p.a + 2, 0, 7); c.fill(); });
        /* انتفاخ الشباك */
        const n = S.net; n.a = Math.max(0, n.a - dt * 1.1); if (n.a > 0) { const R = 95, k = 1 + .14 * n.a * (1 + Math.sin(t * 30) * .3); c.save(); c.beginPath(); c.arc(n.x, n.y, R, 0, 7); c.clip(); c.drawImage(PKIMG.stadium, n.x - R, n.y - R, R * 2, R * 2, n.x - R * k, n.y - R * k + 8 * n.a, R * 2 * k, R * 2 * k); c.restore(); }
        const kk = S.k; let ta = 0; if (kk) { if (kk.t0 == null) kk.t0 = t; ta = t - kk.t0; }
        /* الحارس */
        let kx = KC.x + Math.sin(t * 2) * 7, ky = KC.y, kr = 0, idle = true;
        if (kk) { idle = false; const p = easeOut(clamp((ta - .4) / .45, 0, 1)), fall = clamp((ta - 1.15) / .45, 0, 1);
          if (kk.kd) { kx = KC.x + kk.kd * p * (kk.kh ? 320 : 330); kr = kk.kd * p * (kk.kh ? 1.0 : 1.38); ky = kk.kh ? KC.y - p * 85 + fall * fall * 130 : KC.y + p * 30; }
          else { ky = kk.kh ? KC.y - Math.sin(p * Math.PI) * 95 : KC.y + p * 40; } }
        /* الكرة */
        let bx = SPOT.x, by = SPOT.y, br = SPOT.r, rot = 0, behind = false, shY = SPOT.y + SPOT.r * .85;
        if (kk) {
          if (ta > .38 && !kk.snd) { kk.snd = true; SFX.kick(); }
          const T1 = .38, T2 = .95;
          if (ta >= T1) { const f = clamp((ta - T1) / (T2 - T1), 0, 1), e = easeOut(f); bx = lerp(SPOT.x, kk.tx, e); by = lerp(SPOT.y, kk.ty, e) - Math.sin(f * Math.PI) * (kk.kh ? 110 : 45); br = lerp(SPOT.r, 30, e); rot = ta * 14; shY = lerp(SPOT.y + SPOT.r * .85, GB + 6, e); }
          if (ta > T2) { const g = ta - T2;
            if (kk.res === 'goal') { behind = true; const dir = Math.sign(kk.tx - 840) || 1; bx = kk.tx + dir * Math.min(g, .25) * 70; const fl = Math.max(0, g - .2); by = Math.min(GB - 30, kk.ty + Math.min(g, .25) * 50 + fl * fl * 1400); br = 27; rot = ta * 5; shY = GB - 4;
              if (!kk.done) { kk.done = true; S.net = { x: kk.tx, y: kk.ty, a: 1 }; S.cheer[kk.team] = 2.6; S.shake = 1; S.flash = 1; S.fl = { s: 'هدف!!', col: '#fde047', t0: t }; SFX.cheer(true); setTimeout(SFX.horn, 250); } }
            else if (kk.res === 'save') { const dir = kk.kd || (Math.random() < .5 ? -1 : 1); bx = kk.tx + dir * g * 600; by = kk.ty - g * 380 + g * g * 1100; br = 30 + g * 22; rot = ta * 18; shY = GB + 6 + g * 120;
              if (!kk.done) { kk.done = true; S.cheer[1 - kk.team] = 2; S.fl = { s: 'تصدّى الحارس!', col: '#fca5a5', t0: t }; AU.tone(160, .15, { vol: .4 }); SFX.groan(); setTimeout(() => SFX.cheer(false), 200); } }
            else if (kk.res === 'post') { const dir = kk.tx < 840 ? 1 : -1; bx = kk.tx + dir * g * 380; by = kk.ty + g * 300 + g * g * 600; br = 30 + g * 45; rot = -ta * 18; shY = GB + 6 + g * 200;
              if (!kk.done) { kk.done = true; S.post = 1; S.shake = .4; S.fl = { s: 'القائم!', col: '#fdba74', t0: t }; SFX.post(); setTimeout(SFX.groan, 300); } }
            else { bx = kk.tx + (kk.tx - 840) * g * .3; by = kk.ty - g * 700; br = Math.max(8, 30 - g * 16); rot = ta * 14; shY = GB + 30;
              if (!kk.done) { kk.done = true; S.fl = { s: 'فوق العارضة!', col: '#fdba74', t0: t }; SFX.groan(); } }
            if (g > 1.6 && kk.cb) { const cb = kk.cb; kk.cb = null; cb(); } }
        }
        if (S.post > 0) { S.post = Math.max(0, S.post - dt * 2); const px = kk && kk.tx < 840 ? GL : GR; c.fillStyle = `rgba(255,255,255,${S.post * .6})`; c.fillRect(px - 16 + Math.sin(t * 90) * S.post * 5, GT - 10, 32, GB - GT + 10); }
        shadow(c, bx, shY, br * 1.05, br * .28, .35);
        if (behind) ball(c, bx, by, br, rot);
        keeper(c, kx, ky, kr, t, idle);
        if (!behind) ball(c, bx, by, br, rot);
        c.setTransform(1, 0, 0, 1, 0, 0);
        if (S.flash > 0) { S.flash = Math.max(0, S.flash - dt * 2.5); c.fillStyle = `rgba(255,255,255,${S.flash * .45})`; c.fillRect(0, 0, cw, ch); }
        if (S.fl) { const a = t - S.fl.t0, sc = a < .35 ? easeOut(a / .35) * 1.15 : a < .5 ? 1.15 - (a - .35) : 1; if (a < 2.2) { c.save(); c.globalAlpha = a > 1.8 ? (2.2 - a) / .4 : 1; c.translate(cw / 2, oy + 330 * s); c.scale(sc * s, sc * s); txt(c, S.fl.s, 0, 0, S.fl.s.length > 6 ? 110 : 170, S.fl.col, 'rgba(20,20,40,.85)'); c.restore(); } }
      }
    };
    return self;
  }

  /* =====================================================================
     ٢) خلية الحروف
     ===================================================================== */
  const HX_CSS = `
.hx{position:absolute;inset:0;display:grid;grid-template-columns:22% 1fr 22%;gap:1%;padding:3.3em 1% 1%;background:linear-gradient(#f8fafc,#e2e8f0)}
.hx-side{display:flex;flex-direction:column;min-height:0;background:#fff;border-radius:18px;box-shadow:0 4px 18px rgba(15,23,42,.12);overflow:hidden;border:3px solid transparent;transition:.3s}
.hx-side.on{border-color:var(--tc);box-shadow:0 0 0 4px color-mix(in srgb,var(--tc) 35%,transparent),0 8px 24px rgba(15,23,42,.18)}
.hx-hd{display:flex;align-items:center;gap:.5em;padding:.5em .7em;font-family:'Readex Pro',sans-serif;font-size:1.2em;color:#0f172a}.hx-hd i{width:1.3em;height:1.3em;border-radius:50%;background:var(--tc);flex:none}.hx-hd b{margin-inline-start:auto;background:var(--tc);color:#fff;border-radius:10px;padding:0 .45em;font-size:1.1em}
.hx-goal{font-size:.75em;color:#64748b;padding:0 .9em .3em}
.hx-pl{list-style:none;margin:0;padding:.2em .5em .6em;overflow:auto;flex:1;min-height:0}.hx-pl li{background:#f1f5f9;border-radius:10px;padding:.42em .7em;margin:.28em 0;font-size:.92em;transition:.25s}.hx-pl li.now{background:var(--tc);color:#fff;transform:scale(1.03);box-shadow:0 3px 10px rgba(0,0,0,.2)}
.hx-mid{display:flex;flex-direction:column;align-items:center;min-height:0;gap:.4em}
.hx-info{display:flex;gap:.6em;align-items:center;font-family:'Readex Pro',sans-serif;color:#0f172a}.hx-turn{background:var(--tc);color:#fff;border-radius:99px;padding:.3em 1.2em;font-size:1.1em;box-shadow:0 4px 12px rgba(0,0,0,.2);transition:.3s}
.hx-rounds{background:#0f172a;color:#fff;border-radius:12px;padding:.25em .8em;direction:ltr}
.hx-board{flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center}.hx-board svg{max-width:100%;max-height:100%;filter:drop-shadow(0 10px 18px rgba(15,23,42,.25))}
.hx-c{cursor:pointer}.hx-c polygon{transition:fill .35s}.hx-c:hover polygon.f{fill:#fef9c3}.hx-c text{font-family:'Readex Pro','IBM Plex Sans Arabic',sans-serif;font-weight:700;pointer-events:none}
.hx-c.own{cursor:default}.hx-c.flip{animation:hflip .6s ease}@keyframes hflip{0%{transform:scaleX(1)}50%{transform:scaleX(0)}100%{transform:scaleX(1)}}
.hx-c.sel polygon.f{fill:#fde047;animation:hpulse 1s infinite}@keyframes hpulse{50%{fill:#facc15}}
.hx-c.win polygon.f{animation:hwin .5s infinite alternate}@keyframes hwin{to{filter:brightness(1.35)}}
.hx-start{background:#2563eb;color:#fff;border-radius:16px;padding:.5em 3em;font-size:1.15em;box-shadow:0 5px 0 #1e3a8a}
.hx-help{color:#475569;font-size:.85em;text-align:center}
.hx-modal{position:absolute;inset:0;z-index:30;background:rgba(15,23,42,.6);display:flex;align-items:center;justify-content:center;padding:2vmin;backdrop-filter:blur(3px)}
.hx-card{width:min(1050px,100%);background:#fff;border-radius:26px;padding:1em 1.3em;box-shadow:0 24px 60px rgba(0,0,0,.4);text-align:center;border-top:10px solid var(--tc)}
.hx-lt{display:inline-grid;place-items:center;width:3.2em;height:3.2em;font-size:1.6em;font-family:'Readex Pro',sans-serif;color:#fff;background:var(--tc);clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);margin-bottom:.2em}
.hx-who{font-family:'Readex Pro',sans-serif;color:var(--tc);font-size:1.1em}.hx-qt{font-size:1.4em;line-height:1.5;color:#0f172a;margin:.35em 0}
.hx-ops{display:grid;grid-template-columns:repeat(2,1fr);gap:.5em;margin-top:.4em}.hx-ops button{display:flex;gap:.5em;align-items:center;text-align:right;background:#f8fafc;border:3px solid #cbd5e1!important;border-radius:16px;padding:.5em .7em;font-family:'IBM Plex Sans Arabic',sans-serif!important;font-weight:600;color:#0f172a;font-size:1.05em;line-height:1.4}
.hx-ops button b{flex:none;width:1.8em;height:1.8em;border-radius:50%;display:grid;place-items:center;background:var(--tc);color:#fff;font-family:'Readex Pro',sans-serif}
.hx-ops button.ok{background:#dcfce7;border-color:#16a34a!important}.hx-ops button.no{background:#fee2e2;border-color:#dc2626!important}.hx-ops button.dim{opacity:.4}
.hx-tm{height:8px;border-radius:5px;background:#e2e8f0;margin:.5em auto 0;width:80%;overflow:hidden}.hx-tm i{display:block;height:100%;width:100%;background:var(--tc);transform-origin:right}
.hx-msg{margin-top:.5em;font-size:1.05em;color:#334155;line-height:1.6}.hx-msg b{color:#15803d}.hx-msg b.x{color:#b91c1c}
.hx-btns{display:flex;gap:.6em;justify-content:center;margin-top:.6em;flex-wrap:wrap}.hx-btns button{border-radius:14px;padding:.45em 1.4em;color:#fff;font-size:1.05em}
`;
  const NORM = { 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ء': 'ا', 'ؤ': 'و', 'ئ': 'ي', 'ى': 'ي', 'ة': 'ه' };
  function letterOf(ans) { let s = String(ans).trim().replace(/[ً-ْـ]/g, '').replace(/^[«"'(\[\s]+/, ''); if (/^ال/.test(s) && s.length > 3) s = s.slice(2); const c = s[0]; if (!c || !/[ء-ي]/.test(c)) return null; return NORM[c] || c; }
  function hexGame() {
    teamSetup({ icon: '🔤', title: 'خلية الحروف', sub: 'صِل ضفتي اللوحة بخلايا فريقك: كل خلية سؤال يبدأ جوابه بحرفها', bg: 'radial-gradient(circle at 50% 20%,#1e40af,#0b1220 75%)', names: ['الفريق الأزرق', 'الفريق الأخضر'], colors: ['#2563eb', '#16a34a'], go: '🔤 ابدأ اللعبة',
      defaults: { time: 30, mode: 'mcq', steal: 'yes' },
      options: [{ k: 'mode', label: 'طريقة الإجابة', v: [['mcq', 'اختيار من متعدد'], ['oral', 'شفهيًا — المعلم يحكم']] }, { k: 'time', label: 'زمن السؤال', v: [[20, '٢٠ ث'], [30, '٣٠ ث'], [45, '٤٥ ث'], [0, 'بلا وقت']] }, { k: 'steal', label: 'عند الخطأ', v: [['yes', 'فرصة للفريق الآخر'], ['no', 'ينتقل الدور فقط']] }]
    }, cfg => hxMatch(cfg, [0, 0]));
  }
  function hxMatch(cfg, rounds) {
    mount(); if (!$('#hx-css')) document.head.insertAdjacentHTML('beforeend', '<style id="hx-css">' + HX_CSS + '</style>');
    const T = cfg.teams, valid = POOL.filter(q => letterOf(q.o[q.a])), Q = Queue(q => !!letterOf(q.o[q.a])), Qany = Queue();
    const N = valid.length >= 25 ? 5 : valid.length >= 16 ? 4 : 3;
    /* اختيار أسئلة متنوعة الحروف */
    const order = freshOrder(POOL, q => !!letterOf(q.o[q.a])), groups = {}; order.forEach(q => { const l = letterOf(q.o[q.a]); (groups[l] = groups[l] || []).push(q); });
    const picks = []; let ls = shuffle(Object.keys(groups)); while (picks.length < N * N && ls.length) { ls = ls.filter(l => groups[l].length); ls.forEach(l => { if (picks.length < N * N && groups[l].length) picks.push(groups[l].shift()); }); }
    while (picks.length < N * N) picks.push(POOL[Math.floor(Math.random() * POOL.length)]);
    const cells = shuffle(picks).map((q, i) => ({ i, r: Math.floor(i / N), c: i % N, q: mixQ(q), l: letterOf(q.o[q.a]) || '؟', own: -1 }));
    markSeen(picks);
    /* هندسة الخلايا: سداسيات مدببة، الصفوف الفردية مزاحة، العمود ٠ على اليمين */
    const s = 60, w = Math.sqrt(3) * s, pad = 46, BW = N * w + w / 2 + pad * 2, BH = 2 * s + (N - 1) * 1.5 * s + pad * 2;
    cells.forEach(cl => { cl.x = BW - pad - w / 2 - cl.c * w - (cl.r % 2 ? w / 2 : 0); cl.y = pad + s + cl.r * 1.5 * s; });
    cells.forEach(a => a.nb = cells.filter(b => b !== a && Math.hypot(a.x - b.x, a.y - b.y) < w * 1.1).map(b => b.i));
    const st = { turn: (rounds[0] + rounds[1]) % 2, pi: [0, 0], busy: false, over: false };
    ROOT.innerHTML = `<div class="hx">${[1, 'mid', 0].map(k => k === 'mid' ? `<div class="hx-mid"><div class="hx-info"><span class="hx-rounds" title="الجولات">${rounds[1]} : ${rounds[0]}</span><span class="hx-turn"></span></div><div class="hx-board"></div><div class="hx-help">اضغط خلية ليظهر سؤالها · ${esc(T[0].name)} يصل الأعلى بالأسفل · ${esc(T[1].name)} يصل اليمين باليسار</div></div>`
      : `<div class="hx-side" data-t="${k}" style="--tc:${T[k].col}"><div class="hx-hd"><i></i><span>${esc(T[k].name)}</span><b>0</b></div><div class="hx-goal">${k === 0 ? '⬆⬇ يصل الأعلى بالأسفل' : '⬅➡ يصل اليمين باليسار'}</div><ul class="hx-pl">${T[k].players.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>`).join('')}</div>`;
    toolbar();
    const hexPts = (x, y, r) => Array.from({ length: 6 }, (_, k) => { const a = Math.PI / 180 * (60 * k - 90); return (x + r * Math.cos(a)).toFixed(1) + ',' + (y + r * Math.sin(a)).toFixed(1); }).join(' ');
    const c0 = T[0].col, c1 = T[1].col, edge = pad + s * .6;
    $('.hx-board', ROOT).innerHTML = `<svg viewBox="0 0 ${BW.toFixed(0)} ${BH.toFixed(0)}"><rect width="${BW}" height="${BH}" rx="18" fill="${c1}"/>
      <polygon points="0,0 ${BW},0 ${BW - edge},${edge} ${edge},${edge}" fill="${c0}"/><polygon points="0,${BH} ${BW},${BH} ${BW - edge},${BH - edge} ${edge},${BH - edge}" fill="${c0}"/>
      ${cells.map(cl => `<g class="hx-c" data-i="${cl.i}" style="transform-origin:${cl.x.toFixed(1)}px ${cl.y.toFixed(1)}px"><polygon class="f" points="${hexPts(cl.x, cl.y, s - 2)}" fill="#fff" stroke="#cbd5e1" stroke-width="3"/><text x="${cl.x.toFixed(1)}" y="${(cl.y + 4).toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="${s * .78}" fill="#0f172a">${esc(cl.l)}</text></g>`).join('')}</svg>`;
    $$('.hx-c', ROOT).forEach(g => g.onclick = () => pick(+g.dataset.i));
    const cur = k => T[k].players.length ? T[k].players[st.pi[k] % T[k].players.length] : T[k].name;
    function ui() {
      [0, 1].forEach(k => { const el = $(`.hx-side[data-t="${k}"]`, ROOT); el.classList.toggle('on', st.turn === k && !st.over); $('.hx-hd b', el).textContent = cells.filter(c => c.own === k).length; $$('.hx-pl li', el).forEach((li, j) => li.classList.toggle('now', st.turn === k && T[k].players.length && j === st.pi[k] % T[k].players.length)); const n = $('.hx-pl li.now', el); if (n) n.scrollIntoView({ block: 'nearest' }); });
      const tb = $('.hx-turn', ROOT); tb.style.setProperty('--tc', T[st.turn].col); tb.textContent = st.over ? '🏆' : 'الدور: ' + T[st.turn].name + ' — ' + cur(st.turn);
    }
    function paint(cl, k) { const g = $(`.hx-c[data-i="${cl.i}"]`, ROOT); g.classList.remove('sel'); g.classList.remove('flip'); void g.getBoundingClientRect(); g.classList.add('flip'); setTimeout(() => { $('polygon', g).setAttribute('fill', k < 0 ? '#fff' : T[k].col); $('polygon', g).setAttribute('stroke', k < 0 ? '#cbd5e1' : '#fff'); $('text', g).setAttribute('fill', k < 0 ? '#0f172a' : '#fff'); $('text', g).textContent = cl.l; }, 300); g.classList.toggle('own', k >= 0); }
    function path(k) { const start = cells.filter(c => c.own === k && (k === 0 ? c.r === 0 : c.c === 0)), goal = c => k === 0 ? c.r === N - 1 : c.c === N - 1, prev = {}, seen = new Set(start.map(c => c.i)), qq = start.slice();
      while (qq.length) { const a = qq.shift(); if (goal(a)) { const p = [a.i]; let x = a.i; while (prev[x] != null) { x = prev[x]; p.push(x); } return p; } a.nb.forEach(j => { if (!seen.has(j) && cells[j].own === k) { seen.add(j); prev[j] = a.i; qq.push(cells[j]); } }); } return null; }
    function pick(i) {
      const cl = cells[i]; if (st.busy || st.over || cl.own >= 0) return; st.busy = true; SFX.click(); $(`.hx-c[data-i="${i}"]`, ROOT).classList.add('sel');
      later(() => askCell(cl, st.turn, false), 350);
    }
    function askCell(cl, k, steal) {
      const q = cl.q, m = document.createElement('div'); m.className = 'hx-modal'; let tmr = 0, done = false;
      m.innerHTML = `<div class="hx-card pop" style="--tc:${T[k].col}"><div class="hx-lt">${esc(cl.l)}</div><div class="hx-who">${steal ? '⚡ فرصة ' + esc(T[k].name) + '!' : esc(T[k].name) + ' — ' + esc(cur(k))} · الجواب يبدأ بحرف «${esc(cl.l)}»</div><div class="hx-qt">${esc(q.q)}</div>
        ${cfg.opts.mode === 'mcq' ? `<div class="hx-ops">${q.o.map((o, j) => `<button data-j="${j}"><b>${LET[j]}</b><span>${esc(o)}</span></button>`).join('')}</div>` : `<div class="hx-btns"><button id="hxr" style="background:#475569">👁 إظهار الإجابة</button></div><div class="hx-msg" id="hxa" style="display:none">الإجابة: <b>${esc(q.o[q.a])}</b></div><div class="hx-btns" id="hxj" style="display:none"><button data-v="1" style="background:#16a34a">✔ أجاب صحيحًا</button><button data-v="0" style="background:#dc2626">✘ أخطأ</button></div>`}
        ${cfg.opts.time ? '<div class="hx-tm"><i></i></div>' : ''}<div class="hx-msg" id="hxm"></div></div>`;
      ROOT.appendChild(m); SFX.whoosh();
      const finish = (ok, j) => {
        if (done) return; done = true; clearInterval(tmr);
        if (cfg.opts.mode === 'mcq') $$('.hx-ops button', m).forEach((b, x) => { b.onclick = null; b.classList.add(x === q.a ? 'ok' : x === j ? 'no' : 'dim'); });
        else { $('#hxa', m).style.display = 'block'; const jj = $('#hxj', m); if (jj) jj.remove(); const rb = $('#hxr', m); if (rb) rb.remove(); }
        ok ? SFX.ok() : SFX.no();
        const msg = $('#hxm', m), canSteal = !ok && !steal && cfg.opts.steal === 'yes';
        msg.innerHTML = (ok ? '<b>✔ صحيح! الخلية لـ' + esc(T[k].name) + '</b>' : '<b class="x">✘ ' + (j === -1 ? 'انتهى الوقت' : 'إجابة خاطئة') + (cfg.opts.mode === 'mcq' ? ' — الصحيح: ' + esc(q.o[q.a]) : '') + '</b>') + (q.ex && (ok || !canSteal) ? '<br>' + esc(q.ex) : '');
        const btn = document.createElement('div'); btn.className = 'hx-btns'; btn.innerHTML = `<button style="background:${canSteal ? T[1 - k].col : '#0f172a'}">${canSteal ? '⚡ فرصة ' + esc(T[1 - k].name) : 'متابعة ←'}</button>`; $('.hx-card', m).appendChild(btn);
        $('button', btn).onclick = () => {
          m.remove();
          if (canSteal) { cl.q = cfg.opts.mode === 'mcq' ? mixQ(q.raw) : q; askCell(cl, 1 - k, true); return; }
          if (ok) { cl.own = k; paint(cl, k); SFX.flip(); } else { $(`.hx-c[data-i="${cl.i}"]`, ROOT).classList.remove('sel'); const nq = Q.next(); cl.q = nq; cl.l = letterOf(nq.o[nq.a]) || '؟'; paint(cl, -1); }
          st.pi[st.turn]++; if (steal) st.pi[k]++; st.turn = 1 - st.turn; st.busy = false;
          const p = ok ? path(k) : null; if (p) win(k, p); else ui();
        };
      };
      if (cfg.opts.mode === 'mcq') $$('.hx-ops button', m).forEach(b => b.onclick = () => finish(+b.dataset.j === q.a, +b.dataset.j));
      else { $('#hxr', m).onclick = () => { $('#hxa', m).style.display = 'block'; $('#hxj', m).style.display = 'flex'; $('#hxr', m).remove(); }; $$('#hxj button', m).forEach(b => b.onclick = () => finish(b.dataset.v === '1', b.dataset.v === '1' ? q.a : -2)); }
      if (cfg.opts.time) { const t0 = performance.now(), bar = $('.hx-tm i', m), TT = cfg.opts.time; let lsec = -1; tmr = setInterval(() => { const el = (performance.now() - t0) / 1000, f = 1 - el / TT; bar.style.transform = `scaleX(${Math.max(0, f)})`; const sec = Math.ceil(TT - el); if (sec <= 5 && sec !== lsec && sec > 0) { lsec = sec; SFX.tick(); } if (f <= 0) { if (cfg.opts.mode === 'mcq') finish(false, -1); else { clearInterval(tmr); bar.style.background = '#ef4444'; } } }, 100); TIMERS.push(tmr); }
    }
    function win(k, p) {
      st.over = true; rounds[k]++; ui(); p.forEach((i, n) => setTimeout(() => { $(`.hx-c[data-i="${i}"]`, ROOT).classList.add('win'); SFX.tick(); }, n * 120));
      setTimeout(() => { SFX.win(); confetti(200); const m = document.createElement('div'); m.className = 'hx-modal'; m.innerHTML = `<div class="hx-card pop" style="--tc:${T[k].col}"><div style="font-size:3.2em">🏆</div><h2 style="font-family:'Readex Pro';font-size:2.2em;margin:.1em 0;color:${T[k].col}">فاز ${esc(T[k].name)} بالجولة!</h2><div style="font-size:1.4em;font-family:'Readex Pro';direction:ltr">${esc(T[1].name)} ${rounds[1]} : ${rounds[0]} ${esc(T[0].name)}</div><div class="hx-btns"><button id="hxn" style="background:#2563eb">↺ جولة جديدة بحروف وأسئلة جديدة</button><button id="hxv" style="background:#475569">👁 عرض اللوحة</button><button id="hxs" style="background:#0f172a">🔀 فرق جديدة</button></div></div>`; ROOT.appendChild(m);
        $('#hxn', m).onclick = () => hxMatch(cfg, rounds); $('#hxs', m).onclick = hexGame; $('#hxv', m).onclick = () => { m.remove(); const b = document.createElement('button'); b.className = 'hx-start'; b.textContent = '↺ جولة جديدة'; b.onclick = () => hxMatch(cfg, rounds); $('.hx-help', ROOT).replaceWith(b); }; }, p.length * 120 + 500);
    }
    ui();
  }

  /* =====================================================================
     ٣) من سيربح المليون
     ===================================================================== */
  const MM_CSS = `
.mm{position:absolute;inset:0;color:#fff;background:#020617;overflow:hidden}
.mm canvas.bg{position:absolute;inset:0;width:100%;height:100%}
.mm-wrap{position:absolute;inset:0;display:grid;grid-template-columns:1fr 23%;gap:1.2%;padding:3.3em 1.2% 1%}
.mm-stage{display:flex;flex-direction:column;min-height:0;min-width:0}
.mm-head{display:flex;align-items:center;gap:.6em;flex-wrap:wrap}
.mm-pill{background:rgba(2,6,23,.7);border:2px solid rgba(250,204,21,.55);border-radius:99px;padding:.3em 1em;font-family:'Readex Pro',sans-serif}
.mm-pill b{color:#fde047}
.mm-walk{margin-inline-start:auto;background:linear-gradient(#475569,#1e293b);color:#fff;border:2px solid #94a3b8!important;border-radius:99px;padding:.3em 1.1em}
.mm-clock{width:3.4em;height:3.4em;position:relative;display:none}.mm-clock.on{display:block}.mm-clock svg{width:100%;height:100%;transform:rotate(-90deg)}.mm-clock span{position:absolute;inset:0;display:grid;place-items:center;font-family:'Readex Pro',sans-serif;font-size:1.25em}
.mm-center{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;position:relative}
.mm-emb{height:min(92%,15em);aspect-ratio:1;transition:transform .6s,opacity .6s}.mm-emb.sp{animation:embsp 6s linear infinite}@keyframes embsp{to{transform:rotate(360deg)}}
.mm-qa{flex:none;padding-bottom:.2em}
.mm-row{position:relative;display:flex;gap:2.2%;margin:.42em 0;padding:0 1.5%}
.mm-row::before{content:'';position:absolute;top:50%;left:-2%;right:-2%;height:2px;background:linear-gradient(90deg,transparent,#c9a227 12%,#f7e08a 50%,#c9a227 88%,transparent);z-index:0}
.lz{--hx:polygon(3.2% 0,96.8% 0,100% 50%,96.8% 100%,3.2% 100%,0 50%);--bd:linear-gradient(#7a5c12,#f9e27d 45%,#8f6b16);--fill:linear-gradient(#11225e,#040b2b 55%,#0e1d52);position:relative;flex:1;display:flex;align-items:center;min-height:2.9em;padding:.35em 4.5%;color:#fff;text-align:right;line-height:1.35;background:none;z-index:1}
.lz::before{content:'';position:absolute;inset:0;clip-path:var(--hx);background:var(--bd);z-index:-2}
.lz::after{content:'';position:absolute;inset:3px 5px;clip-path:var(--hx);background:var(--fill);z-index:-1;transition:background .25s}
.mm-q{min-height:4.4em;justify-content:center;text-align:center;font-size:1.32em;padding:.4em 6%}
.mm-q span{transition:opacity .45s,transform .45s}.mm-q.hide span{opacity:0;transform:translateY(10px)}
button.lz{font-family:'IBM Plex Sans Arabic',sans-serif!important;font-weight:600;font-size:1.12em;cursor:pointer}
button.lz b{color:#f9a825;font-family:'Readex Pro',sans-serif;margin-inline-end:.45em;flex:none}
button.lz span{transition:opacity .3s}
button.lz.hide span,button.lz.hide b{opacity:0}
button.lz:not(:disabled):hover{--fill:linear-gradient(#1c3a8f,#0a1a4d 55%,#1a3480)}
button.lz.sel{--fill:linear-gradient(#ffb02e,#e07b00 55%,#f39c12);color:#111}button.lz.sel b{color:#fff}
button.lz.ok{--fill:linear-gradient(#4ade80,#16a34a 55%,#22c55e);color:#04210f;animation:okfl .32s steps(1) 6}button.lz.ok b{color:#fff}
@keyframes okfl{50%{--fill:linear-gradient(#11225e,#040b2b 55%,#0e1d52);color:#fff}}
button.lz.gone span,button.lz.gone b{opacity:0}button.lz.gone{pointer-events:none}
button.lz:disabled{cursor:default}
.mm-ctl{min-height:3.3em;display:flex;align-items:center;justify-content:center;gap:.7em;flex-wrap:wrap;text-align:center;font-size:.98em;line-height:1.5}
.mm-ctl .ex{color:#cbd5e1;max-width:70%}.mm-ctl .ex b{color:#86efac}.mm-ctl .ex b.x{color:#fca5a5}
.mm-btn{border-radius:99px;padding:.4em 1.4em;font-size:1.05em;color:#111;background:linear-gradient(#fde68a,#f59e0b);border:2px solid #fff7d6!important;box-shadow:0 0 16px rgba(245,158,11,.45)}
.mm-btn.g{background:linear-gradient(#86efac,#16a34a);color:#03140a}.mm-btn.n{background:linear-gradient(#64748b,#334155);color:#fff;box-shadow:none}
.mm-lad{display:flex;flex-direction:column;min-height:0;background:linear-gradient(rgba(10,20,70,.82),rgba(2,6,23,.88));border:2px solid #2741a0;border-radius:18px;padding:.5em .55em;box-shadow:0 0 30px rgba(37,99,235,.25)}
.mm-ll{display:flex;justify-content:space-between;gap:.3em;margin-bottom:.45em}
.mm-ll button{flex:1;aspect-ratio:1.55;border-radius:50%;background:radial-gradient(ellipse at 50% 35%,#2b4fc4,#0b1a5c 70%);border:2px solid #c9a227!important;color:#fff;font-size:.95em;position:relative;font-family:'Readex Pro',sans-serif;box-shadow:inset 0 2px 6px rgba(255,255,255,.2)}
.mm-ll button:disabled{opacity:.5}.mm-ll button.used::after{content:'';position:absolute;inset:18% 8%;background:linear-gradient(45deg,transparent 46%,#ef4444 46%,#ef4444 54%,transparent 54%),linear-gradient(-45deg,transparent 46%,#ef4444 46%,#ef4444 54%,transparent 54%)}
.mm-rows{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:space-between}
.mm-r{display:flex;align-items:center;gap:.5em;padding:.06em .6em;border-radius:99px;font-family:'Readex Pro',sans-serif;color:#f6c343;font-size:.98em;transition:background .4s,transform .4s;flex:1;max-height:2em}
.mm-r i{font-style:normal;width:1.6em;color:#e2e8f0;font-size:.85em}.mm-r s{text-decoration:none;width:.8em;color:#fbbf24;font-size:.75em}.mm-r span{margin-inline-start:auto;direction:rtl}
.mm-r.safe{color:#fff}.mm-r.safe span::after{content:' ✦';color:#fde047}
.mm-r.cur{background:linear-gradient(90deg,#f59e0b,#ffcb52,#f59e0b);color:#111;transform:scale(1.04);box-shadow:0 0 14px rgba(245,158,11,.6)}.mm-r.cur i{color:#111}
.mm-r.up{animation:rup .9s ease}@keyframes rup{0%{background:#16a34a;color:#fff}100%{}}
.mm-aud{display:flex;gap:1.4em;align-items:flex-end;height:88%;padding:.6em 1.2em .3em;background:rgba(2,6,23,.75);border:2px solid #c9a227;border-radius:18px}
.mm-aud div{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;width:3.4em}
.mm-aud em{font-style:normal;font-family:'Readex Pro',sans-serif;color:#fde047;margin-bottom:.2em}
.mm-aud i{display:block;width:100%;height:0;background:linear-gradient(#7dd3fc,#2563eb);border-radius:6px 6px 0 0;transition:height 2s cubic-bezier(.3,1.2,.4,1);box-shadow:0 0 12px rgba(56,189,248,.6)}
.mm-aud b{margin-top:.25em;font-family:'Readex Pro',sans-serif;color:#f9a825;font-size:1.2em}
.mm-ph{width:min(34em,92%);background:rgba(2,6,23,.82);border:2px solid #c9a227;border-radius:20px;padding:.7em 1em;text-align:center}
.mm-ph .ic{font-size:2.4em;animation:ring .25s infinite alternate}@keyframes ring{to{transform:rotate(14deg)}}.mm-ph .ic.stop{animation:none}
.mm-ph .nm{font-family:'Readex Pro',sans-serif;font-size:1.2em;color:#fde047}.mm-ph .cd{font-family:'Readex Pro',sans-serif;font-size:2em}
.mm-ph .bub{background:#fff;color:#0f172a;border-radius:16px;padding:.5em .9em;margin-top:.4em;min-height:2.4em;line-height:1.55;text-align:right}
.mm-ov{position:absolute;inset:0;z-index:30;display:flex;align-items:center;justify-content:center;padding:2vmin;background:radial-gradient(circle,rgba(2,6,23,.55),rgba(2,6,23,.92))}
.mm-chk{width:min(900px,100%);text-align:center;background:linear-gradient(135deg,#fffbeb,#fde68a 60%,#fbbf24);color:#422006;border-radius:24px;padding:1em 1.4em;border:4px solid #fff7d6;box-shadow:0 0 60px rgba(250,204,21,.45)}
.mm-chk h2{font-family:'Readex Pro',sans-serif;font-size:2.1em;margin:.1em 0}.mm-chk .amt{font-family:'Readex Pro',sans-serif;font-size:3.4em;color:#7c2d12;line-height:1.1}
.mm-chk .line{border-top:2px dashed rgba(66,32,6,.4);margin:.5em 0;padding-top:.4em;font-size:.95em}
.mm-set .names{display:flex;flex-wrap:wrap;gap:.35em;max-height:9.5em;overflow:auto;margin-top:.5em}.mm-set .names button{background:rgba(255,255,255,.1);color:#fff;border-radius:10px;padding:.3em .7em;border:2px solid transparent!important;font-family:'IBM Plex Sans Arabic',sans-serif!important;font-weight:600}
.mm-set .names button.on{background:#f59e0b;color:#111;border-color:#fff!important;transform:scale(1.08)}
.mm-set input.nm{font:inherit;font-family:'Readex Pro',sans-serif;font-size:1.3em;text-align:center;width:min(28em,100%);border-radius:14px;border:3px solid #c9a227;background:rgba(2,6,23,.6);color:#fde047;padding:.3em}
`;
  const LADDER = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
  function emblem(big) {
    const rays = Array.from({ length: 24 }, (_, k) => { const a = k * 15 * Math.PI / 180, r1 = 92, r2 = k % 2 ? 112 : 120; return `<line x1="${(120 + Math.cos(a) * r1).toFixed(1)}" y1="${(120 + Math.sin(a) * r1).toFixed(1)}" x2="${(120 + Math.cos(a) * r2).toFixed(1)}" y2="${(120 + Math.sin(a) * r2).toFixed(1)}" stroke="url(#eg)" stroke-width="${k % 2 ? 2 : 4}" stroke-linecap="round"/>`; }).join('');
    return `<svg class="mm-emb${big ? ' big' : ''}" viewBox="0 0 240 240"><defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#f4c542"/><stop offset="1" stop-color="#9a6b0e"/></linearGradient><radialGradient id="eb" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#2b4fc4"/><stop offset="1" stop-color="#040b2b"/></radialGradient></defs>
      <g class="rot">${rays}</g><circle cx="120" cy="120" r="88" fill="url(#eb)" stroke="url(#eg)" stroke-width="6"/><circle cx="120" cy="120" r="76" fill="none" stroke="url(#eg)" stroke-width="1.5" stroke-dasharray="3 5"/>
      <text x="120" y="88" text-anchor="middle" font-family="Readex Pro,sans-serif" font-weight="700" font-size="20" fill="#e2e8f0">مَن سيربح</text>
      <text x="120" y="132" text-anchor="middle" font-family="Readex Pro,sans-serif" font-weight="700" font-size="40" fill="url(#eg)">المليون</text>
      <text x="120" y="172" text-anchor="middle" font-family="Readex Pro,sans-serif" font-weight="700" font-size="30" fill="#f9a825">؟</text></svg>`;
  }
  /* موسيقى ومؤثرات الاستوديو */
  const MS = {
    intro() { if (CS.play('intro')) return; AU.noise(2.2, { ft: 'highpass', f: 3000, f2: 9000, vol: .16, a: 1.9 }); AU.tone(55, 2.4, { at: 2, vol: .55, to: 40 }); AU.noise(1.2, { ft: 'lowpass', f: 300, vol: .4, at: 2 });
      [[2, [130.8, 155.6, 196]], [2.45, [146.8, 174.6, 220]], [2.9, [164.8, 196, 246.9, 329.6]]].forEach(([at, ch], i) => AU.chord(ch, i === 2 ? 2.2 : .4, { type: 'sawtooth', lp: 1800, vol: .07, at, hold: i === 2 ? .8 : .1 })); AU.tone(1318, 2, { at: 2.9, vol: .06, type: 'triangle' }); },
    q() { CS.stop('intro', 700); CS.stop('right', 500); CS.stop('trans', 500); if (CS.play('q')) return; AU.noise(.5, { f: 400, f2: 3000, vol: .15, a: .2 }); AU.tone(82, .8, { vol: .35, to: 60 }); },
    tick() { AU.tone(988, .14, { type: 'triangle', vol: .09 }); AU.tone(1976, .1, { vol: .03 }); },
    loop(L) { const lk = L < 5 ? 'loop1' : L < 10 ? 'loop2' : 'loop3'; ['loop1', 'loop2', 'loop3'].forEach(k => CS.stop(k)); clearInterval(AU.loop); const lkk = [lk, 'loop1', 'loop2', 'loop3'].find(k => CS.has(k)); if (lkk && CS.play(lkk, { loop: true })) return; const bpm = 72 + L * 4, beat = 60000 / bpm, notes = [[55, 65.4, 82.4], [49, 58.3, 73.4], [43.7, 55, 65.4], [49, 61.7, 73.4]]; let bar = 0;
      AU.startLoop(k => { const b = k % 4; if (b === 0) { const ch = notes[bar++ % 4]; AU.chord(ch.map(f => f * 4), beat * 4 / 1000, { type: 'sawtooth', lp: 650 + L * 40, vol: .022, a: .3 }); }
        AU.tone(notes[(bar + 3) % 4][0] * (b === 2 ? 1.5 : 1), .25, { vol: .28, to: 40 }); AU.noise(.05, { ft: 'highpass', f: 7000, vol: .05 }); AU.noise(.05, { ft: 'highpass', f: 7000, vol: .03, at: beat / 2000 });
        if (L > 9 && b % 2) AU.tone(880 * (1 + (k % 3) * .25), .08, { type: 'triangle', vol: .03 }); }, beat); },
    lock() { AU.stopLoop(); if (CS.play('lock')) return; AU.tone(49, 2.2, { vol: .55, to: 36 }); AU.noise(1.5, { ft: 'lowpass', f: 250, vol: .45 }); AU.chord([196, 233, 293.7], 2.4, { type: 'sawtooth', lp: 1100, vol: .05, vib: 6, vd: 4, a: .05, hold: 1.2 });
      let k = 0; AU.startLoop(() => { AU.tone(60, .14, { vol: .35, to: 40, at: 0 }); AU.tone(56, .14, { vol: .25, to: 38, at: .18 }); AU.noise(1.2, { f: 220 + k * 40, q: 3, vol: .05 }); k++; }, 620); },
    right(L) { AU.stopLoop(); if (CS.play('right')) return; AU.chord([523, 659, 784], .7, { type: 'triangle', vol: .13, arp: .06 }); AU.chord([1047, 1319], 1.4, { vol: .06, at: .2, type: 'triangle' }); AU.tone(2093, 1.6, { vol: .05, at: .25 }); AU.noise(1, { ft: 'highpass', f: 6000, vol: .08, a: .1 }); if (L >= 4) AU.chord([262, 330, 392, 523], 1.6, { type: 'sawtooth', lp: 2000, vol: .05, at: .35, hold: .5 }); },
    wrong() { AU.stopLoop(); if (CS.play('wrong')) return; [[311, 0], [294, .3], [277, .6], [262, .9]].forEach(([f, at], i) => AU.tone(f, i === 3 ? 1.4 : .32, { type: 'sawtooth', lp: 900, vol: .1, at, vib: i === 3 ? 5 : 0, vd: 8 })); AU.tone(55, 1.8, { vol: .5, at: .9, to: 35 }); },
    fifty() { if (CS.play('fifty')) return; AU.noise(.35, { f: 2500, f2: 300, vol: .2 }); AU.noise(.35, { f: 2500, f2: 300, vol: .2, at: .35 }); AU.tone(600, .3, { to: 150, type: 'square', vol: .05 }); AU.tone(600, .3, { to: 150, type: 'square', vol: .05, at: .35 }); },
    drum() { if (CS.play('aud')) return; AU.noise(2.2, { ft: 'lowpass', f: 600, vol: .3, trem: 22, a: .3, hold: 1.4 }); AU.tone(110, .5, { at: 2.1, vol: .4 }); },
    ring() { if (CS.play('phone')) return; for (let r = 0; r < 2; r++) for (let p = 0; p < 2; p++) { AU.tone(440, .38, { at: r * 1.4 + p * .5, vol: .07, hold: .3 }); AU.tone(480, .38, { at: r * 1.4 + p * .5, vol: .07, hold: .3 }); } },
    walk() { AU.stopLoop(); if (!CS.play('walk') && !CS.play('trans')) SFX.whoosh(); },
    million() { AU.stopLoop(); if (CS.play('million')) return; SFX.win(); setTimeout(() => SFX.cheer(true), 300); [0, .5, 1].forEach(at => AU.chord([392, 494, 587, 784], .6, { type: 'sawtooth', lp: 2400, vol: .06, at: 1.2 + at })); }
  };
  function millionaire() {
    mount(); if (!$('#mm-css')) document.head.insertAdjacentHTML('beforeend', '<style id="mm-css">' + MM_CSS + '</style>');
    const R = roster(), keys = Object.keys(R.classes); let cls = R.cur && R.classes[R.cur] ? R.cur : (keys[0] || ''), name = '', opts = { timer: 1, confirm: 1 }, spin = 0;
    const mmPool = POOL.filter(q => q.o.length === 4).length;
    function draw() {
      const old = $('.pt-scr', ROOT); if (old) old.remove(); const list = keys.length ? clean(R.classes[cls]) : [];
      const d = document.createElement('div'); d.className = 'pt-scr mm-set'; d.style.background = 'radial-gradient(circle at 50% 30%,#1e3a8a,#040b2b 70%)';
      d.innerHTML = `<div class="pt-set"><div style="height:min(26vh,12em);display:flex;justify-content:center">${emblem(true)}</div>
        <p class="sub" style="margin-top:.3em">${esc(G.lesson.title)} — ${AD(Math.min(15, mmPool))} سؤالًا من بنك الفصل بترتيب جديد في كل لعبة</p>
        <div class="pt-card"><h3>🎤 المتسابق</h3>${keys.length ? `<div class="chips">${keys.map(k => `<button class="chip" data-c="${esc(k)}" aria-pressed="${k === cls}">الفصل ${esc(k)}</button>`).join('')} <button class="chip" id="spin" style="background:#f59e0b;color:#111">🎲 اختيار عشوائي</button></div><div class="names">${list.map((n, i) => `<button data-i="${i}" class="${n === name ? 'on' : ''}">${esc(n)}</button>`).join('')}</div>` : ''}
          <div style="text-align:center;margin-top:.6em"><input class="nm" placeholder="اسم المتسابق" value="${esc(name)}"></div></div>
        <div class="pt-card"><div class="row"><span>المؤقت</span><span class="chips" data-o="timer"><button class="chip" data-v="1" aria-pressed="${opts.timer === 1}">٣٠ ث ثم ٤٥ ث</button><button class="chip" data-v="0" aria-pressed="${opts.timer === 0}">بلا وقت</button></span></div>
          <div class="row"><span>تأكيد الإجابة</span><span class="chips" data-o="confirm"><button class="chip" data-v="1" aria-pressed="${opts.confirm === 1}">«هل هي إجابتك النهائية؟»</button><button class="chip" data-v="0" aria-pressed="${opts.confirm === 0}">مباشرة</button></span></div></div>
        <div class="pt-card"><div class="row"><span>🎵 الأصوات</span><span style="min-width:0;color:#e2e8f0">${CS.count() ? `${AD(CS.count())} من ${AD(SLOTS.length)} أصوات من ملفاتك، والباقي أصوات المنصة` : 'أصوات المنصة المركّبة'}</span><button class="mini" id="snds">🎵 ضع ملفاتك الصوتية</button></div></div>
        <button class="gobtn" id="go" style="background:linear-gradient(#fde68a,#f59e0b);color:#111;box-shadow:0 6px 0 #92400e">💰 لنبدأ اللعب</button></div>`;
      ROOT.appendChild(d);
      const inp = $('input.nm', d); inp.oninput = () => { name = inp.value.trim(); $$('.names button', d).forEach(b => b.classList.toggle('on', b.textContent === name)); };
      $$('.chip[data-c]', d).forEach(b => b.onclick = () => { cls = b.dataset.c; SFX.click(); draw(); });
      $$('.names button', d).forEach(b => b.onclick = () => { name = list[+b.dataset.i]; inp.value = name; SFX.click(); $$('.names button', d).forEach(x => x.classList.toggle('on', x === b)); });
      const sp = $('#spin', d); if (sp) sp.onclick = () => { if (!list.length || spin) return; AU.init(); const bs = $$('.names button', d), target = Math.floor(Math.random() * bs.length), steps = bs.length * 2 + target; let k = 0; spin = 1;
        (function step() { bs.forEach(x => x.classList.remove('on')); const b = bs[k % bs.length]; b.classList.add('on'); b.scrollIntoView({ block: 'nearest' }); SFX.tick(); if (k >= steps) { name = list[target]; inp.value = name; spin = 0; SFX.ok(); return; } k++; setTimeout(step, 40 + Math.pow(k / steps, 3) * 380); })(); };
      $$('[data-o]', d).forEach(g => $$('button', g).forEach(b => b.onclick = () => { opts[g.dataset.o] = +b.dataset.v; SFX.click(); $$('button', g).forEach(x => x.setAttribute('aria-pressed', x === b)); }));
      $('#go', d).onclick = () => { AU.init(); mmGame(name || 'المتسابق', opts, list); };
      $('#snds', d).onclick = () => soundPanel(draw);
    }
    toolbar(); draw();
  }
  function soundPanel(onClose) {
    const m = document.createElement('div'); m.className = 'mm-ov'; m.style.zIndex = 45;
    const draw = () => { m.innerHTML = `<div class="pt-card pop" style="width:min(820px,100%);background:#0b1a4d;border-color:#c9a227;color:#fff;max-height:92vh;overflow:auto">
      <h3 style="display:flex;justify-content:space-between;align-items:center;gap:.5em;flex-wrap:wrap">🎵 أصوات «من سيربح المليون» <span><label class="mini" style="cursor:pointer;background:#f59e0b;color:#111">📦 استيراد حزمة أصوات (zip)<input type="file" accept=".zip,application/zip" id="zipin" style="display:none"></label> <button class="mini" id="sx">✔ تم</button></span></h3><div id="zipmsg" style="color:#fde68a;font-size:.9em;min-height:1.2em"></div>
      <p style="margin:0 0 .5em;color:#cbd5e1;font-size:.85em;line-height:1.6">اختر ملفًا صوتيًا (mp3 أو m4a أو wav) لكل لحظة من اللعبة. تُحفظ الملفات على هذا الجهاز فقط، وأي لحظة بلا ملف تعمل بصوت المنصة. ملفات الموسيقى تتكرر تلقائيًا حتى تُختار الإجابة.</p>
      ${SLOTS.map(([k, lab]) => `<div class="row" style="justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.1);padding:.25em 0"><span style="min-width:11em">${lab}</span><span style="color:${CS.has(k) ? '#86efac' : '#94a3b8'};font-size:.85em;flex:1">${CS.has(k) ? '✔ ملفك' : 'صوت المنصة'}</span>
        <label class="mini" style="cursor:pointer">📂 اختيار ملف<input type="file" accept="audio/*" data-k="${k}" style="display:none"></label><button class="mini" data-p="${k}">▶</button>${CS.has(k) ? `<button class="mini" data-d="${k}">✖</button>` : ''}</div>`).join('')}</div>`;
      $('#zipin', m).onchange = async e => { const f = e.target.files && e.target.files[0]; if (!f) return; const msg = $('#zipmsg', m); msg.textContent = '⏳ جارٍ استيراد الأصوات…'; try { const n = await importZip(f); draw(); $('#zipmsg', m).textContent = n ? `✔ تم وضع ${AD(n)} أصوات في أماكنها` : 'لم أجد في الملف أصواتًا مسماة بأرقام أو أسماء معروفة'; } catch (er) { msg.textContent = 'تعذّر فتح الملف المضغوط على هذا المتصفح — اختر الملفات واحدًا واحدًا'; } };
      $$('input[type=file][data-k]', m).forEach(inp => inp.onchange = async () => { const f = inp.files && inp.files[0]; if (!f) return; await CS.put(inp.dataset.k, f); draw(); });
      $$('[data-p]', m).forEach(b => b.onclick = () => { AU.init(); CS.stopAll(); const k = b.dataset.p; if (CS.play(k)) return; ({ intro: MS.intro, q: MS.q, loop1: () => { MS.loop(0); later(() => AU.stopLoop(), 4000); }, loop2: () => { MS.loop(7); later(() => AU.stopLoop(), 4000); }, loop3: () => { MS.loop(12); later(() => AU.stopLoop(), 4000); }, lock: () => { MS.lock(); later(() => AU.stopLoop(), 3000); }, right: () => MS.right(5), wrong: MS.wrong, fifty: MS.fifty, aud: MS.drum, phone: MS.ring, walk: () => SFX.whoosh(), million: () => { SFX.win(); }, trans: () => SFX.whoosh(), hover: () => SFX.tick(), click: () => SFX.click() })[k](); });
      $$('[data-d]', m).forEach(b => b.onclick = async () => { await CS.del(b.dataset.d); draw(); });
      $('#sx', m).onclick = () => { CS.stopAll(); AU.stopLoop(); m.remove(); onClose && onClose(); }; };
    ROOT.appendChild(m); draw();
  }
  function mmGame(name, opts, classmates) {
    mount(); if (!$('#mm-css')) document.head.insertAdjacentHTML('beforeend', '<style id="mm-css">' + MM_CSS + '</style>');
    const Q = Queue(q => q.o.length === 4), avail = Q.size(), N = Math.min(15, Math.max(1, avail)), LAD = LADDER.slice(15 - N), SAFE = new Set([LAD.indexOf(1000), LAD.indexOf(32000)].filter(i => i >= 0 && i < N - 1));
    const st = { L: 0, q: null, used: {}, gone: new Set(), phase: 'intro', sel: -1, tmr: 0, mood: 0, moodT: 0 };
    ROOT.innerHTML = `<div class="mm"><canvas class="bg"></canvas><div class="mm-wrap"><div class="mm-stage">
        <div class="mm-head"><span class="mm-pill">🎤 <b>${esc(name)}</b></span><span class="mm-pill" id="mmq"></span><div class="mm-clock"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="rgba(2,6,23,.75)" stroke="#1e3a8a" stroke-width="4"/><circle id="mmcr" cx="20" cy="20" r="17" fill="none" stroke="#fde047" stroke-width="4" stroke-dasharray="106.8" stroke-dashoffset="0" stroke-linecap="round"/></svg><span></span></div><button class="mm-walk" id="mmw">🚪 انسحب بالمبلغ</button></div>
        <div class="mm-center">${emblem(false)}</div>
        <div class="mm-qa"><div class="mm-row"><div class="lz mm-q hide"><span></span></div></div>
          <div class="mm-row">${[0, 1].map(i => `<button class="lz mm-a hide" data-i="${i}"><b>${LET[i]}:</b><span></span></button>`).join('')}</div>
          <div class="mm-row">${[2, 3].map(i => `<button class="lz mm-a hide" data-i="${i}"><b>${LET[i]}:</b><span></span></button>`).join('')}</div>
          <div class="mm-ctl"></div></div></div>
      <aside class="mm-lad"><div class="mm-ll"><button data-l="f" title="حذف إجابتين">50:50</button><button data-l="a" title="رأي الجمهور">👥</button><button data-l="p" title="اتصال بصديق">📞</button><button data-l="s" title="تغيير السؤال">🔄</button></div>
        <div class="mm-rows">${LAD.map((v, i) => ({ v, i })).reverse().map(({ v, i }) => `<div class="mm-r${SAFE.has(i) || i === N - 1 ? ' safe' : ''}" data-i="${i}"><i>${AD(i + 1)}</i><s></s><span>${MON(v)}</span></div>`).join('')}</div></aside></div></div>`;
    toolbar();
    const C = $('.mm-center', ROOT), CTL = $('.mm-ctl', ROOT), QE = $('.mm-q', ROOT), AE = $$('.mm-a', ROOT);
    /* خلفية الاستوديو المتحركة */
    const cv = $('canvas.bg', ROOT), cx = cv.getContext('2d'), SP = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), v: .02 + Math.random() * .05, r: .5 + Math.random() * 1.8 })); let lt = performance.now(), tt = 0;
    (function bg(now) { const dt = Math.min(.05, (now - lt) / 1000); lt = now; tt += dt; const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1);
      if (r.width > 4) { if (cv.width !== Math.round(r.width * d)) { cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); } const W = cv.width, H = cv.height, c = cx, m = st.mood; st.moodT = Math.max(0, st.moodT - dt);
        const base = m === 1 ? ['#3b1a7a', '#150a3d'] : ['#1d3a9e', '#0a1546']; let g = c.createRadialGradient(W * .4, H * .62, 10, W * .4, H * .62, Math.max(W, H) * .8); g.addColorStop(0, base[0]); g.addColorStop(.5, base[1]); g.addColorStop(1, '#01030f'); c.fillStyle = g; c.fillRect(0, 0, W, H);
        c.save(); c.globalCompositeOperation = 'lighter'; const nb = 9, conv = m === 1 ? 1 : 0;
        for (let k = 0; k < nb; k++) { const sx = W * (k + .5) / nb, ang = Math.sin(tt * (.25 + k * .03) + k) * .5 * (1 - conv * .7) + (W * .4 - sx) / W * (.6 + conv * .8), len = H * 1.25; c.save(); c.translate(sx, -10); c.rotate(-ang); const bg2 = c.createLinearGradient(0, 0, 0, len); const col = m === 2 && st.moodT > 0 ? '120,255,170' : m === 3 && st.moodT > 0 ? '255,140,80' : conv ? '190,140,255' : '140,180,255'; bg2.addColorStop(0, `rgba(${col},${.16 + conv * .08 + (k % 2) * .04})`); bg2.addColorStop(1, `rgba(${col},0)`); c.fillStyle = bg2; c.beginPath(); c.moveTo(-6 * d, 0); c.lineTo(6 * d, 0); c.lineTo(len * .14, len); c.lineTo(-len * .14, len); c.fill(); c.restore(); }
        const fx = W * .4, fy = H * .9; for (let k = 0; k < 7; k++) { const rx = W * (.08 + k * .07), pulse = 1 + Math.sin(tt * (m === 1 ? 6 : 1.5) - k * .6) * .03; c.strokeStyle = `rgba(${m === 1 ? '200,150,255' : '90,160,255'},${.35 - k * .04})`; c.lineWidth = (3 - k * .3) * d; c.setLineDash(k % 2 ? [14 * d, 10 * d] : []); c.lineDashOffset = -tt * 40 * (k % 2 ? 1 : -1) * d; c.beginPath(); c.ellipse(fx, fy, rx * pulse, rx * .22 * pulse, 0, 0, 7); c.stroke(); } c.setLineDash([]);
        SP.forEach(p => { p.y -= p.v * dt; if (p.y < 0) { p.y = 1; p.x = Math.random(); } c.fillStyle = `rgba(255,240,200,${.35 + Math.sin(tt * 3 + p.x * 20) * .25})`; c.beginPath(); c.arc(p.x * W, p.y * H, p.r * d, 0, 7); c.fill(); });
        if (st.moodT > 0 && (m === 2 || m === 3)) { c.fillStyle = m === 2 ? `rgba(34,197,94,${st.moodT * .12})` : `rgba(239,68,68,${st.moodT * .12})`; c.fillRect(0, 0, W, H); }
        c.restore(); }
      RAF = requestAnimationFrame(bg); })(lt);
    function ladder(up) { $$('.mm-r', ROOT).forEach(r => { const i = +r.dataset.i; r.classList.toggle('cur', i === st.L && st.phase !== 'end'); $('s', r).textContent = i < st.L ? '◆' : ''; if (up && i === st.L - 1) { r.classList.remove('up'); void r.offsetWidth; r.classList.add('up'); } }); }
    const won = () => st.L > 0 ? LAD[st.L - 1] : 0, safeWon = () => { let v = 0; SAFE.forEach(i => { if (i < st.L) v = Math.max(v, LAD[i]); }); return v; };
    function head() { $('#mmq').innerHTML = `السؤال <b>${AD(st.L + 1)}</b> من ${AD(N)} · مقابل <b>${MON(LAD[st.L])}</b> ريال`; }
    function lifelines(on) { $$('.mm-ll button', ROOT).forEach(b => { b.classList.toggle('used', !!st.used[b.dataset.l]); b.disabled = !on || !!st.used[b.dataset.l]; }); $('#mmw').disabled = !on; }
    function clock(stop) { clearInterval(st.tmr); const ce = $('.mm-clock', ROOT); const TT = opts.timer ? (st.L < 5 ? 30 : st.L < 10 ? 45 : 0) : 0; if (stop || !TT) { ce.classList.remove('on'); return; } ce.classList.add('on'); const t0 = performance.now(), cr = $('#mmcr', ROOT), sp = $('span', ce); let ls = -1;
      st.tmr = setInterval(() => { const el = (performance.now() - t0) / 1000, left = Math.max(0, TT - el), sec = Math.ceil(left); sp.textContent = AD(sec); cr.style.strokeDashoffset = (106.8 * (1 - left / TT)).toFixed(1); cr.style.stroke = left < 6 ? '#ef4444' : left < 12 ? '#f59e0b' : '#fde047'; if (sec <= 5 && sec !== ls && sec > 0) { ls = sec; AU.tone(1200, .08, { type: 'square', vol: .05 }); } if (left <= 0) { clearInterval(st.tmr); timeUp(); } }, 100); TIMERS.push(st.tmr); }
    async function intro() { st.phase = 'intro'; lifelines(false); ladder(); head(); const e = $('.mm-emb', C); e.style.transform = 'scale(.2) rotate(-90deg)'; e.style.opacity = '0'; MS.intro(); await wait(60); e.style.transform = 'scale(1)'; e.style.opacity = '1'; CTL.innerHTML = `<span class="fadeup" style="font-family:'Readex Pro';font-size:1.3em;color:#fde047">أهلًا بك يا ${esc(name)}… لنبدأ!</span>`; await wait(1800); if (!CS.has('intro')) { await wait(1200); return show(); } const b = document.createElement('button'); b.className = 'mm-btn fadeup'; b.textContent = '▶ السؤال الأول'; b.onclick = () => show(); CTL.appendChild(b); }
    async function show(replace) {
      st.phase = 'show'; st.gone = new Set(); st.sel = -1; st.mood = 0; if (!replace) st.q = Q.next(); const q = st.q; head(); ladder(); lifelines(false); clock(true);
      C.innerHTML = emblem(false); CTL.innerHTML = ''; QE.classList.add('hide'); AE.forEach(b => { b.className = 'lz mm-a hide'; b.disabled = true; });
      await wait(350); MS.q(); $('span', QE).textContent = q.q; QE.classList.remove('hide'); await wait(1100);
      for (let i = 0; i < 4; i++) { $('span', AE[i]).textContent = q.o[i]; AE[i].classList.remove('hide'); MS.tick(); await wait(420); }
      st.phase = 'q'; AE.forEach(b => b.disabled = false); lifelines(true); MS.loop(st.L); clock();
    }
    AE.forEach(b => b.onpointerenter = e => { if (e.pointerType === 'mouse' && (st.phase === 'q' || st.phase === 'sel') && !st.gone.has(+b.dataset.i)) CS.play('hover'); });
    AE.forEach(b => b.onclick = () => { const i = +b.dataset.i; if (st.phase !== 'q' && st.phase !== 'sel') return; if (st.gone.has(i)) return; if (!CS.play('click')) SFX.click(); AE.forEach(x => x.classList.remove('sel')); b.classList.add('sel'); st.sel = i;
      if (!opts.confirm) return lock(); st.phase = 'sel'; CTL.innerHTML = `<span style="font-family:'Readex Pro'">هل هذه إجابتك النهائية؟</span><button class="mm-btn" id="mmy">✔ إجابة نهائية</button><button class="mm-btn n" id="mmn">↩ تراجع</button>`;
      $('#mmy').onclick = lock; $('#mmn').onclick = () => { AE.forEach(x => x.classList.remove('sel')); st.sel = -1; st.phase = 'q'; CTL.innerHTML = ''; }; });
    async function lock() {
      st.phase = 'lock'; clock(true); lifelines(false); AE.forEach(b => b.disabled = true); CTL.innerHTML = '<span style="color:#fde68a;font-family:\'Readex Pro\'">⏳ لحظات…</span>'; st.mood = 1; MS.lock();
      await wait(Math.min(4200, 1600 + st.L * 180)); reveal(st.sel === st.q.a);
    }
    function reveal(ok) {
      const q = st.q; AE[q.a].classList.remove('sel'); AE[q.a].classList.add('ok'); st.mood = ok ? 2 : 3; st.moodT = 1.5;
      if (ok) { MS.right(st.L); st.L++; ladder(true); if (st.L >= N) { st.phase = 'end'; return setTimeout(() => finish('million'), 2200); } if (SAFE.has(st.L - 1)) confetti(90, 2000);
        st.phase = 'reveal'; CTL.innerHTML = `<span class="ex"><b>✔ إجابة صحيحة! رصيدك ${MON(won())} ريال</b>${q.ex ? ' — ' + esc(q.ex) : ''}${SAFE.has(st.L - 1) ? '<br>✦ وصلت إلى مبلغ مضمون!' : ''}</span><button class="mm-btn g" id="mmx">السؤال التالي ←</button>`; $('#mmx').onclick = () => show(); }
      else { MS.wrong(); st.phase = 'end'; CTL.innerHTML = `<span class="ex"><b class="x">✘ الإجابة الصحيحة: ${esc(q.o[q.a])}</b>${q.ex ? ' — ' + esc(q.ex) : ''}</span><button class="mm-btn" id="mmx">النتيجة</button>`; $('#mmx').onclick = () => finish('wrong'); }
    }
    function timeUp() { if (st.phase !== 'q' && st.phase !== 'sel') return; st.phase = 'end'; AU.stopLoop(); AE.forEach(b => b.disabled = true); lifelines(false); MS.wrong(); AE[st.q.a].classList.add('ok'); CTL.innerHTML = `<span class="ex"><b class="x">⏰ انتهى الوقت! الإجابة الصحيحة: ${esc(st.q.o[st.q.a])}</b></span><button class="mm-btn" id="mmx">النتيجة</button>`; $('#mmx').onclick = () => finish('walk'); }
    $('#mmw').onclick = () => { if (st.phase !== 'q' && st.phase !== 'sel') return; const prev = st.phase; st.phase = 'ask'; CTL.innerHTML = `<span style="font-family:'Readex Pro'">تنسحب بمبلغ ${MON(won())} ريال؟</span><button class="mm-btn" id="mmy">نعم، أنسحب</button><button class="mm-btn n" id="mmn">أكمل اللعب</button>`;
      $('#mmn').onclick = () => { st.phase = prev; CTL.innerHTML = ''; }; $('#mmy').onclick = () => { st.phase = 'end'; clock(true); AU.stopLoop(); AE.forEach(b => b.disabled = true); lifelines(false); AE[st.q.a].classList.add('ok'); MS.walk(); CTL.innerHTML = `<span class="ex">الإجابة الصحيحة كانت: <b>${esc(st.q.o[st.q.a])}</b></span><button class="mm-btn" id="mmx">النتيجة</button>`; $('#mmx').onclick = () => finish('walk'); }; };
    /* وسائل المساعدة */
    $$('.mm-ll button', ROOT).forEach(b => b.onclick = () => { if (st.phase !== 'q' || st.used[b.dataset.l]) return; st.used[b.dataset.l] = 1; lifelines(true); ({ f: fifty, a: audience, p: phone, s: swap })[b.dataset.l](); });
    function fifty() { MS.fifty(); const wrong = shuffle([0, 1, 2, 3].filter(i => i !== st.q.a && i !== st.sel)).slice(0, 2); wrong.forEach((i, n) => setTimeout(() => { st.gone.add(i); AE[i].classList.add('gone'); AE[i].classList.remove('sel'); }, n * 350)); }
    function audience() { MS.drum(); const q = st.q, live = [0, 1, 2, 3].filter(i => !st.gone.has(i)), pc = st.L < 5 ? .72 : st.L < 10 ? .55 : .42; let fav = q.a; if (st.L >= 10 && Math.random() < .2) fav = live.filter(i => i !== q.a)[0] ?? q.a;
      const v = {}; let rest = 100; const top = Math.round(clamp(pc * 100 + (Math.random() - .5) * 18, 30, 92)); v[fav] = top; rest -= top; const others = shuffle(live.filter(i => i !== fav)); others.forEach((i, n) => { const x = n === others.length - 1 ? rest : Math.round(Math.random() * rest * .7); v[i] = x; rest -= x; });
      C.innerHTML = `<div class="mm-aud pop">${[0, 1, 2, 3].map(i => `<div><em>${v[i] || 0}%</em><i data-h="${v[i] || 0}"></i><b>${LET[i]}</b></div>`).join('')}</div>`; setTimeout(() => $$('.mm-aud i', C).forEach(x => x.style.height = (x.dataset.h * .82) + '%'), 80); }
    function phone() { const q = st.q, mates = (classmates || []).filter(n => n !== name), friend = mates.length ? mates[Math.floor(Math.random() * mates.length)] : 'صديقك'; MS.ring(); clock(true);
      C.innerHTML = `<div class="mm-ph pop"><div class="ic">📞</div><div class="nm">اتصال بـ ${esc(friend)}</div><div class="cd">${AD(30)}</div><div class="bub">…يرنّ الهاتف</div></div>`;
      const pc = st.L < 5 ? .9 : st.L < 10 ? .72 : .52, live = [0, 1, 2, 3].filter(i => !st.gone.has(i)), sure = Math.random() < pc, pickA = sure ? q.a : shuffle(live.filter(i => i !== q.a))[0] ?? q.a, conf = sure ? 70 + Math.floor(Math.random() * 25) : 40 + Math.floor(Math.random() * 25);
      const say = conf > 80 ? `متأكد تقريبًا! الإجابة هي (${LET[pickA]}) «${q.o[pickA]}».` : conf > 60 ? `أظن أنها (${LET[pickA]}) «${q.o[pickA]}»… متأكد بنسبة ${AD(conf)}٪ تقريبًا.` : `صعب… لكن أميل إلى (${LET[pickA]}) «${q.o[pickA]}»، لست متأكدًا تمامًا.`;
      let left = 30; later(() => { $('.mm-ph .ic', C) && $('.mm-ph .ic', C).classList.add('stop'); const bub = $('.mm-ph .bub', C); if (!bub) return; bub.textContent = ''; let k = 0; const ty = setInterval(() => { if (!bub.isConnected) return clearInterval(ty); bub.textContent = 'مرحبًا! ' + say.slice(0, ++k); if (k >= say.length) clearInterval(ty); }, 38); TIMERS.push(ty); }, 2600);
      const cd = setInterval(() => { const e = $('.mm-ph .cd', C); if (!e || st.phase === 'lock' || st.phase === 'end') return clearInterval(cd); left--; e.textContent = AD(Math.max(0, left)); if (left <= 0) { clearInterval(cd); e.textContent = 'انتهت المكالمة'; } }, 1000); TIMERS.push(cd); }
    function swap() { SFX.whoosh(); AU.stopLoop(); st.q = Q.next(); show(true); }
    function finish(kind) {
      clock(true); clearInterval(AU.loop); ['loop1', 'loop2', 'loop3', 'lock'].forEach(k => CS.stop(k)); Q.done(); const amt = kind === 'million' ? LAD[N - 1] : kind === 'walk' ? won() : safeWon(); st.phase = 'end'; ladder();
      if (kind === 'million') { MS.million(); confetti(300, 5000); } else { if (!CS.cur.wrong && !CS.cur.walk) CS.play('trans'); if (amt > 0) { if (!CS.has('trans')) SFX.win(); confetti(140); } }
      const o = document.createElement('div'); o.className = 'mm-ov'; o.innerHTML = `<div class="mm-chk pop"><div style="font-size:2.6em">${kind === 'million' ? '🏆💰' : amt ? '🎉' : '💪'}</div><h2>${kind === 'million' ? 'مبروك! ' + esc(name) + ' ربح المليون!' : amt ? 'أحسنت يا ' + esc(name) + '!' : 'حظًّا أوفر يا ' + esc(name)}</h2>
        <div>${kind === 'wrong' ? 'إجابة خاطئة — تحصل على المبلغ المضمون' : kind === 'walk' ? 'انسحبت بالمبلغ الذي ربحته' : 'أجبت عن كل الأسئلة!'}</div><div class="amt" id="mma">٠</div><div>ريال</div>
        <div class="line">أجبت صحيحًا عن ${AD(kind === 'million' ? N : st.L)} من ${AD(N)} أسئلة · ${esc(G.lesson.title)}</div>
        <button class="gobtn" id="mm1">↺ لعبة جديدة بأسئلة جديدة</button> <button class="gobtn" id="mm2" style="background:linear-gradient(#3b82f6,#1d4ed8);box-shadow:0 6px 0 #1e3a8a">🎤 متسابق آخر</button></div>`;
      ROOT.appendChild(o); const ae = $('#mma', o), t0 = performance.now(); (function cnt(now) { const f = clamp((now - t0) / 1600, 0, 1); ae.textContent = MON(Math.round(amt * easeOut(f))); if (f < 1 && ae.isConnected) requestAnimationFrame(cnt); })(t0);
      $('#mm1', o).onclick = () => mmGame(name, opts, classmates); $('#mm2', o).onclick = millionaire;
    }
    intro();
  }

  /* ---------------- نقطة الدخول ---------------- */
  window.PARTY = {
    async open(kind, game, back) {
      G = game; BACK = back; mount(); ROOT.innerHTML = '<div class="pt-scr" style="color:#fff;font-family:Readex Pro;font-size:1.4em">⏳ تجهيز الأسئلة…</div>';
      await Promise.all([loadPool(), CS.loadAll()]); if (!POOL.length) { ROOT.innerHTML = '<div class="pt-scr" style="color:#fff">لا توجد أسئلة لهذا الدرس.</div>'; toolbar(); return; }
      ({ pen: penalty, hex: hexGame, mm: millionaire })[kind]();
    }
  };
})();
