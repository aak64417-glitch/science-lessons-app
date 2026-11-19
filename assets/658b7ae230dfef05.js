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

  var DATA6 = {heim:'../assets/7b7e2c04b7fb115e.webp',neph:'../assets/a6fda88dd7a2f448.webp',urin:'../assets/bd8920639bb5425f.webp',alv:'../assets/70653233b4ace4db.webp',vill:'../assets/f6d4994a3824e787.webp',enz:'../assets/f50354aa45255046.webp',gut:'../assets/e0974580262870c3.webp',lung:'../assets/74513a7532966476.webp'};
  var IMG6 = {};
  function im6(k) { if (!IMG6[k]) { IMG6[k] = new Image(); IMG6[k].src = DATA6[k]; } var i = IMG6[k]; return i.complete && i.naturalWidth ? i : null; }
  /* ================= رسوم الفصل السادس «رحلة اللقمة والنَّفَس» ================= */
  function gut(x, H) { H = H || 470; x.fillStyle = lg(x, 0, 0, 0, H, [[0, '#FFF7ED'], [1, '#FFEDD5']]); x.fillRect(0, 0, 1000, H); x.fillStyle = 'rgba(194,65,12,.05)'; for (var i = 0; i < 18; i++) { x.beginPath(); x.arc((i * 149) % 1000, (i * 97) % H, 18 + (i % 4) * 9, 0, 7); x.fill(); } }
  function sky(x, H) { H = H || 470; x.fillStyle = lg(x, 0, 0, 0, H, [[0, '#F0F9FF'], [1, '#E0F2FE']]); x.fillRect(0, 0, 1000, H); x.fillStyle = 'rgba(3,105,161,.05)'; for (var i = 0; i < 16; i++) { x.beginPath(); x.arc((i * 167) % 1000, (i * 83) % H, 14 + (i % 3) * 10, 0, 7); x.fill(); } }
  function card6(x, X, Y, w, h, col) { x.fillStyle = '#fff'; rr(x, X, Y, w, h, 14); x.fill(); x.strokeStyle = col || '#E2E8F0'; x.lineWidth = 2; rr(x, X, Y, w, h, 14); x.stroke(); }
  function lungs(x, X, Y, k, col) {   // رئتان تتمددان بالمعامل k (0..1)
    var s = .85 + .25 * k; x.fillStyle = col || '#F9A8D4'; x.strokeStyle = '#BE185D'; x.lineWidth = 2.5;
    [-1, 1].forEach(function (d) { x.save(); x.translate(X + d * 52, Y); x.scale(s, s); x.beginPath(); x.moveTo(-d * 12, -70); x.bezierCurveTo(d * 60, -80, d * 70, 40, d * 40, 70); x.bezierCurveTo(d * 10, 80, -d * 18, 60, -d * 14, 20); x.closePath(); x.fill(); x.stroke(); x.restore(); });
    x.strokeStyle = '#94A3B8'; x.lineWidth = 9; x.lineCap = 'round'; x.beginPath(); x.moveTo(X, Y - 130); x.lineTo(X, Y - 70); x.moveTo(X, Y - 70); x.lineTo(X - 34, Y - 50); x.moveTo(X, Y - 70); x.lineTo(X + 34, Y - 50); x.stroke(); x.lineCap = 'butt';
  }
  function lungImg(x, AX, AY, W, k) {   // صورة الرئتين: تتمدد من أعلى القصبة؛ الحجاب الحاجز ينزل في الشهيق
    var I = im6('lung'), H = W * 752 / 1100, ax = W * 410 / 1100, ay = W * 14 / 1100;
    x.save(); x.translate(AX, AY); x.scale(1 + .05 * k, 1 + .08 * k);
    if (I) x.drawImage(I, -ax, -ay, W, H); x.restore();
  }
  function arrow6(x, X1, Y1, X2, Y2, col, w) { var a = Math.atan2(Y2 - Y1, X2 - X1); x.strokeStyle = col; x.fillStyle = col; x.lineWidth = w || 4; x.beginPath(); x.moveTo(X1, Y1); x.lineTo(X2 - Math.cos(a) * 10, Y2 - Math.sin(a) * 10); x.stroke(); x.beginPath(); x.moveTo(X2, Y2); x.lineTo(X2 - Math.cos(a - .45) * 16, Y2 - Math.sin(a - .45) * 16); x.lineTo(X2 - Math.cos(a + .45) * 16, Y2 - Math.sin(a + .45) * 16); x.fill(); }
  function meter6(x, X, Y, w, v, lbl, col) { x.fillStyle = '#E2E8F0'; rr(x, X, Y, w, 16, 8); x.fill(); x.fillStyle = col; rr(x, X, Y, Math.max(8, w * Math.min(1, v)), 16, 8); x.fill(); T(x, lbl, X + w, Y - 6, 13, '#334155', 'right'); }

  /* ===== التجربة الاستهلالية: معدل التنفس ===== */
  S.lab_breath = function (c, api) {
    function count(s, lab) { s.cnt = Math.round(s.rate / 4); s.cT = s.T; s.lab = lab; s.busy = 1; }
    return lab(c, api, {
      init: function () { return { rate: 16, target: 16, mode: 'rest', cnt: 0, rows: [], rec: 0, rT: 0, recS: 0, q: '' }; },
      steps: [
        { say: 'ضع يدك على صدرك وعُدّ مرات تنفسك في <b>١٥ ثانية</b> وأنت في راحة، ثم اضرب في ٤. كرّر العدّ <b>مرتين</b> لتحسب المتوسط.', btns: [['⏱ عُدّ ١٥ ثانية', function (s) { if (!s.cnt) count(s, 'راحة ' + n(s.rows.length + 1)); }]], ok: function (s) { return s.rows.length >= 2; } },
        { say: 'قم بنشاط رياضي (القفز في المكان) مدة دقيقة، ثم عُدّ تنفسك مرة أخرى.', btns: [['🤸 نشاط دقيقة', function (s) { if (s.mode === 'rest' && !s.cnt) { s.mode = 'run'; s.target = 32; s.rT = s.T; } }], ['⏱ عُدّ ١٥ ثانية', function (s) { if (s.mode === 'run' && !s.cnt && s.T - s.rT > 2500) count(s, 'بعد النشاط'); }]], ok: function (s) { return s.rows.length >= 3; } },
        { say: 'استرح الآن، وقِس الوقت اللازم ليعود معدل تنفسك إلى وضعه الطبيعي.', btns: [['🪑 استرح وشغّل المؤقت', function (s) { if (s.mode === 'run' && !s.rec) { s.mode = 'rest2'; s.target = 16; s.rec = 1; s.rT = s.T; } }]], ok: function (s) { return s.recS > 0; } },
        { say: 'التفكير الناقد: ما العلاقة بين معدل التنفس والنشاط الرياضي؟', bind: function (s, b) { [['يزداد مع النشاط', 'u'], ['يقل مع النشاط', 'd'], ['لا يتغير', 'n']].forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'q', o[1]); }); }); }, ok: function (s) { return s.q === 'u'; } }
      ],
      end: function (s) { return 'متوسط معدل التنفس في الراحة نحو <b>' + n(Math.round((s.rows[0][2] + s.rows[1][2]) / 2)) + ' مرة/دقيقة</b>، وزاد بعد النشاط ثم عاد إلى الطبيعي بعد الراحة. فالعضلات النشطة تحتاج إلى <b>أكسجين أكثر</b> لتحرير الطاقة، وتنتج <b>ثاني أكسيد كربون أكثر</b>؛ فيرسل الدماغ إشارات لزيادة سرعة التنفس، ولا يستطيع الجسم تخزين الأكسجين. (الأرقام في المحاكاة نموذجية؛ قِس تنفسك الحقيقي.)'; },
      draw: function (x, s, t) {
        sky(x);
        s.rate += (s.target - s.rate) * (s.mode === 'rest2' ? .006 : .02);
        if (s.rec && !s.recS && Math.abs(s.rate - 16) < .6) { s.recS = Math.round((s.T - s.rT) / 1000 * 25); s.rows.push(['زمن العودة', '—', n(s.recS) + ' ث']); }
        var per = 60000 / s.rate / 6, ph = (t % per) / per, k = .5 - .5 * Math.cos(ph * 6.283);
        lungImg(x, 200, 70, 430, k);
        pill(x, k > .5 ? 'شهيق: الحجاب الحاجز ينقبض وينزل' : 'زفير: الحجاب الحاجز ينبسط ويرتفع', 230, 440, 15, '#0C4A6E');
        if (s.mode === 'run' && s.T - s.rT < 2500) pill(x, 'نشاط رياضي… 🤸', 250, 30, 16, '#C2410C');
        if (s.rec && !s.recS) pill(x, '⏱ ' + n(Math.round((s.T - s.rT) / 1000 * 25)) + ' ثانية', 250, 30, 16, '#0369A1');
        // العداد
        card6(x, 470, 40, 480, 120, '#BAE6FD'); T(x, n(Math.round(s.rate)) + ' مرة/دقيقة', 710, 100, 30, '#0369A1'); T(x, 'معدل التنفس الحالي (محاكاة)', 710, 138, 14, '#475569');
        if (s.cnt) { var e = Math.min(1, (t - s.cT) / 3000); pill(x, 'العدّ: ' + n(Math.floor(e * s.cnt)) + ' نَفَس', 710, 190, 17, '#0369A1'); if (e >= 1 && s.busy) { s.busy = 0; s.rows.push([s.lab, s.cnt, s.cnt * 4]); s.cnt = 0; } }
        ctable(x, 520, 220, [140, 120, 120], ['الحالة', 'في ١٥ ث', 'في الدقيقة'], s.rows.length ? s.rows : [['—', '—', '—']], { rh: 30, hc: '#0369A1', ds: 14, hs: 13 });
      }
    });
  };

  /* ===== الإنزيم: يسرّع التفاعل ولا يتغير ===== */
  S.lab_enzyme = function (c, api) {
    return lab(c, api, {
      init: function () { return { run: 0, rT: 0, n: 0, race: 0, raceT: 0, q: '' }; },
      steps: [
        { say: 'أضف الجزيئين <b>أ</b> و<b>ب</b> إلى الإنزيم وراقب ما يحدث (الشكل 1).', btns: [['➕ أضف الجزيئين', function (s) { if (!s.run) { s.run = 1; s.rT = s.T; } }]], ok: function (s) { return s.n >= 1; } },
        { say: 'استعمل <b>الإنزيم نفسه</b> مرة بعد مرة. هل تغيّر أو نفد؟ (كرّر حتى ٣ تفاعلات)', btns: [['🔁 جزيئان جديدان', function (s) { if (!s.run) { s.run = 1; s.rT = s.T; } }]], ok: function (s) { return s.n >= 3; } },
        { say: 'قارن سرعة التفاعل <b>بوجود الإنزيم</b> و<b>دونه</b> خلال الزمن نفسه.', btns: [['🏁 ابدأ المقارنة', function (s) { if (!s.race) { s.race = 1; s.raceT = s.T; } }]], ok: function (s) { return s.race && s.T - s.raceT > 4200; } },
        { say: 'ماذا يحدث للإنزيم بعد انفصاله عن الجزيء الجديد؟', bind: function (s, b) { [['يتغير وينفد', 'a'], ['يبقى دون تغيير ويعمل مرة أخرى', 'b'], ['يصبح جزءًا من الجزيء ج', 'c']].forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'q', o[1]); }); }); }, ok: function (s) { return s.q === 'b'; } }
      ],
      end: function () { return 'الإنزيم بروتين يجمع الجزيئين في <b>شكل معقد مؤقت</b> فيقلل الطاقة اللازمة لبدء التفاعل فيسرّعه، ثم ينفصل الجزيء الجديد <b>ج</b> ويبقى الإنزيم <b>دون تغيير</b> فيعمل مرات كثيرة. ولولا الإنزيمات لكانت تفاعلات الهضم وغيرها بطيئة جدًّا.'; },
      draw: function (x, s, t) {
        gut(x);
        function enz(X, Y) { x.fillStyle = '#FBBF24'; x.strokeStyle = '#B45309'; x.lineWidth = 3; x.beginPath(); x.moveTo(X, Y - 70); x.lineTo(X + 60, Y - 70); x.lineTo(X + 60, Y + 70); x.lineTo(X, Y + 70); x.lineTo(X, Y + 30); x.lineTo(X + 25, Y + 30); x.lineTo(X + 25, Y + 5); x.lineTo(X, Y + 5); x.lineTo(X, Y - 5); x.lineTo(X + 25, Y - 5); x.lineTo(X + 25, Y - 30); x.lineTo(X, Y - 30); x.closePath(); x.fill(); x.stroke(); T(x, 'إنزيم', X + 30, Y + 95, 16, '#B45309'); }
        function mol(X, Y, col, lab, tabUp) { x.fillStyle = col; x.strokeStyle = 'rgba(0,0,0,.25)'; x.lineWidth = 2; rr(x, X - 60, Y - 30, 60, 60, 6); x.fill(); x.stroke(); x.fillRect(X - 4, tabUp ? Y - 30 : Y + 5, 26, 25); T(x, lab, X - 30, Y + 7, 18, '#fff'); }
        var e = s.run ? Math.min(1, (t - s.rT) / 2600) : 0, EX = 520, EY = 200;
        enz(EX, EY);
        if (!s.run) { mol(260, 140, '#A21CAF', 'أ', 0); mol(260, 270, '#0891B2', 'ب', 1); }
        else {
          var a = Math.min(1, e / .4), ax = 260 + (EX - 260) * a, ay1 = 140 + (EY - 30 - 140) * a, ay2 = 270 + (EY + 30 - 270) * a;
          if (e < .7) { mol(ax, ay1, '#A21CAF', 'أ', 0); mol(ax, ay2, '#0891B2', 'ب', 1); if (e > .4) pill(x, 'شكل معقد مؤقت', EX, 70, 16, '#7C2D12'); }
          else { var b = (e - .7) / .3, px = EX - 20 - b * 300; x.fillStyle = '#DC2626'; rr(x, px - 60, EY - 60, 60, 120, 8); x.fill(); T(x, 'ج', px - 30, EY + 8, 22, '#fff'); pill(x, 'الجزيء الجديد ج', px - 30, EY - 80, 15, '#DC2626'); pill(x, 'الإنزيم لم يتغير ✓', EX + 30, 70, 15, '#15803D'); }
          if (e >= 1) { s.run = 0; s.n++; }
        }
        card6(x, 680, 40, 280, 70, '#FED7AA'); T(x, 'تفاعلات بالإنزيم نفسه: ' + n(s.n), 820, 84, 18, '#C2410C');
        if (!s.race) { var EI = im6('enz'); card6(x, 640, 130, 330, 270, '#FED7AA'); if (EI) x.drawImage(EI, 655, 145, 300, 575 * 300 / 807); T(x, 'الإنزيم يرتبط بالجزيئين ثم يُطلق جزيئًا جديدًا', 805, 385, 13, '#7C2D12'); }
        if (s.race) {
          var tt = Math.min(4000, t - s.raceT), A = Math.floor(tt / 4000 * 40), B = Math.floor(tt / 4000 * 3);
          card6(x, 640, 140, 330, 250, '#FED7AA'); T(x, 'نواتج التفاعل في الزمن نفسه', 805, 172, 15, '#334155');
          x.fillStyle = '#F97316'; rr(x, 820, 370 - A * 4.5, 80, A * 4.5 + 2, 6); x.fill(); x.fillStyle = '#94A3B8'; rr(x, 690, 370 - B * 4.5, 80, B * 4.5 + 2, 6); x.fill();
          T(x, n(A), 860, 362 - A * 4.5, 16, '#C2410C'); T(x, n(B), 730, 362 - B * 4.5, 16, '#475569'); T(x, 'بالإنزيم', 860, 388, 14, '#C2410C'); T(x, 'دون إنزيم', 730, 388, 14, '#475569');
        }
        T(x, 'إنزيم + جزيء أ + جزيء ب ← شكل معقد مؤقت ← الإنزيم لم يتغير + جزيء ج', 500, 445, 16, '#7C2D12');
      }
    });
  };

  /* ===== رحلة اللقمة داخل القناة الهضمية (صورة الجهاز الهضمي) ===== */
  S.lab_tract = function (c, api) {
    // مواقع الأعضاء على صورة الجهاز الهضمي (1600×1000)
    var PT = [[793, 104], [805, 265], [975, 450], [717, 577], [800, 800], [800, 647]];
    var LENS = [[793, 150, 520], [810, 265, 460], [930, 470, 600], [800, 560, 700], [800, 800, 560], [740, 752, 760]];
    var NM = ['الفم', 'المريء', 'المعدة', 'الاثنا عشر', 'الأمعاء الدقيقة', 'الأمعاء الغليظة'];
    return lab(c, api, {
      init: function () { return { st: 0, chew: 0, sal: 0, swal: 0, sw: 0, mix: 0, acid: 0, bile: 0, panc: 0, abs: 0, aT: 0, water: 0, wT: 0 }; },
      steps: [
        { say: '<b>الفم:</b> امضغ اللقمة (هضم ميكانيكي)، ثم أضف اللعاب (هضم كيميائي للنشا).', btns: [['🦷 امضغ', function (s) { s.chew = 1; }], ['💧 أضف اللعاب', function (s) { if (s.chew) s.sal = 1; }]], ok: function (s) { return s.sal; } },
        { say: '<b>البلع والمريء:</b> ابلع اللقمة وراقب <b>لسان المزمار</b> و<b>الحركة الدودية</b>.', btns: [['⬇ ابلع', function (s) { if (!s.swal) { s.swal = 1; s.sw = s.T; s.st = 1; } }]], ok: function (s) { return s.swal && s.T - s.sw > 2600; } },
        { say: '<b>المعدة:</b> حرّك عضلاتها، وأضف حمض الهيدروكلوريك وإنزيم الببسين.', btns: [['🔄 حرّك العضلات', function (s) { s.st = 2; s.mix = 1; }], ['🧪 حمض + ببسين', function (s) { if (s.mix) s.acid = 1; }]], ok: function (s) { return s.acid; } },
        { say: '<b>الاثنا عشر:</b> أضف العصارة الصفراوية من الكبد (للدهون) وعصارة البنكرياس (إنزيمات + بيكربونات).', btns: [['🟢 العصارة الصفراوية', function (s) { s.st = 3; s.bile = 1; }], ['🟡 عصارة البنكرياس', function (s) { if (s.bile) s.panc = 1; }]], ok: function (s) { return s.panc; } },
        { say: '<b>الأمعاء الدقيقة:</b> دع الخملات تمتص المواد الغذائية إلى الشعيرات الدموية.', btns: [['🧲 امتصاص', function (s) { if (!s.abs) { s.st = 4; s.abs = 1; s.aT = s.T; } }]], ok: function (s) { return s.abs && s.T - s.aT > 3000; } },
        { say: '<b>الأمعاء الغليظة:</b> امتص الماء من البقايا للمحافظة على الاتزان الداخلي.', btns: [['💦 امتص الماء', function (s) { if (!s.water) { s.st = 5; s.water = 1; s.wT = s.T; } }]], ok: function (s) { return s.water && s.T - s.wT > 3000; } }
      ],
      end: function () { return 'مرت اللقمة بالمراحل الأربع: <b>البلع والهضم والامتصاص والتخلص من الفضلات</b>. الهضم الميكانيكي في الفم والمعدة، والكيميائي يبدأ باللعاب ويستمر في المعدة (الحمض والببسين للبروتين)، ومعظمه في <b>الاثني عشر</b> بمساعدة عصارة الكبد والبنكرياس، ثم تمتص <b>الخملات</b> المواد الغذائية إلى الدم، وتمتص <b>الأمعاء الغليظة</b> الماء فتصبح الفضلات شبه صلبة.'; },
      draw: function (x, s, t) {
        gut(x);
        var G = im6('gut');
        // الخريطة الكاملة
        card6(x, 15, 15, 465, 440, '#FDBA74'); T(x, '🗺 مسار اللقمة', 248, 52, 19, '#7C2D12');
        var MX = 25, MY = 95, MK = 445 / 1600;
        if (G) x.drawImage(G, MX, MY, 445, 278);
        var P = PT[s.st], px = MX + P[0] * MK, py = MY + P[1] * MK, r = 16 + Math.sin(t / 180) * 4;
        x.strokeStyle = '#DC2626'; x.lineWidth = 4; x.beginPath(); x.arc(px, py, r, 0, 7); x.stroke(); x.fillStyle = 'rgba(220,38,38,.25)'; x.beginPath(); x.arc(px, py, r, 0, 7); x.fill();
        for (var i = 0; i < 6; i++) { var on = i === s.st, dn = i < s.st; x.fillStyle = on ? '#C2410C' : (dn ? '#16A34A' : '#E2E8F0'); rr(x, 333 - (i % 3) * 148, 385 + Math.floor(i / 3) * 34, 136, 28, 14); x.fill(); T(x, (dn ? '✓ ' : '') + NM[i], 401 - (i % 3) * 148, 405 + Math.floor(i / 3) * 34, 14, on || dn ? '#fff' : '#475569'); }
        // العدسة المكبّرة
        card6(x, 495, 15, 490, 440, '#FDBA74'); T(x, '🔍 عدسة الرحلة: ' + NM[s.st], 740, 52, 19, '#7C2D12');
        var LX = 510, LY = 70, LW = 460, LH = 300, L = LENS[s.st], k = LW / L[2], SH = LH / k, x0 = L[0] - L[2] / 2, y0 = Math.max(0, Math.min(1000 - SH, L[1] - SH / 2));
        function Q(a, b) { return [LX + (a - x0) * k, LY + (b - y0) * k]; }
        x.save(); rr(x, LX, LY, LW, LH, 16); x.clip();
        var wob = s.st === 2 && s.mix ? Math.sin(t / 220) * 6 : 0;
        if (G) x.drawImage(G, x0, y0, L[2], SH, LX - wob, LY - wob, LW + 2 * wob, LH + 2 * wob); else { x.fillStyle = '#FFEDD5'; x.fillRect(LX, LY, LW, LH); }
        var j, q;
        if (s.st === 0) {
          q = Q(793, 112); var n = s.chew ? 7 : 1;
          for (j = 0; j < n; j++) { var a = j * .9, rad = s.chew ? 44 : 0; x.fillStyle = s.sal ? '#FBBF24' : '#A8A29E'; x.strokeStyle = '#78350F'; x.lineWidth = 2; x.beginPath(); x.arc(q[0] + Math.cos(a) * rad * 1.3, q[1] + Math.sin(a) * rad * .4, s.chew ? 14 : 30, 0, 7); x.fill(); x.stroke(); }
          if (s.sal) for (j = 0; j < 26; j++) { x.fillStyle = 'rgba(14,165,233,.85)'; x.beginPath(); x.arc(q[0] - 100 + (j * 37) % 200, q[1] - 25 + (j * 53) % 60, 4.5, 0, 7); x.fill(); }
        } else if (s.st === 1) {
          var e = Math.min(1, (t - s.sw) / 2400), A = Q(793, 175), B = Q(825, 365), bx = A[0] + (B[0] - A[0]) * e, by = A[1] + (B[1] - A[1]) * e;
          for (j = -1; j <= 1; j += 2) { x.strokeStyle = '#EA580C'; x.lineWidth = 6; x.beginPath(); x.arc(bx, by + j * 34, 30, 0, 7); x.stroke(); }
          x.fillStyle = '#FBBF24'; x.strokeStyle = '#78350F'; x.lineWidth = 2; x.beginPath(); x.arc(bx, by, 20, 0, 7); x.fill(); x.stroke();
        } else if (s.st === 2) {
          q = Q(985, 470);
          x.fillStyle = s.acid ? 'rgba(253,230,138,.85)' : 'rgba(251,191,36,.85)'; x.beginPath(); x.ellipse(q[0], q[1], 70, 38, -.3, 0, 7); x.fill();
          if (s.acid) bubbles(x, q[0] - 60, q[0] + 60, q[1] - 30, q[1] + 30, t, 14, 4);
        } else if (s.st === 3) {
          q = Q(717, 590);
          for (j = 0; j < (s.bile ? 12 : 4); j++) { x.fillStyle = '#FEF08A'; x.strokeStyle = '#CA8A04'; x.lineWidth = 1.5; x.beginPath(); x.arc(q[0] - 40 + (j * 29) % 80, q[1] - 25 + (j * 17) % 50, s.bile ? 6 : 15, 0, 7); x.fill(); x.stroke(); }
          if (s.bile) { var lv = Q(600, 520); arrow6(x, lv[0], lv[1], q[0] - 20, q[1] - 20, '#15803D', 5); }
          if (s.panc) { var pc = Q(1030, 560); arrow6(x, pc[0], pc[1], q[0] + 25, q[1], '#CA8A04', 5); }
        } else if (s.st === 4) {
          var e2 = Math.min(1, (t - s.aT) / 2800);
          for (j = 0; j < 22; j++) { q = Q(700 + (j * 37) % 200, 740 + (j * 23) % 120); x.fillStyle = ['#F59E0B', '#22C55E', '#A855F7'][j % 3]; x.globalAlpha = 1 - e2 * .85; x.beginPath(); x.arc(q[0], q[1], 6, 0, 7); x.fill(); }
          x.globalAlpha = 1;
          // نافذة الخملات (صورة)
          var VI = im6('vill'), vw = 270, vk = vw / 805, vh = 607 * vk;
          x.fillStyle = '#fff'; x.strokeStyle = '#BE123C'; x.lineWidth = 3; rr(x, LX + 8, LY + 8, vw + 8, vh + 30, 12); x.fill(); x.stroke();
          if (VI) x.drawImage(VI, LX + 12, LY + 34, vw, vh);
          T(x, '🔬 مقطع مكبّر: الخملات', LX + 12 + vw / 2, LY + 27, 14, '#9F1239');
          [175, 405, 615].forEach(function (cx, ii) { var yy = LY + 34 + (20 + ((e2 * 160 + ii * 30) % 160)) * vk; x.fillStyle = ['#F59E0B', '#22C55E', '#A855F7'][ii]; x.beginPath(); x.arc(LX + 12 + cx * vk, yy, 5, 0, 7); x.fill(); });
        } else {
          var e3 = Math.min(1, (t - s.wT) / 2800), W1 = Q(565, 800), W2 = Q(800, 655), W3 = Q(1040, 800), cx, cy;
          if (e3 < .5) { cx = W1[0] + (W2[0] - W1[0]) * e3 * 2; cy = W1[1] + (W2[1] - W1[1]) * e3 * 2; } else { cx = W2[0] + (W3[0] - W2[0]) * (e3 - .5) * 2; cy = W2[1] + (W3[1] - W2[1]) * (e3 - .5) * 2; }
          x.fillStyle = mix('B45309', '57301A', e3); x.beginPath(); x.ellipse(cx, cy, 20 - e3 * 5, 14 - e3 * 3, 0, 0, 7); x.fill();
          for (j = 0; j < Math.round(14 * (1 - e3)); j++) { x.fillStyle = '#0EA5E9'; x.beginPath(); x.arc(cx - 40 + (j * 23) % 80, cy - 30 - (j * 11) % 30 - e3 * 20, 4, 0, 7); x.fill(); }
        }
        x.restore();
        x.strokeStyle = '#FB923C'; x.lineWidth = 3; rr(x, LX, LY, LW, LH, 16); x.stroke();
        // شرح ما يحدث
        var msg = ['', '', '', '', '', ''];
        msg[0] = s.sal ? 'إنزيمات اللعاب: النشا ← سكر' : (s.chew ? 'قطع صغيرة: هضم ميكانيكي' : 'لقمة كبيرة في الفم');
        msg[1] = 'لسان المزمار يسد ممر الهواء · الحركة الدودية (لا هضم في المريء)';
        msg[2] = s.acid ? 'HCl + ببسين ← الكيموس (هضم البروتين)' : (s.mix ? 'هضم ميكانيكي: مزج بحركة العضلات' : 'المعدة كيس عضلي');
        msg[3] = s.panc ? 'البيكربونات تعادل الحموضة · الإنزيمات تهضم الغذاء' : (s.bile ? 'العصارة الصفراوية تجزّئ الدهون' : 'قطرات دهن كبيرة');
        msg[4] = 'الخملات تزيد مساحة السطح ← امتصاص أكبر إلى الدم';
        msg[5] = s.water && t - s.wT > 2800 ? 'فضلات شبه صلبة ← المستقيم ← فتحة الشرج' : 'امتصاص الماء = اتزان داخلي';
        pill(x, msg[s.st], 740, 405, 15, s.st === 4 ? '#BE123C' : '#C2410C');
        if (s.st === 5) meter6(x, 560, 430, 360, 1 - Math.min(1, (t - s.wT) / 2800) * .8, 'الماء في البقايا', '#0EA5E9');
      }
    });
  };

  /* ===== مقارنة محتوى الدهون في الأطعمة ===== */
  S.lab_fat = function (c, api) {
    var F = [['رقائق بطاطس', 1, '#FBBF24'], ['فستق', 1, '#A3E635'], ['جبن', 1, '#FDE047'], ['خضراوات', 0, '#22C55E'], ['لحم', 1, '#B91C1C'], ['فاكهة', 0, '#FB923C']];
    function bx(i) { return 110 + (i % 3) * 300; } function by(i) { return i < 3 ? 70 : 255; }
    return lab(c, api, {
      init: function () { return { placed: 0, wait: 0, wT: 0, out: 0, oT: 0, sel: [0, 0, 0, 0, 0, 0] }; },
      steps: [
        { say: 'ضع قطع كل طعام في كيس ورقي بني مكتوب عليه اسمه (لا تتذوقها).', btns: [['🥜 ضع الأطعمة', function (s) { s.placed = 1; }]], ok: function (s) { return s.placed; } },
        { say: 'اترك الأطعمة <b>٣٠ دقيقة</b>.', btns: [['⏩ انتظر ٣٠ دقيقة', function (s) { if (s.placed && !s.wait) { s.wait = 1; s.wT = s.T; } }]], ok: function (s) { return s.wait && s.T - s.wT > 3000; } },
        { say: 'أخرج الأطعمة وتخلص منها، ثم لاحظ الأكياس وانتظر قليلًا حتى يجف الماء.', btns: [['🗑 أخرج الأطعمة', function (s) { if (!s.out) { s.out = 1; s.oT = s.T; } }]], ok: function (s) { return s.out && s.T - s.oT > 4500; } },
        { say: 'انقر على الأكياس التي بقيت عليها <b>بقعة شفافة (دهنية)</b> بعد الجفاف.', ok: function (s) { return F.every(function (f, i) { return !!s.sel[i] === !!f[1]; }); } }
      ],
      end: function () { return 'البقعة الشفافة التي لا تجف تدل على <b>الدهون</b> (رقائق البطاطس والفستق والجبن واللحم)، أما البقعة المائية فتجف وتختفي فتدل على أن الطعام يحتوي على كمية كبيرة من <b>الماء</b> (الخضراوات والفاكهة). الدهون مخزون جيد للطاقة، لكن الإكثار من المشبعة منها يرفع الكولسترول.'; },
      draw: function (x, s, t) {
        gut(x);
        if (s.click && s.step === 3) F.forEach(function (f, i) { var X = bx(i), Y = by(i); if (s.click[0] > X && s.click[0] < X + 180 && s.click[1] > Y && s.click[1] < Y + 160) s.sel[i] = s.sel[i] ? 0 : 1; });
        var dry = s.out ? Math.min(1, (t - s.oT) / 4000) : 0;
        F.forEach(function (f, i) {
          var X = bx(i), Y = by(i); x.fillStyle = '#B08968'; rr(x, X, Y, 180, 160, 8); x.fill(); x.fillStyle = '#9C7656'; x.fillRect(X, Y, 180, 18);
          if (s.wait && s.out) { var a = f[1] ? .55 : .5 * (1 - dry); if (a > .01) { x.fillStyle = f[1] ? 'rgba(254,243,199,' + a + ')' : 'rgba(30,58,138,' + a * .7 + ')'; x.beginPath(); x.ellipse(X + 90, Y + 95, 55, 36, 0, 0, 7); x.fill(); } }
          if (s.placed && !s.out) for (var k = 0; k < 3; k++) { x.fillStyle = f[2]; x.beginPath(); x.arc(X + 50 + k * 40, Y + 95 + (k % 2) * 10, 16, 0, 7); x.fill(); }
          T(x, f[0], X + 90, Y + 145, 16, '#fff');
          if (s.sel[i]) { x.strokeStyle = '#16A34A'; x.lineWidth = 5; rr(x, X - 4, Y - 4, 188, 168, 10); x.stroke(); pill(x, '✓ دهنية', X + 150, Y + 40, 13, '#16A34A'); }
        });
        if (s.wait && !s.out) { var e = Math.min(1, (t - s.wT) / 2800); clock(x, 900, 430, 30, e * 6); pill(x, 'مرّ ' + n(Math.round(e * 30)) + ' دقيقة', 760, 440, 15, '#C2410C'); }
        if (s.out) pill(x, dry < 1 ? 'تجف البقع المائية…' : 'بقيت البقع الدهنية فقط', 500, 448, 16, '#7C2D12');
      }
    });
  };

  /* ===== نموذج الرئتين والحجاب الحاجز ===== */
  S.lab_lungs = function (c, api) {
    return lab(c, api, {
      init: function () { return { d: 0, tgt: 0, ins: 0, exh: 0, co2: 0, auto: 0, q: '' }; },
      steps: [
        { say: 'اجعل <b>الحجاب الحاجز</b> ينقبض فيتحرك إلى أسفل: ماذا يحدث لحجم التجويف الصدري وضغط الهواء والرئتين؟', btns: [['⬇ انقباض الحجاب الحاجز', function (s) { s.tgt = 1; s.ins = 1; }]], ok: function (s) { return s.ins && s.d > .95; } },
        { say: 'اجعل الحجاب الحاجز ينبسط فيرتفع إلى أعلى: ماذا يحدث الآن؟', btns: [['⬆ انبساط الحجاب الحاجز', function (s) { if (s.ins) { s.tgt = 0; s.exh = 1; } }]], ok: function (s) { return s.exh && s.d < .05; } },
        { say: 'ارفع نسبة <b>ثاني أكسيد الكربون</b> في الدم (كما في أثناء الجري) وراقب أوامر الدماغ.', btns: [['🧠 ارفع CO₂', function (s) { s.co2 = 1; s.auto = s.T; }]], ok: function (s) { return s.co2 && s.T - s.auto > 3500; } },
        { say: 'عندما يزداد حجم التجويف الصدري، فإن ضغط الهواء داخله:', bind: function (s, b) { [['يقل فيدخل الهواء', 'a'], ['يزداد فيدخل الهواء', 'b'], ['لا يتغير', 'c']].forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'q', o[1]); }); }); }, ok: function (s) { return s.q === 'a'; } }
      ],
      end: function () { return 'ينقبض الحجاب الحاجز فيتحرك إلى أسفل فيزداد حجم التجويف الصدري ويقل ضغط الهواء داخله، فيتحرك الهواء من الضغط المرتفع (الخارج) إلى المنخفض فيدخل (<b>شهيق</b>)، وينبسط فيرتفع فيقل الحجم ويزداد الضغط فيخرج الهواء (<b>زفير</b>) — بطريقة مشابهة للضغط على قارورة بلاستيكية. وعند ارتفاع CO₂ في الدم يزيد الدماغ سرعة التنفس تلقائيًّا.'; },
      draw: function (x, s, t) {
        sky(x);
        if (s.co2) s.tgt = .5 - .5 * Math.cos((t - s.auto) / 260);
        s.d += (s.tgt - s.d) * .06;
        var X = 230;
        lungImg(x, X, 62, 540, s.d);
        if (s.d > .5) T(x, '⬇ الحجاب الحاجز ينقبض ويتحرك إلى أسفل', 300, 462, 15, '#9F1239'); else T(x, '⬆ الحجاب الحاجز منبسط (إلى أعلى)', 300, 462, 15, '#9F1239');
        var dv = s.tgt - s.d;
        if (Math.abs(dv) > .02) { if (dv > 0) arrow6(x, X, 2, X, 52, '#16A34A', 6); else arrow6(x, X, 52, X, 2, '#DC2626', 6); pill(x, dv > 0 ? 'شهيق: يدخل الهواء' : 'زفير: يخرج الهواء', X - 120, 30, 15, dv > 0 ? '#16A34A' : '#DC2626'); }
        card6(x, 600, 60, 360, 210, '#BAE6FD');
        meter6(x, 630, 110, 300, .4 + s.d * .5, 'حجم التجويف الصدري', '#0369A1');
        meter6(x, 630, 170, 300, .8 - s.d * .5, 'ضغط الهواء داخل التجويف', '#F97316');
        T(x, 'حجم الهواء في التنفس العادي ≈ ٥٠٠ مل', 780, 245, 14, '#475569');
        if (s.co2) { card6(x, 600, 300, 360, 120, '#FDE68A'); T(x, '🧠 CO₂ مرتفع في الدم', 780, 340, 17, '#B45309'); T(x, 'الدماغ يأمر عضلات الصدر والبطن', 780, 372, 14, '#334155'); T(x, 'بزيادة معدل التنفس تلقائيًّا', 780, 398, 14, '#334155'); }
      }
    });
  };

  /* ===== مقارنة مساحة السطح (الأنبوب والكرات) ===== */
  S.lab_surface = function (c, api) {
    var CNT = [48, 50, 49];
    return lab(c, api, {
      init: function () { return { tr: 0, fill: 0, fT: 0, rows: [], q: '' }; },
      steps: [
        { say: 'املأ الأنبوب الكرتوني بالكرات الزجاجية، ثم فرّغه وعُدّ الكرات. كرّر <b>ثلاث مرات</b>.', btns: [['⚪ املأ وعُدّ', function (s) { if (!s.fill && s.tr < 3) { s.fill = 1; s.fT = s.T; s.busy = 1; } }]], ok: function (s) { return s.rows.length >= 3; } },
        { say: 'احسب مساحة سطح الكرات: المتوسط × ٨٫٠٦ سم²، وقارنها بمساحة سطح الأنبوب ١٦١٫٢٩ سم².', btns: [['🧮 احسب', function (s) { s.calc = 1; }]], ok: function (s) { return s.calc; } },
        { say: 'إذا مثّل الأنبوب القصبة الهوائية، فماذا تمثل الكرات؟', bind: function (s, b) { [['الحويصلات الهوائية', 'a'], ['الأهداب', 'b'], ['خلايا الدم الحمراء', 'c']].forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'q', o[1]); }); }); }, ok: function (s) { return s.q === 'a'; } }
      ],
      end: function () { return 'متوسط الكرات ٤٩ كرة، ومساحة سطحها ≈ <b>٣٩٥ سم²</b>، أي نحو <b>مرتين ونصف</b> مساحة سطح الأنبوب، مع أنها تشغل الحيز نفسه. كذلك تجعل ملايين <b>الحويصلات الهوائية</b> (٣٠٠ مليون في كل رئة) مساحة سطح التبادل كبيرة جدًّا، فيتم تبادل الأكسجين وثاني أكسيد الكربون بفاعلية. (أعداد الكرات في المحاكاة نموذجية.)'; },
      draw: function (x, s, t) {
        sky(x);
        x.fillStyle = '#D6B48A'; rr(x, 120, 60, 170, 340, 14); x.fill(); x.fillStyle = '#C49A6C'; x.fillRect(120, 60, 20, 340); T(x, 'الأنبوب (القصبة)', 205, 430, 15, '#7C2D12');
        if (s.fill) { var e = Math.min(1, (t - s.fT) / 2600), k = Math.floor(e * CNT[s.tr]); for (var i = 0; i < k; i++) { var col = i % 5, row = Math.floor(i / 5); x.fillStyle = rg(x, 150 + col * 28 - 4, 385 - row * 30 - 4, 2, 14, [[0, '#E0F2FE'], [1, '#38BDF8']]); x.beginPath(); x.arc(150 + col * 28 + (row % 2) * 6, 385 - row * 30, 13, 0, 7); x.fill(); } pill(x, 'العدد: ' + n(k), 205, 40, 16, '#0369A1'); if (e >= 1 && s.busy) { s.busy = 0; s.fill = 0; s.rows.push(['المحاولة ' + n(s.tr + 1), CNT[s.tr]]); s.tr++; } }
        ctable(x, 380, 60, [160, 120], ['المحاولة', 'عدد الكرات'], s.rows.length ? s.rows : [['—', '—']], { rh: 32, hc: '#0369A1', ds: 15, hs: 14 });
        if (s.rows.length >= 3) T(x, 'المتوسط = ٤٩ كرة', 520, 230, 18, '#0C4A6E');
        if (s.calc) {
          var AI = im6('alv'); if (AI) { card6(x, 372, 300, 296, 160, '#BAE6FD'); x.drawImage(AI, 380, 306, 180, 607 * 180 / 807); T(x, 'الحويصلات', 620, 360, 15, '#0369A1'); T(x, 'مساحة سطح', 620, 388, 14, '#334155'); T(x, 'هائلة للتبادل', 620, 412, 14, '#334155'); }
          card6(x, 680, 60, 290, 340, '#BAE6FD'); T(x, 'مقارنة مساحة السطح', 825, 88, 17, '#0C4A6E');
          x.fillStyle = '#D6B48A'; rr(x, 720, 360 - 100, 80, 100, 6); x.fill(); x.fillStyle = '#38BDF8'; rr(x, 850, 360 - 225, 80, 225, 6); x.fill();
          T(x, '١٦١٫٢٩', 760, 250, 15, '#7C2D12'); T(x, '≈ ٣٩٥', 890, 128, 15, '#0369A1'); T(x, 'الأنبوب', 760, 385, 14, '#334155'); T(x, 'الكرات', 890, 385, 14, '#334155');
          T(x, '٤٩ × ٨٫٠٦ = ٣٩٤٫٩٤ سم²', 520, 272, 17, '#0369A1');
        }
      }
    });
  };

  /* ===== الإسعاف: عملية الدفع البطني (صورة) ===== */
  S.lab_choke = function (c, api) {
    var IX = 30, IY = 12, IW = 560, K = IW / 805;
    var Z = [['الصدر', 300], ['أعلى البطن', 455], ['أسفل البطن', 548]];
    return lab(c, api, {
      init: function () { return { zone: -1, n: 0, pT: 0, out: 0, q: '' }; },
      steps: [
        { say: 'المصاب لا يستطيع التنفس لأن قطعة طعام سدّت القصبة الهوائية. المسعف يقف خلفه؛ انقر على <b>الموضع الصحيح</b> لقبضة اليد.', ok: function (s) { return s.zone === 1; } },
        { say: 'اضغط بقبضتك بحركة <b>حادة وقوية إلى أعلى</b> نحو الأضلاع، وكرّر عند الضرورة.', btns: [['⬆ دفعة قوية إلى أعلى', function (s) { if (s.zone === 1 && !s.out && s.T - s.pT > 700) { s.n++; s.pT = s.T; if (s.n >= 3) s.out = s.T; } }]], ok: function (s) { return s.out && s.T - s.out > 1500; } },
        { say: 'لماذا تُخرج الدفعة قطعة الطعام؟', bind: function (s, b) { [['تدفع الحجاب الحاجز إلى أعلى فيقل حجم التجويف ويندفع الهواء بقوة', 'a'], ['تُدخل هواءً جديدًا إلى الرئتين', 'b'], ['تهضم الطعام', 'c']].forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'q', o[1]); }); }); }, ok: function (s) { return s.q === 'a'; } }
      ],
      end: function () { return 'في <b>الدفع البطني</b> توضع قبضة اليد تحت الأضلاع وفوق السرة، والدفع إلى أعلى يرفع الحجاب الحاجز بقوة فيقل حجم التجويف الصدري ويندفع الهواء عبر القصبة الهوائية فيُخرج قطعة الطعام، فيعود المصاب إلى التنفس. ⚠ لا تُستعمل إلا في الحالات الطارئة، ولا تتدرب عليها بقوة على زميلك.'; },
      draw: function (x, s, t) {
        sky(x);
        function zy(i) { return IY + Z[i][1] * K; } var zx = IX + 470 * K;
        if (s.click && s.step === 0) Z.forEach(function (z, i) { if (Math.abs(s.click[1] - zy(i)) < 26 && Math.abs(s.click[0] - zx) < 80) s.zone = i; });
        var jolt = s.T - s.pT < 250 ? -7 : 0, I = im6('heim');
        card6(x, IX - 6, IY - 6, IW + 12, 615 * K + 12, '#BBF7D0');
        if (I) x.drawImage(I, IX, IY + jolt, IW, 615 * K);
        if (!s.out) { x.fillStyle = '#B45309'; x.strokeStyle = '#fff'; x.lineWidth = 2; x.beginPath(); x.arc(IX + 468 * K, IY + 268 * K + jolt, 8, 0, 7); x.fill(); x.stroke(); pill(x, 'انسداد!', IX + 468 * K - 70, IY + 268 * K, 13, '#DC2626'); }
        else { var e = Math.min(1, (t - s.out) / 900); x.fillStyle = '#B45309'; x.beginPath(); x.arc(IX + 510 * K + e * 120, IY + 228 * K - e * 120, 8, 0, 7); x.fill(); pill(x, 'خرجت قطعة الطعام ✓ يتنفس الآن', 300, 32, 15, '#16A34A'); }
        if (s.step === 0) Z.forEach(function (z, i) { var h = s.hover && Math.abs(s.hover[1] - zy(i)) < 26 && Math.abs(s.hover[0] - zx) < 80; x.fillStyle = h ? 'rgba(249,115,22,.25)' : 'rgba(255,255,255,.35)'; x.strokeStyle = h ? '#F97316' : '#0C4A6E'; x.setLineDash([6, 5]); x.lineWidth = 3; rr(x, zx - 78, zy(i) - 24, 156, 48, 12); x.fill(); x.stroke(); x.setLineDash([]); pill(x, z[0], zx, zy(i) + 5, 13, '#0C4A6E'); });
        if (s.zone >= 0 && s.zone !== 1) pill(x, 'ليس هذا الموضع', zx, zy(s.zone) + 40, 14, '#DC2626');
        if (s.zone === 1 && s.step > 0) { x.strokeStyle = '#16A34A'; x.lineWidth = 4; x.beginPath(); x.arc(IX + 460 * K, IY + 455 * K + jolt, 34, 0, 7); x.stroke(); }
        if (s.T - s.pT < 300 && s.n) arrow6(x, zx + 90, zy(1), zx + 90, zy(1) - 90, '#F97316', 7);
        card6(x, 620, 110, 350, 250, '#BAE6FD'); T(x, 'الدفعات: ' + n(s.n), 795, 158, 22, '#0369A1');
        T(x, 'أ. قف خلف المصاب ولف ذراعيك حول أعلى بطنه', 795, 205, 14, '#334155'); T(x, 'القبضة تحت الأضلاع وفوق السرة', 795, 235, 14, '#334155'); T(x, 'ب. اضغط بقوة إلى أعلى نحو الأضلاع', 795, 265, 14, '#334155'); T(x, '⚠ للحالات الطارئة فقط', 795, 315, 15, '#DC2626');
      }
    });
  };

  /* ===== النفرون: الترشيح في الكلية (صورة) ===== */
  S.lab_kidney = function (c, api) {
    var P = []; for (var i = 0; i < 36; i++) P.push({ k: ['rbc', 'pro', 'w', 'w', 'w', 'sug', 'salt', 'urea', 'w'][i % 9], i: i });
    var INFO = { rbc: ['خلايا الدم', '#DC2626', 9], pro: ['بروتينات', '#7C3AED', 8], w: ['ماء', '#0EA5E9', 5], sug: ['سكر', '#FACC15', 6], salt: ['أملاح', '#F8FAFC', 5], urea: ['فضلات', '#92400E', 6] };
    var NX = 15, NY = 3, NW = 590, K = NW / 807;
    function M(a, b) { return [NX + a * K, NY + b * K]; }
    function L2(p, q, e) { return [p[0] + (q[0] - p[0]) * e, p[1] + (q[1] - p[1]) * e]; }
    return lab(c, api, {
      init: function () { return { ph: 0, pT: 0, drink: '', tried: {}, q: '' }; },
      steps: [
        { say: 'أدخل الدم من <b>الشريان الكلوي</b> إلى الشعيرات الدموية في التركيب الكأسي.', btns: [['🩸 أدخل الدم', function (s) { if (!s.ph) { s.ph = 1; s.pT = s.T; } }]], ok: function (s) { return s.ph === 1 && s.T - s.pT > 1500; } },
        { say: '<b>الترشيح الأول:</b> ماذا يغادر الدم إلى التركيب الكأسي؟ وماذا يبقى؟', btns: [['⬇ الترشيح الأول', function (s) { if (s.ph === 1) { s.ph = 2; s.pT = s.T; } }]], ok: function (s) { return s.ph === 2 && s.T - s.pT > 2500; } },
        { say: '<b>الترشيح الثاني:</b> تعيد الشعيرات المحيطة بالأنيبيبات امتصاص المواد المفيدة.', btns: [['↩ إعادة الامتصاص', function (s) { if (s.ph === 2) { s.ph = 3; s.pT = s.T; } }]], ok: function (s) { return s.ph === 3 && s.T - s.pT > 2500; } },
        { say: 'جرّب الحالتين: <b>شرب ماء كثير</b> ثم <b>قلة الشرب</b>. كيف تتغير كمية البول؟ (منطقة تحت المهاد)', bind: function (s, b) { [['🥤 شرب ماء كثير', 'hi'], ['🏜 قلة الشرب', 'lo']].forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'drink', o[1]); s.tried[o[1]] = 1; }); }); }, ok: function (s) { return s.tried.hi && s.tried.lo; } },
        { say: 'أيّ المواد لا يُعاد امتصاصها بعد مرورها في الكلية؟', bind: function (s, b) { [['الأملاح', 'a'], ['الفضلات', 'b'], ['السكر', 'c'], ['الماء', 'd']].forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'q', o[1]); }); }); }, ok: function (s) { return s.q === 'b'; } }
      ],
      end: function () { return 'في <b>الترشيح الأول</b> يغادر الماء والسكر والأملاح والفضلات الدم إلى التركيب الكأسي، وتبقى خلايا الدم والبروتينات. وفي <b>الترشيح الثاني</b> يعاد معظم الماء والسكر والأملاح إلى الدم، وتبقى <b>الفضلات</b> مع الماء الزائد بولًا يتجه إلى الأنبوب الجامع ثم الحالب فالمثانة. وعند كثرة الماء في الدم تفرز منطقة تحت المهاد قليلًا من الهرمون فيقل الماء المعاد امتصاصه وتزيد كمية البول.'; },
      draw: function (x, s, t) {
        sky(x);
        var I = im6('neph'); if (I) x.drawImage(I, NX, NY, NW, 635 * K);
        var A = M(95, 100), G = M(195, 178), V = M(700, 192), U = M(415, 560), D = M(625, 615), e = Math.min(1, (t - s.pT) / 2200);
        P.forEach(function (p, j) {
          var I2 = INFO[p.k], X, filt = p.k !== 'rbc' && p.k !== 'pro', back = p.k === 'sug' || (p.k === 'salt' && j % 2) || (p.k === 'w' && j % 5);
          var a0 = [A[0] + (j % 6) * 6 - 15, A[1] + Math.floor(j / 6) * 6 - 15], g = [G[0] + Math.cos(j) * 16, G[1] + Math.sin(j * 1.7) * 16], ring = [G[0] + Math.cos(j * 2.3) * 40, G[1] + Math.sin(j * 2.3) * 40], v = [V[0] - (j % 6) * 9, V[1] + 20 + (j % 3) * 8], R = M(330 + (j * 37) % 230, 330 + (j * 23) % 170);
          if (!s.ph) X = a0;
          else if (s.ph === 1) X = L2(a0, g, e);
          else if (s.ph === 2) X = filt ? L2(g, ring, e) : L2(g, v, e);
          else if (!filt) X = v;
          else if (back) X = e < .5 ? L2(ring, R, e * 2) : L2(R, v, (e - .5) * 2);
          else X = e < .5 ? L2(ring, U, e * 2) : L2(U, [D[0] + (j % 3) * 5, D[1] - (j % 4) * 6], (e - .5) * 2);
          x.fillStyle = I2[1]; x.strokeStyle = '#1E293B'; x.lineWidth = 1.2; x.beginPath(); x.arc(X[0], X[1], I2[2], 0, 7); x.fill(); x.stroke();
        });
        if (s.ph === 2 && e >= 1) pill(x, 'بقيت خلايا الدم والبروتينات في الدم ← الوريد', 300, 455, 14, '#7C3AED');
        if (s.ph === 3 && e >= 1) pill(x, 'عاد معظم الماء والسكر والأملاح إلى الدم · الفضلات ← الأنبوب الجامع', 310, 455, 13, '#2563EB');
        card6(x, 640, 15, 340, 205, '#BAE6FD'); var ky = 48; Object.keys(INFO).forEach(function (k, ii) { var I3 = INFO[k], cx = ii < 3 ? 950 : 790, cy = 55 + (ii % 3) * 52; x.fillStyle = I3[1]; x.strokeStyle = '#1E293B'; x.beginPath(); x.arc(cx, cy, I3[2] + 2, 0, 7); x.fill(); x.stroke(); T(x, I3[0], cx - 18, cy + 5, 16, '#334155', 'right'); });
        card6(x, 640, 232, 340, 228, '#FDE68A');
        var U2 = im6('urin'), uw = 190, uk = uw / 805; if (U2) x.drawImage(U2, 650, 245, uw, 607 * uk);
        if (s.ph === 3 && e >= 1 || s.drink) { var vol = s.drink === 'lo' ? .45 : (s.drink === 'hi' ? 1.25 : .8); x.fillStyle = 'rgba(250,204,21,.6)'; x.beginPath(); x.ellipse(650 + 400 * uk, 245 + 475 * uk, 26 * vol, 20 * vol, 0, 0, 7); x.fill(); }
        if (s.drink) T(x, '🧠 تحت المهاد', 910, 300, 15, '#B45309'); else { T(x, 'مسار البول:', 910, 300, 15, '#B45309'); T(x, 'الكلية ← الحالب', 900, 335, 13, '#334155'); T(x, '← المثانة ← الإحليل', 900, 365, 13, '#334155'); }
        if (s.drink) { T(x, s.drink === 'hi' ? 'ماء كثير في الدم' : 'ماء قليل في الدم', 910, 335, 14, '#334155'); T(x, s.drink === 'hi' ? 'هرمون قليل' : 'هرمون أكثر', 910, 365, 14, '#334155'); T(x, s.drink === 'hi' ? '← بول كثير' : '← بول قليل', 910, 400, 17, '#B45309'); }
      }
    });
  };

  /* ===== اتزان الماء في الجسم ===== */
  S.lab_water = function (c, api) {
    return lab(c, api, {
      init: function () { return { hot: 0, cups: 0, view: 0, q: '' }; },
      steps: [
        { say: 'اعرض يومًا عاديًّا: قارن الماء <b>المكتسب</b> بالماء <b>المفقود</b> (الجدولان أ وب).', btns: [['📊 اعرض اليوم', function (s) { s.view = 1; }]], ok: function (s) { return s.view; } },
        { say: 'شخص يعمل في <b>درجة حرارة عالية جدًّا</b> فيتعرق كثيرًا. ماذا يحدث للميزان؟', btns: [['☀ العمل في الحر', function (s) { if (s.view) s.hot = 1; }]], ok: function (s) { return s.hot; } },
        { say: 'شعر الشخص بالعطش. أعِد الاتزان بشرب أكواب الماء (٢٥٠ مل لكل كوب).', btns: [['🥛 اشرب كوبًا', function (s) { if (s.hot && s.cups < 6) s.cups++; }]], ok: function (s) { return s.cups === 4; } },
        { say: 'في هذه الحالة، أيّ الأعضاء يسهم على نحو أكبر في فقد الماء؟', bind: function (s, b) { [['الجلد', 'a'], ['الرئتان', 'b'], ['الأمعاء', 'c']].forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'q', o[1]); }); }); }, ok: function (s) { return s.q === 'a'; } }
      ],
      end: function () { return 'في اليوم العادي يكتسب الجسم ٢٥٠٠ مل (السوائل ٦٠٪ المصدر الرئيس) ويفقد ٢٥٠٠ مل (البول ٦٠٪ المصدر الرئيس). وعند العمل في الحر يزداد الفقد بالتعرق عن طريق <b>الجلد</b>، فيرسل الجسم رسالة إلى الدماغ فتشعر بالعطش، وتشرب فيعود <b>الاتزان الداخلي</b>. (مقدار العرق الإضافي في المحاكاة توضيحي.)'; },
      draw: function (x, s, t) {
        sky(x);
        var G = [['أكسدة الغذاء', 250, '#A855F7'], ['الطعام', 750, '#F97316'], ['السوائل', 1500 + s.cups * 250, '#0EA5E9']], L = [['البول', 1500, '#EAB308'], ['الجلد', 500 + (s.hot ? 1000 : 0), '#EF4444'], ['الرئتان', 350, '#64748B'], ['البراز', 150, '#92400E']];
        var g = G.reduce(function (a, b) { return a + b[1]; }, 0), l = L.reduce(function (a, b) { return a + b[1]; }, 0), tilt = s.view ? Math.max(-.25, Math.min(.25, (g - l) / 4000)) : 0;
        x.save(); x.translate(500, 150); x.rotate(tilt); x.fillStyle = '#475569'; rr(x, -320, -8, 640, 16, 8); x.fill();
        function pan(X, items, lbl, col) { x.strokeStyle = '#94A3B8'; x.lineWidth = 2; x.beginPath(); x.moveTo(X, 0); x.lineTo(X - 90, 80); x.moveTo(X, 0); x.lineTo(X + 90, 80); x.stroke(); var y = 80; items.forEach(function (it) { var h = it[1] / 25; x.fillStyle = it[2]; x.fillRect(X - 80, y - h, 160, h); if (h > 16) T(x, it[0] + ' ' + n(it[1]), X, y - h / 2 + 5, 12, '#fff'); y -= h; }); x.fillStyle = '#334155'; rr(x, X - 100, 80, 200, 12, 6); x.fill(); T(x, lbl, X, 115, 16, col); }
        if (s.view) { pan(220, G, 'المكتسب: ' + n(g) + ' مل', '#0369A1'); pan(-220, L, 'المفقود: ' + n(l) + ' مل', '#B91C1C'); }
        x.restore();
        x.fillStyle = '#334155'; x.beginPath(); x.moveTo(500, 150); x.lineTo(470, 440); x.lineTo(530, 440); x.fill();
        if (s.view) pill(x, Math.abs(g - l) < 1 ? 'متزن ✓' : (l > g ? 'الفقد أكبر من الاكتساب!' : 'الاكتساب أكبر'), 500, 30, 17, Math.abs(g - l) < 1 ? '#16A34A' : '#DC2626');
        if (s.hot && g < l) { pill(x, '🧠 عطش!', 860, 420, 18, '#B45309'); }
        if (s.hot) T(x, '☀ تعرّق إضافي', 160, 440, 16, '#DC2626');
        for (var i = 0; i < s.cups; i++) { x.fillStyle = '#7DD3FC'; rr(x, 640 + i * 40, 400, 30, 40, 4); x.fill(); }
      }
    });
  };

  /* ===== الاستقصاء: حجم الجسيمات والامتصاص ===== */
  S.lab_sugar = function (c, api) {
    var TM = [180, 60, 25], NM = ['مكعب السكر', 'حبيبات السكر', 'السكر المطحون'];
    return lab(c, api, {
      init: function () { return { grind: 0, weigh: 0, water: 0, go: 0, gT: 0, done: [0, 0, 0], q: '' }; },
      steps: [
        { say: 'ضع مكعب سكر في الهاون واطحنه بالمدق حتى يصبح مسحوقًا (انقر ٥ مرات).', btns: [['🔨 اطحن', function (s) { if (s.grind < 5) s.grind++; }]], ok: function (s) { return s.grind >= 5; } },
        { say: 'قِس بالميزان كتلًا <b>متساوية</b> من المسحوق ومكعب السكر وحبيبات السكر، وضع ماءً دافئًا متساوي الحرارة في الكؤوس الثلاث.', btns: [['⚖ قِس الكتل', function (s) { s.weigh = 1; }], ['🌡 الماء الدافئ', function (s) { if (s.weigh) s.water = 1; }]], ok: function (s) { return s.water; } },
        { say: 'ضع العينات الثلاث في الوقت نفسه، وشغّل ساعة الإيقاف، وحرّكها بالتساوي.', btns: [['⏱ ابدأ', function (s) { if (!s.go) { s.go = 1; s.gT = s.T; } }]], ok: function (s) { return s.done[0]; } },
        { say: 'أيّ أشكال السكر ذاب أسرع؟', bind: function (s, b) { [['المكعب', 'a'], ['الحبيبات', 'b'], ['المطحون', 'c']].forEach(function (o) { addBtn(b, o[0], o[1], function () { pick(b, s, 'q', o[1]); }); }); }, ok: function (s) { return s.q === 'c'; } }
      ],
      end: function () { return 'ذاب <b>المطحون</b> أسرع، ثم الحبيبات، وكان <b>المكعب</b> أبطأ؛ لأن الجسيمات الصغيرة مجموع مساحة سطحها المعرّض للماء أكبر. لذا يجب أن تمضغ طعامك جيدًا: فتصغير الجسيمات يزيد سطحها المعرّض للإنزيمات والعصارات فيُهضم ويُمتص أسرع. (الأزمنة في المحاكاة نموذجية ومسرّعة؛ سجّل أزمنتك الحقيقية.)'; },
      draw: function (x, s, t) {
        bench(x, 470);
        // الهاون
        x.fillStyle = '#D6B48A'; x.beginPath(); x.moveTo(60, 300); x.lineTo(180, 300); x.lineTo(160, 370); x.lineTo(80, 370); x.fill(); x.fillStyle = '#B08968'; x.save(); x.translate(130, 260 + (s.grind % 2) * 15); x.rotate(.4); rr(x, -10, -70, 20, 90, 8); x.fill(); x.restore();
        if (s.grind < 5) sugarCube(x, 120, 300, 30 - s.grind * 5); else grains(x, 120, 300, 60, 40, '#fff', 4);
        T(x, 'هاون ومدق', 120, 395, 13, '#334155');
        if (s.weigh) { x.fillStyle = '#334155'; rr(x, 30, 410, 180, 40, 8); x.fill(); T(x, 'الكتل متساوية تقريبًا ✓', 120, 436, 13, '#A7F3D0'); }
        var el = s.go ? (t - s.gT) / 1000 * 30 : 0;
        for (var i = 0; i < 3; i++) {
          var X = 360 + i * 210, left = s.go ? Math.max(0, 1 - el / TM[i]) : 1;
          beaker(x, X, 400, 130, 170, s.water ? .7 : 0, '#BAE6FD', {});
          if (s.go && left > 0) { if (i === 0) sugarCube(x, X, 395, 40 * left + 6); else grains(x, X, 395, 80, Math.round(50 * left) + 2, '#fff', i + 7); }
          if (s.water) thermo(x, X + 75, 380, 140, 40, 100, '');
          T(x, NM[i], X, 440, 14, '#334155');
          if (s.go && left <= 0 && !s.done[i]) s.done[i] = TM[i];
          if (s.done[i]) pill(x, 'ذاب بعد ' + n(s.done[i]) + ' ث', X, 200, 14, '#0369A1');
        }
        if (s.go) { card6(x, 800, 20, 180, 60, '#BAE6FD'); T(x, '⏱ ' + n(Math.min(Math.round(el), 999)) + ' ث', 890, 60, 22, '#0369A1'); }
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
