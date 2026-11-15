/* ===== labfx.js — realistic canvas lab toolkit (shared by chapter 8/9 virtual labs) ===== */
const FX = (() => {
  const AR = "'IBM Plex Sans Arabic','Segoe UI',Tahoma,sans-serif", DISP = "'Readex Pro','IBM Plex Sans Arabic',Tahoma,sans-serif", MONO = "ui-monospace,'SFMono-Regular',Menlo,Consolas,monospace";
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function mix(c1, c2, t) { const p = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const a = p(c1), b = p(c2); return '#' + a.map((v, i) => Math.round(lerp(v, b[i], clamp(t, 0, 1))).toString(16).padStart(2, '0')).join(''); }
  function rgba(c, a) { const n = parseInt(c.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
  function rr(c, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function lg(c, x0, y0, x1, y1, stops) { const g = c.createLinearGradient(x0, y0, x1, y1); stops.forEach(s => g.addColorStop(s[0], s[1])); return g; }
  function rg(c, x, y, r0, r1, stops, x1, y1) { const g = c.createRadialGradient(x, y, r0, x1 == null ? x : x1, y1 == null ? y : y1, r1); stops.forEach(s => g.addColorStop(s[0], s[1])); return g; }
  function noise(t, s) { return Math.sin(t * 1.7 + s) * .5 + Math.sin(t * 3.1 + s * 2.3) * .3 + Math.sin(t * 7.3 + s * .7) * .2; }

  /* ---------- stage: DPR-aware canvas with logical coordinates, letterboxed, rAF loop, pointer mapping ---------- */
  function stage(host, W, H, draw, opt) {
    opt = opt || {};
    const cv = document.createElement('canvas'); cv.className = 'fxcv';
    cv.style.cssText = 'display:block;width:100%;height:100%;min-height:0;touch-action:none;border-radius:12px;cursor:default';
    host.appendChild(cv);
    const ctx = cv.getContext('2d'); const VX = opt.vx || 0, VY = opt.vy || 0;
    const st = { cv, ctx, W, H, t: 0, dt: 0, s: 1, ox: 0, oy: 0, hits: [], ptr: { x: -1, y: -1, down: false }, hover: null, running: true, drag: null };
    function size() { const r = cv.getBoundingClientRect(); if (r.width < 4 || r.height < 4) return false; const d = Math.min(2, window.devicePixelRatio || 1);
      if (cv.width !== Math.round(r.width * d) || cv.height !== Math.round(r.height * d)) { cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); }
      st.s = Math.min(cv.width / W, cv.height / H); st.ox = (cv.width - W * st.s) / 2 - VX * st.s; st.oy = (cv.height - H * st.s) / 2 - VY * st.s;
      st.x0 = -st.ox / st.s; st.y0 = -st.oy / st.s; st.x1 = st.x0 + cv.width / st.s; st.y1 = st.y0 + cv.height / st.s; return true; }
    let last = performance.now();
    function frame(now) {
      if (!cv.isConnected) return;
      st.dt = Math.min(.05, (now - last) / 1000); last = now;
      if (cv.offsetParent !== null && size()) {
        st.t += st.dt; st.hits = [];
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.setTransform(st.s, 0, 0, st.s, st.ox, st.oy);
        ctx.textBaseline = 'middle'; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        draw(ctx, st);
        const h = hitAt(st.ptr.x, st.ptr.y); st.hover = h; cv.style.cursor = st.drag ? 'grabbing' : h ? (h.drag ? 'grab' : 'pointer') : 'default';
      }
      requestAnimationFrame(frame);
    }
    function toLocal(e) { const r = cv.getBoundingClientRect(), d = cv.width / r.width; return { x: ((e.clientX - r.left) * d - st.ox) / st.s, y: ((e.clientY - r.top) * d - st.oy) / st.s }; }
    function hitAt(x, y) { for (let i = st.hits.length - 1; i >= 0; i--) { const h = st.hits[i]; if (h.r ? Math.hypot(x - h.x, y - h.y) <= h.r : (x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h)) return h; } return null; }
    cv.addEventListener('pointerdown', e => { const p = toLocal(e); st.ptr = { ...p, down: true }; const h = hitAt(p.x, p.y); if (!h) return; e.preventDefault();
      if (h.drag) { st.drag = { h, sx: p.x, sy: p.y, dx: 0, dy: 0 }; try { cv.setPointerCapture(e.pointerId); } catch (_) { } h.drag.start && h.drag.start(p); }
      else if (h.hold) { st.holding = h; h.hold(true); } else h.click && h.click(p); });
    cv.addEventListener('pointermove', e => { const p = toLocal(e); st.ptr.x = p.x; st.ptr.y = p.y; if (st.drag) { st.drag.dx = p.x - st.drag.sx; st.drag.dy = p.y - st.drag.sy; st.drag.h.drag.move && st.drag.h.drag.move(p, st.drag); } });
    const up = e => { const p = toLocal(e); st.ptr.down = false; if (st.drag) { const d = st.drag; st.drag = null; d.h.drag.end && d.h.drag.end(p, d); } if (st.holding) { st.holding.hold(false); st.holding = null; } };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up); cv.addEventListener('pointerleave', e => { if (st.holding) { st.holding.hold(false); st.holding = null; } });
    st.hit = (o) => { st.hits.push(o); return o; };
    requestAnimationFrame(frame);
    return st;
  }

  /* ---------- environment ---------- */
  function room(c, st, benchY, o) {
    o = o || {}; const x0 = st.x0, x1 = st.x1, y0 = st.y0, y1 = st.y1;
    // wall
    c.fillStyle = lg(c, 0, y0, 0, benchY, [[0, o.wall0 || '#dfe7ee'], [1, o.wall1 || '#c9d5df']]); c.fillRect(x0, y0, x1 - x0, benchY - y0);
    // ceramic tiles
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.2; const ts = o.tile || 46;
    for (let y = benchY - ts * 4.2; y > y0; y -= ts) { c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); }
    for (let x = Math.floor(x0 / ts) * ts; x < x1; x += ts) { c.beginPath(); c.moveTo(x, y0); c.lineTo(x, benchY - ts * 4.2); c.stroke(); }
    c.fillStyle = 'rgba(30,58,95,.06)'; c.fillRect(x0, benchY - ts * 4.2, x1 - x0, ts * 4.2);
    // window light
    if (o.window !== false) { c.fillStyle = rg(c, st.W * .82, y0 + 40, 10, st.W * .6, [[0, 'rgba(255,255,255,.55)'], [1, 'rgba(255,255,255,0)']]); c.fillRect(x0, y0, x1 - x0, benchY - y0); }
    bench(c, x0, x1, benchY, y1);
  }
  function bench(c, x0, x1, y, y1) {
    // dark epoxy lab bench top + front edge
    c.fillStyle = lg(c, 0, y, 0, y + 26, [[0, '#3b4652'], [1, '#262e37']]); c.fillRect(x0, y, x1 - x0, 26);
    c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(x0, y, x1 - x0, 2);
    c.fillStyle = lg(c, 0, y + 26, 0, y1, [[0, '#a87a4f'], [.5, '#8d633d'], [1, '#6f4b2c']]); c.fillRect(x0, y + 26, x1 - x0, y1 - y - 26);
    c.strokeStyle = 'rgba(60,35,15,.25)'; c.lineWidth = 2;
    for (let k = 0; k < 7; k++) { c.beginPath(); const yy = y + 40 + k * 14; c.moveTo(x0, yy); for (let x = x0; x < x1; x += 40) c.lineTo(x, yy + Math.sin(x * .013 + k) * 3); c.stroke(); }
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(x0, y + 26, x1 - x0, 5);
  }
  function shadow(c, x, y, rx, ry, a) { c.fillStyle = rg(c, x, y, 0, rx, [[0, `rgba(0,0,0,${a || .28})`], [1, 'rgba(0,0,0,0)']]); c.save(); c.translate(x, y); c.scale(1, ry / rx); c.beginPath(); c.arc(0, 0, rx, 0, 7); c.restore(); c.fill(); }

  /* ---------- glassware ---------- */
  function glassBody(c, path, w, x) {
    c.save(); path(); c.fillStyle = lg(c, x, 0, x + w, 0, [[0, 'rgba(200,225,240,.42)'], [.18, 'rgba(255,255,255,.18)'], [.5, 'rgba(210,232,245,.10)'], [.85, 'rgba(255,255,255,.22)'], [1, 'rgba(170,200,220,.45)']]); c.fill(); c.restore();
  }
  function glassEdge(c, path) { c.save(); path(); c.strokeStyle = 'rgba(90,120,145,.85)'; c.lineWidth = 2.2; c.stroke(); c.restore(); }
  function highlight(c, x, y, h, a) { c.fillStyle = lg(c, x, 0, x + 6, 0, [[0, `rgba(255,255,255,${a || .75})`], [1, 'rgba(255,255,255,0)']]); c.fillRect(x, y, 6, h); }
  // test tube drawn upright at local origin (x center, y top), w width, h height. fill(c, inner) draws contents (clip applied)
  function testTube(c, x, y, w, h, fill, o) {
    o = o || {}; const r = w / 2;
    const path = () => { c.beginPath(); c.moveTo(x - r, y); c.lineTo(x - r, y + h - r); c.arc(x, y + h - r, r, Math.PI, 0, true); c.lineTo(x + r, y); };
    glassBody(c, () => { path(); c.closePath(); }, w, x - r);
    if (fill) { c.save(); path(); c.closePath(); c.clip(); fill(c, { x: x - r, y, w, h, r, bottom: y + h }); c.restore(); }
    glassEdge(c, path);
    c.strokeStyle = 'rgba(90,120,145,.9)'; c.lineWidth = 3; c.beginPath(); c.ellipse(x, y, r + 1.5, 3, 0, 0, 7); c.stroke();
    highlight(c, x - r + 3, y + 6, h - r - 8, .7);
  }
  function beaker(c, x, y, w, h, level, color, o) {
    o = o || {}; const lip = 6;
    const path = () => { c.beginPath(); c.moveTo(x - lip, y); c.lineTo(x, y + 4); c.lineTo(x, y + h - 10); c.quadraticCurveTo(x, y + h, x + 10, y + h); c.lineTo(x + w - 10, y + h); c.quadraticCurveTo(x + w, y + h, x + w, y + h - 10); c.lineTo(x + w, y + 4); c.lineTo(x + w + 2, y); };
    shadow(c, x + w / 2, y + h + 2, w * .62, 7, .3);
    glassBody(c, () => { path(); c.closePath(); }, w, x);
    if (level > 0) { const ly = y + h - level * (h - 14); c.save(); path(); c.closePath(); c.clip();
      c.fillStyle = lg(c, x, 0, x + w, 0, [[0, mix(color, '#000000', .18)], [.5, color], [1, mix(color, '#000000', .25)]]); c.globalAlpha = o.alpha || .62; c.fillRect(x, ly, w, h);
      c.globalAlpha = 1; c.fillStyle = rgba(mix(color, '#ffffff', .5), .7); c.beginPath(); c.ellipse(x + w / 2, ly, w / 2, 4, 0, 0, 7); c.fill();
      o.inside && o.inside(c, { x, y, w, h, ly }); c.restore(); }
    glassEdge(c, path);
    // graduations
    if (o.grad !== false) { c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 1.3; c.fillStyle = 'rgba(255,255,255,.9)'; c.font = `600 9px ${MONO}`;
      for (let k = 1; k <= 4; k++) { const gy = y + h - k * (h - 14) / 5; c.beginPath(); c.moveTo(x + w * .62, gy); c.lineTo(x + w * .8, gy); c.stroke(); } }
    highlight(c, x + 5, y + 10, h - 24, .55);
  }
  function cylinder(c, x, y, w, h, level, color, o) { // graduated cylinder
    o = o || {};
    shadow(c, x + w / 2, y + h + 8, w * 1.4, 6, .3);
    c.fillStyle = lg(c, x - 14, 0, x + w + 14, 0, [[0, '#9fb3c4'], [.5, '#e2ebf2'], [1, '#8aa0b2']]); rr(c, x - 14, y + h, w + 28, 9, 4); c.fill();
    const path = () => { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + h); c.lineTo(x + w, y + h); c.lineTo(x + w, y); };
    glassBody(c, () => { path(); c.closePath(); }, w, x);
    if (level > 0) { const ly = y + h - level * (h - 6); c.save(); path(); c.closePath(); c.clip(); c.globalAlpha = o.alpha || .55; c.fillStyle = color; c.fillRect(x, ly, w, h); c.globalAlpha = 1; o.inside && o.inside(c, { x, y, w, h, ly }); c.restore(); }
    glassEdge(c, path);
    c.strokeStyle = 'rgba(40,60,80,.65)'; c.lineWidth = 1; for (let k = 1; k < 20; k++) { const gy = y + h - k * (h - 6) / 20; c.beginPath(); c.moveTo(x + w * (k % 5 ? .7 : .5), gy); c.lineTo(x + w, gy); c.stroke(); }
    highlight(c, x + 3, y + 4, h - 8, .6);
  }
  function rack(c, x, y, w) { c.fillStyle = lg(c, 0, y, 0, y + 14, [[0, '#d8b38a'], [1, '#a47b52']]); rr(c, x, y, w, 14, 3); c.fill(); c.fillStyle = '#8a6440'; c.fillRect(x + 6, y + 14, 8, 40); c.fillRect(x + w - 14, y + 14, 8, 40); c.fillStyle = lg(c, 0, y + 46, 0, y + 58, [[0, '#d8b38a'], [1, '#93693f']]); rr(c, x - 4, y + 46, w + 8, 12, 3); c.fill(); }

  /* ---------- heat sources ---------- */
  function flame(c, x, y, s, t, o) {
    o = o || {}; const f = 1 + noise(t * 6, 1) * .07, sway = noise(t * 4, 3) * 3 * s;
    c.fillStyle = rg(c, x, y - 45 * s, 4, 80 * s, [[0, o.blue ? 'rgba(120,160,255,.28)' : 'rgba(255,170,60,.3)'], [1, 'rgba(255,255,255,0)']]); c.beginPath(); c.arc(x, y - 45 * s, 80 * s, 0, 7); c.fill();
    if (o.blue) { // non-luminous Bunsen flame (air hole open)
      const H = 86 * s * f, Wd = 13 * s;
      c.beginPath(); c.moveTo(x - Wd, y); c.bezierCurveTo(x - Wd * 1.25, y - H * .5, x + sway - 4 * s, y - H * .8, x + sway, y - H); c.bezierCurveTo(x + sway + 4 * s, y - H * .8, x + Wd * 1.25, y - H * .5, x + Wd, y); c.closePath();
      c.fillStyle = lg(c, 0, y, 0, y - H, [[0, 'rgba(70,110,240,.75)'], [.55, 'rgba(120,150,250,.5)'], [.85, 'rgba(250,170,90,.35)'], [1, 'rgba(255,190,120,0)']]); c.fill();
      const h2 = H * .42; c.beginPath(); c.moveTo(x - Wd * .7, y); c.quadraticCurveTo(x - Wd * .3, y - h2 * .8, x, y - h2); c.quadraticCurveTo(x + Wd * .3, y - h2 * .8, x + Wd * .7, y); c.closePath();
      c.fillStyle = lg(c, 0, y, 0, y - h2, [[0, 'rgba(20,60,220,.95)'], [1, 'rgba(110,200,255,.95)']]); c.fill();
      c.fillStyle = 'rgba(190,230,255,.9)'; c.beginPath(); c.ellipse(x, y - h2 * .55, Wd * .18, h2 * .35, 0, 0, 7); c.fill();
    } else {
      const H = 96 * s * f, Wd = 16 * s;
      c.beginPath(); c.moveTo(x - Wd, y); c.bezierCurveTo(x - Wd * 1.35, y - H * .45, x + sway - 6 * s, y - H * .75, x + sway, y - H); c.bezierCurveTo(x + sway + 6 * s, y - H * .75, x + Wd * 1.35, y - H * .45, x + Wd, y); c.closePath();
      c.fillStyle = lg(c, 0, y, 0, y - H, [[0, 'rgba(255,200,60,.95)'], [.3, 'rgba(255,150,20,.95)'], [.7, 'rgba(240,80,10,.8)'], [1, 'rgba(220,40,0,0)']]); c.fill();
      c.beginPath(); c.moveTo(x - Wd * .55, y); c.quadraticCurveTo(x, y - H * .55, x + Wd * .55, y); c.closePath(); c.fillStyle = 'rgba(255,245,180,.95)'; c.fill();
      c.beginPath(); c.moveTo(x - Wd * .45, y); c.quadraticCurveTo(x, y - H * .2, x + Wd * .45, y); c.closePath(); c.fillStyle = 'rgba(60,110,255,.85)'; c.fill();
    }
  }
  function burner(c, x, y, on, t, o) { // y = bench top
    o = o || {};
    shadow(c, x, y + 2, 46, 8, .35);
    c.fillStyle = lg(c, x - 40, 0, x + 40, 0, [[0, '#2d3640'], [.45, '#6d7b88'], [1, '#262e36']]); c.beginPath(); c.ellipse(x, y - 6, 40, 9, 0, 0, 7); c.fill(); c.fillRect(x - 40, y - 12, 80, 6);
    c.fillStyle = lg(c, x - 10, 0, x + 10, 0, [[0, '#7c868f'], [.35, '#e8eef2'], [.6, '#a9b4bc'], [1, '#5a646d']]); c.fillRect(x - 9, y - 96, 18, 86);
    c.fillStyle = '#555f68'; c.fillRect(x - 12, y - 40, 24, 10); c.fillStyle = '#2b3239'; c.fillRect(x - 5, y - 38, 10, 6); // air collar
    c.strokeStyle = '#c2410c'; c.lineWidth = 7; c.beginPath(); c.moveTo(x + 30, y - 8); c.bezierCurveTo(x + 70, y - 4, x + 90, y + 4, x + 140, y + 4); c.stroke(); // gas hose
    c.fillStyle = '#9aa5ae'; c.fillRect(x + 22, y - 14, 18, 7);
    if (on) flame(c, x, y - 96, o.scale || 1, t, Object.assign({ blue: true }, o));
  }
  function hotplate(c, x, y, w, heat, t) {
    shadow(c, x + w / 2, y + 2, w * .6, 8, .35);
    c.fillStyle = lg(c, 0, y - 34, 0, y, [[0, '#e5e9ec'], [1, '#aeb6bd']]); rr(c, x, y - 34, w, 34, 6); c.fill();
    c.fillStyle = mix('#3a4450', '#ff3b0a', heat * .85); rr(c, x + 6, y - 40, w - 12, 8, 3); c.fill();
    if (heat > .05) { c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = rg(c, x + w / 2, y - 40, 2, w * .6, [[0, `rgba(255,90,20,${.35 * heat})`], [1, 'rgba(255,60,0,0)']]); c.fillRect(x - w * .1, y - 100, w * 1.2, 70); c.restore(); }
    c.fillStyle = '#1f2937'; c.beginPath(); c.arc(x + 22, y - 17, 9, 0, 7); c.fill(); c.strokeStyle = '#e5e7eb'; c.lineWidth = 2; c.beginPath(); c.moveTo(x + 22, y - 17); c.lineTo(x + 22 + Math.cos(-2.4 + heat * 3) * 8, y - 17 + Math.sin(-2.4 + heat * 3) * 8); c.stroke();
    c.fillStyle = heat > .05 ? '#ef4444' : '#7f1d1d'; c.beginPath(); c.arc(x + w - 20, y - 17, 4, 0, 7); c.fill();
  }
  function stand(c, x, y, h, armY, armLen) { // retort stand at x (rod), base on bench y
    shadow(c, x + 30, y + 2, 70, 7, .3);
    c.fillStyle = lg(c, 0, y - 12, 0, y, [[0, '#4b5563'], [1, '#1f2937']]); rr(c, x - 30, y - 12, 120, 12, 3); c.fill();
    c.fillStyle = lg(c, x - 4, 0, x + 4, 0, [[0, '#9ca3af'], [.5, '#f3f4f6'], [1, '#6b7280']]); c.fillRect(x - 4, y - h, 8, h - 12);
    if (armY != null) { c.fillStyle = '#374151'; rr(c, x - 9, armY - 9, 18, 18, 3); c.fill(); c.fillStyle = lg(c, 0, armY - 3, 0, armY + 3, [[0, '#d1d5db'], [1, '#6b7280']]); c.fillRect(x, armY - 3, armLen, 6); }
  }

  /* ---------- instruments ---------- */
  function lcd(c, x, y, w, h, text, o) {
    o = o || {}; rr(c, x, y, w, h, 5); c.fillStyle = o.off ? '#3c4a3f' : lg(c, 0, y, 0, y + h, [[0, '#b9e6a8'], [1, '#93cf80']]); c.fill();
    c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 2; c.stroke();
    if (!o.off) { c.fillStyle = 'rgba(16,40,14,.88)'; c.font = `700 ${Math.round(h * .62)}px ${MONO}`; c.textAlign = 'right'; c.fillText(text, x + w - 8, y + h / 2 + 1); c.textAlign = 'left'; }
  }
  function balance(c, x, y, w, text, o) { // y = bench top; pan top at y-62
    o = o || {};
    shadow(c, x + w / 2, y + 2, w * .6, 8, .35);
    c.fillStyle = lg(c, 0, y - 46, 0, y, [[0, '#f4f6f8'], [.6, '#d4dbe1'], [1, '#9aa6b0']]); rr(c, x, y - 46, w, 46, 10); c.fill();
    c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 1.5; c.stroke();
    c.fillStyle = '#1f2937'; rr(c, x + 10, y - 40, w - 20, 30, 6); c.fill();
    lcd(c, x + w * .3, y - 36, w * .62, 22, text, o);
    c.fillStyle = '#ef4444'; c.beginPath(); c.arc(x + 24, y - 25, 6, 0, 7); c.fill(); c.fillStyle = '#e5e7eb'; c.font = `600 9px ${AR}`; c.textAlign = 'center'; c.fillText(o.tareLabel || 'صفر', x + 24, y - 12); c.textAlign = 'left';
    c.fillStyle = '#9ca3af'; c.fillRect(x + w / 2 - 8, y - 56, 16, 10);
    c.fillStyle = lg(c, 0, y - 62, 0, y - 54, [[0, '#ffffff'], [1, '#b8c2ca']]); c.beginPath(); c.ellipse(x + w / 2, y - 58, w * .36, 6, 0, 0, 7); c.fill(); c.strokeStyle = '#8b98a3'; c.lineWidth = 1; c.stroke();
    return y - 62;
  }
  function thermometer(c, x, y, h, T, o) { // glass lab thermometer: x center, y top
    o = o || {}; const min = o.min == null ? -10 : o.min, max = o.max == null ? 110 : o.max, w = 12;
    c.fillStyle = 'rgba(255,255,255,.75)'; rr(c, x - w / 2, y, w, h, 6); c.fill(); c.strokeStyle = 'rgba(80,100,120,.7)'; c.lineWidth = 1.5; c.stroke();
    const by = y + h + 6; const col = o.color || '#dc2626';
    c.fillStyle = rg(c, x - 3, by - 3, 1, 10, [[0, mix(col, '#ffffff', .5)], [1, col]]); c.beginPath(); c.arc(x, by, 10, 0, 7); c.fill();
    const top = y + h - clamp((T - min) / (max - min), 0, 1) * (h - 10); c.fillStyle = col; c.fillRect(x - 2.5, top, 5, by - top);
    if (o.ticks !== false) { c.strokeStyle = '#334155'; c.lineWidth = 1; c.fillStyle = '#334155'; c.font = `600 9px ${MONO}`; c.textAlign = 'left';
      for (let v = Math.ceil(min / 10) * 10; v <= max; v += 10) { const ty = y + h - (v - min) / (max - min) * (h - 10); c.beginPath(); c.moveTo(x + w / 2, ty); c.lineTo(x + w / 2 + 6, ty); c.stroke(); if (o.labels !== false && v % (o.labStep || 20) === 0) c.fillText(v, x + w / 2 + 8, ty); } }
  }
  function probe(c, x, y, len, T, o) { // digital thermometer with probe; x,y = display top-left
    o = o || {}; c.strokeStyle = '#111827'; c.lineWidth = 3; c.beginPath(); c.moveTo(x + 40, y + 60); c.bezierCurveTo(x + 40, y + 110, (o.px || x) , (o.py || y + len) - 120, o.px || x, (o.py || y + len) - 60); c.stroke();
    c.fillStyle = lg(c, (o.px || x) - 3, 0, (o.px || x) + 3, 0, [[0, '#9ca3af'], [.5, '#f9fafb'], [1, '#6b7280']]); c.fillRect((o.px || x) - 3, (o.py || y + len) - 60, 6, 60);
    c.fillStyle = lg(c, 0, y, 0, y + 64, [[0, '#fbbf24'], [1, '#d97706']]); rr(c, x, y, 80, 64, 10); c.fill();
    lcd(c, x + 7, y + 8, 66, 30, T.toFixed(1), {}); c.fillStyle = '#7c2d12'; c.font = `700 12px ${AR}`; c.textAlign = 'center'; c.fillText('°س', x + 40, y + 50); c.textAlign = 'left';
  }
  function clock(c, x, y, r, sec, o) { // lab stopwatch / timer
    o = o || {}; shadow(c, x, y + r + 4, r * .8, 5, .25);
    c.fillStyle = lg(c, x - r, y - r, x + r, y + r, [[0, '#f3f4f6'], [1, '#9ca3af']]); c.beginPath(); c.arc(x, y, r + 5, 0, 7); c.fill(); c.fillStyle = '#9ca3af'; c.fillRect(x - 5, y - r - 13, 10, 9);
    c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.strokeStyle = '#334155';
    for (let k = 0; k < 60; k++) { const a = k / 60 * Math.PI * 2 - Math.PI / 2, l = k % 5 ? 4 : 8; c.lineWidth = k % 5 ? 1 : 2; c.beginPath(); c.moveTo(x + Math.cos(a) * (r - 2), y + Math.sin(a) * (r - 2)); c.lineTo(x + Math.cos(a) * (r - 2 - l), y + Math.sin(a) * (r - 2 - l)); c.stroke(); }
    const a = (sec % 60) / 60 * Math.PI * 2 - Math.PI / 2; c.strokeStyle = '#dc2626'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * (r - 8), y + Math.sin(a) * (r - 8)); c.stroke();
    c.fillStyle = '#111827'; c.beginPath(); c.arc(x, y, 4, 0, 7); c.fill();
    if (o.digital !== false) lcd(c, x - r * .55, y + r * .3, r * 1.1, r * .38, (o.text != null ? o.text : sec.toFixed(1)), {});
  }
  function gauge(c, x, y, r, v, max, o) { // analog speedometer
    o = o || {}; c.fillStyle = rg(c, x, y, r * .2, r + 8, [[0, '#1f2937'], [1, '#0b1220']]); c.beginPath(); c.arc(x, y, r + 8, 0, 7); c.fill();
    c.strokeStyle = '#94a3b8'; c.lineWidth = 3; c.beginPath(); c.arc(x, y, r + 4, 0, 7); c.stroke();
    const a0 = Math.PI * .75, a1 = Math.PI * 2.25;
    for (let k = 0; k <= max; k += (o.step || 2)) { const a = a0 + (a1 - a0) * k / max; const major = k % ((o.step || 2) * 2) === 0; c.strokeStyle = k / max > .8 ? '#f87171' : '#e2e8f0'; c.lineWidth = major ? 3 : 1.5;
      c.beginPath(); c.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); c.lineTo(x + Math.cos(a) * (r - (major ? 12 : 7)), y + Math.sin(a) * (r - (major ? 12 : 7))); c.stroke();
      if (major) { c.fillStyle = '#e2e8f0'; c.font = `600 ${Math.round(r * .16)}px ${MONO}`; c.textAlign = 'center'; c.fillText(k, x + Math.cos(a) * (r - 24), y + Math.sin(a) * (r - 24)); } }
    const a = a0 + (a1 - a0) * clamp(v / max, 0, 1); c.strokeStyle = '#f97316'; c.lineWidth = 4; c.beginPath(); c.moveTo(x - Math.cos(a) * 10, y - Math.sin(a) * 10); c.lineTo(x + Math.cos(a) * (r - 6), y + Math.sin(a) * (r - 6)); c.stroke();
    c.fillStyle = '#e5e7eb'; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill();
    c.fillStyle = '#f8fafc'; c.font = `700 ${Math.round(r * .3)}px ${MONO}`; c.fillText(v.toFixed(1), x, y + r * .45); c.font = `600 ${Math.round(r * .14)}px ${AR}`; c.fillStyle = '#94a3b8'; c.fillText(o.unit || 'م/ث', x, y + r * .72); c.textAlign = 'left';
  }

  /* ---------- particles ---------- */
  function parts() {
    const P = [];
    return {
      list: P,
      add(p) { P.push(Object.assign({ age: 0, life: 2, vx: 0, vy: 0, r: 4, a: 1 }, p)); },
      step(dt) { for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.age += dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.g) p.vy += p.g * dt; if (p.k === 'smoke' || p.k === 'steam') { p.vx += Math.sin(p.age * 3 + p.s) * 6 * dt; p.r += p.grow * dt; } if (p.age > p.life || (p.ymin != null && p.y < p.ymin)) P.splice(i, 1); } },
      draw(c) { for (const p of P) { const f = 1 - p.age / p.life;
        if (p.k === 'bubble') { c.strokeStyle = `rgba(255,255,255,${.85 * Math.min(1, f * 3)})`; c.lineWidth = 1.3; c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.stroke(); c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.arc(p.x - p.r * .35, p.y - p.r * .35, p.r * .3, 0, 7); c.fill(); }
        else if (p.k === 'smoke' || p.k === 'steam') { c.fillStyle = rg(c, p.x, p.y, 0, p.r, [[0, (p.col || 'rgba(235,240,245,') + (p.a * f * .55) + ')'], [1, (p.col || 'rgba(235,240,245,') + '0)']]); c.beginPath(); c.arc(p.x, p.y, p.r, 0, 7); c.fill(); }
        else if (p.k === 'spark') { c.fillStyle = `rgba(255,${180 + 70 * f | 0},80,${f})`; c.beginPath(); c.arc(p.x, p.y, p.r * f + .5, 0, 7); c.fill(); }
        else if (p.k === 'drop') { c.fillStyle = p.col || 'rgba(120,180,230,.85)'; c.beginPath(); c.ellipse(p.x, p.y, p.r * .7, p.r, 0, 0, 7); c.fill(); }
        else if (p.k === 'ring') { c.strokeStyle = `rgba(${p.rgb || '255,200,60'},${f})`; c.lineWidth = 3; c.beginPath(); c.arc(p.x, p.y, p.r + (1 - f) * (p.grow || 40), 0, 7); c.stroke(); }
        else if (p.k === 'text') { c.fillStyle = `rgba(${p.rgb || '15,23,42'},${f})`; c.font = `700 ${p.size || 18}px ${DISP}`; c.textAlign = 'center'; c.fillText(p.text, p.x, p.y); c.textAlign = 'left'; } } }
    };
  }

  /* ---------- UI overlays on canvas ---------- */
  function tag(c, text, x, y, o) { // rounded Arabic label
    o = o || {}; c.font = `${o.w || 600} ${o.size || 15}px ${o.disp ? DISP : AR}`; c.direction = 'rtl'; const tw = c.measureText(text).width, pw = tw + 18, ph = (o.size || 15) + 12;
    const ax = o.align === 'left' ? x : o.align === 'right' ? x - pw : x - pw / 2;
    c.fillStyle = o.bg || 'rgba(15,23,42,.82)'; rr(c, ax, y - ph / 2, pw, ph, ph / 2); c.fill(); if (o.border) { c.strokeStyle = o.border; c.lineWidth = 2; c.stroke(); }
    c.fillStyle = o.color || '#fff'; c.textAlign = 'center'; c.fillText(text, ax + pw / 2, y + 1); c.textAlign = 'left'; c.direction = 'ltr'; return { x: ax, y: y - ph / 2, w: pw, h: ph };
  }
  function hint(c, x, y, t, text, o) { // pulsing ring + arrow + label
    o = o || {}; const p = (t * 1.4) % 1;
    c.strokeStyle = `rgba(245,183,0,${1 - p})`; c.lineWidth = 4; c.beginPath(); c.arc(x, y, (o.r || 22) + p * 18, 0, 7); c.stroke();
    c.strokeStyle = 'rgba(245,183,0,.95)'; c.setLineDash([7, 6]); c.lineDashOffset = -t * 30; c.beginPath(); c.arc(x, y, o.r || 22, 0, 7); c.stroke(); c.setLineDash([]);
    if (text) tag(c, text, x + (o.dx || 0), y - (o.r || 22) - 26 + (o.dy || 0) + Math.sin(t * 4) * 3, { bg: '#f5b700', color: '#1f2937', w: 700, disp: true, size: o.size || 15 });
  }
  function button(st, c, x, y, w, h, text, onClick, o) { // canvas button (a real control inside the scene)
    o = o || {}; const hov = st.hover && st.hover.id === o.id; const dis = o.disabled;
    c.fillStyle = dis ? '#94a3b8' : (o.color || '#0891b2'); if (hov && !dis) c.fillStyle = mix(o.color || '#0891b2', '#000000', .15);
    shadow(c, x + w / 2, y + h, w * .5, 5, .25); rr(c, x, y, w, h, h / 2); c.fill();
    c.fillStyle = '#fff'; c.font = `700 ${o.size || 15}px ${DISP}`; c.textAlign = 'center'; c.direction = 'rtl'; c.fillText(text, x + w / 2, y + h / 2 + 1); c.textAlign = 'left'; c.direction = 'ltr';
    if (!dis) st.hit({ id: o.id || text, x, y, w, h, click: onClick, hold: o.hold });
  }

  /* ---------- graphs ---------- */
  function graph(c, x, y, w, h, o) { // o: {xmax,ymax,xlab,ylab,series:[{pts:[[x,y]],col}], xstep,ystep}
    c.fillStyle = 'rgba(255,255,255,.95)'; rr(c, x, y, w, h, 10); c.fill(); c.strokeStyle = '#cbd5e1'; c.lineWidth = 1; c.stroke();
    const L = x + 44, B = y + h - 30, R = x + w - 12, T = y + 26, sx = (R - L) / o.xmax, ymin = o.ymin || 0, sy = (B - T) / (o.ymax - ymin);
    c.strokeStyle = '#e2e8f0'; c.fillStyle = '#64748b'; c.font = `600 11px ${MONO}`; c.textAlign = 'center';
    for (let v = 0; v <= o.xmax + 1e-9; v += o.xstep) { const X = L + v * sx; c.beginPath(); c.moveTo(X, T); c.lineTo(X, B); c.stroke(); c.fillText(+v.toFixed(2), X, B + 12); }
    c.textAlign = 'right'; for (let v = ymin; v <= o.ymax + 1e-9; v += o.ystep) { const Y = B - (v - ymin) * sy; c.beginPath(); c.moveTo(L, Y); c.lineTo(R, Y); c.stroke(); c.fillText(+v.toFixed(2), L - 5, Y); }
    c.strokeStyle = '#334155'; c.lineWidth = 2; c.beginPath(); c.moveTo(L, T - 6); c.lineTo(L, B); c.lineTo(R + 4, B); c.stroke();
    c.fillStyle = '#334155'; c.font = `600 12px ${AR}`; c.direction = 'rtl'; c.textAlign = 'right'; c.fillText(o.ylab || '', L + 120, y + 12); c.textAlign = 'left'; c.fillText(o.xlab || '', R - 70, y + h - 9); c.direction = 'ltr';
    (o.series || []).forEach(s => { if (!s.pts.length) return; c.strokeStyle = s.col; c.lineWidth = s.w || 3; c.beginPath(); s.pts.forEach((p, i) => { const X = L + p[0] * sx, Y = B - (clamp(p[1], ymin, o.ymax) - ymin) * sy; i ? c.lineTo(X, Y) : c.moveTo(X, Y); }); c.stroke();
      const lp = s.pts[s.pts.length - 1]; c.fillStyle = s.col; c.beginPath(); c.arc(L + lp[0] * sx, B - (clamp(lp[1], ymin, o.ymax) - ymin) * sy, 4.5, 0, 7); c.fill(); });
    return { L, B, R, T, sx, sy };
  }

  /* ---------- physics props ---------- */
  function ball(c, x, y, r, type, rot) {
    shadow(c, x, y + r + 2, r * 1.05, r * .22, .35);
    c.save(); c.translate(x, y);
    const base = type === 'tennis' ? '#d9f05a' : type === 'baseball' ? '#f8f6ef' : type === 'steel' ? '#c7ced6' : type === 'red' ? '#dc2626' : type === 'blue' ? '#2563eb' : '#f8fafc';
    c.fillStyle = rg(c, -r * .35, -r * .4, r * .1, r * 1.15, [[0, mix(base, '#ffffff', .65)], [.55, base], [1, mix(base, '#000000', .45)]]); c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill();
    c.save(); c.beginPath(); c.arc(0, 0, r, 0, 7); c.clip(); c.rotate(rot || 0);
    if (type === 'baseball') { c.strokeStyle = '#c0262d'; c.lineWidth = Math.max(1.5, r * .07); for (const sgn of [-1, 1]) { c.beginPath(); c.arc(sgn * r * 1.25, 0, r * .85, Math.PI - .9, Math.PI + .9); if (sgn < 0) { c.beginPath(); c.arc(-r * 1.25, 0, r * .85, -.9, .9); } c.stroke();
        for (let k = -4; k <= 4; k++) { const a = (sgn < 0 ? 0 : Math.PI) + k * .2, cx = sgn * r * 1.25 + Math.cos(a) * r * .85 * (sgn < 0 ? 1 : 1), cy = Math.sin(a) * r * .85; c.beginPath(); c.moveTo(cx - 3 * sgn, cy - 2); c.lineTo(cx + 3 * sgn, cy + 2); c.stroke(); } } }
    else if (type === 'tennis') { c.strokeStyle = 'rgba(255,255,255,.95)'; c.lineWidth = Math.max(2, r * .1); c.beginPath(); c.arc(-r * 1.15, 0, r * .8, -.95, .95); c.stroke(); c.beginPath(); c.arc(r * 1.15, 0, r * .8, Math.PI - .95, Math.PI + .95); c.stroke(); }
    else if (type === 'steel' || type === 'red' || type === 'blue') { c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(-r, -r * .08, r * 2, r * .16); }
    c.restore();
    c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(-r * .38, -r * .45, r * .26, r * .16, -.6, 0, 7); c.fill();
    c.restore();
  }
  function wheel(c, x, y, r, rot, o) { o = o || {}; c.fillStyle = '#111827'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.fillStyle = lg(c, x - r, y - r, x + r, y + r, [[0, '#e5e7eb'], [1, '#6b7280']]); c.beginPath(); c.arc(x, y, r * .58, 0, 7); c.fill();
    c.strokeStyle = '#4b5563'; c.lineWidth = Math.max(1.5, r * .1); for (let k = 0; k < (o.spokes || 5); k++) { const a = rot + k / (o.spokes || 5) * Math.PI * 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * r * .55, y + Math.sin(a) * r * .55); c.stroke(); } c.fillStyle = '#374151'; c.beginPath(); c.arc(x, y, r * .16, 0, 7); c.fill(); }
  function car(c, x, y, w, o) { // x = rear-left, y = ground; facing right
    o = o || {}; const h = w * .32, col = o.color || '#1d4ed8', rot = o.rot || 0, cr = o.crush || 0; const fw = w * (1 - cr * .18);
    shadow(c, x + fw / 2, y + 2, fw * .55, 7, .35);
    c.save(); c.translate(x, y);
    const body = () => { c.beginPath(); c.moveTo(0, -h * .28); c.lineTo(fw * .02, -h * .62); c.quadraticCurveTo(fw * .05, -h * .72, fw * .14, -h * .72); c.lineTo(fw * .3, -h * .74); c.quadraticCurveTo(fw * .38, -h * 1.12, fw * .5, -h * 1.14); c.lineTo(fw * .66, -h * 1.12); c.quadraticCurveTo(fw * .74, -h * 1.08, fw * .8, -h * .74); c.lineTo(fw * .96, -h * .66); c.quadraticCurveTo(fw, -h * .6, fw, -h * .42); c.lineTo(fw, -h * .2); c.quadraticCurveTo(fw, -h * .1, fw * .95, -h * .1); c.lineTo(fw * .05, -h * .1); c.quadraticCurveTo(0, -h * .1, 0, -h * .28); c.closePath(); };
    body(); c.fillStyle = lg(c, 0, -h * 1.14, 0, 0, [[0, mix(col, '#ffffff', .35)], [.45, col], [1, mix(col, '#000000', .45)]]); c.fill();
    c.fillStyle = 'rgba(190,225,250,.9)'; c.beginPath(); c.moveTo(fw * .34, -h * .76); c.quadraticCurveTo(fw * .4, -h * 1.04, fw * .5, -h * 1.06); c.lineTo(fw * .56, -h * 1.06); c.lineTo(fw * .56, -h * .76); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(fw * .59, -h * .76); c.lineTo(fw * .59, -h * 1.06); c.lineTo(fw * .65, -h * 1.05); c.quadraticCurveTo(fw * .71, -h * 1.0, fw * .76, -h * .76); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(fw * .06, -h * .62, fw * .86, 3);
    c.fillStyle = '#fde68a'; rr(c, fw * .955, -h * .58, fw * .04, h * .12, 3); c.fill(); c.fillStyle = '#ef4444'; rr(c, 0, -h * .56, fw * .025, h * .12, 2); c.fill();
    if (o.inside) o.inside(c, fw, h);
    c.restore();
    wheel(c, x + fw * .2, y - h * .13, h * .3, rot); wheel(c, x + fw * .78, y - h * .13, h * .3, rot);
    return { fw, h };
  }
  function person(c, x, y, h, ph, o) { // side view, facing dir (1 right, -1 left); ph = walk phase
    o = o || {}; const d = o.dir || 1, sw = Math.sin(ph) * (o.run ? .9 : .55), col = o.color || '#2563eb', skin = o.skin || '#e0ac69';
    const hip = [x, y - h * .48], sh = [x + d * h * (o.run ? .05 : .01), y - h * .8];
    shadow(c, x, y + 2, h * .18, 4, .3);
    const limb = (p, a1, a2, l1, l2, w, cl) => { const k = [p[0] + Math.sin(a1) * l1 * d, p[1] + Math.cos(a1) * l1], e = [k[0] + Math.sin(a1 + a2) * l2 * d, k[1] + Math.cos(a1 + a2) * l2]; c.strokeStyle = cl; c.lineWidth = w; c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(k[0], k[1]); c.lineTo(e[0], e[1]); c.stroke(); return e; };
    const legL = h * .25, armL = h * .17;
    const f1 = limb(hip, -sw, Math.max(0, sw) * .9, legL, legL, h * .07, '#1e293b');
    limb(sh, sw * .9, -.5 - Math.max(0, -sw) * .4, armL, armL, h * .05, mix(col, '#000000', .25));
    c.strokeStyle = col; c.lineWidth = h * .14; c.beginPath(); c.moveTo(hip[0], hip[1] - h * .02); c.lineTo(sh[0], sh[1]); c.stroke();
    const f2 = limb(hip, sw, Math.max(0, -sw) * .9, legL, legL, h * .07, '#334155');
    [f1, f2].forEach(f => { c.fillStyle = '#111827'; rr(c, f[0] - (d < 0 ? h * .07 : 0), f[1] - h * .02, h * .08, h * .035, 2); c.fill(); });
    limb(sh, -sw * .9, -.5 - Math.max(0, sw) * .4, armL, armL, h * .055, col);
    c.fillStyle = skin; c.beginPath(); c.arc(sh[0] + d * h * .02, sh[1] - h * .11, h * .085, 0, 7); c.fill();
    c.fillStyle = o.hair || '#1f2937'; c.beginPath(); c.arc(sh[0] + d * h * .01, sh[1] - h * .14, h * .08, Math.PI * (d > 0 ? .95 : -.05), Math.PI * (d > 0 ? 2.15 : 1.15)); c.fill();
  }
  function floor(c, st, y, o) { // indoor corridor floor with tiles in perspective-ish stripes
    o = o || {}; c.fillStyle = lg(c, 0, st.y0, 0, y, [[0, o.w0 || '#eef2f6'], [1, o.w1 || '#dde5ec']]); c.fillRect(st.x0, st.y0, st.x1 - st.x0, y - st.y0);
    c.fillStyle = o.skirt || '#94a3b8'; c.fillRect(st.x0, y - 10, st.x1 - st.x0, 10);
    c.fillStyle = lg(c, 0, y, 0, st.y1, [[0, o.f0 || '#c8b08e'], [1, o.f1 || '#a88d68']]); c.fillRect(st.x0, y, st.x1 - st.x0, st.y1 - y);
    c.strokeStyle = 'rgba(80,55,30,.22)'; c.lineWidth = 1.5; for (let x = Math.floor(st.x0 / 80) * 80; x < st.x1; x += 80) { c.beginPath(); c.moveTo(x, y); c.lineTo(x + (x - st.W / 2) * .25, st.y1); c.stroke(); }
    for (let k = 1; k < 5; k++) { const yy = y + (st.y1 - y) * (k * k) / 25; c.beginPath(); c.moveTo(st.x0, yy); c.lineTo(st.x1, yy); c.stroke(); }
  }
  function arrow(c, x1, y1, x2, y2, col, w) { const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1); if (L < 2) return; w = w || 4; c.strokeStyle = col; c.fillStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2 - Math.cos(a) * w * 2.2, y2 - Math.sin(a) * w * 2.2); c.stroke(); c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 - Math.cos(a - .45) * w * 3.6, y2 - Math.sin(a - .45) * w * 3.6); c.lineTo(x2 - Math.cos(a + .45) * w * 3.6, y2 - Math.sin(a + .45) * w * 3.6); c.closePath(); c.fill(); }
  function txt(c, s, x, y, o) { o = o || {}; c.font = `${o.w || 600} ${o.size || 14}px ${o.mono ? MONO : o.disp ? DISP : AR}`; c.fillStyle = o.color || '#0f172a'; c.textAlign = o.align || 'center'; c.direction = o.mono ? 'ltr' : 'rtl'; c.fillText(s, x, y); c.textAlign = 'left'; c.direction = 'ltr'; }

  return { AR, DISP, MONO, clamp, lerp, ease, mix, rgba, rr, lg, rg, noise, stage, room, bench, shadow, testTube, beaker, cylinder, rack, flame, burner, hotplate, stand, lcd, balance, thermometer, probe, clock, gauge, parts, tag, hint, button, graph, ball, wheel, car, person, floor, arrow, txt };
})();

/* ---------- side-panel helpers shared by labs ---------- */
function labShell(body, opts) { // returns {stageHost, panel}
  body.className = 'body lab-split ' + (opts && opts.cls || 'cols-2-1');
  body.innerHTML = `<div class="card fxstage" style="padding:.3em;display:flex;flex-direction:column;min-height:0;background:#0f172a"><div class="fxhost" style="flex:1;min-height:0;position:relative"></div></div><div class="card fxpanel" style="display:flex;flex-direction:column;gap:.4em"></div>`;
  return { host: body.querySelector('.fxhost'), panel: body.querySelector('.fxpanel') };
}
function stepsList(el, items) { // procedure checklist that ticks
  el.insertAdjacentHTML('beforeend', `<ol class="fxsteps">${items.map((s, i) => `<li data-i="${i}">${s}</li>`).join('')}</ol>`);
  const ol = el.querySelector('.fxsteps:last-of-type');
  return { set(n) { ol.querySelectorAll('li').forEach((li, i) => { li.classList.toggle('ok', i < n); li.classList.toggle('now', i === n); }); } };
}

/* ===== Virtual labs — Chapter 9: Motion & momentum (realistic canvas labs, labfx.js) ===== */
function _fb9(el, ok, msg) { const keep = [...el.classList].filter(c => !['fb', 'show', 'good', 'poor'].includes(c)).join(' '); el.className = 'fb show ' + (ok ? 'good' : 'poor') + ' ' + keep; el.innerHTML = msg; beep(ok); }
const r2 = x => Math.round(x * 100) / 100;
const _R9 = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const fmtv = v => (v >= 0 ? '→ ' : '← ') + Math.abs(r2(v)) + ' م/ث';

/* ---------- LAB 1: motion after collision (launch lab p77) ---------- */
function labCollide(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>⚾ الحركة بعد التصادم</h3>
    <div class="seg"><button class="btn alt ps" data-p="0">الخطوة 1: بيسبول بطيئة ↔ بيسبول سريعة</button><button class="btn alt ps" data-p="1">الخطوة 2: بيسبول بطيئة ↔ تنس سريعة</button><button class="btn alt ps" data-p="2">الخطوة 3: تنس ↔ تنس بالسرعة نفسها</button></div>
    <div class="row" style="gap:.3em;font-size:.88em"><b>كرتك (يمين):</b><select class="b1"><option value="0.145">بيسبول 145 جم</option><option value="0.058">تنس 58 جم</option></select><select class="s1"><option value="1">بطيئة 1 م/ث</option><option value="3">سريعة 3 م/ث</option></select></div>
    <div class="row" style="gap:.3em;font-size:.88em"><b>كرة زميلك (يسار):</b><select class="b2"><option value="0.145">بيسبول 145 جم</option><option value="0.058">تنس 58 جم</option></select><select class="s2"><option value="3">سريعة 3 م/ث</option><option value="1">بطيئة 1 م/ث</option></select></div>
    <div class="mini"><button class="btn go">▶ دحرج الكرتين</button><button class="btn alt rs">↺ إعادة</button><label class="row" style="gap:.2em;font-size:.82em"><input type="checkbox" class="strobe" checked> صورة متعاقبة (ستروب)</label></div>
    <table class="data"><thead><tr><th>الكرة</th><th>ع قبل</th><th>ع بعد</th><th>الزخم قبل</th><th>الزخم بعد</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="rv" data-a="الكرة الأسرع تدفع الأبطأ وتغيّر حركتها؛ والكرة الأكبر كتلة (البيسبول) تتأثر أقل من كرة التنس؛ والكرتان المتماثلتان بالسرعة نفسها ترتدّان بالسرعة نفسها. النتيجة تعتمد على الكتلة والسرعة معًا: أي الزخم.">التفكير الناقد: صِف كيف تغيّرت حركة الكرتين بعد التصادم، وتأثير السرعة ونوع الكرة.</div>`;
  const PRE = [[.145, 1, .145, 3], [.145, 1, .058, 3], [.058, 3, .058, 3]];
  const PX = 70, FY = 330;
  let A, B, run = false, hit = false, ghosts = [], gt = 0;
  const q = s => body.querySelector(s);
  function setup() { const m1 = +q('.b1').value, v1 = +q('.s1').value, m2 = +q('.b2').value, v2 = +q('.s2').value;
    A = { x: 640, m: m1, v: -v1, u: -v1, r: m1 > .1 ? 38 : 32, type: m1 > .1 ? 'baseball' : 'tennis', rot: 0, name: 'كرتك' }; B = { x: 120, m: m2, v: v2, u: v2, r: m2 > .1 ? 38 : 32, type: m2 > .1 ? 'baseball' : 'tennis', rot: 0, name: 'كرة زميلك' }; hit = false; ghosts = []; gt = 0; run = false; }
  function draw(c, s) {
    FX.floor(c, s, 250, { f0: '#d6b98d', f1: '#b08d5f' });
    c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(s.x0, FY + 34, s.x1 - s.x0, 3);
    for (let m = 0; m <= 10; m++) { const x = 30 + m * PX; c.fillStyle = '#334155'; c.fillRect(x - 1, FY + 30, 2, 12); FX.txt(c, m + ' م', x, FY + 52, { size: 11, color: '#1f2937' }); }
    if (run) { const dt = s.dt; [A, B].forEach(b => { b.x += b.v * PX * dt; b.rot += b.v * PX * dt / b.r; });
      if (!hit && A.x - B.x < A.r + B.r) { hit = true; const m1 = A.m, m2 = B.m, u1 = A.v, u2 = B.v; A.v = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2); B.v = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2); beep(true); table(); P.add({ k: 'ring', x: (A.x + B.x) / 2, y: FY, r: 10, grow: 50, life: .5, rgb: '250,204,21' }); P.add({ k: 'text', x: (A.x + B.x) / 2, y: FY - 70, text: 'تصادم!', life: 1, size: 22, rgb: '220,38,38' }); }
      gt += dt; if (q('.strobe').checked && gt > .5) { gt = 0; ghosts.push([A.x, A.rot, A.r, A.type], [B.x, B.rot, B.r, B.type]); }
      if ([A, B].every(b => b.x < -40 || b.x > 800) || (hit && [A, B].some(b => b.x < -60 || b.x > 820) && Math.abs(A.v) + Math.abs(B.v) < .01)) run = false;
      if ([A, B].every(b => b.x < -40 || b.x > 800)) run = false; }
    ghosts.forEach(g => { c.globalAlpha = .18; FX.ball(c, g[0], FY - g[2] + 26, g[2], g[3], g[1]); c.globalAlpha = 1; });
    [A, B].forEach(b => { const y = FY - b.r + 26; FX.ball(c, b.x, y, b.r, b.type, b.rot);
      if (Math.abs(b.v) > .01) FX.arrow(c, b.x, y - b.r - 22, b.x + b.v * 30, y - b.r - 22, b === A ? '#dc2626' : '#2563eb', 4);
      FX.tag(c, b.name + ': ' + fmtv(b.v), b.x, y - b.r - 48, { size: 13, bg: b === A ? 'rgba(220,38,38,.9)' : 'rgba(37,99,235,.9)' }); });
    P.step(s.dt); P.draw(c);
    if (!run && !hit) FX.hint(c, 380, 190, s.t, 'اختر الخطوة ثم اضغط «دحرج الكرتين»', { r: 1 });
  }
  const P = FX.parts();
  function table() { q('.tb').innerHTML = [[A.name, A], [B.name, B]].map(([n, b]) => `<tr><td>${n} (${Math.round(b.m * 1000)} جم)</td><td class="ltr">${r2(b.u)}</td><td class="ltr"><b>${r2(b.v)}</b></td><td class="ltr">${r2(b.m * b.u)}</td><td class="ltr">${r2(b.m * b.v)}</td></tr>`).join('') + `<tr><td colspan="3">الزخم الكلي (كجم.م/ث)</td><td class="ltr">${r2(A.m * A.u + B.m * B.u)}</td><td class="ltr"><b>${r2(A.m * A.v + B.m * B.v)}</b></td></tr>`; }
  body.querySelectorAll('.ps').forEach(b => b.onclick = () => { const p = PRE[b.dataset.p]; q('.b1').value = String(p[0]); q('.s1').value = String(p[1]); q('.b2').value = String(p[2]); q('.s2').value = String(p[3]); body.querySelectorAll('.ps').forEach(x => x.classList.toggle('alt', x !== b)); setup(); q('.tb').innerHTML = ''; });
  ['.b1', '.s1', '.b2', '.s2'].forEach(sel => q(sel).onchange = () => setup());
  q('.go').onclick = () => { setup(); run = true; };
  q('.rs').onclick = () => { setup(); q('.tb').innerHTML = ''; };
  setup(); FX.stage(host, 760, 300, draw, { vy: 120 });
}

/* ---------- LAB 2: distance vs displacement in the park (Fig. 3) ---------- */
function labPark(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🚶 المسافة والإزاحة</h3>
    <div class="seg"><b style="font-size:.88em">مسارات الشكل 3:</b><button class="btn alt pr" data-p="0">40 م غربًا</button><button class="btn alt pr" data-p="1">40 م غربًا ثم 30 م شمالًا</button><button class="btn alt pr" data-p="2">دورة كاملة</button></div>
    <div class="seg"><b style="font-size:.88em">تحرّك بنفسك (10 م):</b><button class="btn mv" data-d="N">↑ شمال</button><button class="btn mv" data-d="S">↓ جنوب</button><button class="btn mv" data-d="E">→ شرق</button><button class="btn mv" data-d="W">← غرب</button><button class="btn alt rs">↺</button></div>
    <div class="fxro"><div>المسافة<b class="ds">0 م</b></div><div>الإزاحة<b class="dp" style="font-family:inherit;font-size:1.05em">صفر</b></div></div>
    <div class="q" style="margin:0">تحدي النحلة (اختبر نفسك 3): 25 م شمالًا ← 10 م شرقًا ← 5 م غربًا ← 10 م جنوبًا.</div>
    <div class="mini"><button class="btn orange bee">🐝 شغّل مسار النحلة</button></div>
    <div class="fb msg"></div>
    <div class="muted" style="font-size:.82em">الخط الأحمر: المسار الفعلي (المسافة). السهم الأزرق المتقطع: الإزاحة من نقطة البداية إلى النهاية واتجاهها.</div>`;
  const S = 9, OX = 100, OY = 60; // park 40x30 m
  let mode = 'park', way = [[40, 0]], pos = [40, 0], seg = 0, segT = 0, dist = 0, trail = [], walkPh = 0, done = null;
  const dir = (dx, dy) => { if (Math.abs(dx) < 1e-9 && Math.abs(dy) < 1e-9) return ''; const a = Math.atan2(dy, dx) * 180 / Math.PI; const names = [[0, 'شرقًا'], [45, 'شمال شرق'], [90, 'شمالًا'], [135, 'شمال غرب'], [180, 'غربًا'], [-180, 'غربًا'], [-135, 'جنوب غرب'], [-90, 'جنوبًا'], [-45, 'جنوب شرق']]; return names.reduce((b, n) => Math.abs(n[0] - a) < Math.abs(b[0] - a) ? n : b)[1]; };
  const X = p => mode === 'bee' ? 280 + p[0] * 8 : OX + p[0] * S, Y = p => mode === 'bee' ? 380 - p[1] * 8 : OY + (30 - p[1]) * S;
  function tree(c, x, y, r) { FX.shadow(c, x + r * .4, y + r * .5, r * 1.1, r * .6, .35); c.fillStyle = FX.rg(c, x - r * .3, y - r * .3, r * .1, r * 1.1, [[0, '#4ade80'], [.7, '#15803d'], [1, '#14532d']]); c.beginPath(); for (let k = 0; k < 7; k++) { const a = k / 7 * 6.283; c.arc(x + Math.cos(a) * r * .45, y + Math.sin(a) * r * .45, r * .62, 0, 7); } c.fill(); }
  function walker(c, x, y, ang, ph) { c.save(); c.translate(x, y); c.rotate(ang); FX.shadow(c, 3, 3, 13, 9, .3);
    const sw = Math.sin(ph) * 7; c.fillStyle = '#1e293b'; FX.rr(c, sw - 3, -7, 9, 5, 2); c.fill(); FX.rr(c, -sw - 3, 2, 9, 5, 2); c.fill();
    c.fillStyle = '#2563eb'; c.beginPath(); c.ellipse(0, 0, 7, 12, 0, 0, 7); c.fill(); c.fillStyle = '#e0ac69'; c.beginPath(); c.arc(2, 0, 6, 0, 7); c.fill(); c.fillStyle = '#1f2937'; c.beginPath(); c.arc(0, 0, 5.6, Math.PI * .5, Math.PI * 1.5); c.fill(); c.restore(); }
  function bee(c, x, y, t) { c.save(); c.translate(x, y); c.fillStyle = 'rgba(219,234,254,.75)'; const w = Math.abs(Math.sin(t * 40)) * 9 + 3; c.beginPath(); c.ellipse(-4, -9, 6, w, -.4, 0, 7); c.fill(); c.beginPath(); c.ellipse(4, -9, 6, w, .4, 0, 7); c.fill();
    c.fillStyle = '#facc15'; c.beginPath(); c.ellipse(0, 0, 13, 9, 0, 0, 7); c.fill(); c.fillStyle = '#111827'; [-5, 1, 7].forEach(xx => c.fillRect(xx, -8, 3, 16)); c.beginPath(); c.arc(-13, 0, 5, 0, 7); c.fill(); c.restore(); }
  function draw(c, s) {
    if (mode === 'park') {
      c.fillStyle = '#5b8f3a'; c.fillRect(s.x0, s.y0, s.x1 - s.x0, s.y1 - s.y0);
      for (let i = 0; i < 380; i++) { c.fillStyle = i % 2 ? 'rgba(30,80,20,.25)' : 'rgba(150,200,90,.25)'; c.fillRect(s.x0 + _R9(i) * (s.x1 - s.x0), s.y0 + _R9(i + 500) * (s.y1 - s.y0), 3, 3); }
      c.strokeStyle = '#d6c08f'; c.lineWidth = 22; c.strokeRect(OX, OY, 40 * S, 30 * S); c.strokeStyle = 'rgba(120,90,50,.35)'; c.lineWidth = 1; c.strokeRect(OX - 11, OY - 11, 40 * S + 22, 30 * S + 22); c.strokeRect(OX + 11, OY + 11, 40 * S - 22, 30 * S - 22);
      c.fillStyle = '#6aa246'; c.fillRect(OX + 11, OY + 11, 40 * S - 22, 30 * S - 22);
      const px = OX + 20 * S, py = OY + 15 * S; c.fillStyle = FX.rg(c, px - 20, py - 20, 10, 80, [[0, '#7dd3fc'], [1, '#0369a1']]); c.beginPath(); c.ellipse(px, py, 70, 52, 0, 0, 7); c.fill(); c.strokeStyle = '#e7e5e4'; c.lineWidth = 5; c.stroke();
      for (let k = 0; k < 3; k++) { const ph = (s.t * .4 + k / 3) % 1; c.strokeStyle = `rgba(255,255,255,${.5 * (1 - ph)})`; c.lineWidth = 1.5; c.beginPath(); c.ellipse(px + 15, py - 5, 10 + ph * 40, 6 + ph * 28, 0, 0, 7); c.stroke(); }
      [[OX - 40, OY - 30], [OX + 40 * S + 40, OY - 30], [OX - 40, OY + 30 * S + 30], [OX + 40 * S + 40, OY + 30 * S + 30], [OX + 20 * S - 110, OY + 60], [OX + 20 * S + 120, OY + 30 * S - 60]].forEach(([x, y], i) => tree(c, x, y, 26 + (i % 2) * 6));
      c.fillStyle = '#7c4a1e'; FX.rr(c, OX + 20 * S - 30, OY + 30 * S + 22, 60, 10, 3); c.fill();
      // compass
      c.save(); c.translate(s.x1 - 40, s.y0 + 44); c.fillStyle = 'rgba(15,23,42,.8)'; c.beginPath(); c.arc(0, 0, 26, 0, 7); c.fill(); c.fillStyle = '#ef4444'; c.beginPath(); c.moveTo(0, -20); c.lineTo(6, 0); c.lineTo(-6, 0); c.fill(); c.fillStyle = '#e2e8f0'; c.beginPath(); c.moveTo(0, 20); c.lineTo(6, 0); c.lineTo(-6, 0); c.fill(); c.restore(); FX.txt(c, 'ش', s.x1 - 40, s.y0 + 8, { color: '#fff', size: 13 });
      FX.tag(c, '40 م', OX + 20 * S, OY + 30 * S + 50, { size: 12 }); FX.tag(c, '30 م', OX + 40 * S + 34, OY + 15 * S, { size: 12 });
    } else {
      c.fillStyle = '#86b75a'; c.fillRect(s.x0, s.y0, s.x1 - s.x0, s.y1 - s.y0);
      for (let i = 0; i < 60; i++) { const x = s.x0 + _R9(i) * (s.x1 - s.x0), y = s.y0 + _R9(i + 9) * (s.y1 - s.y0); c.fillStyle = ['#f472b6', '#fde047', '#fff', '#c084fc'][i % 4]; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc(x + Math.cos(k * 1.256) * 4, y + Math.sin(k * 1.256) * 4, 3, 0, 7); c.fill(); } c.fillStyle = '#f59e0b'; c.beginPath(); c.arc(x, y, 2, 0, 7); c.fill(); }
      c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 1; for (let m = -10; m <= 30; m += 5) { c.beginPath(); c.moveTo(X([m, -5]), s.y0); c.lineTo(X([m, -5]), s.y1); c.stroke(); c.beginPath(); c.moveTo(s.x0, Y([0, m])); c.lineTo(s.x1, Y([0, m])); c.stroke(); }
      c.fillStyle = FX.lg(c, 0, 360, 0, 400, [[0, '#fbbf24'], [1, '#b45309']]); FX.rr(c, 262, 362, 36, 36, 6); c.fill(); c.fillStyle = '#78350f'; c.beginPath(); c.arc(280, 386, 5, 0, 7); c.fill(); FX.tag(c, 'الخلية', 280, 412, { size: 12 });
      FX.txt(c, 'كل مربع = 5 م', s.x0 + 70, s.y0 + 20, { color: '#fff', size: 13 });
    }
    // animate along waypoints
    if (seg < way.length - 1) { const a = way[seg], b = way[seg + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]); segT += s.dt * 14 / Math.max(1, L); walkPh += s.dt * 12;
      const k = Math.min(1, segT); const prev = pos.slice(); pos = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; dist += Math.hypot(pos[0] - prev[0], pos[1] - prev[1]);
      if (Math.random() < .5) trail.push([pos[0], pos[1], Math.atan2(-(b[1] - a[1]), b[0] - a[0])]);
      if (k >= 1) { seg++; segT = 0; if (seg >= way.length - 1 && done) { done(); done = null; } } }
    // travelled path
    c.strokeStyle = '#dc2626'; c.lineWidth = 6; c.beginPath(); c.moveTo(X(way[0]), Y(way[0])); for (let i = 1; i <= seg && i < way.length; i++) c.lineTo(X(way[i]), Y(way[i])); c.lineTo(X(pos), Y(pos)); c.stroke();
    const st0 = way[0], dx = pos[0] - st0[0], dy = pos[1] - st0[1], m = Math.hypot(dx, dy);
    if (m > .5) { c.setLineDash([12, 8]); FX.arrow(c, X(st0), Y(st0), X(pos), Y(pos), '#1d4ed8', 5); c.setLineDash([]); }
    c.fillStyle = '#16a34a'; c.beginPath(); c.arc(X(st0), Y(st0), 10, 0, 7); c.fill(); FX.tag(c, 'البداية', X(st0), Y(st0) + 24, { size: 12, bg: '#15803d' });
    const a = seg < way.length - 1 ? Math.atan2(-(way[seg + 1][1] - way[seg][1]), way[seg + 1][0] - way[seg][0]) : 0;
    if (mode === 'bee') bee(c, X(pos), Y(pos), s.t); else walker(c, X(pos), Y(pos), a, walkPh);
    body.querySelector('.ds').textContent = r2(dist) + ' م'; body.querySelector('.dp').textContent = m < .05 ? 'صفر م' : r2(m) + ' م ' + dir(dx, dy);
    if (way.length === 1) FX.hint(c, X(pos), Y(pos), s.t, 'اختر مسارًا أو تحرّك بالأزرار', { r: 20 });
  }
  function go(points, m, cb) { mode = m || 'park'; way = points.map(p => p.slice()); pos = way[0].slice(); seg = 0; segT = 0; dist = 0; trail = []; done = cb || null; body.querySelector('.msg').className = 'fb msg'; }
  const PR = [[[40, 0], [0, 0]], [[40, 0], [0, 0], [0, 30]], [[40, 0], [0, 0], [0, 30], [40, 30], [40, 0]]];
  body.querySelectorAll('.pr').forEach(b => b.onclick = () => go(PR[b.dataset.p]));
  body.querySelectorAll('.mv').forEach(b => b.onclick = () => { if (mode === 'bee') go([[40, 0]]); if (seg < way.length - 1) return; const l = way[way.length - 1], D = { N: [0, 10], S: [0, -10], E: [10, 0], W: [-10, 0] }[b.dataset.d]; const nx = [FX.clamp(l[0] + D[0], -10, 50), FX.clamp(l[1] + D[1], -5, 35)]; if (nx[0] === l[0] && nx[1] === l[1]) return; way.push(nx); });
  body.querySelector('.rs').onclick = () => go([[40, 0]]);
  body.querySelector('.bee').onclick = () => go([[0, 0], [0, 25], [10, 25], [5, 25], [5, 15]], 'bee', () => _fb9(body.querySelector('.msg'), true, 'المسافة = 25 + 10 + 5 + 10 = <b>50 م</b>، أما الإزاحة: 15 م شمالًا و5 م شرقًا ≈ <b>15.8 م شمال شرق</b> الخلية.'));
  FX.stage(host, 560, 420, draw);
}

/* ---------- LAB 3: distance–time graph (Fig. 6) ---------- */
function labDTGraph(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>📈 منحنى المسافة – الزمن</h3>
    <label class="rng">سرعة الطالب (أ) <input type="range" class="va" min="0.25" max="2" step="0.25" value="1"><b class="vav">1</b> م/ث</label>
    <label class="rng">سرعة الطالب (ب) <input type="range" class="vb" min="0.25" max="2" step="0.25" value="0.5"><b class="vbv">0.5</b> م/ث</label>
    <label class="rng"><input type="checkbox" class="stop" style="flex:none"> الطالب (ب) يقف ثانية واحدة في المنتصف</label>
    <div class="mini"><button class="btn go">▶ ابدأ (2.5 ث)</button><button class="btn alt rs">↺</button></div>
    <div class="q" style="margin:0">أي الطالبين متوسط سرعته أكبر؟</div><div class="mini"><button class="btn alt an" data-v="a">الطالب (أ)</button><button class="btn alt an" data-v="b">الطالب (ب)</button><button class="btn alt an" data-v="s">متساويان</button></div>
    <div class="fb msg"></div>
    <div class="muted" style="font-size:.82em">كلما زاد ميل الخط زادت السرعة، والخط الأفقي يعني أن الجسم لم يغيّر موضعه (سرعته صفر).</div>`;
  let t = 0, run = false;
  const q = s => body.querySelector(s), va = () => +q('.va').value, vb = () => +q('.vb').value;
  const xb = tt => { if (!q('.stop').checked) return vb() * tt; return tt < .75 ? vb() * tt : tt < 1.75 ? vb() * .75 : vb() * (tt - 1); };
  const vbNow = tt => q('.stop').checked && tt >= .75 && tt < 1.75 ? 0 : vb();
  function draw(c, s) {
    const top = 0, fy = 205; FX.floor(c, { ...s, y1: 225 }, 120, {}); c.fillStyle = '#e2e8f0'; c.fillRect(s.x0, 225, s.x1 - s.x0, s.y1 - 225);
    const sx = 130, L = 60; for (let m = 0; m <= 5; m++) { c.fillStyle = '#1e293b'; c.fillRect(L + m * sx - 2, 205, 4, 16); FX.txt(c, m + ' م', L + m * sx, 214 - 22, { size: 12, color: '#0f172a', w: 700 }); }
    c.fillStyle = 'rgba(37,99,235,.15)'; c.fillRect(L, 150, 5 * sx, 4); c.fillRect(L, 200, 5 * sx, 4);
    if (run) { t = Math.min(2.5, t + s.dt * .8); if (t >= 2.5) run = false; }
    const xa = Math.min(5, va() * t), xB = Math.min(5, xb(t));
    FX.person(c, L + xa * sx, 152, 92, xa * 4.2, { color: '#dc2626' }); FX.tag(c, 'أ', L + xa * sx, 44, { bg: '#dc2626', size: 14 });
    FX.person(c, L + xB * sx, 202, 92, xB * 4.2, { color: '#ca8a04' }); FX.tag(c, 'ب', L + xB * sx + 26, 96, { bg: '#ca8a04', size: 14 });
    FX.tag(c, 't = ' + t.toFixed(2) + ' s', s.x1 - 70, 30, { size: 14, bg: 'rgba(15,23,42,.85)' });
    const pa = [], pb = []; for (let tt = 0; tt <= t + 1e-9; tt += .02) { pa.push([tt, Math.min(5, va() * tt)]); pb.push([tt, Math.min(5, xb(tt))]); }
    FX.graph(c, 20, 236, 720, 270, { xmax: 2.5, ymax: 5, xstep: .5, ystep: 1, xlab: 'الزمن (ث)', ylab: 'المسافة (م)', series: [{ pts: pa, col: '#dc2626' }, { pts: pb, col: '#ca8a04' }] });
    if (!run && t === 0) FX.hint(c, 380, 360, s.t, 'اضغط «ابدأ» وراقب رسم المنحنى', { r: 1 });
  }
  function reset() { t = 0; run = false; q('.vav').textContent = va(); q('.vbv').textContent = vb(); q('.msg').className = 'fb msg'; }
  ['.va', '.vb', '.stop'].forEach(sel => q(sel).addEventListener('input', reset));
  q('.go').onclick = () => { t = 0; run = true; };
  q('.rs').onclick = reset;
  body.querySelectorAll('.an').forEach(b => b.onclick = () => { const A = va(), B = xb(2.5) / 2.5, right = Math.abs(A - B) < 1e-6 ? 's' : A > B ? 'a' : 'b'; _fb9(q('.msg'), b.dataset.v === right, `متوسط سرعة (أ) = ${r2(A * 2.5)} ÷ 2.5 = <b>${r2(A)} م/ث</b>، ومتوسط سرعة (ب) = ${r2(xb(2.5))} ÷ 2.5 = <b>${r2(B)} م/ث</b>. ` + (right === 's' ? 'متساويان.' : 'الأسرع خطه أشد ميلًا.')); });
  reset(); FX.stage(host, 760, 520, draw);
}

/* ---------- LAB 4: measuring average speed (home experiment p83) ---------- */
function labAvgSpeed(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>⏱ قياس السرعة المتوسطة</h3>
    <div class="muted" style="font-size:.86em">علامتان بشريط لاصق بين بابين، والمسافة بينهما <b>5 م</b>. اضغط ساعة الإيقاف عندما يمرّ زميلك بالعلامة الأولى، ثم مرة أخرى عند الثانية.</div>
    <div class="seg"><button class="btn mode" data-m="slow">🐢 سير بطيء</button><button class="btn alt mode" data-m="fast">🏃 سير سريع</button><button class="btn alt mode" data-m="mix">🔀 بطيء ثم سريع ثم بطيء</button></div>
    <div class="mini"><button class="btn orange walk">▶ ابدأ السير</button><button class="btn navy tap">⏱ ابدأ/أوقف الساعة</button></div>
    <table class="data"><thead><tr><th>الحالة</th><th>المسافة</th><th>الزمن</th><th>السرعة المتوسطة</th><th>زمن 100 م</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="muted" style="font-size:.82em">السرعة المتوسطة = المسافة الكلية ÷ الزمن الكلي. في الحالة المختلطة تتغير السرعة اللحظية لكننا نحسب متوسطها.</div>`;
  const PXM = 76, M1 = 190, M2 = 190 + 5 * PXM, FY = 330;
  let m = 'slow', x = 60, run = false, ph = 0, sw = 0, swOn = false, flash = [0, 0];
  const P = FX.parts();
  const v = px => m === 'slow' ? .8 : m === 'fast' ? 1.8 : (px > M1 + 1.5 * PXM && px < M1 + 3.5 * PXM ? 2 : .7);
  function door(c, x) { c.fillStyle = '#e5e7eb'; c.fillRect(x - 46, 70, 92, FY - 70); c.fillStyle = FX.lg(c, x - 40, 0, x + 40, 0, [[0, '#8b5a2b'], [.5, '#b07a45'], [1, '#7a4b22']]); c.fillRect(x - 38, 80, 76, FY - 80); c.strokeStyle = 'rgba(60,35,15,.4)'; c.lineWidth = 2; c.strokeRect(x - 28, 96, 56, 90); c.strokeRect(x - 28, 200, 56, 110); c.fillStyle = '#facc15'; c.beginPath(); c.arc(x + 26, 210, 5, 0, 7); c.fill(); }
  function draw(c, s) {
    FX.floor(c, s, FY, { w0: '#f1f5f9', w1: '#e2e8f0' });
    door(c, 40); door(c, 720);
    [M1, M2].forEach((mx, i) => { c.fillStyle = '#2563eb'; c.fillRect(mx - 5, FY + 2, 10, 70); if (s.t - flash[i] < .4) { c.fillStyle = 'rgba(250,204,21,.6)'; c.fillRect(mx - 14, FY - 160, 28, 230); } FX.tag(c, i ? 'العلامة 2' : 'العلامة 1', mx, FY + 84, { size: 12, bg: '#1d4ed8' }); });
    FX.arrow(c, M1 + 10, FY + 50, M2 - 10, FY + 50, '#1e3a8a', 2); FX.arrow(c, M2 - 10, FY + 50, M1 + 10, FY + 50, '#1e3a8a', 2); FX.tag(c, '5 م', (M1 + M2) / 2, FY + 50, { size: 13, bg: '#fff', color: '#1e3a8a' });
    if (run) { const px0 = x; x += v(x) * PXM * s.dt; ph += v(x) * s.dt * 5.5; if (px0 < M1 && x >= M1) flash[0] = s.t; if (px0 < M2 && x >= M2) flash[1] = s.t; if (x > 700) run = false; }
    if (swOn) sw += s.dt;
    FX.person(c, x, FY + 8, 150, ph, { color: '#16a34a', run: m === 'fast' });
    FX.clock(c, 380, 120, 58, sw, { text: sw.toFixed(2) });
    s.hit({ id: 'sw', x: 380, y: 120, r: 66, click: tap });
    FX.txt(c, swOn ? 'اضغط للإيقاف' : 'اضغط للتشغيل', 380, 205, { size: 13, color: '#0f172a', w: 700 });
    P.step(s.dt); P.draw(c);
    if (!run && x <= 60) FX.hint(c, 380, 240, s.t, 'اضغط «ابدأ السير»', { r: 1 });
  }
  function tap() { if (!swOn) { swOn = true; sw = 0; beep(true); } else { swOn = false; const tt = sw; if (tt < .3) return; const sp = 5 / tt, nm = { slow: 'بطيء', fast: 'سريع', mix: 'مختلط' }[m];
    body.querySelector('.tb').insertAdjacentHTML('beforeend', `<tr><td>${nm}</td><td>5 م</td><td>${tt.toFixed(2)} ث</td><td><b>${sp.toFixed(2)} م/ث</b></td><td>${(100 / sp).toFixed(0)} ث</td></tr>`); beep(true); } }
  body.querySelectorAll('.mode').forEach(b => b.onclick = () => { m = b.dataset.m; body.querySelectorAll('.mode').forEach(q => q.classList.toggle('alt', q !== b)); x = 60; run = false; });
  body.querySelector('.walk').onclick = () => { x = 60; run = true; swOn = false; sw = 0; };
  body.querySelector('.tap').onclick = tap;
  FX.stage(host, 760, 440, draw, { vy: 20 });
}

/* ---------- LAB 5: acceleration — drive and plot speed–time ---------- */
function labAccel(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🚗 التسارع</h3>
    <div class="fxro"><div>السرعة م/ث<b class="sp">0.0</b></div><div>التسارع م/ث²<b class="ac">0.0</b></div><div>الحالة<b class="st" style="font-family:inherit;font-size:.95em">ساكن</b></div></div>
    <div class="row"><button class="btn green gas" style="flex:1;padding:.6em">⬆ دوّاسة الوقود (اضغط مطوّلًا)</button><button class="btn orange brk" style="flex:1;padding:.6em">⬇ المكابح (اضغط مطوّلًا)</button></div>
    <div class="mini"><button class="btn alt rs">↺ إعادة</button><span class="muted">الزمن: <b class="tt">0</b> ث من 12</span></div>
    <div class="q" style="margin:0">التحدي: ارسم منحنى فيه (1) خط صاعد ← تسارع موجب، ثم (2) خط أفقي ← تسارع صفر، ثم (3) خط نازل ← تسارع سالب.</div>
    <div class="mini"><span class="pill c1">1 ✗</span><span class="pill c2">2 ✗</span><span class="pill c3">3 ✗</span></div>
    <div class="fb msg"></div>`;
  let v = 0, a = 0, t = 0, x = 0, gas = false, brk = false, hist = [], seen = [0, 0, 0], acc = 0, won = false, wrot = 0;
  const q = s => body.querySelector(s);
  function tick() { const dt = .1; a = gas ? 2 : brk ? -3 : 0; if (v + a * dt < 0) a = -v / dt; if (v + a * dt > 20) a = (20 - v) / dt; v += a * dt; x += v * dt; t += dt; hist.push([t, v, a]);
    if (a > .05 && v > 2) seen[0] = 1; if (seen[0] && Math.abs(a) < .05 && v > 2) { const rr = hist.slice(-12); if (rr.length >= 12 && rr.every(p => Math.abs(p[2]) < .05)) seen[1] = 1; } if (seen[1] && a < -.05) seen[2] = 1;
    q('.sp').textContent = v.toFixed(1); q('.ac').textContent = (a > 0 ? '+' : a < 0 ? '−' : '') + Math.abs(a).toFixed(1); q('.tt').textContent = Math.floor(t);
    const stt = q('.st'); stt.textContent = a > .05 ? 'تسارع موجب' : a < -.05 ? 'تسارع سالب' : v > 0 ? 'سرعة ثابتة' : 'ساكن';
    seen.forEach((sn, i) => { const p = q('.c' + (i + 1)); p.textContent = (i + 1) + (sn ? ' ✓' : ' ✗'); p.style.background = sn ? '#dcfce7' : '#f1f5f9'; });
    if (seen.every(Boolean) && !won) { won = true; _fb9(q('.msg'), true, '✔ ممتاز! الخط الصاعد تسارع موجب، والأفقي تسارع صفر (سرعة ثابتة)، والنازل تسارع سالب. احسب: ت = (ع٢ − ع١) ÷ ز لأي جزء من منحناك.'); } }
  function draw(c, s) {
    // sky + parallax
    c.fillStyle = FX.lg(c, 0, s.y0, 0, 200, [[0, '#7cc4f2'], [1, '#e0f2fe']]); c.fillRect(s.x0, s.y0, s.x1 - s.x0, 210 - s.y0);
    c.fillStyle = '#9cc58a'; c.beginPath(); c.moveTo(s.x0, 150); for (let X = s.x0; X <= s.x1; X += 10) c.lineTo(X, 130 + Math.sin((X + x * 3) * .012) * 18 + Math.sin((X + x * 3) * .03) * 6); c.lineTo(s.x1, 210); c.lineTo(s.x0, 210); c.fill();
    for (let k = 0; k < 9; k++) { const bx = ((k * 140 - x * 12) % 1260 + 1260) % 1260 - 150, hgt = 50 + (k * 37) % 60; c.fillStyle = ['#94a3b8', '#cbd5e1', '#a8b3c2'][k % 3]; c.fillRect(bx, 175 - hgt, 70, hgt); c.fillStyle = 'rgba(255,255,255,.6)'; for (let r = 0; r < hgt / 18 - 1; r++) for (let w = 0; w < 3; w++) c.fillRect(bx + 10 + w * 20, 175 - hgt + 10 + r * 18, 10, 8); }
    c.fillStyle = '#4b5563'; c.fillRect(s.x0, 175, s.x1 - s.x0, 70); c.fillStyle = '#9ca3af'; c.fillRect(s.x0, 175, s.x1 - s.x0, 4);
    c.fillStyle = '#fff'; for (let k = 0; k < 14; k++) c.fillRect(((k * 110 - x * 40) % 1540 + 1540) % 1540 - 120, 214, 60, 5);
    for (let k = 0; k < 8; k++) { const px = ((k * 200 - x * 40) % 1600 + 1600) % 1600 - 100; c.fillStyle = '#e5e7eb'; c.fillRect(px, 140, 5, 40); c.fillStyle = '#ef4444'; c.fillRect(px - 1, 140, 7, 8); }
    wrot += v * s.dt * 8;
    FX.car(c, 220, 240, 210, { color: '#dc2626', rot: wrot });
    if (v > 1) for (let k = 0; k < 3; k++) { c.strokeStyle = `rgba(255,255,255,${Math.min(.7, v / 20)})`; c.lineWidth = 2; c.beginPath(); c.moveTo(200 - k * 18 - v * 2, 200 + k * 12); c.lineTo(160 - k * 18 - v * 4, 200 + k * 12); c.stroke(); }
    FX.gauge(c, 650, 110, 72, v, 20, { step: 2 });
    // in-scene pedals (hold)
    FX.button(s, c, 150, 16, 120, 44, '⬆ الوقود', null, { id: 'gas', color: '#16a34a', hold: on => { gas = on; } });
    FX.button(s, c, 16, 16, 120, 44, '⬇ المكابح', null, { id: 'brk', color: '#ea580c', hold: on => { brk = on; } });
    // simulation time
    if ((gas || brk || v > 0) && t < 12) { acc += s.dt; while (acc >= .1) { acc -= .1; tick(); } }
    // graph segments coloured by acceleration
    const series = []; let cur = null; hist.forEach(p => { const col = p[2] > .05 ? '#16a34a' : p[2] < -.05 ? '#ea580c' : '#2563eb'; if (!cur || cur.col !== col) { if (cur) cur.pts.push([p[0], p[1]]); cur = { col, pts: cur ? [cur.pts[cur.pts.length - 1]] : [] }; series.push(cur); } cur.pts.push([p[0], p[1]]); });
    FX.graph(c, 20, 262, 720, 250, { xmax: 12, ymax: 20, xstep: 2, ystep: 4, xlab: 'الزمن (ث)', ylab: 'السرعة (م/ث)', series });
    [['#16a34a', 'تسارع موجب'], ['#2563eb', 'تسارع صفر'], ['#ea580c', 'تسارع سالب']].forEach(([col, n], i) => { c.fillStyle = col; c.fillRect(560 - i * 140, 276, 22, 6); FX.txt(c, n, 552 - i * 140, 279, { align: 'right', size: 12 }); });
    if (t === 0 && !gas) FX.hint(c, 210, 38, s.t, '', { r: 34 });
    if (t >= 12) FX.tag(c, 'انتهى الزمن — اضغط «إعادة» للمحاولة مجددًا', 380, 380, { size: 15 });
  }
  const hold = (el, set) => { el.addEventListener('pointerdown', e => { e.preventDefault(); set(true); }); ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => el.addEventListener(ev, () => set(false))); };
  hold(q('.gas'), sv => gas = sv); hold(q('.brk'), sv => brk = sv);
  function reset() { v = 0; a = 0; t = 0; x = 0; hist = [[0, 0, 0]]; seen = [0, 0, 0]; won = false; acc = 0; q('.msg').className = 'fb msg'; seen.forEach((sn, i) => { const p = q('.c' + (i + 1)); p.textContent = (i + 1) + ' ✗'; p.style.background = '#f1f5f9'; }); }
  q('.rs').onclick = reset; reset(); FX.stage(host, 760, 520, draw);
}

/* ---------- LAB 6: modelling acceleration with claps (p89) ---------- */
function labClap(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>👏 نمذجة التسارع</h3>
    <div class="muted" style="font-size:.86em">علامات على الأرض عند: 10، 40، 90، 160، 250 سم. يصفّق زميلك كل ثانية، وعند كل تصفيقة تكون عند علامة.</div>
    <div class="mini"><button class="btn go">👏 ابدأ من بداية المسار</button><button class="btn alt back">👏 ابدأ من نهاية المسار</button></div>
    <table class="data"><thead><tr><th>الفترة</th><th>المسافة المقطوعة</th><th>السرعة المتوسطة</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="rv" data-a="تزداد سرعتي باستمرار: المسافات في الثواني المتساوية 10، 30، 50، 70، 90 سم، فالسرعة تزيد 20 سم/ث كل ثانية (تسارع موجب منتظم 20 سم/ث²)؛ ولو كان المسار أطول لاستمرت سرعتي في الزيادة.">التحليل 1: صِف ما يحدث لسرعتك عبر المسار. ماذا تتوقع لو كان المسار أطول؟</div>
    <div class="rv" data-a="نعم ما زلت أتسارع، لكن تسارعي سالب (تباطؤ): المسافات في الثواني المتساوية تتناقص 90 ثم 70 ثم 50 ثم 30 ثم 10 سم.">التحليل 2: عند البدء من نهاية المسار، هل ما زلت تتسارع؟ فسّر.</div>`;
  const M = [0, 10, 40, 90, 160, 250], PX = 2.5, L0 = 70, FY = 300;
  let tt = 0, run = false, rev = false, ghosts = [], lastK = 0;
  const P = FX.parts();
  const at = t => rev ? 250 - (100 * t - 10 * t * t) : 10 * t * t;
  const X = cm => L0 + cm * PX;
  function draw(c, s) {
    FX.floor(c, s, 210, { w0: '#f8fafc', w1: '#e2e8f0' });
    M.forEach(m => { c.fillStyle = '#f59e0b'; c.fillRect(X(m) - 4, FY + 4, 8, 34); FX.txt(c, m + ' سم', X(m), FY + 52, { size: 13, color: '#0f172a', w: 700 }); });
    ghosts.forEach((g, i) => { c.globalAlpha = .25; FX.person(c, X(g), FY + 6, 120, g * .12, { color: '#7c3aed', dir: rev ? -1 : 1 }); c.globalAlpha = 1; });
    for (let i = 1; i < ghosts.length; i++) { const a = X(ghosts[i - 1]), b = X(ghosts[i]); FX.arrow(c, a, FY - 140, b, FY - 140, '#7c3aed', 3); FX.tag(c, Math.abs(ghosts[i] - ghosts[i - 1]) + ' سم', (a + b) / 2, FY - 160, { size: 12, bg: '#6d28d9' }); }
    if (run) { tt = Math.min(5, tt + s.dt * .8); const k = Math.floor(tt + 1e-6);
      if (k > lastK) { lastK = k; const pos = at(k); ghosts.push(pos); P.add({ k: 'ring', x: X(pos), y: FY - 70, r: 20, grow: 60, life: .6, rgb: '250,204,21' }); P.add({ k: 'text', x: X(pos), y: FY - 190, text: 'تصفيق!', life: .8, size: 20, rgb: '180,83,9' }); beep(true);
        const d = Math.abs(at(k) - at(k - 1)); body.querySelector('.tb').insertAdjacentHTML('beforeend', `<tr><td>${k - 1} – ${k} ث</td><td>${d} سم</td><td><b>${d} سم/ث</b></td></tr>`); }
      if (tt >= 5) run = false; }
    const pos = at(tt); FX.person(c, X(pos), FY + 6, 120, pos * .12, { color: '#7c3aed', dir: rev ? -1 : 1 });
    FX.clock(c, 690, 100, 40, tt, { text: tt.toFixed(1) + ' s' });
    P.step(s.dt); P.draw(c);
    if (!run && tt === 0) FX.hint(c, 380, 110, s.t, 'اختر: من البداية أو من النهاية', { r: 1 });
  }
  function start(r) { rev = r; tt = 0; lastK = 0; ghosts = [at(0)]; body.querySelector('.tb').innerHTML = ''; run = true; }
  body.querySelector('.go').onclick = () => start(false); body.querySelector('.back').onclick = () => start(true);
  FX.stage(host, 760, 330, draw, { vy: 40 });
}

/* ---------- LAB 7: momentum & collisions (law of conservation) ---------- */
function labMomentum(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>💥 الزخم والتصادمات</h3>
    <div class="seg"><button class="btn alt ps" data-p="0">المتزلج والكرة (الشكل 15)</button><button class="btn alt ps" data-p="1">صغيرة تصدم كبيرة (16أ)</button><button class="btn alt ps" data-p="2">كبيرة تصدم صغيرة (16ب)</button><button class="btn alt ps" data-p="3">متماثلتان وجهًا لوجه (16ج)</button><button class="btn alt ps" data-p="4">اختبر نفسك 6</button></div>
    <label class="rng">كتلة (أ) <input type="range" class="m1" min="1" max="50" value="2"><b class="m1v">2</b> كجم</label>
    <label class="rng">سرعة (أ) <input type="range" class="v1" min="-6" max="6" step="0.5" value="5"><b class="v1v">5</b> م/ث</label>
    <label class="rng">كتلة (ب) <input type="range" class="m2" min="1" max="50" value="48"><b class="m2v">48</b> كجم</label>
    <label class="rng">سرعة (ب) <input type="range" class="v2" min="-6" max="6" step="0.5" value="0"><b class="v2v">0</b> م/ث</label>
    <div class="row" style="gap:.5em;font-size:.86em"><label><input type="radio" name="ct" value="el"> ترتدّ (مرن)</label><label><input type="radio" name="ct" value="st" checked> تلتحم معًا</label><label><input type="radio" name="ct" value="stop"> (أ) تتوقف</label></div>
    <div class="mini"><button class="btn go">▶ صادِم</button><button class="btn alt rs">↺</button></div>
    <div class="fb msg"></div>`;
  const PRE = [[2, 5, 48, 0, 'st'], [1, 4, 5, 0, 'el'], [5, 4, 1, 0, 'el'], [3, 3, 3, -3, 'el'], [1, 3, 2, 0, 'stop']];
  const q = s => body.querySelector(s), g = s => +q(s).value, ct = () => body.querySelector('input[name=ct]:checked').value;
  const TY = 290, PXV = 26;
  let A, B, run = false, hit = false;
  const P = FX.parts();
  const w = m => 86 + Math.sqrt(m) * 22;
  function setup() { ['m1', 'v1', 'm2', 'v2'].forEach(k => q('.' + k + 'v').textContent = g('.' + k)); A = { m: g('.m1'), v: g('.v1'), x: 200, c: '#dc2626', rot: 0 }; B = { m: g('.m2'), v: g('.v2'), x: 520, c: '#2563eb', rot: 0 }; A.u = A.v; B.u = B.v; hit = false; run = false; q('.msg').className = 'fb msg'; out(false); }
  function cart(c, b, label, faceRight) {
    const W = w(b.m), H = 46 + Math.sqrt(b.m) * 5, x = b.x - W / 2, y = TY - 14 - H;
    FX.shadow(c, b.x, TY, W * .55, 5, .3);
    c.fillStyle = FX.lg(c, 0, y, 0, y + H, [[0, FX.mix(b.c, '#ffffff', .3)], [1, FX.mix(b.c, '#000000', .3)]]); FX.rr(c, x, y, W, H, 6); c.fill();
    const blocks = Math.min(4, Math.round(b.m / 12)); for (let k = 0; k < blocks; k++) { c.fillStyle = FX.lg(c, 0, y - 12 - k * 12, 0, y - k * 12, [[0, '#9ca3af'], [1, '#4b5563']]); FX.rr(c, b.x - 26, y - 12 - k * 12, 52, 11, 2); c.fill(); }
    FX.wheel(c, x + 16, TY - 12, 12, b.rot); FX.wheel(c, x + W - 16, TY - 12, 12, b.rot);
    const ex = faceRight ? x + W : x, t = ct();
    if (t === 'el') { c.strokeStyle = '#cbd5e1'; c.lineWidth = 3; c.beginPath(); for (let k = 0; k <= 8; k++) c.lineTo(ex + (faceRight ? 1 : -1) * k * 2.4, y + H / 2 + (k % 2 ? -7 : 7)); c.stroke(); }
    else { c.fillStyle = '#111827'; c.fillRect(faceRight ? ex : ex - 6, y + 6, 6, H - 12); }
    FX.txt(c, label, b.x, y + H / 2, { color: '#fff', size: 18, disp: true, w: 700 });
    FX.tag(c, b.m + ' كجم', b.x, y - 26 - blocks * 12, { size: 12, bg: 'rgba(15,23,42,.85)' });
    const p = b.m * b.v; if (Math.abs(p) > .01) { FX.arrow(c, b.x, y - 50 - blocks * 12, b.x + FX.clamp(p * 4, -170, 170), y - 50 - blocks * 12, b.c, 5); FX.txt(c, 'زخم ' + r2(p), b.x, y - 66 - blocks * 12, { size: 12, color: b.c, w: 700 }); }
  }
  function draw(c, s) {
    FX.room(c, s, TY + 6, { window: false });
    c.fillStyle = FX.lg(c, 0, TY - 6, 0, TY + 6, [[0, '#e5e7eb'], [1, '#9ca3af']]); c.fillRect(s.x0, TY - 4, s.x1 - s.x0, 10);
    for (let k = 0; k < 40; k++) { const x = k * 20; c.fillStyle = '#374151'; c.fillRect(x, TY + 6, 1, k % 5 ? 5 : 10); }
    if (run) { const dt = s.dt; A.x += A.v * PXV * dt; B.x += B.v * PXV * dt; A.rot += A.v * dt * 3; B.rot += B.v * dt * 3; const t = ct();
      if (!hit && B.x - A.x <= (w(A.m) + w(B.m)) / 2) { hit = true; collide(); P.add({ k: 'ring', x: A.x + w(A.m) / 2, y: TY - 40, r: 10, grow: 50, life: .5, rgb: '250,204,21' }); }
      if (hit && t === 'st') B.x = A.x + (w(A.m) + w(B.m)) / 2;
      if (A.x < -120 || B.x > 880 || A.x > 880 || B.x < -120 || (hit && Math.abs(A.v) < .01 && Math.abs(B.v) < .01)) run = false;
      if (!hit && A.v <= B.v) { run = false; toast('لن يحدث تصادم: (أ) لا تلحق بـ(ب)'); } }
    cart(c, A, 'أ', true); cart(c, B, 'ب', false); snapDraw(c); P.step(s.dt); P.draw(c);
    FX.tag(c, 'الزخم الكلي = ' + r2(A.m * A.v + B.m * B.v) + ' كجم.م/ث', 380, 62, { size: 16, bg: '#0f172a', disp: true });
    if (!run && !hit) FX.hint(c, 380, 140, s.t, 'اختر حالة ثم اضغط «صادِم»', { r: 1 });
  }
  let snap = null;
  function out(after) { const pA = A.m * A.u, pB = B.m * B.u, qA = A.m * A.v, qB = B.m * B.v; snap = { pA, pB, qA, qB, after }; }
  function snapDraw(c) { if (!snap) return; const box = (x, title, a, b, on) => { c.fillStyle = 'rgba(15,23,42,.88)'; FX.rr(c, x, 312, 200, 92, 12); c.fill(); FX.txt(c, title, x + 100, 330, { color: '#fde68a', size: 14, disp: true, w: 700 });
      if (on) { FX.txt(c, 'أ: ' + r2(a) + '    ب: ' + r2(b), x + 100, 357, { color: '#e2e8f0', size: 14 }); FX.txt(c, 'الكلي: ' + r2(a + b) + ' كجم.م/ث', x + 100, 384, { color: '#a7f3d0', size: 15, w: 700 }); } else FX.txt(c, 'شغّل التصادم…', x + 100, 365, { color: '#94a3b8', size: 14 }); };
    box(30, 'قبل التصادم', snap.pA, snap.pB, true); box(530, 'بعد التصادم', snap.qA, snap.qB, snap.after); }
  function collide() { const t = ct(), m1 = A.m, m2 = B.m, u1 = A.u, u2 = B.u;
    if (t === 'st') { const vv = (m1 * u1 + m2 * u2) / (m1 + m2); A.v = B.v = vv; } else if (t === 'el') { A.v = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2); B.v = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2); } else { A.v = 0; B.v = (m1 * u1 + m2 * u2) / m2; }
    beep(true); out(true);
    _fb9(q('.msg'), true, `الزخم الكلي قبل = ${r2(m1 * u1 + m2 * u2)} كجم.م/ث = الزخم الكلي بعد ✔ (قانون حفظ الزخم). ` + (t === 'st' ? `السرعة بعد الالتحام = الزخم الكلي ÷ الكتلة الكلية = ${r2(A.v)} م/ث.` : t === 'stop' ? `سرعة (ب) = ${r2(m1 * u1 + m2 * u2)} ÷ ${m2} = ${r2(B.v)} م/ث.` : 'انتقل الزخم من جسم إلى آخر.')); }
  body.querySelectorAll('.ps').forEach(b => b.onclick = () => { const p = PRE[b.dataset.p]; q('.m1').value = p[0]; q('.v1').value = p[1]; q('.m2').value = p[2]; q('.v2').value = p[3]; body.querySelector('input[name=ct][value=' + p[4] + ']').checked = true; body.querySelectorAll('.ps').forEach(x => x.classList.toggle('alt', x !== b)); setup(); });
  ['.m1', '.v1', '.m2', '.v2'].forEach(sel => q(sel).addEventListener('input', setup));
  body.querySelectorAll('input[name=ct]').forEach(r => r.onchange = setup);
  q('.go').onclick = () => { setup(); run = true; };
  q('.rs').onclick = setup;
  setup(); FX.stage(host, 760, 330, draw, { vy: 30 });
}

/* ---------- LAB 8: car safety tests (inquiry p98) ---------- */
function labCarSafe(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🥚 صمّم سيارتك لحماية البيضة</h3>
    <label class="rng">السرعة <select class="sp"><option value="1">بطيئة (1 م/ث)</option><option value="2" selected>متوسطة (2 م/ث)</option><option value="3">سريعة (3 م/ث)</option></select></label>
    <label class="rng">تثبيت البيضة <select class="belt"><option value="0">بلا تثبيت</option><option value="1">حزام من اللاصق</option></select></label>
    <label class="rng">المقدمة <select class="crush"><option value="0">صلبة (بلا حماية)</option><option value="1">كأس بولسترين قابلة للانضغاط</option><option value="2">ماصات + كأس (منطقة انهيار طويلة)</option></select></label>
    <label class="rng">حول البيضة <select class="pad"><option value="0">لا شيء</option><option value="1">بطانة لينة</option></select></label>
    <div class="mini"><button class="btn orange go">💥 اختبار التصادم</button><button class="btn alt rs">↺</button><label class="row" style="gap:.2em;font-size:.82em"><input type="checkbox" class="slow" checked> عرض بطيء للحظة التصادم</label></div>
    <table class="data"><thead><tr><th>#</th><th>السرعة</th><th>الحماية</th><th>زمن التوقف</th><th>النتيجة</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="fb msg"></div>`;
  const q = s => body.querySelector(s), g = s => +q(s).value;
  const FY = 330, WALL = 690, SLOPE = Math.atan2(140, 290), rampY = X => X < 230 ? FY - (230 - X) * 140 / 290 : FY;
  let st = 'idle', x = 0, y = 0, rampT = 0, crushK = 0, egg = null, n = 0, res = null, impactT = 0, rot = 0;
  const P = FX.parts();
  const front = () => 150 + g('.crush') * 26;
  function eggDraw(c, ex, ey, broke, ang) { c.save(); c.translate(ex, ey); c.rotate(ang || 0);
    if (!broke) { c.fillStyle = FX.rg(c, -4, -8, 2, 22, [[0, '#fffdf7'], [.7, '#f5e6c8'], [1, '#d6c29a']]); c.beginPath(); c.ellipse(0, 0, 13, 17, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.ellipse(-4, -7, 3, 5, -.3, 0, 7); c.fill(); }
    else { c.fillStyle = 'rgba(255,255,255,.92)'; c.beginPath(); c.ellipse(0, 6, 30, 9, 0, 0, 7); c.fill(); c.fillStyle = FX.rg(c, -2, 3, 1, 10, [[0, '#fde047'], [1, '#f59e0b']]); c.beginPath(); c.arc(0, 4, 8, 0, 7); c.fill();
      c.fillStyle = '#f5e6c8'; [[-22, -2, .4], [20, -4, -.5], [-8, -10, .9]].forEach(([px, py, a]) => { c.save(); c.translate(px, py); c.rotate(a); c.beginPath(); c.moveTo(-7, 0); c.lineTo(-3, -6); c.lineTo(2, -2); c.lineTo(7, -7); c.lineTo(6, 2); c.closePath(); c.fill(); c.restore(); }); }
    c.restore(); }
  function cartDraw(c, cx, cy, ang) { c.save(); c.translate(cx, cy); c.rotate(ang);
    const fl = front(), crush = g('.crush'), cl = crush ? (crush === 1 ? 26 : 52) * (1 - crushK * .75) : 0;
    c.fillStyle = FX.lg(c, 0, -46, 0, -14, [[0, '#d4a373'], [1, '#9c6b3f']]); FX.rr(c, 0, -46, 150, 32, 5); c.fill(); c.strokeStyle = 'rgba(60,35,15,.4)'; c.lineWidth = 1.5; for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(k * 30, -46); c.lineTo(k * 30, -14); c.stroke(); }
    if (crush) { c.fillStyle = '#f8fafc'; c.beginPath(); c.moveTo(150, -42); c.lineTo(150 + cl, -36); c.lineTo(150 + cl, -22); c.lineTo(150, -16); c.closePath(); c.fill(); c.strokeStyle = '#94a3b8'; c.lineWidth = 1.5; c.stroke();
      if (crush === 2) { c.strokeStyle = '#ec4899'; c.lineWidth = 2.5; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(150, -38 + k * 8); c.lineTo(150 + cl, -34 + k * 6); c.stroke(); } } }
    if (g('.pad')) { c.fillStyle = '#f1f5f9'; for (let k = 0; k < 7; k++) { c.beginPath(); c.arc(56 + (k % 4) * 12, -50 - Math.floor(k / 4) * 8, 8, 0, 7); c.fill(); } }
    c.fillStyle = '#e2e8f0'; c.beginPath(); c.moveTo(60, -46); c.lineTo(56, -66); c.lineTo(100, -66); c.lineTo(96, -46); c.closePath(); c.fill();
    if (!egg) eggDraw(c, 78, -78, false);
    if (g('.belt') && (!egg || !egg.flying)) { c.strokeStyle = '#f59e0b'; c.lineWidth = 6; c.beginPath(); c.moveTo(58, -64); c.quadraticCurveTo(78, -98, 98, -64); c.stroke(); }
    FX.wheel(c, 28, -10, 12, rot); FX.wheel(c, 122, -10, 12, rot);
    c.restore(); }
  function draw(c, s) {
    FX.floor(c, s, 170, { w0: '#f8fafc', w1: '#e2e8f0' });
    // ramp
    c.fillStyle = FX.lg(c, 0, 170, 0, FY, [[0, '#c69c6d'], [1, '#8d6a43']]); c.beginPath(); c.moveTo(s.x0, rampY(s.x0)); c.lineTo(230, FY); c.lineTo(s.x0, FY); c.closePath(); c.fill(); c.strokeStyle = '#6b4f2c'; c.lineWidth = 3; c.beginPath(); c.moveTo(s.x0, rampY(s.x0)); c.lineTo(230, FY); c.stroke();
    // brick wall
    for (let r = 0; r < 12; r++) for (let k = 0; k < 4; k++) { const bx = WALL + k * 40 - (r % 2) * 20, by = FY - (r + 1) * 22; c.fillStyle = ['#b45309', '#9a3412', '#c2410c'][(r + k) % 3]; c.fillRect(bx + 1, by + 1, 38, 20); }
    c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(WALL - 3, FY - 264, 3, 264);
    const durI = [0.01, 0.05, 0.12][g('.crush')], slowNow = st === 'impact' && q('.slow').checked && impactT < Math.max(.02, durI) * 1.2; const dt = s.dt * (slowNow ? .08 : 1);
    if (st === 'ramp') { rampT = Math.min(1, rampT + dt * .9); const k = rampT * rampT; x = FX.lerp(-60, 80, k); y = rampY(x); rot += dt * 8 * (1 + rampT * 3); if (rampT >= 1) { st = 'roll'; y = FY; } }
    else if (st === 'roll') { const v = g('.sp') * 110; x += v * dt; rot += v * dt / 12; if (x + front() >= WALL) { x = WALL - front(); st = 'impact'; impactT = 0; outcome(); P.add({ k: 'ring', x: WALL, y: FY - 30, r: 10, grow: 60, life: .5, rgb: '250,204,21' }); } }
    else if (st === 'impact') { impactT += dt; const dur = [0.01, 0.05, 0.12][g('.crush')]; crushK = Math.min(1, impactT / Math.max(.02, dur)); if (g('.crush')) x = WALL - front() + 26 * g('.crush') * .75 * crushK;
      if (egg.flying) { egg.vy += 900 * dt; egg.x += egg.vx * dt; egg.y += egg.vy * dt; egg.a += dt * 10; if (egg.x > WALL - 16) { egg.x = WALL - 16; egg.vx = 0; if (egg.final) { egg.broke = true; egg.flying = false; egg.y = Math.min(FY - 10, egg.y + 30); P.add({ k: 'ring', x: WALL - 10, y: egg.y, r: 6, grow: 30, life: .5, rgb: '250,204,21' }); } } if (egg.y > FY - 10) { egg.y = FY - 10; egg.flying = false; egg.broke = true; } }
      if (crushK >= 1 && !egg.flying) { st = 'done'; if (egg.final && !egg.broke) egg.broke = true; report(); } }
    const onRamp = st === 'idle' || st === 'ramp'; cartDraw(c, x, onRamp ? rampY(x) : FY, onRamp ? SLOPE : 0);
    if (egg) eggDraw(c, egg.x, egg.y, egg.broke, egg.flying ? egg.a : 0);
    P.step(s.dt); P.draw(c);
    if (slowNow) FX.tag(c, '⏸ عرض بطيء', 380, 100, { size: 15, bg: '#7c3aed' });
    if (st === 'done' && res) FX.tag(c, res.broke ? '🍳 انكسرت البيضة' : '🥚 البيضة سليمة', 380, 100, { size: 17, bg: res.broke ? '#dc2626' : '#16a34a', disp: true });
    if (st === 'idle') FX.hint(c, 380, 130, s.t, 'صمّم الحماية ثم اضغط «اختبار التصادم»', { r: 1 });
  }
  function outcome() { const dtStop = [0.01, 0.05, 0.12][g('.crush')], vv = g('.sp'), belt = g('.belt'), pad = g('.pad');
    const force = 0.06 * vv / dtStop * (pad ? .45 : 1), broke = belt ? force > 3.5 : (vv > 1 || !pad); n++;
    const ex = x + 78, ey = FY - 78; egg = { x: ex, y: ey, vx: belt ? 0 : vv * 160, vy: belt ? 0 : -200, a: 0, flying: !belt, broke: false, final: broke };
    res = { dtStop, vv, belt, pad, broke }; }
  function report() { const { dtStop, vv, belt, pad, broke } = res;
    q('.tb').insertAdjacentHTML('beforeend', `<tr><td>${n}</td><td>${vv} م/ث</td><td>${[belt ? 'حزام' : '', ['', 'كأس', 'ماصات+كأس'][g('.crush')], pad ? 'بطانة' : ''].filter(Boolean).join(' + ') || 'لا شيء'}</td><td>${dtStop} ث</td><td><b>${broke ? '🍳 انكسرت' : '🥚 سليمة'}</b></td></tr>`);
    _fb9(q('.msg'), !broke, broke ? (belt ? 'توقفت السيارة فجأة فتغيّر زخم البيضة في زمن قصير جدًّا. أطِل زمن التوقف بمنطقة انهيار، أو خفّض السرعة لتقليل الزخم.' : 'عندما توقفت السيارة استمرت البيضة في الحركة بسبب <b>القصور الذاتي</b> فاصطدمت بالجدار. ثبّتها بحزام.') : '✔ البيضة سليمة: الحزام منعها من الاستمرار في الحركة، ومنطقة الانهيار أطالت زمن التوقف فتغيّر زخمها تدريجيًّا. هكذا تحمي أحزمة الأمان والوسائد الهوائية الركاب.'); }
  function reset() { st = 'idle'; x = -60; y = rampY(-60); rampT = 0; crushK = 0; egg = null; res = null; rot = 0; q('.msg').className = 'fb msg'; }
  q('.go').onclick = () => { reset(); st = 'ramp'; };
  q('.rs').onclick = reset;
  ['.sp', '.belt', '.crush', '.pad'].forEach(sel => q(sel).onchange = reset);
  reset(); FX.stage(host, 760, 330, draw, { vy: 60 });
}
