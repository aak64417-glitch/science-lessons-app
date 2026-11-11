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
      '#pnFab,#pnBar{position:fixed;z-index:2147483001;font-family:inherit;direction:rtl;user-select:none;-webkit-user-select:none;touch-action:none}' +
      '#pnFab{left:10px;top:50%;width:50px;height:50px;border-radius:50%;border:2px solid rgba(255,255,255,.85);background:linear-gradient(145deg,#f5b52e,#e8890c);color:#1b1b1b;font-size:24px;line-height:1;box-shadow:0 6px 18px rgba(0,0,0,.35);cursor:grab;display:flex;align-items:center;justify-content:center;padding:0;opacity:.9}' +
      '#pnFab:hover,#pnFab.on{opacity:1}' +
      '#pnFab.on{background:linear-gradient(145deg,#ff5d5d,#c62828);color:#fff}' +
      '#pnFab .dot{position:absolute;top:1px;right:1px;width:12px;height:12px;border-radius:50%;background:#2ecc71;border:2px solid #fff;display:none}' +
      '#pnFab.ink .dot{display:block}' +
      '#pnBar{display:none;flex-direction:column;align-items:center;gap:4px;padding:5px;width:50px;box-sizing:border-box;border-radius:16px;background:rgba(20,28,48,.94);border:1px solid rgba(255,255,255,.2);box-shadow:0 8px 24px rgba(0,0,0,.4)}' +
      '#pnBar.show{display:flex}' +
      '#pnBar button{width:38px;height:38px;flex:none;border-radius:11px;border:2px solid transparent;background:rgba(255,255,255,.1);color:#fff;font-size:19px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}' +
      '#pnBar button.sel{border-color:#ffd54a;background:rgba(255,213,74,.22)}' +
      '#pnBar .grip{height:22px;background:none;font-size:16px;color:#aab6cc;cursor:grab;letter-spacing:-2px}' +
      '#pnBar .sw{width:22px;height:22px;border-radius:50%;border:2px solid #fff;display:block}' +
      '#pnBar .wd{border-radius:50%;background:#fff;display:block}' +
      '#pnBar hr{border:0;border-top:1px solid rgba(255,255,255,.18);margin:1px 0;width:80%}' +
      '#pnPop{position:fixed;display:none;flex-wrap:wrap;gap:7px;padding:9px;width:150px;box-sizing:border-box;justify-content:center;border-radius:14px;background:rgba(20,28,48,.96);border:1px solid rgba(255,255,255,.2);box-shadow:0 8px 24px rgba(0,0,0,.4)}' +
      '#pnPop.show{display:flex}' +
      '#pnPop button.c{width:30px;height:30px;border-radius:50%;border:3px solid rgba(255,255,255,.35)}' +
      '#pnPop button.c.sel{border-color:#fff;transform:scale(1.15)}' +
      '#pnPop button.w.sel{border-color:#ffd54a}' +
      '@media (max-height:620px){#pnBar button{width:32px;height:32px;font-size:16px}#pnBar{width:44px;gap:3px}#pnBar .grip{height:16px}#pnFab{width:44px;height:44px;font-size:20px}}' +
      '@media print{#pnCv,#pnFab,#pnBar{display:none!important}}';
    D.head.appendChild(css);

    var cv = D.createElement('canvas'); cv.id = 'pnCv';
    var fab = D.createElement('button'); fab.id = 'pnFab'; fab.type = 'button';
    fab.title = 'قلم التعليق (اسحبه لتغيير مكانه)'; fab.setAttribute('aria-label', 'قلم التعليق');
    fab.innerHTML = '✏️<span class="dot"></span>';
    var bar = D.createElement('div'); bar.id = 'pnBar';
    var COLORS = ['#e53935', '#1e63d6', '#16a34a', '#ffd400', '#111111', '#ffffff', '#8e24aa', '#ff7a00'];
    var SIZES = [3, 6, 11];
    bar.innerHTML =
      '<button class="grip" data-g="1" title="اسحب لتحريك الأدوات">⠿⠿</button>' +
      '<button data-t="pen" title="قلم">🖊️</button><button data-t="hl" title="قلم تظليل">🖍️</button><button data-t="er" title="ممحاة">🧽</button>' +
      '<button data-p="c" title="اللون"><span class="sw"></span></button><button data-p="w" title="السُّمك"><span class="wd"></span></button><hr>' +
      '<button data-a="undo" title="تراجع">↶</button><button data-a="redo" title="إعادة">↷</button><button data-a="clear" title="مسح كتابة هذه الشاشة">🗑️</button><button data-a="hide" title="إخفاء الكتابة / إظهارها">👁️</button>' +
      '<div id="pnPop"></div>';
    D.body.appendChild(cv); D.body.appendChild(bar); D.body.appendChild(fab);
    var pop = bar.querySelector('#pnPop'), popKind = '';
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
      if (!st.on) closePop();
      fab.innerHTML = (st.on ? '✖' : '✏️') + '<span class="dot"></span>';
      fab.title = st.on ? 'إغلاق القلم (اسحبه لتغيير مكانه)' : 'قلم التعليق (اسحبه لتغيير مكانه)';
      [].forEach.call(bar.querySelectorAll('[data-t]'), function(b){ b.classList.toggle('sel', b.dataset.t === st.tool); });
      bar.querySelector('.sw').style.background = st.color;
      var d = SIZES[st.w] + 4; var wd = bar.querySelector('.wd'); wd.style.width = d + 'px'; wd.style.height = d + 'px';
      bar.querySelector('[data-a=hide]').textContent = st.hidden ? '🙈' : '👁️';
      if (popKind) fillPop();
      draw(); place();
    }
    function fillPop(){
      pop.innerHTML = popKind === 'c'
        ? COLORS.map(function(c){ return '<button class="c' + (c === st.color ? ' sel' : '') + '" data-c="' + c + '" title="لون" style="background:' + c + '"></button>'; }).join('')
        : SIZES.map(function(z, i){ return '<button class="w' + (i === st.w ? ' sel' : '') + '" data-w="' + i + '" title="السُّمك"><span class="wd" style="width:' + (z + 4) + 'px;height:' + (z + 4) + 'px"></span></button>'; }).join('');
    }
    function closePop(){ popKind = ''; pop.classList.remove('show'); }
    bar.addEventListener('click', function(e){
      var b = e.target.closest('button'); if (!b || b.dataset.g) return;
      e.stopPropagation();
      if (b.dataset.t) { st.tool = b.dataset.t; closePop(); }
      else if (b.dataset.p) { if (popKind === b.dataset.p) closePop(); else { popKind = b.dataset.p; fillPop(); pop.classList.add('show'); } }
      else if (b.dataset.c) { st.color = b.dataset.c; if (st.tool === 'er') st.tool = 'pen'; closePop(); }
      else if (b.dataset.w) { st.w = +b.dataset.w; closePop(); }
      else {
        var a = b.dataset.a, s = strokes(), r = redo[key] || (redo[key] = []);
        if (a === 'undo' && s.length) r.push(s.pop());
        else if (a === 'redo' && r.length) s.push(r.pop());
        else if (a === 'clear' && s.length) { redo[key] = s.slice().reverse(); pages[key] = []; }
        else if (a === 'hide') st.hidden = !st.hidden;
        closePop();
      }
      sync();
    });
    cv.addEventListener('pointerdown', closePop, true);

    /* المكان: الزر والأدوات عمود واحد يُسحب معًا، ويُحفظ مكانه على الجهاز */
    var pos = null;
    try { pos = JSON.parse(localStorage.getItem('pn-pos') || 'null'); } catch (x) {}
    function fabSize(){ return fab.offsetWidth || 50; }
    function place(){
      var f = fabSize(), bw = bar.offsetWidth || f, bh = st.on ? (bar.offsetHeight || 0) : 0, gap = 6;
      var x, y;
      if (pos) { x = pos.x * innerWidth; y = pos.y * innerHeight; }
      else { x = 10; y = (innerHeight - f - (st.on ? bh + gap : 0)) / 2; }
      x = Math.max(4, Math.min(innerWidth - f - 4, x));
      y = Math.max(4, Math.min(innerHeight - f - 4, y));
      fab.style.left = x + 'px'; fab.style.top = y + 'px';
      if (!st.on) return;
      var bx = x + (f - bw) / 2, by = y + f + gap;
      if (by + bh > innerHeight - 4) {                     /* لا مكان تحت الزر: فوقه */
        by = y - gap - bh;
        if (by < 4) {                                       /* ولا فوقه: بجانبه */
          by = Math.max(4, Math.min(innerHeight - bh - 4, y + f / 2 - bh / 2));
          bx = x + f / 2 < innerWidth / 2 ? x + f + gap : x - gap - bw;
        }
      }
      bar.style.left = bx + 'px'; bar.style.top = by + 'px';
      if (pop.classList.contains('show')) {
        var btn = bar.querySelector('[data-p=' + popKind + ']').getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
        var px2 = bx + bw / 2 < innerWidth / 2 ? bx + bw + 8 : bx - pw - 8;
        pop.style.left = px2 + 'px'; pop.style.top = Math.max(4, Math.min(innerHeight - ph - 4, btn.top + btn.height / 2 - ph / 2)) + 'px';
      }
    }
    var drag = null;
    function dragStart(e, isFab){
      drag = { x: e.clientX, y: e.clientY, moved: false, fx: fab.getBoundingClientRect().left, fy: fab.getBoundingClientRect().top, fab: isFab, el: e.currentTarget };
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (x) {}
      e.preventDefault();
    }
    function dragMove(e){
      if (!drag) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 8) return;
      drag.moved = true; fab.style.cursor = 'grabbing';
      pos = { x: (drag.fx + dx) / innerWidth, y: (drag.fy + dy) / innerHeight };
      place();
    }
    function dragEnd(){
      if (!drag) return;
      var d = drag; drag = null; fab.style.cursor = '';
      if (d.moved) { try { localStorage.setItem('pn-pos', JSON.stringify(pos)); } catch (x) {} return; }
      if (d.fab) { st.on = !st.on; if (st.on) { refreshKey(); st.hidden = false; } sync(); }
    }
    fab.addEventListener('pointerdown', function(e){ dragStart(e, true); });
    var grip = bar.querySelector('.grip');
    grip.addEventListener('pointerdown', function(e){ dragStart(e, false); });
    [fab, grip].forEach(function(el){
      el.addEventListener('pointermove', dragMove);
      el.addEventListener('pointerup', dragEnd);
      el.addEventListener('pointercancel', function(){ drag = null; fab.style.cursor = ''; });
    });
    fab.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); });
    fab.addEventListener('dblclick', function(e){ e.preventDefault(); pos = null; try { localStorage.removeItem('pn-pos'); } catch (x) {} place(); });

    /* متابعة تغيّر الشاشة (المحطات والمراحل) والتمرير وتغيير الحجم */
    var tm = 0;
    function later(){ clearTimeout(tm); tm = setTimeout(refreshKey, 120); }
    new MutationObserver(function(ms){
      for (var i = 0; i < ms.length; i++) { var t = ms[i].target; if (t === bar || bar.contains(t) || t === fab || fab.contains(t)) continue; later(); return; }
    }).observe(D.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
    addEventListener('hashchange', later);
    addEventListener('scroll', function(){ draw(); later(); }, { passive: true });
    addEventListener('resize', function(){ size(); place(); });

    window.__penKey = function(){ return key; };
    setInterval(function(){ if (!cur && !D.hidden) refreshKey(); }, 700);
    key = computeKey(); size(); sync();
  }
  start();
})();
