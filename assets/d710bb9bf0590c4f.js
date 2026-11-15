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
  var LISTS = [['1/1', '2/1', '3/1', '4/1'], ['1/2'], ['1/3', '2/3', '3/3', '4/3']];
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
    var all = [].concat.apply([], LISTS), G = {}, done = 0, okc = 0;
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

(function(){
/* ===== محرك ملفات القضايا المشترك (الفصل الأول) ===== */
"use strict";
var CFG=window.LESSON_CFG||{key:'lx',title:'',sub:''}, KEY=CFG.key;
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var AR='٠١٢٣٤٥٦٧٨٩'; function n(x){return String(x).replace(/\d/g,function(d){return AR[d]})}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function ls(k,v){ try{ if(v===undefined){ var x=localStorage.getItem(k); return x?JSON.parse(x):null } localStorage.setItem(k,JSON.stringify(v)) }catch(e){ return null } }
function shuffle(a,seed){ a=a.slice(); var s=seed||7; function r(){ s=(s*1103515245+12345)&0x7fffffff; return s/0x7fffffff } for(var i=a.length-1;i>0;i--){ var j=Math.floor(r()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t } return a }
var IMG=window.LESSON_IMG||{};
function img(k,st){ return IMG[k]?'<img loading="lazy" decoding="async" src="'+IMG[k]+'" alt="" style="'+(st||'')+'">':'' }
var KC=['#F2545B','#3D8BFD','#E8A21B','#18A058'], KL=['أ','ب','ج','د'];

/* الصوت */
var SND={on:ls('ch1_snd')!==false, ac:null};
function tone(fs,d,type,v){ if(!SND.on) return; try{ SND.ac=SND.ac||new (window.AudioContext||window.webkitAudioContext)(); var t=SND.ac.currentTime;
  fs.forEach(function(f,i){ var o=SND.ac.createOscillator(), g=SND.ac.createGain(); o.type=type||'sine'; o.frequency.value=f; g.gain.setValueAtTime(0.0001,t+i*d); g.gain.exponentialRampToValueAtTime(v||0.2,t+i*d+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+(i+1)*d+0.05); o.connect(g); g.connect(SND.ac.destination); o.start(t+i*d); o.stop(t+(i+1)*d+0.1) }) }catch(e){} }
var sfx={ ok:function(){tone([660,880,1100],0.09)}, no:function(){tone([260,200],0.15,'triangle',0.15)}, pop:function(){tone([520],0.06,'sine',0.12)}, tick:function(){tone([1000],0.04,'square',0.05)},
  win:function(){tone([523,659,784,1046,1318],0.11)}, splash:function(){ tone([180,140,110],0.07,'triangle',0.12) }, whoosh:function(){ tone([300,500,800],0.05,'sine',0.06) }, thud:function(){ tone([120,90],0.08,'triangle',0.18) } };

function confetti(){ var c=$('#confetti'), g=c.getContext('2d'); c.width=1280; c.height=720; var P=[], cols=['#FFC53D','#F2545B','#16B5A6','#7B6CF6','#3D8BFD','#7BC74D'];
  for(var i=0;i<160;i++) P.push({x:640+(Math.random()-0.5)*300,y:360,vx:(Math.random()-0.5)*18,vy:-Math.random()*16-4,r:Math.random()*6.28,s:6+Math.random()*8,c:cols[i%6]});
  var t=0; (function f(){ g.clearRect(0,0,1280,720); P.forEach(function(p){ p.x+=p.vx; p.y+=p.vy; p.vy+=0.45; p.vx*=0.99; p.r+=0.2; g.save(); g.translate(p.x,p.y); g.rotate(p.r); g.fillStyle=p.c; g.fillRect(-p.s/2,-p.s/4,p.s,p.s/2); g.restore() }); if(++t<150) requestAnimationFrame(f); else g.clearRect(0,0,1280,720) })() }
function toast(msg,ok){ $$('.toastx').forEach(function(x){x.remove()}); var t=document.createElement('div'); t.className='toastx pop '+(ok===false?'fb no':ok?'fb ok':'fb'); if(ok===undefined){ t.style.background='#fff' } t.innerHTML=msg; $('#stage').appendChild(t); setTimeout(function(){ t.remove() },2800) }
function zoom(html,w){ var z=document.createElement('div'); z.className='zoom'; z.innerHTML='<div class="card pop" style="display:block;width:'+(w||820)+'px"><span class="tape"></span>'+html+'<button class="btn ghost sm" data-x style="margin-top:14px">إغلاق</button></div>';
  $('#stage').appendChild(z); sfx.whoosh(); z.addEventListener('click',function(ev){ if(ev.target===z||ev.target.closest('[data-x]')) z.remove() }); return z }

/* الحالة */
var ST=ls(KEY+'_state')||{done:{}}; ST.teams=ls('ch1_teams')||['الفريق الأول','الفريق الثاني'];
function save(){ ls(KEY+'_state',{done:ST.done}); ls('ch1_teams',ST.teams) }
function done(id){ if(!ST.done[id]){ ST.done[id]=1; save(); stamps() } }
var TEAMC=['#F2545B','#3D8BFD'];

/* السحب والإفلات */
function dragkit(root,opts){
  var sel=null, drag=null, ox=0, oy=0;
  function scale(){ return Number($('#stage').dataset.k)||1 }
  root.addEventListener('pointerdown',function(e){ var c=e.target.closest(opts.chip); if(!c||c.classList.contains('locked')) return;
    e.preventDefault(); var r=c.getBoundingClientRect(); drag={c:c,clone:c.cloneNode(true),x0:e.clientX,y0:e.clientY,moved:false,w:r.width,h:r.height};
    ox=e.clientX-r.left; oy=e.clientY-r.top; root.setPointerCapture&&root.setPointerCapture(e.pointerId) });
  root.addEventListener('pointermove',function(e){ if(!drag) return; if(!drag.moved&&Math.hypot(e.clientX-drag.x0,e.clientY-drag.y0)<8) return;
    if(!drag.moved){ drag.moved=true; var k=scale(); drag.clone.classList.add('drag'); drag.clone.style.width=drag.w+'px'; drag.clone.style.fontSize=(19*k)+'px'; drag.clone.style.padding=(10*k)+'px '+(18*k)+'px'; document.body.appendChild(drag.clone); drag.c.classList.add('ghost'); sfx.pop() }
    drag.clone.style.left=(e.clientX-ox)+'px'; drag.clone.style.top=(e.clientY-oy)+'px';
    var b=hit(e); $$(opts.bin,root).forEach(function(x){ x.classList.toggle('hot',x===b) }) });
  function hit(e){ var el=document.elementFromPoint(e.clientX,e.clientY); return el&&el.closest(opts.bin) }
  function end(e){ if(!drag) return; var d=drag; drag=null; $$(opts.bin,root).forEach(function(x){ x.classList.remove('hot') });
    if(d.moved){ d.clone.remove(); d.c.classList.remove('ghost'); var b=hit(e); if(b) opts.drop(d.c,b) }
    else { if(sel===d.c){ sel.classList.remove('sel'); sel=null } else { if(sel) sel.classList.remove('sel'); sel=d.c; sel.classList.add('sel'); sfx.pop() } } }
  root.addEventListener('pointerup',end); root.addEventListener('pointercancel',function(){ if(drag){ drag.clone.remove(); drag.c.classList.remove('ghost'); drag=null } });
  root.addEventListener('click',function(e){ var b=e.target.closest(opts.bin); if(b&&sel&&!e.target.closest(opts.chip)){ var c=sel; sel.classList.remove('sel'); sel=null; opts.drop(c,b) } });
}

/* ================= المشاهد ================= */
var SCR=[];
function add(id,title,render){ SCR.push({id:id,title:title,render:render}) }
function head(k,h,size,extra){ return '<div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><span class="kicker">'+k+'</span><h2 class="h1" style="font-size:'+(size||36)+'px">'+h+'</h2></div>'+(extra||'')+'</div>' }

/* كشف تدريجي: يفتح العناصر بالضغط أو بزر التالي */
function revealer(el,sel,id,cls){ cls=cls||'open'; var R=$$(sel,el);
  function chk(){ if(id&&R.every(function(x){return x.classList.contains(cls)})) done(id) }
  el.addEventListener('click',function(e){ var r=e.target.closest(sel); if(r&&!r.classList.contains(cls)){ r.classList.add(cls); sfx.pop(); chk() } });
  return {next:function(){ var c=R.filter(function(x){return !x.classList.contains(cls)})[0]; if(c){ c.classList.add(cls); sfx.pop(); chk(); return true } return false }} }

/* تحقق سريع داخل شاشة مفهوم */
function quick(host,Q,id,title){
  var qi=0;
  host.innerHTML='<div class="row" style="justify-content:space-between"><b class="disp" style="font-size:23px;color:var(--coral)">'+(title||'تحقق سريع')+'</b><span class="muted" data-qn></span></div><div data-qb></div>';
  function draw(){ var q=Q[qi]; $('[data-qn]',host).textContent=n(qi+1)+' / '+n(Q.length);
    $('[data-qb]',host).innerHTML='<p style="margin:4px 0 8px;font-weight:600">'+esc(q.q)+'</p><div class="mini" style="grid-template-columns:repeat('+(q.o.length>2?2:q.o.length)+',1fr)">'+q.o.map(function(o,j){return '<button class="opt" data-j="'+j+'"><span class="k" style="background:'+KC[j]+'">'+KL[j]+'</span>'+esc(o)+'</button>'}).join('')+'</div><div data-qf style="margin-top:8px"></div>' }
  host.addEventListener('click',function(e){ if(e.target.closest('[data-nq]')){ qi++; draw(); return }
    var b=e.target.closest('.opt'); if(!b||$('.opt.ok',host)) return; var q=Q[qi], j=Number(b.dataset.j);
    if(j===q.a){ b.classList.add('ok'); $$('.opt',host).forEach(function(x){ if(x!==b) x.classList.add('dim') }); sfx.ok(); $('[data-qf]',host).innerHTML='<div class="fb ok pop">أحسنت! '+esc(q.ex)+(qi<Q.length-1?' <button class="btn sm" data-nq style="margin-inline-start:10px">السؤال التالي</button>':'')+'</div>'; if(qi===Q.length-1&&id) done(id) }
    else { b.classList.add('no','shake'); sfx.no(); $('[data-qf]',host).innerHTML='<div class="fb no pop">ليس تمامًا… فكّر مرة أخرى.</div>' } });
  draw() }

/* مهام الملف */
function goalsScreen(objs,map,extra){
  add('goals','مهام الملف',function(el){
    el.innerHTML='<div><span class="kicker">أهداف الدرس</span><h2 class="h1" style="font-size:40px">مهامك في هذا الملف</h2><p class="lead" style="font-size:19px;margin:4px 0 0">كل مهمة تنجزها تُختم بالأصفر في الشريط العلوي.</p></div>'+(extra||'')+
     '<div class="missions" style="grid-template-columns:1fr 1fr;gap:12px">'+objs.map(function(o,i){ var d=(map[i]||[]).every(function(x){return ST.done[x]}); return '<div class="mi'+(d?' done':'')+'" style="animation:enter .5s '+(i*0.08)+'s both;padding:8px 18px"><span class="n">'+(d?'✓':n(i+1))+'</span><span>'+esc(o)+'<small style="display:block;color:var(--ink2);font-size:16px">تنجزها في: '+map[i].map(function(x){ var s=SCR.filter(function(y){return y.id===x})[0]; return s?esc(s.title):'' }).join('، ')+'</small></span></div>'}).join('')+'</div>';
    done('goals'); return {} }) }

/* نشاط تصنيف بالسحب مع تصحيح فوري */
function classifyScreen(o){
  add(o.id,o.title,function(el){
    var items=shuffle(o.items.map(function(c,i){return {t:c[0],c:c[1],i:i}}),o.seed||42), right=0, tries=0;
    el.innerHTML=head('نشاط تفاعلي',o.h,34,'<div class="score">صحيح <b data-sc>٠</b> من '+n(items.length)+' <button class="btn ghost sm" data-rs style="margin-inline-start:12px">إعادة</button></div>')+
     '<div class="pool card" id="pool" style="padding:12px;background:rgba(255,255,255,.08);box-shadow:none">'+items.map(function(it){return '<div class="chip" data-i="'+it.i+'">'+esc(it.t)+'</div>'}).join('')+'</div>'+
     '<div class="bins" style="grid-template-columns:repeat('+o.bins.length+',1fr)">'+o.bins.map(function(b,i){return '<div class="bin '+b[2]+'" data-b="'+i+'"><h3>'+b[0]+'<small>'+b[1]+'</small></h3><div class="got"></div></div>'}).join('')+'</div>';
    dragkit(el,{chip:'#pool .chip',bin:'.bin',drop:function(c,b){ var it=o.items[Number(c.dataset.i)], bi=Number(b.dataset.b); tries++;
      if(it[1]===bi){ right++; c.remove(); var x=document.createElement('div'); x.className='chip locked pop'; x.textContent=it[0]; $('.got',b).appendChild(x); sfx.ok(); toast('✓ صحيح: '+(it[2]||o.why[bi]),true); $('[data-sc]',el).textContent=n(right);
        if(right===o.items.length){ sfx.win(); confetti(); done(o.id); toast('أنجزت النشاط! '+n(right)+' إجابات صحيحة من '+n(tries)+' محاولة',true) } }
      else { c.classList.add('shake'); setTimeout(function(){ c.classList.remove('shake') },500); sfx.no(); toast('✗ ليست في «'+o.bins[bi][0]+'». تذكّر: '+o.why[it[1]],false) } }});
    el.addEventListener('click',function(e){ if(e.target.closest('[data-rs]')) show(cur,true) });
    return {} }) }

/* سباق جماعي بممرات */
function raceScreen(o){
  add(o.id,o.title,function(el){
    var Q=[]; o.cases.forEach(function(r,ri){ shuffle(r.f,ri+3).forEach(function(f){ Q.push({r:ri,t:f[0],a:f[1],ex:f[2]}) }) });
    var i=0, team=0, pts=[0,0], tried={}, left=15, iv=null, total=Q.length, L=o.lanes;
    el.innerHTML=head('سباق جماعي',o.h,32,'<div class="tmr" data-tm>١٥</div>')+
     '<div class="track">'+[0,1].map(function(t){return '<div class="lane"><span class="flag">🏁</span><span class="pts" data-p="'+t+'">٠</span><div class="runner" data-r="'+t+'"><i style="background:'+TEAMC[t]+'">'+(t?'ب':'أ')+'</i><span>'+esc(ST.teams[t])+'</span></div></div>'}).join('')+'</div>'+
     '<div class="racewrap"><div class="card" data-exp style="display:flex;flex-direction:column;gap:8px;padding:14px 18px;overflow:hidden"></div><div class="card" style="display:flex;flex-direction:column;gap:14px;justify-content:center"><div class="teamsel">'+[0,1].map(function(t){return '<button data-t="'+t+'" style="background:'+TEAMC[t]+'">يجيب: '+esc(ST.teams[t])+'</button>'}).join('')+'</div>'+
     '<div class="factor" data-fac></div><div class="lanes3" style="grid-template-columns:repeat('+L.length+',1fr)">'+L.map(function(l,k){return '<button data-l="'+k+'" style="background:'+l[1]+'">'+l[0]+'</button>'}).join('')+'</div><div data-rf style="min-height:44px"></div></div></div>';
    function exp(){ var r=o.cases[Q[i].r]; $('[data-exp]',el).innerHTML='<b class="disp" style="font-size:24px;color:var(--coral);line-height:1.3">'+r.name+'</b>'+(r.img&&IMG[r.img]?'<img loading="lazy" decoding="async" src="'+IMG[r.img]+'" style="width:100%;height:150px;object-fit:contain;border-radius:10px" alt="">':'')+'<p style="margin:0;font-size:18px;line-height:1.5">'+r.desc+'</p><span class="muted" style="font-size:15px;margin-top:auto">'+(o.unit||'السؤال')+' '+n(i+1)+' من '+n(total)+'</span>' }
    function teamUI(){ $$('.teamsel button',el).forEach(function(b){ b.classList.toggle('on',Number(b.dataset.t)===team) }) }
    function move(){ [0,1].forEach(function(t){ $('[data-r="'+t+'"]',el).style.right=Math.min(84,pts[t]/(total*18)*84)+'%'; $('[data-p="'+t+'"]',el).textContent=n(pts[t]) }) }
    function ask(){ tried={}; left=15; $('[data-fac]',el).innerHTML='<span class="pop" style="display:inline-block;font-size:'+(Q[i].t.length>60?27:Q[i].t.length>36?31:36)+'px">'+esc(Q[i].t)+'</span>'; $('[data-rf]',el).innerHTML=''; exp(); teamUI(); $$('.lanes3 button',el).forEach(function(b){b.disabled=false}); timer() }
    function timer(){ clearInterval(iv); $('[data-tm]',el).textContent=n(left); iv=setInterval(function(){ left--; var tm=$('[data-tm]',el); tm.textContent=n(Math.max(0,left)); tm.classList.toggle('low',left<=5); if(left<=5&&left>0) sfx.tick();
        if(left<=0){ clearInterval(iv); reveal('انتهى الوقت!') } },1000) }
    function reveal(m){ clearInterval(iv); $$('.lanes3 button',el).forEach(function(b){b.disabled=true}); var q=Q[i]; $('[data-rf]',el).innerHTML='<div class="fb ok pop" style="font-size:18px">'+(m?m+' ':'')+'الإجابة: <b>'+L[q.a][0]+'</b>'+(q.ex?' — '+esc(q.ex):'')+' <button class="btn sm" data-nx style="margin-inline-start:8px">'+(i<total-1?'التالي':'النتيجة')+'</button></div>' }
    function finish(){ clearInterval(iv); var w=pts[0]===pts[1]?-1:pts[0]>pts[1]?0:1; sfx.win(); confetti(); done(o.id);
      $('[data-fac]',el).innerHTML='<span class="pop" style="display:inline-block">'+(w<0?'تعادل!':'الفائز: '+esc(ST.teams[w]))+'</span>'; $('[data-rf]',el).innerHTML=''; $$('.lanes3 button',el).forEach(function(b){b.disabled=true}) }
    el.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return;
      if(b.dataset.t!==undefined){ team=Number(b.dataset.t); teamUI(); sfx.pop(); return }
      if(b.dataset.l!==undefined){ if(tried[team]) return; tried[team]=1; var k=Number(b.dataset.l);
        if(k===Q[i].a){ pts[team]+=10+left; move(); sfx.ok(); reveal('✓ صحيح! +'+n(10+left)+' لـ'+esc(ST.teams[team])+'.') }
        else { sfx.no(); b.classList.add('shake'); var ot=1-team; if(!tried[ot]){ team=ot; teamUI(); $('[data-rf]',el).innerHTML='<div class="fb no pop">✗ خطأ! فرصة لـ'+esc(ST.teams[ot])+' لسرقة النقاط.</div>' } else reveal('✗ لم يُجب أحد بشكل صحيح.') } return }
      if(b.hasAttribute('data-nx')){ if(i<total-1){ i++; team=1-team; ask() } else finish() } });
    move(); ask();
    return {destroy:function(){ clearInterval(iv) }} }) }

/* بطاقة عملية للمجموعات */
function sheetScreen(o){
  var SK=KEY+'_sheets_'+o.id;
  add(o.id,o.title,function(el){
    var G=ls(SK)||[{},{},{},{}], g=0;
    function fld(f,d){ var lab='<label>'+f.label+'</label>';
      if(f.t==='seg') return '<div class="fld'+(f.full?' full':'')+'">'+lab+'<div class="seg" data-c="'+f.k+'">'+f.opts.map(function(op){return '<button data-v="'+op[0]+'" class="'+(d[f.k]===op[0]?'on':'')+'">'+op[1]+'</button>'}).join('')+'</div>'+(f.k2?'<input data-k="'+f.k2+'" value="'+esc(d[f.k2]||'')+'" placeholder="'+(f.ph2||'')+'">':'')+'</div>';
      if(f.t==='input') return '<div class="fld'+(f.full?' full':'')+'">'+lab+'<input data-k="'+f.k+'" value="'+esc(d[f.k]||'')+'" placeholder="'+(f.ph||'')+'"></div>';
      return '<div class="fld'+(f.full?' full':'')+'">'+lab+'<textarea data-k="'+f.k+'" rows="'+(f.rows||2)+'" placeholder="'+(f.ph||'')+'">'+esc(d[f.k]||'')+'</textarea></div>' }
    function draw(){ var d=G[g];
      el.innerHTML='<div class="row" style="justify-content:space-between;align-items:flex-end;flex-wrap:nowrap"><div><span class="kicker">'+(o.kicker||'نشاط عملي في الفصل')+'</span><h2 class="h1" style="font-size:32px">'+o.h+'</h2></div><div class="gtabs">'+G.map(function(_,i){return '<button data-g="'+i+'" class="'+(i===g?'on':'')+'">المجموعة '+n(i+1)+'</button>'}).join('')+'</div></div>'+
       '<div class="card sheet" style="border-radius:0 18px 18px 18px;padding:14px 22px;align-content:start">'+(o.task?'<div class="full" style="font-size:18px;background:#FFF7E0;border-radius:10px;padding:6px 14px">'+o.task+'</div>':'')+o.fields.map(function(f){return fld(f,d)}).join('')+'</div>'+
       '<div class="row" style="justify-content:flex-end"><span style="color:#9FB0CC;font-size:16px">تُحفظ البطاقة تلقائيًا على هذا الجهاز</span><button class="btn ghost sm" data-clear>مسح بطاقة المجموعة</button>'+(window.self===window.top?'<button class="btn sm" data-print>طباعة البطاقات</button>':'')+'</div>' }
    draw();
    el.addEventListener('input',function(e){ var k=e.target.dataset.k; if(k){ G[g][k]=e.target.value; ls(SK,G); done(o.id) } });
    el.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return;
      if(b.dataset.g){ g=Number(b.dataset.g); draw(); sfx.pop(); return }
      var c=b.closest('[data-c]'); if(c){ G[g][c.dataset.c]=b.dataset.v; ls(SK,G); draw(); sfx.pop(); done(o.id); return }
      if(b.hasAttribute('data-clear')){ G[g]={}; ls(SK,G); draw(); return }
      if(b.hasAttribute('data-print')) printSheets(o,G) });
    return {} }) }
function printSheets(o,G){ var w=window.open('','_blank'); if(!w){ toast('افتح الملف في المتصفح مباشرة لتتمكن من الطباعة',false); return }
  function val(f,d){ if(f.t==='seg'){ var p=f.opts.filter(function(x){return x[0]===d[f.k]})[0]; return (p?p[1]:'—')+(f.k2&&d[f.k2]?' · '+esc(d[f.k2]):'') } return esc(d[f.k]||'') }
  w.document.write('<html dir="rtl"><head><meta charset="utf-8"><title>'+esc(o.h)+'</title><style>body{font-family:Tahoma,sans-serif;padding:20px}.c{border:2px solid #333;border-radius:10px;padding:12px 16px;margin-bottom:14px;page-break-inside:avoid}h2{margin:0 0 8px}td{padding:5px 8px;border-bottom:1px solid #ccc;vertical-align:top;min-width:120px}td:first-child{font-weight:bold;width:30%}</style></head><body><h1 style="font-size:20px">'+esc(o.h)+'</h1>'+
    G.map(function(d,i){ return '<div class="c"><h2>المجموعة '+(i+1)+'</h2><table>'+o.fields.map(function(f){return '<tr><td>'+f.label+'</td><td>'+val(f,d)+'</td></tr>'}).join('')+'</table></div>' }).join('')+'</body></html>');
  w.document.close(); w.focus(); setTimeout(function(){ w.print() },300) }

/* المسابقة الجماعية */
function compScreen(o){
  add('comp','المسابقة الجماعية',function(el){
    var i=-1, team=0, sc=[0,0], tried={}, left=25, iv=null, Q=window.LESSON_COMP||[];
    el.innerHTML=head('مسابقة جماعية',o.h,34,'<div class="tmr" data-tm>—</div>')+'<div class="prog"><i data-pg style="width:0"></i></div>'+
     '<div class="quiz"><div class="card qcard" data-qc></div><div class="board">'+[0,1].map(function(t){return '<div class="tm" data-tmc="'+t+'" style="background:'+TEAMC[t]+'"><span contenteditable="true" spellcheck="false" data-tn="'+t+'">'+esc(ST.teams[t])+'</span><b data-s="'+t+'">٠</b><button class="btn sm ghost" data-t="'+t+'" style="font-size:16px;margin-top:4px">يجيب الآن</button></div>'}).join('')+
     '<p style="color:#9FB0CC;font-size:15px;margin:0">الفريق الذي يرفع يده أولًا يجيب. الإجابة الصحيحة: ١٠ نقاط + الوقت المتبقي ÷ ٥. الخطأ يمنح الفريق الآخر فرصة.</p></div></div>';
    function teamUI(){ [0,1].forEach(function(t){ $('[data-tmc="'+t+'"]',el).style.outline=t===team?'4px solid #fff':'none'; $('[data-s="'+t+'"]',el).textContent=n(sc[t]) }); var Ld=sc[0]===sc[1]?-1:sc[0]>sc[1]?0:1; [0,1].forEach(function(t){ $('[data-tmc="'+t+'"]',el).classList.toggle('lead',t===Ld) }) }
    function intro(){ $('[data-qc]',el).innerHTML='<div style="margin:auto;text-align:center;display:grid;gap:14px"><b class="disp" style="font-size:44px">'+n(Q.length)+' أسئلة</b><span class="muted">لكل سؤال ٢٥ ثانية، وبعد كل سؤال تفسير للإجابة.</span><div><button class="btn" data-start>ابدأ المسابقة</button></div></div>' }
    function ask(){ var q=Q[i]; tried={}; left=25; $('[data-pg]',el).style.width=(i/Q.length*100)+'%';
      $('[data-qc]',el).innerHTML='<span class="muted">السؤال '+n(i+1)+' من '+n(Q.length)+'</span><div class="qtext pop" style="font-size:'+(q.q.length>70?28:34)+'px">'+esc(q.q)+'</div><div class="qopts">'+q.o.map(function(op,j){return '<button class="opt" data-j="'+j+'"><span class="k" style="background:'+KC[j]+'">'+KL[j]+'</span>'+esc(op)+'</button>'}).join('')+'</div><div data-qf></div>';
      clearInterval(iv); var tm=$('[data-tm]',el); tm.textContent=n(left); iv=setInterval(function(){ left--; tm.textContent=n(Math.max(0,left)); tm.classList.toggle('low',left<=5); if(left<=5&&left>0) sfx.tick(); if(left<=0){ clearInterval(iv); reveal(null,'انتهى الوقت!') } },1000); teamUI() }
    function reveal(pick,m){ clearInterval(iv); var q=Q[i]; $$('[data-qc] .opt',el).forEach(function(b){ var j=Number(b.dataset.j); b.classList.add(j===q.a?'ok':j===pick?'no':'dim') });
      $('[data-qf]',el).innerHTML='<div class="expl pop">'+(m?'<b>'+m+'</b> ':'')+'<b>التفسير:</b> '+esc(q.ex)+'</div><div class="row" style="margin-top:10px"><button class="btn sm" data-nx>'+(i<Q.length-1?'السؤال التالي':'النتيجة النهائية')+'</button></div>' }
    function finish(){ $('[data-pg]',el).style.width='100%'; var w=sc[0]===sc[1]?-1:sc[0]>sc[1]?0:1; sfx.win(); confetti(); done('comp');
      $('[data-qc]',el).innerHTML='<div style="margin:auto;text-align:center;display:grid;gap:10px"><span class="kicker" style="justify-content:center">النتيجة النهائية</span><b class="disp" style="font-size:54px;color:'+(w<0?'var(--ink)':TEAMC[w])+'">'+(w<0?'تعادل!':'فاز '+esc(ST.teams[w])+'!')+'</b><span class="muted" style="font-size:24px">'+esc(ST.teams[0])+': '+n(sc[0])+' · '+esc(ST.teams[1])+': '+n(sc[1])+'</span></div>' }
    el.addEventListener('input',function(e){ var t=e.target.dataset.tn; if(t!==undefined){ ST.teams[Number(t)]=e.target.textContent.trim()||ST.teams[Number(t)]; save() } });
    el.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return;
      if(b.hasAttribute('data-start')){ i=0; ask(); return }
      if(b.dataset.t!==undefined){ team=Number(b.dataset.t); teamUI(); sfx.pop(); return }
      if(b.dataset.j!==undefined){ if(tried[team]||$('[data-qf] .expl',el)) return; tried[team]=1; var j=Number(b.dataset.j), q=Q[i];
        if(j===q.a){ var p=10+Math.floor(left/5); sc[team]+=p; sfx.ok(); teamUI(); reveal(j,'✓ صحيح! +'+n(p)+' لـ'+esc(ST.teams[team])+'.') }
        else { b.classList.add('no','shake'); sfx.no(); var ot=1-team; if(!tried[ot]){ team=ot; teamUI(); $('[data-qf]',el).innerHTML='<div class="fb no pop">✗ خطأ! فرصة لـ'+esc(ST.teams[ot])+'.</div>' } else reveal(j,'✗ لم يُجب أحد بشكل صحيح.') } return }
      if(b.hasAttribute('data-nx')){ if(i<Q.length-1){ i++; team=1-team; ask() } else finish() } });
    intro(); teamUI();
    return {destroy:function(){ clearInterval(iv) }, next:function(){ if(i<0){ i=0; ask(); return true } return false }} }) }

/* التقويم الختامي مع تقرير الإتقان */
function evalScreen(o){
  add('eval','التقويم الختامي',function(el){
    var i=0, res={}, Q=window.LESSON_EVAL||[], picked=[], CN=o.cn;
    function draw(){ var q=Q[i]; picked=[];
      el.innerHTML=head('تقويم ختامي','ماذا تعلّمت في هذا الملف؟',34,'<span style="color:#fff;font-size:20px;white-space:nowrap">السؤال '+n(i+1)+' من '+n(Q.length)+'</span>')+'<div class="prog"><i style="width:'+(i/Q.length*100)+'%"></i></div>'+
       '<div class="card qcard grow"><span class="pill q" style="align-self:flex-start">'+esc(CN[q.c]||'')+(q.multi?' · اختر إجابتين':'')+'</span>'+(q.img&&IMG[q.img]?'<div style="display:grid;grid-template-columns:1fr 200px;gap:16px;align-items:center"><div class="qtext pop" style="font-size:30px">'+esc(q.q)+'</div>'+img(q.img,'width:200px;height:150px;object-fit:contain')+'</div>':'<div class="qtext pop" style="font-size:'+(q.q.length>80?28:32)+'px">'+esc(q.q)+'</div>')+'<div class="qopts">'+q.o.map(function(op,j){return '<button class="opt" data-j="'+j+'"><span class="k" style="background:'+KC[j]+'">'+(q.tf?['✓','✗'][j]:KL[j])+'</span>'+esc(op)+'</button>'}).join('')+'</div>'+(q.multi?'<div><button class="btn sm" data-chk disabled>تحقّق</button></div>':'')+'<div data-qf></div></div>' }
    function judge(ok){ var q=Q[i]; res[q.c]=res[q.c]||[0,0]; res[q.c][1]++; if(ok) res[q.c][0]++;
      $$('.opt',el).forEach(function(b){ var j=Number(b.dataset.j), right=q.multi?q.a.indexOf(j)>=0:j===q.a; b.classList.add(right?'ok':picked.indexOf(j)>=0?'no':'dim') });
      ok?sfx.ok():sfx.no(); $('[data-qf]',el).innerHTML='<div class="expl pop"><b>'+(ok?'✓ إجابة صحيحة. ':'✗ ')+'</b>'+esc(q.ex)+'</div><div style="margin-top:10px"><button class="btn sm" data-nx>'+(i<Q.length-1?'التالي':'عرض النتيجة')+'</button></div>' }
    function report(){ var tot=0,ok=0; Object.keys(res).forEach(function(k){ tot+=res[k][1]; ok+=res[k][0] }); var pc=Math.round(ok/tot*100); done('eval'); if(pc>=70){ sfx.win(); confetti() }
      el.innerHTML=head('نتيجة التقويم الختامي',n(ok)+' من '+n(tot)+' · '+n(pc)+'٪',40,'<button class="btn ghost sm" data-again>إعادة التقويم</button>')+
       '<div class="card grow"><b class="disp" style="font-size:24px">إتقان المفاهيم الأساسية</b><div class="mast" style="margin-top:12px">'+Object.keys(res).map(function(k){ var r=res[k], p=Math.round(r[0]/r[1]*100), c=p>=100?'var(--good)':p>=50?'var(--tape)':'var(--coral)'; return '<div class="mrow"><span>'+esc(CN[k]||k)+'</span><div class="mbar"><i style="width:0;background:'+c+'" data-w="'+p+'"></i></div><b>'+n(p)+'٪</b></div>' }).join('')+'</div>'+
       '<p class="muted" style="font-size:17px;margin:14px 0 0">المفاهيم ذات الشريط الأحمر أو الأصفر تحتاج إلى مراجعة سريعة مع الطلاب قبل إغلاق الملف.</p></div>';
      setTimeout(function(){ $$('.mbar i',el).forEach(function(x){ x.style.width=x.dataset.w+'%' }) },60) }
    el.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return;
      if(b.hasAttribute('data-again')){ i=0; res={}; draw(); return }
      if(b.hasAttribute('data-nx')){ if(i<Q.length-1){ i++; draw() } else report(); return }
      if(b.dataset.j!==undefined&&!$('[data-qf] .expl',el)){ var q=Q[i], j=Number(b.dataset.j);
        if(q.multi){ var k=picked.indexOf(j); if(k>=0) picked.splice(k,1); else if(picked.length<2) picked.push(j); $$('.opt',el).forEach(function(x){ x.classList.toggle('sel',picked.indexOf(Number(x.dataset.j))>=0) }); $('[data-chk]',el).disabled=picked.length!==2; sfx.pop(); return }
        picked=[j]; judge(j===q.a); return }
      if(b.hasAttribute('data-chk')){ var q2=Q[i]; judge(picked.length===2&&picked.every(function(x){return q2.a.indexOf(x)>=0})) } });
    draw(); return {} }) }

/* الختام */
function endScreen(o){
  add('end',o.title,function(el){
    el.innerHTML='<div><span class="kicker">إغلاق الملف</span><h2 class="h1" style="font-size:42px">'+o.h+'</h2></div><div class="final">'+
     '<div class="card" style="overflow:hidden"><span class="tape"></span><b class="disp" style="font-size:26px">'+o.recapTitle+'</b>'+o.recap.map(function(s,i){return '<div class="chk" style="animation:enter .4s '+(i*0.12)+'s both;font-size:18.5px"><i>'+n(i+1)+'</i><span><b>'+s[0]+':</b> '+esc(s[1])+'</span></div>'}).join('')+'</div>'+
     '<div class="card"><span class="tape l"></span><b class="disp" style="font-size:26px">مهام الملف</b>'+o.objs.map(function(ob,i){ var d=(o.map[i]||[]).every(function(x){return ST.done[x]}); return '<div class="chk"><i style="background:'+(d?'var(--good)':'#C3CCDA')+'">'+(d?'✓':'·')+'</i><span>'+esc(ob)+'</span></div>'}).join('')+
     (o.hw?'<div style="margin-top:10px;background:var(--paper2);border-radius:12px;padding:8px 14px;font-size:17px"><b style="color:var(--coral)">الواجب:</b> '+o.hw.map(function(h,i){return '<div>'+n(i+1)+') '+esc(h)+'</div>'}).join('')+'</div>':'')+
     '<div class="row" style="margin-top:10px"><button class="btn sm ghost" data-reset>ملف جديد لحصة أخرى</button></div></div></div>';
    done('end'); sfx.win(); confetti();
    el.addEventListener('click',function(e){ if(e.target.closest('[data-reset]')){ ST.done={}; save(); SCR.forEach(function(s){ try{ localStorage.removeItem(KEY+'_sheets_'+s.id) }catch(_){} }); stamps(); toast('بدأ ملف جديد. المهام والبطاقات فارغة الآن.') } });
    return {} }) }

/* ================= المحرك ================= */
var stage, cur=-1, ctrl=null;
function fit(){ var w=innerWidth,h=innerHeight,k=Math.min(w/1280,h/720); stage.style.transform='translate('+((w-1280*k)/2)+'px,'+((h-720*k)/2)+'px) scale('+k+')'; stage.dataset.k=k }
function stamps(){ var s=$('#stamps'); if(!s) return; s.innerHTML=SCR.map(function(x,i){ return '<button class="stamp'+(ST.done[x.id]?' done':'')+(i===cur?' cur':'')+'" data-goto="'+i+'" title="'+esc(x.title)+'">'+(ST.done[x.id]?'✓':n(i+1))+'</button>' }).join('') }
function show(i,force){ if(i<0||i>=SCR.length) return; if(i===cur&&!force) return; if(ctrl&&ctrl.destroy) ctrl.destroy(); $$('.zoom,.toastx,.mapov').forEach(function(z){z.remove()});
  cur=i; var host=$('#scr'); host.innerHTML=''; var el=document.createElement('div'); el.className='scr enter'; host.appendChild(el);
  try{ ctrl=SCR[i].render(el)||{} }catch(err){ console.error(err); el.innerHTML='<div class="card">تعذّر عرض هذه الشاشة: '+esc(err.message)+'</div>'; ctrl={} }
  stamps(); $('.nextbig').style.visibility=i<SCR.length-1?'visible':'hidden'; ls(KEY+'_cur',i); if(!force) sfx.whoosh() }
function next(){ if(ctrl&&ctrl.next&&ctrl.next()) return; show(cur+1) }
function prev(){ show(cur-1) }
function start(){
  stage=$('#stage'); window.addEventListener('resize',fit); fit();
  var ICON={prev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 6l6 6-6 6"/></svg>',next:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M15 6l-6 6 6 6"/></svg>',
    map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
    full:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',snd:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>'};
  stage.innerHTML='<div class="hud"><div class="ttl">'+esc(CFG.title)+'<small>'+esc(CFG.sub)+'</small></div><div class="stamps" id="stamps"></div></div><div id="scr"></div>'+
    '<div class="ctl"><button data-c="map" title="خريطة الملف">'+ICON.map+'</button><button data-c="snd" title="الصوت" class="'+(SND.on?'on':'')+'">'+ICON.snd+'</button><button data-c="full" title="ملء الشاشة">'+ICON.full+'</button><button data-c="prev" title="السابق">'+ICON.prev+'</button></div>'+
    '<button class="nextbig" data-c="next">التالي '+ICON.next+'</button><canvas id="confetti" width="1280" height="720"></canvas>';
  document.addEventListener('click',function(e){ var b=e.target.closest('[data-c],[data-goto],[data-go]'); if(!b) return;
    if(b.dataset.go){ show(Number(b.dataset.go)); return }
    if(b.dataset.goto){ $$('.mapov').forEach(function(x){x.remove()}); show(Number(b.dataset.goto)); return }
    var c=b.dataset.c;
    if(c==='next') next(); else if(c==='prev') prev();
    else if(c==='snd'){ SND.on=!SND.on; ls('ch1_snd',SND.on); b.classList.toggle('on',SND.on) }
    else if(c==='full'){ if(document.fullscreenElement) document.exitFullscreen().catch(function(){}); else if(document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function(){ toast('ملء الشاشة غير متاح هنا',false) }) }
    else if(c==='map'){ var m=document.createElement('div'); m.className='mapov'; m.innerHTML='<div class="grid">'+SCR.map(function(x,i){return '<button data-goto="'+i+'" class="'+(ST.done[x.id]?'done':'')+'"><i>'+n(i+1)+'</i>'+esc(x.title)+'</button>'}).join('')+'</div>'; stage.appendChild(m); m.addEventListener('click',function(ev){ if(ev.target===m) m.remove() }) } });
  document.addEventListener('keydown',function(e){ if(/INPUT|TEXTAREA/.test(e.target.tagName)||e.target.isContentEditable) return;
    if(e.key==='Escape'){ $$('.zoom,.mapov').forEach(function(z){z.remove()}); return }
    if(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' '){ e.preventDefault(); next() } else if(e.key==='ArrowLeft'||e.key==='PageUp'){ e.preventDefault(); prev() }
    else if(e.key==='f'||e.key==='F'){ $('[data-c=full]').click() } });
  stamps(); show(Math.min(Number(ls(KEY+'_cur'))||0,SCR.length-1),true) }

/* ===== الدرس الثالث: تقويم التفسيرات العلمية — ملف القضية رقم ٣ ===== */
var OBJ=['تقوّم التفسيرات العلمية'];
var OMAP=[['critical','data','notes','repeat','ads']];

function voteBox(labels){ return '<div class="vote">'+labels.map(function(l,i){return '<button data-vt="'+i+'" class="v'+i+'"><span>'+l+'</span><b data-vc="'+i+'">٠</b></button>'}).join('')+'</div><div class="muted" style="font-size:14px;color:#9FB0CC">اضغط الزر مرة لكل طالب يرفع يده</div>' }
function voteKit(el){ var V={}; el.addEventListener('click',function(e){ var b=e.target.closest('[data-vt]'); if(!b) return; var k=b.dataset.vt; V[k]=(V[k]||0)+1; $('[data-vc="'+k+'"]',el).textContent=n(V[k]); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); sfx.pop() }); return V }

/* ١) المقدمة التشويقية */
add('intro','صدّق أو لا تصدّق',function(el){
  el.innerHTML='<div class="intro" style="grid-template-columns:1fr 560px"><div><span class="case">ملف القضية رقم ٣</span><h1 class="h1">صدّق أو لا تصدّق؟</h1><p class="type" id="ty"></p><div class="row" style="margin-top:8px"><button class="btn" data-go="1">افتح الملف</button><span class="kicker">تقويم التفسيرات العلمية · <b>الدرس الثالث</b></span></div></div>'+
   '<div class="card ufo pop"><span class="tape"></span>'+img('ufo')+'<b class="disp" style="font-size:26px">هل تصدّق ما تراه في هذه الصورة؟</b>'+voteBox(['أصدّق','لا أصدّق'])+
   '<button class="btn sm coral" data-ev>قبل أن تحكم… ما الدليل؟</button><div class="evq" data-evq></div></div></div>';
  var txt='صورة لجسم غريب يحلّق فوق الصحراء… وإعلانات حولك تَعِدك بالمعجزات… فكيف تعرف ما يُصدَّق وما لا يُصدَّق؟ في هذا الملف تتدرّب على الحكم على أي ادعاء كما يفعل العلماء: بالبيانات والأدلة.', i=0, ty=$('#ty',el);
  var iv=setInterval(function(){ i++; ty.innerHTML=esc(txt.slice(0,i))+'<span class="cur"></span>'; if(i>=txt.length) clearInterval(iv) },42);
  voteKit(el);
  el.addEventListener('click',function(e){ if(e.target.closest('[data-ev]')){ $('[data-evq]',el).innerHTML=['من التقط الصورة؟ ومتى؟ وأين؟','هل صوّر آخرون الشيء نفسه؟','هل يمكن التحقق منها؟'].map(function(q,k){return '<span class="pop" style="animation-delay:'+(k*0.15)+'s">'+q+'</span>'}).join(''); sfx.whoosh() } });
  return {destroy:function(){ clearInterval(iv) }};
});

/* ٢) التهيئة: صفقة أم خدعة؟ */
add('warm','التهيئة',function(el){
  var Qs=['لماذا السعر منخفض إلى هذا الحد؟','هل المنتج أصلي؟ ومن البائع؟','هل توجد بيانات أو تقييمات موثوقة تدعم الإعلان؟','هل يمكن التحقق من الادعاء قبل الدفع؟'];
  el.innerHTML=head('تهيئة','صفقة العمر… أم خدعة؟',38)+
   '<div class="deal"><div class="adw pop">'+img('phones')+'<span class="was">قبل ٤٩٩٩ ريال</span><span class="now">الآن ٥٠ ريال</span></div>'+
   '<div class="card" style="display:flex;flex-direction:column;gap:10px"><span class="tape"></span><b class="disp" style="font-size:26px">رأيت هذا الإعلان. ماذا ستفعل؟</b>'+voteBox(['أشتريه فورًا','أحتاج معلومات أكثر'])+
    '<b style="margin-top:4px">ما الأسئلة التي ستطرحها قبل أن تدفع؟ <button class="btn sm ghost" data-q>اكشف سؤالًا</button></b><div class="qs" data-qs></div>'+
    '<div class="reveal" data-rv><div class="ans fb ok">من المهم تقييم معلومات المنتج وبياناته التي تدعم الادعاء قبل اتخاذ قرار شراء المنتج وإنفاق أموالك. <b>فتقويم الادعاءات والتفسيرات العلمية يساعد على اتخاذ قرارات صائبة.</b></div></div></div></div>';
  voteKit(el); var qi=0;
  function more(){ if(qi<Qs.length){ var s=document.createElement('span'); s.className='pop'; s.textContent=Qs[qi++]; $('[data-qs]',el).appendChild(s); sfx.pop(); return true }
    var r=$('[data-rv]',el); if(!r.classList.contains('open')){ r.classList.add('open'); sfx.ok(); done('warm'); return true } return false }
  el.addEventListener('click',function(e){ if(e.target.closest('[data-q]')) more() });
  return {next:more};
});

goalsScreen(OBJ,OMAP,'<div class="rev"><b>الأهمية</b><span>تقويم الادعاءات والتفسيرات العلمية يساعد على اتخاذ قرارات صائبة.</span></div>');

/* ٤) التفكير الناقد */
add('critical','التفكير الناقد',function(el){
  el.innerHTML=head('المفهوم الأول','التفكير الناقد: لا تقبل قبل أن تقوّم')+
   '<div class="crit"><div class="card pop"><span class="tape"></span><b class="disp" style="font-size:28px;color:var(--violet)">التفكير الناقد</b><p style="margin:4px 0 0">عندما تقوّم شيئًا ما فإنك تستخدم التفكير الناقد؛ وهو الربط بين ما تعرفه من معلومات مع الحقائق الجديدة لتقرر ما إذا كنت توافق على شيء ما.</p><div class="split"><span>ويمكن تقويم أي تفسير من خلال تقسيمه إلى جزأين</span></div></div>'+
    '<div class="card pop reveal" style="animation-delay:.1s"><span class="tape l"></span><span class="badge" style="background:var(--sky)">أولًا: تقويم الملاحظات</span><p class="ans" style="margin:6px 0 0">بالاعتماد على المعلومات المتوافرة لديك، ثم تقدّر مدى دقتها.</p><span class="muted hint">اضغط للكشف</span></div>'+
    '<div class="card pop reveal" style="animation-delay:.2s"><span class="tape"></span><span class="badge" style="background:var(--coral)">ثانيًا: تقويم الاستنتاجات</span><p class="ans" style="margin:6px 0 0">التي تم بناؤها اعتمادًا على الملاحظات، وتقرير ما إذا كانت تلك الاستنتاجات معقولة أم لا.</p><span class="muted hint">اضغط للكشف</span></div></div>'+
   '<div class="card" data-quick style="padding:12px 22px"></div>';
  quick($('[data-quick]',el),[
    {q:'الربط بين ما تعرفه من معلومات مع الحقائق الجديدة لتقرر مدى موافقتك لشيء ما هو:',o:['التوقع','التفكير الناقد','الفرضية','النظرية'],a:1,ex:'هذا تعريف التفكير الناقد كما في الدرس.'},
    {q:'عند وجود تفسيرين لنتيجة واحدة، ماذا يفعل الباحث؟',o:['يختار الأقرب لرأيه','يتجاهل البيانات','يقارن الأدلة التي تدعم كل تفسير','يختار الأقصر'],a:2,ex:'المقارنة بين الأدلة جزء من التفكير الناقد.'}],'critical');
  return revealer(el,'.reveal','');
});

/* ٥) تقويم البيانات */
add('data','تقويم البيانات',function(el){
  var D={book:[37,28],cls:ls(KEY+'_survey')||[0,0]}, src='book', form='table', seen={};
  var F=[['desc','وصف'],['table','جدول تكراري'],['chart','رسم بياني']];
  el.innerHTML=head('المفهوم الثاني','تقويم البيانات: هل البيانات محددة؟')+
   '<div class="dat"><div class="card"><span class="tape"></span><b class="disp" style="font-size:25px;color:var(--sky)">البيانات</b><p style="margin:2px 0 6px;font-size:19px">معلومات يتم تجميعها أثناء البحث العلمي من خلال الملاحظات، ويمكن تدوينها على شكل <b>وصف</b>، أو <b>جداول</b>، أو <b>رسوم بيانية</b>، أو <b>أشكال</b>.</p>'+
     '<p style="margin:0;font-size:18px" class="muted">عندما تقوّم ادعاءً علميًا فقد تطلب أولًا أي بيانات مقدّمة معه، وعليك أن تحذر من تصديق أي ادعاء غير مدعوم بالبيانات.</p><div style="margin-top:auto">'+img('wheat','width:100%;height:120px;object-fit:cover;border-radius:12px')+'</div></div>'+
    '<div class="card" style="display:flex;flex-direction:column;gap:8px"><span class="tape l"></span><div class="fb" style="background:#FFF7E0;font-size:18px">يخبرك صديقك بأن أكثر أفراد بلدته يفضلون أكل لحم الغنم على الدجاج. ما البيانات التي تحتاجها لتتفق معه في الرأي؟</div>'+
     '<div class="row" style="flex-wrap:nowrap;gap:14px"><div class="seg" data-src style="flex:1"><button data-v="book" class="on">بيانات الكتاب</button><button data-v="cls">استطلاع فصلنا</button></div>'+
     '<div class="seg" data-form style="flex:1.4">'+F.map(function(f){return '<button data-v="'+f[0]+'" class="'+(f[0]===form?'on':'')+'">'+f[1]+'</button>'}).join('')+'</div></div>'+
     '<div class="dview" data-view></div><div class="row" data-survey style="display:none;justify-content:center"><button class="btn sm coral" data-add="0">+ لحم الغنم</button><button class="btn sm aqua" data-add="1">+ الدجاج</button><button class="btn sm ghost" data-clr>تصفير</button></div></div></div>'+
   '<div class="note" style="text-align:center">من خلال الجدول التكراري يمكنك تحديد هل المعلومة موثوقة أم لا · <b>تكون البيانات موثوقة ومعتمدة إذا كانت محددة وقابلة للتكرار</b></div>';
  function tally(c){ var s='', x=0; for(var g=0;g<Math.ceil(c/5);g++){ var k=Math.min(5,c-g*5); for(var j=0;j<Math.min(k,4);j++){ s+='<line x1="'+(x+j*7)+'" y1="4" x2="'+(x+j*7)+'" y2="30"/>' } if(k===5) s+='<line x1="'+(x-4)+'" y1="26" x2="'+(x+25)+'" y2="8"/>'; x+=38 } return '<svg viewBox="0 0 '+Math.max(40,x)+' 34" height="30" style="max-width:100%;stroke:#14213D;stroke-width:2.6;stroke-linecap:round">'+s+'</svg>' }
  function view(){ var d=D[src], L=['لحم الغنم','الدجاج'], C=['var(--coral)','var(--aqua)'], v=$('[data-view]',el); seen[form]=1;
    $('[data-survey]',el).style.display=src==='cls'?'flex':'none';
    if(form==='desc') v.innerHTML='<p class="pop" style="font-size:24px;margin:auto;text-align:center;line-height:1.7">'+(src==='book'?'في جدول الطعام المفضل':'في استطلاع فصلنا')+': فضّل <b style="color:var(--coral)">'+n(d[0])+'</b> لحم الغنم، وفضّل <b style="color:var(--aqua)">'+n(d[1])+'</b> الدجاج.</p>';
    else if(form==='table') v.innerHTML='<table class="res ftab pop"><thead><tr><th colspan="3" style="background:var(--good);color:#fff;text-align:center">'+(src==='book'?'جدول ٢: الطعام المفضل':'استطلاع فصلنا: الطعام المفضل')+'</th></tr><tr><th>رغبات الناس</th><th>السجل / التعداد</th><th>التكرار</th></tr></thead><tbody>'+L.map(function(l,i){return '<tr><td>'+l+'</td><td>'+tally(d[i])+'</td><td><b>'+n(d[i])+'</b></td></tr>'}).join('')+'</tbody></table>';
    else { var mx=Math.max(5,d[0],d[1])*1.15; v.innerHTML='<svg viewBox="40 0 480 220" class="pop" style="width:100%;height:100%;max-height:100%"><line x1="60" y1="185" x2="500" y2="185" stroke="#C3CCDA" stroke-width="2"/>'+d.map(function(c,i){ var h=c/mx*160, x=140+i*200; return '<rect x="'+x+'" y="'+(185-h)+'" width="110" height="'+h+'" rx="8" fill="'+C[i]+'"><animate attributeName="height" from="0" to="'+h+'" dur=".6s"/><animate attributeName="y" from="185" to="'+(185-h)+'" dur=".6s"/></rect><text x="'+(x+55)+'" y="'+(178-h)+'" text-anchor="middle" font-size="22" font-weight="700" fill="#14213D">'+n(c)+'</text><text x="'+(x+55)+'" y="210" text-anchor="middle" font-size="18" font-weight="600" fill="#55627A">'+L[i]+'</text>' }).join('')+'<text x="30" y="100" text-anchor="middle" font-size="15" fill="#55627A" transform="rotate(-90 30 100)">عدد الأشخاص</text></svg>' }
    if(seen.desc&&seen.table&&seen.chart) done('data') }
  el.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return; var g=b.closest('[data-src],[data-form]');
    if(g){ $$('button',g).forEach(function(x){x.classList.toggle('on',x===b)}); if(g.hasAttribute('data-src')) src=b.dataset.v; else form=b.dataset.v; sfx.pop(); view(); return }
    if(b.dataset.add!==undefined){ D.cls[Number(b.dataset.add)]++; ls(KEY+'_survey',D.cls); sfx.pop(); view(); return }
    if(b.hasAttribute('data-clr')){ D.cls=[0,0]; ls(KEY+'_survey',D.cls); view() } });
  view();
  return {next:function(){ var o=['desc','table','chart'].filter(function(f){return !seen[f]})[0]; if(o){ form=o; $$('[data-form] button',el).forEach(function(x){x.classList.toggle('on',x.dataset.v===o)}); sfx.pop(); view(); return true } return false }};
});

/* ٦) تدوين الملاحظات: تحدّي الذاكرة */
add('notes','تدوين الملاحظات',function(el){
  var Q=[{q:'كم ورقة كانت في النبتة؟',o:['٤','٥','٦','٧'],a:1},{q:'أي كأس كانت تخرج منها فقاعات؟',o:['الحمراء','الصفراء','الزرقاء','الخضراء'],a:2},{q:'كم كانت قراءة مقياس الحرارة؟',o:['٢٠°','٢٥°','٣٠°','٣٥°'],a:1}], st='idle', qi=0, sc=0, iv=null;
  el.innerHTML=head('المفهوم الثالث','تحدّي الذاكرة: لماذا ندوّن الملاحظات في وقتها؟',32)+
   '<div class="mem"><div class="card memc" data-mc></div>'+
   '<div class="card" style="display:flex;flex-direction:column;gap:8px"><span class="tape l"></span>'+img('divers','width:100%;height:150px;object-fit:cover;border-radius:12px')+
    '<b class="disp" style="font-size:24px;color:var(--coral)">تدوين ملاحظات جيدة</b><p style="margin:0;font-size:17.5px;line-height:1.55">يجب على العلماء أن يدوّنوا ملاحظاتهم تدوينًا شاملًا وكاملًا أثناء إجراء الاستقصاء؛ إذ من الممكن فقدان كثير من التفاصيل المهمة إذا لم يتم تدوين الملاحظات في وقتها. كما يجب تدوين أي ملاحظة مهما كانت بسيطة أو غير متوقعة.</p>'+
    '<div class="reveal" data-why><div class="ans fb ok" style="font-size:17px">ما أهمية تدوين الملاحظات؟ يجب تدوين الملاحظات أثناء التجربة حتى يمكن قراءتها وفهمها من جديد وإعادة التجربة إذا لزم الأمر.</div></div></div></div>';
  function scene(){ var lv=''; for(var k=0;k<5;k++){ var a=-70+k*35, y=150-k*16; lv+='<ellipse cx="'+(470+(k%2?18:-18))+'" cy="'+y+'" rx="20" ry="9" fill="#18A058" transform="rotate('+(k%2?-25:25)+' '+(470+(k%2?18:-18))+' '+y+')"/>' }
    var cols=['#F2545B','#FFC53D','#3D8BFD','#18A058'], bk=cols.map(function(c,i){ var x=60+i*80; return '<path d="M'+x+' 130 h50 v80 q0 10 -10 10 h-30 q-10 0 -10 -10z" fill="'+c+'" opacity=".85" stroke="#14213D" stroke-width="2.5"/>'+(i===2?'<g fill="none" stroke="#fff" stroke-width="2"><circle cx="'+(x+18)+'" cy="160" r="4"><animate attributeName="cy" values="200;135" dur="1.2s" repeatCount="indefinite"/></circle><circle cx="'+(x+32)+'" cy="180" r="3"><animate attributeName="cy" values="205;135" dur="1.6s" repeatCount="indefinite"/></circle></g>':'') }).join('');
    return '<svg viewBox="0 0 640 260" style="width:100%;height:100%"><rect x="20" y="220" width="600" height="14" rx="6" fill="#C8A26B"/>'+bk+
      '<rect x="390" y="190" width="70" height="32" rx="6" fill="#B5643C"/><line x1="425" y1="190" x2="465" y2="80" stroke="#18A058" stroke-width="5"/>'+lv+
      '<rect x="560" y="60" width="18" height="150" rx="9" fill="#fff" stroke="#14213D" stroke-width="2.5"/><rect x="564" y="120" width="10" height="86" rx="5" fill="#F2545B"/><circle cx="569" cy="210" r="14" fill="#F2545B" stroke="#14213D" stroke-width="2.5"/><text x="612" y="125" font-size="22" font-weight="700" fill="#14213D" text-anchor="middle" direction="ltr">٢٥°</text></svg>' }
  function draw(){ var m=$('[data-mc]',el);
    if(st==='idle') m.innerHTML='<span class="tape"></span><b class="disp" style="font-size:26px">ستظهر لكم صورة تجربة لمدة ٨ ثوانٍ فقط</b><p style="margin:0">المجموعة (أ) تشاهد فقط، والمجموعة (ب) تدوّن ملاحظاتها على ورقة. ثم نجيب عن أسئلة التفاصيل!</p><div class="row" style="margin:auto"><button class="btn" data-go2>ابدأ التحدي</button></div>';
    else if(st==='show') m.innerHTML='<span class="tape"></span><div class="row" style="justify-content:space-between"><b class="disp" style="font-size:24px">لاحظ جيدًا!</b><span class="tmr" data-t>٨</span></div><div class="scene">'+scene()+'</div>';
    else if(st==='ask'){ var q=Q[qi]; m.innerHTML='<span class="tape"></span><span class="muted">السؤال '+n(qi+1)+' من '+n(Q.length)+' · أُخفيت الصورة!</span><div class="qtext pop" style="font-size:30px">'+q.q+'</div><div class="qopts">'+q.o.map(function(o,j){return '<button class="opt" data-j="'+j+'"><span class="k" style="background:'+KC[j]+'">'+KL[j]+'</span>'+o+'</button>'}).join('')+'</div><div data-qf></div>' }
    else m.innerHTML='<span class="tape"></span><b class="disp" style="font-size:30px">تذكّرتم '+n(sc)+' من '+n(Q.length)+'</b><p style="margin:0">هل أجابت المجموعة التي دوّنت ملاحظاتها إجابات أدق؟ هذا ما يحدث في الاستقصاء: التفاصيل التي لا تُدوَّن في وقتها قد تضيع.</p><div class="scene" style="max-height:200px">'+scene()+'</div><div class="row"><button class="btn sm ghost" data-again>أعد التحدي</button></div>' }
  el.addEventListener('click',function(e){ var b=e.target.closest('button'); if(e.target.closest('[data-why]')){ $('[data-why]',el).classList.add('open'); sfx.pop(); done('notes'); return } if(!b) return;
    if(b.hasAttribute('data-go2')){ st='show'; draw(); sfx.whoosh(); var t=8; iv=setInterval(function(){ t--; var x=$('[data-t]',el); if(x) x.textContent=n(t); if(t<=3&&t>0) sfx.tick(); if(t<=0){ clearInterval(iv); st='ask'; qi=0; sc=0; draw(); sfx.thud() } },1000); return }
    if(b.dataset.j!==undefined&&!$('[data-qf] .fb',el)){ var q=Q[qi], j=Number(b.dataset.j); $$('.opt',el).forEach(function(x,k){ x.classList.add(k===q.a?'ok':k===j?'no':'dim') }); if(j===q.a){ sc++; sfx.ok() } else sfx.no();
      $('[data-qf]',el).innerHTML='<div class="row"><button class="btn sm" data-nq>'+(qi<Q.length-1?'السؤال التالي':'النتيجة')+'</button></div>'; return }
    if(b.hasAttribute('data-nq')){ if(qi<Q.length-1){ qi++; draw() } else { st='end'; draw(); $('[data-why]',el).classList.add('open'); done('notes'); sfx.win() } return }
    if(b.hasAttribute('data-again')){ st='idle'; draw() } });
  draw();
  return {destroy:function(){ clearInterval(iv) }, next:function(){ var w=$('[data-why]',el); if(!w.classList.contains('open')){ w.classList.add('open'); sfx.pop(); done('notes'); return true } return false }};
});

/* ٧) المحاكاة: هل تتكرر البيانات؟ */
add('repeat','محاكاة التكرار',function(el){
  var SC={friend:{claim:100,who:'صديقك',seq:[46,52,44,49,51]},team:{claim:45,who:'فريق العلوم',seq:[44,46,45,43,47]}}, sc='friend', T={friend:[],team:[]}, busy=false;
  el.innerHTML=head('محاكاة تفاعلية','هل يمكن الحصول على البيانات ذاتها مرة أخرى؟',34,'<span class="kicker" data-k></span>')+
   '<div class="lab"><div class="tankw"><svg viewBox="0 0 900 470" data-f preserveAspectRatio="xMidYMid meet"></svg><span class="illu">المسافات في المحاكاة قيم توضيحية</span></div><div class="side">'+
    '<div class="card"><b class="disp" style="font-size:21px">١) اختر الادعاء</b><div class="seg" data-sc style="margin-top:6px;flex-direction:column"><button data-v="friend" class="on">صديقك: «قذفت الكرة ١٠٠ م بالمضرب!»</button><button data-v="team">فريق العلوم: «نقذفها ٤٥ م»</button></div></div>'+
    '<div class="card"><b class="disp" style="font-size:21px">٢) اطلب تكرار الضربة</b><div class="row" style="margin-top:6px"><button class="btn sm aqua" data-throw>كرّر الضربة</button><button class="btn sm ghost" data-rst>مسح</button></div>'+
     '<div class="trials" data-tb></div></div>'+
    '<div data-verd></div><button class="btn coral" data-explain disabled>٣) ماذا يعني ذلك؟</button></div></div>';
  var svg=$('[data-f]',el), GY=400, BX=830, PX=7.4;
  function X(d){ return BX-d*PX }
  function field(){ var s='<defs><linearGradient id="sky3" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1B3A6B"/><stop offset="1" stop-color="#2B5C8F"/></linearGradient></defs><rect width="900" height="470" fill="url(#sky3)"/><rect y="'+GY+'" width="900" height="70" fill="#2E7D4F"/>';
    for(var d=0;d<=100;d+=10){ s+='<line x1="'+X(d)+'" y1="'+GY+'" x2="'+X(d)+'" y2="'+(GY+14)+'" stroke="#fff" stroke-width="2"/><text x="'+X(d)+'" y="'+(GY+36)+'" text-anchor="middle" font-size="16" fill="#E6EDF8" font-weight="600">'+n(d)+' م</text>' }
    var c=SC[sc].claim; s+='<line x1="'+X(c)+'" y1="'+(GY-230)+'" x2="'+X(c)+'" y2="'+GY+'" stroke="#FFC53D" stroke-width="3" stroke-dasharray="8 6"/><rect x="'+(X(c)-70)+'" y="'+(GY-266)+'" width="140" height="34" rx="10" fill="#FFC53D"/><text x="'+X(c)+'" y="'+(GY-243)+'" text-anchor="middle" font-size="18" font-weight="700" fill="#14223C">الادعاء: '+n(c)+' م</text>';
    s+='<g transform="translate('+(BX+22)+','+(GY-62)+')"><circle cx="0" cy="0" r="12" fill="#FFD9B3"/><line x1="0" y1="12" x2="0" y2="44" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="0" y1="44" x2="-10" y2="62" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="0" y1="44" x2="10" y2="62" stroke="#fff" stroke-width="6" stroke-linecap="round"/><line x1="0" y1="22" x2="-26" y2="8" stroke="#fff" stroke-width="5" stroke-linecap="round"/><line x1="-26" y1="8" x2="-40" y2="-22" stroke="#C8901A" stroke-width="7" stroke-linecap="round"/></g>';
    T[sc].forEach(function(d,i){ s+='<g><circle cx="'+X(d)+'" cy="'+(GY-6)+'" r="7" fill="#fff"/><text x="'+X(d)+'" y="'+(GY-18)+'" text-anchor="middle" font-size="15" font-weight="700" fill="#fff">'+n(i+1)+'</text></g>' });
    s+='<circle data-ball r="8" fill="#fff" cx="-20" cy="-20"/>'; svg.innerHTML=s }
  function ui(){ var t=T[sc]; $('[data-tb]',el).innerHTML=t.length?t.map(function(d,i){return '<span class="pop"><i>'+n(i+1)+'</i><bdi>'+n(d)+' م</bdi></span>'}).join(''):'<span class="muted" style="background:none">لم تُسجَّل محاولات بعد</span>';
    var ok=t.length>=3, rep=t.every(function(d){return Math.abs(d-SC[sc].claim)<=5});
    $('[data-verd]',el).innerHTML=ok?'<div class="fb '+(rep?'ok':'no')+' pop">'+(rep?'✓ النتائج تكررت قريبة من الادعاء: البيانات قابلة للتكرار.':'✗ لم تتكرر النتيجة المدّعاة: هناك شك في مصداقية الادعاء.')+'</div>':'';
    $('[data-k]',el).textContent=t.length<3?'سجّل ٣ محاولات على الأقل':'قارن المحاولات بالادعاء';
    $('[data-explain]',el).disabled=!(T.friend.length>=3&&T.team.length>=3); if(T.friend.length>=3&&T.team.length>=3) done('repeat') }
  function thr(){ if(busy) return; var t=T[sc]; if(t.length>=SC[sc].seq.length){ toast('سجّلت كل المحاولات. امسح الجدول لتبدأ من جديد.'); return } busy=true; var d=SC[sc].seq[t.length], x0=BX-10, y0=GY-80, x1=X(d), h=150+d*1.2, t0=performance.now(), ball=$('[data-ball]',svg); sfx.thud();
    (function f(now){ var u=Math.min(1,(now-t0)/1100); ball.setAttribute('cx',x0+(x1-x0)*u); ball.setAttribute('cy',y0+(GY-6-y0)*u-h*4*u*(1-u)); if(u<1) requestAnimationFrame(f); else { t.push(d); busy=false; sfx.pop(); field(); ui() } })(t0) }
  el.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return;
    var g=b.closest('[data-sc]'); if(g){ if(busy) return; sc=b.dataset.v; $$('button',g).forEach(function(x){x.classList.toggle('on',x===b)}); sfx.pop(); field(); ui(); return }
    if(b.hasAttribute('data-throw')){ thr(); return }
    if(b.hasAttribute('data-rst')){ if(busy) return; T[sc]=[]; field(); ui(); return }
    if(b.hasAttribute('data-explain')) zoom('<h2 class="h2" style="margin-bottom:8px">البيانات القابلة للتكرار</h2><p style="margin:0 0 8px;font-size:19px">إذا أخبرك صديقك أنه تمكّن من قذف كرة مسافة ١٠٠ م باستخدام مضرب فلعلك تطلب إليه أن يكرر ذلك أمامك، ولعلك تشكّك في مصداقية روايته إن لم يتمكن من تكرار الضربة! بالمثل يطلب العلماء أدلة قابلة للتكرار؛ وعندما يصف عالم استقصاءً ما لا بد أن يكون العلماء الآخرون قادرين على الحصول على النتائج نفسها عند تكرارهم للاستقصاء، وهذا ما يُقصد بالبيانات القابلة للتكرار.</p><div class="expl">عندما تقوّم بيانات علمية عليك أن تبحث فيما إذا تمكّن علماء آخرون من تكرار الحصول على هذه البيانات، وإلا فإن هناك شكًّا في مصداقيتها.</div>',880) });
  field(); ui();
  return {};
});

/* ٨) تقويم المواد الدعائية: محقق الإعلانات */
add('ads','محقق الإعلانات',function(el){
  var H=[{x:24,y:12,w:54,h:6,c:'«أول حل نهائي لمشاكل الشعر»',q:'«أول» و«نهائي»: ما الدليل؟ لم يقدّم الإعلان أي بيانات تدعم هاتين الكلمتين.'},
         {x:4,y:70,w:27,h:16,c:'«مضمون طبيعي ١٠٠٪»',q:'من فحص المنتج وضمنه؟ هل فحصته مختبرات مستقلة موثوقة للتأكد من صلاحيته؟'},
         {x:30,y:80,w:67,h:5.5,c:'«إنبات شعر . تساقط . قشرة»',q:'ثلاث فوائد في سطر واحد: هل قُدّمت بيانات لكل فائدة منها؟'},
         {x:3,y:86,w:94,h:8,c:'«تم البحث عن ٢٠٠ شخص… وكانت نسبة النجاح ٨٣٪»',q:'هذا ادعاء معه بيانات! لكن: من أجرى البحث؟ كيف قيس النجاح؟ وهل كرره علماء آخرون وحصلوا على النتيجة نفسها؟'},
         {x:3,y:94,w:94,h:5,c:'«يعمل على إيقاف التساقط والقشرة بشكل نهائي ١٠٠٪»',q:'١٠٠٪ نهائيًا؟ الإعلان نفسه ذكر نجاحًا بنسبة ٨٣٪! الاستنتاج هنا أكبر مما تدعمه البيانات.'}], found={};
  el.innerHTML=head('المفهوم الرابع','محقق الإعلانات: اضغط على كل ادعاء في الإعلان',32,'<div class="score">اكتشفت <b data-fc>٠</b> من '+n(H.length)+'</div>')+
   '<div class="ads"><div class="adbox"><div class="adimg">'+img('hair')+H.map(function(h,i){return '<button class="hs" data-h="'+i+'" style="left:'+h.x+'%;top:'+h.y+'%;width:'+h.w+'%;height:'+h.h+'%" title="ادعاء"></button>'}).join('')+'</div></div>'+
   '<div class="card" style="display:flex;flex-direction:column;gap:8px;overflow:hidden"><span class="tape"></span><b class="disp" style="font-size:24px">سجل التحقيق</b><div class="clog" data-log><p class="muted" style="margin:0">ابحث عن العبارات التي يدّعي فيها الإعلان شيئًا، واضغط عليها.</p></div>'+
    '<div data-vd style="display:none"><b>حكمكم على الإعلان:</b><div class="seg" style="margin-top:4px"><button data-v="r">واقعي</button><button data-v="m">مضلل</button><button data-v="s">علمي</button></div><div data-vf style="margin-top:6px"></div></div></div></div>'+
   '<div class="note">من المهم <b>تقييم معلومات المنتج وبياناته</b> التي تدعم الادعاء قبل اتخاذ قرار الشراء، وتقوم <b>المختبرات المستقلة الموثوقة</b> بفحص المنتجات للتأكد من صلاحيتها.</div>';
  var VF={r:'تمهّل: هل قدّم الإعلان بيانات تدعم «نهائي» و«١٠٠٪»؟ راجعوا سجل التحقيق قبل الحكم.',m:'حكم تدعمه أدلتكم: الإعلان يدّعي «نهائي ١٠٠٪» بينما يذكر نجاحًا بنسبة ٨٣٪، ولا يذكر من أجرى البحث أو هل كُرّر.',s:'الادعاء العلمي تدعمه بيانات محددة وقابلة للتكرار من مصدر موثوق. هل وجدتم ذلك في هذا الإعلان؟'};
  function hit(i){ if(found[i]) return; found[i]=1; var h=H[i]; $('[data-h="'+i+'"]',el).classList.add('got'); var lg=$('[data-log]',el); if(Object.keys(found).length===1) lg.innerHTML='';
    var d=document.createElement('div'); d.className='clue pop'; d.innerHTML='<b>'+n(Object.keys(found).length)+') '+h.c+'</b><span>'+h.q+'</span>'; lg.appendChild(d); lg.scrollTop=lg.scrollHeight; sfx.ok();
    var k=Object.keys(found).length; $('[data-fc]',el).textContent=n(k); if(k===H.length){ $('[data-vd]',el).style.display='block'; sfx.win(); confetti(); done('ads') } }
  el.addEventListener('click',function(e){ var h=e.target.closest('[data-h]'); if(h){ hit(Number(h.dataset.h)); return }
    var v=e.target.closest('[data-vd] button'); if(v){ $$('[data-vd] button',el).forEach(function(x){x.classList.toggle('on',x===v)}); $('[data-vf]',el).innerHTML='<div class="fb '+(v.dataset.v==='m'?'ok':'')+' pop" style="font-size:17px;'+(v.dataset.v==='m'?'':'background:#FFF7E0')+'">'+VF[v.dataset.v]+'</div>'; sfx.pop() } });
  return {next:function(){ for(var i=0;i<H.length;i++){ if(!found[i]){ hit(i); return true } } return false }};
});

/* ٩) نشاط التصنيف */
classifyScreen({id:'classify',title:'دليل أم ادعاء؟',h:'دليل موثوق أم ادعاء يحتاج إلى دليل؟',seed:5,
  bins:[['بيانات موثوقة','محددة وقابلة للتكرار','aqua'],['ادعاء يحتاج إلى دليل','غير مدعوم أو لم يتكرر','coral']],
  why:['البيانات الموثوقة محددة ودقيقة وقابلة للتكرار.','الادعاء غير المدعوم بالبيانات، أو الذي لم يتكرر، لا يُقبل قبل التحقق منه.'],
  items:[['كرّرت ثلاث مجموعات التجربة نفسها وحصلت على النتائج نفسها',0],['جدول تكراري: ٣٧ يفضلون لحم الغنم و٢٨ يفضلون الدجاج',0],['منتج فحصته مختبرات مستقلة موثوقة وأكدت صلاحيته',0],['ملاحظات دُوّنت كاملة أثناء التجربة',0],
    ['«قذفت الكرة ١٠٠ م» ولم يستطع تكرارها',1],['«أكثر أهل بلدتي يفضلون لحم الغنم» بلا أي بيانات',1],['«أول حل نهائي لمشاكل الشعر»',1],['نتيجة تجربة على شخص واحد عُمّمت على الجميع',1],['«هذا المنتج يجعل الجميع أفضل بنسبة ١٠٠٪»',1],['ملاحظات كُتبت من الذاكرة بعد أسبوع من التجربة',1,'الملاحظات التي لا تُدوَّن في وقتها قد تفقد كثيرًا من التفاصيل المهمة.']]});

/* ١٠) البطاقة العملية */
sheetScreen({id:'sheet',title:'بطاقة تقويم إعلان',h:'بطاقة تقويم إعلان تجاري',
  task:'شاهدوا إعلانًا تجاريًا (في التلفاز أو الصحف أو الإنترنت)، وسجّلوا ما يدّعيه، ثم قوّموه:',
  fields:[{k:'ad',label:'المنتج أو الإعلان',t:'input',ph:'اسم المنتج'},
    {k:'src',label:'أين شاهدناه؟',t:'seg',opts:[['tv','التلفاز'],['np','الصحف'],['web','الإنترنت'],['o','أخرى']]},
    {k:'claim',label:'ماذا يدّعي الإعلان؟',t:'area',ph:'يدّعي أن…'},
    {k:'data',label:'هل قدّم بيانات تدعم ادعاءه؟',t:'seg',opts:[['y','نعم'],['p','جزئيًا'],['n','لا']],k2:'dataw',ph2:'ما البيانات؟'},
    {k:'rep',label:'هل البيانات محددة وقابلة للتكرار؟',t:'seg',opts:[['y','نعم'],['n','لا'],['u','لا نعرف']]},
    {k:'lab',label:'هل فحصته جهة مستقلة موثوقة؟',t:'seg',opts:[['y','نعم'],['n','لا'],['u','لم يُذكر']]},
    {k:'cls',label:'تصنيفنا للإعلان',t:'seg',opts:[['r','واقعي'],['m','مضلل'],['s','علمي']]},
    {k:'why',label:'لماذا صنّفناه هكذا؟',t:'input',ph:'لأن…'}]});

/* ١١) سباق المحققين */
raceScreen({id:'race',title:'سباق المحققين',h:'سباق المحققين: نقوّم الملاحظات أم الاستنتاجات؟',unit:'سؤال المحقق',
  lanes:[['تقويم الملاحظات','var(--sky)'],['تقويم الاستنتاجات','var(--violet)']],
  cases:[
   {name:'الطعام المفضل',img:'freq',desc:'يقول صديقك: أكثر أفراد بلدته يفضلون لحم الغنم على الدجاج، ويعرض عليك هذا الجدول.',f:[['هل التعداد في الجدول مسجّل بدقة ووضوح؟',0,'نقدّر مدى دقة البيانات المسجّلة.'],['هل يكفي هذا الجدول للقول إن «أكثر أفراد البلدة» يفضلون لحم الغنم؟',1,'نقرر هل الاستنتاج معقول في ضوء البيانات.'],['هل يمكن لشخص آخر أن يكرر الاستطلاع ويحصل على نتائج مشابهة؟',0,'قابلية تكرار البيانات جزء من تقويمها.']]},
   {name:'إعلان علاج الشعر',img:'hair',desc:'«تم البحث عن ٢٠٠ شخص… وكانت نسبة النجاح ٨٣٪» ثم «يعمل بشكل نهائي ١٠٠٪».',f:[['من أجرى البحث على ٢٠٠ شخص؟ وكيف قيس النجاح؟',0,'نتحقق من مصدر البيانات ودقتها.'],['هل نجاح ٨٣٪ يبرر عبارة «نهائي ١٠٠٪»؟',1,'الاستنتاج أكبر مما تدعمه البيانات.']]},
   {name:'ضربة الـ ١٠٠ متر',img:'',desc:'أخبرك صديقك أنه قذف كرة مسافة ١٠٠ م باستخدام مضرب.',f:[['هل قيست المسافة فعلًا أم قُدّرت بالنظر؟',0,'نقدّر دقة الملاحظة نفسها.'],['هل ضربة واحدة تكفي للقول إنه يستطيع قذف الكرة ١٠٠ م دائمًا؟',1,'التعميم من محاولة واحدة استنتاج ضعيف.']]}]});

compScreen({h:'تحدّي المحققين'});
evalScreen({cn:{critical:'التفكير الناقد',evaluate:'تقويم الملاحظات والاستنتاجات',data:'البيانات وتمثيلها',claims:'فحص الادعاءات والإعلانات',repeat:'تدوين الملاحظات وقابلية التكرار'}});
endScreen({title:'أُغلق الملف',h:'أُغلق الملف: لا نصدّق قبل أن نقوّم!',recapTitle:'خلاصة الملف',
  recap:[['صدّق أو لا تصدّق','من خلال دمج معلوماتك السابقة مع المعلومات الجديدة تستطيع أن تقرر ما إذا كان موضوع ما واقعيًا، وقابلًا للتصديق.'],['تقويم البيانات','من المهم تسجيل الملاحظات خلال تنفيذ الاستقصاء. البيانات المعتمدة أو الموثوقة بيانات محددة، وقابلة للتكرار.'],['تقويم الاستنتاج','يجب أن يكون للاستنتاجات معنى حتى يمكن اعتمادها.'],['تقويم المواد الدعائية','تقوم المختبرات المستقلة الموثوقة بفحص المنتجات للتأكد من صلاحيتها.']],
  objs:OBJ,map:OMAP,hw:['صِف أهمية إعادة التجارب العلمية.','وضّح كيف يمكن أن تكون الإعلانات التجارية مضللة؟','شاهد ثلاثة إعلانات تجارية تُبث في التلفاز، واقرأ ثلاثة من إعلانات الجرائد، ثم سجّل ما يدّعيه كل منها، وصنّفها إلى: واقعية، أو مضللة، أو علمية.']});
/* ===== أدوات مطابقة العرض للفصل الأول: شاشات المحتوى والتقويم كما في العرض + ربط الاستراتيجيات =====
   تُدمج داخل نطاق المحرك نفسه، وتستخدم: add, SCR, esc, n, sfx, toast, done, $, $$, IMG, confetti, ST, show */
var K1={};
(function(){var st=document.createElement('style');st.textContent='\
.k1h{display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:nowrap}\
.k1h h2{margin:2px 0 0;font-family:var(--f-disp);font-weight:400;color:#fff;font-size:34px;line-height:1.25}\
.k1pg{background:#fff;color:#14223C;border-radius:10px;padding:2px 12px;font-size:16px;font-weight:600;white-space:nowrap}\
.k1b{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;gap:14px;padding:12px 4px 4px}\
.k1g{display:grid;gap:14px}\
.k1c{background:var(--paper,#fff);color:#14223C;border-radius:16px;padding:14px 20px;box-shadow:0 10px 24px rgba(0,0,0,.28);position:relative;font-size:20px;line-height:1.65}\
.k1c h3{margin:0 0 6px;font-family:var(--f-disp);font-weight:400;font-size:25px;color:var(--coral,#F2545B)}\
.k1c p{margin:0 0 6px}.k1c ul,.k1c ol{margin:0;padding-inline-start:24px}\
.k1c img{max-width:100%;max-height:200px;object-fit:contain;border-radius:10px;display:block;margin:6px auto 0}\
.k1r .k1a{display:none}.k1r.open .k1a{display:block;animation:pop .4s both}.k1r{cursor:pointer}.k1r:not(.open)::after{content:"اضغط للكشف";display:block;font-size:15px;color:#7a869a;margin-top:4px}\
.k1a{background:#E8F7EF;border-inline-start:5px solid #18A058;border-radius:10px;padding:6px 12px;margin-top:6px;font-size:19px}\
.k1q{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px}\
.k1o{display:flex;gap:10px;align-items:center;text-align:right;border:2.5px solid #D5DCE8;background:#fff;border-radius:14px;padding:9px 14px;font-size:20px;font-family:inherit;cursor:pointer;color:#14223C}\
.k1o .k{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;flex:0 0 32px}\
.k1o.ok{border-color:#18A058;background:#E8F7EF}.k1o.no{border-color:#F2545B;background:#FDECEC}.k1o.dim{opacity:.45}\
.k1t{width:100%;border-collapse:separate;border-spacing:0;font-size:19px;background:#fff;color:#14223C;border-radius:14px;overflow:hidden}\
.k1t th{background:#14223C;color:#fff;padding:8px 10px;font-weight:600}.k1t td{padding:7px 10px;border-top:1px solid #E3E8F0;vertical-align:middle}\
.k1seg{display:inline-flex;gap:6px}.k1seg button{border:2px solid #D5DCE8;background:#fff;border-radius:10px;padding:2px 14px;font-size:19px;font-family:inherit;cursor:pointer}.k1seg button.on{background:#14223C;color:#fff;border-color:#14223C}\
.k1bank{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.k1bank span{background:#fff;color:#14223C;border-radius:10px;padding:5px 14px;font-size:19px;font-weight:600;box-shadow:0 4px 0 #B9C4D6;cursor:pointer}.k1bank span.sel{outline:4px solid var(--tape,#FFC53D)}.k1bank span.used{opacity:.3;pointer-events:none}\
.k1bl{display:inline-block;min-width:130px;border-bottom:3px dashed #9FB0CC;text-align:center;padding:0 8px;cursor:pointer;color:#7a869a;font-weight:700}.k1bl.f{color:#14223C;border-bottom-style:solid}.k1bl.ok{color:#18A058;border-color:#18A058}.k1bl.no{color:#F2545B;border-color:#F2545B}\
.k1tree{display:flex;flex-direction:column;align-items:center;gap:10px}.k1tr{display:flex;gap:26px;justify-content:center;align-items:flex-start}.k1col{display:flex;flex-direction:column;align-items:center;gap:8px}\
.k1n{background:#fff;color:#14223C;border-radius:14px;padding:8px 16px;font-size:19px;font-weight:700;min-width:150px;text-align:center;box-shadow:0 5px 0 #B9C4D6}.k1n.root{background:var(--tape,#FFC53D);font-size:24px}.k1n.bl{border:3px dashed #9FB0CC;background:#F4F7FB;color:#7a869a;cursor:pointer;box-shadow:none}.k1n.bl.f{color:#14223C;border-style:solid}.k1n.bl.ok{border-color:#18A058;background:#E8F7EF}.k1n.bl.no{border-color:#F2545B;background:#FDECEC}.k1lk{font-size:15px;color:#C9D4E6}\
.k1sbar{position:absolute;bottom:16px;left:250px;right:240px;z-index:45;display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center}\
.k1sbar .stgs{margin:0}.k1tb{border:0;border-radius:999px;padding:6px 14px;font:700 16px inherit;font-family:inherit;color:#14223C;background:#fff;box-shadow:0 3px 0 #B9C4D6;cursor:pointer}\
.k1x{font-size:15px;color:#9FB0CC}\
.k1c input,.k1c textarea{background:#fff!important;color:#14223C!important}\
';document.head.appendChild(st)})();
var K1C=['#F2545B','#3D8BFD','#E8A21B','#18A058'],K1L=['أ','ب','ج','د'];
function k1head(k,h,pg){return '<div class="k1h"><div><span class="kicker">'+k+'</span><h2>'+h+'</h2></div>'+(pg?'<span class="k1pg">الكتاب صفحة '+n(pg)+'</span>':'')+'</div>'}
/* كشف تدريجي لعناصر .k1r */
function k1reveal(el,id){var R=$$('.k1r',el);function chk(){if(R.every(function(x){return x.classList.contains('open')}))done(id)}if(!R.length)done(id);
  el.addEventListener('click',function(e){var r=e.target.closest('.k1r');if(r&&!r.classList.contains('open')){r.classList.add('open');sfx.pop();chk()}});
  return {next:function(){var c=R.filter(function(x){return !x.classList.contains('open')})[0];if(c){c.classList.add('open');sfx.pop();chk();return true}return false}}}
/* شاشة محتوى: html يُكتب كما في العرض */
K1.page=function(id,title,o){add(id,title,function(el){el.innerHTML=k1head(o.k||'',o.h||title,o.pg)+'<div class="k1b">'+o.html+'</div>';var c=k1reveal(el,id);if(o.init)o.init(el);return c})};
/* أسئلة تقييم العرض بالترتيب: اختيار من متعدد أو صح/خطأ أو سؤال مفتوح بإجابة تُكشف */
K1.quiz=function(id,title,o){add(id,title,function(el){var i=0,right=0,Q=o.qs;
  function draw(){var q=Q[i];el.innerHTML=k1head(o.k||'تقييم',o.h||title,o.pg)+'<div class="k1b"><div class="k1c"><div style="display:flex;justify-content:space-between;align-items:center"><b style="color:var(--coral,#F2545B);font-size:20px">'+(q.no||('السؤال رقم '+n(i+1)))+'</b><span class="k1x" style="color:#7a869a">'+n(i+1)+' / '+n(Q.length)+'</span></div><p style="font-weight:600;font-size:23px;margin:6px 0">'+q.q+'</p>'+(q.img&&IMG[q.img]?'<img loading="lazy" decoding="async" src="'+IMG[q.img]+'" alt="">':'')+
    (q.o?'<div class="k1q" style="grid-template-columns:repeat('+(q.o.length>2?2:q.o.length)+',1fr)">'+q.o.map(function(x,j){return '<button class="k1o" data-j="'+j+'"><span class="k" style="background:'+K1C[j]+'">'+(q.o.length===2&&q.tf?['أ','ب'][j]:K1L[j])+'</span>'+x+'</button>'}).join('')+'</div>':'<div class="k1r k1c" style="box-shadow:none;border:2px dashed #D5DCE8;margin-top:8px;padding:8px 14px"><b>الإجابة</b><div class="k1a">'+q.a+'</div></div>')+
    '<div data-f style="margin-top:10px"></div></div></div>';
    if(!q.o){var r=$('.k1r',el);r.onclick=function(){if(r.classList.contains('open'))return;r.classList.add('open');sfx.pop();fin(null)}}}
  function fin(ok){var q=Q[i];if(ok)right++;$('[data-f]',el).innerHTML=(q.o?'<div class="fb '+(ok?'ok':'no')+' pop">'+(ok?'✓ إجابة صحيحة. ':'✗ الإجابة الصحيحة: '+q.o[q.a]+'. ')+(q.ex||'')+'</div>':(q.ex?'<div class="fb ok pop">'+q.ex+'</div>':''))+'<div style="margin-top:8px"><button class="btn sm" data-nx>'+(i<Q.length-1?'السؤال التالي':'النتيجة')+'</button></div>'}
  function end(){done(id);var cnt=Q.filter(function(q){return q.o}).length;el.innerHTML=k1head(o.k||'تقييم',o.h||title,o.pg)+'<div class="k1b" style="justify-content:center;align-items:center"><div class="k1c" style="text-align:center;min-width:520px"><h3>انتهت أسئلة التقييم</h3>'+(cnt?'<p style="font-size:34px;font-family:var(--f-disp)">'+n(right)+' من '+n(cnt)+'</p>':'')+'<button class="btn sm" data-again>إعادة الأسئلة</button></div></div>';if(cnt&&right===cnt){sfx.win();confetti()}}
  el.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;if(b.hasAttribute('data-again')){i=0;right=0;draw();return}if(b.hasAttribute('data-nx')){if(i<Q.length-1){i++;draw()}else end();return}
    if(b.dataset.j!==undefined&&!$('[data-nx]',el)){var q=Q[i],j=+b.dataset.j;$$('.k1o',el).forEach(function(x){var k=+x.dataset.j;x.classList.add(k===q.a?'ok':k===j?'no':'dim')});(j===q.a?sfx.ok:sfx.no)();fin(j===q.a)}});
  draw();return {next:function(){var r=$('.k1r:not(.open)',el);if(r){r.click();return true}var nx=$('[data-nx]',el);if(nx){nx.click();return true}return false}}})};
/* توجيه القراءة: قبل/بعد */
K1.guide=function(id,title,o){add(id,title,function(el){var P={};
  el.innerHTML=k1head(o.k||'توجيه القراءة وتركيزها',o.h||title,o.pg)+'<div class="k1b"><table class="k1t"><tr><th style="width:120px">قبل القراءة</th><th>العبارة</th><th style="width:260px">بعد القراءة</th></tr>'+o.items.map(function(it,i){return '<tr><td><span class="k1seg" data-i="'+i+'"><button data-v="1">م</button><button data-v="0">غ</button></span></td><td>'+n(i+1)+'. '+it[0]+'</td><td data-r="'+i+'" style="color:#7a869a">—</td></tr>'}).join('')+'</table><div class="row"><span class="k1x">م = موافق، غ = غير موافق. '+(o.note||'سجّل رأيك قبل القراءة، ثم اكشف الإجابات بعد القراءة.')+'</span><button class="btn sm" data-show style="margin-inline-start:auto">اكشف الإجابات بعد القراءة</button></div></div>';
  el.addEventListener('click',function(e){var b=e.target.closest('.k1seg button');if(b){var i=+b.parentNode.dataset.i;P[i]=+b.dataset.v;$$('button',b.parentNode).forEach(function(x){x.classList.toggle('on',x===b)});sfx.pop();return}
    if(e.target.closest('[data-show]')){o.items.forEach(function(it,i){var c=$('[data-r="'+i+'"]',el),ok=P[i]===(it[1]?1:0);c.innerHTML='<b style="color:'+(it[1]?'#18A058':'#F2545B')+'">'+(it[1]?'م':'غ')+'</b>'+(P[i]==null?'':ok?' ✓':' ✗')+(it[2]?'<div style="font-size:16px;color:#4a5568">'+it[2]+'</div>':'')});sfx.ok();done(id)}});
  return {next:function(){var b=$('[data-show]',el);if(!done._g){}if(b&&!ST.done[id]){b.click();return true}return false}}})};
/* أكمل الفراغ من بنك الكلمات */
K1.cloze=function(id,title,o){add(id,title,function(el){var sel=null;
  el.innerHTML=k1head(o.k||'تدريب',o.h||title,o.pg)+'<div class="k1b"><div class="k1bank">'+shuffle(o.bank,7).map(function(w){return '<span>'+w+'</span>'}).join('')+'</div><div class="k1c" style="font-size:18.5px;line-height:1.95">'+o.items.map(function(it,i){return '<div>'+(it.lab?'<b>'+it.lab+'</b> ':'')+it.t.replace('___','<span class="k1bl" data-a="'+esc(it.a)+'">؟</span>')+'</div>'}).join('')+'</div><div class="row"><button class="btn sm" data-ck>✓ تحقّق</button><button class="btn sm ghost" data-sol>اعرض الإجابات</button><span data-f style="color:#fff;font-size:19px"></span></div></div>';
  el.addEventListener('click',function(e){var w=e.target.closest('.k1bank span');if(w){$$('.k1bank span',el).forEach(function(z){z.classList.remove('sel')});sel=w;w.classList.add('sel');sfx.pop();return}
    var bl=e.target.closest('.k1bl');if(bl){if(bl._s){bl._s.classList.remove('used');bl._s=null;bl.textContent='؟';bl.className='k1bl';return}if(!sel)return;bl.textContent=sel.textContent;bl._s=sel;sel.classList.add('used');sel.classList.remove('sel');sel=null;bl.className='k1bl f';sfx.pop();return}
    if(e.target.closest('[data-ck]')){var bad=0,emp=0;$$('.k1bl',el).forEach(function(b){if(!b._s){emp++;return}var ok=b.textContent===b.dataset.a;b.className='k1bl f '+(ok?'ok':'no');if(!ok)bad++});$('[data-f]',el).innerHTML=emp?'أكمل جميع الفراغات أولًا.':bad?'<b style="color:#FFB4B4">'+n(bad)+' فراغات تحتاج مراجعة</b>':'<b style="color:#9FF0C4">✔ جميع الإجابات صحيحة!</b>';if(!emp&&!bad){sfx.win();confetti();done(id)}else sfx.no();return}
    if(e.target.closest('[data-sol]')){$$('.k1bl',el).forEach(function(b){b.textContent=b.dataset.a;b.className='k1bl f ok'});done(id)}});
  return {}})};
/* خريطة مفاهيم بفراغات */
K1.tree=function(id,title,o){add(id,title,function(el){var sel=null,words=[];
  function node(x){if(x.b){words.push(x.t);return '<div class="k1n bl" data-a="'+esc(x.t)+'">؟</div>'}return '<div class="k1n">'+x.t+'</div>'}
  function col(c){return '<div class="k1col">'+node(c)+(c.k?'<span class="k1lk">'+c.k+'</span>':'')+(c.c?'<div class="k1tr">'+c.c.map(col).join('')+'</div>':'')+'</div>'}
  var html='<div class="k1tree"><div class="k1n root">'+o.root+'</div><span class="k1lk">'+(o.link||'')+'</span><div class="k1tr">'+o.c.map(col).join('')+'</div></div>';
  el.innerHTML=k1head(o.k||'تدريب',o.h||title,o.pg)+'<div class="k1b">'+html+'<div class="k1bank">'+shuffle(words,5).map(function(w){return '<span>'+w+'</span>'}).join('')+'</div><div class="row" style="justify-content:center"><button class="btn sm" data-ck>✓ تحقّق</button><span data-f style="color:#fff;font-size:19px"></span></div></div>';
  el.addEventListener('click',function(e){var w=e.target.closest('.k1bank span');if(w){$$('.k1bank span',el).forEach(function(z){z.classList.remove('sel')});sel=w;w.classList.add('sel');sfx.pop();return}
    var bl=e.target.closest('.k1n.bl');if(bl){if(bl._s){bl._s.classList.remove('used');bl._s=null;bl.textContent='؟';bl.className='k1n bl';return}if(!sel)return;bl.textContent=sel.textContent;bl._s=sel;sel.classList.add('used');sel.classList.remove('sel');sel=null;bl.className='k1n bl f';sfx.pop();return}
    if(e.target.closest('[data-ck]')){var bad=0,emp=0;$$('.k1n.bl',el).forEach(function(b){if(!b._s){emp++;return}var ok=b.textContent===b.dataset.a;b.className='k1n bl f '+(ok?'ok':'no');if(!ok)bad++});$('[data-f]',el).innerHTML=emp?'أكمل جميع الفراغات أولًا.':bad?'<b style="color:#FFB4B4">'+n(bad)+' تحتاج مراجعة</b>':'<b style="color:#9FF0C4">✔ خريطة صحيحة! اقرؤوها بجمل كاملة.</b>';if(!emp&&!bad){sfx.win();done(id)}else sfx.no()}});
  return {}})};
/* ترتيب الشاشات كما في العرض */
K1.order=function(ids){var m={};SCR.forEach(function(s){m[s.id]=s});var miss=SCR.filter(function(s){return ids.indexOf(s.id)<0}).map(function(s){return s.id});if(miss.length)console.error('K1.order: شاشات غير مرتبة',miss);
  var out=ids.map(function(i){if(!m[i])console.error('K1.order: غير موجودة',i);return m[i]}).filter(Boolean);SCR.length=0;out.concat(miss.map(function(i){return m[i]})).forEach(function(s){SCR.push(s)})};
K1.rename=function(id,t){SCR.forEach(function(s){if(s.id===id)s.title=t})};
/* الاستراتيجيات: شاشة خطة الدرس + شريط الشارات + الأدوات الصفية */
K1.strat=function(key,rows){
  SK.init({key:key,sfx:{pop:sfx.pop,tick:sfx.tick,ok:sfx.ok,no:sfx.no},toast:function(m){toast(m)},teams:function(){return ST.teams.map(function(t,i){return {n:t,c:['#F2545B','#3D8BFD','#E8A21B','#18A058'][i%4]}})},
   stratRoster:{api:'https://script.google.com/macros/s/AKfycbxp-t4JgGO5WiK6hoacjTyBqFnG-9bSWClplOpVV4VDuTV7T4tY0swB1Ll36kr_djJ7nQ/exec',classes:['1/1','2/1','3/1','4/1']}});
  var gi=-1;SCR.forEach(function(s,i){if(s.id==='goals')gi=i});
  SCR.splice(gi+1,0,{id:'plan',title:'خطة الدرس والاستراتيجيات',render:function(el){var k=0,R=[];SCR.forEach(function(s,i){var c=rows[s.id];if(c){k++;R.push({i:i,num:k,name:s.title,c:c})}});
    el.innerHTML=k1head('للمعلم والزائر','خطة الدرس: الأهداف والاستراتيجيات والتقويم')+'<div class="k1b"><div class="k1c" style="padding:10px 14px;font-size:17px">'+SK.planHTML('',R)+'</div></div>';SK.wirePlan(el,function(i){show(+i)});done('plan');return {}}});
  SCR.forEach(function(s){var r=s.render;s.render=function(el){var c=r(el);var bar=$('.k1sbar');if(!bar){bar=document.createElement('div');bar.className='k1sbar';$('#stage').appendChild(bar)}bar.innerHTML='';
    var tb=document.createElement('button');tb.className='k1tb';tb.textContent='🧰 الأدوات الصفية';tb.onclick=function(e){e.stopPropagation();SK.toolbox()};bar.appendChild(tb);if(rows[s.id])bar.appendChild(SK.badges(rows[s.id],key));return c}})};

/* ===== الدرس الثالث: تقويم التفسيرات العلمية + مراجعة الفصل — مطابقة العرض + الاستراتيجيات ===== */
K1.page('sum','الخلاصة',{k:'الخلاصة',h:'الخلاصة',pg:34,html:
 '<div class="k1g" style="grid-template-columns:1fr 1fr">'+[['صدّق أو لا تصدّق','من خلال دمج معلوماتك السابقة مع المعلومات الجديدة تستطيع أن تقرر ما إذا كان موضوع ما واقعيًّا، وقابلًا للتصديق.'],['تقويم الاستنتاج','يجب أن يكون للاستنتاجات معنى حتى يمكن اعتمادها.'],['تقويم البيانات','من المهم تسجيل الملاحظات خلال تنفيذ الاستقصاء. البيانات المعتمدة أو الموثوقة بيانات محددة، وقابلة للتكرار.'],['تقويم المواد الدعائية','تقوم المختبرات المستقلة الموثوقة بفحص المنتجات للتأكد من صلاحيتها.']].map(function(x,i){return '<div class="k1c'+(i?' k1r':'')+'"><h3 style="color:#18A058">'+x[0]+'</h3><div class="'+(i?'k1a':'')+'">'+x[1]+'</div></div>'}).join('')+'</div>'});
K1.quiz('hw','الواجب: اختبر نفسك',{k:'اختبر نفسك · الواجب',h:'اختبر نفسك (التسليم يوم الأربعاء القادم)',pg:33,qs:[
 {no:'١. صف',q:'صف أهمية إعادة التجارب العلمية.',a:'إعادة التجربة تتحقق من أن البيانات قابلة للتكرار؛ فإذا حصل علماء آخرون على النتائج نفسها أصبحت البيانات موثوقة، وإن لم يحصلوا عليها كان هناك شك في مصداقيتها.'},
 {no:'٢. وضّح',q:'كيف يمكن أن تكون الإعلانات التجارية مضللة؟',a:'عندما تقدّم ادعاءات غير مدعومة ببيانات محددة وقابلة للتكرار، أو تبالغ في وصف المنتج، أو تعتمد على عبارات عامة وآراء أشخاص بدل نتائج الفحوص المستقلة.'},
 {no:'٣. صنّف (تطبيق المهارات)',q:'شاهد ثلاثة إعلانات تجارية تُبث من خلال التلفاز، أو ثلاثة من الإعلانات التي تنشر في الجرائد، ثم سجّل ما يدّعيه كل منها، وصنّفها إلى: إعلانات واقعية، أو مضلّلة، أو علمية.',a:'نشاط تطبيقي: يسجّل الطالب ادعاء كل إعلان، ويسأل: هل يدعمه دليل محدد قابل للتكرار؟ فإن دعمته نتائج فحص علمي فهو علمي، وإن كان معقولًا بلا مبالغة فهو واقعي، وإن بالغ بلا دليل فهو مضلّل.'}]});
K1.quiz('ev','تقييم: الأسئلة ١–٦',{k:'تقييم',h:'أسئلة التقييم كما في العرض',qs:[
 {no:'السؤال رقم ١',q:'الربط بين ما تعرفه من معلومات مع الحقائق الجديدة لتقرر مدى موافقتك لشيء ما:',o:['التوقع','التفكير الناقد','الفرضية','النظرية'],a:1},
 {no:'السؤال رقم ٢',q:'ينقسم التقويم إلى قسمين، ما هما؟',a:'١) تقويم الملاحظات. ٢) تقويم الاستنتاجات.'},
 {no:'السؤال رقم ٣',q:'المعلومات التي يتم جمعها أثناء البحث العلمي من خلال الملاحظات تسمى:',o:['الثوابت','التفكير الناقد','البيانات','التخمين'],a:2},
 {no:'السؤال رقم ٤',q:'صح أم خطأ: يجب علينا تصديق أي ادعاء غير مدعوم بالبيانات.',o:['صح','خطأ'],tf:1,a:1,ex:'علينا أن نحذر من تصديق أي ادعاء غير مدعوم بالبيانات.'},
 {no:'السؤال رقم ٥',q:'تكون البيانات معتمدة وموثوقة إذا كانت بيانات:',o:['محددة','قابلة للتكرار','دقيقة','جميع ما سبق صحيح'],a:3},
 {no:'السؤال رقم ٦',q:'متى تسجل البيانات أثناء إجراء الاستقصاء؟ ولماذا؟',a:'أثناء التجربة؛ حتى يمكن قراءتها وفهمها من جديد، وإعادة التجربة إذا لزم الأمر.'}]});
/* ===== مراجعة الفصل ===== */
K1.page('ideas','مراجعة: الأفكار الرئيسة',{k:'مراجعة الفصل',h:'مراجعة الأفكار الرئيسة',pg:39,html:
 '<div class="k1g" style="grid-template-columns:repeat(3,1fr);font-size:18px">'+[['الدرس الأول: العلم وعملياته',['العلم طريقة التعلم عن العالم الطبيعي، ويمكن أن يقدم تفسيرات عن سبب حدوث الأشياء، وكيفية حدوثها.','الفرضية تخمين لجواب أو تفسير منطقي متوقع مبني على معارف وملاحظات سابقة.','تستخدم التجارب المضبوطة في الاستقصاءات العلمية حيث يتم تغيير عامل وملاحظة تأثيره في عامل آخر.']],
 ['الدرس الثاني: النماذج العلمية',['النموذج أي تمثيل لشيء أو حدث يستخدم كأداة لفهم العالم الطبيعي، وللتواصل بالأفكار والتحقق من التوقعات وتوفير الجهد والمال.','هناك ثلاثة أنواع من النماذج وهي: المادية، والحاسوبية، والفكرية.','يمكن تعديل النماذج في ضوء المعلومات الجديدة، فهي قابلة للتطور.']],
 ['الدرس الثالث: تقويم التفسيرات العلمية',['البيانات المعتمدة أو الموثوقة بيانات محددة، وقابلة للتكرار، أي يمكن أن يتوصل إليها علماء آخرون.','يعد الاستنتاج موثوقًا إذا كان مقبولًا ذا معنى، ويشكل التفسير الأقرب للصواب.']]].map(function(x){return '<div class="k1c"><h3 style="color:#C0392B;font-size:21px">'+x[0]+'</h3><ol style="line-height:1.7">'+x[1].map(function(t){return '<li>'+t+'</li>'}).join('')+'</ol></div>'}).join('')+'</div>'});
K1.tree('cmap2','مراجعة: خريطة مفاهيم',{k:'مراجعة الأفكار الرئيسة',h:'خريطة مفاهيم',pg:37,root:'العلم',link:'يمكن أن يقسم إلى',c:[
 {t:'علم الأحياء',b:1,k:'يدرس',c:[{t:'الأنظمة الحية وتفاعلاتها'}]},
 {t:'علم الأرض والفضاء',b:1,k:'يدرس',c:[{t:'أنظمة الأرض وأنظمة الفضاء'}]},
 {t:'العلوم الطبيعية',b:1,k:'يمكن أن تقسم إلى',c:[{t:'علم الكيمياء',b:1,k:'يدرس',c:[{t:'المادة وتفاعلاتها'}]},{t:'علم الفيزياء',b:1,k:'يدرس',c:[{t:'الطاقة ودورها في تغير المادة'}]}]}]});
K1.page('rel','مراجعة: استخدام المفردات',{k:'مراجعة الفصل · استخدام المفردات',h:'وضّح العلاقة بين كل مصطلحين مما يلي',pg:40,html:
 '<div class="k1g" style="grid-template-columns:1fr 1fr;font-size:18px">'+[['١. الفرضية – النظرية العلمية','الفرضية: تخمين لجواب أو تفسير منطقي محتمل يعتمد على المعرفة والملاحظة.','النظرية العلمية: محاولة لتفسير سلوك أو نمط معين تم ملاحظته مرارًا في العالم الطبيعي.'],['٢. الثوابت – المتغيرات','الثوابت: عوامل يتم ضبطها أثناء التجربة ولا تتغير.','المتغيرات: عوامل يمكن أن تتغير أثناء التجربة.'],['٣. علم الأرض – علم الفيزياء','علم الأرض: هو العلم الذي يهتم بدراسة مكونات الأرض.','علم الفيزياء: العلم الذي يهتم بدراسة الطاقة وقدرتها على تغيير المادة.'],['٤. النظرية العلمية – القانون العلمي','النظرية العلمية: محاولة لتفسير سلوك أو نمط معين تم ملاحظته مرارًا في العالم الطبيعي.','القانون العلمي: القاعدة التي تصف نمطًا أو سلوكًا معينًا في الطبيعة.']].map(function(x){return '<div class="k1c k1r"><h3 style="font-size:21px">'+x[0]+'</h3><div class="k1a">'+x[1]+'<br>'+x[2]+'</div></div>'}).join('')+'</div>'});
K1.quiz('rev','مراجعة: تثبيت المفاهيم',{k:'مراجعة الفصل · تثبيت المفاهيم والتفكير الناقد',h:'تثبيت المفاهيم',pg:40,qs:[
 {no:'٥',q:'ماذا تعمل إذا كانت نتائج تجاربك لا تدعم فرضيتك؟',o:['لا أعمل شيئًا','أعيد التجربة حتى تتفق مع الفرضية','أغيّر الفرضية','أغيّر بياناتي حتى تطابق فرضيتي'],a:2},
 {no:'٦',q:'ماذا نسمّي صورة ثلاثية الأبعاد لبناء معين حصلنا عليها باستخدام الحاسوب؟',o:['نموذجًا','ثابتًا','فرضية','متغيرًا'],a:0},
 {no:'٧',q:'أي مما يلي يمكن أن يفسر حدثًا في العالم الطبيعي؟',o:['قانون علمي','نظرية علمية','تقنية','تجربة علمية'],a:1},
 {no:'٨',q:'يُعد نموذج الطائرة مثالًا على نموذج:',o:['مادي','فكري','حاسوبي','عقلي'],a:0},
 {no:'٩',q:'ماذا نعني بالاستدلال؟',o:['عمل ملاحظات','استبدال','استخلاص نتائج','اختبار'],a:2},
 {no:'١٠. قارن (التفكير الناقد)',q:'قارن بين القانون العلمي والنظرية العلمية من حيث أوجه الشبه والاختلاف.',a:'الشبه: كلاهما مبني على ملاحظات وتجارب متكررة ويساعد على فهم العالم الطبيعي. الاختلاف: القانون يصف نمطًا أو سلوكًا معينًا في الطبيعة دون أن يفسره، أما النظرية فتفسّر سبب حدوثه، وهي قابلة للتغير في ضوء بيانات جديدة.'}]});
K1.rename('classify','دليل أم ادعاء؟');K1.rename('sheet','بطاقة تقويم إعلان (إثرائي)');K1.rename('race','سباق المحققين (إثرائي)');K1.rename('comp','المسابقة الجماعية (إثرائي)');K1.rename('eval','تقويم إضافي (إثرائي)');
K1.order(['intro','warm','goals','critical','data','notes','repeat','ads','classify','sum','hw','ev','sheet','race','comp','eval','ideas','cmap2','rel','rev','end']);
K1.strat('g7c1l3',{
 intro:{s:['poe','brain'],g:'١',sk:'التساؤل',ev:'صدّق أو لا تصدّق'},
 warm:{s:['tps'],g:'١',sk:'التفكير الناقد',ev:'هل تصدق ما تراه في الصورة؟'},
 goals:{s:['kwl'],g:'١',sk:'الوعي بالأهداف',ev:'مهام الملف',w:{kwl:{type:'kwl',phase:'kw',topic:'تقويم التفسيرات العلمية'}}},
 critical:{s:['hats'],g:'١',sk:'التفكير الناقد',ev:'قسما التقويم',w:{hats:{type:'hats',topic:'إعلان يقول: «هذا المشروب يجعلك أذكى خلال أسبوع!»',q:['ما المعلومات والبيانات المتوافرة فعلًا؟','ما شعورك تجاه هذا الادعاء؟','ما المخاطر إذا صدّقناه دون دليل؟','ما الفائدة لو كان صحيحًا ومثبتًا؟','كيف نختبر الادعاء بتجربة مضبوطة؟','ما الحكم النهائي؟'],a:['لا توجد بيانات محددة ولا قابلة للتكرار.','الحماس أو الشك.','نخسر المال وقد نضر صحتنا.','قد يساعد الطلاب لو أثبتته فحوص مستقلة.','نقارن مجموعتين متماثلتين: إحداهما تشرب المشروب، ونقيس النتائج ونكرر.','لا نصدق الادعاء حتى تدعمه بيانات موثوقة.']}}},
 data:{s:['inq','heads'],g:'١',sk:'تحليل البيانات',ev:'الجدول التكراري'},
 notes:{s:['coop'],g:'١',sk:'التوثيق',ev:'أهمية تدوين الملاحظات'},
 repeat:{s:['poe','inq'],g:'١',sk:'التجريب',ev:'قابلية التكرار'},
 ads:{s:['crit','tps'],g:'١',sk:'التقويم',ev:'محقق الإعلانات'},
 classify:{s:['game'],g:'١',sk:'التمييز',ev:'دليل أم ادعاء؟'},
 sum:{s:['tl'],g:'١',sk:'التلخيص',ev:'إشارة المرور',w:{tl:{type:'tl',goals:['تقوّم التفسيرات العلمية']}}},
 hw:{s:['tps','sticks'],g:'١',sk:'الوصف والتوضيح',ev:'اختبر نفسك'},
 ev:{s:['heads','sticks'],g:'١',sk:'التذكر والتطبيق',ev:'تقييم ١–٦'},
 sheet:{s:['coop'],g:'١',sk:'التقويم',ev:'بطاقة تقويم إعلان'},
 race:{s:['game'],g:'١',sk:'التمييز',ev:'سباق المحققين'},
 comp:{s:['game'],g:'١',sk:'التذكر',ev:'المسابقة'},
 eval:{s:['exit'],g:'١',sk:'التقويم الختامي',ev:'تقرير الإتقان'},
 ideas:{s:['jigsaw'],g:'الفصل',sk:'التلخيص',ev:'الأفكار الرئيسة',w:{jigsaw:{type:'jigsaw',cards:[{ic:'🔬',n:'الدرس الأول',t:'العلم وعملياته: الطريقة العلمية، والفرضية، والتجربة المضبوطة.'},{ic:'🧩',n:'الدرس الثاني',t:'النماذج العلمية: أنواعها الثلاثة، واستخداماتها، وتطورها.'},{ic:'🕵',n:'الدرس الثالث',t:'تقويم التفسيرات: البيانات الموثوقة محددة وقابلة للتكرار، والاستنتاج الموثوق ذو معنى.'}],after:'يلخّص ممثل كل فريق درسه في جملتين.'}}},
 cmap2:{s:['cmap'],g:'الفصل',sk:'التنظيم',ev:'خريطة المفاهيم'},
 rel:{s:['tps'],g:'الفصل',sk:'المقارنة',ev:'العلاقة بين المصطلحات'},
 rev:{s:['heads','sticks'],g:'الفصل',sk:'التطبيق والتفكير الناقد',ev:'تثبيت المفاهيم ٥–١٠'},
 end:{s:['kwl'],g:'١',sk:'التلخيص',ev:'خلاصة الملف',w:{kwl:{type:'kwl',phase:'l',topic:'تقويم التفسيرات العلمية'}}}});

start();

})();