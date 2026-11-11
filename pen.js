/* قلم التعليق والممحاة: يعمل فوق أي درس أو أداة دون تغيير محتواها.
   - زر عائم ✏️ يفتح شريط الأدوات: قلم، قلم تظليل، ممحاة، ألوان، سُمك، تراجع، مسح، إخفاء.
   - الكتابة تُحفظ لكل شاشة على حدة (محطة/مرحلة)، فتختفي عند الانتقال وتعود عند الرجوع.
   - عند إغلاق القلم يبقى التعليق ظاهرًا ويعود الدرس قابلًا للضغط. */
(function(){
  if (window.__penLoaded) return; window.__penLoaded = true;
  var D = document;
  function start(){
    if (!D.body) { D.addEventListener('DOMContentLoaded', start); return; }

    var css = D.createElement('style');
    css.textContent =
      '#pnCv{position:fixed;inset:0;width:100vw;height:100vh;z-index:2147483000;pointer-events:none;touch-action:auto}' +
      '#pnCv.on{pointer-events:auto;touch-action:none;cursor:crosshair}' +
      '#pnCv.er{cursor:cell}' +
      '#pnFab,#pnBar{position:fixed;z-index:2147483001;font-family:inherit;direction:rtl;user-select:none;-webkit-user-select:none}' +
      '#pnFab{left:10px;top:50%;transform:translateY(-50%);width:54px;height:54px;border-radius:50%;border:2px solid rgba(255,255,255,.85);background:linear-gradient(145deg,#f5b52e,#e8890c);color:#1b1b1b;font-size:26px;line-height:1;box-shadow:0 6px 18px rgba(0,0,0,.35);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;touch-action:none}' +
      '#pnFab.on{background:linear-gradient(145deg,#ff5d5d,#c62828);color:#fff}' +
      '#pnFab .dot{position:absolute;top:2px;right:2px;width:12px;height:12px;border-radius:50%;background:#2ecc71;border:2px solid #fff;display:none}' +
      '#pnFab.ink .dot{display:block}' +
      '#pnBar{left:72px;top:50%;transform:translateY(-50%);display:none;flex-direction:column;gap:6px;padding:8px;border-radius:18px;background:rgba(20,28,48,.94);border:1px solid rgba(255,255,255,.18);box-shadow:0 10px 30px rgba(0,0,0,.45);max-height:94vh;overflow:auto}' +
      '#pnBar.show{display:flex}' +
      '#pnBar .r{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;max-width:132px}' +
      '#pnBar button{width:40px;height:40px;border-radius:12px;border:2px solid transparent;background:rgba(255,255,255,.1);color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}' +
      '#pnBar button.sel{border-color:#ffd54a;background:rgba(255,213,74,.22)}' +
      '#pnBar button.c{border-radius:50%;width:30px;height:30px;border:3px solid rgba(255,255,255,.35)}' +
      '#pnBar button.c.sel{border-color:#fff;transform:scale(1.15)}' +
      '#pnBar button.w span{display:block;border-radius:50%;background:#fff}' +
      '#pnBar hr{border:0;border-top:1px solid rgba(255,255,255,.18);margin:2px 0;width:100%}' +
      '#pnBar .lb{color:#cfd8ea;font-size:12px;text-align:center;margin:0}' +
      '@media (max-height:560px){#pnBar button{width:34px;height:34px;font-size:17px}#pnBar button.c{width:24px;height:24px}}' +
      '@media print{#pnCv,#pnFab,#pnBar{display:none!important}}';
    D.head.appendChild(css);

    var cv = D.createElement('canvas'); cv.id = 'pnCv';
    var fab = D.createElement('button'); fab.id = 'pnFab'; fab.type = 'button';
    fab.title = 'قلم التعليق'; fab.setAttribute('aria-label', 'قلم التعليق');
    fab.innerHTML = '✏️<span class="dot"></span>';
    var bar = D.createElement('div'); bar.id = 'pnBar';
    var COLORS = ['#e53935', '#1e63d6', '#16a34a', '#ffd400', '#111111', '#ffffff', '#8e24aa', '#ff7a00'];
    var SIZES = [3, 6, 11];
    bar.innerHTML =
      '<div class="r"><button data-t="pen" title="قلم">🖊️</button><button data-t="hl" title="قلم تظليل">🖍️</button><button data-t="er" title="ممحاة">🧽</button></div><hr>' +
      '<div class="r">' + COLORS.map(function(c){ return '<button class="c" data-c="' + c + '" title="لون" style="background:' + c + '"></button>'; }).join('') + '</div><hr>' +
      '<div class="r">' + SIZES.map(function(s, i){ return '<button class="w" data-w="' + i + '" title="السُّمك"><span style="width:' + (s + 3) + 'px;height:' + (s + 3) + 'px"></span></button>'; }).join('') + '</div><hr>' +
      '<div class="r"><button data-a="undo" title="تراجع">↶</button><button data-a="redo" title="إعادة">↷</button><button data-a="clear" title="مسح كتابة هذه الشاشة">🗑️</button><button data-a="hide" title="إخفاء الكتابة / إظهارها">👁️</button><button data-a="close" title="إغلاق القلم">✖</button></div>';
    D.body.appendChild(cv); D.body.appendChild(bar); D.body.appendChild(fab);

    var ctx = cv.getContext('2d');
    var st = { on: false, tool: 'pen', color: COLORS[0], w: 1, hidden: false };
    var pages = {}, redo = {}, key = '', cur = null;

    /* مفتاح الشاشة الحالية: الرابط + أول عنوان ظاهر */
    function shown(e){
      if (bar.contains(e) || e === fab) return false;
      var r = e.getBoundingClientRect();
      if (!(r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth)) return false;
      var s = getComputedStyle(e); return s.visibility !== 'hidden' && +s.opacity !== 0;
    }
    /* العنوان ظاهر فعلًا في الأعلى وليس خلف شاشة أخرى أثناء الانتقال */
    function onTop(e){
      var r = e.getBoundingClientRect(), x = Math.min(innerWidth - 1, Math.max(0, r.left + r.width / 2)), y = Math.min(innerHeight - 1, Math.max(0, r.top + r.height / 2));
      var list = D.elementsFromPoint ? D.elementsFromPoint(x, y) : [];
      for (var i = 0; i < list.length; i++) { var h = list[i]; if (h === cv || h === fab || bar.contains(h)) continue; return e.contains(h); }
      return false;
    }
    function label(e){ return (e.getAttribute('title') || e.textContent || '').replace(/[✓✔☑✅★⭐]/g, '').replace(/\s+/g, ' ').trim().slice(0, 50); }
    /* مؤشر المحطة الحالية في شريط التنقل (cur/active/aria-current...)، وإلا العناوين الظاهرة */
    function screenId(){
      var out = [], els = D.querySelectorAll('[aria-current=true],[aria-current=page],[aria-current=step],.cur,.current,.active');
      for (var i = 0; i < els.length && out.length < 4; i++) {
        var e = els[i], aria = e.hasAttribute('aria-current');
        if (!aria && !(e.parentElement && e.parentElement.children.length >= 6)) continue;
        if (!shown(e)) continue;
        var t = label(e); if (t) out.push(t);
      }
      var hs = D.querySelectorAll('h1,h2,h3,#pg,.pg,.pager,.counter'), n = 0;
      for (var j = 0; j < hs.length && n < 3; j++) if (shown(hs[j]) && onTop(hs[j])) { out.push(label(hs[j])); n++; }
      return out.join('¦');
    }
    function computeKey(){ return location.pathname + location.hash + '|' + screenId(); }
    function strokes(){ return pages[key] || (pages[key] = []); }

    function size(){
      var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      cv.width = Math.round(innerWidth * dpr); cv.height = Math.round(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    }
    function baseW(){ return Math.max(1, Math.min(innerWidth, innerHeight) / 700); }
    function px(p){ return [p[0] * innerWidth, p[1] * innerWidth - scrollY]; }
    function paint(s){
      var pts = s.p; if (!pts.length) return;
      ctx.save();
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      var b = baseW();
      if (s.t === 'er') { ctx.globalCompositeOperation = 'destination-out'; ctx.strokeStyle = 'rgba(0,0,0,1)'; ctx.lineWidth = (SIZES[s.w] * 4 + 14) * b; }
      else if (s.t === 'hl') { ctx.globalAlpha = .35; ctx.strokeStyle = s.c; ctx.lineWidth = (SIZES[s.w] * 3 + 12) * b; ctx.lineCap = 'butt'; }
      else { ctx.strokeStyle = s.c; ctx.lineWidth = SIZES[s.w] * b; }
      ctx.beginPath();
      var a = px(pts[0]); ctx.moveTo(a[0], a[1]);
      if (pts.length === 1) ctx.lineTo(a[0] + .01, a[1]);
      for (var i = 1; i < pts.length - 1; i++) {
        var p = px(pts[i]), q = px(pts[i + 1]);
        ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
      }
      if (pts.length > 1) { var z = px(pts[pts.length - 1]); ctx.lineTo(z[0], z[1]); }
      ctx.stroke(); ctx.restore();
    }
    function draw(){
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (!st.hidden) strokes().forEach(paint);
      var has = strokes().some(function(s){ return s.t !== 'er'; });
      fab.classList.toggle('ink', has && !st.on);
    }
    function refreshKey(){ var k = computeKey(); if (k !== key) { key = k; draw(); } }

    /* الرسم */
    function pt(e){ return [e.clientX / innerWidth, (e.clientY + scrollY) / innerWidth]; }
    cv.addEventListener('pointerdown', function(e){
      if (!st.on) return;
      e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch (x) {}
      if (st.hidden) { st.hidden = false; }
      refreshKey();
      cur = { t: st.tool, c: st.color, w: st.w, p: [pt(e)] };
      strokes().push(cur); redo[key] = []; draw();
    });
    cv.addEventListener('pointermove', function(e){
      if (!cur) return; e.preventDefault();
      var list = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      for (var i = 0; i < list.length; i++) cur.p.push(pt(list[i]));
      draw();
    });
    function end(){ cur = null; draw(); }
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);

    /* شريط الأدوات */
    function sync(){
      cv.classList.toggle('on', st.on); cv.classList.toggle('er', st.tool === 'er');
      fab.classList.toggle('on', st.on); bar.classList.toggle('show', st.on);
      fab.innerHTML = (st.on ? '✖' : '✏️') + '<span class="dot"></span>';
      fab.title = st.on ? 'إغلاق القلم' : 'قلم التعليق';
      [].forEach.call(bar.querySelectorAll('[data-t]'), function(b){ b.classList.toggle('sel', b.dataset.t === st.tool); });
      [].forEach.call(bar.querySelectorAll('[data-c]'), function(b){ b.classList.toggle('sel', b.dataset.c === st.color && st.tool !== 'er'); });
      [].forEach.call(bar.querySelectorAll('[data-w]'), function(b){ b.classList.toggle('sel', +b.dataset.w === st.w); });
      var hb = bar.querySelector('[data-a=hide]'); hb.textContent = st.hidden ? '🙈' : '👁️';
      draw();
    }
    bar.addEventListener('click', function(e){
      var b = e.target.closest('button'); if (!b) return;
      e.stopPropagation();
      if (b.dataset.t) st.tool = b.dataset.t;
      else if (b.dataset.c) { st.color = b.dataset.c; if (st.tool === 'er') st.tool = 'pen'; }
      else if (b.dataset.w) st.w = +b.dataset.w;
      else {
        var a = b.dataset.a, s = strokes(), r = redo[key] || (redo[key] = []);
        if (a === 'undo' && s.length) r.push(s.pop());
        else if (a === 'redo' && r.length) s.push(r.pop());
        else if (a === 'clear' && s.length) { redo[key] = s.slice().reverse(); pages[key] = []; }
        else if (a === 'hide') st.hidden = !st.hidden;
        else if (a === 'close') st.on = false;
      }
      sync();
    });

    /* الزر العائم: ضغطة تفتح/تغلق، والسحب ينقله لأي مكان */
    var drag = null;
    fab.addEventListener('pointerdown', function(e){
      drag = { x: e.clientX, y: e.clientY, moved: false, r: fab.getBoundingClientRect() };
      try { fab.setPointerCapture(e.pointerId); } catch (x) {}
    });
    fab.addEventListener('pointermove', function(e){
      if (!drag) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 8) return;
      drag.moved = true;
      var L = Math.max(4, Math.min(innerWidth - 58, drag.r.left + dx)), T = Math.max(4, Math.min(innerHeight - 58, drag.r.top + dy));
      fab.style.left = L + 'px'; fab.style.top = T + 'px'; fab.style.transform = 'none';
      placeBar();
    });
    fab.addEventListener('pointerup', function(){
      if (drag && !drag.moved) { st.on = !st.on; if (st.on) { refreshKey(); st.hidden = false; } sync(); placeBar(); }
      drag = null;
    });
    fab.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); });
    function placeBar(){
      var r = fab.getBoundingClientRect();
      bar.style.transform = 'none';
      var bw = bar.offsetWidth || 150, bh = bar.offsetHeight || 300;
      var left = r.right + 10; if (left + bw > innerWidth - 4) left = r.left - bw - 10;
      var top = Math.max(4, Math.min(innerHeight - bh - 4, r.top + r.height / 2 - bh / 2));
      bar.style.left = Math.max(4, left) + 'px'; bar.style.top = top + 'px';
    }

    /* متابعة تغيّر الشاشة (المحطات والمراحل) والتمرير وتغيير الحجم */
    var tm = 0;
    function later(){ clearTimeout(tm); tm = setTimeout(refreshKey, 120); }
    new MutationObserver(function(ms){
      for (var i = 0; i < ms.length; i++) { var t = ms[i].target; if (t === bar || bar.contains(t) || t === fab || fab.contains(t)) continue; later(); return; }
    }).observe(D.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
    addEventListener('hashchange', later);
    addEventListener('scroll', function(){ draw(); later(); }, { passive: true });
    addEventListener('resize', function(){ size(); if (st.on) placeBar(); });

    window.__penKey = function(){ return key; };
    setInterval(function(){ if (!cur && !D.hidden) refreshKey(); }, 700);
    key = computeKey(); size(); sync();
  }
  start();
})();
