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
