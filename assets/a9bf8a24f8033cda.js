/* الدرس الأول: أنشطة في الخلية (ص ٨٨–٩٨) — «مدينة الخلية» */
(function(){
"use strict";
var E=window.E,$=E.$,$$=E.$$,n=E.n,h=E.h,IMG=window.IMG||{},img=E.img,card=E.card;
function ic(e,bg){return '<span style="font-size:46px;line-height:1">'+e+'</span>'}
var GO=['أن يوضّح الطالب وظيفة النفاذية الاختيارية للغشاء البلازمي.','أن يوضّح الطالب كيفية انتقال الجزيئات بعمليتي الانتشار والخاصية الأسموزية في الخلايا الحية.','أن يوضّح الطالب الاختلاف بين النقل النشط والنقل السلبي.','أن يميّز الطالب بين المنتِجات والمستهلكات.','أن يوضّح الطالب كيف تقوم عمليتا البناء الضوئي والتنفس الخلوي بتخزين الطاقة وإطلاقها.','أن يصف الطالب كيف تحصل الخلايا على الطاقة خلال عملية التخمر.'];
var L1={title:'أنشطة في الخلية',blurb:'جولة في مدينة الخلية: بوابة الغشاء البلازمي، والانتشار والأسموزية، والنقل النشط، والبلعمة، ومصنع الغذاء، ومحطة الطاقة.',stations:[]};
function S(o){L1.stations.push(o)}
function cv2(c){var x=c.getContext('2d');return x}
function T(x,s,X,Y,sz,col,w){x.font=(w||700)+' '+(sz||22)+'px "Readex Pro",sans-serif';x.textAlign='center';x.textBaseline='middle';x.direction='rtl';x.fillStyle=col||'#1b2a3a';x.fillText(s,X,Y)}
function rr(x,X,Y,W,H,r){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+W,Y,X+W,Y+H,r);x.arcTo(X+W,Y+H,X,Y+H,r);x.arcTo(X,Y+H,X,Y,r);x.arcTo(X,Y,X+W,Y,r);x.closePath()}
function pill(x,s,X,Y,bg,fg){x.font='700 21px "Readex Pro",sans-serif';var w=x.measureText(s).width+28;x.fillStyle=bg||'#fff';rr(x,X-w/2,Y-19,w,38,19);x.fill();x.strokeStyle='rgba(27,42,58,.2)';x.lineWidth=2;x.stroke();T(x,s,X,Y+1,21,fg||'#1b2a3a')}
/* غشاء بلازمي (طبقتان من الدهون) رأسي عند x */
function membrane(x,X,Y0,Y1,prot){for(var y=Y0;y<Y1;y+=16){[-1,1].forEach(function(s){x.fillStyle='#ff8a5b';x.beginPath();x.arc(X+s*22,y,7,0,7);x.fill();x.strokeStyle='#e0a070';x.lineWidth=2;x.beginPath();x.moveTo(X+s*15,y);x.lineTo(X+s*3,y+3);x.moveTo(X+s*15,y+3);x.lineTo(X+s*3,y+7);x.stroke()})}
  (prot||[]).forEach(function(p){x.fillStyle=p.c||'#2f8cff';rr(x,X-24,p.y-28,48,56,16);x.fill();x.fillStyle='#fff';x.fillRect(X-5,p.y-28,10,56)})}

/* ========== ١) المقدمة ========== */
S({id:'intro',name:'المقدمة التشويقية',full:true,build:function(el){return E.imgIntro(el,{src:IMG.a_cellinfo,w:1312,h:1199,dur:27,
  keys:[[0,.5,.5,1],[3.6,.5,.5,1.06],[5.2,.70,.24,1.9],[8.6,.70,.24,1.96],[10.2,.6,.36,2.0],[13.6,.6,.36,2.06],[15.2,.37,.31,1.9],[18.6,.37,.31,1.96],[20.2,.28,.68,1.8],[23.2,.28,.68,1.86],[24.8,.5,.5,1]],
  caps:[[.6,4.6,'كل خلية… <b>مدينة صغيرة</b> تصنع عالمًا كبيرًا'],[5.2,9.6,'<b>الغشاء البلازمي</b>: سور المدينة… ينظّم دخول المواد وخروجها'],[10.2,14.6,'<b>النواة</b>: تحتوي على المادة الوراثية، وتتحكم في أنشطة الخلية'],[15.2,19.6,'<b>الميتوكندريا</b>: محطات الطاقة… تحرّر الطاقة المخزنة في الغذاء'],[20.2,24.2,'<b>السيتوبلازم</b>: وسط هلامي تحدث فيه معظم التفاعلات الحيوية']],
  finalAt:24.6,final:'كيف تنقل الخلية المواد؟<br><span class="gl">وكيف تحصل على الطاقة؟</span>'})}});

/* ========== ٢) ماذا ستتعلم؟ ========== */
S({id:'wonder',name:'ماذا ستتعلم اليوم؟',build:function(el){return E.wonder(el,{eyebrow:'الدرس الأول · أنشطة في الخلية',items:[
  {ic:ic('🚪'),t:'كيف يختار الغشاء البلازمي ما يدخل الخلية وما يخرج منها؟'},{ic:ic('💧'),t:'كيف تتحرك جزيئات الماء والأكسجين عبر الغشاء؟'},{ic:ic('⚡'),t:'متى تحتاج الخلية إلى طاقة لنقل المواد؟'},{ic:ic('🌿'),t:'كيف يصنع النبات غذاءه من ضوء الشمس؟'},{ic:ic('🏃'),t:'لماذا تتألم العضلات بعد الجهد الكبير؟'}]})}});

/* ========== ٣) الأهداف ========== */
S({id:'goals',kind:'goals',name:'أهداف الدرس',build:function(el){return E.goalsScreen(el,{eyebrow:'أنشطة في الخلية · ص ٨٨',idea:'يتحكم الغشاء البلازمي في المواد التي تدخل خلايا جسمك أو تخرج منها، ونستطيع الاستفادة من الطاقة الشمسية من خلال عمليتي البناء الضوئي والتنفس الخلوي.',goals:[{ic:ic('🚪'),t:GO[0]},{ic:ic('💧'),t:GO[1]},{ic:ic('⚡'),t:GO[2]},{ic:ic('🐄'),t:GO[3]},{ic:ic('☀'),t:GO[4]},{ic:ic('🧪'),t:GO[5]}]})}});

/* ========== ٤) التهيئة ========== */
S({id:'prior',name:'التهيئة',build:function(el){el.innerHTML='<div class="eyebrow">تهيئة · ص ٨٨</div><h1 class="t">كيف تمنع الحشرات من دخول النافذة المفتوحة؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1;gap:10px;min-height:0"><div class="card pcard" style="padding:12px">'+img('a_bee','height:230px;width:100%;object-fit:cover;border-radius:16px')+'<p class="big" style="margin:0">يوفّر لك شبك النافذة الحماية التي تريدها، كما <b class="gl">يسمح لبعض الأشياء</b> بالدخول إلى الغرفة والخروج منها، كالهواء والروائح.</p></div>'+
   '</div><div class="col grow side" id="pp"></div></div>';
  E.poll($('#pp',el),{compact:1,q:'الخلية أيضًا يحيط بها «شبك». ماذا تتوقع أن يفعل؟',o:['يمنع كل المواد من الدخول','يسمح لكل المواد بالدخول','يسمح لبعض المواد ويمنع أخرى']});
  E.poll($('#pp',el),{compact:1,q:'من أين تحصل خلايا جسمك على الطاقة؟',o:['من الغذاء','من ضوء الشمس مباشرة','من الماء فقط']});return {}}});

/* ========== ٥) خريطة المدينة ========== */
var DIST=[['gate','🚪','بوابة المدينة','الغشاء البلازمي',350,250,'#ff6b5b'],['diff','🌫','ساحة الانتشار','الانتشار والاتزان',560,150,'#2f8cff'],['osmo','💧','قناة الماء','الخاصية الأسموزية',780,190,'#2f8cff'],['active','⚡','بوابات البروتين','المدعوم والنشط',960,300,'#ff6b5b'],['vesicle','🫧','الميناء','البلعمة والإخراج',1060,480,'#9b6cff'],['enzyme','🔑','ورشة الإنزيمات','الأيض',820,560,'#ffb020'],['photo','🌿','مصنع الغذاء','البناء الضوئي',560,560,'#3fbf4a'],['resp','🔋','محطة الطاقة','التنفس والتخمر',330,500,'#ff9a2f'],['cycle','♻','حلقة التوازن','العلاقة بين العمليتين',190,360,'#1fae7a']];
S({id:'map',name:'خريطة المدينة',build:function(el){
  el.innerHTML='<div class="eyebrow">خريطة الرحلة</div><h1 class="t" style="font-size:42px">مدينة الخلية: اختر الحيّ الذي تزوره</h1><div class="map"><svg viewBox="0 0 1250 680" id="mp"></svg></div>';
  function draw(){var d=E.ST.done[E.cur]||{},L=E.curL();var s='<defs><radialGradient id="cg" cx="50%" cy="45%"><stop offset="0" stop-color="#f4fff8"/><stop offset="1" stop-color="#c8f0dc"/></radialGradient></defs><ellipse cx="625" cy="360" rx="590" ry="310" fill="url(#cg)" stroke="#ff8a5b" stroke-width="14" stroke-dasharray="3 9" stroke-linecap="round"/><ellipse cx="625" cy="360" rx="575" ry="296" fill="none" stroke="#ffb08a" stroke-width="4"/>'+
      '<path d="M350 250 Q560 120 780 190 T1060 480 Q820 640 560 560 T190 360 Q230 270 350 250" fill="none" stroke="#1fae7a" stroke-width="6" stroke-dasharray="14 12" opacity=".5"/>';
    DIST.forEach(function(x,i){var idx=L.stations.findIndex(function(st){return st.id===x[0]}),dn=d[x[0]];s+='<g class="dist'+(dn?' done':'')+'" data-i="'+idx+'" style="animation:rise .6s '+(i*.08)+'s both"><g class="bub"><circle cx="'+x[4]+'" cy="'+x[5]+'" r="58" fill="#fff" stroke="'+x[6]+'" stroke-width="6"/><circle class="ring" cx="'+x[4]+'" cy="'+x[5]+'" r="66" fill="none" stroke="'+(dn?'#16a34a':'transparent')+'" stroke-width="5"/><text x="'+x[4]+'" y="'+(x[5]+16)+'" text-anchor="middle" font-size="46">'+x[1]+'</text>'+(dn?'<circle cx="'+(x[4]+44)+'" cy="'+(x[5]-44)+'" r="16" fill="#16a34a"/><text x="'+(x[4]+44)+'" y="'+(x[5]-37)+'" text-anchor="middle" font-size="20" fill="#fff" font-weight="800">✓</text>':'')+'<rect x="'+(x[4]-92)+'" y="'+(x[5]+64)+'" width="184" height="56" rx="16" fill="#fff" stroke="rgba(27,42,58,.15)"/><text x="'+x[4]+'" y="'+(x[5]+88)+'" text-anchor="middle" font-size="20" font-weight="800" fill="#1b2a3a" font-family="Readex Pro">'+x[2]+'</text><text x="'+x[4]+'" y="'+(x[5]+110)+'" text-anchor="middle" font-size="15" fill="#56677a" font-family="IBM Plex Sans Arabic">'+x[3]+'</text></g></g>'});
    $('#mp',el).innerHTML=s;$$('.dist',el).forEach(function(g){g.onclick=function(){E.go(+g.dataset.i)}})}
  return {enter:draw}}});

/* ========== ٦) م١ مختبر الغشاء: النفاذية الاختيارية ========== */
S({id:'gate',name:'م١ بوابة المدينة',build:function(el){var LK=E.LK;
  el.innerHTML='<div class="eyebrow">المحطة ١ · النقل السلبي ص ٨٨</div><h1 class="t" style="font-size:40px">مختبر الغشاء: من يعبر… ومن يُمنع؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 57%;gap:8px;min-height:0"><canvas class="sim" id="gcv" width="1000" height="540" style="flex:1;min-height:0;height:100%;max-width:100%;align-self:center"></canvas><div id="gt"></div></div>'+
   '<div class="col grow side" id="gq" style="gap:10px"><div id="gtb"></div>'+card('النفاذية الاختيارية','<p class="big" style="margin:0">يحيط بالخلية الغشاء البلازمي الذي يشبه في عمله شبك النافذة. ويمتاز بـ<b class="gl">النفاذية الاختيارية</b>: <span class="reveal">أي أنه يسمح لبعض المواد بالنفاذ من الخلية وإليها، بينما يمنع مواد أخرى من المرور.</span></p>')+
   card('تمرّ المواد بطرائق مختلفة، ويعتمد ذلك على:','<div class="chips"><span class="tag">١ حجم الجزيئات</span><span class="tag gold">٢ حاجة الخلية إلى الطاقة</span><span class="tag vi">٣ الطريق الذي تسلكه خلال الغشاء</span></div><p style="margin:8px 0 0;font-size:19px">وتسمى عملية نقل المواد عبر الغشاء البلازمي دون الحاجة إلى طاقة <b class="gl">النقل السلبي</b>، ومن أنواعه: الانتشار، والخاصية الأسموزية، والانتشار المدعوم.</p>')+'</div></div>';
  var c=$('#gcv',el),x=c.getContext('2d'),P=[],run=false,raf=0,busy=false,S0=392;
  var M=[['o2','الأكسجين','صغير','<b style="color:#0e7a52">✔ يعبر الغشاء</b>'],['h2o','الماء','صغير','<b style="color:#0e7a52">✔ يعبر الغشاء</b>'],['big','جزيء بروتين ضخم','كبير جدًّا','<b style="color:#b42318">✖ لا يعبر بالانتشار</b>']];
  var BG=[];for(var i=0;i<14;i++)BG.push({x:Math.random()*S0,y:40+Math.random()*(S0-60),ph:Math.random()*6});
  function draw(){var by=440;LK.bg(x,1000,540,by);var ms=LK.microscope(x,170,by);LK.plate(x,'المجهر',170,490);LK.plate(x,'منظر مكبّر (تخيّلي) لغشاء الخلية',640,490);
    LK.lens(x,640,246,196,ms.sx,ms.sy,function(x,S){x.fillStyle='#e3f1ff';x.fillRect(0,0,S/2,S);x.fillStyle='#e6f8ec';x.fillRect(S/2,0,S/2,S);
      var t=performance.now()/600;BG.forEach(function(b){x.globalAlpha=.35;LK.mol(x,'h2o',b.x+Math.sin(t+b.ph)*3,b.y+Math.cos(t+b.ph)*3,.7);x.globalAlpha=1});
      LK.memV(x,S/2,-10,S+20,[],10);LK.pill(x,'خارج الخلية',S*.25,64,'#fff','#2f5f8a',16);LK.pill(x,'داخل الخلية',S*.75,64,'#fff','#1f7a52',16);
      P.forEach(function(p){LK.mol(x,p.k,p.x,p.y,1);if(p.st===2)LK.T(x,'✖',p.x,p.y-44,28,'#d9453b',800)})},'عدسة التكبير')}
  function step(){P.forEach(function(p){if(p.st===0){p.x+=p.vx;p.y+=p.vy;if(p.y<40||p.y>S0-40)p.vy*=-1;if(p.k==='big'&&p.x>S0/2-70){p.st=2;E.sfx.tick()}if(p.k!=='big'&&p.x>p.tx)p.st=1}else if(p.st===1){p.x+=Math.sin(performance.now()/300+p.y)*.4;p.y+=Math.cos(performance.now()/350+p.x)*.4}else{p.x=S0/2-70+Math.sin(performance.now()/90+p.y)*2}})}
  function loop(){if(!run)return;raf=requestAnimationFrame(loop);if(!E.paused)step();draw()}
  LK.tools($('#gt',el),[['💨','أرسل جزيئات الأكسجين'],['💧','أرسل جزيئات الماء'],['🟣','أرسل جزيئًا ضخمًا (بروتين)']],function(i){if(busy)return;busy=true;var m=M[i],N=m[0]==='big'?3:7;P=[];for(var k=0;k<N;k++)P.push({k:m[0],x:20+Math.random()*60,y:70+Math.random()*(S0-140),vx:1.5+Math.random()*.9,vy:(Math.random()-.5)*1.2,st:0,tx:S0/2+60+Math.random()*120});E.sfx.whoosh();
    setTimeout(function(){busy=false;tb.fill(i,[m[2],m[3]]);E.sfx.ok();if(tb.count()===3){E.complete('gate');$('#gtb',el).insertAdjacentHTML('beforeend','<div class="fbx ok" style="margin-top:6px"><b>النتيجة:</b> الغشاء البلازمي اختياري النفاذية؛ تعبره الجزيئات الصغيرة، ويمنع الجزيئات الكبيرة جدًّا من المرور بالانتشار.</div>');var r=$('.reveal',el);r&&r.classList.add('shown')}},2900)});
  var tb=LK.table($('#gtb',el),['الجزيء','حجمه','هل عبر الغشاء؟'],M.map(function(m){return [m[1],'','']}));
  var q=$('#gq',el);
  
  return {enter:function(){run=true;loop()},leave:function(){run=false;cancelAnimationFrame(raf)}}}});

/* ========== ٧) م٢ مختبر الانتشار ========== */
S({id:'diff',name:'م٢ الانتشار والاتزان',build:function(el){var LK=E.LK;
  el.innerHTML='<div class="eyebrow">المحطة ٢ · الانتشار ص ٨٩</div><h1 class="t" style="font-size:40px">مختبر الانتشار: قطرة في كأس ماء</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 57%;gap:8px;min-height:0"><div class="lcdrow"><div class="lcd"><small>جزيئات الصبغة في النصف الأيمن</small><b id="dA">٠</b></div><div class="lcd am"><small>جزيئات الصبغة في النصف الأيسر</small><b id="dB">٠</b></div><div class="lcd"><small>الحالة</small><b id="dS" style="font-size:22px">جاهز</b></div></div><canvas class="sim" id="dcv" width="1000" height="540" style="flex:1;min-height:0;height:100%;max-width:100%;align-self:center"></canvas><div class="qa" style="margin:0"><button class="btn" id="dGo">💧 أضف قطرة من الصبغة</button><button class="btn ghost" id="dR">↺ كأس جديدة</button><span class="hint">تجربة توضيحية لفكرة الانتشار.</span></div></div>'+
   '<div class="col grow side" id="dq" style="gap:10px">'+card('الانتشار','<p class="big" style="margin:0">عملية انتقال الجزيئات من الأماكن ذات <b class="gl">التركيز المرتفع</b> إلى الأماكن ذات <b class="gl">التركيز المنخفض</b>.</p><p class="reveal explain" style="margin:6px 0 0">يستمر إلى أن يصبح العدد النسبي للجزيئات متساويًا في المنطقتين، وعندها نصل إلى حالة <b>الاتزان</b>، وتتوقف هذه العملية.</p><p class="hint" style="margin:6px 0 0">🦶 مثال: تحتاج خلايا أصابع القدمين، مثل بقية خلايا الجسم، إلى الأكسجين الذي ينتشر إليها.</p>')+'</div></div>';
  var c=$('#dcv',el),x=c.getContext('2d'),D=[],W=[],run=false,raf=0,eq=false,t0=0,N=64;
  for(var i=0;i<90;i++)W.push({u:Math.random(),v:Math.random(),ph:Math.random()*6});
  function reset(){D=[];eq=false;$('#dS',el).textContent='جاهز'}
  function drop(){if(D.length)return;for(var i=0;i<N;i++){var a=Math.random()*6.28,r=Math.random()*.05;D.push({u:.14+Math.cos(a)*r,v:.22+Math.sin(a)*r*1.3})}t0=performance.now();E.sfx.pop()}
  function counts(){var R=D.filter(function(d){return d.u>=.5}).length;return [D.length-R,R]}/* [يسار، يمين] */
  function draw(){var by=440,cx=235;LK.bg(x,1000,540,by);
    LK.beaker(x,cx,by,300,330,{level:.86,liq:'rgba(150,205,240,.5)',inside:function(x,X,Y,Wd,Hd){D.forEach(function(d){var px=X+d.u*Wd,py=Y+d.v*Hd,g=x.createRadialGradient(px,py,0,px,py,46);g.addColorStop(0,'rgba(150,40,200,.24)');g.addColorStop(1,'rgba(150,40,200,0)');x.fillStyle=g;x.fillRect(px-46,py-46,92,92)})}});
    x.strokeStyle='rgba(27,42,58,.25)';x.setLineDash([8,8]);x.lineWidth=2;x.beginPath();x.moveTo(cx,150);x.lineTo(cx,425);x.stroke();x.setLineDash([]);
    if(!D.length){x.fillStyle='#a23fd1';x.beginPath();x.moveTo(cx-95,60);x.lineTo(cx-89,76);x.arc(cx-95,80,7,0,Math.PI);x.closePath();x.fill();LK.T(x,'قطرة صبغة',cx-95,40,16,'#6a1f8f')}
    LK.plate(x,'كأس فيها ماء',cx,490);LK.plate(x,'منظر مكبّر (تخيّلي) للجزيئات',690,490);
    LK.lens(x,690,246,196,cx,300,function(x,S){var t=performance.now()/500;x.fillStyle='#f2f9ff';x.fillRect(0,0,S,S);
      W.forEach(function(w){x.fillStyle='rgba(47,140,255,.28)';x.beginPath();x.arc(w.u*S+Math.sin(t+w.ph)*2,w.v*S+Math.cos(t+w.ph)*2,5,0,7);x.fill()});
      x.strokeStyle='rgba(27,42,58,.3)';x.setLineDash([8,8]);x.lineWidth=2;x.beginPath();x.moveTo(S/2,0);x.lineTo(S/2,S);x.stroke();x.setLineDash([]);
      D.forEach(function(d){LK.mol(x,'dye',d.u*S,d.v*S,1)});
      var k=counts();if(D.length&&!eq&&Math.abs(k[0]-k[1])>6){LK.pill(x,k[0]>k[1]?'تركيز مرتفع':'تركيز منخفض',S*.25,S-60,'#fff','#6a1f8f',15);LK.pill(x,k[1]>k[0]?'تركيز مرتفع':'تركيز منخفض',S*.75,S-60,'#fff','#6a1f8f',15);
        x.fillStyle='#ff6b5b';x.beginPath();var ay=S/2,dir=k[0]>k[1]?1:-1;x.moveTo(S/2-dir*60,ay-10);x.lineTo(S/2+dir*40,ay-10);x.lineTo(S/2+dir*40,ay-24);x.lineTo(S/2+dir*70,ay);x.lineTo(S/2+dir*40,ay+24);x.lineTo(S/2+dir*40,ay+10);x.lineTo(S/2-dir*60,ay+10);x.closePath();x.fill()}
      if(eq)LK.pill(x,'⚖ الاتزان: العدد متساوٍ تقريبًا',S/2,S-60,'#e3f7ea','#0e7a52',16)},'عدسة التكبير');
    var k=counts();$('#dA',el).textContent=n(k[1]);$('#dB',el).textContent=n(k[0])}
  function step(dt){var ns=Math.max(1,Math.round(dt*60));for(var q=0;q<ns;q++)D.forEach(function(d){d.u+=(Math.random()-.5)*.085;d.v+=(Math.random()-.5)*.085;if(d.u<.02)d.u=.04-d.u;if(d.u>.98)d.u=1.96-d.u;if(d.v<.02)d.v=.04-d.v;if(d.v>.98)d.v=1.96-d.v});
    if(D.length&&!eq){var k=counts();$('#dS',el).textContent='انتشار…';if(performance.now()-t0>3000&&Math.abs(k[0]-k[1])<=4){eq=true;$('#dS',el).textContent='الاتزان';E.sfx.ok();E.complete('diff');var r=$('.reveal',el);r&&r.classList.add('shown')}}}
  var lt=0;function loop(ts){if(!run)return;raf=requestAnimationFrame(loop);var dt=Math.min(.25,(ts-(lt||ts))/1000)||.016;lt=ts;if(!E.paused)step(dt);draw()}
  $('#dGo',el).onclick=drop;$('#dR',el).onclick=reset;
  var q=$('#dq',el);
  
  return {enter:function(){run=true;loop()},leave:function(){run=false;cancelAnimationFrame(raf)}}}});

/* ========== ٨) م٣ مختبر الخاصية الأسموزية ========== */
S({id:'osmo',name:'م٣ الخاصية الأسموزية',build:function(el){var LK=E.LK,typ='p',med=0,prog=0,run=false,raf=0,drops=[];
  var MED=['ماء عذب','متساوي التركيز','ماء مالح'],BX=[110,272,434];
  el.innerHTML='<div class="eyebrow">المحطة ٣ · الخاصية الأسموزية ص ٨٩–٩٠</div><h1 class="t" style="font-size:40px">مختبر الأسموزية: ثلاث كؤوس</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 58%;gap:8px;min-height:0"><div class="chips"><b style="font-family:var(--disp)">نوع الخلية في العدسة:</b><button class="chip" data-t="p" aria-pressed="true">🥕 خلايا نباتية (الجزرة)</button><button class="chip" data-t="a" aria-pressed="false">🔴 خلية حيوانية</button><span style="flex:1"></span><button class="btn ghost" id="oR" style="padding:6px 14px">↺ أعد التجربة</button></div><canvas class="sim" id="ocv" width="1000" height="520" style="flex:1;min-height:0;height:100%;max-width:100%;align-self:center"></canvas><div id="ot"></div></div>'+
   '<div class="col grow side" id="oq" style="gap:10px"><div id="otb"></div>'+card('الخاصية الأسموزية','<p class="big" style="margin:0">هي انتشار جزيئات <b class="gl">الماء</b> عبر الغشاء الخلوي. إذا كانت كمية الماء في محيط الخلية أقل من كميته داخلها، فإن الماء ينتقل من داخلها باتجاه الخارج، والعكس صحيح.</p><p class="reveal explain" style="margin:6px 0 0">تختلف الخلية الحيوانية عن الخلية النباتية في أنها <b>تنفجر</b> إذا دخلتها كميات كبيرة من الماء، أما الخلية النباتية فيحميها الجدار الخلوي.</p>')+
   '<div class="card" style="padding:10px 14px"><b>لماذا يذبل الجزر الموضوع في المحلول الملحي؟</b><div class="row" style="gap:10px;margin-top:6px;align-items:center">'+img('a_carrot','width:180px;border-radius:12px')+'<p class="reveal explain" style="margin:0;flex:1">الماء المالح حول الجزر أقل في كمية الماء من داخل خلاياه، فيخرج الماء من الخلايا بالخاصية الأسموزية فتذبل. أما في الماء العذب فيدخل الماء إليها فتبقى ممتلئة.</p></div></div></div></div>';
  var c=$('#ocv',el),x=c.getContext('2d');
  function tgt(m,t){return m===0?(t==='a'?1.4:1.08):(m===2?.7:1)}
  function kk(m,t){return 1+(tgt(m,t)-1)*E.ease(Math.min(1,prog))}
  function carrot(x,cx,by,k){var bend=k<1?(1-k)*150:0,w=26*Math.min(1.1,k*1.02);x.save();x.lineCap='round';x.strokeStyle=k<1?'#d9822b':'#ff8c2b';x.lineWidth=w;x.beginPath();x.moveTo(cx-6,by-22);x.quadraticCurveTo(cx+10+bend*.6,by-110,cx+18+bend,by-180+bend*.35);x.stroke();
    x.strokeStyle='rgba(120,60,10,.35)';x.lineWidth=2;for(var i=1;i<5;i++){var yy=by-22-i*32;x.beginPath();x.moveTo(cx-8+i*3+bend*i/8,yy);x.lineTo(cx+6+i*3+bend*i/8,yy-3);x.stroke()}
    x.fillStyle=k<1?'#7c9a3a':'#3fbf4a';var tx=cx+18+bend,ty=by-180+bend*.35;[-.5,0,.5].forEach(function(a){x.save();x.translate(tx,ty);x.rotate(a+(k<1?.6:0));x.beginPath();x.ellipse(0,-22,7,22,0,0,7);x.fill();x.restore()});x.restore()}
  function rcell(x,cx,cy,k,s){s=s||1;x.fillStyle='#ff6f61';x.beginPath();x.ellipse(cx,cy,14*k*s,10*k*s,0,0,7);x.fill();x.strokeStyle='#b42318';x.lineWidth=2;x.stroke()}
  function draw(){var by=430;LK.bg(x,1000,520,by);
    BX.forEach(function(cx,m){LK.beaker(x,cx,by,140,230,{level:.8,glow:m===med,liq:m===2?'rgba(240,222,160,.6)':(m===1?'rgba(170,215,235,.55)':'rgba(130,200,245,.5)'),inside:function(x,X,Y,Wd,Hd){if(m===2){x.fillStyle='rgba(255,255,255,.75)';for(var i=0;i<26;i++)x.fillRect(X+(i*37%Wd),Y+(i*53%Hd),4,4)}if(typ==='a'){var k=kk(m,'a');if(m===0&&prog>.9){x.fillStyle='rgba(255,111,97,.6)';for(i=0;i<14;i++)x.fillRect(X+(i*29%Wd),Y+20+(i*41%(Hd-30)),5,5)}else[[.3,.3],[.65,.5],[.4,.75]].forEach(function(p){rcell(x,X+p[0]*Wd,Y+p[1]*Hd,k)})}}});
      if(typ==='p')carrot(x,cx-8,by,kk(m,'p'));LK.plate(x,MED[m],cx,478)});
    LK.plate(x,'العدسة: '+(typ==='p'?'خلية نباتية':'خلية حيوانية')+' في «'+MED[med]+'»',770,478);
    LK.lens(x,770,232,190,BX[med],by-90,function(x,S){var k=kk(med,typ),cx=S/2,cy=S/2+6;x.fillStyle=med===2?'#fff6e0':(med===0?'#e6f3ff':'#eef6ff');x.fillRect(0,0,S,S);
      if(typ==='p'){x.fillStyle='#d7f2c9';LK.rr(x,cx-125,cy-95,250,190,26);x.fill();x.strokeStyle='#3e9a3e';x.lineWidth=14;x.stroke();var w=Math.min(1,k);x.fillStyle='#a8e6a0';LK.rr(x,cx-112*w,cy-82*w,224*w,164*w,20*w);x.fill();x.strokeStyle='#ff6b5b';x.lineWidth=4;x.stroke();x.fillStyle='#9b6cff';x.beginPath();x.arc(cx+30*w,cy-14*w,24*w,0,7);x.fill();
        LK.T(x,'الجدار الخلوي',cx,cy-118,15,'#2b6b2b');}
      else if(!(med===0&&prog>.92)){x.save();x.translate(cx,cy);x.scale(k,k);x.fillStyle='#ff8a7a';x.beginPath();x.ellipse(0,0,96,64,0,0,7);x.fill();x.strokeStyle='#d9453b';x.lineWidth=5/k;x.stroke();x.fillStyle='#9b6cff';x.beginPath();x.arc(14,-6,20,0,7);x.fill();x.restore()}
      else{for(var i=0;i<16;i++){var a=i/16*6.28;x.fillStyle='#ff8a7a';x.beginPath();x.arc(cx+Math.cos(a)*150,cy+Math.sin(a)*100,11,0,7);x.fill()}LK.T(x,'💥 انفجرت!',cx,cy,30,'#d9453b',800)}
      drops.forEach(function(d){x.fillStyle='#2f8cff';x.beginPath();x.arc(cx+Math.cos(d.a)*d.r,cy+Math.sin(d.a)*d.r*.75,6,0,7);x.fill()});
      LK.pill(x,med===0?'الماء يدخل الخلية':(med===2?'الماء يخرج من الخلية':'يدخل الماء ويخرج بالمعدل نفسه'),S/2,S-44,'#fff','#1f5fd0',15)},'عدسة التكبير')}
  function fillT(){if(prog<1)return;var P=['ممتلئة بالماء (صلبة)','لا تغيّر','ذابلة: انكمش السيتوبلازم'],A=['تنتفخ ثم تنفجر','لا تغيّر','تنكمش'],D=['إلى داخل الخلية','يدخل ويخرج بالمعدل نفسه','إلى خارج الخلية'];tb.cell(med,typ==='p'?1:2,typ==='p'?P[med]:A[med]);tb.cell(med,3,D[med]);if(tb.has(0,2)&&tb.has(2,1)){E.complete('osmo');$$('.reveal',el).forEach(function(r){r.classList.add('shown')})}}
  function loop(){if(!run)return;raf=requestAnimationFrame(loop);if(!E.paused){if(prog<1){prog=Math.min(1,prog+1/360);if(prog>=1){E.sfx.ok();fillT()}}if(prog<1&&med!==1&&Math.random()<.3){var inn=med===0;drops.push({a:Math.random()*6.28,r:inn?185:105,v:inn?-2.2:2.2})}drops.forEach(function(d){d.r+=d.v});drops=drops.filter(function(d){return d.r>100&&d.r<190})}draw()}
  function sel(m){med=m;drops=[];$$('#ot .ltool',el).forEach(function(z,i){z.classList.toggle('on',i===m)});E.sfx.tick();fillT()}
  LK.tools($('#ot',el),[['💧','اعرض: الماء العذب'],['⚖','اعرض: متساوي التركيز'],['🧂','اعرض: الماء المالح']],function(i){sel(i)});$$('#ot .ltool',el)[0].classList.add('on');
  c.addEventListener('click',function(e){var r=c.getBoundingClientRect(),X=(e.clientX-r.left)/r.width*1000;BX.forEach(function(cx,m){if(Math.abs(X-cx)<75)sel(m)})});
  $$('[data-t]',el).forEach(function(b){b.onclick=function(){typ=b.dataset.t;$$('[data-t]',el).forEach(function(z){z.setAttribute('aria-pressed',z===b)});E.sfx.pop();fillT()}});
  $('#oR',el).onclick=function(){prog=0;drops=[];E.sfx.whoosh()};
  var tb=LK.table($('#otb',el),['المحلول','الخلية النباتية (الجزرة)','الخلية الحيوانية','اتجاه حركة الماء'],MED.map(function(m){return [m,'','','']}));
  
  return {enter:function(){run=true;loop()},leave:function(){run=false;cancelAnimationFrame(raf)}}}});

/* ========== ٩) م٤ مختبر البروتينات الناقلة: المدعوم والنشط ========== */
S({id:'active',name:'م٤ الانتشار المدعوم والنقل النشط',build:function(el){var LK=E.LK,mode='f',P=[],used=0,run=false,raf=0,busy=false,open=0,bolt=0,S0=380;
  el.innerHTML='<div class="eyebrow">المحطة ٤ · الانتشار المدعوم والنقل النشط ص ٩٠–٩١</div><h1 class="t" style="font-size:40px">مختبر البروتينات الناقلة</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 57%;gap:8px;min-height:0"><div class="row" style="gap:8px;align-items:stretch"><div id="at" style="flex:1"></div><div class="lcd am" style="flex:0 0 150px"><small>الطاقة المستهلكة</small><b id="aE">٠ ⚡</b></div></div><canvas class="sim" id="acv" width="1000" height="520" style="flex:1;min-height:0;height:100%;max-width:100%;align-self:center"></canvas><div class="qa" style="margin:0"><button class="btn" id="aGo">▶ انقل جزيئًا عبر البروتين الناقل</button></div></div>'+
   '<div class="col grow side" id="aq" style="gap:10px"><div id="atb"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+card('الانتشار المدعوم','<p style="margin:0;font-size:18px">انتشار الجزيئات الكبيرة (مثل جزيئات السكر) بمساعدة بروتينات الغشاء الخلوي (<b class="gl">البروتينات الناقلة</b>)، دون طاقة.</p>')+card('النقل النشط','<p style="margin:0;font-size:18px">يحتاج إلى <b class="gl">طاقة</b> لنقل مادة عبر غشاء الخلية، في وجود البروتينات الناقلة.</p>')+'</div>'+
   '<div class="card reveal" style="padding:10px 14px"><p style="margin:0;font-size:18px">تتحد المواد المنقولة خلال النقل النشط مع البروتينات الناقلة، وتستهلك البروتينات الطاقة لنقلها عبر الغشاء البلازمي، وعندما تتحرر المواد من البروتينات الناقلة يمكنها أن ترتبط بجزيئات أخرى تنقلها عبر الغشاء من جديد.</p></div>'+
   '<div class="card" style="padding:10px 14px"><b>ناقش:</b> تنتقل الأملاح المعدنية من التربة إلى داخل النبات بالرغم من أن تركيزها في النبات أعلى من التربة. بأيّ عملية؟<div class="row" style="gap:10px;margin-top:6px;align-items:center">'+img('a_roots','width:130px;border-radius:12px')+'<p class="reveal explain" style="margin:0;flex:1"><b>النقل النشط</b>: لبعض خلايا الجذر امتدادات تسمى الشعيرات الجذرية، وقد يصل طولها إلى ٥–٨ مم، وتنتقل الأملاح عبر أغشيتها بالنقل النشط.</p></div></div>'+
   card('❤ الربط مع الصحة','<p style="margin:0;font-size:17px">في حال عدم وجود البروتينات الناقلة للكولسترول يتراكم على جدران الأوعية الدموية فيضيّقها، وقد تتكون جلطة تعلق في ذلك الحيّز الضيق مسببة نوبة قلبية.</p>')+'</div></div>';
  var c=$('#acv',el),x=c.getContext('2d');
  function mk(){P=[];var o=mode==='f'?9:4,iN=mode==='f'?2:9,k=mode==='f'?'sugar':'salt';for(var i=0;i<o;i++)P.push({k:k,x:30+Math.random()*(S0/2-90),y:50+Math.random()*(S0-110),s:0});for(i=0;i<iN;i++)P.push({k:k,x:S0/2+60+Math.random()*(S0/2-90),y:50+Math.random()*(S0-110),s:1})}
  function pot(x,cx,by){x.fillStyle='#b5651d';x.beginPath();x.moveTo(cx-120,by-170);x.lineTo(cx+120,by-170);x.lineTo(cx+90,by);x.lineTo(cx-90,by);x.closePath();x.fill();x.fillStyle='#c97a34';x.fillRect(cx-130,by-185,260,22);
    x.fillStyle='#5a3a22';x.beginPath();x.moveTo(cx-112,by-163);x.lineTo(cx+112,by-163);x.lineTo(cx+86,by-8);x.lineTo(cx-86,by-8);x.closePath();x.fill();
    x.strokeStyle='#f1e2c4';x.lineCap='round';x.lineWidth=6;x.beginPath();x.moveTo(cx,by-163);x.lineTo(cx,by-60);x.moveTo(cx,by-120);x.quadraticCurveTo(cx-40,by-90,cx-60,by-40);x.moveTo(cx,by-110);x.quadraticCurveTo(cx+40,by-80,cx+55,by-35);x.stroke();
    x.lineWidth=2;for(var i=0;i<14;i++){var t=i/14,px=cx+55*t,py=by-110+75*t;x.beginPath();x.moveTo(px,py);x.lineTo(px+10,py-8);x.stroke()}
    x.strokeStyle='#3e9a3e';x.lineWidth=8;x.beginPath();x.moveTo(cx,by-185);x.lineTo(cx,by-330);x.stroke();x.fillStyle='#3fbf4a';[[-1,-250],[1,-285],[-1,-315]].forEach(function(l){x.beginPath();x.ellipse(cx+l[0]*38,by+l[1],40,15,l[0]*-.5,0,7);x.fill()});
    x.fillStyle='#6cc04a';for(i=0;i<10;i++){x.beginPath();x.arc(cx-70+(i*37%140),by-150+(i*53%130),4,0,7);x.fill()}return {tx:cx+40,ty:by-75}}
  function sbeaker(x,cx,by){LK.beaker(x,cx,by,220,270,{level:.8,liq:'rgba(255,214,110,.5)',inside:function(x,X,Y,Wd,Hd){x.fillStyle='#ffd6e2';x.beginPath();x.arc(X+Wd/2,Y+Hd/2+10,58,0,7);x.fill();x.strokeStyle='#ff8a5b';x.lineWidth=6;x.stroke();x.fillStyle='#9b6cff';x.beginPath();x.arc(X+Wd/2+10,Y+Hd/2+6,18,0,7);x.fill()}});return {tx:cx-58+110/2+2,ty:by-118}}
  function draw(){var by=430;LK.bg(x,1000,520,by);var tg;if(mode==='a'){tg=pot(x,190,by);LK.plate(x,'نبات: جذوره في التربة',190,478)}else{tg=sbeaker(x,190,by);tg={tx:190-56,ty:by-110};LK.plate(x,'خلية في محلول سكري',190,478)}
    LK.plate(x,mode==='a'?'غشاء شعيرة جذرية (مكبّر تخيّليًا)':'غشاء الخلية (مكبّر تخيّليًا)',660,478);
    LK.lens(x,660,232,190,tg.tx,tg.ty,function(x,S){x.fillStyle=mode==='a'?'#f3eadf':'#fff7df';x.fillRect(0,0,S/2,S);x.fillStyle='#e6f8ec';x.fillRect(S/2,0,S/2,S);
      LK.memV(x,S/2,-10,S+20,[{y:S/2,h:96,c:mode==='a'?'#ff6b5b':'#2f8cff',open:open,lab:'بروتين ناقل'}],10);
      LK.pill(x,mode==='a'?'التربة (خارج الخلية)':'المحلول (خارج الخلية)',S*.25,50,'#fff','#7a4a1f',14);LK.pill(x,'داخل الخلية',S*.75,50,'#fff','#1f7a52',14);
      P.forEach(function(p){LK.mol(x,p.k,p.x,p.y,1)});
      if(bolt>0){x.globalAlpha=bolt;LK.T(x,'⚡',S/2,S/2-80,44,'#ff9a2f');LK.pill(x,'طاقة',S/2,S/2-120,'#fff1d6','#b45309',14);x.globalAlpha=1}
      var L=P.filter(function(p){return p.x<S/2}).length,R=P.length-L;LK.pill(x,'عدد الجزيئات: '+n(L),S*.25,S-40,'#fff','#1b2a3a',14);LK.pill(x,'عدد الجزيئات: '+n(R),S*.75,S-40,'#fff','#1b2a3a',14)},'عدسة التكبير')}
  function loop(){if(!run)return;raf=requestAnimationFrame(loop);if(!E.paused){var t=performance.now()/400;P.forEach(function(p,i){if(!p.m){p.x+=Math.sin(t+i)*.25;p.y+=Math.cos(t*1.2+i)*.25}})}draw()}
  function setMode(m){if(busy)return;mode=m;mk();$$('#at .ltool',el).forEach(function(z,i){z.classList.toggle('on',(i===0)===(m==='f'))})}
  LK.tools($('#at',el),[['🍬','الانتشار المدعوم (السكر)'],['⚡','النقل النشط (الأملاح المعدنية)']],function(i){setMode(i?'a':'f')});
  $('#aGo',el).onclick=async function(){if(busy)return;var src=P.filter(function(p){return p.x<S0/2})[0];if(!src){E.toast('انتقلت الجزيئات كلها إلى داخل الخلية');return}busy=true;src.m=1;E.sfx.pop();var x0=src.x,y0=src.y;
    await E.tw(700,function(k){src.x=x0+(S0/2-40-x0)*k;src.y=y0+(S0/2-y0)*k});if(mode==='a'){used++;$('#aE',el).textContent=n(used)+' ⚡';E.sfx.award();await E.tw(400,function(k){bolt=k})}
    await E.tw(700,function(k){open=Math.sin(k*Math.PI);src.x=S0/2-40+80*k});var tx=S0/2+60+Math.random()*(S0/2-90),ty=50+Math.random()*(S0-110);await E.tw(500,function(k){bolt=Math.max(0,bolt-k);src.x=S0/2+40+(tx-S0/2-40)*k;src.y=S0/2+(ty-S0/2)*k});bolt=0;open=0;src.m=0;busy=false;
    if(mode==='f')tb.fill(0,['من التركيز المرتفع إلى المنخفض','<b style="color:#0e7a52">لا</b>','دخول السكر بالبروتينات الناقلة']);else tb.fill(1,['من التركيز المنخفض إلى المرتفع','<b style="color:#b45309">نعم ⚡</b>','دخول الأملاح المعدنية إلى الشعيرات الجذرية']);E.sfx.ok();
    if(tb.count()===2){E.complete('active');var r=$('.card.reveal',el);r&&r.classList.add('shown')}};
  var tb=LK.table($('#atb',el),['نوع النقل','اتجاه الحركة','يحتاج إلى طاقة؟','مثال'],[['الانتشار المدعوم','','',''],['النقل النشط','','','']]);
  setMode('f');
  $('#aq',el).insertAdjacentHTML('beforeend',E.card('💬 ناقش','<p style="margin:0 0 6px;font-size:18px">ما طريقة النقل المُشار لها بالأرقام في الشكل؟</p>'+img('a_fig15','width:100%;border-radius:12px;background:#fff')+'<div class="reveal" style="font-size:18px;margin-top:6px"><b>١</b> النقل النشط · <b>٢</b> النقل السلبي · <b>٣</b> الانتشار · <b>٤</b> الانتشار المدعوم</div>')+E.card('🏠 مهمة أدائية','<p style="margin:0;font-size:17px">نفّذ في المنزل تجربة الانتشار من الرابط الذي يرسله المعلم، ووثّقها، ثم ارفعها على رابط المهام الأدائية.</p>'));
  return {enter:function(){run=true;loop()},leave:function(){run=false;cancelAnimationFrame(raf)}}}});

/* ========== ١٠) م٥ الميناء: البلعمة والإخراج الخلوي ========== */
S({id:'vesicle',name:'م٥ البلعمة والإخراج الخلوي',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٥ · البلعمة والإخراج الخلوي ص ٩٢–٩٣</div><h1 class="t" style="font-size:42px">عمليتان متعاكستان</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 56%;gap:8px;min-height:0"><svg class="labview" id="vs" viewBox="0 0 1000 520" style="flex:1;min-height:0;width:100%;height:100%"></svg><div class="qa" style="margin:0"><button class="btn" id="vIn">🫧 البلعمة: أدخِل جسمًا كبيرًا</button><button class="btn vi" id="vOut">📤 الإخراج الخلوي</button><button class="btn ghost" id="vR">↺</button></div></div>'+
   '<div class="col grow side" id="vq" style="gap:10px">'+card('لماذا؟','<p style="margin:0;font-size:18px">تكون بعض الجزيئات كبيرة جدًّا بحيث لا يمكن نقلها بالانتشار أو بالبروتينات الناقلة، مثل جزيئات البروتينات الضخمة والبكتيريا.</p>')+
   '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+card('البلعمة','<p style="margin:0;font-size:17px">ينثني الغشاء البلازمي إلى الداخل عندما تلامسه الأجسام الكبيرة، فيحيط بها وينغلق على نفسه مكوّنًا كرة تسمى <b class="gl">الفجوة</b>. وتحصل بعض المخلوقات الوحيدة الخلية على غذائها بهذه الطريقة.</p>'+img('a_amoeba','width:100%;height:90px;object-fit:cover;border-radius:10px;margin-top:6px'))+card('الإخراج الخلوي','<p style="margin:0;font-size:17px">يتم بطريقة معاكسة للبلعمة؛ حيث تندمج الفجوة بالغشاء لتنطلق مكوناتها إلى الخارج. وبهذه الطريقة تفرز المعدة إفرازاتها المساعدة على الهضم.</p>')+'</div></div></div>';
  var sv=$('#vs',el),busy=false;
  function mem(d){return '<path d="M0 260 C 250 260, 330 '+(260+d*0.0)+', 400 260 Q 500 '+(260+d)+' 600 260 C 670 260, 750 260, 1000 260" fill="none" stroke="#ff8a5b" stroke-width="22" stroke-linecap="round"/><path d="M0 260 C 250 260, 330 260, 400 260 Q 500 '+(260+d)+' 600 260 C 670 260, 750 260, 1000 260" fill="none" stroke="#ffd2bd" stroke-width="6"/>'}
  function base(d,ox,oy,ves,vy,vr){sv.innerHTML='<rect width="1000" height="520" fill="#eaf6ff"/><rect y="260" width="1000" height="260" fill="#effaf3"/><text x="500" y="40" text-anchor="middle" font-size="22" font-weight="700" fill="#2f5f8a" font-family="Readex Pro">خارج الخلية</text><text x="500" y="500" text-anchor="middle" font-size="22" font-weight="700" fill="#1f7a52" font-family="Readex Pro">داخل الخلية (السيتوبلازم)</text>'+mem(d)+(ves?'<circle cx="500" cy="'+vy+'" r="'+vr+'" fill="rgba(255,138,91,.18)" stroke="#ff8a5b" stroke-width="10"/>':'')+(ox!=null?'<g transform="translate('+ox+' '+oy+')"><ellipse rx="44" ry="26" fill="#9b6cff" stroke="#1b2a3a" stroke-width="3"/><path d="M-44 0 q-20 -10 -30 6 M44 0 q20 10 30 -6" stroke="#1b2a3a" stroke-width="3" fill="none"/></g>':'')}
  base(0,500,120);
  $('#vIn',el).onclick=async function(){if(busy)return;busy=true;E.sfx.whoosh();await E.tw(900,function(k){base(0,500,120+k*100)});await E.tw(1100,function(k){base(150*k,500,220+60*k)});await E.tw(900,function(k){base(150*(1-k),500,280+80*k,1,280+80*k,62)});base(0,null,null,1,360,62);sv.insertAdjacentHTML('beforeend','<g transform="translate(500 360)"><ellipse rx="40" ry="24" fill="#9b6cff"/></g><text x="650" y="370" font-size="22" font-weight="800" fill="#1b2a3a" font-family="Readex Pro">الفجوة</text>');E.sfx.ok();busy=false;E.complete('vesicle')};
  $('#vOut',el).onclick=async function(){if(busy)return;busy=true;E.sfx.whoosh();await E.tw(900,function(k){base(0,null,null,1,400-120*k,50)});await E.tw(1000,function(k){base(-140*k,null,null,1,280-60*k,50*(1-k*.6))});for(var i=0;i<8;i++)sv.insertAdjacentHTML('beforeend','<circle cx="'+(470+Math.random()*60)+'" cy="'+(150+Math.random()*60)+'" r="8" fill="#ffc23d"/>');await E.tw(700,function(){});base(0);for(i=0;i<10;i++)sv.insertAdjacentHTML('beforeend','<circle cx="'+(380+Math.random()*240)+'" cy="'+(80+Math.random()*120)+'" r="8" fill="#ffc23d" stroke="#1b2a3a"/>');sv.insertAdjacentHTML('beforeend','<text x="500" y="230" text-anchor="middle" font-size="22" font-weight="800" fill="#1b2a3a" font-family="Readex Pro">انطلقت مكونات الفجوة إلى الخارج</text>');E.sfx.ok();busy=false};
  $('#vR',el).onclick=function(){if(!busy)base(0,500,120)};
  
  return {}}});

/* ========== ١١) م٦ ورشة الإنزيمات والأيض ========== */
S({id:'enzyme',name:'م٦ الأيض والإنزيمات',build:function(el){var used=0,busy=false;
  el.innerHTML='<div class="eyebrow">المحطة ٦ · الحصول على الطاقة واستخدامها ص ٩٤</div><h1 class="t" style="font-size:42px">ورشة الإنزيمات</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 55%;gap:8px;min-height:0"><div class="lcdrow"><div class="lcd"><small>مرات استعمال الإنزيم نفسه</small><b id="eU">٠</b></div><div class="lcd am"><small>حالة الإنزيم</small><b id="eS" style="font-size:22px">لم يتغير</b></div></div><svg class="labview" id="es" viewBox="0 0 900 440" style="flex:1;min-height:0;width:100%;height:100%"></svg><div class="qa" style="margin:0"><button class="btn" id="eGo">🔑 أدخل جزيئًا كبيرًا إلى الإنزيم</button></div></div>'+
   '<div class="col grow side" id="eq" style="gap:10px">'+card('الأيض','<p class="hint" style="margin:0 0 4px">🔗 الربط مع الدروس السابقة: درست في الصف الأول المتوسط أن الخلية تحتوي على الميتوكندريا.</p><p style="margin:0;font-size:18px">يحصل المخلوق الحي على الطاقة من غذائه بتحرير الطاقة الكيميائية المخزونة فيه. ويتم ذلك عبر سلسلة من التفاعلات الكيميائية (تفاعلات هدم وبناء) تحدث داخل الخلية تسمى <b class="gl">عمليات الأيض</b>، وتحتاج إلى <b class="gl">الإنزيمات</b>.</p>')+
   '<div class="card" style="padding:10px 14px"><div class="row" style="gap:10px;align-items:center">'+img('a_opener','width:130px;border-radius:12px')+'<p style="margin:0;font-size:18px;flex:1">تعمل الإنزيمات عمل <b class="gl">مفتاح العلب</b> نوعًا ما؛ فهي تُحدث تغييرًا، ولكنها لا تتغير، كما أنها تُستعمل أكثر من مرة.</p></div></div>'+
   card('وظائف الإنزيمات في الجسم','<ul style="margin:0;font-size:18px;line-height:1.7"><li>تساعد في إتمام التفاعلات الكيميائية وتسريعها وإنتاج الطاقة.</li><li>تكسير الجزيئات الكبيرة إلى صغيرة.</li><li>لكل تفاعل في الخلية إنزيمه الخاص الذي يؤدي إلى تنشيطه.</li></ul>')+'</div></div>';
  var sv=$('#es',el);
  function base(mx,split){sv.innerHTML='<rect width="900" height="440" fill="#fbfdf9"/><path d="M330 300 h240 v-60 h-50 l-20 -40 h-100 l-20 40 h-50z" fill="#1fae7a" stroke="#0e7a52" stroke-width="5"/><text x="450" y="340" text-anchor="middle" font-size="24" font-weight="800" fill="#0e7a52" font-family="Readex Pro">الإنزيم</text>'+(split?'<g><rect x="'+(mx-80)+'" y="150" width="70" height="44" rx="10" fill="#ffc23d" stroke="#1b2a3a" stroke-width="3"/><rect x="'+(mx+10)+'" y="150" width="70" height="44" rx="10" fill="#ff6b5b" stroke="#1b2a3a" stroke-width="3"/></g>':(mx!=null?'<g><rect x="'+(mx-70)+'" y="150" width="140" height="44" rx="10" fill="#ffc23d" stroke="#1b2a3a" stroke-width="3"/><rect x="'+(mx)+'" y="150" width="70" height="44" rx="10" fill="#ff6b5b" stroke="#1b2a3a" stroke-width="3"/><text x="'+mx+'" y="128" text-anchor="middle" font-size="20" font-weight="700" fill="#1b2a3a" font-family="Readex Pro">جزيء كبير</text></g>':''))}
  base(120);
  $('#eGo',el).onclick=async function(){if(busy)return;busy=true;E.sfx.pop();await E.tw(900,function(k){base(120+330*k)});E.sfx.tick();await E.tw(700,function(k){base(450,true);sv.querySelectorAll('rect')[0]&&0;var g=sv.lastChild;g.setAttribute('transform','translate(0 '+(-k*20)+')')});
    await E.tw(800,function(k){sv.innerHTML=sv.innerHTML;var g=sv.lastChild;g.setAttribute('transform','translate(0 '+(-20-k*60)+')');g.querySelectorAll('rect')[0].setAttribute('x',370-k*200);g.querySelectorAll('rect')[1].setAttribute('x',460+k*200)});
    sv.insertAdjacentHTML('beforeend','<text x="450" y="60" text-anchor="middle" font-size="24" font-weight="800" fill="#1b2a3a" font-family="Readex Pro">جزيئان صغيران… والإنزيم لم يتغير!</text>');used++;$('#eU',el).textContent=n(used);E.sfx.ok();busy=false;if(used>=2)E.complete('enzyme');setTimeout(function(){if(!busy)base(120)},1400)};
  var q=$('#eq',el);
  
  return {}}});

/* ========== ١٢) م٧ مصنع الغذاء: البناء الضوئي ========== */
function eqBuilder(el,o){/* o:{left:[k..], right:[k..], mid:'', terms:[[k,label]], id, goal} */
  var w=h('<div class="card" style="padding:12px 16px"><h3 style="margin:0 0 8px">'+o.title+'</h3><div class="eq"></div><div class="terms" style="margin-top:12px"></div><div class="qa" style="justify-content:center"><button class="btn" data-c>✓ تحقّق من المعادلة</button><button class="btn ghost" data-r>↺</button></div><div class="qf"></div></div>');el.appendChild(w);
  var eq=$('.eq',w),pool=$('.terms',w),slots=[];
  function sl(k){var s=h('<div class="slot" data-k="'+k+'"></div>');slots.push(s);return s}
  var r1=h('<div class="eq"></div>'),r2=h('<div class="eq"></div>');eq.style.flexDirection='column';eq.style.gap='4px';eq.appendChild(h('<small class="hint">المتفاعلات</small>'));eq.appendChild(r1);eq.appendChild(h('<span class="op" style="font-size:20px">⬇ '+(o.mid||'')+'</span>'));eq.appendChild(r2);eq.appendChild(h('<small class="hint">النواتج</small>'));
  o.left.forEach(function(k,i){if(i)r1.appendChild(h('<span class="op">+</span>'));r1.appendChild(sl(k))});
  o.right.forEach(function(k,i){if(i)r2.appendChild(h('<span class="op">+</span>'));r2.appendChild(sl(k))});
  var toks=E.shuffle(o.terms).map(function(t){var e=h('<span class="term" data-k="'+t[0]+'">'+t[1]+'</span>');pool.appendChild(e);return e});
  var F=E.slotFill({slots:slots,tokens:toks,pool:pool});
  $('[data-r]',w).onclick=function(){F.reset()};
  $('[data-c]',w).onclick=function(){if(!slots.every(function(s){return s.querySelector('.term')})){E.toast('أكملوا خانات المعادلة');return}var bad=F.grade();var f=$('.qf',w);f.classList.add('on');f.innerHTML='<div class="fbx '+(bad?'no':'ok')+'"><b>'+(bad?'✘ '+n(bad)+' خانات تحتاج مراجعة':'✔ معادلة صحيحة!')+'</b>'+(bad?'':' — '+o.ex)+'</div>'+(bad?'<div class="qa"><button class="btn gold" data-s>💡 اكشف المعادلة</button></div>':E.awardHTML(o.id,20));E.ST.res[o.id]=bad?0:1;E.save();bad?E.sfx.no():E.sfx.ok();var s=$('[data-s]',f);if(s)s.onclick=function(){F.show();f.innerHTML='<div class="fbx ok">'+o.ex+'</div>'}};
  return w}
S({id:'photo',name:'م٧ مصنع الغذاء',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٧ · البناء الضوئي ص ٩٥</div><h1 class="t" style="font-size:42px">مصنع الغذاء: البناء الضوئي</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1.1;gap:10px;min-height:0" id="pl"></div><div class="col grow side" id="pq" style="gap:10px"></div></div>';
  var L=$('#pl',el);
  E.sort(L,{id:'l1-ph-sort',goal:4,lvl:1,q:'درسنا سابقًا أن المخلوقات الحية تُصنّف تبعًا لطريقة حصولها على الغذاء. صنّف:',bins:['منتِجات','مستهلكات','محللات'],items:[{t:'النباتات',b:0,img:img('a_sprout','width:54px;height:40px;object-fit:cover;border-radius:6px')},{t:'الأبقار',b:1,img:img('a_cow','width:54px;height:40px;object-fit:cover;border-radius:6px')},{t:'الديدان',b:2,img:img('a_worms','width:54px;height:40px;object-fit:cover;border-radius:6px')}],ex:'النباتات منتِجات تصنع غذاءها، والأبقار مستهلكات، والديدان محللات.'});
  L.insertAdjacentHTML('beforeend',card('','<p class="big" style="margin:0">تستطيع النباتات وبقية <b class="gl">المنتِجات</b> تحويل الطاقة الضوئية إلى طاقة كيميائية خلال عملية تسمى <b class="gl">البناء الضوئي</b>، وتُستهلك الطاقة الضوئية خلال هذه العملية لصنع السكر باعتباره الغذاء.</p>'));
  eqBuilder(L,{title:'🧩 ركّب معادلة البناء الضوئي',left:['co2','h2o'],right:['glu','o2'],mid:'طاقة ضوئية تمتصها الكلوروفيل',terms:[['co2','ثاني أكسيد الكربون'],['h2o','ماء'],['glu','جلوكوز (سكر)'],['o2','أكسجين']],id:'l1-ph-eq',ex:'المتفاعلات: ثاني أكسيد الكربون والماء بوجود الطاقة الضوئية والكلوروفيل، والنواتج: الجلوكوز والأكسجين.'});
  var q=$('#pq',el);
  q.insertAdjacentHTML('beforeend','<div class="card" style="padding:10px 14px"><h3 style="margin:0 0 6px">🌳 تخزين الكربوهيدرات</h3><div class="row" style="gap:10px;align-items:center">'+img('a_tree','width:110px;border-radius:12px')+'<p style="margin:0;font-size:17px;flex:1">تصنع النباتات أكثر من حاجتها من السكر؛ لذا تخزّن السكر الزائد على هيئة <b class="gl">نشا</b> أو مواد كربوهيدراتية أخرى تستعملها للنمو والاستمرار في الحياة والتكاثر.</p></div><p style="margin:8px 0 0;font-size:18px"><b>ما أهمية البناء الضوئي مصدرًا للغذاء؟</b></p><p class="reveal explain" style="margin:4px 0 0">يُعدّ الغذاء الناتج منه المصدر الرئيس للغذاء لجميع المخلوقات الحية؛ إما <b>بشكل مباشر</b> بالتغذي على المواد الناتجة منه، أو <b>بشكل غير مباشر</b> بالتغذي على مخلوقات تغذّت عليها.</p></div>');
  
  
  return {enter:function(){E.complete('photo')}}}});

/* ========== ١٣) م٨ محطة الطاقة: التنفس الخلوي والتخمر ========== */
S({id:'resp',name:'م٨ التنفس الخلوي والتخمر',build:function(el){var ox=1,lac=0,run=false,raf=0,bal=0,yst=false;
  el.innerHTML='<div class="eyebrow">المحطة ٨ · تحرير الطاقة المختزنة في الغذاء ص ٩٦–٩٧</div><h1 class="t" style="font-size:42px">محطة الطاقة</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1.1;gap:10px;min-height:0" id="rl"></div><div class="col grow side" id="rq" style="gap:10px"></div></div>';
  var L=$('#rl',el);
  L.insertAdjacentHTML('beforeend',card('🔋 التنفس الخلوي','<p style="margin:0;font-size:18px">تحصل خلايا المخلوقات الحية على الطاقة من خلال <b class="gl">التنفس الخلوي</b>؛ حيث تتحلل جزيئات الغذاء المعقدة إلى جزيئات أبسط فتتحرر الطاقة المخزنة فيها. ويتم ذلك داخل <b class="gl">الميتوكندريا</b>، حيث يُستهلك الأكسجين، وينتج ثاني أكسيد الكربون والماء وكميات كبيرة من الطاقة. ويحدث في خلايا المنتِجات والمستهلكات.</p><p class="reveal explain" style="margin:6px 0 0">ماذا يجب أن يحدث لجزيئات الطعام قبل التنفس الخلوي؟ يجب أن تتحلل (تتكسر) إلى مواد أبسط، وهي بحاجة إلى <b>الإنزيمات</b>.</p>'));
  eqBuilder(L,{title:'🧩 ركّب معادلة التنفس الخلوي',left:['glu','o2'],right:['co2','h2o','en'],mid:'في الميتوكندريا',terms:[['glu','جلوكوز (سكر)'],['o2','أكسجين'],['co2','ثاني أكسيد الكربون'],['h2o','ماء'],['en','طاقة']],id:'l1-rs-eq',ex:'المتفاعلات: الجلوكوز والأكسجين، والنواتج: ثاني أكسيد الكربون والماء والطاقة.'});
  L.insertAdjacentHTML('beforeend','<div class="card" style="padding:12px 16px"><h3 style="margin:0 0 6px">🏃 مختبر العضلة: أكسجين كافٍ أم لا؟</h3><div class="row" style="gap:12px;align-items:center"><canvas id="mc" width="520" height="260" class="sim" style="width:340px;height:170px"></canvas><div class="col" style="gap:6px;flex:1"><div class="chips"><button class="chip" data-o="1" aria-pressed="true">🫁 أكسجين كافٍ</button><button class="chip" data-o="0">😮‍💨 جهد كبير: أكسجين غير كافٍ</button></div><p id="mT" style="margin:0;font-size:18px"></p></div></div></div>');
  var mc=$('#mc',el),x=mc.getContext('2d');
  function dm(){x.clearRect(0,0,520,260);x.fillStyle='#fff';x.fillRect(0,0,520,260);x.fillStyle='#ff9a8a';x.beginPath();x.ellipse(200,130,170,80,0,0,7);x.fill();x.strokeStyle='#d9453b';x.lineWidth=5;x.stroke();for(var i=0;i<6;i++){x.strokeStyle='rgba(217,69,59,.4)';x.beginPath();x.moveTo(50+i*50,80);x.lineTo(60+i*50,180);x.stroke()}
    x.fillStyle='#e9ecef';rr(x,410,30,60,200,14);x.fill();x.fillStyle=lac>.6?'#e2483d':'#ffb020';rr(x,410,230-200*lac,60,200*lac,14);x.fill();T(x,'حمض اللاكتيك',440,250,15);if(ox)T(x,'O₂ ✓',200,130,34,'#0e7a52');else T(x,lac>.6?'ألم وشدّ عضلي!':'تخمّر…',200,130,28,'#b42318')}
  function loop(){if(!run)return;raf=requestAnimationFrame(loop);if(!E.paused){lac=Math.max(0,Math.min(1,lac+(ox?-.004:.005)));if(yst)bal=Math.min(1,bal+.004)}dm();yb()}
  $$('[data-o]',el).forEach(function(b){b.onclick=function(){ox=+b.dataset.o;$$('[data-o]',el).forEach(function(z){z.setAttribute('aria-pressed',z===b)});$('#mT',el).innerHTML=ox?'تحصل الخلايا العضلية على الطاقة بالتنفس الخلوي.':'عندما لا تصل كميات كافية من الأكسجين إلى الخلايا العضلية تلجأ إلى <b class="gl">التخمر</b>، فيتراكم <b>حمض اللاكتيك</b> مسببًا الألم أو الشدّ العضلي.';E.sfx.pop();if(!ox)E.complete('resp')}});
  var q=$('#rq',el);
  q.insertAdjacentHTML('beforeend',card('🧪 التخمر','<p style="margin:0;font-size:18px">يتم من خلاله الحصول على الطاقة المخزنة في جزيئات السكر دون أكسجين، ويحدث في <b class="gl">السيتوبلازم</b>. واعتمادًا على نوع الخلية تكون الفضلات الناتجة إما <b>حمض اللاكتيك</b>، أو <b>الكحول وثاني أكسيد الكربون</b>.</p>'));
  q.insertAdjacentHTML('beforeend','<div class="card" style="padding:12px 16px"><h3 style="margin:0 0 6px">🍞 تجربة الخميرة والبالون</h3><div class="row" style="gap:10px;align-items:center"><svg id="ys" viewBox="0 0 220 260" style="width:170px;height:200px"></svg><div class="col" style="gap:6px;flex:1"><button class="btn gold" id="yGo">🥄 أضف الخميرة إلى الماء الدافئ والسكر</button><p style="margin:0;font-size:16px">الخميرة مخلوق حي وحيد الخلية يستعمل التخمر لتحليل السكر، فينتج الكحول وثاني أكسيد الكربون. ويسبّب ثاني أكسيد الكربون انتفاخ العجين قبل خبزه، أما الكحول فيتطاير في أثناء الخبز.</p></div></div><div class="row" style="gap:8px;margin-top:6px">'+img('a_bread','height:60px;border-radius:8px')+img('a_yogurt','height:60px;border-radius:8px')+'<p style="margin:0;font-size:15px;flex:1">وبعض البكتيريا تنتج حمض اللاكتيك بالتخمر، وهو ما نستفيد منه في تصنيع الزبادي وبعض أنواع الجبن.</p></div></div>');
  function yb(){var r=10+bal*60;$('#ys',el).innerHTML='<rect x="70" y="140" width="80" height="110" rx="14" fill="rgba(205,232,242,.8)" stroke="#4f6f7c" stroke-width="4"/><rect x="74" y="190" width="72" height="56" rx="10" fill="#f3d9a4"/>'+(yst?[0,1,2,3,4].map(function(i){return '<circle cx="'+(85+i*12)+'" cy="'+(230-((performance.now()/20+i*17)%40))+'" r="3" fill="#fff" stroke="#4f6f7c"/>'}).join(''):'')+'<rect x="96" y="118" width="28" height="24" fill="#4f6f7c"/><ellipse cx="110" cy="'+(118-r)+'" rx="'+(r*.9)+'" ry="'+r+'" fill="#ff6b5b" stroke="#b42318" stroke-width="3"/><text x="110" y="'+(118-r+6)+'" text-anchor="middle" font-size="'+(10+bal*12)+'" font-weight="800" fill="#fff" font-family="Readex Pro">CO₂</text>'}
  $('#yGo',el).onclick=function(){yst=true;E.sfx.pop()};
  
  
  
  
  return {enter:function(){$('[data-o="1"]',el).click();run=true;loop()},leave:function(){run=false;cancelAnimationFrame(raf)}}}});

/* ========== ١٤) م٩ حلقة التوازن ========== */
S({id:'cycle',name:'م٩ العلاقة بين العمليتين',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٩ · العلاقات المتبادلة بين العمليات ص ٩٧</div><h1 class="t" style="font-size:42px">عمليتان متعاكستان تقريبًا</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 58%;gap:8px;min-height:0"><div class="card" style="padding:12px 16px;flex:1;display:flex;flex-direction:column"><div class="row" style="flex:1;align-items:center;gap:14px"><div class="pcard" style="flex:1"><span style="font-size:70px">🌿</span><b style="font-family:var(--disp);font-size:26px;color:#3e9a3e">البناء الضوئي</b><small>في البلاستيدات الخضراء</small></div>'+
   '<div class="col" style="gap:14px;flex:1.2"><div><span class="hint">ينتج في البناء الضوئي ويُستعمل في التنفس ⟵</span><div class="eq" style="justify-content:flex-start"><div class="slot" data-k="o2"></div><div class="slot" data-k="glu"></div></div></div><div><span class="hint">⟶ ينتج في التنفس ويُستعمل في البناء الضوئي</span><div class="eq" style="justify-content:flex-start"><div class="slot" data-k="co2"></div><div class="slot" data-k="h2o"></div></div></div></div>'+
   '<div class="pcard" style="flex:1"><span style="font-size:70px">🔋</span><b style="font-family:var(--disp);font-size:26px;color:#c25200">التنفس الخلوي</b><small>في الميتوكندريا</small></div></div><div class="terms" id="cp" style="margin-top:8px"></div><div class="qa" style="justify-content:center"><button class="btn" id="cC">✓ تحقّق</button></div><div id="cF"></div></div></div>'+
   '<div class="col grow side" style="gap:10px">'+card('','<p style="margin:0;font-size:19px">لا يمكن حدوث التفاعلات الكيميائية لكل من عمليتي التنفس الخلوي والبناء الضوئي إحداهما بمعزل عن الأخرى. وتقوم المخلوقات الحية جميعها بالتنفس أو التخمر لتحرير الطاقة المختزنة في الغذاء.</p>')+'<div class="card reveal" style="padding:10px 14px"><p style="margin:0;font-size:19px">خلال البناء الضوئي ينتج <b>الأكسجين والسكر</b> اللذان يُستعملان في التنفس، وفي التنفس الخلوي ينتج <b>ثاني أكسيد الكربون والماء</b> بوصفهما فضلات، وهما يُستعملان في البناء الضوئي. واستمرار الحياة على الأرض من أهم مقوماته التوازن بين هاتين العمليتين.</p></div></div></div>';
  var slots=$$('.slot',el),pool=$('#cp',el),toks=E.shuffle([['o2','أكسجين'],['glu','سكر (جلوكوز)'],['co2','ثاني أكسيد الكربون'],['h2o','ماء']]).map(function(t){var e=h('<span class="term" data-k="'+t[0]+'">'+t[1]+'</span>');pool.appendChild(e);return e});
  var F=E.slotFill({slots:slots,tokens:toks,pool:pool});
  $('#cC',el).onclick=function(){if(!slots.every(function(s){return s.querySelector('.term')})){E.toast('ضعوا البطاقات الأربع');return}var g=slots.map(function(s){return s.querySelector('.term').dataset.k}),ok=['o2','glu'].every(function(k){return g.slice(0,2).indexOf(k)>=0})&&['co2','h2o'].every(function(k){return g.slice(2).indexOf(k)>=0});
    slots.forEach(function(s,i){s.classList.remove('ok','no');s.classList.add(ok||((i<2)===(['o2','glu'].indexOf(g[i])>=0))?'ok':'no')});E.ST.res['l1-cy']=ok?1:0;E.save();$('#cF',el).innerHTML='<div class="fbx '+(ok?'ok':'no')+'">'+(ok?'✔ صحيح! نواتج كل عملية تستهلكها الأخرى.':'✘ راجعوا: ماذا ينتج النبات في البناء الضوئي؟')+'</div>';ok?(E.sfx.ok(),E.complete('cycle')):E.sfx.no()};
  return {}}});

/* ========== ١٥) م١٠ عجلة المدينة ========== */
var BANK=[{c:0,q:'يمتاز الغشاء البلازمي بأنه:',o:['اختياري النفاذية','يمنع كل المواد','يسمح بمرور كل المواد','غير موجود في الخلايا الحيوانية'],a:0},
 {c:0,q:'من أنواع النقل السلبي:',o:['الانتشار المدعوم','البلعمة','النقل النشط','الإخراج الخلوي'],a:0},
 {c:1,q:'تتوقف عملية الانتشار عند الوصول إلى:',o:['الاتزان','التخمر','البلعمة','الأيض'],a:0},
 {c:1,q:'وُضعت خلية حيوانية في ماء عذب لفترة طويلة. ماذا يحدث لها؟',o:['تنكمش','تنتفخ وقد تنفجر','لا تتغير','تتحول إلى خلية نباتية'],a:1},
 {c:2,q:'تنتقل الأملاح إلى الشعيرات الجذرية رغم أن تركيزها في النبات أعلى بعملية:',o:['الانتشار','النقل النشط','الخاصية الأسموزية','البلعمة'],a:1},
 {c:2,q:'تفرز المعدة إفرازاتها المساعدة على الهضم بعملية:',o:['الإخراج الخلوي','البلعمة','الانتشار','التخمر'],a:0},
 {c:3,q:'ينتج النبات سكر الجلوكوز ويطلق الأكسجين خلال عملية:',o:['التخمر','البناء الضوئي','التنفس الخلوي','عمليات الأيض'],a:1},
 {c:3,q:'تخزّن النباتات السكر الزائد على هيئة:',o:['نشا','حمض اللاكتيك','كحول','أكسجين'],a:0},
 {c:4,q:'ما العملية التي تحدث في الميتوكندريا؟',o:['التخمر','البناء الضوئي','التنفس الخلوي','البلعمة'],a:2},
 {c:4,q:'من نواتج التنفس الخلوي:',o:['ثاني أكسيد الكربون والماء','الجلوكوز والأكسجين','الكلوروفيل','النشا'],a:0},
 {c:5,q:'تنتج الخميرة خلال التخمر:',o:['الكحول وثاني أكسيد الكربون','الأكسجين','النشا','الكلوروفيل'],a:0},
 {c:5,q:'تحدث عملية التخمر في:',o:['السيتوبلازم','الميتوكندريا','البلاستيدات الخضراء','النواة'],a:0}];
S({id:'wheel',name:'م عجلة المدينة (إثرائي)',build:function(el){E.wheelGame(el,BANK,'l1-wh');return {}}});

/* ========== ١٦) ماذا تعلمنا؟ ========== */
S({id:'review',name:'م١١ ماذا تعلمنا؟',build:function(el){return E.review(el,{goals:[
  {t:GO[0],how:'جرّبنا بوابة الغشاء: جزيئات تعبر وأخرى تُمنع',st:['gate','eval1'],q:['l1-gt-q1']},
  {t:GO[1],how:'شاهدنا الانتشار حتى الاتزان، ورحلة الماء في الخلايا',st:['diff','osmo'],q:['l1-df-q1','l1-df-q2','l1-os-q1']},
  {t:GO[2],how:'قارنّا الانتشار المدعوم بالنقل النشط، والبلعمة والإخراج',st:['active','vesicle'],q:['l1-gt-q2','l1-ac-q1','l1-vs-q1']},
  {t:GO[3],how:'صنّفنا المنتِجات والمستهلكات والمحللات',st:['photo'],q:['l1-ph-sort']},
  {t:GO[4],how:'ركّبنا معادلتي البناء الضوئي والتنفس، وربطنا بينهما',st:['enzyme','photo','resp','cycle','eval2'],q:['l1-ph-eq','l1-rs-eq','l1-cy','l1-ph-q1','l1-rs-q1','l1-q27','l1-q29']},
  {t:GO[5],how:'جرّبنا العضلة دون أكسجين، وبالون الخميرة',st:['resp'],q:['l1-rs-q2','l1-rs-q3','l1-rs-q4']}],
  exit:[{id:'l1-exit1',goal:3,lvl:1,q:'الفرق بين النقل النشط والنقل السلبي أن النقل النشط:',o:['يحتاج إلى طاقة','لا يحتاج إلى طاقة','يحدث في النبات فقط','ينقل الماء فقط'],a:0,cols:2,ex:'النقل النشط يحتاج إلى طاقة، والسلبي لا يحتاج.'},
        {t:'tf',id:'l1-exit2',goal:5,lvl:1,q:'نواتج البناء الضوئي هي ما يُستهلك في التنفس الخلوي.',v:true,ex:'الأكسجين والسكر الناتجان من البناء الضوئي يُستعملان في التنفس.'},
        {id:'l1-exit3',goal:6,lvl:2,q:'يسبب ثاني أكسيد الكربون الناتج من تخمر الخميرة:',o:['انتفاخ العجين','تكوّن الزبادي','ألم العضلات','لون النبات الأخضر'],a:0,cols:2,ex:'ثاني أكسيد الكربون ينفخ العجين قبل خبزه.'}],
  extra:function(ex){ex.insertAdjacentHTML('beforeend',E.card('📝 الواجب · ص ٩٨','<p style="margin:0;font-size:18px">حلّ أسئلة مراجعة الدرس في الكتاب ص ٩٨، والتسليم يوم الخميس.</p>'))}})}});


/* ========== محطات مطابقة لشرائح العرض ========== */
var D=E.deck;
S({id:'vocab',name:'المفردات الجديدة',build:function(el){return D.vocab(el,{sid:'vocab',review:card('🧠 مراجعة المفردات','<div style="font-size:19px;line-height:1.75"><b class="gl">السيتوبلازم:</b> <span class="reveal">خليط هلامي دائم الحركة يوجد داخل الغشاء البلازمي، وفيه المادة الوراثية، وتحدث فيه معظم التفاعلات الحيوية.</span><br><b class="gl">الميتوكندريا:</b> <span class="reveal">عضية خلوية تقوم بتحليل الليبيدات (الدهون) والكربوهيدرات؛ لإنتاج الطاقة.</span><br><b class="gl">البناء الضوئي:</b> <span class="reveal">تُستهلك الطاقة الضوئية خلال هذه العملية لصنع السكر باعتباره الغذاء.</span></div>'),eyebrow:'أنشطة في الخلية · ص ٨٨',items:[['النقل السلبي','نقل المواد عبر الغشاء البلازمي دون الحاجة إلى طاقة.'],['الانتشار','انتقال الجزيئات من الأماكن ذات التركيز المرتفع إلى الأماكن ذات التركيز المنخفض.'],['الاتزان','الحالة التي يصبح فيها العدد النسبي للجزيئات متساويًا في المنطقتين فيتوقف الانتشار.'],['الخاصية الأسموزية','انتشار جزيئات الماء عبر الغشاء الخلوي.'],['الانتشار المدعوم','انتشار الجزيئات الكبيرة (مثل السكر) بمساعدة البروتينات الناقلة.'],['النقل النشط','نقل مادة عبر غشاء الخلية بالبروتينات الناقلة ويحتاج إلى طاقة.'],['البلعمة','إدخال المواد إلى الخلية بإحاطتها بالغشاء البلازمي.'],['الإخراج الخلوي','اندماج الفجوة بالغشاء لتنطلق مكوّناتها إلى خارج الخلية.'],['عمليات الأيض','مجموع التفاعلات الكيميائية (هدم وبناء) التي تحدث في المخلوق الحي.'],['التنفس الخلوي','تحليل جزيئات الغذاء في الميتوكندريا لتحرير الطاقة المخزنة فيها.'],['التخمر','الحصول على الطاقة من السكر دون أكسجين، ويحدث في السيتوبلازم.']]})}});
S({id:'eval1',name:'م تقويم ١',build:function(el){return D.evalStation(el,{sid:'eval1',eyebrow:'المحطة · تقويم: السؤال رقم ١',title:'تقويم ١: نقل المواد عبر الغشاء',qs:[
 {id:'l1-os-q1',goal:2,lvl:1,kind:'السؤال ١ · فقرة ١',q:'انتشار الماء خلال غشاء الخلية:',o:['البلعمة','الخاصية الأسموزية','الإخراج الخلوي','النقل النشط'],a:1,ex:'الخاصية الأسموزية هي انتشار الماء عبر الغشاء.'},
 {id:'l1-gt-q2',goal:3,lvl:1,kind:'السؤال ١ · فقرة ٢',q:'انتقال المواد عبر غشاء الخلية دون الحاجة إلى طاقة:',o:['البلعمة','النقل النشط','الإخراج الخلوي','النقل السلبي'],a:3,ex:'النقل السلبي لا يحتاج إلى طاقة.'},
 {id:'l1-vs-q1',goal:3,lvl:1,kind:'السؤال ١ · فقرة ٣',q:'تُدخِل بعض الخلايا (مثل خلايا الدم البيضاء) البكتيريا إلى داخلها بعملية:',o:['البلعمة','الانتشار','الخاصية الأسموزية','النقل السلبي'],a:0,ex:'البلعمة: إدخال الأجسام الكبيرة بإحاطتها بالغشاء البلازمي.'},
 {id:'l1-gt-q1',goal:1,lvl:1,kind:'السؤال ١ · فقرة ٤',q:'وظيفته السماح لبعض المواد بالنفاذ من الخلية وإليها، بينما يمنع مواد أخرى من المرور:',o:['النواة','السيتوبلازم','الغشاء البلازمي','الجدار الخلوي'],a:2,ex:'الغشاء البلازمي اختياري النفاذية.'},
 {id:'l1-df-q1',goal:2,lvl:1,kind:'السؤال ١ · فقرة ٥',q:'انتقال الجزيئات من مناطق ذات التركيز المرتفع إلى المناطق ذات التركيز المنخفض:',o:['الضغط','الانتشار','الاتزان','التخمر'],a:1,ex:'هذا تعريف الانتشار.'},
 {id:'l1-ac-q1',goal:3,lvl:1,kind:'السؤال ١ · فقرة ٦',q:'يسمى انتقال الجزيئات عبر الغشاء الخلوي الذي يحتاج إلى طاقة:',o:['الانتشار','النقل السلبي','النقل النشط','الخاصية الأسموزية'],a:2,ex:'النقل النشط يحتاج إلى طاقة.'},
 {id:'l1-df-q2',goal:2,lvl:2,kind:'السؤال ١ · فقرة ٧',q:'ما المفردة التي تفسر انتقال الجزيئات والوصول إلى حالة من التوازن مع الوسط المحيط؟',o:['الاتزان','التأكسد','الانتقال','الانتشار'],a:0,ex:'الاتزان: يصبح العدد النسبي للجزيئات متساويًا فيتوقف الانتشار.'}]})}});
S({id:'eval2',name:'م تقويم ٢',build:function(el){return D.evalStation(el,{sid:'eval2',eyebrow:'المحطة · تقويم: السؤال رقم ٢',title:'تقويم ٢: الحصول على الطاقة واستخدامها',qs:[
 {id:'l1-ph-q1',goal:5,lvl:1,kind:'السؤال ٢ · فقرة ١',q:'عملية تستخدمها المنتِجات لتحويل الطاقة الضوئية إلى طاقة كيميائية:',o:['التخمر','التنفس الخلوي','البناء الضوئي','الأيض'],a:2,ex:'البناء الضوئي.'},
 {id:'l1-rs-q1',goal:5,lvl:1,kind:'السؤال ٢ · فقرة ٢',q:'مكان حدوث عملية التنفس الخلوي داخل الخلايا:',o:['الميتوكندريا','السيتوبلازم','النواة','الفجوة'],a:0,ex:'الميتوكندريا.'},
 {id:'l1-en-q1',goal:5,lvl:1,kind:'السؤال ٢ · فقرة ٣',q:'مجموع التفاعلات الكيميائية التي تحدث في أي مخلوق حي:',o:['التخمر','التنفس الخلوي','البناء الضوئي','عمليات الأيض'],a:3,ex:'هي عمليات الأيض.'},
 {id:'l1-rs-q2',goal:6,lvl:1,kind:'السؤال ٢ · فقرة ٤',q:'عملية تحدث في الخلايا لإنتاج الطاقة في حالة عدم توافر كميات كافية من الأكسجين:',o:['التنفس الخلوي','عمليات الأيض','التخمر','البناء الضوئي'],a:2,ex:'التخمر.'},
 {id:'l1-en-q2',goal:5,lvl:1,kind:'السؤال ٢ · فقرة ٥',q:'بروتينات تساعد على تنظيم التفاعلات الكيميائية التي تحدث في الخلايا:',o:['الإنزيمات','الكربوهيدرات','المحللات','المستهلكات'],a:0,ex:'الإنزيمات.'},
 {id:'l1-rs-q3',goal:6,lvl:1,kind:'السؤال ٢ · فقرة ٦',q:'تنتج الطاقة عن عملية التخمر دون استخدام:',o:['الأكسجين','الجلوكوز','الكلوروفيل','ثاني أكسيد الكربون'],a:0,ex:'التخمر لا يستخدم الأكسجين.'},
 {id:'l1-q27',goal:5,lvl:1,kind:'السؤال ٢ · فقرة ٧',q:'ما العملية التي تحدث في الميتوكندريا؟',o:['التخمر','البناء الضوئي','التنفس الخلوي','عمليات الأيض'],a:2,ex:'التنفس الخلوي يحدث داخل الميتوكندريا.'},
 {id:'l1-rs-q4',goal:6,lvl:2,kind:'السؤال ٢ · فقرة ٨',q:'عند إجهاد العضلات تعاني من ألم بسبب تراكم:',o:['الجلوكوز','الطاقة','حمض اللاكتيك','ثاني أكسيد الكربون'],a:2,ex:'تراكم حمض اللاكتيك في العضلات.'},
 {id:'l1-q29',goal:5,lvl:1,kind:'السؤال ٢ · فقرة ٩',q:'ينتج النبات سكر الجلوكوز خلال عملية …………، ويطلق الأكسجين:',o:['التخمر','البناء الضوئي','التنفس الخلوي','عمليات الأيض'],a:1,ex:'البناء الضوئي.'},
 {id:'l1-ph-q2',goal:5,lvl:1,kind:'السؤال ٢ · فقرة ١٠',q:'تسمى الصبغة النباتية الخضراء التي تمتص الطاقة الضوئية من الشمس:',o:['الجلوكوز','البروتينات','الإنزيمات','الكلوروفيل'],a:3,ex:'الكلوروفيل.'}]})}});
S({id:'sum',name:'م الخلاصة',build:function(el){return D.summary(el,{sid:'sum',eyebrow:'المحطة · الخلاصة ص ٩٨',sec:[
 ['النقل السلبي',['تحصل الخلايا على المواد الضرورية، وتتخلص من الفضلات عن طريق غشائها البلازمي.','الانتشار والخاصية الأسموزية والانتشار المدعوم أمثلة على النقل السلبي.']],
 ['النقل النشط',['تؤدي البروتينات الناقلة دورًا مهمًّا في عملية النقل النشط.','تستعمل البروتينات الناقلة أكثر من مرة.']],
 ['البلعمة والإخراج الخلوي',['تتكوّن الفجوات عندما تدخل المواد إلى الخلية خلال عملية البلعمة.','تخرج محتويات الفجوات خارج الخلية خلال عملية الإخراج الخلوي.']],
 ['الحصول على الطاقة واستخدامها',['عمليات الأيض هي جميع التفاعلات الكيميائية داخل جسم المخلوق الحي.','تتحول الطاقة الضوئية إلى طاقة كيميائية خلال عملية البناء الضوئي.','يمتص الكلوروفيل وبعض الأصباغ الأخرى ضوء الشمس.','تحصل المستهلكات على طاقتها بأكلها المنتِجات ومستهلكات أخرى.','تستطيع الخلايا الحية استعمال الأكسجين لتحليل الجلوكوز والحصول على الطاقة.','تحرر عملية التخمر الطاقة في غياب الأكسجين.']]]})}});
D.order(L1,['intro','wonder','goals','vocab','prior','map','gate','diff','osmo','active','vesicle','eval1','enzyme','photo','resp','cycle','eval2','sum','wheel','review'],['intro','wonder','goals','prior','vocab','map']);
E.lesson('l1',L1);
})();
