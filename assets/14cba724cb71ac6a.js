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

/* ===== Virtual labs — Chapter 10: Force & Newton's laws (realistic canvas labs, labfx.js) ===== */
function _fb10(el, ok, msg) { const keep = [...el.classList].filter(c => !['fb', 'show', 'good', 'poor'].includes(c)).join(' '); el.className = 'fb show ' + (ok ? 'good' : 'poor') + ' ' + keep; el.innerHTML = msg; beep(ok); }
const r1 = x => Math.round(x * 10) / 10, r2_ = x => Math.round(x * 100) / 100;
const _R10 = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
function _book(c, x, y, w, h, col, title) { c.fillStyle = FX.lg(c, 0, y, 0, y + h, [[0, FX.mix(col, '#ffffff', .25)], [1, FX.mix(col, '#000000', .25)]]); FX.rr(c, x, y, w, h, 3); c.fill(); c.fillStyle = '#f8fafc'; c.fillRect(x + 4, y + h - 5, w - 8, 3); c.fillStyle = 'rgba(255,255,255,.75)'; c.fillRect(x + 10, y + h * .35, w * .3, 2); }
function _scale(c, x1, y1, x2, y2, F, max, o) { // spring balance drawn between x1,y1 (ring) and x2,y2 (hook)
  o = o || {}; const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1); c.save(); c.translate(x1, y1); c.rotate(a);
  const bodyL = Math.min(L - 30, 150); c.fillStyle = FX.lg(c, 0, -11, 0, 11, [[0, '#fde68a'], [.5, '#fbbf24'], [1, '#b45309']]); FX.rr(c, 14, -11, bodyL, 22, 6); c.fill();
  c.fillStyle = 'rgba(255,255,255,.85)'; c.fillRect(22, -6, bodyL - 16, 12); c.strokeStyle = '#334155'; c.lineWidth = 1;
  for (let k = 0; k <= 10; k++) { const xx = 26 + k * (bodyL - 28) / 10; c.beginPath(); c.moveTo(xx, -6); c.lineTo(xx, k % 5 ? -1 : 2); c.stroke(); }
  const px = 26 + FX.clamp(F / max, 0, 1) * (bodyL - 28); c.fillStyle = '#dc2626'; c.fillRect(px - 2, -8, 4, 16);
  c.strokeStyle = '#64748b'; c.lineWidth = 3; c.beginPath(); c.arc(7, 0, 7, 0, 7); c.stroke(); c.beginPath(); c.moveTo(14 + bodyL, 0); c.lineTo(L - 8, 0); c.stroke(); c.beginPath(); c.arc(L - 4, 4, 5, -1.6, 2); c.stroke();
  c.restore(); if (o.label !== false) FX.tag(c, r1(F) + ' N', (x1 + x2) / 2, (y1 + y2) / 2 - 26, { size: 13, bg: 'rgba(15,23,42,.88)', color: '#fde047' });
}

/* ---------- LAB 1: forces & motion on a ramp (launch lab p105) ---------- */
function labRamp(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>📐 القوى والحركة</h3>`;
  const S = stepsList(panel, ['اختر عدد الكتب تحت المسطرتين', 'انقر الكرة الزجاجية بالقوة نفسها في كل مرة', 'سجّل أعلى مسافة وصلتها الكرة', 'كرّر لكتابين وكتاب ودون كتب ثم استنتج']);
  panel.insertAdjacentHTML('beforeend', `<div class="seg"><b style="font-size:.85em">عدد الكتب:</b>${[3, 2, 1, 0].map(n => `<button class="btn ${n === 3 ? '' : 'alt'} bk" data-n="${n}">${n === 0 ? 'دون كتب' : n}</button>`).join('')}</div>
    <div class="mini"><button class="btn orange flick">👆 انقر الكرة</button><label class="row" style="gap:.2em;font-size:.82em"><input type="checkbox" class="smooth"> سطح أملس تمامًا (بلا احتكاك)</label></div>
    <table class="data"><thead><tr><th>عدد الكتب</th><th>أعلى مسافة (سم)</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="rv" data-a="كلما قلّ ميل السطح زادت المسافة التي تقطعها الكرة؛ ولو كان السطح أملس ومستويًا تمامًا لاستمرت الكرة في الحركة بسرعة ثابتة في خط مستقيم دون توقف (القانون الأول لنيوتن).">التفكير الناقد: ماذا يمكن أن يحدث لو كان السطح أملس ومستويًا تمامًا؟</div>`);
  const BY = 400, X0 = 640, LEN = 520, V0 = 1.0, MU = .03;
  let n = 3, s = 0, v = 0, run = false, maxS = 0, done = new Set(), finger = 0, trail = [];
  const q = sel => body.querySelector(sel);
  const ang = () => Math.asin(3 * n / 100), visA = () => Math.min(.5, ang() * 7);
  const pt = d => [X0 - Math.cos(visA()) * d, BY - 32 - Math.sin(visA()) * d];
  function draw(c, st) {
    FX.room(c, st, BY);
    for (let k = 0; k < n; k++) _book(c, X0 - LEN - 70, BY - 24 * (k + 1), 150, 24, ['#1d4ed8', '#b91c1c', '#15803d'][k], '');
    const a = visA(), top = pt(LEN); c.save(); c.translate(X0, BY - 26); c.rotate(-a);
    [-8, 8].forEach(dy => { c.fillStyle = FX.lg(c, 0, dy - 4, 0, dy + 4, [[0, '#e9c48f'], [1, '#a47b52']]); c.fillRect(-LEN - 20, dy - 4, LEN + 20, 7); });
    c.fillStyle = '#5b3a1a'; c.font = `600 9px ${FX.MONO}`; c.textAlign = 'center'; for (let cm = 0; cm <= 100; cm += 10) { const x = -cm / 100 * LEN; c.fillRect(x - .5, -12, 1, 5); c.fillText(cm, x, -16); }
    c.restore();
    if (run) { const g = 9.8, mu = q('.smooth').checked ? 0 : MU, dec = g * Math.sin(ang()) + mu * g * Math.cos(ang()), dt = st.dt * .8;
      v -= dec * dt; if (v <= 0) { v = 0; run = false; finish(false); } else { s += v * dt; maxS = Math.max(maxS, s); if (s > 1.05) { run = false; finish(true); } } }
    const d = FX.clamp(s / 1.0, 0, 1.15) * LEN, p = pt(Math.min(d, LEN + 30)); trail.push(p); if (trail.length > 30) trail.shift();
    c.strokeStyle = 'rgba(59,130,246,.25)'; c.lineWidth = 8; c.beginPath(); trail.forEach((t, i) => i ? c.lineTo(t[0], t[1]) : c.moveTo(t[0], t[1])); c.stroke();
    if (maxS > 0) { const m = pt(Math.min(maxS, 1.0) * LEN); c.strokeStyle = '#dc2626'; c.lineWidth = 3; c.beginPath(); c.moveTo(m[0], m[1] - 30); c.lineTo(m[0], m[1] + 10); c.stroke(); FX.tag(c, maxS > 1.0 ? 'تجاوزت المسطرة!' : Math.round(maxS * 100) + ' سم', m[0], m[1] - 44, { size: 14, bg: '#dc2626' }); }
    c.fillStyle = FX.rg(c, p[0] - 4, p[1] - 14, 1, 12, [[0, '#e0f2fe'], [.5, '#38bdf8'], [1, '#075985']]); c.beginPath(); c.arc(p[0], p[1] - 9, 9, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.8)'; c.beginPath(); c.arc(p[0] - 3, p[1] - 12, 2.5, 0, 7); c.fill();
    // finger flick
    if (finger > 0) { finger -= st.dt; const fx = X0 + 18 + finger * 40; c.fillStyle = '#e0ac69'; FX.rr(c, fx, BY - 52, 46, 16, 8); c.fill(); c.fillStyle = '#f5d0a9'; c.beginPath(); c.ellipse(fx + 2, BY - 44, 6, 5, 0, 0, 7); c.fill(); }
    if (!run && s === 0) { st.hit({ id: 'ball', x: X0 - 30, y: BY - 70, w: 60, h: 60, click: flick }); FX.hint(c, X0, BY - 42, st.t, 'انقر الكرة', { r: 20, dx: -40 }); }
    FX.tag(c, n ? `السطح المائل: ${n} ${n === 1 ? 'كتاب' : n === 2 ? 'كتابان' : 'كتب'}` : 'السطح مستوٍ (دون كتب)', 400, 40, { size: 15, bg: 'rgba(15,23,42,.85)' });
    S.set(s === 0 && done.size === 0 ? 1 : done.size < 4 ? (run ? 2 : 1) : 3);
  }
  function flick() { if (run) return; s = 0; v = V0; maxS = 0; trail = []; run = true; finger = .25; beep(true); }
  function finish(off) { const cm = off ? 'أكثر من 100 (تجاوزت المسطرة)' : Math.round(maxS * 100); done.add(n);
    const lab = n ? n + (q('.smooth').checked ? ' (أملس)' : '') : 'دون كتب' + (q('.smooth').checked ? ' (أملس)' : '');
    q('.tb').insertAdjacentHTML('beforeend', `<tr><td>${lab}</td><td><b>${cm}</b></td></tr>`);
    if (n === 0 && q('.smooth').checked) toast('على سطح أملس مستوٍ لا تتوقف الكرة: تستمر بسرعة ثابتة (القانون الأول)');
    setTimeout(() => { if (!run) { s = 0; maxS = maxS; } }, 1800); }
  body.querySelectorAll('.bk').forEach(b => b.onclick = () => { if (run) return; n = +b.dataset.n; s = 0; maxS = 0; trail = []; body.querySelectorAll('.bk').forEach(x => x.classList.toggle('alt', x !== b)); });
  q('.flick').onclick = () => { s = 0; flick(); };
  FX.stage(host, 760, 470, draw, { vy: 10 });
}

/* ---------- LAB 2: net force & balanced forces (Fig. 2, review Q14 & Q26) ---------- */
function labNetForce(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>➕ القوة المحصلة</h3>
    <div class="seg"><button class="btn alt ps" data-p="0">الباب (الشكل 2ب)</button><button class="btn alt ps" data-p="1">السؤال 14</button><button class="btn alt ps" data-p="2">قوى في اتجاه واحد</button></div>
    <label class="rng">👦 يسار (يدفع يمينًا) <input type="range" class="l1" min="0" max="30" value="10"><b class="l1v">10</b> N</label>
    <label class="rng">👦 يسار 2 <input type="range" class="l2" min="0" max="30" value="0"><b class="l2v">0</b> N</label>
    <label class="rng">👦 يمين (يدفع يسارًا) <input type="range" class="r1" min="0" max="30" value="10"><b class="r1v">10</b> N</label>
    <div class="fxro"><div>المحصلة<b class="net">0</b></div><div>الحالة<b class="state" style="font-family:inherit;font-size:.95em">متزنة</b></div><div>التسارع<b class="acc">0</b></div></div>
    <div class="mini"><button class="btn go">▶ ادفعوا</button><button class="btn alt rs">↺</button></div>
    <div class="q" style="margin:0">توقّع قبل الدفع: كيف يتحرك الصندوق؟</div><div class="mini"><button class="btn alt pr" data-v="L">نحو اليسار</button><button class="btn alt pr" data-v="0">لا يتحرك</button><button class="btn alt pr" data-v="R">نحو اليمين</button></div>
    <div class="fb msg"></div>`;
  const q = s => body.querySelector(s), g = s => +q(s).value, M = 10, FS = 6, FK = 4, FY = 380;
  let x = 380, v = 0, push = false, pred = null, t = 0, ph = 0;
  const net = () => g('.l1') + g('.l2') - g('.r1');
  function upd() { ['l1', 'l2', 'r1'].forEach(k => q('.' + k + 'v').textContent = g('.' + k)); const n = net(); q('.net').textContent = (n > 0 ? '→ ' : n < 0 ? '← ' : '') + Math.abs(n) + ' N'; q('.state').textContent = n === 0 ? 'متزنة' : 'غير متزنة'; }
  function draw(c, st) {
    FX.floor(c, st, 250, { w0: '#eef2f6', w1: '#dfe6ee' });
    const n = net();
    if (push) { t += st.dt; let fr = 0; if (Math.abs(v) < 1e-3) { if (Math.abs(n) <= FS) { v = 0; fr = n; } else fr = Math.sign(n) * FK; } else fr = Math.sign(v) * FK; const a = (n - fr) / M; v += a * st.dt; if (Math.abs(v) < .02 && Math.abs(n) <= FS) v = 0; x += v * 60 * st.dt; ph += Math.abs(v) * st.dt * 6;
      q('.acc').textContent = r2_(Math.abs(n) <= FS && v === 0 ? 0 : (n - fr) / M) + ' م/ث²'; if (x < 150 || x > 610 || t > 6) { push = false; judge(); } }
    // box
    const bw = 140, bh = 110, bx = x - bw / 2, by = FY - bh; FX.shadow(c, x, FY + 4, bw * .6, 8, .35);
    c.fillStyle = FX.lg(c, bx, by, bx + bw, by + bh, [[0, '#e7c78f'], [1, '#b98a4f']]); c.fillRect(bx, by, bw, bh); c.strokeStyle = '#8a6440'; c.lineWidth = 3; c.strokeRect(bx, by, bw, bh); c.fillStyle = 'rgba(120,80,40,.5)'; c.fillRect(bx, by + bh / 2 - 8, bw, 16); FX.txt(c, '10 كجم', x, by + 28, { color: '#5b3a1a', size: 16, w: 700 });
    // people
    const pl = [[g('.l1'), -1, '#2563eb', 0], [g('.l2'), -1, '#16a34a', 1], [g('.r1'), 1, '#dc2626', 0]];
    pl.forEach(([F, side, col, k]) => { if (!F) return; const px = side < 0 ? bx - 40 - k * 64 : bx + bw + 40; FX.person(c, px, FY, 150, push ? ph : 0, { color: col, dir: -side, run: true });
      const ay = by + 40 + k * 26; FX.arrow(c, side < 0 ? bx - 6 - F * 4 : bx + bw + 6 + F * 4, ay, side < 0 ? bx - 6 : bx + bw + 6, ay, col, 5); FX.tag(c, F + ' N', side < 0 ? bx - 20 - F * 2 : bx + bw + 20 + F * 2, ay - 16, { size: 12, bg: col }); });
    if (n !== 0) { FX.arrow(c, x, by - 30, x + n * 6, by - 30, '#0f172a', 7); FX.tag(c, 'المحصلة ' + Math.abs(n) + ' N', x + n * 3, by - 56, { size: 14, bg: '#0f172a' }); } else FX.tag(c, '⚖ القوى متزنة: المحصلة صفر', x, by - 40, { size: 14, bg: '#16a34a' });
    if (!push && t === 0) FX.hint(c, 380, 120, st.t, 'غيّر القوى، توقّع، ثم اضغط «ادفعوا»', { r: 1 });
  }
  function judge() { const n = net(), right = Math.abs(n) <= FS ? '0' : n > 0 ? 'R' : 'L';
    _fb10(q('.msg'), pred === right, (pred === right ? '✔ توقع صحيح. ' : pred ? '✘ توقعك لم يتحقق. ' : '') + (n === 0 ? 'القوتان متساويتان ومتعاكستان فتلغي إحداهما الأخرى: القوى <b>متزنة</b> والمحصلة صفر.' : Math.abs(n) <= FS ? `المحصلة ${Math.abs(n)} N لم تتغلب على الاحتكاك السكوني، فبقي الصندوق ساكنًا والقوى متزنة.` : `القوى <b>غير متزنة</b>: المحصلة ${Math.abs(n)} N نحو ${n > 0 ? 'اليمين' : 'اليسار'} (في اتجاه القوة الكبرى)، فتحرك الصندوق في اتجاهها.`)); }
  const PRE = [[15, 0, 15], [5, 10, 20], [10, 8, 0]];
  body.querySelectorAll('.ps').forEach(b => b.onclick = () => { const p = PRE[b.dataset.p]; q('.l1').value = p[0]; q('.l2').value = p[1]; q('.r1').value = p[2]; reset(); body.querySelectorAll('.ps').forEach(o => o.classList.toggle('alt', o !== b)); });
  ['.l1', '.l2', '.r1'].forEach(s => q(s).addEventListener('input', reset));
  body.querySelectorAll('.pr').forEach(b => b.onclick = () => { pred = b.dataset.v; body.querySelectorAll('.pr').forEach(o => o.classList.toggle('alt', o !== b)); });
  function reset() { push = false; x = 380; v = 0; t = 0; q('.msg').className = 'fb msg'; q('.acc').textContent = '0'; upd(); }
  q('.go').onclick = () => { reset(); push = true; }; q('.rs').onclick = reset;
  reset(); FX.stage(host, 760, 420, draw, { vy: 10 });
}

/* ---------- LAB 3: observing friction on a tilted notebook (p113) ---------- */
function labFriction(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>📒 ملاحظة الاحتكاك</h3>`;
  const S = stepsList(panel, ['ضع الصابون والممحاة والمفتاح على الدفتر', 'ارفع طرف الدفتر ببطء وثبات (اسحب الطرف أو اضغط مطوّلًا)', 'لاحظ ترتيب انزلاق الأجسام وسجّل زاوية كل منها', 'أجب عن أسئلة التحليل']);
  panel.insertAdjacentHTML('beforeend', `<div class="mini"><button class="btn up">⬆ ارفع ببطء (اضغط مطوّلًا)</button><button class="btn alt rs">↺ أعد الأجسام</button></div>
    <div class="fxro"><div>زاوية الدفتر<b class="ang">0°</b></div></div>
    <table class="data"><thead><tr><th>الجسم</th><th>بدأ الانزلاق عند</th><th>الترتيب</th></tr></thead><tbody class="tb"></tbody></table>
    <button class="btn navy anq">📝 أسئلة التحليل (3)</button>`);
  const OB = [{ n: 'الصابون', mu: .3, col: '#f472b6' }, { n: 'المفتاح', mu: .42, col: '#9ca3af' }, { n: 'الممحاة', mu: .78, col: '#60a5fa' }];
  const BX = 160, BY = 400, BL = 460;
  let a = 0, up = false, order = 0, objs;
  const q = s => body.querySelector(s);
  function reset() { a = 0; order = 0; objs = OB.map((o, i) => ({ ...o, s: 120 + i * 120, v: 0, slid: false, off: false })); q('.tb').innerHTML = ''; }
  function draw(c, st) {
    FX.room(c, st, BY);
    if (up) a = Math.min(40, a + st.dt * 4);
    const th = a * Math.PI / 180, ex = BX + Math.cos(th) * BL, ey = BY - 14 - Math.sin(th) * BL;
    // support books under raised end
    c.fillStyle = '#64748b'; c.fillRect(ex - 6, ey + 6, 12, BY - ey - 6);
    c.save(); c.translate(BX, BY - 14); c.rotate(-th);
    c.fillStyle = FX.lg(c, 0, -10, 0, 8, [[0, '#2563eb'], [1, '#1e3a8a']]); FX.rr(c, 0, -6, BL, 14, 3); c.fill(); c.fillStyle = '#f8fafc'; c.fillRect(4, -9, BL - 8, 4); c.strokeStyle = 'rgba(30,58,138,.35)'; c.lineWidth = 1; for (let k = 0; k < 14; k++) { c.beginPath(); c.moveTo(20 + k * 32, -9); c.lineTo(20 + k * 32, -5); c.stroke(); }
    objs.forEach((o, i) => { if (o.off) return; const g = 9.8, sin = Math.sin(th), cos = Math.cos(th);
      if (!o.slid && Math.tan(th) > o.mu) { o.slid = true; order++; o.ord = order; beep(true); q('.tb').insertAdjacentHTML('beforeend', `<tr><td>${o.n}</td><td>${a.toFixed(0)}°</td><td><b>${order}</b></td></tr>`); }
      if (o.slid) { const acc = g * (sin - o.mu * .7 * cos); o.v += Math.max(0, acc) * st.dt * 60; o.s -= o.v * st.dt; if (o.s < -60) o.off = true; }
      const x = o.s; c.save(); c.translate(x, -9);
      if (i === 0) { c.fillStyle = FX.lg(c, 0, -26, 0, 0, [[0, '#fbcfe8'], [1, '#db2777']]); FX.rr(c, -30, -26, 60, 26, 10); c.fill(); c.fillStyle = 'rgba(255,255,255,.5)'; FX.rr(c, -22, -22, 30, 6, 3); c.fill(); }
      else if (i === 1) { c.fillStyle = FX.lg(c, 0, -14, 0, 0, [[0, '#e5e7eb'], [1, '#6b7280']]); c.beginPath(); c.arc(-18, -8, 9, 0, 7); c.fill(); c.fillRect(-10, -11, 34, 6); c.fillRect(16, -5, 4, 5); c.fillRect(22, -5, 3, 4); c.fillStyle = '#374151'; c.beginPath(); c.arc(-18, -8, 3.5, 0, 7); c.fill(); }
      else { c.fillStyle = '#93c5fd'; FX.rr(c, -24, -18, 48, 18, 3); c.fill(); c.fillStyle = '#f472b6'; FX.rr(c, -24, -18, 18, 18, 3); c.fill(); }
      c.restore(); });
    c.restore();
    // drag handle at raised end
    st.hit({ id: 'edge', x: ex - 30, y: ey - 30, w: 60, h: 60, drag: { move(p) { const dy = BY - 14 - p.y, dx = p.x - BX; a = FX.clamp(Math.atan2(dy, dx) * 180 / Math.PI, 0, 40); } } });
    c.fillStyle = '#e0ac69'; c.beginPath(); c.arc(ex + 6, ey - 4, 13, 0, 7); c.fill(); c.fillStyle = '#c68a4f'; FX.rr(c, ex + 2, ey + 4, 18, 30, 8); c.fill();
    // protractor
    c.strokeStyle = 'rgba(15,23,42,.5)'; c.lineWidth = 1.5; c.beginPath(); c.arc(BX, BY - 14, 70, -th, 0); c.stroke(); FX.tag(c, a.toFixed(0) + '°', BX + 92, BY - 30, { size: 14, bg: '#0f172a' });
    objs.forEach(o => { if (!o.slid) return; });
    q('.ang').textContent = a.toFixed(0) + '°';
    if (a === 0) FX.hint(c, ex, ey, st.t, 'اسحب طرف الدفتر إلى أعلى ببطء', { r: 24, dx: -60 });
    S.set(order === 0 ? (a === 0 ? 1 : 2) : order < 3 ? 2 : 3);
  }
  const ANQ = `<h3>تحليل التجربة</h3><div class="rv" data-a="الممحاة احتكاكها السكوني أكبر لأنها آخر ما انزلق (احتاجت أكبر ميل)، والصابون احتكاكه أقل لأنه أول ما انزلق؛ فسطحه أملس.">1. أي الأجسام كانت قوة الاحتكاك السكوني له أكبر، وأيها أقل؟ فسّر.</div>
    <div class="rv" data-a="الصابون أسرعها انزلاقًا لأن احتكاكه الانزلاقي أقل، والممحاة أبطؤها لأن احتكاكها الانزلاقي أكبر.">2. أي الأجسام تكون سرعة انزلاقه أكبر، وأيها أقل؟ فسّر.</div>
    <div class="rv" data-a="نزيد الاحتكاك بزيادة خشونة السطحين أو زيادة الوزن (الضغط)، وننقصه بتنعيم السطوح أو استخدام مواد التزييت أو العجلات (الاحتكاك التدحرجي).">3. كيف يمكنك زيادة أو إنقاص قوة الاحتكاك بين سطحين؟</div>`;
  q('.anq').onclick = () => openModal(ANQ);
  const ub = q('.up'); ub.addEventListener('pointerdown', e => { e.preventDefault(); try { ub.setPointerCapture(e.pointerId); } catch (_) { } up = true; }); ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => ub.addEventListener(ev, () => up = false));
  q('.rs').onclick = reset; reset(); FX.stage(host, 760, 440, draw, { vy: 10 });
}

/* ---------- LAB 4: Newton's second law — cart, spring scale and masses ---------- */
function labNewton2(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🛒 القانون الثاني لنيوتن</h3>
    <label class="rng">✋ قوة السحب <input type="range" class="f" min="1" max="12" value="4"><b class="fv">4</b> N</label>
    <div class="seg"><b style="font-size:.85em">الكتلة الكلية:</b>${[1, 2, 4].map(m => `<button class="btn ${m === 2 ? '' : 'alt'} mm" data-m="${m}">${m} كجم</button>`).join('')}</div>
    <div class="mini"><button class="btn go">▶ اسحب العربة</button><button class="btn alt rs">↺</button></div>
    <div class="fxro"><div>التسارع المقيس<b class="am">—</b></div><div>ق ÷ ك<b class="fm">2.0</b></div></div>
    <table class="data"><thead><tr><th>ق (N)</th><th>ك (كجم)</th><th>ت (م/ث²)</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="muted" style="font-size:.82em">ضاعف القوة مع ثبات الكتلة، ثم ضاعف الكتلة مع ثبات القوة. ماذا يحدث للتسارع؟</div>`;
  const q = s => body.querySelector(s); let m = 2, F = 4, x = 0, v = 0, t = 0, run = false, hist = [], wr = 0;
  const TY = 330, X0 = 110;
  function draw(c, st) {
    FX.room(c, st, TY + 40, { window: false });
    c.fillStyle = FX.lg(c, 0, TY, 0, TY + 14, [[0, '#cbd5e1'], [1, '#64748b']]); c.fillRect(40, TY, 700, 12); for (let k = 0; k <= 14; k++) { c.fillStyle = '#334155'; c.fillRect(60 + k * 46, TY + 12, 1.5, 8); FX.txt(c, (k * 10) + '', 60 + k * 46, TY + 28, { mono: true, size: 9, color: '#334155' }); }
    if (run) { const a = F / m; v += a * st.dt * .6; x += v * st.dt * .6 * 230; t += st.dt * .6; wr += v * st.dt * 8; if (!hist.length || t - hist[hist.length - 1][0] > .05) hist.push([t, v]); if (x > 330 || t > 2.5) { run = false; record(); } }
    const cx = X0 + x; // cart
    FX.shadow(c, cx + 60, TY, 70, 6, .3); c.fillStyle = FX.lg(c, 0, TY - 50, 0, TY - 14, [[0, '#ef4444'], [1, '#991b1b']]); FX.rr(c, cx, TY - 50, 120, 36, 5); c.fill();
    for (let k = 0; k < m; k++) { c.fillStyle = FX.lg(c, 0, TY - 74 - k * 0, 0, TY - 50, [[0, '#d1d5db'], [1, '#4b5563']]); FX.rr(c, cx + 8 + (k % 2) * 54 + (k > 1 ? 0 : 0), TY - 72 - Math.floor(k / 2) * 22, 50, 20, 3); c.fill(); FX.txt(c, '1 كجم', cx + 33 + (k % 2) * 54, TY - 62 - Math.floor(k / 2) * 22, { size: 10, color: '#111827' }); }
    FX.wheel(c, cx + 22, TY - 8, 9, wr); FX.wheel(c, cx + 98, TY - 8, 9, wr);
    // spring scale + hand
    const hx = cx + 220; _scale(c, hx, TY - 32, cx + 120, TY - 32, run ? F : 0, 12); c.fillStyle = '#e0ac69'; c.beginPath(); c.arc(hx + 14, TY - 32, 13, 0, 7); c.fill(); c.fillStyle = '#2563eb'; c.fillRect(hx + 24, TY - 42, 60, 20);
    // motion sensor at left
    c.fillStyle = '#1f2937'; FX.rr(c, 40, TY - 46, 40, 36, 6); c.fill(); c.fillStyle = '#22c55e'; c.beginPath(); c.arc(70, TY - 28, 8, 0, 7); c.fill(); if (run) { c.strokeStyle = 'rgba(34,197,94,.4)'; for (let k = 0; k < 3; k++) { c.beginPath(); c.arc(80, TY - 28, 20 + ((st.t * 120 + k * 40) % 120), -.3, .3); c.stroke(); } }
    FX.txt(c, 'حسّاس الحركة', 60, TY - 58, { size: 11, color: '#0f172a' });
    FX.graph(c, 16, 12, 330, 200, { xmax: 2.5, ymax: 12, xstep: .5, ystep: 3, xlab: 'الزمن (ث)', ylab: 'السرعة (م/ث)', series: [{ pts: hist, col: '#dc2626' }] });
    FX.tag(c, 'ق = ' + F + ' N   ك = ' + m + ' كجم', 560, 40, { size: 15, bg: 'rgba(15,23,42,.88)' });
    if (!run && t === 0) FX.hint(c, cx + 200, TY - 40, st.t, 'اضغط «اسحب العربة»', { r: 26, dy: -10 });
  }
  function record() { const a = hist.length > 3 ? (hist[hist.length - 1][1] - hist[1][1]) / (hist[hist.length - 1][0] - hist[1][0]) : F / m; q('.am').textContent = r2_(a) + ' م/ث²';
    q('.tb').insertAdjacentHTML('beforeend', `<tr><td>${F}</td><td>${m}</td><td><b>${r2_(a)}</b></td></tr>`); beep(true); toast('التسارع = ق ÷ ك = ' + F + ' ÷ ' + m + ' = ' + r2_(F / m) + ' م/ث²'); }
  function reset() { run = false; x = 0; v = 0; t = 0; hist = []; F = +q('.f').value; q('.fv').textContent = F; q('.fm').textContent = r2_(F / m); q('.am').textContent = '—'; }
  q('.f').addEventListener('input', reset); body.querySelectorAll('.mm').forEach(b => b.onclick = () => { m = +b.dataset.m; body.querySelectorAll('.mm').forEach(o => o.classList.toggle('alt', o !== b)); reset(); });
  q('.go').onclick = () => { reset(); run = true; }; q('.rs').onclick = reset;
  reset(); FX.stage(host, 760, 400, draw, { vy: 0 });
}

/* ---------- LAB 5: weight vs mass on planets (Table 1) ---------- */
function labWeight(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🪐 الوزن والكتلة</h3>
    <div class="seg">${[['earth', 'الأرض'], ['mars', 'المريخ'], ['jupiter', 'المشتري'], ['pluto', 'بلوتو']].map((p, k) => `<button class="btn ${k ? 'alt' : ''} pl" data-p="${p[0]}">${p[1]}</button>`).join('')}</div>
    <label class="rng">⚖ كتلة الرائد <input type="range" class="m" min="30" max="90" step="5" value="60"><b class="mv">60</b> كجم</label>
    <div class="fxro"><div>الميزان النابضي (الوزن)<b class="w">588 N</b></div><div>الميزان ذو الكفتين (الكتلة)<b class="k">60 كجم</b></div></div>
    <table class="data"><thead><tr><th>المكان</th><th>الكتلة</th><th>الوزن (N)</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="fb msg"></div>`;
  const G = { earth: [9.8, 'الأرض', '#2563eb', '#86efac'], mars: [221 / 60, 'المريخ', '#c2410c', '#fdba74'], jupiter: [1390 / 60, 'المشتري', '#a16207', '#fde68a'], pluto: [35 / 60, 'بلوتو', '#475569', '#e2e8f0'] };
  const q = s => body.querySelector(s); let P = 'earth', shown = 588, seen = new Set();
  function draw(c, st) {
    const g = G[P], m = +q('.m').value, w = m * g[0];
    c.fillStyle = FX.lg(c, 0, st.y0, 0, st.y1, [[0, '#020617'], [1, '#1e1b4b']]); c.fillRect(st.x0, st.y0, st.x1 - st.x0, st.y1 - st.y0);
    for (let k = 0; k < 90; k++) { c.fillStyle = `rgba(255,255,255,${.3 + _R10(k) * .7})`; c.fillRect(st.x0 + _R10(k + 3) * (st.x1 - st.x0), st.y0 + _R10(k + 9) * 260, 1.6, 1.6); }
    c.fillStyle = FX.rg(c, 380, 1500, 900, 1180, [[0, g[3]], [1, g[2]]]); c.beginPath(); c.arc(380, 1500, 1180, 0, 7); c.fill();
    if (P === 'jupiter') for (let k = 0; k < 6; k++) { c.strokeStyle = 'rgba(120,53,15,.25)'; c.lineWidth = 10; c.beginPath(); c.arc(380, 1500, 1190 - k * 14, 3.6, 5.8); c.stroke(); }
    FX.txt(c, g[1], 380, 50, { size: 30, color: '#fff', disp: true, w: 700 });
    shown += (w - shown) * Math.min(1, st.dt * 3);
    // bathroom scale with astronaut
    const sx = 210, sy = 380; FX.shadow(c, sx, sy + 4, 90, 8, .4); c.fillStyle = FX.lg(c, 0, sy - 24, 0, sy, [[0, '#f8fafc'], [1, '#94a3b8']]); FX.rr(c, sx - 90, sy - 24, 180, 24, 8); c.fill(); FX.lcd(c, sx - 50, sy - 20, 100, 16, Math.round(shown) + ' N', {});
    const hy = sy - 26; c.fillStyle = '#e5e7eb'; FX.rr(c, sx - 30, hy - 120, 60, 80, 18); c.fill(); c.fillStyle = '#cbd5e1'; FX.rr(c, sx - 26, hy - 44, 22, 44, 8); c.fill(); FX.rr(c, sx + 4, hy - 44, 22, 44, 8); c.fill();
    c.fillStyle = FX.rg(c, sx - 8, hy - 150, 4, 30, [[0, '#ffffff'], [1, '#94a3b8']]); c.beginPath(); c.arc(sx, hy - 145, 28, 0, 7); c.fill(); c.fillStyle = FX.lg(c, sx - 20, 0, sx + 20, 0, [[0, '#1e3a8a'], [1, '#60a5fa']]); FX.rr(c, sx - 18, hy - 158, 36, 22, 10); c.fill();
    c.fillStyle = '#f97316'; c.fillRect(sx - 30, hy - 100, 60, 8); FX.tag(c, m + ' كجم', sx, hy - 196, { size: 13 });
    FX.arrow(c, sx + 110, hy - 110, sx + 110, hy - 110 + Math.min(180, w / 8), '#ef4444', 6); FX.txt(c, 'الوزن', sx + 140, hy - 90, { color: '#fecaca', size: 14 });
    // equal-arm balance comparing with standard masses
    const bx = 560, by = 380; c.fillStyle = '#94a3b8'; c.fillRect(bx - 6, by - 140, 12, 140); FX.rr(c, bx - 60, by - 10, 120, 12, 4); c.fill(); c.fillStyle = '#e2e8f0'; c.fillRect(bx - 110, by - 142, 220, 6);
    [-1, 1].forEach(sd => { const px = bx + sd * 100; c.strokeStyle = '#cbd5e1'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(px, by - 139); c.lineTo(px - 30, by - 70); c.moveTo(px, by - 139); c.lineTo(px + 30, by - 70); c.stroke(); c.fillStyle = '#e5e7eb'; c.beginPath(); c.ellipse(px, by - 68, 38, 7, 0, 0, 7); c.fill(); });
    c.fillStyle = '#9ca3af'; FX.rr(c, bx - 124, by - 96, 48, 26, 4); c.fill(); FX.txt(c, m + ' كجم', bx - 100, by - 83, { size: 11, color: '#111827' });
    c.fillStyle = '#facc15'; FX.rr(c, bx + 76, by - 96, 48, 26, 4); c.fill(); FX.txt(c, m + ' كجم', bx + 100, by - 83, { size: 11, color: '#111827' });
    FX.tag(c, '⚖ متوازن دائمًا: الكتلة لا تتغير', bx, by - 170, { size: 13, bg: '#16a34a' });
    q('.w').textContent = Math.round(w) + ' N'; q('.k').textContent = m + ' كجم';
  }
  function log() { const g = G[P], m = +q('.m').value, key = P + m; if (seen.has(key)) return; seen.add(key); q('.tb').insertAdjacentHTML('beforeend', `<tr><td>${g[1]}</td><td>${m} كجم</td><td><b>${Math.round(m * g[0])}</b></td></tr>`);
    if (seen.size >= 3) _fb10(q('.msg'), true, 'لاحظ: <b>الكتلة ثابتة</b> في كل مكان (مقدار ما في الجسم من مادة)، أما <b>الوزن</b> فيتغير لأن قوة جذب الكوكب تختلف: و = ك × تسارع الجاذبية.'); }
  body.querySelectorAll('.pl').forEach(b => b.onclick = () => { P = b.dataset.p; body.querySelectorAll('.pl').forEach(o => o.classList.toggle('alt', o !== b)); log(); });
  q('.m').addEventListener('input', () => { q('.mv').textContent = q('.m').value; }); q('.m').addEventListener('change', log);
  log(); FX.stage(host, 760, 420, draw);
}

/* ---------- LAB 6: satellite motion (Fig. 11) + air resistance & terminal speed ---------- */
function labOrbit(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🛰 القمر الاصطناعي ومقاومة الهواء</h3>
    <div class="seg"><button class="btn md" data-m="orbit">🌍 قذف أفقي حول الأرض</button><button class="btn alt md" data-m="air">🪂 مقاومة الهواء</button></div>
    <div class="po"><label class="rng">سرعة الانطلاق <input type="range" class="v" min="2" max="9" step="0.5" value="4"><b class="vv">4</b> كم/ث</label>
      <div class="mini"><button class="btn go">🚀 اقذف</button><button class="btn alt clr">مسح المسارات</button></div>
      <div class="muted" style="font-size:.82em">كلما زادت سرعة الانطلاق زاد بُعد مكان السقوط؛ وعند نحو 8 كم/ث لا تجد الكرة مكانًا لتسقط فيه فتدور حول الأرض.</div></div>
    <div class="pa" style="display:none"><div class="mini"><button class="btn drop">⬇ أسقط الأجسام معًا</button></div>
      <div class="muted" style="font-size:.82em">الورقة المطوية تسقط أسرع من المنبسطة. عندما تتساوى مقاومة الهواء مع الوزن يسقط الجسم بسرعة ثابتة (السرعة الحدّية).</div></div>
    <div class="fb msg"></div>`;
  const q = s => body.querySelector(s); let mode = 'orbit', paths = [], cur = null, A = null;
  const GM = 398600, RE = 6371, H0 = 400, SC = 150 / RE;
  function launch() { const v = +q('.v').value; cur = { x: 0, y: RE + H0, vx: v, vy: 0, pts: [], t: 0, v, done: false }; }
  function stepOrbit(dt) { if (!cur || cur.done) return; for (let k = 0; k < 40; k++) { const r = Math.hypot(cur.x, cur.y), a = -GM / (r * r * r); cur.vx += a * cur.x * dt; cur.vy += a * cur.y * dt; cur.x += cur.vx * dt; cur.y += cur.vy * dt; cur.t += dt;
      if (k % 4 === 0) cur.pts.push([cur.x, cur.y]); if (r < RE) { cur.done = true; paths.push(cur); msgFor(cur, false); return; } if (cur.t > 6000) { cur.done = true; paths.push(cur); msgFor(cur, true); return; } } }
  function msgFor(p, orbit) { _fb10(q('.msg'), orbit, orbit ? `بسرعة ${p.v} كم/ث لم تجد الكرة مكانًا تسقط فيه، فاستمرت في <b>السقوط حول الأرض</b>: هذه حركة القمر الاصطناعي، والقوة المركزية هي جاذبية الأرض.` : `بسرعة ${p.v} كم/ث سقطت الكرة على الأرض في مسار منحنٍ. زِد السرعة ليبتعد مكان السقوط.`); }
  function startAir() { A = { t: 0, o: [{ n: 'ورقة منبسطة', vt: 1.2, col: '#f8fafc', y: 0, v: 0, h: [] }, { n: 'ورقة مطوية', vt: 4.5, col: '#e2e8f0', y: 0, v: 0, h: [] }, { n: 'كرة', vt: 25, col: '#f97316', y: 0, v: 0, h: [] }] }; }
  function draw(c, st) {
    if (mode === 'orbit') {
      c.fillStyle = FX.lg(c, 0, st.y0, 0, st.y1, [[0, '#020617'], [1, '#0b1a3a']]); c.fillRect(st.x0, st.y0, st.x1 - st.x0, st.y1 - st.y0);
      for (let k = 0; k < 120; k++) { c.fillStyle = `rgba(255,255,255,${.25 + _R10(k) * .6})`; c.fillRect(st.x0 + _R10(k + 1) * (st.x1 - st.x0), st.y0 + _R10(k + 5) * (st.y1 - st.y0), 1.5, 1.5); }
      const cx = 380, cy = 250; c.fillStyle = FX.rg(c, cx - 50, cy - 60, 20, 160, [[0, '#7dd3fc'], [.6, '#1d4ed8'], [1, '#172554']]); c.beginPath(); c.arc(cx, cy, 150, 0, 7); c.fill();
      c.fillStyle = 'rgba(34,197,94,.7)'; [[-40, -50, 50, 30], [30, 20, 40, 50], [-60, 40, 30, 22], [60, -70, 28, 20]].forEach(([dx, dy, rx, ry]) => { c.beginPath(); c.ellipse(cx + dx, cy + dy, rx, ry, .4, 0, 7); c.fill(); });
      c.strokeStyle = 'rgba(125,211,252,.4)'; c.lineWidth = 6; c.beginPath(); c.arc(cx, cy, 154, 0, 7); c.stroke();
      // mountain + cannon at top
      c.fillStyle = '#78716c'; c.beginPath(); c.moveTo(cx - 26, cy - 146); c.lineTo(cx, cy - 150 - H0 * SC - 2); c.lineTo(cx + 26, cy - 146); c.fill(); FX.person(c, cx - 6, cy - 150 - H0 * SC, 26, 0, { color: '#2563eb' });
      stepOrbit(st.dt * 6);
      paths.concat(cur && !cur.done ? [cur] : []).forEach((p, i) => { c.strokeStyle = p === cur && !p.done ? '#fde047' : `hsl(${(i * 55) % 360},90%,65%)`; c.lineWidth = 2.5; c.beginPath(); c.moveTo(cx, cy - (RE + H0) * SC); p.pts.forEach(pt => c.lineTo(cx + pt[0] * SC, cy - pt[1] * SC)); c.stroke();
        const l = p.pts[p.pts.length - 1]; if (l) { c.fillStyle = '#f8fafc'; c.beginPath(); c.arc(cx + l[0] * SC, cy - l[1] * SC, 4, 0, 7); c.fill(); } });
      if (cur && !cur.done && cur.pts.length) { const l = cur.pts[cur.pts.length - 1]; FX.arrow(c, cx + l[0] * SC, cy - l[1] * SC, cx + l[0] * SC * .82, cy - l[1] * SC * .82, '#ef4444', 3); }
      FX.tag(c, 'جاذبية الأرض (القوة المركزية) نحو المركز', cx, 470, { size: 13, bg: 'rgba(239,68,68,.9)' });
      if (!paths.length && !cur) FX.hint(c, cx, cy - 150 - H0 * SC - 10, st.t, 'اختر السرعة ثم «اقذف»', { r: 16 });
    } else {
      FX.room(c, st, 440, { window: false });
      c.fillStyle = '#e2e8f0'; c.fillRect(60, 40, 8, 400); for (let k = 0; k <= 10; k++) { c.fillStyle = '#334155'; c.fillRect(68, 40 + k * 36, 10, 2); FX.txt(c, (10 - k) * 0.5 + ' م', 100, 41 + k * 36, { mono: true, size: 10, color: '#334155' }); }
      if (A) { A.t += st.dt * .7; A.o.forEach(o => { if (o.y < 5) { const g = 9.8, k = g / (o.vt * o.vt); o.v += (g - k * o.v * o.v) * st.dt * .7; o.y = Math.min(5, o.y + o.v * st.dt * .7); } if (!o.h.length || A.t - o.h[o.h.length - 1][0] > .04) o.h.push([A.t, o.v]); }); }
      const objs = A ? A.o : [{ n: 'ورقة منبسطة', y: 0 }, { n: 'ورقة مطوية', y: 0 }, { n: 'كرة', y: 0 }];
      objs.forEach((o, i) => { const x = 170 + i * 110, y = 40 + (o.y || 0) / 5 * 360;
        if (i === 0) { c.save(); c.translate(x, y); c.rotate(Math.sin((A ? A.t : 0) * 4) * .3); c.fillStyle = '#f8fafc'; c.strokeStyle = '#94a3b8'; c.fillRect(-36, -2, 72, 4); c.strokeRect(-36, -2, 72, 4); c.restore(); }
        else if (i === 1) { c.fillStyle = FX.rg(c, x - 4, y - 4, 2, 14, [[0, '#ffffff'], [1, '#cbd5e1']]); c.beginPath(); for (let k = 0; k < 9; k++) { const a = k / 9 * 6.283, r = 11 + (k % 2) * 3; c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } c.fill(); }
        else FX.ball(c, x, y, 12, 'red', 0);
        FX.txt(c, o.n, x, 26, { size: 12, color: '#0f172a', w: 700 }); });
      FX.graph(c, 480, 40, 270, 230, { xmax: 2, ymax: 10, xstep: .5, ystep: 2, xlab: 'الزمن (ث)', ylab: 'السرعة (م/ث)', series: A ? A.o.map((o, i) => ({ pts: o.h, col: ['#64748b', '#2563eb', '#f97316'][i] })) : [] });
      if (A) { const o = A.o[0]; if (o.v > o.vt * .95) FX.tag(c, 'الورقة المنبسطة بلغت سرعتها الحدّية ≈ ' + o.vt + ' م/ث', 610, 300, { size: 12, bg: '#16a34a' }); } else FX.hint(c, 280, 220, st.t, 'اضغط «أسقط الأجسام معًا»', { r: 1 });
    }
  }
  body.querySelectorAll('.md').forEach(b => b.onclick = () => { mode = b.dataset.m; body.querySelectorAll('.md').forEach(o => o.classList.toggle('alt', o !== b)); q('.po').style.display = mode === 'orbit' ? '' : 'none'; q('.pa').style.display = mode === 'air' ? '' : 'none'; q('.msg').className = 'fb msg'; });
  q('.v').addEventListener('input', () => q('.vv').textContent = q('.v').value);
  q('.go').onclick = () => { if (cur && !cur.done) return; launch(); }; q('.clr').onclick = () => { paths = []; cur = null; q('.msg').className = 'fb msg'; };
  q('.drop').onclick = () => { startAir(); setTimeout(() => _fb10(q('.msg'), true, 'بدأت الأجسام بالتسارع نفسه تقريبًا، ثم زادت مقاومة الهواء بزيادة السرعة حتى ساوت الوزن؛ فثبتت السرعة (السرعة الحدّية). الورقة المنبسطة أقلها سرعة حدّية لأن شكلها يزيد مقاومة الهواء.'), 2600); };
  FX.stage(host, 760, 480, draw);
}

/* ---------- LAB 7: measuring a force pair with two spring scales (p126) ---------- */
function labPair(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🤝 قياس زوجي القوة</h3>`;
  const S = stepsList(panel, ['ثبّت خطافي الميزانين معًا', 'اسحب ميزانك (اسحب المقبض) وزميلك يسحب الآخر', 'سجّل القراءتين، ثم اسحبا بقوة أكبر', 'حاول أن تجعل قراءة ميزانك أقل من ميزان زميلك']);
  panel.insertAdjacentHTML('beforeend', `<label class="rng">👦 سحب زميلك <input type="range" class="pf" min="0" max="20" value="0"><b class="pfv">ثابت</b></label>
    <div class="mini"><button class="btn rec">📋 سجّل القراءتين</button><button class="btn alt rs">↺</button></div>
    <table class="data"><thead><tr><th>#</th><th>ميزانك (N)</th><th>ميزان زميلك (N)</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="rv" data-a="القراءتان متساويتان دائمًا مهما تغيرت قوة السحب، ولا يمكن أن تكون إحداهما أقل من الأخرى؛ فقوة الفعل وقوة رد الفعل متساويتان مقدارًا ومتعاكستان اتجاهًا (القانون الثالث لنيوتن).">التحليل: ماذا تستنتج؟ وكيف توضح التجربة القانون الثالث لنيوتن؟</div>`);
  const q = s => body.querySelector(s); let pull = 0, n = 0, hook = 380;
  function draw(c, st) {
    FX.room(c, st, 380, { window: false });
    const pf = +q('.pf').value, F = Math.max(pull, pf); const shift = (pf - pull) * 3; hook += ((380 + shift) - hook) * Math.min(1, st.dt * 6);
    const ext = F * 3.2;
    _scale(c, 120 - ext * .0, 230, hook, 230, F, 20); _scale(c, 640 + ext * .0, 230, hook, 230, F, 20, { label: false });
    FX.tag(c, 'ميزانك: ' + r1(F) + ' N', 210, 180, { size: 15, bg: '#2563eb' }); FX.tag(c, 'ميزان زميلك: ' + r1(F) + ' N', 560, 180, { size: 15, bg: '#dc2626' });
    FX.person(c, 70, 380, 150, 0, { color: '#2563eb', dir: 1 }); FX.person(c, 700, 380, 150, 0, { color: '#dc2626', dir: -1 });
    c.fillStyle = '#e0ac69'; c.beginPath(); c.arc(112, 230, 12, 0, 7); c.fill(); c.beginPath(); c.arc(648, 230, 12, 0, 7); c.fill();
    if (F > 0) { FX.arrow(c, hook - 10, 290, hook - 10 - F * 5, 290, '#2563eb', 5); FX.arrow(c, hook + 10, 290, hook + 10 + F * 5, 290, '#dc2626', 5); FX.txt(c, 'فعل', hook - 30 - F * 2.5, 312, { size: 13, color: '#1d4ed8' }); FX.txt(c, 'رد فعل', hook + 30 + F * 2.5, 312, { size: 13, color: '#b91c1c' }); }
    st.hit({ id: 'mine', x: 70, y: 200, w: 70, h: 60, drag: { start() { }, move(p) { pull = FX.clamp((120 - p.x) / 4 + 10, 0, 20); }, end() { } } });
    if (pull === 0) FX.hint(c, 112, 230, st.t, 'اسحب مقبض ميزانك نحو اليسار', { r: 22, dx: 80 });
    S.set(n === 0 ? (F === 0 ? 1 : 2) : n < 3 ? 2 : 3);
  }
  q('.pf').addEventListener('input', () => q('.pfv').textContent = +q('.pf').value ? q('.pf').value + ' N' : 'ثابت');
  q('.rec').onclick = () => { const F = Math.max(pull, +q('.pf').value); if (!F) { toast('اسحب الميزان أولًا'); return; } n++; q('.tb').insertAdjacentHTML('beforeend', `<tr><td>${n}</td><td>${r1(F)}</td><td>${r1(F)}</td></tr>`); beep(true); };
  q('.rs').onclick = () => { pull = 0; n = 0; q('.pf').value = 0; q('.pfv').textContent = 'ثابت'; q('.tb').innerHTML = ''; };
  FX.stage(host, 760, 420, draw, { vy: 20 });
}

/* ---------- LAB 8: action–reaction on sleds (Self-check Q4) ---------- */
function labSkaters(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>⛸ الفعل ورد الفعل على المزلاج</h3>
    <label class="rng">كتلتك <input type="range" class="m1" min="30" max="90" step="5" value="60"><b class="m1v">60</b> كجم</label>
    <label class="rng">كتلة الطفل <input type="range" class="m2" min="15" max="90" step="5" value="30"><b class="m2v">30</b> كجم</label>
    <label class="rng">قوة الدفع <input type="range" class="f" min="30" max="180" step="30" value="90"><b class="fv">90</b> N</label>
    <div class="mini"><button class="btn go">🤲 تدافعا</button><button class="btn alt rs">↺</button></div>
    <div class="fxro"><div>تسارعك<b class="a1">—</b></div><div>تسارع الطفل<b class="a2">—</b></div><div>النسبة<b class="ra">—</b></div></div>
    <div class="fb msg"></div>`;
  const q = s => body.querySelector(s), g = s => +q(s).value; let x1 = 330, x2 = 430, v1 = 0, v2 = 0, t = -1;
  function draw(c, st) {
    c.fillStyle = FX.lg(c, 0, st.y0, 0, 240, [[0, '#93c5fd'], [1, '#e0f2fe']]); c.fillRect(st.x0, st.y0, st.x1 - st.x0, 240 - st.y0);
    c.fillStyle = '#cbd5e1'; c.beginPath(); c.moveTo(st.x0, 240); for (let x = st.x0; x <= st.x1; x += 40) c.lineTo(x, 190 + Math.sin(x * .01) * 30); c.lineTo(st.x1, 240); c.fill();
    c.fillStyle = FX.lg(c, 0, 240, 0, st.y1, [[0, '#f0f9ff'], [1, '#bae6fd']]); c.fillRect(st.x0, 240, st.x1 - st.x0, st.y1 - 240); c.strokeStyle = 'rgba(255,255,255,.8)'; for (let k = 0; k < 20; k++) { c.beginPath(); c.moveTo(st.x0 + k * 60, 300 + (k % 3) * 40); c.lineTo(st.x0 + k * 60 + 40, 304 + (k % 3) * 40); c.stroke(); }
    if (t >= 0) { t += st.dt; const F = g('.f'); if (t < .4) { v1 -= F / g('.m1') * st.dt; v2 += F / g('.m2') * st.dt; } x1 += v1 * 40 * st.dt; x2 += v2 * 40 * st.dt; v1 *= .998; v2 *= .998; }
    const sled = (x, col) => { c.fillStyle = col; FX.rr(c, x - 50, 352, 100, 14, 5); c.fill(); c.strokeStyle = '#475569'; c.lineWidth = 4; c.beginPath(); c.moveTo(x - 56, 376); c.lineTo(x + 50, 376); c.quadraticCurveTo(x + 66, 376, x + 64, 360); c.stroke(); c.beginPath(); c.moveTo(x - 30, 366); c.lineTo(x - 30, 376); c.moveTo(x + 30, 366); c.lineTo(x + 30, 376); c.stroke(); };
    const h1 = 120 + (g('.m1') - 30) * .9, h2 = 120 + (g('.m2') - 30) * .9;
    sled(x1, '#dc2626'); sled(x2, '#2563eb'); FX.person(c, x1, 352, h1, 0, { color: '#dc2626', dir: 1 }); FX.person(c, x2, 352, h2, 0, { color: '#2563eb', dir: -1 });
    if (t >= 0 && t < .4) { FX.arrow(c, x2 - 20, 260, x2 + 40, 260, '#2563eb', 5); FX.arrow(c, x1 + 20, 260, x1 - 40, 260, '#dc2626', 5); FX.tag(c, g('.f') + ' N', x1 - 10, 236, { size: 12, bg: '#dc2626' }); FX.tag(c, g('.f') + ' N', x2 + 10, 236, { size: 12, bg: '#2563eb' }); }
    FX.tag(c, 'أنت ' + g('.m1') + ' كجم', x1, 352 - h1 - 24, { size: 12 }); FX.tag(c, 'الطفل ' + g('.m2') + ' كجم', x2, 352 - h2 - 24, { size: 12 });
    if (t < 0) FX.hint(c, 380, 300, st.t, 'اضغط «تدافعا»', { r: 1 });
    if (t > 3) t = 3.0001;
  }
  function upd() { ['m1', 'm2', 'f'].forEach(k => q('.' + k + 'v').textContent = g('.' + k)); }
  q('.go').onclick = () => { x1 = 330; x2 = 430; v1 = v2 = 0; t = 0; const a1 = g('.f') / g('.m1'), a2 = g('.f') / g('.m2'); q('.a1').textContent = r2_(a1); q('.a2').textContent = r2_(a2); q('.ra').textContent = r2_(a2 / a1) + ' : 1';
    _fb10(q('.msg'), true, `القوتان متساويتان (${g('.f')} N) ومتعاكستان، لكن تسارع كل منكما = ق ÷ ك: أنت ${r2_(a1)} م/ث²، والطفل ${r2_(a2)} م/ث². الأقل كتلة تسارعه أكبر، ونسبة تسارع الطفل إلى تسارعك = ${r2_(a2 / a1)} : 1.`); };
  ['.m1', '.m2', '.f'].forEach(s => q(s).addEventListener('input', () => { upd(); t = -1; x1 = 330; x2 = 430; v1 = v2 = 0; }));
  q('.rs').onclick = () => { t = -1; x1 = 330; x2 = 430; v1 = v2 = 0; q('.msg').className = 'fb msg'; };
  upd(); FX.stage(host, 760, 420, draw, { vy: 20 });
}

/* ---------- LAB 9: rocket launch (Fig. 17) ---------- */
function labRocket(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🚀 إطلاق الصاروخ</h3>
    <label class="rng">قوة الدفع <input type="range" class="th" min="0" max="30" step="2" value="16"><b class="thv">16000</b> N</label>
    <div class="muted" style="font-size:.84em">كتلة الصاروخ 1000 كجم، فوزنه ≈ 9800 N.</div>
    <div class="mini"><button class="btn orange go">🔥 أشعل المحركات</button><button class="btn alt rs">↺</button></div>
    <div class="fxro"><div>المحصلة<b class="net">—</b></div><div>التسارع<b class="acc">—</b></div><div>الارتفاع<b class="altv">0 م</b></div></div>
    <div class="fb msg"></div>`;
  const q = s => body.querySelector(s); const M = 1000, W = 9800; let on = false, y = 0, v = 0, t = 0; const P = FX.parts(), gas = [];
  for (let k = 0; k < 26; k++) gas.push({ x: Math.random() * 60 - 30, y: Math.random() * 70, vx: (Math.random() - .5) * 160, vy: (Math.random() - .5) * 160 });
  function draw(c, st) {
    const T = +q('.th').value * 1000, n = T - W, a = on ? Math.max(n, y > 0 || n > 0 ? n : 0) / M : 0;
    if (on) { t += st.dt; if (n > 0 || y > 0) { v += (on ? n / M : -9.8) * st.dt; y = Math.max(0, y + v * st.dt * 1); if (y === 0 && v < 0) v = 0; } }
    const cam = Math.max(0, y * 6 - 120);
    c.fillStyle = FX.lg(c, 0, st.y0, 0, st.y1, [[0, FX.mix('#7cc4f2', '#020617', FX.clamp(cam / 3000, 0, 1))], [1, FX.mix('#e0f2fe', '#1e293b', FX.clamp(cam / 3000, 0, 1))]]); c.fillRect(st.x0, st.y0, st.x1 - st.x0, st.y1 - st.y0);
    c.save(); c.translate(0, cam);
    c.fillStyle = '#a8a29e'; c.fillRect(st.x0, 420, st.x1 - st.x0, 200); c.fillStyle = '#57534e'; c.fillRect(300, 400, 160, 22); c.fillStyle = '#78716c'; for (let k = 0; k < 8; k++) c.fillRect(480, 160 + k * 30, 30, 4); c.fillRect(490, 150, 8, 270);
    c.restore();
    const ry = 400 - y * 6 + cam, rx = 380;
    // rocket body
    c.fillStyle = FX.lg(c, rx - 30, 0, rx + 30, 0, [[0, '#cbd5e1'], [.45, '#ffffff'], [1, '#94a3b8']]); c.beginPath(); c.moveTo(rx - 28, ry - 30); c.lineTo(rx - 28, ry - 220); c.quadraticCurveTo(rx, ry - 300, rx + 28, ry - 220); c.lineTo(rx + 28, ry - 30); c.closePath(); c.fill();
    c.fillStyle = '#dc2626'; c.beginPath(); c.moveTo(rx - 28, ry - 80); c.lineTo(rx - 56, ry - 20); c.lineTo(rx - 28, ry - 30); c.fill(); c.beginPath(); c.moveTo(rx + 28, ry - 80); c.lineTo(rx + 56, ry - 20); c.lineTo(rx + 28, ry - 30); c.fill();
    c.fillStyle = '#1e3a8a'; c.beginPath(); c.arc(rx, ry - 200, 12, 0, 7); c.fill();
    // engine chamber cut-away
    c.fillStyle = '#334155'; FX.rr(c, rx - 34, ry - 110, 68, 80, 6); c.fill(); c.fillStyle = '#0f172a'; c.fillRect(rx - 28, ry - 104, 56, 68); c.fillStyle = '#475569'; c.beginPath(); c.moveTo(rx - 16, ry - 36); c.lineTo(rx - 26, ry - 10); c.lineTo(rx + 26, ry - 10); c.lineTo(rx + 16, ry - 36); c.fill();
    gas.forEach(gp => { if (on && T > 0) { gp.x += gp.vx * st.dt; gp.y += gp.vy * st.dt; if (gp.x < -26 || gp.x > 26) gp.vx *= -1; if (gp.y < 0) gp.vy = Math.abs(gp.vy); if (gp.y > 66) { if (Math.abs(gp.x) < 14) { P.add({ k: 'smoke', x: rx + gp.x, y: ry - 10, vx: gp.x * 2, vy: 160 + Math.random() * 80, r: 10, grow: 40, life: 1.4, s: Math.random() * 6, a: .8 }); gp.y = Math.random() * 20; } else gp.vy = -Math.abs(gp.vy); } }
      c.fillStyle = on ? '#fbbf24' : '#64748b'; c.beginPath(); c.arc(rx + gp.x, ry - 104 + gp.y, 3.2, 0, 7); c.fill(); });
    if (on && T > 0) { FX.flame(c, rx, ry + 60 * (T / 30000), 1 + T / 30000, st.t, { blue: false }); }
    P.step(st.dt); P.draw(c);
    // force arrows
    FX.arrow(c, rx + 90, ry - 160, rx + 90, ry - 160 + W / 200, '#64748b', 6); FX.txt(c, 'الوزن 9800 N', rx + 160, ry - 130, { size: 13, color: '#0f172a', w: 700 });
    if (T > 0) { FX.arrow(c, rx - 90, ry - 60, rx - 90, ry - 60 - T / 200, '#ea580c', 6); FX.txt(c, 'قوة الدفع (رد الفعل) ' + T + ' N', rx - 170, ry - 80 - T / 400, { size: 13, color: '#9a3412', w: 700 }); }
    q('.net').textContent = (n >= 0 ? '↑ ' : '↓ ') + Math.abs(n) + ' N'; q('.acc').textContent = on ? r2_(Math.max(0, n) / M) + ' م/ث²' : '—'; q('.altv').textContent = Math.round(y) + ' م';
    if (!on) FX.hint(c, rx, ry - 70, st.t, 'جزيئات الغاز داخل حجرة المحرك', { r: 40 });
  }
  q('.th').addEventListener('input', () => q('.thv').textContent = +q('.th').value * 1000);
  q('.go').onclick = () => { on = true; t = 0; const T = +q('.th').value * 1000; beep(true); _fb10(q('.msg'), T > W, T > W ? 'يدفع المحرك جزيئات الغاز إلى أسفل (فعل)، فتدفع الغازات الصاروخ إلى أعلى (رد فعل = قوة الدفع). قوة الدفع أكبر من الوزن فالمحصلة إلى أعلى ويتسارع الصاروخ.' : 'قوة الدفع لا تزيد على الوزن، فالمحصلة لا تكفي لرفع الصاروخ. زِد قوة الدفع إلى أكثر من 9800 N.'); };
  q('.rs').onclick = () => { on = false; y = 0; v = 0; q('.msg').className = 'fb msg'; };
  FX.stage(host, 760, 460, draw);
}

/* ---------- LAB 10: scale in an elevator & weightlessness (Fig. 18) ---------- */
function labElevator(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🛗 الميزان في المصعد</h3>
    <div class="seg">${[['rest', 'ساكن'], ['up', 'يتسارع لأعلى'], ['const', 'يتحرك بسرعة ثابتة'], ['down', 'يتسارع لأسفل'], ['free', 'سقوط حر ✂']].map((m, k) => `<button class="btn ${k ? 'alt' : ''} md" data-m="${m[0]}">${m[1]}</button>`).join('')}</div>
    <div class="fxro"><div>قراءة الميزان<b class="rd">588 N</b></div><div>قوة الجاذبية<b>588 N</b></div></div>
    <table class="data"><thead><tr><th>حركة المصعد</th><th>قراءة الميزان</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="fb msg"></div>`;
  const q = s => body.querySelector(s); const m = 60, g = 9.8; let mode = 'rest', y = 0, v = 0, shown = 588, seen = new Set(), ball = 0;
  const A = { rest: 0, up: 2, const: 0, down: -2, free: -9.8 };
  function draw(c, st) {
    const a = A[mode]; if (mode === 'const') v = -2; else if (mode === 'rest') v = 0; else v += a * st.dt;
    v = FX.clamp(v, -14, 6); y += v * st.dt * 30; if (y < -2000 || y > 2000) { y = 0; }
    const R = Math.max(0, m * (g + a)); shown += (R - shown) * Math.min(1, st.dt * 5);
    c.fillStyle = '#1f2937'; c.fillRect(st.x0, st.y0, st.x1 - st.x0, st.y1 - st.y0);
    for (let k = -2; k < 10; k++) { const yy = ((k * 120 + y) % 1200 + 1200) % 1200 - 200; c.fillStyle = '#374151'; c.fillRect(180, yy, 400, 6); FX.txt(c, 'الطابق', 140, yy + 3, { size: 11, color: '#9ca3af' }); }
    c.strokeStyle = '#6b7280'; c.lineWidth = 2; c.beginPath(); c.moveTo(380, st.y0); c.lineTo(380, 60); c.stroke(); if (mode === 'free') { c.strokeStyle = '#ef4444'; c.beginPath(); c.moveTo(370, 40); c.lineTo(390, 54); c.stroke(); }
    // car
    c.fillStyle = FX.lg(c, 240, 0, 520, 0, [[0, '#94a3b8'], [.5, '#e2e8f0'], [1, '#94a3b8']]); c.fillRect(240, 60, 280, 360); c.fillStyle = '#f8fafc'; c.fillRect(256, 76, 248, 330);
    c.fillStyle = '#cbd5e1'; c.fillRect(256, 380, 248, 26);
    // scale + person
    const sx = 330, sy = 380; c.fillStyle = FX.lg(c, 0, sy - 22, 0, sy, [[0, '#f1f5f9'], [1, '#94a3b8']]); FX.rr(c, sx - 60, sy - 22, 120, 22, 6); c.fill(); FX.lcd(c, sx - 36, sy - 18, 72, 14, Math.round(shown) + ' N', {});
    const lift = mode === 'free' ? Math.min(30, (st.t % 100) * 0 + 6) : 0; FX.person(c, sx, sy - 22 - lift, 190, 0, { color: '#2563eb', dir: 1 });
    // ball released
    if (mode === 'free') { ball = Math.min(1, ball + st.dt); FX.ball(c, 450, 230 + Math.sin(st.t * 2) * 2, 14, 'tennis', st.t); FX.tag(c, 'الكرة تطفو بالنسبة إليك', 450, 196, { size: 12, bg: '#16a34a' }); } else { FX.ball(c, 450, 392, 14, 'tennis', 0); }
    FX.arrow(c, 210, 200, 210, 200 + 588 / 5, '#ef4444', 6); FX.txt(c, 'الجاذبية', 210, 340, { color: '#fecaca', size: 13 });
    if (R > 1) { FX.arrow(c, 240 - 0, 330, 240, 330 - R / 5, '#22c55e', 6); FX.txt(c, 'قوة الميزان', 240, 340 - R / 5 - 16, { color: '#bbf7d0', size: 13 }); }
    if (Math.abs(v) > .1) FX.arrow(c, 560, 240, 560, 240 - Math.sign(v) * 60, '#fde047', 4);
    q('.rd').textContent = Math.round(shown) + ' N';
  }
  const NAMES = { rest: 'ساكن', up: 'يتسارع لأعلى', const: 'سرعة ثابتة', down: 'يتسارع لأسفل', free: 'سقوط حر' };
  body.querySelectorAll('.md').forEach(b => b.onclick = () => { mode = b.dataset.m; v = mode === 'free' ? 0 : v; body.querySelectorAll('.md').forEach(o => o.classList.toggle('alt', o !== b)); const R = Math.round(m * (g + A[mode]));
    if (!seen.has(mode)) { seen.add(mode); q('.tb').insertAdjacentHTML('beforeend', `<tr><td>${NAMES[mode]}</td><td><b>${R} N</b></td></tr>`); }
    _fb10(q('.msg'), true, mode === 'free' ? 'في السقوط الحر يسقط جسمك والميزان معًا، فلا يدفعك الميزان إلى أعلى ولا تدفعه؛ فيشير إلى <b>الصفر</b> وتبدو بلا وزن، مع أن الجاذبية ما زالت تؤثر فيك (588 N).' : mode === 'rest' || mode === 'const' ? 'يدفعك الميزان إلى أعلى بقوة تساوي وزنك (القانون الثالث)، فالقراءة 588 N.' : mode === 'up' ? 'يتسارع المصعد لأعلى فيدفعك الميزان بقوة أكبر من وزنك، فتزداد القراءة.' : 'يتسارع المصعد لأسفل فيدفعك الميزان بقوة أقل من وزنك، فتقل القراءة.'); });
  FX.stage(host, 760, 440, draw);
}

/* ---------- LAB 11: modelling motion in two dimensions (inquiry p128) ---------- */
function labSled2D(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🥏 نمذجة الحركة في بُعدين</h3>`;
  const S = stepsList(panel, ['اختر المسار على الأرضية', 'اسحب بالميزان الأمامي (نحو الباب) والجانبي معًا', 'انقل كرة الجولف على المسار دون أن تسقط', 'قارن القوتين في المسار المستقيم والقطري']);
  panel.insertAdjacentHTML('beforeend', `<div class="seg"><button class="btn pth" data-p="0">مستقيم ثم يمين</button><button class="btn alt pth" data-p="1">قطري</button><button class="btn alt pth" data-p="2">متعرّج</button></div>
    <div class="row" style="gap:.4em"><button class="btn green fw" style="flex:1">⬆ الميزان الأمامي</button><button class="btn orange sd" style="flex:1">➡ الميزان الجانبي</button><button class="btn navy sdl" style="flex:1">⬅ جانبي</button></div>
    <div class="fxro"><div>الأمامي<b class="f1">0 N</b></div><div>الجانبي<b class="f2">0 N</b></div><div>السرعة<b class="sp">0</b></div><div>الزمن<b class="tm">0</b></div></div>
    <div class="mini"><button class="btn alt rs">↺ ابدأ من جديد</button></div><div class="fb msg"></div>`);
  const PATHS = [[[380, 420], [380, 200], [620, 200]], [[220, 420], [560, 120]], [[300, 430], [300, 320], [480, 230], [300, 140], [480, 60]]];
  const q = s => body.querySelector(s); let P = 0, pos, vel, f1 = 0, f2 = 0, hold = { fw: 0, sd: 0, sdl: 0 }, t = 0, done = false, ball = true, lastV = [0, 0], warn = 0, maxF = [0, 0], started = false;
  function reset() { const p = PATHS[P][0]; pos = [p[0], p[1]]; vel = [0, 0]; t = 0; done = false; ball = true; started = false; maxF = [0, 0]; q('.msg').className = 'fb msg'; }
  function distToPath(x, y) { const pts = PATHS[P]; let best = 1e9; for (let i = 0; i < pts.length - 1; i++) { const [ax, ay] = pts[i], [bx, by] = pts[i + 1], dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy, k = FX.clamp(((x - ax) * dx + (y - ay) * dy) / L, 0, 1); best = Math.min(best, Math.hypot(x - ax - k * dx, y - ay - k * dy)); } return best; }
  function draw(c, st) {
    c.fillStyle = '#d6c7a8'; c.fillRect(st.x0, st.y0, st.x1 - st.x0, st.y1 - st.y0);
    for (let x = Math.floor(st.x0 / 80) * 80; x < st.x1; x += 80) for (let y = Math.floor(st.y0 / 80) * 80; y < st.y1; y += 80) { c.fillStyle = ((x + y) / 80) % 2 ? '#e7dcc4' : '#ddd0b2'; c.fillRect(x, y, 80, 80); c.strokeStyle = 'rgba(120,100,70,.25)'; c.strokeRect(x, y, 80, 80); }
    c.fillStyle = '#7c5a3a'; c.fillRect(300, st.y0, 160, 20); FX.txt(c, 'الباب', 380, st.y0 + 32, { size: 13, color: '#3f2a14', w: 700 });
    const pts = PATHS[P]; c.strokeStyle = '#16a34a'; c.lineWidth = 34; c.globalAlpha = .25; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); c.globalAlpha = 1;
    c.strokeStyle = '#15803d'; c.lineWidth = 4; c.setLineDash([]); [-17, 17].forEach(o => { c.beginPath(); pts.forEach((p, i) => { const q2 = pts[Math.min(i + 1, pts.length - 1)], q0 = pts[Math.max(i - 1, 0)], dx = q2[0] - q0[0], dy = q2[1] - q0[1], L = Math.hypot(dx, dy) || 1; const x = p[0] - dy / L * o, y = p[1] + dx / L * o; i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke(); });
    const end = pts[pts.length - 1]; c.fillStyle = '#dc2626'; c.beginPath(); c.arc(end[0], end[1], 10, 0, 7); c.fill(); FX.tag(c, 'النهاية', end[0], end[1] - 24, { size: 12, bg: '#dc2626' });
    // forces
    const tgt1 = hold.fw ? 2 : 0, tgt2 = hold.sd ? 2 : hold.sdl ? -2 : 0; f1 += (tgt1 - f1) * Math.min(1, st.dt * 3); f2 += (tgt2 - f2) * Math.min(1, st.dt * 3);
    if (!done && ball) { const m = 1.2, mu = 1.0; let Fx = f2, Fy = -f1; const sp = Math.hypot(vel[0], vel[1]); if (sp > .01) { Fx -= mu * vel[0] / sp; Fy -= mu * vel[1] / sp; } else { const Fm = Math.hypot(Fx, Fy); if (Fm < mu) { Fx = 0; Fy = 0; } }
      const ax = Fx / m, ay = Fy / m, ov = vel.slice(); vel[0] += ax * st.dt; vel[1] += ay * st.dt; if (ov[0] * vel[0] + ov[1] * vel[1] < 0 && !hold.fw && !hold.sd && !hold.sdl) vel = [0, 0];
      const sp2 = Math.hypot(vel[0], vel[1]); if (sp2 > 1.6) { vel[0] *= 1.6 / sp2; vel[1] *= 1.6 / sp2; }
      pos[0] += vel[0] * st.dt * 60; pos[1] += vel[1] * st.dt * 60; if (f1 > .2 || Math.abs(f2) > .2) started = true; if (started) t += st.dt; maxF = [Math.max(maxF[0], f1), Math.max(maxF[1], Math.abs(f2))];
      const lat = sp2 > .05 ? Math.abs(vel[0] * ay - vel[1] * ax) / sp2 : 0; if (sp2 > 1.1 && lat > 1.2) { ball = false; _fb10(q('.msg'), false, 'سقطت الكرة! انعطفت بسرعة كبيرة فتغيّر اتجاه الحركة فجأة. خفّف السرعة قبل الانعطاف.'); }
      if (distToPath(pos[0], pos[1]) > 24) { warn += st.dt; if (warn > .6) { ball = false; _fb10(q('.msg'), false, 'خرج المزلاج عن المسار. أعد المحاولة ووازن بين القوتين.'); } } else warn = 0;
      if (Math.hypot(pos[0] - end[0], pos[1] - end[1]) < 18) { done = true; _fb10(q('.msg'), true, `✔ وصلت الكرة إلى النهاية في ${t.toFixed(1)} ث. أقصى سحب أمامي ${maxF[0].toFixed(1)} N وجانبي ${maxF[1].toFixed(1)} N. عند جمع قوتين متعامدتين يتحرك المزلاج <b>قطريًّا</b> في اتجاه محصلتهما.`); } }
    // sled
    const [x, y] = pos; FX.shadow(c, x + 4, y + 6, 30, 10, .35); c.fillStyle = FX.rg(c, x - 8, y - 8, 4, 32, [[0, '#fef08a'], [1, '#ca8a04']]); c.beginPath(); c.arc(x, y, 26, 0, 7); c.fill(); c.strokeStyle = '#a16207'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, 20, 0, 7); c.stroke();
    if (ball) { c.fillStyle = FX.rg(c, x - 3, y - 4, 1, 10, [[0, '#ffffff'], [1, '#cbd5e1']]); c.beginPath(); c.arc(x, y, 9, 0, 7); c.fill(); } else { c.fillStyle = '#f8fafc'; c.beginPath(); c.arc(x + 46, y + 20, 9, 0, 7); c.fill(); }
    if (f1 > .05) { _scale(c, x, y - 190, x, y - 24, f1, 3, { label: false }); FX.tag(c, f1.toFixed(1) + ' N', x + 30, y - 110, { size: 12, bg: '#16a34a' }); }
    if (Math.abs(f2) > .05) { const sx = Math.sign(f2); _scale(c, x + sx * 190, y, x + sx * 24, y, Math.abs(f2), 3, { label: false }); FX.tag(c, Math.abs(f2).toFixed(1) + ' N', x + sx * 110, y + 26, { size: 12, bg: '#ea580c' }); }
    if (f1 > .05 || Math.abs(f2) > .05) FX.arrow(c, x, y, x + f2 * 22, y - f1 * 22, '#0f172a', 4);
    q('.f1').textContent = f1.toFixed(1) + ' N'; q('.f2').textContent = Math.abs(f2).toFixed(1) + ' N'; q('.sp').textContent = (Math.hypot(vel[0], vel[1])).toFixed(2); q('.tm').textContent = t.toFixed(1);
    if (!started) FX.hint(c, x, y, st.t, 'اضغط مطوّلًا على أزرار الميزانين', { r: 34 });
    S.set(!started ? 1 : done ? 3 : 2);
  }
  const holdBtn = (sel, k) => { const b = q(sel); b.addEventListener('pointerdown', e => { e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (_) { } hold[k] = 1; }); ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => b.addEventListener(ev, () => hold[k] = 0)); };
  holdBtn('.fw', 'fw'); holdBtn('.sd', 'sd'); holdBtn('.sdl', 'sdl');
  body.querySelectorAll('.pth').forEach(b => b.onclick = () => { P = +b.dataset.p; body.querySelectorAll('.pth').forEach(o => o.classList.toggle('alt', o !== b)); reset(); });
  q('.rs').onclick = reset; reset(); FX.stage(host, 760, 470, draw);
}
