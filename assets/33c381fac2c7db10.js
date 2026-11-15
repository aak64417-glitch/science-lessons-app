/* X3D: محرّك المقدمات التشويقية ثلاثية الأبعاد (WebGL / three.js r169) — يتحكم فيها المعلم */
(function(){
"use strict";
if(window.X3D)return;
var css=[
'.x3{position:absolute;inset:0;overflow:hidden;background:#000;color:#fff;direction:rtl;font-family:"IBM Plex Sans Arabic","Readex Pro",Tahoma,sans-serif;font-weight:600;user-select:none}',
'.x3 canvas{position:absolute;inset:0;width:100%!important;height:100%!important;display:block;cursor:grab}.x3 canvas:active{cursor:grabbing}',
'.x3-band{position:absolute;left:0;right:0;bottom:0;height:380px;background:linear-gradient(0deg,rgba(0,0,0,.78),rgba(0,0,0,0));pointer-events:none}',
'.x3-bandt{position:absolute;left:0;right:0;top:0;height:300px;background:linear-gradient(180deg,rgba(0,0,0,.6),rgba(0,0,0,0));pointer-events:none}',
'.x3-load{position:absolute;inset:0;display:grid;place-items:center;font-size:26px;color:#cfd6e4;z-index:9;background:#000;transition:opacity .8s}.x3-load i{display:block;width:240px;height:3px;margin:18px auto 0;background:linear-gradient(90deg,transparent,var(--c),transparent);background-size:50% 100%;background-repeat:no-repeat;animation:x3l 1.1s infinite linear}@keyframes x3l{from{background-position:-100% 0}to{background-position:200% 0}}',
'.x3-ttl{position:absolute;top:110px;right:112px;max-width:820px;z-index:4;transition:all .8s cubic-bezier(.2,.8,.2,1);transform-origin:top right}',
'.x3-ttl .k{font-size:18px;letter-spacing:2px;color:var(--c);display:flex;align-items:center;gap:12px}.x3-ttl .k:before{content:"";width:46px;height:2px;background:var(--c);display:block}',
'.x3-ttl h1{margin:6px 0 4px;font-size:62px;line-height:1.2;font-weight:800;color:#fff;text-shadow:0 4px 28px rgba(0,0,0,.95),0 0 60px var(--c)}',
'.x3-ttl p{margin:0;font-size:22px;color:#d7dce6;text-shadow:0 2px 12px #000}',
'.x3-ttl.mini{transform:scale(.52)}.x3-ttl.mini p{opacity:0}',
'.x3-w{display:inline-block;opacity:0;filter:blur(12px);transform:translateY(18px);animation:x3w .9s forwards}@keyframes x3w{to{opacity:1;filter:none;transform:none}}',
'.x3-sub{position:absolute;bottom:178px;left:50%;transform:translateX(-50%);width:1180px;text-align:center;font-size:32px;line-height:1.6;z-index:4;text-shadow:0 2px 4px #000,0 0 26px rgba(0,0,0,.9);min-height:52px}',
'.x3-sub b{color:var(--c);font-weight:800}.x3-sub small{display:block;font-size:17px;color:#aab3c4;font-weight:500;margin-top:2px}',
'.x3-rail{position:absolute;bottom:116px;right:112px;display:flex;gap:6px;z-index:5;direction:rtl}',
'.x3-rail button{font:inherit;font-size:17px;font-weight:700;color:rgba(255,255,255,.55);background:none;border:0;border-top:3px solid rgba(255,255,255,.2);padding:8px 10px 0;cursor:pointer;min-width:120px;text-align:right;transition:.4s}',
'.x3-rail button span{display:block;font-size:13px;letter-spacing:1px;opacity:.7}.x3-rail button.on{color:#fff;border-color:var(--c)}.x3-rail button.dn{color:rgba(255,255,255,.8);border-color:rgba(255,255,255,.65)}',
'.x3-nav{position:absolute;bottom:112px;left:112px;display:flex;gap:10px;z-index:6;align-items:center}',
'.x3-nav button{font:inherit;font-weight:800;border:0;cursor:pointer;border-radius:999px}',
'.x3-nx{font-size:22px;padding:14px 30px;background:var(--c);color:#0b0d12;box-shadow:0 0 0 0 var(--c);animation:x3p 2.4s infinite}@keyframes x3p{0%{box-shadow:0 0 0 0 rgba(255,255,255,.35)}70%{box-shadow:0 0 0 16px rgba(255,255,255,0)}}',
'.x3-pv{font-size:18px;padding:11px 18px;background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.3)!important}',
'.x3-dock{position:absolute;top:210px;left:112px;display:flex;flex-direction:column;gap:12px;z-index:6}',
'.x3-dock button{font:inherit;font-size:21px;font-weight:700;color:#fff;display:flex;align-items:center;gap:14px;min-width:280px;padding:10px 20px 10px 12px;border-radius:999px;cursor:pointer;background:rgba(14,18,28,.55);border:1.5px solid rgba(255,255,255,.22);backdrop-filter:blur(10px);transition:.25s;opacity:0;transform:translateX(-30px);animation:x3d .6s forwards}',
'.x3-dock button i{font-style:normal;width:50px;height:50px;border-radius:50%;display:grid;place-items:center;font-size:26px;background:rgba(255,255,255,.1);flex:none}',
'.x3-dock button:hover{border-color:var(--c);background:rgba(30,36,50,.7)}.x3-dock button.used{border-color:var(--c)}.x3-dock button.used i{background:var(--c)}',
'@keyframes x3d{to{opacity:1;transform:none}}',
'.x3-vote{position:absolute;top:190px;right:112px;width:480px;z-index:6;background:rgba(10,13,20,.72);border:1.5px solid rgba(255,255,255,.18);border-radius:22px;padding:18px 22px;backdrop-filter:blur(12px);opacity:0;transform:translateY(16px);transition:.5s;pointer-events:none}',
'.x3-vote.on{opacity:1;transform:none;pointer-events:auto}.x3-vote h4{margin:0;font-size:16px;color:var(--c);letter-spacing:1px}.x3-vote h3{margin:4px 0 12px;font-size:27px;line-height:1.45}',
'.x3-op{position:relative;display:flex;align-items:center;gap:12px;margin-bottom:9px;padding:9px 14px;border-radius:14px;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.14);cursor:pointer;overflow:hidden;font-size:22px}',
'.x3-op .bar{position:absolute;inset:0 0 0 auto;width:0;background:rgba(255,255,255,.1);transition:width .5s;z-index:0}.x3-op>*{position:relative;z-index:1}.x3-op .n{margin-right:auto;font-size:20px;color:#cfd6e4;min-width:60px;text-align:left}',
'.x3-op.ok{border-color:#34d399;background:rgba(52,211,153,.18)}.x3-op.ok .bar{background:rgba(52,211,153,.28)}.x3-op.no{opacity:.55}',
'.x3-vote .row{display:flex;gap:8px;align-items:center;margin-top:6px}.x3-vote .row button{font:inherit;font-size:18px;font-weight:700;border:0;border-radius:12px;padding:8px 16px;cursor:pointer;background:var(--c);color:#0b0d12}.x3-vote .row small{font-size:15px;color:#9aa4b6;margin-right:auto}',
'.x3-ex{display:none;font-size:20px;line-height:1.6;margin-top:8px;color:#e6fff4}.x3-ex.on{display:block;animation:x3w .6s}',
'.x3-tag{position:absolute;z-index:3;transform:translate(-50%,calc(-100% - 18px));white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .5s}',
'.x3-tag.on{opacity:1}.x3-tag div{background:rgba(8,10,16,.72);border:1.5px solid rgba(255,255,255,.25);border-bottom:3px solid var(--c);border-radius:12px;padding:6px 14px;font-size:20px;text-align:center;backdrop-filter:blur(6px)}',
'.x3-tag div b{color:var(--c);font-size:24px;font-weight:800}.x3-tag div small{display:block;font-size:15px;color:#c3cad8}.x3-tag:after{content:"";position:absolute;left:50%;bottom:-18px;width:2px;height:18px;background:var(--c);transform:translateX(-1px)}',
'.x3-meter{position:absolute;top:118px;left:112px;z-index:4;text-align:left;direction:rtl;opacity:0;transition:.5s}.x3-meter.on{opacity:1}',
'.x3-meter b{display:block;font-size:66px;font-weight:800;line-height:1;color:#fff;text-shadow:0 0 30px var(--c)}.x3-meter span{font-size:19px;color:#cfd6e4}',
'.x3-flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:7}',
'.x3-fin{position:absolute;inset:0;display:grid;place-items:center;z-index:5;pointer-events:none;opacity:0;transition:opacity 1.2s}.x3-fin.on{opacity:1;background:radial-gradient(ellipse at 50% 45%,rgba(0,0,0,.82),rgba(0,0,0,.45) 70%)}','.x3-gb{font-size:18px!important;padding:11px 18px;background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.3)!important}','.x3-guide{position:absolute;top:118px;left:50%;transform:translate(-50%,-10px);width:900px;z-index:8;background:rgba(250,250,252,.97);color:#111827;border-radius:20px;padding:16px 24px 14px;box-shadow:0 20px 60px rgba(0,0,0,.6);border-top:6px solid var(--c);opacity:0;pointer-events:none;transition:.35s}','.x3-guide.on{opacity:1;transform:translate(-50%,0);pointer-events:auto}.x3-guide h4{margin:0 0 4px;font-size:18px;color:#4b5563}.x3-guide p{margin:0;font-size:25px;line-height:1.65;font-weight:700}.x3-guide small{display:block;margin-top:8px;font-size:15px;color:#6b7280}',
'.x3-fin div{text-align:center;max-width:1100px;margin-top:-80px}.x3-fin small{font-size:20px;color:var(--c);letter-spacing:3px}.x3-fin h2{margin:10px 0 0;font-size:54px;line-height:1.45;font-weight:800;text-shadow:0 4px 30px #000,0 0 2px #000}'
].join('');
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

var THREEP=null;
function loadThree(){if(THREEP)return THREEP;var u=window.X3THREE_SRC?URL.createObjectURL(new Blob([window.X3THREE_SRC],{type:'text/javascript'})):new URL('../tools/three.module.min.js',location.href).href;THREEP=import(u);return THREEP}
var AR='٠١٢٣٤٥٦٧٨٩';function ar(v,d){var s=(+v).toFixed(d||0).split('.');var i=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,'٬');return (i+(s[1]?'٫'+s[1]:'')).replace(/\d/g,function(c){return AR[c]})}
var AC=null;function ac(){try{if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();return AC}catch(e){return null}}
function tone(f,d,ty,g,f2){var c=ac();if(!c)return;var o=c.createOscillator(),v=c.createGain();o.type=ty||'sine';o.frequency.setValueAtTime(f,c.currentTime);if(f2)o.frequency.exponentialRampToValueAtTime(f2,c.currentTime+d);v.gain.setValueAtTime(g||.08,c.currentTime);v.gain.exponentialRampToValueAtTime(.0001,c.currentTime+d);o.connect(v);v.connect(c.destination);o.start();o.stop(c.currentTime+d)}
function noise(d,fq,g){var c=ac();if(!c)return;var n=c.sampleRate*d,b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0);for(var i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);var s=c.createBufferSource();s.buffer=b;var f=c.createBiquadFilter();f.type='lowpass';f.frequency.value=fq||400;var v=c.createGain();v.gain.value=g||.4;s.connect(f);f.connect(v);v.connect(c.destination);s.start()}
var SFX={step:function(){tone(220,.5,'sine',.06,440)},tool:function(){tone(660,.12,'triangle',.08);setTimeout(function(){tone(990,.18,'triangle',.06)},70)},vote:function(){tone(880,.06,'square',.03)},ok:function(){[523,659,784].forEach(function(f,i){setTimeout(function(){tone(f,.3,'triangle',.09)},i*90)})},boom:function(){noise(2.2,160,.9)},hiss:function(){noise(1.4,2400,.12)},ping:function(){tone(1400,.25,'sine',.05,1800)}};

window.X3D=function(el,story,hooks){
  hooks=hooks||{};var started=false,running=false,raf=0,api=null,cur=-1,last=0,T=0;
  el.innerHTML='<div class="x3" style="--c:'+(story.color||'#7dd3fc')+'"><div class="x3-bandt"></div><div class="x3-band"></div>'+
   '<div class="x3-ttl"><div class="k"></div><h1></h1><p></p></div><div class="x3-meter"><b></b><span></span></div>'+
   '<div class="x3-sub"></div><div class="x3-rail"></div><div class="x3-dock"></div><div class="x3-vote"></div><div class="x3-fin"><div><small></small><h2></h2></div></div>'+
   '<div class="x3-nav"><button class="x3-nx">ابدأ ←</button><button class="x3-pv">→</button><button class="x3-gb">📋 شرح المشهد</button></div><div class="x3-guide"><h4></h4><p></p><small>اضغط في أي مكان على هذه البطاقة لإغلاقها</small></div><div class="x3-flash"></div>'+
   '<div class="x3-load"><div>جارٍ تجهيز المشهد ثلاثي الأبعاد…<i></i></div></div></div>';
  var root=el.querySelector('.x3'),q=function(s){return root.querySelector(s)};
  var ttl=q('.x3-ttl'),sub=q('.x3-sub'),rail=q('.x3-rail'),dock=q('.x3-dock'),vote=q('.x3-vote'),fin=q('.x3-fin'),nx=q('.x3-nx'),pv=q('.x3-pv'),meter=q('.x3-meter'),flashEl=q('.x3-flash');
  var tags={},tasks=[],K=null,gOn=false,guide=q('.x3-guide'),gb=q('.x3-gb');guide.onclick=function(){gOn=false;guide.classList.remove('on')};gb.onclick=function(){gOn=!gOn;showG()};
  function showG(){var s=api&&api.steps[cur];if(!s)return;guide.querySelector('h4').textContent='شرح المشهد '+ar(cur+1)+': '+s.name;guide.querySelector('p').innerHTML=s.g||'';guide.classList.toggle('on',gOn&&!!s.g)}
  function words(s){return s.split(' ').map(function(w,i){return '<span class="x3-w" style="animation-delay:'+(i*.09)+'s">'+w+'</span>'}).join(' ')}
  var U={
    title:function(k,h,p){ttl.classList.remove('mini');ttl.querySelector('.k').textContent=k||'';ttl.querySelector('h1').innerHTML=words(h||'');ttl.querySelector('p').innerHTML=p||''},
    mini:function(){ttl.classList.add('mini')},
    say:function(h,small){sub.style.opacity=0;setTimeout(function(){sub.innerHTML=h+(small?'<small>'+small+'</small>':'');sub.style.transition='opacity .5s';sub.style.opacity=1},220)},
    tools:function(list){dock.innerHTML='';(list||[]).forEach(function(t,i){var b=document.createElement('button');b.style.animationDelay=(i*.1)+'s';b.innerHTML='<i>'+t.ic+'</i><span>'+t.lbl+'</span>';b.onclick=function(){ac();SFX.tool();b.classList.add('used');t.fn(b)};dock.appendChild(b)})},
    vote:function(v){if(!v){vote.classList.remove('on');return}U.mini();var n=v.o.map(function(){return 0});var shown=false;
      vote.innerHTML='<h4>صوّت الصف · اضغط الخيار لكل صوت</h4><h3>'+v.q+'</h3>'+v.o.map(function(o,i){return '<div class="x3-op" data-i="'+i+'"><div class="bar"></div><span>'+o+'</span><span class="n">٠</span></div>'}).join('')+'<div class="x3-ex">'+(v.ex||'')+'</div><div class="row">'+(v.a!=null?'<button data-r>💡 اكشف الإجابة</button>':'')+'<button data-x style="background:rgba(255,255,255,.12);color:#fff">إخفاء</button><small>التصويت يرفع الحماس… قبل الكشف</small></div>';
      function paint(){var tot=n.reduce(function(a,b){return a+b},0)||1;vote.querySelectorAll('.x3-op').forEach(function(e,i){e.querySelector('.bar').style.width=(n[i]/tot*100)+'%';e.querySelector('.n').textContent=ar(n[i])+' · '+ar(Math.round(n[i]/tot*100))+'٪'})}
      vote.querySelectorAll('.x3-op').forEach(function(e){e.onclick=function(){if(shown)return;n[+e.dataset.i]++;SFX.vote();paint()}});
      var r=vote.querySelector('[data-r]');if(r)r.onclick=function(){U.reveal()};vote.querySelector('[data-x]').onclick=function(){vote.classList.remove('on')};
      U.reveal=function(){if(shown||v.a==null)return;shown=true;vote.querySelectorAll('.x3-op').forEach(function(e,i){e.classList.add(i===v.a?'ok':'no')});vote.querySelector('.x3-ex').classList.add('on');if(r)r.style.display='none';SFX.ok();v.onReveal&&v.onReveal();setTimeout(function(){vote.classList.remove('on')},7000)};
      vote.classList.add('on')},
    reveal:function(){},
    tag:function(id,pos,html,obj){var e=tags[id];if(!e){e=document.createElement('div');e.className='x3-tag';e.innerHTML='<div></div>';root.appendChild(e);tags[id]=e}e.firstChild.innerHTML=html;e._p=pos;e._o=obj||null;requestAnimationFrame(function(){e.classList.add('on')})},
    untag:function(id){if(id==null){Object.keys(tags).forEach(function(k){tags[k].classList.remove('on')});return}tags[id]&&tags[id].classList.remove('on')},
    meter:function(v,l){if(v==null){meter.classList.remove('on');return}meter.querySelector('b').innerHTML=v;meter.querySelector('span').textContent=l||'';meter.classList.add('on')},
    fin:function(k,h){if(!h){fin.classList.remove('on');return}fin.querySelector('small').textContent=k;fin.querySelector('h2').innerHTML=h;fin.classList.add('on')},
    flash:function(a){flashEl.style.transition='none';flashEl.style.opacity=a||.8;requestAnimationFrame(function(){flashEl.style.transition='opacity 1.2s';flashEl.style.opacity=0})},
    tween:function(d,fn,done,ease){var o={t:0,d:d,fn:fn,done:done,ease:ease!==false};tasks.push(o);return o},
    wait:function(d,fn){return U.tween(d,function(){},fn)},
    sfx:SFX,ar:ar
  };
  function ezf(k){return k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2}
  function go(i){if(!api||i<0||i>=api.steps.length)return;cur=i;tasks.length=0;U.vote(null);U.fin(null);U.meter(null);U.untag();dock.innerHTML='';
    rail.querySelectorAll('button').forEach(function(b,j){b.className=j===i?'on':j<i?'dn':''});
    nx.textContent=i===api.steps.length-1?'✔ إلى الدرس':'التالي ←';pv.style.visibility=i?'visible':'hidden';SFX.step();api.steps[i].enter();showG()}
  function next(){if(cur<api.steps.length-1){go(cur+1);return true}hooks.done&&hooks.done();return false}
  nx.onclick=function(){ac();if(!api)return;if(next()===false&&hooks.end)hooks.end()};pv.onclick=function(){go(cur-1)};
  function frame(ts){if(!running)return;raf=requestAnimationFrame(frame);var dt=Math.min(.1,(ts-(last||ts))/1000);last=ts;T+=dt;
    for(var i=tasks.length-1;i>=0;i--){var o=tasks[i];o.t+=dt;var k=Math.min(1,o.t/o.d);o.fn(o.ease?ezf(k):k,dt);if(k>=1){tasks.splice(i,1);o.done&&o.done()}}
    api.update(dt,T);K.renderer.render(K.scene,K.camera);if(K.q){K.q.n++;K.q.s+=dt;if(K.q.s>2){var fps=K.q.n/K.q.s;K.q.n=0;K.q.s=0;var pr=K.renderer.getPixelRatio();if(fps<28&&pr>.6){K.renderer.setPixelRatio(Math.max(.6,pr*.8));K.renderer.setSize(1600,900,false)}}}
    var v=new K.THREE.Vector3();Object.keys(tags).forEach(function(id){var e=tags[id];if(!e.classList.contains('on'))return;v.copy(e._p);if(e._o)e._o.localToWorld(v);v.project(K.camera);var tx=(v.x+1)/2*1600,ty=(1-v.y)/2*900,tw=e.offsetWidth,th=e.offsetHeight+18;[[dock,1],[vote.classList.contains('on')?vote:null,-1]].forEach(function(o){var d=o[0];if(!d||!d.children.length)return;var l=d.offsetLeft,t=d.offsetTop,r=l+d.offsetWidth,b=t+d.offsetHeight;if(tx+tw/2>l-10&&tx-tw/2<r+10&&ty>t-10&&ty-th<b+10)tx=o[1]>0?r+18+tw/2:l-18-tw/2});e.style.left=tx+'px';e.style.top=ty+'px';e.style.visibility=v.z<1?'visible':'hidden'})}
  function start(){started=true;loadThree().then(function(THREE){
    var r=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});var PR=/x3lo/.test(location.search)?.4:Math.min(1.5,window.devicePixelRatio||1);r.setPixelRatio(PR);r.setSize(1600,900,false);
    r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1;r.shadowMap.enabled=true;r.shadowMap.type=THREE.PCFSoftShadowMap;r.localClippingEnabled=true;
    root.insertBefore(r.domElement,root.firstChild);
    var cam=new THREE.PerspectiveCamera(40,16/9,.05,500);var sc=new THREE.Scene();
    K={q:{n:0,s:0},THREE:THREE,renderer:r,scene:sc,camera:cam,ui:U,root:root,
      fly:function(pos,tgt,d,done){var p0=cam.position.clone(),t0=K._tgt.clone(),p1=new THREE.Vector3().fromArray(pos),t1=new THREE.Vector3().fromArray(tgt);U.tween(d||2.5,function(k){cam.position.lerpVectors(p0,p1,k);K._tgt.lerpVectors(t0,t1,k);cam.lookAt(K._tgt)},done)},
      look:function(pos,tgt){cam.position.fromArray(pos);K._tgt.fromArray(tgt);cam.lookAt(K._tgt)},_tgt:new THREE.Vector3(),drag:null,
      env:function(){var pm=new THREE.PMREMGenerator(r),es=new THREE.Scene(),bx=new THREE.BoxGeometry();var room=new THREE.Mesh(bx,new THREE.MeshStandardMaterial({side:THREE.BackSide,color:0x777777}));room.scale.set(30,16,30);room.position.y=6;es.add(room);
        es.add(new THREE.PointLight(0xffffff,900,30,2));[[-8,10,-6,6,.3,6,22],[8,9,4,.3,5,8,14],[0,13,8,10,.3,3,10],[-9,4,6,.3,4,4,8],[6,3,-9,5,5,.3,6]].forEach(function(a){var m=new THREE.Mesh(bx,new THREE.MeshBasicMaterial());m.material.color.setScalar(a[6]);m.position.set(a[0],a[1],a[2]);m.scale.set(a[3],a[4],a[5]);es.add(m)});
        var tx=pm.fromScene(es,.04).texture;pm.dispose();return tx}};
    var cv=r.domElement,dn=null;cv.addEventListener('pointerdown',function(e){dn={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId);K.onDown&&K.onDown(e)});
    cv.addEventListener('pointermove',function(e){if(!dn||!K.drag)return;var dx=e.clientX-dn.x,dy=e.clientY-dn.y;dn={x:e.clientX,y:e.clientY};K.drag(dx,dy)});
    cv.addEventListener('pointerup',function(){dn=null});
    rail.innerHTML='';
    api=story.build(K);api.steps.forEach(function(s,i){var b=document.createElement('button');b.innerHTML='<span>'+ar(i+1).padStart(2,'٠')+'</span>'+s.name;b.onclick=function(){go(i)};rail.appendChild(b)});
    var ld=q('.x3-load');ld.style.opacity=0;setTimeout(function(){ld.remove()},900);go(0);if(running){last=0;raf=requestAnimationFrame(frame)}
  }).catch(function(e){q('.x3-load').innerHTML='<div>تعذّر تشغيل المشهد ثلاثي الأبعاد على هذا الجهاز ('+(e&&e.message||e)+')</div>'})}
  return {enter:function(){if(!started)start();if(running)return;running=true;last=0;if(api)raf=requestAnimationFrame(frame)},leave:function(){running=false;cancelAnimationFrame(raf)},reveal:function(){if(!api)return true;return next()},seek:function(){}};
};
window.X3D.ar=ar;
})();

/* القصص ثلاثية الأبعاد للمقدمات التشويقية — الفصلان الخامس والسادس (أول متوسط) */
(function(){
"use strict";
var S3=window.X3STORIES={};
function hash(x,y,z){var h=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return h-Math.floor(h)}
function sm(t){return t*t*(3-2*t)}
function vn(x,y,z){z=z||0;var xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),xf=sm(x-xi),yf=sm(y-yi),zf=sm(z-zi);function L(a,b,t){return a+(b-a)*t}
  return L(L(L(hash(xi,yi,zi),hash(xi+1,yi,zi),xf),L(hash(xi,yi+1,zi),hash(xi+1,yi+1,zi),xf),yf),L(L(hash(xi,yi,zi+1),hash(xi+1,yi,zi+1),xf),L(hash(xi,yi+1,zi+1),hash(xi+1,yi+1,zi+1),xf),yf),zf)}
function fbm(x,y,z,o){var s=0,a=.5,f=1;for(var i=0;i<(o||4);i++){s+=a*vn(x*f,y*f,z*f);f*=2.03;a*=.5}return s}
function sst(a,b,x){var t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)}
function lerp(a,b,k){return a+(b-a)*k}
function hex(T,h){return new T.Color(h)}
function canvasTex(T,w,h,draw){var c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);var t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t}
function starTex(T){return canvasTex(T,64,64,function(x){var g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=2;x.beginPath();x.moveTo(32,0);x.lineTo(32,64);x.moveTo(0,32);x.lineTo(64,32);x.stroke()})}
function stars(T,n,r){var g=new T.BufferGeometry(),p=new Float32Array(n*3);for(var i=0;i<n;i++){var u=Math.random()*2-1,a=Math.random()*6.283,s=Math.sqrt(1-u*u);p[i*3]=r*s*Math.cos(a);p[i*3+1]=r*u;p[i*3+2]=r*s*Math.sin(a)}g.setAttribute('position',new T.BufferAttribute(p,3));return new T.Points(g,new T.PointsMaterial({color:0xffffff,size:1.4,sizeAttenuation:false,transparent:true,opacity:.8,depthWrite:false}))}

/* ======================= ١) لغز الأحجار الثلاثة ======================= */
S3.gems={color:'#7dd3fc',build:function(K){
  var T=K.THREE,U=K.ui,sc=K.scene,V=T.Vector3;
  sc.background=new T.Color(0x030406);sc.environment=K.env();sc.environmentIntensity=.12;
  var floor=new T.Mesh(new T.CircleGeometry(30,64),new T.MeshStandardMaterial({color:0x07080b,roughness:.75,metalness:0,envMapIntensity:.15}));floor.rotation.x=-Math.PI/2;floor.receiveShadow=true;sc.add(floor);
  var hemi=new T.HemisphereLight(0x8899bb,0x050505,.05);sc.add(hemi);
  var pts=[[.001,-.86],[1,-.02],[1,.05],[.58,.34],[.001,.34]].map(function(a){return new T.Vector2(a[0],a[1])});
  var gg=new T.LatheGeometry(pts,16).toNonIndexed();gg.computeVertexNormals();
  var D=[{n:'أ',x:3,ior:1.544,disp:.8,name:'كوارتز',H:'٧',m:1.33,rho:'٢٫٦٥',scr:true,gl:.25},{n:'ب',x:0,ior:1.52,disp:.6,name:'زجاج',H:'≈ ٥٫٥',m:1.25,rho:'≈ ٢٫٥',scr:false,gl:.18},{n:'ج',x:-3,ior:2.42,disp:7,name:'ألماس',H:'١٠',m:1.76,rho:'٣٫٥٢',scr:true,gl:1}];
  D.forEach(function(d){var ped=new T.Mesh(new T.CylinderGeometry(.85,.95,1.3,64),new T.MeshStandardMaterial({color:0x15171d,roughness:.55,metalness:.35}));ped.position.set(d.x,.65,0);ped.castShadow=ped.receiveShadow=true;sc.add(ped);
    var top=new T.Mesh(new T.CylinderGeometry(.86,.86,.03,64),new T.MeshStandardMaterial({color:0x2a2e38,roughness:.15,metalness:.9}));top.position.set(d.x,1.315,0);top.receiveShadow=true;sc.add(top);
    var m=new T.MeshPhysicalMaterial({color:0xffffff,metalness:0,roughness:0,transmission:1,thickness:1.4,ior:d.ior,dispersion:d.disp,envMapIntensity:1.6,specularIntensity:1});
    var g=new T.Mesh(gg,m);g.scale.setScalar(.72);g.rotation.x=.38;g.castShadow=true;var piv=new T.Group();piv.position.set(d.x,1.33+.62,0);piv.add(g);sc.add(piv);
    d.piv=piv;d.g=g;d.home=piv.position.clone();
    var sp=new T.SpotLight(0xffffff,0,16,.3,.55,1.2);sp.position.set(d.x,7.5,2.6);sp.target=piv;sp.castShadow=true;sp.shadow.mapSize.set(1024,1024);sp.shadow.bias=-.0005;sc.add(sp);d.sp=sp});
  var sw=new T.PointLight(0xffffff,0,14,1.2);sc.add(sw);
  var bd=new T.Mesh(new T.PlaneGeometry(40,16),new T.MeshBasicMaterial({map:canvasTex(T,512,256,function(x,w,h){var g=x.createRadialGradient(w/2,h*.62,10,w/2,h*.62,w*.55);g.addColorStop(0,'#3a4a6e');g.addColorStop(.45,'#18203a');g.addColorStop(1,'#04050a');x.fillStyle=g;x.fillRect(0,0,w,h)})}));bd.position.set(0,5,-7);sc.add(bd);
  var beam=new T.Mesh(new T.ConeGeometry(1.1,4,40,1,true),new T.MeshBasicMaterial({color:0xfff6d8,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));beam.visible=false;sc.add(beam);
  var stx=starTex(T),glints=[];for(var i=0;i<9;i++){var s=new T.Sprite(new T.SpriteMaterial({map:stx,blending:T.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));s.userData={life:0,own:null};sc.add(s);glints.push(s)}
  var plate=new T.Mesh(new T.BoxGeometry(4.2,.06,1.5),new T.MeshPhysicalMaterial({color:0xe6f6ff,transmission:.85,roughness:.04,thickness:.2,ior:1.5,metalness:0}));plate.position.set(0,1.03,2.6);plate.visible=false;sc.add(plate);
  var scratchMat=new T.MeshBasicMaterial({color:0xffffff});
  var spin=true,lightOn=0,sweeping=false,ctr=0;
  K.drag=function(dx){D.forEach(function(d){d.piv.rotation.y+=dx*.012})};
  K.look([0,5,20],[0,1.6,0]);
  function lights(on,stag){D.forEach(function(d,i){U.wait((stag?i*.55:0)+.01,function(){U.sfx.ping();U.tween(.8,function(k){d.sp.intensity=lerp(d.sp.intensity,on?140:0,k)})})});U.tween(2,function(k){sc.environmentIntensity=lerp(sc.environmentIntensity,on?.55:.12,k)});lightOn=on?1:0}
  function tagsBasic(){D.forEach(function(d){U.tag('g'+d.n,new V(d.x,2.75,0),'<b>'+d.n+'</b><small>الحجر</small>')})}
  function move(d,to,dur,done){var p0=d.piv.position.clone(),p1=new V().fromArray(to);U.tween(dur,function(k){d.piv.position.lerpVectors(p0,p1,k)},done)}
  function scratch(d,idx){if(d.busy)return;d.busy=true;spin=false;var sx=(1-idx)*1.35,y0=1.06+.62;
    U.tween(.5,function(k){d.g.rotation.x=lerp(.38,0,k)});
    move(d,[sx+.55,2.6,2.6],1,function(){move(d,[sx+.55,y0,2.6],.6,function(){U.sfx.hiss();var line=null;if(d.scr){line=new T.Mesh(new T.BoxGeometry(1,.012,.025),scratchMat);line.position.set(sx,1.065,2.6);line.scale.x=.001;sc.add(line)}
      var p0=d.piv.position.clone();U.tween(1.2,function(k){d.piv.position.x=lerp(p0.x,sx-.55,k);if(line){line.scale.x=Math.max(.001,1.1*k);line.position.x=sx+.55-.55*k}},function(){
        U.tag('s'+d.n,new V(sx,1.15,2.6),d.scr?'<b>✔ ترك خدشًا</b>':'<b>✘ لا خدش واضح</b>');
        move(d,[sx,2.8,2.6],.6,function(){move(d,d.home.toArray(),1,function(){U.tween(.5,function(k){d.g.rotation.x=lerp(0,.38,k)});d.busy=false;spin=true})})},false)})})}
  function sweep(){if(sweeping)return;sweeping=true;sw.intensity=0;beam.visible=true;U.say('راقبوا الأحجار والشعاع يمرّ فوقها… أيّها يتلألأ بألوان أكثر؟');U.tween(6,function(k){var bx=lerp(5.5,-5.5,k);sw.position.set(bx,3.6,1.2);sw.intensity=Math.sin(k*Math.PI)*110;beam.position.set(bx,3.9,.4);beam.material.opacity=.16*Math.sin(k*Math.PI)},function(){sweeping=false;sw.intensity=0;beam.visible=false;var st=['★★☆☆☆','★★☆☆☆','★★★★★'];D.forEach(function(d,i){U.tag('g'+d.n,new V(d.x,2.75,0),'<b>'+d.n+'</b><small>البريق</small><b>'+st[i]+'</b>')});U.say('الحجر <b>ج</b> تلألأ بألوان قوس المطر أكثر من غيره! فما السبب؟ اكشفوا معامل الانكسار.')},false)}
  var dia=D[2],qz=D[0];
  function duel(){if(dia.busy)return;dia.busy=qz.busy=true;spin=false;move(dia,[1.6,2.4,.6],1.4,function(){U.sfx.hiss();for(var i=0;i<4;i++){var g=glints[i];g.userData.own=qz;g.userData.life=0}
    U.tag('gأ',new V(3,2.75,0),'<b>أ خُدش!</b><small>الألماس أقسى من الكوارتز</small>');U.wait(1.4,function(){move(dia,dia.home.toArray(),1.2,function(){dia.busy=qz.busy=false;spin=true})})})}
  return {steps:[
   {name:'الملف',g:'المشهد: ثلاثة أحجار متشابهة (أ، ب، ج)، واحد منها فقط <b>ألماس</b>. اطلب من الطلاب التصويت بالنظر فقط، واضغط الخيار مع كل صوت. لا إجابة هنا؛ نعيد التصويت في مرحلة «الكشف».',enter:function(){K.look([0,5,20],[0,1.6,0]);K.fly([1.8,2.9,9.6],[1.8,1.75,0],4.5);lights(true,true);U.title('تحدٍّ يواجهه خبراء الأحجار الكريمة','لغز الأحجار الثلاثة','ألماس حقيقي يختبئ بين حجرين مقلَّدين');
     U.say('ثلاثة أحجار متطابقة في الشكل والقَطع… واحد منها فقط <b>ألماس</b>، والآخران <b>كوارتز</b> و<b>زجاج</b>. ممنوع كسرها!','اسحب المشهد لتدوير الأحجار');
     U.wait(2.2,tagsBasic);U.wait(3.2,function(){U.vote({q:'بالنظر فقط… أيّها الألماس في رأيكم؟',o:['الحجر أ','الحجر ب','الحجر ج']})})}},
   {name:'اختبار البريق',g:'اضغط «مرّر ضوءًا»: يتحرك شعاع ضوء فوق الأحجار، ولاحظوا أن الحجر <b>ج</b> يتلألأ بألوان قوس المطر أكثر من غيره، وتظهر درجة البريق. ثم اضغط «اكشف معامل الانكسار»: الأعلى بريقًا له أعلى معامل انكسار (٢٫٤٢).',enter:function(){U.mini();tagsBasic();K.fly([0,2.8,8.4],[0,1.75,0],1.2);
     U.say('الخبير لا يكتفي بالنظر… يبدأ بـ<b>الضوء</b>. مرّروا ضوءًا وراقبوا: أيّ حجر يلمع بألوان قوس المطر؟');
     U.tools([{ic:'🔦',lbl:'مرّر ضوءًا على الأحجار',fn:sweep},{ic:'📐',lbl:'اكشف معامل الانكسار',fn:function(){D.forEach(function(d){U.tag('g'+d.n,new V(d.x,2.75,0),'<b>'+d.n+'</b><small>معامل الانكسار</small><b>'+X3D.ar(d.ior,2)+'</b>')});
       U.say('كلما زاد <b>معامل الانكسار</b> انحنى الضوء أكثر داخل الحجر فزاد بريقه وتلوّنه. أعلاها ٢٫٤٢!','قيم حقيقية مقيسة لهذه المواد')}}])}},
   {name:'اختبار القساوة',g:'اضغط أزرار الخدش واحدًا تلو الآخر: يُسحب كل حجر على لوح الزجاج؛ <b>أ</b> و<b>ج</b> يتركان خدشًا و<b>ب</b> لا يترك. ثم «ج ضد أ»: الألماس يخدش الكوارتز. وأخيرًا «مقياس موهس» لعرض القيم.',enter:function(){U.mini();tagsBasic();plate.visible=true;K.fly([0,4.4,9.4],[0,1.4,1.4],1.6);
     U.say('على الطاولة <b>لوح زجاج</b>. الحجر الأقسى يخدش الأقل قساوة… جرّبوا كل حجر!');
     U.tools([{ic:'✏️',lbl:'اخدش اللوح بالحجر أ',fn:function(){scratch(D[0],0)}},{ic:'✏️',lbl:'اخدش اللوح بالحجر ب',fn:function(){scratch(D[1],1)}},{ic:'✏️',lbl:'اخدش اللوح بالحجر ج',fn:function(){scratch(D[2],2)}},
       {ic:'⚔️',lbl:'الحجر ج ضد الحجر أ',fn:duel},{ic:'📏',lbl:'مقياس موهس للقساوة',fn:function(){D.forEach(function(d){U.tag('g'+d.n,new V(d.x,2.75,0),'<b>'+d.n+'</b><small>القساوة على مقياس موهس</small><b>'+d.H+'</b>')});
       U.say('على <b>مقياس موهس</b>: الألماس <b>١٠</b> وهو أقسى المعادن، والكوارتز ٧، والزجاج نحو ٥٫٥.')}}])}},
   {name:'اختبار الكثافة',g:'الأحجار لها الحجم نفسه (٠٫٥ سم³). اضغط «زِن الأحجار» لتظهر كتلة كل حجر، ثم «احسب الكثافة»: الأكثف هو الحجر ج (٣٫٥٢ غ/سم³).',enter:function(){U.mini();plate.visible=false;tagsBasic();K.fly([0,3.4,9],[0,1.5,0],1.4);
     U.say('للأحجار الحجم نفسه تمامًا: <b>٠٫٥ سم³</b>. هل تتساوى كتلها؟ ضعوها على الميزان!');
     U.tools([{ic:'⚖️',lbl:'زِن الأحجار',fn:function(){D.forEach(function(d){U.tween(1.8,function(k){U.tag('w'+d.n,new V(d.x,1.0,1.0),'<small>الكتلة</small><b>'+X3D.ar(d.m*k,2)+' غ</b>')})})}},
       {ic:'➗',lbl:'احسب الكثافة',fn:function(){D.forEach(function(d){U.tag('g'+d.n,new V(d.x,2.75,0),'<b>'+d.n+'</b><small>الكثافة (غ/سم³)</small><b>'+d.rho+'</b>')});U.say('<b>الكثافة = الكتلة ÷ الحجم</b>. الحجم واحد، لكن الألماس أكثف: ٣٫٥٢ غ/سم³.')}}])}},
   {name:'الكشف',g:'صوّت الصف من جديد بعد الاختبارات الثلاثة، ثم اضغط «اكشف الإجابة»: يرتفع الألماس وتظهر أسماء الأحجار، مع لفت الانتباه إلى أن <b>الزجاج ليس معدنًا</b>.',enter:function(){U.mini();tagsBasic();K.fly([1.8,2.9,9.6],[1.8,1.8,0],1.4);U.say('اجمعوا الأدلة: البريق… القساوة… الكثافة. صوّتوا من جديد!');
     U.vote({q:'بعد الاختبارات الثلاثة… أيّها الألماس؟',o:['الحجر أ','الحجر ب','الحجر ج'],a:2,ex:'<b>الحجر ج هو الألماس</b>: الأعلى بريقًا وقساوةً وكثافة. والمفاجأة: <b>الزجاج ليس معدنًا</b> أصلًا!',onReveal:function(){U.sfx.ok();U.flash(.35);
       D.forEach(function(d){U.tween(1.2,function(k){d.sp.intensity=lerp(d.sp.intensity,d===dia?320:40,k)});U.tag('g'+d.n,new V(d.x,2.75,0),'<b>'+d.name+'</b><small>'+(d.name==='زجاج'?'ليس معدنًا':'معدن')+'</small>')});
       move(dia,[dia.home.x,dia.home.y+.7,dia.home.z],1.4)}})}},
   {name:'سؤال الدرس',g:'اطرح سؤال الدرس واستقبل إجابات الطلاب، ثم اضغط «إلى الدرس» للانتقال إلى المحطة التالية.',enter:function(){U.mini();K.fly([0,6,14],[0,1.6,0],3);U.fin('سؤال الدرس','البريق… القساوة… الكثافة…<br>كيف نميّز <span style="color:var(--c)">المعادن</span> بعضها من بعض؟');U.say('ولماذا لا يُعدّ الزجاج معدنًا رغم أنه صلب ولامع؟')}}
  ],update:function(dt,t){if(spin)D.forEach(function(d){if(!d.busy)d.piv.rotation.y+=dt*.28});
    glints.forEach(function(g){var u=g.userData;u.life-=dt;if(u.life<=0){if(!lightOn&&!sweeping){g.material.opacity=0;return}var o=u.own||D[Math.random()<.7?2:(Math.random()<.5?0:1)];u.own=null;if(Math.random()>o.gl*(sweeping?(o===dia?3:1):1)*.9){u.life=.15;g.material.opacity=0;return}
      var dir=new V(Math.random()-.5,Math.random()*.8,Math.random()-.5).normalize(),cd=K.camera.position.clone().sub(o.piv.position).normalize();if(dir.dot(cd)<0)dir.reflect(cd);g.position.copy(o.piv.position).addScaledVector(dir,.5);u.max=(.25+Math.random()*.4*o.gl)*(sweeping&&o===dia?2.2:1);u.life=u.dur=.25+Math.random()*.35;g.material.color.setHSL(o===dia?Math.random():0,o===dia?.9:0,o===dia?.7:1)}
      var k=1-u.life/u.dur;g.material.opacity=Math.sin(k*Math.PI);g.scale.setScalar(u.max*(.6+.4*Math.sin(k*Math.PI)));g.material.rotation=t*2})}};
}};

/* ======================= ٢) آلة زمن الصخور ======================= */
S3.rocks={color:'#fb923c',build:function(K){
  var T=K.THREE,U=K.ui,sc=K.scene,V=T.Vector3;
  var P={lava:0,cool:0,erupt:0,e:0,s:0,m:0,heat:0,rain:0,day:0};
  sc.background=new T.Color(0x05060c);sc.fog=new T.Fog(0x05060c,30,70);
  var st=stars(T,1500,90);sc.add(st);
  var hemi=new T.HemisphereLight(0xbfd4ff,0x3a2a1a,.35);sc.add(hemi);
  var sun=new T.DirectionalLight(0xfff0dc,.2);sun.position.set(7,12,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);var sca=sun.shadow.camera;sca.left=sca.bottom=-9;sca.right=sca.top=9;sca.near=1;sca.far=40;sun.shadow.bias=-.0008;sc.add(sun);
  var ground=new T.Mesh(new T.CircleGeometry(40,64),new T.MeshStandardMaterial({color:0x0d0f14,roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.y=-3.02;ground.receiveShadow=true;sc.add(ground);
  var block=new T.Group();sc.add(block);
  var N=96,M=26,S=4,BOT=-3,C=[-1.2,-.7],B=[2.0,1.6];
  var vx=(N+1)*(N+1),vs=4*(N+1)*(M+1),NV=vx+vs;var pos=new Float32Array(NV*3),col=new Float32Array(NV*3),glw=new Float32Array(NV),idx=[];
  for(var j=0;j<N;j++)for(var i=0;i<N;i++){var a=j*(N+1)+i;idx.push(a,a+N+1,a+1,a+1,a+N+1,a+N+2)}
  for(var e=0;e<4;e++)for(j=0;j<M;j++)for(i=0;i<N;i++){a=vx+e*(N+1)*(M+1)+j*(N+1)+i;idx.push(a,a+1,a+N+1,a+1,a+N+2,a+N+1)}
  var geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(pos,3));geo.setAttribute('color',new T.BufferAttribute(col,3));geo.setAttribute('aGlow',new T.BufferAttribute(glw,1));geo.setIndex(idx);
  var mat=new T.MeshStandardMaterial({vertexColors:true,roughness:.92,side:T.DoubleSide});
  mat.onBeforeCompile=function(sh){sh.vertexShader='attribute float aGlow;\nvarying float vGlow;\n'+sh.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvGlow=aGlow;');sh.fragmentShader='varying float vGlow;\n'+sh.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=vec3(1.0,0.28,0.03)*vGlow*1.7;')};
  var mesh=new T.Mesh(geo,mat);mesh.castShadow=mesh.receiveShadow=true;block.add(mesh);
  var hTop=new Float32Array(vx),hPre=new Float32Array(vx),cT=new T.Color(),c2=new T.Color();
  var CD=hex(T,'#b48d5c'),CV=hex(T,'#5a4535'),CB=hex(T,'#262529'),CH=hex(T,'#ff6a10'),CR=hex(T,'#c2260c'),CS1=hex(T,'#e3c38a'),CS2=hex(T,'#c79457'),CM1=hex(T,'#ece6dd'),CM2=hex(T,'#8f8a94'),CL1=hex(T,'#8a6a4a'),CL2=hex(T,'#6b513d'),CL3=hex(T,'#4b3c31');
  function lavaMask(x,z){var dx=x-C[0],dz=z-C[1],d=Math.hypot(dx,dz);var vxn=(B[0]-C[0]),vzn=(B[1]-C[1]),L=Math.hypot(vxn,vzn);vxn/=L;vzn/=L;var al=dx*vxn+dz*vzn,lat=Math.abs(-dx*vzn+dz*vxn);
    var reach=P.lava*5.2,w=.35+.22*Math.max(0,al)+.25*vn(x*1.7,z*1.7);var m=(al>-.2&&al<reach)?sst(w,w-.25,lat)*sst(reach,reach-.4,al):0;if(d<.75*Math.min(1,P.lava*4))m=Math.max(m,1);return m}
  function update(){var k=0;for(var j=0;j<=N;j++)for(var i=0;i<=N;i++,k++){var x=-S+2*S*i/N,z=-S+2*S*j/N;var base=.42*fbm(x*.38+3,z*.38,0,4)+.15;var dx=x-C[0],dz=z-C[1],d2=dx*dx+dz*dz;var vol=1-.3*P.e;var cone=(2.4*Math.exp(-d2/2.3)-.75*Math.exp(-d2/.11))*vol;
      var db=Math.hypot(x-B[0],z-B[1]),bm=sst(1.9,.5,db);var h=base+cone-.55*bm;h=lerp(h,h*.7+.05*fbm(x,z,7),P.e);var hp=h;var sed=-.35+1.1*P.s;var isSed=0;if(P.s>0&&bm>0&&h<sed){h=lerp(h,sed,bm);isSed=bm}
      hTop[k]=h;hPre[k]=hp;pos[k*3]=x;pos[k*3+1]=h;pos[k*3+2]=z;
      var lm=lavaMask(x,z);cT.copy(CD).lerp(c2.setRGB(.55,.45,.33),fbm(x*2,z*2,1)*.5);cT.lerp(CV,Math.min(1,cone*.55));var g=0;
      if(lm>0){c2.copy(CH).lerp(CR,Math.min(1,P.cool*1.6)).lerp(CB,sst(.3,1,P.cool));c2.multiplyScalar(.75+.5*vn(x*9,z*9,3));cT.lerp(c2,lm);g=lm*(1-sst(0,.85,P.cool))*(.75+.25*Math.sin(x*6+z*5+P.t*3))}
      if(isSed>0){var band=.5+.5*Math.sin(sed*14);c2.copy(CS1).lerp(CS2,band*.5);cT.lerp(c2,isSed)}
      col[k*3]=cT.r;col[k*3+1]=cT.g;col[k*3+2]=cT.b;glw[k]=g}
    for(var e=0;e<4;e++)for(j=0;j<=M;j++)for(i=0;i<=N;i++){var ti=e===0?i:e===1?N*(N+1)+i:e===2?i*(N+1):i*(N+1)+N;var x2=pos[ti*3],z2=pos[ti*3+2],ht=hTop[ti],hp2=hPre[ti];var y=BOT+(ht-BOT)*j/M;
      var v=vx+e*(N+1)*(M+1)+j*(N+1)+i;pos[v*3]=x2;pos[v*3+1]=y;pos[v*3+2]=z2;var u=e<2?x2:z2;
      if(y>hp2+.01){var bb=.5+.5*Math.sin(y*16);cT.copy(CS1).lerp(CS2,bb)}else{var yy=y+.12*Math.sin(u*1.3);cT.copy(yy>-.7?CL1:yy>-1.6?CL2:CL3);var sb=Math.sin(yy*7.5);if(sb>.55)cT.multiplyScalar(.7);else if(sb<-.7)cT.lerp(CS1,.35)}
      var g2=0;if(P.m>0){var mm=P.m*sst(-1.0,-1.9,y);var wb=.5+.5*Math.sin(y*11+Math.sin(u*2.2)*1.4);c2.copy(CM1).lerp(CM2,wb);cT.lerp(c2,mm);g2=P.heat*sst(-1.2,-3,y)*.55}
      if(P.lava>0&&P.cool<1){var dd=Math.hypot(x2-C[0],z2-C[1]);if(dd<.35&&y>-2.6){var cm=sst(.35,.12,dd);c2.copy(CH);cT.lerp(c2,cm);g2=Math.max(g2,cm*(1-P.cool))}}
      col[v*3]=cT.r;col[v*3+1]=cT.g;col[v*3+2]=cT.b;glw[v]=g2}
    geo.attributes.position.needsUpdate=geo.attributes.color.needsUpdate=geo.attributes.aGlow.needsUpdate=true;geo.computeVertexNormals();geo.computeBoundingSphere()}
  P.t=0;update();
  var cy=0;function craterY(){return 2.4*(1-.3*P.e)-.75+.2}
  var NF=500,fg=new T.BufferGeometry(),fp=new Float32Array(NF*3),fd=[];for(i=0;i<NF;i++)fd.push([Math.random()*2,(Math.random()-.5)*1.1,(Math.random()-.5)*1.1,2.5+Math.random()*2.5]);fg.setAttribute('position',new T.BufferAttribute(fp,3));
  var fount=new T.Points(fg,new T.PointsMaterial({color:0xffa040,size:.09,blending:T.AdditiveBlending,transparent:true,depthWrite:false}));block.add(fount);fount.visible=false;
  var lavaL=new T.PointLight(0xff6a20,0,14,1.6);lavaL.position.set(C[0],3,C[1]);block.add(lavaL);
  var NR=700,rg=new T.BufferGeometry(),rp=new Float32Array(NR*6);for(i=0;i<NR;i++){var rx=(Math.random()-.5)*9,rz=(Math.random()-.5)*9,ry=Math.random()*9-1;rp.set([rx,ry,rz,rx-.03,ry-.35,rz],i*6)}rg.setAttribute('position',new T.BufferAttribute(rp,3));
  var rain=new T.LineSegments(rg,new T.LineBasicMaterial({color:0xaecbff,transparent:true,opacity:.0,depthWrite:false}));block.add(rain);
  function specimen(kind){var g=new T.IcosahedronGeometry(.55,5),p=g.attributes.position,v=new V();for(var i=0;i<p.count;i++){v.fromBufferAttribute(p,i);var n=fbm(v.x*2.2+9,v.y*2.2,v.z*2.2,4);v.multiplyScalar(1+(n-.5)*.45);v.y*=kind==='s'?.8:1;p.setXYZ(i,v.x,v.y,v.z)}g.computeVertexNormals();
    var tex=canvasTex(T,512,256,function(x,w,h){var i,r;if(kind==='b'){x.fillStyle='#2b2a2c';x.fillRect(0,0,w,h);for(i=0;i<5000;i++){r=Math.random()*1.6;x.fillStyle='rgba('+(60+Math.random()*50|0)+','+(60+Math.random()*50|0)+','+(65+Math.random()*50|0)+',.6)';x.fillRect(Math.random()*w,Math.random()*h,r,r)}for(i=0;i<70;i++){x.fillStyle='rgba(8,8,10,.9)';x.beginPath();x.ellipse(Math.random()*w,Math.random()*h,2+Math.random()*5,1.5+Math.random()*3,0,0,7);x.fill()}}
      else if(kind==='s'){for(var y=0;y<h;y++){var b=.5+.5*Math.sin(y*.32+Math.sin(y*.05)*3);x.fillStyle='rgb('+(190+b*40|0)+','+(140+b*40|0)+','+(85+b*30|0)+')';x.fillRect(0,y,w,1)}for(i=0;i<9000;i++){x.fillStyle='rgba(255,240,210,'+Math.random()*.25+')';x.fillRect(Math.random()*w,Math.random()*h,1.2,1.2)}}
      else{x.fillStyle='#eeeae4';x.fillRect(0,0,w,h);x.strokeStyle='rgba(110,105,115,.55)';for(i=0;i<14;i++){x.lineWidth=.6+Math.random()*2.2;x.beginPath();var yy=Math.random()*h;x.moveTo(0,yy);for(var xx=0;xx<=w;xx+=16)x.lineTo(xx,yy+Math.sin(xx*.02+i)*18+Math.random()*6);x.stroke()}}});
    var m=new T.Mesh(g,new T.MeshStandardMaterial({map:tex,roughness:kind==='m'?.35:.95,metalness:0}));m.castShadow=true;m.scale.setScalar(.001);sc.add(m);return m}
  var SP={b:specimen('b'),s:specimen('s'),m:specimen('m')},slot={b:[6.4,1.9,1.8],s:[6.4,.3,1.8],m:[6.4,-1.3,1.8]};
  function showSpec(k,label){var m=SP[k];m.position.fromArray(slot[k]);U.tween(1.2,function(t){m.scale.setScalar(Math.max(.001,t))});U.tag('sp'+k,new V(0,.75,0),label,m)}
  var arrows=null;
  K.drag=function(dx){block.rotation.y+=dx*.008};
  K.look([0,7,15],[0,0,0]);
  function sky(day,d){var c0=new T.Color(0x05060c),c1=new T.Color(0x9fb8d6);U.tween(d||3,function(k){var kk=lerp(P.day,day,k);sc.background.copy(c0).lerp(c1,kk);sc.fog.color.copy(sc.background);sun.intensity=.2+2.6*kk;hemi.intensity=.35+.45*kk;st.material.opacity=.8*(1-kk)},function(){P.day=day})}
  return {steps:[
   {name:'٦٥٤هـ',g:'مجسّم لقطعة من الأرض (اسحبه لتدويره). اضغط «فجّر البركان»: تتدفق اللابة ويعدّ العدّاد ٥٢ يومًا، وهو حدث حقيقي قرب المدينة المنورة سنة ٦٥٤هـ.',enter:function(){P.lava=0;P.cool=0;P.e=0;P.s=0;P.m=0;P.heat=0;update();K.look([0,9,18],[0,0,0]);K.fly([1.5,6,13.5],[1,0,0],4);
     U.title('آلة زمن الصخور','رحلة صخرة عبر الزمن','تبدأ بحدث حقيقي قرب المدينة المنورة');
     U.say('جمادى الآخرة <b>٦٥٤هـ</b> (١٢٥٦م): زلازل متتالية قرب المدينة المنورة… ثم ثار البركان!','اسحب المشهد لتدوير المجسّم');
     U.tools([{ic:'🌋',lbl:'فجّر البركان',fn:function(){if(P.erupt)return;P.erupt=1;U.sfx.boom();U.flash(.6);fount.visible=true;U.tween(9,function(k){P.lava=k;U.meter(X3D.ar(Math.round(52*k)),'يومًا من تدفّق اللابة')},function(){U.say('استمر تدفّق اللابة <b>٥٢ يومًا</b>، ووصلت إلى نحو ١٢ كم من المدينة.','المصدر: هيئة المساحة الجيولوجية السعودية')},false)}}])}},
   {name:'تبرد اللابة',g:'صوّت الصف: ماذا يحدث للّابة حين تبرد؟ ثم اكشف الإجابة أو اضغط «سرّع التبريد»: تسودّ اللابة وتظهر عيّنة <b>البازلت</b> (صخر ناري).',enter:function(){U.mini();if(P.lava<1){P.lava=1;P.erupt=1}K.fly([0,5.5,12.5],[1,.2,0],2);U.say('توقّف التدفّق… والحرارة تتسرّب من اللابة يومًا بعد يوم.');
     function cool(){P.erupt=0;fount.visible=false;sky(1,4);U.tween(4,function(k){P.cool=Math.max(P.cool,k)},function(){showSpec('b','<b>صخر ناري</b><small>البازلت · من تبريد اللابة</small>');U.say('بردت اللابة فتصلّبت <b>صخرًا ناريًا</b>… وما زالت «الحرّات» السوداء قرب المدينة حتى اليوم.')})}
     U.vote({q:'ماذا سيحدث للّابة حين تبرد؟',o:['تبقى سائلة إلى الأبد','تتصلّب فتصبح صخرًا','تتبخّر وتختفي'],a:1,ex:'تبرد اللابة وتتصلّب فتكوّن <b>صخرًا ناريًا</b> مثل البازلت.',onReveal:cool});
     U.tools([{ic:'❄️',lbl:'سرّع التبريد',fn:function(){U.reveal();if(P.cool<.01)cool()}}])}},
   {name:'ملايين السنين',g:'اضغط «مطر ورياح»: يتآكل البركان وتتراكم الطبقات في المنخفض، ثم تظهر عيّنة <b>الحجر الرملي</b> (صخر رسوبي).',enter:function(){U.mini();P.cool=1;P.erupt=0;fount.visible=false;if(P.day<1)sky(1,1);showSpec('b','<b>صخر ناري</b><small>البازلت</small>');K.fly([3.5,6.5,13.5],[1.2,-.2,.5],2);
     U.say('الآن نسرّع الزمن ملايين السنين… ماذا تفعل الأمطار والرياح بالصخور؟');
     U.tools([{ic:'🌧️',lbl:'مطر ورياح عبر ملايين السنين',fn:function(){if(P.rain)return;P.rain=1;U.tween(1,function(k){rain.material.opacity=.5*k});U.say('المطر والرياح تفتّت الصخور (<b>تجوية</b>) وتنقل فتاتها (<b>تعرية</b>)…');
       U.tween(10,function(k){P.e=Math.min(1,k*1.6);P.s=sst(.35,1,k);U.meter(X3D.ar(Math.round(k*10))+' ملايين','سنة تقريبًا (توضيحي)')},function(){P.rain=0;U.tween(1,function(k){rain.material.opacity=.5*(1-k)});
         showSpec('s','<b>صخر رسوبي</b><small>الحجر الرملي · فتات تراكم وتماسك</small>');U.say('ترسّب الفتات طبقةً فوق طبقة ثم تماسك فصار <b>صخرًا رسوبيًا</b>… مثل صخور العُلا.')},false)}}])}},
   {name:'حرارة وضغط',g:'صوّت الصف، ثم اضغط «اضغط وسخّن»: يتوهج الجزء السفلي من المجسّم وتتحول طبقاته إلى أشرطة، وتظهر عيّنة <b>الرخام</b> (صخر متحوّل).',enter:function(){U.mini();P.e=1;P.s=1;showSpec('b','<b>صخر ناري</b>');showSpec('s','<b>صخر رسوبي</b>');K.fly([.5,3.6,13],[1.2,-.8,0],2);
     U.say('تُدفن الصخور أعمق فأعمق… حيث الحرارة والضغط هائلان.');
     function press(){U.sfx.boom();U.tween(5,function(k){P.m=Math.max(P.m,k);P.heat=Math.sin(k*Math.PI)*1+k*.15;block.scale.y=1-.1*k},function(){showSpec('m','<b>صخر متحوّل</b><small>الرخام · تغيّر بالحرارة والضغط</small>');U.say('لم ينصهر الصخر… لكن بلّوراته وتركيبه تغيّرت فصار <b>صخرًا متحوّلًا</b> مثل الرخام.')})}
     U.vote({q:'حرارة وضغط هائلان دون أن تنصهر الصخور… ماذا يحدث لها؟',o:['تتحوّل إلى صخر جديد مختلف','تعود لابة فورًا','لا يتغيّر فيها شيء'],a:0,ex:'يتغيّر تركيبها وبلّوراتها فتصبح <b>صخرًا متحوّلًا</b>.',onReveal:press});
     U.tools([{ic:'🔥',lbl:'اضغط وسخّن',fn:function(){U.reveal();if(P.m<.01)press()}}])}},
   {name:'الدورة',g:'تتجمع العيّنات الثلاث في دائرة تمثّل <b>دورة الصخور</b>. اطرح سؤال الدرس، ثم انتقل إلى الدرس.',enter:function(){U.mini();P.m=Math.max(P.m,1);P.heat=.15;showSpec('b','<b>صخر ناري</b>');showSpec('s','<b>صخر رسوبي</b>');showSpec('m','<b>صخر متحوّل</b>');K.fly([0,4.5,14],[2.5,.6,2],2.5);
     var cen=new V(3.2,1.2,4.6),ks=['b','s','m'],p0=ks.map(function(k){return SP[k].position.clone()});U.tween(2.2,function(t){ks.forEach(function(k,i){var a=-Math.PI/2+i*2.094;SP[k].position.lerpVectors(p0[i],new V(cen.x+Math.cos(a)*1.7,cen.y+Math.sin(a)*1.7,cen.z),t)})},function(){
       if(!arrows){arrows=new T.Group();for(var i=0;i<3;i++){var a0=-Math.PI/2+i*2.094+.45,a1=a0+2.094-.9,pts=[];for(var s=0;s<=20;s++){var a=lerp(a0,a1,s/20);pts.push(new V(Math.cos(a)*1.7,Math.sin(a)*1.7,0))}
         var tb=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),40,.045,8),new T.MeshBasicMaterial({color:0xfbbf24}));arrows.add(tb);var cn=new T.Mesh(new T.ConeGeometry(.12,.3,16),new T.MeshBasicMaterial({color:0xfbbf24}));var e=pts[20],e0=pts[19];cn.position.copy(e);cn.quaternion.setFromUnitVectors(new V(0,1,0),e.clone().sub(e0).normalize());arrows.add(cn)}arrows.position.copy(cen);sc.add(arrows)}
       U.fin('سؤال الدرس','كيف تتكوّن الصخور النارية والرسوبية والمتحوّلة؟<br><span style="color:var(--c)">وكيف تتحوّل الصخرة من نوع إلى آخر؟</span>')});
     U.say('ناري… رسوبي… متحوّل… والرحلة لا تتوقف أبدًا!')}}
  ],update:function(dt,t){P.t=t;update();var cy2=craterY();lavaL.intensity=P.erupt?(22+12*Math.sin(t*13)*Math.sin(t*7)):(P.lava>0?14*(1-P.cool):0);lavaL.position.set(C[0],cy2+.8,C[1]);
    if(fount.visible){for(var i=0;i<NF;i++){var d=fd[i],tt=(t*.9+d[0])%1.4;fp[i*3]=C[0]+d[1]*tt*1.6;fp[i*3+1]=cy2+d[3]*tt-4.9*tt*tt;fp[i*3+2]=C[1]+d[2]*tt*1.6}fg.attributes.position.needsUpdate=true}
    if(rain.material.opacity>0){var a=rg.attributes.position.array;for(i=0;i<NR;i++){var y=a[i*6+1]-dt*9;if(y<-.5)y+=9;a[i*6+1]=y;a[i*6+4]=y-.35}rg.attributes.position.needsUpdate=true}
    ['b','s','m'].forEach(function(k){SP[k].rotation.y+=dt*.5;SP[k].rotation.x=Math.sin(t*.4)*.2});if(arrows)arrows.rotation.z-=dt*.15}};
}};

/* ======================= ٣) الأرض الحية ======================= */
S3.earth={color:'#f97316',build:function(K){
  var T=K.THREE,U=K.ui,sc=K.scene,V=T.Vector3,G=window.X3GEO,R=2;
  sc.background=new T.Color(0x02030a);sc.add(stars(T,2500,90));
  var sun=new T.DirectionalLight(0xffffff,2.6);sun.position.set(6,3,8);sc.add(sun);sc.add(new T.AmbientLight(0x6a7a9a,.55));
  function ll(lon,lat,r){var ph=(90-lat)*Math.PI/180,th=(lon+180)*Math.PI/180;return new V(-r*Math.sin(ph)*Math.cos(th),r*Math.cos(ph),r*Math.sin(ph)*Math.sin(th))}
  var W=2048,H=1024;function px(c){return[(c[0]+180)/360*W,(90-c[1])/180*H]}
  var mapT=canvasTex(T,W,H,function(x){var g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0c2a4a');g.addColorStop(.5,'#11406e');g.addColorStop(1,'#0c2a4a');x.fillStyle=g;x.fillRect(0,0,W,H);
    for(var i=0;i<3000;i++){x.fillStyle='rgba(255,255,255,'+Math.random()*.03+')';x.fillRect(Math.random()*W,Math.random()*H,2,2)}
    x.lineJoin='round';G.land.forEach(function(p){x.beginPath();p.forEach(function(c,i){var q=px(c);if(i&&Math.abs(c[0]-p[i-1][0])>180){x.moveTo(q[0],q[1]);return}i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1])});x.closePath();x.fillStyle='#b9a77c';x.fill();x.strokeStyle='#e9dcb8';x.lineWidth=2;x.stroke()});
    x.globalCompositeOperation='source-atop';for(i=0;i<16000;i++){var yy=Math.random()*H,lat=90-yy/H*180;x.fillStyle=Math.abs(lat)>60?'rgba(255,255,255,.08)':Math.abs(lat)<25?'rgba(70,110,40,.06)':'rgba(120,90,50,.06)';x.fillRect(Math.random()*W,yy,6,6)}x.globalCompositeOperation='source-over';
    x.strokeStyle='rgba(255,255,255,.06)';x.lineWidth=1;for(var lo=-180;lo<=180;lo+=30){var a=px([lo,0]);x.beginPath();x.moveTo(a[0],0);x.lineTo(a[0],H);x.stroke()}for(var la=-60;la<=60;la+=30){a=px([0,la]);x.beginPath();x.moveTo(0,a[1]);x.lineTo(W,a[1]);x.stroke()}});
  var pbT=canvasTex(T,W,H,function(x){x.clearRect(0,0,W,H);x.lineCap='round';x.lineJoin='round';[[10,'rgba(255,80,40,.25)'],[4,'rgba(255,120,60,.9)'],[1.6,'rgba(255,230,190,1)']].forEach(function(s){x.strokeStyle=s[1];x.lineWidth=s[0];G.pb.forEach(function(l){x.beginPath();l.forEach(function(c,i){var q=px(c);if(i&&Math.abs(c[0]-l[i-1][0])>180){x.stroke();x.beginPath();x.moveTo(q[0],q[1]);return}i?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1])});x.stroke()})})});
  var clipA=new T.Plane(new V(-1,0,0),9),clipB=new T.Plane(new V(0,0,-1),9),clips=[clipA,clipB];
  var globe=new T.Group();sc.add(globe);
  var earth=new T.Mesh(new T.SphereGeometry(R,128,64),new T.MeshStandardMaterial({map:mapT,roughness:.85,metalness:0,clippingPlanes:clips,clipIntersection:true,side:T.DoubleSide}));globe.add(earth);
  var pbM=new T.MeshBasicMaterial({map:pbT,transparent:true,opacity:0,depthWrite:false,blending:T.AdditiveBlending,clippingPlanes:clips,clipIntersection:true});var pbS=new T.Mesh(new T.SphereGeometry(R*1.004,128,64),pbM);globe.add(pbS);
  var atm=new T.Mesh(new T.SphereGeometry(R*1.13,64,32),new T.ShaderMaterial({transparent:true,side:T.BackSide,blending:T.AdditiveBlending,depthWrite:false,vertexShader:'varying vec3 n;void main(){n=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec3 n;void main(){float i=pow(0.72-dot(n,vec3(0,0,1.0)),3.0);gl_FragColor=vec4(0.35,0.62,1.0,1.0)*i*1.6;}'}));sc.add(atm);
  var LAY=[[R*.965,'#d9541c',.15,'الوشاح','طبقة لدنة تتحرك ببطء'],[R*.546,'#f59e0b',.45,'اللب الخارجي','فلزات منصهرة'],[R*.19,'#fde68a',.9,'اللب الداخلي','فلزات صلبة شديدة الحرارة']],layers=[];
  LAY.forEach(function(l){var m=new T.Mesh(new T.SphereGeometry(l[0],96,48),new T.MeshStandardMaterial({color:l[1],emissive:l[1],emissiveIntensity:l[2],roughness:.7,clippingPlanes:clips,clipIntersection:true,side:T.DoubleSide}));m.visible=false;globe.add(m);layers.push(m)});
  var EQ=G.eq,nq=EQ.length,dummy=new T.Object3D(),inst=new T.InstancedMesh(new T.SphereGeometry(1,10,8),new T.MeshBasicMaterial({clippingPlanes:clips,clipIntersection:true}),nq),shown=new Float32Array(nq);
  EQ.forEach(function(q,i){var p=ll(q[0],q[1],R*1.006);dummy.position.copy(p);dummy.scale.setScalar(0);dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix);inst.setColorAt(i,new T.Color(q[2]>=5?0xff3b30:q[2]>=4?0xff9f0a:0xffd60a));q.p=p});inst.instanceMatrix.needsUpdate=true;inst.instanceColor.needsUpdate=true;globe.add(inst);
  var rings=[];for(var i=0;i<14;i++){var rg=new T.Mesh(new T.RingGeometry(.9,1,40),new T.MeshBasicMaterial({color:0xffb020,transparent:true,opacity:0,side:T.DoubleSide,depthWrite:false}));rg.userData.t=9;globe.add(rg);rings.push(rg)}var ri=0;
  function ring(p,s){var r=rings[ri++%rings.length];r.position.copy(p);r.lookAt(p.clone().multiplyScalar(2));r.userData.t=0;r.userData.s=s}
  var lun=ll(37.75,25.17,R*1.008),mk=new T.Mesh(new T.SphereGeometry(.028,16,12),new T.MeshBasicMaterial({color:0xff2d2d}));mk.position.copy(lun);mk.visible=false;globe.add(mk);
  function arrow(lon,lat,blon,blat,color){var a=ll(lon,lat,R*1.03),b=ll(blon,blat,R*1.03),g=new T.Group(),d=b.clone().sub(a),L=d.length();var cy=new T.Mesh(new T.CylinderGeometry(.018,.018,L*.75,10),new T.MeshBasicMaterial({color:color}));cy.position.copy(a).addScaledVector(d,.375);cy.quaternion.setFromUnitVectors(new V(0,1,0),d.clone().normalize());
    var cn=new T.Mesh(new T.ConeGeometry(.05,L*.28,16),new T.MeshBasicMaterial({color:color}));cn.position.copy(a).addScaledVector(d,.86);cn.quaternion.copy(cy.quaternion);g.add(cy,cn);g.visible=false;globe.add(g);return g}
  var arA=arrow(44,22,50,27,0xffffff),arF=arrow(30,18,24,15,0xffffff);
  var spin=.12,play=-1,PLAYD=12,MAXM=10063,cut=0;
  K.drag=function(dx,dy){globe.rotation.y+=dx*.006};
  K.look([0,1.5,14],[0,0,0]);
  function faceLon(lon,lat,cam,d,done){var p=ll(lon,lat,1),ap=Math.atan2(p.z,p.x),acm=Math.atan2(cam.z,cam.x),ry0=globe.rotation.y,ry=ap-acm;while(ry-ry0>Math.PI)ry-=2*Math.PI;while(ry-ry0<-Math.PI)ry+=2*Math.PI;U.tween(d||2.5,function(k){globe.rotation.y=lerp(ry0,ry,k)},done)}
  function setCut(on,d){var c0=clipA.constant,c1=on?0:9;layers.forEach(function(l){l.visible=true});U.tween(d||2.5,function(k){clipA.constant=clipB.constant=lerp(c0,c1,k)},function(){if(!on)layers.forEach(function(l){l.visible=false})})}
  return {steps:[
   {name:'كوكب يرتجف',g:'كرة أرضية تدور (اسحبها لتدويرها). اضغط «شغّل أسبوعًا من الزلازل»: تظهر زلازل حقيقية رُصدت خلال أسبوع واحد، مع عدّاد للأيام والزلازل.',enter:function(){spin=.12;K.look([0,2,15],[0,0,0]);K.fly([0,1.4,7.8],[0,.3,0],4);U.title('بيانات حقيقية · هيئة المسح الجيولوجي الأمريكية','الأرض الحية','أسبوع واحد من زلازل كوكبنا');
     U.say('شغّلوا أسبوعًا حقيقيًا من الزلازل… كل نقطة <b>زلزال سُجّل فعلًا</b> بين ٣١ يناير و٧ فبراير ٢٠١٨م.','الزلازل التي قوتها ٢٫٥ فأكثر · اسحب الكرة لتدويرها');
     U.tools([{ic:'▶️',lbl:'شغّل أسبوعًا من الزلازل',fn:function(){for(var i=0;i<nq;i++)shown[i]=0;play=0}}])}},
   {name:'لاحظ النمط',g:'اسأل: هل الزلازل منتشرة عشوائيًا؟ صوّت الصف، ثم اكشف الإجابة أو اضغط «أظهر حدود الصفائح»: تضيء الحدود فوق أحزمة الزلازل.',enter:function(){U.mini();if(play<0)play=PLAYD;spin=.06;K.fly([0,1.4,7.6],[0,.3,0],1.5);U.say('أوقفوا الكرة وتأمّلوا: هل الزلازل منتشرة في كل مكان؟');
     function showPB(){U.tween(2.5,function(k){pbM.opacity=k});U.say('قشرة الأرض ليست قطعة واحدة… بل <b>صفائح</b> ضخمة متجاورة كقطع اللغز، والزلازل تتجمّع على <b>حدودها</b>.','الحدود من نموذج علمي منشور لحدود الصفائح الأرضية')}
     U.vote({q:'ماذا تلاحظون على أماكن الزلازل؟',o:['موزّعة عشوائيًا في كل مكان','تتجمّع في أحزمة وخطوط','تحدث في الصحارى فقط'],a:1,ex:'تتجمّع في <b>أحزمة</b>… هذه الأحزمة هي <b>حدود الصفائح الأرضية</b>.',onReveal:showPB});
     U.tools([{ic:'✨',lbl:'أظهر حدود الصفائح',fn:function(){U.reveal();if(pbM.opacity<.01)showPB()}}])}},
   {name:'في الداخل',g:'اضغط «اشطر الكرة الأرضية»: يُقطع ربع الكرة وتظهر الطبقات بأسمائها: القشرة، الوشاح، اللب الخارجي، اللب الداخلي.',enter:function(){U.mini();pbM.opacity=1;spin=.05;K.fly([5.2,2,5.2],[0,.25,0],2.2);U.say('ما الذي يحرّك هذه الصفائح؟ لنشطر الأرض وننظر إلى الداخل…');
     U.tools([{ic:'🔪',lbl:'اشطر الكرة الأرضية',fn:function(){U.sfx.boom();setCut(true,3);U.wait(3,function(){function onFace(r,a){a=a*Math.PI/180;return new V(0,r*Math.sin(a),r*Math.cos(a))}U.tag('crust',onFace(R*.99,62),'<b>القشرة</b><small>تتكوّن منها الصفائح</small>');
         [[R*.78,25],[R*.42,-38],[R*.12,-100]].forEach(function(q,i){var l=LAY[i];U.tag('L'+i,onFace(q[0],q[1]),'<b>'+l[3]+'</b><small>'+l[4]+'</small>')});
         U.say('تطفو الصفائح الصلبة فوق طبقة <b>لدنة</b> من الوشاح تتحرك ببطء شديد… فتحمل الصفائح معها.','سُمك القشرة مكبَّر للتوضيح')})}}])}},
   {name:'بيتنا يتحرك',g:'تقترب الكاميرا من الجزيرة العربية: الأسهم البيضاء تبيّن ابتعاد الجزيرة العربية عن أفريقيا، والنقطة الحمراء النابضة موقع زلازل <b>حرّة الشاقة ٢٠٠٩م</b>.',enter:function(){U.mini();pbM.opacity=1;if(clipA.constant<9)setCut(false,1.5);spin=0;var cd=new V(0,1.45,4.6);K.fly(cd.toArray(),[0,.15,0],2.5);faceLon(40,22,cd,2.5,function(){mk.visible=arA.visible=arF.visible=true;
       U.tag('lun',lun,'<b>حرّة الشاقة · ٢٠٠٩م</b><small>أكثر من ٣٠ ألف هزّة وشقوق ٨ كم</small>');U.tag('rs',ll(40,15,R*1.01),'<b>البحر الأحمر</b><small>يتّسع نحو ١ سم كل سنة</small>')});
     U.say('<b>بيتنا يتحرك!</b> الجزيرة العربية تبتعد عن أفريقيا نحو ١ سم كل سنة… فتهتز الأرض وتتشقق كما حدث في حرّة الشاقة قرب العيص.','المصدر: هيئة المساحة الجيولوجية السعودية')}},
   {name:'سؤال الدرس',g:'اطرح سؤال الدرس، ثم انتقل إلى الدرس.',enter:function(){U.mini();spin=.1;mk.visible=arA.visible=arF.visible=false;K.fly([0,1,9],[0,.2,0],3);U.fin('سؤال الدرس','كيف تتحرك صفائح الأرض؟<br><span style="color:var(--c)">وماذا يحدث عند حدودها؟</span>');U.say('جبال… براكين… زلازل… كلها تبدأ من حركة الصفائح.')}}
  ],update:function(dt,t){globe.rotation.y+=dt*spin;
    if(play>=0&&play<PLAYD){play+=dt;var lim=Math.min(1,play/PLAYD)*MAXM,cnt=0;for(var i=0;i<nq;i++){var q=EQ[i];if(q[3]<=lim){if(!shown[i]){shown[i]=.001;if(q[2]>=4.5)ring(q.p,.06+(q[2]-4)*.05)}cnt++}}
      U.meter(X3D.ar(cnt),'زلزالًا · اليوم '+X3D.ar(Math.min(7,Math.floor(play/PLAYD*7)+1))+' من ٧')}
    var ch=false;for(i=0;i<nq;i++){if(shown[i]>0&&shown[i]<1){shown[i]=Math.min(1,shown[i]+dt*2.2);var s=shown[i],k=s<.6?s/.6*1.4:1.4-(s-.6)/.4*.4;dummy.position.copy(EQ[i].p);dummy.scale.setScalar((.011+(EQ[i][2]-2.5)*.009)*k);dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix);ch=true}}if(ch)inst.instanceMatrix.needsUpdate=true;
    rings.forEach(function(r){var u=r.userData;if(u.t<1.5){u.t+=dt;var k=u.t/1.5;r.scale.setScalar(u.s*(.2+k*2.2));r.material.opacity=.9*(1-k)}else r.material.opacity=0});
    if(mk.visible){mk.scale.setScalar(1+.5*Math.sin(t*6));if(Math.floor(t*1.2)!==Math.floor((t-dt)*1.2))ring(lun,.08)}
    if(pbM.opacity>0&&pbM.opacity<=1)pbM.color.setScalar(.75+.25*Math.sin(t*2.5))}};
}};

/* ======================= ٤) النحّات الخفي ======================= */
S3.sculpt={color:'#fbbf24',build:function(K){
  var T=K.THREE,U=K.ui,sc=K.scene,V=T.Vector3;
  var skyM=new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{top:{value:new T.Color(0x2c4f86)},mid:{value:new T.Color(0xf2a35e)},bot:{value:new T.Color(0xf6d3a0)},k:{value:1}},vertexShader:'varying vec3 w;void main(){w=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform vec3 top,mid,bot;uniform float k;varying vec3 w;void main(){float h=w.y;vec3 c=h>0.06?mix(mid,top,smoothstep(0.06,0.55,h)):mix(bot,mid,smoothstep(-0.05,0.06,h));gl_FragColor=vec4(c*k,1.0);}'});
  sc.add(new T.Mesh(new T.SphereGeometry(200,32,16),skyM));sc.fog=new T.Fog(0xe9b483,40,160);
  var sun=new T.DirectionalLight(0xffd6a0,3.2);sun.position.set(-14,9,10);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);var sca=sun.shadow.camera;sca.left=sca.bottom=-10;sca.right=sca.top=10;sca.near=1;sca.far=60;sun.shadow.bias=-.0006;sc.add(sun);
  var hemi=new T.HemisphereLight(0x9ec0ff,0xc98a50,.9);sc.add(hemi);
  var gG=new T.PlaneGeometry(160,160,160,160);gG.rotateX(-Math.PI/2);var gp=gG.attributes.position;for(var i=0;i<gp.count;i++){var x=gp.getX(i),z=gp.getZ(i),d=Math.hypot(x,z);var h=sst(8,30,d)*(2.6*fbm(x*.03,z*.05,2,4)-.9)+.25*fbm(x*.3,z*.3,5,3)-.1;if(x>6&&x<26&&z>-14&&z<6)h+=0;gp.setY(i,h)}gG.computeVertexNormals();
  var ground=new T.Mesh(gG,new T.MeshStandardMaterial({color:0xd9a56c,roughness:1}));ground.receiveShadow=true;sc.add(ground);
  [[-30,-50,14],[25,-60,18],[60,-40,10],[-60,-30,12]].forEach(function(m){var g=new T.CylinderGeometry(m[2]*.7,m[2],m[2]*.9,9,1);var mm=new T.Mesh(g,new T.MeshStandardMaterial({color:0xb7754a,roughness:1,flatShading:true}));mm.position.set(m[0],m[2]*.45-1,m[1]);sc.add(mm)});
  /* مخطط الفيل (مأخوذ من صورة جبل الفيل) — بوحدات المشهد */
  function P2(x,y){return new T.Vector2((x-950)/100,(720-y)/100)}
  var el=new T.Shape();el.moveTo(P2(650,720).x,0);el.lineTo(P2(660,560).x,P2(660,560).y);[[662,500,632,455],[596,400,640,330],[690,250,775,250],[850,252,885,330],[960,330,1070,345],[1185,360,1240,450],[1272,560,1265,720]].forEach(function(q){var a=P2(q[0],q[1]),b=P2(q[2],q[3]);el.quadraticCurveTo(a.x,a.y,b.x,b.y)});
  var EP=el.getSpacedPoints(180);EP.pop();
  var hole=new T.Path();var hp=[[712,720],[742,720]];hole.moveTo(P2(712,720).x,0);hole.quadraticCurveTo(P2(716,610).x,P2(716,610).y,P2(730,540).x,P2(730,540).y);hole.quadraticCurveTo(P2(760,470).x,P2(760,470).y,P2(840,472).x,P2(840,472).y);hole.quadraticCurveTo(P2(925,480).x,P2(925,480).y,P2(938,570).x,P2(938,570).y);hole.lineTo(P2(942,720).x,0);
  var HP=hole.getSpacedPoints(70);HP.pop();var hc=new T.Vector2((P2(712,720).x+P2(942,720).x)/2,0);
  var RX0=-3.6,RX1=3.2,RY1=4.8,cx=0,cy=2.1;
  var RP=EP.map(function(p){var dx=p.x-cx,dy=p.y-cy;var tx=dx>0?(RX1-cx)/dx:dx<0?(RX0-cx)/dx:1e9,ty=dy>0?(RY1-cy)/dy:dy<0?(0-cy)/dy:1e9;var t=Math.min(tx,ty);return new T.Vector2(cx+dx*t,Math.max(0,cy+dy*t))});
  var rockM=new T.MeshStandardMaterial({vertexColors:true,roughness:.95,flatShading:true});var rock=new T.Mesh(new T.BufferGeometry(),rockM);rock.castShadow=rock.receiveShadow=true;sc.add(rock);
  var S1=hex(T,'#d98d55'),S2=hex(T,'#b5653a'),S3c=hex(T,'#8c4a2a'),WET=hex(T,'#6e3b22'),tc=new T.Color();
  var st={k:0,wet:0},lastK=-1;
  function build(){var k=st.k,sh=new T.Shape(EP.map(function(p,i){return new T.Vector2(lerp(RP[i].x,p.x,k),lerp(RP[i].y,p.y,k))}));var hk=sst(.25,1,k);if(hk>.04){var hpth=new T.Path(HP.map(function(p){return new T.Vector2(hc.x+(p.x-hc.x)*hk,(p.y)*hk)}).reverse());sh.holes.push(hpth)}
    var g=new T.ExtrudeGeometry(sh,{depth:2.6,steps:6,bevelEnabled:true,bevelThickness:.18,bevelSize:.14,bevelSegments:3,curveSegments:4});g.translate(0,0,-1.3);var p=g.attributes.position,cl=new Float32Array(p.count*3),v=new V();
    for(var i=0;i<p.count;i++){v.fromBufferAttribute(p,i);var n1=fbm(v.x*2.4+1,v.y*1.2,v.z*2.4,4)-.5,n2=fbm(v.x*2.4+7,v.y*1.2+3,v.z*2.4,4)-.5;var dy=v.y>.05?1:0;var gr=.06*Math.sin(v.x*9+v.z*7)*Math.sin(v.y*2.5);v.x+=(n1*.16+gr)*dy;v.z+=(n2*.16+gr)*dy;v.y+=(fbm(v.x*3,v.y*3+5,v.z*3,3)-.5)*.08*dy;p.setXYZ(i,v.x,v.y,v.z);
      var band=.5+.5*Math.sin(v.y*5.5+fbm(v.x*.6,v.y*.6,v.z*.6,3)*3);tc.copy(S1).lerp(S2,band);if(v.y<.6)tc.lerp(S3c,(.6-v.y)*.6);tc.lerp(WET,st.wet*sst(3.5,0,v.y)*.6);tc.multiplyScalar(.9+.2*fbm(v.x*4,v.y*4,v.z*4,2));cl[i*3]=tc.r;cl[i*3+1]=tc.g;cl[i*3+2]=tc.b}
    g.setAttribute('color',new T.BufferAttribute(cl,3));g.computeVertexNormals();rock.geometry.dispose();rock.geometry=g;lastK=k}
  build();
  var deb=[],dG=new T.DodecahedronGeometry(.12,0),dM=new T.MeshStandardMaterial({color:0xb5653a,roughness:1,flatShading:true});for(i=0;i<60;i++){var m=new T.Mesh(dG,dM);m.castShadow=true;m.visible=false;m.userData={v:new V(),on:0};sc.add(m);deb.push(m)}var di=0;
  function debris(n){for(var j=0;j<n;j++){var m=deb[di++%deb.length];var a=Math.random();m.position.set(lerp(RX0,RX1,Math.random()),1+Math.random()*3.2,(Math.random()-.5)*2.6);m.userData.v.set((Math.random()-.5)*2,Math.random()*1.5,(Math.random()<.5?-1:1)*(1+Math.random()*2));m.userData.on=1;m.visible=true;m.scale.setScalar(.5+Math.random()*1.3)}}
  var pile=new T.Mesh(new T.SphereGeometry(1,32,16,0,Math.PI*2,0,Math.PI/2),new T.MeshStandardMaterial({color:0xd29a62,roughness:1}));pile.scale.set(.01,.01,.01);pile.position.set(.2,0,1.9);pile.receiveShadow=true;sc.add(pile);
  var dune=new T.Mesh(new T.SphereGeometry(1,40,20,0,Math.PI*2,0,Math.PI/2),new T.MeshStandardMaterial({color:0xe3ad70,roughness:1}));dune.scale.set(.01,.01,.01);dune.position.set(11,0,1);dune.receiveShadow=true;dune.castShadow=true;sc.add(dune);
  var NS=900,sG=new T.BufferGeometry(),sP=new Float32Array(NS*3),sD=[];for(i=0;i<NS;i++){sD.push([Math.random(),Math.random()*4,(Math.random()-.5)*4,.6+Math.random()*.8]);}sG.setAttribute('position',new T.BufferAttribute(sP,3));
  var sand=new T.Points(sG,new T.PointsMaterial({color:0xf3c58c,size:.06,transparent:true,opacity:0,depthWrite:false}));sc.add(sand);var windMode=0;
  var NR=800,rG=new T.BufferGeometry(),rP=new Float32Array(NR*6);for(i=0;i<NR;i++){var rx=(Math.random()-.5)*14,rz=(Math.random()-.5)*10,ry=Math.random()*10;rP.set([rx,ry,rz,rx+.05,ry-.4,rz],i*6)}rG.setAttribute('position',new T.BufferAttribute(rP,3));
  var rain=new T.LineSegments(rG,new T.LineBasicMaterial({color:0xcfe0ff,transparent:true,opacity:0,depthWrite:false}));sc.add(rain);
  var done=false,orbit=0;
  K.drag=function(dx){orbit+=dx*.006};
  K.look([2,3,16],[0,2,0]);
  function carve(amt,dur,fx){if(st.k>=1)return;var k0=st.k,k1=Math.min(1,k0+amt);U.tween(dur,function(k){st.k=lerp(k0,k1,k);U.meter(X3D.ar(Math.round(st.k*100))+'٪','من عمل النحّات الخفي');pile.scale.set(1.6*st.k+.01,.55*st.k+.01,1.1*st.k+.01)},function(){if(st.k>=1&&!done){done=true;reveal()}});
    var tk=0;var iv=U.tween(dur,function(k){if(k-tk>.08){tk=k;debris(2)}});fx&&fx(dur)}
  function reveal(){U.sfx.ok();U.flash(.3);U.tag('el',new V(-2.4,5.2,0),'<b>جبل الفيل · العُلا</b><small>ارتفاعه الحقيقي ٥٢ مترًا · حجر رملي</small>');U.say('إنه <b>جبل الفيل</b> في العُلا: نحتته <b>التجوية والتعرية</b> عبر ملايين السنين… دون أي إنسان!')}
  var view=[[-1,3.6,15.5],[.2,2.4,0]];
  return {steps:[
   {name:'الكتلة الصمّاء',g:'كتلة حجر رملي في صحراء العُلا (اسحب المشهد للدوران حولها). صوّت الصف: من سينحتها؟',enter:function(){K.look([6,6,26],[0,2,0]);K.fly(view[0],view[1],4);U.title('العُلا · قبل ملايين السنين','النحّات الخفي','كتلة حجر رملي… من سينحتها؟');
     U.say('كتلة ضخمة من <b>الحجر الرملي</b> في صحراء العُلا. لا إزميل ولا إنسان… ومع ذلك ستتحوّل إلى تحفة!','اسحب المشهد للدوران حول الصخرة');
     U.wait(2.5,function(){U.vote({q:'من سينحت هذه الكتلة؟',o:['الإنسان بأدواته','المطر والرياح والحرارة','الحيوانات'],a:1,ex:'لا إنسان ولا إزميل: <b>عوامل التجوية والتعرية</b> هي النحّات الخفي.'})})}},
   {name:'انحت كالطبيعة',g:'اضغط أدوات الطبيعة بالترتيب: المطر، ثم الرياح، ثم الحرارة، ثم «مليون سنة»؛ يتساقط الفتات ويرتفع العدّاد حتى تتشكل الكتلة على هيئة <b>جبل الفيل</b> ويظهر اسمه.',enter:function(){U.mini();K.fly(view[0],view[1],1.2);U.say(done?'اكتمل النحت!':'أنتم الآن <b>الطبيعة</b>! اختاروا عاملًا… وشاهدوا ماذا يصنع بالصخر.');
     U.tools([{ic:'🌧️',lbl:'مطر يتسرّب في الشقوق',fn:function(){carve(.22,3,function(d){U.tween(.6,function(k){rain.material.opacity=.55*k});U.tween(d,function(k){st.wet=Math.sin(k*Math.PI)},function(){U.tween(1,function(k){rain.material.opacity=.55*(1-k)})})});U.say('الماء يتسرّب في الشقوق ويُذيب المواد اللاحمة بين الحبيبات… فتتفكّك.')}},
       {ic:'💨',lbl:'رياح محمّلة بالرمال',fn:function(){windMode=1;U.tween(.5,function(k){sand.material.opacity=.85*k});carve(.22,3,function(d){U.wait(d,function(){U.tween(1,function(k){sand.material.opacity=.85*(1-k)})})});U.say('حبيبات الرمل التي تحملها الرياح تصطدم بالصخر كورق الصنفرة… فتبريه ببطء.')}},
       {ic:'🌡️',lbl:'حرارة النهار وبرودة الليل',fn:function(){carve(.22,3,function(d){U.tween(d,function(k){var c=.5+.5*Math.cos(k*Math.PI*6);sun.intensity=.4+2.8*c;skyM.uniforms.k.value=.35+.65*c},function(){sun.intensity=3.2;skyM.uniforms.k.value=1})});U.say('يتمدّد الصخر في حرّ النهار وينكمش في برد الليل… فيتشقّق ويتساقط.')}},
       {ic:'⏩',lbl:'مليون سنة دفعة واحدة',fn:function(){carve(1,6,function(d){windMode=1;U.tween(.6,function(k){rain.material.opacity=.4*k;sand.material.opacity=.7*k});U.wait(d,function(){U.tween(1,function(k){rain.material.opacity=.4*(1-k);sand.material.opacity=.7*(1-k)})})})}}])}},
   {name:'أين ذهب الفتات؟',g:'اضغط «أطلق الرياح»: تحمل الرياح الفتات من أسفل الصخرة فيتكوّن <b>كثيب رملي</b> (تعرية ثم ترسيب).',enter:function(){U.mini();if(st.k<1){st.k=1;done=true;build();pile.scale.set(1.6,.55,1.1)}U.tag('el',new V(-2.4,5.2,0),'<b>جبل الفيل · العُلا</b><small>ارتفاعه الحقيقي ٥٢ مترًا</small>');K.fly([2.5,4.2,18.5],[2.6,2.3,0],2);
     U.say('الفتات لا يختفي! تحمله الرياح والسيول بعيدًا (<b>تعرية</b>)… ثم يستقر كثبانًا وطبقات جديدة (<b>ترسيب</b>).');
     U.tools([{ic:'💨',lbl:'أطلق الرياح',fn:function(){windMode=2;U.tween(.6,function(k){sand.material.opacity=.9*k});U.tween(6,function(k){pile.scale.set(1.6*(1-.6*k)+.01,.55*(1-.6*k)+.01,1.1*(1-.6*k)+.01);dune.scale.set(3.6*k+.01,1.3*k+.01,2.6*k+.01)},function(){U.tween(1,function(k){sand.material.opacity=.9*(1-k)});U.tag('dn',new V(11,1.8,1),'<b>كثيب رملي</b><small>من فتات الصخر</small>')})}}])}},
   {name:'سؤال الدرس',g:'اطرح سؤال الدرس، ثم انتقل إلى الدرس.',enter:function(){U.mini();K.fly([-6,3.4,15.5],[0,2.6,0],3);U.fin('سؤال الدرس','هل يبقى جبل الفيل إلى الأبد؟<br><span style="color:var(--c)">كيف تتفتّت الصخور؟ وكيف تنقلها الرياح والماء؟</span>');U.say('التجوية والتعرية لا تتوقفان أبدًا… حتى الآن.')}}
  ],update:function(dt,t){if(Math.abs(st.k-lastK)>.004||(st.wet>0&&Math.random()<.2))build();
    if(orbit){var cp=K.camera.position,a=Math.atan2(cp.x-K._tgt.x,cp.z-K._tgt.z)+orbit,r=Math.hypot(cp.x-K._tgt.x,cp.z-K._tgt.z);cp.x=K._tgt.x+Math.sin(a)*r;cp.z=K._tgt.z+Math.cos(a)*r;K.camera.lookAt(K._tgt);orbit=0}
    deb.forEach(function(m){var u=m.userData;if(!u.on)return;u.v.y-=9.8*dt;m.position.addScaledVector(u.v,dt);m.rotation.x+=dt*4;m.rotation.z+=dt*3;if(m.position.y<.08){m.position.y=.08;u.v.y*=-.3;u.v.x*=.6;u.v.z*=.6;if(Math.abs(u.v.y)<.3){u.on=0;U.wait(2+Math.random()*3,function(){m.visible=false})}}});
    if(sand.material.opacity>0){for(var i=0;i<NS;i++){var d=sD[i],u=(d[0]+t*.12*d[3])%1;if(windMode===2){sP[i*3]=lerp(.5,11,u);sP[i*3+1]=Math.sin(u*Math.PI)*2.2*d[3]+.1;sP[i*3+2]=lerp(1.9,1,u)+d[2]*.4}else{sP[i*3]=lerp(-9,9,u);sP[i*3+1]=d[1]+Math.sin(u*20+i)*.1;sP[i*3+2]=d[2]}}sG.attributes.position.needsUpdate=true}
    if(rain.material.opacity>0){var a2=rG.attributes.position.array;for(i=0;i<NR;i++){var y=a2[i*6+1]-dt*11;if(y<0)y+=10;a2[i*6+1]=y;a2[i*6+4]=y-.4}rG.attributes.position.needsUpdate=true}}};
}};
})();
