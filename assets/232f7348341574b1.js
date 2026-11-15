/* ===== وحدة الاستراتيجيات التدريسية: شارة لكل محطة، خطة الدرس، أدوات صفية (أعواد المثلجات، فكّر-زاوج-شارك، الرؤوس المرقمة) وأنشطة الاستراتيجيات ===== */
(function(){
"use strict";
var E=window.E,$=E.$,$$=E.$$,n=E.n,esc=E.esc,h=E.h;
var CSS='\
.stgs{display:inline-flex;gap:6px;margin-inline-start:12px;flex-wrap:wrap}\
.stg{border:0;border-radius:999px;padding:5px 14px 5px 12px;font:700 15px/1.2 var(--disp,inherit);color:#fff;background:linear-gradient(135deg,#7c4ee6,#5a2fc0);box-shadow:0 3px 0 #3c1d8f,0 0 0 2px rgba(255,255,255,.25);cursor:pointer;display:inline-flex;gap:6px;align-items:center;white-space:nowrap}\
.stg:hover{filter:brightness(1.1)}.stg.c2{background:linear-gradient(135deg,#14b083,#0b7a5a);box-shadow:0 3px 0 #075940}.stg.c3{background:linear-gradient(135deg,#f0a400,#c47f00);box-shadow:0 3px 0 #8a5a00}\
.sgo{position:absolute;inset:0;z-index:900;background:rgba(10,8,30,.6);display:grid;place-items:center;opacity:0;transition:opacity .2s}.sgo.on{opacity:1}\
.sgb{width:1380px;max-height:820px;display:flex;flex-direction:column;background:#fff;color:#1d1a33;border-radius:30px;box-shadow:0 30px 80px rgba(0,0,0,.45);overflow:hidden;font-family:var(--body,inherit);transform:scale(.96);transition:transform .25s}.sgo.on .sgb{transform:none}\
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

function ov(title,sub,ic,body){var o=h('<div class="sgo"><div class="sgb"><div class="sgh"><span class="ic">'+ic+'</span><div><h2>'+title+'</h2><small>'+(sub||'')+'</small></div><button class="x" aria-label="إغلاق">✕</button></div><div class="sgc"></div></div></div>');$('#stage').appendChild(o);var c=$('.sgc',o);if(typeof body==='string')c.innerHTML=body;requestAnimationFrame(function(){o.classList.add('on')});
  function close(){o.classList.remove('on');if(o._stop)o._stop();setTimeout(function(){o.remove()},220)}$('.x',o).onclick=close;o.addEventListener('click',function(e){if(e.target===o)close()});E.sfx.pop();return {o:o,c:c,close:close}}
function cardHTML(k){var s=CAT[k];return '<div class="sgk"><h3>💡 لماذا هذه الاستراتيجية؟</h3><p>'+s.why+'</p></div><div class="sgk"><h3>👣 خطوات التنفيذ</h3><ol>'+s.steps.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ol></div><div class="sgch"><span>⏱ الزمن: '+s.time+'</span><span>🧑‍🎓 دور الطالب: '+s.role+'</span></div>'}
function key(){return 'strat-'+(window.CFG&&window.CFG.key||'x')}
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

/* ===== خطة الدرس ===== */
function planStation(L,cfg,lid){return {id:'plan',name:'خطة الدرس والاستراتيجيات',build:function(el){
  var rows=L.stations.map(function(s,i){return [s,i,cfg.rows[s.id]]}).filter(function(r){return r[2]});var used={};rows.forEach(function(r){r[2].s.forEach(function(k){used[k]=1})});
  el.innerHTML='<div class="eyebrow">للمعلم والزائر · '+esc(L.title)+'</div><h1 class="t">خطة الدرس: الأهداف والاستراتيجيات والتقويم</h1>'+
   '<div class="stp" style="flex:1;min-height:0;overflow:auto;margin-top:6px"><table><tr><th>#</th><th>المحطة</th><th>الهدف</th><th>الاستراتيجية</th><th>مهارة التفكير</th><th>أداة التقويم</th></tr>'+rows.map(function(r){var x=r[2];return '<tr data-i="'+r[1]+'"><td>'+n(r[1]+1)+'</td><td class="s"><b>'+esc(r[0].name)+'</b></td><td>'+(x.g||'—')+'</td><td>'+x.s.map(function(k){return '<span class="pill">'+CAT[k].ic+' '+CAT[k].n+'</span>'}).join('')+'</td><td>'+(x.sk||'')+'</td><td>'+(x.ev||'')+'</td></tr>'}).join('')+'</table></div>'+
   '<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:10px"><b style="font-family:var(--disp)">🧰 أدوات صفية:</b><button class="stg c3" data-t="sticks">🍡 أعواد المثلجات</button><button class="stg" data-t="tps">👥 فكّر-زاوج-شارك</button><button class="stg c2" data-t="heads">🔢 الرؤوس المرقمة</button><span style="margin-inline-start:auto;font-size:16px;opacity:.8">عدد الاستراتيجيات في الدرس: <b>'+n(Object.keys(used).length)+'</b> · المس أي صف للانتقال إلى محطته، أو شارة الاستراتيجية أعلى المحطة لعرض خطواتها.</span></div>';
  el.style.display='flex';el.style.flexDirection='column';
  $$('tr[data-i]',el).forEach(function(tr){tr.onclick=function(){E.go(+tr.dataset.i)}});$$('[data-t]',el).forEach(function(b){b.onclick=function(){TOOLS[b.dataset.t]()}});return {}}}}

/* ===== الربط بالدرس ===== */
E.strat=function(lid,cfg){var L=E.lessons[lid];if(!L)return;CFGS[lid]=cfg;
  L.stations.forEach(function(s){var r=cfg.rows[s.id];if(!r)return;var b=s.build;s.build=function(el,ctx){var api=b(el,ctx);var ey=$('.eyebrow',el),box=h('<span class="stgs">'+r.s.map(function(k,j){return '<button class="stg'+(j%3?' c'+(j%3+1):'')+'" data-k="'+k+'" title="عرض خطوات الاستراتيجية">'+CAT[k].ic+' '+CAT[k].n+'</button>'}).join('')+'</span>');
    function put(){var ey=$('.eyebrow',el);if(ey&&ey.contains(box))return;if(ey)ey.appendChild(box);else{box.style.cssText='position:absolute;top:14px;left:20px;z-index:5';el.appendChild(box)}}
    put();new MutationObserver(function(){if(!el.contains(box)||!$('.eyebrow',el)||!$('.eyebrow',el).contains(box))put()}).observe(el,{childList:true});
    $$('.stg',box).forEach(function(x){x.onclick=function(e){e.stopPropagation();openStrat(x.dataset.k,r,lid)}});return api}});
  var gi=L.stations.findIndex(function(s){return s.kind==='goals'});L.stations.splice(gi+1,0,planStation(L,cfg,lid))};
var boot=E.boot;E.boot=function(){boot();var b=h('<button class="cb" id="sgfab" title="الأدوات الصفية">🧰 الاستراتيجيات</button>');var m=$('#bMenu');if(m)m.insertAdjacentElement('afterend',b);else $('#stage').appendChild(b);
  b.onclick=function(){var O=ov('🧰 الأدوات الصفية','أدوات تنفيذ الاستراتيجيات أثناء الحصة','🎓','<div class="sgacts" style="justify-content:center;padding:20px"><button class="sgbtn y" data-t="sticks" style="font-size:24px;padding:18px 30px">🍡 أعواد المثلجات</button><button class="sgbtn" data-t="tps" style="font-size:24px;padding:18px 30px">👥 فكّر-زاوج-شارك</button><button class="sgbtn o" data-t="heads" style="font-size:24px;padding:18px 30px">🔢 الرؤوس المرقمة</button></div><div class="sgk"><h3>الاستراتيجيات المتاحة</h3><div class="sgch">'+Object.keys(CAT).map(function(k){return '<span>'+CAT[k].ic+' '+CAT[k].n+'</span>'}).join('')+'</div></div>');
    $$('[data-t]',O.c).forEach(function(x){x.onclick=function(){O.close();TOOLS[x.dataset.t]()}})}};
})();
