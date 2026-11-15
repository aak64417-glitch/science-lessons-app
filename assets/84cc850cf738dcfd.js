
/* ===== الدرس الثالث: الشغل والآلات البسيطة ===== */
(function(){
const {$,$$,G,STN,def,mcq,calcQ,levels,flips,match,sortGame,tfRound,race,puzzle,challenge,vcard,ayah,say,num,fmt,parseNum,SFX,css,anticip}=K;
function arrow(c,x1,y1,x2,y2,col,w,label,ly){c.strokeStyle=col;c.fillStyle=col;c.lineWidth=w||6;const a=Math.atan2(y2-y1,x2-x1),L=Math.hypot(x2-x1,y2-y1);if(L<2)return;
  c.beginPath();c.moveTo(x1,y1);c.lineTo(x2-Math.cos(a)*12,y2-Math.sin(a)*12);c.stroke();c.beginPath();c.moveTo(x2,y2);c.lineTo(x2-Math.cos(a-.45)*18,y2-Math.sin(a-.45)*18);c.lineTo(x2-Math.cos(a+.45)*18,y2-Math.sin(a+.45)*18);c.fill();
  if(label){c.font='700 15px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign='center';c.fillText(label,(x1+x2)/2+(Math.abs(y2-y1)>Math.abs(x2-x1)?60:0),ly!=null?ly:(y1+y2)/2-12);c.direction='ltr';}}
const T=(c,t,x,y,col,f,al)=>{c.font=f||'700 15px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign=al||'center';c.fillStyle=col||'#14222b';c.fillText(t,x,y);c.direction='ltr';};
function person(c,x,y,col,lean,armUp){c.save();c.translate(x,y);c.strokeStyle=col;c.fillStyle=col;c.lineWidth=8;c.lineCap='round';
  c.beginPath();c.moveTo(-8,0);c.lineTo(0,-40);c.lineTo(10,0);c.moveTo(0,-40);c.lineTo(lean||0,-80);c.stroke();
  c.beginPath();c.moveTo(lean||0,-72);c.lineTo((lean||0)+26,armUp?-96:-60);c.stroke();c.beginPath();c.arc((lean||0)+2,-94,12,0,7);c.fill();c.restore();}

/* ================= INTRO: ramp vs direct lift ================= */
def('intro',{n:'الافتتاحية',plan:3,icon:'<path d="M6 66L70 26V66z" fill="currentColor" opacity=".6"/><rect x="40" y="26" width="14" height="14" fill="currentColor" transform="rotate(-32 47 33)"/>',
 body:`<div class="hero"><div class="stage"><canvas id="hk" width="720" height="380" aria-label="رفع عربة إلى سيارة مباشرة أو بسطح مائل"></canvas>
   <div class="sim-bar"><button class="btn" type="button" id="hkA">الحالة الأولى: ارفعها مباشرة</button><button class="btn" type="button" id="hkB">الحالة الثانية: استخدم سطحًا مائلًا</button></div>
   <div class="readouts pad"><div class="ro"><small>القوة المبذولة</small><b class="ar" id="hkF">—</b></div><div class="ro"><small>المسافة التي تتحركها</small><b class="ar" id="hkD">—</b></div><div class="ro"><small>الجهد</small><b class="ar" id="hkE">—</b></div></div></div>
  <div><span class="eyebrow">ناقش الحالتين · كتاب الطالب</span><h2 class="hero-h">كيف ترفع الثقيل بجهد قليل؟</h2>
   <p class="riddle">تريد تحميل عربة ثقيلة إلى صندوق سيارة. هل ترفعها مباشرة بذراعيك، أم تدفعها على سطح منحدر؟ أيهما يحتاج إلى قوة أقل؟ وما الثمن؟</p>
   <p class="q">توقّع:</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="two"><div class="story"><b>فكرة الدرس:</b> الآلات أدوات تسهّل العمل؛ فهي لا تقلل الشغل، لكنها تغيّر مقدار القوة أو اتجاهها أو كليهما.</div><div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div></div>`,
 init(){const cv=$('#hk'),c=cv.getContext('2d'),W=720,H=380;let mode=null,t=0,raf;
  function draw(){c.fillStyle='#eaf3f6';c.fillRect(0,0,W,H);c.fillStyle='#b9c4c9';c.fillRect(0,320,W,60);
   c.fillStyle='#0b6884';c.fillRect(470,200,230,110);c.fillStyle='#08465a';c.fillRect(470,190,230,14);c.fillStyle='#111';[520,660].forEach(x=>{c.beginPath();c.arc(x,318,24,0,7);c.fill();});
   if(mode==='B'){c.fillStyle='#8b6b4a';c.beginPath();c.moveTo(170,320);c.lineTo(470,196);c.lineTo(470,206);c.lineTo(182,320);c.fill();}
   let bx,by,ang=0;const u=Math.min(1,t/2.2);
   if(mode==='A'){bx=360;by=320-u*124;}else if(mode==='B'){bx=180+u*270;by=320-u*124;ang=-Math.atan2(124,300);}else{bx=360;by=320;}
   c.save();c.translate(bx,by);c.rotate(ang);c.fillStyle='#c97c06';c.fillRect(-30,-40,60,40);c.strokeStyle='#7a4a00';c.lineWidth=3;c.strokeRect(-30,-40,60,40);c.fillStyle='#111';c.beginPath();c.arc(-18,2,6,0,7);c.arc(18,2,6,0,7);c.fill();c.restore();
   if(mode==='A'){person(c,bx-70,320,'#d9483b',8,true);arrow(c,bx,by-60,bx,by-60-110,'#d9483b',12,'قوة كبيرة',by-90);}
   if(mode==='B'){const px=bx-100,py=Math.min(320,320-(px-170)*124/300);person(c,px,py,'#1f7a45',24,false);arrow(c,px+30,py-62,px+30+Math.cos(ang)*60,py-62+Math.sin(ang)*60,'#1f7a45',6);T(c,'قوة أقل',px-10,py-120,'#1f7a45','800 18px "Baloo Bhaijaan 2"');}
   if(!mode)T(c,'اختر طريقة التحميل',W/2-120,120,'#53656e','800 26px "Baloo Bhaijaan 2"');}
  function run(m){mode=m;t=0;SFX.whoosh();let last=performance.now();
   $('#hkF').textContent=m==='A'?'كبيرة':'أقل';$('#hkD').textContent=m==='A'?'قصيرة (الارتفاع فقط)':'أطول (طول السطح)';$('#hkE').textContent=m==='A'?'شاق':'أسهل';
   const step=now=>{t+=(now-last)/1000;last=now;draw();if(t<2.3)raf=requestAnimationFrame(step);};cancelAnimationFrame(raf);raf=requestAnimationFrame(step);}
  $('#hkA').onclick=()=>run('A');$('#hkB').onclick=()=>run('B');draw();}
});

/* ================= GOALS & TERMS ================= */
const GOALS=['تعرّف الشغل وتحدد العاملين المؤثرين فيه.','تحسب الشغل بوحدة الجول.','تميّز الآلات البسيطة من المركبة، وتوضح كيف تسهّل الآلات العمل.','تحسب الفائدة الآلية للبكرات والمستوى المائل والعجلة والمحور.','تصنّف الروافع إلى أنواعها الثلاثة.'];
const TERMS=[
 {t:'الشغل',d:'يُبذل الشغل عندما تؤدي القوة المؤثرة في جسم إلى تحريكه في اتجاه القوة. ش = ق × ف.',ic:'<rect x="8" y="12" width="16" height="16" fill="currentColor"/><path d="M26 20h10M30 14l6 6-6 6" fill="none" stroke="currentColor" stroke-width="3"/>'},
 {t:'الجول',d:'وحدة قياس الشغل، وتساوي نيوتن × متر.',ic:'<text x="20" y="27" text-anchor="middle" font-size="18" font-weight="700" fill="currentColor">J</text>'},
 {t:'الآلة',d:'أداة تسهّل العمل.',ic:'<circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="5 3"/>'},
 {t:'الآلة البسيطة',d:'آلة تتطلب حركة واحدة فقط، مثل البكرة والرافعة.',ic:'<path d="M4 30h32" stroke="currentColor" stroke-width="4"/><path d="M20 30l-6 8h12z" fill="currentColor"/>'},
 {t:'الآلة المركبة',d:'آلة تتكون من مجموعة من الآلات البسيطة، مثل الدراجة.',ic:'<circle cx="11" cy="26" r="7" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="29" cy="26" r="7" fill="none" stroke="currentColor" stroke-width="3"/><path d="M11 26l9-12 9 12" fill="none" stroke="currentColor" stroke-width="3"/>'},
 {t:'الفائدة الآلية',d:'النسبة بين القوة الناتجة والقوة المبذولة. ليس لها وحدة لأنها نسبة بين قوتين.',ic:'<path d="M8 20h24M20 8v6M20 26v6" stroke="currentColor" stroke-width="4"/>'},
 {t:'الرافعة',d:'قضيب أو لوح يرتكز على نقطة ثابتة تسمى نقطة الارتكاز.',ic:'<path d="M4 18l32 6" stroke="currentColor" stroke-width="4"/><path d="M20 22l-6 12h12z" fill="currentColor"/>'},
 {t:'البكرة',d:'عجلة بها تجويف في وسط إطارها يمكن أن يمر خلاله حبل.',ic:'<circle cx="20" cy="16" r="9" fill="none" stroke="currentColor" stroke-width="4"/><path d="M11 16v20M29 16v12" stroke="currentColor" stroke-width="3"/>'}];
def('goals',{n:'الأهداف والمصطلحات',eyebrow:'قبل أن ننطلق',title:'خريطة الرحلة: الأهداف والمصطلحات',goal:'تعرّف ما ستتعلمه اليوم، واقلب بطاقات المصطلحات، ثم طابق كل مصطلح بمعناه.',plan:3,
 icon:'<rect x="12" y="8" width="56" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 26h32M24 40h32M24 54h20" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
 body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><p class="src-note">صيغت الأهداف من محتوى عرض الدرس الثالث، لأن العرض لا يتضمن شريحة أهداف لهذا الدرس.</p></div>
  <div class="side">${vcard('islam','العمل عبادة',`${ayah('وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ','التوبة: 105')}<p class="mt">الإسلام يحث على العمل والإتقان، والآلات من نعم الله التي سخّرها لنا لنعمل بجهد أقل.</p>`)}
   ${vcard('islam','التيسير',`${ayah('يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ','البقرة: 185')}<p class="mt">الآلات البسيطة تيسّر الأعمال الشاقة، فنستعين بها في البناء والزراعة ورفع الماء.</p>`)}</div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المصطلحات</h2><span>المس البطاقة لترى التعريف</span></div><div id="g3flips"></div></div>
  <div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2><span>اختر المصطلح ثم تعريفه</span></div><div id="g3match"></div></div>`,
 init(){flips($('#g3flips'),TERMS);this.reset();},reset(){match($('#g3match'),TERMS.slice(0,6).map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));},
 explain:'<p>الأهداف مصوغة من محتوى العرض: الشغل وحسابه، والآلات البسيطة والمركبة ووظائفها، والفائدة الآلية، وأنواع الروافع.</p>'});

/* ================= S1: work ================= */
const SC=[{n:'رفع الصندوق إلى أعلى',k:'lift',w:true},{n:'حمل الصندوق والمشي أفقيًا',k:'carry',w:false},{n:'دفع الحائط',k:'wall',w:false},{n:'دفع الصندوق على الأرض',k:'push',w:true}];
def('s1',{n:'1 · الشغل',eyebrow:'المحطة 1',title:'مختبر الشغل: متى نبذل شغلًا؟',goal:'جرّب المواقف الأربعة. هل تحرك الجسم في اتجاه القوة؟ إن كان الجواب نعم، فاحسب الشغل.',plan:7,core:1,
 icon:'<rect x="30" y="20" width="26" height="26" fill="currentColor"/><path d="M43 70V50M43 50l-8 8M43 50l8 8" stroke="currentColor" stroke-width="5" fill="none"/>',
 body:`<div class="two"><div class="stage"><canvas id="s1c" width="720" height="320" aria-label="طالب وصندوق"></canvas>
   <div class="sim-bar"><span class="seg" id="s1sc">${SC.map((x,i)=>`<button type="button" data-i="${i}" class="${i===0?'on':''}">${x.n}</button>`).join('')}</span></div>
   <div class="ctrl"><label>القوة ق: <b id="s1Fv">50</b> نيوتن</label><input type="range" id="s1F" min="10" max="100" step="10" value="50"><label>المسافة (الإزاحة) ف: <b id="s1dv">2</b> م</label><input type="range" id="s1d" min="1" max="10" value="2"></div>
   <div class="sim-bar"><button class="btn" type="button" id="s1go">نفّذ ▶</button></div></div>
  <div class="side"><div class="card"><h3>معادلة الشغل</h3><p class="eq">ش = ق × ف<small>الشغل (جول) = القوة (نيوتن) × المسافة في اتجاه القوة (متر)</small></p><ul class="tasks plain"><li>كلما زادت القوة زاد الشغل (علاقة طردية).</li><li>كلما زادت الإزاحة زاد الشغل (علاقة طردية).</li></ul></div>
   <div class="card" id="s1card"></div></div></div>
  <div class="two">${vcard('life','معلومة',`<p>عندما ترفع ثمرة خوخ كبيرة من الأرض إلى مستوى خصرك فإنك تبذل شغلًا مقداره <b>1 جول تقريبًا</b>.</p>`)}
   ${vcard('islam','لا يضيع جهد',`<p>دفعتَ الحائط حتى تعبت ولم يتحرك؟ في الفيزياء الشغل = صفر. لكن في ميزان الله لا يضيع عمل صادق: ﴿فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ﴾ <span class="ref">[الزلزلة: 7]</span>.</p>`)}</div>`,
 init(){const cv=$('#s1c'),c=cv.getContext('2d'),W=720,H=320;let si=0,t=0,run=false,done=new Set(),S={};const F=$('#s1F'),D=$('#s1d');
  const lab=()=>{$('#s1Fv').textContent=F.value;$('#s1dv').textContent=D.value;S={phase:0,ans:null,tries:0};t=0;draw();card();};F.oninput=D.oninput=lab;
  $('#s1sc').onclick=e=>{const b=e.target.closest('[data-i]');if(!b||run)return;si=+b.dataset.i;$$('#s1sc button').forEach(x=>x.classList.toggle('on',x===b));G.tick();lab();};
  function draw(){const sc=SC[si];c.fillStyle='#eef4f6';c.fillRect(0,0,W,H);c.fillStyle='#b9c4c9';c.fillRect(0,270,W,50);const u=Math.min(1,t/2);
   if(sc.k==='wall'){c.fillStyle='#9aa5ab';c.fillRect(470,40,60,232);for(let y=40;y<272;y+=24){c.strokeStyle='#7e898f';c.beginPath();c.moveTo(470,y);c.lineTo(530,y);c.stroke();}person(c,410,270,'#0b6884',28,false);arrow(c,440,190,468,190,'#d9483b',8,'قوة',170);T(c,'الإزاحة = صفر',300,90,'#b53a27','800 22px "Baloo Bhaijaan 2"');return;}
   let bx=200,by=270,px=140;if(sc.k==='lift'){by=270-u*120;}if(sc.k==='carry'||sc.k==='push'){bx=200+u*300;px=140+u*300;}
   if(sc.k==='carry'){by=200;}
   c.fillStyle='#c97c06';c.fillRect(bx-34,by-60,68,60);c.strokeStyle='#7a4a00';c.lineWidth=3;c.strokeRect(bx-34,by-60,68,60);
   if(sc.k==='lift'){person(c,bx-60,270,'#0b6884',10,true);arrow(c,bx,by-66,bx,by-150,'#d9483b',8,'اتجاه القوة',by-110);if(u>0)arrow(c,bx+60,270,bx+60,by,'#1f7a45',5,'اتجاه الحركة',by+40);}
   if(sc.k==='carry'){person(c,px,270,'#0b6884',6,true);arrow(c,bx,by+40,bx,by-6,'#d9483b',7,'القوة إلى أعلى',by+70);arrow(c,bx-40,250,bx+60,250,'#1f7a45',6,'اتجاه الحركة أفقي',262);}
   if(sc.k==='push'){person(c,px-30,270,'#0b6884',26,false);arrow(c,bx-80,by-30,bx-38,by-30,'#d9483b',8,'قوة',by-60);arrow(c,200,300,200+u*300,300,'#1f7a45',5);}
   if(u>0&&sc.k!=='carry'){T(c,'ف = '+D.value+' م',W-110,40,'#1f7a45','800 22px "Baloo Bhaijaan 2"');}}
  function card(){const el=$('#s1card'),sc=SC[si];
   el.innerHTML=`<h3>${sc.n}</h3><ul class="tasks">${SC.map((x,i)=>`<li class="${done.has(i)?'ok':''}">${x.n}</li>`).join('')}</ul>`+(S.phase<1?'<p class="step-text muted mt">اضغط «نفّذ» ثم أجب.</p>':`<p class="q mt">هل بُذل شغل على الصندوق${sc.k==='wall'?' (الحائط)':''}؟</p><div class="opts cols2"><button type="button" class="opt" data-y="1">نعم</button><button type="button" class="opt" data-y="0">لا</button></div><div id="s1x"></div><div id="s1fb"></div>`);
   el.querySelectorAll('[data-y]').forEach(b=>b.onclick=()=>{if(S.ans!=null)return;const y=+b.dataset.y===1;
    if(y===sc.w){S.ans=y;b.classList.add('ok');G.good();G.add(5,'s1');
      if(!sc.w){say($('#s1fb'),'ok',sc.k==='wall'?'صحيح: الحائط لم يتحرك، فالإزاحة صفر والشغل صفر.':'صحيح: القوة إلى أعلى والحركة أفقية؛ فالجسم لم يتحرك في اتجاه القوة، والشغل الذي تبذله على الصندوق صفر.');finish();}
      else{$('#s1x').innerHTML=`<p class="step-text">احسب الشغل: ق = ${num(F.value)} نيوتن ، ف = ${num(D.value)} م</p><form class="answer" id="s1f" autocomplete="off"><label><input id="s1a" inputmode="decimal" aria-label="الشغل"><span class="unit">جول</span></label><button class="btn" type="submit">تحقق</button></form>`;
       $('#s1f').onsubmit=e=>{e.preventDefault();const v=parseNum($('#s1a').value);if(isNaN(v))return;const w=+F.value*+D.value;
        if(Math.abs(v-w)<.01){G.good();G.add(S.tries?4:8,'s1');say($('#s1fb'),'ok',`صحيح: ش = ${F.value} × ${D.value} = ${w} جول.`);$('#s1f').querySelector('button').disabled=true;finish();}
        else{S.tries++;G.bad();say($('#s1fb'),'bad','اضرب القوة في المسافة: ش = ق × ف.');}};}}
    else{b.classList.add('bad');G.bad();say($('#s1fb'),'bad',sc.w?'هل تحرّك الصندوق في اتجاه القوة؟ راقب الأسهم.':'شرط الشغل: أن يتحرك الجسم في اتجاه القوة المؤثرة. هل تحقق ذلك؟');}});}
  function finish(){done.add(si);card();if(done.size>=4)G.complete('s1');}
  $('#s1go').onclick=()=>{if(run)return;run=true;t=0;SFX.whoosh();let last=performance.now();const step=now=>{if(!G.paused&&G.cur==='s1')t+=(now-last)/1000;last=now;draw();if(t<2.1&&SC[si].k!=='wall')requestAnimationFrame(step);else{run=false;S.phase=1;card();}};requestAnimationFrame(step);};
  lab();this.reset=()=>{done=new Set();lab();};},
 quiz:[{q:'القوة المسببة لإزاحة الجسم في اتجاهها تبذل:',o:['سرعة','شغلًا','تسارعًا','قوة متزنة'],a:1},{q:'ما وحدة قياس الشغل؟',o:['جول','نيوتن','باسكال','متر'],a:0,cols:true,why:'وحدة الشغل = نيوتن × متر = جول.'}],
 explain:'<p>يُبذل <b>الشغل</b> عندما تؤثر قوة في جسم فتحركه في اتجاهها. العاملان المؤثران: <b>القوة</b> و<b>الإزاحة</b>.</p><p><b>ش = ق × ف</b>، ووحدته <b>الجول</b> = نيوتن × متر.</p><p>عندما تدفع حائطًا ولا يتحرك فلا يوجد شغل لأن الإزاحة صفر. وعندما تحمل صندوقًا وتمشي أفقيًا فالقوة التي تحمله بها إلى أعلى لا تبذل شغلًا عليه أثناء المشي، لأن الحركة ليست في اتجاه القوة.</p>'});

/* ================= تدريبات حسابية: الشغل (مسائل العرض في موضعها) ================= */
def('pw',{n:'2 · تدريبات حسابية: الشغل',eyebrow:'المحطة 2 · تطبيق الرياضيات ص 63',title:'تدريبات حسابية: الشغل',goal:'احسب الشغل: ش = ق × ف، ووحدته الجول.',plan:4,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="card" id="pwBox"></div>',
 init(){const P=[{tag:'رفع الأثقال',p:'رفع رافع أثقال ثقلًا بقوة 500 نيوتن مسافة 2 م من الأرض إلى موقع أعلى من رأسه. احسب الشغل الذي بذله.',v:1000,unit:'جول',given:'ق = 500 نيوتن ، ف = 2 م',want:'ش = ؟',law:'ش = ق × ف',sol:'ش = 500 × 2 = 1000 جول'},{tag:'عربة الحاسوب',p:'إذا دفعت عربة حاسوب مسافة 10 أمتار بقوة أفقية مقدارها 50 نيوتن، فما مقدار الشغل الذي تبذله؟',v:500,unit:'جول',given:'ف = 10 م ، ق = 50 نيوتن',law:'ش = ق × ف',sol:'ش = 50 × 10 = 500 جول'},{tag:'متسابق أولمبي',p:'ما مقدار الشغل الذي يبذله متسابق أولمبي أثناء ركضه مسافة 200 متر بقوة 6 نيوتن؟',v:1200,unit:'جول',given:'ف = 200 م ، ق = 6 نيوتن',law:'ش = ق × ف',sol:'ش = 6 × 200 = 1200 جول'}];const box=$('#pwBox');const solved=P.map(()=>false);box.innerHTML='<div class="prob-list"></div>';const L=box.querySelector('.prob-list');
  P.forEach((q,i)=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+(i+1)+'</span>'+(q.tag?'<span>'+q.tag+'</span>':'')+'</div>';const inner=document.createElement('div');d.appendChild(inner);L.appendChild(d);
   const fin=()=>{solved[i]=true;d.classList.add('solved');if(solved.every(Boolean))G.complete('pw');};if(q.o)mcq(inner,q,'pw',fin);else calcQ(inner,q,'pw',fin);});},
 reset(){STN['pw'].init();},
 explain:'<p>مسائل العرض في موضعها من الدرس، بالترتيب نفسه. أزرار المساعدة تكشف المعطيات ثم القانون ثم الحل.</p>'});
/* ================= S2: machines ================= */
const SIX=[{t:'الرافعة',d:'قضيب يرتكز على نقطة ارتكاز. مثال: الأرجوحة.',ic:'<path d="M4 18l32 6" stroke="currentColor" stroke-width="4"/><path d="M20 22l-6 12h12z" fill="currentColor"/>'},
 {t:'البكرة',d:'عجلة بها تجويف يمر خلاله حبل. مثال: رفع العلم.',ic:'<circle cx="20" cy="14" r="9" fill="none" stroke="currentColor" stroke-width="4"/><path d="M11 14v22M29 14v12" stroke="currentColor" stroke-width="3"/>'},
 {t:'المستوى المائل',d:'سطح منحدر يمكّنك من رفع جسم ثقيل بقوة أقل.',ic:'<path d="M4 34L36 12V34z" fill="currentColor"/>'},
 {t:'العجلة والمحور',d:'جسمان مثبتان يدوران حول المحور نفسه. مثال: مقبض الباب.',ic:'<circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="20" cy="20" r="4" fill="currentColor"/>'},
 {t:'الأسفين',d:'سطح مائل متحرك له وجه أو وجهان مائلان. مثال: الفأس والسكين.',ic:'<path d="M12 6h16L20 36z" fill="currentColor"/>'},
 {t:'البرغي',d:'سطح مائل ملتف حول عمود شبه أسطواني. مثال: المسمار اللولبي.',ic:'<path d="M16 4h8v28l-4 6-4-6z" fill="currentColor"/><path d="M12 10l16 4M12 18l16 4M12 26l16 4" stroke="currentColor" stroke-width="2"/>'}];
def('s2',{n:'3 · الآلات ووظائفها',eyebrow:'المحطة 3',title:'معرض الآلات: البسيطة والمركبة',goal:'الآلة أداة تسهّل العمل. تعرّف الآلات البسيطة الست، وفرّق بينها وبين المركبة، واكتشف كيف تسهّل العمل.',plan:5,core:1,
 icon:'<circle cx="40" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="8" stroke-dasharray="10 6"/><circle cx="40" cy="40" r="6" fill="currentColor"/>',
 body:`<div class="card"><div class="nb-head"><h2>الآلات البسيطة الست</h2><span>تتطلب حركة واحدة فقط</span></div><div id="s2flips"></div></div>
  <div class="two"><div class="card"><h3>بسيطة أم مركبة؟</h3><div id="s2sortA"></div></div><div class="card"><h3>كيف تسهّل الآلة الشغل؟</h3><div id="s2sortB"></div></div></div>
  <div class="two"><div class="card"><h3>الفائدة الآلية</h3><p class="eq">الفائدة الآلية = القوة الناتجة ÷ القوة المبذولة<small>عندما تضغط على مقبض مفتاح العلب فأنت تؤثر بالقوة المبذولة، ويؤثر المفتاح في الغطاء بالقوة الناتجة</small></p><div id="s2q"></div></div>
   ${vcard('nation','آلات تبني الوطن',`<p>تعمل الرافعات العملاقة في مشاريع المملكة الكبرى، ومنها مشاريع توسعة المسجد الحرام، وهي آلات مركبة تجمع البكرات والروافع والعجلات لرفع الأحمال الضخمة.</p>`)}</div>`,
 init(){flips($('#s2flips'),SIX);let a=false,b=false,q=false;const chk=()=>{if(a&&b&&q)G.complete('s2');};
  const doA=()=>sortGame($('#s2sortA'),{bins:['آلة بسيطة','آلة مركبة'],items:[['البكرة',0],['الدراجة',1],['المستوى المائل',0],['السيارة',1],['البرغي',0],['فتّاحة العلب',1],['الأسفين',0],['نظام البكرات',1]],hint:'هل تتكون من آلة واحدة أم من مجموعة آلات بسيطة؟'},'s2',()=>{a=true;chk();});
  const doB=()=>sortGame($('#s2sortB'),{bins:['تغيير مقدار القوة','تغيير اتجاه القوة','تغيير المقدار والاتجاه معًا'],items:[['قطّاعة الأسلاك (الكمّاشة)',0],['بكرة واحدة لرفع دلو',1],['مفك يفتح غطاء علبة الدهان',2]],hint:'تذكّر أمثلة العرض: الكمّاشة، والبكرة، والمفك مع علبة الدهان.'},'s2',()=>{b=true;chk();});
  doA();doB();
  mcq($('#s2q'),{q:'ما وحدة الفائدة الآلية؟',o:['النيوتن','الجول','ليس لها وحدة؛ لأنها نسبة بين قوتين','المتر'],a:2},'s2',()=>{q=true;chk();});
  this.reset=()=>{a=b=false;doA();doB();};},
 quiz:[{q:'الآلة التي تتكون من مجموعة من الآلات البسيطة تسمى:',o:['آلة بسيطة','آلة مركبة','رافعة','بكرة'],a:1},{q:'أي مما يلي ليس من الآلات البسيطة؟',o:['البرغي','الأسفين','الدراجة','العجلة والمحور'],a:2}],
 explain:'<p><b>الآلة</b> أداة تسهّل العمل، وهي نوعان: <b>بسيطة</b> تتطلب حركة واحدة فقط (الرافعة، البكرة، المستوى المائل، العجلة والمحور، الأسفين، البرغي)، و<b>مركبة</b> تتكون من مجموعة آلات بسيطة (الدراجة، السيارة، فتاحة العلب، نظام البكرات).</p><p>تسهّل الآلات الشغل بتغيير مقدار القوة، أو اتجاهها، أو كليهما معًا.</p><p><b>الفائدة الآلية</b> = القوة الناتجة ÷ القوة المبذولة، وليس لها وحدة.</p>'});

/* ================= S3: pulleys ================= */
def('s3',{n:'4 · البكرات',eyebrow:'المحطة 4',title:'برج البكرات: ارفع الصندوق',goal:'اسحب الحبل لترفع صندوقًا يحتاج إلى قوة 100 نيوتن. قارن بين البكرة الواحدة ونظام البكرات.',plan:6,core:1,
 icon:'<circle cx="40" cy="20" r="12" fill="none" stroke="currentColor" stroke-width="6"/><path d="M28 20v40M52 20v26" stroke="currentColor" stroke-width="5"/><rect x="40" y="46" width="22" height="18" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><canvas id="s3c" width="720" height="380" aria-label="بكرة ترفع صندوقًا"></canvas>
   <div class="sim-bar"><span class="seg" id="s3m"><button type="button" data-m="1" class="on">بكرة واحدة</button><button type="button" data-m="2">نظام البكرات</button></span><button class="btn" type="button" id="s3pull">اسحب الحبل ⬇ (اضغط مطولًا)</button><button class="tbtn" type="button" id="s3r">أعِد</button></div>
   <div class="readouts pad"><div class="ro"><small>القوة الناتجة (على الصندوق)</small><b>100 N</b></div><div class="ro"><small>القوة المبذولة</small><b id="s3F">100 N</b></div><div class="ro"><small>ارتفاع الصندوق</small><b id="s3h">0.0 m</b></div><div class="ro"><small>طول الحبل المسحوب</small><b id="s3L">0.0 m</b></div></div></div>
  <div class="side"><div class="card" id="s3card"></div>
   ${vcard('nation','«المحّالة» في تراثنا',`<p>استعمل أجدادنا في الجزيرة العربية بكرة تُثبَّت فوق البئر يسمونها «المحّالة»، يمر عليها حبل الدلو؛ فتغيّر اتجاه القوة، فيسحب الرجل الحبل إلى أسفل أو يمشي مبتعدًا ليرتفع الدلو إلى أعلى.</p>`)}</div></div>`,
 init(){const cv=$('#s3c'),c=cv.getContext('2d'),W=720,H=380;let m=1,h=0,pulling=false,seen={},solved={};
  $('#s3m').onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;m=+b.dataset.m;h=0;$$('#s3m button').forEach(x=>x.classList.toggle('on',x===b));G.tick();card();};
  $('#s3r').onclick=()=>{h=0;};const pb=$('#s3pull');
  pb.addEventListener('pointerdown',e=>{e.preventDefault();pulling=true;});['pointerup','pointerleave','pointercancel'].forEach(t=>pb.addEventListener(t,()=>pulling=false));pb.addEventListener('contextmenu',e=>e.preventDefault());
  function card(){const el=$('#s3card'),F=m===1?100:50,ma=100/F;
   el.innerHTML=`<h3>${m===1?'نظام البكرة الواحدة':'نظام البكرات'}</h3><ul class="tasks plain">${m===1?'<li>تقوم البكرة الواحدة بتغيير اتجاه القوة وليس مقدارها.</li><li>القوة الناتجة = القوة المبذولة.</li>':'<li>يغيّر اتجاه القوة ومقدارها.</li><li>القوة الناتجة أكبر من القوة المبذولة.</li>'}</ul>
    <p class="q mt">احسب الفائدة الآلية لهذا النظام:</p><form class="answer" id="s3f" autocomplete="off"><label><input id="s3a" inputmode="decimal" aria-label="الفائدة الآلية"><span class="unit">بدون وحدة</span></label><button class="btn" type="submit">تحقق</button></form><div id="s3fb"></div>`;
   if(solved[m])say($('#s3fb'),'ok',`الفائدة الآلية = 100 ÷ ${F} = ${ma}.`);
   $('#s3f').onsubmit=e=>{e.preventDefault();if(solved[m])return;const v=parseNum($('#s3a').value);if(isNaN(v))return;
    if(Math.abs(v-ma)<.01){solved[m]=1;G.good();G.add(8,'s3');say($('#s3fb'),'ok',`صحيح: الفائدة الآلية = القوة الناتجة ÷ القوة المبذولة = 100 ÷ ${F} = ${ma}.${m===2?' لاحظ أنك سحبت ضعف طول الحبل!':''}`);if(solved[1]&&solved[2]&&seen[1]&&seen[2])G.complete('s3');}
    else{G.bad();say($('#s3fb'),'bad','اقسم القوة الناتجة (100 نيوتن) على القوة المبذولة الظاهرة في العدّاد.');}};}
  let last=performance.now();
  function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(G.cur==='s3'&&!G.paused){if(pulling&&h<2.5){h=Math.min(2.5,h+dt*.8);if(Math.random()<.2)SFX.tick();}if(h>=1.5){seen[m]=1;if(solved[1]&&solved[2]&&seen[1]&&seen[2])G.complete('s3');}}
   c.fillStyle='#eef4f6';c.fillRect(0,0,W,H);c.fillStyle='#5b6870';c.fillRect(120,20,480,14);c.fillStyle='#b9c4c9';c.fillRect(0,340,W,40);
   const sc=100,F=m===1?100:50,L=h*(m===1?1:2);const by=330-h*sc;
   if(m===1){const px=360;c.fillStyle='#5b6870';c.fillRect(px-4,34,8,26);c.strokeStyle='#333';c.lineWidth=6;c.beginPath();c.arc(px,74,30,0,7);c.stroke();c.fillStyle='#888';c.beginPath();c.arc(px,74,6,0,7);c.fill();
    c.strokeStyle='#8a5a2b';c.lineWidth=4;c.beginPath();c.moveTo(px-30,74);c.lineTo(px-30,by-60);c.moveTo(px+30,74);c.lineTo(px+30,200+L*sc);c.stroke();
    c.fillStyle='#c97c06';c.fillRect(px-70,by-60,80,60);arrow(c,px+30,210+L*sc,px+30,270+L*sc,'#d9483b',7);T(c,'المبذولة '+F+' نيوتن',px+110,250+Math.min(L*sc,60),'#d9483b');}
   else{const fx=440,mx=300,my=by-80;c.fillStyle='#5b6870';c.fillRect(fx-4,34,8,26);c.strokeStyle='#333';c.lineWidth=6;c.beginPath();c.arc(fx,74,30,0,7);c.stroke();c.beginPath();c.arc(mx,my,30,0,7);c.stroke();
    c.strokeStyle='#8a5a2b';c.lineWidth=4;c.beginPath();c.moveTo(mx-30,34);c.lineTo(mx-30,my);c.moveTo(mx+30,my);c.lineTo(fx-30,74);c.moveTo(fx+30,74);c.lineTo(fx+30,200+L*sc*.5);c.stroke();
    c.strokeStyle='#5b6870';c.beginPath();c.moveTo(mx,my+30);c.lineTo(mx,by-60);c.stroke();c.fillStyle='#c97c06';c.fillRect(mx-40,by-60,80,60);arrow(c,fx+30,210+L*sc*.5,fx+30,270+L*sc*.5,'#d9483b',7);T(c,'المبذولة '+F+' نيوتن',fx+110,250+Math.min(L*sc*.5,60),'#d9483b');}
   T(c,'100 نيوتن',m===1?330:300,by-26,'#fff','800 18px "Baloo Bhaijaan 2"');
   $('#s3F').textContent=F+' N';$('#s3h').textContent=fmt(h,1)+' m';$('#s3L').textContent=fmt(L,1)+' m';requestAnimationFrame(frame);}
  card();requestAnimationFrame(frame);this.reset=()=>{h=0;seen={};solved={};card();};},
 quiz:[{q:'البكرة الواحدة الثابتة:',o:['تغيّر اتجاه القوة وليس مقدارها','تضاعف القوة','تقلل المسافة','ليس لها فائدة'],a:0},{q:'الفائدة الآلية لنظام بكرات يرفع 100 نيوتن بقوة مبذولة 50 نيوتن:',o:['50','2','150','0.5'],a:1,cols:true}],
 explain:'<p><b>البكرة</b> عجلة بها تجويف في وسط إطارها يمر خلاله حبل.</p><p><b>البكرة الواحدة</b> تغيّر اتجاه القوة وليس مقدارها: القوة الناتجة = القوة المبذولة، والفائدة الآلية = 1.</p><p><b>نظام البكرات</b> يغيّر اتجاه القوة ومقدارها: القوة الناتجة أكبر من المبذولة، والفائدة الآلية أكبر من 1، لكنك تسحب الحبل مسافة أطول.</p>'});

/* ================= S4: levers ================= */
const LV3=[{n:'النوع الأول',d:'نقطة الارتكاز بين القوة المبذولة والقوة الناتجة',ord:['e','f','l']},{n:'النوع الثاني',d:'القوة الناتجة بين القوة المبذولة ونقطة الارتكاز',ord:['e','l','f']},{n:'النوع الثالث',d:'القوة المبذولة بين القوة الناتجة ونقطة الارتكاز',ord:['l','e','f']}];
def('s4',{n:'5 · الروافع',eyebrow:'المحطة 5',title:'ورشة الروافع: أنواعها الثلاثة',goal:'الرافعة قضيب يرتكز على نقطة ثابتة تسمى نقطة الارتكاز. تنقسم إلى ثلاثة أنواع بحسب مواضع القوة المبذولة والقوة الناتجة ونقطة الارتكاز.',plan:6,core:1,
 icon:'<path d="M6 34l68-12" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M34 30l-10 22h20z" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="s4svg" viewBox="0 0 640 300" aria-label="رافعة"></svg>
   <div class="sim-bar"><span class="seg" id="s4t">${LV3.map((x,i)=>`<button type="button" data-i="${i}" class="${i===0?'on':''}">${x.n}</button>`).join('')}</span></div></div>
  <div class="side"><div class="card"><h3 id="s4n"></h3><p class="lead" id="s4d"></p><p class="step-text muted">الرمز: <b style="color:#1f6fd1">ق م</b> القوة المبذولة · <b style="color:#d9483b">ق ن</b> القوة الناتجة · المثلث نقطة الارتكاز.</p><p class="step-text">تعمل الروافع على زيادة القوة أو زيادة المسافة التي تؤثر خلالها القوة.</p></div>
   <div class="card"><h3>ما نوع الآلة في الصورة؟</h3><div id="s4q"></div></div></div></div>
  <div class="card"><div class="nb-head"><h2>صنّف الروافع</h2><span>أمثلة من الحياة</span></div><div id="s4sort"></div></div>`,
 init(){let ti=0;const svg=$('#s4svg');
  function draw(){const L=LV3[ti],xs=[110,320,530],pos={};L.ord.forEach((k,i)=>pos[k]=xs[i]);const by=170;
   let s=`<rect width="640" height="300" fill="var(--surface)"/><rect x="60" y="${by-8}" width="520" height="16" rx="6" fill="#0b6884"/>`;
   s+=`<path d="M${pos.f} ${by+8} l-30 52 h60z" fill="#7b3fa0"/><text x="${pos.f}" y="${by+86}" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="16" fill="var(--ink)">نقطة الارتكاز</text>`;
   s+=`<line x1="${pos.e}" y1="${by-100}" x2="${pos.e}" y2="${by-20}" stroke="#1f6fd1" stroke-width="8"/><path d="M${pos.e} ${by-8} l-14 -22 h28z" fill="#1f6fd1"/><text x="${pos.e}" y="${by-110}" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="16" fill="#1f6fd1">القوة المبذولة</text>`;
   const up=ti!==0?false:true;s+=`<rect x="${pos.l-30}" y="${by-62}" width="60" height="54" fill="#c97c06" stroke="#7a4a00" stroke-width="2"/><line x1="${pos.l}" y1="${by-70}" x2="${pos.l}" y2="${by-130}" stroke="#d9483b" stroke-width="8"/><path d="M${pos.l} ${by-142} l-14 22 h28z" fill="#d9483b"/><text x="${pos.l}" y="${by-150}" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="16" fill="#d9483b">القوة الناتجة</text>`;
   svg.innerHTML=s;$('#s4n').textContent=L.n;$('#s4d').textContent='إذا كانت '+L.d+'.';}
  $('#s4t').onclick=e=>{const b=e.target.closest('[data-i]');if(!b)return;ti=+b.dataset.i;$$('#s4t button').forEach(x=>x.classList.toggle('on',x===b));G.tick();draw();};draw();
  let qa=false,sa=false;
  mcq($('#s4q'),{q:'ملقط: نقطة ارتكازه عند طرفه، والجهد (القوة المبذولة) في منتصفه، والحِمل عند طرفه الآخر. ما نوع هذه الآلة؟',fig:'<div class="mini-scene"><svg viewBox="0 0 300 120"><path d="M30 20 L270 40 M30 20 L270 80" stroke="#6f8c99" stroke-width="6" stroke-linecap="round" fill="none"/><circle cx="30" cy="20" r="8" fill="#7b3fa0"/><path d="M150 4v22M150 76V54" stroke="#1f6fd1" stroke-width="5"/><path d="M150 28l-6-9h12zM150 52l-6 9h12z" fill="#1f6fd1"/><text x="30" y="52" font-size="12" fill="var(--ink)" text-anchor="middle">الارتكاز</text><text x="150" y="112" font-size="12" fill="#1f6fd1" text-anchor="middle">الجهد</text><text x="270" y="112" font-size="12" fill="#d9483b" text-anchor="middle">الحِمل</text></svg></div>',o:['العجلة والمحور','الأسفين','المستوى المائل','الروافع (النوع الثالث)'],a:3,why:'القوة المبذولة بين نقطة الارتكاز والقوة الناتجة: رافعة من النوع الثالث.'},'s4',()=>{qa=true;if(sa)G.complete('s4');});
  const doSort=()=>sortGame($('#s4sort'),{bins:['النوع الأول','النوع الثاني','النوع الثالث'],items:[['الأرجوحة (الميزان ذو الكفتين)',0],['المقص',0],['مفك يفتح علبة الدهان',0],['كسّارة البندق',1],['فتّاحة الزجاجات',1],['عربة اليد',1],['مضرب الهوكي',2],['الساعد (الذراع)',2],['ملقط الطعام',2]],hint:'حدّد ما الذي يقع في المنتصف: نقطة الارتكاز (الأول)، أم الحِمل (الثاني)، أم الجهد (الثالث)؟'},'s4',()=>{sa=true;if(qa)G.complete('s4');});
  doSort();this.reset=()=>{sa=false;doSort();};},
 quiz:[{q:'في رافعة النوع الأول تكون نقطة الارتكاز:',o:['بين القوة المبذولة والقوة الناتجة','عند طرف الرافعة دائمًا','بين الحمل والطرف','لا توجد نقطة ارتكاز'],a:0},{q:'عربة اليد رافعة من النوع:',o:['الأول','الثاني','الثالث','ليست رافعة'],a:1,cols:true}],
 explain:'<p><b>الرافعة (العتلة)</b> قضيب أو لوح يرتكز على نقطة ثابتة تسمى نقطة الارتكاز، وتعمل على زيادة القوة أو زيادة المسافة التي تؤثر خلالها القوة.</p><ul><li><b>النوع الأول:</b> نقطة الارتكاز في المنتصف (الأرجوحة، المقص، المفك مع علبة الدهان).</li><li><b>النوع الثاني:</b> القوة الناتجة في المنتصف (كسارة البندق، فتاحة الزجاجات، عربة اليد).</li><li><b>النوع الثالث:</b> القوة المبذولة في المنتصف (مضرب الهوكي، الساعد، الملقط).</li></ul>'});

/* ================= S5: inclined plane, wedge, screw, wheel & axle ================= */
def('s5',{n:'6 · المستوى المائل وأقرباؤه',eyebrow:'المحطة 6',title:'المستوى المائل والأسفين والبرغي والعجلة والمحور',goal:'غيّر طول السطح المائل وارتفاعه، وراقب الفائدة الآلية والقوة اللازمة. ثم تعرّف أقرباء المستوى المائل.',plan:5,core:1,
 icon:'<path d="M6 66L74 22V66z" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><canvas id="s5c" width="720" height="300" aria-label="سطح مائل"></canvas>
   <div class="ctrl"><label>طول السطح المائل: <b id="s5Lv">6</b> م</label><input type="range" id="s5L" min="2" max="10" value="6"><label>الارتفاع: <b id="s5hv">2</b> م</label><input type="range" id="s5h" min="1" max="2" step=".5" value="2"></div>
   <div class="readouts pad"><div class="ro"><small>الفائدة الآلية</small><b id="s5ma">؟</b></div><div class="ro"><small>القوة اللازمة لصندوق يحتاج 600 نيوتن رفعًا مباشرًا</small><b id="s5F">؟</b></div></div></div>
  <div class="side"><div class="card"><h3>الفائدة الآلية للمستوى المائل</h3><p class="eq">الفائدة الآلية = طول السطح المائل ÷ ارتفاعه</p><p class="step-text">فائدته: يقلل القوة المبذولة، ويغيّر اتجاه القوة. <span class="hypo">القوى هنا مثالية دون احتكاك</span></p><div id="s5card"></div></div>
   <div class="card"><h3>العجلة والمحور</h3><p class="eq">الفائدة الآلية = نصف قطر العجلة ÷ نصف قطر المحور</p><p class="step-text">يتكون من جسمين مثبتين معًا يدوران حول المحور نفسه؛ الأكبر العجلة والأصغر المحور. الفائدة الآلية أكبر من 1 دائمًا.</p><div id="s5w"></div></div></div></div>
  <div class="three"><div class="card"><h3>الأسفين</h3><p class="step-text">سطح مائل متحرك له وجه أو وجهان مائلان، ويغيّر اتجاه القوة المبذولة. أمثلة: الفأس، والسكين، والمجرفة، وبرّاية القلم. <b>أسنانك الأمامية أسافين!</b></p></div>
   ${vcard('nation','طريق الهدا: برغي على جبل',`<p>البرغي سطح مائل ملتف حول عمود. وعند الصعود إلى قمة جبل عالٍ نسلك الطريق الملتف حوله لأنه أقل انحدارًا، كطريق <b>الهدا</b> المتعرّج في جبال <b>الطائف</b>؛ فتزيد المسافة وتقل القوة اللازمة.</p>`)}
   ${vcard('life','الأهرامات',`<p>يعتقد علماء الآثار أن قدماء المصريين استعملوا السطوح المائلة لبناء الأهرامات.</p>`)}</div>`,
 init(){const cv=$('#s5c'),c=cv.getContext('2d'),W=720,H=300;const Ls=$('#s5L'),Hs=$('#s5h');let ok=false,tries=0,wok=false;
  function draw(){const L=+Ls.value,h=+Hs.value,sc=60,base=Math.sqrt(Math.max(0,L*L-h*h));$('#s5Lv').textContent=L;$('#s5hv').textContent=h;
   c.fillStyle='#eef4f6';c.fillRect(0,0,W,H);c.fillStyle='#b9c4c9';c.fillRect(0,260,W,40);const x0=640-base*sc,y0=260,x1=640,y1=260-h*sc;
   c.fillStyle='#8b6b4a';c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.lineTo(x1,y0);c.fill();c.fillStyle='#5b6870';c.fillRect(x1,y1,60,y0-y1);
   const ang=Math.atan2(y1-y0,x1-x0),mx=(x0+x1)/2,my=(y0+y1)/2;c.save();c.translate(mx,my);c.rotate(ang);c.fillStyle='#c97c06';c.fillRect(-28,-50,56,50);c.restore();
   T(c,'الطول '+L+' م',mx-30,my-70,'#14222b');T(c,'الارتفاع '+h+' م',x1+30,(y0+y1)/2+90<H?(y0+y1)/2:y0-10,'#fff','700 13px "IBM Plex Sans Arabic"');
   if(ok){$('#s5ma').textContent=fmt(L/h,2);$('#s5F').textContent=Math.round(600/(L/h))+' نيوتن';}else{$('#s5ma').textContent='؟';$('#s5F').textContent='؟';}}
  function card(){$('#s5card').innerHTML=`<p class="step-text">احسب الفائدة الآلية لهذا السطح:</p><form class="answer" id="s5f" autocomplete="off"><label><input id="s5a" inputmode="decimal" aria-label="الفائدة الآلية"><span class="unit">بدون وحدة</span></label><button class="btn" type="submit">تحقق</button></form><div id="s5fb"></div>`;
   $('#s5f').onsubmit=e=>{e.preventDefault();if(ok)return;const v=parseNum($('#s5a').value);if(isNaN(v))return;const ma=+Ls.value/+Hs.value;
    if(Math.abs(v-ma)<.02){ok=true;G.good();G.add(tries?4:8,'s5');draw();say($('#s5fb'),'ok',`صحيح: ${Ls.value} ÷ ${Hs.value} = ${fmt(ma,2)}. حرّك المنزلقين: كلما طال السطح قلّت القوة اللازمة.`);if(wok)G.complete('s5');}
    else{tries++;G.bad();say($('#s5fb'),'bad','اقسم الطول على الارتفاع.');}};}
  Ls.oninput=Hs.oninput=()=>{if(+Ls.value<+Hs.value)Ls.value=Math.ceil(+Hs.value);draw();};
  draw();card();
  mcq($('#s5w'),{q:'لماذا تكون الفائدة الآلية للعجلة والمحور أكبر من 1 دائمًا؟',o:['لأن نصف قطر العجلة أكبر من نصف قطر المحور','لأن المحور أكبر من العجلة','لأنها لا تغيّر اتجاه القوة','لأن ليس لها وحدة'],a:0,why:'الفائدة الآلية = نصف قطر العجلة ÷ نصف قطر المحور، والعجلة هي الجزء الأكبر.'},'s5',()=>{wok=true;if(ok)G.complete('s5');});
  this.reset=()=>{ok=false;tries=0;draw();card();};},
 quiz:[{q:'سطح منحدر يمكّنك من رفع جسم ثقيل بقوة أقل:',o:['البرغي','المستوى المائل','البكرة','الرافعة'],a:1},{q:'البرغي عبارة عن:',o:['رافعة من النوع الأول','سطح مائل ملتف حول عمود شبه أسطواني','عجلة ومحور','بكرة متحركة'],a:1}],
 explain:'<p><b>المستوى المائل</b> سطح منحدر يمكّنك من رفع جسم ثقيل بقوة أقل؛ الفائدة الآلية = الطول ÷ الارتفاع. يقلل القوة المبذولة ويغيّر اتجاهها.</p><p><b>الأسفين</b> سطح مائل متحرك له وجه أو وجهان مائلان. <b>البرغي</b> سطح مائل ملتف حول عمود. وكلاهما يغيّر اتجاه القوة المبذولة.</p><p><b>العجلة والمحور</b>: الفائدة الآلية = نصف قطر العجلة ÷ نصف قطر المحور، وهي أكبر من 1 دائمًا.</p>'});

/* ================= S6: problems ================= */
def('s6',{n:'7 · مختبر المسائل',eyebrow:'المحطة 7 · تطبيق الرياضيات',title:'مختبر المسائل: اختر مستواك',goal:'ثلاثة مستويات تناسب الجميع. استعن بأزرار المساعدة عند الحاجة.',plan:4,core:1,
 icon:'<rect x="10" y="10" width="60" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30h12M30 24v12M46 30h12M24 52h12M46 48h12M46 56h12" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
 body:'<div class="card" id="s6lv"></div>',
 init(){const L1=[
   ,
   {tag:'نظام البكرات',p:'نظام بكرات يرفع حملًا مقداره 100 نيوتن بقوة مبذولة مقدارها 50 نيوتن. احسب الفائدة الآلية.',v:2,unit:'',given:'القوة الناتجة = 100 نيوتن ، القوة المبذولة = 50 نيوتن',law:'الفائدة الآلية = الناتجة ÷ المبذولة',sol:'100 ÷ 50 = 2'}];
  const L2=[
   ,
   {tag:'البكرة الواحدة',p:'بكرة واحدة ترفع حملًا مقداره 100 نيوتن بقوة مبذولة مقدارها 100 نيوتن. احسب الفائدة الآلية.',v:1,unit:'',given:'القوة الناتجة = 100 نيوتن ، القوة المبذولة = 100 نيوتن',law:'الفائدة الآلية = الناتجة ÷ المبذولة',sol:'100 ÷ 100 = 1؛ فالبكرة الواحدة تغيّر اتجاه القوة فقط.'},
   {tag:'العوامل',q:'كلما زادت القوة مع ثبات الإزاحة، فإن الشغل:',o:['يزداد (علاقة طردية)','يقل (علاقة عكسية)','لا يتغير','يصبح صفرًا'],a:0}];
  const L3=[
   {tag:'تفكير ناقد',q:'ما مقدار الشغل الذي يبذله الرجل على الجدار دون أن يحركه؟',o:['يعتمد على قوته','صفر؛ لأن الجدار لم يتحرك','1 جول','كبير جدًا لأنه تعب'],a:1},
   {tag:'قارن',q:'سطحان مائلان لهما الارتفاع نفسه: طول الأول 4 م والثاني 8 م. أيهما يحتاج إلى قوة أقل لدفع الصندوق نفسه؟',o:['الأول؛ لأنه أقصر','الثاني؛ لأن فائدته الآلية أكبر','متساويان','لا يمكن المقارنة'],a:1,why:'الفائدة الآلية = الطول ÷ الارتفاع، فالأطول فائدته أكبر وقوته أقل، لكنك تدفع مسافة أطول.'},
   {tag:'حلّل',q:'لماذا يُعدّ نظام البكرات آلة مركبة بينما البكرة الواحدة آلة بسيطة؟',o:['لأن نظام البكرات يتكون من أكثر من بكرة (مجموعة آلات بسيطة)','لأن نظام البكرات أثقل','لأن البكرة الواحدة لا تغيّر الاتجاه','لا فرق بينهما'],a:0},
   {tag:'الأسفين في الطبيعة',q:'أسنان الحيوانات آكلة اللحوم حادة تمكّنها من تمزيق اللحوم. هذه الأسنان تعمل عمل:',o:['البكرة','الأسفين','العجلة والمحور','الرافعة من النوع الثاني'],a:1,why:'الأسنان الحادة لها شكل أسافين.'}];
  STN.s6.lv=levels($('#s6lv'),[L1,L2,L3],'s6',()=>G.complete('s6'));},
 reset(){STN.s6.lv&&STN.s6.lv.reset();},refresh(){STN.s6.lv&&STN.s6.lv.refresh();},
 explain:'<p>مستويات تراعي الفروق الفردية: تطبيق مباشر لقانون الشغل والفائدة الآلية، ثم مسائل بخطوتين أو حساب عكسي، ثم تحليل ومقارنة.</p>'});

/* ================= S7: competitions ================= */
const RQ=[{q:'وحدة قياس الشغل:',o:['جول','نيوتن','باسكال','متر'],a:0},{q:'العاملان المؤثران في الشغل:',o:['القوة والإزاحة','المسافة والزمن','السرعة والتسارع','الكتلة والتسارع'],a:0},
 {q:'دفعت جدارًا ولم يتحرك. الشغل:',o:['كبير','صفر','100 جول','يعتمد على الزمن'],a:1},{q:'قوة 20 N حركت جسمًا 3 m في اتجاهها. الشغل:',o:['23 J','60 J','6.7 J','17 J'],a:1},
 {q:'آلة تتطلب حركة واحدة فقط:',o:['آلة مركبة','آلة بسيطة','محرك','دراجة'],a:1},{q:'الدراجة آلة:',o:['بسيطة','مركبة','ليست آلة','رافعة فقط'],a:1},
 {q:'البكرة الواحدة تغيّر:',o:['مقدار القوة فقط','اتجاه القوة فقط','الكتلة','الشغل'],a:1},{q:'كسّارة البندق رافعة من النوع:',o:['الأول','الثاني','الثالث','ليست رافعة'],a:1},
 {q:'الملقط رافعة من النوع:',o:['الأول','الثاني','الثالث','الرابع'],a:2},{q:'المقص رافعة من النوع:',o:['الأول','الثاني','الثالث','ليست رافعة'],a:0},
 {q:'الفائدة الآلية لسطح مائل طوله 9 م وارتفاعه 3 م:',o:['27','3','6','12'],a:1},{q:'الفأس مثال على:',o:['البرغي','الأسفين','البكرة','العجلة والمحور'],a:1}];
const ART=`<rect width="600" height="360" fill="#eaf6fb"/><rect y="300" width="600" height="60" fill="#b9c4c9"/>
 <circle cx="160" cy="250" r="70" fill="none" stroke="#14222b" stroke-width="10"/><circle cx="440" cy="250" r="70" fill="none" stroke="#14222b" stroke-width="10"/>
 <g stroke="#9aa5ab" stroke-width="3">${[0,30,60,90,120,150].map(a=>`<line x1="${160+70*Math.cos(a*Math.PI/180)}" y1="${250+70*Math.sin(a*Math.PI/180)}" x2="${160-70*Math.cos(a*Math.PI/180)}" y2="${250-70*Math.sin(a*Math.PI/180)}"/><line x1="${440+70*Math.cos(a*Math.PI/180)}" y1="${250+70*Math.sin(a*Math.PI/180)}" x2="${440-70*Math.cos(a*Math.PI/180)}" y2="${250-70*Math.sin(a*Math.PI/180)}"/>`).join('')}</g>
 <path d="M160 250 L280 250 L380 140 L240 140 Z M280 250 L440 250 L380 140" fill="none" stroke="#d9483b" stroke-width="12" stroke-linejoin="round"/><path d="M240 140 L225 110 M205 110 h44" stroke="#14222b" stroke-width="10" stroke-linecap="round"/>
 <path d="M380 140 L400 95 M380 95 h50" stroke="#14222b" stroke-width="10" stroke-linecap="round"/><circle cx="280" cy="250" r="20" fill="none" stroke="#14222b" stroke-width="6"/><path d="M280 250 l18 30 M270 280 h30" stroke="#14222b" stroke-width="6"/>`;
def('s7',{n:'المسابقات (إثرائي)',eyebrow:'إثرائي · تنافس المجموعات',title:'ساحة البنّائين',goal:'مسابقتان: «بناء الهرم» حيث تضيف كل إجابة صحيحة حجرًا لهرم مجموعتك، و«الصورة المخفية» حيث تكشف كل إجابة جزءًا من آلة غامضة.',plan:4,
 icon:'<path d="M40 8L74 70H6z" fill="currentColor"/><path d="M22 42h36M14 56h52" stroke="#fff" stroke-width="3"/>',
 body:`<div class="card"><div class="nb-head"><h2>🔺 بناء الهرم</h2><span>كل إجابة صحيحة = حجر جديد يُدفع على السطح المائل</span></div><div id="s7race"></div></div>
  <div class="card"><div class="nb-head"><h2>🧩 الصورة المخفية</h2><span>خمّن الآلة بأقل عدد من المربعات المكشوفة</span></div><div id="s7pz"></div></div>
  ${vcard('islam','كالبنيان يشد بعضه بعضًا',`<p>قال رسول الله ﷺ: «المؤمنُ للمؤمنِ كالبُنيانِ، يشدُّ بعضُه بعضًا» <span class="ref">[متفق عليه]</span>. ابنوا هرم مجموعتكم بالتعاون.</p>`)}`,
 init(){STN.s7.r=race($('#s7race'),{theme:'pyramid',title:'بناء الهرم',qs:RQ,how:'تتناوب المجموعات على الإجابة. أول مجموعة تكمل هرمها تفوز. لكل مجموعة وسيلة «حذف إجابتين» مرة واحدة.',rule:'الإجابة الصحيحة = حجر جديد في هرمك',winSub:'اكتمل هرمكم أولًا!'},'s7');
  STN.s7.p=puzzle($('#s7pz'),{art:ART,qs:[
   {q:'الآلة البسيطة التي تتكون من جسمين يدوران حول المحور نفسه:',o:['العجلة والمحور','الأسفين','البرغي','المستوى المائل'],a:0},
   {q:'الآلة التي تتكون من مجموعة آلات بسيطة تسمى:',o:['بسيطة','مركبة','رافعة','بكرة'],a:1},
   {q:'الفائدة الآلية ليس لها وحدة لأنها:',o:['صغيرة','نسبة بين قوتين','تقاس بالجول','تقاس بالمتر'],a:1},
   {q:'التروس والسلسلة تنقل الحركة من الدواسة إلى العجلة. الدواسة مع محورها مثال على:',o:['العجلة والمحور','الأسفين','البكرة','المستوى المائل'],a:0},
   {q:'مكابح اليد في كثير من الآلات تعمل كـ:',o:['رافعة','برغي','أسفين','مستوى مائل'],a:0},
   {q:'المسامير اللولبية التي تثبّت الأجزاء مثال على:',o:['البرغي','البكرة','الرافعة','العجلة'],a:0}],guess:'ما الآلة المخفية؟',o:['الدراجة','السيارة','الرافعة','المقص'],a:0,why:'الدراجة آلة مركبة تجمع العجلة والمحور والروافع والبراغي.'},'s7');},
 reset(){STN.s7.r.reset();STN.s7.p.reset();},
 explain:'<p>«بناء الهرم» يستحضر استعمال السطوح المائلة في البناء، و«الصورة المخفية» تكشف آلة مركبة تجمع آلات بسيطة عدة.</p>'});

/* ================= CHAPTER REVIEW pp74-75 ================= */
def('rev',{n:'مراجعة الفصل',eyebrow:'دليل مراجعة الفصل الثاني · كتاب الطالب ص 74–75',title:'مراجعة الفصل: الأسئلة والحلول',goal:'أسئلة مراجعة الفصل الثاني «الحركة والقوى والآلات البسيطة» مع الحلول النموذجية.',
 icon:'<rect x="14" y="8" width="52" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30l6 6 12-12M24 54l6 6 12-12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
 body:`<div class="card"><div class="nb-head"><h2>استخدام المفردات</h2><span>وضّح العلاقة بين كل مصطلحين</span></div><div id="rv1"></div></div>
  <div class="card"><div class="nb-head"><h2>تثبيت المفاهيم</h2><span>اختر الإجابة الصحيحة (11–16)</span></div><div class="prob-list" id="rv2"></div></div>
  <div class="card"><div class="nb-head"><h2>التفكير الناقد</h2><span>17–20 و24</span></div><div id="rv3"></div></div>
  <div class="card"><div class="nb-head"><h2>أنشطة تقويم الأداء</h2><span>21–22</span></div><div id="rv4"></div></div>
  <div class="card"><div class="nb-head"><h2>تطبيق الرياضيات</h2><span>25–27</span></div><div id="rv5"></div></div>`,
 init(){const S=K.solutions;
  S($('#rv1'),[
   {k:'1',q:'القصور الذاتي – القوة',a:[['العلاقة','القصور الذاتي مقاومة الجسم لإحداث تغيير في حالته الحركية؛ ولا تتغير الحالة الحركية للجسم إلا إذا أثرت فيه قوة محصلة. وكلما زاد القصور الذاتي (الكتلة) احتجنا إلى قوة أكبر لتغيير حركته.']]},
   {k:'2',q:'التسارع – السرعة',a:[['العلاقة','التسارع هو التغير في السرعة المتجهة مقسومًا على الزمن اللازم لهذا التغير: ت = (ع₂ − ع₁) ÷ ز.']]},
   {k:'3',q:'الرافعة – البكرة',a:[['العلاقة','كلتاهما آلة بسيطة تسهّل الشغل. الرافعة قضيب يرتكز على نقطة ارتكاز، والبكرة عجلة بها تجويف يمر خلاله حبل.']]},
   {k:'4',q:'القوة – الشغل',a:[['العلاقة','يُبذل الشغل عندما تحرّك القوة جسمًا في اتجاهها: ش = ق × ف؛ وكلما زادت القوة زاد الشغل.']]},
   {k:'5',q:'الشغل – الآلة البسيطة',a:[['العلاقة','الآلة البسيطة تسهّل بذل الشغل بتغيير مقدار القوة أو اتجاهها أو كليهما.']]},
   {k:'6',q:'قوانين نيوتن للحركة – القوة',a:[['العلاقة','قوانين نيوتن تصف العلاقة بين القوة المؤثرة في الجسم وحركته.']]},
   {k:'7',q:'الاحتكاك – القوة',a:[['العلاقة','الاحتكاك قوة ممانعة تنشأ بين سطوح الأجسام المتلامسة، وتعمل عكس اتجاه الحركة.']]},
   {k:'8',q:'القوة – الفائدة الآلية',a:[['العلاقة','الفائدة الآلية نسبة بين قوتين: القوة الناتجة ÷ القوة المبذولة، ولذلك ليس لها وحدة.']]},
   {k:'9',q:'السرعة المتوسطة – السرعة اللحظية',a:[['العلاقة','السرعة المتوسطة = المسافة الكلية ÷ الزمن الكلي، والسرعة اللحظية سرعة الجسم في لحظة معينة. وتتساويان عندما يتحرك الجسم بسرعة ثابتة.']]},
   {k:'10',q:'الآلة البسيطة – الآلة المركبة',a:[['العلاقة','الآلة البسيطة تتطلب حركة واحدة فقط، والآلة المركبة تتكون من مجموعة من الآلات البسيطة.']]}],'rev');
  const MQ=[
   {q:'11. أيّ مما يلي يقلل الاحتكاك؟',o:['السطوح الخشنة','السطوح الملساء','زيادة السرعة','زيادة مساحة السطح'],a:1,why:'كلما قلّت خشونة السطحين المتلامسين قلّ الاحتكاك.'},
   {q:'12. ماذا يحدث عندما تؤثر قوة محصلة في جسم؟',o:['يتسارع الجسم','يتحرك الجسم بسرعة ثابتة','يبقى الجسم في حالة سكون','تزداد قوة الاحتكاك'],a:0,why:'حسب القانون الثاني لنيوتن: القوة المحصلة تُكسب الجسم تسارعًا في اتجاهها.'},
   {q:'13. أي مما يلي مثال على الآلة البسيطة؟',o:['مضرب البيسبول','المقص','مفتاح العلب','السيارة'],a:0,why:'مضرب البيسبول رافعة واحدة (آلة بسيطة). أما المقص فيجمع رافعتين وحدّين قاطعين (أسفينين)، ومفتاح العلب والسيارة آلات مركبة.'},
   {q:'14. شاحنة كبيرة تصدم سيارة صغيرة. أي العبارات التالية صحيح؟',o:['القوة التي تؤثر بها الشاحنة في السيارة أكبر','القوة التي تؤثر بها السيارة في الشاحنة أكبر','القوتان متساويتان','ليس هناك قوى في هذه الحالة'],a:2,why:'القانون الثالث لنيوتن: قوتا الفعل ورد الفعل متساويتان في المقدار ومتعاكستان في الاتجاه؛ لكن السيارة الصغيرة يكون تسارعها أكبر لأن كتلتها أصغر.'},
   {q:'15. ما وحدة التسارع؟',o:['م/ث²','كجم.م/ث²','م/ث','نيوتن'],a:0,why:'التسارع = تغيّر السرعة (م/ث) ÷ الزمن (ث) = م/ث².'},
   {q:'16. أي مما يلي قوة؟',o:['القصور الذاتي','التسارع','السرعة','الاحتكاك'],a:3,why:'الاحتكاك قوة تقاس بالنيوتن؛ أما القصور الذاتي فخاصية، والتسارع والسرعة كميات تصف الحركة.'}];
  const box=$('#rv2');MQ.forEach(q=>{const d=document.createElement('div');d.className='prob';box.appendChild(d);K.mcq(d,q,'rev');});
  S($('#rv3'),[
   {k:'17',q:'إذا كان لدينا فريقان (أ) و(ب) يلعبان لعبة شد الحبل، وكان الفريق (أ) يشد نحو اليسار بقوة مقدارها 500 نيوتن ولم يتحرك الحبل (ر)، فهذا يعني أن الفريق (ب) يشد الحبل أيضًا بقوة مقدارها 500 نيوتن نحو اليمين. ما مقدار قوة الشد في الحبل (ر) إذا اعتبرنا أن كتلة الحبل مهملة؟',a:[['الإجابة','قوة الشد في الحبل = 500 نيوتن.'],['التفسير','الحبل ساكن فالقوى المؤثرة فيه متزنة (المحصلة = 500 − 500 = صفر)، وكل فريق يشد الحبل بقوة 500 نيوتن، فتنتقل هذه القوة خلال الحبل.']]},
   {k:'18 · علّل',q:'قد يحتاج قطار بضائع يسير بسرعة كبيرة إلى عدة كيلومترات ليتوقف بعد استعمال المكابح (الفرامل).',a:[['التعليل','كتلة قطار البضائع كبيرة جدًّا فقصوره الذاتي كبير. ومن القانون الثاني (ت = ق ÷ ك) تُكسبه قوة المكابح تسارعًا (تباطؤًا) صغيرًا، ومع سرعته الكبيرة يحتاج إلى زمن طويل ومسافة طويلة حتى تصبح سرعته صفرًا.']]},
   {k:'19 · القياس',q:'أي السرعات التالية أكبر: 20 م/ث، 200 سم/ث، 0.2 كم/ث؟ (إرشاد: عبّر عن جميع هذه السرعات بالأمتار لكل ثانية، ثم قارن.)',a:[['التحويل','20 م/ث تبقى 20 م/ث ، 200 سم/ث = 200 ÷ 100 = 2 م/ث ، 0.2 كم/ث = 0.2 × 1000 = 200 م/ث'],['الإجابة','أكبرها 0.2 كم/ث (200 م/ث).']]},
   {k:'20 · استنتج',q:'تسير سيارة في طريق منحنٍ بسرعة 50 كم/ساعة، وقراءة العداد ثابتة. هل القوى المؤثرة في السيارة متزنة أم غير متزنة؟',a:[['الإجابة','غير متزنة.'],['التفسير','مع أن مقدار السرعة ثابت، فإن اتجاه حركة السيارة يتغير في المنحنى؛ أي أن سرعتها المتجهة تتغير فهي تتسارع، ولا يحدث التسارع إلا بوجود قوة محصلة.']]},
   {k:'24 · فسّر',q:'طلب منك معلمك أنت وصديقك أن تسحبا نابضين متصلين بطرفي حبل أفقي، على هيئة لعبة شد الحبل، بحيث تختلف قوة النابضين. هل يمكن تحقيق ذلك؟ فسّر إجابتك.',a:[['الإجابة','لا يمكن (ما دام الحبل والنابضان ساكنين وكتلة الحبل مهملة).'],['التفسير','عندما تسحب طرف الحبل يسحبك الحبل بقوة مساوية ومعاكسة (القانون الثالث)، والقوة تنتقل خلال الحبل إلى الطرف الآخر؛ فيقرأ النابضان القراءة نفسها. ولو اختلفت القوتان لكانت هناك قوة محصلة تحرّك الحبل ومن عليه نحو القوة الأكبر.']]}],'rev');
  S($('#rv4'),[
   {k:'21 · عرض شفهي',q:'حضّر عرضًا، مع وسائل إيضاح، لتفسير أحد قوانين نيوتن للحركة، واشرحها لطلاب الصف الثالث الابتدائي.',a:[['إرشادات','اختر قانونًا واحدًا، وعبّر عنه بلغة بسيطة، واستعمل تجربة سهلة من الدرس: البطاقة والقطعة النقدية فوق الكأس للقانون الأول، أو دفع عربتين مختلفتين في الكتلة للقانون الثاني، أو سيارة البالون للقانون الثالث. اختم بمثال من حياتهم اليومية.']]},
   {k:'22 · اختراع',q:'صمّم آلة يدوية مركبة لبذل شغل محدد. بيّن الآلات البسيطة المستخدمة في تصميمك، وصِف العمل الذي تقوم به كل منها.',a:[['إرشادات','حدّد الشغل المطلوب أولًا، ثم اختر آلتين بسيطتين على الأقل وبيّن وظيفة كل منهما. مثال: عربة يد = رافعة من النوع الثاني ترفع الحمل بقوة أقل + عجلة ومحور تسهّلان النقل. أو بكرة ثابتة (تغيّر اتجاه القوة) مع سطح مائل (يقلل القوة اللازمة).']]}],'rev');
  S($('#rv5'),[
   {k:'25 · حساب الشغل',q:'احسب الشغل الذي تبذله قوة مقدارها 30 نيوتن تؤثر لمسافة 3 م.',a:[['المعطيات','ق = 30 نيوتن ، ف = 3 م'],['القانون','ش = ق × ف'],['الحل','ش = 30 × 3 = 90 جول']]},
   {k:'26 · القوة',q:'احسب القوة التي تؤثر بها محركات صاروخية في مكوك فضاء كتلته 2 مليون كجم، ويتحرك بتسارع 30 م/ث².',a:[['المعطيات','ك = 2 مليون كجم = 2000000 كجم ، ت = 30 م/ث²'],['القانون','ق = ك × ت'],['الحل','ق = 2000000 × 30 = 60000000 نيوتن (60 مليون نيوتن)']]},
   {k:'27 · السرعة والزمن',q:'يمثل الرسم البياني العلاقة بين المسافة والزمن لرحلة قام بها حسين على الدراجة. ما السرعة المتوسطة لحسين؟ ما الزمن الذي احتاج إليه ليقطع مسافة 25 كم؟',fig:'<div class="mini-scene"><svg viewBox="0 0 260 180"><path d="M30 10V150H250" fill="none" stroke="currentColor" style="color:var(--muted)" stroke-width="2"/>'+[1,2,3,4,5].map(k=>`<line x1="${30+k*40}" y1="10" x2="${30+k*40}" y2="150" stroke="var(--line)"/><text x="${30+k*40}" y="164" text-anchor="middle" font-size="10" fill="var(--ink)">${k}</text>`).join('')+[10,20,30,40,50].map(k=>`<line x1="30" y1="${150-k*2.8}" x2="230" y2="${150-k*2.8}" stroke="var(--line)"/><text x="24" y="${154-k*2.8}" text-anchor="end" font-size="10" fill="var(--ink)">${k}</text>`).join('')+'<path d="M30 150 L230 10" stroke="var(--accent)" stroke-width="3"/><text x="140" y="178" text-anchor="middle" font-size="10" fill="var(--muted)" direction="rtl">الزمن (ساعة)</text><text x="34" y="8" font-size="10" fill="var(--muted)" direction="rtl" text-anchor="end">المسافة (كم)</text></svg></div>',a:[['من الرسم','قطع حسين 50 كم في 5 ساعات (الخط مستقيم، أي أن سرعته ثابتة).'],['السرعة المتوسطة','ع = ف ÷ ز = 50 ÷ 5 = 10 كم/س'],['زمن قطع 25 كم','ز = ف ÷ ع = 25 ÷ 10 = 2.5 ساعة (ويمكن قراءتها من الرسم مباشرة).']]}],'rev');},
 explain:'<p>حلول نموذجية لأسئلة مراجعة الفصل الثاني (ص 74–75). يُفضّل أن يجيب الطلاب أولًا، ثم يكشف المعلم الحلول. السؤال 23 يعتمد على رسم بياني لم يظهر في الصورة المرسلة.</p>'});

/* ================= توجيه القراءة: بعد القراءة ================= */
def('after',{n:'توجيه القراءة: بعد القراءة',eyebrow:'ختام الفصل · بعد القراءة',title:'توجيه القراءة: بعد القراءة',goal:'سجّل رأيك في كل عبارة: م (موافق) أو غ (غير موافق)، ثم اكشف الإجابات بعد القراءة.',plan:3,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="card"><h3>توجيه القراءة وتركيزها · الكتاب صفحة 45 · خمس دقائق</h3><div id="afterAg"></div></div>',
 init(){anticip($('#afterAg'),[['تشير قراءة مقياس السرعة في السيارة إلى متوسط سرعة السيارة.',false,'عدّاد السرعة يقيس السرعة اللحظية.'],['إذا كان تسارع الجسم صفرًا فإن سرعته لا تتغير.',true],['إذا تغير مقدار السرعة دون تغير اتجاهها فإن السرعة المتجهة لم تتغير.',false,'السرعة المتجهة تتغير بتغير المقدار أو الاتجاه.'],['يمكن للجسم الذي تؤثر فيه قوى محصلتها صفر أن يكون متحركًا.',true,'يستمر في حركته بسرعة ثابتة وفي خط مستقيم (القانون الأول لنيوتن).'],['يعتمد تسارع الجسم على القوة المحصلة المؤثرة فيه فقط.',false,'يعتمد على القوة المحصلة وكتلة الجسم: ت = ق ÷ ك.'],['عندما تقفز إلى أعلى فإن الأرض تؤثر فيك بقوة إلى أعلى.',true,'تدفع الأرض بقدميك فتدفعك الأرض إلى أعلى (الفعل ورد الفعل).'],['أنت تبذل شغلًا عندما تدفع الحائط مع أن الحائط لا يتحرك.',false,'لا يُبذل شغل لأن الإزاحة صفر.'],['يعد المستوى المائل من الآلات البسيطة.',true],['في بعض الآلات يكون الشغل الناتج أكبر من الشغل المبذول.',false,'الشغل الناتج لا يكون أكبر من الشغل المبذول.']]);},enter(){G.complete('after');},reset(){STN['after'].init();},explain:'<p>دليل توقعات للفصل كله: يسجّل الطالب رأيه قبل القراءة، ويعود إليه بعد دراسة الدروس الثلاثة.</p>'});
/* ================= CHALLENGE ================= */
def('ch',{n:'تحدي العلماء',plan:2,icon:'<path d="M24 10h32v18a16 16 0 0 1-32 0z" fill="currentColor"/><path d="M24 16H12a10 10 0 0 0 12 14M56 16h12a10 10 0 0 1-12 14" fill="none" stroke="currentColor" stroke-width="5"/><path d="M40 44v14M28 70h24l-3-12H31z" fill="currentColor"/>',
 eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'ثمانية أسئلة متنوعة تقيس أهداف الدرس. لكل سؤال محاولتان.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'الشغل',q:'أي مما يلي من العوامل المؤثرة في الشغل؟',o:['القوة والإزاحة','المسافة والزمن','السرعة والتسارع','الكتلة والتسارع'],a:0},
  {k:'شرط الشغل',t:'multi',q:'اختر المواقف التي يُبذل فيها شغل على الجسم:',items:[['رفع حقيبة من الأرض إلى الطاولة',1],['دفع عربة تسوّق فتتحرك',1],['دفع حائط لا يتحرك',0],['حمل صندوق ثابت دون حركة',0]],why:'يُبذل الشغل عندما يتحرك الجسم في اتجاه القوة.'},
  {k:'احسب الشغل',t:'calc',p:'دفع طالب صندوقًا بقوة 40 نيوتن مسافة 5 م. ما الشغل المبذول؟',v:200,unit:'جول',given:'ق = 40 نيوتن ، ف = 5 م',law:'ش = ق × ف',sol:'ش = 40 × 5 = 200 جول'},
  {k:'الوحدة',q:'وحدة الشغل (الجول) تساوي:',o:['نيوتن × متر','نيوتن ÷ متر','كجم × متر','متر ÷ ثانية'],a:0},
  {k:'الآلات',q:'ما الآلة التي تغيّر اتجاه القوة وليس مقدارها؟',o:['البكرة الواحدة','نظام البكرات','عربة اليد','كسّارة البندق'],a:0},
  {k:'الفائدة الآلية',t:'calc',p:'آلة تؤثر بقوة ناتجة 900 نيوتن عندما نبذل عليها قوة 300 نيوتن. ما فائدتها الآلية؟',v:3,unit:'',given:'الناتجة = 900 نيوتن ، المبذولة = 300 نيوتن',law:'الفائدة الآلية = الناتجة ÷ المبذولة',sol:'900 ÷ 300 = 3'},
  {k:'الروافع',q:'في رافعة من النوع الثاني تقع القوة الناتجة:',o:['بين القوة المبذولة ونقطة الارتكاز','خارج الرافعة','عند نقطة الارتكاز','بين القوة الناتجة والمبذولة'],a:0},
  {k:'التفكير الناقد',q:'لماذا يصعد الناس الجبال العالية عبر طرق ملتفة حولها بدل الصعود المستقيم؟',o:['لأن الطريق الملتف أقصر','لأنه أقل انحدارًا فيحتاج إلى قوة أقل رغم أن المسافة أطول','لأنه يقلل الشغل إلى الصفر','لأن السيارات لا تصعد إلا في دوائر'],a:1,why:'الطريق الجبلي الملتف يشبه البرغي: سطح مائل ملتف يقلل القوة ويزيد المسافة.'}],'ch');},
 reset(){STN.ch.c.reset();},explain:'<p>أسئلة التحدي مأخوذة من تقييمات العرض، وتغطي أهداف الدرس الخمسة.</p>'});

K.boot({chapter:'الفصل الثاني: الحركة والقوى والآلات البسيطة',chapterShort:'الفصل الثاني',title:'ورشة الآلات',lesson:'الدرس الثالث: الشغل والآلات البسيطة',accent:'#a8323a',accentDark:'#f08a8f',hook:'كيف ترفع الثقيل بجهد قليل؟',
 riddle:'لتحميل عربة ثقيلة إلى صندوق سيارة: هل ترفعها مباشرة أم تدفعها على سطح مائل؟ أيهما يحتاج إلى قوة أقل؟',predict:{o:['الرفع المباشر يحتاج إلى قوة أقل','السطح المائل يحتاج إلى قوة أقل','تحتاج الطريقتان القوة نفسها'],a:1},
 answer:'السطح المائل يحتاج إلى قوة أقل، لكنك تدفع العربة مسافة أطول (طول السطح بدل الارتفاع). الآلات لا تقلل الشغل، لكنها تسهّله بتغيير مقدار القوة أو اتجاهها.',
 finalTitle:'مبارك! أصبحت مهندسًا للآلات البسيطة',goals:GOALS,
 concepts:[{n:'الشغل',t:'ش = ق × ف، ويُبذل عندما يتحرك الجسم في اتجاه القوة. وحدته الجول.',ic:'<rect x="10" y="16" width="20" height="20" fill="var(--amber)"/><path d="M34 26h14M42 20l6 6-6 6" fill="none" stroke="var(--accent)" stroke-width="4"/>'},
  {n:'الآلات',t:'بسيطة (حركة واحدة) أو مركبة (مجموعة آلات بسيطة).',ic:'<circle cx="26" cy="26" r="14" fill="none" stroke="var(--accent)" stroke-width="5" stroke-dasharray="7 4"/>'},
  {n:'الفائدة الآلية',t:'القوة الناتجة ÷ القوة المبذولة، وليس لها وحدة.',ic:'<path d="M10 26h32M26 12v6M26 34v6" stroke="var(--accent)" stroke-width="5"/>'},
  {n:'البكرات',t:'البكرة الواحدة تغيّر الاتجاه (فائدة 1)، ونظام البكرات يغيّر المقدار والاتجاه.',ic:'<circle cx="26" cy="16" r="10" fill="none" stroke="var(--accent)" stroke-width="4"/><path d="M16 16v28M36 16v18" stroke="var(--accent)" stroke-width="3"/>'},
  {n:'الروافع',t:'الأول: الارتكاز في المنتصف. الثاني: الحِمل في المنتصف. الثالث: الجهد في المنتصف.',ic:'<path d="M4 30l44-8" stroke="var(--accent)" stroke-width="5"/><path d="M26 28l-8 16h16z" fill="var(--amber)"/>'},
  {n:'المستوى المائل وأقرباؤه',t:'الفائدة = الطول ÷ الارتفاع. الأسفين والبرغي سطوح مائلة.',ic:'<path d="M4 44L48 14V44z" fill="var(--accent)"/>'}]});
})();

