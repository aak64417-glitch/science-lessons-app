/* أنماط صفحات الفصول: أنشطة، مسابقات، تقويم، عرض مرئي، حقيبة الفصل */
window.KIT_MODES=(function(){
"use strict";
function hero(K,kick,title,sub){var C=K.P.chapter;return '<header class="hero"><span class="kick">'+K.esc(kick)+' · '+K.esc(C.title)+'</span><h1>'+K.esc(title)+'</h1><p>'+K.esc(sub)+'</p></header>'}
function allTerms(K){var a=[];K.P.lessons.forEach(function(L){L.terms.forEach(function(t){a.push({t:t.t,d:t.d,L:L})})});return a}
function allQs(K,ids){var a=[];K.P.lessons.forEach(function(L){if(ids&&ids.indexOf(L.id)<0)return;L.qs.forEach(function(q){a.push({q:q.q,o:q.o,a:q.a,ex:q.ex,L:L})})});return a}
function mixQ(K,q){var idx=K.shuffle(q.o.map(function(_,i){return i}));return {q:q.q,o:idx.map(function(i){return q.o[i]}),a:idx.indexOf(q.a),ex:q.ex,L:q.L}}
function confetti(){var c=document.createElement('canvas');c.className='confetti';document.body.appendChild(c);var W=c.width=innerWidth,H=c.height=innerHeight,x=c.getContext('2d');var P=[];for(var i=0;i<140;i++)P.push({x:Math.random()*W,y:-20-Math.random()*H*.4,v:2+Math.random()*4,r:4+Math.random()*5,c:['#FFC53D','#2F7BF6','#F2545B','#18A058','#8E44AD'][i%5],w:Math.random()*6});var t0=performance.now();(function f(t){x.clearRect(0,0,W,H);P.forEach(function(p){p.y+=p.v;p.x+=Math.sin((t/300)+p.w)*1.6;x.fillStyle=p.c;x.fillRect(p.x,p.y,p.r,p.r*1.6)});if(t-t0<2600)requestAnimationFrame(f);else c.remove()})(t0)}
function fs(){var d=document.documentElement;if(document.fullscreenElement)document.exitFullscreen().catch(function(){});else if(d.requestFullscreen)d.requestFullscreen().catch(function(){})}
function bar(K,title){return '<div class="bar"><span class="t">'+K.esc(title)+'</span><button class="b" id="snd" aria-pressed="false">🔊 الصوت</button><button class="b" id="fsb">⛶ ملء الشاشة</button></div>'}
function wireBar(K){var s=K.$('#snd');if(s)s.onclick=function(){K.SND.on=!K.SND.on;s.textContent=K.SND.on?'🔊 الصوت':'🔇 الصوت'};var f=K.$('#fsb');if(f)f.onclick=fs}

/* ================= الأنشطة التفاعلية ================= */
function activity(K){
  var P=K.P, n=K.n, esc=K.esc, T=allTerms(K);
  var tf=[];P.lessons.forEach(function(L){L.tf.forEach(function(t){tf.push({s:t[0],v:t[1],w:t[2],L:L})})});
  var ACT=[['mem','🃏','ذاكرة المصطلحات','اقلب البطاقات وطابق كل مصطلح بتعريفه'],['sort','🧺','فرز البطاقات','صنّف كل بطاقة في سلّتها الصحيحة'],['fill','🧩','أكمل التعريف','اختر المصطلح الذي يكمل التعريف']];
  if(tf.length>=4)ACT.push(['tf','⚡','صح أم خطأ؟','قرار سريع قبل انتهاء الوقت']);
  document.body.innerHTML=bar(K,'أنشطة تفاعلية · '+P.chapter.short)+'<main class="app">'+hero(K,'أنشطة تفاعلية','مختبر الأنشطة','أنشطة قصيرة تراجع بها مصطلحات الفصل ومفاهيمه، فرديًا أو في مجموعات.')+
    '<div class="acts4">'+ACT.map(function(a){return '<button class="actc" data-a="'+a[0]+'"><span class="ai">'+a[1]+'</span><b>'+a[2]+'</b><small>'+a[3]+'</small></button>'}).join('')+'</div><section class="panel" id="stage"></section></main>';
  wireBar(K);
  var stage=K.$('#stage');
  document.addEventListener('click',function(e){var b=e.target.closest('[data-a]');if(!b)return;K.$$('[data-a]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});RUN[b.dataset.a]();stage.scrollIntoView({behavior:'smooth',block:'start'})});
  var RUN={
   mem:function(){
     var pick=K.shuffle(T).slice(0,6), cards=[];pick.forEach(function(t,i){cards.push({k:i,txt:t.t,term:1},{k:i,txt:t.d,term:0})});cards=K.shuffle(cards);
     var open=[],done=0,moves=0,t0=Date.now(),lock=false;
     stage.innerHTML='<div class="sh"><h2>🃏 ذاكرة المصطلحات</h2><span class="muted">المحاولات: <b id="mv">٠</b> · المطابقات: <b id="mt">٠</b> / ٦</span><button class="b" data-a="mem">↺ جولة جديدة</button></div><div class="mem">'+cards.map(function(c,i){return '<button class="mc'+(c.term?' term':'')+'" data-i="'+i+'" aria-label="بطاقة"><span class="bk">؟</span><span class="fr">'+esc(c.txt)+'</span></button>'}).join('')+'</div>';
     K.$$('.mc',stage).forEach(function(el){el.onclick=function(){if(lock||el.classList.contains('up'))return;el.classList.add('up');K.sfx.tick();open.push(el);if(open.length<2)return;moves++;K.$('#mv').textContent=n(moves);var a=cards[open[0].dataset.i],b=cards[open[1].dataset.i];
       if(a.k===b.k&&a.term!==b.term){open.forEach(function(x){x.classList.add('ok')});open=[];done++;K.$('#mt').textContent=n(done);K.sfx.ok();if(done===6){K.sfx.win();confetti();var s=Math.round((Date.now()-t0)/1000);stage.insertAdjacentHTML('beforeend','<div class="fb ok">أحسنت! أنهيت المطابقة في '+n(moves)+' محاولة خلال '+n(s)+' ثانية.</div>')}}
       else{lock=true;K.sfx.no();setTimeout(function(){open.forEach(function(x){x.classList.remove('up')});open=[];lock=false},950)}}});
   },
   sort:function(){
     var sets=(P.sets||[]).slice();sets.unshift({title:'إلى أي درس ينتمي المصطلح؟',keys:P.lessons.map(function(L){return L.title}),items:T.map(function(t){return [t.t,P.lessons.indexOf(t.L)]})});
     stage.innerHTML='<div class="sh"><h2>🧺 فرز البطاقات</h2></div><div class="chips" id="sets">'+sets.map(function(s,i){return '<button class="chip" data-s="'+i+'" aria-pressed="'+(i===0)+'">'+esc(s.title)+'</button>'}).join('')+'</div><div id="sg"></div>';
     function go(si){var S=sets[si],items=K.shuffle(S.items),i=0,ok=0,miss=0;K.$$('[data-s]',stage).forEach(function(x){x.setAttribute('aria-pressed',x.dataset.s==si)});
       function draw(){var g=K.$('#sg');if(i>=items.length){K.sfx.win();if(!miss)confetti();g.innerHTML='<div class="sortend"><b>'+n(ok)+' / '+n(items.length)+'</b><span>'+(miss?'راجع البطاقات التي أخطأت فيها وأعد المحاولة.':'ممتاز! فرزت كل البطاقات صحيحًا من المحاولة الأولى.')+'</span><button class="b c" id="again">↺ أعد الفرز</button></div>';K.$('#again').onclick=function(){go(si)};return}
         var it=items[i];g.innerHTML='<div class="prog"><i style="width:'+(i/items.length*100)+'%"></i></div><div class="bigcard" id="bc"><small>البطاقة '+n(i+1)+' من '+n(items.length)+'</small><b>'+esc(it[0])+'</b></div><div class="bins">'+S.keys.map(function(k,j){return '<button class="bin" data-j="'+j+'"><span>🧺</span>'+esc(k)+'</button>'}).join('')+'</div><div id="sfb"></div>';
         var first=true;K.$$('.bin',g).forEach(function(b){b.onclick=function(){var j=+b.dataset.j;if(j===it[1]){K.sfx.ok();if(first)ok++;b.classList.add('hit');K.$('#bc').classList.add('fly');setTimeout(function(){i++;draw()},520)}else{K.sfx.no();if(first)miss++;first=false;b.classList.add('miss');K.$('#bc').classList.add('shake');setTimeout(function(){K.$('#bc').classList.remove('shake')},400);K.$('#sfb').innerHTML='<div class="fb no">'+(it[2]?esc(it[2]):'فكّر مرة أخرى، ثم اختر سلة أخرى.')+'</div>'}}})}
       draw()}
     K.$$('[data-s]',stage).forEach(function(b){b.onclick=function(){go(+b.dataset.s)}});go(0);
   },
   fill:function(){
     var R=K.shuffle(T).slice(0,Math.min(10,T.length)),i=0,sc=0,streak=0;
     function draw(){if(i>=R.length){K.sfx.win();if(sc>=R.length*.8)confetti();stage.innerHTML='<div class="sh"><h2>🧩 أكمل التعريف</h2></div><div class="sortend"><b>'+n(sc)+' / '+n(R.length)+'</b><span>'+(sc===R.length?'إتقان كامل للمصطلحات!':'أعد المحاولة لتحسين نتيجتك.')+'</span><button class="b c" data-a="fill">↺ جولة جديدة</button></div>';return}
       var t=R[i],opts=K.shuffle([t].concat(K.shuffle(T.filter(function(x){return x.t!==t.t})).slice(0,3)));
       stage.innerHTML='<div class="sh"><h2>🧩 أكمل التعريف</h2><span class="muted">السؤال '+n(i+1)+' من '+n(R.length)+' · النقاط <b>'+n(sc)+'</b>'+(streak>1?' · 🔥 '+n(streak):'')+'</span></div><div class="prog"><i style="width:'+(i/R.length*100)+'%"></i></div><div class="defq"><span class="lbl">'+esc(t.L.title)+'</span><p>«<span class="gap">…………</span>» '+esc(t.d)+'</p></div><div class="fopts">'+opts.map(function(o){return '<button class="fo" data-t="'+esc(o.t)+'">'+esc(o.t)+'</button>'}).join('')+'</div><div id="ffb"></div>';
       K.$$('.fo',stage).forEach(function(b){b.onclick=function(){K.$$('.fo',stage).forEach(function(x){x.disabled=true;if(x.dataset.t===t.t)x.classList.add('ok')});var good=b.dataset.t===t.t;if(good){sc++;streak++;K.sfx.ok();K.$('.gap',stage).textContent=t.t}else{streak=0;b.classList.add('no');K.sfx.no()}K.$('#ffb').innerHTML='<div class="fb '+(good?'ok':'no')+'">'+(good?'صحيح!':'الإجابة الصحيحة: '+esc(t.t))+' <button class="b" id="nx" style="margin-inline-start:10px">التالي ←</button></div>';K.$('#nx').onclick=function(){i++;draw()}}})}
     draw();
   },
   tf:function(){
     var R=K.shuffle(tf).slice(0,Math.min(8,tf.length)),i=0,sc=0,timer=null;
     function draw(){clearInterval(timer);if(i>=R.length){K.sfx.win();if(sc===R.length)confetti();stage.innerHTML='<div class="sh"><h2>⚡ صح أم خطأ؟</h2></div><div class="sortend"><b>'+n(sc)+' / '+n(R.length)+'</b><span>جولة خاطفة منتهية.</span><button class="b c" data-a="tf">↺ جولة جديدة</button></div>';return}
       var t=R[i],left=12;stage.innerHTML='<div class="sh"><h2>⚡ صح أم خطأ؟</h2><span class="muted">العبارة '+n(i+1)+' من '+n(R.length)+' · النقاط <b>'+n(sc)+'</b></span></div><div class="tbar"><i id="tb"></i></div><div class="tfcard"><p>'+esc(t.s)+'</p></div><div class="tfbtn"><button class="tfb yes" data-v="1">✓ صح</button><button class="tfb nob" data-v="0">✗ خطأ</button></div><div id="tfb"></div>';
       var tb=K.$('#tb');tb.style.transition='none';tb.style.width='100%';requestAnimationFrame(function(){tb.style.transition='width 12s linear';tb.style.width='0%'});
       timer=setTimeout(function(){ans(null)},12000);
       function ans(v){clearTimeout(timer);K.$$('.tfb',stage).forEach(function(x){x.disabled=true});tb.style.transition='none';var good=v!==null&&(v==='1')===t.v;if(good){sc++;K.sfx.ok()}else K.sfx.no();
         K.$('#tfb').innerHTML='<div class="fb '+(good?'ok':'no')+'">'+(v===null?'انتهى الوقت! ':'')+(good?'صحيح! ':'')+'العبارة '+(t.v?'صحيحة':'خاطئة')+(t.w?': '+esc(t.w):'.')+' <button class="b" id="nx" style="margin-inline-start:10px">التالي ←</button></div>';K.$('#nx').onclick=function(){i++;draw()}}
       K.$$('.tfb',stage).forEach(function(b){b.onclick=function(){ans(b.dataset.v)}})}
     draw();
   }
  };
  RUN.mem();K.$('[data-a="mem"]').setAttribute('aria-pressed','true');
}

/* ================= المسابقات العلمية ================= */
function contest(K){
  var P=K.P,n=K.n,esc=K.esc,PTS=[100,200,300,400,500];
  var cols=P.lessons.map(function(L){var q=K.shuffle(L.qs).slice(0,5);return {L:L,q:q.map(function(x){return mixQ(K,{q:x.q,o:x.o,a:x.a,ex:x.ex,L:L})})}});
  var lucky=Math.floor(Math.random()*cols.length*5);
  var teams=[{n:'الفريق الأول',s:0,c:'#2F7BF6'},{n:'الفريق الثاني',s:0,c:'#F2545B'},{n:'الفريق الثالث',s:0,c:'#18A058'},{n:'الفريق الرابع',s:0,c:'#B7860B'}],tn=2,turn=0,used={};
  function setup(){
    document.body.innerHTML=bar(K,'مسابقات علمية · '+P.chapter.short)+'<main class="app">'+hero(K,'مسابقة الفرق','لوحة التحدي','يختار كل فريق في دوره مربعًا من اللوحة: كل عمود درس، ولكل مربع نقاطه، ولديكم ٣٠ ثانية للإجابة. ومربع واحد مخفي فيه «سؤال الحظ» بنقاط مضاعفة!')+
      '<section class="panel setup"><h2>إعداد الفرق</h2><div class="chips" style="margin:8px 0 12px">'+[2,3,4].map(function(k){return '<button class="chip" data-tn="'+k+'" aria-pressed="'+(k===tn)+'">'+n(k)+' فرق</button>'}).join('')+'</div><div class="tnames">'+teams.slice(0,tn).map(function(t,i){return '<label style="--tc:'+t.c+'"><span></span><input data-ti="'+i+'" value="'+esc(t.n)+'" aria-label="اسم الفريق"></label>'}).join('')+'</div><button class="b p big" id="start">ابدأ المسابقة 🏁</button></section></main>';
    wireBar(K);
    K.$$('[data-tn]').forEach(function(b){b.onclick=function(){tn=+b.dataset.tn;setup()}});
    K.$$('[data-ti]').forEach(function(i){i.oninput=function(){teams[+i.dataset.ti].n=i.value||teams[+i.dataset.ti].n}});
    K.$('#start').onclick=board;
  }
  function score(){return '<div class="teams">'+teams.slice(0,tn).map(function(t,i){return '<div class="tm'+(i===turn?' on':'')+'" style="--tc:'+t.c+'"><span>'+esc(t.n)+'</span><b class="num">'+n(t.s)+'</b>'+(i===turn?'<em>دوره الآن</em>':'')+'</div>'}).join('')+'</div>'}
  function board(){
    var left=cols.length*5-Object.keys(used).length;
    if(!left)return finish();
    document.body.innerHTML=bar(K,'مسابقات علمية · '+P.chapter.short)+'<main class="app wide">'+score()+'<div class="board" style="grid-template-columns:repeat('+cols.length+',1fr)">'+cols.map(function(c){return '<div class="bh"><small>الدرس '+n(c.L.no)+'</small>'+esc(c.L.title)+'</div>'}).join('')+
      PTS.map(function(p,r){return cols.map(function(c,ci){var k=ci*5+r;return '<button class="tile" data-k="'+k+'"'+(used[k]?' disabled':'')+'>'+(used[k]?'✓':n(p))+'</button>'}).join('')}).join('')+'</div><p class="muted" style="text-align:center">بقي '+n(left)+' سؤالًا · '+esc(teams[turn].n)+' يختار الآن</p></main>';
    wireBar(K);
    K.$$('.tile').forEach(function(b){b.onclick=function(){ask(+b.dataset.k)}});
  }
  function ask(k){
    var ci=Math.floor(k/5),r=k%5,q=cols[ci].q[r],pts=PTS[r]*(k===lucky?2:1),tm=null,left=30;
    var m=document.createElement('div');m.className='modal';
    m.innerHTML='<div class="mbox" style="--tc:'+teams[turn].c+'">'+(k===lucky?'<div class="lucky">🍀 سؤال الحظ: النقاط مضاعفة!</div>':'')+'<div class="mh"><span>'+esc(cols[ci].L.title)+' · <b>'+n(pts)+'</b> نقطة</span><span class="clock" id="clk">'+n(left)+'</span></div><p class="mq">'+esc(q.q)+'</p><div class="mo">'+q.o.map(function(o,j){return '<button data-j="'+j+'"><i>'+K.KL[j]+'</i>'+esc(o)+'</button>'}).join('')+'</div><div id="mfb"></div></div>';
    document.body.appendChild(m);
    tm=setInterval(function(){left--;var c=K.$('#clk');if(c)c.textContent=n(left);if(left<=5&&left>0)K.sfx.tick();if(left<=0){clearInterval(tm);done(-1)}},1000);
    K.$$('.mo button',m).forEach(function(b){b.onclick=function(){done(+b.dataset.j)}});
    function done(j){clearInterval(tm);K.$$('.mo button',m).forEach(function(b){b.disabled=true;var x=+b.dataset.j;if(x===q.a)b.classList.add('ok');else if(x===j)b.classList.add('no')});
      var good=j===q.a;used[k]=1;
      if(good){teams[turn].s+=pts;K.sfx.ok()}else K.sfx.no();
      var steal=!good&&tn>1;
      K.$('#mfb',m).innerHTML='<div class="fb '+(good?'ok':'no')+'">'+(good?'إجابة صحيحة! +'+n(pts)+' لـ'+esc(teams[turn].n):(j<0?'انتهى الوقت. ':'')+'الإجابة الصحيحة: '+esc(q.o[q.a]))+(q.ex?'<br><small>'+esc(q.ex)+'</small>':'')+'</div>'+
        (steal?'<div class="steal"><span>فرصة سرقة نصف النقاط لفريق آخر أجاب صحيحًا:</span>'+teams.slice(0,tn).map(function(t,i){return i===turn?'':'<button class="b" data-st="'+i+'" style="border-bottom:4px solid '+t.c+'">'+esc(t.n)+' +'+n(pts/2)+'</button>'}).join('')+'</div>':'')+'<button class="b p big" id="cont">متابعة ←</button>';
      K.$$('[data-st]',m).forEach(function(b){b.onclick=function(){teams[+b.dataset.st].s+=pts/2;K.sfx.ok();b.disabled=true;K.$$('[data-st]',m).forEach(function(x){x.disabled=true})}});
      K.$('#cont',m).onclick=function(){m.remove();turn=(turn+1)%tn;board()}}
  }
  function finish(){
    var rk=teams.slice(0,tn).slice().sort(function(a,b){return b.s-a.s});K.sfx.win();confetti();
    document.body.innerHTML=bar(K,'مسابقات علمية · '+P.chapter.short)+'<main class="app">'+hero(K,'النتيجة النهائية','منصة التتويج','انتهت أسئلة اللوحة. مبارك للفائزين!')+'<div class="podium">'+rk.map(function(t,i){return '<div class="pd p'+(i+1)+'" style="--tc:'+t.c+'"><span class="md">'+['🥇','🥈','🥉','🎖'][i]+'</span><b>'+esc(t.n)+'</b><em class="num">'+n(t.s)+' نقطة</em></div>'}).join('')+'</div><div style="text-align:center;margin-top:18px"><button class="b p big" id="re">↺ مسابقة جديدة</button></div></main>';
    wireBar(K);K.$('#re').onclick=function(){location.reload()};
  }
  setup();
}

/* ================= التقويم ================= */
function assess(K){
  var P=K.P,n=K.n,esc=K.esc,sel=P.lessons.map(function(L){return L.id}),N=10,mode='practice',name='';
  function setup(){
    document.body.innerHTML=bar(K,'تقويم وتقييم · '+P.chapter.short)+'<main class="app">'+hero(K,'تقويم وتقييم','اختبار الفصل الذكي','اختبار قصير يقيس إتقانك لدروس الفصل، ويعرض نتيجتك لكل درس مع شرح الإجابات.')+
      '<section class="panel setup"><h2>إعداد الاختبار</h2><label class="nm">اسم الطالب <input id="nm" value="'+esc(name)+'" placeholder="اكتب اسمك (اختياري)"></label>'+
      '<h3>الدروس</h3><div class="chips">'+P.lessons.map(function(L){return '<button class="chip" data-l="'+L.id+'" aria-pressed="'+(sel.indexOf(L.id)>=0)+'">'+esc(L.title)+'</button>'}).join('')+'</div>'+
      '<h3>عدد الأسئلة</h3><div class="chips">'+[10,15,20].map(function(k){return '<button class="chip" data-n="'+k+'" aria-pressed="'+(k===N)+'">'+n(k)+'</button>'}).join('')+'</div>'+
      '<h3>طريقة العرض</h3><div class="chips"><button class="chip" data-m="practice" aria-pressed="'+(mode==='practice')+'">تدريب: أعرف النتيجة بعد كل سؤال</button><button class="chip" data-m="exam" aria-pressed="'+(mode==='exam')+'">اختبار: النتيجة في النهاية</button></div>'+
      '<button class="b p big" id="go" style="margin-top:16px">ابدأ الاختبار ←</button></section></main>';
    wireBar(K);
    K.$('#nm').oninput=function(){name=this.value};
    K.$$('[data-l]').forEach(function(b){b.onclick=function(){var i=sel.indexOf(b.dataset.l);if(i>=0){if(sel.length>1)sel.splice(i,1)}else sel.push(b.dataset.l);setup()}});
    K.$$('[data-n]').forEach(function(b){b.onclick=function(){N=+b.dataset.n;setup()}});
    K.$$('[data-m]').forEach(function(b){b.onclick=function(){mode=b.dataset.m;setup()}});
    K.$('#go').onclick=function(){start(null)};
  }
  function start(pool){
    var Qs;if(pool)Qs=pool.map(function(q){return mixQ(K,q)});else{var per=[];sel.forEach(function(id){per.push(K.shuffle(allQs(K,[id])))});Qs=[];var r=0;while(Qs.length<N&&per.some(function(a){return a.length})){var a=per[r%per.length];if(a.length)Qs.push(mixQ(K,a.shift()));r++}Qs=K.shuffle(Qs)}
    var i=0,ans=[],t0=Date.now();
    function draw(){
      if(i>=Qs.length)return result(Qs,ans,Math.round((Date.now()-t0)/1000));
      var q=Qs[i];
      document.body.innerHTML=bar(K,'تقويم وتقييم · '+P.chapter.short)+'<main class="app narrow"><div class="qtop"><span>السؤال <b>'+n(i+1)+'</b> من '+n(Qs.length)+'</span><span class="lbl">'+esc(q.L.title)+'</span></div><div class="prog"><i style="width:'+(i/Qs.length*100)+'%"></i></div><section class="panel qp"><p class="mq">'+esc(q.q)+'</p><div class="mo">'+q.o.map(function(o,j){return '<button data-j="'+j+'"><i>'+K.KL[j]+'</i>'+esc(o)+'</button>'}).join('')+'</div><div id="afb"></div></section></main>';
      wireBar(K);
      K.$$('.mo button').forEach(function(b){b.onclick=function(){var j=+b.dataset.j;ans[i]=j;
        if(mode==='exam'){i++;draw();return}
        K.$$('.mo button').forEach(function(x){x.disabled=true;var k=+x.dataset.j;if(k===q.a)x.classList.add('ok');else if(k===j)x.classList.add('no')});var good=j===q.a;good?K.sfx.ok():K.sfx.no();
        K.$('#afb').innerHTML='<div class="fb '+(good?'ok':'no')+'">'+(good?'إجابة صحيحة.':'الإجابة الصحيحة: '+esc(q.o[q.a]))+(q.ex?'<br><small>'+esc(q.ex)+'</small>':'')+'</div><button class="b p big" id="nx" style="margin-top:12px">'+(i+1<Qs.length?'السؤال التالي ←':'عرض النتيجة ←')+'</button>';K.$('#nx').onclick=function(){i++;draw()}}});
    }
    draw();
  }
  function result(Qs,ans,secs){
    var ok=0,by={};Qs.forEach(function(q,i){var g=ans[i]===q.a;if(g)ok++;var k=q.L.id;by[k]=by[k]||{L:q.L,ok:0,n:0};by[k].n++;if(g)by[k].ok++});
    var pct=Math.round(ok/Qs.length*100),lvl=pct>=90?['ممتاز','متقن للدروس','#18A058']:pct>=75?['جيد جدًا','قريب من الإتقان','#2F7BF6']:pct>=50?['جيد','يحتاج إلى بعض المراجعة','#B7860B']:['يحتاج إلى دعم','راجع الدروس ثم أعد المحاولة','#D93F45'];
    if(pct>=75){K.sfx.win();confetti()}
    var wrong=Qs.filter(function(q,i){return ans[i]!==q.a});
    document.body.innerHTML=bar(K,'تقويم وتقييم · '+P.chapter.short)+'<main class="app"><section class="panel res"><div class="ring" style="--p:'+pct+';--rc:'+lvl[2]+'"><b class="num">'+n(pct)+'٪</b><small>'+n(ok)+' / '+n(Qs.length)+'</small></div><div><h2>'+(name?esc(name)+': ':'')+lvl[0]+'</h2><p class="muted">'+lvl[1]+' · الزمن '+n(Math.floor(secs/60))+' د '+n(secs%60)+' ث</p>'+
      Object.keys(by).map(function(k){var b=by[k],p=Math.round(b.ok/b.n*100);return '<div class="mast"><span>'+esc(b.L.title)+'</span><div class="mb"><i style="width:'+p+'%;background:'+(p>=75?'#18A058':p>=50?'#E8A317':'#D93F45')+'"></i></div><b class="num">'+n(p)+'٪</b></div>'}).join('')+
      '<div class="row" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">'+(wrong.length?'<button class="b c" id="rw">↺ أعد الأسئلة الخاطئة ('+n(wrong.length)+')</button>':'')+'<button class="b" id="nw">اختبار جديد</button><button class="b" id="pp">🖨 طباعة النتيجة</button></div></div></section>'+
      (wrong.length?'<section class="panel" style="margin-top:16px"><h2>راجع أخطاءك</h2>'+wrong.map(function(q){var j=ans[Qs.indexOf(q)];return '<div class="rv"><p>'+esc(q.q)+'</p><div><span class="no">إجابتك: '+(j==null?'—':esc(q.o[j]))+'</span><span class="ok">الصحيح: '+esc(q.o[q.a])+'</span></div>'+(q.ex?'<small>'+esc(q.ex)+'</small>':'')+'</div>'}).join('')+'</section>':'')+'</main>';
    wireBar(K);
    if(K.$('#rw'))K.$('#rw').onclick=function(){start(wrong.map(function(q){return {q:q.q,o:q.o,a:q.a,ex:q.ex,L:q.L}}))};
    K.$('#nw').onclick=setup;K.$('#pp').onclick=function(){print()};
  }
  setup();
}

/* ================= العرض المرئي ================= */
function video(K){
  var P=K.P,n=K.n,esc=K.esc,S=[],C=P.chapter;
  S.push({k:'cover',dur:6,h:'<div class="sv cover"><span class="kk">عرض مرئي</span><h1>'+esc(C.title.split(':')[1]||C.title)+'</h1><p>'+esc(C.short)+' · '+esc(C.grade||'علوم الأول المتوسط')+'</p><div class="lsn">'+P.lessons.map(function(L){return '<span>'+n(L.no)+'. '+esc(L.title)+'</span>'}).join('')+'</div></div>',say:C.title});
  P.lessons.forEach(function(L){
    S.push({k:'title',dur:6,img:L.cover,h:'<div class="sv ttl"><span class="kk">الدرس '+n(L.no)+'</span><h1>'+esc(L.title)+'</h1><p>'+esc(L.summary)+'</p></div>',say:'الدرس '+L.no+'. '+L.title+'. '+L.summary});
    S.push({k:'goals',dur:8,h:'<div class="sv goals"><h2>🎯 ماذا سنتعلم؟</h2><ol>'+L.goals.map(function(g,i){return '<li style="--d:'+(i*.45+.3)+'s">'+esc(g)+'</li>'}).join('')+'</ol></div>',say:'أهداف الدرس: '+L.goals.join('، ')});
    var cs=L.concepts;for(var i=0;i<cs.length;i+=3){var grp=cs.slice(i,i+3);S.push({k:'con',dur:7+grp.length*2,h:'<div class="sv cons"><h2>💡 '+esc(L.title)+'</h2><div class="cg">'+grp.map(function(c,j){var f=/[=÷×]/.test(c.t);return '<div class="cc'+(f?' f':'')+'" style="--d:'+(j*.7+.3)+'s"><b>'+esc(c.n)+'</b><span>'+esc(c.t)+'</span></div>'}).join('')+'</div></div>',say:grp.map(function(c){return c.n+': '+c.t}).join('. ')})}
    var q=L.qs[0]?mixQ(K,L.qs[0]):null;if(q){S.push({k:'quiz',dur:12,h:'<div class="sv quiz"><h2>🤔 هل تتذكر؟</h2><p class="qq">'+esc(q.q)+'</p><div class="qo">'+q.o.map(function(o,j){return '<span class="'+(j===q.a?'r':'')+'">'+K.KL[j]+') '+esc(o)+'</span>'}).join('')+'</div></div>',say:'هل تتذكر؟ '+q.q+' '+q.o.map(function(o,j){return K.KL[j]+': '+o}).join('. ')+'. الإجابة الصحيحة: '+q.o[q.a],reveal:1})}
  });
  S.push({k:'end',dur:6,h:'<div class="sv cover"><span class="kk">انتهى العرض</span><h1>أحسنت المتابعة!</h1><p>راجع ورقة العمل وحل أسئلة التقويم لتثبيت ما تعلمته.</p></div>',say:'انتهى العرض. أحسنت المتابعة.'});
  var i=0,play=true,tm=null,spd=1,voice=false,el;
  document.body.innerHTML='<div class="vp" id="vp"><div class="vbg" id="vbg"></div><div class="segs" id="segs">'+S.map(function(){return '<span><i></i></span>'}).join('')+'</div><div class="vs" id="vs"></div><div class="vc"><button class="b" id="pv">→ السابق</button><button class="b p" id="pl">⏸ إيقاف</button><button class="b" id="nx">التالي ←</button><button class="b" id="sp">السرعة ١×</button><button class="b" id="vo" aria-pressed="false">🗣 قراءة صوتية</button><select class="b vsel" id="vsel" hidden aria-label="اختيار الصوت"></select><a class="b" href="voice-test.html">🔧 اختبار الصوت</a><button class="b" id="fs2">⛶</button><span class="cnt" id="cn"></span></div></div>';
  var segs=K.$$('#segs span i');
  var hasTTS='speechSynthesis' in window;if(!hasTTS)K.$('#vo').hidden=true;
  /* ---- القراءة الصوتية ---- */
  var VO=null,tok=0,warned=false;
  function pickVoice(){try{var vs=speechSynthesis.getVoices()||[],ar=vs.filter(function(v){return /^ar/i.test(v.lang)});var keep=VO&&ar.filter(function(v){return v.name===VO.name})[0];var pref=null;try{pref=localStorage.getItem('kit-voice')}catch(e){}var pv=pref&&ar.filter(function(v){return v.name===pref})[0];
    VO=pv||keep||ar.filter(function(v){return v.localService&&/SA/i.test(v.lang)})[0]||ar.filter(function(v){return v.localService})[0]||ar.filter(function(v){return /SA/i.test(v.lang)})[0]||ar[0]||null;
    var sel=K.$('#vsel');if(sel){sel.innerHTML=ar.length?ar.map(function(v){return '<option value="'+esc(v.name)+'"'+(VO&&v.name===VO.name?' selected':'')+'>'+esc(v.name)+' ('+esc(v.lang)+')'+(v.localService?'':' · إنترنت')+'</option>'}).join(''):'<option>لا يوجد صوت عربي</option>';sel.hidden=!voice}}catch(e){}}
  if(hasTTS){pickVoice();try{speechSynthesis.addEventListener('voiceschanged',pickVoice)}catch(e){speechSynthesis.onvoiceschanged=pickVoice}}
  function chunks(t){var out=[],buf='';String(t).split(/([.،:؛!؟?\n])/).forEach(function(x){buf+=x;if(/[.،:؛!؟?\n]/.test(x)&&buf.trim().length>40){out.push(buf.trim());buf=''}});if(buf.trim())out.push(buf.trim());
    var r=[];out.forEach(function(c){while(c.length>200){var k=c.lastIndexOf(' ',200);if(k<60)k=200;r.push(c.slice(0,k));c=c.slice(k)}if(c.trim())r.push(c)});return r}
  function warn(){if(warned)return;warned=true;var ar=VO||(speechSynthesis.getVoices()||[]).some(function(v){return /^ar/i.test(v.lang)});
    var tt=document.createElement('div');tt.className='toast';tt.style.cssText='bottom:90px;max-width:620px;line-height:1.7';tt.textContent=(ar?'لم يصدر صوت. ارفع مستوى الصوت في الجهاز، أو افتح العرض من متصفح Chrome أو Safari.':'لا يوجد صوت عربي مثبّت على هذا الجهاز. ثبّته من إعدادات الجهاز (تحويل النص إلى كلام)، أو افتح العرض من متصفح Chrome أو Safari.');document.body.appendChild(tt);setTimeout(function(){tt.remove()},9000)}
  function say(t,done,now){if(!voice||!hasTTS){done&&done(false);return}
    var my=++tok,parts=chunks(t),k=0,started=false,busy0=false;
    try{busy0=speechSynthesis.speaking||speechSynthesis.pending;if(busy0)speechSynthesis.cancel()}catch(e){}
    function next(){if(my!==tok)return;if(k>=parts.length){done&&done(true);return}
      var u=new SpeechSynthesisUtterance(parts[k++]);u.lang=VO?VO.lang:'ar-SA';if(VO)u.voice=VO;u.rate=Math.min(1.6,0.95*spd);u.pitch=1;
      u.onstart=function(){started=true};u.onend=function(){setTimeout(next,120)};u.onerror=function(e){if(my!==tok)return;if(e&&(e.error==='interrupted'||e.error==='canceled'))return;warn();done&&done(false)};
      u.volume=1;try{if(speechSynthesis.paused)speechSynthesis.resume();speechSynthesis.speak(u)}catch(e){warn();done&&done(false)}}
    if(now&&!busy0)next();else setTimeout(next,busy0?250:30);
    setTimeout(function(){if(my===tok&&!started&&voice){warn();done&&done(false);done=null}},3500)}
  function show(now){var s=S[i];clearTimeout(tm);K.$('#vs').innerHTML=s.h;K.$('#vs').firstChild.classList.add('in');
    K.$('#vbg').style.backgroundImage=s.img?'url('+s.img+')':'';K.$('#vbg').className='vbg'+(s.img?' on':'');
    segs.forEach(function(g,j){g.style.transition='none';g.style.width=j<i?'100%':'0%'});
    K.$('#cn').textContent=n(i+1)+' / '+n(S.length);
    var cur=i;if(voice&&hasTTS)say(s.say,function(ok){if(cur!==i||!ok)return;if(s.reveal){var r=K.$('.qo .r');if(r)r.classList.add('show')}if(play){clearTimeout(tm);tm=setTimeout(advance,s.reveal?2500:900)}},now);
    if(s.reveal&&!voice)setTimeout(function(){var r=K.$('.qo .r');if(r)r.classList.add('show')},s.dur*600/spd);
    if(play)run()}
  function advance(){if(i<S.length-1){i++;show()}else{play=false;K.$('#pl').textContent='▶ تشغيل'}}
  function run(){var s=S[i],g=segs[i],d=s.dur/spd;if(voice&&hasTTS&&!warned)d=Math.max(d,String(s.say).length*0.085/spd+2);requestAnimationFrame(function(){g.style.transition='width '+d+'s linear';g.style.width='100%'});tm=setTimeout(advance,(voice&&hasTTS&&!warned?d*1.6:d)*1000)}
  K.$('#pl').onclick=function(){play=!play;this.textContent=play?'⏸ إيقاف':'▶ تشغيل';if(play){if(i>=S.length-1)i=0;show()}else{clearTimeout(tm);var g=segs[i];var w=getComputedStyle(g).width;g.style.transition='none';g.style.width=w;if(hasTTS){tok++;speechSynthesis.cancel()}}};
  K.$('#nx').onclick=function(){if(i<S.length-1){i++;show()}};
  K.$('#pv').onclick=function(){if(i>0){i--;show()}};
  K.$('#sp').onclick=function(){spd=spd===1?1.5:spd===1.5?0.75:1;this.textContent='السرعة '+(spd===1?'١':spd===1.5?'١٫٥':'٠٫٧٥')+'×';show()};
  K.$('#vo').onclick=function(){voice=!voice;this.setAttribute('aria-pressed',voice);this.textContent=voice?'🗣 القراءة تعمل':'🗣 قراءة صوتية';
    if(!voice){tok++;try{speechSynthesis.cancel()}catch(e){}var vs0=K.$('#vsel');if(vs0)vs0.hidden=true;show();return}
    /* النطق يبدأ مباشرة داخل لمسة المستخدم (ضروري في iPad وبعض أجهزة أندرويد) */
    pickVoice();warned=false;show(true)};
  var vsel=K.$('#vsel');if(vsel)vsel.onchange=function(){var v=(speechSynthesis.getVoices()||[]).filter(function(x){return x.name===vsel.value})[0];if(v){VO=v;try{localStorage.setItem('kit-voice',v.name)}catch(e){}tok++;try{speechSynthesis.cancel()}catch(e){}show(true)}};
  K.$('#fs2').onclick=fs;
  document.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')K.$('#nx').click();else if(e.key==='ArrowRight')K.$('#pv').click();else if(e.key===' '){e.preventDefault();K.$('#pl').click()}});
  show();
}

/* ================= حقيبة الفصل (مصادر إضافية) ================= */
function extra(K){
  var P=K.P,n=K.n,esc=K.esc,T=allTerms(K),KEY='kit-goals-'+P.chapter.id,st={};try{st=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
  var F=[];P.lessons.forEach(function(L){L.concepts.forEach(function(c){if(/[=÷×]/.test(c.t))F.push({c:c,L:L})})});
  document.body.innerHTML=bar(K,'مصادر إضافية · '+P.chapter.short)+'<main class="app">'+hero(K,'مصادر إضافية','حقيبة الفصل','مسرد المصطلحات، والقوانين، وقائمة الأهداف للمراجعة، وروابط دروس الفصل وتجاربه.')+
    '<div class="tabs" role="tablist"><button role="tab" data-t="g" aria-selected="true">📖 مسرد المصطلحات</button>'+(F.length?'<button role="tab" data-t="f" aria-selected="false">🧮 بطاقة القوانين</button>':'')+'<button role="tab" data-t="c" aria-selected="false">✅ قائمة المراجعة</button><button role="tab" data-t="l" aria-selected="false">🔗 روابط الفصل</button></div><section class="panel" id="tp"></section></main>';
  wireBar(K);
  var tp=K.$('#tp');
  var V={
    g:function(){tp.innerHTML='<div class="sh"><h2>مسرد مصطلحات '+esc(P.chapter.short)+'</h2><label class="search2"><input id="gq" type="search" placeholder="ابحث عن مصطلح…" aria-label="بحث"></label><button class="b" id="gp">🖨 طباعة المسرد</button></div><div class="chips" id="gl"><button class="chip" data-gl="" aria-pressed="true">كل الدروس</button>'+P.lessons.map(function(L){return '<button class="chip" data-gl="'+L.id+'" aria-pressed="false">'+esc(L.title)+'</button>'}).join('')+'</div><div class="gloss" id="gs"></div>';
      var f='',q='';function draw(){var r=T.filter(function(t){return (!f||t.L.id===f)&&(!q||(t.t+t.d).indexOf(q)>=0)});K.$('#gs').innerHTML=r.length?r.map(function(t){return '<article class="gi"><b>'+esc(t.t)+'</b><p>'+esc(t.d)+'</p><span class="lbl">'+esc(t.L.title)+'</span></article>'}).join(''):'<p class="muted">لا توجد نتائج.</p>'}
      K.$('#gq').oninput=function(){q=this.value.trim();draw()};K.$$('[data-gl]').forEach(function(b){b.onclick=function(){f=b.dataset.gl;K.$$('[data-gl]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});draw()}});K.$('#gp').onclick=function(){print()};draw()},
    f:function(){tp.innerHTML='<div class="sh"><h2>بطاقة القوانين</h2><button class="b" id="fp">🖨 طباعة</button></div><div class="fcards">'+F.map(function(x){return '<article class="fcard"><span class="lbl">'+esc(x.L.title)+'</span><b>'+esc(x.c.n)+'</b><p>'+esc(x.c.t)+'</p></article>'}).join('')+'</div>';K.$('#fp').onclick=function(){print()}},
    c:function(){var tot=0,dn=0;P.lessons.forEach(function(L){L.goals.forEach(function(_,i){tot++;if(st[L.id+i])dn++})});
      tp.innerHTML='<div class="sh"><h2>قائمة المراجعة قبل الاختبار</h2><span class="muted">أنجزت <b>'+n(dn)+'</b> من '+n(tot)+'</span></div><div class="prog"><i style="width:'+(tot?dn/tot*100:0)+'%"></i></div>'+P.lessons.map(function(L){return '<h3 class="lh">الدرس '+n(L.no)+': '+esc(L.title)+'</h3><ul class="chk">'+L.goals.map(function(g,i){var k=L.id+i;return '<li><label><input type="checkbox" data-k="'+k+'"'+(st[k]?' checked':'')+'><span>'+esc(g.replace(/\.$/,''))+'</span></label></li>'}).join('')+'</ul>'}).join('')+'<p class="muted" style="font-size:13px">تُحفظ اختياراتك على هذا الجهاز فقط.</p>';
      K.$$('[data-k]',tp).forEach(function(c){c.onchange=function(){st[c.dataset.k]=c.checked;try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}V.c()}})},
    l:function(){tp.innerHTML='<div class="sh"><h2>روابط الفصل</h2></div><div class="links">'+P.lessons.map(function(L){return '<a class="lk" href="'+esc(L.file)+'"><img src="'+esc(L.cover)+'" alt=""><span><small>الدرس '+n(L.no)+' · درس تفاعلي</small><b>'+esc(L.title)+'</b></span></a><a class="lk sm" href="'+esc(L.sheet)+'"><span class="ic">📝</span><span><small>ورقة عمل</small><b>'+esc(L.title)+'</b></span></a>'}).join('')+(P.labs||[]).map(function(x){return '<a class="lk" href="'+esc(x.file)+'"><img src="'+esc(x.cover)+'" alt=""><span><small>المختبر الافتراضي</small><b>'+esc(x.title)+'</b></span></a>'}).join('')+'</div>'}
  };
  K.$$('[data-t]').forEach(function(b){b.onclick=function(){K.$$('[data-t]').forEach(function(x){x.setAttribute('aria-selected',x===b)});V[b.dataset.t]()}});
  V.g();
}
return {activity:activity,contest:contest,assess:assess,video:video,extra:extra};
})();
