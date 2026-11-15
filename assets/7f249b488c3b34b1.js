/* الدرس الأول: مادة الوراثة DNA (ص ١٢٢–١٢٧) */
(function(){
"use strict";
var G=window.G,$=G.$,$$=G.$$,n=G.n,h=G.h,img=G.img;
function cd(t,b,st){return '<div class="cd" style="'+(st||'')+'">'+(t?'<h3>'+t+'</h3>':'')+b+'</div>'}
function lay(el,ey,title,left,right,lf){el.innerHTML='<div class="ey">'+ey+'</div><h1 class="t">'+title+'</h1><div class="row grow"><div class="col'+(left.indexOf('<canvas')<0?' scroll':'')+'" style="flex:'+(lf||1.35)+'">'+left+'</div><div class="col scroll grow" id="R">'+right+'</div></div>';return $('#R',el)}
function B(s){return '<span class="seq">'+s.split('').map(function(c){return '<span class="base '+c+'">'+c+'</span>'}).join('')+'</span>'}
function L_(s){return '<span class="ltr">'+s+'</span>'}
var BC={A:'#0f9a72',T:'#e23e64',C:'#1f84cc',G:'#e6a100',U:'#8b5cf6'},PAIR={A:'T',T:'A',C:'G',G:'C'};
var GO=['أن يتعرف الطالب أجزاء جزيء DNA وتركيبه.','أن يوضح الطالب كيف يتضاعف DNA.','أن يصف الطالب تركيب DNA.','أن يحدد الطالب وظائف أنواع RNA المختلفة.'];
var ANT=[['يتكوّن جانبا سلم DNA من جزيئات السكر والفوسفات.',true,'جانبا السلم: سكر خماسي منقوص الأكسجين ومجموعة فوسفات بالتعاقب، أما الدرجات فمن القواعد النيتروجينية.'],
 ['يرتبط الأدنين في جزيء DNA مع السايتوسين.',false,'يرتبط الأدنين مع الثايمين، ويرتبط الجوانين مع السايتوسين.'],
 ['تُصنع البروتينات داخل النواة.',false,'توجد الجينات في النواة، أما البروتينات فتُصنع في الرايبوسومات الموجودة في السيتوبلازم.'],
 ['تحل القاعدة النيتروجينية اليوراسيل في RNA محل الثايمين.',true,'قواعد RNA: الأدنين والجوانين والسايتوسين واليوراسيل.'],
 ['جميع الطفرات ضارة بالمخلوق الحي.',false,'كثير من الطفرات ضار، لكن بعضها مفيد، كما في إنتاج سلالات نباتية ذات صفات مرغوب فيها.']];
var L={title:'مادة الوراثة DNA',cover:'a_hero',blurb:'نكتشف شيفرة الحياة: نستخلص DNA من الفراولة، ونبني نموذجه، ونشغّل آلة تضاعفه، ونزور مصنع البروتين، ونجرّب الطفرات.',stations:[]};
function S(o){L.stations.push(o)}

/* ===== ١) المقدمة التشويقية ===== */
S({id:'intro',name:'المقدمة التشويقية',ic:'🎬',full:true,manual:true,build:function(el){
  var P=[];for(var i=0;i<160;i++)P.push([Math.random()*1600,Math.random()*900,Math.random()*2+.5,Math.random()*6]);
  function ez(a,b,t){t=Math.min(1,Math.max(0,(t-a)/(b-a)));return t*t*(3-2*t)}
  function person(x,cx,cy,s,al){x.save();x.globalAlpha=al;x.fillStyle='rgba(140,110,255,.35)';x.strokeStyle='#b9a6ff';x.lineWidth=3;x.shadowColor='#8b5cf6';x.shadowBlur=30;
    x.beginPath();x.arc(cx,cy-180*s,52*s,0,7);x.fill();x.stroke();x.beginPath();x.moveTo(cx-95*s,cy-100*s);x.quadraticCurveTo(cx,cy-130*s,cx+95*s,cy-100*s);x.lineTo(cx+70*s,cy+120*s);x.lineTo(cx+50*s,cy+330*s);x.lineTo(cx-50*s,cy+330*s);x.lineTo(cx-70*s,cy+120*s);x.closePath();x.fill();x.stroke();x.restore()}
  function cell(x,cx,cy,R,al,t){x.save();x.globalAlpha=al;var g=x.createRadialGradient(cx-R*.3,cy-R*.3,R*.1,cx,cy,R);g.addColorStop(0,'#ffd6e6');g.addColorStop(1,'#d9759c');x.fillStyle=g;x.beginPath();for(var k=0;k<=60;k++){var a=k/60*6.283,r=R*(1+.04*Math.sin(a*5+t*2));k?x.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):x.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r)}x.fill();
    var g2=x.createRadialGradient(cx,cy,R*.05,cx,cy,R*.42);g2.addColorStop(0,'#b38cff');g2.addColorStop(1,'#6c3fd1');x.fillStyle=g2;x.beginPath();x.arc(cx,cy,R*.42,0,7);x.fill();x.restore()}
  function chromo(x,cx,cy,s,a,col){x.save();x.translate(cx,cy);x.rotate(a);x.fillStyle=col;x.lineCap='round';[[-1,1],[1,1]].forEach(function(q){x.save();x.rotate(q[0]*.35);x.beginPath();x.ellipse(0,-50*s,16*s,52*s,0,0,7);x.fill();x.beginPath();x.ellipse(0,50*s,16*s,52*s,0,0,7);x.fill();x.restore()});x.fillStyle='rgba(255,255,255,.7)';x.beginPath();x.arc(0,0,9*s,0,7);x.fill();x.restore()}
  function helix(x,cx,cy,W,H,t,al,lab){x.save();x.globalAlpha=al;var N=26,cols=['A','T','C','G'];for(var i=0;i<N;i++){var X=cx-W/2+i*W/(N-1),ph=i*.5+t*1.6,y1=cy+Math.sin(ph)*H,y2=cy-Math.sin(ph)*H,b=cols[(i*7)%4],front=Math.cos(ph)>0;
      x.strokeStyle=BC[b];x.lineWidth=9;x.beginPath();x.moveTo(X,y1);x.lineTo(X,(y1+y2)/2);x.stroke();x.strokeStyle=BC[PAIR[b]];x.beginPath();x.moveTo(X,(y1+y2)/2);x.lineTo(X,y2);x.stroke();
      x.fillStyle=front?'#d9ccff':'#7d6bc4';x.beginPath();x.arc(X,y1,10,0,7);x.fill();x.fillStyle=front?'#ff9fb7':'#a35873';x.beginPath();x.arc(X,y2,10,0,7);x.fill();
      if(lab&&i%3===1){G.T(x,b,X,y1+(y1<cy?-26:26),22,'#fff');}}x.restore()}
  return G.cine(el,{dur:25,finalAt:21.4,final:'ما الشيفرة المكتوبة داخل كل خلية من خلاياك؟<br><span class="gl2">وكيف تصنع صفاتك؟</span>',
    caps:[[.8,5.2,'في جسمك تريليونات الخلايا… وكل خلية تحمل رسالة سرية'],[5.6,10.4,'داخل نواة الخلية: كروموسومات ملتفة بإحكام'],[10.8,15.8,'لو فككنا الكروموسوم لوجدنا سلمًا حلزونيًّا: DNA'],[16.2,21,'وعلى درجاته أربعة أحرف فقط: A  T  C  G']],
    draw:function(x,t,W,H){x.fillStyle='#07051a';x.fillRect(0,0,W,H);P.forEach(function(p){x.fillStyle='rgba(185,166,255,'+(.25+.5*Math.abs(Math.sin(t*.8+p[3])))+')';x.beginPath();x.arc(p[0],(p[1]-t*8+900)%900,p[2],0,7);x.fill()});
      var z=ez(3.5,6,t);if(t<6.5){person(x,800,420,1+z*3,1-z);if(z>0)cell(x,800,450,80+z*260,z,t)}
      else if(t<11){var k=ez(6.5,9,t);cell(x,800,450,340+k*900,1-k,t);var R=150+k*120;x.save();x.globalAlpha=Math.min(1,k*2);var g2=x.createRadialGradient(800,450,10,800,450,R*1.6);g2.addColorStop(0,'rgba(108,63,209,.55)');g2.addColorStop(1,'rgba(108,63,209,0)');x.fillStyle=g2;x.fillRect(0,0,W,H);[[620,360,-.3,'#ff8fab'],[980,330,.4,'#7ff0c8'],[700,560,.9,'#ffd166'],[930,580,-.8,'#8fc9ff'],[800,450,.1,'#c9b8ff']].forEach(function(c,i){chromo(x,c[0]+Math.sin(t+i)*8,c[1],.9+k*.3,c[2]+t*.1,c[3])});x.restore()}
      else if(t<16.2){var u=ez(11,14,t);chromo(x,800,450,1.3*(1-u)+.01,0.1,'rgba(201,184,255,'+(1-u)+')');helix(x,800,450,1300*u+60,120*u+10,t,u,false)}
      else{helix(x,800,430,1300,130,t,1,true);if(t>17){x.globalAlpha=ez(17,18.5,t);[['A','الأدنين',300],['T','الثايمين',620],['C','السايتوسين',940],['G','الجوانين',1260]].forEach(function(q){x.fillStyle=BC[q[0]];G.rr(x,q[2]-90,690,180,92,20);x.fill();G.T(x,q[0],q[2],722,36,'#fff');G.T(x,q[1],q[2],762,22,'#fff')});x.globalAlpha=1}}
      if(t>21){x.fillStyle='rgba(5,3,18,'+.6*ez(21,22,t)+')';x.fillRect(0,0,W,H)}}})}});

/* ===== ٢) ماذا سنتعلم اليوم؟ ===== */
S({id:'wonder',name:'ماذا سنتعلم اليوم؟',ic:'❓',build:function(el){return G.wonder(el,{ey:'الدرس الأول · مادة الوراثة DNA',items:[['🧬','ما DNA؟ ومن اكتشف شكله؟'],['🪜','مِمَّ يتكوّن سلم DNA الحلزوني؟'],['🖨','كيف ينسخ DNA نفسه قبل انقسام الخلية؟'],['🏭','كيف تنتقل شفرة البروتين من النواة إلى الرايبوسوم؟'],['🦜','ما الطفرة؟ وهل كل الطفرات ضارة؟']]})}});

/* ===== ٣) الأهداف ===== */
S({id:'goals',name:'أهداف الدرس',ic:'🎯',build:function(el){return G.goals(el,{ey:'مادة الوراثة DNA · ص ١٢٢',ideaL:'أهمية الدرس',idea:'يساعد DNA على تحديد معظم خصائص الجسم.',goals:[['🧩',GO[0]],['🖨',GO[1]],['🪜',GO[2]],['📨',GO[3]]]})}});

/* ===== ٤) التهيئة ===== */
S({id:'prior',name:'تهيئة: مراجعة المفردات',ic:'🔁',build:function(el){var R=lay(el,'تهيئة · مراجعة المفردات ص ١٢٢','قبل أن نفك الشيفرة… ماذا نعرف؟',
  cd('🔁 مراجعة المفردات','<p class="big" style="margin:0"><b class="hl">البروتين:</b> مركب عضوي ضخم الحجم يتكوّن من <b class="hl2">الأحماض الأمينية</b>.</p>')+
  '<div class="cd tape" style="display:flex;gap:14px;align-items:center">'+img('a_path','width:420px;height:170px;object-fit:contain;background:#fff')+'<p style="margin:0;font-size:19px;line-height:1.7">خلية ← كروموسوم ← DNA ← جين.<br>رتّب في ذهنك: أين توجد «شيفرة» صفاتك؟</p></div><div id="pp"></div>',
  cd('📖 توجيه القراءة: قبل القراءة','<p class="hint" style="margin:0 0 6px">اختر «موافق» أو «غير موافق» لكل عبارة، وسنعود إليها في نهاية الدرس.</p><div id="an"></div>'),1);
  G.poll($('#pp',el),{q:'أين تتوقع أن تُحفظ المعلومات التي تحدد لون عينيك؟',o:['في نواة الخلية','في الدم فقط','في العظام','في الجلد فقط']});
  G.anticip($('#an',el),{key:'l1',items:ANT});return {}}});

/* ===== ٥) خريطة المصطلحات ===== */
var TERMS=[{ic:'🧬',t:'DNA',d:'الحمض النووي الرايبوزي منقوص الأكسجين، يحوي معلومات خاصة بنمو المخلوقات الحية ونشاطها.'},
 {ic:'🔤',t:'القواعد النيتروجينية',d:'درجات سلم DNA: الأدنين A، والثايمين T، والسايتوسين C، والجوانين G؛ يرتبط A مع T، وG مع C.'},
 {ic:'🔁',t:'البروتين (مراجعة)',d:'مركب عضوي ضخم الحجم يتكوّن من الأحماض الأمينية.'},
 {ic:'📍',t:'الجين (المورّث)',d:'جزء من DNA مسؤول عن تصنيع بروتين ما، ويحتوي الكروموسوم الواحد على مئات الجينات.'},
 {ic:'📨',t:'RNA',d:'الحمض النووي الرايبوزي، يُصنع داخل النواة من سلسلة واحدة، وتحل فيه القاعدة اليوراسيل محل الثايمين.'},
 {ic:'✉',t:'mRNA الرسول',d:'نسخة من DNA تنتقل بين النواة والرايبوسوم حاملة شفرة تصنيع البروتين.'},
 {ic:'🚚',t:'tRNA الناقل',d:'يحمل الأحماض الأمينية ويربطها حسب الشفرة التي يحملها الرسول.'},
 {ic:'⚙',t:'rRNA الرايبوسومي',d:'يوجد في الرايبوسومات، ويعمل على ربط الأحماض الأمينية في سلسلة عديد الببتيد.'},
 {ic:'⚠',t:'الطفرة',d:'تغيّر دائم في تسلسل DNA المكوّن للكروموسوم، ينتج عنه تصنيع بروتينات غير متطابقة.'}];
var TV;S({id:'terms',name:'خريطة المصطلحات',ic:'🏷',build:function(el){return TV(el)}});

/* ===== ٦) م١ قصة اكتشاف DNA ===== */
var TL=[['القرن التاسع عشر','عرف العلماء الأحماض النووية وعزلوها من نوى الخلايا.','🔬'],['١٩٥٠م','عرف العلماء مكوّنات DNA، دون معرفة شكل ترتيب مكوناته.','🧪'],['١٩٥٢م','استعملت روزاليند فرانكلين الأشعة السينية، وتمكنت من معرفة أن DNA مكوّن من سلسلتين ملتفتين كالسلم الحلزوني.','📸'],['١٩٥٣م','بنى جيمس واطسون وفرانسيس كريك نموذجًا لجزيء DNA.','🏗']];
S({id:'disc',name:'م١ قصة اكتشاف DNA',ic:'🔎',manual:true,build:function(el){
  var R=lay(el,'المحطة ١ · ما مادة الوراثة DNA؟ ص ١٢٢','ملف التحقيق: كيف كُشف سر السلم الحلزوني؟',
   cd('ما مادة الوراثة DNA؟','<p class="big" style="margin:0">هو <b class="hl">الحمض النووي الرايبوزي منقوص الأكسجين</b>، الذي يحوي معلومات خاصة بنمو المخلوقات الحية ونشاطها.</p>')+
   '<div class="cd" style="flex:1;min-height:0"><h3>🗂 افتح الأدلة بالترتيب</h3><div id="tl" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px"></div></div>',
   '<div class="cd" style="display:flex;gap:10px">'+img('a_frank','width:50%;height:150px')+img('a_wc','width:50%;height:150px')+'</div><p class="hint" style="margin:-6px 0 0">روزاليند فرانكلين · واطسون وكريك أمام نموذجهما</p><div id="dq"></div>',1.3);
  var k=0,tl=$('#tl',el);TL.forEach(function(m,i){var c=h('<button class="tool" style="min-height:250px;justify-content:flex-start;gap:8px;padding:12px"><span style="font-size:40px">'+(i===0?m[2]:'🔒')+'</span><b style="font-size:20px">'+(i===0?m[0]:'دليل '+n(i+1))+'</b><span class="mt" style="font-size:16px;line-height:1.6;font-family:var(--body);'+(i===0?'':'display:none')+'">'+m[1]+'</span></button>');tl.appendChild(c);
    c.onclick=function(){if(i!==k){G.toast(i<k?'هذا الدليل مفتوح':'افتح الأدلة بالترتيب');return}open(i)}});
  function open(i){var c=tl.children[i];$('span',c).textContent=TL[i][2];$('b',c).textContent=TL[i][0];$('.mt',c).style.display='';c.classList.add('on');G.sfx.ok();k=i+1;if(k===TL.length){G.done('disc')}}
  open(0);
  var q=$('#dq',el);G.order(q,{id:'l1-tl',goal:1,lvl:1,q:'رتّب أحداث اكتشاف DNA من الأقدم إلى الأحدث:',items:['معرفة الأحماض النووية','معرفة مكوّنات DNA دون شكلها','صور فرانكلين بالأشعة السينية','نموذج واطسون وكريك']});
  G.mcq(q,{id:'l1-fr',goal:1,lvl:1,q:'استعانت روزاليند فرانكلين لمعرفة شكل DNA بـ:',o:['الأشعة السينية','المجهر الضوئي','ضوء الشمس','الموجات الصوتية'],a:0,ex:'عرفت أن DNA مكوّن من سلسلتين كالسلم الحلزوني.'});
  return {reveal:function(){if(k<TL.length){open(k);return true}return false}}}});

/* ===== ٧) م٢ مختبر استخلاص DNA (تجربة إثرائية) ===== */
var EX=[['🍓','اهرس الفراولة في كيس','تُهرس الثمار فتتفكك أنسجتها وتنفتح الخلايا.','عجينة حمراء'],['🧴','أضف محلول الاستخلاص','الصابون يذيب أغشية الخلايا والنواة فيتحرر DNA، والملح يساعد على تجمّع جزيئاته.','سائل رغوي'],['🫗','رشّح الخليط','يفصل المرشح بقايا الثمرة، ويمر السائل الذي يحوي DNA.','سائل أحمر صافٍ'],['🧊','صبّ كحولًا باردًا ببطء','DNA لا يذوب في الكحول البارد، فينفصل فوق السائل.','طبقة شفافة فوقها ضباب أبيض'],['🥢','لفّ الخيوط بعود خشبي','تظهر خيوط بيضاء لزجة: ملايين من جزيئات DNA ملتفة معًا.','خيوط بيضاء لزجة']];
S({id:'extract',name:'م٢ مختبر استخلاص DNA',ic:'🍓',manual:true,build:function(el){
  var R=lay(el,'المحطة ٢ · تجربة إثرائية: هل يمكن أن نرى DNA بأعيننا؟','مختبر استخلاص DNA من الفراولة',
   '<canvas class="sim" id="xc" width="1000" height="540" style="flex:1;min-height:0;height:100%"></canvas><div id="xt"></div>',
   '<div class="cd" style="background:#fff5f7;border-color:#f6c6d3"><b>⚠ السلامة:</b> الكحول قابل للاشتعال؛ أبعده عن اللهب، ونفّذ التجربة بإشراف المعلم، ولا تتذوق المواد.</div>'+
   cd('🧾 المواد','<p style="margin:0;font-size:17px;line-height:1.8">٣ حبات فراولة · كيس بسحّاب · ماء دافئ + ملعقة صابون سائل + رشة ملح (محلول الاستخلاص) · قمع ومرشح ورقي · كأس شفافة · كحول بارد (من الثلاجة) · عود خشبي.</p>')+
   '<div id="xtb"></div><div class="cd reveal" id="xEx"><h3>الاستنتاج</h3><p style="margin:0;font-size:18px;line-height:1.7">الخيوط البيضاء هي <b class="hl">DNA</b> الذي كان داخل نوى خلايا الفراولة. الجزيء الواحد أدق من أن يُرى، لكن ملايين الجزيئات الملتفة معًا تظهر بالعين المجردة.</p></div><div id="xq"></div>');
  var c=$('#xc',el),st=-1,k=0,bub=[];for(var i=0;i<40;i++)bub.push([Math.random(),Math.random(),Math.random()]);
  var tb=G.table($('#xtb',el),['الخطوة','الهدف','الملاحظة'],EX.map(function(e){return [e[1],'','']}));
  var sim=G.sim(c,function(x,t,dt){var by=440;G.bench(x,1000,540,by);if(st>=0&&k<1)k=Math.min(1,k+dt*.45);
    if(st<0){G.pill(x,'اتبع خطوات التجربة بالترتيب من الأدوات في الأسفل',500,40,'#fff','#4a249e',18)}
    if(st===0){x.fillStyle='rgba(230,240,255,.7)';G.rr(x,330,170,340,260,24);x.fill();x.strokeStyle='#9fb3d9';x.lineWidth=3;x.stroke();x.fillStyle='#3a4a78';x.fillRect(330,170,340,14);
      for(var i=0;i<3;i++){var sq=k*.7,X=420+i*80,Y=330;x.fillStyle='#e8344e';x.beginPath();x.ellipse(X,Y,40*(1+sq*.6),46*(1-sq*.55),0,0,7);x.fill();if(k<.6){x.fillStyle='#2f9a4a';x.beginPath();x.ellipse(X,Y-44,22,9,0,0,7);x.fill()}}
      x.fillStyle='rgba(232,52,78,'+(.7*k)+')';G.rr(x,345,340,310,80,18);x.fill();var hx=500+Math.sin(t*9)*60*(k<1?1:0);x.font='70px serif';x.textAlign='center';x.fillText('✋',hx,250)}
    if(st>=1&&st<=2){x.fillStyle='rgba(230,240,255,.55)';x.strokeStyle='#9fb3d9';x.lineWidth=3;G.rr(x,140,200,300,230,24);x.fill();x.stroke();x.fillStyle='#d9435c';G.rr(x,150,300,280,120,16);x.fill();
      if(st===1){x.fillStyle='rgba(255,255,255,.85)';bub.forEach(function(b){x.beginPath();x.arc(160+b[0]*260,300-b[1]*40*k+Math.sin(t*3+b[2]*9)*4,4+b[2]*6,0,7);x.fill()});x.fillStyle='#7fc3ff';x.beginPath();x.moveTo(330,90);x.lineTo(380,90);x.lineTo(370,180);x.lineTo(340,180);x.closePath();x.fill();if(k<1){x.fillStyle='#7fc3ff';x.fillRect(352,180,6,120*k)}G.pill(x,'ماء + صابون + ملح',355,70,'#fff','#155c90',16)}
      if(st===2){x.strokeStyle='#7d86a8';x.lineWidth=4;x.beginPath();x.moveTo(560,170);x.lineTo(760,170);x.lineTo(680,290);x.lineTo(680,330);x.lineTo(640,330);x.lineTo(640,290);x.closePath();x.stroke();x.fillStyle='#f4efe4';x.beginPath();x.moveTo(575,180);x.lineTo(745,180);x.lineTo(665,285);x.lineTo(655,285);x.closePath();x.fill();
        x.fillStyle='#b8384f';x.beginPath();x.moveTo(600,200);x.lineTo(720,200);x.lineTo(670,260);x.lineTo(650,260);x.closePath();x.fill();
        x.fillStyle='rgba(230,240,255,.55)';x.strokeStyle='#9fb3d9';x.lineWidth=3;G.rr(x,590,330,140,110,12);x.fill();x.stroke();x.fillStyle='rgba(222,70,95,.75)';x.fillRect(596,440-80*k,128,80*k-4);for(var d=0;d<3;d++){var yy=290+((t*120+d*20)%40);x.fillStyle='#e05a72';x.beginPath();x.arc(660,yy,4,0,7);x.fill()}G.pill(x,'المرشح يحجز بقايا الثمرة',660,140,'#fff','#4a249e',16)}}
    if(st>=3){var cx=500;x.fillStyle='rgba(230,240,255,.5)';x.strokeStyle='#9fb3d9';x.lineWidth=4;G.rr(x,cx-90,150,180,285,14);x.fill();x.stroke();x.fillStyle='rgba(222,70,95,.78)';x.fillRect(cx-84,330,168,100);
      var al=st===3?k:1;x.fillStyle='rgba(235,245,255,'+(.8*al)+')';x.fillRect(cx-84,330-100*al,168,100*al);
      x.fillStyle='rgba(255,255,255,'+(.95*al)+')';for(var i=0;i<28;i++){var px=cx-70+(i*37%140),py=330-((i*23)%60)*al-Math.sin(t*1.5+i)*4;x.beginPath();x.arc(px,py,3+((i*7)%5),0,7);x.fill()}
      if(st===3){x.fillStyle='#e7f3ff';x.beginPath();x.moveTo(720,80);x.lineTo(770,80);x.lineTo(760,150);x.lineTo(730,150);x.closePath();x.fill();x.strokeStyle='#aac';x.stroke();G.pill(x,'كحول بارد يُصبّ على جدار الكأس',745,56,'#fff','#155c90',16);if(k<1){x.strokeStyle='#cfe6ff';x.lineWidth=5;x.beginPath();x.moveTo(738,150);x.quadraticCurveTo(650,150,cx+84,230);x.stroke()}}
      if(st===4){var up=k;x.strokeStyle='#c9a46a';x.lineWidth=10;x.beginPath();x.moveTo(cx+10,330-40-up*120);x.lineTo(cx+60,60-up*30);x.stroke();x.strokeStyle='rgba(255,255,255,.95)';x.lineWidth=3;for(var j=0;j<14;j++){x.beginPath();x.moveTo(cx+10+Math.sin(j)*14,330-40-up*120);x.bezierCurveTo(cx-20+j*4,300-up*60,cx+30-j*3,320,cx-30+j*5,325);x.stroke()}
        if(k>.6)G.pill(x,'خيوط DNA البيضاء',cx+190,200,'#fff','#4a249e',22)}}
    if(st>=0)G.pill(x,'الخطوة '+n(st+1)+': '+EX[st][1],500,500,'#1b1336','#fff',18);
    if(st>=0&&k>=1&&!tb.has(st)){tb.fill(st,[EX[st][2],EX[st][3]]);G.sfx.ok();if(tb.count()===EX.length){$('#xEx',el).classList.add('shown');G.done('extract')}}});
  G.tools($('#xt',el),EX.map(function(e){return [e[0],e[1]]}),function(i,b,w){if(i>0&&!tb.has(i-1)){G.toast('اتبعوا خطوات التجربة بالترتيب');G.sfx.no();return}if(i===st)return;st=i;k=0;$$('.tool',w).forEach(function(z,j){z.classList.toggle('on',j===i)});G.sfx.pop()});
  G.mcq($('#xq',el),{id:'l1-ex',goal:1,lvl:2,q:'لماذا نضيف الصابون في تجربة استخلاص DNA؟',o:['لأنه يذيب أغشية الخلايا والنواة فيتحرر DNA','لأنه يلوّن DNA باللون الأبيض','لأنه يصنع DNA جديدًا','لأنه يذيب DNA'],a:0,ex:'الأغشية مكوّنة من دهون يذيبها الصابون.'});
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ٨) م٣ ورشة نموذج DNA ===== */
var STR='ATGCCGTA';
S({id:'model',name:'م٣ ورشة بناء نموذج DNA',ic:'🪜',manual:true,build:function(el){
  var R=lay(el,'المحطة ٣ · نموذج DNA ص ١٢٣','ورشة بناء النموذج: أكمل السلم الحلزوني',
   '<div class="cd" style="flex:1;min-height:0;display:flex;gap:16px"><div id="lad" style="flex:1.2;display:flex;flex-direction:column;justify-content:center;gap:6px"></div><div style="flex:1;display:flex;flex-direction:column;gap:8px"><h3 style="margin:0">لوحة القواعد</h3><div id="pal" style="display:grid;grid-template-columns:1fr 1fr;gap:8px"></div><p class="hint" style="margin:0">اختر قاعدة ثم المس الفراغ المقابل. تذكّر قاعدة الارتباط!</p><div class="acts" style="margin:0"><button class="b" id="mck">✓ تحقّق من النموذج</button><button class="b g" id="mrs">↺</button></div><div id="mfb"></div></div></div>',
   cd('بناءً على نموذج واطسون وكريك','<p style="margin:0;font-size:18px;line-height:1.7">يتكوّن <b class="hl">جانبا السلم</b> من تعاقب السكر (السكر الخماسي منقوص الأكسجين) ومجموعة الفوسفات، أما <b class="hl">الدرجات</b> فمن القواعد النيتروجينية:</p><div class="seq" style="margin:8px 0">'+['A','T','C','G'].map(function(b){return '<span class="base '+b+'">'+b+'</span>'}).join('')+'</div><p style="margin:0;font-size:17px">الأدنين A · الثايمين T · السايتوسين C · الجوانين G</p>')+
   '<div class="cd">'+img('a_nuc','width:100%;height:160px;object-fit:contain;background:#fff')+'</div>'+
   '<div class="cd reveal" id="mEx"><h3>ملاحظة العلماء</h3><p style="margin:0;font-size:18px;line-height:1.7">لاحظ العلماء أن كمية السايتوسين في الخلية تساوي دائمًا كمية الجوانين، وكمية الأدنين تساوي كمية الثايمين؛ فافترضوا أن القواعد تكون أزواجًا: <b class="hl">A مع T</b> و<b class="hl">G مع C</b>.</p></div><div id="mtb"></div><div id="mq"></div>',1.25);
  var sel=null,lad=$('#lad',el),pal=$('#pal',el),slots=[];
  ['A','T','C','G'].forEach(function(b){var p=h('<button class="tool" data-b="'+b+'" style="flex-direction:row;gap:10px;justify-content:center"><span class="base '+b+'">'+b+'</span><b>'+({A:'الأدنين',T:'الثايمين',C:'السايتوسين',G:'الجوانين'})[b]+'</b></button>');pal.appendChild(p);p.onclick=function(){sel=b;$$('.tool',pal).forEach(function(z){z.classList.toggle('on',z===p)});G.sfx.pop()}});
  STR.split('').forEach(function(b,i){var off=Math.round(Math.sin(i*.75)*36);var r=h('<div style="display:flex;align-items:center;gap:6px;direction:ltr;transform:translateX('+off+'px)"><span class="tag" style="background:#ffe1ea;color:#a3284a">ف</span><span class="tag" style="background:#e6dcff;color:#4a249e">س</span><span class="base '+b+'">'+b+'</span><span style="width:26px;height:4px;background:#c4bce0;border-radius:2px"></span><button class="base q" data-i="'+i+'">؟</button><span class="tag" style="background:#e6dcff;color:#4a249e">س</span><span class="tag" style="background:#ffe1ea;color:#a3284a">ف</span></div>');lad.appendChild(r);var s=$('button',r);slots.push(s);
    s.onclick=function(){var cur=s.dataset.v,nx=sel||({'':'A',A:'T',T:'C',C:'G',G:'A'})[cur||''];s.dataset.v=nx;s.className='base '+nx;s.textContent=nx;G.sfx.pop();$('#mfb',el).innerHTML=''}});
  var tb=G.table($('#mtb',el),['القاعدة','العدد في الجزيء كله'],[['الأدنين A',''],['الثايمين T',''],['السايتوسين C',''],['الجوانين G','']]);
  $('#mrs',el).onclick=function(){slots.forEach(function(s){delete s.dataset.v;s.className='base q';s.textContent='؟'})};
  $('#mck',el).onclick=function(){if(slots.some(function(s){return !s.dataset.v})){G.toast('أكملوا جميع الدرجات أولًا');return}var bad=0;slots.forEach(function(s,i){var ok=s.dataset.v===PAIR[STR[i]];s.style.outline=ok?'4px solid #16a34a':'4px solid #e2483d';if(!ok)bad++});
    if(bad){G.sfx.no();$('#mfb',el).innerHTML='<div class="fb no">'+n(bad)+' درجات غير صحيحة. تذكّر: A مع T، وG مع C.</div>';return}
    G.sfx.ok();$('#mfb',el).innerHTML='<div class="fb ok"><b>✔ نموذج صحيح!</b> اكتمل السلم الحلزوني.</div>';var all=STR+STR.split('').map(function(b){return PAIR[b]}).join(''),cnt=function(b){return all.split(b).length-1};['A','T','C','G'].forEach(function(b,i){tb.fill(i,[n(cnt(b))])});$('#mEx',el).classList.add('shown');G.done('model')};
  var q=$('#mq',el);
  G.mcq(q,{id:'l1-side',goal:1,lvl:1,q:'يتكوّن جانبا سلم DNA من:',o:['السكر والفوسفات','القواعد النيتروجينية','الأحماض الأمينية','البروتينات'],a:0,ex:'أما الدرجات فمن القواعد النيتروجينية.'});
  return {}}});

/* ===== ٩) م٤ آلة تضاعف DNA ===== */
var TOP='ATGCAGTCGA';
var RS=[['✂','افصل السلسلتين','يفصل إنزيم معيّن السلسلتين إحداهما عن الأخرى.'],['🔗','اربط قواعد جديدة','ترتبط قواعد نيتروجينية جديدة بالقواعد الأصلية: A مع T، وC مع G.'],['🧬','افصل الجزيئين','ينتج جزيئان جديدان متطابقان من DNA، كل منهما مماثل للأصل.']];
S({id:'rep',name:'م٤ آلة تضاعف DNA',ic:'🖨',manual:true,build:function(el){
  var R=lay(el,'المحطة ٤ · نسخ DNA ص ١٢٤','آلة التضاعف: كيف ينسخ DNA نفسه؟',
   '<canvas class="sim" id="rc" width="1000" height="540" style="flex:1;min-height:0;height:100%"></canvas><div id="rt"></div>',
   cd('متى يتضاعف DNA؟','<p style="margin:0;font-size:18px;line-height:1.7">تتم هذه العملية في <b class="hl">الطور البيني</b> عندما تتضاعف الكروموسومات قبل الانقسام المنصف أو المتساوي؛ فتتضاعف كمية DNA داخل النواة.</p>')+'<div id="rtb"></div>'+
   '<div class="cd reveal" id="rEx">'+img('a_rep','width:100%;height:210px;object-fit:contain;background:#fff')+'<p style="margin:6px 0 0;font-size:17px">الشكل في الكتاب: تنفصل السلسلتان، ثم ترتبط قواعد جديدة، فينتج جزيئان متطابقان.</p></div><div id="rq"></div>');
  var c=$('#rc',el),st=-1,k=0,N=TOP.length,BOT=TOP.split('').map(function(b){return PAIR[b]}).join('');
  var tb=G.table($('#rtb',el),['الخطوة','ماذا يحدث؟'],RS.map(function(r){return [r[1],'']}));
  function strand(x,X0,Y,seq,dir,col,lab,al){var dx=74;x.globalAlpha=al==null?1:al;x.strokeStyle=col;x.lineWidth=10;x.lineCap='round';x.beginPath();x.moveTo(X0,Y);x.lineTo(X0+(N-1)*dx,Y);x.stroke();
    seq.split('').forEach(function(b,i){var X=X0+i*dx;x.fillStyle=BC[b];G.rr(x,X-16,dir>0?Y:Y-56,32,56,8);x.fill();G.T(x,b,X,dir>0?Y+30:Y-28,20,'#fff');x.fillStyle=col;x.beginPath();x.arc(X,Y,9,0,7);x.fill()});x.globalAlpha=1}
  var sim=G.sim(c,function(x,t,dt){x.fillStyle='#faf9ff';x.fillRect(0,0,1000,540);x.strokeStyle='rgba(110,90,180,.08)';for(var gx=0;gx<1000;gx+=40){x.beginPath();x.moveTo(gx,0);x.lineTo(gx,540);x.stroke()}
    if(st>=0&&k<1)k=Math.min(1,k+dt*.35);var X0=167,OLD='#5a2fc0',NEW='#ff6f91';
    if(st<0){strand(x,X0,214,TOP,1,OLD);strand(x,X0,326,BOT,-1,OLD);G.pill(x,'جزيء DNA الأصلي · المس «افصل السلسلتين»',500,470,'#fff','#4a249e',18)}
    if(st===0){var gap=k*120;strand(x,X0,214-gap,TOP,1,OLD);strand(x,X0,326+gap,BOT,-1,OLD);var ex=X0-40+k*(N*74);x.fillStyle='#2aa7c9';x.beginPath();x.ellipse(ex,270,40,60,0,0,7);x.fill();G.T(x,'إنزيم',ex,270,16,'#fff');}
    if(st===1){strand(x,X0,94,TOP,1,OLD);strand(x,X0,446,BOT,-1,OLD);var m=Math.floor(k*N+.001);for(var i=0;i<N;i++){var X=X0+i*74,fly=i<m?1:Math.max(0,k*N-i),yy1=154+(1-Math.min(1,fly))*60,yy2=386-(1-Math.min(1,fly))*60;
        if(fly>0){x.globalAlpha=Math.min(1,fly);x.fillStyle=BC[BOT[i]];G.rr(x,X-16,yy1,32,56,8);x.fill();G.T(x,BOT[i],X,yy1+28,20,'#fff');x.fillStyle=BC[TOP[i]];G.rr(x,X-16,yy2-56,32,56,8);x.fill();G.T(x,TOP[i],X,yy2-28,20,'#fff');x.globalAlpha=1}}
      if(k>=1){x.strokeStyle=NEW;x.lineWidth=10;x.beginPath();x.moveTo(X0,210);x.lineTo(X0+(N-1)*74,210);x.stroke();x.beginPath();x.moveTo(X0,330);x.lineTo(X0+(N-1)*74,330);x.stroke()}
      G.pill(x,'قواعد جديدة',890,270,'#fff','#c2185b',16)}
    if(st===2){var sp=k*30;strand(x,X0,40-sp*.3,TOP,1,OLD);strand(x,X0,152-sp*.3,BOT,-1,NEW);strand(x,X0,388+sp*.3,TOP,1,NEW);strand(x,X0,500+sp*.3,BOT,-1,OLD);
      G.pill(x,'جزيء ١',80,100,'#fff','#4a249e',16);G.pill(x,'جزيء ٢',80,445,'#fff','#4a249e',16);if(k>.6)G.pill(x,'جزيئان متطابقان: في كل منهما سلسلة أصلية وأخرى جديدة',500,270,'#1b1336','#fff',18)}
    if(st>=0&&k>=1&&!tb.has(st)){tb.fill(st,[RS[st][2]]);G.sfx.ok();if(tb.count()===3){$('#rEx',el).classList.add('shown');G.done('rep')}}});
  G.tools($('#rt',el),RS.map(function(r){return [r[0],r[1]]}),function(i,b,w){if(i>0&&!tb.has(i-1)){G.toast('شغّلوا الآلة خطوة خطوة بالترتيب');G.sfx.no();return}st=i;k=0;$$('.tool',w).forEach(function(z,j){z.classList.toggle('on',j===i)});G.sfx.pop()});
  var q=$('#rq',el);
  G.mcq(q,{id:'l1-copy',goal:2,lvl:1,q:'عندما يتضاعف DNA تكون النسخة الجديدة:',o:['مماثلة للنسخة الأصلية','مختلفة تمامًا عن الأصلية','نصف النسخة الأصلية','مكوّنة من RNA'],a:0,ex:'من الخلاصة: عندما يتضاعف DNA تكون النسخة الجديدة مماثلة للنسخة الأصلية.'});
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ١٠) م٥ من الجين إلى الصفة ===== */
var PR=[['a_trait','تحديد الصفات','البروتينات مسؤولة عن تحديد الصفات المختلفة للشخص، كطوله ولون عينيه ولون شعره.'],['a_tissue','بناء الأنسجة','تدخل البروتينات في بناء الأنسجة.'],['a_enz','العمل كإنزيمات','تعمل بعض البروتينات كإنزيمات.']];
S({id:'gene',name:'م٥ من الجين إلى الصفة',ic:'📍',manual:true,build:function(el){
  var R=lay(el,'المحطة ٥ · الجينات ص ١٢٤','من الجين إلى الصفة: اضغط على الكروموسوم',
   '<div class="cd" style="flex:1;min-height:0;display:flex;gap:14px;align-items:stretch"><div id="chr" style="width:120px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 0"></div><div style="flex:1;display:flex;flex-direction:column;gap:10px;min-width:0"><div class="cd" id="gv" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#faf8ff"><p class="big" style="margin:0">👈 المس أحد الجينات الملوّنة على الكروموسوم</p></div><p class="hint" style="margin:0">الكروموسوم الواحد يحتوي على <b>مئات الجينات</b>، وكل جين مسؤول عن تصنيع بروتين ما.</p></div></div>',
   cd('الجين (المورّث)','<p class="big" style="margin:0">جزء من DNA مسؤول عن تصنيع <b class="hl">بروتين</b> ما.</p>')+'<div class="cd"><h3>البروتينات تؤدي أدوارًا كثيرة</h3><div id="pr" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px"></div></div>'+
   '<div class="cd"><h3>🤔 ناقش</h3><p style="margin:0;font-size:19px">ماذا يحدث لخلايا الجسم عندما لا يُصنع بروتين ما، أو يحدث خلل في تصنيعه لسبب ما؟</p><div class="acts"><button class="b o" data-rv>اعرض الإجابة</button></div><div class="fb ok reveal" id="gEx">قد لا تؤدي الخلايا وظائفها بصورة سليمة؛ فيظهر خلل في الصفة أو في وظيفة النسيج أو الإنزيم الذي يعتمد على هذا البروتين.</div></div><div id="gq"></div>');
  var G1=[['#e23e64','جين لون العينين','👁','بروتينات تحدد لون العينين'],['#1f84cc','جين لون الشعر','💇','بروتينات تحدد لون الشعر'],['#0f9a72','جين إنزيم هاضم','⚙','إنزيم يساعد على هضم الغذاء'],['#e6a100','جين بروتين عضلي','💪','بروتين يدخل في بناء نسيج العضلات']],seen={};
  var chr=$('#chr',el);for(var i=0;i<22;i++){var gi=[3,8,14,18].indexOf(i),seg=h('<button style="width:'+(i===11?46:70)+'px;height:'+(i===11?10:24)+'px;border:0;border-radius:6px;background:'+(gi>=0?G1[gi][0]:(i%2?'#d9d2f2':'#c4bce0'))+';padding:0;'+(gi>=0?'box-shadow:0 0 0 3px #fff,0 0 12px '+G1[gi][0]+';cursor:pointer':'cursor:default')+'" '+(gi>=0?'data-g="'+gi+'"':'')+'></button>');chr.appendChild(seg)}
  $$('[data-g]',chr).forEach(function(b){b.onclick=function(){var g=G1[+b.dataset.g];seen[b.dataset.g]=1;$('#gv',el).innerHTML='<div style="margin-bottom:10px">'+B('ATGCCA')+'</div><div style="font-size:26px;font-family:var(--disp);color:'+g[0]+'">'+g[1]+'</div><div style="font-size:40px">⬇</div><div style="font-size:22px">يُصنع البروتين في الرايبوسوم</div><div style="font-size:40px">⬇</div><div style="font-size:60px">'+g[2]+'</div><b style="font-size:22px">'+g[3]+'</b>';G.sfx.ok();if(Object.keys(seen).length===4)G.done('gene')}});
  var pr=$('#pr',el);PR.forEach(function(p){pr.appendChild(h('<div style="text-align:center">'+img(p[0],'width:100%;height:100px;object-fit:contain;background:#fff')+'<b style="display:block;font-family:var(--disp);margin-top:4px">'+p[1]+'</b><small class="hint">'+p[2]+'</small></div>'))});
  $('[data-rv]',el).onclick=function(){$('#gEx',el).classList.add('shown');G.sfx.pop()};
  var q=$('#gq',el);
  
  return {}}});

/* ===== ١١) م٦ مصنع البروتين ===== */
var PF=[['📝','انسخ الشفرة في النواة','يُصنع RNA الرسول (mRNA) في النواة نسخةً من DNA.'],['🚪','أرسل الرسول إلى الرايبوسوم','يخرج mRNA من النواة إلى الرايبوسوم في السيتوبلازم حاملًا شفرة تصنيع البروتين.'],['🔗','ابنِ البروتين','يحمل tRNA الأحماض الأمينية، ويربطها rRNA في الرايبوسوم حسب الشفرة، فتتكوّن سلسلة البروتين.']];
S({id:'prot',name:'م٦ مصنع البروتين',ic:'🏭',manual:true,build:function(el){
  var R=lay(el,'المحطة ٦ · تصنيع البروتينات ص ١٢٤–١٢٥','مصنع البروتين: من النواة إلى الرايبوسوم',
   '<canvas class="sim" id="pc" width="1000" height="540" style="flex:1;min-height:0;height:100%"></canvas><div id="pt"></div>',
   '<div class="cd"><h3>DNA أم RNA؟</h3><table class="rt"><tr><th>وجه المقارنة</th><th>DNA</th><th>RNA</th></tr><tr><td>عدد السلاسل</td><td>سلسلتان</td><td>سلسلة واحدة</td></tr><tr><td>السكر</td><td>خماسي منقوص الأكسجين</td><td>خماسي الكربون</td></tr><tr><td>القواعد</td><td>'+L_('A G C T')+'</td><td>'+L_('A G C U')+'</td></tr><tr><td>أين يوجد؟</td><td>النواة</td><td>يُصنع في النواة وينتقل إلى السيتوبلازم</td></tr></table></div>'+
   '<div id="ptb"></div><div class="cd reveal" id="pEx">'+img('a_synth','width:100%;height:240px;object-fit:contain;background:#fff')+'<p style="margin:6px 0 0;font-size:17px">يتم على الرايبوسوم ترجمة RNA المنسوخ عن DNA إلى بروتين معين.</p></div><div id="pq"></div>');
  var c=$('#pc',el),st=-1,k=0,AA=['#ff6f91','#ffd166','#7ff0c8','#8fc9ff','#c9b8ff','#ffa36c'];
  var tb=G.table($('#ptb',el),['نوع RNA','اسمه','دوره'],[['mRNA','',''],['tRNA','',''],['rRNA','','']]);
  function trna(x,X,Y,col){x.strokeStyle='#e08a00';x.lineWidth=6;x.beginPath();x.moveTo(X,Y);x.lineTo(X,Y-40);x.moveTo(X-22,Y-40);x.lineTo(X+22,Y-40);x.moveTo(X,Y-40);x.lineTo(X,Y-62);x.stroke();x.fillStyle=col;x.beginPath();x.arc(X,Y-74,13,0,7);x.fill()}
  var sim=G.sim(c,function(x,t,dt){x.fillStyle='#fdf3f7';x.fillRect(0,0,1000,540);if(st>=0&&k<1)k=Math.min(1,k+dt*.3);
    x.fillStyle='#e9e0ff';x.strokeStyle='#8b6fd6';x.lineWidth=5;x.beginPath();x.ellipse(220,280,170,170,0,0,7);x.fill();x.stroke();x.fillStyle='#fdf3f7';[[-.9],[.9]].forEach(function(a){x.beginPath();x.arc(220+Math.cos(a[0])*170,280+Math.sin(a[0])*170,12,0,7);x.fill()});G.T(x,'النواة',220,140,22,'#4a249e');
    x.strokeStyle='#5a2fc0';x.lineWidth=6;x.beginPath();for(var i=0;i<=40;i++){var X=110+i*5.5,Y=280+Math.sin(i*.6+t)*22;i?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();G.T(x,'DNA',220,330,20,'#5a2fc0');
    x.fillStyle='#4fbfa8';x.beginPath();x.ellipse(730,300,150,60,0,0,7);x.fill();x.fillStyle='#3aa18c';x.beginPath();x.ellipse(730,370,170,50,0,0,7);x.fill();G.T(x,'رايبوسوم',730,410,20,'#fff');
    var mx;if(st===0){var L=k*200;x.strokeStyle='#8b5cf6';x.lineWidth=6;x.beginPath();x.moveTo(120,255);x.lineTo(120+L,255);x.stroke();G.pill(x,'نسخ mRNA عن DNA',220,210,'#fff','#8b5cf6',17)}
    if(st>=1){var p=st===1?k:1;var sx=120+p*(560),sy=255+p*(345-255);x.strokeStyle='#8b5cf6';x.lineWidth=7;x.beginPath();x.moveTo(sx,sy);x.lineTo(sx+220,sy);x.stroke();for(var j=0;j<10;j++){var bx=sx+10+j*22;x.fillStyle=['#0f9a72','#8b5cf6','#1f84cc','#e6a100'][j%4];x.fillRect(bx-4,sy-14,8,14)}G.pill(x,'mRNA الرسول',sx+110,sy+30,'#fff','#8b5cf6',16)}
    if(st===2){var m=Math.floor(k*6);for(var a=0;a<6;a++){var on=a<m,X=640+a*30;if(!on&&a===m){var f=k*6-m;trna(x,600+f*0+a*30,120+f*200,AA[a])}}
      for(var b=0;b<m;b++){x.fillStyle=AA[b];x.beginPath();x.arc(700-b*34,220-b*18,15,0,7);x.fill();if(b){x.strokeStyle='#fff';x.lineWidth=4;x.beginPath();x.moveTo(700-b*34,220-b*18);x.lineTo(700-(b-1)*34,220-(b-1)*18);x.stroke()}}
      trna(x,760,330,AA[Math.min(5,m)]);G.pill(x,'tRNA يحمل حمضًا أمينيًّا',860,200,'#fff','#e08a00',16);if(m>2)G.pill(x,'سلسلة البروتين',560,110,'#fff','#c2185b',17);G.pill(x,'rRNA',840,300,'#fff','#2e8b57',15)}
    if(st<0)G.pill(x,'شغّل خط الإنتاج خطوة خطوة',500,40,'#fff','#4a249e',18);
    if(st>=0&&k>=1&&!fl[st]){fl[st]=1;if(st===0)st0=1;else if(st===1){tb.fill(0,['الرسول','نسخة من DNA تنتقل بين النواة والرايبوسوم حاملة شفرة تصنيع البروتين'])}else{tb.fill(1,['الناقل','يحمل الأحماض الأمينية ويربطها حسب الشفرة التي يحملها الرسول']);tb.fill(2,['الرايبوسومي','يوجد في الرايبوسومات ويربط الأحماض الأمينية في سلسلة عديد الببتيد'])}G.sfx.ok();if(tb.count()===3){$('#pEx',el).classList.add('shown');G.done('prot')}}});
  var st0=0,fl={};
  G.tools($('#pt',el),PF.map(function(r){return [r[0],r[1]]}),function(i,b,w){if(i===1&&!st0){G.toast('انسخوا الشفرة أولًا');G.sfx.no();return}if(i===2&&!tb.has(0)){G.toast('أرسلوا الرسول أولًا');G.sfx.no();return}st=i;k=0;$$('.tool',w).forEach(function(z,j){z.classList.toggle('on',j===i)});G.sfx.pop()});
  var q=$('#pq',el);
  
  
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ١٢) م٧ مختبر الطفرات ===== */
var GENE='ATGGCTTACGAA',AGT=[['☢','أشعة سينية'],['☀','ضوء الشمس'],['🧪','مواد كيميائية']];
S({id:'mut',name:'م٧ مختبر الطفرات',ic:'🦜',manual:true,build:function(el){
  var R=lay(el,'المحطة ٧ · الطفرة ص ١٢٦–١٢٧','مختبر الطفرات: ماذا لو تغيّر حرف واحد؟',
   '<div class="cd" style="display:flex;gap:10px;align-items:center">'+img('a_par1','width:200px;height:130px')+img('a_par2','width:200px;height:130px')+'<p style="margin:0;font-size:18px;line-height:1.6">هذا <b>الببغاء الأفريقي الرمادي (الكاسكو)</b>… فماذا عن الآخر؟ هل هو من النوع نفسه؟ <button class="b o" data-rp style="padding:4px 12px;font-size:15px">الإجابة</button><span class="reveal" id="parA"><br><b class="hl">نعم، من النوع نفسه</b>، لكن لونه تغيّر بسبب طفرة.</span></p></div>'+
   '<div class="cd" style="flex:1;min-height:0"><h3>🧬 محرر الجين</h3><div id="gn" class="seq" style="margin:6px 0 10px"></div><div style="display:flex;align-items:center;gap:12px;justify-content:center"><b style="font-family:var(--disp)">البروتين الناتج:</b><div id="pp" style="display:flex;gap:6px;direction:ltr"></div><span id="ps" class="tag o">بروتين طبيعي</span></div><div id="ag" style="margin-top:10px"></div><div class="acts" style="justify-content:center"><button class="b g" id="rs">↺ أعد الجين الطبيعي</button></div></div>',
   cd('الطفرة','<p style="margin:0;font-size:18px;line-height:1.7">هي <b class="hl">تغيّر دائم</b> في تسلسل DNA المكوّن للكروموسوم في الخلية، نتيجة انحراف في نسخ DNA، مما ينتج عنه تصنيع بروتينات غير متطابقة.</p>')+'<div id="mtb"></div>'+
   '<div class="cd"><h3>أين حدثت الطفرة؟</h3><div class="acts" style="margin:0"><button class="b s" data-c="0">🫀 في خلية جسمية</button><button class="b" data-c="1">🥚 في خلية جنسية</button></div><div id="cr" style="margin-top:8px"></div></div>'+
   '<div class="cd"><h3>أمثلة من العرض</h3><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">'+['a_tulip','a_rooster','a_deer','a_cat'].map(function(k){return img(k,'width:100%;height:90px')}).join('')+'</div><p style="margin:6px 0 0;font-size:17px">بعض الطفرات مفيدة لإنتاج سلالة ذات صفات مرغوب فيها كما في النباتات، لكن <b class="hl">الكثير من الطفرات مضر</b> بالمخلوق الحي، وقد تسبب موته غالبًا.</p></div>'+
   '<div class="cd"><h3>🔮 توقّع</h3><div style="display:flex;gap:10px;align-items:center">'+img('a_flies','width:170px;height:110px')+'<p style="margin:0;font-size:17px">تُصاب ذبابة الفاكهة بسبب خلل في الكروموسوم ٢ بطفرة ينتج عنها أجنحة قصيرة لا تمكّنها من الطيران. ما الفرق بين الذبابتين؟ وهل تنتقل هذه الطفرة إلى الأبناء؟</p></div><div class="acts"><button class="b o" data-rf>اعرض الإجابة</button></div><div class="fb ok reveal" id="flA">الفرق: إحداهما أجنحتها طبيعية، والأخرى أجنحتها قصيرة. وتنتقل الطفرة إلى الأبناء إذا كانت في الخلايا الجنسية؛ لأن الأبناء يرثون DNA من خلاياها الجنسية.</div></div><div id="mq"></div>');
  var g=GENE.split(''),changed=-1;var tb=G.table($('#mtb',el),['العامل','ماذا حدث للجين؟','البروتين'],AGT.map(function(a){return [a[1],'','']}));
  function bead(i){var s=g.slice(i*3,i*3+3).join(''),o=GENE.substr(i*3,3);return s===o?['#7ff0c8','#ffd166','#8fc9ff','#ff9fb7'][i]:'#3b3150'}
  function draw(res){$('#gn',el).innerHTML=g.map(function(b,i){return '<span class="base '+b+'" style="'+(i===changed?'outline:4px solid #e2483d;transform:scale(1.15)':'')+(i%3===2?';margin-inline-end:10px':'')+'">'+b+'</span>'}).join('');
    var pp=$('#pp',el);if(res==='none'){pp.innerHTML='<span style="font-size:30px">🚫</span>';$('#ps',el).className='tag';$('#ps',el).textContent='لا يُصنع البروتين'}else{pp.innerHTML=[0,1,2,3].map(function(i){return '<span style="width:38px;height:38px;border-radius:50%;background:'+bead(i)+';box-shadow:0 2px 0 rgba(0,0,0,.2)"></span>'}).join('');var bad=changed>=0;$('#ps',el).className='tag '+(bad?'t':'o');$('#ps',el).textContent=bad?'بروتين غير طبيعي':'بروتين طبيعي'}}
  draw();
  G.tools($('#ag',el),AGT,function(i,b){g=GENE.split('');var p=[4,7,10][i];var opts=['A','T','C','G'].filter(function(x){return x!==g[p]});g[p]=opts[i%3];changed=p;var res=i===2?'none':'bad';draw(res);G.sfx.no();
    tb.fill(i,['تغيّر الحرف رقم '+n(p+1)+' في تسلسل الجين',res==='none'?'لم يُصنع':'غير طبيعي']);if(tb.count()===3)G.done('mut')});
  $('#rs',el).onclick=function(){g=GENE.split('');changed=-1;draw();G.sfx.pop()};
  $('[data-rp]',el).onclick=function(){$('#parA',el).classList.add('shown');G.sfx.pop()};$('[data-rf]',el).onclick=function(){$('#flA',el).classList.add('shown');G.sfx.pop()};
  $$('[data-c]',el).forEach(function(b){b.onclick=function(){$('#cr',el).innerHTML=b.dataset.c==='0'?'<div class="fb ok"><b>خلية جسمية:</b> قد تؤثر الطفرة في الفرد نفسه (في النسيج الذي حدثت فيه)، لكنها <b>لا تنتقل إلى الأبناء</b>.</div>':'<div class="fb no"><b>خلية جنسية:</b> يمكن أن <b>تنتقل الطفرة إلى الأبناء</b> فتظهر آثارها في الجيل التالي.</div>';G.sfx.pop()}});
  var q=$('#mq',el);
  G.mcq(q,{id:'l1-cause',goal:3,lvl:1,q:'من العوامل التي تسبب الطفرات:',o:['الأشعة السينية','الماء النقي','الهواء النقي','النوم'],a:0,ex:'ومنها أيضًا ضوء الشمس وبعض المواد الكيميائية.'});
  return {}}});

/* ===== ١٣) م٨ التقويم وحل أسئلة الكتاب ===== */
S({id:'qa',name:'م٨ التقويم وحل أسئلة الكتاب',ic:'✍',build:function(el){
  el.innerHTML='<div class="ey">المحطة ٨ · تقويم الدرس الأول</div><h1 class="t">تقويم متنوع… وحلول أسئلة الكتاب</h1><div class="row grow"><div class="col scroll" id="qL" style="flex:1"></div><div class="col scroll" id="qR" style="flex:1"><div class="cd tape"><h3 style="margin:0">📗 حلول «اختبر نفسك» وأسئلة العرض</h3></div></div></div>';
  var L=$('#qL',el);
  L.insertAdjacentHTML('beforeend','<div class="cd tape"><h3 style="margin:0">📝 أسئلة العرض: السؤال ١ والسؤال ٢</h3></div>');
  G.mcq(L,{id:'l1-m',goal:4,lvl:1,kind:'السؤال ١ · فقرة ١',q:'تُنقل الشفرة الخاصة بصنع بروتين إلى الرايبوسومات بواسطة:',o:['RNA','RNA الناقل','RNA الرايبوسومي','RNA الرسول'],a:3,ex:'RNA الرسول (mRNA).',keep:true});
  G.mcq(L,{id:'l1-mut',goal:3,lvl:1,kind:'السؤال ١ · فقرة ٢',q:'أي تغيّر دائم في تسلسل DNA في جين أو كروموسوم الخلية:',o:['التهجين','الإخصاب','التخمر','الطفرة الوراثية'],a:3,ex:'الطفرة.',keep:true});
  G.mcq(L,{id:'l1-u',goal:3,lvl:1,kind:'السؤال ١ · فقرة ٣',q:'أي القواعد النيتروجينية لا توجد في DNA؟',o:['الثايمين','اليوراسيل','السايتوسين','الجوانين'],a:1,ex:'اليوراسيل يوجد في RNA بدلًا من الثايمين.',keep:true});
  G.mcq(L,{id:'l1-gc',goal:2,lvl:2,kind:'السؤال ١ · فقرة ٤',q:'ما ترتيب القواعد النيتروجينية في سلسلة DNA إذا كان ترتيبها في السلسلة الأخرى <span class="ltr">GCTAAG</span>؟',o:['<span class="ltr">ATAGGA</span>','<span class="ltr">CGAUUC</span>','<span class="ltr">CGATTC</span>','<span class="ltr">GCTAAG</span>'],a:2,ex:'G↔C و A↔T، ولا يوجد U في DNA.',keep:true});
  G.mcq(L,{id:'l1-aa',goal:1,lvl:1,kind:'السؤال ١ · فقرة ٥',q:'تتكوّن البروتينات من وحدات بنائية ترتبط معًا وتسمى:',o:['رايبوسومات','أحماض أمينية','مريكزات','أحماض دهنية'],a:1,ex:'البروتين مركب عضوي ضخم يتكوّن من الأحماض الأمينية.',keep:true});
  G.mcq(L,{id:'l1-at',goal:3,lvl:1,kind:'السؤال ١ · فقرة ٦',q:'في جزيء DNA يرتبط الأدنين دائمًا مع:',o:['الثايمين','اليوراسيل','السايتوسين','الجوانين'],a:0,ex:'A مع T.',keep:true});
  G.tf(L,{id:'l1-tfr',goal:4,lvl:1,q:'(أ) RNA الرايبوسومي يكوّن الرايبوسومات، حيث يتم بناء البروتينات.',v:true,ex:'صحيح.'});
  G.tf(L,{id:'l1-tf1',goal:1,lvl:1,q:'(ب) في DNA يتكوّن جانبا السلم من جزيئات السكر والفوسفات.',v:true,ex:'صحيح.'});
  G.tf(L,{id:'l1-tf2',goal:3,lvl:2,q:'(ج) لا يتأثر المخلوق الحي إذا حدثت الطفرة في الخلايا الجنسية.',v:false,ex:'الطفرة في الخلايا الجنسية تنتقل إلى الأبناء فتظهر آثارها فيهم.'});
  G.tf(L,{id:'l1-tfp',goal:1,lvl:1,q:'(د) البروتينات هي المسؤولة عن تحديد الصفات المختلفة للشخص كطوله ولون عينيه ولون الشعر.',v:true,ex:'صحيح.'});
  L.insertAdjacentHTML('beforeend','<div class="cd tape"><h3 style="margin:0">✍ تقويم إضافي</h3></div>');
  G.cloze(L,{id:'l1-cl',goal:1,lvl:1,text:'يتكوّن جانبا سلم DNA من [[السكر]] و[[الفوسفات]]، أما الدرجات فمن [[القواعد النيتروجينية]]. وينقل RNA [[الرسول]] شفرة البروتين إلى [[الرايبوسوم]].',extra:['النواة','الناقل']});
  G.sort(L,{id:'l1-sr',goal:3,lvl:2,q:'صنّف كل خاصية: DNA أم RNA؟',bins:['DNA','RNA'],items:[['سلسلتان',0],['سلسلة واحدة',1],['يحتوي الثايمين T',0],['يحتوي اليوراسيل U',1],['يبقى في النواة',0],['ينتقل إلى الرايبوسوم',1]]});
  
  
  G.mcq(L,{id:'l1-t',goal:4,lvl:2,q:'ما دور tRNA؟',o:['يحمل الأحماض الأمينية ويربطها حسب شفرة الرسول','ينسخ DNA في النواة','يكوّن غشاء الخلية','يفصل سلسلتي DNA'],a:0,ex:'الناقل.'});
  G.solutions($('#qR',el),[
   {src:'اختبر نفسك ١',q:'صف كيف تحدث عملية تضاعف DNA؟',a:'١) يفصل إنزيم معيّن سلسلتي DNA إحداهما عن الأخرى.<br>٢) ترتبط قواعد نيتروجينية جديدة بالقواعد الأصلية في كل سلسلة: A مع T، وC مع G.<br>٣) ينتج جزيئان جديدان متطابقان من DNA، كل منهما مماثل للأصل. وتحدث في الطور البيني قبل الانقسام.'},
   {src:'اختبر نفسك ٢',q:'وضّح كيف تنتقل شفرة تصنيع البروتينات من النواة إلى الرايبوسومات؟',a:'توجد الجينات في النواة، فيُصنع <b>RNA الرسول (mRNA)</b> نسخةً من DNA، ثم يخرج من النواة إلى الرايبوسوم في السيتوبلازم حاملًا الشفرة، وهناك يحمل tRNA الأحماض الأمينية ويربطها حسب الشفرة.'},
   {src:'اختبر نفسك ٣',q:'طبّق: إذا كان ترتيب القواعد في سلسلة من DNA هو <span class="ltr">AGTAAC</span>، فبيّن ترتيب القواعد في السلسلة المقابلة لها.',a:'<span class="ltr">AGTAAC</span> ← <b class="ltr">TCATTG</b><br>(A↔T و G↔C).'},
   {src:'اختبر نفسك ٤',q:'حدّد ما دور tRNA في عملية بناء البروتينات؟',a:'يحمل <b>الأحماض الأمينية</b> إلى الرايبوسوم ويربطها حسب الشفرة التي يحملها RNA الرسول.'},
   {src:'اختبر نفسك ٥ · التفكير الناقد',q:'قارن بين DNA في خلايا الدماغ وDNA في خلايا القلب.',a:'DNA <b>متماثل</b> فيهما؛ لأن جميع خلايا الجسم نتجت من انقسام خلية واحدة، ويحمل كل منها نسخة مماثلة من DNA. أما الاختلاف بين الخليتين فيرجع إلى أن كل خلية تستعمل جينات مختلفة لتصنيع البروتينات التي تحتاج إليها في وظيفتها.'},
   {src:'سؤال العرض',q:'ماذا يحدث لخلايا الجسم عندما لا يُصنع بروتين ما، أو يحدث خلل في تصنيعه؟',a:'لا تؤدي الخلايا وظائفها بصورة سليمة، فيظهر خلل في الصفة أو في النسيج أو الإنزيم الذي يعتمد على هذا البروتين.'},
   {src:'سؤال العرض',q:'من يقوم بنقل شفرة تصنيع البروتينات من النواة إلى الرايبوسومات؟',a:'<b>RNA</b>، وتحديدًا RNA الرسول (mRNA).'},
   {src:'سؤال العرض',q:'ذبابة الفاكهة قصيرة الأجنحة: هل تنتقل هذه الطفرة إلى الأبناء؟',a:'نعم إذا كانت في الخلايا الجنسية؛ فالأبناء يرثون DNA الموجود فيها.'},
   {src:'تقويم العرض',q:'ترتيب القواعد في السلسلة المقابلة لـ <span class="ltr">GCTAAG</span>:',a:'جـ) <b class="ltr">CGATTC</b>'}]);
  $('#qR',el).insertAdjacentHTML('beforeend','<div class="cd" style="background:#f6f2ff"><p style="margin:0;font-size:16px">📌 أسئلة «ماذا قرأت؟» في الكتاب غير موجودة في العرض؛ يمكن إضافة حلولها عند تزويدنا بصور صفحاتها.</p></div>');
  return {}}});

/* ===== ١٤) م٩ المسابقة ===== */
function MQ(l,q,o,a,ex){return {l:l,q:q,o:o,a:a,ex:ex}}
var TF=['صح','خطأ'];
var BANK=[MQ(1,'تُنقل شفرة صنع البروتين إلى الرايبوسومات بواسطة:',['RNA الرسول','RNA الناقل','RNA الرايبوسومي','DNA'],0,'mRNA.'),MQ(1,'أي القواعد لا توجد في DNA؟',['اليوراسيل','الثايمين','السايتوسين','الجوانين'],0,'U في RNA.'),
 MQ(1,'في DNA يرتبط الأدنين دائمًا مع:',['الثايمين','السايتوسين','الجوانين','اليوراسيل'],0,'A مع T.'),MQ(1,'يرتبط الجوانين في DNA مع:',['السايتوسين','الأدنين','الثايمين','اليوراسيل'],0,'G مع C.'),
 MQ(1,'تتكوّن البروتينات من:',['أحماض أمينية','أحماض دهنية','رايبوسومات','مريكزات'],0,'الأحماض الأمينية.'),MQ(1,'تغيّر دائم في تسلسل DNA:',['الطفرة','التهجين','الإخصاب','التخمر'],0,'الطفرة.'),
 MQ(1,'أين تُصنع البروتينات؟',['في الرايبوسومات','في النواة','في الغشاء البلازمي','في الفجوات'],0,'في الرايبوسومات الموجودة في السيتوبلازم.'),MQ(1,'جزء من DNA مسؤول عن تصنيع بروتين ما:',['الجين','الرايبوسوم','الحمض الأميني','الكروموسوم كاملًا'],0,'الجين (المورّث).'),
 MQ(1,'يتكوّن جانبا سلم DNA من السكر والفوسفات.',TF,0,'صحيح.'),MQ(1,'يتكوّن RNA من سلسلتين.',TF,1,'من سلسلة واحدة.'),MQ(1,'تعمل بعض البروتينات كإنزيمات.',TF,0,'صحيح.'),
 MQ(2,'استعملت الأشعة السينية لمعرفة أن DNA سلسلتان كالسلم الحلزوني:',['روزاليند فرانكلين','مندل','نيوتن','واطسون وحده'],0,'عام ١٩٥٢م.'),MQ(2,'بنى نموذج DNA عام ١٩٥٣م:',['واطسون وكريك','فرانكلين ومندل','نيوتن وكريك','مندل وواطسون'],0,'واطسون وكريك.'),
 MQ(2,'يحمل الأحماض الأمينية ويربطها حسب شفرة الرسول:',['tRNA','mRNA','rRNA','DNA'],0,'الناقل.'),MQ(2,'يوجد في الرايبوسومات ويربط الأحماض الأمينية في سلسلة:',['rRNA','mRNA','tRNA','DNA'],0,'الرايبوسومي.'),
 MQ(2,'متى يتضاعف DNA؟',['في الطور البيني قبل الانقسام','بعد موت الخلية','أثناء الهضم','في الرايبوسوم'],0,'في الطور البيني.'),MQ(2,'من العوامل المسببة للطفرات:',['ضوء الشمس','الماء','الأكسجين','السكر'],0,'وأيضًا الأشعة السينية وبعض المواد الكيميائية.'),
 MQ(2,'الطفرة في الخلايا الجسمية تنتقل إلى الأبناء.',TF,1,'لا تنتقل؛ التي تنتقل هي الطفرة في الخلايا الجنسية.'),MQ(2,'يحتوي الكروموسوم الواحد على مئات الجينات.',TF,0,'صحيح.'),
 MQ(2,'إذا كانت كمية الأدنين في عينة DNA ٣٠٪ فكمية الثايمين:',['٣٠٪','٢٠٪','٧٠٪','٤٠٪'],0,'كمية A تساوي كمية T.'),MQ(2,'السكر في DNA:',['خماسي منقوص الأكسجين','سداسي','الجلوكوز','سكر القصب'],0,'ولذلك سُمّي منقوص الأكسجين.'),
 MQ(3,'السلسلة المقابلة لـ AGTAAC هي:',['TCATTG','UCAUUG','AGTAAC','GACTTA'],0,'A↔T و G↔C.'),MQ(3,'السلسلة المقابلة لـ GCTAAG هي:',['CGATTC','CGAUUC','ATAGGA','GCTAAG'],0,'لا يوجد U في DNA.'),
 MQ(3,'لماذا يتشابه DNA في خلايا الدماغ وخلايا القلب للشخص نفسه؟',['لأن خلايا الجسم كلها نتجت من انقسام خلية واحدة','لأنهما يقومان بالوظيفة نفسها','لأن الدماغ يرسل DNA إلى القلب','لا يتشابهان'],0,'تحمل كل خلية نسخة مماثلة من DNA.'),
 MQ(3,'ماذا يحدث إذا لم يُنسخ DNA كما هو بالأصل؟',['تنتج طفرة تؤدي إلى تصنيع بروتين بطريقة غير سليمة','يتوقف القلب فورًا','يتحول DNA إلى RNA','لا يحدث شيء أبدًا'],0,'من الخلاصة.'),
 MQ(3,'لماذا تظهر خيوط DNA عند إضافة الكحول البارد في تجربة الاستخلاص؟',['لأن DNA لا يذوب في الكحول البارد فينفصل','لأن الكحول يصنع DNA','لأن الكحول يذيب DNA','لأن الكحول يلوّن الماء'],0,'ينفصل DNA فوق السائل.'),
 MQ(3,'في جزيء DNA عدد قواعد C يساوي ٤٠، فكم عدد قواعد G؟',['٤٠','٢٠','٨٠','١٠'],0,'كمية C تساوي كمية G.'),MQ(3,'بعض الطفرات تكون مفيدة لإنتاج سلالات نباتية ذات صفات مرغوب فيها.',TF,0,'صحيح.')];
BANK.forEach(function(q,i){q.id='g9c4a-'+(i+1);if(/^[ACGTU]+$/.test(q.o[0]))q.o=q.o.map(function(s){return '<span class="ltr">'+s+'</span>'})});
BANK.forEach(function(q){q.q=q.q.replace(/\b([ACGTU]{5,})\b/g,'<span class="ltr">$1</span>')});

/* ===== الخلاصة (كما في العرض) ===== */
S({id:'sum',name:'م٩ الخلاصة',ic:'📌',build:function(el){var SEC=[['ما مادة الوراثة؟',['يتكوّن جانبا السلم المكوّن لـ DNA من جزيئات السكر والفوسفات، أما الدرجات فتتكوّن من القواعد النيتروجينية.','عندما يتضاعف DNA تكون النسخ الجديدة مماثلة للنسخة الأصلية.']],['الجينات',['تحمل الجينات داخل نواة الخلية طريقة تصنيع البروتينات حسب نوعها، حيث تُصنع البروتينات في الرايبوسومات الموجودة في السيتوبلازم.','هناك ثلاثة أنواع من RNA، هي: mRNA وtRNA وrRNA.']],['الطفرة',['إذا لم يُنسخ DNA كما هو بالأصل تنتج الطفرة التي تؤدي إلى تصنيع بروتين بطريقة غير سليمة.']]];
  el.innerHTML='<div class="ey">المحطة ٩ · الخلاصة ص ١٢٧</div><h1 class="t">الخلاصة</h1><div class="col scroll grow"><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;align-content:start">'+SEC.map(function(s,i){return '<div class="cd'+(i?' reveal':'')+'"><h3>'+s[0]+'</h3><ul style="margin:0;font-size:18px;line-height:1.8">'+s[1].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'}).join('')+'</div><p class="hint" style="margin:6px 0 0">اضغط «كشف» لإظهار القسم التالي.</p></div>';
  return {enter:function(){G.done('sum')},reveal:function(){var r=$$('.reveal:not(.shown)',el);if(r.length){r[0].classList.add('shown');return true}return false}}}});
S({id:'contest',name:'م١٠ سباق اللولب المزدوج (إثرائي)',ic:'🏁',manual:true,build:function(el){return G.contest(el,{ey:'المحطة ١٠ · إثرائي: مسابقة الفرق الأربعة',title:'سباق اللولب المزدوج: مادة الوراثة',bank:BANK})}});

/* ===== ١٥) الختام ===== */
S({id:'review',name:'م١١ الختام وبطاقة الخروج',ic:'🎟',build:function(el){return G.review(el,{antKey:'l1',ant:ANT,goals:[
  {t:GO[0],how:'استخلصنا DNA وتتبعنا قصة اكتشافه',st:['disc','extract'],q:['l1-tl','l1-fr','l1-ex']},
  {t:GO[1],how:'شغّلنا آلة التضاعف خطوة خطوة',st:['rep'],q:['l1-gc','l1-copy']},
  {t:GO[2],how:'بنينا نموذج السلم الحلزوني',st:['model'],q:['l1-at','l1-side']},
  {t:GO[3],how:'زرنا مصنع البروتين',st:['prot'],q:['l1-m','l1-tfr','l1-t']}],
  exit:[{id:'l1-x1',goal:3,lvl:1,q:'القاعدة التي ترتبط مع السايتوسين في DNA:',o:['الجوانين','الأدنين','الثايمين','اليوراسيل'],a:0,ex:'G مع C.'},{id:'l1-x2',goal:4,lvl:1,q:'نوع RNA الذي يحمل شفرة البروتين من النواة إلى الرايبوسوم:',o:['mRNA الرسول','tRNA الناقل','rRNA الرايبوسومي','DNA'],a:0,ex:'الرسول.'},{t:'tf',id:'l1-x3',goal:3,lvl:2,q:'جميع الطفرات ضارة.',v:false,ex:'بعضها مفيد، كما في إنتاج سلالات نباتية مرغوب فيها.'}],
  hw:['حُلّ أسئلة «اختبر نفسك» ص ١٢٧.','اكتب تسلسلًا من ٨ قواعد لسلسلة DNA، ثم اكتب السلسلة المقابلة لها.']})}});

TV=G.termSetup(L,TERMS,[{id:'disc',pg:'ص ١٢٢',i:[0]},{id:'model',pg:'ص ١٢٣',i:[1]},{id:'gene',pg:'ص ١٢٤',i:[2,3]},{id:'prot',pg:'ص ١٢٤–١٢٥',i:[4,5,6,7]},{id:'mut',pg:'ص ١٢٦',i:[8]}]);
G.lesson('l1',L);
})();
