/* ===== arena.js — الألعاب التعليمية (منصة دروس العلوم) =====
   Six animated game scenes driven by the lesson's own question bank (window.GAME). */
(function () {
  'use strict';
  const G = window.GAME || { lesson: { title: 'لعبة' }, qs: [] };
  const AR = "'IBM Plex Sans Arabic',Tahoma,sans-serif", DS = "'Readex Pro','IBM Plex Sans Arabic',Tahoma,sans-serif";
  const AD = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  const $ = (s, r) => (r || document).querySelector(s);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a) * t, ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const R = i => { const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
  function mix(c1, c2, t) { const p = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)); const a = p(c1), b = p(c2); return '#' + a.map((v, i) => Math.round(lerp(v, b[i], clamp(t, 0, 1))).toString(16).padStart(2, '0')).join(''); }
  function rr(c, x, y, w, h, r) { r = Math.min(r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function lg(c, x0, y0, x1, y1, st) { const g = c.createLinearGradient(x0, y0, x1, y1); st.forEach(s => g.addColorStop(s[0], s[1])); return g; }
  function rg(c, x, y, r0, r1, st, x1, y1) { const g = c.createRadialGradient(x, y, r0, x1 == null ? x : x1, y1 == null ? y : y1, r1); st.forEach(s => g.addColorStop(s[0], s[1])); return g; }
  function shadow(c, x, y, rx, ry, a) { c.save(); c.translate(x, y); c.scale(1, ry / rx); c.fillStyle = rg(c, 0, 0, 0, rx, [[0, `rgba(0,0,0,${a || .3})`], [1, 'rgba(0,0,0,0)']]); c.beginPath(); c.arc(0, 0, rx, 0, 7); c.fill(); c.restore(); }
  function txt(c, s, x, y, o) { o = o || {}; c.font = `${o.w || 700} ${o.size || 40}px ${o.ar ? AR : DS}`; c.textAlign = o.align || 'center'; c.textBaseline = 'middle'; c.direction = 'rtl'; if (o.stroke) { c.lineWidth = o.stroke; c.strokeStyle = o.sc || 'rgba(0,0,0,.55)'; c.strokeText(s, x, y); } c.fillStyle = o.color || '#fff'; c.fillText(s, x, y); c.direction = 'ltr'; }

  /* ---------------- shared scenery ---------------- */
  function sky(c, v, top, bot) { c.fillStyle = lg(c, 0, v.y0, 0, bot, [[0, top || '#5fb3f0'], [1, '#d7eefc']]); c.fillRect(v.x0, v.y0, v.x1 - v.x0, bot - v.y0); }
  function cloud(c, x, y, s) { c.fillStyle = 'rgba(255,255,255,.95)'; [[0, 0, 60], [55, -22, 52], [110, 0, 58], [55, 14, 60], [-50, 10, 40], [160, 14, 38]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(x + dx * s, y + dy * s, r * s, 0, 7); c.fill(); }); c.fillStyle = 'rgba(200,215,230,.5)'; c.beginPath(); c.ellipse(x + 55 * s, y + 40 * s, 150 * s, 18 * s, 0, 0, 7); c.fill(); }
  function clouds(c, v, t, y) { for (let k = 0; k < 4; k++) { const x = ((k * 520 + t * 12) % 2400) - 400; cloud(c, x, (y || 120) + (k % 2) * 60, .9 + (k % 3) * .2); } }
  function sun(c, x, y) { c.fillStyle = rg(c, x, y, 4, 70, [[0, 'rgba(255,255,240,1)'], [.3, 'rgba(255,250,210,.9)'], [1, 'rgba(255,250,210,0)']]); c.beginPath(); c.arc(x, y, 70, 0, 7); c.fill(); }
  function skyline(c, v, y, col) { c.fillStyle = col || '#b9c6d2'; for (let k = 0; k < 40; k++) { const x = v.x0 + k * 60 + R(k) * 30, h = 18 + R(k + 7) * 46, w = 30 + R(k + 3) * 40; c.fillRect(x, y - h, w, h); } }
  function palm(c, x, y, s, t) { c.strokeStyle = '#7a5531'; c.lineWidth = 12 * s; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 10 * s, y - 80 * s, x + 4 * s, y - 150 * s); c.stroke(); c.strokeStyle = 'rgba(60,35,15,.4)'; c.lineWidth = 2; for (let k = 0; k < 10; k++) { c.beginPath(); c.moveTo(x - 6 * s, y - k * 15 * s); c.lineTo(x + 8 * s, y - k * 15 * s - 3); c.stroke(); }
    const tx = x + 4 * s, ty = y - 150 * s; for (let k = 0; k < 8; k++) { const a = -Math.PI + k / 7 * Math.PI + Math.sin(t * 1.5 + k) * .04; c.strokeStyle = k % 2 ? '#2f7d32' : '#3f9a3b'; c.lineWidth = 9 * s; c.beginPath(); c.moveTo(tx, ty); c.quadraticCurveTo(tx + Math.cos(a) * 50 * s, ty + Math.sin(a) * 50 * s - 20 * s, tx + Math.cos(a) * 90 * s, ty + Math.sin(a) * 60 * s + 25 * s); c.stroke(); } }
  function bush(c, x, y, s, col) { c.fillStyle = col || '#3f8a3a'; [[0, 0, 22], [18, -8, 20], [36, 0, 22], [18, 6, 22]].forEach(([dx, dy, r]) => { c.beginPath(); c.arc(x + dx * s, y + dy * s, r * s, 0, 7); c.fill(); }); }
  function wheel(c, x, y, r, rot) { c.fillStyle = '#16181d'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); c.fillStyle = lg(c, x - r, y - r, x + r, y + r, [[0, '#eef1f4'], [1, '#7d858e']]); c.beginPath(); c.arc(x, y, r * .55, 0, 7); c.fill(); c.strokeStyle = '#59616a'; c.lineWidth = r * .1; for (let k = 0; k < 6; k++) { const a = rot + k * Math.PI / 3; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * r * .5, y + Math.sin(a) * r * .5); c.stroke(); } c.fillStyle = '#3b4148'; c.beginPath(); c.arc(x, y, r * .15, 0, 7); c.fill(); }
  function confetti(P, x, y, n) { for (let k = 0; k < (n || 40); k++) P.push({ x, y, vx: (Math.random() - .5) * 900, vy: -300 - Math.random() * 600, g: 1200, life: 1.6, age: 0, col: ['#f43f5e', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#fde047'][k % 6], r: 6 + Math.random() * 6, k: 'c', rot: Math.random() * 6 }); }
  function drawParts(c, P, dt) { for (let i = P.length - 1; i >= 0; i--) { const p = P[i]; p.age += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += (p.g || 0) * dt; if (p.age > p.life) { P.splice(i, 1); continue; } const f = 1 - p.age / p.life;
      if (p.k === 'c') { c.save(); c.translate(p.x, p.y); c.rotate(p.rot + p.age * 8); c.fillStyle = p.col; c.globalAlpha = Math.min(1, f * 2); c.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); c.restore(); }
      else if (p.k === 'dust') { c.fillStyle = `rgba(190,160,120,${f * .6})`; c.beginPath(); c.arc(p.x, p.y, p.r * (2 - f), 0, 7); c.fill(); }
      else if (p.k === 'txt') { c.globalAlpha = Math.min(1, f * 2.5); txt(c, p.s, p.x, p.y - (1 - f) * 40, { size: p.size || 90, color: p.col || '#fde047', stroke: 10 }); c.globalAlpha = 1; } } }
  const flash = (P, x, y, s, col) => P.push({ k: 'txt', s, x, y, vx: 0, vy: 0, life: 1.3, age: 0, col, size: 100 });

  /* ---------------- scenes ---------------- */
  const SC = {};

  /* 1) bus to school */
  SC.bus = { name: 'حافلة المدرسة', icon: '🚌', desc: 'أوصل الحافلة إلى المدرسة: كل إجابة صحيحة محطة جديدة.',
    init(S, n) { S.pos = 0; S.target = 0; S.n = n; S.shake = 0; },
    ok(S) { S.target++; }, miss(S) { S.shake = .8; },
    draw(c, v, S, t, dt) {
      sky(c, v, '#58aef0', 330); clouds(c, v, t, 110); sun(c, 1380, 120); skyline(c, v, 300, '#c7d2dc');
      c.fillStyle = '#e8dcc6'; c.fillRect(v.x0, 300, v.x1 - v.x0, 14);
      c.fillStyle = lg(c, 0, 314, 0, 420, [[0, '#72b043'], [1, '#4d8f2c']]); c.fillRect(v.x0, 314, v.x1 - v.x0, 106);
      c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 2; c.beginPath(); c.moveTo(v.x0, 318); c.lineTo(v.x1, 318); c.stroke(); for (let x = Math.floor(v.x0 / 40) * 40; x < v.x1; x += 40) { c.beginPath(); c.moveTo(x, 300); c.lineTo(x, 318); c.stroke(); }
      // school (finish) at left
      const sx = 90; c.fillStyle = '#e9dcc0'; c.fillRect(sx, 200, 260, 210); c.fillStyle = '#d8c8a6'; c.fillRect(sx + 90, 165, 80, 245); c.fillStyle = '#1f6f5c'; c.fillRect(sx, 200, 260, 10); c.fillRect(sx + 90, 165, 80, 8);
      for (let r = 0; r < 2; r++) for (let k = 0; k < 6; k++) { if (k === 2 || k === 3) continue; c.fillStyle = '#3d5a80'; c.fillRect(sx + 14 + k * 40, 230 + r * 70, 26, 40); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(sx + 14 + k * 40, 230 + r * 70, 26, 6); }
      c.fillStyle = '#2c4a3e'; c.fillRect(sx + 112, 330, 36, 80); c.fillStyle = '#3d5a80'; c.beginPath(); c.arc(sx + 130, 215, 20, Math.PI, 0); c.fill(); c.fillRect(sx + 110, 215, 40, 30);
      c.strokeStyle = '#555'; c.lineWidth = 4; c.beginPath(); c.moveTo(sx + 130, 165); c.lineTo(sx + 130, 105); c.stroke(); c.fillStyle = '#167a43'; const fw = Math.sin(t * 4) * 4; c.beginPath(); c.moveTo(sx + 132, 105); c.quadraticCurveTo(sx + 160, 100 + fw, sx + 190, 108); c.lineTo(sx + 190, 140); c.quadraticCurveTo(sx + 160, 132 + fw, sx + 132, 138); c.fill(); c.fillStyle = '#fff'; c.fillRect(sx + 150, 117, 22, 10);
      // road
      c.fillStyle = '#d9d4cc'; c.fillRect(v.x0, 420, v.x1 - v.x0, 10); c.fillStyle = lg(c, 0, 430, 0, 560, [[0, '#5d6268'], [1, '#474b50']]); c.fillRect(v.x0, 430, v.x1 - v.x0, 130);
      c.fillStyle = 'rgba(255,255,255,.9)'; for (let x = Math.floor(v.x0 / 160) * 160; x < v.x1; x += 160) c.fillRect(x, 495, 80, 6); c.fillStyle = '#e3ded6'; c.fillRect(v.x0, 560, v.x1 - v.x0, v.y1 - 560);
      // stations
      const st = k => lerp(1450, 420, k / Math.max(1, S.n));
      for (let k = 1; k <= S.n; k++) { const x = st(k), done = k <= S.target; c.strokeStyle = '#8a8f96'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, 420); c.lineTo(x, 380); c.stroke(); c.fillStyle = done ? rg(c, x - 6, 352, 2, 26, [[0, '#ffffff'], [1, '#3b82f6']]) : rg(c, x - 6, 352, 2, 26, [[0, '#ffffff'], [1, '#cbd5e1']]); c.beginPath(); c.arc(x, 360, 24, 0, 7); c.fill(); c.strokeStyle = '#9aa3ad'; c.lineWidth = 3; c.stroke(); c.fillStyle = '#e5f0e1'; rr(c, x - 16, 388, 32, 18, 3); c.fill(); txt(c, '🚌', x, 397, { size: 14 }); }
      [[560, '#4d8f2c'], [980, '#5a9a36'], [1240, '#4d8f2c']].forEach(([x, col]) => bush(c, x, 405, 1, col)); palm(c, 760, 420, .9, t); palm(c, 1560, 420, .9, t);
      // bus
      S.pos += (S.target - S.pos) * Math.min(1, dt * 1.6); const bx = st(S.pos), moving = Math.abs(S.target - S.pos) > .01; S.shake = Math.max(0, S.shake - dt);
      const sh = S.shake ? Math.sin(t * 60) * 4 : 0, by = 530 + (moving ? Math.sin(t * 20) * 1.5 : 0);
      bus(c, bx - 170 + sh, by, 340, (S.wr = (S.wr || 0) + (moving ? dt * 10 : 0)));
      if (S.target >= S.n && S.n) txt(c, 'وصلت إلى المدرسة!', 800, 70, { size: 54, color: '#fde047', stroke: 10 });
    } };
  function bus(c, x, y, w, rot) { const h = w * .36; shadow(c, x + w / 2, y + 2, w * .55, 10, .4);
    c.fillStyle = lg(c, 0, y - h, 0, y, [[0, '#ffd23a'], [.6, '#f2b705'], [1, '#c98c00']]); rr(c, x, y - h, w, h * .86, 14); c.fill();
    c.fillStyle = '#1f4fb8'; c.fillRect(x + 4, y - h * .42, w - 8, h * .1); c.fillStyle = '#222'; c.fillRect(x, y - h * .2, w, h * .08);
    c.fillStyle = '#1f2937'; for (let k = 0; k < 7; k++) { rr(c, x + 70 + k * 36, y - h * .88, 30, h * .34, 4); c.fill(); } c.fillStyle = 'rgba(190,225,250,.55)'; for (let k = 0; k < 7; k++) c.fillRect(x + 72 + k * 36, y - h * .86, 26, h * .1);
    c.fillStyle = '#1f2937'; rr(c, x + 6, y - h * .9, 52, h * .5, 6); c.fill(); c.fillStyle = 'rgba(190,225,250,.6)'; rr(c, x + 10, y - h * .86, 44, h * .25, 4); c.fill();
    c.fillStyle = '#ff5a36'; c.fillRect(x - 4, y - h * .28, 10, 10); c.fillStyle = '#fff6b0'; c.fillRect(x - 4, y - h * .48, 8, 14);
    c.fillStyle = '#c0392b'; c.beginPath(); c.arc(x + w - 14, y - h * .55, 9, 0, 7); c.fill();
    wheel(c, x + w * .2, y - 4, h * .22, -rot); wheel(c, x + w * .8, y - 4, h * .22, -rot); }

  /* 2) bowling */
  SC.bowl = { name: 'البولينج', icon: '🎳', desc: 'أسقط القوارير بإجابتك الصحيحة!',
    init(S) { S.a = null; S.pins = pinSet(); },
    ok(S, t) { S.a = { k: 'ok', t0: t }; }, miss(S, t) { S.a = { k: 'miss', t0: t, side: Math.random() < .5 ? -1 : 1 }; },
    draw(c, v, S, t, dt, P) {
      c.fillStyle = lg(c, 0, v.y0, 0, 300, [[0, '#2a1f1a'], [1, '#4a3328']]); c.fillRect(v.x0, v.y0, v.x1 - v.x0, v.y1 - v.y0);
      c.fillStyle = '#18120f'; c.fillRect(v.x0, v.y0, v.x1 - v.x0, 140); for (let k = 0; k < 12; k++) { c.fillStyle = k % 2 ? '#2d241f' : '#352a24'; c.fillRect(v.x0 + k * 160, 140, 160, 140); }
      c.fillStyle = 'rgba(80,120,200,.25)'; c.fillRect(1250, 140, 400, 420);
      // lane perspective
      const L = (y, side) => { const k = (y - 250) / (560 - 250); return 800 + side * lerp(230, 640, k); };
      c.fillStyle = lg(c, 0, 250, 0, 600, [[0, '#d9b07a'], [1, '#e8c493']]); c.beginPath(); c.moveTo(L(250, -1), 250); c.lineTo(L(250, 1), 250); c.lineTo(L(600, 1) + 60, 600); c.lineTo(L(600, -1) - 60, 600); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(150,100,50,.25)'; c.lineWidth = 1.5; for (let k = -12; k <= 12; k++) { c.beginPath(); c.moveTo(800 + k * 19, 250); c.lineTo(800 + k * 56, 600); c.stroke(); }
      [-1, 1].forEach(sd => { c.fillStyle = lg(c, 0, 250, 0, 600, [[0, '#6f7780'], [1, '#aab3bb']]); c.beginPath(); c.moveTo(L(250, sd), 250); c.lineTo(L(250, sd) + sd * 70, 250); c.lineTo(L(600, sd) + sd * 260, 600); c.lineTo(L(600, sd) + sd * 60, 600); c.closePath(); c.fill(); });
      c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.moveTo(780, 330); c.lineTo(820, 330); c.lineTo(850, 520); c.lineTo(750, 520); c.closePath(); c.fill();
      for (let k = -2; k <= 2; k++) { c.fillStyle = '#7b4f2a'; c.beginPath(); c.moveTo(800 + k * 40, 460); c.lineTo(806 + k * 40, 476); c.lineTo(794 + k * 40, 476); c.closePath(); c.fill(); }
      // pins
      const a = S.a, ta = a ? t - a.t0 : 0, hitT = 1.0;
      const pins = S.pins.slice().sort((p, q) => p.y - q.y);
      pins.forEach(p => { let x = p.x, y = p.y, rot = 0, al = 1; if (a && a.k === 'ok' && ta > hitT) { const f = Math.min(1, (ta - hitT) / .8); x += p.vx * f * 120; y -= Math.sin(f * Math.PI) * 50 * p.up; rot = p.vx * f * 1.6; al = 1 - Math.max(0, (ta - hitT - 1.2)); } if (al > 0) { c.globalAlpha = clamp(al, 0, 1); pin(c, x, y, p.s, rot); c.globalAlpha = 1; } });
      // ball
      let bx = 800, by = 545, br = 56;
      if (a) { const f = clamp(ta / hitT, 0, 1); const e = f; by = lerp(545, 268, e); br = lerp(56, 20, e); bx = a.k === 'ok' ? 800 + Math.sin(e * 3) * 30 * (1 - e) : 800 + a.side * e * e * 300; if (ta > hitT) { br = 0; } }
      if (br > 0) { shadow(c, bx, by + br * .9, br, br * .25, .35); c.save(); c.translate(bx, by); c.fillStyle = rg(c, -br * .35, -br * .4, br * .1, br * 1.1, [[0, '#9ac7ff'], [.5, '#2d5fc4'], [1, '#0b2259']]); c.beginPath(); c.arc(0, 0, br, 0, 7); c.fill(); c.strokeStyle = 'rgba(255,255,255,.25)'; c.lineWidth = br * .08; c.beginPath(); c.arc(br * .1, 0, br * .7, 1, 3); c.stroke(); c.fillStyle = '#0a1a40'; [[-.2, -.3], [.1, -.35], [-.05, -.1]].forEach(([dx, dy]) => { c.beginPath(); c.arc(dx * br, dy * br, br * .09, 0, 7); c.fill(); }); c.fillStyle = 'rgba(255,255,255,.6)'; c.beginPath(); c.ellipse(-br * .4, -br * .45, br * .2, br * .12, -.6, 0, 7); c.fill(); c.restore(); }
      if (a && !a.done && ta > hitT) { a.done = 1; if (a.k === 'ok') { flash(P, 800, 200, 'ضربة كاملة!'); confetti(P, 800, 260, 50); } else flash(P, 800, 200, 'إلى القناة!', '#fca5a5'); }
      if (a && ta > 3.2) { S.a = null; S.pins = pinSet(); }
    } };
  function pinSet() { const P = []; const rows = [[0], [-1, 1], [-2, 0, 2], [-3, -1, 1, 3]]; rows.forEach((r, i) => r.forEach(k => P.push({ x: 800 + k * 22 * (1 - i * .05), y: 262 - i * 10, s: 1 - i * .06, vx: (k || (Math.random() - .5)) * (.6 + Math.random() * .6), up: .5 + Math.random() }))); return P; }
  function pin(c, x, y, s, rot) { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s * .9, s * .9); const p = () => { c.beginPath(); c.moveTo(0, -78); c.bezierCurveTo(10, -78, 11, -60, 7, -50); c.bezierCurveTo(4, -40, 18, -24, 18, 0); c.bezierCurveTo(18, 12, 10, 16, 0, 16); c.bezierCurveTo(-10, 16, -18, 12, -18, 0); c.bezierCurveTo(-18, -24, -4, -40, -7, -50); c.bezierCurveTo(-11, -60, -10, -78, 0, -78); };
    p(); c.fillStyle = lg(c, -18, 0, 18, 0, [[0, '#cfd3d6'], [.4, '#ffffff'], [1, '#b9bec2']]); c.fill(); c.fillStyle = '#c0262d'; c.fillRect(-8, -50, 16, 4); c.fillRect(-8.5, -44, 17, 4); c.restore(); }

  /* 3) basketball */
  SC.ball = { name: 'كرة السلة', icon: '🏀', desc: 'سدّد في السلة مع كل إجابة صحيحة.',
    init(S) { S.a = null; S.net = 0; },
    ok(S, t) { S.a = { k: 'ok', t0: t }; }, miss(S, t) { S.a = { k: 'miss', t0: t }; },
    draw(c, v, S, t, dt, P) {
      c.fillStyle = lg(c, 0, v.y0, 0, 420, [[0, '#d8dadc'], [1, '#c4c7ca']]); c.fillRect(v.x0, v.y0, v.x1 - v.x0, 420 - v.y0);
      c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 2; for (let y = 10; y < 420; y += 34) { c.beginPath(); c.moveTo(v.x0, y); c.lineTo(v.x1, y); c.stroke(); }
      const seats = (x0, col) => { for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) { const x = x0 + k * 70 + (k > 2 ? 50 : 0) - r * 8, y = 240 + r * 52; c.fillStyle = mix(col, '#000000', .3); rr(c, x, y + 26, 58, 12, 3); c.fill(); c.fillStyle = lg(c, 0, y, 0, y + 30, [[0, mix(col, '#ffffff', .2)], [1, col]]); rr(c, x, y, 58, 30, 6); c.fill(); } c.fillStyle = '#e5e7eb'; c.fillRect(x0 - 30, 400, 520, 8); };
      seats(130, '#c73a32'); seats(1030, '#2f62c8');
      c.fillStyle = '#334155'; c.fillRect(620, 160, 360, 260); c.fillStyle = '#2b3a4f'; for (let k = 0; k < 4; k++) c.fillRect(640 + k * 85, 300, 70, 120);
      // backboard & hoop
      c.fillStyle = 'rgba(255,255,255,.92)'; rr(c, 650, 40, 300, 190, 8); c.fill(); c.strokeStyle = '#1f2937'; c.lineWidth = 6; c.strokeRect(655, 45, 290, 180); c.strokeStyle = '#ef4444'; c.lineWidth = 5; c.strokeRect(750, 120, 100, 80);
      c.fillStyle = '#1f2937'; c.fillRect(780, 228, 40, 14);
      const rimY = 250, net = S.net = Math.max(0, S.net - dt * 2);
      c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 2.5; for (let k = 0; k <= 8; k++) { const x0 = 740 + k * 15, x1 = 760 + k * 10; c.beginPath(); c.moveTo(x0, rimY); c.quadraticCurveTo((x0 + x1) / 2 + Math.sin(t * 20) * net * 6, rimY + 40, x1, rimY + 70 + net * 10); c.stroke(); } for (let r = 1; r < 4; r++) { c.beginPath(); c.moveTo(742 + r * 5, rimY + r * 18); c.lineTo(858 - r * 5, rimY + r * 18); c.stroke(); }
      // floor
      c.fillStyle = lg(c, 0, 420, 0, 600, [[0, '#c7965a'], [1, '#e0b47a']]); c.fillRect(v.x0, 420, v.x1 - v.x0, v.y1 - 420); c.strokeStyle = 'rgba(120,80,40,.25)'; c.lineWidth = 1.5; for (let k = -30; k < 30; k++) { c.beginPath(); c.moveTo(800 + k * 40, 420); c.lineTo(800 + k * 120, 700); c.stroke(); }
      c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 6; c.beginPath(); c.ellipse(800, 470, 330, 40, 0, 0, Math.PI); c.stroke(); c.beginPath(); c.moveTo(v.x0, 430); c.lineTo(v.x1, 430); c.stroke();
      // ball path
      const a = S.a, ta = a ? t - a.t0 : 0; let bx = 1180, by = 520, br = 46;
      if (a) { const T = 1.1, f = clamp(ta / T, 0, 1); const tx = a.k === 'ok' ? 800 : 862, ty = rimY - 8; bx = lerp(1180, tx, f); by = lerp(520, ty, f) - Math.sin(f * Math.PI) * 330; br = lerp(46, 30, f);
        if (ta > T) { const g = ta - T; if (a.k === 'ok') { bx = 800; by = ty + g * 420; if (!a.done) { a.done = 1; S.net = 1; flash(P, 800, 250, 'سلة!'); confetti(P, 800, 250, 40); } } else { bx = 862 + g * 380; by = ty - 160 * g + 600 * g * g; if (!a.done) { a.done = 1; flash(P, 800, 250, 'ارتطمت بالحلقة!', '#fca5a5'); } } }
        if (ta > 2.6) S.a = null; }
      shadow(c, a ? bx : 1180, 560, 40, 9, .3);
      const drawBall = () => { c.save(); c.translate(bx, by); c.rotate(t * (a ? 8 : 0)); c.fillStyle = rg(c, -br * .35, -br * .4, br * .1, br * 1.1, [[0, '#ffb26b'], [.6, '#e0661f'], [1, '#8a3510']]); c.beginPath(); c.arc(0, 0, br, 0, 7); c.fill(); c.strokeStyle = '#3b1a08'; c.lineWidth = br * .07; c.beginPath(); c.moveTo(-br, 0); c.lineTo(br, 0); c.stroke(); c.beginPath(); c.moveTo(0, -br); c.lineTo(0, br); c.stroke(); c.beginPath(); c.arc(-br * 1.25, 0, br * .95, -.9, .9); c.stroke(); c.beginPath(); c.arc(br * 1.25, 0, br * .95, Math.PI - .9, Math.PI + .9); c.stroke(); c.restore(); };
      const behind = a && ta > 1.1 && a.k === 'ok' && by < rimY + 60;
      if (!behind) drawBall();
      c.strokeStyle = '#e4561b'; c.lineWidth = 8; c.beginPath(); c.ellipse(800, rimY, 62, 12, 0, 0, 7); c.stroke();
      if (behind) drawBall();
      if (!a) { c.strokeStyle = 'rgba(59,130,246,.8)'; c.lineWidth = 6; c.beginPath(); c.ellipse(1180, 566, 70, 16, 0, 0, 7); c.stroke(); }
    } };

  /* 4) penalty kick */
  SC.goal = { name: 'ركلات الترجيح', icon: '⚽', desc: 'سجّل هدفًا مع كل إجابة صحيحة.',
    init(S) { S.a = null; },
    ok(S, t) { S.a = { k: 'ok', t0: t, side: Math.random() < .5 ? -1 : 1 }; }, miss(S, t) { S.a = { k: 'miss', t0: t, side: Math.random() < .5 ? -1 : 1 }; },
    draw(c, v, S, t, dt, P) {
      c.fillStyle = lg(c, 0, v.y0, 0, 200, [[0, '#f6a35b'], [1, '#ffd9a8']]); c.fillRect(v.x0, v.y0, v.x1 - v.x0, 200 - v.y0);
      for (const [x0, col] of [[v.x0, '#d9472b'], [1000, '#3a7bd5']]) { for (let r = 0; r < 9; r++) for (let k = 0; k < 40; k++) { const x = x0 + k * 18 + (r % 2) * 9, y = 120 + r * 16; if (x > (x0 === v.x0 ? 640 : v.x1)) continue; c.fillStyle = mix(col, r % 3 ? '#000000' : '#ffffff', .15 + R(r * 40 + k) * .2); c.fillRect(x, y, 14, 10); } }
      c.strokeStyle = '#9aa3ad'; c.lineWidth = 5; [150, 1450].forEach(x => { c.beginPath(); c.moveTo(x, 260); c.lineTo(x, 10); c.stroke(); for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(x - 30, 30 + k * 36); c.lineTo(x + 30, 50 + k * 36); c.stroke(); } c.fillStyle = '#e5e7eb'; c.fillRect(x - 50, 0, 100, 26); });
      const ads = ['#22c55e', '#38bdf8', '#f43f5e', '#f59e0b', '#a855f7', '#22c55e', '#38bdf8']; ads.forEach((col, k) => { c.fillStyle = col; c.fillRect(v.x0 + k * 260, 268, 260, 50); c.fillStyle = 'rgba(255,255,255,.55)'; for (let j = 0; j < 6; j++) c.fillRect(v.x0 + k * 260 + 20 + j * 40, 286, 24, 14); });
      c.fillStyle = lg(c, 0, 318, 0, 620, [[0, '#3f8f35'], [1, '#5fb24a']]); c.fillRect(v.x0, 318, v.x1 - v.x0, v.y1 - 318); for (let k = 0; k < 8; k++) { c.fillStyle = k % 2 ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.04)'; c.fillRect(v.x0, 318 + k * 40, v.x1 - v.x0, 40); }
      c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 5; c.beginPath(); c.moveTo(v.x0, 420); c.lineTo(v.x1, 420); c.stroke(); c.beginPath(); c.moveTo(520, 420); c.lineTo(420, 500); c.lineTo(1180, 500); c.lineTo(1080, 420); c.stroke();
      // goal
      const GL = 560, GR = 1040, GT = 200, GB = 420, a = S.a, ta = a ? t - a.t0 : 0, rip = a && a.k === 'ok' && ta > .55 ? Math.max(0, 1 - (ta - .55)) : 0;
      c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 1.5; for (let x = GL; x <= GR; x += 16) { c.beginPath(); c.moveTo(x, GT); c.lineTo(x + (x - 800) * .06, GB + Math.sin(x * .1 + t * 20) * rip * 8); c.stroke(); } for (let y = GT; y <= GB; y += 16) { c.beginPath(); c.moveTo(GL, y); c.lineTo(GR, y); c.stroke(); }
      c.strokeStyle = '#f8fafc'; c.lineWidth = 12; c.beginPath(); c.moveTo(GL, GB); c.lineTo(GL, GT); c.lineTo(GR, GT); c.lineTo(GR, GB); c.stroke();
      // keeper
      let kx = 800, kr = 0, ky = 0; if (a) { const f = clamp((ta - .25) / .4, 0, 1), dir = a.k === 'ok' ? -a.side : a.side; kx = 800 + dir * f * 170; kr = dir * f * 1.1; ky = -Math.sin(f * Math.PI) * 30; }
      c.save(); c.translate(kx, 410 + ky); c.rotate(kr); c.fillStyle = '#facc15'; rr(c, -26, -110, 52, 64, 10); c.fill(); c.strokeStyle = '#facc15'; c.lineWidth = 14; c.beginPath(); c.moveTo(-24, -100); c.lineTo(-60, -140 + (a ? 0 : Math.sin(t * 3) * 6)); c.moveTo(24, -100); c.lineTo(60, -140 + (a ? 0 : Math.sin(t * 3) * 6)); c.stroke(); c.fillStyle = '#e5e7eb'; [-60, 60].forEach(x => { c.beginPath(); c.arc(x, -140, 10, 0, 7); c.fill(); }); c.strokeStyle = '#111827'; c.lineWidth = 14; c.beginPath(); c.moveTo(-12, -46); c.lineTo(-18, 0); c.moveTo(12, -46); c.lineTo(18, 0); c.stroke(); c.fillStyle = '#d9a066'; c.beginPath(); c.arc(0, -130, 18, 0, 7); c.fill(); c.restore();
      // ball
      let bx = 800, by = 560, br = 46; if (a) { const f = clamp(ta / .55, 0, 1); const tx = a.k === 'ok' ? 800 + a.side * 200 : 800 + a.side * 165, ty = a.k === 'ok' ? 250 : 300; bx = lerp(800, tx, f); by = lerp(560, ty, f) - Math.sin(f * Math.PI) * 40; br = lerp(46, 20, f); if (ta > .55 && a.k === 'miss') { const g = ta - .55; bx = tx + a.side * -g * 60; by = ty + g * 300; }
        if (ta > .6 && !a.done) { a.done = 1; if (a.k === 'ok') { flash(P, 800, 250, 'هدف!'); confetti(P, 800, 200, 60); } else flash(P, 800, 250, 'تصدّى الحارس!', '#fca5a5'); } if (ta > 2.6) S.a = null; }
      shadow(c, bx, a ? by + br : 600, br, br * .25, .35); c.save(); c.translate(bx, by); c.rotate(a ? ta * 12 : 0); c.fillStyle = rg(c, -br * .3, -br * .35, br * .1, br * 1.1, [[0, '#ffffff'], [.7, '#e5e7eb'], [1, '#9ca3af']]); c.beginPath(); c.arc(0, 0, br, 0, 7); c.fill(); c.fillStyle = '#111827'; const pent = (x, y, r) => { c.beginPath(); for (let k = 0; k < 5; k++) { const an = k / 5 * 6.283 - 1.57; c.lineTo(x + Math.cos(an) * r, y + Math.sin(an) * r); } c.fill(); }; pent(0, 0, br * .3); [0, 1, 2, 3, 4].forEach(k => { const an = k / 5 * 6.283 - 1.57; pent(Math.cos(an) * br * .78, Math.sin(an) * br * .78, br * .22); }); c.restore();
    } };

  /* 5) tower crane */
  SC.crane = { name: 'رافعة البناء', icon: '🏗', desc: 'ابنِ البرج طابقًا فوق طابق.',
    init(S) { S.floors = 0; S.a = null; },
    ok(S, t) { S.a = { k: 'ok', t0: t }; }, miss(S, t) { S.a = { k: 'miss', t0: t }; },
    draw(c, v, S, t, dt, P) {
      sky(c, v, '#5aa8ec', 470); clouds(c, v, t, 130); sun(c, 1380, 140); skyline(c, v, 455, '#b8c3cd');
      c.fillStyle = lg(c, 0, 470, 0, 620, [[0, '#e9d6b2'], [1, '#d6bd92']]); c.fillRect(v.x0, 470, v.x1 - v.x0, v.y1 - 470);
      c.strokeStyle = '#9ca3af'; c.lineWidth = 2; c.beginPath(); c.moveTo(v.x0, 470); c.lineTo(v.x1, 470); c.stroke(); for (let x = Math.floor(v.x0 / 30) * 30; x < v.x1; x += 30) { c.strokeStyle = 'rgba(120,120,120,.5)'; c.beginPath(); c.moveTo(x, 440); c.lineTo(x, 472); c.stroke(); } c.fillStyle = 'rgba(200,200,200,.5)'; c.fillRect(v.x0, 440, v.x1 - v.x0, 4);
      // building
      const BX = 960, BW = 300, FH = 44, base = 560; c.fillStyle = '#9ca3af'; c.fillRect(BX - 20, base, BW + 40, 16);
      for (let k = 0; k < S.floors; k++) floor(c, BX, base - (k + 1) * FH, BW, FH, k);
      // crane
      const CX = 520, top = 70; c.fillStyle = '#9ca3af'; c.fillRect(CX - 60, base - 10, 120, 26); latt(c, CX - 22, top + 40, 44, base - top - 50, true);
      c.fillStyle = '#f2b705'; c.fillRect(CX - 300, top + 20, 820, 18); latt(c, CX - 300, top + 20, 820, 18, false); c.fillStyle = '#6b7280'; c.fillRect(CX - 300, top + 38, 90, 40);
      c.fillStyle = '#e5e7eb'; rr(c, CX - 36, top + 40, 52, 42, 5); c.fill(); c.fillStyle = 'rgba(80,140,200,.7)'; c.fillRect(CX - 30, top + 46, 30, 22);
      c.strokeStyle = '#555'; c.lineWidth = 2; c.beginPath(); c.moveTo(CX, top - 30); c.lineTo(CX - 300, top + 22); c.moveTo(CX, top - 30); c.lineTo(CX + 500, top + 22); c.stroke(); c.fillStyle = '#f2b705'; c.fillRect(CX - 8, top - 32, 16, 52);
      // hook & block animation
      const a = S.a, ta = a ? t - a.t0 : 0; const targetY = base - (S.floors + 1) * FH; let hx = 700, hy = 300, carry = true, swing = 0;
      if (a) { const f1 = clamp(ta / 1, 0, 1), f2 = clamp((ta - 1) / .8, 0, 1); hx = lerp(700, BX + BW / 2, ease(f1)); if (a.k === 'ok') { hy = lerp(300, targetY - 10, ease(f2)); if (ta > 1.8 && !a.done) { a.done = 1; S.floors++; flash(P, 800, 250, 'طابق جديد!'); confetti(P, BX + BW / 2, targetY, 30); } if (ta > 1.8) { carry = false; hy = lerp(targetY - 10, 300, clamp((ta - 1.8) / .8, 0, 1)); hx = lerp(BX + BW / 2, 700, clamp((ta - 1.8) / .8, 0, 1)); } }
        else { swing = Math.sin(ta * 9) * clamp(ta, 0, 1) * .5; if (ta > 1.2) { carry = false; if (!a.done) { a.done = 1; flash(P, 800, 250, 'سقطت الكتلة!', '#fca5a5'); for (let k = 0; k < 18; k++) P.push({ k: 'dust', x: hx, y: 540, vx: (Math.random() - .5) * 300, vy: -Math.random() * 120, g: 200, life: 1.2, age: 0, r: 14 }); } } }
        if (ta > 2.8) S.a = null; }
      c.strokeStyle = '#374151'; c.lineWidth = 3; c.beginPath(); c.moveTo(hx, top + 38); c.lineTo(hx + Math.sin(swing) * (hy - top), hy); c.stroke(); const hxx = hx + Math.sin(swing) * (hy - top);
      c.fillStyle = '#f2b705'; c.fillRect(hx - 12, top + 36, 24, 10); c.fillStyle = '#374151'; c.beginPath(); c.arc(hxx, hy + 8, 9, 0, Math.PI); c.lineWidth = 4; c.stroke();
      if (carry) { c.save(); c.translate(hxx, hy + 18); c.rotate(swing); floor(c, -BW / 2, 0, BW, FH, S.floors); c.restore(); }
      else if (a && a.k === 'miss') { const g = ta - 1.2; c.save(); c.translate(hxx, Math.min(540 - FH, hy + 18 + 500 * g * g)); c.rotate(swing + g * 2); c.globalAlpha = clamp(2 - g, 0, 1); floor(c, -BW / 2, 0, BW, FH, S.floors); c.restore(); }
      c.fillStyle = '#f97316'; [740, 820, 900].forEach(x => { c.beginPath(); c.moveTo(x, 575); c.lineTo(x + 8, 553); c.lineTo(x + 16, 575); c.closePath(); c.fill(); });
      txt(c, 'الطوابق: ' + AD(S.floors), BX + BW / 2, base + 40, { size: 26, color: '#1f2937', stroke: 0 });
    } };
  function latt(c, x, y, w, h, vert) { c.strokeStyle = '#d99a00'; c.lineWidth = 3; c.strokeRect(x, y, w, h); c.beginPath(); if (vert) { for (let yy = y; yy < y + h; yy += w) { c.moveTo(x, yy); c.lineTo(x + w, yy + w); c.moveTo(x + w, yy); c.lineTo(x, yy + w); } } else { for (let xx = x; xx < x + w; xx += h) { c.moveTo(xx, y); c.lineTo(xx + h, y + h); } } c.stroke(); if (vert) { c.fillStyle = 'rgba(242,183,5,.35)'; c.fillRect(x, y, w, h); } }
  function floor(c, x, y, w, h, k) { c.fillStyle = lg(c, 0, y, 0, y + h, [[0, '#e5e7eb'], [1, '#b8bec5']]); c.fillRect(x, y, w, h); c.fillStyle = '#9ca3af'; c.fillRect(x, y + h - 6, w, 6); for (let j = 0; j < 6; j++) { c.fillStyle = (k + j) % 3 ? '#4b6a8c' : '#5f82a8'; c.fillRect(x + 14 + j * 47, y + 8, 32, h - 18); c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(x + 14 + j * 47, y + 8, 32, 5); } }

  /* 6) car race */
  SC.race = { name: 'سباق السيارات', icon: '🏎', desc: 'سيارتك تتقدّم مع كل إجابة صحيحة… سابق الخصم!',
    init(S, n) { S.n = n; S.p = [0, 0]; S.d = [0, 0]; S.rot = 0; },
    ok(S) { }, miss(S) { }, sync(S, sc) { S.p = sc; },
    draw(c, v, S, t, dt, P, game) {
      sky(c, v, '#6bb8ef', 300); clouds(c, v, t * .5, 100);
      c.fillStyle = '#b9a98e'; c.beginPath(); c.moveTo(v.x0, 300); for (let x = v.x0; x <= v.x1; x += 20) c.lineTo(x, 255 + Math.sin(x * .01) * 20 + Math.sin(x * .023) * 12); c.lineTo(v.x1, 300); c.fill();
      c.fillStyle = '#e8d5aa'; c.fillRect(v.x0, 300, v.x1 - v.x0, 40); c.fillStyle = '#6bb04a'; c.fillRect(v.x0, 330, v.x1 - v.x0, 24);
      const finish = 230, start = 1420, X = k => lerp(start, finish, k / Math.max(1, S.n));
      for (let k = 0; k < 12; k++) palm(c, v.x0 + k * 170 + 40, 342, .7, t);
      c.fillStyle = '#d6d3cd'; c.fillRect(v.x0, 352, v.x1 - v.x0, 10); c.fillStyle = lg(c, 0, 362, 0, 590, [[0, '#55595e'], [1, '#3e4146']]); c.fillRect(v.x0, 362, v.x1 - v.x0, 228); c.fillStyle = '#d6d3cd'; c.fillRect(v.x0, 590, v.x1 - v.x0, v.y1 - 590);
      c.fillStyle = 'rgba(255,255,255,.85)'; for (let x = Math.floor(v.x0 / 140) * 140; x < v.x1; x += 140) c.fillRect(x, 474, 70, 6); c.fillStyle = '#facc15'; c.fillRect(v.x0, 366, v.x1 - v.x0, 4);
      for (let k = 0; k < 12; k++) { c.fillStyle = k % 2 ? '#111' : '#fff'; c.fillRect(finish - 14, 362 + k * 19, 14, 19); c.fillStyle = k % 2 ? '#fff' : '#111'; c.fillRect(finish, 362 + k * 19, 14, 19); }
      txt(c, 'خط النهاية', finish, 340, { size: 22, color: '#111827' });
      for (let i = 0; i < 2; i++) { S.d[i] += (S.p[i] - S.d[i]) * Math.min(1, dt * 1.8); }
      S.rot += dt * 6;
      const names = game.names; [[1, 440, '#2f62c8'], [0, 560, '#d62f2f']].forEach(([i, y, col]) => { const x = X(S.d[i]); racecar(c, x - 110, y, 220, col, S.rot * (1 + Math.abs(S.p[i] - S.d[i]) * 3)); txt(c, names[i], x, y - 100, { size: 24, color: '#fff', stroke: 6 }); });
    } };
  function racecar(c, x, y, w, col, rot) { const h = w * .28; shadow(c, x + w / 2, y + 2, w * .55, 9, .4);
    c.beginPath(); c.moveTo(x + w, y - h * .3); c.lineTo(x + w * .97, y - h * .62); c.quadraticCurveTo(x + w * .78, y - h * .7, x + w * .66, y - h * .72); c.quadraticCurveTo(x + w * .55, y - h * 1.2, x + w * .38, y - h * 1.18); c.lineTo(x + w * .25, y - h * 1.1); c.quadraticCurveTo(x + w * .16, y - h * .82, x + w * .05, y - h * .78); c.lineTo(x, y - h * .5); c.lineTo(x, y - h * .2); c.quadraticCurveTo(x, y - h * .08, x + w * .05, y - h * .08); c.lineTo(x + w * .95, y - h * .08); c.quadraticCurveTo(x + w, y - h * .1, x + w, y - h * .3); c.closePath();
    c.fillStyle = lg(c, 0, y - h * 1.2, 0, y, [[0, mix(col, '#ffffff', .4)], [.5, col], [1, mix(col, '#000000', .45)]]); c.fill();
    c.fillStyle = 'rgba(20,30,45,.85)'; c.beginPath(); c.moveTo(x + w * .62, y - h * .74); c.quadraticCurveTo(x + w * .53, y - h * 1.08, x + w * .4, y - h * 1.07); c.lineTo(x + w * .3, y - h * 1.02); c.quadraticCurveTo(x + w * .24, y - h * .86, x + w * .2, y - h * .76); c.closePath(); c.fill(); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(x + w * .08, y - h * .6, w * .84, 3);
    c.fillStyle = '#ff3b3b'; c.fillRect(x + w * .965, y - h * .58, w * .03, h * .14); c.fillStyle = '#fff3b0'; c.fillRect(x, y - h * .56, w * .03, h * .12);
    wheel(c, x + w * .22, y - h * .1, h * .3, -rot); wheel(c, x + w * .8, y - h * .1, h * .3, -rot); }

  const ORDER = ['race', 'bus', 'goal', 'ball', 'bowl', 'crane'];

  /* ---------------- game state & UI ---------------- */
  const css = `@font-face{font-family:'IBM Plex Sans Arabic';font-weight:400;src:url(../fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2) format('woff2')}
@font-face{font-family:'IBM Plex Sans Arabic';font-weight:600;src:url(../fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2) format('woff2')}
@font-face{font-family:'Readex Pro';font-weight:600;src:url(../fonts/readex-pro-arabic-600.woff2) format('woff2');unicode-range:U+0600-06FF,U+FE70-FEFF}
@font-face{font-family:'Readex Pro';font-weight:700;src:url(../fonts/readex-pro-arabic-700.woff2) format('woff2');unicode-range:U+0600-06FF,U+FE70-FEFF}
@font-face{font-family:'Readex Pro';font-weight:700;src:url(../fonts/readex-pro-latin-700.woff2) format('woff2');unicode-range:U+0000-00FF}
*{box-sizing:border-box;margin:0}html,body{height:100%;overflow:hidden;background:#0b1220}body{font-family:'IBM Plex Sans Arabic',Tahoma,sans-serif;font-weight:600;color:#0f172a;-webkit-tap-highlight-color:transparent;user-select:none}
button{font:inherit;font-family:'Readex Pro','IBM Plex Sans Arabic',Tahoma,sans-serif;cursor:pointer;border:0}
#ar{position:fixed;inset:0;display:flex;flex-direction:column}
#stage{position:relative;flex:1 1 0;min-height:0;overflow:hidden}#stage canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.hud{position:absolute;inset:0;pointer-events:none;font-size:clamp(11px,1.6vmin + .3vw,20px)}
.hud .box{position:absolute;top:2%;background:rgba(15,23,42,.88);color:#fff;border:2px solid rgba(255,255,255,.85);border-radius:14px;padding:.35em .8em;text-align:center;box-shadow:0 4px 14px rgba(0,0,0,.35)}
.hud .qn{right:1.2%;min-width:6.5em}.hud .qn small{display:block;height:4px;border-radius:3px;background:rgba(255,255,255,.25);margin-top:.3em;overflow:hidden}.hud .qn small i{display:block;height:100%;background:#22c55e;width:0;transition:width .4s}
.hud .pts{left:1.2%;min-width:5.5em}.hud .pts b{font-family:'Readex Pro',sans-serif;font-size:1.35em;color:#fde047;display:block;line-height:1.1}
.hud .vs{right:50%;transform:translateX(50%);display:flex;gap:1.6em;align-items:center;padding:.3em 1.2em;min-width:46%;justify-content:space-between}
.hud .vs .pl{display:flex;flex-direction:column;align-items:center;gap:.2em}.hud .vs .pl b{font-family:'Readex Pro',sans-serif}.hud .vs .pl .sc{font-family:'Readex Pro',sans-serif;font-size:1.35em;color:#fde047}
.dots{display:flex;gap:.25em;direction:rtl}.dots i{width:.8em;height:.8em;border-radius:50%;background:rgba(255,255,255,.85);border:2px solid rgba(255,255,255,.4)}.dots i.ok{background:#22c55e}.dots i.no{background:#ef4444}.dots i.now{background:#60a5fa;box-shadow:0 0 0 3px rgba(96,165,250,.4)}
.turn{position:absolute;top:17%;right:50%;transform:translateX(50%);background:#f59e0b;color:#1f2937;border-radius:99px;padding:.25em 1em;font-family:'Readex Pro',sans-serif}
#panel{flex:0 0 auto;background:linear-gradient(#1e293b,#0f172a);padding:.6em 1%;font-size:clamp(13px,1.5vmin + .55vw,26px);position:relative}
#qbox{max-width:1500px;margin:0 auto;background:#1e2b3d;border-radius:18px;padding:.45em;box-shadow:inset 0 0 0 2px rgba(255,255,255,.12)}
#qt{background:linear-gradient(#fff,#eef2f7);border-radius:14px;padding:.55em 1em;text-align:center;font-size:1.25em;line-height:1.5;border-top:5px solid #34b3a0;position:relative;color:#0f172a}
#tbar{height:6px;border-radius:4px;background:#e2e8f0;margin:.35em auto 0;width:86%;overflow:hidden}#tbar i{display:block;height:100%;background:#22c55e;width:100%;transform-origin:right;transition:background .3s}
#opts{display:grid;grid-template-columns:repeat(4,1fr);gap:.45em;margin-top:.45em;direction:rtl}#opts.two{grid-template-columns:repeat(2,1fr)}
.op{display:flex;align-items:center;gap:.5em;background:linear-gradient(#fff 60%,#eef2f7);border-radius:16px;padding:.45em .6em;min-height:3.1em;text-align:right;border:4px solid var(--c);color:var(--c);font-size:1em;line-height:1.35;box-shadow:0 4px 0 rgba(0,0,0,.25);transition:transform .12s,filter .2s}
.op:hover{transform:translateY(-2px)}.op:active{transform:translateY(1px)}.op .l{flex:none;width:1.8em;height:1.8em;border-radius:50%;display:grid;place-items:center;color:#fff;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--c) 55%,#fff),var(--c) 70%);box-shadow:0 2px 4px rgba(0,0,0,.3)}
.op .t{flex:1;font-family:'IBM Plex Sans Arabic',sans-serif;font-weight:600;color:#1f2937}
.op.ok{background:#dcfce7;border-color:#16a34a}.op.no{background:#fee2e2;border-color:#dc2626;animation:shake .4s}.op.dim{filter:grayscale(.7) opacity(.55)}
@keyframes shake{25%{transform:translateX(6px)}50%{transform:translateX(-6px)}75%{transform:translateX(4px)}}
#ex{display:none;margin-top:.4em;color:#e2e8f0;font-size:.85em;text-align:center;line-height:1.5}#ex.on{display:flex;gap:.6em;align-items:center;justify-content:center}#ex b{color:#fde047}
#nx{background:#f59e0b;color:#1f2937;border-radius:12px;padding:.35em 1em;flex:none}
.tb{position:absolute;bottom:8px;display:flex;flex-direction:column;gap:6px;z-index:5}.tb button{width:44px;height:44px;border-radius:12px;background:rgba(15,23,42,.8);color:#fff;font-size:20px;border:2px solid rgba(255,255,255,.3)}
#ov{position:fixed;inset:0;background:radial-gradient(circle at 50% 30%,#1e3a8a,#0b1220 75%);z-index:20;display:flex;align-items:center;justify-content:center;padding:2vmin;overflow:auto;color:#fff;font-size:clamp(12px,1.2vmin + .5vw,22px)}
#ov .wrap{width:min(1200px,100%);text-align:center}#ov h1{font-family:'Readex Pro',sans-serif;font-size:2em;margin-bottom:.15em}#ov .sub{color:#93c5fd;margin-bottom:.8em}
.scs{display:grid;grid-template-columns:repeat(3,1fr);gap:.8em;margin:.6em 0}.sc{position:relative;border-radius:16px;overflow:hidden;background:#0f172a;border:3px solid transparent;aspect-ratio:16/8;color:#fff}.sc canvas{position:absolute;inset:0;width:100%;height:100%}
.sc span{position:absolute;bottom:0;inset-inline:0;background:linear-gradient(transparent,rgba(0,0,0,.8));padding:.8em .5em .4em;font-family:'Readex Pro',sans-serif;font-size:1.1em}.sc[aria-pressed=true]{border-color:#fde047;box-shadow:0 0 0 4px rgba(253,224,71,.35)}
.seg{display:inline-flex;gap:.4em;margin:.3em .6em;flex-wrap:wrap;justify-content:center}.seg button{background:rgba(255,255,255,.12);color:#fff;border-radius:99px;padding:.4em 1.1em;border:2px solid rgba(255,255,255,.25)}.seg button[aria-pressed=true]{background:#fde047;color:#1f2937;border-color:#fde047}
.go{background:linear-gradient(#22c55e,#15803d);color:#fff;font-size:1.4em;padding:.45em 2.4em;border-radius:16px;margin-top:.8em;box-shadow:0 6px 0 #14532d}
.res{font-family:'Readex Pro',sans-serif;font-size:2.6em;margin:.2em 0}.stars{font-size:2.6em;letter-spacing:.15em}.rv{max-height:40vh;overflow:auto;text-align:right;background:rgba(255,255,255,.08);border-radius:14px;padding:.6em 1em;margin:.6em 0}.rv div{padding:.4em 0;border-bottom:1px solid rgba(255,255,255,.12)}.rv b{color:#86efac}
.back{position:absolute;top:10px;right:10px;z-index:30;background:rgba(15,23,42,.8);color:#fff;border-radius:12px;padding:.35em .9em;text-decoration:none;font-family:'Readex Pro',sans-serif;border:2px solid rgba(255,255,255,.3);font-size:clamp(12px,1.6vmin,18px)}
@media (max-aspect-ratio:1/1){#opts{grid-template-columns:repeat(2,1fr)}.scs{grid-template-columns:repeat(2,1fr)}}`;
  document.head.insertAdjacentHTML('beforeend', '<style>' + css + '</style>');
  document.body.innerHTML = `<div id="ar"><div id="stage"><canvas id="cv"></canvas><div class="hud" id="hud"></div><div class="tb" style="left:8px"><button id="snd" title="الصوت">🔊</button><button id="fs" title="ملء الشاشة">⛶</button></div><div class="tb" style="right:8px"><button id="menu" title="القائمة">☰</button><button id="home" title="المنصة">⌂</button></div></div>
<div id="panel"><div id="qbox"><div id="qt"></div><div id="tbar"><i></i></div><div id="opts"></div><div id="ex"></div></div></div></div><div id="ov"></div>`;

  const cv = $('#cv'), ctx = cv.getContext('2d'), W = 1600, H = 620;
  const COLS = ['#d62f2f', '#16803a', '#2547a8', '#d9600f'], LET = ['أ', 'ب', 'ج', 'د'];
  let sceneK = ORDER[0], mode = 'cpu', count = 10, S = {}, P = [], game = null, last = performance.now(), t = 0, muted = false, timer = null;
  try { const m = localStorage.getItem('arena-snd'); muted = m === '0'; } catch (e) { }
  /* sound */
  let AC = null; function tone(fs, dur, type, vol) { if (muted) return; try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const t0 = AC.currentTime; fs.forEach((f, i) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = type || 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0, t0 + i * dur); g.gain.linearRampToValueAtTime(vol || .18, t0 + i * dur + .02); g.gain.exponentialRampToValueAtTime(.001, t0 + i * dur + dur * 1.6); o.connect(g); g.connect(AC.destination); o.start(t0 + i * dur); o.stop(t0 + i * dur + dur * 1.8); }); } catch (e) { } }
  const sOk = () => tone([523, 659, 784, 1046], .09, 'triangle'), sNo = () => tone([220, 160], .16, 'sawtooth', .12), sWin = () => tone([523, 659, 784, 1046, 1318], .12, 'triangle');
  $('#snd').textContent = muted ? '🔇' : '🔊'; $('#snd').onclick = () => { muted = !muted; $('#snd').textContent = muted ? '🔇' : '🔊'; try { localStorage.setItem('arena-snd', muted ? '0' : '1'); } catch (e) { } };
  $('#fs').onclick = () => { const d = document, e = d.documentElement; if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d); else (e.requestFullscreen || e.webkitRequestFullscreen || function () { }).call(e); };
  $('#menu').onclick = () => setup(); $('#home').onclick = () => { location.href = '../index.html'; };

  function view(cw, ch) { const s = Math.min(cw / W, ch / H); const ox = (cw - W * s) / 2, oy = (ch - H * s) / 2; return { s, ox, oy, x0: -ox / s, y0: -oy / s, x1: W + ox / s, y1: H + oy / s }; }
  function frame(now) { const dt = Math.min(.05, (now - last) / 1000); last = now; t += dt;
    const r = cv.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); if (r.width > 4 && r.height > 4) { if (cv.width !== Math.round(r.width * d) || cv.height !== Math.round(r.height * d)) { cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); }
      if (S._k !== sceneK) { S = { _k: sceneK }; SC[sceneK].init(S, 7); } const v = view(cv.width, cv.height); ctx.setTransform(v.s, 0, 0, v.s, v.ox, v.oy); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; SC[sceneK].draw(ctx, v, S, t, dt, P, game || { names: ['أنت', 'الحاسوب'] }); drawParts(ctx, P, dt); }
    thumbs(dt); requestAnimationFrame(frame); }

  /* ---------- setup overlay ---------- */
  let thumbList = [];
  function thumbs(dt) { thumbList.forEach(tb => { if (!tb.c.isConnected) return; const r = tb.c.getBoundingClientRect(); if (r.width < 4 || r.height < 4) return; if (tb.c.width !== Math.round(r.width)) { tb.c.width = Math.round(r.width); tb.c.height = Math.round(r.height); } const v = view(tb.c.width, tb.c.height); const c = tb.c.getContext('2d'); c.setTransform(v.s, 0, 0, v.s, v.ox, v.oy); SC[tb.k].draw(c, v, tb.S, t, dt, [], { names: ['أنت', 'الحاسوب'] }); }); }
  function setup() { clearInterval(timer); const ov = $('#ov'); ov.style.display = 'flex';
    const n = G.qs.length;
    ov.innerHTML = `<a class="back" href="../index.html">⌂ المنصة</a><div class="wrap"><h1>🎮 ${esc(G.lesson.title)}</h1><div class="sub">${esc(G.lesson.chapter || '')} — ${AD(n)} سؤالًا من أسئلة الدرس</div>
      <div class="scs">${ORDER.map(k => `<button class="sc" data-k="${k}" aria-pressed="${k === sceneK}"><canvas></canvas><span>${SC[k].icon} ${SC[k].name}</span></button>`).join('')}</div>
      <div><span class="seg" id="md"><button data-m="cpu" aria-pressed="${mode === 'cpu'}">👤 أنت ضد الحاسوب</button><button data-m="team" aria-pressed="${mode === 'team'}">👥 فريقان في الصف</button></span>
      <span class="seg" id="ct">${[5, 7, 10].filter(x => x < n).concat([n]).map(x => `<button data-c="${x}" aria-pressed="${x === Math.min(count, n)}">${x === n ? 'كل الأسئلة (' + AD(n) + ')' : AD(x) + ' أسئلة'}</button>`).join('')}</span></div>
      <button class="go" id="go">▶ ابدأ اللعب</button></div>`;
    thumbList = [...ov.querySelectorAll('.sc')].map(b => { const k = b.dataset.k, s = {}; SC[k].init(s, 7); if (k === 'race') s.p = [3, 2], s.d = [3, 2]; if (k === 'bus') s.target = s.pos = 3; if (k === 'crane') s.floors = 3; return { c: b.querySelector('canvas'), k, S: s }; });
    ov.querySelectorAll('.sc').forEach(b => b.onclick = () => { sceneK = b.dataset.k; ov.querySelectorAll('.sc').forEach(x => x.setAttribute('aria-pressed', x === b)); });
    ov.querySelectorAll('#md button').forEach(b => b.onclick = () => { mode = b.dataset.m; ov.querySelectorAll('#md button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
    ov.querySelectorAll('#ct button').forEach(b => b.onclick = () => { count = +b.dataset.c; ov.querySelectorAll('#ct button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
    $('#go').onclick = start; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function start() { $('#ov').style.display = 'none'; thumbList = [];
    const n = Math.min(count, G.qs.length); const qs = shuffle(G.qs).slice(0, n).map(q => { const idx = shuffle(q.o.map((_, i) => i)); return { q: q.q, o: idx.map(i => q.o[i]), a: idx.indexOf(q.a), ex: q.ex || '' }; });
    const team = mode === 'team';
    game = { qs, i: 0, team, names: team ? ['فريق (أ)', 'فريق (ب)'] : ['أنت', 'الحاسوب'], sc: [0, 0], res: [[], []], pts: 0, streak: 0, wrong: [], turn: 0, per: team ? Math.ceil(n / 2) : n };
    S = { _k: sceneK }; P = []; SC[sceneK].init(S, team && sceneK !== 'race' ? n : game.per); if (sceneK === 'race') S.n = game.per;
    ask(); }
  function hud() { const g = game, per = g.per, me = g.team ? g.turn : 0;
    const dots = k => `<div class="dots">${Array.from({ length: per }, (_, j) => { const r = g.res[k][j]; return `<i class="${r === true ? 'ok' : r === false ? 'no' : (j === g.res[k].length && (g.team ? k === g.turn : true) ? 'now' : '')}"></i>`; }).join('')}</div>`;
    $('#hud').innerHTML = `<div class="box qn">${AD(g.i + 1)} من ${AD(g.qs.length)}<small><i style="width:${g.i / g.qs.length * 100}%"></i></small></div>
      <div class="box vs"><div class="pl"><b>${g.names[0]}</b>${dots(0)}</div><span class="sc" style="font-family:'Readex Pro';font-size:1.5em;color:#fde047">${AD(g.sc[0])} : ${AD(g.sc[1])}</span><div class="pl"><b>${g.names[1]}</b>${dots(1)}</div></div>
      <div class="box pts"><b>${AD(g.pts)}</b>${g.team ? 'نقاط' : 'نقاطك' + (g.streak > 1 ? ' · تتابع ×' + AD(g.streak) : '')}</div>${g.team ? `<div class="turn">الدور على ${g.names[g.turn]}</div>` : ''}`; }
  function ask() { const g = game, q = g.qs[g.i]; hud();
    $('#qt').firstChild ? 0 : 0; $('#qt').textContent = q.q; $('#ex').className = ''; $('#ex').innerHTML = '';
    const O = $('#opts'); O.className = q.o.length <= 2 ? 'two' : ''; O.innerHTML = q.o.map((o, i) => `<button class="op" data-i="${i}" style="--c:${COLS[i % 4]}"><span class="l">${LET[i]}</span><span class="t">${esc(o)}</span></button>`).join('');
    O.querySelectorAll('.op').forEach(b => b.onclick = () => answer(+b.dataset.i));
    const T = 25, t0 = performance.now(), bar = $('#tbar i'); clearInterval(timer); bar.style.background = '#22c55e';
    timer = setInterval(() => { const f = 1 - (performance.now() - t0) / 1000 / T; bar.style.transform = `scaleX(${Math.max(0, f)})`; if (f < .3) bar.style.background = '#ef4444'; else if (f < .6) bar.style.background = '#f59e0b'; if (f <= 0) answer(-1); }, 100); }
  function answer(k) { const g = game; clearInterval(timer); const q = g.qs[g.i], ok = k === q.a; const O = $('#opts');
    O.querySelectorAll('.op').forEach((b, i) => { b.onclick = null; b.classList.add(i === q.a ? 'ok' : i === k ? 'no' : 'dim'); });
    const who = g.team ? g.turn : 0; g.res[who].push(ok); if (ok) { g.sc[who]++; g.streak = g.team ? 0 : g.streak + 1; g.pts += 100 + (g.team ? 0 : Math.max(0, g.streak - 1) * 25); sOk(); SC[sceneK].ok(S, t, who); } else { g.streak = 0; g.wrong.push(q); sNo(); SC[sceneK].miss(S, t, who); }
    if (!g.team) { const cok = Math.random() < .62; g.res[1].push(cok); if (cok) g.sc[1]++; }
    if (sceneK === 'race') SC.race.sync(S, g.sc.slice()); if (sceneK === 'bus' && g.team) S.target = g.sc[0] + g.sc[1];
    hud();
    const ex = $('#ex'); ex.className = 'on'; ex.innerHTML = `<span>${ok ? '✔ <b>إجابة صحيحة!</b>' : (k < 0 ? '⏰ انتهى الوقت.' : '✘ الإجابة الصحيحة: <b>' + esc(q.o[q.a]) + '</b>')} ${q.ex ? ' — ' + esc(q.ex.replace(/^[^؀-ۿ(]+/, '')) : ''}</span><button id="nx">${g.i + 1 < g.qs.length ? 'التالي ←' : 'النتيجة 🏁'}</button>`;
    let auto = setTimeout(next, ok ? 3800 : 6500); $('#nx').onclick = () => { clearTimeout(auto); next(); };
    function next() { clearTimeout(auto); if (g !== game) return; g.i++; if (g.team) g.turn = 1 - g.turn; if (g.i >= g.qs.length) end(); else ask(); } }
  function end() { const g = game, a = g.sc[0], b = g.sc[1]; const ov = $('#ov'); ov.style.display = 'flex';
    const res = g.team ? (a > b ? 'فاز ' + g.names[0] + ' 🏆' : b > a ? 'فاز ' + g.names[1] + ' 🏆' : 'تعادل الفريقان 🤝') : (a > b ? 'فزت! 🏆' : a === b ? 'تعادل 🤝' : 'فاز الحاسوب… حاول مجددًا 💪');
    const pct = g.team ? 1 : a / g.qs.length, stars = pct >= .9 ? 3 : pct >= .6 ? 2 : pct > 0 ? 1 : 0; sWin(); confetti(P, 800, 300, 80);
    ov.innerHTML = `<div class="wrap"><div class="res">${res}</div><div style="font-size:1.6em;font-family:'Readex Pro'">${g.names[0]} ${AD(a)} : ${AD(b)} ${g.names[1]}</div>${g.team ? '' : `<div class="stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div><div>نقاطك: <b style="color:#fde047">${AD(g.pts)}</b></div>`}
      ${g.wrong.length ? `<div class="rv"><div style="color:#fde047">راجع هذه الأسئلة:</div>${g.wrong.map(q => `<div>${esc(q.q)}<br><b>✔ ${esc(q.o[q.a])}</b></div>`).join('')}</div>` : '<p style="margin:.6em">✨ لا أخطاء! أداء رائع.</p>'}
      <button class="go" id="again">↺ العب مرة أخرى</button> <button class="go" id="other" style="background:linear-gradient(#3b82f6,#1d4ed8);box-shadow:0 6px 0 #1e3a8a">🎮 لعبة أخرى</button></div>`;
    $('#again').onclick = start; $('#other').onclick = setup; }

  requestAnimationFrame(frame); S = {}; SC[sceneK].init(S, 7); setup();
})();
