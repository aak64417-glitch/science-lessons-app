
window.IMG={"s01_bdbd1c64": "../assets/d1927b33d1e41d60.webp", "s05_3a4745d3": "../assets/99ac68885eb26a26.webp", "s06_78621292": "../assets/0ba96dc2a566c5b6.webp", "s06_81cae385": "../assets/f685bb14848b03e7.webp", "s06_9cd4801c": "../assets/1d602b3a16076a97.webp", "s07_9dadbf17": "../assets/c25b08357d1cf004.webp", "s09_9dadbf17": "../assets/c25b08357d1cf004.webp", "s09_dd41d422": "../assets/4f439518a2709d60.webp", "s10_65207767": "../assets/56761cb986b433b2.webp", "s11_10969790": "../assets/55411651a2280400.webp", "s12_81ba44ab": "../assets/61c4be02284493ec.webp", "s13_49195e00": "../assets/aee45aa765375f39.webp", "s13_e1a45bcb": "../assets/9f71b9f6f72d2980.webp", "s14_74a12287": "../assets/2b627b44774b3143.webp", "s14_d0d08f18": "../assets/8eaa8454ddd20083.webp", "s15_28f4df5f": "../assets/fdf9442ad3780619.webp", "s15_3679f162": "../assets/2e4c4aae86938be9.webp", "s16_81ba44ab": "../assets/61c4be02284493ec.webp", "s16_c7a9a3fe": "../assets/95423ba48f5ab0ee.webp", "s17_c7a9a3fe": "../assets/95423ba48f5ab0ee.webp", "s22_f39c9295": "../assets/de7ac978e4dc4275.webp", "s22_fdcd2ec6": "../assets/58cdabfc28f705b2.webp", "s23_092ec8f6": "../assets/6abe5882a6b34a1a.webp", "s23_703d172b": "../assets/9e1323745f4dcdc2.webp", "s29_7ba552ba": "../assets/a40e47ace5ed7b8e.webp", "s29_fbb365f2": "../assets/ba7a5e90891c0871.webp"};
/* ===== Chapter-2 lesson engine (design of «مختبر المادة العجيب») ===== */
(function(){
const $=(s,r)=>(r||document).querySelector(s), $$=(s,r)=>[...(r||document).querySelectorAll(s)];
const G={score:0,paused:false,sound:false,teacher:false,present:false,cur:'intro',done:{},pts:{},form:{},teams:null,team:0,pred:null,self:{},
  reduced:matchMedia('(prefers-reduced-motion: reduce)').matches};
const DEFS=[],STN={};
let META={};
const TEAMC=['#d9483b','#0b6884','#c97c06','#1f7a45','#7b3fa0'];
const TEAMN=['الصقور','النخبة','الرواد','المبدعون','العباقرة'];
const fmt=(x,d)=>Number(x).toFixed(d);
function parseNum(v){v=String(v).trim().replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/[٫,]/g,'.').replace(/[−–]/g,'-');if(v==='')return NaN;return Number(v);}
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const num=x=>`<span class="kbd-num">${x}</span>`;
const css=name=>getComputedStyle(document.documentElement).getPropertyValue(name).trim()||'#888';

/* ---------- sound (synth) ---------- */
let ctx=null,master=null,noiseBuf=null;
function AC(){if(!G.sound)return null;try{if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=.55;master.connect(ctx.destination);
  noiseBuf=ctx.createBuffer(1,ctx.sampleRate*1.2,ctx.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}
  if(ctx.state==='suspended')ctx.resume();return ctx;}catch(e){return null;}}
function note(f,t0,dur,type,vol,glide){const c=AC();if(!c)return;const t=c.currentTime+t0,o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(glide)o.frequency.exponentialRampToValueAtTime(glide,t+dur);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol||.18,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.05);}
function noise(t0,dur,f0,f1,vol,q){const c=AC();if(!c)return;const t=c.currentTime+t0,s=c.createBufferSource(),bp=c.createBiquadFilter(),g=c.createGain();s.buffer=noiseBuf;bp.type='bandpass';bp.Q.value=q||1.2;
  bp.frequency.setValueAtTime(f0,t);bp.frequency.exponentialRampToValueAtTime(f1,t+dur);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol||.35,t+dur*.35);g.gain.exponentialRampToValueAtTime(.0001,t+dur);s.connect(bp);bp.connect(g);g.connect(master);s.start(t);s.stop(t+dur+.05);}
const SFX={
  whoosh(){noise(0,.55,300,3200,.4,.9);note(220,0,.5,'sine',.05,660);},
  stationIn(){this.whoosh();[523,659,784].forEach((f,i)=>note(f,.32+i*.09,.35,'triangle',.14));note(1047,.6,.6,'sine',.1);},
  correct(){note(784,0,.14,'triangle',.18);note(1175,.09,.28,'triangle',.18);note(2349,.16,.25,'sine',.05);noise(.1,.25,6000,9000,.06,3);},
  wrong(){note(196,0,.18,'square',.06);note(147,.12,.3,'square',.06);},
  pop(){note(900,0,.08,'sine',.12,1400);},
  tick(){note(1300,0,.04,'square',.04);},
  stationDone(){[523,659,784,1047].forEach((f,i)=>note(f,i*.1,.4,'triangle',.15));[659,784,1047,1319].forEach((f,i)=>note(f,i*.1+.02,.4,'sine',.06));noise(.35,.6,3000,8000,.1,2);},
  fanfare(){[[523,0,.15],[523,.15,.15],[523,.3,.15],[659,.45,.45],[587,.9,.15],[659,1.05,.15],[784,1.2,.9]].forEach(([f,t,d])=>{note(f,t,d+.1,'sawtooth',.06);note(f*2,t,d,'triangle',.08);});noise(1.2,1.2,2000,9000,.12,1.5);},
  start(){noise(0,.9,150,2500,.35,.8);[262,330,392,523,659].forEach((f,i)=>note(f,.25+i*.08,.6,'triangle',.12));},
  engine(){note(90,0,.6,'sawtooth',.05,180);noise(0,.6,200,900,.12,1);},
  thud(){note(120,0,.25,'sine',.25,50);noise(0,.15,400,100,.2,1);}
};
G.sfx=SFX;

/* ---------- confetti & motion ---------- */
let cv,cx,parts=[],running=false,lastPt={x:innerWidth/2,y:innerHeight/2};
function fxInit(){cv=document.createElement('canvas');cv.className='fx-canvas';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);cx=cv.getContext('2d');size();addEventListener('resize',size);
  document.addEventListener('pointerdown',e=>{lastPt={x:e.clientX,y:e.clientY};},true);}
function size(){cv.width=innerWidth*devicePixelRatio;cv.height=innerHeight*devicePixelRatio;cx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);}
const COLS=()=>[css('--accent'),css('--amber'),css('--ok'),'#d9483b','#3a9cd4','#ffd34d'];
function burst(x,y,n,spread,up){if(G.reduced)return;const cols=COLS();for(let i=0;i<n;i++){const a=(up?-Math.PI/2:0)+(Math.random()-.5)*(spread||Math.PI*2),v=4+Math.random()*7;
  parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(up?3:0),r:3+Math.random()*4,c:cols[i%cols.length],rot:Math.random()*6,vr:(Math.random()-.5)*.4,life:70+Math.random()*40,sq:Math.random()<.5});}
  if(!running){running=true;requestAnimationFrame(tick);}}
function rain(n){if(G.reduced)return;const cols=COLS();for(let i=0;i<n;i++)parts.push({x:Math.random()*innerWidth,y:-20-Math.random()*innerHeight*.6,vx:(Math.random()-.5)*2,vy:2+Math.random()*3,r:4+Math.random()*4,c:cols[i%cols.length],rot:Math.random()*6,vr:(Math.random()-.5)*.3,life:220,sq:Math.random()<.6});if(!running){running=true;requestAnimationFrame(tick);}}
function tick(){cx.clearRect(0,0,innerWidth,innerHeight);parts=parts.filter(p=>p.life>0&&p.y<innerHeight+40);
  for(const p of parts){p.vy+=.22;p.vx*=.985;p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;p.life--;cx.save();cx.globalAlpha=Math.min(1,p.life/30);cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle=p.c;
    if(p.sq)cx.fillRect(-p.r,-p.r*.5,p.r*2,p.r);else{cx.beginPath();cx.arc(0,0,p.r*.7,0,6.29);cx.fill();}cx.restore();}
  if(parts.length)requestAnimationFrame(tick);else{running=false;cx.clearRect(0,0,innerWidth,innerHeight);}}
function floatPts(p){const s=$('#score'),r=s.getBoundingClientRect(),el=document.createElement('div');el.className='fx-pts';el.textContent='+'+p;el.style.left=lastPt.x+'px';el.style.top=lastPt.y+'px';document.body.appendChild(el);
  const dx=r.left+r.width/2-lastPt.x,dy=r.top+r.height/2-lastPt.y;
  if(G.reduced||!el.animate){el.remove();bump();return;}
  el.animate([{transform:'translate(-50%,-50%) scale(.6)',opacity:0},{transform:'translate(-50%,-120%) scale(1.25)',opacity:1,offset:.25},{transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.7)`,opacity:.9}],{duration:1100,easing:'cubic-bezier(.5,0,.3,1)'}).onfinish=()=>{el.remove();bump();};}
function bump(){const s=$('#score');s.classList.remove('bump');void s.offsetWidth;s.classList.add('bump');}
function banner(t,s,icon){const b=document.createElement('div');b.className='fx-banner';b.setAttribute('role','status');
  b.innerHTML=`<svg viewBox="0 0 60 60" aria-hidden="true">${icon||'<circle cx="30" cy="30" r="27" fill="var(--amber)"/><path d="M30 14l5 11 12 1-9 8 3 12-11-7-11 7 3-12-9-8 12-1z" fill="#fff"/>'}</svg><div><b>${t}</b><span>${s||''}</span></div>`;
  document.body.appendChild(b);setTimeout(()=>b.classList.add('out'),2600);setTimeout(()=>b.remove(),3200);}

G.good=()=>{SFX.correct();burst(lastPt.x,lastPt.y,26,Math.PI*1.2,true);};
G.bad=()=>{SFX.wrong();setTimeout(()=>{const scope=$('#modal').hidden?$('#st-'+G.cur):$('#modal');if(!scope)return;const f=[...scope.querySelectorAll('.fb.bad,.opt.bad,.answer,.mi.bad')].pop();if(f&&!G.reduced){f.classList.remove('shake');void f.offsetWidth;f.classList.add('shake');}},40);};
G.tick=()=>SFX.pop();
G.add=(p,st)=>{if(!p)return;G.score+=p;G.pts[st]=(G.pts[st]||0)+p;if(G.teams)G.teams[G.team].s+=p;hud();if(p>0)floatPts(p);};
G.complete=id=>{if(G.done[id])return;G.done[id]=true;renderNav();if(id==='intro'||id==='final')return;
  setTimeout(()=>{SFX.stationDone();rain(90);banner(id==='ch'?'أنهيت تحدي العلماء!':'أكملت محطة «'+stName(id)+'»',id==='ch'?'انتقل إلى لوحة الإنجاز':'رائع! تابع إلى المحطة التالية');},500);};
G.css=css;

/* ---------- registration ---------- */
function def(id,o){o.id=id;DEFS.push(o);STN[id]=o;return o;}
const order=()=>DEFS.map(d=>({id:d.id,n:d.n}));
const stName=id=>{const o=STN[id];return o?(o.n||'').replace(/^\d+ · /,''):'';};

/* ---------- shell helpers ---------- */
function hud(){$('#score').textContent=G.score+' نقطة';const th=$('#teamHud');
  if(!G.teams){th.hidden=true;th.innerHTML='';return;}th.hidden=false;
  th.innerHTML=G.teams.map((t,i)=>`<button type="button" class="team${i===G.team?' on':''}" data-i="${i}" aria-pressed="${i===G.team}" style="border-color:${i===G.team?t.c:''}"><span style="color:${t.c}">●</span> ${t.n}<b>${t.s}</b></button>`).join('');}
function setTeams(n){if(!n){G.teams=null;}else{G.teams=Array.from({length:n},(_,i)=>({n:TEAMN[i],c:TEAMC[i],s:0}));G.team=0;}
  const b=$('#bTeams');if(b){b.textContent=G.teams?'إيقاف وضع المجموعات':'تشغيل وضع المجموعات';b.setAttribute('aria-pressed',!!G.teams);}hud();}
function renderNav(){const html=order().map(s=>`<button type="button" data-go="${s.id}" class="${s.id===G.cur?'on':''}${G.done[s.id]?' done':''}">${s.n}</button>`).join('');$('#snav').innerHTML=html;$('#dStations').innerHTML=html;}
function go(id){const prev=STN[G.cur];if(prev&&prev.leave)prev.leave();
  $$('.st').forEach(s=>{s.hidden=s.id!=='st-'+id;});const from=G.cur;G.cur=id;renderNav();
  const st=STN[id];if(st&&st.enter)st.enter();onGo(id,from);
  closeDrawer();hideNudge();try{window.scrollTo({top:0,behavior:G.reduced?'auto':'smooth'});}catch(e){}
  const nb=$('#snav .on');if(nb){try{nb.scrollIntoView({inline:'center',block:'nearest'});}catch(e){}}}
function modal(html){$('#modalBody').innerHTML=html;$('#modal').hidden=false;$('#modalClose').focus({preventScroll:true});}
function closeModal(){$('#modal').hidden=true;}
function openDrawer(){$('#drawer').hidden=false;$('#bDrawer').setAttribute('aria-expanded','true');}
function closeDrawer(){$('#drawer').hidden=true;$('#bDrawer').setAttribute('aria-expanded','false');}
function say(el,t,m){el.innerHTML=`<div class="fb ${t}" role="status">${m}</div>`;}

/* ---------- value / identity cards ---------- */
const VI={
  islam:'<svg class="vi" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 40c-6-4-14-4-20-2V10c6-2 14-2 20 2 6-4 14-4 20-2v28c-6-2-14-2-20 2z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M24 12v28" stroke="currentColor" stroke-width="3"/></svg>',
  nation:'<svg class="vi" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 44V20" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><path d="M24 20c-4-8-12-10-18-8 6 0 12 3 18 8zM24 20c4-8 12-10 18-8-6 0-12 3-18 8zM24 20c-2-8-8-14-14-16 5 3 10 9 14 16zM24 20c2-8 8-14 14-16-5 3-10 9-14 16zM24 20c-6-3-14-1-18 4 5-3 12-4 18-4zM24 20c6-3 14-1 18 4-5-3-12-4-18-4z" fill="currentColor"/></svg>',
  life:'<svg class="vi" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="20" r="12" fill="none" stroke="currentColor" stroke-width="3"/><path d="M18 36h12M20 42h8M24 8v-4M10 20H6M42 20h-4" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  safety:'<svg class="vi" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4l17 6v12c0 11-7 19-17 22C14 41 7 33 7 22V10z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M16 24l6 6 11-12" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>'};
const VK={islam:'قيمة إسلامية',nation:'هويتي الوطنية',life:'العلم في حياتي',safety:'سلامتي'};
const VCOUNT={};
function vcard(kind,title,html){if(kind==='islam'||kind==='nation'){VCOUNT[kind]=(VCOUNT[kind]||0)+1;if(VCOUNT[kind]>1)return '';}return `<div class="vcard ${kind}">${VI[kind]}<div><span class="vk">${VK[kind]}</span><h4>${title}</h4>${html}</div></div>`;}
const ayah=(t,ref)=>`<span class="ayah">﴿${t}﴾</span><span class="ref">[${ref}]</span>`;

/* ---------- generic multiple choice ---------- */
function mcq(el,q,st,done){
  el.innerHTML=`<p class="q">${q.q}</p>${q.fig||''}<div class="opts${q.cols?' cols2':''}">${q.o.map((t,i)=>`<button type="button" class="opt" data-i="${i}"${i===q.a?' data-c="1"':''}>${t}</button>`).join('')}</div><div class="qfb"></div>`;
  let tries=0,over=false;const fb=el.querySelector('.qfb');
  el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(over)return;const i=+b.dataset.i;
    if(i===q.a){over=true;b.classList.add('ok');G.good();G.add(tries?4:10,st);say(fb,'ok',(tries?'صحيح. ':'إجابة صحيحة. ')+(q.why||''));done&&done(true,tries);}
    else{tries++;b.classList.add('bad');b.disabled=true;G.bad();
      if(tries>=2){over=true;el.querySelector(`.opt[data-i="${q.a}"]`).classList.add('ok');say(fb,'bad','الإجابة الصحيحة هي المحددة باللون الأخضر. '+(q.why||''));done&&done(false,tries);}
      else say(fb,'bad','حاول مرة أخرى. '+(q.hint||''));}});
}

/* ---------- numeric problem with graded help (differentiation) ---------- */
function calcQ(el,q,st,done){
  const help=[];if(q.given)help.push(['المعطيات',`<dt>المعطيات</dt><dd>${q.given}</dd>`+(q.want?`<dt>المطلوب</dt><dd>${q.want}</dd>`:'')]);
  if(q.law)help.push(['القانون',`<dt>القانون</dt><dd>${q.law}</dd>`]);
  if(q.sol)help.push(['الحل خطوة بخطوة',`<dt>الحل</dt><dd>${q.sol}</dd>`]);
  el.innerHTML=`<p class="q" style="font-weight:500">${q.p}</p>${q.fig||''}<form class="answer" autocomplete="off"><label><input inputmode="decimal" aria-label="الإجابة"><span class="unit">${q.unit||''}</span></label><button class="btn" type="submit">تحقق</button></form>
    <div class="steps-help">${help.map((h,i)=>`<button type="button" class="tbtn" data-h="${i}">${i===0?'💡 ':''}${h[0]}</button>`).join('')}</div><dl class="solve" hidden></dl>${G.teacher?`<div class="teacher-hint">للمعلم: ${q.v} ${q.unit||''}</div>`:''}<div class="qfb"></div>`;
  let tries=0,over=false,used=0;const fb=el.querySelector('.qfb'),dl=el.querySelector('.solve');
  el.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{const k=+b.dataset.h;used=Math.max(used,k+1);dl.hidden=false;dl.innerHTML=help.slice(0,used).map(h=>h[1]).join('');G.tick();
    el.querySelectorAll('[data-h]').forEach(x=>{if(+x.dataset.h<used)x.disabled=true;});});
  el.querySelector('form').onsubmit=e=>{e.preventDefault();if(over)return;const x=parseNum(el.querySelector('input').value);if(isNaN(x))return;
    const tol=q.tol!=null?q.tol:Math.max(.05,Math.abs(q.v)*.02);
    if(Math.abs(x-q.v)<=tol){over=true;const p=Math.max(3,(tries?6:10)-used*2);G.good();G.add(p,st);say(fb,'ok','صحيح. '+(q.ok||''));el.classList.add('solved');done&&done(true);}
    else{tries++;G.bad();if(tries>=3){over=true;dl.hidden=false;dl.innerHTML=help.map(h=>h[1]).join('');say(fb,'bad',`الإجابة: ${q.v} ${q.unit||''}. راجع خطوات الحل.`);done&&done(false);}
      else say(fb,'bad',tries===1?(q.hint||'راجع القانون والوحدات.'):'استعن بأزرار المساعدة أسفل السؤال.');}};
}

/* ---------- three-level practice ---------- */
const LV=[{n:'مستكشف',s:'★',d:'تطبيق مباشر للقانون'},{n:'باحث',s:'★★',d:'خطوتان أو تحويل وحدات'},{n:'عالم',s:'★★★',d:'تحليل ومقارنة وتفكير ناقد'}];
function levels(el,sets,st,onAll){
  let cur=0;const solved=sets.map(s=>s.map(()=>false));
  function render(){
    el.innerHTML=`<div class="levels" role="tablist">${LV.map((l,i)=>`<button type="button" class="lvl${i===cur?' on':''}" data-l="${i}" role="tab" aria-selected="${i===cur}"><i>${l.s}</i><span><b>${l.n}</b><small>${l.d}</small></span><span class="cnt">${solved[i].filter(Boolean).length}/${sets[i].length}</span></button>`).join('')}</div><div class="prob-list"></div>`;
    el.querySelectorAll('.lvl').forEach(b=>b.onclick=()=>{cur=+b.dataset.l;G.tick();render();});
    const box=el.querySelector('.prob-list');
    sets[cur].forEach((q,i)=>{const d=document.createElement('div');d.className='prob'+(solved[cur][i]?' solved':'');box.appendChild(d);
      const head=`<div class="ptitle"><span class="tag">${LV[cur].n} · ${i+1}</span>${q.tag?`<span>${q.tag}</span>`:''}${solved[cur][i]?'<span style="color:var(--ok)">✓ أنجزته</span>':''}</div>`;
      const inner=document.createElement('div');d.innerHTML=head;d.appendChild(inner);
      const fin=()=>{solved[cur][i]=true;const c=el.querySelectorAll('.lvl .cnt')[cur];if(c)c.textContent=solved[cur].filter(Boolean).length+'/'+sets[cur].length;
        if(onAll&&solved.every(s=>s.some(Boolean)))onAll();};
      if(q.o)mcq(inner,q,st,fin);else calcQ(inner,q,st,fin);});
  }
  render();return {reset(){solved.forEach(s=>s.fill(false));cur=0;render();},refresh:render};
}

/* ---------- vocabulary flip cards ---------- */
function flips(el,terms,onAll){const seen=new Set();
  el.innerHTML=`<div class="flips">${terms.map((t,i)=>`<button type="button" class="flip" data-i="${i}" aria-label="${t.t}"><span class="in"><span class="f">${t.ic?`<svg viewBox="0 0 40 40" aria-hidden="true">${t.ic}</svg>`:''}<b>${t.t}</b><small>المس البطاقة</small></span><span class="b">${t.d}</span></span></button>`).join('')}</div>`;
  el.querySelectorAll('.flip').forEach(b=>b.onclick=()=>{b.classList.toggle('on');SFX.whoosh&&note(600,0,.08,'sine',.08,900);seen.add(b.dataset.i);if(seen.size===terms.length&&onAll)onAll();});}

/* ---------- match game ---------- */
function match(el,pairs,st,onDone){
  const L=pairs.map((p,i)=>({t:p[0],i})),R=shuffle(pairs.map((p,i)=>({t:p[1],i})));let selL=null,selR=null,doneN=0,miss=0;const ok=new Set();
  el.innerHTML=`<div class="match"><div class="col">${L.map(x=>`<button type="button" class="mi term" data-l="${x.i}">${x.t}</button>`).join('')}</div><div class="col">${R.map(x=>`<button type="button" class="mi" data-r="${x.i}">${x.t}</button>`).join('')}</div></div><div class="qfb"></div>`;
  const fb=el.querySelector('.qfb');
  function tryIt(){if(selL==null||selR==null)return;const a=el.querySelector(`[data-l="${selL}"]`),b=el.querySelector(`[data-r="${selR}"]`);
    if(selL===selR){a.className='mi term done';b.className='mi done';a.disabled=b.disabled=true;ok.add(selL);doneN++;G.good();G.add(miss?3:5,st);miss=0;
      if(doneN===pairs.length){say(fb,'ok','أحسنت! طابقت كل المصطلحات.');onDone&&onDone();}else fb.innerHTML='';}
    else{b.classList.add('bad');a.classList.add('bad');G.bad();miss++;say(fb,'bad','ليست هذه. اقرأ التعريف مرة أخرى.');setTimeout(()=>{a.classList.remove('bad','sel');b.classList.remove('bad','sel');},600);}
    selL=selR=null;}
  el.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{if(b.disabled)return;el.querySelectorAll('[data-l]').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');selL=+b.dataset.l;G.tick();tryIt();});
  el.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{if(b.disabled)return;el.querySelectorAll('[data-r]').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');selR=+b.dataset.r;G.tick();tryIt();});
}

/* ---------- sort game ---------- */
function sortGame(el,cfg,st,onDone){
  const items=shuffle(cfg.items.map((x,i)=>({t:x[0],b:x[1],i})));let pick=null,left=items.length;
  el.innerHTML=`${cfg.q?`<p class="q">${cfg.q}</p>`:''}<div class="pool">${items.map(x=>`<button type="button" class="chip" data-i="${x.i}">${x.t}</button>`).join('')}</div>
    <div class="bins3 mt">${cfg.bins.map((b,k)=>`<button type="button" class="bin" data-b="${k}"><strong>${b}</strong><span class="chips"></span></button>`).join('')}</div><div class="qfb"></div>`;
  const fb=el.querySelector('.qfb');
  el.querySelectorAll('.pool .chip').forEach(c=>c.onclick=()=>{el.querySelectorAll('.pool .chip').forEach(x=>x.classList.remove('sel'));c.classList.add('sel');pick=c;G.tick();fb.innerHTML='';});
  el.querySelectorAll('.bin').forEach(bn=>bn.onclick=e=>{if(!pick)return;const it=cfg.items[+pick.dataset.i];
    if(it[1]===+bn.dataset.b){const c=pick;c.classList.remove('sel');c.classList.add('ok');c.disabled=true;bn.querySelector('.chips').appendChild(c);pick=null;left--;G.good();G.add(4,st);
      if(it[2])say(fb,'ok',it[2]);if(!left){say(fb,'ok',cfg.done||'أحسنت! صنّفت كل البطاقات.');onDone&&onDone();}}
    else{pick.classList.add('bad');G.bad();say(fb,'bad',it[2]?'فكّر مرة أخرى: '+(cfg.hint||''):'ليس هنا. '+(cfg.hint||''));const p=pick;setTimeout(()=>p.classList.remove('bad'),600);}});
}

/* ---------- lightning true/false round ---------- */
function tfRound(el,items,st,opt){opt=opt||{};const SECS=opt.secs||10;let i=0,right=0,timer=null,left=SECS,list=shuffle(items),answered=false;
  function intro(){el.innerHTML=`<div class="tf-stage"><p class="lead">${opt.intro||'عبارات سريعة: قرّر خلال ثوانٍ هل العبارة صحيحة أم خاطئة.'}</p><p class="muted">${list.length} عبارات · ${SECS} ثوانٍ لكل عبارة${G.teams?' · تتناوب المجموعات على العبارات':''}</p><button class="btn" type="button" id="tfGo">ابدأ الجولة الخاطفة</button></div>`;
    el.querySelector('#tfGo').onclick=()=>{i=0;right=0;show();};}
  function ring(){const c=2*Math.PI*36;return `<svg class="ring" viewBox="0 0 84 84"><circle class="bg" cx="42" cy="42" r="36"/><circle class="fg" cx="42" cy="42" r="36" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-left/SECS)}"/><text x="42" y="44">${left}</text></svg>`;}
  function show(){answered=false;left=SECS;if(G.teams){G.team=i%G.teams.length;hud();}
    const it=list[i];el.innerHTML=`<div class="tf-stage"><div class="ch-top" style="width:100%"><span class="eyebrow">العبارة ${i+1} من ${list.length}${G.teams?' · دور '+G.teams[G.team].n:''}</span><div class="prog"><i style="width:${i/list.length*100}%"></i></div></div><div class="tfring">${ring()}</div><p class="tf-q">${it[0]}</p>
      ${it[3]?`<div class="center">${pic(it[3],'','tf-im')}</div>`:''}<div class="tf-btns"><button class="btn t" type="button" data-v="1">${opt.tl||'صح ✓'}</button><button class="btn f" type="button" data-v="0">${opt.fl||'خطأ ✗'}</button></div><div class="qfb" style="width:100%"></div><div class="row-actions" id="tfN"></div></div>`;
    el.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>ans(+b.dataset.v===1));
    clearInterval(timer);timer=setInterval(()=>{if(G.paused||G.cur!==el.closest('.st').id.slice(3))return;left--;const r=el.querySelector('.tfring');if(r)r.innerHTML=ring();if(left<=3&&left>0)SFX.tick();if(left<=0)ans(null);},1000);}
  function ans(v){if(answered)return;answered=true;clearInterval(timer);const it=list[i],fb=el.querySelector('.qfb');
    el.querySelectorAll('[data-v]').forEach(b=>b.disabled=true);
    if(v===it[1]){right++;G.good();G.add(5,st);say(fb,'ok','صحيح! '+(it[2]||''));}
    else{G.bad();say(fb,'bad',(v===null?'انتهى الوقت. ':'')+(opt.tl?'الإجابة: '+(it[1]?opt.tl:opt.fl):'العبارة '+(it[1]?'صحيحة':'خاطئة'))+'. '+(it[2]||''));}
    const last=i===list.length-1;el.querySelector('#tfN').innerHTML=`<button class="btn" type="button" id="tfNext">${last?'النتيجة':'العبارة التالية'}</button>`;
    el.querySelector('#tfNext').onclick=()=>{if(last)end();else{i++;show();}};}
  function end(){el.innerHTML=`<div class="tf-stage"><h3 style="font-size:1.6rem">انتهت الجولة الخاطفة</h3><span class="big-score">${right} / ${list.length}</span><p>${right===list.length?'أداء مثالي!':right>=list.length*.7?'أداء رائع!':'راجع العبارات التي أخطأت فيها.'}</p><button class="btn alt" type="button" id="tfAgain">جولة جديدة</button></div>`;
    el.querySelector('#tfAgain').onclick=()=>{list=shuffle(items);intro();};opt.onEnd&&opt.onEnd(right);}
  intro();return {stop(){clearInterval(timer);},reset(){clearInterval(timer);list=shuffle(items);intro();}};
}

/* ---------- team race (cars / rope / pyramid) ---------- */
function race(el,cfg,st){
  const theme=cfg.theme;let R=null;
  function setup(){
    const fixed2=theme==='rope';
    el.innerHTML=`<div class="arena">${draw(null)}<div class="turn"><div class="race-setup">${fixed2?'<span>فريقان يتنافسان</span>':`<label for="rN_${theme}">عدد المجموعات:</label><select id="rN_${theme}"><option value="2">2</option><option value="3">3</option><option value="4" selected>4</option><option value="5">5</option></select>`}
      <label for="rG_${theme}">طول السباق:</label><select id="rG_${theme}"><option value="4">قصير</option><option value="6" selected>متوسط</option><option value="8">طويل</option></select>
      <button class="btn" type="button" id="rGo_${theme}">${cfg.startLabel||'انطلق!'}</button></div></div></div><p class="hint-line">${cfg.how}</p>`;
    el.querySelector('#rGo_'+theme).onclick=()=>{const n=fixed2?2:+el.querySelector('#rN_'+theme).value;const goal=+el.querySelector('#rG_'+theme).value;
      setTeams(n);R={n,goal,pos:Array(n).fill(0),rope:0,turn:0,pool:shuffle(cfg.qs),k:0,life:Array(n).fill(1),win:null};SFX.start();ask();};
  }
  function draw(R){
    const W=900,H=theme==='cars'?Math.max(260,(R?R.n:4)*62+40):300;let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${cfg.title}">`;
    if(theme==='cars'){
      s+=`<rect width="${W}" height="${H}" fill="#3b4a52"/><rect y="0" width="${W}" height="14" fill="#6aa84f"/><rect y="${H-14}" width="${W}" height="14" fill="#6aa84f"/>`;
      const n=R?R.n:4,lane=(H-28)/n,goal=R?R.goal:6,x0=170,x1=W-70;
      for(let k=0;k<=goal;k++){const x=x0+(x1-x0)*k/goal;s+=`<line x1="${x}" y1="14" x2="${x}" y2="${H-14}" stroke="#ffffff" stroke-opacity=".12" stroke-width="2"/><text x="${x}" y="${H-2}" text-anchor="middle" font-family="Share Tech Mono" font-size="11" fill="#fff">${k}</text>`;}
      for(let r=0;r<12;r++)for(let c=0;c<2;c++)s+=`<rect x="${x1+c*12}" y="${14+r*(H-28)/12}" width="12" height="${(H-28)/12}" fill="${(r+c)%2?'#111':'#fff'}"/>`;
      for(let i=0;i<n;i++){const y=14+lane*i;if(i)s+=`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#fff" stroke-width="2" stroke-dasharray="18 14" opacity=".6"/>`;
        const p=R?R.pos[i]:0,x=x0+(x1-x0)*p/goal-40,cy=y+lane/2,c=TEAMC[i];
        s+=`<g class="car" style="transition:transform .9s cubic-bezier(.3,1.2,.4,1);transform:translate(${x}px,${cy}px)"><rect x="0" y="-12" width="64" height="20" rx="7" fill="${c}"/><path d="M14 -12 l8 -10 h20 l10 10z" fill="${c}"/><path d="M24 -20 h16 l6 8 h-26z" fill="#cfe8f5"/><circle cx="16" cy="9" r="7" fill="#111"/><circle cx="50" cy="9" r="7" fill="#111"/><circle cx="16" cy="9" r="3" fill="#bbb"/><circle cx="50" cy="9" r="3" fill="#bbb"/></g>
          <rect x="6" y="${cy-14}" width="96" height="28" rx="14" fill="${c}"/><text x="54" y="${cy+5}" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="15" fill="#fff" text-anchor="middle">${R?TEAMN[i]:'المجموعة '+(i+1)}</text>`;}
    } else if(theme==='rope'){
      const p=R?R.rope:0,goal=R?R.goal:6,cxm=W/2,unit=(W/2-150)/goal,off=p*unit;
      s+=`<rect width="${W}" height="${H}" fill="var(--wall)"/><rect y="230" width="${W}" height="70" fill="#c9a66b"/><rect x="${cxm-3}" y="150" width="6" height="90" fill="var(--bad)"/>
        <rect x="${cxm-goal*unit-3}" y="200" width="6" height="40" fill="${TEAMC[0]}"/><rect x="${cxm+goal*unit-3}" y="200" width="6" height="40" fill="${TEAMC[1]}"/>
        <g style="transition:transform .9s cubic-bezier(.3,1.3,.4,1);transform:translate(${off}px,0)"><line x1="60" y1="186" x2="${W-60}" y2="186" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/><path d="M${cxm} 186 v-36 l26 10 -26 10" fill="var(--amber)" stroke="#5a3a10"/>`;
      for(let k=0;k<3;k++){[[0,-1],[1,1]].forEach(([t,dir])=>{const bx=t?W-90-k*60:90+k*60;const c=TEAMC[t];
        s+=`<g transform="translate(${bx} 186)"><circle cx="${-dir*10}" cy="-54" r="11" fill="${c}"/><path d="M${-dir*10} -43 L${dir*4} -10 M${dir*4} -10 L${-dir*12} 40 M${dir*4} -10 L${dir*22} 40 M${-dir*6} -32 L${dir*14} 0" stroke="${c}" stroke-width="8" stroke-linecap="round" fill="none"/></g>`;});}
      s+=`</g><text x="40" y="40" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="26" fill="${TEAMC[0]}">${R?TEAMN[0]:'الفريق الأول'}</text><text x="${W-40}" y="40" text-anchor="end" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="26" fill="${TEAMC[1]}">${R?TEAMN[1]:'الفريق الثاني'}</text>
        <text x="${cxm}" y="60" text-anchor="middle" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="22" fill="var(--ink)" direction="rtl">${R?(p===0?'القوى متزنة: ق م = صفر':'قوة محصلة نحو '+TEAMN[p<0?0:1]):'شد الحبل'}</text>`;
    } else { /* pyramid: blocks pushed up an inclined plane */
      const n=R?R.n:4,goal=R?R.goal:6,cw=W/n;
      s+=`<rect width="${W}" height="${H}" fill="#f4d9a0"/><circle cx="${W-60}" cy="50" r="28" fill="#f7b733"/><rect y="270" width="${W}" height="30" fill="#d9b26a"/>`;
      for(let i=0;i<n;i++){const ox=i*cw+cw/2,c=TEAMC[i],p=R?R.pos[i]:0,bw=Math.min(36,cw/(goal+1)*1.3),bh=26;
        s+=`<path d="M${ox-cw*.42} 270 L${ox+cw*.32} ${270-goal*bh*.62} L${ox+cw*.32} 270z" fill="#c8a35a" opacity=".55"/>`;
        let k=0;for(let row=0;k<p;row++){const inRow=Math.max(1,goal-row*2>0?Math.ceil((goal-row)/2):1);for(let j=0;j<inRow&&k<p;j++,k++){const x=ox-inRow*bw/2+j*bw,y=270-(row+1)*bh;s+=`<rect x="${x}" y="${y}" width="${bw-2}" height="${bh-2}" rx="2" fill="${c}" stroke="#5a3a10" stroke-width="1"/>`;}}
        s+=`<text x="${ox}" y="292" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="15" fill="#3b2a10">${R?TEAMN[i]+' · '+p+'/'+goal:''}</text>`;}
    }
    return s+'</svg>';
  }
  function ask(){
    if(R.k>=R.pool.length){R.pool=shuffle(cfg.qs);R.k=0;}
    const q=R.pool[R.k++];G.team=R.turn;hud();const t=G.teams[R.turn];
    el.innerHTML=`<div class="arena">${draw(R)}<div class="turn"><span class="who" style="background:${t.c}">دور ${t.n}</span><span class="lifelines"><button class="tbtn" type="button" id="rLife" ${R.life[R.turn]?'':'disabled'}>✂️ حذف إجابتين (${R.life[R.turn]})</button></span><span class="muted" style="margin-inline-start:auto">${cfg.rule||'الإجابة الصحيحة = خطوة إلى الأمام'}</span></div></div><div class="card mt" id="rQ"></div>`;
    const box=el.querySelector('#rQ');
    box.innerHTML=`<p class="q">${q.q}</p>${q.fig||''}<div class="opts cols2">${q.o.map((x,i)=>`<button type="button" class="opt" data-i="${i}">${x}</button>`).join('')}</div><div class="qfb"></div><div class="row-actions" id="rN"></div>`;
    let over=false;
    el.querySelector('#rLife').onclick=()=>{if(!R.life[R.turn])return;R.life[R.turn]=0;let k=0;shuffle(q.o.map((_,i)=>i).filter(i=>i!==q.a)).forEach(i=>{if(k<2&&q.o.length>2){box.querySelector(`[data-i="${i}"]`).disabled=true;box.querySelector(`[data-i="${i}"]`).style.opacity=.3;k++;}});el.querySelector('#rLife').disabled=true;G.tick();};
    box.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(over)return;over=true;const i=+b.dataset.i,fb=box.querySelector('.qfb');box.querySelectorAll('.opt').forEach(x=>x.disabled=true);
      if(i===q.a){b.classList.add('ok');G.good();G.add(5,st);if(theme==='rope')R.rope+=R.turn===0?-1:1;else R.pos[R.turn]++;
        theme==='cars'?SFX.engine():theme==='pyramid'?SFX.thud():null;say(fb,'ok','صحيح! '+(q.why||''));}
      else{b.classList.add('bad');box.querySelector(`[data-i="${q.a}"]`).classList.add('ok');G.bad();say(fb,'bad','الإجابة الصحيحة باللون الأخضر. '+(q.why||''));}
      el.querySelector('.arena svg').outerHTML=draw(R);
      const w=theme==='rope'?(Math.abs(R.rope)>=R.goal?(R.rope<0?0:1):null):R.pos.findIndex(p=>p>=R.goal);
      if(w!=null&&w>=0){R.win=w;setTimeout(()=>finish(w),900);return;}
      R.turn=(R.turn+1)%R.n;
      box.querySelector('#rN').innerHTML=`<button class="btn" type="button" id="rNext">دور ${G.teams[R.turn].n}</button>`;box.querySelector('#rNext').onclick=ask;});
  }
  function finish(w){SFX.fanfare();rain(160);banner('فاز فريق '+TEAMN[w]+'!',cfg.winSub||'');G.complete(st);
    el.innerHTML=`<div class="arena">${draw(R)}<div class="turn"><span class="who" style="background:${TEAMC[w]}">🏆 الفائز: ${TEAMN[w]}</span><button class="btn alt" type="button" id="rAgain" style="margin-inline-start:auto">سباق جديد</button></div></div>`;
    el.querySelector('#rAgain').onclick=setup;}
  setup();return {reset:setup};
}

/* ---------- images ---------- */
const img=n=>(window.IMG||{})[n]||'';
const pic=(n,alt,cls)=>img(n)?`<img class="${cls||'ph'}" src="${img(n)}" alt="${alt||''}" loading="lazy">`:'';

/* ---------- explanation slides (visual lesson content) ---------- */
function slides(el,items,st,onAll){let i=0;const seen=new Set();
  function render(){const it=items[i];seen.add(i);if(seen.size===items.length&&onAll)onAll();
    el.innerHTML=`<div class="sl"><div class="sl-media">${(it.im||[]).map(n=>`<figure>${pic(n[0]||n,n[1]||'')}${n[1]?`<figcaption>${n[1]}</figcaption>`:''}</figure>`).join('')}${it.svg||''}</div>
      <div class="sl-text"><span class="eyebrow">${it.k||''}</span><h3 class="sl-t">${it.t}</h3>${it.html}</div></div>
      <div class="sl-nav"><button class="tbtn" type="button" data-p ${i===0?'disabled':''}>→ السابق</button><span class="dots">${items.map((_,k)=>`<button type="button" class="dot${k===i?' on':''}${seen.has(k)?' seen':''}" data-k="${k}" aria-label="شريحة ${k+1}"></button>`).join('')}</span><button class="btn" type="button" data-n ${i===items.length-1?'disabled':''}>التالي ←</button></div>`;
    const sl=el.querySelector('.sl');if(!G.reduced){sl.classList.remove('in');void sl.offsetWidth;sl.classList.add('in');}
    el.querySelector('[data-p]').onclick=()=>{if(i>0){i--;SFX.pop();render();}};
    el.querySelector('[data-n]').onclick=()=>{if(i<items.length-1){i++;SFX.pop();render();}};
    el.querySelectorAll('.dot').forEach(d=>d.onclick=()=>{i=+d.dataset.k;render();});}
  render();return {reset(){i=0;seen.clear();render();}};}

/* ---------- before / after slider ---------- */
function beforeAfter(el,cfg){
  el.innerHTML=`<div class="ba-wrap" style="aspect-ratio:${cfg.ratio||'16/10'}"><div class="ba-layer ba-b">${cfg.b}</div><div class="ba-layer ba-a">${cfg.a}</div><div class="ba-line"><span>⇆</span></div>
    <span class="ba-tag t1">${cfg.la||'قبل'}</span><span class="ba-tag t2">${cfg.lb||'بعد'}</span></div><input type="range" min="0" max="100" value="50" class="ba-range" aria-label="اسحب للمقارنة">`;
  const w=el.querySelector('.ba-wrap'),a=el.querySelector('.ba-a'),ln=el.querySelector('.ba-line'),r=el.querySelector('.ba-range');
  const set=v=>{a.style.clipPath=`inset(0 0 0 ${v}%)`;ln.style.left=v+'%';r.value=v;};
  r.oninput=()=>set(+r.value);
  const mv=e=>{const b=w.getBoundingClientRect();set(Math.max(0,Math.min(100,(e.clientX-b.left)/b.width*100)));};
  w.addEventListener('pointerdown',e=>{w.setPointerCapture(e.pointerId);mv(e);w.onpointermove=mv;});w.addEventListener('pointerup',()=>{w.onpointermove=null;});
  set(50);}

/* ---------- safety gate ---------- */
function safety(el,items,onPass){let k=0;
  function render(){if(k>=items.length){el.innerHTML=`<div class="gate ok"><b>✓ اجتزت فحص السلامة!</b><span>يمكنك دخول المختبر الآن.</span></div>`;SFX.stationDone();onPass&&onPass();return;}
    const it=items[k];el.innerHTML=`<div class="gate"><div class="gate-top"><span class="eyebrow">فحص السلامة ${k+1} من ${items.length}</span><div class="prog"><i style="width:${k/items.length*100}%"></i></div></div>${it[2]?`<div class="gate-ic">${it[2]}</div>`:''}<p class="q">${it[0]}</p><div class="tf-btns"><button class="btn t" type="button" data-v="1">✓ تصرّف آمن</button><button class="btn f" type="button" data-v="0">✗ تصرّف خطر</button></div><div class="qfb"></div></div>`;
    el.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{const v=+b.dataset.v===1,fb=el.querySelector('.qfb');
      if(v===it[1]){G.good();G.add(3,G.cur);k++;setTimeout(render,550);say(fb,'ok','صحيح!');}
      else{G.bad();say(fb,'bad',it[3]||'فكّر مرة أخرى في قواعد السلامة.');}});}
  render();return {reset(){k=0;render();}};}

/* ---------- anticipation guide (توجيه القراءة) ---------- */
function anticip(el,items){const pick={};
  el.innerHTML=`<div class="tablewrap"><table class="data ag"><thead><tr><th>العبارة</th><th>قبل القراءة</th><th class="agr">بعد القراءة</th></tr></thead><tbody>${items.map((it,i)=>`<tr><td>${i+1}. ${it[0]}</td><td><span class="seg" data-i="${i}"><button type="button" data-v="1">م</button><button type="button" data-v="0">غ</button></span></td><td class="agr" data-r="${i}">—</td></tr>`).join('')}</tbody></table></div>
   <p class="step-text muted" style="font-size:.88rem">م = موافق، غ = غير موافق. سجّل رأيك قبل الدرس، ثم اكشف الإجابات بعد القراءة.</p><div class="row-actions"><button class="btn alt" type="button" data-show>اكشف الإجابات بعد القراءة</button></div>`;
  el.querySelectorAll('.seg[data-i] button').forEach(b=>b.onclick=()=>{const i=+b.parentElement.dataset.i;pick[i]=+b.dataset.v;b.parentElement.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));G.tick();});
  el.querySelector('[data-show]').onclick=()=>{let right=0;items.forEach((it,i)=>{const c=el.querySelector(`[data-r="${i}"]`);const ok=pick[i]===(it[1]?1:0);if(ok)right++;
      c.innerHTML=`<b style="color:${it[1]?'var(--ok)':'var(--bad)'}">${it[1]?'م':'غ'}</b>${pick[i]==null?'':ok?' ✓':' ✗'}${it[2]?`<small class="muted" style="display:block">${it[2]}</small>`:''}`;});
    el.classList.add('shown');G.tick();};}

/* ---------- branching story ---------- */
function story(el,nodes,start,st){let cur=start,path=[];
  function render(){const n=nodes[cur];
    el.innerHTML=`<div class="story-card">${n.im?pic(n.im,'','story-im'):''}<div class="story-body">${n.k?`<span class="eyebrow">${n.k}</span>`:''}<p class="lead">${n.text}</p>${n.end?`<div class="fb ${n.good?'ok':'info'}">${n.end}</div>`:''}
      <div class="opts${n.choices&&n.choices.length>2?' cols2':''}">${(n.choices||[]).map((c,i)=>`<button type="button" class="opt" data-c="${i}">${c.t}</button>`).join('')}</div>
      ${n.end?'<div class="row-actions"><button class="btn alt" type="button" data-r>ابدأ القصة من جديد</button></div>':''}</div></div>`;
    el.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const c=n.choices[+b.dataset.c];path.push(cur);if(c.pts){G.good();G.add(c.pts,st);}else SFX.pop();cur=c.to;render();});
    const r=el.querySelector('[data-r]');if(r)r.onclick=()=>{cur=start;path=[];render();};
    if(n.end&&n.good)G.complete&&0;}
  render();return {reset(){cur=start;render();}};}

/* ---------- escape room ---------- */
function escape(el,cfg,st){let S;
  function init(){S={got:[],k:0,start:0,left:cfg.secs||420,timer:null,open:false};}
  function door(){const n=cfg.locks.length;let s=`<svg viewBox="0 0 300 220" class="door" aria-hidden="true"><rect x="70" y="10" width="160" height="205" rx="8" fill="#6b4226" stroke="#3b2414" stroke-width="5"/><rect x="88" y="28" width="124" height="80" rx="6" fill="#7d4f2e"/><rect x="88" y="120" width="124" height="80" rx="6" fill="#7d4f2e"/><circle cx="205" cy="120" r="7" fill="#f5c542"/>`;
    for(let i=0;i<n;i++){const y=22+i*(176/n),g=S.got[i]!=null;s+=`<g transform="translate(150 ${y+16}) scale(${Math.min(1,4.2/n)})"><rect x="-22" y="-6" width="44" height="34" rx="6" fill="${g?'#1f7a45':'#9aa5ab'}"/><path d="M-12 -6v-8a12 12 0 0 1 24 0v${g?-14:8}" fill="none" stroke="${g?'#1f7a45':'#5b6870'}" stroke-width="5"/><text y="18" text-anchor="middle" font-size="16" font-weight="800" fill="#fff" font-family="Share Tech Mono">${g?S.got[i]:'?'}</text></g>`;}
    return s+'</svg>';}
  function mm(){const s=Math.max(0,S.left);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
  function intro(){el.innerHTML=`<div class="esc"><div class="esc-door">${door()}</div><div><h3>🔐 ${cfg.title}</h3><p class="lead">${cfg.story}</p><p class="muted">${cfg.locks.length} أقفال · كل إجابة صحيحة تكشف رقمًا من رمز الباب · الوقت ${Math.round((cfg.secs||420)/60)} دقائق</p><button class="btn" type="button" data-start>ابدأ المهمة</button></div></div>`;
    el.querySelector('[data-start]').onclick=()=>{S.timer=setInterval(()=>{if(G.paused||G.cur!==st)return;S.left--;const t=el.querySelector('.esc-time');if(t)t.textContent=mm();if(S.left<=10&&S.left>0)SFX.tick();if(S.left<=0){clearInterval(S.timer);lose();}},1000);SFX.start();lock();};}
  function lock(){const i=S.k;if(i>=cfg.locks.length){codeStep();return;}const q=cfg.locks[i];
    el.innerHTML=`<div class="esc"><div class="esc-door">${door()}<div class="esc-time">${mm()}</div></div><div class="card"><span class="eyebrow">القفل ${i+1} من ${cfg.locks.length}</span><div class="esc-q"></div></div></div>`;
    const box=el.querySelector('.esc-q');mcq(box,q,st,ok=>{if(ok){S.got[i]=q.code;SFX.correct();}else S.got[i]=null;
      el.querySelector('.esc-door svg').outerHTML=door();const nav=document.createElement('div');nav.className='row-actions';
      nav.innerHTML=ok?`<span class="status">🔓 فُتح القفل! الرقم: ${q.code}</span><button class="btn" type="button">التالي</button>`:`<button class="btn" type="button">حاول قفلًا آخر</button>`;box.appendChild(nav);
      nav.querySelector('.btn').onclick=()=>{if(ok)S.k++;else{cfg.locks.push(cfg.locks.splice(i,1)[0]);S.got.splice(i,1);}lock();};});}
  function codeStep(){el.innerHTML=`<div class="esc"><div class="esc-door">${door()}<div class="esc-time">${mm()}</div></div><div class="card"><h3>أدخل رمز الباب</h3><p class="step-text">${cfg.codeHint||'اكتب الأرقام بترتيب الأقفال من الأعلى إلى الأسفل.'}</p><form class="answer" autocomplete="off"><label><input inputmode="numeric" aria-label="الرمز"></label><button class="btn" type="submit">افتح الباب</button></form><div class="qfb"></div></div></div>`;
    el.querySelector('form').onsubmit=e=>{e.preventDefault();const v=el.querySelector('input').value.replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).trim();
      if(v===cfg.locks.map(l=>l.code).join('')){clearInterval(S.timer);S.open=true;G.good();G.add(20,st);SFX.fanfare();rain(160);banner('فُتح الباب!','نجحتم في الهروب من '+cfg.title);G.complete(st);
        el.innerHTML=`<div class="esc"><div class="esc-door"><svg viewBox="0 0 300 220" class="door"><rect x="70" y="10" width="160" height="205" rx="8" fill="#ffe9a8"/><path d="M70 10 L130 30 L130 205 L70 215z" fill="#6b4226"/></svg></div><div class="final-hero"><h2 style="font-size:1.8rem">🎉 خرجتم بنجاح!</h2><p>الوقت المتبقي: ${mm()}</p>${cfg.outro?`<p>${cfg.outro}</p>`:''}<button class="btn alt" type="button" data-again>العبوا من جديد</button></div></div>`;
        el.querySelector('[data-again]').onclick=()=>{init();intro();};}
      else{G.bad();say(el.querySelector('.qfb'),'bad','الرمز غير صحيح. تحقق من ترتيب الأرقام.');}};}
  function lose(){el.innerHTML=`<div class="final-hero"><h2 style="font-size:1.6rem">⏰ انتهى الوقت!</h2><p>حاولوا مرة أخرى بسرعة أكبر.</p><button class="btn" type="button" data-again>إعادة المحاولة</button></div>`;el.querySelector('[data-again]').onclick=()=>{init();intro();};}
  init();intro();return {reset(){clearInterval(S.timer);init();intro();},stop(){}};}

/* ---------- statements auction ---------- */
function auction(el,items,st){let R;const BIDS=[0,10,20,30,50];
  function setup(){el.innerHTML=`<div class="race-setup"><label>عدد المجموعات:</label><select data-n><option>2</option><option>3</option><option selected>4</option><option>5</option></select><button class="btn" type="button" data-start>افتح المزاد 🔨</button></div><p class="hint-line">تبدأ كل مجموعة برصيد 100 نقطة. في كل جولة تقرر المجموعة: هل العبارة صحيحة أم خاطئة؟ وكم تزايد عليها؟ الإجابة الصحيحة تربح مبلغ المزايدة، والخاطئة تخسره.</p>`;
    el.querySelector('[data-start]').onclick=()=>{const n=+el.querySelector('[data-n]').value;setTeams(n);R={n,bank:Array(n).fill(100),k:0,list:shuffle(items).slice(0,Math.min(6,items.length)),bid:[],cho:[]};SFX.start();round();};}
  function bankRow(){return `<div class="bank">${R.bank.map((b,i)=>`<span class="who" style="background:${TEAMC[i]}">${TEAMN[i]}: ${b}</span>`).join('')}</div>`;}
  function round(){if(R.k>=R.list.length){end();return;}const it=R.list[R.k];R.bid=Array(R.n).fill(10);R.cho=Array(R.n).fill(null);
    el.innerHTML=`${bankRow()}<div class="card mt"><span class="eyebrow">الجولة ${R.k+1} من ${R.list.length}</span><p class="tf-q" style="text-align:center;margin:8px auto">${it[0]}</p>${it[3]?`<div class="center">${pic(it[3],'','auc-im')}</div>`:''}
      <div class="auc">${Array.from({length:R.n},(_,i)=>`<div class="auc-row" data-t="${i}"><span class="who" style="background:${TEAMC[i]}">${TEAMN[i]}</span><span class="seg" data-c><button type="button" data-v="1">صحيحة</button><button type="button" data-v="0">خاطئة</button></span><span class="seg" data-b>${BIDS.map(b=>`<button type="button" data-v="${b}" class="${b===10?'on':''}">${b}</button>`).join('')}</span></div>`).join('')}</div>
      <div class="row-actions"><button class="btn" type="button" data-rev>اكشف الإجابة 🔨</button></div><div class="qfb"></div></div>`;
    el.querySelectorAll('.auc-row').forEach(r=>{const t=+r.dataset.t;r.querySelectorAll('[data-c] button').forEach(b=>b.onclick=()=>{R.cho[t]=+b.dataset.v;r.querySelectorAll('[data-c] button').forEach(x=>x.classList.toggle('on',x===b));G.tick();});
      r.querySelectorAll('[data-b] button').forEach(b=>b.onclick=()=>{const v=Math.min(+b.dataset.v,Math.max(0,R.bank[t]));R.bid[t]=v;r.querySelectorAll('[data-b] button').forEach(x=>x.classList.toggle('on',x===b));G.tick();});});
    el.querySelector('[data-rev]').onclick=()=>{if(R.cho.some(c=>c==null)){say(el.querySelector('.qfb'),'bad','على كل مجموعة أن تختار: صحيحة أم خاطئة.');return;}
      const truth=it[1]?1:0;let msg=[];R.cho.forEach((c,i)=>{const d=c===truth?R.bid[i]:-R.bid[i];R.bank[i]+=d;G.teams[i].s+=Math.max(0,d);msg.push(`${TEAMN[i]} ${d>=0?'+':''}${d}`);});hud();
      SFX.thud();say(el.querySelector('.qfb'),'ok',`العبارة <b>${it[1]?'صحيحة':'خاطئة'}</b>. ${it[2]||''}<br>${msg.join(' · ')}`);
      el.querySelector('[data-rev]').outerHTML=`<button class="btn" type="button" data-nx>${R.k<R.list.length-1?'الجولة التالية':'النتيجة'}</button>`;el.querySelector('[data-nx]').onclick=()=>{R.k++;round();};
      el.querySelector('.bank').outerHTML=bankRow();};}
  function end(){const best=R.bank.indexOf(Math.max(...R.bank));SFX.fanfare();rain(140);banner('الفائز في المزاد: '+TEAMN[best],'أكبر رصيد: '+R.bank[best]);G.complete(st);
    el.innerHTML=`${bankRow()}<div class="final-hero"><h2 style="font-size:1.7rem">🏆 ${TEAMN[best]}</h2><p>الثقة بالمعلومة الصحيحة تربح!</p><button class="btn alt" type="button" data-again>مزاد جديد</button></div>`;el.querySelector('[data-again]').onclick=setup;}
  setup();return {reset:setup};}

/* ---------- term bingo (shared board) ---------- */
function bingo(el,pairs,st){let B;
  function setup(){el.innerHTML=`<div class="race-setup"><label>عدد المجموعات:</label><select data-n><option>2</option><option>3</option><option selected>4</option></select><button class="btn" type="button" data-start>ابدأ البنغو 🎯</button></div><p class="hint-line">يظهر تعريف، وتختار المجموعة صاحبة الدور المصطلح المناسب من اللوحة. المربع الصحيح يُلوّن بلون المجموعة. أول مجموعة تكمل صفًّا أو عمودًا أو قطرًا تصرخ: بنغو!</p>`;
    el.querySelector('[data-start]').onclick=()=>{const n=+el.querySelector('[data-n]').value;setTeams(n);const cells=shuffle(pairs).slice(0,16);B={n,cells,own:Array(16).fill(-1),order:shuffle([...Array(cells.length).keys()]),k:0,turn:0,win:null};SFX.start();render();};}
  function line(t){const L=[];for(let r=0;r<4;r++)L.push([0,1,2,3].map(c=>r*4+c));for(let c=0;c<4;c++)L.push([0,1,2,3].map(r=>r*4+c));L.push([0,5,10,15],[3,6,9,12]);return L.some(l=>l.every(i=>B.own[i]===t));}
  function render(){const q=B.cells[B.order[B.k]];G.team=B.turn;hud();
    el.innerHTML=`<div class="two"><div class="bingo">${B.cells.map((c,i)=>`<button type="button" class="bcell" data-i="${i}" ${B.own[i]>=0?`style="background:${TEAMC[B.own[i]]};color:#fff" disabled`:''}>${c[0]}</button>`).join('')}</div>
      <div class="card"><span class="who" style="background:${TEAMC[B.turn]}">دور ${TEAMN[B.turn]}</span><p class="eyebrow mt">التعريف:</p><p class="tf-q" style="font-size:1.3rem;text-align:start">${q[1]}</p><div class="qfb"></div></div></div>`;
    el.querySelectorAll('.bcell').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,fb=el.querySelector('.qfb');
      if(B.cells[i]===q){B.own[i]=B.turn;G.good();G.add(5,st);if(line(B.turn)){B.win=B.turn;SFX.fanfare();rain(160);banner('بنغو! '+TEAMN[B.turn],'أكملتم خطًّا كاملًا');G.complete(st);render();el.querySelector('.card').innerHTML=`<h2>🎯 بنغو! ${TEAMN[B.win]}</h2><button class="btn alt" type="button" data-again>لعبة جديدة</button>`;el.querySelector('[data-again]').onclick=setup;return;}
        next();}
      else{G.bad();b.classList.add('bad');say(fb,'bad',`ليس «${B.cells[i][0]}». الإجابة: ${q[0]}. ينتقل الدور.`);const j=B.cells.indexOf(q);setTimeout(()=>next(j),1500);}});}
  function next(){B.k=(B.k+1)%B.order.length;let g=0;while(B.own[B.order[B.k]]>=0&&g++<20)B.k=(B.k+1)%B.order.length;B.turn=(B.turn+1)%B.n;if(B.own.every(o=>o>=0)){setup();return;}render();}
  setup();return {reset:setup};}

/* ---------- choice board 3x3 (differentiation) ---------- */
function choiceBoard(el,tasks,st,onAll){const done=new Set();
  function render(){el.innerHTML=`<p class="step-text">اختر ثلاث مهام تكوّن خطًّا (أفقيًا أو رأسيًا أو قطريًا) كما في لعبة «إكس-أو»، وأنجزها.</p><div class="cboard">${tasks.map((t,i)=>`<button type="button" class="cb${done.has(i)?' done':''}" data-i="${i}"><span class="cb-ic">${t.ic||'⭐'}</span><b>${t.t}</b><small>${t.kind}</small></button>`).join('')}</div><div class="cb-task mt"></div>`;
    el.querySelectorAll('.cb').forEach(b=>b.onclick=()=>open(+b.dataset.i));}
  const L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function mark(i){done.add(i);el.querySelector(`.cb[data-i="${i}"]`).classList.add('done');if(L.some(l=>l.every(k=>done.has(k)))&&onAll){onAll();banner('أكملت خطًّا في لوحة الخيارات!','أحسنت الاختيار والإنجاز');}}
  function open(i){const t=tasks[i],box=el.querySelector('.cb-task');el.querySelectorAll('.cb').forEach(b=>b.classList.toggle('sel',+b.dataset.i===i));
    box.innerHTML=`<div class="card"><h3>${t.ic||''} ${t.t}</h3><div class="cb-body"></div></div>`;const body=box.querySelector('.cb-body');
    if(t.o)mcq(body,t,st,ok=>{if(ok)mark(i);});else if(t.v!=null)calcQ(body,t,st,ok=>{if(ok)mark(i);});
    else{body.innerHTML=`<p class="step-text">${t.p}</p><div class="row-actions"><button class="btn alt" type="button">✓ أنجزت المهمة في دفتري</button></div>`;body.querySelector('.btn').onclick=()=>{G.add(5,st);G.good();mark(i);};}
    try{box.scrollIntoView({behavior:'smooth',block:'nearest'});}catch(e){}}
  render();return {reset(){done.clear();render();}};}

/* ---------- self-test with model answers ---------- */
function solutions(el,items,st,onAll){const shown=new Set();
  el.innerHTML=`<div class="row-actions" style="margin:0 0 10px"><button class="tbtn" type="button" data-all>إظهار كل الحلول</button><button class="tbtn" type="button" data-hide>إخفاء كل الحلول</button></div><div class="prob-list">${items.map((it,i)=>`<div class="prob st-q"><div class="ptitle"><span class="tag">${i+1}</span><span>${it.k}</span></div><p class="q" style="font-weight:600">${it.q}</p>${it.fig||''}<p class="step-text muted" style="font-size:.9rem">فكّر واكتب إجابتك في دفترك أولًا، ثم اكشف الحل.</p><button class="btn alt" type="button" data-s="${i}">إظهار الحل</button><div class="solve-box" data-b="${i}" hidden><dl class="solve">${it.a.map(([t,d])=>`<dt>${t}</dt><dd>${d}</dd>`).join('')}</dl></div></div>`).join('')}</div>`;
  const show=(i,on)=>{const b=el.querySelector(`[data-b="${i}"]`),btn=el.querySelector(`[data-s="${i}"]`);b.hidden=!on;btn.textContent=on?'إخفاء الحل':'إظهار الحل';if(on){shown.add(i);if(shown.size===items.length&&onAll)onAll();}};
  el.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const i=+b.dataset.s;const on=el.querySelector(`[data-b="${i}"]`).hidden;show(i,on);G.tick();});
  el.querySelector('[data-all]').onclick=()=>{items.forEach((_,i)=>show(i,true));G.tick();};
  el.querySelector('[data-hide]').onclick=()=>{items.forEach((_,i)=>show(i,false));};
  return {reset(){shown.clear();items.forEach((_,i)=>show(i,false));}};}

/* ---------- «من أنا؟» riddle cards: fewer clues = more points ---------- */
function riddles(el,items,st,onDone){let i=0,shown=1,over=false,right=0;let list=shuffle(items);
  function render(){const it=list[i];over=false;if(G.teams){G.team=i%G.teams.length;hud();}
    el.innerHTML=`<div class="ch-top"><span class="eyebrow">اللغز ${i+1} من ${list.length}${G.teams?' · دور '+G.teams[G.team].n:''}</span><div class="prog"><i style="width:${i/list.length*100}%"></i></div></div>
      <div class="story" style="font-size:1.1rem"><b>من أنا؟</b><ol class="tasks plain" style="margin-top:8px">${it.clues.slice(0,shown).map(c=>`<li>${c}</li>`).join('')}</ol></div>
      <div class="row-actions"><button class="tbtn" type="button" data-more ${shown>=it.clues.length?'disabled':''}>🔎 دليل إضافي (${it.clues.length-shown} متبقٍ)</button><span class="cnt-badge">نقاط هذا اللغز: ${[10,7,4,2][shown-1]||2}</span></div>
      <div class="opts cols2 mt">${it.o.map((x,k)=>`<button type="button" class="opt" data-k="${k}">${x}</button>`).join('')}</div><div class="qfb"></div><div class="row-actions" data-nav></div>`;
    el.querySelector('[data-more]').onclick=()=>{if(over)return;shown=Math.min(it.clues.length,shown+1);G.tick();render();};
    el.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{if(over)return;over=true;const k=+b.dataset.k,fb=el.querySelector('.qfb');el.querySelectorAll('[data-k]').forEach(x=>x.disabled=true);
      if(k===it.a){right++;b.classList.add('ok');G.good();G.add([10,7,4,2][shown-1]||2,st);say(fb,'ok','أحسنت! '+(it.why||''));}
      else{b.classList.add('bad');el.querySelector(`[data-k="${it.a}"]`).classList.add('ok');G.bad();say(fb,'bad','الإجابة: '+it.o[it.a]+'. '+(it.why||''));}
      const last=i===list.length-1;const nav=el.querySelector('[data-nav]');nav.innerHTML=`<button class="btn" type="button">${last?'النتيجة':'اللغز التالي'}</button>`;
      nav.firstChild.onclick=()=>{if(last){el.innerHTML=`<div class="final-hero"><h3 style="font-size:1.5rem">انتهت الألغاز</h3><span class="big-score">${right} / ${list.length}</span><button class="btn alt" type="button" data-again>ألغاز جديدة</button></div>`;el.querySelector('[data-again]').onclick=()=>{i=0;shown=1;right=0;list=shuffle(items);render();};onDone&&onDone(right);}else{i++;shown=1;render();}};});}
  render();return {reset(){i=0;shown=1;right=0;list=shuffle(items);render();}};}

/* ---------- hidden-picture puzzle: each right answer uncovers a tile ---------- */
function puzzle(el,cfg,st,onDone){const N=cfg.qs.length;let open=new Set(),k=0,solved=false,order=shuffle([...Array(N).keys()]);const cols=Math.ceil(Math.sqrt(N)),rows=Math.ceil(N/cols);
  function board(){const W=600,H=360,tw=W/cols,th=H/rows;let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="لوحة الصورة المخفية">${cfg.art}`;
    if(!solved)for(let t=0;t<N;t++){if(open.has(t))continue;const x=(t%cols)*tw,y=Math.floor(t/cols)*th;s+=`<rect x="${x+1}" y="${y+1}" width="${tw-2}" height="${th-2}" rx="8" fill="var(--accent)"/><text x="${x+tw/2}" y="${y+th/2+12}" text-anchor="middle" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="34" fill="#fff">${t+1}</text>`;}
    return s+'</svg>';}
  function render(){if(G.teams){G.team=k%G.teams.length;hud();}
    const q=k<N?cfg.qs[order[k]]:null;
    el.innerHTML=`<div class="two"><div class="arena">${board()}</div><div><div id="pzQ_${st}"></div><div class="card mt"><p class="q">${cfg.guess}</p><div class="opts cols2">${cfg.o.map((x,i)=>`<button type="button" class="opt" data-g="${i}">${x}</button>`).join('')}</div><div class="qfb" data-gfb></div></div></div></div>`;
    const box=el.querySelector('#pzQ_'+st);
    if(q&&!solved){box.innerHTML='<div class="card"></div>';mcq(box.firstChild,q,st,ok=>{if(ok){open.add(order[k]);SFX.pop();}el.querySelector('.arena').innerHTML=board();const nav=document.createElement('div');nav.className='row-actions';nav.innerHTML='<button class="btn" type="button">السؤال التالي</button>';box.firstChild.appendChild(nav);nav.firstChild.onclick=()=>{k++;render();};});}
    else if(!solved)box.innerHTML='<div class="fb info">انتهت الأسئلة. خمّن الصورة الآن!</div>';
    el.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{if(solved)return;const g=+b.dataset.g,fb=el.querySelector('[data-gfb]');
      if(g===cfg.a){solved=true;const p=Math.max(5,(N-open.size)*3+5);G.good();G.add(p,st);el.querySelector('.arena').innerHTML=board();b.classList.add('ok');say(fb,'ok',`تخمين صحيح بعد كشف ${open.size} من ${N} مربعات! ${cfg.why||''}`);SFX.fanfare();rain(100);onDone&&onDone();
        if(box)box.innerHTML='';const nav=document.createElement('div');nav.className='row-actions';nav.innerHTML='<button class="btn alt" type="button">العب من جديد</button>';fb.after(nav);nav.firstChild.onclick=()=>{open=new Set();k=0;solved=false;order=shuffle(order);render();};}
      else{b.classList.add('bad');b.disabled=true;G.bad();say(fb,'bad','ليست هي. أجب عن سؤال آخر لتكشف جزءًا جديدًا.');}});}
  render();return {reset(){open=new Set();k=0;solved=false;render();}};}

/* ---------- challenge (summative) ---------- */
function challenge(el,QS,st){
  let C;
  function init(){C={i:0,right:0};}
  function render(){
    if(C.i>=QS.length){const pct=Math.round(C.right/QS.length*100);G.ch={right:C.right,total:QS.length};G.complete(st);
      el.innerHTML=`<div class="final-hero" style="padding-top:4px"><h2 style="font-size:1.8rem">انتهى تحدي العلماء</h2><span class="big-score">${C.right} / ${QS.length}</span><p>${pct>=75?'نتيجة ممتازة. أنت جاهز للوحة الإنجاز.':'راجع المحطات التي أخطأت في أسئلتها، ثم أعد التحدي.'}</p><div class="row-actions" style="justify-content:center"><button class="btn" type="button" data-go="final">لوحة الإنجاز</button><button class="btn alt" type="button" id="chAgain">أعد التحدي</button></div></div>`;
      el.querySelector('#chAgain').onclick=()=>{init();render();};return;}
    const q=QS[C.i];
    el.innerHTML=`<div class="ch-top"><span class="eyebrow">السؤال ${C.i+1} من ${QS.length} · ${q.k}</span><div class="prog"><i style="width:${C.i/QS.length*100}%"></i></div></div><div id="chQ_${st}"></div><div class="row-actions" id="chNav_${st}"></div>`;
    let answered=false;
    const done=ok=>{if(answered)return;answered=true;if(ok)C.right++;const nav=el.querySelector('#chNav_'+st);nav.innerHTML=`<button class="btn" type="button">${C.i<QS.length-1?'السؤال التالي':'عرض النتيجة'}</button>`;nav.firstChild.onclick=()=>{C.i++;render();};};
    const box=el.querySelector('#chQ_'+st);
    if(q.t==='calc')calcQ(box,q,st,done);
    else if(q.t==='multi'){const items=q.items;
      box.innerHTML=`<p class="q">${q.q}</p><div class="opts cols2">${items.map(([t,c],i)=>`<button type="button" class="opt" data-m="${i}" aria-pressed="false"${c?' data-c="1"':''}>${t}</button>`).join('')}</div><div class="row-actions"><button class="btn" type="button" data-chk>تحقق</button></div><div class="qfb"></div>`;
      let tries=0;const fb=box.querySelector('.qfb');
      box.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{if(answered)return;const on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);b.classList.toggle('picked',on);});
      box.querySelector('[data-chk]').onclick=()=>{if(answered)return;const pick=[...box.querySelectorAll('[data-m]')].map(b=>b.getAttribute('aria-pressed')==='true');const ok=items.every(([,c],i)=>!!c===pick[i]);
        if(ok){G.good();G.add(tries?4:10,st);say(fb,'ok','صحيح. '+(q.why||''));done(true);}
        else{tries++;G.bad();if(tries>=2){box.querySelectorAll('[data-m]').forEach((b,i)=>b.classList.add(items[i][1]?'ok':'bad'));say(fb,'bad','الأخضر هو الصحيح. '+(q.why||''));done(false);}else say(fb,'bad',q.hint||'راجع اختياراتك.');}};}
    else mcq(box,q,st,ok=>done(ok));
  }
  init();render();return {reset(){init();render();},refresh(){}};
}

/* ---------- formative per station ---------- */
function formative(id){const st=STN[id];
  if(!st||!st.quiz){modal('<h2>تقويم تكويني</h2><p>التقويم التكويني متاح داخل محطات الشرح. انتقل إلى محطة ثم اضغط الزر مرة أخرى.</p>');return;}
  let k=0,right=0;
  const show=()=>{modal(`<span class="eyebrow">تقويم تكويني · ${st.n}</span><h2>سؤال ${k+1} من ${st.quiz.length}</h2><div id="fq"></div><div class="row-actions" id="fqn"></div>`);
    mcq($('#fq'),st.quiz[k],id,ok=>{if(ok)right++;const last=k===st.quiz.length-1;
      $('#fqn').innerHTML=`<button class="btn" type="button" id="fqNext">${last?'عرض النتيجة':'السؤال التالي'}</button>`;
      $('#fqNext').onclick=()=>{if(last){G.form[id]=right;modal(`<h2>نتيجة التقويم التكويني</h2><p class="big-score">${right} / ${st.quiz.length}</p><p>${right===st.quiz.length?'إتقان كامل لأفكار هذه المحطة.':'راجع التفسير العلمي للمحطة، ثم أعد المحاولة.'}</p>`);}else{k++;show();}};});};
  show();}

/* ---------- timer ---------- */
const PLAN={};
G.clock={run:false,el:0,len:45,st:{},nudged:{},last:performance.now()};
const planSum=()=>Object.values(PLAN).reduce((a,b)=>a+b,0)||45;
const budget=id=>(PLAN[id]||0)*G.clock.len/planSum()*60;
const mmss=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
const nextId=id=>{const o=order(),i=o.findIndex(x=>x.id===id);return o[i+1]?o[i+1].id:null;};
function hideNudge(){const n=$('#nudge');if(n)n.hidden=true;}
function nudge(html){const n=$('#nudge');n.innerHTML=html+'<button class="tbtn" type="button" id="nudgeX">متابعة هنا</button>';n.hidden=false;$('#nudgeX').onclick=hideNudge;note(520,0,.2,'triangle',.08);}
function labelBudgets(){order().forEach(o=>{const e=$('#st-'+o.id+' .st-head .eyebrow');if(!e||!PLAN[o.id])return;if(!e.dataset.base)e.dataset.base=e.textContent;e.textContent=e.dataset.base+' · '+Math.round(budget(o.id)/60)+' دقائق';});}
function renderPlan(){const c=G.clock,rows=order().filter(o=>PLAN[o.id]).map(o=>{const used=c.st[o.id]||0;return `<div class="${o.id===G.cur?'cur':''}${G.done[o.id]?' done':''}"><span>${o.n}</span><i>${used>1?mmss(used)+' / ':''}</i><b>${Math.round(budget(o.id)/60)} د</b></div>`;}).join('');
  const html=`<div class="plan">${rows}<div class="tot"><span>المجموع</span><i></i><b>${c.len} د</b></div></div>`;$('#planList').innerHTML=html;const ip=$('#introPlan');if(ip)ip.innerHTML=html;}
function renderClock(){const c=G.clock,b=$('#timerHud'),total=c.len*60,left=total-c.el,bud=budget(G.cur),used=c.st[G.cur]||0;
  if(!c.run&&c.el<0.5){b.textContent='ابدأ الحصة · '+mmss(total);b.className='timer';}
  else{let t='الحصة '+mmss(left);if(bud)t+=' · المحطة '+mmss(bud-used);if(!c.run)t+=' · متوقف';b.textContent=t;b.className='timer'+(left<=0?' end':(bud&&used>bud?' over':''));}
  $('#bTimer').textContent=c.run?'إيقاف المؤقت':(c.el>0.5?'استئناف المؤقت':'ابدأ الحصة');
  if(c.run&&bud&&used>bud&&!c.nudged[G.cur]){c.nudged[G.cur]=true;const n=nextId(G.cur);if(n)nudge(`<span>انتهى الوقت المقترح لهذه المحطة.</span><button class="btn" type="button" data-go="${n}">انتقل إلى ${STN[n].n}</button>`);}
  if(c.run&&left<=0&&!c.nudged._end){c.nudged._end=true;nudge('<span>انتهى زمن الحصة.</span><button class="btn" type="button" data-go="final">لوحة الإنجاز</button>');}}
function toggleClock(){const c=G.clock;c.run=!c.run;c.last=performance.now();G.tick();renderClock();}

/* ---------- station title cards ---------- */
let card,cardT=null;
function showCard(id){const o=STN[id];if(!o)return;const sec=$('#st-'+id),goal=sec&&sec.querySelector('.goal'),eb=sec&&sec.querySelector('.st-head .eyebrow');
  const kicker=id==='intro'?'لنبدأ الرحلة':id==='final'?'نهاية الرحلة':id==='ch'?'التقويم الختامي':(eb?(eb.dataset.base||eb.textContent):'');
  const title=id==='intro'?META.hook:id==='final'?'لوحة الإنجاز':stName(id);
  card.innerHTML=`<div class="fx-card-in"><svg viewBox="0 0 80 80">${o.icon||'<circle cx="40" cy="40" r="26" fill="currentColor"/>'}</svg><span class="k">${kicker}</span><h2>${title}</h2>${goal&&id!=='final'?`<p>${goal.textContent}</p>`:''}<span class="tap">المس الشاشة للمتابعة</span></div>`;
  card.hidden=false;card.classList.remove('out');void card.offsetWidth;card.classList.add('in');clearTimeout(cardT);cardT=setTimeout(hideCard,id==='final'?1300:1700);}
function hideCard(){if(card.hidden)return;card.classList.add('out');clearTimeout(cardT);setTimeout(()=>{card.hidden=true;card.classList.remove('in','out');},380);}
function onGo(id,from){const sec=$('#st-'+id);if(sec&&!G.reduced){sec.classList.remove('enter');void sec.offsetWidth;sec.classList.add('enter');}
  if(id===from)return;const fx=G.fxOn!==false&&$('#startScreen').hidden;if(fx){SFX.stationIn();if(!G.reduced)showCard(id);}
  if(id==='final')setTimeout(()=>{SFX.fanfare();rain(180);setTimeout(()=>rain(120),900);},fx&&!G.reduced?1600:200);}

/* ---------- final board (built-in) ---------- */
function renderFinal(){
  const st=DEFS.filter(d=>d.id!=='intro'&&d.id!=='final'&&d.id!=='goals');
  const mx=Math.max(20,...st.map(o=>G.pts[o.id]||0));const content=DEFS.filter(d=>d.core);const doneN=content.filter(d=>G.done[d.id]).length;
  let teams='';if(G.teams){const t=[...G.teams].sort((a,b)=>b.s-a.s);teams=`<div class="card"><h3>نتائج المجموعات</h3><div class="bars">${t.map((x,i)=>`<div class="bar-row"><span>${i===0?'🏆 ':''}${x.n}</span><div class="track"><div class="fill" style="width:${t[0].s?x.s/t[0].s*100:0}%;background:${x.c}"></div></div><b>${x.s}</b></div>`).join('')}</div></div>`;}
  const box=$('#finalBox');
  box.innerHTML=`<div class="card final-hero"><svg class="medal" viewBox="0 0 120 120" aria-hidden="true"><path d="M38 6h18l8 30H46zM64 6h18l-8 30H56z" style="fill:var(--accent)"/><circle cx="60" cy="74" r="38" style="fill:var(--amber)"/><circle cx="60" cy="74" r="29" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/><path d="M60 54l6 13 14 1-11 9 4 14-13-8-13 8 4-14-11-9 14-1z" fill="#fff"/></svg>
    <span class="eyebrow">لوحة الإنجاز · ${META.title}</span><h2>${META.finalTitle}</h2><span class="big-score">${G.score}</span><p style="margin:0">مجموع النقاط</p></div>
  <div class="two" style="margin-top:14px"><div class="card"><h3>نتيجة التقويم</h3>
    <div class="readouts" style="margin-bottom:12px"><div class="ro"><small>المحطات المكتملة</small><b>${doneN} / ${content.length}</b></div><div class="ro"><small>تحدي العلماء</small><b>${G.ch?G.ch.right+' / '+G.ch.total:'—'}</b></div><div class="ro"><small>التقويم التكويني</small><b>${Object.keys(G.form).length?Object.values(G.form).reduce((a,b)=>a+b,0)+' / '+Object.keys(G.form).reduce((a,k)=>a+STN[k].quiz.length,0):'—'}</b></div></div>
    <div class="bars">${st.map(o=>`<div class="bar-row"><span>${stName(o.id)}</span><div class="track"><div class="fill" style="width:${(G.pts[o.id]||0)/mx*100}%"></div></div><b>${G.pts[o.id]||0}</b></div>`).join('')}</div><p class="legend">نقاط كل محطة.</p></div>
    <div class="card"><h3>عودة إلى لغز الدرس</h3><p class="step-text">${META.riddle}</p>
      <div class="fb ${G.pred==null?'info':G.pred===META.predict.a?'ok':'info'}">${G.pred==null?'لم تسجّل توقعًا في الافتتاحية.':G.pred===META.predict.a?'توقعك في البداية كان صحيحًا، وقد أثبتّه بالتجارب.':'غيّرت التجارب توقعك الأول. هذا ما يفعله العلماء.'}</div>
      <p class="step-text" style="margin-top:10px"><b>الجواب:</b> ${META.answer}</p></div></div>
  <div class="card" style="margin-top:14px"><h3>هل حققتُ أهداف الدرس؟</h3><p class="step-text muted" style="font-size:.9rem">تقويم ذاتي: اختر لكل هدف ما يناسبك بصدق.</p><div class="self">${META.goals.map((g,i)=>`<div class="row"><span>${g}</span><span class="seg" data-g="${i}"><button type="button" data-v="2" class="${G.self[i]===2?'on':''}">أتقنته</button><button type="button" data-v="1" class="${G.self[i]===1?'on':''}">أحتاج تدريبًا</button><button type="button" data-v="0" class="${G.self[i]===0?'on':''}">لم أفهمه</button></span></div>`).join('')}</div></div>
  <h3 style="margin-top:14px">ملخص المفاهيم</h3><div class="concepts">${META.concepts.map(c=>`<div class="concept"><svg viewBox="0 0 52 52" aria-hidden="true">${c.ic}</svg><div><b>${c.n}</b><p>${c.t}</p></div></div>`).join('')}</div>
  ${META.homework?`<div class="story" style="margin-top:14px">${META.homework}</div>`:''}
  ${META.valuesSum?`<div class="three" style="margin-top:14px">${META.valuesSum}</div>`:''}
  ${teams?'<div style="margin-top:14px">'+teams+'</div>':''}
  <div class="card cert-foot" style="margin-top:14px"><p style="margin:0">متوسطة أبي الدرداء · معلم العلوم: علي طاهر البقاشي · العام الدراسي 1448هـ</p></div>
  <div class="next-row" style="margin-top:14px"><button class="btn alt" type="button" data-go="ch">السابق</button><button class="btn alt" type="button" data-go="intro">العودة إلى البداية</button></div>`;
  box.querySelectorAll('.seg[data-g] button').forEach(b=>b.onclick=()=>{const g=+b.parentElement.dataset.g;G.self[g]=+b.dataset.v;b.parentElement.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));G.tick();});
}

/* ---------- build shell ---------- */
function sectionHTML(d,i,list){
  if(d.id==='intro')return `<section class="st" id="st-intro">${d.body}</section>`;
  if(d.id==='final')return `<section class="st" id="st-final" hidden><div id="finalBox"></div></section>`;
  const prev=list[i-1],next=list[i+1];
  return `<section class="st" id="st-${d.id}" hidden><header class="st-head"><span class="eyebrow">${d.eyebrow||''}</span><h2>${d.title}</h2>${d.goal?`<p class="goal">${d.goal}</p>`:''}</header>${typeof d.body==='function'?d.body():d.body}
    <div class="next-row">${prev?`<button class="btn alt" type="button" data-go="${prev.id}">السابق</button>`:'<span></span>'}${next?`<button class="btn" type="button" data-go="${next.id}">${next.id==='final'?'لوحة الإنجاز':next.id==='ch'?'تحدي العلماء':'المحطة التالية'}</button>`:''}</div></section>`;
}
function boot(meta){
  META=meta;document.title=meta.title;
  const dk=()=>{const r=document.documentElement,t=r.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;};
  const setAcc=()=>{const v=dk()?meta.accentDark:meta.accent;if(v)document.documentElement.style.setProperty('--accent',v);else document.documentElement.style.removeProperty('--accent');};setAcc();try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',setAcc);}catch(e){}
  def('final',{n:'لوحة الإنجاز',icon:'<circle cx="40" cy="44" r="26" fill="currentColor"/><path d="M40 28l5 10 11 1-8 8 2 11-10-6-10 6 2-11-8-8 11-1z" fill="#fff"/><path d="M26 4h12l4 18H30zM42 4h12l-4 18h-8z" fill="currentColor" opacity=".6"/>',enter:renderFinal,reset(){$('#finalBox').innerHTML='';},explain:'<p>لوحة الإنجاز تلخص مفاهيم الدرس، وتعرض نقاط كل محطة ونتيجة التقويم التكويني والختامي، مع تقويم ذاتي لأهداف الدرس.</p>'});
  DEFS.filter(d=>d.after).forEach(d=>{const i=DEFS.indexOf(d);DEFS.splice(i,1);const j=DEFS.findIndex(x=>x.id===d.after);DEFS.splice(j+1,0,d);});
  DEFS.forEach(d=>{if(d.plan)PLAN[d.id]=d.plan;});
  $('#stations').innerHTML=DEFS.map((d,i,l)=>sectionHTML(d,i,l)).join('');
  $$('[data-meta]').forEach(e=>{e.textContent=meta[e.dataset.meta]||'';});
  $$('#stations .side').forEach(sd=>{if(!sd.children.length)sd.remove();});
  $$('#stations .two, #stations .three').forEach(t=>{const n=[...t.children].length;if(n===1)t.style.gridTemplateColumns='minmax(0,1fr)';if(n===0)t.remove();});
  card=document.createElement('div');card.className='fx-card';card.hidden=true;card.setAttribute('aria-hidden','true');document.body.appendChild(card);
  card.addEventListener('pointerdown',hideCard);
  fxInit();
  DEFS.forEach(d=>{if(d.init){try{d.init($('#st-'+d.id));}catch(e){console.error('init '+d.id,e);}}});
  /* events */
  document.addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b){e.preventDefault();go(b.dataset.go);}});
  $('#teamHud').addEventListener('click',e=>{const b=e.target.closest('.team');if(!b)return;G.team=+b.dataset.i;G.tick();hud();});
  $('#modalClose').onclick=closeModal;$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeDrawer();}if(!card.hidden&&(e.key===' '||e.key==='Enter'))hideCard();});
  $('#bDrawer').onclick=()=>{$('#drawer').hidden?openDrawer():closeDrawer();};$('#bCloseDrawer').onclick=closeDrawer;
  const explainNow=()=>{const st=STN[G.cur];modal(`<h2>التفسير العلمي</h2>${st&&st.explain?st.explain:'<p>اختر محطة لعرض تفسيرها العلمي.</p>'}`);};
  $('#bExplain').onclick=explainNow;$('#bExplain2').onclick=()=>{closeDrawer();explainNow();};
  const tgl=(id,key,fn,on,off)=>{const b=$(id);b.onclick=()=>{G[key]=!G[key];b.setAttribute('aria-pressed',G[key]);if(on)b.textContent=G[key]?off:on;fn&&fn();};};
  tgl('#bPause','paused',()=>{$('#pausedBadge').hidden=!G.paused;},'إيقاف التجربة','استئناف التجربة');
  tgl('#bTeacher','teacher',()=>{document.body.classList.toggle('tm',G.teacher);const st=STN[G.cur];st&&st.refresh&&st.refresh();});
  tgl('#bPresent','present',()=>document.documentElement.classList.toggle('present',G.present));
  tgl('#bSound','sound',()=>{if(G.sound)note(700,0,.1);});
  $('#bFx').onclick=()=>{G.fxOn=G.fxOn===false;$('#bFx').setAttribute('aria-pressed',G.fxOn!==false);};
  $('#bResetSt').onclick=()=>{const st=STN[G.cur];if(st&&st.reset)st.reset();closeDrawer();};
  $('#bForm').onclick=()=>{closeDrawer();formative(G.cur);};
  $('#bTeams').onclick=()=>{setTeams(G.teams?0:+$('#teamN').value);};
  let resetArm=0;$('#bResetAll').onclick=()=>{const b=$('#bResetAll');if(Date.now()-resetArm>4000){resetArm=Date.now();b.textContent='اضغط مرة أخرى للتأكيد';setTimeout(()=>{b.textContent='إعادة الدرس من البداية';},4000);return;}
    resetArm=0;b.textContent='إعادة الدرس من البداية';G.score=0;G.pts={};G.done={};G.form={};G.pred=null;G.self={};G.ch=null;if(G.teams)G.teams.forEach(t=>t.s=0);DEFS.forEach(s=>s.reset&&s.reset());$('#bTimerReset').click();hud();go('intro');};
  setInterval(()=>{const c=G.clock,now=performance.now();if(c.run){const dt=(now-c.last)/1000;c.el+=dt;c.st[G.cur]=(c.st[G.cur]||0)+dt;}c.last=now;renderClock();},500);
  setInterval(renderPlan,1000);
  $('#timerHud').onclick=()=>{if(!G.clock.run&&G.clock.el<0.5)toggleClock();else openDrawer();};
  $('#bTimer').onclick=toggleClock;
  $('#bTimerReset').onclick=()=>{G.clock.run=false;G.clock.el=0;G.clock.st={};G.clock.nudged={};hideNudge();renderClock();renderPlan();};
  $('#periodLen').onchange=e=>{G.clock.len=+e.target.value;G.clock.nudged={};labelBudgets();renderClock();renderPlan();};
  labelBudgets();
  /* kiosk */
  const root=document.documentElement,fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement;
  const enterFS=()=>{const r=root.requestFullscreen||root.webkitRequestFullscreen;try{const p=r&&r.call(root,{navigationUI:'hide'});if(p&&p.catch)p.catch(()=>{});}catch(e){}try{navigator.wakeLock&&navigator.wakeLock.request('screen').catch(()=>{});}catch(e){}};
  const setKiosk=on=>{G.kiosk=on;root.classList.toggle('kiosk',on);if(on){if(G.teacher)$('#bTeacher').click();closeDrawer();}$('#bKiosk').textContent=on?'إظهار أدوات المعلم على الشاشة':'إخفاء أدوات المعلم (وضع العرض)';$('#bKiosk').setAttribute('aria-pressed',on);};
  const start=()=>{if(!G.sound)$('#bSound').click();SFX.start();setTimeout(()=>{if(!G.reduced)showCard(G.cur);},350);$('#startScreen').hidden=true;setKiosk(true);enterFS();};
  $('#bStart').onclick=start;$('#bStartTimer').onclick=()=>{start();if(!G.clock.run)toggleClock();};
  $('#bFS').onclick=enterFS;$('#bKiosk').onclick=()=>{setKiosk(!G.kiosk);if(G.kiosk)enterFS();};
  $('#bExitShow').onclick=()=>{setKiosk(false);const x=document.exitFullscreen||document.webkitExitFullscreen;try{fsEl()&&x&&x.call(document);}catch(e){}};
  const onFS=()=>{$('#bFS').hidden=!!fsEl()||!G.kiosk;};document.addEventListener('fullscreenchange',onFS);document.addEventListener('webkitfullscreenchange',onFS);
  let lp=null;const h1=$('.top h1'),cancel=()=>{clearTimeout(lp);lp=null;};
  h1.addEventListener('pointerdown',()=>{cancel();lp=setTimeout(()=>{openDrawer();G.tick();},900);});['pointerup','pointerleave','pointercancel'].forEach(t=>h1.addEventListener(t,cancel));h1.addEventListener('contextmenu',e=>e.preventDefault());
  document.addEventListener('keydown',e=>{if(e.target.matches('input,select,textarea'))return;if(e.key==='F2'||((e.key==='t'||e.key==='T'||e.key==='ف')&&!e.ctrlKey&&!e.metaKey)){e.preventDefault();$('#drawer').hidden?openDrawer():closeDrawer();}});
  setKiosk(false);onFS();
  /* intro prediction */
  const po=$('#introOpts');if(po){const P=meta.predict;const r=()=>{po.innerHTML=P.o.map((t,i)=>`<button type="button" class="opt${G.pred===i?' picked':''}" data-p="${i}">${t}</button>`).join('');
      po.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{G.pred=+b.dataset.p;G.tick();r();$('#introFb').innerHTML='<div class="fb info">سجّلنا توقعك. ستكتشف الإجابة خلال المحطات، ونعود إليها في لوحة الإنجاز.</div>';G.complete('intro');});};r();}
  renderNav();hud();renderPlan();renderClock();
  if(new URLSearchParams(location.search).has('skip'))$('#startScreen').hidden=true;
}

window.K={$,$$,G,STN,def,boot,img,pic,slides,beforeAfter,safety,anticip,story,escape,auction,bingo,choiceBoard,setTeams,mcq,calcQ,levels,flips,match,sortGame,tfRound,race,challenge,riddles,puzzle,solutions,vcard,ayah,modal,go,say,num,fmt,parseNum,shuffle,banner,rain,burst,SFX,note,TEAMC,TEAMN,css};
})();

