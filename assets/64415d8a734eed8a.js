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

/* ===== Virtual labs — Chapter 8: Chemical reactions (realistic canvas labs, labfx.js) ===== */
function _fbk(el, ok, msg) { const keep = [...el.classList].filter(c => !['fb', 'show', 'good', 'poor'].includes(c)).join(' '); el.className = 'fb show ' + (ok ? 'good' : 'poor') + ' ' + keep; el.innerHTML = msg; beep(ok); }
function _sub(s) { return s.replace(/(\d+)/g, (m, d, i, str) => (i > 0 && /[A-Za-z)]/.test(str[i - 1])) ? '<sub>' + d + '</sub>' : d); }
const _R = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };

/* ---------- LAB 1: heating sugar (launch lab p43) ---------- */
function labSugar(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🧪 تسخين السكر</h3>`;
  const S = stepsList(panel, ['اسحب الملعقة وضع 3 جم من السكر في أنبوب الاختبار', 'اضغط على صمام الموقد لإشعال اللهب', 'اسحب الموقد إلى أسفل الأنبوب وسخّن 45 ثانية', 'راقب التغيرات ودوّنها في الجدول', 'أجب: هل المادة الباقية هي السكر نفسه؟']);
  panel.insertAdjacentHTML('beforeend', `<div class="fxro"><div>زمن التسخين<b class="tm">0</b></div><div>حالة المادة<b class="ph" style="font-family:inherit;font-size:1em;color:#fde68a">سكر صلب</b></div></div>
    <table class="data"><thead><tr><th>الزمن (ث)</th><th>ما ألاحظه</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="q" style="margin:0">هل المادة التي بقيت في الأنبوب هي السكر نفسه؟</div>
    <div class="mini"><button class="btn alt an" data-v="0">نعم، السكر نفسه</button><button class="btn alt an" data-v="1">لا، مادة جديدة</button></div>
    <div class="fb concl"></div>
    <div class="mini"><button class="btn alt bput">🥄 ضع السكر</button><button class="btn alt bfire">🔥 أشعل</button><button class="btn alt bmove">↔ حرّك اللهب</button><button class="btn alt rs">↺ إعادة</button></div>`);
  const OBS = [[0, 'سكر أبيض صلب (بلورات)'], [10, 'ينصهر السكر ويصبح سائلًا شفافًا مائلًا للصفرة'], [22, 'يتحول إلى اللون البني وتنبعث رائحة السكر المحروق ودخان'], [32, 'قطرات ماء تتكاثف على الجدار البارد قرب فوهة الأنبوب'], [42, 'تبقى مادة سوداء هشة مسامية (كربون)']];
  const PH = [[0, 'سكر صلب'], [10, 'سائل مصهور'], [22, 'كراميل بني'], [32, 'دخان + بخار ماء'], [42, 'كربون أسود']];
  const W = 640, H = 500, BY = 420, CLX = 400, CLY = 118, ANG = .45, L = 210, TW = 34;
  let sugar = 0, fire = false, t = 0, bx = 440, spoon = { x: 130, y: 398, home: true }, pour = 0, logged = -1, sparkT = -1, answered = false;
  const P = FX.parts();
  const local2world = (lx, ly) => [CLX + Math.cos(ANG) * lx - Math.sin(ANG) * (ly - 40), CLY + Math.sin(ANG) * lx + Math.cos(ANG) * (ly - 40)];
  const bottom = local2world(0, L - 12), mouth = local2world(0, 0);
  const stepNow = () => sugar < 1 ? 0 : !fire ? 1 : t < 45 ? 2 : !answered ? 4 : 5;
  function col() { const k = [[0, '#ffffff'], [10, '#fde68a'], [22, '#b45309'], [32, '#57351a'], [42, '#141414']]; for (let i = k.length - 1; i >= 0; i--) if (t >= k[i][0]) { const n = k[i + 1]; return n ? FX.mix(k[i][1], n[1], (t - k[i][0]) / (n[0] - k[i][0]) * .6) : k[i][1]; } }
  function contents(c, g) {
    if (sugar <= 0) return;
    const b = g.bottom, melt = FX.clamp(t / 10, 0, 1), lvl = 34 * Math.min(1, sugar) * (1 - melt * .35) + (t > 22 && t < 42 ? 6 + Math.sin(st.t * 9) * 2 : 0);
    if (t < 42) {
      if (melt > 0) { c.fillStyle = col(); c.fillRect(g.x, b - lvl, g.w, lvl + 2); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(g.x, b - lvl, g.w, 2); }
      const n = Math.round(70 * Math.min(1, sugar) * (1 - melt));
      for (let i = 0; i < n; i++) { const x = g.x + 3 + _R(i) * (g.w - 6), y = b - 2 - _R(i + 99) * 34 * Math.min(1, sugar); c.fillStyle = i % 3 ? '#ffffff' : '#e2e8f0'; c.fillRect(x, y, 4, 4); c.strokeStyle = 'rgba(148,163,184,.8)'; c.lineWidth = .6; c.strokeRect(x, y, 4, 4); }
      if (t > 12 && fire && heating()) for (let k = 0; k < 4; k++) { const ph = (st.t * 1.6 + k * .27) % 1; c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 1; c.beginPath(); c.arc(g.x + 7 + k * 6, b - ph * lvl, 2 + k % 2, 0, 7); c.stroke(); }
    } else { // porous carbon
      const ch = FX.clamp(40 + (t - 42) * 10, 40, 72);
      c.fillStyle = '#121212'; c.beginPath(); c.moveTo(g.x, b); c.lineTo(g.x, b - ch); for (let k = 0; k <= 6; k++) c.lineTo(g.x + k * g.w / 6, b - ch - (k % 2 ? 6 : -2)); c.lineTo(g.x + g.w, b); c.closePath(); c.fill();
      for (let i = 0; i < 26; i++) { c.fillStyle = 'rgba(80,80,80,.9)'; c.beginPath(); c.arc(g.x + 3 + _R(i + 7) * (g.w - 6), b - 3 - _R(i + 31) * (ch - 6), 1 + _R(i) * 2.2, 0, 7); c.fill(); }
    }
    if (t >= 32) for (let i = 0; i < 12; i++) { const gy = g.y + 14 + _R(i + 3) * 70, gx = _R(i + 5) > .5 ? g.x + 3 : g.x + g.w - 6, r = 1.6 + Math.min(1.8, (t - 32) * .2) * _R(i + 8); c.fillStyle = 'rgba(160,210,245,.9)'; c.beginPath(); c.ellipse(gx + 1.5, gy, r * .8, r, 0, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.9)'; c.fillRect(gx + 1, gy - r * .5, 1, 1); }
  }
  const heating = () => fire && Math.abs(bx - bottom[0]) < 34;
  function draw(c, s) {
    FX.room(c, s, BY);
    // stand + clamp
    FX.stand(c, 520, BY, BY - 80, CLY, 0);
    c.fillStyle = FX.lg(c, 0, CLY - 4, 0, CLY + 4, [[0, '#d1d5db'], [1, '#6b7280']]); c.fillRect(CLX, CLY - 4, 120, 8);
    // burner (behind tube)
    FX.burner(c, bx, BY, fire, s.t, {});
    // tube
    c.save(); c.translate(CLX, CLY); c.rotate(ANG); FX.testTube(c, 0, -40, TW, L, (cc, g) => contents(cc, g));
    c.fillStyle = '#374151'; FX.rr(c, -TW / 2 - 12, -10, 12, 20, 3); c.fill(); FX.rr(c, TW / 2, -10, 12, 20, 3); c.fill(); c.fillStyle = '#b91c1c'; c.fillRect(-TW / 2 - 3, -7, 3, 14); c.fillRect(TW / 2, -7, 3, 14); c.restore();
    // sugar dish + spoon
    FX.shadow(c, 80, BY + 2, 60, 6, .3); c.fillStyle = FX.lg(c, 0, BY - 14, 0, BY, [[0, 'rgba(230,240,248,.9)'], [1, 'rgba(160,185,205,.9)']]); c.beginPath(); c.ellipse(80, BY - 6, 56, 9, 0, 0, Math.PI); c.fill(); c.beginPath(); c.ellipse(80, BY - 7, 56, 7, 0, 0, 7); c.strokeStyle = 'rgba(100,130,150,.8)'; c.lineWidth = 1.5; c.stroke();
    c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(78, BY - 10, 34, 9, 0, Math.PI, 0); c.fill(); for (let i = 0; i < 30; i++) { c.fillStyle = 'rgba(148,163,184,.6)'; c.fillRect(50 + _R(i) * 56, BY - 16 + _R(i + 9) * 8, 2, 2); }
    FX.txt(c, 'سكر 3 جم', 80, BY + 14, { color: '#f8fafc', size: 13 });
    FX.tag(c, '⚠ لا تلمس الأنبوب الساخن، ووجّه فوهته بعيدًا عن زملائك', 320, BY + 50, { bg: 'rgba(185,28,28,.92)', size: 13 });
    if (sugar < 1) { c.save(); c.translate(spoon.x, spoon.y); c.rotate(-.25); c.fillStyle = FX.lg(c, 0, -6, 0, 6, [[0, '#f1f5f9'], [1, '#94a3b8']]); FX.rr(c, 0, -3, 70, 6, 3); c.fill(); c.beginPath(); c.ellipse(-12, 0, 16, 9, 0, 0, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-12, -3, 12, 6, 0, Math.PI, 0); c.fill(); c.restore();
      s.hit({ id: 'spoon', x: spoon.x - 30, y: spoon.y - 20, w: 100, h: 40, drag: { start() { spoon.home = false; }, move(p) { spoon.x = p.x; spoon.y = p.y; }, end(p) { if (Math.hypot(p.x - mouth[0], p.y - mouth[1]) < 70) addSugar(); else { spoon.x = 130; spoon.y = 398; spoon.home = true; } } } }); }
    if (pour > 0) { pour -= s.dt; for (let k = 0; k < 2; k++) P.add({ k: 'drop', x: mouth[0] + (Math.random() - .5) * 8, y: mouth[1] - 6, vy: 160, vx: -40, life: .5, r: 2, col: '#ffffff' }); }
    // burner valve hit (light) & drag
    s.hit({ id: 'burner', x: bx - 45, y: BY - 110, w: 90, h: 110, drag: { move(p, d) { if (!d.bx0) d.bx0 = bx; bx = FX.clamp(d.bx0 + d.dx, 120, 600); }, end(p, d) { if (Math.abs(d.dx) < 4 && !fire && sugar >= 1) light(); } } });
    // heating effects
    if (heating() && sugar >= 1 && t < 45) { t = Math.min(45, t + s.dt * 1.5); if (t > 22 && t < 44) P.add({ k: 'smoke', x: mouth[0], y: mouth[1] - 4, vx: 10 + Math.random() * 10, vy: -40 - Math.random() * 20, r: 6, grow: 26, life: 2.2, s: Math.random() * 6, a: .9, col: t > 30 ? 'rgba(230,235,240,' : 'rgba(120,95,70,' }); }
    if (fire && s.t - sparkT < .4) for (let k = 0; k < 3; k++) P.add({ k: 'spark', x: bx + (Math.random() - .5) * 10, y: BY - 98, vx: (Math.random() - .5) * 160, vy: -Math.random() * 160, g: 400, life: .45, r: 2.4 });
    P.step(s.dt); P.draw(c);
    // timer clock
    FX.clock(c, 92, 118, 36, t, { text: t.toFixed(0) + ' s' });
    // hints
    const n = stepNow(); S.set(n);
    if (n === 0) FX.hint(c, spoon.x - 10, spoon.y - 4, s.t, 'اسحب الملعقة إلى فوهة الأنبوب', { dx: 60 });
    else if (n === 1) FX.hint(c, bx, BY - 60, s.t, 'اضغط لإشعال الموقد');
    else if (n === 2 && !heating()) FX.hint(c, bx, BY - 60, s.t, 'اسحب الموقد إلى أسفل الأنبوب ←', { dx: 40 });
    if (heating() && t < 45) FX.tag(c, '♨ يُسخَّن…', bottom[0], bottom[1] + 40, { bg: 'rgba(220,38,38,.9)' });
    log();
  }
  function addSugar() { sugar = 1; pour = .6; spoon.x = 130; spoon.y = 398; beep(true); log(true); }
  function light() { fire = true; sparkT = st.t; beep(true); }
  function log(force) {
    body.querySelector('.tm').textContent = t.toFixed(0) + ' ث'; if (sugar < 1) return;
    const o = OBS.filter(x => x[0] <= t).pop(); body.querySelector('.ph').textContent = PH.filter(x => x[0] <= t).pop()[1];
    if (o[0] !== logged) { logged = o[0]; body.querySelector('.tb').insertAdjacentHTML('beforeend', `<tr><td>${o[0]}</td><td>${o[1]}</td></tr>`); if (o[0]) beep(true); }
  }
  const st = FX.stage(host, 580, 420, draw, { vx: 30, vy: 55 });
  body.querySelector('.bput').onclick = () => { if (sugar < 1) addSugar(); };
  body.querySelector('.bfire').onclick = () => { if (sugar < 1) { toast('ضع السكر أولًا'); return; } if (!fire) light(); };
  body.querySelector('.bmove').onclick = () => { if (!fire) { toast('أشعل الموقد أولًا'); return; } const a = bx, b = bottom[0], t0 = st.t; const iv = setInterval(() => { const k = Math.min(1, (st.t - t0) / .8); bx = FX.lerp(a, b, FX.ease(k)); if (k >= 1) clearInterval(iv); }, 16); };
  body.querySelectorAll('.an').forEach(b => b.onclick = () => {
    if (t < 42) { toast('سخّن حتى تتكوّن المادة السوداء ولاحظ أولًا'); return; } answered = true;
    _fbk(body.querySelector('.concl'), b.dataset.v === '1', b.dataset.v === '1' ? '✔ صحيح: المادة السوداء (كربون) وبخار الماء مواد جديدة لها خصائص تختلف عن السكر؛ إذن حدث <b>تفاعل كيميائي</b>.' : '✘ قارن: السكر أبيض حلو ويذوب في الماء، والمادة الباقية سوداء هشة لا تذوب؛ الخصائص تغيّرت فهي مادة جديدة.');
  });
  body.querySelector('.rs').onclick = () => { sugar = 0; fire = false; t = 0; bx = 440; logged = -1; answered = false; body.querySelector('.tb').innerHTML = ''; body.querySelector('.concl').className = 'fb concl'; log(); };
}

/* ---------- LAB 2: conservation of mass (p50) ---------- */
function labMass(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>⚖ حفظ الكتلة</h3><div class="muted" style="font-size:.88em">قطعة من سلك الأواني (صوف الحديد) في أنبوب اختبار، وبالون مثبت على فوهته.</div>`;
  const S = stepsList(panel, ['ضع الأنبوب على الميزان وسجّل الكتلة', 'سخّن الأنبوب في حمام مائي دقيقتين', 'برّد الأنبوب وجفّفه ثم زِنه مرة أخرى', 'قارن بين الكتلتين، ثم جرّب بفوهة مفتوحة']);
  panel.insertAdjacentHTML('beforeend', `<div class="mini"><button class="btn w1">⚖ زِن</button><button class="btn orange ht" disabled>♨ سخّن</button><button class="btn w2" disabled>⚖ برّد وزِن</button><label class="row" style="gap:.25em;font-size:.88em"><input type="checkbox" class="open"> بدون بالون</label></div>
    <table class="data"><thead><tr><th>المحاولة</th><th>قبل (جم)</th><th>بعد (جم)</th><th>الفرق</th></tr></thead><tbody class="tb"></tbody></table>
    <button class="btn navy anq">📝 أسئلة التحليل (3)</button>`);
  const ANQ = `<h3>تحليل النتائج</h3><div class="rv" data-a="تغيّر لون سلك الأواني إلى البني المحمر (صدأ)، وانكمش البالون قليلًا لاستهلاك الأكسجين؛ وهذا دليل على حدوث تفاعل كيميائي.">التحليل 1: ما الذي لاحظته؟ وما الذي يدل على حدوث تفاعل؟</div>
    <div class="rv" data-a="عند إغلاق الأنبوب بالبالون تبقى الكتلة ثابتة: كتلة المواد المتفاعلة = كتلة المواد الناتجة (قانون حفظ الكتلة).">التحليل 2: قارن بين كتل المواد المتفاعلة والناتجة.</div>
    <div class="rv" data-a="لكي لا يدخل الأكسجين من الهواء أو يخرج أي غاز؛ فيبقى النظام مغلقًا وتُقاس جميع المتفاعلات والنواتج.">التحليل 3: لماذا كان من الضروري إغلاق فوهة الأنبوب؟</div>`;
  body.querySelector('.anq').onclick = () => openModal(ANQ);
  const W = 660, H = 500, BY = 430;
  const POS = { rack: [330, BY - 6], bal: [150, BY - 66], bath: [530, BY - 58] };
  let tube = { x: POS.rack[0], y: POS.rack[1] }, where = 'rack', mv = null, rust = 0, heat = 0, bathT = 0, phase = 0, m0 = null, m1 = null, shown = null, settle = 0, n = 0, balloon = 1, open = false;
  const P = FX.parts();
  function moveTo(k, cb) { const a = { x: tube.x, y: tube.y }, b = { x: POS[k][0], y: POS[k][1] }; mv = { a, b, t: 0, cb, k }; }
  function stepMove(dt) { if (!mv) return; mv.t = Math.min(1, mv.t + dt / 1.1); const e = FX.ease(mv.t); tube.x = FX.lerp(mv.a.x, mv.b.x, e); tube.y = FX.lerp(mv.a.y, mv.b.y, e) - Math.sin(e * Math.PI) * 120; if (mv.t >= 1) { where = mv.k; const cb = mv.cb; mv = null; cb && cb(); } }
  function wool(c, g) { const b = g.bottom; for (let i = 0; i < 40; i++) { c.strokeStyle = FX.mix(i % 2 ? '#9ca3af' : '#6b7280', i % 3 ? '#b45309' : '#9a3412', rust * (.6 + _R(i) * .5)); c.lineWidth = 1.3; c.beginPath(); const x = g.x + 4 + _R(i) * (g.w - 8), y = b - 6 - _R(i + 50) * 46; c.moveTo(x, y); c.bezierCurveTo(x + 8, y - 6, x - 6, y - 10, x + 4 * (_R(i + 7) - .5) * 4, y - 14); c.stroke(); } }
  function drawTube(c, s) {
    const x = tube.x, by = tube.y, L = 180, top = by - L;
    FX.testTube(c, x, top, 32, L, wool);
    if (!open) { const r = 26 * balloon; c.fillStyle = FX.rg(c, x - r * .3, top - r * 1.1, 2, r * 1.3, [[0, '#fca5a5'], [.6, '#ef4444'], [1, '#991b1b']]); c.beginPath(); c.moveTo(x - 10, top + 4); c.bezierCurveTo(x - r * 1.1, top - r * .6, x - r, top - r * 2.1, x, top - r * 2.15); c.bezierCurveTo(x + r, top - r * 2.1, x + r * 1.1, top - r * .6, x + 10, top + 4); c.closePath(); c.fill();
      c.fillStyle = 'rgba(255,255,255,.45)'; c.beginPath(); c.ellipse(x - r * .35, top - r * 1.5, r * .18, r * .35, -.3, 0, 7); c.fill(); c.fillStyle = '#b91c1c'; FX.rr(c, x - 19, top - 4, 38, 12, 4); c.fill(); }
    s.hit({ id: 'tube', x: x - 30, y: top - 60, w: 60, h: L + 60, click: () => next() });
  }
  function draw(c, s) {
    FX.room(c, s, BY);
    const lcdTxt = where === 'bal' && !mv ? (settle > 0 ? (shown + (Math.random() - .5) * .3).toFixed(2) + ' g' : shown.toFixed(2) + ' g') : '0.00 g';
    FX.balance(c, 40, BY, 220, lcdTxt, {});
    // holder beaker on pan
    c.save(); c.globalAlpha = .9; FX.beaker(c, 128, BY - 112, 44, 50, 0, '#ffffff', { grad: false }); c.restore();
    // rack
    FX.rack(c, 290, BY - 58, 80);
    // water bath
    FX.hotplate(c, 430, BY, 200, heat, s.t);
    FX.stand(c, 640, BY, 330, BY - 230, -110);
    FX.beaker(c, 450, BY - 200, 160, 158, .7, '#7dd3fc', { inside(cc, g) { if (heat > .3) for (let k = 0; k < 6; k++) { const ph = (s.t * (.6 + k * .13) + k * .21) % 1; cc.strokeStyle = 'rgba(255,255,255,.8)'; cc.lineWidth = 1.2; cc.beginPath(); cc.arc(g.x + 20 + k * 24, g.y + g.h - 8 - ph * (g.h - (g.ly - g.y) - 10), 2 + k % 3, 0, 7); cc.stroke(); } } });
    if (heat > .5 && Math.random() < .3) P.add({ k: 'steam', x: 470 + Math.random() * 120, y: BY - 160, vx: 0, vy: -26, r: 8, grow: 22, life: 2, s: Math.random() * 6, a: .5 });
    stepMove(s.dt);
    // tube (draw clipped in bath water if inside)
    drawTube(c, s);
    if (where === 'bath' && !mv) { c.fillStyle = '#374151'; FX.rr(c, tube.x - 24, BY - 238, 48, 14, 4); c.fill(); }
    // heating phase
    if (phase === 2) { heat = Math.min(1, heat + s.dt); bathT += s.dt / 5 * 120; rust = Math.min(1, bathT / 120); if (!open) balloon = 1 - .16 * rust;
      if (bathT >= 120) { phase = 3; heat = .99; toast('انتهى التسخين: اترك الأنبوب يبرد ثم جفّف سطحه'); body.querySelector('.w2').disabled = false; } }
    else heat = Math.max(0, heat - s.dt * .3);
    if (settle > 0) settle -= s.dt;
    P.step(s.dt); P.draw(c);
    const mm = Math.floor(bathT / 60), ss = Math.floor(bathT % 60); FX.clock(c, 586, 64, 34, bathT, { text: mm + ':' + String(ss).padStart(2, '0') });
    FX.txt(c, 'حمام مائي', 530, BY + 16, { color: '#f8fafc', size: 13 }); FX.txt(c, 'ميزان رقمي', 150, BY + 16, { color: '#f8fafc', size: 13 });
    const hs = phase === 0 ? [tube.x, tube.y - 90, 'اضغط الأنبوب لوزنه'] : phase === 1 ? [tube.x, tube.y - 90, 'اضغط الأنبوب لتسخينه'] : phase === 3 ? [tube.x, tube.y - 90, 'اضغط الأنبوب لوزنه بعد التبريد'] : null;
    if (hs && !mv) FX.hint(c, hs[0], hs[1], s.t, hs[2]);
    S.set(phase === 0 ? 0 : phase <= 2 ? (phase === 1 ? 1 : 1) : phase === 3 ? 2 : 3);
  }
  function weigh(v) { shown = v; settle = .9; }
  function next() { if (mv) return; if (phase === 0) w1(); else if (phase === 1) ht(); else if (phase === 3) w2(); }
  function w1() { open = body.querySelector('.open').checked; rust = 0; balloon = 1; bathT = 0; m0 = 52.40; moveTo('bal', () => { weigh(m0); phase = 1; body.querySelector('.ht').disabled = false; }); body.querySelector('.w1').disabled = true; }
  function ht() { body.querySelector('.ht').disabled = true; moveTo('bath', () => { phase = 2; }); }
  function w2() { body.querySelector('.w2').disabled = true; moveTo('bal', () => { m1 = open ? m0 + .03 : m0; weigh(m1); n++; phase = 4;
    body.querySelector('.tb').insertAdjacentHTML('beforeend', `<tr><td>${n} ${open ? '(مفتوح)' : '(مغلق)'}</td><td>${m0.toFixed(2)}</td><td>${m1.toFixed(2)}</td><td><b>${(m1 - m0).toFixed(2)}</b></td></tr>`);
    setTimeout(() => toast(open ? 'زادت الكتلة: دخل أكسجين من الهواء واتحد بالحديد — النظام لم يكن مغلقًا' : 'الكتلة ثابتة ✔ قانون حفظ الكتلة'), 900); beep(true);
    setTimeout(() => moveTo('rack', () => { phase = 0; body.querySelector('.w1').disabled = false; }), 2600); }); }
  body.querySelector('.w1').onclick = () => phase === 0 && w1(); body.querySelector('.ht').onclick = () => phase === 1 && ht(); body.querySelector('.w2').onclick = () => phase === 3 && w2();
  body.querySelector('.open').onchange = e => { if (phase === 0) { open = e.target.checked; rust = 0; balloon = 1; } };
  const st = FX.stage(host, W, H, draw);
}

/* ---------- LAB 3: balancing equations on a real beam balance ---------- */
const EQS = [
  { n: 'كبريتيد الفضة', r: [['Ag', { Ag: 1 }], ['H2S', { H: 2, S: 1 }]], p: [['Ag2S', { Ag: 2, S: 1 }], ['H2', { H: 2 }]], sol: [2, 1, 1, 1] },
  { n: 'احتراق الميثان', r: [['CH4', { C: 1, H: 4 }], ['O2', { O: 2 }]], p: [['CO2', { C: 1, O: 2 }], ['H2O', { H: 2, O: 1 }]], sol: [1, 2, 1, 2] },
  { n: 'تكوين الماء', r: [['H2', { H: 2 }], ['O2', { O: 2 }]], p: [['H2O', { H: 2, O: 1 }]], sol: [2, 1, 2] },
  { n: 'Ag₂O (اختبر نفسك 4)', r: [['Ag2O', { Ag: 2, O: 1 }]], p: [['Ag', { Ag: 1 }], ['O2', { O: 2 }]], sol: [2, 4, 1] },
  { n: 'Zn + Ag₂S (اختبر نفسك 1ب)', r: [['Zn', { Zn: 1 }], ['Ag2S', { Ag: 2, S: 1 }]], p: [['ZnS', { Zn: 1, S: 1 }], ['Ag', { Ag: 1 }]], sol: [1, 1, 1, 2] },
  { n: 'Al + I₂ (مسألة 2)', r: [['Al', { Al: 1 }], ['I2', { I: 2 }]], p: [['AlI3', { Al: 1, I: 3 }]], sol: [2, 3, 2] },
  { n: 'Fe₂O₃ + CO (مسألة 1)', r: [['Fe2O3', { Fe: 2, O: 3 }], ['CO', { C: 1, O: 1 }]], p: [['Fe3O4', { Fe: 3, O: 4 }], ['CO2', { C: 1, O: 2 }]], sol: [3, 1, 2, 1] }];
const ACOL = { H: '#f1f5f9', O: '#ef4444', C: '#374151', Ag: '#cbd5e1', S: '#facc15', Zn: '#93c5fd', Al: '#a3a3a3', I: '#7c3aed', Fe: '#c2410c', Na: '#a855f7', Cl: '#22c55e', Ca: '#f59e0b' };
const AMASS = { H: 1, C: 12, O: 16, S: 32, Ag: 108, Zn: 65, Al: 27, I: 127, Fe: 56 };
const ARAD = { H: 6, C: 9, O: 8.5, S: 10, Ag: 11, Zn: 10, Al: 10, I: 12, Fe: 10 };
function _atom(c, x, y, el, s) { const r = (ARAD[el] || 9) * (s || 1), b = ACOL[el] || '#999'; c.fillStyle = FX.rg(c, x - r * .35, y - r * .4, r * .1, r * 1.1, [[0, FX.mix(b, '#ffffff', .7)], [.6, b], [1, FX.mix(b, '#000000', .45)]]); c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); }
function _molecule(c, x, y, f, s) { const atoms = []; for (const el in f) for (let j = 0; j < f[el]; j++) atoms.push(el); const n = atoms.length;
  const pos = n === 1 ? [[0, 0]] : n === 2 ? [[-7, 0], [7, 0]] : n === 3 ? [[0, -5], [-10, 5], [10, 5]] : atoms.map((_, i) => i === 0 ? [0, 0] : [Math.cos(i / (n - 1) * 6.283) * 13, Math.sin(i / (n - 1) * 6.283) * 11]);
  const order = atoms.map((el, i) => [el, pos[i]]).sort((a, b) => a[1][1] - b[1][1]); order.forEach(([el, p]) => _atom(c, x + p[0] * s, y + p[1] * s, el, s)); }
function labBalance(body) {
  body.className = 'body lab-split'; body.style.gridTemplateRows = 'minmax(0,1fr) auto'; body.style.gridTemplateColumns = '1fr';
  body.innerHTML = `<div class="card fxstage" style="padding:.3em;display:flex;min-height:0;background:#0f172a"><div class="fxhost" style="flex:1;min-height:0"></div></div>
  <div class="card" style="display:flex;flex-direction:column;gap:.35em">
   <div class="row" style="gap:.3em;flex-wrap:wrap"><b>المعادلة:</b><span class="pk row" style="gap:.25em;flex-wrap:wrap"></span></div>
   <div class="eq row ltr" style="justify-content:center;gap:.45em;flex-wrap:wrap;font-size:1.15em"></div>
   <div class="row" style="justify-content:space-between;gap:.4em"><span class="muted" style="font-size:.85em">🔒 الأرقام السفلية مقفلة: غيّر <b>المعاملات</b> فقط. الميزان يميل نحو الطرف الأثقل حتى تتساوى أعداد الذرات.</span><button class="btn alt hint">💡 تلميح</button></div>
   <div class="fb msg"></div></div>`;
  let E = 0, co = [], tilt = 0, ok = false;
  const pk = body.querySelector('.pk');
  EQS.forEach((e, k) => { const b = h(`<button class="btn alt" style="padding:.2em .6em;font-size:.82em">${e.n}</button>`); b.onclick = () => { E = k; init(); }; pk.appendChild(b); });
  const tally = (side, off) => { const t = {}; side.forEach((s, i) => { for (const el in s[1]) t[el] = (t[el] || 0) + s[1][el] * co[off + i]; }); return t; };
  const massOf = T => Object.keys(T).reduce((a, el) => a + T[el] * (AMASS[el] || 10), 0);
  function init() { co = Array(EQS[E].r.length + EQS[E].p.length).fill(1); pk.querySelectorAll('.btn').forEach((b, k) => b.classList.toggle('alt', k !== E)); body.querySelector('.msg').className = 'fb msg'; render(); }
  function render() {
    const e = EQS[E], eq = body.querySelector('.eq'); eq.innerHTML = '';
    e.r.concat(e.p).forEach((s, i) => {
      if (i === e.r.length) eq.appendChild(h('<b style="font-size:1.3em">→</b>')); else if (i > 0) eq.appendChild(h('<b>+</b>'));
      const box = h(`<span style="display:inline-flex;align-items:center;gap:.25em;background:#fff;border:2px solid var(--line);border-radius:12px;padding:.15em .4em"><button class="btn alt m" style="padding:0 .45em">−</button><b class="cv" style="color:var(--accent);min-width:1em;text-align:center;font-size:1.2em">${co[i]}</b><button class="btn alt p" style="padding:0 .45em">+</button><span style="font-size:1.1em">${_sub(s[0])}</span></span>`);
      box.querySelector('.m').onclick = () => { if (co[i] > 1) { co[i]--; render(); } }; box.querySelector('.p').onclick = () => { if (co[i] < 9) { co[i]++; render(); } };
      eq.appendChild(box);
    });
    const L = tally(e.r, 0), R = tally(e.p, e.r.length), els = [...new Set(Object.keys(L).concat(Object.keys(R)))];
    ok = els.every(el => (L[el] || 0) === (R[el] || 0));
    if (ok) _fbk(body.querySelector('.msg'), true, '✔ المعادلة موزونة: أعداد الذرات من كل عنصر متساوية في الطرفين، فتساوت الكتلتان؛ تحقق قانون حفظ الكتلة.'); else body.querySelector('.msg').className = 'fb msg';
  }
  function draw(c, s) {
    c.fillStyle = FX.lg(c, 0, s.y0, 0, s.y1, [[0, '#1e293b'], [1, '#0b1220']]); c.fillRect(s.x0, s.y0, s.x1 - s.x0, s.y1 - s.y0);
    const e = EQS[E], L = tally(e.r, 0), R = tally(e.p, e.r.length), mL = massOf(L), mR = massOf(R);
    const target = FX.clamp((mL - mR) / Math.max(mL, mR) * .5, -.32, .32); tilt += (target - tilt) * Math.min(1, s.dt * 4);
    const cx = 380, cy = 70, arm = 250;
    // stand
    c.fillStyle = FX.lg(c, cx - 70, 0, cx + 70, 0, [[0, '#78350f'], [.5, '#b45309'], [1, '#78350f']]); FX.rr(c, cx - 90, 330, 180, 22, 6); c.fill();
    c.fillStyle = FX.lg(c, cx - 8, 0, cx + 8, 0, [[0, '#a16207'], [.5, '#fde68a'], [1, '#854d0e']]); c.fillRect(cx - 7, cy, 14, 262);
    // beam
    const ex = Math.cos(tilt) * arm, ey = Math.sin(tilt) * arm;
    c.save(); c.translate(cx, cy); c.rotate(tilt); c.fillStyle = FX.lg(c, 0, -6, 0, 6, [[0, '#fde68a'], [1, '#a16207']]); FX.rr(c, -arm - 6, -6, arm * 2 + 12, 12, 6); c.fill(); c.restore();
    c.fillStyle = '#fbbf24'; c.beginPath(); c.moveTo(cx, cy - 12); c.lineTo(cx - 12, cy + 10); c.lineTo(cx + 12, cy + 10); c.closePath(); c.fill();
    // needle + scale
    c.strokeStyle = '#e5e7eb'; c.lineWidth = 3; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.sin(tilt) * 110 * -1 * -1, cy + Math.cos(tilt) * 110); c.stroke();
    [[-1, 'L'], [1, 'R']].forEach(([sg, side]) => {
      const px = cx + sg * ex, py = cy + sg * ey, panY = py + 150;
      c.strokeStyle = '#cbd5e1'; c.lineWidth = 1.5; [-70, 70].forEach(d => { c.beginPath(); c.moveTo(px, py); c.lineTo(px + d, panY); c.stroke(); });
      c.fillStyle = FX.lg(c, 0, panY, 0, panY + 14, [[0, '#fef3c7'], [1, '#b45309']]); c.beginPath(); c.ellipse(px, panY + 2, 92, 13, 0, 0, Math.PI); c.fill(); c.beginPath(); c.ellipse(px, panY, 92, 8, 0, 0, 7); c.fillStyle = '#fde68a'; c.fill();
      const sp = sg < 0 ? e.r : e.p, off = sg < 0 ? 0 : e.r.length; let k = 0;
      sp.forEach((spc, i) => { for (let j = 0; j < Math.min(co[off + i], 9); j++) { const col = k % 5, row = Math.floor(k / 5); _molecule(c, px - 72 + col * 36, panY - 18 - row * 34, spc[1], 1.05); k++; } });
      FX.txt(c, sg < 0 ? 'المتفاعلات' : 'النواتج', px, panY + 34, { color: '#e2e8f0', size: 16, disp: true, w: 700 });
      const T = sg < 0 ? L : R, O = sg < 0 ? R : L; FX.txt(c, Object.keys(Object.assign({}, L, R)).map(el => el + ':' + (T[el] || 0)).join('   '), px, panY + 56, { mono: true, size: 14, color: '#a7f3d0' });
    });
    if (ok) { FX.tag(c, '✔ متوازنة', cx, 26, { bg: '#16a34a', size: 17, disp: true, w: 700 }); }
    else FX.tag(c, 'يميل نحو الطرف الأثقل', cx, 26, { bg: 'rgba(234,122,12,.95)', size: 15 });
  }
  body.querySelector('.hint').onclick = () => { const e = EQS[E], L = tally(e.r, 0), R = tally(e.p, e.r.length); const bad = Object.keys(Object.assign({}, L, R)).find(el => (L[el] || 0) !== (R[el] || 0)); toast(bad ? `ابدأ بالعنصر ${bad}: في المتفاعلات ${L[bad] || 0} وفي النواتج ${R[bad] || 0}. أي معامل تغيّره؟` : 'موزونة!'); };
  init(); FX.stage(body.querySelector('.fxhost'), 760, 400, draw);
}

/* ---------- LAB 4: exothermic or endothermic (inquiry p64 + cold pack) ---------- */
function labEnergy(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🌡 طارد أم ماص للحرارة؟</h3>`;
  const S = stepsList(panel, ['اختر العينة من الصينية (اضغط عليها)', 'اسحب المخبار المدرّج واسكب السائل في الكأس', 'راقب مقياس الحرارة دقيقة واحدة', 'صنّف التفاعل في جدول البيانات']);
  panel.insertAdjacentHTML('beforeend', `<div class="fxro"><div>الحرارة °س<b class="tc">22.0</b></div><div>الزمن (ث)<b class="ts">0</b></div><div>التغير<b class="dT">0.0</b></div></div>
    <table class="data"><thead><tr><th>العينة</th><th>البداية</th><th>بعد دقيقة</th><th>التغير</th><th>تصنيفك</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="fb msg"></div><div class="mini"><button class="btn alt nw">↺ تجربة جديدة</button><button class="btn alt pr">💧 اسكب</button></div>
    <div class="pill" style="background:#fee2e2;color:#991b1b;white-space:normal;font-size:.75em">⚠ فوق أكسيد الهيدروجين قد يهيّج الجلد والعيون؛ اغسل يديك جيدًا</div>`);
  const D = { liver: { n: 'كبد', d: 9.0, b: 1, liq: 'فوق أكسيد الهيدروجين' }, potato: { n: 'بطاطس', d: 3.0, b: .45, liq: 'فوق أكسيد الهيدروجين' }, ctrl: { n: 'ضابط (بلا نسيج)', d: 0, b: 0, liq: 'فوق أكسيد الهيدروجين' }, cold: { n: 'كمادة باردة', d: -14, b: 0, liq: 'ماء' } };
  const KEYS = ['liver', 'potato', 'ctrl', 'cold'];
  const W = 680, H = 500, BY = 430, BX = 250, BW = 150, BH = 170;
  let k = null, phase = 0, T = 22, ts = 0, lvl = 0, cyl = { x: 600, y: BY - 176, a: 0 }, pourT = 0, drop = 0, hist = [], foam = 0;
  const P = FX.parts();
  function sample(c, key, x, y, s) { s = s || 1;
    if (key === 'liver') { c.fillStyle = FX.rg(c, x - 6 * s, y - 6 * s, 2, 22 * s, [[0, '#b91c1c'], [1, '#5b0f0f']]); c.beginPath(); c.ellipse(x, y - 6 * s, 22 * s, 11 * s, .1, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.ellipse(x - 7 * s, y - 10 * s, 6 * s, 3 * s, 0, 0, 7); c.fill(); }
    else if (key === 'potato') { c.fillStyle = FX.lg(c, x - 14 * s, y - 26 * s, x + 14 * s, y, [[0, '#fef3c7'], [1, '#e7c983']]); FX.rr(c, x - 14 * s, y - 24 * s, 28 * s, 24 * s, 4 * s); c.fill(); c.strokeStyle = '#a16207'; c.lineWidth = 1; c.stroke(); }
    else if (key === 'cold') { for (let i = 0; i < 14; i++) { c.fillStyle = i % 2 ? '#ffffff' : '#e2e8f0'; c.fillRect(x - 16 * s + _R(i) * 30 * s, y - 4 * s - _R(i + 4) * 12 * s, 5 * s, 5 * s); } }
  }
  function draw(c, s) {
    FX.room(c, s, BY);
    // tray
    FX.shadow(c, 115, BY + 2, 110, 6, .3); c.fillStyle = FX.lg(c, 0, BY - 12, 0, BY, [[0, '#f8fafc'], [1, '#cbd5e1']]); FX.rr(c, 10, BY - 12, 210, 12, 4); c.fill();
    KEYS.forEach((key, i) => { const x = 36 + i * 52; if (k === key && phase > 0) return; c.fillStyle = 'rgba(226,232,240,.95)'; c.beginPath(); c.ellipse(x, BY - 14, 24, 6, 0, 0, 7); c.fill(); sample(c, key, x, BY - 14, 1.05);
      FX.txt(c, ['كبد', 'بطاطس', 'ضابط', 'نترات'][i], x, BY + 14, { size: 12, color: '#f8fafc' });
      if (phase === 0) s.hit({ id: 's' + i, x: x - 25, y: BY - 50, w: 50, h: 60, click: () => choose(key) }); if (k === key) { c.strokeStyle = '#f5b700'; c.lineWidth = 3; c.beginPath(); c.arc(x, BY - 18, 26, 0, 7); c.stroke(); } });
    // beaker with contents
    const frost = k === 'cold' ? FX.clamp((22 - T) / 14, 0, 1) : 0;
    FX.beaker(c, BX, BY - BH, BW, BH, lvl, k === 'cold' ? '#dbeafe' : '#e0f2fe', { alpha: .5, inside(cc, g) {
      if (k && phase >= 1 && drop >= 1) { if (k === 'cold') { cc.globalAlpha = FX.clamp(1 - ts / 40, 0, 1); sample(cc, 'cold', g.x + g.w / 2, g.y + g.h - 4, 1.1); cc.globalAlpha = 1; } else sample(cc, k, g.x + g.w / 2, g.y + g.h - 4, 1.1); }
      if (phase >= 2 && D[k].b) { const n = Math.round(10 * D[k].b); for (let j = 0; j < n; j++) { const ph = (s.t * (.8 + j * .07) + j * .37) % 1; cc.strokeStyle = 'rgba(255,255,255,.9)'; cc.lineWidth = 1.2; cc.beginPath(); cc.arc(g.x + g.w / 2 - 30 + (j * 13) % 60, g.y + g.h - 12 - ph * (g.y + g.h - g.ly), 2 + j % 3, 0, 7); cc.stroke(); } }
    } });
    // falling sample
    if (k && phase >= 1 && drop < 1) { drop = Math.min(1, drop + s.dt * 1.8); const y0 = BY - 60, y1 = BY - 10; sample(c, k, BX + BW / 2, FX.lerp(y0 - 140, y1, drop * drop), 1.1); }
    // foam above liquid
    if (phase >= 2 && D[k].b) { foam = Math.min(D[k].b, foam + s.dt * .12 * D[k].b); const ly = BY - 10 - lvl * (BH - 14), fh = foam * 150; c.save(); c.beginPath(); c.rect(BX, BY - BH - 40, BW, BH + 40); c.clip();
      for (let j = 0; j < 60 * foam; j++) { const x = BX + 6 + _R(j) * (BW - 12), y = ly - _R(j + 40) * fh, r = 5 + _R(j + 9) * 9; c.fillStyle = 'rgba(255,255,255,.88)'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.strokeStyle = 'rgba(200,215,225,.9)'; c.lineWidth = 1; c.stroke(); } c.restore(); }
    // frost on outside
    if (frost > 0) for (let j = 0; j < 140 * frost; j++) { c.fillStyle = `rgba(255,255,255,${.5 + _R(j) * .5})`; c.fillRect(BX + _R(j + 3) * BW, BY - BH + 20 + _R(j + 77) * (BH - 24), 2.2, 2.2); }
    // cylinder (draggable to pour)
    c.save(); c.translate(cyl.x, cyl.y); c.rotate(cyl.a); FX.cylinder(c, -17, -170, 34, 170, phase >= 2 ? .12 : .6, k === 'cold' ? '#bfdbfe' : '#e0f2fe', { alpha: .6 }); c.restore();
    FX.txt(c, k ? D[k].liq : 'السائل', 600, BY + 14, { size: 12, color: '#f8fafc' });
    if (phase === 1 && drop >= 1) s.hit({ id: 'cyl', x: cyl.x - 30, y: cyl.y - 180, w: 60, h: 190, drag: { move(p) { cyl.x = FX.clamp(p.x, 380, 620); cyl.y = FX.clamp(p.y + 80, 150, BY - 176); cyl.a = -FX.clamp((620 - cyl.x) / 200, 0, 1) * 1.9; if (cyl.x < 450 && cyl.y < 290) startPour(); }, end() { if (phase === 1) { cyl.x = 600; cyl.y = BY - 176; cyl.a = 0; } } } });
    if (pourT > 0) { pourT -= s.dt; lvl = Math.min(.42, lvl + s.dt * .3); cyl.x = FX.lerp(cyl.x, 430, .2); cyl.y = FX.lerp(cyl.y, 240, .2); cyl.a = FX.lerp(cyl.a, -1.95, .2);
      const sx = cyl.x + Math.sin(-cyl.a) * -170 * -1, sy = cyl.y - Math.cos(cyl.a) * 170; c.strokeStyle = k === 'cold' ? 'rgba(191,219,254,.9)' : 'rgba(224,242,254,.9)'; c.lineWidth = 7; c.beginPath(); c.moveTo(cyl.x - 160, cyl.y - 50); c.quadraticCurveTo(BX + BW / 2 + 10, cyl.y - 30, BX + BW / 2, BY - 10 - lvl * (BH - 14)); c.stroke();
      if (pourT <= 0) { phase = 2; ts = 0; T = 22; hist = [[0, 22]]; cyl.x = 600; cyl.y = BY - 176; cyl.a = 0; } }
    // run reaction
    if (phase === 2) { ts = Math.min(60, ts + s.dt * 5); T = 22 + D[k].d * (1 - Math.exp(-ts / 18)); if (!hist.length || ts - hist[hist.length - 1][0] > .9) hist.push([ts, T]); if (ts >= 60) finish(); }
    // probe
    FX.probe(c, 450, 120, 300, T, { px: BX + BW - 30, py: BY - 14 });
    // inset graph
    FX.graph(c, 16, 16, 220, 150, { xmax: 60, ymax: 35, ymin: 5, xstep: 20, ystep: 10, xlab: 'الزمن (ث)', ylab: 'الحرارة (°س)', series: [{ pts: hist, col: k === 'cold' ? '#2563eb' : '#dc2626' }] });
    P.step(s.dt); P.draw(c);
    if (phase === 0) FX.hint(c, 115, BY - 30, s.t, 'اختر عينة', { r: 30 });
    else if (phase === 1 && drop >= 1 && pourT <= 0) FX.hint(c, 600, BY - 120, s.t, 'اسحب المخبار نحو الكأس', { dx: -50 });
    S.set(phase === 0 ? 0 : phase === 1 ? 1 : phase === 2 ? 2 : 3);
    body.querySelector('.tc').textContent = T.toFixed(1); body.querySelector('.ts').textContent = ts.toFixed(0); body.querySelector('.dT').textContent = (T - 22 >= 0 ? '+' : '−') + Math.abs(T - 22).toFixed(1);
  }
  function choose(key) { k = key; phase = 1; drop = 0; lvl = 0; foam = 0; beep(true); }
  function startPour() { if (phase !== 1 || pourT > 0) return; pourT = 1.6; }
  function finish() { phase = 3; const d = D[k], ch = T - 22;
    const row = h(`<tr><td>${d.n}</td><td>22.0</td><td>${T.toFixed(1)}</td><td class="ltr">${ch >= 0 ? '+' : '−'}${Math.abs(ch).toFixed(1)}</td><td><select class="cl"><option value="">—</option><option value="ex">طارد للحرارة</option><option value="en">ماص للحرارة</option><option value="no">لا تغير يُذكر</option></select></td></tr>`);
    body.querySelector('.tb').appendChild(row);
    row.querySelector('.cl').onchange = e => { const v = e.target.value, right = ch > 1 ? 'ex' : ch < -1 ? 'en' : 'no'; _fbk(body.querySelector('.msg'), v === right, v === right ? (right === 'ex' ? '✔ ارتفعت الحرارة: تحررت طاقة إلى الوسط المحيط، فالتفاعل <b>طارد للحرارة</b>. مصدرها روابط فوق أكسيد الهيدروجين، والإنزيم في النسيج محفز يسرّع تحلله.' : right === 'en' ? '✔ انخفضت الحرارة: امتصت العملية حرارة من الوسط المحيط، فهي <b>ماصة للحرارة</b>؛ لذلك تبرّد الكمادة العضو المصاب.' : '✔ العينة الضابطة لم تتغير حرارتها تقريبًا؛ نقارن بها لنتأكد أن التغير سببه النسيج.') : '✘ انظر إلى إشارة التغير في درجة الحرارة: ارتفاع = طارد، انخفاض = ماص.'); };
    beep(true); toast('انتهت الدقيقة: صنّف التفاعل في الجدول'); }
  body.querySelector('.nw').onclick = () => { k = null; phase = 0; T = 22; ts = 0; lvl = 0; hist = []; foam = 0; pourT = 0; body.querySelector('.msg').className = 'fb msg'; };
  body.querySelector('.pr').onclick = () => { if (phase === 1 && drop >= 1) startPour(); else if (phase === 0) toast('اختر العينة أولًا'); };
  FX.stage(host, W, H, draw);
}

/* ---------- LAB 5: collision theory — temperature, concentration, surface area, catalyst ---------- */
function labRate(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>⚛ نظرية التصادم</h3>
    <label class="rng">🌡 الحرارة <input type="range" class="tp" min="1" max="5" value="2"><b class="tpv">20°س</b></label>
    <label class="rng">🧪 التركيز <input type="range" class="cc" min="6" max="30" value="12"><b class="ccv">12</b></label>
    <label class="rng">🧊 مساحة السطح <select class="sa"><option value="1">قطعة واحدة كبيرة</option><option value="4">4 قطع</option><option value="0">مسحوق (مجزأ تمامًا)</option></select></label>
    <label class="rng"><input type="checkbox" class="cat" style="flex:none"> ⚙ إضافة محفز (يخفض طاقة التنشيط)</label>
    <div class="row"><button class="btn go">▶ ابدأ</button><button class="btn alt rs">↺ إعادة</button></div>
    <div class="fxro"><div>النواتج<b class="np">0 / 10</b></div><div>الزمن<b class="tt">0.0 ث</b></div></div>
    <table class="data"><thead><tr><th>#</th><th>الحرارة</th><th>التركيز</th><th>السطح</th><th>محفز</th><th>زمن 10 نواتج</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="muted" style="font-size:.82em">غيّر عاملًا واحدًا في كل مرة وقارن الزمن. يتكوّن الناتج فقط إذا كان التصادم قويًّا بما يكفي (طاقة التنشيط).</div>`;
  const W = 720, H = 470, BXL = 70, BXR = 470, BYT = 70, BYB = 380;
  let Pt = [], prod = 0, t = 0, run = false, hist = [], runs = 0;
  const FXP = FX.parts();
  const sp = () => +body.querySelector('.tp').value, cat = () => body.querySelector('.cat').checked;
  const v0 = () => 1 + sp() * .6;
  const vel = () => { const a = Math.random() * 6.283, m = v0() * (.3 + Math.random() * 1.4); return { vx: Math.cos(a) * m, vy: Math.sin(a) * m }; };
  const kick = p => { const m = v0() * (.3 + Math.random() * 1.4), c = Math.hypot(p.vx, p.vy) || 1; p.vx *= m / c; p.vy *= m / c; };
  function setup() {
    Pt = []; prod = 0; t = 0; hist = [[0, 0]]; const n = +body.querySelector('.cc').value, sa = +body.querySelector('.sa').value;
    const rnd = () => ({ x: BXL + 20 + Math.random() * (BXR - BXL - 40), y: BYT + 40 + Math.random() * (BYB - BYT - 60) });
    for (let i = 0; i < n; i++) Pt.push({ ...rnd(), ...vel(), k: 'A' });
    const lumps = sa === 0 ? n : sa, per = Math.ceil(n / lumps); let cnt = 0;
    for (let Lp = 0; Lp < lumps; Lp++) { const cx = BXL + 70 + ((Lp * .37 + .1) % 1) * (BXR - BXL - 160), cy = BYT + 80 + ((Lp * .61 + .3) % 1) * (BYB - BYT - 150), side = Math.ceil(Math.sqrt(per));
      for (let j = 0; j < per && cnt < n; j++, cnt++) Pt.push({ x: cx + (j % side) * 19, y: cy + Math.floor(j / side) * 19, vx: 0, vy: 0, k: 'B', fixed: sa !== 0, lump: Lp, gi: j % side, gj: Math.floor(j / side) }); }
    if (sa === 0) Pt.filter(p => p.k === 'B').forEach(p => Object.assign(p, rnd(), vel(), { fixed: false }));
    upd();
  }
  function exposed(p) { if (!p.fixed) return true; const has = (i, j) => Pt.some(q => q.k === 'B' && q.fixed && q.lump === p.lump && q.gi === i && q.gj === j); return !(has(p.gi - 1, p.gj) && has(p.gi + 1, p.gj) && has(p.gi, p.gj - 1) && has(p.gi, p.gj + 1)); }
  function step() {
    const Ea = cat() ? 1.0 : 2.6;
    Pt.forEach(p => { if (!p.fixed) { p.x += p.vx; p.y += p.vy; } let w = 0; if ((p.x < BXL + 12 && p.vx < 0) || (p.x > BXR - 12 && p.vx > 0)) { p.vx *= -1; w = 1; } if ((p.y < BYT + 30 && p.vy < 0) || (p.y > BYB - 12 && p.vy > 0)) { p.vy *= -1; w = 1; } if (w && p.k !== 'X' && !p.fixed) kick(p); });
    for (const a of Pt) if (a.k === 'A') for (const b of Pt) if (b.k === 'B' && exposed(b)) { const dx = a.x - b.x, dy = a.y - b.y; if (dx * dx + dy * dy < 340) {
      const rel = Math.hypot(a.vx - b.vx, a.vy - b.vy);
      if (rel > Ea) { a.k = 'X'; b.k = 'X'; b.fixed = false; b.vx = a.vx * .5; b.vy = a.vy * .5; a.vx *= .5; a.vy *= .5; prod++; beep(true); FXP.add({ k: 'ring', x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, r: 8, grow: 30, life: .5, rgb: '250,204,21' }); }
      else { const d = Math.hypot(dx, dy) || 1, dot = (a.vx * dx + a.vy * dy) / d; if (dot < 0) { a.vx -= 2 * dot * dx / d; a.vy -= 2 * dot * dy / d; } FXP.add({ k: 'ring', x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, r: 4, grow: 10, life: .25, rgb: '148,163,184' }); }
      break; } }
    t += 1 / 60; if (t - hist[hist.length - 1][0] > .25) hist.push([t, prod]);
  }
  function sphere(c, x, y, r, col) { c.fillStyle = FX.rg(c, x - r * .35, y - r * .4, r * .1, r * 1.1, [[0, FX.mix(col, '#ffffff', .6)], [.6, col], [1, FX.mix(col, '#000000', .5)]]); c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); }
  function draw(c, s) {
    FX.room(c, s, 420, { window: false });
    const heat = (sp() - 1) / 4;
    FX.hotplate(c, BXL + 20, 420, BXR - BXL - 40, heat, s.t);
    FX.beaker(c, BXL, BYT, BXR - BXL, 310, .9, '#bae6fd', { alpha: .32, grad: false, inside(cc) {
      if (cat()) for (let j = 0; j < 8; j++) { cc.fillStyle = '#4b5563'; cc.beginPath(); cc.arc(BXL + 40 + j * 48, BYB - 8, 7, 0, 7); cc.fill(); }
      Pt.filter(p => p.k === 'B' && p.fixed).forEach(p => sphere(cc, p.x, p.y, 10, exposed(p) ? '#3b82f6' : '#1e3a8a'));
      Pt.forEach(p => { if (p.k === 'A') sphere(cc, p.x, p.y, 9, '#ef4444'); else if (p.k === 'B' && !p.fixed) sphere(cc, p.x, p.y, 10, '#3b82f6'); else if (p.k === 'X') { sphere(cc, p.x - 5, p.y, 8.5, '#a855f7'); sphere(cc, p.x + 6, p.y + 1, 8.5, '#7e22ce'); } });
      FXP.draw(cc);
    } });
    if (run) { const n = Math.max(1, Math.round(s.dt * 60)); for (let k = 0; k < n * 3; k++) step(); FXP.step(s.dt);
      if (prod >= 10) { run = false; runs++; const sa = body.querySelector('.sa'); body.querySelector('.tb').insertAdjacentHTML('afterbegin', `<tr><td>${runs}</td><td>${body.querySelector('.tpv').textContent}</td><td>${body.querySelector('.cc').value}</td><td>${sa.options[sa.selectedIndex].text}</td><td>${cat() ? 'نعم' : 'لا'}</td><td><b>${t.toFixed(1)} ث</b></td></tr>`); toast('اكتمل: غيّر عاملًا واحدًا فقط وقارن الزمن'); }
      else if (t > 90) { run = false; toast('التفاعل بطيء جدًّا في هذه الظروف'); } }
    FX.graph(c, 490, 70, 220, 200, { xmax: Math.max(20, Math.ceil(t / 10) * 10), ymax: 10, xstep: 10, ystep: 2, xlab: 'الزمن', ylab: 'النواتج', series: [{ pts: hist, col: '#a855f7' }] });
    // legend
    [['#ef4444', 'المادة (أ)'], ['#3b82f6', 'المادة (ب)'], ['#a855f7', 'الناتج']].forEach(([col, n], i) => { sphere(c, 690, 300 + i * 30, 8, col); FX.txt(c, n, 672, 300 + i * 30, { align: 'right', color: '#0f172a', size: 14 }); });
    if (cat()) FX.txt(c, '⚙ محفز', 690 - 18, 390, { align: 'right', size: 14, color: '#374151' });
    FX.tag(c, body.querySelector('.tpv').textContent, BXL + 70, 405 - 4, { bg: heat > .5 ? '#dc2626' : '#475569', size: 13 });
    body.querySelector('.np').textContent = prod + ' / 10'; body.querySelector('.tt').textContent = t.toFixed(1) + ' ث';
    if (!run && t === 0) FX.hint(c, (BXL + BXR) / 2, 220, s.t, 'اضغط «ابدأ» وراقب التصادمات', { r: 30 });
  }
  const upd = () => { body.querySelector('.tpv').textContent = [0, 0, 20, 40, 60, 80][sp()] + '°س'; body.querySelector('.ccv').textContent = body.querySelector('.cc').value; };
  ['.tp', '.cc', '.sa', '.cat'].forEach(sel => body.querySelector(sel).addEventListener('input', () => { upd(); if (!run) setup(); }));
  body.querySelector('.go').onclick = () => { if (run) return; if (prod >= 10 || t > 0) setup(); run = true; };
  body.querySelector('.rs').onclick = () => { run = false; setup(); };
  setup(); FX.stage(host, W, H, draw);
}

/* ---------- LAB 6: inhibitors & catalysts ---------- */
function labInhibit(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🍎 المثبطات والمحفزات</h3>
    <div class="muted" style="font-size:.88em"><b>أ) المثبطات:</b> ثلاث شرائح تفاح تُركت في الهواء.</div>
    <label class="rng">⏱ الزمن <input type="range" class="hr" min="0" max="6" step="0.1" value="0"><b class="hv">0</b> ساعات</label>
    <div class="row"><button class="btn alt play">▶ مرّر الزمن</button></div>
    <div class="rv" data-a="عصير الليمون مثبط يبطئ تفاعل مكونات التفاح مع الأكسجين، والتبريد يخفض درجة الحرارة فيبطئ التفاعل؛ أما الشريحة غير المعالجة فتتحول إلى البني أسرع.">لماذا تأخر تحوّل اللون في الشريحتين الأخيرتين؟</div>
    <div class="muted" style="font-size:.88em"><b>ب) المحفز:</b> تحلل فوق أكسيد الهيدروجين إلى ماء وأكسجين.</div>
    <div class="row"><button class="btn alt c0">بدون محفز</button><button class="btn c1">مع محفز (إنزيم من الكبد)</button></div>
    <div class="fxro"><div>كتلة المحفز قبل<b>1.00 جم</b></div><div>بعد التفاعل<b class="ma">—</b></div></div>
    <div class="fb msg"></div>
    <div class="tint card" style="box-shadow:none;font-size:.85em"><b>في المنزل:</b> اقرأ علبة رقائق الذرة أو البسكويت: المواد الحافظة مثل <b>BHT</b> مثبطات تطيل مدة الصلاحية.</div>`;
  const W = 780, H = 460, BY = 400;
  let hr = 0, playing = false, o = 0, mode = null, done = false;
  const P = FX.parts();
  function slice(c, x, y, lvl, k) { // apple slice seen from above
    FX.shadow(c, x, y + 50, 70, 10, .3);
    c.fillStyle = FX.lg(c, 0, y - 50, 0, y + 60, [[0, '#ffffff'], [1, '#cbd5e1']]); c.beginPath(); c.ellipse(x, y + 26, 78, 26, 0, 0, 7); c.fill();
    c.fillStyle = FX.rg(c, x - 20, y - 20, 10, 70, [[0, '#ef4444'], [1, '#991b1b']]); c.beginPath(); c.ellipse(x, y, 60, 48, 0, 0, 7); c.fill();
    const flesh = FX.mix('#fff6d5', '#8a5a2b', lvl / 7); c.fillStyle = FX.rg(c, x, y, 6, 56, [[0, FX.mix(flesh, '#ffffff', .25)], [1, flesh]]); c.beginPath(); c.ellipse(x, y, 53, 42, 0, 0, 7); c.fill();
    for (let i = 0; i < 18; i++) { const a = _R(i + k * 30) * 6.28, d = .3 + _R(i + k * 30 + 9) * .62, r = 6 + _R(i + k * 30 + 4) * 12, al = FX.clamp(lvl / 6 - _R(i + k * 7) * .5, 0, .75); c.fillStyle = `rgba(120,70,25,${al})`; c.beginPath(); c.ellipse(x + Math.cos(a) * 50 * d, y + Math.sin(a) * 40 * d, r, r * .8, a, 0, 7); c.fill(); }
    c.strokeStyle = FX.rgba('#a16207', .5); c.lineWidth = 1.2; for (let i = 0; i < 5; i++) { const a = i / 5 * 6.28; c.beginPath(); c.ellipse(x + Math.cos(a) * 8, y + Math.sin(a) * 7, 8, 4, a, 0, 7); c.stroke(); }
    for (let i = 0; i < 5; i++) { const a = i / 5 * 6.28 + .6; c.fillStyle = '#3f1d0b'; c.beginPath(); c.ellipse(x + Math.cos(a) * 12, y + Math.sin(a) * 10, 3.4, 2, a, 0, 7); c.fill(); }
  }
  function draw(c, s) {
    FX.room(c, s, BY);
    // cutting board
    FX.shadow(c, 225, BY + 2, 220, 8, .35); c.fillStyle = FX.lg(c, 0, BY - 20, 0, BY, [[0, '#e9c48f'], [1, '#b98a4f']]); FX.rr(c, 10, BY - 20, 430, 20, 6); c.fill();
    if (playing) { hr = Math.min(6, hr + s.dt); body.querySelector('.hr').value = hr; if (hr >= 6) playing = false; }
    body.querySelector('.hv').textContent = hr.toFixed(1);
    // fridge box for third
    c.fillStyle = 'rgba(191,219,254,.55)'; FX.rr(c, 300, BY - 210, 140, 190, 10); c.fill(); c.strokeStyle = '#93c5fd'; c.lineWidth = 3; c.stroke(); FX.txt(c, '❄ الثلاجة', 370, BY - 194, { size: 13, color: '#1e3a8a', disp: true });
    slice(c, 80, BY - 110, hr, 1); slice(c, 225, BY - 110, hr * .3, 2); slice(c, 370, BY - 110, hr * .35, 3);
    // lemon
    c.fillStyle = FX.rg(c, 205, BY - 45, 2, 22, [[0, '#fef08a'], [1, '#eab308']]); c.beginPath(); c.arc(258, BY - 40, 15, 0, 7); c.fill(); c.strokeStyle = '#fefce8'; c.lineWidth = 1.5; for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28; c.beginPath(); c.moveTo(258, BY - 40); c.lineTo(258 + Math.cos(a) * 12, BY - 40 + Math.sin(a) * 12); c.stroke(); }
    ['بلا معالجة', 'بعصير الليمون', 'في الثلاجة'].forEach((n, i) => FX.tag(c, n, 80 + i * 145, BY + 22, { size: 13, bg: 'rgba(15,23,42,.85)' }));
    FX.clock(c, 225, 52, 30, hr * 10, { text: hr.toFixed(1) + ' h' });
    // catalyst side: conical flask with balloon
    const fx = 600, fb = BY, ftop = BY - 170;
    FX.shadow(c, fx, fb + 2, 80, 8, .3);
    const flask = () => { c.beginPath(); c.moveTo(fx - 16, ftop); c.lineTo(fx - 16, ftop + 50); c.lineTo(fx - 70, fb - 8); c.quadraticCurveTo(fx - 72, fb, fx - 62, fb); c.lineTo(fx + 62, fb); c.quadraticCurveTo(fx + 72, fb, fx + 70, fb - 8); c.lineTo(fx + 16, ftop + 50); c.lineTo(fx + 16, ftop); };
    c.save(); flask(); c.closePath(); c.fillStyle = 'rgba(210,232,245,.25)'; c.fill(); c.clip(); c.fillStyle = 'rgba(186,230,253,.55)'; c.fillRect(fx - 80, fb - 60, 160, 60);
    if (mode === 'cat') { c.fillStyle = '#7f1d1d'; c.beginPath(); c.ellipse(fx, fb - 8, 20, 7, 0, 0, 7); c.fill(); }
    if (mode) { const n = mode === 'cat' ? 18 : 2; for (let j = 0; j < n; j++) { const ph = (s.t * (1 + j * .05) + j * .29) % 1; c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 1.2; c.beginPath(); c.arc(fx - 45 + (j * 23) % 90, fb - 6 - ph * 54, 2 + j % 3, 0, 7); c.stroke(); }
      if (mode === 'cat') for (let j = 0; j < 40 * Math.min(1, o / 60); j++) { c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.arc(fx - 40 + _R(j) * 80, fb - 60 - _R(j + 5) * 30, 4 + _R(j + 1) * 5, 0, 7); c.fill(); } }
    c.restore(); flask(); c.strokeStyle = 'rgba(90,120,145,.85)'; c.lineWidth = 2.2; c.stroke();
    const br = 10 + Math.min(100, o) * .42; c.fillStyle = FX.rg(c, fx - br * .3, ftop - br, 2, br * 1.3, [[0, '#bfdbfe'], [.7, '#3b82f6'], [1, '#1e3a8a']]); c.beginPath(); c.moveTo(fx - 14, ftop + 4); c.bezierCurveTo(fx - br * 1.2, ftop - br * .5, fx - br, ftop - br * 2, fx, ftop - br * 2.05); c.bezierCurveTo(fx + br, ftop - br * 2, fx + br * 1.2, ftop - br * .5, fx + 14, ftop + 4); c.closePath(); c.fill();
    c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(fx - br * .35, ftop - br * 1.4, br * .15, br * .3, -.3, 0, 7); c.fill(); c.fillStyle = '#1e40af'; FX.rr(c, fx - 18, ftop - 4, 36, 10, 3); c.fill();
    FX.txt(c, 'الأكسجين يملأ البالون', fx, ftop - br * 2.05 - 16, { size: 13, color: '#0f172a' });
    if (mode) { o = Math.min(100, o + s.dt * (mode === 'cat' ? 22 : 1.2)); if (!done && (o >= 100 || (mode !== 'cat' && o >= 8))) finish(); }
    if (done && mode === 'cat') { const t = FX.balance(c, 690, BY, 86, '1.00 g'); c.fillStyle = '#7f1d1d'; c.beginPath(); c.ellipse(733, t - 4, 14, 5, 0, 0, 7); c.fill(); }
    if (!mode) FX.hint(c, fx, fb - 40, s.t, 'اختر: بدون محفز أو مع محفز', { r: 34 });
    if (hr === 0 && !playing) FX.hint(c, 225, 52, s.t, 'مرّر الزمن', { r: 36 });
  }
  function finish() { done = true; if (mode === 'cat') { body.querySelector('.ma').textContent = '1.00 جم'; _fbk(body.querySelector('.msg'), true, '✔ مع المحفز تصاعد الأكسجين بسرعة كبيرة فانتفخ البالون، وبقيت كتلة المحفز <b>كما هي</b>: المحفز يسرّع التفاعل ولا يُستهلك. والنواتج (ماء + أكسجين) هي نفسها في التفاعلين.'); }
    else _fbk(body.querySelector('.msg'), false, 'بدون محفز يتحلل فوق أكسيد الهيدروجين ببطء شديد (فقاقيع قليلة جدًّا). جرّب إضافة المحفز.'); }
  const runIt = m => { mode = m; o = 0; done = false; body.querySelector('.ma').textContent = '—'; body.querySelector('.msg').className = 'fb msg'; };
  body.querySelector('.c0').onclick = () => runIt('none'); body.querySelector('.c1').onclick = () => runIt('cat');
  body.querySelector('.hr').oninput = e => { playing = false; hr = +e.target.value; };
  body.querySelector('.play').onclick = () => { if (hr >= 6) hr = 0; playing = true; };
  FX.stage(host, W, H, draw);
}
