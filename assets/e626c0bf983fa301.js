
/* استراتيجيات أسماء الطلاب: الشعب والأسماء، عجلة الأسماء، سحب القرعة، الكرسي الساخن، المجموعات العشوائية، لوحة الشرف، و«من يجيب؟» */

/* ===== كشف الطلاب الموحّد لكل المنصة (الدروس والأنشطة والمسابقات وأوراق العمل) — durus-classes ===== */
window.DROS = window.DROS || (function () {
  var AR = '٠١٢٣٤٥٦٧٨٩', KEY = 'durus-classes', API = 'https://script.google.com/macros/s/AKfycbxp-t4JgGO5WiK6hoacjTyBqFnG-9bSWClplOpVV4VDuTV7T4tY0swB1Ll36kr_djJ7nQ/exec';
  var LISTS = [['1/1', '2/1', '3/1', '4/1'], ['1/3', '2/3', '3/3', '4/3']];
  function kz(k) { return String(k == null ? '' : k).replace(/\s/g, '').replace(/\d/g, function (d) { return AR[d]; }); }
  function nz(s) { return String(s).replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/\s+بن\s+/g, ' ').replace(/\s+/g, ' ').trim(); }
  function ld() { try { var s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.classes) return { cur: s.cur || '', classes: s.classes || {}, stars: s.stars || {}, moves: s.moves || {} }; } catch (e) {} return { cur: '', classes: {}, stars: {}, moves: {} }; }
  function sv(D) { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) {} }
  function flag(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function findKey(D, k) { var ks = Object.keys(D.classes); for (var i = 0; i < ks.length; i++) if (kz(ks[i]) === kz(k)) return ks[i]; return null; }
  function move(D, nm, from, to) {
    var a = D.classes[from] || [], i = a.indexOf(nm); if (i < 0 || from === to) return false;
    a.splice(i, 1); D.classes[to] = D.classes[to] || []; if (D.classes[to].indexOf(nm) < 0) D.classes[to].push(nm);
    var s1 = D.stars[from + '|' + nm]; if (s1) { D.stars[to + '|' + nm] = (D.stars[to + '|' + nm] || 0) + s1; delete D.stars[from + '|' + nm]; }
    return true;
  }
  // تطبيق عمليات النقل المحفوظة (حتى لا يرجع الطالب لشعبته القديمة عند تحميل الكشوف من جديد)
  function applyMoves(D) {
    var ch = false, rule = !flag('durus-rule-off');
    Object.keys(D.classes).forEach(function (from) {
      (D.classes[from] || []).slice().forEach(function (nm) {
        var to = D.moves[nz(nm)];
        // طلب المعلم: محمد سامي الدليم من ١/١ إلى ٣/١
        if (!to && rule && kz(from) === '١/١') { var z = nz(nm); if (z.indexOf('محمد سامي') === 0 && z.indexOf('الدليم') > 0) to = '٣/١'; }
        if (to) { to = findKey(D, to) || kz(to); if (to !== from && move(D, nm, from, to)) ch = true; }
      });
    });
    return ch;
  }
  // دمج الأسماء التي حُمّلت سابقًا داخل الدروس (مرة واحدة)
  function bootstrap(D) {
    if (flag('durus-roster-merged')) return false; var ch = false;
    LISTS.forEach(function (L) {
      var C = null; try { C = JSON.parse(localStorage.getItem('strat-roster-' + L.join('_') + '-classes') || 'null'); } catch (e) {}
      (C || []).forEach(function (x) { if (x && x.s && x.s.length) { var k = kz(x.n); if (!findKey(D, k)) { D.classes[k] = x.s.slice(); ch = true; } } });
    });
    if (applyMoves(D)) ch = true;
    flag('durus-roster-merged', '1'); return ch;
  }
  function load() { var D = ld(); if (bootstrap(D)) sv(D); if (D.cur && !D.classes[D.cur]) D.cur = Object.keys(D.classes)[0] || ''; if (!D.cur) D.cur = Object.keys(D.classes)[0] || ''; return D; }
  function jsonp(params, cb) {
    var name = 'drosCb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8), sc = document.createElement('script'), fin = false;
    var q = Object.keys(params).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); }).join('&') + '&callback=' + name + '&_=' + Date.now();
    function end(r) { if (fin) return; fin = true; clearTimeout(t); try { sc.remove(); } catch (e) {} try { delete window[name]; } catch (e) {} cb(r); }
    var t = setTimeout(function () { end(null); }, 30000); window[name] = function (d) { end(d); }; sc.onerror = function () { end(null); }; sc.src = API + '?' + q; document.head.appendChild(sc);
  }
  // تحميل كشوف الفصول من منصة رحلة العلوم لكل الصفوف
  function importAll(cb) {
    var all = LISTS[0].concat(LISTS[1]), G = {}, done = 0, okc = 0;
    all.forEach(function (k) {
      jsonp({ action: 'getStudents', className: k }, function (r) {
        if (r && r.ok) okc++;
        var ok = r && r.ok && Array.isArray(r.students) && (r.className == null || String(r.className) === String(k));
        var arr = ok ? r.students.filter(Boolean) : [], cf = function (x) { return x.className != null ? x.className : x['class']; };
        var mine = arr.filter(function (x) { return cf(x) != null && String(cf(x)) === String(k); });
        var ss = (mine.length ? mine : arr).map(function (x) { return String(x.name || '').trim(); }).filter(Boolean);
        if (ss.length) G[k] = ss;
        if (++done === all.length) {
          var got = all.filter(function (k) { return G[k]; });
          if (got.length) {
            var D = ld();
            got.forEach(function (k) { var ex = findKey(D, k); if (ex && ex !== kz(k)) delete D.classes[ex]; D.classes[kz(k)] = G[k].slice(); });
            applyMoves(D); if (!D.cur || !D.classes[D.cur]) D.cur = kz(got[0]); sv(D); flag('durus-roster-merged', '1'); flag('durus-roster-at', String(Date.now()));
          }
          cb(got.map(function (k) { return kz(k) + ' (' + kz(G[k].length) + ')'; }), okc > 0);
        }
      });
    });
  }
  return { kz: kz, nz: nz, load: load, save: sv, move: move, findKey: findKey, applyMoves: applyMoves, importAll: importAll, flag: flag, LISTS: LISTS };
})();

window.STU = (function () {
  var AR = '٠١٢٣٤٥٦٧٨٩';
  function n(x) { return String(x).replace(/\d/g, function (d) { return AR[d]; }); }
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var KEY = 'durus-classes';
  var D = DROS.load();
  function save() { DROS.save(D); }
  function sync() { D = DROS.load(); }
  var kz = DROS.kz;
  function findKey(list) { for (var i = 0; i < list.length; i++) { var k = DROS.findKey(D, list[i]); if (k) return k; } return null; }
  function moveStudent(nm, from, to) { var ok = DROS.move(D, nm, from, to); if (ok) D.moves[DROS.nz(nm)] = to; return ok; }
  function migrate() { if (DROS.applyMoves(D)) save(); }
  migrate();
  function names() { sync(); return (D.classes[D.cur] || []).slice(); }
  var pool = [], groups = null, onGroups = null;
  function nextName() { var all = names(); if (!all.length) return null; pool = pool.filter(function (x) { return all.indexOf(x) >= 0; }); if (!pool.length) pool = shuffle(all); return pool.pop(); }
  function star(nm, d) { sync(); var k = D.cur + '|' + nm; D.stars[k] = Math.max(0, (D.stars[k] || 0) + d); save(); }
  function stars(nm) { return D.stars[D.cur + '|' + nm] || 0; }
  function arm(btn, label, fn) { btn.onclick = function () { if (btn.dataset.arm) { fn(); return; } var o = btn.textContent; btn.dataset.arm = '1'; btn.textContent = label; btn.style.background = '#DC2626'; btn.style.color = '#fff'; setTimeout(function () { if (btn.isConnected && btn.dataset.arm) { delete btn.dataset.arm; btn.textContent = o; btn.style.background = ''; btn.style.color = ''; } }, 4000); }; }
  var msg = '', autoTried = false;
  var COLS = ['#DC2626', '#2563EB', '#16A34A', '#CA8A04', '#7C3AED', '#0891B2'];

  // ---------- النافذة ----------
  var TABS = [['cls', '📋 الشعب والأسماء'], ['wheel', '🎡 عجلة الأسماء'], ['draw', '🎟 سحب القرعة'], ['hot', '🔥 الكرسي الساخن'], ['web', '🕸 شبكة العنكبوت'], ['heads', '🔢 الرؤوس المرقمة'], ['duel', '⚔ تحدّي الثنائي'], ['grp', '👥 المجموعات'], ['hon', '⭐ لوحة الشرف']];
  function open(tab) {
    sync(); migrate();
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
      body.innerHTML = '<div class="stu-row"><label>الشعبة: <select class="stu-sel">' + ks.map(function (k) { return '<option' + (k === D.cur ? ' selected' : '') + '>' + esc(k) + '</option>'; }).join('') + '<option value="__new">➕ شعبة جديدة…</option></select></label><input class="stu-new" placeholder="مثال: ٤/١" hidden><button class="b stu-del">🗑 حذف الشعبة</button><button class="b c stu-imp">⬇ تحميل كشوف الفصول من المنصة</button></div><p class="stu-impm stu-note" style="margin:0"></p>' +
        '<label class="stu-lab">أسماء الطلاب (اسم في كل سطر):</label><textarea class="stu-ta" rows="9" placeholder="أحمد محمد&#10;خالد علي&#10;…"></textarea><div class="stu-row"><button class="b c stu-save">💾 حفظ الأسماء</button><span class="stu-cnt"></span></div>' +
        '<div class="stu-row stu-mv"' + (names().length ? '' : ' hidden') + ' style="background:#F1F5F9;border-radius:12px;padding:8px 10px"><label>🔀 نقل طالب: <select class="stu-mn">' + names().map(function (x) { return '<option>' + esc(x) + '</option>'; }).join('') + '</select></label><label>إلى الشعبة: <select class="stu-mt">' + ks.filter(function (k) { return k !== D.cur; }).map(function (k) { return '<option>' + esc(k) + '</option>'; }).join('') + '<option value="__new">➕ شعبة جديدة…</option></select></label><input class="stu-mtn" placeholder="مثال: ٣/١" hidden><button class="b c stu-mvb">نقل</button></div>' +
        '<p class="stu-note">تُحفظ الأسماء في هذا الجهاز فقط، وتظهر في جميع الدروس والأنشطة والمسابقات. لحذف طالب: احذف سطره ثم «حفظ الأسماء».</p>' +
        '<div class="stu-row" style="border-top:2px dashed var(--line);padding-top:10px"><button class="b stu-year">🗓 سنة دراسية جديدة: حذف جميع الشعب والأسماء</button></div>';
      var sel = body.querySelector('.stu-sel'), nw = body.querySelector('.stu-new'), ta = body.querySelector('.stu-ta');
      function load() { ta.value = (D.classes[D.cur] || []).join('\n'); body.querySelector('.stu-cnt').textContent = (D.cur ? n((D.classes[D.cur] || []).length) + ' طالبًا' : '') + (msg ? '  ' + msg : ''); msg = ''; }
      var imb = body.querySelector('.stu-imp'), imm = body.querySelector('.stu-impm');
      function doImp() { imb.disabled = true; imm.textContent = 'جاري تحميل الكشوف…'; DROS.importAll(function (got, ok) { sync(); pool = []; msg = got.length ? '✓ تم تحميل: ' + got.join('، ') : (ok ? 'لا توجد أسماء مسجلة في المنصة بعد.' : 'تعذّر التحميل، تأكد من الاتصال بالإنترنت.'); if (imb.isConnected) show('cls'); }); }
      imb.onclick = doImp;
      if (!ks.length && !DROS.flag('durus-roster-at') && !autoTried) { autoTried = true; doImp(); }
      var mt = body.querySelector('.stu-mt'), mtn = body.querySelector('.stu-mtn');
      if (mt.value === '__new') mtn.hidden = false;
      mt.onchange = function () { mtn.hidden = mt.value !== '__new'; if (!mtn.hidden) mtn.focus(); };
      body.querySelector('.stu-mvb').onclick = function () {
        sync(); var nm = body.querySelector('.stu-mn').value, to = mt.value === '__new' ? kz(mtn.value) : mt.value; if (!nm) return; if (!to) { mtn.focus(); return; }
        var ex = findKey([kz(to)]); if (ex) to = ex;
        if (moveStudent(nm, D.cur, to)) { save(); pool = []; msg = '✓ نُقل «' + nm + '» إلى الشعبة ' + to; }
        show('cls');
      };
      arm(body.querySelector('.stu-year'), '⚠ اضغط مرة أخرى للتأكيد: سيُحذف كل شيء', function () { D = { cur: '', classes: {}, stars: {}, moves: {} }; try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf('strat-roster-') === 0 && /-classes$|-curName$|-usedN$/.test(k)) localStorage.removeItem(k); }); localStorage.removeItem('durus-roster-at'); } catch (e) {} DROS.flag('durus-roster-merged', '1'); DROS.flag('durus-rule-off', '1'); pool = []; groups = null; save(); msg = '✓ بدأت سنة جديدة، أضف الشعب الجديدة'; show('cls'); });
      if (!ks.length) { sel.value = '__new'; nw.hidden = false; }
      sel.onchange = function () { if (sel.value === '__new') { nw.hidden = false; nw.focus(); ta.value = ''; } else { nw.hidden = true; sync(); D.cur = sel.value; pool = []; save(); load(); show('cls'); } };
      body.querySelector('.stu-save').onclick = function () {
        sync(); var k = sel.value === '__new' ? nw.value.trim() : D.cur; if (!k) { nw.focus(); return; }
        k = k.replace(/\d/g, function (d) { return AR[d]; });
        D.classes[k] = ta.value.split(/\n|،|,/).map(function (x) { return x.trim(); }).filter(Boolean); D.cur = k; pool = []; save(); show('cls');
      };
      arm(body.querySelector('.stu-del'), '⚠ اضغط مرة أخرى لحذف الشعبة', function () { sync(); if (!D.cur || !D.classes[D.cur]) return; var c = D.cur; delete D.classes[c]; Object.keys(D.stars).forEach(function (k) { if (k.indexOf(c + '|') === 0) delete D.stars[k]; }); D.cur = Object.keys(D.classes)[0] || ''; pool = []; save(); show('cls'); });
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
  // صوت خفيف لدوران الأسماء والتوقف
  var AC = null;
  function beep(f, d, v) { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); var t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v || 0.08, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + d + 0.05); } catch (e) {} }
  if (!document.getElementById('stu-spin-css')) { var cs = document.createElement('style'); cs.id = 'stu-spin-css'; cs.textContent = '.stu-badge b.sp{display:inline-block;min-width:8em;opacity:.75;filter:blur(.4px)}.stu-badge b.go{display:inline-block;animation:stuPop .45s cubic-bezier(.2,1.6,.4,1)}@keyframes stuPop{0%{transform:scale(.6)}60%{transform:scale(1.25)}100%{transform:scale(1)}}'; document.head.appendChild(cs); }
  // «من يجيب؟»: الأسماء تدور ثم تتوقف عند اسم واحد (مثل الدروس)
  function who(card) {
    var nm = nextName(); if (!nm) { open('cls'); return; }
    var all = names(), old = card.querySelector('.stu-badge'); if (old) { if (old._spin) return; old.remove(); }
    var b = el('div', 'stu-badge', '<span>🎯 يجيب الآن:</span> <b class="sp">…</b> <button aria-label="نجمة" disabled>⭐</button> <button aria-label="طالب آخر" disabled>🔄</button>');
    var nmEl = b.querySelector('b'), bs = b.querySelectorAll('button'), k = 0, steps = 16;
    b._spin = true; card.insertBefore(b, card.firstChild);
    (function spin() {
      if (++k <= steps) { var x = all[Math.floor(Math.random() * all.length)]; if (all.length > 1) while (x === nmEl.textContent) x = all[Math.floor(Math.random() * all.length)]; nmEl.textContent = x; beep(520 + k * 18, 0.05); setTimeout(spin, 45 + k * k * 1.1); return; }
      nmEl.textContent = '🎓 ' + nm; nmEl.className = 'go'; b._spin = false; bs[0].disabled = bs[1].disabled = false;
      beep(660, 0.12, 0.1); setTimeout(function () { beep(990, 0.18, 0.1); }, 110);
    })();
    bs[0].onclick = function () { star(nm, 1); this.textContent = '⭐ +١'; this.disabled = true; };
    bs[1].onclick = function () { who(card); };
  }
  return { open: open, who: who, has: function () { return names().length > 0; }, groups: function () { return groups; }, onGroups: function (f) { onGroups = f; } };
})();
/* ===== 🎯 من يجيب؟ عند كل سؤال (يستخدم كشف الفصول المشترك durus-classes) ===== */
(function(){
  var SEL='.opts,.qopts,.k1q,.k1r';
  function mk(box){var bar=document.createElement('div');bar.className='qpbar';
    bar.innerHTML='<button type="button" class="qpb">🎯 من يجيب؟</button><button type="button" class="qpc" title="الفصول والأسماء">🏫 الفصول</button>';
    bar.querySelector('.qpb').onclick=function(e){e.stopPropagation();if(window.STU)STU.who(box)};
    bar.querySelector('.qpc').onclick=function(e){e.stopPropagation();if(window.STU)STU.open('cls')};return bar}
  function deco(){var L=document.querySelectorAll(SEL);for(var i=0;i<L.length;i++){var o=L[i];if(o.getAttribute('data-qp')||o.closest('.stu-bg'))continue;o.setAttribute('data-qp','1');o.parentNode.insertBefore(mk(o.parentNode),o)}
    var B=document.querySelectorAll('button');for(var j=0;j<B.length;j++){var bt=B[j];if(bt.getAttribute('data-qp')||!/^[\s✓✔]*تحق/.test(bt.textContent)||bt.textContent.length>40||bt.closest('.stu-bg,.qpbar'))continue;bt.setAttribute('data-qp','1');
      var blk=bt.closest('form,.qa,.row-actions'),box,ref;if(blk&&blk.parentElement){box=blk.parentElement;ref=blk}else{box=bt.parentElement;ref=bt}
      if(!box||box.querySelector('.qpbar'))continue;box.insertBefore(mk(box),ref)}}
  var tm=0;new MutationObserver(function(){if(!tm)tm=setTimeout(function(){tm=0;deco()},80)}).observe(document.body,{childList:true,subtree:true});setTimeout(deco,300);
})();

