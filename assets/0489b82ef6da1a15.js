/* محرك العرض: المسرح 16:9، التنقل، لوحة المعلم، الفرق، المؤقت، الصوت، مكونات التقويم */
(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var AR='٠١٢٣٤٥٦٧٨٩';function n(x){return String(x).replace(/\d/g,function(d){return AR[d]})}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function h(html){var t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstChild}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
var KL=['أ','ب','ج','د','هـ','و'];
var CFG=window.CFG||{};var KEY=CFG.key||'atoms-g7c4-v1';var TN=CFG.teams||['فريق الذرة','فريق النواة','فريق الإلكترون','فريق الجزيء'];var SUBT=CFG.sub||'العلوم · الأول المتوسط · الفصل الرابع';
var ST={teams:[{n:TN[0],s:0,c:'#38d6ff'},{n:TN[1],s:0,c:'#ff5d6c'},{n:TN[2],s:0,c:'#f5c451'},{n:TN[3],s:0,c:'#8b6cff'}],done:{},last:{},res:{},given:{},mute:false};
try{var sv=JSON.parse(localStorage.getItem(KEY)||'null');if(sv){for(var k in sv)ST[k]=sv[k]}}catch(e){}
function save(){ST.at=Date.now();try{localStorage.setItem(KEY,JSON.stringify(ST))}catch(e){}}

/* ================= الصوت ================= */
var AC=null;function ac(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,t0,d,type,v,dest){var a=ac();if(!a||ST.mute)return;var o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.value=f;var t=a.currentTime+(t0||0);g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v||0.15,t+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+d);o.connect(g);g.connect(dest||a.destination);o.start(t);o.stop(t+d+0.05)}
var SFX={
  ok:function(){tone(660,0,.14,'triangle',.18);tone(990,.1,.22,'triangle',.16)},
  no:function(){tone(210,0,.22,'sawtooth',.08);tone(160,.14,.26,'sawtooth',.07)},
  tick:function(){tone(1200,0,.04,'square',.04)},
  pop:function(){tone(520,0,.08,'sine',.12);tone(780,.04,.1,'sine',.08)},
  whoosh:function(){var a=ac();if(!a||ST.mute)return;var len=a.sampleRate*.5,b=a.createBuffer(1,len,a.sampleRate),d=b.getChannelData(0);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2);var s=a.createBufferSource();s.buffer=b;var f=a.createBiquadFilter();f.type='bandpass';f.frequency.setValueAtTime(400,a.currentTime);f.frequency.exponentialRampToValueAtTime(3000,a.currentTime+.45);var g=a.createGain();g.gain.value=.18;s.connect(f);f.connect(g);g.connect(a.destination);s.start()},
  win:function(){[523,659,784,1046,1318].forEach(function(f,i){tone(f,i*.12,.5,'triangle',.16)});tone(261,0,1.4,'sine',.12)},
  award:function(){tone(880,0,.08,'square',.06);tone(1320,.07,.14,'triangle',.12)}
};
/* موسيقى افتتاحية قصيرة مولّدة (دون ملفات خارجية) */
var music=null;
function playIntro(sec){stopMusic();var a=ac();if(!a||ST.mute)return;sec=sec||14;var m=a.createGain();m.gain.value=0;m.connect(a.destination);var t=a.currentTime;m.gain.linearRampToValueAtTime(.22,t+1.5);m.gain.setValueAtTime(.22,t+sec-3);m.gain.linearRampToValueAtTime(0.0001,t+sec);
  var lp=a.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1400;lp.connect(m);
  var chords=[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[196,246.9,293.7]];
  chords.forEach(function(c,ci){c.forEach(function(f){[1,1.004].forEach(function(dt){var o=a.createOscillator(),g=a.createGain();o.type='sawtooth';o.frequency.value=f*dt/2;var s=t+ci*3.4;g.gain.setValueAtTime(0.0001,s);g.gain.linearRampToValueAtTime(.05,s+.8);g.gain.linearRampToValueAtTime(0.0001,s+3.6);o.connect(g);g.connect(lp);o.start(s);o.stop(s+3.8)})})});
  var arp=[440,523,659,784,659,523];for(var i=0;i<Math.floor(sec/0.3)-8;i++){(function(i){var f=arp[i%arp.length]*(i%12<6?1:1.122);var s=t+1+i*.3;var o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0.0001,s);g.gain.exponentialRampToValueAtTime(.05,s+.02);g.gain.exponentialRampToValueAtTime(0.0001,s+.5);o.connect(g);g.connect(m);o.start(s);o.stop(s+.55)})(i)}
  music={g:m,end:t+sec}}
function stopMusic(){if(music&&AC){try{music.g.gain.cancelScheduledValues(AC.currentTime);music.g.gain.setValueAtTime(music.g.gain.value,AC.currentTime);music.g.gain.linearRampToValueAtTime(0.0001,AC.currentTime+.4)}catch(e){}}music=null}

/* ================= الهيكل ================= */
var E={$:$,$$:$$,n:n,esc:esc,h:h,shuffle:shuffle,KL:KL,ST:ST,save:save,sfx:SFX,paused:false,lessons:{},cur:null,idx:0};
window.E=E;
var stage,screens;
function layout(){var k=Math.min(innerWidth/1600,innerHeight/900);stage.style.transform='translate(-50%,-50%) scale('+k+')';E.k=k}
E.boot=function(){
  document.body.innerHTML='<div id="viewport"><div id="stage"><div id="screens"></div>'+
   '<header id="top"><div class="brand"><i>'+(CFG.icon||'⚛')+'</i><span>'+(CFG.title||'رحلة إلى عالم الذرات والعناصر')+'<small id="ltitle">'+SUBT+'</small></span></div><nav id="prog" aria-label="شريط التقدم"></nav><div id="scorechip"></div></header>'+
   '<footer id="ctl"><button class="cb" id="bMenu" title="القائمة الرئيسية">☰ القائمة</button><button class="cb" id="bHome" title="الصفحة الرئيسية">⌂</button><span class="sep"></span>'+
   '<button class="cb" id="bPrev">→ السابق</button><button class="cb" id="bReplay" title="إعادة تشغيل المحطة">↻ إعادة</button><button class="cb" id="bPause" aria-pressed="false" title="إيقاف الحركة">⏸ إيقاف الحركة</button><button class="cb gold" id="bReveal">💡 كشف التفسير</button><button class="cb cy" id="bNext">التالي ←</button><span class="sep"></span>'+
   '<div id="timer"><b class="num" id="tv">٠١:٠٠</b><button id="tPlay" title="تشغيل المؤقت">▶</button><button id="tReset" title="إعادة المؤقت">↺</button></div><button class="cb" id="bMute" title="الصوت">🔊</button><button class="cb" id="bFs" title="ملء الشاشة">⛶</button></footer>'+
   '<div id="sttl" aria-hidden="true"></div><div class="scrim" id="scrim"></div><aside id="drawer" aria-label="لوحة المعلم"><header><b>لوحة المعلم</b><button class="cb" id="dClose">✕</button></header><div class="body" id="dBody"></div></aside>'+
   '<div id="win"><canvas id="wcv"></canvas><div class="wbox"><div class="trophy">🏆</div><h2 id="wName"></h2><p id="wSub"></p><div class="teams4" id="wTeams" style="width:1000px;margin:20px auto"></div><button class="btn gold" id="wClose">متابعة العرض</button></div></div>'+
   '</div></div>';
  stage=$('#stage');screens=$('#screens');layout();addEventListener('resize',layout);
  $('#bNext').onclick=function(){E.go(E.idx+1)};$('#bPrev').onclick=function(){E.go(E.idx-1)};
  $('#bReplay').onclick=function(){E.replay()};$('#bReveal').onclick=function(){E.reveal()};
  $('#bPause').onclick=function(){E.setPaused(!E.paused)};
  $('#bMenu').onclick=function(){E.drawer(true)};$('#dClose').onclick=function(){E.drawer(false)};$('#scrim').onclick=function(){E.drawer(false)};
  $('#bHome').onclick=function(){E.home()};
  $('#bMute').onclick=function(){ST.mute=!ST.mute;save();muteUI();if(ST.mute)stopMusic()};muteUI();
  $('#bFs').onclick=function(){var d=document.documentElement;if(document.fullscreenElement)document.exitFullscreen().catch(function(){});else if(d.requestFullscreen)d.requestFullscreen().catch(function(){});else if(d.webkitRequestFullscreen)d.webkitRequestFullscreen()};
  $('#wClose').onclick=function(){$('#win').classList.remove('on')};
  timerInit();scoreUI();sessionCheck();
  document.addEventListener('keydown',function(e){if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(e.key==='ArrowLeft'||e.key==='PageDown'){E.go(E.idx+1);e.preventDefault()}else if(e.key==='ArrowRight'||e.key==='PageUp'){E.go(E.idx-1);e.preventDefault()}else if(e.key===' '){E.reveal();e.preventDefault()}else if(e.key==='Escape')E.drawer(false)});
  document.addEventListener('pointerdown',function(){ac()},{once:true});
  function fromHash(){var m=location.hash.match(/l(\d)(?:-(\d+))?/);if(m&&E.lessons['l'+m[1]]){var id='l'+m[1],i=m[2]?+m[2]:null;if(E.cur===id&&i!=null)E.go(i);else E.open(id,i)}else E.home()}
  addEventListener('hashchange',fromHash);fromHash();
};

/* ================= حصة جديدة: لا تنتقل نتائج الفرق من فصل إلى آخر ================= */
function newSession(){ST.teams.forEach(function(t){t.s=0});ST.given={};ST.res={};ST.done={};ST.last={};save();scoreUI();try{refreshAwards()}catch(e){}}
E.newSession=newSession;
function sessionCheck(){var any=ST.teams.some(function(t){return t.s>0})||Object.keys(ST.res||{}).length>0;if(!any)return;
  var mins=Math.round((Date.now()-(ST.at||0))/60000);
  if(!ST.at||mins>180){newSession();setTimeout(function(){E.toast('🏫 بدأت حصة جديدة: صُفّرت نتائج الفرق والإجابات',3200)},600);return}
  var ov=h('<div class="sess" style="position:absolute;inset:0;z-index:90;display:grid;place-items:center;background:rgba(2,6,15,.72)"><div class="card" style="max-width:820px;padding:28px 34px;text-align:center"><div style="font-size:56px">🏫</div><h2 style="margin:6px 0 10px;font-family:var(--disp)">هل هذه حصة لفصل جديد؟</h2><p class="big" style="margin:0 0 6px">توجد نتائج محفوظة للفرق من حصة سابقة'+(mins>0?' (منذ '+n(mins)+' دقيقة)':'')+'. إذا بدأت مع فصل آخر فاختر «حصة جديدة»:</p><div class="teams4" style="margin:12px auto">'+teamsHTML()+'</div><div class="qa" style="justify-content:center;gap:14px;margin-top:14px"><button class="btn gold" data-ns>✨ حصة جديدة: تصفير النتائج</button><button class="btn ghost" data-keep>متابعة الحصة نفسها</button></div></div></div>');
  stage.appendChild(ov);$('[data-ns]',ov).onclick=function(){newSession();ov.remove();E.toast('صُفّرت نتائج الفرق والإجابات',2200)};$('[data-keep]',ov).onclick=function(){ov.remove()}}
function muteUI(){$('#bMute').textContent=ST.mute?'🔇':'🔊'}
E.toast=function(m,ms){var t=h('<div class="toast">'+m+'</div>');stage.appendChild(t);setTimeout(function(){t.remove()},ms||2400)};
E.setPaused=function(on){E.paused=on;document.body.classList.toggle('paused',on);$('#bPause').setAttribute('aria-pressed',on);$('#bPause').innerHTML=on?'▶ تشغيل الحركة':'⏸ إيقاف الحركة';var s=E.curSt();if(s&&s.api&&s.api.pause)s.api.pause(on)};

/* ================= الصفحة الرئيسية ================= */
E.home=function(){leave();E.cur=null;history.replaceState(null,'',location.pathname+location.search);$('#prog').innerHTML='';$('#ltitle').textContent=SUBT;
  screens.innerHTML='';var L=E.lessons;
  var el=h('<section class="scr on" id="home"><div class="hero"><div style="flex:1.1"><div class="eyebrow">'+(CFG.eyebrow||'الفصل الرابع · العام الدراسي ١٤٤٨هـ')+'</div><h1 class="t xl">'+(CFG.hero||'رحلة إلى عالم<br>الذرات والعناصر')+'</h1><p class="lead">'+(CFG.lead||'الذرات والعناصر والجدول الدوري · العلوم للصف الأول المتوسط · الفصل الدراسي الأول')+'</p><div class="chips" style="margin-top:10px"><span class="tag">محاكاة ثلاثية الأبعاد</span><span class="tag gold">مسابقات الفرق</span><span class="tag vi">لوحة تحكم المعلم</span></div></div><div class="col" style="flex:1.4">'+
    Object.keys(L).map(function(k,i){var X=L[k];return '<button class="lcard" data-l="'+k+'"><span class="orb"></span><span class="ln">الدرس '+n(i+1)+'</span><b>'+esc(X.title)+'</b><p>'+esc(X.blurb)+'</p><span class="go btn'+(i?' vi':'')+'">ابدأ الدرس ←</span></button>'}).join('')+'</div></div></section>');
  screens.appendChild(el);$$('.lcard',el).forEach(function(b){b.onclick=function(){ac();E.open(b.dataset.l)}});
  $('#bPrev').disabled=true;$('#bNext').disabled=true;
};
E.lesson=function(id,def){E.lessons[id]=def};
E.open=function(id,at){leave();var L=E.lessons[id];E.cur=id;$('#ltitle').textContent='الدرس '+n(Object.keys(E.lessons).indexOf(id)+1)+': '+L.title;
  screens.innerHTML='';L.stations.forEach(function(s,i){s.el=null;s.api=null;s.i=i});
  $('#bPrev').disabled=false;$('#bNext').disabled=false;
  progUI();E.idx=-1;E.go(at!=null?at:0,true);E.drawerFill()};
E.curL=function(){return E.cur&&E.lessons[E.cur]};
E.curSt=function(){var L=E.curL();return L&&L.stations[E.idx]};
function build(s){var L=E.curL();var cls='scr'+(s.full?' full':'');s.el=h('<section class="'+cls+'" data-st="'+s.id+'"></section>');screens.appendChild(s.el);s.api=s.build(s.el,{lesson:L,station:s})||{}}
function leave(){var s=E.curSt();if(s&&s.api&&s.api.leave)try{s.api.leave()}catch(e){console.error(e)}stopMusic()}
E.go=function(i,instant){var L=E.curL();if(!L)return;if(i<0||i>=L.stations.length)return;var old=E.curSt();if(old&&i===E.idx)return;
  leave();if(old&&old.el){var oe=old.el;oe.classList.remove('on');oe.classList.add('out');setTimeout(function(){oe.classList.remove('out')},700)}
  E.idx=i;var s=L.stations[i];if(!s.el)build(s);
  requestAnimationFrame(function(){s.el.classList.add('on');stagger(s.el)});
  if(!instant){SFX.whoosh();if(!s.full)titleCard(i,s)}
  if(s.api.enter)try{s.api.enter()}catch(e){console.error(e)}
  ST.last[E.cur]=i;markDone(s.id);save();progUI();E.drawerFill();
  history.replaceState(null,'','#'+E.cur+'-'+i);
  $('#bPrev').disabled=i===0;$('#bNext').disabled=i===L.stations.length-1;if(E.paused)E.setPaused(true)};
function stagger(el){var k=0;$$('.eyebrow,h1.t,.lead,.lcdrow,.card,.q,canvas.sim,.labview,.three,.wq,.goal,.teams4,.chips,.tb',el).filter(function(e){return !e.closest('.q .q')&&e.offsetParent!==null}).slice(0,14).forEach(function(e){e.classList.remove('rise');void e.offsetWidth;e.style.animationDelay=(0.12+k*0.05)+'s';e.classList.add('rise');k++})}
function titleCard(i,s){var t=$('#sttl');if(!t)return;var m=s.name.match(/^م(\S+)\s+(.+)$/);t.innerHTML='<div class="band"></div><div class="tx"><small>'+(m?'المحطة '+m[1]:'')+'</small><b>'+esc(m?m[2]:s.name)+'</b></div>';t.classList.remove('go');void t.offsetWidth;t.classList.add('go')}
E.replay=function(){var s=E.curSt();if(!s)return;leave();if(s.el)s.el.remove();build(s);s.el.classList.add('on');if(s.api.enter)s.api.enter();E.toast('أُعيد تشغيل المحطة')};
E.reveal=function(){var s=E.curSt();if(!s||!s.el)return;if(s.api&&s.api.reveal&&s.api.reveal()!==false)return;var r=$$('.reveal:not(.shown)',s.el);if(!r.length){E.toast('لا يوجد تفسير إضافي في هذه الشاشة');return}r[0].classList.add('shown');SFX.pop();r[0].scrollIntoView&&r[0].scrollIntoView({block:'nearest',behavior:'smooth'})};
function markDone(id){var d=ST.done[E.cur]=ST.done[E.cur]||{};d[id]=1}
E.complete=function(id){markDone(id||E.curSt().id);save();progUI()};
function progUI(){var L=E.curL();if(!L){$('#prog').innerHTML='';return}var d=ST.done[E.cur]||{};
  $('#prog').innerHTML=L.stations.map(function(s,i){return '<button class="'+(i===E.idx?'cur':'')+(d[s.id]&&i!==E.idx?' done':'')+'" data-i="'+i+'" aria-label="'+esc(s.name)+'"><span>'+esc(s.name)+'</span></button>'}).join('');
  $$('#prog button').forEach(function(b){b.onclick=function(){E.go(+b.dataset.i)}})}

/* ================= لوحة المعلم ================= */
E.drawer=function(on){$('#drawer').classList.toggle('on',on);$('#scrim').classList.toggle('on',on);if(on)E.drawerFill()};
E.drawerFill=function(){var b=$('#dBody');if(!b)return;var L=E.curL(),d=E.cur&&ST.done[E.cur]||{};
  var html='';
  Object.keys(E.lessons).forEach(function(k,li){var X=E.lessons[k];html+='<h4>الدرس '+n(li+1)+': '+esc(X.title)+'</h4><div class="stlist">'+X.stations.map(function(s,i){var dn=(ST.done[k]||{})[s.id];return '<button data-l="'+k+'" data-i="'+i+'" class="'+(k===E.cur&&i===E.idx?'cur':'')+(dn?' done':'')+'"><i>'+(dn?'✓':n(i+1))+'</i>'+esc(s.name)+'</button>'}).join('')+'</div>'});
  html+='<h4>التحكم السريع</h4><div class="chips"><button class="chip" id="qGoals">🎯 العودة إلى الأهداف</button><button class="chip" id="qReveal">💡 كشف الحل والتفسير</button><button class="chip" id="qSim">⏯ تشغيل/إيقاف المحاكاة</button><button class="chip" id="qWin">🏆 إعلان الفائز</button></div>';
  html+='<h4>المؤقت</h4><div class="chips">'+[30,60,90,120,180].map(function(s){return '<button class="chip" data-tm="'+s+'"'+(T.len===s?' aria-pressed="true"':'')+'>'+n(s)+' ث</button>'}).join('')+'<button class="chip" id="qTm">⏯ تشغيل/إيقاف</button></div>';
  html+='<h4>الفرق والنقاط</h4><div class="tgrid">'+ST.teams.map(function(t,i){return '<div class="tedit" style="--tc:'+t.c+'"><input data-tn="'+i+'" value="'+esc(t.n)+'" aria-label="اسم الفريق"><button data-ts="'+i+'" data-d="-10">−</button><b class="num">'+n(t.s)+'</b><button data-ts="'+i+'" data-d="10">+</button></div>'}).join('')+'</div><div class="chips" style="margin-top:10px"><button class="chip" id="qNew">🏫 حصة جديدة (تصفير كل النتائج)</button><button class="chip" id="qReset">↺ تصفير النقاط</button><button class="chip" id="qProg">🗑 مسح تقدم الحصة</button></div>';
  html+='<p class="hint" style="margin-top:14px">يعمل العرض دون حسابات للطلاب. تُحفظ النقاط والتقدم على هذا الجهاز فقط.</p>';
  b.innerHTML=html;
  $$('[data-l]',b).forEach(function(x){x.onclick=function(){if(x.dataset.l!==E.cur)E.open(x.dataset.l,+x.dataset.i);else E.go(+x.dataset.i);E.drawer(false)}});
  $('#qGoals',b).onclick=function(){var L=E.curL();if(!L){E.toast('اختر درسًا أولًا');return}var gi=L.stations.findIndex(function(s){return s.kind==='goals'});if(gi>=0)E.go(gi);E.drawer(false)};
  $('#qReveal',b).onclick=function(){E.drawer(false);E.reveal()};
  $('#qSim',b).onclick=function(){E.setPaused(!E.paused);E.drawer(false)};
  $('#qWin',b).onclick=function(){E.drawer(false);E.winner()};
  $$('[data-tm]',b).forEach(function(x){x.onclick=function(){E.timer.set(+x.dataset.tm);E.drawerFill()}});
  $('#qTm',b).onclick=function(){E.timer.toggle()};
  $$('[data-tn]',b).forEach(function(x){x.oninput=function(){ST.teams[+x.dataset.tn].n=x.value||('الفريق '+n(+x.dataset.tn+1));save();scoreUI()}});
  $$('[data-ts]',b).forEach(function(x){x.onclick=function(){E.addScore(+x.dataset.ts,+x.dataset.d);E.drawerFill()}});
  $('#qNew',b).onclick=function(){if(!confirm('بدء حصة جديدة لفصل آخر؟ ستُصفَّر نقاط الفرق والإجابات وتقدم المحطات.'))return;newSession();E.drawerFill();E.toast('صُفّرت نتائج الفرق والإجابات',2200)};
  $('#qReset',b).onclick=function(){if(!confirm('تصفير نقاط الفرق الأربعة؟'))return;ST.teams.forEach(function(t){t.s=0});ST.given={};save();scoreUI();E.drawerFill();refreshAwards()};
  $('#qProg',b).onclick=function(){if(!confirm('مسح تقدم المحطات والإجابات المحفوظة؟'))return;ST.done={};ST.res={};ST.given={};save();progUI();E.drawerFill();refreshAwards()};
};
function refreshAwards(){$$('.award button').forEach(function(x){x.classList.toggle('given',!!ST.given[x.dataset.k])})}

/* ================= الفرق ================= */
function scoreUI(){var mx=Math.max.apply(null,ST.teams.map(function(t){return t.s}));$('#scorechip').innerHTML=ST.teams.map(function(t){return '<b class="num" style="--tc:'+t.c+'" title="'+esc(t.n)+'">'+n(t.s)+'</b>'}).join('');
  $$('.teams4.live').forEach(function(w){w.innerHTML=teamsHTML()})}
function teamsHTML(){var mx=Math.max.apply(null,ST.teams.map(function(t){return t.s}));return ST.teams.map(function(t,i){return '<div class="team'+(mx>0&&t.s===mx?' lead':'')+'" style="--tc:'+t.c+'" data-ti="'+i+'"><span>'+esc(t.n)+'</span><b class="num">'+n(t.s)+'</b></div>'}).join('')}
E.teamsBoard=function(){return '<div class="teams4 live">'+teamsHTML()+'</div>'};
E.addScore=function(i,d){ST.teams[i].s=Math.max(0,ST.teams[i].s+d);save();scoreUI();if(d>0)SFX.award();$$('.teams4.live .team[data-ti="'+i+'"]').forEach(function(x){x.classList.remove('bump');void x.offsetWidth;x.classList.add('bump')})};
E.awardHTML=function(key,pts){return '<span class="award">امنح '+n(pts)+' نقطة:'+ST.teams.map(function(t,i){return '<button style="--tc:'+t.c+'" data-k="'+key+':'+i+'" data-ti="'+i+'" data-p="'+pts+'" class="'+(ST.given[key+':'+i]?'given':'')+'">'+esc(t.n.replace(/^فريق\s*/,''))+'</button>'}).join('')+'</span>'};
document.addEventListener('click',function(e){var b=e.target.closest('.award button');if(!b)return;var k=b.dataset.k;if(ST.given[k]){ST.given[k]=0;E.addScore(+b.dataset.ti,-(+b.dataset.p));b.classList.remove('given')}else{ST.given[k]=1;E.addScore(+b.dataset.ti,+b.dataset.p);b.classList.add('given')}save()});
E.winner=function(){var t=ST.teams.slice().sort(function(a,b){return b.s-a.s});var w=$('#win');
  if(!t[0].s){E.toast('لم تحصل الفرق على نقاط بعد');return}
  var tie=t[1]&&t[1].s===t[0].s;$('#wName').textContent=tie?'تعادل في الصدارة!':'الفائز: '+t[0].n;$('#wSub').textContent=tie?t.filter(function(x){return x.s===t[0].s}).map(function(x){return x.n}).join(' و ')+' بـ '+n(t[0].s)+' نقطة':'بمجموع '+n(t[0].s)+' نقطة · أحسنتم جميعًا!';
  $('#wTeams').innerHTML=teamsHTML();w.classList.add('on');SFX.win();confetti($('#wcv'))};
function confetti(cv){var W=cv.width=1600,H=cv.height=900,x=cv.getContext('2d'),P=[];for(var i=0;i<220;i++)P.push({x:Math.random()*W,y:-Math.random()*H,v:2+Math.random()*4,r:5+Math.random()*7,c:['#f5c451','#38d6ff','#8b6cff','#ff5d6c','#3ee08f'][i%5],w:Math.random()*6,a:Math.random()*6});var t0=performance.now();(function f(t){x.clearRect(0,0,W,H);P.forEach(function(p){p.y+=p.v;p.x+=Math.sin(t/400+p.w)*1.5;p.a+=.05;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r,p.r,p.r*2);x.restore()});if(t-t0<4500&&$('#win').classList.contains('on'))requestAnimationFrame(f);else x.clearRect(0,0,W,H)})(t0)}
E.confetti=confetti;

/* ================= المؤقت ================= */
var T={len:60,left:60,run:false,iv:null};
function timerInit(){$('#tPlay').onclick=function(){E.timer.toggle()};$('#tReset').onclick=function(){E.timer.set(T.len)};tUI()}
function tUI(){var m=Math.floor(T.left/60),s=T.left%60;$('#tv').textContent=n((m<10?'0':'')+m+':'+(s<10?'0':'')+s);$('#timer').classList.toggle('run',T.run);$('#timer').classList.toggle('low',T.run&&T.left<=10);$('#tPlay').textContent=T.run?'⏸':'▶'}
E.timer={set:function(s){clearInterval(T.iv);T.len=s;T.left=s;T.run=false;tUI()},
  toggle:function(){if(T.run){clearInterval(T.iv);T.run=false}else{if(T.left<=0)T.left=T.len;T.run=true;T.iv=setInterval(function(){T.left--;if(T.left<=10&&T.left>0)SFX.tick();if(T.left<=0){clearInterval(T.iv);T.run=false;SFX.no();E.toast('⏰ انتهى الوقت!')}tUI()},1000)}tUI()},
  start:function(s){E.timer.set(s);E.timer.toggle()}};

/* ================= مكونات التقويم ================= */
var LV={1:['سهل','l1',10],2:['متوسط','l2',20],3:['متقدم','l3',30]};
function qhead(o,kind){var lv=LV[o.lvl||1];return '<div class="qh"><span class="tag">'+kind+'</span><span class="lvl '+lv[1]+'">'+lv[0]+'</span>'+(o.goal?'<span class="tag gold">الهدف '+n(o.goal)+'</span>':'')+'</div>'}
function finish(el,o,ok,msg){ST.res[o.id]=ok?1:0;save();var lv=LV[o.lvl||1];var f=$('.qf',el);
  f.innerHTML='<div class="fbx '+(ok?'ok':'no')+'"><b>'+(ok?'✔ إجابة صحيحة':'✘ إجابة غير صحيحة')+'</b>'+(msg?' — '+msg:'')+(ok&&o.ex?'<br>'+o.ex:'')+'</div><div class="qa">'+(ok?'':'<button class="btn ghost" data-act="retry">↻ أعد المحاولة</button><button class="btn gold" data-act="show">💡 اكشف الإجابة والتفسير</button>')+(ok?E.awardHTML(o.id,lv[2]):'')+'</div>';
  f.classList.add('on');ok?SFX.ok():SFX.no();
  var r=$('[data-act=retry]',f);if(r)r.onclick=function(){f.classList.remove('on');o._reset&&o._reset()};
  var sh=$('[data-act=show]',f);if(sh)sh.onclick=function(){o._show&&o._show();f.innerHTML='<div class="fbx ok"><b>الإجابة الصحيحة:</b> '+(o._ansText?o._ansText():'')+(o.ex?'<br>'+o.ex:'')+'</div><div class="qa"><button class="btn ghost" data-act="retry">↻ أعد المحاولة</button>'+E.awardHTML(o.id,Math.round(lv[2]/2))+'</div>';$('[data-act=retry]',f).onclick=function(){f.classList.remove('on');o._reset&&o._reset()}}}
E.finish=finish;
/* اختيار من متعدد */
E.mcq=function(el,o){var q=h('<div class="q">'+qhead(o,o.kind||'اختيار من متعدد')+'<div class="qt">'+o.q+'</div>'+(o.img?'<div style="text-align:center;margin-bottom:10px">'+o.img+'</div>':'')+'<div class="opts"'+(o.cols?' style="grid-template-columns:repeat('+o.cols+',1fr)"':'')+'>'+o.o.map(function(x,i){return '<button class="opt" data-i="'+i+'"><i>'+KL[i]+'</i><span>'+x+'</span></button>'}).join('')+'</div><div class="qf"></div></div>');el.appendChild(q);
  var bs=$$('.opt',q);o._reset=function(){bs.forEach(function(b){b.disabled=false;b.className='opt'})};
  o._show=function(){bs.forEach(function(b){b.disabled=true;b.classList.toggle('ok',+b.dataset.i===o.a)})};o._ansText=function(){return o.o[o.a]};
  bs.forEach(function(b){b.onclick=function(){var i=+b.dataset.i,ok=i===o.a;bs.forEach(function(x){x.disabled=true});b.classList.add(ok?'ok':'no');finish(q,o,ok,ok?'':(o.why&&o.why[i])||'فكّروا مرة أخرى.')}});return q};
/* صح أم خطأ */
E.tf=function(el,o){o.o=['صح','خطأ'];o.a=o.v?0:1;o.kind='صح أم خطأ';o.cols=2;var x=E.mcq(el,o);return x};
/* سحب وإفلات للتصنيف */
var DRAG=null;
function dragify(tok,onDrop){tok.addEventListener('pointerdown',function(e){if(tok.classList.contains('locked'))return;e.preventDefault();var r=tok.getBoundingClientRect(),k=E.k||1;var c=tok.cloneNode(true);c.classList.add('drag');c.style.width=(r.width/k)+'px';c.style.left=r.left+'px';c.style.top=r.top+'px';c.style.transformOrigin='0 0';c.style.transform='scale('+k*1.05+')';document.body.appendChild(c);tok.classList.add('ghost');var dx=e.clientX-r.left,dy=e.clientY-r.top;DRAG={c:c};
  function mv(ev){c.style.left=(ev.clientX-dx)+'px';c.style.top=(ev.clientY-dy)+'px';var t=document.elementFromPoint(ev.clientX,ev.clientY);$$('.bin.over,.oslot.over').forEach(function(b){b.classList.remove('over')});var bin=t&&t.closest('.bin,.oslot');if(bin)bin.classList.add('over')}
  function up(ev){document.removeEventListener('pointermove',mv);document.removeEventListener('pointerup',up);document.removeEventListener('pointercancel',up);c.remove();tok.classList.remove('ghost');var t=document.elementFromPoint(ev.clientX,ev.clientY);$$('.bin.over,.oslot.over').forEach(function(b){b.classList.remove('over')});var bin=t&&t.closest('.bin,.oslot');if(bin)onDrop(bin);DRAG=null}
  document.addEventListener('pointermove',mv);document.addEventListener('pointerup',up);document.addEventListener('pointercancel',up)})}
E.dragify=dragify;
E.sort=function(el,o){var q=h('<div class="q dd">'+qhead(o,o.kind||'سحب وإفلات')+'<div class="qt">'+o.q+'</div><div class="pool"></div><div class="bins" style="grid-template-columns:repeat('+o.bins.length+',1fr)">'+o.bins.map(function(b,i){return '<div class="bin" data-b="'+i+'"><h4><span>'+b+'</span><span class="num cnt">'+n(0)+'</span></h4><div class="slot"></div></div>'}).join('')+'</div><div class="qa"><button class="btn" data-act="check">✓ تحقّق</button><span class="hint">اسحب كل بطاقة إلى مكانها، أو المس البطاقة ثم المس المجموعة.</span></div><div class="qf"></div></div>');el.appendChild(q);
  var pool=$('.pool',q),sel=null;
  function mk(){pool.innerHTML='';$$('.slot',q).forEach(function(s){s.innerHTML=''});shuffle(o.items).forEach(function(it){var t=h('<div class="tok" data-b="'+it.b+'">'+(it.img||'')+'<span>'+it.t+'</span></div>');t._it=it;pool.appendChild(t);dragify(t,function(bin){if(bin.classList.contains('bin')){$('.slot',bin).appendChild(t);cnt()}});t.addEventListener('click',function(){if(DRAG)return;$$('.tok',q).forEach(function(x){x.style.outline=''});sel=t;t.style.outline='3px solid var(--au)'})});cnt()}
  $$('.bin',q).forEach(function(b){b.addEventListener('click',function(e){if(sel&&!e.target.closest('.tok')){$('.slot',b).appendChild(sel);sel.style.outline='';sel=null;cnt()}})});
  function cnt(){$$('.bin',q).forEach(function(b){$('.cnt',b).textContent=n($$('.tok',b).length)})}
  o._reset=function(){mk()};o._show=function(){$$('.tok',q).forEach(function(t){var b=$('.bin[data-b="'+t.dataset.b+'"] .slot',q);b.appendChild(t);t.classList.remove('no');t.classList.add('ok')});cnt()};o._ansText=function(){return 'وُضعت كل بطاقة في مجموعتها الصحيحة.'};
  $('[data-act=check]',q).onclick=function(){var toks=$$('.tok',q),placed=0,bad=0;toks.forEach(function(t){t.classList.remove('ok','no');var b=t.closest('.bin');if(!b)return;placed++;var ok=b.dataset.b===t.dataset.b;t.classList.add(ok?'ok':'no');if(!ok)bad++});
    if(placed<toks.length){E.toast('ضعوا كل البطاقات أولًا ('+n(toks.length-placed)+' متبقية)');return}finish(q,o,!bad,bad?n(bad)+' بطاقات في غير مكانها (باللون الأحمر).':'')};
  mk();return q};
/* ترتيب */
E.order=function(el,o){var q=h('<div class="q">'+qhead(o,'ترتيب')+'<div class="qt">'+o.q+'</div><div class="ord oslots" style="margin-bottom:10px">'+o.items.map(function(_,i){return '<div class="oslot bin" style="min-height:96px;flex:1;min-width:150px" data-i="'+i+'"><h4><span class="slotn">'+n(i+1)+'</span></h4><div class="slot"></div></div>'}).join('')+'</div><div class="pool ord"></div><div class="qa"><button class="btn" data-act="check">✓ تحقّق من الترتيب</button></div><div class="qf"></div></div>');el.appendChild(q);
  var pool=$('.pool',q);
  function mk(){pool.innerHTML='';$$('.oslot .slot',q).forEach(function(s){s.innerHTML=''});var sh=shuffle(o.items.map(function(t,i){return [t,i]}));if(sh.every(function(x,i){return x[1]===i}))sh.reverse();sh.forEach(function(x){var t=h('<div class="tok" data-i="'+x[1]+'"><span>'+x[0]+'</span></div>');pool.appendChild(t);dragify(t,function(sl){var s=$('.slot',sl);var ex=$('.tok',s);if(ex)pool.appendChild(ex);s.appendChild(t)});t.onclick=function(){if(DRAG)return;var empty=$$('.oslot',q).filter(function(s){return !$('.tok',s)})[0];if(t.closest('.oslot')){pool.appendChild(t)}else if(empty)$('.slot',empty).appendChild(t)}})}
  o._reset=mk;o._show=function(){$$('.oslot',q).forEach(function(s,i){var t=$('.tok[data-i="'+i+'"]',q);$('.slot',s).appendChild(t);t.classList.add('ok')})};o._ansText=function(){return o.items.map(function(t,i){return n(i+1)+') '+t}).join('  ')};
  $('[data-act=check]',q).onclick=function(){var sl=$$('.oslot',q),bad=0,empty=0;sl.forEach(function(s,i){var t=$('.tok',s);if(!t){empty++;return}t.classList.remove('ok','no');var ok=+t.dataset.i===i;t.classList.add(ok?'ok':'no');if(!ok)bad++});if(empty){E.toast('أكملوا الترتيب أولًا');return}finish(q,o,!bad,bad?'بعض البطاقات في غير موضعها.':'')};
  mk();return q};
/* إكمال جدول */
E.table=function(el,o){var q=h('<div class="q">'+qhead(o,o.kind||'إكمال جدول')+'<div class="qt">'+o.q+'</div><table class="tb"><thead><tr>'+o.cols.map(function(c){return '<th>'+c+'</th>'}).join('')+'</tr></thead><tbody>'+o.rows.map(function(r,ri){return '<tr>'+r.map(function(c,ci){if(c&&typeof c==='object'){return '<td>'+(c.opts?'<select data-a="'+esc(c.a)+'"><option value="">اختر</option>'+c.opts.map(function(x){return '<option>'+esc(x)+'</option>'}).join('')+'</select>':'<input data-a="'+esc(c.a)+'" inputmode="'+(/^[\d.]+$/.test(c.a)?'decimal':'text')+'" aria-label="خانة">')+'</td>'}return '<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table><div class="qa"><button class="btn" data-act="check">✓ تحقّق</button></div><div class="qf"></div></div>');el.appendChild(q);
  var ins=$$('[data-a]',q);function norm(v){return String(v).trim().replace(/[٠-٩]/g,function(d){return AR.indexOf(d)}).replace(/[إأآ]/g,'ا').replace(/ة/g,'ه').replace(/\s+/g,' ').replace(/^ال/,'')}
  o._reset=function(){ins.forEach(function(i){i.value='';i.classList.remove('ok','no')})};o._show=function(){ins.forEach(function(i){i.value=i.dataset.a;i.classList.remove('no');i.classList.add('ok')})};o._ansText=function(){return 'أُكملت الخانات في الجدول.'};
  $('[data-act=check]',q).onclick=function(){var bad=0,empty=0;ins.forEach(function(i){i.classList.remove('ok','no');if(!i.value.trim()){empty++;return}var ok=i.dataset.a.split('|').some(function(a){return norm(a)===norm(i.value)||(!isNaN(parseFloat(norm(a)))&&Math.abs(parseFloat(norm(a))-parseFloat(norm(i.value)))<1e-6)});i.classList.add(ok?'ok':'no');if(!ok)bad++});if(empty){E.toast('أكملوا كل الخانات ('+n(empty)+' فارغة)');return}finish(q,o,!bad,bad?n(bad)+' خانات تحتاج مراجعة.':'')};
  return q};
/* مسألة قصيرة */
E.problem=function(el,o){var q=h('<div class="q">'+qhead(o,'مسألة')+'<div class="qt">'+o.q+'</div><div class="qa" style="font-size:22px">'+(o.label||'الإجابة')+': <input class="ans" inputmode="decimal" aria-label="الإجابة"> '+(o.unit||'')+'<button class="btn" data-act="check">✓ تحقّق</button></div><div class="qf"></div></div>');el.appendChild(q);var inp=$('input',q);
  o._reset=function(){inp.value='';inp.disabled=false};o._show=function(){inp.value=o.a};o._ansText=function(){return n(o.a)+' '+(o.unit||'')+(o.steps?'<br>'+o.steps:'')};
  $('[data-act=check]',q).onclick=function(){var v=parseFloat(String(inp.value).replace(/[٠-٩]/g,function(d){return AR.indexOf(d)}).replace('٫','.').replace(',','.'));if(isNaN(v)){E.toast('اكتبوا رقمًا');return}var ok=Math.abs(v-o.a)<=(o.tol||0.001);finish(q,o,ok,ok?(o.steps||''):'راجعوا الخطوات.')};return q};
/* اكتشف الخطأ العلمي */
E.spot=function(el,o){var q=h('<div class="q">'+qhead(o,'اكتشف الخطأ العلمي')+'<div class="qt">'+(o.q||'المس الجزء الخاطئ علميًا في العبارة:')+'</div><div class="big spotx" style="font-size:25px;line-height:2.1">'+o.parts.map(function(p,i){return '<button class="chip" style="font-size:22px;margin:3px" data-i="'+i+'">'+p+'</button>'}).join(' ')+'</div><div class="qf"></div></div>');el.appendChild(q);var bs=$$('.spotx .chip',q);
  o._reset=function(){bs.forEach(function(b){b.disabled=false;b.style.background='';b.removeAttribute('aria-pressed')})};o._show=function(){var b=bs[o.bad];b.style.background='rgba(255,107,129,.3)'};o._ansText=function(){return '«'+o.parts[o.bad]+'» خطأ، والصواب: «'+o.fix+'».'};
  bs.forEach(function(b){b.onclick=function(){var i=+b.dataset.i,ok=i===o.bad;bs.forEach(function(x){x.disabled=true});b.style.background=ok?'rgba(62,224,143,.3)':'rgba(255,107,129,.3)';finish(q,o,ok,ok?'الصواب: «'+o.fix+'».':'هذا الجزء صحيح علميًا، ابحثوا عن غيره.')}});return q};
/* استطلاع التوقع (دون كشف الإجابة) */
E.poll=function(el,o){var votes=o.o.map(function(){return 0});var q=h('<div class="q'+(o.compact?' compact':'')+'">'+'<div class="qh"><span class="tag vi">'+(o.kind||'توقّع')+'</span></div><div class="qt">'+o.q+'</div><div class="col" style="gap:10px">'+o.o.map(function(x,i){return '<div class="opt" style="cursor:default"><i>'+KL[i]+'</i><span style="flex:1">'+x+'</span><span class="pbar" style="width:220px;height:16px;border-radius:9px;background:rgba(255,255,255,.08);overflow:hidden"><b style="display:block;height:100%;width:0;background:linear-gradient(90deg,var(--cy),var(--vi));transition:width .4s"></b></span><b class="num pv" style="min-width:36px;text-align:center">'+n(0)+'</b><button class="cb" data-i="'+i+'" data-d="-1" style="height:40px;min-width:40px">−</button><button class="cb" data-i="'+i+'" data-d="1" style="height:40px;min-width:40px">+</button></div>'}).join('')+'</div><p class="hint" style="margin:10px 0 0">'+(o.hint||'سجّل عدد الطلاب لكل توقع. لا تُكشف الإجابة الآن، فسنختبرها في المحطات القادمة.')+'</p></div>');el.appendChild(q);
  function ui(){var t=votes.reduce(function(a,b){return a+b},0)||1;$$('.opt',q).forEach(function(r,i){$('.pv',r).textContent=n(votes[i]);$('.pbar b',r).style.width=(votes[i]/t*100)+'%'})}
  $$('[data-d]',q).forEach(function(b){b.onclick=function(){var i=+b.dataset.i;votes[i]=Math.max(0,votes[i]+(+b.dataset.d));SFX.tick();ui()}});return q};

/* ================= أدوات ثلاثية الأبعاد ================= */
E.three=function(box,opt){opt=opt||{};var THREE=window.THREE;var W=box.clientWidth||800,H=box.clientHeight||500;
  var r=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});r.setPixelRatio(Math.min(2,window.devicePixelRatio||1));r.setSize(W,H);if(THREE.sRGBEncoding)r.outputEncoding=THREE.sRGBEncoding;box.appendChild(r.domElement);
  var sc=new THREE.Scene();var cam=new THREE.PerspectiveCamera(opt.fov||45,W/H,0.01,1000);cam.position.set(0,0,opt.z||10);
  sc.add(new THREE.HemisphereLight(0xbfe6ff,0x101030,0.9));var dl=new THREE.DirectionalLight(0xffffff,0.9);dl.position.set(4,6,8);sc.add(dl);var dl2=new THREE.DirectionalLight(0x8b6cff,0.5);dl2.position.set(-6,-2,-4);sc.add(dl2);
  var ctl=null;if(opt.orbit&&THREE.OrbitControls){ctl=new THREE.OrbitControls(cam,r.domElement);ctl.enableDamping=true;ctl.enablePan=false;ctl.minDistance=opt.minD||2;ctl.maxDistance=opt.maxD||40}
  var T={THREE:THREE,r:r,sc:sc,cam:cam,ctl:ctl,box:box,t:0,run:false,hooks:[],raf:0};
  function size(){var w=box.clientWidth,hh=box.clientHeight;if(!w||!hh)return;r.setSize(w,hh,false);cam.aspect=w/hh;cam.updateProjectionMatrix()}
  T.size=size;var last=0;
  function loop(ts){if(!T.run)return;T.raf=requestAnimationFrame(loop);var dt=Math.min(0.05,(ts-(last||ts))/1000);last=ts;if(!E.paused){T.t+=dt;T.hooks.forEach(function(f){f(dt,T.t)})}if(ctl)ctl.update();r.render(sc,cam)}
  T.start=function(){if(T.run)return;T.run=true;last=0;size();T.raf=requestAnimationFrame(loop)};T.stop=function(){T.run=false;cancelAnimationFrame(T.raf)};
  T.dispose=function(){T.stop();try{r.dispose();r.forceContextLoss&&r.forceContextLoss()}catch(e){}r.domElement.remove()};
  if(window.ResizeObserver)new ResizeObserver(size).observe(box);
  return T};
/* إسقاط موضع ثلاثي الأبعاد إلى إحداثيات البطاقة */
E.project=function(T,v,el){var p=v.clone().project(T.cam);var w=T.box.clientWidth,hh=T.box.clientHeight;el.style.left=((p.x+1)/2*w)+'px';el.style.top=((1-p.y)/2*hh)+'px';el.style.display=p.z<1?'':'none'};
/* مواد مشتركة */
E.mat=function(color,o){o=o||{};var THREE=window.THREE;return new THREE.MeshStandardMaterial({color:color,roughness:o.r!=null?o.r:0.35,metalness:o.m||0.05,emissive:o.e||0x000000,emissiveIntensity:o.ei||1,transparent:o.op!=null,opacity:o.op!=null?o.op:1})};
E.glowTex=function(color){var c=document.createElement('canvas');c.width=c.height=128;var x=c.getContext('2d');var g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,color);g.addColorStop(.25,color);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);var t=new THREE.CanvasTexture(c);return t};
E.textSprite=function(txt,o){o=o||{};var c=document.createElement('canvas');var fs=o.fs||64;var x=c.getContext('2d');x.font='700 '+fs+'px "Readex Pro","IBM Plex Sans Arabic",sans-serif';var w=Math.ceil(x.measureText(txt).width)+fs;c.width=w;c.height=fs*1.6;x=c.getContext('2d');x.font='700 '+fs+'px "Readex Pro","IBM Plex Sans Arabic",sans-serif';x.direction='rtl';x.textAlign='center';x.textBaseline='middle';if(o.bg){x.fillStyle=o.bg;var rr=fs*.4;x.beginPath();x.roundRect?x.roundRect(2,2,w-4,c.height-4,rr):x.rect(2,2,w-4,c.height-4);x.fill()}x.fillStyle=o.color||'#fff';x.fillText(txt,w/2,c.height/2+2);var t=new THREE.CanvasTexture(c);var s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthTest:o.depthTest!==false}));var sc=o.size||1;s.scale.set(sc*w/c.height,sc,1);return s};

/* خلفية مختبر واضحة: جدار فاتح وطاولة عمل */
E.labBg=function(x,W,H,by){x.fillStyle='#e8eef0';x.fillRect(0,0,W,H);x.strokeStyle='rgba(120,140,150,.18)';x.lineWidth=1;for(var gx=0;gx<W;gx+=50){x.beginPath();x.moveTo(gx,0);x.lineTo(gx,by);x.stroke()}for(var gy=0;gy<by;gy+=50){x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke()}
  x.fillStyle='#384952';x.fillRect(0,by,W,14);x.fillStyle='#26333a';x.fillRect(0,by+14,W,H-by-14);x.fillStyle='rgba(255,255,255,.18)';x.fillRect(0,by,W,3)};
/* ================= شاشات قياسية ================= */
E.intro=function(el,cfg){/* cfg: {build(T), dur, caps:[{t,at,end,sub}], final:'...'} */
  el.innerHTML='<div class="cine"><div class="three" style="position:absolute;inset:0;border:0;border-radius:0;background:radial-gradient(circle at 50% 45%,#0f2457,#02060f 75%)"></div><div class="vign"></div><div class="sub"></div><div class="cap"></div><div class="tbar"><i></i></div><button class="cb skip">⏭ تخطَّ المشهد</button><button class="cb" style="position:absolute;left:250px;bottom:96px;z-index:3" data-rp>↻ أعد المشهد</button></div>';
  var box=$('.three',el),cap=$('.cap',el),sub=$('.sub',el),bar=$('.tbar i',el);var T=null,t0=0,done=false,lastCap=-1,lastSub=-1;
  function caption(t){var ci=-1,si=-1;(cfg.caps||[]).forEach(function(c,i){if(t>=c.at&&t<(c.end||1e9)){if(c.sub)si=i;else ci=i}});if(ci!==lastCap){lastCap=ci;cap.classList.remove('on');if(ci>=0)setTimeout(function(){cap.innerHTML=cfg.caps[ci].t;cap.classList.add('on')},ci>=0&&cap.innerHTML?500:0)}if(si!==lastSub){lastSub=si;sub.classList.remove('on');if(si>=0){sub.innerHTML=cfg.caps[si].t;sub.classList.add('on')}}}
  function start(){if(!T){T=E.three(box,{fov:cfg.fov||45,z:cfg.z||12});cfg.build(T);T.hooks.push(function(dt,t){var k=Math.min(1,t/cfg.dur);bar.style.width=(k*100)+'%';caption(t);if(cfg.tick)cfg.tick(T,t,k);if(t>=cfg.dur&&!done){done=true;E.complete()}})}T.start();if(T.t<0.1)playIntro(cfg.dur*0.9)}
  $('.skip',el).onclick=function(){if(!T)return;T.t=cfg.dur-0.5;stopMusic()};
  $('[data-rp]',el).onclick=function(){if(!T)return;T.t=0;done=false;lastCap=-2;lastSub=-2;playIntro(cfg.dur*0.9)};
  return {enter:start,leave:function(){if(T)T.stop()},pause:function(){},seek:function(t){if(T){T.t=t;lastCap=-2;lastSub=-2}}}};
E.wonder=function(el,cfg){el.innerHTML='<div class="eyebrow">'+cfg.eyebrow+'</div><h1 class="t xl" style="text-align:center;margin-top:10px">ماذا ستتعلم اليوم؟</h1><div class="wonder" style="grid-template-columns:repeat('+cfg.items.length+',1fr)">'+cfg.items.map(function(it,i){return '<div class="wq"><div class="ic">'+it.ic+'</div><span class="n">'+n(i+1)+'</span><b>'+it.t+'</b></div>'}).join('')+'</div>';
  var tms=[];return {enter:function(){$$('.wq',el).forEach(function(w,i){w.classList.remove('in');tms.push(setTimeout(function(){w.classList.add('in');SFX.pop()},400+i*900))})},leave:function(){tms.forEach(clearTimeout);tms=[]}}};
E.goalsScreen=function(el,cfg){el.innerHTML='<div class="eyebrow">'+cfg.eyebrow+'</div><h1 class="t xl">أهداف الدرس</h1>'+(cfg.idea?'<p class="lead"><b class="gl">الفكرة الرئيسة:</b> '+cfg.idea+'</p>':'')+'<ol class="goals'+(cfg.goals.length>4?' six':'')+'">'+cfg.goals.map(function(g,i){return '<li class="goal"><span class="gn">'+n(i+1)+'</span><span class="gi">'+g.ic+'</span><span>'+g.t+'</span></li>'}).join('')+'</ol><div class="qa" style="margin-top:14px"><button class="btn ghost" data-nx>إظهار الهدف التالي ←</button><button class="btn ghost" data-all>إظهار الكل</button><span class="hint">يقرأ المعلم الأهداف ويناقشها مع الطلاب.</span></div>';
  var k=0,gs=$$('.goal',el);function show(){if(k<gs.length){gs[k].classList.add('in');k++;SFX.pop()}}
  $('[data-nx]',el).onclick=show;$('[data-all]',el).onclick=function(){while(k<gs.length)show()};
  return {enter:function(){if(!k)setTimeout(show,500)},reveal:function(){if(k<gs.length){show();return true}return false}}};
/* ماذا تعلمنا: الأهداف كقائمة تحقق مرتبطة بالمحطات والأسئلة */
E.review=function(el,cfg){
  function draw(){var d=ST.done[E.cur]||{};el.innerHTML='<div class="eyebrow">ختام الدرس</div><h1 class="t">ماذا تعلمنا اليوم؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1.25;gap:10px">'+cfg.goals.map(function(g,i){var sts=g.st||[],qs=g.q||[];var sd=sts.filter(function(s){return d[s]}).length,qa=qs.filter(function(q){return ST.res[q]!=null}).length,qo=qs.filter(function(q){return ST.res[q]===1}).length;var full=sts.length&&sd===sts.length&&(!qs.length||qo>=Math.ceil(qs.length/2));
      return '<div class="goal in" style="font-size:'+(cfg.goals.length>4?19:23)+'px;padding:10px 18px;align-items:flex-start"><span class="gi" style="'+(full?'background:var(--ok);':'')+'">'+(full?'<b style="font-size:30px;color:#022">✓</b>':'<b style="font-size:24px">'+n(i+1)+'</b>')+'</span><span style="flex:1"><span>'+g.t+'</span><br><small class="hint">'+g.how+' · المحطات المنجزة '+n(sd)+'/'+n(sts.length)+(qs.length?' · الأسئلة الصحيحة '+n(qo)+'/'+n(qs.length):'')+'</small></span></div>'}).join('')+'</div><div class="col grow side" id="exit"></div></div>';
    var ex=$('#exit',el);ex.insertAdjacentHTML('beforeend','<div class="card" style="padding:12px 18px"><h3 style="margin:0">🎟 بطاقة الخروج</h3><p class="hint" style="margin:0">ثلاثة أسئلة سريعة قبل مغادرة الحصة.</p></div>');
    cfg.exit.forEach(function(q){var b=h('<div></div>');ex.appendChild(b);(q.t==='tf'?E.tf:E.mcq)(b,q)});
    if(cfg.extra)cfg.extra(ex);
    ex.insertAdjacentHTML('beforeend','<div class="qa"><button class="btn gold" data-w>🏆 إعلان الفريق الفائز</button><button class="btn ghost" data-r>↻ تحديث قائمة التحقق</button></div>');
    $('[data-w]',el).onclick=function(){E.winner()};$('[data-r]',el).onclick=draw}
  draw();return {enter:draw}};
})();
