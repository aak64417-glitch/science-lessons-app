/* الدرس الثاني: انقسام الخلية وتكاثرها (ص ٩٩–١١١) — «مدينة الخلية» */
(function(){
"use strict";
var E=window.E,$=E.$,$$=E.$$,n=E.n,h=E.h,img=E.img,card=E.card;
function ic(e){return '<span style="font-size:46px;line-height:1">'+e+'</span>'}
var GO=['أن يوضّح الطالب أهمية الانقسام المتساوي.','أن يتتبّع الطالب أطوار الانقسام المتساوي.','أن يقارن الطالب بين الانقسام المتساوي في الخلايا النباتية والخلايا الحيوانية.','أن يعدّد الطالب مثالين على التكاثر اللاجنسي.','أن يصف الطالب أطوار الانقسام المنصف، وكيفية تكوين الخلايا الجنسية.','أن يوضّح الطالب أهمية الانقسام المنصف في التكاثر الجنسي.','أن يوضّح الطالب كيف يحدث الإخصاب في التكاثر الجنسي.'];
var L2={title:'انقسام الخلية وتكاثرها',blurb:'دورة الخلية، والكروموسومات، وأطوار الانقسام المتساوي، والتكاثر اللاجنسي والجنسي، والانقسام المنصف.',stations:[]};
function S(o){L2.stations.push(o)}
var MP=['التمهيدي','الاستوائي','الانفصالي','النهائي'];

/* ========== ١) المقدمة ========== */
S({id:'intro',name:'المقدمة التشويقية',full:true,build:function(el){var THREE=window.THREE,cells=[],helix,chs=[];
  function cell(){var g=new THREE.Group(),m=new THREE.Mesh(new THREE.SphereGeometry(1.6,48,32),new THREE.MeshStandardMaterial({color:0xffb3c6,transparent:true,opacity:.45,roughness:.35,depthWrite:false})),nu=new THREE.Mesh(new THREE.SphereGeometry(.6,32,24),E.mat(0x9b6cff,{e:0x3a1a80,ei:.3}));g.add(m);g.add(nu);g.userData.nu=nu;return g}
  return E.intro(el,{dur:24,z:12,caps:[{t:'داخل كل نواة… شريط من المادة الوراثية DNA',at:1,end:6,sub:1},{t:'يُنسخ، ثم يلتفّ ويتكثّف على هيئة كروموسومات',at:6,end:11,sub:1},{t:'تنقسم الخلية… فتصبح خليتين، ثم أربعًا',at:11,end:17,sub:1},{t:'وهكذا ينمو جسمك، ويتكاثر كل مخلوق حي',at:17,end:20.5,sub:1},{t:'كيف تنقسم الخلية؟<br><span class="gl">وكيف تتكاثر المخلوقات الحية؟</span>',at:20.8}],
   build:function(T){T.sc.add(new THREE.AmbientLight(0xffffff,.6));helix=new THREE.Group();for(var i=0;i<60;i++){var a=i*.42,y=(i-30)*.14;[0,Math.PI].forEach(function(o,s){var b=new THREE.Mesh(new THREE.SphereGeometry(.13,12,10),E.mat(s?0x2f8cff:0xff6b5b,{}));b.position.set(Math.cos(a+o)*.9,y,Math.sin(a+o)*.9);helix.add(b)});if(i%2===0){var r=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1.8,6),E.mat(0xffc23d,{}));r.position.set(0,y,0);r.rotation.z=Math.PI/2;r.rotation.y=-a;helix.add(r)}}helix.scale.setScalar(.6);T.sc.add(helix);
     for(i=0;i<4;i++){var c=cell();c.visible=false;T.sc.add(c);cells.push(c)}
     for(i=0;i<4;i++){var g=new THREE.Group();[-1,1].forEach(function(s){var arm=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,2,16),E.mat(i%2?0x2f8cff:0xff6b5b,{e:0x111111,ei:.1}));arm.rotation.z=s*.32;g.add(arm)});var cm=new THREE.Mesh(new THREE.SphereGeometry(.2,16,12),E.mat(0x1b2a3a,{}));g.add(cm);g.position.set((i-1.5)*1.3,0,0);g.visible=false;T.sc.add(g);chs.push(g)}},
   tick:function(T,t){var e=function(a,b,x){x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
     helix.rotation.y=t*.8;var hs=(1-e(6,8,t))*.6;helix.scale.setScalar(Math.max(.001,hs));helix.visible=hs>.01;
     var cs=e(6.5,8.5,t)*(1-e(10.5,11.5,t));chs.forEach(function(g,i){g.visible=cs>.01;g.scale.setScalar(Math.max(.001,cs));g.rotation.y=t*.6+i;g.position.y=Math.sin(t*2+i)*.2});
     var d1=e(11,13.5,t),d2=e(14,16.5,t),show=t>10.8;cells.forEach(function(c,i){var sx=i%2?1:-1;c.visible=show&&(i<2||d2>.01);c.position.set(sx*d1*1.8,(i<2?1:-1)*d2*1.7,0);c.scale.setScalar(Math.max(.001,i<2?1-d1*.2:d2*.8));c.rotation.y=t*.3});
     T.cam.position.set(Math.sin(t*.12)*12,1+Math.sin(t*.2),Math.cos(t*.12)*12);T.cam.lookAt(0,0,0)}})}});

/* ========== ٢) ماذا ستتعلم؟ ========== */
S({id:'wonder',name:'ماذا ستتعلم اليوم؟',build:function(el){return E.wonder(el,{eyebrow:'الدرس الثاني · انقسام الخلية وتكاثرها',items:[
  {ic:ic('📈'),t:'لماذا تنقسم الخلايا؟'},{ic:ic('🧬'),t:'ما الكروموسوم؟ وكيف يتضاعف؟'},{ic:ic('🎞'),t:'ما أطوار الانقسام المتساوي؟'},{ic:ic('🍓'),t:'كيف تتكاثر الفراولة والهيدرا دون شريك؟'},{ic:ic('✂'),t:'لماذا تحمل الخلايا الجنسية نصف عدد الكروموسومات؟'}]})}});

/* ========== ٣) الأهداف ========== */
S({id:'goals',kind:'goals',name:'أهداف الدرس',build:function(el){return E.goalsScreen(el,{eyebrow:'انقسام الخلية وتكاثرها · ص ٩٩',idea:'يعتمد نمو المخلوقات الحية على الانقسام الخلوي، وتعود أهمية الانقسام المنصف والتكاثر الجنسي إلى عدم وجود شخصين متشابهين تمامًا.',goals:[{ic:ic('📈'),t:GO[0]},{ic:ic('🎞'),t:GO[1]},{ic:ic('🌿'),t:GO[2]},{ic:ic('🍓'),t:GO[3]},{ic:ic('✂'),t:GO[4]},{ic:ic('👨‍👩‍👧'),t:GO[5]},{ic:ic('🥚'),t:GO[6]}]})}});

/* ========== ٤) التهيئة ========== */
S({id:'prior',name:'التهيئة',build:function(el){el.innerHTML='<div class="eyebrow">تهيئة · ص ٩٩</div><h1 class="t">من خلية واحدة… إلى جسم كامل</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1;gap:10px;min-height:0"><div class="card pcard" style="padding:12px">'+img('g_grow','height:250px;width:100%;object-fit:cover;border-radius:16px')+'<p class="big" style="margin:0">بدأتَ حياتك خلية واحدة… واليوم يتكون جسمك من أعداد هائلة من الخلايا. من أين جاءت؟</p></div>'+
   '</div><div class="col grow side" id="pp"></div></div>';
  E.poll($('#pp',el),{compact:1,q:'كيف يكبر جسمك من طفل إلى بالغ؟',o:['تكبر كل خلية في جسمك دون أن يزيد عددها','يزداد عدد الخلايا بانقسامها','تأتي الخلايا من الغذاء مباشرة']});
  E.poll($('#pp',el),{compact:1,q:'لماذا لا يتشابه الإخوة تمامًا مع أنهم من الأبوين نفسيهما؟',o:['بسبب الغذاء فقط','لأن كل فرد يرث مزيجًا مختلفًا من المادة الوراثية لأبويه','لأنهم وُلدوا في أوقات مختلفة']});return {}}});

/* ========== ٥) م١ لماذا تنقسم الخلية؟ + ساعة دورة الخلية ========== */
var CYC=[['النمو الأولي','تنمو الخلية وتنشط وتتضاعف العضيات.','#1fae7a',0,.42],['نسخ وتضاعف','يُنسخ DNA وتتضاعف الكروموسومات.','#2f8cff',.42,.70],['النمو النهائي والاستعداد للانقسام','تستعد الخلية للانقسام (بعض الخلايا لا تمر بهذه المرحلة).','#9b6cff',.70,.88],['طور الانقسام','تنقسم النواة، ثم يتوزع السيتوبلازم؛ لتكوين خليتين جديدتين.','#ff6b5b',.88,1]];
S({id:'why',name:'م١ دورة الخلية',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ١ · الانقسام الخلوي ودورة الخلية ص ٩٩–١٠٠</div><h1 class="t" style="font-size:42px">لماذا تنقسم الخلية؟ وكيف تمضي دورتها؟</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1;gap:10px;min-height:0"><div class="gal" style="grid-template-columns:repeat(3,1fr)">'+
   [['g_grow','١ النمو','المخلوقات الحية العديدة الخلايا كالأخطبوط تنمو نتيجة زيادة عدد خلاياها.'],['g_fission','٢ التكاثر','تصل المخلوقات الحية الوحيدة الخلية -ومنها الأميبا- إلى حجم معين، ثم تنقسم لتتكاثر.'],['g_cells','٣ تعويض الخلايا التالفة','تنقسم الخلايا لتحلّ محل الخلايا التالفة.']].map(function(c){return '<button class="gcard" style="height:200px"><span class="in"><span class="fa">'+img(c[0],'width:100%;height:120px;object-fit:cover;border-radius:12px')+'<b>'+c[1]+'</b></span><span class="ba"><p style="margin:0;font-size:18px;line-height:1.6">'+c[2]+'</p></span></span></button>'}).join('')+'</div>'+
   card('⏱ زمن دورة الخلية','<p style="margin:0 0 6px;font-size:18px">سلسلة من المراحل المتتابعة التي تمر بها الخلية منذ بدء الانقسام الخلوي إلى الانقسام الذي يليه، وتختلف مدتها من خلية إلى أخرى:</p><div id="race"></div><div class="qa" style="margin:6px 0 0"><button class="btn ghost" id="rGo">▶ ابدأ السباق</button></div>')+'</div>'+
   '<div class="col grow side" id="wq" style="gap:10px"><div class="card" style="padding:10px 14px"><div class="row" style="gap:12px;align-items:center"><svg id="clk" viewBox="-170 -170 340 340" style="width:290px;height:290px;flex:0 0 auto"></svg><div class="col" style="flex:1;gap:6px"><input type="range" id="cR" min="0" max="999" value="0" style="width:100%"><b id="cN" style="font-family:var(--disp);font-size:24px"></b><p id="cD" style="margin:0;font-size:18px;min-height:56px"></p><p class="hint" style="margin:0">تُقسم دورة حياة الخلية إلى طورين رئيسين: <b>الطور البيني</b> (ويستغرق معظم زمنها) و<b>طور الانقسام</b>.</p></div></div></div></div></div>';
  $$('.gcard',el).forEach(function(b){b.onclick=function(){b.classList.toggle('f');E.sfx.pop()}});
  var R=[['بعض خلايا أجنة الحيوانات','٢٠ دقيقة',20],['بعض خلايا جسم الإنسان','١٦ ساعة',960],['بعض خلايا نبات الفول','١٩ ساعة',1140]];
  $('#race',el).innerHTML=R.map(function(r){return '<div class="row" style="gap:8px;align-items:center;margin:4px 0"><span style="width:200px;font-size:16px">'+r[0]+'</span><span style="flex:1;height:22px;background:#eef3ef;border-radius:11px;overflow:hidden"><b class="rb" style="display:block;height:100%;width:0;background:linear-gradient(90deg,var(--mint),var(--sky));border-radius:11px;transition:width 1.6s cubic-bezier(.3,1,.4,1)"></b></span><b style="width:84px;font-family:var(--disp)">'+r[1]+'</b></div>'}).join('');
  $('#rGo',el).onclick=function(){$$('.rb',el).forEach(function(b,i){b.style.width='0';setTimeout(function(){b.style.width=Math.max(3,R[i][2]/1140*100)+'%'},60)});E.sfx.whoosh()};
  var C=$('#clk',el);function arc(a0,a1,r0,r1){var p=function(a,r){var t=a*Math.PI*2-Math.PI/2;return [Math.cos(t)*r,Math.sin(t)*r]},A=p(a0,r1),B=p(a1,r1),Cc=p(a1,r0),D=p(a0,r0),lg=a1-a0>.5?1:0;return 'M'+A+' A'+r1+' '+r1+' 0 '+lg+' 1 '+B+' L'+Cc+' A'+r0+' '+r0+' 0 '+lg+' 0 '+D+'Z'}
  function draw(v){var k=v/1000,cur=CYC.findIndex(function(c){return k>=c[3]&&k<c[4]});C.innerHTML=CYC.map(function(c,i){return '<path d="'+arc(c[3],c[4],92,160)+'" fill="'+c[2]+'" opacity="'+(i===cur?1:.35)+'" stroke="#fff" stroke-width="4"/>'}).join('')+'<path d="'+arc(0,.88,72,86)+'" fill="#1b2a3a" opacity=".7"/><circle r="66" fill="#fff" stroke="#d5e4da" stroke-width="3"/><text y="-6" text-anchor="middle" font-size="19" font-weight="800" font-family="Readex Pro" fill="#1b2a3a">'+(cur<3?'الطور البيني':'طور الانقسام')+'</text><text y="22" text-anchor="middle" font-size="15" font-family="IBM Plex Sans Arabic" fill="#56677a">'+(cur<3?'معظم زمن الدورة':'')+'</text><g transform="rotate('+(k*360)+')"><line y2="-166" stroke="#1b2a3a" stroke-width="5" stroke-linecap="round"/><circle cy="-166" r="10" fill="#ffc23d" stroke="#1b2a3a" stroke-width="3"/></g>';
    $('#cN',el).textContent=CYC[cur][0];$('#cN',el).style.color=CYC[cur][2];$('#cD',el).textContent=CYC[cur][1];if(cur===3)E.complete('why')}
  $('#cR',el).oninput=function(){draw(+this.value)};draw(0);
  var q=$('#wq',el);
  q.insertAdjacentHTML('beforeend',E.card('أنواع الانقسام الخلوي','<p style="margin:0 0 6px;font-size:17px">بعد انتهاء الطور البيني تدخل الخلية في طور الانقسام؛ حيث تنقسم النواة، ثم يتوزع السيتوبلازم؛ لتكوين خليتين جديدتين. وهناك أنواع من الانقسام الخلوي أهمها:</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:16px"><div class="card" style="padding:8px 10px;margin:0"><b class="gl">الانقسام المتساوي (غير المباشر)</b><br>تنتج عنه خليتان تحمل كل منهما عدد كروموسومات الخلية الأصلية نفسه.</div><div class="card" style="padding:8px 10px;margin:0"><b class="gl">الانقسام المنصف (الاختزالي)</b><br>تنتج عنه ٤ خلايا تحمل كل منها نصف عدد كروموسومات الخلية الأصلية.</div></div>'));
  
  
  return {}}});

/* ========== ٦) م٢ صانع الكروموسوم ========== */
S({id:'chromo',name:'م٢ الكروموسومات',build:function(el){var st=0,busy=false;
  el.innerHTML='<div class="eyebrow">المحطة ٢ · الكروموسومات ص ١٠١ و١٠٣</div><h1 class="t" style="font-size:42px">ورشة الكروموسوم</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 50%;gap:8px;min-height:0"><svg class="labview" id="ks" viewBox="0 0 800 460" style="flex:1;min-height:0;width:100%;height:100%"></svg><div class="qa" style="margin:0"><button class="btn" id="kGo">🧬 انسخ DNA (الطور البيني)</button><button class="btn ghost" id="kR">↺</button></div>'+
   card('','<p style="margin:0;font-size:17px">الكروموسومات تركيب في النواة يحتوي على المادة الوراثية. ويُنسخ DNA خلال الطور البيني؛ فيتكون الكروموسوم غير المتضاعف من سلسلة واحدة من DNA، أما الكروموسوم المتضاعف فيحتوي على سلسلتين متماثلتين من DNA تسميان <b class="gl">كروماتيدات</b>، ترتبطان معًا في منطقة تسمى <b class="gl">السنترومير</b>.</p>')+'</div>'+
   '<div class="col grow side" id="kq" style="gap:10px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+card('👤 الخلايا الجسدية','<p style="margin:0;font-size:17px">معظم خلايا الجسم. تنقسم <b>انقسامًا متساويًا</b>؛ ينتج عنه خليتان مماثلتان للخلية الأم.</p>')+card('🥚 الخلايا الجنسية','<p style="margin:0;font-size:17px">تمثّل الحيوانات المنوية في الذكر والبويضات في الأنثى. تنقسم <b>انقسامًا منصفًا</b>؛ ينتج عنه أربع خلايا لها نصف عدد كروموسومات الخلية الأم.</p>')+'</div>'+
   '</div></div>';
  var sv=$('#ks',el);
  function arm(x,y,col,rot){return '<g transform="translate('+x+' '+y+') rotate('+rot+')"><rect x="-17" y="-140" width="34" height="280" rx="17" fill="'+col+'" stroke="#1b2a3a" stroke-width="4"/><path d="M-17 -60 h34 M-17 30 h34 M-17 90 h34" stroke="rgba(255,255,255,.55)" stroke-width="6"/></g>'}
  function base(k,lab){var g=k*30;sv.innerHTML='<rect width="800" height="460" fill="#fbfdf9"/>'+(k<=0?arm(400,230,'#ff6b5b',0):arm(400-g,230,'#ff6b5b',-k*8)+arm(400+g,230,'#ff8a5b',k*8)+'<circle cx="400" cy="230" r="'+(10+k*6)+'" fill="#1b2a3a"/>')+
    (lab?(k<=0?'<line x1="420" y1="140" x2="560" y2="140" stroke="#1b2a3a" stroke-width="2"/><text x="660" y="132" text-anchor="middle" font-size="24" font-weight="800" font-family="Readex Pro" fill="#1b2a3a">كروموسوم غير متضاعف</text><text x="660" y="164" text-anchor="middle" font-size="18" font-family="IBM Plex Sans Arabic" fill="#56677a">سلسلة واحدة من DNA</text>':
     '<line x1="345" y1="110" x2="200" y2="70" stroke="#1b2a3a" stroke-width="2"/><text x="140" y="66" text-anchor="middle" font-size="22" font-weight="800" font-family="Readex Pro" fill="#c24a3a">كروماتيد</text><line x1="455" y1="110" x2="600" y2="70" stroke="#1b2a3a" stroke-width="2"/><text x="660" y="66" text-anchor="middle" font-size="22" font-weight="800" font-family="Readex Pro" fill="#c24a3a">كروماتيد</text><line x1="416" y1="236" x2="600" y2="300" stroke="#1b2a3a" stroke-width="2"/><text x="680" y="306" text-anchor="middle" font-size="22" font-weight="800" font-family="Readex Pro" fill="#1b2a3a">السنترومير</text><text x="400" y="440" text-anchor="middle" font-size="22" font-weight="800" font-family="Readex Pro" fill="#0e7a52">كروموسوم متضاعف</text>'):'')}
  base(0,1);
  $('#kGo',el).onclick=async function(){if(busy||st)return;busy=true;E.sfx.whoosh();await E.tw(1400,function(k){base(E.ease(k),0)});base(1,1);st=1;busy=false;E.sfx.ok();E.complete('chromo')};
  $('#kR',el).onclick=function(){if(!busy){st=0;base(0,1)}};
  var q=$('#kq',el);
  
  
  return {}}});

/* ========== ٧) م٣ شريط الفيلم: أطوار الانقسام المتساوي ========== */
S({id:'film',name:'م٣ أطوار الانقسام المتساوي',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٣ · الانقسام المتساوي (غير المباشر) ص ١٠١–١٠٢</div><h1 class="t" style="font-size:40px">رتّب شريط الفيلم… ثم شغّله</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 58%;gap:8px;min-height:0"><div class="film" id="fF"></div><div class="frames-pool" id="fP"></div><div class="qa" style="margin:0"><button class="btn" id="fC">✓ تحقّق من الترتيب</button><button class="btn ghost" id="fS">💡 اكشف</button><span class="hint">اسحب كل لقطة إلى مكانها في الشريط، أو المسها ثم المس الإطار. الشريط يُقرأ من اليمين.</span></div><div id="fFb"></div>'+
   '<div class="card" style="padding:8px 10px;flex:1;min-height:0;display:flex;flex-direction:column;gap:6px"><div class="chips" id="fB"></div><div class="row" style="flex:1;min-height:0;gap:10px;align-items:stretch"><canvas id="fV" class="sim" style="height:100%;max-height:230px;max-width:55%;aspect-ratio:5/3;object-fit:contain"></canvas><div class="col" style="flex:1;gap:6px"><b id="fN" style="font-family:var(--disp);font-size:24px;color:var(--mint)"></b><p id="fD" style="margin:0;font-size:17px;line-height:1.6"></p><div class="qa" style="margin:0"><button class="btn vi" id="fA">▶ شغّل الانقسام كاملًا</button></div></div></div></div></div>'+
   '<div class="col grow side" id="fq" style="gap:10px">'+card('الانقسام المتساوي','<p style="margin:0;font-size:18px">عملية انقسام النواة إلى نواتين متماثلتين، وتكون النواة الجديدة مماثلة للنواة الأصلية. يتضمن سلسلة من الأطوار المتتالية: ١ التمهيدي، ٢ الاستوائي، ٣ الانفصالي، ٤ النهائي.</p>')+'</div></div>';
  var F=$('#fF',el),P=$('#fP',el),Ts=[1.93,2.93,3.6,4.75],slots=[],toks=[];
  MP.forEach(function(nm,i){var s=h('<div class="frame" data-k="'+i+'"><span>'+n(i+1)+'</span></div>');F.appendChild(s);slots.push(s)});
  E.shuffle([0,1,2,3]).forEach(function(i){var t=h('<div class="fr" data-k="'+i+'">'+E.cellSnap(E.drawMitosis,Ts[i],{},160).replace('style="','style="width:100%;')+'</div>');P.appendChild(t);toks.push(t)});
  var G=E.slotFill({slots:slots,tokens:toks,pool:P});
  function lab(){slots.forEach(function(s,i){var sp=s.querySelector('span');if(sp&&s.classList.contains('ok'))sp.textContent=n(i+1)+' '+MP[i]})}
  $('#fC',el).onclick=function(){if(!slots.every(function(s){return s.querySelector('.fr')})){E.toast('ضعوا اللقطات الأربع في الشريط');return}var bad=G.grade();lab();E.ST.res['l2-film']=bad?0:1;E.save();$('#fFb',el).innerHTML='<div class="fbx '+(bad?'no':'ok')+'">'+(bad?'✘ '+n(bad)+' لقطات في غير مكانها. انظروا: أين الكروموسومات؟ هل النواة موجودة؟':'✔ ترتيب صحيح: التمهيدي ← الاستوائي ← الانفصالي ← النهائي.')+'</div>'+(bad?'':E.awardHTML('l2-film',20));bad?E.sfx.no():(E.sfx.ok(),E.complete('film'))};
  $('#fS',el).onclick=function(){G.show();lab()};
  var cv=$('#fV',el),Sm=E.phaseSim(cv,E.drawMitosis,6,{plant:false,labels:true}),B=$('#fB',el),cur=-1;
  B.innerHTML=E.MIT.map(function(p,i){return '<button class="chip" data-p="'+i+'">'+p.n.replace('الطور ','')+'</button>'}).join('');
  $$('[data-p]',B).forEach(function(b){b.onclick=function(){Sm.go(+b.dataset.p);E.sfx.tick()}});
  Sm.onT=function(T){var p=Math.min(5,Math.floor(T));if(p!==cur){cur=p;$('#fN',el).textContent=E.MIT[p].n;$('#fD',el).textContent=E.MIT[p].d;$$('[data-p]',B).forEach(function(z,i){z.setAttribute('aria-pressed',i===p)})}};
  $('#fA',el).onclick=function(){Sm.speed=1.4;Sm.playAll();E.sfx.whoosh()};
  var q=$('#fq',el);
  
  
  return {enter:function(){Sm.start();Sm.go(0,true)},leave:function(){Sm.stop()}}}});

/* ========== ٨) م٤ نبات أم حيوان؟ ========== */
S({id:'pa',name:'م٤ النباتية والحيوانية',build:function(el){var seen={};
  el.innerHTML='<div class="eyebrow">المحطة ٤ · المقارنة ص ١٠٣</div><h1 class="t" style="font-size:42px">اكتشف الفرق: خلية حيوانية وخلية نباتية</h1><div class="chips" style="margin-bottom:8px">'+MP.map(function(p,i){return '<button class="chip" data-p="'+(i+1)+'">'+p+'</button>'}).join('')+'<span class="hint">اختر الطور نفسه في الخليتين، ولاحظ أين يختلفان.</span></div><div class="row grow" style="min-height:0;gap:12px"><div class="col" style="flex:1;gap:6px;min-height:0"><b style="font-family:var(--disp);font-size:24px;color:#c2557d">🐾 الخلية الحيوانية</b><canvas id="pA" class="sim" style="width:100%;aspect-ratio:5/3"></canvas><div class="card reveal" id="dA" style="padding:8px 14px;font-size:18px"></div></div><div class="col" style="flex:1;gap:6px;min-height:0"><b style="font-family:var(--disp);font-size:24px;color:#4f7a26">🌿 الخلية النباتية</b><canvas id="pP" class="sim" style="width:100%;aspect-ratio:5/3"></canvas><div class="card reveal" id="dP" style="padding:8px 14px;font-size:18px"></div></div><div class="col side" id="pq" style="flex:.9;gap:10px"></div></div>';
  var A=E.phaseSim($('#pA',el),E.drawMitosis,6,{plant:false,labels:true}),P=E.phaseSim($('#pP',el),E.drawMitosis,6,{plant:true,labels:true});
  var DA={1:'<b>في الطور التمهيدي:</b> تتكون خيوط المغزل من المريكزات التي تتحرك إلى قطبي الخلية.',4:'<b>في الطور النهائي:</b> ينقسم السيتوبلازم بتخصّر الغشاء البلازمي من الوسط.'},DP={1:'<b>في الطور التمهيدي:</b> لا توجد مريكزات، ومع ذلك تتكون خيوط المغزل.',4:'<b>في الطور النهائي:</b> تظهر الصفيحة الخلوية في المنتصف، وتكون فيما بعد الجدار الخلوي.'};
  $$('[data-p]',el).forEach(function(b){b.onclick=function(){var p=+b.dataset.p;A.go(p);P.go(p);$$('[data-p]',el).forEach(function(z){z.setAttribute('aria-pressed',z===b)});E.sfx.tick();
    ['A','P'].forEach(function(s){var d=$('#d'+s,el),t=(s==='A'?DA:DP)[p];d.innerHTML=t||'لا فرق واضح بين الخليتين في هذا الطور.';d.classList.add('shown')});if(DA[p])seen[p]=1;if(seen[1]&&seen[4])E.complete('pa')}});
  var q=$('#pq',el);
  
  E.mcq(q,{id:'l2-pa-q2',goal:3,lvl:1,q:'ينقسم سيتوبلازم الخلية النباتية في الطور النهائي عن طريق:',o:['تخصّر الغشاء البلازمي','تكوّن الصفيحة الخلوية','تلاشي الجدار الخلوي','المريكزات'],a:1,ex:'تتكون الصفيحة الخلوية التي تصبح فيما بعد جدارًا خلويًا.'});
  return {enter:function(){A.start();P.start();A.go(1,true);P.go(1,true)},leave:function(){A.stop();P.stop()}}}});

/* ========== ٩) م٥ نتائج الانقسام ========== */
S({id:'result',name:'م٥ نتائج الانقسام',build:function(el){var k=0;
  el.innerHTML='<div class="eyebrow">المحطة ٥ · نتائج الانقسام المتساوي ص ١٠٣</div><h1 class="t" style="font-size:42px">خلية تختفي… وخليتان تولدان</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 52%;gap:10px;min-height:0"><div class="card" style="padding:14px;flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px" id="rs">'+
   [['١','ينتج عن الانقسام المتساوي انقسام النواة.','🔵'],['٢','تنتج نواتان جديدتان متماثلتان تشبهان الخلية الأصلية، في كل منهما عدد الكروموسومات نفسه.','🔵🔵'],['٣','تختفي الخلية الأصلية، ولا يعود لها وجود.','👻']].map(function(r){return '<div class="goal" style="font-size:21px"><span class="gn">'+r[0]+'</span><span class="gi" style="font-size:32px">'+r[2]+'</span><span>'+r[1]+'</span></div>'}).join('')+'<div class="qa" style="justify-content:center"><button class="btn" id="rN">إظهار النتيجة التالية ←</button></div></div></div><div class="col grow side" id="rq" style="gap:10px"></div></div>';
  var gs=$$('#rs .goal',el);$('#rN',el).onclick=function(){if(k<3){gs[k].classList.add('in');k++;E.sfx.pop();if(k===3)E.complete('result')}};
  var q=$('#rq',el);q.insertAdjacentHTML('beforeend','<div class="card" style="padding:10px 14px"><p style="margin:0;font-size:17px">توجد الكروموسومات على شكل أزواج في نوى معظم الخلايا. تحتوي خلية الإنسان على <b class="gl">٤٦</b> كروموسومًا، منها زوج يساعد على تحديد نوع الجنس، كما في (XY). أما خلية ذبابة الفاكهة فتحتوي على <b class="gl">٨</b> كروموسومات.</p><div class="row" style="gap:8px;margin-top:6px">'+img('g_fly','height:96px;border-radius:10px')+img('g_flykar','height:96px;border-radius:10px;background:#fff')+'</div></div>');
  E.mcq(q,{id:'l2-ch-q2',goal:2,lvl:2,q:'استنتج: ما الذي تستدل عليه من خلال زوج الكروموسومات (XX) في خلية ذبابة الفاكهة؟',o:['أنها أنثى','أنها ذكر','أنها خلية جنسية','أنها في الطور الانفصالي'],a:0,cols:2,ex:'قياسًا على الإنسان الذي يحمل الذكر فيه (XY)، يدل الزوج (XX) على أن الذبابة أنثى.'});
  E.spot(q,{id:'l2-rs-sp',goal:1,lvl:2,q:'المس الجزء الخاطئ علميًا في العبارة:',parts:['خلية جسمية في الإنسان','فيها ٤٦ كروموسومًا','انقسمت انقسامًا متساويًا،','فنتجت خليتان','في كل منهما ٢٣ كروموسومًا.'],bad:4,fix:'في كل منهما ٤٦ كروموسومًا',ex:'في الانقسام المتساوي تحمل كل خلية ناتجة عدد كروموسومات الخلية الأصلية نفسه: ٤٦.'});
  
  
  return {enter:function(){if(!k)setTimeout(function(){$('#rN',el).click()},500)}}}});

/* ========== ١٠) م٦ معرض التكاثر اللاجنسي ========== */
var ASX=[['g_potato','التكاثر بالدرنات','البطاطس'],['g_straw','التكاثر بالسيقان الجارية','الفراولة · النعناع · الزنجبيل'],['g_hydrad','التكاثر بالتبرعم','الهيدرا · فطر الخميرة'],['g_star','التكاثر بالتجدد','نجم البحر · الديدان المفلطحة'],['g_fission','التكاثر بالانشطار','البكتيريا · الأوليات مثل الأميبا والبراميسيوم']];
S({id:'asex',name:'م٦ التكاثر اللاجنسي',build:function(el){var fl={};
  el.innerHTML='<div class="eyebrow">المحطة ٦ · التكاثر اللاجنسي ص ١٠٤–١٠٥</div><h1 class="t" style="font-size:42px">معرض «فرد واحد يكفي»</h1><div class="card" style="padding:8px 14px;margin-bottom:8px"><p style="margin:0;font-size:19px"><b class="gl">التكاثر اللاجنسي:</b> تكاثر يكون فيه المخلوق الحي قادرًا بمفرده على إنتاج فرد أو أكثر يحمل المادة الوراثية نفسها. اقلب البطاقات لتكتشف أنواعه.</p></div><div class="gal" style="grid-template-columns:repeat(5,1fr)">'+ASX.map(function(a,i){return '<button class="gcard" data-i="'+i+'" style="height:210px"><span class="in"><span class="fa">'+img(a[0],'width:100%;height:140px;object-fit:cover;border-radius:12px')+'<b>'+n(i+1)+' ؟</b></span><span class="ba"><b style="font-size:22px;color:var(--mint)">'+a[1]+'</b><p style="margin:0;font-size:17px">أمثلة: '+a[2]+'</p></span></span></button>'}).join('')+'</div><div class="row grow" style="min-height:0;margin-top:10px"><div class="col side" id="aL" style="flex:1.2;gap:10px"></div><div class="col grow side" id="aq" style="gap:10px"></div></div>';
  $$('.gcard',el).forEach(function(b){b.onclick=function(){b.classList.toggle('f');fl[b.dataset.i]=1;E.sfx.pop();if(Object.keys(fl).length===5)E.complete('asex')}});
  E.sort($('#aL',el),{id:'l2-as-sort',goal:4,lvl:1,q:'اسحب كل مخلوق حي إلى طريقة تكاثره اللاجنسي:',bins:['الدرنات','السيقان الجارية','التبرعم','التجدد','الانشطار'],items:[{t:'البطاطس',b:0},{t:'النعناع',b:1},{t:'الزنجبيل',b:1},{t:'فطر الخميرة',b:2},{t:'الهيدرا',b:2},{t:'الديدان المفلطحة',b:3},{t:'البكتيريا',b:4},{t:'البراميسيوم',b:4}],ex:'البطاطس درنات، والنعناع والزنجبيل سيقان جارية، والهيدرا والخميرة تبرعم، والديدان المفلطحة تجدد، والبكتيريا والبراميسيوم انشطار.'});
  var q=$('#aq',el);
  
  
  
  return {}}});

/* ========== ١١) م٧ الإخصاب: معادلة الكروموسومات ========== */
S({id:'fert',name:'م٧ التكاثر الجنسي والإخصاب',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٧ · التكاثر الجنسي ص ١٠٥–١٠٦</div><h1 class="t" style="font-size:42px">معادلة الحياة: ٢٣ + ٢٣</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1.15;gap:10px;min-height:0">'+card('','<p style="margin:0;font-size:18px">يتطلب <b class="gl">التكاثر الجنسي</b> وجود فردين؛ إذ تتحد خليتان جنسيتان معًا. <b>البويضة</b>: الخلية الجنسية الناتجة عن الأعضاء التناسلية الأنثوية، و<b>الحيوان المنوي</b>: الخلية الجنسية الناتجة عن الأعضاء التناسلية الذكرية. ويسمى اتحادهما <b class="gl">الإخصاب</b>، وتسمى الخلية الناتجة <b class="gl">البويضة المخصبة</b>.</p><div class="row" style="gap:10px;align-items:center;margin-top:6px">'+img('g_sperm','height:120px;border-radius:12px')+'<p class="hint" style="margin:0;flex:1">البويضة والحيوان المنوي في الإنسان عند الإخصاب.</p></div>')+
   '<div class="card" style="padding:12px 16px"><h3 style="margin:0 0 8px">🧩 أكمل معادلة الإخصاب في الإنسان (عدد الكروموسومات)</h3><div class="eq"><div class="col pcard">'+'<svg viewBox="0 0 120 80" style="height:80px"><path d="M20 40 q15 -18 30 0 t30 0 t25 0" fill="none" stroke="#2f8cff" stroke-width="4"/><ellipse cx="18" cy="40" rx="14" ry="10" fill="#2f8cff"/></svg>'+'<small>الحيوان المنوي</small><div class="slot" data-k="23a"></div></div><span class="op">+</span><div class="col pcard">'+'<svg viewBox="0 0 80 80" style="height:80px"><circle cx="40" cy="40" r="34" fill="#ffd6e2" stroke="#ff6b8a" stroke-width="4"/><circle cx="40" cy="40" r="12" fill="#ff6b8a"/></svg>'+'<small>البويضة</small><div class="slot" data-k="23b"></div></div><span class="op">⟵</span><div class="col pcard"><svg viewBox="0 0 80 80" style="height:80px"><circle cx="40" cy="40" r="34" fill="#d9f5e6" stroke="#1fae7a" stroke-width="4"/><circle cx="40" cy="40" r="14" fill="#9b6cff"/></svg><small>البويضة المخصبة</small><div class="slot" data-k="46"></div></div></div><div class="terms" id="fP" style="margin-top:10px"></div><div class="qa" style="justify-content:center"><button class="btn" id="fC">✓ تحقّق</button></div><div id="fFb"></div></div>'+
   '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+card('ثنائية المجموعة الكروموسومية','<p style="margin:0;font-size:17px">الخلايا الجسمية عند الإنسان؛ لأنها تحتوي على ٢٣ زوجًا من الكروموسومات المتماثلة (<b>٤٦</b>).</p>')+card('أحادية المجموعة الكروموسومية','<p style="margin:0;font-size:17px">الخلايا الجنسية؛ يكون فيها كروموسوم واحد من كل زوج متماثل، أي نصف العدد (<b>٢٣</b>).</p>')+'</div></div><div class="col grow side" id="fq" style="gap:10px"></div></div>';
  var slots=$$('.slot',el),pool=$('#fP',el),toks=E.shuffle([['23a','٢٣'],['23b','٢٣'],['46','٤٦'],['x','٩٢'],['y','١١']]).map(function(t){var e=h('<span class="term" data-k="'+t[0]+'" style="font-size:26px">'+t[1]+'</span>');pool.appendChild(e);return e});
  var F=E.slotFill({slots:slots,tokens:toks,pool:pool});
  $('#fC',el).onclick=function(){if(!slots.every(function(s){return s.querySelector('.term')})){E.toast('أكملوا الخانات الثلاث');return}var v=slots.map(function(s){return s.querySelector('.term').textContent}),ok=v[0]==='٢٣'&&v[1]==='٢٣'&&v[2]==='٤٦';slots.forEach(function(s,i){s.classList.remove('ok','no');s.classList.add(v[i]===(i<2?'٢٣':'٤٦')?'ok':'no')});E.ST.res['l2-fe-eq']=ok?1:0;E.save();$('#fFb',el).innerHTML='<div class="fbx '+(ok?'ok':'no')+'">'+(ok?'✔ تحمل كل خلية جنسية ٢٣ كروموسومًا، فتحمل البويضة المخصبة ٤٦ مثل خلايا الأبوين.':'✘ تذكّروا: الخلية الجنسية أحادية المجموعة الكروموسومية.')+'</div>'+(ok?E.awardHTML('l2-fe-eq',20):'');ok?(E.sfx.ok(),E.complete('fert')):E.sfx.no()};
  var q=$('#fq',el);
  
  
  
  return {}}});

/* ========== ١٢) م٨ الانقسام المنصف ========== */
S({id:'meio',name:'م٨ الانقسام المنصف',build:function(el){var seen={};
  el.innerHTML='<div class="eyebrow">المحطة ٨ · الانقسام المنصف (الاختزالي) ص ١٠٦–١٠٨</div><h1 class="t" style="font-size:40px">الانقسام المنصف: مرحلتان… وأربع خلايا</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 58%;gap:8px;min-height:0"><div class="chips" id="mB"></div><canvas id="mV" class="sim" style="width:100%;aspect-ratio:5/3;max-height:390px;object-fit:contain"></canvas><div class="lcdrow"><div class="lcd"><small>عدد الخلايا</small><b id="mC">١</b></div><div class="lcd am"><small>الكروموسومات في كل خلية</small><b id="mK">٤</b></div><div class="lcd" style="flex:2.4"><small id="mN"></small><b id="mD" style="font-size:16px;line-height:1.5;font-family:IBM Plex Sans Arabic"></b></div></div><div class="qa" style="margin:0"><button class="btn ghost" id="mP">→ السابق</button><button class="btn" id="mX">التالي ←</button><button class="btn vi" id="mA">▶ تشغيل كامل</button><span class="hint">الأحمر من الأم والأزرق من الأب (نموذج فيه ٤ كروموسومات).</span></div></div>'+
   '<div class="col grow side" id="mq" style="gap:10px"><div class="card" style="padding:10px 14px"><b>نلاحظ في الانقسام المنصف:</b><ul style="margin:4px 0 0;font-size:18px;line-height:1.7"><li>يحدث في الخلايا الجنسية.</li><li>ينتج عنه أربع أنوية، بكل نواة نصف العدد من الكروموسومات.</li><li>الخلايا الجنسية الأحادية تنتج البويضة المخصبة الثنائية المجموعة الكروموسومية التي تبدأ في النمو والتغير لتكون فردًا جديدًا.</li></ul></div></div></div>';
  var cv=$('#mV',el),Sm=E.phaseSim(cv,E.drawMeiosis,10,{labels:true}),B=$('#mB',el),cur=-1;
  B.innerHTML=E.MEI.map(function(p,i){return '<button class="chip" data-p="'+i+'" style="font-size:15px;padding:6px 10px">'+p.n.replace('الطور ','')+'</button>'}).join('');
  $$('[data-p]',B).forEach(function(b){b.onclick=function(){Sm.go(+b.dataset.p);E.sfx.tick()}});
  Sm.onT=function(T){var p=Math.min(9,Math.floor(T));if(p!==cur){cur=p;seen[p]=1;var M=E.MEI[p];$('#mN',el).textContent=M.n;$('#mD',el).textContent=M.d;$('#mC',el).textContent=n(M.c);$('#mK',el).textContent=n(M.k);$$('[data-p]',B).forEach(function(z,i){z.setAttribute('aria-pressed',i===p)});if(seen[9])E.complete('meio')}};
  $('#mX',el).onclick=function(){Sm.next()};$('#mP',el).onclick=function(){Sm.prev()};$('#mA',el).onclick=function(){Sm.speed=1.4;Sm.playAll();E.sfx.whoosh()};
  var q=$('#mq',el);
  E.table(q,{id:'l2-me-tb',goal:5,lvl:2,q:'قارن بين نوعي الانقسام:',cols:['وجه المقارنة','الانقسام المتساوي','الانقسام المنصف'],rows:[['أين يحدث؟',{a:'الخلايا الجسمية',opts:['الخلايا الجسمية','الخلايا الجنسية']},{a:'الخلايا الجنسية',opts:['الخلايا الجسمية','الخلايا الجنسية']}],['عدد الخلايا الناتجة',{a:'٢',opts:['٢','٤']},{a:'٤',opts:['٢','٤']}],['عدد الكروموسومات مقارنة بالأم',{a:'العدد نفسه',opts:['العدد نفسه','النصف']},{a:'النصف',opts:['العدد نفسه','النصف']}]],ex:'المتساوي: خليتان بالعدد نفسه، والمنصف: أربع خلايا بنصف العدد.'});
  
  
  
  E.mcq(q,{id:'l2-me-q4',goal:5,lvl:2,q:'ما الذي ينفصل في الطور الانفصالي <b>الأول</b>؟',o:['الكروموسومان المتماثلان في كل زوج','الكروماتيدان في كل كروموسوم','النواة إلى نواتين','الجدار الخلوي'],a:0,ex:'ينفصل كروموسوما كل زوج متماثل، ولا ينفصل السنترومير إلا في الطور الانفصالي الثاني.'});
  
  return {enter:function(){Sm.start();Sm.go(0,true)},leave:function(){Sm.stop()}}}});

/* ========== ١٣) م٩ الانحرافات والخلل ========== */
S({id:'err',name:'م٩ الانحرافات والخلل',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٩ · الانحرافات والخلل في الانقسام المنصف ص ١٠٩</div><h1 class="t" style="font-size:42px">عندما يختل العدد</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1.1;gap:10px;min-height:0">'+card('','<p style="margin:0;font-size:19px">يقصد بالانحرافات والخلل أن ينتج عن الانقسام المنصف خلايا جنسية تحتوي على <b class="gl">عدد أكبر أو أقل</b> من الكروموسومات. وهذه الانحرافات شائعة الحدوث في النباتات، قليلة الحدوث في الحيوانات.</p><p class="reveal explain" style="margin:6px 0 0">غالبًا ما تموت البويضة المخصبة الناتجة عن هذه الخلايا الجنسية. ولو نمت فيكون عدد الكروموسومات في خلايا المخلوق الحي الناتج غير معتاد، وهذا يؤدي إلى عدم نموه بشكل طبيعي، ويسبب ما يسمى بالمتلازمات (مثل متلازمة داون).</p>')+
   '<div class="card" style="padding:12px 16px"><h3 style="margin:0 0 8px">🐴 + 🫏 = ؟</h3><div class="row" style="gap:14px;align-items:center"><div style="font-size:64px;line-height:1.1;text-align:center">🐴<br>🫏</div><div class="col" style="gap:8px;flex:1"><div class="eq" style="justify-content:flex-start;font-size:26px"><span class="tag">خلية جنسية من الحصان: ٣٢</span><span class="op">+</span><span class="tag gold">خلية جنسية من الحمار: ٣١</span></div><div class="row" style="gap:8px;align-items:center"><span style="font-size:20px">كروموسومات خلايا البغل =</span><input id="eI" inputmode="numeric" style="width:120px;font-size:26px;text-align:center;border-radius:14px;border:2px solid var(--line2);padding:6px"><button class="btn" id="eC">✓</button></div><div id="eF"></div></div></div></div></div><div class="col grow side" id="eq" style="gap:10px"></div></div>';
  $('#eC',el).onclick=function(){var v=$('#eI',el).value.replace(/[٠-٩]/g,function(d){return '٠١٢٣٤٥٦٧٨٩'.indexOf(d)}).trim(),ok=v==='63';E.ST.res['l2-er-mule']=ok?1:0;E.save();$('#eF',el).innerHTML='<div class="fbx '+(ok?'ok':'no')+'">'+(ok?'✔ ٣٢ + ٣١ = ٦٣ كروموسومًا، وهو عدد فردي غير معتاد.':'✘ اجمعوا العددين.')+'</div>';ok?(E.sfx.ok(),E.complete('err')):E.sfx.no()};
  var q=$('#eq',el);
  
  
  
  
  return {}}});

/* ========== ١٤) م١٠ ذاكرة الكروموسومات ========== */
S({id:'memory',name:'م ذاكرة الكروموسومات (إثرائي)',build:function(el){E.memoryGame(el,[
  ['الانقسام المتساوي','انقسام النواة إلى نواتين متماثلتين'],['الكروموسوم','تركيب في النواة يحتوي على المادة الوراثية'],['السنترومير','منطقة ارتباط الكروماتيدين'],['الطور البيني','يستغرق معظم زمن دورة الخلية'],['التبرعم','الهيدرا وفطر الخميرة'],['الإخصاب','اتحاد البويضة مع الحيوان المنوي'],['البويضة المخصبة','الخلية الناتجة عن الإخصاب'],['أحادية المجموعة','الخلايا الجنسية: ٢٣ كروموسومًا'],['الانقسام المنصف','ينتج أربع خلايا بنصف العدد']],'l2-mem');return {}}});

/* ========== ١٥) ماذا تعلمنا؟ ========== */
S({id:'review',name:'م١١ ماذا تعلمنا؟',build:function(el){return E.review(el,{goals:[
  {t:GO[0],how:'عرفنا أهمية الانقسام، وأدرنا ساعة دورة الخلية',st:['why','result','eval1'],q:['l2-wy-q1','l2-wy-q3','l2-rs-sp','l2-rs-q1','l2-q2c']},
  {t:GO[1],how:'صنعنا كروموسومًا متضاعفًا، ورتّبنا شريط الأطوار',st:['chromo','film'],q:['l2-ch-q1','l2-film','l2-fm-q1','l2-fm-q2']},
  {t:GO[2],how:'قارنّا الخليتين طورًا بطور',st:['pa'],q:['l2-pa-q1','l2-pa-q2']},
  {t:GO[3],how:'قلبنا بطاقات معرض التكاثر اللاجنسي وصنّفنا المخلوقات',st:['asex'],q:['l2-as-sort','l2-as-q1','l2-as-q3']},
  {t:GO[4],how:'تتبعنا مرحلتي الانقسام المنصف وقارنّاه بالمتساوي',st:['meio'],q:['l2-me-tb','l2-me-q1','l2-me-q4','l2-me-q5']},
  {t:GO[5],how:'عرفنا لماذا تحمل الخلايا الجنسية نصف العدد، وماذا يحدث عند الخلل',st:['meio','err','eval3'],q:['l2-me-q3','l2-er-mule','l2-er-q1']},
  {t:GO[6],how:'أكملنا معادلة الإخصاب ٢٣ + ٢٣',st:['fert','eval2'],q:['l2-fe-eq','l2-fe-q2','l2-fe-q3']}],
  exit:[{id:'l2-exit1',goal:2,lvl:1,q:'الترتيب الصحيح لأطوار الانقسام المتساوي:',o:['التمهيدي ← الاستوائي ← الانفصالي ← النهائي','الاستوائي ← التمهيدي ← النهائي ← الانفصالي','التمهيدي ← الانفصالي ← الاستوائي ← النهائي','النهائي ← الانفصالي ← الاستوائي ← التمهيدي'],a:0,ex:'التمهيدي ثم الاستوائي ثم الانفصالي ثم النهائي.'},
        {id:'l2-exit2',goal:4,lvl:1,q:'مثالان على التكاثر اللاجنسي:',o:['التبرعم والانشطار','الإخصاب والتبرعم','الإخصاب والانقسام المنصف','البويضة والحيوان المنوي'],a:0,cols:2,ex:'التبرعم والانشطار من أنواع التكاثر اللاجنسي.'},
        {t:'tf',id:'l2-exit3',goal:5,lvl:1,q:'ينتج عن الانقسام المنصف خليتان تحمل كل منهما عدد كروموسومات الخلية الأصلية نفسه.',v:false,ex:'ينتج أربع خلايا بنصف عدد الكروموسومات.'}],
  extra:function(ex){ex.insertAdjacentHTML('beforeend',E.card('📝 الواجب · ص ١١١','<p style="margin:0;font-size:18px">حلّ أسئلة مراجعة الدرس في الكتاب ص ١١١، والتسليم يوم الخميس.</p>'))}})}});


/* ========== محطات مطابقة لشرائح العرض ========== */
var D=E.deck;
S({id:'vocab',name:'المفردات الجديدة',build:function(el){return D.vocab(el,{sid:'vocab',review:card('🧠 مراجعة المفردات','<div style="font-size:19px;line-height:1.75"><b class="gl">النواة:</b> <span class="reveal">عضية تتحكم في جميع نشاطات الخلية، وتحتوي على المادة الوراثية التي تتكون من البروتينات و DNA.</span><br><b class="gl">المخلوق الحي:</b> <span class="reveal">كل مخلوق يتكون من خلايا، وله قدرة على النمو والتكاثر والاستجابة، ويستهلك الطاقة.</span></div>'),eyebrow:'انقسام الخلية وتكاثرها · ص ٩٩',items:[['الانقسام المتساوي','انقسام النواة إلى نواتين متماثلتين، مماثلتين للنواة الأصلية.'],['الكروموسوم','تركيب في النواة يحتوي على المادة الوراثية.'],['التكاثر اللاجنسي','تكاثر يكون فيه المخلوق الحي قادرًا بمفرده على إنتاج فرد أو أكثر يحمل المادة الوراثية نفسها.'],['التكاثر الجنسي','اتحاد خليتين جنسيتين معًا، مثل اتحاد البويضة مع الحيوان المنوي.'],['البويضة','الخلية الجنسية الناتجة عن الأعضاء التناسلية الأنثوية.'],['الحيوان المنوي','الخلية الجنسية الناتجة عن الأعضاء التناسلية الذكرية.'],['الإخصاب','اتحاد البويضة مع الحيوان المنوي.'],['البويضة المخصبة','الخلية الناتجة عن الإخصاب.'],['ثنائي المجموعة الكروموسومية','خلية تحتوي على أزواج من الكروموسومات المتماثلة، كالخلايا الجسمية في الإنسان (٤٦).'],['أحادي المجموعة الكروموسومية','خلية فيها كروموسوم واحد من كل زوج متماثل، أي نصف العدد (٢٣ في الإنسان).'],['الانقسام المنصف','انقسام في الخلايا الجنسية ينتج عنه أربع خلايا بنصف عدد الكروموسومات.']]})}});
S({id:'eval1',name:'م تقويم ١ و٢',build:function(el){return D.evalStation(el,{sid:'eval1',eyebrow:'المحطة · تقويم: السؤالان رقم ١ و٢',title:'تقويم: دورة الخلية والانقسام المتساوي',note:'الفقرة ٧ من السؤال ١ في العرض تكرار للفقرة ٤، فاكتفينا بها مرة واحدة.',qs:[
 {id:'l2-wy-q1',goal:1,lvl:1,kind:'السؤال ١ · فقرة ١',q:'تقضي أي خلية معظم دورة حياتها في فترة نمو ضمن الطور:',o:['البيني','الاستوائي','التمهيدي','النهائي'],a:0,ex:'الطور البيني يستغرق معظم زمن دورة حياة الخلية.'},
 {id:'l2-wy-q2',goal:1,lvl:1,kind:'السؤال ١ · فقرة ٢',q:'تسمى المراحل التي تمر بها الخلايا، تبدأ بالتكوّن ثم النمو وتنتهي بالموت:',o:['الطور البيني','الاختزال','التحوّل','دورة الحياة'],a:3,ex:'هي دورة حياة الخلية.'},
 {id:'l2-wy-q3',goal:1,lvl:1,kind:'السؤال ١ · فقرة ٣',q:'تضاعف الخلية عدد كروموسوماتها استعدادًا للانقسام الخلوي في الطور:',o:['البيني','الاستوائي','التمهيدي','النهائي'],a:0,ex:'في الطور البيني يُنسخ DNA وتتضاعف الكروموسومات.'},
 {id:'l2-ch-q1',goal:2,lvl:1,kind:'السؤال ١ · فقرة ٤',q:'تركيب في النواة يحتوي المادة الوراثية:',o:['البروتينات','الكروموسومات','الكلوروفيل','السنترومير'],a:1,ex:'الكروموسومات.'},
 {id:'l2-fm-q1',goal:2,lvl:1,kind:'السؤال ١ · فقرة ٥',q:'أي مما يلي <b>لا</b> يحدث في الطور التمهيدي؟',o:['تبدأ النوية والغلاف النووي بالتلاشي','تنفصل أزواج الكروماتيدات وتتحرك نحو طرفي الخلية','يبدأ زوجان من المريكزات بالتحرك نحو قطبي الخلية','تبدأ الخيوط المغزلية في التكوّن وتمتد عبر الخلية'],a:1,cols:1,ex:'انفصال الكروماتيدات يحدث في الطور الانفصالي.'},
 {id:'l2-fm-q2',goal:2,lvl:1,kind:'السؤال ١ · فقرة ٦',q:'في أي طور تصطف أزواج الكروماتيدات في وسط الخلية؟',o:['البيني','الاستوائي','التمهيدي','النهائي'],a:1,ex:'الطور الاستوائي.'},
 {t:'tf',id:'l2-rs-q1',goal:1,lvl:1,kind:'تقويم ٢ (أ) · صح أم خطأ',q:'كل نواة خلية في جسمك، ما عدا الخلايا الجنسية، تحتوي على ٤٦ كروموسومًا.',v:true,ex:'صحيح.'},
 {t:'tf',id:'l2-rs-q2',goal:1,lvl:1,kind:'تقويم ٢ (ب) · صح أم خطأ',q:'الطور التمهيدي يشكّل معظم زمن دورة الخلية الذي تستغرقه الخلية في النمو والتطور.',v:false,ex:'الصواب: الطور البيني.'},
 {t:'tf',id:'l2-q2c',goal:2,lvl:1,kind:'تقويم ٢ (ج) · صح أم خطأ',q:'ينتج عن الانقسام الاختزالي خليتان تحمل كل منهما نفس عدد كروموسومات الخلية الأصلية.',v:false,ex:'الصواب: الانقسام المتساوي ينتج خليتين بالعدد نفسه، أما الاختزالي فينتج أربع خلايا بنصف العدد.'},
 {t:'tf',id:'l2-pa-q1',goal:3,lvl:2,kind:'تقويم ٢ (د) · صح أم خطأ',q:'في الخلية النباتية تتكون الخيوط المغزلية من المريكزات الناتجة عن انقسام الجسم المركزي.',v:false,ex:'الصواب: في الخلية الحيوانية. فالخلية النباتية لا يوجد فيها جسم مركزي.'}]})}});
S({id:'eval2',name:'م تقويم ٣',build:function(el){return D.evalStation(el,{sid:'eval2',eyebrow:'المحطة · تقويم: السؤال رقم ٣',title:'تقويم: التكاثر اللاجنسي والجنسي',qs:[
 {id:'l2-fe-q1',goal:7,lvl:1,kind:'السؤال ٣ · فقرة ١',q:'ما عدد الكروموسومات في الحيوان المنوي في الإنسان؟',o:['٢٣','٨','٤٦','١١'],a:0,ex:'٢٣ كروموسومًا.'},
 {id:'l2-fe-q2',goal:7,lvl:1,kind:'السؤال ٣ · فقرة ٢',q:'تسمى الخلية التي تنتج عن الإخصاب:',o:['البويضة','الزايجوت','الحيوان المنوي','الكروموسوم'],a:1,ex:'الزايجوت (البويضة المخصبة).'},
 {id:'l2-as-q1',goal:4,lvl:1,kind:'السؤال ٣ · فقرة ٣',q:'نسخة صغيرة مطابقة تمامًا للفرد الناضج، تنمو من المخلوق الحي الأصلي:',o:['تكوين السيقان','التجدد','الانشطار','التبرعم'],a:3,ex:'التبرعم.'},
 {id:'l2-fe-q3',goal:7,lvl:1,kind:'السؤال ٣ · فقرة ٤',q:'اتحاد بويضة مع حيوان منوي، ويكون بين مخلوقين حيين مختلفين من النوع نفسه:',o:['التجدد','التبرعم','الإخصاب','التكاثر اللاجنسي'],a:2,ex:'الإخصاب.'},
 {id:'l2-as-q2',goal:4,lvl:1,kind:'السؤال ٣ · فقرة ٥',q:'العملية التي ينتج من خلالها مخلوق حي جديد من أب واحد:',o:['الانقسام الاختزالي','الانقسام المتساوي','التكاثر الجنسي','التكاثر اللاجنسي'],a:3,ex:'التكاثر اللاجنسي.'},
 {id:'l2-as-q3',goal:4,lvl:1,kind:'السؤال ٣ · فقرة ٦',q:'كل مما يلي طريقة للتكاثر اللاجنسي، <b>ما عدا</b>:',o:['التبرعم','التجدد','الانشطار','الإخصاب'],a:3,ex:'الإخصاب جزء من التكاثر الجنسي.'}]})}});
S({id:'eval3',name:'م تقويم ٤ و٥',build:function(el){return D.evalStation(el,{sid:'eval3',eyebrow:'المحطة · تقويم: السؤالان رقم ٤ و٥',title:'تقويم: الانقسام المنصف والانحرافات',qs:[
 {id:'l2-me-q1',goal:5,lvl:1,kind:'السؤال ٤ · فقرة ١',q:'ينتج عن الانقسام المنصف ………… بكل نواة نصف العدد من الكروموسومات.',o:['نواتان','ثلاث أنوية','أربع أنوية','ست أنوية'],a:2,ex:'أربع أنوية.'},
 {id:'l2-me-q2',goal:5,lvl:1,kind:'السؤال ٤ · فقرة ٢',q:'عدد الكروموسومات في الخلية الجنسية لمخلوق حي ………… عدد الكروموسومات في الخلية الأم.',o:['يساوي','نصف','ضعف','ثلاثة أضعاف'],a:1,ex:'نصف.'},
 {id:'l2-me-q3',goal:6,lvl:1,kind:'السؤال ٤ · فقرة ٣',q:'تحتوي الخلايا الجنسية عند الإنسان على ………… كروموسومًا فرديًّا.',o:['٢٣','٤٦','١٣','٣٣'],a:0,ex:'٢٣ كروموسومًا.'},
 {id:'l2-me-q5',goal:5,lvl:1,kind:'السؤال ٤ · فقرة ٤',q:'عملية يتم من خلالها إنتاج خلايا تحتوي على نصف عدد الكروموسومات:',o:['الانقسام المتساوي','الانقسام المباشر','الانقسام المنصف','التبرعم'],a:2,ex:'الانقسام المنصف (الاختزالي).'},
 {t:'tf',id:'l2-er-q1',goal:6,lvl:1,kind:'تقويم ٥ (أ) · صح أم خطأ',q:'غالبًا ما تموت البويضة المخصبة الناتجة عن الخلايا الجنسية التي حدث فيها انحراف أو خلل.',v:true,ex:'صحيح.'},
 {t:'tf',id:'l2-er-q2',goal:5,lvl:1,kind:'تقويم ٥ (ب) · صح أم خطأ',q:'تُسمى الخلايا التي تحتوي على نصف عدد الكروموسومات بالخلايا ثنائية المجموعة الكروموسومية.',v:false,ex:'الصواب: أحادية المجموعة الكروموسومية.'},
 {t:'tf',id:'l2-er-q3',goal:5,lvl:1,kind:'تقويم ٥ (ج) · صح أم خطأ',q:'يحدث الانقسام المنصف في الخلايا الجسمية.',v:false,ex:'الصواب: في الخلايا الجنسية.'},
 {t:'tf',id:'l2-er-q4',goal:6,lvl:1,kind:'تقويم ٥ (د) · صح أم خطأ',q:'الانحرافات والخلل في الانقسام المنصف شائعة الحدوث في النباتات، قليلة الحدوث في الحيوان.',v:true,ex:'صحيح.'}]})}});
S({id:'sum',name:'م الخلاصة',build:function(el){return D.summary(el,{sid:'sum',eyebrow:'المحطة · الخلاصة ص ١١١',sec:[
 ['دورة الخلية',['دورة الخلية هي المراحل والأطوار المتتابعة التي تمر بها الخلية منذ بدء أول انقسام خلوي حتى الانقسام الخلوي الذي يليه.','يشكّل الطور البيني معظم زمن دورة الخلية الحقيقية النواة.']],
 ['الانقسام المتساوي',['يتضمن الانقسام المتساوي أربعة أطوار متتالية.','يكون عدد الكروموسومات ونوعها في الأنوية الناتجة عن الانقسام المتساوي متماثلًا.']],
 ['التكاثر اللاجنسي',['في التكاثر اللاجنسي ينتج فرد جديد عن مخلوق حي واحد.','الانشطار والتبرعم والتجدد أمثلة على التكاثر اللاجنسي.']],
 ['التكاثر الجنسي',['خلال التكاثر الجنسي تندمج خليتان جنسيتان.','يبدأ الانقسام المتساوي والانقسام الخلوي بعد الإخصاب.','تحتوي الخلايا الجسمية في جسم الإنسان على ٤٦ كروموسومًا، أما خلاياه الجنسية فتحتوي على ٢٣ كروموسومًا.']],
 ['الانقسام المنصف والخلايا الجنسية',['تتضاعف الكروموسومات قبل الانقسام المنصف.','تنفصل أزواج الكروموسومات كل منهما عن الآخر خلال الطور الانفصالي الأول.','تنفصل الكروماتيدات خلال المرحلة الثانية من الانقسام المنصف.','ينتج عن الانقسام المنصف أربع خلايا جنسية.']]]})}});
D.order(L2,['intro','wonder','goals','prior','vocab','why','chromo','film','pa','result','eval1','asex','fert','eval2','meio','err','eval3','sum','memory','review'],['intro','wonder','goals','prior','vocab']);
E.lesson('l2',L2);
})();
