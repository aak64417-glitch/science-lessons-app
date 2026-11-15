/* الدرس الثاني: التكاثر والانقسام المنصف (ص ١٠٤–١١٠) */
(function(){
"use strict";
var E=window.E,$=E.$,$$=E.$$,n=E.n,h=E.h,IMG=window.IMG||{},CS=E.CS,IC=E.IC,card=E.card;
function img(k,st){return IMG[k]?'<img loading="lazy" decoding="async" src="'+IMG[k]+'" alt="" style="'+(st||'')+'">':''}
var GO=['أن يعدّد الطالب مثالين على التكاثر اللاجنسي.','أن يصف الطالب أطوار الانقسام المنصف، وكيفية تكوين الخلايا الجنسية.','أن يوضّح الطالب أهمية الانقسام المنصف في التكاثر الجنسي.','أن يوضّح الطالب كيف يحدث الإخصاب في التكاثر الجنسي.'];
var L2={title:'التكاثر والانقسام المنصف',blurb:'التكاثر اللاجنسي والجنسي، والإخصاب، والخلايا الثنائية والأحادية المجموعة الكروموسومية، وأطوار الانقسام المنصف.',stations:[]};
function S(o){L2.stations.push(o)}

/* ========== ١) المقدمة التشويقية ========== */
S({id:'intro',name:'المقدمة التشويقية',full:true,build:function(el){var THREE=window.THREE,egg,shell,glow,SP=[],cl,flash;
  return E.intro(el,{dur:25,z:12,caps:[{t:'خلية جنسية أنثوية: البويضة…',at:1,end:4.5,sub:1},{t:'وخلايا جنسية ذكرية تقترب: الحيوانات المنوية',at:4.5,end:8.3,sub:1},{t:'يتحد حيوان منوي واحد مع البويضة: <span class="gl">الإخصاب</span>',at:8.6,end:12,sub:1},{t:'تتكوّن البويضة المخصبة… ثم تبدأ بالانقسام',at:12.2,end:19.5,sub:1},{t:'فلماذا لا يتشابه شخصان تمامًا؟<br><span class="gl">ما سر الخلايا الجنسية؟</span>',at:20}],
   build:function(T){egg=new THREE.Mesh(new THREE.SphereGeometry(2.1,64,48),new THREE.MeshStandardMaterial({color:0xff9fc0,roughness:.3,transparent:true,opacity:.78,emissive:0x40101e,emissiveIntensity:.8}));T.sc.add(egg);
     var nu=new THREE.Mesh(new THREE.SphereGeometry(.6,32,24),E.mat(0xa07cff,{e:0x3a1a80,ei:.6}));nu.position.set(.3,.2,1.3);egg.add(nu);egg.userData.nu=nu;
     shell=new THREE.Mesh(new THREE.SphereGeometry(2.55,48,32),new THREE.MeshBasicMaterial({color:0xffd0e0,transparent:true,opacity:.12,depthWrite:false}));T.sc.add(shell);
     glow=new THREE.Sprite(new THREE.SpriteMaterial({map:E.glowTex('rgba(255,160,200,.9)'),transparent:true,opacity:.35,depthWrite:false,blending:THREE.AdditiveBlending}));glow.scale.set(9,9,1);T.sc.add(glow);
     flash=new THREE.Sprite(new THREE.SpriteMaterial({map:E.glowTex('rgba(255,255,255,1)'),transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));flash.scale.set(10,10,1);T.sc.add(flash);
     for(var i=0;i<9;i++){var hd=new THREE.Mesh(new THREE.SphereGeometry(.13,20,14),E.mat(0x8ff5e2,{e:0x2fe3c4,ei:1.2}));hd.scale.set(1.5,.85,.85);T.sc.add(hd);var N=24,g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(new Array(N*3).fill(0),3));var tl=new THREE.Line(g,new THREE.LineBasicMaterial({color:0x8ff5e2,transparent:true,opacity:.95}));tl.frustumCulled=false;T.sc.add(tl);
       var a=(i/9)*Math.PI*1.2-.6,s=new THREE.Vector3(8.5+Math.random()*2.5,Math.sin(a)*4.2,(Math.random()-.5)*3);var dir=s.clone().normalize();SP.push({hd:hd,tl:tl,s:s,tgt:dir.clone().multiplyScalar(i===0?2.15:2.9+Math.random()*.6),ph:Math.random()*6,win:i===0})}
     cl=E.cleave(T,{color:0xff9fc0})},
   tick:function(T,t){var e=function(a,b,x){x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};var THREE=window.THREE;
     var on=t<12.4;egg.visible=shell.visible=on;egg.rotation.y=t*.15;var z=e(8.3,9.6,t);egg.material.color.setHex(z>.5?0xffb0a0:0xff9fc0);egg.userData.nu.scale.setScalar(1+z*.35);glow.material.opacity=on?.35+Math.sin(t*2)*.05:0;
     flash.material.opacity=Math.max(0,1-Math.abs(t-9)/.8)*.8;
     SP.forEach(function(p,i){var k=p.win?e(0,8.4,t):e(0,9,t)*.98;var pos=p.s.clone().lerp(p.tgt,k);var fade=p.win?(1-e(8.4,9.2,t)):(1-e(9.5,11,t));p.hd.visible=p.tl.visible=fade>.01&&on;p.hd.material.opacity=fade;p.hd.material.transparent=true;p.tl.material.opacity=.85*fade;
       var d=p.s.clone().sub(p.tgt).normalize();p.hd.position.copy(pos);p.hd.lookAt(pos.clone().sub(d));p.hd.rotateY(Math.PI/2);
       var arr=p.tl.geometry.attributes.position.array,up=new THREE.Vector3(0,1,0).cross(d).normalize();for(var j=0;j<24;j++){var q=pos.clone().add(d.clone().multiplyScalar(.17+j*.07)).add(up.clone().multiplyScalar(Math.sin(t*14+p.ph-j*.55)*.08*(j/6)));arr[j*3]=q.x;arr[j*3+1]=q.y;arr[j*3+2]=q.z}p.tl.geometry.attributes.position.needsUpdate=true});
     cl.mesh.visible=t>=12.2;if(t>=12.2){cl.update(t,[13.2,15.4,17.6,19.8]);cl.mesh.material.opacity=.75*e(12.2,13,t);cl.mesh.rotation.y=t*.2}
     var cam=T.cam;cam.position.z=12-e(0,8,t)*3+e(12,22,t)*1.5;cam.position.x=1.2+Math.sin(t*.12)*.6;cam.position.y=.3+Math.cos(t*.1)*.3;cam.lookAt(0,0,0)}})}});

/* ========== ٢) ماذا ستتعلم اليوم؟ ========== */
S({id:'wonder',name:'ماذا ستتعلم اليوم؟',build:function(el){return E.wonder(el,{eyebrow:'الدرس الثاني · التكاثر والانقسام المنصف',items:[
  {ic:IC.bud,t:'كيف ينتج مخلوق حي بمفرده أفرادًا جديدة؟'},{ic:IC.egg,t:'كيف يحدث الإخصاب؟'},{ic:IC.chromo,t:'لماذا تحمل الخلية الجنسية نصف عدد الكروموسومات؟'},{ic:IC.four,t:'كيف تنتج أربع خلايا جنسية من خلية واحدة؟'},{ic:IC.q,t:'لماذا لا يتشابه شخصان تمامًا؟'}]})}});

/* ========== ٣) الأهداف ========== */
S({id:'goals',kind:'goals',name:'أهداف الدرس',build:function(el){return E.goalsScreen(el,{eyebrow:'انقسام الخلية وتكاثرها · ص ١٠٤–١١٠',idea:'تعود أهمية الانقسام المنصف والتكاثر الجنسي إلى عدم وجود شخصين متشابهين تمامًا.',goals:[{ic:IC.bud,t:GO[0]},{ic:IC.four,t:GO[1]},{ic:IC.chromo,t:GO[2]},{ic:IC.egg,t:GO[3]}]})}});

/* ========== ٤) المعرفة السابقة ========== */
S({id:'prior',name:'المعرفة السابقة',build:function(el){el.innerHTML='<div class="eyebrow">تهيئة · ماذا تتذكر من الصف الأول المتوسط؟</div><h1 class="t">ماذا تعرف قبل أن نبدأ؟</h1><div class="row grow" style="min-height:0"><div class="card pcard" style="flex:.8;padding:14px;justify-content:center">'+img('g_hydra','height:300px;width:100%;object-fit:cover;border-radius:16px')+'<p class="big" style="margin:0">هل تتذكر هذا الحيوان اللافقاري؟ <b class="reveal gl">إنه الهيدرا، ويستطيع التكاثر لاجنسيًا.</b></p></div><div class="col grow side" id="pp"></div></div>';
  E.poll($('#pp',el),{compact:1,q:'كم فردًا يلزم ليحدث التكاثر الجنسي؟',o:['فرد واحد','فردان','لا أعرف']});
  E.poll($('#pp',el),{compact:1,q:'في جسم الإنسان ٤٦ كروموسومًا. كم كروموسومًا تتوقع في الحيوان المنوي؟',o:['٤٦','٢٣','٩٢']});
  E.poll($('#pp',el),{compact:1,q:'لماذا لا يتشابه الإخوة تمامًا مع أنهم من الأبوين نفسيهما؟',o:['بسبب الطعام فقط','لأن كل خلية جنسية تحمل مجموعة مختلفة من الكروموسومات','لا أعرف']});return {}}});

/* ========== ٥) م١ التكاثر اللاجنسي ========== */
var AS=[{k:'fis',n:'الانشطار',ex:'البكتيريا، والأوليات مثل الأميبا والبراميسيوم',im:'g_fission',d:'ينقسم المخلوق الوحيد الخلية إلى خليتين متماثلتين.'},
 {k:'bud',n:'التبرعم',ex:'الهيدرا، وفطر الخميرة',im:'g_hydrad',d:'ينمو من المخلوق الأصلي فرد صغير مطابق له، ثم ينفصل عنه أو يبقى متصلًا به.'},
 {k:'reg',n:'التجدد',ex:'نجم البحر، والديدان المفلطحة',im:'g_star',d:'ينمو فرد كامل جديد من جزء انفصل عن المخلوق الحي.'},
 {k:'tub',n:'الدرنات',ex:'البطاطس',im:'g_potato',d:'تنمو نباتات جديدة من البراعم الموجودة على الدرنة.'},
 {k:'run',n:'السيقان الجارية',ex:'الفراولة',im:'g_straw',d:'تمتد سيقان أفقية فوق سطح التربة، وتنمو منها نباتات جديدة.'}];
function asexDraw(x,k,t){var W=600,H=360;x.clearRect(0,0,W,H);var e=CS.ez,u=(t%6)/6;x.save();x.lineCap='round';x.lineJoin='round';
  if(k==='fis'){var p=e(u*1.6-.2),sep=e(u*1.6-.8)*60;if(p<1)CS.animal(x,{cx:300,cy:180,rx:120+p*40,ry:90,pinch:p*.9});else{CS.animal(x,{cx:220-sep*.3,cy:180,rx:85,ry:80});CS.animal(x,{cx:380+sep*.3,cy:180,rx:85,ry:80})}[[-1],[1]].forEach(function(s){x.beginPath();x.arc(300+s[0]*(p*70+(p>=1?sep*.3+10:0)),180,22,0,7);x.fillStyle='#a07cff';x.fill()})}
  if(k==='bud'){var g=e(u*1.5),off=e(u*1.6-1)*80;x.strokeStyle='#2a8f84';x.lineWidth=26;x.beginPath();x.moveTo(250,330);x.lineTo(250,120);x.stroke();for(var i=-2;i<=2;i++){x.lineWidth=7;x.beginPath();x.moveTo(250,120);x.quadraticCurveTo(250+i*30,60,250+i*45,40+Math.sin(t*3+i)*6);x.stroke()}
    var bx=250+40*g+off,by=230-off*.3;x.lineWidth=14*g+2;x.beginPath();x.moveTo(off>0?bx-20:262,by+10);x.lineTo(bx+40*g,by-60*g);x.stroke();if(g>.6)for(i=-1;i<=1;i++){x.lineWidth=4;x.beginPath();x.moveTo(bx+40*g,by-60*g);x.lineTo(bx+40*g+i*18,by-95*g);x.stroke()}x.fillStyle='#0b3a4a';x.font='700 24px Readex Pro';x.textAlign='center';x.fillText('برعم',bx+70,by+10)}
  if(k==='reg'){var gr=e(u*1.5);function arm(a,L){x.save();x.translate(300,190);x.rotate(a);x.fillStyle='#ff9a4a';x.beginPath();x.moveTo(-18,0);x.quadraticCurveTo(-8,-L*.6,0,-L);x.quadraticCurveTo(8,-L*.6,18,0);x.fill();x.restore()}arm(0,130);for(var j=1;j<5;j++)arm(j*Math.PI*2/5,10+gr*120);x.beginPath();x.arc(300,190,24,0,7);x.fillStyle='#ff9a4a';x.fill();x.fillStyle='#0b3a4a';x.font='700 22px Readex Pro';x.textAlign='center';x.fillText('ذراع منفصلة تتجدد إلى نجم كامل',300,345)}
  if(k==='tub'){var s2=e(u*1.4);x.fillStyle='#8a6b4a';x.fillRect(0,250,W,110);x.fillStyle='#c9a06a';x.beginPath();x.ellipse(300,280,120,70,0,0,7);x.fill();[[230,240],[300,215],[370,240]].forEach(function(b,i){x.strokeStyle='#5ccf6a';x.lineWidth=8;x.beginPath();x.moveTo(b[0],b[1]);x.lineTo(b[0]+(i-1)*20,b[1]-s2*(140-i%2*30));x.stroke();if(s2>.5){x.fillStyle='#5ccf6a';x.beginPath();x.ellipse(b[0]+(i-1)*20+16,b[1]-s2*(140-i%2*30)+10,18*s2,8*s2,-.5,0,7);x.fill()}x.fillStyle='#6a4b2a';x.beginPath();x.arc(b[0],b[1]+4,7,0,7);x.fill()});x.fillStyle='#0b3a4a';x.font='700 22px Readex Pro';x.textAlign='center';x.fillText('براعم على الدرنة',300,350)}
  if(k==='run'){var r=e(u*1.4);x.fillStyle='#8a6b4a';x.fillRect(0,290,W,70);function pl(px,s){x.fillStyle='#4fbf5a';for(var i=-2;i<=2;i++){x.beginPath();x.ellipse(px+i*16*s,290-40*s,14*s,30*s,i*.35,0,7);x.fill()}x.fillStyle='#ff4a5a';if(s>.8){x.beginPath();x.arc(px+30,290-18,9,0,7);x.fill()}}pl(130,1.2);x.strokeStyle='#7ed46a';x.lineWidth=5;x.beginPath();x.moveTo(150,288);x.quadraticCurveTo(300,250,150+r*330,288);x.stroke();if(r>.7)pl(480,(r-.7)/.3*.9);x.fillStyle='#0b3a4a';x.font='700 22px Readex Pro';x.textAlign='center';x.fillText('ساق جارية',320,240)}
  x.restore()}
S({id:'asexual',name:'م١ التكاثر اللاجنسي',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ١ · التكاثر اللاجنسي ص ١٠٤–١٠٥</div><h1 class="t" style="font-size:42px">فرد واحد… ينتج أفرادًا جديدة</h1><p class="lead" style="margin:0 0 8px"><b class="gl">التكاثر اللاجنسي:</b> تكاثر يكون فيه المخلوق الحي قادرًا بمفرده على إنتاج فرد أو أكثر يحمل المادة الوراثية نفسها.</p><div class="chips" id="at">'+AS.map(function(a,i){return '<button class="chip" data-a="'+i+'" aria-pressed="'+(i===0)+'">'+n(i+1)+') '+a.n+'</button>'}).join('')+'</div>'+
   '<div class="row grow" style="min-height:0;margin-top:10px"><div class="col" style="flex:1.2;min-height:0"><canvas class="sim" id="ac" width="600" height="360" style="flex:1;min-height:0;height:100%"></canvas></div><div class="col grow side" style="gap:10px"><div class="card pcard" id="ai" style="padding:12px"></div></div></div>';
  var cv=$('#ac',el),x=cv.getContext('2d'),cur=0,t=0,raf=0,last=0;
  function show(i){cur=i;t=0;var a=AS[i];$$('[data-a]',el).forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.a===i)});$('#ai',el).innerHTML='<h3 style="margin:0;font-size:30px">'+a.n+'</h3>'+img(a.im,'height:230px')+'<p class="big" style="margin:0">'+a.d+'</p><p style="margin:0;font-size:21px"><b class="gl">أمثلة:</b> <span class="reveal">'+a.ex+'</span></p><p class="hint" style="margin:0">اسأل الطلاب عن أمثلة أولًا، ثم اضغط «كشف التفسير».</p>';E.sfx.tick()}
  $$('[data-a]',el).forEach(function(b){b.onclick=function(){show(+b.dataset.a)}});show(0);
  function loop(ts){raf=requestAnimationFrame(loop);var dt=Math.min(.05,(ts-(last||ts))/1000);last=ts;if(!E.paused)t+=dt;asexDraw(x,AS[cur].k,t)}
  return {enter:function(){if(!raf){last=0;raf=requestAnimationFrame(loop)}},leave:function(){cancelAnimationFrame(raf);raf=0}}}});

/* ========== ٦) م٢ صنّف طرق التكاثر اللاجنسي ========== */
S({id:'asort',name:'م٢ صنّف المخلوقات',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٢ · تطبيق: أنواع التكاثر اللاجنسي</div><h1 class="t" style="font-size:42px">كيف يتكاثر كل مخلوق؟</h1><div class="grow side col" style="gap:12px;min-height:0" id="sb"></div>';var b=$('#sb',el);
  E.sort(b,{id:'l2-as-sort',goal:1,lvl:2,q:'اسحب كل مخلوق حي إلى طريقة تكاثره اللاجنسي:',bins:AS.map(function(a){return a.n}),items:[{t:'البكتيريا',b:0},{t:'الأميبا',b:0},{t:'الهيدرا',b:1},{t:'فطر الخميرة',b:1},{t:'نجم البحر',b:2},{t:'الديدان المفلطحة',b:2},{t:'البطاطس',b:3},{t:'الفراولة',b:4}],ex:'الانشطار: البكتيريا والأميبا · التبرعم: الهيدرا والخميرة · التجدد: نجم البحر والديدان المفلطحة · الدرنات: البطاطس · السيقان الجارية: الفراولة.'});
  var row=h('<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px"></div>');b.appendChild(row);
  [{id:'l2-as-q1',goal:1,lvl:1,q:'نسخة صغيرة مطابقة تمامًا للفرد الناضج تنمو من المخلوق الحي الأصلي:',o:['تكوين السيقان','التجدد','الانشطار','التبرعم'],a:3,cols:2,ex:'هذا وصف التبرعم، كما في الهيدرا.'},{id:'l2-as-q2',goal:1,lvl:1,q:'العملية التي ينتج من خلالها مخلوق حي جديد من أب واحد:',o:['الانقسام المنصف','الانقسام المتساوي','التكاثر الجنسي','التكاثر اللاجنسي'],a:3,cols:2,ex:'التكاثر اللاجنسي يحتاج إلى فرد واحد فقط.'},{id:'l2-as-q3',goal:1,lvl:2,q:'كل مما يلي طريقة للتكاثر اللاجنسي، <b>ما عدا</b>:',o:['التبرعم','التجدد','الانشطار','الإخصاب'],a:3,cols:2,ex:'الإخصاب جزء من التكاثر الجنسي.'}].forEach(function(q){var d=h('<div></div>');row.appendChild(d);E.mcq(d,q)});return {}}});

/* ========== ٧) م٣ التكاثر الجنسي والإخصاب ========== */
S({id:'fert',name:'م٣ الإخصاب',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٣ · التكاثر الجنسي ص ١٠٥–١٠٦</div><h1 class="t" style="font-size:42px">التكاثر الجنسي: اتحاد خليتين جنسيتين</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1.35;gap:10px;min-height:0"><canvas class="sim" id="fc" width="1000" height="560" style="flex:1;min-height:0;height:100%"></canvas><div class="qa" style="margin:0"><button class="btn" id="fG">🔬 ابدأ الإخصاب</button><button class="btn ghost" id="fR">↺ من جديد</button><span class="hint">الأرقام تمثّل عدد الكروموسومات في خلايا الإنسان.</span></div></div>'+
   '<div class="col grow side" style="gap:10px">'+card('المفردات','<div style="font-size:19px;line-height:1.7"><b class="gl">التكاثر الجنسي:</b> اتحاد خليتين جنسيتين معًا، مثل اتحاد البويضة مع الحيوان المنوي، ويتطلب وجود فردين.<br><b class="gl">البويضة:</b> الخلية الجنسية الناتجة عن الأعضاء التناسلية الأنثوية.<br><b class="gl">الحيوان المنوي:</b> الخلية الجنسية الناتجة عن الأعضاء التناسلية الذكرية.<br><b class="gl">الإخصاب:</b> اتحاد البويضة مع الحيوان المنوي.<br><b class="gl">البويضة المخصبة:</b> الخلية الناتجة عن الإخصاب.</div>')+'<div id="fq" class="col" style="gap:10px"></div></div></div>';
  var cv=$('#fc',el),x=cv.getContext('2d'),t=-1,raf=0,last=0,amb=0;
  function txt(s,X,Y,sz,c){x.font='700 '+sz+'px Readex Pro';x.textAlign='center';x.textBaseline='middle';x.fillStyle=c||'#0b3a4a';x.fillText(s,X,Y)}
  function draw(){x.clearRect(0,0,1000,560);var e=CS.ez,k=t<0?0:t;var EX=430,EY=290;
    var fused=e((k-3.2)/1.2),div=e((k-5)/1.4);
    if(div<.01){x.beginPath();x.arc(EX,EY,190,0,7);var g=x.createRadialGradient(EX-40,EY-40,10,EX,EY,190);g.addColorStop(0,'#ffd9e6');g.addColorStop(1,'#f7b8cf');x.fillStyle=g;x.fill();x.lineWidth=10;x.strokeStyle='#e7a2bf';x.stroke();
      var nx=EX+CS.lerp(-40,0,fused);x.beginPath();x.arc(nx,EY,52+fused*14,0,7);x.fillStyle='#b48ae0';x.fill();txt(fused>.5?'٤٦':'٢٣',nx,EY,fused>.5?44:38,'#2a0f4a');
      txt(fused>.5?'البويضة المخصبة':'البويضة',EX,EY+150,28,'#9b2c5a')}
    else{[-1,1].forEach(function(s){var cx=EX+s*110*div;x.beginPath();x.arc(cx,EY,190-div*80,0,7);x.fillStyle='#fbd3e1';x.fill();x.lineWidth=4;x.strokeStyle='#c2557d';x.stroke();x.beginPath();x.arc(cx,EY,46,0,7);x.fillStyle='#b48ae0';x.fill();txt('٤٦',cx,EY,36,'#2a0f4a')});txt('تنقسم البويضة المخصبة انقسامًا متساويًا',EX,EY+215,26,'#0f766e')}
    for(var i=0;i<6;i++){var win=i===0,a=(i-2.5)*.32,sx=960,sy=EY+Math.sin(a)*240,tx=EX+Math.cos(a)*(win?150:235),ty=EY+Math.sin(a)*(win?150:235)*.9,p=win?e(k/2.6):Math.min(.92,e(k/2.8)),hx=CS.lerp(sx,tx,p),hy=CS.lerp(sy,ty,p);var al=win?1-e((k-2.7)/.5):1-e((k-4)/1);if(t<0){hx=sx-60-i*8;hy=sy;al=1}if(al<.02)continue;x.save();x.globalAlpha=al;var ang=Math.atan2(ty-sy,tx-sx);x.translate(hx,hy);x.rotate(ang);x.strokeStyle='#0f766e';x.lineWidth=3;x.beginPath();for(var j=0;j<30;j++){var X=-14-j*4,Y=Math.sin(amb*12+i-j*.5)*j*.35;j?x.lineTo(X,Y):x.moveTo(X,Y)}x.stroke();x.fillStyle='#0f9d8a';x.beginPath();x.ellipse(0,0,18,11,0,0,7);x.fill();x.restore();if(win&&p<.98){txt('٢٣',hx,hy-26,22,'#0f766e')}}
    if(t<0)txt('الحيوانات المنوية',880,EY-270+20,24,'#0f766e')}
  function loop(ts){raf=requestAnimationFrame(loop);var dt=Math.min(.05,(ts-(last||ts))/1000);last=ts;if(E.paused)return;amb+=dt;if(t>=0&&t<7)t+=dt;draw()}
  $('#fG',el).onclick=function(){t=0;E.sfx.whoosh();setTimeout(function(){E.complete('fert')},6000)};$('#fR',el).onclick=function(){t=-1};
  var q=$('#fq',el);
  E.mcq(q,{id:'l2-fe-q1',goal:4,lvl:1,q:'ما عدد الكروموسومات في الحيوان المنوي في الإنسان؟',o:['٢٣','٨','٤٦','١١'],a:0,cols:4,ex:'الحيوان المنوي خلية جنسية فيها نصف العدد: ٢٣.'});
  E.mcq(q,{id:'l2-fe-q2',goal:4,lvl:1,q:'تُسمّى الخلية التي تنتج عن الإخصاب:',o:['البويضة','البويضة المخصبة','الحيوان المنوي','الكروموسوم'],a:1,cols:2,ex:'ينتج عن الإخصاب البويضة المخصبة.'});
  E.mcq(q,{id:'l2-fe-q3',goal:4,lvl:2,q:'اتحاد بويضة مع حيوان منوي، ويكون بين مخلوقين حيين مختلفين من النوع نفسه:',o:['التجدد','التبرعم','الإخصاب','التكاثر اللاجنسي'],a:2,cols:2,ex:'هذا تعريف الإخصاب.'});
  return {enter:function(){if(!raf){last=0;raf=requestAnimationFrame(loop)}},leave:function(){cancelAnimationFrame(raf);raf=0}}}});

/* ========== ٨) م٤ ثنائي وأحادي المجموعة الكروموسومية ========== */
S({id:'ploidy',name:'م٤ ثنائي وأحادي',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٤ · أنواع خلايا الجسم ص ١٠٦</div><h1 class="t" style="font-size:42px">خلية جسمية أم خلية جنسية؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1.2;gap:10px;min-height:0"><div class="chips"><button class="chip" data-v="2" aria-pressed="true">خلية جسمية (ثنائية المجموعة)</button><button class="chip" data-v="1" aria-pressed="false">خلية جنسية (أحادية المجموعة)</button></div><canvas class="sim" id="pc" width="1000" height="520" style="flex:1;min-height:0;height:100%"></canvas>'+
   '<div class="card reveal" style="padding:10px 16px"><div style="font-size:20px;line-height:1.7"><b class="gl">ثنائية المجموعة الكروموسومية:</b> الخلايا الجسمية، فيها أزواج من الكروموسومات المتماثلة؛ في الإنسان ٢٣ زوجًا (٤٦).<br><b class="gl">أحادية المجموعة الكروموسومية:</b> الخلايا الجنسية، فيها كروموسوم واحد من كل زوج متماثل؛ أي نصف العدد (٢٣ في الإنسان).</div></div></div>'+
   '<div class="col grow side" id="pq" style="gap:10px"></div></div>';
  var cv=$('#pc',el),x=cv.getContext('2d'),v=2;var LEN=[150,120,90,50];
  function draw(){x.clearRect(0,0,1000,520);CS.animal(x,{cx:500,cy:250,rx:v===2?420:300,ry:220});CS.nucleus(x,500,250,v===2?190:150,1);
    LEN.forEach(function(L,i){var cx=v===2?310+i*125:395+i*70;if(v===2){CS.chromatid(x,{x:cx-20,y:250,L:L,col:CS.RC,a:1,w:16});CS.chromatid(x,{x:cx+20,y:250,L:L,col:CS.BC,a:1,w:16})}else CS.chromatid(x,{x:cx,y:250,L:L,col:i%2?CS.BC:CS.RC,a:1,w:16})});
    x.font='700 30px Readex Pro';x.textAlign='center';x.fillStyle='#0b3a4a';x.fillText(v===2?'٤ أزواج = ٨ كروموسومات (٢ن)':'٤ كروموسومات: واحد من كل زوج (ن)',500,500);x.font='600 20px IBM Plex Sans Arabic';x.fillStyle='#53656e';x.fillText('نموذج لخلية ذبابة الفاكهة',500,30)}
  $$('[data-v]',el).forEach(function(b){b.onclick=function(){v=+b.dataset.v;$$('[data-v]',el).forEach(function(z){z.setAttribute('aria-pressed',z===b)});draw();E.sfx.pop()}});draw();
  var q=$('#pq',el);
  E.table(q,{id:'l2-pl-tb',goal:3,lvl:2,q:'أكمل عدد الكروموسومات في الخلايا الجنسية (ن):',cols:['المخلوق','الخلية الجسمية (٢ن)','الخلية الجنسية (ن)'],rows:[['الإنسان','٤٦',{a:'23'}],['ذبابة الفاكهة','٨',{a:'4'}],['الحصان','٦٤',{a:'32'}],['الحمار','٦٢',{a:'31'}]],ex:'الخلية الجنسية فيها نصف عدد كروموسومات الخلية الجسمية.'});
  E.mcq(q,{id:'l2-pl-q1',goal:3,lvl:1,q:'تحتوي الخلايا الجنسية عند الإنسان على ………… كروموسومًا.',o:['٢٣','٤٦','١٣','٣٣'],a:0,cols:4,ex:'٢٣ كروموسومًا: واحد من كل زوج.'});
  E.tf(q,{id:'l2-pl-tf',goal:3,lvl:2,q:'تُسمّى الخلايا التي تحتوي على نصف عدد الكروموسومات خلايا ثنائية المجموعة الكروموسومية.',v:false,ex:'تُسمّى خلايا <b>أحادية</b> المجموعة الكروموسومية.'});
  return {}}});

/* ========== ٩) م٥ مختبر الانقسام المنصف ========== */
S({id:'meiosis',name:'م٥ مختبر الانقسام المنصف',build:function(el){return E.phaseLab(el,{eyebrow:'المحطة ٥ · الانقسام المنصف (الاختزالي) ص ١٠٦–١٠٨',title:'مختبر الانقسام المنصف: من خلية واحدة إلى أربع',draw:E.drawMeiosis,P:E.MEI,
  qs:function(q){q.insertAdjacentHTML('beforeend',card('','<p class="hint" style="margin:0">نموذج مبسّط لخلية فيها ٤ كروموسومات (زوجان متماثلان). الأحمر من الأم والأزرق من الأب.</p>'));
    E.mcq(q,{id:'l2-me-q1',goal:2,lvl:1,q:'ينتج عن الانقسام المنصف ………… بكل نواة نصف العدد من الكروموسومات.',o:['نواتان','ثلاث أنوية','أربع أنوية','ست أنوية'],a:2,cols:2,ex:'ينتج الانقسام المنصف أربع أنوية (أربع خلايا).'});
    E.mcq(q,{id:'l2-me-q2',goal:2,lvl:2,q:'ما الذي ينفصل في الطور الانفصالي <b>الأول</b>؟',o:['الكروماتيدات','الكروموسومات المتماثلة في كل زوج','المريكزات فقط','الغلاف النووي'],a:1,ex:'في الانفصالي الأول ينفصل كروموسوما كل زوج متماثل دون انفصال السنترومير، أما الكروماتيدات فتنفصل في الانفصالي الثاني.'})}})}});

/* ========== ١٠) م٦ المتساوي أم المنصف؟ ========== */
S({id:'mvm',name:'م٦ المتساوي أم المنصف؟',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٦ · أهمية الانقسام المنصف في التكاثر الجنسي</div><h1 class="t" style="font-size:42px">لماذا لا يتشابه شخصان تمامًا؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1.1;gap:10px;min-height:0">'+
   card('🎲 مولّد الخلايا الجنسية','<p style="margin:0 0 6px;font-size:19px">في كل خلية جنسية كروموسوم واحد من كل زوج، يأتي إما من الأم (أحمر) أو من الأب (أزرق). اضغط «كوّن خلية جنسية» مرات عدة.</p><svg id="gz" viewBox="0 0 700 250" style="width:100%;height:230px"></svg><div class="qa" style="margin:0"><button class="btn" id="gG">🎲 كوّن خلية جنسية</button><span class="big">تركيبات مختلفة ظهرت: <b class="num gl" id="gk">٠</b> من <b class="num">٤</b></span></div>')+
   '<div class="card reveal" style="padding:12px 16px;font-size:20px;line-height:1.7">مع زوجين من الكروموسومات توجد <b class="gl">٤</b> تركيبات مختلفة. في الإنسان ٢٣ زوجًا؛ لذا يمكن أن تنتج الخلية الواحدة أكثر من <b class="gl">٨ ملايين</b> تركيبة مختلفة من الكروموسومات (٢ مرفوعة للأس ٢٣)، ثم يتحد حيوان منوي مع بويضة في الإخصاب؛ فلا يتشابه شخصان تمامًا.<br><b>ويحافظ الانقسام المنصف على عدد الكروموسومات ثابتًا من جيل إلى جيل:</b> ٢٣ + ٢٣ = ٤٦.</div></div><div class="col grow side" id="mq" style="gap:10px"></div></div>';
  var seen={},svg=$('#gz',el);function chrom(xp,y,L,c){return '<g><line x1="'+(xp-8)+'" y1="'+(y-L/2)+'" x2="'+xp+'" y2="'+y+'" stroke="'+c+'" stroke-width="13" stroke-linecap="round"/><line x1="'+xp+'" y1="'+y+'" x2="'+(xp-8)+'" y2="'+(y+L/2)+'" stroke="'+c+'" stroke-width="13" stroke-linecap="round"/><line x1="'+(xp+8)+'" y1="'+(y-L/2)+'" x2="'+xp+'" y2="'+y+'" stroke="'+c+'" stroke-width="13" stroke-linecap="round"/><line x1="'+xp+'" y1="'+y+'" x2="'+(xp+8)+'" y2="'+(y+L/2)+'" stroke="'+c+'" stroke-width="13" stroke-linecap="round"/><circle cx="'+xp+'" cy="'+y+'" r="6" fill="#ffe29a"/></g>'}
  function single(xp,y,L,c){return '<line x1="'+xp+'" y1="'+(y-L/2)+'" x2="'+xp+'" y2="'+(y+L/2)+'" stroke="'+c+'" stroke-width="13" stroke-linecap="round"/>'}
  function draw(a,b){var R=CS.RC,B=CS.BC;svg.innerHTML='<ellipse cx="170" cy="110" rx="150" ry="100" fill="rgba(255,179,122,.18)" stroke="#ffb37a" stroke-width="3"/>'+chrom(110,110,120,R)+chrom(145,110,120,B)+chrom(200,110,70,R)+chrom(235,110,70,B)+'<text x="170" y="240" text-anchor="middle" fill="#a9bddf" font-size="18" font-family="IBM Plex Sans Arabic">الخلية الأم (٢ن = ٤)</text><path d="M340 110h60" stroke="#ffe29a" stroke-width="4" marker-end="url(#ar)"/><defs><marker id="ar" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="#ffe29a"/></marker></defs>'+
    (a==null?'<text x="560" y="115" text-anchor="middle" fill="#a9bddf" font-size="22" font-family="IBM Plex Sans Arabic">؟</text>':'<circle cx="560" cy="110" r="90" fill="rgba(255,179,122,.18)" stroke="#ffb37a" stroke-width="3"/>'+single(530,110,110,a?B:R)+single(590,110,64,b?B:R)+'<text x="560" y="240" text-anchor="middle" fill="#ffe29a" font-size="18" font-family="Readex Pro">خلية جنسية (ن = ٢)</text>')}
  draw(null);$('#gG',el).onclick=function(){var a=Math.random()<.5?1:0,b=Math.random()<.5?1:0;seen[a+''+b]=1;draw(a,b);$('#gk',el).textContent=n(Object.keys(seen).length);E.sfx.pop();if(Object.keys(seen).length===4)E.toast('ظهرت التركيبات الأربع كلها!')};
  var q=$('#mq',el);
  E.table(q,{id:'l2-mvm-tb',goal:3,lvl:2,q:'قارن بين نوعي الانقسام:',cols:['وجه المقارنة','الانقسام المتساوي','الانقسام المنصف'],rows:[['يحدث في',{a:'الخلايا الجسمية',opts:['الخلايا الجسمية','الخلايا الجنسية']},{a:'الخلايا الجنسية',opts:['الخلايا الجسمية','الخلايا الجنسية']}],['عدد مرات انقسام الخلية',{a:'1',opts:['1','2']},{a:'2',opts:['1','2']}],['عدد الخلايا الناتجة',{a:'2',opts:['2','4']},{a:'4',opts:['2','4']}],['عدد الكروموسومات في الخلية الناتجة',{a:'العدد نفسه',opts:['العدد نفسه','النصف']},{a:'النصف',opts:['العدد نفسه','النصف']}]],ex:'المتساوي: مرة واحدة ← خليتان بالعدد نفسه. المنصف: مرتان ← أربع خلايا جنسية بنصف العدد.'});
  E.mcq(q,{id:'l2-mvm-q1',goal:3,lvl:1,q:'عدد الكروموسومات في الخلية الجنسية لمخلوق حي ………… عدد الكروموسومات في الخلية الأم.',o:['يساوي','نصف','ضعف','ثلاثة أضعاف'],a:1,cols:4,ex:'الخلية الجنسية فيها نصف العدد.'});
  E.mcq(q,{id:'l2-mvm-q2',goal:3,lvl:2,q:'عملية يتم من خلالها إنتاج خلايا تحتوي على نصف عدد الكروموسومات:',o:['الانقسام المتساوي','الانقسام المباشر','الانقسام المنصف','التبرعم'],a:2,cols:2,ex:'الانقسام المنصف (الاختزالي).'});
  E.mcq(q,{id:'l2-mvm-q3',goal:3,lvl:3,q:'ماذا يحدث لو أنتجت الخلايا الجنسية بالانقسام المتساوي بدلًا من المنصف؟',o:['يبقى عدد الكروموسومات ثابتًا في الأجيال','يتضاعف عدد الكروموسومات في كل جيل جديد','يقل عدد الكروموسومات إلى النصف','لا يحدث إخصاب'],a:1,ex:'لو كان في كل خلية جنسية ٤٦ لكان في البويضة المخصبة ٩٢، ثم يتضاعف العدد في كل جيل. الانقسام المنصف يمنع ذلك.'});
  return {}}});

/* ========== ١١) م٧ الخلل في الانقسام المنصف ========== */
S({id:'errors',name:'م٧ الخلل في الانقسام',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٧ · الانحرافات والخلل في الانقسام المنصف ص ١٠٩</div><h1 class="t" style="font-size:42px">عندما يختل الانقسام المنصف</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1.15;gap:10px;min-height:0">'+
   card('ما الخلل في الانقسام المنصف؟','<ul style="margin:0;font-size:20px;line-height:1.75"><li>أن ينتج عن الانقسام المنصف خلايا جنسية تحتوي على عدد <b class="gl">أكبر أو أقل</b> من الكروموسومات.</li><li class="reveal">هذه الانحرافات شائعة الحدوث في النباتات، وقليلة الحدوث في الحيوانات.</li><li class="reveal">غالبًا ما تموت البويضة المخصبة الناتجة عن خلايا جنسية حدث فيها خلل.</li><li class="reveal">إذا نمت، يكون عدد الكروموسومات في خلايا المخلوق الناتج غير معتاد؛ فلا ينمو نموًا طبيعيًا، وتحدث متلازمات مثل متلازمة داون (وجود كروموسوم إضافي).</li></ul>')+
   '<div class="card" style="padding:12px 16px"><h3 style="margin:0 0 6px">🐴 مثال: عدد كروموسومات غير معتاد</h3><div class="row" style="align-items:center;gap:14px">'+img('g_mule','width:300px;border-radius:12px;background:#fff')+'<div style="font-size:20px;line-height:1.8">خلية جنسية من الحصان: <b class="num gl">٣٢</b><br>خلية جنسية من الحمار: <b class="num gl">٣١</b><br>البغل الناتج: <b class="num reveal" style="color:var(--au)">٣٢ + ٣١ = ٦٣ كروموسومًا</b></div></div><p class="hint reveal" style="margin:6px 0 0">العدد الفردي لا يسمح بتكوّن أزواج متماثلة كاملة في الانقسام المنصف؛ لذا لا يُنتج البغل عادةً خلايا جنسية سليمة.</p></div></div>'+
   '<div class="col grow side" id="eq" style="gap:10px"></div></div>';
  var q=$('#eq',el);
  E.problem(q,{id:'l2-er-p',goal:2,lvl:2,q:'اتحدت خلية جنسية من حصان (٣٢ كروموسومًا) مع خلية جنسية من حمار (٣١ كروموسومًا). كم كروموسومًا في خلايا البغل الناتج؟',label:'العدد',a:63,steps:'٣٢ + ٣١ = ٦٣ كروموسومًا.'});
  E.tf(q,{id:'l2-er-tf1',goal:2,lvl:1,q:'غالبًا ما تموت البويضة المخصبة الناتجة عن خلايا جنسية حدث فيها خلل.',v:true,ex:'صحيح.'});
  E.tf(q,{id:'l2-er-tf2',goal:2,lvl:1,q:'يحدث الانقسام المنصف في الخلايا الجسمية.',v:false,ex:'يحدث الانقسام المنصف لتكوين <b>الخلايا الجنسية</b>.'});
  E.tf(q,{id:'l2-er-tf3',goal:2,lvl:2,q:'الانحرافات والخلل في الانقسام المنصف شائعة الحدوث في النباتات، قليلة الحدوث في الحيوانات.',v:true,ex:'صحيح.'});
  return {}}});

/* ========== ١٢) م٨ سباق الفرق ========== */
var RACE=[{q:'التكاثر الذي يحتاج إلى فرد واحد فقط:',o:['التكاثر الجنسي','التكاثر اللاجنسي','الإخصاب','الانقسام المنصف'],a:1},
 {q:'يتكاثر فطر الخميرة لاجنسيًا بـ:',o:['التجدد','الدرنات','التبرعم','السيقان الجارية'],a:2},
 {q:'تتكاثر الفراولة لاجنسيًا بـ:',o:['السيقان الجارية','التبرعم','الانشطار','التجدد'],a:0},
 {q:'عدد الكروموسومات في البويضة المخصبة في الإنسان:',o:['٢٣','٤٦','٩٢','٨'],a:1},
 {q:'عدد الخلايا الناتجة عن الانقسام المنصف لخلية واحدة:',o:['٢','٣','٤','٨'],a:2},
 {q:'خلية جسمية في نبات فيها ٢٤ كروموسومًا. كم كروموسومًا في خلاياه الجنسية؟',o:['٤٨','٢٤','١٢','٦'],a:2},
 {q:'في أي طور من الانقسام المنصف تتجمع الكروموسومات المتماثلة في أزواج؟',o:['التمهيدي الأول','الاستوائي الثاني','الانفصالي الثاني','النهائي الأول'],a:0},
 {q:'في أي طور ينفصل السنترومير وتنفصل الكروماتيدات في الانقسام المنصف؟',o:['الانفصالي الأول','الانفصالي الثاني','التمهيدي الأول','الاستوائي الأول'],a:1},
 {q:'الخلية الجنسية في الإنسان:',o:['ثنائية المجموعة الكروموسومية','أحادية المجموعة الكروموسومية','فيها ٤٦ كروموسومًا','تنتج بالانقسام المتساوي'],a:1},
 {q:'من أمثلة التكاثر بالتجدد:',o:['البكتيريا','البطاطس','نجم البحر','الخميرة'],a:2}];
S({id:'race',name:'م٨ سباق الفرق',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٨ · مسابقة الفرق الأربعة</div><div class="row" style="align-items:center;gap:18px"><h1 class="t" style="font-size:44px;margin:0">سباق الخلايا</h1><span class="tag gold">يجيب كل فريق بدوره · ١٠ نقاط للإجابة الصحيحة</span><button class="btn ghost" id="rT" style="margin-inline-start:auto">⏱ ٢٠ ثانية</button></div>'+E.teamsBoard()+'<div class="grow col" id="rb" style="min-height:0;margin-top:12px;gap:12px"></div>';
  var i=0,turn=0,b=$('#rb',el);
  function show(){if(i>=RACE.length){b.innerHTML='<div class="card" style="text-align:center;padding:30px"><h2 class="t">انتهى السباق!</h2><p class="big">أحسنتم جميعًا. اضغطوا لإعلان الفريق الفائز.</p><div class="qa" style="justify-content:center"><button class="btn gold" id="rW">🏆 إعلان الفائز</button><button class="btn ghost" id="rA">↻ سباق جديد</button></div></div>';$('#rW',b).onclick=function(){E.winner()};$('#rA',b).onclick=function(){i=0;turn=0;show()};E.complete('race');return}
    var Q=RACE[i],t=E.ST.teams[turn];b.innerHTML='<div class="row" style="align-items:center;gap:12px"><span class="tag" style="background:'+t.c+';color:#021">دور: '+E.esc(t.n)+'</span><span class="hint">السؤال '+n(i+1)+' من '+n(RACE.length)+'</span></div><div class="q"><div class="qt" style="font-size:30px">'+Q.q+'</div><div class="opts">'+Q.o.map(function(o,k){return '<button class="opt" data-k="'+k+'"><i>'+E.KL[k]+'</i><span>'+o+'</span></button>'}).join('')+'</div><div class="qa" id="rn"></div></div>';
    $$('.opt',b).forEach(function(o){o.onclick=function(){var k=+o.dataset.k,ok=k===Q.a;$$('.opt',b).forEach(function(z){z.disabled=true});o.classList.add(ok?'ok':'no');if(ok){E.sfx.ok();E.addScore(turn,10)}else{E.sfx.no()}
      $('#rn',b).innerHTML=(ok?'<b style="color:var(--ok)">✔ إجابة صحيحة · +١٠</b>':'<b style="color:var(--no)">✘ إجابة غير صحيحة</b><button class="btn ghost" id="rS">💡 اكشف الإجابة</button>')+'<button class="btn" id="rN">السؤال التالي ←</button>';var s=$('#rS',b);if(s)s.onclick=function(){$$('.opt',b)[Q.a].classList.add('ok');s.remove()};$('#rN',b).onclick=function(){i++;turn=(turn+1)%4;show()}}})}
  $('#rT',el).onclick=function(){E.timer.start(20)};show();return {}}});

/* ========== ١٣) ماذا تعلمنا؟ ========== */
S({id:'review',name:'م٩ ماذا تعلمنا؟',build:function(el){return E.review(el,{goals:[
  {t:GO[0],how:'شاهدنا الانشطار والتبرعم والتجدد والدرنات والسيقان الجارية، وصنّفنا المخلوقات',st:['asexual','asort'],q:['l2-as-sort','l2-as-q1','l2-as-q2','l2-as-q3']},
  {t:GO[1],how:'تتبّعنا أطوار الانقسام المنصف الثمانية، وتعرّفنا الخلل فيه',st:['meiosis','errors'],q:['l2-me-q1','l2-me-q2','l2-er-p','l2-er-tf2']},
  {t:GO[2],how:'قارنّا الخلايا الثنائية والأحادية، وكوّنّا خلايا جنسية مختلفة',st:['ploidy','mvm'],q:['l2-pl-tb','l2-pl-q1','l2-mvm-tb','l2-mvm-q3']},
  {t:GO[3],how:'شاهدنا اتحاد البويضة مع الحيوان المنوي وتكوّن البويضة المخصبة',st:['fert'],q:['l2-fe-q1','l2-fe-q2','l2-fe-q3']}],
  exit:[{id:'l2-exit1',goal:1,lvl:1,q:'مثالان على التكاثر اللاجنسي:',o:['التبرعم في الهيدرا، والتجدد في نجم البحر','الإخصاب، والتبرعم','اتحاد البويضة والحيوان المنوي','الانقسام المنصف، والإخصاب'],a:0,ex:'التبرعم والتجدد من طرق التكاثر اللاجنسي.'},
        {id:'l2-exit2',goal:3,lvl:2,q:'يتحد حيوان منوي (٢٣) مع بويضة (٢٣)، فتتكوّن بويضة مخصبة فيها:',o:['٢٣ كروموسومًا','٤٦ كروموسومًا','٩٢ كروموسومًا','١١ كروموسومًا'],a:1,cols:2,ex:'٢٣ + ٢٣ = ٤٦؛ وهكذا يحافظ الانقسام المنصف والإخصاب على العدد ثابتًا.'},
        {t:'tf',id:'l2-exit3',goal:2,lvl:2,q:'ينتج الانقسام المنصف خليتين متماثلتين.',v:false,ex:'ينتج <b>أربع</b> خلايا، في كل منها نصف العدد.'}]})}});

E.lesson('l2',L2);
})();
