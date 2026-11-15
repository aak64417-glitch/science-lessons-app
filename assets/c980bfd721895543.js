/* الدرس الثاني: أنواع الصخور (ص ١٤٣–١٥١) */
(function(){
"use strict";
var E=window.E,$=E.$,$$=E.$$,n=E.n,h=E.h,IMG=window.IMG||{},img=E.img,card=E.card,IC=E.IC;
IC.fire='<svg viewBox="0 0 64 64"><path d="M32 6c4 12 16 16 16 32a16 16 0 0 1-32 0c0-8 4-12 8-16 0 6 3 9 6 9-2-10 2-18 2-25z" fill="#ff7a1a"/><path d="M32 30c3 6 8 8 8 14a8 8 0 0 1-16 0c0-4 4-6 4-10 1 3 3 4 4 4z" fill="#ffd166"/></svg>';
IC.layers='<svg viewBox="0 0 64 64"><rect x="6" y="12" width="52" height="10" rx="2" fill="#e3c08a"/><rect x="6" y="24" width="52" height="10" rx="2" fill="#b98a5a"/><rect x="6" y="36" width="52" height="10" rx="2" fill="#8a6a4a"/><rect x="6" y="48" width="52" height="8" rx="2" fill="#5b4636"/></svg>';
IC.press='<svg viewBox="0 0 64 64"><path d="M10 8h44v8H10zM10 48h44v8H10z" fill="#aab4ba"/><path d="M14 22h36v20H14z" fill="#8a7563"/><path d="M14 27h36M14 32h36M14 37h36" stroke="#3a2b1f" stroke-width="2"/><path d="M32 2v6M32 56v6" stroke="#ff5a1f" stroke-width="4"/></svg>';
IC.cycle='<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="none" stroke="#ffb547" stroke-width="5" stroke-dasharray="30 8"/><circle cx="32" cy="10" r="6" fill="#ff7a1a"/><circle cx="51" cy="43" r="6" fill="#b07cff"/><circle cx="13" cy="43" r="6" fill="#e3c08a"/></svg>';
IC.fossil='<svg viewBox="0 0 64 64"><ellipse cx="32" cy="32" rx="16" ry="24" fill="#c9b79a" stroke="#5b4636" stroke-width="3"/><path d="M18 24h28M17 32h30M18 40h28M32 10v44" stroke="#5b4636" stroke-width="2"/></svg>';
var GO=['أن يوضّح الطالب الفرق بين الصخور النارية السطحية والجوفية.','أن يصف الطالب كيف تتكوّن الأنواع المختلفة من الصخور الرسوبية.','أن يصف الطالب الظروف الملائمة لتكوّن الصخور المتحولة.','أن يوضّح الطالب كيف ترتبط الصخور معًا في دورة الصخور.','أن يحدّد الطالب أوجه التشابه والاختلاف بين المخلوقات الحية والأحافير.'];
var L2={title:'أنواع الصخور',blurb:'صخور نارية تولد من الصهارة، ورسوبية تتراكم طبقة فوق طبقة، ومتحولة تحت الحرارة والضغط، ودورة الصخور التي لا تتوقف.',stations:[]};
function S(o){L2.stations.push(o)}
function lab(x,W,H,by){x.fillStyle='#e8eef0';x.fillRect(0,0,W,H);x.strokeStyle='rgba(120,140,150,.18)';x.lineWidth=1;for(var gx=0;gx<W;gx+=50){x.beginPath();x.moveTo(gx,0);x.lineTo(gx,by);x.stroke()}for(var gy=0;gy<by;gy+=50){x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke()}x.fillStyle='#384952';x.fillRect(0,by,W,14);x.fillStyle='#26333a';x.fillRect(0,by+14,W,H-by-14)}
function txt(x,s,X,Y,sz,c,al){x.font='700 '+(sz||22)+'px "Readex Pro",sans-serif';x.textAlign=al||'center';x.textBaseline='middle';x.direction='rtl';x.fillStyle=c||'#14222b';x.fillText(s,X,Y)}
function pill(x,s,X,Y){x.font='700 21px "Readex Pro",sans-serif';var w=x.measureText(s).width+24;x.fillStyle='#fff';x.strokeStyle='#0b6884';x.lineWidth=2.5;x.beginPath();x.roundRect?x.roundRect(X-w/2,Y-18,w,36,12):x.rect(X-w/2,Y-18,w,36);x.fill();x.stroke();txt(x,s,X,Y+1,21,'#0b3a4a')}

/* ========== ١) المقدمة ========== */
S({id:'intro',name:'المقدمة التشويقية',full:true,build:function(el){var THREE=window.THREE,blk,sl=[],nw=[],vol,crat,lava,LP=[],glow;
  return E.intro(el,{dur:25,z:15,caps:[{t:'صهارة تندفع… ثم تبرد وتتصلّب: صخور نارية',at:1,end:7.5,sub:1},{t:'فتات يتراكم طبقة فوق طبقة: صخور رسوبية',at:7.8,end:13.5,sub:1},{t:'حرارة وضغط في الأعماق: صخور متحولة',at:13.8,end:19.5,sub:1},{t:'الصخور تتغير باستمرار…<br><span class="gl">فكيف تتحول من نوع إلى آخر؟</span>',at:20}],
   build:function(T){blk=new THREE.Group();T.sc.add(blk);var cols=[0x3a2a20,0x4f3a2c,0x5e4734,0x6e5640,0x7d6448];
     for(var i=0;i<5;i++){var g=new THREE.BoxGeometry(11,.55,6,60,1,1);g.userData={o:g.attributes.position.array.slice()};var m=new THREE.MeshStandardMaterial({color:cols[i],roughness:.9,emissive:0x000000});m.color.convertSRGBToLinear();var s=new THREE.Mesh(g,m);s.position.y=-3.2+i*.56;blk.add(s);sl.push(s)}
     var ncol=[0x8f7552,0x7a6246,0x9c8360];for(i=0;i<3;i++){var m2=new THREE.MeshStandardMaterial({color:ncol[i],roughness:.9,transparent:true,opacity:0});m2.color.convertSRGBToLinear();var s2=new THREE.Mesh(new THREE.BoxGeometry(11,.45,6),m2);s2.position.y=6;s2.userData.ty=-3.2+5*.56+i*.46;blk.add(s2);nw.push(s2)}
     vol=new THREE.Mesh(new THREE.ConeGeometry(2.6,3.2,40,1,true),new THREE.MeshStandardMaterial({color:0x3b2e27,roughness:.95,side:THREE.DoubleSide,flatShading:true}));vol.material.color.convertSRGBToLinear();vol.position.set(-2.6,-.9+.8+.6,0);blk.add(vol);
     crat=new THREE.PointLight(0xff6a00,2.2,10);crat.position.set(-2.6,1.6,0);blk.add(crat);
     glow=new THREE.Sprite(new THREE.SpriteMaterial({map:E.glowTex('rgba(255,120,30,.95)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));glow.scale.set(3,3,1);glow.position.set(-2.6,1.4,0);blk.add(glow);
     var N=260,pg=new THREE.BufferGeometry(),pa=new Float32Array(N*3);for(i=0;i<N;i++)LP.push({t:Math.random()*2,v:new THREE.Vector3((Math.random()-.5)*1.6,2.5+Math.random()*2.2,(Math.random()-.5)*1.6)});pg.setAttribute('position',new THREE.BufferAttribute(pa,3));
     lava=new THREE.Points(pg,new THREE.PointsMaterial({color:0xff8a1f,size:.16,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false}));blk.add(lava);
     var hl=new THREE.PointLight(0xffb547,.45,30);hl.position.set(5,6,8);T.sc.add(hl);T.sc.fog=new THREE.FogExp2(0x0a0814,.035)},
   tick:function(T,t){var e=function(a,b,x){x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};var erupt=1-e(6,8,t);
     var a=lava.geometry.attributes.position.array;LP.forEach(function(p,i){var tt=((t*0.9+p.t)%2);var x=-2.6+p.v.x*tt,y=1.5+p.v.y*tt-4.9*tt*tt*.5,z=p.v.z*tt;if(y<-0.4||erupt<.05){x=-2.6;y=1.5;z=0}a[i*3]=x;a[i*3+1]=y;a[i*3+2]=z});lava.geometry.attributes.position.needsUpdate=true;lava.material.opacity=.95*erupt;crat.intensity=2.2*erupt+.3;glow.material.opacity=erupt;
     
     nw.forEach(function(s,i){var k=e(8+i*1.4,9.6+i*1.4,t);s.position.y=6+(s.userData.ty-6)*k;s.material.opacity=k});vol.position.y=.5+e(8,12.8,t)*1.38;
     var p=e(14,18.5,t);sl.forEach(function(s,i){if(i>2)return;var g=s.geometry,o=g.userData.o,ar=g.attributes.position.array;for(var j=0;j<ar.length;j+=3){ar[j+1]=o[j+1]*(1-p*.35)+Math.sin(o[j]*.7)*p*.32}g.attributes.position.needsUpdate=true;s.material.emissive.setRGB(.5*p*(3-i)/3,.08*p,0)});
     blk.rotation.y=-.5+Math.sin(t*.12)*.35+t*.02;var cam=T.cam;cam.position.set(Math.sin(t*.1)*2,3.2-e(0,10,t)*1.2+e(14,20,t)*.8,15-e(0,8,t)*3+e(18,25,t)*1.5);cam.lookAt(0,-1,0)}})}});

/* ========== ٢) ماذا ستتعلم؟ ========== */
S({id:'wonder',name:'ماذا ستتعلم اليوم؟',build:function(el){return E.wonder(el,{eyebrow:'الدرس الثاني · أنواع الصخور',items:[
  {ic:IC.fire,t:'لماذا تختلف أحجام البلورات في الصخور النارية؟'},{ic:IC.layers,t:'كيف تتكوّن الصخور طبقة فوق طبقة؟'},{ic:IC.fossil,t:'أين نجد الأحافير؟ ولماذا؟'},{ic:IC.press,t:'ماذا تفعل الحرارة والضغط بالصخور؟'},{ic:IC.cycle,t:'كيف يتحول صخر من نوع إلى آخر؟'}]})}});

/* ========== ٣) الأهداف ========== */
S({id:'goals',kind:'goals',name:'أهداف الدرس',build:function(el){return E.goalsScreen(el,{eyebrow:'الدرس الثاني · أنواع الصخور · ص ١٤٣',idea:'تتكوّن الصخور بطرائق مختلفة، وتتغير باستمرار من نوع إلى آخر عبر دورة الصخور.',goals:[{ic:IC.fire,t:GO[0]},{ic:IC.layers,t:GO[1]},{ic:IC.press,t:GO[2]},{ic:IC.cycle,t:GO[3]},{ic:IC.fossil,t:GO[4]}]})}});

/* ========== ٤) التهيئة ========== */
S({id:'prior',name:'التهيئة',build:function(el){el.innerHTML='<div class="eyebrow">تهيئة · المطويات وتوجيه القراءة</div><h1 class="t">قبل أن نبدأ رحلة الصخور</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1;gap:10px;min-height:0">'+
   '<div class="card" style="padding:12px 16px"><h3 style="margin:0 0 6px">📂 المطويات: صنّف الصخور</h3><p style="margin:0 0 8px;font-size:18px">اصنع المطوية التالية لتساعدك على تنظيم ما تتعلمه عن أنواع الصخور الثلاثة.</p><div class="fold"><div><b>١</b>اطوِ ورقة طوليًّا من المنتصف، واجعل الحافة الأمامية أقصر قليلًا من الخلفية.</div><div><b>٢</b>اقلب الورقة واطوِها إلى ثلاثة أجزاء.</div><div><b>٣</b>اقطع الطبقة العليا فقط على طول خطوط الطي لعمل ثلاثة ألسنة.</div><div><b>٤</b>اكتب عنوانًا على كل لسان: صخور نارية، صخور رسوبية، صخور متحولة.</div></div><div class="flaps"><span style="--c:#ff7a1a">صخور نارية</span><span style="--c:#c9a877">صخور رسوبية</span><span style="--c:#b07cff">صخور متحولة</span></div><p class="hint" style="margin:8px 0 0">اقرأ واكتب: في أثناء دراستك الدرس، اكتب تحت كل لسان كيف يتكوّن هذا النوع من الصخور، وأعطِ مثالًا عليه.</p></div><div id="pp"></div></div><div class="col grow side" id="pg"></div></div>';
  E.poll($('#pp',el),{compact:1,q:'من أين تتوقع أن تأتي الصخور التي تخرج من البركان؟',o:['من الصهارة في باطن الأرض','من الرمال على الشاطئ','من بقايا النباتات']});
  E.guide($('#pg',el),[4,5,6,7,8],'b');return {}}});

/* ========== ٥) م١ ثلاثة أنواع ========== */
S({id:'types',name:'م١ ثلاثة أنواع من الصخور',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ١ · الصخور ص ١٤٣</div><h1 class="t" style="font-size:42px">تنشأ ثلاثة أنواع أساسية من الصخور</h1><p class="lead" style="margin:0 0 10px"><b class="gl">الصخر:</b> مادة صلبة تتكوّن من معدن واحد أو أكثر، وتتغير الصخور باستمرار مع مرور الزمن.</p><div class="portals">'+
   [['r_volcano','صخور نارية','تتكوّن من تبريد الصهارة وتصلّبها','#ff7a1a',IC.fire],['r_layers','صخور رسوبية','تتكوّن من رسوبيات تتجمع في طبقات','#c9a877',IC.layers],['r_marble','صخور متحولة','تتكوّن بتأثير الحرارة والضغط','#b07cff',IC.press]].map(function(c,i){return '<button class="portal" style="--c:'+c[3]+';animation-delay:'+(i*.25)+'s" data-p="'+i+'">'+img(c[0],'')+'<span class="pi">'+c[4]+'</span><b>'+c[1]+'</b><small class="reveal">'+c[2]+'</small><em>المس لاكتشاف طريقة التكوّن</em></button>'}).join('')+'</div>';
  $$('.portal',el).forEach(function(b){b.onclick=function(){b.classList.add('open');var r=$('.reveal',b);r&&r.classList.add('shown');E.sfx.pop();if($$('.portal.open',el).length===3)E.complete('types')}});return {}}});

/* ========== ٦) م٢ مختبر الصخور النارية ========== */
S({id:'igneous',name:'م٢ مختبر الصخور النارية',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٢ · الصخور النارية ص ١٤٣–١٤٦</div><h1 class="t" style="font-size:42px">مختبر التبلور: بطيء أم سريع؟</h1><p class="lead" style="margin:0 0 6px">تتكوّن الصخور النارية نتيجة تبريد <b class="gl">الصهارة</b> (المادة الصخرية المنصهرة) وتصلّبها.</p><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 58%;gap:8px;min-height:0"><div class="lcdrow"><div class="lcd"><small>مكان التبريد</small><b id="iP">—</b></div><div class="lcd am"><small>درجة الحرارة</small><b id="iT">ساخنة جدًّا</b></div><div class="lcd"><small>البلورات</small><b id="iC">—</b></div></div><canvas class="sim lab" id="ic" width="1000" height="520" style="flex:1;min-height:0;height:100%"></canvas><div class="qa" style="margin:0"><button class="btn" data-m="slow">🌍 برّد الصهارة ببطء داخل الأرض</button><button class="btn gold" data-m="fast">🌋 برّد اللابة بسرعة على السطح</button><button class="btn ghost" id="iR">↺ صهارة جديدة</button></div></div>'+
   '<div class="col grow side" id="iq" style="gap:10px"><div class="card" style="padding:10px 14px"><b>توقّع:</b> أيّ طريقة تكوّن بلورات أكبر؟<div class="chips" style="margin-top:6px"><button class="chip" data-pr="0">التبريد البطيء</button><button class="chip" data-pr="1">التبريد السريع</button></div></div><div class="reveal" id="iRes"></div></div></div>';
  var cv=$('#ic',el),x=cv.getContext('2d'),W=1000,H=520,GW=150,GH=72,CS=4.4,X0=170,Y0=110,grid=new Int16Array(GW*GH),front=[],cols=[],mode=null,raf=0,run=false,fill=0,done={};
  function reset(){grid.fill(-1);front=[];cols=[];fill=0;mode=null;draw();$('#iP',el).textContent='—';$('#iT',el).textContent='ساخنة جدًّا';$('#iC',el).textContent='—'}
  function start(m){reset();mode=m;var nSeed=m==='slow'?16:420,pal=m==='slow'?['#f2b8a8','#f4efe6','#2b2b2e','#d99a86','#e8e2d8','#3d3d42']:['#3a3a40','#46464d','#2e2e33','#52525a'];
    for(var i=0;i<nSeed;i++){var c=Math.floor(Math.random()*GW*GH);if(grid[c]>=0)continue;grid[c]=cols.length;cols.push(pal[i%pal.length]);front.push(c);fill++}
    $('#iP',el).textContent=m==='slow'?'داخل الأرض (جوفية)':'على سطح الأرض (سطحية)';E.sfx.whoosh();if(!run){run=true;loop()}}
  function grow(){var steps=mode==='slow'?120:900;for(var s=0;s<steps&&front.length;s++){var k=Math.floor(Math.random()*front.length),c=front[k],cx=c%GW,cy=(c/GW)|0,nb=[[1,0],[-1,0],[0,1],[0,-1]],any=false;
      for(var j=0;j<4;j++){var nx=cx+nb[j][0],ny=cy+nb[j][1];if(nx<0||ny<0||nx>=GW||ny>=GH)continue;var q=ny*GW+nx;if(grid[q]<0){grid[q]=grid[c];front.push(q);fill++;any=true;break}}
      if(!any){front[k]=front[front.length-1];front.pop()}}}
  function draw(){lab(x,W,H,460);x.fillStyle='#5b6670';x.fillRect(X0-20,Y0-20,GW*CS+40,GH*CS+40);
    var hot=1-fill/(GW*GH);var g=x.createLinearGradient(0,Y0,0,Y0+GH*CS);g.addColorStop(0,'rgba(255,170,40,'+hot+')');g.addColorStop(1,'rgba(220,60,10,'+hot+')');
    x.fillStyle='#ff7a1a';x.fillRect(X0,Y0,GW*CS,GH*CS);for(var c=0;c<grid.length;c++){var v=grid[c];if(v<0)continue;x.fillStyle=cols[v];x.fillRect(X0+(c%GW)*CS,Y0+((c/GW)|0)*CS,CS+.5,CS+.5)}
    if(hot>.02){x.fillStyle=g;x.globalAlpha=.35;x.fillRect(X0,Y0,GW*CS,GH*CS);x.globalAlpha=1}
    x.strokeStyle='#14222b';x.lineWidth=4;x.strokeRect(X0,Y0,GW*CS,GH*CS);pill(x,mode?(fill/(GW*GH)>.995?'تصلّبت: صخر ناري':'تتكوّن البلورات…'):'صهارة منصهرة',W/2,62)}
  function loop(){if(!run)return;raf=requestAnimationFrame(loop);if(mode&&!E.paused&&front.length){grow();var k=fill/(GW*GH);$('#iT',el).textContent=k>.99?'تصلّبت':(k>.5?'تبرد…':'ساخنة');if(!front.length)finish()}draw()}
  function finish(){var m=mode;done[m]=1;$('#iC',el).textContent=m==='slow'?'كبيرة (تُرى بالعين المجردة)':'صغيرة جدًّا';E.sfx.ok();
    var r=$('#iRes',el);r.classList.add('shown');r.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+card('صخور نارية جوفية','<div class="row" style="gap:8px;align-items:center">'+img('r_granite','width:110px;height:84px;object-fit:cover;border-radius:10px')+'<p style="margin:0;font-size:17px">تبرد الصهارة <b class="gl">ببطء</b> داخل الأرض؛ بلوراتها <b>كبيرة</b> تُرى بالعين المجردة. مثال: <b>الجرانيت</b></p></div>',done.slow?'':'opacity:.45')+card('صخور نارية سطحية','<div class="row" style="gap:8px;align-items:center">'+img('r_basalt','width:110px;height:84px;object-fit:cover;border-radius:10px')+'<p style="margin:0;font-size:17px">تبرد اللابة <b class="gl">بسرعة</b> على سطح الأرض؛ بلوراتها <b>صغيرة</b>، وقد لا تتكوّن بلورات. مثال: <b>البازلت، الريولايت</b></p></div>',done.fast?'':'opacity:.45')+'</div>';
    if(done.slow&&done.fast&&!$('#iq .q',el)){E.complete('igneous');var q=$('#iq',el);E.mcq(q,{id:'l2-ig-q1',goal:1,lvl:1,q:'ما نوع الصخور التي تنتج عن انفجار البراكين؟',o:['فتاتية','عضوية','ورقية','سطحية'],a:3,cols:2,ex:'تبرد اللابة بسرعة على سطح الأرض فتتكوّن صخور نارية سطحية.'});
      E.mcq(q,{id:'l2-ig-q2',goal:1,lvl:2,q:'لماذا تكون بلورات الجرانيت أكبر من بلورات البازلت؟',o:['لأن صهارته بردت ببطء داخل الأرض','لأنه تكوّن من فتات الصخور','لأنه تعرّض لضغط كبير','لأنه برد بسرعة على السطح'],a:0,ex:'التبريد البطيء يعطي البلورات وقتًا أطول لتنمو.'})}}
  $$('[data-m]',el).forEach(function(b){b.onclick=function(){start(b.dataset.m)}});$('#iR',el).onclick=reset;
  $$('[data-pr]',el).forEach(function(b){b.onclick=function(){$$('[data-pr]',el).forEach(function(z){z.setAttribute('aria-pressed',z===b)});E.sfx.tick();E.toast('سُجّل التوقع… جرّبوا الطريقتين!')}});
  reset();return {enter:function(){run=true;loop()},leave:function(){run=false;cancelAnimationFrame(raf)}}}});

/* ========== ٧) م٣ الصخور الرسوبية ========== */
S({id:'sed',name:'م٣ الصخور الرسوبية',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٣ · الصخور الرسوبية ص ١٤٧</div><h1 class="t" style="font-size:42px">طبقة فوق طبقة</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 56%;gap:8px;min-height:0"><canvas class="sim lab" id="sc" width="1000" height="560" style="flex:1;min-height:0;height:100%"></canvas><div class="qa" style="margin:0"><button class="btn" id="sA">🌊 التجوية والتعرية: انقل فتاتًا جديدًا</button><button class="btn gold" id="sP">⬇ الضغط والتلاحم</button><button class="btn ghost" id="sR">↺</button></div></div>'+
   '<div class="col grow side" id="sq" style="gap:10px"><div class="card" style="padding:10px 14px"><p style="margin:0;font-size:19px">تتكوّن من فتات الصخور أو الأصداف أو حبيبات المعادن، وتتجمع في طبقات: <b class="gl">الأقدم في الأسفل، والأحدث في الأعلى</b>.</p></div>'+
   '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'+[['فتاتية','من حبيبات صخور موجودة أصلًا تتلاحم معًا','مثال: الحجر الرملي','r_sandstone'],['كيميائية','تتكوّن عند تبخّر الماء الغني بالمعادن الذائبة','مثال: الملح الصخري، الجبس','m_halite'],['عضوية','تتكوّن من بقايا المخلوقات الحية','مثال: الفحم، الطباشير','']].map(function(c){return '<div class="card pcard" style="padding:8px">'+img(c[3],'height:70px;width:100%;object-fit:cover;border-radius:10px')+'<b style="font-family:var(--disp);font-size:19px">'+c[0]+'</b><small style="font-size:15px;line-height:1.5">'+c[1]+'<br><b class="gl">'+c[2]+'</b></small></div>'}).join('')+'</div></div></div>';
  var cv=$('#sc',el),x=cv.getContext('2d'),W=1000,H=560,L=[],P=[],comp=0,tgt=0,raf=0,run=false;var KIND=[['حصى','#9c8a78',9],['رمل','#d9b77a',5],['طين','#8a6a52',3],['رمل','#c9a26a',5],['حصى','#7d6e62',8],['طين','#a07e62',3]];
  var BOT=470,LH=52;
  function addLayer(){if(L.length>=6){E.toast('امتلأ الحوض!');return}var k=KIND[L.length];L.push({k:k,y:0});for(var i=0;i<110;i++)P.push({x:220+Math.random()*560,y:60-Math.random()*200,vy:2+Math.random()*2,L:L.length-1,r:k[2]*(.7+Math.random()*.6)});E.sfx.whoosh()}
  function draw(){lab(x,W,H,500);
    /* الحوض */
    x.fillStyle='rgba(58,156,212,.35)';x.fillRect(200,140,600,BOT-140);x.strokeStyle='#4f6f7c';x.lineWidth=6;x.beginPath();x.moveTo(200,120);x.lineTo(200,BOT);x.lineTo(800,BOT);x.lineTo(800,120);x.stroke();
    /* نهر */
    x.fillStyle='#3a9cd4';x.beginPath();x.moveTo(0,70);x.quadraticCurveTo(120,60,230,110);x.lineTo(230,130);x.quadraticCurveTo(120,90,0,100);x.fill();
    var sq=1-comp*.32;L.forEach(function(l,i){var y1=BOT-(i+1)*LH*sq,hh=LH*sq;x.fillStyle=l.k[1];x.globalAlpha=Math.min(1,l.y);x.fillRect(203,y1,594,hh);x.globalAlpha=1;
      if(comp>.02){x.strokeStyle='rgba(20,34,43,'+(.5*comp)+')';x.lineWidth=2;x.beginPath();x.moveTo(203,y1);x.lineTo(797,y1);x.stroke()}});
    P.forEach(function(p){if(p.done)return;x.fillStyle=L[p.L].k[1];x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill();x.strokeStyle='rgba(20,34,43,.4)';x.lineWidth=1;x.stroke()});
    L.forEach(function(l,i){if(l.y>.5&&comp<.5){var y1=BOT-(i+.5)*LH*sq;txt(x,l.k[0],860,y1,18,'#14222b')}});
    if(L.length>1){pill(x,'الأقدم',110,BOT-LH*sq*.5);pill(x,'الأحدث',110,BOT-(L.length-.5)*LH*sq)}
    if(comp>.9)pill(x,'تلاحمت الرسوبيات: صخر رسوبي طبقي',W/2,40)}
  function loop(){if(!run)return;raf=requestAnimationFrame(loop);if(!E.paused){comp+=(tgt-comp)*.05;P.forEach(function(p){if(p.done)return;var top=BOT-(p.L+1)*LH*(1-comp*.32)+6;p.y+=p.vy;p.x+=Math.sin(p.y/30)*.6;if(p.y>=top+Math.random()*LH*.6){p.done=1;L[p.L].y+=.012}})}draw()}
  $('#sA',el).onclick=function(){if(tgt>0){E.toast('تلاحمت الطبقات! اضغط ↺ لتجربة جديدة');return}addLayer()};
  $('#sP',el).onclick=function(){if(L.length<3){E.toast('أضف ثلاث طبقات على الأقل');return}tgt=1;E.sfx.pop();setTimeout(function(){E.complete('sed')},1500)};
  $('#sR',el).onclick=function(){L=[];P=[];comp=0;tgt=0};
  var q=$('#sq',el);
  E.order(q,{id:'l2-sd-ord',goal:2,lvl:2,q:'رتّب الصخور الفتاتية حسب حجم الحبيبات (من الأصغر إلى الأكبر):',items:['الغضار','الحجر الطيني','الحجر الرملي','الكونجلوميرات'],ex:'يزداد حجم الحبيبات: الغضار ← الحجر الطيني ← الحجر الرملي ← الكونجلوميرات.'});
  E.mcq(q,{id:'l2-sd-q1',goal:2,lvl:1,q:'أيّ العبارات التالية ينطبق على تشكّل الصخور الفتاتية؟',o:['تتكوّن من حبيبات صخور موجودة أصلًا','تتكوّن من اللابة','تتكوّن بواسطة التبخّر','تتكوّن من بقايا النباتات'],a:0,ex:'الفتاتية من حبيبات صخور موجودة أصلًا تتلاحم معًا.'});
  E.mcq(q,{id:'l2-sd-q2',goal:2,lvl:2,q:'يمكن تصنيف الصخور الرسوبية إلى:',o:['متورّقة أو غير متورّقة','أحجار كريمة أو خامات','سطحية أو جوفية','فتاتية أو كيميائية أو عضوية'],a:3,ex:'الرسوبية: فتاتية، وكيميائية، وعضوية.'});
  return {enter:function(){run=true;loop()},leave:function(){run=false;cancelAnimationFrame(raf)}}}});

/* ========== ٨) م٤ الأحافير وتجربتها ========== */
S({id:'fossil',name:'م٤ الأحافير',build:function(el){
  var st=0,pasta=[],glue=0,dry=0,busy=false;
  el.innerHTML='<div class="eyebrow">المحطة ٤ · الأحافير ص ١٤٧ · تجربة: كيف تشكل الأحافير صخورًا ص ١٤٨</div><h1 class="t" style="font-size:42px">أسرار محفوظة في الصخور</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 55%;gap:8px;min-height:0"><svg class="labview" id="fv" viewBox="0 0 760 420" style="flex:1;min-height:0;width:100%;height:100%"></svg><div class="qa" style="margin:0"><button class="btn" data-f="1">🍝 ١) املأ الوعاء بالمعكرونة</button><button class="btn" data-f="2" disabled>🥛 ٢) أضف مزيج الغراء والماء</button><button class="btn" data-f="3" disabled>📦 ٣) أخرج المادة وقارن</button></div></div>'+
   '<div class="col grow side" id="fq" style="gap:10px">'+card('الأحافير','<div class="row" style="gap:8px">'+img('f_trilobite','width:120px;height:90px;object-fit:cover;border-radius:10px')+img('f_mammoth','width:120px;height:90px;object-fit:cover;border-radius:10px')+'<p style="margin:0;font-size:17px;flex:1"><b class="gl">الأحافير:</b> بقايا أو آثار مخلوقات عاشت على الأرض، وحُفظت في الصخور الرسوبية. <b>توجد الأحافير في الصخور الرسوبية فقط.</b></p></div><small class="hint">ثلاثي الفصوص · الماموث</small>')+
   '<div class="card" style="padding:10px 14px"><b>التحليل</b><ol style="margin:4px 0 0;font-size:18px;line-height:1.7"><li>اشرح لماذا قمت باستعمال محلول الغراء، وماذا يمثل في الطبيعة.<div class="reveal explain">الغراء يلصق قطع المعكرونة معًا، ويمثّل في الطبيعة المواد التي <b>تُلاحم</b> الرسوبيات وتربطها فتتحول إلى صخر.</div></li><li>اربط بين المعكرونة (الأحفورة) في الصخر والمعكرونة الأصلية.<div class="reveal explain">الأحفورة تحفظ <b>شكل</b> المخلوق الأصلي وأجزاءه الصلبة، لكنها ليست المخلوق نفسه حيًّا؛ فهي بقايا أو آثار محفوظة في الصخر.</div></li></ol></div><div id="fq2"></div></div></div>';
  var sv=$('#fv',el);
  function draw(){var s='<rect width="760" height="420" fill="#e8eef0"/><rect y="330" width="760" height="90" fill="#384952"/>';
    if(st<3){s+='<g transform="translate(200 200)"><path d="M0 0 L20 120 H340 L360 0Z" fill="#c9d2d8" stroke="#7d8890" stroke-width="5"/>'+(glue>0?'<path d="M'+(20-20*glue*0)+' '+(120-100*glue)+' L340 '+(120-100*glue)+' L340 120 L20 120Z" fill="rgba(255,255,255,'+(.7+.25*dry)+')" stroke="#9fb2bd" stroke-width="3"/>':'')+pasta.map(function(p){return '<rect x="'+p[0]+'" y="'+p[1]+'" width="'+p[2]+'" height="12" rx="6" fill="#e9c46a" stroke="#b8863b" stroke-width="2" transform="rotate('+p[3]+' '+(p[0]+p[2]/2)+' '+(p[1]+6)+')"/>'}).join('')+'</g><text x="380" y="190" text-anchor="middle" font-size="20" font-weight="700" fill="#14222b" font-family="Readex Pro">وعاء ألمنيوم</text>'+(dry>0&&dry<1?'<rect x="230" y="345" width="300" height="18" rx="9" fill="#5b6670"/><rect x="230" y="345" width="'+(300*dry)+'" height="18" rx="9" fill="#ffb547"/><text x="380" y="395" text-anchor="middle" font-size="20" fill="#fff" font-family="Readex Pro">يجف المزيج…</text>':'')}
    else{s+='<g transform="translate(90 120)"><rect width="260" height="140" rx="12" fill="#ece6d6" stroke="#8a7563" stroke-width="4"/>'+pasta.map(function(p){return '<rect x="'+(p[0]*.7)+'" y="'+(p[1]*.9+20)+'" width="'+(p[2]*.7)+'" height="10" rx="5" fill="#d8b860" stroke="#a07c30" stroke-width="2" transform="rotate('+p[3]+' '+(p[0]*.7+p[2]*.35)+' '+(p[1]*.9+25)+')"/>'}).join('')+'<text x="130" y="170" text-anchor="middle" font-size="20" font-weight="800" fill="#14222b" font-family="Readex Pro">«صخرك» الذي صنعته</text></g><g transform="translate(420 120)"><clipPath id="fc"><rect width="250" height="140" rx="12"/></clipPath><g clip-path="url(#fc)"><image href="'+IMG.f_trilobite+'" width="250" height="140" preserveAspectRatio="xMidYMid slice"/></g><rect width="250" height="140" rx="12" fill="none" stroke="#14222b" stroke-width="3"/><text x="125" y="170" text-anchor="middle" font-size="20" font-weight="800" fill="#14222b" font-family="Readex Pro">أحفورة ثلاثي الفصوص</text></g><text x="380" y="380" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="Readex Pro">قارن: كيف حُفظ شكل المخلوق داخل الصخر؟</text>'}
    sv.innerHTML=s}
  var B=$$('[data-f]',el);
  B[0].onclick=async function(){if(busy)return;busy=true;for(var i=0;i<14;i++){pasta.push([40+Math.random()*260,40+Math.random()*60,30+Math.random()*24,(Math.random()-.5)*120]);draw();E.sfx.tick();await E.tw(80,function(){})}B[0].disabled=true;B[1].disabled=false;busy=false};
  B[1].onclick=async function(){if(busy)return;busy=true;await E.tw(1400,function(k){glue=k;draw()});await E.tw(2200,function(k){dry=k;draw()});dry=1;draw();B[1].disabled=true;B[2].disabled=false;busy=false;E.sfx.ok()};
  B[2].onclick=function(){st=3;draw();B[2].disabled=true;E.sfx.pop();E.complete('fossil');var q=$('#fq2',el);if(!q.innerHTML){E.mcq(q,{id:'l2-fo-q1',goal:5,lvl:1,q:'في أيّ أنواع الصخور توجد الأحافير؟',o:['النارية فقط','الرسوبية فقط','المتحولة فقط','في الأنواع جميعها'],a:1,cols:2,ex:'توجد الأحافير في الصخور الرسوبية فقط.'});E.mcq(q,{id:'l2-fo-q2',goal:5,lvl:3,q:'توقّع: هل يمكنك أن تجد عظمة ديناصور في صخر متحول؟',o:['لا؛ لأن الحرارة والضغط يغيّران الصخر فتتلف الأحافير غالبًا','نعم؛ الأحافير تتكوّن في الصخور المتحولة','نعم؛ لأن الصخر المتحول صخر ناري','لا؛ لأن الديناصورات لم تعش على الأرض'],a:0,ex:'الأحافير توجد في الصخور الرسوبية؛ وعندما يتحول الصخر بالحرارة والضغط الكبيرين تتغير حبيباته فلا تبقى الأحافير عادةً.'})}};
  draw();return {}}});

/* ========== ٩) م٥ الصخور المتحولة ========== */
S({id:'meta',name:'م٥ مكبس التحول',build:function(el){
  var SRC=[{n:'الجرانيت',to:'النايس',fol:1,col:['#f2b8a8','#f4efe6','#2b2b2e','#d99a86']},{n:'الحجر الجيري',to:'الرخام',fol:0,col:['#e9e4d8','#d8d2c4','#f3efe6']},{n:'الحجر الرملي',to:'الكوارتزيت',fol:0,col:['#d9b77a','#e6cf9c','#c9a26a']}],src=0,G=[],heat=0,pres=0,raf=0,run=false,rec={};
  el.innerHTML='<div class="eyebrow">المحطة ٥ · الصخور المتحولة ص ١٤٩</div><h1 class="t" style="font-size:42px">مكبس التحول: حرارة وضغط</h1><p class="lead" style="margin:0 0 6px">تتكوّن على عمق تحت سطح الأرض بتأثير <b class="gl">الضغط الكبير والحرارة المرتفعة</b>، دون أن ينصهر الصخر.</p><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 57%;gap:8px;min-height:0"><div class="chips">'+SRC.map(function(s,i){return '<button class="chip" data-s="'+i+'" aria-pressed="'+(i===0)+'">'+s.n+'</button>'}).join('')+'</div><canvas class="sim lab" id="mc" width="1000" height="520" style="flex:1;min-height:0;height:100%"></canvas>'+
   '<div class="row" style="gap:16px;align-items:center"><label class="sl">🔥 الحرارة <input type="range" id="mH" min="0" max="100" value="0"></label><label class="sl">⬇ الضغط <input type="range" id="mP" min="0" max="100" value="0"></label></div></div>'+
   '<div class="col grow side" id="mq" style="gap:10px"><div class="card" id="mOut" style="padding:10px 14px"><p class="hint" style="margin:0">حرّك منزلقَي الحرارة والضغط، وراقب حبيبات الصخر.</p></div>'+card('أنواع الصخور المتحولة','<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:17px"><div>'+img('r_slate','width:100%;height:70px;object-fit:cover;border-radius:8px')+'<b class="gl">متورّقة:</b> حبيباتها مرتبة في طبقات تشبه الأوراق. مثال: الأردواز، النايس، الشيست</div><div>'+img('r_marble','width:100%;height:70px;object-fit:cover;border-radius:8px')+'<b class="gl">غير متورّقة:</b> حبيباتها غير مرتبة في طبقات. مثال: الرخام، الكوارتزيت</div></div>')+'</div></div>';
  var cv=$('#mc',el),x=cv.getContext('2d'),W=1000,H=520;
  function mk(){G=[];var s=SRC[src],r=function(){return Math.random()};for(var i=0;i<230;i++)G.push({x:330+r()*340,y:180+r()*200,a:r()*Math.PI,w:7+r()*9,c:s.col[i%s.col.length],ph:r()*6})}
  function draw(){lab(x,W,H,470);var s=SRC[src],p=pres/100,hT=heat/100,melt=hT>.92&&p>.2;
    var top=150+p*45,bot=410-p*45;x.fillStyle='#7d8890';x.fillRect(300,top-46,400,40);x.fillRect(300,bot+6,400,40);x.fillStyle='#5b6670';x.fillRect(480,top-120,40,74);x.fillRect(480,bot+46,40,24);
    x.save();x.beginPath();x.rect(320,top,360,bot-top);x.clip();x.fillStyle=melt?'#ff6a1a':'#cbbfae';x.fillRect(320,top,360,bot-top);
    if(!melt)G.forEach(function(g){var cy=top+(g.y-180)/200*(bot-top),ang=s.fol?g.a*(1-p):g.a,sx=s.fol?1+p*1.6:1+p*.25+hT*.4,sy=s.fol?Math.max(.25,1-p*.75):1+hT*.3;x.save();x.translate(g.x,cy);x.rotate(ang);x.scale(sx,sy);x.fillStyle=g.c;x.strokeStyle='rgba(20,34,43,.35)';x.lineWidth=1;x.beginPath();x.ellipse(0,0,g.w,g.w*.7,0,0,7);x.fill();x.stroke();x.restore()});
    else{for(var i=0;i<14;i++){x.fillStyle='rgba(255,210,80,.5)';x.beginPath();x.arc(340+((i*53+performance.now()/20)%330),top+20+((i*37)%(bot-top-40)),10,0,7);x.fill()}}x.restore();
    x.strokeStyle='#14222b';x.lineWidth=4;x.strokeRect(320,top,360,bot-top);
    if(hT>0){x.fillStyle='rgba(255,90,30,'+(hT*.5)+')';for(i=0;i<8;i++){x.beginPath();x.moveTo(330+i*48,bot+60);x.quadraticCurveTo(345+i*48,bot+40,330+i*48,bot+20);x.lineTo(345+i*48,bot+60);x.fill()}}
    var ready=p>.7&&hT>.5&&!melt;pill(x,melt?'⚠ انصهر الصخر! أصبح صهارة':(ready?s.n+' ← '+s.to:s.n),W/2,48);
    if(ready&&!rec[src]){rec[src]=1;E.sfx.ok();out(true)}else if(melt&&!rec['m'+src]){rec['m'+src]=1;E.sfx.no();out(false)}}
  function out(ok){var s=SRC[src],o=$('#mOut',el);o.innerHTML=ok?'<b style="font-family:var(--disp);font-size:22px;color:var(--au)">'+s.n+' ← '+s.to+'</b><p style="margin:4px 0 0;font-size:18px">صخر متحول <b>'+(s.fol?'متورّق':'غير متورّق')+'</b>: '+(s.fol?'ترتّبت حبيباته في طبقات تشبه الأوراق.':'نمت حبيباته وتلاحمت دون أن تترتب في طبقات.')+'</p>'+img('r_meta','width:100%;max-height:140px;object-fit:contain;background:#fff;border-radius:10px;margin-top:6px'):'<b style="color:var(--no);font-family:var(--disp);font-size:21px">⚠ ارتفعت الحرارة كثيرًا فانصهر الصخر!</b><p style="margin:4px 0 0;font-size:18px">الصخور المتحولة تتكوّن <b>دون انصهار</b>. الصخر المنصهر يصبح صهارة، وعندما تبرد يتكوّن صخر ناري.</p>';
    if(Object.keys(rec).filter(function(k){return k[0]!=='m'}).length>=2&&!$('#mq .q',el)){E.complete('meta');var q=$('#mq',el);E.mcq(q,{id:'l2-me-q1',goal:3,lvl:1,q:'تتكوّن الصخور المتحولة نتيجة لـ:',o:['ترسّب طبقات من الرسوبيات','تصلّب اللابة في ماء البحار','تفتّت الصخور على سطح الأرض','الحرارة الشديدة والضغط المرتفع'],a:3,cols:2,ex:'الحرارة المرتفعة والضغط الكبير دون انصهار.'});
      q.insertAdjacentHTML('beforeend','<div class="card" style="padding:10px 14px"><b>تدريب:</b> حدّد عاملين يمكن أن يُنتجا صخرًا متحولًا.<p class="reveal explain" style="margin:4px 0 0">الحرارة المرتفعة والضغط الكبير.</p></div><div class="card" style="padding:10px 14px"><b>تدريب:</b> ما الفرق بين آلية تكوّن الصخر الناري والمتحول تحت الضغط الشديد ودرجات الحرارة المرتفعة؟<p class="reveal explain" style="margin:4px 0 0">الصخر الناري يتكوّن بعد <b>انصهار</b> المادة ثم تبريدها وتصلّبها، أما الصخر المتحول فيتغير بالحرارة والضغط <b>دون أن ينصهر</b>.</p></div>')}}
  $$('[data-s]',el).forEach(function(b){b.onclick=function(){src=+b.dataset.s;$$('[data-s]',el).forEach(function(z){z.setAttribute('aria-pressed',z===b)});$('#mH',el).value=0;$('#mP',el).value=0;heat=pres=0;mk();$('#mOut',el).innerHTML='<p class="hint" style="margin:0">حرّك منزلقَي الحرارة والضغط، وراقب حبيبات الصخر.</p>';delete rec['m'+src];E.sfx.tick()}});
  $('#mH',el).oninput=function(){heat=+this.value};$('#mP',el).oninput=function(){pres=+this.value};
  function loop(){if(!run)return;raf=requestAnimationFrame(loop);draw()}mk();
  return {enter:function(){run=true;loop()},leave:function(){run=false;cancelAnimationFrame(raf)}}}});

/* ========== ١٠) م٦ قارن وصنّف ========== */
S({id:'compare',name:'م٦ قارن وصنّف',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٦ · مقارنة ونشاط تصنيف الصخور ص ١٥١</div><h1 class="t" style="font-size:42px">مختبر الجيولوجي: صنّف العينات</h1><div class="grow side col" id="cb" style="gap:12px;min-height:0"></div>';var b=$('#cb',el);
  var im=function(k){return img(k,'width:74px;height:54px;object-fit:cover;border-radius:8px')};
  E.sort(b,{id:'l2-cm-sort',goal:4,lvl:2,q:'تعاون مع مجموعتك: لاحظ كل عينة، ثم صنّفها:',bins:['صخور نارية','صخور رسوبية','صخور متحولة'],items:[{t:'الجرانيت',b:0,img:im('r_granite')},{t:'الحجر الرملي',b:1,img:im('r_sandstone')},{t:'الأردواز',b:2,img:im('r_slate')},{t:'البازلت',b:0,img:im('r_basalt')},{t:'الكونجلوميرات',b:1,img:im('r_conglom')},{t:'الرخام',b:2,img:im('r_marble')}],ex:'النارية: الجرانيت والبازلت · الرسوبية: الحجر الرملي والكونجلوميرات · المتحولة: الأردواز والرخام.'});
  var O=['تبريد الصهارة أو اللابة وتصلّبها','تراكم الرسوبيات وتلاحمها في طبقات','تأثير الحرارة والضغط على صخور موجودة'],T2=['جوفية – سطحية','فتاتية – كيميائية – عضوية','متورّقة – غير متورّقة'],X=['الجرانيت، البازلت','الحجر الرملي، الملح الصخري، الفحم','الأردواز، الرخام'];
  E.table(b,{id:'l2-cm-tb',goal:4,lvl:2,q:'أكمل جدول المقارنة بين أنواع الصخور:',cols:['وجه المقارنة','الصخور النارية','الصخور الرسوبية','الصخور المتحولة'],rows:[['كيف تتكوّن؟'].concat(O.map(function(a){return {a:a,opts:O}})),['أنواعها'].concat(T2.map(function(a){return {a:a,opts:T2}})),['أمثلة'].concat(X.map(function(a){return {a:a,opts:X}}))],ex:'راجعوا تعريف كل نوع وأمثلته.'});
  return {enter:function(){E.complete('compare')}}}});

/* ========== ١١) م٧ دورة الصخور ========== */
var NODES={magma:{n:'صهارة',x:400,y:400,c:'#ff6a1a'},ign:{n:'صخر ناري',x:150,y:270,c:'#e0663a'},sedi:{n:'رسوبيات',x:220,y:80,c:'#d9b77a'},sed:{n:'صخر رسوبي',x:580,y:80,c:'#b98a5a'},meta:{n:'صخر متحول',x:650,y:270,c:'#9b6cff'}};
var EDGES=[['magma','ign','التبريد والتصلّب'],['ign','sedi','التجوية والتعرية'],['sedi','sed','الضغط والتلاحم'],['sed','meta','الحرارة والضغط'],['meta','magma','الانصهار'],['ign','meta','الحرارة والضغط'],['meta','sedi','التجوية والتعرية'],['sed','sedi','التجوية والتعرية'],['sed','magma','الانصهار'],['ign','magma','الانصهار']];
S({id:'cycle',name:'م٧ دورة الصخور',build:function(el){
  var cur='ign',path=['ign'],busy=false;
  el.innerHTML='<div class="eyebrow">المحطة ٧ · دورة الصخور ص ١٥٠</div><h1 class="t" style="font-size:42px">رحلة قطعة الجرانيت في دورة الصخور</h1><p class="lead" style="margin:0 0 6px"><b class="gl">دورة الصخور:</b> نموذج يصف تحوّل الصخور من نوع إلى آخر باستمرار.</p><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 57%;min-height:0"><svg class="labview" id="yv" viewBox="0 0 800 480" style="flex:1;min-height:0;width:100%;height:100%"></svg></div>'+
   '<div class="col grow side" style="gap:10px"><div class="card" style="padding:10px 14px"><b>🎯 المهمة:</b> انقل قطعة الجرانيت (صخر ناري) لتصبح صخرًا رسوبيًّا، ثم صخرًا متحولًا.<div id="yOpt" class="chq" style="grid-template-columns:1fr"></div><div id="yLog" class="hint" style="margin-top:6px;font-size:16px"></div><div class="qa"><button class="btn ghost" id="yR">↺ ابدأ من جديد</button></div></div><div id="yq" class="col" style="gap:10px"></div></div></div>';
  var sv=$('#yv',el);
  function draw(hl){var s='<defs><marker id="ya" markerWidth="12" markerHeight="12" refX="9" refY="4" orient="auto"><path d="M0 0L10 4L0 8z" fill="#53656e"/></marker><marker id="yb" markerWidth="12" markerHeight="12" refX="9" refY="4" orient="auto"><path d="M0 0L10 4L0 8z" fill="#ff7a1a"/></marker></defs><rect width="800" height="480" fill="#f4f8fa"/>';
    EDGES.forEach(function(e,i){var a=NODES[e[0]],b=NODES[e[1]],mx=(a.x+b.x)/2,my=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L,cu=(i>4?-1:1)*34,cx=mx+nx*cu,cy=my+ny*cu,on=hl===i;
      var sx=a.x+dx/L*62,sy=a.y+dy/L*36,ex=b.x-dx/L*70,ey=b.y-dy/L*40;s+='<path id="ye'+i+'" d="M'+sx+' '+sy+' Q'+cx+' '+cy+' '+ex+' '+ey+'" fill="none" stroke="'+(on?'#ff7a1a':'#9fb2bd')+'" stroke-width="'+(on?6:3)+'" marker-end="url(#'+(on?'yb':'ya')+')"/>'+(i<5||on?'<text x="'+cx+'" y="'+(cy+5)+'" text-anchor="middle" font-size="15" font-weight="700" fill="'+(on?'#b53a27':'#53656e')+'" font-family="Readex Pro" paint-order="stroke" stroke="#f4f8fa" stroke-width="5">'+e[2]+'</text>':'')});
    Object.keys(NODES).forEach(function(k){var v=NODES[k];s+='<g><ellipse cx="'+v.x+'" cy="'+v.y+'" rx="78" ry="40" fill="'+v.c+'" stroke="'+(k===cur?'#14222b':'#fff')+'" stroke-width="'+(k===cur?6:3)+'"/><text x="'+v.x+'" y="'+(v.y+7)+'" text-anchor="middle" font-size="21" font-weight="800" fill="#fff" font-family="Readex Pro">'+v.n+'</text></g>'});
    var c=NODES[cur];s+='<g id="yTok" transform="translate('+(c.x+70)+' '+(c.y-36)+')"><circle r="20" fill="#fff" stroke="#14222b" stroke-width="3"/><text y="7" text-anchor="middle" font-size="22">🪨</text></g>';sv.innerHTML=s}
  function opts(){var o=$('#yOpt',el);o.innerHTML=EDGES.map(function(e,i){return e[0]===cur?'<button data-e="'+i+'">'+e[2]+' ← '+NODES[e[1]].n+'</button>':''}).join('');$$('[data-e]',o).forEach(function(b){b.onclick=function(){go(+b.dataset.e)}});$('#yLog',el).innerHTML='المسار: '+path.map(function(k){return NODES[k].n}).join(' ← ')}
  async function go(i){if(busy)return;busy=true;var e=EDGES[i];draw(i);E.sfx.whoosh();var p=$('#ye'+i,sv),L=p.getTotalLength(),tk=$('#yTok',sv);await E.tw(1300,function(k){var q=p.getPointAtLength(L*E.ease(k));tk.setAttribute('transform','translate('+q.x+' '+q.y+')')});cur=e[1];path.push(cur);draw(i);opts();busy=false;check()}
  function check(){var s=path.join('>');if(/ign>.*sed>.*meta/.test(s)&&!$('#yq .q',el)){E.sfx.win();E.complete('cycle');var q=$('#yq',el);q.insertAdjacentHTML('afterbegin','<div class="fbx ok">✔ أحسنتم! تحوّل الجرانيت (ناري) بالتجوية والتعرية إلى رسوبيات، ثم بالضغط والتلاحم إلى صخر رسوبي، ثم بالحرارة والضغط إلى صخر متحول.</div>');
      E.mcq(q,{id:'l2-cy-q1',goal:4,lvl:2,q:'كيف يمكن أن يتغيّر صخر متحول إلى صخر ناري؟',o:['ينصهر فيصبح صهارة، ثم تبرد وتتصلّب','يتعرض للتجوية فقط','يتلاحم مع الرسوبيات','لا يمكن ذلك أبدًا'],a:0,ex:'الانصهار ثم التبريد والتصلّب.'});
      q.insertAdjacentHTML('beforeend','<div class="card" style="padding:10px 14px"><b>فسّر:</b> كيف يمكن لمعدن الكوارتز أن يوجد في صخر رسوبي وصخر ناري؟<p class="reveal explain" style="margin:4px 0 0">يتكوّن الكوارتز في الصخر الناري (مثل الجرانيت) عند تبريد الصهارة، وعندما يتعرّض الصخر للتجوية والتعرية تنتقل حبيبات الكوارتز وتترسب ثم تتلاحم، فتصبح جزءًا من صخر رسوبي مثل الحجر الرملي.</p></div>')}}
  $('#yR',el).onclick=function(){cur='ign';path=['ign'];draw();opts()};draw();opts();return {}}});

/* ========== ١٢) م٨ تحدي البركان ========== */
var BANK2=[{q:'تتكوّن الصخور النارية نتيجة:',o:['تبريد الصهارة وتصلّبها','تراكم الأصداف','الضغط على الرسوبيات','تبخّر الماء'],a:0},
 {q:'صخر ناري جوفي بلوراته كبيرة:',o:['البازلت','الجرانيت','الريولايت','الأردواز'],a:1},
 {q:'تبرد اللابة بسرعة على سطح الأرض فتتكوّن صخور نارية:',o:['جوفية','سطحية','متورّقة','عضوية'],a:1},
 {q:'الملح الصخري والجبس صخور رسوبية:',o:['فتاتية','كيميائية','عضوية','متحولة'],a:1},
 {q:'الفحم والطباشير صخور رسوبية:',o:['عضوية','كيميائية','نارية','متورّقة'],a:0},
 {q:'في الصخور الرسوبية، الطبقات الأقدم توجد:',o:['في الأعلى','في الأسفل','في المنتصف','لا يوجد ترتيب'],a:1},
 {q:'الرخام صخر متحول:',o:['متورّق','غير متورّق','ناري','رسوبي'],a:1},
 {q:'من أمثلة الصخور المتحولة المتورّقة:',o:['الأردواز','الرخام','الكوارتزيت','الجرانيت'],a:0},
 {q:'الحجر الجيري يتحول بالحرارة والضغط إلى:',o:['الرخام','النايس','البازلت','الفحم'],a:0},
 {q:'العملية التي تحوّل الرسوبيات إلى صخر رسوبي:',o:['الانصهار','الضغط والتلاحم','التبريد والتصلّب','التجوية'],a:1},
 {q:'العملية التي تحوّل الصهارة إلى صخر ناري:',o:['التبريد والتصلّب','التجوية والتعرية','الضغط والتلاحم','التبخّر'],a:0},
 {q:'أكبر الصخور الفتاتية حبيبات:',o:['الغضار','الحجر الطيني','الحجر الرملي','الكونجلوميرات'],a:3}];
S({id:'volcano',name:'م٨ تحدي البركان',build:function(el){E.volcanoGame(el,BANK2,'l2-vol');return {}}});

/* ========== ١٣) ماذا تعلمنا؟ ========== */
S({id:'review',name:'م٩ ماذا تعلمنا؟',build:function(el){return E.review(el,{goals:[
  {t:GO[0],how:'برّدنا الصهارة ببطء وبسرعة وقارنّا البلورات',st:['types','igneous'],q:['l2-ig-q1','l2-ig-q2']},
  {t:GO[1],how:'كوّنّا طبقات الرسوبيات ولاحمناها، ورتّبنا الفتاتية',st:['sed'],q:['l2-sd-ord','l2-sd-q1','l2-sd-q2']},
  {t:GO[2],how:'استخدمنا مكبس الحرارة والضغط دون انصهار',st:['meta'],q:['l2-me-q1']},
  {t:GO[3],how:'تتبّعنا رحلة الجرانيت وصنّفنا العينات',st:['compare','cycle'],q:['l2-cm-sort','l2-cm-tb','l2-cy-q1']},
  {t:GO[4],how:'صنعنا نموذج أحفورة وقارنّاه بأحفورة حقيقية',st:['fossil'],q:['l2-fo-q1','l2-fo-q2']}],
  exit:[{id:'l2-exit1',goal:1,lvl:1,q:'الصخور النارية الجوفية تتكوّن من تبريد الصهارة:',o:['بسرعة على السطح','ببطء داخل الأرض','في ماء البحر','بالضغط فقط'],a:1,cols:2,ex:'ببطء داخل الأرض، لذا بلوراتها كبيرة.'},
        {t:'tf',id:'l2-exit2',goal:3,lvl:1,q:'تتكوّن الصخور المتحولة بعد انصهار الصخر.',v:false,ex:'تتكوّن <b>دون أن ينصهر</b> الصخر.'},
        {id:'l2-exit3',goal:4,lvl:2,q:'أيّ مما يلي يصف دورة الصخور؟',o:['نموذج يصف تحوّل الصخور من نوع إلى آخر باستمرار','تحوّل الصخور الرسوبية إلى نارية فقط','تكوّن المعادن من الصهارة فقط','انتقال المياه بين البحر والسماء'],a:0,ex:'دورة الصخور نموذج يصف تحوّل الصخور من نوع إلى آخر باستمرار.'}],
  extra:function(ex){var d=h('<div></div>');ex.appendChild(d);E.guide(d,[4,5,6,7,8],'a');
    ex.insertAdjacentHTML('beforeend','<div class="card" style="padding:12px 16px"><h3 style="margin:0 0 6px">📝 الواجب · التسليم يوم الأحد القادم</h3><ol style="margin:0;font-size:17px;line-height:1.7"><li>ارسم جدولًا توضّح فيه كيف يتكوّن كل نوع من الصخور الرسوبية الثلاثة، وأعطِ مثالًا على كل نوع.</li><li>وضّح ما تصفه دورة الصخور، وارسم مخططًا لها في دفتر العلوم.</li><li>ابحث عن موقع نشاط بركاني، وصِف كيف تكوّنت معالمه، وسجّل ذلك في دفتر العلوم.</li><li>حُلّ أسئلة مراجعة الفصل في الكتاب ص ١٥٨ – ١٥٩.</li></ol></div>')}})}});

E.lesson('l2',L2);
})();
