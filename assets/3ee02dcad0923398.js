window.SIMS = (function () {
  var S = {};
  var AR = '٠١٢٣٤٥٦٧٨٩';
  function n(v) { return String(v).replace(/\d/g, function (d) { return AR[d]; }).replace('.', '٫'); }
  function F(x, sz, w) { x.font = (w || 700) + ' ' + sz + 'px "Readex Pro", Cairo, Tahoma, sans-serif'; }
  function T(x, s, X, Y, sz, col, al, w) { F(x, sz, w); x.fillStyle = col || '#fff'; x.textAlign = al || 'center'; x.direction = 'rtl'; x.textBaseline = 'alphabetic'; x.fillText(s, X, Y); }
  function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
  function lg(x, x0, y0, x1, y1, st) { var g = x.createLinearGradient(x0, y0, x1, y1); st.forEach(function (s) { g.addColorStop(s[0], s[1]); }); return g; }
  function rg(x, X, Y, r0, r1, st) { var g = x.createRadialGradient(X, Y, r0, X, Y, r1); st.forEach(function (s) { g.addColorStop(s[0], s[1]); }); return g; }
  function shadow(x, X, Y, w, h, a) { x.fillStyle = rg(x, X, Y, 0, w, [[0, 'rgba(0,0,0,' + (a || .28) + ')'], [1, 'rgba(0,0,0,0)']]); x.save(); x.translate(X, Y); x.scale(1, h / w); x.beginPath(); x.arc(0, 0, w, 0, 7); x.fill(); x.restore(); }
  function pill(x, s, X, Y, sz, bg, fg) { F(x, sz); var w = x.measureText(s).width + sz * 1.2; x.fillStyle = bg; rr(x, X - w / 2, Y - sz * .95, w, sz * 1.5, sz * .75); x.fill(); T(x, s, X, Y + sz * .2, sz, fg || '#fff'); return w; }
  function rnd(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function mix(a, b, t) { var A = a.match(/\w\w/g).map(function (h) { return parseInt(h, 16); }), B = b.match(/\w\w/g).map(function (h) { return parseInt(h, 16); }); return 'rgb(' + A.map(function (v, i) { return Math.round(v + (B[i] - v) * t); }).join(',') + ')'; }
  // جدول بيانات داخل المشهد (حتى يظهر دائمًا دون تمرير)
  function ctable(x, X, Y, cw, head, rows, opt) {
    opt = opt || {}; var rh = opt.rh || 30, hc = opt.hc || '#0F766E', w = cw.reduce(function (a, b) { return a + b; }, 0), h = rh * (rows.length + 1);
    x.save(); x.shadowColor = 'rgba(0,0,0,.18)'; x.shadowBlur = 10; x.fillStyle = '#fff'; rr(x, X, Y, w, h, 10); x.fill(); x.restore();
    x.save(); rr(x, X, Y, w, h, 10); x.clip(); x.fillStyle = hc; x.fillRect(X, Y, w, rh);
    var cx = X + w; head.forEach(function (hd, i) { T(x, hd, cx - cw[i] / 2, Y + rh * .7, opt.hs || 15, '#fff'); cx -= cw[i]; });
    rows.forEach(function (r, j) { var y = Y + rh * (j + 1); if (j % 2) { x.fillStyle = '#F1F5F9'; x.fillRect(X, y, w, rh); } var cx2 = X + w; r.forEach(function (v, i) { T(x, n(v), cx2 - cw[i] / 2, y + rh * .7, opt.ds || 16, (opt.col && opt.col(j, i)) || '#0F172A'); cx2 -= cw[i]; }); });
    x.restore(); x.strokeStyle = '#CBD5E1'; x.lineWidth = 1.5; rr(x, X, Y, w, h, 10); x.stroke();
  }
  // عدسة مكبّرة تعرض تفاصيل
  function lens(x, X, Y, r, draw, label) {
    x.save(); x.beginPath(); x.arc(X, Y, r, 0, 7); x.clip(); x.fillStyle = '#fff'; x.fillRect(X - r, Y - r, 2 * r, 2 * r); draw(X, Y, r); x.restore();
    x.strokeStyle = '#334155'; x.lineWidth = 7; x.beginPath(); x.arc(X, Y, r, 0, 7); x.stroke(); x.strokeStyle = '#94A3B8'; x.lineWidth = 2; x.beginPath(); x.arc(X, Y, r - 4, 0, 7); x.stroke();
    x.strokeStyle = '#475569'; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.moveTo(X + r * .72, Y + r * .72); x.lineTo(X + r * 1.15, Y + r * 1.15); x.stroke(); x.lineCap = 'butt';
    if (label) pill(x, label, X, Y - r - 10, 15, '#334155');
  }
  // مشغّل التجارب
  function lab(c, api, o) {
    var DPR = Math.min(2.5, Math.max(1.5, window.devicePixelRatio || 1)), LH = o.h || 470; var cv = document.createElement('canvas'); cv.width = 1000 * DPR; cv.height = LH * DPR; cv.style.touchAction = 'manipulation'; c.appendChild(cv); var x = cv.getContext('2d');
    var panel = document.createElement('div'); panel.className = 'labp'; c.appendChild(panel);
    panel.innerHTML = '<div class="labstep"></div><div class="labbtns"></div><div class="labend" hidden></div>';
    var st = o.init ? o.init() : {}, k = -1;
    st.T = 0; st.click = null; st.hover = null;
    function pos(e) { var r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * 1000 / r.width, (e.clientY - r.top) * LH / r.height]; }
    cv.addEventListener('click', function (e) { st.click = pos(e); });
    cv.addEventListener('mousemove', function (e) { st.hover = pos(e); });
    cv.addEventListener('mouseleave', function () { st.hover = null; });
    function next() {
      k++; st.step = k; api && api.step && api.step(k);
      if (k >= o.steps.length) { panel.querySelector('.labstep').innerHTML = '✅ أتممت خطوات التجربة!'; panel.querySelector('.labbtns').innerHTML = ''; var e = panel.querySelector('.labend'); e.hidden = false; e.innerHTML = '🔎 <b>الملاحظة والاستنتاج:</b> ' + o.end(st); api && api.done && api.done(); return; }
      var s = o.steps[k]; panel.querySelector('.labstep').innerHTML = '<span class="labn">' + n(k + 1) + '</span> <span class="labsay">' + s.say + '</span>';
      var bx = panel.querySelector('.labbtns'); bx.innerHTML = '';
      (s.btns || []).forEach(function (b) { var e = document.createElement('button'); e.className = 'btn sm'; e.innerHTML = b[0]; e.onclick = function () { if (st.busy) return; b[1](st, e); }; bx.appendChild(e); });
      if (s.bind) s.bind(st, bx);
    }
    next();
    var on = true;
    (function loop(t) {
      if (!on) return; st.T = t;
      x.save(); x.setTransform(DPR, 0, 0, DPR, 0, 0); o.draw(x, st, t, k); x.restore();
      st.click = null;
      if (k < o.steps.length && o.steps[k].ok && o.steps[k].ok(st) && !st.busy) { if (!st._w) st._w = t; if (t - st._w > 800) { st._w = 0; next(); } }
      requestAnimationFrame(loop);
    })(performance.now());
    return function () { on = false; };
  }
  function pick(b, s, key, val) { b.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-pressed', o.dataset.v === String(val)); }); s[key] = val; }
  function addBtn(b, html, v, fn) { var e = document.createElement('button'); e.className = 'btn sm'; e.dataset.v = v; e.innerHTML = html; e.onclick = fn; b.appendChild(e); return e; }


  /* ================= رسوم مشتركة لمختبر المحاليل ================= */
  var WATER = '#CFE8F7';
  function bench(x, H) {
    H = H || 470;
    x.fillStyle = lg(x, 0, 0, 0, H, [[0, '#F0FDFF'], [1, '#D5F3F7']]); x.fillRect(0, 0, 1000, H);
    x.strokeStyle = 'rgba(14,116,144,.08)'; x.lineWidth = 1.5;
    for (var i = 0; i < 1000; i += 50) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H - 70); x.stroke(); }
    for (var j = 0; j < H - 70; j += 50) { x.beginPath(); x.moveTo(0, j); x.lineTo(1000, j); x.stroke(); }
    x.fillStyle = lg(x, 0, H - 70, 0, H, [[0, '#334155'], [1, '#1E293B']]); x.fillRect(0, H - 70, 1000, 70);
    x.fillStyle = 'rgba(255,255,255,.16)'; x.fillRect(0, H - 70, 1000, 4);
  }
  // كأس زجاجية مدرّجة: Y = القاع، lvl = نسبة الارتفاع (0..1)
  function beaker(x, X, Y, w, h, lvl, col, o) {
    o = o || {}; var L = X - w / 2, R = X + w / 2, Tp = Y - h, ly = Y - h * lvl;
    shadow(x, X, Y + 4, w * .62, 10, .22);
    if (lvl > 0) {
      x.save(); x.beginPath(); x.moveTo(L + 3, ly); x.lineTo(L + 3, Y - 12); x.quadraticCurveTo(L + 3, Y - 3, L + 12, Y - 3); x.lineTo(R - 12, Y - 3); x.quadraticCurveTo(R - 3, Y - 3, R - 3, Y - 12); x.lineTo(R - 3, ly); x.closePath();
      x.fillStyle = col; x.fill(); x.clip(); x.fillStyle = 'rgba(255,255,255,.22)'; x.fillRect(L, ly, w, 6); x.fillStyle = 'rgba(0,0,0,.06)'; x.fillRect(R - 26, ly, 22, h); x.restore();
      x.strokeStyle = 'rgba(255,255,255,.7)'; x.lineWidth = 2; x.beginPath(); x.ellipse(X, ly, w / 2 - 4, 4, 0, 0, 7); x.stroke();
    }
    x.fillStyle = 'rgba(224,242,254,.18)'; x.fillRect(L, Tp, w, h);
    x.strokeStyle = 'rgba(51,65,85,.85)'; x.lineWidth = 3; x.lineJoin = 'round';
    x.beginPath(); x.moveTo(L - 7, Tp - 2); x.lineTo(L, Tp + 7); x.lineTo(L, Y - 12); x.quadraticCurveTo(L, Y, L + 12, Y); x.lineTo(R - 12, Y); x.quadraticCurveTo(R, Y, R, Y - 12); x.lineTo(R, Tp); x.stroke();
    x.fillStyle = 'rgba(255,255,255,.45)'; x.fillRect(L + 9, Tp + 16, 6, h - 40);
    (o.marks || []).forEach(function (m) { var my = Y - h * m[0]; x.strokeStyle = 'rgba(51,65,85,.7)'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(R - 20, my); x.lineTo(R - 5, my); x.stroke(); if (m[1]) T(x, n(m[1]), R - 24, my + 5, 12, '#334155', 'right', 600); });
    if (o.label) pill(x, o.label, X, Y + 34, o.ls || 16, o.lc || '#0E7490');
    return ly;
  }
  // أنبوب اختبار: Yt = أعلى الأنبوب
  function tube(x, X, Yt, w, h, lvl, col, o) {
    o = o || {}; var L = X - w / 2, R = X + w / 2, B = Yt + h, ly = B - (h - w / 2) * lvl - w / 2 * (lvl > 0 ? 1 : 0);
    if (lvl > 0) { x.save(); x.beginPath(); x.moveTo(L + 2, ly); x.lineTo(L + 2, B - w / 2); x.arc(X, B - w / 2, w / 2 - 2, Math.PI, 0, true); x.lineTo(R - 2, ly); x.closePath(); x.fillStyle = col; x.fill(); x.restore(); x.fillStyle = 'rgba(255,255,255,.35)'; x.fillRect(L + 3, ly, w - 6, 3); }
    x.strokeStyle = 'rgba(51,65,85,.85)'; x.lineWidth = 2.5; x.beginPath(); x.moveTo(L, Yt); x.lineTo(L, B - w / 2); x.arc(X, B - w / 2, w / 2, Math.PI, 0, true); x.lineTo(R, Yt); x.stroke();
    x.beginPath(); x.ellipse(X, Yt, w / 2 + 2, 3, 0, 0, 7); x.stroke();
    x.fillStyle = 'rgba(255,255,255,.5)'; x.fillRect(L + 4, Yt + 10, 3, h - 30);
    return ly;
  }
  function rod(x, X, Y1, Y2) { x.strokeStyle = 'rgba(203,213,225,.95)'; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); x.moveTo(X, Y1); x.lineTo(X + 10, Y2); x.stroke(); x.strokeStyle = 'rgba(255,255,255,.8)'; x.lineWidth = 2; x.beginPath(); x.moveTo(X - 1, Y1 + 4); x.lineTo(X + 8, Y2 - 4); x.stroke(); x.lineCap = 'butt'; }
  function thermo(x, X, Y, h, tC, max, lab) {
    x.fillStyle = '#fff'; rr(x, X - 9, Y - h, 18, h, 9); x.fill(); x.strokeStyle = '#64748B'; x.lineWidth = 2; rr(x, X - 9, Y - h, 18, h, 9); x.stroke();
    var f = Math.max(0, Math.min(1, tC / (max || 100))); x.fillStyle = '#DC2626'; x.fillRect(X - 3, Y - 14 - (h - 26) * f, 6, (h - 26) * f + 4); x.beginPath(); x.arc(X, Y - 8, 11, 0, 7); x.fill();
    pill(x, lab != null ? lab : n(Math.round(tC)) + '°س', X, Y - h - 16, 16, '#B91C1C');
  }
  function hotplate(x, X, Y, on) { x.fillStyle = '#475569'; rr(x, X - 120, Y, 240, 30, 8); x.fill(); x.fillStyle = on ? '#F97316' : '#94A3B8'; rr(x, X - 100, Y - 6, 200, 8, 4); x.fill(); x.fillStyle = on ? '#FDBA74' : '#CBD5E1'; x.beginPath(); x.arc(X + 90, Y + 15, 7, 0, 7); x.fill(); if (on) { x.fillStyle = 'rgba(249,115,22,.25)'; x.fillRect(X - 100, Y - 16, 200, 10); } }
  function bubbles(x, X0, X1, Ytop, Ybot, t, k, sz) { x.fillStyle = 'rgba(255,255,255,.85)'; x.strokeStyle = 'rgba(148,163,184,.8)'; x.lineWidth = 1; for (var i = 0; i < k; i++) { var p = ((t / 1600) + i * 0.137) % 1, bx = X0 + ((i * 53) % 97) / 97 * (X1 - X0) + Math.sin(t / 300 + i) * 3, by = Ybot - p * (Ybot - Ytop); x.beginPath(); x.arc(bx, by, (sz || 3) * (0.6 + (i % 3) * .3), 0, 7); x.fill(); x.stroke(); } }
  function sugarCube(x, X, Y, s, a) { x.globalAlpha = a == null ? 1 : a; var d = s * .35; x.fillStyle = '#FFFFFF'; x.fillRect(X - s / 2, Y - s, s, s); x.fillStyle = '#E2E8F0'; x.beginPath(); x.moveTo(X - s / 2, Y - s); x.lineTo(X - s / 2 + d, Y - s - d); x.lineTo(X + s / 2 + d, Y - s - d); x.lineTo(X + s / 2, Y - s); x.fill(); x.fillStyle = '#CBD5E1'; x.beginPath(); x.moveTo(X + s / 2, Y - s); x.lineTo(X + s / 2 + d, Y - s - d); x.lineTo(X + s / 2 + d, Y - d); x.lineTo(X + s / 2, Y); x.fill(); x.strokeStyle = '#94A3B8'; x.lineWidth = 1; x.strokeRect(X - s / 2, Y - s, s, s); var r = rnd(Math.round(X)); x.fillStyle = 'rgba(148,163,184,.5)'; for (var i = 0; i < s; i++) x.fillRect(X - s / 2 + r() * s, Y - s + r() * s, 1.5, 1.5); x.globalAlpha = 1; }
  function grains(x, X, Y, w, k, col, seed) { var r = rnd(seed || 3); for (var i = 0; i < k; i++) { var a = r(), b = r(); x.fillStyle = col || '#fff'; x.fillRect(X + (a - .5) * w * (1 - b * .6), Y - b * w * .18, 2.5, 2.5); } }
  function clock(x, X, Y, r, hrs) { x.fillStyle = '#fff'; x.beginPath(); x.arc(X, Y, r, 0, 7); x.fill(); x.strokeStyle = '#334155'; x.lineWidth = 4; x.stroke(); for (var i = 0; i < 12; i++) { var a = i / 12 * 6.283; x.lineWidth = 2; x.beginPath(); x.moveTo(X + Math.sin(a) * r * .8, Y - Math.cos(a) * r * .8); x.lineTo(X + Math.sin(a) * r * .92, Y - Math.cos(a) * r * .92); x.stroke(); } var ah = hrs / 12 * 6.283, am = (hrs % 1) * 6.283 * 1; x.lineCap = 'round'; x.lineWidth = 5; x.beginPath(); x.moveTo(X, Y); x.lineTo(X + Math.sin(ah) * r * .5, Y - Math.cos(ah) * r * .5); x.stroke(); x.lineWidth = 3; x.strokeStyle = '#0E7490'; x.beginPath(); x.moveTo(X, Y); x.lineTo(X + Math.sin(am * 12) * r * .75, Y - Math.cos(am * 12) * r * .75); x.stroke(); x.lineCap = 'butt'; }
  // ألوان كاشف الملفوف البنفسجي (جدول الكتاب)
  var CAB = [['#E11D2E', 'حمض قوي'], ['#BE123C', 'حمض متوسط القوة'], ['#B0178F', 'حمض ضعيف'], ['#5B5FB0', 'محلول متعادل'], ['#0E9F8E', 'قاعدة ضعيفة'], ['#16A34A', 'قاعدة متوسطة القوة'], ['#EAD20A', 'قاعدة قوية']];
  function cabByPH(p) { return p < 2.5 ? 0 : p < 4.5 ? 1 : p < 6.5 ? 2 : p <= 7.5 ? 3 : p < 9.5 ? 4 : p < 11.5 ? 5 : 6; }
  function cabChart(x, X, Y) { x.fillStyle = '#fff'; rr(x, X, Y, 210, 30 + CAB.length * 30, 10); x.fill(); x.strokeStyle = '#CBD5E1'; x.lineWidth = 1.5; rr(x, X, Y, 210, 30 + CAB.length * 30, 10); x.stroke(); T(x, 'لون عصير الملفوف', X + 105, Y + 21, 14, '#4C1D95'); CAB.forEach(function (c, i) { x.fillStyle = c[0]; rr(x, X + 10, Y + 32 + i * 30, 52, 22, 5); x.fill(); T(x, c[1], X + 200, Y + 49 + i * 30, 14, '#0F172A', 'right', 600); }); }

  var IMG7 = {};
  function im7(k) { if (!window.IMG || !IMG[k]) return null; if (!IMG7[k]) { IMG7[k] = new Image(); IMG7[k].src = IMG[k]; } var i = IMG7[k]; return i.complete && i.naturalWidth ? i : null; }
  function bp(x, H, a) { H = H || 470; x.fillStyle = lg(x, 0, 0, 0, H, [[0, a || '#F5F8FF'], [1, '#E9EEFB']]); x.fillRect(0, 0, 1000, H); x.strokeStyle = 'rgba(67,56,202,.07)'; x.lineWidth = 1; for (var i = 0; i < 1000; i += 40) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); } for (var j = 0; j < H; j += 40) { x.beginPath(); x.moveTo(0, j); x.lineTo(1000, j); x.stroke(); } }
  function card7(x, X, Y, w, h, col, fill) { x.save(); x.shadowColor = 'rgba(15,23,42,.12)'; x.shadowBlur = 10; x.fillStyle = fill || '#fff'; rr(x, X, Y, w, h, 14); x.fill(); x.restore(); x.strokeStyle = col || '#DCE3F5'; x.lineWidth = 2; rr(x, X, Y, w, h, 14); x.stroke(); }
  function arrow7(x, X1, Y1, X2, Y2, col, w) { var a = Math.atan2(Y2 - Y1, X2 - X1); x.strokeStyle = col; x.fillStyle = col; x.lineWidth = w || 4; x.lineCap = 'round'; x.beginPath(); x.moveTo(X1, Y1); x.lineTo(X2 - Math.cos(a) * 12, Y2 - Math.sin(a) * 12); x.stroke(); x.beginPath(); x.moveTo(X2, Y2); x.lineTo(X2 - Math.cos(a - .45) * 18, Y2 - Math.sin(a - .45) * 18); x.lineTo(X2 - Math.cos(a + .45) * 18, Y2 - Math.sin(a + .45) * 18); x.closePath(); x.fill(); x.lineCap = 'butt'; }
  function hit(s, X, Y, r) { return s.click && Math.hypot(s.click[0] - X, s.click[1] - Y) < r; }
  function inR(s, X, Y, w, h) { return s.click && s.click[0] > X && s.click[0] < X + w && s.click[1] > Y && s.click[1] < Y + h; }
  function quiz(opts, ok) { return function (s, b) { opts.forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'q', o[1]); }); }); }; }
  function wrong(x, s, ok, X, Y) { if (s.q && s.q !== ok) pill(x, 'فكّر مرة أخرى 🤔', X || 500, Y || 445, 16, '#B91C1C'); if (s.q === ok) pill(x, 'إجابة صحيحة ✓', X || 500, Y || 445, 16, '#15803D'); }
  // عضلة على شكل مغزل بين نقطتين؛ k = درجة الانقباض (0..1)
  function muscle(x, X1, Y1, X2, Y2, side, k, col) {
    var mx = (X1 + X2) / 2, my = (Y1 + Y2) / 2, a = Math.atan2(Y2 - Y1, X2 - X1), L = Math.hypot(X2 - X1, Y2 - Y1);
    var len = L * (.78 - .12 * k), th = 16 + 20 * k;
    x.save(); x.translate(mx, my); x.rotate(a); x.translate(0, side * (20 + 8 * k));
    x.fillStyle = mix(col === 'b' ? 'F9A8B4' : 'FCA5A5', col === 'b' ? 'BE123C' : 'DC2626', k); x.strokeStyle = 'rgba(127,29,29,.6)'; x.lineWidth = 2;
    x.beginPath(); x.ellipse(0, 0, len / 2, th, 0, 0, 7); x.fill(); x.stroke();
    x.strokeStyle = 'rgba(255,255,255,.45)'; x.lineWidth = 1.5; for (var i = -3; i <= 3; i++) { x.beginPath(); x.moveTo(-len / 2 + 14, i * th / 4.5); x.quadraticCurveTo(0, i * th / 3.2, len / 2 - 14, i * th / 4.5); x.stroke(); }
    x.strokeStyle = '#E5E7EB'; x.lineWidth = 5; x.beginPath(); x.moveTo(-len / 2, 0); x.lineTo(-L / 2 + 6, -side * 14); x.moveTo(len / 2, 0); x.lineTo(L / 2 + 6, -side * 14); x.stroke();
    x.restore();
    return [mx + Math.cos(a + Math.PI / 2) * side * (20 + 8 * k), my + Math.sin(a + Math.PI / 2) * side * (20 + 8 * k)];
  }
  function boneSeg(x, X1, Y1, X2, Y2, w) { x.strokeStyle = '#E7DCC4'; x.lineWidth = w || 22; x.lineCap = 'round'; x.beginPath(); x.moveTo(X1, Y1); x.lineTo(X2, Y2); x.stroke(); x.strokeStyle = '#FFFBF0'; x.lineWidth = (w || 22) * .45; x.beginPath(); x.moveTo(X1, Y1); x.lineTo(X2, Y2); x.stroke(); x.fillStyle = '#F5EEDC'; x.strokeStyle = '#C9B98F'; x.lineWidth = 2; [[X1, Y1], [X2, Y2]].forEach(function (p) { x.beginPath(); x.arc(p[0], p[1], (w || 22) * .62, 0, 7); x.fill(); x.stroke(); }); x.lineCap = 'butt'; }

  function skinG(x, X0, Y0, X1, Y1) { return lg(x, X0, Y0, X1, Y1, [[0, '#FBE3CF'], [.55, '#F2C4A2'], [1, '#DDA27C']]); }
  function capsule(x, X1, Y1, X2, Y2, r1, r2) { var a = Math.atan2(Y2 - Y1, X2 - X1), nx = -Math.sin(a), ny = Math.cos(a); x.beginPath(); x.moveTo(X1 + nx * r1, Y1 + ny * r1); x.lineTo(X2 + nx * r2, Y2 + ny * r2); x.arc(X2, Y2, r2, a + Math.PI / 2, a - Math.PI / 2, true); x.lineTo(X1 - nx * r1, Y1 - ny * r1); x.arc(X1, Y1, r1, a - Math.PI / 2, a + Math.PI / 2, true); x.closePath(); }
  function room(x, H, wall) { H = H || 470; x.fillStyle = lg(x, 0, 0, 0, H, [[0, wall || '#EEF2FF'], [.82, '#E2E8F7'], [.82, '#CBD5E1'], [1, '#94A3B8']]); x.fillRect(0, 0, 1000, H); x.fillStyle = 'rgba(255,255,255,.35)'; x.fillRect(0, H * .82, 1000, 3); }
  function table7(x, X, Y, W, H2) { x.save(); x.shadowColor = 'rgba(0,0,0,.25)'; x.shadowBlur = 14; x.shadowOffsetY = 6; x.fillStyle = lg(x, 0, Y, 0, Y + 28, [[0, '#D9A066'], [.5, '#B9773E'], [1, '#8A5229']]); rr(x, X, Y, W, 28, 8); x.fill(); x.restore(); x.fillStyle = 'rgba(255,255,255,.35)'; rr(x, X + 10, Y + 4, W - 20, 5, 3); x.fill(); [X + 24, X + W - 46].forEach(function (lx) { x.fillStyle = lg(x, lx, 0, lx + 22, 0, [[0, '#7A4520'], [.5, '#A8662F'], [1, '#6B3A18']]); x.fillRect(lx, Y + 28, 22, H2); }); }
  function place(k, X, Y, W, H, al) { var I = im7(k); if (!I) return null; var s = Math.min(W / I.naturalWidth, H / I.naturalHeight), w = I.naturalWidth * s, h = I.naturalHeight * s; var dx = X + (al === 'r' ? W - w : al === 'l' ? 0 : (W - w) / 2), dy = Y + (H - h) / 2; return { I: I, x: dx, y: dy, w: w, h: h, s: s, p: function (ix, iy) { return [dx + ix * s, dy + iy * s]; } }; }
  function drawP(x, P, shadow) { if (!P) return; x.save(); if (shadow !== false) { x.shadowColor = 'rgba(15,23,42,.22)'; x.shadowBlur = 18; x.shadowOffsetY = 6; } x.drawImage(P.I, P.x, P.y, P.w, P.h); x.restore(); }
  function glow(x, X, Y, rx, ry, col, a) { x.save(); var g = x.createRadialGradient(X, Y, 0, X, Y, Math.max(rx, ry)); g.addColorStop(0, 'rgba(' + col + ',' + a + ')'); g.addColorStop(1, 'rgba(' + col + ',0)'); x.fillStyle = g; x.beginPath(); x.ellipse(X, Y, rx, ry, 0, 0, 7); x.fill(); x.restore(); }
  function ring(x, X, Y, r, t, col) { x.strokeStyle = col || 'rgba(15,118,110,' + (.45 + .4 * Math.sin(t / 200)) + ')'; x.lineWidth = 4; x.beginPath(); x.arc(X, Y, r, 0, 7); x.stroke(); }
  function pathAt(pts, f) { var L = [0], i; for (i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); var d = f * L[L.length - 1]; for (i = 1; i < pts.length; i++) if (d <= L[i]) { var u = (d - L[i - 1]) / (L[i] - L[i - 1] || 1); return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * u, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * u]; } return pts[pts.length - 1]; }
  function stroke(x, pts, col, w) { x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); pts.forEach(function (p, i) { i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]); }); x.stroke(); x.lineCap = 'butt'; }
  function quiz2(opts, key) { return function (s, b) { opts.forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, key, o[1]); }); }); }; }
  function wrong2(x, s, key, ok, X, Y) { if (s[key] && s[key] !== ok) pill(x, 'فكّر مرة أخرى 🤔', X || 500, Y || 445, 16, '#B91C1C'); if (s[key] === ok) pill(x, 'إجابة صحيحة ✓', X || 500, Y || 445, 16, '#15803D'); }
  function F2(P, fx, fy) { return [P.x + fx * P.w, P.y + fy * P.h]; }
  function soft(x, H, a, b) { H = H || 470; x.fillStyle = lg(x, 0, 0, 0, H, [[0, a || '#FDF4FF'], [1, b || '#F5F3FF']]); x.fillRect(0, 0, 1000, H); x.fillStyle = 'rgba(219,39,119,.05)'; for (var i = 0; i < 14; i++) { x.beginPath(); x.arc((i * 137) % 1000, (i * 89) % H, 18 + (i % 4) * 9, 0, 7); x.fill(); } }
  function wrapT(x, s, X, Y, w, sz, col, lh) { F(x, sz); var words = s.split(' '), line = '', yy = Y; words.forEach(function (wd) { var t = line ? line + ' ' + wd : wd; if (x.measureText(t).width > w && line) { T(x, line, X, yy, sz, col, 'right'); line = wd; yy += lh || sz * 1.45; } else line = t; }); if (line) T(x, line, X, yy, sz, col, 'right'); return yy; }
  /* ================= «منصة الاستقصاء»: مكوّن المختبرات الاستقصائية (الفصول ١٠–١٢) =================
     مشهد على طاولة المختبر + شريط تحكم (اختيارات ومنزلقات وأزرار) + شاشات قراءة رقمية + دفتر مختبر بمهام تُشطب تلقائيًّا */
  function inq(c, api, o) {
    var H = o.h || 430, DPR = Math.min(2.5, Math.max(1.5, window.devicePixelRatio || 1));
    var root = document.createElement('div'); root.className = 'inq'; c.appendChild(root);
    root.innerHTML = '<div class="inq-bench"><div class="inq-head"><span class="inq-led"></span><b>' + (o.icon || '🔬') + ' ' + o.name + '</b><span class="inq-sub">' + (o.sub || 'غيّر المتغيّر · لاحظ القراءات · سجّل') + '</span></div>' +
      '<div class="inq-stage"><canvas></canvas><div class="inq-toast"></div></div><div class="inq-ctl"></div><div class="inq-read"></div></div>' +
      '<aside class="inq-book"><div class="inq-bt">📓 دفتر المختبر <span class="inq-prog"></span></div><ol class="inq-tasks"></ol><div class="inq-tab"></div><div class="inq-quiz"></div><div class="inq-end" hidden></div></aside>';
    var cv = root.querySelector('canvas'); cv.width = 1000 * DPR; cv.height = H * DPR; var x = cv.getContext('2d');
    var s = o.init ? o.init() : {}; s.T = 0; s.click = null; s.down = false; s.mx = -1; s.my = -1; s.rows = s.rows || []; s.used = {};
    function pos(e) { var r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * 1000 / r.width, (e.clientY - r.top) * H / r.height]; }
    cv.addEventListener('pointerdown', function (e) { var p = pos(e); s.down = true; s.mx = p[0]; s.my = p[1]; s.press = p; });
    cv.addEventListener('pointermove', function (e) { var p = pos(e); s.mx = p[0]; s.my = p[1]; });
    window.addEventListener('pointerup', function () { s.down = false; });
    cv.addEventListener('click', function (e) { s.click = pos(e); });
    var toastEl = root.querySelector('.inq-toast'), tt = 0;
    s.toast = function (m, bad) { toastEl.textContent = m; toastEl.className = 'inq-toast show' + (bad ? ' bad' : ''); clearTimeout(tt); tt = setTimeout(function () { toastEl.className = 'inq-toast'; }, 2200); };
    // شريط التحكم
    var ctl = root.querySelector('.inq-ctl');
    (o.ctl || []).forEach(function (g) {
      var w = document.createElement('div'); w.className = 'inq-g';
      if (g.opts) {
        w.innerHTML = '<span class="inq-gl">' + g.label + '</span><div class="inq-seg"></div>';
        var seg = w.querySelector('.inq-seg');
        g.opts.forEach(function (op) { var b = document.createElement('button'); b.type = 'button'; b.innerHTML = op[1]; b.dataset.v = op[0]; b.onclick = function () { s[g.k] = op[0]; (s.used[g.k] = s.used[g.k] || {})[op[0]] = 1; seg.querySelectorAll('button').forEach(function (z) { z.setAttribute('aria-pressed', z === b); }); if (g.on) g.on(s, op[0]); }; seg.appendChild(b); if (s[g.k] === op[0]) b.setAttribute('aria-pressed', true); });
      } else {
        w.innerHTML = '<span class="inq-gl">' + g.label + ' <output></output></span><input type="range" min="' + g.min + '" max="' + g.max + '" step="' + (g.step || 1) + '" value="' + s[g.k] + '">';
        var r = w.querySelector('input'), out = w.querySelector('output');
        var upd = function () { out.textContent = n(s[g.k]) + ' ' + (g.unit || ''); };
        r.oninput = function () { s[g.k] = +r.value; (s.used[g.k] = s.used[g.k] || {})[r.value] = 1; upd(); if (g.on) g.on(s, +r.value); }; upd();
        s['_set_' + g.k] = function (v) { r.value = v; r.oninput(); };
      }
      ctl.appendChild(w);
    });
    var acts = document.createElement('div'); acts.className = 'inq-acts'; ctl.appendChild(acts);
    (o.act || []).forEach(function (a) { var b = document.createElement('button'); b.type = 'button'; b.className = 'inq-go'; b.innerHTML = a[0]; b.onclick = function () { a[1](s, b); }; acts.appendChild(b); });
    if (o.cols) { var rb = document.createElement('button'); rb.type = 'button'; rb.className = 'inq-go rec'; rb.innerHTML = '📌 سجّل في الجدول'; rb.onclick = function () { var r = o.rec(s); if (!r) return; var key = r.join('|'); if (s.rows.some(function (q) { return q.join('|') === key; })) { s.toast('هذه القراءة مسجلة من قبل'); return; } s.rows.push(r); if (s.rows.length > 8) s.rows.shift(); s.toast('✓ سُجّلت القراءة'); }; acts.appendChild(rb); }
    // شاشات القراءة
    var rd = root.querySelector('.inq-read'), tiles = (o.read || []).map(function (q) { var d = document.createElement('div'); d.className = 'inq-tile'; d.innerHTML = '<small>' + q[0] + '</small><b>—</b><i>' + (q[2] || '') + '</i>'; rd.appendChild(d); return d.querySelector('b'); });
    if (!tiles.length) rd.remove();
    // الدفتر: المهام
    var tl = root.querySelector('.inq-tasks'), prog = root.querySelector('.inq-prog'), tab = root.querySelector('.inq-tab'), qz = root.querySelector('.inq-quiz'), endEl = root.querySelector('.inq-end');
    var tasks = (o.tasks || []).map(function (t) { var li = document.createElement('li'); li.innerHTML = '<span class="inq-ck"></span><span>' + t[0] + '</span>'; tl.appendChild(li); return { li: li, ok: t[1], done: false }; });
    var quiz = o.quiz || [], qi = 0, qdone = false, fin = false, lastTab = '', lastRead = [];
    function showQuiz() {
      if (qi >= quiz.length) { qdone = true; qz.innerHTML = ''; return; }
      var q = quiz[qi]; qz.innerHTML = '<div class="inq-qh">❓ سؤال ' + n(qi + 1) + ' من ' + n(quiz.length) + '</div><div class="inq-qq">' + q.q + '</div><div class="inq-qo"></div><div class="inq-qf"></div>';
      var box = qz.querySelector('.inq-qo'), fb = qz.querySelector('.inq-qf');
      q.o.forEach(function (t, i) { var b = document.createElement('button'); b.type = 'button'; b.innerHTML = t; b.onclick = function () { if (i === q.a) { b.className = 'ok'; fb.innerHTML = '✅ ' + (q.why || 'إجابة صحيحة!'); fb.className = 'inq-qf ok'; box.querySelectorAll('button').forEach(function (z) { z.disabled = true; }); setTimeout(function () { qi++; showQuiz(); }, 1400); } else { b.className = 'no'; fb.innerHTML = '🤔 ' + (q.hint || 'ارجع إلى قراءاتك وجرّب مرة أخرى.'); fb.className = 'inq-qf no'; } }; box.appendChild(b); });
    }
    var on = true, lastT = performance.now(), stepK = -1;
    function progress() {
      var k = tasks.filter(function (t) { return t.done; }).length;
      prog.textContent = '(' + n(k) + '/' + n(tasks.length) + ')';
      if (k !== stepK) { stepK = k; api.step(k); }
      if (k === tasks.length && !qz.dataset.on) { qz.dataset.on = 1; qz.classList.add('show'); showQuiz(); }
      if (k === tasks.length && qdone && !fin) { fin = true; endEl.hidden = false; endEl.innerHTML = '🔎 <b>الاستنتاج:</b> ' + o.end(s); root.classList.add('done'); api.done && api.done(); }
    }
    progress();
    (function loop(t) {
      if (!on) return; var dt = Math.min(0.05, (t - lastT) / 1000); lastT = t; s.T = t;
      if (o.tick) o.tick(s, dt);
      x.save(); x.setTransform(DPR, 0, 0, DPR, 0, 0); o.draw(x, s, t); x.restore();
      s.click = null; s.press = null;
      tasks.forEach(function (q) { if (!q.done && q.ok(s)) { q.done = true; q.li.className = 'ok'; s.toast('✓ ' + q.li.textContent); } });
      if (!fin) progress();
      (o.read || []).forEach(function (q, i) { var v = q[1](s); if (v !== lastRead[i]) { lastRead[i] = v; tiles[i].textContent = v; } });
      if (o.cols) { var h = s.rows.length ? '<table class="inq-t"><tr>' + o.cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr>' + s.rows.map(function (r) { return '<tr>' + r.map(function (v) { return '<td>' + n(v) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>' : '<div class="inq-empty">📋 جدول البيانات فارغ — سجّل قراءاتك</div>'; if (h !== lastTab) { tab.innerHTML = h; lastTab = h; } }
      requestAnimationFrame(loop);
    })(lastT);
    return function () { on = false; };
  }
  // أدوات رسم مشتركة لمختبرات الاستقصاء
  function benchBg(x, H, top, bot) { x.fillStyle = lg(x, 0, 0, 0, H, [[0, top || '#F1F7FA'], [1, bot || '#E3EEF3']]); x.fillRect(0, 0, 1000, H); x.strokeStyle = 'rgba(12,53,71,.05)'; x.lineWidth = 1; for (var i = 0; i < 1000; i += 50) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); } for (var j = 0; j < H; j += 50) { x.beginPath(); x.moveTo(0, j); x.lineTo(1000, j); x.stroke(); } }
  function benchTop(x, Y, H) { x.fillStyle = lg(x, 0, Y, 0, Y + 18, [[0, '#CBD5E1'], [1, '#94A3B8']]); x.fillRect(0, Y, 1000, 18); x.fillStyle = '#64748B'; x.fillRect(0, Y + 18, 1000, (H || 470) - Y - 18); }
  function gauge(x, X, Y, r, v, max, lab, col) { x.save(); x.fillStyle = '#0F172A'; x.beginPath(); x.arc(X, Y, r + 6, Math.PI, 0); x.fill(); x.strokeStyle = '#334155'; x.lineWidth = 10; x.beginPath(); x.arc(X, Y, r - 6, Math.PI, 0); x.stroke(); x.strokeStyle = col || '#22D3EE'; x.beginPath(); x.arc(X, Y, r - 6, Math.PI, Math.PI + Math.PI * Math.max(0, Math.min(1, v / max))); x.stroke(); var a = Math.PI + Math.PI * Math.max(0, Math.min(1, v / max)); x.strokeStyle = '#F8FAFC'; x.lineWidth = 3; x.beginPath(); x.moveTo(X, Y); x.lineTo(X + Math.cos(a) * (r - 14), Y + Math.sin(a) * (r - 14)); x.stroke(); T(x, lab, X, Y + 22, 15, '#0F172A'); x.restore(); }
  function thermo(x, X, Y, h, v, max, col) { x.fillStyle = '#fff'; rr(x, X - 9, Y, 18, h, 9); x.fill(); x.strokeStyle = '#475569'; x.lineWidth = 2; rr(x, X - 9, Y, 18, h, 9); x.stroke(); var f = Math.max(0.03, Math.min(1, v / max)); x.fillStyle = col || '#DC2626'; rr(x, X - 5, Y + h - (h - 8) * f - 4, 10, (h - 8) * f, 5); x.fill(); x.beginPath(); x.arc(X, Y + h + 8, 14, 0, 7); x.fill(); x.strokeStyle = '#475569'; x.stroke(); }

  /* ================= مختبرات الفصل الثاني عشر «طيف وصدى» — منصة الاستقصاء ================= */
  function arw(x, X1, Y1, X2, Y2, col, w) { var a = Math.atan2(Y2 - Y1, X2 - X1); x.strokeStyle = col; x.fillStyle = col; x.lineWidth = w || 4; x.lineCap = 'round'; x.beginPath(); x.moveTo(X1, Y1); x.lineTo(X2 - Math.cos(a) * 12, Y2 - Math.sin(a) * 12); x.stroke(); x.beginPath(); x.moveTo(X2, Y2); x.lineTo(X2 - Math.cos(a - .45) * 18, Y2 - Math.sin(a - .45) * 18); x.lineTo(X2 - Math.cos(a + .45) * 18, Y2 - Math.sin(a + .45) * 18); x.closePath(); x.fill(); }
  function night(x, H) { x.fillStyle = lg(x, 0, 0, 0, H, [[0, '#1E1B4B'], [1, '#0F172A']]); x.fillRect(0, 0, 1000, H); }
  function ray(x, X1, Y1, X2, Y2, col, w) { x.save(); x.strokeStyle = col; x.lineWidth = w || 6; x.lineCap = 'round'; x.shadowColor = col; x.shadowBlur = 14; x.beginPath(); x.moveTo(X1, Y1); x.lineTo(X2, Y2); x.stroke(); x.restore(); }
  var RAIN = ['#EF4444', '#F97316', '#FACC15', '#22C55E', '#06B6D4', '#3B82F6', '#8B5CF6'];
  var RAINN = ['الأحمر', 'البرتقالي', 'الأصفر', 'الأخضر', 'الأزرق', 'النيلي', 'البنفسجي'];
  function f1(v) { return n((Math.round(v * 10) / 10).toString()); }
  function f2(v) { return n((Math.round(v * 100) / 100).toString()); }

  // ── ١) التجربة الاستهلالية: السلك الموجي ──
  S.lab_slinky = function (c, api) {
    return inq(c, api, { name: 'السلك الموجي', icon: '〰', sub: 'شكّل سلكًا طوله ٥٠ سم بعدد مختلف من القمم، وقارن المسافات بين القمم', h: 400,
      init: function () { return { k: 2, seen: {} }; },
      ctl: [{ k: 'k', label: 'عدد القمم', min: 1, max: 8, step: 1, unit: 'قمة' }],
      tick: function (s) { s.seen[s.k] = 1; },
      read: [['عدد القمم', function (s) { return n(s.k); }, ''], ['المسافة بين قمتين', function (s) { return f1(50 / s.k); }, 'سم'], ['طول السلك', function () { return n(50); }, 'سم']],
      tasks: [['شكّل السلك بقمتين فقط.', function (s) { return s.seen[2]; }], ['شكّله بست قمم أو أكثر.', function (s) { return s.seen[6] || s.seen[7] || s.seen[8]; }], ['سجّل ثلاثة نماذج مختلفة في الجدول.', function (s) { return s.rows.length >= 3; }]],
      cols: ['عدد القمم', 'المسافة بين القمم (سم)'], rec: function (s) { return [s.k, (Math.round(500 / s.k) / 10)]; },
      quiz: [{ q: 'كيف تتغير المسافات بين القمم عندما يزداد عدد القمم في السلك نفسه؟', o: ['تزداد', 'تقل', 'لا تتغير'], a: 1, why: 'عدد أكبر من القمم في الطول نفسه يعني طولًا موجيًّا أقصر.' }, { q: 'المسافة بين قمتين متتاليتين تسمى:', o: ['السعة', 'الطول الموجي', 'التردد'], a: 1 }],
      end: function () { return 'كلما زاد عدد القمم في السلك نفسه (٥٠ سم) <b>قلّت المسافة بين القمم</b>؛ وهذه المسافة هي <b>الطول الموجي</b>.'; },
      draw: function (x, s, t) {
        benchBg(x, 400, '#F5F3FF', '#EDE9FE'); benchTop(x, 330, 400);
        var X0 = 100, W = 800, Y = 190, A = 75, k = s.k;
        x.strokeStyle = '#475569'; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath();
        for (var i = 0; i <= 400; i++) { var u = i / 400, yy = Y - A * Math.sin(2 * Math.PI * k * u - Math.PI / 2 + Math.PI / 2); x.lineTo(X0 + u * W, Y - A * Math.sin(2 * Math.PI * k * u)); } x.stroke();
        x.strokeStyle = '#CBD5E1'; x.lineWidth = 3; x.beginPath(); for (i = 0; i <= 400; i++) { u = i / 400; x.lineTo(X0 + u * W, Y - 3 - A * Math.sin(2 * Math.PI * k * u)); } x.stroke();
        var cr = []; for (i = 0; i < k; i++) cr.push(X0 + (i + .25) / k * W);
        cr.forEach(function (X) { x.fillStyle = '#DB2777'; x.beginPath(); x.arc(X, Y - A, 9, 0, 7); x.fill(); });
        if (k > 1) { var a = cr[0], b = cr[1]; x.strokeStyle = '#6D28D9'; x.lineWidth = 3; x.beginPath(); x.moveTo(a, Y - A - 30); x.lineTo(b, Y - A - 30); x.stroke(); [a, b].forEach(function (X) { x.beginPath(); x.moveTo(X, Y - A - 40); x.lineTo(X, Y - A - 20); x.stroke(); }); pill(x, f1(50 / k) + ' سم', (a + b) / 2, Y - A - 44, 16, '#6D28D9'); }
        x.fillStyle = '#334155'; x.fillRect(X0, 300, W, 4); T(x, 'طول السلك ٥٠ سم', 500, 290, 16, '#334155');
      } });
  };

  // ── ٢) حوض الموجات: المستعرضة والطولية وخصائصها ──
  S.lab_waves = function (c, api) {
    var V = 2, PPM = 200;
    return inq(c, api, { name: 'حوض الموجات', icon: '🌊', sub: 'غيّر نوع الموجة وترددها وسعتها، وراقب النقطة الحمراء: هل تنتقل مع الموجة؟', h: 420,
      init: function () { return { ty: 'tr', f: 1, A: 50, f1: 0, f4: 0, bigA: 0 }; },
      ctl: [{ k: 'ty', label: 'نوع الموجة', opts: [['tr', '〰 مستعرضة (حبل)'], ['lo', '🌀 طولية (نابض)']] }, { k: 'f', label: 'التردد', min: .5, max: 4, step: .5, unit: 'هرتز' }, { k: 'A', label: 'السعة', min: 10, max: 90, step: 10, unit: 'وحدة' }],
      tick: function (s) { if (s.f === 1) s.f1 = 1; if (s.f >= 4) s.f4 = 1; if (s.A >= 90) s.bigA = 1; },
      read: [['التردد', function (s) { return f1(s.f); }, 'هرتز'], ['الطول الموجي', function (s) { return f2(V / s.f); }, 'م'], ['سرعة الموجة', function (s) { return n(V); }, 'م/ث'], ['الطاقة المنقولة', function (s) { return '▮'.repeat(Math.max(1, Math.round(s.A / 18))); }, '']],
      tasks: [['شاهد الموجة المستعرضة ثم الطولية.', function (s) { return s.used.ty && s.used.ty.lo && s.used.ty.tr; }], ['اجعل التردد ١ هرتز ثم ٤ هرتز، ولاحظ الطول الموجي.', function (s) { return s.f1 && s.f4; }], ['ارفع السعة إلى أقصى قيمة.', function (s) { return s.bigA; }], ['سجّل ثلاث قراءات بترددات مختلفة.', function (s) { return s.rows.length >= 3; }]],
      cols: ['التردد', 'الطول الموجي', 'λ × د'], rec: function (s) { return [s.f, Math.round(V / s.f * 100) / 100, V]; },
      quiz: [{ q: 'عند زيادة التردد مع بقاء السرعة ثابتة، فإن الطول الموجي:', o: ['يزداد', 'يقل', 'لا يتغير'], a: 1, why: 'ع = λ × د؛ فإذا ثبتت ع وزاد د قلّ λ.' }, { q: 'ماذا حدث للنقطة الحمراء أثناء مرور الموجة؟', o: ['انتقلت مع الموجة إلى نهاية الحبل', 'اهتزت في مكانها فقط'], a: 1, why: 'الموجة تنقل الطاقة ولا تنقل المادة.' }, { q: 'في الموجة الطولية تهتز دقائق الوسط:', o: ['عموديًّا على اتجاه الانتشار', 'في اتجاه الانتشار نفسه'], a: 1 }],
      end: function () { return 'النقطة الحمراء اهتزت في مكانها فقط؛ <b>فالموجة تنقل الطاقة لا المادة</b>. وحاصل ضرب الطول الموجي في التردد بقي ثابتًا (<b>ع = λ × د</b>)، وزيادة السعة تعني طاقة أكبر.'; },
      draw: function (x, s, t) {
        benchBg(x, 420, '#F5F3FF', '#EDE9FE'); var X0 = 90, X1 = 930, Y = 200, sec = t / 1000, lam = V / s.f * PPM, w = 2 * Math.PI * s.f, A = s.A * 1.3, mk = 500;
        x.fillStyle = '#6D28D9'; rr(x, 50, 140, 40, 120, 10); x.fill(); x.fillStyle = '#94A3B8'; x.fillRect(930, 120, 14, 170);
        if (s.ty === 'tr') {
          x.strokeStyle = '#7C3AED'; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); for (var X = X0; X <= X1; X += 3) x.lineTo(X, Y - A * Math.sin(2 * Math.PI * (X - X0) / lam - w * sec)); x.stroke();
          var yk = Y - A * Math.sin(2 * Math.PI * (mk - X0) / lam - w * sec); x.fillStyle = '#DC2626'; x.beginPath(); x.arc(mk, yk, 12, 0, 7); x.fill(); arw(x, mk + 30, Y - A - 10, mk + 30, Y + A + 10, 'rgba(220,38,38,.35)', 3);
          var ph = (w * sec) / (2 * Math.PI), cx = X0 + lam * ((0.25 + ph) % 1); while (cx < X1) { if (cx > X0 + 20) { T(x, 'قمة', cx, Y - A - 16, 14, '#6D28D9'); T(x, 'قاع', cx + lam / 2 < X1 ? cx + lam / 2 : cx, Y + A + 30, 14, '#6D28D9'); } cx += lam; }
        } else {
          var N = 110; for (var i = 0; i < N; i++) { var x0 = X0 + (X1 - X0) * i / (N - 1), d = A * .35 * Math.sin(2 * Math.PI * (x0 - X0) / lam - w * sec); x.strokeStyle = i === 55 ? '#DC2626' : '#06B6D4'; x.lineWidth = i === 55 ? 5 : 3; x.beginPath(); x.ellipse(x0 + d, Y, 6, 60, 0, 0, 7); x.stroke(); }
          T(x, 'تضاغطات وتخلخلات تنتقل على طول النابض', 500, 300, 16, '#0E7490');
        }
        arw(x, 380, 70, 620, 70, '#DB2777', 5); T(x, 'اتجاه انتشار الموجة', 500, 55, 16, '#BE185D');
        x.strokeStyle = '#6D28D9'; x.lineWidth = 3; var bx = Math.min(X1 - lam, 200); if (lam < 760) { x.beginPath(); x.moveTo(bx, 360); x.lineTo(bx + lam, 360); x.stroke(); [bx, bx + lam].forEach(function (q) { x.beginPath(); x.moveTo(q, 348); x.lineTo(q, 372); x.stroke(); }); pill(x, 'λ = ' + f2(V / s.f) + ' م', bx + lam / 2, 396, 15, '#6D28D9'); }
      } });
  };

  // ── ٣) الأمواج تغير اتجاهها: الانعكاس والانكسار والحيود ──
  S.lab_mirror = function (c, api) {
    var NN = { water: 1.33, glass: 1.5 };
    return inq(c, api, { name: 'مختبر اتجاه الموجات', icon: '↩', sub: 'اختر الظاهرة، ثم غيّر زاوية السقوط أو الطول الموجي', h: 420,
      init: function () { return { md: 'refl', ang: 40, med: 'water', wl: 2, angs: {}, rW: 0, rG: 0, dS: 0, dL: 0 }; },
      ctl: [{ k: 'md', label: 'الظاهرة', opts: [['refl', '🪞 انعكاس'], ['refr', '💧 انكسار'], ['diff', '🌀 حيود']] }, { k: 'ang', label: 'زاوية السقوط', min: 0, max: 70, step: 5, unit: '°' }, { k: 'med', label: 'الوسط الثاني (للانكسار)', opts: [['water', 'ماء'], ['glass', 'زجاج']] }, { k: 'wl', label: 'الطول الموجي (للحيود)', min: 1, max: 5, step: 1, unit: '' }],
      tick: function (s) { if (s.md === 'refl') s.angs[s.ang] = 1; if (s.md === 'refr' && s.ang >= 20) { if (s.med === 'water') s.rW = 1; else s.rG = 1; } if (s.md === 'diff') { if (s.wl <= 1) s.dS = 1; if (s.wl >= 5) s.dL = 1; } },
      read: [['زاوية السقوط', function (s) { return s.md === 'diff' ? '—' : n(s.ang) + '°'; }, ''], ['الزاوية الناتجة', function (s) { return s.md === 'refl' ? 'انعكاس ' + n(s.ang) + '°' : s.md === 'refr' ? 'انكسار ' + n(Math.round(Math.asin(Math.sin(s.ang * Math.PI / 180) / NN[s.med]) * 180 / Math.PI)) + '°' : '—'; }, ''], ['ما يحدث', function (s) { return s.md === 'refl' ? 'ترتد الموجة' : s.md === 'refr' ? 'تتباطأ وتنحرف' : (s.wl >= 4 ? 'حيود كبير' : s.wl <= 2 ? 'حيود صغير' : 'حيود متوسط'); }, '']],
      tasks: [['في الانعكاس جرّب ثلاث زوايا سقوط مختلفة.', function (s) { return Object.keys(s.angs).length >= 3; }], ['اكسر الضوء في الماء ثم في الزجاج (زاوية ٢٠° أو أكثر).', function (s) { return s.rW && s.rG; }], ['في الحيود قارن طولًا موجيًّا قصيرًا (١) بطويل (٥).', function (s) { return s.dS && s.dL; }]],
      quiz: [{ q: 'العلاقة بين زاوية السقوط وزاوية الانعكاس:', o: ['زاوية الانعكاس أكبر', 'متساويتان', 'زاوية الانعكاس أصغر'], a: 1, why: 'قانون الانعكاس.' }, { q: 'لماذا انحرف الضوء عند دخوله الماء؟', o: ['لأن سرعته تغيرت', 'لأن لونه تغير', 'لأن تردده زاد'], a: 0 }, { q: 'يزداد الحيود كلما:', o: ['قصر الطول الموجي مقارنة بالفتحة', 'زاد الطول الموجي مقارنة بالفتحة'], a: 1 }],
      end: function () { return '<b>زاوية الانعكاس تساوي زاوية السقوط</b> دائمًا، وينكسر الضوء لأن <b>سرعته تتغير</b> عند انتقاله إلى وسط آخر (وانحرافه في الزجاج أكبر)، ويزداد <b>الحيود</b> كلما زاد الطول الموجي مقارنة بأبعاد العائق.'; },
      draw: function (x, s, t) {
        var a = s.ang * Math.PI / 180, cx = 500, cy = 230, L = 210;
        if (s.md === 'diff') {
          benchBg(x, 420, '#ECFEFF', '#CFFAFE'); var sp = 14 + s.wl * 9, off = (t / 30) % sp;
          for (var X = 80 + off; X < 470; X += sp) { x.strokeStyle = 'rgba(8,145,178,.7)'; x.lineWidth = 4; x.beginPath(); x.moveTo(X, 40); x.lineTo(X, 380); x.stroke(); }
          x.fillStyle = '#334155'; x.fillRect(480, 20, 24, 175); x.fillRect(480, 265, 24, 135);
          var spread = Math.min(80, 12 + s.wl * 15) * Math.PI / 180;
          for (var r = off; r < 470; r += sp) { x.strokeStyle = 'rgba(8,145,178,' + Math.max(.15, .8 - r / 600) + ')'; x.lineWidth = 4; x.beginPath(); x.arc(504, 230, r + 4, -spread, spread); x.stroke(); }
          T(x, 'فتحة في عائق', 492, 412, 15, '#334155'); pill(x, s.wl >= 4 ? 'انعطاف كبير خلف الفتحة' : s.wl <= 2 ? 'انعطاف قليل' : 'انعطاف متوسط', 760, 60, 16, '#0E7490');
          return;
        }
        night(x, 420);
        if (s.md === 'refl') { x.fillStyle = lg(x, 0, cy, 0, cy + 30, [[0, '#E2E8F0'], [1, '#64748B']]); x.fillRect(150, cy, 700, 26); T(x, 'مرآة', 820, cy + 60, 16, '#E2E8F0'); }
        else { x.fillStyle = s.med === 'water' ? 'rgba(56,189,248,.35)' : 'rgba(186,230,253,.5)'; x.fillRect(80, cy, 840, 190); T(x, s.med === 'water' ? 'ماء' : 'زجاج', 860, cy + 40, 18, '#E0F2FE'); T(x, 'هواء', 860, cy - 20, 18, '#E0F2FE'); }
        x.setLineDash([8, 8]); x.strokeStyle = '#FACC15'; x.lineWidth = 2; x.beginPath(); x.moveTo(cx, cy - 200); x.lineTo(cx, cy + 180); x.stroke(); x.setLineDash([]); T(x, 'العمود المقام', cx + 70, 40, 15, '#FACC15');
        var sx = cx - L * Math.sin(a), sy = cy - L * Math.cos(a); ray(x, sx, sy, cx, cy, '#FDE68A'); arw(x, (sx + cx) / 2 - 1, (sy + cy) / 2 - 1, (sx + cx) / 2 + Math.sin(a) * 6, (sy + cy) / 2 + Math.cos(a) * 6, '#FDE68A', 3);
        if (s.md === 'refl') { ray(x, cx, cy, cx + L * Math.sin(a), cy - L * Math.cos(a), '#FDE68A'); T(x, n(s.ang) + '°', cx - 40, cy - 70, 18, '#FDE68A'); T(x, n(s.ang) + '°', cx + 40, cy - 70, 18, '#FDE68A'); }
        else { var b = Math.asin(Math.sin(a) / NN[s.med]); ray(x, cx, cy, cx + 180 * Math.sin(b), cy + 180 * Math.cos(b), '#FDE68A'); ray(x, cx, cy, cx + 150 * Math.sin(a), cy - 150 * Math.cos(a), 'rgba(253,230,138,.25)', 3); T(x, n(s.ang) + '°', cx - 40, cy - 70, 18, '#FDE68A'); T(x, n(Math.round(b * 180 / Math.PI)) + '°', cx + 40, cy + 90, 18, '#FDE68A'); x.setLineDash([5, 6]); x.strokeStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + 180 * Math.sin(a), cy + 180 * Math.cos(a)); x.stroke(); x.setLineDash([]); }
      } });
  };

  // ── ٤) تجربة: انكسار الضوء (قلم في كأس) ──
  S.lab_refract = function (c, api) {
    return inq(c, api, { name: 'قلم في كأس الماء', icon: '✏', sub: 'غيّر مستوى الماء في الكأس ولاحظ شكل القلم كما تراه من الجانب', h: 420,
      init: function () { return { lv: 50, l0: 0, l50: 0, l100: 0 }; },
      ctl: [{ k: 'lv', label: 'مستوى الماء', min: 0, max: 100, step: 10, unit: '٪' }],
      tick: function (s) { if (s.lv === 0) s.l0 = 1; if (s.lv >= 40 && s.lv <= 60) s.l50 = 1; if (s.lv >= 90) s.l100 = 1; },
      read: [['مستوى الماء', function (s) { return n(s.lv) + '٪'; }, ''], ['شكل القلم', function (s) { return s.lv === 0 ? 'مستقيم' : 'يبدو مكسورًا'; }, ''], ['موضع الكسر', function (s) { return s.lv === 0 ? '—' : 'عند سطح الماء'; }, '']],
      tasks: [['املأ الكأس إلى نصفها ولاحظ القلم.', function (s) { return s.l50; }], ['أضف الماء حتى يمتلئ الكأس تقريبًا.', function (s) { return s.l100; }], ['أفرغ الكأس وقارن.', function (s) { return s.l0 && (s.l50 || s.l100); }]],
      quiz: [{ q: 'أين يبدو القلم مكسورًا؟', o: ['عند قاع الكأس', 'عند سطح الماء', 'عند يدك'], a: 1, why: 'هناك ينتقل الضوء بين الماء والهواء فتتغير سرعته.' }, { q: 'سبب ظهور القلم مكسورًا:', o: ['انكسار الضوء لتغير سرعته بين الماء والهواء', 'انعكاس الضوء عن القلم', 'انثناء القلم فعلًا'], a: 0 }],
      end: function () { return 'يبدو القلم مكسورًا <b>عند سطح الماء تمامًا</b>، ويتحرك موضع الكسر مع تغير مستوى الماء؛ لأن الضوء القادم من الجزء المغمور <b>تتغير سرعته فيتغير اتجاهه</b> عند خروجه من الماء إلى الهواء.'; },
      draw: function (x, s, t) {
        benchBg(x, 420, '#F5F3FF', '#EDE9FE'); benchTop(x, 370, 420);
        var gx = 380, gw = 240, top = 90, bot = 365, wy = bot - (bot - top - 20) * s.lv / 100;
        if (s.lv > 0) { x.fillStyle = 'rgba(56,189,248,.35)'; x.fillRect(gx + 6, wy, gw - 12, bot - wy - 4); x.fillStyle = 'rgba(14,165,233,.5)'; x.fillRect(gx + 6, wy, gw - 12, 4); }
        var P1 = [640, 40], P2 = [430, 350]; function at(y) { var u = (y - P1[1]) / (P2[1] - P1[1]); return P1[0] + (P2[0] - P1[0]) * u; }
        function seg(y1, y2, dx) { x.save(); x.strokeStyle = '#F59E0B'; x.lineWidth = 16; x.lineCap = 'butt'; x.beginPath(); x.moveTo(at(y1) + dx, y1); x.lineTo(at(y2) + dx, y2); x.stroke(); x.strokeStyle = '#B45309'; x.lineWidth = 3; x.beginPath(); x.moveTo(at(y1) + dx + 7, y1); x.lineTo(at(y2) + dx + 7, y2); x.stroke(); x.restore(); }
        if (s.lv > 0) { seg(P1[1], wy, 0); seg(wy, P2[1], -38); } else seg(P1[1], P2[1], 0);
        x.fillStyle = '#FDE68A'; x.beginPath(); x.moveTo(at(P1[1]) - 8, P1[1]); x.lineTo(at(P1[1]) + 8, P1[1]); x.lineTo(at(P1[1]) + 14, P1[1] - 26); x.closePath(); x.fill();
        x.strokeStyle = 'rgba(71,85,105,.8)'; x.lineWidth = 4; x.beginPath(); x.moveTo(gx, top); x.lineTo(gx + 6, bot); x.lineTo(gx + gw - 6, bot); x.lineTo(gx + gw, top); x.stroke();
        if (s.lv > 0) { arw(x, 760, wy, 640, wy, '#DB2777', 3); T(x, 'سطح الماء', 830, wy + 6, 16, '#BE185D'); }
        T(x, '👁 تنظر من الجانب', 170, 200, 18, '#4C1D95');
      } });
  };

  // ── ٥) سرعة الصوت في الأوساط المختلفة ──
  S.lab_sound = function (c, api) {
    var M = { air: ['الهواء', 0], water: ['الماء (٢٥°س)', 1493], rubber: ['المطاط', 1600], iron: ['الحديد', 5130], steel: ['الفولاذ', 5940], diamond: ['الماس', 12000], vac: ['الفراغ', 0] };
    function v(s) { return s.m === 'air' ? 331 + .6 * s.tc : M[s.m][1]; }
    return inq(c, api, { name: 'سباق الصوت عبر الأوساط', icon: '📣', sub: 'اختر الوسط، ثم أطلق الصوت ليقطع ١٠٠٠ متر، وقارن الزمن', h: 400,
      init: function () { return { m: 'air', tc: 20, run: -1, dur: 0, done: {}, a0: 0, a30: 0, vacT: 0 }; },
      ctl: [{ k: 'm', label: 'الوسط', opts: [['air', '💨 هواء'], ['water', '💧 ماء'], ['rubber', 'مطاط'], ['iron', 'حديد'], ['steel', 'فولاذ'], ['diamond', '💎 ماس'], ['vac', '🚀 فراغ']] }, { k: 'tc', label: 'درجة حرارة الهواء', min: 0, max: 30, step: 5, unit: '°س' }],
      act: [['📣 أطلق الصوت', function (s) { if (s.m === 'vac') { s.vacT = 1; s.toast('لا ينتقل الصوت في الفراغ؛ لا توجد دقائق تنقل الاهتزاز!', true); return; } s.run = 0; s.dur = Math.max(.5, 1000 / v(s) * 1.2); s.vv = v(s); s.mm = s.m; s.tt = s.tc; }]],
      tick: function (s, dt) { if (s.run >= 0) { s.run += dt / s.dur; if (s.run >= 1) { s.run = -1; s.done[s.mm] = 1; if (s.mm === 'air') { if (s.tt === 0) s.a0 = 1; if (s.tt === 30) s.a30 = 1; } s.last = [M[s.mm][0], s.mm === 'air' ? s.tt : '—', Math.round(s.vv), Math.round(1000 / s.vv * 1000) / 1000]; } } },
      read: [['سرعة الصوت', function (s) { return s.m === 'vac' ? 'لا ينتقل' : n(Math.round(v(s))); }, 'م/ث'], ['زمن قطع ١٠٠٠ م', function (s) { return s.m === 'vac' ? '—' : f2(1000 / v(s)); }, 'ث'], ['حالة الوسط', function (s) { return { air: 'غاز', water: 'سائل', vac: 'لا مادة' }[s.m] || 'صلب'; }, '']],
      tasks: [['أطلق الصوت في الهواء.', function (s) { return s.done.air; }], ['أطلقه في سائل ثم في مادة صلبة.', function (s) { return s.done.water && (s.done.iron || s.done.steel || s.done.diamond || s.done.rubber); }], ['قارن الهواء عند ٠°س وعند ٣٠°س.', function (s) { return s.a0 && s.a30; }], ['جرّب الفراغ.', function (s) { return s.vacT; }], ['سجّل ثلاث تجارب في الجدول.', function (s) { return s.rows.length >= 3; }]],
      cols: ['الوسط', 'الحرارة °س', 'السرعة م/ث', 'الزمن ث'], rec: function (s) { if (!s.last) { s.toast('أطلق الصوت أولًا', true); return null; } return s.last; },
      quiz: [{ q: 'في أي الأوساط كان الصوت أسرع؟', o: ['الغازات', 'السوائل', 'المواد الصلبة'], a: 2 }, { q: 'ماذا حدث لسرعة الصوت في الهواء عند رفع حرارته من ٠ إلى ٣٠°س؟', o: ['زادت من ٣٣١ إلى ٣٤٩ م/ث', 'قلّت', 'لم تتغير'], a: 0 }, { q: 'لماذا لم ينتقل الصوت في الفراغ؟', o: ['لأن الصوت يحتاج إلى وسط مادي تنقله تصادمات دقائقه', 'لأن الفراغ بارد جدًّا'], a: 0 }],
      end: function () { return 'سرعة الصوت <b>أكبر في المواد الصلبة منها في السائلة، وأكبر في السائلة منها في الغازات</b>، وتزداد في الهواء بارتفاع درجة الحرارة (٣٣١ ← ٣٤٩ م/ث)، ولا ينتقل الصوت في الفراغ.'; },
      draw: function (x, s, t) {
        benchBg(x, 400, '#FDF2F8', '#FCE7F3'); var col = { air: '#E0F2FE', water: '#7DD3FC', rubber: '#334155', iron: '#78716C', steel: '#94A3B8', diamond: '#E0E7FF', vac: '#0F172A' }[s.m];
        x.fillStyle = col; rr(x, 120, 150, 760, 110, 18); x.fill(); x.strokeStyle = '#64748B'; x.lineWidth = 2; rr(x, 120, 150, 760, 110, 18); x.stroke();
        T(x, M[s.m][0] + ' — ١٠٠٠ م', 500, 135, 18, '#831843');
        x.font = '60px sans-serif'; x.textAlign = 'center'; x.fillText('📢', 940, 225); x.fillText('👂', 60, 225);
        if (s.run >= 0) { var X = 880 - 760 * s.run; for (var k = 0; k < 6; k++) { x.strokeStyle = 'rgba(219,39,119,' + (1 - k * .15) + ')'; x.lineWidth = 6 - k * .7; x.beginPath(); x.moveTo(X + k * 16, 160); x.lineTo(X + k * 16, 250); x.stroke(); } pill(x, '⏱ ' + f2(s.run * 1000 / s.vv) + ' ث', 500, 320, 20, '#BE185D'); }
        if (s.m === 'vac') { T(x, 'لا توجد دقائق مادة… لا صوت', 500, 215, 20, '#F8FAFC'); }
      } });
  };

  // ── ٦) علو الصوت وحدّته ──
  S.lab_pitch = function (c, api) {
    var AC = null;
    function lvl(s) { return Math.max(0, Math.round(s.L - 20 * Math.log10(s.d))); }
    function pitchName(f) { return f < 20 ? 'تحت السمعي' : f > 20000 ? 'فوق السمعي' : f < 300 ? 'منخفضة (غليظ)' : f < 2000 ? 'متوسطة' : 'عالية (حاد)'; }
    return inq(c, api, { name: 'مختبر علو الصوت وحدّته', icon: '🔊', sub: 'غيّر قوة الاهتزاز والتردد والمسافة، وراقب الديسبل والحدّة', h: 420,
      init: function () { return { L: 60, f: '440', d: 1, loud: 0, lo: 0, hi: 0, pl: 0, ph: 0 }; },
      ctl: [{ k: 'L', label: 'قوة الاهتزاز (المستوى عند ١ م)', min: 20, max: 120, step: 10, unit: 'ديسبل' }, { k: 'f', label: 'التردد (هرتز)', opts: [['15', '١٥'], ['100', '١٠٠'], ['440', '٤٤٠'], ['4000', '٤٠٠٠'], ['25000', '٢٥٠٠٠']] }, { k: 'd', label: 'بعد المستمع', min: 1, max: 8, step: 1, unit: 'م' }],
      act: [['🎧 استمع (بصوت منخفض)', function (s) { var f = +s.f; if (f < 20 || f > 20000) { s.toast('لن تسمع شيئًا: التردد خارج مدى سمع الإنسان (٢٠–٢٠٠٠٠ هرتز)', true); return; } try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); var o = AC.createOscillator(), g = AC.createGain(); o.frequency.value = f; g.gain.value = Math.min(.12, .01 + lvl(s) / 1200); o.connect(g); g.connect(AC.destination); o.start(); o.stop(AC.currentTime + .6); } catch (e) { } }]],
      tick: function (s) { var f = +s.f; if (lvl(s) >= 85) s.loud = 1; if (f < 20) s.lo = 1; if (f > 20000) s.hi = 1; if (f === 100) s.pl = 1; if (f === 4000) s.ph = 1; },
      read: [['مستوى الشدة عند المستمع', function (s) { return n(lvl(s)); }, 'ديسبل'], ['حدّة الصوت', function (s) { return pitchName(+s.f); }, ''], ['هل يُسمع؟', function (s) { var f = +s.f; return f < 20 || f > 20000 ? 'لا' : lvl(s) <= 0 ? 'بالكاد' : 'نعم'; }, ''], ['تحذير', function (s) { return lvl(s) >= 120 ? 'مؤلم!' : lvl(s) >= 85 ? 'يضر السمع' : 'آمن'; }, '']],
      tasks: [['قارن حدّة صوت تردده ١٠٠ هرتز بآخر ٤٠٠٠ هرتز.', function (s) { return s.pl && s.ph; }], ['اجعل الشدة عند المستمع ٨٥ ديسبل أو أكثر.', function (s) { return s.loud; }], ['جرّب ترددًا تحت سمعي وآخر فوق سمعي.', function (s) { return s.lo && s.hi; }], ['سجّل ثلاث قراءات بمسافات مختلفة.', function (s) { var d = {}; s.rows.forEach(function (r) { d[r[0]] = 1; }); return Object.keys(d).length >= 3; }]],
      cols: ['المسافة م', 'الشدة ديسبل', 'الحدّة'], rec: function (s) { return [s.d, lvl(s), pitchName(+s.f)]; },
      quiz: [{ q: 'ما الذي يحدد حدّة الصوت؟', o: ['شدته', 'تردده', 'سرعته'], a: 1 }, { q: 'ماذا يحدث لشدة الصوت كلما ابتعد المستمع عن المصدر؟', o: ['تزداد', 'تتناقص', 'لا تتغير'], a: 1, why: 'تنتشر الطاقة على مساحة أكبر.' }, { q: 'التعرض الدائم لأصوات تتجاوز … قد يسبب تلف السمع:', o: ['٢٠ ديسبل', '٥٠ ديسبل', '٨٥ ديسبل'], a: 2 }],
      end: function () { return '<b>الحدّة</b> تعتمد على التردد (١٠٠ هرتز غليظ و٤٠٠٠ هرتز حاد)، ولا يسمع الإنسان إلا بين <b>٢٠ و٢٠٠٠٠ هرتز</b>. أما <b>الشدة</b> فتعتمد على طاقة الاهتزاز وتتناقص بالابتعاد عن المصدر، وما فوق ٨٥ ديسبل قد يتلف السمع.'; },
      draw: function (x, s, t) {
        benchBg(x, 420, '#FDF2F8', '#FCE7F3'); var f = +s.f, Lv = lvl(s), sx = 880, lx = 880 - s.d * 90;
        x.fillStyle = '#1F2937'; rr(x, sx, 150, 80, 140, 12); x.fill(); x.fillStyle = '#4B5563'; x.beginPath(); x.arc(sx + 40, 220, 30 + Math.sin(t / 30) * Math.min(6, s.L / 20), 0, 7); x.fill();
        var sp = f < 20 ? 160 : f > 20000 ? 12 : Math.max(16, 120 - Math.log10(f) * 26), off = (t / 8) % sp;
        for (var r = off; r < 860; r += sp) { var a = Math.max(0, (s.L / 120) * (1 - r / 900)); x.strokeStyle = 'rgba(219,39,119,' + a + ')'; x.lineWidth = 2 + s.L / 30; x.beginPath(); x.arc(sx + 20, 220, r, Math.PI * .75, Math.PI * 1.25); x.stroke(); }
        x.font = '56px sans-serif'; x.textAlign = 'center'; x.fillText('🧍', lx, 250);
        gauge(x, 180, 120, 70, Lv, 140, 'ديسبل', Lv >= 85 ? '#DC2626' : '#DB2777');
        T(x, n(Lv) + ' ديسبل', 180, 160, 22, '#831843');
        x.strokeStyle = '#475569'; x.lineWidth = 2; x.beginPath(); x.moveTo(lx, 330); x.lineTo(sx, 330); x.stroke(); T(x, n(s.d) + ' م', (lx + sx) / 2, 355, 16, '#475569');
      } });
  };

  // ── ٧) الصدى وتحديد المواقع ──
  S.lab_echo = function (c, api) {
    return inq(c, api, { name: 'مختبر الصدى', icon: '🦇', sub: 'أطلق نبضة صوتية نحو الجدار وقِس زمن عودة الصدى لتحسب المسافة (سرعة الصوت ٣٤٣ م/ث)', h: 400,
      init: function () { return { d: 85, wall: 'hard', run: -1, soft: 0, hard: 0, ds: {} }; },
      ctl: [{ k: 'd', label: 'بعد الجدار', min: 17, max: 170, step: 17, unit: 'م' }, { k: 'wall', label: 'سطح الجدار', opts: [['hard', '🧱 صلب'], ['soft', '🧽 مبطن بمادة لينة']] }],
      act: [['🦇 أطلق نبضة', function (s) { s.run = 0; s.rd = s.d; s.rw = s.wall; s.res = null; }]],
      tick: function (s, dt) { if (s.run >= 0) { s.run += dt / (2 * s.rd / 343 * 2.2); if (s.run >= 1) { s.run = -1; if (s.rw === 'soft') { s.soft = 1; s.res = 'soft'; } else { s.hard = 1; s.res = { d: s.rd, t: Math.round(2 * s.rd / 343 * 100) / 100 }; } } } },
      read: [['زمن الصدى', function (s) { return s.res && s.res.t ? f2(s.res.t) : '—'; }, 'ث'], ['المسافة المحسوبة', function (s) { return s.res && s.res.t ? n(Math.round(343 * s.res.t / 2)) : '—'; }, 'م'], ['الصدى', function (s) { return s.res === 'soft' ? 'ضعيف جدًّا (امتُص)' : s.res ? 'واضح' : '—'; }, '']],
      tasks: [['أطلق نبضة نحو جدار صلب واستقبل الصدى.', function (s) { return s.hard; }], ['بطّن الجدار بمادة لينة وأطلق نبضة.', function (s) { return s.soft; }], ['سجّل قياسين لمسافتين مختلفتين.', function (s) { return s.rows.length >= 2; }]],
      cols: ['المسافة الحقيقية م', 'زمن الصدى ث', 'المسافة المحسوبة م'], rec: function (s) { if (!s.res || !s.res.t) { s.toast('أطلق نبضة نحو جدار صلب أولًا', true); return null; } return [s.res.d, s.res.t, Math.round(343 * s.res.t / 2)]; },
      quiz: [{ q: 'لماذا نقسم على ٢ عند حساب المسافة من زمن الصدى؟', o: ['لأن الصوت يقطع المسافة ذهابًا وإيابًا', 'لأن سرعة الصوت تقل للنصف'], a: 0 }, { q: 'لماذا تُبطن جدران القاعات بمواد لينة؟', o: ['لتمتص طاقة الموجات الصوتية وتمنع الصدى', 'لتعكس الصوت أكثر'], a: 0 }, { q: 'أي المخلوقات تستخدم الصدى لتحديد المواقع؟', o: ['الخفافيش والدلافين', 'القطط والكلاب'], a: 0 }],
      end: function () { return 'المسافة = <b>سرعة الصوت × زمن الصدى ÷ ٢</b>؛ لأن النبضة تذهب وتعود. وهكذا تحدد الخفافيش والدلافين مواقع الأجسام، أما الجدار المبطن بمادة لينة فيمتص الطاقة فلا يتكون صدى واضح.'; },
      draw: function (x, s, t) {
        night(x, 400); var wx = 120 + s.d / 170 * 760; x.fillStyle = s.wall === 'hard' ? '#78716C' : '#A78BFA'; x.fillRect(wx, 60, 40, 280);
        if (s.wall === 'soft') for (var i = 0; i < 9; i++) { x.fillStyle = '#7C3AED'; x.beginPath(); x.moveTo(wx, 70 + i * 30); x.lineTo(wx - 14, 85 + i * 30); x.lineTo(wx, 100 + i * 30); x.fill(); }
        x.font = '58px sans-serif'; x.textAlign = 'center'; x.fillText('🦇', 80, 220);
        if (s.run >= 0) { var u = s.run < .5 ? s.run * 2 : 2 - s.run * 2, X = 110 + u * (wx - 110), back = s.run >= .5, a = back && s.rw === 'soft' ? .12 : .9; for (var k = 0; k < 4; k++) { x.strokeStyle = (back ? 'rgba(250,204,21,' : 'rgba(244,114,182,') + (a - k * .18) + ')'; x.lineWidth = 5; x.beginPath(); x.arc(back ? X + 40 : X - 40, 200, 40 + k * 10, back ? Math.PI * .7 : -Math.PI * .3, back ? Math.PI * 1.3 : Math.PI * .3); x.stroke(); } pill(x, '⏱ ' + f2(s.run * 2 * s.rd / 343) + ' ث', 500, 375, 18, '#7C3AED'); }
        x.strokeStyle = 'rgba(255,255,255,.4)'; x.setLineDash([6, 6]); x.beginPath(); x.moveTo(110, 330); x.lineTo(wx, 330); x.stroke(); x.setLineDash([]); T(x, n(s.d) + ' م', (110 + wx) / 2, 320, 16, '#E9D5FF');
      } });
  };

  // ── ٨) مستكشف الطيف الكهرومغناطيسي ──
  S.lab_spectrum = function (c, api) {
    function lam(p) { return Math.pow(10, -12 + p * 15 / 100); }
    function kind(l) { return l > .3 ? ['موجات الراديو', 'نقل المعلومات إلى المذياع والتلفاز'] : l > 1e-3 ? ['الميكروويف', 'تسخين الطعام والهاتف النقال'] : l > 700e-9 ? ['تحت الحمراء', 'جهاز التحكم وتصدرها الأجسام الساخنة'] : l >= 400e-9 ? ['الضوء المرئي', 'الرؤية والألوان'] : l >= 10e-9 ? ['فوق البنفسجية', 'فيتامين د، وتحرق الجلد'] : l >= 1e-11 ? ['الأشعة السينية', 'تصوير العظام'] : ['أشعة جاما', 'قتل البكتيريا في الأطعمة']; }
    function fl(l) { return l >= 1 ? f1(l) + ' م' : l >= 1e-3 ? f1(l * 1e3) + ' مم' : l >= 1e-6 ? f1(l * 1e6) + ' ميكرومتر' : l >= 1e-9 ? n(Math.round(l * 1e9)) + ' نانومتر' : f2(l * 1e12) + ' بيكومتر'; }
    function ff(l) { var f = 3e8 / l, u = [[1e18, 'مليون تريليون'], [1e15, 'ألف تريليون'], [1e12, 'تريليون'], [1e9, 'بليون'], [1e6, 'مليون'], [1e3, 'ألف'], [1, '']]; for (var i = 0; i < u.length; i++) if (f >= u[i][0]) return n(Math.round(f / u[i][0] * 10) / 10) + ' ' + u[i][1] + ' هرتز'; return n(Math.round(f)) + ' هرتز'; }
    function vcol(l) { var u = (l * 1e9 - 400) / 300; var i = Math.max(0, Math.min(6, Math.round((1 - u) * 6))); return RAIN[i]; }
    return inq(c, api, { name: 'مستكشف الطيف الكهرومغناطيسي', icon: '🌈', sub: 'حرّك المنزلق واقرأ نوع الموجة وترددها؛ الضوء المرئي حزمة ضيقة جدًّا فحرّك ببطء (أو بأسهم لوحة المفاتيح)', h: 400,
      init: function () { return { p: 76, got: {} }; },
      ctl: [{ k: 'p', label: 'الطول الموجي ← من القصير إلى الطويل', min: 0, max: 100, step: 0.1, unit: '' }],
      tick: function (s) { s.got[kind(lam(s.p))[0]] = 1; var l = lam(s.p) * 1e9; if (l >= 400 && l < 480) s.vio = 1; if (l > 620 && l <= 700) s.red = 1; },
      read: [['نوع الموجة', function (s) { return kind(lam(s.p))[0]; }, ''], ['الطول الموجي', function (s) { return fl(lam(s.p)); }, ''], ['التردد', function (s) { return ff(lam(s.p)); }, ''], ['من استخداماتها', function (s) { return kind(lam(s.p))[1]; }, '']],
      tasks: [['اعثر على موجات الراديو.', function (s) { return s.got['موجات الراديو']; }], ['اعثر على الضوء البنفسجي ثم الأحمر في الطيف المرئي.', function (s) { return s.vio && s.red; }], ['اعثر على الأشعة فوق البنفسجية والأشعة تحت الحمراء.', function (s) { return s.got['فوق البنفسجية'] && s.got['تحت الحمراء']; }], ['اعثر على أشعة جاما.', function (s) { return s.got['أشعة جاما']; }]],
      quiz: [{ q: 'كلما زاد الطول الموجي للموجة الكهرومغناطيسية فإن ترددها:', o: ['يزداد', 'يقل', 'لا يتغير'], a: 1 }, { q: 'أي الموجات تحمل أكبر طاقة؟', o: ['موجات الراديو', 'الضوء المرئي', 'أشعة جاما'], a: 2 }, { q: 'مدى أطوال الضوء المرئي:', o: ['١٠–٤٠٠ نانومتر', '٤٠٠–٧٠٠ نانومتر', 'أكبر من ٠٫٣ م'], a: 1 }],
      end: function () { return 'تختلف موجات الطيف الكهرومغناطيسي <b>في الطول الموجي والتردد والطاقة فقط</b>؛ فموجات الراديو أطولها وأقلها ترددًا وطاقة، وأشعة جاما أقصرها وأعلاها، والضوء المرئي حزمة ضيقة بين <b>٤٠٠ و٧٠٠ نانومتر</b>.'; },
      draw: function (x, s, t) {
        night(x, 400); var Z = [[0, 'جاما'], [6.67, 'سينية'], [26.67, 'فوق بنفسجية'], [37.35, ''], [38.97, 'تحت حمراء'], [60, 'ميكروويف'], [76.5, 'راديو'], [100, '']], X0 = 80, W = 840, Y = 270;
        var cols = ['#7F1D1D', '#9D174D', '#6D28D9', null, '#991B1B', '#B45309', '#047857'];
        for (var i = 0; i < 7; i++) { var a = X0 + Z[i][0] / 100 * W, b = X0 + Z[i + 1][0] / 100 * W; if (cols[i]) { x.fillStyle = cols[i]; x.fillRect(a, Y, b - a, 50); T(x, Z[i][1], (a + b) / 2, Y + 32, 15, '#fff'); } else { var g = x.createLinearGradient(a, 0, b, 0); RAIN.slice().reverse().forEach(function (q, j) { g.addColorStop(j / 6, q); }); x.fillStyle = g; x.fillRect(a, Y, b - a, 50); } }
        T(x, '← أطوال أقصر · طاقة أكبر', 230, Y + 80, 15, '#C4B5FD'); T(x, 'أطوال أطول · طاقة أقل →', 770, Y + 80, 15, '#C4B5FD');
        var mx = X0 + s.p / 100 * W; x.fillStyle = '#FACC15'; x.beginPath(); x.moveTo(mx, Y - 4); x.lineTo(mx - 12, Y - 24); x.lineTo(mx + 12, Y - 24); x.fill(); x.fillRect(mx - 2, Y, 4, 50);
        var l = lam(s.p), vis = l >= 400e-9 && l <= 700e-9, wl = 14 + s.p * 2.6, col = vis ? vcol(l) : '#A5B4FC';
        x.strokeStyle = col; x.lineWidth = 4; x.shadowColor = col; x.shadowBlur = vis ? 16 : 0; x.beginPath(); for (var X = 80; X <= 920; X += 2) x.lineTo(X, 130 - 55 * Math.sin(2 * Math.PI * (X - t / 6) / wl)); x.stroke(); x.shadowBlur = 0;
        pill(x, kind(l)[0], 500, 40, 20, '#6D28D9');
      } });
  };

  // ── ٩) تجربة: فصل الأطوال الموجية بالمنشور ──
  S.lab_prism = function (c, api) {
    var SRC = { sun: ['ضوء الشمس', 1], torch: ['مصباح يدوي', 1], laser: ['ليزر أحمر', 0] };
    return inq(c, api, { name: 'مختبر المنشور', icon: '🔦', sub: 'سلّط ضوء كل مصدر على المنشور، وغيّر زاوية السقوط، ولاحظ الضوء الخارج', h: 420,
      init: function () { return { src: 'sun', ang: 0, got: {} }; },
      ctl: [{ k: 'src', label: 'مصدر الضوء', opts: [['sun', '☀ الشمس'], ['torch', '🔦 مصباح يدوي'], ['laser', '🔴 ليزر']] }, { k: 'ang', label: 'تدوير المنشور', min: -10, max: 10, step: 2, unit: '°' }],
      tick: function (s) { s.got[s.src] = 1; },
      read: [['المصدر', function (s) { return SRC[s.src][0]; }, ''], ['الضوء الخارج', function (s) { return SRC[s.src][1] ? 'سبعة ألوان' : 'لون واحد (أحمر)'; }, ''], ['الأكثر انكسارًا', function (s) { return SRC[s.src][1] ? 'البنفسجي' : '—'; }, '']],
      tasks: [['سلّط ضوء الشمس على المنشور.', function (s) { return s.got.sun; }], ['سلّط ضوء المصباح اليدوي.', function (s) { return s.got.torch; }], ['سلّط ضوء الليزر (لا تسلّطه على العيون!).', function (s) { return s.got.laser; }], ['سجّل نتيجة المصادر الثلاثة في الجدول.', function (s) { var d = {}; s.rows.forEach(function (r) { d[r[0]] = 1; }); return Object.keys(d).length >= 3; }]],
      cols: ['المصدر', 'الألوان الخارجة'], rec: function (s) { return [SRC[s.src][0], SRC[s.src][1] ? 'سبعة ألوان' : 'لون واحد']; },
      quiz: [{ q: 'هل للضوء الصادر عن الشمس والمصباح أطوال موجية مختلفة؟', o: ['نعم؛ تحلل إلى ألوان', 'لا؛ بقي لونًا واحدًا'], a: 0 }, { q: 'هل لضوء الليزر أطوال موجية مختلفة؟', o: ['نعم', 'لا؛ له طول موجي واحد تقريبًا'], a: 1 }, { q: 'أي الألوان ينكسر أقل في المنشور؟', o: ['الأحمر', 'البنفسجي', 'الأخضر'], a: 0 }],
      end: function () { return 'تحلل ضوء الشمس والمصباح إلى <b>ألوان الطيف</b>؛ لأن كل طول موجي ينكسر بمقدار مختلف (البنفسجي أكثر والأحمر أقل)، أما <b>الليزر</b> فخرج بلون واحد لأن له طولًا موجيًّا واحدًا تقريبًا.'; },
      draw: function (x, s, t) {
        night(x, 420); var cx = 480, cy = 230, R = 130, a0 = s.ang * Math.PI / 180;
        var P = [0, 1, 2].map(function (i) { var a = a0 - Math.PI / 2 + i * 2 * Math.PI / 3; return [cx + R * Math.cos(a), cy + 20 + R * Math.sin(a)]; });
        var hx = 60, hy = 270, ex = (P[0][0] + P[2][0]) / 2 - 10, ey = (P[0][1] + P[2][1]) / 2 + 10;
        ray(x, hx, hy, ex, ey, s.src === 'laser' ? '#EF4444' : '#F8FAFC', s.src === 'laser' ? 4 : 8);
        var ox = (P[0][0] + P[1][0]) / 2 + 10, oy = (P[0][1] + P[1][1]) / 2 + 10;
        x.strokeStyle = s.src === 'laser' ? 'rgba(239,68,68,.6)' : 'rgba(255,255,255,.5)'; x.lineWidth = s.src === 'laser' ? 3 : 6; x.beginPath(); x.moveTo(ex, ey); x.lineTo(ox, oy); x.stroke();
        if (SRC[s.src][1]) RAIN.forEach(function (q, i) { ray(x, ox, oy, 960, 230 + i * 26 + s.ang * 4, q, 6); T(x, RAINN[i], 900, 225 + i * 26 + s.ang * 4, 13, q); });
        else ray(x, ox, oy, 960, 250 + s.ang * 4, '#EF4444', 4);
        x.fillStyle = 'rgba(199,210,254,.28)'; x.strokeStyle = '#E0E7FF'; x.lineWidth = 3; x.beginPath(); x.moveTo(P[0][0], P[0][1]); x.lineTo(P[1][0], P[1][1]); x.lineTo(P[2][0], P[2][1]); x.closePath(); x.fill(); x.stroke();
        x.font = '46px sans-serif'; x.textAlign = 'center'; x.fillText({ sun: '☀', torch: '🔦', laser: '🔴' }[s.src], 50, 240);
        if (s.src === 'laser') pill(x, '⚠ لا تسلّط الليزر على العيون', 500, 40, 17, '#B91C1C');
      } });
  };

  // ── ١٠) العين: تكوين الصورة وتصحيح عيوب الإبصار ──
  S.lab_eye = function (c, api) {
    function off(s) { var o = 0; if (s.eye === 'my' && s.obj === 'far') o = -1; if (s.eye === 'hy' && s.obj === 'near') o = 1; if (s.lens === 'cc') o += 1; if (s.lens === 'cv') o -= 1; return o; }
    return inq(c, api, { name: 'مختبر العين', icon: '👁', sub: 'اختر الجسم ونوع العين والعدسة المصحِّحة، وتتبّع أين تتجمع الأشعة', h: 420,
      init: function () { return { obj: 'far', eye: 'nl', lens: 'none', nf: 0, nn: 0, myB: 0, myF: 0, hyB: 0, hyF: 0 }; },
      ctl: [{ k: 'obj', label: 'الجسم', opts: [['far', '🏔 بعيد'], ['near', '⌚ قريب']] }, { k: 'eye', label: 'العين', opts: [['nl', 'سليمة'], ['my', 'قصر النظر'], ['hy', 'طول النظر']] }, { k: 'lens', label: 'نظارة', opts: [['none', 'بلا نظارة'], ['cc', 'عدسة مقعرة'], ['cv', 'عدسة محدبة']] }],
      tick: function (s) { var o = off(s); if (s.eye === 'nl' && s.lens === 'none') { if (s.obj === 'far') s.nf = 1; else s.nn = 1; } if (s.eye === 'my' && s.obj === 'far') { if (s.lens === 'none') s.myB = 1; if (s.lens === 'cc' && o === 0) s.myF = 1; } if (s.eye === 'hy' && s.obj === 'near') { if (s.lens === 'none') s.hyB = 1; if (s.lens === 'cv' && o === 0) s.hyF = 1; } },
      read: [['تتجمع الأشعة', function (s) { var o = off(s); return o < 0 ? 'قبل الشبكية' : o > 0 ? 'خلف الشبكية' : 'على الشبكية'; }, ''], ['الصورة', function (s) { return off(s) ? 'غير واضحة' : 'واضحة'; }, ''], ['شكل عدسة العين', function (s) { return s.obj === 'near' ? 'أكثر تحدبًا' : 'أكثر انبساطًا'; }, '']],
      tasks: [['في العين السليمة انظر إلى جسم بعيد ثم قريب، ولاحظ شكل العدسة.', function (s) { return s.nf && s.nn; }], ['اعرض قصر النظر مع جسم بعيد، ثم صحّحه بالعدسة المناسبة.', function (s) { return s.myB && s.myF; }], ['اعرض طول النظر مع جسم قريب، ثم صحّحه بالعدسة المناسبة.', function (s) { return s.hyB && s.hyF; }]],
      quiz: [{ q: 'أين تتكون صورة الجسم البعيد في عين مصاب بقصر النظر؟', o: ['قبل الشبكية', 'على الشبكية', 'خلف الشبكية'], a: 0 }, { q: 'يُصحَّح قصر النظر بعدسات:', o: ['محدبة', 'مقعرة'], a: 1 }, { q: 'تصبح عدسة العين أكثر تحدبًا عند النظر إلى:', o: ['جسم قريب', 'جسم بعيد'], a: 0 }],
      end: function () { return 'تغيّر العين السليمة شكل عدستها: <b>أكثر تحدبًا للقريب وأكثر انبساطًا للبعيد</b>. في <b>قصر النظر</b> تتكون صورة البعيد قبل الشبكية وتصححها <b>العدسة المقعرة</b>، وفي <b>طول النظر</b> لا يتجمع ضوء القريب عند الشبكية وتصححها <b>العدسة المحدبة</b>.'; },
      draw: function (x, s, t) {
        benchBg(x, 420, '#ECFEFF', '#CFFAFE'); var ex = 430, ey = 210, R = 150, rx = ex - R + 12, lx = ex + R - 45, o = off(s), fx = rx + o * 60;
        x.fillStyle = '#FFF7ED'; x.beginPath(); x.arc(ex, ey, R, 0, 7); x.fill(); x.strokeStyle = '#FB923C'; x.lineWidth = 8; x.beginPath(); x.arc(ex, ey, R, Math.PI * .62, Math.PI * 1.38); x.stroke(); T(x, 'الشبكية', rx - 10, ey + R + 6, 15, '#C2410C');
        x.strokeStyle = '#94A3B8'; x.lineWidth = 3; x.beginPath(); x.arc(ex, ey, R, -Math.PI * .3, Math.PI * .3); x.stroke(); x.strokeStyle = '#38BDF8'; x.lineWidth = 4; x.beginPath(); x.arc(ex + R - 30, ey, 60, -Math.PI * .35, Math.PI * .35); x.stroke(); T(x, 'القرنية', ex + R + 30, ey - 70, 14, '#0369A1');
        var lw = s.obj === 'near' ? 26 : 14; x.fillStyle = 'rgba(14,165,233,.35)'; x.strokeStyle = '#0284C7'; x.lineWidth = 2; x.beginPath(); x.ellipse(lx, ey, lw, 60, 0, 0, 7); x.fill(); x.stroke(); T(x, 'العدسة', lx, ey - 72, 14, '#0369A1');
        var hs = [-45, -22, 0, 22, 45], sx = s.obj === 'near' ? 780 : 1000; hs.forEach(function (h) { var sy = s.obj === 'near' ? ey + h * .3 - 40 : ey + h; x.strokeStyle = 'rgba(250,204,21,.95)'; x.lineWidth = 3; x.beginPath(); x.moveTo(sx, sy); x.lineTo(lx, ey + h); x.lineTo(fx, ey); if (o < 0) x.lineTo(rx, ey + (ey + h - ey) * -(rx - fx) / (lx - fx)); x.stroke(); });
        if (s.lens !== 'none') { var gx = 680; x.strokeStyle = '#6D28D9'; x.lineWidth = 6; x.beginPath(); if (s.lens === 'cc') { x.moveTo(gx - 12, ey - 70); x.quadraticCurveTo(gx + 6, ey, gx - 12, ey + 70); x.moveTo(gx + 12, ey - 70); x.quadraticCurveTo(gx - 6, ey, gx + 12, ey + 70); } else { x.moveTo(gx, ey - 70); x.quadraticCurveTo(gx - 26, ey, gx, ey + 70); x.moveTo(gx, ey - 70); x.quadraticCurveTo(gx + 26, ey, gx, ey + 70); } x.stroke(); T(x, s.lens === 'cc' ? 'مقعرة' : 'محدبة', gx, ey + 98, 15, '#6D28D9'); }
        x.font = s.obj === 'near' ? '44px sans-serif' : '40px sans-serif'; x.textAlign = 'center'; x.fillText(s.obj === 'near' ? '⌚' : '🏔', s.obj === 'near' ? 820 : 950, s.obj === 'near' ? ey - 30 : 90);
        x.fillStyle = '#fff'; rr(x, 30, 30, 150, 120, 14); x.fill(); x.strokeStyle = '#CBD5E1'; x.lineWidth = 2; rr(x, 30, 30, 150, 120, 14); x.stroke(); T(x, 'ما تراه الشبكية', 105, 170, 14, '#334155');
        x.save(); if (o) x.filter = 'blur(5px)'; F(x, 64); x.fillStyle = '#0F172A'; x.textAlign = 'center'; x.fillText(s.obj === 'near' ? '⌚' : 'E', 105, 115); x.restore();
      } });
  };

  // ── ١١) الاستقصاء: انحناء الضوء ──
  S.lab_bendlight = function (c, api) {
    var SF = { mirror: ['مرآة', 'ينعكس', 'لا يتغير (أبيض)'], cd: ['علبة قرص مدمج', 'ينفذ وينكسر قليلًا', 'لا يتغير غالبًا'], water: ['كأس ماء', 'ينفذ وينكسر', 'ألوان خفيفة عند الحواف'], prism: ['منشور', 'ينكسر ويتحلل', 'ألوان الطيف'] };
    return inq(c, api, { name: 'مختبر انحناء الضوء', icon: '🔦', sub: 'في غرفة مظلمة: أسقط شعاع المصباح على كل سطح بزاوية، ثم سجّل ملاحظتك', h: 420,
      init: function () { return { sf: 'mirror', ang: 40, got: {} }; },
      ctl: [{ k: 'sf', label: 'السطح', opts: [['mirror', '🪞 مرآة'], ['cd', '💿 علبة قرص مدمج'], ['water', '🥛 كأس ماء'], ['prism', '🔺 منشور']] }, { k: 'ang', label: 'زاوية السقوط', min: 10, max: 70, step: 5, unit: '°' }],
      tick: function (s) { s.got[s.sf] = 1; },
      read: [['كيف يتأثر الشعاع؟', function (s) { return SF[s.sf][1]; }, ''], ['الألوان المتكونة', function (s) { return SF[s.sf][2]; }, ''], ['زاوية السقوط', function (s) { return n(s.ang) + '°'; }, '']],
      tasks: [['أسقط الضوء على السطوح الأربعة.', function (s) { return s.got.mirror && s.got.cd && s.got.water && s.got.prism; }], ['سجّل نتائج السطوح الأربعة في جدول البيانات.', function (s) { var d = {}; s.rows.forEach(function (r) { d[r[0]] = 1; }); return Object.keys(d).length >= 4; }]],
      cols: ['السطح', 'كيف يتأثر الشعاع؟', 'الألوان المتكونة'], rec: function (s) { return SF[s.sf].slice(); },
      quiz: [{ q: 'أي الأجسام عكس الضوء؟', o: ['المرآة', 'المنشور', 'كأس الماء'], a: 0 }, { q: 'أي الأجسام جعل الضوء ينكسر ويتحلل إلى ألوان؟', o: ['المرآة', 'المنشور', 'علبة القرص'], a: 1 }, { q: 'لماذا يغيّر الشعاع اتجاهه عند دخوله علبة القرص بزاوية؟', o: ['لأن سرعته تتغير عند انتقاله إلى البلاستيك', 'لأنه ينعكس كله'], a: 0 }],
      end: function () { return '<b>المرآة تعكس الضوء</b>، و<b>علبة القرص والماء</b> ينفذ الضوء خلالهما وينكسر لتغير سرعته، أما <b>المنشور</b> فيكسر الضوء الأبيض ويحلله إلى ألوان الطيف؛ لأن كل لون ينكسر بمقدار مختلف.'; },
      draw: function (x, s, t) {
        night(x, 420); var a = s.ang * Math.PI / 180, cx = 500, cy = 250, L = 260, sx = cx + L * Math.sin(a), sy = cy - L * Math.cos(a);
        x.fillStyle = '#334155'; x.fillRect(0, 330, 1000, 90);
        if (s.sf === 'mirror') { x.fillStyle = '#CBD5E1'; x.fillRect(330, cy, 340, 16); ray(x, sx, sy, cx, cy, '#F8FAFC'); ray(x, cx, cy, cx - L * Math.sin(a), cy - L * Math.cos(a), '#F8FAFC'); }
        else if (s.sf === 'cd') { x.fillStyle = 'rgba(203,213,225,.35)'; x.strokeStyle = '#E2E8F0'; x.lineWidth = 2; x.fillRect(340, cy, 320, 40); x.strokeRect(340, cy, 320, 40); var b = Math.asin(Math.sin(a) / 1.5); ray(x, sx, sy, cx, cy, '#F8FAFC'); ray(x, cx, cy, cx - 40 * Math.tan(b), cy + 40, '#F8FAFC', 5); ray(x, cx - 40 * Math.tan(b), cy + 40, cx - 40 * Math.tan(b) - 120 * Math.sin(a), cy + 40 + 120 * Math.cos(a) * .6, '#F8FAFC', 5); ray(x, cx, cy, cx - 160 * Math.sin(a), cy - 160 * Math.cos(a), 'rgba(248,250,252,.25)', 3); }
        else if (s.sf === 'water') { x.fillStyle = 'rgba(56,189,248,.35)'; x.fillRect(400, cy - 60, 200, 140); x.strokeStyle = '#E2E8F0'; x.lineWidth = 3; x.strokeRect(400, cy - 100, 200, 180); var ix = 600, iy = cy - 10, b2 = .5 * a; ray(x, ix + 260 * Math.cos(.35 + a / 3), iy - 120 * Math.sin(a), ix, iy, '#F8FAFC'); ray(x, ix, iy, 400, iy + 200 * Math.tan(b2) * .5, '#F8FAFC', 5); ray(x, 400, iy + 200 * Math.tan(b2) * .5, 160, iy + 200 * Math.tan(b2) * .5 + 120 * Math.sin(a), '#F8FAFC', 5); ['#EF4444', '#3B82F6'].forEach(function (q, i) { ray(x, 400, iy + 200 * Math.tan(b2) * .5 + i * 4, 170, iy + 200 * Math.tan(b2) * .5 + 120 * Math.sin(a) + 8 + i * 10, q, 2); }); }
        else { var P = [[500, 140], [400, 320], [600, 320]]; ray(x, 960, 140 + s.ang * 1.2, 555, 235, '#F8FAFC'); RAIN.forEach(function (q, i) { ray(x, 445, 245, 60, 250 + i * 22 + s.ang * .8, q, 5); }); x.fillStyle = 'rgba(199,210,254,.3)'; x.strokeStyle = '#E0E7FF'; x.lineWidth = 3; x.beginPath(); x.moveTo(P[0][0], P[0][1]); x.lineTo(P[1][0], P[1][1]); x.lineTo(P[2][0], P[2][1]); x.closePath(); x.fill(); x.stroke(); }
        x.font = '44px sans-serif'; x.textAlign = 'center'; if (s.sf !== 'prism' && s.sf !== 'water') x.fillText('🔦', sx + 18, sy - 6); else x.fillText('🔦', s.sf === 'prism' ? 965 : 900, s.sf === 'prism' ? 130 + s.ang * 1.2 : 120);
        pill(x, SF[s.sf][0] + ': ' + SF[s.sf][1], 500, 390, 18, '#6D28D9');
      } });
  };
  return S;
})();

/* التجارب الافتراضية: ينفّذ الطالب خطوات التجربة بنفسه خطوة خطوة ويسجّل البيانات */
(function () {
  var S = window.SIMS = window.SIMS || {};
  var AR = '٠١٢٣٤٥٦٧٨٩';
  function n(v) { return String(v).replace(/\d/g, function (d) { return AR[d]; }).replace('.', '٫'); }
  function F(x, sz) { x.font = '700 ' + sz + 'px Cairo, Tahoma, sans-serif'; }
  function T(x, s, X, Y, sz, col, al) { F(x, sz); x.fillStyle = col || '#fff'; x.textAlign = al || 'center'; x.direction = 'rtl'; x.fillText(s, X, Y); }
  function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
  function rnd(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }

  // مشغّل عام: خطوات بأزرار، وتقدّم تلقائي عند تحقق شرط الخطوة، وجدول بيانات، واستنتاج
  function lab(c, api, o) {
    var cv = document.createElement('canvas'); cv.width = 1000; cv.height = o.h || 460; c.appendChild(cv); var x = cv.getContext('2d');
    var panel = document.createElement('div'); panel.className = 'labp'; c.appendChild(panel);
    panel.innerHTML = '<div class="labstep"></div><div class="labbtns"></div><div class="labtab"></div><div class="labend" hidden></div>';
    var st = o.init ? o.init() : {}, k = -1, lastTab = '';
    st.T = 0; st.click = null;
    cv.addEventListener('click', function (e) { var r = cv.getBoundingClientRect(); st.click = [(e.clientX - r.left) * 1000 / r.width, (e.clientY - r.top) * LH / r.height]; });
    function next() {
      k++; api.step(k);
      if (k >= o.steps.length) { panel.querySelector('.labstep').innerHTML = '✅ أتممت خطوات التجربة!'; panel.querySelector('.labbtns').innerHTML = ''; var e = panel.querySelector('.labend'); e.hidden = false; e.innerHTML = '🔎 <b>الملاحظة والاستنتاج:</b> ' + o.end(st); api.done && api.done(); return; }
      var s = o.steps[k]; panel.querySelector('.labstep').innerHTML = '<span class="labn">' + n(k + 1) + '</span> <span class="labsay">' + s.say + '</span>';
      var bx = panel.querySelector('.labbtns'); bx.innerHTML = s.ui || '';
      (s.btns || []).forEach(function (b) { var e = document.createElement('button'); e.className = 'btn sm'; e.innerHTML = b[0]; e.onclick = function () { b[1](st, e); }; bx.appendChild(e); });
      if (s.bind) s.bind(st, bx);
    }
    next();
    var on = true;
    (function loop(t) {
      if (!on) return; st.T = t;
      o.draw(x, st, t, k);
      st.click = null;
      if (k < o.steps.length && o.steps[k].ok && o.steps[k].ok(st)) { if (!st._w) st._w = t; if (t - st._w > 700) { st._w = 0; next(); } }
      var tb = o.table ? o.table(st) : '';
      if (tb !== lastTab) { panel.querySelector('.labtab').innerHTML = tb; lastTab = tb; }
      requestAnimationFrame(loop);
    })(performance.now());
    return function () { on = false; };
  }
  function table(head, rows) { if (!rows.length) return ''; return '<table class="labt"><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr>' + rows.map(function (r) { return '<tr>' + r.map(function (v) { return '<td>' + n(v) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>'; }
  function bg(x, w, h, c1, c2) { var g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, c1); g.addColorStop(1, c2); x.fillStyle = g; x.fillRect(0, 0, w, h); }
  function table0(x) { x.fillStyle = '#8B5E3C'; x.fillRect(0, 400, 1000, 60); x.fillStyle = '#A47148'; x.fillRect(0, 395, 1000, 10); }

  // ===== الفصل السابع · الدرس الأول: التكثف والتبخر =====
  S.lab_cond = function (c, api) {
    return lab(c, api, {
      init: function () { return { fill: 0, min: 0, run: 0, basin: 0, day: 0, rows: [] }; },
      steps: [
        { say: 'املأ الكأس الزجاجية بالماء المثلّج (سطحها الخارجي جاف).', btns: [['🧊 املأ الكأس', function (s) { s.fill = 1; }]], ok: function (s) { return s.fill; } },
        { say: 'راقب الكأس 10 دقائق… شغّل المؤقت ولاحظ السطح الخارجي.', btns: [['⏱ شغّل المؤقت', function (s) { s.run = 1; }]], ok: function (s) { return s.min >= 10; } },
        { say: 'اسكب 500 مل من الماء في الحوض الواسع.', btns: [['💧 اسكب الماء', function (s) { s.basin = 1; s.rows = [[1, '4.0']]; s.day = 1; }]], ok: function (s) { return s.basin; } },
        { say: 'اترك الحوض أيامًا، وقِس ارتفاع الماء بالمسطرة كل يوم.', btns: [['📏 اليوم التالي: قِس', function (s) { if (s.day < 4) { s.day++; s.rows.push([s.day, (4.5 - s.day * 0.5).toFixed(1)]); } }]], ok: function (s) { return s.day >= 4; } }
      ],
      table: function (s) { return table(['اليوم', 'ارتفاع الماء (سم)'], s.rows); },
      end: function () { return 'تكوّنت قطرات على السطح الخارجي للكأس الباردة: بخار الماء في الهواء <b>تكاثف</b> عند ملامسته السطح البارد. وانخفض ماء الحوض من 4٫0 إلى 2٫5 سم في 3 أيام (0٫5 سم كل يوم) لأن الماء <b>تبخّر</b> إلى الهواء.'; },
      draw: function (x, s, t) {
        bg(x, 1000, 460, '#DBEAFE', '#F8FAFC'); table0(x);
        if (s.run && s.min < 10) s.min = Math.min(10, s.min + 0.04);
        // الكأس
        var gx = 640, gy = 170;
        x.fillStyle = 'rgba(186,230,253,.35)'; x.strokeStyle = '#64748B'; x.lineWidth = 4; x.beginPath(); x.moveTo(gx, gy); x.lineTo(gx + 20, 398); x.lineTo(gx + 160, 398); x.lineTo(gx + 180, gy); x.stroke(); x.fill();
        if (s.fill) { x.fillStyle = 'rgba(56,189,248,.55)'; x.beginPath(); x.moveTo(gx + 8, 220); x.lineTo(gx + 21, 395); x.lineTo(gx + 159, 395); x.lineTo(gx + 172, 220); x.fill(); x.fillStyle = 'rgba(255,255,255,.85)'; [[30, 240], [80, 260], [120, 232], [60, 300]].forEach(function (p) { rr(x, gx + p[0], p[1], 34, 30, 6); x.fill(); }); }
        var drops = Math.floor(s.min * 4);
        var R = rnd(7); for (var i = 0; i < drops; i++) { var yy = 200 + R() * 190, side = i % 2; var xx = side ? gx + 180 - (yy - gy) * 20 / 228 + 4 : gx + (yy - gy) * 20 / 228 - 4; x.fillStyle = '#0EA5E9'; x.beginPath(); x.ellipse(xx, yy, 5, 7, 0, 0, 6.3); x.fill(); }
        T(x, '⏱ ' + n(Math.floor(s.min)) + ' دقيقة', gx + 90, 150, 26, '#0F172A');
        // الحوض
        var bx = 90, by = 300;
        x.fillStyle = '#E2E8F0'; x.strokeStyle = '#475569'; rr(x, bx, by, 360, 98, 10); x.fill(); x.stroke();
        if (s.basin) { var hh = s.rows.length ? +s.rows[s.rows.length - 1][1] : 4; x.fillStyle = 'rgba(59,130,246,.6)'; x.fillRect(bx + 6, 392 - hh * 20, 348, hh * 20); }
        // مسطرة
        x.fillStyle = '#FDE68A'; x.fillRect(bx + 370, 290, 28, 108); x.fillStyle = '#92400E'; for (var m = 0; m <= 5; m++) { x.fillRect(bx + 370, 392 - m * 20, 14, 2); T(x, n(m), bx + 392, 396 - m * 20, 14, '#92400E'); }
        T(x, 'الحوض · اليوم ' + n(s.day || 0), bx + 180, 280, 22, '#0F172A');
        if (s.min >= 10) T(x, '💧 قطرات على السطح الخارجي!', gx + 90, 120, 24, '#0369A1');
      }
    });
  };

  // ===== الفصل السابع · الدرس الثاني: تكوين مركز ضغط منخفض =====
  S.lab_candle = function (c, api) {
    return lab(c, api, {
      init: function () { return { candle: 0, water: 0, lit: 0, cup: 0, f: 1, lvl: 0 }; },
      steps: [
        { say: 'ثبّت شمعة صغيرة في وسط الصحن.', btns: [['🕯 ثبّت الشمعة', function (s) { s.candle = 1; }]], ok: function (s) { return s.candle; } },
        { say: 'صبّ الماء الملوّن في الصحن.', btns: [['💧 صبّ الماء', function (s) { s.water = 1; }]], ok: function (s) { return s.water; } },
        { say: 'يُشعل المعلم الشمعة (ارتدِ النظارة الواقية).', btns: [['🔥 أشعل الشمعة', function (s) { s.lit = 1; }]], ok: function (s) { return s.lit; } },
        { say: 'اقلب الكأس فوق الشمعة في الماء (مع قطعة نقدية تحتها)، وراقب.', btns: [['🥛 اقلب الكأس', function (s) { s.cup = 1; }]], ok: function (s) { return s.cup && s.f <= 0 && s.lvl >= 60; } }
      ],
      end: function () { return 'انطفأت الشمعة بعد استهلاك الأكسجين، وبرد الهواء داخل الكأس فانكمش وقلّ <b>ضغطه</b>؛ فدفع الضغط الجوي الأعلى خارج الكأس الماءَ إلى داخلها فارتفع مستواه. وهذا يشبه تكوّن <b>مركز ضغط منخفض</b> يتحرك إليه الهواء.'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#FEF3C7', '#FFFBEB'); table0(x);
        if (s.cup && s.f > 0) s.f -= 0.004; if (s.cup && s.f <= 0 && s.lvl < 60) s.lvl += 0.5;
        var cx = 500;
        x.fillStyle = '#CBD5E1'; x.beginPath(); x.ellipse(cx, 392, 260, 16, 0, 0, 6.3); x.fill();
        if (s.water) { x.fillStyle = 'rgba(37,99,235,.55)'; x.beginPath(); x.ellipse(cx, 386, 240, 10, 0, 0, 6.3); x.fill(); }
        if (s.candle) { x.fillStyle = '#F8FAFC'; x.fillRect(cx - 14, 320, 28, 68); x.fillStyle = '#334155'; x.fillRect(cx - 1, 310, 2, 10); }
        if (s.lit && s.f > 0) { var fl = 1 + Math.sin(s.T / 80) * .1; x.fillStyle = '#F97316'; x.beginPath(); x.ellipse(cx, 296, 9 * s.f, 20 * s.f * fl, 0, 0, 6.3); x.fill(); x.fillStyle = '#FDE047'; x.beginPath(); x.ellipse(cx, 300, 5 * s.f, 11 * s.f, 0, 0, 6.3); x.fill(); }
        if (s.lit && s.f <= 0) { x.strokeStyle = 'rgba(100,116,139,.6)'; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, 305); x.bezierCurveTo(cx - 15, 270, cx + 15, 250, cx, 225); x.stroke(); }
        if (s.cup) {
          if (s.water) { x.fillStyle = 'rgba(37,99,235,.55)'; x.fillRect(cx - 88, 388 - s.lvl, 176, s.lvl); }
          x.strokeStyle = '#64748B'; x.lineWidth = 4; x.fillStyle = 'rgba(186,230,253,.25)'; x.beginPath(); x.moveTo(cx - 90, 390); x.lineTo(cx - 90, 180); x.lineTo(cx + 90, 180); x.lineTo(cx + 90, 390); x.fill(); x.stroke();
          T(x, s.f > 0 ? 'الشمعة تستهلك الأكسجين…' : 'ارتفع الماء داخل الكأس! ⬆', cx, 160, 26, '#7C2D12');
        }
      }
    });
  };

  // ===== الفصل السابع · المراجعة: محطة رصد جوي =====
  S.lab_station = function (c, api) {
    var D = [[1, 32, 1012, 12, 'شمالية غربية', 0], [2, 29, 1006, 18, 'شمالية', 2], [3, 26, 1003, 25, 'جنوبية غربية', 8]];
    return lab(c, api, {
      init: function () { return { rain: 0, wind: 0, therm: 0, rows: [] }; },
      steps: [
        { say: 'ضع مقياس المطر في مكان مكشوف بعيد عن المباني والأشجار.', btns: [['🧪 ثبّت مقياس المطر', function (s) { s.rain = 1; }]], ok: function (s) { return s.rain; } },
        { say: 'ثبّت الأنيمومتر ودوارة الرياح في مكان مرتفع.', btns: [['🌀 ثبّت الأنيمومتر', function (s) { s.wind = 1; }]], ok: function (s) { return s.wind; } },
        { say: 'ضع الثرمومتر في الظل بعيدًا عن أشعة الشمس المباشرة، والبارومتر بجانبه.', btns: [['☀ في الشمس', function (s) { s.therm = 2; }], ['🌳 في الظل', function (s) { s.therm = 1; }]], ok: function (s) { return s.therm === 1; } },
        { say: 'سجّل قراءات المحطة ثلاثة أيام متتالية.', btns: [['📝 سجّل قراءة اليوم', function (s) { if (s.rows.length < 3) s.rows.push(D[s.rows.length]); }]], ok: function (s) { return s.rows.length >= 3; } }
      ],
      table: function (s) { return table(['اليوم', 'الحرارة °س', 'الضغط (ملّي بار)', 'الرياح كم/س', 'الاتجاه', 'المطر (مم)'], s.rows); },
      end: function () { return 'قراءات محاكاة: انخفض الضغط من 1012 إلى 1003 ملّي بار، وازدادت سرعة الرياح والهطول، وانخفضت الحرارة؛ وهذا يدل على اقتراب <b>منخفض جوي/جبهة باردة</b>، فأتنبأ بطقس غائم ماطر في اليوم التالي.'; },
      draw: function (x, s, t) {
        bg(x, 1000, 460, '#BAE6FD', '#ECFEFF'); x.fillStyle = '#86EFAC'; x.fillRect(0, 380, 1000, 80);
        x.fillStyle = '#166534'; x.beginPath(); x.arc(160, 260, 80, 0, 6.3); x.fill(); x.fillStyle = '#78350F'; x.fillRect(150, 300, 20, 90);
        if (s.therm === 1) { x.fillStyle = '#fff'; rr(x, 200, 300, 26, 80, 12); x.fill(); x.fillStyle = '#DC2626'; x.fillRect(208, 330, 10, 44); T(x, 'ثرمومتر', 213, 295, 18, '#0F172A'); x.fillStyle = '#E5E7EB'; x.beginPath(); x.arc(270, 350, 26, 0, 6.3); x.fill(); T(x, 'بارومتر', 270, 312, 18, '#0F172A'); }
        if (s.therm === 2) T(x, '⚠ أشعة الشمس المباشرة ترفع القراءة خطأً! ضعه في الظل.', 600, 200, 24, '#B91C1C');
        if (s.rain) { x.fillStyle = 'rgba(186,230,253,.7)'; x.strokeStyle = '#475569'; x.lineWidth = 3; x.fillRect(470, 280, 50, 100); x.strokeRect(470, 280, 50, 100); var mm = s.rows.length ? s.rows[s.rows.length - 1][5] : 0; x.fillStyle = '#2563EB'; x.fillRect(472, 378 - mm * 6, 46, mm * 6); T(x, 'مقياس المطر', 495, 270, 18, '#0F172A'); }
        if (s.wind) { var sp = s.rows.length ? s.rows[s.rows.length - 1][3] : 10; x.strokeStyle = '#334155'; x.lineWidth = 5; x.beginPath(); x.moveTo(760, 380); x.lineTo(760, 200); x.stroke(); var a = t / (1200 / sp); for (var i = 0; i < 3; i++) { var aa = a + i * 2.09; x.beginPath(); x.moveTo(760, 200); x.lineTo(760 + Math.cos(aa) * 50, 200 + Math.sin(aa) * 14); x.stroke(); x.fillStyle = '#F59E0B'; x.beginPath(); x.arc(760 + Math.cos(aa) * 50, 200 + Math.sin(aa) * 14, 12, 0, 6.3); x.fill(); } T(x, 'أنيمومتر', 760, 170, 18, '#0F172A'); }
        if (s.rows.length) { var d = s.rows[s.rows.length - 1]; T(x, 'اليوم ' + n(d[0]) + ': ' + n(d[1]) + ' °س · ' + n(d[2]) + ' ملّي بار', 600, 60, 26, '#0F172A'); }
      }
    });
  };

  // ===== الفصل الثامن · الدرس الأول: نموذج فصول الأرض =====
  S.lab_seasons = function (c, api) {
    var P = { jun: ['يونيو', 'الصيف', 89.5, 1.00, 0], sep: ['سبتمبر', 'الخريف', 66, 0.91, 1], dec: ['ديسمبر', 'الشتاء', 42.5, 0.68, 2], mar: ['مارس', 'الربيع', 66, 0.91, 3] };
    return lab(c, api, {
      init: function () { return { lamp: 0, tilt: 0, pos: null, rec: {} }; },
      steps: [
        { say: 'أضئ المصباح (يمثل الشمس)، ثم أطفئ أنوار الغرفة.', btns: [['💡 أضئ المصباح وأطفئ الأنوار', function (s) { s.lamp = 1; }]], ok: function (s) { return s.lamp; } },
        { say: 'أمِل محور الكرة الأرضية حتى تصبح الزاوية 23.5°.', ui: '<label>ميل المحور <input type="range" min="0" max="40" step="0.5" value="0"> <b class="tv">٠°</b></label>', bind: function (s, b) { var r = b.querySelector('input'); r.oninput = function () { s.tilt = +r.value; b.querySelector('.tv').textContent = n(s.tilt) + '°'; }; }, ok: function (s) { return Math.abs(s.tilt - 23.5) < 0.01; } },
        { say: 'ضع الكرة في المواقع الأربعة (بالميل نفسه)، وقِس شدة الإضاءة على النصف الشمالي.', btns: Object.keys(P).map(function (k) { return ['📍 ' + P[k][0], function (s) { s.pos = k; s.rec[k] = 1; }]; }), ok: function (s) { return Object.keys(s.rec).length === 4; } }
      ],
      table: function (s) { return table(['الموقع', 'الفصل في الشمال', 'ارتفاع الشمس ظهرًا', 'شدة الإضاءة النسبية'], Object.keys(P).filter(function (k) { return s.rec[k]; }).map(function (k) { return [P[k][0], P[k][1], P[k][2] + '°', Math.round(P[k][3] * 100) + '%']; })); },
      end: function () { return 'أشد ما تكون الأشعة في <b>الصيف</b> (يونيو): النصف الشمالي مائل نحو الشمس والأشعة شبه عمودية، وأقلها في <b>الشتاء</b> (ديسمبر): مائل بعيدًا والأشعة مائلة. فميل المحور الثابت مع الدوران حول الشمس هو سبب الفصول. (القيم لمدينة عند خط عرض 24° شمالًا تقريبًا.)'; },
      draw: function (x, s, t) {
        x.fillStyle = s.lamp ? '#0B1022' : '#CBD5E1'; x.fillRect(0, 0, 1000, 460);
        var cx = 500, cy = 230;
        x.strokeStyle = s.lamp ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.15)'; x.setLineDash([6, 8]); x.beginPath(); x.ellipse(cx, cy, 370, 150, 0, 0, 6.3); x.stroke(); x.setLineDash([]);
        if (s.lamp) { var g = x.createRadialGradient(cx, cy, 10, cx, cy, 140); g.addColorStop(0, '#FFF7C2'); g.addColorStop(.4, '#FDB813'); g.addColorStop(1, 'rgba(253,184,19,0)'); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 140, 0, 6.3); x.fill(); }
        x.fillStyle = '#94A3B8'; x.fillRect(cx - 30, cy + 20, 60, 30); x.fillStyle = s.lamp ? '#FEF08A' : '#E5E7EB'; x.beginPath(); x.arc(cx, cy, 34, 0, 6.3); x.fill();
        var ang = { jun: Math.PI, sep: Math.PI * 1.5, dec: 0, mar: Math.PI * .5 }[s.pos || 'dec'];
        var ex = cx + 370 * Math.cos(ang), ey = cy + 150 * Math.sin(ang), tr = s.tilt * Math.PI / 180;
        x.fillStyle = '#2563EB'; x.beginPath(); x.arc(ex, ey, 46, 0, 6.3); x.fill(); x.fillStyle = '#22C55E'; x.beginPath(); x.ellipse(ex - 8, ey - 12, 16, 22, .5, 0, 6.3); x.fill();
        if (s.lamp) { var aw = Math.atan2(ey - cy, ex - cx); x.fillStyle = 'rgba(0,0,0,.55)'; x.beginPath(); x.arc(ex, ey, 46, aw - Math.PI / 2, aw + Math.PI / 2); x.fill(); }
        x.strokeStyle = '#fff'; x.lineWidth = 3; x.beginPath(); x.moveTo(ex + Math.sin(tr) * 70, ey - Math.cos(tr) * 70); x.lineTo(ex - Math.sin(tr) * 70, ey + Math.cos(tr) * 70); x.stroke();
        T(x, 'ش', ex + Math.sin(tr) * 84, ey - Math.cos(tr) * 84 + 8, 20, '#FDE68A');
        Object.keys(P).forEach(function (k) { var a = { jun: Math.PI, sep: Math.PI * 1.5, dec: 0, mar: Math.PI * .5 }[k]; T(x, P[k][0], cx + 440 * Math.cos(a), cy + 205 * Math.sin(a) + 8, 20, s.rec[k] ? '#FDE68A' : '#94A3B8'); });
        if (s.pos) { var v = P[s.pos]; x.fillStyle = 'rgba(255,255,255,.92)'; rr(x, 20, 20, 250, 92, 14); x.fill(); T(x, '🔆 مقياس الضوء', 145, 52, 20, '#0F172A'); T(x, n(Math.round(v[3] * 100)) + '٪ · ' + v[1], 145, 92, 28, '#B45309'); }
        T(x, 'الميل: ' + n(s.tilt) + '°', 880, 440, 22, s.lamp ? '#fff' : '#0F172A');
      }
    });
  };

  // ===== الفصل الثامن · الدرس الثاني: أثر التلوث الضوئي =====
  S.lab_pollution = function (c, api) {
    var SITES = [['🏙 وسط المدينة', 4, '#1E293B'], ['🏘 قرية', 11, '#0F172A'], ['🏜 الصحراء', 22, '#020617']];
    return lab(c, api, {
      init: function () { return { site: -1, stars: [], hit: {}, trial: 0, res: [[], [], []], sites: {} }; },
      steps: [
        { say: 'اختر موقع الرصد في ليلة صافية.', btns: SITES.map(function (z, i) { return [z[0], function (s) { s.site = i; s.sites[i] = 1; gen(s); }]; }), ok: function (s) { return s.site >= 0; } },
        { say: 'انظر عبر الأنبوب دون تحريكه، وعُدّ النجوم بالنقر على كل نجم تراه، ثم سجّل العدّ. كرر 3 مرات.', btns: [['✔ سجّل العدّ', function (s) { if (s.res[s.site].length < 3) { s.res[s.site].push(Object.keys(s.hit).length); gen(s); } }]], ok: function (s) { return s.res[s.site].length >= 3; } },
        { say: 'جرّب موقعًا آخر، وكرر العدّ 3 مرات، ثم قارن المتوسطين.', btns: SITES.map(function (z, i) { return [z[0], function (s) { s.site = i; s.sites[i] = 1; gen(s); }]; }).concat([['✔ سجّل العدّ', function (s) { if (s.res[s.site].length < 3) { s.res[s.site].push(Object.keys(s.hit).length); gen(s); } }]]), ok: function (s) { return s.res.filter(function (r) { return r.length >= 3; }).length >= 2; } }
      ],
      table: function (s) { return table(['الموقع', 'المحاولة ١', 'المحاولة ٢', 'المحاولة ٣', 'المتوسط'], SITES.map(function (z, i) { var r = s.res[i]; return r.length ? [z[0], r[0] != null ? r[0] : '—', r[1] != null ? r[1] : '—', r[2] != null ? r[2] : '—', r.length === 3 ? ((r[0] + r[1] + r[2]) / 3).toFixed(1) : '—'] : null; }).filter(Boolean)); },
      end: function () { return 'عدد النجوم المرئية أقل كثيرًا في المدينة؛ لأن <b>الإضاءة الصناعية (التلوث الضوئي)</b> تجعل السماء ساطعة فتحجب النجوم الخافتة، بينما يرى من يرصد في مكان مظلم نجومًا أكثر.'; },
      draw: function (x, s) {
        var site = SITES[Math.max(0, s.site)];
        x.fillStyle = s.site < 0 ? '#0F172A' : site[2]; x.fillRect(0, 0, 1000, 460);
        if (s.site === 0) { var g = x.createLinearGradient(0, 300, 0, 460); g.addColorStop(0, 'rgba(251,146,60,0)'); g.addColorStop(1, 'rgba(251,146,60,.6)'); x.fillStyle = g; x.fillRect(0, 200, 1000, 260); }
        var cx = 500, cy = 220, R = 190;
        x.save(); x.beginPath(); x.arc(cx, cy, R, 0, 6.3); x.clip();
        x.fillStyle = s.site === 0 ? '#334155' : '#020617'; x.fillRect(cx - R, cy - R, 2 * R, 2 * R);
        s.stars.forEach(function (p, i) { if (s.click && Math.hypot(s.click[0] - p[0], s.click[1] - p[1]) < 16) s.hit[i] = 1; x.fillStyle = s.hit[i] ? '#FACC15' : '#fff'; x.beginPath(); x.arc(p[0], p[1], s.hit[i] ? 7 : p[2], 0, 6.3); x.fill(); if (s.hit[i]) { x.strokeStyle = '#FACC15'; x.lineWidth = 2; x.beginPath(); x.arc(p[0], p[1], 13, 0, 6.3); x.stroke(); } });
        x.restore();
        x.strokeStyle = '#78716C'; x.lineWidth = 26; x.beginPath(); x.arc(cx, cy, R + 13, 0, 6.3); x.stroke();
        if (s.site >= 0) { T(x, site[0], 150, 60, 26); T(x, 'عددت: ' + n(Object.keys(s.hit).length), 850, 60, 28, '#FACC15'); T(x, 'المحاولة ' + n(Math.min(3, s.res[s.site].length + 1)), 850, 100, 22, '#CBD5E1'); }
        else T(x, 'اختر موقع الرصد أولًا', cx, cy, 28, '#CBD5E1');
      }
    });
    function gen(s) { var r = rnd(s.site * 17 + s.res[s.site].length * 5 + 3), N = SITES[s.site][1] + Math.floor(r() * 3) - 1; s.stars = []; s.hit = {}; while (s.stars.length < N) { var a = r() * 6.28, d = Math.sqrt(r()) * 165; s.stars.push([500 + Math.cos(a) * d, 220 + Math.sin(a) * d, 2 + r() * 2.5]); } }
  };

  // ===== الفصل الثامن · الدرس الثاني: نموذج المجموعات النجمية =====
  S.lab_constel = function (c, api) {
    var C = { 'الدب الأكبر': [[300, 140], [370, 160], [430, 200], [500, 190], [520, 270], [430, 290], [420, 210]], 'ذات الكرسي': [[280, 170], [360, 250], [440, 180], [520, 260], [600, 190]], 'الجبار': [[330, 120], [470, 130], [370, 230], [400, 235], [430, 240], [320, 330], [480, 340]] };
    return lab(c, api, {
      init: function () { return { name: null, hole: {}, lamp: 0, room: 1, fade: 0 }; },
      steps: [
        { say: 'اختر مجموعة نجمية وارسم نقاطها على الورقة السوداء.', btns: Object.keys(C).map(function (k) { return ['✏ ' + k, function (s) { s.name = k; s.hole = {}; }]; }), ok: function (s) { return !!s.name; } },
        { say: 'اثقب كل نقطة تمثل نجمًا بالنقر عليها.', ok: function (s) { return s.name && Object.keys(s.hole).length === C[s.name].length; } },
        { say: 'ضع المصباح داخل الأسطوانة.', btns: [['🔦 ضع المصباح', function (s) { s.lamp = 1; }]], ok: function (s) { return s.lamp; } },
        { say: 'أطفئ ضوء الغرفة، وانظر إلى السقف.', btns: [['🌑 أطفئ ضوء الغرفة', function (s) { s.room = 0; }]], ok: function (s) { return s.room === 0 && s.fade > .95; } },
        { say: 'توقّع ثم جرّب: أضئ نور الغرفة… هل ما زلت ترى مجموعتك؟', btns: [['💡 أضئ نور الغرفة', function (s) { s.room = 1; }]], ok: function (s) { return s.room === 1 && s.lamp && s.fade < .15 && s.seen; } }
      ],
      end: function () { return 'تظهر المجموعة على السقف في الظلام، وتختفي تقريبًا عند إضاءة الغرفة؛ لأن الضوء الساطع يطغى على النقاط الخافتة. وكذلك ضوء الشمس يجعل الغلاف الجوي ساطعًا فيحجب النجوم نهارًا رغم وجودها.'; },
      draw: function (x, s) {
        if (s.room === 0) s.seen = 1;
        var tgt = s.lamp && s.room === 0 ? 1 : (s.lamp ? .1 : 0); s.fade += (tgt - s.fade) * .05;
        x.fillStyle = s.room ? '#E2E8F0' : '#0B0F1A'; x.fillRect(0, 0, 1000, 460);
        // السقف (يمين)
        x.fillStyle = s.room ? '#F8FAFC' : '#111827'; x.fillRect(640, 20, 340, 300); T(x, 'السقف', 810, 350, 22, s.room ? '#334155' : '#94A3B8');
        // الورقة السوداء على الأسطوانة (يسار)
        x.fillStyle = '#111'; rr(x, 230, 90, 420, 290, 18); x.fill();
        if (s.lamp) { x.fillStyle = '#FDE047'; x.beginPath(); x.arc(440, 400, 14, 0, 6.3); x.fill(); T(x, '🔦', 440, 440, 26); }
        if (s.name) C[s.name].forEach(function (p, i) {
          if (s.click && Math.hypot(s.click[0] - p[0], s.click[1] - p[1]) < 20) s.hole[i] = 1;
          x.fillStyle = s.hole[i] ? (s.lamp ? '#FEF08A' : '#475569') : '#fff'; x.beginPath(); x.arc(p[0], p[1], s.hole[i] ? 7 : 6, 0, 6.3); x.fill();
          if (!s.hole[i]) { x.strokeStyle = '#FACC15'; x.lineWidth = 2; x.beginPath(); x.arc(p[0], p[1], 14, 0, 6.3); x.stroke(); }
          if (s.fade > .02) { x.globalAlpha = s.fade; x.fillStyle = '#FEF9C3'; x.beginPath(); x.arc(640 + (p[0] - 230) * .78, 40 + (p[1] - 90) * .85, 6, 0, 6.3); x.fill(); x.globalAlpha = 1; }
        });
        T(x, s.name ? s.name : 'اختر مجموعة', 440, 70, 24, s.room ? '#0F172A' : '#E2E8F0');
      }
    });
  };

  // ===== الفصل الثامن · المراجعة: صمّم مستعمرة فضائية =====
  S.lab_colony = function (c, api) {
    var PL = { 'المريخ': ['صلب', 'بارد جدًا', 'رقيق', 'خافتة', ['air', 'dome', 'heat', 'water', 'shield', 'farm']], 'القمر': ['صلب', 'متفاوت جدًا', 'معدوم', 'ساطعة نهارًا', ['air', 'dome', 'heat', 'water', 'shield', 'farm']], 'الزهرة': ['صلب', 'ساخن جدًا (472 °س)', 'كثيف جدًا', 'خافتة (غيوم)', ['air', 'dome', 'cool', 'water', 'farm']], 'المشتري': ['غاز (لا سطح صلب)', 'بارد', 'كثيف', 'خافتة', null] };
    var M = { air: '🫁 مولّد أكسجين', dome: '🛖 قبة مغلقة مضغوطة', heat: '🔥 تدفئة', cool: '❄ تبريد قوي', water: '💧 استخراج الماء من الجليد/إعادة تدويره', shield: '🛡 درع من الإشعاع', farm: '🌱 بيت زراعي للغذاء' };
    return lab(c, api, {
      init: function () { return { p: null, mods: {}, tested: 0 }; },
      steps: [
        { say: 'اختر كوكبًا وادرس ظروف سطحه.', btns: Object.keys(PL).map(function (k) { return ['🪐 ' + k, function (s) { s.p = k; s.mods = {}; s.tested = 0; }]; }), ok: function (s) { return !!s.p; } },
        { say: 'اختر وحدات المستعمرة التي تحتاج إليها ليعيش الإنسان، ثم اختبرها.', bind: function (s, b) { Object.keys(M).forEach(function (k) { var e = document.createElement('button'); e.className = 'btn sm gh'; e.innerHTML = M[k]; e.onclick = function () { s.mods[k] = !s.mods[k]; e.className = 'btn sm ' + (s.mods[k] ? '' : 'gh'); s.tested = 0; }; b.appendChild(e); }); var t = document.createElement('button'); t.className = 'btn sm y'; t.innerHTML = '🧪 اختبر المستعمرة'; t.onclick = function () { s.tested = 1; }; b.appendChild(t); }, ok: function (s) { return s.tested && ok(s); } }
      ],
      end: function (s) { return PL[s.p][4] ? 'مستعمرة ' + s.p + ' توفر الهواء والضغط والحرارة المناسبة والماء والغذاء والحماية. لكن التقنية الحالية لا تكفي بعدُ لبناء مستعمرة كاملة.' : ''; },
      draw: function (x, s) {
        x.fillStyle = '#0B1022'; x.fillRect(0, 0, 1000, 460);
        if (!s.p) { T(x, 'اختر كوكبًا', 500, 230, 30, '#CBD5E1'); return; }
        var P = PL[s.p], col = { 'المريخ': '#B45309', 'القمر': '#9CA3AF', 'الزهرة': '#D97706', 'المشتري': '#C2410C' }[s.p];
        x.fillStyle = col; x.fillRect(0, 350, 1000, 110);
        x.fillStyle = 'rgba(255,255,255,.94)'; rr(x, 640, 24, 340, 170, 16); x.fill();
        [['السطح', P[0]], ['الحرارة', P[1]], ['الغلاف الجوي', P[2]], ['الإضاءة', P[3]]].forEach(function (r, i) { T(x, r[0] + ': ' + r[1], 960, 62 + i * 38, 20, '#0F172A', 'right'); });
        var have = Object.keys(s.mods).filter(function (k) { return s.mods[k]; });
        if (s.mods.dome) { x.fillStyle = 'rgba(186,230,253,.35)'; x.strokeStyle = '#E0F2FE'; x.lineWidth = 3; x.beginPath(); x.arc(330, 350, 190, Math.PI, 0); x.fill(); x.stroke(); }
        have.forEach(function (k, i) { T(x, M[k].split(' ')[0], 190 + i * 50, 330, 30); });
        if (s.tested) {
          if (!P[4]) { T(x, '⛔ المشتري غازي بلا سطح صلب: لا يمكن بناء مستعمرة على سطحه!', 500, 220, 24, '#FCA5A5'); T(x, 'اختر كوكبًا آخر من الخطوة الأولى.', 500, 262, 22, '#FDE68A'); return; }
          var miss = P[4].filter(function (k) { return !s.mods[k]; });
          T(x, miss.length ? '⚠ ينقص: ' + miss.map(function (k) { return M[k].replace(/^\S+ /, ''); }).join('، ') : '✅ المستعمرة تدعم حياة الإنسان!', 500, 240, miss.length ? 20 : 30, miss.length ? '#FCA5A5' : '#86EFAC');
        }
      }
    });
    function ok(s) { var need = PL[s.p][4]; if (!need) return false; return need.every(function (k) { return s.mods[k]; }); }
  };

  // ===== الفصل التاسع · التجربة الاستهلالية: مشاهدة خلايا البصل بمكبّر قطرة الماء =====
  S.lab_onion = function (c, api) {
    return lab(c, api, {
      init: function () { return { hole: 0, fold: 0, slide: 0, drop: 0, look: 0 }; },
      steps: [
        { say: 'اثقب الورق المقوى (قطر 2 سم) وثبّت فوقه شريطًا بلاستيكيًا شفافًا.', btns: [['✂ اثقب وثبّت الشريط', function (s) { s.hole = 1; }]], ok: function (s) { return s.hole; } },
        { say: 'اثنِ طرفي القطعة بعرض 1 سم إلى أسفل لتكون قاعدة.', btns: [['📐 اثنِ الطرفين', function (s) { s.fold = 1; }]], ok: function (s) { return s.fold; } },
        { say: 'ضع بشرة البصل على الشريحة الزجاجية تحت الثقب.', btns: [['🧅 ضع البشرة', function (s) { s.slide = 1; }]], ok: function (s) { return s.slide; } },
        { say: 'ضع قطرة ماء فوق الشريط الشفاف (تعمل عدسة مكبّرة).', btns: [['💧 ضع القطرة', function (s) { s.drop = 1; }]], ok: function (s) { return s.drop; } },
        { say: 'انظر من خلال القطرة ولاحظ بشرة البصل.', btns: [['👁 انظر', function (s) { s.look = 1; }]], ok: function (s) { return s.look && s.zoom > .95; } }
      ],
      end: function () { return 'تظهر بشرة البصل مكوّنة من <b>خلايا</b> متراصة متجاورة تشبه الطوب، لكل منها حدود واضحة؛ فقطرة الماء المحدبة عملت <b>عدسة مكبّرة</b>. وهكذا تتكون أجسام المخلوقات الحية من وحدات صغيرة هي الخلايا.'; },
      draw: function (x, s, t) {
        bg(x, 1000, 460, '#E0F2FE', '#F8FAFC'); table0(x);
        s.zoom = s.zoom || 0; if (s.look && s.zoom < 1) s.zoom += .02;
        // الشريحة والبشرة
        x.fillStyle = 'rgba(186,230,253,.6)'; x.fillRect(150, 378, 380, 14);
        if (s.slide) { x.fillStyle = 'rgba(254,240,138,.8)'; x.beginPath(); x.ellipse(340, 377, 70, 6, 0, 0, 6.3); x.fill(); }
        // الورق المقوى
        if (s.hole) { x.fillStyle = '#D6B98C'; x.fillRect(180, 300, 320, 16); if (s.fold) { x.fillRect(180, 300, 14, 78); x.fillRect(486, 300, 14, 78); } x.fillStyle = 'rgba(255,255,255,.7)'; x.fillRect(310, 298, 60, 20); x.fillStyle = '#E0F2FE'; x.fillRect(325, 300, 30, 16); }
        if (s.drop) { x.fillStyle = 'rgba(56,189,248,.65)'; x.beginPath(); x.ellipse(340, 297, 18, 10, 0, Math.PI, 0); x.fill(); }
        // ما تراه العين
        x.save(); x.beginPath(); x.arc(780, 210, 170, 0, 6.3); x.clip(); x.fillStyle = '#FEFCE8'; x.fillRect(600, 30, 360, 360);
        var z = .25 + s.zoom * .9;
        x.translate(780, 210); x.scale(z, z); x.translate(-780, -210);
        if (s.look) { x.strokeStyle = '#A16207'; x.lineWidth = 3 / z; for (var r = 0; r < 14; r++) for (var q = 0; q < 8; q++) { var X = 600 + q * 60 + (r % 2) * 30, Y = 40 + r * 28; x.fillStyle = 'rgba(254,240,138,.75)'; x.fillRect(X, Y, 56, 24); x.strokeRect(X, Y, 56, 24); x.fillStyle = '#92400E'; x.beginPath(); x.arc(X + 34, Y + 12, 4, 0, 6.3); x.fill(); } }
        x.restore(); x.strokeStyle = '#334155'; x.lineWidth = 10; x.beginPath(); x.arc(780, 210, 174, 0, 6.3); x.stroke();
        T(x, s.look ? 'خلايا بشرة البصل' : 'مجال الرؤية', 780, 420, 22, '#0F172A');
      }
    });
  };

  // ===== الفصل التاسع · الدرس الأول: بناء نموذج خلية =====
  S.lab_cellmodel = function (c, api) {
    var KEY = { mem: ['🧴 كيس شفاف', 'الغشاء البلازمي'], cyto: ['🍮 هلام', 'السيتوبلازم'], nuc: ['🟣 كرة صلصال كبيرة', 'النواة'], mito: ['🔴 حبات فاصوليا حمراء', 'الميتوكندريا'], vac: ['🎈 بالون ماء', 'الفجوة'], wall: ['📦 علبة كرتون', 'الجدار الخلوي'], chl: ['🟢 خرز أخضر', 'البلاستيدات الخضراء'] };
    return lab(c, api, {
      init: function () { return { type: null, put: {}, tested: 0 }; },
      steps: [
        { say: 'اختر نوع الخلية التي ستصنع نموذجها.', btns: [['🐾 خلية حيوانية', function (s) { s.type = 'a'; s.put = {}; }], ['🌿 خلية نباتية', function (s) { s.type = 'p'; s.put = {}; }]], ok: function (s) { return !!s.type; } },
        { say: 'أضف المواد المنزلية التي تمثل أجزاء خليتك، ثم اختبر النموذج.', bind: function (s, b) { Object.keys(KEY).forEach(function (k) { var e = document.createElement('button'); e.className = 'btn sm gh'; e.innerHTML = KEY[k][0]; e.onclick = function () { s.put[k] = !s.put[k]; e.className = 'btn sm ' + (s.put[k] ? '' : 'gh'); s.tested = 0; }; b.appendChild(e); }); var t = document.createElement('button'); t.className = 'btn sm y'; t.innerHTML = '🔎 اختبر النموذج'; t.onclick = function () { s.tested = 1; }; b.appendChild(t); }, ok: function (s) { return s.tested && check(s).ok; } }
      ],
      table: function (s) { var r = Object.keys(KEY).filter(function (k) { return s.put[k]; }).map(function (k) { return [KEY[k][0], KEY[k][1]]; }); return r.length ? table(['المادة', 'تمثّل'], r) : ''; },
      end: function (s) { return s.type === 'p' ? 'نموذج <b>الخلية النباتية</b> مكتمل: فيه الجدار الخلوي والبلاستيدات الخضراء وفجوة كبيرة إضافة إلى الغشاء والسيتوبلازم والنواة والميتوكندريا.' : 'نموذج <b>الخلية الحيوانية</b> مكتمل: غشاء بلازمي وسيتوبلازم ونواة وميتوكندريا وفجوات صغيرة، ولا جدار خلوي ولا بلاستيدات خضراء.'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#FFF7ED', '#FFFBEB'); table0(x);
        if (!s.type) { T(x, 'اختر نوع الخلية', 500, 220, 30, '#7C2D12'); return; }
        var P = s.put, cx = 500, cy = 210;
        if (s.type === 'p' && P.wall) { x.fillStyle = '#D6B98C'; x.fillRect(250, 40, 500, 340); }
        if (P.mem) { x.fillStyle = 'rgba(219,234,254,.6)'; x.strokeStyle = '#3B82F6'; x.lineWidth = 4; if (s.type === 'p') { x.fillRect(265, 55, 470, 310); x.strokeRect(265, 55, 470, 310); } else { x.beginPath(); x.ellipse(cx, cy, 240, 160, 0, 0, 6.3); x.fill(); x.stroke(); } }
        if (P.cyto) { x.fillStyle = 'rgba(253,230,138,.55)'; if (s.type === 'p') x.fillRect(275, 65, 450, 290); else { x.beginPath(); x.ellipse(cx, cy, 230, 150, 0, 0, 6.3); x.fill(); } }
        if (P.vac) { x.fillStyle = 'rgba(96,165,250,.7)'; x.beginPath(); if (s.type === 'p') x.ellipse(620, 150, 90, 60, 0, 0, 6.3); else x.arc(400, 270, 24, 0, 6.3); x.fill(); }
        if (P.nuc) { x.fillStyle = '#8B5CF6'; x.beginPath(); x.arc(cx, cy, 52, 0, 6.3); x.fill(); }
        if (P.mito) [[360, 140], [640, 290], [420, 300], [580, 120]].forEach(function (p) { x.fillStyle = '#DC2626'; x.beginPath(); x.ellipse(p[0], p[1], 24, 12, .5, 0, 6.3); x.fill(); });
        if (P.chl) [[330, 220], [680, 250], [470, 320], [400, 110]].forEach(function (p) { x.fillStyle = '#16A34A'; x.beginPath(); x.ellipse(p[0], p[1], 20, 11, 0, 0, 6.3); x.fill(); });
        if (s.tested) { var r = check(s); T(x, r.msg, 500, 425, 22, r.ok ? '#15803D' : '#B91C1C'); }
      }
    });
    function check(s) {
      var need = s.type === 'p' ? ['wall', 'mem', 'cyto', 'nuc', 'mito', 'vac', 'chl'] : ['mem', 'cyto', 'nuc', 'mito', 'vac'];
      var miss = need.filter(function (k) { return !s.put[k]; }), extra = s.type === 'a' ? ['wall', 'chl'].filter(function (k) { return s.put[k]; }) : [];
      if (extra.length) return { ok: false, msg: '⚠ الخلية الحيوانية لا تحتوي على: ' + extra.map(function (k) { return KEY[k][1]; }).join('، ') };
      if (miss.length) return { ok: false, msg: '⚠ ينقص: ' + miss.map(function (k) { return KEY[k][1]; }).join('، ') };
      return { ok: true, msg: '✅ نموذج صحيح مكتمل!' };
    }
  };

  // ===== الفصل التاسع · الاستقصاء: انتقال الماء في نبات الكرفس =====
  S.lab_celery = function (c, api) {
    return lab(c, api, {
      init: function () { return { water: 0, dye: 0, cut: 0, hr: 0, run: 0, rows: [], sliced: 0 }; },
      steps: [
        { say: 'اسكب الماء في الكأسين، وأضف ملون الطعام الأحمر إلى كأس واحدة (الأخرى ضابطة).', btns: [['💧 اسكب الماء', function (s) { s.water = 1; }], ['🔴 أضف الملون', function (s) { if (s.water) s.dye = 1; }]], ok: function (s) { return s.water && s.dye; } },
        { say: 'اقطع طرف ساقي الكرفس بالمقص، وضع كل ساق في كأس.', btns: [['✂ اقطع وضع الساقين', function (s) { s.cut = 1; }]], ok: function (s) { return s.cut; } },
        { say: 'راقب الساقين وسجّل ارتفاع اللون الأحمر كل ساعة.', btns: [['⏱ مرّت ساعة: سجّل', function (s) { if (s.hr < 6) { s.hr++; s.rows.push([s.hr, Math.min(20, s.hr * 3.5).toFixed(1), '٠']); } }]], ok: function (s) { return s.hr >= 6; } },
        { say: 'اقطع الساق الملوّنة عرضيًا ولاحظ المقطع.', btns: [['🔪 اقطع مقطعًا عرضيًا', function (s) { s.sliced = 1; }]], ok: function (s) { return s.sliced; } }
      ],
      table: function (s) { return table(['الساعة', 'ارتفاع الأحمر (سم) · الكأس الملوّنة', 'الكأس الضابطة'], s.rows); },
      end: function () { return 'صعد الماء الملوّن في الساق خلال خطوط (أوعية) حتى وصل إلى الأوراق، وظهرت في المقطع العرضي <b>نقاط حمراء</b> هي الخلايا الطويلة شبه الأنبوبية التي تنقل الماء. ولم يتغير لون الساق الضابطة. (القيم توضيحية؛ تختلف السرعة باختلاف النبات والحرارة.)'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#F0FDF4', '#FFFFFF'); table0(x);
        function cup(X, red) { x.fillStyle = 'rgba(186,230,253,.35)'; x.strokeStyle = '#64748B'; x.lineWidth = 3; x.fillRect(X - 60, 260, 120, 138); x.strokeRect(X - 60, 260, 120, 138); if (s.water) { x.fillStyle = red && s.dye ? 'rgba(220,38,38,.65)' : 'rgba(96,165,250,.45)'; x.fillRect(X - 57, 310, 114, 86); } }
        cup(330, 1); cup(640, 0);
        T(x, 'ماء + ملون أحمر', 330, 250, 18, '#7F1D1D'); T(x, 'ماء فقط (ضابطة)', 640, 250, 18, '#1E3A8A');
        if (s.cut) [330, 640].forEach(function (X, i) {
          x.fillStyle = '#86EFAC'; x.fillRect(X - 14, 70, 28, 320);
          var h = i === 0 ? Math.min(1, s.hr / 6) : 0; x.fillStyle = 'rgba(220,38,38,.75)'; for (var l = -8; l <= 8; l += 8) x.fillRect(X + l - 2, 390 - h * 320, 4, h * 320);
          x.fillStyle = i === 0 && s.hr >= 6 ? '#F87171' : '#22C55E'; [[-40, 60], [0, 40], [40, 60]].forEach(function (p) { x.beginPath(); x.ellipse(X + p[0], p[1], 26, 16, 0, 0, 6.3); x.fill(); });
        });
        if (s.sliced) { x.fillStyle = '#BBF7D0'; x.strokeStyle = '#15803D'; x.lineWidth = 3; x.beginPath(); x.arc(870, 140, 70, 0, 6.3); x.fill(); x.stroke(); x.fillStyle = '#DC2626'; for (var a = 0; a < 8; a++) { x.beginPath(); x.arc(870 + Math.cos(a * .785) * 48, 140 + Math.sin(a * .785) * 48, 8, 0, 6.3); x.fill(); } T(x, 'مقطع عرضي', 870, 240, 20, '#14532D'); }
        T(x, '⏱ ' + n(s.hr) + ' ساعة', 120, 60, 24, '#0F172A');
      }
    });
  };
  // ===== الفصل العاشر · التجربة الاستهلالية: كيف تُصنَّف الحيوانات؟ (لوحة الإعلانات والمغلفات) =====
  S.lab_classify = function (c, api) {
    var G = [['إسفنجيات', '#CA8A04'], ['لاسعات', '#DB2777'], ['ديدان', '#B45309'], ['رخويات', '#0891B2'], ['مفصليات', '#DC2626'], ['شوكيات الجلد', '#7C3AED']];
    var CARDS = [['🧽', 'الإسفنج', 0, 'جالس، يتغذى بتصفية الماء'], ['🪼', 'قنديل البحر', 1, 'مجسات بخلايا لاسعة، تماثل شعاعي'], ['🪱', 'دودة الأرض', 2, 'جسم من حلقات متكررة'], ['🐌', 'الحلزون', 3, 'جسم طري، صدفة وقدم عضلية'], ['🐙', 'الأخطبوط', 3, 'جسم طري، جهاز دوران مغلق'], ['🐜', 'النملة', 4, 'هيكل خارجي و6 أرجل مفصلية'], ['🕷', 'العنكبوت', 4, 'هيكل خارجي و8 أرجل مفصلية'], ['⭐', 'نجم البحر', 5, 'أشواك وأقدام أنبوبية، تماثل شعاعي']];
    return lab(c, api, {
      init: function () { return { env: 0, cards: 0, k: 0, placed: [], msg: '' }; },
      steps: [
        { say: 'اكتب أسماء مجموعات الحيوانات على المغلفات وثبّتها على اللوحة.', btns: [['✉ ثبّت المغلفات', function (s) { s.env = 1; }]], ok: function (s) { return s.env; } },
        { say: 'اعمل بطاقة لكل حيوان: صورته على وجه، وخصائصه على الوجه الآخر.', btns: [['🃏 جهّز البطاقات', function (s) { s.cards = 1; }]], ok: function (s) { return s.cards; } },
        { say: 'اقرأ خصائص البطاقة، ثم اضغط على المغلف المناسب على اللوحة.', ok: function (s) { return s.k >= CARDS.length; } }
      ],
      table: function (s) { return table(['الحيوان', 'المجموعة', 'الخاصية المستخدمة'], s.placed.map(function (i) { return [CARDS[i][1], G[CARDS[i][2]][0], CARDS[i][3]]; })); },
      end: function () { return 'الخصائص المشتركة: كلها حيوانات عديدة الخلايا لا تصنع غذاءها وتهضمه، و<b>ليس لها عمود فقري</b> (لافقاريات). واستخدمنا في تصنيفها إلى مجموعات أصغر: <b>نوع التماثل، وشكل الجسم، ووجود الصدفة أو الهيكل الخارجي، وعدد الأرجل، وطريقة التغذي</b>.'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#FEF3C7', '#FFFBEB');
        x.fillStyle = '#92400E'; x.fillRect(20, 20, 960, 300); x.fillStyle = '#D6A35C'; x.fillRect(30, 30, 940, 280);
        if (s.env) G.forEach(function (g, i) { var X = 830 - i * 155, Y = 60; x.fillStyle = '#fff'; x.fillRect(X, Y, 140, 100); x.strokeStyle = g[1]; x.lineWidth = 4; x.strokeRect(X, Y, 140, 100); x.beginPath(); x.moveTo(X, Y); x.lineTo(X + 70, Y + 45); x.lineTo(X + 140, Y); x.stroke(); T(x, g[0], X + 70, Y + 130, 19, '#422006');
          var inn = s.placed.filter(function (p) { return CARDS[p][2] === i; }); x.font = '26px serif'; x.textAlign = 'center'; inn.forEach(function (p, j) { x.fillText(CARDS[p][0], X + 30 + j * 40, Y + 90); });
          if (s.click && s.k < CARDS.length && s.cards && s.click[0] > X && s.click[0] < X + 140 && s.click[1] > Y && s.click[1] < Y + 140) { if (CARDS[s.k][2] === i) { s.placed.push(s.k); s.k++; s.msg = '✅ أحسنت!'; } else s.msg = '❌ راجع خصائص البطاقة'; } });
        if (s.cards && s.k < CARDS.length) { var cd = CARDS[s.k]; x.fillStyle = '#fff'; x.fillRect(330, 335, 340, 110); x.strokeStyle = '#B45309'; x.lineWidth = 3; x.strokeRect(330, 335, 340, 110); x.font = '54px serif'; x.textAlign = 'center'; x.fillText(cd[0], 620, 410); T(x, cd[1], 470, 375, 24, '#7C2D12'); T(x, cd[3], 470, 415, 17, '#334155'); }
        if (s.msg) T(x, s.msg, 160, 400, 24, s.msg[0] === '✅' ? '#15803D' : '#B91C1C');
        T(x, n(s.placed.length) + ' / ' + n(CARDS.length), 860, 400, 26, '#7C2D12');
      }
    });
  };

  // ===== الفصل العاشر · الدرس الثاني: مراقبة قمل الخشب =====
  S.lab_woodlice = function (c, api) {
    var R = rnd(17);
    return lab(c, api, {
      init: function () { return { put: 0, sponge: 0, cover: 0, sec: 0, trial: 0, rows: [], pos: [] }; },
      steps: [
        { say: 'ضع 6 من قمل الخشب في وعاء مسطح نظيف.', btns: [['🐞 ضع ٦ من قمل الخشب', function (s) { s.put = 1; s.pos = [0, 1, 2, 3, 4, 5].map(function () { return [250 + R() * 500, 170 + R() * 160]; }); }]], ok: function (s) { return s.put; } },
        { say: 'ضع قطعة إسفنج مبللة بالماء في أحد طرفي الوعاء.', btns: [['🧽 ضع الإسفنج المبلل', function (s) { s.sponge = 1; }]], ok: function (s) { return s.sponge; } },
        { say: 'غطِّ الوعاء 60 ثانية، ثم ارفع الغطاء وعُدّ قمل الخشب في كل طرف. كرّر ثلاث مرات.', btns: [['⏱ غطِّ الوعاء 60 ثانية', function (s) { if (!s.cover && s.trial < 3) { s.cover = 1; s.sec = 0; } }]], ok: function (s) { return s.trial >= 3 && !s.cover; } }
      ],
      table: function (s) { return table(['المحاولة', 'قرب الإسفنج المبلل', 'في الطرف الجاف'], s.rows); },
      end: function (s) { var w = s.rows.reduce(function (a, r) { return a + r[1]; }, 0); return 'تجمّع معظم قمل الخشب (' + n(w) + ' من ' + n(18) + ') <b>قرب الإسفنج المبلل</b>؛ فهو يفضّل <b>البيئة الرطبة المظلمة</b>. لذا نجده قرب المنزل تحت الحجارة والأخشاب وأصص النباتات والأوراق المتساقطة الرطبة. <i>(أعداد المحاكاة توضيحية.)</i>'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#F1F5F9', '#FFFFFF'); table0(x);
        x.fillStyle = '#E2E8F0'; x.strokeStyle = '#64748B'; x.lineWidth = 4; x.fillRect(200, 140, 600, 220); x.strokeRect(200, 140, 600, 220);
        if (s.sponge) { x.fillStyle = '#FDE047'; x.fillRect(215, 200, 90, 100); x.fillStyle = 'rgba(59,130,246,.35)'; x.fillRect(205, 150, 150, 200); T(x, 'رطب', 280, 135, 20, '#1D4ED8'); T(x, 'جاف', 720, 135, 20, '#92400E'); }
        if (s.cover) { s.sec = Math.min(60, s.sec + .5); if (s.sec >= 60) { s.cover = 0; s.trial++; var wet = 4 + Math.floor(R() * 3); s.rows.push([s.trial, wet, 6 - wet]); s.pos = [0, 1, 2, 3, 4, 5].map(function (i) { return i < wet ? [230 + R() * 110, 165 + R() * 175] : [560 + R() * 220, 165 + R() * 175]; }); } }
        s.pos.forEach(function (p) { x.fillStyle = '#475569'; x.beginPath(); x.ellipse(p[0], p[1], 16, 10, 0, 0, 6.3); x.fill(); x.strokeStyle = '#94A3B8'; x.lineWidth = 1; for (var q = -8; q <= 8; q += 4) { x.beginPath(); x.moveTo(p[0] + q, p[1] - 9); x.lineTo(p[0] + q, p[1] + 9); x.stroke(); } });
        if (s.cover) { x.fillStyle = 'rgba(30,41,59,.92)'; x.fillRect(190, 130, 620, 240); T(x, '⏱ ' + n(Math.floor(s.sec)) + ' ث', 500, 260, 40, '#FDE68A'); }
        T(x, 'المحاولة ' + n(Math.min(3, s.trial + (s.cover ? 1 : 0))) + ' من ٣', 500, 60, 24, '#0F172A');
      }
    });
  };

  // ===== الفصل العاشر · استقصاء من واقع الحياة: ديدان تأكل الفضلات =====
  S.lab_worms = function (c, api) {
    var DAYS = [0, 3, 7, 10, 14];
    return lab(c, api, {
      init: function () { return { soil: 0, paper: 0, food: 0, worms: 0, d: 0, rows: [], spray: 0 }; },
      steps: [
        { say: 'جهّز وعاءين مثقوبين متماثلين: ضع في كل منهما التربة وشرائح الصحف.', btns: [['🟫 أضف التربة', function (s) { s.soil = 1; }], ['📰 أضف شرائح الصحف', function (s) { if (s.soil) s.paper = 1; }]], ok: function (s) { return s.paper; } },
        { say: 'أضف الكمية نفسها من فضلات الطعام المطحونة (قشور فاكهة وخضار، قشر بيض، أكياس شاي) إلى الوعاءين.', btns: [['🍎 أضف الفضلات', function (s) { s.food = 1; s.rows = [[0, '100٪', '100٪', 'فاتحة متماسكة', 'فاتحة متماسكة']]; }]], ok: function (s) { return s.food; } },
        { say: 'أضف ديدان الأرض إلى الوعاء (أ) فقط؛ الوعاء (ب) ضابط بلا ديدان.', btns: [['🪱 أضف الديدان إلى (أ)', function (s) { s.worms = 1; }]], ok: function (s) { return s.worms; } },
        { say: 'رشّ الوعاءين بالكمية نفسها من الماء، وسجّل ملاحظاتك على مدى أسبوعين.', btns: [['💦 رُشّ وانتقل إلى الملاحظة التالية', function (s) { if (s.d < 4) { s.spray = 30; s.d++; var D = DAYS[s.d]; s.rows.push([D, Math.max(10, 100 - D * 6.5).toFixed(0) + '٪', Math.max(80, 100 - D * 1.4).toFixed(0) + '٪', D >= 7 ? 'داكنة مفككة' : 'تبدأ بالتفكك', 'فاتحة متماسكة']); } }]], ok: function (s) { return s.d >= 4; } }
      ],
      table: function (s) { return table(['اليوم', 'الفضلات المتبقية (أ) بالديدان', 'الفضلات المتبقية (ب) ضابط', 'التربة (أ)', 'التربة (ب)'], s.rows); },
      end: function () { return 'في الوعاء (أ) تحللت الفضلات وشرائح الصحف أسرع، وصارت التربة <b>أغمق وأكثر تفككًا وتهوية</b>؛ فالديدان تلتهم المواد العضوية وتحفر الأنفاق. فالنتائج تؤيد فرضية أن <b>ديدان الأرض تحسّن التربة</b>. الضابط: الوعاء (ب) · المتغير المستقل: وجود الديدان · التابع: حالة التربة · الثوابت: التربة والفضلات والماء والمكان والمدة. <i>(النسب توضيحية لمحاكاة الملاحظة.)</i>'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#ECFDF5', '#FFFFFF'); table0(x);
        var D = DAYS[s.d] || 0;
        [[330, 1], [680, 0]].forEach(function (b) { var X = b[0];
          x.fillStyle = 'rgba(226,232,240,.6)'; x.strokeStyle = '#64748B'; x.lineWidth = 4; x.fillRect(X - 130, 170, 260, 225); x.strokeRect(X - 130, 170, 260, 225);
          if (s.soil) { var dk = b[1] && s.worms ? Math.min(1, D / 10) : 0; x.fillStyle = 'rgb(' + Math.round(146 - dk * 70) + ',' + Math.round(100 - dk * 50) + ',' + Math.round(60 - dk * 30) + ')'; x.fillRect(X - 126, 250, 252, 141); if (dk > .3) { x.fillStyle = 'rgba(0,0,0,.25)'; for (var i = 0; i < 25; i++) { x.beginPath(); x.arc(X - 110 + (i * 37) % 220, 265 + (i * 23) % 115, 4, 0, 6.3); x.fill(); } } }
          if (s.paper) { var keep = b[1] && s.worms ? Math.max(.15, 1 - D / 14) : 1; x.fillStyle = '#F8FAFC'; for (var p = 0; p < Math.round(12 * keep); p++) x.fillRect(X - 115 + p * 19, 238 + (p % 3) * 4, 14, 6); }
          if (s.food) { var fk = b[1] && s.worms ? Math.max(.1, 1 - D * .065) : Math.max(.8, 1 - D * .014); x.font = '24px serif'; x.textAlign = 'center'; for (var f = 0; f < Math.round(6 * fk); f++) x.fillText(['🍎', '🥕', '🥚'][f % 3], X - 90 + f * 36, 232); }
          if (b[1] && s.worms) { x.strokeStyle = '#F472B6'; x.lineWidth = 7; x.lineCap = 'round'; for (var w = 0; w < 3; w++) { x.beginPath(); var wx = X - 80 + w * 70, wy = 300 + (w % 2) * 40; x.moveTo(wx, wy); x.quadraticCurveTo(wx + 20, wy - 20 + Math.sin(s.T / 300 + w) * 8, wx + 45, wy); x.stroke(); } }
          T(x, b[1] ? '(أ) مع ديدان' : '(ب) ضابط بلا ديدان', X, 160, 22, '#14532D'); });
        if (s.spray > 0) { s.spray--; x.fillStyle = 'rgba(59,130,246,.6)'; for (var q = 0; q < 30; q++) { x.beginPath(); x.arc(200 + Math.random() * 600, 120 + Math.random() * 60, 3, 0, 6.3); x.fill(); } }
        T(x, '📅 اليوم ' + n(D), 120, 60, 26, '#0F172A');
      }
    });
  };
  // ===== الفصل الحادي عشر · التجربة الاستهلالية: نموذج عمود فقري =====
  S.lab_spine = function (c, api) {
    return lab(c, api, {
      init: function () { return { wire: 0, rings: 0, gel: 0, ends: 0, bend: 0, max: 0, rows: [] }; },
      steps: [
        { say: 'أدخل الحلقات البلاستيكية في السلك المرن، وضع المادة الجيلاتينية بين كل حلقتين.', btns: [['🧵 جهّز السلك', function (s) { s.wire = 1; }], ['⭕ أضف الحلقات', function (s) { if (s.wire && s.rings < 12) s.rings += 3; }], ['🟡 أضف المادة الجيلاتينية', function (s) { if (s.rings >= 12) s.gel = 1; }]], ok: function (s) { return s.gel; } },
        { say: 'اثنِ طرفي السلك لمنع انزلاق الحلقات.', btns: [['🔧 اثنِ الطرفين', function (s) { s.ends = 1; }]], ok: function (s) { return s.ends; } },
        { say: 'اثنِ النموذج ببطء بالمنزلق، ولاحظ إلى أي مدى ينثني.', ui: '<label>الثني <input type="range" class="sb" min="0" max="100" value="0"></label>', bind: function (s, b) { var r = b.querySelector('.sb'); r.oninput = function () { s.bend = Math.min(+r.value, 70) / 70; if (+r.value > s.max) { s.max = +r.value; } if (+r.value >= 100 && !s.rows.length) s.rows = [['قليل', 'ينثني بسهولة'], ['متوسط', 'ينثني بسهولة'], ['كبير', 'تتلامس الحلقات ويتوقف الانثناء']]; }; }, ok: function (s) { return s.max >= 100; } }
      ],
      table: function (s) { return table(['مقدار الثني', 'الملاحظة'], s.rows); },
      end: function () { return 'ينثني النموذج <b>بسهولة إلى حد معين</b>، ثم تتلامس الحلقات فيتوقف. فالفقرات (الحلقات) والأقراص المرنة بينها (المادة الجيلاتينية) تسمح بالحركة، وتحيط الفقرات بالحبل العصبي (السلك) وتحميه، وتمنع الانثناء الزائد.'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#F5F3FF', '#FFFFFF'); table0(x);
        var N = s.rings, R = 520, cx = 500, base = 380;
        if (s.wire) { x.strokeStyle = '#64748B'; x.lineWidth = 4; x.beginPath(); for (var i = 0; i <= 12; i++) { var a = -Math.PI / 2 + s.bend * (i / 12) * 1.1; var X = cx + (s.bend ? (Math.cos(a) * R - Math.cos(-Math.PI / 2) * R) : 0), Y = base - (s.bend ? (Math.sin(-a) * R - R + R) : i * 25); if (!s.bend) X = cx; if (s.bend) { X = cx + R * (1 - Math.cos(s.bend * i / 12 * 1.1)); Y = base - R * Math.sin(s.bend * i / 12 * 1.1); } i ? x.lineTo(X, Y) : x.moveTo(X, Y); } x.stroke(); }
        for (var j = 0; j < N; j++) { var th = s.bend * j / 12 * 1.1, X2 = cx + R * (1 - Math.cos(th)), Y2 = base - R * Math.sin(th); if (!s.bend) { X2 = cx; Y2 = base - j * 25; }
          x.save(); x.translate(X2, Y2); x.rotate(-th); x.fillStyle = '#F97316'; x.fillRect(-30, -9, 60, 18); if (s.gel) { x.fillStyle = '#FDE047'; x.fillRect(-24, 9, 48, 7); } x.restore(); }
        if (s.ends) { x.fillStyle = '#334155'; x.beginPath(); x.arc(cx, base + 14, 8, 0, 6.3); x.fill(); }
        T(x, 'الحلقات = الفقرات · الجيلاتين = الأقراص · السلك = الحبل العصبي', 500, 40, 20, '#4C1D95');
      }
    });
  };

  // ===== الفصل الحادي عشر · الدرس الثاني: نمذجة عمل الريش =====
  S.lab_feather = function (c, api) {
    return lab(c, api, {
      init: function () { return { cotton: 0, bag: 0, dip: 0, sec: 0, rows: [] }; },
      steps: [
        { say: 'لف القطن حول مستودع المقياس (أ)، وضع المقياسين (أ) و(ب) في كيسين بلاستيكيين، وسجّل الحرارة.', btns: [['☁ لف القطن حول (أ)', function (s) { s.cotton = 1; }], ['🛍 ضعهما في الكيسين وسجّل', function (s) { if (s.cotton) { s.bag = 1; s.rows = [[0, '25', '25']]; } }]], ok: function (s) { return s.bag; } },
        { say: 'اغمر طرفي المقياسين في ماء بارد، وسجّل الحرارة كل 30 ثانية لمدة دقيقتين.', btns: [['🧊 اغمر في الماء البارد', function (s) { s.dip = 1; }], ['⏱ مرّت 30 ثانية: سجّل', function (s) { if (s.dip && s.sec < 120) { s.sec += 30; var k = s.sec / 30; s.rows.push([s.sec, (25 - k * 1.5).toFixed(1), (25 - k * 4).toFixed(1)]); } }]], ok: function (s) { return s.sec >= 120; } }
      ],
      table: function (s) { return table(['الزمن (ث)', '(أ) ملفوف بالقطن °س', '(ب) دون قطن °س'], s.rows); },
      end: function () { return 'انخفضت حرارة المقياس (ب) دون قطن <b>أكثر</b> من المقياس (أ)؛ لأن القطن حبس الهواء وعزل المستودع. فالقطن يمثّل <b>الزغب</b> الذي يحتفظ بالهواء الدافئ قرب جلد الطائر. <i>(القراءات توضيحية للمحاكاة.)</i>'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#EFF6FF', '#FFFFFF'); table0(x);
        if (s.dip) { x.fillStyle = 'rgba(96,165,250,.45)'; x.fillRect(220, 260, 560, 135); x.strokeStyle = '#64748B'; x.lineWidth = 4; x.strokeRect(220, 200, 560, 195); T(x, '🧊 ماء بارد', 500, 385, 20, '#1E3A8A'); }
        var last = s.rows[s.rows.length - 1] || [0, 25, 25];
        [[380, 1, +last[1]], [620, 0, +last[2]]].forEach(function (m) { var X = m[0], y0 = s.dip ? 120 : 60;
          x.fillStyle = '#fff'; x.strokeStyle = '#334155'; x.lineWidth = 2; x.fillRect(X - 10, y0, 20, 230); x.strokeRect(X - 10, y0, 20, 230);
          x.fillStyle = '#DC2626'; x.beginPath(); x.arc(X, y0 + 240, 16, 0, 6.3); x.fill(); var h = (m[2] - 5) / 25 * 200; x.fillRect(X - 5, y0 + 228 - h, 10, h);
          if (m[1] && s.cotton) { x.fillStyle = 'rgba(255,255,255,.95)'; for (var q = 0; q < 14; q++) { x.beginPath(); x.arc(X - 18 + (q % 4) * 12, y0 + 225 + Math.floor(q / 4) * 10, 12, 0, 6.3); x.fill(); } }
          if (s.bag) { x.strokeStyle = 'rgba(100,116,139,.6)'; x.strokeRect(X - 40, y0 - 10, 80, 290); }
          T(x, (m[1] ? '(أ) ' : '(ب) ') + n(m[2].toFixed ? m[2].toFixed(1) : m[2]) + ' °س', X, y0 - 20, 22, '#0F172A'); });
        T(x, '⏱ ' + n(s.sec) + ' ث', 120, 60, 26, '#0F172A');
      }
    });
  };

  // ===== الفصل الحادي عشر · استقصاء: مأوى للحيوانات المهددة بالانقراض =====
  S.lab_shelter = function (c, api) {
    var AN = { oryx: ['🦌 المها العربي', 'صحراوي يرعى الأعشاب، مهدد بالصيد الجائر وفقدان الموطن', ['sand', 'grass', 'water', 'shade', 'fence', 'big']], turtle: ['🐢 السلحفاة البحرية', 'بحرية تعشش على الشواطئ، مهددة بالتلوث والصيد وفقد مواطن التعشيش', ['sea', 'beach', 'clean', 'fence']], ibex: ['🐐 الوعل النوبي', 'يعيش في المناطق الصخرية الجبلية ويرعى النباتات', ['rock', 'grass', 'water', 'fence', 'big']] };
    var EL = { sand: '🏜 رمال وكثبان', grass: '🌿 نباتات رعوية', water: '💧 مصدر ماء', shade: '🌳 ظل وأشجار', fence: '🚧 سور يمنع الصيد', big: '📐 مساحة واسعة', sea: '🌊 حوض ماء مالح', beach: '🏖 شاطئ رملي للتعشيش', clean: '♻ مياه نظيفة بلا بلاستيك', rock: '🪨 صخور ومنحدرات', cage: '🔒 قفص صغير' };
    return lab(c, api, {
      init: function () { return { a: null, put: {}, tested: 0, msg: '' }; },
      steps: [
        { say: 'اختر حيوانًا مهددًا بالانقراض لتبحث عن موطنه وحاجاته.', btns: Object.keys(AN).map(function (k) { return [AN[k][0], function (s) { s.a = k; s.put = {}; s.tested = 0; }]; }), ok: function (s) { return !!s.a; } },
        { say: 'صمّم نموذج المحمية: أضف العناصر التي تلبي حاجات الحيوان، ثم اختبر النموذج.', bind: function (s, b) { Object.keys(EL).forEach(function (k) { var e = document.createElement('button'); e.className = 'btn sm gh'; e.innerHTML = EL[k]; e.onclick = function () { s.put[k] = !s.put[k]; e.className = 'btn sm ' + (s.put[k] ? '' : 'gh'); s.tested = 0; }; b.appendChild(e); }); var t = document.createElement('button'); t.className = 'btn sm y'; t.innerHTML = '🔎 اختبر النموذج'; t.onclick = function () { s.tested = 1; var need = AN[s.a][2], miss = need.filter(function (k) { return !s.put[k]; }), bad = Object.keys(s.put).filter(function (k) { return s.put[k] && need.indexOf(k) < 0; }); s.ok = !miss.length && !bad.length; s.msg = s.ok ? '✅ المحمية تلبي حاجات الحيوان!' : (miss.length ? 'ينقصها: ' + miss.map(function (k) { return EL[k]; }).join('، ') + '. ' : '') + (bad.length ? 'لا يناسبه: ' + bad.map(function (k) { return EL[k]; }).join('، ') + '.' : ''); }; b.appendChild(t); }, ok: function (s) { return s.tested && s.ok; } }
      ],
      table: function (s) { if (!s.a) return ''; return table(['الحاجة', 'العنصر في النموذج'], AN[s.a][2].map(function (k) { return [k === 'fence' ? 'الحماية' : k === 'big' ? 'المساحة' : k === 'water' || k === 'sea' || k === 'clean' ? 'الماء' : k === 'grass' ? 'الغذاء' : 'الموطن', s.put[k] ? EL[k] : '—']; })); },
      end: function (s) { return 'صمّمت موطنًا لـ<b>' + AN[s.a][0] + '</b> (' + AN[s.a][1] + '). المحميات الحديثة تحاكي الموطن الطبيعي بدل الأقفاص الصغيرة، فتمكّن الحيوان من التكاثر والعناية بصغاره. ومن مشكلات التصميم: المساحة والماء والغذاء، وفصل المفترس عن الفريسة، ومنع الصيد.'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#FEF9C3', '#ECFCCB');
        x.strokeStyle = '#78350F'; x.lineWidth = 4; x.setLineDash(s.put.fence ? [] : [10, 10]); x.strokeRect(150, 60, 700, 330); x.setLineDash([]);
        var pos = { sand: [230, 330], grass: [400, 140], water: [700, 300], shade: [260, 140], fence: [820, 80], big: [500, 360], sea: [640, 200], beach: [380, 300], clean: [740, 140], rock: [560, 140], cage: [500, 240] };
        Object.keys(s.put).forEach(function (k) { if (s.put[k]) { x.font = '44px serif'; x.textAlign = 'center'; x.fillText(EL[k].split(' ')[0], pos[k][0], pos[k][1]); } });
        if (s.a) { x.font = '70px serif'; x.fillText(AN[s.a][0].split(' ')[0], 500, 250); T(x, AN[s.a][0].slice(3), 500, 40, 24, '#14532D'); }
        if (s.msg) T(x, s.msg.slice(0, 70), 500, 430, 18, s.ok ? '#15803D' : '#B91C1C');
      }
    });
  };

  // ===== الفصل الثاني عشر · التجربة الاستهلالية: ما النظام البيئي؟ =====
  S.lab_eco = function (c, api) {
    var IT = [['🌱', 'عشب', 1, 150, 300], ['🐜', 'نملة', 1, 300, 360], ['🪨', 'حجر', 0, 470, 330], ['🪱', 'دودة أرض', 1, 620, 390], ['🟫', 'تربة', 0, 760, 400], ['🐦', 'عصفور', 1, 820, 120], ['💧', 'ماء', 0, 240, 410], ['☀', 'ضوء الشمس', 0, 120, 90], ['🍂', 'ورقة جافة متساقطة', 0, 540, 250], ['🦋', 'فراشة', 1, 420, 150], ['💨', 'الهواء', 0, 650, 160]];
    return lab(c, api, {
      init: function () { return { area: 0, found: [], k: 0, cls: [], msg: '' }; },
      steps: [
        { say: 'اختر مساحة صغيرة من الأعشاب في المدرسة وحدّدها بإطار.', btns: [['🟩 حدّد المساحة', function (s) { s.area = 1; }]], ok: function (s) { return s.area; } },
        { say: 'راقب بدقة: اضغط على كل شيء تشاهده داخل المساحة (حيًا أو غير حي) لتسجّله، بما فيه الهواء والتربة.', ok: function (s) { return s.found.length >= IT.length; } },
        { say: 'صنّف الأشياء التي سجّلتها: هل هو مخلوق حي أم شيء غير حي؟', bind: function (s, b) { function r() { if (s.k >= IT.length) { b.innerHTML = ''; return; } var it = IT[s.found[s.k]]; b.innerHTML = '<b style="font-size:20px">' + it[0] + ' ' + it[1] + '</b> '; [['🌿 مخلوق حي', 1], ['🪨 غير حي', 0]].forEach(function (o) { var e = document.createElement('button'); e.className = 'btn sm'; e.textContent = o[0]; e.onclick = function () { if (it[2] === o[1]) { s.cls.push(s.found[s.k]); s.k++; s.msg = '✅'; } else s.msg = '❌ فكّر: هل ينمو ويتنفس ويتكاثر؟'; r(); }; b.appendChild(e); }); } r(); }, ok: function (s) { return s.k >= IT.length; } }
      ],
      table: function (s) { var L = s.cls.filter(function (i) { return IT[i][2]; }).map(function (i) { return IT[i][1]; }), N = s.cls.filter(function (i) { return !IT[i][2]; }).map(function (i) { return IT[i][1]; }); var m = Math.max(L.length, N.length), rows = []; for (var i = 0; i < m; i++) rows.push([L[i] || '', N[i] || '']); return table(['المخلوقات الحية', 'الأشياء غير الحية'], rows); },
      end: function () { return 'تتفاعل هذه الأشياء معًا: العشب يحتاج إلى التربة والماء والضوء والهواء، والنملة والفراشة تتغذيان على النباتات، والدودة تعيش في التربة وتحلل الأوراق المتساقطة، والعصفور يأكل الحشرات. فهي تعمل <b>وحدة واحدة</b>، وهذا هو <b>النظام البيئي</b>.'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#E0F2FE', '#BBF7D0'); x.fillStyle = '#86EFAC'; x.fillRect(0, 220, 1000, 240);
        if (s.area) { x.strokeStyle = '#B45309'; x.lineWidth = 6; x.setLineDash([16, 10]); x.strokeRect(60, 40, 880, 400); x.setLineDash([]); }
        IT.forEach(function (it, i) { var got = s.found.indexOf(i) >= 0; x.globalAlpha = got ? 1 : (s.area ? .55 : .3); x.font = '46px serif'; x.textAlign = 'center'; x.fillText(it[0], it[3], it[4]); x.globalAlpha = 1; if (got) T(x, it[1], it[3], it[4] + 26, 16, '#14532D');
          if (s.click && s.area && !got && Math.hypot(s.click[0] - it[3], s.click[1] - (it[4] - 16)) < 40) s.found.push(i); });
        T(x, 'سُجّل ' + n(s.found.length) + ' من ' + n(IT.length), 870, 30, 20, '#14532D');
        if (s.msg) T(x, s.msg, 120, 30, 22, s.msg[0] === '✅' ? '#15803D' : '#B91C1C');
      }
    });
  };

  // ===== الفصل الثاني عشر · الدرس الأول: ملاحظة خصائص التربة =====
  S.lab_soil = function (c, api) {
    return lab(c, api, {
      init: function () { return { fill: 0, water: 0, wait: 0, tilt: 0, max: 0, look: 0, rows: [] }; },
      steps: [
        { say: 'املأ الكوب (أ) بتربة رملية والكوب (ب) بتربة حديقة، بحجمين متساويين.', btns: [['🪣 املأ الكوبين', function (s) { s.fill = 1; }]], ok: function (s) { return s.fill; } },
        { say: 'ضع كميتين متساويتين من الماء (100 مل) في الكوبين، ثم انتظر دقيقة.', btns: [['💧 اسكب الماء', function (s) { if (s.fill) s.water = 1; }], ['⏱ انتظر دقيقة', function (s) { if (s.water) s.wait = 1; }]], ok: function (s) { return s.wait; } },
        { say: 'أمِل الكوبين تدريجيًا بالمنزلق حتى يصبحا أفقيين تقريبًا، ولاحظ الماء المنسكب.', ui: '<label>الإمالة <input type="range" class="sb" min="0" max="90" value="0"></label>', bind: function (s, b) { var r = b.querySelector('.sb'); r.oninput = function () { s.tilt = +r.value; s.max = Math.max(s.max, s.tilt); }; }, ok: function (s) { return s.max >= 90; } },
        { say: 'لاحظ خصائص التربتين، وسجّل ملاحظاتك.', btns: [['🔍 افحص التربتين', function (s) { s.look = 1; s.rows = [['(أ) رملية', 'حبيبات كبيرة، فاتحة، ضعيفة التماسك', '60'], ['(ب) حديقة', 'داكنة، فيها بقايا أوراق، متماسكة', '25']]; }]], ok: function (s) { return s.look; } }
      ],
      table: function (s) { return table(['التربة', 'الخصائص', 'الماء المنسكب (مل)'], s.rows); },
      end: function () { return 'انسكب من التربة الرملية ماء أكثر؛ فهي <b>لا تحتفظ بالماء</b> جيدًا، أما تربة الحديقة الغنية بالمواد العضوية فاحتفظت بالماء أكثر. والتربة التي تحتفظ بالماء توفّر للنبات وللمخلوقات التي تعيش فيها ماءً مدة أطول. <small>(قيم توضيحية)</small>'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#FEF9C3', '#FFFFFF'); table0(x);
        [['(أ) رملية', '#FCD34D', 60, 330], ['(ب) حديقة', '#57534E', 25, 670]].forEach(function (cp) {
          var a = s.tilt * Math.PI / 180 * .9; x.save(); x.translate(cp[3], 395); x.rotate(-a * (cp[3] < 500 ? -1 : 1) * -1);
          x.strokeStyle = '#64748B'; x.lineWidth = 4; x.fillStyle = 'rgba(226,232,240,.5)'; x.beginPath(); x.moveTo(-70, -200); x.lineTo(-55, 0); x.lineTo(55, 0); x.lineTo(70, -200); x.stroke();
          if (s.fill) { x.fillStyle = cp[1]; x.fillRect(-60, -130, 120, 130); }
          if (s.water) { x.fillStyle = 'rgba(56,189,248,.6)'; var h = s.tilt > 20 ? Math.max(0, 40 - (s.tilt - 20) * cp[2] / 70 * .66) : 40; x.fillRect(-62, -130 - h * (cp[2] / 60), 124, h * (cp[2] / 60)); }
          x.restore(); T(x, cp[0], cp[3], 445, 20, '#1F2937');
          if (s.tilt > 20 && s.water) { var sp = Math.round(Math.min(1, (s.tilt - 20) / 70) * cp[2]); x.fillStyle = 'rgba(56,189,248,.7)'; x.beginPath(); x.ellipse(cp[3] + (cp[3] < 500 ? -150 : 150), 400, 20 + sp, 8, 0, 0, 6.3); x.fill(); T(x, 'انسكب ' + n(sp) + ' مل', cp[3] + (cp[3] < 500 ? -150 : 150), 380, 18, '#0369A1'); }
        });
      }
    });
  };

  // ===== الفصل الثاني عشر · الاستقصاء: ما العوامل المحددة؟ (نباتات البازلاء) =====
  S.lab_peas = function (c, api) {
    var F = { light: ['الضوء', 'حوض في خزانة مظلمة', [8, 5, 3]], water: ['الماء', 'حوض لا يُسقى', [0, 0, 0]], space: ['المكان', '30 بذرة في الحوض نفسه', [26, 18, 12]], temp: ['درجة الحرارة', 'حوض في الثلاجة', [0, 1, 1]] };
    return lab(c, api, {
      init: function () { return { f: null, plant: 0, day: 0, rows: [] }; },
      steps: [
        { say: 'كوّن فرضية واختر <b>عاملًا لاحيويًا واحدًا</b> تختبره، وثبّت بقية العوامل (التربة، كمية الماء، عدد البذور، حجم الحوض).', bind: function (s, b) { Object.keys(F).forEach(function (k) { var e = document.createElement('button'); e.className = 'btn sm'; e.textContent = '🧪 ' + F[k][0]; e.onclick = function () { s.f = k; }; b.appendChild(e); }); }, ok: function (s) { return s.f; } },
        { say: 'ازرع 10 بذور بازلاء في الحوض الضابط (ظروف مناسبة)، وجهّز حوض التجربة بتغيير العامل المختار فقط.', btns: [['🌱 ازرع البذور', function (s) { if (s.f) s.plant = 1; }]], ok: function (s) { return s.plant; } },
        { say: 'تابع النمو: عدّ النباتات الصغيرة في الحوضين كل 5 أيام حتى اليوم 15.', btns: [['📅 بعد 5 أيام: عُدّ', function (s) { if (s.plant && s.day < 15) { s.day += 5; var i = s.day / 5 - 1; s.rows.push([s.day, [8, 9, 9][i], F[s.f][2][i]]); } }]], ok: function (s) { return s.day >= 15; } }
      ],
      table: function (s) { return s.f ? table(['اليوم', 'الحوض الضابط (10 بذور)', 'حوض التجربة: ' + F[s.f][1]], s.rows) : ''; },
      end: function (s) { var k = s.f; return 'المتغير المستقل: <b>' + F[k][0] + '</b> · التابع: عدد النباتات النامية · الضوابط: نوع التربة وكميتها وكمية الماء وحجم الحوض. ' + (k === 'space' ? 'رغم كثرة البذور قلّ عدد النباتات الباقية لاشتداد التنافس على المكان والماء والضوء.' : 'نمت نباتات أقل في حوض التجربة.') + ' إذن <b>' + F[k][0] + '</b> عامل محدد لجماعة البازلاء، وإضافة نبات أو حيوان آخر تزيد التنافس فيقل عدد البازلاء. <small>(قيم توضيحية)</small>'; },
      draw: function (x, s) {
        bg(x, 1000, 460, s.f === 'light' ? '#E5E7EB' : '#ECFCCB', '#FFFFFF'); table0(x);
        var cnt = s.rows.length ? s.rows[s.rows.length - 1] : [0, 0, 0];
        [['الضابط', 330, cnt[1]], ['التجربة', 670, cnt[2]]].forEach(function (p, j) {
          x.fillStyle = '#C2410C'; x.beginPath(); x.moveTo(p[1] - 130, 260); x.lineTo(p[1] + 130, 260); x.lineTo(p[1] + 100, 395); x.lineTo(p[1] - 100, 395); x.fill(); x.fillStyle = '#57534E'; x.fillRect(p[1] - 128, 252, 256, 14);
          var N = Math.min(p[2], 30); for (var i = 0; i < N; i++) { var X = p[1] - 110 + (i % 10) * 24, h = 30 + s.day * 4 - Math.floor(i / 10) * 8; x.strokeStyle = (j && s.f === 'light') ? '#CA8A04' : '#16A34A'; x.lineWidth = 3; x.beginPath(); x.moveTo(X, 252); x.lineTo(X, 252 - h); x.stroke(); x.fillStyle = x.strokeStyle; x.beginPath(); x.ellipse(X + 6, 252 - h, 7, 4, -.5, 0, 6.3); x.fill(); }
          T(x, 'حوض ' + p[0] + ' · ' + n(p[2]) + ' نبتة', p[1], 440, 20, '#1F2937');
        });
        if (s.f === 'temp') E2(x, '❄', 670, 120); if (s.f === 'water') E2(x, '🚫💧', 670, 120); if (s.f === 'light') E2(x, '🌑', 670, 120);
        T(x, s.f ? 'العامل المختبر: ' + F[s.f][0] : 'اختر العامل', 500, 40, 24, '#365314'); if (s.day) T(x, 'اليوم ' + n(s.day), 500, 80, 22, '#365314');
      }
    });
  };
  function E2(x, s, X, Y) { x.font = '50px serif'; x.textAlign = 'center'; x.fillText(s, X, Y); }

  // ===== الفصل الثالث عشر · التجربة الاستهلالية: ما الموارد الطبيعية؟ =====
  S.lab_items = function (c, api) {
    var COL = [['بلاستيك', '#EAB308', 'النفط الخام'], ['ورق', '#2563EB', 'الأشجار'], ['معدن', '#64748B', 'الخامات في باطن الأرض'], ['زجاج', '#0891B2', 'الرمل'], ['خشب', '#92400E', 'الأشجار']];
    var IT = [['✏', 'قلم رصاص', 4], ['📓', 'دفتر', 1], ['🥄', 'ملعقة', 2], ['🥛', 'كأس زجاجية', 3], ['🧴', 'قارورة ماء', 0], ['🪑', 'كرسي خشبي', 4], ['📰', 'جريدة', 1], ['🥫', 'علبة مشروب', 2], ['🪟', 'زجاج النافذة', 3], ['🛍', 'كيس بلاستيك', 0], ['🔑', 'مفتاح', 2], ['📦', 'علبة كرتون', 1]];
    return lab(c, api, {
      init: function () { return { tab: 0, k: 0, put: [], msg: '' }; },
      steps: [
        { say: 'ارسم جدولًا من خمسة أعمدة: بلاستيك، ورق، معدن، زجاج، خشب.', btns: [['📋 ارسم الجدول', function (s) { s.tab = 1; }]], ok: function (s) { return s.tab; } },
        { say: 'فكّر في الأشياء التي تستخدمها يوميًا: اضغط على العمود المناسب لكل شيء.', ok: function (s) { return s.k >= IT.length; } }
      ],
      table: function (s) { return s.k ? table(['المادة', 'عدد الأشياء', 'المورد الطبيعي'], COL.map(function (c2, i) { return [c2[0], s.put.filter(function (p) { return IT[p][2] === i; }).length, c2[2]]; })) : ''; },
      end: function () { return 'كل ما نستخدمه يرجع إلى <b>موارد طبيعية</b>: البلاستيك من النفط الخام، والورق والخشب من الأشجار، والمعادن من الخامات في باطن الأرض، والزجاج من الرمل. نعتمد كثيرًا على البلاستيك والورق؛ لأنهما في أدواتنا اليومية وعبوات المنتجات.'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#FFF7ED', '#FFFFFF');
        if (s.tab) COL.forEach(function (c2, i) { var X = 810 - i * 190; x.fillStyle = c2[1]; x.fillRect(X, 20, 175, 44); T(x, c2[0], X + 87, 50, 22, '#fff'); x.strokeStyle = c2[1]; x.lineWidth = 2; x.strokeRect(X, 64, 175, 240);
          s.put.filter(function (p) { return IT[p][2] === i; }).forEach(function (p, j) { x.font = '32px serif'; x.textAlign = 'center'; x.fillText(IT[p][0], X + 30 + (j % 4) * 38, 110 + Math.floor(j / 4) * 50); });
          if (s.click && s.k < IT.length && s.click[0] > X && s.click[0] < X + 175 && s.click[1] < 305) { if (IT[s.k][2] === i) { s.put.push(s.k); s.k++; s.msg = '✅'; } else s.msg = '❌ مم يُصنع؟'; } });
        if (s.tab && s.k < IT.length) { x.fillStyle = '#fff'; x.fillRect(380, 320, 240, 120); x.strokeStyle = '#C2410C'; x.lineWidth = 3; x.strokeRect(380, 320, 240, 120); x.font = '54px serif'; x.textAlign = 'center'; x.fillText(IT[s.k][0], 500, 395); T(x, IT[s.k][1], 500, 430, 20, '#7C2D12'); }
        if (s.msg) T(x, s.msg, 160, 390, 24, s.msg[0] === '✅' ? '#15803D' : '#B91C1C');
      }
    });
  };

  // ===== الفصل الثالث عشر · الدرس الأول: دراسة مغلف الهدايا =====
  S.lab_wrap = function (c, api) {
    var M = [['🎁', 'ورق تغليف جديد', 'الأشجار + أحبار', 'نادرًا', 'يُرمى غالبًا'], ['📰', 'جريدة قديمة', 'الأشجار (مستعملة)', 'نعم', 'سهل التدوير'], ['👜', 'حقيبة قماش', 'القطن', 'نعم، مرات كثيرة', 'لا نحتاج للتخلص منها'], ['🛍', 'كيس بلاستيك', 'النفط الخام', 'أحيانًا', 'صعب التحلل']];
    return lab(c, api, {
      init: function () { return { k: -1, done: [], rows: [] }; },
      steps: [
        { say: 'ناقش مع مجموعتك طرائق تغليف الهدية والمواد المستخدمة عادة.', btns: [['💬 ابدأ النقاش', function (s) { s.k = 0; }]], ok: function (s) { return s.k >= 0; } },
        { say: 'جرّب تغليف الهدية بكل مادة، وسجّل المورد الطبيعي، وهل يمكن استخدامها مرة أخرى، وسهولة التخلص منها.', bind: function (s, b) { M.forEach(function (m, i) { var e = document.createElement('button'); e.className = 'btn sm'; e.textContent = m[0] + ' غلّف بـ' + m[1]; e.onclick = function () { if (s.done.indexOf(i) < 0) { s.done.push(i); s.k = i; s.rows.push([m[1], m[2], m[3], m[4]]); } }; b.appendChild(e); }); }, ok: function (s) { return s.done.length >= M.length; } }
      ],
      table: function (s) { return table(['مادة التغليف', 'المورد الطبيعي', 'إعادة الاستخدام', 'التخلص منها'], s.rows); },
      end: function () { return 'الأغلفة غالبًا تصبح نفايات بعد فتح الهدية. أفضل المواد ما يمكن <b>إعادة استخدامه</b> كحقيبة القماش، أو ما نعيد استخدامه أصلًا كالجريدة القديمة؛ فتقل النفايات ونحافظ على الأشجار والنفط.'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#FDF2F8', '#FFFFFF'); table0(x);
        x.fillStyle = '#F472B6'; x.fillRect(420, 250, 160, 150); x.fillStyle = '#FDE68A'; x.fillRect(490, 250, 20, 150); x.fillRect(420, 315, 160, 20);
        if (s.k >= 0 && s.done.length) { x.font = '120px serif'; x.textAlign = 'center'; x.fillText(M[s.k][0], 500, 230); T(x, M[s.k][1], 500, 80, 26, '#9D174D'); }
        s.done.forEach(function (i, j) { x.font = '40px serif'; x.textAlign = 'center'; x.fillText(M[i][0], 120 + j * 60, 60); });
      }
    });
  };

  // ===== الفصل الثالث عشر · الاستقصاء: استخدام الأراضي (تخطيط مدينة 10 × 10) =====
  S.lab_city = function (c, api) {
    var Z = [['🏢', 'مكاتب', 6, 1, '#6366F1'], ['🏭', 'محطة صناعية', 6, 1, '#64748B'], ['🏫', 'مدرسة', 1, 1, '#F59E0B'], ['🗑', 'مكب نفايات', 4, 1, '#78350F'], ['🏠', 'منازل وشقق', 44, 0, '#FB923C'], ['🏪', 'محلات', 19, 0, '#EC4899'], ['🌳', 'حدائق', 20, 0, '#22C55E']];
    function cnt(s, z) { return s.g.filter(function (v) { return v === z; }).length; }
    function joined(s, z) { var cells = []; s.g.forEach(function (v, i) { if (v === z) cells.push(i); }); if (!cells.length) return false; var seen = {}, st = [cells[0]]; seen[cells[0]] = 1; while (st.length) { var i = st.pop(), r = Math.floor(i / 10), cc = i % 10; [[r - 1, cc], [r + 1, cc], [r, cc - 1], [r, cc + 1]].forEach(function (p) { if (p[0] < 0 || p[0] > 9 || p[1] < 0 || p[1] > 9) return; var j = p[0] * 10 + p[1]; if (!seen[j] && s.g[j] === z) { seen[j] = 1; st.push(j); } }); } return Object.keys(seen).length === cells.length; }
    function near(s, a, b) { for (var i = 0; i < 100; i++) if (s.g[i] === a) { var r = Math.floor(i / 10), cc = i % 10; for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) { var R = r + dr, C = cc + dc; if (R >= 0 && R < 10 && C >= 0 && C < 10 && s.g[R * 10 + C] === b) return true; } } return false; }
    function valid(s) { return Z.every(function (z, i) { return cnt(s, i) === z[2] && (!z[3] || joined(s, i)); }); }
    return lab(c, api, {
      h: 460,
      init: function () { var g = []; for (var i = 0; i < 100; i++) g.push(-1); return { grid: 0, g: g, z: 4, chk: 0, msg: '' }; },
      steps: [
        { say: 'ارسم على ورقة المربعات أرضًا مساحتها 100 وحدة (10 × 10).', btns: [['📐 ارسم الأرض', function (s) { s.grid = 1; }]], ok: function (s) { return s.grid; } },
        { say: 'اختر المنطقة ثم اضغط على المربعات لتوزيعها. المكاتب والمحطة والمكب كتلة واحدة متصلة لا تُقسَّم. (اضغط المربع مرة أخرى لمسحه)', bind: function (s, b) { Z.forEach(function (z, i) { var e = document.createElement('button'); e.className = 'btn sm'; e.innerHTML = z[0] + ' ' + z[1] + ' <small>(' + n(z[2]) + ')</small>'; e.onclick = function () { s.z = i; b.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-pressed', o === e); }); }; if (i === 4) e.setAttribute('aria-pressed', 'true'); b.appendChild(e); }); var f = document.createElement('button'); f.className = 'btn sm'; f.textContent = '⚡ وزّع المتبقي منازل'; f.onclick = function () { var need = 44 - cnt(s, 4); for (var i = 0; i < 100 && need > 0; i++) if (s.g[i] < 0) { s.g[i] = 4; need--; } }; b.appendChild(f); }, ok: function (s) { return valid(s); } },
        { say: 'افحص تصميمك: هل المحطة الصناعية ومكب النفايات بعيدان عن المنازل والمدرسة؟', btns: [['🔎 افحص التصميم', function (s) { s.chk = 1; var bad = []; if (near(s, 1, 4) || near(s, 1, 2)) bad.push('المحطة الصناعية ملاصقة للمنازل أو المدرسة'); if (near(s, 3, 4) || near(s, 3, 2)) bad.push('مكب النفايات ملاصق للمنازل أو المدرسة'); s.msg = bad.length ? '⚠ ' + bad.join(' · ') + '. يمكنك التعديل ثم الفحص مجددًا، أو المتابعة.' : '✅ تصميم جيد: المحطة والمكب بعيدان عن السكان.'; }]], ok: function (s) { return s.chk; } }
      ],
      table: function (s) { return s.grid ? table(['المنطقة', 'المطلوب', 'وُزِّع'], Z.map(function (z, i) { return [z[1], z[2], cnt(s, i)]; })) : ''; },
      end: function (s) { return (s.msg ? s.msg + '<br>' : '') + 'الأفضل وضع <b>المحطة الصناعية ومكب النفايات</b> على أطراف المدينة بعيدًا عن المنازل، وفي الجهة التي لا تحمل الرياح منها الروائح والدخان، و<b>المدرسة</b> وسط المنازل، والحدائق موزعة قربها أو حزامًا أخضر يفصل المحطة عنها. والمطار على الأطراف بسبب الضجيج والسلامة مع طريق يربطه بالمدينة.'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#F8FAFC', '#FFFFFF'); if (!s.grid) { T(x, 'ورقة مربعات 10 × 10', 500, 230, 30, '#334155'); return; }
        var S0 = 42, X0 = 290, Y0 = 18;
        for (var i = 0; i < 100; i++) { var r = Math.floor(i / 10), cc = i % 10, X = X0 + (9 - cc) * S0, Y = Y0 + r * S0; var v = s.g[i]; x.fillStyle = v < 0 ? '#fff' : Z[v][4]; x.fillRect(X, Y, S0 - 2, S0 - 2); x.strokeStyle = '#CBD5E1'; x.strokeRect(X, Y, S0 - 2, S0 - 2); if (v >= 0) { x.font = '22px serif'; x.textAlign = 'center'; x.fillText(Z[v][0], X + 20, Y + 29); }
          if (s.click && s.click[0] > X && s.click[0] < X + S0 && s.click[1] > Y && s.click[1] < Y + S0) { if (s.g[i] === s.z) s.g[i] = -1; else if (cnt(s, s.z) < Z[s.z][2]) s.g[i] = s.z; } }
        T(x, '💨 الرياح', 120, 60, 20, '#0369A1'); x.strokeStyle = '#0369A1'; x.lineWidth = 3; x.beginPath(); x.moveTo(60, 80); x.lineTo(180, 80); x.lineTo(168, 72); x.moveTo(180, 80); x.lineTo(168, 88); x.stroke();
        var left = Z.filter(function (z, i) { return cnt(s, i) !== z[2] || (z[3] && cnt(s, i) && !joined(s, i)); }).map(function (z) { return z[0]; }); T(x, valid(s) ? '✅ وُزِّعت كل المناطق' : 'بقي: ' + left.join(' '), 140, 200, 18, valid(s) ? '#15803D' : '#B45309');
      }
    });
  };

  // ===== الفصل الثالث عشر · تقويم الأداء: تأثير عصير الليمون في النباتات (نمذجة المطر الحمضي) =====
  S.lab_lemon = function (c, api) {
    return lab(c, api, {
      init: function () { return { set: 0, day: 0, rows: [] }; },
      steps: [
        { say: 'جهّز نبتتين متماثلتين في النوع والحجم والتربة والضوء؛ (أ) تُسقى ماءً، و(ب) ماءً مع عصير الليمون (حمضي).', btns: [['🪴 جهّز النبتتين', function (s) { s.set = 1; s.rows = [[0, 'خضراء نضرة', 'خضراء نضرة']]; }]], ok: function (s) { return s.set; } },
        { say: 'اسقِ النبتتين بالكمية نفسها، ولاحظ أوراقهما كل 4 أيام حتى 12 يومًا.', btns: [['📅 بعد 4 أيام: لاحظ', function (s) { if (s.set && s.day < 12) { s.day += 4; s.rows.push([s.day, 'خضراء نضرة', ['بقع صفراء على الأوراق', 'ذبول واصفرار', 'ذبول شديد وتساقط أوراق'][s.day / 4 - 1]]); } }]], ok: function (s) { return s.day >= 12; } }
      ],
      table: function (s) { return table(['اليوم', '(أ) ماء', '(ب) ماء + ليمون'], s.rows); },
      end: function () { return 'بقيت النبتة (أ) نضرة، وذبلت النبتة (ب) المسقية بالمحلول الحمضي. المتغير المستقل: نوع ماء الري · التابع: صحة الأوراق · الثوابت: النوع والتربة والضوء والكمية. وهكذا يضر <b>المطر الحمضي</b> النباتات في البيئة. <small>(نتائج توضيحية)</small>'; },
      draw: function (x, s) {
        bg(x, 1000, 460, '#ECFDF5', '#FFFFFF'); table0(x); if (!s.set) return;
        [['(أ) ماء', 330, 0], ['(ب) ماء + ليمون', 670, s.day / 12]].forEach(function (p) {
          x.fillStyle = '#C2410C'; x.fillRect(p[1] - 60, 320, 120, 80); x.strokeStyle = '#15803D'; x.lineWidth = 6; x.beginPath(); x.moveTo(p[1], 320); x.lineTo(p[1], 170 + p[2] * 60); x.stroke();
          for (var i = 0; i < 6; i++) { var side = i % 2 ? 1 : -1, Y = 300 - i * 22 + p[2] * 40 * (i / 6); x.fillStyle = p[2] > .6 ? '#CA8A04' : p[2] > .2 ? '#84CC16' : '#16A34A'; x.save(); x.translate(p[1] + side * 6, Y); x.rotate(side * (0.6 + p[2] * 0.9)); x.beginPath(); x.ellipse(side * 28, 0, 30, 11, 0, 0, 6.3); x.fill(); x.restore(); }
          T(x, p[0], p[1], 445, 20, '#14532D');
        });
        x.font = '40px serif'; x.textAlign = 'center'; x.fillText('🍋', 790, 200); T(x, 'اليوم ' + n(s.day), 500, 50, 24, '#14532D');
      }
    });
  };

})();

/* استراتيجيات أسماء الطلاب: الشعب والأسماء، عجلة الأسماء، سحب القرعة، الكرسي الساخن، المجموعات العشوائية، لوحة الشرف، و«من يجيب؟» */
window.STU = (function () {
  var AR = '٠١٢٣٤٥٦٧٨٩';
  function n(x) { return String(x).replace(/\d/g, function (d) { return AR[d]; }); }
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var KEY = 'durus-classes';
  var D = { cur: '', classes: {}, stars: {} };
  try { var s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.classes) D = Object.assign(D, s); } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) {} }
  function names() { return (D.classes[D.cur] || []).slice(); }
  var pool = [], groups = null, onGroups = null;
  function nextName() { var all = names(); if (!all.length) return null; pool = pool.filter(function (x) { return all.indexOf(x) >= 0; }); if (!pool.length) pool = shuffle(all); return pool.pop(); }
  function star(nm, d) { var k = D.cur + '|' + nm; D.stars[k] = Math.max(0, (D.stars[k] || 0) + d); save(); }
  function stars(nm) { return D.stars[D.cur + '|' + nm] || 0; }
  var COLS = ['#DC2626', '#2563EB', '#16A34A', '#CA8A04', '#7C3AED', '#0891B2'];

  // ---------- النافذة ----------
  var TABS = [['cls', '📋 الشعب والأسماء'], ['wheel', '🎡 عجلة الأسماء'], ['draw', '🎟 سحب القرعة'], ['hot', '🔥 الكرسي الساخن'], ['web', '🕸 شبكة العنكبوت'], ['heads', '🔢 الرؤوس المرقمة'], ['duel', '⚔ تحدّي الثنائي'], ['tick', '⏳ السؤال المؤقّت'], ['summit', '🏔 سباق القمة'], ['grp', '👥 المجموعات'], ['hon', '⭐ لوحة الشرف']];
  function open(tab) {
    var bg = el('div', 'stu-bg'), box = el('div', 'stu-box'); bg.appendChild(box);
    box.innerHTML = '<div class="stu-head"><b>👥 الطلاب · الشعبة <span class="stu-cur">' + (D.cur ? esc(D.cur) : '—') + '</span></b><button class="stu-x" aria-label="إغلاق">✕</button></div><div class="stu-tabs">' + TABS.map(function (t) { return '<button data-t="' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div><div class="stu-body"></div>';
    var stop = null;
    function close() { if (stop) stop(); bg.remove(); document.removeEventListener('keydown', esc2); }
    function esc2(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', esc2);
    box.querySelector('.stu-x').onclick = close; bg.onclick = function (e) { if (e.target === bg) close(); };
    function show(t) {
      if (stop) { stop(); stop = null; }
      box.querySelectorAll('.stu-tabs button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.t === t); });
      var body = box.querySelector('.stu-body'); body.innerHTML = '';
      box.querySelector('.stu-cur').textContent = D.cur || '—';
      if (t !== 'cls' && !names().length) { body.innerHTML = '<p class="stu-empty">اكتب أسماء طلاب الشعبة أولًا من تبويب «📋 الشعب والأسماء».</p>'; return; }
      stop = R[t](body, show) || null;
    }
    box.querySelectorAll('.stu-tabs button').forEach(function (b) { b.onclick = function () { show(b.dataset.t); }; });
    document.body.appendChild(bg);
    show(tab || (names().length ? 'wheel' : 'cls'));
  }

  var R = {
    cls: function (body, show) {
      var ks = Object.keys(D.classes);
      body.innerHTML = '<div class="stu-row"><label>الشعبة: <select class="stu-sel">' + ks.map(function (k) { return '<option' + (k === D.cur ? ' selected' : '') + '>' + esc(k) + '</option>'; }).join('') + '<option value="__new">➕ شعبة جديدة…</option></select></label><input class="stu-new" placeholder="مثال: ٤/١" hidden><button class="b stu-del">🗑 حذف الشعبة</button></div>' +
        '<label class="stu-lab">أسماء الطلاب (اسم في كل سطر):</label><textarea class="stu-ta" rows="9" placeholder="أحمد محمد&#10;خالد علي&#10;…"></textarea><div class="stu-row"><button class="b c stu-save">💾 حفظ الأسماء</button><span class="stu-cnt"></span></div><p class="stu-note">تُحفظ الأسماء في هذا الجهاز فقط، وتظهر في جميع الدروس.</p>';
      var sel = body.querySelector('.stu-sel'), nw = body.querySelector('.stu-new'), ta = body.querySelector('.stu-ta');
      function load() { ta.value = (D.classes[D.cur] || []).join('\n'); body.querySelector('.stu-cnt').textContent = D.cur ? n((D.classes[D.cur] || []).length) + ' طالبًا' : ''; }
      if (!ks.length) { sel.value = '__new'; nw.hidden = false; }
      sel.onchange = function () { if (sel.value === '__new') { nw.hidden = false; nw.focus(); ta.value = ''; } else { nw.hidden = true; D.cur = sel.value; pool = []; save(); load(); show('cls'); } };
      body.querySelector('.stu-save').onclick = function () {
        var k = sel.value === '__new' ? nw.value.trim() : D.cur; if (!k) { nw.focus(); return; }
        k = k.replace(/\d/g, function (d) { return AR[d]; });
        D.classes[k] = ta.value.split(/\n|،|,/).map(function (x) { return x.trim(); }).filter(Boolean); D.cur = k; pool = []; save(); show('cls');
      };
      body.querySelector('.stu-del').onclick = function () { if (!D.cur || !D.classes[D.cur]) return; delete D.classes[D.cur]; D.cur = Object.keys(D.classes)[0] || ''; save(); show('cls'); };
      load();
    },
    wheel: function (body) {
      var ns = names();
      body.innerHTML = '<div class="stu-wheel"><div class="stu-wc"><canvas width="560" height="560"></canvas><i class="stu-ptr">▼</i></div><div class="stu-side"><button class="b c big stu-spin">🎡 أدِر العجلة</button><label class="stu-chk"><input type="checkbox" checked> استبعد من اختير</label><div class="stu-win"></div></div></div>';
      var cv = body.querySelector('canvas'), x = cv.getContext('2d'), ang = 0, v = 0, on = true, left = ns.slice(), chk = body.querySelector('input');
      function draw() {
        var N = left.length || 1, R = 270; x.clearRect(0, 0, 560, 560);
        left.forEach(function (nm, i) { var a0 = ang + i * 2 * Math.PI / N, a1 = a0 + 2 * Math.PI / N; x.beginPath(); x.moveTo(280, 280); x.arc(280, 280, R, a0, a1); x.fillStyle = COLS[i % 6]; x.fill(); var mid = (a0 + a1) / 2, mm = ((mid % 6.2832) + 6.2832) % 6.2832, flip = mm > Math.PI / 2 && mm < 3 * Math.PI / 2; x.save(); x.translate(280, 280); x.rotate(flip ? mid + Math.PI : mid); x.fillStyle = '#fff'; x.font = '700 ' + Math.max(14, Math.min(26, 300 / N + 8)) + 'px Cairo, Tahoma'; x.direction = 'rtl'; x.textAlign = flip ? 'left' : 'right'; x.fillText(nm.length > 16 ? nm.slice(0, 16) + '…' : nm, flip ? -(R - 14) : R - 14, 8); x.restore(); });
        x.beginPath(); x.arc(280, 280, 34, 0, 6.3); x.fillStyle = '#fff'; x.fill();
      }
      (function loop() { if (!on) return; if (v > 0.0005) { ang += v; v *= 0.985; if (v <= 0.0005) { v = 0; pick(); } } draw(); requestAnimationFrame(loop); })();
      function pick() { var N = left.length, a = ((-Math.PI / 2 - ang) % (2 * Math.PI) + 4 * Math.PI) % (2 * Math.PI), i = Math.floor(a / (2 * Math.PI / N)) % N, nm = left[i]; body.querySelector('.stu-win').innerHTML = win(nm); bindWin(body, nm); if (chk.checked) { left.splice(i, 1); if (!left.length) left = ns.slice(); } }
      body.querySelector('.stu-spin').onclick = function () { if (v) return; v = 0.25 + Math.random() * 0.2; body.querySelector('.stu-win').innerHTML = ''; };
      return function () { on = false; };
    },
    draw: function (body) {
      var ns = shuffle(names());
      body.innerHTML = '<p class="stu-lead">اختر بطاقة مقلوبة لتسحب اسمًا… لا يتكرر الاسم حتى تنتهي البطاقات.</p><div class="stu-cards">' + ns.map(function (_, i) { return '<button class="stu-card" data-i="' + i + '">' + n(i + 1) + '</button>'; }).join('') + '</div><div class="stu-win"></div>';
      body.querySelectorAll('.stu-card').forEach(function (b) { b.onclick = function () { if (b.classList.contains('on')) return; var nm = ns[+b.dataset.i]; b.classList.add('on'); b.textContent = nm; body.querySelector('.stu-win').innerHTML = win(nm); bindWin(body, nm); }; });
    },
    hot: function (body) {
      body.innerHTML = '<div class="stu-hot"><div class="stu-chair">🪑</div><div class="stu-hn">—</div><div class="stu-tm">٣٠</div><div class="stu-row" style="justify-content:center"><button class="b c big stu-go">🔥 اختر طالبًا للكرسي الساخن</button></div><div class="stu-row stu-res" hidden style="justify-content:center"><button class="b g stu-ok">✓ أجاب إجابة صحيحة (+⭐)</button><button class="b stu-no">✗ لم يُجب</button></div></div>';
      var tm = null;
      body.querySelector('.stu-go').onclick = function () {
        var nm = nextName(); clearInterval(tm); var left = 30, h = body.querySelector('.stu-hn'), t = body.querySelector('.stu-tm'); body.querySelector('.stu-res').hidden = false;
        var k = 0, sp = setInterval(function () { var all = names(); h.textContent = all[Math.floor(Math.random() * all.length)]; if (++k > 14) { clearInterval(sp); h.textContent = nm; h.classList.add('pop'); t.textContent = n(left); tm = setInterval(function () { left--; t.textContent = n(Math.max(0, left)); t.classList.toggle('low', left <= 10); if (left <= 0) clearInterval(tm); }, 1000); } }, 70);
        h.classList.remove('pop'); body.querySelector('.stu-ok').onclick = function () { star(nm, 1); clearInterval(tm); h.textContent = '⭐ ' + nm; };
        body.querySelector('.stu-no').onclick = function () { clearInterval(tm); };
      };
      return function () { clearInterval(tm); };
    },
    web: function (body) {
      // شبكة العنكبوت: كل طالب يجيب ثم «يرمي الخيط» إلى زميل؛ تُرسم الشبكة بين الأسماء
      var all = names().slice(0, 40), chain = [];
      body.innerHTML = '<div class="stu-web"><canvas width="640" height="460"></canvas><div class="stu-side"><div class="stu-hn">—</div><button class="b c big stu-go">🕸 ابدأ الشبكة</button><button class="b g stu-pass" disabled>✓ أجاب… مرّر الخيط</button><button class="b stu-skip" disabled>↷ تخطَّ</button><button class="b stu-rst">⟲ شبكة جديدة</button><p class="stu-note">يجيب الطالب ثم يُمرَّر الخيط إلى زميل لم يُسأل بعد؛ وتكبر الشبكة مع كل إجابة.</p></div></div>';
      var cv = body.querySelector('canvas'), g = cv.getContext('2d'), h = body.querySelector('.stu-hn');
      var P = all.map(function (nm, i) { var a = -Math.PI / 2 + i * 2 * Math.PI / all.length; return { nm: nm, x: 320 + 270 * Math.cos(a), y: 230 + 190 * Math.sin(a) }; });
      function draw() {
        g.clearRect(0, 0, 640, 460); g.strokeStyle = '#94A3B8'; g.lineWidth = 1;
        for (var r = 1; r <= 3; r++) { g.beginPath(); g.ellipse(320, 230, 90 * r, 63 * r, 0, 0, 7); g.stroke(); }
        g.strokeStyle = '#B45309'; g.lineWidth = 3;
        for (var i = 1; i < chain.length; i++) { var a = P[chain[i - 1]], b = P[chain[i]]; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
        P.forEach(function (p, i) { var k = chain.indexOf(i), last = i === chain[chain.length - 1]; g.font = '600 ' + (all.length > 24 ? 13 : 16) + 'px Cairo, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
          var w = g.measureText(p.nm).width + 14; g.fillStyle = last ? '#DC2626' : k >= 0 ? '#FEF3C7' : '#F1F5F9'; g.fillRect(p.x - w / 2, p.y - 13, w, 26); g.fillStyle = last ? '#fff' : '#0F172A'; g.fillText(p.nm, p.x, p.y + 1); });
      }
      function pick() { var free = P.map(function (_, i) { return i; }).filter(function (i) { return chain.indexOf(i) < 0; }); if (!free.length) { h.textContent = '🎉 اكتملت الشبكة!'; body.querySelector('.stu-pass').disabled = body.querySelector('.stu-skip').disabled = true; return; } var i = free[Math.floor(Math.random() * free.length)]; chain.push(i); h.textContent = P[i].nm; h.classList.remove('pop'); void h.offsetWidth; h.classList.add('pop'); draw(); }
      body.querySelector('.stu-go').onclick = function () { chain = []; pick(); body.querySelector('.stu-pass').disabled = body.querySelector('.stu-skip').disabled = false; };
      body.querySelector('.stu-pass').onclick = function () { if (chain.length) star(P[chain[chain.length - 1]].nm, 1); pick(); };
      body.querySelector('.stu-skip').onclick = function () { pick(); };
      body.querySelector('.stu-rst').onclick = function () { chain = []; h.textContent = '—'; draw(); };
      draw();
    },
    heads: function (body) {
      // الرؤوس المرقمة: لكل طالب رقم داخل مجموعته؛ يُسحب رقم فيقف صاحبه من كل مجموعة
      if (!groups) { var s0 = shuffle(names()), k0 = Math.min(4, s0.length); groups = []; for (var i = 0; i < k0; i++) groups.push([]); s0.forEach(function (nm, i) { groups[i % k0].push(nm); }); if (onGroups) onGroups(groups); }
      var mx = Math.max.apply(null, groups.map(function (m) { return m.length; }));
      body.innerHTML = '<div class="stu-row"><button class="b c big stu-go">🔢 اسحب رقمًا</button><span class="stu-num">—</span><span class="stu-note">تتشاور كل مجموعة في الإجابة، ثم يجيب صاحب الرقم المسحوب من كل مجموعة.</span></div><div class="stu-grps"></div>';
      function render(num) { body.querySelector('.stu-grps').innerHTML = groups.map(function (m, i) { return '<div class="stu-grp" style="--gc:' + COLS[i % 6] + '"><b>المجموعة ' + n(i + 1) + '</b><ol>' + m.map(function (nm, j) { return '<li' + (j + 1 === num ? ' class="on"' : '') + '>' + esc(nm) + (j + 1 === num ? ' <button class="stu-st" data-n="' + esc(nm) + '">⭐</button>' : '') + '</li>'; }).join('') + '</ol></div>'; }).join('');
        body.querySelectorAll('.stu-st').forEach(function (b) { b.onclick = function () { star(b.dataset.n, 1); b.textContent = '✓⭐'; b.disabled = true; }; }); }
      body.querySelector('.stu-go').onclick = function () { var num = 1 + Math.floor(Math.random() * mx), k = 0, t = body.querySelector('.stu-num'); var sp = setInterval(function () { t.textContent = n(1 + Math.floor(Math.random() * mx)); if (++k > 12) { clearInterval(sp); t.textContent = n(num); render(num); } }, 70); };
      render(0);
    },
    duel: function (body) {
      // تحدّي الثنائي: يُسحب طالبان يتنافسان على السؤال نفسه، ويختار المعلم الفائز
      body.innerHTML = '<div class="stu-duel"><div class="stu-dn a">—</div><div class="stu-vs">⚔</div><div class="stu-dn b">—</div></div><div class="stu-row" style="justify-content:center"><button class="b c big stu-go">⚔ اسحب ثنائيًا</button></div><div class="stu-row stu-res" hidden style="justify-content:center"><button class="b g stu-wa">🏆 فاز الأول</button><button class="b g stu-wb">🏆 فاز الثاني</button><button class="b stu-tie">🤝 تعادل</button></div><p class="stu-note">يجيب الطالبان على السؤال نفسه؛ من يجيب أولًا إجابة صحيحة يفوز بنجمة.</p>';
      var A = body.querySelector('.stu-dn.a'), Bn = body.querySelector('.stu-dn.b'), pa = null, pb = null;
      body.querySelector('.stu-go').onclick = function () { pa = nextName(); pb = nextName(); if (pb === pa) pb = nextName(); body.querySelector('.stu-res').hidden = false; [A, Bn].forEach(function (e) { e.classList.remove('win'); });
        var k = 0, all = names(), sp = setInterval(function () { A.textContent = all[Math.floor(Math.random() * all.length)]; Bn.textContent = all[Math.floor(Math.random() * all.length)]; if (++k > 14) { clearInterval(sp); A.textContent = pa; Bn.textContent = pb || '—'; } }, 70); };
      body.querySelector('.stu-wa').onclick = function () { if (pa) { star(pa, 1); A.classList.add('win'); A.textContent = '⭐ ' + pa; } };
      body.querySelector('.stu-wb').onclick = function () { if (pb) { star(pb, 1); Bn.classList.add('win'); Bn.textContent = '⭐ ' + pb; } };
      body.querySelector('.stu-tie').onclick = function () { if (pa) star(pa, 1); if (pb) star(pb, 1); };
    },
    tick: function (body) {
      // السؤال المؤقّت: يُسحب اسم ويبدأ عدّ تنازلي، ويقرر المعلم: صحيح ⭐ أو يُمرّر السؤال لاسم جديد
      body.innerHTML = '<div class="stu-tk"><div class="stu-tkn">—</div><svg viewBox="0 0 120 120" class="stu-tkc"><circle cx="60" cy="60" r="52" class="bgc"/><circle cx="60" cy="60" r="52" class="fgc"/></svg><div class="stu-tks">٠</div></div><div class="stu-row" style="justify-content:center"><label>المهلة: <select class="stu-tsec"><option value="10">١٠ ث</option><option value="20" selected>٢٠ ث</option><option value="30">٣٠ ث</option></select></label><button class="b c big stu-go">⏳ اسحب اسمًا وابدأ</button></div><div class="stu-row stu-res" hidden style="justify-content:center"><button class="b g stu-ok">✅ إجابة صحيحة ⭐</button><button class="b stu-pass">↪ مرّر لطالب آخر</button></div><p class="stu-note">إذا انتهى الوقت أو أخطأ الطالب، مرّر السؤال نفسه لطالب جديد.</p>';
      var nm = body.querySelector('.stu-tkn'), sc = body.querySelector('.stu-tks'), fg = body.querySelector('.fgc'), cur = null, tm = null, L = 2 * Math.PI * 52;
      fg.style.strokeDasharray = L;
      function go() { clearInterval(tm); cur = nextName(); nm.textContent = cur || 'أضف أسماء الشعبة أولًا'; if (!cur) return; body.querySelector('.stu-res').hidden = false; nm.classList.remove('win');
        var T0 = +body.querySelector('.stu-tsec').value, t = T0; sc.textContent = n(t); fg.style.strokeDashoffset = 0; fg.style.stroke = '#16A34A';
        tm = setInterval(function () { t--; sc.textContent = n(Math.max(t, 0)); fg.style.strokeDashoffset = L * (1 - t / T0); if (t <= 5) fg.style.stroke = '#DC2626'; if (t <= 0) { clearInterval(tm); sc.textContent = '⌛'; } }, 1000); }
      body.querySelector('.stu-go').onclick = go;
      body.querySelector('.stu-pass').onclick = go;
      body.querySelector('.stu-ok').onclick = function () { clearInterval(tm); if (cur) { star(cur, 1); nm.classList.add('win'); nm.textContent = '⭐ ' + cur; } };
    },
    summit: function (body) {
      // سباق القمة: يتسلق كل طالب يجيب إجابة صحيحة درجة نحو القمة (٥ درجات)، ومن يبلغها ينال نجمتين
      if (!D.climb) D.climb = {};
      function lv(x) { return D.climb[D.cur + '|' + x] || 0; }
      function render(pick) {
        var ns = names(); if (!ns.length) { body.innerHTML = '<p class="stu-lead">أضف أسماء الشعبة أولًا من تبويب «الشعب والأسماء».</p>'; return; }
        var top = ns.slice().sort(function (a, b) { return lv(b) - lv(a); }).slice(0, 8);
        body.innerHTML = '<div class="stu-row" style="justify-content:center"><button class="b c big stu-go">🎯 اسحب متسابقًا</button><b class="stu-sp">' + (pick ? esc(pick) : '—') + '</b><button class="b g stu-up"' + (pick ? '' : ' disabled') + '>⬆ إجابة صحيحة</button><button class="b stu-rst">↺ تصفير</button></div><div class="stu-mt">' + top.map(function (x) { var l = lv(x); return '<div class="stu-mc' + (x === pick ? ' on' : '') + '"><div class="stu-mbar"><i style="height:' + (l * 20) + '%"></i><span>' + (l >= 5 ? '🚩' : '🧗') + '</span></div><b>' + esc(x) + '</b><small>' + n(l) + ' / ٥</small></div>'; }).join('') + '</div><p class="stu-note">يظهر أعلى ثمانية متسابقين. من يبلغ القمة (٥ درجات) ينال نجمتين ⭐⭐.</p>';
        body.querySelector('.stu-go').onclick = function () { render(nextName()); };
        body.querySelector('.stu-up').onclick = function () { if (!pick) return; var k = D.cur + '|' + pick; D.climb[k] = Math.min(5, lv(pick) + 1); if (D.climb[k] === 5) star(pick, 2); save(); render(pick); };
        body.querySelector('.stu-rst').onclick = function () { names().forEach(function (x) { delete D.climb[D.cur + '|' + x]; }); save(); render(null); };
      }
      render(null);
    },
    grp: function (body) {
      body.innerHTML = '<div class="stu-row"><label>عدد المجموعات: <select class="stu-g">' + [2, 3, 4, 5, 6].map(function (k) { return '<option' + (k === 4 ? ' selected' : '') + '>' + n(k) + '</option>'; }).join('') + '</select></label><button class="b c stu-mk">🔀 وزّع الطلاب عشوائيًا</button></div><div class="stu-grps"></div>';
      function render() { var g = body.querySelector('.stu-grps'); if (!groups) { g.innerHTML = ''; return; } g.innerHTML = groups.map(function (m, i) { return '<div class="stu-grp" style="--gc:' + COLS[i % 6] + '"><b>المجموعة ' + n(i + 1) + '</b><ol>' + m.map(function (nm) { return '<li>' + esc(nm) + '</li>'; }).join('') + '</ol></div>'; }).join(''); }
      body.querySelector('.stu-mk').onclick = function () { var k = AR.indexOf(body.querySelector('.stu-g').value), s = shuffle(names()); groups = []; for (var i = 0; i < k; i++) groups.push([]); s.forEach(function (nm, i) { groups[i % k].push(nm); }); render(); if (onGroups) onGroups(groups); };
      render();
    },
    hon: function (body) {
      var ns = names().sort(function (a, b) { return stars(b) - stars(a); });
      body.innerHTML = '<p class="stu-lead">اضغط ⭐ لمنح نجمة، أو − لسحبها. تُحفظ النجوم لكل شعبة.</p><div class="stu-hon">' + ns.map(function (nm) { return '<div class="stu-hr"><span>' + esc(nm) + '</span><b>' + '⭐'.repeat(Math.min(stars(nm), 10)) + (stars(nm) > 10 ? ' ' + n(stars(nm)) : '') + '</b><button data-d="1">⭐</button><button data-d="-1">−</button></div>'; }).join('') + '</div>';
      body.querySelectorAll('.stu-hr').forEach(function (r, i) { r.querySelectorAll('button').forEach(function (b) { b.onclick = function () { star(ns[i], +b.dataset.d); R.hon(body); }; }); });
    }
  };
  function win(nm) { return '<div class="stu-name">🎯 ' + esc(nm) + '</div><div class="stu-row" style="justify-content:center"><button class="b g stu-st">⭐ نجمة</button></div>'; }
  function bindWin(body, nm) { var b = body.querySelector('.stu-st'); if (b) b.onclick = function () { star(nm, 1); b.textContent = '⭐ +١'; b.disabled = true; }; }

  // «من يجيب؟» داخل بطاقة السؤال
  function who(card) {
    var nm = nextName(); if (!nm) { open('cls'); return; }
    var old = card.querySelector('.stu-badge'); if (old) old.remove();
    var b = el('div', 'stu-badge', '<span>🎯 يجيب الآن:</span> <b>' + esc(nm) + '</b> <button aria-label="نجمة">⭐</button> <button aria-label="طالب آخر">🔄</button>');
    b.querySelectorAll('button')[0].onclick = function () { star(nm, 1); this.textContent = '⭐ +١'; this.disabled = true; };
    b.querySelectorAll('button')[1].onclick = function () { who(card); };
    card.insertBefore(b, card.firstChild);
  }
  return { open: open, who: who, has: function () { return names().length > 0; }, groups: function () { return groups; }, onGroups: function (f) { onGroups = f; } };
})();
