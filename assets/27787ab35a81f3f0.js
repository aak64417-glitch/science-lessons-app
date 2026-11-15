/* الدرس الأول: تركيب المادة */
(function(){
"use strict";
var E=window.E,$=E.$,$$=E.$$,n=E.n,h=E.h,IMG=window.IMG||{};
function img(k,st){return IMG[k]?'<img loading="lazy" decoding="async" src="'+IMG[k]+'" alt="" style="'+(st||'')+'">':''}
var IC={
 q:'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="#38d6ff" stroke-width="4"/><path d="M24 24a8 8 0 1 1 12 7c-3 2-4 3-4 7" fill="none" stroke="#f5c451" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="46" r="2.6" fill="#f5c451"/></svg>',
 drop:'<svg viewBox="0 0 64 64"><path d="M32 6C24 20 14 30 14 40a18 18 0 0 0 36 0C50 30 40 20 32 6z" fill="#38d6ff" opacity=".85"/><circle cx="26" cy="40" r="4" fill="#fff" opacity=".7"/></svg>',
 dots:'<svg viewBox="0 0 64 64"><circle cx="20" cy="22" r="7" fill="#ff5d6c"/><circle cx="42" cy="20" r="6" fill="#38d6ff"/><circle cx="30" cy="42" r="8" fill="#8b6cff"/><circle cx="48" cy="44" r="5" fill="#f5c451"/></svg>',
 flask:'<svg viewBox="0 0 64 64"><path d="M26 8h12M28 8v16L14 50a6 6 0 0 0 5 8h26a6 6 0 0 0 5-8L36 24V8" fill="none" stroke="#7fe6ff" stroke-width="4" stroke-linejoin="round"/><path d="M19 44h26l4 8H15z" fill="#8b6cff" opacity=".8"/></svg>',
 atom:'<svg viewBox="0 0 64 64"><ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="#38d6ff" stroke-width="3"/><ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="#8b6cff" stroke-width="3" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="26" ry="10" fill="none" stroke="#f5c451" stroke-width="3" transform="rotate(120 32 32)"/><circle cx="32" cy="32" r="6" fill="#ff5d6c"/></svg>',
 time:'<svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="24" fill="none" stroke="#f5c451" stroke-width="4"/><path d="M32 20v14l10 6" stroke="#38d6ff" stroke-width="4" fill="none" stroke-linecap="round"/></svg>',
 scale:'<svg viewBox="0 0 64 64"><path d="M32 10v44M14 54h36M12 22h40" stroke="#7fe6ff" stroke-width="4" stroke-linecap="round"/><path d="M12 22l-7 14h14zM52 22l-7 14h14z" fill="#f5c451"/></svg>',
 cmp:'<svg viewBox="0 0 64 64"><circle cx="18" cy="32" r="12" fill="#1d4fa8"/><circle cx="46" cy="32" r="12" fill="none" stroke="#38d6ff" stroke-width="3"/><circle cx="46" cy="32" r="3" fill="#ff5d6c"/></svg>'
};
var L1={title:'تركيب المادة',blurb:'ما المادة؟ ومِمَّ تتكون؟ رحلة من قطرة ماء إلى داخل الذرة، وتجربة رذرفورد، وتطور النماذج الذرية.',stations:[]};
function S(o){L1.stations.push(o)}
var GO=['أن يصف الطالب خصائص المادة.','أن يتعرّف الطالب مكونات المادة.','أن يقارن الطالب بين النماذج الذرية المختلفة.'];

/* ========== ١) المقدمة التشويقية ========== */
S({id:'intro',name:'المقدمة التشويقية',full:true,build:function(el){var THREE=window.THREE,drop,mols,atom,Os,Hs,dummy;
  return E.intro(el,{dur:27,z:12,caps:[
    {t:'قطرة ماء معلّقة في الهواء…',at:1,end:7,sub:1},{t:'نقترب أكثر… جزيئات ماء لا تراها العين',at:7.5,end:13,sub:1},{t:'ونقترب أكثر… إلى داخل ذرة واحدة',at:13.5,end:19,sub:1},
    {t:'كل ما حولك مادة… ولكن <span class="gl">ممَّ تتكون؟</span>',at:19.5}],
   build:function(T){dummy=new THREE.Object3D();
     /* القطرة */
     drop=new THREE.Group();var dm=new THREE.MeshStandardMaterial({color:0x6fd3ff,roughness:.05,metalness:.1,transparent:true,opacity:.55,emissive:0x08304a,emissiveIntensity:.6});var dg=new THREE.SphereGeometry(2.6,64,48);var p=dg.attributes.position;for(var i=0;i<p.count;i++){var y=p.getY(i);if(y>0)p.setX(i,p.getX(i)*(1-y/2.6*.35)),p.setZ(i,p.getZ(i)*(1-y/2.6*.35)),p.setY(i,y*1.25)}dg.computeVertexNormals();
     var dmesh=new THREE.Mesh(dg,dm);drop.add(dmesh);var hl=new THREE.Sprite(new THREE.SpriteMaterial({map:E.glowTex('rgba(255,255,255,.95)'),transparent:true,opacity:.6,depthWrite:false}));hl.scale.set(.7,.9,1);hl.position.set(-1.05,1.25,2.2);drop.add(hl);var rim=new THREE.Mesh(dg,new THREE.MeshBasicMaterial({color:0x38d6ff,transparent:true,opacity:.22,side:THREE.BackSide,blending:THREE.AdditiveBlending,depthWrite:false}));rim.scale.setScalar(1.06);drop.add(rim);drop.userData.rim=rim.material;for(var q=0;q<18;q++){var sd=new THREE.Mesh(new THREE.SphereGeometry(.06+Math.random()*.12,16,12),dm);sd.position.set((Math.random()-.5)*9,(Math.random()-.5)*6,(Math.random()-.5)*4-1);drop.add(sd)}T.sc.add(drop);drop.userData.m=dm;drop.userData.hl=hl;
     /* حقل الجزيئات */
     var N=90;mols=[];Os=new THREE.InstancedMesh(new THREE.SphereGeometry(.42,20,14),E.mat(0xff4a4a,{op:0}),N);Hs=new THREE.InstancedMesh(new THREE.SphereGeometry(.26,16,12),E.mat(0xf2f6ff,{op:0}),N*2);
     for(i=0;i<N;i++){var r=Math.random();mols.push({p:new THREE.Vector3((Math.random()-.5)*16,(Math.random()-.5)*10,-(Math.random()*12)-1.5),q:new THREE.Euler(Math.random()*6,Math.random()*6,Math.random()*6),w:new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5)})}
     mols[0].p.set(0,0,0);T.sc.add(Os);T.sc.add(Hs);
     /* ذرة الأكسجين */
     atom=E.atom(T,{p:8,n:8,e:8,mode:'both',r1:1.3,dr:1.0,rn:.2});atom.g.visible=false;atom.g.scale.setScalar(.35);T.sc.add(atom.g);
     T.sc.fog=new THREE.FogExp2(0x02060f,0.045)},
   tick:function(T,t){var cam=T.cam;var e=function(a,b,x){x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
     /* المرحلة ١: القطرة */
     var f1=1-e(6,8,t);drop.visible=f1>0.01;drop.userData.m.opacity=.55*f1;drop.userData.hl.material.opacity=.6*f1;drop.userData.rim.opacity=.22*f1;drop.rotation.y=t*.2;drop.position.y=Math.sin(t*1.3)*.12;drop.scale.set(1+Math.sin(t*3)*.015,1-Math.sin(t*3)*.015,1);
     var mo=e(5.5,8,t)*(1-e(12.5,14.5,t));Os.material.opacity=mo;Hs.material.opacity=mo;Os.visible=Hs.visible=mo>0.01;
     var A=104.5*Math.PI/360;
     mols.forEach(function(m,i){var near=i===0?Math.max(0,1-e(11,15,t)*0):1;m.q.x+=m.w.x*.02;m.q.y+=m.w.y*.02;var jit=i===0?0:Math.sin(t*3+i)*.03;
       dummy.position.copy(m.p).addScalar(jit);dummy.rotation.copy(m.q);dummy.scale.setScalar(1);dummy.updateMatrix();Os.setMatrixAt(i,dummy.matrix);
       [-1,1].forEach(function(s,k){var v=new THREE.Vector3(Math.sin(A)*s*.85,-Math.cos(A)*.85,0).applyEuler(m.q);dummy.position.copy(m.p).add(v).addScalar(jit);dummy.updateMatrix();Hs.setMatrixAt(i*2+k,dummy.matrix)})});
     Os.instanceMatrix.needsUpdate=true;Hs.instanceMatrix.needsUpdate=true;
     /* المرحلة ٣: الذرة */
     var ao=e(13,16,t);atom.g.visible=ao>0.01;atom.g.scale.setScalar(.15+ao*.6);atom.tick(1/60,t);atom.cloud.children[0].material.opacity=.7*ao;
     /* الكاميرا */
     cam.position.z=12-e(0,7,t)*5.5-e(7,13,t)*4.6-e(13,19,t)*(-1.2);cam.position.x=Math.sin(t*.15)*.6;cam.position.y=.3+Math.cos(t*.12)*.3;cam.lookAt(0,0,0)}})}});

/* ========== ٢) ماذا ستتعلم اليوم؟ ========== */
S({id:'wonder',name:'ماذا ستتعلم اليوم؟',build:function(el){return E.wonder(el,{eyebrow:'الدرس الأول · تركيب المادة',items:[
  {ic:IC.q,t:'كيف تعرف أن الشيء الذي أمامك مادة؟'},{ic:IC.dots,t:'ممَّ تتكون المادة مهما صغر حجمها؟'},{ic:IC.flask,t:'كيف اكتشف العلماء تركيب الذرة؟'},{ic:IC.atom,t:'ما الجسيمات الموجودة داخل الذرة؟'},{ic:IC.time,t:'لماذا تغيّرت النماذج الذرية عبر الزمن؟'}]})}});

/* ========== ٣) أهداف الدرس ========== */
S({id:'goals',kind:'goals',name:'أهداف الدرس',build:function(el){return E.goalsScreen(el,{eyebrow:'الدرس الأول · تركيب المادة · ص ١٠٤',idea:'تحتوي الذرات على بروتونات ونيوترونات في نوى صغيرة، تحيط بها سحابة من الإلكترونات.',goals:[{ic:IC.drop,t:GO[0]},{ic:IC.atom,t:GO[1]},{ic:IC.cmp,t:GO[2]}]})}});

/* ========== ٤) اختبار المعرفة السابقة ========== */
S({id:'prior',name:'المعرفة السابقة',build:function(el){el.innerHTML='<div class="eyebrow">تهيئة · ملاحظة المادة</div><h1 class="t">ماذا تعرف قبل أن نبدأ؟</h1><div class="row grow" style="min-height:0"><div class="card" style="flex:.8;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">'+bottle()+'<p class="big" style="margin-top:14px">تأمّل زجاجة نصفها ماء… هل هي فعلًا نصف فارغة؟<br>وإذا شربت ما بها من ماء، فهل تصبح <b class="gl">فارغة تمامًا</b>؟</p></div><div class="col grow" id="pp"></div></div>';
  E.poll($('#pp',el),{compact:1,q:'إذا شربت كل الماء الذي في الزجاجة، فماذا يبقى داخلها؟',o:['لا شيء: تصبح فارغة تمامًا','يبقى داخلها هواء','لا أعرف']});
  E.poll($('#pp',el),{compact:1,kind:'توقّع',q:'هل للهواء كتلة؟ وهل يشغل حيزًا؟',o:['له كتلة ويشغل حيزًا','يشغل حيزًا وليس له كتلة','ليس له كتلة ولا يشغل حيزًا']});
  function bottle(){return '<svg viewBox="0 0 200 300" width="210" height="300"><defs><linearGradient id="bw" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#38d6ff" stop-opacity=".9"/><stop offset="1" stop-color="#1a6fd6"/></linearGradient></defs><path d="M80 20h40v36c0 10 34 20 34 50v170a14 14 0 0 1-14 14H60a14 14 0 0 1-14-14V106c0-30 34-40 34-50z" fill="rgba(160,220,255,.12)" stroke="#7fe6ff" stroke-width="4"/><path d="M50 170h100v106a10 10 0 0 1-10 10H60a10 10 0 0 1-10-10z" fill="url(#bw)" opacity=".85"><animate attributeName="d" dur="3s" repeatCount="indefinite" values="M50 170q25 -6 50 0t50 0v106a10 10 0 0 1-10 10H60a10 10 0 0 1-10-10z;M50 170q25 6 50 0t50 0v106a10 10 0 0 1-10 10H60a10 10 0 0 1-10-10z;M50 170q25 -6 50 0t50 0v106a10 10 0 0 1-10 10H60a10 10 0 0 1-10-10z"/></path><text x="100" y="130" text-anchor="middle" font-size="40" fill="#f5c451">?</text></svg>'}
  return {}}});

/* ========== ٥) المحطة ١: ما المادة؟ ========== */
S({id:'matter',name:'م١ ما المادة؟',build:function(el){
  var IT=[['water','الماء',1,'للماء كتلة ويشغل حيزًا، فهو مادة.'],['wood','الخشب',1,'للخشب كتلة ويشغل حيزًا، فهو مادة.'],['air','الهواء',1,'الهواء مادة: له كتلة ويشغل حيزًا (يتكون من غازات مثل النيتروجين والأكسجين).'],['light','الضوء',0,'الضوء ليس له كتلة ولا يشغل حيزًا، فليس مادة.'],['heat','الحرارة',0,'الحرارة صورة من صور الطاقة، وليست مادة.'],['plant','النبات',1,'النبات مخلوق حي له كتلة ويشغل حيزًا، فهو مادة.']];
  el.innerHTML='<div class="eyebrow">المحطة ١ · ص ١٠٤ · الاستكشاف</div><h1 class="t">ما المادة؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1.25"><p class="lead" style="margin:0">اختاروا كل ما تعتقدون أنه <b class="gl">مادة</b>، ثم اضغطوا «تحقّق».</p><div id="mg" style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">'+IT.map(function(x,i){return '<button class="mcard" data-i="'+i+'" style="position:relative;border:2px solid var(--line2);border-radius:22px;overflow:hidden;padding:0;background:#0a1634;aspect-ratio:16/10">'+img('m_'+x[0],'width:100%;height:100%;object-fit:cover;display:block')+'<span style="position:absolute;inset:auto 0 0;padding:8px;background:linear-gradient(transparent,rgba(2,6,15,.9));font-family:var(--disp);font-size:24px;font-weight:700">'+x[1]+'</span><span class="mk" style="position:absolute;top:8px;left:8px;width:46px;height:46px;border-radius:50%;display:none;place-items:center;font-size:26px;font-weight:700"></span><span class="why" style="position:absolute;inset:0;display:none;align-items:center;justify-content:center;padding:12px;font-size:17px;background:rgba(2,6,15,.86);line-height:1.6"></span></button>'}).join('')+'</div><div class="qa"><button class="btn" id="mChk">✓ تحقّق</button><button class="btn ghost" id="mRst">↻ إعادة</button><span class="hint" id="mMsg">المس الصورة لاختيارها.</span></div></div>'+
   '<div class="col grow"><div class="card reveal" id="mDef"><h3>المادة</h3><p class="big">كل ما له <b class="gl">كتلة</b> ويشغل <b class="gl">حيزًا</b> من الفراغ.</p><div class="explain">لماذا يُعد الهواء مادة ولا يُعد الضوء كذلك؟<br>لأن <b>الهواء له كتلة ويشغل حيزًا</b> من الفراغ، بينما الضوء ليس كذلك. والحرارة صورة من صور <b>الطاقة</b> وليست مادة.</div></div><div id="mq"></div></div></div>';
  var sel={};$$('.mcard',el).forEach(function(b){b.onclick=function(){if(b.dataset.lock)return;var i=b.dataset.i;sel[i]=!sel[i];b.style.borderColor=sel[i]?'var(--au)':'';b.style.boxShadow=sel[i]?'0 0 0 3px var(--au)':'';E.sfx.tick()}});
  $('#mChk',el).onclick=function(){var bad=0;$$('.mcard',el).forEach(function(b){var it=IT[b.dataset.i],s=!!sel[b.dataset.i],ok=s===!!it[2];if(!ok)bad++;b.dataset.lock=1;var mk=$('.mk',b);mk.style.display='grid';mk.style.background=it[2]?'var(--ok)':'var(--no)';mk.textContent=it[2]?'✓':'✗';b.style.borderColor=ok?'var(--ok)':'var(--no)';var w=$('.why',b);w.textContent=it[3];b.onmouseenter=function(){w.style.display='flex'};b.onmouseleave=function(){w.style.display='none'};b.onclick=function(){w.style.display=w.style.display==='flex'?'none':'flex'}});
    $('#mMsg',el).innerHTML=bad?'<b class="neg">'+n(bad)+'</b> اختيارات تحتاج مراجعة. المس أي صورة لقراءة التفسير.':'<b style="color:var(--ok)">ممتاز! كل الاختيارات صحيحة.</b> المس الصور لقراءة التفسير.';bad?E.sfx.no():E.sfx.ok();$('#mDef',el).classList.add('shown');E.complete('matter')};
  $('#mRst',el).onclick=function(){E.replay()};
  E.mcq($('#mq',el),{id:'l1-matter-q1',goal:1,lvl:1,q:'أي مما يلي <b>ليس</b> مادة؟',o:['الماء','الهواء','الأفكار','الخلية'],a:2,ex:'الأفكار ليس لها كتلة ولا تشغل حيزًا، أما الماء والهواء والخلية فلها كتلة وتشغل حيزًا.'});
  return {}}});

/* ========== ٦) المحطة ٢: تجربة الكأس والهواء ========== */
S({id:'glass',name:'م٢ تجربة الكأس والهواء',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٢ · التجربة الاستهلالية ص ١٠١</div><h1 class="t" style="font-size:44px">هل الكأس «الفارغة» فارغة حقًا؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1.45"><canvas class="sim lab" id="gc" width="1000" height="560" style="height:100%;min-height:0;flex:1"></canvas></div><div class="col grow side" style="gap:12px">'+
   '<div class="card" style="padding:14px 18px"><h3>خطوات التجربة</h3><div class="col" style="gap:8px"><button class="btn ghost st" data-s="0">١) ألصق ورقة جافة داخل الكأس</button><button class="btn ghost st" data-s="1" disabled>٢) اقلب الكأس وادفعها رأسيًا في الماء</button><button class="btn ghost st" data-s="2" disabled>٣) اسحب الكأس من الماء ببطء</button><button class="btn ghost st" data-s="3" disabled>٤) أخرج الورقة وافحصها</button></div><div class="chips" style="margin-top:10px"><button class="chip" id="gAir" aria-pressed="false">👁 أظهر جسيمات الهواء</button><button class="chip" id="gTilt" disabled>↩ جرّب: أمِل الكأس داخل الماء</button></div></div>'+
   '<div class="card" style="padding:14px 18px" id="gPred"><h3>توقّع قبل التشغيل</h3><p style="margin:0 0 8px">عندما ندفع الكأس المقلوبة في الماء، ماذا يحدث للورقة؟</p><div class="chips"><button class="chip" data-p="0">ستبتل الورقة</button><button class="chip" data-p="1">ستبقى الورقة جافة</button><button class="chip" data-p="2">لا أعرف</button></div></div>'+
   '<div class="card reveal" id="gEx" style="padding:14px 18px"><h3>التفسير</h3><div class="explain">بقيت الورقة <b>جافة</b> لأن الكأس لم تكن فارغة؛ كان بداخلها <b>هواء</b>. والهواء <b>مادة تشغل حيزًا</b>، فمنع الماء من الصعود إلى الورقة (ارتفع الماء قليلًا فقط لأن الهواء انضغط). وعند إمالة الكأس خرج الهواء على شكل فقاعات، فدخل الماء مكانه وابتلّت الورقة.</div></div></div></div>';
  var cv=$('#gc',el),x=cv.getContext('2d'),W=1000,H=560,st={step:0,gy:-10,target:-10,tilt:0,inside:0,air:false,wet:0,bubbles:[],paperOut:false,showAir:false,tiltOn:false,raf:0,run:false,airLeft:1};
  var SURF=300,TANKB=530;
  var ap=[];for(var i=0;i<46;i++)ap.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.02,vy:(Math.random()-.5)*.02});
  function draw(){x.clearRect(0,0,W,H);
    /* خلفية */
    E.labBg(x,W,H,540);
    /* الحوض */
    x.fillStyle='rgba(58,156,212,.45)';var t=performance.now()/600;x.beginPath();x.moveTo(140,SURF);for(var xx=140;xx<=860;xx+=10)x.lineTo(xx,SURF+Math.sin(xx/40+t)*3);x.lineTo(860,TANKB);x.lineTo(140,TANKB);x.closePath();x.fill();
    x.strokeStyle='#4f6f7c';x.lineWidth=5;x.beginPath();x.moveTo(130,150);x.lineTo(130,TANKB+10);x.lineTo(870,TANKB+10);x.lineTo(870,150);x.stroke();
    /* الكأس المقلوبة */
    x.save();var cx=500,top=st.gy+40;x.translate(cx,top+110);x.rotate(st.tilt);x.translate(-cx,-(top+110));
    var gw=150,gh=220,gb=top,gr=top+gh;/* gb أعلى الكأس (القاعدة)، gr الحافة السفلية */
    /* ماء داخل الكأس */
    var waterTopInside=Math.min(gr,Math.max(gb,gr-st.inside*gh));
    if(gr>SURF){var wt=Math.max(SURF,waterTopInside);x.fillStyle='rgba(47,136,192,.7)';x.fillRect(cx-gw/2+5,wt,gw-10,gr-wt)}
    /* الهواء المحبوس */
    var airBot=Math.min(gr,gr>SURF?Math.max(SURF,waterTopInside):gr);
    if(st.showAir&&st.airLeft>0.02){x.fillStyle='rgba(245,196,81,.22)';x.fillRect(cx-gw/2+5,gb+8,gw-10,Math.max(0,airBot-gb-8));x.fillStyle='#c97c06';ap.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>1)p.vx*=-1;if(p.y<0||p.y>1)p.vy*=-1;var yy=gb+10+p.y*Math.max(4,airBot-gb-20);x.beginPath();x.arc(cx-gw/2+12+p.x*(gw-24),yy,3.2,0,7);x.fill()})}
    x.strokeStyle='#4f6f7c';x.lineWidth=6;x.beginPath();x.moveTo(cx-gw/2,gr);x.lineTo(cx-gw/2+6,gb);x.lineTo(cx+gw/2-6,gb);x.lineTo(cx+gw/2,gr);x.stroke();
    x.fillStyle='rgba(79,111,124,.25)';x.fillRect(cx-gw/2+6,gb,gw-12,10);
    /* الورقة */
    if(!st.paperOut&&st.step>=1){x.fillStyle=st.wet>0.5?'#9a6f7f':'#ffd1dc';x.fillRect(cx-40,gb+10,80,46);x.fillStyle='rgba(0,0,0,.15)';for(var k=0;k<4;k++)x.fillRect(cx-32,gb+20+k*9,64,2)}
    x.restore();
    /* الفقاعات */
    st.bubbles.forEach(function(b){x.strokeStyle='#2b6c8f';x.lineWidth=2;x.beginPath();x.arc(b.x,b.y,b.r,0,7);x.stroke()});
    /* الورقة خارج الكأس */
    if(st.paperOut){x.save();x.translate(250,190);x.rotate(-.12);x.fillStyle=st.wet>0.5?'#9a6f7f':'#ffd1dc';x.fillRect(-70,-45,140,90);x.fillStyle='rgba(0,0,0,.15)';for(k=0;k<5;k++)x.fillRect(-56,-30+k*14,112,3);x.restore();x.font='700 30px "Readex Pro",sans-serif';x.textAlign='center';x.fillStyle=st.wet>0.5?'#b53a27':'#1f7a45';x.fillText(st.wet>0.5?'الورقة مبتلّة 💧':'الورقة جافة ✓',250,280)}
    if(!st.paperOut&&st.wet>0.5){x.font='700 28px "Readex Pro",sans-serif';x.textAlign='center';x.fillStyle='#b53a27';x.fillText('ابتلّت الورقة! 💧',760,200)}
    x.font='600 20px "IBM Plex Sans Arabic",sans-serif';x.fillStyle='#14222b';x.textAlign='right';x.fillText('سطح الماء',860,SURF-12);
  }
  function loop(){if(!st.run)return;st.raf=requestAnimationFrame(loop);if(E.paused){draw();return}
    st.gy+=(st.target-st.gy)*.05;var gr=st.gy+40+220,depth=Math.max(0,gr-SURF);
    if(st.tiltOn){st.tilt+=(0.42-st.tilt)*.03;if(depth>40&&st.airLeft>0){st.airLeft-=0.004;if(Math.random()<.5)st.bubbles.push({x:500+75+Math.random()*10,y:gr-10,r:4+Math.random()*7})}}
    var comp=depth*0.14/220;st.inside=st.airLeft>0?Math.min(1,comp+(1-st.airLeft)*1.05):1;
    if(st.inside>0.78&&depth>60)st.wet=1;
    st.bubbles.forEach(function(b){b.y-=2.2;b.x+=Math.sin(b.y/12)*.6});st.bubbles=st.bubbles.filter(function(b){return b.y>SURF});
    draw()}
  var B=$$('.st',el);
  B.forEach(function(b){b.onclick=function(){var s=+b.dataset.s;E.sfx.pop();
    if(s===0){st.step=1}else if(s===1){st.target=SURF-40-220+190}else if(s===2){st.target=-10}else if(s===3){st.paperOut=true;E.complete('glass');$('#gEx',el).classList.add('shown')}
    b.disabled=true;if(B[s+1])B[s+1].disabled=false;if(s===1)$('#gTilt',el).disabled=false}});
  $('#gAir',el).onclick=function(){st.showAir=!st.showAir;this.setAttribute('aria-pressed',st.showAir)};
  $('#gTilt',el).onclick=function(){st.paperOut=false;st.wet=0;st.airLeft=1;st.tilt=0;st.step=Math.max(st.step,1);st.target=SURF-40-220+190;st.tiltOn=true;this.disabled=true;E.toast('أعدنا الورقة الجافة إلى الكأس… راقبوا الفقاعات: الهواء يخرج!')};
  $$('[data-p]',el).forEach(function(b){b.onclick=function(){$$('[data-p]',el).forEach(function(x){x.setAttribute('aria-pressed',x===b)});E.sfx.tick();E.toast('سُجّل التوقع. لننفّذ التجربة!')}});
  return {enter:function(){st.run=true;loop()},leave:function(){st.run=false;cancelAnimationFrame(st.raf)}}}});

/* ========== ٧) المحطة ٣: رحلة تاريخية ========== */
var HIST=[
 {k:'democritus',n:'ديمقريطس',d:'نحو ٤٠٠ ق.م',pic:'',idea:'الكون يتألف من <b>فراغ</b> ومن جسيمات صغيرة جدًا من المادة لا يمكن تقسيمها، سمّاها <b>ذرات</b> (أي: الشيء الذي لا يتجزأ).',ev:'فكرة فلسفية قائمة على التأمل والتفكير، <b>دون تجارب</b>.',next:'لم تُختبر الفكرة بالتجربة إلا بعد قرون طويلة.'},
 {k:'dalton',n:'دالتون',d:'١٨٠٣م',pic:'p_dalton',idea:'تتكون المادة من ذرات لا تنقسم إلى أجزاء أصغر؛ ذرات العنصر الواحد متشابهة تمامًا، وتختلف ذرات العناصر المختلفة. تصوّر الذرة <b>كرة مصمتة متجانسة</b>.',ev:'اعتمد على نتائج التجارب الكيميائية في دراسة المواد وتفاعلاتها.',next:'لم يفسّر نموذجه وجود شحنات كهربائية داخل الذرة.'},
 {k:'thomson',n:'طومسون',d:'١٨٩٧م',pic:'p_thomson',idea:'الذرة <b>كرة متجانسة موجبة الشحنة</b> تتوزع فيها <b>إلكترونات سالبة الشحنة</b>.',ev:'<b>تجربة الأشعة المهبطية</b>: انحرفت الأشعة عند تقريب مغناطيس منها، فهي جسيمات مشحونة، وأثبت أن في الذرة جسيمات سالبة سمّاها <b>الإلكترونات</b>.',next:'اختبر رذرفورد هذا النموذج بإطلاق جسيمات ألفا على صفيحة ذهب.',demo:1},
 {k:'rutherford',n:'رذرفورد',d:'١٩١١م',pic:'p_rutherford',idea:'معظم حجم الذرة <b>فراغ</b>، وفي مركزها <b>نواة صغيرة جدًا موجبة الشحنة</b> تحوي <b>البروتونات</b>، وتنتشر الإلكترونات في الفراغ المحيط بها.',ev:'<b>تجربة صفيحة الذهب</b>: نفذت معظم جسيمات ألفا، وانحرف قليل منها، وارتد عدد ضئيل جدًا. ثم اكتشف <b>شادويك</b> لاحقًا <b>النيوترون</b> المتعادل داخل النواة.',next:'لم يحدد نموذجه كيف تترتب الإلكترونات حول النواة.'},
 {k:'bohr',n:'بور',d:'١٩١٣م',pic:'p_bohr',idea:'تدور الإلكترونات حول النواة في <b>مستويات طاقة</b> محددة؛ المستوى الأول القريب من النواة يتسع لإلكترونين، والمستويات الأبعد تتسع لإلكترونات أكثر.',ev:'قدّم الدليل من دراسة الضوء الذي تُطلقه الذرات. وشُبّهت المستويات بمدارات كمدارات الكواكب حول الشمس.',next:'أظهرت أبحاث لاحقة أن للإلكترون خصائص موجية، فلا يسير في مدار محدد.'},
 {k:'cloud',n:'النموذج الحديث',d:'منذ ١٩٢٦م',pic:'',idea:'للإلكترونات خصائص <b>موجية</b> وخصائص <b>مادية</b>، ولا تسير في مدارات محددة، بل توجد حول النواة على شكل <b>سحابة إلكترونية</b>.',ev:'نتيجة الأبحاث المستمرة لعلماء مثل شرودنجر. وكثافة السحابة قرب النواة تدل على أن احتمال وجود الإلكترون هناك أكبر.',next:'هذا هو النموذج المعتمد اليوم.'}];
S({id:'history',name:'م٣ رحلة اكتشاف الذرة',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٣ · النماذج الذرية ص ١٠٥–١٠٧</div><h1 class="t" style="font-size:44px">رحلة تاريخية لاكتشاف الذرة</h1><div class="row grow" style="min-height:0"><div class="three" id="hv" style="flex:1"><div class="lbls"></div></div><div class="col" style="flex:1.15;gap:12px;min-height:0"><div class="card" id="hc" style="flex:1;overflow:hidden;transition:opacity .4s,transform .5s"></div></div></div>'+
   '<div id="tl" style="display:flex;gap:10px;margin-top:12px;position:relative">'+HIST.map(function(x,i){return '<button class="tlb" data-i="'+i+'" style="flex:1;border:1px solid var(--line2);background:rgba(255,255,255,.04);border-radius:18px;padding:8px 6px;display:flex;flex-direction:column;align-items:center"><b style="font-family:var(--disp);font-size:20px">'+x.n+'</b><small class="num" style="color:var(--au)">'+x.d+'</small></button>'}).join('')+'</div>';
  var T=null,models={},cur=-1,demo=null;
  function card(i){var x=HIST[i],c=$('#hc',el);c.style.opacity=0;c.style.transform='translateY(18px)';setTimeout(function(){
    c.innerHTML='<div class="row" style="gap:16px;align-items:center;margin-bottom:6px">'+(x.pic&&IMG[x.pic]?img(x.pic,'width:96px;height:96px;object-fit:cover;border-radius:20px;border:2px solid var(--au)'):'<div style="width:96px;height:96px;border-radius:20px;display:grid;place-items:center;background:rgba(245,196,81,.12);border:2px solid var(--au)">'+E.svgModel(x.k,80)+'</div>')+'<div><span class="tag gold num">'+x.d+'</span><h3 style="font-size:34px;margin:4px 0 0">'+x.n+'</h3></div></div><p class="big" style="margin:6px 0"><b class="cyt">فكرة النموذج:</b> '+x.idea+'</p><p class="big" style="margin:6px 0"><b class="gl">الدليل أو الاكتشاف:</b> '+x.ev+'</p>'+(x.demo?'<div class="row" style="align-items:center;gap:12px"><canvas class="sim" id="crt" width="520" height="150" style="width:60%;height:auto"></canvas><button class="btn ghost" id="mag">🧲 قرّب المغناطيس</button></div>':'')+'<p class="hint" style="margin-top:6px">↪ '+x.next+'</p>';
    c.style.opacity=1;c.style.transform='none';if(x.demo)crt()},350)}
  function crt(){var cv=$('#crt',el),g=cv.getContext('2d'),on=false,t0=performance.now();$('#mag',el).onclick=function(){on=!on;this.textContent=on?'↩ أبعد المغناطيس':'🧲 قرّب المغناطيس';E.sfx.pop()};
    (function f(){if(!$('#crt',el))return;demo=requestAnimationFrame(f);var t=(performance.now()-t0)/1000;g.clearRect(0,0,520,150);g.strokeStyle='#7fe6ff';g.lineWidth=3;g.beginPath();g.roundRect?g.roundRect(20,30,480,90,40):g.rect(20,30,480,90);g.stroke();g.fillStyle='#8d95a3';g.fillRect(30,60,18,30);g.fillRect(470,60,18,30);
      var bend=on?40:0;g.strokeStyle='rgba(110,255,170,.9)';g.lineWidth=6;g.beginPath();g.moveTo(50,75);g.quadraticCurveTo(300,75+bend*1.2,470,75+bend);g.stroke();
      for(var i=0;i<8;i++){var u=((t*0.6+i/8)%1);var px=50+u*420,py=75+bend*u*u;g.fillStyle='#38d6ff';g.beginPath();g.arc(px,py,5,0,7);g.fill()}
      if(on){g.fillStyle='#ff5d6c';g.fillRect(250,0,60,22);g.fillStyle='#38d6ff';g.fillRect(310,0,60,22);g.fillStyle='#fff';g.font='700 16px sans-serif';g.textAlign='center';g.fillText('N',280,16);g.fillText('S',340,16)}})()}
  function show(i){if(i===cur)return;cur=i;$$('.tlb',el).forEach(function(b,j){b.style.borderColor=j===i?'var(--au)':'';b.style.background=j===i?'rgba(245,196,81,.14)':'rgba(255,255,255,.04)'});card(i);E.sfx.whoosh();
    if(T){Object.keys(models).forEach(function(k){models[k].g.userData.target=k===HIST[i].k?1:0})}}
  function mk(){T=E.three($('#hv',el),{z:7.5,orbit:true,minD:4,maxD:12});var THREE=T.THREE;
    function wrap(g,tick){var o={g:g,tick:tick||function(){}};g.userData.target=0;g.userData.v=0;g.scale.setScalar(.001);T.sc.add(g);return o}
    /* ديمقريطس */
    var dg=new THREE.Group();for(var i=0;i<40;i++){var m=new THREE.Mesh(new THREE.IcosahedronGeometry(.12+Math.random()*.18,0),E.mat(0xc9a96e,{r:.6}));m.position.set((Math.random()-.5)*4.4,(Math.random()-.5)*3.2,(Math.random()-.5)*2.4);m.userData.w=Math.random()*2;dg.add(m)}
    models.democritus=wrap(dg,function(dt,t){dg.children.forEach(function(m,j){m.rotation.x+=dt*m.userData.w;m.position.y+=Math.sin(t*1.5+j)*.002})});
    /* دالتون */
    var da=new THREE.Mesh(new THREE.SphereGeometry(1.8,64,48),E.mat(0x2f6fd6,{r:.25,m:.2}));models.dalton=wrap(new THREE.Group().add(da),function(dt){da.rotation.y+=dt*.3});
    /* طومسون */
    var tg=new THREE.Group();tg.add(new THREE.Mesh(new THREE.SphereGeometry(2,48,36),E.mat(0xff6b7a,{op:.42,r:.4})));for(i=0;i<10;i++){var ee=new THREE.Mesh(new THREE.SphereGeometry(.18,16,12),E.mat(0x38d6ff,{e:0x0a6f9a,ei:1}));var v=new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(Math.random()*1.5+.2);ee.position.copy(v);tg.add(ee)}
    for(i=0;i<8;i++){var sp=E.textSprite('+',{color:'#fff',size:.5,fs:80});sp.position.set((Math.random()-.5)*2.6,(Math.random()-.5)*2.6,(Math.random()-.5)*2.6);tg.add(sp)}models.thomson=wrap(tg,function(dt){tg.rotation.y+=dt*.3});
    /* رذرفورد */
    var rg=new THREE.Group();rg.add(new THREE.Mesh(new THREE.SphereGeometry(.14,24,18),E.mat(0xff5d6c,{e:0x550010,ei:1})));rg.add(new THREE.Mesh(new THREE.SphereGeometry(2.3,32,24),new THREE.MeshBasicMaterial({color:0x7fe6ff,wireframe:true,transparent:true,opacity:.06})));var res=[];for(i=0;i<6;i++){var e2=new THREE.Mesh(new THREE.SphereGeometry(.12,16,12),E.mat(0x38d6ff,{e:0x0a6f9a,ei:1}));e2.userData={a:Math.random()*6,b:Math.random()*6,r:1.3+Math.random()*.9,w:.4+Math.random()*.8};rg.add(e2);res.push(e2)}
    models.rutherford=wrap(rg,function(dt){res.forEach(function(e){var u=e.userData;u.a+=dt*u.w;u.b+=dt*u.w*.7;e.position.set(Math.cos(u.a)*Math.sin(u.b)*u.r,Math.cos(u.b)*u.r,Math.sin(u.a)*Math.sin(u.b)*u.r)})});
    /* بور (الكربون: ٦ بروتونات، ٦ نيوترونات، ٦ إلكترونات) */
    var ba=E.atom(T,{p:6,n:6,e:6,mode:'bohr',r1:1.1,dr:.9});models.bohr=wrap(ba.g,function(dt,t){ba.tick(dt,t)});
    var ca=E.atom(T,{p:6,n:6,e:6,mode:'cloud',r1:1.1,dr:.9,cloudN:3200});models.cloud=wrap(ca.g,function(dt,t){ca.tick(dt,t)});
    T.hooks.push(function(dt,t){Object.keys(models).forEach(function(k){var g=models[k].g,u=g.userData;u.v+=(u.target-u.v)*Math.min(1,dt*4);g.scale.setScalar(Math.max(.001,u.v));g.visible=u.v>0.01;g.rotation.y+=u.target?dt*.15:0;if(g.visible)models[k].tick(dt,t)})});
    if(cur>=0)models[HIST[cur].k].g.userData.target=1}
  $$('.tlb',el).forEach(function(b){b.onclick=function(){show(+b.dataset.i)}});
  return {enter:function(){if(!T)mk();T.start();if(cur<0)show(0);E.complete('history')},leave:function(){if(T)T.stop();cancelAnimationFrame(demo)},reveal:function(){if(cur<HIST.length-1){show(cur+1);return true}return false}}}});

/* ========== ٨) المحطة ٤: مختبر رذرفورد ========== */
S({id:'rutherford',name:'م٤ مختبر رذرفورد',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٤ · تجربة رذرفورد ص ١٠٦</div><h1 class="t" style="font-size:44px">مختبر رذرفورد: صفيحة الذهب</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1.6;min-height:0"><canvas class="sim" id="rc" width="1100" height="600" style="flex:1;min-height:0;height:100%"></canvas></div><div class="col grow side" style="gap:10px">'+
   '<div class="card" style="padding:12px 16px"><h3 style="margin-bottom:6px">لوحة التحكم</h3><div class="chips"><button class="chip" data-m="t" aria-pressed="false">توقع نموذج طومسون</button><button class="chip" data-m="r" aria-pressed="true">التجربة الفعلية</button></div><div class="qa"><button class="btn" id="rFire">🚀 أطلق ٢٠٠ جسيم</button><button class="btn ghost" id="rStream">⏯ إطلاق مستمر</button><button class="btn ghost" id="rClr">↺ تصفير</button><button class="btn ghost" id="rZoom">🔍 تكبير الذرة</button></div></div>'+
   '<div class="card" style="padding:12px 16px"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center"><div><b class="num" id="c0" style="font-size:40px;color:var(--ok)">٠</b><br><small>نفذت دون انحراف كبير</small></div><div><b class="num" id="c1" style="font-size:40px;color:var(--au)">٠</b><br><small>انحرفت</small></div><div><b class="num" id="c2" style="font-size:40px;color:var(--no)">٠</b><br><small>ارتدّت</small></div></div><p class="hint" style="margin:6px 0 0;text-align:center" id="rTot">مجموع الجسيمات: ٠</p></div>'+
   '<div class="card reveal" style="padding:12px 16px"><h3>ماذا استنتج رذرفورد؟</h3><div class="explain">١) نفاذ <b>معظم</b> الجسيمات ← معظم حجم الذرة <b>فراغ</b>.<br>٢) انحراف <b>قليل</b> منها ← في الذرة جزء <b>موجب الشحنة</b> يتنافر مع جسيمات ألفا الموجبة.<br>٣) ارتداد عدد <b>ضئيل جدًا</b> ← الشحنة الموجبة وكتلة الذرة تتركزان في <b>نواة صغيرة جدًا</b>.</div></div><div id="rq"></div></div></div>';
  var cv=$('#rc',el),x=cv.getContext('2d'),W=1100,H=600,FX=640,FY=300,RING=250;var P=[],hits=[],C=[0,0,0],mode='r',stream=false,zoom=0,raf=0,run=false,queue=0;
  function deflect(){var b=Math.random();if(mode==='t')return (Math.random()-.5)*0.03;var k=0.0045;var th=2*Math.atan(k/Math.max(b,1e-4));return th*(Math.random()<.5?-1:1)}
  function spawn(){var y=FY+(Math.random()-.5)*36;P.push({x:116,y:y,vx:9,vy:0,th:deflect(),hit:false,trail:[]})}
  function cls(th){var a=Math.abs(th);return a<0.09?0:(a<Math.PI/2?1:2)}
  function draw(){x.clearRect(0,0,W,H);var g=x.createRadialGradient(FX,FY,10,FX,FY,600);g.addColorStop(0,'#0f2457');g.addColorStop(1,'#030a1c');x.fillStyle=g;x.fillRect(0,0,W,H);
    /* الشاشة الكاشفة */
    x.strokeStyle='rgba(62,224,143,.35)';x.lineWidth=14;x.beginPath();x.arc(FX,FY,RING,0,Math.PI*2);x.stroke();
    hits.forEach(function(hh){x.fillStyle='rgba(180,255,210,'+hh.a+')';x.beginPath();x.arc(FX+Math.cos(hh.ang)*RING,FY+Math.sin(hh.ang)*RING,4,0,7);x.fill()});
    /* المصدر */
    x.fillStyle='#4a5670';x.fillRect(40,FY-40,70,80);x.fillStyle='#ffcc4d';x.fillRect(106,FY-10,10,20);x.font='600 17px "IBM Plex Sans Arabic"';x.fillStyle='#a9bddf';x.textAlign='center';x.fillText('مصدر جسيمات ألفا',95,FY-52);
    /* صفيحة الذهب */
    var gg=x.createLinearGradient(FX-6,0,FX+6,0);gg.addColorStop(0,'#b88a1f');gg.addColorStop(.5,'#ffe29a');gg.addColorStop(1,'#b88a1f');x.fillStyle=gg;x.fillRect(FX-5,FY-150,10,300);x.fillStyle='#f5c451';x.fillText('صفيحة ذهب رقيقة',FX,FY-162);x.fillStyle='rgba(62,224,143,.8)';x.fillText('شاشة كاشفة',FX+RING-20,FY-RING+20);
    /* الجسيمات */
    P.forEach(function(p){x.strokeStyle='rgba(255,140,90,.35)';x.lineWidth=2;x.beginPath();p.trail.forEach(function(q,i){i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1])});x.stroke();x.fillStyle='#ff8a5c';x.beginPath();x.arc(p.x,p.y,4,0,7);x.fill()});
    if(zoom>0.02)drawZoom()}
  function drawZoom(){var a=zoom;x.save();x.globalAlpha=a;var zx=830,zy=150,R=120;x.fillStyle='rgba(3,10,28,.92)';x.strokeStyle='#f5c451';x.lineWidth=3;x.beginPath();x.arc(zx,zy,R,0,7);x.fill();x.stroke();
    x.font='700 16px "Readex Pro"';x.fillStyle='#f5c451';x.textAlign='center';x.fillText('مكبّرة: ذرات الذهب',zx,zy-R-10);
    [[-50,-40],[40,-50],[-40,40],[50,35],[0,0]].forEach(function(c){x.strokeStyle='rgba(127,230,255,.35)';x.lineWidth=1.5;x.setLineDash([4,5]);x.beginPath();x.arc(zx+c[0],zy+c[1],36,0,7);x.stroke();x.setLineDash([]);x.fillStyle=mode==='t'?'rgba(255,93,108,.35)':'#ff5d6c';if(mode==='t'){x.beginPath();x.arc(zx+c[0],zy+c[1],34,0,7);x.fill()}else{x.beginPath();x.arc(zx+c[0],zy+c[1],2.6,0,7);x.fill()}});
    var t=performance.now()/1000;for(var i=0;i<6;i++){var u=(t*.35+i/6)%1;var yy=zy-90+i*36;var px=zx-R+u*R*2;if(Math.hypot(px-zx,yy-zy)<R){x.fillStyle='#ff8a5c';x.beginPath();x.arc(px,yy,3,0,7);x.fill()}}
    x.restore()}
  function step(){P.forEach(function(p){if(!p.hit&&p.x>=FX){p.hit=true;var v=9;p.vx=Math.cos(p.th)*v;p.vy=Math.sin(p.th)*v}p.x+=p.vx;p.y+=p.vy;p.trail.push([p.x,p.y]);if(p.trail.length>40)p.trail.shift();
      if(p.hit&&Math.hypot(p.x-FX,p.y-FY)>=RING-6){var c=cls(p.th);C[c]++;hits.push({ang:Math.atan2(p.y-FY,p.x-FX),a:.9});p.dead=true}if(!p.hit&&p.x<0)p.dead=true});
    P=P.filter(function(p){return !p.dead});hits.forEach(function(hh){hh.a=Math.max(.25,hh.a-.002)});if(hits.length>700)hits.splice(0,hits.length-700);
    if(queue>0){var k=Math.min(queue,4);for(var i=0;i<k;i++)spawn();queue-=k}if(stream&&Math.random()<.7)spawn();
    $('#c0',el).textContent=n(C[0]);$('#c1',el).textContent=n(C[1]);$('#c2',el).textContent=n(C[2]);$('#rTot',el).textContent='مجموع الجسيمات: '+n(C[0]+C[1]+C[2])}
  function loop(){if(!run)return;raf=requestAnimationFrame(loop);if(!E.paused)step();zoom+=((el._z?1:0)-zoom)*.1;draw()}
  $('#rFire',el).onclick=function(){queue+=200;E.sfx.pop()};$('#rStream',el).onclick=function(){stream=!stream;this.textContent=stream?'⏸ أوقف الإطلاق':'⏯ إطلاق مستمر'};
  $('#rClr',el).onclick=function(){C=[0,0,0];hits=[];P=[]};$('#rZoom',el).onclick=function(){el._z=!el._z};
  $$('[data-m]',el).forEach(function(b){b.onclick=function(){mode=b.dataset.m;$$('[data-m]',el).forEach(function(x){x.setAttribute('aria-pressed',x===b)});C=[0,0,0];hits=[];P=[];E.toast(mode==='t'?'لو كان نموذج طومسون صحيحًا: الشحنة موزعة، فلا انحراف كبير.':'التجربة الفعلية كما وجدها رذرفورد')}});
  E.mcq($('#rq',el),{id:'l1-ruth-q',goal:3,lvl:2,q:'ارتداد عدد ضئيل جدًا من جسيمات ألفا دلّ على أن…',o:['الذرة كرة مصمتة','الشحنة الموجبة متركزة في نواة صغيرة جدًا','الإلكترونات موجبة الشحنة','معظم الذرة مملوء بالمادة'],a:1,ex:'لا يرتد الجسيم الموجب إلا إذا اصطدم بجزء صغير كثيف موجب الشحنة: النواة.'});
  return {enter:function(){run=true;loop();E.complete('rutherford')},leave:function(){run=false;cancelAnimationFrame(raf)}}}});

/* ========== ٩) المحطة ٥: بناء الذرة ========== */
var ELS=[['H','الهيدروجين',1,0],['He','الهيليوم',2,2],['Li','الليثيوم',3,4],['Be','البيريليوم',4,5],['B','البورون',5,6],['C','الكربون',6,6],['N','النيتروجين',7,7],['O','الأكسجين',8,8],['F','الفلور',9,10],['Ne','النيون',10,10]];
S({id:'atom',name:'م٥ بناء الذرة',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٥ · مكونات الذرة ص ١٠٦–١٠٧</div><h1 class="t" style="font-size:44px">ابنِ الذرة واستكشف مكوناتها</h1><div class="chips" style="margin-bottom:10px"><button class="chip" data-tab="lab" aria-pressed="true">🔬 المختبر ثلاثي الأبعاد</button><button class="chip" data-tab="quiz" aria-pressed="false">✍ اختبر فهمك</button></div>'+
   '<div class="row grow tabp" data-p="lab" style="min-height:0"><div class="three" id="av" style="flex:1.5"><div class="lbls"></div><div style="position:absolute;bottom:12px;left:12px;display:flex;gap:6px"><button class="cb" id="zIn">＋</button><button class="cb" id="zOut">－</button><button class="cb" id="zRs">⟲</button></div><div style="position:absolute;top:12px;right:14px" class="hint">اسحب للتدوير · المس جسيمًا للتعرّف عليه</div></div><div class="col grow side" style="gap:10px">'+
   '<div class="card" style="padding:12px 16px"><h3 style="margin-bottom:6px">اختر العنصر</h3><div class="chips">'+ELS.map(function(e,i){return '<button class="chip" data-el="'+i+'" aria-pressed="'+(i===5)+'">'+e[0]+'</button>'}).join('')+'</div><div class="chips" style="margin-top:10px"><button class="chip" data-mode="bohr" aria-pressed="true">نموذج بور (مدارات)</button><button class="chip" data-mode="cloud" aria-pressed="false">النموذج الحديث (سحابة)</button></div></div>'+
   '<div class="card" style="padding:12px 16px" id="aInfo"></div><div class="card" style="padding:12px 16px" id="aPick"><h3>الجسيم المختار</h3><p class="hint" style="margin:0">المس بروتونًا أو نيوترونًا أو إلكترونًا في النموذج.</p></div>'+
   '<div class="explain" style="font-size:17px">📌 مدارات بور <b>وسيلة تمثيل تاريخية</b> تساعد على فهم مستويات الطاقة؛ أما النموذج الحديث فيصف الإلكترونات بأنها <b>سحابة إلكترونية</b> حول النواة، دون مدارات محددة.</div></div></div>'+
   '<div class="row grow tabp" data-p="quiz" style="min-height:0;display:none"><div class="col grow" id="aq1"></div><div class="col grow" id="aq2"></div></div>';
  var T=null,A=null,ei=5,mode='bohr';var INFO={p:['البروتون','موجبة (+)','داخل النواة','p','#ff5d6c'],n:['النيوترون','متعادلة (لا شحنة)','داخل النواة','n','#b9c4d6'],e:['الإلكترون','سالبة (−)','حول النواة (في السحابة الإلكترونية)','e','#38d6ff']};
  function info(){var e=ELS[ei];$('#aInfo',el).innerHTML='<h3>ذرة '+e[1]+' ('+e[0]+')</h3><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center"><div><b class="num pos" style="font-size:36px">'+n(e[2])+'</b><br><small>بروتون</small></div><div><b class="num neu" style="font-size:36px">'+n(e[3])+'</b><br><small>نيوترون</small></div><div><b class="num neg" style="font-size:36px">'+n(e[2])+'</b><br><small>إلكترون</small></div></div><p class="hint" style="margin:6px 0 0">عدد الإلكترونات = عدد البروتونات، فالذرة متعادلة كهربائيًا.</p>'}
  function rebuild(){if(A){T.sc.remove(A.g)}var e=ELS[ei];A=E.atom(T,{p:e[2],n:e[3],e:e[2],mode:mode,r1:1.15,dr:.95,rn:.2,re:.12});A.g.rotation.x=.55;A.g.rotation.z=.15;T.sc.add(A.g);info()}
  function mk(){T=E.three($('#av',el),{z:7,orbit:true,minD:2.2,maxD:14});rebuild();T.hooks.push(function(dt,t){A.tick(dt,t)});
    var ray=new T.THREE.Raycaster(),v=new T.THREE.Vector2();T.r.domElement.addEventListener('pointerup',function(ev){var r=T.r.domElement.getBoundingClientRect();v.x=((ev.clientX-r.left)/r.width)*2-1;v.y=-((ev.clientY-r.top)/r.height)*2+1;ray.setFromCamera(v,T.cam);var objs=A.parts.concat(mode==='bohr'?A.es:[]);var hit=ray.intersectObjects(objs,false)[0];
      if(!hit&&mode==='cloud'){var d=ray.ray.distanceToPoint(new T.THREE.Vector3());if(d>0.5&&d<A.Rmax)hit={object:{userData:{kind:'e'}}}}
      if(hit){var k=hit.object.userData.kind,I=INFO[k];E.sfx.pop();$('#aPick',el).innerHTML='<h3 style="color:'+I[4]+'">'+I[0]+' <span class="tag">'+I[3]+'</span></h3><p style="margin:2px 0"><b>الشحنة:</b> '+I[1]+'</p><p style="margin:2px 0"><b>الموقع:</b> '+I[2]+'</p>'+(k==='e'&&mode==='cloud'?'<p class="hint" style="margin:0">كثافة السحابة قرب النواة تعني احتمالًا أكبر لوجود الإلكترون.</p>':'');E.complete('atom')}})}
  $$('[data-el]',el).forEach(function(b){b.onclick=function(){ei=+b.dataset.el;$$('[data-el]',el).forEach(function(x){x.setAttribute('aria-pressed',x===b)});rebuild();E.sfx.pop()}});
  $$('[data-mode]',el).forEach(function(b){b.onclick=function(){mode=b.dataset.mode;$$('[data-mode]',el).forEach(function(x){x.setAttribute('aria-pressed',x===b)});A.setMode(mode)}});
  $('#zIn',el).onclick=function(){T.cam.position.multiplyScalar(.8)};$('#zOut',el).onclick=function(){T.cam.position.multiplyScalar(1.25)};$('#zRs',el).onclick=function(){T.cam.position.set(0,0,7)};
  $$('[data-tab]',el).forEach(function(b){b.onclick=function(){$$('[data-tab]',el).forEach(function(x){x.setAttribute('aria-pressed',x===b)});$$('.tabp',el).forEach(function(p){p.style.display=p.dataset.p===b.dataset.tab?'flex':'none'});if(b.dataset.tab==='lab'&&T)T.size()}});
  var ch=['موجبة','متعادلة','سالبة'],loc=['داخل النواة','حول النواة'],sym=['p','n','e'];
  E.table($('#aq1',el),{id:'l1-atom-tb',goal:2,lvl:2,q:'أكمل جدول الجسيمات الذرية:',cols:['الجسيم','الشحنة','الموقع','الرمز'],rows:[['البروتون',{a:'موجبة',opts:ch},{a:'داخل النواة',opts:loc},{a:'p',opts:sym}],['النيوترون',{a:'متعادلة',opts:ch},{a:'داخل النواة',opts:loc},{a:'n',opts:sym}],['الإلكترون',{a:'سالبة',opts:ch},{a:'حول النواة',opts:loc},{a:'e',opts:sym}]],ex:'البروتون موجب والنيوترون متعادل وكلاهما في النواة، والإلكترون سالب ويوجد حول النواة.'});
  E.mcq($('#aq2',el),{id:'l1-atom-q1',goal:2,lvl:1,q:'ما البروتون؟',o:['جسيم في النواة شحنته سالبة','جسيم في النواة شحنته موجبة','جسيم يدور حول النواة شحنته موجبة','جسيم في النواة متعادل الشحنة'],a:1,ex:'البروتون جسيم موجب الشحنة يوجد داخل النواة.'});
  E.mcq($('#aq2',el),{id:'l1-atom-q2',goal:2,lvl:2,q:'أي مما يلي <b>لا</b> ينطبق على البروتون؟',o:['يوجد داخل النواة','موجب الشحنة','له كتلة','يدور حول النواة'],a:3,ex:'الذي يوجد حول النواة هو الإلكترون، أما البروتون فداخل النواة.'});
  return {enter:function(){if(!T)mk();T.start()},leave:function(){if(T)T.stop()}}}});

/* ========== ١٠) المحطة ٦: قانون حفظ الكتلة ========== */
S({id:'mass',name:'م٦ قانون حفظ الكتلة',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٦ · مساهمة لافوازييه ص ١٠٥</div><h1 class="t" style="font-size:44px">قانون حفظ الكتلة</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1.35;min-height:0"><canvas class="sim lab" id="bc" width="900" height="560" style="flex:1;min-height:0;height:100%"></canvas></div><div class="col grow side" style="gap:10px">'+
   '<div class="card" style="padding:12px 16px"><div class="row" style="gap:12px;align-items:center">'+img('p_lavoisier','width:84px;height:84px;object-fit:cover;border-radius:18px;border:2px solid var(--au)')+'<p style="margin:0;font-size:18px;line-height:1.7">أوضح <b class="gl">لافوازييه</b> أن كتلة الخشب والأكسجين المتفاعل معه عند الاحتراق تساوي كتلة الرماد وبخار الماء وثاني أكسيد الكربون والغازات الأخرى الناتجة.</p></div></div>'+
   '<div class="card" style="padding:12px 16px"><h3 style="margin-bottom:6px">جرّب بنفسك</h3><div class="chips"><button class="chip" data-sys="closed" aria-pressed="true">🔒 وعاء مغلق</button><button class="chip" data-sys="open" aria-pressed="false">🔓 وعاء مفتوح</button></div><div class="qa"><button class="btn gold" id="bBurn">🔥 أشعل الخشب</button><button class="btn ghost" id="bRst">↺ إعادة</button></div><p class="hint" style="margin:6px 0 0" id="bMsg">لاحظ قراءة الميزان قبل الاحتراق وبعده.</p></div>'+
   '<div class="card reveal" style="padding:12px 16px"><h3>التفسير</h3><div class="explain"><b>قانون حفظ الكتلة:</b> المادة لا تفنى ولا تُستحدث إلا بقدرة الله تعالى، وإنما تتحوّل من شكل إلى آخر. في الوعاء <b>المغلق</b> بقيت الكتلة الكلية ثابتة لأن النواتج (الرماد والغازات وبخار الماء) بقيت داخله. وفي الوعاء <b>المفتوح</b> نقصت القراءة لأن الغازات خرجت إلى الهواء، لا لأن المادة فنيت.</div></div><div id="bq"></div></div></div>';
  var cv=$('#bc',el),x=cv.getContext('2d'),W=900,H=560,s={sys:'closed',burn:0,on:false,smoke:[],m0:250.0,run:false,raf:0,read:250.0};
  function mass(){return s.sys==='closed'?s.m0:s.m0-11.6*s.burn}
  function draw(){x.clearRect(0,0,W,H);E.labBg(x,W,H,520);
    /* الميزان */
    x.fillStyle='#7d8890';x.beginPath();x.roundRect?x.roundRect(250,440,400,80,18):x.rect(250,440,400,80);x.fill();x.fillStyle='#aab4ba';x.fillRect(230,420,440,24);
    x.fillStyle='#02160c';x.fillRect(360,458,180,46);x.font='700 34px "Readex Pro",monospace';x.fillStyle='#1f7a45';x.textAlign='center';s.read+=(mass()-s.read)*.08;x.fillText(s.read.toFixed(1).replace(/\d/g,function(d){return '٠١٢٣٤٥٦٧٨٩'[d]})+' جم',450,492);
    /* الدورق */
    x.strokeStyle='#4f6f7c';x.lineWidth=5;x.fillStyle='rgba(205,232,242,.45)';x.beginPath();x.moveTo(410,140);x.lineTo(410,230);x.lineTo(320,410);x.quadraticCurveTo(315,420,330,420);x.lineTo(570,420);x.quadraticCurveTo(585,420,580,410);x.lineTo(490,230);x.lineTo(490,140);x.closePath();x.fill();x.stroke();
    if(s.sys==='closed'){x.fillStyle='#b07a43';x.fillRect(400,118,100,28);x.fillStyle='#8a5a2b';x.fillRect(404,110,92,10)}
    /* الخشب والرماد */
    var w=1-s.burn;x.fillStyle='#8a5a2b';for(var i=0;i<3;i++){x.save();x.translate(450+(i-1)*40,392);x.rotate((i-1)*.25);x.fillRect(-34*w-6,-10*Math.max(.3,w),68*w+12,20*Math.max(.3,w));x.restore()}
    x.fillStyle='rgba(160,160,170,'+(.3+.6*s.burn)+')';x.beginPath();x.ellipse(450,404,70*s.burn+10,10*s.burn+3,0,0,7);x.fill();
    /* اللهب */
    if(s.on&&s.burn<1){var t=performance.now()/120;for(i=0;i<14;i++){var fx=420+Math.random()*60,fy=380-Math.random()*60*(1-s.burn);x.fillStyle='rgba(255,'+(120+Math.random()*100|0)+',40,.7)';x.beginPath();x.arc(fx,fy,6+Math.random()*10,0,7);x.fill()}}
    /* الدخان والغازات */
    s.smoke.forEach(function(p){x.fillStyle='rgba(110,120,135,'+p.a+')';x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()});
    x.font='600 20px "IBM Plex Sans Arabic"';x.fillStyle='#14222b';x.fillText(s.sys==='closed'?'وعاء مغلق: لا شيء يدخل أو يخرج':'وعاء مفتوح: الغازات تخرج إلى الهواء',450,70)}
  function step(){if(s.on&&s.burn<1){s.burn=Math.min(1,s.burn+.0035);if(Math.random()<.6)s.smoke.push({x:430+Math.random()*40,y:360,vx:(Math.random()-.5)*.8,vy:-1-Math.random(),r:6+Math.random()*8,a:.5})}
    if(s.burn>=1&&s.on){s.on=false;$('#bMsg',el).innerHTML=s.sys==='closed'?'<b style="color:var(--ok)">بقيت الكتلة الكلية ثابتة: '+n('250.0')+' جم</b>':'<b class="neg">نقصت القراءة: خرجت الغازات من الوعاء المفتوح</b>';E.sfx.pop();E.complete('mass')}
    s.smoke.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(s.sys==='closed'){if(p.y<160){p.vy=Math.abs(p.vy)*.3;p.y=160}var half=p.y<230?35:Math.max(35,(p.y-230)/190*125+40);if(Math.abs(p.x-450)>half)p.vx*=-1}else{if(p.y<120)p.a-=.01}});
    s.smoke=s.smoke.filter(function(p){return p.a>0.02&&p.y>-20});if(s.smoke.length>160)s.smoke.splice(0,s.smoke.length-160)}
  function loop(){if(!s.run)return;s.raf=requestAnimationFrame(loop);if(!E.paused)step();draw()}
  $('#bBurn',el).onclick=function(){if(s.burn>=1){E.toast('اضغط «إعادة» لتجربة جديدة');return}s.on=true;E.sfx.whoosh()};
  $('#bRst',el).onclick=function(){s.burn=0;s.on=false;s.smoke=[];s.read=s.m0;$('#bMsg',el).textContent='لاحظ قراءة الميزان قبل الاحتراق وبعده.'};
  $$('[data-sys]',el).forEach(function(b){b.onclick=function(){s.sys=b.dataset.sys;$$('[data-sys]',el).forEach(function(x){x.setAttribute('aria-pressed',x===b)});$('#bRst',el).onclick()}});
  E.mcq($('#bq',el),{id:'l1-mass-q',goal:1,lvl:1,q:'قانون ………… ينص على أن المادة لا تفنى ولا تُستحدث، وإنما تتحول من شكل إلى آخر.',o:['حفظ الكتلة','نيوتن الأول','نيوتن الثاني','نيوتن الثالث'],a:0,cols:2,ex:'هو قانون حفظ الكتلة الذي أوضحه لافوازييه.'});
  return {enter:function(){s.run=true;loop()},leave:function(){s.run=false;cancelAnimationFrame(s.raf)}}}});

/* ========== ١١) المحطة ٧: تحدي العلماء (٤ فرق) ========== */
S({id:'challenge',name:'م٧ تحدي العلماء',build:function(el){
  var R=['🎯 اختيار من متعدد','🧩 ترتيب النماذج','🔎 اكتشف الخطأ','🖼 فسّر الصورة'];
  el.innerHTML='<div class="eyebrow">المحطة ٧ · مسابقة الفرق الأربعة</div><div class="row" style="align-items:center;gap:18px"><h1 class="t" style="font-size:44px;margin:0">تحدي العلماء</h1><div class="chips">'+R.map(function(r,i){return '<button class="chip" data-r="'+i+'" aria-pressed="'+(i===0)+'">'+r+'</button>'}).join('')+'</div><button class="btn ghost" id="cT" style="margin-inline-start:auto">⏱ ٣٠ ثانية للسؤال</button></div>'+E.teamsBoard()+'<div class="grow" id="cr" style="min-height:0;overflow:auto;margin-top:12px"></div>';
  var rounds=[function(b){var Q=[{id:'ch-q1',lvl:1,q:'العالِم الذي اقترح أن الذرة كرة متجانسة موجبة الشحنة تتوزع فيها إلكترونات سالبة:',o:['دالتون','رذرفورد','بور','طومسون'],a:3,ex:'هذا نموذج طومسون.'},
      {id:'ch-q2',lvl:1,q:'جسيم يدور حول النواة وله شحنة سالبة:',o:['البروتون','الإلكترون','النيوترون','النواة'],a:1,ex:'الإلكترون سالب الشحنة ويوجد حول النواة.'},
      {id:'ch-q3',lvl:2,q:'مستويات الطاقة غير محددة، وتوجد الإلكترونات حول النواة على شكل…',o:['أشعة','ضوء','سحابة إلكترونية','طاقة'],a:2,ex:'هذا وصف النموذج الذري الحديث.'},
      {id:'ch-q4',lvl:3,q:'لماذا تغيّرت النماذج الذرية عبر الزمن؟',o:['لأن العلماء اختلفوا في الرأي فقط','لأن التجارب الجديدة قدّمت أدلة لم يفسّرها النموذج السابق','لأن الذرات تغيّرت','لأن النموذج القديم كان صعب الرسم'],a:1,ex:'يُعدَّل النموذج العلمي عندما تظهر أدلة جديدة من التجارب، مثل الأشعة المهبطية وصفيحة الذهب.'}];
      b.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px" id="cg"></div>';Q.forEach(function(q){var d=h('<div></div>');$('#cg',b).appendChild(d);E.mcq(d,Object.assign({goal:3},q))})},
    function(b){E.order(b,{id:'ch-ord',goal:3,lvl:2,q:'رتّبوا النماذج الذرية من الأقدم إلى الأحدث:',items:['دالتون: كرة مصمتة','طومسون: كرة موجبة فيها إلكترونات','رذرفورد: نواة صغيرة موجبة وفراغ','بور: مستويات طاقة','الحديث: سحابة إلكترونية'],ex:'دالتون ← طومسون ← رذرفورد ← بور ← النموذج الحديث.'})},
    function(b){b.innerHTML='<div class="col" id="cs"></div>';
      E.spot($('#cs',b),{id:'ch-sp1',goal:2,lvl:2,parts:['يصف نموذج بور الذرة بأنها تحتوي على نواة صغيرة جدًا،','بداخلها بروتونات موجبة الشحنة،','ونيوترونات سالبة الشحنة،','وتدور الإلكترونات سالبة الشحنة حولها في مستويات طاقة.'],bad:2,fix:'ونيوترونات متعادلة الشحنة',ex:'النيوترون متعادل (لا يحمل شحنة)؛ الجسيم السالب هو الإلكترون.'});
      E.spot($('#cs',b),{id:'ch-sp2',goal:3,lvl:3,parts:['استنتج رذرفورد من تجربة صفيحة الذهب','أن معظم حجم الذرة مملوء بالبروتونات،','وأن في مركزها نواة صغيرة موجبة الشحنة.'],bad:1,fix:'أن معظم حجم الذرة فراغ',ex:'نفاذ معظم جسيمات ألفا دلّ على أن معظم حجم الذرة فراغ.'})},
    function(b){var M=[['dalton','دالتون'],['thomson','طومسون'],['rutherford','رذرفورد'],['cloud','النموذج الحديث']];b.innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px" id="ci"></div>';
      [{k:'thomson',id:'ch-im1',lvl:1},{k:'cloud',id:'ch-im2',lvl:2}].forEach(function(o){var d=h('<div></div>');$('#ci',b).appendChild(d);E.mcq(d,{id:o.id,goal:3,lvl:o.lvl,q:'النموذج الذري في الصورة يمثّل نموذج:',img:'<div style="display:inline-block;background:#030a1c;border-radius:20px;padding:6px">'+E.svgModel(o.k,190)+'</div>',o:M.map(function(m){return m[1]}),a:M.findIndex(function(m){return m[0]===o.k}),cols:2,ex:o.k==='thomson'?'كرة موجبة الشحنة تتوزع فيها إلكترونات سالبة: نموذج طومسون.':'الإلكترونات على شكل سحابة حول النواة، وكثافتها أكبر قرب النواة: النموذج الحديث.'})})}];
  function go(i){$$('[data-r]',el).forEach(function(x){x.setAttribute('aria-pressed',+x.dataset.r===i)});var b=$('#cr',el);b.innerHTML='';rounds[i](b);E.sfx.whoosh()}
  $$('[data-r]',el).forEach(function(x){x.onclick=function(){go(+x.dataset.r)}});$('#cT',el).onclick=function(){E.timer.start(30)};go(0);
  return {enter:function(){E.complete('challenge')}}}});

/* ========== ١٢) المحطة ٨: ماذا تعلمنا اليوم؟ ========== */
S({id:'review',name:'م٨ ماذا تعلمنا؟',build:function(el){return E.review(el,{goals:[
  {t:GO[0],how:'حدّدنا ما يُعد مادة، وأثبتنا أن الهواء يشغل حيزًا، وطبّقنا حفظ الكتلة',st:['matter','glass','mass'],q:['l1-matter-q1','l1-mass-q']},
  {t:GO[1],how:'بنينا الذرة وتعرّفنا البروتون والنيوترون والإلكترون',st:['atom'],q:['l1-atom-tb','l1-atom-q1','l1-atom-q2','ch-sp1']},
  {t:GO[2],how:'تتبّعنا تطور النماذج وجرّبنا صفيحة الذهب وتحدّي العلماء',st:['history','rutherford','challenge'],q:['l1-ruth-q','ch-ord','ch-q1','ch-q4','ch-im1','ch-im2']}],
  exit:[{id:'l1-exit1',goal:1,lvl:1,q:'المادة هي كل ما له…',o:['لون ورائحة','كتلة ويشغل حيزًا','حرارة وضوء','شكل ثابت'],a:1,ex:'تعريف المادة: كل ما له كتلة ويشغل حيزًا من الفراغ.',cols:2},
        {t:'tf',id:'l1-exit2',goal:2,lvl:1,q:'النيوترون جسيم سالب الشحنة يوجد داخل النواة.',v:false,ex:'النيوترون متعادل الشحنة.'},
        {id:'l1-exit3',goal:3,lvl:2,q:'أي نموذج وصف الذرة بأنها نواة صغيرة موجبة يحيط بها فراغ كبير؟',o:['دالتون','طومسون','رذرفورد','ديمقريطس'],a:2,ex:'نموذج رذرفورد بعد تجربة صفيحة الذهب.',cols:2}]})}});

E.lesson('l1',L1);
})();
