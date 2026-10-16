/* مسابقات الدروس: لكل درس نمط مختلف */
(function(){
"use strict";
var GAMES={};
function G(K){
  var P=K.P,n=K.n,esc=K.esc,L=P.lesson;
  var COLORS=['#2F7BF6','#F2545B','#18A058','#B7860B'],DEF=['الفريق الأول','الفريق الثاني','الفريق الثالث','الفريق الرابع'];
  var pool=[];function nextQ(){if(!pool.length)pool=K.shuffle(L.qs);var q=pool.shift();var idx=K.shuffle(q.o.map(function(_,i){return i}));return {q:q.q,o:idx.map(function(i){return q.o[i]}),a:idx.indexOf(q.a),ex:q.ex}}
  function confetti(){var c=document.createElement('canvas');c.className='confetti';document.body.appendChild(c);var W=c.width=innerWidth,H=c.height=innerHeight,x=c.getContext('2d'),Pp=[];for(var i=0;i<150;i++)Pp.push({x:Math.random()*W,y:-20-Math.random()*H*.4,v:2+Math.random()*4,r:4+Math.random()*5,c:['#FFC53D','#2F7BF6','#F2545B','#18A058','#8E44AD'][i%5],w:Math.random()*6});var t0=performance.now();(function f(t){x.clearRect(0,0,W,H);Pp.forEach(function(p){p.y+=p.v;p.x+=Math.sin(t/300+p.w)*1.6;x.fillStyle=p.c;x.fillRect(p.x,p.y,p.r,p.r*1.6)});if(t-t0<2600)requestAnimationFrame(f);else c.remove()})(t0)}
  function fs(){var d=document.documentElement;if(document.fullscreenElement)document.exitFullscreen().catch(function(){});else if(d.requestFullscreen)d.requestFullscreen().catch(function(){})}
  function shell(inner){document.body.innerHTML='<div class="bar"><span class="t">'+esc(P.game.title)+' · '+esc(L.title)+'</span><button class="b" id="snd">'+(K.SND.on?'🔊':'🔇')+' الصوت</button><button class="b" id="fsb">⛶ ملء الشاشة</button></div><main class="app wide gm g-'+P.game.id+'">'+inner+'</main>';
    K.$('#snd').onclick=function(){K.SND.on=!K.SND.on;this.textContent=(K.SND.on?'🔊':'🔇')+' الصوت'};K.$('#fsb').onclick=fs}
  function hero(){var g=P.game;return '<header class="hero gh"><span class="gi" aria-hidden="true">'+g.icon+'</span><div><span class="kick">مسابقة الدرس '+n(L.no)+' · '+esc(L.title)+'</span><h1>'+esc(g.title)+'</h1><p>'+esc(g.sub)+'</p></div></header>'}
  /* إعداد الفرق */
  function setup(o,start){
    var tn=o.fixed||2,teams=DEF.map(function(d,i){return {n:d,c:COLORS[i],s:0}}),name='';
    function draw(){
      shell(hero()+'<section class="panel setup"><div class="rules"><h2>طريقة اللعب</h2><ol>'+o.rules.map(function(r){return '<li>'+esc(r)+'</li>'}).join('')+'</ol></div><div class="cfg">'+
        (o.single?'<h2>المتسابق</h2><label class="nm"><input id="pn" value="'+esc(name)+'" placeholder="اسم الطالب أو المجموعة"></label>':
        '<h2>الفرق</h2>'+(o.fixed?'<p class="muted">هذه المسابقة لفريقين.</p>':'<div class="chips" style="margin:6px 0 12px">'+[2,3,4].map(function(k){return '<button class="chip" data-tn="'+k+'" aria-pressed="'+(k===tn)+'">'+n(k)+' فرق</button>'}).join('')+'</div>')+
        '<div class="tnames">'+teams.slice(0,tn).map(function(t,i){return '<label style="--tc:'+t.c+'"><span></span><input data-ti="'+i+'" value="'+esc(t.n)+'" aria-label="اسم الفريق"></label>'}).join('')+'</div>')+
        '<button class="b p big" id="start">ابدأ '+esc(o.go||'المسابقة')+' '+P.game.icon+'</button></div></section>');
      K.$$('[data-tn]').forEach(function(b){b.onclick=function(){tn=+b.dataset.tn;draw()}});
      K.$$('[data-ti]').forEach(function(i){i.oninput=function(){teams[+i.dataset.ti].n=i.value.trim()||DEF[+i.dataset.ti]}});
      var pn=K.$('#pn');if(pn)pn.oninput=function(){name=pn.value.trim()};
      K.$('#start').onclick=function(){start(o.single?[{n:name||'المتسابق',c:COLORS[0],s:0}]:teams.slice(0,tn))};
    }
    draw();
  }
  /* نافذة السؤال */
  function ask(q,o,cb){
    var m=document.createElement('div');m.className='modal';var left=o.secs||30,tm;
    m.innerHTML='<div class="mbox" style="--tc:'+(o.color||'#2F7BF6')+'">'+(o.banner?'<div class="lucky">'+o.banner+'</div>':'')+'<div class="mh"><span>'+(o.who?'<b style="color:'+o.color+'">'+esc(o.who)+'</b> · ':'')+esc(o.label||'')+'</span><span class="clock" id="clk">'+n(left)+'</span></div><p class="mq">'+esc(q.q)+'</p><div class="mo">'+q.o.map(function(x,j){return '<button data-j="'+j+'"><i>'+K.KL[j]+'</i>'+esc(x)+'</button>'}).join('')+'</div><div id="mfb"></div></div>';
    document.body.appendChild(m);
    tm=setInterval(function(){left--;var c=K.$('#clk',m);if(c)c.textContent=n(Math.max(0,left));if(left<=5&&left>0)K.sfx.tick();if(left<=0){clearInterval(tm);done(-1)}},1000);
    K.$$('.mo button',m).forEach(function(b){b.onclick=function(){done(+b.dataset.j)}});
    function done(j){clearInterval(tm);var good=j===q.a;K.$$('.mo button',m).forEach(function(b){b.disabled=true;var x=+b.dataset.j;if(x===q.a)b.classList.add('ok');else if(x===j)b.classList.add('no')});good?K.sfx.ok():K.sfx.no();
      K.$('#mfb',m).innerHTML='<div class="fb '+(good?'ok':'no')+'">'+(good?(o.okMsg||'إجابة صحيحة!'):(j<0?'انتهى الوقت. ':'')+'الإجابة الصحيحة: '+esc(q.o[q.a]))+(q.ex?'<br><small>'+esc(q.ex)+'</small>':'')+'</div><button class="b p big" id="cont">متابعة ←</button>';
      K.$('#cont',m).onclick=function(){m.remove();cb(good,j)};K.$('#cont',m).focus()}
  }
  function strip(teams,turn,fmt){return '<div class="teams">'+teams.map(function(t,i){return '<div class="tm'+(i===turn?' on':'')+'" style="--tc:'+t.c+'"><span>'+esc(t.n)+'</span><b class="num">'+(fmt?fmt(t):n(t.s))+'</b>'+(i===turn?'<em>دوره الآن</em>':'')+'</div>'}).join('')+'</div>'}
  function podium(teams,unit,note){
    var rk=teams.slice().sort(function(a,b){return b.s-a.s});K.sfx.win();confetti();
    shell(hero()+(note?'<p class="note">'+note+'</p>':'')+'<div class="podium">'+rk.map(function(t,i){return '<div class="pd p'+(i+1)+'" style="--tc:'+t.c+'"><span class="md">'+['🥇','🥈','🥉','🎖'][i]+'</span><b>'+esc(t.n)+'</b><em class="num">'+n(t.s)+' '+unit+'</em></div>'}).join('')+'</div><div style="text-align:center;margin-top:18px"><button class="b p big" id="re">↺ جولة جديدة</button></div>');
    K.$('#re').onclick=function(){location.reload()}}
  return {K:K,P:P,n:n,esc:esc,L:L,nextQ:nextQ,setup:setup,ask:ask,shell:shell,hero:hero,strip:strip,podium:podium,confetti:confetti};
}

/* ١) تسلّق القمة */
GAMES.climb=function(g){var N=8;
  g.setup({rules:['يجيب كل فريق في دوره عن سؤال من أسئلة الدرس خلال ٣٠ ثانية.','الإجابة الصحيحة ترفع متسلّق الفريق درجة على طريقه نحو القمة.','ثلاث إجابات صحيحة متتالية تمنح الفريق «حبل الإنقاذ»: صعود درجتين!','أول فريق يصل إلى القمة ('+g.n(N)+' درجات) يغرس علمه ويفوز.'],go:'التسلق'},function(T){
    var turn=0,streak=T.map(function(){return 0});T.forEach(function(t){t.s=0});
    function pos(i,f){var base=[18,82,32,68][i%4],x=base+(50-base)*f+Math.sin(f*Math.PI*3)*4;return [x,88-74*f]}
    function draw(){g.shell(g.strip(T,turn,function(t){return g.n(t.s)+' / '+g.n(N)})+'<div class="mtn"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="mg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#8aa3c7"/><stop offset="1" stop-color="#3d5a80"/></linearGradient></defs><polygon points="0,100 22,58 34,66 50,10 64,48 76,40 100,100" fill="url(#mg)"/><polygon points="44,22 50,10 56,24 52,21 49,26 47,21" fill="#fff"/>'+
      T.map(function(t,i){var d='';for(var k=0;k<=N;k++){var p=pos(i,k/N);d+=(k?' L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)}return '<path d="'+d+'" fill="none" stroke="'+t.c+'" stroke-width=".6" stroke-dasharray="1.4 1.2" opacity=".85" vector-effect="non-scaling-stroke"/>'}).join('')+'</svg><span class="flag">🚩</span>'+
      T.map(function(t,i){var p=pos(i,t.s/N);return '<span class="climber" style="--tc:'+t.c+';right:'+(100-p[0])+'%;top:'+p[1]+'%"><b>'+g.n(i+1)+'</b></span>'}).join('')+'</div><div class="gact"><button class="b p big" id="go">سؤال لـ '+g.esc(T[turn].n)+' ←</button></div>');
      g.K.$('#go').onclick=function(){g.ask(g.nextQ(),{who:T[turn].n,color:T[turn].c,label:'تسلّق القمة'},function(ok){
        if(ok){streak[turn]++;var up=streak[turn]===3?2:1;if(up===2){streak[turn]=0;g.K.toast('حبل الإنقاذ! '+T[turn].n+' يصعد درجتين')}T[turn].s=Math.min(N,T[turn].s+up)}else streak[turn]=0;
        if(T[turn].s>=N){draw();setTimeout(function(){g.podium(T,'درجات','🚩 وصل '+g.esc(T[turn].n)+' إلى القمة أولًا!')},1100);return}
        turn=(turn+1)%T.length;draw()})}}
    draw()})};

/* ٢) برج النماذج */
GAMES.tower=function(g){var N=8;
  g.setup({rules:['يبني كل فريق برجه بالإجابة عن أسئلة الدرس.','كل إجابة صحيحة تضيف طابقًا مكتوبًا عليه الإجابة.','كل رابع سؤال «سؤال ذهبي» يضيف طابقين.','الإجابة الخاطئة تهزّ البرج، ويسقط طابقه الأعلى!','أول برج يصل إلى '+g.n(N)+' طوابق يفوز.'],go:'البناء'},function(T){
    var turn=0,qn=0,B=T.map(function(){return []});T.forEach(function(t){t.s=0});
    function draw(shake){g.shell(g.strip(T,turn,function(t){return g.n(t.s)+' طوابق'})+'<div class="towers" style="grid-template-columns:repeat('+T.length+',1fr)">'+T.map(function(t,i){return '<div class="tw'+(shake===i?' shake':'')+'" style="--tc:'+t.c+'"><div class="goal">الهدف '+g.n(N)+'</div><div class="stack">'+B[i].map(function(b,k){return '<span class="blk'+(k===B[i].length-1?' new':'')+'">'+g.esc(b)+'</span>'}).join('')+'</div><div class="base">'+g.esc(t.n)+'</div></div>'}).join('')+'</div><div class="gact"><button class="b p big" id="go">سؤال لـ '+g.esc(T[turn].n)+' ←</button></div>')
      g.K.$('#go').onclick=function(){qn++;var gold=qn%4===0;var q=g.nextQ();g.ask(q,{who:T[turn].n,color:T[turn].c,label:'برج النماذج',banner:gold?'⭐ سؤال ذهبي: طابقان!':''},function(ok){var sh=-1;
        if(ok){var lab=q.o[q.a];if(lab.length>26)lab=lab.slice(0,24)+'…';B[turn].push(lab);if(gold&&B[turn].length<N)B[turn].push('⭐ '+lab)}else if(B[turn].length){B[turn].pop();sh=turn}else sh=turn;
        T[turn].s=B[turn].length;
        if(T[turn].s>=N){draw();setTimeout(function(){g.podium(T,'طوابق','🏗 اكتمل برج '+g.esc(T[turn].n)+'!')},1100);return}
        var w=turn;turn=(turn+1)%T.length;draw(sh===w?w:-1)})}}
    draw(-1)})};

/* ٣) مزاد الأدلة */
GAMES.auction=function(g){var R=6;
  g.setup({rules:['يبدأ كل فريق برصيد ١٠٠٠ نقطة.','يظهر نص السؤال وحده أولًا، فيراهن كل فريق بجزء من رصيده بحسب ثقته بمعرفة الإجابة.','تظهر الخيارات، ويكتب كل فريق إجابته على ورقة خلال ٢٠ ثانية.','يكشف المعلم الإجابة ويحدد الفرق المصيبة: من أصاب ربح رهانه، ومن أخطأ خسره.','الفائز صاحب أكبر رصيد بعد '+g.n(R)+' جولات. فكّر بالأدلة قبل أن تراهن!'],go:'المزاد'},function(T){
    var r=0;T.forEach(function(t){t.s=1000;t.b=0;t.ok=null});
    function round(){if(r>=R)return g.podium(T,'نقطة','انتهى المزاد! الرهان الذكي يعتمد على الدليل لا على التخمين.');
      var q=g.nextQ();r++;T.forEach(function(t){t.b=Math.min(100,t.s);t.ok=null});
      function bids(){g.shell(g.strip(T,-1,function(t){return g.n(t.s)})+'<section class="panel auc"><div class="rd">الجولة '+g.n(r)+' من '+g.n(R)+'</div><p class="mq">'+g.esc(q.q)+'</p><h3>كم يراهن كل فريق؟</h3><div class="bids">'+T.map(function(t,i){return '<div class="bidr" style="--tc:'+t.c+'"><b>'+g.esc(t.n)+'</b><div class="chips">'+[100,200,300,500].map(function(v){return '<button class="chip" data-bi="'+i+'" data-v="'+v+'" aria-pressed="'+(t.b===v)+'"'+(v>t.s?' disabled':'')+'>'+g.n(v)+'</button>'}).join('')+'<button class="chip" data-bi="'+i+'" data-v="'+t.s+'" aria-pressed="'+(t.b===t.s&&t.s>500)+'"'+(t.s<=500?' disabled':'')+'>كل الرصيد</button></div></div>'}).join('')+'</div><div class="gact"><button class="b p big" id="rev">اكشف الخيارات ←</button></div></section>');
        g.K.$$('[data-bi]').forEach(function(b){b.onclick=function(){T[+b.dataset.bi].b=+b.dataset.v;g.K.sfx.tick();bids()}});g.K.$('#rev').onclick=opts}
      function opts(){var left=20;g.shell(g.strip(T,-1,function(t){return g.n(t.s)+' <small>رهان '+g.n(t.b)+'</small>'})+'<section class="panel auc"><div class="rd">الجولة '+g.n(r)+' · اكتبوا إجاباتكم <span class="clock sm" id="clk">'+g.n(left)+'</span></div><p class="mq">'+g.esc(q.q)+'</p><div class="mo static">'+q.o.map(function(x,j){return '<div data-j="'+j+'"><i>'+g.K.KL[j]+'</i>'+g.esc(x)+'</div>'}).join('')+'</div><div class="gact"><button class="b p big" id="ans">اكشف الإجابة ←</button></div></section>');
        var tm=setInterval(function(){left--;var c=g.K.$('#clk');if(c)c.textContent=g.n(Math.max(0,left));if(left<=5&&left>0)g.K.sfx.tick();if(left<=0)clearInterval(tm)},1000);
        g.K.$('#ans').onclick=function(){clearInterval(tm);mark()}}
      function mark(){g.shell(g.strip(T,-1,function(t){return g.n(t.s)+' <small>رهان '+g.n(t.b)+'</small>'})+'<section class="panel auc"><p class="mq">'+g.esc(q.q)+'</p><div class="mo static">'+q.o.map(function(x,j){return '<div class="'+(j===q.a?'ok':'')+'"><i>'+g.K.KL[j]+'</i>'+g.esc(x)+'</div>'}).join('')+'</div>'+(q.ex?'<p class="muted">'+g.esc(q.ex)+'</p>':'')+'<h3>من أصاب؟</h3><div class="bids">'+T.map(function(t,i){return '<div class="bidr" style="--tc:'+t.c+'"><b>'+g.esc(t.n)+'</b><div class="chips"><button class="chip okc" data-mi="'+i+'" data-v="1" aria-pressed="'+(t.ok===true)+'">✓ أصاب</button><button class="chip noc" data-mi="'+i+'" data-v="0" aria-pressed="'+(t.ok===false)+'">✗ أخطأ</button></div></div>'}).join('')+'</div><div class="gact"><button class="b p big" id="ap"'+(T.some(function(t){return t.ok===null})?' disabled':'')+'>احسب النقاط ←</button></div></section>');
        g.K.$$('[data-mi]').forEach(function(b){b.onclick=function(){T[+b.dataset.mi].ok=b.dataset.v==='1';mark()}});
        g.K.$('#ap').onclick=function(){var any=false;T.forEach(function(t){t.s=Math.max(0,t.s+(t.ok?t.b:-t.b));if(t.ok)any=true});any?g.K.sfx.ok():g.K.sfx.no();round()}}
      bids()}
    round()})};

/* ٤) عجلة الحظ */
GAMES.wheel=function(g){var SEG=[100,300,200,500,100,400,'×2',200],R=4,rot=0;
  g.setup({rules:['يدير الفريق في دوره العجلة لتحديد قيمة السؤال.','إن أجاب صحيحًا أضيفت قيمة السؤال إلى رصيده.','«×٢» يعني سؤالًا مضاعفًا بقيمة ٦٠٠ نقطة!','لكل فريق '+g.n(R)+' دورات، والفائز صاحب أعلى رصيد.'],go:'الدوران'},function(T){
    var turn=0,spins=0,busy=false;T.forEach(function(t){t.s=0});
    function draw(){var cols=['#2F7BF6','#FFC53D','#F2545B','#18A058','#8E44AD','#E2662B','#0F2A6B','#0F9D78'],a=360/SEG.length,grad=SEG.map(function(_,i){return cols[i]+' '+(i*a)+'deg '+((i+1)*a)+'deg'}).join(',');
      g.shell(g.strip(T,turn)+'<div class="whl"><div class="ptr">▼</div><div class="wheel" id="wh" style="background:conic-gradient('+grad+');transform:rotate('+rot+'deg)">'+SEG.map(function(v,i){return '<span style="transform:rotate('+(i*a+a/2)+'deg)"><b>'+(typeof v==='number'?g.n(v):'×٢')+'</b></span>'}).join('')+'<i></i></div><div class="wside"><p class="muted">الدورة '+g.n(Math.floor(spins/T.length)+1)+' من '+g.n(R)+'</p><button class="b p big" id="sp">🎡 أدر العجلة: '+g.esc(T[turn].n)+'</button></div></div>');
      g.K.$('#sp').onclick=function(){if(busy)return;busy=true;var idx=Math.floor(Math.random()*SEG.length);var target=360-(idx*a+a/2);rot=rot+1800+((target-rot%360)+360)%360;var wh=g.K.$('#wh');wh.style.transition='transform 3.6s cubic-bezier(.17,.67,.12,1)';wh.style.transform='rotate('+rot+'deg)';
        var tk=setInterval(function(){g.K.sfx.tick()},180);setTimeout(function(){clearInterval(tk);var v=SEG[idx],pts=v==='×2'?600:v;g.ask(g.nextQ(),{who:T[turn].n,color:T[turn].c,label:'سؤال بقيمة '+g.n(pts),banner:v==='×2'?'✨ سؤال مضاعف: ٦٠٠ نقطة!':'',okMsg:'إجابة صحيحة! +'+g.n(pts)},function(ok){if(ok)T[turn].s+=pts;busy=false;spins++;if(spins>=R*T.length)return g.podium(T,'نقطة');turn=(turn+1)%T.length;draw()})},3700)}}
    draw()})};

/* ٥) إكس-أو */
GAMES.xo=function(g){
  g.setup({fixed:2,rules:['فريقان: الأول ❌ والثاني ⭕.','يختار الفريق في دوره مربعًا فارغًا، ثم يجيب عن سؤال.','الإجابة الصحيحة تمنحه المربع، والخاطئة تُبقي المربع فارغًا.','يفوز من يكمل ثلاثة مربعات في صف أو عمود أو قطر، وإن امتلأت اللوحة دون ذلك فالفائز من يملك مربعات أكثر.'],go:'اللعب'},function(T){
    var turn=0,C=[null,null,null,null,null,null,null,null,null],SY=['❌','⭕'],LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];T.forEach(function(t){t.s=0});
    function win(){for(var i=0;i<LINES.length;i++){var l=LINES[i];if(C[l[0]]!==null&&C[l[0]]===C[l[1]]&&C[l[1]]===C[l[2]])return l}return null}
    function draw(line){g.shell(g.strip(T,line?-1:turn,function(t){return SY[T.indexOf(t)]+' '+g.n(t.s)})+'<div class="xo">'+C.map(function(c,i){return '<button class="cell'+(line&&line.indexOf(i)>=0?' win':'')+'" data-c="'+i+'"'+(c!==null||line?' disabled':'')+' style="'+(c!==null?'--tc:'+T[c].c:'')+'">'+(c!==null?SY[c]:'<small>'+g.n(i+1)+'</small>')+'</button>'}).join('')+'</div><p class="gact muted">'+(line?'':'دور '+g.esc(T[turn].n)+' '+SY[turn]+': اختر مربعًا')+'</p>');
      g.K.$$('.cell').forEach(function(b){b.onclick=function(){var i=+b.dataset.c;g.ask(g.nextQ(),{who:T[turn].n+' '+SY[turn],color:T[turn].c,label:'المربع '+g.n(i+1)},function(ok){if(ok){C[i]=turn;T[turn].s++}
        var l=win();if(l){draw(l);var w=T[turn];setTimeout(function(){g.podium(T,'مربعات','🏆 '+g.esc(w.n)+' أكمل ثلاثة في خط واحد!')},1500);return}
        if(C.every(function(c){return c!==null})){setTimeout(function(){g.podium(T,'مربعات','امتلأت اللوحة!')},600);draw([]);return}
        turn=1-turn;draw()})}})}
    draw()})};

/* ٦) سلّم المليون */
GAMES.ladder=function(g){var V=[100,200,300,500,1000,2000,4000,8000,16000,32000],SAFE=[2,5];
  g.setup({single:true,rules:['متسابق واحد (طالب أو مجموعة) يصعد سلّم الأسئلة العشرة.','لكل سؤال ٤٥ ثانية. الإجابة الخاطئة تُنهي المسابقة بنقاط آخر محطة أمان.','محطات الأمان عند '+g.n(300)+' و'+g.n(2000)+' نقطة.','ثلاث وسائل مساعدة تُستخدم مرة واحدة: حذف إجابتين، وتبديل السؤال، ووقت إضافي.','يمكنك الانسحاب في أي وقت والاحتفاظ بنقاطك.'],go:'التحدي'},function(T){
    var lv=0,help={half:1,swap:1,time:1},tm=null,left=45,q=null,busy=false,P0=T[0];
    function safe(){var s=0;SAFE.forEach(function(i){if(lv>i)s=V[i]});return s}
    function end(pts,msg){clearInterval(tm);P0.s=pts;if(pts>=V[V.length-1])g.confetti();g.K.sfx.win();g.shell(g.hero()+'<section class="panel endl"><span class="big">'+(pts>=V[V.length-1]?'🏆':'🎉')+'</span><h2>'+g.esc(P0.n)+'</h2><p>'+msg+'</p><b class="num">'+g.n(pts)+' نقطة</b><button class="b p big" id="re">↺ تحدٍّ جديد</button></section>');g.K.$('#re').onclick=function(){location.reload()}}
    function ladder(){return '<ol class="lad">'+V.map(function(v,i){return '<li class="'+(i===lv?'cur':'')+(i<lv?' done':'')+(SAFE.indexOf(i)>=0?' safe':'')+'"><span>'+g.n(i+1)+'</span><b class="num">'+g.n(v)+'</b></li>'}).reverse().join('')+'</ol>'}
    function draw(){q=q||g.nextQ();left=45;busy=false;clearInterval(tm);
      g.shell('<div class="mil"><section class="panel mq2"><div class="mh"><span>السؤال '+g.n(lv+1)+' · بقيمة <b>'+g.n(V[lv])+'</b></span><span class="clock" id="clk">'+g.n(left)+'</span></div><p class="mq">'+g.esc(q.q)+'</p><div class="mo mo2">'+q.o.map(function(x,j){return '<button data-j="'+j+'"><i>'+g.K.KL[j]+'</i>'+g.esc(x)+'</button>'}).join('')+'</div><div class="helps"><button class="b" id="h1"'+(help.half?'':' disabled')+'>✂️ حذف إجابتين</button><button class="b" id="h2"'+(help.swap?'':' disabled')+'>🔄 تبديل السؤال</button><button class="b" id="h3"'+(help.time?'':' disabled')+'>⏱ +٣٠ ثانية</button><button class="b" id="qt">🏳 انسحاب ('+g.n(lv?V[lv-1]:0)+')</button></div><div id="mfb"></div></section>'+ladder()+'</div>');
      tm=setInterval(function(){left--;var c=g.K.$('#clk');if(c)c.textContent=g.n(Math.max(0,left));if(left<=5&&left>0)g.K.sfx.tick();if(left<=0){clearInterval(tm);pick(-1)}},1000);
      g.K.$$('.mo2 button').forEach(function(b){b.onclick=function(){pick(+b.dataset.j)}});
      g.K.$('#h1').onclick=function(){help.half=0;this.disabled=true;var w=g.K.shuffle(q.o.map(function(_,j){return j}).filter(function(j){return j!==q.a})).slice(0,2);w.forEach(function(j){var b=g.K.$('.mo2 [data-j="'+j+'"]');b.disabled=true;b.classList.add('gone')})};
      g.K.$('#h2').onclick=function(){help.swap=0;q=g.nextQ();draw()};
      g.K.$('#h3').onclick=function(){help.time=0;this.disabled=true;left+=30};
      g.K.$('#qt').onclick=function(){end(lv?V[lv-1]:0,'قرار حكيم! انسحبت واحتفظت بنقاطك.')}}
    function pick(j){if(busy)return;busy=true;clearInterval(tm);var b=g.K.$('.mo2 [data-j="'+j+'"]');if(b)b.classList.add('lock');g.K.$$('.mo2 button,.helps button').forEach(function(x){x.disabled=true});
      setTimeout(function(){var ok=j===q.a;g.K.$('.mo2 [data-j="'+q.a+'"]').classList.add('ok');if(!ok&&b)b.classList.add('no');ok?g.K.sfx.ok():g.K.sfx.no();
        g.K.$('#mfb').innerHTML='<div class="fb '+(ok?'ok':'no')+'">'+(ok?'إجابة صحيحة!':(j<0?'انتهى الوقت. ':'')+'الإجابة الصحيحة: '+g.esc(q.o[q.a]))+(q.ex?'<br><small>'+g.esc(q.ex)+'</small>':'')+'</div><button class="b p big" id="nx">'+(ok?(lv+1<V.length?'السؤال التالي ←':'استلم الجائزة ←'):'النتيجة ←')+'</button>';
        g.K.$('#nx').onclick=function(){if(!ok)return end(safe(),'توقفت عند السؤال '+g.n(lv+1)+'، وحصلت على نقاط محطة الأمان.');lv++;q=null;if(lv>=V.length)return end(V[V.length-1],'أجبت عن الأسئلة العشرة كلها. أنت بطل الدرس!');draw()}},1300)}
    draw()})};

/* ٧) سباق المواد */
GAMES.race=function(g){var N=10;
  g.setup({rules:['لكل فريق سيارة في مسار السباق.','الإجابة الصحيحة تقدّم السيارة خطوة نحو خط النهاية.','إجابتان صحيحتان متتاليتان تشغّلان «التيربو»: خطوتان!','أول سيارة تعبر خط النهاية ('+g.n(N)+' خطوات) تفوز.'],go:'السباق'},function(T){
    var turn=0,streak=T.map(function(){return 0});T.forEach(function(t){t.s=0});
    function car(c){return '<svg viewBox="0 0 64 30" aria-hidden="true"><path d="M4 20 L10 10 Q14 6 22 6 L38 6 Q44 6 48 11 L56 13 Q62 14 62 20 L62 22 L4 22 Z" fill="'+c+'"/><path d="M16 11 Q18 8 23 8 L30 8 L30 13 L14 13 Z M33 8 L38 8 Q42 8 45 12 L33 13 Z" fill="#d7ecff"/><circle cx="16" cy="23" r="5.5" fill="#1b1b1b"/><circle cx="16" cy="23" r="2.2" fill="#bbb"/><circle cx="50" cy="23" r="5.5" fill="#1b1b1b"/><circle cx="50" cy="23" r="2.2" fill="#bbb"/><rect x="2" y="16" width="4" height="3" fill="#ffd34d"/></svg>'}
    function draw(){g.shell(g.strip(T,turn,function(t){return g.n(t.s)+' / '+g.n(N)})+'<div class="track">'+T.map(function(t,i){return '<div class="lane" style="--tc:'+t.c+'"><span class="ln">'+g.esc(t.n)+'</span><div class="road"><span class="car'+(streak[i]>=2?' turbo':'')+'" style="right:calc('+(t.s/N*100)+'% - '+(t.s/N*70)+'px)">'+car(t.c)+'</span></div></div>'}).join('')+'<div class="finish" aria-hidden="true"></div></div><div class="gact"><button class="b p big" id="go">سؤال لـ '+g.esc(T[turn].n)+' ←</button></div>');
      g.K.$('#go').onclick=function(){g.ask(g.nextQ(),{who:T[turn].n,color:T[turn].c,label:'سباق المواد',banner:streak[turn]===1?'🔥 أجب صحيحًا لتشغيل التيربو!':''},function(ok){
        if(ok){streak[turn]++;T[turn].s=Math.min(N,T[turn].s+(streak[turn]>=2?2:1));if(streak[turn]>=2)g.K.toast('🔥 تيربو! خطوتان لـ '+T[turn].n)}else streak[turn]=0;
        if(T[turn].s>=N){draw();setTimeout(function(){g.podium(T,'خطوات','🏁 '+g.esc(T[turn].n)+' عبر خط النهاية أولًا!')},1300);return}
        turn=(turn+1)%T.length;draw()})}}
    draw()})};

/* ٨) شدّ الحبل */
GAMES.tug=function(g){var W=4;
  g.setup({fixed:2,rules:['فريقان على طرفي الحبل، والعلامة الحمراء في المنتصف.','يجيب الفريق في دوره؛ الإجابة الصحيحة تشدّ الحبل خطوة نحوه.','إن أخطأ، تنتقل فرصة الإجابة عن السؤال نفسه إلى الفريق الآخر ليشدّ الحبل.','يفوز الفريق الذي يسحب العلامة إلى منطقته ('+g.n(W)+' خطوات).'],go:'الشد'},function(T){
    var turn=0,p=0;T.forEach(function(t){t.s=0});
    function people(c,n0){var s='';for(var i=0;i<3;i++)s+='<g transform="translate('+(i*22)+',0)"><circle cx="10" cy="8" r="6" fill="'+c+'"/><path d="M10 14 L10 34 M10 20 L22 26 M10 34 L2 48 M10 34 L18 48" stroke="'+c+'" stroke-width="4" stroke-linecap="round" fill="none"/></g>';return s}
    function draw(msg){var off=p*9;T[0].s=Math.max(0,p);T[1].s=Math.max(0,-p);
      g.shell(g.strip(T,turn,function(t){return T.indexOf(t)===0?(p>0?'+'+g.n(p):g.n(0)):(p<0?'+'+g.n(-p):g.n(0))})+'<div class="tug"><div class="zone r" style="--tc:'+T[0].c+'">'+g.esc(T[0].n)+'</div><div class="zone l" style="--tc:'+T[1].c+'">'+g.esc(T[1].n)+'</div><div class="rope" style="transform:translateX('+off+'%)"><svg viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 Q100 26 200 30 T400 30" stroke="#8a5a2b" stroke-width="7" fill="none"/><path d="M0 30 Q100 26 200 30 T400 30" stroke="#c98f52" stroke-width="3" stroke-dasharray="6 6" fill="none"/></svg><span class="mark"></span><svg class="pp r" viewBox="0 0 70 50">'+people(T[0].c)+'</svg><svg class="pp l" viewBox="0 0 70 50">'+people(T[1].c)+'</svg></div><div class="centre"></div></div>'+(msg?'<p class="note">'+msg+'</p>':'')+'<div class="gact"><button class="b p big" id="go">سؤال لـ '+g.esc(T[turn].n)+' ←</button></div>');
      g.K.$('#go').onclick=function(){var q=g.nextQ(),t=turn;g.ask(q,{who:T[t].n,color:T[t].c,label:'شدّ الحبل'},function(ok,j){
        if(ok){p+=t===0?1:-1;after()}else{var o=1-t,q2={q:q.q,o:q.o.slice(),a:q.a,ex:q.ex};q2.o=q.o.map(function(x,i){return i===j?x+' ✗':x});
          setTimeout(function(){g.ask(q2,{who:T[o].n,color:T[o].c,label:'فرصة السرقة!',banner:'🔁 فرصة للفريق الآخر بالسؤال نفسه'},function(ok2){if(ok2)p+=o===0?1:-1;after()})},250)}
        function after(){if(Math.abs(p)>=W){var w=p>0?T[0]:T[1];draw();setTimeout(function(){T[0].s=Math.max(0,p);T[1].s=Math.max(0,-p);g.podium(T,'خطوات','💪 '+g.esc(w.n)+' سحب الحبل إلى منطقته!')},1200);return}turn=1-turn;draw()}})}}
    draw()})};

window.KIT_MODES=window.KIT_MODES||{};
window.KIT_MODES.game=function(K){var g=G(K);GAMES[K.P.game.id](g)};
})();
