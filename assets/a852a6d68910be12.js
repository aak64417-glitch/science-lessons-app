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

/* ===== Virtual labs — Chapter 11: Electricity (realistic canvas labs, labfx.js) ===== */
function _fb11(el, ok, msg) { const keep = [...el.classList].filter(c => !['fb', 'show', 'good', 'poor'].includes(c)).join(' '); el.className = 'fb show ' + (ok ? 'good' : 'poor') + ' ' + keep; el.innerHTML = msg; beep(ok); }
const r1_ = x => Math.round(x * 10) / 10, r2_ = x => Math.round(x * 100) / 100, r3_ = x => Math.round(x * 1000) / 1000;
const _R11 = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const _holdBtn = (b, set) => { b.addEventListener('pointerdown', e => { e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (_) { } set(1); }); ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => b.addEventListener(ev, () => set(0))); };
/* light bulb: (x,y) = bottom tip of base, s = scale, g = glow 0..1 */
function _bulb(c, x, y, s, g, o) {
  o = o || {}; const gy = y - 62 * s;
  if (g > .02) { c.fillStyle = FX.rg(c, x, gy, 4, 110 * s * (.5 + g), [[0, `rgba(255,236,140,${.75 * g})`], [.4, `rgba(255,210,80,${.3 * g})`], [1, 'rgba(255,200,60,0)']]); c.beginPath(); c.arc(x, gy, 110 * s * (.5 + g), 0, 7); c.fill(); }
  c.fillStyle = g > .02 ? `rgba(255,${250 - 20 * g | 0},${220 - 120 * g | 0},${.55 + .4 * g})` : 'rgba(225,238,248,.55)'; c.strokeStyle = 'rgba(120,140,160,.8)'; c.lineWidth = 1.5;
  c.beginPath(); c.arc(x, gy, 30 * s, Math.PI * .78, Math.PI * 2.22); c.lineTo(x + 12 * s, y - 30 * s); c.lineTo(x - 12 * s, y - 30 * s); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(255,255,255,.7)'; c.beginPath(); c.ellipse(x - 12 * s, gy - 10 * s, 5 * s, 10 * s, .5, 0, 7); c.fill();
  c.strokeStyle = '#64748b'; c.lineWidth = 1.2 * s; c.beginPath(); c.moveTo(x - 6 * s, y - 32 * s); c.lineTo(x - 9 * s, gy); c.moveTo(x + 6 * s, y - 32 * s); c.lineTo(x + 9 * s, gy); c.stroke();
  c.strokeStyle = g > .02 ? `rgb(255,${200 + 55 * g | 0},${120 + 100 * g | 0})` : '#78350f'; c.lineWidth = (g > .02 ? 2.4 : 1.4) * s; c.beginPath(); c.moveTo(x - 9 * s, gy);
  for (let k = 1; k <= 6; k++) c.lineTo(x - 9 * s + k * 3 * s, gy + (k % 2 ? -4 : 0) * s); c.stroke();
  c.fillStyle = FX.lg(c, x - 12 * s, 0, x + 12 * s, 0, [[0, '#9ca3af'], [.5, '#f3f4f6'], [1, '#6b7280']]); c.fillRect(x - 12 * s, y - 31 * s, 24 * s, 21 * s);
  c.strokeStyle = 'rgba(55,65,81,.6)'; c.lineWidth = 1.5 * s; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(x - 12 * s, y - 28 * s + k * 5 * s); c.lineTo(x + 12 * s, y - 26 * s + k * 5 * s); c.stroke(); }
  c.fillStyle = '#111827'; c.fillRect(x - 8 * s, y - 10 * s, 16 * s, 5 * s); c.fillStyle = '#b45309'; c.beginPath(); c.arc(x, y - 4 * s, 4 * s, 0, 7); c.fill();
  if (o.broken) { c.strokeStyle = '#111827'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 4 * s, gy - 6 * s); c.lineTo(x + 3 * s, gy + 2 * s); c.stroke(); }
}
/* D-cell drawn vertically, (x,y) = top of + nub, h = body height */
function _cell(c, x, y, w, h, label, o) {
  o = o || {}; FX.shadow(c, x, y + h + 10, w * .7, 6, .3);
  c.fillStyle = FX.lg(c, x - w / 2, 0, x + w / 2, 0, [[0, '#7c2d12'], [.45, '#f59e0b'], [1, '#78350f']]); FX.rr(c, x - w / 2, y + 8, w, h * .28, 6); c.fill();
  c.fillStyle = FX.lg(c, x - w / 2, 0, x + w / 2, 0, [[0, '#0b1220'], [.45, '#475569'], [1, '#0b1220']]); c.fillRect(x - w / 2, y + 8 + h * .26, w, h * .74 - 6);
  c.fillStyle = FX.lg(c, x - w / 2, 0, x + w / 2, 0, [[0, '#6b7280'], [.5, '#e5e7eb'], [1, '#4b5563']]); FX.rr(c, x - w / 2, y + h + 2, w, 8, 3); c.fill();
  c.fillStyle = FX.lg(c, x - 8, 0, x + 8, 0, [[0, '#9ca3af'], [.5, '#f9fafb'], [1, '#6b7280']]); FX.rr(c, x - 9, y, 18, 10, 3); c.fill();
  FX.txt(c, '+', x, y + 8 + h * .14, { color: '#fff', size: Math.max(12, w * .3), w: 800, mono: true }); FX.txt(c, label || '1.5V', x, y + h * .62, { color: '#fde68a', size: Math.max(10, w * .2), w: 700, mono: true }); FX.txt(c, '−', x, y + h - 6, { color: '#e2e8f0', size: Math.max(12, w * .3), w: 800, mono: true });
}
/* path helper for wires with moving electrons */
function _path(pts) { const seg = []; let L = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  return { L, at(s) { s = ((s % L) + L) % L; for (let i = 0; i < seg.length; i++) { if (s <= seg[i]) { const f = s / seg[i]; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f]; } s -= seg[i]; } return pts[pts.length - 1]; } }; }
function _wire(c, pts, col, I, t, o) { // pts ordered in electron direction (from − to +)
  o = o || {}; c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = (o.w || 7) + 2; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1] + 2) : c.moveTo(p[0], p[1] + 2)); c.stroke();
  c.strokeStyle = col || '#dc2626'; c.lineWidth = o.w || 7; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke();
  c.strokeStyle = 'rgba(255,255,255,.3)'; c.lineWidth = 2; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1] - 2) : c.moveTo(p[0], p[1] - 2)); c.stroke();
  if (I > 0) { const P = _path(pts), gap = o.gap || 28, off = (t * (30 + 160 * Math.min(1, I))) % gap;
    for (let s = off; s < P.L; s += gap) { const p = P.at(s); c.fillStyle = '#38bdf8'; c.beginPath(); c.arc(p[0], p[1], 3.6, 0, 7); c.fill(); c.fillStyle = '#0c4a6e'; c.font = `800 8px ${FX.MONO}`; c.textAlign = 'center'; c.fillText('−', p[0], p[1] + .5); c.textAlign = 'left'; } }
}
function _meter(c, x, y, val, unit, name, o) { // digital multimeter, x,y = top-left, 112x150
  o = o || {}; const w = 112, h = 150; FX.shadow(c, x + w / 2, y + h + 4, w * .5, 6, .3);
  c.fillStyle = FX.lg(c, 0, y, 0, y + h, [[0, o.col || '#facc15'], [1, FX.mix(o.col || '#facc15', '#000000', .3)]]); FX.rr(c, x, y, w, h, 14); c.fill();
  c.fillStyle = '#1f2937'; FX.rr(c, x + 8, y + 8, w - 16, h - 16, 10); c.fill();
  FX.lcd(c, x + 14, y + 16, w - 28, 36, val, { off: o.off });
  FX.txt(c, unit, x + w / 2, y + 66, { color: '#fde68a', size: 15, w: 800, mono: true }); FX.txt(c, name, x + w / 2, y + 88, { color: '#e2e8f0', size: 13, w: 700 });
  c.fillStyle = '#374151'; c.beginPath(); c.arc(x + w / 2, y + 116, 14, 0, 7); c.fill(); c.strokeStyle = '#9ca3af'; c.lineWidth = 3; c.beginPath(); c.moveTo(x + w / 2, y + 116); c.lineTo(x + w / 2 + 10, y + 108); c.stroke();
  c.fillStyle = '#dc2626'; c.beginPath(); c.arc(x + 22, y + h - 14, 5, 0, 7); c.fill(); c.fillStyle = '#111827'; c.beginPath(); c.arc(x + w - 22, y + h - 14, 5, 0, 7); c.fill();
  return { pPlus: [x + 22, y + h - 14], pMinus: [x + w - 22, y + h - 14] };
}
function _switch(c, x1, x2, y, closed) {
  c.fillStyle = '#334155'; FX.rr(c, x1 - 14, y - 6, x2 - x1 + 28, 16, 6); c.fill();
  [x1, x2].forEach(x => { c.fillStyle = '#d1d5db'; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); });
  const a = closed ? 0 : -.55; c.strokeStyle = '#e5e7eb'; c.lineWidth = 5; c.beginPath(); c.moveTo(x1, y); c.lineTo(x1 + Math.cos(a) * (x2 - x1), y + Math.sin(a) * (x2 - x1)); c.stroke();
  c.fillStyle = '#dc2626'; c.beginPath(); c.arc(x1 + Math.cos(a) * (x2 - x1) * .7, y + Math.sin(a) * (x2 - x1) * .7 - 6, 7, 0, 7); c.fill();
}
function _charges(c, x, y, rx, ry, n, sign, seed) { // scatter n charge symbols in an ellipse
  for (let k = 0; k < Math.abs(n); k++) { const a = _R11(seed + k) * 6.283, r = Math.sqrt(_R11(seed + k + 50)) * .85; const px = x + Math.cos(a) * rx * r, py = y + Math.sin(a) * ry * r;
    c.fillStyle = sign < 0 ? '#2563eb' : '#dc2626'; c.beginPath(); c.arc(px, py, 6.5, 0, 7); c.fill(); FX.txt(c, sign < 0 ? '−' : '+', px, py + .5, { color: '#fff', size: 12, w: 800, mono: true }); }
}

/* ---------- LAB 1: observing electric forces with balloons (launch lab p139) ---------- */
function labBalloon(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🎈 ملاحظة القوى الكهربائية</h3>`;
  const S = stepsList(panel, ['انفخ البالون (اضغط مطوّلًا)', 'قرّب البالون غير المشحون من القصاصات', 'ادلك البالون بقطعة الصوف لتشحنه', 'قرّب البالون المشحون من القصاصات', 'اشحن البالون الثاني وقرّب البالونين']);
  panel.insertAdjacentHTML('beforeend', `<div class="mini"><button class="btn blow">💨 انفخ (اضغط مطوّلًا)</button><button class="btn alt b2" disabled>🎈 اشحن البالون الثاني</button><button class="btn alt rs">↺</button></div>
    <div class="fxro"><div>شحنة البالون<b class="qv">0</b></div><div>القصاصات الملتصقة<b class="nv">0</b></div></div>
    <table class="data"><thead><tr><th>الحالة</th><th>الملاحظة</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="rv" data-a="البالون المشحون جذب القصاصات (قوة تجاذب)، والبالونان المشحونان بالطريقة نفسها يحملان شحنة متشابهة (سالبة) فتنافرا (قوة تنافر)؛ وكلتاهما قوة كهربائية تؤثر عن بعد دون تلامس.">التفكير الناقد: قارن بين القوة التي أثّر بها البالون في القصاصات، والقوة التي أثّر بها أحد البالونين في الآخر.</div>`);
  const q = s => body.querySelector(s), BY = 410, WOOL = { x: 70, y: BY - 44, w: 150, h: 40 }, HX = 560;
  let size, bx, by, Q, Q2, blow, rubPrev, obs, ang2, scraps, step;
  function reset() { size = .25; bx = 330; by = 170; Q = 0; Q2 = 0; blow = 0; rubPrev = null; obs = {}; ang2 = 0; step = 0; q('.tb').innerHTML = ''; q('.b2').disabled = true;
    scraps = Array.from({ length: 16 }, (_, i) => ({ x: 300 + (_R11(i) - .5) * 170, y: BY - 3 - _R11(i + 9) * 4, hx: 0, hy: 0, a: _R11(i + 3) * 3, col: ['#fde68a', '#fecaca', '#bfdbfe', '#bbf7d0', '#fff'][i % 5], stuck: false, vy: 0 })); }
  function note(k, a, b) { if (obs[k]) return; obs[k] = 1; q('.tb').insertAdjacentHTML('beforeend', `<tr><td>${a}</td><td><b>${b}</b></td></tr>`); beep(true); }
  function balloon(c, x, y, r, col, n, seed) { c.strokeStyle = '#64748b'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x, y + r * 1.15); c.quadraticCurveTo(x + 8, y + r * 1.6, x, y + r * 2.1); c.stroke();
    c.fillStyle = FX.rg(c, x - r * .35, y - r * .4, r * .1, r * 1.3, [[0, FX.mix(col, '#ffffff', .55)], [.5, col], [1, FX.mix(col, '#000000', .35)]]); c.beginPath(); c.ellipse(x, y, r * .9, r * 1.1, 0, 0, 7); c.fill();
    c.fillStyle = FX.mix(col, '#000000', .3); c.beginPath(); c.moveTo(x - 5, y + r * 1.15); c.lineTo(x + 5, y + r * 1.15); c.lineTo(x, y + r * 1.05); c.fill();
    if (n) _charges(c, x, y, r * .7, r * .85, Math.min(14, Math.round(n)), -1, seed); }
  function draw(c, st) {
    FX.room(c, st, BY); FX.bench(c, st.x0, st.x1, BY, st.y1);
    if (blow && size < 1) { size = Math.min(1, size + st.dt * .45); if (size >= 1) { blow = 0; toast('البالون جاهز: اسحبه بالقرب من القصاصات'); } }
    // wool cloth
    c.fillStyle = '#b91c1c'; FX.rr(c, WOOL.x, WOOL.y + 14, WOOL.w, WOOL.h - 14, 10); c.fill(); c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = 2; for (let k = 0; k < 12; k++) { c.beginPath(); c.moveTo(WOOL.x + 8 + k * 12, WOOL.y + 18); c.lineTo(WOOL.x + 14 + k * 12, WOOL.y + 36); c.stroke(); }
    FX.txt(c, 'قطعة صوف', WOOL.x + WOOL.w / 2, BY + 18, { color: '#fff', size: 13 });
    // second balloon hanging from stand
    if (step >= 4) { c.fillStyle = '#475569'; c.fillRect(HX + 60, 60, 8, BY - 60); c.fillRect(HX - 20, 56, 88, 8); c.fillRect(HX + 30, BY - 8, 70, 8);
      const L = 170, d = Math.hypot(bx - HX, by - (60 + L)), f = Q * Q2 * 0.9 / Math.max(60, d) ** 2 * 900; const tgt = FX.clamp((HX - bx > 0 ? 1 : -1) * f * (Q2 > 0 ? 1 : -.4), -.6, .6); ang2 += (tgt - ang2) * Math.min(1, st.dt * 4);
      const x2 = HX + Math.sin(ang2) * L, y2 = 60 + Math.cos(ang2) * L; c.strokeStyle = '#94a3b8'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(HX, 60); c.lineTo(x2, y2 - 46 * .9); c.stroke(); balloon(c, x2, y2 - 46 * .9 + 46 * 1.1, 42, '#22c55e', Q2 * .5, 77);
      if (Q > 3 && Q2 > 3 && Math.abs(ang2) > .3) note('two', 'بالونان مشحونان', 'يتنافران: يبتعد أحدهما عن الآخر'); }
    // scraps
    const r = 50 * size, bot = by + r * 1.1;
    scraps.forEach((p, i) => { if (!p.stuck) { const d = Math.hypot(bx - p.x, bot - p.y), pull = Q * 9 / Math.max(30, d);
        if (Q > 2 && d < 120 && pull > .55) { p.vy -= 260 * st.dt; p.x += (bx - p.x) * st.dt * 3; p.y += p.vy * st.dt; if (p.y <= bot + 4) { p.stuck = true; p.hx = p.x - bx; p.hy = 0; } } else if (p.y < BY - 3) { p.vy += 500 * st.dt; p.y = Math.min(BY - 3, p.y + p.vy * st.dt); } else p.vy = 0; }
      else { p.x = bx + p.hx; p.y = bot + 2 + Math.abs(p.hx) * .05; }
      c.save(); c.translate(p.x, p.y); c.rotate(p.a); c.fillStyle = p.col; c.fillRect(-6, -3, 12, 6); c.strokeStyle = 'rgba(0,0,0,.15)'; c.strokeRect(-6, -3, 12, 6); c.restore(); });
    const nStuck = scraps.filter(p => p.stuck).length; q('.nv').textContent = nStuck;
    if (size > .99 && Q < .5 && Math.hypot(bx - 300, bot - BY) < 70) note('nq', 'بالون غير مشحون + قصاصات', 'لا تنجذب القصاصات');
    if (nStuck >= 3) note('q', 'بالون مشحون + قصاصات', 'تنجذب القصاصات وتلتصق به (تجاذب)');
    // balloon (draggable once inflated)
    balloon(c, bx, by, r, '#ef4444', Q, 11);
    c.fillStyle = '#e0ac69'; c.beginPath(); c.arc(bx, by + r * 2.15, 10, 0, 7); c.fill();
    if (size > .99) st.hit({ id: 'b', x: bx - r, y: by - r * 1.2, w: 2 * r, h: r * 3.4, drag: { move(p) { const nx = FX.clamp(p.x, 60, 700), ny = FX.clamp(p.y, 70, BY - r * 1.1 - 6);
      if (nx > WOOL.x && nx < WOOL.x + WOOL.w && ny + r * 1.1 > WOOL.y - 4) { if (rubPrev) { Q = Math.min(14, Q + Math.abs(nx - rubPrev) * .02); } rubPrev = nx; } else rubPrev = null; bx = nx; by = ny; } } });
    if (Q > .5 && Math.random() < .1 && rubPrev) FX.tag(c, 'تنتقل إلكترونات من الصوف إلى البالون', bx, by - r * 1.4, { size: 12, bg: '#2563eb' });
    q('.qv').textContent = Q < .5 ? '0' : '−' + Math.round(Q);
    step = size < 1 ? 0 : !obs.nq ? 1 : Q < 5 && !obs.q ? 2 : !obs.q ? 3 : 4;
    if (step === 4 && q('.b2').disabled && Q2 === 0) q('.b2').disabled = false;
    S.set(obs.two ? 5 : step);
    if (size < 1 && !blow) FX.hint(c, bx, by, st.t, 'اضغط مطوّلًا على «انفخ»', { r: 30 });
    else if (step === 1) FX.hint(c, 300, BY - 20, st.t, 'اسحب البالون قرب القصاصات', { r: 30 });
    else if (step === 2) FX.hint(c, WOOL.x + WOOL.w / 2, WOOL.y, st.t, 'ادلك البالون على الصوف ذهابًا وإيابًا', { r: 30, dx: 60 });
    else if (step === 4 && Q2 > 0 && !obs.two) FX.hint(c, HX, 270, st.t, 'قرّب بالونك من البالون الأخضر', { r: 40, dx: -40 });
  }
  _holdBtn(q('.blow'), v => blow = v);
  q('.b2').onclick = () => { Q2 = 10; Q = Math.max(Q, 10); q('.b2').disabled = true; toast('شُحن البالون الثاني بالصوف أيضًا: كلاهما سالب'); };
  q('.rs').onclick = reset; reset(); FX.stage(host, 760, 470, draw, { vy: 6 });
}

/* ---------- LAB 2: electric force vs charge & distance (Fig. 3, p143) ---------- */
function labCoulomb(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>⚛ القوة الكهربائية</h3>
    <label class="rng">شحنة الكرة A <input type="range" class="q1" min="-3" max="3" value="2"><b class="q1v">+2</b></label>
    <label class="rng">شحنة الكرة B <input type="range" class="q2" min="-3" max="3" value="-2"><b class="q2v">−2</b></label>
    <div class="mini"><label class="row" style="gap:.2em;font-size:.82em"><input type="checkbox" class="fld" checked> إظهار المجال الكهربائي</label><button class="btn rec">📋 سجّل</button></div>
    <div class="fxro"><div>المسافة<b class="dv">20 سم</b></div><div>نوع القوة<b class="tv" style="font-family:inherit;font-size:1em">تجاذب</b></div><div>مقدار القوة<b class="fv">1.0</b></div></div>
    <table class="data"><thead><tr><th>A</th><th>B</th><th>المسافة</th><th>القوة</th><th>النوع</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="rv" data-a="تزداد القوة الكهربائية بين الكرتين بزيادة كمية الشحنة على كل منهما، وتقل بزيادة المسافة بينهما، ويبقى نوعها (تجاذب أو تنافر) معتمدًا على نوع الشحنتين.">الشكل 3: وضّح كيف تتغيّر هذه القوى عندما تزداد كمية الشحنات على كل من الكرتين؟</div>`;
  const q = s => body.querySelector(s), g = s => +q(s).value, BY = 400, AX = 240, PX = 10; // 10 px per cm
  let bxp = 440, rows = 0;
  const dcm = () => (bxp - AX) / PX, F = () => g('.q1') * g('.q2') * 400 / dcm() ** 2; // relative force units (1.0 at ±2,20cm)
  function sgn(v) { return v > 0 ? '+' + v : v < 0 ? '−' + (-v) : '0'; }
  function upd() { q('.q1v').textContent = sgn(g('.q1')); q('.q2v').textContent = sgn(g('.q2')); const f = F(); q('.dv').textContent = r1_(dcm()) + ' سم'; q('.tv').textContent = f === 0 ? 'لا توجد' : f < 0 ? 'تجاذب' : 'تنافر'; q('.fv').textContent = r2_(Math.abs(f)); }
  function sphere(c, x, y, qv, lbl) {
    c.fillStyle = '#94a3b8'; c.fillRect(x - 4, y + 30, 8, BY - y - 40); c.fillStyle = '#475569'; FX.rr(c, x - 36, BY - 12, 72, 12, 5); c.fill(); FX.txt(c, 'حامل عازل', x, BY + 14, { size: 11, color: '#334155' });
    const col = qv > 0 ? '#ef4444' : qv < 0 ? '#3b82f6' : '#9ca3af'; c.fillStyle = FX.rg(c, x - 10, y - 10, 3, 34, [[0, FX.mix(col, '#ffffff', .6)], [.6, col], [1, FX.mix(col, '#000000', .4)]]); c.beginPath(); c.arc(x, y, 30, 0, 7); c.fill();
    for (let k = 0; k < Math.abs(qv); k++) { const a = -1.2 + k * 1.2; FX.txt(c, qv > 0 ? '+' : '−', x + Math.cos(a) * 14 - 2, y + Math.sin(a) * 14 + 6, { color: '#fff', size: 18, w: 800, mono: true }); }
    FX.tag(c, lbl, x, y - 50, { size: 13, bg: '#0f172a' }); }
  function draw(c, st) {
    FX.room(c, st, BY); FX.bench(c, st.x0, st.x1, BY, st.y1);
    const Y = 220, q1 = g('.q1'), q2 = g('.q2');
    if (q('.fld').checked) { for (let gx = 60; gx <= 720; gx += 44) for (let gy = 70; gy <= 360; gy += 44) { let ex = 0, ey = 0;
        [[AX, q1], [bxp, q2]].forEach(([sx, sq]) => { const dx = gx - sx, dy = gy - Y, r2 = dx * dx + dy * dy; if (r2 < 1600) return; const r = Math.sqrt(r2); ex += sq * dx / (r2 * r); ey += sq * dy / (r2 * r); });
        const m = Math.hypot(ex, ey); if (m < 1e-9 || Math.hypot(gx - AX, gy - Y) < 40 || Math.hypot(gx - bxp, gy - Y) < 40) continue; const L = 14, a = Math.min(.8, m * 2e4 + .15);
        c.globalAlpha = a; FX.arrow(c, gx - ex / m * L / 2, gy - ey / m * L / 2, gx + ex / m * L / 2, gy + ey / m * L / 2, '#7c3aed', 2); c.globalAlpha = 1; } }
    // ruler
    c.fillStyle = '#fef3c7'; c.fillRect(AX, BY - 30, 500, 16); c.strokeStyle = '#78350f'; c.lineWidth = 1; for (let k = 0; k <= 50; k++) { const x = AX + k * PX; c.beginPath(); c.moveTo(x, BY - 30); c.lineTo(x, BY - (k % 5 ? 25 : 20)); c.stroke(); if (k % 10 === 0) FX.txt(c, k, x, BY - 12, { size: 10, mono: true }); }
    sphere(c, AX, Y, q1, 'A'); sphere(c, bxp, Y, q2, 'B (اسحبها)');
    const f = F(); if (f !== 0) { const L = FX.clamp(Math.abs(f) * 40, 12, 150), dir = f > 0 ? 1 : -1; FX.arrow(c, AX - 34 * (dir > 0 ? 1 : -1) * 0 + (dir > 0 ? -34 : 34), Y, AX + (dir > 0 ? -34 - L : 34 + L), Y, '#16a34a', 6); FX.arrow(c, bxp + (dir > 0 ? 34 : -34), Y, bxp + (dir > 0 ? 34 + L : -34 - L), Y, '#16a34a', 6);
      FX.tag(c, f < 0 ? 'الشحنات المختلفة تتجاذب' : 'الشحنات المتشابهة تتنافر', (AX + bxp) / 2, 110, { size: 15, bg: f < 0 ? '#2563eb' : '#dc2626' }); } else FX.tag(c, 'إحدى الكرتين متعادلة: لا توجد قوة كهربائية', (AX + bxp) / 2, 110, { size: 14, bg: '#475569' });
    st.hit({ id: 'B', x: bxp - 34, y: Y - 34, w: 68, h: 68, drag: { move(p) { bxp = FX.clamp(Math.round(p.x / PX) * PX, AX + 80, AX + 480); upd(); } } });
    if (!rows) FX.hint(c, bxp, Y, st.t, 'اسحب الكرة B لتغيير المسافة', { r: 40, dx: -20 });
  }
  q('.rec').onclick = () => { const f = F(); rows++; const tb = q('.tb'); if (tb.rows.length >= 4) tb.deleteRow(0); tb.insertAdjacentHTML('beforeend', `<tr><td>${sgn(g('.q1'))}</td><td>${sgn(g('.q2'))}</td><td>${r1_(dcm())}</td><td><b>${r2_(Math.abs(f))}</b></td><td>${f === 0 ? '—' : f < 0 ? 'تجاذب' : 'تنافر'}</td></tr>`); beep(true); };
  ['.q1', '.q2'].forEach(s => q(s).addEventListener('input', upd)); upd(); FX.stage(host, 760, 450, draw, { vy: 4 });
}

/* ---------- LAB 3: charging by induction & spark at the door knob (Fig. 4, p143–144) ---------- */
function labSpark(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>⚡ الشرارة عند مقبض الباب</h3>`;
  const S = stepsList(panel, ['اسحب الشخص ليسير فوق السجادة (الاحتكاك ينقل الإلكترونات)', 'قرّب يده من مقبض الباب الفلزي ولاحظ الشحن بالحث', 'لاحظ التفريغ الكهربائي (الشرارة)', 'أجب: لماذا قفزت الإلكترونات؟']);
  panel.insertAdjacentHTML('beforeend', `<div class="fxro"><div>الإلكترونات على الجسم<b class="ev">0</b></div><div>المسافة إلى المقبض<b class="gv">—</b></div></div>
    <div class="mini"><button class="btn alt rs">↺ أعد التجربة</button></div><div class="fb msg"></div>
    <div class="rv" data-a="المجال الكهربائي السالب حول اليد يدفع إلكترونات المقبض بعيدًا فيصبح جزؤه القريب موجبًا (الشحن بالحث)، وعندما تصبح قوة الجذب بين الإلكترونات على اليد والشحنة الموجبة على المقبض قوية بشكل كافٍ تنتزع الإلكترونات من اليد إلى المقبض على هيئة شرارة (تفريغ كهربائي).">فسّر: لماذا قفزت الإلكترونات من يدك إلى المقبض؟</div>
    <div class="rv" data-a="البرق والصاعقة.">الشكل 4: حدّد مثالًا آخر على التفريغ الكهربائي.</div>`);
  const q = s => body.querySelector(s), FY = 420, CARPET = [40, 520], KX = 690, KY = 268;
  let px, n, prev, sparkT, sparks, done, ph;
  const P = FX.parts();
  function reset() { px = 90; n = 0; prev = px; sparkT = 0; done = 0; ph = 0; q('.msg').className = 'fb msg'; }
  function draw(c, st) {
    FX.floor(c, st, 300, { w0: '#e0f2fe', w1: '#bae6fd', f0: '#d6d3d1', f1: '#a8a29e' });
    c.fillStyle = '#7f1d1d'; c.fillRect(CARPET[0], FY - 4, CARPET[1] - CARPET[0], 14); for (let x = CARPET[0]; x < CARPET[1]; x += 6) { c.fillStyle = x % 12 ? '#991b1b' : '#b91c1c'; c.fillRect(x, FY - 7, 3, 5); } FX.txt(c, 'سجادة صوفية', 280, FY + 24, { color: '#7f1d1d', size: 13 });
    // door
    c.fillStyle = FX.lg(c, 700, 0, 760, 0, [[0, '#a16207'], [1, '#713f12']]); c.fillRect(700, 40, 70, FY - 40); c.fillStyle = '#d97706'; c.fillRect(696, 40, 6, FY - 40);
    c.fillStyle = FX.rg(c, KX - 4, KY - 4, 2, 18, [[0, '#fef9c3'], [.6, '#eab308'], [1, '#854d0e']]); c.beginPath(); c.arc(KX, KY, 16, 0, 7); c.fill(); c.fillStyle = '#ca8a04'; c.fillRect(KX, KY - 6, 14, 12);
    // person (side view facing right)
    const H = 250, handX = px + 70, handY = KY + 4, gap = KX - 16 - handX;
    FX.person(c, px, FY - 6, H, ph, { color: '#16a34a', dir: 1 });
    c.strokeStyle = '#16a34a'; c.lineWidth = 12; c.beginPath(); c.moveTo(px + 6, FY - 6 - H * .78); c.lineTo(handX - 8, handY); c.stroke(); c.fillStyle = '#e0ac69'; c.beginPath(); c.arc(handX, handY, 9, 0, 7); c.fill();
    // charges on body
    const show = Math.min(18, Math.round(n));
    for (let k = 0; k < show; k++) { const t = k / 18; let x, y; if (k % 3 === 0 && show > 6) { x = handX - 4 - _R11(k) * 30; y = handY - 6 + _R11(k + 5) * 12; } else { x = px - 14 + _R11(k + 2) * 28; y = FY - 20 - t * H * .75; } c.fillStyle = '#2563eb'; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); FX.txt(c, '−', x, y + .5, { color: '#fff', size: 11, w: 800, mono: true }); }
    // induction on knob
    const ind = n > 2 && gap < 120 ? Math.min(1, (120 - gap) / 80) * Math.min(1, n / 10) : 0;
    if (ind > 0) { for (let k = 0; k < 3; k++) { const a = Math.PI * (.75 + k * .25); c.fillStyle = '#dc2626'; c.beginPath(); c.arc(KX + Math.cos(a) * 12, KY + Math.sin(a) * 12, 6, 0, 7); c.fill(); FX.txt(c, '+', KX + Math.cos(a) * 12, KY + Math.sin(a) * 12 + .5, { color: '#fff', size: 11, w: 800, mono: true }); }
      for (let k = 0; k < 3; k++) { const x = KX + 26 + k * 12 * ind, y = KY - 10 + k * 10; c.fillStyle = '#2563eb'; c.beginPath(); c.arc(x, y, 6, 0, 7); c.fill(); FX.txt(c, '−', x, y + .5, { color: '#fff', size: 11, w: 800, mono: true }); }
      if (!done) FX.tag(c, 'الشحن بالحث: الإلكترونات على المقبض تتنافر مع إلكترونات يدك وتبتعد', 380, 70, { size: 13, bg: '#7c3aed' }); }
    // spark condition
    if (!done && n > 3 && gap < 4 + n * 1.6) { done = 1; sparkT = .5; const m = n; n = 0; beep(true); for (let k = 0; k < 26; k++) P.add({ k: 'spark', x: handX + 10, y: handY, vx: (Math.random() - .3) * 220, vy: (Math.random() - .5) * 220, life: .6, r: 3 });
      _fb11(q('.msg'), true, `⚡ تفريغ كهربائي! قفزت ${Math.round(m)} إلكترونات من يدك إلى المقبض على هيئة شرارة، وشعرت بلسعة خفيفة.`); }
    if (sparkT > 0) { sparkT -= st.dt; c.strokeStyle = `rgba(255,255,255,${sparkT * 2})`; c.lineWidth = 4; c.shadowColor = '#fde047'; c.shadowBlur = 18; c.beginPath(); c.moveTo(handX + 8, handY); const segs = 5; for (let k = 1; k <= segs; k++) c.lineTo(handX + 8 + (KX - 16 - handX - 8) * k / segs, handY + (k < segs ? (Math.random() - .5) * 14 : -2)); c.stroke(); c.shadowBlur = 0; }
    P.step(st.dt); P.draw(c);
    st.hit({ id: 'p', x: px - 40, y: FY - H - 20, w: 120, h: H + 20, drag: { move(pp) { const nx = FX.clamp(pp.x - 20, 60, KX - 16 - 70 - 2); if (nx < CARPET[1] && Math.abs(nx - prev) > 0) { n = Math.min(30, n + Math.abs(nx - prev) * .035); ph += Math.abs(nx - prev) * .05; } prev = nx; px = nx; if (done && nx < KX - 200) done = 0; } } });
    q('.ev').textContent = Math.round(n); q('.gv').textContent = Math.max(0, Math.round(gap / 4)) + ' سم';
    S.set(done ? (sparkT > 0 ? 2 : 3) : n < 6 ? 0 : 1);
    if (n < 1 && !done) FX.hint(c, px + 10, FY - 140, st.t, 'اسحب الشخص فوق السجادة ذهابًا وإيابًا', { r: 40, dx: 60 });
    else if (n >= 6 && !done && gap > 60) FX.hint(c, KX, KY, st.t, 'قرّب اليد من المقبض', { r: 26, dx: -60 });
  }
  q('.rs').onclick = reset; reset(); FX.stage(host, 780, 470, draw, { vy: 6 });
}

/* ---------- LAB 4: investigating electric force — salt & pepper (side lab p145) ---------- */
function labPepper(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🧂 الملح والفلفل</h3>`;
  const S = stepsList(panel, ['ضع طبقة من الملح على الطبق', 'رشّ قليلًا من مسحوق الفلفل فوق الملح', 'ادلك المشط البلاستيكي بقطعة صوف', 'قرّب المشط من الخليط بلطف ولاحظ']);
  panel.insertAdjacentHTML('beforeend', `<div class="mini"><button class="btn salt">🧂 ضع الملح</button><button class="btn alt pep" disabled>🌶 رشّ الفلفل</button><button class="btn alt rs">↺</button></div>
    <div class="fxro"><div>شحنة المشط<b class="qv">0</b></div><div>ارتفاع المشط<b class="hv">—</b></div><div>فلفل/ملح على المشط<b class="cv">0/0</b></div></div>
    <div class="rv" data-a="انجذب الفلفل إلى المشط من مسافة أكبر وقفز وتعلّق به، بينما لم ينجذب الملح إلا عند تقريب المشط كثيرًا (أو بقي في الطبق).">التحليل 1: كيف استجاب كل من الملح والفلفل مع المشط؟</div>
    <div class="rv" data-a="حبيبات الفلفل أخف كتلة من حبيبات الملح، فتتغلب القوة الكهربائية للمشط المشحون على وزنها بسهولة ومن مسافة أكبر، أما الملح فوزنه أكبر فيحتاج إلى قوة أكبر (مسافة أقرب).">التحليل 2: فسّر سبب استجابة الفلفل بصورة مختلفة عن استجابة الملح مع المشط.</div>`);
  const q = s => body.querySelector(s), BY = 420, PLX = 400, PLY = 380, WOOL = { x: 60, y: 300, w: 140, h: 40 };
  let st0, Q, cx, cy, grains, rubPrev;
  function reset() { st0 = 0; Q = 0; cx = 600; cy = 200; grains = []; rubPrev = null; q('.pep').disabled = true; q('.salt').disabled = false; }
  function addG(kind, n) { for (let k = 0; k < n; k++) { const a = Math.random() * 6.283, r = Math.sqrt(Math.random()) * 120; grains.push({ k: kind, x: PLX + Math.cos(a) * r, y: Math.min(PLY - 5, PLY - 6 - Math.random() * 5 + Math.sin(a) * r * .08), vy: 0, stuck: 0, hx: 0 }); } }
  function draw(c, st) {
    FX.room(c, st, BY); FX.bench(c, st.x0, st.x1, BY, st.y1);
    c.fillStyle = '#b91c1c'; FX.rr(c, WOOL.x, WOOL.y, WOOL.w, WOOL.h, 10); c.fill(); FX.txt(c, 'قطعة صوف', WOOL.x + WOOL.w / 2, WOOL.y + 20, { color: '#fff', size: 13 }); c.fillStyle = '#64748b'; c.fillRect(WOOL.x + 10, WOOL.y + WOOL.h, WOOL.w - 20, BY - WOOL.y - WOOL.h);
    // plate
    FX.shadow(c, PLX, PLY + 14, 160, 10, .3); c.fillStyle = FX.lg(c, 0, PLY - 14, 0, PLY + 12, [[0, '#ffffff'], [1, '#cbd5e1']]); c.beginPath(); c.ellipse(PLX, PLY, 160, 22, 0, 0, 7); c.fill(); c.fillStyle = '#e2e8f0'; c.beginPath(); c.ellipse(PLX, PLY - 4, 130, 15, 0, 0, 7); c.fill();
    const tY = cy + 14;
    grains.forEach(g => { if (!g.stuck) { const d = Math.max(8, tY - g.y), near = Math.abs(g.x - cx) < 120; const m = g.k === 'p' ? 1 : 16, pull = Q * 260 / (d * d) / m;
        if (Q > 2 && near && pull > 1 && g.y > tY) { g.vy -= 600 * st.dt * Math.min(3, pull); g.y += g.vy * st.dt; g.x += (cx - g.x) * st.dt * .8; if (g.y <= tY) { g.stuck = 1; g.hx = g.x - cx; } } else if (g.y < PLY - 6) { g.vy += 700 * st.dt; g.y = Math.min(PLY - 6, g.y + g.vy * st.dt); } else g.vy = 0; }
      else { g.x = cx + g.hx; g.y = tY + 5; }
      c.fillStyle = g.k === 'p' ? '#1f2937' : '#ffffff'; if (g.k === 's') { c.strokeStyle = 'rgba(100,116,139,.6)'; c.lineWidth = .8; c.fillRect(g.x - 2, g.y - 2, 4, 4); c.strokeRect(g.x - 2, g.y - 2, 4, 4); } else { c.beginPath(); c.arc(g.x, g.y, 2.2, 0, 7); c.fill(); } });
    // comb
    c.save(); c.translate(cx, cy); c.fillStyle = '#1e3a8a'; FX.rr(c, -110, -10, 220, 18, 6); c.fill(); for (let k = -104; k <= 104; k += 7) c.fillRect(k, 6, 4, 10); c.restore();
    if (Q > .5) _charges(c, cx, cy - 2, 90, 6, Math.min(10, Math.round(Q)), -1, 31);
    st.hit({ id: 'comb', x: cx - 110, y: cy - 20, w: 220, h: 40, drag: { move(p) { const nx = FX.clamp(p.x, 130, 650), ny = FX.clamp(p.y, 90, PLY - 46);
      if (nx > WOOL.x - 60 && nx < WOOL.x + WOOL.w + 60 && ny > WOOL.y - 30 && ny < WOOL.y + 10) { if (rubPrev != null) Q = Math.min(12, Q + Math.abs(nx - rubPrev) * .02); rubPrev = nx; } else rubPrev = null; cx = nx; cy = ny; } } });
    const nP = grains.filter(g => g.stuck && g.k === 'p').length, nS = grains.filter(g => g.stuck && g.k === 's').length;
    q('.qv').textContent = Q < .5 ? '0' : '−' + Math.round(Q); q('.hv').textContent = Math.max(0, Math.round((PLY - 6 - tY) / 6)) + ' سم'; q('.cv').textContent = nP + '/' + nS;
    const step = st0 === 0 ? 0 : st0 === 1 ? 1 : Q < 4 ? 2 : nP < 10 ? 3 : 4; S.set(step);
    if (step === 2) FX.hint(c, WOOL.x + WOOL.w / 2, WOOL.y, st.t, 'اسحب المشط فوق الصوف ذهابًا وإيابًا', { r: 30, dx: 80 });
    if (step === 3) FX.hint(c, PLX, PLY - 60, st.t, 'قرّب المشط من الخليط ببطء', { r: 34 });
    if (nP >= 10 && nS < 5) FX.tag(c, 'قفز الفلفل الأخف إلى المشط وبقي معظم الملح', PLX, 60, { size: 14, bg: '#16a34a' });
  }
  q('.salt').onclick = () => { addG('s', 260); st0 = 1; q('.salt').disabled = true; q('.pep').disabled = false; q('.pep').classList.remove('alt'); beep(true); };
  q('.pep').onclick = () => { addG('p', 70); st0 = 2; q('.pep').disabled = true; beep(true); };
  q('.rs').onclick = reset; reset(); FX.stage(host, 760, 460, draw, { vy: 6 });
}

/* ---------- LAB 5: conductors vs insulators — circuit tester (p143 & practical lab p145) ---------- */
function labConduct(body) {
  const { host, panel } = labShell(body);
  const M = [['سلك نحاس', 'c', '#b45309', 1], ['ورق ألومنيوم', 'c', '#cbd5e1', .95], ['مسمار حديد', 'c', '#6b7280', .85], ['خاتم ذهب', 'c', '#eab308', 1], ['محلول ملح', 'c', '#bae6fd', .45],
             ['ملعقة بلاستيك', 'i', '#f472b6', 0], ['قلم خشبي', 'i', '#d97706', 0], ['قضيب زجاجي', 'i', '#e0f2fe', 0], ['ممحاة مطاطية', 'i', '#fca5a5', 0]];
  panel.innerHTML = `<h3>🔌 فاحص التوصيل الكهربائي</h3>
    <div class="q" style="margin:0;font-size:.85em">اسحب كل مادة من الصينية إلى الفجوة بين المشبكين، ثم صنّفها.</div>
    <div class="fxro"><div>المادة<b class="mv" style="font-family:inherit;font-size:.95em">—</b></div><div>التيار<b class="iv">0.00 A</b></div></div>
    <table class="data"><thead><tr><th>موصلة</th><th>عازلة</th></tr></thead><tbody><tr><td class="tc" style="font-size:.85em"></td><td class="ti" style="font-size:.85em"></td></tr></tbody></table>
    <div class="fb msg"></div>
    <div class="rv" data-a="لأن ارتباط الإلكترونات بذرات الفلزات ضعيف فتتحرك بسهولة، أما في العوازل فلا تتحرك الإلكترونات بسهولة. ومحلول الملح يوصل بسبب حركة أيونات الصوديوم والكلور.">فسّر: لماذا تُعدّ الفلزات موصلات جيدة؟ ولماذا أضاء المصباح مع محلول الملح؟</div>`;
  const q = s => body.querySelector(s), BY = 420, GX1 = 330, GX2 = 470, GY = 300;
  let items, held = null, inGap = null, tested = new Set();
  items = M.map((m, i) => ({ n: m[0], k: m[1], col: m[2], g: m[3], x: 80 + (i % 5) * 150, y: BY - 30 - Math.floor(i / 5) * 0, home: [70 + i * 74, BY - 22] }));
  items.forEach((it, i) => { it.x = it.home[0]; it.y = it.home[1]; });
  function obj(c, it) { c.save(); c.translate(it.x, it.y);
    if (it.n === 'محلول ملح') { c.fillStyle = 'rgba(219,234,254,.6)'; c.strokeStyle = '#64748b'; c.lineWidth = 1.5; FX.rr(c, -22, -40, 44, 40, 4); c.fill(); c.stroke(); c.fillStyle = 'rgba(147,197,253,.75)'; c.fillRect(-20, -26, 40, 24); }
    else if (it.n === 'خاتم ذهب') { c.strokeStyle = FX.lg(c, -14, 0, 14, 0, [[0, '#a16207'], [.5, '#fde047'], [1, '#a16207']]); c.lineWidth = 6; c.beginPath(); c.ellipse(0, -12, 14, 10, 0, 0, 7); c.stroke(); }
    else if (it.n === 'ورق ألومنيوم') { c.fillStyle = FX.lg(c, -24, -10, 24, 0, [[0, '#e5e7eb'], [.5, '#ffffff'], [1, '#9ca3af']]); c.beginPath(); c.moveTo(-26, -4); c.lineTo(-18, -14); c.lineTo(24, -12); c.lineTo(28, -2); c.closePath(); c.fill(); }
    else { const w = it.n === 'ممحاة مطاطية' ? 36 : 56, h = it.n === 'ممحاة مطاطية' ? 16 : 8; c.fillStyle = FX.lg(c, 0, -h - 2, 0, 0, [[0, FX.mix(it.col, '#ffffff', .4)], [1, FX.mix(it.col, '#000000', .2)]]); FX.rr(c, -w / 2, -h - 2, w, h, 3); c.fill();
      if (it.n === 'مسمار حديد') { c.fillRect(-w / 2 - 4, -12, 6, 12); } if (it.n === 'قضيب زجاجي') { c.strokeStyle = 'rgba(100,116,139,.6)'; c.lineWidth = 1; c.strokeRect(-w / 2, -h - 2, w, h); } }
    c.restore(); FX.txt(c, it.n, it.x, it.y + 12, { size: 10, color: '#0f172a' }); }
  function draw(c, st) {
    FX.room(c, st, BY); FX.bench(c, st.x0, st.x1, BY, st.y1);
    c.fillStyle = '#e7e5e4'; FX.rr(c, 30, BY - 58, 700, 54, 10); c.fill(); FX.txt(c, 'صينية المواد', 700, BY - 66, { size: 12, color: '#334155' });
    const g = inGap ? inGap.g : 0, I = g * .3;
    // circuit: battery left, bulb top, gap bottom-center
    _cell(c, 150, 150, 50, 110, '1.5V');
    const minusP = [150, 272], plusP = [150, 146];
    _bulb(c, 400, 160, 1.1, g);
    _wire(c, [minusP, [150, GY], [GX1 - 18, GY]], '#111827', I, st.t);
    _wire(c, [[GX2 + 18, GY], [620, GY], [620, 140], [412, 140], [400, 156]], '#dc2626', I, st.t);
    _wire(c, [[388, 156], [380, 100], [150, 100], plusP], '#dc2626', I, st.t);
    [GX1, GX2].forEach((x, k) => { c.fillStyle = '#9ca3af'; c.beginPath(); c.moveTo(x - 18 * (k ? -1 : 1), GY - 8); c.lineTo(x + 6 * (k ? -1 : 1), GY - 4); c.lineTo(x + 6 * (k ? -1 : 1), GY + 4); c.lineTo(x - 18 * (k ? -1 : 1), GY + 8); c.fill(); });
    if (!inGap) FX.txt(c, 'ضع المادة هنا', (GX1 + GX2) / 2, GY + 30, { size: 12, color: '#475569' });
    items.forEach(it => obj(c, it));
    items.forEach(it => st.hit({ id: it.n, x: it.x - 34, y: it.y - 50, w: 68, h: 72, drag: { start() { held = it; if (inGap === it) inGap = null; }, move(p) { it.x = p.x; it.y = p.y + 14; },
      end() { if (Math.abs(it.x - (GX1 + GX2) / 2) < 90 && Math.abs(it.y - GY - 8) < 60) { if (inGap && inGap !== it) { inGap.x = inGap.home[0]; inGap.y = inGap.home[1]; } inGap = it; it.x = (GX1 + GX2) / 2; it.y = GY + 6; test(it); } else { it.x = it.home[0]; it.y = it.home[1]; } held = null; } } }));
    q('.iv').textContent = I.toFixed(2) + ' A';
    if (!tested.size) FX.hint(c, items[0].x, items[0].y - 20, st.t, 'اسحب المادة إلى الفجوة', { r: 26, dx: 40 });
    if (tested.size === M.length) FX.tag(c, '✔ صنّفت جميع المواد', 380, 40, { size: 15, bg: '#16a34a' });
  }
  function test(it) { q('.mv').textContent = it.n; if (!tested.has(it.n)) { tested.add(it.n); q(it.k === 'c' ? '.tc' : '.ti').insertAdjacentHTML('beforeend', (q(it.k === 'c' ? '.tc' : '.ti').textContent ? '، ' : '') + it.n); }
    _fb11(q('.msg'), true, it.k === 'c' ? `💡 أضاء المصباح: ${it.n} <b>موصل</b> ${it.n === 'محلول ملح' ? '(تتحرك فيه الأيونات)' : 'تتحرك فيه الإلكترونات بسهولة'}.` : `⚫ لم يضئ المصباح: ${it.n} <b>عازل</b> لا تتحرك فيه الإلكترونات بسهولة.`); }
  FX.stage(host, 760, 450, draw, { vy: 6 });
}

/* ---------- LAB 6: resistance of a wire — length, thickness, material (p147, Fig. 8 & 9) ---------- */
function labResist(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>〰 مقاومة السلك</h3>
    <div class="seg"><b style="font-size:.85em">المادة:</b><button class="btn mt" data-m="cu">نحاس</button><button class="btn alt mt" data-m="fe">حديد</button></div>
    <div class="seg"><b style="font-size:.85em">السُّمك:</b><button class="btn alt th" data-d="0.1">رفيع</button><button class="btn th" data-d="0.2">متوسط</button><button class="btn alt th" data-d="0.3">سميك</button></div>
    <div class="fxro"><div>طول السلك<b class="lv">50 سم</b></div><div>مقاومة السلك<b class="rv2">0</b></div><div>التيار<b class="iv">0</b></div></div>
    <div class="mini"><button class="btn rec">📋 سجّل</button></div>
    <table class="data"><thead><tr><th>المادة</th><th>السُّمك</th><th>الطول</th><th>المقاومة</th><th>التيار</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="rv" data-a="تزداد المقاومة بزيادة طول السلك وبنقصان مساحة مقطعه العرضي، وتعتمد على نوع المادة؛ كما يقل تدفق الماء في الخرطوم الطويل والضيق.">استنتج: ما العوامل التي تعتمد عليها مقاومة السلك؟</div>`;
  const q = s => body.querySelector(s), RHO = { cu: 1.7e-8, fe: 1.0e-7 }, V = 3, RB = 5, X0 = 120, X1 = 620, WY = 330;
  let mat = 'cu', dmm = .2, L = .5, rows = 0;
  const R = () => RHO[mat] * L / (Math.PI * (dmm / 2000) ** 2), I = () => V / (RB + R());
  function draw(c, st) {
    FX.room(c, st, 420); FX.bench(c, st.x0, st.x1, 420, st.y1);
    c.fillStyle = FX.lg(c, 0, WY - 20, 0, WY + 30, [[0, '#d6b88a'], [1, '#a47b52']]); FX.rr(c, X0 - 40, WY - 16, X1 - X0 + 80, 44, 8); c.fill();
    c.fillStyle = '#5b3a1a'; c.font = `600 10px ${FX.MONO}`; c.textAlign = 'center'; for (let cm = 0; cm <= 100; cm += 10) { const x = X0 + cm / 100 * (X1 - X0); c.fillRect(x - .5, WY + 14, 1, 8); c.fillText(cm, x, WY + 30); } c.textAlign = 'left';
    const r = R(), i = I(), hot = FX.clamp(i * i * r / 0.6, 0, 1), cx = X0 + L * (X1 - X0);
    c.strokeStyle = mat === 'cu' ? '#c2410c' : '#6b7280'; c.lineWidth = 2 + dmm * 14; c.beginPath(); c.moveTo(X0, WY); c.lineTo(X1, WY); c.stroke();
    if (hot > .05) { c.strokeStyle = `rgba(255,${120 - 60 * hot | 0},40,${hot * .8})`; c.lineWidth = 2 + dmm * 14; c.beginPath(); c.moveTo(X0, WY); c.lineTo(cx, WY); c.stroke(); }
    // clips
    [[X0, '#111827'], [cx, '#dc2626']].forEach(([x, col]) => { c.fillStyle = col; FX.rr(c, x - 10, WY - 26, 20, 22, 4); c.fill(); c.fillStyle = '#9ca3af'; c.fillRect(x - 6, WY - 6, 12, 8); });
    // battery + bulb + ammeter on top
    _cell(c, 180, 70, 44, 90, '3V');
    const am = _meter(c, 560, 40, i.toFixed(2), 'A', 'أميتر', {});
    _bulb(c, 400, 150, 1, FX.clamp(i / .6, 0, 1));
    _wire(c, [[180, 168], [180, 230], [X0, 230], [X0, WY - 26]], '#111827', i, st.t);
    _wire(c, [[cx, WY - 26], [cx, 250], [640, 250], [640, 200], am.pMinus], '#dc2626', i, st.t);
    _wire(c, [am.pPlus, [520, 176], [412, 176], [400, 146]], '#dc2626', i, st.t);
    _wire(c, [[388, 146], [300, 120], [300, 56], [180, 56], [180, 70]], '#dc2626', i, st.t);
    // zoom inset (Fig. 8): electrons colliding with atoms
    c.fillStyle = 'rgba(15,23,42,.92)'; FX.rr(c, 196, 172, 188, 66, 10); c.fill(); c.save(); c.beginPath(); FX.rr(c, 198, 174, 184, 62, 9); c.clip();
    c.fillStyle = mat === 'cu' ? '#b45309' : '#57534e'; c.fillRect(198, 174, 184, 62);
    for (let k = 0; k < 16; k++) { const ax = 210 + (k % 8) * 23, ay = 190 + Math.floor(k / 8) * 28 + (k % 2) * 4; c.fillStyle = FX.rg(c, ax - 3, ay - 3, 1, 9, [[0, '#fef3c7'], [1, mat === 'cu' ? '#d97706' : '#a8a29e']]); c.beginPath(); c.arc(ax, ay, 8, 0, 7); c.fill(); }
    const zz = mat === 'cu' ? 3 : 7; for (let k = 0; k < 4; k++) { const s = (st.t * 60 * FX.clamp(i / .5, .2, 1.4) + k * 46) % 184, ex = 198 + s, ey = 205 + Math.sin(s / 184 * Math.PI * zz + k) * 22; c.fillStyle = '#38bdf8'; c.beginPath(); c.arc(ex, ey, 4, 0, 7); c.fill(); }
    c.restore(); FX.txt(c, 'تكبير: الإلكترونات تتصادم مع الذرات', 290, 164, { size: 11, color: '#0f172a' });
    FX.tag(c, 'اسحب المشبك الأحمر لتغيير الطول', cx, WY - 48, { size: 12, bg: '#dc2626' });
    st.hit({ id: 'clip', x: cx - 20, y: WY - 40, w: 40, h: 50, drag: { move(p) { L = FX.clamp(Math.round((p.x - X0) / (X1 - X0) * 20) / 20, .1, 1); upd(); } } });
    if (hot > .3) FX.tag(c, 'التصادمات تحوّل الطاقة الكهربائية إلى حرارة', 380, 395, { size: 12, bg: '#b45309' });
  }
  function upd() { q('.lv').textContent = Math.round(L * 100) + ' سم'; q('.rv2').textContent = r2_(R()) + ' Ω'; q('.iv').textContent = I().toFixed(2) + ' A'; }
  body.querySelectorAll('.mt').forEach(b => b.onclick = () => { mat = b.dataset.m; body.querySelectorAll('.mt').forEach(o => o.classList.toggle('alt', o !== b)); upd(); });
  body.querySelectorAll('.th').forEach(b => b.onclick = () => { dmm = +b.dataset.d; body.querySelectorAll('.th').forEach(o => o.classList.toggle('alt', o !== b)); upd(); });
  q('.rec').onclick = () => { rows++; const tb = q('.tb'); if (tb.rows.length >= 4) tb.deleteRow(0); tb.insertAdjacentHTML('beforeend', `<tr><td>${mat === 'cu' ? 'نحاس' : 'حديد'}</td><td>${dmm === .1 ? 'رفيع' : dmm === .2 ? 'متوسط' : 'سميك'}</td><td>${Math.round(L * 100)}</td><td><b>${r2_(R())}</b></td><td>${I().toFixed(2)}</td></tr>`); beep(true); };
  upd(); FX.stage(host, 760, 450, draw, { vy: 6 });
}

/* ---------- LAB 7: build a simple circuit — bulb, cell, one wire (side lab p151) ---------- */
function labSimple(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>💡 تكوين دائرة كهربائية بسيطة</h3>
    <div class="q" style="margin:0;font-size:.82em">اختر طرف المصباح الملامس للبطارية والقطب، ثم اسحب طرف السلك الحر إلى نقطة التوصيل.</div>
    <div class="seg"><b style="font-size:.8em">طرف المصباح:</b><button class="btn bp" data-v="tip">القاعدة (الرأس)</button><button class="btn alt bp" data-v="side">الجانب (اللولب)</button></div>
    <div class="seg"><b style="font-size:.8em">يلامس القطب:</b><button class="btn tp" data-v="+">الموجب +</button><button class="btn alt tp" data-v="-">السالب −</button></div>
    <div class="fxro"><div>الطرق الناجحة<b class="nv">0 / 4</b></div><div>المصباح<b class="sv" style="font-family:inherit;font-size:1em">مطفأ</b></div></div>
    <table class="data"><thead><tr><th>#</th><th>الطرف الملامس</th><th>القطب</th><th>السلك من … إلى …</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="rv" data-a="تخرج الإلكترونات من القطب السالب للبطارية، وتمر في السلك والفتيل (من أحد طرفي المصباح إلى الآخر)، ثم تعود إلى القطب الموجب؛ فلا يضيء المصباح إلا إذا اتصل طرفاه (القاعدة واللولب) بقطبين مختلفين في مسار مغلق.">التحليل: ارسم شكلًا تخطيطيًّا وعيّن عليه حركة الإلكترونات في الدائرة التي ركّبتها.</div>`;
  const q = s => body.querySelector(s), CX = 380, TOP = 120, H = 210;
  let part = 'tip', term = '+', end = [600, 400], att = null, found = new Set();
  const POSE = { 'tip+': { x: CX, y: TOP - 2, rot: 0, start: [CX - 13, TOP - 22] }, 'tip-': { x: CX, y: TOP + H + 20, rot: Math.PI, start: [CX + 13, TOP + H + 40] },
    'side+': { x: CX + 22, y: TOP - 14, rot: -Math.PI / 2, start: [CX + 27, TOP - 14] }, 'side-': { x: CX + 22, y: TOP + H + 24, rot: -Math.PI / 2, start: [CX + 27, TOP + H + 24] } };
  const TP = () => [CX, TOP - 2], TN = () => [CX, TOP + H + 18];
  function bulbPose() { return POSE[part + term]; }
  function targets() { return [{ id: 'bulb', p: bulbPose().start }, { id: '+', n: 'القطب الموجب', p: [CX + 14, TOP + 4] }, { id: '-', n: 'القطب السالب', p: [CX + 30, TOP + H + 8] }]; }
  function lit() { return att && att !== term; } // wire must go from bulb's other contact to the opposite terminal
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    _cell(c, CX, TOP, 64, H, '1.5V');
    const b = bulbPose(), on = lit() && wireFrom() === 'bulb';
    // bulb drawn rotated so its contact part touches the terminal
    c.save(); c.translate(b.x, b.y); c.rotate(b.rot); _bulb(c, 0, 0, 1, on ? 1 : 0); c.restore();
    // fixed wire start at the bulb's other contact (as user holds it there) — the free end is dragged
    const T = targets(), start = T[0].p;
    const pts = [start, [(start[0] + end[0]) / 2 - 80, (start[1] + end[1]) / 2], end];
    c.strokeStyle = '#b45309'; c.lineWidth = 5; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); c.quadraticCurveTo(pts[1][0], pts[1][1], end[0], end[1]); c.stroke();
    c.fillStyle = '#f59e0b'; c.beginPath(); c.arc(end[0], end[1], 7, 0, 7); c.fill();
    if (on) { const P = _path([TN(), [CX + 60, TOP + H + 30], [CX + 80, TOP + H / 2], [CX + 60, TOP - 20], TP()]); for (let s = (st.t * 70) % 30; s < P.L; s += 30) { const p = P.at(s); c.fillStyle = 'rgba(56,189,248,.85)'; c.beginPath(); c.arc(p[0], p[1], 3.5, 0, 7); c.fill(); }
      FX.tag(c, 'الدائرة مغلقة: الإلكترونات من القطب السالب عبر السلك والفتيل إلى الموجب', CX, 40, { size: 12, bg: '#16a34a' }); }
    T.slice(1).forEach(t => { c.strokeStyle = 'rgba(245,183,0,.8)'; c.setLineDash([4, 4]); c.lineWidth = 2; c.beginPath(); c.arc(t.p[0], t.p[1], 12, 0, 7); c.stroke(); c.setLineDash([]); });
    st.hit({ id: 'end', x: end[0] - 18, y: end[1] - 18, w: 36, h: 36, drag: { move(p) { end = [FX.clamp(p.x, 40, 720), FX.clamp(p.y, 30, 420)]; att = null; }, end() { snap(); } } });
    if (!att) FX.hint(c, end[0], end[1], st.t, 'اسحب طرف السلك', { r: 18, dx: -30 });
    q('.sv').textContent = on ? 'مضيء 💡' : 'مطفأ';
  }
  function wireFrom() { return 'bulb'; }
  function snap() { const T = targets().slice(1); let best = null; T.forEach(t => { const d = Math.hypot(end[0] - t.p[0], end[1] - t.p[1]); if (d < 40 && (!best || d < best.d)) best = { d, t }; });
    if (best) { end = best.t.p.slice(); att = best.t.id; if (lit()) { const key = part + term; if (!found.has(key)) { found.add(key); q('.tb').insertAdjacentHTML('beforeend', `<tr><td>${found.size}</td><td>${part === 'tip' ? 'القاعدة' : 'اللولب'}</td><td>${term === '+' ? 'الموجب' : 'السالب'}</td><td>${part === 'tip' ? 'اللولب' : 'القاعدة'} ← ${att === '+' ? 'الموجب' : 'السالب'}</td></tr>`); q('.nv').textContent = found.size + ' / 4'; }
        beep(true); if (found.size === 4) toast('أحسنت! وجدت الاحتمالات الأربعة لإضاءة المصباح'); else toast('أضاء المصباح! جرّب طريقة أخرى'); } else toast('لم يضئ: طرفا المصباح متصلان بالقطب نفسه، والدائرة غير مكتملة'); } }
  body.querySelectorAll('.bp').forEach(b => b.onclick = () => { part = b.dataset.v; body.querySelectorAll('.bp').forEach(o => o.classList.toggle('alt', o !== b)); att = null; end = [600, 400]; });
  body.querySelectorAll('.tp').forEach(b => b.onclick = () => { term = b.dataset.v; body.querySelectorAll('.tp').forEach(o => o.classList.toggle('alt', o !== b)); att = null; end = [600, 400]; });
  FX.stage(host, 760, 460, draw, { vy: 6 });
}

/* ---------- LAB 8: Ohm's law — voltmeter & ammeter (p150) ---------- */
function labOhm(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>📐 قانون أوم</h3>
    <div class="seg"><b style="font-size:.82em">عدد البطاريات:</b>${[1, 2, 3, 4].map(n => `<button class="btn ${n === 2 ? '' : 'alt'} nb" data-n="${n}">${n}</button>`).join('')}</div>
    <div class="seg"><b style="font-size:.82em">المقاومة:</b>${[5, 10, 15, 20].map(r => `<button class="btn ${r === 10 ? '' : 'alt'} rr" data-r="${r}">${r} Ω</button>`).join('')}</div>
    <div class="mini"><button class="btn sw">🔌 أغلق المفتاح</button><button class="btn alt rec">📋 سجّل القراءة</button></div>
    <table class="data"><thead><tr><th>جـ (V)</th><th>م (Ω)</th><th>ت (A)</th><th>جـ ÷ ت</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="q" style="margin:0;font-size:.85em">🎯 التحدي: اجعل الأميتر يقرأ <b>0.30 A</b>.</div><div class="fb msg"></div>`;
  const q = s => body.querySelector(s); let n = 2, R = 10, on = false, pts = [], ok = false;
  const V = () => n * 1.5, I = () => on ? V() / R : 0;
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    const i = I();
    // battery holder
    c.fillStyle = '#1f2937'; FX.rr(c, 60, 300, 70 * 4 + 20, 100, 10); c.fill();
    for (let k = 0; k < 4; k++) { if (k < n) { c.save(); c.translate(90 + k * 70 + 30, 350); c.rotate(-Math.PI / 2); _cell(c, 0, -45, 44, 80, '1.5V'); c.restore(); } else { c.fillStyle = '#374151'; FX.rr(c, 75 + k * 70, 320, 60, 60, 6); c.fill(); FX.txt(c, 'فارغ', 105 + k * 70, 350, { size: 11, color: '#9ca3af' }); } }
    FX.tag(c, 'جـ = ' + V() + ' V', 210, 284, { size: 14, bg: '#0f172a' });
    // resistor
    const RX = 470, RY = 230; c.fillStyle = FX.lg(c, 0, RY - 14, 0, RY + 14, [[0, '#fde68a'], [1, '#d97706']]); FX.rr(c, RX - 50, RY - 14, 100, 28, 12); c.fill();
    const bands = { 5: ['#16a34a', '#000', '#d4af37'], 10: ['#92400e', '#000', '#000'], 15: ['#92400e', '#16a34a', '#000'], 20: ['#dc2626', '#000', '#000'] }[R]; bands.forEach((b, k) => { c.fillStyle = b; c.fillRect(RX - 30 + k * 16, RY - 14, 7, 28); });
    FX.tag(c, 'م = ' + R + ' Ω', RX, RY + 32, { size: 13, bg: '#b45309' });
    const am = _meter(c, 600, 250, i.toFixed(2), 'A', 'أميتر (توالٍ)', {}); const vm = _meter(c, 410, 22, on ? V().toFixed(2) : '0.00', 'V', 'فولتميتر (توازٍ)', { col: '#60a5fa' });
    _switch(c, 250, 300, 230, on);
    [[58, '+', '#dc2626'], [362, '−', '#111827']].forEach(([x, sg, col]) => { c.fillStyle = col; FX.rr(c, x - 8, 340, 16, 20, 4); c.fill(); FX.txt(c, sg, x, 372, { size: 14, w: 800, mono: true, color: col }); });
    _wire(c, [[362, 350], [400, 350], [400, 414], [622, 414], am.pPlus], '#111827', i, st.t);
    _wire(c, [am.pMinus, [726, 386], [726, RY], [RX + 50, RY]], '#dc2626', i, st.t);
    _wire(c, [[RX - 50, RY], [300, 230]], '#dc2626', i, st.t);
    _wire(c, [[250, 230], [30, 230], [30, 350], [50, 350]], '#dc2626', i, st.t);
    _wire(c, [[RX - 36, RY - 14], [432, 158]], '#2563eb', 0, st.t, { w: 4 });
    _wire(c, [[RX + 36, RY - 14], [500, 158]], '#111827', 0, st.t, { w: 4 });
    // V-I graph
    FX.graph(c, 40, 14, 330, 172, { xmax: 1.2, ymax: 6, xstep: .2, ystep: 1, xlab: 'التيار ت (A)', ylab: 'الجهد جـ (V)', series: [5, 10, 15, 20].map((r, k) => ({ pts: pts.filter(p => p.R === r).map(p => [p.I, p.V]).sort((a, b) => a[0] - b[0]), col: ['#16a34a', '#7c3aed', '#b45309', '#dc2626'][k] })).filter(s => s.pts.length) });
    if (!on) st.hit({ id: 'sw', x: 240, y: 200, w: 70, h: 50, click: toggle }); else st.hit({ id: 'sw', x: 240, y: 200, w: 70, h: 50, click: toggle });
    if (!on && !pts.length) FX.hint(c, 275, 225, st.t, 'أغلق المفتاح', { r: 26 });
  }
  function toggle() { on = !on; q('.sw').textContent = on ? '⏹ افتح المفتاح' : '🔌 أغلق المفتاح'; beep(true); check(); }
  function check() { if (on && Math.abs(I() - .3) < 1e-6 && !ok) { ok = true; _fb11(q('.msg'), true, `✔ ت = جـ ÷ م = ${V()} ÷ ${R} = 0.30 A. (توجد أكثر من طريقة: 1.5 V مع 5 Ω، 3 V مع 10 Ω، 4.5 V مع 15 Ω، 6 V مع 20 Ω)`); } }
  q('.sw').onclick = toggle;
  body.querySelectorAll('.nb').forEach(b => b.onclick = () => { n = +b.dataset.n; body.querySelectorAll('.nb').forEach(o => o.classList.toggle('alt', o !== b)); check(); });
  body.querySelectorAll('.rr').forEach(b => b.onclick = () => { R = +b.dataset.r; body.querySelectorAll('.rr').forEach(o => o.classList.toggle('alt', o !== b)); check(); });
  q('.rec').onclick = () => { if (!on) { toast('أغلق المفتاح أولًا لقراءة التيار'); return; } const p = { V: V(), R, I: I() }; if (!pts.some(o => o.V === p.V && o.R === p.R)) pts.push(p); const tb = q('.tb'); if (tb.rows.length >= 4) tb.deleteRow(0);
    tb.insertAdjacentHTML('beforeend', `<tr><td>${p.V}</td><td>${R}</td><td>${p.I.toFixed(2)}</td><td><b>${r1_(p.V / p.I)}</b></td></tr>`); beep(true); };
  FX.stage(host, 760, 460, draw, { vy: 6 });
}

/* ---------- LAB 9: series vs parallel circuits (Fig. 11 & 12, p151–152) ---------- */
function labSeriesPar(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🔀 التوالي والتوازي</h3>
    <div class="seg"><button class="btn md" data-m="s">على التوالي</button><button class="btn alt md" data-m="p">على التوازي</button></div>
    <div class="seg"><b style="font-size:.82em">عدد المصابيح:</b><button class="btn nb" data-n="2">2</button><button class="btn alt nb" data-n="3">3</button></div>
    <div class="fxro"><div>التيار الكلي<b class="iv">0</b></div><div>المسارات<b class="pv">1</b></div></div>
    <div class="q" style="margin:0;font-size:.82em">انقر مصباحًا لفكّه (إزالته) من الدائرة، وانقره مرة أخرى لإعادته.</div>
    <table class="data"><thead><tr><th>المهمة</th><th>الملاحظة</th></tr></thead><tbody class="tb"></tbody></table>`;
  const q = s => body.querySelector(s), V = 3, RB = 6; let mode = 's', n = 2, out = [false, false, false], obs = {};
  function cur() { const act = [0, 1, 2].slice(0, n).filter(k => !out[k]); if (mode === 's') { const I = act.length === n ? V / (RB * n) : 0; return { tot: I, each: [0, 1, 2].map(k => k < n && !out[k] ? I : 0) }; }
    const each = [0, 1, 2].map(k => k < n && !out[k] ? V / RB : 0); return { tot: each.reduce((a, b) => a + b, 0), each }; }
  function note(k, a, b) { if (obs[k]) return; obs[k] = 1; const tb = q('.tb'); if (tb.rows.length >= 4) tb.deleteRow(0); tb.insertAdjacentHTML('beforeend', `<tr><td>${a}</td><td><b>${b}</b></td></tr>`); beep(true); }
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    const C = cur(); _cell(c, 120, 230, 60, 120, '3V');
    const xs = n === 2 ? [330, 540] : [290, 440, 590];
    const sock = (x, y) => { c.fillStyle = '#334155'; FX.rr(c, x - 24, y, 48, 14, 5); c.fill(); c.fillStyle = '#d1d5db'; c.beginPath(); c.arc(x - 18, y + 7, 4, 0, 7); c.arc(x + 18, y + 7, 4, 0, 7); c.fill(); };
    const lamp = (x, y, k) => { if (!out[k]) _bulb(c, x, y, .9, C.each[k] / (V / RB)); else { c.fillStyle = '#cbd5e1'; FX.rr(c, x - 10, y - 10, 20, 10, 3); c.fill(); FX.tag(c, 'فُكّ المصباح', x, y - 30, { size: 11, bg: '#dc2626' }); }
      st.hit({ id: 'b' + k, x: x - 30, y: y - 90, w: 60, h: 104, click: () => tog(k) }); };
    if (mode === 's') {
      const y = 170;
      _wire(c, [[120, 362], [120, 400], [700, 400], [700, y + 7], [xs[n - 1] + 18, y + 7]], '#111827', C.tot, st.t);
      for (let k = n - 1; k > 0; k--) _wire(c, [[xs[k] - 18, y + 7], [xs[k - 1] + 18, y + 7]], '#dc2626', C.tot, st.t);
      _wire(c, [[xs[0] - 18, y + 7], [120, y + 7], [120, 228]], '#dc2626', C.tot, st.t);
      xs.forEach((x, k) => { sock(x, y); lamp(x, y + 2, k); });
    } else {
      const by = 300;
      _wire(c, [[120, 362], [120, 400], [700, 400]], '#111827', C.tot, st.t); _wire(c, [[700, 110], [120, 110], [120, 228]], '#dc2626', C.tot, st.t);
      xs.forEach((x, k) => { _wire(c, [[x - 30, 400], [x - 30, by + 7], [x - 18, by + 7]], '#111827', C.each[k], st.t, { w: 5 }); _wire(c, [[x + 18, by + 7], [x + 34, by + 7], [x + 34, 110]], '#dc2626', C.each[k], st.t, { w: 5 }); sock(x, by); lamp(x, by + 2, k); });
      c.fillStyle = '#dc2626'; c.fillRect(xs[n - 1] + 34, 108, 700 - xs[n - 1] - 34, 0);
    }
    FX.tag(c, mode === 's' ? 'مسار واحد للتيار' : n + ' مسارات (تفرعات) للتيار', 400, 40, { size: 15, bg: mode === 's' ? '#7c3aed' : '#0369a1' });
    q('.iv').textContent = C.tot.toFixed(2) + ' A'; q('.pv').textContent = mode === 's' ? 1 : n;
    if (!Object.keys(obs).length) FX.hint(c, xs[0], mode === 's' ? 120 : 260, st.t, 'انقر المصباح لفكّه', { r: 30 });
  }
  function tog(k) { out[k] = !out[k]; beep(true);
    if (out[k]) { if (mode === 's') note('s', 'فكّ مصباح (توالٍ)', 'انطفأت جميع المصابيح: انقطع المسار الوحيد'); else note('p', 'فكّ مصباح (توازٍ)', 'بقيت المصابيح الأخرى مضيئة: التيار يمر في المسارات الأخرى'); } }
  body.querySelectorAll('.md').forEach(b => b.onclick = () => { mode = b.dataset.m; out = [false, false, false]; body.querySelectorAll('.md').forEach(o => o.classList.toggle('alt', o !== b)); });
  body.querySelectorAll('.nb').forEach(b => b.onclick = () => { const was = n; n = +b.dataset.n; out = [false, false, false]; body.querySelectorAll('.nb').forEach(o => o.classList.toggle('alt', o !== b));
    if (n === 3 && was === 2) { if (mode === 's') note('s3', 'إضافة مصباح ثالث (توالٍ)', 'قلّت إضاءة المصابيح وقلّ التيار: زادت المقاومة الكلية'); else note('p3', 'إضافة مصباح ثالث (توازٍ)', 'بقيت الإضاءة كما هي وزاد التيار الكلي'); } });
  FX.stage(host, 760, 460, draw, { vy: 6 });
}

/* ---------- LAB 10: protecting circuits — fuse & breaker (Fig. 13, p152) ---------- */
function labFuse(body) {
  const { host, panel } = labShell(body);
  const AP = [['الحاسوب', 350, '💻'], ['شاشة التلفاز', 200, '📺'], ['الثلاجة', 450, '🧊'], ['الميكروويف', 1500, '♨'], ['مجفف الشعر', 1000, '💨'], ['محمصة الخبز', 1100, '🍞']];
  panel.innerHTML = `<h3>🧯 المنصهر والقاطع</h3>
    <div class="seg"><b style="font-size:.82em">الحماية:</b><button class="btn pt" data-v="fuse">منصهر 15 A</button><button class="btn alt pt" data-v="brk">قاطع 20 A</button></div>
    <div class="q" style="margin:0;font-size:.82em">شغّل الأجهزة الموصولة على التوازي (جهد 110 فولت) وراقب التيار الكلي.</div>
    <div class="fxro"><div>التيار الكلي<b class="iv">0</b></div><div>حالة الدائرة<b class="sv" style="font-family:inherit;font-size:.95em">مغلقة</b></div></div>
    <div class="mini"><button class="btn alt fix" disabled>🔧 استبدل المنصهر</button></div>
    <div class="fb msg"></div>
    <div class="rv" data-a="لأن إضافة أجهزة على التوازي تزيد التيار الكلي فترتفع درجة حرارة الأسلاك وقد يحدث حريق؛ فينصهر السلك الرفيع داخل المنصهر (أو يفتح القاطع) فتصبح الدائرة مفتوحة ويتوقف التيار.">فسّر: لماذا تُستخدم المنصهرات والقواطع في الدوائر الكهربائية؟</div>`;
  const q = s => body.querySelector(s), VV = 110; let prot = 'fuse', on = AP.map(() => false), open = false, heat = 0;
  const lim = () => prot === 'fuse' ? 15 : 20, Itot = () => open ? 0 : AP.reduce((a, ap, k) => a + (on[k] ? ap[1] / VV : 0), 0);
  function draw(c, st) {
    FX.room(c, st, 430, { wall0: '#fef3c7', wall1: '#fde68a' }); FX.bench(c, st.x0, st.x1, 430, st.y1);
    const I = Itot(); heat += ((I / lim()) - heat) * Math.min(1, st.dt * 1.5);
    if (!open && I > lim()) { open = true; beep(false); q('.fix').disabled = false; q('.fix').classList.remove('alt'); q('.fix').textContent = prot === 'fuse' ? '🔧 استبدل المنصهر' : '🔧 أغلق القاطع';
      _fb11(q('.msg'), false, `⚠ التيار ${r1_(I)} A تجاوز ${lim()} A: ${prot === 'fuse' ? 'انصهر السلك الفلزي الرفيع داخل المنصهر' : 'فتح القاطع'} فأصبحت الدائرة مفتوحة وتوقف التيار. أطفئ بعض الأجهزة ثم ${prot === 'fuse' ? 'استبدل المنصهر' : 'أغلق القاطع'}.`); }
    // panel box
    c.fillStyle = '#e5e7eb'; FX.rr(c, 40, 80, 150, 210, 10); c.fill(); c.strokeStyle = '#9ca3af'; c.lineWidth = 2; c.stroke(); FX.txt(c, 'صندوق الحماية', 115, 70, { size: 12 });
    if (prot === 'fuse') { c.fillStyle = 'rgba(219,234,254,.7)'; FX.rr(c, 85, 120, 60, 120, 8); c.fill(); c.strokeStyle = '#64748b'; c.stroke(); c.fillStyle = '#9ca3af'; c.fillRect(85, 112, 60, 14); c.fillRect(85, 234, 60, 14);
      c.strokeStyle = open ? '#475569' : `rgb(${120 + 135 * Math.min(1, heat) | 0},${120 - 60 * Math.min(1, heat) | 0},60)`; c.lineWidth = 3; c.beginPath(); c.moveTo(115, 126); if (open) { c.lineTo(117, 168); c.moveTo(113, 192); c.lineTo(115, 234); } else { for (let k = 0; k <= 10; k++) c.lineTo(115 + (k % 2 ? 5 : -5), 126 + k * 10.8); } c.stroke();
      if (open) { c.fillStyle = '#475569'; c.beginPath(); c.arc(117, 172, 4, 0, 7); c.arc(113, 188, 4, 0, 7); c.fill(); } FX.txt(c, '15 A', 115, 270, { size: 13, w: 700 }); }
    else { c.fillStyle = '#334155'; FX.rr(c, 80, 110, 70, 150, 8); c.fill(); c.fillStyle = '#111827'; FX.rr(c, 100, 150, 30, 60, 6); c.fill(); c.fillStyle = open ? '#16a34a' : '#dc2626'; FX.rr(c, 104, open ? 182 : 154, 22, 24, 4); c.fill(); FX.txt(c, open ? 'OFF' : 'ON', 115, open ? 194 : 166, { size: 10, color: '#fff', mono: true }); FX.txt(c, '20 A', 115, 240, { size: 13, color: '#fff', w: 700 }); }
    // main wires with heat color
    const wc = `rgb(${220 + 35 * Math.min(1, heat) | 0},${38 + 80 * Math.max(0, 1 - heat) | 0},38)`;
    _wire(c, [[190, 120], [740, 120]], heat > .8 && !open ? '#f97316' : wc, I / 6, st.t, { gap: 22 }); _wire(c, [[740, 360], [190, 360]], '#111827', I / 6, st.t, { gap: 22 });
    AP.forEach((ap, k) => { const x = 250 + k * 82; _wire(c, [[x, 360], [x, 300]], '#111827', on[k] && !open ? .4 : 0, st.t, { w: 4 }); _wire(c, [[x, 230], [x, 120]], '#dc2626', on[k] && !open ? .4 : 0, st.t, { w: 4 });
      const act = on[k] && !open; c.fillStyle = act ? '#ecfeff' : '#e2e8f0'; FX.rr(c, x - 34, 230, 68, 70, 10); c.fill(); c.strokeStyle = act ? '#16a34a' : '#94a3b8'; c.lineWidth = 3; c.stroke();
      FX.txt(c, ap[2], x, 254, { size: 22 }); FX.txt(c, ap[0], x, 280, { size: 10 }); FX.txt(c, ap[1] + ' W', x, 312, { size: 10, mono: true, color: '#334155' });
      c.fillStyle = on[k] ? '#16a34a' : '#9ca3af'; FX.rr(c, x - 16, 318, 32, 14, 7); c.fill(); c.fillStyle = '#fff'; c.beginPath(); c.arc(on[k] ? x + 8 : x - 8, 325, 5, 0, 7); c.fill();
      st.hit({ id: 'a' + k, x: x - 34, y: 228, w: 68, h: 108, click: () => { on[k] = !on[k]; beep(true); } }); });
    FX.gauge(c, 110, 372, 40, I, 25, { step: 5, unit: 'أمبير' });
    if (heat > .8 && !open) FX.tag(c, '🔥 ترتفع درجة حرارة الأسلاك', 460, 90, { size: 13, bg: '#ea580c' });
    q('.iv').textContent = r1_(I) + ' A'; q('.sv').textContent = open ? 'مفتوحة ✖' : 'مغلقة ✔';
    if (!on.some(Boolean)) FX.hint(c, 250, 265, st.t, 'انقر الجهاز لتشغيله', { r: 36 });
  }
  q('.fix').onclick = () => { const want = Itot.call(null); open = false; const I = AP.reduce((a, ap, k) => a + (on[k] ? ap[1] / VV : 0), 0); void want;
    if (I > lim()) { open = true; _fb11(q('.msg'), false, 'التيار ما زال أكبر من الحد المسموح؛ أطفئ بعض الأجهزة أولًا.'); return; }
    q('.fix').disabled = true; q('.fix').classList.add('alt'); _fb11(q('.msg'), true, `✔ ${prot === 'fuse' ? 'استُبدل المنصهر' : 'أُغلق القاطع'}، وسرى التيار ثانية (${r1_(I)} A).`); };
  body.querySelectorAll('.pt').forEach(b => b.onclick = () => { prot = b.dataset.v; open = false; heat = 0; q('.fix').disabled = true; q('.fix').classList.add('alt'); q('.msg').className = 'fb msg'; body.querySelectorAll('.pt').forEach(o => o.classList.toggle('alt', o !== b)); });
  FX.stage(host, 780, 460, draw, { vy: 6 });
}

/* ---------- LAB 11: electric power & cost of energy (p153–154, Table 1, review Q20) ---------- */
function labPower(body) {
  const { host, panel } = labShell(body);
  const AP = [['الحاسوب', 350], ['شاشة التلفاز', 200], ['المسجل', 250], ['الثلاجة', 450], ['الميكروويف', 1500], ['مجفف الشعر', 1000], ['مصباح', 100]];
  panel.innerHTML = `<h3>🧾 القدرة وتكلفة الطاقة</h3>
    <label class="rng">الجهاز <select class="ap">${AP.map((a, k) => `<option value="${k}" ${k === 6 ? 'selected' : ''}>${a[0]} (${a[1]} واط)</option>`).join('')}</select></label>
    <label class="rng">ساعات التشغيل <input type="range" class="hr" min="1" max="30" value="10"><b class="hrv">10</b> ساعة</label>
    <div class="mini"><button class="btn go">▶ شغّل الجهاز</button><button class="btn alt rs">↺ صفّر العداد</button></div>
    <div class="fxro"><div>القدرة<b class="pv">100 W</b></div><div>التيار (110 V)<b class="iv">0.91 A</b></div><div>الطاقة<b class="ev">0</b></div><div>التكلفة<b class="cv">0</b></div></div>
    <table class="data"><thead><tr><th>الجهاز</th><th>الزمن</th><th>ك.و.س</th><th>ريال</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="q" style="margin:0;font-size:.78em">سعر الكيلوواط.ساعة في التمرين: 0.2 ريال.</div>`;
  const q = s => body.querySelector(s), PRICE = .2; let run = false, t = 0, E = 0, k = 6, H = 10, disk = 0;
  function upd() { k = +q('.ap').value; H = +q('.hr').value; q('.hrv').textContent = H; const P = AP[k][1]; q('.pv').textContent = P + ' W'; q('.iv').textContent = r2_(P / 110) + ' A'; }
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    const P = AP[k][1];
    if (run) { t = Math.min(H, t + st.dt * Math.max(1, H / 4)); E = P * t / 1000; disk += st.dt * P / 60; if (t >= H) { run = false; finish(); } }
    // meter
    c.fillStyle = FX.lg(c, 0, 60, 0, 360, [[0, '#f8fafc'], [1, '#cbd5e1']]); FX.rr(c, 470, 60, 220, 300, 18); c.fill(); c.strokeStyle = '#94a3b8'; c.lineWidth = 2; c.stroke();
    FX.lcd(c, 490, 90, 180, 46, E.toFixed(2).padStart(7, '0'), {}); FX.txt(c, 'kWh  كيلوواط.ساعة', 580, 150, { size: 12, color: '#334155' });
    c.fillStyle = '#1f2937'; FX.rr(c, 500, 170, 160, 60, 10); c.fill(); c.fillStyle = '#e5e7eb'; c.beginPath(); c.ellipse(580, 200, 60, 10, 0, 0, 7); c.fill(); c.fillStyle = '#dc2626'; c.fillRect(580 + Math.cos(disk) * 56 - 4, 194, 8, 12);
    FX.txt(c, 'عداد الكهرباء', 580, 250, { size: 14, w: 700 }); c.fillStyle = run ? '#dc2626' : '#475569'; c.beginPath(); c.arc(520, 290, 7, 0, 7); c.fill(); FX.txt(c, 'تشغيل', 560, 290, { size: 11 });
    // appliance
    c.fillStyle = '#e2e8f0'; FX.rr(c, 70, 150, 300, 200, 16); c.fill(); c.strokeStyle = run ? '#16a34a' : '#94a3b8'; c.lineWidth = 4; c.stroke();
    if (AP[k][0] === 'مصباح') _bulb(c, 220, 320, 1.6, run ? 1 : 0); else { FX.txt(c, ['💻', '📺', '📻', '🧊', '♨', '💨'][k] || '🔌', 220, 240, { size: 80 }); }
    FX.txt(c, AP[k][0] + ' — ' + P + ' واط', 220, 170, { size: 15, w: 700 });
    _wire(c, [[370, 300], [470, 300]], '#111827', run ? .5 : 0, st.t);
    FX.tag(c, 'الزمن: ' + r1_(t) + ' / ' + H + ' ساعة', 220, 120, { size: 14, bg: '#0f172a' });
    FX.tag(c, 'الطاقة = القدرة × الزمن = ' + P + ' × ' + r1_(t) + ' = ' + Math.round(P * t) + ' واط.ساعة', 380, 40, { size: 13, bg: '#7c3aed' });
    q('.ev').textContent = E.toFixed(2) + ' kWh'; q('.cv').textContent = (E * PRICE).toFixed(2) + ' ر';
    if (!run && t === 0) FX.hint(c, 220, 250, st.t, 'اختر الجهاز والزمن ثم شغّله', { r: 50 });
  }
  function finish() { const tb = q('.tb'); if (tb.rows.length >= 4) tb.deleteRow(0); tb.insertAdjacentHTML('beforeend', `<tr><td>${AP[k][0]}</td><td>${H} س</td><td><b>${E.toFixed(2)}</b></td><td>${(E * PRICE).toFixed(2)}</td></tr>`); beep(true);
    if (AP[k][1] === 100 && H === 10) toast('1 كيلوواط.ساعة = مصباح 100 واط مدة 10 ساعات'); }
  q('.go').onclick = () => { upd(); t = 0; E = 0; run = true; }; q('.rs').onclick = () => { run = false; t = 0; E = 0; };
  ['.ap', '.hr'].forEach(s => q(s).addEventListener('input', () => { if (!run) { upd(); t = 0; E = 0; } }));
  upd(); FX.stage(host, 760, 460, draw, { vy: 6 });
}

/* ---------- LAB 12: model for voltage & current — funnel and tubes (inquiry p156–157) ---------- */
function labFunnel(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🧪 نموذج للجهد والتيار</h3>
    <div class="seg"><b style="font-size:.82em">قطر الأنبوب:</b>${[4, 6, 8].map(d => `<button class="btn ${d === 6 ? '' : 'alt'} dd" data-d="${d}">${d} ملم</button>`).join('')}</div>
    <label class="rng">ارتفاع القمع <input type="range" class="ht" min="30" max="90" step="10" value="60"><b class="htv">60</b> سم</label>
    <div class="mini"><button class="btn pour">🚿 اسكب الماء (اضغط مطوّلًا)</button><button class="btn alt rs">↺ أفرغ الكأس</button></div>
    <div class="fxro"><div>الماء في الكأس<b class="vv">0 مل</b></div><div>الزمن<b class="tv">0.0 ث</b></div></div>
    <table class="data"><thead><tr><th>الارتفاع</th><th>القطر</th><th>الزمن</th><th>المعدل مل/ث</th></tr></thead><tbody class="tb"></tbody></table>
    <button class="btn navy anq">📝 الاستنتاج والتطبيق (6)</button>`;
  const q = s => body.querySelector(s); let d = 6, h = 60, vol = 0, tt = 0, level = 0, pour = 0, done = false, rec = [];
  const rate = () => 7.2 * (d / 6) ** 3 * (h / 60); // ml/s (model)
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    const sp = 4, dt = st.dt * sp; // time runs 4x faster than real
    if (pour) level = Math.min(1, level + dt * 1.2); const flowing = level > .05 && !done;
    if (flowing) { const r = rate() * Math.min(1, level * 1.5); vol += r * dt; tt += dt; level = Math.max(0, level - dt * r / 60 * (pour ? 0 : 1)); if (vol >= 100) { vol = 100; done = true; finish(); } }
    else if (!pour) level = Math.max(0, level - dt * .3);
    // stand
    const FY = 430 - h * 3.6 - 40; FX.stand(c, 230, 430, 400, FY + 30, 120);
    c.fillStyle = 'rgba(219,234,254,.55)'; c.strokeStyle = '#64748b'; c.lineWidth = 2; c.beginPath(); c.moveTo(300, FY); c.lineTo(400, FY); c.lineTo(356, FY + 52); c.lineTo(344, FY + 52); c.closePath(); c.fill(); c.stroke();
    if (level > 0) { const ly = FY + 52 - level * 50; c.fillStyle = 'rgba(59,130,246,.65)'; const hw = 6 + (FY + 52 - ly) * 50 / 52; c.beginPath(); c.moveTo(350 - hw, ly); c.lineTo(350 + hw, ly); c.lineTo(356, FY + 52); c.lineTo(344, FY + 52); c.closePath(); c.fill(); }
    // tube down into beaker
    const tw = d * .9; c.strokeStyle = 'rgba(148,163,184,.85)'; c.lineWidth = tw + 4; c.beginPath(); c.moveTo(350, FY + 52); c.bezierCurveTo(350, FY + 140, 520, 300, 520, 340); c.stroke();
    if (flowing) { c.strokeStyle = 'rgba(59,130,246,.85)'; c.lineWidth = tw; c.setLineDash([10, 6]); c.lineDashOffset = -st.t * 80 * rate() / 7; c.beginPath(); c.moveTo(350, FY + 52); c.bezierCurveTo(350, FY + 140, 520, 300, 520, 340); c.stroke(); c.setLineDash([]); }
    // beaker 500 ml
    FX.beaker(c, 475, 308, 90, 120, vol / 500, '#60a5fa', {});
    c.strokeStyle = '#dc2626'; c.lineWidth = 2; c.beginPath(); c.moveTo(475, 404); c.lineTo(498, 404); c.stroke(); FX.txt(c, '100 مل', 450, 404, { size: 11, color: '#dc2626' }); FX.txt(c, '500 مل', 520, 296, { size: 11, color: '#334155' });
    // meter stick
    c.fillStyle = '#fde68a'; c.fillRect(150, FY - 10, 14, 430 - FY + 10); for (let k = 0; k <= h + 10; k += 10) { const y = 430 - k * 3.6; c.fillStyle = '#78350f'; c.fillRect(150, y, 8, 1.5); FX.txt(c, k, 140, y, { size: 9, mono: true }); }
    FX.tag(c, 'الارتفاع ' + h + ' سم', 157, FY - 26, { size: 12, bg: '#b45309' });
    FX.clock(c, 660, 120, 40, tt, { text: tt.toFixed(1) });
    if (pour) { c.fillStyle = 'rgba(219,234,254,.8)'; c.save(); c.translate(400, FY - 40); c.rotate(.9); FX.rr(c, -20, -30, 40, 60, 6); c.fill(); c.restore(); c.strokeStyle = 'rgba(59,130,246,.8)'; c.lineWidth = 4; c.beginPath(); c.moveTo(380, FY - 30); c.lineTo(360, FY + 10); c.stroke(); }
    q('.vv').textContent = Math.round(vol) + ' مل'; q('.tv').textContent = tt.toFixed(1) + ' ث';
    if (!pour && vol === 0) FX.hint(c, 350, FY + 20, st.t, 'اضغط مطوّلًا «اسكب الماء» وأبقِ القمع ممتلئًا', { r: 34, dx: 60 });
    if (done) FX.tag(c, '✔ جرى 100 مل خلال ' + tt.toFixed(1) + ' ث', 520, 260, { size: 14, bg: '#16a34a' });
  }
  function finish() { const r = 100 / tt; rec.push({ h, d, r }); const tb = q('.tb'); if (tb.rows.length >= 4) tb.deleteRow(0); tb.insertAdjacentHTML('beforeend', `<tr><td>${h}</td><td>${d}</td><td>${tt.toFixed(1)}</td><td><b>${r1_(r)}</b></td></tr>`); beep(true); }
  function reset() { vol = 0; tt = 0; done = false; level = 0; }
  _holdBtn(q('.pour'), v => { pour = v; if (v && done) reset(); });
  q('.rs').onclick = reset;
  body.querySelectorAll('.dd').forEach(b => b.onclick = () => { d = +b.dataset.d; body.querySelectorAll('.dd').forEach(o => o.classList.toggle('alt', o !== b)); reset(); });
  q('.ht').addEventListener('input', () => { h = +q('.ht').value; q('.htv').textContent = h; reset(); });
  const A = [['استنتج بالاستعانة بالرسم البياني، كيف يعتمد معدل تدفق الماء على ارتفاع القمع؟', 'يزداد معدل تدفق الماء بزيادة ارتفاع القمع.'], ['وضّح كيف يعتمد معدل تدفق الماء على القطر الداخلي للأنبوب؟', 'يزداد معدل التدفق بزيادة قطر الأنبوب، ويقل بنقصانه.'],
    ['أي المتغيرات التي غيّرتها تقابل الجهد الكهربائي؟', 'ارتفاع القمع.'], ['أي المتغيرات التي غيّرتها تقابل المقاومة الكهربائية؟', 'قطر الأنبوب (الأضيق مقاومته أكبر).'],
    ['توقّع: كيف تعتمد شدة التيار على الجهد الكهربائي؟', 'تزداد شدة التيار بزيادة الجهد.'], ['توقّع: كيف تعتمد شدة التيار على المقاومة؟', 'تقل شدة التيار بزيادة المقاومة.']];
  q('.anq').onclick = () => openModal('<h3>الاستنتاج والتطبيق</h3>' + A.map((x, i) => `<div class="rv" data-a="${x[1]}">${i + 1}. ${x[0]}</div>`).join(''));
  FX.stage(host, 760, 460, draw, { vy: 6 });
}
