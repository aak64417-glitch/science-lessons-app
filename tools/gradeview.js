/* كشوف الطلاب حسب الصف: كل صفحة ترى شُعب صفها فقط (أول متوسط /١، ثاني متوسط /٢، ثالث متوسط /٣)
   مع حفظ الشعبة المختارة لكل صف على حدة. الشعب التي بلا رقم صف تظهر في كل الصفوف. */
(function () {
  if (window.__gradeView) return; window.__gradeView = 1;
  var m = String(location.pathname).match(/(?:^|[\/\-])g([789])(?:s\d)?-/), GR = m ? +m[1] : 0;
  if (!GR) return;
  var KEY = 'durus-classes', LS = window.localStorage; if (!LS) return;
  var AR = '٠١٢٣٤٥٦٧٨٩';
  function gOf(k) { var s = String(k).replace(/[٠-٩]/g, function (d) { return AR.indexOf(d); }).replace(/\s/g, ''); var x = s.match(/\/([123])$/); return x ? +x[1] + 6 : 0; }
  function mine(k) { var g = gOf(k); return !g || g === GR; }
  var get = Storage.prototype.getItem, set = Storage.prototype.setItem;
  function full() { try { return JSON.parse(get.call(LS, KEY) || 'null'); } catch (e) { return null; } }
  window.__durusFullRaw = function () { return get.call(LS, KEY); };
  Storage.prototype.getItem = function (k) {
    var v = get.call(this, k);
    if (this !== LS || k !== KEY || !v) return v;
    try {
      var D = JSON.parse(v); if (!D || !D.classes) return v;
      var C = {}; Object.keys(D.classes).forEach(function (c) { if (mine(c)) C[c] = D.classes[c]; });
      var cur = (D.curG && D.curG[GR]) || D.cur; if (!C[cur]) cur = Object.keys(C)[0] || '';
      var o = {}; for (var p in D) o[p] = D[p]; o.classes = C; o.cur = cur; return JSON.stringify(o);
    } catch (e) { return v; }
  };
  Storage.prototype.setItem = function (k, v) {
    if (this !== LS || k !== KEY) return set.call(this, k, v);
    try {
      var N = JSON.parse(v), F = full() || { classes: {} }; if (!N || !N.classes) return set.call(this, k, v);
      var C = {}; Object.keys(F.classes || {}).forEach(function (c) { if (!mine(c)) C[c] = F.classes[c]; });
      Object.keys(N.classes).forEach(function (c) { C[c] = N.classes[c]; });
      var o = {}; for (var p in F) o[p] = F[p]; for (p in N) o[p] = N[p];
      o.classes = C; o.curG = F.curG || {}; if (N.cur) o.curG[GR] = N.cur;
      o.stars = Object.assign({}, F.stars || {}, N.stars || {});
      return set.call(this, k, JSON.stringify(o));
    } catch (e) { return set.call(this, k, v); }
  };
})();

/* ملاءمة المحطة للشاشة: في الدروس التي محتواها داخل main#stage > .wrap، إذا زاد المحتوى قليلًا عن ارتفاع الشاشة
   يُصغَّر تصغيرًا خفيفًا (حتى ٧٨٪) ليظهر كاملًا دون تمرير عمودي. */
(function(){
  var D = document, busy = false, pend = 0;
  function fit(){
    pend = 0; var s = D.getElementById('stage'); if (!s || s.tagName !== 'MAIN') return;
    var w = s.querySelector(':scope > .wrap'); if (!w) return;
    busy = true;
    w.style.transform = ''; w.style.marginBottom = ''; w.style.transformOrigin = '';
    var over = s.scrollHeight - s.clientHeight, h = w.offsetHeight;
    if (over > 2 && h > 200) {
      var z = Math.max(0.78, (h - over - 4) / h);
      w.style.transformOrigin = 'top center'; w.style.transform = 'scale(' + z.toFixed(3) + ')';
      w.style.marginBottom = (-(h * (1 - z))).toFixed(1) + 'px';
    }
    setTimeout(function(){ busy = false; }, 0);
  }
  function later(){ if (!pend) pend = setTimeout(fit, 120); }
  function start(){
    var s = D.getElementById('stage'); if (!s || s.tagName !== 'MAIN') return;
    new MutationObserver(function(){ if (!busy) later(); }).observe(s, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'hidden', 'open'] });
    addEventListener('resize', later); later();
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();

/* قلم التعليق والممحاة في كل الدروس والأدوات: يُحمَّل تلقائيًّا إن لم تتضمنه الصفحة */
(function(){
  try {
    var me = document.currentScript && document.currentScript.src; if (!me) return;
    function add(){ if ([].some.call(document.scripts, function(s){ return /\/pen\.js(\?|$)/.test(s.src); }) || window.__penKey) return;
      var s = document.createElement('script'); s.src = new URL('../pen.js', me).href; document.body.appendChild(s); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(add, 50); }); else setTimeout(add, 50);
  } catch (e) {}
})();

/* ملاءمة اللوحات الجانبية داخل المحطات (الدروس فقط): إذا زاد محتوى لوحة قابلة للتمرير قليلًا عن ارتفاعها
   يُصغَّر محتواها تصغيرًا خفيفًا (حتى ٧٥٪) ليظهر كاملًا دون تمرير. يعمل بعد كل لمسة وعند تغيير المقاس. */
(function(){
  if (!/\/lessons\//.test(location.pathname)) return;
  var D = document, SKIP = '.stu-bg,.ov,.ovb,[role=dialog],.qo,#stage>.wrap';
  function cands(){
    var out = [], all = D.querySelectorAll('body *');
    for (var i = 0; i < all.length; i++) { var e = all[i];
      if (e.id === 'stage' || e.tagName === 'BODY' || e.tagName === 'CANVAS') continue;
      var cs = getComputedStyle(e); if (!/(auto|scroll)/.test(cs.overflowY)) continue;
      if (!e.offsetParent || e.clientHeight < 180 || e.clientWidth < 220) continue;
      if (e.closest(SKIP)) continue;
      if (e.scrollHeight > e.clientHeight + 4 || e.getAttribute('data-fitz')) out.push(e); }
    return out;
  }
  function setZ(e, z){ for (var k = 0; k < e.children.length; k++) e.children[k].style.zoom = z === 1 ? '' : String(z); if (z === 1) e.removeAttribute('data-fitz'); else e.setAttribute('data-fitz', z); }
  function run(){
    cands().forEach(function(e){
      setZ(e, 1); var r = e.clientHeight / e.scrollHeight; if (r >= 0.995) return;
      /* أكبر تكبير يتسع دون تمرير (بحث ثنائي بين ٠٫٧٥ و١) */
      var lo = 0.75, hi = 1;
      for (var it = 0; it < 6; it++) { var mid = (lo + hi) / 2; setZ(e, mid); if (e.scrollHeight > e.clientHeight + 2) hi = mid; else lo = mid; }
      setZ(e, lo);
    });
  }
  var t1 = 0, t2 = 0;
  function later(){ clearTimeout(t1); clearTimeout(t2); t1 = setTimeout(run, 350); t2 = setTimeout(run, 1300); }
  D.addEventListener('click', later, true); addEventListener('resize', later); addEventListener('hashchange', later);
  D.addEventListener('keyup', later, true);
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', later); else later();
})();
