/* «استراتيجيات الدرس» — استراتيجيات تدريس نشطة مخصصة لموضوع كل درس (علوم ثاني متوسط)
   الصندوق الغامض · المزاد العلمي · الكلمة الممنوعة · قبعات التفكير الست · الأركان الأربعة · المؤتمر الصحفي · ماذا لو؟
   يقرأ محتوى الدرس من window.STRAT8[LESSON.id]، وأسماء الطلاب من كشوف المنصة (durus-classes). */
(function () {
  'use strict';
  if (window.__strat8) return; window.__strat8 = 1;
  var L = window.LESSON || {}, DATA = (window.STRAT8 || {})[L.id];
  if (!DATA) return;
  (function walk(o) { Object.keys(o).forEach(function (k) { var v = o[k]; if (typeof v === 'string') o[k] = v.replace(/(\d)\.(\d)/g, '$1٫$2').replace(/%/g, '٪').replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[d]; }); else if (v && typeof v === 'object') walk(v); }); })(DATA);
  var TH = L.theme || {}, C1 = TH.c1 || '#0E7490', C2 = TH.c2 || '#0B4F6C', ACC = TH.acc || '#FACC15';
  var AR = '٠١٢٣٤٥٦٧٨٩';
  function n(x) { return String(x).replace(/\d/g, function (d) { return AR[d]; }); }
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  // ---------- الأصوات ----------
  var AC = null;
  function tone(f, d, type, vol, when) {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var t = AC.currentTime + (when || 0), o = AC.createOscillator(), g = AC.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(vol || 0.14, t); g.gain.exponentialRampToValueAtTime(0.001, t + d);
      o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + d + 0.03);
    } catch (e) {}
  }
  var SFX = {
    ok: function () { tone(660, 0.12, 'triangle'); tone(880, 0.16, 'triangle', 0.14, 0.1); tone(1320, 0.3, 'triangle', 0.12, 0.2); },
    bad: function () { tone(220, 0.25, 'sawtooth', 0.09); tone(160, 0.35, 'sawtooth', 0.09, 0.15); },
    tick: function () { tone(1200, 0.05, 'square', 0.05); },
    pop: function () { tone(520, 0.08, 'sine', 0.12); tone(780, 0.1, 'sine', 0.1, 0.06); },
    reveal: function () { [523, 659, 784, 1046].forEach(function (f, i) { tone(f, 0.25, 'triangle', 0.11, i * 0.08); }); },
    hammer: function () { tone(140, 0.18, 'square', 0.18); tone(90, 0.3, 'triangle', 0.16, 0.05); },
    buzz: function () { tone(110, 0.6, 'sawtooth', 0.12); },
    fan: function () { [523, 659, 784, 659, 784, 1046].forEach(function (f, i) { tone(f, 0.28, 'triangle', 0.12, i * 0.12); }); },
    clap: function () { for (var i = 0; i < 14; i++) tone(300 + Math.random() * 900, 0.05, 'square', 0.04, i * 0.07 + Math.random() * 0.04); }
  };

  // ---------- الأنماط ----------
  var css = '' +
    '.s8{position:fixed;inset:0;z-index:100000;display:flex;flex-direction:column;color:#fff;direction:rtl;font-family:inherit;font-weight:700;line-height:1.5;' +
    'background:radial-gradient(1200px 700px at 80% -10%,' + C1 + ' 0,transparent 60%),radial-gradient(900px 600px at 0 110%,' + C2 + ' 0,transparent 60%),#0B1222;overflow:hidden;--acc:' + ACC + ';--c1:' + C1 + ';--c2:' + C2 + '}' +
    '.s8 *{box-sizing:border-box}.s8 :where(button){font:inherit;font-weight:700;color:inherit;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}' +
    '.s8-top{display:flex;align-items:center;gap:10px;padding:8px 14px;background:rgba(0,0,0,.28);border-bottom:2px solid rgba(255,255,255,.12);flex:none}' +
    '.s8-ttl{font-size:clamp(17px,1.7vw,24px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0}.s8-ttl small{display:block;font-size:.68em;color:var(--acc);opacity:.95}' +
    '.s8-ib{border:0;border-radius:12px;background:rgba(255,255,255,.14);padding:7px 14px;font-size:clamp(15px,1.4vw,20px)}.s8-ib:active{transform:scale(.96)}' +
    '.s8-teams{display:flex;gap:7px;align-items:center;flex-wrap:nowrap}' +
    '.s8-tm{display:flex;align-items:center;gap:5px;border-radius:14px;padding:4px 6px 4px 10px;background:rgba(255,255,255,.1);border:2px solid var(--tc);font-size:clamp(14px,1.25vw,18px);transition:transform .3s}' +
    '.s8-tm.bump{transform:scale(1.18)}.s8-tm b{color:var(--tc)}.s8-tm .sc{min-width:34px;text-align:center;font-size:1.3em;background:var(--tc);color:#0B1222;border-radius:9px;padding:0 6px}' +
    '.s8-tm button{border:0;background:rgba(255,255,255,.16);border-radius:8px;width:26px;height:26px;padding:0;font-size:17px;line-height:1}' +
    '.s8-main{flex:1;min-height:0;display:flex;flex-direction:column;padding:12px 18px 14px;gap:10px}' +
    '.s8-menu{flex:1;min-height:0;display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:1fr;gap:14px}' +
    '.s8-card{border:2px solid rgba(255,255,255,.16);border-radius:22px;background:linear-gradient(160deg,rgba(255,255,255,.14),rgba(255,255,255,.04));padding:12px 14px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:4px;transition:transform .2s,border-color .2s;position:relative;overflow:hidden}' +
    '.s8-card:hover,.s8-card:focus-visible{transform:translateY(-4px);border-color:var(--acc)}.s8-card .ic{font-size:clamp(38px,4.6vw,64px);filter:drop-shadow(0 6px 10px rgba(0,0,0,.35));animation:s8f 3s ease-in-out infinite}' +
    '.s8-card .nm{font-size:clamp(19px,1.9vw,28px);color:var(--acc)}.s8-card .ds{font-size:clamp(13px,1.15vw,17px);color:#E2E8F0;font-weight:600}.s8-card .tm{font-size:clamp(12px,1vw,15px);background:rgba(0,0,0,.3);border-radius:99px;padding:2px 12px;margin-top:4px}' +
    '.s8-card.done::after{content:"✓";position:absolute;top:8px;left:12px;background:#22C55E;color:#fff;border-radius:50%;width:28px;height:28px;line-height:28px;font-size:18px}' +
    '.s8-intro{grid-column:span 1;border-style:dashed;cursor:default;background:rgba(0,0,0,.2)}.s8-intro .nm{color:#fff}' +
    '@keyframes s8f{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}' +
    '.s8-meta{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:rgba(0,0,0,.25);border-radius:16px;padding:6px 12px;flex:none;font-size:clamp(13px,1.2vw,17px)}' +
    '.s8-meta .mn{font-size:clamp(18px,1.8vw,26px);color:var(--acc);margin-left:6px}.s8-meta span{background:rgba(255,255,255,.1);border-radius:99px;padding:2px 12px;font-weight:600}' +
    '.s8-stage{flex:1;min-height:0;display:flex;gap:16px;position:relative}' +
    '.s8-btn{border:0;border-radius:16px;padding:10px 20px;font-size:clamp(16px,1.6vw,23px);background:var(--acc);color:#111827;box-shadow:0 5px 0 rgba(0,0,0,.35)}.s8-btn:active{transform:translateY(3px);box-shadow:0 2px 0 rgba(0,0,0,.35)}' +
    '.s8-btn.g{background:rgba(255,255,255,.16);color:#fff}.s8-btn.ok{background:#22C55E;color:#fff}.s8-btn.no{background:#EF4444;color:#fff}.s8-btn[disabled]{opacity:.4;pointer-events:none}' +
    '.s8-row{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap}' +
    '.s8-pnl{background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.14);border-radius:22px;padding:14px 16px;display:flex;flex-direction:column;gap:10px;min-height:0}' +
    '.s8-big{font-size:clamp(22px,2.6vw,38px);line-height:1.45}.s8-mid{font-size:clamp(17px,1.85vw,27px);line-height:1.5}.s8-sm{font-size:clamp(14px,1.3vw,19px);font-weight:600;color:#CBD5E1}' +
    '.s8-ans{background:#ECFDF5;color:#064E3B;border-radius:16px;padding:10px 14px;font-size:clamp(16px,1.7vw,25px);animation:s8in .45s cubic-bezier(.2,1.4,.4,1)}' +
    '.s8-fix{background:#FEF3C7;color:#78350F}' +
    '@keyframes s8in{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:none}}' +
    '.s8-award{display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;font-size:clamp(14px,1.3vw,19px)}.s8-award button{border:2px solid var(--tc);background:rgba(0,0,0,.25);border-radius:12px;padding:5px 12px;color:#fff}.s8-award button:active{background:var(--tc)}' +
    '.s8-name{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#111827;border-radius:14px;padding:6px 14px;font-size:clamp(17px,1.8vw,26px);min-height:44px}.s8-name.spin{animation:s8sh .12s linear infinite}.s8-name:empty{display:none}' +
    '@keyframes s8sh{50%{transform:translateY(-3px)}}' +
    '.s8-timer{position:relative;width:clamp(70px,7vw,100px);height:clamp(70px,7vw,100px);flex:none}.s8-timer svg{width:100%;height:100%;transform:rotate(-90deg)}.s8-timer b{position:absolute;inset:0;display:grid;place-items:center;font-size:clamp(22px,2.4vw,34px)}.s8-timer.hot b{color:#F87171;animation:s8sh .3s infinite}' +
    '.s8-nav{display:flex;align-items:center;gap:10px;justify-content:space-between;flex:none}.s8-dots{display:flex;gap:6px}.s8-dots i{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.25)}.s8-dots i.on{background:var(--acc);width:30px;border-radius:9px}' +
    /* الصندوق */
    '.s8-boxw{flex:0 0 36%;display:flex;align-items:center;justify-content:center;perspective:900px}.s8-box{position:relative;width:clamp(170px,22vw,300px);height:clamp(150px,19vw,260px)}' +
    '.s8-box .bd{position:absolute;inset:22% 0 0;border-radius:10px 10px 18px 18px;background:linear-gradient(135deg,var(--c1),var(--c2));border:4px solid var(--acc);box-shadow:0 20px 40px rgba(0,0,0,.5);display:grid;place-items:center;font-size:clamp(60px,8vw,110px);color:var(--acc);text-shadow:0 0 30px var(--acc)}' +
    '.s8-box .bd::before{content:"";position:absolute;top:0;bottom:0;right:44%;width:12%;background:var(--acc);opacity:.85}' +
    '.s8-box .ld{position:absolute;top:8%;left:-4%;right:-4%;height:20%;border-radius:10px;background:linear-gradient(135deg,var(--c1),var(--c2));border:4px solid var(--acc);transform-origin:0 100%;transition:transform .8s cubic-bezier(.3,1.5,.5,1);z-index:2}' +
    '.s8-box .ld::after{content:"🎀";position:absolute;top:-62%;left:50%;transform:translateX(-50%);font-size:clamp(34px,4vw,54px)}' +
    '.s8-box.open .ld{transform:rotate(-115deg) translateY(-10px)}.s8-box.shake{animation:s8shk .5s}.s8-box.open .bd{font-size:0}' +
    '.s8-box .out{position:absolute;left:50%;top:30%;transform:translate(-50%,0) scale(.2);opacity:0;background:#fff;color:#111827;border-radius:16px;padding:8px 18px;font-size:clamp(22px,2.6vw,38px);white-space:nowrap;box-shadow:0 10px 30px rgba(0,0,0,.4);transition:all .7s cubic-bezier(.2,1.5,.4,1) .3s;z-index:3}' +
    '.s8-box.open .out{transform:translate(-50%,-150%) scale(1);opacity:1}' +
    '@keyframes s8shk{20%{transform:rotate(-5deg)}40%{transform:rotate(5deg)}60%{transform:rotate(-3deg)}80%{transform:rotate(3deg)}}' +
    '.s8-clues{flex:1;display:flex;flex-direction:column;gap:9px;min-height:0}.s8-clue{display:flex;align-items:center;gap:10px;border-radius:14px;padding:8px 12px;background:rgba(255,255,255,.07);border:2px dashed rgba(255,255,255,.2);font-size:clamp(16px,1.75vw,25px);min-height:52px}' +
    '.s8-clue i{font-style:normal;flex:none;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.15);font-size:.8em}.s8-clue.on{background:rgba(255,255,255,.95);color:#111827;border:2px solid var(--acc);animation:s8in .4s}.s8-clue.on i{background:var(--acc)}' +
    '.s8-pts{font-size:clamp(15px,1.4vw,20px);background:rgba(0,0,0,.3);border-radius:99px;padding:4px 14px}.s8-pts b{color:var(--acc);font-size:1.3em}' +
    /* المزاد */
    '.s8-auc{flex:1;display:flex;flex-direction:column;gap:10px;min-height:0}.s8-lot{display:flex;gap:14px;align-items:center;background:linear-gradient(135deg,#78350F,#451A03);border:3px solid #F59E0B;border-radius:22px;padding:12px 18px;position:relative}' +
    '.s8-lot .gv{font-size:clamp(46px,5vw,72px);transform-origin:80% 80%}.s8-lot .gv.hit{animation:s8hit .5s}.s8-lot .no{position:absolute;top:-14px;right:20px;background:#F59E0B;color:#111;border-radius:99px;padding:0 14px;font-size:15px}' +
    '@keyframes s8hit{40%{transform:rotate(-40deg)}70%{transform:rotate(10deg)}}' +
    '.s8-bids{display:grid;gap:10px;flex:0 1 auto;min-height:0}.s8-bid{border-radius:18px;border:3px solid var(--tc);background:rgba(0,0,0,.25);padding:10px 8px;display:flex;flex-direction:column;align-items:center;gap:6px;justify-content:center}' +
    '.s8-bid .cn{font-size:clamp(20px,2.2vw,32px)}.s8-bid .cn::before{content:"🪙 "}.s8-chips{display:flex;gap:5px;flex-wrap:wrap;justify-content:center}.s8-chips button{border:2px solid rgba(255,255,255,.3);border-radius:99px;padding:3px 10px;background:rgba(255,255,255,.08);font-size:clamp(13px,1.2vw,17px)}' +
    '.s8-chips button.on{background:var(--tc);color:#111;border-color:#fff}.s8-bid .dl{font-size:clamp(16px,1.6vw,22px);min-height:1.4em}.s8-bid .dl.p{color:#4ADE80}.s8-bid .dl.m{color:#F87171}' +
    '.s8-stamp{position:absolute;left:18px;top:50%;transform:translateY(-50%) rotate(-12deg) scale(2);opacity:0;border:5px solid;border-radius:14px;padding:2px 16px;font-size:clamp(24px,2.6vw,38px);transition:all .4s cubic-bezier(.3,1.6,.5,1)}.s8-stamp.on{opacity:1;transform:translateY(-50%) rotate(-12deg) scale(1)}' +
    /* الكلمة الممنوعة */
    '.s8-tab{flex:1;display:flex;gap:18px;align-items:stretch;min-height:0}.s8-tcard{flex:0 0 42%;border-radius:26px;background:#fff;color:#111827;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.45);animation:s8in .4s}' +
    '.s8-tcard .tw{background:linear-gradient(135deg,var(--c1),var(--c2));color:#fff;text-align:center;padding:16px;font-size:clamp(28px,3.4vw,50px)}.s8-tcard .tw small{display:block;font-size:.4em;color:var(--acc)}' +
    '.s8-tcard ul{list-style:none;margin:0;padding:12px 18px;display:flex;flex-direction:column;gap:8px;flex:1;justify-content:center}.s8-tcard li{font-size:clamp(19px,2.1vw,30px);border-radius:12px;background:#FEE2E2;color:#991B1B;padding:6px 14px}.s8-tcard li::before{content:"🚫 "}' +
    '.s8-tcard.hide .tw,.s8-tcard.hide ul{filter:blur(14px)}' +
    '.s8-tside{flex:1;display:flex;flex-direction:column;gap:12px;justify-content:center;align-items:center;text-align:center}.s8-turn{font-size:clamp(20px,2.2vw,32px)}.s8-turn b{color:var(--tc)}' +
    /* القبعات */
    '.s8-hats{flex:0 0 40%;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;align-content:center}.s8-hat{border:3px solid transparent;border-radius:18px;background:rgba(255,255,255,.07);padding:8px 4px;display:flex;flex-direction:column;align-items:center;gap:2px;transition:transform .2s;position:relative}' +
    '.s8-hat.on{border-color:var(--acc);transform:scale(1.07);background:rgba(255,255,255,.18)}.s8-hat.seen::after{content:"✓";position:absolute;top:4px;left:8px;color:#4ADE80;font-size:20px}.s8-hat span{font-size:clamp(14px,1.3vw,19px)}' +
    '.s8-hg{width:clamp(64px,6.5vw,92px);height:clamp(48px,5vw,70px);position:relative}.s8-hg::before{content:"";position:absolute;left:18%;right:18%;top:0;bottom:22%;border-radius:12px 12px 4px 4px;background:var(--hc);box-shadow:inset -8px 0 0 rgba(0,0,0,.15)}' +
    '.s8-hg::after{content:"";position:absolute;left:0;right:0;bottom:4%;height:24%;border-radius:50%;background:var(--hc);box-shadow:inset 0 -5px 0 rgba(0,0,0,.18)}.s8-hg i{position:absolute;left:18%;right:18%;bottom:30%;height:14%;background:rgba(0,0,0,.35);z-index:1}' +
    '.s8-hq{flex:1}.s8-hq .hn{display:flex;align-items:center;gap:12px}.s8-hq .hn b{font-size:clamp(22px,2.4vw,34px)}' +
    /* الأركان */
    '.s8-cor{flex:1;display:grid;grid-template-columns:1fr 1.5fr 1fr;grid-template-rows:1fr 1fr;gap:12px;min-height:0}.s8-cn{border-radius:20px;border:3px solid var(--cc);background:rgba(0,0,0,.25);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;position:relative;transition:all .3s}' +
    '.s8-cn .cl{font-size:clamp(17px,1.8vw,26px);color:var(--cc)}.s8-cn .cv{font-size:clamp(30px,3.4vw,50px)}.s8-cn .bar{position:absolute;bottom:0;right:0;height:8px;background:var(--cc);border-radius:0 0 0 18px;transition:width .6s}' +
    '.s8-cn .cb{display:flex;gap:6px}.s8-cn .cb button{border:0;border-radius:10px;width:44px;height:38px;background:var(--cc);color:#111;font-size:22px}.s8-cn.win{box-shadow:0 0 0 4px #fff,0 0 40px var(--cc);transform:scale(1.03)}.s8-cn.lose{opacity:.45}' +
    '.s8-cs{grid-column:2;grid-row:1 / span 2;display:flex;flex-direction:column;justify-content:center;gap:10px;text-align:center}' +
    /* المؤتمر */
    '.s8-pr{flex:1;display:flex;gap:16px;min-height:0}.s8-guest{flex:0 0 34%;border-radius:24px;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;padding:14px;' +
    'background:radial-gradient(circle at 50% 0,rgba(255,255,255,.35),transparent 55%),linear-gradient(180deg,#1E1B4B,#0B1222);border:3px solid var(--acc)}' +
    '.s8-guest .av{font-size:clamp(70px,8vw,120px);animation:s8f 3s ease-in-out infinite;filter:drop-shadow(0 10px 20px rgba(0,0,0,.5))}.s8-guest .rl{font-size:clamp(20px,2.2vw,32px);color:var(--acc)}.s8-guest .mic{position:absolute;bottom:8px;left:12px;font-size:36px}' +
    '.s8-qs{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:10px;align-content:start}.s8-qc{border-radius:16px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.07);padding:10px 14px;text-align:right;font-size:clamp(15px,1.6vw,23px);display:flex;gap:8px;align-items:flex-start}' +
    '.s8-qc.on{background:#fff;color:#111827;border-color:var(--acc)}.s8-qc.seen{opacity:.6}.s8-qc i{font-style:normal}' +
    /* ماذا لو */
    '.s8-wi{flex:1;display:flex;gap:16px;min-height:0}.s8-cloud{flex:0 0 46%;border-radius:40px;background:#fff;color:#1E1B4B;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:20px 26px;gap:10px;position:relative;box-shadow:0 20px 50px rgba(0,0,0,.45)}' +
    '.s8-cloud::before{content:"💭";position:absolute;top:-30px;right:24px;font-size:56px}.s8-cloud .wq{font-size:clamp(22px,2.6vw,38px);line-height:1.5}' +
    '.s8-phase{display:flex;gap:6px}.s8-phase span{border-radius:99px;padding:4px 14px;background:rgba(255,255,255,.12);font-size:clamp(14px,1.3vw,19px)}.s8-phase span.on{background:var(--acc);color:#111}' +
    '.s8-ideas{display:flex;flex-direction:column;gap:8px}.s8-idea{border-radius:14px;background:rgba(255,255,255,.95);color:#111827;padding:8px 14px;font-size:clamp(16px,1.7vw,24px);animation:s8in .45s}.s8-idea::before{content:"💡 "}' +
    '.s8-cv{position:absolute;inset:0;pointer-events:none;z-index:5}' +
    '.s8-hb{position:fixed;inset:auto auto 14px 50%;transform:translateX(-50%);z-index:100001;background:#111827;color:#fff;border:2px solid var(--acc,#FACC15);border-radius:14px;padding:8px 18px;font-size:18px}' +
    '.s8-surp{border-style:dashed;border-color:var(--acc)}.s8-more{background:rgba(0,0,0,.25)}.s8-card.hl{transform:scale(1.06);border-color:#fff;box-shadow:0 0 30px var(--acc)}' +
    '.s8-menu3{grid-template-columns:repeat(5,1fr)}.s8-menu3 .s8-card .ds{display:none}' +
    '.s8-judge{font-size:clamp(60px,7vw,100px);text-align:center;transform-origin:70% 90%}.s8-judge.bang{animation:s8hit .5s}.s8-scroll{background:#FEF3C7;color:#78350F;border-radius:14px;padding:12px 16px;text-align:center;border:3px double #B45309}.s8-court{justify-content:center}' +
    '.s8-tsel{border:2px solid var(--tc);background:rgba(0,0,0,.25);border-radius:12px;padding:4px 10px;font-size:clamp(13px,1.2vw,17px)}.s8-tsel.on{background:var(--tc);color:#111}' +
    '.s8-vote{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,.25);border-radius:14px;padding:6px 12px;font-size:clamp(15px,1.5vw,21px)}.s8-vote b{font-size:1.5em;min-width:40px;text-align:center}.s8-vote button{border:0;border-radius:10px;width:40px;height:36px;background:rgba(255,255,255,.18);font-size:20px}' +
    '.s8-lie{flex:1;display:flex;flex-direction:column;gap:10px;min-height:0}.s8-lcards{flex:1;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;min-height:0}' +
    '.s8-lcard{border-radius:22px;background:#fff;color:#111827;padding:12px 14px;display:flex;flex-direction:column;gap:8px;justify-content:center;text-align:center;position:relative;border:4px solid transparent;transition:all .4s}.s8-lcard>i{font-style:normal;position:absolute;top:8px;right:12px;background:var(--c1);color:#fff;border-radius:50%;width:34px;height:34px;line-height:34px}' +
    '.s8-lteams{display:flex;gap:6px;justify-content:center}.s8-lteams button{border:3px solid var(--tc);background:#F1F5F9;border-radius:12px;width:48px;height:44px;font-size:22px;opacity:.55}.s8-lteams button.on{opacity:1;background:var(--tc);transform:scale(1.12)}' +
    '.s8-lres{font-size:clamp(14px,1.35vw,19px)}.s8-lcard.tru{border-color:#22C55E;background:#ECFDF5}.s8-lcard.lie{border-color:#EF4444;background:#FEF2F2;transform:rotate(-1.5deg) scale(1.03)}.s8-lcard.lie .s8-lres{color:#991B1B}' +
    '.s8-memw{flex:1;display:flex;gap:14px;min-height:0}.s8-mem{flex:1;display:grid;gap:10px;grid-auto-rows:1fr;min-height:0}.s8-mc{border:0;padding:0;position:relative;perspective:800px;background:none;min-height:0}' +
    '.s8-mc>div{position:absolute;inset:0;border-radius:16px;display:flex;align-items:center;justify-content:center;text-align:center;padding:6px 8px;backface-visibility:hidden;-webkit-backface-visibility:hidden;transition:transform .5s}' +
    '.s8-mc .fr{background:linear-gradient(135deg,var(--c1),var(--c2));border:3px solid rgba(255,255,255,.3);font-size:clamp(22px,2.4vw,34px)}.s8-mc .fr span{opacity:.6}.s8-mc .bk{transform:rotateY(180deg);background:#fff;color:#111827;font-size:clamp(14px,1.45vw,20px);line-height:1.45}.s8-mc .bk.term{background:#FEF9C3;font-size:clamp(17px,1.8vw,26px)}' +
    '.s8-mc.up .fr{transform:rotateY(180deg)}.s8-mc.up .bk{transform:rotateY(360deg)}.s8-mc.ok .bk{background:#DCFCE7;box-shadow:0 0 0 4px #22C55E}' +
    '.s8-bombw{flex:1;display:flex;gap:16px;min-height:0}.s8-bombL{flex:0 0 36%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}.s8-bomb{font-size:clamp(110px,13vw,190px);position:relative;line-height:1}' +
    '.s8-bomb.lit{animation:s8shk .35s infinite}.s8-bomb .fz{position:absolute;top:2%;right:18%;width:30px;height:30px;border-radius:50%}.s8-bomb.lit .fz{background:radial-gradient(#FFF7AE,#F97316 50%,transparent 70%);animation:s8sh .1s infinite}.s8-bomb.boom{animation:s8in .4s;filter:drop-shadow(0 0 40px #F97316)}.s8-bomb.boom::after{content:"💥";position:absolute;inset:0;font-size:1.2em;text-align:center}' +
    '.s8-holder{font-size:clamp(20px,2.2vw,32px);background:#fff;color:#111827;border-radius:14px;padding:6px 18px;min-height:1.6em}.s8-holder:empty{display:none}' +
    '.s8-wheelw{flex:1;display:flex;gap:16px;min-height:0}.s8-wheelL{flex:0 0 40%;position:relative;display:flex;align-items:center;justify-content:center;min-height:0}.s8-wh{width:min(100%,58vh);aspect-ratio:1;transition:transform 4s cubic-bezier(.15,.9,.25,1);border-radius:50%;box-shadow:0 0 0 8px var(--acc),0 20px 50px rgba(0,0,0,.5)}.s8-ptr{position:absolute;top:-4px;left:50%;transform:translateX(-50%);font-size:44px;color:#fff;z-index:2;text-shadow:0 3px 6px #000}' +
    '.s8-racew{flex:1;display:flex;gap:16px;min-height:0}.s8-mt{flex:0 0 36%;position:relative;border-radius:24px;overflow:hidden;background:linear-gradient(180deg,#7DD3FC,#E0F2FE 60%)}.s8-mt::before{content:"";position:absolute;left:4%;right:4%;bottom:0;height:88%;background:linear-gradient(160deg,#78716C,#44403C);clip-path:polygon(50% 0,100% 100%,0 100%)}.s8-mt::after{content:"";position:absolute;left:38%;right:38%;top:12%;height:14%;background:#fff;clip-path:polygon(50% 0,100% 100%,0 100%)}' +
    '.s8-mt .peak{position:absolute;top:4%;left:50%;transform:translateX(-50%);font-size:40px;z-index:2}.s8-cl{position:absolute;z-index:3;font-size:clamp(28px,3vw,42px);width:56px;height:56px;border-radius:50%;background:#fff;border:4px solid var(--tc);display:grid;place-items:center;transition:bottom .8s cubic-bezier(.3,1.5,.5,1)}.s8-cl.win{animation:s8f .6s infinite}' +
    '.s8-rgrid{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.s8-rt{display:flex;align-items:center;gap:6px;background:rgba(0,0,0,.25);border-radius:14px;padding:5px 10px;font-size:clamp(14px,1.3vw,18px)}.s8-rt button{border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.08);border-radius:10px;padding:3px 10px}.s8-rt button.on{background:var(--acc);color:#111}' +
    '.s8-draww{flex:1;display:flex;gap:16px;min-height:0}.s8-board{flex:1;position:relative;background:#fff;border-radius:22px;overflow:hidden;box-shadow:inset 0 0 0 6px #CBD5E1}.s8-board canvas{position:absolute;inset:0;touch-action:none;cursor:crosshair}' +
    '.s8-dtools{position:absolute;top:10px;left:10px;display:flex;gap:6px;z-index:2}.s8-dtools button{width:38px;height:38px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)}.s8-dtools .cl{background:#F1F5F9;font-size:18px}' +
    '.s8-peek{border:2px dashed var(--acc);background:rgba(0,0,0,.3);border-radius:14px;padding:10px 14px;font-size:clamp(14px,1.3vw,18px);user-select:none;-webkit-user-select:none}.s8-peek.on{background:#fff;color:#111827;font-size:clamp(22px,2.4vw,34px)}.s8-peek[disabled]{opacity:.4}' +
    '@media (max-width:1180px){.s8-teams .s8-tm b{display:none}}@media (max-width:900px){.s8-menu{grid-template-columns:repeat(2,1fr)}.s8-intro{display:none}}';
  var st = el('style'); st.textContent = css; document.head.appendChild(st);

  // ---------- الفرق ----------
  var TEAMS = [['فريق الذرّة', '⚛️', '#38BDF8'], ['فريق المجرّة', '🌌', '#C084FC'], ['فريق الخلية', '🧬', '#4ADE80'], ['فريق البركان', '🌋', '#FB923C']];
  var SK = 'strat8-' + L.id, S = { n: 3, sc: [0, 0, 0, 0], done: {} };
  try { var sv = JSON.parse(localStorage.getItem(SK) || 'null'); if (sv && sv.sc) S = Object.assign(S, sv); } catch (e) {}
  function save() { try { localStorage.setItem(SK, JSON.stringify(S)); } catch (e) {} }

  // ---------- أسماء الطلاب (كشوف المنصة الموحدة) ----------
  function roster() {
    try {
      var d = JSON.parse(localStorage.getItem('durus-classes') || 'null');
      if (d && d.classes) { var c = d.cur; if (!d.classes[c]) c = Object.keys(d.classes)[0]; return (d.classes[c] || []).slice(); }
    } catch (e) {}
    return [];
  }
  var pool = [];
  function nextName() { var all = roster(); if (!all.length) return null; pool = pool.filter(function (x) { return all.indexOf(x) >= 0; }); if (!pool.length) pool = shuffle(all); return pool.pop(); }
  function namePicker(label) {
    var w = el('div', 's8-row'), b = el('button', 's8-btn g', '🎯 ' + (label || 'من يجيب؟')), out = el('span', 's8-name');
    b.onclick = function () {
      var all = roster();
      if (!all.length) { out.textContent = 'أضف أسماء الشعبة من زر «👥 الطلاب»'; return; }
      var fin = nextName(), k = 0; out.classList.add('spin');
      var iv = setInterval(function () { out.textContent = '🎲 ' + all[Math.floor(Math.random() * all.length)]; SFX.tick(); if (++k > 14) { clearInterval(iv); out.classList.remove('spin'); out.textContent = '⭐ ' + fin; SFX.pop(); } }, 75);
    };
    w.appendChild(b); w.appendChild(out); return w;
  }

  // ---------- مؤقت دائري ----------
  function timer(secs, onEnd) {
    var w = el('div', 's8-timer', '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="10"/><circle class="rg" cx="50" cy="50" r="44" fill="none" stroke="' + ACC + '" stroke-width="10" stroke-linecap="round" stroke-dasharray="276.5" stroke-dashoffset="0"/></svg><b>' + n(secs) + '</b>');
    var left = secs, iv = null, rg = w.querySelector('.rg'), b = w.querySelector('b');
    function draw() { b.textContent = n(left); rg.style.strokeDashoffset = 276.5 * (1 - left / secs); w.classList.toggle('hot', left <= 5 && left > 0); }
    var api = {
      el: w,
      start: function (s) { api.stop(); if (s) { secs = s; } left = secs; draw(); iv = setInterval(function () { left--; draw(); if (left <= 5 && left > 0) SFX.tick(); if (left <= 0) { api.stop(); SFX.buzz(); if (onEnd) onEnd(); } }, 1000); },
      stop: function () { if (iv) clearInterval(iv); iv = null; w.classList.remove('hot'); },
      running: function () { return !!iv; }
    };
    return api;
  }

  // ---------- احتفال ----------
  function confetti(root) {
    var cv = el('canvas', 's8-cv'); root.appendChild(cv); var x = cv.getContext('2d');
    cv.width = root.clientWidth; cv.height = root.clientHeight;
    var cols = [ACC, '#38BDF8', '#4ADE80', '#F472B6', '#FB923C', '#fff'], P = [];
    for (var i = 0; i < 160; i++) P.push({ x: cv.width / 2 + (Math.random() - 0.5) * 200, y: cv.height * 0.45, vx: (Math.random() - 0.5) * 18, vy: -Math.random() * 18 - 6, s: 6 + Math.random() * 8, r: Math.random() * 6, c: cols[i % cols.length] });
    var t0 = Date.now();
    (function f() {
      x.clearRect(0, 0, cv.width, cv.height);
      P.forEach(function (p) { p.vy += 0.5; p.x += p.vx; p.y += p.vy; p.r += 0.2; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); x.restore(); });
      if (Date.now() - t0 < 2600) requestAnimationFrame(f); else cv.remove();
    })();
  }

  // ---------- الواجهة ----------
  var META = {
    box: { i: '🎁', n: 'الصندوق الغامض', d: 'تلميحات تتكشف واحدًا تلو الآخر… من يكتشف المفهوم المخبّأ أولًا؟', goal: 'استدعاء المفاهيم وربطها بخصائصها', skill: 'الاستنتاج', time: '٥ دقائق' },
    auc: { i: '🔨', n: 'المزاد العلمي', d: 'تزايد الفرق بعملاتها على العبارات الصحيحة… والعبارة الخاطئة تُفلس من يشتريها!', goal: 'تقويم الفهم وتصحيح المفاهيم الخاطئة', skill: 'التفكير الناقد واتخاذ القرار', time: '٧ دقائق' },
    tab: { i: '🚫', n: 'الكلمة الممنوعة', d: 'صِف المصطلح لفريقك دون أن تنطق الكلمات الممنوعة… ضد الساعة!', goal: 'إتقان المفردات العلمية والتعبير عنها', skill: 'التواصل العلمي', time: '٦ دقائق' },
    hats: { i: '🎩', n: 'قبعات التفكير الست', d: 'ست قبعات ملوّنة، لكل قبعة طريقة تفكير وسؤال من الدرس', goal: 'تناول الموضوع من زوايا تفكير متعددة', skill: 'التفكير الإبداعي والناقد', time: '٨ دقائق' },
    cor: { i: '🧭', n: 'الأركان الأربعة', d: 'عبارة جريئة… يتجه كل طالب إلى الركن الذي يمثّل رأيه، ثم يُعلن الحكم العلمي', goal: 'كشف التصورات البديلة ومناقشتها', skill: 'الحجة والتبرير', time: '٦ دقائق' },
    pr: { i: '🎤', n: 'المؤتمر الصحفي', d: 'طالب يتقمّص شخصية من الدرس، وزملاؤه صحفيون يحاورونه', goal: 'تعميق الفهم بلعب الأدوار', skill: 'التواصل والتقمّص', time: '٧ دقائق' },
    wi: { i: '💭', n: 'ماذا لو؟', d: 'سيناريو خيالي يثير العقول: فكّر – زاوج – شارك', goal: 'تطبيق المعرفة في مواقف جديدة', skill: 'التفكير التخيّلي وحل المشكلات', time: '٥ دقائق' },
    court: { i: '⚖️', n: 'المحكمة العلمية', d: 'ادّعاء علمي في قفص الاتهام: فريق للادعاء وفريق للدفاع، والصف هيئة المحلّفين', goal: 'بناء الحجة العلمية وتقييمها', skill: 'التفكير الناقد والإقناع', time: '٨ دقائق' },
    lie: { i: '🕵️', n: 'حقيقتان وكذبة', d: 'ثلاث عبارات بينها كذبة واحدة… أي فريق يكشفها أولًا؟', goal: 'تمييز المعلومة الصحيحة من الخاطئة', skill: 'التحليل والتمييز', time: '٥ دقائق' },
    mem: { i: '🧠', n: 'بطاقات الذاكرة', d: 'اقلب بطاقتين وطابق المصطلح بمعناه… وتذكّر أماكن البطاقات!', goal: 'ترسيخ المفردات العلمية ومعانيها', skill: 'التذكّر والربط', time: '٦ دقائق' },
    bomb: { i: '💣', n: 'القنبلة الموقوتة', d: 'القنبلة تتنقّل بين الطلاب… ومن تنفجر عنده يجيب السؤال!', goal: 'المراجعة السريعة بإثارة وتشويق', skill: 'الاستدعاء السريع', time: '٥ دقائق' },
    wheel: { i: '🎡', n: 'عجلة الحظ', d: 'أدر العجلة: نقاط، أو مكافأة، أو سرقة… أو ضياع الدور!', goal: 'التقويم التكويني بروح المنافسة', skill: 'الاستدعاء والتطبيق', time: '٧ دقائق' },
    race: { i: '🏔️', n: 'سباق القمة', d: 'صح أم خطأ؟ كل إجابة صحيحة ترفع فريقك خطوة نحو قمة الجبل', goal: 'تقويم الفهم بسرعة ومشاركة الجميع', skill: 'اتخاذ القرار', time: '٦ دقائق' },
    draw: { i: '🎨', n: 'ارسم وخمّن', d: 'طالب يرسم المصطلح دون كلمات، وفريقه يخمّن قبل نهاية الوقت', goal: 'التعبير البصري عن المفاهيم', skill: 'التمثيل البصري والتواصل', time: '٦ دقائق' }
  };
  // بيانات الاستراتيجيات الإضافية مشتقة من محتوى الدرس نفسه
  var TF = (DATA.auc || []).concat(DATA.cor || []);
  if (DATA.cor) DATA.court = DATA.cor;
  if (TF.length >= 3) { DATA.lie = TF; DATA.race = TF; }
  var QS = (DATA.hats || []).concat(DATA.pr ? DATA.pr.qa : []);
  if (QS.length) { DATA.bomb = QS; DATA.wheel = QS; }
  if (DATA.tab) DATA.draw = DATA.tab.map(function (x) { return x[0]; });
  (function () {
    var pr = [], seen = {};
    function push(t, d) { t = String(t).replace(/<[^>]+>/g, '').trim(); d = String(d).replace(/<[^>]+>/g, '').trim(); if (!t || !d || seen[t] || pr.length >= 6) return; if (d.length > 90) { var c = d.search(/[،.؛:]/); if (c > 25) d = d.slice(0, c); } seen[t] = 1; pr.push([t, d]); }
    (function w(o) { if (!o || typeof o !== 'object') return; if (Array.isArray(o)) { o.forEach(w); return; } var t = o.term || o.w, d = o.def || o.d; if (typeof t === 'string' && typeof d === 'string' && d.length > 8) push(t, d); for (var k in o) if (k !== 'theme') w(o[k]); })(L);
    (DATA.box || []).forEach(function (b) { push(b.a, b.c[2]); });
    if (pr.length >= 4) DATA.mem = pr;
  })();
  // لكل فصل مجموعة استراتيجيات مختلفة
  var SETS = {
    1: ['box', 'lie', 'draw', 'hats', 'court'], 2: ['auc', 'mem', 'wheel', 'cor', 'wi'], 3: ['race', 'tab', 'pr', 'bomb', 'lie'],
    4: ['wheel', 'box', 'court', 'mem', 'wi'], 5: ['pr', 'auc', 'draw', 'hats', 'race'], 6: ['bomb', 'cor', 'mem', 'tab', 'box'],
    7: ['court', 'race', 'wi', 'pr', 'mem'], 8: ['lie', 'hats', 'tab', 'wheel', 'draw'], 9: ['box', 'bomb', 'auc', 'cor', 'mem'],
    10: ['court', 'wheel', 'wi', 'race', 'tab'], 11: ['draw', 'lie', 'pr', 'hats', 'bomb'], 12: ['mem', 'race', 'box', 'court', 'cor']
  };
  var ALL = Object.keys(META).filter(function (k) { return DATA[k]; });
  var CH = +((String(L.id).match(/-c(\d+)-/) || [])[1] || 0);
  var ORDER = (SETS[CH] || ALL.slice(0, 5)).filter(function (k) { return DATA[k]; });
  var EXTRA = ALL.filter(function (k) { return ORDER.indexOf(k) < 0; });

  var root = null, main = null, teamsEl = null, cleanup = null;
  function openUI() {
    if (root) return;
    root = el('div', 's8'); root.setAttribute('role', 'dialog'); root.setAttribute('aria-label', 'استراتيجيات الدرس');
    var top = el('div', 's8-top');
    top.innerHTML = '<button class="s8-ib s8-x" aria-label="إغلاق">✕</button><button class="s8-ib s8-home" aria-label="القائمة">🏠</button>' +
      '<div class="s8-ttl"><small>🚀 استراتيجيات الدرس</small>' + esc(L.title || '') + '</div><div class="s8-teams"></div>' +
      '<button class="s8-ib s8-tn" aria-label="عدد الفرق">👥 ' + n(S.n) + '</button><button class="s8-ib s8-rs" aria-label="تصفير النقاط">🔄</button>';
    root.appendChild(top);
    teamsEl = top.querySelector('.s8-teams');
    main = el('div', 's8-main'); root.appendChild(main);
    top.querySelector('.s8-x').onclick = closeUI;
    top.querySelector('.s8-home').onclick = menu;
    top.querySelector('.s8-tn').onclick = function () { S.n = S.n >= 4 ? 2 : S.n + 1; this.textContent = '👥 ' + n(S.n); save(); drawTeams(); if (cur) show(cur); };
    top.querySelector('.s8-rs').onclick = function () { S.sc = [0, 0, 0, 0]; save(); drawTeams(); };
    document.body.appendChild(root);
    document.addEventListener('keydown', onKey);
    drawTeams(); menu();
  }
  function onKey(e) { if (e.key === 'Escape') closeUI(); }
  function closeUI() { if (cleanup) cleanup(); cleanup = null; if (root) root.remove(); root = null; cur = null; document.removeEventListener('keydown', onKey); }
  function drawTeams() {
    teamsEl.innerHTML = '';
    for (var i = 0; i < S.n; i++) (function (i) {
      var t = TEAMS[i], c = el('div', 's8-tm'); c.style.setProperty('--tc', t[2]);
      c.innerHTML = '<span>' + t[1] + '</span><b>' + t[0] + '</b><span class="sc">' + n(S.sc[i]) + '</span><button aria-label="زيادة">+</button><button aria-label="نقص">−</button>';
      var bs = c.querySelectorAll('button'); bs[0].onclick = function () { add(i, 1); }; bs[1].onclick = function () { add(i, -1); };
      teamsEl.appendChild(c);
    })(i);
  }
  function add(i, d) {
    S.sc[i] = Math.max(0, S.sc[i] + d); save(); drawTeams();
    var c = teamsEl.children[i]; if (c && d > 0) { c.classList.add('bump'); setTimeout(function () { c.classList.remove('bump'); }, 350); SFX.ok(); }
  }
  function award(pts, label) {
    var w = el('div', 's8-award', '<span>🏆 ' + (label || 'امنح') + ' <b style="color:var(--acc)">' + n(pts) + '</b> ' + (pts === 1 ? 'نقطة' : 'نقاط') + ' لـ:</span>');
    for (var i = 0; i < S.n; i++) (function (i) {
      var b = el('button', '', TEAMS[i][1] + ' ' + TEAMS[i][0]); b.style.setProperty('--tc', TEAMS[i][2]);
      b.onclick = function () { add(i, pts); confetti(root); w.innerHTML = '<span>✅ أُضيفت النقاط إلى ' + TEAMS[i][0] + '</span>'; };
      w.appendChild(b);
    })(i);
    return w;
  }
  function metaBar(k) {
    var m = META[k];
    return el('div', 's8-meta', '<b class="mn">' + m.i + ' ' + m.n + '</b><span>🎯 الهدف: ' + m.goal + '</span><span>🧠 المهارة: ' + m.skill + '</span><span>⏱ ' + m.time + '</span>');
  }
  function nav(i, total, go) {
    var w = el('div', 's8-nav'), d = '';
    for (var k = 0; k < total; k++) d += '<i' + (k === i ? ' class="on"' : '') + '></i>';
    var p = el('button', 's8-btn g', '→ السابق'), x = el('button', 's8-btn', 'التالي ←');
    p.disabled = i === 0; x.disabled = i >= total - 1;
    p.onclick = function () { go(i - 1); }; x.onclick = function () { go(i + 1); };
    w.appendChild(p); w.appendChild(el('div', 's8-dots', d)); w.appendChild(x); return w;
  }

  var cur = null;
  function menu() {
    if (cleanup) cleanup(); cleanup = null; cur = null;
    main.innerHTML = '';
    var g = el('div', 's8-menu');
    var intro = el('div', 's8-card s8-intro', '<div class="ic">🚀</div><div class="nm">استراتيجيات نشطة</div><div class="ds">مصمّمة على موضوع الدرس: تعلّم باللعب، وعمل الفرق، والتفكير العليا. النقاط تُحفظ للفرق في أعلى الشاشة.</div>');
    g.appendChild(intro);
    ORDER.forEach(function (k) { g.appendChild(card(k)); });
    var sp = el('button', 's8-card s8-surp', '<div class="ic">🎲</div><div class="nm">الاستراتيجية المفاجئة</div><div class="ds">دع الحظ يختار استراتيجية اليوم!</div>');
    sp.onclick = function () {
      var cs = g.querySelectorAll('.s8-card[data-k]'), k = 0, fin = Math.floor(Math.random() * cs.length), steps = cs.length * 2 + fin;
      var iv = setInterval(function () { cs.forEach(function (c) { c.classList.remove('hl'); }); cs[k % cs.length].classList.add('hl'); SFX.tick(); if (++k > steps) { clearInterval(iv); setTimeout(function () { show(cs[fin].dataset.k); }, 500); } }, 110);
    };
    g.appendChild(sp);
    if (EXTRA.length) { var mo = el('button', 's8-card s8-more', '<div class="ic">📚</div><div class="nm">استراتيجيات أخرى</div><div class="ds">' + n(EXTRA.length) + ' استراتيجيات إضافية لهذا الدرس</div>'); mo.onclick = more; g.appendChild(mo); }
    main.appendChild(g);
  }
  function card(k) {
    var m = META[k], c = el('button', 's8-card' + (S.done[k] ? ' done' : ''), '<div class="ic">' + m.i + '</div><div class="nm">' + m.n + '</div><div class="ds">' + m.d + '</div><div class="tm">⏱ ' + m.time + '</div>');
    c.dataset.k = k; c.onclick = function () { SFX.pop(); show(k); }; return c;
  }
  function more() {
    if (cleanup) cleanup(); cleanup = null; cur = null; main.innerHTML = '';
    var g = el('div', 's8-menu s8-menu3');
    var bk = el('button', 's8-card s8-more', '<div class="ic">↩️</div><div class="nm">استراتيجيات الفصل</div><div class="ds">العودة إلى استراتيجيات هذا الفصل</div>'); bk.onclick = menu; g.appendChild(bk);
    EXTRA.forEach(function (k) { g.appendChild(card(k)); });
    main.appendChild(g);
  }
  function show(k) {
    if (cleanup) cleanup(); cleanup = null; cur = k;
    S.done[k] = 1; save();
    main.innerHTML = '';
    main.appendChild(metaBar(k));
    var stage = el('div', 's8-stage'); main.appendChild(stage);
    cleanup = R[k](stage, DATA[k]) || null;
  }

  // ---------- الاستراتيجيات ----------
  var R = {};

  // 🎁 الصندوق الغامض
  R.box = function (stage, items) {
    var i = 0;
    function go(j) {
      i = j; var it = items[i], k = 0;
      stage.innerHTML = '';
      var bw = el('div', 's8-boxw'), box = el('div', 's8-box', '<div class="ld"></div><div class="bd">؟</div><div class="out">' + esc(it.a) + '</div>');
      bw.appendChild(box); stage.appendChild(bw);
      var side = el('div', 's8-clues');
      side.appendChild(el('div', 's8-mid', '🔎 ما المفهوم المخبّأ في الصندوق؟'));
      var cl = it.c.map(function (c, j) { var e = el('div', 's8-clue', '<i>' + n(j + 1) + '</i><span>🔒 تلميح مخفي</span>'); side.appendChild(e); return e; });
      var pts = el('div', 's8-pts'); var ctl = el('div', 's8-row'), hint = el('button', 's8-btn g', '💡 تلميح جديد'), opn = el('button', 's8-btn', '🎁 افتح الصندوق');
      var foot = el('div', 's8-row'); foot.appendChild(pts); foot.appendChild(namePicker('من يخمّن؟'));
      ctl.appendChild(hint); ctl.appendChild(opn);
      side.appendChild(foot); side.appendChild(ctl);
      var aw = el('div'); side.appendChild(aw);
      side.appendChild(nav(i, items.length, go));
      stage.appendChild(side);
      function val() { return Math.max(1, it.c.length - k + 1); }
      function upd() { pts.innerHTML = 'قيمة الإجابة الآن: <b>' + n(val()) + '</b> نقاط'; hint.disabled = k >= it.c.length; }
      function reveal() { if (k >= it.c.length) return; var e = cl[k]; e.classList.add('on'); e.querySelector('span').innerHTML = it.c[k]; k++; box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake'); SFX.pop(); upd(); }
      hint.onclick = reveal;
      opn.onclick = function () { var v = val(); while (k < it.c.length) reveal(); box.classList.add('open'); SFX.reveal(); opn.disabled = true; hint.disabled = true; pts.innerHTML = 'الإجابة: <b>' + esc(it.a) + '</b>'; aw.innerHTML = ''; aw.appendChild(award(v)); };
      reveal(); upd();
    }
    go(0);
  };

  // 🔨 المزاد العلمي
  R.auc = function (stage, items) {
    var coins = [], i = 0;
    for (var t = 0; t < 4; t++) coins.push(1000);
    var wrap = el('div', 's8-auc'); stage.appendChild(wrap);
    function go(j) {
      i = j; wrap.innerHTML = '';
      if (i >= items.length) return final();
      var it = items[i], bids = [0, 0, 0, 0], sold = false;
      var lot = el('div', 's8-lot', '<span class="no">العبارة ' + n(i + 1) + ' من ' + n(items.length) + '</span><span class="gv">🔨</span><div class="s8-big" style="flex:1">' + it[0] + '</div><div class="s8-stamp"></div>');
      wrap.appendChild(lot);
      wrap.appendChild(el('div', 's8-sm', 'كل فريق يزايد بعملاته على العبارة إن اعتقد أنها <b style="color:#4ADE80">صحيحة</b>؛ إن صحّت ربح مبلغه، وإن كانت خاطئة خسره. اختر «٠» إن لم تشترِ.'));
      var bd = el('div', 's8-bids'); bd.style.gridTemplateColumns = 'repeat(' + S.n + ',1fr)'; wrap.appendChild(bd);
      var dls = [];
      for (var t = 0; t < S.n; t++) (function (t) {
        var c = el('div', 's8-bid'); c.style.setProperty('--tc', TEAMS[t][2]);
        c.innerHTML = '<div>' + TEAMS[t][1] + ' ' + TEAMS[t][0] + '</div><div class="cn">' + n(coins[t]) + '</div>';
        var ch = el('div', 's8-chips');
        [0, 100, 200, 300, 500].forEach(function (v) {
          var b = el('button', v === 0 ? 'on' : '', n(v)); b.onclick = function () { if (sold) return; if (v > coins[t]) { SFX.bad(); return; } bids[t] = v; ch.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); SFX.tick(); };
          ch.appendChild(b);
        });
        c.appendChild(ch); var dl = el('div', 'dl'); dl.dir = 'ltr'; c.appendChild(dl); dls.push([c, dl]); bd.appendChild(c);
      })(t);
      var row = el('div', 's8-row'), sell = el('button', 's8-btn', '🔨 بِيعَت! اكشف الحكم'), nx = el('button', 's8-btn g', i === items.length - 1 ? '🏁 النتيجة النهائية' : 'العبارة التالية ←');
      nx.disabled = true; row.appendChild(sell); row.appendChild(nx); wrap.appendChild(row);
      var fx = el('div'); wrap.appendChild(fx);
      sell.onclick = function () {
        sold = true; sell.disabled = true; nx.disabled = false;
        var gv = lot.querySelector('.gv'); gv.classList.add('hit'); SFX.hammer();
        setTimeout(function () {
          var ok = !!it[1], stp = lot.querySelector('.s8-stamp');
          stp.textContent = ok ? '✔ صحيحة' : '✖ خاطئة'; stp.style.color = stp.style.borderColor = ok ? '#4ADE80' : '#F87171'; stp.classList.add('on');
          (ok ? SFX.ok : SFX.bad)();
          for (var t = 0; t < S.n; t++) { var d = ok ? bids[t] : -bids[t]; coins[t] += d; dls[t][0].querySelector('.cn').textContent = n(coins[t]); dls[t][1].textContent = d ? (d > 0 ? '+' : '−') + n(Math.abs(d)) : '—'; dls[t][1].className = 'dl ' + (d > 0 ? 'p' : d < 0 ? 'm' : ''); }
          if (it[2]) { fx.innerHTML = ''; fx.appendChild(el('div', 's8-ans' + (ok ? '' : ' s8-fix'), (ok ? '📘 ' : '✏️ التصحيح: ') + it[2])); }
        }, 380);
      };
      nx.onclick = function () { go(i + 1); };
    }
    function final() {
      var mx = Math.max.apply(null, coins.slice(0, S.n)), wins = [];
      var p = el('div', 's8-pnl'); p.style.cssText += 'flex:1;align-items:center;justify-content:center;text-align:center';
      p.appendChild(el('div', 's8-big', '🏁 انتهى المزاد! رصيد الفرق النهائي'));
      var r = el('div', 's8-row');
      for (var t = 0; t < S.n; t++) { if (coins[t] === mx) wins.push(t); var c = el('div', 's8-bid', '<div>' + TEAMS[t][1] + ' ' + TEAMS[t][0] + '</div><div class="cn">' + n(coins[t]) + '</div>' + (coins[t] === mx ? '<div>👑 الأعلى</div>' : '')); c.style.setProperty('--tc', TEAMS[t][2]); c.style.minWidth = '180px'; r.appendChild(c); }
      p.appendChild(r);
      var b = el('button', 's8-btn', '🏆 امنح الفائز ٣ نقاط');
      b.onclick = function () { wins.forEach(function (t) { add(t, 3); }); confetti(root); SFX.fan(); b.disabled = true; };
      p.appendChild(b);
      var again = el('button', 's8-btn g', '🔁 مزاد جديد'); again.onclick = function () { for (var t = 0; t < 4; t++) coins[t] = 1000; go(0); };
      p.appendChild(again);
      wrap.appendChild(p);
    }
    go(0);
  };

  // 🚫 الكلمة الممنوعة
  R.tab = function (stage, items) {
    var deck = shuffle(items), di = 0, team = 0, got = 0, playing = false;
    var w = el('div', 's8-tab'); stage.appendChild(w);
    var card = el('div', 's8-tcard hide'); w.appendChild(card);
    var side = el('div', 's8-tside'); w.appendChild(side);
    var turn = el('div', 's8-turn'), tm = timer(60, endTurn), info = el('div', 's8-sm');
    var r1 = el('div', 's8-row'), start = el('button', 's8-btn', '▶ ابدأ الدور (٦٠ ثانية)');
    var r2 = el('div', 's8-row'), ok = el('button', 's8-btn ok', '✔ أصابوا +١'), skip = el('button', 's8-btn g', '⏭ تخطَّ'), stop = el('button', 's8-btn no', '⏹ أنهِ الدور');
    r1.appendChild(tm.el); r1.appendChild(start); r2.appendChild(ok); r2.appendChild(skip); r2.appendChild(stop);
    side.appendChild(turn); side.appendChild(namePicker('من يصف؟')); side.appendChild(r1); side.appendChild(r2); side.appendChild(info);
    side.appendChild(el('div', 's8-sm', '📜 القاعدة: يصف الطالب المصطلح لفريقه دون نطقه أو نطق الكلمات الممنوعة أو الإشارة إليها، والفريق يخمّن.'));
    function drawCard() { var it = deck[di % deck.length]; card.innerHTML = '<div class="tw"><small>صِف هذا المصطلح</small>' + esc(it[0]) + '</div><ul><div style="font-size:clamp(15px,1.4vw,20px);color:#991B1B">⛔ كلمات ممنوعة:</div>' + it[1].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; card.style.animation = 'none'; void card.offsetWidth; card.style.animation = ''; }
    function drawTurn() { turn.style.setProperty('--tc', TEAMS[team][2]); turn.innerHTML = 'الدور على: <b>' + TEAMS[team][1] + ' ' + TEAMS[team][0] + '</b>'; info.innerHTML = playing ? 'بطاقات صحيحة في هذا الدور: <b style="color:var(--acc)">' + n(got) + '</b>' : 'اضغط «ابدأ» لكشف البطاقة الأولى وتشغيل المؤقت.'; ok.disabled = skip.disabled = stop.disabled = !playing; start.disabled = playing; }
    function next() { di++; drawCard(); }
    function endTurn() {
      playing = false; tm.stop(); card.classList.add('hide');
      info.innerHTML = '⏰ انتهى دور ' + TEAMS[team][0] + ': <b style="color:var(--acc)">' + n(got) + '</b> بطاقات صحيحة';
      team = (team + 1) % S.n; got = 0;
      setTimeout(function () { if (!root) return; drawTurn(); info.innerHTML = 'الدور التالي جاهز. اختر الواصف ثم اضغط «ابدأ».'; }, 1800);
      ok.disabled = skip.disabled = stop.disabled = true;
    }
    start.onclick = function () { playing = true; got = 0; next(); card.classList.remove('hide'); tm.start(60); SFX.pop(); drawTurn(); };
    ok.onclick = function () { got++; add(team, 1); next(); drawTurn(); };
    skip.onclick = function () { SFX.tick(); next(); };
    stop.onclick = endTurn;
    drawCard(); drawTurn();
    return function () { tm.stop(); };
  };

  // 🎩 قبعات التفكير الست
  R.hats = function (stage, items) {
    var H = [['البيضاء', '#F8FAFC', 'الحقائق والمعلومات'], ['الحمراء', '#EF4444', 'المشاعر والانطباعات'], ['السوداء', '#1F2937', 'المخاطر والسلبيات'], ['الصفراء', '#FACC15', 'الفوائد والإيجابيات'], ['الخضراء', '#22C55E', 'الإبداع والأفكار الجديدة'], ['الزرقاء', '#3B82F6', 'التنظيم والتلخيص']];
    var seen = {}, sel = -1;
    var g = el('div', 's8-hats'); stage.appendChild(g);
    var q = el('div', 's8-pnl s8-hq'); stage.appendChild(q);
    var hs = H.map(function (h, i) {
      var b = el('button', 's8-hat', '<div class="s8-hg" style="--hc:' + h[1] + (i === 2 ? ';filter:drop-shadow(0 0 2px #fff)' : '') + '"><i></i></div><span>القبعة ' + h[0] + '</span>');
      b.onclick = function () { pick(i); }; g.appendChild(b); return b;
    });
    var rnd = el('button', 's8-btn', '🎲 قبعة عشوائية'); rnd.style.gridColumn = 'span 3';
    rnd.onclick = function () {
      var left = H.map(function (_, i) { return i; }).filter(function (i) { return !seen[i]; }); if (!left.length) left = [0, 1, 2, 3, 4, 5];
      var fin = left[Math.floor(Math.random() * left.length)], k = 0, steps = 12 + fin;
      var iv = setInterval(function () { hs.forEach(function (b) { b.classList.remove('on'); }); hs[k % 6].classList.add('on'); SFX.tick(); if (++k > steps && (k - 1) % 6 === fin) { clearInterval(iv); pick(fin); } }, 90);
    };
    g.appendChild(rnd);
    function pick(i) {
      sel = i; seen[i] = 1; SFX.pop();
      hs.forEach(function (b, j) { b.classList.toggle('on', j === i); b.classList.toggle('seen', !!seen[j]); });
      var h = H[i], it = items[i];
      q.innerHTML = '';
      q.appendChild(el('div', 'hn', '<div class="s8-hg" style="--hc:' + h[1] + ';flex:none' + (i === 2 ? ';filter:drop-shadow(0 0 2px #fff)' : '') + '"><i></i></div><div><b>القبعة ' + h[0] + '</b><div class="s8-sm">' + h[2] + '</div></div>'));
      q.appendChild(el('div', 's8-big', '❓ ' + it[0]));
      q.appendChild(namePicker());
      var ans = el('div'), rb = el('button', 's8-btn g', '💡 إجابة نموذجية');
      rb.onclick = function () { ans.innerHTML = ''; ans.appendChild(el('div', 's8-ans', it[1])); SFX.reveal(); rb.disabled = true; ans.appendChild(award(1)); };
      var r = el('div', 's8-row'); r.appendChild(rb); q.appendChild(r); q.appendChild(ans);
    }
    q.appendChild(el('div', 's8-big', '🎩 اختر قبعة، أو اضغط «قبعة عشوائية»'));
    q.appendChild(el('div', 's8-mid', 'كل قبعة تمثّل أسلوبًا في التفكير: البيضاء للحقائق، والحمراء للمشاعر، والسوداء للمخاطر، والصفراء للفوائد، والخضراء للإبداع، والزرقاء للتنظيم والتلخيص.'));
  };

  // 🧭 الأركان الأربعة
  R.cor = function (stage, items) {
    var CN = [['أوافق بشدة', '#22C55E', 1], ['أوافق', '#86EFAC', 1], ['لا أوافق', '#FCA5A5', 0], ['لا أوافق بشدة', '#EF4444', 0]];
    function go(i) {
      stage.innerHTML = '';
      var it = items[i], cnt = [0, 0, 0, 0], g = el('div', 's8-cor'); stage.appendChild(g);
      var pos = [[1, 1], [2, 1], [1, 3], [2, 3]]; // [صف, عمود] — RTL: العمود ١ يمين (أوافق) والعمود ٣ يسار (لا أوافق)
      var cs = CN.map(function (c, j) {
        var e = el('div', 's8-cn', '<div class="cl">' + c[0] + '</div><div class="cv">' + n(0) + '</div><div class="cb"><button aria-label="زيادة">+</button><button aria-label="نقص">−</button></div><div class="bar" style="width:0"></div>');
        e.style.setProperty('--cc', c[1]); e.style.gridRow = pos[j][0]; e.style.gridColumn = pos[j][1];
        var b = e.querySelectorAll('button'); b[0].onclick = function () { cnt[j]++; upd(); SFX.tick(); }; b[1].onclick = function () { cnt[j] = Math.max(0, cnt[j] - 1); upd(); };
        g.appendChild(e); return e;
      });
      var mid = el('div', 's8-cs'); g.appendChild(mid);
      mid.appendChild(el('div', 's8-sm', 'العبارة ' + n(i + 1) + ' من ' + n(items.length) + ' · يتجه كل طالب إلى ركن رأيه، والمعلم يعدّ الطلاب في كل ركن'));
      mid.appendChild(el('div', 's8-pnl s8-big', '📣 ' + it[0]));
      mid.appendChild(namePicker('من يبرّر رأيه؟'));
      var r = el('div', 's8-row'), jb = el('button', 's8-btn', '⚖ الحكم العلمي'); r.appendChild(jb); mid.appendChild(r);
      var ex = el('div'); mid.appendChild(ex);
      mid.appendChild(nav(i, items.length, go));
      function upd() { var tot = cnt.reduce(function (a, b) { return a + b; }, 0) || 1; cs.forEach(function (e, j) { e.querySelector('.cv').textContent = n(cnt[j]); e.querySelector('.bar').style.width = Math.round(100 * cnt[j] / tot) + '%'; }); }
      jb.onclick = function () {
        var t = !!it[1]; jb.disabled = true; SFX.reveal();
        cs.forEach(function (e, j) { var w = CN[j][2] === (t ? 1 : 0); e.classList.toggle('win', w); e.classList.toggle('lose', !w); });
        var right = t ? cnt[0] + cnt[1] : cnt[2] + cnt[3], tot = cnt.reduce(function (a, b) { return a + b; }, 0);
        ex.appendChild(el('div', 's8-ans' + (t ? '' : ' s8-fix'), (t ? '✔ العبارة صحيحة علميًّا: ' : '✖ العبارة غير صحيحة علميًّا: ') + it[2] + (tot ? '<br><small>🎯 أصاب ' + n(right) + ' من ' + n(tot) + ' طالبًا</small>' : '')));
      };
    }
    go(0);
  };

  // 🎤 المؤتمر الصحفي
  R.pr = function (stage, d) {
    var w = el('div', 's8-pr'); stage.appendChild(w);
    var g = el('div', 's8-guest', '<div class="av">' + d.e + '</div><div class="s8-sm">🎙 ضيف المؤتمر اليوم</div><div class="rl">' + d.r + '</div><div class="s8-mid">' + d.i + '</div><span class="mic">🎤</span>');
    var gp = namePicker('اختر الضيف'); g.appendChild(gp);
    var clap = el('button', 's8-btn g', '👏 صفّقوا للضيف'); clap.onclick = function () { SFX.clap(); confetti(root); }; g.appendChild(clap);
    w.appendChild(g);
    var right = el('div', 's8-pnl'); right.style.flex = '1'; w.appendChild(right);
    right.appendChild(el('div', 's8-mid', '📰 أسئلة الصحفيين: اختر سؤالًا، ثم اختر الصحفي الذي يطرحه'));
    var qs = el('div', 's8-qs'); right.appendChild(qs);
    var box = el('div'); box.style.cssText = 'display:flex;flex-direction:column;gap:8px'; right.appendChild(box);
    var cards = d.qa.map(function (x, i) {
      var c = el('button', 's8-qc', '<i>📰</i><span>' + x[0] + '</span>');
      c.onclick = function () {
        cards.forEach(function (o) { o.classList.remove('on'); }); c.classList.add('on', 'seen'); SFX.pop();
        box.innerHTML = ''; box.appendChild(namePicker('اختر الصحفي'));
        var rb = el('button', 's8-btn g', '💡 إجابة مقترحة للضيف'), r = el('div', 's8-row'); r.appendChild(rb); box.appendChild(r);
        rb.onclick = function () { rb.disabled = true; box.appendChild(el('div', 's8-ans', '🎙 ' + x[1])); SFX.reveal(); };
      };
      qs.appendChild(c); return c;
    });
    right.appendChild(el('div', 's8-sm', '💡 يجيب الضيف بصيغة المتكلم كأنه الشخصية نفسها، ويقيّم الصف دقة إجاباته العلمية.'));
  };

  // 💭 ماذا لو؟
  R.wi = function (stage, items) {
    var tm = null;
    function go(i) {
      if (tm) tm.stop(); stage.innerHTML = '';
      var it = items[i], w = el('div', 's8-wi'); stage.appendChild(w);
      var c = el('div', 's8-cloud', '<div class="wq">ماذا لو ' + it[0] + '؟</div>'); w.appendChild(c);
      var p = el('div', 's8-pnl'); p.style.flex = '1'; w.appendChild(p);
      var ph = el('div', 's8-phase', '<span>🤔 فكّر</span><span>👥 زاوج</span><span>📢 شارك</span>'); p.appendChild(ph);
      var phase = -1, PT = [30, 45];
      tm = timer(30, function () { if (phase < 2) step(); });
      var r = el('div', 's8-row'), nb = el('button', 's8-btn', '▶ ابدأ: فكّر بمفردك (٣٠ ث)'); r.appendChild(tm.el); r.appendChild(nb); p.appendChild(r);
      var msg = el('div', 's8-mid', 'فكّر بمفردك، ثم ناقش زميلك، ثم شارك الصف أفضل فكرة.'); p.appendChild(msg);
      var pick = namePicker('من يشارك؟'); pick.style.display = 'none'; p.appendChild(pick);
      var ideas = el('div', 's8-ideas'), k = 0, ib = el('button', 's8-btn g', '💡 اكشف فكرة متوقعة'); ib.style.display = 'none';
      ib.onclick = function () { if (k < it[1].length) { ideas.appendChild(el('div', 's8-idea', it[1][k++])); SFX.pop(); } if (k >= it[1].length) ib.disabled = true; };
      p.appendChild(ideas); var r2 = el('div', 's8-row'); r2.appendChild(ib); p.appendChild(r2);
      var aw = el('div'); p.appendChild(aw);
      function step() {
        phase++; var sp = ph.querySelectorAll('span'); sp.forEach(function (s, j) { s.classList.toggle('on', j === phase); }); SFX.pop();
        if (phase === 0) { tm.start(PT[0]); nb.textContent = '⏭ انتقل إلى: زاوج (٤٥ ث)'; msg.textContent = '🤔 فكّر بصمت ودوّن فكرتك في دفترك.'; }
        else if (phase === 1) { tm.start(PT[1]); nb.textContent = '⏭ انتقل إلى: شارك'; msg.textContent = '👥 ناقش زميلك المجاور، واتفقا على أقوى فكرة.'; }
        else { tm.stop(); tm.el.style.display = 'none'; nb.style.display = 'none'; msg.textContent = '📢 شارك فكرتكما مع الصف.'; pick.style.display = ''; ib.style.display = ''; aw.appendChild(award(2, 'لأفضل فكرة: امنح')); }
      }
      nb.onclick = step;
      p.appendChild(nav(i, items.length, go));
    }
    go(0);
    return function () { if (tm) tm.stop(); };
  };

  // ================== الاستراتيجيات الإضافية (٧) ==================

  // ⚖️ المحكمة العلمية
  R.court = function (stage, items) {
    var tm = null;
    function go(i) {
      if (tm) tm.stop(); stage.innerHTML = '';
      var it = items[i], pro = 0, con = Math.min(1, S.n - 1), votes = [0, 0], phase = -1;
      var left = el('div', 's8-pnl s8-court'); left.style.flex = '0 0 44%'; stage.appendChild(left);
      left.innerHTML = '<div class="s8-sm">🏛 القضية رقم ' + n(i + 1) + ' من ' + n(items.length) + '</div><div class="s8-judge">🧑‍⚖️</div><div class="s8-scroll s8-big">«' + it[0] + '»</div>';
      var right = el('div', 's8-pnl'); right.style.flex = '1'; stage.appendChild(right);
      function teamSel(lbl, get, set, col) {
        var r = el('div', 's8-row', '<span style="color:' + col + '">' + lbl + '</span>');
        for (var t = 0; t < S.n; t++) (function (t) {
          var b = el('button', 's8-tsel' + (get() === t ? ' on' : ''), TEAMS[t][1] + ' ' + TEAMS[t][0]); b.style.setProperty('--tc', TEAMS[t][2]);
          b.onclick = function () { if (phase >= 0) return; set(t); r.querySelectorAll('.s8-tsel').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); SFX.tick(); };
          r.appendChild(b);
        })(t);
        return r;
      }
      right.appendChild(teamSel('🗣 الادعاء (العبارة صحيحة):', function () { return pro; }, function (t) { pro = t; }, '#4ADE80'));
      right.appendChild(teamSel('🛡 الدفاع (العبارة خاطئة):', function () { return con; }, function (t) { con = t; }, '#F87171'));
      var ph = el('div', 's8-phase', '<span>🗣 الادعاء</span><span>🛡 الدفاع</span><span>🗳 المحلّفون</span><span>🔨 الحكم</span>'); right.appendChild(ph);
      tm = timer(45, function () { if (phase < 2) step(); });
      var r1 = el('div', 's8-row'), nb = el('button', 's8-btn', '▶ ابدأ الجلسة: مرافعة الادعاء (٤٥ ث)'); r1.appendChild(tm.el); r1.appendChild(nb); right.appendChild(r1);
      var msg = el('div', 's8-mid', 'يقدّم كل فريق حججه العلمية وأدلته، ثم يصوّت بقية الصف بصفتهم هيئة المحلّفين.'); right.appendChild(msg);
      var vote = el('div', 's8-row'); vote.style.display = 'none'; right.appendChild(vote);
      var out = el('div'); right.appendChild(out);
      function drawVote() {
        vote.innerHTML = '';
        [['👍 مقتنع بالادعاء', '#4ADE80'], ['👎 مقتنع بالدفاع', '#F87171']].forEach(function (v, j) {
          var c = el('div', 's8-vote', '<span style="color:' + v[1] + '">' + v[0] + '</span><b>' + n(votes[j]) + '</b>');
          var p = el('button', '', '+'), m = el('button', '', '−');
          p.onclick = function () { votes[j]++; SFX.tick(); drawVote(); }; m.onclick = function () { votes[j] = Math.max(0, votes[j] - 1); drawVote(); };
          c.appendChild(p); c.appendChild(m); vote.appendChild(c);
        });
      }
      function step() {
        phase++; ph.querySelectorAll('span').forEach(function (s, j) { s.classList.toggle('on', j === phase); }); SFX.pop();
        if (phase === 0) { tm.start(45); nb.textContent = '⏭ مرافعة الدفاع (٤٥ ث)'; msg.textContent = '🗣 فريق الادعاء يثبت أن العبارة صحيحة بالأدلة.'; }
        else if (phase === 1) { tm.start(45); nb.textContent = '⏭ تصويت المحلّفين'; msg.textContent = '🛡 فريق الدفاع يفنّد العبارة ويثبت أنها خاطئة.'; }
        else if (phase === 2) { tm.stop(); tm.el.style.display = 'none'; nb.textContent = '🔨 أعلن الحكم العلمي'; msg.textContent = '🗳 يرفع المحلّفون أيديهم، والمعلم يعدّ الأصوات.'; vote.style.display = ''; drawVote(); }
        else {
          nb.style.display = 'none'; SFX.hammer();
          var win = it[1] ? pro : con, wins = votes[0] >= votes[1] ? 1 : 0;
          left.querySelector('.s8-judge').classList.add('bang');
          out.appendChild(el('div', 's8-ans' + (it[1] ? '' : ' s8-fix'), '🔨 حكمت المحكمة بأن العبارة ' + (it[1] ? 'صحيحة' : 'خاطئة') + ': ' + it[2] + '<br><small>' + ((wins === (it[1] ? 1 : 0)) ? '✅ أصاب المحلّفون في حكمهم' : '⚠️ لم يُصب أغلب المحلّفين') + '</small>'));
          if (pro !== con) { add(win, 3); confetti(root); out.appendChild(el('div', 's8-award', '<span>🏆 ٣ نقاط لـ ' + TEAMS[win][1] + ' ' + TEAMS[win][0] + '</span>')); }
        }
      }
      nb.onclick = step;
      right.appendChild(nav(i, items.length, go));
    }
    go(0);
    return function () { if (tm) tm.stop(); };
  };

  // 🕵️ حقيقتان وكذبة
  R.lie = function (stage, pool) {
    var T = shuffle(pool.filter(function (x) { return x[1]; })), F = shuffle(pool.filter(function (x) { return !x[1]; }));
    var rounds = [];
    for (var r = 0; r < F.length && T.length >= 2; r++) rounds.push(shuffle([F[r], T[(r * 2) % T.length], T[(r * 2 + 1) % T.length]]));
    if (!rounds.length) { stage.appendChild(el('div', 's8-big', 'لا تتوفر عبارات كافية لهذا الدرس.')); return; }
    function go(i) {
      stage.innerHTML = '';
      var w = el('div', 's8-lie'); stage.appendChild(w);
      var picks = [], done = false;
      for (var t = 0; t < S.n; t++) picks.push(-1);
      w.appendChild(el('div', 's8-mid', '🕵️ الجولة ' + n(i + 1) + ' من ' + n(rounds.length) + ': عبارتان صحيحتان وعبارة واحدة كاذبة… يختار كل فريق البطاقة التي يراها الكذبة.'));
      var g = el('div', 's8-lcards'); w.appendChild(g);
      var cards = rounds[i].map(function (x, j) {
        var c = el('div', 's8-lcard', '<i>' + 'أبج'[j] + '</i><div class="s8-mid">' + x[0] + '</div><div class="s8-lteams"></div><div class="s8-lres"></div>');
        var tw = c.querySelector('.s8-lteams');
        for (var t = 0; t < S.n; t++) (function (t) {
          var b = el('button', '', TEAMS[t][1]); b.title = TEAMS[t][0]; b.style.setProperty('--tc', TEAMS[t][2]);
          b.onclick = function () { if (done) return; picks[t] = j; SFX.tick(); g.querySelectorAll('.s8-lteams button').forEach(function (o) { if (o.dataset.t == t) o.classList.remove('on'); }); b.classList.add('on'); };
          b.dataset.t = t; tw.appendChild(b);
        })(t);
        g.appendChild(c); return c;
      });
      var row = el('div', 's8-row'), rv = el('button', 's8-btn', '🔎 اكشف الكذبة'); row.appendChild(namePicker('من يبرّر اختيار فريقه؟')); row.appendChild(rv); w.appendChild(row);
      var res = el('div', 's8-award'); w.appendChild(res);
      rv.onclick = function () {
        done = true; rv.disabled = true; SFX.reveal();
        rounds[i].forEach(function (x, j) {
          cards[j].classList.add(x[1] ? 'tru' : 'lie');
          cards[j].querySelector('.s8-lres').innerHTML = x[1] ? '✔ حقيقة' : '🤥 الكذبة! ' + x[2];
        });
        var li = rounds[i].findIndex(function (x) { return !x[1]; }), got = [];
        for (var t = 0; t < S.n; t++) if (picks[t] === li) { add(t, 2); got.push(TEAMS[t][1] + ' ' + TEAMS[t][0]); }
        res.innerHTML = '<span>' + (got.length ? '🏆 +٢ لكل من: ' + got.join('، ') : 'لم يكشف أي فريق الكذبة هذه المرة!') + '</span>';
        if (got.length) confetti(root);
      };
      w.appendChild(nav(i, rounds.length, go));
    }
    go(0);
  };

  // 🧠 بطاقات الذاكرة
  R.mem = function (stage, pairs) {
    var team = 0, open = [], lock = false, found = 0;
    var w = el('div', 's8-memw'); stage.appendChild(w);
    var side = el('div', 's8-pnl'); side.style.cssText += 'flex:0 0 26%;justify-content:center;text-align:center';
    var grid = el('div', 's8-mem'); grid.style.gridTemplateColumns = 'repeat(' + (pairs.length > 4 ? 4 : 4) + ',1fr)';
    w.appendChild(grid); w.appendChild(side);
    var turn = el('div', 's8-turn'), info = el('div', 's8-sm', 'يقلب الفريق بطاقتين: إن طابق المصطلحُ معناه أخذ نقطة ولعب مرة أخرى، وإلا انتقل الدور.');
    side.appendChild(el('div', 's8-mid', '🧠 طابق المصطلح بمعناه')); side.appendChild(turn); side.appendChild(namePicker('من يقلب؟')); side.appendChild(info);
    var again = el('button', 's8-btn g', '🔁 لعبة جديدة'); again.onclick = function () { stage.innerHTML = ''; R.mem(stage, pairs); }; side.appendChild(again);
    function drawTurn() { turn.style.setProperty('--tc', TEAMS[team][2]); turn.innerHTML = 'الدور على: <b>' + TEAMS[team][1] + ' ' + TEAMS[team][0] + '</b>'; }
    var deck = [];
    pairs.forEach(function (p, i) { deck.push({ k: i, t: 'term', h: p[0] }); deck.push({ k: i, t: 'def', h: p[1] }); });
    shuffle(deck).forEach(function (d, j) {
      var c = el('button', 's8-mc', '<div class="fr"><span>' + n(j + 1) + '</span></div><div class="bk ' + d.t + '">' + (d.t === 'term' ? '<b>' + esc(d.h) + '</b>' : esc(d.h)) + '</div>');
      c.onclick = function () {
        if (lock || c.classList.contains('up')) return;
        c.classList.add('up'); SFX.pop(); open.push([c, d]);
        if (open.length === 2) {
          lock = true;
          var a = open[0], b = open[1];
          if (a[1].k === b[1].k && a[1].t !== b[1].t) {
            setTimeout(function () { a[0].classList.add('ok'); b[0].classList.add('ok'); add(team, 1); found++; open = []; lock = false; if (found === pairs.length) { SFX.fan(); confetti(root); info.innerHTML = '🎉 اكتملت كل البطاقات!'; } }, 450);
          } else {
            setTimeout(function () { SFX.bad(); a[0].classList.remove('up'); b[0].classList.remove('up'); open = []; lock = false; team = (team + 1) % S.n; drawTurn(); }, 1300);
          }
        }
      };
      grid.appendChild(c);
    });
    drawTurn();
  };

  // 💣 القنبلة الموقوتة
  R.bomb = function (stage, qs) {
    var order = shuffle(qs), qi = 0, iv = null, to = null;
    var w = el('div', 's8-bombw'); stage.appendChild(w);
    var left = el('div', 's8-bombL', '<div class="s8-bomb">💣<span class="fz"></span></div><div class="s8-holder"></div>'); w.appendChild(left);
    var right = el('div', 's8-pnl'); right.style.flex = '1'; w.appendChild(right);
    right.appendChild(el('div', 's8-mid', '💣 مرّروا «القنبلة» (كرة أو قلم) بين الطلاب بسرعة… وعند الانفجار يجيب حاملها عن السؤال!'));
    var r = el('div', 's8-row'), lit = el('button', 's8-btn', '🔥 أشعل الفتيل'), defuse = el('button', 's8-btn g', '🚫 أوقف'); defuse.disabled = true;
    r.appendChild(lit); r.appendChild(defuse); right.appendChild(r);
    var qbox = el('div'); qbox.style.cssText = 'display:flex;flex-direction:column;gap:10px'; right.appendChild(qbox);
    var bomb = left.querySelector('.s8-bomb'), holder = left.querySelector('.s8-holder');
    function stop() { if (iv) clearTimeout(iv); if (to) clearTimeout(to); iv = to = null; bomb.classList.remove('lit'); defuse.disabled = true; lit.disabled = false; }
    lit.onclick = function () {
      qbox.innerHTML = ''; bomb.classList.remove('boom'); bomb.classList.add('lit'); lit.disabled = true; defuse.disabled = false;
      var names = roster(), dur = 9000 + Math.random() * 12000, t0 = Date.now();
      (function tick() {
        var el2 = Date.now() - t0, gap = Math.max(140, 700 - el2 / 30);
        SFX.tick(); if (names.length) holder.textContent = '🤲 ' + names[Math.floor(Math.random() * names.length)];
        iv = setTimeout(tick, gap);
      })();
      to = setTimeout(function () {
        stop(); bomb.classList.add('boom'); SFX.buzz(); tone(70, 0.8, 'sawtooth', 0.2); confetti(root);
        if (!names.length) holder.textContent = '💥 بوووم!';
        var q = order[qi++ % order.length];
        qbox.appendChild(el('div', 's8-pnl s8-big', '❓ ' + q[0]));
        var rb = el('button', 's8-btn g', '💡 الإجابة'), rr = el('div', 's8-row'); rr.appendChild(rb); qbox.appendChild(rr);
        rb.onclick = function () { rb.disabled = true; qbox.appendChild(el('div', 's8-ans', q[1])); SFX.reveal(); qbox.appendChild(award(1)); };
      }, dur);
    };
    defuse.onclick = stop;
    return stop;
  };

  // 🎡 عجلة الحظ
  R.wheel = function (stage, qs) {
    var SEG = [['١', 1, '#38BDF8'], ['٢', 2, '#A78BFA'], ['٣', 3, '#4ADE80'], ['💥', 0, '#F87171'], ['٤', 4, '#FB923C'], ['🔄', -1, '#F472B6'], ['٢', 2, '#FACC15'], ['🎁٥', 5, '#2DD4BF']];
    var order = shuffle(qs), qi = 0, team = 0, rot = 0, spinning = false;
    var w = el('div', 's8-wheelw'); stage.appendChild(w);
    var L2 = el('div', 's8-wheelL'); w.appendChild(L2);
    var sz = 360, cv = el('canvas', 's8-wh'); cv.width = cv.height = sz * 2; L2.appendChild(el('div', 's8-ptr', '▼')); L2.appendChild(cv);
    var x = cv.getContext('2d'), R0 = sz, a = 2 * Math.PI / SEG.length;
    SEG.forEach(function (s, i) {
      x.beginPath(); x.moveTo(R0, R0); x.arc(R0, R0, R0 - 8, i * a - Math.PI / 2, (i + 1) * a - Math.PI / 2); x.closePath(); x.fillStyle = s[2]; x.fill(); x.lineWidth = 8; x.strokeStyle = '#0B1222'; x.stroke();
      x.save(); x.translate(R0, R0); x.rotate((i + 0.5) * a - Math.PI / 2); x.textAlign = 'center'; x.fillStyle = '#111827'; x.font = 'bold 74px sans-serif'; x.fillText(s[0], R0 * 0.66, 26); x.restore();
    });
    x.beginPath(); x.arc(R0, R0, 60, 0, 7); x.fillStyle = '#fff'; x.fill();
    var right = el('div', 's8-pnl'); right.style.flex = '1'; w.appendChild(right);
    var turn = el('div', 's8-turn'); right.appendChild(turn);
    right.appendChild(el('div', 's8-sm', 'الأرقام نقاط السؤال · 💥 يضيع الدور · 🔄 إن أجاب سرق نقطتين من الفريق المتصدر · 🎁 خمس نقاط'));
    var r = el('div', 's8-row'), sp = el('button', 's8-btn', '🎡 أدر العجلة'); r.appendChild(sp); r.appendChild(namePicker()); right.appendChild(r);
    var qb = el('div'); qb.style.cssText = 'display:flex;flex-direction:column;gap:10px'; right.appendChild(qb);
    function drawTurn() { turn.style.setProperty('--tc', TEAMS[team][2]); turn.innerHTML = 'الدور على: <b>' + TEAMS[team][1] + ' ' + TEAMS[team][0] + '</b>'; }
    function nextTeam() { team = (team + 1) % S.n; drawTurn(); sp.disabled = false; }
    sp.onclick = function () {
      if (spinning) return; spinning = true; sp.disabled = true; qb.innerHTML = '';
      var k = Math.floor(Math.random() * SEG.length);
      rot += 360 * 5 + (360 - (k + 0.5) * (360 / SEG.length)) - (rot % 360);
      cv.style.transform = 'rotate(' + rot + 'deg)';
      var tk = setInterval(SFX.tick, 120);
      setTimeout(function () {
        clearInterval(tk); spinning = false; var s = SEG[k];
        if (s[1] === 0) { SFX.bad(); qb.appendChild(el('div', 's8-ans s8-fix', '💥 ضاع الدور على ' + TEAMS[team][0] + '!')); setTimeout(nextTeam, 1500); return; }
        SFX.reveal();
        var q = order[qi++ % order.length];
        qb.appendChild(el('div', 's8-mid', (s[1] < 0 ? '🔄 سؤال السرقة' : '🎯 سؤال بـ ' + n(s[1]) + ' نقاط') + ':'));
        qb.appendChild(el('div', 's8-pnl s8-big', '❓ ' + q[0]));
        var rr = el('div', 's8-row'), ok = el('button', 's8-btn ok', '✔ أجاب صحيحًا'), no = el('button', 's8-btn no', '✖ لم يُصب'), sh = el('button', 's8-btn g', '💡 الإجابة');
        rr.appendChild(ok); rr.appendChild(no); rr.appendChild(sh); qb.appendChild(rr);
        sh.onclick = function () { sh.disabled = true; qb.appendChild(el('div', 's8-ans', q[1])); };
        ok.onclick = function () {
          ok.disabled = no.disabled = true;
          if (s[1] < 0) { var best = -1; for (var t = 0; t < S.n; t++) if (t !== team && (best < 0 || S.sc[t] > S.sc[best])) best = t; var take = Math.min(2, S.sc[best]); S.sc[best] -= take; add(team, take); }
          else add(team, s[1]);
          confetti(root); setTimeout(nextTeam, 1200);
        };
        no.onclick = function () { ok.disabled = no.disabled = true; SFX.bad(); setTimeout(nextTeam, 900); };
      }, 4200);
    };
    drawTurn();
  };

  // 🏔️ سباق القمة
  R.race = function (stage, pool) {
    var items = shuffle(pool), STEPS = 6, pos = [0, 0, 0, 0], i = 0, over = false;
    var w = el('div', 's8-racew'); stage.appendChild(w);
    var mt = el('div', 's8-mt'); w.appendChild(mt);
    mt.innerHTML = '<div class="peak">🚩</div>';
    var climbers = [];
    for (var t = 0; t < S.n; t++) { var c = el('div', 's8-cl', TEAMS[t][1]); c.style.setProperty('--tc', TEAMS[t][2]); c.style.right = (10 + t * (64 / (S.n - 1))) + '%'; mt.appendChild(c); climbers.push(c); }
    function place() { climbers.forEach(function (c, t) { c.style.bottom = (4 + pos[t] * (80 / STEPS)) + '%'; }); }
    var right = el('div', 's8-pnl'); right.style.flex = '1'; w.appendChild(right);
    var qn = el('div', 's8-sm'), q = el('div', 's8-pnl s8-big'), grid = el('div', 's8-rgrid'), r = el('div', 's8-row'), rv = el('button', 's8-btn', '🔎 اكشف'), nx = el('button', 's8-btn g', 'العبارة التالية ←'), ex = el('div');
    right.appendChild(qn); right.appendChild(q); right.appendChild(grid); r.appendChild(rv); r.appendChild(nx); right.appendChild(r); right.appendChild(ex);
    var ans;
    function show() {
      if (i >= items.length) items = items.concat(shuffle(pool));
      var it = items[i]; ans = []; for (var t = 0; t < S.n; t++) ans.push(null);
      qn.innerHTML = 'العبارة ' + n(i + 1) + ' · أول فريق يبلغ القمة (' + n(STEPS) + ' خطوات) يفوز'; q.innerHTML = '❓ ' + it[0]; ex.innerHTML = ''; rv.disabled = false; nx.disabled = true;
      grid.innerHTML = '';
      for (var t = 0; t < S.n; t++) (function (t) {
        var c = el('div', 's8-rt', '<b style="color:' + TEAMS[t][2] + '">' + TEAMS[t][1] + ' ' + TEAMS[t][0] + '</b>');
        var y = el('button', '', '✔ صح'), nn = el('button', '', '✖ خطأ');
        y.onclick = function () { ans[t] = 1; y.classList.add('on'); nn.classList.remove('on'); SFX.tick(); };
        nn.onclick = function () { ans[t] = 0; nn.classList.add('on'); y.classList.remove('on'); SFX.tick(); };
        c.appendChild(y); c.appendChild(nn); grid.appendChild(c);
      })(t);
    }
    rv.onclick = function () {
      var it = items[i], v = it[1] ? 1 : 0; rv.disabled = true; nx.disabled = over;
      for (var t = 0; t < S.n; t++) if (ans[t] === v) pos[t] = Math.min(STEPS, pos[t] + 1);
      place(); SFX.ok();
      ex.appendChild(el('div', 's8-ans' + (v ? '' : ' s8-fix'), (v ? '✔ صحيحة: ' : '✖ خاطئة: ') + it[2]));
      var win = []; for (var t = 0; t < S.n; t++) if (pos[t] >= STEPS) win.push(t);
      if (win.length) { over = true; nx.disabled = true; SFX.fan(); confetti(root); win.forEach(function (t) { add(t, 3); climbers[t].classList.add('win'); }); ex.appendChild(el('div', 's8-award', '<span>🚩 بلغ القمة: ' + win.map(function (t) { return TEAMS[t][1] + ' ' + TEAMS[t][0]; }).join('، ') + ' (+٣ نقاط)</span>')); }
    };
    nx.onclick = function () { i++; show(); };
    place(); show();
  };

  // 🎨 ارسم وخمّن
  R.draw = function (stage, terms) {
    var deck = shuffle(terms), di = 0, team = 0, playing = false, col = '#111827';
    var w = el('div', 's8-draww'); stage.appendChild(w);
    var board = el('div', 's8-board'); w.appendChild(board);
    var cv = el('canvas'); board.appendChild(cv);
    var tools = el('div', 's8-dtools'); board.appendChild(tools);
    ['#111827', '#DC2626', '#2563EB', '#16A34A'].forEach(function (c) { var b = el('button', '', ''); b.style.background = c; b.onclick = function () { col = c; }; tools.appendChild(b); });
    var clr = el('button', 'cl', '🧽'); tools.appendChild(clr);
    var x = cv.getContext('2d'), down = false;
    function fit() { var r = board.getBoundingClientRect(); cv.width = r.width; cv.height = r.height; x.lineCap = x.lineJoin = 'round'; x.lineWidth = 6; }
    setTimeout(fit, 30);
    function P(e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    cv.addEventListener('pointerdown', function (e) { down = true; var p = P(e); x.beginPath(); x.moveTo(p[0], p[1]); x.strokeStyle = col; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener('pointermove', function (e) { if (!down) return; var p = P(e); x.lineTo(p[0], p[1]); x.stroke(); });
    cv.addEventListener('pointerup', function () { down = false; });
    clr.onclick = function () { x.clearRect(0, 0, cv.width, cv.height); };
    var side = el('div', 's8-pnl'); side.style.cssText += 'flex:0 0 34%;align-items:center;text-align:center;justify-content:center';
    w.appendChild(side);
    var turn = el('div', 's8-turn'), tm = timer(60, endTurn), peek = el('button', 's8-peek', '👁 اضغط مطوّلًا لرؤية المصطلح (للرسّام فقط)'), r1 = el('div', 's8-row'), st = el('button', 's8-btn', '▶ ابدأ (٦٠ ث)'), r2 = el('div', 's8-row'), ok = el('button', 's8-btn ok', '✔ خمّنوا +٢'), sk = el('button', 's8-btn g', '⏭ مصطلح آخر'), info = el('div', 's8-sm', 'يرسم الطالب دون كتابة حروف أو أرقام، وفريقه يخمّن المصطلح.');
    side.appendChild(turn); side.appendChild(namePicker('من يرسم؟')); r1.appendChild(tm.el); r1.appendChild(st); side.appendChild(r1); side.appendChild(peek); r2.appendChild(ok); r2.appendChild(sk); side.appendChild(r2); side.appendChild(info);
    function term() { return deck[di % deck.length]; }
    function showT(on) { peek.textContent = on ? '🔑 ' + term() : '👁 اضغط مطوّلًا لرؤية المصطلح (للرسّام فقط)'; peek.classList.toggle('on', on); }
    ['pointerdown'].forEach(function (ev) { peek.addEventListener(ev, function () { if (playing) showT(true); }); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { peek.addEventListener(ev, function () { showT(false); }); });
    function drawTurn() { turn.style.setProperty('--tc', TEAMS[team][2]); turn.innerHTML = 'الدور على: <b>' + TEAMS[team][1] + ' ' + TEAMS[team][0] + '</b>'; ok.disabled = sk.disabled = !playing; st.disabled = playing; peek.disabled = !playing; }
    function next() { di++; x.clearRect(0, 0, cv.width, cv.height); }
    function endTurn() { playing = false; tm.stop(); info.innerHTML = '⏰ انتهى الوقت! المصطلح كان: <b style="color:var(--acc)">' + esc(term()) + '</b>'; next(); team = (team + 1) % S.n; drawTurn(); }
    st.onclick = function () { playing = true; tm.start(60); SFX.pop(); info.textContent = 'ارسم الآن! 🎨'; drawTurn(); };
    ok.onclick = function () { add(team, 2); confetti(root); playing = false; tm.stop(); info.innerHTML = '🎉 صحيح! المصطلح: <b style="color:var(--acc)">' + esc(term()) + '</b>'; next(); team = (team + 1) % S.n; drawTurn(); };
    sk.onclick = function () { next(); SFX.tick(); };
    drawTurn();
    return function () { tm.stop(); };
  };

  // ---------- زر الفتح ----------
  function mount() {
    if (document.getElementById('bStrat')) return;
    var ref = document.getElementById('bStu'), b = el('button', 'tb', '🚀 استراتيجيات');
    b.id = 'bStrat'; b.setAttribute('aria-label', 'استراتيجيات الدرس'); b.onclick = openUI;
    if (ref && ref.parentNode) ref.parentNode.insertBefore(b, ref);
    else { b.className = 's8-hb'; b.style.cssText = 'top:10px;bottom:auto;left:70px;transform:none'; document.body.appendChild(b); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(mount, 50); });
  else setTimeout(mount, 50);
  window.STRAT8_OPEN = openUI; window.STRAT8_SHOW = function (k) { openUI(); show(k); };
})();
