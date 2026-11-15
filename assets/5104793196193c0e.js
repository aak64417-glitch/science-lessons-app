/* الدرس الثاني: علم الوراثة (ص ١٢٨–١٣٥) */
(function(){
"use strict";
var G=window.G,$=G.$,$$=G.$$,n=G.n,h=G.h,img=G.img;
function cd(t,b,st){return '<div class="cd" style="'+(st||'')+'">'+(t?'<h3>'+t+'</h3>':'')+b+'</div>'}
function lay(el,ey,title,left,right,lf){el.innerHTML='<div class="ey">'+ey+'</div><h1 class="t">'+title+'</h1><div class="row grow"><div class="col'+(left.indexOf('<canvas')<0?' scroll':'')+'" style="flex:'+(lf||1.35)+'">'+left+'</div><div class="col scroll grow" id="R">'+right+'</div></div>';return $('#R',el)}
function E(s){return '<span class="ltr">'+s+'</span>'}
function gt(a,b){return a<b?a+b:b+a} /* الحرف الكبير أولًا */
var GO=['أن يفسر الطالب كيف تورث الصفات.','أن يتعرف الطالب دور العالم مندل في علم الوراثة.','أن يستعمل الطالب مربع بانيت لتوقع نتائج التزاوج.','أن يميز الطالب بين الطرز الجينية والطرز الشكلية.'];
var ANT=[['الوراثة هي انتقال الصفات الوراثية من الآباء إلى الأبناء.',true,'هذا تعريف الوراثة.'],
 ['يحمل الفرد لكل صفة وراثية جينًا واحدًا فقط.',false,'يحمل زوجًا من الجينات المتقابلة (الأليلات) لكل صفة؛ واحد من كل أب.'],
 ['لا تظهر الصفة المتنحية إلا إذا كان الجينان المتقابلان متنحيين.',true,'مثل aa؛ فإذا وُجد الجين السائد اختفت صفتها.'],
 ['الهجين مخلوق حي جيناته المتقابلة متماثلة.',false,'الهجين جيناته المتقابلة مختلفة في الصفة، مثل Aa.'],
 ['يساعد مربع بانيت على توقع صفات الأبناء.',true,'يُستعمل لتوقع نتائج التزاوج وتحديد الطرز الجينية والشكلية.']];
var L={title:'علم الوراثة',cover:'b_peas',blurb:'نتتبع الجينات من الآباء إلى الأبناء: حديقة مندل، ومختبر التلقيح، والسائد والمتنحي، وعملات الاحتمالات، وورشة مربع بانيت.',stations:[]};
function S(o){L.stations.push(o)}

/* ===== ١) المقدمة التشويقية ===== */
S({id:'intro',name:'المقدمة التشويقية',ic:'🎬',full:true,manual:true,build:function(el){
  function ez(a,b,t){t=Math.min(1,Math.max(0,(t-a)/(b-a)));return t*t*(3-2*t)}
  function face(x,cx,cy,r,eye,al){x.save();x.globalAlpha=al;x.fillStyle='#f2c9a0';x.beginPath();x.arc(cx,cy,r,0,7);x.fill();x.fillStyle='#3b2a1e';x.beginPath();x.arc(cx,cy-r*.35,r*.95,Math.PI*1.05,Math.PI*1.95);x.fill();
    [-1,1].forEach(function(s){x.fillStyle='#fff';x.beginPath();x.ellipse(cx+s*r*.38,cy,r*.2,r*.14,0,0,7);x.fill();x.fillStyle=eye;x.beginPath();x.arc(cx+s*r*.38,cy,r*.11,0,7);x.fill();x.fillStyle='#111';x.beginPath();x.arc(cx+s*r*.38,cy,r*.05,0,7);x.fill()});
    x.strokeStyle='#a0583c';x.lineWidth=r*.06;x.beginPath();x.arc(cx,cy+r*.3,r*.3,.2,Math.PI-.2);x.stroke();x.restore()}
  function pod(x,cx,cy,s,col,al,rot){x.save();x.globalAlpha=al;x.translate(cx,cy);x.rotate(rot||0);x.fillStyle=col;x.beginPath();x.ellipse(0,0,26*s,80*s,0,0,7);x.fill();x.strokeStyle='rgba(0,0,0,.18)';x.lineWidth=3;x.beginPath();x.moveTo(0,-74*s);x.lineTo(0,74*s);x.stroke();x.fillStyle='#4f7a2a';x.fillRect(-4*s,-96*s,8*s,22*s);x.restore()}
  return G.cine(el,{dur:24,finalAt:20.4,final:'كيف تنتقل الصفات من الآباء إلى الأبناء؟<br><span class="gl2">وكيف نتوقعها قبل أن تظهر؟</span>',
    caps:[[.8,5.6,'لماذا يشبه الأبناء آباءهم… لكن لا يطابقونهم تمامًا؟'],[6,11,'في عام ١٨٥٦م بدأ مندل تجاربه على نبات البازلاء'],[11.4,15.6,'لقّح نباتًا أخضر القرون بآخر أصفر القرون… فاختفى اللون الأصفر!'],[16,20,'لكن السر يُكتب بحروف: كبيرة وصغيرة']],
    draw:function(x,t,W,H){var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#120b2e');g.addColorStop(1,'#25174f');x.fillStyle=g;x.fillRect(0,0,W,H);
      if(t<6.2){var a=1-ez(5.4,6.2,t);face(x,560,330,110,'#6b3b16',a*ez(0,1,t));face(x,1040,330,110,'#2f7ed8',a*ez(.5,1.5,t));var k=ez(2,3.5,t);x.save();x.globalAlpha=a*k;x.strokeStyle='#b9a6ff';x.lineWidth=4;x.beginPath();x.moveTo(560,450);x.quadraticCurveTo(800,520,800,560);x.moveTo(1040,450);x.quadraticCurveTo(800,520,800,560);x.stroke();x.restore();face(x,800,640,80,'#6b3b16',a*k)}
      else if(t<11.4){var u=ez(6,8,t);x.fillStyle='#2e5a2a';x.fillRect(0,700,W,200);for(var i=0;i<9;i++){var X=180+i*155,gr=ez(6.2+i*.2,8.4+i*.2,t);x.strokeStyle='#4f8a3a';x.lineWidth=7;x.beginPath();x.moveTo(X,700);x.quadraticCurveTo(X+20*Math.sin(t+i),700-150*gr,X,700-300*gr);x.stroke();if(gr>.5)pod(x,X+30,700-200*gr,.55*gr,i%2?'#e9c938':'#4fae3a',1,.3)}G.T(x,'🌱 حديقة مندل',800,120,46,'#d9ccff')}
      else if(t<16){var k2=ez(11.4,12.6,t),m=ez(13,14.5,t);pod(x,560,300,1.3,'#4fae3a',k2,-.2);pod(x,1040,300,1.3,'#e9c938',k2*(1-m*.0),.2);G.T(x,'×',800,300,90,'#fff');
        x.globalAlpha=m;for(var j=0;j<4;j++)pod(x,500+j*200,650,.9,'#4fae3a',m,(j-1.5)*.1);x.globalAlpha=1;if(m>.5)G.T(x,'الجيل الأول: جميعها خضراء القرون',800,820,32,'#7ff0c8')}
      else{var p=ez(16,17.5,t),L=['Y','y'];x.globalAlpha=p;x.strokeStyle='#c9b8ff';x.lineWidth=5;var X0=560,Y0=230,S=170;for(var r=0;r<=3;r++){x.beginPath();x.moveTo(X0,Y0+r*S);x.lineTo(X0+3*S,Y0+r*S);x.stroke();x.beginPath();x.moveTo(X0+r*S,Y0);x.lineTo(X0+r*S,Y0+3*S);x.stroke()}
        L.forEach(function(l,i){G.T(x,l,X0+S*1.5+i*S,Y0+S/2,70,'#ffd166');G.T(x,l,X0+S/2,Y0+S*1.5+i*S,70,'#7ff0c8')});
        var q=ez(18,19.5,t);x.globalAlpha=q;[['YY',0,0],['Yy',1,0],['Yy',0,1],['yy',1,1]].forEach(function(c){G.T(x,c[0],X0+S*1.5+c[1]*S,Y0+S*1.5+c[2]*S,58,c[0]==='yy'?'#ff9fb7':'#fff')});x.globalAlpha=1}
      if(t>20){x.fillStyle='rgba(5,3,18,'+.6*ez(20,21,t)+')';x.fillRect(0,0,W,H)}}})}});

/* ===== ٢) ماذا سنتعلم اليوم؟ ===== */
S({id:'wonder',name:'ماذا سنتعلم اليوم؟',ic:'❓',build:function(el){return G.wonder(el,{ey:'الدرس الثاني · علم الوراثة',items:[['👪','كيف تنتقل الصفات من الآباء إلى الأبناء؟'],['🌱','ماذا اكتشف مندل في حديقة البازلاء؟'],['🔠','ما الجين السائد؟ وما الجين المتنحي؟'],['🎲','هل للاحتمالات دور في توقع الصفات؟'],['🔲','كيف نستعمل مربع بانيت لتوقع صفات الأبناء؟']]})}});

/* ===== ٣) الأهداف ===== */
S({id:'goals',name:'أهداف الدرس',ic:'🎯',build:function(el){return G.goals(el,{ey:'علم الوراثة · ص ١٢٨',ideaL:'أهمية الدرس',idea:'يساعد علم الوراثة على تفسير اختلاف الصفات بين الناس.',goals:[['👪',GO[0]],['🌱',GO[1]],['🔲',GO[2]],['🔠',GO[3]]]})}});

/* ===== ٤) التهيئة ===== */
S({id:'prior',name:'تهيئة: هل تشبه والديك؟',ic:'👪',build:function(el){var R=lay(el,'تهيئة · ص ١٢٨','هل تشبه أحد والديك أم جديك؟',
  '<div class="cd tape" style="display:flex;gap:12px;align-items:center">'+img('b_fam','width:260px;height:190px')+img('b_eyes','width:220px;height:190px;object-fit:contain;background:#fff')+'<p class="big" style="margin:0">وهل عيناك تشبهان عيني أبيك؟<br><span class="hint">تأمّل الصورتين، ثم صوّت.</span></p></div>'+
  cd('🔁 مراجعة المفردات','<p style="margin:0;font-size:19px;line-height:1.7"><b class="hl">الانقسام المنصف:</b> عملية حيوية ينتج عنها أربع خلايا أحادية المجموعة الكروموسومية من خلية واحدة ثنائية المجموعة الكروموسومية.</p>')+'<div id="pp"></div>',
  cd('📖 توجيه القراءة: قبل القراءة','<p class="hint" style="margin:0 0 6px">اختر «موافق» أو «غير موافق» لكل عبارة، وسنعود إليها في نهاية الدرس.</p><div id="an"></div>'),1.1);
  G.poll($('#pp',el),{q:'بمن تشبه أكثر في لون عينيك؟',o:['بأبي','بأمي','بأحد أجدادي','لا أشبه أحدًا منهم']});
  G.anticip($('#an',el),{key:'l2',items:ANT});return {}}});

/* ===== ٥) خريطة المصطلحات ===== */
var TERMS=[{ic:'🔁',t:'الانقسام المنصف (مراجعة)',d:'عملية حيوية ينتج عنها أربع خلايا أحادية المجموعة الكروموسومية من خلية واحدة ثنائية المجموعة الكروموسومية.'},
 {ic:'👪',t:'الوراثة',d:'انتقال الصفات الوراثية من الآباء إلى الأبناء.'},{ic:'📚',t:'علم الوراثة',d:'علم يدرس كيفية انتقال الصفات الوراثية وتفاعلها فيما بينها.'},
 {ic:'🔀',t:'الجين المقابل (الأليل)',d:'أزواج الجينات المسؤولة عن صفة محددة؛ ينتقل كل جين منهما إلى خلية جنسية منفصلة.'},
 {ic:'🌿',t:'الهجين',d:'مخلوق حي تكون فيه الجينات المتقابلة مختلفة في الصفة الوراثية.'},{ic:'♾',t:'الصفة النقية',d:'الصفة التي تظهر دائمًا جيلًا بعد جيل.'},
 {ic:'🅰',t:'العامل السائد',d:'الجين الذي تظهر صفته، ويُرمز له بالحرف الكبير، مثل A.'},{ic:'🅰',t:'العامل المتنحي',d:'الجين الذي تختفي صفته عند التقائه بالجين السائد، ويُرمز له بالحرف الصغير، مثل a.'},
 {ic:'🟰',t:'الجينات المتماثلة',d:'جينان متقابلان متشابهان للصفة، مثل AA أو aa.'},{ic:'≠',t:'الجينات غير المتماثلة',d:'جينان متقابلان مختلفان للصفة، مثل Aa.'},
 {ic:'🔲',t:'مربع بانيت',d:'مخطط يُستعمل لتسهيل التعبير عن عمليات التزاوج، وتحديد الطرز الجينية والشكلية، وتوقع نتائجها.'},
 {ic:'🔠',t:'الطرز الجينية',d:'الشفرة الوراثية التي يملكها المخلوق الحي لصفة محددة، وهي حرفان، مثل Aa وaa وTT.'},
 {ic:'🐈',t:'الطرز الشكلية',d:'الصفات المظهرية للمخلوق الحي وسلوكه الناتجة عن الطرز الجينية، مثل: طويل نقي، أسود هجين.'}];
var TV;S({id:'terms',name:'خريطة المصطلحات',ic:'🏷',build:function(el){return TV(el)}});

/* ===== ٦) م١ رحلة الجينات المتقابلة ===== */
S({id:'alle',name:'م١ رحلة الجينات المتقابلة',ic:'🔀',manual:true,build:function(el){
  var R=lay(el,'المحطة ١ · الصفات الوراثية ص ١٢٨','رحلة الجينات المتقابلة: من الأبوين إلى الابن',
   '<canvas class="sim" id="ac" width="1000" height="540" style="flex:1;min-height:0;height:100%"></canvas><div id="at"></div>',
   cd('الصفات الوراثية','<p style="margin:0;font-size:18px;line-height:1.75">تتحكم <b class="hl">الجينات</b> المحمولة على الكروموسومات في شكل المخلوق الحي ووظائفه، أي ما نسميه صفاته الوراثية. وتسمى أزواج الجينات المسؤولة عن صفة محددة <b class="hl">الجينات المتقابلة (الأليل)</b>.</p>')+
   cd('خطوات التجربة','<p style="margin:0;font-size:17px;line-height:1.7">١) المس «انقسام منصف» لترى كيف ينفصل زوج الكروموسومات.<br>٢) اختر حيوانًا منويًّا وبويضة بلمسهما، ثم المس «إخصاب».<br>٣) كرّر حتى تكتشف جميع الاحتمالات.</p>')+'<div id="atb"></div><div class="cd reveal" id="aEx">'+img('b_mei','width:100%;height:220px;object-fit:contain;background:#fff')+'<p style="margin:6px 0 0;font-size:17px">خلال الانقسام المنصف ينفصل زوج الكروموسومات، وتنتقل الجينات المتقابلة إلى خلايا جنسية منفصلة؛ ويمنح كل من الأبوين خلال الإخصاب كروموسومًا واحدًا.</p></div><div id="aq"></div>');
  var c=$('#ac',el),ph=0,k=0,sp=-1,eg=-1,kid=null,found={};
  var tb=G.table($('#atb',el),['الاحتمال','الطراز الجيني للابن','النوع'],[['الاحتمال ١','',''],['الاحتمال ٢','',''],['الاحتمال ٣','','']]);
  var SPm=[[700,110,'D'],[860,110,'d']],EGm=[[700,430,'D'],[860,430,'d']];
  function chrom(x,X,Y,l,col,s){s=s||1;x.fillStyle=col;G.rr(x,X-9*s,Y-34*s,18*s,68*s,9*s);x.fill();x.fillStyle='#fff';x.fillRect(X-9*s,Y-4*s,18*s,8*s);G.T(x,l,X+(l===l.toUpperCase()?0:0),Y-16*s,16*s,'#fff')}
  function cellD(x,X,Y,r,fill,sel){x.fillStyle=fill;x.beginPath();x.arc(X,Y,r,0,7);x.fill();x.strokeStyle=sel?'#6c3fd1':'rgba(0,0,0,.12)';x.lineWidth=sel?6:3;x.stroke()}
  c.addEventListener('click',function(e){if(ph<1)return;var r=c.getBoundingClientRect(),X=(e.clientX-r.left)/r.width*1000,Y=(e.clientY-r.top)/r.height*540;SPm.forEach(function(s,i){if(Math.hypot(X-s[0],Y-s[1])<60){sp=i;G.sfx.pop()}});EGm.forEach(function(s,i){if(Math.hypot(X-s[0],Y-s[1])<60){eg=i;G.sfx.pop()}})});
  var sim=G.sim(c,function(x,t,dt){x.fillStyle='#fbfaff';x.fillRect(0,0,1000,540);if(k<1)k=Math.min(1,k+dt*.6);
    G.T(x,'الأب (Dd)',140,40,20,'#155c90');G.T(x,'الأم (Dd)',140,500,20,'#a3284a');
    cellD(x,140,150,70,'#dceffd');chrom(x,122,150,'D','#1f84cc');chrom(x,158,150,'d','#1f84cc');
    cellD(x,140,390,70,'#ffe3ea');chrom(x,122,390,'D','#e23e64');chrom(x,158,390,'d','#e23e64');
    if(ph>=1){var a=ph===1?k:1;x.strokeStyle='#c4bce0';x.lineWidth=4;[[110],[430]].forEach(function(r,j){var Y=j?390:150,Y2=j?430:110;x.beginPath();x.moveTo(220,Y);x.lineTo(620,Y2);x.stroke()});G.pill(x,'انقسام منصف',420,270,'#fff','#4a249e',18);
      SPm.forEach(function(s,i){var X=220+(s[0]-220)*a,Y=150+(s[1]-150)*a;cellD(x,X,Y,48,'#dceffd',sp===i);chrom(x,X,Y,s[2],'#1f84cc',.9)});
      EGm.forEach(function(s,i){var X=220+(s[0]-220)*a,Y=390+(s[1]-390)*a;cellD(x,X,Y,52,'#ffe3ea',eg===i);chrom(x,X,Y,s[2],'#e23e64',.9)});
      G.T(x,'حيوانات منوية',780,40,17,'#155c90');G.T(x,'بويضات',780,505,17,'#a3284a')}
    if(kid){cellD(x,930,270,60,'#f1ebff');chrom(x,912,270,kid[0],'#1f84cc');chrom(x,948,270,kid[1],'#e23e64');G.pill(x,'الابن: '+gt(kid[0],kid[1]),930,355,'#1b1336','#fff',18)}
    if(ph<1)G.pill(x,'المس «انقسام منصف»',600,270,'#fff','#4a249e',20)});
  G.tools($('#at',el),[['✂','انقسام منصف'],['💞','إخصاب'],['↺','ابدأ من جديد']],function(i){if(i===0){ph=1;k=0;G.sfx.page()}else if(i===1){if(ph<1){G.toast('ابدؤوا بالانقسام المنصف');return}if(sp<0||eg<0){G.toast('اختاروا حيوانًا منويًّا وبويضة أولًا بلمسهما');return}kid=[SPm[sp][2],EGm[eg][2]];var g=gt(kid[0],kid[1]),row=g==='DD'?0:g==='Dd'?1:2;tb.fill(row,['<span class="ltr">'+kid[0]+' + '+kid[1]+' = '+g+'</span>',row===1?'غير متماثل (هجين)':'متماثل (نقي)']);G.sfx.ok();found[row]=1;if(Object.keys(found).length===3){$('#aEx',el).classList.add('shown');G.done('alle')}sp=eg=-1}else{ph=0;kid=null;sp=eg=-1}});
  var q=$('#aq',el);
  G.mcq(q,{id:'l2-her',goal:1,lvl:1,q:'انتقال الصفات الوراثية من الآباء إلى الأبناء يسمى:',o:['الوراثة','الطفرة','التخمر','الانتشار'],a:0,ex:'الوراثة.'});
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ٧) م٢ مندل وحديقة البازلاء ===== */
var TR=[['شكل البذور','أملس','مجعد'],['لون البذور','أصفر','أخضر'],['لون القرن','أخضر','أصفر'],['شكل القرن','منتفخ','مسطّح'],['طول ساق النبات','طويل','قصير'],['موقع الأزهار','محوري','طرفي'],['لون الأزهار','أرجواني','أبيض']];
S({id:'mendel',name:'م٢ مندل وحديقة البازلاء',ic:'🌱',manual:true,build:function(el){
  var R=lay(el,'المحطة ٢ · مندل مؤسس علم الوراثة ص ١٢٩–١٣٠','في حديقة مندل: لماذا البازلاء؟',
   '<div class="cd" style="display:flex;gap:14px;align-items:center">'+img('b_mendel','width:250px;height:150px')+'<div><b style="font-family:var(--disp);font-size:24px">جريجور مندل</b><p style="margin:4px 0 0;font-size:17px;line-height:1.7">دفعه فضوله في معرفة العلاقة بين لون الأزهار ونوع البذور في نبات البازلاء إلى بدء تجاربه عام <b class="hl">١٨٥٦م</b>.</p></div></div>'+
   '<div class="cd"><h3>🤔 برأيك: لماذا أجرى مندل تجاربه على البازلاء؟ المس البطاقات</h3><div id="why" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px"></div></div>'+
   '<div class="cd" style="flex:1;min-height:0"><h3>🧪 الصفات السبع التي درسها مندل: اختر صفة</h3><div id="trb" style="display:flex;flex-wrap:wrap;gap:6px"></div><div id="trv" style="margin-top:10px"></div></div>',
   cd('مندل','<ol style="margin:0;padding-inline-start:22px;font-size:18px;line-height:1.8"><li>مؤسس علم الوراثة.</li><li>فسّر كيفية انتقال الصفات عبر الأجيال.</li><li>أول من تتبّع صفة واحدة عبر عدة أجيال.</li><li>أجرى تجاربه على نبات البازلاء.</li></ol>')+
   '<div class="cd">'+img('b_tab','width:100%;height:200px;object-fit:contain;background:#fff')+'<p class="hint" style="margin:4px 0 0">جدول ١ مقارنة الصفات الوراثية التي قام بها مندل.</p></div>'+
   cd('📜 أُهملت ثم عادت!','<p style="margin:0;font-size:17px;line-height:1.7">أُهملت تجارب مندل فترة طويلة، ولم تُقدَّر أهميتها حتى عام <b class="hl">١٩٠٠م</b>، عندما توصّل ثلاثة من علماء النبات، كلٌّ على حدة، إلى النتائج نفسها؛ ومنذ ذلك الوقت عُرف مندل بأنه مؤسس علم الوراثة.</p>')+'<div id="mq"></div>');
  var W=[['🌱','سهولة زراعته'],['⏱','قصر عمر جيله'],['🔢','تعدد أنواعه: درس ٧ صفات'],['🌸','إمكانية تلقيحه ذاتيًّا وخلطيًّا']],wo={},tv={};
  W.forEach(function(w,i){var b=h('<button class="tool" style="min-height:110px"><span>❔</span><b>السبب '+n(i+1)+'</b></button>');$('#why',el).appendChild(b);b.onclick=function(){$('span',b).textContent=w[0];$('b',b).textContent=w[1];b.classList.add('on');wo[i]=1;G.sfx.pop();chk()}});
  TR.forEach(function(t,i){var b=h('<button class="tk">'+t[0]+'</button>');$('#trb',el).appendChild(b);b.onclick=function(){$$('.tk',$('#trb',el)).forEach(function(z){z.classList.toggle('sel',z===b)});tv[i]=1;$('#trv',el).innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div class="fb ok" style="margin:0;text-align:center"><small>الصفة السائدة</small><br><b style="font-size:26px">'+t[1]+'</b></div><div class="fb" style="margin:0;text-align:center;background:#f6f2ff;border:1.5px solid #dcd6ee"><small>الصفة المتنحية</small><br><b style="font-size:26px">'+t[2]+'</b></div></div>';G.sfx.pop();chk()}});
  function chk(){if(Object.keys(wo).length===4&&Object.keys(tv).length>=3)G.done('mendel')}
  var q=$('#mq',el);
  G.order(q,{id:'l2-mo',goal:2,lvl:2,q:'رتّب الأحداث زمنيًّا:',items:['مندل يبدأ تجاربه على البازلاء (١٨٥٦م)','يدرس نتائجه ثماني سنوات','ثلاثة علماء يصلون إلى النتائج نفسها (١٩٠٠م)']});
  return {reveal:function(){var b=$$('#why .tool:not(.on)',el)[0];if(b){b.click();return true}return false}}}});

/* ===== ٨) م٣ مختبر التلقيح في الحديقة ===== */
S({id:'cross',name:'م٣ مختبر التلقيح في الحديقة',ic:'🌼',manual:true,build:function(el){
  var R=lay(el,'المحطة ٣ · الوراثة في الحديقة ص ١٣٠','مختبر التلقيح: أين اختفى اللون الأصفر؟',
   '<canvas class="sim" id="cc" width="1000" height="540" style="flex:1;min-height:0;height:100%"></canvas><div id="ct"></div>',
   '<div id="ctb"></div>'+cd('الهجين','<p style="margin:0;font-size:18px;line-height:1.7">أطلق مندل على نباتات الجيل الأول مسمّى <b class="hl">الهجين</b>: وهو مخلوق حي تكون فيه الجينات المتقابلة مختلفة في الصفة الوراثية.</p>')+
   '<div class="cd"><h3>🌾 الصفة النقية</h3><p style="margin:0;font-size:17px;line-height:1.7">لو لقّحنا نبات بازلاء طويل الساق مع آخر طويل الساق، وكان ناتج الجيل الأول والثاني وما يليه كله نباتات طويلة… ماذا نستنتج؟</p><div class="acts"><button class="b o" data-p1>الاستنتاج</button><button class="b s" data-p2>لماذا يزرع الفلاحون البذور النقية؟</button></div><div class="fb ok reveal" id="pA">الصفة <b>نقية</b>: وهي الصفة التي تظهر دائمًا جيلًا بعد جيل.</div><div class="fb ok reveal" id="pB">لكي يستمر ظهور هذه الصفات في الأجيال القادمة إذا كانت مرغوبة.</div></div><div class="cd reveal" id="cEx"><h3>الاستنتاج</h3><p style="margin:0;font-size:18px;line-height:1.7">الصفة الصفراء لم تختفِ؛ بل <b class="hl">اختبأت</b> في الجيل الأول الهجين، ثم ظهرت في الجيل الثاني بنسبة تقارب ربع النباتات. وكلما زاد عدد النباتات اقتربت النتائج من التوقع؛ لذا درس مندل أعدادًا كبيرة.</p></div><div id="cq"></div>');
  var c=$('#cc',el),gen=0,k=0,F2={g:0,y:0},pl=[];
  var tb=G.table($('#ctb',el),['التلقيح','النتيجة'],[['أخضر نقي × أصفر نقي',''],['هجين × هجين (١٠٠ نبتة)',''],['هجين × هجين (١٠٠٠ نبتة)','']]);
  function plant(x,X,Y,col,s){x.strokeStyle='#4f8a3a';x.lineWidth=4*s;x.beginPath();x.moveTo(X,Y);x.lineTo(X,Y-70*s);x.stroke();x.fillStyle='#6fbf4a';x.beginPath();x.ellipse(X-14*s,Y-40*s,12*s,6*s,-.5,0,7);x.fill();x.beginPath();x.ellipse(X+14*s,Y-52*s,12*s,6*s,.5,0,7);x.fill();x.fillStyle=col;x.beginPath();x.ellipse(X+8*s,Y-80*s,9*s,26*s,.25,0,7);x.fill()}
  function grow(N){var g=0,y=0;for(var i=0;i<N;i++){var a=Math.random()<.5,b=Math.random()<.5;if(a||b)g++;else y++}F2={g:g,y:y};pl=[];var M=Math.min(N,60);for(var j=0;j<M;j++)pl.push(j<Math.round(M*g/N)?1:0);pl=G.shuffle(pl);return F2}
  var sim=G.sim(c,function(x,t,dt){x.fillStyle='#eef7ff';x.fillRect(0,0,1000,540);x.fillStyle='#8a6a4a';x.fillRect(0,470,1000,70);x.fillStyle='#6b4f36';x.fillRect(0,470,1000,8);if(k<1)k=Math.min(1,k+dt*.7);
    G.T(x,'الآباء',840,60,20,'#4a249e');plant(x,770,200,'#3e9a30',1.3);plant(x,910,200,'#e9c938',1.3);G.T(x,'×',840,150,40,'#4a249e');G.T(x,'أخضر نقي',770,225,15);G.T(x,'أصفر نقي',910,225,15);
    if(gen>=1){var a=gen===1?k:1;G.T(x,'الجيل الأول (هجين)',420,60,20,'#4a249e');for(var i=0;i<4;i++)plant(x,300+i*80,220,'#3e9a30',a*1.1+.01);}
    if(gen>=2){var b=gen>=2?k:1;G.T(x,'الجيل الثاني',230,270,20,'#4a249e');pl.forEach(function(p,j){var X=40+(j%15)*60,Y=330+Math.floor(j/15)*36+80;plant(x,X,Math.min(470,Y+30),p?'#3e9a30':'#e9c938',.55*b+.01)});
      var T=F2.g+F2.y;G.pill(x,'🟢 '+n(F2.g)+' أخضر   ·   🟡 '+n(F2.y)+' أصفر   ·   النسبة ≈ '+n((F2.g/Math.max(1,F2.y)).toFixed(1))+' : ١',500,300,'#1b1336','#fff',18)}
    if(!gen)G.pill(x,'المس «لقّح الآباء» لتبدأ التجربة',500,320,'#fff','#4a249e',20)});
  G.tools($('#ct',el),[['🐝','لقّح الآباء'],['🌱','لقّح الهجين: ١٠٠ نبتة'],['🌾','لقّح الهجين: ١٠٠٠ نبتة'],['↺','ازرع من جديد']],function(i){
    if(i===0){gen=1;k=0;tb.fill(0,['الجيل الأول كله أخضر القرون؛ اختفى الأصفر']);G.sfx.ok()}
    else if(i<3){if(!tb.has(0)){G.toast('لقّحوا الآباء أولًا');G.sfx.no();return}gen=2;k=0;var N=i===1?100:1000,r=grow(N);tb.fill(i,['🟢 '+n(r.g)+' أخضر · 🟡 '+n(r.y)+' أصفر (≈ '+n(Math.round(r.y/N*100))+'٪ أصفر)']);G.sfx.ok();if(tb.count()===3){$('#cEx',el).classList.add('shown');G.done('cross')}}
    else{gen=0;pl=[]}});
  $('[data-p1]',el).onclick=function(){$('#pA',el).classList.add('shown');G.sfx.pop()};$('[data-p2]',el).onclick=function(){$('#pB',el).classList.add('shown');G.sfx.pop()};
  var q=$('#cq',el);
  return {enter:function(){sim.start()},leave:function(){sim.stop()}}}});

/* ===== ٩) م٤ مختبر السائد والمتنحي ===== */
S({id:'domrec',name:'م٤ مختبر السائد والمتنحي',ic:'🔠',manual:true,build:function(el){
  var R=lay(el,'المحطة ٤ · العامل السائد والعامل المتنحي ص ١٣٠','مختبر الحروف: اختر جينين وشاهد النبات',
   '<div class="cd" style="flex:1;min-height:0;display:flex;gap:18px;align-items:center"><div style="flex:1;display:flex;flex-direction:column;gap:12px;align-items:center"><p class="big" style="margin:0">صفة طول الساق: <b class="ltr">T</b> طويل (سائد) · <b class="ltr">t</b> قصير (متنحٍ)</p><div style="display:flex;gap:18px;align-items:center"><div class="col" style="align-items:center"><small class="hint">جين من الأب</small><div id="s0" class="seq"></div></div><div class="col" style="align-items:center"><small class="hint">جين من الأم</small><div id="s1" class="seq"></div></div></div><div id="dv" style="width:100%"></div></div><div style="width:260px;height:100%;display:flex;align-items:flex-end;justify-content:center;background:linear-gradient(#eef7ff 80%,#8a6a4a 80%);border-radius:16px;position:relative"><div id="stem" style="width:16px;background:#4f8a3a;border-radius:8px 8px 0 0;height:0;transition:height .8s cubic-bezier(.2,1.2,.4,1);margin-bottom:20%;position:relative"><span id="lf" style="position:absolute;top:-30px;left:-34px;font-size:56px;transition:.5s">🌿</span></div></div></div>',
   cd('الجين السائد والجين المتنحي','<table class="rt"><tr><th></th><th>الجين السائد</th><th>الجين المتنحي</th></tr><tr><td>صفته</td><td>تظهر</td><td>تختفي عند التقائه بالسائد</td></tr><tr><td>رمزه</td><td>حرف كبير '+E('A, R, F, D')+'</td><td>حرف صغير '+E('a, r, f, d')+'</td></tr><tr><td>صوره</td><td>صورتان: '+E('AA')+' متماثل، '+E('Aa')+' غير متماثل</td><td>صورة واحدة فقط: '+E('aa')+' متماثل</td></tr></table>')+'<div id="dtb"></div><div id="dq"></div>');
  var al=['T','T'],seen={};var tb=G.table($('#dtb',el),['الطراز الجيني','النوع','الطراز الشكلي'],[[E('TT'),'',''],[E('Tt'),'',''],[E('tt'),'','']]);
  function draw(){[0,1].forEach(function(i){var s=$('#s'+i,el);s.innerHTML=['T','t'].map(function(l){return '<button class="base '+(al[i]===l?'U':'q')+'" data-s="'+i+'" data-l="'+l+'" style="width:70px;height:70px;font-size:34px">'+l+'</button>'}).join('')});
    $$('[data-s]',el).forEach(function(b){b.onclick=function(){al[+b.dataset.s]=b.dataset.l;draw();G.sfx.pop()}});
    var g=gt(al[0],al[1]),tall=g!=='tt',hom=al[0]===al[1],row=g==='TT'?0:g==='Tt'?1:2;
    $('#dv',el).innerHTML='<div class="fb ok" style="text-align:center;font-size:22px">الطراز الجيني: <b class="ltr" style="font-size:30px">'+g+'</b> · '+(hom?'متماثل الجينات':'غير متماثل الجينات')+' ('+(hom?'نقي':'هجين')+')<br>الطراز الشكلي: <b>'+(tall?'طويل الساق':'قصير الساق')+'</b> '+(hom?'نقي':'هجين')+'</div>';
    $('#stem',el).style.height=(tall?260:90)+'px';tb.fill(row,[hom?'متماثل (نقي)':'غير متماثل (هجين)',tall?'طويل':'قصير']);seen[row]=1;if(Object.keys(seen).length===3)G.done('domrec')}
  draw();
  var q=$('#dq',el);G.sort(q,{id:'l2-hom',goal:4,lvl:2,q:'صنّف الطرز الجينية:',bins:['متماثل الجينات','غير متماثل الجينات'],items:[[E('AA'),0],[E('aa'),0],[E('Aa'),1],[E('Bb'),1],[E('rr'),0],[E('Rr'),1]]});
  
  return {}}});

/* ===== ١٠) م٥ مختبر الاحتمالات ===== */
S({id:'prob',name:'م٥ مختبر الاحتمالات',ic:'🎲',manual:true,build:function(el){
  var R=lay(el,'المحطة ٥ · هل للاحتمالات دور في توقع الصفات؟ ص ١٣٠','مختبر العملتين: نلعب لعبة مندل',
   '<div class="cd" style="flex:1;min-height:0;display:flex;flex-direction:column;gap:10px"><p style="margin:0;font-size:18px;line-height:1.6"><b>التجربة الواقعية:</b> الصق على وجه كل عملة معدنية الحرف <b class="ltr">B</b> وعلى الوجه الآخر <b class="ltr">b</b>. كل عملة تمثّل خلية جنسية من أب هجين <b class="ltr">Bb</b>. ارمِ العملتين معًا وسجّل الطراز الجيني.</p><div style="display:flex;gap:30px;justify-content:center;align-items:center" id="coins"></div><div id="bars" style="display:flex;flex-direction:column;gap:10px"></div><div id="pt"></div></div>',
   '<div class="cd" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center"><div><b style="font-size:40px;font-family:var(--disp);color:var(--terra)">٨</b><br>سنوات درس فيها مندل نتائج تجاربه</div><div><b style="font-size:40px;font-family:var(--disp);color:var(--terra)">٣٠٠٠٠</b><br>نبتة تقريبًا</div><div><b style="font-size:40px;font-family:var(--disp);color:var(--terra)">أعداد كبيرة</b><br>زادت فرصه لرؤية النماذج المتكررة</div></div>'+
   cd('لماذا لجأ مندل إلى الاحتمالات؟','<p style="margin:0;font-size:18px;line-height:1.7">لجأ مندل إلى الاحتمالات في تفسير نتائجه، ونظرًا إلى أنه كان يحصل على أعداد كبيرة من النباتات لدراسة الصفة الواحدة كانت نتائجه دقيقة جدًّا.</p>')+'<div id="ptb"></div><div class="cd reveal" id="pEx"><h3>الاستنتاج</h3><p style="margin:0;font-size:18px;line-height:1.7">مع زيادة عدد الرميات تقترب النسب من التوقع: <b class="ltr">BB</b> ٢٥٪، <b class="ltr">Bb</b> ٥٠٪، <b class="ltr">bb</b> ٢٥٪. أي أن احتمال ظهور الصفة المتنحية (<b class="ltr">bb</b>) هو ربع الأبناء تقريبًا.</p></div><div id="pq"></div>');
  var C={BB:0,Bb:0,bb:0},last=null,tb=G.table($('#ptb',el),['عدد الرميات','BB','Bb','bb'],[['١٠','','',''],['١٠٠','','',''],['٥٠٠','','','']]),T=0;
  function pc(v){return T?Math.round(v/T*100):0}
  function draw(){$('#coins',el).innerHTML=(last||['؟','؟']).map(function(l){return '<div style="width:110px;height:110px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff6cc,#e6b422 60%,#b8860b);display:grid;place-items:center;font:800 50px var(--disp);color:#5a3d00;box-shadow:0 6px 0 #8a6400;direction:ltr">'+l+'</div>'}).join('<b style="font-size:40px">+</b>');
    $('#bars',el).innerHTML=[['BB','#0f9a72',25],['Bb','#6c3fd1',50],['bb','#e23e64',25]].map(function(r){return '<div style="display:flex;align-items:center;gap:10px"><b class="ltr" style="width:50px;font-size:24px">'+r[0]+'</b><div style="flex:1;height:34px;background:#efeaf9;border-radius:10px;position:relative;overflow:hidden"><div style="height:100%;width:'+pc(C[r[0]])+'%;background:'+r[1]+';transition:width .4s"></div><div style="position:absolute;top:-2px;bottom:-2px;left:'+r[2]+'%;border-left:3px dashed #1b1336" title="المتوقع"></div></div><b style="width:120px">'+n(C[r[0]])+' ('+n(pc(C[r[0]]))+'٪)</b></div>'}).join('')+'<p class="hint" style="margin:0">الخط المتقطع = النسبة المتوقعة · عدد الرميات: <b>'+n(T)+'</b></p>'}
  function toss(N){for(var i=0;i<N;i++){var a=Math.random()<.5?'B':'b',b=Math.random()<.5?'B':'b';last=[a,b];C[gt(a,b)]++;T++;var row=[10,100,500].indexOf(T);if(row>=0&&!tb.has(row)){tb.fill(row,[n(pc(C.BB))+'٪',n(pc(C.Bb))+'٪',n(pc(C.bb))+'٪']);G.sfx.ok()}}draw();G.sfx.tick();
    if(tb.count()===3){$('#pEx',el).classList.add('shown');G.done('prob')}}
  draw();G.tools($('#pt',el),[['🪙','ارمِ مرة'],['🔟','ارمِ ١٠ مرات'],['💯','ارمِ ١٠٠ مرة'],['↺','صفّر']],function(i){if(i===3){C={BB:0,Bb:0,bb:0};T=0;last=null;draw();return}toss([1,10,100][i])});
  G.mcq($('#pq',el),{id:'l2-pr',goal:3,lvl:2,q:'لماذا كانت نتائج مندل دقيقة جدًّا؟',o:['لأنه درس أعدادًا كبيرة من النباتات','لأنه درس نبتة واحدة','لأنه استعمل المجهر الإلكتروني','لأنه لم يستعمل الاحتمالات'],a:0,ex:'نحو ٣٠٠٠٠ نبتة خلال ثماني سنوات.'});
  return {}}});

/* ===== ١١) م٦ ورشة مربع بانيت ===== */
var PB=[{t:'🐈 القطط · ص ١٣٤',p1:'Bb',p2:'bb',d:['أسود','أشقر'],q:'تزاوج قط لون شعره أسود غير متماثل الجينات (Bb) وقطة شعرها أشقر (bb). ما النسبة المحتملة لولادة قط شعره أسود؟',ans:function(r){return r.dom}},
 {t:'🟡 بذور البازلاء · ص ١٣٤',p1:'Yy',p2:'Yy',d:['أصفر','أخضر'],q:'في البازلاء، اللون الأصفر للبذور (Y) سائد على الأخضر (y). ما احتمال ظهور نباتات بذورها صفراء؟ وما احتمال الطراز الجيني yy؟',ans:function(r){return r.dom}},
 {t:'🌺 الأزهار · تدريب صفي ١',p1:'RR',p2:'rr',d:['أحمر','أبيض'],q:'صفة اللون الأحمر للأزهار سائدة والأبيض متنحٍ. اكتب الطرز الجينية والشكلية عند تلقيح زهرة حمراء (RR) مع زهرة بيضاء (rr).',ans:function(r){return r.dom}},
 {t:'🪰 ذبابة الفاكهة · تطبيق الرياضيات ٦',p1:'Ww',p2:'ww',d:['طويل الجناح','قصير الجناح'],q:'لُقحت ذبابة فاكهة طويلة الجناح (غير نقية) مع ذبابة قصيرة الجناح (نقية). ما نسبة الأبناء الذين يحملون صفة قصر الجناح؟ (طول الجناح سائد على قصره)',ans:function(r){return 100-r.dom}}];
S({id:'pun',name:'م٦ ورشة مربع بانيت',ic:'🔲',manual:true,build:function(el){
  var R=lay(el,'المحطة ٦ · مربع بانيت ص ١٣١ وتطبيق الرياضيات ص ١٣٤–١٣٥','ورشة مربع بانيت: توقّع صفات الأبناء',
   '<div class="cd" style="flex:1;min-height:0;display:flex;flex-direction:column;gap:8px"><div id="pbs" style="display:flex;gap:6px;flex-wrap:wrap"></div><p id="pq" style="margin:0;font-size:18px;line-height:1.6"></p><div style="display:flex;gap:16px;align-items:center;flex:1;min-height:0"><div id="sq" class="psq" style="grid-template-columns:repeat(3,100px);grid-auto-rows:84px"></div><div style="flex:1;display:flex;flex-direction:column;gap:8px"><p class="hint" style="margin:0">المس كل خانة لتكتب فيها الطراز الجيني (حرف من الأعلى + حرف من الجانب)، ثم تحقّق.</p><div class="acts" style="margin:0"><button class="b" id="pck">✓ تحقّق</button><button class="b g" id="prs">↺</button></div><div id="pres"></div></div></div></div>',
   cd('مربع بانيت','<p style="margin:0;font-size:17px;line-height:1.7">يُستعمل لتسهيل التعبير عن عمليات التزاوج وتحديد الطرز الجينية والشكلية. نكتب جينات أحد الأبوين في أعلى المربع، وجينات الآخر على جانبه، ثم نجمع في كل خانة حرفًا من الأعلى وحرفًا من الجانب.</p><p style="margin:6px 0 0;font-size:17px"><b>الطرز الجينية:</b> حرفان مثل '+E('Aa, aa, TT, Rr')+' · <b>الطرز الشكلية:</b> الصفات المظهرية مثل: طويل نقي، مستدير نقي، أسود هجين.</p>')+'<div id="ptb"></div>'+img('b_pun','width:100%;height:150px;object-fit:contain;background:#fff')+'<p class="hint" style="margin:0">ريجنالد بانيت · واستعمل المربع لتوقع نتائج التزاوج</p>');
  var cur=0,cells=[],solved={};var tb=G.table($('#ptb',el),['المسألة','الطرز الجينية','الإجابة'],PB.map(function(p){return [p.t.split(' · ')[0],'','']}));
  PB.forEach(function(p,i){var b=h('<button class="tk'+(i?'':' sel')+'">'+p.t+'</button>');$('#pbs',el).appendChild(b);b.onclick=function(){cur=i;$$('#pbs .tk',el).forEach(function(z,j){z.classList.toggle('sel',j===i)});mk();G.sfx.pop()}});
  function opts(p){var U=p.p1[0].toUpperCase(),l=U.toLowerCase();return [U+U,U+l,l+l]}
  function mk(){var p=PB[cur],sq=$('#sq',el);$('#pq',el).innerHTML=p.q.replace(/\(([A-Za-z]{2})\)/g,function(_,g){return '(<span class="ltr">'+g+'</span>)'});$('#pres',el).innerHTML='';
    sq.innerHTML='<div class="c0" style="font-size:15px;color:var(--ink2)">'+E(p.p1)+' × '+E(p.p2)+'</div>'+p.p1.split('').map(function(a){return '<div class="hd">'+a+'</div>'}).join('')+[0,1].map(function(r){return '<div class="hd">'+p.p2[r]+'</div>'+[0,1].map(function(c){return '<div class="cell" data-r="'+r+'" data-c="'+c+'">؟</div>'}).join('')}).join('');
    cells=$$('.cell',sq);var O=opts(p);cells.forEach(function(x){x.onclick=function(){var i=O.indexOf(x.dataset.v);x.dataset.v=O[(i+1)%3];x.textContent=x.dataset.v;x.className='cell f';G.sfx.pop()}})}
  mk();
  $('#prs',el).onclick=mk;
  $('#pck',el).onclick=function(){var p=PB[cur];if(cells.some(function(x){return !x.dataset.v})){G.toast('املؤوا جميع الخانات');return}var bad=0,cnt={};cells.forEach(function(x){var g=gt(p.p1[+x.dataset.c],p.p2[+x.dataset.r]),ok=x.dataset.v===g;x.className='cell '+(ok?'ok':'no');if(!ok)bad++;cnt[g]=(cnt[g]||0)+1});
    if(bad){G.sfx.no();$('#pres',el).innerHTML='<div class="fb no">'+n(bad)+' خانات غير صحيحة. اجمع حرفًا من الأعلى مع حرف من الجانب.</div>';return}
    var U=p.p1[0].toUpperCase(),dom=0;Object.keys(cnt).forEach(function(g){if(g.indexOf(U)>=0)dom+=cnt[g]});var r={dom:dom*25};
    var gtxt=Object.keys(cnt).sort().map(function(g){return (cnt[g]>1?n(cnt[g])+' ':'')+'<span class="ltr">'+g+'</span>'}).join('، '),ptxt=(dom?n(dom)+' '+p.d[0]:'')+(dom&&dom<4?'، ':'')+(4-dom?n(4-dom)+' '+p.d[1]:'');
    var ans=p.ans(r);G.sfx.ok();solved[cur]=1;
    $('#pres',el).innerHTML='<div class="fb ok"><b>✔ مربع صحيح!</b><br>الطرز الجينية: '+gtxt+'<br>الطرز الشكلية: '+ptxt+'<br><b style="font-size:22px">الإجابة: '+n(ans)+'٪</b>'+(cur===1?' · واحتمال <span class="ltr">yy</span> = ٢٥٪':'')+(cur===2?' · جميعها حمراء هجين':'')+'</div>';
    tb.fill(cur,[gtxt,n(ans)+'٪']);if(Object.keys(solved).length>=2)G.done('pun')};
  return {}}});

/* ===== ١٢) م٧ مبادئ علم الوراثة ===== */
var PR=[['🔗','تتحكم الجينات المتقابلة المحمولة على الكروموسومات في الصفات الوراثية.'],['⚖','يكون تأثير الجينات المتقابلة سائدًا أو متنحيًا.'],['✂','عندما ينفصل زوج الكروموسومات خلال الانقسام المنصف تنفصل الجينات المتقابلة للصفة الواحدة، بحيث يتحرك واحد منها لكل خلية جنسية جديدة.']];
S({id:'princ',name:'م٧ مبادئ علم الوراثة',ic:'📜',build:function(el){
  var R=lay(el,'المحطة ٧ · مبادئ علم الوراثة ص ١٣٤','ثلاثة مبادئ وضعها مندل',
   cd('','<p class="big" style="margin:0">نجح العالم مندل في تفسير كيفية انتقال الصفات من الآباء إلى الأبناء <b class="hl">وتمثيلها رياضيًّا</b>، وأدرك وجود بعض العوامل في نبات البازلاء تسبب ظهور صفات وراثية محددة.</p>')+'<div id="pl" class="col"></div><div class="acts"><button class="b" data-nx>المبدأ التالي ←</button></div>',
   '<div id="pc"></div>',1.2);
  var k=0;function show(){if(k>=PR.length)return false;$('#pl',el).appendChild(h('<div class="gli in" style="font-size:21px"><span class="gn">'+n(k+1)+'</span><span class="gi">'+PR[k][0]+'</span><span>'+PR[k][1]+'</span></div>'));k++;G.sfx.pop();return true}
  $('[data-nx]',el).onclick=show;
  G.cloze($('#pc',el),{id:'l2-pcl',goal:1,lvl:2,text:'تتحكم الجينات [[المتقابلة]] المحمولة على [[الكروموسومات]] في الصفات الوراثية، ويكون تأثيرها [[سائدًا]] أو متنحيًا، وتنفصل خلال الانقسام [[المنصف]].',extra:['المتساوي','البروتينات']});
  return {enter:function(){if(!k)setTimeout(show,400)},reveal:show}}});

/* ===== ١٣) م٨ التقويم وحل أسئلة الكتاب ===== */
S({id:'qa',name:'م٨ التقويم وحل أسئلة الكتاب',ic:'✍',build:function(el){
  el.innerHTML='<div class="ey">المحطة ٨ · تقويم الدرس الثاني</div><h1 class="t">تقويم متنوع… وحلول أسئلة الكتاب</h1><div class="row grow"><div class="col scroll" id="qL" style="flex:1"></div><div class="col scroll" id="qR" style="flex:1"><div class="cd tape"><h3 style="margin:0">📗 حلول «اختبر نفسك» وتطبيق الرياضيات</h3></div></div></div>';
  var L=$('#qL',el);
  L.insertAdjacentHTML('beforeend','<div class="cd tape"><h3 style="margin:0">📝 أسئلة العرض: السؤال ١ والسؤال ٢ والسؤال ٣</h3></div>');
  G.mcq(L,{id:'l2-hyb',goal:1,lvl:1,kind:'السؤال ١ · فقرة ١',q:'هو الفرد الذي يحمل جينين متقابلين مختلفين لصفة واحدة:',o:['متماثل الجينات','نقي','غير متماثل الجينات','سائد'],a:2,ex:'غير متماثل الجينات (هجين).',keep:true});
  G.mcq(L,{id:'l2-men',goal:2,lvl:1,kind:'السؤال ١ · فقرة ٢',q:'أول من استخدم حساب الاحتمالات لتفسير الوراثة وتتبع الصفات في عدة أجيال:',o:['نيوتن','روزاليند فرانكلين','واطسون','مندل'],a:3,ex:'مندل.',keep:true});
  G.mcq(L,{id:'l2-sci',goal:1,lvl:1,kind:'السؤال ١ · فقرة ٣',q:'العلم الذي يدرس كيفية توارث الصفات يسمى:',o:['علم البيئة','علم الوراثة','علم الحياة','علم الاجتماع'],a:1,ex:'علم الوراثة.',keep:true});
  G.mcq(L,{id:'l2-wr',goal:4,lvl:2,kind:'السؤال ١ · فقرة ٤',q:'أي العبارات التالية <b>غير</b> صحيحة؟',o:['الجين السائد يمنع ظهور الصفة الأخرى','الجين المتنحي تبدو الصفة كأنها مختفية','الحرف الكبير دائمًا يمثّل جين الصفة المتنحية','يأخذ الهجين معلومات جينية مختلفة لصفة ما من كلا أبويه'],a:2,ex:'الحرف الكبير يمثّل الجين السائد.',keep:true});
  G.tf(L,{id:'l2-tf1',goal:3,lvl:1,q:'(أ) مربع بانيت يمكنه مساعدتك على توقع صفات الأبناء.',v:true,ex:'صحيح.'});
  G.tf(L,{id:'l2-gam',goal:1,lvl:1,q:'(ب) تحتوي كل خلية جنسية على جين متقابل واحد لكل صفة.',v:true,ex:'لأن زوج الجينات ينفصل خلال الانقسام المنصف.'});
  G.tf(L,{id:'l2-tf2',goal:4,lvl:1,q:'(ج) متماثل الجينات هو الفرد الذي يحمل جينين متقابلين مختلفين لصفة واحدة.',v:false,ex:'هذا تعريف غير متماثل الجينات (الهجين).'});
  G.tf(L,{id:'l2-tf3',goal:1,lvl:1,q:'(د) الوراثة هي نقل الصفات من الآباء إلى الأبناء.',v:true,ex:'صحيح.'});
  G.cloze(L,{id:'l2-match',goal:4,lvl:2,q:'اقرن كل عبارة بالمصطلح المناسب (المس المصطلح ثم الفراغ):',text:'١. انتقال الصفات الوراثية من الآباء إلى الأبناء ← [[الوراثة]]<br>٢. أزواج الجينات المسؤولة عن صفة محددة ← [[الجينات المتقابلة]]<br>٣. المخلوق الذي يكون فيه الجينان المتقابلان مختلفين ← [[هجين]]<br>٤. الصفة التي تسود وتخفي الصفة الأخرى ← [[الصفة السائدة]]<br>٥. الصفة التي لا تظهر إلا إذا كانت الجينات المتقابلة متماثلة ← [[الصفة المتنحية]]<br>٦. الصفة المظهرية الناتجة عن الطراز الجيني ← [[الطرز الشكلية]]<br>٧. التركيب الوراثي المحدد للطراز الشكلي ← [[الطرز الجينية]]<br>٨. محمولة على الكروموسومات وتتحكم في شكل المخلوق ووظائفه ← [[الجينات]]'});
  
  
  
  
  G.mcq(L,{id:'l2-p50',goal:3,lvl:3,q:'تزاوج '+E('Tt')+' مع '+E('tt')+'. ما احتمال ظهور الصفة المتنحية في الأبناء؟',o:['٥٠٪','٢٥٪','٧٥٪','١٠٠٪'],a:0,ex:E('Tt, Tt, tt, tt')+' ← نصف الأبناء '+E('tt')+'.'});
  G.solutions($('#qR',el),[
   {src:'اختبر نفسك ١',q:'قارن بين الجينات المتقابلة السائدة والجينات المتقابلة المتنحية.',a:'<b>السائد:</b> تظهر صفته، ويخفي صفة الجين الآخر، ويُرمز له بحرف كبير، ويوجد في صورتين ('+E('AA')+' أو '+E('Aa')+').<br><b>المتنحي:</b> تختفي صفته عند التقائه بالسائد، ويُرمز له بحرف صغير، ولا تظهر صفته إلا في صورة واحدة ('+E('aa')+').'},
   {src:'اختبر نفسك ٢',q:'صف كيف تمثَّل الجينات السائدة والجينات المتنحية في مربع بانيت.',a:'بالحروف: <b>الحرف الكبير</b> للجين السائد و<b>الحرف الصغير</b> للجين المتنحي. تُكتب جينات أحد الأبوين أعلى المربع وجينات الآخر على جانبه، وتحمل كل خانة حرفين (حرف من كل أب) يمثلان الطراز الجيني للابن.'},
   {src:'اختبر نفسك ٣',q:'وضّح الفرق بين الطرز الجينية والطرز الشكلية، وأعطِ أمثلة على ذلك.',a:'<b>الطرز الجينية:</b> الشفرة الوراثية للصفة، وهي حرفان، مثل '+E('TT, Tt, tt')+'.<br><b>الطرز الشكلية:</b> الصفة المظهرية الناتجة عنها، مثل: طويل نقي، طويل هجين، قصير.'},
   {src:'اختبر نفسك ٤',q:'استنتج: لماذا أُطلق على جريجور مندل لقب مؤسس علم الوراثة؟',a:'لأنه أول من تتبّع انتقال صفة واحدة عبر عدة أجيال، وفسّر كيفية انتقال الصفات من الآباء إلى الأبناء ومثّلها رياضيًّا بالاحتمالات، ثم تأكدت نتائجه عام ١٩٠٠م عندما توصّل ثلاثة علماء إلى النتائج نفسها.'},
   {src:'اختبر نفسك ٥ · التفكير الناقد',q:'إذا عرفت الطرز الشكلية لصفة وراثية متنحية فهل يمكنك معرفة الطرز الجينية لها؟ وضّح بالأمثلة.',a:'<b>نعم</b>؛ لأن الصفة المتنحية لا تظهر إلا إذا كان الجينان متنحيين (متماثلين). مثال: نبات البازلاء قصير الساق طرازه الجيني '+E('tt')+'، والبذور الخضراء '+E('yy')+'. أما الصفة السائدة فلا يمكن معرفة طرازها من الشكل وحده؛ لأنها قد تكون '+E('TT')+' أو '+E('Tt')+'.'},
   {src:'تطبيق الرياضيات ٦',q:'لُقحت ذبابة طويلة الجناح (غير نقية) مع ذبابة قصيرة الجناح (نقية). ما نسبة الأبناء قصيري الجناح؟ (نرمز لطول الجناح بالحرف W)',a:E('Ww × ww')+' ← '+E('Ww, Ww, ww, ww')+'<br>نسبة الأبناء قصيري الجناح = ٢ من ٤ = <b>٥٠٪</b>.'},
   {src:'تطبيق الرياضيات · ص ١٣٤',q:'قط أسود '+E('Bb')+' × قطة شقراء '+E('bb')+': ما احتمال ولادة قط أسود؟',a:'الطرز الجينية: ٢ '+E('Bb')+'، ٢ '+E('bb')+' · الطرز الشكلية: ٢ أسود، ٢ أشقر ← <b>٥٠٪</b>.'},
   {src:'تطبيق الرياضيات · ص ١٣٤',q:'بازلاء '+E('Yy × Yy')+': ما احتمال البذور الصفراء؟ وما احتمال '+E('yy')+'؟',a:'الطرز الجينية: '+E('YY')+'، ٢ '+E('Yy')+'، '+E('yy')+' · الطرز الشكلية: ٣ أصفر، ١ أخضر.<br>البذور الصفراء = <b>٧٥٪</b> · '+E('yy')+' = <b>٢٥٪</b>.'},
   {src:'تدريب صفي ١',q:'زهرة حمراء '+E('RR')+' × زهرة بيضاء '+E('rr')+': اكتب الطرز الجينية والشكلية.',a:'الطرز الجينية: ٤ '+E('Rr')+' · الطرز الشكلية: ٤ أحمر هجين ← نسبة الأزهار الحمراء <b>١٠٠٪</b>.'},
   {src:'سؤال العرض',q:'لماذا يزرع الفلاحون البذور التي تحمل الصفة النقية؟',a:'لكي يستمر ظهور هذه الصفات في الأجيال القادمة إذا كانت مرغوبة.'}]);
  $('#qR',el).insertAdjacentHTML('beforeend','<div class="cd" style="background:#f6f2ff"><p style="margin:0;font-size:16px">📌 «تدريب صفي ٢» (ص ١٣٥) فارغ في العرض، وأسئلة «ماذا قرأت؟» ومراجعة الفصل غير موجودة فيه؛ يمكن إضافة حلولها عند تزويدنا بصور صفحاتها.</p></div>');
  return {}}});

/* ===== ١٤) م٩ المسابقة ===== */
function MQ(l,q,o,a,ex){return {l:l,q:q,o:o,a:a,ex:ex}}
var TF=['صح','خطأ'];
var BANK=[MQ(1,'الفرد الذي يحمل جينين متقابلين مختلفين لصفة واحدة:',['غير متماثل الجينات','متماثل الجينات','نقي','سائد'],0,'هجين.'),MQ(1,'مؤسس علم الوراثة:',['مندل','نيوتن','واطسون','فرانكلين'],0,'مندل.'),
 MQ(1,'العلم الذي يدرس كيفية توارث الصفات:',['علم الوراثة','علم البيئة','علم الحياة','علم الاجتماع'],0,'علم الوراثة.'),MQ(1,'يُرمز للجين السائد بـ:',['الحرف الكبير','الحرف الصغير','رقم','لون'],0,'مثل T.'),
 MQ(1,'أجرى مندل تجاربه على نبات:',['البازلاء','القمح','الفول','الطماطم'],0,'البازلاء.'),MQ(1,'أزواج الجينات المسؤولة عن صفة محددة:',['الجينات المتقابلة (الأليل)','الرايبوسومات','الأحماض الأمينية','الطفرات'],0,'الأليل.'),
 MQ(1,'الصفة التي تظهر دائمًا جيلًا بعد جيل:',['الصفة النقية','الصفة الهجينة','الطفرة','الصفة المكتسبة'],0,'النقية.'),MQ(1,'مربع بانيت يساعد على توقع صفات الأبناء.',TF,0,'صحيح.'),
 MQ(1,'تحتوي كل خلية جنسية على جين متقابل واحد لكل صفة.',TF,0,'صحيح.'),MQ(1,'متماثل الجينات يحمل جينين متقابلين مختلفين.',TF,1,'هذا غير المتماثل.'),
 MQ(2,'الطراز الجيني Aa يمثّل فردًا:',['غير متماثل الجينات (هجين)','متماثل سائدًا','متماثل متنحيًا','نقيًّا'],0,'جينان مختلفان.'),MQ(2,'تظهر الصفة المتنحية عندما يكون الطراز الجيني:',['aa','AA','Aa','A فقط'],0,'متماثل متنحٍ.'),
 MQ(2,'لقّح مندل قرونًا خضراء نقية مع صفراء نقية، فكان الجيل الأول:',['كله أخضر القرون','كله أصفر','نصفه أخضر ونصفه أصفر','بلا قرون'],0,'الأخضر سائد.'),MQ(2,'الطرز الشكلية هي:',['الصفات المظهرية الناتجة عن الطرز الجينية','الحروف التي تمثّل الجينات','عدد الكروموسومات','نوع الخلية'],0,'مثل طويل أو قصير.'),
 MQ(2,'في أي عام قُدّرت أهمية تجارب مندل؟',['١٩٠٠م','١٨٥٦م','١٩٥٣م','١٨٠٠م'],0,'عندما توصّل ثلاثة علماء إلى النتائج نفسها.'),MQ(2,'كم صفة درس مندل في البازلاء؟',['٧','٣','١٠','٢'],0,'سبع صفات.'),
 MQ(2,'تنفصل الجينات المتقابلة إلى خلايا جنسية منفصلة خلال الانقسام:',['المنصف','المتساوي','الثنائي','الخلوي فقط'],0,'المنصف.'),MQ(2,'الحرف الكبير دائمًا يمثّل جين الصفة المتنحية.',TF,1,'يمثّل السائد.'),
 MQ(2,'من صفات البازلاء السائدة في جدول مندل:',['البذور الملساء','البذور المجعدة','القرون الصفراء','الأزهار البيضاء'],0,'الأملس سائد.'),MQ(2,'من صفات البازلاء المتنحية:',['الساق القصيرة','الساق الطويلة','البذور الصفراء','الأزهار الأرجوانية'],0,'القصير متنحٍ.'),
 MQ(3,'Bb × bb: احتمال ولادة قط أسود (B سائد):',['٥٠٪','٢٥٪','٧٥٪','١٠٠٪'],0,'٢ Bb و٢ bb.'),MQ(3,'Yy × Yy: احتمال البذور الصفراء (Y سائد):',['٧٥٪','٥٠٪','٢٥٪','١٠٠٪'],0,'YY، ٢ Yy، yy.'),
 MQ(3,'Yy × Yy: احتمال الطراز الجيني yy:',['٢٥٪','٥٠٪','٧٥٪','صفر٪'],0,'خانة واحدة من أربع.'),MQ(3,'RR × rr: الأبناء جميعًا:',['Rr أحمر هجين','RR أحمر نقي','rr أبيض','نصفهم أبيض'],0,'٤ Rr.'),
 MQ(3,'Ww × ww: نسبة الأبناء قصيري الجناح (W سائد):',['٥٠٪','٢٥٪','٧٥٪','صفر٪'],0,'٢ ww من ٤.'),MQ(3,'نبات قصير الساق (القصر متنحٍ)، طرازه الجيني:',['tt','TT','Tt','لا يمكن معرفته'],0,'المتنحي لا يظهر إلا متماثلًا.'),
 MQ(3,'لماذا كانت نتائج مندل دقيقة جدًّا؟',['لأنه درس أعدادًا كبيرة من النباتات','لأنه درس نبتة واحدة','لأنه درس الحيوانات','لأنه لم يستعمل الرياضيات'],0,'نحو ٣٠٠٠٠ نبتة في ٨ سنوات.'),MQ(3,'نبات طويل الساق قد يكون طرازه TT أو Tt.',TF,0,'الصفة السائدة لها صورتان.')];
BANK.forEach(function(q,i){q.id='g9c4b-'+(i+1);q.q=q.q.replace(/\b([A-Za-z]{2}(?: × [A-Za-z]{2})?)\b/g,'<span class="ltr">$1</span>');if(/^[A-Za-z]{2}/.test(q.o[0]))q.o=q.o.map(function(s){return s.replace(/^([A-Za-z]{2})/,'<span class="ltr">$1</span>')})});

/* ===== الخلاصة (كما في العرض) ===== */
S({id:'sum',name:'م٩ الخلاصة',ic:'📌',build:function(el){var SEC=[['الصفات الوراثية',['الوراثة: انتقال الصفات من الآباء إلى الأبناء.','علم الوراثة: دراسة كيفية انتقال الصفات الوراثية وتفاعل الجينات المتقابلة بعضها مع بعض.']],['مندل · مؤسس علم الوراثة',['في عام ١٨٥٦م بدأ مندل تجاربه على نبات البازلاء مستعملًا المنهج العلمي الدقيق.','كان مندل أول من تتبع انتقال الصفة الوراثية الواحدة عبر عدة أجيال.','في عام ١٩٠٠م توصل ثلاثة علماء، كلٌّ على حدة، إلى النتائج نفسها التي توصل إليها مندل.']],['الوراثة الحديثة',['التهجين: انتقال معلومات وراثية مختلفة للصفة الواحدة من الآباء.','تتضمن الوراثة عوامل سائدة وأخرى متنحية.','يُستعمل مربع بانيت لتوقع نتائج التزاوج.','أدت نتائج مندل إلى وضع مبادئ علم الوراثة.']]];
  el.innerHTML='<div class="ey">المحطة ٩ · الخلاصة ص ١٣٥</div><h1 class="t">الخلاصة</h1><div class="col scroll grow"><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;align-content:start">'+SEC.map(function(s,i){return '<div class="cd'+(i?' reveal':'')+'"><h3>'+s[0]+'</h3><ul style="margin:0;font-size:18px;line-height:1.8">'+s[1].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'}).join('')+'</div><p class="hint" style="margin:6px 0 0">اضغط «كشف» لإظهار القسم التالي.</p></div>';
  return {enter:function(){G.done('sum')},reveal:function(){var r=$$('.reveal:not(.shown)',el);if(r.length){r[0].classList.add('shown');return true}return false}}}});
S({id:'contest',name:'م١٠ سباق اللولب المزدوج (إثرائي)',ic:'🏁',manual:true,build:function(el){return G.contest(el,{ey:'المحطة ١٠ · إثرائي: مسابقة الفرق الأربعة',title:'سباق اللولب المزدوج: علم الوراثة',bank:BANK})}});

/* ===== ١٥) الختام ===== */
S({id:'review',name:'م١١ الختام وبطاقة الخروج',ic:'🎟',build:function(el){return G.review(el,{antKey:'l2',ant:ANT,goals:[
  {t:GO[0],how:'تتبعنا الجينات المتقابلة من الأبوين إلى الابن، ولقّحنا البازلاء',st:['alle','cross'],q:['l2-gam','l2-her','l2-hyb']},
  {t:GO[1],how:'زرنا حديقة مندل وعرفنا لماذا اختار البازلاء',st:['mendel','princ'],q:['l2-men','l2-mo']},
  {t:GO[2],how:'رمينا العملتين وحللنا مسائل مربع بانيت',st:['prob','pun'],q:['l2-pr','l2-p50']},
  {t:GO[3],how:'كوّنّا الطرز الجينية وشاهدنا الطرز الشكلية',st:['domrec'],q:['l2-hom','l2-wr']}],
  exit:[{id:'l2-x1',goal:4,lvl:1,q:'الطراز الجيني '+E('Tt')+' يعني أن الفرد:',o:['هجين (غير متماثل الجينات)','نقي سائد','نقي متنحٍ','بلا صفة'],a:0,ex:'جينان مختلفان.'},{id:'l2-x2',goal:3,lvl:2,q:E('Aa × Aa')+': احتمال ظهور الصفة المتنحية:',o:['٢٥٪','٥٠٪','٧٥٪','١٠٠٪'],a:0,ex:'خانة '+E('aa')+' واحدة من أربع.'},{t:'tf',id:'l2-x3',goal:2,lvl:1,q:'مندل أول من تتبّع صفة واحدة عبر عدة أجيال.',v:true,ex:'صحيح.'}],
  hw:['حُلّ أسئلة «اختبر نفسك» ص ١٣٥.','ارسم مربع بانيت لتزاوج '+E('Tt × Tt')+'، واكتب الطرز الجينية والشكلية ونسبها.']})}});

TV=G.termSetup(L,TERMS,[{id:'alle',pg:'ص ١٢٨',i:[0,1,2,3]},{id:'cross',pg:'ص ١٣٠',i:[4,5]},{id:'domrec',pg:'ص ١٣٠',i:[6,7,8,9]},{id:'pun',pg:'ص ١٣١',i:[10,11,12]}]);
G.lesson('l2',L);
})();
