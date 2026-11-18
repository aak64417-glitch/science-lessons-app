/* الدرس الأول: المعادن – جواهر الأرض (ص ١٣٦–١٤٢) */
(function(){
"use strict";
var E=window.E,$=E.$,$$=E.$$,n=E.n,h=E.h,IMG=window.IMG||{},img=E.img,card=E.card;
var IC=E.IC={
 gem:'<svg viewBox="0 0 64 64"><path d="M14 22l10-10h16l10 10-18 30z" fill="#b07cff" stroke="#e9dcff" stroke-width="2.5"/><path d="M14 22h36M24 12l8 40M40 12l-8 40" stroke="#e9dcff" stroke-width="2" fill="none"/></svg>',
 lens:'<svg viewBox="0 0 64 64"><circle cx="26" cy="26" r="16" fill="rgba(58,209,197,.25)" stroke="#3ad1c5" stroke-width="5"/><path d="M38 38l16 16" stroke="#ffb547" stroke-width="7" stroke-linecap="round"/></svg>',
 streak:'<svg viewBox="0 0 64 64"><rect x="8" y="30" width="48" height="24" rx="4" fill="#f4f4f4"/><path d="M14 42h30" stroke="#8a3a2a" stroke-width="6" stroke-linecap="round"/><path d="M40 10l14 14-10 8-14-14z" fill="#5b4636"/></svg>',
 scale:'<svg viewBox="0 0 64 64">'+[1,2,3,4,5,6,7,8,9,10].map(function(i){return '<rect x="'+(4+i*5.4)+'" y="'+(58-i*5)+'" width="4.4" height="'+(i*5)+'" rx="1" fill="hsl('+(30+i*25)+',80%,60%)"/>'}).join('')+'</svg>',
 hammer:'<svg viewBox="0 0 64 64"><rect x="10" y="12" width="30" height="14" rx="3" fill="#aab4ba" stroke="#14222b" stroke-width="2"/><rect x="22" y="24" width="7" height="34" rx="3" fill="#b8863b"/><path d="M44 46l6-4 4 6-6 4zM40 54l4-2 2 4z" fill="#ffb547"/></svg>',
 magnet:'<svg viewBox="0 0 64 64"><path d="M14 10v24a18 18 0 0 0 36 0V10H38v24a6 6 0 0 1-12 0V10z" fill="#e23b4a"/><rect x="14" y="10" width="12" height="9" fill="#d9dde3"/><rect x="38" y="10" width="12" height="9" fill="#d9dde3"/></svg>',
 rock:'<svg viewBox="0 0 64 64"><path d="M8 44l8-20 14-8 16 4 10 16-6 14H14z" fill="#8a7563" stroke="#3a2b1f" stroke-width="3"/><path d="M20 30l8 4 10-6" stroke="#3a2b1f" stroke-width="2" fill="none"/></svg>',
 atoms:'<svg viewBox="0 0 64 64">'+[0,1,2,3].map(function(r){return [0,1,2,3].map(function(c){return '<circle cx="'+(14+c*12)+'" cy="'+(14+r*12)+'" r="'+((r+c)%2?4.5:3.2)+'" fill="'+((r+c)%2?'#3ad1c5':'#b07cff')+'"/>'}).join('')}).join('')+'</svg>',
 q:'<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="none" stroke="#3ad1c5" stroke-width="4"/><path d="M24 24a8 8 0 1 1 12 7c-3 2-4 3-4 7" fill="none" stroke="#ffb547" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="46" r="2.6" fill="#ffb547"/></svg>',
 use:'<svg viewBox="0 0 64 64"><path d="M32 6l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z" fill="#ffb547"/></svg>'
};
var GO=['أن يحدّد الطالب الفرق بين المعدن والصخر.','أن يصف الطالب الخصائص المستخدمة في تحديد المعادن.'];
var L1={title:'المعادن – جواهر الأرض',blurb:'ما المعدن؟ وكيف نتعرّفه؟ مختبر لفحص اللون والمخدش والبريق والقساوة والانفصام، ومقياس موهس، ومنجم الجواهر.',stations:[]};
function S(o){L1.stations.push(o)}

/* ===== بيانات عينات المختبر ===== */
var MIN=E.MIN=[{k:'quartz',n:'الكوارتز',img:'m_quartz',H:7,st:'عديم اللون',sc:'#eef1f4',lu:'زجاجي (لافلزي)',br:'f'},
 {k:'calcite',n:'الكالسيت',img:'m_calcite',H:3,st:'أبيض',sc:'#ffffff',lu:'زجاجي (لافلزي)',br:'c'},
 {k:'halite',n:'الهاليت',img:'m_halite',H:2.5,st:'أبيض',sc:'#ffffff',lu:'زجاجي (لافلزي)',br:'c3'},
 {k:'pyrite',n:'البيريت',img:'m_pyrite',H:6.5,st:'أخضر مسودّ',sc:'#2f3a2a',lu:'فلزي',br:'f'},
 {k:'mica',n:'المايكا',img:'m_mica',H:2.5,st:'أبيض',sc:'#ffffff',lu:'لؤلؤي (لافلزي)',br:'c1'},
 {k:'graphite',n:'الجرافيت',img:'u_pencil',H:1.5,st:'أسود',sc:'#1d1d1d',lu:'فلزي',br:'c1'}];
var BRD={f:'مكسر: تتكسر إلى قطع ذات سطوح خشنة أو منحنية',c:'انفصام: تتكسر إلى قطع ذات سطوح ناعمة منتظمة',c3:'انفصام في ثلاثة اتجاهات متعامدة',c1:'انفصام في اتجاه واحد (صفائح رقيقة)'};
var TOOLS=E.HTOOLS=[{k:'nail',n:'ظفر الإصبع',H:2.5,ic:'👆'},{k:'coin',n:'قطعة نقد',H:3,ic:'🪙'},{k:'iron',n:'مسمار حديد',H:4.5,ic:'🔩'},{k:'glass',n:'زجاج',H:5.5,ic:'🥛'},{k:'file',n:'مبرد فولاذي',H:6.5,ic:'🔧'}];
function fx(v){return n(String(v).replace('.','٫'))}

/* قطع العينة عند الطرق: انفصام (حواف مستقيمة) أو مكسر (حواف منحنية) */
function pieces(type){if(type==='c1')return [['M0 0H220V40H0Z',0,-1],['M0 40H220V85H0Z',0,-.3],['M0 85H220V128H0Z',0,.3],['M0 128H220V170H0Z',0,1]];
  if(type==='c3'||type==='c')return [['M0 0H110V85H0Z',-1,-1],['M110 0H220V85H110Z',1,-1],['M0 85H110V170H0Z',-1,1],['M110 85H220V170H110Z',1,1]];
  return [['M0 0H120Q90 60 130 92Q60 100 0 120Z',-1,-.6],['M120 0H220V80Q170 60 130 92Q90 60 120 0Z',1,-1],['M0 120Q60 100 130 92Q170 60 220 80V170H0Z',0,1]]}
E.breakSample=function(g,imgK,type,x0,y0){var U='b'+Math.random().toString(36).slice(2,7);var P=pieces(type);
  g.innerHTML=P.map(function(p,i){return '<clipPath id="'+U+i+'"><path d="'+p[0]+'"/></clipPath><g class="pc" data-dx="'+p[1]+'" data-dy="'+p[2]+'" transform="translate('+x0+' '+y0+')"><g clip-path="url(#'+U+i+')"><image href="'+IMG[imgK]+'" width="220" height="170" preserveAspectRatio="xMidYMid slice"/></g><path d="'+p[0]+'" fill="none" stroke="#14222b" stroke-width="2.5"/></g>'}).join('');
  var pcs=$$('.pc',g);return E.tw(900,function(k){var e=E.ease(k);pcs.forEach(function(p){p.setAttribute('transform','translate('+(x0+ +p.dataset.dx*34*e)+' '+(y0+ +p.dataset.dy*26*e)+') rotate('+(+p.dataset.dx*6*e)+' 110 85)')})})};

/* ========== ١) المقدمة ========== */
S({id:'intro',name:'المقدمة التشويقية',full:true,build:function(el){return window.X3D(el,window.X3STORIES.gems,{done:function(){E.complete()},end:function(){E.go(E.idx+1)}})}});

/* ========== ٢) ماذا ستتعلم اليوم؟ ========== */
S({id:'wonder',name:'ماذا ستتعلم اليوم؟',build:function(el){return E.wonder(el,{eyebrow:'الدرس الأول · المعادن – جواهر الأرض',items:[
  {ic:IC.gem,t:'ما المعدن؟ وكيف يختلف عن الصخر؟'},{ic:IC.atoms,t:'لماذا تتكوّن للمعادن بلورات منتظمة؟'},{ic:IC.streak,t:'هل يكفي لون المعدن لتعرّفه؟'},{ic:IC.scale,t:'كيف نقيس قساوة المعدن؟'},{ic:IC.use,t:'كيف نستفيد من المعادن في حياتنا؟'}]})}});

/* ========== ٣) الأهداف ========== */
S({id:'goals',kind:'goals',name:'أهداف الدرس',build:function(el){return E.goalsScreen(el,{eyebrow:'الدرس الأول · المعادن · ص ١٣٦',idea:'المعادن مواد صلبة غير عضوية توجد في الطبيعة، ولكل معدن خصائص فيزيائية تميّزه.',goals:[{ic:IC.rock,t:GO[0]},{ic:IC.lens,t:GO[1]},{ic:IC.use,t:'<b class="gl">الأهمية:</b> المعادن مواد أساسية يستخدمها الإنسان في أغراض مختلفة.'}]})}});

/* ========== ٤) التهيئة ========== */
S({id:'prior',name:'التهيئة',build:function(el){el.innerHTML='<div class="eyebrow">تهيئة · تأمّل… ص ١٣٦</div><h1 class="t">أيّ هذه العينات معادن؟ وأيّها صخور؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1.05;gap:10px;min-height:0"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">'+
   [['m_garnet','الجارنت'],['m_pyrite','البيريت'],['r_granite','الجرانيت'],['r_layers','صخور طبقية']].map(function(x,i){return '<div class="card pcard spec" style="padding:8px;animation-delay:'+(i*.15)+'s">'+img(x[0],'height:150px;width:100%;object-fit:cover;border-radius:12px')+'<b style="font-family:var(--disp);font-size:20px">'+x[1]+'</b></div>'}).join('')+'</div>'+
   card('','<p class="big" style="margin:0">تستخدم كل يوم أشياء مصنوعة من المعادن، وتمشي فوق الصخور دون أن تنتبه. <b class="gl">وكيف نميّز بينها؟</b></p><p class="hint" style="margin:6px 0 0">في هذا الفصل سوف تتعلم خصائص المعادن، وأنواع الصخور وكيف تتكوّن.</p>')+
   card('📓 دفتر العلوم','<p style="margin:0;font-size:20px">اكتب في دفترك أسماء ثلاثة أشياء تستخدمها يوميًّا تعتقد أنها مصنوعة من المعادن.</p>')+'<div id="pp"></div></div><div class="col grow side" id="pg"></div></div>';
  E.poll($('#pg',el),{compact:1,q:'كم عينة من العينات الأربع تتوقع أنها معادن؟',o:['واحدة','اثنتان','ثلاث','الأربع كلها']});
  return {}}});

/* ========== ٥) م١ ما المعدن؟ ========== */
S({id:'what',name:'م١ ما المعدن؟',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ١ · ما المعدن؟ ص ١٣٦</div><h1 class="t" style="font-size:42px">ما الذي يجعل المادة معدنًا؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:1;gap:10px;min-height:0"><div class="three" id="wl" style="flex:1;min-height:0;border-radius:22px;background:radial-gradient(circle,#211a38,#0a0814)"></div><div class="chips"><button class="chip" data-o="1" aria-pressed="true">💎 معدن: ذرات مرتبة بانتظام</button><button class="chip" data-o="0" aria-pressed="false">🥛 الزجاج: ذرات غير مرتبة</button></div></div>'+
   '<div class="col grow side" style="gap:10px">'+card('تعريف المعدن','<p style="margin:0;font-size:20px;line-height:1.75"><b class="gl">المعدن:</b> مادة صلبة غير عضوية توجد في الطبيعة، ذراتها مرتبة بشكل منتظم ومتكرر، ولها تركيب كيميائي محدد.<br><b class="gl">الصخر:</b> مادة صلبة تتكوّن من معدن واحد أو أكثر.</p><div class="chips" style="margin-top:8px"><span class="tag">غير عضوي: لم ينشأ من نبات أو حيوان</span><span class="tag vi">بلّوري: ذراته مرتبة بانتظام</span><span class="tag gold">يوجد أكثر من ٤٠٠٠ معدن معروف</span></div>')+'<div id="wq" class="col" style="gap:10px"></div></div></div>';
  var T=null,box=$('#wl',el),ord=1,cur=1,P=[],R=[],inst,dm;
  function make(){var THREE=window.THREE;T=E.three(box,{z:9,orbit:true});var N=5,g=new THREE.SphereGeometry(.26,18,14);inst=new THREE.InstancedMesh(g,E.mat(0x3ad1c5,{e:0x0b5e58,ei:.4}),N*N*N);dm=new THREE.Object3D();var i=0;
    for(var x=0;x<N;x++)for(var y=0;y<N;y++)for(var z=0;z<N;z++){P.push(new THREE.Vector3((x-2)*.8,(y-2)*.8,(z-2)*.8));R.push(new THREE.Vector3((Math.random()-.5)*3.6,(Math.random()-.5)*3.6,(Math.random()-.5)*3.6));inst.setColorAt&&inst.setColorAt(i++,new THREE.Color((x+y+z)%2?0x3ad1c5:0xb07cff))}
    T.sc.add(inst);T.hooks.push(function(dt,t){cur+=(ord-cur)*.06;for(var j=0;j<P.length;j++){dm.position.copy(R[j]).lerp(P[j],cur);dm.updateMatrix();inst.setMatrixAt(j,dm.matrix)}inst.instanceMatrix.needsUpdate=true;inst.rotation.y=t*.25;inst.rotation.x=.4})}
  $$('[data-o]',el).forEach(function(b){b.onclick=function(){ord=+b.dataset.o;$$('[data-o]',el).forEach(function(x){x.setAttribute('aria-pressed',x===b)});E.sfx.whoosh()}});
  var q=$('#wq',el);
  E.sort(q,{id:'l1-what-sort',goal:1,lvl:2,q:'هل هو معدن؟ اسحب كل مادة إلى مكانها:',bins:['معدن','ليس معدنًا'],items:[{t:'الكوارتز',b:0,img:img('m_quartz','width:46px;height:34px;object-fit:cover;border-radius:6px')},{t:'الهاليت',b:0,img:img('m_halite','width:46px;height:34px;object-fit:cover;border-radius:6px')},{t:'البيريت',b:0,img:img('m_pyrite','width:46px;height:34px;object-fit:cover;border-radius:6px')},{t:'بلّورة السكر',b:1},{t:'الزجاج',b:1},{t:'الجرانيت (صخر)',b:1,img:img('r_granite','width:46px;height:34px;object-fit:cover;border-radius:6px')}],ex:'الكوارتز والهاليت والبيريت معادن. السكر مادة عضوية مصدرها النبات، والزجاج تصنعه الإنسان وذراته غير مرتبة، والجرانيت صخر يتكوّن من عدة معادن.'});
  
  
  return {enter:function(){if(!T)make();T.start()},leave:function(){T&&T.stop()}}}});

/* ========== ٦) م٢ مختبر فحص المعادن (التجربة الاستهلالية) ========== */
S({id:'lab',name:'التجربة الاستهلالية: فحص المعادن',build:function(el){
  var cur=0,busy=false,RES={},used={},myst=false,MY={n:'عينة مجهولة',H:6.5,st:'أخضر مسودّ',sc:'#2f3a2a',lu:'فلزي',br:'f',my:1};
  el.innerHTML='<div class="eyebrow">المحطة ٢ · التجربة الاستهلالية: فحص عينة معدن ص ١٥٤</div><h1 class="t" style="font-size:42px;margin-bottom:2px">مختبر فحص المعادن</h1><p id="lGoal" style="margin:0 0 6px;font-size:19px;line-height:1.6">🎯 <b>الهدف:</b> نتعرّف المعدن من خصائصه الثابتة (المخدش، البريق، القساوة، التكسّر) لا من لونه فقط. <span style="color:#ffb547">👣 الخطوة التالية: <b id="lNext">اختر عينة، ثم اضغط «العدسة المكبّرة» 🔍</b></span></p><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 57%;gap:8px;min-height:0"><div class="lcdrow"><div class="lcd"><small>العينة</small><b id="lS">الكوارتز</b></div><div class="lcd am"><small>الاختبار</small><b id="lT">—</b></div><div class="lcd"><small>النتيجة</small><b id="lR" style="font-size:24px">اختر أداة</b></div></div>'+
   '<svg class="labview" id="lv" viewBox="0 0 760 440" style="flex:1;min-height:0;width:100%;height:100%"><defs><pattern id="lgrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(120,140,150,.18)"/></pattern><clipPath id="lClip"><rect x="0" y="0" width="220" height="170" rx="22"/></clipPath><clipPath id="lensC"><circle cx="0" cy="0" r="62"/></clipPath><filter id="lsh"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity=".3"/></filter></defs>'+
   '<rect width="760" height="440" fill="#e8eef0"/><rect width="760" height="360" fill="url(#lgrid)"/><rect y="360" width="760" height="14" fill="#384952"/><rect y="374" width="760" height="66" fill="#26333a"/>'+
   '<ellipse cx="200" cy="352" rx="120" ry="12" fill="rgba(0,0,0,.2)"/><g id="lSm" filter="url(#lsh)" transform="translate(90 180)"></g><g id="lBr"></g>'+
   '<g transform="translate(450 286)"><rect width="250" height="66" rx="8" fill="#fbfbf8" stroke="#9aa5ab" stroke-width="3"/><text x="125" y="96" text-anchor="middle" font-size="18" font-weight="700" fill="#ffffff" font-family="Readex Pro">لوح الخدش (القساوة ٧)</text></g><path id="lStk" d="M470 320 L680 320" stroke-linecap="round" fill="none"/><g id="lTool"></g><g id="lLens" style="display:none"></g><g id="lBadge"></g></svg></div>'+
   '<div class="col grow side" style="gap:10px"><div class="card" style="padding:10px 14px"><h3 style="margin:0 0 6px">١) اختر العينة</h3><div class="smp" id="lSmp"></div></div><div class="card" style="padding:10px 14px"><h3 style="margin:0 0 6px">٢) اختر الأداة</h3><div class="tools" id="lTools"></div></div>'+
   '<div class="card" style="padding:10px 14px"><h3 style="margin:0 0 6px">📒 دفتر العلوم</h3><table class="tb" id="lNB" style="font-size:16px"></table></div>'+
   '<div class="card" style="padding:10px 14px"><h3 style="margin:0 0 4px">خطوات التجربة</h3><div id="lSteps" style="font-size:17px;line-height:1.8"></div><p class="hint" style="margin:4px 0 0">⚠ تحذير: لا تتذوّق أي مادة في المختبر.</p></div><div id="lQ"></div></div></div>';
  var sv=$('#lv',el),SM=$('#lSm',el),TL=$('#lTool',el),BD=$('#lBadge',el),STK=$('#lStk',el),LN=$('#lLens',el),BR=$('#lBr',el);
  function S0(){return myst?MY:MIN[cur]}
  function sampleArt(){var s=S0();BR.innerHTML='';SM.style.display='';SM.innerHTML=s.my?'<g transform="scale(1.1 1.06)">'+E.rockG('#d8b84a','#8a6a1a',7)+'</g><text x="110" y="-14" text-anchor="middle" font-size="22" font-weight="800" fill="#14222b" font-family="Readex Pro">عينة مجهولة ؟</text>':'<g clip-path="url(#lClip)"><image href="'+IMG[s.img]+'" width="220" height="170" preserveAspectRatio="xMidYMid slice"/></g><rect width="220" height="170" rx="22" fill="none" stroke="#14222b" stroke-width="3"/>';$('#lS',el).textContent=s.n}
  function lcd(t,r){$('#lT',el).textContent=t;$('#lR',el).innerHTML=r}
  function badge(ok,txt){BD.innerHTML='<g transform="translate(200 120)"><rect x="-130" y="-30" width="260" height="56" rx="16" fill="'+(ok?'#1f7a45':'#b53a27')+'"/><text y="8" text-anchor="middle" font-size="24" font-weight="800" fill="#fff" font-family="Readex Pro">'+txt+'</text></g>';E.tw(350,function(k){BD.setAttribute('opacity',k)})}
  function rec(key,val){var s=S0(),id=s.my?'my':s.k;RES[id]=RES[id]||{n:s.n};RES[id][key]=val;nb();steps()}
  function hard(id){var r=RES[id];if(!r||!r.lo&&!r.hi)return '—';var lo=r.lo||0,hi=r.hi||99;return hi<99&&lo>0?'بين '+fx(lo)+' و'+fx(hi):(hi<99?'أقل من '+fx(hi):'أكبر من '+fx(lo))}
  function nb(){var ids=Object.keys(RES);$('#lNB',el).innerHTML='<thead><tr><th>العينة</th><th>المخدش</th><th>البريق</th><th>القساوة</th><th>التكسّر</th></tr></thead><tbody>'+(ids.length?ids.map(function(id){var r=RES[id];return '<tr><td>'+r.n+'</td><td>'+(r.st||'—')+'</td><td>'+(r.lu||'—')+'</td><td>'+hard(id)+'</td><td>'+(r.br||'—')+'</td></tr>'}).join(''):'<tr><td colspan="5" class="hint">ابدأ الفحص لتُسجَّل النتائج هنا.</td></tr>')+'</tbody>'}
  function nextStep(){var N=[['lens','اضغط «العدسة المكبّرة» 🔍 ولاحظ اللون والبريق'],['streak','اضغط «لوح الخدش» ⬜ ولاحظ لون المسحوق'],['nail','اخدش العينة بـ«ظفر الإصبع» 👆: هل خُدشت؟'],['coin','جرّب «قطعة النقد» 🪙: هل خُدشت؟'],['hammer','اطرق العينة 🔨: انفصام أم مكسر؟']],x=N.filter(function(a){return !used[a[0]]})[0],e=$('#lNext',el);if(e)e.textContent=x?x[1]:'✅ أكملت الفحص! اختر عينة أخرى أو «العينة المجهولة» 🕵 وحاول تحديدها.'}
  function steps(){nextStep();var L=[['lens','١. تأمّل العينة بالعدسة المكبّرة، وسجّل لونها وشكلها وبريقها.'],['streak','٢. احكك العينة على لوح الخدش، ولاحظ لون مسحوقها.'],['nc','٣. حاول خدش العينة بالظفر ثم بقطعة نقد، وسجّل ما يحدث.']];$('#lSteps',el).innerHTML=L.map(function(x){var d=x[0]==='nc'?(used.nail&&used.coin):used[x[0]];return '<div>'+(d?'✅':'⬜')+' '+x[1]+'</div>'}).join('')+'<div>'+(used.lens&&used.streak&&used.nail&&used.coin?'✅':'⬜')+' ٤. التفكير الناقد: أيّ الخصائص ساعدتك أكثر على تعرّف المعدن؟ ولماذا؟</div>';
    if(used.lens&&used.streak&&used.nail&&used.coin&&!$('#lCT',el)){$('#lQ',el).insertAdjacentHTML('beforeend','<div class="card" id="lCT" style="padding:10px 14px"><b>التفكير الناقد</b><p class="reveal explain" style="margin:4px 0 0">المخدش والقساوة أدق من اللون؛ لأن اللون قد يكون خادعًا وقد يتغير بالشوائب، أما لون المسحوق ودرجة القساوة فثابتان غالبًا للمعدن الواحد.</p></div>');E.complete('lab')}}
  function samples(){$('#lSmp',el).innerHTML=MIN.map(function(m,i){return '<button data-s="'+i+'" aria-pressed="'+(!myst&&i===cur)+'">'+img(m.img,'')+'<span>'+m.n+'</span></button>'}).join('')+'<button data-s="my" aria-pressed="'+myst+'" class="my"><b style="font-size:30px">🕵</b><span>عينة مجهولة</span></button>';
    $$('[data-s]',$('#lSmp',el)).forEach(function(b){b.onclick=function(){if(busy)return;myst=b.dataset.s==='my';if(!myst)cur=+b.dataset.s;samples();reset();E.sfx.tick();if(myst)mystQ()}})}
  function reset(){TL.innerHTML='';BD.innerHTML='';LN.style.display='none';STK.setAttribute('d','M470 320 L470 320');STK.setAttribute('stroke-width',0);sampleArt();lcd('—','اختر أداة')}
  $('#lTools',el).innerHTML=[['lens','🔍','العدسة المكبّرة'],['streak','⬜','لوح الخدش']].concat(TOOLS.map(function(t){return [t.k,t.ic,t.n+' ('+fx(t.H)+')']})).concat([['hammer','🔨','اطرق العينة']]).map(function(t){return '<button data-t="'+t[0]+'"><b>'+t[1]+'</b><span>'+t[2]+'</span></button>'}).join('');
  $$('[data-t]',el).forEach(function(b){b.onclick=function(){if(busy)return;run(b.dataset.t)}});
  async function run(k){busy=true;var s=S0();BD.innerHTML='';TL.innerHTML='';LN.style.display='none';if(BR.innerHTML){reset()}used[k]=1;E.sfx.pop();
    if(k==='lens'){lcd('العدسة المكبّرة','…');LN.style.display='';LN.innerHTML='<g clip-path="url(#lensC)"><g id="lz"></g></g><circle r="62" fill="none" stroke="#14222b" stroke-width="10"/><circle r="62" fill="rgba(255,255,255,.08)"/><path d="M44 44 L96 96" stroke="#5b4636" stroke-width="18" stroke-linecap="round"/>';var lz=$('#lz',LN);lz.innerHTML=s.my?'<g transform="scale(2) translate(-100 -80)">'+E.rockG('#d8b84a','#8a6a1a',7)+'</g>':'<image href="'+IMG[s.img]+'" width="440" height="340" x="-220" y="-170" preserveAspectRatio="xMidYMid slice"/>';
      await E.tw(1600,function(q){var x=130+Math.sin(q*Math.PI*1.5)*70+60*q,y=230+Math.cos(q*Math.PI*2)*30;LN.setAttribute('transform','translate('+x+' '+y+')');lz.setAttribute('transform','translate('+(-(x-200)*1)+' '+(-(y-265)*1)+')')});
      lcd('العدسة المكبّرة','البريق: <b>'+s.lu+'</b> · لاحظ لون العينة وشكلها');rec('lu',s.lu)}
    else if(k==='streak'){lcd('لوح الخدش','…');SM.style.display='none';TL.innerHTML='<g id="ts">'+(s.my?'<g transform="scale(.42)">'+E.rockG('#d8b84a','#8a6a1a',7)+'</g>':'<g transform="scale(.42)"><g clip-path="url(#lClip)"><image href="'+IMG[s.img]+'" width="220" height="170" preserveAspectRatio="xMidYMid slice"/></g><rect width="220" height="170" rx="22" fill="none" stroke="#14222b" stroke-width="6"/></g>')+'</g>';
      STK.setAttribute('stroke',s.sc);STK.setAttribute('stroke-width',16);STK.style.filter='drop-shadow(0 0 1px #6b7780)';var ts=$('#ts',TL);
      await E.tw(1800,function(q){var x=455+q*215;ts.setAttribute('transform','translate('+(x-40)+' '+(262+Math.sin(q*30)*3)+')');STK.setAttribute('d','M470 320 L'+Math.max(470,x)+' 320')});
      lcd('لوح الخدش','لون المخدش: <b>'+s.st+'</b>');rec('st',s.st);SM.style.display=''}
    else if(k==='hammer'){lcd('الطرق','…');SM.style.display='none';TL.innerHTML='<g id="hm" transform="translate(330 60)"><rect x="-10" y="0" width="70" height="34" rx="6" fill="#aab4ba" stroke="#14222b" stroke-width="3"/><rect x="18" y="30" width="14" height="90" rx="5" fill="#b8863b" stroke="#14222b" stroke-width="2"/></g>';var hm=$('#hm',TL);
      await E.tw(450,function(q){hm.setAttribute('transform','translate('+(330-q*80)+' '+(60+q*110)+') rotate('+(-q*40)+')')});E.sfx.no();
      if(s.my){SM.style.display='';E.sfx.tick()}else await E.breakSample(BR,s.img,s.br,90,180);TL.innerHTML='';lcd('الطرق',BRD[s.br]);rec('br',s.br==='f'?'مكسر':'انفصام')}
    else{var t=TOOLS.filter(function(x){return x.k===k})[0],ok,txt;lcd(t.n+' ('+fx(t.H)+')','…');
      if(k==='glass'){TL.innerHTML='<g transform="translate(470 120)"><rect width="200" height="120" rx="6" fill="rgba(205,232,242,.7)" stroke="#4f6f7c" stroke-width="4"/><text x="100" y="-10" text-anchor="middle" font-size="18" font-weight="700" fill="#14222b" font-family="Readex Pro">صحن زجاجي (٥٫٥)</text><path id="gl" d="M30 60 L30 60" stroke="#4f6f7c" stroke-width="4" fill="none"/></g>';var gl=$('#gl',TL),scr=s.H>5.5;
        await E.tw(1300,function(q){if(scr)gl.setAttribute('d','M30 60 L'+(30+q*140)+' '+(60+Math.sin(q*9)*4))});ok=scr;txt=scr?'العينة خدشت الزجاج':'لم تخدش العينة الزجاج';badge(scr,scr?'✓ خدشت الزجاج':'✗ لم تخدش الزجاج');
        var r=RES[s.my?'my':s.k]||{};rec(scr?'lo':'hi',scr?Math.max(r.lo||0,5.5):Math.min(r.hi||99,5.5))}
      else{TL.innerHTML='<g id="tt" font-size="70"><text>'+t.ic+'</text></g><path id="tg" d="M120 260 L120 260" stroke="#ffffff" stroke-width="6" stroke-linecap="round" fill="none" style="filter:drop-shadow(0 0 2px #14222b)"/>';var tt=$('#tt',TL),tg=$('#tg',TL),scr2=t.H>s.H;
        await E.tw(1300,function(q){var x=110+q*170;tt.setAttribute('transform','translate('+x+' '+(250+Math.sin(q*20)*4)+')');if(scr2)tg.setAttribute('d','M120 262 L'+(x-10)+' '+(262+Math.sin(q*10)*3))});
        if(!scr2){for(var i=0;i<8;i++)TL.insertAdjacentHTML('beforeend','<circle cx="'+(270+Math.random()*30)+'" cy="'+(240+Math.random()*30)+'" r="3" fill="#ffb547"/>');E.sfx.tick()}
        badge(scr2,scr2?'✓ خُدشت العينة':'✗ لم تُخدش العينة');txt=scr2?'خُدشت؛ قساوتها أقل من '+fx(t.H):'لم تُخدش؛ قساوتها '+fx(t.H)+' أو أكثر';var r2=RES[s.my?'my':s.k]||{};rec(scr2?'hi':'lo',scr2?Math.min(r2.hi||99,t.H):Math.max(r2.lo||0,t.H))}
      lcd(t.n+' ('+fx(t.H)+')',txt)}
    busy=false;if(myst)mystQ()}
  function mystQ(){var q=$('#lQ',el),r=RES.my||{};var ready=r.st&&(r.lo||r.hi);if(!ready){if(!$('#lMy',el))q.insertAdjacentHTML('afterbegin','<div class="card" id="lMy" style="padding:10px 14px;border-color:var(--au)"><b>🕵 تحدٍّ: عينة صفراء لامعة تشبه الذهب!</b><p style="margin:4px 0 0;font-size:18px">افحص مخدشها وقساوتها، ثم حدّد اسمها. (مخدش الذهب أصفر)</p></div>');return}
    var m=$('#lMy',el);if(m&&!m.dataset.q){m.dataset.q=1;var d=h('<div style="margin-top:8px"></div>');m.appendChild(d);E.mcq(d,{id:'l1-lab-myst',goal:2,lvl:3,q:'ما اسم العينة المجهولة؟',o:['الذهب','البيريت','الكالسيت','الكوارتز'],a:1,cols:2,ex:'مخدشها أخضر مسودّ وبريقها فلزي وقساوتها كبيرة: إنها البيريت. أما الذهب فمخدشه أصفر.'})}}
  samples();reset();nb();steps();return {}}});

/* ========== ٧) م٣ اللون والمخدش والبريق ========== */
S({id:'streak',name:'م٣ المخدش واللمعان',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٣ · المخدش واللمعان ص ١٣٩</div><h1 class="t" style="font-size:42px">المخدش واللمعان</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1.15;gap:10px;min-height:0">'+card('المخدش','<div class="row" style="gap:10px;align-items:center">'+img('m_streak','width:150px;height:110px;object-fit:cover;border-radius:12px')+'<p style="margin:0;font-size:18px">المخدش هو <b class="gl">الفتات الناعم الملوّن</b> الذي ينتج عن حكّ المعدن بلوح الخدش (قطعة خزف بيضاء خشنة). ولون المخدش ليس بالضرورة لون المعدن، والاعتماد عليه <b class="gl">أفضل من اللون</b>. مخدش الهيماتيت بني محمرّ.</p></div>')+
   '<div class="card" style="padding:12px 16px"><h3 style="margin:0 0 6px">⚔ ذهب أم «ذهب المغفلين»؟</h3><svg class="labview" viewBox="0 0 760 250" style="width:100%;height:150px" id="gv"><rect width="760" height="250" fill="#e8eef0"/><rect y="200" width="760" height="50" fill="#384952"/>'+
   [0,1].map(function(i){var x=i?400:20;return '<g transform="translate('+x+' 20)"><rect x="70" y="120" width="250" height="56" rx="8" fill="#fbfbf8" stroke="#9aa5ab" stroke-width="3"/><path id="gs'+i+'" d="M90 148 L90 148" stroke="'+(i?'#2f3a2a':'#d8b33a')+'" stroke-width="16" stroke-linecap="round"/><g id="gn'+i+'" transform="translate(0 20)"><g transform="scale(.6)">'+E.rockG('#e0bb3a',i?'#6e5a1a':'#b8901a',i?7:11)+'</g></g><text x="190" y="-2" text-anchor="middle" font-size="22" font-weight="800" fill="#14222b" font-family="Readex Pro" id="gt'+i+'">العينة '+(i?'ب':'أ')+'</text></g>'}).join('')+
   '</svg><div class="qa" style="margin:6px 0 0"><button class="btn" id="gG">⬜ احكك العينتين على لوح الخدش</button><span class="hint">العينتان صفراوان لامعتان… فأيّهما الذهب؟</span></div><p class="reveal explain" id="gE" style="margin:6px 0 0">العينة <b>أ</b> مخدشها أصفر: إنها <b>الذهب</b>. والعينة <b>ب</b> مخدشها أخضر مسودّ: إنها <b>البيريت</b>، أصفر لامع يشبه الذهب.</p></div>'+
   card('البريق (اللمعان): كيفية انعكاس الضوء عن سطح المعدن','<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:18px"><div>'+img('m_pyrite','width:70px;height:56px;object-fit:cover;border-radius:8px;float:right;margin-left:8px')+'<b class="gl">بريق فلزي:</b> يلمع سطح المعدن كالفلزات. مثال: البيريت</div><div>'+img('m_quartz','width:70px;height:56px;object-fit:cover;border-radius:8px;float:right;margin-left:8px')+'<b class="gl">بريق لافلزي:</b> لؤلؤي، زجاجي، باهت، ترابي. مثال: الكوارتز (زجاجي)</div></div>')+'</div>'+
   '<div class="col grow side" id="sq" style="gap:10px"></div></div>';
  $('#gG',el).onclick=async function(){E.sfx.pop();var a=[$('#gn0',el),$('#gn1',el)],s=[$('#gs0',el),$('#gs1',el)];await E.tw(1700,function(q){a.forEach(function(g,i){var x=60+q*200;g.setAttribute('transform','translate('+(x-60)+' '+(64+Math.sin(q*30)*3)+')');s[i].setAttribute('d','M90 148 L'+Math.max(90,x)+' 148')})});$('#gt0',el).textContent='المخدش: أصفر';$('#gt1',el).textContent='المخدش: أخضر مسودّ';E.complete('streak')};
  var q=$('#sq',el);
  
  E.sort(q,{id:'l1-st-sort',goal:2,lvl:2,q:'صنّف أوصاف البريق:',bins:['بريق فلزي','بريق لافلزي'],items:[{t:'يلمع كالفلزات (البيريت)',b:0},{t:'زجاجي (الكوارتز)',b:1},{t:'لؤلؤي',b:1},{t:'ترابي',b:1},{t:'باهت',b:1}],ex:'البريق الفلزي يلمع كالفلزات، أما اللؤلؤي والزجاجي والباهت والترابي فأنواع من البريق اللافلزي.'});
  q.insertAdjacentHTML('beforeend','<div class="card" style="padding:10px 14px"><b>وضّح:</b> كيف تحصل على مخدش معدن؟<p class="reveal explain" style="margin:4px 0 0">بحكّ المعدن على لوح الخدش، ثم ملاحظة لون المسحوق الذي يتركه.</p></div>');
  return {}}});

/* ========== ٨) م٤ مقياس موهس ========== */
var MOHS=['التلك','الجبس','الكالسيت','الفلوريت','الأباتيت','الفلسبار','الكوارتز','التوباز','الكوروندم','الألماس'];
S({id:'mohs',name:'م٤ مقياس موهس',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٤ · القساوة ص ١٣٩</div><h1 class="t" style="font-size:42px">مقياس موهس: من يخدش من؟</h1><p class="lead" style="margin:0 0 6px"><b class="gl">القساوة:</b> مقاومة المعدن للخدش؛ فالمعدن الأقسى يخدش المعدن الأقل قساوة.</p><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 58%;gap:8px;min-height:0">'+
   '<svg class="labview" id="mv" viewBox="0 0 800 400" style="flex:1;min-height:0;width:100%;height:100%"></svg><div class="row" style="gap:8px;align-items:center"><span class="tag gold" id="mA">المعدن الأول: —</span><span class="tag" id="mB">المعدن الثاني: —</span><button class="btn" id="mGo" disabled>⚔ اختبر الخدش</button><button class="btn ghost" id="mClr">↺</button></div></div>'+
   '<div class="col grow side" id="mq" style="gap:10px"><div class="card" style="padding:10px 14px"><p style="margin:0;font-size:19px">المس معدنين في المقياس: الأول يحاول خدش الثاني. مثال من الكتاب: الفلوريت (٤) يخدش الكالسيت (٣)، لكنه لا يخدش الأباتيت (٥).</p><div class="fbx" id="mRes" style="margin-top:8px;display:none"></div></div></div></div>';
  var sv=$('#mv',el),A=null,B=null;
  function draw(an){var s='<rect width="800" height="400" fill="#e8eef0"/><rect y="340" width="800" height="60" fill="#384952"/>';MOHS.forEach(function(m,i){var x=40+i*74,hh=26+i*28,sel=(A===i?'#ffb547':(B===i?'#3ad1c5':null));
      s+='<g data-m="'+i+'" style="cursor:pointer"><rect x="'+x+'" y="'+(340-hh*(an==null?1:an))+'" width="58" height="'+(hh*(an==null?1:an))+'" rx="8" fill="hsl('+(200-i*18)+',60%,'+(62-i*2)+'%)" stroke="'+(sel||'#14222b')+'" stroke-width="'+(sel?6:2)+'"/><text x="'+(x+29)+'" y="'+(330-hh*(an==null?1:an))+'" text-anchor="middle" font-size="26" font-weight="800" fill="#14222b" font-family="Readex Pro">'+n(i+1)+'</text><text x="'+(x+29)+'" y="372" text-anchor="middle" font-size="15" font-weight="700" fill="#fff" font-family="Readex Pro">'+m+'</text></g>'});
    E.HTOOLS.concat([{n:'لوح الخدش',H:7}]).forEach(function(t,j){var x=40+(t.H-1)*74+29,y=340-(26+(t.H-1)*28)-50-(j%3)*30;s+='<g style="pointer-events:none"><line x1="'+x+'" y1="'+(y+8)+'" x2="'+x+'" y2="340" stroke="#14222b" stroke-dasharray="4 4" opacity=".5"/><rect x="'+(x-52)+'" y="'+(y-16)+'" width="104" height="26" rx="13" fill="#fff" stroke="#0b6884" stroke-width="2"/><text x="'+x+'" y="'+(y+3)+'" text-anchor="middle" font-size="13" font-weight="700" fill="#0b3a4a" font-family="Readex Pro">'+t.n+' '+fx(t.H)+'</text></g>'});
    s+='<text x="40" y="30" font-size="18" font-weight="700" fill="#53656e" font-family="Readex Pro">الأقل قساوة ←</text><text x="760" y="30" text-anchor="end" font-size="18" font-weight="700" fill="#53656e" font-family="Readex Pro">→ الأقسى</text>';sv.innerHTML=s;
    $$('[data-m]',sv).forEach(function(g){g.onclick=function(){var i=+g.dataset.m;if(A==null||(A!=null&&B!=null)){A=i;B=null}else if(i!==A)B=i;E.sfx.tick();ui();draw()}})}
  function ui(){$('#mA',el).textContent='المعدن الأول: '+(A==null?'—':MOHS[A]+' ('+n(A+1)+')');$('#mB',el).textContent='المعدن الثاني: '+(B==null?'—':MOHS[B]+' ('+n(B+1)+')');$('#mGo',el).disabled=A==null||B==null}
  $('#mGo',el).onclick=function(){var ok=A>B,r=$('#mRes',el);r.style.display='block';r.className='fbx '+(ok?'ok':'no');r.innerHTML=ok?'✔ <b>'+MOHS[A]+'</b> ('+n(A+1)+') يخدش <b>'+MOHS[B]+'</b> ('+n(B+1)+') لأنه أقسى منه.':'✘ <b>'+MOHS[A]+'</b> ('+n(A+1)+') لا يخدش <b>'+MOHS[B]+'</b> ('+n(B+1)+') لأنه أقل منه قساوة.';ok?E.sfx.ok():E.sfx.no();E.complete('mohs')};
  $('#mClr',el).onclick=function(){A=B=null;ui();draw();$('#mRes',el).style.display='none'};
  var q=$('#mq',el);
  
  
  return {enter:function(){E.tw(900,function(k){draw(E.ease(k))})}}}});

/* ========== ٩) م٥ الانفصام والمكسر ========== */
/* ========== الانفصام والمكسر: محاكاة ثلاثية الأبعاد ========== */
S({id:'cleave',name:'م٥ الانفصام والمكسر',build:function(el){
  var X=[{n:'المايكا',t:'انفصام في اتجاه واحد: تنفصل إلى صفائح رقيقة ملساء'},{n:'الهاليت',t:'انفصام في ثلاثة اتجاهات متعامدة: تنفصل إلى مكعبات'},{n:'الكوارتز',t:'مكسر: قطع ذات سطوح خشنة منحنية غير منتظمة'}],c=0,st=null;
  el.innerHTML='<div class="eyebrow">المحطة ٥ · الانفصام والمكسر ص ١٣٨</div><h1 class="t" style="font-size:42px">كيف يتكسّر المعدن؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 56%;gap:8px;min-height:0"><div class="chips" id="cT">'+X.map(function(x,i){return '<button class="chip" data-c="'+i+'" aria-pressed="'+(i===0)+'">'+x.n+'</button>'}).join('')+'</div><div class="sim" style="flex:1;min-height:0;width:100%;border-radius:18px;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 40%,#3a5168,#0e1822 78%)"><div id="cV" style="position:absolute;inset:0"></div><div id="cL" style="position:absolute;top:10px;right:12px;left:12px;text-align:center;pointer-events:none"><span style="background:#13283a;color:#ffd36b;font-weight:800;font-size:20px;padding:6px 16px;border-radius:99px;display:inline-block"></span></div><div style="position:absolute;bottom:10px;left:12px;color:#cfe3ff;font-size:15px;pointer-events:none">✋ اسحب لتدوير العينة</div></div><div class="qa" style="margin:0"><button class="btn gold" id="cGo">🔨 اطرق العينة</button><button class="btn ghost" id="cR">↺ عينة جديدة</button></div></div>'+
   '<div class="col grow side" id="cq" style="gap:10px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+card('الانفصام','<p style="margin:0;font-size:18px">تكسّر المعدن إلى قطع ذات سطوح <b class="gl">ناعمة منتظمة</b> عاكسة للضوء.</p>')+card('المكسر','<p style="margin:0;font-size:18px">تكسّر المعدن إلى قطع ذات سطوح <b class="gl">خشنة أو منحنية</b>.</p>')+'</div><div class="card reveal" style="padding:10px 14px"><b>لماذا يحدث الانفصام؟</b><p style="margin:4px 0 0;font-size:19px">يحدث الانفصام بسبب وجود مناطق ضعف في ترتيب ذرات المعدن.</p></div></div></div>';
  var V=E.view3($('#cV',el),function(V){V.cam.position.z=11}),P=[],PL=[],HM=null;V.spin=.3;
  function lab(s){$('#cL span',el).textContent=s}
  function ease(k){k=Math.max(0,Math.min(1,k));return 1-Math.pow(1-k,3)}
  function build(){if(!V.ready)return;var T=V.T,G=V.G;E.clear3(G);P=[];PL=[];st=null;V.ang.x=.42;lab(X[c].n+': عينة كاملة… اطرقها بالمطرقة');var r=E.rnd3(7+c);
    if(c===0){var mm=new T.MeshPhysicalMaterial({color:'#c9b07a',roughness:.22,metalness:.15,transparent:true,opacity:.86,iridescence:.7,iridescenceIOR:1.4,sheen:.6,sheenColor:new T.Color('#fff4d6'),side:T.DoubleSide,flatShading:true});
      for(var i=0;i<16;i++){var g=new T.CylinderGeometry(1.45,1.45,.075,6),m=new T.Mesh(g,mm);m.add(E.edges3(T,g,'#fff6dc',.55));m.position.y=-.6+i*.08;m.rotation.y=Math.PI/6;G.add(m);P.push({m:m,y0:m.position.y,i:i,dx:(r()-.5)*.5,dz:(r()-.5)*.5,rx:(r()-.5)*.25,rz:(r()-.5)*.25})}
      var pg=new T.PlaneGeometry(3.6,3.6);for(i=0;i<3;i++){var pl=new T.Mesh(pg,new T.MeshBasicMaterial({color:'#ffd36b',transparent:true,opacity:0,side:T.DoubleSide,depthWrite:false}));pl.rotation.x=-Math.PI/2;G.add(pl);PL.push({m:pl,i:4+i*4})}}
    else if(c===1){var hm=new T.MeshPhysicalMaterial({color:'#f7f1e8',roughness:.1,transparent:true,opacity:.8,clearcoat:1,side:T.FrontSide}),s=.78,bx=new T.BoxGeometry(s,s,s);
      for(var a=0;a<3;a++)for(var b=0;b<3;b++)for(var d=0;d<3;d++){var m2=new T.Mesh(bx,hm),e=E.edges3(T,bx,'#ffffff',0);m2.add(e);m2.position.set((a-1)*s,(b-1)*s,(d-1)*s);G.add(m2);P.push({m:m2,e:e,v:[a-1,b-1,d-1],rx:(r()-.5)*.5,ry:(r()-.5)*.5})}
      G.add(E.edges3(T,new T.BoxGeometry(3*s,3*s,3*s),'#ffffff',.9));P.outer=G.children[G.children.length-1];
      var cols=['#ef4444','#22c55e','#3b82f6'],pg2=new T.PlaneGeometry(3.4,3.4);[[0,Math.PI/2,0],[Math.PI/2,0,0],[0,0,0]].forEach(function(ro,ax){[-.5,.5].forEach(function(o){var pl=new T.Mesh(pg2,new T.MeshBasicMaterial({color:cols[ax],transparent:true,opacity:0,side:T.DoubleSide,depthWrite:false}));pl.rotation.set(ro[0],ro[1],ro[2]);var pp=[0,0,0];pp[ax]=o*s;pl.position.set(pp[0],pp[1],pp[2]);G.add(pl);PL.push({m:pl,ax:ax})})})}
    else{var qm=new T.MeshPhysicalMaterial({color:'#eef6ff',roughness:.05,transparent:true,opacity:.6,clearcoat:1,flatShading:true,side:T.DoubleSide,depthWrite:false});P.whole=E.quartz3(T,qm,.85,2.2);G.add(P.whole);
      var rip=E.tex3(T,'rip'),sm=new T.MeshPhysicalMaterial({color:'#e8f1fb',roughness:.3,transparent:true,opacity:.82,clearcoat:.6,bumpMap:rip,bumpScale:3,roughnessMap:rip});
      var spots=[[0,1.9,0,.5],[0,1.1,.2,.6],[-.3,.4,-.2,.62],[.35,.5,.3,.55],[0,-.3,0,.65],[-.35,-1,.25,.55],[.3,-1.1,-.25,.55],[0,-1.9,0,.5],[.45,1.3,-.35,.45],[-.45,-.2,.4,.48]];
      spots.forEach(function(q,i){var g=new T.SphereGeometry(1,14,10),pa=g.attributes.position,ph=[r()*6,r()*6,r()*6];for(var k=0;k<pa.count;k++){var x=pa.getX(k),y=pa.getY(k),z=pa.getZ(k),f=1+.28*Math.sin(2.6*x+ph[0])*Math.sin(2.2*y+ph[1])*Math.sin(2.9*z+ph[2])+.12*Math.sin(5*x+3*y+ph[2]);pa.setXYZ(k,x*f*q[3],y*f*q[3]*.75,z*f*q[3]*.85)}g.computeVertexNormals();
        var m3=new T.Mesh(g,sm);m3.position.set(q[0],q[1],q[2]);m3.rotation.set(r()*3,r()*3,r()*3);m3.visible=false;G.add(m3);var dir=new T.Vector3(q[0]+(r()-.5)*.8,q[1]*.25,q[2]+(r()-.5)*.8).normalize();P.push({m:m3,p0:m3.position.clone(),dir:dir,sp:.9+r()*.9,rr:new T.Vector3(r()-.5,r()-.5,r()-.5).multiplyScalar(3),r0:m3.rotation.clone()})})}
    HM=new T.Group();var head=new T.Mesh(new T.BoxGeometry(1.3,.48,.48),new T.MeshStandardMaterial({color:'#7c8791',metalness:.9,roughness:.3})),hd=new T.Mesh(new T.CylinderGeometry(.075,.09,2.4,12),new T.MeshStandardMaterial({color:'#a8743a',roughness:.6}));hd.position.y=1.2;HM.add(head,hd);HM.visible=false;V.sc.add(HM)}
  V.frame=function(t){if(!st)return;var k=t-st.t0,T=V.T;
    if(k<.5){var q=k/.5;HM.visible=true;HM.position.set(2.6-q*2.6,st.top+2.1-q*2.1,0);HM.rotation.z=-1.2+q*1.2+0}else if(k<1.1){var q2=(k-.5)/.6;HM.position.set(q2*2.6,st.top+q2*2.6,0);HM.rotation.z=-q2*1.1;if(!st.hit){st.hit=1;E.sfx&&E.sfx.no&&E.sfx.no()}}else HM.visible=false;
    var s=ease((k-.5)/1.6);
    if(c===0){P.forEach(function(o){o.m.position.y=o.y0-s*.7+s*o.i*.095;o.m.position.x=s*o.dx*(o.i>10?1.6:.4);o.m.position.z=s*o.dz*(o.i>10?1.6:.4);o.m.rotation.x=s*o.rx;o.m.rotation.z=s*o.rz});PL.forEach(function(p){p.m.position.y=-.6-s*.7+(p.i-.5)*.08+s*(p.i-.5)*.095;p.m.material.opacity=.32*s})}
    else if(c===1){P.forEach(function(o){o.m.position.set(o.v[0]*(.78+s*.55),o.v[1]*(.78+s*.55),o.v[2]*(.78+s*.55));o.m.rotation.set(s*o.rx,s*o.ry,0);o.e.material.opacity=Math.min(1,s*1.4)});if(P.outer)P.outer.material.opacity=.9*(1-s);PL.forEach(function(p){p.m.material.opacity=.28*Math.min(1,s*1.5)*(1-Math.max(0,s-.85)*4)})}
    else{if(k>=.5){P.whole.visible=false;P.forEach(function(o){o.m.visible=true;o.m.position.copy(o.p0).multiplyScalar(1-.25*s).addScaledVector(o.dir,s*o.sp*.6);o.m.rotation.set(o.r0.x+o.rr.x*s,o.r0.y+o.rr.y*s,o.r0.z+o.rr.z*s)})}}
    if(k>2.2&&!st.done){st.done=1;lab(X[c].n+': '+X[c].t);E.sfx&&E.sfx.pop&&E.sfx.pop();E.complete('cleave');$('#cGo',el).disabled=false}};
  $$('[data-c]',el).forEach(function(b){b.onclick=function(){if(st&&!st.done)return;c=+b.dataset.c;$$('[data-c]',el).forEach(function(z){z.setAttribute('aria-pressed',z===b)});V.sc.remove(HM);build()}});
  $('#cR',el).onclick=function(){if(st&&!st.done)return;V.sc.remove(HM);build()};
  $('#cGo',el).onclick=function(){if(!V.ready||(st&&!st.done))return;if(st){V.sc.remove(HM);build()}st={t0:performance.now()/1000,top:[.95,1.5,2.35][c]};this.disabled=true;V.auto=false;V.ang.y=.5;setTimeout(function(){V.auto=true},2600)};
  V.p.then(function(){build()});lab(X[0].n);
  E.mcq($('#cq',el),{id:'l1-cl-q1',goal:2,lvl:1,q:'تكسّر المعدن إلى قطع ذات سطوح ناعمة منتظمة عاكسة للضوء يسمى:',o:['المكسر','الانفصام','المخدش','البريق'],a:1,cols:2,ex:'هذا هو الانفصام، كما في المايكا والهاليت.'});
  E.mcq($('#cq',el),{id:'l1-cl-q2',goal:2,lvl:2,q:'ينفصم الهاليت في:',o:['اتجاه واحد','اتجاهين','ثلاثة اتجاهات متعامدة','لا ينفصم، بل له مكسر'],a:2,cols:2,ex:'الهاليت ينفصم في ثلاثة اتجاهات متعامدة، أما المايكا ففي اتجاه واحد.'});
  return {enter:function(){V.start()},leave:function(){V.stop()}}}});

/* ========== ١٠) م٦ تجربة تصنيف المعادن ========== */
S({id:'classify',name:'م٦ تجربة تصنيف المعادن',build:function(el){
  var SMP=[{n:'الكوارتز',im:'m_quartz',mag:0,acid:0},{n:'الكالسيت',im:'m_calcite',mag:0,acid:1},{n:'الهورنبلند',art:['#2c3a2e','#0f1812'],mag:0,acid:0},{n:'المغنيتيت',art:['#2a2a2e','#55555f'],mag:1,acid:0}],R={},busy=false;
  el.innerHTML='<div class="eyebrow">المحطة ٦ · تجربة: تصنيف المعادن ص ١٤١</div><h1 class="t" style="font-size:42px">خواص غير عادية: المغناطيسية والتفاعل مع الأحماض</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 58%;gap:8px;min-height:0"><svg class="labview" id="kv" viewBox="0 0 800 420" style="flex:1;min-height:0;width:100%;height:100%"></svg><div class="qa" style="margin:0"><button class="btn" id="k1">🧲 ١) قرّب المغناطيس</button><button class="btn" id="k2">💧 ٢) أضف الحمض المخفّف بالقطارة</button><button class="btn ghost" id="k3">🚿 ٣) اغسل العينات بالماء</button></div></div>'+
   '<div class="col grow side" style="gap:10px"><div class="card" style="padding:10px 14px"><h3 style="margin:0 0 6px">📒 جدول النتائج</h3><table class="tb" id="kT"></table><p class="hint" style="margin:6px 0 0">⚠ تعامل مع حمض الهيدروكلوريك بحذر، واغسل العينات بالماء بعد التجربة.</p></div>'+
   '<div class="card" style="padding:10px 14px"><b>التحليل</b><ol style="margin:4px 0 0;font-size:18px;line-height:1.7"><li>صف الطريقة التي يتفاعل بها كل معدن في الخطوتين ١، ٢.<div class="reveal explain">انجذب <b>المغنيتيت</b> فقط إلى المغناطيس، وظهرت فقاعات (فوران) على <b>الكالسيت</b> فقط عند إضافة الحمض، ولم يتغير الكوارتز والهورنبلند.</div></li><li>سجّل في جدول الخصائص الطبيعية الأخرى للمعادن الأربعة.<div class="reveal explain">استخدم أدوات المحطة الثانية: اللون، والمخدش، والبريق، والقساوة، والانفصام أو المكسر.</div></li></ol></div><div id="kq"></div></div></div>';
  var sv=$('#kv',el),X0=[110,290,470,650];
  function base(){var s='<rect width="800" height="420" fill="#e8eef0"/><rect y="330" width="800" height="90" fill="#384952"/>';SMP.forEach(function(m,i){var x=X0[i];s+='<g id="ks'+i+'" transform="translate('+(x-70)+' 210)"><rect x="-6" y="96" width="152" height="22" rx="6" fill="#cfd8dc" stroke="#14222b" stroke-width="2"/>'+(m.im?'<clipPath id="kc'+i+'"><rect width="140" height="100" rx="16"/></clipPath><g clip-path="url(#kc'+i+')"><image href="'+IMG[m.im]+'" width="140" height="100" preserveAspectRatio="xMidYMid slice"/></g><rect width="140" height="100" rx="16" fill="none" stroke="#14222b" stroke-width="2.5"/>':'<g transform="scale(.7 .62)">'+E.rockG(m.art[0],m.art[1],i*5+3)+'</g>')+'<g class="fz"></g></g><text x="'+x+'" y="380" text-anchor="middle" font-size="22" font-weight="800" fill="#fff" font-family="Readex Pro">'+m.n+'</text>'});s+='<g id="kTool"></g>';sv.innerHTML=s}
  function tbl(){$('#kT',el).innerHTML='<thead><tr><th>المعدن</th><th>المغناطيس</th><th>الحمض المخفّف</th></tr></thead><tbody>'+SMP.map(function(m,i){var r=R[i]||{};return '<tr><td>'+m.n+'</td><td>'+(r.mag==null?'—':(r.mag?'<b style="color:var(--ok)">ينجذب</b>':'لا ينجذب'))+'</td><td>'+(r.acid==null?'—':(r.acid?'<b style="color:var(--ok)">فوران وفقاعات</b>':'لا يتفاعل'))+'</td></tr>'}).join('')+'</tbody>'}
  $('#k1',el).onclick=async function(){if(busy)return;busy=true;base();var t=$('#kTool',sv);t.innerHTML='<g id="mg" transform="translate(20 60)"><path d="M0 0v50a35 35 0 0 0 70 0V0H48v50a13 13 0 0 1-26 0V0z" fill="#e23b4a" stroke="#14222b" stroke-width="2"/><rect width="22" height="16" fill="#d9dde3"/><rect x="48" width="22" height="16" fill="#d9dde3"/></g>';var mg=$('#mg',t);
    for(var i=0;i<4;i++){var x=X0[i]-35;await E.tw(600,function(q){mg.setAttribute('transform','translate('+(x-60+q*60)+' '+(60+q*70)+') rotate(180 35 40)')});var s=$('#ks'+i,sv);if(SMP[i].mag){E.sfx.ok();await E.tw(500,function(q){s.setAttribute('transform','translate('+(X0[i]-70)+' '+(210-q*60)+')')});R[i]=Object.assign(R[i]||{},{mag:1})}else{E.sfx.tick();R[i]=Object.assign(R[i]||{},{mag:0})}tbl();await E.tw(250,function(){})}
    busy=false;done()};
  $('#k2',el).onclick=async function(){if(busy)return;busy=true;base();var t=$('#kTool',sv);t.innerHTML='<g id="dp"><rect x="-8" y="-90" width="16" height="70" rx="4" fill="rgba(205,232,242,.8)" stroke="#4f6f7c" stroke-width="2"/><rect x="-12" y="-110" width="24" height="24" rx="8" fill="#e23b4a"/><path d="M-4 -20 L0 -6 L4 -20z" fill="#4f6f7c"/></g><circle id="dr" r="6" fill="#7ec8e3" opacity="0"/>';var dp=$('#dp',t),dr=$('#dr',t);
    for(var i=0;i<4;i++){var x=X0[i];dp.setAttribute('transform','translate('+x+' 180)');await E.tw(500,function(q){dr.setAttribute('opacity',1);dr.setAttribute('cx',x);dr.setAttribute('cy',180+q*50)});dr.setAttribute('opacity',0);
      var fz=$('#ks'+i+' .fz',sv);if(SMP[i].acid){E.sfx.pop();for(var b=0;b<14;b++)fz.insertAdjacentHTML('beforeend','<circle class="bub" cx="'+(30+Math.random()*80)+'" cy="'+(20+Math.random()*50)+'" r="'+(3+Math.random()*5)+'" fill="none" stroke="#2b6c8f" stroke-width="2" style="animation-delay:'+(Math.random()*.8)+'s"/>');R[i]=Object.assign(R[i]||{},{acid:1})}else R[i]=Object.assign(R[i]||{},{acid:0});tbl();await E.tw(300,function(){})}
    busy=false;done()};
  $('#k3',el).onclick=function(){if(busy)return;base();E.sfx.whoosh();E.toast('غُسلت العينات بالماء')};
  function done(){var ok=SMP.every(function(_,i){return R[i]&&R[i].mag!=null&&R[i].acid!=null});if(ok&&!$('#kq',el).innerHTML){E.complete('classify');E.mcq($('#kq',el),{id:'l1-kl-q1',goal:2,lvl:2,q:'إذا أعطاك معلمك معدنين شفافين: الكوارتز والكالسيت، فما الفحص السريع لتمييزهما؟',o:['إضافة الحمض المخفّف: الكالسيت يفور','تقريب المغناطيس: الكوارتز ينجذب','لونهما: الكوارتز دائمًا أصفر','تذوّقهما'],a:0,ex:'يتفاعل الكالسيت مع الحمض المخفّف فتظهر فقاعات، ولا يتفاعل الكوارتز. ويمكن أيضًا استخدام القساوة: الكوارتز (٧) يخدش الزجاج، والكالسيت (٣) لا يخدشه.'})}}
  base();tbl();return {}}});

/* ========== المعادن الشائعة (ص ١٤٠) ========== */
S({id:'common',name:'م المعادن الشائعة',build:function(el){
  var CARDS=[['r_granite','🪨 المعادن المكوّنة للصخور','على الرغم من وجود أكثر من <b>٤٠٠٠</b> معدن في الطبيعة، فإن المعادن التي تتكوّن منها الصخور <b>قليلة جدًّا</b>.'],
   ['m_quartz','🔷 المعادن السليكاتية','تتكوّن من عنصري <b>السيليكون والأكسجين</b>، وهي معظم المعادن المكوّنة للصخور، وتشكّل <b>أكثر من نصف</b> معادن قشرة الأرض. الكوارتز سليكا نقية (SiO₂).'],
   ['m_calcite','🏗 الكربونات','مكوَّنة من <b>الكربون والأكسجين</b>، وتدخل في تركيب <b>الحجر الجيري</b> المستخدم في البناء.'],
   ['m_halite','🧂 معادن أخرى معروفة','تشكّل قيعان البحار القديمة المتبخرة، ومنها <b>الجبس</b> المتوافر بكثرة في مناطق عديدة، و<b>الملح الصخري</b> المكوّن من معدن <b>الهاليت</b>.']];
  el.innerHTML='<div class="eyebrow">المحطة · المعادن الشائعة ص ١٤٠</div><h1 class="t" style="font-size:42px">من بين ٤٠٠٠ معدن… قليل منها يبني الصخور</h1>'+
   '<div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 60%;gap:10px;min-height:0"><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">'+
   CARDS.map(function(c,i){return '<div class="card pcard" style="padding:10px;display:flex;flex-direction:row;gap:10px;align-items:center;text-align:right;animation-delay:'+(i*.15)+'s">'+img(c[0],'height:96px;width:96px;flex:0 0 96px;object-fit:cover;border-radius:12px')+'<div><b style="font-family:var(--disp);font-size:21px;display:block">'+c[1]+'</b><p style="margin:2px 0 0;font-size:16.5px;line-height:1.6">'+c[2]+'</p></div></div>'}).join('')+'</div>'+
   card('📌 الخلاصة','<p style="margin:0;font-size:18px">المعادن النادرة يُستخدم بعضها <b>أحجارًا كريمة</b>، وبعضها الآخر <b>خامات</b> لفلزات ثمينة — وهذا موضوع المحطة التالية.</p>')+card('🌐 العلوم عبر المواقع الإلكترونية','<p style="margin:0;font-size:18px"><b>نشاط:</b> اختر قارة، ولتكن إفريقيا مثلًا، وأعطِ ثلاثة أمثلة على أحجار كريمة تتوافر فيها، وحدّد مواقع التعدين على الخريطة.</p>')+
   '</div><div class="col grow side" style="gap:10px;min-height:0"><div id="cmq"></div></div></div>';
  var q=$('#cmq',el);
  E.sort(q,{id:'l1-cm-sort',goal:1,lvl:2,q:'صنّف حسب مجموعة المعادن:',bins:['المعادن السليكاتية','الكربونات'],items:[{t:'الكوارتز (SiO₂)',b:0},{t:'الفلسبار',b:0},{t:'تتكوّن من السيليكون والأكسجين',b:0},{t:'تتكوّن من الكربون والأكسجين',b:1},{t:'تدخل في تركيب الحجر الجيري',b:1}],ex:'السليكاتية من السيليكون والأكسجين (الكوارتز والفلسبار)، والكربونات من الكربون والأكسجين وتدخل في تركيب الحجر الجيري.'});
  return {enter:function(){E.complete('common')}}}});

/* ========== ١١) م٧ استخدامات المعادن والتيتانيوم ========== */
S({id:'uses',name:'م٧ استخدامات المعادن',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة ٧ · استخدامات المعادن ص ١٤١</div><h1 class="t" style="font-size:42px">كنوز نستفيد منها كل يوم</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1;gap:10px;min-height:0"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">'+
   [['m_garnet','💎 الأحجار الكريمة','معادن نادرة وجميلة تُقصّ وتُصقل لصناعة الحلي، مثل الألماس.'],['m_streak','⛏ الخامات','معادن يُستخلص منها مواد مفيدة، مثل الحديد من الهيماتيت.'],['u_glass','🏠 في حياتنا اليومية','الكوارتز في صناعة الزجاج، والجرافيت في أقلام الرصاص.']].map(function(c,i){return '<div class="card pcard flip" style="padding:10px;animation-delay:'+(i*.2)+'s">'+img(c[0],'height:130px;width:100%;object-fit:cover;border-radius:12px')+'<b style="font-family:var(--disp);font-size:21px">'+c[1]+'</b><p style="margin:0;font-size:17px">'+c[2]+'</p></div>'}).join('')+'</div>'+
   card('🇸🇦 رؤية ٢٠٣٠','<p style="margin:0;font-size:20px">تعظيم القيمة المتحققة من قطاع التعدين والاستفادة منها.</p>')+'<div id="uq"></div></div>'+
   '</div>';
  E.mcq($('#uq',el),{id:'l1-us-q1',goal:1,lvl:2,q:'الهيماتيت معدن يُستخلص منه الحديد؛ لذا يُعدّ من:',o:['الأحجار الكريمة','الخامات','الصخور الرسوبية','الأحافير'],a:1,cols:2,ex:'الخامات معادن يُستخلص منها مواد مفيدة، مثل الحديد من الهيماتيت.'});
  return {enter:function(){E.complete('uses')}}}});

/* ========== ١٢) م٨ منجم الجواهر ========== */
var BANK1=[{q:'المعدن مادة صلبة غير عضوية توجد في الطبيعة، وذراتها:',o:['مرتبة بشكل منتظم ومتكرر','موزعة عشوائيًّا','من أصل نباتي','سائلة'],a:0},
 {q:'الصخر مادة صلبة تتكوّن من:',o:['معدن واحد أو أكثر','بقايا نباتات فقط','ماء متجمد','مادة عضوية فقط'],a:0},
 {q:'لماذا يُعدّ المخدش أدق من اللون في تعرّف المعدن؟',o:['لأن اللون قد يتغير بالشوائب','لأن المخدش يقيس القساوة','لأن كل المعادن مخدشها أبيض','لأن المخدش يقيس البريق'],a:0},
 {q:'البيريت أصفر لامع يشبه الذهب، ولكن مخدشه:',o:['أصفر','أخضر مسودّ','بني محمرّ','أبيض'],a:1},
 {q:'مخدش الهيماتيت:',o:['أخضر','بني محمرّ','أسود','أصفر'],a:1},
 {q:'يوصف بريق البيريت بأنه:',o:['ترابي','لؤلؤي','فلزي','زجاجي'],a:2},
 {q:'الفلوريت (٤) يخدش:',o:['الكالسيت (٣)','الأباتيت (٥)','الكوارتز (٧)','الألماس (١٠)'],a:0},
 {q:'قساوة الظفر في مقياس موهس تقريبًا:',o:['٢٫٥','٥٫٥','٧','١٠'],a:0},
 {q:'المايكا ينفصم في:',o:['اتجاه واحد','ثلاثة اتجاهات متعامدة','لا ينفصم','اتجاهين متعامدين'],a:0},
 {q:'تكسّر المعدن إلى قطع ذات سطوح خشنة أو منحنية يسمى:',o:['الانفصام','المكسر','البريق','المخدش'],a:1},
 {q:'أيّ المعادن التالية ينجذب إلى المغناطيس؟',o:['المغنيتيت','الكوارتز','الكالسيت','الهورنبلند'],a:0},
 {q:'معادن نادرة وجميلة تُقصّ وتُصقل لصناعة الحلي:',o:['الخامات','الأحجار الكريمة','الصخور النارية','الأحافير'],a:1}];
S({id:'mine',name:'م منجم الجواهر (إثرائي)',build:function(el){E.mineGame(el,BANK1,'l1-mine');return {}}});

/* ========== ١٣) ماذا تعلمنا؟ ========== */
S({id:'review',name:'م٩ ماذا تعلمنا؟',build:function(el){return E.review(el,{goals:[
  {t:GO[0],how:'عرفنا شروط المعدن، وقارنّا الذرات المرتبة في المعدن بالزجاج، وصنّفنا المواد',st:['what','common','uses'],q:['l1-what-sort','l1-what-q1','l1-what-q2','l1-cm-sort','l1-us-q1']},
  {t:GO[1],how:'فحصنا العينات: اللون والمخدش والبريق والقساوة والانفصام، والمغناطيسية والتفاعل مع الحمض',st:['lab','streak','mohs','cleave','classify'],q:['l1-lab-myst','l1-st-q1','l1-st-sort','l1-mo-q1','l1-mo-q2','l1-cl-q1','l1-cl-q2','l1-kl-q1']}],
  exit:[{id:'l1-exit1',goal:1,lvl:1,q:'ما الفرق بين المعدن والصخر؟',o:['الصخر يتكوّن من معدن واحد أو أكثر','المعدن يتكوّن من صخور عدة','لا فرق بينهما','الصخر سائل والمعدن صلب'],a:0,ex:'الصخر مادة صلبة تتكوّن من معدن واحد أو أكثر.'},
        {t:'tf',id:'l1-exit2',goal:2,lvl:1,q:'لون المعدن هو أفضل طريقة لتعرّفه دائمًا.',v:false,ex:'اللون قد يكون خادعًا؛ والمخدش أدق منه.'},
        {id:'l1-exit3',goal:2,lvl:2,q:'خاصية تقيس مقاومة المعدن للخدش:',o:['البريق','القساوة','المخدش','الانفصام'],a:1,cols:2,ex:'القساوة، وتقاس بمقياس موهس.'}],
  extra:function(ex){var d=h('<div></div>');ex.appendChild(d);E.guide(d,[0,1,2,3],'a')}})}});


/* ========== محطات مطابقة لشرائح العرض ========== */
var D=E.deck;
S({id:'fold',name:'المطويات وتوجيه القراءة',build:function(el){el.innerHTML='<div class="eyebrow">تهيئة · المطويات وتوجيه القراءة وتركيزها</div><h1 class="t">المطويات… وتوجيه القراءة: خمس دقائق</h1><div class="row grow" style="min-height:0"><div class="col side" style="flex:1;gap:10px;min-height:0">'+'<div class="card" style="padding:12px 16px"><h3 style="margin:0 0 6px">📂 المطويات: صنّف الصخور</h3><p style="margin:0 0 8px;font-size:18px">اصنع المطوية التالية لتساعدك على تنظيم ما تتعلمه عن أنواع الصخور الثلاثة.</p><div class="fold"><div><b>١</b>اطوِ ورقة طوليًّا من المنتصف، واجعل الحافة الأمامية أقصر قليلًا من الحافة الخلفية.</div><div><b>٢</b>اقلب الورقة واطوِها إلى ثلاثة أجزاء.</div><div><b>٣</b>اقطع الطبقة العليا فقط على طول خطوط الطي لعمل ثلاثة ألسنة.</div><div><b>٤</b>اكتب عنوانًا على كل لسان: صخور نارية، صخور رسوبية، صخور متحولة.</div></div><div class="flaps"><span style="--c:#ff7a1a">صخور نارية</span><span style="--c:#c9a877">صخور رسوبية</span><span style="--c:#b07cff">صخور متحولة</span></div><p class="hint" style="margin:8px 0 0">اقرأ واكتب: في أثناء دراستك الدرس الثاني، اكتب تحت كل لسان كيف يتكوّن هذا النوع من الصخور، وأعطِ مثالًا عليه. · التسليم يوم الخميس.</p></div>'+'</div><div class="col grow side" id="fg"></div></div>';E.guide($('#fg',el),[0,1,2,3,4,5,6,7,8],'b');return {}}});
S({id:'coop',name:'كيف سنبدأ؟',build:function(el){el.innerHTML='<div class="eyebrow">تهيئة · طريقة التدريس: التعلم التعاوني</div><h1 class="t">كيف سنبدأ؟</h1><div class="grow" style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;align-content:start">'+[['👑','قائد المجموعة','الطالب الذي يتولى قيادة المجموعة ويوجهها، ويتابع عمل أفرادها، وينسّق فيما بينهم.'],['✍','المقرر','الطالب الذي يكتب كل ما توصلت إليه المجموعة.'],['📝','الملخّص (الكاتب)','الطالب الذي يلخّص ما توصلت إليه المجموعة.'],['🔎','الباحثون','بقية أفراد المجموعة، وهم الذين يجهّزون المصادر والمواد للمجموعة.']].map(function(r,i){return '<div class="card pcard" style="padding:16px;text-align:center;animation-delay:'+(i*.15)+'s"><div style="font-size:54px">'+r[0]+'</div><b style="font-family:var(--disp);font-size:24px" class="gl">'+r[1]+'</b><p style="margin:6px 0 0;font-size:18px">'+r[2]+'</p></div>'}).join('')+'</div><div class="row" style="gap:12px;margin-top:12px">'+['سنترتب في مجموعات','كل (٦) طلاب في مجموعة واحدة','سنعيّن أفراد المجموعة','نستمع لتوجيهات المعلم لبدء الدرس'].map(function(x,i){return '<div class="card grow" style="padding:10px 14px;text-align:center"><b class="num">'+n(i+1)+'</b> '+x+'</div>'}).join('')+'</div>';return {}}});
S({id:'eval1',name:'م تقييم: الأسئلة ١–٤',build:function(el){return D.evalStation(el,{sid:'eval1',eyebrow:'المحطة · تقييم الدرس الأول',title:'تقييم: المعادن – جواهر الأرض',qs:[
 {id:'l1-what-q1',goal:1,lvl:1,kind:'السؤال ١ من ٤',q:'أيّ العبارات التالية تنطبق على المادة التي تُعدّ معدنًا؟',o:['تكون عضوية','تكون زجاجية','تكون حجرًا كريمًا','توجد في الطبيعة'],a:3,ex:'المعدن مادة صلبة غير عضوية <b>توجد في الطبيعة</b>.'},
 {id:'l1-what-q2',goal:1,lvl:1,kind:'السؤال ٢ من ٤',q:'توصف المعادن جميعها بأنها:',o:['مواد غير عضوية صلبة','لها درجة قساوة ٤ أو أكثر','ذات لمعان زجاجي','تخدش قطعة نقدية معدنية'],a:0,ex:'المعادن جميعها مواد صلبة غير عضوية، أما القساوة والبريق فتختلف من معدن إلى آخر.'},
 {id:'l1-st-q1',goal:2,lvl:1,kind:'السؤال ٣ من ٤',q:'لون مسحوق المعدن الناتج عن حكّه بلوح الخدش يسمى:',o:['البريق','المخدش','الانفصام','القساوة'],a:1,ex:'هو المخدش.'},
 {id:'l1-mo-q1',goal:2,lvl:1,kind:'السؤال ٤ من ٤',q:'أقسى المعادن في مقياس موهس هو:',o:['التلك','الكوارتز','الألماس','الفلوريت'],a:2,ex:'الألماس في الدرجة ١٠.'}]})}});
S({id:'practice',name:'م تطبيق العلوم وأسئلة تدريبية',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة · تدريب فصلي: تطبيق العلوم ص ١٤٠ وأسئلة تدريبية ص ١٥٩</div><h1 class="t" style="font-size:40px">تطبيق العلوم… وأسئلة تدريبية</h1><div class="row grow" style="min-height:0"><div class="col side" id="pa" style="flex:1;gap:10px;min-height:0">'+'<div class="card" style="padding:10px 14px"><h3 style="margin:0 0 4px">تطبيق العلوم · ما مدى قساوة هذه المعادن؟ ص ١٤٠</h3><p class="hint" style="margin:0 0 4px">(✓) خُدش المعدن، (✗) لم يُخدش.</p><table class="tb" style="font-size:16px"><thead><tr><th>المعدن</th><th>ظفر</th><th>قطعة نقد</th><th>سكين</th><th>فولاذ</th></tr></thead><tbody>'+[['تركواز','✗','✗','✓','✓'],['هاليت','✗','✓','✓','✓'],['ياقوت','✗','✗','✗','✗'],['جرافيت','✓','✓','✓','✓'],['زمرد','✗','✗','✗','✗']].map(function(r){return '<tr>'+r.map(function(c){return '<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>'+'</div><div class="col grow side" id="pb" style="gap:10px"></div></div>';
  E.mcq($('#pa',el),{id:'l1-mo-q2',goal:2,lvl:3,kind:'تطبيق العلوم (١)',q:'رتّب المعادن الخمسة من الأكثر قساوة إلى الأقل قساوة:',o:['الياقوت والزمرد ← التركواز ← الهاليت ← الجرافيت','الجرافيت ← الهاليت ← التركواز ← الياقوت والزمرد','التركواز ← الياقوت والزمرد ← الجرافيت ← الهاليت','الهاليت ← الجرافيت ← الزمرد ← التركواز'],a:0,ex:'كلما قلّ عدد الأدوات التي تخدش المعدن كان أقسى؛ الياقوت والزمرد لم تخدشهما أيّ أداة، والجرافيت خدشته الأدوات كلها.'});
  $('#pa',el).insertAdjacentHTML('beforeend','<div class="card" style="padding:10px 14px"><b>تطبيق العلوم (٢):</b> أيّ الطرائق يمكنك استخدامها لتحديد المعدن الأكثر قساوة: الياقوت أم الزمرد؟<p class="reveal explain" style="margin:4px 0 0">نحاول أن نخدش أحدهما بالآخر؛ فالمعدن الذي يخدش الآخر هو الأقسى.</p></div>');
  $('#pb',el).innerHTML='<div class="card" style="padding:10px 14px;font-size:19px"><b>١) صنّف: هل بلّورة السكر معدن؟ وضّح ذلك.</b><p class="reveal explain" style="margin:4px 0 0">لا؛ لأن السكر مادة عضوية مصدرها النبات، والمعدن مادة غير عضوية توجد في الطبيعة.</p></div><div class="card" style="padding:10px 14px;font-size:19px"><b>٢) صنّف: إذا أعطاك معلمك معدنين شفافين: الكوارتز والكالسيت، فما الفحص السريع الذي تجريه لتعرّف كل منهما؟</b><p class="reveal explain" style="margin:4px 0 0">نضيف الحمض المخفّف: الكالسيت يفور وتظهر عليه فقاعات، أما الكوارتز فلا يتفاعل (كما في تجربة تصنيف المعادن).</p></div>';
  $('#pb',el).insertAdjacentHTML('beforeend','<div class="card" style="padding:10px 14px"><b>٣) اختبار فرضية:</b> كيف تستخدم صحنًا زجاجيًّا ومسمارًا وقطعة نقد نحاسية لمعرفة قساوة معدن؟<p class="reveal explain" style="margin:4px 0 0">نحاول خدش المعدن بقطعة النقد ثم بالمسمار، ونحاول خدش الزجاج بالمعدن؛ ثم نقارن النتائج بقساوة الأدوات في مقياس موهس لنحدد بين أيّ درجتين تقع قساوته.</p></div>');
  return {enter:function(){E.complete('practice')}}}});
S({id:'sum',name:'م الخلاصة',build:function(el){return D.summary(el,{sid:'sum',eyebrow:'المحطة · الخلاصة ص ١٤٢',sec:[
 ['ما المعدن؟',['العديد من المنتجات التي نصادفها كل يوم مصنوعة من معادن.','تتشكّل المعادن بطرائق مختلفة، منها تبلور الصهارة، أو من المحاليل الغنية بالمواد الذائبة.']],
 ['خصائص المعادن',['نتعرّف المعادن من خلال خواصها الفيزيائية: الشكل البلوري، واللون، والمخدش، والبريق، والقساوة، والانفصام والمكسر.','تُظهر بعض المعادن خواص غير عادية، منها التفاعل مع الأحماض، والمغناطيسية.']],
 ['المعادن الشائعة',['تشكّل معادن قليلة – من أكثر من ٤٠٠٠ معدن معروف – معظم الصخور.','الأحجار الكريمة معادن قيّمة تُستخدم قطعًا ثمينة في المجوهرات.','الخامات معادن يُستخلص منها مواد مفيدة، مثل الحديد من الهيماتيت.']]]})}});
/* أدوات المختبر المرسومة */
LK=E.LK={};
function rr(x,X,Y,W,H,r){x.beginPath();x.moveTo(X+r,Y);x.arcTo(X+W,Y,X+W,Y+H,r);x.arcTo(X+W,Y+H,X,Y+H,r);x.arcTo(X,Y+H,X,Y,r);x.arcTo(X,Y,X+W,Y,r);x.closePath()}
LK.rr=rr;
LK.T=function(x,s,X,Y,sz,col,w){x.font=(w||700)+' '+(sz||20)+'px "Readex Pro",sans-serif';x.textAlign='center';x.textBaseline='middle';x.direction='rtl';x.fillStyle=col||'#1b2a3a';x.fillText(s,X,Y)};
LK.pill=function(x,s,X,Y,bg,fg,sz){sz=sz||19;x.font='700 '+sz+'px "Readex Pro",sans-serif';var w=x.measureText(s).width+28;x.fillStyle=bg||'#fff';rr(x,X-w/2,Y-sz,w,sz*2,sz);x.fill();x.strokeStyle='rgba(27,42,58,.22)';x.lineWidth=2;x.stroke();LK.T(x,s,X,Y+1,sz,fg||'#1b2a3a')};
LK.bg=function(x,W,H,by){E.labBg(x,W,H,by)};
/* لوحة اسم على واجهة الطاولة الداكنة */
LK.plate=function(x,s,X,Y){x.font='700 19px "Readex Pro",sans-serif';var w=x.measureText(s).width+26;x.fillStyle='rgba(255,255,255,.1)';rr(x,X-w/2,Y-17,w,34,10);x.fill();LK.T(x,s,X,Y+1,19,'#ffffff')};
/* كأس زجاجية: o={liq,level,inside(x,X,Y,W,H),glow} */
LK.beaker=function(x,cx,by,w,hh,o){o=o||{};var X=cx-w/2,Y=by-hh;
  if(o.glow){x.save();x.shadowColor='rgba(255,194,61,.9)';x.shadowBlur=30;x.strokeStyle='#ffc23d';x.lineWidth=6;rr(x,X-10,Y-14,w+20,hh+18,18);x.stroke();x.restore()}
  x.fillStyle='rgba(225,242,248,.55)';x.fillRect(X,Y+6,w,hh-6);
  var lv=o.level==null?.72:o.level,lh=(hh-12)*lv,ly=by-6-lh;
  x.save();x.beginPath();x.moveTo(X+5,ly);x.lineTo(X+w-5,ly);x.lineTo(X+w-5,by-16);x.quadraticCurveTo(X+w-5,by-5,X+w-16,by-5);x.lineTo(X+16,by-5);x.quadraticCurveTo(X+5,by-5,X+5,by-16);x.closePath();x.fillStyle=o.liq||'rgba(120,190,235,.55)';x.fill();x.clip();if(o.inside)o.inside(x,X+5,ly,w-10,lh);x.restore();
  x.fillStyle='rgba(255,255,255,.55)';x.fillRect(X+5,ly,w-10,4);
  x.strokeStyle='rgba(80,105,115,.55)';x.lineWidth=2;for(var i=1;i<5;i++){var ty=Y+12+(hh-24)*i/5;x.beginPath();x.moveTo(X+w-26,ty);x.lineTo(X+w-6,ty);x.stroke()}
  x.fillStyle='rgba(255,255,255,.5)';x.fillRect(X+10,Y+14,7,hh-34);
  x.strokeStyle='#4f6f7c';x.lineWidth=4.5;x.lineJoin='round';x.beginPath();x.moveTo(X-8,Y);x.lineTo(X,Y+8);x.lineTo(X,by-14);x.quadraticCurveTo(X,by,X+14,by);x.lineTo(X+w-14,by);x.quadraticCurveTo(X+w,by,X+w,by-14);x.lineTo(X+w,Y+8);x.lineTo(X+w+8,Y);x.stroke();
  if(o.label){LK.pill(x,o.label,cx,Y-26,'#fff','#1b2a3a',17)}};
/* مجهر ضوئي على الطاولة — يعيد موضع الشريحة */
LK.microscope=function(x,cx,by){x.save();x.lineCap='round';x.lineJoin='round';
  x.fillStyle='#2d3a40';rr(x,cx-85,by-26,170,26,10);x.fill();
  x.strokeStyle='#2d3a40';x.lineWidth=36;x.beginPath();x.moveTo(cx+45,by-26);x.lineTo(cx+45,by-130);x.quadraticCurveTo(cx+62,by-245,cx+8,by-300);x.stroke();x.strokeStyle='#eef2f3';x.lineWidth=26;x.stroke();
  x.fillStyle='#2d3a40';rr(x,cx-95,by-136,165,16,5);x.fill();
  x.fillStyle='rgba(160,215,240,.95)';rr(x,cx-78,by-146,100,10,3);x.fill();x.fillStyle='#ff8a5b';x.beginPath();x.arc(cx-28,by-141,5,0,7);x.fill();
  x.fillStyle='#2d3a40';x.beginPath();x.arc(cx+45,by-110,16,0,7);x.fill();x.fillStyle='#8fa3ab';x.beginPath();x.arc(cx+45,by-110,7,0,7);x.fill();
  x.translate(cx-38,by-232);x.rotate(-.2);x.fillStyle='#eef2f3';x.strokeStyle='#2d3a40';x.lineWidth=5;rr(x,-20,-80,40,150,8);x.fill();x.stroke();x.fillStyle='#2d3a40';rr(x,-15,-112,30,36,6);x.fill();rr(x,-13,68,26,26,4);x.fill();x.fillStyle='#ffc23d';x.fillRect(-20,-30,40,8);
  x.restore();return {sx:cx-28,sy:by-141}};
/* عدسة/منظر مكبّر دائري متصل بنقطة الهدف */
LK.lens=function(x,cx,cy,r,tx,ty,draw,label){var a=Math.atan2(cy-ty,cx-tx);
  x.save();x.strokeStyle='rgba(27,42,58,.4)';x.setLineDash([9,8]);x.lineWidth=2.5;[1,-1].forEach(function(s){x.beginPath();x.moveTo(tx,ty);x.lineTo(cx+Math.cos(a+s*Math.PI/2)*r,cy+Math.sin(a+s*Math.PI/2)*r);x.stroke()});x.setLineDash([]);x.strokeStyle='#ffc23d';x.lineWidth=4;x.beginPath();x.arc(tx,ty,16,0,7);x.stroke();x.restore();
  x.save();x.beginPath();x.arc(cx,cy,r,0,7);x.clip();x.fillStyle='#ffffff';x.fillRect(cx-r,cy-r,2*r,2*r);x.translate(cx-r,cy-r);draw(x,2*r);x.restore();
  x.lineWidth=16;x.strokeStyle='#2d3a40';x.beginPath();x.arc(cx,cy,r+6,0,7);x.stroke();x.lineWidth=3;x.strokeStyle='#8fa3ab';x.beginPath();x.arc(cx,cy,r+1,0,7);x.stroke();
  if(label)LK.pill(x,label,cx,cy-r-26,'#13283a','#ffd36b',16)};
/* غشاء بلازمي رأسي واضح: طبقتان من الفوسفوليبيدات + بروتينات ناقلة */
LK.memV=function(x,X,Y0,Y1,prots,hr){hr=hr||11;var sp=hr*2.3;
  for(var y=Y0;y<Y1;y+=sp){var inP=(prots||[]).some(function(p){return Math.abs(p.y-y)<(p.h||70)/2+hr});if(inP)continue;
    [-1,1].forEach(function(s){x.strokeStyle='#e0a070';x.lineWidth=3;x.beginPath();x.moveTo(X+s*(hr*2.2),y-3);x.lineTo(X+s*4,y-4);x.moveTo(X+s*(hr*2.2),y+3);x.lineTo(X+s*4,y+4);x.stroke();x.fillStyle='#ff8a5b';x.beginPath();x.arc(X+s*(hr*2.4),y,hr,0,7);x.fill();x.strokeStyle='#c8582e';x.lineWidth=2;x.stroke()})}
  (prots||[]).forEach(function(p){var H=p.h||70,o=p.open||0;x.fillStyle=p.c||'#2f8cff';x.strokeStyle='#1b2a3a';x.lineWidth=3;
    [-1,1].forEach(function(s){rr(x,X+(s<0?-hr*3.4:hr*0.4+o*6),p.y-H/2,hr*3,H,hr*1.2);x.fill();x.stroke()});
    if(p.lab)LK.pill(x,p.lab,X,p.y+H/2+24,'#fff','#1f5fd0',14)})};
/* جزيئات */
LK.mol=function(x,k,X,Y,s){s=s||1;x.save();x.translate(X,Y);x.scale(s,s);
  if(k==='o2'){[-8,8].forEach(function(d){x.fillStyle='#e2483d';x.beginPath();x.arc(d,0,10,0,7);x.fill();x.strokeStyle='#8a1f17';x.lineWidth=2;x.stroke()})}
  else if(k==='h2o'){x.fillStyle='#e2483d';x.beginPath();x.arc(0,0,11,0,7);x.fill();x.fillStyle='#f4f7f8';x.strokeStyle='#6f8796';x.lineWidth=2;[[-11,8],[11,8]].forEach(function(q){x.beginPath();x.arc(q[0],q[1],6.5,0,7);x.fill();x.stroke()})}
  else if(k==='big'){x.fillStyle='#9b6cff';x.strokeStyle='#4a2a9a';x.lineWidth=3;x.beginPath();for(var i=0;i<=12;i++){var a=i/12*Math.PI*2,r=30+Math.sin(i*2.3)*5;i?x.lineTo(Math.cos(a)*r,Math.sin(a)*r):x.moveTo(Math.cos(a)*r,Math.sin(a)*r)}x.closePath();x.fill();x.stroke();x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.arc(-9,-9,8,0,7);x.fill()}
  else if(k==='sugar'){x.fillStyle='#ffc23d';x.strokeStyle='#8a5a00';x.lineWidth=3;x.beginPath();for(i=0;i<6;i++){var a2=i/6*Math.PI*2;i?x.lineTo(Math.cos(a2)*15,Math.sin(a2)*15):x.moveTo(15,0)}x.closePath();x.fill();x.stroke()}
  else if(k==='salt'){x.fillStyle='#6cc04a';x.strokeStyle='#2c6b17';x.lineWidth=3;x.beginPath();x.arc(0,0,11,0,7);x.fill();x.stroke()}
  else if(k==='dye'){x.fillStyle='#a23fd1';x.beginPath();x.arc(0,0,8,0,7);x.fill()}
  x.restore()};
/* جدول نتائج HTML يُملأ أثناء التجربة */
LK.table=function(el,cols,rows){var t=h('<div class="card labtb" style="padding:8px 12px"><div class="row" style="justify-content:space-between;align-items:center"><b style="font-family:var(--disp);font-size:19px">📋 جدول النتائج</b><span class="hint lc"></span></div><table class="tb"><thead><tr>'+cols.map(function(c){return '<th>'+c+'</th>'}).join('')+'</tr></thead><tbody>'+rows.map(function(r,i){return '<tr data-r="'+i+'">'+r.map(function(c,j){return '<td'+(j?' class="q"':'')+'>'+(j?'؟':c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>');el.appendChild(t);
  var api={done:{},fill:function(i,vals){var tr=$('tr[data-r="'+i+'"]',t);vals.forEach(function(v,j){var td=tr.children[j+1];td.innerHTML=v;td.classList.remove('q');td.classList.add('new');setTimeout(function(){td.classList.remove('new')},900)});api.done[i]=1;$('.lc',t).textContent=n(Object.keys(api.done).length)+'/'+n(rows.length)},cell:function(i,j,v){var td=$('tr[data-r="'+i+'"]',t).children[j];if(td.innerHTML===v)return;td.innerHTML=v;td.classList.remove('q');td.classList.add('new');setTimeout(function(){td.classList.remove('new')},900);if(!$('tr[data-r="'+i+'"] td.q',t)){api.done[i]=1;$('.lc',t).textContent=n(Object.keys(api.done).length)+'/'+n(rows.length)}},has:function(i,j){return !$('tr[data-r="'+i+'"]',t).children[j].classList.contains('q')},count:function(){return Object.keys(api.done).length}};
  $('.lc',t).textContent=n(0)+'/'+n(rows.length);return api};
/* أزرار أدوات بأسلوب بطاقات المختبر */
LK.tools=function(el,list,fn){var w=h('<div class="labtools">'+list.map(function(t,i){return '<button class="ltool" data-i="'+i+'"><span>'+t[0]+'</span><b>'+t[1]+'</b></button>'}).join('')+'</div>');el.appendChild(w);$$('.ltool',w).forEach(function(b){b.onclick=function(){$$('.ltool',w).forEach(function(z){z.classList.toggle('on',z===b)});fn(+b.dataset.i,b)}});return w};


/* أسئلة الكتاب داخل محطات الشرح (يعرضها المعلم) */
(function(){if(document.getElementById('qbk-css'))return;var st=document.createElement('style');st.id='qbk-css';st.textContent=
'.qbk-btn{display:inline-flex;align-items:center;vertical-align:middle;margin-inline-start:16px;font:inherit;font-weight:700;font-size:17px;border:0;border-radius:99px;padding:5px 14px;cursor:pointer;background:linear-gradient(180deg,#ffd166,#f4a63b);color:#2a1600;box-shadow:0 6px 18px rgba(0,0,0,.35)}'+
'.qbk-btn b{display:inline-grid;place-items:center;min-width:24px;height:24px;border-radius:50%;background:#2a1600;color:#ffd166;margin-inline-start:8px;font-size:16px}'+
'.qbk-ov{position:fixed;inset:0;z-index:9999;font-family:"Readex Pro","IBM Plex Sans Arabic",sans-serif;direction:rtl;background:rgba(6,5,10,.72);display:none;align-items:center;justify-content:center;backdrop-filter:blur(3px)}.qbk-ov.on{display:flex}'+
'.qbk-cd{width:min(1180px,94vw);max-height:92vh;overflow:auto;background:#fffdf7;color:#1c1a24;border-radius:26px;border-top:10px solid #f4a63b;padding:20px 30px 18px;display:flex;flex-direction:column;gap:12px;box-shadow:0 30px 80px rgba(0,0,0,.6)}'+
'.qbk-hd{display:flex;align-items:center;gap:12px}.qbk-hd span{background:#fff1d6;color:#9a4f00;border-radius:99px;padding:4px 16px;font-size:18px;font-weight:700}.qbk-hd small{margin-inline-start:auto;font-size:18px;color:#6b6475;font-weight:700}.qbk-hd button{font:inherit;font-size:20px;border:0;background:#eee;border-radius:12px;padding:4px 14px;cursor:pointer}'+
'.qbk-q{font-size:clamp(22px,2.5vw,36px);line-height:1.6;font-weight:700;margin:0}.qbk-q .n{display:inline-grid;place-items:center;min-width:1.5em;height:1.5em;border-radius:50%;background:#f4a63b;color:#2a1600;font-size:.8em;margin-inline-end:.35em}'+
'.qbk-a{display:none;background:#e3f8ec;border-inline-start:9px solid #10a35a;border-radius:16px;padding:12px 18px;font-size:clamp(20px,2.15vw,31px);line-height:1.65;font-weight:600;color:#0b3d24}.qbk-a.on{display:block;animation:rin .45s}.qbk-a b{color:#067a40}'+
'.qbk-ft{display:flex;gap:10px;align-items:center}.qbk-ft button{font:inherit;font-weight:700;font-size:21px;border:0;border-radius:14px;padding:10px 22px;cursor:pointer;background:#f1eef6;color:#2b2140}.qbk-ft .rv{background:#10a35a;color:#fff;min-width:200px}.qbk-ft .dots{margin-inline-start:auto;display:flex;gap:6px}.qbk-ft .dots i{width:14px;height:14px;border-radius:50%;background:#ddd6e8}.qbk-ft .dots i.on{background:#f4a63b}';
document.head.appendChild(st)})();
function qbook(el,QS){if(!QS||!QS.length)return;
  var bt=document.createElement('button');bt.className='qbk-btn';bt.innerHTML='📖 أسئلة الكتاب<b>'+n(QS.length)+'</b>';var ey=$('.eyebrow',el);if(ey)ey.appendChild(bt);else el.insertBefore(bt,el.firstChild);
  var ov=document.createElement('div');ov.className='qbk-ov';ov.innerHTML='<div class="qbk-cd"><div class="qbk-hd"><span></span><small></small><button data-x>✕ إغلاق</button></div><p class="qbk-q"></p><div class="qbk-a"></div><div class="qbk-ft"><button data-p>→ السابق</button><button class="rv" data-r>💡 إظهار الإجابة</button><button data-nx>التالي ←</button><div class="dots"></div></div></div>';document.body.appendChild(ov);
  var i=0,sh=false;function R(){var q=QS[i];sh=false;$('.qbk-hd span',ov).textContent=q.s;$('.qbk-hd small',ov).textContent='السؤال '+n(i+1)+' من '+n(QS.length);$('.qbk-q',ov).innerHTML='<span class="n">'+n(i+1)+'</span>'+q.q;var a=$('.qbk-a',ov);a.innerHTML=q.a;a.classList.remove('on');$('[data-r]',ov).textContent='💡 إظهار الإجابة';$('.dots',ov).innerHTML=QS.map(function(_,j){return '<i class="'+(j===i?'on':'')+'"></i>'}).join('')}
  bt.onclick=function(e){e.stopPropagation();i=0;R();ov.classList.add('on')};ov.onclick=function(e){if(e.target===ov)ov.classList.remove('on')};
  $('[data-x]',ov).onclick=function(){ov.classList.remove('on')};$('[data-r]',ov).onclick=function(){sh=!sh;$('.qbk-a',ov).classList.toggle('on',sh);this.textContent=sh?'🙈 إخفاء الإجابة':'💡 إظهار الإجابة'};
  $('[data-nx]',ov).onclick=function(){if(i<QS.length-1){i++;R()}};$('[data-p]',ov).onclick=function(){if(i>0){i--;R()}};
  ov.addEventListener('keydown',function(e){e.stopPropagation()})}
E.qbook=qbook;

(function(){if(document.getElementById('lk-css'))return;var st=document.createElement('style');st.id='lk-css';st.textContent='.labtools{display:flex;gap:10px;flex-wrap:wrap}.ltool{flex:1;min-width:120px;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 10px;border-radius:16px;background:rgba(255,255,255,.05);border:1.5px solid var(--line2);color:var(--ink,#e8f1ff);font-family:var(--disp);cursor:pointer;transition:all .2s}.ltool span{font-size:28px;line-height:1.15}.ltool b{font-size:16px}.ltool.on{border-color:var(--au,#f5c451);background:rgba(245,196,81,.14);box-shadow:0 0 0 3px rgba(245,196,81,.18)}.labtb .tb{font-size:17px;margin:4px 0 0}.labtb td.new{animation:flashc .9s}@keyframes flashc{0%{background:rgba(245,196,81,.35)}100%{background:transparent}}.labtb .tb td,.labtb .tb th{padding:6px 8px}.labtb td.q{opacity:.45}.labtb{margin:0}.labtb .tb td{font-size:16.5px;line-height:1.45}';document.head.appendChild(st)})();
var LK=E.LK;
function hexP(x,cx,cy,r,a,fill,stroke){x.save();x.translate(cx,cy);x.rotate(a);x.beginPath();for(var k=0;k<6;k++){var q=k*Math.PI/3;x.lineTo(Math.cos(q)*r,Math.sin(q)*r*.78)}x.closePath();x.fillStyle=fill;x.fill();x.strokeStyle=stroke||'rgba(30,35,45,.6)';x.lineWidth=Math.max(1,r/14);x.stroke();x.fillStyle='rgba(255,255,255,.28)';x.beginPath();x.moveTo(-r*.6,-r*.25);x.lineTo(0,-r*.7);x.lineTo(r*.2,-r*.3);x.closePath();x.fill();x.restore()}
function cubeP(x,cx,cy,s,fill){x.fillStyle=fill||'#fbfbf8';x.strokeStyle='#8fa0a8';x.lineWidth=1.4;x.fillRect(cx-s/2,cy-s/2,s,s);x.strokeRect(cx-s/2,cy-s/2,s,s);x.fillStyle='rgba(200,220,230,.7)';x.beginPath();x.moveTo(cx-s/2,cy-s/2);x.lineTo(cx-s/2+s*.3,cy-s/2-s*.3);x.lineTo(cx+s/2+s*.3,cy-s/2-s*.3);x.lineTo(cx+s/2,cy-s/2);x.closePath();x.fill();x.stroke()}
function rnd(seed){var s=seed||7;return function(){s=(s*9301+49297)%233280;return s/233280}}

/* ========== كيف تتشكّل المعادن؟ (مختبر) ========== */
S({id:'form',name:'م كيف تتشكّل المعادن؟',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة · كيف تتشكّل المعادن؟ ص ١٣٦–١٣٧</div><h1 class="t" style="font-size:42px">كيف تتشكّل المعادن؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 58%;gap:8px;min-height:0" id="fL"><canvas class="sim" id="fC" width="1000" height="500" style="flex:1;min-height:0;width:100%;border-radius:18px"></canvas><div class="qa" style="margin:0" id="fA"></div></div>'+
   '<div class="col grow side" style="gap:10px" id="fR">'+card('تتشكّل المعادن بعدة طرائق','<p style="margin:0;font-size:18.5px;line-height:1.7">• <b class="gl">التبريد البطيء للصهارة</b> في باطن الأرض: تتّحد الذرات بطريقة منتظمة فتتكوّن أنواع خاصة من المعادن. وإذا وصل الصهير إلى السطح (<b>لابة</b>) وبرد بسرعة تكوّن نوع آخر.<br>• <b class="gl">التبخّر:</b> عند تبخّر ماء البحر تتشكّل بلورات الملح، ومعادن أخرى منها <b>الجبس</b>.<br>• <b class="gl">الترسيب:</b> يحمل الماء كمية محددة من المواد الذائبة، وما يفيض عنها يترسّب مادة صلبة، مثل <b>عُقيدات المنجنيز</b> (أقطارها حتى ٢٥ سم).</p>')+'</div></div>';
  var tl=LK.tools($('#fL',el),[['🌋','١) تبريد الصهارة'],['☀️','٢) التبخّر'],['🧪','٣) الترسيب']],function(i){mode=i;reset();ctl()});$('#fL',el).insertBefore(tl,$('#fC',el));
  var TB=LK.table($('#fR',el),['الطريقة','ماذا لاحظنا؟','مثال من الكتاب'],[['تبريد الصهارة','',''],['التبخّر','',''],['الترسيب','','']]);
  var cv=$('#fC',el),x=cv.getContext('2d'),W=1000,H=500,BY=400,mode=0,live=false,raf=0,t=0,A={},R1=rnd(3),SL=[],FS=[],CR=[],DP=[],NOD=[];
  for(var i=0;i<7;i++)SL.push({x:.15+R1()*.7,y:.2+R1()*.65,a:R1()*3,g:.8+R1()*.4,c:['#e9e4da','#8b919b','#cdbca8','#f4efe6','#5f6672'][i%5]});
  for(i=0;i<70;i++)FS.push({x:.05+R1()*.9,y:.1+R1()*.85,a:R1()*3,g:.7+R1()*.6,c:['#e9e4da','#8b919b','#cdbca8','#f4efe6','#5f6672'][i%5]});
  function reset(){A={slow:-1,fast:-1,heat:-1,lvl:1,spoons:0,dis:0};CR=[];DP=[];NOD=[];t=0}
  function ctl(){var Q=$('#fA',el);
    if(mode===0)Q.innerHTML='<button class="btn gold" data-a="s">🐢 برّد الكأس (أ) ببطء: داخل الأرض</button><button class="btn gold" data-a="f">⚡ برّد الكأس (ب) بسرعة: على السطح</button><button class="btn ghost" data-a="z">↺</button>';
    else if(mode===1)Q.innerHTML='<button class="btn gold" data-a="h">🔥 سخّن ماء البحر ليتبخّر</button><button class="btn ghost" data-a="z">↺ ماء بحر جديد</button>';
    else Q.innerHTML='<button class="btn gold" data-a="p">🥄 أضف ملعقة من المادة وحرّك</button><button class="btn ghost" data-a="z">↺</button>';
    $$('[data-a]',Q).forEach(function(b){b.onclick=function(){var a=b.dataset.a;E.sfx&&E.sfx.pop&&E.sfx.pop();
      if(a==='z')reset();if(a==='s'&&A.slow<0)A.slow=0;if(a==='f'&&A.fast<0)A.fast=0;if(a==='h'&&A.heat<0)A.heat=0;
      if(a==='p'){A.spoons++;if(A.spoons<=4){A.dis=A.spoons}else{for(var k=0;k<10;k++)DP.push({x:420+Math.random()*160,y:150+Math.random()*60,vy:0,s:5+Math.random()*7})}}
      E.complete&&E.complete('form')}})}
  function lavaCol(k){return 'rgb('+Math.round(255-170*k)+','+Math.round(120-40*k)+','+Math.round(30+60*k)+')'}
  function draw(){LK.bg(x,W,H,BY);
    if(mode===0){var ks=A.slow<0?0:Math.min(1,A.slow/8),kf=A.fast<0?0:Math.min(1,A.fast/2);
      [[290,ks,SL,'(أ) تبريد بطيء','داخل الأرض'],[710,kf,FS,'(ب) تبريد سريع','على سطح الأرض']].forEach(function(o,j){var cx=o[0],k=o[1],P=o[2];
        if(j===0){x.fillStyle='#8a6a4a';LK.rr(x,cx-120,BY-300,240,300,16);x.fill();x.fillStyle='#6b513d';x.fillRect(cx-120,BY-300,240,26);LK.T(x,'صندوق عازل',cx,BY-286,15,'#fff')}
        else{x.fillStyle='rgba(150,205,240,.6)';LK.rr(x,cx-125,BY-90,250,90,14);x.fill();for(var q=0;q<5;q++){x.fillStyle='#f4fbff';x.fillRect(cx-100+q*44,BY-70+Math.sin(q)*6,22,22)}LK.T(x,'ماء مثلّج',cx,BY-14,15,'#13405a')}
        LK.beaker(x,cx,BY-(j?20:30),170,190,{liq:k>0.98?'rgba(110,115,125,.9)':lavaCol(k),level:.62,inside:function(g,X,Y,Wd,Hd){P.forEach(function(p){var r=k*(j?Math.max(4,9*p.g):46*p.g);if(r>1)hexP(g,X+p.x*Wd,Y+p.y*Hd,r,p.a,p.c)});if(k<1&&k>0){g.fillStyle='rgba(255,140,60,'+(.35*(1-k))+')';g.fillRect(X,Y,Wd,Hd)}},label:o[3]});
        LK.plate(x,o[4],cx,BY+40);
        if(k>=1)LK.lens(x,500,j?300:118,70,cx,BY-120,function(g,s){g.fillStyle='#d9dde2';g.fillRect(0,0,s,s);P.forEach(function(p){var r=j?Math.max(6,13*p.g):52*p.g;hexP(g,p.x*s,p.y*s,r,p.a,p.c)})},j?'بلورات صغيرة جدًّا':'بلورات كبيرة')});
      if(ks>=1&&kf>=1&&!TB.done[0])TB.fill(0,['البطيء ← <b>بلورات كبيرة</b> منتظمة · السريع ← <b>بلورات صغيرة</b>','الصهارة تبرد ببطء في باطن الأرض، واللابة تبرد بسرعة على السطح']);
      if(A.slow<0&&A.fast<0)LK.pill(x,'سائل منصهر ساخن يمثّل الصهارة… برّد كل كأس بطريقة مختلفة',500,40,'#fff','#b4530a',18)}
    else if(mode===1){var kh=A.heat<0?0:Math.min(1,A.heat/9);A.lvl=1-.9*kh;var cx=500,dy=BY-70;
      x.fillStyle='#4f5d63';LK.rr(x,cx-150,BY-60,300,60,10);x.fill();x.fillStyle=kh>0&&kh<1?'#ff5a2a':'#2d3a40';x.fillRect(cx-110,BY-66,220,8);LK.plate(x,'سخّان كهربائي',cx,BY+36);
      x.save();x.beginPath();x.moveTo(cx-210,dy-60);x.quadraticCurveTo(cx,dy+40,cx+210,dy-60);x.lineTo(cx+200,dy-66);x.quadraticCurveTo(cx,dy+28,cx-200,dy-66);x.closePath();x.fillStyle='#f4f6f6';x.fill();x.strokeStyle='#8fa0a8';x.lineWidth=3;x.stroke();
      var wl=dy-60+90*(1-A.lvl);x.beginPath();x.moveTo(cx-205,dy-62);x.quadraticCurveTo(cx,dy+34,cx+205,dy-62);x.lineTo(cx+205,wl);x.lineTo(cx-205,wl);x.closePath();x.clip();x.fillStyle='rgba(110,180,230,.6)';x.fillRect(cx-210,wl,420,120);x.restore();
      if(kh>0&&kh<1){x.strokeStyle='rgba(140,160,175,.55)';x.lineWidth=4;for(var q=0;q<6;q++){var yy=dy-90-((t*70+q*45)%170);x.beginPath();x.moveTo(cx-120+q*48,yy);x.quadraticCurveTo(cx-105+q*48,yy-14,cx-120+q*48,yy-28);x.stroke()}}
      var nC=kh>.35?Math.floor((kh-.35)*70):0;while(CR.length<nC)CR.push({x:cx-150+Math.random()*300,y:dy-6-Math.random()*26,s:7+Math.random()*12});CR.forEach(function(c){cubeP(x,c.x,c.y,c.s)});
      LK.pill(x,'ماء البحر في طبق تبخير',cx,dy-150,'#fff','#13405a',18);
      if(kh>=1){LK.lens(x,830,150,95,cx+60,dy-14,function(g,s){g.fillStyle='#e8eaec';g.fillRect(0,0,s,s);var r=rnd(5);for(var i=0;i<9;i++)cubeP(g,25+r()*(s-50),25+r()*(s-50),24+r()*22)},'بلورات الملح مكعبة');if(!TB.done[1])TB.fill(1,['تبخّر الماء فتبلورت <b>مكعبات الملح</b> في الطبق','الملح ومعادن أخرى منها <b>الجبس</b> عند تبخّر ماء البحر'])}}
    else{var cx2=420,full=A.spoons>4;LK.beaker(x,cx2,BY,260,300,{liq:'rgba(120,190,235,'+(.45+A.dis*.06)+')',level:.8,label:'ماء + مادة ذائبة',inside:function(g,X,Y,Wd,Hd){var r=rnd(9);for(var i=0;i<A.dis*14;i++){g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.arc(X+r()*Wd,Y+r()*Hd,2,0,7);g.fill()}}});
      DP.forEach(function(p){if(p.y<BY-18){p.vy+=.15;p.y+=p.vy}else{p.done=1}});DP.filter(function(p){return p.done}).forEach(function(p){if(!p.c){p.c=1;NOD.push({x:p.x,s:p.s})}});DP=DP.filter(function(p){return !p.done});
      DP.forEach(function(p){hexP(x,p.x,p.y,p.s,.4,'#7d7f88')});NOD.forEach(function(q,i){hexP(x,q.x,BY-14-((i%3)*6),q.s,.3,'#5e6068')});
      x.fillStyle='#fff';LK.rr(x,630,90,300,34,10);x.fill();x.strokeStyle='#9aa5ab';x.lineWidth=2;x.stroke();x.fillStyle=full?'#e23b4a':'#38b6e8';LK.rr(x,633,93,294*Math.min(1,A.spoons/6),28,8);x.fill();x.fillStyle='#14222b';x.fillRect(630+300*4/6,82,3,50);LK.T(x,'ما يستطيع الماء حمله',730,150,16,'#14222b');LK.T(x,'كمية المادة المضافة',780,70,17,'#14222b');
      LK.T(x,full?'فاضت المادة عن قدرة الماء… فترسّبت مادة صلبة':A.spoons?'تذوب المادة وتختفي في الماء':'أضف المادة ملعقة بعد ملعقة',cx2,40,21,full?'#b4530a':'#14222b');
      if(full&&NOD.length>8){x.fillStyle='#1d4f78';LK.rr(x,640,230,300,150,14);x.fill();x.fillStyle='#6b5a44';x.fillRect(640,340,300,40);[[690,14],[760,20],[830,12],[890,17]].forEach(function(q){var gr=x.createRadialGradient(q[0]-4,334-q[1]*.6,2,q[0],336-q[1]*.4,q[1]);gr.addColorStop(0,'#6b6b72');gr.addColorStop(1,'#1d1c22');x.fillStyle=gr;x.beginPath();x.ellipse(q[0],344-q[1]*.5,q[1],q[1]*.7,0,0,7);x.fill()});LK.T(x,'في الطبيعة: عُقيدات المنجنيز',790,255,17,'#fff');LK.T(x,'على قيعان المحيطات',790,282,15,'#cfe6ff');
        if(!TB.done[2])TB.fill(2,['ما فاض عن قدرة الماء <b>ترسّب</b> مادة صلبة','<b>عُقيدات المنجنيز</b> في قيعان المحيطات'])}}}
  function loop(){if(!live)return;raf=requestAnimationFrame(loop);t+=1/60;if(A.slow>=0)A.slow+=1/60;if(A.fast>=0)A.fast+=1/60;if(A.heat>=0)A.heat+=1/60;draw()}
  reset();ctl();$$('.ltool',tl)[0].classList.add('on');draw();
  return {enter:function(){live=true;loop()},leave:function(){live=false;cancelAnimationFrame(raf)}}}});

/* ========== أدلة تشكّل المعدن ========== */
S({id:'evid',name:'م أدلة تشكّل المعدن',build:function(el){
  var SP=[{n:'العينة ١: صخر ببلورات متداخلة',o:0,ev:'بلورات معدنية <b>كبيرة مرتبطة معًا بإحكام</b>'},{n:'العينة ٢: فجوة داخل صخر',o:1,ev:'بلورات <b>كبيرة مكتملة الشكل</b> داخل فجوة'},{n:'العينة ٣: تجمّع الفلوريت (الشكل ٢)',o:2,ev:'تجمّع بلورات <b>تكوّن من سائل</b> غني بالمعادن'}],OP=['تبريد بطيء للصهارة','توافر حيز كافٍ لينمو المعدن','محلول مشبع بمعادن ذائبة'],cur=0,ans={};
  el.innerHTML='<div class="eyebrow">المحطة · أدلة تشكّل المعدن ص ١٣٧</div><h1 class="t" style="font-size:42px">أدلة تشكّل المعدن: كن جيولوجيًّا!</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 58%;gap:8px;min-height:0" id="eL"><canvas class="sim" id="eC" width="1000" height="470" style="flex:1;min-height:0;width:100%;border-radius:18px"></canvas><div class="card" style="padding:10px 14px"><b style="font-size:20px">🔎 بماذا تخبرنا العينة عن طريقة تكوّنها؟</b><div class="chips" id="eO" style="margin-top:6px">'+OP.map(function(o,i){return '<button class="chip" data-o="'+i+'">'+o+'</button>'}).join('')+'</div></div></div>'+
   '<div class="col grow side" style="gap:10px" id="eR">'+card('يمكن الحكم على طريقة تكوّن المعدن من مظهره','<p style="margin:0;font-size:18px;line-height:1.7">• بلورات كبيرة مرتبطة معًا بإحكام ← دليل على تكوّن الصخر نتيجة <b class="gl">تبريد بطيء للصهارة</b>.<br>• بلورات كبيرة مكتملة الشكل ← توافر للمعدن <b class="gl">حيز كافٍ لينمو</b>، كما في فجوة داخل الصخور.<br>• بلورات الشكل ٢ تكوّنت من <b class="gl">محلول مشبع</b> بالمعادن الذائبة. ولمعرفة كيف تشكّل معدن نلاحظ <b>حجم البلورات</b> و<b>كيف تنتظم معًا</b>.</p>')+'</div></div>';
  var tl=LK.tools($('#eL',el),SP.map(function(s,i){return ['🪨',s.n.split(':')[0]]}),function(i){cur=i;paint()});$('#eL',el).insertBefore(tl,$('#eC',el));
  var TB=LK.table($('#eR',el),['العينة','الدليل','ماذا يدل؟'],SP.map(function(s){return [s.n.split(':')[0],'','']}));
  var cv=$('#eC',el),x=cv.getContext('2d'),W=1000,H=470,BY=380;
  function blob(g,cx,cy,rx,ry,n,amp,sd){var r=rnd(sd);g.beginPath();for(var k=0;k<n;k++){var a=k/n*Math.PI*2,f=1+(r()-.5)*amp;g.lineTo(cx+Math.cos(a)*rx*f,cy+Math.sin(a)*ry*f)}g.closePath()}
  function iso(g,x0,y0,a,h){var w=a*.87;function f(pts,col){g.beginPath();pts.forEach(function(p,i){i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])});g.closePath();g.fillStyle=col;g.fill();g.strokeStyle='hsla('+h+',70%,86%,.85)';g.lineWidth=Math.max(1,a/40);g.stroke()}
    f([[x0,y0-a],[x0+w,y0-a/2],[x0,y0],[x0-w,y0-a/2]],'hsla('+h+',62%,72%,.95)');
    f([[x0-w,y0-a/2],[x0,y0],[x0,y0+a],[x0-w,y0+a/2]],'hsla('+h+',55%,50%,.95)');
    f([[x0,y0],[x0+w,y0-a/2],[x0+w,y0+a/2],[x0,y0+a]],'hsla('+h+',60%,34%,.95)');
    g.strokeStyle='hsla('+h+',60%,80%,.35)';g.lineWidth=Math.max(1,a/30);g.beginPath();g.moveTo(x0-w*.55,y0-a*.2);g.lineTo(x0-w*.55,y0+a*.62);g.stroke();
    g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.moveTo(x0-w*.5,y0-a*.62);g.lineTo(x0-w*.15,y0-a*.8);g.lineTo(x0+w*.1,y0-a*.68);g.lineTo(x0-w*.25,y0-a*.5);g.closePath();g.fill()}
  function specimen(g,i,cx,cy,s){var r=rnd(11+i),k;g.save();
    if(i===0){blob(g,cx,cy,s,s*.7,36,.1,4);g.save();g.clip();g.fillStyle='#9aa0a8';g.fillRect(cx-s*1.2,cy-s,2.4*s,2*s);
      for(k=0;k<70;k++){var px=cx-s+r()*2*s,py=cy-s*.75+r()*1.5*s,rr=s*(.1+r()*.13);g.fillStyle=['#efe9df','#34363c','#d9b8a3','#bfc4ca','#f6f3ee','#c99f86'][k%6];g.beginPath();for(var q=0;q<6;q++){var a=q/6*7+r()*.6;g.lineTo(px+Math.cos(a)*rr,py+Math.sin(a)*rr)}g.closePath();g.fill();g.strokeStyle='rgba(25,25,30,.55)';g.lineWidth=Math.max(1,s/90);g.stroke()}
      var sh=g.createLinearGradient(cx-s,cy-s,cx+s,cy+s);sh.addColorStop(0,'rgba(255,255,255,.18)');sh.addColorStop(1,'rgba(0,0,0,.28)');g.fillStyle=sh;g.fillRect(cx-s*1.2,cy-s,2.4*s,2*s);g.restore();blob(g,cx,cy,s,s*.7,36,.1,4);g.strokeStyle='#1f262c';g.lineWidth=3;g.stroke()}
    else if(i===1){/* فجوة جيود: قشرة صخرية، أشرطة عقيق، بلورات أمثيست كبيرة مكتملة تتجه نحو المركز */
      blob(g,cx,cy,s,s*.78,44,.12,8);var gr=g.createRadialGradient(cx-s*.35,cy-s*.35,s*.1,cx,cy,s*1.15);gr.addColorStop(0,'#a8937c');gr.addColorStop(1,'#54473b');g.fillStyle=gr;g.fill();g.strokeStyle='#2a221b';g.lineWidth=3;g.stroke();
      g.save();g.clip();for(k=0;k<260;k++){g.fillStyle='rgba(35,25,18,'+(.15+r()*.35)+')';g.fillRect(cx+(r()-.5)*2.1*s,cy+(r()-.5)*1.7*s,s/60,s/60)}g.restore();
      ['#d9e1e8','#9fb2c3','#eef2f5','#8ea2b5','#cdd7e0'].forEach(function(c,j){var f=.84-j*.035;blob(g,cx,cy,s*f,s*.62*f,44,.08,9);g.fillStyle=c;g.fill()});
      var RX=s*.66,RY=s*.47;var cg=g.createRadialGradient(cx,cy,2,cx,cy,RX);cg.addColorStop(0,'#120c1c');cg.addColorStop(1,'#3a2a52');g.fillStyle=cg;g.beginPath();g.ellipse(cx,cy,RX,RY,0,0,7);g.fill();
      g.save();g.beginPath();g.ellipse(cx,cy,RX,RY,0,0,7);g.clip();
      var CR=[];for(var j=0;j<60;j++){var lg=j%2===0;CR.push({a:(j/60)*Math.PI*2+r()*.05,L:s*(lg?.42:.27)*(.85+r()*.3),ri:lg?0:1})}
      CR.forEach(function(o){var a=o.a,ri=o.ri,bx=cx+Math.cos(a)*RX*1.03,by=cy+Math.sin(a)*RY*1.03,dx=cx-bx,dy=cy-by,dl=Math.hypot(dx,dy)||1,ux=dx/dl,uy=dy/dl,L=Math.min(o.L,dl*.8),w=L*.2,tx=bx+ux*L,ty=by+uy*L,nx=-uy,ny=ux,mx=bx+ux*L*.6,my=by+uy*L*.6,hue=270+r()*16;
        g.beginPath();g.moveTo(bx+nx*w,by+ny*w);g.lineTo(mx+nx*w,my+ny*w);g.lineTo(tx,ty);g.lineTo(mx,my);g.lineTo(bx,by);g.closePath();g.fillStyle='hsl('+hue+',62%,'+(70-ri*4)+'%)';g.fill();
        g.beginPath();g.moveTo(bx-nx*w,by-ny*w);g.lineTo(mx-nx*w,my-ny*w);g.lineTo(tx,ty);g.lineTo(mx,my);g.lineTo(bx,by);g.closePath();g.fillStyle='hsl('+hue+',55%,'+(36-ri*3)+'%)';g.fill();
        g.strokeStyle='rgba(40,20,70,.7)';g.lineWidth=Math.max(1,s/140);g.beginPath();g.moveTo(bx+nx*w,by+ny*w);g.lineTo(mx+nx*w,my+ny*w);g.lineTo(tx,ty);g.lineTo(mx-nx*w,my-ny*w);g.lineTo(bx-nx*w,by-ny*w);g.stroke();
        g.strokeStyle='rgba(245,235,255,.85)';g.lineWidth=Math.max(1,s/120);g.beginPath();g.moveTo(mx+nx*w,my+ny*w);g.lineTo(tx,ty);g.moveTo(mx,my);g.lineTo(tx,ty);g.stroke()});
      g.restore()}
    else{/* تجمّع بلورات الفلوريت المكعبة فوق قاعدة صخرية */
      blob(g,cx,cy+s*.5,s*1.02,s*.3,30,.16,12);var mg=g.createLinearGradient(0,cy+s*.2,0,cy+s*.85);mg.addColorStop(0,'#9b8e80');mg.addColorStop(1,'#4d443c');g.fillStyle=mg;g.fill();g.strokeStyle='#2a241f';g.lineWidth=3;g.stroke();
      for(k=0;k<90;k++){g.fillStyle='rgba(255,255,255,'+(.3+r()*.5)+')';g.fillRect(cx+(r()-.5)*1.7*s,cy+s*.35+r()*s*.35,s/90,s/90)}
      [[-.05,-.32,.3,268],[.32,-.22,.24,275],[-.4,-.1,.32,262],[.1,0,.46,270],[.5,.08,.28,280],[-.62,.24,.3,266],[-.18,.3,.38,272],[.32,.3,.34,264],[.68,.34,.22,276]].forEach(function(q){iso(g,cx+q[0]*s,cy+q[1]*s,q[2]*s,q[3])})}
    g.restore()}
  function paint(){LK.bg(x,W,H,BY);var cx=300,cy=200;
    x.fillStyle='rgba(0,0,0,.2)';x.beginPath();x.ellipse(cx,BY-10,200,22,0,0,7);x.fill();
    specimen(x,cur,cx,cy,170);LK.plate(x,SP[cur].n,cx,BY+38);
    LK.lens(x,770,205,150,cx+(cur===2?40:cur===1?60:30),cy-(cur===2?20:0),function(g,s){g.fillStyle='#d5d9de';g.fillRect(0,0,s,s);var z=cur===2?1.25:1.15;specimen(g,cur,s/2-(cur===2?30:cur===1?45:20)*z,s/2+(cur===2?40:0),s*.5*z+80)},'تحت العدسة المكبّرة');
    $$('#eO .chip',el).forEach(function(b,i){b.setAttribute('aria-pressed',ans[cur]===i?'true':'false');b.style.background=ans[cur]==null?'':i===SP[cur].o&&ans[cur]===i?'rgba(52,211,153,.35)':ans[cur]===i?'rgba(226,59,74,.35)':''})}
  $$('#eO .chip',el).forEach(function(b){b.onclick=function(){var i=+b.dataset.o;ans[cur]=i;if(i===SP[cur].o){E.sfx&&E.sfx.pop&&E.sfx.pop();TB.fill(cur,[SP[cur].ev,'<b>'+OP[i]+'</b>']);E.complete&&E.complete('evid')}paint()}});
  $$('.ltool',tl)[0].classList.add('on');paint();return {}}});

/* ========== خصائص المعادن (مقدمة) ========== */
S({id:'props',name:'م خصائص المعادن',build:function(el){el.innerHTML='<div class="eyebrow">المحطة · خصائص المعادن ص ١٣٧</div><h1 class="t">نتعرّف المعادن من خلال خصائصها الفيزيائية</h1>'+
  '<div class="card" style="padding:12px 18px;margin-bottom:12px"><p class="big" style="margin:0">🧑‍🤝‍🧑 إذا لمحت صديقك بين حشد من الناس فقد لا تتأكد منه إلا برؤية وجهه، أي من خلال <b class="gl">سمات تميّزه</b>: لون الشعر وشكل العينين والفم. كذلك نميّز كل معدن من غيره بخصائصه، ويمكن تعرّف معظم المعادن الشائعة بمواد حولك، مثل قطعة نقود أو مِبرد فولاذ.</p></div>'+
  '<div class="grow" style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;align-content:start">'+[['💠','الشكل البلوري','ذرات مرتبة بشكل منتظم ومتكرر','ص ١٣٧'],['🔨','الانفصام والمكسر','الطريقة التي يتكسّر بها المعدن','ص ١٣٨'],['🎨','اللون','قد يكون خادعًا','ص ١٣٨'],['〰','المخدش واللمعان','لون المسحوق · انعكاس الضوء','ص ١٣٩'],['🪨','القساوة','مقاومة المعدن للخدش','ص ١٣٩']].map(function(r,i){return '<div class="card pcard" style="padding:16px 10px;text-align:center;animation-delay:'+(i*.12)+'s"><div style="font-size:46px">'+r[0]+'</div><div class="tag gold" style="margin:4px 0">'+n(i+1)+'</div><b style="font-family:var(--disp);font-size:24px;display:block" class="gl">'+r[1]+'</b><p class="reveal big" style="margin:6px 0 0;font-size:19px">'+r[2]+'</p><small class="hint">'+r[3]+'</small></div>'}).join('')+'</div><p class="hint">اضغط «كشف التفسير» لإظهار معنى كل خاصية، وسندرس الخصائص الخمس بترتيب الكتاب في المحطات التالية.</p>';return {enter:function(){E.complete('props')}}}});

/* ========== الشكل البلوري ========== */
/* ===== محرّك عرض ثلاثي الأبعاد مشترك (three.js) ===== */
E.rnd3=function(seed){var s=seed||7;return function(){s=(s*9301+49297)%233280;return s/233280}};
E.three3=function(){if(E._T3)return E._T3;var u=window.X3THREE_SRC?URL.createObjectURL(new Blob([window.X3THREE_SRC],{type:'text/javascript'})):new URL('../tools/three.module.min.js',location.href).href;E._T3=import(u);return E._T3};
E.clear3=function(G){while(G.children.length){var c=G.children.pop();c.traverse(function(o){if(o.geometry)o.geometry.dispose();if(o.material){[].concat(o.material).forEach(function(m){m.dispose()})}})}};
E.view3=function(box,setup){var V={live:false,ready:false,ang:{y:.6,x:.38},auto:true,frame:null,spin:.45};
  box.innerHTML='<div style="position:absolute;inset:0;display:grid;place-items:center;color:#cfe3ff;font-size:20px">⏳ جارٍ تحميل المشهد ثلاثي الأبعاد…</div>';
  V.p=E.three3().then(function(T){
    var R=new T.WebGLRenderer({antialias:true,alpha:true});R.setPixelRatio(Math.min(2,window.devicePixelRatio||1));R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.05;
    box.innerHTML='';box.appendChild(R.domElement);R.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none;cursor:grab';
    var sc=new T.Scene(),cam=new T.PerspectiveCamera(34,1,.1,100);cam.position.set(0,.3,10);cam.lookAt(0,0,0);
    var pm=new T.PMREMGenerator(R),es=new T.Scene();es.background=new T.Color('#56606c');
    [[0,7,0,'#ffffff',9],[7,2,4,'#ffe2b8',5],[-7,1,3,'#cfe6ff',5],[0,-6,0,'#3a4655',1.2],[0,2,-7,'#ffffff',3],[3,-1,7,'#ffffff',2]].forEach(function(q){var m=new T.Mesh(new T.PlaneGeometry(5,5),new T.MeshBasicMaterial({color:new T.Color(q[3]).multiplyScalar(q[4]),side:T.DoubleSide}));m.position.set(q[0],q[1],q[2]);m.lookAt(0,0,0);es.add(m)});
    sc.environment=pm.fromScene(es,.03).texture;
    sc.add(new T.HemisphereLight('#ffffff','#3b4a5a',.7));var dl=new T.DirectionalLight('#ffffff',1.8);dl.position.set(4,7,6);sc.add(dl);var dl2=new T.DirectionalLight('#9fd0ff',.7);dl2.position.set(-6,-2,-4);sc.add(dl2);
    var G=new T.Group();sc.add(G);V.T=T;V.R=R;V.sc=sc;V.cam=cam;V.G=G;
    var cv=R.domElement,dn=null;
    cv.addEventListener('pointerdown',function(e){dn={x:e.clientX,y:e.clientY};V.auto=false;clearTimeout(V.to);try{cv.setPointerCapture(e.pointerId)}catch(_){}cv.style.cursor='grabbing'});
    cv.addEventListener('pointermove',function(e){if(!dn)return;V.ang.y+=(e.clientX-dn.x)*.011;V.ang.x=Math.max(-1.4,Math.min(1.4,V.ang.x+(e.clientY-dn.y)*.011));dn={x:e.clientX,y:e.clientY}});
    function up(){if(!dn)return;dn=null;cv.style.cursor='grab';clearTimeout(V.to);V.to=setTimeout(function(){V.auto=true},5000)}
    cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
    cv.addEventListener('wheel',function(e){e.preventDefault();cam.position.z=Math.max(5.5,Math.min(16,cam.position.z+e.deltaY*.01))},{passive:false});
    setup&&setup(V);V.ready=true;if(V.live)loop();return V});
  V.p.catch(function(){box.innerHTML='<div style="position:absolute;inset:0;display:grid;place-items:center;color:#fff;font-size:20px;text-align:center;padding:20px">تعذّر تشغيل العرض ثلاثي الأبعاد على هذا الجهاز.</div>'});
  var last=0;
  function size(){var w=box.clientWidth,h=box.clientHeight;if(w&&h&&(w!==V.w||h!==V.h)){V.w=w;V.h=h;V.R.setSize(w,h,false);V.cam.aspect=w/h;V.cam.updateProjectionMatrix()}}
  function loop(){if(!V.live||!V.ready)return;V.raf=requestAnimationFrame(loop);var t=performance.now()/1000,dt=last?Math.min(.05,t-last):0;last=t;if(V.auto)V.ang.y+=dt*V.spin;V.G.rotation.set(V.ang.x,V.ang.y,0);size();V.frame&&V.frame(t,dt);V.R.render(V.sc,V.cam)}
  V.start=function(){V.live=true;last=0;if(V.ready){cancelAnimationFrame(V.raf);loop()}};V.stop=function(){V.live=false;cancelAnimationFrame(V.raf)};
  V.face=function(y,x){V.ang.y=y;V.ang.x=x;V.auto=false;clearTimeout(V.to);V.to=setTimeout(function(){V.auto=true},6000)};
  return V};
/* قوام مخطط (للبيريت) وقوام محاري (لمكسر الكوارتز) */
E.tex3=function(T,kind){var c=document.createElement('canvas');c.width=c.height=256;var g=c.getContext('2d'),r=E.rnd3(kind==='rip'?31:17);
  if(kind==='rip'){g.fillStyle='#808080';g.fillRect(0,0,256,256);for(var k=0;k<26;k++){var v=Math.round(110+70*Math.sin(k*1.3)+r()*30);g.strokeStyle='rgb('+v+','+v+','+v+')';g.lineWidth=3+r()*5;g.beginPath();g.arc(40,220,18+k*9.5,-1.75,.25);g.stroke()}}
  else{g.fillStyle='#a0a0a0';g.fillRect(0,0,256,256);for(var y=0;y<256;y+=6+Math.floor(r()*6)){var w=Math.round(60+r()*60);g.fillStyle='rgb('+w+','+w+','+w+')';g.fillRect(0,y,256,2)}}
  var t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;if(kind==='v'){t.center.set(.5,.5);t.rotation=Math.PI/2}return t};
E.edges3=function(T,geo,col,op,th){return new T.LineSegments(new T.EdgesGeometry(geo,th||20),new T.LineBasicMaterial({color:col,transparent:true,opacity:op==null?1:op}))};
E.ball3=function(T,G,p,r,col){var m=new T.Mesh(new T.SphereGeometry(r,24,16),new T.MeshStandardMaterial({color:col,roughness:.35,metalness:.1}));m.position.set(p[0],p[1],p[2]);G.add(m);return m};
E.quartz3=function(T,mat,R,H){var g=new T.Group(),a=new T.Mesh(new T.CylinderGeometry(R,R,H,6,1,true),mat),b=new T.Mesh(new T.ConeGeometry(R,R*1.15,6,1,true),mat),c=b.clone();b.position.y=H/2+R*.575;c.rotation.x=Math.PI;c.position.y=-H/2-R*.575;g.add(a,b,c);
  [a,b,c].forEach(function(m){var e=E.edges3(T,m.geometry,'#ffffff',.85);e.position.copy(m.position);e.rotation.copy(m.rotation);g.add(e)});return g};

/* ========== الشكل البلوري: عرض ثلاثي الأبعاد ========== */
S({id:'crystal',name:'م الشكل البلوري',build:function(el){
  var SH=[{n:'المكعب',m:'m_halite',ex:'الهاليت (الملح الصخري)',d:'بلورة <b class="gl">مكعبة</b>: ستة أوجه مربعة متساوية متعامدة.',lg:[['#a78bfa','أيونات الصوديوم'],['#34d399','أيونات الكلور']]},
    {n:'سداسي الأوجه (مكعب)',m:'m_pyrite',ex:'البيريت (الشكل ٣)',d:'بلورة <b class="gl">سداسية الأوجه</b> (مكعبة) ذات لمعان فلزي ذهبي، وعلى أوجهها خطوط دقيقة.',lg:[['#c3cad4','ذرات الحديد'],['#facc15','ذرات الكبريت']]},
    {n:'المنشور السداسي',m:'m_quartz',ex:'الكوارتز',d:'بلورة على شكل <b class="gl">منشور سداسي</b> ينتهي بهرم سداسي.',lg:[['#94a3b8','ذرات السيليكون'],['#ef4444','ذرات الأكسجين']]}],cur=0,atoms=false,face=false;
  el.innerHTML='<div class="eyebrow">المحطة · الشكل البلوري ص ١٣٧</div><h1 class="t" style="font-size:42px">الشكل البلوري</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 56%;gap:8px;min-height:0" id="kL"><div class="sim" id="kW" style="flex:1;min-height:0;width:100%;border-radius:18px;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 42%,#30475f,#0c1520 75%)"><div id="kV" style="position:absolute;inset:0"></div><div id="kN" style="position:absolute;top:10px;right:12px;background:#13283a;color:#ffd36b;font-weight:800;font-size:19px;padding:5px 14px;border-radius:99px;pointer-events:none"></div><div id="kG" style="position:absolute;bottom:10px;right:12px;display:none;gap:8px;pointer-events:none"></div><div id="kFc" style="position:absolute;top:10px;left:12px;display:none;background:#ffd36b;color:#13283a;font-weight:800;font-size:18px;padding:5px 14px;border-radius:99px;pointer-events:none">✨ سطح بلوري أملس</div><div style="position:absolute;bottom:10px;left:12px;color:#cfe3ff;font-size:15px;pointer-events:none">✋ اسحب لتدوير البلورة</div></div><div class="qa" style="margin:0"><button class="btn gold" id="kA">⚛ أظهر ترتيب الذرات داخل البلورة</button><button class="btn ghost" id="kF">✨ أظهر السطوح البلورية</button></div></div>'+
   '<div class="col grow side" style="gap:10px">'+card('جميع المعادن تتركّب من ذرات مرتبة','<p style="margin:0;font-size:19px;line-height:1.75">جميع المعادن تتركّب من ذرات <b class="gl">مرتبة بشكل منتظم ومتكرر</b>. وتُسمّى المادة الصلبة التي تحوي ذرات بهذا الشكل <b class="gl">بلورات</b>. وتحوي البلورات أحيانًا سطوحًا ملساء تسمّى <b class="gl">السطوح البلورية</b>. فمعدن البيريت يتشكّل من بلورات سداسية الأوجه كما في الشكل ٣.</p>')+'<div class="card" style="padding:10px;display:flex;gap:12px;align-items:center" id="kI"></div></div></div>';
  var tl=LK.tools($('#kL',el),SH.map(function(s){return ['💎',s.ex.split(' (')[0]]}),function(i){cur=i;atoms=false;face=false;sync();build()});$('#kL',el).insertBefore(tl,$('#kW',el));
  var V=E.view3($('#kV',el)),M={};
  function sync(){var s=SH[cur];$('#kI',el).innerHTML=img(s.m,'width:44%;max-height:170px;object-fit:cover;border-radius:12px')+'<div><b style="font-size:20px;display:block">'+s.ex+'</b><p style="margin:4px 0 0;font-size:17.5px;line-height:1.6">'+s.d+'</p></div>';
    $('#kN',el).textContent='شكل البلورة: '+s.n;$('#kG',el).innerHTML=s.lg.map(function(q){return '<span style="background:rgba(10,20,30,.75);color:#fff;font-size:16px;padding:4px 12px;border-radius:99px"><i style="display:inline-block;width:13px;height:13px;border-radius:50%;background:'+q[0]+';margin-left:6px;vertical-align:-1px"></i>'+q[1]+'</span>'}).join('');
    $('#kG',el).style.display=atoms?'flex':'none';$('#kFc',el).style.display=face?'block':'none';$('#kA',el).textContent=atoms?'💎 أظهر البلورة كاملة':'⚛ أظهر ترتيب الذرات داخل البلورة';$('#kF',el).textContent=face?'✨ أخفِ إبراز السطح':'✨ أظهر السطوح البلورية'}
  function build(){if(!V.ready)return;var T=V.T,G=V.G;E.clear3(G);M={};var L=new T.Group(),F;
    if(cur===0){var geo=new T.BoxGeometry(2.5,2.5,2.5);M.body=new T.Mesh(geo,new T.MeshPhysicalMaterial({color:'#f7f1e8',roughness:.08,transparent:true,opacity:.62,clearcoat:1,clearcoatRoughness:.05,side:T.DoubleSide,depthWrite:false}));G.add(M.body);G.add(E.edges3(T,geo,'#ffffff',.95));
      for(var i=0;i<5;i++)for(var j=0;j<5;j++)for(var k=0;k<5;k++){var p=[-1+i*.5,-1+j*.5,-1+k*.5];E.ball3(T,L,p,(i+j+k)%2?.12:.2,(i+j+k)%2?'#a78bfa':'#34d399')}
      var pts=[];for(i=0;i<5;i++)for(j=0;j<5;j++){var a=-1+i*.5,b=-1+j*.5;pts.push(-1,a,b,1,a,b,a,-1,b,a,1,b,a,b,-1,a,b,1)}var bg=new T.BufferGeometry();bg.setAttribute('position',new T.Float32BufferAttribute(pts,3));L.add(new T.LineSegments(bg,new T.LineBasicMaterial({color:'#d8e3ee',transparent:true,opacity:.45})));
      F=new T.Mesh(new T.PlaneGeometry(2.5,2.5),null);F.position.z=1.262}
    else if(cur===1){var geo2=new T.BoxGeometry(2.4,2.4,2.4),th=E.tex3(T,'h'),tv=E.tex3(T,'v');M.mats=[th,th,th,th,tv,tv].map(function(t){return new T.MeshStandardMaterial({color:'#e2bb52',metalness:.9,roughness:.32,bumpMap:t,bumpScale:.8,envMapIntensity:1.4,transparent:true,opacity:1})});M.body=new T.Mesh(geo2,M.mats);G.add(M.body);G.add(E.edges3(T,geo2,'#fff3c4',.7));
      var fe=[],sp=[];for(i=0;i<3;i++)for(j=0;j<3;j++)for(k=0;k<3;k++){var q=[(i-1)*.95,(j-1)*.95,(k-1)*.95];((i+j+k)%2?sp:fe).push([q,i,j,k])}
      fe.forEach(function(o){E.ball3(T,L,o[0],.19,'#c3cad4')});
      sp.forEach(function(o){var d=new T.Vector3(o[1]%2?1:-1,o[2]%2?1:-1,o[3]%2?-1:1).normalize().multiplyScalar(.17);[1,-1].forEach(function(sg){E.ball3(T,L,[o[0][0]+d.x*sg,o[0][1]+d.y*sg,o[0][2]+d.z*sg],.13,'#facc15')})});
      F=new T.Mesh(new T.PlaneGeometry(2.4,2.4),null);F.position.z=1.212}
    else{var qm=new T.MeshPhysicalMaterial({color:'#eef6ff',roughness:.05,transparent:true,opacity:.5,clearcoat:1,side:T.DoubleSide,depthWrite:false,flatShading:true});M.qm=qm;M.body=E.quartz3(T,qm,.9,2.3);G.add(M.body);
      for(var y=-3;y<=3;y++)for(k=0;k<6;k++){var an=k/6*Math.PI*2+y*Math.PI/9,an2=an+Math.PI/6;E.ball3(T,L,[Math.cos(an)*.5,y*.34,Math.sin(an)*.5],.11,'#94a3b8');E.ball3(T,L,[Math.cos(an2)*.6,y*.34+.12,Math.sin(an2)*.6],.085,'#ef4444')}
      F=new T.Mesh(new T.PlaneGeometry(.9,2.3),null);var ap=.9*Math.cos(Math.PI/6)+.012;F.rotation.y=Math.PI/6;F.position.set(Math.sin(Math.PI/6)*ap,0,Math.cos(Math.PI/6)*ap)}
    F.material=new T.MeshBasicMaterial({color:'#ffc23d',transparent:true,opacity:.45,side:T.DoubleSide,depthWrite:false});F.visible=face;G.add(F);M.F=F;
    var fe2=new T.LineSegments(new T.EdgesGeometry(F.geometry),new T.LineBasicMaterial({color:'#ffb300'}));F.add(fe2);
    L.visible=atoms;G.add(L);M.L=L;apply()}
  function apply(){if(!M.body)return;var op=atoms?.14:null;
    if(cur===0)M.body.material.opacity=atoms?.12:.62;else if(cur===1)M.mats.forEach(function(m){m.opacity=atoms?.13:1;m.depthWrite=!atoms});else M.qm.opacity=atoms?.12:.5;
    M.L.visible=atoms;M.F.visible=face}
  V.frame=function(t){if(M.F&&face)M.F.material.opacity=.45+.3*(.5+.5*Math.sin(t*4))};
  V.p.then(function(){build()});
  $('#kA',el).onclick=function(){atoms=!atoms;sync();apply();E.complete&&E.complete('crystal')};
  $('#kF',el).onclick=function(){face=!face;sync();apply();if(face)V.face(cur===2?-Math.PI/6:-.35,.3);E.complete&&E.complete('crystal')};
  $$('.ltool',tl)[0].classList.add('on');sync();return {enter:function(){V.start()},leave:function(){V.stop()}}}});

/* ========== اللون ========== */
S({id:'color',name:'م اللون',build:function(el){
  el.innerHTML='<div class="eyebrow">المحطة · اللون ص ١٣٨</div><h1 class="t" style="font-size:42px">اللون: هل يكفي لتعرّف المعدن؟</h1><div class="row grow" style="min-height:0"><div class="col" style="flex:0 0 56%;gap:8px;min-height:0"><canvas class="sim" id="cC" width="1000" height="430" style="flex:1;min-height:0;width:100%;border-radius:18px"></canvas><div class="card" style="padding:10px 14px"><b style="font-size:20px">🔎 اعتمادًا على اللون فقط: أيّ العينتين هي الذهب؟</b><div class="chips" id="cO" style="margin-top:6px"><button class="chip" data-o="0">العينة أ</button><button class="chip" data-o="1">العينة ب</button><button class="chip" data-o="2">لا يمكن التحديد باللون وحده</button></div><p class="reveal explain" id="cE" style="margin:6px 0 0">صحيح! العينتان صفراوان لامعتان: إحداهما <b>ذهب</b> والأخرى <b>بيريت</b> (ذهب المغفلين). <b>اللون قد يكون خادعًا</b>، ولذلك نستخدم خصائص أدق مثل <b>المخدش</b> في المحطة التالية.</p></div></div>'+
   '<div class="col grow side" style="gap:10px">'+card('اللون','<p style="margin:0;font-size:18.5px;line-height:1.75">يشير اللون الذهبي المحمرّ في قطع النقد الجديدة إلى احتوائها على <b class="gl">النحاس</b>، ويتميز <b class="gl">الكبريت</b> بلونه الأصفر اللامع. لذا يمكن تعرّف المعدن أحيانًا من لونه، ولكن <b>قد يكون اللون خادعًا</b>: فمعدن <b class="gl">البيريت</b> له لون أصفر لامع مثل الذهب الحقيقي مما يخدع المنقّبين، لذلك يسمّى <b>ذهب المغفلين</b>.</p>')+
   card('المعدن نفسه بألوان مختلفة','<div class="row" style="gap:10px;align-items:center">'+img('m_calcite','width:160px;height:115px;object-fit:cover;border-radius:12px')+'<p style="margin:0;font-size:18px">يظهر معدن <b class="gl">الكالسيت</b> بألوان مختلفة بسبب <b>الشوائب</b> (الشكل ٥).</p></div>')+
   '<div class="card" style="padding:10px 14px;text-align:center;font-size:21px;line-height:1.9">قال تعالى: ﴿وَمِنَ الْجِبَالِ جُدَدٌ بِيضٌ وَحُمْرٌ مُّخْتَلِفٌ أَلْوَانُهَا وَغَرَابِيبُ سُودٌ﴾ <small>[فاطر: ٢٧]</small></div></div></div>';
  var cv=$('#cC',el),x=cv.getContext('2d'),W=1000,H=430,BY=330;
  function nug(cx,cy,s,seed){var r=rnd(seed);x.beginPath();for(var k=0;k<11;k++){var a=k/11*7,rr=s*(.75+r()*.35);x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.75)}x.closePath();var g=x.createLinearGradient(cx-s,cy-s,cx+s,cy+s);g.addColorStop(0,'#fff3b0');g.addColorStop(.4,'#e6be3a');g.addColorStop(1,'#9a7414');x.fillStyle=g;x.fill();x.strokeStyle='#7a5a0e';x.lineWidth=2.5;x.stroke();x.fillStyle='rgba(255,255,255,.6)';x.beginPath();x.ellipse(cx-s*.3,cy-s*.3,s*.18,s*.08,-.5,0,7);x.fill()}
  LK.bg(x,W,H,BY);nug(300,BY-90,95,3);nug(700,BY-90,95,8);LK.plate(x,'العينة أ',300,BY+40);LK.plate(x,'العينة ب',700,BY+40);LK.pill(x,'عيّنتان صفراوان لامعتان',500,50,'#fff','#b4530a',20);
  $$('#cO .chip',el).forEach(function(b){b.onclick=function(){var i=+b.dataset.o;$$('#cO .chip',el).forEach(function(z){z.setAttribute('aria-pressed',z===b)});if(i===2){$('#cE',el).classList.add('shown');E.sfx&&E.sfx.pop&&E.sfx.pop();E.complete&&E.complete('color')}else{b.style.background='rgba(226,59,74,.35)'}}});
  return {}}});

var QB={
what:[
 {s:'اختبر نفسك ١',q:'وضّح الفرق بين المعدن والصخر.',a:'<b>المعدن</b> مادة صلبة غير عضوية توجد في الطبيعة، ذراتها مرتبة بانتظام ولها تركيب كيميائي محدد. <b>الصخر</b> مادة صلبة تتكوّن من معدن واحد أو أكثر.'}],
form:[
 {s:'من النص',q:'اذكر طرائق تشكّل المعادن.',a:'من <b>تبريد الصهارة</b>، ومن المحاليل بـ<b>التبخّر</b> (الملح والجبس)، وبـ<b>الترسيب</b> (عقيدات المنجنيز).'},
 {s:'من النص',q:'ماذا تعني رؤية بلورات معدنية كبيرة مرتبطة معًا بإحكام في صخر؟',a:'أن الصخر تكوّن نتيجة <b>تبريد بطيء للصهارة</b>.'},
 {s:'من النص',q:'ما عقيدات المنجنيز؟',a:'رواسب بلورية <b>كروية</b> من معدن المنجنيز تتشكّل بالترسيب وتغطي مساحات شاسعة من قيعان المحيطات، تصل أقطارها إلى <b>٢٥ سم</b>.'}],
evid:[
 {s:'أدلة تشكّل المعدن',q:'ماذا يدل وجود بلورات معدنية كبيرة مرتبطة معًا بإحكام في صخر؟',a:'دليل على تكوّن الصخر نتيجة <b>تبريد بطيء للصهارة</b>.'},
 {s:'أدلة تشكّل المعدن',q:'ماذا يعني أن ترى بلورات كبيرة مكتملة الشكل؟',a:'أن المعدن <b>توافر له حيز كافٍ لينمو</b> داخله، كما يحدث عند تكوّنه في فجوة داخل الصخور.'},
 {s:'الشكل ٢',q:'كيف تكوّن تجمّع بلورات معدن الفلوريت في الشكل ٢؟ وماذا نلاحظ لمعرفة كيف يتشكّل معدن؟',a:'تكوّن من <b>محلول مشبع بمعادن ذائبة</b> فيه. ونلاحظ <b>حجم البلورات</b> و<b>كيف تنتظم معًا</b>.'}],
crystal:[
 {s:'ماذا قرأت؟',q:'ما الذي يميّز البلورات عن الأنواع الأخرى من المواد الصلبة؟',a:'ذراتها <b>مرتبة بشكل منتظم ومتكرر</b>، وتحوي أحيانًا سطوحًا ملساء تسمّى السطوح البلورية.'},
 {s:'الشكل ٣',q:'معدن البيريت يتكوّن عادة من بلورات سداسية الأوجه. فسّر لماذا يسمّى هذا المعدن بالذهب الزائف؟',a:'لأن <b>لونه أصفر لامع</b> يشبه لون الذهب الحقيقي.'},
 {s:'الربط مع علم الأحياء',q:'تحتوي العظام في أجسام المخلوقات الحية على بلورات صغيرة من معدن. ما هذا المعدن؟',a:'معدن <b>الأباتيت</b>. (ابحث عنه وأخبر زملاءك بما توصلت إليه.)'}],
props:[
 {s:'خصائص المعادن',q:'كم عدد المعادن المعروفة في الطبيعة؟ وكيف نفرّق بين المعادن؟',a:'<b>أكثر من ٤٠٠٠ معدن</b>، ونفرّق بينها بخصائصها الفيزيائية: الشكل البلوري، الانفصام والمكسر، اللون، المخدش، اللمعان، القساوة.'},
 {s:'اختبر نفسك ٢',q:'اكتب قائمة تتضمّن خمس خواص تُستخدم في تعرّف المعادن.',a:'<b>الشكل البلوري، الانفصام والمكسر، اللون، المخدش، اللمعان، القساوة</b> (يكفي خمس منها).'}],
color:[
 {s:'اللون',q:'لماذا سُمّي معدن البيريت بـ«ذهب المغفلين»؟',a:'لونه أصفر لامع مثل الذهب الحقيقي، مما <b>يخدع المنقّبين</b> عن الذهب.'},
 {s:'اللون',q:'لماذا لا يكفي اللون وحده لتعرّف المعدن؟',a:'لأنه قد يكون <b>خادعًا</b>: معادن مختلفة لها اللون نفسه (البيريت والذهب)، والمعدن نفسه قد يظهر بألوان مختلفة مثل <b>الكالسيت</b> بسبب الشوائب.'}],
streak:[
 {s:'المخدش',q:'ما معنى المخدش للمعادن؟',a:'<b>الفتات الناعم الملوّن</b> الناتج عن حكّ المعدن بلوح الخدش، أي <b>لون مسحوق المعدن</b>.'},
 {s:'الشكل ٦',q:'وضّح كيف تحصل على مخدش معدن؟',a:'بحكّ المعدن على <b>لوح الخدش</b>، وهو قطعة خزف بيضاء سطحها خشن.'},
 {s:'المخدش',q:'لماذا يعتمد المنقّبون على المخدش؟ وما الفرق بين مخدش البيريت ومخدش الذهب؟',a:'لأن المخدش <b>أدق</b> من اللون. مخدش البيريت <b>أخضر مسودّ أو بني مسودّ</b>، ومخدش الذهب <b>أصفر</b>.'},
 {s:'اللمعان',q:'ما المقصود باللمعان (البريق)؟',a:'كيفية <b>انعكاس الضوء عن سطح المعدن</b>: فلزي، أو غير فلزي (لؤلؤي، زجاجي، باهت، ترابي).'},
 {s:'اختبر نفسك ٤',q:'قارن: ما الفرق بين لون المعدن ومخدشه؟ اذكر مثالًا على ذلك.',a:'<b>اللون</b> لون المعدن الظاهري، و<b>المخدش</b> لون مسحوقه وهو أدق. مثال: <b>البيريت</b> لونه أصفر ذهبي ومخدشه أخضر مسودّ أو بني مسودّ.'}],
mohs:[
 {s:'القساوة',q:'ما أقسى معدن في الطبيعة؟ وما أقلها قساوة؟',a:'أقساها <b>الألماس (١٠)</b> ويمكن استخدامه لقص أي مادة أخرى، وأقلها <b>التلك (١)</b> على مقياس موهس.'},
 {s:'القساوة',q:'ماذا يحدث عند خدش معدن الفلوريت (٤) بقطعة نقدية (٣) وبقطعة زجاجية (٥٫٥)؟',a:'القطعة النقدية <b>لا تخدشه</b> لأنها أقل قساوة منه، والزجاج <b>يخدشه</b> لأنه أقسى منه.'}],
cleave:[
 {s:'الانفصام والمكسر',q:'كيف تتكسّر المعادن؟',a:'بطريقتين: <b>الانفصام</b>: قطع ذات سطوح ناعمة منتظمة عاكسة للضوء (المايكا، الهاليت)، و<b>المكسر</b>: قطع ذات سطوح خشنة (الكوارتز).'},
 {s:'الانفصام والمكسر',q:'ما سبب حدوث الانفصام في بعض المعادن؟',a:'وجود <b>مناطق ضعف</b> داخل ترتيب الذرات المكوّنة للمعدن.'},
 {s:'الشكل ٤ ب',q:'استنتج: لماذا يمكن أن تظهر حبيبات الملح الصخري على شكل مكعبات صغيرة؟',a:'لأن للهاليت <b>ثلاثة اتجاهات انفصام متعامدة</b>، فينفصل إلى قطع مكعبة.'}],
classify:[
 {s:'تجربة: تصنيف المعادن',q:'قرّبنا مغناطيسًا من عينات الكوارتز والكالسيت والهورنبلند والمغنيتيت، ثم وضعنا عليها حمض الهيدروكلوريك المخفّف. ماذا نلاحظ؟',a:'<b>المغنيتيت</b> ينجذب إلى المغناطيس، و<b>الكالسيت</b> يتفاعل مع الحمض ويفور؛ وهي خواص غير عادية نتعرّف بها بعض المعادن.'}],
practice:[
 {s:'تطبيق العلوم',q:'أي الطرائق يمكنك استخدامها لتحديد المعدن الأكثر قساوة: الياقوت أم الزمرد؟',a:'نخدش أحدهما بالآخر: <b>الذي يخدش الآخر هو الأقسى</b>. (الياقوت أقسى من الزمرد.)'}],
common:[
 {s:'المعادن الشائعة',q:'ما المعادن المكوّنة للصخور؟ اذكر أمثلة عليها.',a:'معادن قليلة تتكوّن منها معظم الصخور، أغلبها <b>سليكاتية</b> مثل <b>الكوارتز</b>، ومنها <b>الكربونات</b> التي تدخل في تركيب <b>الحجر الجيري</b> المستخدم في البناء.'},
 {s:'ماذا قرأت؟',q:'ما أهمية معدن الفلسبار السليكاتي؟',a:'من <b>المعادن السليكاتية المكوّنة للصخور</b>، والمعادن السليكاتية تشكّل <b>أكثر من نصف</b> معادن قشرة الأرض.'}],
uses:[
 {s:'الأحجار الكريمة',q:'ما تعريف الحجر الكريم؟ ومتى يكون غالي الثمن؟',a:'<b>معدن نادر قابل للقص والصقل</b> لصناعة الحلي. يكون غالي الثمن إذا كان <b>نقيًّا، خاليًا من الشقوق والعيوب، جميل اللمعان واللون</b>. أمثلة: الألماس، الياقوت، الزمرد، العقيق.'},
 {s:'تكوّن الأحجار الكريمة',q:'أين يتكوّن الألماس في أعماق الأرض؟ وكيف يخرج إلى سطحها؟',a:'يتكوّن من <b>الكربون</b> تحت ضغوط مرتفعة في <b>منطقة الستار</b>، ويخرج <b>بثوران بركاني</b> يرغم الصهارة على الصعود بسرعة حاملة معها قطع الألماس.'},
 {s:'الخامات',q:'متى يسمّى المعدن خامًا؟ وماذا يقصد بالتعدين؟',a:'يسمّى <b>خامًا</b> إذا كان يحوي ما يكفي من مادة مفيدة يمكن بيعها وتحقيق أرباح منها. و<b>التعدين</b> استخراج الفلزات من الأرض.'},
 {s:'الخامات',q:'اذكر أمثلة على فلزات وخاماتها.',a:'<b>الحديد</b> من الهيماتيت، <b>الرصاص</b> من الجالينا، <b>الماغنيسيوم</b> من الدولوميت. ومن الفلزات المستخرجة من الخامات أيضًا: الألومنيوم، النحاس، الذهب، الفضة، الكروم.'},
 {s:'معالجة الخامات',q:'ماذا نفعل بالخام بعد استخراجه؟ مثّل بالنحاس.',a:'يجب <b>معالجته</b>: فالنحاس <b>يُصهر</b> خامه ثم <b>ينقّى</b> من المعادن غير المرغوب فيها، ويستخدم في الأسلاك والتوصيلات الكهربائية والأجهزة.'},
 {s:'اختبر نفسك ٣',q:'صف الظاهرة التي تدفع الألماس إلى سطح الأرض. أين يتكوّن الألماس في الأرض؟',a:'يتكوّن في <b>باطن الأرض (منطقة الستار)</b>، ويخرج بـ<b>ثوران بركاني</b>.'},
 {s:'اختبر نفسك ٥',q:'التفكير الناقد: هل توافق على السكن بالقرب من منجم ذهب يجري العمل فيه؟ فسّر إجابتك.',a:'إجابة مفتوحة تُقبل مع التبرير. مثال: <b>لا أوافق</b>؛ بسبب الضوضاء والغبار وخطر تلوث الماء والتربة بالمواد الكيميائية المستخدمة في استخلاص الذهب.'},
 {s:'اختبر نفسك ٦',q:'أنتج بلد حوالي ٢٣٤٠٠٠٠ طن من النحاس المكرر عام ١٩٩٦م، وفي عام ١٩٩٧م أنتج ٢٤٤٠٠٠٠ طن. ما النسبة المئوية للزيادة؟',a:'الزيادة = ٢٤٤٠٠٠٠ − ٢٣٤٠٠٠٠ = <b>١٠٠٠٠٠ طن</b><br>النسبة = (١٠٠٠٠٠ ÷ ٢٣٤٠٠٠٠) × ١٠٠ ≈ <b>٤٫٣٪</b>'}]
};
L1.stations.forEach(function(st){var q=QB[st.id];if(!q)return;var b=st.build;st.build=function(el,ctx){var r=b(el,ctx);qbook(el,q);return r}});

D.order(L1,['intro','wonder','prior','lab','fold','coop','goals','what','form','evid','props','crystal','cleave','color','streak','mohs','common','uses','classify','eval1','practice','sum','mine','review'],['intro','wonder','prior','lab','fold','coop','goals']);
E.lesson('l1',L1);
})();
