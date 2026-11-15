
/* ===== الدرس الأول: الحركة ===== */
(function(){
const {$,$$,G,STN,def,mcq,calcQ,levels,flips,match,sortGame,tfRound,race,challenge,vcard,ayah,say,num,fmt,parseNum,SFX,css,anticip}=K;
const AR=c=>{c.direction='rtl';c.textAlign='center';};
function car(c,x,y,col,s,flip){s=s||1;c.save();c.translate(x,y);c.scale(flip?-s:s,s);
  c.fillStyle=col;c.beginPath();c.roundRect?c.roundRect(-34,-14,68,18,6):c.rect(-34,-14,68,18);c.fill();
  c.beginPath();c.moveTo(-18,-14);c.lineTo(-10,-27);c.lineTo(12,-27);c.lineTo(22,-14);c.closePath();c.fill();
  c.fillStyle='#cfe8f5';c.beginPath();c.moveTo(-12,-15);c.lineTo(-7,-24);c.lineTo(10,-24);c.lineTo(17,-15);c.closePath();c.fill();
  c.fillStyle='#ffd34d';c.fillRect(30,-10,5,5);
  [[-20,4],[20,4]].forEach(([wx,wy])=>{c.fillStyle='#111';c.beginPath();c.arc(wx,wy,8,0,7);c.fill();c.fillStyle='#bbb';c.beginPath();c.arc(wx,wy,3.5,0,7);c.fill();});c.restore();}
function sky(c,W,H,g){const gr=c.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#bfe3f5');gr.addColorStop(1,'#eaf6fb');c.fillStyle=gr;c.fillRect(0,0,W,H);}

/* ================= INTRO ================= */
def('intro',{n:'الافتتاحية',icon:'<path d="M8 20 Q8 64 40 64 Q72 64 72 20" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><circle cx="58" cy="46" r="8" fill="currentColor"/>',plan:3,
 body:`<div class="hero"><div class="stage"><canvas id="hk" width="720" height="380" aria-label="متزلج على مسار نصف دائري"></canvas>
   <div class="readouts pad"><div class="ro"><small>مقدار السرعة</small><b id="hkV">0</b></div><div class="ro"><small>الحالة</small><b class="ar" id="hkS">ثابت</b></div><div class="ro"><small>الاتجاه</small><b class="ar" id="hkD">—</b></div></div></div>
  <div><span class="eyebrow">تهيئة · أنماط الحركة · كتاب الطالب ص 42–43</span><h2 class="hero-h">احبس أنفاسك!</h2>
   <p class="riddle">عندما يقفز المتزلج في الهواء يتوقف برهة ليغيّر اتجاهه ويبدأ في الهبوط. كيف تتغير حركته عندما يصل إلى أخفض نقطة ثم يبدأ الصعود إلى الجانب الآخر؟</p>
   <p class="q">توقّع: أين تكون سرعة المتزلج أكبر ما يمكن؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="two"><div class="story"><b>في هذا الفصل</b> سوف تتعلم كيف تؤثر القوى في حركة الجسم. نبدأ بالدرس الأول: كيف نصف الحركة بالسرعة والتسارع؟ <br><span class="muted">جرّب: اضغط على المسار لتغيير الارتفاع الذي ينطلق منه المتزلج.</span></div>
   <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div></div>
  <div class="card teacher-only"><h3>كيف سنبدأ؟ التعلم التعاوني</h3><p class="step-text">نترتب في مجموعات (كل 6 طلاب مجموعة)، ونعيّن الأدوار:</p><ul class="tasks plain"><li><b>قائد المجموعة:</b> يتولى قيادة المجموعة ويوجهها ويتابع عمل أفرادها وينسق بينهم.</li><li><b>المقرر:</b> يكتب كل ما توصلت إليه المجموعة.</li><li><b>الملخّص أو الكاتب:</b> يلخص ما توصلت إليه المجموعة.</li><li><b>الباحثون:</b> بقية الأفراد، يجهّزون المصادر والمواد للمجموعة.</li></ul></div>`,
 init(){const cv=$('#hk'),c=cv.getContext('2d'),W=720,H=380;let A=1,t=0,last=performance.now(),run=true;
  const cxm=W/2,R=250,cy=60;const P=th=>({x:cxm+R*Math.sin(th),y:cy+R*Math.cos(th)});
  cv.addEventListener('pointerdown',e=>{const r=cv.getBoundingClientRect(),y=(e.clientY-r.top)/r.height*H;A=Math.max(.35,Math.min(1.25,Math.acos(Math.max(-1,Math.min(1,(y-cy)/R)))));t=0;G.tick();});
  function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;if(G.cur==='intro'&&!G.paused){t+=dt;
    const w=Math.sqrt(9.8/ (R/90)),th=A*Math.cos(w*t),om=-A*w*Math.sin(w*t),sp=Math.abs(om)*R/40;
    sky(c,W,H);c.fillStyle='#8fbf6a';c.fillRect(0,H-40,W,40);
    c.strokeStyle='#5a6b74';c.lineWidth=16;c.beginPath();c.arc(cxm,cy,R,Math.PI/2-1.3,Math.PI/2+1.3);c.stroke();
    c.strokeStyle='#9fb1ba';c.lineWidth=4;c.beginPath();c.arc(cxm,cy,R-8,Math.PI/2-1.3,Math.PI/2+1.3);c.stroke();
    const p=P(th),tang=Math.atan2(-Math.sin(th),Math.cos(th));
    c.save();c.translate(p.x,p.y);c.rotate(-th);c.translate(0,-14);
    c.fillStyle='#222';c.fillRect(-22,6,44,5);c.beginPath();c.arc(-14,13,4,0,7);c.arc(14,13,4,0,7);c.fill();
    c.strokeStyle=css('--accent');c.lineWidth=6;c.lineCap='round';c.beginPath();c.moveTo(-8,6);c.lineTo(-2,-14);c.lineTo(8,6);c.moveTo(-2,-14);c.lineTo(0,-34);c.moveTo(-14,-28);c.lineTo(14,-24);c.stroke();
    c.fillStyle=css('--accent');c.beginPath();c.arc(1,-44,8,0,7);c.fill();c.restore();
    if(sp>.05){const L=Math.min(110,sp*14),dir=om>0?1:-1;c.save();c.translate(p.x,p.y-26);c.rotate(-th);c.strokeStyle=css('--amber');c.fillStyle=css('--amber');c.lineWidth=5;c.beginPath();c.moveTo(0,0);c.lineTo(dir*L,0);c.stroke();c.beginPath();c.moveTo(dir*(L+10),0);c.lineTo(dir*L,-7);c.lineTo(dir*L,7);c.fill();c.restore();}
    const bw=200,bx=20,by=20;c.fillStyle='rgba(255,255,255,.85)';c.fillRect(bx,by,bw+20,44);c.fillStyle='#ddd';c.fillRect(bx+10,by+26,bw,10);c.fillStyle=css('--amber');c.fillRect(bx+10,by+26,bw*Math.min(1,sp/ (A*R*w/40)),10);
    c.fillStyle='#14222b';c.font='700 15px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign='right';c.fillText('مقياس مقدار السرعة',bx+bw+10,by+18);
    $('#hkV').textContent=fmt(sp,1)+' m/s';const acc=Math.sign(om)*Math.sign(-th*om)||0;
    $('#hkS').textContent=sp<.15?'لحظة توقف':(Math.abs(th)<.05?'أقصى سرعة':(th*om<0?'تتزايد السرعة':'تتناقص السرعة'));$('#hkD').textContent=sp<.15?'يتغير':(om>0?'نحو اليمين':'نحو اليسار');}
    requestAnimationFrame(frame);}
  requestAnimationFrame(frame);}
});

/* ================= STARTER p43 ================= */
def('starter',{n:'التجربة الاستهلالية',eyebrow:'تجربة استهلالية · الكتاب صفحة 43',title:'نموذج الحركة على مسار نصف دائري',goal:'يجعل متزلجو اللوح هذه الحركة على مسار يشبه نصف الأنبوب تبدو سهلة… فكيف تتغير الحركة؟',plan:4,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="two"><div class="card"><p class="step-text">يجعل متزلجو اللوح الحركة على مسار يشبه نصف الأنبوب تبدو سهلة، فهم يندفعون إلى أسفل أحد الجانبين، ثم يصعدون إلى الجانب الآخر، ويرتفعون فوق الحافة حيث يلتفون في الهواء، ثم يعودون. إنهم يتمرنون على هذه الحركات حتى يتقنوها. سوف تتعلم في هذا الفصل كيف يمكن تفسير هذه الحركة المعقدة بفهم تأثير القوى، ومنها قوة الجاذبية.</p></div><div class="card"><h3>خطوات التجربة</h3><ol class="step-text" style="line-height:1.9"><li>استعمل ورق كرتون أو قطعة كرتون لعمل مسار على هيئة حرف U بين مجموعتين من الكتب، ليكون نموذجًا لنصف أنبوب.</li><li>أفلت الكرة الزجاجية عند نقطة قريبة من قاع المنحدر، وراقب حركتها: إلى أي ارتفاع تصل؟ أين تكون سرعتها أكبر ما يمكن؟</li><li>أفلت الكرة الزجاجية عند نقطة قرب حافة المنحدر، وقارن حركتها مع حركتها في الخطوة ٢.</li><li><b>التفكير الناقد:</b> صف كيف أثّرت نقطة بدء الحركة في الارتفاع الذي تصل إليه الكرة الزجاجية في الجانب الآخر.</li></ol><p class="muted">جرّبوها تفاعليًّا في الافتتاحية: اضغط على المسار لتغيير ارتفاع الانطلاق.</p></div></div>',
 init(){},enter(){G.complete('starter');},reset(){},explain:'<p>كلما بدأت الكرة من نقطة أعلى وصلت إلى ارتفاع أكبر في الجانب الآخر، وتكون سرعتها أكبر ما يمكن عند قاع المسار.</p>'});
/* ================= المطويات وتوجيه القراءة ================= */
def('fold',{n:'المطويات وتوجيه القراءة',eyebrow:'المطويات · التسليم يوم الخميس',title:'المطويات وتوجيه القراءة',goal:'سجّل رأيك في كل عبارة: م (موافق) أو غ (غير موافق)، ثم اكشف الإجابات بعد القراءة.',plan:3,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="card"><h3>المطويات: وصف وتفسير الحركة والقوى والآلات البسيطة</h3><ol class="step-text" style="line-height:1.9"><li>اطوِ ورقة طوليًّا من الحافة إلى الحافة، وهي في الوضع الرأسي، واجعل الحافة الأمامية أقصر ١ سم من الحافة الخلفية.</li><li>اقلب الورقة واطوِها إلى ثلاثة أجزاء.</li><li>قطع الطبقة العليا فقط على طول المطوية لعمل ثلاثة أجزاء.</li><li>اكتب عنوانًا لكل جزء: ما أعرف · ماذا أود أن أعرف · ماذا تعلمت.</li></ol><p class="muted"><b>حدد الأسئلة:</b> قبل قراءة الفصل اكتب ما تعرفه عن الحركة والقوى والآلات البسيطة تحت اللسان الأيمن، واكتب أسئلة عما تود معرفته تحت اللسان الأوسط، وبعد قراءة الفصل دوّن ما تعلمته تحت اللسان الأيسر.</p></div><div class="card"><h3>توجيه القراءة وتركيزها · الكتاب صفحة 45 · خمس دقائق</h3><div id="foldAg"></div></div>',
 init(){anticip($('#foldAg'),[['تشير قراءة مقياس السرعة في السيارة إلى متوسط سرعة السيارة.',false,'عدّاد السرعة يقيس السرعة اللحظية.'],['إذا كان تسارع الجسم صفرًا فإن سرعته لا تتغير.',true],['إذا تغير مقدار السرعة دون تغير اتجاهها فإن السرعة المتجهة لم تتغير.',false,'السرعة المتجهة تتغير بتغير المقدار أو الاتجاه.'],['يمكن للجسم الذي تؤثر فيه قوى محصلتها صفر أن يكون متحركًا.',true,'يستمر في حركته بسرعة ثابتة وفي خط مستقيم (القانون الأول لنيوتن).'],['يعتمد تسارع الجسم على القوة المحصلة المؤثرة فيه فقط.',false,'يعتمد على القوة المحصلة وكتلة الجسم: ت = ق ÷ ك.'],['عندما تقفز إلى أعلى فإن الأرض تؤثر فيك بقوة إلى أعلى.',true,'تدفع الأرض بقدميك فتدفعك الأرض إلى أعلى (الفعل ورد الفعل).'],['أنت تبذل شغلًا عندما تدفع الحائط مع أن الحائط لا يتحرك.',false,'لا يُبذل شغل لأن الإزاحة صفر.'],['يعد المستوى المائل من الآلات البسيطة.',true],['في بعض الآلات يكون الشغل الناتج أكبر من الشغل المبذول.',false,'الشغل الناتج لا يكون أكبر من الشغل المبذول.']]);},enter(){G.complete('fold');},reset(){STN['fold'].init();},explain:'<p>دليل توقعات للفصل كله: يسجّل الطالب رأيه قبل القراءة، ويعود إليه بعد دراسة الدروس الثلاثة.</p>'});
/* ================= GOALS & TERMS ================= */
const TERMS=[
 {t:'السرعة المتوسطة',d:'المسافة المقطوعة خلال زمن معين: المسافة الكلية ÷ الزمن الكلي (ع = ف ÷ ز).',ic:'<path d="M4 30h32M28 22l8 8-8 8" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="12" cy="14" r="8" fill="none" stroke="currentColor" stroke-width="3"/>'},
 {t:'السرعة اللحظية',d:'سرعة الجسم في لحظة زمنية معينة، مثل قراءة عدّاد السرعة في السيارة.',ic:'<path d="M6 30a14 14 0 0 1 28 0" fill="none" stroke="currentColor" stroke-width="4"/><path d="M20 30l8-10" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>'},
 {t:'السرعة الثابتة',d:'السرعة التي تبقى ثابتة مع الزمن (لا تتغير)؛ يقطع الجسم مسافات متساوية في أزمنة متساوية.',ic:'<path d="M4 28h32" stroke="currentColor" stroke-width="3"/><circle cx="8" cy="20" r="4" fill="currentColor"/><circle cx="20" cy="20" r="4" fill="currentColor"/><circle cx="32" cy="20" r="4" fill="currentColor"/>'},
 {t:'السرعة المتجهة',d:'مقدار سرعة الجسم واتجاه حركته.',ic:'<path d="M6 32L32 8M20 8h12v12" fill="none" stroke="currentColor" stroke-width="4"/>'},
 {t:'التسارع',d:'التغير في السرعة المتجهة مقسومًا على الزمن اللازم لهذا التغير: ت = (ع₂ − ع₁) ÷ ز.',ic:'<path d="M4 34L34 6" stroke="currentColor" stroke-width="4"/><path d="M8 34h4M16 30h6M26 24h8" stroke="currentColor" stroke-width="3"/>'}];
const GOALS=['تعرّف كلًّا من السرعة والتسارع.','تربط التسارع بالتغير في السرعة.','تحسب كلًّا من المسافة والسرعة والتسارع.'];
def('goals',{n:'الأهداف والمصطلحات',eyebrow:'قبل أن ننطلق',title:'خريطة الرحلة: الأهداف والمصطلحات',goal:'تعرّف ما ستتعلمه اليوم، واقلب بطاقات المصطلحات، ثم طابق كل مصطلح بمعناه.',plan:4,
 icon:'<rect x="12" y="8" width="56" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 26h32M24 40h32M24 54h20" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
 body:`<div class="two"><div class="card"><h3>الفكرة الرئيسة</h3><p class="lead"><b>يتسارع الجسم عندما يتغير مقدار سرعته أو اتجاه حركته.</b></p><h3 class="mt">أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><p class="src-note">من عرض الدرس الأول «الحركة».</p></div>
  <div class="side">${vcard('islam','الكون كله في حركة متقنة',`${ayah('وَتَرَى الْجِبَالَ تَحْسَبُهَا جَامِدَةً وَهِيَ تَمُرُّ مَرَّ السَّحَابِ ۚ صُنْعَ اللَّهِ الَّذِي أَتْقَنَ كُلَّ شَيْءٍ','النمل: 88')}<p class="mt">حتى ما نراه ساكنًا يتحرك مع الأرض. دراسة الحركة تكشف لنا جانبًا من إتقان الخالق سبحانه.</p>`)}
   ${vcard('islam','حركة بتقدير دقيق',`${ayah('وَالشَّمْسُ تَجْرِي لِمُسْتَقَرٍّ لَّهَا ۚ ذَٰلِكَ تَقْدِيرُ الْعَزِيزِ الْعَلِيمِ','يس: 38')}`)}</div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المصطلحات</h2><span>المس البطاقة لترى التعريف</span></div><div id="g1flips"></div></div>
  <div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2><span>اختر المصطلح ثم تعريفه</span></div><div id="g1match"></div></div>`,
 init(){flips($('#g1flips'),TERMS);this.reset();},
 reset(){match($('#g1match'),TERMS.map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));},
 explain:'<p>هذه المحطة تمهّد للدرس: الفكرة الرئيسة والأهداف الثلاثة، ثم المفردات الخمس التي ستتكرر في المحطات.</p>'
});

/* ================= S1: average speed ================= */
const VEH=[{n:'عدّاء',v:5,c:'#c97c06'},{n:'دراجة',v:8,c:'#1f7a45'},{n:'سيارة',v:20,c:'#d9483b'},{n:'قطار',v:25,c:'#0b6884'}];
def('s1',{n:'1 · السرعة المتوسطة',eyebrow:'المحطة 1',title:'حلبة القياس: السرعة المتوسطة',goal:'لوصف سرعة جسم يجب أن تعرف شيئين: المسافة التي قطعها، والزمن الذي احتاج إليه. شغّل الحلبة، واقرأ المسافة والزمن، ثم احسب السرعة.',plan:7,core:1,
 icon:'<circle cx="40" cy="44" r="26" fill="none" stroke="currentColor" stroke-width="6"/><path d="M40 44l12-14M34 8h12M40 8v10" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
 body:`<div class="two"><div class="stage"><canvas id="s1c" width="720" height="300" aria-label="حلبة قياس المسافة والزمن"></canvas>
   <div class="sim-bar"><span class="seg" id="s1veh">${VEH.map((v,i)=>`<button type="button" data-v="${i}" class="${i===2?'on':''}">${v.n}</button>`).join('')}</span>
   <label for="s1T" style="font-weight:700">زمن التشغيل: <b id="s1Tv" class="kbd-num">4</b> ث</label><input type="range" id="s1T" min="2" max="5" step="1" value="4" style="max-width:150px">
   <button class="btn" type="button" id="s1run">انطلق</button><button class="btn alt" type="button" id="s1rst">إعادة</button></div>
   <div class="readouts pad"><div class="ro"><small>المسافة ف</small><b id="s1d">0 m</b></div><div class="ro"><small>الزمن ز</small><b id="s1t">0.0 s</b></div><div class="ro"><small>السرعة ع</small><b id="s1v">؟</b></div></div></div>
  <div class="side"><div class="card" id="s1card"></div>
   <div class="card"><h3>مثلث الكميات</h3><p class="step-text muted" style="font-size:.9rem">المس الكمية المطلوبة لتغطيتها، فيظهر القانون الذي يحسبها.</p><svg class="tri" id="s1tri" viewBox="0 0 300 220"></svg><p class="eq" id="s1eq">ع = ف ÷ ز<small>السرعة المتوسطة = المسافة المقطوعة ÷ الزمن الكلي</small></p></div></div></div>
  <div class="two"><div class="card"><h3>لنتأمل حركة هذه السيارة</h3><p class="step-text">تقطع السيارة <b>مترًا واحدًا كل ثانية</b>. اربط بين المسافة والزمن:</p><div id="s1q1"></div></div>
  ${vcard('islam','الاعتدال في السرعة',`${ayah('وَاقْصِدْ فِي مَشْيِكَ','لقمان: 19')}<p class="mt">يدعونا الإسلام إلى الاعتدال حتى في المشي. والسرعة المعتدلة على الطريق تحفظ الأرواح.</p><p class="muted" style="font-size:.88rem">تذكّر: القانون العلمي يصف ما يحدث ولا يفسّر سبب حدوثه.</p>`)}</div>`,
 init(){const cv=$('#s1c'),c=cv.getContext('2d'),W=720,H=300,X0=60,X1=680,LEN=100;let S;
  const tri=$('#s1tri');let cover='v';
  const drawTri=()=>{const a=css('--accent'),am=css('--amber');const cell=(k,path,tx,ty,lab)=>`<g class="cell" data-k="${k}"><path d="${path}" fill="${cover===k?am:a}" opacity="${cover===k?1:.85}"/><text x="${tx}" y="${ty}" text-anchor="middle" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="30" fill="#fff" direction="rtl">${lab}</text></g>`;
   tri.innerHTML=cell('d','M150 6 L222 110 L78 110 Z',150,92,'ف')+cell('t','M75 114 L148 114 L148 214 L6 214 Z',105,184,'ز')+cell('v','M152 114 L225 114 L294 214 L152 214 Z',195,184,'ع')+`<circle cx="150" cy="112" r="11" fill="var(--surface)" stroke="var(--line)"/><text x="150" y="118" text-anchor="middle" font-size="18" fill="var(--ink)">÷</text><circle cx="150" cy="164" r="11" fill="var(--surface)" stroke="var(--line)"/><text x="150" y="170" text-anchor="middle" font-size="16" fill="var(--ink)">×</text>`;
   tri.querySelectorAll('.cell').forEach(g=>g.onclick=()=>{cover=g.dataset.k;G.tick();drawTri();
     $('#s1eq').innerHTML={v:'ع = ف ÷ ز<small>السرعة المتوسطة = المسافة ÷ الزمن</small>',d:'ف = ع × ز<small>المسافة = السرعة × الزمن</small>',t:'ز = ف ÷ ع<small>الزمن = المسافة ÷ السرعة</small>'}[cover];});};
  drawTri();
  function reset(){S={vi:S?S.vi:2,T:+$('#s1T').value,t:0,run:false,done:false,marks:[],tries:0,ok:false};draw();card();}
  function draw(){sky(c,W,H);c.fillStyle='#8fbf6a';c.fillRect(0,H-70,W,70);c.fillStyle='#4a5a62';c.fillRect(0,H-150,W,80);
   c.strokeStyle='#fff';c.setLineDash([20,16]);c.lineWidth=3;c.beginPath();c.moveTo(0,H-110);c.lineTo(W,H-110);c.stroke();c.setLineDash([]);
   c.fillStyle='#14222b';c.font='12px "Share Tech Mono"';c.textAlign='center';
   for(let m=0;m<=LEN;m+=10){const x=X0+(X1-X0)*m/LEN;c.fillRect(x-1,H-70,2,m%50?8:14);c.fillText(m+' m',x,H-44);}
   S.marks.forEach((m,i)=>{const x=X0+(X1-X0)*m.d/LEN;c.fillStyle=css('--amber');c.beginPath();c.moveTo(x,H-150);c.lineTo(x-6,H-162);c.lineTo(x+6,H-162);c.fill();c.fillStyle='#14222b';c.font='11px "Share Tech Mono"';c.fillText(m.t+'s',x,H-166);});
   const v=VEH[S.vi],d=Math.min(LEN,v.v*S.t),x=X0+(X1-X0)*d/LEN;
   if(v.n==='عدّاء'){c.save();c.translate(x,H-112);c.strokeStyle=v.c;c.lineWidth=6;c.lineCap='round';const k=Math.sin(S.t*14)*10;c.beginPath();c.moveTo(0,-20);c.lineTo(k,4);c.moveTo(0,-20);c.lineTo(-k,4);c.moveTo(0,-20);c.lineTo(0,-44);c.moveTo(-12,-36+k/2);c.lineTo(12,-36-k/2);c.stroke();c.fillStyle=v.c;c.beginPath();c.arc(0,-54,8,0,7);c.fill();c.restore();}
   else if(v.n==='دراجة'){c.save();c.translate(x,H-108);c.strokeStyle=v.c;c.lineWidth=4;c.beginPath();c.arc(-18,0,12,0,7);c.arc(18,0,12,0,7);c.stroke();c.beginPath();c.moveTo(-18,0);c.lineTo(-4,-18);c.lineTo(12,-18);c.lineTo(18,0);c.moveTo(-4,-18);c.lineTo(0,0);c.stroke();c.fillStyle=v.c;c.beginPath();c.arc(0,-40,8,0,7);c.fill();c.beginPath();c.moveTo(0,-32);c.lineTo(-4,-18);c.stroke();c.restore();}
   else if(v.n==='قطار'){c.save();c.translate(x,H-110);c.fillStyle=v.c;c.beginPath();c.moveTo(-70,-30);c.lineTo(20,-30);c.quadraticCurveTo(44,-28,48,0);c.lineTo(-70,0);c.fill();c.fillStyle='#cfe8f5';for(let k=0;k<4;k++)c.fillRect(-62+k*20,-24,14,10);c.fillStyle='#fff';c.fillRect(-70,-8,118,3);c.restore();}
   else car(c,x,H-104,v.c,1.1);
   c.font='700 13px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign='right';c.fillStyle='#14222b';c.fillText('بداية الحركة',X0+40,H-14);c.textAlign='left';c.fillText('نهاية المسار',X1-50,H-14);c.direction='ltr';
   $('#s1d').textContent=fmt(d,0)+' m';$('#s1t').textContent=fmt(S.t,1)+' s';$('#s1v').textContent=S.ok?fmt(v.v,0)+' m/s':'؟';}
  function card(){const el=$('#s1card'),v=VEH[S.vi];
   if(!S.done){el.innerHTML=`<h3>المهمة</h3><p class="step-text">اختر المتحرك وزمن التشغيل، ثم اضغط «انطلق». تظهر علامة على المسار عند كل ثانية.</p><ul class="tasks"><li class="${G.done.s1?'ok':''}">قِس المسافة والزمن لثلاثة متحركات مختلفة على الأقل (${(STN.s1.cnt||new Set()).size}/3).</li></ul>`;return;}
   const d=v.v*S.T;el.innerHTML=`<h3>احسب السرعة المتوسطة</h3><p class="step-text">قطع ${v.n} ${d} مترًا في ${S.T} ثوانٍ. كم سرعته المتوسطة؟</p><form class="answer" id="s1f" autocomplete="off"><label><input id="s1a" inputmode="decimal" aria-label="السرعة"><span class="unit">م/ث</span></label><button class="btn" type="submit">تحقق</button></form>${G.teacher?`<div class="teacher-hint">للمعلم: ${v.v} م/ث</div>`:''}<div id="s1fb"></div>`;
   $('#s1f').onsubmit=e=>{e.preventDefault();if(S.ok)return;const x=parseNum($('#s1a').value);if(isNaN(x))return;
    if(Math.abs(x-v.v)<.05){S.ok=true;G.good();G.add(S.tries?4:10,'s1');STN.s1.cnt.add(S.vi);say($('#s1fb'),'ok',`صحيح: ع = ف ÷ ز = ${d} ÷ ${S.T} = ${v.v} م/ث. ${STN.s1.cnt.size<3?'جرّب متحركًا آخر.':''}`);draw();if(STN.s1.cnt.size>=3)G.complete('s1');}
    else{S.tries++;G.bad();say($('#s1fb'),'bad',S.tries>1?`اقسم المسافة على الزمن: ${d} ÷ ${S.T}`:'تذكّر: السرعة = المسافة ÷ الزمن.');}};}
  STN.s1.cnt=new Set();
  $('#s1veh').onclick=e=>{const b=e.target.closest('[data-v]');if(!b||S.run)return;S.vi=+b.dataset.v;$$('#s1veh button').forEach(x=>x.classList.toggle('on',x===b));reset();};
  $('#s1T').oninput=e=>{$('#s1Tv').textContent=e.target.value;if(!S.run)reset();};
  $('#s1rst').onclick=()=>{S.run=false;reset();};
  $('#s1run').onclick=()=>{if(S.run)return;reset();S.run=true;SFX.engine();let last=performance.now(),nextMark=0;S.marks=[{d:0,t:0}];
   const step=now=>{if(!S.run)return;const dt=(now-last)/1000;last=now;if(!G.paused&&G.cur==='s1'){S.t=Math.min(S.T,S.t+dt);const s=Math.floor(S.t+1e-6);if(s>nextMark){nextMark=s;S.marks.push({d:VEH[S.vi].v*s,t:s});SFX.tick();}}
     draw();if(S.t>=S.T){S.run=false;S.done=true;card();return;}requestAnimationFrame(step);};requestAnimationFrame(step);};
  this.reset=()=>{STN.s1.cnt=new Set();S=null;S={vi:2};reset();};reset();
  mcq($('#s1q1'),{q:'إذا قطعت السيارة مترًا واحدًا في كل ثانية، فكم مترًا تقطع في 3 ثوانٍ؟',o:['1 م','3 م','6 م','30 م'],a:1,cols:true,why:'ف = ع × ز = 1 × 3 = 3 م.'},'s1');},
 quiz:[{q:'تعتمد السرعة على عاملين رئيسين هما:',o:['القوة والكتلة','المسافة والطاقة','المسافة والزمن','المسافة والتسارع'],a:2,why:'ع = ف ÷ ز.'},
  {q:'أي الخيارات التالية تمثّل صيغة صحيحة لقانون السرعة؟',o:['ع = ز ÷ ف','ع = ف ÷ ز','ع = ف × ز','ع = ز × ف'],a:1}],
 explain:'<p><b>السرعة المتوسطة</b> هي المسافة المقطوعة خلال زمن معين، وتُحسب بقسمة المسافة الكلية على الزمن الكلي: <b>ع = ف ÷ ز</b>، ووحدتها م/ث أو كم/س.</p><p>من القانون نفسه نستنتج: <b>ف = ع × ز</b> و <b>ز = ف ÷ ع</b>. لاحظ أن وحدة الزمن في السرعة وفي الفترة الزمنية يجب أن تكون نفسها.</p>'
});

/* ================= مسائل السرعة المتوسطة (مسائل العرض في موضعها) ================= */
def('p1',{n:'2 · مسائل السرعة المتوسطة',eyebrow:'المحطة 2 · تطبيق الرياضيات ومسائل تدريبية ص 47',title:'مسائل السرعة المتوسطة',goal:'حل معادلة بسيطة: استعمل مثلث الكميات (ع = ف ÷ ز).',plan:4,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="card" id="p1Box"></div>',
 init(){const P=[{tag:'تطبيق الرياضيات · سرعة الدراجة',p:'إذا احتجت وأنت تركب دراجتك إلى 30 دقيقة للوصول إلى بيت صديقك الذي يبعد 9 كيلومترات، فما مقدار سرعتك المتوسطة؟',v:18,unit:'كم/س',given:'ف = 9 كم ، ز = 30 دقيقة = 0.5 ساعة',want:'ع = ؟',law:'ع = ف ÷ ز',sol:'ع = 9 ÷ 0.5 = 18 كم/س',hint:'حوّل 30 دقيقة إلى ساعة أولًا.'},{tag:'مسائل تدريبية ١',p:'تقطع طائرة 1350 كم في 3 ساعات. احسب سرعتها المتوسطة.',v:450,unit:'كم/س',given:'ف = 1350 كم ، ز = 3 ساعات',want:'ع = ؟',law:'ع = ف ÷ ز',sol:'ع = 1350 ÷ 3 = 450 كم/س'},{tag:'مسائل تدريبية ٢ · تحويل وحدات',p:'حدد السرعة المتوسطة بوحدات كم/ساعة لمتسابق يقطع مسافة 5 كم في 18 دقيقة.',v:16.67,tol:.1,unit:'كم/س',given:'ف = 5 كم ، ز = 18 دقيقة = 18 ÷ 60 = 0.3 ساعة',want:'ع = ؟ (كم/س)',law:'ع = ف ÷ ز',sol:'ع = 5 ÷ 0.3 ≈ 16.7 كم/س',hint:'حوّل الدقائق إلى ساعات بالقسمة على 60.'}];const box=$('#p1Box');const solved=P.map(()=>false);box.innerHTML='<div class="prob-list"></div>';const L=box.querySelector('.prob-list');
  P.forEach((q,i)=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+(i+1)+'</span>'+(q.tag?'<span>'+q.tag+'</span>':'')+'</div>';const inner=document.createElement('div');d.appendChild(inner);L.appendChild(d);
   const fin=()=>{solved[i]=true;d.classList.add('solved');if(solved.every(Boolean))G.complete('p1');};if(q.o)mcq(inner,q,'p1',fin);else calcQ(inner,q,'p1',fin);});},
 reset(){STN['p1'].init();},
 explain:'<p>مسائل العرض في موضعها من الدرس، بالترتيب نفسه. أزرار المساعدة تكشف المعطيات ثم القانون ثم الحل.</p>'});
/* ================= S2: instantaneous, constant, velocity ================= */
def('s2',{n:'3 · السرعة اللحظية والمتجهة',eyebrow:'المحطة 3',title:'قيادة ذكية: السرعة اللحظية والثابتة والمتجهة',goal:'قُد السيارة، وراقب عدّاد السرعة. متى تساوي السرعة اللحظية السرعة المتوسطة؟ وماذا يقيس نظام «ساهر»؟',plan:7,core:1,
 icon:'<path d="M10 56a30 30 0 0 1 60 0" fill="none" stroke="currentColor" stroke-width="7"/><path d="M40 56l16-20" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><circle cx="40" cy="56" r="6" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><canvas id="s2c" width="720" height="300" aria-label="سيارة على طريق مع عداد سرعة وكاميرا ساهر"></canvas>
   <div class="sim-bar"><button class="btn" type="button" id="s2gas">⬆ دوّاسة الوقود (اضغط مطولًا)</button><button class="btn alt" type="button" id="s2brk">⬇ المكابح</button><button class="tbtn" type="button" id="s2cru" aria-pressed="false">مثبت السرعة</button><button class="tbtn" type="button" id="s2rst">رحلة جديدة</button></div>
   <div class="readouts pad"><div class="ro"><small>السرعة اللحظية (العدّاد)</small><b id="s2vi">0 km/h</b></div><div class="ro"><small>المسافة</small><b id="s2d">0 m</b></div><div class="ro"><small>زمن الرحلة</small><b id="s2t">0 s</b></div><div class="ro"><small>السرعة المتوسطة</small><b id="s2va">0 km/h</b></div></div></div>
  <div class="side"><div class="card"><h3>مهام القيادة</h3><ul class="tasks" id="s2tasks"></ul><div id="s2fb"></div></div>
   ${vcard('nation','نظام «ساهر» في المملكة',`<p>كاميرات «ساهر» على طرق المملكة ترصد <b>السرعة اللحظية</b> للمركبة لحظة مرورها، لا سرعتها المتوسطة طوال الرحلة؛ حفاظًا على الأرواح وتنظيمًا لحركة المرور.</p>`)}</div></div>
  <div class="two"><div class="card"><h3>ما رأيك في ردّ السائق على رجل المرور؟</h3><div class="story" style="margin-bottom:10px"><b>رجل المرور:</b> تجاوزتَ السرعة القصوى 60 km/h.<br><b>السائق:</b> قطعتُ مسافة 90 km خلال ساعة ونصف، إذن سرعتي 60 km/h فقط!</div><div id="s2q"></div></div>
   ${vcard('islam','حفظ النفس من الضرورات',`${ayah('وَلَا تُلْقُوا بِأَيْدِيكُمْ إِلَى التَّهْلُكَةِ ۛ وَأَحْسِنُوا ۛ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ','البقرة: 195')}<p class="mt">الالتزام بحدود السرعة عبادة نحفظ بها أنفسنا وأرواح الآخرين.</p>`)}</div>
  <div class="card"><div class="nb-head"><h2>مختبر السرعة المتجهة</h2><span>السرعة المتجهة = مقدار السرعة + اتجاه الحركة</span></div>
   <div class="two"><div class="stage"><canvas id="s2v" width="720" height="320" aria-label="سهم السرعة المتجهة لسيارة"></canvas>
     <div class="sim-bar"><span class="seg" id="s2mode"><button type="button" data-m="0" class="on">تغيّر المقدار</button><button type="button" data-m="1">تغيّر الاتجاه</button><button type="button" data-m="2">تغيّر المقدار والاتجاه معًا</button></span></div></div>
    <div><p class="step-text">تتغير السرعة المتجهة لجسم إذا تغيّر <b>مقدار</b> سرعته، أو تغيّر <b>اتجاه</b> حركته، أو تغيّرا <b>معًا</b>. طول السهم يمثل المقدار، واتجاهه يمثل اتجاه الحركة.</p><div class="readouts"><div class="ro"><small>مقدار السرعة</small><b id="s2vm">—</b></div><div class="ro"><small>الاتجاه</small><b class="ar" id="s2vd">—</b></div><div class="ro"><small>هل تتغير السرعة المتجهة؟</small><b class="ar" id="s2vc">—</b></div></div><div id="s2q2" class="mt"></div></div></div></div>`,
 init(){const cv=$('#s2c'),c=cv.getContext('2d'),W=720,H=300;let S;const LIM=60,CAM=500;
  const T=[{k:'cru',t:'ثبّت السرعة عند 60 km/h بالضبط (استخدم مثبت السرعة) لمدة 3 ثوانٍ: هذه سرعة ثابتة.'},{k:'cam',t:'مرّ بكاميرا «ساهر» دون أن تتجاوز السرعة القصوى 60 km/h.'},{k:'stop',t:'توقّف تمامًا ثم انطلق من جديد، وقارن السرعة اللحظية بالسرعة المتوسطة.'}];
  function reset(){S={v:0,d:0,t:0,gas:false,brk:false,cru:false,cruT:0,done:{},marks:[],stopped:false,flash:0,lastCam:-1,msg:''};$('#s2cru').setAttribute('aria-pressed','false');tasks();}
  function tasks(){$('#s2tasks').innerHTML=T.map(x=>`<li class="${S.done[x.k]?'ok':''}">${x.t}</li>`).join('');}
  function hit(k,m){if(S.done[k])return;S.done[k]=true;G.good();G.add(10,'s2');tasks();say($('#s2fb'),'ok',m);if(T.every(x=>S.done[x.k])&&STN.s2.q)G.complete('s2');}
  const hold=(id,k)=>{const b=$(id);const on=e=>{e.preventDefault();S[k]=true;if(k==='gas'||k==='brk'){S.cru=false;$('#s2cru').setAttribute('aria-pressed','false');}};const off=()=>{S[k]=false;};
   b.addEventListener('pointerdown',on);['pointerup','pointerleave','pointercancel'].forEach(t=>b.addEventListener(t,off));b.addEventListener('contextmenu',e=>e.preventDefault());};
  hold('#s2gas','gas');hold('#s2brk','brk');
  $('#s2cru').onclick=()=>{S.cru=!S.cru;$('#s2cru').setAttribute('aria-pressed',S.cru);G.tick();};
  $('#s2rst').onclick=()=>{reset();G.tick();};
  function gauge(x,y,r,v){c.save();c.translate(x,y);c.fillStyle='#111';c.beginPath();c.arc(0,0,r+8,0,7);c.fill();c.strokeStyle='#333';c.lineWidth=3;c.stroke();
   for(let k=0;k<=160;k+=20){const a=Math.PI*.75+k/160*Math.PI*1.5;c.strokeStyle=k>LIM?'#f07059':'#fff';c.lineWidth=k%40?2:3;c.beginPath();c.moveTo(Math.cos(a)*(r-4),Math.sin(a)*(r-4));c.lineTo(Math.cos(a)*(r-14),Math.sin(a)*(r-14));c.stroke();
    if(k%40===0){c.fillStyle='#fff';c.font='12px "Share Tech Mono"';c.textAlign='center';c.fillText(k,Math.cos(a)*(r-26),Math.sin(a)*(r-26)+4);}}
   const a=Math.PI*.75+Math.min(160,v)/160*Math.PI*1.5;c.strokeStyle='#ffb648';c.lineWidth=4;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(a)*(r-10),Math.sin(a)*(r-10));c.stroke();c.fillStyle='#ffb648';c.beginPath();c.arc(0,0,6,0,7);c.fill();
   c.fillStyle='#ffb648';c.font='16px "Share Tech Mono"';c.fillText(Math.round(v)+' km/h',0,r-18);c.restore();}
  let last=performance.now();
  function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;
   if(G.cur==='s2'&&!G.paused){if(S.gas)S.v=Math.min(150,S.v+28*dt);else if(S.brk)S.v=Math.max(0,S.v-55*dt);else if(!S.cru)S.v=Math.max(0,S.v-3*dt);
    if(S.cru&&Math.abs(S.v-LIM)<1.5)S.v=LIM;
    const ms=S.v/3.6;S.d+=ms*dt;if(S.v>0.5||S.d>0)S.t+=dt;
    if(S.cru&&S.v===LIM){S.cruT+=dt;const s=Math.floor(S.cruT);if(!S.marks.length||S.marks[S.marks.length-1].s<s){S.marks.push({s,d:S.d});}if(S.cruT>=3)hit('cru','ممتاز! قطعت السيارة مسافات متساوية في أزمنة متساوية: هذه سرعة ثابتة، وفيها تتساوى السرعة اللحظية والمتوسطة.');}else{S.cruT=0;if(!S.cru)S.marks=[];}
    if(S.v<0.5&&S.d>30)S.stopped=true;
    if(S.stopped&&S.v>30&&!S.done.stop)hit('stop',`لاحظ: العدّاد يقرأ ${Math.round(S.v)} km/h بينما السرعة المتوسطة للرحلة ${Math.round(S.d/S.t*3.6)} km/h. السرعة اللحظية تتغير لحظة بلحظة.`);
    const cam=Math.floor(S.d/CAM);if(cam>S.lastCam&&S.d>CAM*.9){S.lastCam=cam;S.flash=1;SFX.pop();
     if(S.v<=LIM+.5&&S.v>20)hit('cam',`سجّلت الكاميرا سرعتك اللحظية ${Math.round(S.v)} km/h. لا مخالفة، أحسنت!`);
     else if(S.v>LIM+.5){G.bad();say($('#s2fb'),'bad',`⚠ سجّل «ساهر» سرعتك اللحظية ${Math.round(S.v)} km/h وهي أكبر من 60 km/h: مخالفة! خفّف السرعة قبل الكاميرا التالية.`);}}
    S.flash=Math.max(0,S.flash-dt*2);}
   sky(c,W,H);const off=(S.d*6)%W;
   c.fillStyle='#c9d6dc';for(let k=0;k<6;k++){const bx=((k*150-S.d*2)%900+900)%900-90;c.fillRect(bx,90-(k%3)*20,70,110+(k%3)*20);}
   c.fillStyle='#8fbf6a';c.fillRect(0,200,W,100);c.fillStyle='#4a5a62';c.fillRect(0,206,W,64);
   c.strokeStyle='#fff';c.lineWidth=4;c.setLineDash([30,26]);c.lineDashOffset=off;c.beginPath();c.moveTo(0,238);c.lineTo(W,238);c.stroke();c.setLineDash([]);
   const camX=((CAM-(S.d%CAM))*6)+260;if(camX<W+40){c.fillStyle='#555';c.fillRect(camX,120,6,86);c.fillStyle='#222';c.fillRect(camX-20,112,34,20);c.fillStyle='#ffd34d';c.fillRect(camX-16,116,8,8);
    c.fillStyle='#fff';c.beginPath();c.arc(camX+40,140,20,0,7);c.fill();c.strokeStyle='#d9483b';c.lineWidth=5;c.stroke();c.fillStyle='#111';c.font='bold 16px "Share Tech Mono"';c.textAlign='center';c.fillText('60',camX+40,146);c.fillRect(camX+38,160,4,46);
    c.font='700 12px "IBM Plex Sans Arabic"';c.direction='rtl';c.fillText('ساهر',camX-3,106);c.direction='ltr';}
   S.marks.forEach(m=>{const x=260-(S.d-m.d)*6;if(x>-10){c.fillStyle=css('--amber');c.fillRect(x-2,270,4,14);c.font='11px "Share Tech Mono"';c.fillText(m.s+'s',x,296);}});
   car(c,260,240,'#d9483b',1.3);gauge(620,96,72,S.v);
   if(S.flash>0){c.fillStyle=`rgba(255,255,255,${S.flash*.8})`;c.fillRect(0,0,W,H);}
   $('#s2vi').textContent=Math.round(S.v)+' km/h';$('#s2d').textContent=Math.round(S.d)+' m';$('#s2t').textContent=Math.round(S.t)+' s';$('#s2va').textContent=(S.t>0.5?Math.round(S.d/S.t*3.6):0)+' km/h';
   requestAnimationFrame(frame);}
  reset();requestAnimationFrame(frame);
  this.reset=reset;
  mcq($('#s2q'),{q:'أيهما على صواب؟',o:['السائق؛ لأن سرعته المتوسطة 60 km/h فقط','رجل المرور؛ لأن المخالفة تُحسب بالسرعة اللحظية، وقد تتجاوز 60 km/h في بعض اللحظات حتى لو كانت السرعة المتوسطة 60 km/h','لا أحد منهما؛ فالسرعة لا تُقاس على الطريق','السائق؛ لأن 90 ÷ 1.5 أكبر من 60'],a:1,why:'السرعة المتوسطة 90 ÷ 1.5 = 60 km/h، لكن السرعة اللحظية تتغير؛ فقد يتجاوز السائق حد السرعة في بعض اللحظات.'},'s2',()=>{STN.s2.q=true;if(T.every(x=>S.done[x.k]))G.complete('s2');});
  /* velocity lab */
  const vc=$('#s2v'),x2=vc.getContext('2d');let mode=0,vt=0,vl=performance.now();
  $('#s2mode').onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;mode=+b.dataset.m;vt=0;$$('#s2mode button').forEach(q=>q.classList.toggle('on',q===b));G.tick();};
  function vf(now){const dt=Math.min(.05,(now-vl)/1000);vl=now;if(G.cur==='s2'&&!G.paused){vt+=dt;
    const W2=720,H2=320;x2.fillStyle=css('--surface-2');x2.fillRect(0,0,W2,H2);let px,py,ang,sp;const per=6,u=(vt%per)/per;
    if(mode===0){x2.strokeStyle='#9fb1ba';x2.lineWidth=40;x2.beginPath();x2.moveTo(40,180);x2.lineTo(680,180);x2.stroke();sp=10+50*u;px=60+600*(u*u*.5+u*.5);py=180;ang=0;}
    else{const R=110,cx2=360,cy2=165;x2.strokeStyle='#9fb1ba';x2.lineWidth=40;x2.beginPath();x2.arc(cx2,cy2,R,0,7);x2.stroke();const th=mode===1?u*Math.PI*2:(u*u*.6+u*.4)*Math.PI*2*(1);sp=mode===1?40:60-45*u;px=cx2+R*Math.cos(th);py=cy2+R*Math.sin(th);ang=th+Math.PI/2;}
    x2.save();x2.translate(px,py);x2.rotate(ang);car(x2,0,6,'#0b6884',.9);x2.restore();
    const L=sp*2.2;x2.save();x2.translate(px,py);x2.rotate(ang);x2.strokeStyle=css('--amber');x2.fillStyle=css('--amber');x2.lineWidth=6;x2.beginPath();x2.moveTo(0,-30);x2.lineTo(L,-30);x2.stroke();x2.beginPath();x2.moveTo(L+14,-30);x2.lineTo(L,-39);x2.lineTo(L,-21);x2.fill();x2.restore();
    const dirs=['الشرق','الجنوب الشرقي','الجنوب','الجنوب الغربي','الغرب','الشمال الغربي','الشمال','الشمال الشرقي'];const di=Math.round(((ang%(Math.PI*2))+Math.PI*2)%(Math.PI*2)/(Math.PI/4))%8;
    $('#s2vm').textContent=Math.round(sp)+' km/h';$('#s2vd').textContent=mode===0?'ثابت (الشرق)':'نحو '+dirs[di];$('#s2vc').textContent='نعم: '+['يتغير المقدار','يتغير الاتجاه','يتغيران معًا'][mode];}
    requestAnimationFrame(vf);}
  requestAnimationFrame(vf);
  mcq($('#s2q2'),{q:'سيارة تدور حول دوّار بسرعة ثابتة المقدار 40 km/h. هل تتغير سرعتها المتجهة؟',o:['لا؛ لأن مقدار السرعة ثابت','نعم؛ لأن اتجاه حركتها يتغير باستمرار'],a:1,cols:true,why:'السرعة المتجهة تشمل الاتجاه، فتغيّر الاتجاه وحده يغيّر السرعة المتجهة.'},'s2');},
 quiz:[{q:'عدّاد السرعة في السيارة يقيس:',o:['السرعة المتوسطة','التسارع','السرعة اللحظية','الزمن'],a:2},
  {q:'إذا لم تتغير السرعة اللحظية فإن الجسم يتحرك بسرعة ثابتة.',o:['صح','خطأ'],a:0,cols:true}],
 explain:'<p><b>السرعة اللحظية</b>: سرعة الجسم في لحظة زمنية معينة، ويقيسها عدّاد السرعة.</p><p><b>السرعة الثابتة</b>: إذا لم تتغير السرعة اللحظية يتحرك الجسم بسرعة ثابتة، فيقطع مسافات متساوية في أزمنة متساوية، وعندها تتساوى السرعة اللحظية والمتوسطة.</p><p><b>السرعة المتجهة</b>: مقدار سرعة الجسم واتجاه حركته؛ وتتغير إذا تغيّر المقدار أو الاتجاه أو كلاهما.</p><p>يقيس <b>عدّاد المسافة</b> في السيارة المسافة المقطوعة، بينما يعطي <b>مقياس السرعة</b> السرعة اللحظية.</p><p><b>معادلة المسافة</b>: ف = ع × ز. مثال الكتاب: سيارة سرعتها 40 كم/س لمدة نصف ساعة: ف = 40 × 0.5 = 20 كم.</p>'
});

/* ================= معادلة المسافة (مسائل العرض في موضعها) ================= */
def('p2',{n:'4 · معادلة المسافة',eyebrow:'المحطة 4 · معادلة المسافة ص 48',title:'معادلة المسافة',goal:'من معادلة السرعة نستنتج معادلة المسافة: ف = ع × ز.',plan:3,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="card" id="p2Box"></div>',
 init(){const P=[{tag:'معادلة المسافة',p:'تحركت سيارة لمدة نصف ساعة بسرعة مقدارها 40 كم/س. احسب المسافة التي قطعتها السيارة.',v:20,unit:'كم',given:'ز = 0.5 ساعة ، ع = 40 كم/س',want:'ف = ؟',law:'ف = ع × ز',sol:'ف = 40 × 0.5 = 20 كم'}];const box=$('#p2Box');const solved=P.map(()=>false);box.innerHTML='<div class="prob-list"></div>';const L=box.querySelector('.prob-list');
  P.forEach((q,i)=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+(i+1)+'</span>'+(q.tag?'<span>'+q.tag+'</span>':'')+'</div>';const inner=document.createElement('div');d.appendChild(inner);L.appendChild(d);
   const fin=()=>{solved[i]=true;d.classList.add('solved');if(solved.every(Boolean))G.complete('p2');};if(q.o)mcq(inner,q,'p2',fin);else calcQ(inner,q,'p2',fin);});},
 reset(){STN['p2'].init();},
 explain:'<p>مسائل العرض في موضعها من الدرس، بالترتيب نفسه. أزرار المساعدة تكشف المعطيات ثم القانون ثم الحل.</p>'});
/* ================= S3: acceleration ================= */
def('s3',{n:'5 · التسارع',eyebrow:'المحطة 5',title:'مختبر التسارع: كيف تتغير السرعة مع الزمن؟',goal:'التسارع يصف كيف تتغير السرعة مع الزمن. شغّل إحدى الحالات، وراقب منحنى السرعة–الزمن، ثم احسب التسارع.',plan:7,core:1,
 icon:'<path d="M8 70 L70 10" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M12 70h8M26 60h12M44 46h18" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
 body:`<div class="two"><div class="stage"><canvas id="s3c" width="720" height="250" aria-label="سيارة وإشارة مرور"></canvas><canvas id="s3g" width="720" height="300" aria-label="منحنى السرعة مع الزمن"></canvas>
   <div class="sim-bar"><span class="seg" id="s3pre"><button type="button" data-p="0" class="on">🟢 الإشارة خضراء</button><button type="button" data-p="1">🛣 طريق مفتوح</button><button type="button" data-p="2">🔴 الإشارة حمراء</button></span><button class="btn" type="button" id="s3run">تشغيل</button></div>
   <div class="ctrl"><label>السرعة الابتدائية ع₁: <b id="s3v1v">0</b> م/ث</label><input type="range" id="s3v1" min="0" max="30" value="0"><label>السرعة النهائية ع₂: <b id="s3v2v">20</b> م/ث</label><input type="range" id="s3v2" min="0" max="30" value="20"><label>الزمن ز: <b id="s3tv">5</b> ث</label><input type="range" id="s3t" min="2" max="10" value="5"></div></div>
  <div class="side"><div class="card"><h3>حساب التسارع</h3><p class="eq">ت = (ع₂ − ع₁) ÷ ز<small>التسارع = (السرعة النهائية − السرعة الابتدائية) ÷ الزمن · الوحدة م/ث²</small></p><div id="s3card"></div></div>
   <div class="card"><h3>اتجاه التسارع</h3><ul class="tasks plain"><li>الحركة والتسارع في <b>الاتجاه نفسه</b>: تتزايد السرعة.</li><li>الحركة والتسارع في <b>اتجاهين متعاكسين</b>: تتناقص السرعة.</li><li>جسم يتحرك بسرعة <b>ثابتة</b> في خط مستقيم: تسارعه = صفر.</li></ul></div></div></div>
  <div class="two"><div class="card"><h3>ناقش تغيّر السرعة مع الزمن في الرسم البياني</h3><div class="selrow" id="s3graphs"></div><div class="row-actions"><button class="btn" type="button" id="s3gchk">تحقق</button></div><div id="s3gfb"></div></div>
   <div class="card"><h3>رحلة طائرة ركاب: من الإقلاع إلى الهبوط</h3><div id="s3sort"></div></div></div>
  ${vcard('nation','التسارع في رحلاتنا',`<p>عندما يغادر <b>قطار الحرمين السريع</b> محطته متجهًا من مكة المكرمة إلى المدينة المنورة تتزايد سرعته (تسارع)، ثم يسير بسرعة ثابتة تقريبًا، ثم تتناقص سرعته عند الاقتراب من المحطة التالية. حدد نوع التسارع في كل مرحلة!</p>`)}`,
 init(){const cv=$('#s3c'),c=cv.getContext('2d'),gv=$('#s3g'),g=gv.getContext('2d');let S;const PRE=[[0,20,5],[15,15,5],[20,0,5]];
  const v1=$('#s3v1'),v2=$('#s3v2'),tt=$('#s3t');
  const lab=()=>{$('#s3v1v').textContent=v1.value;$('#s3v2v').textContent=v2.value;$('#s3tv').textContent=tt.value;};
  [v1,v2,tt].forEach(i=>i.oninput=()=>{lab();$$('#s3pre button').forEach(b=>b.classList.remove('on'));reset();});
  $('#s3pre').onclick=e=>{const b=e.target.closest('[data-p]');if(!b)return;const p=PRE[+b.dataset.p];v1.value=p[0];v2.value=p[1];tt.value=p[2];lab();$$('#s3pre button').forEach(x=>x.classList.toggle('on',x===b));reset();G.tick();};
  function reset(){S={a:+v1.value,b:+v2.value,T:+tt.value,t:0,x:0,run:false,done:false,ok:false,tries:0,light:+v2.value>+v1.value?'g':+v2.value<+v1.value?'r':'y'};drawScene();drawGraph();card();}
  const vAt=t=>S.a+(S.b-S.a)*Math.min(1,t/S.T);
  function drawScene(){const W=720,H=250;sky(c,W,H);c.fillStyle='#8fbf6a';c.fillRect(0,170,W,80);c.fillStyle='#4a5a62';c.fillRect(0,176,W,50);
   c.strokeStyle='#fff';c.lineWidth=3;c.setLineDash([24,20]);c.lineDashOffset=S.x*4;c.beginPath();c.moveTo(0,201);c.lineTo(W,201);c.stroke();c.setLineDash([]);
   c.fillStyle='#333';c.fillRect(620,60,8,116);c.fillStyle='#222';c.fillRect(604,40,40,92);[['r',58],['y',86],['g',114]].forEach(([k,y])=>{c.fillStyle=S.light===k?{r:'#ff4d3d',y:'#ffd34d',g:'#3ddc84'}[k]:'#555';c.beginPath();c.arc(624,y,11,0,7);c.fill();});
   const v=vAt(S.t),cx0=200;car(c,cx0,200,'#0b6884',1.4);
   const L=v*5;if(L>2){c.strokeStyle='#d9483b';c.fillStyle='#d9483b';c.lineWidth=5;c.beginPath();c.moveTo(cx0-30,140);c.lineTo(cx0-30+L,140);c.stroke();c.beginPath();c.moveTo(cx0-30+L+12,140);c.lineTo(cx0-30+L,132);c.lineTo(cx0-30+L,148);c.fill();c.font='700 13px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign='right';c.fillText('الحركة',cx0-34,145);}
   const acc=(S.b-S.a)/S.T;if(acc){const La=Math.min(120,Math.abs(acc)*20),dir=Math.sign(acc);c.strokeStyle='#1f6fd1';c.fillStyle='#1f6fd1';c.lineWidth=5;c.beginPath();c.moveTo(cx0,112);c.lineTo(cx0+dir*La,112);c.stroke();c.beginPath();c.moveTo(cx0+dir*(La+12),112);c.lineTo(cx0+dir*La,104);c.lineTo(cx0+dir*La,120);c.fill();c.direction='rtl';c.textAlign=dir>0?'right':'left';c.fillText('التسارع',dir>0?cx0-6:cx0+6,117);}
   c.direction='ltr';c.fillStyle='#14222b';c.font='16px "Share Tech Mono"';c.textAlign='left';c.fillText('v = '+fmt(v,1)+' m/s   t = '+fmt(S.t,1)+' s',16,26);}
  function drawGraph(){const W=720,H=300,L=70,R=20,T=20,B=50;g.fillStyle=css('--surface');g.fillRect(0,0,W,H);g.strokeStyle=css('--line');g.lineWidth=1;
   for(let k=0;k<=30;k+=5){const y=H-B-(H-B-T)*k/30;g.beginPath();g.moveTo(L,y);g.lineTo(W-R,y);g.stroke();g.fillStyle=css('--muted');g.font='12px "Share Tech Mono"';g.textAlign='right';g.fillText(k,L-8,y+4);}
   for(let k=0;k<=10;k++){const x=L+(W-L-R)*k/10;g.beginPath();g.moveTo(x,T);g.lineTo(x,H-B);g.stroke();g.textAlign='center';g.fillText(k,x,H-B+18);}
   g.fillStyle=css('--ink');g.font='700 13px "IBM Plex Sans Arabic"';g.direction='rtl';g.textAlign='center';g.fillText('الزمن (ث)',(W+L)/2,H-8);g.save();g.translate(18,(H-B+T)/2);g.rotate(-Math.PI/2);g.fillText('السرعة (م/ث)',0,0);g.restore();g.direction='ltr';
   g.strokeStyle=css('--accent');g.lineWidth=4;g.beginPath();const N=60;for(let i=0;i<=N;i++){const t=S.t*i/N,x=L+(W-L-R)*t/10,y=H-B-(H-B-T)*vAt(t)/30;i?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();}
  function card(){const el=$('#s3card');if(!S.done){el.innerHTML='<p class="step-text">اضبط القيم أو اختر حالة، ثم اضغط «تشغيل».</p>';return;}
   const a=(S.b-S.a)/S.T;el.innerHTML=`<p class="step-text">ع₁ = ${num(S.a)} م/ث، ع₂ = ${num(S.b)} م/ث، ز = ${num(S.T)} ث. احسب التسارع:</p><form class="answer" id="s3f" autocomplete="off"><label><input id="s3a" inputmode="decimal" aria-label="التسارع"><span class="unit">م/ث²</span></label><button class="btn" type="submit">تحقق</button></form>${G.teacher?`<div class="teacher-hint">للمعلم: ${fmt(a,2)}</div>`:''}<div id="s3fb"></div>`;
   $('#s3f').onsubmit=e=>{e.preventDefault();if(S.ok)return;const x=parseNum($('#s3a').value);if(isNaN(x))return;
    if(Math.abs(x-a)<=.02+Math.abs(a)*.01){S.ok=true;G.good();G.add(S.tries?4:10,'s3');STN.s3.n=(STN.s3.n||0)+1;
      say($('#s3fb'),'ok',`صحيح: ت = (${S.b} − ${S.a}) ÷ ${S.T} = ${fmt(a,2)} م/ث². ${a>0?'التسارع موجب: السرعة تتزايد.':a<0?'التسارع سالب: السرعة تتناقص، فالتسارع عكس اتجاه الحركة.':'التسارع صفر: السرعة ثابتة.'}`);if(STN.s3.n>=2&&STN.s3.g)G.complete('s3');}
    else{S.tries++;G.bad();say($('#s3fb'),'bad',S.tries>1?`اطرح أولًا: ${S.b} − ${S.a} = ${S.b-S.a}، ثم اقسم على ${S.T}. انتبه للإشارة السالبة.`:'استخدم القانون: (السرعة النهائية − السرعة الابتدائية) ÷ الزمن.');}};}
  $('#s3run').onclick=()=>{if(S.run)return;reset();S.run=true;let last=performance.now();
   const step=now=>{if(!S.run)return;const dt=(now-last)/1000;last=now;if(!G.paused&&G.cur==='s3'){S.t=Math.min(S.T,S.t+dt);S.x+=vAt(S.t)*dt;}drawScene();drawGraph();if(S.t>=S.T){S.run=false;S.done=true;card();return;}requestAnimationFrame(step);};requestAnimationFrame(step);};
  lab();reset();this.reset=()=>{STN.s3.n=0;STN.s3.g=false;reset();gReset();};
  /* graph reading */
  const GR=[['أ','M10 90 L60 20 L110 20','up'],['ب','M10 50 L110 50','flat'],['ج','M10 20 L110 90','down']],ANS={up:'تتزايد السرعة',flat:'سرعة ثابتة: التسارع = صفر',down:'تتناقص السرعة'};
  function gReset(){$('#s3graphs').innerHTML=[GR[0],GR[2],GR[1]].map(([n,p],i)=>`<figure><svg viewBox="0 0 120 110"><path d="M8 4V100H118" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--muted)"/><path d="${p}" fill="none" stroke="var(--accent)" stroke-width="4"/><text x="14" y="16" font-size="12" fill="var(--muted)">v</text><text x="108" y="96" font-size="12" fill="var(--muted)">t</text></svg><select data-k="${i}" aria-label="المنحنى ${n}"><option value="">المنحنى ${n}: اختر</option>${Object.entries(ANS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></figure>`).join('');$('#s3gfb').innerHTML='';}
  gReset();let gt=0;
  $('#s3gchk').onclick=()=>{const want=['up','down','flat'],got=$$('#s3graphs select').map(s=>s.value);if(got.some(x=>!x)){say($('#s3gfb'),'bad','اختر وصفًا لكل منحنى.');return;}
   if(got.every((x,i)=>x===want[i])){G.good();G.add(gt?4:10,'s3');STN.s3.g=true;say($('#s3gfb'),'ok','صحيح! الخط الصاعد: تتزايد السرعة. الهابط: تتناقص. الأفقي: السرعة ثابتة والتسارع صفر.');if(STN.s3.n>=2)G.complete('s3');}
   else{gt++;G.bad();say($('#s3gfb'),'bad','تتبّع المحور الرأسي (السرعة): هل يرتفع الخط أم ينخفض أم يبقى أفقيًا؟');}};
  sortGame($('#s3sort'),{q:'صنّف مراحل الرحلة حسب تغير السرعة:',bins:['تتزايد السرعة','سرعة ثابتة (تسارع صفر)','تتناقص السرعة'],items:[['الانطلاق على المدرج للإقلاع',0],['الارتفاع بعد مغادرة الأرض وزيادة السرعة',0],['الطيران في خط مستقيم بسرعة ثابتة',1],['الاقتراب من المطار والاستعداد للهبوط',2],['ملامسة المدرج والتوقف',2]],hint:'هل تزداد السرعة أم تثبت أم تقل في هذه المرحلة؟'},'s3');},
 quiz:[{q:'التغير في السرعة المتجهة للجسم مقسومًا على الزمن هو:',o:['السرعة','التسارع','السرعة اللحظية','السرعة المتوسطة'],a:1},
  {q:'الجسم المتحرك بسرعة ........ وفي خط مستقيم يكون تسارعه = صفرًا',o:['ثابتة','متزايدة','متناقصة','متغيرة'],a:0,cols:true}],
 explain:'<p><b>التسارع</b> هو التغير في السرعة المتجهة مقسومًا على الزمن اللازم لهذا التغير: <b>ت = (ع₂ − ع₁) ÷ ز</b>، ووحدته م/ث².</p><p>عند قمة منحدر يكون المتزلج ساكنًا، وعند النزول تزداد سرعته أكثر فأكثر، ولو كان المنحدر أكثر ميلًا لتزايدت سرعته بمعدل أكبر.</p><p>في منحنى السرعة–الزمن: الخط الصاعد يعني تزايد السرعة، والهابط تناقصها، والأفقي سرعة ثابتة وتسارع صفر.</p>'
});

/* ================= حساب التسارع (مسائل العرض في موضعها) ================= */
def('p3',{n:'6 · حساب التسارع',eyebrow:'المحطة 6 · تطبيق الرياضيات: حساب التسارع ص 49–50',title:'حساب التسارع',goal:'احسب التسارع: ت = (ع₂ − ع₁) ÷ ز.',plan:6,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="card" id="p3Box"></div>',
 init(){const P=[{tag:'التسارع على منحدر',p:'واجه متزلج يتحرك بسرعة 8 م/ث انحدارًا أدى إلى زيادة سرعته إلى 18 م/ث خلال 5 ثوانٍ. احسب تسارع المتزلج.',v:2,unit:'م/ث²',given:'ع₁ = 8 م/ث ، ع₂ = 18 م/ث ، ز = 5 ث',want:'ت = ؟',law:'ت = (ع₂ − ع₁) ÷ ز',sol:'ت = (18 − 8) ÷ 5 = 10 ÷ 5 = 2 م/ث²'},{tag:'عربة الألعاب',p:'تسير عربة في مدينة الألعاب بسرعة 10 م/ث، وبعد 5 ثوانٍ من المسير على سكتها المنحدرة أصبحت سرعتها 25 م/ث. احسب تسارع هذه العربة.',v:3,unit:'م/ث²',given:'ع₁ = 10 م/ث ، ع₂ = 25 م/ث ، ز = 5 ث',want:'ت = ؟',law:'ت = (ع₂ − ع₁) ÷ ز',sol:'ت = (25 − 10) ÷ 5 = 3 م/ث²'},{tag:'تسارع سالب',p:'تتباطأ السيارة التي تستقلها نظرًا لاقترابها من إشارة ضوئية. إذا كانت السيارة تسير بسرعة 16 م/ث وتوقفت خلال 9 ثوانٍ، فما تسارع هذه السيارة؟ (قرّب لمنزلتين عشريتين)',v:-1.78,tol:.03,unit:'م/ث²',given:'ع₁ = 16 م/ث ، ع₂ = صفر (توقفت) ، ز = 9 ث',want:'ت = ؟',law:'ت = (ع₂ − ع₁) ÷ ز',sol:'ت = (0 − 16) ÷ 9 ≈ −1.78 م/ث². الإشارة السالبة تعني أن السرعة تتناقص.',hint:'السرعة النهائية عند التوقف = صفر، والنتيجة سالبة.'},{tag:'قراءة رسم بياني',p:'يمثل الرسم البياني العلاقة بين المسافة والزمن لرحلة قام بها حسين على الدراجة؛ فقطع 25 كم في 2.5 ساعة. ما السرعة المتوسطة لحسين؟',fig:'<div class="mini-scene"><svg viewBox="0 0 260 170"><path d="M30 10V140H250" fill="none" stroke="currentColor" style="color:var(--muted)" stroke-width="2"/><path d="M30 140 L230 40" stroke="var(--accent)" stroke-width="3"/><path d="M30 77.5 H155 V140" fill="none" stroke="var(--ok)" stroke-dasharray="5 4" stroke-width="2"/><circle cx="155" cy="77.5" r="5" fill="#d9483b"/><text x="24" y="81" text-anchor="end" font-size="11" fill="var(--ink)">25</text><text x="155" y="156" text-anchor="middle" font-size="11" fill="var(--ink)">2.5</text><text x="140" y="168" text-anchor="middle" font-size="10" fill="var(--muted)" direction="rtl">الزمن (ساعة)</text><text x="8" y="12" font-size="10" fill="var(--muted)" direction="rtl">كم</text></svg></div>',v:10,unit:'كم/س',given:'من الرسم: ف = 25 كم ، ز = 2.5 ساعة',want:'ع = ؟',law:'ع = ف ÷ ز',sol:'ع = 25 ÷ 2.5 = 10 كم/س'},{tag:'تفكير ناقد',q:'إذا طارت طائرة بسرعة ثابتة مقدارها 500 كم/س، فهل يمكن اعتبارها تتسارع؟',o:['لا يمكن أبدًا؛ لأن مقدار السرعة ثابت','نعم إذا غيّرت اتجاه حركتها؛ لأن السرعة المتجهة تتغير','نعم دائمًا؛ لأن سرعتها كبيرة','لا؛ لأن الطائرات لا تتسارع في الجو'],a:1,why:'التسارع تغيّر في السرعة المتجهة: إذا طارت في خط مستقيم فتسارعها صفر، وإذا انعطفت فهي تتسارع.'},{tag:'اختبر نفسك ص 51',q:'هل يمكن لجسم متحرك بسرعة ثابتة في المقدار أن تتغير سرعته المتجهة؟',o:['لا، فالسرعة المتجهة ثابتة دائمًا معها','نعم، إذا تغيّر اتجاه حركته','نعم، إذا بقي في خط مستقيم','لا، إلا إذا توقف'],a:1,why:'السرعة المتجهة مقدار واتجاه؛ فتغيّر الاتجاه وحده يغيّرها.'}];const box=$('#p3Box');const solved=P.map(()=>false);box.innerHTML='<div class="prob-list"></div>';const L=box.querySelector('.prob-list');
  P.forEach((q,i)=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+(i+1)+'</span>'+(q.tag?'<span>'+q.tag+'</span>':'')+'</div>';const inner=document.createElement('div');d.appendChild(inner);L.appendChild(d);
   const fin=()=>{solved[i]=true;d.classList.add('solved');if(solved.every(Boolean))G.complete('p3');};if(q.o)mcq(inner,q,'p3',fin);else calcQ(inner,q,'p3',fin);});},
 reset(){STN['p3'].init();},
 explain:'<p>مسائل العرض في موضعها من الدرس، بالترتيب نفسه. أزرار المساعدة تكشف المعطيات ثم القانون ثم الحل.</p>'});
/* ================= الخلاصة ================= */
def('sum',{n:'الخلاصة',eyebrow:'الخلاصة · الكتاب صفحة 51',title:'الخلاصة',goal:'تساعدك على ترتيب الأفكار.',plan:2,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="two"><div class="card"><h3>السرعة والسرعة المتجهة</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>السرعة المتوسطة تساوي المسافة المقطوعة مقسومة على الزمن اللازم لقطع المسافة: ع = ف ÷ ز.</li><li>السرعة المتجهة تتحدد بمقدار سرعة الجسم واتجاه حركته.</li></ul></div><div class="card"><h3>التسارع</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>التسارع هو التغير في السرعة المتجهة مقسومًا على الزمن اللازم لهذا التغير.</li><li>يُحسب تسارع الحركة في خط مستقيم تبعًا للمعادلة: ت = (ع₂ − ع₁) ÷ ز.</li><li>نستدل على تسارع الجسم المتحرك من منحنى السرعة–الزمن: فالخط البياني يتجه إلى أعلى عندما تتزايد سرعة الجسم، ويتجه إلى أسفل عندما تتناقص، ويكون أفقيًّا إذا ثبتت سرعة الجسم.</li></ul></div></div>',
 init(){},enter(){G.complete('sum');},reset(){},explain:'<p>خلاصة الدرس كما في العرض.</p>'});
/* ================= SELF TEST p51 ================= */
def('self',{n:'اختبر نفسك',eyebrow:'كتاب الطالب ص 51',title:'اختبر نفسك: الأسئلة والحلول',goal:'أسئلة «اختبر نفسك» و«تطبيق الرياضيات» في مراجعة الدرس مع الحل النموذجي لكل سؤال.',plan:3,
 icon:'<rect x="14" y="8" width="52" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30l6 6 12-12M24 54l6 6 12-12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=K.solutions($('#selfBox'),[
  {k:'فسّر',q:'إذا طارت طائرة بسرعة ثابتة مقدارها 500 كم/س، فهل يمكن اعتبارها تتسارع؟',a:[['الإجابة','يعتمد ذلك على اتجاه حركتها.'],['إذا طارت في خط مستقيم','لا تتسارع؛ لأن مقدار سرعتها واتجاهها ثابتان، فسرعتها المتجهة لا تتغير والتسارع = صفر.'],['إذا غيّرت اتجاهها','فهي تتسارع؛ لأن التسارع تغيّر في السرعة المتجهة، وتغيّر الاتجاه وحده يغيّر السرعة المتجهة حتى لو بقي المقدار 500 كم/س.']]},
  {k:'استنتج',q:'هل يمكن للسرعة اللحظية لجسم ما أن تكون أكبر من سرعته المتوسطة؟',a:[['الإجابة','نعم.'],['التفسير','السرعة المتوسطة = المسافة الكلية ÷ الزمن الكلي، أما السرعة اللحظية فتتغير من لحظة إلى أخرى؛ فتكون في بعض اللحظات أكبر من المتوسطة وفي لحظات أخرى أصغر منها. ولا تتساويان دائمًا إلا إذا تحرك الجسم بسرعة ثابتة.'],['مثال','سيارة سرعتها المتوسطة 60 كم/س في رحلة، وقد يقرأ عدّادها 80 كم/س في لحظة ما.']]},
  {k:'حدّد',q:'هل يمكن لجسم متحرك بسرعة ثابتة في المقدار أن تتغير سرعته المتجهة؟',a:[['الإجابة','نعم.'],['التفسير','السرعة المتجهة تشمل المقدار والاتجاه؛ فإذا تغيّر اتجاه حركة الجسم تغيّرت سرعته المتجهة حتى لو بقي مقدار سرعته ثابتًا.'],['مثال','سيارة تدور حول دوّار بسرعة ثابتة المقدار.']]},
  {k:'التفكير الناقد',q:'صف حركة متزلج عندما يتسارع نازلًا إلى أسفل منحدر ثم عندما يصعد الجانب الآخر. ماذا يمكن أن يحدث لو كان الجانب الذي يصعده أقل انحدارًا من الجانب الآخر؟',a:[['أثناء النزول','تتزايد سرعته؛ لأن التسارع في اتجاه الحركة.'],['عند أسفل المنحدر','تكون سرعته أكبر ما يمكن.'],['أثناء الصعود','تتناقص سرعته؛ لأن التسارع عكس اتجاه الحركة، حتى تصبح سرعته صفرًا ثم يعود.'],['إذا كان الجانب الآخر أقل انحدارًا','تتناقص سرعته بمعدل أصغر، فيقطع مسافة أطول على السطح قبل أن تصبح سرعته صفرًا.']]},
  {k:'تطبيق الرياضيات · حساب السرعة المتوسطة',q:'خلال فترة ازدحام السير قد يحتاج سائق سيارة إلى 1.5 ساعة لقطع مسافة 45 كم. احسب السرعة المتوسطة للسيارة خلال هذه الرحلة.',a:[['المعطيات','ف = 45 كم ، ز = 1.5 ساعة'],['المطلوب','ع = ؟'],['القانون','ع = ف ÷ ز'],['الحل','ع = 45 ÷ 1.5 = 30 كم/س']]},
  {k:'تطبيق الرياضيات · قارن',q:'قارن المسافة المقطوعة والسرعة المتوسطة لكل من الشخصين التاليين: سار أحمد بسرعة 1.5 م/ث لمدة 30 ثانية، بينما سار سالم بسرعة 2 م/ث لمدة 15 ثانية ثم بسرعة 1 م/ث لمدة 15 ثانية أخرى.',a:[['أحمد','ف = 1.5 × 30 = 45 م ، والسرعة المتوسطة = 45 ÷ 30 = 1.5 م/ث'],['سالم','ف₁ = 2 × 15 = 30 م ، ف₂ = 1 × 15 = 15 م ، المسافة الكلية = 45 م في زمن كلي 30 ث ، السرعة المتوسطة = 45 ÷ 30 = 1.5 م/ث'],['المقارنة','قطع الاثنان المسافة نفسها (45 م) بالسرعة المتوسطة نفسها (1.5 م/ث)، مع أن سرعة سالم اللحظية تغيّرت أثناء الحركة.']]}],'self',()=>G.complete('self'));},
 reset(){STN.self.s.reset();},explain:'<p>حلول نموذجية لأسئلة «اختبر نفسك» ص 51. يُفضّل أن يجيب الطلاب في دفاترهم أولًا، ثم يكشف المعلم الحل سؤالًا سؤالًا.</p>'});

/* ================= S5: competitions ================= */
const RQ=[
 {q:'المسافة التي يقطعها الجسم خلال زمن محدد هي:',o:['التسارع','القوة','الشغل','السرعة'],a:3},
 {q:'أي الأجسام التالية أسرع؟',o:['جسم يقطع 5 أمتار خلال 10 ثوانٍ','جسم يقطع 15 مترًا خلال 10 ثوانٍ','جسم يقطع 10 أمتار خلال 10 ثوانٍ','جسم يقطع 10 أمتار خلال 5 ثوانٍ'],a:3,why:'السرعات: 0.5 و1.5 و1 و2 م/ث؛ فالأسرع من يقطع 10 أمتار خلال 5 ثوانٍ (2 م/ث).'},
 {q:'أي العبارات التالية غير صحيحة؟',o:['زيادة السرعة تؤدي إلى زيادة المسافة المقطوعة','زيادة السرعة تؤدي إلى تقليل المسافة المقطوعة','تقليل السرعة يؤدي إلى تقليل المسافة المقطوعة','في الزمن نفسه: السرعة الأكبر تقطع مسافة أكبر'],a:1},
 {q:'عدّاد السرعة في السيارة يقيس:',o:['السرعة المتوسطة','التسارع','السرعة اللحظية','الزمن'],a:2},
 {q:'السرعة التي تبقى ثابتة مع الزمن (لا تتغير) هي:',o:['السرعة المتوسطة','السرعة الثابتة','السرعة اللحظية','السرعة القصوى'],a:1},
 {q:'ماذا يحدث لمقدار سرعة الجسم عندما تكون الحركة والتسارع في اتجاهين متعاكسين؟',o:['تتزايد','تتناقص','تبقى ثابتة','تصبح صفرًا فورًا'],a:1},
 {q:'ماذا يحدث لمقدار سرعة الجسم عندما تكون الحركة والتسارع في الاتجاه نفسه؟',o:['تتزايد','تتناقص','تبقى ثابتة','تنعكس'],a:0},
 {q:'سيارة سرعتها 60 كم/س تسير ساعتين. ما المسافة؟',o:['30 كم','62 كم','120 كم','58 كم'],a:2,why:'ف = 60 × 2 = 120 كم.'},
 {q:'دراجة قطعت 100 م في 20 ث. سرعتها:',o:['5 م/ث','80 م/ث','2000 م/ث','0.2 م/ث'],a:0},
 {q:'وحدة التسارع في النظام الدولي:',o:['م/ث','م/ث²','نيوتن','كم'],a:1},
 {q:'تزداد سرعة سيارة من 0 إلى 12 م/ث خلال 4 ث. تسارعها:',o:['3 م/ث²','48 م/ث²','8 م/ث²','16 م/ث²'],a:0},
 {q:'تتغير السرعة المتجهة إذا:',o:['تغيّر مقدار السرعة فقط','تغيّر الاتجاه فقط','تغيّر المقدار أو الاتجاه أو كلاهما','لم يتغير شيء'],a:2}];
const TF=[['السرعة المتجهة هي مقدار سرعة الجسم واتجاه حركته.',true],['إذا تحرك جسم بسرعة ثابتة في دائرة فإن تسارعه صفر.',false,'اتجاهه يتغير، فهو يتسارع.'],['يمكن أن تكون السرعة اللحظية أكبر من السرعة المتوسطة.',true],
 ['ع = ف × ز هو قانون السرعة المتوسطة.',false,'قانون السرعة: ع = ف ÷ ز.'],['عندما يتوقف جسم متحرك يكون تسارعه سالبًا خلال التوقف.',true],['في منحنى السرعة–الزمن، الخط الأفقي يعني أن التسارع صفر.',true],
 ['وحدة السرعة م/ث².',false,'وحدة السرعة م/ث، أما م/ث² فهي وحدة التسارع.'],['عند أدنى نقطة في المسار نصف الدائري تكون سرعة المتزلج أكبر ما يمكن.',true],['يقيس نظام ساهر السرعة المتوسطة للرحلة كلها.',false,'يرصد السرعة اللحظية عند مرور المركبة.']];
def('s5',{n:'المسابقات (إثرائي)',eyebrow:'إثرائي · تنافس المجموعات',title:'حلبة الأبطال',goal:'مسابقتان بطريقتين مختلفتين: سباق سيارات بين المجموعات، وجولة «صح أم خطأ» خاطفة.',plan:5,
 icon:'<path d="M14 66V12M14 12h44l-10 12 10 12H14" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>',
 body:`<div class="card"><div class="nb-head"><h2>🏎 سباق السرعة</h2><span>كل إجابة صحيحة تدفع سيارة مجموعتك خطوة نحو خط النهاية</span></div><div id="s5race"></div></div>
  <div class="card"><div class="nb-head"><h2>⚡ صح أم خطأ؟ الجولة الخاطفة</h2><span>قرار سريع قبل انتهاء العداد</span></div><div id="s5tf"></div></div>`,
 init(){STN.s5.r=race($('#s5race'),{theme:'cars',title:'سباق السرعة',qs:RQ,how:'تتناوب المجموعات على الإجابة. لكل مجموعة وسيلة مساعدة واحدة «حذف إجابتين». أول سيارة تصل إلى خط النهاية تفوز.',winSub:'وصلت سيارتكم أولًا إلى خط النهاية!'},'s5');
  STN.s5.t=tfRound($('#s5tf'),TF,'s5',{secs:10});},
 leave(){STN.s5.t&&STN.s5.t.stop();},reset(){STN.s5.r.reset();STN.s5.t.reset();},
 explain:'<p>سباق السيارات يربط فكرة الدرس بالمنافسة: كل إجابة صحيحة تقدّم السيارة خطوة. والجولة الخاطفة تقيس سرعة الاستدعاء والفهم.</p>'
});

/* ================= CHALLENGE ================= */
def('ch',{n:'تحدي العلماء',icon:'<path d="M24 10h32v18a16 16 0 0 1-32 0z" fill="currentColor"/><path d="M24 16H12a10 10 0 0 0 12 14M56 16h12a10 10 0 0 1-12 14" fill="none" stroke="currentColor" stroke-width="5"/><path d="M40 44v14M28 70h24l-3-12H31z" fill="currentColor"/>',plan:3,
 eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'ثمانية أسئلة متنوعة تقيس أهداف الدرس الثلاثة. لكل سؤال محاولتان.',
 body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'المفاهيم',q:'تعتمد السرعة على عاملين رئيسين هما:',o:['القوة والكتلة','المسافة والطاقة','المسافة والزمن','المسافة والتسارع'],a:2},
  {k:'القانون',q:'أي الخيارات التالية تمثّل صيغة رياضية صحيحة لقانون السرعة؟',o:['ع = ز ÷ ف','ع = ف ÷ ز','ع = ف × ز','ع = ز × ف'],a:1},
  {k:'احسب السرعة',t:'calc',p:'قطع متسابق 200 م في 25 ث. ما سرعته المتوسطة؟',v:8,unit:'م/ث',given:'ف = 200 م ، ز = 25 ث',law:'ع = ف ÷ ز',sol:'ع = 200 ÷ 25 = 8 م/ث'},
  {k:'احسب المسافة',t:'calc',p:'تسير حافلة بسرعة 70 كم/س لمدة 3 ساعات. ما المسافة التي تقطعها؟',v:210,unit:'كم',given:'ع = 70 كم/س ، ز = 3 ساعات',law:'ف = ع × ز',sol:'ف = 70 × 3 = 210 كم'},
  {k:'احسب التسارع',t:'calc',p:'انطلق عدّاء من السكون فأصبحت سرعته 9 م/ث بعد 3 ث. ما تسارعه؟',v:3,unit:'م/ث²',given:'ع₁ = 0 ، ع₂ = 9 م/ث ، ز = 3 ث',law:'ت = (ع₂ − ع₁) ÷ ز',sol:'ت = (9 − 0) ÷ 3 = 3 م/ث²'},
  {k:'اربط التسارع بالسرعة',t:'multi',q:'اختر كل الحالات التي يكون فيها الجسم متسارعًا:',items:[['سيارة تنطلق عند الإشارة الخضراء',1],['سيارة تضغط المكابح عند الإشارة الحمراء',1],['سيارة تدور حول دوّار بسرعة ثابتة المقدار',1],['سيارة تسير بسرعة ثابتة في خط مستقيم',0]],why:'التسارع يحدث عند تغير مقدار السرعة أو اتجاهها؛ أما السرعة الثابتة في خط مستقيم فتسارعها صفر.'},
  {k:'استنتج',q:'هل يمكن للسرعة اللحظية لجسم ما أن تكون أكبر من سرعته المتوسطة؟',o:['لا، فهما متساويتان دائمًا','نعم، فالسرعة اللحظية تتغير وقد تتجاوز المتوسطة في بعض اللحظات','لا، المتوسطة أكبر دائمًا','فقط عندما يكون الجسم ساكنًا'],a:1},
  {k:'التفكير الناقد',q:'تزلج متزلج نازلًا إلى أسفل منحدر نصف دائري ثم صعد الجانب الآخر. ماذا يمكن أن يحدث لو كان الجانب الذي يصعده أقل انحدارًا من الجانب الآخر؟',o:['يتوقف فورًا عند القاع','يصعد مسافة أطول على السطح الأقل انحدارًا قبل أن تتناقص سرعته إلى صفر','لا تتغير سرعته أبدًا','تزداد سرعته أثناء الصعود'],a:1,why:'أثناء الصعود تتناقص السرعة؛ وعلى السطح الأقل انحدارًا تتناقص بمعدل أصغر فيقطع مسافة أطول.'}],'ch');},
 reset(){STN.ch.c.reset();},
 explain:'<p>تحدي العلماء يقيس الأهداف الثلاثة: تعريف السرعة والتسارع، وربط التسارع بتغير السرعة، وحساب المسافة والسرعة والتسارع. أسئلته مأخوذة من تقييمات العرض و«اختبر نفسك» ص 51.</p>'
});

K.boot({chapter:'الفصل الثاني: الحركة والقوى والآلات البسيطة',chapterShort:'الفصل الثاني',title:'سباق الحركة',lesson:'الدرس الأول: الحركة',hook:'أين يبلغ المتزلج أقصى سرعته؟ ولماذا؟',riddle:'أين تكون سرعة المتزلج على المسار نصف الدائري أكبر ما يمكن، وكيف تتغير حركته؟',
 predict:{o:['عند أعلى نقطة على حافة المسار','عند أدنى نقطة في قاع المسار','سرعته ثابتة في كل المسار'],a:1},
 answer:'تكون سرعة المتزلج أكبر ما يمكن عند أدنى نقطة. أثناء النزول تتزايد سرعته، وأثناء الصعود تتناقص حتى يتوقف لحظيًا عند القمة ويغيّر اتجاهه. وأي تغير في مقدار السرعة أو اتجاهها يعني أنه يتسارع.',
 finalTitle:'مبارك! أصبحت خبيرًا في وصف الحركة',homework:'<b>الواجب:</b> «اختبر نفسك» ص 51 · <b>المطويات:</b> «وصف وتفسير الحركة والقوى والآلات البسيطة» ص 43.',goals:GOALS,
 concepts:[{n:'السرعة المتوسطة',t:'ع = ف ÷ ز؛ المسافة الكلية مقسومة على الزمن الكلي.',ic:'<circle cx="26" cy="28" r="18" fill="none" stroke="var(--accent)" stroke-width="4"/><path d="M26 28l8-10" stroke="var(--accent)" stroke-width="4"/>'},
  {n:'السرعة اللحظية',t:'سرعة الجسم في لحظة معينة، يقيسها العدّاد.',ic:'<path d="M8 40a18 18 0 0 1 36 0" fill="none" stroke="var(--accent)" stroke-width="4"/><path d="M26 40l10-12" stroke="var(--amber)" stroke-width="4"/>'},
  {n:'السرعة الثابتة',t:'مسافات متساوية في أزمنة متساوية.',ic:'<path d="M4 36h44" stroke="var(--accent)" stroke-width="3"/><circle cx="10" cy="28" r="5" fill="var(--amber)"/><circle cx="26" cy="28" r="5" fill="var(--amber)"/><circle cx="42" cy="28" r="5" fill="var(--amber)"/>'},
  {n:'السرعة المتجهة',t:'مقدار السرعة واتجاه الحركة معًا.',ic:'<path d="M8 44L40 12M28 12h12v12" fill="none" stroke="var(--accent)" stroke-width="4"/>'},
  {n:'التسارع',t:'ت = (ع₂ − ع₁) ÷ ز؛ موجب عند التزايد، وسالب عند التناقص.',ic:'<path d="M6 46L46 6" stroke="var(--accent)" stroke-width="4"/>'},
  {n:'المسافة',t:'ف = ع × ز.',ic:'<path d="M6 30h40M6 22v16M46 22v16" stroke="var(--accent)" stroke-width="4"/>'}]});
})();

