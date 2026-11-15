
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

/* ===== تجارب افتراضية — عمل العلم ===== */
(function(){
const {$,$$,G,STN,def,say,SFX,mcq}=K;const AR='font-family="IBM Plex Sans Arabic"';

/* ---------- 1) محقق الكوليرا ---------- */
const PUMPS=[{id:'A',x:150,y:80},{id:'B',x:330,y:150},{id:'C',x:510,y:90},{id:'D',x:200,y:240},{id:'E',x:480,y:250}];
function rnd(s){return ()=>{s=(s*9301+49297)%233280;return s/233280;};}
const CASES=(()=>{const r=rnd(7),a=[];for(let i=0;i<46;i++){const ang=r()*6.28,d=12+r()*70;a.push({x:330+Math.cos(ang)*d*1.3,y:150+Math.sin(ang)*d});}for(let i=0;i<8;i++)a.push({x:40+r()*560,y:30+r()*250});return a;})();
def('lab1',{after:'s2',n:'🧪 محقق الكوليرا',eyebrow:'تجربة افتراضية · بحث وصفي · مقترحة',title:'كن جون سنو: اكتشف مصدر الوباء',goal:'أنت الطبيب جون سنو. اجمع البيانات: المس «بيوت المرضى» لتظهر حالات الإصابة على الخريطة، ثم احسب المسافات إلى المضخات، وحدّد المضخة الملوثة.',plan:7,core:1,
 icon:'<rect x="8" y="8" width="64" height="64" rx="4" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="40" cy="40" r="6" fill="currentColor"/><circle cx="30" cy="34" r="3" fill="currentColor"/><circle cx="48" cy="46" r="3" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="j1svg" viewBox="0 0 640 300" aria-label="خريطة الحي"></svg>
   <div class="toolbar" style="grid-template-columns:repeat(3,minmax(0,1fr))"><button class="tool" type="button" id="j1a"><span>🏠</span><span>1. اجمع بيانات المرضى</span></button><button class="tool" type="button" id="j1b"><span>📏</span><span>2. احسب الحالات قرب كل مضخة</span></button><button class="tool" type="button" id="j1c"><span>🔒</span><span>3. أغلق مضخة</span></button></div></div>
  <div class="side"><div class="card"><h3>دفتر المحقق</h3><div id="j1log" class="step-text muted">ابدأ بجمع البيانات.</div><div class="tablewrap mt"><table class="c6-table" id="j1t"></table></div></div></div></div>
  <div class="card"><h3>استنتج</h3><div id="j1q"></div></div>`,
 init(){let st=0,closed=null,pick=false;
  const near=p=>CASES.filter(c=>Math.hypot(c.x-p.x,c.y-p.y)<70).length;
  const draw=()=>{let s=`<rect width="640" height="300" fill="#f5efe1"/>`;
   for(let i=0;i<9;i++)s+=`<path d="M${i*80} 0V300" stroke="#e2d6b8" stroke-width="10"/>`;for(let j=0;j<5;j++)s+=`<path d="M0 ${j*70+10}H640" stroke="#e2d6b8" stroke-width="10"/>`;
   if(st>=1)CASES.forEach(c=>s+=`<rect x="${c.x-4}" y="${c.y-4}" width="8" height="8" fill="#111" opacity=".75"/>`);
   PUMPS.forEach(p=>{const n=near(p);s+=`<g class="pmp" data-p="${p.id}" style="cursor:${pick?'pointer':'default'}">${st>=2?`<circle cx="${p.x}" cy="${p.y}" r="70" fill="${n>25?'rgba(220,38,38,.18)':'rgba(37,99,235,.08)'}" stroke="${n>25?'#dc2626':'#94a3b8'}" stroke-dasharray="6 5"/>`:''}<circle cx="${p.x}" cy="${p.y}" r="13" fill="${closed===p.id?'#64748b':'#2563eb'}" stroke="#fff" stroke-width="3"/><text x="${p.x}" y="${p.y+5}" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">${p.id}</text>${closed===p.id?`<text x="${p.x}" y="${p.y-20}" text-anchor="middle" ${AR} font-size="13" font-weight="800" fill="#dc2626">مغلقة</text>`:''}</g>`;});
   s+=`<g transform="translate(14 278)"><rect width="10" height="10" fill="#111"/><text x="16" y="10" ${AR} font-size="12" fill="#334155">حالة إصابة</text><circle cx="110" cy="5" r="7" fill="#2563eb"/><text x="122" y="10" ${AR} font-size="12" fill="#334155">مضخة ماء يدوية</text></g>`;
   $('#j1svg').innerHTML=s;$$('#j1svg .pmp').forEach(g=>g.onclick=()=>{if(!pick)return;closeP(g.dataset.p);});};
  const log=[];const L=m=>{log.push(m);$('#j1log').innerHTML='<ol style="margin:0;padding-inline-start:18px">'+log.map(x=>`<li>${x}</li>`).join('')+'</ol>';};
  $('#j1a').onclick=()=>{st=Math.max(st,1);draw();SFX.pop();L(`سجّلت ${CASES.length} حالة إصابة على الخريطة (أماكن سكن المرضى).`);};
  $('#j1b').onclick=()=>{if(st<1){L('اجمع بيانات المرضى أولًا.');return;}st=2;draw();SFX.tick();$('#j1t').innerHTML='<thead><tr><th>المضخة</th><th>حالات قريبة منها</th></tr></thead><tbody>'+PUMPS.map(p=>`<tr><td>${p.id}</td><td>${near(p)}</td></tr>`).join('')+'</tbody>';L('حوّلت البيانات إلى أرقام (الموضوعية): عددت الحالات القريبة من كل مضخة.');};
  $('#j1c').onclick=()=>{if(st<2){L('احسب الحالات قرب كل مضخة أولًا.');return;}pick=true;draw();L('المس المضخة التي تريد إغلاقها.');};
  function closeP(id){closed=id;pick=false;draw();if(id==='B'){SFX.correct();G.add(10,'lab1');L('أغلقت المضخة B… فتناقصت الإصابات الجديدة! المضخة B كانت مصدر التلوث.');}else{SFX.wrong();L(`أغلقت المضخة ${id} لكن الإصابات استمرت. راجع جدول الأرقام.`);}}
  draw();
  mcq($('#j1q'),{q:'ما الخطوة التي جعلت استقصاءك موضوعيًّا؟',o:['تحويل البيانات إلى قياسات رقمية (عدد الحالات قرب كل مضخة)','اختيار المضخة التي تبدو قديمة','الاعتماد على آراء السكان','تخمين المضخة الملوثة'],a:0},'lab1',()=>G.complete('lab1'));},
 explain:'<p>محاكاة مقترحة مبسطة لاستقصاء جون سنو (لندن 1854م): أماكن الحالات وأرقام المضخات افتراضية للتعلم.</p>'});

/* ---------- 2) طبق البكتيريا ---------- */
def('lab2',{after:'s7',n:'🧪 أطباق البكتيريا',eyebrow:'تجربة افتراضية · مقترحة',title:'التجربة المضبوطة: أثر مضادين حيويين في نمو البكتيريا',goal:'جهّز الأطباق الثلاثة بالظروف نفسها، ثم شغّل الحاضنة وراقب نمو البكتيريا يومًا بعد يوم. حدّد المتغيرات.',plan:7,core:1,
 icon:'<circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="30" cy="34" r="4" fill="currentColor"/><circle cx="46" cy="30" r="4" fill="currentColor"/><circle cx="44" cy="50" r="4" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="p2svg" viewBox="0 0 640 260" aria-label="ثلاثة أطباق بكتيريا"></svg><div style="padding:10px"><label class="step-text">📅 اليوم: <b id="p2d">0</b><input type="range" id="p2r" min="0" max="5" value="0" style="width:100%"></label>
   <div class="row-actions"><label class="step-text"><input type="checkbox" id="p2fair" checked> الظروف ثابتة لكل الأطباق (الحرارة 37°س، الزمن، كمية المضاد)</label></div></div></div>
  <div class="side"><div class="card"><h3>نتائج المراقبة</h3><div id="p2out" class="step-text"></div></div></div></div>
  <div class="card"><h3>حدّد</h3><div id="p2q"></div></div>`,
 init(){const r0=rnd(3),SP=[...Array(60)].map(()=>({a:r0()*6.28,d:Math.sqrt(r0())*62}));
  const draw=()=>{const d=+$('#p2r').value,fair=$('#p2fair').checked;$('#p2d').textContent=d;
   const g=[d*12,Math.max(0,d*11-(fair?0:10)),fair?Math.min(2,d):d*5];
   const L=[['أ','مضاد حيوي (أ)'],['ب','مضاد حيوي (ب)'],['ض','العينة الضابطة (بلا مضاد)']];
   let s=`<rect width="640" height="260" fill="var(--wall)"/>`;
   [110,320,530].forEach((x,i)=>{s+=`<ellipse cx="${x}" cy="120" rx="86" ry="80" fill="#fde68a" stroke="#94a3b8" stroke-width="5"/>`;const n=i===0?g[0]:i===1?g[2]:g[0]+3;
    SP.slice(0,Math.min(60,i===1?g[2]:n)).forEach(p=>s+=`<circle cx="${x+Math.cos(p.a)*p.d}" cy="${120+Math.sin(p.a)*p.d*.9}" r="5" fill="#f8fafc" stroke="#d6d3d1"/>`);
    if(i<2)s+=`<circle cx="${x}" cy="120" r="10" fill="#fff" stroke="#64748b" stroke-width="2"/>`;
    s+=`<text x="${x}" y="230" text-anchor="middle" ${AR} font-size="15" font-weight="800" fill="var(--ink)">${['الطبق (أ)','الطبق (ب)','طبق العينة الضابطة'][i]}</text>`;});
   $('#p2svg').innerHTML=s;
   $('#p2out').innerHTML=d===0?'بداية التجربة: لم تنمُ البكتيريا بعد.':`<ul style="margin:0"><li>الطبق (أ): نمت البكتيريا (${Math.min(60,g[0])} مستعمرة).</li><li>الطبق (ب): ${fair?'لم تنمُ البكتيريا تقريبًا.':'نمو متفاوت!'}</li><li>العينة الضابطة: نمت البكتيريا (${Math.min(60,g[0]+3)} مستعمرة).</li></ul>${fair?'':'<p class="fb bad">عندما لم تُثبّت الظروف لم نعد نعرف سبب الاختلاف! يجب أن يتغير عامل واحد فقط.</p>'}`;
   if(d>=4&&fair)G.add(0,'lab2');};
  $('#p2r').oninput=()=>{SFX.tick();draw();};$('#p2fair').onchange=draw;draw();
  K.sortGame($('#p2q'),{bins:['متغير مستقل','متغير تابع','ثابت','عينة ضابطة'],items:[['نوع المضاد الحيوي',0],['عدد مستعمرات البكتيريا',1],['درجة الحرارة 37°س',2],['مدة الحضانة',2],['الطبق بلا مضاد',3]]},'lab2',()=>G.complete('lab2'));},
 explain:'<p>تجربة مقترحة توضح نتيجة العرض: نمت البكتيريا في الضابطة وفي (أ)، ولم تنمُ في (ب)؛ فالمضاد (ب) فعال. أعداد المستعمرات افتراضية.</p>'});

/* ---------- 3) لماذا نكرر المحاولات؟ ---------- */
def('lab3',{after:'lab2',n:'🧪 المحاولات المتعددة',eyebrow:'تجربة افتراضية · مقترحة',title:'لماذا نجري عدة محاولات؟ تجربة سقي النبات',goal:'اختبر الفرضية: «النبات الذي يُسقى كل يوم ينمو أسرع». أجرِ محاولة واحدة، ثم عدة محاولات، وقارن المتوسط.',plan:7,core:1,
 icon:'<path d="M40 70V34" stroke="currentColor" stroke-width="5"/><path d="M40 44c-14 0-20-10-20-20 12 0 20 6 20 20zM40 38c14 0 20-10 20-20-12 0-20 6-20 20z" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="g3svg" viewBox="0 0 640 260" aria-label="نباتات"></svg><div class="row-actions" style="padding:10px"><button class="btn" type="button" id="g3one">أجرِ محاولة</button><button class="tbtn" type="button" id="g3five">أجرِ 5 محاولات دفعة واحدة</button><button class="tbtn" type="button" id="g3r">إعادة</button></div></div>
  <div class="side"><div class="card"><h3>جدول البيانات (أطوال النبات بعد أسبوعين، سم)</h3><div class="tablewrap"><table class="c6-table" id="g3t"></table></div><div id="g3fb"></div></div></div></div>
  <div class="card"><h3>استنتج</h3><div id="g3q"></div></div>`,
 init(){let T=[];const r=rnd(11);
  const trial=()=>{const n=+(9+r()*5).toFixed(1),w=+(7+r()*6).toFixed(1);T.push([n,w]);};
  const avg=i=>T.length?(T.reduce((a,t)=>a+t[i],0)/T.length).toFixed(1):'—';
  const draw=()=>{const last=T[T.length-1]||[0,0];let s=`<rect width="640" height="260" fill="var(--wall)"/><rect y="220" width="640" height="40" fill="var(--bench)"/>`;
   [[180,'يُسقى كل يوم',last[0]],[460,'يُسقى مرة في الأسبوع (ضابطة)',last[1]]].forEach(([x,lb,h])=>{const H=h*10;s+=`<path d="M${x-40} 220 l8 -40 h64 l8 40z" fill="#b45309"/><path d="M${x} 180 V${180-H}" stroke="#15803d" stroke-width="6"/>${H?`<path d="M${x} ${190-H*.6} c-26 0-34-14-34-26 18 0 34 8 34 26zM${x} ${200-H*.4} c26 0 34-14 34-26-18 0-34 8-34 26z" fill="#22c55e"/>`:''}<text x="${x}" y="246" text-anchor="middle" ${AR} font-size="14" font-weight="700" fill="#fff">${lb}</text><text x="${x}" y="${170-H}" text-anchor="middle" font-size="15" font-weight="800" fill="var(--ink)">${h?h+' سم':''}</text>`;});
   $('#g3svg').innerHTML=s;
   $('#g3t').innerHTML=`<thead><tr><th>المحاولة</th><th>كل يوم</th><th>مرة أسبوعيًّا</th></tr></thead><tbody>${T.map((t,i)=>`<tr><td>${i+1}</td><td>${t[0]}</td><td>${t[1]}</td></tr>`).join('')}<tr><th>المتوسط</th><th>${avg(0)}</th><th>${avg(1)}</th></tr></tbody>`;
   if(T.length===1&&T[0][1]>=T[0][0])say($('#g3fb'),'bad','لاحظ: في هذه المحاولة الواحدة لم تُدعم الفرضية! هل نثق بمحاولة واحدة؟');
   else if(T.length>=5){say($('#g3fb'),'ok',`بعد ${T.length} محاولات: متوسط «كل يوم» ${avg(0)} سم مقابل ${avg(1)} سم. النتائج المتعددة أدق وأوثق.`);G.complete('lab3');}else $('#g3fb').innerHTML='';};
  $('#g3one').onclick=()=>{trial();SFX.pop();draw();};$('#g3five').onclick=()=>{for(let i=0;i<5;i++)trial();SFX.correct();draw();};$('#g3r').onclick=()=>{T=[];draw();};draw();
  mcq($('#g3q'),{q:'لماذا نجري عدة محاولات للتجربة؟',o:['للتأكد من صحة النتائج ولتكون أكثر دقة','لأن المحاولة الأولى خاطئة دائمًا','لإضاعة الوقت','لتغيير الفرضية'],a:0},'lab3');},
 explain:'<p>تجربة مقترحة: القيم عشوائية ضمن مدى؛ قد لا تدعم محاولة واحدة الفرضية، لكن المتوسط بعد عدة محاولات يكشف النمط الحقيقي.</p>'});
})();

/*@css c1.css*/
/*@include lab2.js*/
/*@include kit.js*/
/*@include skit.js*/
/* ===== الفصل الأول · الدرس الثاني: عمل العلم — «مختبر المحققين» ===== */
(function(){
const {$,$$,G,STN,def,mcq,flips,match,sortGame,challenge,say,SFX,pic,slides,escape,auction,riddles,choiceBoard,solutions}=K;
const {fig,grid,reveal,ICO,lst,order,fill,tfx}=C6;const P=(n,c)=>[n,c];

def('intro',{n:'الافتتاحية',plan:3,icon:ICO.lens,
 body:`<div class="hero"><div class="hero-photo">${pic('s05_42b5f3bb','سيارة ارتفعت حرارة محركها')}<span class="cap">بينما تقود سيارتك لاحظت ارتفاع درجة حرارة المحرك… كيف تواجه هذا الموقف؟</span></div>
  <div><span class="eyebrow">مختبر المحققين</span><h2 class="hero-h">كل مشكلة… لها طريقة علمية لحلها!</h2>
   <p class="riddle">لابد أن يبدأ عقلك بطرح الأسئلة: لماذا؟ كيف؟ متى؟ ثم تبدأ بعمل منظم يقودك لحل المشكلة. فما الخطوات التي يتبعها العلماء؟</p>
   <p class="q">ما توقعك قبل أن تبدأ؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div>`,init(){}});

const GOALS=['تختبر خطوات حل مشكلة ما بطريقة علمية.','توضح كيفية بناء الاستقصاء المصمم جيدًا.'];
const TERMS=[{t:'التجربة',d:'مجموعة من الخطوات المنظمة يقود تنفيذها إلى اكتشاف أو اختبار أو إثبات شيء ما. (مراجعة المفردات)'},
 {t:'البحث الوصفي',d:'بحث يجيب عن الأسئلة من خلال الملاحظات.'},{t:'البحث التجريبي',d:'بحث يجيب عن الأسئلة العلمية من خلال اختبار الفرضية (التجربة).'},
 {t:'الطرائق العلمية',d:'مجموعة من الخطوات المتسلسلة التي تؤدي إلى حل المشكلات.'},{t:'النموذج',d:'محاكاة لشيء ما أو حدث ما، ويستخدم أداةً لفهم العالم الطبيعي.'},
 {t:'الفرضية',d:'توقع أو عبارة قابلة للاختبار.'},{t:'المتغير المستقل',d:'العامل الذي يتم تغييره في التجربة.'},{t:'المتغير التابع',d:'العامل الذي يتم قياسه في التجربة.'},
 {t:'الثابت',d:'المتغيرات التي تبقى ثابتة دون أن تتغير.'},{t:'العينة الضابطة',d:'عينة تعامل مثل بقية المجموعات التجريبية، إلا أنها لم تتعرض إلى أثر المتغير المستقل.'}];
def('goals',{n:'الأهداف والمفردات',eyebrow:'الكتاب صفحة 26',title:'الأهداف والمفردات',goal:'تعرّف أهداف الدرس وأهميته ومفرداته.',plan:4,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><div class="story mt"><b>أهمية الدرس:</b> تساعدك الطرائق العلمية والتجارب المدروسة بعناية على حل المشكلات.</div></div>
  <div class="card"><h3>مراجعة المفردات</h3><p class="step-text"><b>التجربة:</b> مجموعة من الخطوات المنظمة يقود تنفيذها إلى اكتشاف أو اختبار أو إثبات شيء ما.</p><h3 class="mt">المفردات الجديدة</h3><ul class="tasks plain" style="columns:2">${TERMS.slice(1).map(t=>`<li>${t.t}</li>`).join('')}</ul></div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المفردات</h2><span>المس البطاقة</span></div><div id="g2f"></div></div><div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2></div><div id="g2m"></div></div>`,
 init(){flips($('#g2f'),TERMS);this.reset();},reset(){match($('#g2m'),TERMS.slice(1,7).map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));}});

def('s1',{n:'1 · حل المشكلات',eyebrow:'المحطة 1 · الكتاب صفحة 26',title:'حل المشكلات والطريقة العلمية',goal:'يتم حل المشكلات بالطريقة العلمية: مشكلة ← تفكير ← حل.',plan:6,core:1,icon:'<circle cx="16" cy="40" r="10" fill="currentColor"/><circle cx="40" cy="40" r="10" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="64" cy="40" r="10" fill="currentColor" opacity=".5"/>',
 body:`<div class="card" id="s1sl"></div><div class="two"><div class="card"><h3>طرق حل المشكلات</h3><div class="tablewrap"><table class="c6-table"><thead><tr><th>البحث الوصفي</th><th>البحث التجريبي</th></tr></thead><tbody><tr><td>بحث يجيب عن الأسئلة من خلال الملاحظات.</td><td>بحث يجيب عن الأسئلة العلمية من خلال اختبار الفرضية (التجربة).</td></tr></tbody></table></div>${grid([['s08_a6c151ac','البحث التجريبي'],['s08_8f96d7ba','البحث الوصفي']])}</div>
  <div class="card"><h3>وصفي أم تجريبي؟</h3><div id="s1sort"></div></div></div>`,
 init(){slides($('#s1sl'),[
  {k:'حل المشكلات',t:'ارتفاع حرارة المحرك',im:[P('s05_42b5f3bb','سيارة')],html:'<p>بينما تقود سيارتك لاحظت ارتفاع درجة حرارة محرك السيارة. كيف تواجه هذا الموقف؟</p><p>لابد أن يبدأ عقلك بطرح الأسئلة: <b>لماذا؟ كيف؟ متى؟</b> ثم تبدأ بعمل منظم يقودك لحل المشكلة.</p>'},
  {k:'كيف يمكن حل المشكلة؟',t:'الطريقة العلمية',im:[P('s07_ae737bd9','مشكلة ثم تفكير ثم حل')],html:'<p>يتم حل المشكلات بالطريقة العلمية.</p><p class="def"><b>الطريقة العلمية:</b> مجموعة من الخطوات المتسلسلة التي تؤدي إلى حل المشكلات.</p><p>مشكلة ← تفكير ← حل</p>'}],'s1');
  sortGame($('#s1sort'),{bins:['بحث وصفي','بحث تجريبي'],items:[['تسجيل أعداد الطيور المهاجرة كل يوم',0],['تتبّع أماكن سكن مرضى الكوليرا',0],['اختبار أثر السماد في نمو النبات',1],['اختبار أثر مضادين حيويين في نمو البكتيريا',1],['وصف شكل النجوم في السماء ليلًا',0]],hint:'هل نغيّر عاملًا ونختبر فرضية؟'},'s1',()=>G.complete('s1'));},
 explain:'<p>البحث الوصفي يجيب من خلال الملاحظات، والبحث التجريبي يختبر الفرضية بالتجربة. (أمثلة التصنيف مقترحة.)</p>'});

def('s2',{n:'2 · البحث الوصفي',eyebrow:'المحطة 2 · الكتاب صفحة 27',title:'البحث الوصفي: خطواته الثلاث',goal:'يعتمد البحث الوصفي على: تحديد الهدف من البحث، ووصف تصميم البحث، والموضوعية. تعرّفها مع قصة الطبيب جون سنو.',plan:7,core:1,icon:ICO.lens,
 body:`<div class="card" id="s2sl"></div><div class="card"><h3>رتّب خطوات البحث الوصفي</h3><div id="s2o"></div></div>`,
 init(){slides($('#s2sl'),[
  {k:'1 · تحديد الهدف من البحث',t:'ماذا تريد أن تكتشف؟',im:[P('s10_91134c70','الطبيب جون سنو'),P('s10_78f8feb1','خريطة لندن')],html:'<p>هدف البحث هو ما تريد أن تكتشفه، أو السؤال الذي ترغب في الإجابة عنه.</p><p>تتبّع الطبيب البريطاني <b>جون سنو</b> مصدر وباء الكوليرا باستخدام البحث الوصفي، وحدّد هدفه: <b>اكتشاف مصدر وباء الكوليرا في لندن</b>.</p><p class="hint-line">تصحيح: ورد في العرض «عام 1800م»، والصواب أن ذلك كان عام 1854م (في القرن التاسع عشر).</p>'},
  {k:'2 · وصف تصميم البحث',t:'الأسئلة والبيانات',im:[P('s11_ab6bd1ac','خريطة جون سنو')],html:'<p>ضمّن الطبيب جون سنو في استقصائه الأسئلة التي توصله لأماكن سكن المرضى المصابين وأماكن حصولهم على الماء.</p><p>واستخدم هذه البيانات في توقع أن المياه التي مصدرها <b>المضخة اليدوية الموجودة في الشارع</b> كانت مصدر التلوث.</p><p>جرّب أن تكون جون سنو في المختبر الافتراضي التالي!</p>'},
  {k:'3 · الموضوعية',t:'الابتعاد عن التحيز',im:[P('s12_4de8af9d','تحويل البيانات إلى أرقام'),P('s12_1d16f426','العينات العشوائية')],html:'<p>تكون الموضوعية بالابتعاد عن التحيز أو النتائج المتوقعة. ويتم ذلك من خلال:</p><ol><li>تحويل جميع البيانات إلى قياسات رقمية.</li><li>استخدام عينات عشوائية.</li></ol>'}],'s2');
  order($('#s2o'),['تحديد الهدف من البحث','وصف تصميم البحث','الموضوعية'],'s2',()=>G.complete('s2'));},
 quiz:[{q:'الابتعاد عن التحيز أو النتائج المتوقعة:',o:['الموضوعية','الفرضية','العينة الضابطة','النموذج'],a:0}]});

def('s3',{n:'3 · الطريقة العلمية',eyebrow:'المحطة 3 · الكتاب صفحة 27–28',title:'البحث التجريبي وخطوات الطريقة العلمية',goal:'ماذا تعمل إذا كانت نتائج تجربتك لا تدعم فرضيتك؟ ثم رتّب خطوات الطريقة العلمية.',plan:6,core:1,icon:'<path d="M8 64h16V48h16V32h16V16h16" fill="none" stroke="currentColor" stroke-width="6"/>',
 body:`<div class="two"><div class="card"><h3>إحدى الطرائق العلمية لحل المشكلات: البحث التجريبي</h3>${fig('s13_a70637d2','دورة البحث التجريبي',300)}<div id="s3q"></div></div>
  <div class="card"><h3>رتّب خطوات الطريقة العلمية</h3><div id="s3o"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s3');};
  mcq($('#s3q'),{q:'إذا كانت نتائج تجربتك لا تدعم فرضيتك، ماذا تعمل؟',o:['أعيد تكوين الفرضية','أخفي النتائج','أغيّر البيانات لتوافق الفرضية','أتوقف عن البحث'],a:0},'s3',c);
  order($('#s3o'),['تحديد المشكلة','جمع البيانات','وضع الفرضيات','اختبار صحة الفرضيات','تحليل البيانات','استخلاص النتائج'],'s3',c,'هذه خطوات الطريقة العلمية الست.');},
 explain:'<p>خطوات الطريقة العلمية: تحديد المشكلة، جمع البيانات، وضع الفرضيات، اختبار صحة الفرضيات، تحليل البيانات، استخلاص النتائج. وإذا لم تدعم النتائج الفرضية تُعاد صياغتها.</p>'});

def('s4',{n:'4 · الأجهزة والنماذج',eyebrow:'المحطة 4 · الكتاب صفحة 29–30',title:'الأجهزة والمواد والنماذج والقياسات العلمية',goal:'اختر أحدث المواد، واستخدم النماذج، وقِس بالنظام العالمي للوحدات SI.',plan:8,core:1,icon:ICO.flask,
 body:`<div class="card" id="s4sl"></div><div class="two"><div class="card"><h3>صنّف النماذج</h3><div id="s4sort"></div></div><div class="card"><h3>الجدول 1: النظام العالمي (SI) لوحدات القياس</h3><div class="tablewrap"><table class="c6-table"><thead><tr><th>القياس</th><th>الوحدة</th><th>الرمز</th><th>يساوي</th></tr></thead><tbody>
  <tr><td rowspan="4">الطول</td><td>1 ملليمتر</td><td>ملم</td><td>0.001 م (1/1000)</td></tr><tr><td>1 سنتمتر</td><td>سم</td><td>0.01 م (1/100)</td></tr><tr><td>1 متر</td><td>م</td><td>100 سم</td></tr><tr><td>1 كيلومتر</td><td>كم</td><td>1000 م</td></tr>
  <tr><td rowspan="2">حجم السائل</td><td>1 ملليلتر</td><td>مل</td><td>0.001 لتر</td></tr><tr><td>1 لتر</td><td>لتر</td><td>1000 مل</td></tr>
  <tr><td rowspan="4">الكتلة</td><td>1 ملجرام</td><td>ملجم</td><td>0.001 جم</td></tr><tr><td>1 جرام</td><td>جم</td><td>1000 ملجم</td></tr><tr><td>1 كيلوجرام</td><td>كجم</td><td>1000 جم</td></tr><tr><td>1 طن</td><td>طن</td><td>1000 كجم = 1 طن</td></tr></tbody></table></div><div id="s4c" class="mt"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s4');};
  slides($('#s4sl'),[
   {k:'اختيار المواد والأجهزة',t:'أحدث المواد المتوافرة',im:[P('s15_a202a55c','أدوات المختبر'),P('s15_354d1056','طالب يعرض نتائجه')],html:'<p>عندما تنفذ الاستقصاء وتجمع البيانات عليك أن تختار أحدث المواد المتوافرة لديك.</p><p>بعد أن تكمل استقصاءك يمكنك أن تستخدم بعض الوسائل المتاحة لعرض النتائج، كما يمكن استخدام الحاسب الآلي أيضًا.</p>'},
   {k:'استخدام النماذج',t:'درسنا في الصف الأول المتوسط',im:[P('s16_44887300','نموذج المجموعة الشمسية'),P('s16_d81a960d','نموذج حاسوبي لحركة الصفائح'),P('s16_77c250a5','أينشتاين')],html:'<p class="def"><b>النموذج:</b> محاكاة لشيء ما أو حدث ما، ويستخدم أداةً لفهم العالم الطبيعي؛ حيث تساعد النماذج على تصور أو تخيل الأشياء التي يصعب رؤيتها أو فهمها.</p><p><b>أنواع النماذج:</b> النماذج المادية (نموذج المجموعة الشمسية)، والنماذج الحاسوبية (استخدام الحاسوب لعمل نموذج لحركة الصفائح الأرضية)، والنماذج الفكرية (معادلة المادة والطاقة لأينشتاين).</p><p><b>تفيد النماذج في:</b> توفير المال والجهد، واختبار التوقعات والفرضيات، والتواصل.</p>'},
   {k:'القياسات العلمية',t:'النظام العالمي للوحدات SI',im:[P('s17_b56c7e76','مخبار مدرج وميزان'),P('s17_7d934c3f','وحدات SI')],html:'<p>استخدم العلماء لجمع الملاحظات في جميع أنحاء العالم نظامًا للقياس يسمى <b>النظام العالمي للوحدات</b> International System of Units.</p><p>من الأدوات التي يستخدمها العلماء: المخبار المدرج لقياس حجم السائل، والميزان لقياس الكتلة، ومقياس الحرارة لقياس درجة الحرارة.</p>'}],'s4');
  sortGame($('#s4sort'),{bins:['مادي','حاسوبي','فكري'],items:[['نموذج المجموعة الشمسية',0],['مجسم الخلية',0],['محاكاة حركة الصفائح الأرضية',1],['محاكاة الطقس على الحاسوب',1],['معادلة المادة والطاقة لأينشتاين',2]]},'s4',c);
  K.calcQ($('#s4c'),{p:'كم سنتمترًا في 2.5 متر؟',v:250,unit:'سم',given:'1 م = 100 سم',law:'سم = م × 100',sol:'2.5 × 100 = 250 سم'},'s4',c);},
 explain:'<p>نختار أحدث المواد، ونستخدم النماذج المادية والحاسوبية والفكرية، ونقيس بالنظام العالمي للوحدات SI. (مثالا مجسم الخلية ومحاكاة الطقس مقترحان.)</p>'});

def('s5',{n:'5 · البيانات والنتائج',eyebrow:'المحطة 5 · الكتاب صفحة 31–32',title:'جمع البيانات، واستخلاص النتائج، وتواصل العلماء',goal:'لماذا تُنظَّم البيانات؟ وماذا يفعل العلماء إذا لم تدعم النتائج توقعاتهم؟',plan:6,core:1,icon:'<rect x="12" y="44" width="12" height="24" fill="currentColor"/><rect x="34" y="28" width="12" height="40" fill="currentColor" opacity=".7"/><rect x="56" y="14" width="12" height="54" fill="currentColor" opacity=".4"/>',
 body:`<div class="card" id="s5sl"></div>`,
 init(){slides($('#s5sl'),[
  {k:'جمع البيانات',t:'لماذا تُنظّم البيانات؟',im:[P('s19_1b575145','جدول بيانات'),P('s19_ee947fd6','رسم بياني')],html:'<p>يجب أن تُجمع البيانات في البحوث العلمية، وتُنظّم بصورة صحيحة. <b>لماذا؟</b> لأن التنظيم الجيد للبيانات يسهّل عمليتي التفسير والتحليل.</p><p>وهي تكون على شكل: <b>جداول البيانات</b>، و<b>الرسوم البيانية</b>.</p>'},
  {k:'استخلاص النتائج',t:'البحث عن مضاد حيوي',im:[P('s20_2494bf57','المضادات الحيوية'),P('s20_c1b9085f','البكتيريا')],html:'<p>يقضي العلماء عدة سنوات في البحث عن مضاد حيوي يقتل بكتيريا معينة لاكتشاف أي المضادات الحيوية تؤثر فيها، وأيها لا تؤثر. فيتوصل العلماء إلى بعض المعلومات الجديدة في كل مرة يجدون فيها مضادًا حيويًّا لا تأثير له.</p><ul><li>التوصل للعلاج، وهو المطلوب.</li><li>عدم التوصل للعلاج، واستخدام المعلومات التي تم استقصاؤها في إنتاج مضادات حيوية أخرى.</li></ul><p class="def"><b>نستنتج:</b> إذا كانت النتائج لا تدعم توقعك فيتم الاحتفاظ بها للاستفادة منها في مجال آخر.</p>'},
  {k:'تواصل العلماء',t:'اقرأ النص صفحة 30',im:[P('s21_ad434be3','لقاء علمي')],html:'<p>يُعد التواصل بنتائج التجارب جزءًا مهمًّا من الخبرات المختبرية.</p><p><b>لماذا يعد تواصل العلماء ونقل البيانات بينهم أمرًا مهمًّا لهم؟</b> لأن ذلك يُمكّن العلماء الآخرين من الاستفادة من المعلومات والبيانات التي تم التوصل لها، ويتيح لهم الحصول على أفكار جديدة تساهم في التوصل لنتائج أفضل.</p>'}],'s5',()=>G.complete('s5'));}});

def('ev1',{n:'تقويم 1–3',eyebrow:'تقويم · الأسئلة 1–3',title:'تقويم: الطرائق العلمية',goal:'أسئلة التقويم كما في العرض.',plan:6,core:1,icon:ICO.check,
 body:`<div class="two"><div class="card"><h3>1-1</h3><div id="a1"></div></div><div class="card"><h3>1-2</h3><div id="a2"></div></div></div><div class="card"><h3>1-3</h3><div id="a3"></div></div>
  <div class="card"><h3>2 · أكمل الفراغات التالية بما يناسبها</h3><div id="a4"></div></div><div class="card"><h3>3 · أجب بكلمة (صح) للعبارة الصحيحة، و(خطأ) للعبارة الخاطئة</h3><div id="a5"></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=5)G.complete('ev1');};
  mcq($('#a1'),{q:'أول خطوة من خطوات الطرائق العلمية هي:',o:['استخلاص النتائج','تحديد المشكلة','وضع الفرضيات','اختبار الفرضيات'],a:1},'ev1',c);
  mcq($('#a2'),{q:'أي مما يلي ليس من خطوات البحث الوصفي:',o:['تحديد الهدف من البحث','وصف تصميم البحث','التحيز','الموضوعية'],a:2},'ev1',c);
  mcq($('#a3'),{q:'ماذا تفعل إذا كانت نتائج تجربتك لا تدعم فرضيتك؟',o:['تعيد التجربة','تستخلص النتائج','تحلل البيانات','تغير الفرضية'],a:3},'ev1',c);
  fill($('#a4'),{bank:['جمع الملاحظات','البحث التجريبي','النموذج','النظام الدولي للوحدات SI'],items:[['البحث الوصفي يُجيب عن الأسئلة العلمية من خلال ___','جمع الملاحظات'],['يستخدم العلماء لجمع الملاحظات في جميع أنحاء العالم نظامًا للقياس يسمى ___','النظام الدولي للوحدات SI']]},'ev1',c);
  tfx($('#a5'),[['النظريات العلمية <u>ثابتة لا تتغير</u>.',false,'قابلة للتغيير',['قابلة للتغيير','نهائية','سرية']],['من فوائد استخدام النماذج توفير المال والوقت والجهد.',true],['المعلومات عن الاكتشافات العلمية الحديثة متوافرة <u>للعلماء فقط</u>.',false,'للجميع',['للجميع','للأطباء فقط','للمعلمين فقط']],['اختبار الفرضيات هي الخطوة <u>الأخيرة</u> من خطوات الطريقة العلمية.',false,'الرابعة',['الرابعة','الأولى','الثانية']]],'ev1',c);},
 explain:'<p>إجابات «صح أم خطأ» من العرض؛ والتصحيح بالكلمة المقترحة مبني على شرائح الدرس: الخطوة الأخيرة هي «استخلاص النتائج».</p>'});

def('s6',{n:'6 · البحث التجريبي',eyebrow:'المحطة 6 · الكتاب صفحة 34',title:'البحث التجريبي: خطوات التجربة المضبوطة',goal:'التجريب عمل أساس في العلوم: الإجابة عن سؤال علمي من خلال ملاحظة حالات قابلة للتحكم فيها وضبطها.',plan:7,core:1,icon:ICO.flask,
 body:`<div class="card" id="s6sl"></div><div class="two"><div class="card"><h3>رتّب خطوات البحث التجريبي</h3><div id="s6o"></div></div><div class="card"><h3>كوّن فرضية</h3><p class="step-text">إذا لاحظت أن سقي نباتاتك كل يوم يجعلها تنمو بشكل أسرع…</p><div id="s6q"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s6');};
  slides($('#s6sl'),[
   {k:'البحث التجريبي',t:'التجريب عمل أساس في العلوم',im:[P('s25_586433d3','عالم يجرب')],html:'<p>التجريب: الإجابة عن سؤال علمي من خلال ملاحظة حالات قابلة للتحكم فيها وضبطها.</p><p><b>خطواته:</b> وضع فرضية ← التخطيط للتجربة ← استخدام عينة ضابطة ← إجراء عدة محاولات للتجربة ← تحليل البيانات ← استخلاص النتائج.</p>'},
   {k:'وضع الفرضية',t:'توقع قابل للاختبار',im:[P('s27_bc844e1b','الفرضية'),P('s27_bd9a7979','سقي النبات')],html:'<p class="def"><b>الفرضية:</b> توقع أو عبارة قابلة للاختبار.</p><p>عادة ما تستخدم خبراتك السابقة في وضع الفرضيات. بعدها يمكنك بدء التجارب لاختبار فرضيتك.</p>'},
   {k:'التخطيط للتجربة',t:'التجربة المضبوطة',im:[P('s28_1724cb00','طبق بكتيريا')],html:'<p>وذلك عن طريق التجربة المضبوطة التي تحتاج لضبط ثوابتها ومتغيراتها.</p><p><b>مثال:</b> سنختبر أثر مضادين حيويين في نمو البكتيريا.</p>'}],'s6');
  order($('#s6o'),['وضع فرضية','التخطيط للتجربة','استخدام عينة ضابطة','إجراء عدة محاولات للتجربة','تحليل البيانات','استخلاص النتائج'],'s6',c);
  mcq($('#s6q'),{q:'أي العبارات التالية فرضية قابلة للاختبار؟',o:['إذا سُقي النبات كل يوم فإنه ينمو أسرع من النبات الذي يُسقى مرة في الأسبوع','النباتات جميلة','أحب سقي النباتات','النبات كائن حي'],a:0,why:'الفرضية توقع يمكن اختباره بتجربة.'},'s6',c);}});

def('s7',{n:'7 · المتغيرات والعينة الضابطة',eyebrow:'المحطة 7 · الكتاب صفحة 34–35',title:'تجربة المضادين الحيويين: المتغيرات والعينة الضابطة',goal:'أضيف مضادان حيويان مختلفان إلى الطبقين (أ) و(ب)، ولم يُضف أي مضاد إلى طبق العينة الضابطة. ماذا نلاحظ؟',plan:8,core:1,icon:'<circle cx="22" cy="40" r="14" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="58" cy="40" r="14" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="18" cy="36" r="3" fill="currentColor"/><circle cx="26" cy="44" r="3" fill="currentColor"/>',
 body:`<div class="two"><div class="card">${grid([['s29_f7b95ce1','أولًا: بداية التجربة'],['s29_f4383349','ثانيًا: النتائج']])}<p class="step-text"><b>نلاحظ أن:</b> البكتيريا نمت في طبق العينة الضابطة وفي الطبق الذي أضفنا له المضاد الحيوي (أ)، بينما لم تنمُ في الطبق الذي أضفنا له المضاد الحيوي (ب). جميع العوامل كانت ثابتة ما عدا نوع المضاد الحيوي الذي أضيف.</p></div>
  <div class="card"><h3>تعاريف</h3><div class="tablewrap"><table class="c6-table"><thead><tr><th>المصطلح</th><th>التعريف</th><th>المثال في تجربتنا</th></tr></thead><tbody><tr><td>المتغير المستقل</td><td>العامل الذي يتم تغييره في التجربة</td><td>نوع المضاد</td></tr><tr><td>المتغير التابع</td><td>العامل الذي يتم قياسه في التجربة</td><td>نمو البكتيريا</td></tr><tr><td>الثوابت</td><td>المتغيرات التي تبقى ثابتة دون أن تتغير</td><td>درجة الحرارة · الزمن · كمية المضاد</td></tr></tbody></table></div>
   <h3 class="mt">ماذا عن العينة الضابطة؟</h3><p class="step-text">هي عينة تعامل مثل بقية المجموعات التجريبية، إلا أنها لم تتعرض إلى أثر المتغير المستقل. ففي تجربتنا: العينة الضابطة هي عينة البكتيريا التي لم نُضف إليها أي مضاد حيوي، وتوضح كيف تنمو البكتيريا عندما لا يضاف إليها أي مضاد.</p>${reveal('ماذا تفيدنا العينة الضابطة؟','لكي نقارن نتائجها بنتائج تلك العينات التي تعرضت لأثر المتغير المستقل.')}</div></div>
  <div class="two"><div class="card"><h3>صنّف عناصر تجربتنا</h3><div id="s7sort"></div></div><div class="card" id="s7sl"></div></div>`,
 init(){sortGame($('#s7sort'),{bins:['متغير مستقل','متغير تابع','ثابت','عينة ضابطة'],items:[['نوع المضاد الحيوي',0],['نمو البكتيريا',1],['درجة الحرارة',2],['الزمن',2],['كمية المضاد',2],['طبق بلا مضاد حيوي',3]]},'s7',()=>G.complete('s7'));
  slides($('#s7sl'),[{k:'إجراء عدة محاولات',t:'لماذا؟',im:[P('s32_36005894','جدول المحاولات')],html:'<p>للتأكد من صحة نتائجك، ولتكون النتائج أكثر دقة.</p>'},{k:'تحليل البيانات',t:'التعريف',im:[P('s33_d22bf43d','تحليل البيانات')],html:'<p class="def"><b>تحليل البيانات:</b> عملية فحص وتدقيق البيانات وانتقائها، وتحويلها وتخزينها ونمذجتها؛ بهدف استخلاص استنتاجات.</p>'}],'s7');},
 explain:'<p>المتغير المستقل: نوع المضاد. التابع: نمو البكتيريا. الثوابت: الحرارة والزمن وكمية المضاد. العينة الضابطة: طبق بلا مضاد للمقارنة.</p>'});

def('ev2',{n:'تقويم 4–5',eyebrow:'تقويم · الأسئلة 4–5',title:'تقويم: البحث التجريبي',goal:'ضع المصطلح المناسب، ثم صح أم خطأ.',plan:4,core:1,icon:ICO.check,
 body:'<div class="card"><h3>4 · ضع المصطلح العلمي المناسب لما يأتي</h3><div id="b1"></div></div><div class="card"><h3>5 · صح أم خطأ</h3><div id="b2"></div></div>',
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('ev2');};
  fill($('#b1'),{bank:['الثوابت','العينة الضابطة','المتغير المستقل','الفرضية','المتغير التابع','القانون العلمي'],items:[['العامل الذي يتم قياسه في التجربة هو ___','المتغير التابع'],['___ المتغيرات التي تبقى ثابتة دون أن تتغير.','الثوابت'],['___ هي عينة تعامل مثل بقية المجموعات التجريبية، إلا أنها لم تتعرض إلى أثر المتغير المستقل.','العينة الضابطة'],['العامل الذي يتم تغييره في التجربة ___','المتغير المستقل']]},'ev2',c);
  tfx($('#b2'),[['الفرضية هي عبارة <u>تصف حقيقة</u>.',false,'قابلة للاختبار',['قابلة للاختبار','ثابتة','لا تتغير']],['كلما أكثرت من عدد المحاولات في التجربة كانت النتائج أكثر صحة.',true],['<u>تتأثر</u> العينة الضابطة بتغير المتغير المستقل.',false,'لا تتأثر',['لا تتأثر','تتغير','تتضاعف']],['عند تصميم البحث التجريبي يتم تحليل البيانات <u>بعد</u> استخلاص النتائج.',false,'قبل',['قبل','أثناء','بدل']]],'ev2',c);}});

def('sum',{n:'الخلاصة',eyebrow:'الخلاصة · الكتاب صفحة 37',title:'الخلاصة',goal:'أهم أفكار الدرس.',plan:2,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>حل المشكلات</h3>${lst(['الطرائق العلمية خطوات تتبع لحل مشكلة ما.','يستخدم البحث الوصفي عندما يصعب إجراء التجارب.'])}<h3 class="mt">الأجهزة والموادّ والنماذج</h3>${lst(['النماذج أدوات مهمة في العلم.','يُستخدم النظام العالمي للوحدات (SI) لأخذ القياسات.','تجمع البيانات وتسجل وتنظم.'])}</div>
  <div class="card"><h3>استخلاص النتائج</h3>${lst(['يبحث العلماء عن أنماط أو علاقات في البيانات التي يجمعونها، ثم يتواصلون بنتائجهم مع الآخرين.'])}<h3 class="mt">تصميم البحث التجريبي</h3>${lst(['تبدأ التجربة بفرضية.','المتغيرات عوامل تتغير خلال التجربة.','العينات الضابطة لا تتعرض لأثر المتغير المستقل لكي تقارن نتائجها بنتائج تلك العينات التي تعرضت لأثر المتغير المستقل.','بعد أن تُستخلص النتائج يتم التواصل بها مع علماء آخرين.'])}</div></div>`,enter(){G.complete('sum');}});
def('self',{n:'اختبر نفسك',eyebrow:'الواجب · الكتاب صفحة 37 · التسليم يوم الخميس',title:'اختبر نفسك',goal:'أسئلة «اختبر نفسك» مع إجابات نموذجية مقترحة.',plan:3,icon:ICO.check,body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'1 · وضّح',q:'لماذا يستخدم العلماء النماذج؟ اذكر ثلاثة أمثلة عليها.',a:[['لماذا','لتصور الأشياء التي يصعب رؤيتها أو فهمها، ولتوفير المال والجهد، واختبار التوقعات والفرضيات، والتواصل.'],['أمثلة','نموذج المجموعة الشمسية (مادي)، ونموذج حاسوبي لحركة الصفائح (حاسوبي)، ومعادلة المادة والطاقة لأينشتاين (فكري).']]},
  {k:'2 · عرّف',q:'المقصود بالفرضية.',a:[['الإجابة','توقع أو عبارة قابلة للاختبار.']]},
  {k:'3 · اذكر',q:'الخطوات الثلاث (الأساسية) التي يستخدمها العلماء عند تصميم استقصاء لحل مشكلة ما.',a:[['الإجابة','تحديد الهدف من البحث، ووصف تصميم البحث، والموضوعية (في البحث الوصفي).']]},
  {k:'4 · حدّد',q:'لماذا يُعدّ تحديد المشكلة التي يتعين حلها بدقة أمرًا مهمًّا؟',a:[['الإجابة','لأنها الخطوة الأولى التي توجّه بقية الخطوات؛ فتحديدها بدقة يحدد البيانات المطلوبة والفرضية المناسبة ويوفر الوقت والجهد.']]},
  {k:'5 · قِس',q:'طول مكتبك مستخدمًا المسطرة المترية، وعبّر عن ذلك بوحدة الأمتار والسنتمترات والملمترات.',a:[['مثال','إذا كان الطول 1.2 م فهو 120 سم = 1200 ملم (1 م = 100 سم = 1000 ملم).']]},
  {k:'6 · التفكير الناقد',q:'إذا لم تدعم البيانات التي جمعتها وسجلتها في أثناء التجربة فرضيتك، فهل يعني ذلك أن تجربتك فاشلة؟ وضّح إجابتك.',a:[['الإجابة','لا؛ فالنتائج تعطي معلومات جديدة، ويُحتفظ بها للاستفادة منها في مجال آخر، ويُعاد تكوين الفرضية واختبارها.']]}],'self',()=>G.complete('self'));},
 reset(){STN.self.s.reset();},explain:'<p>الأسئلة من العرض، والإجابات نموذجية مقترحة.</p>'});

def('x1',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'غرفة الهروب ومزاد المعرفة',goal:'افتحوا «ملف القضية» ثم زايدوا على صحة العبارات.',plan:5,icon:ICO.lock,
 body:'<div class="card"><div id="x1esc"></div></div><div class="card"><div class="nb-head"><h2>🔨 مزاد المعرفة</h2></div><div id="x1auc"></div></div>',
 init(){STN.x1.e=escape($('#x1esc'),{title:'ملف قضية الكوليرا',story:'أُغلق ملف قضية الكوليرا بأربعة أقفال. كل إجابة صحيحة تكشف رقمًا!',secs:300,
  locks:[{q:'أول خطوة في الطريقة العلمية:',o:['تحديد المشكلة','تحليل البيانات','استخلاص النتائج','وضع الفرضيات'],a:0,code:'1'},{q:'العامل الذي يتم تغييره في التجربة:',o:['المتغير المستقل','المتغير التابع','الثابت','العينة الضابطة'],a:0,code:'8'},{q:'مصدر وباء الكوليرا في استقصاء جون سنو:',o:['المضخة اليدوية في الشارع','الهواء','الطعام','الحيوانات'],a:0,code:'5'},{q:'وحدة قياس الكتلة في SI:',o:['كيلوجرام','لتر','متر','ثانية'],a:0,code:'4'}],outro:'أغلقتم القضية بنجاح!'},'x1');
  STN.x1.a=auction($('#x1auc'),[['البحث الوصفي يجيب عن الأسئلة من خلال الملاحظات.',true],['العينة الضابطة تتعرض لأثر المتغير المستقل.',false,'لا تتعرض له.'],['الفرضية توقع قابل للاختبار.',true],['النظريات العلمية ثابتة لا تتغير.',false,'قابلة للتغيير.'],['1 كم = 1000 م.',true],['تحليل البيانات يكون بعد استخلاص النتائج.',false,'قبل استخلاص النتائج.']],'x1');},
 reset(){STN.x1.e.reset();STN.x1.a.reset();}});
def('x2',{n:'إثرائي · من أنا؟',eyebrow:'إثرائي · ألغاز ولوحة خيارات',title:'من أنا؟ ولوحة الخيارات',goal:'خمّن المصطلح بأقل الأدلة، ثم اختر ثلاث مهام.',plan:4,icon:ICO.lens,
 body:'<div class="card"><div id="x2r"></div></div><div class="card"><h3>لوحة الخيارات</h3><div id="x2cb"></div></div>',
 init(){riddles($('#x2r'),[{clues:['أنا عامل في التجربة.','الباحث يغيّرني عمدًا.','في تجربة المضادات كنت «نوع المضاد».'],o:['المتغير المستقل','المتغير التابع','الثابت','العينة الضابطة'],a:0},{clues:['أنا عينة.','لا أتعرض للمتغير المستقل.','تُقارن نتائج الآخرين بي.'],o:['العينة الضابطة','العينة العشوائية','الفرضية','النموذج'],a:0},{clues:['أنا محاكاة لشيء أو حدث.','قد أكون ماديًّا أو حاسوبيًّا أو فكريًّا.','أوفر المال والجهد.'],o:['النموذج','القانون','الجدول','الفرضية'],a:0},{clues:['أنا طبيب بريطاني.','تتبعت مصدر وباء.','وجدت أن المضخة اليدوية مصدر التلوث.'],o:['جون سنو','نيوتن','أينشتاين','رذرفورد'],a:0}],'x2');
  STN.x2.cb=choiceBoard($('#x2cb'),[{ic:'🔬',t:'صمّم تجربة',kind:'تجربة',p:'صمّم تجربة لاختبار أثر الضوء في نمو النبات، وحدد المتغيرات والعينة الضابطة.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'1 لتر =',o:['1000 مل','100 مل','10 مل','1 مل'],a:0},{ic:'✍️',t:'اكتب',kind:'كتابة',p:'اكتب فرضية لسؤال: هل يذوب السكر أسرع في الماء الساخن؟'},
   {ic:'❓',t:'سؤال',kind:'اختيار',q:'نمو البكتيريا في تجربتنا:',o:['متغير تابع','متغير مستقل','ثابت','عينة ضابطة'],a:0},{ic:'📊',t:'مثّل',kind:'رسم',p:'مثّل بيانات أطوال 5 من زملائك برسم بياني بالأعمدة.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'لتكون النتائج أكثر دقة:',o:['نجري عدة محاولات','نجري محاولة واحدة','نغير كل العوامل','لا نسجل البيانات'],a:0},
   {ic:'🗺',t:'خريطة',kind:'تنظيم',p:'ارسم مخططًا لخطوات الطريقة العلمية الست.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'من طرق الموضوعية:',o:['استخدام عينات عشوائية','اختيار ما يوافق توقعك','تجاهل الأرقام','التخمين'],a:0},{ic:'📏',t:'قِس',kind:'قياس',p:'قِس طول غرفتك بالمتر، وحوّله إلى سنتمترات.'}],'x2',()=>G.complete('x2'));},
 reset(){STN.x2.cb.reset();}});

def('ch',{n:'تحدي العلماء',plan:3,icon:ICO.cup,eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من تقويم العرض.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'الطريقة العلمية',q:'أول خطوة من خطوات الطرائق العلمية هي:',o:['استخلاص النتائج','تحديد المشكلة','وضع الفرضيات','اختبار الفرضيات'],a:1},
  {k:'البحث الوصفي',q:'أي مما يلي ليس من خطوات البحث الوصفي:',o:['تحديد الهدف من البحث','وصف تصميم البحث','التحيز','الموضوعية'],a:2},
  {k:'الفرضية',q:'ماذا تفعل إذا كانت نتائج تجربتك لا تدعم فرضيتك؟',o:['تعيد التجربة','تستخلص النتائج','تحلل البيانات','تغير الفرضية'],a:3},
  {k:'المتغيرات',q:'العامل الذي يتم قياسه في التجربة:',o:['المتغير التابع','المتغير المستقل','الثابت','العينة الضابطة'],a:0},
  {k:'SI',q:'النظام المستخدم عالميًّا للقياس:',o:['النظام الدولي للوحدات SI','النظام الإنجليزي','نظام الأشبار','النظام القديم'],a:0},
  {k:'النماذج',t:'multi',q:'اختر فوائد النماذج:',items:[['توفير المال والجهد',1],['اختبار التوقعات والفرضيات',1],['التواصل',1],['إخفاء النتائج',0]]},
  {k:'العينة الضابطة',q:'فائدة العينة الضابطة:',o:['مقارنة نتائجها بنتائج العينات التي تعرضت للمتغير المستقل','زيادة عدد البكتيريا','تغيير الفرضية','قياس الحرارة'],a:0}],'ch');},
 reset(){STN.ch.c.reset();}});

C6.plan({intro:{s:['poe','brain'],g:'١ و٢',sk:'التنبؤ',ev:'سؤال التوقع'},goals:{s:['frayer'],g:'١ و٢',sk:'التذكر',ev:'المطابقة'},s1:{s:['prob','cards'],g:'١',sk:'التصنيف',ev:'وصفي أم تجريبي'},s2:{s:['story','tl'],g:'٢',sk:'الترتيب',ev:'خطوات البحث الوصفي'},
 lab1:{s:['inq','role'],g:'٢',sk:'الاستدلال',ev:'محقق الكوليرا'},s3:{s:['time','heads'],g:'١',sk:'الترتيب',ev:'خطوات الطريقة العلمية'},s4:{s:['jigsaw','cards'],g:'٢',sk:'التصنيف والتحويل',ev:'تصنيف النماذج'},s5:{s:['tps'],g:'١',sk:'الاستنتاج',ev:'شرائح البيانات'},
 ev1:{s:['spot','heads'],g:'١ و٢',sk:'التطبيق',ev:'تقويم 1–3'},s6:{s:['inq','coop'],g:'٢',sk:'الترتيب',ev:'كوّن فرضية'},s7:{s:['venn','sticks'],g:'٢',sk:'التمييز',ev:'تصنيف المتغيرات'},lab2:{s:['poe','inq'],g:'٢',sk:'ضبط المتغيرات',ev:'طبق البكتيريا'},lab3:{s:['inq','prob'],g:'٢',sk:'تحليل البيانات',ev:'المحاولات والمتوسط'},
 ev2:{s:['spot','cards'],g:'٢',sk:'التطبيق',ev:'تقويم 4–5'},sum:{s:['tl'],g:'١ و٢',sk:'التلخيص',ev:'إشارة المرور'},self:{s:['heads','sticks'],g:'١ و٢',sk:'التفكير الناقد',ev:'اختبر نفسك'},x1:{s:['game','champ'],g:'١ و٢',sk:'الاستدعاء',ev:'الهروب والمزاد'},x2:{s:['who','game'],g:'١ و٢',sk:'الاستنتاج',ev:'من أنا؟'},ch:{s:['exit'],g:'١ و٢',sk:'التقويم الختامي',ev:'تحدي العلماء'}},'g9c1l2');
K.boot({chapter:'الفصل الأول: طبيعة العلم',chapterShort:'الفصل الأول',title:'مختبر المحققين',lesson:'الدرس الثاني: عمل العلم',accent:'#1d4ed8',accentDark:'#60a5fa',hook:'كل مشكلة… لها طريقة علمية لحلها!',
 riddle:'ما الخطوات التي يتبعها العلماء لحل المشكلات؟',predict:{o:['يحددون المشكلة ويجمعون البيانات ويضعون فرضية ويختبرونها ثم يحللون ويستنتجون','يجربون أي شيء حتى ينجح','يسألون الناس فقط'],a:0},
 answer:'الطريقة العلمية خطوات متسلسلة: تحديد المشكلة، جمع البيانات، وضع الفرضيات، اختبار صحتها، تحليل البيانات، استخلاص النتائج. وقد يكون البحث وصفيًّا بالملاحظة أو تجريبيًّا باختبار الفرضية.',
 finalTitle:'مبارك! أصبحت محققًا علميًّا',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 37 · التسليم يوم الخميس.',
 concepts:[{n:'الطريقة العلمية',t:'خطوات متسلسلة تؤدي إلى حل المشكلات.',ic:'<path d="M6 40h10V28h10V16h10V6" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'البحث الوصفي',t:'يجيب من خلال الملاحظات.',ic:'<circle cx="20" cy="20" r="12" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'البحث التجريبي',t:'يختبر الفرضية بالتجربة.',ic:'<path d="M18 6v14L8 40h32L30 20V6" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'المتغيرات',t:'مستقل يُغيّر، وتابع يُقاس، وثوابت لا تتغير.',ic:'<rect x="8" y="10" width="10" height="28" fill="var(--accent)"/><rect x="28" y="20" width="10" height="18" fill="var(--amber)"/>'},{n:'العينة الضابطة',t:'لا تتعرض للمتغير المستقل، للمقارنة.',ic:'<circle cx="24" cy="24" r="14" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'SI',t:'النظام العالمي لوحدات القياس.',ic:'<text x="24" y="32" text-anchor="middle" font-size="18" font-weight="800" fill="var(--accent)">SI</text>'}]});
$$('.top h1').forEach(h=>h.dataset.sym='🧪');
})();

