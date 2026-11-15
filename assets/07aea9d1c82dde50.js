
/* ===== وحدة الاستراتيجيات العامة (لمحركات الفصل الأول والثالث): شارات المحطات، خطة الدرس، الأدوات الصفية ===== */
(function(){
"use strict";
var E={key:'x',paused:false,ST:{teams:[]}};
E.$=function(s,r){return (r||document).querySelector(s)};E.$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
E.n=function(x){return String(x).replace(/\d/g,function(d){return '٠١٢٣٤٥٦٧٨٩'[d]})};
E.esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
E.h=function(html){var t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstChild};
E.shuffle=function(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a};
E.sfx={pop:function(){},tick:function(){},ok:function(){},no:function(){}};
E.toast=function(m){var t=E.h('<div style="position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;background:#2a1a5e;color:#fff;padding:10px 22px;border-radius:999px;font:700 18px inherit">'+m+'</div>');document.body.appendChild(t);setTimeout(function(){t.remove()},2400)};
var $=E.$,$$=E.$$,n=E.n,esc=E.esc,h=E.h;
/* شكل فن مبسط: المس العبارة ثم المس مكانها */
E.sort=function(el,o){var sel=null,ok=0;el.innerHTML='<div class="cmbank" style="margin-bottom:10px">'+E.shuffle(o.items.map(function(x,i){return i})).map(function(i){return '<span data-i="'+i+'">'+o.items[i].t+'</span>'}).join('')+'</div><div style="display:grid;grid-template-columns:repeat('+o.bins.length+',1fr);gap:10px">'+o.bins.map(function(b,i){return '<div data-b="'+i+'" style="border:2px dashed #b9a9ef;border-radius:14px;min-height:120px;padding:8px;cursor:pointer"><b style="display:block;text-align:center;color:#4a249e;margin-bottom:6px">'+b+'</b></div>'}).join('')+'</div><p class="skfb" style="margin:8px 0 0;font-size:17px"></p>';
  E.$$('.cmbank span',el).forEach(function(s){s.onclick=function(){E.$$('.cmbank span',el).forEach(function(z){z.classList.remove('sel')});sel=s;s.classList.add('sel');E.sfx.pop()}});
  E.$$('[data-b]',el).forEach(function(b){b.onclick=function(){if(!sel)return;var it=o.items[+sel.dataset.i];if(it.b===+b.dataset.b){b.appendChild(E.h('<div style="background:#e6f4ea;border-radius:10px;padding:5px 8px;margin:4px 0;font-size:17px">'+it.t+'</div>'));sel.remove();sel=null;ok++;E.sfx.ok();if(ok===o.items.length)E.$('.skfb',el).innerHTML='<b style="color:#16a34a">✔ أحسنتم! '+(o.ex||'')+'</b>'}else{E.sfx.no();E.$('.skfb',el).innerHTML='<b style="color:#e2483d">✗ فكّروا مرة أخرى في مكان هذه العبارة.</b>'}}})};
var CSS='\
.stgs{display:inline-flex;gap:6px;margin-inline-start:12px;flex-wrap:wrap}\
.stg{border:0;border-radius:999px;padding:5px 14px 5px 12px;font:700 15px/1.2 var(--disp,inherit);color:#fff;background:linear-gradient(135deg,#7c4ee6,#5a2fc0);box-shadow:0 3px 0 #3c1d8f,0 0 0 2px rgba(255,255,255,.25);cursor:pointer;display:inline-flex;gap:6px;align-items:center;white-space:nowrap}\
.stg:hover{filter:brightness(1.1)}.stg.c2{background:linear-gradient(135deg,#14b083,#0b7a5a);box-shadow:0 3px 0 #075940}.stg.c3{background:linear-gradient(135deg,#f0a400,#c47f00);box-shadow:0 3px 0 #8a5a00}\
.sgo{position:fixed;inset:0;z-index:99990;background:rgba(10,8,30,.6);display:grid;place-items:center;opacity:0;transition:opacity .2s}.sgo.on{opacity:1}\
.sgb{width:1380px;max-width:96vw;max-height:820px;zoom:var(--skz,1);display:flex;flex-direction:column;background:#fff;color:#1d1a33;border-radius:30px;box-shadow:0 30px 80px rgba(0,0,0,.45);overflow:hidden;font-family:var(--body,inherit);transform:scale(.96);transition:transform .25s}.sgo.on .sgb{transform:none}\
.sgh{display:flex;align-items:center;gap:16px;padding:18px 28px;background:linear-gradient(120deg,#2a1a5e,#5a2fc0);color:#fff}.sgh .ic{font-size:44px}.sgh h2{margin:0;font:700 34px/1.2 var(--disp,inherit);color:#fff}.sgh small{display:block;font-size:17px;color:#d8cdfa}.sgh .x{margin-inline-start:auto;border:0;width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.15);color:#fff;font-size:24px;cursor:pointer}\
.sgc{padding:18px 28px;overflow:auto;display:flex;flex-direction:column;gap:14px}\
.sgrow{display:flex;gap:16px;align-items:stretch}.sgcol{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px}\
.sgk{background:#f6f3ff;border:2px solid #e3dbfb;border-radius:20px;padding:14px 18px}.sgk h3{margin:0 0 8px;font:700 22px var(--disp,inherit);color:#4a249e}\
.sgk ol{margin:0;padding-inline-start:26px;font-size:19px;line-height:1.75}.sgk p{margin:0;font-size:19px;line-height:1.7}\
.sgch{display:flex;gap:8px;flex-wrap:wrap}.sgch span{background:#fff;border:2px solid #d9cff8;border-radius:999px;padding:4px 14px;font-size:16px;color:#3b2a7a}\
.sgbtn{border:0;border-radius:999px;padding:10px 22px;font:700 19px var(--disp,inherit);background:linear-gradient(135deg,#7c4ee6,#5a2fc0);color:#fff;box-shadow:0 4px 0 #3c1d8f;cursor:pointer}.sgbtn.g{background:#fff;color:#3b2a7a;border:2px solid #d9cff8;box-shadow:0 3px 0 #e3dbfb}.sgbtn.o{background:linear-gradient(135deg,#14b083,#0b7a5a);box-shadow:0 4px 0 #075940}.sgbtn.y{background:linear-gradient(135deg,#ffcb4d,#f0a400);color:#3a2600;box-shadow:0 4px 0 #b77a00}\
.sgacts{display:flex;gap:10px;flex-wrap:wrap;align-items:center}\
.sgw{background:#fff;border:2px solid #e3dbfb;border-radius:20px;padding:14px 18px}.sgw h3{margin:0 0 10px;font:700 22px var(--disp,inherit);color:#4a249e}\
.rv{display:none}.rv.on{display:block;animation:sgIn .3s}@keyframes sgIn{from{opacity:0;transform:translateY(6px)}}\
.sgans{margin-top:6px;background:#e9f8f1;border-inline-start:5px solid #0f9a72;border-radius:10px;padding:8px 12px;font-size:18px;line-height:1.6}\
.jg{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.jgc{border-radius:18px;border:3px solid var(--tc);background:#fff;padding:12px;display:flex;flex-direction:column;gap:6px}.jgc .tm{background:var(--tc);color:#fff;border-radius:12px;padding:4px 10px;font:700 17px var(--disp,inherit);text-align:center}.jgc b{font:700 22px var(--disp,inherit);text-align:center}.jgc p{margin:0;font-size:17px;line-height:1.65}\
.fr{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;position:relative}.frq{border:2px solid #d9cff8;border-radius:18px;padding:12px 16px 40px;background:#fbf9ff;cursor:pointer;min-height:150px}.frq:nth-child(n+3){padding:40px 16px 12px;display:flex;flex-direction:column-reverse;justify-content:flex-end}.frq h4{margin:0 0 6px;font:700 20px var(--disp,inherit);color:#5a2fc0}.frq .t{font-size:19px;line-height:1.65}.frq .t.h{color:#b3a9d6}\
.frc{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#7c4ee6,#5a2fc0);color:#fff;border-radius:999px;padding:16px 34px;font:700 26px var(--disp,inherit);box-shadow:0 0 0 8px #fff;pointer-events:none}\
.hats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.hat{border-radius:18px;padding:12px 14px;border:3px solid var(--hc);background:#fff;cursor:pointer}.hat b{display:flex;gap:8px;align-items:center;font:700 20px var(--disp,inherit)}.hat b i{width:34px;height:34px;border-radius:50%;background:var(--hc);display:inline-block;box-shadow:inset 0 -4px 0 rgba(0,0,0,.2)}.hat p{margin:6px 0 0;font-size:17px;line-height:1.6}\
.kwl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.kwc{border-radius:18px;border:2px solid var(--kc);background:#fff;display:flex;flex-direction:column;min-height:330px}.kwc h4{margin:0;padding:10px;text-align:center;background:var(--kc);color:#fff;font:700 22px var(--disp,inherit);border-radius:15px 15px 0 0}.kwc ul{list-style:none;margin:0;padding:10px;display:flex;flex-direction:column;gap:6px;flex:1;overflow:auto}.kwc li{background:#f6f3ff;border-radius:10px;padding:6px 10px;font-size:18px;display:flex;gap:8px;align-items:center}.kwc li button{margin-inline-start:auto;border:0;background:none;color:#a39bc6;cursor:pointer;font-size:16px}.kwc form{display:flex;gap:6px;padding:8px}.kwc input{flex:1;min-width:0;border:2px solid #e3dbfb;border-radius:10px;padding:8px;font:inherit;font-size:17px}.kwc.dim{opacity:.45}\
.cm{display:flex;flex-direction:column;align-items:center;gap:12px}.cmr{display:flex;gap:40px;justify-content:center}.cmn{border:2px solid #b9a9ef;background:#fff;border-radius:14px;padding:8px 14px;font:700 18px var(--disp,inherit);min-width:150px;text-align:center}.cmn.root{background:linear-gradient(135deg,#7c4ee6,#5a2fc0);color:#fff;font-size:22px;border:0}.cmn.br{background:#efe9ff;color:#4a249e;font-size:20px}.cmn.bl{border-style:dashed;color:#a39bc6;cursor:pointer;min-width:170px}.cmn.bl.f{border-style:solid;color:#1d1a33}.cmn.bl.ok{border-color:#16a34a;background:#e6f4ea}.cmn.bl.no{border-color:#e2483d;background:#fbe9e7}.cmcol{display:flex;flex-direction:column;gap:8px;align-items:center}.cmbank{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.cmbank span{border:2px solid #d9cff8;border-radius:10px;padding:6px 12px;background:#fff;font:700 17px var(--disp,inherit);cursor:pointer}.cmbank span.sel{outline:4px solid #f5b52e}.cmbank span.used{opacity:.3;pointer-events:none}\
.tl{display:flex;flex-direction:column;gap:10px}.tlr{display:grid;grid-template-columns:1fr 150px 150px 150px;gap:10px;align-items:center;background:#faf8ff;border:2px solid #ece6fb;border-radius:16px;padding:8px 12px}.tlr .g{font-size:18px;line-height:1.5}.tlb{border:0;border-radius:14px;padding:8px;font:700 18px var(--disp,inherit);cursor:pointer;color:#fff;display:flex;justify-content:space-between;align-items:center}.tlb.g1{background:#16a34a}.tlb.g2{background:#e6a100}.tlb.g3{background:#e2483d}.tlbar{grid-column:1/-1;height:10px;border-radius:6px;overflow:hidden;display:flex;background:#eee}\
.poe{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.poe>div{border-radius:18px;border:2px solid #e3dbfb;padding:12px 14px}.poe h4{margin:0 0 6px;font:700 22px var(--disp,inherit)}\
.pvo{display:flex;align-items:center;gap:8px;border:2px solid #e3dbfb;border-radius:12px;padding:6px 10px;margin-top:6px;font-size:18px}.pvo b{min-width:36px;text-align:center;font-family:var(--disp,inherit)}.pvo button{border:2px solid #d9cff8;background:#fff;border-radius:8px;width:34px;height:30px;cursor:pointer;font-weight:800}\
.sgbig{font:800 120px/1 var(--disp,inherit);color:#5a2fc0;text-align:center;margin:10px 0}.bigname{font:800 72px/1.2 var(--disp,inherit);color:#5a2fc0;text-align:center;min-height:100px;margin:10px 0}\
.tps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.tpsp{border-radius:20px;border:3px solid #e3dbfb;padding:14px;text-align:center}.tpsp.on{border-color:#7c4ee6;background:#f3edff;box-shadow:0 0 0 5px rgba(124,78,230,.15)}.tpsp.dn{opacity:.5}.tpsp .e{font-size:46px}.tpsp b{display:block;font:700 26px var(--disp,inherit)}.tpsp input{width:70px;border:2px solid #e3dbfb;border-radius:8px;padding:4px;text-align:center;font:inherit}\
.stp table{width:100%;border-collapse:separate;border-spacing:0;font-size:17px;border-radius:16px;overflow:hidden;border:2px solid var(--line2,#d9cff8)}.stp th{background:linear-gradient(120deg,#2a1a5e,#5a2fc0);color:#fff;font-family:var(--disp,inherit);padding:9px 8px;font-weight:700}.stp td{padding:8px;border-top:1px solid var(--line,#e3dbfb);background:var(--panel,#fff);color:var(--ink,inherit);text-align:center}.stp tr{cursor:pointer}.stp tr:hover td{filter:brightness(1.08)}.stp td.s{text-align:start}.stp .pill{display:inline-block;border-radius:999px;padding:2px 10px;margin:2px;font-size:15px;color:#fff;background:#6c3fd1}\
#sgfab{color:#fff!important;background:linear-gradient(135deg,#7c4ee6,#5a2fc0)!important;border-color:transparent!important;font-weight:700}\
';
var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);

/* ===== دليل الاستراتيجيات ===== */
var CAT={
 kwl:{n:'جدول التعلم KWL',ic:'📋',why:'ينشّط المعرفة السابقة، ويوجّه أسئلة الطلاب، ويقيس ما تعلموه في الختام.',steps:['يسجّل الطلاب ما يعرفونه عن الموضوع (K).','يكتبون ما يريدون معرفته (W).','في نهاية الدرس يكملون عمود ماذا تعلمت (L) ويقارنونه بالعمودين الأولين.'],time:'٣–٥ دقائق',role:'يستدعي معرفته ويصوغ أسئلته'},
 brain:{n:'العصف الذهني',ic:'🌩',why:'يولّد أكبر عدد من الأفكار دون نقد، ويكشف التصورات السابقة.',steps:['يطرح المعلم السؤال المثير.','يقترح الطلاب أفكارهم بسرعة دون تقييم، ويُختار المتحدث بأعواد المثلجات.','تُصنّف الأفكار وتُناقش بعد انتهاء الجولة.'],time:'٣ دقائق',role:'يقترح الأفكار بحرية'},
 tps:{n:'فكّر، زاوج، شارك',ic:'👥',why:'يمنح كل طالب وقتًا للتفكير الفردي، ثم الحوار مع زميله، ثم المشاركة مع الصف.',steps:['فكّر: يفكر كل طالب منفردًا في السؤال ويدوّن إجابته.','زاوج: يتبادل كل طالبين إجاباتهما ويتفقان على إجابة واحدة.','شارك: يعرض بعض الأزواج إجاباتهم على الصف.'],time:'٣–٤ دقائق',role:'يفكر ثم يحاور ثم يشارك',tool:'tps'},
 poe:{n:'توقّع، لاحظ، فسّر',ic:'🔮',why:'يربط التجربة بتوقعات الطلاب، ويعالج التصورات الخاطئة عندما تخالف الملاحظة التوقع.',steps:['توقّع: يسجّل الطلاب توقعهم قبل التجربة مع السبب.','لاحظ: تُنفذ التجربة (المحاكاة) ويدوّن الطلاب ما حدث.','فسّر: يقارن الطلاب الملاحظة بالتوقع ويفسّرون الفرق.'],time:'٥–٧ دقائق',role:'يتوقع ويلاحظ ويفسر'},
 inq:{n:'التعلم بالاستقصاء',ic:'🔬',why:'يبني الطالب المفهوم بنفسه من خلال التجريب وجمع البيانات.',steps:['طرح سؤال الاستقصاء.','تنفيذ التجربة وتسجيل البيانات في جدول النتائج.','استخلاص الاستنتاج ومقارنته بالكتاب.'],time:'٦–٨ دقائق',role:'يجرب ويسجل ويستنتج'},
 heads:{n:'الرؤوس المرقمة',ic:'🔢',why:'تجعل كل فرد في المجموعة مسؤولًا عن الإجابة، فيشارك الجميع.',steps:['يأخذ كل طالب في المجموعة رقمًا.','يطرح المعلم السؤال وتتشاور المجموعة حتى يتأكد الجميع من الإجابة.','يُسحب رقم عشوائي، فيجيب صاحب الرقم عن مجموعته.'],time:'٣ دقائق',role:'يتعاون ويتحمل مسؤولية الإجابة',tool:'heads'},
 jigsaw:{n:'جيكسو (مجموعات الخبراء)',ic:'🧩',why:'يتقن كل طالب جزءًا ثم يعلّمه لزملائه، فيتكامل الفهم ويتحقق الاعتماد المتبادل.',steps:['تتسلم كل مجموعة بطاقة خبير مختلفة.','تدرس المجموعة بطاقتها دقيقتين وتتفق على أهم فكرة.','يشرح ممثل كل مجموعة بطاقته للصف بالترتيب الزمني.','يكمل الجميع جدول المقارنة في المحطة.'],time:'٨ دقائق',role:'خبير يتعلم ويعلّم'},
 press:{n:'المؤتمر الصحفي (لعب الأدوار)',ic:'🎤',why:'يحوّل التجربة التاريخية إلى حوار حي يعمّق الفهم ويقوّي التواصل.',steps:['يتقمّص طالب شخصية العالِم.','يطرح الزملاء (الصحفيون) الأسئلة المعروضة بالترتيب.','يجيب «العالِم» ثم يُكشف النموذج للتحقق.'],time:'٥ دقائق',role:'عالِم أو صحفي'},
 frayer:{n:'نموذج فراير',ic:'🔲',why:'يعمّق فهم المفهوم من أربع زوايا: التعريف، والخصائص، والأمثلة، واللاأمثلة.',steps:['يُكتب المفهوم في المنتصف.','يقترح الطلاب محتوى كل مربع.','يُكشف المربع للتحقق، ويناقش المعلم اللاأمثلة خاصة.'],time:'٤ دقائق',role:'يحلل المفهوم ويميزه'},
 venn:{n:'المنظّم التخطيطي (شكل فن)',ic:'⭕',why:'ينظم المقارنة بين مفهومين ويُظهر أوجه الشبه والاختلاف.',steps:['يقرأ الطلاب البطاقات.','يضعون كل بطاقة في «الأول فقط» أو «مشترك» أو «الثاني فقط».','يتحققون ويصوغون جملة مقارنة.'],time:'٤ دقائق',role:'يقارن وينظم'},
 game:{n:'التعلم باللعب',ic:'🎮',why:'يزيد الدافعية ويثبت المفاهيم في جو تنافسي عادل.',steps:['توزيع الطلاب على الفرق.','تطبيق قواعد اللعبة المعروضة بالتساوي بين الفرق.','مناقشة الأخطاء بعد كل جولة.'],time:'٨–١٠ دقائق',role:'ينافس ويتعاون'},
 coop:{n:'التعلم التعاوني',ic:'🤝',why:'يتعلم الطلاب في مجموعات صغيرة بأدوار محددة، فيتبادلون الخبرات.',steps:['توزيع الأدوار: قائد، كاتب، متحدث، مراقب وقت.','تنفيذ المهمة في المجموعة.','عرض الناتج وتقويم الأقران.'],time:'٥–٨ دقائق',role:'عضو فاعل بدور محدد'},
 disc:{n:'التعلم بالاكتشاف',ic:'🧭',why:'يكتشف الطالب العلاقات والقواعد بنفسه قبل أن تُقدَّم له.',steps:['يتأمل الطلاب الأمثلة المعروضة.','يبحثون عن النمط أو القاعدة.','يصوغون القاعدة بلغتهم ثم تُقارن بالكتاب.'],time:'٥ دقائق',role:'يكتشف ويستنتج'},
 story:{n:'القصة العلمية',ic:'📖',why:'تقدم تطور المفهوم في سياق تاريخي مشوّق يربط العلم بالعلماء.',steps:['تُعرض القصة بالتسلسل الزمني.','يتوقف المعلم عند كل محطة: ما المشكلة؟ وكيف حُلت؟','يرتب الطلاب الأحداث في النهاية.'],time:'٥ دقائق',role:'يستمع ويحلل ويرتب'},
 prob:{n:'حل المشكلات',ic:'🧠',why:'ينمّي التفكير المنطقي باتباع خطوات منظمة: المعطيات ثم القانون ثم الحل.',steps:['تحديد المعطيات والمطلوب.','اختيار القانون أو العلاقة المناسبة.','التعويض والحل والتحقق من المعقولية.'],time:'٤ دقائق',role:'يحلل ويحسب ويتحقق'},
 sticks:{n:'أعواد المثلجات',ic:'🍡',why:'اختيار عشوائي عادل يجعل كل طالب مستعدًا للإجابة.',steps:['يطرح المعلم السؤال أولًا.','يمنح وقت تفكير قصيرًا.','يسحب اسمًا عشوائيًّا ليجيب.'],time:'دقيقة',role:'مستعد دائمًا للمشاركة',tool:'sticks'},
 analogy:{n:'التشبيه (المماثلة)',ic:'🔗',why:'يربط المفهوم المجرد بخبرة مألوفة ثم يحدد حدود التشبيه.',steps:['يُعرض الشيء المألوف.','تُطابق أجزاؤه مع أجزاء المفهوم العلمي.','يحدد الطلاب أين يختلف التشبيه عن الحقيقة.'],time:'٤ دقائق',role:'يربط ويقارن'},
 role:{n:'لعب الأدوار',ic:'🎭',why:'يجسّد الطلاب العملية العلمية بحركتهم فتترسخ مراحلها.',steps:['توزيع الأدوار على الطلاب.','تنفيذ كل مرحلة بالحركة حسب البطاقة المعروضة.','يسمي الصف المرحلة بعد كل حركة.'],time:'٦ دقائق',role:'يمثل جزءًا من العملية'},
 cmap:{n:'خريطة المفاهيم',ic:'🗺',why:'تنظم المفاهيم وعلاقاتها في بنية هرمية واضحة.',steps:['تُعرض الخريطة وفيها فراغات.','يختار الطلاب المفهوم المناسب لكل فراغ.','يتحققون ويقرؤون الخريطة كاملة بجمل.'],time:'٥ دقائق',role:'ينظم ويربط'},
 hot:{n:'الكرسي الساخن',ic:'🪑',why:'يجلس طالب في دور «المفهوم» ويجيب عن أسئلة زملائه، فيُظهر عمق فهمه.',steps:['يجلس طالب على الكرسي الساخن متقمّصًا دور المفهوم.','يسأله زملاؤه من البطاقات أو من عندهم.','يُكشف الجواب النموذجي بعد كل إجابة للتحقق.'],time:'٥ دقائق',role:'يجيب بلسان المفهوم أو يسأل'},
 hats:{n:'القبعات الست',ic:'🎩',why:'تنظم التفكير في القضية من ست زوايا مختلفة.',steps:['تُوزع القبعات على المجموعات.','تفكر كل مجموعة من زاوية قبعتها.','تعرض المجموعات بالترتيب، ثم تلخص القبعة الزرقاء.'],time:'٦ دقائق',role:'يفكر من زاوية محددة'},
 crit:{n:'التفكير الناقد: اكتشف الخطأ',ic:'🕵',why:'يقوّم الطالب العبارات ويصحح الخطأ العلمي بالدليل.',steps:['تُعرض العبارة.','يحدد الطلاب الجزء الخاطئ.','يصححونه ويذكرون الدليل.'],time:'٣ دقائق',role:'يقوّم ويصحح'},
 tl:{n:'التقويم الذاتي: إشارة المرور',ic:'🚦',why:'يقيّم الطالب مستوى إتقانه لكل هدف، فيعرف المعلم ما يحتاج إلى مراجعة.',steps:['يقرأ المعلم كل هدف.','يرفع الطلاب البطاقة: أخضر أتقنت، أصفر أحتاج مراجعة، أحمر لم أفهم.','يسجل المعلم العدد ويقرر ما يعيد شرحه.'],time:'٣ دقائق',role:'يقيّم نفسه بصدق'},
 exit:{n:'بطاقة الخروج',ic:'🎟',why:'تقويم ختامي سريع يقيس تحقق الأهداف قبل مغادرة الحصة.',steps:['يجيب الطلاب عن أسئلة البطاقة.','تُعرض الإجابات ويناقش المعلم الأخطاء الشائعة.'],time:'٣ دقائق',role:'يجيب فرديًّا'}
};
E.STRAT=CAT;var CFGS={};

function ov(title,sub,ic,body){var o=h('<div class="sgo"><div class="sgb"><div class="sgh"><span class="ic">'+ic+'</span><div><h2>'+title+'</h2><small>'+(sub||'')+'</small></div><button class="x" aria-label="إغلاق">✕</button></div><div class="sgc"></div></div></div>');document.body.appendChild(o);o.style.setProperty('--skz',Math.min(1,innerWidth/1420,innerHeight/860).toFixed(3));var c=$('.sgc',o);if(typeof body==='string')c.innerHTML=body;requestAnimationFrame(function(){o.classList.add('on')});
  function close(){o.classList.remove('on');if(o._stop)o._stop();setTimeout(function(){o.remove()},220)}$('.x',o).onclick=close;o.addEventListener('click',function(e){if(e.target===o)close()});E.sfx.pop();return {o:o,c:c,close:close}}
function cardHTML(k){var s=CAT[k];return '<div class="sgk"><h3>💡 لماذا هذه الاستراتيجية؟</h3><p>'+s.why+'</p></div><div class="sgk"><h3>👣 خطوات التنفيذ</h3><ol>'+s.steps.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ol></div><div class="sgch"><span>⏱ الزمن: '+s.time+'</span><span>🧑‍🎓 دور الطالب: '+s.role+'</span></div>'}
function key(){return 'strat-'+(E.key||'x')}
function load(k,d){try{var v=JSON.parse(localStorage.getItem(key()+'-'+k)||'null');return v==null?d:v}catch(e){return d}}
function store(k,v){try{localStorage.setItem(key()+'-'+k,JSON.stringify(v))}catch(e){}}

/* ===== نافذة الاستراتيجية ===== */
function openStrat(k,row,lid){var s=CAT[k],O=ov(s.ic+' '+s.n,'الاستراتيجية المطبقة في هذه المحطة'+(row&&row.g?' · الهدف '+row.g:''),'🎓','');var c=O.c;
  var w=row&&row.w&&row.w[k];if(w){c.innerHTML='<div id="sgW"></div><div class="sgrow"><div class="sgcol"><div class="sgk"><h3>💡 لماذا هذه الاستراتيجية؟</h3><p>'+s.why+'</p></div></div><div class="sgcol"><div class="sgk"><h3>👣 خطوات التنفيذ</h3><ol>'+s.steps.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ol></div></div><div class="sgcol" style="flex:.7"><div class="sgch"><span>⏱ الزمن: '+s.time+'</span><span>🧑‍🎓 دور الطالب: '+s.role+'</span></div><div class="sgacts" id="sga"></div></div></div>'}
  else c.innerHTML='<div class="sgrow"><div class="sgcol">'+cardHTML(k)+'<div class="sgacts" id="sga"></div></div></div>';
  var A=$('#sga',c);
  if(s.tool||k==='brain'||k==='heads'||k==='coop'){A.insertAdjacentHTML('beforeend','<button class="sgbtn y" data-t="sticks">🍡 اختر طالبًا عشوائيًّا</button>')}
  if(s.tool==='tps')A.insertAdjacentHTML('beforeend','<button class="sgbtn" data-t="tps">⏱ ابدأ مؤقت فكّر-زاوج-شارك</button>');
  if(s.tool==='heads'||k==='coop')A.insertAdjacentHTML('beforeend','<button class="sgbtn o" data-t="heads">🔢 اسحب رقمًا</button>');
  A.insertAdjacentHTML('beforeend','<button class="sgbtn g" data-close>متابعة المحطة ←</button>');
  $$('[data-t]',A).forEach(function(b){b.onclick=function(){TOOLS[b.dataset.t]()}});$('[data-close]',A).onclick=O.close;
  if(w)W[w.type]($('#sgW',c),w,lid,O)}
E.openStrat=openStrat;

/* ===== أنشطة الاستراتيجيات ===== */
var W={};
W.kwl=function(el,w,lid){var D=load('kwl-'+lid,{K:[],W:[],L:[]});var C=[['K','ماذا أعرف؟','#1f84cc'],['W','ماذا أريد أن أعرف؟','#e6a100'],['L','ماذا تعلمت؟','#0f9a72']];
  el.innerHTML='<div class="sgw"><h3>📋 لوحة KWL للصف'+(w.topic?': '+w.topic:'')+'</h3><div class="kwl">'+C.map(function(x){return '<div class="kwc'+(w.phase==='kw'&&x[0]==='L'?' dim':'')+'" style="--kc:'+x[2]+'" data-c="'+x[0]+'"><h4>'+x[0]+' · '+x[1]+'</h4><ul></ul><form><input placeholder="اكتب فكرة الطالب ثم اضغط إضافة"><button class="sgbtn" style="padding:6px 14px;font-size:16px">＋</button></form></div>'}).join('')+'</div><p style="margin:8px 0 0;font-size:16px;color:#6b6590">'+(w.phase==='kw'?'املأ العمودين الأولين الآن، وسنكمل «ماذا تعلمت؟» في ختام الدرس.':'أكمل عمود «ماذا تعلمت؟»، ثم قارن بأسئلة عمود «ماذا أريد أن أعرف؟».')+'</p></div>';
  function draw(){C.forEach(function(x){var ul=$('[data-c="'+x[0]+'"] ul',el);ul.innerHTML=D[x[0]].map(function(t,i){return '<li>• '+esc(t)+'<button data-i="'+i+'" aria-label="حذف">✕</button></li>'}).join('')||'<li style="background:none;color:#b3a9d6">—</li>';$$('button[data-i]',ul).forEach(function(b){b.onclick=function(){D[x[0]].splice(+b.dataset.i,1);store('kwl-'+lid,D);draw()}})})}
  $$('.kwc',el).forEach(function(col){$('form',col).onsubmit=function(e){e.preventDefault();var i=$('input',col),v=i.value.trim();if(!v)return;D[col.dataset.c].push(v);i.value='';store('kwl-'+lid,D);draw();E.sfx.pop()}});
  if(w.seed&&!D.K.length&&!D.W.length){}draw()};
W.jigsaw=function(el,w){var T=E.ST.teams;el.innerHTML='<div class="sgw"><h3>🧩 بطاقات الخبراء: لكل فريق بطاقة</h3><div class="jg">'+w.cards.map(function(c,i){var t=T[i%T.length];return '<div class="jgc" style="--tc:'+t.c+'"><div class="tm">'+esc(t.n)+'</div><b>'+c.ic+' '+c.n+'</b><div class="rv" data-i="'+i+'"><p>'+c.t+'</p></div><button class="sgbtn g" data-o="'+i+'" style="font-size:16px;padding:6px 12px">اكشف البطاقة</button></div>'}).join('')+'</div>'+(w.after?'<p style="margin:10px 0 0;font-size:17px;color:#4a249e"><b>بعد العرض:</b> '+w.after+'</p>':'')+'</div>';
  $$('[data-o]',el).forEach(function(b){b.onclick=function(){$('.rv[data-i="'+b.dataset.o+'"]',el).classList.add('on');b.remove();E.sfx.pop()}})};
W.qa=function(el,w){el.innerHTML='<div class="sgw"><h3>'+(w.title||'🎤 أسئلة الحوار')+'</h3>'+(w.intro?'<p style="margin:0 0 8px;font-size:18px">'+w.intro+'</p>':'')+'<div style="display:flex;flex-direction:column;gap:8px">'+w.items.map(function(q,i){return '<div style="border:2px solid #ece6fb;border-radius:14px;padding:8px 12px"><div style="display:flex;gap:10px;align-items:center"><b style="width:34px;height:34px;border-radius:50%;background:#7c4ee6;color:#fff;display:grid;place-items:center;flex:0 0 34px">'+n(i+1)+'</b><span style="flex:1;font-size:19px;font-weight:600">'+q[0]+'</span><button class="sgbtn g" data-a="'+i+'" style="font-size:15px;padding:5px 12px">الجواب</button></div><div class="rv sgans" data-r="'+i+'">'+q[1]+'</div></div>'}).join('')+'</div></div>';
  $$('[data-a]',el).forEach(function(b){b.onclick=function(){$('[data-r="'+b.dataset.a+'"]',el).classList.toggle('on');E.sfx.pop()}})};
W.frayer=function(el,w){var Q=[['التعريف',w.def],['الخصائص',w.ch],['أمثلة',w.ex],['ليست أمثلة',w.non]];
  el.innerHTML='<div class="sgw"><h3>🔲 نموذج فراير: المس كل مربع لكشفه</h3><div class="fr">'+Q.map(function(q,i){return '<div class="frq" data-i="'+i+'"><h4>'+q[0]+'</h4><div class="t h">؟ اقترحوا الإجابة ثم المسوا للكشف</div></div>'}).join('')+'<div class="frc">'+w.term+'</div></div></div>';
  $$('.frq',el).forEach(function(b){b.onclick=function(){var t=$('.t',b);t.classList.remove('h');t.innerHTML=Q[+b.dataset.i][1];E.sfx.pop()}})};
W.venn=function(el,w){el.innerHTML='<div class="sgw"><h3>⭕ قارن: '+w.a+' و'+w.b+'</h3><div style="display:flex;justify-content:center;align-items:center;gap:14px;margin-bottom:6px"><b style="font:700 22px var(--disp,inherit);color:#155c90">'+w.a+'</b><svg viewBox="0 0 280 120" width="280" height="110"><circle cx="175" cy="60" r="56" fill="rgba(31,132,204,.22)" stroke="#1f84cc" stroke-width="3"/><circle cx="105" cy="60" r="56" fill="rgba(226,62,100,.22)" stroke="#e23e64" stroke-width="3"/><text x="140" y="66" font-size="15" font-weight="700" text-anchor="middle" fill="#4a249e">مشترك</text></svg><b style="font:700 22px var(--disp,inherit);color:#a3284a">'+w.b+'</b></div><div id="vs"></div></div>';
  E.sort($('#vs',el),{id:w.id,goal:w.goal||1,lvl:2,kind:'شكل فن',q:'ضعوا كل عبارة في مكانها:',bins:[w.a+' فقط','مشترك بينهما',w.b+' فقط'],items:w.items.map(function(x){return {t:x[0],b:x[1]}}),ex:w.ex||''})};
W.poe=function(el,w){var v=w.o.map(function(){return 0});el.innerHTML='<div class="sgw"><h3>🔮 '+w.q+'</h3><div class="poe"><div style="border-color:#1f84cc"><h4 style="color:#155c90">١. توقّع</h4>'+w.o.map(function(x,i){return '<div class="pvo"><span style="flex:1">'+x+'</span><b data-v="'+i+'">٠</b><button data-i="'+i+'" data-d="-1">−</button><button data-i="'+i+'" data-d="1">+</button></div>'}).join('')+'<p style="margin:6px 0 0;font-size:15px;color:#6b6590">سجّل عدد الطلاب لكل توقع.</p></div><div style="border-color:#e6a100"><h4 style="color:#9a6a00">٢. لاحظ</h4><p style="font-size:18px;line-height:1.7;margin:0">'+w.obs+'</p></div><div style="border-color:#0f9a72"><h4 style="color:#0b6e52">٣. فسّر</h4><button class="sgbtn o" data-e style="font-size:16px">اكشف التفسير</button><div class="rv sgans" id="pe">'+w.exp+'</div></div></div></div>';
  $$('[data-d]',el).forEach(function(b){b.onclick=function(){var i=+b.dataset.i;v[i]=Math.max(0,v[i]+(+b.dataset.d));$('[data-v="'+i+'"]',el).textContent=n(v[i]);E.sfx.tick()}});$('[data-e]',el).onclick=function(){$('#pe',el).classList.add('on');E.sfx.pop()}};
W.hats=function(el,w){var H=[['#f2f2f2','الأبيض','الحقائق والمعلومات'],['#e23e64','الأحمر','المشاعر'],['#2b2b2b','الأسود','السلبيات والمخاطر'],['#f5c400','الأصفر','الإيجابيات والفوائد'],['#16a34a','الأخضر','الإبداع والحلول'],['#1f84cc','الأزرق','التنظيم والتلخيص']];
  el.innerHTML='<div class="sgw"><h3>🎩 القضية: '+w.topic+'</h3><div class="hats">'+H.map(function(x,i){return '<div class="hat" style="--hc:'+x[0]+'" data-i="'+i+'"><b><i></i>القبعة '+x[1]+' · <small style="font-weight:600;color:#6b6590">'+x[2]+'</small></b><p>'+w.q[i]+'</p><div class="rv sgans" data-r="'+i+'">'+w.a[i]+'</div></div>'}).join('')+'</div><p style="margin:8px 0 0;font-size:15px;color:#6b6590">المس القبعة لكشف إجابة نموذجية بعد عرض المجموعة.</p></div>';
  $$('.hat',el).forEach(function(b){b.onclick=function(){$('[data-r]',b).classList.toggle('on');E.sfx.pop()}})};
W.analogy=function(el,w){el.innerHTML='<div class="sgw"><h3>🔗 '+w.title+'</h3><table style="width:100%;border-collapse:collapse;font-size:18px">'+'<tr><th style="background:#efe9ff;padding:8px;border-radius:10px 0 0 0">'+(w.h1||'في الخلية')+'</th><th style="background:#efe9ff;padding:8px">'+(w.h2||'يشبه')+'</th></tr>'+w.pairs.map(function(p,i){return '<tr><td style="padding:8px;border-bottom:1px solid #ece6fb"><b>'+p[0]+'</b></td><td style="padding:8px;border-bottom:1px solid #ece6fb"><span class="rv" data-r="'+i+'">'+p[1]+'</span><button class="sgbtn g" data-a="'+i+'" style="font-size:14px;padding:4px 10px">اكشف</button></td></tr>'}).join('')+'</table><div class="sgk" style="margin-top:10px"><h3>⚠ حدود التشبيه</h3><p>'+w.limit+'</p></div></div>';
  $$('[data-a]',el).forEach(function(b){b.onclick=function(){$('[data-r="'+b.dataset.a+'"]',el).classList.add('on');b.remove();E.sfx.pop()}})};
W.steps=function(el,w){var k=0;el.innerHTML='<div class="sgw"><h3>'+w.title+'</h3>'+(w.intro?'<p style="margin:0 0 8px;font-size:18px">'+w.intro+'</p>':'')+'<div id="sl" style="display:flex;flex-direction:column;gap:8px"></div><div class="sgacts" style="margin-top:10px"><button class="sgbtn" data-n>الخطوة التالية ←</button></div></div>';
  function nx(){if(k>=w.items.length)return;var x=w.items[k];$('#sl',el).appendChild(h('<div style="display:flex;gap:12px;align-items:center;border:2px solid #ece6fb;border-radius:14px;padding:8px 12px;animation:sgIn .3s"><span style="font-size:34px">'+x[0]+'</span><div><b style="font:700 20px var(--disp,inherit);color:#4a249e">'+x[1]+'</b><div style="font-size:18px;line-height:1.6">'+x[2]+'</div></div></div>'));k++;E.sfx.pop();if(k>=w.items.length)$('[data-n]',el).disabled=true}
  $('[data-n]',el).onclick=nx;nx()};
W.cmap=function(el,w){var sel=null,blanks=[];el.innerHTML='<div class="sgw"><h3>🗺 '+w.title+'</h3><div class="cm"><div class="cmn root">'+w.root+'</div><div class="cmr">'+w.br.map(function(b,bi){return '<div class="cmcol"><div class="cmn br">'+b.n+'</div>'+b.c.map(function(x){var q=x.indexOf('?');return q<0?'<div class="cmn">'+x+'</div>':(q?'<div style="display:flex;gap:6px;align-items:center"><span style="font:700 16px var(--disp,inherit);color:#6b6590">'+x.slice(0,q)+'</span><div class="cmn bl" data-a="'+esc(x.slice(q+1))+'">؟</div></div>':'<div class="cmn bl" data-a="'+esc(x.slice(1))+'">؟</div>')}).join('')+'</div>'}).join('')+'</div><div class="cmbank"></div><div class="sgacts"><button class="sgbtn" data-ck>✓ تحقّق</button><span id="cmf" style="font-size:18px"></span></div></div></div>';
  var words=[];$$('.bl',el).forEach(function(b){words.push(b.dataset.a)});E.shuffle(words).forEach(function(wd){var s=h('<span>'+wd+'</span>');$('.cmbank',el).appendChild(s);s.onclick=function(){$$('.cmbank span',el).forEach(function(z){z.classList.remove('sel')});sel=s;s.classList.add('sel')}});
  $$('.bl',el).forEach(function(b){b.onclick=function(){if(b._s){b._s.classList.remove('used');b._s=null;b.textContent='؟';b.className='cmn bl';return}if(!sel)return;b.textContent=sel.textContent;b._s=sel;sel.classList.add('used');sel.classList.remove('sel');sel=null;b.className='cmn bl f';E.sfx.pop()}});
  $('[data-ck]',el).onclick=function(){var bs=$$('.bl',el);if(bs.some(function(b){return !b._s})){E.toast('أكملوا جميع الفراغات');return}var bad=0;bs.forEach(function(b){var ok=b.textContent===b.dataset.a;b.className='cmn bl f '+(ok?'ok':'no');if(!ok)bad++});$('#cmf',el).innerHTML=bad?'<b style="color:#e2483d">'+n(bad)+' فراغات تحتاج مراجعة</b>':'<b style="color:#16a34a">✔ خريطة صحيحة! اقرؤوها بجمل كاملة.</b>';bad?E.sfx.no():E.sfx.ok()}};
W.tl=function(el,w,lid){var D=load('tl-'+lid,{});el.innerHTML='<div class="sgw"><h3>🚦 قيّم نفسك في كل هدف (سجّل عدد الطلاب)</h3><div class="tl">'+w.goals.map(function(g,i){return '<div class="tlr" data-i="'+i+'"><span class="g">'+n(i+1)+'. '+g+'</span>'+[['g1','🟢 أتقنت'],['g2','🟡 أحتاج مراجعة'],['g3','🔴 لم أفهم']].map(function(c,j){return '<button class="tlb '+c[0]+'" data-j="'+j+'"><span>'+c[1]+'</span><b>٠</b></button>'}).join('')+'<div class="tlbar"></div></div>'}).join('')+'</div><div class="sgacts" style="margin-top:8px"><button class="sgbtn g" data-z>↺ تصفير</button><span style="font-size:15px;color:#6b6590">المس البطاقة لإضافة طالب، وتُحفظ النتائج على هذا الجهاز.</span></div></div>';
  function draw(){$$('.tlr',el).forEach(function(r){var i=r.dataset.i,v=D[i]||[0,0,0],T=v[0]+v[1]+v[2]||1;$$('.tlb b',r).forEach(function(b,j){b.textContent=n(v[j])});$('.tlbar',r).innerHTML=['#16a34a','#e6a100','#e2483d'].map(function(c,j){return '<i style="width:'+(v[j]/T*100)+'%;background:'+c+'"></i>'}).join('')})}
  $$('.tlb',el).forEach(function(b){b.onclick=function(){var i=b.closest('.tlr').dataset.i,v=D[i]||[0,0,0];v[+b.dataset.j]++;D[i]=v;store('tl-'+lid,D);draw();E.sfx.tick()}});$('[data-z]',el).onclick=function(){D={};store('tl-'+lid,D);draw()};draw()};


/* ===== كشف الطلاب الموحّد لكل المنصة (الدروس والأنشطة والمسابقات وأوراق العمل) — durus-classes ===== */
window.DROS = window.DROS || (function () {
  var AR = '٠١٢٣٤٥٦٧٨٩', KEY = 'durus-classes', API = 'https://script.google.com/macros/s/AKfycbxp-t4JgGO5WiK6hoacjTyBqFnG-9bSWClplOpVV4VDuTV7T4tY0swB1Ll36kr_djJ7nQ/exec';
  var LISTS = [['1/1', '2/1', '3/1', '4/1'], ['1/3', '2/3', '3/3', '4/3']];
  function kz(k) { return String(k == null ? '' : k).replace(/\s/g, '').replace(/\d/g, function (d) { return AR[d]; }); }
  function nz(s) { return String(s).replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/\s+بن\s+/g, ' ').replace(/\s+/g, ' ').trim(); }
  function ld() { try { var s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.classes) return { cur: s.cur || '', classes: s.classes || {}, stars: s.stars || {}, moves: s.moves || {} }; } catch (e) {} return { cur: '', classes: {}, stars: {}, moves: {} }; }
  function sv(D) { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) {} }
  function flag(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function findKey(D, k) { var ks = Object.keys(D.classes); for (var i = 0; i < ks.length; i++) if (kz(ks[i]) === kz(k)) return ks[i]; return null; }
  function move(D, nm, from, to) {
    var a = D.classes[from] || [], i = a.indexOf(nm); if (i < 0 || from === to) return false;
    a.splice(i, 1); D.classes[to] = D.classes[to] || []; if (D.classes[to].indexOf(nm) < 0) D.classes[to].push(nm);
    var s1 = D.stars[from + '|' + nm]; if (s1) { D.stars[to + '|' + nm] = (D.stars[to + '|' + nm] || 0) + s1; delete D.stars[from + '|' + nm]; }
    return true;
  }
  // تطبيق عمليات النقل المحفوظة (حتى لا يرجع الطالب لشعبته القديمة عند تحميل الكشوف من جديد)
  function applyMoves(D) {
    var ch = false, rule = !flag('durus-rule-off');
    Object.keys(D.classes).forEach(function (from) {
      (D.classes[from] || []).slice().forEach(function (nm) {
        var to = D.moves[nz(nm)];
        // طلب المعلم: محمد سامي الدليم من ١/١ إلى ٣/١
        if (!to && rule && kz(from) === '١/١') { var z = nz(nm); if (z.indexOf('محمد سامي') === 0 && z.indexOf('الدليم') > 0) to = '٣/١'; }
        if (to) { to = findKey(D, to) || kz(to); if (to !== from && move(D, nm, from, to)) ch = true; }
      });
    });
    return ch;
  }
  // دمج الأسماء التي حُمّلت سابقًا داخل الدروس (مرة واحدة)
  function bootstrap(D) {
    if (flag('durus-roster-merged')) return false; var ch = false;
    LISTS.forEach(function (L) {
      var C = null; try { C = JSON.parse(localStorage.getItem('strat-roster-' + L.join('_') + '-classes') || 'null'); } catch (e) {}
      (C || []).forEach(function (x) { if (x && x.s && x.s.length) { var k = kz(x.n); if (!findKey(D, k)) { D.classes[k] = x.s.slice(); ch = true; } } });
    });
    if (applyMoves(D)) ch = true;
    flag('durus-roster-merged', '1'); return ch;
  }
  function load() { var D = ld(); if (bootstrap(D)) sv(D); if (D.cur && !D.classes[D.cur]) D.cur = Object.keys(D.classes)[0] || ''; if (!D.cur) D.cur = Object.keys(D.classes)[0] || ''; return D; }
  function jsonp(params, cb) {
    var name = 'drosCb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8), sc = document.createElement('script'), fin = false;
    var q = Object.keys(params).map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); }).join('&') + '&callback=' + name + '&_=' + Date.now();
    function end(r) { if (fin) return; fin = true; clearTimeout(t); try { sc.remove(); } catch (e) {} try { delete window[name]; } catch (e) {} cb(r); }
    var t = setTimeout(function () { end(null); }, 30000); window[name] = function (d) { end(d); }; sc.onerror = function () { end(null); }; sc.src = API + '?' + q; document.head.appendChild(sc);
  }
  // تحميل كشوف الفصول من منصة رحلة العلوم لكل الصفوف
  function importAll(cb) {
    var all = LISTS[0].concat(LISTS[1]), G = {}, done = 0, okc = 0;
    all.forEach(function (k) {
      jsonp({ action: 'getStudents', className: k }, function (r) {
        if (r && r.ok) okc++;
        var ok = r && r.ok && Array.isArray(r.students) && (r.className == null || String(r.className) === String(k));
        var arr = ok ? r.students.filter(Boolean) : [], cf = function (x) { return x.className != null ? x.className : x['class']; };
        var mine = arr.filter(function (x) { return cf(x) != null && String(cf(x)) === String(k); });
        var ss = (mine.length ? mine : arr).map(function (x) { return String(x.name || '').trim(); }).filter(Boolean);
        if (ss.length) G[k] = ss;
        if (++done === all.length) {
          var got = all.filter(function (k) { return G[k]; });
          if (got.length) {
            var D = ld();
            got.forEach(function (k) { var ex = findKey(D, k); if (ex && ex !== kz(k)) delete D.classes[ex]; D.classes[kz(k)] = G[k].slice(); });
            applyMoves(D); if (!D.cur || !D.classes[D.cur]) D.cur = kz(got[0]); sv(D); flag('durus-roster-merged', '1'); flag('durus-roster-at', String(Date.now()));
          }
          cb(got.map(function (k) { return kz(k) + ' (' + kz(G[k].length) + ')'; }), okc > 0);
        }
      });
    });
  }
  return { kz: kz, nz: nz, load: load, save: sv, move: move, findKey: findKey, applyMoves: applyMoves, importAll: importAll, flag: flag, LISTS: LISTS };
})();

/* ربط كشوف «أعواد المثلجات» و«من يجيب؟» في الدرس بكشف المنصة الموحّد */
window.DRB = window.DRB || (function () {
  var shown = [];
  function get(api) {
    var D = DROS.load(), ak = (api || []).map(DROS.kz), ks = Object.keys(D.classes);
    ks.sort(function (a, b) { var x = ak.indexOf(a), y = ak.indexOf(b); x = x < 0 ? 99 : x; y = y < 0 ? 99 : y; return x - y; });
    shown = ks.slice();
    return ks.map(function (k) { return { n: k, s: D.classes[k].slice(), c: 0, src: ak.indexOf(k) >= 0 ? 1 : 0 }; });
  }
  function set(C) {
    var D = DROS.load(), keep = {};
    (C || []).forEach(function (x) { var k = DROS.kz(x.n); if (!k) return; keep[k] = 1; if (x.s && x.s.length) D.classes[k] = x.s.slice(); else if (!D.classes[k]) D.classes[k] = []; });
    shown.forEach(function (k) { if (!keep[k]) { delete D.classes[k]; if (D.cur === k) D.cur = ''; } });
    if ((C || []).some(function (x) { return x.src; })) DROS.applyMoves(D);
    if (!D.cur || !D.classes[D.cur]) D.cur = Object.keys(D.classes)[0] || '';
    DROS.save(D); DROS.flag('durus-roster-merged', '1');
  }
  return {
    load: function (k, d, SL0, api) { if (k === 'classes') return get(api); if (k === 'curName') { var D = DROS.load(); return D.cur || d; } return SL0(k, d); },
    save: function (k, v, SS0, api) { if (k === 'classes') { set(v); return; } if (k === 'curName') { var D = DROS.load(); D.cur = DROS.kz(v); DROS.save(D); return; } SS0(k, v); }
  };
})();
/* طلب JSONP إلى خادم المنصة */
function jsonp(base,params,cb){var name='stratCb_'+Date.now()+'_'+Math.random().toString(36).slice(2,8),sc=document.createElement('script'),fin=false;
  var q=Object.keys(params).map(function(k){return encodeURIComponent(k)+'='+encodeURIComponent(params[k])}).join('&')+'&callback='+name+'&_='+Date.now();
  function end(r){if(fin)return;fin=true;clearTimeout(t);try{sc.remove()}catch(e){}try{delete window[name]}catch(e){}cb(r)}
  var t=setTimeout(function(){end(null)},30000);window[name]=function(d){end(d)};sc.onerror=function(){end(null)};sc.src=base+(base.indexOf('?')<0?'?':'&')+q;document.head.appendChild(sc)}
/* ===== الأدوات الصفية ===== */
var TOOLS={};
TOOLS.sticks=function(){/* كشوف الفصول تُحفظ لكل صف دراسي (حسب قائمة فصوله) لا لكل درس، وتُربط الأعواد المستخدمة باسم الفصل */
  var RK=E.stratRoster&&E.stratRoster.classes?'strat-roster-'+E.stratRoster.classes.join('_'):key();function SL0(k,d){try{var v=JSON.parse(localStorage.getItem(RK+'-'+k)||'null');return v==null?d:v}catch(e){return d}}function SS0(k,v){try{localStorage.setItem(RK+'-'+k,JSON.stringify(v))}catch(e){}}function SL(k,d){return DRB.load(k,d,SL0,E.stratRoster&&E.stratRoster.classes)}function SS(k,v){DRB.save(k,v,SS0,E.stratRoster&&E.stratRoster.classes)}
  var C=SL('classes',[]),used=SL('usedN',{}),cn0=SL('curName',null),cur=Math.max(0,C.findIndex(function(x){return x.n===cn0})),O=ov('🍡 أعواد المثلجات','اختيار عشوائي عادل للطالب المجيب','🎲','');var c=O.c;
  function cls(){return C[cur]}
  function draw(){var K=cls();c.innerHTML='<div class="sgrow"><div class="sgcol" style="flex:1.3;align-items:center;justify-content:center"><div class="bigname" id="nm">'+(K?'جاهز…':'أضف فصلًا أولًا')+'</div><div class="sgacts"><button class="sgbtn y" id="go" style="font-size:24px;padding:14px 34px"'+(K?'':' disabled')+'>🎲 اختر طالبًا</button><label style="font-size:17px"><input type="checkbox" id="nr" '+(SL('norep',true)?'checked':'')+'> بلا تكرار</label><button class="sgbtn g" id="rs">↺ أعد كل الأعواد</button></div><p id="left" style="font-size:16px;color:#6b6590"></p></div>'+
    '<div class="sgcol"><div class="sgk"><h3>🏫 الفصل</h3><select id="cs" style="width:100%;font:inherit;font-size:19px;padding:8px;border-radius:10px;border:2px solid #e3dbfb">'+C.map(function(x,i){return '<option value="'+i+'"'+(i===cur?' selected':'')+'>'+esc(x.src?n(x.n):x.n)+'</option>'}).join('')+'</select>'+(E.stratRoster?'<button class="sgbtn o" id="imp" style="width:100%;margin-top:8px;font-size:17px">⬇ تحميل كشوف الفصول</button><p id="impm" style="margin:6px 0 0;font-size:15px;color:#6b6590"></p>':'<p style="margin:6px 0 0;font-size:15px;color:#6b6590">أضف أسماء الفصل يدويًّا من «فصل جديد»، وتُحفظ على هذا الجهاز فقط.</p>')+'<div class="sgacts" style="margin-top:8px"><button class="sgbtn g" id="ed" style="font-size:16px">✎ تعديل الأسماء</button><button class="sgbtn g" id="ad" style="font-size:16px">＋ فصل جديد</button>'+(K?'<button class="sgbtn g" id="dl" style="font-size:16px">🗑 حذف</button>':'')+'</div></div><div class="sgk rv" id="edb"><h3>✎ بيانات الفصل</h3><input id="cn" placeholder="اسم الفصل، مثل: ٤/١" style="width:100%;font:inherit;font-size:18px;padding:8px;border-radius:10px;border:2px solid #e3dbfb;margin-bottom:8px"><textarea id="ns" rows="8" placeholder="اكتب اسم كل طالب في سطر، أو اتركها فارغة واكتب عدد الطلاب" style="width:100%;font:inherit;font-size:17px;padding:8px;border-radius:10px;border:2px solid #e3dbfb"></textarea><div class="sgacts" style="margin-top:6px"><span style="font-size:16px">أو عدد الطلاب:</span><input id="nn" type="number" min="1" max="60" style="width:90px;font:inherit;padding:6px;border-radius:8px;border:2px solid #e3dbfb"><button class="sgbtn o" id="sv" style="font-size:16px">حفظ</button></div></div></div></div>';
    var list=K?(K.s&&K.s.length?K.s:Array.apply(null,{length:K.c||0}).map(function(_,i){return 'الطالب رقم '+n(i+1)})):[];var U=K?(used[K.n]||(used[K.n]=[])):[];
    function left(){var r=list.filter(function(x){return U.indexOf(x)<0});$('#left',c).textContent=K?('المتبقي: '+n(r.length)+' من '+n(list.length)):'';return r}left();
    $('#cs',c).onchange=function(){cur=+this.value;SS('curName',C[cur]&&C[cur].n);draw()};
    $('#ed',c).onclick=function(){var b=$('#edb',c);b.classList.add('on');if(K){$('#cn',c).value=K.n;$('#ns',c).value=(K.s||[]).join('\n');$('#nn',c).value=K.c||''}b._new=false};
    $('#ad',c).onclick=function(){var b=$('#edb',c);b.classList.add('on');$('#cn',c).value='';$('#ns',c).value='';$('#nn',c).value='';b._new=true};
    if($('#dl',c))$('#dl',c).onclick=function(){if(!confirm('حذف هذا الفصل من القائمة؟'))return;delete used[C[cur].n];C.splice(cur,1);cur=0;SS('classes',C);SS('usedN',used);SS('curName',C[0]&&C[0].n);draw()};
    $('#sv',c).onclick=function(){var nm=$('#cn',c).value.trim()||('فصل '+n(C.length+1)),ss=$('#ns',c).value.split('\n').map(function(x){return x.trim()}).filter(Boolean),cn=+$('#nn',c).value||0;if(!ss.length&&!cn){E.toast('اكتب الأسماء أو عدد الطلاب');return}var rec={n:nm,s:ss,c:cn};if($('#edb',c)._new||!K){C.push(rec);cur=C.length-1}else C[cur]=rec;SS('classes',C);SS('curName',rec.n);used[rec.n]=[];SS('usedN',used);draw()};
    if($('#imp',c))$('#imp',c).onclick=function(){var R=E.stratRoster,btn=this,m=$('#impm',c),done=0,okc=0,G={};btn.disabled=true;m.textContent='جاري التحميل…';
      R.classes.forEach(function(k){jsonp(R.api,{action:'getStudents',className:k},function(r){if(r&&r.ok)okc++;
        var ok=r&&r.ok&&Array.isArray(r.students)&&(r.className==null||String(r.className)===String(k));
        var all=ok?r.students.filter(Boolean):[],cf=function(x){return x.className!=null?x.className:x['class']},mine=all.filter(function(x){return cf(x)!=null&&String(cf(x))===String(k)});
        var ss=(mine.length?mine:all).map(function(x){return String(x.name||'').trim()}).filter(Boolean);
        if(ss.length)G[k]=ss;
        if(++done===R.classes.length){var names=R.classes.slice(),prev=C[cur]&&C[cur].n;
          var got=R.classes.filter(function(k){return G[k]}),dup=got.filter(function(k,i){return got.some(function(q,j){return j<i&&G[q].join('|')===G[k].join('|')})});
          if(got.length){var manual=C.filter(function(x){return !x.src&&names.indexOf(x.n)<0});
            C=got.map(function(k){return {n:k,s:G[k],c:0,src:1}}).concat(manual);
            got.forEach(function(k){used[k]=[]});
            cur=Math.max(0,C.findIndex(function(x){return x.n===prev}));SS('classes',C);SS('usedN',used);SS('curName',C[cur].n);draw();
            var mm=$('#impm',c);if(mm)mm.textContent='✔ تم تحميل '+n(got.length)+' فصول: '+got.map(function(k){return n(k)+' ('+n(G[k].length)+')'}).join('، ')+(dup.length?' ⚠ تنبيه: كشف '+dup.map(n).join('، ')+' مطابق لكشف فصل آخر؛ راجع تسجيل الفصول في المنصة.':'')}
          else{btn.disabled=false;m.textContent=okc?'لا توجد أسماء مسجلة لفصول هذا الصف بعد.':'تعذّر تحميل الكشوف. تأكد من اتصال الجهاز بالإنترنت ثم أعد المحاولة.'}}})})};
    $('#nr',c).onchange=function(){SS('norep',this.checked)};
    $('#rs',c).onclick=function(){if(K){used[K.n]=[];SS('usedN',used)}draw()};
    if(K)$('#go',c).onclick=function(){var nr=$('#nr',c).checked,pool=nr?left():list;if(!pool.length){E.toast('اختيرت جميع الأعواد؛ أعدها إلى الكأس');return}var k=0,steps=18,el=$('#nm',c);$('#cs',c).disabled=true;(function spin(){el.textContent=pool[Math.floor(Math.random()*pool.length)];E.sfx.tick();if(++k<steps)setTimeout(spin,40+k*12);else{var p=pool[Math.floor(Math.random()*pool.length)];el.textContent=p;E.sfx.ok();if(nr){U.push(p);used[K.n]=U;SS('usedN',used);left()}$('#cs',c).disabled=false}})()}}
  draw()};
/* ===== 🎯 من يجيب؟ — اختيار طالب عند كل سؤال تقويم (يستخدم كشوف أعواد المثلجات) ===== */
(function(){
  var SEL='.opts,.qopts,.k1q,.k1r';
  function RK(){return E.stratRoster&&E.stratRoster.classes?'strat-roster-'+E.stratRoster.classes.join('_'):key()}
  function SL0(k,d){try{var v=JSON.parse(localStorage.getItem(RK()+'-'+k)||'null');return v==null?d:v}catch(e){return d}}
  function SS0(k,v){try{localStorage.setItem(RK()+'-'+k,JSON.stringify(v))}catch(e){}}
  function SL(k,d){return DRB.load(k,d,SL0,E.stratRoster&&E.stratRoster.classes)}
  function SS(k,v){DRB.save(k,v,SS0,E.stratRoster&&E.stratRoster.classes)}
  function curK(){var C=SL('classes',[]),nm=SL('curName',null);for(var i=0;i<C.length;i++)if(C[i].n===nm)return C[i];return C[0]}
  function lbl(K){return K?(K.src?n(K.n):K.n):''}
  var st=document.createElement('style');st.textContent='.qpbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:6px 0 8px;direction:rtl}.qpbar button{font:inherit;font-weight:700;font-size:16px;border:0;border-radius:999px;padding:6px 14px;cursor:pointer;background:#ffd166;color:#3b2a00;box-shadow:0 2px 0 rgba(0,0,0,.18)}.qpbar .qpc{background:#e9e4ff;color:#3b2a7a;font-size:14px;padding:5px 10px}.qpbar .qpn{font-weight:800;font-size:24px;color:#ffb703;text-shadow:0 1px 0 rgba(0,0,0,.25);min-height:30px}.qpbar .qpn.sp{opacity:.7}';document.head.appendChild(st);
  function pick(bar){var K=curK();if(!K||!K.s||!K.s.length){if(E.stratTools&&E.stratTools.sticks)E.stratTools.sticks();E.toast&&E.toast('حمّل كشوف الفصول أو أضف فصلًا أولًا');return}
    var used=SL('usedN',{}),U=used[K.n]||[],pool=K.s.filter(function(s){return U.indexOf(s)<0});if(!pool.length){U=[];pool=K.s.slice()}
    var el=bar.querySelector('.qpn'),k=0,btn=bar.querySelector('.qpb');btn.disabled=true;el.classList.add('sp');
    (function spin(){el.textContent=pool[Math.floor(Math.random()*pool.length)];E.sfx&&E.sfx.tick&&E.sfx.tick();if(++k<14)setTimeout(spin,40+k*14);else{var p=pool[Math.floor(Math.random()*pool.length)];el.textContent='🎓 '+p;el.classList.remove('sp');E.sfx&&E.sfx.ok&&E.sfx.ok();U.push(p);used[K.n]=U;SS('usedN',used);btn.disabled=false;btn.textContent='🎯 طالب آخر'}})()}
  function heads(bar){var N=+SL('headsN',0)||+(function(){try{return JSON.parse(localStorage.getItem(key()+'-headsN')||'5')}catch(e){return 5}})()||5,el=bar.querySelector('.qpn');el.textContent='🔢 يجيب صاحب الرقم '+n(1+Math.floor(Math.random()*N))+' في كل مجموعة';E.sfx&&E.sfx.ok&&E.sfx.ok()}
  function mk(){var bar=document.createElement('div');bar.className='qpbar';var K=curK();
    bar.innerHTML='<button type="button" class="qpb">🎯 من يجيب؟</button><button type="button" class="qph" title="الرؤوس المرقمة">🔢 رقم</button><button type="button" class="qpc" title="تغيير الفصل">🏫 '+(K?lbl(K):'اختر الفصل')+'</button><span class="qpn"></span>';
    (function(b){b.querySelector('.qpb').onclick=function(e){e.stopPropagation();pick(b)};b.querySelector('.qph').onclick=function(e){e.stopPropagation();heads(b)};b.querySelector('.qpc').onclick=function(e){e.stopPropagation();E.stratTools&&E.stratTools.sticks&&E.stratTools.sticks()}})(bar);return bar}
  function deco(){var L=document.querySelectorAll(SEL);for(var i=0;i<L.length;i++){var o=L[i];if(o.getAttribute('data-qp')||o.closest('.sgo'))continue;o.setAttribute('data-qp','1');o.parentNode.insertBefore(mk(),o)}
    /* كل سؤال له زر «تحقق» (جداول، إدخال أرقام، قوائم منسدلة…) يحصل على الشريط أيضًا */
    var B=document.querySelectorAll('button');for(var j=0;j<B.length;j++){var bt=B[j];if(bt.getAttribute('data-qp')||!/^[\s✓✔]*تحق/.test(bt.textContent)||bt.textContent.length>40||bt.closest('.sgo,.qpbar'))continue;bt.setAttribute('data-qp','1');
      var blk=bt.closest('form,.qa,.row-actions'),box,ref;if(blk&&blk.parentElement){box=blk.parentElement;ref=blk}else{box=bt.parentElement;ref=bt}
      if(!box||box.querySelector('.qpbar'))continue;box.insertBefore(mk(),ref)}}
  var tm=0;new MutationObserver(function(){if(!tm)tm=setTimeout(function(){tm=0;deco()},80)}).observe(document.body,{childList:true,subtree:true});setTimeout(deco,300);
  /* تحديث اسم الفصل في الأشرطة بعد تغييره من أداة الأعواد */
  addEventListener('click',function(){setTimeout(function(){var K=curK(),t='🏫 '+(K?lbl(K):'اختر الفصل');var B=document.querySelectorAll('.qpbar .qpc');for(var i=0;i<B.length;i++)if(B[i].textContent!==t)B[i].textContent=t},400)},true);
})();

TOOLS.tps=function(){var P=[['🤔','فكّر','فرديًّا',load('tps0',60)],['👥','زاوج','مع زميلك',load('tps1',60)],['📣','شارك','مع الصف',load('tps2',90)]],ph=-1,left=0,iv=0,O=ov('👥 فكّر، زاوج، شارك','مؤقت المراحل الثلاث','⏱','');var c=O.c;
  c.innerHTML='<div class="tps">'+P.map(function(p,i){return '<div class="tpsp" data-i="'+i+'"><div class="e">'+p[0]+'</div><b>'+p[1]+'</b><span style="font-size:16px;color:#6b6590">'+p[2]+'</span><div style="margin-top:6px"><input type="number" min="10" max="600" value="'+p[3]+'" data-s="'+i+'"> ث</div></div>'}).join('')+'</div><div class="sgbig" id="tv">٠٠:٠٠</div><div class="sgacts" style="justify-content:center"><button class="sgbtn" id="st" style="font-size:22px">▶ ابدأ</button><button class="sgbtn g" id="nx">المرحلة التالية ←</button><button class="sgbtn g" id="rs">↺</button></div>';
  $$('[data-s]',c).forEach(function(i){i.onchange=function(){P[+i.dataset.s][3]=Math.max(10,+i.value||60);store('tps'+i.dataset.s,P[+i.dataset.s][3])}});
  function ui(){var m=Math.floor(left/60),s=left%60;$('#tv',c).textContent=n((m<10?'0':'')+m)+':'+n((s<10?'0':'')+s);$('#tv',c).style.color=left<=5&&ph>=0?'#e2483d':'#5a2fc0';$$('.tpsp',c).forEach(function(p,i){p.classList.toggle('on',i===ph);p.classList.toggle('dn',i<ph)})}
  function go(i){clearInterval(iv);ph=i;if(i>=P.length){ph=P.length;left=0;ui();E.sfx.ok();$('#tv',c).textContent='✔ انتهى';return}left=P[i][3];ui();E.sfx.pop();iv=setInterval(function(){if(E.paused)return;left--;if(left<=5&&left>0)E.sfx.tick();ui();if(left<=0){clearInterval(iv);E.sfx.no();setTimeout(function(){go(ph+1)},900)}},1000)}
  $('#st',c).onclick=function(){go(ph<0||ph>=P.length?0:ph)};$('#nx',c).onclick=function(){go(ph+1)};$('#rs',c).onclick=function(){clearInterval(iv);ph=-1;left=0;ui()};O.o._stop=function(){clearInterval(iv)};ui()};
TOOLS.heads=function(){var N=load('headsN',5),O=ov('🔢 الرؤوس المرقمة','اسحب رقمًا عشوائيًّا: يجيب صاحب الرقم عن مجموعته','🎲','');var c=O.c;
  c.innerHTML='<div class="sgrow"><div class="sgcol" style="align-items:center"><div class="sgbig" id="hv">؟</div><div class="bigname" id="ht" style="font-size:40px;min-height:60px"></div><div class="sgacts"><button class="sgbtn o" id="g1" style="font-size:22px">🔢 اسحب رقمًا</button><button class="sgbtn g" id="g2">🎯 رقم + فريق</button></div></div><div class="sgcol" style="flex:.7"><div class="sgk"><h3>⚙ الإعداد</h3><p>عدد الطلاب في كل مجموعة: <input id="hn" type="number" min="2" max="8" value="'+N+'" style="width:70px;font:inherit;padding:4px;border-radius:8px;border:2px solid #e3dbfb"></p></div>'+cardHTML('heads')+'</div></div>';
  $('#hn',c).onchange=function(){N=Math.max(2,Math.min(8,+this.value||5));store('headsN',N)};
  function roll(team){var k=0,el=$('#hv',c);(function sp(){el.textContent=n(1+Math.floor(Math.random()*N));E.sfx.tick();if(++k<14)setTimeout(sp,60+k*10);else{E.sfx.ok();if(team){var T=E.ST.teams[Math.floor(Math.random()*E.ST.teams.length)];$('#ht',c).innerHTML='<span style="color:'+T.c+'">'+esc(T.n)+'</span>'}else $('#ht',c).textContent='يجيب صاحب هذا الرقم في كل مجموعة'}})()}
  $('#g1',c).onclick=function(){roll(false)};$('#g2',c).onclick=function(){roll(true)}};
E.stratTools=TOOLS;
/* ===== الواجهة العامة ===== */
var SK={CAT:CAT,tools:TOOLS,open:openStrat};
SK.init=function(a){for(var k in a)E[k]=a[k];if(a.teams)Object.defineProperty(E.ST,'teams',{get:a.teams,configurable:true})};
SK.badges=function(r,lid){var box=E.h('<span class="stgs">'+r.s.map(function(k,j){return '<button type="button" class="stg'+(j%3?' c'+(j%3+1):'')+'" data-k="'+k+'" title="عرض خطوات الاستراتيجية">'+CAT[k].ic+' '+CAT[k].n+'</button>'}).join('')+'</span>');
  E.$$('.stg',box).forEach(function(x){x.onclick=function(e){e.stopPropagation();e.preventDefault();openStrat(x.dataset.k,r,lid||E.key)}});return box};
SK.planHTML=function(title,rows){var used={};rows.forEach(function(r){r.c.s.forEach(function(k){used[k]=1})});
  return '<div class="stp" style="overflow:auto"><table><tr><th>#</th><th>المحطة</th><th>الهدف</th><th>الاستراتيجية</th><th>مهارة التفكير</th><th>أداة التقويم</th></tr>'+rows.map(function(r){var x=r.c;return '<tr data-go="'+r.i+'"><td>'+E.n(r.num)+'</td><td class="s"><b>'+E.esc(r.name)+'</b></td><td>'+(x.g||'—')+'</td><td>'+x.s.map(function(k){return '<span class="pill">'+CAT[k].ic+' '+CAT[k].n+'</span>'}).join('')+'</td><td>'+(x.sk||'')+'</td><td>'+(x.ev||'')+'</td></tr>'}).join('')+'</table></div>'+
   '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:10px"><b>🧰 أدوات صفية:</b><button type="button" class="stg c3" data-t="sticks">🍡 أعواد المثلجات</button><button type="button" class="stg" data-t="tps">👥 فكّر-زاوج-شارك</button><button type="button" class="stg c2" data-t="heads">🔢 الرؤوس المرقمة</button><span style="margin-inline-start:auto;font-size:16px;opacity:.85">عدد الاستراتيجيات في الدرس: <b>'+E.n(Object.keys(used).length)+'</b> · المس أي صف للانتقال إلى محطته، أو شارة الاستراتيجية في المحطة لعرض خطواتها.</span></div>'};
SK.wirePlan=function(el,go){E.$$('tr[data-go]',el).forEach(function(tr){tr.onclick=function(e){e.stopPropagation();go(tr.dataset.go)}});E.$$('[data-t]',el).forEach(function(b){b.onclick=function(e){e.stopPropagation();TOOLS[b.dataset.t]()}})};
SK.toolbox=function(){var O=ov('🧰 الأدوات الصفية','أدوات تنفيذ الاستراتيجيات أثناء الحصة','🎓','<div class="sgacts" style="justify-content:center;padding:20px"><button class="sgbtn y" data-t="sticks" style="font-size:24px;padding:18px 30px">🍡 أعواد المثلجات</button><button class="sgbtn" data-t="tps" style="font-size:24px;padding:18px 30px">👥 فكّر-زاوج-شارك</button><button class="sgbtn o" data-t="heads" style="font-size:24px;padding:18px 30px">🔢 الرؤوس المرقمة</button></div><div class="sgk"><h3>الاستراتيجيات المتاحة</h3><div class="sgch">'+Object.keys(CAT).map(function(k){return '<span>'+CAT[k].ic+' '+CAT[k].n+'</span>'}).join('')+'</div></div>');
  E.$$('[data-t]',O.c).forEach(function(x){x.onclick=function(){O.close();TOOLS[x.dataset.t]()}})};
SK.fab=function(style){var b=E.h('<button type="button" id="skfab" title="الأدوات الصفية" style="position:fixed;z-index:9000;border:0;border-radius:999px;padding:10px 18px;font:700 17px inherit;font-family:inherit;color:#fff;background:linear-gradient(135deg,#7c4ee6,#5a2fc0);box-shadow:0 4px 0 #3c1d8f,0 6px 18px rgba(0,0,0,.3);cursor:pointer;'+(style||'left:14px;bottom:14px')+'">🧰 الاستراتيجيات</button>');document.body.appendChild(b);b.onclick=SK.toolbox;return b};
window.SK=SK;
})();

/* ===== أدوات مشتركة لدروس الفصلين الأول والثاني (ثالث متوسط) ===== */
(function(){
/* استراتيجيات إضافية للدليل */
const C=SK.CAT;
C.cards=C.cards||{n:'البطاقات الملوّنة',ic:'🟥',why:'يشارك كل الطلاب في الإجابة معًا، ويرى المعلم فورًا نسبة الإتقان والأخطاء الشائعة.',steps:['يحمل كل طالب أربع بطاقات ملوّنة: أحمر (أ)، أزرق (ب)، أخضر (ج)، أصفر (د).','يُعرض السؤال، ويفكر الطلاب ١٠ ثوانٍ.','يرفع الجميع البطاقة معًا عند الإشارة، ثم يُكشف الجواب ويُناقش.'],time:'دقيقة لكل سؤال',role:'يجيب فرديًّا أمام الجميع'};
C.spot=C.spot||{n:'اكتشف الخطأ',ic:'🔍',why:'ينمّي التفكير الناقد والدقة العلمية بتصحيح المفاهيم الخاطئة الشائعة.',steps:['تُعرض عبارة فيها خطأ علمي.','تتشاور المجموعة وتحدد الكلمة الخاطئة.','يذكر ممثل المجموعة التصحيح ودليله.'],time:'٣ دقائق',role:'ناقد ومصحّح'};
C.champ=C.champ||{n:'تحدي الأبطال',ic:'⚔',why:'منافسة عادلة بزمن محدد ترفع الحماس وتعزز الاستدعاء السريع.',steps:['تتنافس المجموعات بالتناوب.','يجيب الفريق صاحب الدور خلال زمن محدد.','الإجابة الصحيحة تقدّم الفريق خطوة نحو خط النهاية.'],time:'٨ دقائق',role:'منافس ومتعاون مع فريقه'};
C.who=C.who||{n:'من أنا؟',ic:'🕵',why:'ألغاز بأدلة متدرجة تنشّط الاستدعاء وتربط العنصر بخواصه واستخداماته.',steps:['يُعرض الدليل الأول.','يحاول الطلاب التخمين؛ كل دليل إضافي يقلل النقاط.','يُكشف العنصر ويُلخّص موقعه وخواصه.'],time:'٥ دقائق',role:'محقق يستنتج'};
C.time=C.time||{n:'آلة الزمن (الخط الزمني)',ic:'⏳',why:'ترتيب الأحداث زمنيًّا يوضح أن المعرفة العلمية تراكمية وقابلة للتطور.',steps:['تُعرض بطاقات الأحداث مبعثرة.','يرتبها الطلاب زمنيًّا.','يناقشون ماذا أضاف كل عالم لمن قبله.'],time:'٤ دقائق',role:'يرتّب ويربط'};
C.mbox=C.mbox||{n:'الصندوق الغامض',ic:'🎁',why:'عنصر المفاجأة يثير الفضول ويجعل المراجعة ممتعة.',steps:['يختار الفريق صندوقًا برقمه.','يُفتح الصندوق على سؤال مفاجئ.','تُمنح النقاط عند الإجابة الصحيحة.'],time:'٨ دقائق',role:'يختار ويجيب'};
})();

/* ===== أدوات تقويم مشتركة ===== */
(function(){const {G,say,shuffle}=K;
/* ملء الفراغ من بنك كلمات: items=[[نص فيه ___ , الإجابة]] */
function fill(el,cfg,st,cb){const bank=cfg.bank;
 el.innerHTML=`<p class="step-text"><b>بنك الكلمات:</b> ${bank.map(w=>`<span class="c6-pill">${w}</span>`).join(' ')}</p><ol class="step-text c6-fill" style="line-height:2.3;margin:0">${cfg.items.map(([t],i)=>`<li>${t.replace('___',`<select data-f="${i}" aria-label="الفراغ ${i+1}" style="font:inherit;font-weight:700;padding:2px 6px;border-radius:8px;border:2px solid var(--line);background:var(--surface);color:var(--ink)"><option value="">اختر…</option>${bank.map(w=>`<option>${w}</option>`).join('')}</select>`)}</li>`).join('')}</ol><div class="row-actions"><button class="btn" type="button" data-chk>تحقق</button><button class="tbtn" type="button" data-show>إظهار الإجابات</button></div><div class="qfb"></div>`;
 const fb=el.querySelector('.qfb');let done=false;
 const mark=(show)=>{let r=0;el.querySelectorAll('[data-f]').forEach(sl=>{const a=cfg.items[+sl.dataset.f][1];if(show)sl.value=a;const ok=sl.value===a;if(ok)r++;sl.style.borderColor=ok?'var(--ok)':(sl.value?'#d9483b':'var(--line)');});return r;};
 el.querySelector('[data-chk]').onclick=()=>{const r=mark(false),n=cfg.items.length;if(r===n){G.good();if(!done){G.add(10,st);done=true;cb&&cb();}say(fb,'ok','ممتاز! كل الإجابات صحيحة.');}else{G.bad();say(fb,'bad',`صحيح ${r} من ${n}. الإطار الأحمر يدل على إجابة تحتاج مراجعة.`);}};
 el.querySelector('[data-show]').onclick=()=>{mark(true);say(fb,'info','هذه الإجابات النموذجية.');if(!done){done=true;cb&&cb();}};}
/* صح أم خطأ مع تصحيح الكلمة: items=[[عبارة, صحيحة؟, التصحيح, خيارات التصحيح]] */
function tfx(el,items,st,cb){let n=0;
 el.innerHTML=items.map((it,i)=>`<div class="c6-q" data-t="${i}"><p class="step-text" style="margin:0 0 6px"><b>${i+1}.</b> ${it[0]}</p><div class="row-actions" style="margin:0"><button class="tbtn" type="button" data-v="1">✓ صح</button><button class="tbtn" type="button" data-v="0">✗ خطأ</button></div><div class="qfb"></div></div>`).join('');
 el.querySelectorAll('[data-t]').forEach(box=>{const i=+box.dataset.t,it=items[i],fb=box.querySelector('.qfb');let over=false;
  box.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{if(over)return;const v=b.dataset.v==='1';
   if(v!==it[1]){G.bad();say(fb,'bad','فكّر مرة أخرى في الكلمة التي تحتها خط.');return;}
   if(it[1]){over=true;G.good();G.add(5,st);say(fb,'ok','صحيح، العبارة صحيحة.');if(++n===items.length)cb&&cb();return;}
   fb.innerHTML=`<p class="step-text" style="margin:6px 0">أحسنت، العبارة خاطئة. اختر الكلمة التي تصححها:</p><div class="c6-chips">${shuffle(it[3]).map(o=>`<button type="button" class="c6-chip" data-o="${o}">${o}</button>`).join('')}</div><div class="qfb2"></div>`;
   fb.querySelectorAll('[data-o]').forEach(c=>c.onclick=()=>{if(over)return;const f2=fb.querySelector('.qfb2');if(c.dataset.o===it[2]){over=true;c.setAttribute('aria-pressed','true');G.good();G.add(6,st);say(f2,'ok','التصحيح: '+it[2]);if(++n===items.length)cb&&cb();}else{G.bad();c.disabled=true;say(f2,'bad','ليست هذه.');}});});});}
/* عنونة شكل بالمفردات: slots=[[وصف الموضع, الإجابة]] */
function label(el,cfg,st,cb){let pick=null,n=0;const words=shuffle(cfg.slots.map(s=>s[1]).concat(cfg.extra||[]));
 el.innerHTML=`<div class="c6-key"><div style="display:grid;place-items:center">${cfg.fig}</div><div><div class="c6-chips">${words.map(w=>`<button type="button" class="c6-chip" data-w="${w}">${w}</button>`).join('')}</div>${cfg.slots.map((s,i)=>`<div class="c6-slot" data-s="${i}" role="button" tabindex="0" style="margin-top:6px"><span class="c6-pill">${s[0]}</span><span data-a></span></div>`).join('')}<div class="qfb"></div></div></div>`;
 const fb=el.querySelector('.qfb');
 el.querySelectorAll('[data-w]').forEach(c=>c.onclick=()=>{el.querySelectorAll('[data-w]').forEach(x=>x.setAttribute('aria-pressed','false'));c.setAttribute('aria-pressed','true');pick=c;G.tick();});
 el.querySelectorAll('[data-s]').forEach(sl=>sl.onclick=()=>{if(!pick||sl.classList.contains('ok'))return;const a=cfg.slots[+sl.dataset.s][1];
  if(pick.dataset.w===a){sl.classList.add('ok');sl.classList.remove('bad');sl.querySelector('[data-a]').textContent=a;pick.disabled=true;pick=null;G.good();G.add(4,st);if(++n===cfg.slots.length){say(fb,'ok',cfg.done||'أحسنت! عنونت الشكل كاملًا.');cb&&cb();}}
  else{sl.classList.add('bad');G.bad();setTimeout(()=>sl.classList.remove('bad'),600);}});}
window.C6={fill,tfx,label};})();
/* ===== مساعدات إضافية ===== */
(function(){const {$,$$,G,STN,say,SFX,shuffle,pic,def}=K;
function order(el,items,st,cb,msg){let ord=shuffle(items.map((_,i)=>i));while(items.length>1&&ord.every((k,i)=>k===i))ord=shuffle(ord);let sel=null,done=false;
 const draw=()=>{el.innerHTML=ord.map((k,i)=>`<button type="button" class="c6-chip" data-i="${i}" aria-pressed="${sel===i}" style="display:block;width:100%;text-align:start;border-radius:12px;margin:6px 0">${i+1}. ${items[k]}</button>`).join('')+'<p class="hint-line">المس عنصرًا ثم عنصرًا آخر لتبديل مكانيهما.</p><div class="row-actions"><button class="btn" type="button" data-chk>تحقق من الترتيب</button></div><div class="qfb"></div>';
  el.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(sel==null)sel=i;else{[ord[sel],ord[i]]=[ord[i],ord[sel]];sel=null;SFX.pop();}G.tick();draw();});
  el.querySelector('[data-chk]').onclick=()=>{const fb=el.querySelector('.qfb');const r=ord.filter((k,i)=>k===i).length;if(r===items.length){G.good();if(!done){done=true;G.add(10,st);cb&&cb();}say(fb,'ok',msg||'ترتيب صحيح!');}else{G.bad();say(fb,'bad',`${r} من ${items.length} في مكانها الصحيح. حاول مرة أخرى.`);}};};
 draw();return {reset(){ord=shuffle(items.map((_,i)=>i));sel=null;done=false;draw();}};}
const fig=(n,c,w)=>`<figure class="c6-fig" style="max-width:${w||240}px;text-align:center">${pic(n,c)}<figcaption class="step-text">${c}</figcaption></figure>`;
const grid=a=>`<div class="c6-grid">${a.map(([n,c])=>`<figure style="margin:0;text-align:center">${pic(n,c)}<figcaption class="step-text">${c}</figcaption></figure>`).join('')}</div>`;
const reveal=(q,a,lbl)=>{const id='rv'+Math.random().toString(36).slice(2,8);setTimeout(()=>{const b=document.getElementById(id);if(b)b.onclick=()=>{document.getElementById(id+'a').hidden=false;b.hidden=true;SFX.pop();};},0);return `<div class="c6-q">${q?`<b>${q}</b><br>`:''}<button class="tbtn" type="button" id="${id}">${lbl||'إظهار الإجابة'}</button><div class="c6-ans" id="${id}a" hidden>${a}</div></div>`;};
function plan(SROWS,key){
 SK.init({key,sfx:{pop:()=>SFX.pop(),tick:()=>SFX.tick(),ok:()=>SFX.correct(),no:()=>SFX.wrong()},teams:()=>(G.teams||K.TEAMN.slice(0,4).map((n,i)=>({n,c:K.TEAMC[i]}))).map(t=>({n:t.n,c:t.c})),
  stratRoster:{api:'https://script.google.com/macros/s/AKfycbxp-t4JgGO5WiK6hoacjTyBqFnG-9bSWClplOpVV4VDuTV7T4tY0swB1Ll36kr_djJ7nQ/exec',classes:['1/3','2/3','3/3','4/3']}});
 def('plan',{n:'خطة الدرس والاستراتيجيات',after:'goals',eyebrow:'للمعلم والزائر',title:'خطة الدرس: الأهداف والاستراتيجيات والتقويم',goal:'المس أي صف للانتقال إلى محطته، أو شارة الاستراتيجية أعلى المحطة لعرض خطواتها وأدواتها.',plan:1,
  icon:'<rect x="10" y="12" width="60" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M10 28h60M30 28v40" stroke="currentColor" stroke-width="5"/>',body:'<div class="card" id="planBox"></div>',
  init(){const secs=$$('#stations section.st');let k=0;const rows=[];secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;k++;rows.push({i:id,num:k,name:STN[id].n.replace(/^\d+ · /,''),c});});
   $('#planBox').innerHTML=SK.planHTML('',rows);SK.wirePlan($('#planBox'),id=>K.go(id));
   secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;const h=s.querySelector('.st-head');if(h&&!h.querySelector('.stgs')){const b=SK.badges(c);b.style.cssText='display:flex;margin:6px 0 0';h.appendChild(b);}});
   if(!document.getElementById('skfab'))SK.fab('left:14px;bottom:86px');},
  enter(){G.complete('plan');},reset(){},explain:'<p>خطة الدرس: لكل محطة هدفها والاستراتيجية المطبقة ومهارة التفكير وأداة التقويم.</p>'});}
const ICO={doc:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
 check:'<rect x="14" y="8" width="52" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30l6 6 12-12M24 54l6 6 12-12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
 cup:'<path d="M24 10h32v18a16 16 0 0 1-32 0z" fill="currentColor"/><path d="M40 44v14M28 70h24l-3-12H31z" fill="currentColor"/>',
 lock:'<rect x="18" y="34" width="44" height="36" rx="5" fill="currentColor"/><path d="M28 34v-8a12 12 0 0 1 24 0v8" fill="none" stroke="currentColor" stroke-width="6"/>',
 lens:'<circle cx="34" cy="34" r="20" fill="none" stroke="currentColor" stroke-width="6"/><path d="M48 48l20 20" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>',
 flask:'<path d="M30 8h20M34 8v20L16 64a6 6 0 0 0 5 8h38a6 6 0 0 0 5-8L46 28V8" fill="none" stroke="currentColor" stroke-width="5"/><path d="M22 54h36" stroke="currentColor" stroke-width="4"/>'};
const lst=a=>`<ul class="step-text" style="margin:0;line-height:1.9">${a.map(x=>`<li>${x}</li>`).join('')}</ul>`;
Object.assign(window.C6,{order,fig,grid,reveal,plan,ICO,lst});})();

/* ===== تجارب افتراضية — أسلوب العلم ===== */
(function(){
const {$,$$,G,STN,def,say,SFX,mcq}=K;const AR='font-family="IBM Plex Sans Arabic"';

/* ---------- 1) هل تخدعك حواسك؟ تجربة الأوعية الثلاثة ---------- */
def('lab1',{after:'s1',n:'🧪 هل تخدعك حواسك؟',eyebrow:'تجربة افتراضية · مقترحة',title:'تجربة الأوعية الثلاثة: هل تخدعك حواسك؟',goal:'ضع اليد اليسرى في الماء الدافئ واليمنى في الماء البارد دقيقة، ثم ضع اليدين معًا في الماء الفاتر. ماذا تشعر كل يد؟ ثم قِس بالثرمومتر.',plan:7,core:1,
 icon:'<path d="M6 40h20v24H6zM30 40h20v24H30zM54 40h20v24H54z" fill="none" stroke="currentColor" stroke-width="4"/><path d="M8 50h16M32 50h16M56 50h16" stroke="currentColor" stroke-width="6" opacity=".5"/>',
 body:`<div class="two"><div class="stage"><svg id="b1svg" viewBox="0 0 640 300" aria-label="ثلاثة أوعية ماء"></svg>
  <div class="toolbar" style="grid-template-columns:repeat(3,minmax(0,1fr))"><button class="tool" type="button" data-s="1"><span>①</span><span>اليدان في الدافئ والبارد</span></button><button class="tool" type="button" data-s="2"><span>②</span><span>اليدان معًا في الفاتر</span></button><button class="tool" type="button" data-s="3"><span>🌡</span><span>قِس بالثرمومتر</span></button></div></div>
  <div class="side"><div class="card"><h3>دفتر الملاحظات</h3><div id="b1log" class="step-text muted">ابدأ بالخطوة ①.</div></div></div></div>
  <div class="card"><h3>استنتج</h3><div id="b1q"></div></div>`,
 init(){let step=0,t=0,tm=null;const svg=$('#b1svg');
  const bowl=(x,c,lb,temp)=>`<g transform="translate(${x} 170)"><path d="M-80 0 h160 l-20 90 h-120z" fill="${c}" fill-opacity=".55" stroke="#475569" stroke-width="4"/><path d="M-80 0 h160" stroke="#475569" stroke-width="6"/>${temp?`<text x="0" y="-80" text-anchor="middle" ${AR} font-size="26" font-weight="800" fill="var(--ink)">${temp}</text>`:''}<text x="0" y="118" text-anchor="middle" ${AR} font-size="16" font-weight="700" fill="var(--ink)">${lb}</text></g>`;
  const hand=(x,y,col,lab)=>`<g transform="translate(${x} ${y})"><rect x="-16" y="-70" width="32" height="70" rx="14" fill="#f2c39b" stroke="#b07a43" stroke-width="2"/><rect x="-18" y="-100" width="36" height="34" rx="8" fill="${col}"/>${lab?`<g transform="translate(0 -122)"><rect x="-70" y="-20" width="140" height="30" rx="15" fill="${lab[1]}"/><text x="0" y="1" text-anchor="middle" ${AR} font-size="15" font-weight="800" fill="#fff">${lab[0]}</text></g>`:''}</g>`;
  const draw=()=>{let s=`<rect width="640" height="300" fill="var(--wall)"/>`;
   s+=bowl(110,'#ef4444','ماء دافئ',step===3?'40°س':'')+bowl(320,'#a3e635','ماء فاتر',step===3?'25°س':'')+bowl(530,'#3b82f6','ماء بارد',step===3?'10°س':'');
   if(step===1){s+=hand(110,190,'#64748b',t>12?['اليسرى: دافئ',`#ef4444`]:null)+hand(530,190,'#64748b',t>12?['اليمنى: بارد','#3b82f6']:null);}
   if(step===2){s+=hand(295,190,'#64748b',['اليسرى: باااارد!','#3b82f6'])+hand(345,190,'#475569',null);s+=`<g transform="translate(345 68)"><rect x="-70" y="-20" width="140" height="30" rx="15" fill="#ef4444"/><text x="0" y="1" text-anchor="middle" ${AR} font-size="15" font-weight="800" fill="#fff">اليمنى: داااافئ!</text></g>`;}
   if(step===3)[110,320,530].forEach(x=>s+=`<g transform="translate(${x+50} 120)"><rect x="-5" y="-60" width="10" height="90" rx="5" fill="#fff" stroke="#475569"/><circle cx="0" cy="34" r="10" fill="#dc2626"/><rect x="-2" y="-40" width="4" height="70" fill="#dc2626"/></g>`);
   svg.innerHTML=s;};
  const log=[];const L=m=>{log.push(m);$('#b1log').innerHTML='<ol style="margin:0;padding-inline-start:18px">'+log.map(x=>`<li>${x}</li>`).join('')+'</ol>';};
  $$('#lab1 .tool, #st-lab1 .tool').forEach(b=>b.onclick=()=>{const s=+b.dataset.s;
   if(s===1){step=1;t=0;clearInterval(tm);tm=setInterval(()=>{t++;draw();if(t>14)clearInterval(tm);},80);SFX.pop();L('اليد اليسرى في الماء الدافئ، واليمنى في الماء البارد لمدة دقيقة.');}
   if(s===2){if(step<1){say($('#b1log'),'info','ابدأ بالخطوة ① أولًا.');return;}step=2;draw();SFX.tick();L('في الماء الفاتر نفسه: اليسرى تشعر ببرودة، واليمنى تشعر بدفء! الحاستان تعطيان وصفين متعارضين للماء نفسه.');}
   if(s===3){if(step<2){L('أكمل الخطوتين ① و② أولًا.');return;}step=3;draw();SFX.correct();L('الثرمومتر: الدافئ 40°س، الفاتر 25°س، البارد 10°س. القياس لا يتأثر بإحساسنا.');G.add(5,'lab1');}});
  draw();STN.lab1.stop=()=>clearInterval(tm);
  mcq($('#b1q'),{q:'ماذا تستنتج من التجربة؟',o:['الحواس قد تخدعنا، ولذلك نستخدم أدوات القياس للحصول على وصف دقيق','الحواس دقيقة دائمًا','الثرمومتر غير دقيق','اليد اليمنى أدق من اليسرى'],a:0,why:'وهذا ما يقوله الدرس: لا يمكن الاعتماد على الحواس الخمس في وصف دقيق للكميات الفيزيائية مثل درجة الحرارة.'},'lab1',()=>G.complete('lab1'));},
 leave(){STN.lab1.stop&&STN.lab1.stop();},
 explain:'<p>تجربة مقترحة: بعد تعوّد اليد على الدفء يبدو الفاتر باردًا، وبعد تعوّدها على البرودة يبدو الفاتر دافئًا. القيم الحرارية افتراضية. <b>سلامتي:</b> لا تستخدم ماءً ساخنًا في البيت.</p>'});

/* ---------- 2) محطة أدوات العالم ---------- */
const OB=[{id:'pen',n:'قلم رصاص',L:'17.5 سم',m:'6 جم',T:'—',V:'—'},{id:'stone',n:'حجر',L:'6.2 سم',m:'84 جم',T:'—',V:'—'},{id:'water',n:'كأس ماء',L:'—',m:'—',T:'24°س',V:'150 مل'},{id:'tea',n:'كوب شاي',L:'—',m:'—',T:'70°س',V:'200 مل'}];
const TL=[{id:'L',n:'المسطرة',ic:'📏',k:'الطول'},{id:'m',n:'الميزان',ic:'⚖️',k:'الكتلة'},{id:'T',n:'الثرمومتر',ic:'🌡',k:'درجة الحرارة'},{id:'V',n:'المخبار المدرج',ic:'🧪',k:'الحجم'}];
def('lab2',{after:'s5',n:'🧪 محطة الأدوات',eyebrow:'تجربة افتراضية · مقترحة',title:'محطة أدوات العالِم: قِس وسجّل',goal:'اختر أداة، ثم المس الجسم لتقيسه. سجّل القياسات في الجدول، وتعرّف الأداة المناسبة لكل كمية.',plan:6,core:1,
 icon:'<path d="M10 60L60 10l10 10-50 50z" fill="none" stroke="currentColor" stroke-width="5"/><path d="M22 48l6 6M32 38l6 6M42 28l6 6" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="two"><div class="stage"><svg id="t2svg" viewBox="0 0 640 260" aria-label="طاولة الأدوات"></svg><div class="toolbar" id="t2tools" style="grid-template-columns:repeat(4,minmax(0,1fr))"></div></div>
  <div class="side"><div class="card"><h3>القراءة</h3><div id="t2out" class="step-text muted">اختر أداة ثم جسمًا.</div></div></div></div>
  <div class="card"><h3>جدول القياسات</h3><div class="tablewrap"><table class="c6-table" id="t2t"></table></div><p class="hint-line">القيم افتراضية للتجربة.</p></div>`,
 init(){let tool=null;const rec={};OB.forEach(o=>rec[o.id]={});
  const draw=()=>{let s=`<rect width="640" height="260" fill="var(--wall)"/><rect y="200" width="640" height="14" fill="var(--bench-top)"/><rect y="214" width="640" height="46" fill="var(--bench)"/>`;
   const art={pen:'<rect x="-50" y="-8" width="90" height="16" fill="#facc15" stroke="#92400e"/><path d="M40 -8 L60 0 L40 8z" fill="#f2c39b"/>',stone:'<path d="M-36 10 Q-40 -26 -4 -30 Q34 -30 36 0 Q30 22 -4 24 Q-30 26 -36 10z" fill="#8b8f94"/>',water:'<path d="M-26 -50 h52 l-6 76 h-40z" fill="rgba(125,200,240,.6)" stroke="#64748b" stroke-width="3"/>',tea:'<path d="M-30 -36 h56 v50 a10 10 0 0 1 -10 10 h-36 a10 10 0 0 1 -10 -10z" fill="#b45309" stroke="#78350f" stroke-width="3"/><path d="M26 -24 q20 0 20 16 q0 16 -20 16" fill="none" stroke="#78350f" stroke-width="4"/><path d="M-10 -46 q6 -10 0 -20 M6 -46 q6 -10 0 -20" stroke="#cbd5e1" stroke-width="3" fill="none"/>'};
   OB.forEach((o,i)=>{const x=90+i*155;s+=`<g class="t2o" data-o="${o.id}" style="cursor:pointer" transform="translate(${x} 170)"><rect x="-64" y="-90" width="128" height="120" fill="transparent"/>${art[o.id]}</g><text x="${x}" y="244" text-anchor="middle" ${AR} font-size="15" font-weight="700" fill="#fff">${o.n}</text>`;});
   $('#t2svg').innerHTML=s;$$('#t2svg .t2o').forEach(g=>g.onclick=()=>use(g.dataset.o));};
  const table=()=>{$('#t2t').innerHTML=`<thead><tr><th>الجسم</th>${TL.map(t=>`<th>${t.k} (${t.n})</th>`).join('')}</tr></thead><tbody>${OB.map(o=>`<tr><td>${o.n}</td>${TL.map(t=>`<td>${rec[o.id][t.id]||'—'}</td>`).join('')}</tr>`).join('')}</tbody>`;};
  $('#t2tools').innerHTML=TL.map(t=>`<button class="tool" type="button" data-t="${t.id}" aria-pressed="false"><span style="font-size:1.5rem">${t.ic}</span><span>${t.n}</span></button>`).join('');
  $$('#t2tools .tool').forEach(b=>b.onclick=()=>{tool=b.dataset.t;$$('#t2tools .tool').forEach(x=>x.setAttribute('aria-pressed',x===b));G.tick();});
  function use(id){const o=OB.find(x=>x.id===id);if(!tool){say($('#t2out'),'info','اختر أداة أولًا.');return;}const t=TL.find(x=>x.id===tool),v=o[tool];
   if(v==='—'){SFX.wrong();say($('#t2out'),'bad',`${t.n} لا يناسب قياس ${o.n} في هذه التجربة. اختر أداة أخرى.`);return;}
   rec[id][tool]=v;SFX.correct();G.add(2,'lab2');say($('#t2out'),'ok',`${t.n}: ${t.k} ${o.n} = <b>${v}</b>`);table();
   const n=Object.values(rec).reduce((a,r)=>a+Object.keys(r).length,0);if(n>=8)G.complete('lab2');}
  draw();table();},
 explain:'<p>تجربة مقترحة لمهارة القياس: لكل كمية أداة مناسبة؛ المسطرة للطول، والميزان للكتلة، والثرمومتر لدرجة الحرارة، والمخبار المدرج لحجم السائل.</p>'});
})();

/*@css c1.css*/
/*@include lab1.js*/
/*@include kit.js*/
/*@include skit.js*/
/* ===== الفصل الأول · الدرس الأول: أسلوب العلم — «دفتر العالِم الصغير» ===== */
(function(){
const {$,$$,G,STN,def,mcq,flips,match,sortGame,challenge,say,SFX,pic,slides,anticip,escape,bingo,tfRound,choiceBoard,solutions}=K;
const {fig,grid,reveal,ICO,lst,order}=C6;const P=(n,c)=>[n,c];

def('intro',{n:'الافتتاحية',plan:3,icon:'<circle cx="40" cy="36" r="24" fill="none" stroke="currentColor" stroke-width="6"/><path d="M28 64h24M32 72h16" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="hero"><div class="hero-photo">${pic('s01_9d93a282','العقل والمعرفة')}<span class="cap">العلم طريقة نفكّر بها، لا مجرد معلومات نحفظها.</span></div>
  <div><span class="eyebrow">دفتر العالِم الصغير</span><h2 class="hero-h">كيف يفكّر العلماء… وكيف تفكّر مثلهم؟</h2>
   <p class="riddle">ضع يدك اليمنى في ماء بارد واليسرى في ماء دافئ، ثم ضعهما معًا في ماء فاتر. ستخبرك يدك اليمنى أن الماء دافئ، واليسرى أنه بارد! فأيهما تصدّق؟ وكيف يصل العلماء إلى إجابات يثقون بها؟</p>
   <p class="q">ما توقعك قبل أن تبدأ؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div>`,init(){}});

def('fold',{n:'توجيه القراءة',eyebrow:'الكتاب صفحة 19',title:'توجيه القراءة وتركيزها',goal:'اكتب (م) إذا كنت موافقًا على العبارة، و(غ) إذا كنت غير موافق عليها، قبل القراءة، ثم عُد إليها بعد دروس الفصل.',plan:4,icon:ICO.doc,
 body:'<div class="card"><div id="foldAg"></div></div>',
 init(){anticip($('#foldAg'),[
  ['يسترشد العلماء عادةً بمعرفتهم السابقة لتوقع نتائج تجاربهم.',true],
  ['يفضل معظم العلماء أن تبقى اكتشافاتهم سرية.',false,'يتواصل العلماء بنتائجهم وينشرونها ليستفيد منها الآخرون.'],
  ['هناك طريقة واحدة فقط للمنهج العلمي في حل المشكلات.',false,'هناك طرائق علمية متعددة لحل المشكلات، منها البحث الوصفي والبحث التجريبي.'],
  ['الملاحظة هي الطريقة الوحيدة التي تؤدي إلى الاكتشافات العلمية.',false,'يستخدم العلماء مهارات كثيرة: الملاحظة والقياس والتجريب والاستدلال وغيرها.'],
  ['التجربة المخطط لها بصورة جيدة تحوي متغيرًا واحدًا فقط في كل مرة.',true],
  ['يَعُدّ العلماء إعادة التجربة ضياعًا للوقت.',false,'إجراء عدة محاولات يتأكد به العلماء من صحة نتائجهم ويجعلها أكثر دقة.'],
  ['يُعدّ الشخص عالمًا إذا تخرّج في الجامعة فقط.',false,'كل من يستقصي ما حوله بطريقة علمية يمارس سلوك العلماء.'],
  ['يضمن النظام العالمي للوحدات التواصل الصحيح بين العلماء.',true],
  ['إذا لم تدعم التجربة الفرضية فلن يستفيد العلماء منها شيئًا.',false,'يحتفظ العلماء بالنتائج للاستفادة منها في مجال آخر، ويعيدون تكوين الفرضية.']]);},
 enter(){G.complete('fold');},reset(){STN.fold.init();},explain:'<p>عبارات «توجيه القراءة وتركيزها» ص 19 تخص الفصل كله.</p>'});

const GOALS=['تحدد كيف تشكّل العلوم جزءًا من حياتك اليومية.','تصف المهارات والأدوات التي تستخدم في العلوم.'];
const TERMS=[{t:'الملاحظة',d:'جمع بيانات باستخدام حاسة أو أكثر. (مراجعة المفردات)'},{t:'العلم',d:'طريقة أو عملية تستخدم في استقصاء ما يجري حولك، ويعينك على توفير إجابات لأسئلتك.'},{t:'التقنية',d:'تطبيق العلم لصنع منتجات أو أدوات يستخدمها الناس.'}];
def('goals',{n:'الأهداف والمفردات',eyebrow:'الكتاب صفحة 20',title:'الأهداف والمفردات',goal:'تعرّف أهداف الدرس وأهميته ومفرداته.',plan:3,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><div class="story mt"><b>أهمية الدرس:</b> كثير مما تتعلمه في حصص العلوم قابل للتطبيق في الحياة اليومية.</div></div>
  <div class="card"><h3>مراجعة المفردات</h3><p class="step-text"><b>الملاحظة:</b> جمع بيانات باستخدام حاسة أو أكثر.</p><h3 class="mt">المفردات الجديدة</h3><ul class="tasks plain"><li>العلم</li><li>التقنية</li></ul><div id="g1flips" class="mt"></div></div></div>`,
 init(){flips($('#g1flips'),TERMS,()=>G.complete('goals'));}});

/* ---- S1 العلم والمجتمع ---- */
def('s1',{n:'1 · العلم والمجتمع',eyebrow:'المحطة 1 · الكتاب صفحة 20',title:'العلم والمجتمع: الحواس وحدودها',goal:'العلم طريقة نستقصي بها ما يجري حولنا. هل تكفي حواسنا الخمس لوصف دقيق للأشياء؟',plan:7,core:1,icon:'<circle cx="40" cy="40" r="12" fill="currentColor"/><circle cx="14" cy="22" r="7" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="66" cy="22" r="7" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="14" cy="58" r="7" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="66" cy="58" r="7" fill="none" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="card" id="s1sl"></div><div class="two"><div class="card"><h3>هل تستطيع تحديد درجة حرارة الجو داخل الصف؟</h3><div id="s1q"></div></div><div class="card"><h3>طابق الكمية بأداة قياسها</h3><div id="s1m"></div></div></div>`,
 init(){slides($('#s1sl'),[
  {k:'العلم والمجتمع',t:'ما العلم؟',im:[P('s06_f9589572','العلم'),P('s06_2e003ad0','الإنسان القديم يلاحظ')],html:'<p class="def"><b>العلم:</b> طريقة أو عملية تستخدم في استقصاء ما يجري حولك، ويعينك على توفير إجابات لأسئلتك.</p><p>حاول الناس عبر التاريخ تفسير ما يحدث للأشياء حولهم معتمدين على ملاحظاتهم التي توصلوا إليها عبر حواسهم الخمس.</p>'},
  {k:'العلم والمجتمع',t:'الحواس الخمس',im:[P('s07_7f727a88','الحواس الخمس')],html:'<p>يلاحظ العلماء ويستقصون ويجربون للتوصل إلى الإجابات، ويستخدمون <b>الحواس الخمس</b>: البصر واللمس والشم والتذوق والسمع.</p><p class="q">هل يمكن الاعتماد على الحواس الخمس في الوصول إلى وصف دقيق للأشياء؟</p>'},
  {k:'حدود الحواس',t:'نحتاج إلى أدوات القياس',im:[P('s08_dffa2d11','الفصل الدراسي'),P('s08_5c81ca90','مقياس الحرارة')],html:'<p>بالتأكيد لا يمكن الاعتماد على الحواس الخمس في إعطاء وصف دقيق للكميات الفيزيائية، مثل:</p><ul><li><b>درجة الحرارة</b>: نستخدم الثرمومتر.</li><li><b>الطول والمسافة</b>: نستخدم المسطرة.</li><li><b>الكتلة</b>: نستخدم الميزان.</li></ul>'}],'s1');
  mcq($('#s1q'),{q:'لتحديد درجة حرارة الجو داخل الصف بدقة نعتمد على:',o:['حاسة اللمس','الثرمومتر','الإحساس بالعرق','رأي أغلب الطلاب'],a:1,why:'الحواس تعطي وصفًا تقريبيًّا يختلف من شخص لآخر، أمّا الثرمومتر فيعطي قيمة دقيقة.'},'s1');
  match($('#s1m'),[['درجة الحرارة','الثرمومتر'],['الطول والمسافة','المسطرة'],['الكتلة','الميزان']],'s1',()=>G.complete('s1'));},
 quiz:[{q:'طريقة أو عملية تستخدم في استقصاء ما يجري حولك:',o:['العلم','التقنية','الفلسفة','التواصل'],a:0}],
 explain:'<p>العلم طريقة لاستقصاء ما يجري حولنا. نلاحظ بحواسنا، لكنها لا تكفي لوصف دقيق للكميات الفيزيائية، فنستخدم أدوات القياس: الثرمومتر والمسطرة والميزان.</p>'});

/* ---- S2 العلم أداة لفهم العالم ---- */
const INFO=[['رأي',0,'وجهة نظر شخصية قد تختلف من شخص لآخر.'],['حقيقة',1,'معلومة ثبتت صحتها بالملاحظة.'],['نظرية',1,'تفسير لسلوك تمت ملاحظته مرارًا.'],['قانون',1,'قاعدة تصف نمطًا في الطبيعة.'],['فرضية',1,'توقع قابل للاختبار.'],['فكرة',0,'تحتاج إلى اختبار قبل أن تصبح معرفة علمية.'],['نموذج',1,'أداة تساعد على تصور الأشياء وفهمها.']];
def('s2',{n:'2 · العلم أداة للفهم',eyebrow:'المحطة 2 · الكتاب صفحة 21',title:'العلم أداة لفهم العالم من حولنا',goal:'أحمد وبدر يقومان بعمل استقصاء حول مرض الكوليرا. توقّع نوع الأسئلة التي سيسألون أنفسهم لجمع معلومات عن المرض.',plan:7,core:1,icon:ICO.lens,
 body:`<div class="two"><div class="card">${fig('s09_133bd066','أحمد وبدر يقومان بعمل استقصاء حول مرض الكوليرا',360)}<h3 class="mt">صنّف أسئلة الاستقصاء</h3><div id="s2sort"></div></div>
  <div class="card">${fig('s10_b12bbbd4','ما يمكن الوصول له من معلومات',300)}<p class="step-text">يمكن أن يصل الاستقصاء إلى: رأي، حقيقة، نظرية، قانون، فرضية، فكرة، نموذج.</p><h3 class="mt">أيها معرفة علمية مدعومة بالأدلة؟</h3><div id="s2sort2"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s2');};
  sortGame($('#s2sort'),{bins:['لماذا؟','كيف؟','متى؟'],items:[['لماذا ينتشر المرض في مكان دون آخر؟',0],['لماذا يصاب بعض الناس ولا يصاب آخرون؟',0],['كيف ينتقل المرض من شخص لآخر؟',1],['كيف نقي أنفسنا منه؟',1],['متى تظهر الأعراض بعد العدوى؟',2],['متى بدأ انتشار المرض؟',2]],hint:'انظر إلى أداة الاستفهام في بداية السؤال.'},'s2',c);
  sortGame($('#s2sort2'),{bins:['تحتاج إلى أدلة/وجهة نظر','معرفة علمية أو أداة علمية'],items:INFO.map(x=>[x[0],x[1],x[2]]),hint:'هل تدعمها الملاحظات والتجارب؟'},'s2',c);},
 explain:'<p>يبدأ الاستقصاء بأسئلة: لماذا؟ كيف؟ متى؟ ويمكن أن يصل إلى أنواع مختلفة من المعلومات: رأي، حقيقة، نظرية، قانون، فرضية، فكرة، نموذج. (تصنيف المعلومات في اللعبة الثانية مقترح للتوضيح.)</p>'});

/* ---- S3 القانون والنظرية ---- */
def('s3',{n:'3 · القانون والنظرية',eyebrow:'المحطة 3 · الكتاب صفحة 21',title:'الفرق بين القانون العلمي والنظرية العلمية',goal:'القانون يصف، والنظرية تفسّر. صنّف الأمثلة.',plan:6,core:1,icon:'<rect x="8" y="14" width="28" height="52" rx="5" fill="currentColor" opacity=".5"/><rect x="44" y="14" width="28" height="52" rx="5" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="card"><div class="tablewrap"><table class="c6-table"><thead><tr><th>وجه المقارنة</th><th>القانون العلمي</th><th>النظرية العلمية</th></tr></thead><tbody>
  <tr><th>التعريف</th><td>قواعد تصف نمطًا أو سلوكًا معيّنًا في الطبيعة.</td><td>محاولة لتفسير سلوك تمّت ملاحظته مرارًا في الطبيعة.</td></tr>
  <tr><th>التفسير</th><td>لا تحتاج إلى تفسير الظاهرة (لا تشرح).</td><td>تحتاج إلى تفسير الظاهرة (تشرح).</td></tr>
  <tr><th>أمثلة</th><td>قوانين نيوتن الثلاثة في الحركة · تشرق الشمس من الشرق كل يوم · تتمدد الأجسام بالحرارة.</td><td>نظرية أينشتاين · يسقط القلم نحو الأرض بسبب الجاذبية · يتبخر الماء من الملابس بفعل الحرارة.</td></tr></tbody></table></div></div>
  <div class="card"><h3>قانون أم نظرية؟</h3><div id="s3sort"></div></div>`,
 init(){sortGame($('#s3sort'),{bins:['قانون علمي (يصف)','نظرية علمية (تفسّر)'],items:[['تشرق الشمس من الشرق كل يوم',0],['تتمدد الأجسام بالحرارة',0],['قوانين نيوتن الثلاثة في الحركة',0],['يسقط القلم نحو الأرض بسبب الجاذبية',1],['يتبخر الماء من الملابس بفعل الحرارة',1],['نظرية أينشتاين',1]],hint:'هل العبارة تشرح السبب (بسبب، بفعل)؟'},'s3',()=>G.complete('s3'));},
 quiz:[{q:'محاولة لتفسير سلوك تمّت ملاحظته مرارًا في الطبيعة:',o:['القانون العلمي','النظرية العلمية','الرأي','الملاحظة'],a:1}],
 explain:'<p>القانون العلمي يصف نمطًا دون تفسيره، والنظرية العلمية تفسّر سبب الظاهرة. تُشير كلمات «بسبب» و«بفعل» إلى التفسير.</p>'});

/* ---- S4 سلوك العلماء ---- */
def('s4',{n:'4 · سلوك العلماء',eyebrow:'المحطة 4 · الكتاب صفحة 22',title:'كيف يمكننا أن نمارس سلوك العلماء؟',goal:'العالم يستخدم خبراته السابقة، والأدلة، والعلم والتقنية.',plan:6,core:1,icon:ICO.lens,
 body:`<div class="card" id="s4sl"></div><div class="two"><div class="card"><h3>ناقش</h3><p class="step-text">كيف يمكن الاستفادة من الروبوتات في اكتشاف الفضاء وجمع المعلومات؟</p>${fig('s15_7f5dcf74','روبوت استكشاف',300)}${reveal('','<p class="step-text">تصل الروبوتات إلى أماكن يصعب أو يستحيل على الإنسان الوصول إليها، فتجمع الصور والعينات وتقيس درجات الحرارة وتركيب التربة وترسل البيانات إلى الأرض. (إجابة مقترحة)</p>','إجابة مقترحة')}</div>
  <div class="card"><h3>من يتصرّف كعالِم؟</h3><div id="s4sort"></div></div></div>`,
 init(){slides($('#s4sl'),[
  {k:'سلوك العلماء',t:'كيف يمكننا أن نمارس سلوك العلماء؟',im:[P('s12_03cb4285','عالم يدرس الضوء')],html:'<p>يمارس كل منا سلوك العلماء عندما يستقصي ما حوله بطريقة منظمة.</p>'},
  {k:'سلوك العلماء',t:'(1) الخبرات السابقة · (2) الأدلة',im:[P('s13_cf146073','عالم يتطلع للمستقبل'),P('s13_8a3a8117','المحقق')],html:'<ol><li>يستخدم العالِم خبراته السابقة ليتوقع ما سيحدث في أثناء الاستقصاءات.</li><li>يستخدم العالِم الأدلة، ويتصرف كمحقق في جمعه وتتبّعه للأدلة كي يصل إلى حل المشكلات.</li></ol>'},
  {k:'(3) العلم والتقنية',t:'التقنية',im:[P('s14_15540af0','طلاب يستخدمون الحاسوب')],html:'<p class="def"><b>التقنية:</b> تطبيق العلم لصنع منتجات أو أدوات يستخدمها الناس.</p><p>يستخدم العلماء: الكتب، والمجلات، والأفلام العلمية، والحاسب الآلي.</p><p>الحاسوب أحد الأمثلة على التقنية، وغالبًا ما توفر المكتبات والمدارس الحواسيب للطلاب لإجراء البحوث والطباعة.</p>'}],'s4');
  sortGame($('#s4sort'),{bins:['سلوك علمي','ليس سلوكًا علميًّا'],items:[['يتوقع النتيجة من خبرته السابقة',0],['يجمع الأدلة ويتتبعها كالمحقق',0],['يستعين بالكتب والحاسوب في البحث',0],['يصدّق أول معلومة يسمعها',1],['يتجاهل الأدلة التي تخالف رأيه',1]]},'s4',()=>G.complete('s4'));},
 quiz:[{q:'تطبيق العلم لصنع منتجات أو أدوات يستخدمها الناس:',o:['الفرضية','القانون','النظرية','التقنية'],a:3}],
 explain:'<p>يمارس العالم: استخدام الخبرات السابقة للتوقع، وتتبّع الأدلة كالمحقق، واستخدام العلم والتقنية (الكتب، المجلات، الأفلام العلمية، الحاسب الآلي).</p>'});

/* ---- S5 مهارات العلم ---- */
const SK9=['التحليل','التفسير','القياس','النمذجة','الملاحظة','الاستدلال','التنبؤ','المقارنة','التجريب'];
def('s5',{n:'5 · مهارات العلم',eyebrow:'المحطة 5 · الكتاب صفحة 23–24',title:'مهارات العلم',goal:'ما المهارات التي يمتلكها العلماء للحصول على العلم؟ المس كل مهارة لترى مثالًا عليها.',plan:6,core:1,icon:'<circle cx="40" cy="40" r="10" fill="currentColor"/><path d="M40 8v14M40 58v14M8 40h14M58 40h14M17 17l10 10M53 53l10 10M17 63l10-10M53 27l10-10" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="card"><h3>ما المهارات التي يمتلكها العلماء للحصول على العلم؟</h3><div class="c6-chips" id="s5c"></div><div id="s5fb"></div></div>
  <div class="card"><h3>ماذا قرأت؟ ما المهارات الثلاث الأكثر استخدامًا في العلوم؟</h3><div id="s5q"></div></div></div>`,
 init(){const EX={'التحليل':'فحص البيانات بعد جمعها للبحث عن أنماط.','التفسير':'شرح سبب حدوث ما لاحظته.','القياس':'استخدام المسطرة لتحديد طول الطاولة.','النمذجة':'صنع نموذج للمجموعة الشمسية.','الملاحظة':'ملاحظة تغيّر لون أوراق النبات.','الاستدلال':'استنتاج أن الأرض مبللة لأن المطر هطل.','التنبؤ':'توقّع ما سيحدث للنبات إذا لم يُسقَ.','المقارنة':'تحديد أوجه الشبه والاختلاف بين صخرتين.','التجريب':'اختبار أثر الضوء في نمو النبات.'};const seen=new Set();
  $('#s5c').innerHTML=SK9.map(s=>`<button type="button" class="c6-chip" data-s="${s}">${s}</button>`).join('');
  $$('#s5c [data-s]').forEach(b=>b.onclick=()=>{seen.add(b.dataset.s);b.setAttribute('aria-pressed','true');SFX.pop();say($('#s5fb'),'info',`<b>${b.dataset.s}:</b> ${EX[b.dataset.s]} <span class="muted">(مثال مقترح)</span>`);if(seen.size===9)G.complete('s5');});
  const box=$('#s5q');const items=[['القياس',1],['الملاحظة',1],['المقارنة',1],['النمذجة',0],['التنبؤ',0]];
  box.innerHTML=`<p class="step-text">اختر ثلاث مهارات:</p><div class="c6-chips">${items.map(([t],i)=>`<button type="button" class="c6-chip" data-i="${i}" aria-pressed="false">${t}</button>`).join('')}</div><div class="row-actions"><button class="btn" type="button" data-chk>تحقق</button></div><div class="qfb"></div>`;
  box.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');G.tick();});
  box.querySelector('[data-chk]').onclick=()=>{const ok=items.every(([,c],i)=>(box.querySelector(`[data-i="${i}"]`).getAttribute('aria-pressed')==='true')===!!c);if(ok){G.good();G.add(8,'s5');say(box.querySelector('.qfb'),'ok','القياس والملاحظة والمقارنة (كما في العرض).');}else{G.bad();say(box.querySelector('.qfb'),'bad','راجع الشريحة: ثلاث مهارات.');}};},
 explain:'<p>مهارات العلم التسع: التحليل، التفسير، القياس، النمذجة، الملاحظة، الاستدلال، التنبؤ، المقارنة، التجريب. والثلاث الأكثر استخدامًا في العرض: القياس، الملاحظة، المقارنة. الأمثلة على كل مهارة مقترحة.</p>'});

/* ---- S6 التواصل ---- */
def('s6',{n:'6 · التواصل في العلم',eyebrow:'المحطة 6 · الكتاب صفحة 24',title:'التواصل في العلم ودفتر العلوم',goal:'ماذا يفعل العلماء بنتائج تجاربهم؟ وما أهمية دفتر العلوم؟',plan:6,core:1,icon:'<rect x="16" y="10" width="44" height="60" rx="5" fill="none" stroke="currentColor" stroke-width="5"/><path d="M26 26h24M26 38h24M26 50h16" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="card" id="s6sl"></div><div class="card"><h3>ماذا أسجّل في دفتر العلوم؟</h3><div id="s6sort"></div></div>`,
 init(){slides($('#s6sl'),[
  {k:'التواصل في العلم',t:'ماذا يفعل العلماء بنتائج تجاربهم؟',im:[P('s18_cb7fe01c','عالم في المختبر'),P('s18_915707f5','المجلات العلمية')],html:'<p>يقوم العلماء بتوثيق نتائج التجارب والاستنتاجات عن طريق <b>المجلات العلمية</b> التي تُنشر دوريًّا.</p>'},
  {k:'التواصل في العلم',t:'دفتر العلوم',im:[P('s19_27cc3494','دفتر العلوم'),P('s19_c671fe39','رسم بياني في الدفتر')],html:'<p>الاحتفاظ بدفتر العلوم طريقة أخرى للتواصل بالبيانات العلمية والنتائج؛ حيث يمكن أن تسجّل الملاحظات وخطط الاستقصاءات، بالإضافة إلى الخطوات المتبعة في تنفيذ الاستقصاءات.</p><p><b>ما أهمية دفتر العلوم؟</b> تكمن أهميته في تسجيل الملاحظات والعمليات الحسابية وتحليل البيانات وتدوين المشكلات وطرح الأسئلة وحلولها، وتلخيص البيانات في صور وجداول.</p>'}],'s6');
  sortGame($('#s6sort'),{bins:['يُسجَّل في دفتر العلوم','لا علاقة له بالدفتر'],items:[['الملاحظات',0],['خطط الاستقصاء وخطواته',0],['العمليات الحسابية',0],['الجداول والرسوم البيانية',0],['الأسئلة والمشكلات وحلولها',0],['كلمات مرور حساباتي',1]]},'s6',()=>G.complete('s6'));},
 explain:'<p>يتواصل العلماء بنتائجهم عبر المجلات العلمية الدورية، ويسجلون في دفتر العلوم الملاحظات والخطط والخطوات والحسابات والبيانات في جداول وصور.</p>'});

/* ---- تقويم ---- */
def('ev1',{n:'تقويم',eyebrow:'تقويم · الأسئلة 1–3',title:'تقويم الدرس',goal:'أسئلة التقويم كما في العرض.',plan:5,core:1,icon:ICO.check,
 body:`<div class="two"><div class="card"><h3>1-1</h3><div id="e1"></div></div><div class="card"><h3>1-2</h3><div id="e2"></div></div></div><div class="two"><div class="card"><h3>1-3</h3><div id="e3"></div></div><div class="card"><h3>2 · ما أهمية الاحتفاظ بدفتر العلوم؟</h3>${reveal('','يحتاج العلماء عادة إلى إعادة التجارب على أن تكون كل الظروف متشابهة. إن وصفك التجربة في دفتر العلوم يساعد على إعادة التجربة، وكتابة النتائج والمشكلات والأسئلة؛ للاستفادة منها مستقبلًا.')}</div></div>
  <div class="two"><div class="card"><h3>3-1 · ما المهارات الثلاث الأكثر استخدامًا في العلوم؟</h3>${reveal('','إجابة هذه الشريحة في العرض: <b>الملاحظة، التفسير، التصنيف</b> (وهي المهارات في خلاصة الكتاب: «الملاحظة والتصنيف والتفسير مهارات علمية مهمة»).<br><span class="hint-line">لاحظ: في شريحة «ماذا قرأت؟» ذكر العرض: القياس، الملاحظة، المقارنة. ارجع إلى نص الكتاب ص 24 لاعتماد الإجابة.</span>')}</div>
   <div class="card"><h3>3-2 · اذكر بعض أشكال البيانات التي يمكن تسجيلها في دفتر العلوم</h3><div id="e5"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=4)G.complete('ev1');};
  mcq($('#e1'),{q:'طريقة تستخدم في استقصاء ما يحدث حولنا:',o:['المعرفة','العلم','الفلسفة','التواصل'],a:1},'ev1',c);
  mcq($('#e2'),{q:'هي تطبيق العلوم لصنع المنتجات والأدوات التي يستخدمها الناس:',o:['الفرضية','النظرية','القانون','التقنية'],a:3},'ev1',c);
  mcq($('#e3'),{q:'أي مما يلي يُستخدم للتواصل العلمي:',o:['المجلات العلمية','الكتب','اللقاءات العلمية','جميع ما سبق صحيح'],a:3},'ev1',c);
  sortGame($('#e5'),{bins:['أشكال بيانات','ليست أشكال بيانات'],items:[['الرسوم البيانية',0],['الجداول',0],['الصور',0],['الشائعات',1]]},'ev1',c);}});

/* ---- الخلاصة واختبر نفسك ---- */
def('sum',{n:'الخلاصة',eyebrow:'الخلاصة · الكتاب صفحة 25',title:'الخلاصة',goal:'أهم أفكار الدرس.',plan:2,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>العلم في المجتمع</h3>${lst(['يستعمل الناس حواسهم ليلاحظوا ما يحيط بهم.','تُستخدم العمليات العلمية في حل المشكلات والإجابة عن الأسئلة.'])}<h3 class="mt">استخدام المعرفة السابقة</h3>${lst(['يستعين العلماء بالمعارف السابقة لتوقع نتائج الاستقصاءات.','توضع النظريات بعد اختبار الفرضيات عدة مرات.'])}</div>
  <div class="card"><h3>استخدام العلم والتقنية</h3>${lst(['المجلات والصحف والكتب والإنترنت مصادر لمعلومات مفيدة.','الملاحظة والتصنيف والتفسير مهارات علمية مهمة.'])}<h3 class="mt">التواصل في العلم</h3>${lst(['يتواصل العلماء بملاحظاتهم وتجاربهم ونتائجهم مع الآخرين.'])}</div></div>`,
 enter(){G.complete('sum');}});
def('self',{n:'اختبر نفسك',eyebrow:'الواجب · الكتاب صفحة 25 · التسليم يوم الخميس',title:'اختبر نفسك',goal:'أسئلة «اختبر نفسك» مع إجابات نموذجية مقترحة.',plan:3,icon:ICO.check,body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'1 · استنتج',q:'لماذا يستخدم العلماء أدوات – منها مقياس الحرارة والمسطرة المترية – عند أخذ الملاحظات؟',a:[['الإجابة','لأن الحواس لا تعطي وصفًا دقيقًا للكميات الفيزيائية، والأدوات تعطي قياسات دقيقة يمكن مقارنتها وتكرارها.']]},
  {k:'2 · حدّد',q:'بعض المهارات المستخدمة في العلوم. سمِّ مهارة علمية استخدمتها اليوم.',a:[['الإجابة','الملاحظة، القياس، المقارنة، التنبؤ… مثال: قِست طول قلمي بالمسطرة (مهارة القياس).']]},
  {k:'3 · قوّم',q:'اذكر مثالًا واحدًا على التقنية. فيمَ تختلف التقنية عن العلم؟',a:[['مثال','الحاسوب.'],['الاختلاف','العلم طريقة لاستقصاء ما يجري حولنا والإجابة عن الأسئلة، أمّا التقنية فهي تطبيق العلم لصنع منتجات وأدوات يستخدمها الناس.']]},
  {k:'4 · التفكير الناقد',q:'لماذا يُستخدم دفتر العلوم في تسجيل البيانات؟ ما الطرائق الثلاث المختلفة التي تسجّل أو تلخّص بها البيانات في دفتر العلوم؟',a:[['لماذا','لكي يمكن إعادة التجربة بالظروف نفسها، وللاستفادة من النتائج والمشكلات والأسئلة مستقبلًا.'],['الطرائق','الجداول، والرسوم البيانية، والصور.']]},
  {k:'5 · قارن',q:'تستخدم أحيانًا حواسك لملاحظة أشياء حولك؛ لتتوصل إلى إجابة عن سؤال ما، وأحيانًا أخرى تستخدم أدوات وقياسات. قارن بين هاتين الطريقتين في الإجابة عن الأسئلة العلمية.',a:[['الحواس','سريعة ومتاحة لكنها تقريبية وتختلف من شخص لآخر وقد تخدعنا.'],['الأدوات','أدق وتعطي أرقامًا يمكن تسجيلها ومقارنتها وتكرارها.']]},
  {k:'6 · تواصل',q:'سجّل في دفتر العلوم خمسة أشياء قمت بملاحظتها في غرفة صفك أو خارجها.',a:[['مثال','السبورة بيضاء ولامعة · المكيف يصدر صوتًا · الشجرة خارج النافذة أوراقها خضراء · حرارة الصف مناسبة · عدد الطلاب 28.']]}],'self',()=>G.complete('self'));},
 reset(){STN.self.s.reset();},explain:'<p>أسئلة «اختبر نفسك» من العرض، والإجابات نموذجية مقترحة لأن العرض لم يتضمنها.</p>'});

/* ---- إثرائي ---- */
def('x1',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'خزانة دفتر العالِم وبنغو المفردات',goal:'افتحوا الخزانة قبل انتهاء الوقت، ثم تنافسوا في البنغو.',plan:5,icon:ICO.lock,
 body:'<div class="card"><div id="x1esc"></div></div><div class="card"><div class="nb-head"><h2>🎯 بنغو العلم</h2><span>اختاروا المصطلح المناسب</span></div><div id="x1bg"></div></div>',
 init(){STN.x1.e=escape($('#x1esc'),{title:'خزانة دفتر العالِم',story:'أُغلقت خزانة دفتر العالِم بأربعة أقفال! كل إجابة صحيحة تكشف رقمًا.',secs:300,
  locks:[{q:'جمع بيانات باستخدام حاسة أو أكثر:',o:['الملاحظة','التقنية','النمذجة','القانون'],a:0,code:'5'},{q:'لقياس درجة الحرارة نستخدم:',o:['الميزان','المسطرة','الثرمومتر','المخبار'],a:2,code:'2'},{q:'«يسقط القلم بسبب الجاذبية» مثال على:',o:['قانون','نظرية','رأي','تقنية'],a:1,code:'8'},{q:'يوثق العلماء نتائجهم في:',o:['المجلات العلمية','الألعاب','الإعلانات','الرسائل الخاصة'],a:0,code:'4'}],outro:'أحسنتم! العلماء يلاحظون ويقيسون ويتواصلون.'},'x1');
  bingo($('#x1bg'),[['العلم','طريقة لاستقصاء ما يجري حولك'],['التقنية','تطبيق العلم لصنع منتجات وأدوات'],['الملاحظة','جمع بيانات بحاسة أو أكثر'],['الثرمومتر','أداة قياس درجة الحرارة'],['المسطرة','أداة قياس الطول'],['الميزان','أداة قياس الكتلة'],['القانون العلمي','يصف نمطًا في الطبيعة'],['النظرية العلمية','تفسّر سلوكًا تمت ملاحظته مرارًا'],['دفتر العلوم','تُسجّل فيه الملاحظات والبيانات'],['المجلات العلمية','تُنشر دوريًّا لتوثيق النتائج'],['التنبؤ','توقّع ما سيحدث'],['المقارنة','تحديد أوجه الشبه والاختلاف'],['الحاسوب','مثال على التقنية'],['الاستدلال','الاستنتاج من الأدلة'],['النمذجة','صنع نموذج لشيء يصعب رؤيته'],['التجريب','اختبار الفرضية بتجربة'],['الأدلة','يجمعها العالم كالمحقق'],['الخبرات السابقة','يتوقع بها العالم النتائج']],'x1');},
 reset(){STN.x1.e.reset();},explain:'<p>مسابقتان إثرائيتان مقترحتان.</p>'});
def('x2',{n:'إثرائي · جولة البرق',eyebrow:'إثرائي · جولة البرق ولوحة الخيارات',title:'جولة البرق ولوحة الخيارات',goal:'صح أم خطأ بسرعة، ثم اختر ثلاث مهام في خط واحد.',plan:4,icon:'<path d="M44 6L18 46h18l-6 28 28-42H40z" fill="currentColor"/>',
 body:'<div class="card"><div id="x2tf"></div></div><div class="card"><h3>لوحة الخيارات 3 × 3</h3><div id="x2cb"></div></div>',
 init(){tfRound($('#x2tf'),[['يمكن الاعتماد على الحواس وحدها في قياس درجة الحرارة بدقة.',false,'نحتاج الثرمومتر.'],['التقنية تطبيق للعلم.',true],['القانون العلمي يفسر سبب الظاهرة.',false,'القانون يصف، والنظرية تفسر.'],['المجلات العلمية تُنشر دوريًّا.',true],['يستخدم العالم الأدلة كالمحقق.',true],['الحاسوب مثال على التقنية.',true],['دفتر العلوم لتسجيل الملاحظات فقط.',false,'وأيضًا الحسابات والخطط والجداول والرسوم.']],'x2',{secs:10});
  STN.x2.cb=choiceBoard($('#x2cb'),[
   {ic:'✍️',t:'اكتب',kind:'كتابة',p:'اكتب في دفترك الفرق بين العلم والتقنية بمثال لكل منهما.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'أداة قياس الكتلة:',o:['الميزان','المسطرة','الثرمومتر','الساعة'],a:0},{ic:'🔬',t:'جرّب',kind:'تجربة',p:'جرّب تجربة الأوعية الثلاثة في البيت بماء آمن (فاتر وبارد ودافئ غير ساخن) وسجّل ما شعرت به.'},
   {ic:'❓',t:'سؤال',kind:'اختيار',q:'«تتمدد الأجسام بالحرارة»:',o:['قانون','نظرية','رأي','فرضية'],a:0},{ic:'🗺',t:'خريطة مفاهيم',kind:'تنظيم',p:'ارسم خريطة مفاهيم لمهارات العلم التسع.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'يتوقع العالم النتائج مستعينًا بـ:',o:['خبراته السابقة','الحظ','آراء الآخرين','الألوان'],a:0},
   {ic:'📸',t:'لاحظ',kind:'ملاحظة',p:'سجّل خمس ملاحظات عن مطبخ بيتك مستخدمًا ثلاث حواس على الأقل (دون تذوق أي مادة غير معروفة).'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'من وسائل التواصل العلمي:',o:['المجلات العلمية','الكتب','اللقاءات العلمية','جميع ما سبق'],a:3},{ic:'🎨',t:'صمّم',kind:'رسم',p:'صمّم غلافًا لدفتر العلوم الخاص بك يعبّر عن مهارات العلماء.'}],'x2',()=>G.complete('x2'));},
 reset(){STN.x2.cb.reset();},explain:'<p>نشاطان إثرائيان مقترحان.</p>'});

def('ch',{n:'تحدي العلماء',plan:3,icon:ICO.cup,eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من تقويم العرض. لكل سؤال محاولتان.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'العلم',q:'طريقة تستخدم في استقصاء ما يحدث حولنا:',o:['المعرفة','العلم','الفلسفة','التواصل'],a:1},
  {k:'التقنية',q:'تطبيق العلوم لصنع المنتجات والأدوات التي يستخدمها الناس:',o:['الفرضية','النظرية','القانون','التقنية'],a:3},
  {k:'التواصل',q:'أي مما يلي يُستخدم للتواصل العلمي:',o:['المجلات العلمية','الكتب','اللقاءات العلمية','جميع ما سبق صحيح'],a:3},
  {k:'القياس',q:'نقيس الكتلة باستخدام:',o:['الميزان','المسطرة','الثرمومتر','الحاسوب'],a:0},
  {k:'القانون',q:'قواعد تصف نمطًا أو سلوكًا معيّنًا في الطبيعة:',o:['القانون العلمي','النظرية العلمية','الفرضية','الرأي'],a:0},
  {k:'المهارات',t:'multi',q:'اختر كل مهارات العلم:',items:[['الملاحظة',1],['القياس',1],['التنبؤ',1],['التخمين العشوائي',0],['النسخ دون فهم',0]],why:'المهارات العلمية منظمة ومبنية على الأدلة.'},
  {k:'سلوك العلماء',q:'يتصرف العالم كمحقق عندما:',o:['يجمع الأدلة ويتتبعها','يحفظ المعلومات','يرسم صورة جميلة','يغيّر رأيه بلا سبب'],a:0}],'ch');},
 reset(){STN.ch.c.reset();}});

C6.plan({intro:{s:['poe','brain'],g:'١ و٢',sk:'التنبؤ',ev:'سؤال التوقع'},fold:{s:['kwl'],g:'١ و٢',sk:'الاستدعاء',ev:'توجيه القراءة'},goals:{s:['frayer'],g:'١ و٢',sk:'التذكر',ev:'بطاقات المفردات'},
 s1:{s:['disc','cards'],g:'١',sk:'الملاحظة',ev:'مطابقة الأدوات'},lab1:{s:['poe','inq'],g:'١ و٢',sk:'التجريب والمقارنة',ev:'تجربة الأوعية'},s2:{s:['brain','coop'],g:'١',sk:'التصنيف',ev:'تصنيف الأسئلة'},s3:{s:['venn','cards'],g:'١',sk:'المقارنة',ev:'قانون أم نظرية'},
 s4:{s:['story','disc'],g:'١',sk:'الاستنتاج',ev:'سلوك العلماء'},s5:{s:['jigsaw','sticks'],g:'٢',sk:'التصنيف',ev:'المهارات الثلاث'},lab2:{s:['inq','game'],g:'٢',sk:'القياس',ev:'محطة الأدوات'},s6:{s:['tps'],g:'٢',sk:'التواصل',ev:'دفتر العلوم'},
 ev1:{s:['heads','cards'],g:'١ و٢',sk:'التطبيق',ev:'تقويم 1–3'},sum:{s:['tl'],g:'١ و٢',sk:'التلخيص',ev:'إشارة المرور'},self:{s:['heads','sticks'],g:'١ و٢',sk:'التفكير الناقد',ev:'اختبر نفسك'},x1:{s:['game','champ'],g:'١ و٢',sk:'الاستدعاء',ev:'الخزانة والبنغو'},x2:{s:['cards','game'],g:'١ و٢',sk:'الاستدعاء',ev:'جولة البرق'},ch:{s:['exit'],g:'١ و٢',sk:'التقويم الختامي',ev:'تحدي العلماء'}},'g9c1l1');
K.boot({chapter:'الفصل الأول: طبيعة العلم',chapterShort:'الفصل الأول',title:'دفتر العالِم الصغير',lesson:'الدرس الأول: أسلوب العلم',accent:'#9f1239',accentDark:'#fb7185',hook:'كيف يفكّر العلماء… وكيف تفكّر مثلهم؟',
 riddle:'أيهما تصدّق: يدك اليمنى أم اليسرى؟ وكيف يصل العلماء إلى إجابات يثقون بها؟',predict:{o:['بالملاحظة المنظمة واستخدام أدوات القياس والتواصل بالنتائج','بالاعتماد على الحواس وحدها','بالتخمين وآراء الناس'],a:0},
 answer:'الحواس مفيدة لكنها قد تخدعنا، لذلك يستخدم العلماء أدوات القياس (الثرمومتر والمسطرة والميزان) ومهارات العلم، ويسجلون بياناتهم في دفتر العلوم ويتواصلون بنتائجهم.',
 finalTitle:'مبارك! أصبح لديك دفتر عالِم',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 25 · التسليم يوم الخميس.',
 concepts:[{n:'العلم',t:'طريقة لاستقصاء ما يجري حولك والإجابة عن أسئلتك.',ic:'<circle cx="24" cy="24" r="14" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'التقنية',t:'تطبيق العلم لصنع منتجات وأدوات.',ic:'<rect x="8" y="12" width="32" height="22" rx="3" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'أدوات القياس',t:'الثرمومتر للحرارة، والمسطرة للطول، والميزان للكتلة.',ic:'<path d="M24 6v28" stroke="var(--accent)" stroke-width="6"/><circle cx="24" cy="38" r="6" fill="var(--accent)"/>'},{n:'القانون والنظرية',t:'القانون يصف، والنظرية تفسّر.',ic:'<text x="24" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="var(--accent)">⚖</text>'},{n:'مهارات العلم',t:'الملاحظة والقياس والمقارنة والتنبؤ وغيرها.',ic:'<circle cx="24" cy="24" r="8" fill="var(--accent)"/>'},{n:'التواصل',t:'المجلات العلمية ودفتر العلوم.',ic:'<rect x="12" y="6" width="24" height="36" rx="3" fill="none" stroke="var(--accent)" stroke-width="4"/>'}]});
$$('.top h1').forEach(h=>h.dataset.sym='🔬');
})();

