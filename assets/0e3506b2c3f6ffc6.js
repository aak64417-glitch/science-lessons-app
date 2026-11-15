
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

/* ===== الفصل السادس: الجدول الدوري — بيانات العناصر وأدوات مشتركة ===== */
(function(){
/* رمز|الاسم|الكتلة الذرية|الحالة (s صلب، l سائل، g غاز)|الفئة (m فلز، n لا فلز، d شبه فلز، u غير مؤكدة) */
const RAW='H|هيدروجين|1.008|g|n;He|هيليوم|4.003|g|n;Li|ليثيوم|6.941|s|m;Be|بيريليوم|9.012|s|m;B|بورون|10.81|s|d;C|كربون|12.011|s|n;N|نيتروجين|14.007|g|n;O|أكسجين|15.999|g|n;F|فلور|18.998|g|n;Ne|نيون|20.180|g|n;'+
'Na|صوديوم|22.990|s|m;Mg|ماغنسيوم|24.305|s|m;Al|ألومنيوم|26.982|s|m;Si|سيليكون|28.086|s|d;P|فوسفور|30.974|s|n;S|كبريت|32.065|s|n;Cl|كلور|35.453|g|n;Ar|أرجون|39.948|g|n;'+
'K|بوتاسيوم|39.098|s|m;Ca|كالسيوم|40.078|s|m;Sc|سكانديوم|44.956|s|m;Ti|تيتانيوم|47.867|s|m;V|فناديوم|50.942|s|m;Cr|كروم|51.996|s|m;Mn|منجنيز|54.938|s|m;Fe|حديد|55.845|s|m;Co|كوبالت|58.933|s|m;Ni|نيكل|58.693|s|m;Cu|نحاس|63.546|s|m;Zn|خارصين|65.38|s|m;Ga|جاليوم|69.723|s|m;Ge|جرمانيوم|72.64|s|d;As|زرنيخ|74.922|s|d;Se|سيلينيوم|78.96|s|n;Br|بروم|79.904|l|n;Kr|كريبتون|83.798|g|n;'+
'Rb|روبيديوم|85.468|s|m;Sr|سترونتيوم|87.62|s|m;Y|إتريوم|88.906|s|m;Zr|زركونيوم|91.224|s|m;Nb|نيوبيوم|92.906|s|m;Mo|موليبدنوم|95.96|s|m;Tc|تكنيشيوم|(98)|s|m;Ru|روثينيوم|101.07|s|m;Rh|روديوم|102.906|s|m;Pd|بلاديوم|106.42|s|m;Ag|فضة|107.868|s|m;Cd|كادميوم|112.411|s|m;In|إنديوم|114.818|s|m;Sn|قصدير|118.71|s|m;Sb|أنتيمون|121.76|s|d;Te|تيلوريوم|127.60|s|d;I|يود|126.904|s|n;Xe|زينون|131.293|g|n;'+
'Cs|سيزيوم|132.905|s|m;Ba|باريوم|137.327|s|m;La|لانثانوم|138.905|s|m;Ce|سيريوم|140.116|s|m;Pr|براسيوديميوم|140.908|s|m;Nd|نيوديميوم|144.242|s|m;Pm|بروميثيوم|(145)|s|m;Sm|ساماريوم|150.36|s|m;Eu|يوروبيوم|151.964|s|m;Gd|جادولينيوم|157.25|s|m;Tb|تيربيوم|158.925|s|m;Dy|ديسبروسيوم|162.50|s|m;Ho|هولميوم|164.930|s|m;Er|إربيوم|167.259|s|m;Tm|ثوليوم|168.934|s|m;Yb|إتربيوم|173.054|s|m;Lu|لوتيتيوم|174.967|s|m;'+
'Hf|هافنيوم|178.49|s|m;Ta|تنتالوم|180.948|s|m;W|تنجستن|183.84|s|m;Re|رينيوم|186.207|s|m;Os|أوزميوم|190.23|s|m;Ir|إريديوم|192.217|s|m;Pt|بلاتين|195.084|s|m;Au|ذهب|196.967|s|m;Hg|زئبق|200.59|l|m;Tl|ثاليوم|204.383|s|m;Pb|رصاص|207.2|s|m;Bi|بزموت|208.980|s|m;Po|بولونيوم|(209)|s|d;At|أستاتين|(210)|s|d;Rn|رادون|(222)|g|n;'+
'Fr|فرانسيوم|(223)|s|m;Ra|راديوم|(226)|s|m;Ac|أكتينيوم|(227)|s|m;Th|ثوريوم|232.038|s|m;Pa|بروتاكتينيوم|231.036|s|m;U|يورانيوم|238.029|s|m;Np|نبتونيوم|(237)|s|m;Pu|بلوتونيوم|(244)|s|m;Am|أمريسيوم|(243)|s|m;Cm|كوريوم|(247)|s|m;Bk|بركيليوم|(247)|s|m;Cf|كاليفورنيوم|(251)|s|m;Es|آينشتاينيوم|(252)|s|m;Fm|فيرميوم|(257)|s|m;Md|مندليفيوم|(258)|s|m;No|نوبيليوم|(259)|s|m;Lr|لورنسيوم|(262)|s|m;'+
'Rf|رذرفورديوم|(267)|s|m;Db|دوبنيوم|(268)|s|m;Sg|سيبورجيوم|(271)|s|m;Bh|بوريوم|(272)|s|m;Hs|هاسيوم|(270)|s|m;Mt|مايتنريوم|(276)|s|m;Ds|دارمستاتيوم|(281)|s|m;Rg|رونتجينيوم|(280)|s|m;Cn|كوبرنيسيوم|(285)|s|m;Nh|نيهونيوم|(284)|s|u;Fl|فليروفيوم|(289)|s|u;Mc|موسكوفيوم|(288)|s|u;Lv|ليفرموريوم|(293)|s|u;Ts|تينيسين|(294)|s|u;Og|أوجانيسون|(294)|s|u';
const EL=RAW.split(';').map((r,i)=>{const [s,n,m,st,c]=r.split('|');return {z:i+1,s,n,m,st,c};});
EL.forEach(e=>{const z=e.z;let p,g=null,f=null;
 const B=[2,10,18,36,54,86,118];p=B.findIndex(b=>z<=b)+1;
 if(z<=2)g=z===1?1:18;
 else if(z<=18){const st=p===2?3:11,i=z-st;g=i<2?i+1:i+11;}
 else if(z<=54){const st=p===4?19:37;g=z-st+1;}
 else{const st=p===6?55:87,i=z-st;if(i<3)g=i+1;else if(i<17)f=i-3;else g=i-17+4;}
 e.p=p;e.g=g;e.f=f;
 e.reg=f!=null?'انتقالية داخلية':(g>=3&&g<=12?'انتقالية':'ممثلة');
 e.syn=(z===43||z===61||z>=93);});
const CAT={m:'فلز',n:'لا فلز',d:'شبه فلز',u:'خواصه غير مؤكدة'};
const ST={s:'صلبة',l:'سائلة',g:'غازية'};
const CCOL={m:'#7cc4ea',n:'#f6d04d',d:'#9fd18b',u:'#c9ced3'};
const RCOL={'ممثلة':'#f4a261','انتقالية':'#5fb3d9','انتقالية داخلية':'#b48ee8'};
const SCOL={s:'#a8b5bd',l:'#4aa3df',g:'#f28b82'};
const bySym=s=>EL.find(e=>e.s===s);
/* صندوق مفتاح العنصر بصيغة SVG */
function keyBox(e,o){o=o||{};const w=o.w||150,h=o.h||170;const stIc=e.st==='g'?'<path d="M0 -9c5 0 8 4 8 8 0 5-8 12-8 12s-8-7-8-12c0-4 3-8 8-8z" fill="#ef4444"/>':e.st==='l'?'<path d="M0 -10 L7 2 A7 7 0 1 1 -7 2z" fill="#3b82f6"/>':'<rect x="-8" y="-8" width="16" height="16" rx="2" fill="#475569"/>';
 return `<svg viewBox="0 0 ${w} ${h}" style="max-width:${w}px;width:100%" role="img" aria-label="مفتاح عنصر ${e.n}"><rect x="2" y="2" width="${w-4}" height="${h-4}" rx="10" fill="${o.fill||CCOL[e.c]}" stroke="#334155" stroke-width="3"/>
  <text x="${w/2}" y="${h*.18}" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="${h*.1}" fill="#0f172a">${e.n}</text>
  <text x="${w*.2}" y="${h*.36}" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="${h*.11}" fill="#0f172a" direction="ltr">${e.z}</text>
  <g transform="translate(${w*.82} ${h*.33})">${stIc}</g>
  <text x="${w/2}" y="${h*.68}" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="800" font-size="${h*.3}" fill="#0f172a" ${e.syn?'stroke="#0f172a" stroke-width="1.5" fill-opacity="0"':''} direction="ltr">${e.s}</text>
  <text x="${w/2}" y="${h*.9}" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="${h*.1}" fill="#0f172a" direction="ltr">${e.m}</text></svg>`;}
/* جدول دوري SVG كامل: mode=cat|reg|st ، sel = رقم ذري ، hl = دالة إبراز */
function ptSVG(o){o=o||{};const cw=40,ch=44,x0=30,y0=26,gap=14;const W=x0+18*cw+8,H=y0+7*ch+gap+2*ch+30;
 const col=e=>o.mode==='reg'?RCOL[e.reg]:o.mode==='st'?SCOL[e.st]:o.mode==='syn'?(e.syn?'#f9a8d4':'#e2e8f0'):CCOL[e.c];
 let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="الجدول الدوري للعناصر" style="direction:ltr">`;
 for(let g=1;g<=18;g++)s+=`<text x="${x0+(g-1)*cw+cw/2}" y="${y0-8}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--muted)" font-family="IBM Plex Sans Arabic">${g}</text>`;
 for(let p=1;p<=7;p++)s+=`<text x="${x0-12}" y="${y0+(p-1)*ch+ch/2+4}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--muted)" font-family="IBM Plex Sans Arabic">${p}</text>`;
 EL.forEach(e=>{let x,y;if(e.f!=null){x=x0+(e.f+3)*cw;y=y0+7*ch+gap+(e.p-6)*ch;}else{x=x0+(e.g-1)*cw;y=y0+(e.p-1)*ch;}
  const dim=o.hl&&!o.hl(e);const on=o.sel===e.z;
  s+=`<g class="pt-el" data-z="${e.z}" style="cursor:pointer" opacity="${dim?.18:1}"><rect x="${x+1}" y="${y+1}" width="${cw-2}" height="${ch-2}" rx="4" fill="${col(e)}" stroke="${on?'#e11d48':'#475569'}" stroke-width="${on?3:.8}"/><text x="${x+4}" y="${y+12}" font-size="9" fill="#0f172a" font-family="IBM Plex Sans Arabic">${e.z}</text><text x="${x+cw/2}" y="${y+31}" text-anchor="middle" font-size="15" font-weight="800" fill="#0f172a" font-family="IBM Plex Sans Arabic">${e.s}</text></g>`;});
 s+=`<text x="${x0+2*cw+cw/2}" y="${y0+7*ch+gap+ch/2+4}" text-anchor="middle" font-size="9.5" fill="var(--muted)" font-family="IBM Plex Sans Arabic">اللانثانيدات</text><text x="${x0+2*cw+cw/2}" y="${y0+8*ch+gap+ch/2+4}" text-anchor="middle" font-size="9.5" fill="var(--muted)" font-family="IBM Plex Sans Arabic">الأكتنيدات</text>`;
 return s+'</svg>';}
const legend=(mode)=>{const L=mode==='reg'?Object.entries(RCOL):mode==='st'?Object.entries(SCOL).map(([k,v])=>[ST[k],v]):mode==='syn'?[['مُصنَّع','#f9a8d4'],['طبيعي','#e2e8f0']]:Object.entries(CCOL).map(([k,v])=>[CAT[k],v]);
 return `<div class="c6-leg">${L.map(([t,c])=>`<span><i style="background:${c}"></i>${t}</span>`).join('')}</div>`;};
/* استراتيجيات إضافية للدليل */
const C=SK.CAT;
C.cards=C.cards||{n:'البطاقات الملوّنة',ic:'🟥',why:'يشارك كل الطلاب في الإجابة معًا، ويرى المعلم فورًا نسبة الإتقان والأخطاء الشائعة.',steps:['يحمل كل طالب أربع بطاقات ملوّنة: أحمر (أ)، أزرق (ب)، أخضر (ج)، أصفر (د).','يُعرض السؤال، ويفكر الطلاب ١٠ ثوانٍ.','يرفع الجميع البطاقة معًا عند الإشارة، ثم يُكشف الجواب ويُناقش.'],time:'دقيقة لكل سؤال',role:'يجيب فرديًّا أمام الجميع'};
C.spot=C.spot||{n:'اكتشف الخطأ',ic:'🔍',why:'ينمّي التفكير الناقد والدقة العلمية بتصحيح المفاهيم الخاطئة الشائعة.',steps:['تُعرض عبارة فيها خطأ علمي.','تتشاور المجموعة وتحدد الكلمة الخاطئة.','يذكر ممثل المجموعة التصحيح ودليله.'],time:'٣ دقائق',role:'ناقد ومصحّح'};
C.champ=C.champ||{n:'تحدي الأبطال',ic:'⚔',why:'منافسة عادلة بزمن محدد ترفع الحماس وتعزز الاستدعاء السريع.',steps:['تتنافس المجموعات بالتناوب.','يجيب الفريق صاحب الدور خلال زمن محدد.','الإجابة الصحيحة تقدّم الفريق خطوة نحو خط النهاية.'],time:'٨ دقائق',role:'منافس ومتعاون مع فريقه'};
C.who=C.who||{n:'من أنا؟',ic:'🕵',why:'ألغاز بأدلة متدرجة تنشّط الاستدعاء وتربط العنصر بخواصه واستخداماته.',steps:['يُعرض الدليل الأول.','يحاول الطلاب التخمين؛ كل دليل إضافي يقلل النقاط.','يُكشف العنصر ويُلخّص موقعه وخواصه.'],time:'٥ دقائق',role:'محقق يستنتج'};
C.time=C.time||{n:'آلة الزمن (الخط الزمني)',ic:'⏳',why:'ترتيب الأحداث زمنيًّا يوضح أن المعرفة العلمية تراكمية وقابلة للتطور.',steps:['تُعرض بطاقات الأحداث مبعثرة.','يرتبها الطلاب زمنيًّا.','يناقشون ماذا أضاف كل عالم لمن قبله.'],time:'٤ دقائق',role:'يرتّب ويربط'};
C.mbox=C.mbox||{n:'الصندوق الغامض',ic:'🎁',why:'عنصر المفاجأة يثير الفضول ويجعل المراجعة ممتعة.',steps:['يختار الفريق صندوقًا برقمه.','يُفتح الصندوق على سؤال مفاجئ.','تُمنح النقاط عند الإجابة الصحيحة.'],time:'٨ دقائق',role:'يختار ويجيب'};
window.PT={EL,CAT,ST,CCOL,RCOL,SCOL,bySym,keyBox,ptSVG,legend};
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

/* ===== تجارب افتراضية — العناصر الانتقالية ===== */
(function(){
const {$,$$,G,STN,def,say,SFX,mcq}=K;
const AR='font-family="IBM Plex Sans Arabic"';

/* ---------- 8) اختبار المغناطيس ---------- */
const MG=[{s:'Fe',n:'حديد',m:1,c:'#8a949b'},{s:'Co',n:'كوبالت',m:1,c:'#7d8ca3'},{s:'Ni',n:'نيكل',m:1,c:'#b9b3a0'},{s:'Cu',n:'نحاس',m:0,c:'#c7743e'},{s:'Zn',n:'خارصين',m:0,c:'#a8b3b9'},{s:'Ag',n:'فضة',m:0,c:'#d9dde0'},{s:'Au',n:'ذهب',m:0,c:'#e3b341'},{s:'Al',n:'ألومنيوم',m:0,c:'#c9d1d6'}];
def('lab8',{after:'s2',n:'🧪 اختبار المغناطيس',eyebrow:'تجربة افتراضية · مقترحة',title:'اختبار المغناطيس: من ينجذب؟',goal:'حرّك المغناطيس فوق كل عيّنة (المس العيّنة). أي الفلزات تنجذب؟ وماذا تلاحظ على مواقعها في الجدول؟',plan:6,core:1,
 icon:'<path d="M20 12v28a20 20 0 0 0 40 0V12H48v28a8 8 0 0 1-16 0V12z" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l8svg" viewBox="0 0 640 300" aria-label="طاولة عليها عينات فلزية"></svg></div>
  <div class="side"><div class="card"><h3>النتائج</h3><div id="l8r" class="c6-tiles"></div><div id="l8fb"></div></div></div></div>
  <div class="card"><div class="stage" id="l8pt" style="padding:6px"></div><div id="l8q" class="mt"></div></div>`,
 init(){const tested={};let lift=null;
  const draw=()=>{let s=`<rect width="640" height="300" fill="var(--wall)"/><rect y="236" width="640" height="12" fill="var(--bench-top)"/><rect y="248" width="640" height="52" fill="var(--bench)"/>`;
   MG.forEach((o,i)=>{const x=50+i*77,up=lift===i&&o.m;s+=`<g class="l8o" data-i="${i}" style="cursor:pointer"><rect x="${x-30}" y="140" width="60" height="100" fill="transparent"/>${lift===i?`<g transform="translate(${x} 70)"><path d="M-22 0v-36h14v36a8 8 0 0 0 16 0v-36h14v36a22 22 0 0 1-44 0z" fill="#dc2626"/><rect x="-22" y="-36" width="14" height="10" fill="#e5e7eb"/><rect x="8" y="-36" width="14" height="10" fill="#e5e7eb"/></g>`:''}<rect x="${x-22}" y="${up?96:214}" width="44" height="22" rx="4" fill="${o.c}" stroke="#475569"/><text x="${x}" y="${up?112:230}" text-anchor="middle" font-size="12" font-weight="800" fill="#0f172a">${o.s}</text></g><text x="${x}" y="272" text-anchor="middle" ${AR} font-size="13" font-weight="700" fill="#fff">${o.n}</text>`;});
   $('#l8svg').innerHTML=s;$$('#l8svg .l8o').forEach(g=>g.onclick=()=>test(+g.dataset.i));};
  const res=()=>{$('#l8r').innerHTML=MG.map(o=>`<span class="c6-tile" style="background:${tested[o.s]==null?'#e2e8f0':tested[o.s]?'#bbf7d0':'#fecaca'}"><b>${o.s}</b><small>${tested[o.s]==null?'؟':tested[o.s]?'ينجذب':'لا ينجذب'}</small></span>`).join('');
   $('#l8pt').innerHTML=PT.ptSVG({mode:'reg',hl:e=>e.p===4&&e.g>=3&&e.g<=12,sel:Object.keys(tested).filter(s=>tested[s]).map(s=>PT.bySym(s).z)[0]});};
  function test(i){const o=MG[i];lift=i;tested[o.s]=o.m;o.m?SFX.correct():SFX.tick();draw();res();say($('#l8fb'),o.m?'ok':'info',o.m?`${o.n} ينجذب إلى المغناطيس!`:`${o.n} لا ينجذب إلى المغناطيس.`);
   if(Object.keys(tested).length===MG.length&&!STN.lab8.q){STN.lab8.q=1;mcq($('#l8q'),{q:'العناصر التي انجذبت تقع جميعها:',o:['متجاورة في الدورة الرابعة، وهي ثلاثية الحديد','في المجموعة 1','في المجموعة 18','في سلسلة اللانثانيدات'],a:0,why:'Fe وCo وNi في المجموعات 8 و9 و10 من الدورة الرابعة.'},'lab8',()=>G.complete('lab8'));}}
  draw();res();},
 reset(){STN.lab8.q=0;STN.lab8.init();},
 explain:'<p>تجربة افتراضية مقترحة: من بين الفلزات الشائعة تنجذب ثلاثية الحديد (Fe وCo وNi) إلى المغناطيس، بينما لا ينجذب النحاس والخارصين والفضة والذهب والألومنيوم.</p>'});

/* ---------- 9) فرن الانصهار وتحدي الفتيل ---------- */
const MP=[{s:'Hg',n:'زئبق',mp:-39,r:0,c:'#c0c6cc'},{s:'Pb',n:'رصاص',mp:327,r:1,c:'#7b8794'},{s:'Al',n:'ألومنيوم',mp:660,r:1,c:'#c9d1d6'},{s:'Cu',n:'نحاس',mp:1085,r:0,c:'#c7743e'},{s:'Fe',n:'حديد',mp:1538,r:0,c:'#8a949b'},{s:'W',n:'تنجستن',mp:3410,r:0,c:'#6b7280'}];
def('lab9',{after:'s4',n:'🧪 فرن الانصهار',eyebrow:'تجربة افتراضية · مقترحة',title:'فرن الانصهار وتحدي فتيل المصباح',goal:'ارفع حرارة الفرن وراقب متى ينصهر كل فلز. ثم اختر فلزًّا لفتيل مصباح يتوهج عند نحو 2500°س.',plan:7,core:1,
 icon:'<rect x="14" y="20" width="52" height="48" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M30 56q-6-10 4-20 0 8 6 8 2-8-2-16 14 8 10 28" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l9svg" viewBox="0 0 640 280" aria-label="فرن"></svg><div style="padding:10px"><label class="step-text">🌡 حرارة الفرن: <b id="l9v">25</b> °س<input type="range" id="l9T" min="-60" max="3500" step="10" value="25" style="width:100%"></label></div></div>
  <div class="side"><div class="card"><h3>💡 تحدي الفتيل</h3><p class="step-text">يصل الفتيل المتوهج إلى نحو 2500°س. اختر الفلز:</p><div class="c6-chips" id="l9f"></div><svg id="l9b" viewBox="0 0 200 180" style="max-width:220px;display:block;margin:auto"></svg><div id="l9fb"></div></div></div></div>
  <div class="card"><h3>استنتج</h3><div id="l9q"></div></div>`,
 init(){const svg=$('#l9svg');
  const draw=()=>{const T=+$('#l9T').value;$('#l9v').textContent=T;const glow=Math.max(0,Math.min(1,T/2500));
   let s=`<rect width="640" height="280" fill="var(--wall)"/><rect x="20" y="40" width="600" height="200" rx="16" fill="rgb(${60+glow*190|0},${50+glow*60|0},${40})" opacity=".9"/>`;
   MP.forEach((o,i)=>{const x=72+i*99,melt=T>=o.mp;s+=melt?`<ellipse cx="${x}" cy="196" rx="34" ry="9" fill="${o.c}" stroke="#334155"/><ellipse cx="${x-8}" cy="193" rx="10" ry="2" fill="#fff" opacity=".5"/>`:`<rect x="${x-22}" y="150" width="44" height="46" rx="3" fill="${o.c}" stroke="#334155"/>`;
    s+=`<text x="${x}" y="176" text-anchor="middle" font-size="14" font-weight="800" fill="#0f172a" opacity="${melt?0:1}">${o.s}</text><text x="${x}" y="225" text-anchor="middle" ${AR} font-size="13" font-weight="700" fill="#fff">${o.n}</text><text x="${x}" y="70" text-anchor="middle" ${AR} font-size="12" fill="#fff">${melt?'منصهر':'صلب'} · ${o.mp}°س</text><text x="${x}" y="88" text-anchor="middle" ${AR} font-size="11" fill="#fde68a">${o.r?'عنصر ممثل':'عنصر انتقالي'}</text>`;});
   svg.innerHTML=s;};
  $('#l9T').oninput=draw;draw();
  let picked=new Set();$('#l9f').innerHTML=MP.filter(o=>o.s!=='Hg').map(o=>`<button type="button" class="c6-chip" data-s="${o.s}">${o.n}</button>`).join('');
  const bulb=o=>{const ok=o&&o.mp>2500;return `<path d="M100 20a50 50 0 0 1 30 90v20H70v-20a50 50 0 0 1 30-90z" fill="${ok?'#fef08a':'#e5e7eb'}" opacity=".85" stroke="#64748b" stroke-width="3"/>${ok?'<circle cx="100" cy="70" r="40" fill="#fde047" opacity=".4"/>':''}<path d="M85 130V85 M115 130V85" stroke="#475569" stroke-width="3"/>${o?(ok?'<path d="M85 85 q5 -14 10 0 q5 14 10 0 q5 -14 10 0" stroke="#fff7ae" stroke-width="4" fill="none"/>':'<circle cx="100" cy="122" r="7" fill="'+o.c+'"/>'):'<path d="M85 85 q5 -14 10 0 q5 14 10 0 q5 -14 10 0" stroke="#78350f" stroke-width="3" fill="none"/>'}<rect x="72" y="130" width="56" height="30" rx="4" fill="#94a3b8"/>`;};
  $('#l9b').innerHTML=bulb(null);
  $$('#l9f [data-s]').forEach(b=>b.onclick=()=>{const o=MP.find(x=>x.s===b.dataset.s);picked.add(o.s);$('#l9b').innerHTML=bulb(o);if(o.mp>2500){SFX.correct();say($('#l9fb'),'ok',`الفتيل من ${o.n} يتوهج ولا ينصهر؛ درجة انصهاره ${o.mp}°س أعلى من 2500°س.`);if(picked.size>=2)G.add(5,'lab9');}else{SFX.thud&&SFX.thud();say($('#l9fb'),'bad',`انصهر فتيل ${o.n} وسقط! درجة انصهاره ${o.mp}°س فقط.`);}});
  mcq($('#l9q'),{q:'ماذا تستنتج من الفرن؟',o:['درجات انصهار معظم العناصر الانتقالية أعلى من درجات انصهار العناصر الممثلة، والزئبق استثناء','كل الفلزات تنصهر عند درجة الحرارة نفسها','العناصر الممثلة دائمًا أعلى انصهارًا','الزئبق أعلى الفلزات انصهارًا'],a:0},'lab9',()=>G.complete('lab9'));},
 explain:'<p>تجربة افتراضية مقترحة بقيم درجات الانصهار (الكتاب للتنجستن 3410°س والزئبق −39°س): معظم الانتقالية أعلى انصهارًا من الممثلة، والتنجستن وحده يتحمل حرارة الفتيل.</p>'});

/* ---------- 10) العامل المحفز ---------- */
def('lab10',{after:'s6',n:'🧪 العامل المحفز',eyebrow:'تجربة افتراضية · مقترحة',title:'سباق الأنبوبين: بعامل محفز وبدونه',goal:'تفاعل واحد في أنبوبين؛ أضف إلى أحدهما قطعة بلاتين (عامل محفز). قارن سرعة تصاعد الغاز، ثم زِن البلاتين قبل التفاعل وبعده.',plan:7,core:1,
 icon:'<path d="M22 8v50a10 10 0 0 0 20 0V8M48 8v50a10 10 0 0 0 20 0V8" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="58" cy="40" r="4" fill="currentColor"/><circle cx="56" cy="28" r="3" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l10svg" viewBox="0 0 640 300" aria-label="أنبوبان"></svg><div class="row-actions" style="padding:10px"><button class="btn" type="button" id="l10go">ابدأ التفاعل</button><button class="tbtn" type="button" id="l10r">إعادة</button></div></div>
  <div class="side"><div class="card"><h3>حجم الغاز المتصاعد مع الزمن</h3><svg id="l10g" viewBox="0 0 300 180" style="direction:ltr"></svg><div id="l10fb"></div></div>
   <div class="card"><h3>⚖ كتلة البلاتين</h3><p class="step-text" id="l10m">قبل التفاعل: 2.00 جم · بعد التفاعل: —</p></div></div></div>
  <div class="card"><h3>استنتج</h3><div id="l10q"></div></div>`,
 init(){let t=0,tm=null;const A=[],B=[];
  const vol=(k,t)=>Math.min(60,60*(1-Math.exp(-k*t)));
  const draw=()=>{const va=vol(.012,t),vb=vol(.09,t);let s=`<rect width="640" height="300" fill="var(--wall)"/>`;
   [[180,'بدون عامل محفز',va,.012,0],[460,'مع البلاتين (عامل محفز)',vb,.09,1]].forEach(([x,lb,v,k,cat])=>{const rate=t>0&&v<59?k*80:0;
    s+=`<path d="M${x-40} 60 V230 a40 40 0 0 0 80 0 V60" fill="rgba(186,230,253,.5)" stroke="#64748b" stroke-width="4"/><rect x="${x-36}" y="110" width="72" height="150" rx="30" fill="rgba(56,189,248,.35)"/>`;
    for(let i=0;i<Math.round(rate*3);i++){const bx=x-25+((i*29+t*7)%50),by=250-((i*41+t*25)%140);s+=`<circle cx="${bx}" cy="${by}" r="${2+i%3}" fill="#fff" opacity=".8"/>`;}
    if(cat)s+=`<rect x="${x-14}" y="246" width="28" height="10" rx="2" fill="#cbd5e1" stroke="#475569"/>`;
    s+=`<text x="${x}" y="40" text-anchor="middle" ${AR} font-size="15" font-weight="700" fill="var(--ink)">${lb}</text><text x="${x}" y="290" text-anchor="middle" ${AR} font-size="13" fill="var(--muted)">الغاز: ${v.toFixed(0)} مل</text>`;});
   $('#l10svg').innerHTML=s;
   let g='<rect width="300" height="180" fill="var(--surface)"/><path d="M30 10V150H290" stroke="#64748b" stroke-width="2" fill="none"/>';const pl=(arr,c)=>arr.length?`<path d="${arr.map((v,i)=>(i?'L':'M')+(30+i*2.6)+' '+(150-v*2.2)).join('')}" stroke="${c}" stroke-width="3" fill="none"/>`:'';g+=pl(A,'#64748b')+pl(B,'#b45309')+`<text x="160" y="172" text-anchor="middle" font-size="11" fill="var(--muted)" ${AR}>الزمن</text><text x="12" y="80" font-size="11" fill="var(--muted)" ${AR} transform="rotate(-90 12 80)">حجم الغاز</text><text x="200" y="40" font-size="11" fill="#b45309" ${AR}>مع العامل المحفز</text><text x="200" y="120" font-size="11" fill="#64748b" ${AR}>بدونه</text>`;$('#l10g').innerHTML=g;};
  $('#l10go').onclick=()=>{clearInterval(tm);t=0;A.length=0;B.length=0;SFX.pop();$('#l10m').textContent='قبل التفاعل: 2.00 جم · بعد التفاعل: …';
   tm=setInterval(()=>{t+=1;A.push(vol(.012,t));B.push(vol(.09,t));draw();if(t>=100){clearInterval(tm);$('#l10m').innerHTML='قبل التفاعل: 2.00 جم · بعد التفاعل: <b>2.00 جم</b> (لم تتغير!)';say($('#l10fb'),'ok','الأنبوب الذي فيه البلاتين أنتج الغاز أسرع بكثير، وكتلة البلاتين لم تتغير.');G.add(5,'lab10');}},60);};
  $('#l10r').onclick=()=>{clearInterval(tm);t=0;A.length=0;B.length=0;draw();};
  STN.lab10.stop=()=>clearInterval(tm);draw();
  mcq($('#l10q'),{q:'ماذا يثبت تساوي كتلة البلاتين قبل التفاعل وبعده مع زيادة سرعة التفاعل؟',o:['أن البلاتين عامل محفز: زاد سرعة التفاعل دون أن يتغير','أن البلاتين استُهلك في التفاعل','أن التفاعل لم يحدث','أن البلاتين نتج من التفاعل'],a:0},'lab10',()=>G.complete('lab10'));},
 leave(){STN.lab10.stop&&STN.lab10.stop();},
 explain:'<p>تجربة افتراضية مقترحة (مثل تفكك فوق أكسيد الهيدروجين إلى ماء وأكسجين بوجود البلاتين): العامل المحفز يزيد سرعة التفاعل ولا يُستهلك.</p>'});

/* ---------- 11) مسرّع الجسيمات ---------- */
const TG=[{s:'Pb',z:82,n:'رصاص-208'},{s:'Bi',z:83,n:'بزموت-209'}];
const PR=[{s:'Ni',z:28,n:'نيكل-64'},{s:'Zn',z:30,n:'خارصين-70'}];
def('lab11',{after:'s10',n:'🧪 مسرّع الجسيمات',eyebrow:'تجربة افتراضية · مقترحة',title:'مسرّع الجسيمات: اصنع عنصرًا جديدًا',goal:'اختر النواة الهدف والقذيفة، واضبط سرعة القذيفة: البطيئة تتنافر ولا تلتحم، والسريعة جدًّا تحطّم النواة. ابحث عن السرعة المناسبة!',plan:7,core:1,
 icon:'<circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="8 6"/><circle cx="40" cy="40" r="9" fill="currentColor"/><circle cx="68" cy="40" r="5" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l11svg" viewBox="0 0 640 260" aria-label="مسرّع جسيمات"></svg>
   <div style="padding:10px"><label class="step-text">⚡ سرعة القذيفة: <b id="l11v">10</b>% من سرعة الضوء<input type="range" id="l11s" min="2" max="20" value="4" style="width:100%"></label><div class="row-actions"><button class="btn" type="button" id="l11go">أطلق القذيفة</button></div></div></div>
  <div class="side"><div class="card"><h3>النواة الهدف</h3><div class="c6-chips" id="l11t"></div><h3>القذيفة</h3><div class="c6-chips" id="l11p"></div><div id="l11fb"></div></div>
   <div class="card"><h3>عناصر صنعتها</h3><div id="l11made" class="c6-tiles"><span class="muted">لا شيء بعد</span></div></div></div></div>`,
 init(){let tg=TG[0],pr=PR[0],tm=null,x=60,state='idle';const made={};
  $('#l11v').textContent=$('#l11s').value;$('#l11s').oninput=()=>{$('#l11v').textContent=$('#l11s').value;};
  const nuc=(cx,cy,r,col)=>{let s='';const n=Math.round(r*1.2);for(let i=0;i<n;i++){const a=i*2.399,d=Math.sqrt(i/n)*r;s+=`<circle cx="${cx+Math.cos(a)*d}" cy="${cy+Math.sin(a)*d}" r="4.5" fill="${i%2?col:'#94a3b8'}"/>`;}return s;};
  const draw=(extra)=>{let s=`<rect width="640" height="260" fill="#0b1020"/><path d="M20 130H620" stroke="#1e3a8a" stroke-width="40" opacity=".5"/>`;
   if(state!=='fused'&&state!=='decay')s+=nuc(480,130,30,'#ef4444');
   if(state==='fly'||state==='idle')s+=nuc(x,130,14,'#f59e0b');
   s+=`<text x="480" y="200" text-anchor="middle" ${AR} font-size="14" fill="#cbd5e1">${tg.n} (Z=${tg.z})</text><text x="80" y="200" text-anchor="middle" ${AR} font-size="14" fill="#cbd5e1">${pr.n} (Z=${pr.z})</text>`;
   $('#l11svg').innerHTML=s+(extra||'');};
  const chips=(id,arr,cur,set)=>{$(id).innerHTML=arr.map((o,i)=>`<button type="button" class="c6-chip" data-i="${i}" aria-pressed="${o===cur}">${o.n}</button>`).join('');$$(id+' [data-i]').forEach(b=>b.onclick=()=>{set(arr[+b.dataset.i]);chips(id,arr,arr[+b.dataset.i],set);state='idle';x=60;draw();SFX.tick();});};
  chips('#l11t',TG,tg,v=>tg=v);chips('#l11p',PR,pr,v=>pr=v);
  $('#l11go').onclick=()=>{clearInterval(tm);const sp=+$('#l11s').value;x=60;state='fly';SFX.whoosh&&SFX.whoosh();
   tm=setInterval(()=>{x+=sp*2.2;const lim=sp<8?380:440;
    if(x>=lim){clearInterval(tm);
     if(sp<8){state='idle';let bx=lim;const bt=setInterval(()=>{bx-=12;x=bx;draw();if(bx<80){clearInterval(bt);}},30);say($('#l11fb'),'bad','السرعة غير كافية: تنافرت النواتان (كلتاهما موجبة) ولم تلتحما. زِد السرعة.');return;}
     if(sp>14){state='fused';draw(`<circle cx="470" cy="130" r="70" fill="#fde047" opacity=".7"/>${[...Array(14)].map((_,i)=>`<circle cx="${470+Math.cos(i)*90}" cy="${130+Math.sin(i)*80}" r="6" fill="#94a3b8"/>`).join('')}`);SFX.thud&&SFX.thud();say($('#l11fb'),'bad','السرعة كبيرة جدًّا: تحطمت النواة إلى شظايا ولم يتكوّن عنصر جديد. قلّل السرعة.');return;}
     const Z=tg.z+pr.z,e=PT.EL[Z-1];state='fused';SFX.correct();
     draw(`<circle cx="470" cy="130" r="58" fill="#facc15" opacity=".35"/>${nuc(470,130,36,'#a855f7')}<text x="470" y="60" text-anchor="middle" ${AR} font-size="20" font-weight="800" fill="#fde047">${e.n} (${e.s}) · Z = ${Z}</text>`);
     made[e.s]=e;$('#l11made').innerHTML=Object.values(made).map(m=>`<span class="c6-tile" style="background:#e9d5ff"><b>${m.s}</b><small>${m.n} · ${m.z}</small></span>`).join('');
     say($('#l11fb'),'ok',`اندماج نووي! ${tg.z} + ${pr.z} = ${Z} بروتونًا: تكوّن <b>${e.n} (${e.s})</b>. راقب: إنه مشع وقصير العمر…`);
     setTimeout(()=>{state='decay';draw(`${nuc(440,130,32,'#a855f7')}<circle cx="560" cy="80" r="9" fill="#f59e0b"/><path d="M470 120 L550 85" stroke="#f59e0b" stroke-width="3" stroke-dasharray="6 4"/><text x="560" y="60" text-anchor="middle" ${AR} font-size="13" fill="#fde68a">جسيم يُشَع</text><text x="440" y="210" text-anchor="middle" ${AR} font-size="14" fill="#cbd5e1">تحلّل خلال أجزاء من الثانية إلى عنصر أخف (Z = ${Z-2})</text>`);SFX.pop();},1600);
     if(Object.keys(made).length>=2)G.complete('lab11');G.add(5,'lab11');return;}
    draw();},30);};
  STN.lab11.stop=()=>clearInterval(tm);draw();},
 leave(){STN.lab11.stop&&STN.lab11.stop();},
 explain:'<p>تجربة افتراضية مقترحة مبسّطة: التركيبات حقيقية تاريخيًّا؛ رصاص-208 + نيكل-64 ← دارمستاتيوم (110)، وبزموت-209 + نيكل-64 ← رونتجينيوم (111)، ورصاص-208 + خارصين-70 ← كوبرنيسيوم (112)، وقد صُنعت الثلاثة الأولى في مسرّع الجسيمات في دارمشتات بألمانيا، وبزموت-209 + خارصين-70 ← نيهونيوم (113) صُنع في اليابان. السرعات قيم توضيحية.</p>'});
})();

/*@include lab15.js*/
/*@include pt.js*/
/*@include skit.js*/
/* ===== الفصل السادس · الدرس الثالث: العناصر الانتقالية — «ورشة الفلزات الانتقالية» ===== */
(function(){
const {$,$$,G,STN,def,mcq,flips,match,sortGame,challenge,say,SFX,pic,slides,escape,bingo,puzzle,tfRound,choiceBoard,solutions,vcard,ayah}=K;
const P=(n,c)=>[n,c];
const fig=(n,c,w)=>`<figure class="c6-fig" style="max-width:${w||220}px;text-align:center">${pic(n,c)}<figcaption class="step-text">${c}</figcaption></figure>`;
const grid=a=>`<div class="c6-grid">${a.map(([n,c])=>`<figure style="margin:0;text-align:center">${pic(n,c)}<figcaption class="step-text">${c}</figcaption></figure>`).join('')}</div>`;
const tIcon=t=>`<rect x="14" y="10" width="52" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="6"/><text x="40" y="52" text-anchor="middle" font-size="26" font-weight="800" fill="currentColor">${t}</text>`;
const ICO={doc:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',check:'<rect x="14" y="8" width="52" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30l6 6 12-12M24 54l6 6 12-12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>'};

/* ================= INTRO ================= */
def('intro',{n:'الافتتاحية',plan:3,icon:'<path d="M14 62l12-34h28l12 34z" fill="currentColor" opacity=".8"/><circle cx="40" cy="20" r="8" fill="currentColor"/>',
 body:`<div class="hero"><div class="hero-photo">${pic('s04_391329b0','حديد التسليح')}<span class="cap">الكهرباء في منزلك، والحديد في البناء: العناصر الانتقالية حولك في كل مكان.</span></div>
  <div><span class="eyebrow">ورشة الفلزات الانتقالية</span><h2 class="hero-h">فلزات تبني المدن… وأخرى تُصنع في المختبر!</h2>
   <p class="riddle">فتيل مصباح لا ينصهر رغم توهجه، وفلز سائل في مقياس الحرارة، ومغناطيس من خليط فلزات، وعنصر لم يوجد على الأرض قبل أن يصنعه الإنسان. ما الذي يجمع هذه العناصر في وسط الجدول الدوري؟</p>
   <p class="q">ما توقعك قبل أن تبدأ الورشة؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div>`,init(){}});

/* ================= GOALS ================= */
const GOALS=['تحدّد خصائص بعض العناصر الانتقالية.','تميّز بين اللانثانيدات والأكتنيدات.'];
const TERMS=[{t:'العدد الكتلي',d:'مجموع عدد البروتونات والنيوترونات في نواة الذرة. (مراجعة المفردات)'},
 {t:'العامل المحفز',d:'مادة تعمل على زيادة سرعة التفاعل دون أن تتغير.'},
 {t:'اللانثانيدات',d:'سلسلة من العناصر الانتقالية الداخلية تمتد من السيريوم إلى اللوتيتيوم، وتسمى العناصر الترابية النادرة.'},
 {t:'الأكتنيدات',d:'سلسلة من العناصر الانتقالية الداخلية تمتد من الثوريوم إلى اللورنسيوم، وجميعها مشعة.'},
 {t:'العناصر المصنعة',d:'عناصر تُحضَّر في المختبرات والمفاعلات النووية ومسرّعات الجسيمات.'}];
def('goals',{n:'الأهداف والمفردات',eyebrow:'الكتاب صفحة 192',title:'خريطة الورشة: الأهداف والمفردات',goal:'تعرّف أهداف الدرس وأهميته، ثم المفردات الجديدة.',plan:4,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><div class="story mt"><b>أهمية الدرس:</b> تستخدم العناصر الانتقالية في الكثير من الأشياء، ومنها الكهرباء في منزلك، والحديد للبناء.</div></div>
  <div class="card"><h3>مراجعة المفردات</h3><p class="step-text"><b>العدد الكتلي:</b> مجموع عدد البروتونات والنيوترونات في نواة الذرة.</p><h3 class="mt">المفردات الجديدة</h3><ul class="tasks plain"><li>العامل المحفز</li><li>الأكتنيدات</li><li>اللانثانيدات</li><li>العناصر المصنعة</li></ul></div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المفردات</h2><span>المس البطاقة لترى التعريف</span></div><div id="g15flips"></div></div>
  <div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2><span>اختر المصطلح ثم تعريفه</span></div><div id="g15match"></div></div>`,
 init(){flips($('#g15flips'),TERMS);this.reset();},reset(){match($('#g15match'),TERMS.map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));},explain:'<p>الأهداف والأهمية والمفردات كما في العرض (ص 192).</p>'});

/* ================= S1: الفلزات ================= */
def('s1',{n:'1 · الفلزات الانتقالية',eyebrow:'المحطة 1 · مدخل الورشة · الكتاب صفحة 192',title:'العناصر الانتقالية: كلها فلزات',goal:'أين تقع العناصر الانتقالية؟ وكيف توجد في الطبيعة؟',plan:5,core:1,icon:tIcon('3–12'),
 body:`<div class="two"><div class="card"><h3>الفلزات</h3><p class="step-text">تُسمّى المجموعات 3–12 <b>العناصر الانتقالية</b>، وجميعها فلزات. وإذا تتبّعنا هذه الفلزات في الجدول الدوري من اليسار إلى اليمين سنجد أنّ خصائص هذه العناصر لا يحكمها نمط تغيّر واضح، مقارنة بالتغير الذي يحدث للعناصر الممثلة.</p><p class="step-text">وتكون معظم العناصر الانتقالية متحدة مع عناصر أخرى على هيئة خامات، وقد يكون بعضها حرًّا مثل الذهب والفضة.</p>
   ${grid([['s06_875e4829','معدن البيريت FeS₂: اتحاد الحديد مع الكبريت'],['s06_3585fb4d','أكسيد الحديد Fe₂O₃: اتحاد الحديد مع الأكسجين'],['s06_07f27a10','الذهب الحر'],['s06_1118c2ba','الفضة الحرة']])}</div>
  <div class="card"><div class="stage" style="padding:6px">${PT.ptSVG({mode:'reg',hl:e=>e.reg==='انتقالية'})}</div><p class="hint-line">العناصر الانتقالية (المجموعات 3–12) مبرزة.</p><h3 class="mt">صنّف</h3><div id="s1sort"></div></div></div>`,
 init(){sortGame($('#s1sort'),{bins:['يوجد حرًّا في الطبيعة','يوجد متحدًا (خامًا)'],items:[['الذهب',0],['الفضة',0],['البيريت (حديد + كبريت)',1],['أكسيد الحديد (حديد + أكسجين)',1]]},'s1',()=>G.complete('s1'));},
 quiz:[{q:'العناصر الانتقالية تقع في المجموعات:',o:['1–2','3–12','13–18','17–18'],a:1},{q:'من العناصر الانتقالية التي قد توجد حرة في الطبيعة:',o:['الذهب والفضة','الحديد والكوبالت','الصوديوم والبوتاسيوم','الكلور واليود'],a:0}],
 explain:'<p>العناصر الانتقالية (3–12) جميعها فلزات، ولا يحكم خصائصها نمط تغير واضح كالممثلة. معظمها في خامات مثل البيريت FeS₂ وأكسيد الحديد Fe₂O₃، وبعضها حر كالذهب والفضة.</p>'});

/* ================= S2: ثلاثية الحديد ================= */
def('s2',{n:'2 · ثلاثية الحديد',eyebrow:'المحطة 2 · ركن المغناطيس · الكتاب صفحة 192',title:'ثلاثية الحديد',goal:'لماذا الحديد مهم لكوكبنا ولأجسامنا؟ وما العناصر المكوّنة لثلاثية الحديد؟',plan:8,core:1,icon:tIcon('Fe'),
 body:`<div class="card" id="s2sl"></div><div class="two"><div class="card"><h3>سؤال: ما الذي يولد المجال المغناطيسي للأرض؟ وما فائدته؟</h3><div id="s2q1"></div></div><div class="card"><h3>سؤال: ما العناصر المكونة لثلاثية الحديد؟</h3><div id="s2q2"></div></div></div>
  ${vcard('islam','الحديد في القرآن الكريم',`${ayah('وَأَنزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ وَمَنَافِعُ لِلنَّاسِ','الحديد: 25')}`)}`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s2');};
  slides($('#s2sl'),[
   {k:'ثلاثية الحديد',t:'تبلغ نسبة الحديد في كتلة الأرض حوالي 32%',im:[P('s07_10604496','باطن الأرض'),P('s07_79301b03','الحديد')],html:'<p class="lead">تبلغ نسبة الحديد في كتلة الأرض حوالي <b>32%</b>.</p>'},
   {k:'الحديد',t:'الثبات والمغناطيسية',im:[P('s08_e6ee98de','المجال المغناطيسي للأرض')],html:'<p>والحديد أكثر العناصر ثباتًا؛ وذلك لشدة تماسك مكونات النواة في ذرته، ويمتاز بخاصية مغناطيسية أقوى؛ فكمية الحديد الهائلة في باطن الأرض تؤدي دورًا مهمًّا في توليد المجال المغناطيسي للأرض، وهذا المجال هو الذي يمنع كلًّا من الغلاف الغازي والمائي والحيوي للأرض من الانفلات.</p>'},
   {k:'ثلاثية الحديد',t:'الحديد والكوبالت والنيكل',im:[P('s09_fe6859e7','الحديد والكوبالت والنيكل'),P('s10_a5f1073d','مغناطيس'),P('s10_a3102417','بطارية نيكل كادميوم')],html:'<p>نجد في الدورة الرابعة ثلاثة عناصر لها خصائص متشابهة، وهي <b>الحديد والكوبالت والنيكل</b>. تعرف هذه العناصر بثلاثية الحديد، ولها صفات مغناطيسية؛ إذ يُصنع المغناطيس الصناعي من مزيج من النيكل والكوبالت والألومنيوم، ويستخدم النيكل في البطاريات مع الكادميوم.</p>'},
   {k:'الربط مع علم الأحياء',t:'الحديد والهيموجلوبين',im:[P('s10_b8ec664f','خلايا الدم الحمراء')],html:'<p>الحديد ضروري لتكوين <b>الهيموجلوبين</b> في خلايا الدم الحمراء، وهو البروتين المسؤول عن نقل الأكسجين إلى جميع أنحاء الجسم.</p><p>عند نقص الحديد تقل قدرة الدم على نقل الأكسجين، مما يؤثر سلبًا على صحة الجسم بشكل عام.</p>'}],'s2');
  mcq($('#s2q1'),{q:'اختر الإجابة الأدق:',o:['كمية الحديد الهائلة في الأرض، ويمنع الغلاف الغازي والمائي والحيوي من الانفلات','الرياح، ويحرك الغيوم','الشمس، وينير الأرض','المحيطات، وتولّد المد والجزر'],a:0},'s2',c);
  mcq($('#s2q2'),{q:'العناصر المكونة لثلاثية الحديد:',o:['الحديد – الألومنيوم – النحاس','الحديد – الكوبالت – النيكل','الحديد – الكوبالت – النحاس','الحديد – الذهب – الفضة'],a:1},'s2',c);},
 quiz:[{q:'المغناطيس الصناعي يصنع من مزيج من:',o:['النيكل والكوبالت والألومنيوم','الذهب والفضة','الكلور واليود','الهيليوم والنيون'],a:0},{q:'الحديد ضروري لتكوين:',o:['الهيموجلوبين','الكلوروفيل','الأنسولين','العظام فقط'],a:0}],
 explain:'<p>الحديد نحو 32% من كتلة الأرض، ويولد المجال المغناطيسي الذي يحمي أغلفة الأرض. ثلاثية الحديد: Fe وCo وNi مغناطيسية؛ المغناطيس الصناعي من Ni وCo وAl، والنيكل في بطاريات النيكل-كادميوم. والحديد أساس الهيموجلوبين.</p>'});

/* ================= S3: الفولاذ ================= */
def('s3',{n:'3 · الحديد في البناء',eyebrow:'المحطة 3 · ورشة البناء · الكتاب صفحة 192',title:'برأيك: ما المادة التي يعتمد عليها المهندسون في بناء الجسور وناطحات السحاب؟',goal:'اخلط مكونات الفولاذ، ثم وضّح لماذا يُستخدم في البناء.',plan:5,core:1,icon:tIcon('🏗'),
 body:`<div class="two"><div class="card"><p class="step-text">وعند مزج <b>الحديد مع الكربون ومع فلزات أخرى</b> تنتج أنواع مختلفة من <b>الفولاذ</b>. فالجسور وناطحات السحاب تعتمد على الفولاذ.</p>${grid([['s12_76745293','ناطحات السحاب'],['s13_98cbcd09','مصنع الفولاذ'],['s13_fe7497f4','أنابيب فولاذية']])}</div>
  <div class="card"><h3>🔥 فرن الفولاذ</h3><p class="step-text">اختر المكونات التي تُمزج لإنتاج الفولاذ:</p><div class="c6-chips" id="s3mix"></div><div class="row-actions"><button class="btn" type="button" id="s3go">صهر المزيج</button></div><div id="s3fb"></div><h3 class="mt">وضّح: لماذا يستخدم الفولاذ في البناء؟</h3><div id="s3q"></div></div></div>`,
 init(){const ING=[['الحديد',1],['الكربون',1],['فلزات متنوعة',1],['الهيليوم',0],['الكبريت',0]];const on=new Set();let n=0;const c=()=>{if(++n>=2)G.complete('s3');};
  $('#s3mix').innerHTML=ING.map(([t],i)=>`<button type="button" class="c6-chip" data-i="${i}" aria-pressed="false">${t}</button>`).join('');
  $$('#s3mix [data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;on.has(i)?on.delete(i):on.add(i);b.setAttribute('aria-pressed',on.has(i));SFX.tick();});
  let ok=false;$('#s3go').onclick=()=>{const right=ING.every(([,v],i)=>!!v===on.has(i));if(right){if(!ok){ok=true;G.good();G.add(8,'s3');c();}say($('#s3fb'),'ok','🔥 خرج من الفرن فولاذ قوي: حديد + كربون + فلزات متنوعة.');}else{G.bad();say($('#s3fb'),'bad','المزيج غير صحيح. الفولاذ = الحديد + الكربون + فلزات أخرى.');}};
  mcq($('#s3q'),{q:'يستخدم الفولاذ في البناء:',o:['بسبب ما يتميز به من القوة والمتانة وقابليته للطرق','لأنه خفيف كالهيليوم','لأنه لا يوصل الحرارة','لأنه سائل'],a:0},'s3',c);},
 explain:'<p>الفولاذ: مزيج الحديد مع الكربون وفلزات أخرى، ويُستخدم في الجسور وناطحات السحاب لقوته ومتانته وقابليته للطرق.</p>'});

/* ================= S4: التنجستن والزئبق ================= */
def('s4',{n:'4 · التنجستن والزئبق',eyebrow:'المحطة 4 · ركن الحرارة · الكتاب صفحة 193',title:'استخدامات العناصر الانتقالية: التنجستن والزئبق',goal:'لاحظ درجة الانصهار: أعلى فلز وأقل فلز… واستخدام كل منهما.',plan:6,core:1,icon:tIcon('W'),
 body:`<div class="two"><div class="card"><h3>التنجستن</h3><p class="step-text">درجات انصهار معظم العناصر الانتقالية أعلى من درجات انصهار العناصر الممثلة؛ فالفتيل المستخدم في المصباح الكهربائي مصنوع من عنصر <b>التنجستن</b>؛ لأن له أعلى درجة انصهار (3410°س) مقارنة بالفلزات الأخرى، فلا ينصهر عند مرور التيار الكهربائي فيه.</p>${grid([['s14_02e6d97f','مصباح متوهج'],['s14_04dba66d','التنجستن W']])}<div class="c6-q"><b>علّل:</b> يُستخدم العنصر الانتقالي التنجستن في مصابيح الإنارة.<br><button class="tbtn" type="button" id="s4rev">إظهار الإجابة</button> <span class="c6-ans" id="s4ans" hidden>بسبب ارتفاع درجة انصهاره.</span></div></div>
  <div class="card"><h3>الزئبق</h3><p class="step-text">أمّا <b>الزئبق</b> فله درجة انصهار (−39°س) أقل من أي فلز آخر، ويدخل في صناعة مقاييس الحرارة ومقاييس الضغط الجوي. وهو الفلز الوحيد الذي يوجد في الحالة السائلة عند درجة حرارة الغرفة، وهو سام كغيره من العناصر الثقيلة؛ لذلك يجب أخذ الحيطة والحذر عند التعامل معه.</p>${grid([['s15_9f4c4a17','البارومتر الزئبقي'],['s15_daed9564','الترمومتر الزئبقي'],['s15_8f6a54b3','رموز خطورة الزئبق']])}<p class="step-text"><b>مخاطره:</b> خطورته على البيئة · خطر التسمم · خطورته على الصحة · خطورته على البشرة.</p><div id="s4q"></div></div></div>`,
 init(){$('#s4rev').onclick=()=>{$('#s4ans').hidden=false;SFX.pop();};
  mcq($('#s4q'),{q:'الفلز الوحيد السائل عند درجة حرارة الغرفة، ويُستخدم في الترمومتر والبارومتر:',o:['الزئبق','التنجستن','الكروم','الحديد'],a:0},'s4',()=>G.complete('s4'));},
 quiz:[{q:'أعلى الفلزات درجة انصهار:',o:['الحديد','التنجستن','الزئبق','النحاس'],a:1}],
 explain:'<p>التنجستن أعلى الفلزات درجة انصهار (3410°س في الكتاب)، فيُصنع منه فتيل المصباح. والزئبق أقلها (−39°س)، سائل في درجة حرارة الغرفة، يُستخدم في مقاييس الحرارة والضغط، وهو سام.</p>'});

/* ================= S5: الكروم ================= */
def('s5',{n:'5 · الكروم',eyebrow:'المحطة 5 · ركن الألوان · الكتاب صفحة 193',title:'الكروم: عنصر اللون',goal:'من أين جاء اسم الكروم؟ وما علاقته بالألوان وبالصحة؟',plan:4,core:1,icon:tIcon('Cr'),
 body:`<div class="two"><div class="card"><p class="step-text">أمّا بالنسبة لعنصر <b>الكروم</b> فقد اشتُق اسمه من الكلمة الإغريقية <b>chroma</b> والتي تعني اللون. ويتحد الكثير من العناصر الانتقالية بعضها مع بعض لتكوين مواد ذات ألوان لامعة. وتستخدم العناصر الانتقالية في الكثير من المنتجات.</p>${grid([['s16_c22f9933','الكروم Cr'],['s16_4cde7e1a','ألوان تحتوي على الكروم'],['s16_cc2dc8a2','الكروم']])}</div>
  <div class="card"><h3>الربط مع الصحة</h3><p class="step-text">الكروم عنصر ضروري بكميات ضئيلة لتعزيز عمل الأنسولين وتنظيم سكر الدم.</p><p class="hint-line">ورد في العرض أنه «يساعد في بناء العضلات وحرق الدهون»، وهذا ادعاء شائع في إعلانات المكملات الغذائية لم تثبته الدراسات العلمية بشكل كافٍ، لذا حذفناه.</p><div id="s5q"></div></div></div>`,
 init(){mcq($('#s5q'),{q:'تعني كلمة chroma الإغريقية:',o:['اللون','الحديد','الضوء','المغناطيس'],a:0},'s5',()=>G.complete('s5'));},
 explain:'<p>الكروم من chroma أي اللون، ومركبات العناصر الانتقالية كثيرًا ما تكون ملونة لامعة.</p>'});

/* ================= S6: العامل المحفز ================= */
def('s6',{n:'6 · العامل المحفز',eyebrow:'المحطة 6 · ورشة التسريع · الكتاب صفحة 193',title:'مجموعة البلاتين والعامل المحفز',goal:'عرّف العامل المحفز، وعدّد ثلاث مواد تُستخدم العناصر الانتقالية عوامل مساعدة في إنتاجها.',plan:6,core:1,icon:tIcon('Pt'),
 body:`<div class="two"><div class="card"><p class="step-text">ونجد أيضًا أنّ عناصر الروثينيوم والروديوم والبلاديوم والأوزميوم والإريديوم والتي تُسمّى أحيانًا <b>مجموعة البلاتين</b>؛ لها صفات متشابهة، فهي لا تتحد بسهولة مع العناصر الأخرى، وتُستخدم في التفاعلات الكيميائية بوصفها عوامل مساعدة.</p><p class="def"><b>العامل المحفز (المساعد) Catalyst:</b> مادة تعمل على زيادة سرعة التفاعل دون أن تتغير.</p><p class="step-text">ومن العناصر الانتقالية الأخرى التي تعمل بوصفها عوامل مساعدة النيكل والكوبالت والخارصين. وتُستخدم العناصر الانتقالية بوصفها عوامل مساعدة في إنتاج المواد الإلكترونية والاستهلاكية والبلاستيك والأدوية.</p>${fig('s17_98e31e49','العامل المحفز يدخل التفاعل ويخرج منه دون أن يتغير',380)}</div>
  <div class="card"><h3>سؤال: عرّف العامل المحفز</h3><div id="s6q1"></div><h3 class="mt">تُستخدم العناصر الانتقالية بوصفها عوامل مساعدة في إنتاج الكثير من المواد. عدّد ثلاثة منها:</h3><div id="s6m"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s6');};
  mcq($('#s6q1'),{q:'العامل المحفز:',o:['مادة تزيد سرعة التفاعل دون أن تتغير','مادة تبطئ التفاعل وتُستهلك','مادة ناتجة من التفاعل','مادة مشعة'],a:0},'s6',c);
  C6.fill($('#s6m'),{bank:['المواد الإلكترونية','البلاستيك','الأدوية','ملح الطعام'],items:[['المادة الأولى: ___','المواد الإلكترونية'],['المادة الثانية: ___','البلاستيك'],['المادة الثالثة: ___','الأدوية']]},'s6',c);},
 explain:'<p>العامل المحفز يزيد سرعة التفاعل دون أن يتغير. مجموعة البلاتين والنيكل والكوبالت والخارصين عوامل مساعدة في إنتاج المواد الإلكترونية والاستهلاكية والبلاستيك والأدوية.</p>'});

/* ================= S7: العناصر الانتقالية الداخلية ================= */
def('s7',{n:'7 · الانتقالية الداخلية',eyebrow:'المحطة 7 · الطابق السفلي · الكتاب صفحة 194',title:'العناصر الانتقالية الداخلية: اللانثانيدات',goal:'ما الاسم الذي يُطلق على العناصر الانتقالية الداخلية؟ ولماذا سُمّيت اللانثانيدات بالعناصر الترابية النادرة؟',plan:7,core:1,icon:tIcon('Ce'),
 body:`<div class="two"><div class="card"><h3>العناصر الانتقالية الداخلية</h3><p class="step-text">هناك سلسلتان من العناصر الانتقالية الداخلية، تمتد الأولى من السيريوم إلى اللوتيتيوم، وتُسمّى <b>اللانثانيدات Lanthanides</b> أو العناصر الترابية النادرة؛ وذلك لأنّ الاعتقاد السائد آنذاك أنها قليلة الوجود، وتوجد عادة متحدة مع الأكسجين في القشرة الأرضية. أمّا السلسلة الثانية فتمتد من الثوريوم إلى اللورنسيوم، وتُسمّى <b>الأكتنيدات Actinides</b>.</p><div class="stage" style="padding:6px">${PT.ptSVG({mode:'reg',hl:e=>e.f!=null})}</div></div>
  <div class="card"><h3>سؤال</h3><div id="s7q1"></div><h3 class="mt">أكمل الفراغ</h3><div id="s7f"></div>
   <div class="c6-enr mt"><b>إثراء من العرض</b><p class="step-text" style="margin:4px 0 0">سُمّيت العناصر الانتقالية الداخلية بهذا الاسم لأن إلكتروناتها تملأ المدارات الفرعية من النوع (f).</p></div></div></div>
  <div class="card" id="s7sl"></div><div class="two"><div class="card"><h3>سؤال</h3><div id="s7q2"></div></div><div class="card"><h3>سؤال</h3><div id="s7q3"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=4)G.complete('s7');};
  mcq($('#s7q1'),{q:'ما الاسم الذي يُطلق على العناصر الانتقالية الداخلية؟',o:['الهالوجينات','اللانثانيدات والأكتنيدات','الفلزات القلوية','الغازات الخاملة'],a:1},'s7',c);
  C6.fill($('#s7f'),{bank:['عوامل محفزة','أشباه موصلات','غازات نبيلة'],items:[['تستخدم معظم العناصر الانتقالية بوصفها ___، وهي مواد تزيد من سرعة التفاعل دون أن تتغير.','عوامل محفزة']]},'s7',c);
  slides($('#s7sl'),[
   {k:'ماذا قرأت؟',t:'الاسم الآخر للانثانيدات',im:[P('s21_8f706e25','خامات العناصر الترابية النادرة')],html:'<p>ما الاسم الآخر الذي تُعرف به اللانثانيدات؟ <b>العناصر الترابية النادرة.</b></p>'},
   {k:'اللانثانيدات',t:'خصائصها',im:[P('s21_41d4c4fb','حجر الولاعة من سبيكة الميشميتال'),P('s21_aa160286','سكين')],html:'<ol><li>تُسمّى العناصر الترابية النادرة.</li><li>توجد غالبًا متحدة مع الأكسجين.</li><li>فلزات لينة (يُمكن تقطيعها بالسكين).</li></ol><p>اللانثانيدات فلزات لينة يمكن قطعها بالسكين، ولكنها متشابهة، حيث يصعب فصلها عندما توجد في خام واحد. ولقد اعتُقد قديمًا أنها نادرة الوجود، إلا أن القشرة الأرضية في الواقع تحتوي من السيريوم أكثر من الرصاص؛ فالسيريوم يكوّن 50% من سبيكة الميشميتال التي تجدها في حجر الولاعة، والتي تحتوي بالإضافة إلى السيريوم على عناصر مثل اللانثانوم والنيوديميوم والحديد.</p>'}],'s7',c);
  mcq($('#s7q2'),{q:'يُصنع فتيل المصباح الكهربائي من عنصر:',o:['التنجستون','النيون','الهيليوم','الألومنيوم'],a:0},'s7');
  mcq($('#s7q3'),{q:'أي مما يلي لا ينطبق على اللانثانيدات؟',o:['تُسمّى العناصر الترابية النادرة','توجد غالبًا متحدة مع الأكسجين','درجة انصهارها منخفضة','فلزات لينة'],a:2,why:'العبارة الصحيحة الأخرى: فلزات لينة يمكن تقطيعها بالسكين.'},'s7',c);},
 explain:'<p>اللانثانيدات (من السيريوم إلى اللوتيتيوم): العناصر الترابية النادرة، متحدة غالبًا مع الأكسجين، فلزات لينة. الأكتنيدات: من الثوريوم إلى اللورنسيوم. <b>تصحيح:</b> رقم الصفحة في العرض «149» والصواب 194.</p>'});

/* ================= S8: الأكتنيدات ================= */
def('s8',{n:'8 · الأكتنيدات',eyebrow:'المحطة 8 · غرفة الإشعاع · الكتاب صفحة 195',title:'الأكتنيدات والعناصر المصنعة',goal:'ما الذي يميز الأكتنيدات؟ وما استخدامات بعض العناصر المصنعة؟',plan:6,core:1,icon:tIcon('U'),
 body:`<div class="two"><div class="card"><h3>الأكتنيدات</h3><p class="step-text"><b>جميع الأكتنيدات عناصر مشعة</b>؛ أنويتها غير مستقرة، وتتحول إلى عناصر أخرى. اليورانيوم والثوريوم والبروتاكتينيوم هي العناصر الطبيعية الوحيدة من الأكتنيدات التي توجد في القشرة الأرضية؛ ويمتاز اليورانيوم بطول فترة عمر النصف له؛ حيث تبلغ 4.5 مليارات سنة. أمّا بقية عناصر الأكتنيدات فتكون <b>عناصر مصنعة Synthetic elements</b> في المختبرات والمفاعلات النووية.</p>${grid([['s23_c4f3557e','عناصر مشعة'],['s23_f380dd1f','تحلل إشعاعي'],['s25_82595129','مواد مشعة']])}</div>
  <div class="card"><h3>عناصر مُصنّعة واستخداماتها</h3><p class="step-text">وهذه العناصر المصنعة لها استخدامات كثيرة؛ فيستخدم <b>البلوتونيوم</b> مثلًا وقودًا في المفاعلات النووية. أمّا <b>الأميريسيوم</b> فيستخدم في بعض أجهزة الكشف عن الدخان في المباني. وأمّا عنصر <b>الكاليفورنيوم-252</b> فيستخدم في قتل الخلايا السرطانية.</p><div id="s8m"></div></div></div>`,
 init(){match($('#s8m'),[['البلوتونيوم Pu','وقود للمفاعلات النووية'],['الأميريسيوم Am','أجهزة الكشف عن الدخان'],['الكاليفورنيوم Cf','قتل الخلايا السرطانية'],['اليورانيوم U','عمر النصف 4.5 مليارات سنة']],'s8',()=>G.complete('s8'));},
 quiz:[{q:'جميع الأكتنيدات:',o:['مشعة','غازات','لافلزات','غير موجودة'],a:0}],
 explain:'<p>الأكتنيدات كلها مشعة؛ الطبيعية منها U وTh وPa، والباقي مصنّع. Pu وقود نووي، وAm في كواشف الدخان، وCf-252 لعلاج السرطان.</p>'});

/* ================= S9: طب الأسنان ================= */
def('s9',{n:'9 · طب الأسنان',eyebrow:'المحطة 9 · عيادة الأسنان · الربط مع الصحة · الكتاب صفحة 195',title:'الربط مع الصحة: طب الأسنان ومواده',goal:'لماذا تحوّل أطباء الأسنان من حشوات الزئبق إلى الصمغ والبورسلان؟ وكيف تعمل أسلاك التقويم؟',plan:5,core:1,icon:'<path d="M20 14c8-6 16 0 20 0s12-6 20 0c8 8 0 22-4 30-2 6-2 22-8 22s-4-18-8-18-2 18-8 18-6-16-8-22c-4-8-12-22-4-30z" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="card"><h3>طب الأسنان ومواده</h3><p class="step-text">استخدم أطباء الأسنان منذ أكثر من 150 عامًا مزيجًا مكوّنًا من النحاس والفضة والقصدير والزئبق لحشو فجوات الأسنان، ممّا يعرّض البعض لأبخرة الزئبق السامة. أمّا الآن فيستخدم الأطباء بدائل مكوّنة من الصمغ والبورسلان الذي يستخدم لمعالجة الأسنان، وهي مواد قوية ومقاومة كيميائيًّا لسوائل الجسم، ويتغيّر لونها ويصبح كلون الأسنان الطبيعي. وتحتوي بعض أنواع الصمغ المكوّنة لهذه المواد على الفلوريد الذي يحمي الأسنان من النخر. وتُعدّ هذه المواد عديمة النفع إذا لم يستخدم الأطباء مثبتات قوية معها، حيث تستخدم المثبتات (مواد لاصقة) في إلصاق هذه المواد بالسن الطبيعي، وهذه المثبتات تكون أيضًا قوية ومقاومة كيميائيًّا لسوائل الجسم.</p>${grid([['s26_d8c92dfa','حشوات الأسنان'],['s27_4b726d24','حشوة بلون السن']])}</div>
  <div class="card"><h3>ماذا قرأت؟ لماذا يُستخدم الصمغ والبورسلان في علاج الأسنان؟</h3><div id="s9q"></div><h3 class="mt">تقويم الأسنان</h3><p class="step-text">يستخدم الأطباء سبائك من النيكل والتيتانيوم لتقويم الأسنان المعوجة وتقويتها؛ إذ تُصنع هذه السبائك في صورة أسلاك تعالج بالحرارة لتأخذ شكل الأسنان.</p>${grid([['s28_50023b41','تقويم الأسنان'],['s28_140ac198','سلك نيكل وتيتانيوم']])}<div class="c6-q"><b>تُرى كيف تعمل هذه الأسلاك على تقويم الأسنان؟</b> <button class="tbtn" type="button" id="s9rev">إجابة مقترحة</button><p class="step-text" id="s9ans" hidden>سبيكة النيكل والتيتانيوم «تتذكر» الشكل الذي عولجت عليه بالحرارة؛ فعند تثبيتها على الأسنان المعوجة تحاول العودة إلى شكلها المنتظم، فتضغط على الأسنان بقوة خفيفة مستمرة تحرّكها تدريجيًّا إلى مواضعها الصحيحة.</p></div></div></div>`,
 init(){$('#s9rev').onclick=()=>{$('#s9ans').hidden=false;SFX.pop();};
  mcq($('#s9q'),{q:'السبب:',o:['لأنها لا تحتوي على الزئبق الضار، وقوية ومقاومة كيميائيًّا لسوائل الجسم، وقد تحتوي على الفلوريد الذي يحمي الأسنان من النخر والتسوس','لأنها رخيصة جدًّا','لأنها مشعة','لأنها توصل الكهرباء'],a:0},'s9',()=>G.complete('s9'));},
 explain:'<p>البدائل الحديثة (الصمغ والبورسلان) خالية من الزئبق، قوية، ومقاومة لسوائل الجسم، وبلون السن، وبعضها يحتوي الفلوريد. وأسلاك التقويم من سبيكة النيكل والتيتانيوم. (إجابة سؤال الأسلاك مقترحة.)</p>'});

/* ================= S10: العناصر المصنعة ================= */
def('s10',{n:'10 · العناصر المصنعة',eyebrow:'المحطة 10 · مسرّع الجسيمات · الكتاب صفحة 196',title:'العناصر المصنعة: عناصر أثقل من اليورانيوم',goal:'كيف يصنع العلماء عناصر لا توجد في الطبيعة؟',plan:6,core:1,icon:'<circle cx="40" cy="40" r="26" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="40" cy="40" r="8" fill="currentColor"/><circle cx="66" cy="40" r="5" fill="currentColor"/>',
 body:`<div class="card" id="s10sl"></div><div class="card"><h3>رتّب خطوات تصنيع عنصر جديد</h3><div id="s10ord"></div></div>`,
 init(){slides($('#s10sl'),[
   {k:'العناصر المصنعة',t:'أثقل من اليورانيوم',im:[P('s29_8031a7de','مسرّع جسيمات'),P('s23_88b0ac95','موقع مسرّع جسيمات')],html:'<p>لا يوجد عنصر أثقل من اليورانيوم في القشرة الأرضية بشكل طبيعي؛ إذ يحتوي على 92 بروتونًا و146 نيوترونًا. إلا أنّ العلماء تمكّنوا من تصنيع عناصر لها عدد ذري أكبر من اليورانيوم باستخدام مسرِّعات الجسيمات؛ حيث تُقذف الأنوية بجسيمات سريعة، وتلتحم بالنواة لتكوين عنصر أثقل. وهذه العناصر الثقيلة المصنعة هي نظائر مشعة، بعضها يبقى لفترات قصيرة جدًّا لا تتجاوز أجزاء من الثانية قبل أن تشعّ جسيمات وتتحلل لتكوّن عناصر خفيفة.</p><p class="hint-line">نجد سيلًا من الذرات التي تتحرك بسرعات مذهلة في الحجرة المفرغة من الهواء في مسرّع الجسيمات، كالموجود في مدينة دارمشتات بولاية هيسن في ألمانيا.</p>'},
   {k:'تسمية العناصر المصنعة',t:'دارمستاتيوم Ds',im:[P('s30_e7a57984','علماء أمام لوحة العناصر')],html:'<p>أقرّ المجلس العام للأيوباك الاسم الرسمي للعنصر 110، الذي كان يحمل اسم يونانيليوم (Uun)، ليصبح <b>دارمستاتيوم (Ds)</b>.</p><p class="def"><b>تحديث:</b> ورد في العرض والكتاب «ومن المتوقع أن تتم تسمية العنصر 111 في القريب العاجل»، وقد سُمّي فعلًا <b>رونتجينيوم (Rg)</b> عام 2004م، واكتملت تسمية العناصر حتى 118 (أوجانيسون Og) عام 2016م.</p>'},
   {k:'كيف يُصنع العنصر؟',t:'الاندماج النووي',im:[P('s31_423af655','اندماج نووي')],html:'<p>عندما تتحد الذرات تندمج أنويتها، فتشكّل عنصرًا جديدًا قد يكون عمره قصيرًا. وفي هذه العملية تنطلق بعض الطاقة وبعض الجسيمات.</p><p>جرّب ذلك بنفسك في المسرّع الافتراضي التالي.</p>'}],'s10');
  const ST=['تسريع أنوية خفيفة إلى سرعات هائلة في مسرّع الجسيمات','قذف نواة ثقيلة بهذه الجسيمات السريعة','التحام الأنوية (اندماج نووي) لتكوين عنصر أثقل','إشعاع جسيمات وتحلّل العنصر الجديد خلال أجزاء من الثانية'];
  let order=K.shuffle([0,1,2,3]),sel=null;const box=$('#s10ord');
  const draw=()=>{box.innerHTML=order.map((k,i)=>`<button type="button" class="c6-chip" data-i="${i}" aria-pressed="${sel===i}" style="display:block;width:100%;text-align:start;border-radius:12px;margin:6px 0">${i+1}. ${ST[k]}</button>`).join('')+'<div class="row-actions"><button class="btn" type="button" data-chk>تحقق</button></div><div class="qfb"></div>';
   box.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(sel==null)sel=i;else{[order[sel],order[i]]=[order[i],order[sel]];sel=null;}SFX.tick();draw();});
   box.querySelector('[data-chk]').onclick=()=>{const ok=order.every((k,i)=>k===i);if(ok){G.good();G.add(8,'s10');say(box.querySelector('.qfb'),'ok','ترتيب صحيح!');G.complete('s10');}else{G.bad();say(box.querySelector('.qfb'),'bad','ليس بعد. المس خطوتين لتبديلهما.');}};};draw();},
 explain:'<p>تُصنع العناصر الأثقل من اليورانيوم بقذف الأنوية بجسيمات سريعة في مسرّعات الجسيمات، فتندمج وتكوّن عناصر مشعة قصيرة العمر. وقد سُمّيت كل العناصر حتى 118.</p>'});

/* ================= SUMMARY + SELF ================= */
def('sum',{n:'الخلاصة',eyebrow:'الخلاصة · الكتاب صفحة 196',title:'الخلاصة',goal:'أهم أفكار الدرس كما في العرض.',plan:2,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>العناصر الانتقالية</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>جميع العناصر الانتقالية (عناصر المجموعات من 3–12) فلزات.</li><li>تتغير خصائص العناصر الانتقالية بدرجة أقل من خصائص العناصر الممثلة.</li><li>العناصر المكونة لثلاثية الحديد هي الحديد والنيكل والكوبالت.</li></ul></div>
  <div class="card"><h3>العناصر الانتقالية الداخلية</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>تشمل سلسلة اللانثانيدات العناصر من السيريوم وحتى اللوتيتيوم.</li><li>تعرف اللانثانيدات أيضًا بالعناصر الترابية النادرة.</li><li>تشمل سلسلة الأكتنيدات العناصر من الثوريوم وحتى اللورنسيوم.</li></ul></div></div>
  <div class="card"><div class="stage" style="padding:6px">${PT.ptSVG({mode:'reg',hl:e=>e.reg!=='ممثلة'})}</div>${PT.legend('reg')}</div>`,init(){},enter(){G.complete('sum');},reset(){},explain:'<p>خلاصة الدرس كما في العرض. <b>تصحيح:</b> رقم الصفحة في شرائح الخلاصة واختبر نفسك في العرض «191»، والصواب 196.</p>'});
def('self',{n:'اختبر نفسك',eyebrow:'الكتاب صفحة 196 · تسليم الواجب يوم الخميس',title:'اختبر نفسك وتطبيق المهارات',goal:'أسئلة «اختبر نفسك» مع حلول نموذجية، ثم سؤال «تطبيق المهارات».',plan:3,icon:ICO.check,body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'عيّن',q:'فيمَ تختلف العناصر المكوّنة لثلاثية الحديد عن باقي العناصر الانتقالية؟',a:[['الإجابة','لها صفات مغناطيسية، وخصائصها متشابهة، وتقع متجاورة في الدورة الرابعة.']]},
  {k:'وضّح',q:'الاختلافات الأساسية بين اللانثانيدات والأكتنيدات؟',a:[['اللانثانيدات','من السيريوم إلى اللوتيتيوم، العناصر الترابية النادرة، فلزات لينة توجد غالبًا متحدة مع الأكسجين.'],['الأكتنيدات','من الثوريوم إلى اللورنسيوم، جميعها مشعة، وأغلبها مصنّع (الطبيعية منها اليورانيوم والثوريوم والبروتاكتينيوم).']]},
  {k:'وضّح',q:'أهم استخدامات الزئبق؟',a:[['الإجابة','مقاييس الحرارة (الترمومتر) ومقاييس الضغط الجوي (البارومتر).']]},
  {k:'صف',q:'كيف تنتج العناصر المصنعة؟',a:[['الإجابة','في مسرّعات الجسيمات: تُقذف الأنوية بجسيمات سريعة فتلتحم بالنواة لتكوين عنصر أثقل، وكذلك في المفاعلات النووية.']]},
  {k:'التفكير الناقد',q:'الإريديوم والكادميوم من العناصر الانتقالية، فهل تستطيع توقّع أيهما سامّ، وأيهما عامل مساعد؟ وضّح ذلك.',a:[['الإريديوم','عامل مساعد؛ لأنه من مجموعة البلاتين التي لا تتحد بسهولة وتستخدم عوامل مساعدة.'],['الكادميوم','سام؛ لأنه من العناصر الثقيلة (يقع تحت الخارصين وبجوار الزئبق)، والعناصر الثقيلة سامة كالزئبق.']]},
  {k:'تطبيق المهارات · كوّن فرضية',q:'كيف يكون مظهر المصباح المحترق مقارنة بمظهر المصباح الجديد (السليم)؟ وما الذي يمكن أن يفسر هذا الاختلاف؟',a:[['إجابة العرض','يبدو المصباح المحترق أكثر سوادًا من المصباح الجديد بسبب الحرارة المستمرة في سلك التنجستن.'],['توضيح أدق','عند الحرارة العالية جدًّا تتبخر ذرات التنجستن ببطء من سطح الفتيل وتترسب على الجدار الداخلي البارد للزجاج فتُسوّده، ويرقّ الفتيل تدريجيًّا حتى ينقطع.']]}],'self',()=>G.complete('self'));},
 reset(){STN.self.s.reset();},explain:'<p>إجابة «تطبيق المهارات» من العرض مع توضيح أدق، وبقية الحلول نموذجية مقترحة.</p>'});

/* ================= التقويم (مقترح) ================= */
def('ev1',{n:'تقويم: ميّز وصحّح',eyebrow:'تقويم تكويني · مقترح',title:'تقويم: اللانثانيدات أم الأكتنيدات؟',goal:'ميّز بين اللانثانيدات والأكتنيدات (الهدف الثاني)، ثم صحّح العبارات.',plan:5,core:1,icon:ICO.check,
 body:`<div class="card"><div id="ev1a"></div></div><div class="card"><h3>صح أم خطأ، وصحّح الكلمة التي تحتها خط</h3><div id="ev1b"></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('ev1');};
  sortGame($('#ev1a'),{bins:['اللانثانيدات','الأكتنيدات'],items:[['تمتد من السيريوم إلى اللوتيتيوم',0],['العناصر الترابية النادرة',0],['فلزات لينة تُقطع بالسكين',0],['السيريوم في حجر الولاعة',0],['تمتد من الثوريوم إلى اللورنسيوم',1],['جميعها مشعة',1],['معظمها مصنّع',1],['البلوتونيوم وقود نووي',1]]},'ev1',c);
  C6.tfx($('#ev1b'),[['يُصنع فتيل المصباح من <u>الزئبق</u> لارتفاع درجة انصهاره.',false,'التنجستن',['التنجستن','الكروم','الحديد']],['ثلاثية الحديد: الحديد والكوبالت <u>والنيكل</u>.',true],['العامل المحفز مادة تزيد سرعة التفاعل <u>وتتغير</u>.',false,'دون أن تتغير',['دون أن تتغير','وتُستهلك','وتختفي']],['اشتُق اسم <u>الكروم</u> من كلمة إغريقية تعني اللون.',true],['جميع <u>اللانثانيدات</u> عناصر مشعة.',false,'الأكتنيدات',['الأكتنيدات','الهالوجينات','الغازات النبيلة']]],'ev1',c);}});

/* ================= إثرائي ================= */
const BG=[['التنجستن','أعلى الفلزات درجة انصهار'],['الزئبق','فلز سائل في درجة حرارة الغرفة'],['الكروم','اسمه يعني اللون'],['الحديد','نحو 32% من كتلة الأرض'],['الكوبالت','من ثلاثية الحديد ومغناطيسي'],['النيكل','يستخدم في البطاريات مع الكادميوم'],['العامل المحفز','يزيد سرعة التفاعل دون أن يتغير'],['البلاديوم','من مجموعة البلاتين'],['اللانثانيدات','العناصر الترابية النادرة'],['الأكتنيدات','جميعها مشعة'],['السيريوم','50% من سبيكة حجر الولاعة'],['اليورانيوم','أثقل عنصر طبيعي في القشرة الأرضية'],['البلوتونيوم','وقود للمفاعلات النووية'],['الأميريسيوم','في أجهزة الكشف عن الدخان'],['الكاليفورنيوم','لقتل الخلايا السرطانية'],['الفولاذ','حديد + كربون + فلزات أخرى'],['الهيموجلوبين','بروتين يحتوي الحديد وينقل الأكسجين'],['دارمستاتيوم','العنصر 110']];
def('x1',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'خزنة الورشة وبنغو الفلزات',goal:'افتحوا خزنة الورشة قبل انتهاء الوقت، ثم تنافسوا في بنغو المفردات.',plan:5,
 icon:'<rect x="12" y="14" width="56" height="52" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="40" cy="40" r="10" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:'<div class="card"><div id="x1esc"></div></div><div class="card"><div class="nb-head"><h2>🎯 بنغو الفلزات الانتقالية</h2><span>اختاروا المصطلح المناسب للتعريف</span></div><div id="x1bg"></div></div>',
 init(){STN.x1.e=escape($('#x1esc'),{title:'خزنة الورشة',story:'أُغلقت خزنة الورشة بأربعة أقفال! كل قفل يُفتح بإجابة صحيحة ويكشف رقمًا.',secs:360,
   locks:[{q:'عدد عناصر ثلاثية الحديد:',o:['2','3','4','5'],a:1,code:'3'},{q:'العنصر 110 اسمه:',o:['دارمستاتيوم','رونتجينيوم','يورانيوم','كوبالت'],a:0,code:'0'},{q:'درجة انصهار الزئبق تقريبًا:',o:['−39°س','0°س','100°س','3410°س'],a:0,code:'9'},{q:'نسبة الحديد في كتلة الأرض تقريبًا:',o:['2%','32%','78%','50%'],a:1,code:'2'}],outro:'فتحتم الخزنة! العناصر الانتقالية أساس صناعات كثيرة.'},'x1');
  STN.x1.b=bingo($('#x1bg'),BG,'x1');},
 reset(){STN.x1.e.reset();},explain:'<p>مسابقتان إثرائيتان مقترحتان.</p>'});
const TF=[['جميع العناصر الانتقالية فلزات.',true],['الزئبق أعلى الفلزات درجة انصهار.',false,'التنجستن أعلاها، والزئبق أقلها.'],['يُصنع المغناطيس الصناعي من النيكل والكوبالت والألومنيوم.',true],['اللانثانيدات فلزات صلبة جدًّا لا تُقطع.',false,'هي فلزات لينة تُقطع بالسكين.'],['جميع الأكتنيدات مشعة.',true],['يوجد في القشرة الأرضية بشكل طبيعي عناصر أثقل من اليورانيوم.',false,'لا يوجد عنصر أثقل من اليورانيوم بشكل طبيعي.'],['الكروم يعني اللون.',true],['الحديد ضروري لتكوين الهيموجلوبين.',true]];
def('x2',{n:'إثرائي · سؤال وجواب',eyebrow:'إثرائي · جولة البرق ولوحة الخيارات',title:'جولة البرق ولوحة الخيارات',goal:'قرّروا بسرعة: صح أم خطأ؟ ثم اختاروا ثلاث مهام في خط واحد.',plan:4,
 icon:'<path d="M44 6L18 46h18l-6 28 28-42H40z" fill="currentColor"/>',
 body:'<div class="card"><div id="x2tf"></div></div><div class="card"><h3>لوحة الخيارات 3 × 3</h3><div id="x2cb"></div></div>',
 init(){tfRound($('#x2tf'),TF,'x2',{secs:10});
  STN.x2.cb=choiceBoard($('#x2cb'),[
   {ic:'✍️',t:'قارن',kind:'كتابة',p:'قارن في جدول بين اللانثانيدات والأكتنيدات من حيث: الموقع، النشاط الإشعاعي، أمثلة.'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'فتيل المصباح من:',o:['التنجستن','الزئبق','الكروم','النحاس'],a:0},
   {ic:'🔬',t:'ابحث',kind:'بحث',p:'ابحث عن عنصر مُصنّع سُمّي باسم عالم، واكتب سبب تسميته.'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'أثقل عنصر طبيعي في القشرة الأرضية:',o:['اليورانيوم','البلوتونيوم','الرصاص','الذهب'],a:0},
   {ic:'🎨',t:'صمّم ملصقًا',kind:'رسم',p:'صمّم ملصقًا عن مخاطر الزئبق وطرق التعامل الآمن مع ترمومتر مكسور.'},
   {ic:'❓',t:'تحدٍّ',kind:'اختيار',q:'العنصر السام من بين:',o:['الكادميوم','الإريديوم','البلاتين','الروديوم'],a:0},
   {ic:'📸',t:'ابحث حولك',kind:'ملاحظة',p:'اذكر ثلاثة أشياء في بيتك تحتوي على فلزات انتقالية، وسمِّ الفلز.'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'الاسم الآخر للانثانيدات:',o:['العناصر الترابية النادرة','الغازات النبيلة','الهالوجينات','أشباه الموصلات'],a:0},
   {ic:'🗺',t:'خريطة مفاهيم',kind:'تنظيم',p:'ارسم خريطة مفاهيم لاستخدامات العناصر الانتقالية: البناء، الإنارة، المقاييس، المغناطيس، العوامل المساعدة، الطب.'}],'x2',()=>G.complete('x2'));},
 reset(){STN.x2.cb.reset();},explain:'<p>نشاطان إثرائيان مقترحان.</p>'});

/* ================= CHALLENGE ================= */
def('ch',{n:'تحدي العلماء',plan:3,icon:'<path d="M24 10h32v18a16 16 0 0 1-32 0z" fill="currentColor"/><path d="M40 44v14M28 70h24l-3-12H31z" fill="currentColor"/>',
 eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من أسئلة العرض. لكل سؤال محاولتان.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'ثلاثية الحديد',q:'ما العناصر المكونة لثلاثية الحديد؟',o:['الحديد – الألومنيوم – النحاس','الحديد – الكوبالت – النيكل','الحديد – الكوبالت – النحاس','الحديد – الذهب – الفضة'],a:1},
  {k:'الداخلية',q:'ما الاسم الذي يُطلق على العناصر الانتقالية الداخلية؟',o:['الهالوجينات','اللانثانيدات والأكتنيدات','الفلزات القلوية','الغازات الخاملة'],a:1},
  {k:'الفتيل',q:'يُصنع فتيل المصباح الكهربائي من عنصر:',o:['التنجستون','النيون','الهيليوم','الألومنيوم'],a:0},
  {k:'اللانثانيدات',q:'أي مما يلي لا ينطبق على اللانثانيدات؟',o:['تُسمّى العناصر الترابية النادرة','توجد غالبًا متحدة مع الأكسجين','درجة انصهارها منخفضة','فلزات لينة'],a:2},
  {k:'العامل المحفز',q:'تستخدم معظم العناصر الانتقالية بوصفها ......، وهي مواد تزيد من سرعة التفاعل دون أن تتغير:',o:['عوامل محفزة','أشباه موصلات','أملاح','غازات'],a:0},
  {k:'الفولاذ',q:'لماذا يستخدم الفولاذ في البناء؟',o:['لقوته ومتانته وقابليته للطرق','لأنه سائل','لأنه مشع','لأنه خفيف جدًّا'],a:0},
  {k:'المصنعة',t:'multi',q:'اختر كل العناصر المصنعة:',items:[['البلوتونيوم',1],['الأميريسيوم',1],['الكاليفورنيوم',1],['الحديد',0],['اليورانيوم',0]],why:'الحديد واليورانيوم طبيعيان.'},
  {k:'الزئبق',q:'من مخاطر الزئبق:',o:['سام ويضر البيئة والصحة والبشرة','لا مخاطر له','يشتعل في الماء','ينفجر عند تسخينه قليلًا'],a:0}],'ch');},
 reset(){STN.ch.c.reset();},explain:'<p>أسئلة التحدي من أسئلة العرض.</p>'});

/* ================= PLAN ================= */
const SROWS={intro:{s:['poe','brain'],g:'١ و٢',sk:'التنبؤ',ev:'سؤال التوقع'},goals:{s:['frayer','cards'],g:'١ و٢',sk:'التذكر',ev:'لعبة المطابقة'},
 s1:{s:['disc','cards'],g:'١',sk:'التصنيف',ev:'حر أم متحد؟'},s2:{s:['story','heads'],g:'١',sk:'الربط',ev:'سؤالا ثلاثية الحديد'},lab8:{s:['inq','poe'],g:'١',sk:'التجريب',ev:'اختبار المغناطيس'},s3:{s:['prob','tps'],g:'١',sk:'الاستنتاج',ev:'فرن الفولاذ'},
 s4:{s:['disc','cards'],g:'١',sk:'التفسير',ev:'علّل التنجستن'},lab9:{s:['inq','poe'],g:'١',sk:'المقارنة',ev:'تحدي الفتيل'},s5:{s:['analogy'],g:'١',sk:'الربط',ev:'معنى الكروم'},s6:{s:['frayer','coop'],g:'١',sk:'التعريف',ev:'عرّف العامل المحفز'},lab10:{s:['poe','inq'],g:'١',sk:'ضبط المتغيرات',ev:'سرعة التفاعل والكتلة'},
 s7:{s:['venn','sticks'],g:'٢',sk:'المقارنة',ev:'أسئلة اللانثانيدات'},s8:{s:['jigsaw'],g:'٢',sk:'الربط',ev:'مطابقة الاستخدامات'},s9:{s:['story','tps'],g:'١',sk:'التفسير',ev:'لماذا الصمغ والبورسلان؟'},s10:{s:['time','story'],g:'٢',sk:'الترتيب',ev:'ترتيب الخطوات'},lab11:{s:['inq','game'],g:'٢',sk:'التجريب',ev:'صنع عنصر'},
 ev1:{s:['spot','venn'],g:'٢',sk:'التمييز والتصحيح',ev:'تصنيف وتصحيح'},sum:{s:['tl'],g:'١ و٢',sk:'التلخيص',ev:'إشارة المرور'},self:{s:['heads','sticks'],g:'١ و٢',sk:'التفكير الناقد',ev:'اختبر نفسك'},x1:{s:['game','champ'],g:'١ و٢',sk:'الاستدعاء',ev:'الخزنة والبنغو'},x2:{s:['cards','game'],g:'١ و٢',sk:'الاستدعاء السريع',ev:'جولة البرق'},ch:{s:['exit'],g:'١ و٢',sk:'التقويم الختامي',ev:'تحدي العلماء'}};
SK.init({key:'g9c6l3',sfx:{pop:()=>SFX.pop(),tick:()=>SFX.tick(),ok:()=>SFX.correct(),no:()=>SFX.wrong()},teams:()=>(G.teams||K.TEAMN.slice(0,4).map((n,i)=>({n,c:K.TEAMC[i]}))).map(t=>({n:t.n,c:t.c})),
 stratRoster:{api:'https://script.google.com/macros/s/AKfycbxp-t4JgGO5WiK6hoacjTyBqFnG-9bSWClplOpVV4VDuTV7T4tY0swB1Ll36kr_djJ7nQ/exec',classes:['1/3','2/3','3/3','4/3']}});
def('plan',{n:'خطة الدرس والاستراتيجيات',after:'goals',eyebrow:'للمعلم والزائر',title:'خطة الدرس: الأهداف والاستراتيجيات والتقويم',goal:'المس أي صف للانتقال إلى محطته، أو شارة الاستراتيجية أعلى المحطة لعرض خطواتها وأدواتها.',plan:1,
 icon:'<rect x="10" y="12" width="60" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M10 28h60M30 28v40" stroke="currentColor" stroke-width="5"/>',body:'<div class="card" id="planBox"></div>',
 init(){const secs=$$('#stations section.st');let k=0;const rows=[];secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;k++;rows.push({i:id,num:k,name:STN[id].n.replace(/^\d+ · /,''),c});});
  $('#planBox').innerHTML=SK.planHTML('',rows);SK.wirePlan($('#planBox'),id=>K.go(id));
  secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;const h=s.querySelector('.st-head');if(h&&!h.querySelector('.stgs')){const b=SK.badges(c);b.style.cssText='display:flex;margin:6px 0 0';h.appendChild(b);}});
  if(!document.getElementById('skfab'))SK.fab('left:14px;bottom:86px');},
 enter(){G.complete('plan');},reset(){},explain:'<p>خطة الدرس: لكل محطة هدفها والاستراتيجية المطبقة ومهارة التفكير وأداة التقويم.</p>'});
K.boot({chapter:'الفصل السادس: الجدول الدوري',chapterShort:'الفصل السادس',title:'ورشة الفلزات الانتقالية',lesson:'الدرس الثالث: العناصر الانتقالية',accent:'#b45309',accentDark:'#f59e0b',hook:'فلزات تبني المدن… وأخرى تُصنع في المختبر!',
 riddle:'ما الذي يجمع فتيل المصباح والزئبق والمغناطيس والعناصر المصنعة في وسط الجدول الدوري؟',predict:{o:['كلها فلزات انتقالية أو انتقالية داخلية، لكل منها خصائص تجعله مناسبًا لاستخدام معين','كلها لافلزات','كلها غازات نبيلة'],a:0},
 answer:'العناصر الانتقالية (3–12) فلزات: التنجستن عالي الانصهار للفتيل، والزئبق السائل للمقاييس، وثلاثية الحديد مغناطيسية، ومجموعة البلاتين عوامل مساعدة. والانتقالية الداخلية: لانثانيدات ترابية نادرة، وأكتنيدات مشعة أغلبها مصنّع.',
 finalTitle:'مبارك! أتقنت العمل في ورشة الفلزات الانتقالية',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 196 · التسليم يوم الخميس.',
 concepts:[{n:'العناصر الانتقالية',t:'المجموعات 3–12، جميعها فلزات.',ic:'<text x="24" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="var(--accent)">3–12</text>'},
  {n:'ثلاثية الحديد',t:'Fe وCo وNi: خصائص متشابهة ومغناطيسية.',ic:'<text x="24" y="32" text-anchor="middle" font-size="20" font-weight="800" fill="var(--accent)">Fe</text>'},
  {n:'التنجستن والزئبق',t:'أعلى الفلزات انصهارًا (الفتيل) وأقلها (المقاييس).',ic:'<text x="24" y="32" text-anchor="middle" font-size="20" font-weight="800" fill="var(--accent)">W</text>'},
  {n:'العامل المحفز',t:'يزيد سرعة التفاعل دون أن يتغير.',ic:'<path d="M6 36 L18 14 L30 30 L42 8" fill="none" stroke="var(--accent)" stroke-width="4"/>'},
  {n:'اللانثانيدات',t:'من السيريوم إلى اللوتيتيوم: ترابية نادرة.',ic:'<text x="24" y="32" text-anchor="middle" font-size="20" font-weight="800" fill="var(--accent)">Ce</text>'},
  {n:'الأكتنيدات',t:'من الثوريوم إلى اللورنسيوم: مشعة، وأغلبها مصنّع.',ic:'<text x="24" y="32" text-anchor="middle" font-size="20" font-weight="800" fill="var(--accent)">U</text>'}]});
$$('.top h1').forEach(h=>h.dataset.sym='Fe');
})();

