/* الدرس الثاني: التجوية والتعرية وأثرهما (ص ١٧٤–١٨٩) */
(function(){
"use strict";
var G=window.G,$=G.$,$$=G.$$,n=G.n,h=G.h,img=G.img;
function cd(t,b,st){return '<div class="cd" style="'+(st||'')+'">'+(t?'<h3>'+t+'</h3>':'')+b+'</div>'}
function lay(el,ey,title,left,right,lf){el.innerHTML='<div class="ey">'+ey+'</div><h1 class="t">'+title+'</h1><div class="row grow"><div class="col" style="flex:'+(lf||1.35)+'">'+left+'</div><div class="col scroll grow" id="R">'+right+'</div></div>';return $('#R',el)}
var GO=['أن يحدّد الطالب العمليات التي تؤدي إلى تكسّر الصخور.','أن يصف الطالب العمليات التي تؤدي إلى تغيّر البنية الكيميائية في الصخر.','أن يوضّح الطالب كيف تكوّنت التربة.','أن يحدّد الطالب عوامل التعرية.','أن يصف الطالب آثار التعرية.'];
var ANT=[['التجوية عملية ميكانيكية أو كيميائية تحدث لسطح الأرض، وينتج عنها تفتت الصخور إلى قطع أصغر.',true,'هذا تعريف التجوية.'],['يُمكن للنباتات أن تسبب تجوية ميكانيكية.',true,'تنمو الجذور داخل شقوق الصخور فتوسعها وتكسرها.'],['لا يطرأ أي تغيير على التركيب الكيميائي للصخرة أثناء أي من عمليات التجوية.',false,'في التجوية الكيميائية يتغيّر التركيب الكيميائي للصخور والمعادن.'],['يُعد كل من الزحف والسقوط والانزلاق الصخري والتدفق الطيني من عوامل التعرية التي تُدعى حركة الكتل الأرضية.',true,'تحدث بسبب الجاذبية فقط.'],['تُعد الرياح أهم عوامل التعرية.',false,'الجريان السطحي للماء عامل رئيس في التعرية؛ فالماء الجاري يحتّ الصخور ويكوّن الوديان والأخاديد.']];
var L={title:'التجوية والتعرية وأثرهما',cover:'p_delta',blurb:'من شقّ في صخرة إلى دلتا عند البحر: الجليد والجذور، والأحماض، والتربة، وحركة الكتل الأرضية، والجليديات والرياح والماء.',stations:[]};
function S(o){L.stations.push(o)}

/* ===== ١) المقدمة السينمائية ===== */
S({id:'intro',name:'المقدمة التشويقية',ic:'🎬',full:true,manual:true,build:function(el){return window.X3D(el,window.X3STORIES.sculpt,{done:function(){G.done(G.curSt().id)},end:function(){G.go(G.idx+1)}})}});

/* ===== ٢) ماذا سنتعلم؟ ===== */
S({id:'wonder',name:'ماذا سنتعلم اليوم؟',ic:'❓',build:function(el){return G.wonder(el,{ey:'الدرس الثاني · التجوية والتعرية وأثرهما',items:[['❄','كيف يكسر الجليد والجذور الصخور؟'],['🧪','كيف تغيّر الأحماض تركيب الصخور؟'],['🌱','كيف تتكوّن التربة؟'],['🏔','ما عوامل التعرية؟'],['🌊','كيف تتكوّن الوديان والدلتا والكثبان؟']]})}});

/* ===== ٣) الأهداف ===== */
S({id:'goals',name:'أهداف الدرس',ic:'🎯',build:function(el){return G.goals(el,{ey:'التجوية والتعرية · ص ١٧٤',idea:'تؤثر عوامل التجوية والتعرية مثل الجاذبية والجليديات والرياح والماء في تغير سطح الأرض، بالإضافة إلى الزمن والمناخ.',goals:[['🔨',GO[0]],['🧪',GO[1]],['🌱',GO[2]],['🏔',GO[3]],['🌊',GO[4]]]})}});

/* ===== ٤) التهيئة ===== */
S({id:'prior',name:'تهيئة البعثة',ic:'🧭',build:function(el){lay(el,'تهيئة · توجيه القراءة وتركيزها','صخرة اليوم… رمال الغد؟',
  '<div class="cd tape" style="display:flex;gap:14px;align-items:center">'+img('p_rocks','width:300px;height:210px')+'<p class="big" style="margin:0">هذه الصخور تتعرض كل يوم للشمس والمطر والرياح. هل تبقى كما هي إلى الأبد؟ أم تتفتت وتنتقل إلى مكان آخر؟</p></div><div id="pp"></div>',
  cd('📖 توجيه القراءة: قبل القراءة','<p class="hint" style="margin:0 0 6px">اختر «موافق» أو «غير موافق»، وسنعود إليها في نهاية الدرس.</p><div id="an"></div>'),1.05);
  G.poll($('#pp',el),{q:'ما الذي يمكن أن يفتت صخرة كبيرة؟',o:['الماء والجليد','جذور النباتات','الأحماض','كل ما سبق']});
  G.anticip($('#an',el),{key:'l2',items:ANT});return {}}});

/* ===== ٥) المصطلحات ===== */
var TERMS=[{ic:'🔨',t:'التجوية',d:'عمليات سطحية ميكانيكية أو كيميائية تؤدي إلى تفتّت الصخور إلى قطع صغيرة.'},{ic:'❄',t:'التجوية الميكانيكية',d:'تكسّر الصخور إلى قطع صغيرة دون تغيّر تركيبها الكيميائي.'},{ic:'🧪',t:'التجوية الكيميائية',d:'تجوية يتغيّر فيها التركيب الكيميائي للصخور والمعادن.'},{ic:'🟤',t:'التأكسد',d:'تفاعل الأكسجين مع الحديد في الصخور فيكوّن مركبات هشة تشبه الصدأ.'},
 {ic:'🌱',t:'التربة',d:'خليط من مواد عضوية وماء وهواء وصخر تعرّض للتجوية، وهي مهمة لنمو النباتات.'},{ic:'🍂',t:'الدبال',d:'مادة قاتمة اللون تتكوّن من تحلل المواد العضوية، وتساعد التربة على حفظ الماء.'},{ic:'🚚',t:'التعرية',d:'تآكل الصخور والرسوبيات ونقلها.'},{ic:'⬇',t:'حركة الكتل الأرضية',d:'تحرك الصخور أو الرسوبيات نحو أسفل المنحدر بسبب الجاذبية فقط.'},
 {ic:'🏔',t:'الجليديات',d:'كتل جليدية ضخمة تنزلق على المنحدرات بفعل الجاذبية، وتجعل الوديان على شكل حرف U.'},{ic:'💨',t:'البرْي والحتّ',d:'البري: حمل الرياح الحبيبات الناعمة وترك الكبيرة. الحت: حتّ الرياح المحمّلة بالرمال للصخور.'},{ic:'💧',t:'الجريان السطحي',d:'حركة الماء الذي يجري على سطح الأرض، ويُعد عاملًا رئيسًا في التعرية.'},{ic:'🔺',t:'الدلتا',d:'رواسب يكوّنها النهر عندما يصل إلى بحر أو بحيرة فتنخفض سرعته ويرسّب حمولته.'}];
var TV;S({id:'terms',name:'خريطة المصطلحات',ic:'🏷',build:function(el){return TV(el)}});

/* ===== ٦) م١ التجوية الميكانيكية: مختبر التجمد والجذور ===== */
S({id:'mech',name:'م١ مختبر التجوية الميكانيكية',ic:'❄',manual:true,build:function(el){
  var R=lay(el,'المحطة ١ · التجوية الميكانيكية ص ١٧٥–١٧٦','مختبر الشقوق: الجليد والجذور يكسران الصخر',
   '<div class="lcds"><div class="lcd"><small>دورات التجمد والانصهار</small><b id="cy">٠</b></div><div class="lcd"><small>عرض الشق</small><b id="cw">ضيق</b></div><div class="lcd"><small>الحالة</small><b id="cs" style="font-size:20px">جاهز</b></div></div><canvas class="sim" id="mc" width="1000" height="500" style="flex:1;min-height:0;height:100%"></canvas><div id="mt"></div>',
   '<div id="mtb"></div>'+cd('التجوية','<p style="margin:0;font-size:18px">عمليات سطحية ميكانيكية أو كيميائية تؤدي إلى تفتّت الصخور. وفي <b class="hl">التجوية الميكانيكية</b> تتكسّر الصخور إلى قطع صغيرة دون تغيّر تركيبها الكيميائي.</p>')+
   '<div class="cd"><h3>❓ ماذا قرأت؟</h3><p style="margin:0;font-size:19px">وضّح كيف يعمل الجليد على تفتيت الصخور؟</p><div class="acts"><button class="b o" data-rv>اعرض الإجابة</button></div><p class="reveal hl3" id="wr" style="margin:6px 0 0;font-size:18px;line-height:1.7">يتسرب الماء إلى شقوق الصخور، وعندما يتجمد يتمدد ويولّد ضغطًا يوسّع الشقوق، ومع تكرار التجمد والانصهار ينكسر الصخر.</p></div>'+
   cd('🐾 الحيوانات أيضًا','<div style="display:flex;gap:10px;align-items:center">'+img('p_roots','width:120px;height:100px')+'<p style="margin:0;font-size:17px">تعمل الحيوانات التي تحفر الأرض على تكسير الصخور ودفعها إلى السطح.</p></div>')+'<div id="mq"></div>');
  $('[data-rv]',el).onclick=function(){$('#wr',el).classList.add('shown');G.sfx.pop()};
  var c=$('#mc',el),water=0,frozen=0,cyc=0,wd=6,split=0,root=0,rootOn=0,rw=0,st='جاهز';
  var tb=G.table($('#mtb',el),['العامل','ماذا يحدث؟','النتيجة'],[['الجليد','',''],['جذور النباتات','','']]);
  function ui(){$('#cy',el).textContent=n(cyc);$('#cw',el).textContent=wd<14?'ضيق':wd<30?'متوسط':wd<50?'واسع':'انكسر!';$('#cs',el).textContent=st}
  var sim=G.sim(c,function(x,t,dt){var by=430;G.bench(x,1000,500,by);if(rootOn&&root<1){root=Math.min(1,root+dt*.12);rw=Math.max(rw,root*40)}
    var W2=Math.max(wd,rw),sp=split*80;
    [[-1,'#9a8a76'],[1,'#a89884']].forEach(function(s){x.fillStyle=s[1];x.beginPath();if(s[0]<0){x.moveTo(140,by);x.lineTo(160,140);x.lineTo(470-W2/2-sp,120);x.lineTo(470-W2/2*.6-sp,250);x.lineTo(470-W2/4-sp,by)}else{x.moveTo(860,by);x.lineTo(840,150);x.lineTo(470+W2/2+sp,120);x.lineTo(470+W2/2*.6+sp,250);x.lineTo(470+W2/4+sp,by)}x.closePath();x.fill();x.strokeStyle='rgba(0,0,0,.2)';x.lineWidth=2;x.stroke()});
    if(water>0){x.fillStyle=frozen?'rgba(225,245,255,.95)':'rgba(70,150,220,.85)';x.beginPath();x.moveTo(470-W2/2-sp,120+80);x.lineTo(470+W2/2+sp,120+80);x.lineTo(470+W2/4+sp,by-30);x.lineTo(470-W2/4-sp,by-30);x.closePath();x.fill();if(frozen){G.pill(x,'❄ الماء تجمّد فتمدد وضغط على الجدران',470,90,'#fffaf0','#1f6f8b',16);[-1,1].forEach(function(s){x.fillStyle='#c4512f';x.beginPath();x.moveTo(470+s*(W2/2+40+sp),280);x.lineTo(470+s*(W2/2+10+sp),264);x.lineTo(470+s*(W2/2+10+sp),296);x.closePath();x.fill()})}}
    if(root>0){x.strokeStyle='#6b4a2a';x.lineWidth=4+root*10;x.lineCap='round';x.beginPath();x.moveTo(470,118);x.quadraticCurveTo(465,118+150*root,472,118+280*root);x.stroke();x.lineWidth=3;x.beginPath();x.moveTo(470,200);x.lineTo(470-30*root,240);x.moveTo(472,280);x.lineTo(472+30*root,320);x.stroke();x.fillStyle='#5f7f2e';x.beginPath();x.ellipse(470,100,20+50*root,12+24*root,0,0,7);x.fill();x.strokeStyle='#5f7f2e';x.lineWidth=6;x.beginPath();x.moveTo(470,118);x.lineTo(470,90);x.stroke();if(root>.5)G.pill(x,'الجذور تنمو فتوسّع الشق',740,60,'#fffaf0','#3f5a1c',16)}
    if(split>0&&split<1)split=Math.min(1,split+dt*.8);G.plate(x,'صخرة فيها شق',470,by+40)});
  G.tools($('#mt',el),[['💧','أضف ماءً إلى الشق'],['❄','تجمّد (ليلًا)'],['☀','انصهار (نهارًا)'],['🌱','ازرع بذرة في الشق']],function(i){
    if(split&&i<3){G.toast('انكسرت الصخرة بفعل الجليد! جرّبوا الآن زراعة بذرة في الشق');return}
    if(i===0){if(water){G.toast('في الشق ماء بالفعل');return}water=1;frozen=0;st='ماء في الشق';G.sfx.pop()}
    if(i===1){if(!water||frozen){G.toast(water?'الماء متجمد بالفعل':'أضيفوا الماء أولًا');return}frozen=1;wd+=12;st='تجمد وتمدد';G.sfx.tick();if(wd>=50){split=.01;st='انكسر الصخر!';G.sfx.rumble();tb.fill(0,['يتجمد الماء في الشق فيتمدد ويولّد ضغطًا','مع تكرار التجمد والانصهار يتسع الشق وينكسر الصخر']);check()}}
    if(i===2){if(!frozen){G.toast('لا يوجد جليد لينصهر');return}frozen=0;cyc++;st='انصهار وتسرّب الماء أعمق';G.sfx.pop()}
    if(i===3){if(rootOn)return;rootOn=1;st='الجذور تنمو';G.sfx.pop();setTimeout(function(){tb.fill(1,['تنمو الجذور داخل شقوق الصخور','تتوسع الشقوق فتنكسر الصخور']);check()},7000)}ui()});
  function check(){G.sfx.ok();if(tb.count()===2)G.done('mech')}ui();
  G.mcq($('#mq',el),{id:'l2-mech',goal:1,lvl:1,q:'تتكسّر الصخور في التجوية الميكانيكية إلى قطع صغيرة:',o:['دون تغيّر تركيبها الكيميائي','مع تغيّر تركيبها الكيميائي','بفعل الأحماض فقط','بفعل الأكسجين فقط'],a:0,ex:'هذا ما يميّز التجوية الميكانيكية.'});
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ٧) م٢ التجوية الكيميائية: مختبر الأحماض ===== */
S({id:'chem',name:'م٢ مختبر الأحماض',ic:'🧪',manual:true,build:function(el){
  var R=lay(el,'المحطة ٢ · التجوية الكيميائية ص ١٧٧ · تجربة: إذابة الصخور بالأحماض','مختبر الأحماض: هل تذيب الأحماض الصخور؟',
   '<canvas class="sim" id="ac" width="1000" height="520" style="flex:1;min-height:0;height:100%"></canvas><div id="at"></div>',
   '<div class="cd" style="background:#fff1e8;border-color:#efc2ad"><b>⚠ تحذير:</b> لا تنزع النظارة الواقية إلا بعد تنظيف المختبر وغسل اليدين.</div><div id="atb"></div>'+
   cd('عوامل التجوية الكيميائية','<p style="margin:0;font-size:17px;line-height:1.7">🔹 <b>الأحماض الطبيعية:</b> يتحد ثاني أكسيد الكربون مع الماء فيتكوّن <b class="hl">حمض الكربونيك</b> الذي يغيّر الفلسبار إلى معدن الكاولين، ويذيب الحجر الجيري.<br>🔹 <b>أحماض النباتات:</b> تفرز الجذور والحزازيات أحماضًا تذيب بعض معادن الصخر.<br>🔹 <b>الأكسجين:</b> يتفاعل مع الحديد في الصخور فيكوّن مركبات هشة تشبه الصدأ (التأكسد).</p>')+
   '<div class="cd" style="display:flex;gap:8px">'+img('p_kaolin','width:48%;height:110px;object-fit:contain;background:#fff')+img('p_lichen','width:48%;height:110px')+'</div><p class="hint" style="margin:-4px 0 0">الفلسبار والكاولين · الحزازيات على الصخر</p><div class="reveal cd" id="aEx"><h3>التحليل</h3><p style="margin:0;font-size:18px;line-height:1.7">تصاعدت فقاعات غاز من الطباشير والحجر الجيري، وكان التفاعل مع حمض الهيدروكلوريك المخفف أسرع وأوضح منه مع الخل؛ فالأحماض <b>تذيب</b> هذه الصخور وتغيّر تركيبها. والحمض الموجود في الخل هو <b class="hl">حمض الأسيتيك (الخليك)</b>.</p></div><div id="aq"></div>');
  var c=$('#ac',el),sm=[0,0],acid=[-1,-1],t0=[0,0],B=[],now=0;
  var tb=G.table($('#atb',el),['العينة','مع الخل','مع حمض الهيدروكلوريك ٥٪'],[['الطباشير','',''],['الحجر الجيري','','']]);
  var sim=G.sim(c,function(x,t,dt){now=t;var by=440;G.bench(x,1000,520,by);
    [[0,280,'طباشير','#f4f1ea'],[1,720,'حجر جيري','#d8cbb0']].forEach(function(q){var i=q[0],X=q[1];x.fillStyle='#e8eef0';x.beginPath();x.ellipse(X,by-8,150,22,0,0,7);x.fill();x.strokeStyle='#9bb';x.lineWidth=2;x.stroke();
      var e=sm[i];x.fillStyle=q[3];x.beginPath();if(i===0){G.rr(x,X-90,by-70+e*4,180,56-e*4,14)}else{x.moveTo(X-110,by-14);x.lineTo(X-80,by-90+e*6);x.lineTo(X+40,by-110+e*6);x.lineTo(X+110,by-14);x.closePath()}x.fill();x.strokeStyle='rgba(0,0,0,.2)';x.stroke();
      if(acid[i]>=0){var rate=acid[i]===1?1:.35,age=t-t0[i];if(age<9){sm[i]=Math.min(1,sm[i]+dt*.05*rate);if(B.length<60)for(var k=0;k<Math.ceil(rate*2);k++)if(Math.random()<.35*rate)B.push({x:X+(Math.random()-.5)*150,y:by-60,v:20+Math.random()*30,r:2+Math.random()*4*rate})}
        x.fillStyle=acid[i]?'rgba(255,240,180,.5)':'rgba(240,220,170,.45)';x.beginPath();x.ellipse(X,by-62+e*4,80,12,0,0,7);x.fill();G.pill(x,acid[i]?'حمض الهيدروكلوريك ٥٪':'خل',X,by-150,'#fffaf0',acid[i]?'#c0392b':'#8a5a00',15)}
      G.plate(x,q[2],X,by+40)});
    B.forEach(function(b){b.y-=b.v*dt;b.x+=Math.sin(b.y/9)*.4;x.strokeStyle='rgba(40,90,130,.6)';x.lineWidth=1.5;x.beginPath();x.arc(b.x,b.y,b.r,0,7);x.stroke()});B=B.filter(function(b){return b.y>by-170});
    /* القطارة */x.save();x.translate(500,90);x.fillStyle='#ffb3a8';G.rr(x,-14,-40,28,40,10);x.fill();x.fillStyle='rgba(205,232,242,.9)';x.beginPath();x.moveTo(-8,0);x.lineTo(8,0);x.lineTo(2,70);x.lineTo(-2,70);x.closePath();x.fill();x.restore();G.T(x,'قطّارة',500,30,15,'#2f2416')});
  var O=[['خل','الطباشير',0,0],['خل','الحجر الجيري',1,0],['حمض الهيدروكلوريك','الطباشير',0,1],['حمض الهيدروكلوريك','الحجر الجيري',1,1]];
  G.tools($('#at',el),O.map(function(o){return [o[3]?'🧪':'🫙',o[0]+' على '+o[1]]}),function(i,b){var o=O[i];acid[o[2]]=o[3];t0[o[2]]=now;b.classList.add('on');G.sfx.pop();
    setTimeout(function(){var row=o[2],col=o[3];var cur=[tb.has(row)?'':''];var v=col?'فقاعات كثيرة وتفاعل سريع':'فقاعات قليلة وتفاعل بطيء';var tr=$('tr[data-r="'+row+'"]',el);var vals=[tr.children[1].classList.contains('q')?'؟':tr.children[1].innerHTML,tr.children[2].classList.contains('q')?'؟':tr.children[2].innerHTML];vals[col]=v;
      var td=tr.children[col+1];td.innerHTML=v;td.classList.remove('q');td.classList.add('nw');tb.upd();G.sfx.ok();if(tb.count()===2){G.done('chem');$('#aEx',el).classList.add('shown')}},2500)});
  var q=$('#aq',el);
  G.sort(q,{id:'l2-mc',goal:2,lvl:2,q:'صنّف: تجوية ميكانيكية أم كيميائية؟',bins:['ميكانيكية','كيميائية'],items:[['تجمد الماء في الشقوق',0],['نمو الجذور في الشقوق',0],['الحيوانات التي تحفر الأرض',0],['حمض الكربونيك',1],['أحماض النباتات',1],['تفاعل الأكسجين مع الحديد',1]]});
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ٨) م٣ المناخ والتجوية ===== */
var CL=[['☀🏜','حار وجاف','بطيء',.25],['☀🌧','حار ورطب','سريع',1],['❄🏜','بارد وجاف','بطيء',.15],['❄🌧','بارد ورطب','بطيء',.3]];
S({id:'climate',name:'م٣ المناخ ومعدل التجوية',ic:'🌦',manual:true,build:function(el){
  var R=lay(el,'المحطة ٣ · المناخ والتجوية ص ١٧٨','مقياس المناخ: أين تكون التجوية الكيميائية أسرع؟',
   '<canvas class="sim" id="kc" width="1000" height="500" style="flex:1;min-height:0;height:100%"></canvas><div id="kt"></div>',
   '<div id="ktb"></div><div class="cd" style="display:flex;gap:10px;align-items:center">'+img('p_tropic','width:150px;height:110px')+'<p style="margin:0;font-size:18px">التجوية الكيميائية أكثر تأثيرًا في <b class="hl">المناطق الاستوائية الحارة الرطبة</b>.</p></div>'+
   '<div class="cd"><h3>❓ ماذا قرأت؟</h3><p style="margin:0;font-size:19px">لماذا تكون التجوية الكيميائية سريعة في المناطق الاستوائية؟</p><div class="acts"><button class="b o" data-rv>اعرض الإجابة</button></div><p class="reveal hl3" id="wr" style="margin:6px 0 0;font-size:18px;line-height:1.7">لأن المناخ فيها حار ورطب؛ فوفرة الماء مع ارتفاع درجة الحرارة تسرّعان التفاعلات الكيميائية التي تغيّر تركيب الصخور.</p></div><div id="kq"></div>');
  $('[data-rv]',el).onclick=function(){$('#wr',el).classList.add('shown');G.sfx.pop()};
  var c=$('#kc',el),cur=-1,nd=0,rock=1;
  var tb=G.table($('#ktb',el),['المناخ','معدل التجوية الكيميائية'],CL.map(function(r){return [r[1],'']}));
  var sim=G.sim(c,function(x,t,dt){x.clearRect(0,0,1000,500);var hot=cur===0||cur===1,wet=cur===1||cur===3;var sky=x.createLinearGradient(0,0,0,500);sky.addColorStop(0,cur<0?'#e7dcc6':hot?'#f6c27a':'#c9dcea');sky.addColorStop(1,'#fbf4e6');x.fillStyle=sky;x.fillRect(0,0,1000,500);
    if(cur<0){G.pill(x,'اختر مناخًا لتقيس معدل التجوية الكيميائية',500,250,'#fffaf0','#2f2416',20);return}
    var rt=CL[cur][3];nd+=(rt-nd)*.05;rock=Math.max(.35,rock-dt*.03*rt);
    if(wet){x.strokeStyle='rgba(60,120,200,.6)';x.lineWidth=2;for(var i=0;i<60;i++){var px=(i*71)%640,py=(i*53+t*500)%300;x.beginPath();x.moveTo(px,py);x.lineTo(px-3,py+12);x.stroke()}}
    if(hot){x.fillStyle='#ffcf4d';x.beginPath();x.arc(560,80,40,0,7);x.fill()}else{x.fillStyle='#fff';for(var i=0;i<20;i++){x.beginPath();x.arc((i*97+t*20)%640,(i*61+t*30)%300,3,0,7);x.fill()}}
    x.fillStyle='#8a7a68';x.beginPath();x.moveTo(120,420);x.lineTo(160,420-200*rock);x.quadraticCurveTo(320,420-260*rock,480,420-190*rock);x.lineTo(520,420);x.closePath();x.fill();if(rt>.5){x.fillStyle='rgba(120,70,30,.5)';for(var i=0;i<14;i++){x.beginPath();x.arc(160+i*24,420-200*rock+((i*13)%40),6,0,7);x.fill()}}
    x.fillStyle='#c9a46a';x.fillRect(0,420,640,80);
    var gx=820,gy=330;x.fillStyle='#fffaf0';x.beginPath();x.arc(gx,gy,140,Math.PI,0);x.fill();x.strokeStyle='#2f2416';x.lineWidth=3;x.stroke();[['بطيء',Math.PI*1.1],['متوسط',Math.PI*1.5],['سريع',Math.PI*1.9]].forEach(function(q){G.T(x,q[0],gx+Math.cos(q[1])*110,gy+Math.sin(q[1])*110,16,'#2f2416')});
    var a=Math.PI+nd*Math.PI*.95;x.strokeStyle='#c4512f';x.lineWidth=6;x.beginPath();x.moveTo(gx,gy);x.lineTo(gx+Math.cos(a)*120,gy+Math.sin(a)*120);x.stroke();x.fillStyle='#2f2416';x.beginPath();x.arc(gx,gy,10,0,7);x.fill();G.T(x,'معدل التجوية الكيميائية',gx,gy+40,17,'#2f2416');
    G.pill(x,'المناخ: '+CL[cur][1],320,40,'#fffaf0','#c4512f',19)});
  G.tools($('#kt',el),CL.map(function(c){return [c[0],c[1]]}),function(i,b,w){cur=i;rock=1;$$('.tool',w).forEach(function(z){z.classList.toggle('on',z===b)});G.sfx.pop();setTimeout(function(){tb.fill(i,[CL[i][2]]);G.sfx.ok();if(tb.count()===4)G.done('climate')},1500)});
  
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ٩) م٤ التربة ===== */
var SOIL=[['🪨','صخر تعرّض للتجوية','#a39280'],['🍂','مواد عضوية (الدبال)','#4a3424'],['💧','ماء','#5aa0d8'],['💨','هواء','#e9f4fb']];
S({id:'soil',name:'م٤ مختبر التربة',ic:'🌱',manual:true,build:function(el){
  var R=lay(el,'المحطة ٤ · التربة ص ١٧٩–١٨٠','مختبر التربة: من صخرة مفتتة إلى أرض تنبت',
   '<canvas class="sim" id="oc" width="1000" height="520" style="flex:1;min-height:0;height:100%"></canvas><div id="ot"></div>',
   '<div id="otb"></div>'+cd('التربة','<p style="margin:0;font-size:18px;line-height:1.7">خليط من <b class="hl">مواد عضوية وماء وهواء وصخر تعرّض للتجوية</b>، وهي مهمة لنمو النباتات. و<b class="hl">الدبال</b> مادة قاتمة اللون تتكوّن من تحلل المواد العضوية، وتساعد التربة على حفظ الماء.</p>')+
   '<div class="cd">'+img('p_soilf','width:100%;height:170px;object-fit:contain;background:#fff')+'<p style="margin:6px 0 0;font-size:17px">العوامل المؤثرة في تكوّن التربة: نوع الصخر الأصلي، ودرجة ميل السطح، والمناخ، والزمن، والمخلوقات الحية.</p></div><div id="oq"></div>');
  var c=$('#oc',el),add=[0,0,0,0],grow=0;
  var tb=G.table($('#otb',el),['المكوّن','أُضيف إلى الوعاء؟'],SOIL.map(function(s){return [s[1],'']}));
  var sim=G.sim(c,function(x,t,dt){var by=450;G.bench(x,1000,520,by);var X=330,W=340,Y=110,H=330;x.fillStyle='rgba(205,232,242,.4)';x.fillRect(X,Y,W,H);
    var lv=0;var tot=add[0]*150+add[1]*60;if(add[0]){x.fillStyle='#a39280';x.fillRect(X+5,Y+H-150,W-10,145);for(var i=0;i<40;i++){x.fillStyle=i%2?'#8a7a68':'#b5a48e';x.beginPath();x.arc(X+20+(i*37%(W-40)),Y+H-140+(i*23%130),6+(i%3)*3,0,7);x.fill()}}
    if(add[1]){x.fillStyle='#4a3424';x.fillRect(X+5,Y+H-210,W-10,60);for(var i=0;i<14;i++){x.fillStyle='#6b4a2a';x.fillRect(X+20+(i*41%(W-40)),Y+H-200+(i*17%40),14,4)}}
    if(add[2]){x.fillStyle='rgba(90,160,216,.35)';x.fillRect(X+5,Y+H-210,W-10,205)}
    if(add[3]){for(var i=0;i<20;i++){x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=2;x.beginPath();x.arc(X+20+(i*53%(W-40)),Y+H-20-(i*29%180),4,0,7);x.stroke()}}
    if(add.every(Boolean)){grow=Math.min(1,grow+dt*.25);x.strokeStyle='#3f7a2a';x.lineWidth=5;x.beginPath();x.moveTo(500,Y+H-210);x.lineTo(500,Y+H-210-120*grow);x.stroke();x.fillStyle='#5f9f3a';[[-1,-60],[1,-90]].forEach(function(l){x.beginPath();x.ellipse(500+l[0]*28*grow,Y+H-210+l[1]*grow,28*grow,10*grow,l[0]*.5,0,7);x.fill()});x.strokeStyle='#8b6a4a';x.lineWidth=2;x.beginPath();x.moveTo(500,Y+H-210);x.lineTo(480,Y+H-150);x.moveTo(500,Y+H-210);x.lineTo(525,Y+H-160);x.stroke();if(grow>.6)G.pill(x,'🌱 تربة صالحة لنمو النبات',500,70,'#fffaf0','#3f5a1c',18)}
    x.strokeStyle='#4f6f7c';x.lineWidth=5;x.strokeRect(X,Y,W,H);G.plate(x,'وعاء نكوّن فيه التربة',500,by+40)});
  G.tools($('#ot',el),SOIL.map(function(s){return [s[0],'أضف: '+s[1]]}),function(i,b){if(add[i])return;add[i]=1;b.classList.add('on');G.sfx.pop();tb.fill(i,['✔']);if(tb.count()===4){G.sfx.ok();G.done('soil')}});
  var q=$('#oq',el);G.cloze(q,{id:'l2-soil',goal:3,lvl:1,text:'التربة خليط من [[مواد عضوية]] وماء وهواء و[[صخر]] تعرّض للتجوية، و[[الدبال]] مادة قاتمة اللون تساعد التربة على حفظ الماء.',extra:['ثلج']});
  G.mcq(q,{id:'l2-sf',goal:3,lvl:2,q:'أيّ مما يلي <b>ليس</b> من العوامل المؤثرة في تكوّن التربة؟',o:['لون السماء','نوع الصخر الأصلي','المناخ','الزمن'],a:0,ex:'العوامل: نوع الصخر الأصلي، وميل السطح، والمناخ، والزمن، والمخلوقات الحية.'});
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ١٠) م٥ حركة الكتل الأرضية ===== */
var MM=[['الزحف','حركة بطيئة جدًّا للتربة','p_creep'],['السقوط','حركة منحنية لكتلة من الصخور','p_slump'],['انزلاق صخري','انهيار صخور جرف أو جبل','p_slide'],['التدفق الطيني','خليط ماء ورسوبيات يتحرك كالعجين','p_mud']];
S({id:'mass',name:'م٥ منحدر الجاذبية',ic:'⬇',manual:true,build:function(el){
  var R=lay(el,'المحطة ٥ · الجاذبية وحركة الكتل الأرضية ص ١٨١–١٨٢','منحدر الجاذبية: أربع حركات للكتل الأرضية',
   '<canvas class="sim" id="gc" width="1000" height="500" style="flex:1;min-height:0;height:100%"></canvas><div id="gt"></div>',
   '<div id="gtb"></div>'+cd('التعرية وحركة الكتل','<p style="margin:0;font-size:18px;line-height:1.7"><b class="hl">التعرية:</b> تآكل الصخور والرسوبيات ونقلها. وعندما تتحرك الصخور أو الرسوبيات نحو أسفل المنحدر بسبب <b>الجاذبية فقط</b> تسمى <b class="hl">حركة الكتل الأرضية</b>.</p>')+'<div class="cd" id="gph" style="text-align:center"><p class="hint" style="margin:0">اختر نوع الحركة لتظهر صورتها الحقيقية.</p></div><div id="gq"></div>');
  var c=$('#gc',el),m=-1,k=0,P=[];
  var tb=G.table($('#gtb',el),['نوع الحركة','وصفها'],MM.map(function(r){return [r[0],'']}));
  function slope(x){x.fillStyle='#b5946a';x.beginPath();x.moveTo(0,90);x.lineTo(300,110);x.lineTo(760,400);x.lineTo(1000,410);x.lineTo(1000,500);x.lineTo(0,500);x.closePath();x.fill();x.fillStyle='#7aa35a';x.beginPath();x.moveTo(0,90);x.lineTo(300,110);x.lineTo(300,118);x.lineTo(0,98);x.closePath();x.fill()}
  var sim=G.sim(c,function(x,t,dt){x.clearRect(0,0,1000,500);x.fillStyle='#e6f0f5';x.fillRect(0,0,1000,500);slope(x);if(m<0){G.pill(x,'اختر نوع الحركة',600,200,'#fffaf0','#2f2416',20);return}k=Math.min(1,k+dt*[.08,.4,.6,.3][m]);
    function on(u){return [300+u*460,110+u*290]}
    if(m===0){for(var i=0;i<6;i++){var p=on(.1+i*.15),tilt=k*.35;x.save();x.translate(p[0],p[1]);x.rotate(tilt);x.strokeStyle='#6b4a2a';x.lineWidth=6;x.beginPath();x.moveTo(0,0);x.lineTo(0,-60);x.stroke();x.fillStyle='#5f7f2e';x.beginPath();x.arc(0,-70,20,0,7);x.fill();x.restore()}G.pill(x,'الأشجار والأعمدة تميل ببطء شديد',600,60,'#fffaf0','#2f2416',16)}
    if(m===1){var p=on(.25+k*.25);x.save();x.translate(p[0],p[1]-40);x.rotate(.5+k*.3);x.fillStyle='#8b6a4a';x.beginPath();x.moveTo(-90,-10);x.quadraticCurveTo(0,60,90,-10);x.lineTo(80,-50);x.lineTo(-80,-50);x.closePath();x.fill();x.fillStyle='#7aa35a';x.fillRect(-80,-56,160,8);x.restore();x.strokeStyle='#2f2416';x.setLineDash([6,6]);x.lineWidth=2;x.beginPath();x.arc(on(.3)[0],on(.3)[1]-120,140,.6,1.9);x.stroke();x.setLineDash([]);G.pill(x,'حركة منحنية لكتلة من الصخور',600,60,'#fffaf0','#2f2416',16)}
    if(m===2){if(!P.length)for(var i=0;i<22;i++)P.push({u:Math.random()*.15,v:0,r:8+Math.random()*16,a:0});P.forEach(function(p){p.u=Math.min(1.15,p.u+dt*(.25+p.r/80));var q=on(Math.min(1,p.u));p.a+=dt*5;x.save();x.translate(q[0]+(p.u>1?(p.u-1)*400:0),q[1]-p.r);x.rotate(p.a);x.fillStyle='#7a6a58';x.fillRect(-p.r,-p.r,p.r*2,p.r*2);x.restore()});if(Math.random()<.03)G.sfx.tick();G.pill(x,'انهيار سريع لصخور الجرف',600,60,'#fffaf0','#c0392b',16)}
    if(m===3){var L=k;x.fillStyle='rgba(110,80,50,.9)';x.beginPath();var a=on(.05),b=on(Math.min(1,L*1.1));x.moveTo(a[0],a[1]-4);for(var i=0;i<=20;i++){var u=.05+(Math.min(1,L*1.1)-.05)*i/20,q=on(u);x.lineTo(q[0],q[1]-24-Math.sin(i+t*6)*4)}x.lineTo(b[0]+(L>.9?(L-.9)*800:0),b[1]+10);x.lineTo(a[0],a[1]+10);x.closePath();x.fill();if(L>.9){x.fillStyle='rgba(110,80,50,.9)';x.fillRect(b[0],b[1]-20,(L-.9)*800,24)}
      x.strokeStyle='rgba(90,160,216,.7)';x.lineWidth=2;for(var i=0;i<30;i++){var px=(i*41)%300,py=(i*29+t*400)%110;x.beginPath();x.moveTo(px,py);x.lineTo(px-2,py+10);x.stroke()}G.pill(x,'ماء + رسوبيات تتدفق كالعجين',600,60,'#fffaf0','#1f6f8b',16)}
    G.T(x,'⬇ الجاذبية',900,200,22,'#c4512f');x.fillStyle='#c4512f';x.fillRect(895,220,10,70);x.beginPath();x.moveTo(880,290);x.lineTo(920,290);x.lineTo(900,320);x.closePath();x.fill();
    if(k>=1&&!tb.has(m)){tb.fill(m,[MM[m][1]]);G.sfx.ok();if(tb.count()===4)G.done('mass')}});
  G.tools($('#gt',el),MM.map(function(r,i){return [['🌲','🌀','🪨','🟫'][i],r[0]]}),function(i,b,w){m=i;k=0;P=[];$$('.tool',w).forEach(function(z){z.classList.toggle('on',z===b)});$('#gph',el).innerHTML=img(MM[i][2],'width:100%;height:170px')+'<p style="margin:6px 0 0;font-family:var(--disp)">'+MM[i][0]+'</p>';G.sfx.rumble()});
  G.order($('#gq',el),{id:'l2-mmo',goal:4,lvl:3,q:'رتّب من الأبطأ إلى الأسرع: الزحف، السقوط، الانزلاق الصخري.',items:['الزحف','السقوط','الانزلاق الصخري'],ex:'الزحف حركة بطيئة جدًّا، والانزلاق الصخري انهيار سريع.'});
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ١١) م٦ الجليديات والرياح ===== */
S({id:'icewind',name:'م٦ الجليديات والرياح',ic:'🏔',manual:true,build:function(el){
  var R=lay(el,'المحطة ٦ · الجليد والرياح ص ١٨٣–١٨٥','الجليديات والرياح: نحّاتان عملاقان',
   '<canvas class="sim" id="wc" width="1000" height="500" style="flex:1;min-height:0;height:100%"></canvas><div id="wt"></div>',
   '<div id="wtb"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+cd('🏔 الجليديات','<p style="margin:0;font-size:16px;line-height:1.6">كتل جليدية ضخمة تنزلق على المنحدرات بفعل الجاذبية، تحتّ القاع وتجعل الوديان على شكل حرف <b>U</b>، وترسّب حمولتها عند انصهارها على شكل رواسب جليدية.</p>')+cd('💨 الرياح','<p style="margin:0;font-size:16px;line-height:1.6">تحمل الحبيبات الناعمة وتترك الكبيرة (<b>البرْي</b>)، والرياح المحمّلة بالرمال تحتّ الصخور (<b>الحتّ</b>)، وترسيب الرمال يكوّن <b>الكثبان الرملية</b>.</p>')+'</div><div class="cd" style="display:flex;gap:8px">'+img('p_uval','width:48%;height:110px')+img('p_dunes','width:48%;height:110px')+'</div><div id="wq"></div>');
  var c=$('#wc',el),m=-1,k=0,G2=[];
  var tb=G.table($('#wtb',el),['العامل','الأثر'],[['جليدية تتحرك في الوادي',''],['رياح على تربة مفككة',''],['رياح محمّلة بالرمال على صخرة',''],['ترسيب الرياح للرمال','']]);
  var V=['يتحول الوادي إلى شكل حرف U، وتبقى رواسب جليدية','تحمل الحبيبات الناعمة وتترك الكبيرة (البرْي)','تحتّ الصخرة وتنحتها (الحتّ)','تتكوّن الكثبان الرملية'];
  var sim=G.sim(c,function(x,t,dt){x.clearRect(0,0,1000,500);k=Math.min(1,k+dt*.15);
    if(m<=0){x.fillStyle='#dbe9f2';x.fillRect(0,0,1000,500);var u=m===0?k:0;x.fillStyle='#8a7a68';x.beginPath();x.moveTo(0,80);for(var X=0;X<=1000;X+=10){var d=(X-500)/250,vs=Math.max(0,1-Math.abs(d))*300,us=Math.max(0,1-Math.pow(Math.abs(d),4))*300;x.lineTo(X,80+(vs*(1-u)+us*u))}x.lineTo(1000,500);x.lineTo(0,500);x.closePath();x.fill();
      if(m===0&&k<.85){x.fillStyle='rgba(235,248,255,.95)';x.beginPath();x.moveTo(250,150);for(var X=250;X<=750;X+=10){var d=(X-500)/250;x.lineTo(X,150+Math.max(0,1-Math.pow(Math.abs(d),3))*200)}x.closePath();x.fill();G.pill(x,'جليدية تنزلق وتحتّ القاع',500,120,'#fffaf0','#1f6f8b',17)}
      if(m===0&&k>=.85){x.fillStyle='#b5a48e';for(var i=0;i<18;i++){x.beginPath();x.arc(420+(i*31%160),372-(i%3)*6,8+(i%4)*3,0,7);x.fill()}G.pill(x,'وادٍ على شكل حرف U ورواسب جليدية',500,120,'#fffaf0','#1f6f8b',17)}
      if(m<0)G.pill(x,'وادٍ نهري على شكل حرف V · اختر أداة',500,40,'#fffaf0','#2f2416',18)}
    else{x.fillStyle='#f7e2b8';x.fillRect(0,0,1000,500);x.fillStyle='#e2b86b';x.fillRect(0,400,1000,100);
      if(m===1){if(!G2.length)for(var i=0;i<120;i++)G2.push({x:100+Math.random()*800,y:390-Math.random()*20,big:i%4===0,vx:0});G2.forEach(function(g){if(!g.big){g.vx=Math.min(500,g.vx+dt*300);g.x+=g.vx*dt;g.y-=dt*40*Math.random()}x.fillStyle=g.big?'#7a6a58':'#c9a46a';x.beginPath();x.arc(g.x,g.y,g.big?9:3,0,7);x.fill()});G.pill(x,'البرْي: تبقى الحبيبات الكبيرة',500,60,'#fffaf0','#8a5a00',18)}
      if(m===2){x.fillStyle='#9c6b3a';x.beginPath();x.moveTo(600,400);x.lineTo(620,200);x.quadraticCurveTo(680,160,740,200);x.lineTo(720+0,320);x.quadraticCurveTo(700-60*k,350,730,400);x.closePath();x.fill();for(var i=0;i<80;i++){var px=((i*47+t*500)%700),py=300+(i*13%90);x.fillStyle='rgba(200,150,70,.9)';x.beginPath();x.arc(px,py,3,0,7);x.fill()}G.pill(x,'الحتّ: الرمال المحمولة تنحت الصخرة',500,60,'#fffaf0','#8a5a00',18)}
      if(m===3){x.fillStyle='#d9a75a';[[300,1],[620,.8],[860,.6]].forEach(function(d){var hh=150*k*d[1];x.beginPath();x.moveTo(d[0]-180,400);x.quadraticCurveTo(d[0]-40,400-hh*1.4,d[0]+20,400-hh);x.lineTo(d[0]+90,400);x.closePath();x.fill()});for(var i=0;i<50;i++){var px=((i*61+t*300)%1000),py=330+(i*11%60);x.fillStyle='rgba(200,150,70,.7)';x.beginPath();x.arc(px,py,2.5,0,7);x.fill()}G.pill(x,'ترسيب الرمال يكوّن الكثبان',500,60,'#fffaf0','#8a5a00',18)}
      x.fillStyle='#1f6f8b';G.T(x,'💨 اتجاه الرياح ←',140,120,20,'#1f6f8b')}
    if(m>=0&&k>=1&&!tb.has(m)){tb.fill(m,[V[m]]);G.sfx.ok();if(tb.count()===4)G.done('icewind')}});
  G.tools($('#wt',el),[['🏔','أرسل جليدية في الوادي'],['💨','رياح على تربة مفككة'],['🏜','رياح محمّلة بالرمال'],['🏝','ترسيب الرمال']],function(i,b,w){m=i;k=0;G2=[];$$('.tool',w).forEach(function(z){z.classList.toggle('on',z===b)});G.sfx.page()});
  var q=$('#wq',el);
  
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ١٢) م٧ الماء وأثر التعرية: حوض الجريان ===== */
var WS=[['💧','مطر خفيف على المنحدر','جريان صفائحي: طبقة رقيقة من الماء على منحدر'],['🌧','مطر غزير','تتكوّن جداول وأخاديد تتعمق مع الزمن'],['🏞','نهر دائم الجريان','يحتّ النهر الصخور ويكوّن الوديان'],['🌊','يصل النهر إلى البحر','تنخفض سرعته فيرسّب حمولته مكوّنًا الدلتا']];
S({id:'water',name:'م٧ حوض الجريان والدلتا',ic:'🌊',manual:true,build:function(el){
  var R=lay(el,'المحطة ٧ · الماء وأثر التعرية ص ١٨٦–١٨٨','حوض الجريان: من قطرة مطر إلى دلتا',
   '<canvas class="sim" id="rc" width="1000" height="500" style="flex:1;min-height:0;height:100%"></canvas><div id="rt"></div>',
   '<div id="rtb"></div>'+cd('الجريان السطحي','<p style="margin:0;font-size:18px;line-height:1.7">حركة الماء الذي يجري على سطح الأرض، ويُعد <b class="hl">عاملًا رئيسًا في التعرية</b>. وأثر التعرية: تتكوّن الوديان والأخاديد حيث تُزال المواد، والدلتا والكثبان حيث تترسب.</p>')+'<div class="cd" style="display:flex;gap:8px">'+img('p_river','width:48%;height:110px')+img('p_delta','width:48%;height:110px')+'</div><p class="hint" style="margin:-4px 0 0">نهر يحتّ مجراه · دلتا عند المصب</p>'+cd('🤔 متى يحتّ النهر؟ ومتى يرسّب؟','<p style="margin:0;font-size:17px">يحتّ النهر الصخور عندما يجري بسرعة، ويرسّب حمولته عندما تنخفض سرعته، كما يحدث عند وصوله إلى بحر أو بحيرة.</p>')+'<div id="rq"></div>');
  var c=$('#rc',el),m=-1,k=[0,0,0,0],P=[];
  var tb=G.table($('#rtb',el),['المرحلة','ماذا حدث؟'],WS.map(function(w){return [w[1],'']}));
  var sim=G.sim(c,function(x,t,dt){x.clearRect(0,0,1000,500);if(m>=0)k[m]=Math.min(1,k[m]+dt*.18);
    x.fillStyle='#c9a46a';x.fillRect(0,0,760,500);x.fillStyle='#2f7fb0';x.fillRect(760,0,240,500);x.fillStyle='rgba(255,255,255,.2)';for(var i=0;i<8;i++)x.fillRect(780,30+i*60+Math.sin(t*2+i)*5,200,3);G.T(x,'البحر',880,40,20,'#fff');
    if(k[0]>0){x.fillStyle='rgba(90,160,216,'+(.35*k[0])+')';x.fillRect(0,0,760,500)}
    if(k[1]>0){x.strokeStyle='rgba(60,40,20,.55)';x.lineWidth=3+6*k[1];for(var j=0;j<6;j++){x.beginPath();x.moveTo(40+j*60,20);x.bezierCurveTo(200+j*40,120,300+j*20,200,420,250);x.stroke()}}
    if(k[2]>0){x.strokeStyle='#7a5a32';x.lineWidth=40+30*k[2];x.beginPath();x.moveTo(420,250);x.bezierCurveTo(520,200,600,300,760,250);x.stroke();x.strokeStyle='#3a8cc0';x.lineWidth=24+10*k[2];x.stroke();for(var i=0;i<20;i++){var u=((i*.05+t*.25)%1),px=420+u*340,py=250+Math.sin(u*6)*30;x.fillStyle='#a07a4a';x.beginPath();x.arc(px,py,3,0,7);x.fill()}if(k[2]>.4)G.pill(x,'وادٍ يتعمق بالحتّ',560,150,'#fffaf0','#5a4330',15)}
    if(k[3]>0){x.fillStyle='#c9a46a';x.beginPath();x.moveTo(760,215);x.quadraticCurveTo(760+180*k[3],180-60*k[3],760+200*k[3],250);x.quadraticCurveTo(760+180*k[3],320+60*k[3],760,285);x.closePath();x.fill();x.strokeStyle='#3a8cc0';x.lineWidth=5;[-1,0,1].forEach(function(s){x.beginPath();x.moveTo(760,250);x.quadraticCurveTo(820*1,250+s*40*k[3],760+180*k[3],250+s*80*k[3]);x.stroke()});if(k[3]>.5)G.pill(x,'الدلتا',760+120*k[3],130,'#fffaf0','#5a4330',18)}
    if(m===0||m===1){x.strokeStyle='rgba(70,130,200,.6)';x.lineWidth=2;for(var i=0;i<(m?90:40);i++){var px=(i*37)%760,py=(i*29+t*600)%500;x.beginPath();x.moveTo(px,py);x.lineTo(px-2,py+10);x.stroke()}}
    if(m<0)G.pill(x,'منحدر من الرمل والتربة يميل نحو البحر · اختر أداة',380,40,'#fffaf0','#2f2416',17);
    if(m>=0&&k[m]>=1&&!tb.has(m)){tb.fill(m,[WS[m][2]]);G.sfx.ok();if(tb.count()===4)G.done('water')}});
  G.tools($('#rt',el),WS.map(function(w){return [w[0],w[1]]}),function(i,b,w){if(i>0&&!tb.has(i-1)){G.toast('اتبعوا المراحل بالترتيب');G.sfx.no();return}m=i;b.classList.add('on');G.sfx.page()});
  var q=$('#rq',el);G.mcq(q,{id:'l2-delta',goal:5,lvl:2,q:'تتكوّن الدلتا عندما:',o:['تنخفض سرعة النهر عند وصوله إلى بحر أو بحيرة فيرسّب حمولته','تزداد سرعة النهر','يتجمد النهر','تهب الرياح على الرمال'],a:0,ex:'مثل دلتا نهر النيل.'});
  G.sort(q,{id:'l2-er',goal:5,lvl:2,q:'صنّف: أين تُزال المواد، وأين تترسب؟',bins:['حيث تُزال المواد','حيث تترسب'],items:[['الوديان',0],['الأخاديد',0],['الدلتا',1],['الكثبان الرملية',1]]});
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ١٣) م٨ التقويم وحل أسئلة الكتاب ونهاية الفصل ===== */
S({id:'qa',name:'م٨ التقويم وحل أسئلة الكتاب',ic:'✍',build:function(el){
  el.innerHTML='<div class="ey">المحطة ٨ · تقويم الدرس الثاني ومراجعة الفصل</div><h1 class="t">تقويم متنوع… وحلول أسئلة الكتاب ونهاية الفصل</h1><div class="row grow"><div class="col scroll" id="qL" style="flex:1"></div><div class="col scroll" id="qR" style="flex:1"><div class="cd tape"><h3 style="margin:0">📗 الحلول خطوة بخطوة</h3></div></div></div>';
  var L=$('#qL',el);
  G.cloze(L,{id:'l2-cl',goal:4,lvl:1,text:'تحمل الرياح الحبيبات الناعمة وتترك الكبيرة وتسمى هذه العملية [[البرْي]]، وتحتّ الرياح المحمّلة بالرمال الصخور وتسمى [[الحتّ]]، وتجعل [[الجليديات]] الوديان على شكل حرف U، ويكوّن النهر [[الدلتا]] عند المصب.',extra:['الزحف']});
  G.sort(L,{id:'l2-ag',goal:4,lvl:2,q:'صنّف حسب عامل التعرية:',bins:['الجاذبية','الجليديات','الرياح','الماء'],items:[['الزحف',0],['التدفق الطيني',0],['وادٍ على شكل U',1],['رواسب جليدية',1],['الكثبان الرملية',2],['البرْي',2],['الأخاديد',3],['الدلتا',3]]});
  G.tf(L,{id:'l2-tf1',goal:2,lvl:1,q:'في التجوية الكيميائية يتغير التركيب الكيميائي للصخور والمعادن.',v:true,ex:'صحيح.'});
  G.tf(L,{id:'l2-tf2',goal:1,lvl:2,q:'التجوية الكيميائية سريعة في المناطق الباردة الجافة.',v:false,ex:'تكون بطيئة فيها، وسريعة في المناطق الحارة الرطبة.'});
  G.mcq(L,{id:'l2-m1',goal:3,lvl:1,q:'مادة قاتمة اللون تتكوّن من تحلل المواد العضوية وتساعد التربة على حفظ الماء:',o:['الدبال','الكاولين','الرمل','الطين'],a:0,ex:'الدبال.'});
  G.solutions($('#qR',el),[
   {src:'ماذا قرأت؟',q:'وضّح كيف يعمل الجليد على تفتيت الصخور؟',a:'يتسرب الماء إلى شقوق الصخور، وعندما يتجمد يتمدد ويولّد ضغطًا يوسّع الشقوق، ومع تكرار التجمد والانصهار ينكسر الصخر.'},
   {src:'ماذا قرأت؟',q:'لماذا تكون التجوية الكيميائية سريعة في المناطق الاستوائية؟',a:'لأن مناخها حار ورطب؛ فوفرة الماء وارتفاع الحرارة يسرّعان التفاعلات الكيميائية.'},
   {src:'مسائل تدريبية ١',q:'قارن بين التجوية الميكانيكية الناتجة عن الجليد، والناتجة عن نمو الجذور.',a:'كلتاهما توسّع الشقوق وتكسر الصخر دون تغيير تركيبه الكيميائي. الجليد: يتمدد الماء عند تجمده في الشق فيولّد ضغطًا، ويتكرر ذلك مع التجمد والانصهار. الجذور: تنمو داخل الشق وتتوسع تدريجيًا فتكسر الصخر.'},
   {src:'مسائل تدريبية ٢',q:'وضّح كيف يعمل حمض الكربونيك على تجوية الصخور؟',a:'يتكوّن عندما يتحد ثاني أكسيد الكربون مع الماء، فيغيّر تركيب بعض المعادن مثل تحويل الفلسبار إلى معدن الكاولين، ويذيب الحجر الجيري.'},
   {src:'مسائل تدريبية ٣',q:'كيف يؤثر المناخ في معدل كل من التجوية الميكانيكية والتجوية الكيميائية؟',a:'التجوية الكيميائية سريعة في المناخ الحار الرطب، وبطيئة في المناخ الحار الجاف والبارد الجاف والبارد الرطب. أما التجوية الميكانيكية بالجليد فتنشط حيث يتكرر تجمد الماء وانصهاره في الشقوق.'},
   {src:'مسائل تدريبية ٤',q:'إذا قامت الرياح بتعرية منطقة بمعدل ٢ مم كل سنة، فكم يكون انخفاضها بعد مرور ٢٠٠٠ سنة؟',a:'الانخفاض = ٢ مم × ٢٠٠٠ = ٤٠٠٠ مم = <b>٤ م</b>.'},
   {src:'تطبيق العلوم',q:'لماذا يكون لبعض مناطق الحقل لون داكن أكثر من الأخرى؟ وما أعلى نقطة في الحقل؟',a:'المناطق الداكنة ما زالت تحتفظ بالطبقة العلوية الغنية بالمواد العضوية، أما المناطق الفاتحة فقد تعرّت طبقتها العلوية أولًا فظهرت الطبقات السفلية الأفتح. والتعرية تكون أشد في المناطق المرتفعة؛ لذا تكون أعلى نقطة في الحقل غالبًا هي المنطقة الأفتح لونًا.'},
   {src:'تجربة الأحماض',q:'صف أثر الخل وحمض الهيدروكلوريك على الطباشير والحجر الجيري. وما الحمض الموجود في الخل؟',a:'تصاعدت فقاعات غاز من العينتين؛ وكان التفاعل مع حمض الهيدروكلوريك المخفف أسرع منه مع الخل، فالأحماض تذيب هذه الصخور. والحمض الموجود في الخل هو حمض الأسيتيك (الخليك).'},
   {src:'استقصاء التوازن',q:'ماذا يحدث للجزء المغمور والجزء الطافي عندما تُنقص الكتلة؟ وكيف يشبه ذلك ما يحدث في الأرض؟',a:'يقل الجزء المغمور ويرتفع الجسم. وهذا يشبه ارتفاع القشرة الأرضية عندما يقل وزنها بحتّ الجبال أو انصهار الجليد فوقها.'},
   {src:'اختبر نفسك ١',q:'وضّح كيف توفر الموجات الزلزالية معلومات عن مكونات باطن الأرض؟',a:'تتغير سرعة الموجات حسب المادة التي تعبرها، والموجات الثانوية تنتقل في المواد الصلبة فقط؛ فمن تغيّر سرعتها ومساراتها وتوقف بعضها يستنتج العلماء طبقات الأرض وحالتها.'},
   {src:'اختبر نفسك ٢',q:'اذكر أمثلة على أماكن تحدث فيها الأنواع الثلاثة من حركة الصفائح.',a:'متباعدة: البحر الأحمر. متقاربة: جبال الهملايا. متحاذية (تحويلية): منطقة البحر الميت.'},
   {src:'اختبر نفسك ٣',q:'وضّح كيفية تكوّن البركان.',a:'يتكوّن الجبل البركاني من تراكم طبقات اللابة والرماد البركاني حول الفتحة، وقد يتكوّن في قاع المحيط وينمو حتى يظهر فوق سطح البحر.'},
   {src:'اختبر نفسك ٤',q:'سمِّ عاملين من عوامل التجوية الكيميائية.',a:'من عواملها: الأحماض الطبيعية (مثل حمض الكربونيك)، وأحماض النباتات، والأكسجين.'},
   {src:'اختبر نفسك ٥',q:'صف أربعة من عوامل التعرية. أي هذه العوامل أسرع وأيها أبطأ؟',a:'الجاذبية (حركة الكتل الأرضية)، والجليديات، والرياح، والماء. وتختلف سرعتها: فالزحف بفعل الجاذبية بطيء جدًّا، بينما الانزلاق الصخري انهيار سريع، والجليديات تنزلق ببطء على المنحدرات.'},
   {src:'أرقام قياسية',q:'ارتفاع جزيرة سيرتسي ١٨٣ م، أي بارتفاع بناء ذي ٥٥ طابقًا. ما ارتفاع الطابق الواحد؟',a:'١٨٣ ÷ ٥٥ ≈ <b>٣٫٣ م</b>.'},
   {src:'أنواع الجبال الأربعة',q:'أكمل الجدول: نوع الجبل، والمثال، والسبب.',a:'الكتل المتصدعة: سييرا نيفادا — قوى الشد.<br>المطوية (الطيات): جبال زاجروس — الضغط.<br>الناهضة: جبال الروكي — قوة تدفع القشرة إلى أعلى.<br>البركانية: الجبل الأبيض بخيبر وجزر هاواي — تدفق اللابة.'},
   {src:'الواجب ٣',q:'متى تقوم الأنهار بترسيب الرسوبيات؟ ومتى تقوم بحتّ الصخور؟',a:'تحتّ الصخور عندما تجري بسرعة، وترسّب الرسوبيات عندما تنخفض سرعتها، كما يحدث عند وصولها إلى بحر أو بحيرة فتتكوّن الدلتا.'}]);
  return {}}});

/* ===== مراجعة الفصل ص ١٩٤–١٩٥ ===== */
S({id:'chrev',name:'م٩ مراجعة الفصل',ic:'📘',build:function(el){
  el.innerHTML='<div class="ey">المحطة ٩ · مراجعة الفصل السادس ص ١٩٤–١٩٥</div><h1 class="t">مراجعة الفصل: أجب ثم تحقّق من الحل</h1><div class="row grow"><div class="col scroll" id="cL" style="flex:1"><div class="cd tape"><h3 style="margin:0">🎯 تثبيت المفاهيم (٩–١٧): أجب تفاعليًّا</h3></div></div><div class="col scroll" id="cR" style="flex:1.15"><div class="cd tape"><h3 style="margin:0">📗 حلول أسئلة مراجعة الفصل (١–٢٩)</h3></div></div></div>';
  var L=$('#cL',el);
  [[9,'أي أجزاء الأرض أكبر؟',['القشرة','الستار','اللب الخارجي','اللب الداخلي'],1,'الستار أكبر طبقات الأرض.'],
   [10,'صفائح الأرض هي قطع من:',['الغلاف الصخري','الغلاف اللدن','اللب الداخلي','الستار (الوشاح)'],0,'الغلاف الصخري مقسّم إلى صفائح.'],
   [11,'أي القوى تسبب تقارب الصفائح؟',['الشد','الضغط','القص','التوازن'],1,'قوى الضغط.'],
   [12,'أي القوى تسبب تباعد الصفائح؟',['الشد','الضغط','القص','التوازن'],0,'قوى الشد.'],
   [13,'أي نوع من حركة الصفائح الأرضية تحدث عند الحدود التحويلية؟',['تقارب الصفائح','تباعد الصفائح','غوص الصفائح','انزلاق الصفائح بعضها بجانب بعض'],3,'الحدود التحويلية (المتحاذية).'],
   [14,'أي عوامل التعرية التالية يكوّن وديانًا على شكل حرف U؟',['الرياح','المياه','الجليد','الجاذبية'],2,'الجليديات.'],
   [15,'أي الأماكن التالية تكون فيها التجوية الكيميائية أكثر نشاطًا؟',['الصحارى','الجبال','المناطق القطبية','المناطق الاستوائية'],3,'لأنها حارة رطبة.'],
   [16,'عندما يتحد ثاني أكسيد الكربون مع الماء يتكوّن:',['كربونات الكالسيوم','حمض الكربونيك','حمض التنيك','حمض الهيدروكلوريك'],1,'حمض الكربونيك.'],
   [17,'أي عوامل التعرية التالية يكوّن الكثبان الرملية؟',['الرياح','المياه','الجاذبية','الجليد'],0,'الرياح.']].forEach(function(r){
     G.mcq(L,{id:'c6r-'+r[0],goal:(r[0]==15||r[0]==16)?2:4,lvl:1,keep:true,q:'('+String(r[0]).replace(/\d/g,function(d){return '٠١٢٣٤٥٦٧٨٩'[d]})+') '+r[1],o:r[2],a:r[3],ex:r[4]})});
  G.solutions($('#cR',el),[
   {src:'استخدام المفردات ١',q:'أي أجزاء لب الأرض يعتقد العلماء أنه سائل؟',a:'<b>اللب الخارجي</b>.'},
   {src:'استخدام المفردات ٢',q:'ضمن أي نوع من الجبال تصنف جبال عسير في المملكة العربية السعودية؟',a:'<b>الجبال الناهضة</b>، وقد تكوّنت منذ ما يزيد على ٥٠٠ مليون عام.'},
   {src:'استخدام المفردات ٣',q:'أي نوع من الجبال يتكوّن في المناطق التي تضغط فيها الصخور بعضها على بعض؟',a:'<b>الجبال المطوية</b>، وتتكوّن بفعل قوى الضغط عند تقارب الصفائح.'},
   {src:'جملة علمية ٤',q:'التجوية الكيميائية – التجوية الميكانيكية',a:'في <b>التجوية الميكانيكية</b> تتفتت الصخور إلى قطع أصغر دون أن يتغير تركيبها، أما في <b>التجوية الكيميائية</b> فيتغير التركيب الكيميائي للصخور والمعادن.'},
   {src:'جملة علمية ٥',q:'التعرية – التجوية',a:'<b>التجوية</b> تفتّت الصخور في مكانها، ثم تنقل <b>التعرية</b> الفتات والرسوبيات من مكان إلى آخر.'},
   {src:'جملة علمية ٦',q:'الجريان السطحي – الجريان الصفائحي',a:'<b>الجريان السطحي</b> حركة الماء على سطح الأرض، وعندما يجري على منحدر في طبقة رقيقة يسمى <b>جريانًا صفائحيًّا</b>.'},
   {src:'جملة علمية ٧',q:'حركة الكتل – التجوية الميكانيكية',a:'تنقل <b>حركة الكتل الأرضية</b> بفعل الجاذبية إلى أسفل المنحدر الفتاتَ الصخري الناتج عن <b>التجوية الميكانيكية</b>.'},
   {src:'جملة علمية ٨',q:'التجوية – التجوية الكيميائية',a:'<b>التجوية الكيميائية</b> نوع من <b>التجوية</b> يتغير فيه التركيب الكيميائي للصخور بفعل الأحماض والأكسجين.'},
   {src:'تثبيت المفاهيم ٩',q:'أي أجزاء الأرض أكبر؟',a:'ب. الستار.'},
   {src:'تثبيت المفاهيم ١٠',q:'صفائح الأرض هي قطع من:',a:'أ. الغلاف الصخري.'},
   {src:'تثبيت المفاهيم ١١',q:'أي القوى تسبب تقارب الصفائح؟',a:'ب. الضغط.'},
   {src:'تثبيت المفاهيم ١٢',q:'أي القوى تسبب تباعد الصفائح؟',a:'أ. الشد.'},
   {src:'تثبيت المفاهيم ١٣',q:'أي نوع من حركة الصفائح يحدث عند الحدود التحويلية؟',a:'د. انزلاق الصفائح بعضها بجانب بعض.'},
   {src:'تثبيت المفاهيم ١٤',q:'أي عوامل التعرية يكوّن وديانًا على شكل حرف U؟',a:'جـ. الجليد.'},
   {src:'تثبيت المفاهيم ١٥',q:'أين تكون التجوية الكيميائية أكثر نشاطًا؟',a:'د. المناطق الاستوائية.'},
   {src:'تثبيت المفاهيم ١٦',q:'عندما يتحد ثاني أكسيد الكربون مع الماء يتكوّن:',a:'ب. حمض الكربونيك.'},
   {src:'تثبيت المفاهيم ١٧',q:'أي عوامل التعرية يكوّن الكثبان الرملية؟',a:'أ. الرياح.'},
   {src:'تثبيت المفاهيم ١٨',q:'وضّح كيف تحدد ما إذا كان الجبل ما زال في طور التشكل.',a:'الجبل الذي ما زال في طور التشكل يكون <b>مرتفعًا ذا قمم حادة وعرة</b>؛ لأن التجوية والتعرية لم تؤثرا فيه مدة طويلة، أما الجبل القديم فيكون منخفضًا وقممه مستديرة متآكلة.'},
   {src:'تثبيت المفاهيم ١٩',q:'استنتج كيف تتباطأ الأمواج الزلزالية عند دخولها الغلاف اللدن، وعلامَ يدل هذا؟',a:'تنتقل الموجات أبطأ في المواد الأقل صلابة؛ فتباطؤها يدل على أن <b>الغلاف اللدن مادة لدنة شبه منصهرة</b> قابلة للتشكل والحركة، تتحرك فوقها صفائح الغلاف الصخري.'},
   {src:'التفكير الناقد ٢٠',q:'توقع ماذا يحدث لارتفاع جزيرة جرينلاند عندما تنصهر طبقة الجليد.',a:'<b>ترتفع الجزيرة تدريجيًّا</b>؛ لأن وزن الجليد يقل فترتفع القشرة الأرضية حتى تتوازن من جديد (التوازن الأيزوستاتيكي)، كما ارتفعت القطعة الخشبية في مختبر التوازن.'},
   {src:'التفكير الناقد ٢١',q:'إذا أردت أن تعرف أن جبلًا تشكّل بفعل قوى الضغط فعمَّ تبحث؟',a:'أبحث عن <b>طبقات صخرية مطوية منحنية (طيات)</b>، وعن وقوع الجبل عند حدود صفائح متقاربة، مثل جبال زاجروس.'},
   {src:'التفكير الناقد ٢٢',q:'قارن بين الجبال البركانية والجبال المطوية، وارسم مخططًا لكل نوع وحدّد أجزاءه.',a:'<b>البركانية:</b> تتكوّن من تراكم طبقات اللابة والرماد البركاني حول الفتحة، وقد تتكوّن في قاع المحيط. أجزاء المخطط: الفوهة، والقناة، وغرفة الصهارة، وطبقات اللابة والرماد.<br><b>المطوية:</b> تتكوّن بقوى الضغط عند تقارب الصفائح فتنثني طبقات الصخور. أجزاء المخطط: الطبقات الصخرية المطوية، والطيات، واتجاه قوى الضغط.<br><b>وجه الاختلاف:</b> الأولى ببناء مواد جديدة من باطن الأرض، والثانية بثني صخور موجودة. <i>(الرسم يرسمه الطالب.)</i>'},
   {src:'التفكير الناقد ٢٣',q:'السبب والنتيجة: اشرح كيف تعمل مياه الأنهار على تكوين الوديان، وكيف تشكّل الجليديات وديانًا على شكل حرف U.',a:'<b>النهر:</b> يحتّ الماء الجاري بسرعة قاع مجراه بما يحمله من رسوبيات فيعمّقه، فيتكوّن وادٍ ضيق عميق على شكل حرف V.<br><b>الجليديات:</b> تنزلق ببطء وتحمل صخورًا تكشط قاع الوادي وجوانبه معًا، فتوسّعه ويصبح على شكل حرف U.'},
   {src:'التفكير الناقد ٢٤',q:'كوّن فرضية حول كيفية عمل المياه العميقة والجليديات الضخمة على تعرية الصخور.',a:'<i>نموذج فرضية:</i> كلما زاد عمق الماء أو حجم الجليدية زادت قدرتهما على تعرية الصخور؛ لأن الوزن وكمية الرسوبيات والصخور المحمولة التي تحتّ القاع تزداد.'},
   {src:'التفكير الناقد ٢٥',q:'صنّف كلًّا من الكثبان الرملية والدلتا والرواسب الجليدية وفق العوامل التي ترسبها.',a:'الكثبان الرملية ← <b>الرياح</b>.<br>الدلتا ← <b>الماء الجاري (الأنهار)</b>.<br>الرواسب الجليدية ← <b>الجليديات</b>.'},
   {src:'خريطة المفاهيم ٢٦',q:'ارسم خريطة مفاهيم تبين فيها الأنواع المختلفة من حركات الكتل الأرضية.',a:'<b>حركة الكتل الأرضية (بفعل الجاذبية)</b> ← الزحف (بطيء جدًّا) • السقوط • الانزلاق الصخري (سريع) • التدفق الطيني (ماء ورسوبيات يتحرك كالعجين).'},
   {src:'ملصقات ٢٧',q:'اعمل ملصقًا يوضح الأنواع المختلفة من التجوية والتعرية.',a:'نشاط للطالب. يُقسم الملصق إلى: <b>التجوية الميكانيكية</b> (الجليد، الجذور)، و<b>التجوية الكيميائية</b> (الأحماض، الأكسجين)، و<b>عوامل التعرية</b> (الجاذبية، الجليديات، الرياح، الماء)، مع صورة لكل نوع.'},
   {src:'عمل نموذج ٢٨',q:'اعمل نموذجًا لإحدى الجليديات من البوليستيرين والورق المقوى والطين، موضحًا جداول الماء وأماكن التعرية والترسيب.',a:'نشاط للطالب. يوضح النموذج: الجليدية تنحدر في وادٍ على شكل حرف U <b>(تعرية)</b>، وعند مقدمتها حيث ينصهر الجليد تخرج جداول الماء وتتجمع <b>الرواسب الجليدية (ترسيب)</b>.'},
   {src:'تطبيق الرياضيات ٢٩',q:'مخيم القاعدة على ارتفاع ٥٤٠٠ م، وقمة إفرست على ارتفاع ٨٨٥٠ م. ما نسبة ارتفاع المخيم إلى ارتفاع القمة؟',a:'النسبة = ٥٤٠٠ ÷ ٨٨٥٠ × ١٠٠ ≈ <b>٦١٪</b>.'}]);
  return {}}});

/* ===== ١٤) م٩ المسابقة ===== */
function MQ(l,q,o,a,ex){return {l:l,q:q,o:o,a:a,ex:ex}}
var TF=['صح','خطأ'];
var BANK=[MQ(1,'أيّ عوامل التعرية يكوّن وديانًا على شكل حرف U؟',['الجليد','الرياح','المياه','الجاذبية'],0,'الجليديات.'),MQ(1,'أيّ عوامل التعرية يكوّن الكثبان الرملية؟',['الرياح','المياه','الجاذبية','الجليد'],0,'الرياح.'),
 MQ(1,'عندما يتحد ثاني أكسيد الكربون مع الماء يتكوّن:',['حمض الكربونيك','كربونات الكالسيوم','حمض التنيك','حمض الهيدروكلوريك'],0,'حمض الكربونيك.'),MQ(1,'أين تكون التجوية الكيميائية أكثر نشاطًا؟',['المناطق الاستوائية','الصحارى','الجبال','المناطق القطبية'],0,'الحارة الرطبة.'),
 MQ(1,'تآكل الصخور والرسوبيات ونقلها:',['التعرية','التجوية','الترسيب','التأكسد'],0,'التعرية.'),MQ(1,'من عوامل التجوية الميكانيكية:',['جذور النباتات','حمض الكربونيك','الأكسجين','أحماض النباتات'],0,'الجذور توسّع الشقوق.'),
 MQ(1,'مادة قاتمة اللون تتكوّن من تحلل المواد العضوية:',['الدبال','الكاولين','الرمل','الحصى'],0,'الدبال.'),MQ(1,'حركة بطيئة جدًّا للتربة نحو أسفل المنحدر:',['الزحف','الانزلاق الصخري','السقوط','التدفق الطيني'],0,'الزحف.'),
 MQ(1,'يمكن للنباتات أن تسبب تجوية ميكانيكية.',TF,0,'بنمو جذورها في الشقوق.'),MQ(1,'تُكوّن الأنهار الدلتا عندما تزداد سرعتها.',TF,1,'تتكوّن عندما تنخفض سرعتها.'),MQ(1,'التجوية الكيميائية تغيّر التركيب الكيميائي للصخور.',TF,0,'صحيح.'),
 MQ(2,'يتفاعل الأكسجين مع الحديد في الصخور فيكوّن مركبات هشة تشبه:',['الصدأ','الملح','الجليد','الرمل'],0,'التأكسد.'),MQ(2,'يغيّر حمض الكربونيك الفلسبار إلى معدن:',['الكاولين','الكوارتز','الجرافيت','الألماس'],0,'الكاولين.'),
 MQ(2,'خليط ماء ورسوبيات يتحرك كالعجين:',['التدفق الطيني','الزحف','الانزلاق الصخري','الكثبان'],0,'التدفق الطيني.'),MQ(2,'حمل الرياح للحبيبات الناعمة وترك الكبيرة:',['البرْي','الحتّ','الترسيب','الزحف'],0,'البري.'),
 MQ(2,'حركة الماء الذي يجري على سطح الأرض:',['الجريان السطحي','التبخر','التكاثف','الزحف'],0,'عامل رئيس في التعرية.'),MQ(2,'من العوامل المؤثرة في تكوّن التربة:',['المناخ والزمن','لون السماء','عدد السكان','طول النهار فقط'],0,'ونوع الصخر الأصلي وميل السطح والمخلوقات الحية.'),
 MQ(2,'معدل التجوية الكيميائية في المناخ الحار الجاف:',['بطيء','سريع','سريع جدًّا','لا تحدث'],0,'بطيء.'),MQ(2,'تفرز جذور النباتات والحزازيات أحماضًا تذيب بعض معادن الصخر؛ وهذه تجوية:',['كيميائية','ميكانيكية','بالرياح','بالجاذبية'],0,'كيميائية.'),
 MQ(2,'تتحرك الصخور نحو أسفل المنحدر بسبب الجاذبية فقط؛ تسمى:',['حركة الكتل الأرضية','الجريان السطحي','البري','الحت'],0,'حركة الكتل الأرضية.'),MQ(2,'الحمض الموجود في الخل:',['حمض الأسيتيك (الخليك)','حمض الكربونيك','حمض الهيدروكلوريك','حمض التنيك'],0,'حمض الأسيتيك.'),
 MQ(3,'تعرّي الرياح منطقة بمعدل ٢ مم كل سنة. كم ينخفض سطحها بعد ٢٠٠٠ سنة؟',['٤ م','٤٠ م','٤٠٠ مم','٢ م'],0,'٤٠٠٠ مم = ٤ م.'),MQ(3,'لماذا تتسع الشقوق عند تجمد الماء فيها؟',['لأن الماء يتمدد عند تجمده فيولّد ضغطًا','لأن الماء يذيب الصخر','لأن الجليد يجذب الصخر','لأن الماء ينكمش'],0,'التمدد يوسّع الشق.'),
 MQ(3,'يحتّ النهر الصخور عندما:',['يجري بسرعة','تنخفض سرعته','يصل إلى البحر','يتجمد'],0,'ويرسّب عندما تنخفض سرعته.'),MQ(3,'أيّ مما يلي يحدث حيث تترسب المواد؟',['الدلتا','الأخاديد','الوديان','الوادي على شكل U'],0,'الدلتا والكثبان.'),
 MQ(3,'أي التفاعلين أسرع في تجربة الأحماض؟',['حمض الهيدروكلوريك المخفف مع الحجر الجيري','الخل مع الحجر الجيري','الماء مع الحجر الجيري','لا يحدث تفاعل'],0,'حمض الهيدروكلوريك أسرع.'),
 MQ(3,'لماذا تُعرّى الطبقة العلوية الداكنة من التربة أولًا؟',['لأنها الطبقة الظاهرة على السطح','لأنها الأعمق','لأنها صخرية','لأنها لا تحتوي على مواد عضوية'],0,'وهي غنية بالمواد العضوية.'),MQ(3,'التجوية الميكانيكية لا تغيّر التركيب الكيميائي للصخر.',TF,0,'تكسره إلى قطع أصغر فقط.')];
BANK.forEach(function(q,i){q.id='g6b-'+(i+1)});
S({id:'contest',name:'م سباق البراكين (إثرائي)',ic:'🌋',manual:true,build:function(el){return G.contest(el,{ey:'المحطة ١٠ · مسابقة الفرق الأربعة',title:'سباق البراكين: التجوية والتعرية',bank:BANK})}});

/* ===== ١٥) ختام البعثة ===== */
S({id:'review',name:'م١١ ختام البعثة',ic:'🏁',build:function(el){return G.review(el,{antKey:'l2',ant:ANT,goals:[
  {t:GO[0],how:'كسرنا الصخرة بالتجمد والجذور',st:['mech'],q:['l2-mech']},
  {t:GO[1],how:'أذبنا الطباشير والحجر الجيري بالأحماض، وقسنا أثر المناخ',st:['chem','climate'],q:['l2-carb','l2-mc','l2-trop']},
  {t:GO[2],how:'كوّنا التربة من مكوناتها',st:['soil'],q:['l2-soil','l2-sf']},
  {t:GO[3],how:'جرّبنا الجاذبية والجليديات والرياح والماء',st:['mass','icewind','water'],q:['l2-mmo','l2-ag']},
  {t:GO[4],how:'شاهدنا الوديان والكثبان والدلتا',st:['icewind','water'],q:['l2-u','l2-dune','l2-delta','l2-er']}],
  exit:[{id:'l2-x1',goal:1,lvl:1,q:'نوع التجوية التي يتغيّر فيها التركيب الكيميائي للصخر:',o:['الكيميائية','الميكانيكية','بالجليد','بالجذور'],a:0,ex:'التجوية الكيميائية.'},{id:'l2-x2',goal:4,lvl:1,q:'من عوامل التعرية:',o:['الجاذبية والجليديات والرياح والماء','الدبال والكاولين','الصدأ والملح','الكلوروفيل'],a:0,ex:'هذه عوامل التعرية.'},{t:'tf',id:'l2-x3',goal:5,lvl:2,q:'تتكوّن الدلتا حيث تُزال المواد.',v:false,ex:'تتكوّن حيث تترسب المواد.'}],
  hw:['وضّح متى تقوم الأنهار بترسيب الرسوبيات؟ ومتى تقوم بحتّ الصخور؟','ارسم مخططًا لجبل بركاني وآخر مطوي وحدّد أجزاء كلٍّ منهما (سؤال ٢٢ ص ١٩٥).']})}});

TV=G.termSetup(L,TERMS,[{id:'mech',pg:'ص ١٧٥–١٧٦',i:[0,1]},{id:'chem',pg:'ص ١٧٧',i:[2,3]},{id:'soil',pg:'ص ١٧٩–١٨٠',i:[4,5]},{id:'mass',pg:'ص ١٨١–١٨٢',i:[6,7]},{id:'icewind',pg:'ص ١٨٣–١٨٥',i:[8,9]},{id:'water',pg:'ص ١٨٦–١٨٨',i:[10,11]}]);

/* ===== أدوات مطابقة العرض ===== */
function evalSt(id,ey,title,qs){return {id:id,name:'م '+title,ic:'📝',build:function(el){el.innerHTML='<div class="ey">'+ey+'</div><h1 class="t">'+title+'</h1><div class="col scroll grow"><div id="ev" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;align-content:start"></div></div>';var c=$('#ev',el);qs.forEach(function(q){q.keep=true;var d=h('<div></div>');c.appendChild(d);G.mcq(d,q)});return {enter:function(){G.done(id)}}}}}
function sumSt(ey,sec){return {id:'sum',name:'م الخلاصة',ic:'📌',build:function(el){el.innerHTML='<div class="ey">'+ey+'</div><h1 class="t">الخلاصة</h1><div class="col scroll grow"><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;align-content:start">'+sec.map(function(s,i){return '<div class="cd'+(i?' reveal':'')+'"><h3>'+s[0]+'</h3><ul style="margin:0;font-size:18px;line-height:1.8">'+s[1].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'}).join('')+'</div><p class="hint" style="margin:6px 0 0">اضغط «كشف» لإظهار القسم التالي.</p></div>';return {enter:function(){G.done('sum')},reveal:function(){var r=$$('.reveal:not(.shown)',el);if(r.length){r[0].classList.add('shown');return true}return false}}}}}
function orderSt(L,ORD,skip){L.stations.sort(function(a,b){return ORD.indexOf(a.id)-ORD.indexOf(b.id)});var k=0;L.stations.forEach(function(st){if(skip.indexOf(st.id)>=0)return;k++;st.name='م'+n(k)+' '+st.name.replace(/^م\S*\s+/,'');var kk=k,b=st.build;st.build=function(el,ctx){var r=b(el,ctx);var ey=$('.ey',el);if(ey&&ey.firstChild&&ey.firstChild.nodeType===3)ey.firstChild.textContent=ey.firstChild.textContent.replace(/^المحطة\s*[٠-٩]*/,'المحطة '+n(kk));return r}})}

S(evalSt('eval1','المحطة · تقييم الدرس الثاني','تقييم: التجوية والتعرية وأثرهما',[
 {id:'l2-u',goal:5,lvl:1,kind:'السؤال ١ من ٤',q:'أيّ عوامل التعرية يكوّن وديانًا على شكل حرف U؟',o:['الرياح','المياه','الجليد','الجاذبية'],a:2,ex:'الجليديات تحتّ القاع فتجعل الوديان على شكل حرف U.'},
 {id:'l2-trop',goal:2,lvl:1,kind:'السؤال ٢ من ٤',q:'أين تكون التجوية الكيميائية أكثر نشاطًا؟',o:['الصحارى','الجبال','المناطق القطبية','المناطق الاستوائية'],a:3,ex:'في المناطق الاستوائية الحارة الرطبة.'},
 {id:'l2-carb',goal:2,lvl:1,kind:'السؤال ٣ من ٤',q:'عندما يتحد ثاني أكسيد الكربون مع الماء يتكوّن:',o:['كربونات الكالسيوم','حمض الكربونيك','حمض التنيك','حمض الهيدروكلوريك'],a:1,ex:'حمض الكربونيك.'},
 {id:'l2-dune',goal:5,lvl:1,kind:'السؤال ٤ من ٤',q:'أيّ عوامل التعرية يكوّن الكثبان الرملية؟',o:['الرياح','المياه','الجاذبية','الجليد'],a:0,ex:'الرياح.'}]));
S(sumSt('المحطة · الخلاصة',[
 ['التجوية الميكانيكية',['تؤدي دورة التجمد والانصهار إلى تآكل الصخور وتفتتها.','تؤدي جذور النباتات والحيوانات التي تحفر الأرض إلى تفتت الصخور.']],
 ['الجليديات والرياح والماء',['تتحرك الجليديات فتعري المواد وترسّبها في مكان آخر.','البرْي والحتّ نوعان من التعرية ينجمان عن الرياح.','تنجم التعرية عن جريان الماء، وقد تنشأ عنها الوديان والأخاديد.']],
 ['التجوية الكيميائية',['تتفاعل بعض الصخور مع الأحماض الطبيعية.','تؤثر في التربة عوامل مختلفة هي: نوع الصخر الأصلي، ودرجة ميل السطح، والمناخ، والزمن، والمخلوقات الحية.']]]));

/* ===== شاشات «شرح الكتاب»: العناوين الفرعية للكتاب نقطةً نقطة وبترتيبه ===== */
(function(){if(document.getElementById('bkcss'))return;var s=document.createElement('style');s.id='bkcss';s.textContent=".bkg{display:grid;gap:12px;align-content:stretch;min-height:0}.bkc{cursor:pointer;display:flex;flex-direction:column;gap:6px;min-height:0;overflow:hidden;transition:transform .15s}.bkc:active{transform:scale(.99)}.bkc h3{margin:0;font-size:25px;line-height:1.3;display:flex;align-items:center;gap:10px}.bkn{flex:0 0 auto;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-size:19px;color:#fff;background:var(--bkA)}.bkp{margin:0;padding:0 26px 0 0;font-size:20px;line-height:1.6;font-weight:600}.bkp li{margin:2px 0}.bkc:not(.open) .bkp,.bkc:not(.open) .bki{visibility:hidden}.bkc:not(.open) h3::after{content:'المس للشرح';font-size:14px;margin-inline-start:auto;opacity:.65;font-weight:600}.bkb{display:flex;gap:12px;align-items:flex-start;min-height:0}.bkb .bkp{flex:1;min-width:0}.bki{flex:0 0 150px;display:flex;flex-direction:column;gap:8px}.bki img{width:150px!important;height:112px!important;object-fit:cover;border-radius:10px;margin:0!important;display:block}.bkt{width:100%;border-collapse:separate;border-spacing:0 5px;font-size:20px}.bkt th{font-size:21px;padding:8px 10px;color:#fff;background:var(--bkA);text-align:center}.bkt th:first-child{border-radius:0 10px 10px 0}.bkt th:last-child{border-radius:10px 0 0 10px}.bkt td{padding:7px 10px;text-align:center;line-height:1.45;font-weight:600}.bkt td:first-child{font-weight:700}.bkt tr.reveal.shown{display:table-row}.bkbar{display:flex;gap:10px;align-items:center;margin-top:8px}";document.head.appendChild(s)})();
function BKB(t){return String(t).replace(/<b>/g,'<b class="hl">')}
function BK(o){return {id:o.id,name:'م 📖 '+o.name,ic:o.ic||'📖',build:function(el){
  var cards=o.cards.map(function(c,i){return '<div class="cd bkc" data-i="'+i+'"><h3><span class="bkn">'+n(i+1)+'</span>'+c[0]+'</h3><div class="bkb"><ul class="bkp">'+c[1].map(function(p){return '<li>'+BKB(p)+'</li>'}).join('')+'</ul>'+(c[2]?'<div class="bki">'+c[2].map(function(k){return img(k,'')}).join('')+'</div>':'')+'</div></div>'}).join('');
  el.innerHTML='<div class="ey">المحطة · شرح الكتاب '+o.pg+'</div><h1 class="t" style="font-size:40px;margin:0 0 10px">'+o.title+'</h1>'+
   '<div class="bkg grow" style="grid-template-columns:repeat('+(o.cols||2)+',1fr)">'+cards+'</div>'+
   '<div class="bkbar"><button class="b o" data-all>👁 اعرض الشرح كاملًا</button><span class="hint">المس العنوان الفرعي لإظهار شرحه، أو اضغط «كشف» لإظهار العناوين بالترتيب.</span></div>';
  el.style.setProperty('--bkA','var(--olive)');
  var cs=$$('.bkc',el);function chk(){if(cs.every(function(c){return c.classList.contains('open')}))G.done(o.id)}
  cs.forEach(function(c){c.onclick=function(){c.classList.toggle('open');G.sfx&&G.sfx.pop&&G.sfx.pop();chk()}});
  $('[data-all]',el).onclick=function(){cs.forEach(function(c){c.classList.add('open')});chk()};
  return {reveal:function(){var c=cs.filter(function(c){return !c.classList.contains('open')})[0];if(c){c.classList.add('open');chk();return true}return false}}}}}
S(BK({"id": "bk_weath", "ic": "🪨", "name": "التجوية والتجوية الميكانيكية", "pg": "ص ١٧٨–١٧٩", "title": "التجوية، والتجوية الميكانيكية", "cols": 2, "cards": [["التجوية", ["الأخاديد في الشوارع والأرصفة المكسّرة دليل على أن المواد <b>تتغيّر بعوامل الطبيعة</b>.", "<b>التجوية</b>: عملية سطحية ميكانيكية أو كيميائية تؤدي إلى <b>تفتّت الصخور</b> إلى قطع صغيرة.", "من عواملها: التجمد والانصهار، والهواء والأكسجين، والنباتات والحيوانات؛ وقد تحوّل الصخور إلى تربة."]], ["التجوية الميكانيكية", ["تكسّر الصخور إلى قطع صغيرة <b>دون أن يتغيّر تركيبها الكيميائي</b>؛ فالرصيف المكسور يبقى إسمنتًا.", "تركيب القطع الصغيرة مماثل لتركيب الصخر الأصلي (الشكل ١٧).", "من أسبابها: <b>تجمّد الماء</b>، و<b>النشاط الحيوي</b> للمخلوقات الحية."]], ["الجليد (الشكل ١٨)", ["يتسرّب الماء إلى <b>الشقوق</b>، وعندما تنخفض الحرارة دون التجمد تتشكّل بلورات الجليد.", "تأخذ البلورات <b>حيزًا أكبر</b> من الماء السائل فتتمدد، وتولّد ضغطًا يوسّع الشقوق.", "ينصهر الجليد ثم يتجمد مرة أخرى وتتكرر العملية حتى <b>يتشقق الصخر</b> وينكسر."]], ["النباتات والحيوانات", ["تنمو <b>الجذور</b> داخل الشقوق وتزداد سمكًا وطولًا، فتولّد ضغطًا يكسر الصخور (الشكل ١٩).", "<b>السناجب</b> والحيوانات الحافرة تكسّر الصخور والرسوبيات الطرية وتدفعها إلى السطح، حيث يسود نوع آخر هو <b>التجوية الكيميائية</b>."], ["p_roots"]]]}));
S(BK({"id": "bk_chemw", "ic": "🧪", "name": "التجوية الكيميائية", "pg": "ص ١٨٠–١٨١", "title": "التجوية الكيميائية", "cols": 2, "cards": [["ما التجوية الكيميائية؟", ["تحدث عندما <b>يتغيّر التركيب الكيميائي</b> للصخور.", "أكثر تأثيرًا في <b>المناطق الاستوائية</b> الرطبة الحارة، وبطيئة في <b>الصحارى</b> لقلة الأمطار، وفي <b>القطبين</b> لانخفاض الحرارة.", "أهم عاملين فيها: <b>الأكسجين</b> و<b>الأحماض الطبيعية</b>."]], ["الأحماض الطبيعية", ["يتفاعل الماء مع ثاني أكسيد الكربون في الهواء أو التربة فيتكوّن <b>حمض الكربونيك</b>، الذي يغيّر التركيب الكيميائي للمعادن.", "يتفاعل <b>الفلسبار</b> مع حمض الكربونيك فيتكوّن معدن <b>الكاولين</b> (الشكل ٢٠).", "حمض ضعيف لكنه يذيب <b>الحجر الجيري والدولوميت والرخام</b>، كما يذيب الخلّ كربونات الكالسيوم في الطباشير."], ["p_kaolin"]], ["أحماض النباتات", ["تفرز جذور النباتات أحماضًا تتفاعل مع الصخور.", "كثير من النباتات يكوّن مادة <b>التنّين</b>، ومع السوائل يتكوّن <b>حمض التنيك</b> الذي يذيب بعض المعادن فيضعف الصخر ويتكسّر.", "عند إزالة الطحالب أو النباتات النامية على صخر نلاحظ زوال لونه (الشكل ٢١)."], ["p_lichen"]], ["أثر الأكسجين", ["السيارات الصدئة والتربة الحمراء نتائج عملية <b>أكسدة</b>.", "يتفاعل الحديد مع الأكسجين فيتكوّن <b>الصدأ</b>؛ والصخور الغنية بالحديد تتحول إلى مركبات <b>هشة</b> فتضعف وتتكسّر.", "تتلوّن بعض الصخور <b>بالأحمر أو البرتقالي</b> عندما تتفاعل معادنها الحديدية مع الأكسجين."]]]}));
S(BK({"id": "bk_soil", "ic": "🌱", "name": "التربة وعوامل تكوّنها", "pg": "ص ١٨١–١٨٣", "title": "التربة وعوامل تكوّنها", "cols": 2, "cards": [["التربة", ["<b>التربة</b>: خليط من مواد عضوية وماء وهواء وصخر تعرّض لعمليات التجوية، وهي مهمة لنمو النباتات.", "تتضمن المواد العضوية المتحللة، كالأوراق والأغصان والجذور.", "عوامل تكوّنها (جدول ٢): <b>الصخر الأصلي، ودرجة ميل السطح، والمناخ، والزمن، والمخلوقات الحية</b>."]], ["الصخر الأصلي ودرجة ميل السطح", ["الحجر الجيري المتعرّض للتجوية الكيميائية تكثر فيه التربة <b>الطينية</b>، والصخر الرملي تتكوّن فيه تربة <b>رملية</b>.", "المنحدرات نادرًا ما تحوي تربة؛ لأن فتات الصخور ينزلق باستمرار، أما <b>المنبسطة</b> فتترسّب فيها الرسوبيات فتتكوّن تربة <b>سميكة</b>."]], ["المناخ", ["التجوية الفعّالة في المناخ الحار الرطب تكوّن تربة سميكة بسرعة.", "يؤثر في كمية المواد العضوية: قليلة في تربة <b>الصحارى</b>، وكثيرة في المناخ <b>الحار الرطب</b>.", "تحلّل البكتيريا والفطريات البقايا إلى مادة قاتمة هي <b>الدبال</b>، تحفظ الماء وتوفر المواد المغذية (الشكل ٢٢)."]], ["الزمن والمخلوقات الحية", ["قد تحتاج التربة إلى <b>آلاف السنين</b>، وتتكوّن السميكة حيث تستمر التجوية دون تعرية أو ترسّب سريع فوقها.", "<b>الأشنات</b> (طحالب وفطريات تعيش معًا) تضعف الصخر فتنشأ طبقة رقيقة من التربة، ثم تنمو الأعشاب والأشجار.", "تربة <b>المناطق العشبية</b> أغنى بالمواد العضوية من تربة الغابات."]]]}));
S(BK({"id": "bk_mass", "ic": "⛰", "name": "عوامل التعرية والجاذبية", "pg": "ص ١٨٣–١٨٥", "title": "عوامل التعرية: الجاذبية وحركة الكتل الأرضية", "cols": 2, "cards": [["عوامل التعرية", ["تنتج الوديان الكبيرة والأقواس الصخرية عن <b>تعرية</b> سطح الأرض.", "<b>التعرية</b>: تآكل الصخور أو الرسوبيات ونقلها.", "تحدث بفعل <b>الجاذبية والجليد والرياح والمياه</b>."]], ["الجاذبية وحركة الكتل الأرضية", ["<b>الجاذبية</b> قوة تسحب الأجسام بعضها نحو بعض، وتسحب كل شيء نحو مركز الأرض.", "تحرّك الصخور والرسوبيات نحو أسفل المنحدر بسبب الجاذبية فقط يُسمّى <b>حركة الكتل الأرضية</b>.", "أنواعها: <b>الزحف، والسقوط، والانزلاق الصخري، والتدفق الطيني</b> (الشكل ٢٣)."]], ["الزحف والسقوط", ["<b>الزحف</b>: حركة الرسوبيات <b>ببطء</b> نحو أسفل المنحدر، ويسود حيث يتجمد الماء وينصهر (الشكل ٢٤)، فتميل الأشجار وتتضرر الأبنية.", "<b>السقوط</b>: تتحرك كتلة إلى أسفل منحدر تاركة أثرًا منحنيًا، ويحدث عادة بعد الزلازل أو الأمطار الغزيرة."], ["p_creep", "p_slump"]], ["الانزلاق الصخري والتدفق الطيني", ["<b>الانزلاق الصخري</b>: تنفصل طبقات من الصخور وتنحدر بسرعة قد تزيد على <b>٢٥٠ كم/ساعة</b>، مثل انزلاق جبل المقطم بالقاهرة عام ٢٠٠٨م.", "<b>التدفق الطيني</b>: يُشبع الجليد المنصهر أو المطر الرسوبيات فتتحرك كتلة رطبة كالعجين، قد تصل سرعتها إلى <b>١٦٠ كم/ساعة</b>."], ["p_slide", "p_mud"]]]}));
S(BK({"id": "bk_icew", "ic": "🧊", "name": "الجليد والرياح", "pg": "ص ١٨٦–١٨٧", "title": "التعرية بالجليد والرياح", "cols": 2, "cards": [["الجليديات", ["في الأماكن الباردة تتراكم الثلوج كتلًا ضخمة سميكة تُدعى <b>الجليديات</b>، وتنزلق على المنحدرات بفعل الجاذبية.", "تغطي جليديات القارات نحو <b>١٠٪</b> من مساحة اليابسة، وتتراوح سرعة جليديات الأودية بين <b>١ سم</b> و<b>٢ م</b> يوميًّا، وقد تصل إلى ٢٠٠ م."]], ["التعرية بفعل الجليد", ["تفتّت الجليديات الصخر المشقق إلى قطع تحملها معها، وتسحب القطع على القاع فتخدشه وتحتّه.", "من نتائجها <b>زيادة عرض الوادي</b> فيصبح شكله كحرف <b>U</b> (الشكل ٢٥)."], ["p_uval"]], ["الترسيب بفعل الجليد", ["مع انصهار الجليد في أسفل الوديان أو أطرافها تترسّب حمولته على شكل <b>رواسب جليدية</b>.", "تتميز بأنها خليط من حبيبات مختلفة الأقطار: من حبيبات <b>الطين</b> الصغيرة إلى <b>الجلاميد</b>."]], ["الرياح", ["تحمل الرياح الحبيبات الناعمة بحجم الغرين أو الرمل تاركة الكبيرة، وتحتّ الرمالُ الصخورَ، وهذا ما يُسمّى <b>البَرْي أو الحت</b>.", "عندما تمر الرياح على عائق كصخر أو نباتات تتباطأ وترسّب حمولتها، فيتكوّن <b>كثيب رملي</b> يهاجر فوق الأرض (الشكل ٢٦)."], ["p_dunes"]]]}));
S(BK({"id": "bk_water", "ic": "🌊", "name": "الماء وأثر التعرية", "pg": "ص ١٨٧–١٨٨", "title": "الماء وأثر التعرية", "cols": 2, "cards": [["الجريان السطحي", ["<b>الجريان السطحي</b>: حركة الماء الذي يجري على سطح الأرض، وهو عامل رئيس في التعرية.", "كلما زادت سرعة المياه زادت <b>مقدرتها على حمل المواد</b> (الشكل ٢٧)."]], ["طرائق جريان الماء", ["<b>الجريان الصفائحي</b>: طبقة رقيقة من الماء على منحدر، كالماء المنسكب على سطح سيارة.", "<b>الجداول والأخاديد</b>: يسير الماء حول الحواجز فيتعمق، وهي أقدر على التعرية من الجريان الصفائحي.", "<b>الأنهار</b>: سريعة في الجبال تحمل قطع الصخور، وفي المنبسطات تبطؤ فتحتّ جانبًا وترسّب على الآخر."]], ["تشكيل سطح الأرض", ["الأنهار من أهم عوامل الحت؛ تقطع الصخور الصلبة وتكوّن <b>وديانًا ضخمة</b>.", "عندما يصل النهر إلى بحر أو بحيرة تنخفض سرعته فيرسّب حمولته مكوّنًا <b>الدلتا</b>، مثل دلتا نهر النيل، وتربتها من أخصب أنواع التربة (الشكل ٢٨)."], ["p_delta"]], ["أثر التعرية", ["تشترك جميع عوامل التعرية في تشكيل سطح الأرض بنقل الصخور والرسوبيات من مكان إلى آخر.", "أماكن <b>الإزالة</b> تتكوّن فيها <b>الوديان والأخاديد</b>.", "أماكن <b>الترسيب</b> تتكوّن فيها <b>الدلتا والكثبان الرملية</b> ومظاهر أخرى."]]]}));
orderSt(L,['intro','wonder','goals','prior','terms','bk_weath','mech','bk_chemw','chem','climate','bk_soil','soil','bk_mass','mass','bk_icew','icewind','bk_water','water','eval1','qa','sum','chrev','contest','review'],['intro','wonder','goals','prior','terms']);
G.lesson('l2',L);
})();
