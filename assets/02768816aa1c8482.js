
/* ===== الدرس الثاني: قوانين نيوتن للحركة ===== */
(function(){
const {$,$$,G,STN,def,mcq,calcQ,levels,flips,match,sortGame,tfRound,race,riddles,challenge,vcard,ayah,say,num,fmt,parseNum,SFX,css,anticip}=K;
function arrow(c,x1,y1,x2,y2,col,w,label,ly){c.strokeStyle=col;c.fillStyle=col;c.lineWidth=w||6;const a=Math.atan2(y2-y1,x2-x1),L=Math.hypot(x2-x1,y2-y1);if(L<2)return;
  c.beginPath();c.moveTo(x1,y1);c.lineTo(x2-Math.cos(a)*12,y2-Math.sin(a)*12);c.stroke();c.beginPath();c.moveTo(x2,y2);c.lineTo(x2-Math.cos(a-.45)*18,y2-Math.sin(a-.45)*18);c.lineTo(x2-Math.cos(a+.45)*18,y2-Math.sin(a+.45)*18);c.fill();
  if(label){c.font='700 15px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign='center';c.fillText(label,(x1+x2)/2,ly!=null?ly:(y1+y2)/2-12);c.direction='ltr';}}
const bg=(c,W,H,col)=>{c.fillStyle=col||css('--surface-2');c.fillRect(0,0,W,H);};

/* ================= INTRO: coin-card-cup ================= */
def('intro',{n:'الافتتاحية',plan:3,icon:'<rect x="10" y="30" width="60" height="6" fill="currentColor"/><circle cx="40" cy="24" r="8" fill="currentColor"/><path d="M24 40l4 34h24l4-34" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="hero"><div class="stage"><canvas id="hk" width="720" height="380" aria-label="قطعة نقدية على بطاقة فوق كأس"></canvas>
   <div class="sim-bar"><button class="btn" type="button" id="hkFast">اسحب البطاقة بسرعة ⚡</button><button class="btn alt" type="button" id="hkSlow">اسحبها ببطء 🐢</button><button class="tbtn" type="button" id="hkR">أعِد التجربة</button></div></div>
  <div><span class="eyebrow">تجربة مثيرة · القصور الذاتي</span><h2 class="hero-h">خدعة أم قانون؟</h2>
   <p class="riddle">وُضعت قطعة نقدية على بطاقة فوق فوهة كأس. ماذا يحدث للقطعة النقدية عندما نسحب البطاقة بسرعة؟ ولماذا لا تستطيع اللحاق بالبطاقة؟</p>
   <p class="q">توقّع قبل أن تجرّب:</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="two"><div class="story"><b>إسحاق نيوتن (1642–1727)</b> وصف العلاقة بين القوة والحركة في <b>ثلاثة قوانين</b>. في هذا الدرس ستكتشفها بنفسك، كما فعل العلماء: بالتجربة والملاحظة.</div><div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div></div>`,
 init(){const cv=$('#hk'),c=cv.getContext('2d'),W=720,H=380;let S;
  const reset=()=>{S={card:0,coinX:0,coinY:0,vy:0,mode:null,t:0,fall:false};draw();};
  function draw(){bg(c,W,H,'#e8f1f4');c.fillStyle='#c79a63';c.fillRect(0,330,W,50);c.fillStyle='#a87a45';c.fillRect(0,330,W,6);
   const cx=W/2,top=200;c.fillStyle='rgba(180,220,240,.45)';c.strokeStyle='#6f8c99';c.lineWidth=3;c.beginPath();c.moveTo(cx-70,top);c.lineTo(cx-52,330);c.lineTo(cx+52,330);c.lineTo(cx+70,top);c.closePath();c.fill();c.stroke();
   const kx=cx-120+S.card;c.fillStyle='#f4f1e8';c.strokeStyle='#b9b3a0';c.fillRect(kx,top-8,240,8);c.strokeRect(kx,top-8,240,8);
   const coinx=cx+S.coinX,coiny=top-16+S.coinY;c.fillStyle='#d4a017';c.beginPath();c.ellipse(coinx,coiny,26,8,0,0,7);c.fill();c.fillStyle='#b8860b';c.fillRect(coinx-26,coiny,52,6);c.beginPath();c.ellipse(coinx,coiny+6,26,8,0,0,Math.PI);c.fill();
   if(S.mode==='fast'&&S.t<.25)arrow(c,kx+250,top-4,kx+340,top-4,'#d9483b',6,'سحب سريع',top-24);
   if(S.done){c.font='800 24px "Baloo Bhaijaan 2"';c.direction='rtl';c.textAlign='center';c.fillStyle=S.mode==='fast'?'#1f7a45':'#c97c06';c.fillText(S.mode==='fast'?'سقطت القطعة النقدية في الكأس!':'تحركت القطعة النقدية مع البطاقة',cx,60);c.direction='ltr';}}
  let raf;function run(mode){reset();S.mode=mode;let last=performance.now();SFX.whoosh();
   const step=now=>{const dt=Math.min(.04,(now-last)/1000);last=now;S.t+=dt;
     if(mode==='fast'){S.card+=1600*dt;if(S.card>140)S.fall=true;}else{S.card+=90*dt;S.coinX=S.card;if(S.card>200){S.done=true;draw();return;}}
     if(S.fall){S.vy+=1800*dt;S.coinY=Math.min(126,S.coinY+S.vy*dt);if(S.coinY>=126){S.done=true;SFX.thud();draw();return;}}
     draw();raf=requestAnimationFrame(step);};cancelAnimationFrame(raf);raf=requestAnimationFrame(step);}
  $('#hkFast').onclick=()=>run('fast');$('#hkSlow').onclick=()=>run('slow');$('#hkR').onclick=reset;reset();}
});

/* ================= GOALS & TERMS ================= */
const GOALS=['تصف القوة وتمثّلها بالأسهم وتقيسها بوحدة النيوتن.','تحسب القوة المحصلة وتميّز القوى المتزنة من غير المتزنة.','تفسّر القانون الأول لنيوتن والقصور الذاتي والاحتكاك.','تطبّق القانون الثاني لنيوتن لحساب التسارع والقوة.','تفسّر قوتي الفعل ورد الفعل في القانون الثالث لنيوتن.'];
const TERMS=[
 {t:'القوة',d:'دفع أو سحب. رمزها (ق) ووحدتها النيوتن، وتغيّر شكل الجسم أو حجمه أو موضعه أو اتجاه حركته.',ic:'<path d="M4 20h26M24 12l8 8-8 8" fill="none" stroke="currentColor" stroke-width="4"/>'},
 {t:'القوة المحصلة',d:'قوة تعمل عمل عدة قوى؛ هي اتحاد جميع القوى المؤثرة في الجسم.',ic:'<path d="M4 12h18M4 28h18M26 20h10" stroke="currentColor" stroke-width="4"/>'},
 {t:'القوى المتزنة',d:'قوى تؤثر في جسم ولا تحرّكه؛ محصلتها صفر.',ic:'<path d="M20 20H4M20 20h16" stroke="currentColor" stroke-width="4"/><rect x="15" y="15" width="10" height="10" fill="currentColor"/>'},
 {t:'القوى غير المتزنة',d:'قوى محصلتها لا تساوي صفرًا، فتغيّر حركة الجسم.',ic:'<path d="M20 20H10M20 20h18" stroke="currentColor" stroke-width="4"/><rect x="15" y="15" width="10" height="10" fill="currentColor"/>'},
 {t:'القصور الذاتي',d:'مقاومة الجسم لإحداث تغيير في حالة حركته؛ ويزداد بزيادة الكتلة.',ic:'<rect x="8" y="14" width="24" height="16" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="14" cy="34" r="3" fill="currentColor"/><circle cx="28" cy="34" r="3" fill="currentColor"/>'},
 {t:'الاحتكاك',d:'قوة ممانعة تنشأ بين سطوح الأجسام المتلامسة، وتقاوم حركتها، وتعمل عكس اتجاه الحركة.',ic:'<path d="M4 30h32" stroke="currentColor" stroke-width="3"/><path d="M6 34l4-4M14 34l4-4M22 34l4-4M30 34l4-4" stroke="currentColor" stroke-width="2"/><rect x="12" y="14" width="16" height="16" fill="currentColor"/>'}];
def('goals',{n:'الأهداف والمصطلحات',eyebrow:'قبل أن ننطلق',title:'خريطة الرحلة: الأهداف والمصطلحات',goal:'تعرّف ما ستتعلمه اليوم، واقلب بطاقات المصطلحات، ثم طابق كل مصطلح بمعناه.',plan:3,
 icon:'<rect x="12" y="8" width="56" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 26h32M24 40h32M24 54h20" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
 body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><p class="src-note">صيغت الأهداف من محتوى عرض الدرس الثاني، لأن العرض لا يتضمن شريحة أهداف لهذا الدرس.</p></div>
  <div class="side">${vcard('islam','قوانين ثابتة بتقدير الخالق',`${ayah('إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ','القمر: 49')}<p class="mt">قوانين نيوتن تصف نظامًا دقيقًا ثابتًا في الكون؛ فالأجسام لا تتحرك عبثًا بل وفق سنن أودعها الله فيها.</p>`)}
   ${vcard('life','قوى من حولك',`<p>تفتح الباب (سحب)، وتدفع العربة (دفع)، ويلتصق المغناطيس بالثلاجة (جذب)، ويمنعك حذاؤك من الانزلاق (احتكاك).</p>`)}</div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المصطلحات</h2><span>المس البطاقة لترى التعريف</span></div><div id="g2flips"></div></div>
  <div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2><span>اختر المصطلح ثم تعريفه</span></div><div id="g2match"></div></div>`,
 init(){flips($('#g2flips'),TERMS);this.reset();},reset(){match($('#g2match'),TERMS.map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));},
 explain:'<p>الأهداف مصوغة من محتوى العرض: القوة وتمثيلها، والقوة المحصلة، والقوانين الثلاثة لنيوتن مع القصور الذاتي والاحتكاك.</p>'});

/* ================= S1: force & representation ================= */
const DIRS={r:[1,0,'اليمين'],l:[-1,0,'اليسار'],u:[0,-1,'الشمال (أعلى)'],d:[0,1,'الجنوب (أسفل)']};
const DRAW=[{f:10,d:'r',sc:1},{f:4,d:'u',sc:1},{f:6,d:'l',sc:1},{f:50,d:'r',sc:5}];
def('s1',{n:'1 · القوة وتمثيلها',eyebrow:'المحطة 1',title:'ورشة الأسهم: ما القوة؟ وكيف نرسمها؟',goal:'القوة دفع أو سحب، رمزها ق ووحدتها النيوتن. نمثّلها بسهم: طوله يدل على مقدارها، واتجاهه يدل على اتجاهها.',plan:4,core:1,
 icon:'<path d="M8 40h52M48 26l14 14-14 14" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
 body:`<div class="two"><div class="stage"><svg id="s1svg" viewBox="0 0 600 340" aria-label="شبكة لرسم سهم القوة"></svg>
   <div class="sim-bar"><span class="seg" id="s1dir"><button type="button" data-d="r" class="on">→ يمين</button><button type="button" data-d="l">← يسار</button><button type="button" data-d="u">↑ شمال</button><button type="button" data-d="d">↓ جنوب</button></span>
    <button class="tbtn" type="button" id="s1m">− مربع</button><b id="s1len" class="kbd-num">0</b><button class="tbtn" type="button" id="s1p">+ مربع</button><button class="btn" type="button" id="s1chk">تحقق من الرسم</button></div></div>
  <div class="side"><div class="card"><h3>المهمة <span class="cnt-badge" id="s1cnt"></span></h3><p class="lead" id="s1task"></p><p class="step-text muted" id="s1scale"></p><div id="s1fb"></div></div>
   <div class="card"><h3>خطوات الرسم</h3><ol class="tasks plain"><li>نختار مقياس رسم مناسبًا (مثلًا: كل مربع = 5 نيوتن).</li><li>نحسب عدد المربعات: المقدار ÷ المقياس.</li><li>نرسم سهمًا يشير إلى اتجاه القوة.</li></ol></div></div></div>
  <div class="card"><div class="nb-head"><h2>من أشكال القوة</h2><span>صنّف كل موقف</span></div><div id="s1sort"></div></div><div class="card"><h3>القوة والتسارع: صف حركة كرة السلة</h3><p class="step-text">أثناء تحليق الكرة تكون تحت تأثير قوة الجاذبية الأرضية، لذلك يكون تسارعها إلى أسفل؛ فتتناقص سرعتها حتى تصبح صفرًا عند قمة مسارها، ثم تغيّر اتجاه حركتها فتصبح السرعة باتجاه التسارع نفسه، فتتزايد سرعتها هابطة. وفي كل مرة تتغير سرعة جسم أو اتجاه حركته أو يتغيران معًا، فإن قوة ما تكون قد أثرت فيه.</p><div id="s4q3"></div></div>`,
 init(){let k=0,dir='r',len=0,tries=0;const svg=$('#s1svg'),CELL=24,CX=300,CY=170;
  function draw(){const t=DRAW[k];let s=`<rect width="600" height="340" fill="var(--surface)"/>`;for(let x=12;x<=588;x+=CELL)s+=`<line x1="${x}" y1="14" x2="${x}" y2="326" stroke="var(--line)"/>`;for(let y=14;y<=326;y+=CELL)s+=`<line x1="12" y1="${y}" x2="588" y2="${y}" stroke="var(--line)"/>`;
   s+=`<rect x="${CX-24}" y="${CY-24}" width="48" height="48" rx="4" fill="#c97c06" stroke="#7a4a00" stroke-width="2"/>`;
   if(len){const [dx,dy]=DIRS[dir],x2=CX+dx*len*CELL,y2=CY+dy*len*CELL;s+=`<line x1="${CX}" y1="${CY}" x2="${x2-dx*10}" y2="${y2-dy*10}" stroke="#d9483b" stroke-width="7" stroke-linecap="round"/><polygon points="${x2},${y2} ${x2-dx*18-dy*10},${y2-dy*18-dx*10} ${x2-dx*18+dy*10},${y2-dy*18+dx*10}" fill="#d9483b"/>`;}
   s+=`<text x="580" y="34" text-anchor="start" font-size="14" fill="var(--muted)" font-family="IBM Plex Sans Arabic" direction="rtl">المقياس: المربع = ${t.sc} نيوتن</text>`;svg.innerHTML=s;$('#s1len').textContent=len;}
  function task(){const t=DRAW[Math.min(k,DRAW.length-1)];if(k>=DRAW.length){$('#s1task').innerHTML='أنجزت كل مهام الرسم! 🎉';$('#s1scale').textContent='';$('#s1cnt').textContent='';return;}
   $('#s1task').innerHTML=`ارسم قوة مقدارها <b>${t.f} نيوتن</b> باتجاه <b>${DIRS[t.d][2]}</b>.`;$('#s1scale').textContent=`المقياس: كل مربع = ${t.sc} نيوتن.`;$('#s1cnt').textContent=`(${k+1}/${DRAW.length})`;}
  $('#s1dir').onclick=e=>{const b=e.target.closest('[data-d]');if(!b)return;dir=b.dataset.d;$$('#s1dir button').forEach(x=>x.classList.toggle('on',x===b));G.tick();draw();};
  $('#s1p').onclick=()=>{len=Math.min(11,len+1);G.tick();draw();};$('#s1m').onclick=()=>{len=Math.max(0,len-1);G.tick();draw();};
  $('#s1chk').onclick=()=>{if(k>=DRAW.length)return;const t=DRAW[k],need=t.f/t.sc;
   if(len===need&&dir===t.d){G.good();G.add(tries?4:10,'s1');say($('#s1fb'),'ok',`صحيح: ${t.f} ÷ ${t.sc} = ${need} ${need>2?'مربعات':'مربع'} باتجاه ${DIRS[t.d][2]}.`);k++;tries=0;len=0;task();draw();if(k>=DRAW.length&&STN.s1.sorted)G.complete('s1');}
   else{tries++;G.bad();say($('#s1fb'),'bad',len!==need?`عدد المربعات = المقدار ÷ المقياس = ${t.f} ÷ ${t.sc}.`:'راجع اتجاه السهم.');}};
  this.reset=()=>{k=0;len=0;dir='r';tries=0;STN.s1.sorted=false;$$('#s1dir button').forEach(x=>x.classList.toggle('on',x.dataset.d==='r'));$('#s1fb').innerHTML='';task();draw();
   sortGame($('#s1sort'),{bins:['دفع','سحب','جذب','احتكاك','رفع'],items:[['تدفع الطاولة لتحريكها',0],['تُبعد الكرسي عن المائدة لتجلس',1],['مغناطيس يمسك مشبكًا حديديًا',2],['حذاء رياضي يمنعك من الانزلاق',3],['رافع أثقال يحمل الثقل فوق رأسه',4],['عربة صغيرة تجرّها من حبلها',1]],hint:'هل الجسم يُدفع بعيدًا عنك أم يُسحب نحوك؟'},'s1',()=>{STN.s1.sorted=true;if(k>=DRAW.length)G.complete('s1');});};
  this.reset();},
 quiz:[{q:'ما وحدة قياس القوة؟',o:['جول','كجم','م/ث','نيوتن'],a:3},{q:'نرمز للقوة بالرمز:',o:['ك','ق','ت','ع'],a:1,cols:true}],
 explain:'<p><b>القوة</b> دفع أو سحب. تأثيرها: تغيّر شكل الجسم وحجمه وموضعه واتجاه حركته. رمزها <b>ق</b>، ووحدتها <b>النيوتن</b>.</p><p>نمثل القوة بسهم: نختار مقياس رسم، ثم نرسم سهمًا طوله يناسب المقدار ويشير إلى اتجاه القوة. مثال: 50 نيوتن باتجاه اليمين بمقياس 5 نيوتن لكل مربع = 10 مربعات.</p>'});

/* ================= S2: net force ================= */
def('s2',{n:'2 · القوة المحصلة',eyebrow:'المحطة 2',title:'ساحة القوى: المتزنة وغير المتزنة',goal:'أثّر في الصندوق بقوتين. احسب القوة المحصلة وحدد اتجاهها، ثم اضغط «أطلق» لترى: هل يتحرك الصندوق؟',plan:5,core:1,
 icon:'<rect x="28" y="28" width="24" height="24" fill="currentColor"/><path d="M4 40h22M54 40h22" stroke="currentColor" stroke-width="7"/>',
 body:`<div class="two"><div class="stage"><canvas id="s2c" width="720" height="300" aria-label="صندوق تؤثر فيه قوتان"></canvas>
   <div class="ctrl"><label>القوة الأولى ق₁: <b id="s2f1v">10</b> نيوتن</label><div style="display:flex;gap:8px;align-items:center"><span class="seg" id="s2d1"><button type="button" data-d="1" class="on">→</button><button type="button" data-d="-1">←</button></span><input type="range" id="s2f1" min="0" max="100" step="5" value="10"></div>
    <label>القوة الثانية ق₂: <b id="s2f2v">15</b> نيوتن</label><div style="display:flex;gap:8px;align-items:center"><span class="seg" id="s2d2"><button type="button" data-d="1" class="on">→</button><button type="button" data-d="-1">←</button></span><input type="range" id="s2f2" min="0" max="100" step="5" value="15"></div></div>
   <div class="sim-bar"><span class="seg" id="s2case"><button type="button" data-c="0">الحالة الأولى</button><button type="button" data-c="1">الحالة الثانية</button><button type="button" data-c="2">الحالة الثالثة</button></span><button class="btn" type="button" id="s2go">أطلق ▶</button></div></div>
  <div class="side"><div class="card"><h3>توقّع ثم تحقق</h3><p class="step-text">احسب القوة المحصلة قبل أن تطلق:</p><form class="answer" id="s2f" autocomplete="off"><label><input id="s2a" inputmode="decimal" aria-label="القوة المحصلة"><span class="unit">نيوتن</span></label><button class="btn" type="submit">تحقق</button></form><div id="s2fb"></div>
    <div class="readouts mt"><div class="ro"><small>القوة المحصلة</small><b id="s2net">؟</b></div><div class="ro"><small>نوع القوى</small><b class="ar" id="s2type">؟</b></div></div></div>
   <div class="card"><h3>القوانين الثلاث للمحصلة</h3><ul class="tasks plain"><li><b>في الاتجاه نفسه:</b> ق م = ق₁ + ق₂</li><li><b>متساويتان ومتعاكستان:</b> ق م = صفر</li><li><b>غير متساويتين ومتعاكستان:</b> ق م = القوة الكبرى − القوة الصغرى، في اتجاه الكبرى</li></ul></div></div></div>
  <div class="two"><div class="card"><h3>احسب القوة المحصلة وحدد اتجاهها</h3><div id="s2ex"></div></div>
   <div class="side">${vcard('islam','قوة التعاون',`${ayah('وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ','المائدة: 2')}<p class="mt">عندما تؤثر القوى في الاتجاه نفسه تتجمع فتصبح المحصلة أكبر؛ وكذلك المجتمع: إذا تعاون أفراده في اتجاه الخير عظم أثرهم.</p>`)}
   ${vcard('life','لعبة شد الحبل',`<p>إذا لم يتحرك الحبل فالقوى متزنة، وإذا تحرك نحو أحد الفريقين فالقوى غير متزنة.</p>`)}</div></div>`,
 init(){const cv=$('#s2c'),c=cv.getContext('2d'),W=720,H=300;let S={x:0,v:0,run:false,d1:1,d2:1,ok:false,tries:0,seen:new Set()};
  const f1=$('#s2f1'),f2=$('#s2f2');const net=()=>S.d1*+f1.value+S.d2*+f2.value;
  function lab(){$('#s2f1v').textContent=f1.value;$('#s2f2v').textContent=f2.value;$('#s2net').textContent='؟';$('#s2type').textContent='؟';S.ok=false;S.tries=0;$('#s2fb').innerHTML='';$('#s2a').value='';S.x=0;S.v=0;draw();}
  f1.oninput=f2.oninput=lab;
  const segs=(id,k)=>{$(id).onclick=e=>{const b=e.target.closest('[data-d]');if(!b)return;S[k]=+b.dataset.d;$$(id+' button').forEach(x=>x.classList.toggle('on',x===b));G.tick();lab();};};segs('#s2d1','d1');segs('#s2d2','d2');
  const CASES=[[10,1,15,1],[10,1,10,-1],[10,1,15,-1]];
  $('#s2case').onclick=e=>{const b=e.target.closest('[data-c]');if(!b)return;const cs=CASES[+b.dataset.c];f1.value=cs[0];S.d1=cs[1];f2.value=cs[2];S.d2=cs[3];
   $$('#s2d1 button').forEach(x=>x.classList.toggle('on',+x.dataset.d===S.d1));$$('#s2d2 button').forEach(x=>x.classList.toggle('on',+x.dataset.d===S.d2));$$('#s2case button').forEach(x=>x.classList.toggle('on',x===b));G.tick();lab();};
  function draw(){bg(c,W,H);c.fillStyle='#c9a66b';c.fillRect(0,214,W,86);const bx=W/2+S.x-60,by=104;
   c.fillStyle='#e8a33d';c.fillRect(bx,by,120,110);c.strokeStyle='#7a4a00';c.lineWidth=3;c.strokeRect(bx,by,120,110);c.beginPath();c.moveTo(bx,by);c.lineTo(bx+120,by+110);c.moveTo(bx+120,by);c.lineTo(bx,by+110);c.globalAlpha=.25;c.stroke();c.globalAlpha=1;
   const s=2.4,a1=+f1.value*s,a2=+f2.value*s;const start=d=>d>0?bx+120:bx;
   if(a1)arrow(c,start(S.d1),by+30,start(S.d1)+S.d1*a1,by+30,'#1f6fd1',8);
   if(a2)arrow(c,start(S.d2),by+80,start(S.d2)+S.d2*a2,by+80,'#d9483b',8);
   c.font='700 15px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign='center';
   if(a1){c.fillStyle='#1f6fd1';c.fillText('القوة الأولى '+f1.value+' نيوتن',start(S.d1)+S.d1*a1/2,by-10);}
   if(a2){c.fillStyle='#d9483b';c.fillText('القوة الثانية '+f2.value+' نيوتن',start(S.d2)+S.d2*a2/2,by+130);}c.direction='ltr';
   if(S.ok){const n=net();c.font='800 20px "Baloo Bhaijaan 2"';c.direction='rtl';c.textAlign='center';c.fillStyle='#7b3fa0';
    if(n)arrow(c,W/2,262,W/2+n*s,262,'#7b3fa0',9);c.fillText(n?'القوة المحصلة '+Math.abs(n)+' نيوتن نحو '+(n>0?'اليمين':'اليسار'):'القوة المحصلة = صفر (قوى متزنة)',W/2,n?294:270);c.direction='ltr';}
   c.font='700 14px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign='right';c.fillStyle='#53656e';c.fillText('طول السهم يمثل مقدار القوة',W-14,24);c.direction='ltr';}
  $('#s2f').onsubmit=e=>{e.preventDefault();if(S.ok)return;const x=parseNum($('#s2a').value);if(isNaN(x))return;const n=Math.abs(net());
   if(Math.abs(x-n)<.01){S.ok=true;G.good();G.add(S.tries?4:8,'s2');$('#s2net').textContent=n+' N';$('#s2type').textContent=n?'غير متزنة':'متزنة';
    say($('#s2fb'),'ok',n?`صحيح: المحصلة ${n} نيوتن نحو ${net()>0?'اليمين':'اليسار'}. القوى غير متزنة فيتحرك الصندوق. اضغط «أطلق».`:'صحيح: المحصلة صفر. القوى متزنة فلا يتحرك الصندوق.');
    const kind=S.d1===S.d2?'same':(+f1.value===+f2.value?'eq':'opp');S.seen.add(kind);if(S.seen.size>=3&&STN.s2.ex)G.complete('s2');draw();}
   else{S.tries++;G.bad();say($('#s2fb'),'bad',S.d1===S.d2?'القوتان في الاتجاه نفسه: اجمعهما.':'القوتان متعاكستان: اطرح الصغرى من الكبرى.');}};
  $('#s2go').onclick=()=>{if(S.run)return;S.run=true;S.x=0;S.v=0;let last=performance.now();const n=net();if(!n){SFX.thud();}else SFX.whoosh();
   const step=now=>{const dt=Math.min(.04,(now-last)/1000);last=now;if(!G.paused){S.v+=n*.6*dt*60/10;S.x+=S.v*dt;}draw();if(Math.abs(S.x)>W/2-60||(!n&&performance.now()-last>-1&&(S.t=(S.t||0)+dt)>1)){S.run=false;S.t=0;setTimeout(()=>{S.x=0;S.v=0;draw();},1200);return;}requestAnimationFrame(step);};requestAnimationFrame(step);};
  lab();this.reset=()=>{S.seen=new Set();STN.s2.ex=false;lab();ex();};
  function ex(){const box=$('#s2ex');const Q=[
    {q:'الحالة 1: قوة 75 نيوتن نحو اليسار، وقوة 50 نيوتن نحو اليمين.',o:['125 نيوتن نحو اليمين','25 نيوتن نحو اليسار','25 نيوتن نحو اليمين','صفر'],a:1,why:'75 − 50 = 25 نيوتن في اتجاه القوة الكبرى (اليسار).'},
    {q:'الحالة 2: قوتان 30 نيوتن و40 نيوتن كلتاهما نحو اليمين.',o:['10 نيوتن نحو اليمين','70 نيوتن نحو اليمين','70 نيوتن نحو اليسار','1200 نيوتن'],a:1,why:'في الاتجاه نفسه نجمع: 30 + 40 = 70 نيوتن.'},
    {q:'الحالة 3: قوة 15 نيوتن نحو اليسار، وقوتان 7 نيوتن و8 نيوتن نحو اليمين.',o:['صفر؛ القوى متزنة','30 نيوتن نحو اليمين','15 نيوتن نحو اليسار','1 نيوتن نحو اليمين'],a:0,why:'7 + 8 = 15 نحو اليمين تقابل 15 نحو اليسار، فالمحصلة صفر.'},
    {q:'شد الحبل: الفريق الأيسر يشد بقوتين 8 نيوتن و15 نيوتن، والفريق الأيمن بقوتين 10 نيوتن و10 نيوتن.',o:['3 نيوتن نحو الفريق الأيسر','3 نيوتن نحو الفريق الأيمن','43 نيوتن','صفر'],a:0,why:'الأيسر 23 نيوتن، والأيمن 20 نيوتن، فالمحصلة 3 نيوتن نحو الأيسر.'}];
   let i=0;const show=()=>{box.innerHTML=`<span class="cnt-badge">${i+1} / ${Q.length}</span><div></div>`;mcq(box.lastChild,Q[i],'s2',()=>{const n=document.createElement('div');n.className='row-actions';n.innerHTML=i<Q.length-1?'<button class="btn" type="button">التالي</button>':'<span class="status">أنجزت التمارين ✓</span>';box.appendChild(n);
     if(i<Q.length-1)n.firstChild.onclick=()=>{i++;show();};else{STN.s2.ex=true;if(S.seen.size>=3)G.complete('s2');}});};show();}
  ex();},
 quiz:[{q:'عندما تؤثر قوتان في الاتجاه نفسه فإن القوة المحصلة تساوي حاصل:',o:['ضربهما','طرحهما','جمعهما','قسمتهما'],a:2},{q:'إذا لم يتحرك الجسم رغم تأثير عدة قوى فيه، فالقوى:',o:['متزنة','غير متزنة','معدومة','متسارعة'],a:0,cols:true}],
 explain:'<p><b>محصلة القوى</b> قوة تعمل عمل عدة قوى.</p><ul><li>قوتان في الاتجاه نفسه: ق م = ق₁ + ق₂.</li><li>قوتان متساويتان ومتعاكستان: ق م = صفر (قوى متزنة).</li><li>قوتان غير متساويتين ومتعاكستان: ق م = الكبرى − الصغرى، في اتجاه الكبرى.</li></ul><p>إذا لم يتحرك الجسم فالقوى <b>متزنة</b>، وإذا تحرك فالقوى <b>غير متزنة</b>.</p>'});

/* ================= S3: first law, inertia, friction ================= */
const SURF=[{n:'العشب',mu:.55,col:'#6aa84f'},{n:'الخشب',mu:.3,col:'#c79a63'},{n:'الجليد',mu:.05,col:'#d6eef8'},{n:'الفضاء (بلا احتكاك)',mu:0,col:'#14213d'}];
def('s3',{n:'3 · القانون الأول',eyebrow:'المحطة 3',title:'القانون الأول لنيوتن: القصور الذاتي والاحتكاك',goal:'ادفع القرص مرة واحدة على أسطح مختلفة. لماذا يتوقف؟ وماذا يحدث لو لم يكن هناك احتكاك؟',plan:6,core:1,
 icon:'<circle cx="40" cy="40" r="16" fill="currentColor"/><path d="M4 40h12M64 40h12" stroke="currentColor" stroke-width="6" stroke-dasharray="4 4"/>',
 body:`<div class="two"><div class="stage"><canvas id="s3c" width="720" height="260" aria-label="قرص ينزلق على سطح"></canvas>
   <div class="sim-bar"><span class="seg" id="s3s">${SURF.map((s,i)=>`<button type="button" data-s="${i}" class="${i===1?'on':''}">${s.n}</button>`).join('')}</span><button class="btn" type="button" id="s3go">ادفع القرص ⟶</button></div>
   <div class="readouts pad"><div class="ro"><small>السرعة الآن</small><b id="s3v">0 m/s</b></div><div class="ro"><small>المسافة المقطوعة</small><b id="s3d">0 m</b></div><div class="ro"><small>قوة الاحتكاك</small><b class="ar" id="s3f">—</b></div></div></div>
  <div class="side"><div class="card"><h3>القانون الأول لنيوتن</h3><p class="lead">يبقى الجسم الساكن ساكنًا، ويستمر الجسم المتحرك في حركته بسرعة ثابتة وفي خط مستقيم، ما لم تؤثر فيه قوة محصلة (قوة غير متزنة).</p><ul class="tasks" id="s3tasks"></ul></div>
   ${vcard('nation','رواد فضاء سعوديون',`<p>في عام 2023م انطلق رائدا الفضاء السعوديان <b>ريانة برناوي</b> و<b>علي القرني</b> إلى محطة الفضاء الدولية. هناك، لو أفلت أحدهما مفكًّا من يده لاستمر المفك في حركته مبتعدًا عنه؛ فلا احتكاك يوقفه. هذا هو القانون الأول لنيوتن!</p>`)}</div></div>
  <div class="two"><div class="card"><h3>القصور الذاتي</h3><p class="step-text">تحريك جسم ثقيل أو إيقافه أصعب من تحريك جسم خفيف؛ فكلما احتوى الجسم على مادة أكثر صار إحداث تغيير في حركته أصعب. <b>القصور الذاتي</b>: مقاومة الجسم لإحداث تغيير في حالة حركته.</p><div id="s3q1"></div></div>
   <div class="card"><h3>حسب القانون الأول: ناقش</h3><div class="story">يدحرج <b>نذير</b> كرة على الأرض نحو <b>أحمد</b>.</div><div id="s3q0" class="mt"></div></div></div>
  <div class="two"><div class="card"><h3>الاحتكاك تحت المجهر</h3><p class="step-text">ينتج الاحتكاك عن خشونة السطوح المتلامسة؛ فلو كبّرنا سطح الطاولة لرأينا نتوءات تتشابك مع نتوءات الكتاب. يعمل الاحتكاك <b>عكس اتجاه الحركة</b>، وكلما كانت خشونة السطحين أكبر كان الاحتكاك أكبر.</p><div id="s3q2"></div></div>
   ${vcard('safety','القصور الذاتي في حياتك',`<p>عندما تتوقف الحافلة فجأة يندفع الركاب إلى الأمام، لأن أجسامهم تقاوم التغيير في حالتها الحركية. لهذا نربط <b>حزام الأمان</b>؛ فهو القوة التي توقفك مع السيارة.</p>`)}</div>`,
 init(){const cv=$('#s3c'),c=cv.getContext('2d'),W=720,H=260;let si=1,S={x:60,v:0,d:0,run:false},tried=new Set(),qa=false,qb=false;
  const T=['جرّب الدفع على الأسطح الأربعة','لاحظ: على أي سطح قطع القرص أكبر مسافة؟'];
  const tasks=()=>{$('#s3tasks').innerHTML=`<li class="${tried.size>=4?'ok':''}">جرّب الدفع على الأسطح الأربعة (${tried.size}/4).</li><li class="${qa&&qb?'ok':''}">أجب عن سؤالي القصور الذاتي والاحتكاك.</li>`;if(tried.size>=4&&qa&&qb)G.complete('s3');};
  $('#s3s').onclick=e=>{const b=e.target.closest('[data-s]');if(!b||S.run)return;si=+b.dataset.s;$$('#s3s button').forEach(x=>x.classList.toggle('on',x===b));S={x:60,v:0,d:0,run:false};G.tick();draw();};
  function draw(){const s=SURF[si];c.fillStyle=si===3?'#0b1430':'#e8f1f4';c.fillRect(0,0,W,H);
   if(si===3){for(let k=0;k<60;k++){c.fillStyle='rgba(255,255,255,'+(.3+(k%5)/8)+')';c.fillRect((k*137)%W,(k*61)%170,2,2);}}
   else{c.fillStyle=s.col;c.fillRect(0,190,W,70);if(si===0){c.strokeStyle='#3f7a2a';for(let x=0;x<W;x+=9){c.beginPath();c.moveTo(x,190);c.lineTo(x+3,182);c.stroke();}}}
   const px=((S.x%W)+W)%W;c.fillStyle='#d9483b';c.beginPath();c.ellipse(px,si===3?124:170,48,18,0,0,7);c.fill();c.fillStyle='#a02a1c';c.fillRect(px-48,si===3?124:170,96,12);
   if(S.v>.05){arrow(c,px+54,si===3?100:140,px+54+S.v*9,si===3?100:140,'#1f6fd1',6,'الحركة',si===3?86:126);if(s.mu)arrow(c,px-54,si===3?150:186,px-54-s.mu*120,si===3?150:186,'#c97c06',6,'الاحتكاك',si===3?174:236);}
   c.font='700 16px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign='right';c.fillStyle=si===3?'#fff':'#14222b';c.fillText('السطح: '+s.n,W-16,28);c.direction='ltr';
   $('#s3v').textContent=fmt(S.v,1)+' m/s';$('#s3d').textContent=fmt(S.d,1)+' m';$('#s3f').textContent=s.mu?(s.mu>.4?'كبيرة':s.mu>.1?'متوسطة':'صغيرة جدًا'):'لا يوجد';}
  $('#s3go').onclick=()=>{if(S.run)return;S={x:60,v:12,d:0,run:true};SFX.pop();let last=performance.now(),tt=0;
   const step=now=>{const dt=Math.min(.04,(now-last)/1000);last=now;if(!G.paused&&G.cur==='s3'){tt+=dt;S.v=Math.max(0,S.v-SURF[si].mu*9.8*dt);S.x+=S.v*dt*24;S.d+=S.v*dt;}draw();
     if(S.v<=0||(si===3&&tt>6)){S.run=false;tried.add(si);tasks();
       if(si===3)K.banner('ما زال القرص يتحرك!','في الفضاء لا يوجد احتكاك يوقفه');return;}requestAnimationFrame(step);};requestAnimationFrame(step);};
  draw();tasks();
  mcq($('#s3q0'),{q:'لماذا تتوقف الكرة عندما تصل إلى أحمد؟',o:['لأن الكرة تتعب وتتوقف من تلقاء نفسها','لأن أحمد أثّر فيها بقوة غيّرت حالتها الحركية','لأن القصور الذاتي يختفي','لأن سرعتها ثابتة'],a:1,why:'لا تتوقف الكرة أو تقلل سرعتها أو يتغير اتجاه حركتها إلا إذا أثرت فيها قوة.'},'s3');
  mcq($('#s3q1'),{q:'أيهما أسهل إيقافه: عربة تسوّق فارغة أم ممتلئة بالأغراض؟ ولماذا؟',o:['الممتلئة؛ لأن قصورها الذاتي أقل','الفارغة؛ لأن كتلتها أقل فقصورها الذاتي أقل','متساويتان دائمًا','الممتلئة؛ لأن الاحتكاك يختفي'],a:1,why:'كلما زادت كتلة الجسم زاد قصوره الذاتي (علاقة طردية)، فالعربة الممتلئة أصعب في التحريك والإيقاف.'},'s3',()=>{qa=true;tasks();});
  mcq($('#s3q2'),{q:'أي الحالتين ينتج عنها قوة احتكاك أكبر: مزلاج على الجليد، أم حذاء متزلج على العشب؟',o:['المزلاج على الجليد','حذاء المتزلج على العشب','متساويتان','لا يوجد احتكاك في الحالتين'],a:1,why:'السطحان المتلامسان (الحذاء والعشب) أكثر خشونة من المزلاج والجليد.'},'s3',()=>{qb=true;tasks();});
  this.reset=()=>{tried=new Set();qa=qb=false;S={x:60,v:0,d:0,run:false};draw();tasks();};},
 quiz:[{q:'مقاومة الجسم لإحداث تغيير في حالة حركته هي:',o:['الجاذبية الأرضية','القصور الذاتي','السرعة المتوسطة','القوة المتزنة'],a:1},{q:'في أي اتجاه تؤثر قوة الاحتكاك؟',o:['في اتجاه الحركة','عكس اتجاه الحركة','إلى أعلى دائمًا','لا اتجاه لها'],a:1}],
 explain:'<p><b>القانون الأول لنيوتن</b>: تبقى الحالة الحركية للجسم كما هي (سكونًا أو حركة بسرعة ثابتة في خط مستقيم) ما لم تؤثر فيه قوة محصلة.</p><p>تتوقف الأجسام المتحركة على الأرض بسبب <b>الاحتكاك</b>: قوة ممانعة بين السطوح المتلامسة تعمل عكس اتجاه الحركة، وتزداد بزيادة خشونة السطحين.</p><p><b>القصور الذاتي</b> مقاومة الجسم لتغيير حالته الحركية، ويزداد بزيادة الكتلة. وفي تجربة البطاقة والكأس تبقى القطعة النقدية في مكانها بسبب قصورها الذاتي فتسقط في الكأس.</p>'});

/* ================= S4: second law ================= */
def('s4',{n:'4 · القانون الثاني',eyebrow:'المحطة 4',title:'القانون الثاني لنيوتن: القوة والكتلة والتسارع',goal:'غيّر القوة المحصلة وكتلة العربة، وراقب التسارع. ما العلاقة بين الكتلة والتسارع؟ وبين القوة والتسارع؟',plan:6,core:1,
 icon:'<rect x="30" y="26" width="34" height="26" fill="currentColor"/><circle cx="38" cy="58" r="5" fill="currentColor"/><circle cx="58" cy="58" r="5" fill="currentColor"/><path d="M4 40h20" stroke="currentColor" stroke-width="7"/>',
 body:`<div class="two"><div class="stage"><canvas id="s4c" width="720" height="260" aria-label="عربة تدفعها قوة"></canvas>
   <div class="ctrl"><label>القوة المحصلة ق: <b id="s4Fv">40</b> نيوتن</label><input type="range" id="s4F" min="10" max="100" step="10" value="40">
    <label>الكتلة ك: <b id="s4mv">10</b> كجم</label><input type="range" id="s4m" min="5" max="40" step="5" value="10"></div>
   <div class="sim-bar"><button class="btn" type="button" id="s4go">ادفع ▶</button><button class="tbtn" type="button" id="s4clr">مسح الجدول</button></div></div>
  <div class="side"><div class="card"><h3>القانون الثاني لنيوتن</h3><p class="eq">ت = ق ÷ ك<small>التسارع = القوة المحصلة ÷ الكتلة · ق = ك × ت</small></p><p class="step-text">إذا أثرت قوة محصلة في جسم فإنه يكتسب تسارعًا في اتجاه القوة نفسه.</p><div id="s4card"></div></div>
   <div class="card"><div class="nb-head"><h2>سجل التجارب</h2><span id="s4n"></span></div><div class="tablewrap"><table id="s4t"></table></div></div></div></div>
  <div class="two"><div class="card"><h3>استنتج العلاقة</h3><div id="s4q1"></div></div><div class="card"><h3>&nbsp;</h3><div id="s4q2"></div></div></div>
  `,
 init(){const cv=$('#s4c'),c=cv.getContext('2d'),W=720,H=260;const F=$('#s4F'),M=$('#s4m');let S={x:0,v:0,run:false,ok:false,tries:0,done:false},rows=[],qa=false,qb=false;
  const lab=()=>{$('#s4Fv').textContent=F.value;$('#s4mv').textContent=M.value;S={x:0,v:0,run:false,ok:false,tries:0,done:false};draw();card();};F.oninput=M.oninput=lab;
  function draw(){bg(c,W,H,'#e8f1f4');c.fillStyle='#9aa5ab';c.fillRect(0,200,W,60);const x=150+S.x,m=+M.value,boxes=m/5-1;
   c.save();c.translate(x,200);c.scale(1.6,1.6);c.translate(-x,-200);c.fillStyle='#0b6884';c.fillRect(x,150,120,36);c.fillStyle='#111';[x+22,x+98].forEach(w=>{c.beginPath();c.arc(w,192,10,0,7);c.fill();});
   for(let k=0;k<boxes;k++){c.fillStyle='#c97c06';c.fillRect(x+6+(k%4)*28,124-Math.floor(k/4)*26,26,24);c.strokeStyle='#7a4a00';c.strokeRect(x+6+(k%4)*28,124-Math.floor(k/4)*26,26,24);}
   arrow(c,x-10-(+F.value)*.8,168,x-4,168,'#d9483b',6);c.restore();c.font='700 16px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign='center';c.fillStyle='#d9483b';c.fillText('القوة '+F.value+' نيوتن',x-60,100);c.direction='ltr';
   c.font='700 16px "IBM Plex Sans Arabic"';c.fillStyle='#14222b';c.textAlign='center';c.direction='rtl';c.fillText('الكتلة '+m+' كجم',x+96,236);c.direction='ltr';c.direction='ltr';
   if(S.done){c.font='800 20px "Baloo Bhaijaan 2"';c.textAlign='center';c.fillStyle='#1f7a45';c.fillText('a = '+fmt(+F.value/m,2)+' m/s²',W/2,40);}}
  function card(){const el=$('#s4card');if(!S.done){el.innerHTML='<p class="step-text muted">اضغط «ادفع» ثم احسب التسارع.</p>';return;}
   const a=+F.value/+M.value;el.innerHTML=`<p class="step-text">ق = ${num(F.value)} نيوتن ، ك = ${num(M.value)} كجم. ما التسارع؟</p><form class="answer" id="s4f" autocomplete="off"><label><input id="s4a" inputmode="decimal" aria-label="التسارع"><span class="unit">م/ث²</span></label><button class="btn" type="submit">تحقق</button></form>${G.teacher?`<div class="teacher-hint">للمعلم: ${fmt(a,2)}</div>`:''}<div id="s4fb"></div>`;
   $('#s4f').onsubmit=e=>{e.preventDefault();if(S.ok)return;const v=parseNum($('#s4a').value);if(isNaN(v))return;
    if(Math.abs(v-a)<=.02+a*.01){S.ok=true;G.good();G.add(S.tries?4:8,'s4');rows.push([+F.value,+M.value,a]);table();say($('#s4fb'),'ok',`صحيح: ت = ${F.value} ÷ ${M.value} = ${fmt(a,2)} م/ث². غيّر القوة أو الكتلة وكرّر.`);check();}
    else{S.tries++;G.bad();say($('#s4fb'),'bad','اقسم القوة على الكتلة: ت = ق ÷ ك.');}};}
  function table(){$('#s4t').innerHTML=`<thead><tr><th>التجربة</th><th>ق (N)</th><th>ك (kg)</th><th>ت (m/s²)</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${i+1}</td><td class="num">${r[0]}</td><td class="num">${r[1]}</td><td class="num">${fmt(r[2],2)}</td></tr>`).join('')||'<tr><td colspan="4" class="empty">لا توجد تجارب بعد.</td></tr>'}</tbody>`;$('#s4n').textContent=rows.length+' تجارب';}
  function check(){if(rows.length>=3&&qa&&qb)G.complete('s4');}
  $('#s4go').onclick=()=>{if(S.run)return;S.x=0;S.v=0;S.run=true;S.done=false;SFX.whoosh();let last=performance.now(),t=0;const a=+F.value/+M.value;
   const step=now=>{const dt=Math.min(.04,(now-last)/1000);last=now;if(!G.paused&&G.cur==='s4'){t+=dt;S.v+=a*dt;S.x+=S.v*dt*40;}draw();if(t>=1.6||S.x>W-260){S.run=false;S.done=true;draw();card();return;}requestAnimationFrame(step);};requestAnimationFrame(step);};
  $('#s4clr').onclick=()=>{rows=[];table();};
  lab();table();
  mcq($('#s4q1'),{q:'ثبّتنا القوة وزدنا الكتلة. ماذا يحدث للتسارع؟',o:['يزداد (علاقة طردية)','يقل (علاقة عكسية)','لا يتغير','يصبح صفرًا'],a:1,why:'كلما زادت الكتلة قلّ التسارع: علاقة عكسية.'},'s4',()=>{qa=true;check();});
  mcq($('#s4q2'),{q:'ثبّتنا الكتلة وضاعفنا القوة المحصلة. ماذا يحدث للتسارع؟',o:['يتضاعف','يقل إلى النصف','لا يتغير','يقل إلى الربع'],a:0,why:'ت = ق ÷ ك؛ فمضاعفة القوة مع ثبات الكتلة تضاعف التسارع.'},'s4',()=>{qb=true;check();});
  mcq($('#s4q3'),{q:'ما الذي سبّب تغيّر سرعة كرة السلة واتجاه حركتها أثناء تحليقها؟',o:['قوة الجاذبية الأرضية','القصور الذاتي فقط','لا توجد قوة','قوة رد فعل الهواء فقط'],a:0,why:'قوة الجاذبية سببت تسارع الكرة إلى أسفل.'},'s4');
  this.reset=()=>{rows=[];qa=qb=false;table();lab();};},
 quiz:[{q:'في الشكل: قوة 30 نيوتن نحو اليمين، و5 نيوتن نحو اليسار، على جسم كتلته 5 كجم. ما تسارعه؟',o:['30 م/ث²','10 م/ث²','5 م/ث²','25 م/ث²'],a:2,why:'ق م = 30 − 5 = 25 نيوتن، ت = 25 ÷ 5 = 5 م/ث².'},{q:'في القانون الثاني لنيوتن يكون اتجاه التسارع:',o:['عكس اتجاه القوة المحصلة','في اتجاه القوة المحصلة','عموديًا على القوة','بلا اتجاه'],a:1}],
 explain:'<p><b>القانون الثاني لنيوتن</b>: إذا أثرت قوة محصلة في جسم فإنه يكتسب تسارعًا في اتجاه القوة نفسه، يساوي القوة المحصلة مقسومة على كتلة الجسم: <b>ت = ق ÷ ك</b>.</p><p>يعتمد تسارع أي جسم على القوة المحصلة المؤثرة فيه (علاقة طردية) وعلى كتلته (علاقة عكسية).</p>'});

/* ================= S6: problems ================= */
def('s6',{n:'5 · مختبر المسائل',eyebrow:'المحطة 5 · تطبيق الرياضيات',title:'مختبر المسائل: اختر مستواك',goal:'ثلاثة مستويات تناسب الجميع. استعن بأزرار المساعدة عند الحاجة.',plan:3,core:1,
 icon:'<rect x="10" y="10" width="60" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30h12M30 24v12M46 30h12M24 52h12M46 48h12M46 56h12" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
 body:'<div class="card" id="s6lv"></div>',
 init(){const L1=[
   {tag:'تسارع كرة السلة',p:'إذا أثرت قوة مقدارها 10 نيوتن في كرة سلة كتلتها 0.5 كجم، فما تسارع الكرة؟',v:20,unit:'م/ث²',given:'ق = 10 نيوتن ، ك = 0.5 كجم',want:'ت = ؟',law:'ت = ق ÷ ك',sol:'ت = 10 ÷ 0.5 = 20 م/ث²'},
   {tag:'مسائل تدريبية',p:'إذا دفعت صندوقًا كتلته 20 كجم بقوة 40 نيوتن، فما تسارع الصندوق؟',v:2,unit:'م/ث²',given:'ق = 40 نيوتن ، ك = 20 كجم',law:'ت = ق ÷ ك',sol:'ت = 40 ÷ 20 = 2 م/ث²'},
   {tag:'العدّاء',p:'احسب تسارع عدّاء كتلته 80 كجم إذا انطلق تحت تأثير قوة دفع مقدارها 80 نيوتن.',v:1,unit:'م/ث²',given:'ق = 80 نيوتن ، ك = 80 كجم',law:'ت = ق ÷ ك',sol:'ت = 80 ÷ 80 = 1 م/ث²'}];
  const L2=[
   {tag:'المحصلة ثم التسارع',p:'تؤثر في جسم كتلته 5 كجم قوة 30 نيوتن نحو اليمين وقوة 5 نيوتن نحو اليسار. ما تسارعه؟',v:5,unit:'م/ث²',given:'ق₁ = 30 نيوتن (يمين) ، ق₂ = 5 نيوتن (يسار) ، ك = 5 كجم',want:'ت = ؟',law:'ق م = 30 − 5 ، ثم ت = ق م ÷ ك',sol:'ق م = 25 نيوتن ، ت = 25 ÷ 5 = 5 م/ث²'},
   {tag:'احسب القوة',p:'احسب القوة المحصلة المؤثرة في كرة كتلتها 0.15 كجم وتسارعها 20 م/ث².',v:3,unit:'نيوتن',given:'ك = 0.15 كجم ، ت = 20 م/ث²',want:'ق = ؟',law:'ق = ك × ت',sol:'ق = 0.15 × 20 = 3 نيوتن'},
   {tag:'قارن',p:'قارن بين تسارع سيارة كتلتها 900 كجم ودراجة هوائية كتلتها 12 كجم إذا أثرت في كلٍّ منهما قوة 2000 نيوتن. أدخل تسارع <b>السيارة</b> (لمنزلتين عشريتين).',v:2.22,tol:.02,unit:'م/ث²',given:'ق = 2000 نيوتن ، ك السيارة = 900 كجم ، ك الدراجة = 12 كجم',law:'ت = ق ÷ ك',sol:'السيارة: 2000 ÷ 900 ≈ 2.22 م/ث². الدراجة: 2000 ÷ 12 ≈ 166.67 م/ث². الدراجة أكبر تسارعًا لأن كتلتها أصغر.'}];
  const L3=[
   {tag:'أي العربتين؟',q:'عربتا تسوّق كتلة كلٍّ منهما 10 كجم: الأولى تُدفع بقوة 30 نيوتن، والثانية بقوة 20 نيوتن. أيهما تسارعها أكبر؟',o:['الأولى: 3 م/ث²','الثانية: 2 م/ث²','متساويتان','لا يمكن الحكم'],a:0,why:'ت₁ = 30 ÷ 10 = 3 ، ت₂ = 20 ÷ 10 = 2.'},
   {tag:'اختبر نفسك',p:'إذا أثرت قوة مقدارها 5 نيوتن في جسم نحو اليسار، وقوة أخرى مقدارها 9 نيوتن نحو اليمين، فما مقدار القوة المحصلة؟',v:4,unit:'نيوتن',given:'5 نيوتن يسارًا ، 9 نيوتن يمينًا',law:'قوتان متعاكستان: الكبرى − الصغرى',sol:'ق م = 9 − 5 = 4 نيوتن نحو اليمين'},
   {tag:'تفكير ناقد',q:'ينزلق كتاب على سطح طاولة بحيث تقل سرعته تدريجيًّا حتى يتوقف. هل يتناقض ذلك مع القانون الأول لنيوتن؟',o:['نعم، لأن الكتاب توقف من تلقاء نفسه','لا، لأن قوة الاحتكاك قوة محصلة غيّرت حالته الحركية','نعم، لأن القانون الأول لا يطبَّق على الكتب','لا، لأن الكتاب لا كتلة له'],a:1,why:'الاحتكاك قوة غير متزنة أثرت في الكتاب فأوقفته؛ وهذا يتفق مع القانون الأول.'},
   {tag:'استنتج',q:'إذا كانت سيارة تتحرك بسرعة ثابتة المقدار، فهل يلزم أن تكون واقعة تحت تأثير قوى متزنة؟',o:['نعم دائمًا','نعم إذا كانت تتحرك في خط مستقيم؛ أما إذا غيّرت اتجاهها فهناك قوة محصلة','لا، فالسرعة الثابتة تعني قوة محصلة كبيرة','لا توجد قوى على السيارة'],a:1,why:'السرعة المتجهة الثابتة (مقدارًا واتجاهًا) تعني قوة محصلة صفرًا.'}];
  STN.s6.lv=levels($('#s6lv'),[L1,L2,L3],'s6',()=>G.complete('s6'));},
 reset(){STN.s6.lv&&STN.s6.lv.reset();},refresh(){STN.s6.lv&&STN.s6.lv.refresh();},
 explain:'<p>مستويات ثلاثة تراعي الفروق الفردية: تطبيق مباشر لـ ت = ق ÷ ك، ثم حساب المحصلة أولًا أو حساب القوة، ثم مقارنة وتفكير ناقد.</p>'});

/* ================= تقييم: الأسئلة 4–11 (مسائل العرض في موضعها) ================= */
def('ev',{n:'6 · تقييم: الأسئلة 4–11',eyebrow:'المحطة 6 · تقييم',title:'تقييم: الأسئلة 4–11',goal:'أسئلة التقييم في العرض بعد القانون الثاني لنيوتن، بترتيبها.',plan:5,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="card" id="evBox"></div>',
 init(){const P=[{q:'ما وحدة قياس القوة؟',o:['جول','م/ث','كجم','نيوتن'],a:3,tag:'السؤال 4'},
 {q:'ما تسارع جسم كتلته 5 كجم إذا أثرت فيه قوة محصلة مقدارها 30 نيوتن نحو اليمين وقوة 5 نيوتن نحو اليسار؟',o:['30 م/ث²','5 م/ث²','10 م/ث²','25 م/ث²'],a:1,tag:'السؤال 5',why:'ق م = 30 − 5 = 25 نيوتن، ت = 25 ÷ 5 = 5 م/ث².'},
 {q:'قوة ممانعة تنشأ بين سطوح الأجسام المتلامسة، وتقاوم حركة هذه السطوح بعضها بالنسبة لبعض:',o:['الجاذبية الأرضية','الاحتكاك','القصور الذاتي','القوة المتزنة'],a:1,tag:'السؤال 6'},
 {q:'هو مقاومة الجسم لإحداث تغيير في حالة حركته:',o:['الجاذبية الأرضية','السرعة المتوسطة','القصور الذاتي','القوة المتزنة'],a:2,tag:'السؤال 7'},
 {q:'ماذا يحدث عندما نسحب الورقة بسرعة من تحت القطعة المعدنية فوق الكأس؟',o:['تتحرك القطعة مع الورقة','لا تتحرك القطعة مع الورقة فتسقط في الكأس بسبب قصورها الذاتي','تطير القطعة بعيدًا','تبقى معلّقة في الهواء'],a:1,tag:'السؤال 8',why:'القطعة المعدنية تقاوم التغير في حالتها الحركية (القصور الذاتي).'},
 {q:'في أي اتجاه تؤثر قوة الاحتكاك؟',o:['في اتجاه الحركة','عكس اتجاه الحركة، وتعمل على تقليل سرعة الجسم','إلى أعلى دائمًا','لا اتجاه لها'],a:1,tag:'السؤال 9'},
 {q:'أي الحالتين ينتج عنها قوة احتكاك أكبر: متزلج على الجليد (A)، أم متزلج على العشب (B)؟',o:['الحالة A','الحالة B؛ لأن خشونة السطحين المتلامسين (الحذاء والعشب) أكبر','متساويتان','لا يوجد احتكاك في الحالتين'],a:1,tag:'السؤال 10'},
 {q:'عربتان كتلة كل منهما 10 كجم: الأولى تؤثر فيها قوة 30 نيوتن، والثانية 20 نيوتن. أي العربتين لها تسارع أكبر؟',o:['الأولى: 3 م/ث²','الثانية: 2 م/ث²','متساويتان','لا يمكن الحكم'],a:0,tag:'السؤال 11',why:'ت₁ = 30 ÷ 10 = 3 م/ث²، ت₂ = 20 ÷ 10 = 2 م/ث².'}];const box=$('#evBox');const solved=P.map(()=>false);box.innerHTML='<div class="prob-list"></div>';const L=box.querySelector('.prob-list');
  P.forEach((q,i)=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+(i+1)+'</span>'+(q.tag?'<span>'+q.tag+'</span>':'')+'</div>';const inner=document.createElement('div');d.appendChild(inner);L.appendChild(d);
   const fin=()=>{solved[i]=true;d.classList.add('solved');if(solved.every(Boolean))G.complete('ev');};if(q.o)mcq(inner,q,'ev',fin);else calcQ(inner,q,'ev',fin);});},
 reset(){STN['ev'].init();},
 explain:'<p>مسائل العرض في موضعها من الدرس، بالترتيب نفسه. أزرار المساعدة تكشف المعطيات ثم القانون ثم الحل.</p>'});
/* ================= S5: third law ================= */
def('s5',{n:'7 · القانون الثالث',eyebrow:'المحطة 7',title:'القانون الثالث لنيوتن: الفعل ورد الفعل',goal:'انفخ البالون ثم أطلقه: الهواء يندفع إلى الخلف، فإلى أين تتحرك السيارة؟',plan:5,core:1,
 icon:'<path d="M40 8c10 10 12 30 0 52-12-22-10-42 0-52z" fill="currentColor"/><path d="M34 62l-4 12M46 62l4 12M40 62v14" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="two"><div class="stage"><canvas id="s5c" width="720" height="260" aria-label="سيارة البالون"></canvas>
   <div class="ctrl"><label>مقدار نفخ البالون: <b id="s5pv">3</b> نفخات</label><input type="range" id="s5p" min="1" max="6" value="3"></div>
   <div class="sim-bar"><button class="btn" type="button" id="s5go">أطلق البالون 🎈</button><button class="tbtn" type="button" id="s5r">أعِد</button></div></div>
  <div class="side"><div class="card"><h3>القانون الثالث لنيوتن</h3><p class="lead">عندما يؤثر جسم بقوة في جسم آخر، فإن الجسم الثاني يؤثر في الأول بقوة مساوية لها في المقدار ومعاكسة لها في الاتجاه.</p><div id="s5q"></div></div>
   ${vcard('nation','صاروخ نحو الفضاء',`<p>عندما انطلق الصاروخ الذي حمل رائدَي الفضاء السعوديين إلى محطة الفضاء الدولية، دفع غازات الاحتراق إلى أسفل بقوة هائلة (فعل)، فدفعته الغازات إلى أعلى (رد فعل). هذا ما تفعله سيارة البالون تمامًا!</p>`)}</div></div>
  <div class="card"><div class="nb-head"><h2>حدّد أي قوانين نيوتن الثلاثة يفسّر كل خطوة</h2><span>تقييم 13</span></div><div id="s5sort"></div></div>`,
 init(){const cv=$('#s5c'),c=cv.getContext('2d'),W=720,H=260;const P=$('#s5p');let S,q=false,srt=false,runs=0;
  const reset=()=>{S={x:0,v:0,air:+P.value,size:+P.value,run:false,parts:[]};draw();};P.oninput=()=>{$('#s5pv').textContent=P.value;reset();};
  function draw(){bg(c,W,H,'#eef5f8');c.fillStyle='#9aa5ab';c.fillRect(0,214,W,50);const x=120+S.x;c.save();c.translate(x,214);c.scale(1.5,1.5);c.translate(-x,-214);
   c.fillStyle='#d6eef8';c.strokeStyle='#6f8c99';c.lineWidth=2;c.beginPath();c.roundRect?c.roundRect(x,160,110,40,8):c.rect(x,160,110,40);c.fill();c.stroke();
   c.fillStyle='#111';[x+22,x+88].forEach(w=>{c.beginPath();c.arc(w,204,10,0,7);c.fill();});
   const r=10+S.size*7;c.fillStyle='#9b59b6';c.beginPath();c.ellipse(x+40-r*.2,150-r*.6,r*1.1,r*.8,-.3,0,7);c.fill();c.fillStyle='#7d3c98';c.fillRect(x-6,168,20,8);
   c.restore();S.parts.forEach(p=>{c.fillStyle=`rgba(150,170,180,${p.l})`;c.beginPath();c.arc(p.x,p.y,4,0,7);c.fill();});
   if(S.run&&S.size>.2){arrow(c,x-24,96,x-24-60-S.size*10,96,'#d9483b',6,'فعل: البالون يدفع الهواء للخلف',74);arrow(c,x+176,150,x+226+S.size*10,150,'#1f6fd1',6,'رد فعل: الهواء يدفع السيارة للأمام',120);}}
  $('#s5go').onclick=()=>{if(S.run)return;reset();S.run=true;SFX.whoosh();let last=performance.now();
   const step=now=>{const dt=Math.min(.04,(now-last)/1000);last=now;if(!G.paused&&G.cur==='s5'){if(S.size>0){const th=S.size>0?1:0;S.v+=th*28*dt;S.size=Math.max(0,S.size-1.6*dt);for(let k=0;k<3;k++)S.parts.push({x:120+S.x-20,y:150+Math.random()*8-4,vx:-200-Math.random()*120,l:1});}
     S.v=Math.max(0,S.v-6*dt);S.x+=S.v*dt*10;S.parts.forEach(p=>{p.x+=p.vx*dt;p.l-=dt*1.2;});S.parts=S.parts.filter(p=>p.l>0);}
     draw();if((S.size<=0&&S.v<=0)||S.x>W-260){S.run=false;runs++;if(runs>=2&&q&&srt)G.complete('s5');draw();return;}requestAnimationFrame(step);};requestAnimationFrame(step);};
  $('#s5r').onclick=reset;reset();
  mcq($('#s5q'),{q:'قوتا الفعل ورد الفعل متساويتان ومتعاكستان. لماذا لا تُلغي إحداهما الأخرى؟',o:['لأن إحداهما أكبر دائمًا','لأنهما تؤثران في جسمين مختلفين','لأنهما في الاتجاه نفسه','لأن رد الفعل يحدث بعد مدة طويلة'],a:1,why:'قوة الفعل تؤثر في جسم، وقوة رد الفعل تؤثر في جسم آخر؛ فلا تلغي إحداهما الأخرى.'},'s5',()=>{q=true;if(runs>=2&&srt)G.complete('s5');});
  const doSort=()=>sortGame($('#s5sort'),{bins:['قانون نيوتن الأول','قانون نيوتن الثاني','قانون نيوتن الثالث'],items:[['تسحب الأرض الجسم في اتجاهها، ويسحب الجسم الأرض في اتجاهه.',2],['الجسم ساكن لا يتحرك.',0],['شخص يدفع الجسم في اتجاه السهم فيتحرك الجسم في الاتجاه نفسه.',1],['يستمر الجسم بالتأرجح إلى الأمام وإلى الخلف.',0],['يتباطأ الجسم في الحركة إلى أن يتوقف.',1],['يسحب الجسم الخطّاف، ويسحب الخطّاف الجسم.',2]],hint:'قوتان متبادلتان بين جسمين ← الثالث. قوة تغيّر السرعة ← الثاني. لا تغيير في الحالة الحركية ← الأول.'},'s5',()=>{srt=true;if(runs>=2&&q)G.complete('s5');});
  doSort();this.reset=()=>{runs=0;q=false;srt=false;reset();doSort();};},
 quiz:[{q:'سبّاح يدفع الماء إلى الخلف بيديه، فيندفع إلى الأمام. أي قوانين نيوتن يفسر ذلك؟',o:['الأول','الثاني','الثالث','لا شيء مما سبق'],a:2},{q:'قوتا الفعل ورد الفعل:',o:['متساويتان في المقدار ومتعاكستان في الاتجاه','مختلفتان في المقدار','في الاتجاه نفسه','تؤثران في الجسم نفسه'],a:0}],
 explain:'<p><b>القانون الثالث لنيوتن</b>: عندما يؤثر جسم بقوة في جسم آخر، فإن الجسم الثاني يؤثر في الأول بقوة مساوية في المقدار ومعاكسة في الاتجاه.</p><p>لا تُلغي القوتان إحداهما الأخرى لأنهما تؤثران في جسمين مختلفين. أمثلة: الصاروخ، والسباح، والقفز من القارب، ولوح التزلج.</p><p><b>نشاط منزلي:</b> سيارة البالون؛ اكتشف متعة التجربة.</p>'});

/* ================= الخلاصة ================= */
def('sum',{n:'الخلاصة',eyebrow:'الخلاصة · الكتاب صفحة 57',title:'الخلاصة',goal:'تساعدك على ترتيب الأفكار.',plan:2,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="two"><div class="card"><h3>القوة</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>القوة دفع أو سحب، وتُقاس بوحدة النيوتن، وتمثَّل بسهم يدل طوله على مقدارها واتجاهه على اتجاهها.</li><li>القوة المحصلة قوة تعمل عمل عدة قوى؛ وإذا كانت محصلة القوى صفرًا فالقوى متزنة.</li></ul></div><div class="card"><h3>قوانين نيوتن</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>القانون الأول: يبقى الجسم الساكن ساكنًا، ويستمر المتحرك في حركته بسرعة ثابتة وفي خط مستقيم ما لم تؤثر فيه قوة محصلة.</li><li>القانون الثاني: ت = ق ÷ ك.</li><li>القانون الثالث: لكل فعل رد فعل مساوٍ له في المقدار ومعاكس له في الاتجاه، ويؤثران في جسمين مختلفين.</li></ul></div></div>',
 init(){},enter(){G.complete('sum');},reset(){},explain:'<p>خلاصة الدرس كما في العرض.</p>'});
/* ================= SELF TEST p61 ================= */
def('self',{n:'اختبر نفسك',eyebrow:'كتاب الطالب ص 61',title:'اختبر نفسك: الأسئلة والحلول',goal:'أسئلة «اختبر نفسك» في نهاية الدرس مع الحل النموذجي لكل سؤال.',plan:3,
 icon:'<rect x="14" y="8" width="52" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30l6 6 12-12M24 54l6 6 12-12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=K.solutions($('#selfBox'),[
  {k:'اشرح',q:'اشرح العلاقة بين القصور الذاتي لجسم وكتلته.',a:[['الإجابة','علاقة طردية: كلما زادت كتلة الجسم زاد قصوره الذاتي، فيصعب تحريكه أو إيقافه أو تغيير اتجاه حركته.'],['مثال','إيقاف عربة كتلتها 20 كجم أصعب من إيقاف عربة كتلتها 10 كجم.']]},
  {k:'طبّق',q:'إذا أثرت قوة مقدارها 5 نيوتن في جسم نحو اليسار، وقوة أخرى مقدارها 9 نيوتن نحو اليمين، فما مقدار القوة المحصلة؟',a:[['المعطيات','ق₁ = 5 نيوتن نحو اليسار ، ق₂ = 9 نيوتن نحو اليمين'],['القانون','قوتان متعاكستان: ق م = القوة الكبرى − القوة الصغرى'],['الحل','ق م = 9 − 5 = 4 نيوتن'],['الإجابة','4 نيوتن نحو اليمين (في اتجاه القوة الكبرى).']]},
  {k:'استنتج',q:'إذا كانت سيارة تتحرك بسرعة ثابتة المقدار، فهل يلزم أن تكون واقعة تحت تأثير قوى متزنة؟',a:[['الإجابة','ليس بالضرورة.'],['إذا تحركت في خط مستقيم','فسرعتها المتجهة ثابتة، فالقوى المؤثرة فيها متزنة والقوة المحصلة صفر (القانون الأول).'],['إذا غيّرت اتجاهها','كأن تسير في منعطف، فسرعتها المتجهة تتغير؛ أي أنها تتسارع، فالقوى غير متزنة وهناك قوة محصلة.']]},
  {k:'التفكير الناقد',q:'ينزلق كتاب على سطح طاولة بحيث تقل سرعته تدريجيًّا حتى يتوقف. فسّر: هل يُعدّ ذلك تناقضًا مع القانون الأول لنيوتن في الحركة أم لا؟',a:[['الإجابة','لا يُعدّ تناقضًا.'],['التفسير','ينص القانون الأول على أن الجسم يستمر في حركته ما لم تؤثر فيه قوة محصلة. وهنا تؤثر في الكتاب قوة الاحتكاك بين الكتاب والطاولة عكس اتجاه الحركة؛ وهي قوة غير متزنة أبطأت الكتاب حتى توقف.']]},
  {k:'تطبيق الرياضيات',q:'احسب القوة المحصلة المؤثرة في كرة كتلتها 0.15 كجم وتسارعها 20 م/ث².',a:[['المعطيات','ك = 0.15 كجم ، ت = 20 م/ث²'],['المطلوب','ق = ؟'],['القانون','ق = ك × ت'],['الحل','ق = 0.15 × 20 = 3 نيوتن']]}],'self',()=>G.complete('self'));},
 reset(){STN.self.s.reset();},explain:'<p>حلول نموذجية لأسئلة «اختبر نفسك» ص 61. يُفضّل أن يجيب الطلاب في دفاترهم أولًا، ثم يكشف المعلم الحل سؤالًا سؤالًا.</p>'});

/* ================= S7: competitions ================= */
const RQ=[
 {q:'ما وحدة قياس القوة؟',o:['جول','كجم','م/ث','نيوتن'],a:3},{q:'قوة ممانعة تنشأ بين سطوح الأجسام المتلامسة:',o:['الجاذبية','القصور الذاتي','الاحتكاك','القوة المتزنة'],a:2},
 {q:'هو مقاومة الجسم لإحداث تغيير في حالة حركته:',o:['الجاذبية','القصور الذاتي','السرعة المتوسطة','القوة المتزنة'],a:1},{q:'قوة 20 نيوتن يمينًا و20 نيوتن يسارًا. المحصلة:',o:['40 نيوتن','20 نيوتن','صفر','10 نيوتن'],a:2},
 {q:'قوتان 12 نيوتن و8 نيوتن نحو اليمين. المحصلة:',o:['4 نيوتن يمينًا','20 نيوتن يمينًا','20 نيوتن يسارًا','96 نيوتن'],a:1},{q:'كلما زادت الكتلة مع ثبات القوة، فإن التسارع:',o:['يزداد','يقل','لا يتغير','يصبح سالبًا'],a:1},
 {q:'جسم كتلته 4 كجم تؤثر فيه قوة محصلة 12 نيوتن. تسارعه:',o:['48 م/ث²','3 م/ث²','8 م/ث²','16 م/ث²'],a:1},{q:'عندما تدفع الحائط يدفعك الحائط. هذا هو:',o:['القانون الأول','القانون الثاني','القانون الثالث','القصور الذاتي'],a:2},
 {q:'في الفضاء يفلت مفكّ من يد رائد الفضاء فيستمر مبتعدًا. هذا يفسّره:',o:['القانون الأول','القانون الثاني','القانون الثالث','الاحتكاك'],a:0},{q:'العلاقة بين القصور الذاتي وكتلة الجسم:',o:['عكسية','طردية','لا علاقة','تتساوى دائمًا'],a:1},
 {q:'يعمل الاحتكاك:',o:['في اتجاه الحركة','عكس اتجاه الحركة','عموديًا دائمًا','على زيادة السرعة'],a:1},{q:'قوة 50 نيوتن يسارًا و80 نيوتن يمينًا. المحصلة:',o:['30 نيوتن يمينًا','30 نيوتن يسارًا','130 نيوتن يمينًا','صفر'],a:0}];
const RID=[{clues:['أنا قوة تقاوم الحركة.','أنشأ بين سطحين متلامسين.','أكون كبيرة على العشب وصغيرة على الجليد.'],o:['الاحتكاك','القصور الذاتي','الجاذبية','الدفع'],a:0},
 {clues:['أنا خاصية في كل جسم له كتلة.','أجعل إيقاف العربة الممتلئة صعبًا.','بسببي تسقط القطعة النقدية في الكأس.'],o:['التسارع','القصور الذاتي','الاحتكاك','السرعة'],a:1},
 {clues:['أنا قانون.','أربط بين القوة والكتلة والتسارع.','صيغتي: ت = ق ÷ ك.'],o:['القانون الأول','القانون الثاني','القانون الثالث','قانون السرعة'],a:1},
 {clues:['أنا قانون.','أتحدث عن قوتين متساويتين متعاكستين.','أفسّر انطلاق الصواريخ وسيارة البالون.'],o:['القانون الأول','القانون الثاني','القانون الثالث','القوة المحصلة'],a:2},
 {clues:['أنا وحدة قياس.','سُمّيت باسم عالم إنجليزي.','أقيس بها القوة.'],o:['الجول','المتر','النيوتن','الكيلوجرام'],a:2},
 {clues:['أنا قوة واحدة تعمل عمل عدة قوى.','أساوي صفرًا عندما تتزن القوى.','إذا لم أكن صفرًا يتسارع الجسم.'],o:['القوة المحصلة','قوة الاحتكاك','القصور الذاتي','رد الفعل'],a:0}];
def('s7',{n:'المسابقات (إثرائي)',eyebrow:'إثرائي · تنافس المجموعات',title:'ساحة نيوتن',goal:'مسابقتان: «شد الحبل» بين فريقين، و«من أنا؟» حيث يقل عدد النقاط كلما طلبت دليلًا إضافيًا.',plan:4,
 icon:'<path d="M4 44h72" stroke="currentColor" stroke-width="6"/><circle cx="14" cy="26" r="7" fill="currentColor"/><circle cx="66" cy="26" r="7" fill="currentColor"/><path d="M36 30h8v26h-8z" fill="currentColor"/>',
 body:`<div class="card"><div class="nb-head"><h2>🪢 شد الحبل</h2><span>كل إجابة صحيحة تشد الحبل خطوة نحو فريقك</span></div><div id="s7race"></div></div>
  <div class="card"><div class="nb-head"><h2>🕵️ من أنا؟</h2><span>أجب من الدليل الأول لتنال 10 نقاط</span></div><div id="s7rid"></div></div>
  ${vcard('islam','كالبنيان المرصوص',`<p>قال رسول الله ﷺ: «المؤمنُ للمؤمنِ كالبُنيانِ، يشدُّ بعضُه بعضًا» <span class="ref">[متفق عليه]</span>. قوة الفريق في تعاون أفراده؛ تمامًا كما تتجمع القوى في الاتجاه نفسه.</p>`)}`,
 init(){STN.s7.r=race($('#s7race'),{theme:'rope',title:'شد الحبل',qs:RQ,how:'فريقان يتناوبان على الإجابة. الإجابة الصحيحة تشد الحبل نحو الفريق. يفوز الفريق الذي يسحب العلم إلى خطه.',rule:'الإجابة الصحيحة = شدة نحو فريقك',winSub:'القوى لم تعد متزنة: المحصلة في صالحكم!'},'s7');
  STN.s7.q=riddles($('#s7rid'),RID,'s7');},
 reset(){STN.s7.r.reset();STN.s7.q.reset();},
 explain:'<p>«شد الحبل» تطبيق حي للقوة المحصلة: كل إجابة صحيحة تضيف قوة لصالح الفريق. و«من أنا؟» تراعي الفروق الفردية: يمكن طلب أدلة إضافية مقابل نقاط أقل.</p>'});

/* ================= CHALLENGE ================= */
def('ch',{n:'تحدي العلماء',plan:3,icon:'<path d="M24 10h32v18a16 16 0 0 1-32 0z" fill="currentColor"/><path d="M24 16H12a10 10 0 0 0 12 14M56 16h12a10 10 0 0 1-12 14" fill="none" stroke="currentColor" stroke-width="5"/><path d="M40 44v14M28 70h24l-3-12H31z" fill="currentColor"/>',
 eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'ثمانية أسئلة متنوعة تقيس أهداف الدرس. لكل سؤال محاولتان.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'القوة',q:'من تأثيرات القوة أنها:',o:['تغيّر الشكل والحجم والموضع والاتجاه','تغيّر كتلة الجسم','تلغي الاحتكاك','لا تؤثر في الأجسام الساكنة'],a:0},
  {k:'القوة المحصلة',t:'calc',p:'قوة 60 نيوتن نحو اليمين وقوة 25 نيوتن نحو اليسار تؤثران في صندوق. ما مقدار القوة المحصلة؟',v:35,unit:'نيوتن',given:'60 يمينًا ، 25 يسارًا',law:'الكبرى − الصغرى',sol:'ق م = 60 − 25 = 35 نيوتن نحو اليمين'},
  {k:'القوى المتزنة',q:'في لعبة شد الحبل لم يتحرك الحبل. ماذا نسمي القوى المؤثرة؟',o:['قوى غير متزنة','قوى متزنة','قوة احتكاك فقط','قوى فعل فقط'],a:1},
  {k:'القانون الأول',q:'ماذا يحدث عندما نسحب الورقة بسرعة من تحت القطعة المعدنية فوق الكأس؟',o:['تتحرك القطعة مع الورقة','تسقط القطعة في الكأس بسبب قصورها الذاتي','تطير القطعة بعيدًا','تبقى معلّقة في الهواء'],a:1},
  {k:'القانون الثاني',t:'calc',p:'دفعت صندوقًا كتلته 25 كجم بقوة محصلة 75 نيوتن. ما تسارعه؟',v:3,unit:'م/ث²',given:'ق = 75 نيوتن ، ك = 25 كجم',law:'ت = ق ÷ ك',sol:'ت = 75 ÷ 25 = 3 م/ث²'},
  {k:'القانون الثاني',t:'calc',p:'ما القوة المحصلة اللازمة لإكساب جسم كتلته 8 كجم تسارعًا مقداره 2 م/ث²؟',v:16,unit:'نيوتن',given:'ك = 8 كجم ، ت = 2 م/ث²',law:'ق = ك × ت',sol:'ق = 8 × 2 = 16 نيوتن'},
  {k:'القانون الثالث',t:'multi',q:'اختر كل الأمثلة على القانون الثالث لنيوتن:',items:[['السبّاح يدفع الماء للخلف فيندفع للأمام',1],['انطلاق الصاروخ إلى أعلى',1],['قفزك من القارب إلى الرصيف فيتحرك القارب للخلف',1],['توقف الكرة المتدحرجة على العشب',0]],why:'توقف الكرة سببه الاحتكاك (القانون الأول/الثاني)، أما البقية فقوى فعل ورد فعل.'},
  {k:'العلاقة',q:'ما العلاقة بين القصور الذاتي وكتلة الجسم؟',o:['كلما زادت الكتلة زاد القصور الذاتي (علاقة طردية)','كلما زادت الكتلة قلّ القصور الذاتي','لا علاقة بينهما','القصور الذاتي يعتمد على اللون'],a:0}],'ch');},
 reset(){STN.ch.c.reset();},explain:'<p>أسئلة التحدي مأخوذة من تقييمات العرض و«اختبر نفسك» ص 61، وتغطي الأهداف الخمسة.</p>'});

K.boot({chapter:'الفصل الثاني: الحركة والقوى والآلات البسيطة',chapterShort:'الفصل الثاني',title:'ساحة نيوتن',lesson:'الدرس الثاني: قوانين نيوتن للحركة',accent:'#2e7031',accentDark:'#6cc77a',hook:'خدعة أم قانون؟ سرّ القطعة النقدية والكأس',
 riddle:'ماذا يحدث للقطعة النقدية عندما نسحب البطاقة من تحتها بسرعة؟ ولماذا؟',predict:{o:['تتحرك مع البطاقة وتسقط على الطاولة','تسقط في الكأس','تطير إلى أعلى'],a:1},
 answer:'تسقط القطعة النقدية في الكأس؛ لأنها تقاوم التغيير في حالتها الحركية (القصور الذاتي)، فلا تتحرك مع البطاقة السريعة. هذا هو القانون الأول لنيوتن: يبقى الجسم الساكن ساكنًا ما لم تؤثر فيه قوة محصلة.',
 finalTitle:'مبارك! أصبحت من تلاميذ نيوتن',homework:'<b>الواجب:</b> «اختبر نفسك» ص 61 · <b>نشاط منزلي:</b> سيارة البالون.',goals:GOALS,
 concepts:[{n:'القوة',t:'دفع أو سحب، رمزها ق ووحدتها النيوتن.',ic:'<path d="M6 26h34M32 16l10 10-10 10" fill="none" stroke="var(--accent)" stroke-width="5"/>'},
  {n:'القوة المحصلة',t:'نجمع القوى في الاتجاه نفسه ونطرح المتعاكسة.',ic:'<rect x="20" y="18" width="14" height="14" fill="var(--amber)"/><path d="M4 25h14M36 25h14" stroke="var(--accent)" stroke-width="5"/>'},
  {n:'القانون الأول',t:'لا تتغير الحالة الحركية ما لم تؤثر قوة محصلة. القصور الذاتي يزيد بزيادة الكتلة.',ic:'<circle cx="26" cy="26" r="10" fill="var(--accent)"/><path d="M2 26h10M40 26h10" stroke="var(--accent)" stroke-width="4" stroke-dasharray="3 3"/>'},
  {n:'الاحتكاك',t:'قوة ممانعة بين السطوح المتلامسة تعمل عكس اتجاه الحركة.',ic:'<path d="M4 38h44" stroke="var(--accent)" stroke-width="3"/><rect x="16" y="20" width="18" height="18" fill="var(--amber)"/>'},
  {n:'القانون الثاني',t:'ت = ق ÷ ك؛ التسارع في اتجاه القوة المحصلة.',ic:'<text x="26" y="32" text-anchor="middle" font-size="16" font-weight="700" fill="var(--accent)">ت=ق÷ك</text>'},
  {n:'القانون الثالث',t:'لكل فعل رد فعل مساوٍ في المقدار ومعاكس في الاتجاه، يؤثران في جسمين مختلفين.',ic:'<path d="M26 26H6M26 26h20" stroke="var(--accent)" stroke-width="5"/><path d="M6 26l8-6v12zM46 26l-8-6v12z" fill="var(--accent)"/>'}]});
})();

