/* محرك صفحات الأقسام — منصة دروس العلوم */
(function(){
"use strict";
var P=window.PAGE||{};
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var AR='٠١٢٣٤٥٦٧٨٩'; function n(x){return String(x).replace(/\d/g,function(d){return AR[d]})}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function rnd(seed){var s=seed||7;return function(){s=(s*1103515245+12345)&0x7fffffff;return s/0x7fffffff}}
function shuffle(a,seed){a=a.slice();var r=seed==null?Math.random:rnd(seed);for(var i=a.length-1;i>0;i--){var j=Math.floor(r()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
var KL=['أ','ب','ج','د'];
function toast(m){var t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(function(){t.remove()},2600)}
var SND={ac:null,on:true};
function tone(fs,d,type,v){if(!SND.on)return;try{SND.ac=SND.ac||new(window.AudioContext||window.webkitAudioContext)();var t=SND.ac.currentTime;fs.forEach(function(f,i){var o=SND.ac.createOscillator(),g=SND.ac.createGain();o.type=type||'sine';o.frequency.value=f;g.gain.setValueAtTime(0.0001,t+i*d);g.gain.exponentialRampToValueAtTime(v||0.18,t+i*d+0.02);g.gain.exponentialRampToValueAtTime(0.0001,t+(i+1)*d+0.05);o.connect(g);g.connect(SND.ac.destination);o.start(t+i*d);o.stop(t+(i+1)*d+0.1)})}catch(e){}}
var sfx={ok:function(){tone([660,880],.09,'triangle')},no:function(){tone([220,170],.12,'sawtooth',.08)},win:function(){tone([523,659,784,1046],.11,'triangle')},tick:function(){tone([900],.03,'square',.05)}};
window.KIT={P:P,$:$,$$:$$,n:n,esc:esc,shuffle:shuffle,rnd:rnd,KL:KL,toast:toast,sfx:sfx,SND:SND};
document.documentElement.style.setProperty('--cc',P.color||'#2F7BF6');
document.documentElement.style.setProperty('--cc2',P.color2||'#E8F0FE');

/* ================= ورقة العمل ================= */
function sheet(){
  var L=P.lesson, S=P.sheet, qn=0;
  function blank(w){return '<input class="blank" aria-label="إجابة"'+(w?' style="width:'+w+'"':'')+'>'}
  var h='<div class="bar"><span class="t">ورقة عمل · '+esc(L.title)+'</span><button class="b p" id="pr">🖨 طباعة</button><button class="b" id="an" aria-pressed="false">✓ مفتاح الإجابات</button><button class="b" id="cl">↺ مسح</button></div>';
  h+='<div class="sheetwrap"><div class="zoomer" id="zm"><article class="page" id="pg"><div class="inner" id="inn"><span class="stamp">نموذج الإجابة</span>';
  h+='<header class="hd"><div class="ttl"><span class="kick">ورقة عمل · '+esc(L.chapter)+'</span><h1>'+esc(L.title)+'<small>علوم الأول المتوسط</small></h1></div><div class="badge"><span>الدرس</span><b>'+n(L.no)+'</b><span>'+esc(L.chapterShort)+'</span></div></header>';
  h+='<div class="who"><label>اسم الطالب: <input aria-label="اسم الطالب"></label><label>الفصل: <input aria-label="الفصل"></label><label>التاريخ: <input aria-label="التاريخ"></label><label>الدرجة: <input aria-label="الدرجة"> / '+n(S.total)+'</label></div>';
  h+='<div class="idea"><b>الفكرة</b><span>'+esc(S.idea)+'</span></div>';
  var sn=0; function sec(title,hint,body,extra){sn++;return '<section class="sec'+(extra||'')+'"><h2><i>'+n(sn)+'</i>'+title+(hint?'<em>'+hint+'</em>':'')+'</h2>'+body+'</section>'}
  // المصطلحات
  var tb=shuffle(S.terms.map(function(t){return t.t}),L.no*13+5);
  h+=sec('اكتب المصطلح العلمي المناسب لكل تعريف','('+n(S.terms.length)+' درجات)','<div class="bank">'+tb.map(function(t){return '<span>'+esc(t)+'</span>'}).join('')+'</div><ol class="terms">'+S.terms.map(function(t){return '<li>'+blank()+'<span>'+esc(t.d)+' <span class="ans">← '+esc(t.t)+'</span></span></li>'}).join('')+'</ol>');
  // الاختيار من متعدد
  h+=sec('اختر الإجابة الصحيحة','('+n(S.mcq.length)+' درجات)','<div class="mcq">'+S.mcq.map(function(q){qn++;var lng=q.o.some(function(o){return o.length>26});return '<div class="q"><p><span class="n">'+n(qn)+'.</span>'+esc(q.q)+'</p><div class="opts'+(lng?' one':'')+'">'+q.o.map(function(o,j){return '<button class="opt'+(j===q.a?' ok':'')+'" data-g="m'+qn+'"><span class="k">'+KL[j]+'</span><span>'+esc(o)+'</span></button>'}).join('')+'</div></div>'}).join('')+'</div>');
  // التطبيق
  (S.apply||[]).forEach(function(a){
    var body='';
    if(a.type==='classify'){
      body='<div class="keyrow">'+a.keys.map(function(k,i){return '<span><b>'+esc(a.codes[i])+'</b> = '+esc(k)+'</span>'}).join('')+'</div><ul class="cls">'+a.items.map(function(it){return '<li><span class="box">'+blank()+'</span><span>'+esc(it[0])+' <span class="ans">('+esc(a.codes[it[1]])+')</span></span></li>'}).join('')+'</ul>';
    }else if(a.type==='order'){
      var sh=shuffle(a.items.map(function(t,i){return [t,i]}),31);
      body='<div class="order">'+sh.map(function(x){return '<div><span class="box">'+blank()+'</span><span>'+esc(x[0])+' <span class="ans">('+n(x[1]+1)+')</span></span></div>'}).join('')+'</div>';
    }else if(a.type==='calc'){
      body='<div class="calc">'+a.items.map(function(it,i){return '<div class="crow"><div class="pr"><span class="n">'+n(i+1)+'.</span>'+esc(it.q)+'</div><div class="steps3"><div>المعطيات<textarea aria-label="المعطيات"></textarea></div><div>القانون<textarea aria-label="القانون"></textarea></div><div>الحل والوحدة<textarea aria-label="الحل"></textarea><span class="ans ov">'+esc(it.a)+'</span></div></div></div>'}).join('')+'</div>';
    }else if(a.type==='list'){
      body='<p style="margin:0 0 1mm;font-size:9.4pt;font-weight:700">'+esc(a.q)+'</p><div class="order">'+a.ans.map(function(){return '<div><span style="flex:1">'+blank()+'</span></div>'}).join('')+'</div><span class="ans ov2">من الإجابات: '+esc(a.ans.join('، '))+'</span>';
    }
    h+=sec(esc(a.title),a.hint||'',body);
  });
  // صح أم خطأ / فكّر
  if(S.tf&&S.tf.length){
    h+=sec('ضع علامة ✓ أمام العبارة الصحيحة و ✗ أمام الخاطئة','('+n(S.tf.length)+' درجات)','<ul class="tf">'+S.tf.map(function(t,i){return '<li><span class="pick"><button data-g="t'+i+'" class="'+(t[1]?'ok':'')+'">✓</button><button data-g="t'+i+'" class="'+(t[1]?'':'ok')+'">✗</button></span><span>'+esc(t[0])+(t[1]||!t[2]?'':' <span class="ans">— '+esc(t[2])+'</span>')+'</span></li>'}).join('')+'</ul>');
  }
  if(S.think){
    h+=sec('فكّر وفسّر','(درجتان)','<div class="think"><p>'+esc(S.think.q)+'</p><div class="lines"><textarea aria-label="الإجابة"></textarea><span class="ans ov3">'+esc(S.think.a)+'</span></div></div>');
  }
  // التقويم الذاتي
  h+='<section class="sec"><h2><i>★</i>قيّم نفسك: أستطيع أن…<em class="h" style="display:flex;gap:3.4mm"><span>😀 أتقنت</span><span>🙂 تقريبًا</span><span>🤔 أحتاج مراجعة</span></em></h2><div class="self">'+L.goals.slice(0,S.goalsN||L.goals.length).map(function(g,i){return '<span>'+esc(g.replace(/\.$/,''))+'</span><span class="faces">'+['😀','🙂','🤔'].map(function(f){return '<button data-g="s'+i+'" aria-label="'+f+'">'+f+'</button>'}).join('')+'</span>'}).join('')+'</div></section>';
  h+='<footer class="ft"><span>منصة دروس العلوم التفاعلية · <b>أ. علي طاهر البقاشي</b></span><span>'+esc(L.chapter)+'</span></footer>';
  h+='</div></article></div></div>';
  document.body.innerHTML=h;
  // تفاعل
  document.addEventListener('click',function(e){var b=e.target.closest('button[data-g]');if(!b)return;var g=b.dataset.g;$$('button[data-g="'+g+'"]').forEach(function(x){x.classList.toggle('on',x===b&&!x.classList.contains('on'))});});
  $('#pr').onclick=function(){window.print()};
  $('#an').onclick=function(){var on=document.body.classList.toggle('show-ans');this.setAttribute('aria-pressed',on)};
  $('#cl').onclick=function(){$$('input,textarea').forEach(function(i){i.value=''});$$('.on').forEach(function(x){x.classList.remove('on')});toast('مُسحت الإجابات')};
  function fit(){var zm=$('#zm'),pg=$('#pg');var k=Math.min(1.25,(window.innerWidth-24)/pg.offsetWidth);zm.style.zoom=k}
  /* ضمان صفحة واحدة: تصغير المحتوى قليلًا عند الحاجة */
  function shrink(){var inn=$('#inn'),pg=$('#pg'),z=1;inn.style.zoom=1;inn.style.width='';inn.style.minHeight='0';var room=pg.clientHeight-parseFloat(getComputedStyle(pg).paddingTop)-parseFloat(getComputedStyle(pg).paddingBottom);
    while(inn.scrollHeight*z>room+1&&z>0.7){z-=0.01;inn.style.zoom=z;}
    inn.style.minHeight=(room/z)+'px';window.__z=z}
  addEventListener('resize',fit);fit();
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(shrink);shrink();
  window.__fit=function(){var pg=$('#pg'),inn=$('#inn');return {z:window.__z,ih:Math.round(inn.scrollHeight*window.__z),room:pg.clientHeight}};
}

if(P.mode==='sheet') sheet();
else if(window.KIT_MODES&&window.KIT_MODES[P.mode]) window.KIT_MODES[P.mode](window.KIT);
})();
