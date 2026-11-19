/* محاكاة وتجارب الفصل الأول (علوم ثاني متوسط): طبيعة العلم — رسوم تفصيلية واضحة */
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

  /* ================= رسوم مشتركة ================= */
  function wood(x, Y, H) { x.fillStyle = lg(x, 0, Y, 0, Y + H, [[0, '#B07A47'], [1, '#7C5230']]); x.fillRect(0, Y, 1000, H); x.strokeStyle = 'rgba(60,35,15,.25)'; x.lineWidth = 2; for (var i = 0; i < 6; i++) { x.beginPath(); x.moveTo(0, Y + 8 + i * H / 6); x.bezierCurveTo(300, Y + 2 + i * H / 6, 600, Y + 14 + i * H / 6, 1000, Y + 6 + i * H / 6); x.stroke(); } x.fillStyle = 'rgba(255,255,255,.18)'; x.fillRect(0, Y, 1000, 4); }
  function sand(x, X, Y, w, h, seed, base) { x.fillStyle = base || '#E8C78E'; x.fillRect(X, Y, w, h); var r = rnd(seed || 7); for (var i = 0; i < w * h / 90; i++) { x.fillStyle = r() < .5 ? 'rgba(150,105,50,.22)' : 'rgba(255,245,220,.35)'; x.fillRect(X + r() * w, Y + r() * h, 2, 2); } }
  // نبات مفصّل: الطول بالسنتيمتر، صحة (1 أخضر نضر ← 0 ذابل بني)، ذبول (ميلان الساق)
  function plant(x, X, Y, cm, health, wilt, sc, seed) {
    var H = cm * sc, top = Y - H, r = rnd(seed || 3), lean = wilt * 55;
    var leafC = health > .5 ? mix('2E7D32', 'A3B83A', (1 - health) * 2) : mix('C9A227', '8D6E3F', (0.5 - health) * 2);
    x.strokeStyle = health > .4 ? '#3F7D28' : '#8B6B35'; x.lineWidth = 7; x.lineCap = 'round';
    x.beginPath(); x.moveTo(X, Y); x.bezierCurveTo(X, Y - H * .5, X + lean * .4, top + H * .2 + wilt * 30, X + lean, top + wilt * 45); x.stroke();
    var N = 7;
    for (var i = 1; i <= N; i++) {
      var f = i / (N + 1), px = X + lean * f * f, py = Y - (H - wilt * 45) * f, side = i % 2 ? 1 : -1, L = 34 + 10 * (1 - f);
      var ang = side * (0.45 + wilt * 1.25) + (side > 0 ? 0 : Math.PI);
      x.save(); x.translate(px, py); x.rotate(side > 0 ? 0.4 + wilt * 1.2 : -0.4 - wilt * 1.2);
      x.fillStyle = lg(x, 0, -8, side * L, 8, [[0, leafC], [1, mix(health > .5 ? '1B5E20' : '6D4C2A', 'FFFFFF', .05)]]);
      x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(side * L * .5, -14, side * L, 0); x.quadraticCurveTo(side * L * .5, 12, 0, 0); x.fill();
      x.strokeStyle = 'rgba(255,255,255,.45)'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(0, 0); x.lineTo(side * L * .92, 0); x.stroke();
      if (health < .45) { x.fillStyle = 'rgba(90,60,25,.5)'; x.beginPath(); x.arc(side * L * .6, 2, 4, 0, 7); x.fill(); }
      x.restore();
    }
    // البرعم في القمة
    x.fillStyle = leafC; x.beginPath(); x.ellipse(X + lean, top + wilt * 45, 7, 11, wilt, 0, 7); x.fill();
    x.lineCap = 'butt';
  }
  function pot(x, X, Y, col, label) {
    shadow(x, X, Y + 6, 75, 12);
    x.fillStyle = lg(x, X - 60, 0, X + 60, 0, [[0, mix(col, '000000', .25)], [.45, '#' + col], [1, mix(col, '000000', .35)]]);
    x.beginPath(); x.moveTo(X - 58, Y - 92); x.lineTo(X + 58, Y - 92); x.lineTo(X + 44, Y); x.lineTo(X - 44, Y); x.closePath(); x.fill();
    x.fillStyle = mix(col, 'FFFFFF', .15); rr(x, X - 66, Y - 108, 132, 20, 6); x.fill();
    x.fillStyle = 'rgba(255,255,255,.2)'; x.fillRect(X - 40, Y - 85, 10, 70);
    x.fillStyle = '#4E342E'; x.beginPath(); x.ellipse(X, Y - 104, 60, 7, 0, 0, 7); x.fill();
    if (label) { x.fillStyle = '#fff'; rr(x, X - 22, Y - 66, 44, 36, 8); x.fill(); T(x, label, X, Y - 38, 24, '#0F172A'); }
  }
  function can(x, X, Y, tilt) {
    x.save(); x.translate(X, Y); x.rotate(-tilt);
    x.fillStyle = lg(x, -40, -30, 40, 30, [[0, '#4DB6AC'], [1, '#00796B']]); rr(x, -38, -30, 76, 56, 10); x.fill();
    x.strokeStyle = '#00695C'; x.lineWidth = 7; x.beginPath(); x.arc(0, -34, 26, Math.PI, 0); x.stroke();
    x.fillStyle = '#00897B'; x.beginPath(); x.moveTo(-36, 10); x.lineTo(-92, -24); x.lineTo(-96, -18); x.lineTo(-38, 22); x.closePath(); x.fill();
    x.fillStyle = '#004D40'; x.beginPath(); x.ellipse(-95, -21, 7, 9, .6, 0, 7); x.fill();
    x.restore();
  }
  function drops(x, X, Y, t, len) { x.fillStyle = 'rgba(56,152,236,.85)'; for (var i = 0; i < 9; i++) { var p = ((t / 380) + i / 9) % 1; x.beginPath(); x.ellipse(X + (i % 3 - 1) * 5, Y + p * len, 3, 5, 0, 0, 7); x.fill(); } }
  function ruler(x, X, Y, cmMax, sc, val) {
    x.fillStyle = '#FFE082'; x.fillRect(X, Y - cmMax * sc - 6, 26, cmMax * sc + 8); x.strokeStyle = '#B28704'; x.lineWidth = 1; x.strokeRect(X, Y - cmMax * sc - 6, 26, cmMax * sc + 8);
    for (var c = 0; c <= cmMax; c++) { var yy = Y - c * sc; x.strokeStyle = '#5D4037'; x.lineWidth = c % 5 ? 1 : 2; x.beginPath(); x.moveTo(X + 26, yy); x.lineTo(X + 26 - (c % 5 ? 8 : 15), yy); x.stroke(); if (c % 5 === 0 && c) T(x, n(c), X + 8, yy + 5, 11, '#5D4037'); }
    if (val != null) { var yv = Y - val * sc; x.strokeStyle = '#DC2626'; x.lineWidth = 2.5; x.setLineDash([6, 4]); x.beginPath(); x.moveTo(X - 70, yv); x.lineTo(X + 26, yv); x.stroke(); x.setLineDash([]); pill(x, n(val.toFixed(1)) + ' سم', X + 13, yv - 12, 15, '#DC2626'); }
  }

  /* ===== التجربة الاستهلالية: نموذج تنقيب عن الآثار (كعكة الشوفان) ===== */
  S.lab_cake = function (c, api) {
    var P = [[420, 225, 'r'], [540, 190, 'n'], [490, 305, 'r'], [610, 270, 'n'], [380, 300, 'r'], [560, 250, 'n']], CX = 495, CY = 255;
    function piece(x, X, Y, kind, a, s) {
      x.globalAlpha = a; s = s || 1;
      if (kind === 'r') { x.fillStyle = rg(x, X - 4 * s, Y - 4 * s, 1, 14 * s, [[0, '#7B3F61'], [1, '#2E0F24']]); x.beginPath(); x.ellipse(X, Y, 13 * s, 9 * s, .5, 0, 7); x.fill(); x.strokeStyle = 'rgba(255,255,255,.25)'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(X - 6 * s, Y - 2 * s); x.quadraticCurveTo(X, Y + 4 * s, X + 7 * s, Y - 1 * s); x.stroke(); }
      else { x.fillStyle = rg(x, X - 5 * s, Y - 5 * s, 1, 18 * s, [[0, '#E8C08A'], [1, '#9C6B3C']]); x.beginPath(); x.moveTo(X - 16 * s, Y); x.bezierCurveTo(X - 14 * s, Y - 13 * s, X + 14 * s, Y - 13 * s, X + 16 * s, Y); x.bezierCurveTo(X + 12 * s, Y + 11 * s, X - 12 * s, Y + 11 * s, X - 16 * s, Y); x.fill(); x.strokeStyle = 'rgba(110,70,30,.6)'; x.lineWidth = 1.5; x.beginPath(); x.moveTo(X - 9 * s, Y - 5 * s); x.quadraticCurveTo(X - 3 * s, Y + 3 * s, X - 7 * s, Y + 7 * s); x.moveTo(X + 5 * s, Y - 7 * s); x.quadraticCurveTo(X + 10 * s, Y, X + 4 * s, Y + 7 * s); x.stroke(); }
      x.globalAlpha = 1;
    }
    return lab(c, api, {
      init: function () { return { cake: 0, tray: 0, tool: 1, hits: [0, 0, 0, 0, 0, 0], out: [], dmg: 0, wash: 0, fx: [], last: null }; },
      steps: [
        { say: 'أحضر كعكة مصنوعة من الشوفان، فيها قطع من الجوز وحبات الزبيب.', btns: [['🍪 أحضر الكعكة', function (s) { s.cake = 1; }]], ok: function (s) { return s.cake; } },
        { say: 'ضع الكعكة على صينية كبيرة مفروشة بمنشفة ورقية.', btns: [['🧻 ضعها على الصينية', function (s) { s.tray = 1; }]], ok: function (s) { return s.tray; } },
        { say: 'استخرج القطع الست بعناية دون أن تتلف الكعكة: اختر الأداة ثم اضغط على القطعة الظاهرة (الأداة الدقيقة: ثلاث نقرات هادئة).', bind: function (s, b) { addBtn(b, '🥄 ملعقة كبيرة (سريعة)', 0, function () { pick(b, s, 'tool', 0); }); addBtn(b, '🪥 فرشاة وملقط (دقيقة)', 1, function () { pick(b, s, 'tool', 1); }); pick(b, s, 'tool', 1); }, ok: function (s) { return s.out.length >= P.length; } },
        { say: 'اغسل يديك بالماء والصابون.', btns: [['🧼 اغسل يديك', function (s) { s.wash = 1; s.washT = s.T; }]], ok: function (s) { return s.wash && s.T - s.washT > 1200; } }
      ],
      end: function (s) { return 'الاستخراج بالفرشاة والملقط <b>أبطأ لكنه يحافظ</b> على الكعكة والقطعة، والملعقة أسرع لكنها تُتلف ما حول القطعة (مواضع التلف: ' + n(s.dmg) + '). وكذلك استخراج العظام والفخار من التربة: يحتاج إلى <b>صبر وعناية وأدوات دقيقة</b>، ويجب تسجيل موقع كل قطعة قبل نقلها.'; },
      draw: function (x, s, t) {
        x.fillStyle = lg(x, 0, 0, 0, 470, [[0, '#FFF7ED'], [1, '#FDE7C8']]); x.fillRect(0, 0, 1000, 470); wood(x, 400, 70);
        if (s.tray) { shadow(x, CX, 400, 300, 34, .3); x.fillStyle = lg(x, 0, 120, 0, 400, [[0, '#E2E8F0'], [1, '#94A3B8']]); x.beginPath(); x.ellipse(CX, 262, 300, 150, 0, 0, 7); x.fill(); x.fillStyle = '#F8FAFC'; x.beginPath(); x.ellipse(CX, 258, 280, 136, 0, 0, 7); x.fill(); x.strokeStyle = '#E2E8F0'; x.lineWidth = 2; for (var q = 0; q < 6; q++) { x.beginPath(); x.moveTo(CX - 240 + q * 85, 150); x.lineTo(CX - 270 + q * 85, 370); x.stroke(); } T(x, 'صينية ومنشفة ورقية', CX, 425, 17, '#475569'); }
        if (!s.cake) { pill(x, 'اضغط «أحضر الكعكة»', 500, 240, 26, '#9A3412'); return; }
        // الكعكة: جسم مع سماكة وقوام الشوفان
        x.fillStyle = '#8D5A2B'; x.beginPath(); x.ellipse(CX, 272, 200, 112, 0, 0, 7); x.fill();
        x.fillStyle = rg(x, CX - 60, 220, 20, 220, [[0, '#E3B074'], [1, '#B47A3C']]); x.beginPath(); x.ellipse(CX, 255, 200, 110, 0, 0, 7); x.fill();
        var r = rnd(5); for (var i = 0; i < 260; i++) { var a = r() * 7, rd = Math.sqrt(r()) * 190; x.fillStyle = ['#F2CF96', '#C78E4E', '#A86F33', '#EBD3A6'][i % 4]; x.save(); x.translate(CX + Math.cos(a) * rd, 255 + Math.sin(a) * rd * .55); x.rotate(a); x.beginPath(); x.ellipse(0, 0, 5, 2.5, 0, 0, 7); x.fill(); x.restore(); }
        // آثار التلف
        s.out.forEach(function (o) { var p = P[o[3]]; if (o[1] === 'ملعقة') { x.fillStyle = '#6B3E17'; x.beginPath(); for (var k = 0; k < 14; k++) { var aa = k / 14 * 7, rr2 = 34 + (k % 3) * 7; x.lineTo(p[0] + Math.cos(aa) * rr2, p[1] + Math.sin(aa) * rr2 * .7); } x.closePath(); x.fill(); } else { x.fillStyle = '#9C6630'; x.beginPath(); x.ellipse(p[0], p[1], 15, 10, 0, 0, 7); x.fill(); } });
        P.forEach(function (p, i) {
          if (s.out.some(function (o) { return o[3] === i; })) return;
          var h = s.hits[i]; piece(x, p[0], p[1] - h * 2, p[2], .45 + h * .18, 1);
          if (!h) { x.fillStyle = 'rgba(200,140,80,.75)'; x.beginPath(); x.ellipse(p[0] + 3, p[1] + 2, 12, 7, 0, 0, 7); x.fill(); }
          var hv = s.hover && Math.hypot(s.hover[0] - p[0], s.hover[1] - p[1]) < 30; if (hv && s.tray) { x.strokeStyle = '#FACC15'; x.lineWidth = 3; x.beginPath(); x.arc(p[0], p[1], 24, 0, 7); x.stroke(); }
          if (s.click && s.tray && Math.hypot(s.click[0] - p[0], s.click[1] - p[1]) < 30) {
            if (s.tool === 0) { s.hits[i] = -1; s.dmg++; s.out.push([p[2] === 'r' ? 'زبيب' : 'جوز', 'ملعقة', 'تفتّتت حولها', i]); for (var k2 = 0; k2 < 26; k2++) s.fx.push({ x: p[0], y: p[1], vx: (Math.random() - .5) * 7, vy: -Math.random() * 6, t: t }); s.last = { i: i, bad: 1 }; }
            else { s.hits[i]++; for (var k3 = 0; k3 < 5; k3++) s.fx.push({ x: p[0], y: p[1], vx: (Math.random() - .5) * 2.5, vy: -Math.random() * 2, t: t, f: 1 }); if (s.hits[i] >= 3) { s.out.push([p[2] === 'r' ? 'زبيب' : 'جوز', 'فرشاة وملقط', 'سليمة', i]); s.last = { i: i, bad: 0 }; } }
          }
        });
        // فتات متطاير
        s.fx = s.fx.filter(function (f) { var dt = (t - f.t) / 16; return dt < 50; });
        s.fx.forEach(function (f) { var dt = (t - f.t) / 16; x.fillStyle = f.f ? 'rgba(240,210,160,.9)' : '#B47A3C'; x.beginPath(); x.arc(f.x + f.vx * dt, f.y + f.vy * dt + .12 * dt * dt, f.f ? 2 : 4, 0, 7); x.fill(); });
        // الأداة على المؤشر
        if (s.hover && s.tray && s.step === 2) { x.save(); x.translate(s.hover[0], s.hover[1]); if (s.tool === 0) { x.fillStyle = '#B0BEC5'; x.beginPath(); x.ellipse(18, -10, 20, 13, -.6, 0, 7); x.fill(); x.fillStyle = '#78909C'; x.save(); x.rotate(-.6); x.fillRect(32, -14, 70, 8); x.restore(); } else { x.strokeStyle = '#546E7A'; x.lineWidth = 4; x.beginPath(); x.moveTo(4, -4); x.lineTo(60, -56); x.moveTo(10, -2); x.lineTo(64, -50); x.stroke(); } x.restore(); }
        // صندوق القطع المستخرجة
        x.fillStyle = '#fff'; rr(x, 830, 30, 150, 340, 14); x.fill(); x.strokeStyle = '#E2E8F0'; x.lineWidth = 2; rr(x, 830, 30, 150, 340, 14); x.stroke();
        T(x, 'القطع المستخرجة', 905, 58, 16, '#9A3412');
        s.out.forEach(function (o, j) { var yy = 92 + j * 46; piece(x, 860, yy, P[o[3]][2], 1, o[1] === 'ملعقة' ? .7 : 1.1); if (o[1] === 'ملعقة') { x.fillStyle = '#B47A3C'; for (var q2 = 0; q2 < 5; q2++) { x.beginPath(); x.arc(850 + q2 * 6, yy + 10, 2.5, 0, 7); x.fill(); } } T(x, o[1] === 'ملعقة' ? 'متضرّرة ✗' : 'سليمة ✓', 935, yy + 6, 14, o[1] === 'ملعقة' ? '#B91C1C' : '#15803D'); });
        pill(x, 'مواضع التلف: ' + n(s.dmg), 110, 50, 17, s.dmg ? '#B91C1C' : '#15803D');
        if (s.last) lens(x, 110, 225, 82, function (X, Y) { x.fillStyle = '#C8904F'; x.fillRect(X - 90, Y - 90, 180, 180); if (s.last.bad) { x.fillStyle = '#6B3E17'; x.beginPath(); x.arc(X, Y, 55, 0, 7); x.fill(); for (var k4 = 0; k4 < 12; k4++) { x.fillStyle = '#9C6630'; x.beginPath(); x.arc(X + Math.cos(k4) * 60, Y + Math.sin(k4 * 1.7) * 50, 7, 0, 7); x.fill(); } T(x, 'حفرة وتفتّت', X, Y + 6, 15, '#FDE68A'); } else { x.fillStyle = '#A8733A'; x.beginPath(); x.ellipse(X, Y, 34, 22, 0, 0, 7); x.fill(); T(x, 'مكان نظيف', X, Y + 50, 15, '#14532D'); } }, s.last.bad ? 'ملعقة' : 'أداة دقيقة');
        if (s.wash) { var p2 = Math.min(1, (t - s.washT) / 1200); x.fillStyle = 'rgba(224,242,254,' + .85 * p2 + ')'; x.fillRect(0, 0, 1000, 470); T(x, '🧼 غسل اليدين بالماء والصابون', 500, 240, 30, '#0369A1'); }
      }
    });
  };

  /* ===== الدرس الأول: مراحل استكشاف موقع أثري ===== */
  S.lab_dig = function (c, api) {
    var C = 8, R = 4, X0 = 70, Y0 = 92, CW = 76, CH = 72;
    var A = [[1, 1, 'pot', 'إناء فخاري'], [5, 2, 'bone', 'عظام'], [6, 0, 'axe', 'أداة حجرية'], [3, 3, 'ring', 'حُلي']];
    var COL = 'أبجدهوزح';
    function at(cx, cy) { for (var i = 0; i < A.length; i++) if (A[i][0] === cx && A[i][1] === cy) return i; return -1; }
    function cellXY(cx, cy) { return [X0 + (C - 1 - cx) * CW, Y0 + cy * CH]; }
    function art(x, kind, X, Y, s) {
      x.save(); x.translate(X, Y); x.scale(s, s);
      if (kind === 'pot') { x.fillStyle = lg(x, -20, 0, 20, 0, [[0, '#8D4A2B'], [.5, '#C4733F'], [1, '#7A3B1F']]); x.beginPath(); x.moveTo(-10, -24); x.lineTo(10, -24); x.quadraticCurveTo(26, -6, 16, 18); x.lineTo(-16, 18); x.quadraticCurveTo(-26, -6, -10, -24); x.fill(); x.strokeStyle = '#5D2E16'; x.lineWidth = 2; x.beginPath(); x.moveTo(-18, 0); x.lineTo(18, 0); x.stroke(); x.beginPath(); x.moveTo(4, -20); x.lineTo(-2, 4); x.lineTo(6, 14); x.stroke(); }
      else if (kind === 'bone') { x.fillStyle = '#F1E7D0'; x.strokeStyle = '#B8A988'; x.lineWidth = 2; x.save(); x.rotate(-.5); rr(x, -22, -5, 44, 10, 5); x.fill(); x.stroke(); [-22, 22].forEach(function (e) { x.beginPath(); x.arc(e, -6, 7, 0, 7); x.arc(e, 6, 7, 0, 7); x.fill(); }); x.restore(); }
      else if (kind === 'axe') { x.fillStyle = lg(x, -18, -18, 18, 18, [[0, '#9E9E9E'], [1, '#424242']]); x.beginPath(); x.moveTo(0, -24); x.quadraticCurveTo(20, -4, 6, 22); x.lineTo(-6, 22); x.quadraticCurveTo(-20, -4, 0, -24); x.fill(); x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = 2; for (var k = 0; k < 4; k++) { x.beginPath(); x.moveTo(-8 + k * 4, -10 + k * 6); x.lineTo(2 + k * 3, -14 + k * 6); x.stroke(); } }
      else { x.strokeStyle = '#D4A017'; x.lineWidth = 6; x.beginPath(); x.arc(0, 4, 13, 0, 7); x.stroke(); x.fillStyle = '#1E88E5'; x.beginPath(); x.moveTo(0, -18); x.lineTo(7, -10); x.lineTo(0, -3); x.lineTo(-7, -10); x.closePath(); x.fill(); }
      x.restore();
    }
    return lab(c, api, {
      init: function () { return { scan: -1, scanT: 0, sig: [], map: [], soil: {}, found: [], photo: 0, lab: 0, flash: 0 }; },
      steps: [
        { say: 'قبل الحفر: مرّر جهاز الرادار على صفوف شبكة الموقع للكشف عمّا في باطنها، وراقب شاشته.', btns: [['📡 مرّر الرادار على الصف التالي', function (s) { if (s.scan < R - 1 && !s.busy) { s.scan++; s.scanT = s.T; s.busy = 1; setTimeout(function () { A.forEach(function (a, i) { if (a[1] === s.scan) s.sig.push(i); }); s.busy = 0; }, 1600); } }]], ok: function (s) { return s.scan >= R - 1 && !s.busy; } },
        { say: 'ارسم خريطة الموقع: اضغط على كل إشارة حمراء لتثبيت وتد مرقّم وتسجيل موقعها الدقيق قبل الحفر.', ok: function (s) { return s.map.length >= A.length; } },
        { say: 'نقّب ببطء بالفرشاة: اضغط على كل مربع موتّد ثلاث مرات (ثلاث طبقات تربة).', ok: function (s) { return s.found.length >= A.length; } },
        { say: 'صوّر القطع في مواقعها قبل نقلها؛ لتوثيق الموقع والاتجاه.', btns: [['📷 صوّر القطع', function (s) { s.photo = 1; s.flash = s.T; }]], ok: function (s) { return s.photo && s.T - s.flash > 700; } },
        { say: 'رقّم القطع، ثم انقلها بحرص إلى المختبر لتنظيفها وإجراء التحاليل الكيميائية لتقدير عمرها.', btns: [['🔬 انقلها إلى المختبر', function (s) { s.lab = 1; s.labT = s.T; }]], ok: function (s) { return s.lab && s.T - s.labT > 1500; } }
      ],
      end: function () { return 'كشف <b>الرادار</b> مواقع القطع دون حفر، و<b>الخريطة</b> سجّلت الموقع الدقيق لكل قطعة قبل نقلها، و<b>التنقيب البطيء</b> حافظ عليها، و<b>التصوير</b> وثّق موقعها واتجاهها، ثم يقدّر <b>العمل المختبري</b> أعمارها بالتحاليل الكيميائية. العمل الميداني والعمل المختبري كلاهما مهم.'; },
      draw: function (x, s, t) {
        x.fillStyle = lg(x, 0, 0, 0, 470, [[0, '#BFE3F5'], [.16, '#F3DDB0'], [1, '#D9B47A']]); x.fillRect(0, 0, 1000, 470);
        if (s.lab) {
          x.fillStyle = '#EEF2FF'; x.fillRect(0, 0, 1000, 470); wood(x, 330, 140);
          // مجهر وأنابيب
          x.fillStyle = '#37474F'; x.fillRect(150, 300, 120, 18); x.fillRect(200, 170, 18, 132); x.save(); x.translate(212, 180); x.rotate(-.5); x.fillRect(-12, -70, 24, 90); x.restore(); x.beginPath(); x.ellipse(240, 255, 40, 8, 0, 0, 7); x.fill();
          ['#EF5350', '#42A5F5', '#66BB6A'].forEach(function (cl, i) { var tx = 330 + i * 36; x.fillStyle = 'rgba(255,255,255,.7)'; rr(x, tx, 200, 22, 110, 10); x.fill(); x.fillStyle = cl; rr(x, tx + 2, 260, 18, 48, 8); x.fill(); x.strokeStyle = '#90A4AE'; rr(x, tx, 200, 22, 110, 10); x.stroke(); });
          T(x, 'المختبر: التنظيف والدراسات والتحاليل الكيميائية', 640, 60, 24, '#1E3A8A');
          A.forEach(function (a, j) { var px = 520 + j * 115; x.fillStyle = '#fff'; rr(x, px - 48, 180, 96, 130, 12); x.fill(); art(x, a[2], px, 240, 1.4); pill(x, n(j + 1), px, 295, 16, '#1E3A8A'); T(x, a[3], px, 345, 16, '#0F172A'); });
          T(x, 'تُقدَّر أعمار القطع بالتحاليل الكيميائية', 640, 400, 20, '#1E3A8A');
          return;
        }
        T(x, 'موقع أثري مقسّم بشبكة حبال وأوتاد (منظر من أعلى)', 500, 36, 20, '#5D4037');
        sand(x, X0, Y0, C * CW, R * CH, 11);
        for (var cy = 0; cy < R; cy++) for (var cx = 0; cx < C; cx++) {
          var p = cellXY(cx, cy), i = at(cx, cy), d = s.soil[cx + ',' + cy] || 0;
          if (d) { x.fillStyle = ['#E8C78E', '#C9A06A', '#A87D4F', '#8E6A44'][d]; x.fillRect(p[0] + 3, p[1] + 3, CW - 6, CH - 6); x.strokeStyle = 'rgba(0,0,0,.25)'; x.strokeRect(p[0] + 3, p[1] + 3, CW - 6, CH - 6); }
          if (i >= 0 && d >= 3) art(x, A[i][2], p[0] + CW / 2, p[1] + CH / 2 + 4, 1.05);
          else if (i >= 0 && d >= 1) { x.globalAlpha = d * .25; art(x, A[i][2], p[0] + CW / 2, p[1] + CH / 2 + 4, 1.05); x.globalAlpha = 1; }
          if (i >= 0 && s.sig.indexOf(i) >= 0 && s.map.indexOf(i) < 0) { x.strokeStyle = 'rgba(220,38,38,' + (.6 + .4 * Math.sin(t / 180)) + ')'; x.lineWidth = 4; x.beginPath(); x.arc(p[0] + CW / 2, p[1] + CH / 2, 22, 0, 7); x.stroke(); }
          if (i >= 0 && s.map.indexOf(i) >= 0 && d < 3) { x.fillStyle = '#6D4C41'; x.fillRect(p[0] + 8, p[1] + 10, 4, 26); x.fillStyle = '#E53935'; x.beginPath(); x.moveTo(p[0] + 12, p[1] + 10); x.lineTo(p[0] + 32, p[1] + 16); x.lineTo(p[0] + 12, p[1] + 22); x.fill(); T(x, n(s.map.indexOf(i) + 1), p[0] + 20, p[1] + 20, 11, '#fff'); }
          if (s.hover && s.hover[0] > p[0] && s.hover[0] < p[0] + CW && s.hover[1] > p[1] && s.hover[1] < p[1] + CH && s.step >= 1 && s.step <= 2) { x.strokeStyle = '#FACC15'; x.lineWidth = 3; x.strokeRect(p[0] + 2, p[1] + 2, CW - 4, CH - 4); }
          if (s.click && s.click[0] > p[0] && s.click[0] < p[0] + CW && s.click[1] > p[1] && s.click[1] < p[1] + CH) {
            if (s.step === 1 && i >= 0 && s.sig.indexOf(i) >= 0 && s.map.indexOf(i) < 0) s.map.push(i);
            else if (s.step === 2 && i >= 0 && s.map.indexOf(i) >= 0 && d < 3) { s.soil[cx + ',' + cy] = d + 1; s.brushT = t; s.brushAt = [p[0] + CW / 2, p[1] + CH / 2]; if (d + 1 >= 3) s.found.push(i); }
          }
        }
        // الحبال والأوتاد ورموز الشبكة
        x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 2;
        for (var q = 0; q <= C; q++) { x.beginPath(); x.moveTo(X0 + q * CW, Y0); x.lineTo(X0 + q * CW, Y0 + R * CH); x.stroke(); }
        for (q = 0; q <= R; q++) { x.beginPath(); x.moveTo(X0, Y0 + q * CH); x.lineTo(X0 + C * CW, Y0 + q * CH); x.stroke(); }
        for (q = 0; q < C; q++) T(x, COL[q], X0 + (C - 1 - q) * CW + CW / 2, Y0 - 8, 16, '#5D4037');
        for (q = 0; q < R; q++) T(x, n(q + 1), X0 - 18, Y0 + q * CH + CH / 2 + 6, 16, '#5D4037');
        // الفرشاة والغبار
        if (s.brushT && t - s.brushT < 500) { var bp = s.brushAt, k5 = (t - s.brushT) / 500; x.save(); x.translate(bp[0] + Math.sin(k5 * 20) * 10, bp[1] - 10); x.rotate(-.7); x.fillStyle = '#8D6E63'; x.fillRect(0, -4, 50, 8); x.fillStyle = '#FBC02D'; rr(x, -16, -8, 18, 16, 3); x.fill(); x.restore(); for (var k6 = 0; k6 < 10; k6++) { x.fillStyle = 'rgba(200,160,100,' + (1 - k5) + ')'; x.beginPath(); x.arc(bp[0] + Math.cos(k6) * 30 * k5 * 2, bp[1] + Math.sin(k6 * 2) * 20 * k5 * 2, 3, 0, 7); x.fill(); } }
        // جهاز الرادار وشاشته
        if (s.scan >= 0 && s.scan < R && s.step === 0) {
          var pr = Math.min(1, (t - s.scanT) / 1600), ry = Y0 + s.scan * CH + CH / 2, rx = X0 + C * CW - pr * C * CW;
          x.fillStyle = 'rgba(37,99,235,.18)'; x.fillRect(rx, Y0 + s.scan * CH, X0 + C * CW - rx, CH);
          x.fillStyle = '#263238'; rr(x, rx - 22, ry - 16, 44, 32, 6); x.fill(); x.fillStyle = '#FF7043'; x.fillRect(rx - 22, ry - 4, 44, 8); x.strokeStyle = '#263238'; x.lineWidth = 4; x.beginPath(); x.moveTo(rx + 18, ry - 12); x.lineTo(rx + 44, ry - 44); x.stroke();
        }
        // شاشة الرادار (مقطع لباطن الأرض)
        var SX = 700, SY = 100; x.fillStyle = '#0B1220'; rr(x, SX, SY, 280, 170, 12); x.fill(); x.strokeStyle = '#334155'; x.lineWidth = 3; rr(x, SX, SY, 280, 170, 12); x.stroke();
        T(x, 'شاشة الرادار: مقطع تحت الأرض', SX + 140, SY + 24, 14, '#93C5FD');
        x.strokeStyle = 'rgba(148,163,184,.35)'; x.lineWidth = 1; for (q = 0; q < 6; q++) { x.beginPath(); x.moveTo(SX + 14, SY + 40 + q * 22); x.lineTo(SX + 266, SY + 40 + q * 22); x.stroke(); }
        if (s.scan >= 0) { var pr2 = s.scan < R ? Math.min(1, (t - s.scanT) / 1600) : 1; A.forEach(function (a) { if (a[1] !== s.scan) return; var fx = (C - 1 - a[0] + .5) / C; if (1 - pr2 > fx) return; var hx = SX + 14 + fx * 252, hy = SY + 85 + (a[0] % 3) * 18; x.strokeStyle = '#F87171'; x.lineWidth = 3; x.beginPath(); for (var u = -40; u <= 40; u += 4) { var yy = hy + u * u / 50; u === -40 ? x.moveTo(hx + u, yy) : x.lineTo(hx + u, yy); } x.stroke(); }); x.fillStyle = '#FDE68A'; x.fillRect(SX + 14 + (1 - pr2) * 252, SY + 36, 2, 126); }
        T(x, 'القوس الأحمر = جسم مدفون', SX + 140, SY + 160, 13, '#FCA5A5');
        // خريطة الموقع المرسومة
        var MX = 700, MY = 285; x.fillStyle = '#FFFDF5'; rr(x, MX, MY, 280, 165, 10); x.fill(); x.strokeStyle = '#D6C7A1'; x.lineWidth = 2; rr(x, MX, MY, 280, 165, 10); x.stroke();
        T(x, 'خريطة الموقع (مقياس الرسم: المربع = ١ م)', MX + 140, MY + 20, 13, '#5D4037');
        var mw = 30, mh = 28, mx0 = MX + 20, my0 = MY + 30; x.strokeStyle = '#BCAAA4'; x.lineWidth = 1;
        for (q = 0; q <= C; q++) { x.beginPath(); x.moveTo(mx0 + q * mw, my0); x.lineTo(mx0 + q * mw, my0 + R * mh); x.stroke(); }
        for (q = 0; q <= R; q++) { x.beginPath(); x.moveTo(mx0, my0 + q * mh); x.lineTo(mx0 + C * mw, my0 + q * mh); x.stroke(); }
        s.map.forEach(function (i, j) { var a = A[i], px = mx0 + (C - 1 - a[0]) * mw + mw / 2, py = my0 + a[1] * mh + mh / 2; x.fillStyle = '#DC2626'; x.beginPath(); x.arc(px, py, 9, 0, 7); x.fill(); T(x, n(j + 1), px, py + 5, 12, '#fff'); });
        if (s.photo) { var fp = (t - s.flash) / 700; if (fp < 1) { x.fillStyle = 'rgba(255,255,255,' + (1 - fp) + ')'; x.fillRect(0, 0, 1000, 470); } pill(x, '📷 وُثّقت القطع في مواقعها', 340, 435, 17, '#1E3A8A'); }
      }
    });
  };

  /* ===== الدرس الثاني: تأثير عدد مرات الري في نمو النبات (الشكل 7 والجدول 1) ===== */
  S.lab_plants = function (c, api) {
    var H = { a: [10.5, 10.7, 9.2, 5.1], b: [10.3, 11.2, 12.0, 12.4], c: [10.8, 12.6, 14.6, 15.5] };
    var W = [['أ', 'مرة واحدة عند بدء التجربة', 'a', 'once'], ['ب', 'يوميًّا', 'b', 'daily'], ['ج', 'مرة واحدة أسبوعيًّا', 'c', 'weekly']];
    var K = [['نوع النبات', '🌱'], ['حجمه', '📐'], ['نوع التربة', '🟫'], ['كمية التربة', '⚖'], ['مقدار الإضاءة', '💡']];
    var SC = 12, BASE = 395, XS = [150, 330, 510];
    function hNow(s, key) { if (!s.wk) return 10; var w = s.wk - 1, h = H[key][w]; if (s.anim) { var p = Math.min(1, (s.T - s.anim) / 2600), prev = w ? H[key][w - 1] : 10; return prev + (h - prev) * p; } return h; }
    function health(s, key) { var w = s.wk + (s.anim ? Math.min(1, (s.T - s.anim) / 2600) - 1 : 0); w = Math.max(0, w); return key === 'a' ? 1 - Math.min(1, w / 3.3) : key === 'b' ? 1 - Math.min(.62, w * .16) : 1; }
    function wiltOf(s, key) { var w = s.wk + (s.anim ? Math.min(1, (s.T - s.anim) / 2600) - 1 : 0); w = Math.max(0, w); return key === 'a' ? Math.min(1, Math.max(0, (w - 1.3) / 2.2)) : key === 'b' ? Math.min(.35, w * .09) : 0; }
    return lab(c, api, {
      init: function () { return { set: [0, 0, 0], waterT: -9999, waterAt: 0, kept: [], wk: 0, rows: [], anim: 0 }; },
      steps: [
        { say: 'المتغير المستقل هو عدد مرات الري: حدّد طريقة ري كل نبات من الأصص الثلاثة المتماثلة.', bind: function (s, b) { W.forEach(function (w, i) { addBtn(b, '💧 النبات (' + w[0] + '): ' + w[1], i, function (e) { s.set[i] = 1; s.waterT = s.T; s.waterAt = i; this.setAttribute('aria-pressed', 'true'); }); }); }, ok: function (s) { return s.set.every(Boolean) && s.T - s.waterT > 1300; } },
        { say: 'ثبّت العوامل الأخرى (الثوابت) حتى نختبر متغيرًا واحدًا فقط: اضغط على كل عامل.', bind: function (s, b) { K.forEach(function (k) { addBtn(b, '🔒 ' + k[0], k[0], function () { if (s.kept.indexOf(k[0]) < 0) s.kept.push(k[0]); this.setAttribute('aria-pressed', 'true'); }); }); }, ok: function (s) { return s.kept.length >= K.length; } },
        { say: 'نفّذ التجربة شهرًا كاملًا: في كل أسبوع يُروى كل نبات حسب جدوله، ثم قِس طول كل نبتة بالمسطرة (المتغير التابع).', btns: [['📅 نفّذ أسبوعًا ثم قِس الأطوال', function (s) { if (s.wk < 4 && !s.busy) { s.wk++; s.anim = s.T; s.busy = 1; setTimeout(function () { s.anim = 0; s.busy = 0; s.rows.push([s.wk, H.a[s.wk - 1].toFixed(1), H.b[s.wk - 1].toFixed(1), H.c[s.wk - 1].toFixed(1)]); }, 2700); } }]], ok: function (s) { return s.wk >= 4 && !s.busy && s.rows.length >= 4; } }
      ],
      end: function () { return 'النبات (أ) الذي رُوي مرة واحدة أصاب الذبول الشديد جميع أوراقه وقلّ طوله، و(ب) الذي رُوي يوميًّا أصاب الذبول معظم أوراقه، أما (ج) الذي رُوي أسبوعيًّا فنما جيدًا وأوراقه نضرة خضراء. <b>الاستنتاج:</b> المناسب لنمو هذا النبات – في ظل هذه الظروف – أن يُروى مرة واحدة كل أسبوع. (القياسات من الجدول 1 في الكتاب)'; },
      draw: function (x, s, t) {
        // نافذة وضوء متساوٍ ورف خشبي
        x.fillStyle = lg(x, 0, 0, 0, 470, [[0, '#E0F2FE'], [1, '#F8FAFC']]); x.fillRect(0, 0, 1000, 470);
        x.fillStyle = '#FFFFFF'; rr(x, 40, 20, 580, 210, 8); x.fill(); x.fillStyle = lg(x, 0, 30, 0, 220, [[0, '#93C5FD'], [1, '#DBEAFE']]); x.fillRect(52, 32, 556, 186); x.fillStyle = '#fff'; x.fillRect(326, 32, 8, 186);
        x.fillStyle = 'rgba(253,224,71,.16)'; x.beginPath(); x.moveTo(52, 32); x.lineTo(608, 32); x.lineTo(650, BASE); x.lineTo(20, BASE); x.closePath(); x.fill();
        wood(x, BASE, 75);
        W.forEach(function (w, i) {
          var X = XS[i], key = w[2], h = hNow(s, key);
          pot(x, X, BASE, ['C2703D', 'C2703D', 'C2703D'][i], w[0]);
          // التربة: رطوبة ومادة بيضاء للنبات (ب)
          var wet = key === 'b' && s.wk ? .5 : 0; if (wet) { x.fillStyle = 'rgba(30,20,10,.55)'; x.beginPath(); x.ellipse(X, BASE - 104, 58, 7, 0, 0, 7); x.fill(); var r = rnd(9); for (var q = 0; q < 10 * Math.min(1, s.wk / 2); q++) { x.fillStyle = 'rgba(255,255,255,.9)'; x.beginPath(); x.arc(X - 45 + r() * 90, BASE - 106 + r() * 5, 2.5, 0, 7); x.fill(); } x.fillStyle = 'rgba(96,165,250,.5)'; x.beginPath(); x.ellipse(X, BASE + 4, 70, 8, 0, 0, 7); x.fill(); }
          plant(x, X, BASE - 104, h, health(s, key), wiltOf(s, key), SC, i + 2);
          // أوراق ساقطة
          var fall = key === 'a' ? Math.floor(Math.max(0, s.wk - 1) * 1.4) : key === 'b' ? Math.floor(s.wk * .7) : 0; for (q = 0; q < fall; q++) { x.save(); x.translate(X - 60 - q * 14, BASE - 4); x.rotate(q); x.fillStyle = '#A1887F'; x.beginPath(); x.ellipse(0, 0, 12, 5, 0, 0, 7); x.fill(); x.restore(); }
          ruler(x, X + 64, BASE - 104, 16, SC, s.wk && !s.anim ? H[key][s.wk - 1] : null);
          if (s.set[i]) pill(x, '💧 ' + w[1], X, 258, 13, '#0F766E');
        });
        // سقي عند تحديد الجدول أو خلال الأسبوع
        if (s.T - s.waterT < 1300) { var X1 = XS[s.waterAt]; can(x, X1 + 60, 175, .5); drops(x, X1 + 2, 190, t, 70); }
        if (s.anim) { var p = (t - s.anim) / 2600, day = Math.min(7, 1 + Math.floor(p * 7)); var who = [1]; if (day === 1) who.push(2); var Xw = XS[who[Math.floor(t / 500) % who.length]]; if (p < .92) { can(x, Xw + 60, 175, .5); drops(x, Xw + 2, 190, t, 70); } pill(x, 'الأسبوع ' + n(s.wk) + ' · اليوم ' + n(day), 330, 290, 18, '#B45309'); }
        // الثوابت
        if (s.kept.length) { var kx = 610; K.forEach(function (k, j) { var ok = s.kept.indexOf(k[0]) >= 0; x.globalAlpha = ok ? 1 : .35; pill(x, (ok ? '🔒 ' : '') + k[0] + ' متساوٍ', 150 + (j % 3) * 180, 62 + Math.floor(j / 3) * 34, 14, ok ? '#334155' : '#94A3B8'); x.globalAlpha = 1; }); }
        // التقويم والجدول
        pill(x, 'الأسبوع: ' + n(s.wk) + ' / ٤', 820, 40, 18, '#0F766E');
        ctable(x, 655, 62, [70, 85, 85, 85], ['الأسبوع', 'النبات أ', 'النبات ب', 'النبات ج'], [1, 2, 3, 4].map(function (w) { var r2 = s.rows[w - 1]; return r2 ? r2 : [w, '', '', '']; }), { rh: 34, hc: '#0F766E', col: function (j, i) { return i === 3 ? '#15803D' : i === 1 ? '#B91C1C' : null; } });
        T(x, 'الجدول 1: طول النبات (سم)', 817, 255, 15, '#0F766E');
        if (s.wk >= 2) lens(x, 860, 360, 70, function (X, Y) { x.fillStyle = '#3E2723'; x.fillRect(X - 80, Y - 80, 160, 160); var r3 = rnd(4); for (var q = 0; q < 50; q++) { x.fillStyle = 'rgba(255,255,255,.92)'; x.beginPath(); x.arc(X - 60 + r3() * 120, Y - 50 + r3() * 100, 3 + r3() * 4, 0, 7); x.fill(); } T(x, 'مادة بيضاء ورطوبة', X, Y + 50, 13, '#FDE68A'); }, 'تربة النبات (ب)');
      }
    });
  };

  /* ===== الشكل 8: الفيلة والأصوات تحت السمعية ===== */
  S.elephants = function (c) {
    var cv = document.createElement('canvas'); cv.width = 1000; cv.height = 420; c.appendChild(cv); var x = cv.getContext('2d');
    var d = document.createElement('div'); d.className = 'ctrl'; d.innerHTML = '<button class="btn sm" data-p="0">🔊 شغّل التسجيل للقطيع الأول (على بعد ميلين)</button><button class="btn sm" data-p="1">🔇 القطيع الثاني: مجموعة ضابطة (دون صوت)</button><div class="read" id="elR">اختر تجربة…</div>'; c.appendChild(d);
    var st = [0, 0], t0 = 0, on = true;
    d.querySelectorAll('[data-p]').forEach(function (b) { b.onclick = function () { var i = +b.dataset.p; st[i] = 1; if (i === 0) t0 = performance.now(); d.querySelector('#elR').innerHTML = i === 0 ? 'القطيع الأول <b>نصب آذانه وسكن في مكانه</b> عند سماع الذبذبات المنخفضة جدًّا.' : 'المجموعة الضابطة لم تُعرَّض للصوت، و<b>سلكت سلوكًا عاديًّا</b> ولم تظهر أي استجابة.'; if (st[0] && st[1]) d.querySelector('#elR').innerHTML += '<br>✅ النتائج دعمت الفرضية: الفيلة تصدر أصواتًا تحت سمعية لتتواصل فيما بينها.'; }; });
    function ele(X, Y, s, ears, walk) {
      x.save(); x.translate(X, Y); x.scale(s, s); shadow(x, 0, 78, 95, 12, .25);
      var leg = function (lx, ph) { var o = walk ? Math.sin(walk + ph) * 6 : 0; x.fillStyle = '#5F6B78'; rr(x, lx + o * .3, 20, 24, 58, 10); x.fill(); x.fillStyle = '#4B5563'; rr(x, lx + o * .3 - 2, 70, 28, 10, 5); x.fill(); };
      leg(30, 0); leg(-55, 2);
      x.fillStyle = lg(x, 0, -60, 0, 50, [[0, '#9AA5B1'], [1, '#6B7684']]); x.beginPath(); x.ellipse(0, 0, 95, 60, 0, 0, 7); x.fill();
      leg(55, 1); leg(-30, 3);
      x.fillStyle = '#7B8794'; x.beginPath(); x.ellipse(-95, -30, 42, 40, 0, 0, 7); x.fill();
      x.fillStyle = lg(x, -100, -60, -60, 20, [[0, '#A7B1BC'], [1, '#7B8794']]); x.save(); x.translate(-82, -32); x.rotate(-ears * .7); x.beginPath(); x.ellipse(18 + ears * 18, 0, 30 + ears * 12, 40, 0, 0, 7); x.fill(); x.strokeStyle = 'rgba(0,0,0,.15)'; x.stroke(); x.restore();
      x.strokeStyle = '#7B8794'; x.lineWidth = 18; x.lineCap = 'round'; x.beginPath(); x.moveTo(-128, -18); x.quadraticCurveTo(-150, 30, -135, 70); x.stroke(); x.lineCap = 'butt';
      x.fillStyle = '#F5F5F4'; x.beginPath(); x.moveTo(-118, -2); x.quadraticCurveTo(-140, 12, -150, 4); x.lineTo(-116, 6); x.fill();
      x.fillStyle = '#111'; x.beginPath(); x.arc(-108, -40, 4, 0, 7); x.fill();
      x.restore();
    }
    (function loop(t) {
      if (!on) return;
      x.fillStyle = lg(x, 0, 0, 0, 420, [[0, '#FDE7B0'], [.45, '#F6D58A'], [.46, '#C9B458'], [1, '#9AA84A']]); x.fillRect(0, 0, 1000, 420);
      x.fillStyle = '#6B8E23'; [[120, 175], [880, 170]].forEach(function (tr) { x.fillStyle = '#7B5A3A'; x.fillRect(tr[0] - 4, tr[1], 8, 30); x.fillStyle = '#5E7D2A'; x.beginPath(); x.ellipse(tr[0], tr[1], 60, 16, 0, 0, 7); x.fill(); });
      x.strokeStyle = 'rgba(255,255,255,.6)'; x.setLineDash([8, 8]); x.lineWidth = 3; x.beginPath(); x.moveTo(500, 60); x.lineTo(500, 400); x.stroke(); x.setLineDash([]);
      pill(x, 'القطيع الأول (يسمع التسجيل)', 230, 36, 17, '#3F6212'); pill(x, 'القطيع الثاني (مجموعة ضابطة)', 790, 36, 17, '#78350F');
      var e1 = st[0] ? Math.min(1, (t - t0) / 700) : 0;
      ele(250, 245, .85, e1, st[0] ? 0 : t / 260); ele(390, 300, .7, e1, st[0] ? 0 : t / 240 + 1);
      ele(700, 245, .85, 0, st[1] ? t / 260 : t / 260); ele(850, 300, .7, 0, t / 250 + 2);
      if (st[0]) {
        x.strokeStyle = 'rgba(37,99,235,.7)'; x.lineWidth = 4; for (var k = 0; k < 4; k++) { var rp = ((t / 1100) + k / 4) % 1; x.globalAlpha = 1 - rp; x.beginPath(); x.arc(30, 250, 40 + rp * 330, -0.55, 0.55); x.stroke(); } x.globalAlpha = 1;
        x.fillStyle = '#1F2937'; rr(x, 8, 225, 44, 50, 6); x.fill(); x.fillStyle = '#9CA3AF'; x.beginPath(); x.arc(30, 250, 14, 0, 7); x.fill();
        pill(x, 'على بعد ميلين', 150, 395, 15, '#1E3A8A');
        if (e1 >= 1) { pill(x, 'نصبت آذانها وسكنت!', 250, 160, 17, '#B91C1C'); }
      }
      // مخطط الترددات
      var GX = 400, GY = 56; x.fillStyle = 'rgba(15,23,42,.85)'; rr(x, GX, GY, 200, 110, 10); x.fill(); T(x, 'التردد', GX + 100, GY + 20, 13, '#E2E8F0');
      x.fillStyle = 'rgba(34,197,94,.35)'; x.fillRect(GX + 12, GY + 30, 176, 42); T(x, 'مدى سمع الإنسان', GX + 100, GY + 56, 12, '#DCFCE7');
      x.fillStyle = 'rgba(248,113,113,.5)'; x.fillRect(GX + 12, GY + 76, 176, 24); T(x, 'تحت سمعي: الفيلة', GX + 100, GY + 93, 12, '#FEE2E2');
      requestAnimationFrame(loop);
    })(performance.now());
    return function () { on = false; };
  };

  /* ===== الاستقصاء: نمذجة موقع للتنقيب عن الآثار وتبادله مع مجموعة أخرى ===== */
  S.lab_site = function (c, api) {
    var C = 6, R = 4, X0 = 70, Y0 = 85, CW = 86, CH = 74;
    var IT = [['hearth', 'موقد للطبخ'], ['pit', 'حفرة نفايات'], ['wall', 'جدار واقٍ'], ['water', 'مصدر مياه'], ['tool', 'أداة']];
    var OTHER = [[1, 0, 0], [4, 1, 1], [2, 2, 2], [0, 3, 3], [5, 3, 4]];
    var COL = 'أبجدهو';
    function item(x, k, X, Y) {
      if (k === 0) { for (var i = 0; i < 8; i++) { var a = i / 8 * 7; x.fillStyle = '#8D8D8D'; x.beginPath(); x.arc(X + Math.cos(a) * 22, Y + Math.sin(a) * 16, 7, 0, 7); x.fill(); } x.fillStyle = '#3E2723'; x.beginPath(); x.ellipse(X, Y, 14, 9, 0, 0, 7); x.fill(); x.fillStyle = '#FF7043'; x.beginPath(); x.moveTo(X - 6, Y); x.quadraticCurveTo(X, Y - 22, X + 6, Y); x.fill(); }
      else if (k === 1) { x.fillStyle = '#3F2A14'; x.beginPath(); x.ellipse(X, Y, 28, 18, 0, 0, 7); x.fill(); x.fillStyle = '#795548'; x.beginPath(); x.ellipse(X, Y - 3, 20, 11, 0, 0, 7); x.fill(); x.fillStyle = '#E0D6C2'; x.fillRect(X - 6, Y - 5, 12, 4); }
      else if (k === 2) { for (var j = 0; j < 3; j++) { x.fillStyle = j % 2 ? '#A1452B' : '#B85A3A'; x.fillRect(X - 34 + j * 23, Y - 10, 21, 10); x.fillRect(X - 23 + j * 23, Y + 1, 21, 10); } }
      else if (k === 3) { x.fillStyle = rg(x, X, Y, 2, 30, [[0, '#7DD3FC'], [1, '#0369A1']]); x.beginPath(); x.ellipse(X, Y, 30, 18, 0, 0, 7); x.fill(); x.strokeStyle = 'rgba(255,255,255,.6)'; x.beginPath(); x.ellipse(X - 6, Y - 4, 12, 4, 0, 0, 7); x.stroke(); }
      else { x.fillStyle = '#616161'; x.beginPath(); x.moveTo(X - 4, Y - 22); x.quadraticCurveTo(X + 16, Y - 4, X + 4, Y + 18); x.lineTo(X - 6, Y + 18); x.quadraticCurveTo(X - 18, Y - 4, X - 4, Y - 22); x.fill(); }
    }
    function cell(s, P) { if (!P) return null; var cx = C - 1 - Math.floor((P[0] - X0) / CW), cy = Math.floor((P[1] - Y0) / CH); return P[0] >= X0 && cx >= 0 && cx < C && cy >= 0 && cy < R ? [cx, cy] : null; }
    function mapDraw(x, X, Y, title, list, col) {
      x.fillStyle = '#FFFDF5'; rr(x, X, Y, 200, 170, 10); x.fill(); x.strokeStyle = '#D6C7A1'; x.lineWidth = 2; rr(x, X, Y, 200, 170, 10); x.stroke(); T(x, title, X + 100, Y + 22, 14, '#5D4037');
      var mw = 28, mh = 28, mx = X + 16, my = Y + 34; x.strokeStyle = '#BCAAA4'; x.lineWidth = 1;
      for (var q = 0; q <= C; q++) { x.beginPath(); x.moveTo(mx + q * mw, my); x.lineTo(mx + q * mw, my + R * mh); x.stroke(); }
      for (q = 0; q <= R; q++) { x.beginPath(); x.moveTo(mx, my + q * mh); x.lineTo(mx + C * mw, my + q * mh); x.stroke(); }
      list.forEach(function (m) { x.fillStyle = col; x.beginPath(); x.arc(mx + (C - 1 - m[0]) * mw + mw / 2, my + m[1] * mh + mh / 2, 8, 0, 7); x.fill(); T(x, n(m[2] + 1), mx + (C - 1 - m[0]) * mw + mw / 2, my + m[1] * mh + mh / 2 + 4, 10, '#fff'); });
    }
    return lab(c, api, {
      init: function () { return { typ: 0, mine: [], sand: 0, sandT: 0, swap: 0, dug: {}, found: [] }; },
      steps: [
        { say: 'صمّم موقعك داخل الصندوق الشفاف: اختر نوع البقايا ثم اضغط على مربع لوضعها (منطقة عاش فيها ناس). ضع القطع الخمس.', bind: function (s, b) { IT.forEach(function (t, i) { addBtn(b, ['🔥', '⚫', '🧱', '💧', '🪓'][i] + ' ' + t[1], i, function () { pick(b, s, 'typ', i); }); }); pick(b, s, 'typ', 0); }, ok: function (s) { return s.mine.length >= 5; } },
        { say: 'سُجّلت خريطة موقعك بمقياس رسم (المربع = ١ م). غطِّ موقعك بالرمل.', btns: [['⏳ غطِّ بالرمل', function (s) { s.sand = 1; s.sandT = s.T; }]], ok: function (s) { return s.sand && s.T - s.sandT > 1400; } },
        { say: 'استبدل بنموذجك نموذج مجموعة أخرى، واحتفظ بخريطتك مؤقتًا.', btns: [['🔄 تبادل النماذج', function (s) { s.swap = 1; }]], ok: function (s) { return s.swap; } },
        { say: 'اكشف الموقع ببطء بالفرشاة: اضغط على المربع مرتين لإزالة الرمل، وتُرسم كل قطعة تكتشفها على خريطتك.', ok: function (s) { return s.found.length >= OTHER.length; } }
      ],
      end: function () { return 'تطابقت خريطتك مع خريطة المجموعة التي صممت الموقع لأنك سجّلت موقع كل قطعة بدقة وبمقياس الرسم نفسه. ساعدتك <b>الخريطة</b> على حفظ معلومات الموقع بعد التنقيب، و<b>الكشف البطيء بالفرشاة</b> على عدم الإضرار بالقطع؛ وهكذا يعمل علماء الآثار.'; },
      draw: function (x, s, t) {
        x.fillStyle = lg(x, 0, 0, 0, 470, [[0, '#F1F5F9'], [1, '#E2E8F0']]); x.fillRect(0, 0, 1000, 470); wood(x, 420, 50);
        // الصندوق الشفاف بمنظور
        var BW = C * CW, BH = R * CH; x.fillStyle = 'rgba(148,163,184,.25)'; x.beginPath(); x.moveTo(X0 - 14, Y0 - 18); x.lineTo(X0 + BW + 14, Y0 - 18); x.lineTo(X0 + BW, Y0); x.lineTo(X0, Y0); x.closePath(); x.fill();
        sand(x, X0, Y0, BW, BH, s.swap ? 21 : 13, s.swap ? '#D9B48F' : '#DDB98F');
        var list = s.swap ? OTHER.map(function (o) { return o; }) : s.mine;
        var cov = s.sand ? Math.min(1, (t - s.sandT) / 1400) : 0;
        for (var cy = 0; cy < R; cy++) for (var cx = 0; cx < C; cx++) {
          var X = X0 + (C - 1 - cx) * CW, Y = Y0 + cy * CH, d = s.dug[cx + ',' + cy] || 0;
          var it = -1; list.forEach(function (m) { if (m[0] === cx && m[1] === cy) it = m[2]; });
          if (it >= 0) item(x, it, X + CW / 2, Y + CH / 2);
          var cover = s.swap ? (d >= 2 ? 0 : d ? .55 : 1) : cov;
          if (cover > 0) { x.globalAlpha = cover; sand(x, X + 1, Y + 1, CW - 2, CH - 2, cx * 7 + cy, '#F2D49B'); x.globalAlpha = 1; }
          if (!s.sand && !s.swap) T(x, COL[cx] + n(cy + 1), X + 16, Y + 16, 11, '#64748B');
          var hv = s.hover && s.hover[0] > X && s.hover[0] < X + CW && s.hover[1] > Y && s.hover[1] < Y + CH; if (hv && (s.step === 0 || s.step === 3)) { x.strokeStyle = '#FACC15'; x.lineWidth = 3; x.strokeRect(X + 2, Y + 2, CW - 4, CH - 4); }
        }
        x.strokeStyle = 'rgba(100,116,139,.35)'; x.lineWidth = 1; for (var q = 1; q < C; q++) { x.beginPath(); x.moveTo(X0 + q * CW, Y0); x.lineTo(X0 + q * CW, Y0 + BH); x.stroke(); } for (q = 1; q < R; q++) { x.beginPath(); x.moveTo(X0, Y0 + q * CH); x.lineTo(X0 + BW, Y0 + q * CH); x.stroke(); }
        x.strokeStyle = 'rgba(148,163,184,.9)'; x.lineWidth = 4; x.strokeRect(X0, Y0, BW, BH); x.fillStyle = 'rgba(255,255,255,.12)'; x.fillRect(X0, Y0 + BH - 30, BW, 30);
        pill(x, s.swap ? 'نموذج المجموعة الأخرى' : 'صندوق النموذج: موقعي', X0 + BW / 2, 40, 18, s.swap ? '#9A3412' : '#1E3A8A');
        var cl = cell(s, s.click);
        if (cl) {
          var k2 = cl[0] + ',' + cl[1];
          if (s.step === 0 && s.mine.length < 5 && !s.mine.some(function (m) { return m[0] === cl[0] && m[1] === cl[1]; })) s.mine.push([cl[0], cl[1], s.typ]);
          else if (s.step === 3) { s.dug[k2] = (s.dug[k2] || 0) + 1; s.brushT = t; s.brushAt = [X0 + (C - 1 - cl[0]) * CW + CW / 2, Y0 + cl[1] * CH + CH / 2]; if (s.dug[k2] === 2) OTHER.forEach(function (o, i) { if (o[0] === cl[0] && o[1] === cl[1] && s.found.indexOf(i) < 0) s.found.push(i); }); }
        }
        if (s.brushT && t - s.brushT < 450) { var bp = s.brushAt, k5 = (t - s.brushT) / 450; x.save(); x.translate(bp[0] + Math.sin(k5 * 18) * 12, bp[1] - 8); x.rotate(-.7); x.fillStyle = '#8D6E63'; x.fillRect(0, -4, 54, 8); x.fillStyle = '#E53935'; rr(x, -18, -9, 20, 18, 4); x.fill(); x.restore(); }
        // الخرائط
        mapDraw(x, 590, 60, 'خريطتي لموقعي', s.mine.map(function (m) { return m; }), '#1E3A8A');
        if (s.swap) mapDraw(x, 790, 60, 'خريطتي في أثناء التنقيب', s.found.map(function (i) { return OTHER[i]; }), '#9A3412');
        var legend = IT.map(function (it, i) { return [it[1]]; });
        x.fillStyle = '#fff'; rr(x, 590, 245, 400, 160, 10); x.fill(); T(x, 'مفتاح الخريطة', 790, 268, 14, '#334155');
        IT.forEach(function (it, i) { var lx = 955 - (i % 2) * 195, ly = 298 + Math.floor(i / 2) * 40; x.save(); x.translate(lx, ly); x.scale(.55, .55); item(x, i, 0, 0); x.restore(); T(x, n(i + 1) + '. ' + it[1], lx - 28, ly + 6, 15, '#0F172A', 'right'); });
        if (s.swap) pill(x, 'المكتشَف: ' + n(s.found.length) + ' / ' + n(OTHER.length), 790, 440, 16, '#0F766E');
        T(x, 'مقياس الرسم: المربع = ١ م', 330, 445, 14, '#475569');
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
