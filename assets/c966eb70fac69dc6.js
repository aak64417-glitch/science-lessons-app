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

/* ===== Virtual labs — Chapter 12: Magnetism (realistic canvas labs, labfx.js) ===== */
function _fb12(el, ok, msg) { const keep = [...el.classList].filter(c => !['fb', 'show', 'good', 'poor'].includes(c)).join(' '); el.className = 'fb show ' + (ok ? 'good' : 'poor') + ' ' + keep; el.innerHTML = msg; beep(ok); }
const q1_ = x => Math.round(x * 10) / 10;
const _R12 = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const _hold12 = (b, set) => { b.addEventListener('pointerdown', e => { e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (_) { } set(1); }); ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => b.addEventListener(ev, () => set(0))); };
/* bar magnet centred at x,y, length L, width W, angle a (N end points along +a) */
function _magnet(c, x, y, L, W, a, o) {
  o = o || {}; c.save(); c.translate(x, y); c.rotate(a || 0);
  FX.shadow(c, 0, W / 2 + 4, L * .5, 5, .25);
  c.fillStyle = FX.lg(c, 0, -W / 2, 0, W / 2, [[0, '#f87171'], [.5, '#dc2626'], [1, '#991b1b']]); FX.rr(c, 0, -W / 2, L / 2, W, 5); c.fill();
  c.fillStyle = FX.lg(c, 0, -W / 2, 0, W / 2, [[0, '#94a3b8'], [.5, '#475569'], [1, '#1e293b']]); FX.rr(c, -L / 2, -W / 2, L / 2, W, 5); c.fill();
  c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(-L / 2 + 4, -W / 2 + 3, L - 8, 3);
  c.save(); c.rotate(-(a || 0)); const fs = Math.max(11, W * .55);
  const nx = Math.cos(a || 0) * L / 4, ny = Math.sin(a || 0) * L / 4;
  FX.txt(c, 'ش', nx, ny + 1, { color: '#fff', size: fs, w: 800 }); FX.txt(c, 'ج', -nx, -ny + 1, { color: '#fff', size: fs, w: 800 }); c.restore();
  c.restore();
}
function _poles(x, y, L, a, q) { const d = L / 2 - 8; return [[x + Math.cos(a) * d, y + Math.sin(a) * d, q], [x - Math.cos(a) * d, y - Math.sin(a) * d, -q]]; }
function _field(px, py, P) { let bx = 0, by = 0; for (const [x, y, q] of P) { const dx = px - x, dy = py - y, r2 = dx * dx + dy * dy + 30, r = Math.sqrt(r2); bx += q * dx / (r2 * r); by += q * dy / (r2 * r); } return [bx, by]; }
function _compass(c, x, y, r, ang, o) { // ang = direction the north (red) tip points
  o = o || {}; FX.shadow(c, x, y + r + 3, r * .8, 4, .25);
  c.fillStyle = FX.lg(c, x - r, y - r, x + r, y + r, [[0, '#fde68a'], [1, '#b45309']]); c.beginPath(); c.arc(x, y, r + 3, 0, 7); c.fill();
  c.fillStyle = '#f8fafc'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.strokeStyle = '#94a3b8'; c.lineWidth = 1;
  for (let k = 0; k < 16; k++) { const t = k / 16 * 6.283; c.beginPath(); c.moveTo(x + Math.cos(t) * r * .82, y + Math.sin(t) * r * .82); c.lineTo(x + Math.cos(t) * r * .95, y + Math.sin(t) * r * .95); c.stroke(); }
  c.save(); c.translate(x, y); c.rotate(ang);
  c.fillStyle = '#dc2626'; c.beginPath(); c.moveTo(r * .78, 0); c.lineTo(0, -r * .16); c.lineTo(0, r * .16); c.closePath(); c.fill();
  c.fillStyle = '#334155'; c.beginPath(); c.moveTo(-r * .78, 0); c.lineTo(0, -r * .16); c.lineTo(0, r * .16); c.closePath(); c.fill(); c.restore();
  c.fillStyle = '#111827'; c.beginPath(); c.arc(x, y, Math.max(2, r * .09), 0, 7); c.fill();
}
function _cell12(c, x, y, w, h, label) { // battery lying horizontally, + on the right
  c.fillStyle = FX.lg(c, 0, y, 0, y + h, [[0, '#1f2937'], [.5, '#64748b'], [1, '#0b1220']]); FX.rr(c, x, y, w * .72, h, 6); c.fill();
  c.fillStyle = FX.lg(c, 0, y, 0, y + h, [[0, '#b45309'], [.5, '#fbbf24'], [1, '#78350f']]); FX.rr(c, x + w * .7, y, w * .3, h, 6); c.fill();
  c.fillStyle = '#d1d5db'; FX.rr(c, x + w, y + h * .3, 8, h * .4, 2); c.fill();
  FX.txt(c, label || '1.5V', x + w * .38, y + h / 2 + 1, { color: '#fde68a', size: Math.max(10, h * .32), w: 700, mono: true });
  FX.txt(c, '+', x + w * .86, y + h / 2 + 1, { color: '#fff', size: h * .5, w: 800, mono: true }); FX.txt(c, '−', x + 10, y + h / 2 + 1, { color: '#fff', size: h * .5, w: 800, mono: true });
}
function _wire12(c, pts, col, w) { c.strokeStyle = 'rgba(0,0,0,.22)'; c.lineWidth = (w || 5) + 2; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1] + 2) : c.moveTo(p[0], p[1] + 2)); c.stroke();
  c.strokeStyle = col || '#dc2626'; c.lineWidth = w || 5; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); }
function _bulb12(c, x, y, s, g) {
  const gy = y - 50 * s;
  if (g > .02) { c.fillStyle = FX.rg(c, x, gy, 2, 90 * s * (.5 + g), [[0, `rgba(255,236,140,${.75 * g})`], [.4, `rgba(255,210,80,${.3 * g})`], [1, 'rgba(255,200,60,0)']]); c.beginPath(); c.arc(x, gy, 90 * s * (.5 + g), 0, 7); c.fill(); }
  c.fillStyle = g > .02 ? `rgba(255,${250 - 20 * g | 0},${200 - 100 * g | 0},${.6 + .35 * g})` : 'rgba(225,238,248,.6)'; c.strokeStyle = 'rgba(120,140,160,.8)'; c.lineWidth = 1.5;
  c.beginPath(); c.arc(x, gy, 24 * s, Math.PI * .78, Math.PI * 2.22); c.lineTo(x + 10 * s, y - 24 * s); c.lineTo(x - 10 * s, y - 24 * s); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = g > .02 ? '#fff7cc' : '#78350f'; c.lineWidth = (g > .02 ? 2.2 : 1.2) * s; c.beginPath(); c.moveTo(x - 7 * s, gy); for (let k = 1; k <= 6; k++) c.lineTo(x - 7 * s + k * 2.4 * s, gy + (k % 2 ? -3 : 0) * s); c.stroke();
  c.fillStyle = FX.lg(c, x - 10 * s, 0, x + 10 * s, 0, [[0, '#9ca3af'], [.5, '#f3f4f6'], [1, '#6b7280']]); c.fillRect(x - 10 * s, y - 25 * s, 20 * s, 17 * s);
  c.fillStyle = '#111827'; c.fillRect(x - 7 * s, y - 8 * s, 14 * s, 5 * s);
}
function _galv(c, x, y, v, o) { // analogue galvanometer centred-zero, v in [-1,1]
  o = o || {}; const w = 150, h = 110; FX.shadow(c, x + w / 2, y + h + 4, w * .5, 6, .3);
  c.fillStyle = FX.lg(c, 0, y, 0, y + h, [[0, '#f1f5f9'], [1, '#94a3b8']]); FX.rr(c, x, y, w, h, 12); c.fill();
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(x + 14, y + 74); c.arc(x + w / 2, y + 84, 62, Math.PI * 1.18, Math.PI * 1.82); c.closePath(); c.fill();
  c.strokeStyle = '#334155'; c.lineWidth = 1.2; for (let k = -5; k <= 5; k++) { const t = -Math.PI / 2 + k * .1; c.beginPath(); c.moveTo(x + w / 2 + Math.cos(t) * 52, y + 84 + Math.sin(t) * 52); c.lineTo(x + w / 2 + Math.cos(t) * (k % 5 ? 46 : 42), y + 84 + Math.sin(t) * (k % 5 ? 46 : 42)); c.stroke(); }
  FX.txt(c, '0', x + w / 2, y + 26, { size: 10, mono: true }); FX.txt(c, '−', x + 24, y + 46, { size: 13, mono: true, w: 800 }); FX.txt(c, '+', x + w - 24, y + 46, { size: 13, mono: true, w: 800 });
  const t = -Math.PI / 2 + FX.clamp(v, -1, 1) * .5; c.strokeStyle = '#dc2626'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(x + w / 2, y + 84); c.lineTo(x + w / 2 + Math.cos(t) * 56, y + 84 + Math.sin(t) * 56); c.stroke();
  c.fillStyle = '#111827'; c.beginPath(); c.arc(x + w / 2, y + 84, 5, 0, 7); c.fill();
  FX.txt(c, o.label || 'جلفانومتر', x + w / 2, y + h - 10, { size: 12, w: 700 });
  c.fillStyle = '#111827'; c.beginPath(); c.arc(x + 18, y + h - 12, 5, 0, 7); c.fill(); c.fillStyle = '#dc2626'; c.beginPath(); c.arc(x + w - 18, y + h - 12, 5, 0, 7); c.fill();
  return { a: [x + 18, y + h - 12], b: [x + w - 18, y + h - 12] };
}

/* ---------- LAB 1: magnetic forces between two bar magnets (launch lab p163) ---------- */
function labMagForce(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🧲 القوى المغناطيسية</h3>`;
  const S = stepsList(panel, ['ضع المغناطيسين متقابلين على طرفي الورقة', 'حرّك المغناطيس الأيسر بلطف نحو الآخر حتى يتحرّك، وسجّل المسافة', 'أدر أحد المغناطيسين 180° وكرّر، ثم أدر الآخر وكرّر', 'كرّر بوضع المغناطيسين متعامدين (حرف T)']);
  panel.insertAdjacentHTML('beforeend', `<div class="mini"><button class="btn alt rb">↻ أدر الأيسر 180°</button><button class="btn alt ra">↻ أدر الأيمن 180°</button><button class="btn alt tt">⊤ وضع T</button><button class="btn alt rs">↺</button></div>
    <div class="fxro"><div>المسافة بين المغناطيسين<b class="dv">—</b></div><div>القوة المتبادلة<b class="fv">0</b></div></div>
    <table class="data"><thead><tr><th>الوضع</th><th>المسافة عند الحركة</th><th>الحركة</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="rv" data-a="يبدأ التأثير عند مسافة قصيرة، وتتحرك المغانط معًا: تتجاذب إذا تقابل قطبان مختلفان وتتنافر إذا تقابل قطبان متشابهان، وتزداد القوة كلما قلّت المسافة، وتكون أضعف في وضع T.">التفكير الناقد: ما المسافة اللازمة للتأثير؟ وكيف تؤثر المسافة في القوة؟</div>`);
  const q = s => body.querySelector(s), Y = 250, L = 150, W = 34, PX = 8, FS = 3.2, FR = 2.4; // 8 px per cm
  let bx, ax, aAng, bAng, tMode, av, moved, rec, done;
  function reset() { aAng = Math.PI; bAng = 0; tMode = false; done = new Set(); q('.tb').innerHTML = ''; rec = 0; again(); }
  function again() { moved = false; av = 0; bx = 170; ax = 560; }
  function cfg() { const bR = Math.cos(bAng) > 0 ? 'ش' : 'ج'; if (tMode) return bR + ' ⊤'; return bR + ' ↔ ' + (Math.cos(aAng) < 0 ? 'ش' : 'ج'); }
  const aX = () => tMode ? ax - L / 2 + W / 2 : ax, aA = () => tMode ? (aAng === Math.PI ? Math.PI / 2 : -Math.PI / 2) : aAng;
  function gap() { return (ax - L / 2 - (bx + L / 2)) / PX; }
  function force() { const PB = _poles(bx, Y, L, bAng, 1), A = _poles(aX(), Y, L, aA(), 1); let fx = 0; for (const [x, y, qa] of A) fx += qa * _field(x, y, PB)[0]; return fx * 1e4; }
  function log(kind) { const key = cfg(); q('.tb').insertAdjacentHTML('beforeend', `<tr><td>${key}</td><td><b>${q1_(Math.max(0, gap()))} سم</b></td><td>${kind}</td></tr>`); if (q('.tb').rows.length > 4) q('.tb').deleteRow(0); done.add(key); rec++; beep(true); }
  function draw(c, st) {
    FX.room(c, st, 400); FX.bench(c, st.x0, st.x1, 400, st.y1);
    FX.shadow(c, 380, 372, 330, 10, .2); c.fillStyle = '#ffffff'; c.fillRect(50, 120, 660, 250); c.strokeStyle = '#e2e8f0'; c.lineWidth = 1; c.strokeRect(50, 120, 660, 250);
    c.fillStyle = '#fef3c7'; c.fillRect(60, 330, 640, 26); c.fillStyle = '#78350f'; for (let k = 0; k <= 80; k++) { const x = 60 + k * PX; c.fillRect(x, 330, 1, k % 5 ? 6 : 11); if (k % 10 === 0) FX.txt(c, k, x, 349, { size: 10, mono: true }); }
    const F = force();
    if (!moved) { if (Math.abs(F) > FS) { moved = true; log(F < 0 ? 'تجاذب: تحرّك نحوه' : 'تنافر: ابتعد عنه'); } else if (tMode && gap() <= .3) { moved = true; log('تأثير ضعيف جدًّا'); } }
    if (moved && !(tMode && Math.abs(F) <= FS)) { const net = Math.abs(F) > FR || Math.abs(av) > 1 ? F - Math.sign(av || F) * FR * .5 : 0; av += net * st.dt * 60; av *= Math.pow(.2, st.dt); if (Math.abs(F) < FR && Math.abs(av) < 4) av = 0;
      ax += av * st.dt; if (gap() <= 0) { ax = bx + L; av = 0; } if (ax > 690 - L / 2) { ax = 690 - L / 2; av = 0; } }
    _magnet(c, bx, Y, L, W, bAng); _magnet(c, aX(), Y, L, W, aA());
    if (Math.abs(F) > .3) { const ln = FX.clamp(Math.abs(F) * 14, 12, 90), dir = F > 0 ? 1 : -1, x0 = aX();
      FX.arrow(c, x0, Y - (tMode ? 100 : 60), x0 + dir * ln, Y - (tMode ? 100 : 60), F < 0 ? '#2563eb' : '#dc2626', 5); FX.tag(c, F < 0 ? 'تجاذب' : 'تنافر', x0 + dir * ln / 2, Y - (tMode ? 124 : 84), { size: 13, bg: F < 0 ? '#2563eb' : '#dc2626' }); }
    st.hit({ id: 'B', x: bx - L / 2, y: Y - W, w: L, h: 2 * W, drag: { move(p) { bx = FX.clamp(p.x, 120, ax - L - 1); } } });
    q('.dv').textContent = q1_(Math.max(0, gap())) + ' سم'; q('.fv').textContent = Math.abs(F) < .3 ? '≈ 0' : (F < 0 ? 'تجاذب ' : 'تنافر ') + q1_(Math.abs(F));
    S.set(rec === 0 ? 1 : done.size < 3 ? 2 : [...done].some(k => k.includes('⊤')) ? 4 : 3);
    if (!moved) FX.hint(c, bx, Y, st.t, 'اسحب المغناطيس ببطء نحو الآخر', { r: 40, dx: 30 });
    else FX.tag(c, 'اضغط «أدر» أو «وضع T» لتجربة جديدة', 380, 100, { size: 12, bg: '#0f172a' });
  }
  q('.rb').onclick = () => { bAng = bAng ? 0 : Math.PI; again(); }; q('.ra').onclick = () => { aAng = aAng === Math.PI ? 0 : Math.PI; again(); };
  q('.tt').onclick = () => { tMode = !tMode; q('.tt').classList.toggle('alt', !tMode); again(); }; q('.rs').onclick = reset;
  reset(); FX.stage(host, 760, 460, draw, { vy: 6 });
}

/* ---------- LAB 2: observing the magnetic field with iron filings & a compass (Fig. 2–3, lab p171) ---------- */
function labFilings(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🧲 ملاحظة المجال المغناطيسي</h3>
    <div class="seg"><button class="btn md" data-m="one">مغناطيس واحد</button><button class="btn alt md" data-m="ns">ش ← → ج</button><button class="btn alt md" data-m="nn">ش ← → ش</button><button class="btn alt md" data-m="ss">ج ← → ج</button></div>
    <div class="mini"><button class="btn sp">✨ رشّ برادة الحديد</button><button class="btn alt tap">👆 اطرق الطبق</button><label class="row" style="gap:.2em;font-size:.82em"><input type="checkbox" class="ln"> خطوط المجال</label></div>
    <div class="fxro"><div>شدة المجال عند البوصلة<b class="bv">—</b></div></div>
    <div class="rv" data-a="تتجمع البرادة بكثافة وتتقارب خطوطها بالقرب من أقطاب المغانط حيث يكون المجال أقوى، وتتباعد وتقل كثافتها بعيدًا عنها حيث يضعف المجال.">التحليل 1: ماذا يحدث للبرادة بالقرب من أقطاب المغانط، وبعيدًا عنها؟</div>
    <div class="rv" data-a="بين قطبين مختلفين تنحني الخطوط لتتصل من قطب إلى الآخر (تجاذب)، وبين قطبين متشابهين تنحني الخطوط لتتباعد (تنافر). والمغناطيس الأقوى تكون خطوط مجاله أكثر كثافة وامتدادًا.">التحليل 2: قارن بين مجالات المغانط المختلفة، وحدّد الأقوى والأضعف.</div>`;
  const q = s => body.querySelector(s), CX = 380, CY = 230, R = 205;
  let mode = 'one', P, F = [], settle = 0, cx = 560, cy = 120, shown = false;
  function setup() { const L = 130; if (mode === 'one') P = _poles(CX, CY, 150, 0, 1);
    else { const g = 70, a1 = 0, a2 = mode === 'ns' ? 0 : Math.PI; let A = _poles(CX - g - L / 2, CY, L, mode === 'ss' ? Math.PI : a1, 1), B = _poles(CX + g + L / 2, CY, L, mode === 'ss' ? 0 : a2, 1); P = A.concat(B); }
    F = []; settle = 0; shown = false; }
  function mags(c) { if (mode === 'one') _magnet(c, CX, CY, 150, 30, 0); else { const L = 130, g = 70; _magnet(c, CX - g - L / 2, CY, L, 28, mode === 'ss' ? Math.PI : 0); _magnet(c, CX + g + L / 2, CY, L, 28, mode === 'ss' ? 0 : mode === 'ns' ? 0 : Math.PI); } }
  function sprinkle() { F = []; let i = 0; while (F.length < 1500 && i < 9000) { i++; const a = _R12(i) * 6.283, r = Math.sqrt(_R12(i + 7)) * R, x = CX + Math.cos(a) * r, y = CY + Math.sin(a) * r * .95;
      const [bx, by] = _field(x, y, P), m = Math.hypot(bx, by); if (_R12(i + 13) > Math.min(1, m * 9e3 + .12)) continue; if (Math.abs(y - CY) < 18 && x > CX - 230 && x < CX + 230 && mode !== 'one' ? Math.abs(x - CX) > 70 : Math.abs(y - CY) < 18 && Math.abs(x - CX) < 75) continue;
      F.push({ x, y, a0: _R12(i + 3) * 6.283, bx, by, m }); } settle = 0; shown = true; beep(true); }
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    mags(c);
    c.fillStyle = 'rgba(219,234,254,.35)'; c.beginPath(); c.ellipse(CX, CY, R + 6, R * .95 + 6, 0, 0, 7); c.fill(); c.strokeStyle = 'rgba(148,163,184,.9)'; c.lineWidth = 3; c.stroke();
    settle = Math.min(1, settle + st.dt * .5);
    c.strokeStyle = '#1f2937'; c.lineWidth = 1.6;
    for (const f of F) { const ta = Math.atan2(f.by, f.bx), k = FX.clamp(settle * (0.4 + f.m * 6e3), 0, 1); let d = ta - f.a0; d = Math.atan2(Math.sin(d), Math.cos(d)); const a = f.a0 + d * k, l = 3.2 + Math.min(3, f.m * 4e3);
      c.beginPath(); c.moveTo(f.x - Math.cos(a) * l, f.y - Math.sin(a) * l); c.lineTo(f.x + Math.cos(a) * l, f.y + Math.sin(a) * l); c.stroke(); }
    if (q('.ln').checked) { c.strokeStyle = 'rgba(37,99,235,.75)'; c.lineWidth = 1.6;
      P.filter(p => p[2] > 0).forEach(([px, py]) => { for (let k = 0; k < 12; k++) { const a0 = k / 12 * 6.283; let x = px + Math.cos(a0) * 10, y = py + Math.sin(a0) * 10; c.beginPath(); c.moveTo(x, y);
        for (let s = 0; s < 260; s++) { const [bx, by] = _field(x, y, P), m = Math.hypot(bx, by); if (m < 1e-9) break; x += bx / m * 4; y += by / m * 4; c.lineTo(x, y); if (Math.hypot(x - CX, (y - CY) / .95) > R || P.some(p => p[2] < 0 && Math.hypot(x - p[0], y - p[1]) < 8)) break; if (s === 120) { c.stroke(); FX.arrow(c, x - bx / m * 6, y - by / m * 6, x, y, 'rgba(37,99,235,.9)', 2); c.beginPath(); c.moveTo(x, y); } }
        c.stroke(); } }); }
    const [bx, by] = _field(cx, cy, P), bm = Math.hypot(bx, by); _compass(c, cx, cy, 24, Math.atan2(by, bx));
    st.hit({ id: 'cmp', x: cx - 28, y: cy - 28, w: 56, h: 56, drag: { move(p) { cx = FX.clamp(p.x, 40, 720); cy = FX.clamp(p.y, 30, 410); } } });
    q('.bv').textContent = Math.round(bm * 1e5);
    if (!shown) FX.hint(c, CX, CY - 110, st.t, 'اضغط «رشّ برادة الحديد»', { r: 30 }); else if (settle > .9) FX.tag(c, 'اسحب البوصلة حول المغناطيس', 600, 40, { size: 13, bg: '#0f172a' });
  }
  body.querySelectorAll('.md').forEach(b => b.onclick = () => { mode = b.dataset.m; body.querySelectorAll('.md').forEach(o => o.classList.toggle('alt', o !== b)); setup(); });
  q('.sp').onclick = sprinkle; q('.tap').onclick = () => { if (F.length) { settle = Math.max(0, settle - .2); F.forEach(f => f.a0 += (Math.random() - .5) * .3); setTimeout(() => settle = 1, 50); beep(true); } };
  setup(); FX.stage(host, 760, 450, draw, { vy: 6 });
}

/* ---------- LAB 3: magnetic domains & temporary magnets (Fig. 4–5) ---------- */
function labDomains(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🔩 المناطق المغناطيسية</h3>`;
  const S = stepsList(panel, ['لاحظ المناطق المغناطيسية العشوائية في قطعة الحديد (الشكل 5أ)', 'قرّب المغناطيس القوي من قطعة الحديد (الشكل 5ب)', 'لاحظ كيف تمغنط قطعة الحديد مشابك الورق (الشكل 5جـ)', 'أبعد المغناطيس ولاحظ ماذا يحدث للمغناطيس المؤقت']);
  panel.insertAdjacentHTML('beforeend', `<div class="fxro"><div>المناطق المرتبة<b class="pv">0%</b></div><div>المشابك المعلّقة<b class="cv">0</b></div></div>
    <div class="mini"><button class="btn alt rs">↺</button></div><div class="fb msg"></div>
    <div class="rv" data-a="لأن المناطق المغناطيسية في الحديد العادي مرتبة في اتجاهات عشوائية فتلغي مجالاتها بعضها بعضًا، وعند تقريب مغناطيس قوي تترتب في اتجاه مجاله فتنتج مجالًا موحّدًا ويصبح الحديد مغناطيسًا مؤقتًا.">فسّر: لماذا لا تؤثر قطعة الحديد العادية كمغناطيس، ولماذا تصبح مغناطيسًا عند تقريب مغناطيس قوي منها؟</div>`);
  const q = s => body.querySelector(s), IX = 230, IY = 120, IW = 300, IH = 150, NC = 7, NR = 4;
  let D, mx, wasNear, maxClips;
  function reset() { D = []; for (let r = 0; r < NR; r++) for (let k = 0; k < NC; k++) D.push({ x: IX + 22 + k * (IW - 44) / (NC - 1) + (_R12(r * 9 + k) - .5) * 8, y: IY + 22 + r * (IH - 44) / (NR - 1) + (_R12(r * 9 + k + 3) - .5) * 8, a: _R12(r * 13 + k * 7) * 6.283, t: 0 }); mx = 700; wasNear = false; maxClips = 0; q('.msg').className = 'fb msg'; }
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    // iron bar (zoomed) with domains
    c.fillStyle = FX.lg(c, 0, IY, 0, IY + IH, [[0, '#cbd5e1'], [.5, '#94a3b8'], [1, '#64748b']]); FX.rr(c, IX, IY, IW, IH, 10); c.fill();
    FX.txt(c, 'قطعة حديد (مقطع مكبّر)', IX + IW / 2, IY - 14, { size: 13, w: 700 });
    const gapPx = mx - 60 - (IX + IW), pull = FX.clamp(1 - gapPx / 110, 0, 1);
    let al = 0;
    D.forEach((d, i) => { const want = 0, local = pull * (1.2 - (IX + IW - d.x) / IW * .5); const tgt = local > .35 ? want : d.a0 != null ? d.a0 : (d.a0 = d.a);
      if (local > .35) d.a += Math.atan2(Math.sin(want - d.a), Math.cos(want - d.a)) * Math.min(1, st.dt * 3 * local); else { d.a += Math.atan2(Math.sin(d.a0 - d.a), Math.cos(d.a0 - d.a)) * Math.min(1, st.dt * .8); }
      void tgt; al += Math.max(0, Math.cos(d.a));
      c.save(); c.translate(d.x, d.y); c.strokeStyle = 'rgba(30,41,59,.35)'; c.lineWidth = 1; c.beginPath(); for (let k = 0; k < 6; k++) { const t = k / 6 * 6.283 + i; c.lineTo(Math.cos(t) * 22, Math.sin(t) * 18); } c.closePath(); c.stroke();
      c.rotate(d.a); c.fillStyle = '#dc2626'; c.fillRect(0, -4, 14, 8); c.fillStyle = '#334155'; c.fillRect(-14, -4, 14, 8); c.restore(); });
    const frac = al / D.length; q('.pv').textContent = Math.round(frac * 100) + '%';
    // strong magnet (drag)
    _magnet(c, mx, IY + IH / 2, 120, 46, Math.PI);
    FX.tag(c, 'مغناطيس قوي', mx, IY + IH / 2 - 44, { size: 12, bg: '#0f172a' });
    st.hit({ id: 'mag', x: mx - 60, y: IY + IH / 2 - 30, w: 120, h: 60, drag: { move(p) { mx = FX.clamp(p.x, IX + IW + 62, 700); } } });
    // paper clips hanging from the iron bar's left end
    const clips = frac > .55 ? Math.round((frac - .55) / .45 * 5) : 0; maxClips = Math.max(maxClips, clips);
    for (let k = 0; k < 6; k++) { const y = IY + IH + 8 + k * 38, on = k < clips; c.strokeStyle = on ? '#94a3b8' : 'rgba(148,163,184,.5)'; c.lineWidth = 2.5;
      const x = on ? IX + 30 : 90 + k * 22, yy = on ? y : 410 - (k % 2) * 4; c.save(); c.translate(x, yy); if (!on) c.rotate(1.4 + k * .3); FX.rr(c, -6, -2, 12, 36, 6); c.stroke(); c.restore();
      if (on && k < clips) { FX.txt(c, 'ش', x + 18, yy + 4, { size: 10, color: '#dc2626', w: 800 }); FX.txt(c, 'ج', x + 18, yy + 30, { size: 10, color: '#334155', w: 800 }); } }
    q('.cv').textContent = clips;
    const near = pull > .6;
    if (near) wasNear = true;
    if (wasNear && !near && frac < .5 && maxClips > 0 && !q('.msg').classList.contains('show')) _fb12(q('.msg'), true, 'عند إبعاد المغناطيس عادت المناطق إلى الترتيب العشوائي فسقطت المشابك: كانت قطعة الحديد <b>مغناطيسًا مؤقتًا</b>.');
    S.set(!wasNear ? (pull > 0 ? 1 : 0) : maxClips === 0 ? 1 : near ? 2 : 3);
    if (!wasNear) FX.hint(c, mx, IY + IH / 2, st.t, 'اسحب المغناطيس القوي نحو قطعة الحديد', { r: 44, dx: -40 });
  }
  q('.rs').onclick = reset; reset(); FX.stage(host, 760, 450, draw, { vy: 6 });
}

/* ---------- LAB 4: compasses around a magnet & Earth's field, magnetic declination (Fig. 6, 8, p170) ---------- */
function labCompass(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🧭 البوصلة ومجال الأرض</h3>
    <div class="seg"><button class="btn md" data-m="mag">البوصلات حول المغناطيس</button><button class="btn alt md" data-m="dec">إيجاد الانحراف المغناطيسي</button></div>
    <div class="pa"><div class="mini"><button class="btn rm">✋ أزل المغناطيس</button><button class="btn alt rot">↻ أدر المغناطيس</button></div>
    <div class="rv" data-a="تتجه جميعها في اتجاه واحد نحو الشمال الجغرافي؛ لأنها تتأثر بالمجال المغناطيسي للأرض فقط.">الشكل 8: وضّح ما يحدث لإبر البوصلات جميعها عند إزالة القضيب المغناطيسي.</div>
    <div class="rv" data-a="لأن قطب الأرض المغناطيسي الموجود في أقصى الشمال قطب مغناطيسي جنوبي، فينجذب إليه القطب الشمالي لإبرة البوصلة.">لماذا يتجه القطب الشمالي لإبرة البوصلة نحو شمال الأرض؟</div></div>
    <div class="pb" style="display:none"><div class="q" style="margin:0;font-size:.82em">موقعك 50° شمالًا و110° غربًا، والقطب الشمالي الجغرافي 90° ش و110° غ، والقطب الجنوبي المغناطيسي 80° ش و105° غ.</div>
    <div class="mini"><button class="btn l1">1️⃣ ارسم الخط إلى الشمال الجغرافي</button><button class="btn alt l2">2️⃣ ارسم الخط إلى القطب المغناطيسي</button><button class="btn alt me">📐 قس الزاوية</button></div><div class="fb msg"></div></div>`;
  const q = s => body.querySelector(s); let mode = 'mag', magOn = true, mAng = 0, comps, drag = null, lines = 0, measured = false;
  const ring = () => Array.from({ length: 8 }, (_, k) => { const a = k / 8 * 6.283; return { x: 380 + Math.cos(a) * 170, y: 220 + Math.sin(a) * 120, ang: -Math.PI / 2 }; });
  comps = ring(); comps.push({ x: 600, y: 380, ang: -Math.PI / 2, mv: 1 });
  // declination grid: x 115W..85W (6 cells), y 40N..90N (5 cells); cell 60px
  const GX = 230, GY = 60, CS = 58, gx = lon => GX + (115 - lon) / 5 * CS, gy = lat => GY + (90 - lat) / 10 * CS;
  function draw(c, st) {
    if (mode === 'mag') {
      FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
      c.fillStyle = '#fff'; c.fillRect(110, 50, 540, 360); c.strokeStyle = '#e2e8f0'; c.strokeRect(110, 50, 540, 360);
      FX.arrow(c, 690, 380, 690, 300, '#16a34a', 4); FX.txt(c, 'الشمال الجغرافي', 690, 290, { size: 11, color: '#166534', w: 700 });
      const P = magOn ? _poles(380, 220, 120, mAng, 1) : [];
      if (magOn) _magnet(c, 380, 220, 120, 34, mAng);
      comps.forEach(cp => { let tgt = -Math.PI / 2; if (magOn) { const [bx, by] = _field(cp.x, cp.y, P); const m = Math.hypot(bx, by), e = 2.2e-5; tgt = Math.atan2(by - e, bx); }
        let d = tgt - cp.ang; d = Math.atan2(Math.sin(d), Math.cos(d)); cp.ang += d * Math.min(1, st.dt * 4) + Math.sin(st.t * 7 + cp.x) * .002 * Math.abs(d); _compass(c, cp.x, cp.y, cp.mv ? 26 : 22, cp.ang); });
      const mv = comps[comps.length - 1]; FX.tag(c, 'اسحبني', mv.x, mv.y - 40, { size: 11, bg: '#0f172a' });
      st.hit({ id: 'cmp', x: mv.x - 30, y: mv.y - 30, w: 60, h: 60, drag: { move(p) { mv.x = FX.clamp(p.x, 120, 640); mv.y = FX.clamp(p.y, 60, 400); } } });
      FX.tag(c, magOn ? 'تتجه الإبر مع خطوط المجال المغناطيسي' : 'بدون المغناطيس: تتجه الإبر جميعها نحو الشمال (مجال الأرض)', 380, 30, { size: 13, bg: magOn ? '#be123c' : '#16a34a' });
    } else {
      c.fillStyle = '#f8fafc'; c.fillRect(st.x0, st.y0, st.x1 - st.x0, st.y1 - st.y0);
      c.strokeStyle = '#2563eb'; c.lineWidth = 2; for (let k = 0; k <= 6; k++) { c.beginPath(); c.moveTo(GX + k * CS, GY); c.lineTo(GX + k * CS, GY + 5 * CS); c.stroke(); FX.txt(c, 115 - k * 5, GX + k * CS, GY + 5 * CS + 16, { size: 12, mono: true }); }
      for (let k = 0; k <= 5; k++) { c.beginPath(); c.moveTo(GX, GY + k * CS); c.lineTo(GX + 6 * CS, GY + k * CS); c.stroke(); FX.txt(c, 90 - k * 10, GX - 18, GY + k * CS, { size: 12, mono: true }); }
      FX.txt(c, 'خط الطول (° غربًا)', GX + 3 * CS, GY + 5 * CS + 38, { size: 13, w: 700 }); c.save(); c.translate(GX - 50, GY + 2.5 * CS); c.rotate(-Math.PI / 2); FX.txt(c, 'خط العرض (° شمالًا)', 0, 0, { size: 13, w: 700 }); c.restore();
      const me = [gx(110), gy(50)], gp = [gx(110), gy(90)], mp = [gx(105), gy(80)];
      [[me, 'موقعك', '#0f172a'], [gp, 'الشمال الجغرافي', '#16a34a'], [mp, 'القطب الجنوبي المغناطيسي', '#dc2626']].forEach(([p, t, col]) => { c.fillStyle = col; c.beginPath(); c.arc(p[0], p[1], 7, 0, 7); c.fill(); FX.tag(c, t, p[0] + (t === 'موقعك' ? -10 : 70), p[1] + (t === 'موقعك' ? 22 : -16), { size: 12, bg: col }); });
      if (lines >= 1) { c.strokeStyle = '#16a34a'; c.lineWidth = 3; c.beginPath(); c.moveTo(me[0], me[1]); c.lineTo(gp[0], gp[1]); c.stroke(); }
      if (lines >= 2) { c.strokeStyle = '#dc2626'; c.lineWidth = 3; c.beginPath(); c.moveTo(me[0], me[1]); c.lineTo(mp[0], mp[1]); c.stroke(); }
      if (measured) { const a1 = -Math.PI / 2, a2 = Math.atan2(mp[1] - me[1], mp[0] - me[0]); c.fillStyle = 'rgba(245,183,0,.35)'; c.beginPath(); c.moveTo(me[0], me[1]); c.arc(me[0], me[1], 70, a1, a2); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(15,23,42,.5)'; c.lineWidth = 1; c.beginPath(); c.arc(me[0], me[1], 90, Math.PI, 2 * Math.PI); c.stroke(); for (let k = 0; k <= 18; k++) { const t = Math.PI + k / 18 * Math.PI; c.beginPath(); c.moveTo(me[0] + Math.cos(t) * 84, me[1] + Math.sin(t) * 84); c.lineTo(me[0] + Math.cos(t) * 90, me[1] + Math.sin(t) * 90); c.stroke(); }
        FX.tag(c, '≈ ' + Math.round((a2 - a1) * 180 / Math.PI) + '°', me[0] + 40, me[1] - 100, { size: 15, bg: '#b45309' }); }
    }
  }
  function show(m) { mode = m; q('.pa').style.display = m === 'mag' ? '' : 'none'; q('.pb').style.display = m === 'dec' ? '' : 'none'; body.querySelectorAll('.md').forEach(o => o.classList.toggle('alt', o.dataset.m !== m)); }
  body.querySelectorAll('.md').forEach(b => b.onclick = () => show(b.dataset.m));
  q('.rm').onclick = () => { magOn = !magOn; q('.rm').textContent = magOn ? '✋ أزل المغناطيس' : '🧲 أعد المغناطيس'; beep(true); };
  q('.rot').onclick = () => { mAng = (mAng + Math.PI / 2) % (2 * Math.PI); };
  q('.l1').onclick = () => { lines = Math.max(lines, 1); q('.l2').classList.remove('alt'); beep(true); };
  q('.l2').onclick = () => { if (lines < 1) { toast('ارسم الخط الأول أولًا'); return; } lines = 2; q('.me').classList.remove('alt'); beep(true); };
  q('.me').onclick = () => { if (lines < 2) { toast('ارسم الخطين أولًا'); return; } measured = true; const a = Math.round(Math.atan2(CS * 1, CS * 3) * 180 / Math.PI);
    _fb12(q('.msg'), true, `زاوية الانحراف المغناطيسي لموقعك على هذا الرسم ≈ <b>${a}°</b> (فرق خط الطول خلية واحدة، وفرق خط العرض ثلاث خلايا).`); };
  void drag; FX.stage(host, 760, 450, draw, { vy: 6 });
}

/* ---------- LAB 5: make an electromagnet — nail, coil, paper clips (lab p174, Fig. 9) ---------- */
function labElectromagnet(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🔋 صنع مغناطيس كهربائي</h3>
    <div class="seg"><b style="font-size:.82em">عدد اللفات:</b>${[5, 10, 20, 30].map(n => `<button class="btn ${n === 10 ? '' : 'alt'} tn" data-n="${n}">${n}</button>`).join('')}</div>
    <div class="seg"><b style="font-size:.82em">البطاريات:</b><button class="btn bt" data-b="1">1</button><button class="btn alt bt" data-b="2">2</button></div>
    <div class="mini"><button class="btn sw">🔌 صِل الطرف الثاني</button><button class="btn alt rec">📋 سجّل</button></div>
    <div class="fxro"><div>المشابك المحمولة<b class="cv">0</b></div><div>حرارة السلك<b class="hv">باردة</b></div></div>
    <table class="data"><thead><tr><th>اللفات</th><th>البطاريات</th><th>المشابك</th></tr></thead><tbody class="tb"></tbody></table>
    <div class="rv" data-a="تزداد قوة المغناطيس الكهربائي بزيادة عدد اللفات (10 لفات ≈ 4 مشابك، و20 لفة ≈ 8 مشابك)؛ والعلاقة طردية، فيُتوقع أن يحمل ملف من 5 لفات نحو مشبكين. كما تزداد القوة بزيادة التيار (البطاريتين).">التحليل: هل زيادة عدد اللفات تزيد من قوة المغناطيس أم تضعفه؟ وتوقّع عدد المشابك لملف من 5 لفات.</div>`;
  const q = s => body.querySelector(s); let n = 10, b = 1, on = false, ny = 160, clipsUp = 0, heat = 0, pts = [];
  const strength = () => on ? n * b * .4 : 0;
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    heat = FX.clamp(heat + (on ? st.dt * .05 * b : -st.dt * .1), 0, 1);
    // battery holder
    c.fillStyle = '#111827'; FX.rr(c, 70, 330, 220, 70, 10); c.fill(); for (let k = 0; k < b; k++) _cell12(c, 85 + k * 100, 345, 90, 40, '1.5V'); if (b === 1) { c.fillStyle = '#374151'; FX.rr(c, 185, 345, 90, 40, 6); c.fill(); }
    // clip tray
    c.fillStyle = '#e2e8f0'; FX.rr(c, 410, 380, 250, 34, 8); c.fill(); for (let k = 0; k < 30; k++) { c.strokeStyle = '#94a3b8'; c.lineWidth = 2; c.save(); c.translate(425 + (k % 15) * 15, 392 + Math.floor(k / 15) * 10); c.rotate(_R12(k) * 3); FX.rr(c, -5, -2, 10, 16, 5); c.stroke(); c.restore(); }
    // nail with coil (vertical)
    const NX = 520, L = 190; c.fillStyle = FX.lg(c, NX - 6, 0, NX + 6, 0, [[0, '#9ca3af'], [.5, '#f8fafc'], [1, '#6b7280']]); c.fillRect(NX - 5, ny, 10, L); c.fillRect(NX - 14, ny - 6, 28, 7); c.beginPath(); c.moveTo(NX - 5, ny + L); c.lineTo(NX, ny + L + 14); c.lineTo(NX + 5, ny + L); c.fill();
    const tc = Math.min(n, 30); c.strokeStyle = heat > .5 ? '#ea580c' : '#b45309'; c.lineWidth = 3; for (let k = 0; k < tc; k++) { const y = ny + 20 + k * (L - 50) / tc; c.beginPath(); c.ellipse(NX, y, 11, 3.5, 0, 0, Math.PI); c.stroke(); }
    _wire12(c, [[NX - 8, ny + 22], [380, ny + 30], [300, 300], [90, 330]], '#b45309', 3);
    const end = on ? [282, 365] : [320, 300]; _wire12(c, [[NX + 8, ny + L - 30], [430, 300], end], '#b45309', 3);
    if (on) { const s = strength(); c.strokeStyle = 'rgba(37,99,235,.35)'; c.lineWidth = 1.5; for (let k = 1; k <= 3; k++) { c.beginPath(); c.ellipse(NX, ny + L / 2, 24 + k * 18 * Math.min(1.4, s / 6), L / 2 + k * 14, 0, 0, 7); c.stroke(); } }
    // clips picked up
    const near = ny + L + 14 > 360; const target = on && near ? Math.min(14, Math.round(strength())) : on ? clipsUp : 0;
    if (near && on) clipsUp = target; if (!on) clipsUp = 0;
    for (let k = 0; k < clipsUp; k++) { const x = NX + ((k % 3) - 1) * 12, y = ny + L + 14 + Math.floor(k / 3) * 16 + 4; c.strokeStyle = '#64748b'; c.lineWidth = 2.5; c.save(); c.translate(x, y); c.rotate(((k % 3) - 1) * .3); FX.rr(c, -5, -2, 10, 18, 5); c.stroke(); c.restore(); }
    st.hit({ id: 'nail', x: NX - 30, y: ny - 10, w: 60, h: L + 30, drag: { move(p) { ny = FX.clamp(p.y - L / 2, 80, 168); } } });
    q('.cv').textContent = clipsUp; q('.hv').textContent = heat > .6 ? 'ساخنة ⚠' : heat > .25 ? 'دافئة' : 'باردة';
    FX.graph(c, 40, 30, 300, 180, { xmax: 30, ymax: 24, xstep: 5, ystep: 4, xlab: 'عدد اللفات', ylab: 'المشابك', series: [1, 2].map(bb => ({ pts: pts.filter(p => p[2] === bb).map(p => [p[0], p[1]]).sort((a, z) => a[0] - z[0]), col: bb === 1 ? '#be123c' : '#0e7490' })).filter(s => s.pts.length) });
    if (!on) FX.hint(c, 320, 300, st.t, 'صِل الطرف الثاني بالبطارية', { r: 22, dx: 40 }); else if (!near) FX.hint(c, NX, ny + L, st.t, 'اسحب المسمار نحو المشابك', { r: 26, dx: 60 });
  }
  q('.sw').onclick = () => { on = !on; q('.sw').textContent = on ? '⏹ افصل البطارية' : '🔌 صِل الطرف الثاني'; beep(true); if (!on) ny = 160; };
  body.querySelectorAll('.tn').forEach(x => x.onclick = () => { n = +x.dataset.n; body.querySelectorAll('.tn').forEach(o => o.classList.toggle('alt', o !== x)); on = false; ny = 160; q('.sw').textContent = '🔌 صِل الطرف الثاني'; });
  body.querySelectorAll('.bt').forEach(x => x.onclick = () => { b = +x.dataset.b; body.querySelectorAll('.bt').forEach(o => o.classList.toggle('alt', o !== x)); on = false; ny = 160; q('.sw').textContent = '🔌 صِل الطرف الثاني'; });
  q('.rec').onclick = () => { if (!on || !clipsUp) { toast('صِل البطارية وارفع المشابك أولًا'); return; } if (!pts.some(p => p[0] === n && p[2] === b)) pts.push([n, clipsUp, b]); const tb = q('.tb'); if (tb.rows.length >= 4) tb.deleteRow(0);
    tb.insertAdjacentHTML('beforeend', `<tr><td>${n}</td><td>${b}</td><td><b>${clipsUp}</b></td></tr>`); beep(true); };
  FX.stage(host, 760, 450, draw, { vy: 6 });
}

/* ---------- LAB 6: the electric bell (Fig. 10, review Q18) ---------- */
function labBell(body) {
  const { host, panel } = labShell(body);
  const ST = ['دائرة مغلقة', 'مغناطيس كهربائي يعمل', 'مطرقة تنجذب للمغناطيس وتطرق الناقوس', 'دائرة مفتوحة', 'مغناطيس كهربائي يتوقف عن العمل', 'مطرقة ترجع إلى الخلف بواسطة نابض'];
  panel.innerHTML = `<h3>🔔 الجرس الكهربائي</h3>
    <div class="mini"><button class="btn pr">👆 اضغط زر الجرس (مطوّلًا)</button><label class="row" style="gap:.2em;font-size:.82em"><input type="checkbox" class="slow" checked> حركة بطيئة</label></div>
    <ol class="fxsteps cyc">${ST.map(s => `<li>${s}</li>`).join('')}</ol>
    <div class="fxro"><div>عدد الطرقات<b class="kv">0</b></div></div>
    <div class="rv" data-a="عندما تنجذب الرافعة نحو المغناطيس تبتعد عن نقطة التوصيل فتفتح الدائرة، فيفقد المغناطيس الكهربائي مجاله ويتوقف عن العمل، فيعيد النابض الرافعة إلى نقطة التوصيل.">الشكل 10: وضّح كيف يتم إيقاف المغناطيس الكهربائي عن العمل كل مرة؟</div>`;
  const q = s => body.querySelector(s); let press = 0, arm = 0, phase = -1, knocks = 0, ring = 0, contact = true;
  const P = FX.parts();
  function draw(c, st) {
    FX.room(c, st, 440, { wall0: '#fdf2f8', wall1: '#fce7f3' });
    const sp = q('.slow').checked ? .35 : 1, closed = press && contact;
    // armature: pulled while the circuit is closed; at the gong the contact opens; the spring returns it and the contact closes again
    let ph = -1;
    if (closed) { arm = Math.min(1, arm + st.dt * 4 * sp); ph = arm < .2 ? 0 : arm < .97 ? 1 : 2;
      if (arm >= 1) { contact = false; knocks++; ring = 1; beep(true); for (let k = 0; k < 8; k++) P.add({ k: 'ring', x: 470, y: 120, life: .6, r: 40 + k * 3, grow: 60, rgb: '245,183,0' }); } }
    else { arm = Math.max(0, arm - st.dt * 3 * sp); if (press) ph = arm > .8 ? 3 : arm > .35 ? 4 : 5; if (arm <= 0) contact = true; }
    phase = ph; ring = Math.max(0, ring - st.dt * 2);
    q('.cyc').querySelectorAll('li').forEach((li, i) => { li.classList.toggle('now', i === phase); li.classList.toggle('ok', false); });
    q('.kv').textContent = knocks;
    // gong
    c.fillStyle = FX.rg(c, 450, 100, 10, 90, [[0, '#f1f5f9'], [.7, '#94a3b8'], [1, '#475569']]); c.beginPath(); c.arc(470 + Math.sin(st.t * 60) * ring * 2, 120, 80, 0, 7); c.fill(); c.fillStyle = '#334155'; c.beginPath(); c.arc(470, 120, 10, 0, 7); c.fill();
    // electromagnet (U core with coils)
    const on = closed; c.fillStyle = '#4b5563'; FX.rr(c, 360, 230, 130, 26, 6); c.fill(); FX.rr(c, 360, 230, 26, 120, 6); c.fill(); FX.rr(c, 360, 324, 130, 26, 6); c.fill();
    c.strokeStyle = on ? '#f97316' : '#b91c1c'; c.lineWidth = 5; for (let k = 0; k < 9; k++) { c.beginPath(); c.ellipse(395 + k * 10, 243, 4, 16, 0, 0, 7); c.stroke(); c.beginPath(); c.ellipse(395 + k * 10, 337, 4, 16, 0, 0, 7); c.stroke(); }
    if (on) { c.fillStyle = 'rgba(249,115,22,.18)'; c.beginPath(); c.arc(500, 290, 60, 0, 7); c.fill(); FX.tag(c, 'مغناطيس كهربائي يعمل', 430, 380, { size: 12, bg: '#ea580c' }); }
    // armature (hinged at bottom 560,420) with hammer
    const ax = 560 - arm * 40; c.strokeStyle = '#6b7280'; c.lineWidth = 9; c.beginPath(); c.moveTo(560, 420); c.lineTo(ax, 150); c.stroke();
    c.fillStyle = '#1f2937'; c.beginPath(); c.arc(ax - 6, 148, 14, 0, 7); c.fill();
    c.fillStyle = '#9ca3af'; FX.rr(c, ax - 6, 260, 14, 60, 4); c.fill();
    // spring
    c.strokeStyle = '#64748b'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(ax + 4, 380); for (let k = 0; k <= 10; k++) c.lineTo(ax + 4 + k * (650 - ax - 4) / 10, 380 + (k % 2 ? -8 : 8)); c.stroke(); c.fillStyle = '#334155'; c.fillRect(648, 360, 10, 40);
    // contact screw
    c.fillStyle = '#b45309'; c.fillRect(ax + 6, 200, 6, 10); c.fillStyle = '#d97706'; FX.rr(c, 590, 196, 50, 18, 4); c.fill(); const touching = contact;
    if (touching) { c.fillStyle = '#fde047'; c.beginPath(); c.arc(588, 205, 4, 0, 7); c.fill(); }
    // circuit: battery, push button, wires
    _cell12(c, 120, 395, 120, 40, '6V');
    c.fillStyle = '#e5e7eb'; FX.rr(c, 70, 230, 90, 50, 10); c.fill(); c.fillStyle = press ? '#991b1b' : '#dc2626'; c.beginPath(); c.arc(115, 255 + (press ? 3 : 0), 16, 0, 7); c.fill(); FX.txt(c, 'الزر', 115, 296, { size: 12, w: 700 });
    const live = closed ? '#f59e0b' : '#64748b';
    _wire12(c, [[128, 415], [40, 415], [40, 255], [70, 255]], live, 4); _wire12(c, [[160, 255], [300, 255], [300, 240], [360, 240]], live, 4);
    _wire12(c, [[360, 337], [320, 337], [320, 200], [640, 200], [700, 205], [700, 440], [560, 440], [560, 420]], live, 4);
    _wire12(c, [[248, 415], [300, 415], [300, 440], [560, 440]], live, 4);
    P.step(st.dt); P.draw(c);
    st.hit({ id: 'btn', x: 80, y: 225, w: 70, h: 60, hold: v => press = v ? 1 : 0 });
    if (!knocks) FX.hint(c, 115, 255, st.t, 'اضغط الزر مطوّلًا', { r: 24, dx: 60 });
  }
  _hold12(q('.pr'), v => press = v); FX.stage(host, 760, 460, draw, { vy: 6 });
}

/* ---------- LAB 7: build an electric motor (inquiry p184–185, Fig. 13) ---------- */
function labMotor(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>⚙ المحرّك الكهربائي</h3>`;
  const S = stepsList(panel, ['ضع الملف (30 لفة) على المسامير بين المغناطيسين', 'لامس طرفي السلكين بطرفي الملف لإغلاق الدائرة', 'افتح الدائرة ولاحظ', 'جرّب ضِعف عدد اللفات، واعكس قطبي البطارية']);
  panel.insertAdjacentHTML('beforeend', `<div class="mini"><button class="btn sw">🔌 أغلق الدائرة</button><button class="btn alt rv2">🔄 اعكس البطارية</button><button class="btn alt tn">✖2 ضاعف اللفات</button></div>
    <div class="mini"><label class="row" style="gap:.2em;font-size:.82em"><input type="checkbox" class="fa"> أظهر القوى (الشكل 13أ)</label></div>
    <div class="fxro"><div>اللفات<b class="nv">30</b></div><div>سرعة الدوران<b class="rv3">0</b></div></div>
    <button class="btn navy anq">📝 الاستنتاج والتطبيق (3)</button>`);
  const q = s => body.querySelector(s); let on = false, dir = 1, turns = 30, th = .3, w = 0, opened = false, tried = new Set();
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    // wooden base
    c.fillStyle = FX.lg(c, 0, 330, 0, 410, [[0, '#d6b88a'], [1, '#a47b52']]); FX.rr(c, 130, 330, 500, 80, 8); c.fill();
    // magnets on wooden blocks
    c.fillStyle = '#c8a06a'; FX.rr(c, 150, 230, 110, 100, 6); c.fill(); FX.rr(c, 500, 230, 110, 100, 6); c.fill();
    _magnet(c, 230, 250, 110, 40, 0); _magnet(c, 530, 250, 110, 40, 0);
    FX.txt(c, 'ش', 268, 286, { size: 11, color: '#991b1b', w: 800 }); FX.txt(c, 'ج', 492, 286, { size: 11, color: '#1e293b', w: 800 });
    // field lines between faces
    c.strokeStyle = 'rgba(37,99,235,.3)'; c.lineWidth = 1.5; for (let k = -3; k <= 3; k++) { FX.arrow(c, 290, 250 + k * 9, 470, 250 + k * 9, 'rgba(37,99,235,.35)', 1.5); }
    // physics: torque only when commutator half contacts (cos(th)>0 side), sign by dir
    const contact = on && Math.cos(th) > 0; const torque = contact ? dir * turns / 30 * 9 * Math.abs(Math.sin(th) + .25) : 0;
    w += (torque - w * 1.2) * st.dt; th += w * st.dt * 3;
    // nails & needle axle
    c.strokeStyle = '#9ca3af'; c.lineWidth = 4; [[330, 330, 360, 250], [390, 330, 360, 250], [370, 330, 400, 250], [430, 330, 400, 250]].forEach(([a, b2, cc, d]) => { c.beginPath(); c.moveTo(a, b2); c.lineTo(cc, d); c.stroke(); });
    c.strokeStyle = '#cbd5e1'; c.lineWidth = 3; c.beginPath(); c.moveTo(300, 250); c.lineTo(460, 250); c.stroke(); c.fillStyle = '#dc2626'; c.beginPath(); c.arc(460, 250, 4, 0, 7); c.fill();
    // coil (rotating about horizontal axle): drawn as ellipse whose vertical radius = R*cos
    const R = 46, cy = 250, cx = 380, ry = R * Math.cos(th), rx = 26; c.strokeStyle = '#b45309'; c.lineWidth = 2 + turns / 30 * 2;
    for (let k = 0; k < (turns > 30 ? 5 : 3); k++) { c.beginPath(); c.ellipse(cx - 6 + k * 4, cy, rx, Math.abs(ry) + 1, 0, 0, 7); c.stroke(); }
    c.fillStyle = Math.cos(th) > 0 ? 'rgba(251,191,36,.9)' : 'rgba(180,83,9,.9)'; c.beginPath(); c.arc(cx, cy - ry, 4, 0, 7); c.fill();
    if (q('.fa').checked && contact) { FX.arrow(c, cx - rx, cy - ry, cx - rx, cy - ry - 40 * dir * Math.sign(Math.cos(th) || 1), '#dc2626', 4); FX.arrow(c, cx + rx, cy + ry, cx + rx, cy + ry + 40 * dir * Math.sign(Math.cos(th) || 1), '#dc2626', 4); FX.tag(c, 'المجال يؤثر بقوتين متعاكستين في جانبي الملف', 380, 150, { size: 12, bg: '#dc2626' }); }
    // battery and leads
    _cell12(c, 140, 380, 130, 40, '6V');
    const tip = on ? [[332, 262], [432, 262]] : [[300, 320], [460, 320]]; const p1 = dir > 0 ? [278, 400] : [140, 400], p2 = dir > 0 ? [140, 400] : [278, 400];
    _wire12(c, [p1, [300, 420], [300, 360], tip[0]], '#dc2626', 4); _wire12(c, [p2, [110, 420], [110, 440], [470, 440], [470, 360], tip[1]], '#111827', 4);
    if (Math.abs(w) > .3) for (let k = 0; k < 3; k++) { const a = st.t * 8 + k * 2; c.strokeStyle = 'rgba(15,23,42,.25)'; c.lineWidth = 2; c.beginPath(); c.arc(cx, cy, 60 + k * 6, a, a + .6); c.stroke(); }
    q('.rv3').textContent = Math.round(Math.abs(w) * 30) + (Math.abs(w) > .1 ? (w > 0 ? ' ⟳' : ' ⟲') : '') + ' د/د'; q('.nv').textContent = turns;
    S.set(!on && !opened ? 1 : on && !opened ? 2 : tried.size < 2 ? 3 : 4);
    if (!on && !opened) FX.hint(c, 380, 320, st.t, 'اضغط «أغلق الدائرة»', { r: 30 });
  }
  q('.sw').onclick = () => { on = !on; if (!on) opened = true; q('.sw').textContent = on ? '⏹ افتح الدائرة' : '🔌 أغلق الدائرة'; beep(true); if (on) th = Math.max(th, .3); };
  q('.rv2').onclick = () => { dir = -dir; tried.add('rev'); beep(true); if (on) toast('انعكس اتجاه التيار فانعكس اتجاه الدوران'); };
  q('.tn').onclick = () => { turns = turns === 30 ? 60 : 30; tried.add('turns'); q('.tn').textContent = turns === 30 ? '✖2 ضاعف اللفات' : '÷2 أعد 30 لفة'; beep(true); if (on && turns === 60) toast('مجال الملف أقوى: يدور أسرع'); };
  const A = [['صف ما حدث عندما أغلقت الدائرة بوصل الأسلاك. وهل كنت تتوقّع النتيجة؟', 'بدأ الملف بالدوران؛ لأن المجال المغناطيسي للمغناطيسين يؤثر بقوة في الملف الذي يسري فيه التيار.'], ['صف ما حدث عندما فتحت الدائرة.', 'تباطأ الملف ثم توقف؛ لأن التيار توقف فزالت القوة المغناطيسية.'], ['توقّع ما يحدث إذا استخدمت ضِعف عدد اللفات.', 'يصبح مجال الملف أقوى فتزداد القوة ويدور الملف أسرع.']];
  q('.anq').onclick = () => openModal('<h3>الاستنتاج والتطبيق</h3>' + A.map((x, i) => `<div class="rv" data-a="${x[1]}">${i + 1}. ${x[0]}</div>`).join(''));
  FX.stage(host, 760, 460, draw, { vy: 6 });
}

/* ---------- LAB 8: electric generator & alternating current (Fig. 16–17, review Q41–42) ---------- */
function labGenerator(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🔄 المولّد الكهربائي</h3>
    <div class="seg"><button class="btn md" data-m="coil">الملف الدوّار (الشكل 17)</button><button class="btn alt md" data-m="wire">سلك في مجال (الشكل 16)</button></div>
    <div class="pa"><label class="rng">سرعة الدوران <input type="range" class="sp" min="0" max="3" step=".5" value="0"><b class="spv">0</b> د/ث</label>
    <div class="q" style="margin:0;font-size:.8em">أو أدِر المقبض بيدك (اسحب حول الدائرة).</div></div>
    <div class="pb" style="display:none"><div class="q" style="margin:0;font-size:.8em">اسحب السلك إلى أسفل ثم إلى أعلى بين القطبين، وراقب الجلفانومتر.</div><div class="fb msg"></div></div>
    <div class="fxro"><div>التيار المتولد<b class="iv">0</b></div><div>الاتجاه<b class="dv" style="font-family:inherit;font-size:.95em">—</b></div></div>
    <div class="rv" data-a="يغيّر التيار اتجاهه كل نصف دورة؛ لأن كل جانب من جانبي الملف يتحرك إلى أعلى في نصف الدورة ثم إلى أسفل في النصف الآخر، فيسمى تيارًا مترددًا (AC).">لماذا يتردد التيار من الموجب إلى السالب في المولد؟</div>`;
  const q = s => body.querySelector(s); let mode = 'coil', th = 0, w = 0, manual = 0, hist = [], wy = 200, wv = 0, wPrevY = 200, seen = new Set();
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    let emf = 0;
    if (mode === 'coil') {
      const target = +q('.sp').value * 6.283; if (manual > 0) manual -= st.dt; else w += (target - w) * Math.min(1, st.dt * 2);
      th += w * st.dt; emf = Math.sin(th) * w / 18.85;
      // magnets (block poles)
      c.fillStyle = FX.lg(c, 0, 150, 0, 260, [[0, '#94a3b8'], [1, '#475569']]); FX.rr(c, 90, 150, 110, 110, 8); c.fill(); FX.txt(c, 'ج', 145, 205, { size: 30, color: '#fff', w: 800 });
      c.fillStyle = FX.lg(c, 0, 150, 0, 260, [[0, '#f87171'], [1, '#991b1b']]); FX.rr(c, 440, 150, 110, 110, 8); c.fill(); FX.txt(c, 'ش', 495, 205, { size: 30, color: '#fff', w: 800 });
      for (let k = -3; k <= 3; k++) FX.arrow(c, 438, 205 + k * 12, 202, 205 + k * 12, 'rgba(37,99,235,.35)', 1.5);
      const cx = 320, R = 90, h = 70 * Math.cos(th); c.strokeStyle = '#d97706'; c.lineWidth = 5; c.beginPath(); c.moveTo(cx - R, 205 - h); c.lineTo(cx + R, 205 - h); c.lineTo(cx + R, 205 + h); c.lineTo(cx - R, 205 + h); c.closePath(); c.stroke();
      c.fillStyle = Math.cos(th) > 0 ? '#fbbf24' : '#92400e'; c.beginPath(); c.arc(cx + R, 205 - h, 5, 0, 7); c.fill();
      // slip rings & crank
      c.strokeStyle = '#94a3b8'; c.lineWidth = 6; c.beginPath(); c.moveTo(cx, 205 + Math.abs(h)); c.lineTo(cx, 330); c.stroke(); [300, 318].forEach(y => { c.fillStyle = '#b45309'; c.beginPath(); c.ellipse(cx, y + 20, 22, 7, 0, 0, 7); c.fill(); });
      const kx = cx + Math.cos(th) * 40, ky = 380 + Math.sin(th) * 14; c.strokeStyle = '#475569'; c.lineWidth = 6; c.beginPath(); c.moveTo(cx, 380); c.lineTo(kx, ky); c.stroke(); c.fillStyle = '#1f2937'; c.beginPath(); c.arc(kx, ky, 9, 0, 7); c.fill(); c.beginPath(); c.ellipse(cx, 380, 44, 16, 0, 0, 7); c.strokeStyle = 'rgba(71,85,105,.4)'; c.lineWidth = 2; c.stroke();
      FX.txt(c, 'مصدر قدرة لتحريك الحلقة', cx, 420, { size: 11, w: 700 });
      st.hit({ id: 'crank', x: cx - 60, y: 350, w: 120, h: 60, drag: { start() { manual = .5; }, move(p, d) { const a = Math.atan2((p.y - 380) / .35, p.x - cx); let da = a - (th % 6.283); da = Math.atan2(Math.sin(da), Math.cos(da)); w = FX.clamp(da / Math.max(st.dt, .016), -25, 25); th += da; manual = .5; } } });
      const g = _galv(c, 570, 40, emf * 1.2, { label: 'جلفانومتر' }); _wire12(c, [[cx - 20, 340], [560, 340], [560, 160], g.a], '#111827', 3); _wire12(c, [[cx + 20, 358], [720, 358], [720, 160], g.b], '#dc2626', 3);
      _bulb12(c, 650, 310, 1, Math.min(1, Math.abs(emf) * 1.3));
      hist.push(emf); if (hist.length > 220) hist.shift();
      c.fillStyle = 'rgba(255,255,255,.95)'; FX.rr(c, 30, 20, 400, 110, 10); c.fill(); c.strokeStyle = '#cbd5e1'; c.stroke(); c.strokeStyle = '#94a3b8'; c.beginPath(); c.moveTo(40, 75); c.lineTo(420, 75); c.stroke();
      c.strokeStyle = '#be123c'; c.lineWidth = 2; c.beginPath(); hist.forEach((v, i) => { const x = 40 + i * 380 / 220, y = 75 - v * 40; i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.stroke(); FX.txt(c, 'التيار المتولد مع الزمن', 230, 32, { size: 11, w: 700 }); FX.txt(c, '+', 32, 45, { size: 12, mono: true }); FX.txt(c, '−', 32, 105, { size: 12, mono: true });
      q('.spv').textContent = q1_(Math.abs(w) / 6.283);
    } else {
      // Fig 16: straight wire through field between block poles
      c.fillStyle = FX.lg(c, 0, 140, 0, 330, [[0, '#94a3b8'], [1, '#475569']]); FX.rr(c, 120, 140, 120, 190, 10); c.fill(); FX.txt(c, 'ج', 180, 235, { size: 30, color: '#fff', w: 800 });
      c.fillStyle = FX.lg(c, 0, 140, 0, 330, [[0, '#f87171'], [1, '#991b1b']]); FX.rr(c, 420, 140, 120, 190, 10); c.fill(); FX.txt(c, 'ش', 480, 235, { size: 30, color: '#fff', w: 800 });
      for (let k = 0; k < 9; k++) FX.arrow(c, 418, 160 + k * 20, 242, 160 + k * 20, 'rgba(37,99,235,.35)', 1.5);
      wv = (wy - wPrevY) / Math.max(st.dt, .016); wPrevY = wy; const inField = wy > 150 && wy < 320; emf = inField ? FX.clamp(-wv / 600, -1, 1) : 0;
      c.strokeStyle = '#c2410c'; c.lineWidth = 9; c.beginPath(); c.moveTo(200, wy + 40); c.lineTo(460, wy - 40); c.stroke();
      if (Math.abs(emf) > .05) { for (let k = 0; k < 6; k++) { const f = ((st.t * 2 * Math.sign(emf)) + k / 6) % 1, ff = f < 0 ? f + 1 : f, x = 200 + ff * 260, y = wy + 40 - ff * 80; c.fillStyle = '#38bdf8'; c.beginPath(); c.arc(x, y, 4, 0, 7); c.fill(); }
        FX.arrow(c, 330, wy - 70, 330, wy - 70 + (wv > 0 ? 40 : -40), '#dc2626', 5); seen.add(wv > 0 ? 'down' : 'up'); }
      const g = _galv(c, 590, 40, emf, { label: 'جلفانومتر' }); _wire12(c, [[200, wy + 40], [120, 380], [580, 380], g.a], '#111827', 3); _wire12(c, [[460, wy - 40], [700, 300], g.b], '#dc2626', 3);
      st.hit({ id: 'w', x: 190, y: wy - 50, w: 280, h: 100, drag: { move(p) { wy = FX.clamp(p.y, 90, 360); } } });
      if (seen.size === 2 && !q('.msg').classList.contains('show')) _fb12(q('.msg'), true, 'عند سحب السلك إلى أسفل انحرف المؤشر في اتجاه، وعند سحبه إلى أعلى انحرف في الاتجاه المعاكس: ينعكس اتجاه حركة الإلكترونات فينعكس التيار.');
      if (!seen.size) FX.hint(c, 330, wy, st.t, 'اسحب السلك إلى أسفل وإلى أعلى', { r: 30, dx: 40 });
    }
    q('.iv').textContent = q1_(Math.abs(emf) * 2) + ' mA'; q('.dv').textContent = Math.abs(emf) < .04 ? '—' : emf > 0 ? 'موجب (+)' : 'سالب (−)';
  }
  body.querySelectorAll('.md').forEach(b => b.onclick = () => { mode = b.dataset.m; q('.pa').style.display = mode === 'coil' ? '' : 'none'; q('.pb').style.display = mode === 'wire' ? '' : 'none'; body.querySelectorAll('.md').forEach(o => o.classList.toggle('alt', o !== b)); });
  q('.sp').addEventListener('input', () => { manual = 0; });
  FX.stage(host, 760, 450, draw, { vy: 6 });
}

/* ---------- LAB 9: the transformer — turns ratio (Fig. 19–20, review Q27–28) ---------- */
function labTransformer(body) {
  const { host, panel } = labShell(body);
  panel.innerHTML = `<h3>🔁 المحوّل الكهربائي</h3>
    <div class="seg"><b style="font-size:.8em">المصدر:</b><button class="btn src" data-v="60">متردد 60 V</button><button class="btn alt src" data-v="120">متردد 120 V</button><button class="btn alt src" data-v="dc">بطارية (مستمر) 6 V</button></div>
    <label class="rng">لفات الابتدائي <input type="range" class="np" min="2" max="12" value="3"><b class="npv">3</b></label>
    <label class="rng">لفات الثانوي <input type="range" class="ns" min="2" max="12" value="9"><b class="nsv">9</b></label>
    <div class="seg"><b style="font-size:.8em">محولات الكتاب:</b>${[['س', 4, 12], ['ص', 10, 2], ['ع', 3, 6], ['ل', 5, 10]].map(t => `<button class="btn alt bk" data-p="${t[1]}" data-s="${t[2]}">${t[0]}</button>`).join('')}</div>
    <div class="fxro"><div>الجهد الناتج<b class="vo">0</b></div><div>النوع<b class="ty" style="font-family:inherit;font-size:.95em">—</b></div></div>
    <div class="q" style="margin:0;font-size:.82em">🎯 التحدي (س28): اجعل الجهد الناتج <b>12 V</b> من مصدر 60 V.</div><div class="fb msg"></div>`;
  const q = s => body.querySelector(s); let src = '60', np = 3, ns = 9, ph = 0, won = false;
  const Vin = () => src === 'dc' ? 6 : +src, Vout = () => src === 'dc' ? 0 : Vin() * ns / np;
  function upd() { np = +q('.np').value; ns = +q('.ns').value; q('.npv').textContent = np; q('.nsv').textContent = ns; q('.vo').textContent = q1_(Vout()) + ' V';
    q('.ty').textContent = src === 'dc' ? 'لا يعمل مع المستمر' : ns > np ? 'رافع للجهد' : ns < np ? 'خافض للجهد' : 'الجهد كما هو';
    if (!won && src === '60' && Math.abs(Vout() - 12) < 1e-6) { won = true; _fb12(q('.msg'), true, `✔ النسبة ${np} : ${ns} = 5 : 1 ⇐ 60 ÷ 5 = 12 V. وهو المحول (ص) في الكتاب (10 : 2).`); } }
  function coil(c, x, y0, y1, n, col, side) { c.strokeStyle = col; c.lineWidth = 6; for (let k = 0; k < n; k++) { const y = y0 + (k + .5) * (y1 - y0) / n; c.beginPath(); c.moveTo(x - 30, y); c.lineTo(x + 30, y); c.stroke(); }
    c.lineWidth = 4; c.beginPath(); c.moveTo(x + side * 30, y0 + (y1 - y0) / n * .5); c.lineTo(x + side * 80, y0 + (y1 - y0) / n * .5); c.stroke(); c.beginPath(); c.moveTo(x + side * 30, y1 - (y1 - y0) / n * .5); c.lineTo(x + side * 80, y1 - (y1 - y0) / n * .5); c.stroke(); }
  function draw(c, st) {
    FX.room(c, st, 430); FX.bench(c, st.x0, st.x1, 430, st.y1);
    ph += st.dt * 6; const ac = src !== 'dc';
    // iron core
    c.fillStyle = FX.lg(c, 0, 80, 0, 360, [[0, '#a8a29e'], [1, '#57534e']]); FX.rr(c, 250, 90, 260, 260, 18); c.fill(); c.fillStyle = '#f1f5f9'; FX.rr(c, 300, 140, 160, 160, 8); c.fill();
    if (ac) { c.strokeStyle = `rgba(37,99,235,${.25 + .25 * Math.abs(Math.sin(ph))})`; c.lineWidth = 3; c.setLineDash([8, 6]); c.lineDashOffset = Math.sin(ph) * 20; FX.rr(c, 275, 115, 210, 210, 12); c.stroke(); c.setLineDash([]); FX.tag(c, 'مجال مغناطيسي متغيّر في القلب الحديدي', 380, 70, { size: 12, bg: '#2563eb' }); }
    coil(c, 275, 140, 300, np, '#dc2626', -1); coil(c, 485, 140, 300, ns, '#2563eb', 1);
    FX.txt(c, 'ملف ابتدائي (' + np + ')', 230, 330, { size: 12, w: 700, color: '#991b1b' }); FX.txt(c, 'ملف ثانوي (' + ns + ')', 530, 330, { size: 12, w: 700, color: '#1e3a8a' });
    // source
    if (ac) { c.fillStyle = '#0f172a'; FX.rr(c, 40, 160, 120, 110, 12); c.fill(); FX.txt(c, '~ ' + Vin() + ' V', 100, 200, { size: 20, color: '#fde047', w: 800, mono: true }); FX.txt(c, 'مصدر متردد', 100, 240, { size: 12, color: '#e2e8f0' }); }
    else { _cell12(c, 40, 195, 120, 40, '6V'); FX.txt(c, 'تيار مستمر', 100, 260, { size: 12, w: 700 }); }
    _wire12(c, [[160, 190], [195, 190], [195, 148]], '#dc2626', 4); _wire12(c, [[160, 240], [195, 240], [195, 292]], '#dc2626', 4);
    // load: lamp + voltmeter
    const vo = Vout(); _wire12(c, [[565, 148], [640, 148], [640, 170]], '#2563eb', 4); _wire12(c, [[565, 292], [640, 292], [640, 270]], '#2563eb', 4);
    _bulb12(c, 640, 270, 1.2, FX.clamp(vo / 120, 0, 1));
    c.fillStyle = '#1f2937'; FX.rr(c, 600, 330, 120, 60, 10); c.fill(); FX.lcd(c, 610, 340, 100, 30, q1_(vo) + ' V', {}); FX.txt(c, 'فولتميتر', 660, 400, { size: 11, w: 700 });
    FX.tag(c, 'جـ الناتج ÷ جـ الداخل = لفات الثانوي ÷ لفات الابتدائي', 380, 410, { size: 12, bg: '#0f172a' });
    if (!ac) FX.tag(c, 'لا يتولّد مجال متغيّر ⇐ لا جهد في الملف الثانوي', 380, 70, { size: 12, bg: '#dc2626' });
  }
  body.querySelectorAll('.src').forEach(b => b.onclick = () => { src = b.dataset.v; body.querySelectorAll('.src').forEach(o => o.classList.toggle('alt', o !== b)); upd(); });
  body.querySelectorAll('.bk').forEach(b => b.onclick = () => { q('.np').value = b.dataset.p; q('.ns').value = b.dataset.s; body.querySelectorAll('.bk').forEach(o => o.classList.toggle('alt', o !== b)); upd(); });
  ['.np', '.ns'].forEach(s => q(s).addEventListener('input', upd)); upd(); FX.stage(host, 760, 450, draw, { vy: 6 });
}
