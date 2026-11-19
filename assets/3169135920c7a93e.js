/* تجارب الفصل الثاني (علوم ثاني متوسط): المخاليط والمحاليل — مختبر المحاليل */
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
  function thermo(x, X, Y, h, tC, max) {
    x.fillStyle = '#fff'; rr(x, X - 9, Y - h, 18, h, 9); x.fill(); x.strokeStyle = '#64748B'; x.lineWidth = 2; rr(x, X - 9, Y - h, 18, h, 9); x.stroke();
    var f = Math.max(0, Math.min(1, tC / (max || 100))); x.fillStyle = '#DC2626'; x.fillRect(X - 3, Y - 14 - (h - 26) * f, 6, (h - 26) * f + 4); x.beginPath(); x.arc(X, Y - 8, 11, 0, 7); x.fill();
    pill(x, n(Math.round(tC)) + '°س', X, Y - h - 16, 16, '#B91C1C');
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

  /* ===== التجربة الاستهلالية: حجم الجسيمات ومعدل الذوبان (حساء الدجاج) ===== */
  S.lab_soup = function (c, api) {
    var AX = 330, BX = 610, BY = 380, BW = 170, BH = 230, CAP = .9;
    function soupCol(f) { return mix('#D4EAF7', '#A5621E', Math.min(1, f) * .92); }
    function dA(s) { return s.stirT ? 1 - Math.exp(-Math.min(10000, s.T - s.stirT) / 2300) * (s.inA ? 1 : 0) : (s.inA ? .06 : 0); }
    function dB(s) { return s.stirT ? .03 + .2 * Math.min(1, (s.T - s.stirT) / 10000) : (s.inB ? .02 : 0); }
    return lab(c, api, {
      init: function () { return { w: 0, wT: 0, g: 0, gT: -9999, inA: 0, inB: 0, aT: 0, bT: 0, stirT: 0, fin: 0 }; },
      steps: [
        { say: 'اسكب 400 مل من الماء في كل من الكأسين (سعة كل منهما 600 مل).', btns: [['🚰 اسكب الماء', function (s) { s.w = 1; s.wT = s.T; }]], ok: function (s) { return s.w && s.T - s.wT > 1500; } },
        { say: 'اطحن أحد مكعبي الحساء بالهاون حتى يصير مسحوقًا: اضغط على الهاون (٤ ضربات).', ok: function (s) { return s.g >= 4; } },
        { say: 'ضع المسحوق في الكأس (أ)، والمكعب الكامل في الكأس (ب).', btns: [['🥄 المسحوق ← الكأس أ', function (s) { if (!s.inA) { s.inA = 1; s.aT = s.T; } }], ['🧊 المكعب ← الكأس ب', function (s) { if (!s.inB) { s.inB = 1; s.bT = s.T; } }]], ok: function (s) { return s.inA && s.inB && s.T - Math.max(s.aT, s.bT) > 900; } },
        { say: 'حرّك الماء في الكأسين مدة ١٠ ثوانٍ، ولاحظ لون السائل والكمية غير الذائبة.', btns: [['🥢 حرّك (١٠ ثوانٍ)', function (s) { if (!s.stirT) s.stirT = s.T; }]], ok: function (s) { return s.stirT && s.T - s.stirT > 10300; } }
      ],
      end: function () { return 'لون الكأس (أ) <b>أغمق</b> ولم يبقَ فيها إلا القليل من المسحوق، أما الكأس (ب) فلونها <b>فاتح</b> وبقي معظم المكعب في القعر. <b>الاستنتاج:</b> كلما صغر حجم الحبيبات زادت مساحة السطح المعرّضة للماء، فزاد <b>معدل الذوبان</b>.'; },
      draw: function (x, s, t) {
        bench(x);
        var lvl = s.w ? CAP * (400 / 600) * Math.min(1, (t - s.wT) / 1400) : 0;
        var fa = dA(s), fb = dB(s);
        var marks = [[CAP * 200 / 600, '200'], [CAP * 400 / 600, '400'], [CAP, '600 مل']];
        var la = beaker(x, AX, BY, BW, BH, lvl, soupCol(fa), { marks: marks, label: 'الكأس (أ): مسحوق' });
        var lb = beaker(x, BX, BY, BW, BH, lvl, soupCol(fb * 1.15), { marks: marks, label: 'الكأس (ب): مكعب' });
        if (s.w && t - s.wT < 1400) { x.fillStyle = 'rgba(147,197,253,.8)'; x.fillRect(AX - 4, 40, 8, la - 40); x.fillRect(BX - 4, 40, 8, lb - 40); }
        // القعر: المسحوق غير الذائب والمكعب
        if (s.inA) { var fall = Math.min(1, (t - s.aT) / 700); if (fall < 1) { grains(x, AX, 80 + (BY - 100) * fall, 60, 60, '#B9783A', 4); } else { var left = 1 - fa; if (left > .01) { x.fillStyle = '#B9783A'; x.beginPath(); x.ellipse(AX, BY - 7, 52 * Math.sqrt(left), 7 * Math.sqrt(left) + 1, 0, 0, 7); x.fill(); grains(x, AX, BY - 6, 100 * Math.sqrt(left), Math.round(80 * left), '#8B5A2B', 5); } } }
        if (s.inB) { var fb2 = Math.min(1, (t - s.bT) / 700), sz = 46 * Math.cbrt(1 - fb), cy = fb2 < 1 ? 80 + (BY - 84) * fb2 : BY - 4; x.fillStyle = '#C98A3E'; x.fillRect(BX - sz / 2, cy - sz, sz, sz); x.fillStyle = '#DDA35A'; x.fillRect(BX - sz / 2, cy - sz, sz, 6); x.strokeStyle = '#7C4A1A'; x.lineWidth = 1.5; x.strokeRect(BX - sz / 2, cy - sz, sz, sz); if (s.stirT) { x.fillStyle = 'rgba(165,98,30,.35)'; x.beginPath(); x.ellipse(BX, cy - sz / 2, sz * .9, sz * .7, 0, 0, 7); x.fill(); } }
        // التحريك
        if (s.stirT && t - s.stirT < 10000) { var k = Math.sin((t - s.stirT) / 160) * 40; rod(x, AX + k, 70, BY - 18); rod(x, BX - k, 70, BY - 18); var sec = Math.min(10, Math.floor((t - s.stirT) / 1000)); pill(x, '⏱ التحريك: ' + n(sec) + ' / ١٠ ثوانٍ', 470, 40, 20, '#0E7490'); }
        // الهاون والمكعب الثاني
        var MX = 860, MY = 380;
        if (s.g < 4 || !s.inA) {
          shadow(x, MX, MY + 4, 80, 10, .25);
          x.fillStyle = lg(x, MX - 80, 0, MX + 80, 0, [[0, '#9CA3AF'], [.5, '#E5E7EB'], [1, '#6B7280']]); x.beginPath(); x.moveTo(MX - 80, MY - 70); x.quadraticCurveTo(MX - 76, MY, MX, MY); x.quadraticCurveTo(MX + 76, MY, MX + 80, MY - 70); x.closePath(); x.fill(); x.fillStyle = '#4B5563'; x.beginPath(); x.ellipse(MX, MY - 70, 80, 14, 0, 0, 7); x.fill();
          if (!s.inA) { if (s.g === 0) { x.fillStyle = '#C98A3E'; x.fillRect(MX - 20, MY - 98, 40, 34); x.strokeStyle = '#7C4A1A'; x.strokeRect(MX - 20, MY - 98, 40, 34); } else if (s.g < 4) { for (var q = 0; q < s.g * 3; q++) { var ss = 26 / s.g; x.fillStyle = '#C98A3E'; x.fillRect(MX - 40 + (q * 23) % 70, MY - 78 - (q % 2) * 8, ss, ss * .8); } } else { x.fillStyle = '#C98A3E'; x.beginPath(); x.ellipse(MX, MY - 72, 46, 10, 0, 0, 7); x.fill(); grains(x, MX, MY - 70, 90, 70, '#8B5A2B', 9); } }
          var hit = t - s.gT < 260 ? 1 - (t - s.gT) / 260 : 0; x.save(); x.translate(MX + 30, MY - 150 + hit * 40); x.rotate(-.35); x.fillStyle = lg(x, -12, 0, 12, 0, [[0, '#6B7280'], [.5, '#F3F4F6'], [1, '#6B7280']]); rr(x, -12, -60, 24, 120, 12); x.fill(); x.restore();
          T(x, 'الهاون', MX, MY + 34, 16, '#334155');
          if (s.step === 1) { var hv = s.hover && Math.abs(s.hover[0] - MX) < 100 && s.hover[1] > MY - 200; if (hv) { x.strokeStyle = '#FACC15'; x.lineWidth = 3; x.beginPath(); x.ellipse(MX, MY - 70, 92, 24, 0, 0, 7); x.stroke(); } if (s.click && Math.abs(s.click[0] - MX) < 100 && s.click[1] > MY - 220) { s.g++; s.gT = t; } pill(x, 'اضغط على الهاون: ' + n(s.g) + ' / ٤', MX, 60, 18, '#9A3412'); }
        }
        if (!s.inB) { x.fillStyle = '#fff'; x.beginPath(); x.ellipse(110, 382, 60, 12, 0, 0, 7); x.fill(); x.strokeStyle = '#CBD5E1'; x.stroke(); x.fillStyle = '#C98A3E'; x.fillRect(90, 340, 40, 36); x.fillStyle = '#DDA35A'; x.fillRect(90, 340, 40, 6); x.strokeStyle = '#7C4A1A'; x.strokeRect(90, 340, 40, 36); T(x, 'مكعب حساء', 110, 420, 15, '#334155'); }
        // عدسة القعر وجدول الملاحظات
        if (s.stirT) {
          lens(x, 110, 200, 72, function (X, Y) { x.fillStyle = soupCol(fa); x.fillRect(X - 80, Y - 80, 80, 160); x.fillStyle = soupCol(fb * 1.15); x.fillRect(X, Y - 80, 80, 160); x.fillStyle = '#B9783A'; var l2 = 1 - fa; for (var i = 0; i < 40 * l2; i++) x.fillRect(X - 70 + (i * 13) % 60, Y + 40 + (i % 4) * 5, 4, 4); var sz2 = 50 * Math.cbrt(1 - fb); x.fillStyle = '#C98A3E'; x.fillRect(X + 40 - sz2 / 2, Y + 60 - sz2, sz2, sz2); pill(x, 'ب', X - 40, Y - 30, 15, '#334155'); pill(x, 'أ', X + 40, Y - 30, 15, '#334155'); }, 'القعر بالعدسة');
        }
        if (s.stirT && t - s.stirT > 10000) ctable(x, 735, 30, [80, 90, 85], ['الكأس', 'لون السائل', 'غير الذائب'], [['أ (مسحوق)', 'أغمق', 'قليل جدًّا'], ['ب (مكعب)', 'أفتح', 'معظمه']], { rh: 34, hc: '#0E7490', ds: 15 });
      }
    });
  };

  /* ===== معدل الذوبان: التحريك والتسخين والسحق (اختبار عادل) ===== */
  S.lab_rate = function (c, api) {
    // أزمنة الذوبان في المحاكاة (ثوانٍ) توضيحية للمقارنة فقط
    var K = [{ n: '١ المرجع', d: 'مكعب · ماء ٢٠°س · دون تحريك', tm: 16 }, { n: '٢ التحريك', d: 'مكعب · ماء ٢٠°س · تحريك', tm: 7 }, { n: '٣ التسخين', d: 'مكعب · ماء ٦٠°س · دون تحريك', tm: 6 }, { n: '٤ السحق', d: 'سكر مسحوق · ماء ٢٠°س · دون تحريك', tm: 4 }];
    var XS = [830, 610, 390, 170];
    return lab(c, api, {
      init: function () { return { cubes: 0, f: [0, 0, 0, 0], go: 0, goT: 0, done: [0, 0, 0, 0] }; },
      steps: [
        { say: 'ضع في كل كأس 200 مل ماء ومكعب سكر له الكتلة نفسها (الكأس ١ هي المرجع لا نغيّر فيها شيئًا).', btns: [['🧊 ضع المكعبات', function (s) { s.cubes = 1; }]], ok: function (s) { return s.cubes; } },
        { say: 'غيّر عاملًا واحدًا فقط في كل كأس: حرّك الكأس ٢، وسخّن الكأس ٣، واسحق مكعب الكأس ٤.', btns: [['🥢 حرّك الكأس ٢', function (s) { s.f[1] = 1; }], ['🔥 سخّن الكأس ٣', function (s) { s.f[2] = 1; }], ['🔨 اسحق مكعب الكأس ٤', function (s) { s.f[3] = 1; }]], ok: function (s) { return s.f[1] && s.f[2] && s.f[3]; } },
        { say: 'ابدأ التوقيت في الكؤوس الأربع معًا، وسجّل زمن ذوبان السكر كاملًا في كل كأس.', btns: [['⏱ ابدأ', function (s) { if (!s.go) { s.go = 1; s.goT = s.T; } }]], ok: function (s) { return s.done.every(function (d) { return d; }); } }
      ],
      end: function () { return 'ذاب السكر أسرع في الكؤوس التي غيّرنا فيها عاملًا مقارنةً بالمرجع: <b>التحريك</b> و<b>زيادة درجة الحرارة</b> و<b>سحق المذاب</b> تزيد معدل الذوبان؛ لأنها تزيد تلامس جسيمات المذاب مع المذيب. (الأزمنة في المحاكاة للمقارنة فقط.) لاحظ أن هذه العوامل تغيّر <b>سرعة</b> الذوبان، لا <b>الذائبية</b>.'; },
      draw: function (x, s, t) {
        bench(x);
        var el = s.go ? (t - s.goT) / 1000 : 0;
        K.forEach(function (k, i) {
          var X = XS[i], prog = s.go ? Math.min(1, el / k.tm) : 0; if (prog >= 1 && !s.done[i]) s.done[i] = +(k.tm).toFixed(0);
          if (i === 2 && s.f[2]) hotplate(x, X, 386, 1);
          var ly = beaker(x, X, 380, 150, 190, .62, mix('#D4EAF7', '#EEF6FB', prog), { label: k.n, lc: i ? '#0E7490' : '#475569' });
          T(x, k.d, X, 448, 13, '#E2E8F0', 'center', 600);
          if (s.cubes) {
            var left = 1 - prog;
            if (i === 3 && s.f[3]) { if (left > .01) { x.fillStyle = '#fff'; x.beginPath(); x.ellipse(X, 374, 40 * Math.sqrt(left), 6 * Math.sqrt(left) + 1, 0, 0, 7); x.fill(); grains(x, X, 376, 70 * Math.sqrt(left), Math.round(50 * left), '#CBD5E1', i + 2); } }
            else if (left > .01) { var sz = 40 * Math.cbrt(left); sugarCube(x, X, 377, sz); if (s.go) { x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.ellipse(X, 377 - sz / 2, sz, sz * .8, 0, 0, 7); x.fill(); } }
          }
          if (i === 1 && s.f[1] && s.go && prog < 1) rod(x, X + Math.sin(t / 150) * 35, 140, 360);
          else if (i === 1 && s.f[1] && !s.go) rod(x, X + 20, 140, 360);
          if (i === 2 && s.f[2]) { thermo(x, X + 95, 360, 150, 60, 100); if (s.go && prog < 1) bubbles(x, X - 50, X + 50, ly + 10, 370, t, 6, 2); }
          if (s.done[i]) pill(x, '✓ ذاب: ' + n(s.done[i]) + ' ث', X, 120, 17, i ? '#15803D' : '#475569');
          else if (s.go) pill(x, n(Math.floor(el)) + ' ث', X, 120, 17, '#0E7490');
        });
        if (s.go) T(x, 'الأزمنة في المحاكاة توضيحية للمقارنة', 500, 40, 15, '#64748B');
      }
    });
  };

  /* ===== الذائبية والتشبع: سكر في 100 جم ماء (منحنى الذائبية) ===== */
  S.lab_solub = function (c, api) {
    var SOL = [[0, 179], [20, 200], [25, 204], [40, 238], [60, 287], [80, 362], [100, 487]];
    function sol(T) { for (var i = 1; i < SOL.length; i++) if (T <= SOL[i][0]) { var a = SOL[i - 1], b = SOL[i]; return a[1] + (b[1] - a[1]) * (T - a[0]) / (b[0] - a[0]); } return 487; }
    var GX = 590, GY = 60, GW = 380, GH = 300;
    function gx(T) { return GX + T / 100 * GW; }
    function gy(m) { return GY + GH - m / 500 * GH; }
    function state(s) { var cap = sol(s.temp); if (s.added - s.cryst <= cap + .5 && s.added > cap + .5 && s.cryst === 0 && s.super) return 'super'; if (s.added > cap + .5) return 'sat'; if (Math.abs(s.added - cap) < 1) return 'sat'; return 'uns'; }
    return lab(c, api, {
      init: function () { return { added: 0, temp: 25, heat: 0, cool: 0, super: 0, seed: 0, seedT: 0, cryst: 0, addT: -9999 }; },
      steps: [
        { say: 'أضف السكر إلى 100 جم من الماء عند 25°س، ملعقةً بعد ملعقة (الملعقة = 50 جم)، حتى يبقى سكر لا يذوب في القعر.', btns: [['🥄 أضف ملعقة سكر', function (s) { if (s.added < 250) { s.added += 50; s.addT = s.T; } }]], ok: function (s) { return s.added > 204 && s.T - s.addT > 900; } },
        { say: 'المحلول مشبع (بقي سكر في القعر). سخّن المحلول إلى 60°س مع التحريك.', btns: [['🔥 سخّن إلى 60°س', function (s) { s.heat = 1; }]], ok: function (s) { return s.temp >= 60; } },
        { say: 'ذاب السكر كله؛ المحلول الآن غير مشبع عند 60°س. أطفئ المسخن وبرّد المحلول <b>ببطء</b> إلى 25°س دون تحريك.', btns: [['❄ برّد ببطء', function (s) { s.heat = 0; s.cool = 1; }]], ok: function (s) { return s.temp <= 25.01 && s.cool; } },
        { say: 'المحلول الآن فوق الإشباع (فيه 250 جم مذابة والحد 204 جم). أسقط بلورة سكر صغيرة فيه.', btns: [['💎 أسقط بلورة', function (s) { if (!s.seed) { s.seed = 1; s.seedT = s.T; } }]], ok: function (s) { return s.cryst >= 45.9; } }
      ],
      end: function () { return 'عند 25°س تذوب <b>204 جم</b> سكر فقط في 100 جم ماء، فصار المحلول <b>مشبعًا</b>. بالتسخين زادت الذائبية فأصبح <b>غير مشبع</b>. وبالتبريد البطيء بقيت كمية مذابة تزيد على حد الإشباع: محلول <b>فوق الإشباع</b>، ثم ترسّب الزائد (46 جم) على البلورة بعملية فيزيائية تسمى <b>التبلور</b>.'; },
      draw: function (x, s, t) {
        bench(x);
        if (s.heat && s.temp < 60) s.temp = Math.min(60, s.temp + .35);
        if (s.cool && s.temp > 25) s.temp = Math.max(25, s.temp - .25);
        if (s.temp >= 60 && s.added === 250) s.super = 1;
        if (s.seed) s.cryst = Math.min(46, 46 * Math.min(1, (t - s.seedT) / 3000));
        var cap = sol(s.temp), dissolved = Math.min(s.added, s.super && !s.seed ? s.added : cap), und = s.added - dissolved;
        if (s.seed) { dissolved = s.added - s.cryst; und = s.cryst; }
        var st = s.added === 0 ? 'uns' : (s.super && !s.seed && s.cool && s.added > cap + 1) ? 'super' : (und > .5 || Math.abs(dissolved - cap) < 1) ? 'sat' : 'uns';
        hotplate(x, 240, 388, s.heat);
        var ly = beaker(x, 240, 380, 190, 220, .5, mix('#D4EAF7', '#F8FAFC', Math.min(1, dissolved / 300)), { marks: [[.5, '100 مل']], label: '100 جم ماء' });
        thermo(x, 380, 370, 170, s.temp, 100);
        if (und > .5) { var k = Math.sqrt(und / 50); x.fillStyle = '#fff'; x.beginPath(); x.ellipse(240, 372, 70 * k, 9 * k + 1, 0, 0, 7); x.fill(); grains(x, 240, 374, 130 * k, Math.round(60 * k), '#CBD5E1', 6); }
        if (s.seed) { var g = s.cryst / 46; for (var i = 0; i < 9; i++) { var cx = 180 + (i * 37) % 130, cy = 300 + (i * 23) % 60, z = 4 + g * 9; x.save(); x.translate(cx, cy + g * (370 - cy)); x.rotate(i); x.fillStyle = 'rgba(255,255,255,.95)'; x.strokeStyle = '#94A3B8'; x.lineWidth = 1; x.fillRect(-z / 2, -z / 2, z, z); x.strokeRect(-z / 2, -z / 2, z, z); x.restore(); } }
        if (t - s.addT < 800) grains(x, 240, 120 + (ly - 120) * (t - s.addT) / 800, 40, 50, '#fff', 8);
        if (s.heat || (s.temp > 25 && !s.cool)) rod(x, 240 + Math.sin(t / 170) * 50, 140, 362);
        // أرقام
        x.fillStyle = 'rgba(255,255,255,.92)'; rr(x, 20, 20, 240, 104, 12); x.fill();
        T(x, 'السكر المضاف: ' + n(s.added) + ' جم', 245, 50, 17, '#0F172A', 'right');
        T(x, 'الذائب: ' + n(Math.round(dissolved)) + ' جم', 245, 78, 17, '#0E7490', 'right');
        T(x, 'غير الذائب: ' + n(Math.round(und)) + ' جم', 245, 106, 17, und > .5 ? '#B91C1C' : '#64748B', 'right');
        var lab2 = { uns: ['غير مشبع', '#0E7490'], sat: ['مشبع', '#B45309'], super: ['فوق الإشباع', '#7C3AED'] }[st];
        pill(x, lab2[0], 240, 150, 22, lab2[1]);
        // منحنى الذائبية
        x.fillStyle = '#fff'; rr(x, GX - 50, GY - 30, GW + 70, GH + 80, 12); x.fill(); x.strokeStyle = '#CBD5E1'; x.lineWidth = 1.5; rr(x, GX - 50, GY - 30, GW + 70, GH + 80, 12); x.stroke();
        T(x, 'ذائبية السكر (جم / 100 جم ماء)', GX + GW / 2, GY - 8, 15, '#0E7490');
        x.strokeStyle = '#E2E8F0'; x.lineWidth = 1; for (var m = 0; m <= 500; m += 100) { x.beginPath(); x.moveTo(GX, gy(m)); x.lineTo(GX + GW, gy(m)); x.stroke(); T(x, n(m), GX - 6, gy(m) + 5, 12, '#64748B', 'right', 600); }
        for (var tt = 0; tt <= 100; tt += 20) { x.beginPath(); x.moveTo(gx(tt), GY); x.lineTo(gx(tt), GY + GH); x.stroke(); T(x, n(tt), gx(tt), GY + GH + 18, 12, '#64748B', 'center', 600); }
        T(x, 'درجة الحرارة (°س)', GX + GW / 2, GY + GH + 40, 13, '#475569');
        x.fillStyle = 'rgba(14,116,144,.07)'; x.beginPath(); x.moveTo(gx(0), gy(0)); SOL.forEach(function (p) { x.lineTo(gx(p[0]), gy(p[1])); }); x.lineTo(gx(100), gy(0)); x.closePath(); x.fill();
        x.strokeStyle = '#0E7490'; x.lineWidth = 3; x.beginPath(); SOL.forEach(function (p, i) { if (i) x.lineTo(gx(p[0]), gy(p[1])); else x.moveTo(gx(p[0]), gy(p[1])); }); x.stroke();
        T(x, 'غير مشبع', gx(65), gy(120), 15, '#0E7490'); T(x, 'فوق الإشباع', gx(35), gy(420), 15, '#7C3AED');
        x.fillStyle = lab2[1]; x.beginPath(); x.arc(gx(s.temp), gy(Math.min(500, dissolved)), 9, 0, 7); x.fill(); x.strokeStyle = '#fff'; x.lineWidth = 3; x.stroke();
        x.setLineDash([5, 5]); x.strokeStyle = '#94A3B8'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(gx(25), gy(0)); x.lineTo(gx(25), gy(204)); x.lineTo(GX, gy(204)); x.stroke(); x.setLineDash([]);
        T(x, '204 جم عند 25°س', gx(25) + 6, gy(204) - 8, 12, '#334155', 'left', 600);
      }
    });
  };

  /* ===== كيف يذيب الماء المركبات الأيونية والجزيئية؟ المِثل يذيب المِثل ===== */
  function waterMol(x, X, Y, a, sc) {   // a: اتجاه طرف الأكسجين (سالب)
    sc = sc || 1; x.save(); x.translate(X, Y); x.rotate(a);
    x.fillStyle = '#F8FAFC'; x.strokeStyle = '#94A3B8'; x.lineWidth = 1;
    [[-.95, -.7], [-.95, .7]].forEach(function (h) { x.beginPath(); x.arc(h[0] * 11 * sc, h[1] * 11 * sc, 6 * sc, 0, 7); x.fill(); x.stroke(); });
    x.fillStyle = rg(x, -2 * sc, -2 * sc, 1, 10 * sc, [[0, '#FCA5A5'], [1, '#DC2626']]); x.beginPath(); x.arc(0, 0, 9 * sc, 0, 7); x.fill();
    x.restore();
  }
  function ion(x, X, Y, plus, sc) { sc = sc || 1; var r = (plus ? 11 : 16) * sc; x.fillStyle = rg(x, X - r / 3, Y - r / 3, 1, r, plus ? [[0, '#C4B5FD'], [1, '#6D28D9']] : [[0, '#BBF7D0'], [1, '#15803D']]); x.beginPath(); x.arc(X, Y, r, 0, 7); x.fill(); T(x, plus ? '+' : '−', X, Y + 6 * sc, 17 * sc, '#fff'); }
  function sugarMol(x, X, Y, a, sc) { sc = sc || 1; x.save(); x.translate(X, Y); x.rotate(a); x.strokeStyle = '#B45309'; x.lineWidth = 3 * sc; x.fillStyle = 'rgba(253,230,138,.9)'; x.beginPath(); for (var i = 0; i < 6; i++) { var t = i / 6 * 6.283; x.lineTo(Math.cos(t) * 15 * sc, Math.sin(t) * 15 * sc); } x.closePath(); x.fill(); x.stroke(); x.beginPath(); for (var j = 0; j < 5; j++) { var t2 = j / 5 * 6.283; x.lineTo(32 * sc + Math.cos(t2) * 12 * sc, Math.sin(t2) * 12 * sc); } x.closePath(); x.fill(); x.stroke(); x.beginPath(); x.moveTo(15 * sc, 0); x.lineTo(20 * sc, 0); x.stroke(); x.restore(); }
  function oilMol(x, X, Y, a, sc) { sc = sc || 1; x.save(); x.translate(X, Y); x.rotate(a); x.strokeStyle = '#CA8A04'; x.lineWidth = 5 * sc; x.lineJoin = 'round'; x.beginPath(); for (var i = 0; i < 8; i++) x.lineTo(-28 * sc + i * 8 * sc, (i % 2 ? -5 : 5) * sc); x.stroke(); x.restore(); }
  S.lab_polar = function (c, api) {
    var ZX = 640, ZY = 235, ZR = 205;
    var LAT = []; for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) LAT.push({ gx: i, gy: j, plus: (i + j) % 2 === 0 });
    LAT.sort(function (a, b) { return (Math.abs(b.gx - 1.5) + Math.abs(b.gy - 1.5)) - (Math.abs(a.gx - 1.5) + Math.abs(a.gy - 1.5)); });
    var FREE = []; var r = rnd(11); for (var k = 0; k < 26; k++) FREE.push({ x: r() * 360 - 180, y: r() * 360 - 180, a: r() * 7, v: r() * 6 });
    function inZoom(px, py) { return Math.hypot(px, py) < ZR - 18; }
    return lab(c, api, {
      init: function () { return { salt: 0, saltT: 0, sug: 0, sugT: 0, oil: 0, oilT: 0, look: 0 }; },
      steps: [
        { say: 'أسقط بلورة ملح الطعام (كلوريد الصوديوم: مركّب أيوني) في الماء، وراقب ما يحدث بالعدسة المكبّرة.', btns: [['🧂 أسقط الملح', function (s) { if (!s.salt) { s.salt = 1; s.saltT = s.T; } }]], ok: function (s) { return s.salt && s.T - s.saltT > 9000; } },
        { say: 'أسقط مكعب سكر (مركّب جزيئي قطبي)، وقارن بالملح.', btns: [['🧊 أسقط السكر', function (s) { if (!s.sug) { s.sug = 1; s.sugT = s.T; } }]], ok: function (s) { return s.sug && s.T - s.sugT > 6500; } },
        { say: 'أضف قطرات من الزيت (مادة غير قطبية) إلى كأس ماء أخرى، وراقب.', btns: [['🫒 أضف الزيت', function (s) { if (!s.oil) { s.oil = 1; s.oilT = s.T; } }]], ok: function (s) { return s.oil && s.T - s.oilT > 4500; } }
      ],
      end: function () { return 'جزيء الماء <b>قطبي</b>: طرف الأكسجين سالب جزئيًّا يجذب أيونات الصوديوم الموجبة، وطرفا الهيدروجين موجبان جزئيًّا يجذبان أيونات الكلور السالبة، فتنفصل الأيونات وتحيط بها جزيئات الماء. أما السكر فتحيط جزيئات الماء بجزيئاته <b>دون أن تتأين</b> (روابط هيدروجينية). والزيت غير القطبي <b>لا يذوب</b> في الماء القطبي: <b>المِثل يذيب المِثل</b>.'; },
      draw: function (x, s, t) {
        bench(x);
        var mode = s.oil ? 'oil' : s.sug ? 'sug' : 'salt';
        // الكأس
        var ly = beaker(x, 170, 380, 190, 230, .7, 'rgba(186,230,253,.75)', { label: mode === 'oil' ? 'ماء + زيت' : 'ماء' });
        if (mode === 'salt' && s.salt) { var p = Math.min(1, (t - s.saltT) / 9000); if (p < 1) { x.fillStyle = '#fff'; x.save(); x.translate(170, 360); x.rotate(.4); x.fillRect(-12 * (1 - p) - 2, -12 * (1 - p) - 2, 24 * (1 - p) + 4, 24 * (1 - p) + 4); x.restore(); } }
        if (mode === 'sug') { var p2 = Math.min(1, (t - s.sugT) / 6500); if (p2 < 1) sugarCube(x, 170, 376, 34 * (1 - p2) + 4); }
        if (mode === 'oil') { var p3 = Math.min(1, (t - s.oilT) / 2500); x.fillStyle = 'rgba(234,179,8,.85)'; x.fillRect(78, ly - 30 * p3, 184, 30 * p3); for (var d = 0; d < 6 * (1 - p3); d++) { x.beginPath(); x.arc(110 + d * 25, ly + 40 + (d % 2) * 30 - p3 * 60, 8, 0, 7); x.fill(); } T(x, 'طبقة الزيت', 170, ly - 40, 15, '#92400E'); }
        x.strokeStyle = '#0E7490'; x.lineWidth = 2; x.setLineDash([6, 5]); x.beginPath(); x.moveTo(230, 300); x.lineTo(ZX - ZR + 10, ZY); x.stroke(); x.setLineDash([]);
        // العدسة: المستوى الجزيئي
        lens(x, ZX, ZY, ZR, function (X, Y) {
          x.fillStyle = mode === 'oil' ? '#F0F9FF' : '#E0F2FE'; x.fillRect(X - ZR, Y - ZR, 2 * ZR, 2 * ZR);
          var tt = t / 1000;
          if (mode === 'oil') {
            var p = Math.min(1, (t - s.oilT) / 3500); var bound = Y - ZR + 40 + 100 * 1;
            x.fillStyle = 'rgba(250,204,21,.25)'; x.fillRect(X - ZR, Y - ZR, 2 * ZR, 150 * p);
            for (var i = 0; i < 16; i++) { var ox = X - 150 + (i % 6) * 58 + Math.sin(tt + i) * 4, oy0 = Y + 60 + (i * 37) % 120, oy1 = Y - ZR + 30 + (i % 3) * 38; oilMol(x, ox, oy0 + (oy1 - oy0) * p, (i % 3 - 1) * .3 + Math.sin(tt + i) * .1, 1); }
            FREE.forEach(function (f, i) { var px = X + f.x * .9 + Math.sin(tt * 1.3 + f.v) * 6, py = Y + 40 + Math.abs(f.y) * .55 + Math.cos(tt + f.v) * 6; if (inZoom(px - X, py - Y)) waterMol(x, px, py, f.a + tt * .5, .9); });
            pill(x, 'الزيت (غير قطبي)', X, Y - ZR + 22 + 150 * p - 160 + 140, 14, '#A16207'); pill(x, 'الماء (قطبي)', X, Y + ZR - 40, 14, '#0369A1');
            return;
          }
          var start = mode === 'salt' ? s.saltT : s.sugT, el = s[mode === 'salt' ? 'salt' : 'sug'] ? (t - start) : -1;
          // جزيئات ماء حرة
          FREE.forEach(function (f) { var px = X + f.x + Math.sin(tt * 1.3 + f.v) * 8, py = Y + f.y + Math.cos(tt * 1.1 + f.v) * 8; if (inZoom(px - X, py - Y) && Math.hypot(px - X, py - Y) > 95) waterMol(x, px, py, f.a + tt * .6, 1); });
          if (el < 0) { T(x, 'جزيئات الماء', X, Y + 6, 18, '#0369A1'); return; }
          if (mode === 'salt') {
            LAT.forEach(function (o, i) {
              var gx = X - 51 + o.gx * 34, gy = Y - 51 + o.gy * 34, out = el > 900 + i * 480 ? Math.min(1, (el - 900 - i * 480) / 1200) : 0;
              var ang = i * 2.399, dist = 110 + (i % 4) * 22, tx = X + Math.cos(ang) * dist, ty = Y + Math.sin(ang) * dist * .85;
              var px = gx + (tx - gx) * out, py = gy + (ty - gy) * out;
              ion(x, px, py, o.plus, 1);
              if (out > .15) for (var w = 0; w < 4; w++) { var a2 = w / 4 * 6.283 + i, rr2 = o.plus ? 27 : 33, wx = px + Math.cos(a2) * rr2, wy = py + Math.sin(a2) * rr2; x.globalAlpha = Math.min(1, out * 1.5); waterMol(x, wx, wy, o.plus ? a2 + Math.PI : a2, .8); x.globalAlpha = 1; }
            });
            pill(x, 'Na⁺ أيون صوديوم', X - 75, Y + ZR - 70, 13, '#6D28D9'); pill(x, 'Cl⁻ أيون كلور', X + 75, Y + ZR - 70, 13, '#15803D');
          } else {
            for (var m = 0; m < 9; m++) {
              var gx2 = X - 40 + (m % 3) * 40, gy2 = Y - 40 + Math.floor(m / 3) * 40, out2 = el > 600 + m * 520 ? Math.min(1, (el - 600 - m * 520) / 1200) : 0;
              var a3 = m * 2.399, d3 = 100 + (m % 3) * 30, tx2 = X + Math.cos(a3) * d3, ty2 = Y + Math.sin(a3) * d3 * .85;
              var qx = gx2 + (tx2 - gx2) * out2, qy = gy2 + (ty2 - gy2) * out2;
              sugarMol(x, qx - 10, qy, m * .7, .62);
              if (out2 > .2) for (var w2 = 0; w2 < 3; w2++) { var a4 = w2 / 3 * 6.283 + m, wx2 = qx + Math.cos(a4) * 38, wy2 = qy + Math.sin(a4) * 32; x.globalAlpha = Math.min(1, out2 * 1.5); x.setLineDash([3, 3]); x.strokeStyle = '#0EA5E9'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(qx, qy); x.lineTo(wx2, wy2); x.stroke(); x.setLineDash([]); waterMol(x, wx2, wy2, a4 + (w2 % 2 ? Math.PI : 0), .75); x.globalAlpha = 1; }
            }
            pill(x, 'جزيء سكر (لا يتأين)', X, Y + ZR - 34, 13, '#B45309');
          }
        }, mode === 'oil' ? 'الزيت والماء' : mode === 'sug' ? 'السكر في الماء' : 'الملح في الماء');
        // مفتاح جزيء الماء
        x.fillStyle = 'rgba(255,255,255,.95)'; rr(x, 860, 30, 130, 150, 12); x.fill(); x.strokeStyle = '#CBD5E1'; x.lineWidth = 1.5; rr(x, 860, 30, 130, 150, 12); x.stroke();
        T(x, 'جزيء الماء', 925, 55, 15, '#0E7490'); waterMol(x, 935, 105, Math.PI, 1.8);
        T(x, 'δ−', 900, 112, 17, '#DC2626'); T(x, 'δ+', 970, 82, 15, '#475569'); T(x, 'δ+', 970, 138, 15, '#475569');
        T(x, 'H₂O قطبي', 925, 170, 13, '#334155');
        if (s.oil) pill(x, 'المِثل يذيب المِثل', 925, 225, 16, '#0E7490');
      }
    });
  };

  /* ===== تجربة في المنزل: ملاحظة التغيرات الكيميائية (الحليب) ===== */
  S.lab_milk = function (c, api) {
    return lab(c, api, {
      init: function () { return { cups: 0, fr: 0, tb: 0, night: 0, nT: 0, sm: [0, 0] }; },
      steps: [
        { say: 'خذ كأسين صغيرتين من الحليب.', btns: [['🥛 أحضر الكأسين', function (s) { s.cups = 1; }]], ok: function (s) { return s.cups; } },
        { say: 'ضع إحدى الكأسين في الثلاجة، والأخرى على طاولة المطبخ.', btns: [['❄ كأس ← الثلاجة', function (s) { s.fr = 1; }], ['🍽 كأس ← الطاولة', function (s) { s.tb = 1; }]], ok: function (s) { return s.fr && s.tb; } },
        { say: 'اترك الكأسين على هذه الحالة ليلة كاملة.', btns: [['🌙 مرّت الليلة', function (s) { if (!s.night) { s.night = 1; s.nT = s.T; } }]], ok: function (s) { return s.night && s.T - s.nT > 4200; } },
        { say: 'في اليوم التالي شُمّ كلتا الكأسين (اضغط على كل كأس)، وسجّل ملاحظاتك. ⚠ لا تشرب الحليب الذي بقي خارج الثلاجة.', ok: function (s) { return s.sm[0] && s.sm[1]; } }
      ],
      end: function () { return 'رائحة الحليب المبرّد <b>طبيعية</b>، أما الحليب الذي بقي على الطاولة فرائحته <b>حامضة</b> لأنه فسد. <b>التفسير:</b> عند درجة الحرارة المرتفعة تزداد حركة الجزيئات وتصادماتها فتتسرّع التغيرات الكيميائية، وفي الثلاجة تقل حركتها فتبطؤ التغيرات؛ لذا نحفظ الحليب في الثلاجة.'; },
      draw: function (x, s, t) {
        var hr = s.night ? Math.min(12, (t - s.nT) / 350) : 0, dark = s.night && hr < 12 ? Math.sin(hr / 12 * Math.PI) : 0;
        bench(x);
        // الثلاجة
        x.fillStyle = '#E2E8F0'; rr(x, 70, 40, 250, 360, 16); x.fill(); x.strokeStyle = '#94A3B8'; x.lineWidth = 3; rr(x, 70, 40, 250, 360, 16); x.stroke();
        x.fillStyle = '#F1F5F9'; rr(x, 88, 60, 214, 320, 10); x.fill(); x.strokeStyle = '#CBD5E1'; x.lineWidth = 2; x.beginPath(); x.moveTo(88, 230); x.lineTo(302, 230); x.stroke();
        T(x, 'الثلاجة', 195, 430, 17, '#E2E8F0'); pill(x, '٤°س', 195, 90, 16, '#0369A1');
        // الطاولة
        x.fillStyle = '#A16207'; x.fillRect(560, 300, 340, 22); x.fillRect(585, 322, 16, 78); x.fillRect(860, 322, 16, 78); T(x, 'طاولة المطبخ', 730, 430, 17, '#E2E8F0'); pill(x, '٢٥°س', 730, 90, 16, '#B91C1C');
        function cup(X, Y, sour, lab2, idx) { x.fillStyle = 'rgba(255,255,255,.6)'; x.beginPath(); x.moveTo(X - 34, Y - 90); x.lineTo(X + 34, Y - 90); x.lineTo(X + 27, Y); x.lineTo(X - 27, Y); x.closePath(); x.fill(); x.fillStyle = sour ? mix('#FFFFFF', '#FDE68A', sour * .7) : '#FFFFFF'; x.beginPath(); x.moveTo(X - 31, Y - 70); x.lineTo(X + 31, Y - 70); x.lineTo(X + 26, Y - 3); x.lineTo(X - 26, Y - 3); x.closePath(); x.fill(); if (sour > .5) { x.fillStyle = 'rgba(234,179,8,.5)'; for (var i = 0; i < 6; i++) { x.beginPath(); x.arc(X - 18 + i * 7, Y - 66 + (i % 2) * 4, 4, 0, 7); x.fill(); } } x.strokeStyle = '#64748B'; x.lineWidth = 2.5; x.beginPath(); x.moveTo(X - 34, Y - 90); x.lineTo(X - 27, Y); x.lineTo(X + 27, Y); x.lineTo(X + 34, Y - 90); x.stroke();
          var hv = s.step === 3 && s.hover && Math.abs(s.hover[0] - X) < 45 && Math.abs(s.hover[1] - (Y - 45)) < 60; if (hv) { x.strokeStyle = '#FACC15'; x.lineWidth = 3; x.beginPath(); x.arc(X, Y - 45, 62, 0, 7); x.stroke(); }
          if (s.step === 3 && s.click && Math.abs(s.click[0] - X) < 45 && Math.abs(s.click[1] - (Y - 45)) < 60) s.sm[idx] = 1;
          if (s.sm[idx]) { pill(x, sour > .5 ? '👃 رائحة حامضة ✗' : '👃 رائحة طبيعية ✓', X, Y - 120, 16, sour > .5 ? '#B91C1C' : '#15803D'); if (sour > .5) { x.strokeStyle = 'rgba(132,204,22,.8)'; x.lineWidth = 3; for (var w = 0; w < 3; w++) { x.beginPath(); x.moveTo(X - 15 + w * 15, Y - 95); x.bezierCurveTo(X - 25 + w * 15, Y - 105 - Math.sin(t / 200 + w) * 4, X - 5 + w * 15, Y - 112, X - 15 + w * 15, Y - 125); x.stroke(); } } }
          T(x, lab2, X, Y + 22, 14, '#334155'); }
        if (s.cups) {
          var sour = Math.min(1, hr / 12);
          if (s.fr) cup(195, 222, 0, 'مبرّد', 0); else cup(430, 380, 0, 'كأس ١', 0);
          if (s.tb) cup(730, 300, sour, 'غير مبرّد', 1); else cup(480, 380, 0, 'كأس ٢', 1);
        }
        // عدسة حركة الجزيئات
        if (s.fr && s.tb) {
          [[195, 340, .35, 'حركة بطيئة'], [880, 200, 1.3, 'حركة سريعة']].forEach(function (L, i) {
            if (i === 1 && s.step < 2) return;
            lens(x, L[0], L[1], 52, function (X, Y) { x.fillStyle = '#FFFBEB'; x.fillRect(X - 60, Y - 60, 120, 120); for (var k = 0; k < 10; k++) { var a = k * 2.4 + t / 1000 * L[2] * 3, rr3 = 14 + (k * 7) % 32; x.fillStyle = '#93C5FD'; x.beginPath(); x.arc(X + Math.cos(a * (1 + k % 3 * .3)) * rr3, Y + Math.sin(a) * rr3, 5, 0, 7); x.fill(); } }, L[3]);
          });
        }
        if (dark > 0) { x.fillStyle = 'rgba(15,23,42,' + dark * .55 + ')'; x.fillRect(0, 0, 1000, 470); }
        if (s.night) { clock(x, 470, 160, 48, 8 + hr); pill(x, hr < 12 ? 'تمر الليلة… ' + n(Math.floor(hr)) + ' ساعة' : '☀ اليوم التالي', 470, 240, 16, '#334155'); }
        if (s.step >= 3) pill(x, '⚠ لا تشرب الحليب الذي بقي خارج الثلاجة', 500, 35, 16, '#B91C1C');
      }
    });
  };

  /* ===== تجربة: مسمار حديدي في مشروب غازي ===== */
  S.lab_nail = function (c, api) {
    function nail(x, X, Y, a, rust, sc) { sc = sc || 1; x.save(); x.translate(X, Y); x.rotate(a); x.fillStyle = lg(x, 0, -6 * sc, 0, 6 * sc, [[0, '#E5E7EB'], [.5, '#9CA3AF'], [1, '#4B5563']]); x.fillRect(-70 * sc, -5 * sc, 130 * sc, 10 * sc); x.beginPath(); x.moveTo(60 * sc, -5 * sc); x.lineTo(80 * sc, 0); x.lineTo(60 * sc, 5 * sc); x.fill(); x.fillRect(-78 * sc, -15 * sc, 9 * sc, 30 * sc); var r = rnd(4); x.fillStyle = 'rgba(154,52,18,' + (.85 * rust) + ')'; for (var i = 0; i < 26; i++) { x.beginPath(); x.ellipse(-66 * sc + r() * 125 * sc, (r() - .5) * 9 * sc, (3 + r() * 6) * sc, (2 + r() * 2) * sc, 0, 0, 7); x.fill(); } x.restore(); }
    return lab(c, api, {
      init: function () { return { look: 0, pour: 0, pT: 0, drop: 0, dT: 0, night: 0, nT: 0, out: 0 }; },
      steps: [
        { say: 'لاحظ كيف يبدو المسمار في بداية التجربة: اضغط على المسمار لفحصه بالعدسة.', ok: function (s) { return s.look; } },
        { say: 'صبّ كمية كافية من المشروب الغازي في كأس زجاجية.', btns: [['🥤 صبّ المشروب', function (s) { if (!s.pour) { s.pour = 1; s.pT = s.T; } }]], ok: function (s) { return s.pour && s.T - s.pT > 1600; } },
        { say: 'أسقط المسمار في الكأس، ولاحظ ما يحدث على سطحه.', btns: [['🔩 أسقط المسمار', function (s) { if (!s.drop) { s.drop = 1; s.dT = s.T; } }]], ok: function (s) { return s.drop && s.T - s.dT > 3500; } },
        { say: 'دع المسمار في المشروب الغازي طوال الليل.', btns: [['🌙 اتركه طوال الليل', function (s) { if (!s.night) { s.night = 1; s.nT = s.T; } }]], ok: function (s) { return s.night && s.T - s.nT > 4200; } },
        { say: 'في اليوم التالي أخرج المسمار وقارنه بمظهره في البداية.', btns: [['🧤 أخرج المسمار', function (s) { s.out = 1; }]], ok: function (s) { return s.out; } }
      ],
      end: function () { return 'ظهرت <b>فقاعات غاز</b> على سطح المسمار فور إسقاطه، وفي اليوم التالي بدا المسمار <b>أنظف</b> وقد زالت عنه بقع الصدأ، وتغيّر لون المشروب قليلًا. <b>التفسير:</b> يحتوي المشروب الغازي على أحماض تتفاعل مع الصدأ ومع فلز الحديد، وتتفاعل الأحماض مع بعض الفلزات منتجة <b>غاز الهيدروجين</b>.'; },
      draw: function (x, s, t) {
        bench(x);
        var hr = s.night ? Math.min(12, (t - s.nT) / 350) : 0, rust = s.night ? 1 - hr / 12 * .9 : 1;
        var lvl = s.pour ? .72 * Math.min(1, (t - s.pT) / 1500) : 0;
        var col = mix('#7C2D12', '#A16207', hr / 12 * .5);
        var ly = beaker(x, 500, 390, 200, 260, lvl, s.pour ? 'rgba(124,45,18,.82)' : 'rgba(0,0,0,0)', { label: 'مشروب غازي' });
        if (s.pour) { x.fillStyle = 'rgba(' + (hr ? '161,98,7' : '124,45,18') + ',' + (.1 * hr / 12) + ')'; }
        if (s.pour && t - s.pT < 1500) { x.fillStyle = '#7C2D12'; x.fillRect(560, 60, 10, ly - 60); x.save(); x.translate(600, 40); x.rotate(-.9); x.fillStyle = '#DC2626'; rr(x, -22, -50, 44, 100, 12); x.fill(); x.restore(); }
        if (s.pour) bubbles(x, 420, 580, ly + 8, 380, t, 14, 2.2);
        // المسمار
        if (!s.drop) { nail(x, 210, 300, 0, rust, 1); T(x, 'مسمار حديدي', 210, 345, 15, '#334155'); var hv = s.step === 0 && s.hover && Math.abs(s.hover[0] - 210) < 90 && Math.abs(s.hover[1] - 300) < 30; if (hv) { x.strokeStyle = '#FACC15'; x.lineWidth = 3; rr(x, 120, 275, 180, 50, 14); x.stroke(); } if (s.step === 0 && s.click && Math.abs(s.click[0] - 210) < 90 && Math.abs(s.click[1] - 300) < 40) s.look = 1; }
        else if (!s.out) { var f = Math.min(1, (t - s.dT) / 900); var ny = 120 + (360 - 120) * f; nail(x, 500, ny, .25 + f * .1, rust, .9); if (f >= 1) { var k = s.night && hr >= 12 ? 4 : 18; x.fillStyle = 'rgba(255,255,255,.9)'; for (var i = 0; i < k; i++) { var p = ((t / 900) + i / k) % 1, bx = 440 + (i * 31) % 120, by = 362 - p * (362 - ly); x.beginPath(); x.arc(bx + Math.sin(t / 200 + i) * 3, by, 2.5 + (i % 3), 0, 7); x.fill(); } } }
        else { nail(x, 500, 150, 0, rust, 1); T(x, 'بعد ليلة كاملة', 500, 195, 15, '#334155'); }
        if (s.look) lens(x, 830, 170, 105, function (X, Y) { x.fillStyle = '#F1F5F9'; x.fillRect(X - 110, Y - 110, 220, 220); nail(x, X + 10, Y, 0, s.out ? rust : 1, 1.7); }, s.out ? 'بعد التجربة: أنظف' : 'قبل: بقع صدأ');
        if (s.out) { nail(x, 830, 380, 0, 1, .7); T(x, 'قبل', 830, 420, 14, '#E2E8F0'); }
        if (s.night && hr < 12) { var d = Math.sin(hr / 12 * Math.PI); x.fillStyle = 'rgba(15,23,42,' + d * .5 + ')'; x.fillRect(0, 0, 1000, 470); }
        if (s.night) { clock(x, 190, 140, 48, 8 + hr); pill(x, hr < 12 ? 'تمر الليلة… ' + n(Math.floor(hr)) + ' ساعة' : '☀ اليوم التالي', 190, 220, 16, '#334155'); }
        if (s.drop && !s.night && t - s.dT > 1000) pill(x, 'فقاعات غاز على سطح المسمار', 500, 40, 17, '#0E7490');
      }
    });
  };

  /* ===== الكواشف / الاستقصاء: قياس pH بعصير الملفوف البنفسجي ===== */
  S.lab_cabbage = function (c, api) {
    var SOLS = [['الأمونيا', 6], ['الخل', 1], ['الماء المقطر', 3], ['حمض الهيدروكلوريك', 0], ['الصابون', 5], ['شراب غازي غير ملوّن', 2], ['صودا الخبز', 4]];
    var SHORT = ['أمونيا', 'خل', 'ماء مقطر', 'حمض HCl', 'صابون', 'شراب غازي', 'صودا الخبز'];
    var ORDER = SOLS.map(function (q, i) { return i; }).sort(function (a, b) { return SOLS[a][1] - SOLS[b][1]; });
    var X0 = 700, DX = 96;
    function tx(i) { return X0 - i * DX; }
    return lab(c, api, {
      init: function () { return { fill: 0, fT: 0, drops: [0, 0, 0, 0, 0, 0, 0], dT: [0, 0, 0, 0, 0, 0, 0], picked: [], bad: -1, badT: 0 }; },
      steps: [
        { say: 'اكتب على كل أنبوب اسم محلوله، واملأ الأنابيب إلى نصفها بالمحاليل.', btns: [['🧪 املأ الأنابيب', function (s) { if (!s.fill) { s.fill = 1; s.fT = s.T; } }]], ok: function (s) { return s.fill && s.T - s.fT > 1300; } },
        { say: 'أضف ١٠ قطرات من عصير الملفوف البنفسجي إلى كل أنبوب: اضغط على كل أنبوب بالقطارة، ولاحظ اللون.', ok: function (s) { return s.drops.every(function (d) { return d; }) && s.T - Math.max.apply(null, s.dT) > 900; } },
        { say: 'تحليل البيانات: رتّب المحاليل من <b>الأشد حمضية</b> إلى <b>الأشد قاعدية</b>؛ اضغط الأنابيب بالترتيب مستعينًا بجدول الألوان.', ok: function (s) { return s.picked.length === 7; } }
      ],
      end: function () { return 'الترتيب من الأشد حمضية إلى الأشد قاعدية: <b>حمض الهيدروكلوريك ← الخل ← الشراب الغازي ← الماء المقطر ← صودا الخبز ← الصابون ← الأمونيا</b>. الماء المقطر هو الأقرب إلى التعادل، والأمونيا الأقوى قاعدية. عصير الملفوف <b>كاشف طبيعي</b> يتغير لونه بتغير الرقم الهيدروجيني pH.'; },
      draw: function (x, s, t) {
        bench(x);
        // الحامل
        x.fillStyle = '#B45309'; rr(x, X0 - 6 * DX - 60, 330, 6 * DX + 120, 22, 6); x.fill(); x.fillRect(X0 - 6 * DX - 50, 352, 14, 48); x.fillRect(X0 + 36, 352, 14, 48);
        SOLS.forEach(function (sol, i) {
          var X = tx(i), d = s.drops[i], p = d ? Math.min(1, (t - s.dT[i]) / 900) : 0, base = i === 4 ? '#EEF2FF' : '#F8FAFC';
          var col = d ? mix(base.slice(1) === 'EEF2FF' ? '#EEF2FF' : '#F8FAFC', CAB[sol[1]][0], p) : base;
          var lvl = s.fill ? .5 * Math.min(1, (t - s.fT) / 1200) : 0;
          var ly = tube(x, X, 120, 46, 230, lvl, col);
          var done = s.picked.indexOf(i) >= 0;
          if (s.bad === i && t - s.badT < 600) { x.strokeStyle = '#DC2626'; x.lineWidth = 4; rr(x, X - 34, 110, 68, 250, 12); x.stroke(); }
          var hv = s.hover && Math.abs(s.hover[0] - X) < 40 && s.hover[1] > 100 && s.hover[1] < 360;
          if (hv && (s.step === 1 && !d || s.step === 2 && !done)) { x.strokeStyle = '#FACC15'; x.lineWidth = 3; rr(x, X - 34, 110, 68, 250, 12); x.stroke(); }
          if (s.click && Math.abs(s.click[0] - X) < 40 && s.click[1] > 100 && s.click[1] < 360) {
            if (s.step === 1 && !d) { s.drops[i] = 1; s.dT[i] = t; }
            else if (s.step === 2 && !done) { if (ORDER[s.picked.length] === i) s.picked.push(i); else { s.bad = i; s.badT = t; } }
          }
          if (d && p < 1) { x.save(); x.translate(X, 70); x.fillStyle = '#334155'; rr(x, -9, -40, 18, 34, 7); x.fill(); x.fillStyle = 'rgba(203,213,225,.9)'; x.beginPath(); x.moveTo(-5, -6); x.lineTo(5, -6); x.lineTo(1, 30); x.lineTo(-1, 30); x.fill(); x.restore(); x.fillStyle = '#7E22CE'; x.beginPath(); x.arc(X, 104 + ((t / 90) % 1) * (ly - 104), 4, 0, 7); x.fill(); }
          // ملصق
          T(x, SHORT[i], X, 422, 14, '#F1F5F9', 'center', 700);
          if (done) pill(x, n(s.picked.indexOf(i) + 1), X, 95, 17, '#0F766E');
        });
        cabChart(x, 775, 30);
        if (s.step === 2) { pill(x, 'الأشد حمضية ← … ← الأشد قاعدية', 400, 40, 16, '#7C3AED'); if (s.bad >= 0 && t - s.badT < 1500) pill(x, 'ليس هذا دوره، قارن اللون بالجدول', 400, 75, 15, '#B91C1C'); }
      }
    });
  };

  /* ===== التعادل: إضافة قاعدة إلى حمض ومتابعة pH ===== */
  S.lab_neutral = function (c, api) {
    var VA = 20, CA = 0.1, CB = 0.1;
    function pH(vb) { var na = VA * CA, nb = vb * CB, v = VA + vb; if (Math.abs(na - nb) < 1e-9) return 7; if (na > nb) return -Math.log10((na - nb) / v); return 14 + Math.log10((nb - na) / v); }
    var GX = 620, GY = 70, GW = 340, GH = 280;
    return lab(c, api, {
      init: function () { return { acid: 0, vb: 0, pts: [[0, 1]], over: 0, evap: 0, eT: 0, addT: -9999 }; },
      steps: [
        { say: 'ضع في الكأس 20 مل من حمض الهيدروكلوريك (0.1 مول/لتر)، وأضف إليه قطرات من عصير الملفوف البنفسجي.', btns: [['🧪 جهّز الحمض والكاشف', function (s) { s.acid = 1; }]], ok: function (s) { return s.acid; } },
        { say: 'أضف محلول هيدروكسيد الصوديوم (0.1 مول/لتر) من السحاحة شيئًا فشيئًا حتى يصبح pH = 7 (اللون البنفسجي المزرق).', bind: function (s, b) { [[5, '+٥ مل'], [1, '+١ مل'], [.5, '+٠٫٥ مل']].forEach(function (q) { addBtn(b, q[1], q[0], function () { if (s.over || Math.abs(pH(s.vb) - 7) < .01) return; s.vb = Math.round((s.vb + q[0]) * 10) / 10; s.addT = s.T; s.pts.push([s.vb, pH(s.vb)]); if (s.vb > VA + .01) s.over = 1; }); }); addBtn(b, '↺ أعد', 'r', function () { s.vb = 0; s.pts = [[0, 1]]; s.over = 0; }); }, ok: function (s) { return Math.abs(s.vb - VA) < .01; } },
        { say: 'المحلول متعادل. سخّن المحلول المتعادل لتبخير الماء، ولاحظ ما يتبقى.', btns: [['🔥 بخّر الماء', function (s) { if (!s.evap) { s.evap = 1; s.eT = s.T; } }]], ok: function (s) { return s.evap && s.T - s.eT > 3500; } }
      ],
      end: function () { return 'عند إضافة 20 مل من القاعدة تساوت أعداد أيونات الهيدرونيوم وأيونات الهيدروكسيد، فاتحدت مكوّنة الماء <b>(H₃O⁺ + OH⁻ ← 2H₂O)</b> وأصبح pH = 7: محلول <b>متعادل</b>. وبعد تبخير الماء بقيت بلورات بيضاء من <b>ملح</b> كلوريد الصوديوم. <b>التعادل:</b> تفاعل حمض مع قاعدة ينتج ملحًا وماءً.'; },
      draw: function (x, s, t) {
        bench(x);
        var p = pH(s.vb), col = s.acid ? CAB[cabByPH(p)][0] : '#F8FAFC';
        // السحاحة
        x.fillStyle = '#64748B'; x.fillRect(96, 20, 10, 380); x.fillRect(96, 395, 120, 10); x.fillRect(100, 60, 120, 8);
        x.fillStyle = 'rgba(255,255,255,.7)'; rr(x, 200, 20, 30, 230, 6); x.fill(); x.strokeStyle = '#475569'; x.lineWidth = 2; rr(x, 200, 20, 30, 230, 6); x.stroke();
        var bl = 1 - Math.min(1, s.vb / 50); x.fillStyle = 'rgba(186,230,253,.9)'; x.fillRect(203, 20 + 228 * (1 - bl) + 2, 24, 228 * bl - 2);
        for (var m = 0; m <= 5; m++) { x.strokeStyle = '#334155'; x.lineWidth = 1; x.beginPath(); x.moveTo(200, 24 + m * 44); x.lineTo(212, 24 + m * 44); x.stroke(); }
        x.fillStyle = '#475569'; x.beginPath(); x.moveTo(205, 250); x.lineTo(225, 250); x.lineTo(217, 285); x.lineTo(213, 285); x.fill();
        T(x, 'NaOH', 215, 14, 13, '#334155');
        if (t - s.addT < 500) { x.fillStyle = 'rgba(186,230,253,.95)'; x.beginPath(); x.arc(215, 290 + (t - s.addT) / 500 * 60, 4, 0, 7); x.fill(); }
        // الكأس
        if (s.evap) { var e = Math.min(1, (t - s.eT) / 3500); hotplate(x, 330, 398, e < 1); var ly0 = beaker(x, 330, 390, 170, 160, (.4) * (1 - e) + .01, col, { label: 'الكأس' }); if (e < 1) { x.fillStyle = 'rgba(255,255,255,.6)'; for (var v = 0; v < 6; v++) { var q = ((t / 700) + v / 6) % 1; x.beginPath(); x.arc(290 + v * 16, ly0 - q * 80, 6 + q * 8, 0, 7); x.fill(); } } for (var k2 = 0; k2 < 26 * e; k2++) { var zz = 5 + (k2 % 3) * 2; x.fillStyle = '#fff'; x.strokeStyle = '#94A3B8'; x.lineWidth = 1; x.fillRect(268 + (k2 * 19) % 120, 376 - (k2 % 4) * 5, zz, zz); x.strokeRect(268 + (k2 * 19) % 120, 376 - (k2 % 4) * 5, zz, zz); } if (e >= 1) pill(x, 'بلورات ملح (كلوريد الصوديوم)', 370, 205, 16, '#0F766E'); }
        else { beaker(x, 330, 390, 170, 160, s.acid ? .25 + .2 * s.vb / 40 : 0, col, { label: s.acid ? 'HCl + كاشف الملفوف' : 'الكأس' }); }
        // مقياس pH
        x.fillStyle = '#1E293B'; rr(x, 400, 40, 130, 70, 12); x.fill(); x.fillStyle = '#A7F3D0'; rr(x, 410, 50, 110, 40, 6); x.fill();
        T(x, s.acid ? 'pH ' + n(p.toFixed(1)) : '— —', 465, 79, 22, '#064E3B'); T(x, 'جهاز pH', 465, 106, 12, '#CBD5E1');
        if (s.acid) pill(x, CAB[cabByPH(p)][1], 465, 140, 15, CAB[cabByPH(p)][0], cabByPH(p) === 6 ? '#1E293B' : '#fff');
        T(x, 'القاعدة المضافة: ' + n(s.vb) + ' مل', 330, 450, 15, '#E2E8F0');
        // منحنى pH
        x.fillStyle = '#fff'; rr(x, GX - 50, GY - 40, GW + 80, GH + 90, 12); x.fill(); x.strokeStyle = '#CBD5E1'; x.lineWidth = 1.5; rr(x, GX - 50, GY - 40, GW + 80, GH + 90, 12); x.stroke();
        T(x, 'الرقم الهيدروجيني pH مقابل حجم القاعدة', GX + GW / 2, GY - 15, 15, '#7C3AED');
        function gx(v) { return GX + v / 40 * GW; } function gy(q) { return GY + GH - q / 14 * GH; }
        for (var q2 = 0; q2 <= 14; q2 += 2) { x.strokeStyle = q2 === 7 ? '#A78BFA' : '#F1F5F9'; x.lineWidth = q2 === 7 ? 2 : 1; x.beginPath(); x.moveTo(GX, gy(q2)); x.lineTo(GX + GW, gy(q2)); x.stroke(); T(x, n(q2), GX - 8, gy(q2) + 5, 12, '#64748B', 'right', 600); }
        for (var v2 = 0; v2 <= 40; v2 += 10) T(x, n(v2), gx(v2), GY + GH + 18, 12, '#64748B', 'center', 600);
        T(x, 'حجم NaOH (مل)', GX + GW / 2, GY + GH + 40, 13, '#475569'); T(x, 'متعادل ٧', GX + GW - 30, gy(7) - 6, 12, '#7C3AED', 'center', 600);
        x.strokeStyle = '#7C3AED'; x.lineWidth = 3; x.beginPath(); s.pts.forEach(function (pt, i) { if (i) x.lineTo(gx(pt[0]), gy(pt[1])); else x.moveTo(gx(pt[0]), gy(pt[1])); }); x.stroke();
        s.pts.forEach(function (pt) { x.fillStyle = CAB[cabByPH(pt[1])][0]; x.beginPath(); x.arc(gx(pt[0]), gy(pt[1]), 6, 0, 7); x.fill(); });
        if (s.over) pill(x, 'تجاوزت نقطة التعادل! اضغط «أعد»', 500, 430, 16, '#B91C1C');
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
