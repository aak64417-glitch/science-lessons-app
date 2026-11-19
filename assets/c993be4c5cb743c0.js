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
    var cv = document.createElement('canvas'); cv.width = 1000; cv.height = o.h || 470; cv.style.touchAction = 'manipulation'; c.appendChild(cv); var x = cv.getContext('2d');
    var panel = document.createElement('div'); panel.className = 'labp'; c.appendChild(panel);
    panel.innerHTML = '<div class="labstep"></div><div class="labbtns"></div><div class="labend" hidden></div>';
    var st = o.init ? o.init() : {}, k = -1;
    st.T = 0; st.click = null; st.hover = null;
    function pos(e) { var r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * 1000 / r.width, (e.clientY - r.top) * cv.height / r.height]; }
    cv.addEventListener('click', function (e) { st.click = pos(e); });
    cv.addEventListener('mousemove', function (e) { st.hover = pos(e); });
    cv.addEventListener('mouseleave', function () { st.hover = null; });
    function next() {
      k++; st.step = k; api && api.step && api.step(k);
      if (k >= o.steps.length) { panel.querySelector('.labstep').innerHTML = '✅ أتممت خطوات التجربة!'; panel.querySelector('.labbtns').innerHTML = ''; var e = panel.querySelector('.labend'); e.hidden = false; e.innerHTML = '🔎 <b>الملاحظة والاستنتاج:</b> ' + o.end(st); api && api.done && api.done(); return; }
      var s = o.steps[k]; panel.querySelector('.labstep').innerHTML = '<span class="labn">' + n(k + 1) + '</span> ' + s.say;
      var bx = panel.querySelector('.labbtns'); bx.innerHTML = '';
      (s.btns || []).forEach(function (b) { var e = document.createElement('button'); e.className = 'btn sm'; e.innerHTML = b[0]; e.onclick = function () { if (st.busy) return; b[1](st, e); }; bx.appendChild(e); });
      if (s.bind) s.bind(st, bx);
    }
    next();
    var on = true;
    (function loop(t) {
      if (!on) return; st.T = t;
      x.save(); o.draw(x, st, t, k); x.restore();
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


  /* ================= رسوم الفصل الرابع «الطاقة وتحولاتها» ================= */
  var EC = { ke: '#0E7490', pe: '#B45309', th: '#DC2626', ch: '#16A34A', el: '#7C3AED', li: '#EAB308', tot: '#334155' };
  function graph(x, X, Y, W, H, o) {
    x.fillStyle = '#fff'; rr(x, X - 50, Y - 34, W + 70, H + 84, 12); x.fill(); x.strokeStyle = '#CBD5E1'; x.lineWidth = 1.5; rr(x, X - 50, Y - 34, W + 70, H + 84, 12); x.stroke();
    T(x, o.title, X + W / 2, Y - 12, 14, o.col || '#334155');
    function gx(v) { return X + (v - (o.x0 || 0)) / (o.x1 - (o.x0 || 0)) * W; } function gy(v) { return Y + H - (v - o.y0) / (o.y1 - o.y0) * H; }
    x.lineWidth = 1; (o.yt || []).forEach(function (v) { x.strokeStyle = v === 0 ? '#94A3B8' : '#F1F5F9'; x.beginPath(); x.moveTo(X, gy(v)); x.lineTo(X + W, gy(v)); x.stroke(); T(x, n(v), X - 6, gy(v) + 4, 11, '#64748B', 'right', 600); });
    (o.xt || []).forEach(function (v) { T(x, n(v), gx(v), Y + H + 15, 11, '#64748B', 'center', 600); });
    T(x, o.xl, X + W / 2, Y + H + 36, 12, '#475569');
    (o.series || []).forEach(function (sr) { if (!sr.pts.length) return; x.strokeStyle = sr.c; x.lineWidth = 3; x.beginPath(); sr.pts.forEach(function (p, i) { if (i) x.lineTo(gx(p[0]), gy(p[1])); else x.moveTo(gx(p[0]), gy(p[1])); }); x.stroke(); if (sr.dots) sr.pts.forEach(function (p) { x.fillStyle = sr.c; x.beginPath(); x.arc(gx(p[0]), gy(p[1]), 5, 0, 7); x.fill(); }); });
    return { gx: gx, gy: gy };
  }
  function room(x, H) {   // خلفية مختبر الطاقة: جدار دافئ وأرضية
    H = H || 470;
    x.fillStyle = lg(x, 0, 0, 0, H, [[0, '#FFFBEB'], [1, '#FEF3C7']]); x.fillRect(0, 0, 1000, H);
    x.strokeStyle = 'rgba(180,83,9,.07)'; x.lineWidth = 2;
    for (var i = 0; i < 1000; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + 40, H - 60); x.stroke(); }
    x.fillStyle = lg(x, 0, H - 60, 0, H, [[0, '#92400E'], [1, '#78350F']]); x.fillRect(0, H - 60, 1000, 60);
    x.fillStyle = 'rgba(255,255,255,.14)'; x.fillRect(0, H - 60, 1000, 4);
  }
  // أعمدة طاقة متحركة
  function bars(x, X, Y, h, items, max, title) {
    var w = 46, gap = 18, W = items.length * (w + gap) + gap;
    x.save(); x.shadowColor = 'rgba(0,0,0,.15)'; x.shadowBlur = 10; x.fillStyle = '#fff'; rr(x, X, Y - 34, W, h + 92, 12); x.fill(); x.restore();
    if (title) T(x, title, X + W / 2, Y - 12, 14, '#334155');
    items.forEach(function (it, i) {
      var bx = X + W - gap - (i + 1) * w - i * gap, f = Math.max(0, Math.min(1, it[1] / max));
      x.fillStyle = '#F1F5F9'; rr(x, bx, Y, w, h, 8); x.fill();
      if (f > 0.003) { x.fillStyle = it[2]; rr(x, bx, Y + h * (1 - f), w, h * f, 8); x.fill(); }
      T(x, n(Math.round(it[1])), bx + w / 2, Y + h * (1 - f) - 6, 14, it[2]);
      T(x, it[0], bx + w / 2, Y + h + 22, 13, '#334155');
      if (it[3]) T(x, it[3], bx + w / 2, Y + h + 40, 11, '#64748B', 'center', 600);
    });
  }
  // سلسلة تحولات الطاقة (من اليمين إلى اليسار)
  function chain(x, X, Y, W, items, on, sz) {
    var k = items.length, bw = (W - (k - 1) * 26) / k, h = 46;
    items.forEach(function (it, i) {
      var bx = X + W - (i + 1) * bw - i * 26, lit = i < on;
      x.fillStyle = lit ? it[1] : '#E2E8F0'; rr(x, bx, Y, bw, h, 12); x.fill();
      T(x, it[0], bx + bw / 2, Y + 29, sz || 14, lit ? '#fff' : '#94A3B8');
      if (i < k - 1) T(x, '←', bx - 13, Y + 31, 22, i < on - 1 ? '#334155' : '#CBD5E1');
    });
  }
  function ball(x, X, Y, r, c1, c2, shine) {
    x.fillStyle = rg(x, X - r * .35, Y - r * .35, r * .1, r * 1.1, [[0, c1], [1, c2]]); x.beginPath(); x.arc(X, Y, r, 0, 7); x.fill();
    if (shine !== false) { x.fillStyle = 'rgba(255,255,255,.55)'; x.beginPath(); x.arc(X - r * .35, Y - r * .4, r * .22, 0, 7); x.fill(); }
  }
  function flame(x, X, Y, s, t) {
    var f = 1 + Math.sin(t / 90) * .08 + Math.sin(t / 37) * .05;
    x.fillStyle = rg(x, X, Y - 18 * s, 2, 42 * s, [[0, 'rgba(254,240,138,.55)'], [1, 'rgba(254,240,138,0)']]); x.beginPath(); x.arc(X, Y - 18 * s, 42 * s, 0, 7); x.fill();
    x.fillStyle = lg(x, X, Y, X, Y - 46 * s * f, [[0, '#F97316'], [.6, '#FACC15'], [1, 'rgba(254,249,195,.9)']]);
    x.beginPath(); x.moveTo(X - 11 * s, Y); x.quadraticCurveTo(X - 14 * s, Y - 22 * s, X, Y - 46 * s * f); x.quadraticCurveTo(X + 14 * s, Y - 22 * s, X + 11 * s, Y); x.closePath(); x.fill();
    x.fillStyle = '#60A5FA'; x.beginPath(); x.ellipse(X, Y - 5 * s, 5 * s, 8 * s, 0, 0, 7); x.fill();
  }
  function arrowH(x, X1, Y, X2, col, lw) { x.strokeStyle = col; x.fillStyle = col; x.lineWidth = lw || 4; x.beginPath(); x.moveTo(X1, Y); x.lineTo(X2, Y); x.stroke(); var d = X2 > X1 ? 1 : -1; x.beginPath(); x.moveTo(X2 + d * 10, Y); x.lineTo(X2 - d * 4, Y - 8); x.lineTo(X2 - d * 4, Y + 8); x.closePath(); x.fill(); }
  function wave(x, X, Y, col, t, k) { x.strokeStyle = col; x.lineWidth = 3; x.lineCap = 'round'; for (var i = 0; i < (k || 3); i++) { var yy = Y - i * 14 - ((t / 40) % 14); x.globalAlpha = 1 - i / (k || 3) * .6; x.beginPath(); x.moveTo(X - 8, yy); x.quadraticCurveTo(X, yy - 6, X + 8, yy); x.stroke(); } x.globalAlpha = 1; x.lineCap = 'butt'; }

  /* ===== التجربة الاستهلالية: الكرة الزجاجية والطاقة ===== */
  S.lab_ramp = function (c, api) {
    var EDGE = 520, TOP = 300, FLOOR = 410, PXM = 640;   // ١ م = ٦٤٠ بكسل
    function dist(h) { var v = Math.sqrt(10 / 7 * 9.8 * h / 100), t = Math.sqrt(2 * .75 / 9.8); return v * t * 100; }   // سم
    return lab(c, api, {
      init: function () { return { h: 0, ball: 'g', run: 0, rT: 0, d: 0, rows: [], pred: '', vary: [0.6, -0.5, 0.4, -0.3, 0.5, -0.6, 0.2] }; },
      steps: [
        { say: 'ارفع طرف المسار على كتاب واحد (٥ سم)، ثم اترك الكرة الزجاجية تتدحرج مرتين، وتُقاس المسافة على الأرض من أسفل حافة الطاولة إلى نقطة الاصطدام.', btns: [['📚 كتاب واحد (٥ سم)', function (s) { s.h = 5; }], ['▶ اترك الكرة', function (s) { if (s.h) go(s); }]], ok: function (s) { return cnt(s, 5, 'g') >= 2; } },
        { say: 'أعد الخطوة بارتفاعين آخرين: كتابان (١٠ سم) ثم ثلاثة كتب (١٥ سم)، مرتين لكل ارتفاع.', btns: [['📚📚 ١٠ سم', function (s) { s.h = 10; }], ['📚📚📚 ١٥ سم', function (s) { s.h = 15; }], ['▶ اترك الكرة', function (s) { go(s); }]], ok: function (s) { return cnt(s, 10, 'g') >= 2 && cnt(s, 15, 'g') >= 2; } },
        { say: 'توقّع: إذا استخدمت كرة فولاذية أثقل من الارتفاع نفسه (١٥ سم)، فأين ستسقط؟ ثم اختبر توقعك.', bind: function (s, b) { [['أبعد', 'أبعد'], ['أقرب', 'أقرب'], ['المسافة نفسها تقريبًا', 'نفسها']].forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'pred', o[1]); }); }); addBtn(b, '🔩 اترك الكرة الفولاذية', 'go', function () { if (!s.pred || s.busy) return; s.h = 15; s.ball = 's'; go(s); }); }, ok: function (s) { return cnt(s, 15, 's') >= 1; } }
      ],
      end: function (s) { return 'كلما <b>زاد ارتفاع المسار</b> زادت سرعة الكرة عند أسفله وزادت المسافة التي تقطعها (نحو ' + n(Math.round(dist(5))) + ' ثم ' + n(Math.round(dist(10))) + ' ثم ' + n(Math.round(dist(15))) + ' سم)؛ لأن الكرة المرفوعة تختزن طاقة أكبر تتحول إلى حركة. والكرة الفولاذية الأثقل سقطت على المسافة نفسها تقريبًا (توقعك: ' + (s.pred === 'نفسها' ? 'صحيح ✓' : 'راجعه') + ')، لكنها تحمل طاقة أكبر لأن كتلتها أكبر، فتُحدث تغييرًا أكبر إذا اصطدمت بشيء.'; },
      draw: function (x, s, t) {
        room(x);
        // الطاولة
        x.fillStyle = lg(x, 0, TOP, 0, TOP + 18, [[0, '#B45309'], [1, '#78350F']]); x.fillRect(EDGE, TOP, 480, 18);
        x.fillStyle = '#78350F'; x.fillRect(EDGE + 20, TOP + 18, 16, FLOOR - TOP - 18); x.fillRect(960, TOP + 18, 16, FLOOR - TOP - 18);
        // الكتب والمسار
        var nb = s.h / 5, ramp = s.h * 4.2, RX = 930, BX = 700;
        for (var i = 0; i < nb; i++) { x.fillStyle = ['#2563EB', '#DC2626', '#16A34A'][i]; rr(x, RX - 40, TOP - 21 * (i + 1), 90, 19, 3); x.fill(); x.fillStyle = 'rgba(255,255,255,.6)'; x.fillRect(RX - 34, TOP - 21 * (i + 1) + 8, 78, 3); }
        var Ry = TOP - 4 - ramp;
        x.strokeStyle = '#A16207'; x.lineWidth = 7; x.beginPath(); x.moveTo(RX + 20, Ry); x.lineTo(BX, TOP - 4); x.lineTo(EDGE, TOP - 4); x.stroke();
        x.strokeStyle = '#FDE68A'; x.lineWidth = 2; x.beginPath(); x.moveTo(RX + 20, Ry - 4); x.lineTo(BX, TOP - 8); x.lineTo(EDGE, TOP - 8); x.stroke();
        if (s.h) { x.strokeStyle = '#0F172A'; x.lineWidth = 1.5; x.setLineDash([4, 4]); x.beginPath(); x.moveTo(RX + 60, Ry); x.lineTo(RX + 60, TOP); x.stroke(); x.setLineDash([]); pill(x, 'الارتفاع ' + n(s.h) + ' سم', RX - 10, Ry - 46, 15, '#B45309'); }
        // الشريط المتري على الأرض
        x.fillStyle = '#FDE047'; x.fillRect(EDGE - 480, FLOOR + 4, 480, 16);
        for (var cm = 0; cm <= 70; cm += 5) { var mx = EDGE - cm / 100 * PXM; x.fillStyle = '#713F12'; x.fillRect(mx - 1, FLOOR + 4, 2, cm % 10 ? 7 : 12); if (cm % 10 === 0) T(x, n(cm), mx, FLOOR + 34, 11, '#FEF3C7'); }
        T(x, 'سم', EDGE - 470, FLOOR + 34, 11, '#FEF3C7');
        // آثار الاصطدام السابقة
        s.rows.forEach(function (r) { var mx = EDGE - r[2] / 100 * PXM; x.fillStyle = r[1] === 's' ? '#475569' : '#0EA5E9'; x.beginPath(); x.moveTo(mx, FLOOR + 2); x.lineTo(mx - 6, FLOOR - 8); x.lineTo(mx + 6, FLOOR - 8); x.closePath(); x.fill(); });
        // الكرة
        var bxp = RX + 6, byp = Ry - 12, R = s.ball === 's' ? 13 : 12;
        if (s.run) {
          var el = (t - s.rT) / 1000, L1 = Math.hypot(RX + 6 - BX, ramp), a1 = 9.8 * 5 / 7 * (ramp / L1) * 180, tt = Math.sqrt(2 * L1 / a1), v1 = a1 * tt;
          var t2 = (BX - EDGE) / v1, tf = Math.sqrt(2 * .75 / 9.8) * 1.6;
          if (el < tt) { var d1 = .5 * a1 * el * el, f = d1 / L1; bxp = RX + 6 - (RX + 6 - BX) * f; byp = Ry - 12 + ramp * f; }
          else if (el < tt + t2) { bxp = BX - v1 * (el - tt); byp = TOP - 16; }
          else { var e3 = Math.min(1, (el - tt - t2) / tf), dx = s.d / 100 * PXM; bxp = EDGE - dx * e3; byp = TOP - 16 + (FLOOR - TOP + 4) * e3 * e3; if (e3 >= 1 && s.busy) { s.busy = 0; s.run = 0; s.rows.push([s.h, s.ball, s.d]); } }
        }
        ball(x, bxp, byp, R, s.ball === 's' ? '#F8FAFC' : '#BAE6FD', s.ball === 's' ? '#475569' : '#0284C7');
        // جدول + رسم
        var rows = [5, 10, 15].map(function (h) { var a = s.rows.filter(function (r) { return r[0] === h && r[1] === 'g'; }).map(function (r) { return r[2]; }); return [h, a[0] != null ? a[0].toFixed(1) : '—', a[1] != null ? a[1].toFixed(1) : '—', a.length === 2 ? ((a[0] + a[1]) / 2).toFixed(1) : '—']; });
        var st = s.rows.filter(function (r) { return r[1] === 's'; });
        rows.push(['١٥ فولاذ', st[0] ? st[0][2].toFixed(1) : '—', '—', st[0] ? st[0][2].toFixed(1) : '—']);
        ctable(x, 20, 20, [86, 74, 74, 74], ['الارتفاع (سم)', 'المحاولة ١', 'المحاولة ٢', 'المتوسط'], rows, { rh: 27, hc: '#B45309', ds: 13, hs: 12 });
        var pts = [5, 10, 15].map(function (h) { var a = s.rows.filter(function (r) { return r[0] === h && r[1] === 'g'; }); return a.length === 2 ? [h, (a[0][2] + a[1][2]) / 2] : null; }).filter(Boolean);
        if (pts.length) graph(x, 420, 70, 170, 120, { title: 'المسافة مع الارتفاع', col: '#B45309', x1: 15, y0: 0, y1: 70, yt: [0, 35, 70], xt: [0, 5, 10, 15], xl: 'الارتفاع (سم)', series: [{ c: '#B45309', dots: 1, pts: [[0, 0]].concat(pts) }] });
      }
    });
    function cnt(s, h, b) { return s.rows.filter(function (r) { return r[0] === h && r[1] === b; }).length; }
    function go(s) { if (s.busy || !s.h) return; if (s.ball === 's' && s.h !== 15) return; var k = s.rows.length; s.d = dist(s.h) + s.vary[k % s.vary.length]; s.run = 1; s.rT = s.T; s.busy = 1; }
  };

  /* ===== طاقة الحركة: البولنج ===== */
  S.lab_bowl = function (c, api) {
    var B = { b: { n: 'كرة البولنج', m: 6, r: 22, c1: '#C084FC', c2: '#581C87' }, v: { n: 'الكرة الطائرة', m: 0.27, r: 21, c1: '#FFFFFF', c2: '#93C5FD' } };
    var PINS = [[160, 235], [190, 218], [190, 252], [220, 201], [220, 235], [220, 269], [250, 184], [250, 218], [250, 252], [250, 286]];
    return lab(c, api, {
      init: function () { return { ball: 'b', sp: 3, run: 0, rT: 0, down: [], rows: [], knock: 0 }; },
      steps: [
        { say: 'دحرج <b>كرة البولنج</b> ببطء (٣ م/ث) نحو القوارير، ولاحظ عدد القوارير التي تسقط وطاقة الكرة.', btns: [['🎳 دحرج ببطء', function (s) { roll(s, 'b', 3); }]], ok: function (s) { return has(s, 'b', 3); } },
        { say: 'أعد القوارير ودحرج كرة البولنج <b>بسرعة كبيرة</b> (٦ م/ث) كما يفعل اللاعب المحترف.', btns: [['🎳 دحرج بسرعة', function (s) { roll(s, 'b', 6); }]], ok: function (s) { return has(s, 'b', 6); } },
        { say: 'جرّب <b>الكرة الطائرة</b> بالسرعة الكبيرة نفسها (٦ م/ث). كتلتها أقل كثيرًا من كتلة كرة البولنج.', btns: [['🏐 دحرج الكرة الطائرة', function (s) { roll(s, 'v', 6); }]], ok: function (s) { return has(s, 'v', 6); } }
      ],
      end: function () { return 'كرة البولنج <b>الأسرع</b> أسقطت قوارير أكثر وقذفتها أبعد؛ فالطاقة الحركية تزداد بازدياد <b>السرعة</b>. والكرة الطائرة بالسرعة نفسها لم تُسقط إلا قارورة واحدة؛ لأن <b>كتلتها</b> أقل كثيرًا، فالطاقة الحركية تزداد بازدياد الكتلة. <b>الطاقة الحركية تعتمد على كتلة الجسم وسرعته.</b>'; },
      draw: function (x, s, t) {
        x.fillStyle = lg(x, 0, 0, 0, 470, [[0, '#1E1B4B'], [1, '#312E81']]); x.fillRect(0, 0, 1000, 470);
        // المسار (منظر علوي)
        x.fillStyle = lg(x, 0, 150, 0, 320, [[0, '#FCD34D'], [.5, '#FDE68A'], [1, '#F59E0B']]); x.fillRect(100, 160, 860, 150);
        x.strokeStyle = 'rgba(146,64,14,.25)'; x.lineWidth = 1; for (var i = 170; i < 310; i += 12) { x.beginPath(); x.moveTo(100, i); x.lineTo(960, i); x.stroke(); }
        x.fillStyle = '#1E293B'; x.fillRect(100, 146, 860, 14); x.fillRect(100, 310, 860, 14);
        for (var a = 0; a < 7; a++) { x.fillStyle = '#B45309'; x.beginPath(); x.moveTo(600 + a * 20, 205 + a * 4); x.lineTo(592 + a * 20, 220 + a * 4); x.lineTo(608 + a * 20, 220 + a * 4); x.closePath(); x.fill(); }
        var el = s.run ? (t - s.rT) / 1000 : 0, b = B[s.ball], bx = 900 - s.sp * 120 * el, hitT = (900 - 270) / (s.sp * 120);
        // القوارير
        PINS.forEach(function (p, i) {
          var d = s.down.indexOf(i) >= 0 && el > hitT + i * .02, px = p[0], py = p[1], ang = 0;
          if (d) { var e = Math.min(1, (el - hitT) / .7), fly = s.sp === 6 && s.ball === 'b' ? 90 : 35; px -= fly * e + (i % 3) * 8 * e; py += ((i % 2) ? 1 : -1) * (30 + i * 4) * e; ang = (i % 2 ? 1 : -1) * 1.5 * e; }
          x.save(); x.translate(px, py); x.rotate(ang); x.fillStyle = 'rgba(0,0,0,.25)'; x.beginPath(); x.ellipse(3, 3, d ? 18 : 11, 11, 0, 0, 7); x.fill();
          if (d) { x.fillStyle = '#fff'; rr(x, -18, -8, 36, 16, 8); x.fill(); x.fillStyle = '#DC2626'; x.fillRect(4, -8, 4, 16); }
          else { x.fillStyle = '#fff'; x.beginPath(); x.arc(0, 0, 11, 0, 7); x.fill(); x.strokeStyle = '#DC2626'; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 6, 0, 7); x.stroke(); }
          x.restore();
        });
        // الكرة
        if (s.run) { var cx = Math.max(bx, 90), cy = 235; if (cx < 280 && s.ball === 'v') { cx = 280 + (280 - bx) * .2; cy = 235 - (280 - bx) * .15; } ball(x, cx, cy, b.r, b.c1, b.c2); if (s.ball === 'v') { x.strokeStyle = '#3B82F6'; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, b.r - 2, .5, 2.6); x.stroke(); } if (el > hitT + 1.2 && s.busy) { s.busy = 0; s.rows.push([s.ball, s.sp, .5 * b.m * s.sp * s.sp, s.knock]); } }
        else { ball(x, 900, 235, 22, '#C084FC', '#581C87'); }
        // عداد
        var ke = s.run ? .5 * b.m * s.sp * s.sp : 0;
        bars(x, 30, 40, 70, [['حركية', ke, EC.ke, 'جول']], 110, '');
        pill(x, s.run ? b.n + ' · ' + n(b.m) + ' كجم · ' + n(s.sp) + ' م/ث' : 'اختر طريقة الدحرجة', 500, 120, 17, '#4338CA');
        if (s.run && el > hitT + .4) pill(x, 'سقط ' + n(s.knock) + ' من ١٠', 230, 370, 18, s.knock >= 9 ? '#16A34A' : s.knock ? '#B45309' : '#DC2626');
        ctable(x, 620, 345, [110, 70, 90, 80], ['الكرة', 'السرعة', 'الطاقة (جول)', 'سقط'], s.rows.length ? s.rows.map(function (r) { return [B[r[0]].n, n(r[1]) + ' م/ث', r[2].toFixed(r[2] < 10 ? 1 : 0), r[3]]; }) : [['—', '—', '—', '—']], { rh: 26, hc: '#0E7490', ds: 13, hs: 12 });
      }
    });
    function has(s, b, v) { return s.rows.some(function (r) { return r[0] === b && r[1] === v; }); }
    function roll(s, b, v) { if (s.busy) return; s.ball = b; s.sp = v; s.run = 1; s.rT = s.T; s.busy = 1; s.knock = b === 'b' ? (v === 6 ? 10 : 5) : 1; s.down = b === 'b' ? (v === 6 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [0, 1, 2, 4, 7]) : [0]; }
  };

  /* ===== طاقة الوضع: الإناءان على الرفوف ===== */
  S.lab_shelf = function (c, api) {
    var SH = [{ h: 0.4, y: 330 }, { h: 0.9, y: 250 }, { h: 1.4, y: 170 }, { h: 1.9, y: 90 }];
    return lab(c, api, {
      init: function () { return { red: -1, blue: -1, ans: '', drop: null, dT: 0, dents: {}, heavy: 0 }; },
      steps: [
        { say: 'ضع الإناء <b style="color:#DC2626">الأحمر</b> على الرف الثاني، والإناء <b style="color:#2563EB">الأزرق</b> على الرف الأعلى (كتلة كل منهما ١ كجم). راقب طاقة الوضع.', btns: [['🔴 الأحمر على الرف ٢', function (s) { s.red = 1; }], ['🔵 الأزرق على الرف ٤', function (s) { s.blue = 3; }]], ok: function (s) { return s.red === 1 && s.blue === 3; } },
        { say: 'أيّ الإناءين له طاقة وضع أكبر؟ ثم أسقط كلًّا منهما على الوسادة لترى أثر طاقته.', bind: function (s, b) { addBtn(b, 'الأحمر', 'r', function () { pick(b, s, 'ans', 'r'); }); addBtn(b, 'الأزرق', 'b', function () { pick(b, s, 'ans', 'b'); }); addBtn(b, '⬇ أسقط الأحمر', 'dr', function () { drop(s, 'red'); }); addBtn(b, '⬇ أسقط الأزرق', 'db', function () { drop(s, 'blue'); }); }, ok: function (s) { return s.ans && s.dents.red != null && s.dents.blue != null; } },
        { say: 'بدّل الإناء الأزرق بإناء أثقل (٢ كجم) على الرف الأعلى نفسه، وأسقطه.', btns: [['🏺 ضع الإناء الثقيل', function (s) { if (s.busy) return; s.heavy = 1; s.blue = 3; s.dents.heavy = null; }], ['⬇ أسقطه', function (s) { if (s.heavy && s.blue === 3) drop(s, 'heavy'); }]], ok: function (s) { return s.dents.heavy != null; } }
      ],
      end: function (s) { return 'الإناء الأزرق على الرف الأعلى له طاقة وضع أكبر (' + (s.ans === 'b' ? 'إجابتك صحيحة ✓' : 'الإجابة الصحيحة: الأزرق') + ')؛ لأن ارتفاعه أكبر، فترك أثرًا أعمق عند سقوطه. والإناء الأثقل على الارتفاع نفسه طاقة وضعه ضعف ذلك. <b>طاقة الوضع تعتمد على كتلة الجسم وارتفاعه</b>، وعند السقوط تتحول إلى طاقة حركية.'; },
      draw: function (x, s, t) {
        room(x);
        // الخزانة
        x.fillStyle = lg(x, 380, 0, 640, 0, [[0, '#7C2D12'], [.5, '#9A3412'], [1, '#7C2D12']]); rr(x, 380, 30, 260, 380, 6); x.fill();
        x.fillStyle = '#431407'; x.fillRect(396, 46, 228, 350);
        SH.forEach(function (sh, i) { x.fillStyle = '#9A3412'; x.fillRect(390, sh.y, 240, 12); T(x, 'الرف ' + n(i + 1) + ' · ' + n(sh.h) + ' م', 668, sh.y + 8, 13, '#78350F', 'left'); });
        x.strokeStyle = '#78350F'; x.lineWidth = 2; x.beginPath(); x.moveTo(660, 410); x.lineTo(660, 70); x.stroke();
        // الوسادة
        x.fillStyle = '#FDBA74'; rr(x, 120, 380, 200, 30, 12); x.fill(); T(x, 'وسادة', 220, 400, 13, '#7C2D12');
        ['red', 'blue', 'heavy'].forEach(function (k) { if (s.dents[k] != null) { var w = 20 + s.dents[k] * 2.2, cx = k === 'red' ? 160 : k === 'blue' ? 220 : 280; x.fillStyle = 'rgba(124,45,18,.35)'; x.beginPath(); x.ellipse(cx, 384, w / 2, 3 + s.dents[k] / 4, 0, 0, Math.PI); x.fill(); T(x, k === 'red' ? 'أحمر' : k === 'blue' ? 'أزرق' : 'ثقيل', cx, 430, 12, '#FEF3C7'); } });
        function vase(X, Y, col, big) { var k = big ? 1.3 : 1; x.fillStyle = rg(x, X - 8, Y - 30 * k, 3, 34 * k, [[0, mix(col, 'FFFFFF', .4)], [1, '#' + col]]); x.beginPath(); x.moveTo(X - 9 * k, Y - 56 * k); x.quadraticCurveTo(X - 28 * k, Y - 30 * k, X - 12 * k, Y); x.lineTo(X + 12 * k, Y); x.quadraticCurveTo(X + 28 * k, Y - 30 * k, X + 9 * k, Y - 56 * k); x.closePath(); x.fill(); x.fillStyle = '#' + col; x.fillRect(X - 11 * k, Y - 60 * k, 22 * k, 6); }
        function pos(k) { var sh = k === 'red' ? s.red : s.blue; return sh < 0 ? null : [k === 'red' ? 460 : 560, SH[sh].y]; }
        var pe = { red: s.red >= 0 ? 1 * 10 * SH[s.red].h : 0, blue: s.blue >= 0 ? (s.heavy ? 2 : 1) * 10 * SH[s.blue].h : 0 }, ke = { red: 0, blue: 0 };
        ['red', 'blue'].forEach(function (k) {
          var p = pos(k), col = k === 'red' ? 'DC2626' : '2563EB', big = k === 'blue' && s.heavy;
          var dk = s.drop && (s.drop === k || (s.drop === 'heavy' && k === 'blue'));
          if (!p) { vase(k === 'red' ? 60 : 350, 440, col, false); return; }
          if (dk) {
            var el = (t - s.dT) / 1000, h0 = SH[k === 'red' ? s.red : s.blue].h, tf = Math.sqrt(2 * h0 / 9.8) * 1.8, e = Math.min(1, el / tf), X0 = p[0], Y0 = p[1], X1 = s.drop === 'red' ? 160 : s.drop === 'blue' ? 220 : 280;
            var m = big ? 2 : 1, tot = m * 10 * h0; pe[k] = tot * (1 - e * e); ke[k] = tot * e * e;
            vase(X0 + (X1 - X0) * e, Y0 + (380 - Y0) * e * e, col, big);
            if (e >= 1 && s.busy) { s.dents[s.drop] = tot; s.busy = 0; s.drop = null; if (k === 'red') s.red = -1; else s.blue = -1; }
          } else vase(p[0], p[1], col, big);
        });
        bars(x, 760, 60, 220, [['وضع أحمر', pe.red, '#DC2626', 'جول'], ['وضع أزرق', pe.blue, '#2563EB', 'جول'], ['حركية', ke.red + ke.blue, EC.ke, 'جول']], 40, 'الطاقة (جول)');
      }
    });
    function drop(s, k) { if (s.busy) return; if (k === 'red' && s.red < 0) return; if ((k === 'blue' || k === 'heavy') && s.blue < 0) return; if (k === 'blue' && s.heavy) return; s.drop = k; s.dT = s.T; s.busy = 1; }
  };

  /* ===== أشكال أخرى للطاقة: حرارية وكيميائية وإشعاعية وكهربائية ===== */
  S.lab_forms = function (c, api) {
    var CUPS = [{ n: 'كاكاو ساخن', T: 70, c: '#78350F', x: 150 }, { n: 'ماء بارد', T: 15, c: '#BAE6FD', x: 270 }, { n: 'قطعة جليد', T: -5, c: '#F0F9FF', x: 390 }];
    return lab(c, api, {
      init: function () { return { meas: [], rank: [], fire: 0, fT: 0, heat: 0, hT: 0 }; },
      steps: [
        { say: '<b>الطاقة الحرارية:</b> اضغط على كل كأس لقياس درجة حرارته (الكتلة نفسها)، ثم رتّبها من الأكبر طاقة حرارية إلى الأقل.', bind: function (s, b) { CUPS.forEach(function (cp, i) { addBtn(b, '🌡 ' + cp.n, 'm' + i, function () { if (s.meas.indexOf(i) < 0) s.meas.push(i); }); }); addBtn(b, '⬆ رتّب: الكاكاو ← الماء ← الجليد', 'rk', function () { if (s.meas.length === 3) s.rank = [0, 1, 2]; }); }, ok: function (s) { return s.rank.length === 3; } },
        { say: '<b>الطاقة الكيميائية:</b> أشعل الشمعة، ولاحظ إلى أيّ أشكال الطاقة تتحول الطاقة المخزونة في الشمع.', btns: [['🔥 أشعل الشمعة', function (s) { if (!s.fire) { s.fire = 1; s.fT = s.T; } }]], ok: function (s) { return s.fire && s.T - s.fT > 2500; } },
        { say: '<b>الطاقة الكهربائية والإشعاعية:</b> شغّل المدفأة، وراقب سلك الملف حتى يتوهج.', btns: [['🔌 شغّل المدفأة', function (s) { if (!s.heat) { s.heat = 1; s.hT = s.T; } }]], ok: function (s) { return s.heat && s.T - s.hT > 4500; } }
      ],
      end: function () { return '<b>الطاقة الحرارية</b> تزداد بازدياد درجة الحرارة: الكاكاو الساخن أكبر من الماء البارد، والماء أكبر من الجليد (بالكتلة نفسها). <b>الطاقة الكيميائية</b> في الشمع تتحول عند احتراقه إلى طاقة حرارية وضوئية. وفي المدفأة تتحول <b>الطاقة الكهربائية</b> إلى حرارية، وبازدياد سخونة السلك يبدأ في إطلاق <b>الطاقة الإشعاعية</b> (الضوء).'; },
      draw: function (x, s, t) {
        room(x);
        x.fillStyle = '#E7E5E4'; x.fillRect(40, 300, 440, 12); T(x, '① الطاقة الحرارية', 260, 40, 17, '#B45309');
        CUPS.forEach(function (cp, i) {
          var X = cp.x, Y = 300;
          if (i < 2) { x.fillStyle = 'rgba(255,255,255,.55)'; x.strokeStyle = '#94A3B8'; x.lineWidth = 2.5; rr(x, X - 40, Y - 110, 80, 110, 8); x.fill(); x.stroke(); x.fillStyle = cp.c; rr(x, X - 36, Y - 90, 72, 86, 6); x.fill(); x.strokeStyle = '#94A3B8'; x.beginPath(); x.arc(X + 46, Y - 58, 18, -1.3, 1.3); x.stroke(); if (i === 0) wave(x, X, Y - 120, 'rgba(120,113,108,.6)', t, 3); }
          else { x.fillStyle = 'rgba(240,249,255,.95)'; x.strokeStyle = '#BAE6FD'; x.lineWidth = 2; rr(x, X - 34, Y - 70, 68, 70, 10); x.fill(); x.stroke(); x.fillStyle = 'rgba(255,255,255,.8)'; x.fillRect(X - 22, Y - 60, 10, 46); }
          T(x, cp.n, X, Y + 34, 14, '#78350F');
          if (s.meas.indexOf(i) >= 0) thermo(x, X, Y - 40, 150, cp.T + 10, 90, n(cp.T) + '°س');
          if (s.rank.length) pill(x, ['الأكبر', 'متوسطة', 'الأقل'][i], X, Y + 62, 14, ['#DC2626', '#F59E0B', '#0EA5E9'][i]);
        });
        // الشمعة
        T(x, '② الطاقة الكيميائية', 600, 40, 17, '#16A34A');
        x.fillStyle = lg(x, 570, 0, 630, 0, [[0, '#FDE68A'], [.5, '#FEF9C3'], [1, '#FCD34D']]); rr(x, 572, 200, 56, 110, 8); x.fill(); x.fillStyle = '#1F2937'; x.fillRect(598, 190, 4, 12);
        if (s.fire) { flame(x, 600, 192, 1.2, t); if (t - s.fT > 900) { pill(x, 'كيميائية', 600, 110, 13, EC.ch); T(x, '↙', 570, 140, 18, '#334155'); T(x, '↘', 630, 140, 18, '#334155'); pill(x, 'حرارية', 545, 165, 13, EC.th); pill(x, 'ضوئية', 655, 165, 13, EC.li, '#422006'); } }
        // المدفأة
        T(x, '③ الكهربائية والإشعاعية', 860, 40, 17, '#7C3AED');
        var e = s.heat ? Math.min(1, (t - s.hT) / 4000) : 0;
        x.fillStyle = '#334155'; rr(x, 735, 120, 200, 170, 12); x.fill(); x.fillStyle = '#0F172A'; rr(x, 751, 136, 168, 120, 8); x.fill();
        if (e > .35) { x.fillStyle = rg(x, 835, 196, 10, 150, [[0, 'rgba(251,146,60,' + (e - .35) + ')'], [1, 'rgba(251,146,60,0)']]); x.fillRect(700, 60, 320, 280); }
        for (var k = 0; k < 6; k++) { var yy = 150 + k * 18; x.strokeStyle = e < .35 ? mix('64748B', '7F1D1D', e / .35) : mix('DC2626', 'FDE68A', (e - .35) / .65); x.lineWidth = 6; x.beginPath(); for (var q = 0; q <= 40; q++) { var xx = 761 + q * 3.7; if (q) x.lineTo(xx, yy + Math.sin(q * 1.4) * 4); else x.moveTo(xx, yy); } x.stroke(); }
        x.strokeStyle = '#1F2937'; x.lineWidth = 4; x.beginPath(); x.moveTo(935, 270); x.quadraticCurveTo(960, 330, 925, 360); x.stroke(); x.fillStyle = s.heat ? '#22C55E' : '#64748B'; x.beginPath(); x.arc(905, 272, 7, 0, 7); x.fill();
        thermo(x, 962, 300, 130, 20 + 600 * e, 650, n(Math.round(20 + 600 * e)) + '°س');
        chain(x, 720, 330, 260, [['كهربائية', EC.el], ['حرارية', EC.th], ['إشعاعية', EC.li]], s.heat ? (e > .55 ? 3 : e > .1 ? 2 : 1) : 0, 13);
      }
    });
  };

  /* ===== قانون حفظ الطاقة: قذف كرة إلى أعلى ===== */
  S.lab_toss = function (c, api) {
    var M = 0.06, G = 9.8;
    return lab(c, api, {
      init: function () { return { v: 0, run: 0, rT: 0, tosses: [], top: 0 }; },
      steps: [
        { say: 'اقذف كرة التنس (٠٫٠٦ كجم) إلى أعلى بسرعة ٦ م/ث، وراقب أعمدة الطاقة: الحركية والوضع والكلية.', btns: [['🎾 اقذف (٦ م/ث)', function (s) { toss(s, 6); }]], ok: function (s) { return s.tosses.indexOf(6) >= 0; } },
        { say: 'اقذفها مرة أخرى بقوة أكبر (٨ م/ث). هل تتغير الطاقة الكلية في أثناء الحركة؟', btns: [['🎾 اقذف بقوة (٨ م/ث)', function (s) { toss(s, 8); }]], ok: function (s) { return s.tosses.indexOf(8) >= 0; } },
        { say: 'أيّ موضع للكرة تكون فيه طاقتها الحركية أكبر ما يمكن؟', bind: function (s, b) { addBtn(b, 'عند أعلى نقطة', 'top', function () { pick(b, s, 'top', 'top'); }); addBtn(b, 'لحظة خروجها من اليد', 'hand', function () { pick(b, s, 'top', 'hand'); }); }, ok: function (s) { return s.top === 'hand'; } }
      ],
      end: function () { return 'عند خروج الكرة من اليد تكون معظم طاقتها <b>حركية</b>، ومع ارتفاعها تقل سرعتها فتتناقص طاقتها الحركية وتزداد <b>طاقة وضعها</b> بالمقدار نفسه، حتى تصبح طاقة الوضع أكبر ما يمكن عند أعلى نقطة. وبقي عمود <b>الطاقة الكلية ثابتًا</b> طوال الحركة (مع إهمال مقاومة الهواء): الطاقة لا تُستحدث ولا تفنى، بل تتحول من شكل إلى آخر.'; },
      draw: function (x, s, t) {
        x.fillStyle = lg(x, 0, 0, 0, 470, [[0, '#E0F2FE'], [1, '#F0FDFA']]); x.fillRect(0, 0, 1000, 470);
        x.fillStyle = '#86EFAC'; x.fillRect(0, 420, 1000, 50);
        var HY = 380, PX = 0.0, ph = 0, hy = 0, vy = 0, el = 0, up = 0;
        if (s.run) { el = (t - s.rT) / 1000 / 2.2; var tt = 2 * s.v / G; if (el >= tt) { el = tt; if (s.busy) { s.busy = 0; s.tosses.push(s.v); } } hy = s.v * el - .5 * G * el * el; vy = s.v - G * el; up = vy > 0; }
        var SC = 82, by = HY - hy * SC;
        // مسطرة الارتفاع
        x.fillStyle = '#fff'; rr(x, 520, 40, 40, 360, 8); x.fill(); x.strokeStyle = '#94A3B8'; x.lineWidth = 1.5; rr(x, 520, 40, 40, 360, 8); x.stroke();
        for (var m = 0; m <= 4; m += .5) { var yy = HY - m * SC; x.fillStyle = '#334155'; x.fillRect(520, yy, m % 1 ? 10 : 18, 2); if (m % 1 === 0) T(x, n(m) + ' م', 540, yy + 14, 11, '#334155'); }
        // الولد (يد)
        x.fillStyle = '#F5F5F4'; rr(x, 380, 300, 90, 120, 30); x.fill(); x.fillStyle = '#FCD9B6'; x.beginPath(); x.arc(425, 270, 34, 0, 7); x.fill(); x.fillStyle = '#F5F5F4'; rr(x, 440, 330, 60, 18, 9); x.fill(); x.fillStyle = '#FCD9B6'; x.beginPath(); x.ellipse(462, HY + 12, 22, 9, 0, 0, 7); x.fill();
        if (s.v) { var top = s.v * s.v / 2 / G; x.strokeStyle = 'rgba(14,116,144,.35)'; x.setLineDash([6, 6]); x.lineWidth = 2; x.beginPath(); x.moveTo(462, HY - top * SC); x.lineTo(520, HY - top * SC); x.stroke(); x.setLineDash([]); }
        ball(x, 462, by, 14, '#D9F99D', '#65A30D');
        if (s.run && s.busy) { x.strokeStyle = up ? '#0E7490' : '#B45309'; arrowV(x, 440, by, up ? -1 : 1); }
        var tot = s.v ? .5 * M * s.v * s.v : 0, ke = s.v ? .5 * M * vy * vy : 0, pe = s.v ? M * G * hy : 0;
        bars(x, 640, 70, 260, [['حركية', ke * 100, EC.ke, '×٠٫٠١ جول'], ['وضع', pe * 100, EC.pe, '×٠٫٠١ جول'], ['الكلية', tot * 100, EC.tot, '×٠٫٠١ جول']], 200, 'الطاقة');
        pill(x, s.v ? 'الارتفاع ' + n(hy.toFixed(2)) + ' م · السرعة ' + n(Math.abs(vy).toFixed(1)) + ' م/ث' : 'اختر سرعة القذف', 230, 60, 16, '#0E7490');
        if (s.v && Math.abs(vy) < .25 && s.busy) pill(x, 'أعلى نقطة: الطاقة كلها طاقة وضع', 230, 100, 15, '#B45309');
      }
    });
    function toss(s, v) { if (s.busy) return; s.v = v; s.run = 1; s.rT = s.T; s.busy = 1; }
    function arrowV(x, X, Y, d) { x.lineWidth = 3; x.beginPath(); x.moveTo(X, Y - d * 18); x.lineTo(X, Y + d * 18); x.stroke(); x.beginPath(); x.moveTo(X - 6, Y + d * 10); x.lineTo(X, Y + d * 20); x.lineTo(X + 6, Y + d * 10); x.stroke(); }
  };

  /* ===== تجربة: تحليل تحولات الطاقة (كرات تسقط على الطين) ===== */
  S.lab_clay = function (c, api) {
    var BL = { g: { n: 'كرة زجاجية', m: 20, c1: '#E0F2FE', c2: '#0284C7' }, s: { n: 'كرة فولاذية', m: 65, c1: '#F8FAFC', c2: '#475569' }, p: { n: 'كرة بلاستيكية', m: 8, c1: '#FECACA', c2: '#DC2626' } };
    var SC = 190, CLAY = 400;   // ١ م = ١٩٠ بكسل
    return lab(c, api, {
      init: function () { return { flat: 0, cur: '', run: 0, rT: 0, done: {}, rows: [] }; },
      steps: [
        { say: 'ضع قطعة الطين (سمكها ٥ سم) واجعل سطحها العلوي أملس مستويًا.', btns: [['✋ سوِّ سطح الطين', function (s) { s.flat = 1; }]], ok: function (s) { return s.flat; } },
        { say: 'ارفع <b>الكرة الزجاجية</b> ١٫٥ م فوق الطين واتركها تسقط، ثم قس عمق الحفرة بالمسطرة (تظهر في العدسة).', btns: [['🔵 أسقط الزجاجية', function (s) { drop(s, 'g'); }]], ok: function (s) { return s.done.g != null; } },
        { say: 'كرّر الخطوة مستخدمًا <b>الكرة الفولاذية</b> ثم <b>الكرة البلاستيكية</b> من الارتفاع نفسه.', btns: [['⚪ أسقط الفولاذية', function (s) { drop(s, 's'); }], ['🔴 أسقط البلاستيكية', function (s) { drop(s, 'p'); }]], ok: function (s) { return s.done.s != null && s.done.p != null; } }
      ],
      end: function () { return 'غاصت <b>الكرة الفولاذية</b> أعمق (أكبر كتلة)، ثم الزجاجية، ثم البلاستيكية؛ فطاقتها الحركية عند ملامسة الطين كانت الأكبر. عند رفع الكرة اكتسبت <b>طاقة وضع</b>، وفي أثناء سقوطها تحولت تدريجيًّا إلى <b>طاقة حركية</b> بلغت أقصاها لحظة ملامسة الطين، ثم بذلت الطاقة شغلًا في دفع الطين وتحولت إلى حرارة وصوت. (الكتل والأعماق في المحاكاة تقريبية.)'; },
      draw: function (x, s, t) {
        room(x);
        // الطين
        x.fillStyle = lg(x, 0, CLAY, 0, CLAY + 40, [[0, '#A8A29E'], [1, '#78716C']]); rr(x, 160, CLAY, 360, 30, 6); x.fill();
        if (!s.flat) { x.fillStyle = '#A8A29E'; for (var i = 0; i < 9; i++) { x.beginPath(); x.arc(185 + i * 40, CLAY, 10 + (i % 3) * 4, Math.PI, 0); x.fill(); } }
        T(x, 'طين (٥ سم)', 340, CLAY + 52, 13, '#FEF3C7');
        Object.keys(s.done).forEach(function (k) { var X = { g: 270, s: 340, p: 410 }[k], d = s.done[k]; x.fillStyle = '#57534E'; x.beginPath(); x.ellipse(X, CLAY, 16, d * .9, 0, 0, Math.PI); x.fill(); });
        // مسطرة الارتفاع
        x.fillStyle = '#FEF9C3'; rr(x, 90, CLAY - 1.5 * SC - 20, 34, 1.5 * SC + 20, 6); x.fill();
        for (var m = 0; m <= 1.5; m += .25) { var yy = CLAY - m * SC; x.fillStyle = '#713F12'; x.fillRect(90, yy, m * 4 % 2 ? 10 : 18, 2); if (m * 2 % 1 === 0) T(x, n(m) + ' م', 112, yy + 4, 11, '#713F12', 'left'); }
        x.strokeStyle = '#B45309'; x.setLineDash([6, 5]); x.lineWidth = 2; x.beginPath(); x.moveTo(130, CLAY - 1.5 * SC); x.lineTo(470, CLAY - 1.5 * SC); x.stroke(); x.setLineDash([]); pill(x, '١٫٥ م', 500, CLAY - 1.5 * SC + 5, 14, '#B45309');
        var pe = 0, ke = 0;
        if (s.cur) {
          var b = BL[s.cur], X = { g: 270, s: 340, p: 410 }[s.cur], el = (t - s.rT) / 1000, tf = Math.sqrt(2 * 1.5 / 9.8) * 2.4, e = Math.min(1, Math.max(0, el - .5) / tf), tot = b.m / 1000 * 9.8 * 1.5;
          pe = tot * (1 - e * e); ke = tot * e * e; var by = CLAY - 1.5 * SC + (1.5 * SC - 12) * e * e;
          if (e >= 1) { ke = 0; by = CLAY - 12 + Math.min(1, (el - .5 - tf) * 4) * b.m * .25 * .9; }
          ball(x, X, by, 12, b.c1, b.c2);
          if (e >= 1 && el - .5 - tf > .6 && s.busy) { s.done[s.cur] = b.m * .25; s.rows.push([b.n, b.m, (b.m * .25).toFixed(1), tot.toFixed(2)]); s.busy = 0; }
          bars(x, 560, 70, 200, [['وضع', pe * 1000, EC.pe, 'ملّي جول'], ['حركية', ke * 1000, EC.ke, 'ملّي جول']], 1000, b.n);
        } else bars(x, 560, 70, 200, [['وضع', 0, EC.pe, ''], ['حركية', 0, EC.ke, '']], 1000, 'الطاقة');
        var last = s.rows[s.rows.length - 1];
        if (last && !s.busy) lens(x, 860, 110, 70, function (X, Y, r) { x.fillStyle = '#A8A29E'; x.fillRect(X - r, Y - 10, 2 * r, r + 10); x.fillStyle = '#57534E'; x.beginPath(); x.ellipse(X, Y - 10, 34, +last[2] * 3, 0, 0, Math.PI); x.fill(); x.fillStyle = '#FDE047'; x.fillRect(X + 40, Y - 40, 14, 80); for (var q = 0; q < 8; q++) { x.fillStyle = '#713F12'; x.fillRect(X + 40, Y - 10 + q * 6, q % 2 ? 5 : 9, 1.5); } }, 'العمق ' + n(last[2]) + ' مم');
        ctable(x, 640, 330, [104, 70, 80, 90], ['الكرة', 'الكتلة (جم)', 'العمق (مم)', 'طاقة الوضع (جول)'], s.rows.length ? s.rows : [['—', '—', '—', '—']], { rh: 25, hc: '#B45309', ds: 13, hs: 11 });
      }
    });
    function drop(s, k) { if (s.busy || !s.flat || s.done[k] != null) return; s.cur = k; s.rT = s.T; s.busy = 1; }
  };

  /* ===== كيفية انتقال الطاقة الحرارية: المشروب الساخن والملعقة ===== */
  S.lab_heatflow = function (c, api) {
    return lab(c, api, {
      init: function () { return { spoon: 0, sT: 0, fast: 1, m: 0, last: 0, pts: [] }; },
      steps: [
        { say: 'مشروب ساخن (٨٠°س) في كوب، والهواء حوله ٢٥°س. ضع الملعقة الفلزية (٢٥°س) في المشروب.', btns: [['🥄 ضع الملعقة', function (s) { if (!s.spoon) { s.spoon = 1; s.last = s.T; } }]], ok: function (s) { return s.spoon; } },
        { say: 'سرّع الزمن وراقب درجات الحرارة واتجاه أسهم انتقال الطاقة الحرارية حتى تمر ٣٠ دقيقة.', btns: [['⏩ سرّع الزمن', function (s) { s.fast = 8; }]], ok: function (s) { return s.m >= 30; } }
      ],
      end: function () { return 'انتقلت الطاقة الحرارية من المشروب الساخن إلى الملعقة وإلى الهواء المحيط به؛ لأنهما <b>أبرد</b>. فسخنت الملعقة بسرعة، وانخفضت درجة حرارة المشروب تدريجيًّا مقتربة من درجة حرارة الهواء. <b>الطاقة الحرارية تنتقل فقط من الجسم الأعلى حرارة إلى الجسم الأقل حرارة.</b>'; },
      draw: function (x, s, t) {
        room(x);
        if (s.spoon) { var dt = (t - s.last) / 1000; s.last = t; s.m = Math.min(30, s.m + dt * .6 * s.fast); }
        var Td = 25 + 55 * Math.exp(-s.m / 18), Ts = s.spoon ? Td - (Td - 25) * .25 * Math.exp(-s.m / 1.2) - 6 * (1 - Math.exp(-s.m / 1.2)) * 0 : 25;
        if (s.spoon) Ts = 25 + (Td - 25) * (1 - Math.exp(-s.m / 1.5)) * .85;
        if (s.spoon && (!s.pts.length || s.m - s.pts[s.pts.length - 1][0] >= 1.5)) s.pts.push([s.m, Td, Ts]);
        // الكوب
        var X = 260, Y = 380;
        x.fillStyle = 'rgba(255,255,255,.6)'; x.strokeStyle = '#94A3B8'; x.lineWidth = 3; rr(x, X - 90, Y - 190, 180, 190, 14); x.fill(); x.stroke();
        x.fillStyle = mix('C2410C', 'D6B48C', 1 - (Td - 25) / 55); rr(x, X - 84, Y - 160, 168, 154, 10); x.fill();
        x.strokeStyle = '#94A3B8'; x.lineWidth = 8; x.beginPath(); x.arc(X + 100, Y - 100, 36, -1.3, 1.3); x.stroke();
        if (Td > 40) for (var w = 0; w < 3; w++) wave(x, X - 40 + w * 40, Y - 205, 'rgba(120,113,108,' + ((Td - 40) / 50) + ')', t + w * 300, 3);
        if (s.spoon) { x.save(); x.translate(X + 30, Y - 120); x.rotate(.35); x.fillStyle = lg(x, -8, 0, 8, 0, [[0, '#CBD5E1'], [.5, '#F8FAFC'], [1, '#94A3B8']]); rr(x, -7, -150, 14, 210, 7); x.fill(); x.fillStyle = mix('94A3B8', 'F87171', (Ts - 25) / 55); rr(x, -7, -150, 14, 40, 7); x.fill(); x.restore(); }
        // أسهم انتقال الحرارة
        if (s.spoon && Td - 25 > 3) { var a = (Td - 25) / 55; x.globalAlpha = .4 + .6 * a; [[X - 110, Y - 120, X - 160], [X + 150, Y - 160, X + 200]].forEach(function (p) { arrowH(x, p[0], p[1], p[2], EC.th, 5); }); x.globalAlpha = 1; T(x, 'حرارة إلى الهواء', X - 150, Y - 140, 13, EC.th); T(x, 'حرارة إلى الملعقة', X + 175, Y - 180, 13, EC.th); }
        pill(x, 'المشروب ' + n(Td.toFixed(1)) + '°س', X, Y + 32, 16, '#C2410C'); pill(x, 'الملعقة ' + n(Ts.toFixed(1)) + '°س', X + 150, Y - 290 + 40, 14, '#64748B'); pill(x, 'الهواء ٢٥°س', 80, 70, 14, '#0E7490');
        pill(x, 'الزمن: ' + n(Math.round(s.m)) + ' دقيقة', 520, 60, 16, '#334155');
        graph(x, 660, 80, 290, 260, { title: 'درجة الحرارة مع الزمن', col: '#C2410C', x1: 30, y0: 20, y1: 80, yt: [20, 40, 60, 80], xt: [0, 10, 20, 30], xl: 'الزمن (دقيقة)', series: [{ c: '#C2410C', pts: s.pts.map(function (p) { return [p[0], p[1]]; }) }, { c: '#64748B', pts: s.pts.map(function (p) { return [p[0], p[2]]; }) }, { c: '#0E7490', pts: s.pts.length ? [[0, 25], [30, 25]] : [] }] });
      }
    });
  };

  /* ===== توليد الطاقة الكهربائية: محطة تعمل بالغاز الطبيعي ===== */
  S.lab_plant = function (c, api) {
    var CH = [['كيميائية في الغاز', EC.ch], ['حرارية في الماء', EC.th], ['حركية في البخار', '#0891B2'], ['حركية في التوربين', EC.ke], ['كهربائية من المولد', EC.el]];
    return lab(c, api, {
      init: function () { return { gas: 0, gT: 0, temp: 25, last: 0, valve: 0, rot: 0, spd: 0, gen: 0, wind: 0 }; },
      steps: [
        { say: 'افتح صمام <b>الغاز الطبيعي</b> وأشعله في المرجل، وراقب درجة حرارة الماء حتى يغلي.', btns: [['🔥 أشعل الغاز', function (s) { if (!s.gas) { s.gas = 1; s.gT = s.T; } }]], ok: function (s) { return s.temp >= 100; } },
        { say: 'افتح صمام <b>أنبوب البخار</b> ليندفع البخار بين شفرات التوربين.', btns: [['🔧 افتح صمام البخار', function (s) { if (s.temp >= 100) s.valve = 1; }]], ok: function (s) { return s.valve && s.spd > .9; } },
        { say: 'صِل عمود التوربين بالمولد (ملف يدور داخل مغناطيس)، ولاحظ مصابيح المدينة.', btns: [['⚡ صِل المولد', function (s) { if (s.spd > .9) s.gen = 1; }]], ok: function (s) { return s.gen; } },
        { say: 'في محطات الرياح والمياه تتحول الطاقة الحركية مباشرة دون بخار: بدّل المصدر إلى <b>الرياح</b>.', btns: [['🌬 بدّل إلى الرياح', function (s) { if (s.gen) { s.wind = 1; } }]], ok: function (s) { return s.wind; } }
      ],
      end: function () { return 'في محطة الوقود الأحفوري: <b>الطاقة الكيميائية</b> في الغاز ← <b>حرارية</b> تغلي الماء ← <b>حركية</b> في البخار ← <b>حركية</b> في التوربين ← <b>كهربائية</b> من المولد الذي يحوّل الطاقة الحركية إلى كهربائية بدوران ملف في مجال مغناطيسي، ثم يُبرَّد البخار ويعود ماءً إلى المرجل. وفي محطات الرياح والمياه تدير الطاقة الحركية التوربين مباشرة دون الحاجة إلى توليد البخار.'; },
      draw: function (x, s, t) {
        var dt = s.last ? Math.min(.05, (t - s.last) / 1000) : 0; s.last = t;
        if (s.gas && !s.wind) s.temp = Math.min(100, s.temp + dt * 22);
        var target = s.wind ? 1 : (s.valve ? 1 : 0); s.spd += (target - s.spd) * dt * 1.5; s.rot += s.spd * dt * 14;
        x.fillStyle = lg(x, 0, 0, 0, 470, [[0, '#ECFEFF'], [1, '#CFFAFE']]); x.fillRect(0, 0, 1000, 470);
        x.fillStyle = '#78350F'; x.fillRect(0, 380, 1000, 90);
        // المدخنة والمرجل (يمين)
        x.fillStyle = '#475569'; x.fillRect(880, 60, 46, 320); if (s.gas && !s.wind) for (var p = 0; p < 4; p++) { x.fillStyle = 'rgba(148,163,184,' + (.5 - p * .1) + ')'; x.beginPath(); x.arc(903 + Math.sin(t / 500 + p) * 10, 50 - p * 16 - (t / 30 % 16), 14 + p * 4, 0, 7); x.fill(); }
        if (!s.wind) {
          x.fillStyle = '#B91C1C'; rr(x, 720, 170, 140, 200, 12); x.fill(); x.fillStyle = '#FEF2F2'; rr(x, 735, 185, 110, 120, 8); x.fill();
          x.fillStyle = mix('BFDBFE', 'F87171', (s.temp - 25) / 75); rr(x, 739, 230, 102, 71, 6); x.fill(); if (s.temp >= 100) bubbles(x, 745, 835, 232, 298, t, 14, 4);
          if (s.gas) for (var f = 0; f < 4; f++) flame(x, 750 + f * 27, 362, .7, t + f * 70);
          T(x, 'المرجل', 790, 334, 15, '#FFFFFF'); thermo(x, 700, 370, 105, s.temp, 110, n(Math.round(s.temp)) + '°س');
          x.fillStyle = '#334155'; x.fillRect(860, 345, 120, 14); T(x, 'غاز طبيعي', 950, 376, 12, '#334155');
          // أنبوب البخار
          x.strokeStyle = '#F87171'; x.lineWidth = 12; x.beginPath(); x.moveTo(790, 185); x.lineTo(790, 120); x.lineTo(560, 120); x.lineTo(560, 200); x.stroke();
          x.fillStyle = s.valve ? '#22C55E' : '#DC2626'; x.beginPath(); x.arc(680, 120, 12, 0, 7); x.fill(); T(x, 'صمام', 680, 100, 12, '#334155');
          if (s.valve) for (var d = 0; d < 10; d++) { var q = ((t / 600) + d / 10) % 1, px, py; if (q < .2) { px = 790; py = 185 - q / .2 * 65; } else if (q < .8) { px = 790 - (q - .2) / .6 * 230; py = 120; } else { px = 560; py = 120 + (q - .8) / .2 * 80; } x.fillStyle = 'rgba(255,255,255,.95)'; x.beginPath(); x.arc(px, py, 4, 0, 7); x.fill(); }
          x.strokeStyle = '#60A5FA'; x.lineWidth = 8; x.beginPath(); x.moveTo(520, 300); x.lineTo(520, 400); x.lineTo(780, 400); x.lineTo(780, 370); x.stroke(); T(x, 'يُبرَّد البخار ويعود ماءً', 650, 430, 12, '#FEF3C7');
        } else {
          // توربين رياح
          x.fillStyle = '#E2E8F0'; x.beginPath(); x.moveTo(790, 380); x.lineTo(800, 130); x.lineTo(810, 380); x.closePath(); x.fill();
          x.save(); x.translate(800, 125); x.rotate(s.rot / 3); for (var bl = 0; bl < 3; bl++) { x.rotate(2.094); x.fillStyle = '#F8FAFC'; x.strokeStyle = '#94A3B8'; x.lineWidth = 1.5; x.beginPath(); x.ellipse(0, -48, 9, 48, 0, 0, 7); x.fill(); x.stroke(); } x.restore();
          for (var wd = 0; wd < 5; wd++) { var wx = 980 - ((t / 4 + wd * 90) % 260); x.strokeStyle = 'rgba(14,116,144,.4)'; x.lineWidth = 2; x.beginPath(); x.moveTo(wx, 90 + wd * 22); x.lineTo(wx - 40, 90 + wd * 22); x.stroke(); }
          x.strokeStyle = '#64748B'; x.lineWidth = 6; x.beginPath(); x.moveTo(790, 250); x.lineTo(560, 250); x.stroke(); T(x, 'الرياح تدير التوربين مباشرة', 780, 420, 13, '#FEF3C7');
        }
        // التوربين
        x.fillStyle = '#F59E0B'; rr(x, 460, 200, 140, 100, 14); x.fill(); x.fillStyle = '#FEF3C7'; rr(x, 472, 212, 116, 76, 10); x.fill();
        for (var k = 0; k < 6; k++) { var a = s.rot + k * 1.047; x.strokeStyle = '#92400E'; x.lineWidth = 6; x.beginPath(); x.moveTo(530, 250); x.lineTo(530 + Math.cos(a) * 32, 250 + Math.sin(a) * 32); x.stroke(); }
        T(x, 'التوربين', 530, 194, 14, '#92400E');
        // العمود والمولد
        x.fillStyle = '#64748B'; x.fillRect(360, 244, 100, 12);
        x.fillStyle = '#1E293B'; rr(x, 250, 195, 110, 110, 14); x.fill(); x.fillStyle = '#DC2626'; x.fillRect(258, 205, 20, 90); x.fillStyle = '#2563EB'; x.fillRect(332, 205, 20, 90);
        x.save(); x.translate(305, 250); x.scale(Math.cos(s.rot), 1); x.strokeStyle = '#F59E0B'; x.lineWidth = 4; x.strokeRect(-22, -34, 44, 68); x.restore();
        T(x, 'المولد', 305, 190, 14, '#1E293B');
        // الأسلاك والمدينة
        var bright = s.gen ? s.spd : 0;
        x.strokeStyle = '#334155'; x.lineWidth = 3; x.beginPath(); x.moveTo(250, 230); x.lineTo(150, 230); x.lineTo(150, 300); x.stroke();
        for (var h = 0; h < 4; h++) { var hx = 20 + h * 52, hh = 70 + (h % 2) * 30; x.fillStyle = '#475569'; x.fillRect(hx, 380 - hh, 44, hh); for (var wi = 0; wi < 4; wi++) { x.fillStyle = bright > .5 ? 'rgba(253,224,71,' + bright + ')' : '#1E293B'; x.fillRect(hx + 8 + (wi % 2) * 18, 380 - hh + 12 + Math.floor(wi / 2) * 22, 10, 12); } }
        x.fillStyle = bright > .5 ? rg(x, 150, 310, 2, 40, [[0, 'rgba(253,224,71,.9)'], [1, 'rgba(253,224,71,0)']]) : 'transparent'; x.fillRect(100, 260, 100, 100);
        x.fillStyle = bright > .5 ? '#FDE047' : '#94A3B8'; x.beginPath(); x.arc(150, 312, 13, 0, 7); x.fill();
        var on = s.wind ? -1 : (s.gas ? 1 : 0) + (s.temp >= 100 ? 1 : 0) + (s.valve ? 1 : 0) + (s.valve && s.spd > .9 ? 1 : 0) + (s.gen ? 1 : 0);
        if (on >= 0) chain(x, 20, 20, 660, CH, Math.min(5, on), 13);
        else chain(x, 20, 20, 660, [['حركية في الرياح', '#0891B2'], ['حركية في التوربين', EC.ke], ['كهربائية من المولد', EC.el]], 3, 13);
      }
    });
  };

  /* ===== مراجعة: المصباح الضوئي (١٠٪ ضوء) ===== */
  S.lab_bulb = function (c, api) {
    return lab(c, api, {
      init: function () { return { on: 0, oT: 0, touch: 0, hyp: '' }; },
      steps: [
        { say: 'شغّل المصباح المتوهج (يستهلك ١٠٠ جول كل ثانية)، وراقب ما يخرج منه.', btns: [['💡 شغّل المصباح', function (s) { if (!s.on) { s.on = 1; s.oT = s.T; } }]], ok: function (s) { return s.on && s.T - s.oT > 2000; } },
        { say: 'المصباح يحوّل ١٠٪ فقط من الطاقة الكهربائية إلى ضوء. كوّن فرضية: إلى أيّ شكل تحولت بقية الطاقة؟ ثم قرّب مقياس الحرارة من المصباح.', bind: function (s, b) { addBtn(b, 'حرارية', 'th', function () { pick(b, s, 'hyp', 'th'); }); addBtn(b, 'نووية', 'nu', function () { pick(b, s, 'hyp', 'nu'); }); addBtn(b, 'فنيت', 'no', function () { pick(b, s, 'hyp', 'no'); }); addBtn(b, '🌡 قرّب المقياس', 'tc', function () { if (s.hyp) { s.touch = 1; s.tT = s.T; } }); }, ok: function (s) { return s.touch && s.T - s.tT > 2500; } }
      ],
      end: function (s) { return 'ارتفعت قراءة مقياس الحرارة قرب المصباح؛ فالـ <b>٩٠٪</b> الباقية (٩٠ جولًا كل ثانية) تحولت إلى <b>طاقة حرارية</b> (فرضيتك: ' + (s.hyp === 'th' ? 'صحيحة ✓' : 'غير صحيحة') + '). مجموع الطاقة الخارجة = ١٠ + ٩٠ = ١٠٠ جول = الطاقة الكهربائية الداخلة؛ فالطاقة لم تفنَ، وهذا تطبيق على <b>قانون حفظ الطاقة</b>.'; },
      draw: function (x, s, t) {
        x.fillStyle = s.on ? lg(x, 0, 0, 0, 470, [[0, '#1E293B'], [1, '#334155']]) : lg(x, 0, 0, 0, 470, [[0, '#0F172A'], [1, '#1E293B']]); x.fillRect(0, 0, 1000, 470);
        var e = s.on ? Math.min(1, (t - s.oT) / 800) : 0, X = 300, Y = 200;
        if (e) { x.fillStyle = rg(x, X, Y, 10, 260, [[0, 'rgba(254,240,138,' + .55 * e + ')'], [1, 'rgba(254,240,138,0)']]); x.fillRect(0, 0, 700, 470); }
        x.fillStyle = e ? mix('E2E8F0', 'FEF9C3', e) : 'rgba(226,232,240,.35)'; x.beginPath(); x.arc(X, Y, 70, 0, 7); x.fill(); x.strokeStyle = '#CBD5E1'; x.lineWidth = 2; x.stroke();
        x.fillStyle = '#94A3B8'; rr(x, X - 32, Y + 62, 64, 56, 6); x.fill(); for (var i = 0; i < 4; i++) { x.fillStyle = '#64748B'; x.fillRect(X - 32, Y + 70 + i * 12, 64, 4); }
        x.strokeStyle = e ? '#F97316' : '#64748B'; x.lineWidth = 3; x.beginPath(); x.moveTo(X - 14, Y + 60); x.lineTo(X - 14, Y + 10); for (var q = 0; q < 6; q++) x.lineTo(X - 14 + (q + 1) * 4.7, Y + (q % 2 ? 10 : 0)); x.lineTo(X + 14, Y + 60); x.stroke();
        x.strokeStyle = '#475569'; x.lineWidth = 4; x.beginPath(); x.moveTo(X, Y + 118); x.lineTo(X, 420); x.lineTo(80, 420); x.stroke();
        if (e > .5) { for (var r = 0; r < 8; r++) { var a = r * .785 + t / 3000; x.strokeStyle = 'rgba(253,224,71,.8)'; x.lineWidth = 3; x.beginPath(); x.moveTo(X + Math.cos(a) * 85, Y + Math.sin(a) * 85); x.lineTo(X + Math.cos(a) * 110, Y + Math.sin(a) * 110); x.stroke(); } for (var w = 0; w < 3; w++) wave(x, X - 30 + w * 30, Y - 90, 'rgba(248,113,113,.8)', t + w * 200, 3); }
        if (s.touch) { var dt2 = Math.min(1, (t - s.tT) / 2500); thermo(x, X + 140, Y + 80, 170, 25 + 55 * dt2, 100, n(Math.round(25 + 55 * dt2)) + '°س'); }
        bars(x, 620, 70, 240, [['كهربائية داخلة', s.on ? 100 : 0, EC.el, 'جول/ث'], ['ضوء', e * 10, EC.li, 'جول/ث'], ['حرارة', s.touch || s.hyp ? e * 90 : (e ? e * 90 : 0), EC.th, 'جول/ث']], 100, 'الطاقة كل ثانية');
        if (s.on && e >= 1) pill(x, '١٠٠ = ١٠ + ٩٠ جول', 760, 440, 16, '#16A34A');
      }
    });
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
    cv.addEventListener('click', function (e) { var r = cv.getBoundingClientRect(); st.click = [(e.clientX - r.left) * 1000 / r.width, (e.clientY - r.top) * cv.height / r.height]; });
    function next() {
      k++; api.step(k);
      if (k >= o.steps.length) { panel.querySelector('.labstep').innerHTML = '✅ أتممت خطوات التجربة!'; panel.querySelector('.labbtns').innerHTML = ''; var e = panel.querySelector('.labend'); e.hidden = false; e.innerHTML = '🔎 <b>الملاحظة والاستنتاج:</b> ' + o.end(st); api.done && api.done(); return; }
      var s = o.steps[k]; panel.querySelector('.labstep').innerHTML = '<span class="labn">' + n(k + 1) + '</span> ' + s.say;
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
