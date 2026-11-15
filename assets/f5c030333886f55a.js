/* محرك دروس الفصل الدراسي الثاني — يقرأ بيانات الدرس من window.LESSON ويبني المراحل التفاعلية */
(function () {
  'use strict';
  var L = window.LESSON, SIMS = window.SIMS || {};
  var AR = '٠١٢٣٤٥٦٧٨٩';
  function n(x) { return String(x).replace(/\d/g, function (d) { return AR[d]; }); }
  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  // تحويل الأرقام إلى العربية في نصوص الدرس
  var SKIP = { img: 1, kind: 1, t: 1, k: 1, theme: 1, id: 1, href: 1, chapterKey: 1, c: 1, cls: 1 };
  function ar(s) { return s.replace(/(\d)\.(\d)/g, '$1٫$2').replace(/%/g, '٪').replace(/\d/g, function (d) { return AR[d]; }); }
  (function walk(o) { Object.keys(o).forEach(function (k) { var v = o[k]; if (typeof v === 'string') { if (!SKIP[k] || (k === 't' && /[\u0600-\u06FF]/.test(v))) o[k] = ar(v); } else if (v && typeof v === 'object' && k !== 'theme') walk(v); }); })(L);
  var KEY = 'durus-s2-' + L.id;
  var ST = { stage: 0, visited: {}, correct: 0, tried: 0, solved: {} };
  try { var sv = JSON.parse(localStorage.getItem(KEY) || 'null'); if (sv) { ST.visited = sv.visited || {}; ST.solved = sv.solved || {}; } } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify({ visited: ST.visited, solved: ST.solved })); } catch (e) {} }
  var SET = { sol: true, sound: true };
  try { var ss = JSON.parse(localStorage.getItem('durus-s2-settings') || 'null'); if (ss) SET = Object.assign(SET, ss); } catch (e) {}
  function saveSet() { try { localStorage.setItem('durus-s2-settings', JSON.stringify(SET)); } catch (e) {} }

  // ---------- صوت ----------
  var AC = null;
  function beep(ok) {
    if (!SET.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var notes = ok ? [523, 659, 784] : [300, 220];
      notes.forEach(function (f, i) {
        var o = AC.createOscillator(), g = AC.createGain(); o.type = ok ? 'triangle' : 'sawtooth'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, AC.currentTime + i * 0.11); g.gain.exponentialRampToValueAtTime(0.18, AC.currentTime + i * 0.11 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + i * 0.11 + 0.2);
        o.connect(g); g.connect(AC.destination); o.start(AC.currentTime + i * 0.11); o.stop(AC.currentTime + i * 0.11 + 0.22);
      });
    } catch (e) {}
  }
  function toast(m) { var t = el('div', 'toast', m); document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200); }
  function confetti() {
    var c = el('canvas', 'confetti'); document.body.appendChild(c); var x = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
    var P = []; for (var i = 0; i < 140; i++) P.push({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5, v: 3 + Math.random() * 4, r: 4 + Math.random() * 6, c: ['#FACC15', '#22C55E', '#38BDF8', '#F472B6', '#F97316'][i % 5], a: Math.random() * 6 });
    var t0 = performance.now();
    (function f(t) { x.clearRect(0, 0, c.width, c.height); P.forEach(function (p) { p.y += p.v; p.a += 0.1; x.fillStyle = p.c; x.fillRect(p.x + Math.sin(p.a) * 8, p.y, p.r, p.r * 1.6); }); if (t - t0 < 2600) requestAnimationFrame(f); else c.remove(); })(t0);
  }
  function mark(id, ok) { ST.tried++; if (ok) { ST.correct++; ST.solved[id] = 1; save(); } }

  // ---------- التنقل مع المنصة ----------
  function navOut(to) {
    try { if (window.parent && window.parent !== window) { window.parent.postMessage({ type: 'durus-nav', to: to, chapter: L.chapterKey || '' }, '*'); return; } } catch (e) {}
    location.href = '../index.html';
  }

  // ---------- الهيكل ----------
  document.title = L.title;
  if (L.theme) Object.keys(L.theme).forEach(function (k) { document.documentElement.style.setProperty('--' + k, L.theme[k]); });
  var app = el('div', 'app');
  app.innerHTML = '<header class="top"><button class="tb" id="bChap" aria-label="الرجوع إلى الفصل">→ الفصل</button><button class="tb" id="bList" aria-label="العودة إلى قائمة الدروس">☰ الدروس</button>' +
    '<div class="ttl" id="ttl"><small>' + L.kicker + '</small>' + L.title + '</div>' +
    '<button class="tb" id="bStu" aria-label="الطلاب">👥 الطلاب</button><button class="tb" id="bFull" aria-label="ملء الشاشة">⛶</button><button class="tb tonly" id="bGear" aria-label="أدوات المعلم">⚙</button></header>' +
    '<nav class="nav" id="nav" aria-label="مراحل الدرس"></nav><main class="stage" id="stage"></main>' +
    '<footer class="foot"><button class="btn gh" id="bPrev">→ السابق</button><button class="btn y" id="bNext">التالي ←</button></footer>';
  document.body.appendChild(app);
  $('#bChap').onclick = function () { navOut('chapter'); };
  $('#bStu').onclick = function () { if (window.STU) STU.open(); };
  $('#bList').onclick = function () { navOut('list'); };
  $('#bFull').onclick = function () { var d = document; if (d.fullscreenElement) d.exitFullscreen().catch(function () {}); else if (d.documentElement.requestFullscreen) d.documentElement.requestFullscreen().catch(function () { toast('ملء الشاشة غير متاح هنا'); }); };
  // وضع المعلم: ضغطة مطولة على العنوان
  (function () {
    var tm = null, t = $('#ttl');
    function on() { tm = setTimeout(function () { document.body.classList.toggle('teacher'); toast(document.body.classList.contains('teacher') ? 'تم تفعيل وضع المعلم' : 'تم إخفاء أدوات المعلم'); }, 900); }
    function off() { clearTimeout(tm); }
    t.addEventListener('pointerdown', on); t.addEventListener('pointerup', off); t.addEventListener('pointerleave', off);
    if (/[?&]teacher=1/.test(location.search)) document.body.classList.add('teacher');
  })();
  function applySet() { document.body.classList.toggle('nosol', !SET.sol); }
  applySet();
  $('#bGear').onclick = function () {
    var p = $('.panel'); if (p) { p.remove(); return; }
    p = el('div', 'panel', '<b style="font-size:26px">أدوات المعلم</b>' +
      '<label><input type="checkbox" id="sSol"' + (SET.sol ? ' checked' : '') + '> إظهار أزرار حلول أسئلة الكتاب للطلاب</label>' +
      '<label><input type="checkbox" id="sSnd"' + (SET.sound ? ' checked' : '') + '> المؤثرات الصوتية</label>' +
      '<button class="btn sm gh" id="sAll">كشف جميع الحلول في هذه المرحلة</button><button class="btn sm gh" id="sRst">تصفير تقدم الدرس</button><button class="btn sm" id="sCl">إغلاق</button>');
    document.body.appendChild(p);
    $('#sSol').onchange = function (e) { SET.sol = e.target.checked; saveSet(); applySet(); };
    $('#sSnd').onchange = function (e) { SET.sound = e.target.checked; saveSet(); };
    $('#sAll').onclick = function () { document.querySelectorAll('#stage .ans').forEach(function (a) { a.classList.add('show'); }); };
    $('#sRst').onclick = function () { ST.visited = {}; ST.solved = {}; save(); render(); toast('تم التصفير'); };
    $('#sCl').onclick = function () { p.remove(); };
  };

  function navBar() {
    var nv = $('#nav'); nv.innerHTML = '';
    L.stages.forEach(function (s, i) {
      var b = el('button', ST.visited[i] && i !== ST.stage ? 'done' : '', '<span class="n">' + n(i + 1) + '</span>' + s.icon + ' ' + s.short);
      b.setAttribute('aria-current', i === ST.stage); b.onclick = function () { go(i); }; nv.appendChild(b);
    });
    var cur = nv.children[ST.stage]; if (cur && cur.scrollIntoView) cur.scrollIntoView({ inline: 'center', block: 'nearest' });
  }
  var cleanups = [];
  function go(i, last) {
    if (i < 0 || i >= L.stages.length) return;
    cleanups.forEach(function (f) { try { f(); } catch (e) {} }); cleanups = [];
    ST.stage = i; ST.card = last ? -1 : 0; ST.visited[i] = 1; save(); render(); $('#stage').scrollTop = 0;
    try { history.replaceState(null, '', '#s' + (i + 1)); } catch (e) {}
  }
  function render() {
    navBar();
    if (ST.card == null) ST.card = 0;
    var s = L.stages[ST.stage], st = $('#stage'); st.innerHTML = '';
    var w = el('div', 'wrap'); st.appendChild(w);
    w.appendChild(el('div', 'sh', '<span class="ic">' + s.icon + '</span><h1>' + s.title + '</h1>' + (s.page ? '<span class="pg">الكتاب ص ' + n(s.page) + '</span>' : '')));
    if (s.time) w.appendChild(el('div', 'tnote tonly', '⏱ الزمن الإرشادي: ' + s.time + (s.tnote ? ' — ' + s.tnote : '')));
    // كل بطاقة تُعرض وحدها بحجم الشاشة (مثل شرائح العرض)
    var cards = [];
    // تقسيم القوائم الطويلة على أكثر من بطاقة حتى تناسب الشاشة
    var blocks = [];
    s.blocks.forEach(function (b) {
      var key = b.t === 'tf' ? 'items' : b.t === 'vocab' ? 'items' : null, size = 4;
      if (key && b[key].length > size + 1) { var parts = Math.ceil(b[key].length / size); for (var p = 0; p < parts; p++) { var c2 = Object.assign({}, b); c2[key] = b[key].slice(p * size, (p + 1) * size); c2.h = (b.h || '') + ' (' + n(p + 1) + '/' + n(parts) + ')'; if (p) c2.lead = ''; blocks.push(c2); } }
      else blocks.push(b);
    });
    blocks.forEach(function (b, k) { var r = B[b.t]; var e = r ? r(b, ST.stage + '-' + k) : el('div', 'card', 'نوع غير معروف: ' + b.t); e.classList.add('pgc'); if (WHO[b.t] && window.STU) { var wb = el('button', 'whob', '🎯 من يجيب؟'); wb.onclick = function () { STU.who(e); }; e.classList.add('hasw'); e.appendChild(wb); } w.appendChild(e); cards.push(e); });
    if (ST.card < 0) ST.card = cards.length - 1;
    var dots = el('div', 'dots'); w.firstChild.appendChild(dots);
    function show() {
      cards.forEach(function (e, k) { e.hidden = k !== ST.card; });
      dots.innerHTML = cards.length > 1 ? cards.map(function (_, k) { return '<i class="' + (k === ST.card ? 'on' : k < ST.card ? 'ok' : '') + '"></i>'; }).join('') + '<b>' + n(ST.card + 1) + '/' + n(cards.length) + '</b>' : '';
      var lastStage = ST.stage === L.stages.length - 1, lastCard = ST.card === cards.length - 1;
      var first = ST.stage === 0 && ST.card === 0;
      $('#bPrev').disabled = first; $('#bPrev').style.visibility = first ? 'hidden' : 'visible';
      $('#bNext').textContent = !lastCard ? 'التالي ←' : lastStage ? '⌂ قائمة الدروس' : 'التالي: ' + L.stages[ST.stage + 1].short + ' ←';
      $('#stage').scrollTop = 0; requestAnimationFrame(fit);
    }
    PAGE.next = function () { if (ST.card < cards.length - 1) { ST.card++; show(); } else if (ST.stage === L.stages.length - 1) navOut('list'); else go(ST.stage + 1); };
    PAGE.prev = function () { if (ST.card > 0) { ST.card--; show(); } else go(ST.stage - 1, true); };
    $('#bNext').onclick = PAGE.next; $('#bPrev').onclick = PAGE.prev;
    show();
  }
  var PAGE = {};
  var WHO = { mcq: 1, book: 1, calc: 1, tf: 1, poe: 1, exit: 1, detective: 1, order: 1, fill: 1, sort: 1, match: 1, cmap: 1, tps: 1, uno: 1, memory: 1, mystery: 1, challenge: 1, exp: 1 };
  // ملاءمة البطاقة لارتفاع الشاشة: تصغير اللوحة والصور حتى لا يلزم التمرير
  function fit() {
    var st = $('#stage'); if (!st) return; var cur = st.querySelector('.pgc:not([hidden])'); if (!cur) return;
    var media = [].slice.call(cur.querySelectorAll('.sim:not(.labsim) canvas, .fig img'));
    media.forEach(function (m) { m.style.maxHeight = ''; });
    cur.style.zoom = '';
    var over = st.scrollHeight - st.clientHeight;
    if (over > 0 && media.length) {
      media.forEach(function (m) { var h = m.getBoundingClientRect().height; m.style.maxHeight = Math.max(150, h - over / media.length - 4) + 'px'; });
      over = st.scrollHeight - st.clientHeight;
    }
    if (over > 2) { var h0 = cur.offsetHeight, z = Math.max(0.6, (h0 - over - 4) / h0); cur.style.zoom = z.toFixed(3); }
  }
  window.addEventListener('resize', function () { requestAnimationFrame(fit); });

  // ---------- الكتل ----------
  var B = {};
  function card(cls, html) { return el('div', 'card ' + (cls || ''), html || ''); }
  function figure(src, cap) { return '<figure class="fig" style="margin:0"><img loading="lazy" decoding="async" src="' + (window.IMG && IMG[src] || src) + '" alt="' + (cap || '') + '">' + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure>'; }
  window.FIG = figure;
  B.html = function (b) { var c = card(b.cls, b.html); return c; };
  B.text = function (b) {
    var body = (b.lead ? '<p class="lead">' + b.lead + '</p>' : '') + (b.html || '') + (b.list ? '<ul class="bl">' + b.list.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '');
    if (!b.img) return card(b.cls, (b.h ? '<h2>' + b.h + '</h2>' : '') + body);
    var c = el('div', 'two' + (b.rev ? ' rev' : ''));
    c.appendChild(card(b.cls, (b.h ? '<h2>' + b.h + '</h2>' : '') + body));
    c.appendChild(el('div', '', figure(b.img, b.cap)));
    return c;
  };
  B.hero = function (b) {
    var c = el('div', 'two');
    c.appendChild(card('tint', '<span class="tag y">' + (b.tag || 'مشهد علمي') + '</span><h2>' + b.h + '</h2><p>' + b.text + '</p><div class="q" style="margin-top:14px">❓ ' + b.q + '</div>' +
      '<button class="btn" data-r>💡 فكّر ثم اكشف</button><div class="ans">' + b.a + '</div>'));
    c.appendChild(el('div', '', figure(b.img, b.cap)));
    $('[data-r]', c).onclick = function () { $('.ans', c).classList.add('show'); };
    return c;
  };
  B.goals = function (b) {
    return card('', '<ul class="bl">' + b.list.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' + (b.why ? '<p class="lead" style="margin-top:14px">🎯 الأهمية: ' + b.why + '</p>' : ''));
  };
  // بطاقات مفردات قابلة للقلب
  B.vocab = function (b) {
    var c = card('', (b.h ? '<h2>' + b.h + '</h2>' : '') + '<p style="color:var(--ink2);font-size:22px">اضغط البطاقة لتقلبها وترى التعريف.</p>');
    var g = el('div', 'cardsg'); c.appendChild(g);
    b.items.forEach(function (it, i) {
      var f = el('button', 'flip', '<div class="in"><div class="fa"' + (it.c ? ' style="--cc:' + it.c + '"' : '') + '>' + (it.icon ? '<div style="font-size:48px">' + it.icon + '</div>' : '') + it.term + '</div><div class="fb2">' + it.def + '</div></div>');
      f.onclick = function () { f.classList.toggle('on'); }; g.appendChild(f);
    });
    return c;
  };
  // نافذة التكبير المشتركة (شريط الذكريات وبطاقات أونو): سؤال مكبّر ← إظهار الإجابة ← تراجع
  function zoom(o) {
    var bg = el('div', 'zm'); bg.setAttribute('role', 'dialog'); bg.setAttribute('aria-modal', 'true');
    var box = el('div', 'zmbox'); box.style.setProperty('--cc', o.col); bg.appendChild(box);
    box.innerHTML = '<div class="zmtop"><span class="zmk">' + o.kind + '</span></div>' + (o.img ? '<img loading="lazy" decoding="async" class="zmimg" src="' + o.img + '" alt="">' : '') + '<div class="zmq">' + o.q + '</div><div class="zma" hidden>' + o.a + '</div>';
    var bar = el('div', 'zmbar'); box.appendChild(bar);
    var show = el('button', 'btn', '👁 إظهار الإجابة'), back = el('button', 'btn ghost', '↩ تراجع');
    if (window.STU) { var wz = el('button', 'btn gh', '🎯 من يجيب؟'); wz.onclick = function () { STU.who(box); }; bar.appendChild(wz); }
    show.onclick = function () { var a = box.querySelector('.zma'); a.hidden = !a.hidden; show.textContent = a.hidden ? '👁 إظهار الإجابة' : '🙈 إخفاء الإجابة'; if (!a.hidden) beep(true); };
    function close() { document.removeEventListener('keydown', esc); bg.remove(); if (o.onclose) o.onclose(); }
    function esc(e) { if (e.key === 'Escape') close(); }
    back.onclick = close; bg.onclick = function (e) { if (e.target === bg) close(); };
    document.addEventListener('keydown', esc);
    bar.appendChild(show); bar.appendChild(back); document.body.appendChild(bg); back.focus();
  }
  // شريط الذكريات: شريط فيلم بأسئلة مصغّرة؛ اضغط السؤال ليكبُر ثم «تراجع» للسؤال التالي
  B.memory = function (b) {
    var c = card('', '<span class="tag">🎞 شريط الذكريات</span><p>' + (b.lead || 'اضغط على أي سؤال في الشريط ليكبُر… ثم عُد بزر «تراجع» للسؤال التالي.') + '</p>');
    var film = el('div', 'film'); c.appendChild(film);
    var row = el('div', 'frames'); film.appendChild(row);
    var done = 0, endEl = el('div', 'end', '🔗 ' + b.end); endEl.hidden = true;
    b.items.forEach(function (it, i) {
      var src = it.img ? (window.IMG && IMG[it.img] || '') : '';
      var f = el('button', 'frame', (src ? '<img loading="lazy" decoding="async" src="' + src + '" alt="">' : '') + '<span class="fq"><small>' + n(i + 1) + '</small>' + it.q + '</span>');
      f.setAttribute('aria-label', 'سؤال الذكرى ' + n(i + 1));
      f.onclick = function () { zoom({ kind: '🎞 ذكرى ' + n(i + 1), col: '#1F2937', q: it.q, a: it.a, img: src, onclose: function () { if (!f.classList.contains('seen')) { f.classList.add('seen'); done++; if (done === b.items.length) endEl.hidden = false; } } }); };
      row.appendChild(f);
    });
    c.appendChild(endEl);
    return c;
  };
  // سؤال اختيار من متعدد مع تغذية راجعة وتلميح وإعادة المحاولة
  B.mcq = function (b, id) {
    var c = card('', (b.tag ? '<span class="tag">' + b.tag + '</span>' : '') + (b.img ? figure(b.img, b.cap) : '') + '<div class="q">' + b.q + '</div>');
    var o = el('div', 'opts'); c.appendChild(o); var fb = el('div', 'fb'); c.appendChild(fb);
    var L4 = ['أ', 'ب', 'ج', 'د', 'هـ'], tries = 0, done = false;
    b.o.forEach(function (t, i) {
      var bt = el('button', 'opt', '<span class="l">' + L4[i] + '</span><span>' + t + '</span>');
      bt.onclick = function () {
        if (done || bt.disabled) return; tries++;
        if (i === b.a) { done = true; bt.classList.add('ok'); fb.className = 'fb show ok'; fb.innerHTML = '✅ ' + (b.ok || 'إجابة صحيحة! أحسنت.') + ' ' + (b.why || ''); beep(true); mark(id, tries === 1); if (tries === 1) confetti(); o.querySelectorAll('.opt').forEach(function (x) { x.disabled = true; }); }
        else { bt.classList.add('no'); bt.disabled = true; fb.className = 'fb show no'; fb.innerHTML = '❌ ليست هذه. ' + (b.hint ? '💡 تلميح: ' + b.hint : '') + ' حاول مرة أخرى.'; beep(false); }
      };
      o.appendChild(bt);
    });
    return c;
  };
  // صح أم خطأ (مع تصحيح الخطأ)
  B.tf = function (b, id) {
    var c = card('', (b.h ? '<h2>' + b.h + '</h2>' : '') + (b.lead ? '<p style="color:var(--ink2)">' + b.lead + '</p>' : ''));
    b.items.forEach(function (it, k) {
      var r = el('div', 'tfi', '<div class="s">' + it.s + '</div><div class="b"><button class="btn sm gh" data-v="1">' + (b.yes || 'صح ✔') + '</button><button class="btn sm gh" data-v="0">' + (b.no || 'خطأ ✘') + '</button></div><div class="fix"></div>');
      var fx = $('.fix', r), ans = !!it.ans;
      r.querySelectorAll('[data-v]').forEach(function (bt) {
        bt.onclick = function () {
          var v = bt.dataset.v === '1', ok = v === ans;
          r.querySelectorAll('[data-v]').forEach(function (x) { x.className = 'btn sm gh'; });
          bt.className = 'btn sm ' + (ok ? 'g' : '');
          if (!ok) bt.style.background = 'var(--bad)';
          fx.className = 'fix show'; fx.style.background = ok ? 'var(--goodbg)' : 'var(--badbg)'; fx.style.color = ok ? '#14532D' : '#7F1D1D';
          fx.innerHTML = (ok ? '✅ صحيح. ' : '❌ راجع العبارة. ') + (it.fix ? (ans ? '' : 'التصحيح: ') + it.fix : '');
          beep(ok); mark(id + '-' + k, ok);
        };
      });
      c.appendChild(r);
    });
    return c;
  };
  // ترتيب بالنقر
  B.order = function (b, id) {
    var c = card('', (b.h ? '<h2>' + b.h + '</h2>' : '') + '<p style="color:var(--ink2);font-size:22px">' + (b.lead || 'انقر العناصر بالترتيب الصحيح.') + '</p>');
    var ch = el('div', 'chips'), sl = el('div', 'slots'), fb = el('div', 'fb'); c.appendChild(ch); c.appendChild(sl);
    var row = el('div', 'row'); row.style.marginTop = '12px'; row.innerHTML = '<button class="btn gh sm" data-x>↺ إعادة</button>'; c.appendChild(row); c.appendChild(fb);
    var pos = 0;
    function reset() {
      pos = 0; ch.innerHTML = ''; sl.innerHTML = ''; fb.className = 'fb';
      b.items.forEach(function (t, i) { sl.appendChild(el('div', 'slot', '<b>' + n(i + 1) + '</b><span></span>')); });
      shuffle(b.items.map(function (t, i) { return [t, i]; })).forEach(function (p) {
        var x = el('button', 'chip', p[0]);
        x.onclick = function () {
          if (p[1] === pos) { x.classList.add('used'); sl.children[pos].querySelector('span').innerHTML = p[0]; sl.children[pos].style.borderStyle = 'solid'; sl.children[pos].style.borderColor = 'var(--good)'; pos++; beep(true);
            if (pos === b.items.length) { fb.className = 'fb show ok'; fb.innerHTML = '✅ ترتيب صحيح! ' + (b.why || ''); mark(id, true); confetti(); } }
          else { x.classList.add('no'); setTimeout(function () { x.classList.remove('no'); }, 450); beep(false); fb.className = 'fb show no'; fb.innerHTML = '❌ ليس هذا هو العنصر رقم ' + n(pos + 1) + '. ' + (b.hint || 'فكّر في التسلسل العلمي.'); }
        };
        ch.appendChild(x);
      });
    }
    $('[data-x]', row).onclick = reset; reset();
    return c;
  };
  // تصنيف: اختر بطاقة ثم انقر الفئة (أو اسحبها)
  B.sort = function (b, id) {
    var c = card('', (b.h ? '<h2>' + b.h + '</h2>' : '') + '<p style="color:var(--ink2);font-size:22px">' + (b.lead || 'اختر بطاقة ثم انقر الفئة المناسبة، أو اسحبها إليها.') + '</p>');
    var ch = el('div', 'chips'), cats = el('div', 'cats'), fb = el('div', 'fb'); c.appendChild(ch); c.appendChild(cats); c.appendChild(fb);
    var sel = null, left = b.items.length;
    b.cats.forEach(function (name, ci) {
      var k = el('div', 'cat', '<h3>' + name + '</h3>'); k.dataset.c = ci;
      k.onclick = function () { if (sel) put(sel, k); };
      k.addEventListener('dragover', function (e) { e.preventDefault(); k.classList.add('drop'); });
      k.addEventListener('dragleave', function () { k.classList.remove('drop'); });
      k.addEventListener('drop', function (e) { e.preventDefault(); k.classList.remove('drop'); var x = ch.querySelector('[data-i="' + e.dataTransfer.getData('text') + '"]'); if (x) put(x, k); });
      cats.appendChild(k);
    });
    function put(x, k) {
      var it = b.items[+x.dataset.i];
      if (String(it.c) === k.dataset.c) { x.classList.remove('sel'); x.classList.add('ok'); x.draggable = false; x.onclick = null; k.appendChild(x); sel = null; left--; beep(true); fb.className = 'fb show ok'; fb.innerHTML = '✅ ' + (it.why || 'تصنيف صحيح.');
        if (!left) { fb.innerHTML = '🎉 أحسنت! صنّفت جميع البطاقات تصنيفًا صحيحًا.'; mark(id, true); confetti(); } }
      else { x.classList.add('no'); setTimeout(function () { x.classList.remove('no'); }, 450); beep(false); fb.className = 'fb show no'; fb.innerHTML = '❌ ليست في هذه الفئة. ' + (it.hint || 'أعد التفكير.'); }
    }
    shuffle(b.items.map(function (it, i) { return i; })).forEach(function (i) {
      var x = el('button', 'chip', b.items[i].t); x.dataset.i = i; x.draggable = true;
      x.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text', i); });
      x.onclick = function (e) { e.stopPropagation(); ch.querySelectorAll('.sel').forEach(function (y) { y.classList.remove('sel'); }); sel = x; x.classList.add('sel'); };
      ch.appendChild(x);
    });
    return c;
  };
  // توصيل: انقر عنصرًا من العمود الأيمن ثم ما يناسبه من الأيسر
  B.match = function (b, id) {
    var c = card('', (b.h ? '<h2>' + b.h + '</h2>' : '') + '<p style="color:var(--ink2);font-size:22px">انقر عنصرًا من العمود الأيمن ثم ما يناسبه من العمود الأيسر.</p>');
    var g = el('div', 'two'); g.style.gridTemplateColumns = '1fr 1fr'; var A = el('div', 'chips'), Bc = el('div', 'chips'); A.style.flexDirection = Bc.style.flexDirection = 'column';
    g.appendChild(A); g.appendChild(Bc); c.appendChild(g); var fb = el('div', 'fb'); c.appendChild(fb);
    var sel = null, left = b.pairs.length;
    b.pairs.forEach(function (p, i) { var x = el('button', 'chip', p[0]); x.dataset.i = i; x.onclick = function () { A.querySelectorAll('.sel').forEach(function (y) { y.classList.remove('sel'); }); sel = x; x.classList.add('sel'); }; A.appendChild(x); });
    shuffle(b.pairs.map(function (p, i) { return i; })).forEach(function (i) {
      var y = el('button', 'chip', b.pairs[i][1]); y.style.borderColor = 'var(--acc)';
      y.onclick = function () {
        if (!sel) { fb.className = 'fb show info'; fb.innerHTML = 'ابدأ باختيار عنصر من العمود الأيمن.'; return; }
        if (+sel.dataset.i === i) { sel.classList.remove('sel'); sel.classList.add('ok', 'used'); y.classList.add('ok', 'used'); sel = null; left--; beep(true); fb.className = 'fb show ok'; fb.innerHTML = left ? '✅ توصيل صحيح.' : '🎉 أكملت التوصيل كله!'; if (!left) { mark(id, true); confetti(); } }
        else { y.classList.add('no'); setTimeout(function () { y.classList.remove('no'); }, 450); beep(false); fb.className = 'fb show no'; fb.innerHTML = '❌ لا يتوافقان. حاول مرة أخرى.'; }
      };
      Bc.appendChild(y);
    });
    return c;
  };
  // إكمال الفراغ ببنك كلمات
  B.fill = function (b, id) {
    var c = card('', (b.h ? '<h2>' + b.h + '</h2>' : '') + '<p style="color:var(--ink2);font-size:22px">اختر كلمة من البنك ثم انقر الفراغ المناسب.</p>');
    var bank = el('div', 'chips'); c.appendChild(bank);
    var box = el('div', ''); box.style.marginTop = '16px'; box.style.lineHeight = '2.2'; c.appendChild(box); var fb = el('div', 'fb'); c.appendChild(fb);
    var sel = null, left = 0;
    box.innerHTML = b.items.map(function (s, i) { return '<p>' + n(i + 1) + '. ' + s.replace('___', '<button class="blank" data-k="' + i + '">؟</button>') + '</p>'; }).join('');
    left = b.items.length;
    shuffle(b.answers.concat(b.extra || [])).forEach(function (w) { var x = el('button', 'chip', w); x.onclick = function () { bank.querySelectorAll('.sel').forEach(function (y) { y.classList.remove('sel'); }); sel = x; x.classList.add('sel'); }; bank.appendChild(x); });
    box.querySelectorAll('.blank').forEach(function (bl) {
      bl.onclick = function () {
        if (!sel || bl.classList.contains('ok')) return; var k = +bl.dataset.k;
        if (sel.textContent === b.answers[k]) { bl.textContent = b.answers[k]; bl.classList.add('ok'); sel.classList.add('used'); sel.classList.remove('sel'); sel = null; left--; beep(true); fb.className = 'fb show ok'; fb.innerHTML = left ? '✅ صحيح.' : '🎉 أكملت جميع الفراغات!'; if (!left) mark(id, true); }
        else { beep(false); fb.className = 'fb show no'; fb.innerHTML = '❌ الكلمة لا تناسب هذا الفراغ. ' + (b.hints && b.hints[k] ? '💡 ' + b.hints[k] : ''); }
      };
    });
    return c;
  };
  // مسألة حسابية بإدخال رقمي وخطوات حل
  function parseNum(v) { v = String(v).replace(/[٠-٩]/g, function (d) { return AR.indexOf(d); }).replace('٫', '.').replace(',', '.').replace(/[^\d.\-−]/g, '').replace('−', '-'); return parseFloat(v); }
  B.calc = function (b, id) {
    var c = card('', (b.tag ? '<span class="tag">' + b.tag + '</span>' : '') + '<div class="q">' + b.q + '</div><div class="row"><input class="inp" inputmode="decimal" aria-label="الإجابة"><span>' + (b.unit || '') + '</span><button class="btn" data-c>تحقّق</button><button class="btn gh sm solbtn" data-s>خطوات الحل</button></div><div class="fb"></div><div class="ans">' + b.steps + '</div>');
    var fb = $('.fb', c), tries = 0;
    $('[data-c]', c).onclick = function () {
      var v = parseNum($('input', c).value); tries++;
      if (isNaN(v)) { fb.className = 'fb show info'; fb.innerHTML = 'اكتب رقمًا أولًا.'; return; }
      var ok = Math.abs(v - b.a) <= (b.tol || 0.05) * Math.max(1, Math.abs(b.a));
      fb.className = 'fb show ' + (ok ? 'ok' : 'no'); fb.innerHTML = ok ? '✅ ممتاز! الإجابة ' + n(b.show || b.a) + ' ' + (b.unit || '') : '❌ ليست صحيحة. 💡 ' + (b.hint || 'راجع القانون والوحدات.') + (tries > 1 ? ' — يمكنك عرض خطوات الحل.' : '');
      beep(ok); mark(id, ok && tries === 1); if (ok) $('.ans', c).classList.add('show');
    };
    $('[data-s]', c).onclick = function () { $('.ans', c).classList.toggle('show'); };
    return c;
  };
  // سؤال من الكتاب (ماذا قرأت؟ / اختبر نفسك / مراجعة الفصل) مع إجابة يكشفها المعلم أو الطالب
  B.book = function (b) {
    var c = card('bq', '<span class="tag ' + (b.y ? 'y' : '') + '">' + (b.tag || 'ماذا قرأت؟') + '</span> <span class="meta">' + (b.page ? 'ص ' + n(b.page) : '') + (b.no ? ' · السؤال ' + n(b.no) : '') + '</span>' + (b.img ? figure(b.img, b.cap) : '') +
      '<div class="q" style="margin-top:8px">' + b.q + '</div>' + (b.write ? '<textarea class="inp" rows="2" placeholder="اكتب إجابتك هنا أولًا…"></textarea>' : '') +
      '<div class="row" style="margin-top:12px"><button class="btn solbtn" data-r>👁 إظهار الإجابة</button></div><div class="ans">' + b.a + '</div>');
    $('[data-r]', c).onclick = function () { var a = $('.ans', c); a.classList.toggle('show'); this.innerHTML = a.classList.contains('show') ? '🙈 إخفاء الإجابة' : '👁 إظهار الإجابة'; };
    return c;
  };
  // تجربة علمية
  B.exp = function (b, id) {
    if (b.lab && SIMS[b.lab]) {
      var c = card('labc', '<span class="tag y">🧪 تجربة افتراضية</span> <b class="labh">' + b.h + '</b><div class="labq">❓ ' + b.q + '</div>' +
        '<details class="labinfo"><summary>📋 خطوات الكتاب · 🧰 الأدوات · ⚠ السلامة</summary><ol class="labsteps">' + b.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol><div class="labtools">🧰 ' + b.tools.join(' · ') + '</div><div class="safety">⚠ ' + b.safety + '</div></details>');
      var box = el('div', 'sim labsim'); c.appendChild(box);
      var lis = c.querySelectorAll('.labsteps li');
      var stop = SIMS[b.lab](box, { step: function (k) { lis.forEach(function (li, j) { li.className = j < k ? 'ok' : j === k ? 'on' : ''; }); requestAnimationFrame(fit); }, done: function () { beep(true); mark(id, true); requestAnimationFrame(fit); } });
      if (typeof stop === 'function') cleanups.push(stop);
      return c;
    }
    var c = card('', '<span class="tag y">🧪 تجربة</span><h2>' + b.h + '</h2><p class="lead">سؤال التجربة: ' + b.q + '</p>');
    var g = el('div', 'two'); c.appendChild(g);
    g.appendChild(el('div', '', '<h2 style="font-size:30px">خطوات التنفيذ</h2><ol class="stepper">' + b.steps.map(function (s) { return '<li><span>' + s + '</span></li>'; }).join('') + '</ol>'));
    g.appendChild(el('div', '', '<div class="card tint" style="padding:14px 18px"><b class="hl">الأدوات والمواد</b><ul class="bl" style="margin-top:8px">' + b.tools.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul></div>' +
      '<div class="safety" style="margin-top:12px">⚠ السلامة: ' + b.safety + '</div>' + (b.vars ? '<div class="card" style="padding:12px 16px;margin-top:12px"><b class="hl">المتغيرات</b><p>' + b.vars + '</p></div>' : '') + (b.img ? '<div style="margin-top:12px">' + figure(b.img, b.cap) + '</div>' : '')));
    return c;
  };
  // توقّع – لاحظ – فسّر
  B.poe = function (b, id) {
    var c = card('', '<span class="tag">توقّع – لاحظ – فسّر</span><div class="q">' + b.q + '</div>');
    var o = el('div', 'opts'); c.appendChild(o);
    var obs = el('div', 'fb'), exp = el('div', 'ans');
    b.opts.forEach(function (t, i) { var x = el('button', 'opt', '<span class="l">' + ['أ', 'ب', 'ج', 'د'][i] + '</span>' + t); x.onclick = function () { o.querySelectorAll('.opt').forEach(function (y) { y.classList.remove('ok', 'no'); }); x.classList.add(i === b.a ? 'ok' : 'no'); c.dataset.p = i; obs.className = 'fb show info'; obs.innerHTML = '📝 سجّلت توقعك. الآن نفّذ المحاكاة أو التجربة ثم اضغط «لاحظتُ».'; }; o.appendChild(x); });
    var r = el('div', 'row'); r.style.marginTop = '12px'; r.innerHTML = '<button class="btn y" data-o>👀 لاحظتُ</button><button class="btn" data-e>🧠 فسّر</button>'; c.appendChild(r); c.appendChild(obs); c.appendChild(exp);
    exp.innerHTML = b.explain;
    $('[data-o]', r).onclick = function () { var p = +c.dataset.p; var ok = p === b.a; obs.className = 'fb show ' + (c.dataset.p == null ? 'info' : ok ? 'ok' : 'no'); obs.innerHTML = '👀 الملاحظة: ' + b.observe + (c.dataset.p == null ? '' : ok ? ' — توقعك صحيح!' : ' — قارن بتوقعك.'); };
    $('[data-e]', r).onclick = function () { exp.classList.add('show'); };
    return c;
  };
  // بطاقات أونو العلمية مع نقاط الفرق
  var TEAMS = null;
  function teamsBar(c) {
    if (!TEAMS) TEAMS = [{ n: 'الفريق ١', s: 0, c: '#DC2626' }, { n: 'الفريق ٢', s: 0, c: '#2563EB' }, { n: 'الفريق ٣', s: 0, c: '#16A34A' }, { n: 'الفريق ٤', s: 0, c: '#CA8A04' }];
    var t = el('div', 'teams');
    var G = window.STU && STU.groups();
    function draw() { t.innerHTML = ''; TEAMS.forEach(function (tm, i) { var d = el('div', 'team', '<span>' + tm.n + (G && G[i] ? '<small class="tmem">' + G[i].join('، ') + '</small>' : '') + '</span><b>' + n(tm.s) + '</b><span><button aria-label="زيادة">+</button> <button aria-label="إنقاص">−</button></span>'); d.style.background = tm.c; var bs = d.querySelectorAll('button'); bs[0].onclick = function () { tm.s++; draw(); beep(true); }; bs[1].onclick = function () { tm.s = Math.max(0, tm.s - 1); draw(); }; t.appendChild(d); }); }
    draw(); c.appendChild(t); return t;
  }
  B.uno = function (b) {
    var c = card('', '<span class="tag">' + (b.tag || 'بطاقات أونو العلمية') + '</span><p>' + (b.lead || 'اختر رقم بطاقة ليظهر سؤالها… ثم «تراجع» للبطاقة التالية. 🔴 تذكّر · 🔵 فهم وتفسير · 🟢 تطبيق · 🟡 استنتاج · ⚫ تحدٍّ') + '</p>');
    teamsBar(c);
    var g = el('div', 'unog'); c.appendChild(g);
    var COL = { r: ['#C00000', 'تذكّر'], b: ['#2E75B6', 'فهم وتفسير'], g: ['#548235', 'تطبيق'], y: ['#BF9000', 'استنتاج'], x: ['#262626', '⚡ بطاقة تحدٍّ'] };
    b.cards.forEach(function (it, i) {
      var cc = COL[it.k] || COL.r;
      var f = el('button', 'unoc', '<span class="un">' + n(i + 1) + '</span><span class="uk">' + cc[1] + '</span>');
      f.style.setProperty('--cc', cc[0]); f.setAttribute('aria-label', 'بطاقة رقم ' + n(i + 1));
      f.onclick = function () { zoom({ kind: 'بطاقة ' + n(i + 1) + ' · ' + cc[1] + ' · ' + n(it.p || 1) + ' نقطة', col: cc[0], q: it.q, a: it.a, onclose: function () { f.classList.add('used'); } }); };
      g.appendChild(f);
    });
    return c;
  };
  // المحقق العلمي
  B.detective = function (b, id) {
    var c = card('', '<span class="tag y">🕵️ المحقق العلمي</span><h2>' + b.h + '</h2><p>' + b.case + '</p>');
    var g = el('div', 'cardsg'); c.appendChild(g);
    b.clues.forEach(function (cl, i) { var f = el('button', 'flip', '<div class="in"><div class="fa" style="--cc:#334155">🔍<br>الدليل ' + n(i + 1) + '</div><div class="fb2" style="--cc:#334155">' + cl + '</div></div>'); f.onclick = function () { f.classList.add('on'); }; g.appendChild(f); });
    c.appendChild(B.mcq({ q: b.q, o: b.o, a: b.a, why: b.why, hint: b.hint }, id));
    return c;
  };
  // صندوق الأسرار
  B.mystery = function (b, id) {
    var c = card('', '<span class="tag">🎁 صندوق الأسرار</span><p>' + (b.lead || 'اختر صندوقًا مغلقًا لتكشف التحدي المخفي فيه.') + '</p>');
    if (b.teams) teamsBar(c);
    var g = el('div', 'boxes'); g.style.marginTop = '14px'; c.appendChild(g);
    b.items.forEach(function (it, i) {
      var x = el('button', 'mbox', '🎁'); x.setAttribute('aria-label', 'صندوق ' + n(i + 1));
      x.onclick = function () { if (x.classList.contains('open')) { var a = x.querySelector('.ans'); if (a) a.classList.toggle('show'); return; } x.classList.add('open'); x.innerHTML = '<span class="tag">' + (it.kind || 'تحدٍّ') + '</span><div>' + it.q + '</div><div style="font-size:20px;color:var(--ink2);margin-top:6px">انقر مرة أخرى للإجابة</div><div class="ans">' + it.a + '</div>'; };
      g.appendChild(x);
    });
    return c;
  };
  // خريطة مفاهيم ناقصة
  B.cmap = function (b, id) {
    var c = card('', '<span class="tag">خريطة المفاهيم</span>' + (b.lead ? '<p style="font-size:22px;color:var(--ink2)">' + b.lead + '</p>' : ''));
    var m = el('div', 'cmap'); c.appendChild(m);
    m.appendChild(el('div', 'cnode root', b.root));
    var cl = el('div', 'clinks'); m.appendChild(cl);
    var bank = el('div', 'chips'); bank.style.marginTop = '16px'; var fb = el('div', 'fb');
    var sel = null, blanks = [];
    b.cols.forEach(function (col) {
      var cc = el('div', 'ccol');
      col.forEach(function (nd, j) {
        if (j) cc.appendChild(el('div', 'lk', '↓ ' + (nd.link || '')));
        if (nd.blank) { var bl = el('button', 'blank', '؟'); bl.dataset.v = nd.t; blanks.push(bl); cc.appendChild(bl); }
        else cc.appendChild(el('div', 'cnode', nd.t));
      });
      cl.appendChild(cc);
    });
    c.appendChild(bank); c.appendChild(fb);
    shuffle(blanks.map(function (x) { return x.dataset.v; }).concat(b.extra || [])).forEach(function (w) { var x = el('button', 'chip', w); x.onclick = function () { bank.querySelectorAll('.sel').forEach(function (y) { y.classList.remove('sel'); }); sel = x; x.classList.add('sel'); }; bank.appendChild(x); });
    var left = blanks.length;
    blanks.forEach(function (bl) { bl.onclick = function () { if (!sel || bl.classList.contains('ok')) return; if (sel.textContent === bl.dataset.v) { bl.textContent = bl.dataset.v; bl.classList.add('ok'); sel.classList.add('used'); sel = null; left--; beep(true); if (!left) { fb.className = 'fb show ok'; fb.innerHTML = '🎉 اكتملت خريطة المفاهيم!'; mark(id, true); confetti(); } } else { beep(false); fb.className = 'fb show no'; fb.innerHTML = '❌ ليس هذا موضعها.'; } }; });
    var r = el('div', 'row'); r.style.marginTop = '10px'; var sb = el('button', 'btn gh sm solbtn', 'إظهار الخريطة كاملة'); sb.onclick = function () { blanks.forEach(function (bl) { bl.textContent = bl.dataset.v; bl.classList.add('ok'); }); }; r.appendChild(sb); c.appendChild(r);
    return c;
  };
  // فكّر – زاوج – شارك بمؤقتات
  function timerEl(sec, onEnd) {
    var t = el('span', 'timer', n(sec)), left = sec, iv = null;
    t.start = function (s) { clearInterval(iv); left = s || sec; t.textContent = n(left); t.classList.remove('low'); iv = setInterval(function () { left--; t.textContent = n(Math.max(0, left)); if (left <= 5) t.classList.add('low'); if (left <= 0) { clearInterval(iv); beep(false); if (onEnd) onEnd(); } }, 1000); };
    t.stop = function () { clearInterval(iv); };
    cleanups.push(function () { clearInterval(iv); });
    return t;
  }
  B.tps = function (b) {
    var c = card('tint', '<span class="tag">فكّر – زاوج – شارك</span><div class="q">' + b.q + '</div>');
    var r = el('div', 'row'); c.appendChild(r);
    var t = timerEl(60); r.appendChild(t);
    [['🤔 فكّر (دقيقة)', 60], ['👥 زاوج (دقيقة)', 60], ['📣 شارك (دقيقتان)', 120]].forEach(function (p) { var x = el('button', 'btn sm', p[0]); x.onclick = function () { t.start(p[1]); }; r.appendChild(x); });
    var a = el('div', 'row'); a.style.marginTop = '12px'; a.innerHTML = '<button class="btn gh sm" data-r>💡 إجابة نموذجية</button>'; c.appendChild(a); var ans = el('div', 'ans', b.a); c.appendChild(ans);
    $('[data-r]', a).onclick = function () { ans.classList.toggle('show'); };
    return c;
  };
  // تحدي الثلاثين ثانية (زمن قابل للتعديل + فرق)
  B.challenge = function (b, id) {
    var c = card('', '<span class="tag y">⏱ ' + (b.tag || 'تحدي الثلاثين ثانية') + '</span>');
    teamsBar(c);
    var top = el('div', 'row'); top.style.margin = '14px 0'; c.appendChild(top);
    var secs = b.sec || 30, t = timerEl(secs, function () { fb.className = 'fb show info'; fb.innerHTML = '⏰ انتهى الوقت! ' + qs[i].a; });
    top.appendChild(t);
    var sel = el('select', 'inp'); sel.style.minWidth = '150px'; [15, 20, 30, 45, 60].forEach(function (s) { var o = el('option', '', n(s) + ' ثانية'); o.value = s; if (s === secs) o.selected = true; sel.appendChild(o); }); sel.onchange = function () { secs = +sel.value; }; top.appendChild(sel);
    var nx = el('button', 'btn', 'ابدأ السؤال ▶'); top.appendChild(nx);
    var qbox = el('div', 'q', 'اضغط «ابدأ السؤال» لعرض أول سؤال.'); c.appendChild(qbox); var o = el('div', 'opts'); c.appendChild(o); var fb = el('div', 'fb'); c.appendChild(fb);
    var qs = shuffle(b.qs), i = -1;
    nx.onclick = function () {
      i++; if (i >= qs.length) { qbox.innerHTML = '🏁 انتهت الأسئلة! أعلن الفريق الفائز.'; o.innerHTML = ''; fb.className = 'fb'; t.stop(); confetti(); nx.textContent = 'إعادة التحدي ↺'; i = -1; qs = shuffle(b.qs); return; }
      var q = qs[i]; qbox.innerHTML = n(i + 1) + '/' + n(qs.length) + ' — ' + q.q; o.innerHTML = ''; fb.className = 'fb'; nx.textContent = 'السؤال التالي ▶';
      q.o.forEach(function (tx, k) { var bt = el('button', 'opt', '<span class="l">' + ['أ', 'ب', 'ج', 'د'][k] + '</span>' + tx); bt.onclick = function () { t.stop(); o.querySelectorAll('.opt').forEach(function (x) { x.disabled = true; }); if (k === q.c) { bt.classList.add('ok'); fb.className = 'fb show ok'; fb.innerHTML = '✅ صحيح! أضف نقطة للفريق. ' + (q.a || ''); beep(true); } else { bt.classList.add('no'); o.children[q.c].classList.add('ok'); fb.className = 'fb show no'; fb.innerHTML = '❌ الإجابة الصحيحة: ' + q.o[q.c] + '. ' + (q.a || ''); beep(false); } }; o.appendChild(bt); });
      t.start(secs);
    };
    return c;
  };
  // محاكاة
  B.sim = function (b, id) {
    var c = el('div', 'sim'); var f = SIMS[b.kind];
    if (b.h) c.appendChild(el('h2', '', b.h)).style.color = '#fff';
    if (b.lead) { var p = el('p', '', b.lead); p.style.fontSize = 'var(--lab)'; c.appendChild(p); }
    if (f) { var stop = f(c, b, { n: n, beep: beep, el: el, mark: mark, id: id }); if (typeof stop === 'function') cleanups.push(stop); }
    return c;
  };
  // بطاقة الخروج
  B.exit = function (b, id) { var c = B.mcq(b, id); c.insertBefore(el('span', 'tag y', '🚪 بطاقة الخروج'), c.firstChild); return c; };
  // بطاقة إنجاز الدرس
  B.achieve = function (b) {
    var vis = Object.keys(ST.visited).length, tot = L.stages.length, sol = Object.keys(ST.solved).length;
    var stars = Math.max(1, Math.min(3, Math.round((vis / tot) * 1.5 + Math.min(1.5, sol / 10))));
    var c = el('div', 'badge', '<span class="medal">' + (stars === 3 ? '🏆' : stars === 2 ? '🥈' : '🥉') + '</span><div><h2>بطاقة إنجاز الدرس</h2><div class="stars">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</div><p>زرت ' + n(vis) + ' من ' + n(tot) + ' مراحل، وأجبت إجابة صحيحة عن ' + n(sol) + ' نشاطًا.</p><p class="hl">' + (b.msg || 'أحسنت يا عالم الطقس!') + '</p></div>');
    return c;
  };
  // روابط داخلية (مثل الانتقال لمراجعة الفصل)
  B.links = function (b) {
    var c = card('tint', b.h ? '<h2>' + b.h + '</h2>' : ''); var r = el('div', 'row'); c.appendChild(r);
    b.items.forEach(function (it) { var a = el('a', 'btn ' + (it.cls || ''), it.t); a.href = it.href; a.style.textDecoration = 'none'; r.appendChild(a); });
    return c;
  };

  // البدء
  var h = /#s(\d+)/.exec(location.hash); go(h ? Math.min(L.stages.length - 1, Math.max(0, +h[1] - 1)) : 0);
  window.addEventListener('keydown', function (e) { if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return; if (document.querySelector('.zm')) return; if (e.key === 'ArrowLeft' || e.key === 'PageDown') PAGE.next(); if (e.key === 'ArrowRight' || e.key === 'PageUp') PAGE.prev(); });
})();
