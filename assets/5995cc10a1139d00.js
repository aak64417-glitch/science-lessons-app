
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

/* ===== تجارب افتراضية إضافية — الخواص والتغيرات الكيميائية ===== */
(function(){
const {$,$$,G,STN,def,mcq,say,SFX,css}=K;
const EVN=[['gas','💨 تصاعد غاز'],['sound','🔊 صوت'],['heat','✨ حرارة أو ضوء'],['color','🎨 تغير اللون'],['bub','🫧 فقاعات'],['smell','👃 تغير الرائحة']];

/* ---------- reactions bench ---------- */
const RX=[
 {id:'mg',n:'شريط مغنيسيوم + لهب',ev:['heat','color'],note:'يشتعل المغنيسيوم بضوء أبيض ساطع، ويتحول الشريط الفضي إلى مسحوق أبيض.'},
 {id:'fz',n:'قرص فوار + ماء',ev:['gas','bub'],note:'تخرج فقاعات غاز من القرص حتى يختفي.'},
 {id:'ap',n:'شريحة تفاح + هواء',ev:['color'],note:'يتحول لون التفاح إلى البني بتفاعله مع الأكسجين.'},
 {id:'wd',n:'خشب + لهب',ev:['heat','gas','smell'],note:'ينتج لهب وحرارة ودخان ورائحة احتراق، ويتبقى رماد.'},
 {id:'eg',n:'بيضة + حرارة',ev:['color','smell'],note:'يتحول بياض البيض من شفاف إلى أبيض، وتتغير رائحته.'}];
function scene(id,u,t){let s=`<rect width="600" height="320" fill="var(--wall)"/><rect y="270" width="600" height="50" fill="var(--bench-top)"/>`;
 const flame=(x,y,k)=>`<path d="M${x} ${y} q${-14*k} ${-22*k} 0 ${-50*k} q${14*k} ${28*k} 0 ${50*k}z" fill="#ff9f1c"/><path d="M${x} ${y} q${-7*k} ${-12*k} 0 ${-28*k} q${7*k} ${14*k} 0 ${28*k}z" fill="#ffe066"/>`;
 if(id==='mg'){const burnt=u>.55;s+=`<rect x="200" y="230" width="200" height="40" fill="#5b6870"/>${flame(300,232,1)}<path d="M240 ${150} L360 ${120}" stroke="${burnt?'#f4f4f4':'#c9d2d8'}" stroke-width="10" stroke-linecap="round"/>`;
  if(u>.2&&u<.95){const r=40+60*Math.sin(t*20)**2;s+=`<circle cx="330" cy="128" r="${r}" fill="rgba(255,255,255,.85)"/><circle cx="330" cy="128" r="${r*1.8}" fill="rgba(255,255,240,.35)"/>`;}
  s+=`<rect x="226" y="140" width="20" height="14" fill="#555"/>`;}
 if(id==='fz'){s+=`<path d="M220 90 L230 268 L370 268 L380 90" fill="var(--glass)" stroke="var(--glass-edge)" stroke-width="3"/><rect x="226" y="130" width="148" height="136" fill="var(--water)" opacity=".5"/>`;
  const sz=Math.max(0,1-u);if(sz>0)s+=`<rect x="${290-20*sz}" y="${262-10*sz}" width="${40*sz}" height="${10*sz}" fill="#fff" stroke="#aaa"/>`;
  if(u>0&&u<1)for(let k=0;k<26;k++){const x=245+((k*37)%110),y=262-((k*29+t*160)%130);s+=`<circle cx="${x}" cy="${y}" r="${3+k%3}" fill="#fff" opacity=".85"/>`;}
  if(u>0&&u<1)for(let k=0;k<5;k++)s+=`<circle cx="${270+k*15}" cy="${110-((k*17+t*60)%60)}" r="5" fill="#d8e1e5" opacity=".7"/>`;}
 if(id==='ap'){const br=Math.min(1,u*1.2);const col=`rgb(${Math.round(250-90*br)},${Math.round(240-130*br)},${Math.round(200-150*br)})`;
  s+=`<ellipse cx="300" cy="200" rx="110" ry="70" fill="#d62828"/><ellipse cx="300" cy="196" rx="96" ry="58" fill="${col}"/><path d="M290 180 q10 -10 20 0 q-10 10 -20 0z" fill="#6b3e1e"/><text x="300" y="60" text-anchor="middle" font-family="Share Tech Mono" font-size="20" fill="var(--ink)">${Math.round(u*60)} min</text>`;}
 if(id==='wd'){const ash=u>.9;s+=ash?`<ellipse cx="300" cy="262" rx="80" ry="12" fill="#9aa"/>`:`<rect x="230" y="238" width="140" height="22" rx="10" fill="#8f6230" transform="rotate(-8 300 249)"/><rect x="230" y="240" width="140" height="22" rx="10" fill="#a8743c" transform="rotate(10 300 251)"/>`;
  if(u>0&&u<.95){s+=flame(300,236,1.6)+flame(270,240,1.1)+flame(330,240,1.2);for(let k=0;k<6;k++){const y=150-((k*25+t*50)%120);s+=`<circle cx="${290+Math.sin(t*3+k)*20}" cy="${y}" r="${12+k}" fill="#7d878c" opacity=".35"/>`;}}}
 if(id==='eg'){s+=`<ellipse cx="300" cy="230" rx="150" ry="26" fill="#2b2f33"/><rect x="440" y="222" width="120" height="14" rx="6" fill="#2b2f33"/>`;const w=Math.min(1,u*1.3);
  s+=`<ellipse cx="300" cy="222" rx="90" ry="18" fill="rgba(255,255,255,${.25+.75*w})" stroke="rgba(200,200,200,${.3+.5*w})"/><circle cx="300" cy="216" r="22" fill="#ffb703"/>`;
  if(u>0&&u<1)for(let k=0;k<3;k++)s+=`<path d="M${270+k*30} 190 q-8 -15 0 -30 q8 -15 0 -30" stroke="#bbb" stroke-width="3" fill="none" opacity=".6"/>`;}
 return s;}
def('lab4',{after:'s2',n:'🧪 مختبر التفاعلات',eyebrow:'تجربة افتراضية',title:'مختبر التفاعلات: شغّل التفاعل وسجّل الأدلة',goal:'اختر تفاعلًا، واضغط «ابدأ»، وراقب جيدًا. ثم حدّد كل دليل على حدوث التغير الكيميائي لاحظته.',plan:7,core:1,
 icon:'<path d="M30 6h20M34 6v22L16 64a6 6 0 0 0 6 8h36a6 6 0 0 0 6-8L46 28V6" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="34" cy="54" r="4" fill="currentColor"/><circle cx="46" cy="60" r="3" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l4svg" viewBox="0 0 600 320" aria-label="منضدة التفاعلات"></svg>
   <div class="sim-bar"><span class="seg" id="l4s">${RX.map((r,i)=>`<button type="button" data-i="${i}" class="${i?'':'on'}">${r.n}</button>`).join('')}</span></div>
   <div class="sim-bar"><button class="btn" type="button" id="l4go">ابدأ التفاعل ▶</button><button class="tbtn" type="button" id="l4r">أعِد</button></div></div>
  <div class="side"><div class="card"><h3>الأدلة التي لاحظتها</h3><div class="chips-row" id="l4ev">${EVN.map(e=>`<button type="button" class="chip" data-e="${e[0]}" aria-pressed="false">${e[1]}</button>`).join('')}</div><div class="row-actions"><button class="btn" type="button" id="l4chk">تحقق</button></div><div id="l4fb"></div></div>
   <div class="card"><div class="nb-head"><h2>سجل التفاعلات</h2><span id="l4n">0 / ${RX.length}</span></div><ul class="tasks" id="l4log"></ul></div></div></div>`,
 init(){let ri=0,u=0,run=false,tries=0,done={};const svg=$('#l4svg');let t=0;
  const pick=new Set();
  function draw(){svg.innerHTML=scene(RX[ri].id,u,t);}
  function log(){$('#l4log').innerHTML=RX.map((r,i)=>`<li class="${done[i]?'ok':''}">${r.n}${done[i]?' — '+r.ev.map(e=>EVN.find(x=>x[0]===e)[1]).join('، '):''}</li>`).join('');$('#l4n').textContent=Object.keys(done).length+' / '+RX.length;if(Object.keys(done).length===RX.length)G.complete('lab4');}
  function reset(){u=0;run=false;tries=0;pick.clear();$$('#l4ev .chip').forEach(c=>{c.setAttribute('aria-pressed','false');c.classList.remove('sel','ok','bad');});$('#l4fb').innerHTML='';draw();}
  $('#l4s').onclick=e=>{const b=e.target.closest('[data-i]');if(!b||run)return;ri=+b.dataset.i;$$('#l4s button').forEach(x=>x.classList.toggle('on',x===b));G.tick();reset();};
  $$('#l4ev .chip').forEach(c=>c.onclick=()=>{const k=c.dataset.e;pick.has(k)?pick.delete(k):pick.add(k);c.classList.toggle('sel',pick.has(k));c.setAttribute('aria-pressed',pick.has(k));G.tick();});
  $('#l4go').onclick=()=>{if(run)return;if(u>=1)reset();run=true;SFX.whoosh();let last=performance.now();const step=now=>{const dt=(now-last)/1000;last=now;if(!G.paused&&G.cur==='lab4'){u=Math.min(1,u+dt/4);t+=dt;}draw();if(u<1)requestAnimationFrame(step);else{run=false;}};requestAnimationFrame(step);};
  $('#l4r').onclick=reset;
  $('#l4chk').onclick=()=>{if(u<.3){say($('#l4fb'),'info','شغّل التفاعل وراقبه أولًا.');return;}const want=new Set(RX[ri].ev);const ok=want.size===pick.size&&[...want].every(k=>pick.has(k));
   if(ok){if(!done[ri]){done[ri]=1;G.good();G.add(tries?4:8,'lab4');}say($('#l4fb'),'ok','أحسنت! '+RX[ri].note+' تكوّنت مواد جديدة: تغير كيميائي.');log();}
   else{tries++;G.bad();if(tries>=2){$$('#l4ev .chip').forEach(c=>c.classList.add(want.has(c.dataset.e)?'ok':'bad'));say($('#l4fb'),'bad','الأدلة الصحيحة باللون الأخضر. '+RX[ri].note);done[ri]=1;log();}else say($('#l4fb'),'bad','راقب التفاعل مرة أخرى؛ هناك دليل ناقص أو زائد.');}};
  reset();log();this.reset=()=>{done={};reset();log();};},
 explain:'<p>دلائل التغير الكيميائي: تصاعد غاز، وحدوث صوت، وإنتاج حرارة أو ضوء، وتغير اللون، وخروج فقاعات، وتغير الرائحة. في المختبر: المغنيسيوم يشتعل بضوء ساطع، والقرص الفوار يُخرج فقاعات غاز، والتفاح يتحول إلى اللون البني، والخشب يحترق، والبيضة يتغير لونها عند قليها.</p>'});

/* ---------- candle: melt vs burn ---------- */
def('lab5',{after:'s3',n:'🧪 الشمعة',eyebrow:'تجربة افتراضية',title:'تجربة الشمعة: انصهار أم احتراق؟',goal:'للشمعة تغيران مختلفان! سخّن الشمعة من أسفلها، أو أشعل فتيلها، وراقب الميزان والنواتج.',plan:5,core:1,
 icon:'<rect x="30" y="30" width="20" height="42" rx="3" fill="currentColor"/><path d="M40 28c-6-8 0-16 0-22 0 6 6 14 0 22z" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l5svg" viewBox="0 0 600 340" aria-label="شمعة على ميزان"></svg>
   <div class="sim-bar"><button class="btn" type="button" data-m="melt">🔥 سخّن الشمعة من أسفل</button><button class="btn" type="button" data-m="burn">🕯 أشعل الفتيل</button><button class="tbtn" type="button" id="l5r">أعِد</button></div><p class="hint-line">قيم افتراضية للتوضيح.</p></div>
  <div class="side"><div class="card"><h3>ماذا لاحظت؟</h3><div id="l5q1"></div></div><div class="card"><div id="l5q2"></div></div></div></div>`,
 init(){let mode=null,u=0,run=false,t=0,seen={};const svg=$('#l5svg');const M0=40.0;
  function draw(){const melt=mode==='melt',burn=mode==='burn';const h=burn?120*(1-.55*u):120,mass=burn?M0-14*u:M0;
   let s=`<rect width="600" height="340" fill="var(--wall)"/><rect y="300" width="600" height="40" fill="var(--bench-top)"/><polygon points="190,300 204,262 396,262 410,300" fill="var(--metal-dark)"/><rect x="186" y="252" width="228" height="12" rx="5" fill="var(--metal)"/><rect x="240" y="270" width="120" height="26" rx="5" fill="var(--lcd)"/><text x="352" y="290" text-anchor="end" font-family="Share Tech Mono" font-size="20" fill="var(--lcdink)">${mass.toFixed(1)} g</text>`;
   s+=`<ellipse cx="300" cy="250" rx="70" ry="8" fill="#ccd"/>`;
   if(melt&&u>.15){const pool=Math.min(1,u);s+=`<ellipse cx="300" cy="246" rx="${30+40*pool}" ry="${5+3*pool}" fill="#f7f1d6" stroke="#e2d9b0"/>`;}
   const top=250-h*(melt?(1-.75*u):1);if(!(melt&&u>.98))s+=`<path d="M276 250 L276 ${top+6} Q276 ${top} 282 ${top} L318 ${top} Q324 ${top} 324 ${top+6} L324 250z" fill="#fbf6e6" stroke="#e2d9b0" stroke-width="2"/>`;
   s+=`<path d="M300 ${top} v-14" stroke="#333" stroke-width="3"/>`;
   if(burn&&run){s+=`<path d="M300 ${top-12} q-12 -20 0 -44 q12 24 0 44z" fill="#ff9f1c"/><path d="M300 ${top-12} q-6 -12 0 -24 q6 12 0 24z" fill="#ffe066"/>`;for(let k=0;k<4;k++){const y=top-60-((k*22+t*40)%90);s+=`<circle cx="${300+Math.sin(t*2+k)*10}" cy="${y}" r="${6+k*2}" fill="#9aa" opacity=".35"/>`;}
    s+=`<text x="430" y="${top-60}" font-family="IBM Plex Sans Arabic" font-size="14" font-weight="700" fill="var(--muted)">غازات وبخار ماء ⬆</text>`;}
   if(melt&&run)s+=`<rect x="250" y="236" width="100" height="8" fill="#ff7b39" opacity=".7"/>`;
   s+=`<text x="300" y="34" text-anchor="middle" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="20" fill="var(--ink)">${melt?'الشمع ينصهر':burn?'الشمعة تحترق':'شمعة على ميزان'}</text>`;svg.innerHTML=s;}
  $$('#st-lab5 [data-m]').forEach(b=>b.onclick=()=>{if(run)return;mode=b.dataset.m;u=0;run=true;SFX.whoosh();let last=performance.now();const step=now=>{const dt=(now-last)/1000;last=now;if(!G.paused&&G.cur==='lab5'){u=Math.min(1,u+dt/5);t+=dt;}draw();if(u<1)requestAnimationFrame(step);else{run=false;seen[mode]=1;draw();chk();}};requestAnimationFrame(step);});
  $('#l5r').onclick=()=>{if(run)return;mode=null;u=0;draw();};draw();let q1=false,q2=false;const chk=()=>{if(seen.melt&&seen.burn&&q1&&q2)G.complete('lab5');};
  mcq($('#l5q1'),{q:'عند تسخين الشمعة من أسفلها انصهر الشمع وبقيت الكتلة ثابتة. هذا تغير:',o:['فيزيائي؛ فالشمع ما زال شمعًا ويمكن أن يتجمد من جديد','كيميائي؛ لأن الشمع أصبح سائلًا'],a:0},'lab5',()=>{q1=true;chk();});
  mcq($('#l5q2'),{q:'عند إشعال الفتيل نقصت قراءة الميزان. لماذا؟',o:['لأن الكتلة فنيت','لأن الشمع احترق وتكونت غازات وبخار ماء تصاعدت في الهواء: تغير كيميائي','لأن الشمعة انصهرت فقط','لأن الميزان معطل'],a:1,why:'الكتلة لم تفنَ (قانون حفظ الكتلة)؛ لكن النواتج الغازية خرجت من الميزان.'},'lab5',()=>{q2=true;chk();});
  this.reset=()=>{seen={};q1=q2=false;mode=null;u=0;draw();};},
 explain:'<p>انصهار الشمع تغير فيزيائي: تتغير الحالة وتبقى المادة شمعًا والكتلة ثابتة. أما احتراق الشمعة فتغير كيميائي: يتفاعل الشمع مع الأكسجين فتنتج حرارة وضوء وغازات وبخار ماء، فتنقص قراءة الميزان لأن النواتج الغازية تتصاعد في الهواء.</p>'});

/* ---------- iron + oxygen (rust time-lapse) ---------- */
def('lab6',{after:'lab5',n:'🧪 صدأ الحديد',eyebrow:'تجربة افتراضية',title:'تجربة صدأ الحديد: تفاعل الحديد مع الأكسجين',goal:'ثلاثة مسامير في ثلاثة أنابيب. حرّك منزلق الأيام وراقب: في أي أنبوب يصدأ المسمار؟',plan:4,core:1,
 icon:'<rect x="34" y="8" width="12" height="56" fill="currentColor"/><path d="M34 64l6 12 6-12z" fill="currentColor"/><rect x="24" y="4" width="32" height="8" rx="2" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l6svg" viewBox="0 0 600 330" aria-label="ثلاثة أنابيب فيها مسامير"></svg>
   <div class="ctrl"><label>الزمن: <b id="l6d">0</b> يوم</label><input type="range" id="l6r" min="0" max="7" value="0"></div></div>
  <div class="side"><div class="card"><h3>فسّر النتيجة</h3><div id="l6q"></div></div></div></div>`,
 init(){const svg=$('#l6svg');const T=[{n:'هواء جاف',air:1,water:0},{n:'ماء بلا هواء (مغطى بالزيت)',air:0,water:1},{n:'ماء وهواء',air:1,water:1}];
  function draw(d){let s=`<rect width="600" height="330" fill="var(--wall)"/><rect y="290" width="600" height="40" fill="var(--bench-top)"/>`;
   T.forEach((tb,i)=>{const x=110+i*190,rust=tb.air&&tb.water?d/7:0;
    s+=`<rect x="${x-34}" y="60" width="68" height="226" rx="10" fill="var(--glass)" stroke="var(--glass-edge)" stroke-width="3"/>`;
    if(tb.water)s+=`<rect x="${x-31}" y="${tb.air?150:120}" width="62" height="${tb.air?132:162}" fill="var(--water)" opacity=".5"/>`;
    if(!tb.air&&tb.water)s+=`<rect x="${x-31}" y="104" width="62" height="16" fill="#f2c94c" opacity=".8"/>`;
    if(!tb.water)s+=`<g fill="#fff" stroke="#ccc">${[0,1,2].map(k=>`<rect x="${x-24+k*16}" y="262" width="12" height="12"/>`).join('')}</g>`;
    if(!tb.air)s+=`<rect x="${x-36}" y="52" width="72" height="12" fill="#5b6870"/>`;
    const c=`rgb(${Math.round(140+60*rust)},${Math.round(148-60*rust)},${Math.round(155-120*rust)})`;
    s+=`<rect x="${x-5}" y="96" width="10" height="160" fill="${c}"/><rect x="${x-14}" y="88" width="28" height="10" rx="2" fill="${c}"/><path d="M${x-5} 256 l5 16 l5 -16z" fill="${c}"/>`;
    if(rust>.3)for(let k=0;k<Math.round(rust*8);k++)s+=`<circle cx="${x-4+(k%2)*8}" cy="${150+k*14}" r="3" fill="#8b3a12"/>`;
    s+=`<text x="${x}" y="314" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-size="13" font-weight="700" fill="#fff">${tb.n}</text>`;});
   svg.innerHTML=s;}
  const r=$('#l6r');r.oninput=()=>{$('#l6d').textContent=r.value;draw(+r.value);if(+r.value===7&&!STN.lab6.saw){STN.lab6.saw=true;SFX.pop();chk();}};draw(0);
  let q=false;const chk=()=>{if(STN.lab6.saw&&q)G.complete('lab6');};
  mcq($('#l6q'),{q:'صدئ المسمار في الأنبوب الثالث فقط. ماذا نستنتج؟',o:['يصدأ الحديد بتفاعله مع الأكسجين بوجود الماء، وينتج الصدأ وهو مادة جديدة','يصدأ الحديد في الهواء الجاف فقط','الصدأ تغير فيزيائي','الماء وحده يكفي لصدأ الحديد'],a:0},'lab6',()=>{q=true;chk();});
  this.reset=()=>{STN.lab6.saw=false;q=false;r.value=0;$('#l6d').textContent=0;draw(0);};},
 explain:'<p>صدأ الحديد تغير كيميائي ينتج عن تفاعل الحديد مع الأكسجين، ويحتاج إلى وجود الماء (الرطوبة). الصدأ مادة جديدة تختلف في لونها وخواصها عن الحديد.</p>'});
})();

/*@include lab6.js*/
/*@include skit.js*/
/* ===== الفصل الثالث · الدرس الثاني: الخواص والتغيرات الكيميائية — «مختبر التحوّلات» ===== */
(function(){
const {$,$$,G,STN,def,mcq,calcQ,levels,flips,match,sortGame,tfRound,challenge,vcard,ayah,say,num,fmt,parseNum,SFX,css,pic,slides,beforeAfter,safety,anticip,story,bingo,choiceBoard,solutions,puzzle}=K;
const P=(n,c)=>[n,c];
const fig=(n,c)=>`<div style="position:relative;height:100%;min-height:240px">${pic(n,c||'')}</div>`;

K.idTable=function(el){const R=[['جذع خشبي','اللون البني، صلب، له كتلة وحجم وكثافة','قابل للاشتعال (يحترق فينتج رمادًا وغازات)'],['عجينة كعك بالمكسرات','لينة، لها لون ورائحة، تحتوي على قطع مكسرات','تتغير عند خبزها بالحرارة فتنتج فقاعات غاز وتتغير رائحتها ولونها'],['كتاب','صلب، مستطيل الشكل، له كتلة ولون','قابل للاشتعال'],['كأس به عصير','سائل، له لون وطعم، يأخذ شكل الكأس','قد يتخمر أو يفسد بمرور الوقت (يتغير طعمه ورائحته)']];
 el.innerHTML='<div class="tablewrap"><table class="data"><thead><tr><th>المادة</th><th>الخواص الفيزيائية</th><th>الخواص الكيميائية</th></tr></thead><tbody>'+R.map((r,i)=>'<tr><td><b>'+r[0]+'</b></td><td><button class="tbtn" type="button" data-c="'+i+'1">اقترح ثم اكشف</button><span hidden>'+r[1]+'</span></td><td><button class="tbtn" type="button" data-c="'+i+'2">اقترح ثم اكشف</button><span hidden>'+r[2]+'</span></td></tr>').join('')+'</tbody></table></div><p class="step-text muted" style="font-size:.9rem">الإجابات المقترحة نموذجية؛ تُقبل إجابات الطلاب الصحيحة الأخرى. (الجدول في العرض فارغ ليكمله الطالب.)</p>';
 el.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{b.hidden=true;b.nextElementSibling.hidden=false;G.tick();});};
/* ================= INTRO ================= */
def('intro',{n:'الافتتاحية',plan:3,icon:'<path d="M40 8c10 14 18 22 18 36a18 18 0 0 1-36 0c0-10 6-16 10-22 2 8 8 10 8 10z" fill="currentColor"/>',
 body:`<div class="hero"><div class="stage" id="hkBA"></div>
  <div><span class="eyebrow">مختبر التحوّلات</span><h2 class="hero-h">أين ذهب الخشب؟</h2>
   <p class="riddle">عندما نحرق قطعًا من الخشب لا يتبقى منها إلا كومة صغيرة من الرماد. فأين ذهب الخشب؟ وما الخاصية الموجودة في الخشب التي سببت هذا التغير؟</p>
   <p class="q">توقّع قبل أن تبدأ:</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="two"><div class="story"><b>اسحب الشريط فوق الصورة</b> لترى الخشب قبل الاحتراق وبعده. في الدرس السابق تعرّفنا التغيرات التي تبقى فيها المادة كما هي؛ واليوم نكتشف تغيرات تُنتج <b>مواد جديدة</b>.</div><div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div></div>`,
 init(){beforeAfter($('#hkBA'),{a:pic('s52_02dd5b01','خشب يحترق'),b:pic('s52_1f89136e','رماد'),la:'قبل',lb:'بعد',ratio:'4/3'});}
});

/* ================= GOALS ================= */
const GOALS=['تتعرف بعض الخواص الكيميائية للمواد.','تحدد التغيرات الكيميائية.','تصنف المادة تبعًا لخواصها الكيميائية.','توضح قانون حفظ الكتلة.'];
const TERMS=[
 {t:'الخاصية الكيميائية',d:'الخاصية التي تشير إلى ميل المادة لحدوث تغير في تركيبها الأصلي بفعل تفاعل كيميائي مما ينتج مواد جديدة.'},
 {t:'التغير الكيميائي',d:'التغير الذي يحدث في تركيب المادة بسبب خواصها الكيميائية، وتنتج عنه مادة أو مواد جديدة.'},
 {t:'قانون حفظ الكتلة',d:'مجموع كتل المواد الناتجة عن التفاعل الكيميائي يساوي دائمًا مجموع كتل المواد الأصلية (المتفاعلة).'},
 {t:'الحرارة',d:'صورة من صور الطاقة تنتقل من الجسم الساخن إلى الجسم البارد عند تلامسهما معًا.'},
 {t:'قابلية الاشتعال',d:'خاصية كيميائية للمواد التي تحترق، مثل الخشب؛ وهناك مواد غير قابلة للاشتعال كالحجارة.'}];
def('goals',{n:'الأهداف والمصطلحات',eyebrow:'قبل أن ندخل المختبر',title:'الأهداف والمصطلحات',goal:'تعرّف أهداف الدرس وأهميته، ثم تعرّف المفردات الجديدة.',plan:4,
 icon:'<rect x="12" y="8" width="56" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 26h32M24 40h32M24 54h20" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
 body:`<div class="two"><div class="card"><h3>الفكرة العامة</h3><p class="lead"><b>للمادة خواص كيميائية، والتغير الكيميائي للمادة يغير ماهيتها.</b></p><h3 class="mt">أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol>
   <div class="story mt"><b>الأهمية:</b> تساعد معرفة الخواص الكيميائية على تحديد الفروق بين المواد والتمييز بينها.</div></div>
  <div class="side"><div class="card"><h3>مراجعة المفردات</h3><p class="step-text"><b>الحرارة:</b> صورة من صور الطاقة تنتقل من الجسم الساخن إلى الجسم البارد عند تلامسهما معًا.</p><h3 class="mt">المفردات الجديدة</h3><ul class="tasks plain"><li>الخاصية الكيميائية</li><li>التغير الكيميائي</li><li>قانون حفظ الكتلة</li></ul></div>
   ${vcard('islam','نار من الشجر الأخضر',`${ayah('الَّذِي جَعَلَ لَكُم مِّنَ الشَّجَرِ الْأَخْضَرِ نَارًا فَإِذَا أَنتُم مِّنْهُ تُوقِدُونَ','يس: 80')}<p class="mt">الخشب الذي كان شجرًا أخضر يحترق فيعطينا النار والدفء؛ وهذا تغير كيميائي من آيات الله في الكون.</p>`)}</div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المصطلحات</h2><span>المس البطاقة</span></div><div id="g6flips"></div></div>
  <div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2><span>اختر المصطلح ثم تعريفه</span></div><div id="g6match"></div></div>`,
 init(){flips($('#g6flips'),TERMS);this.reset();},
 reset(){match($('#g6match'),TERMS.map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));},
 explain:'<p>الأهداف والأهمية ومراجعة المفردات من عرض الدرس الثاني.</p>'});

/* ================= S1: chemical property ================= */
def('s1',{n:'1 · الخاصية الكيميائية',eyebrow:'المحطة 1 · قابلية التغير',title:'قابلية التغير: الخاصية الكيميائية',goal:'جميع الخواص التي درستها سابقًا خواص فيزيائية. فما الخواص التي تشير إلى حدوث تغير في تركيب المادة؟',plan:6,core:1,
 icon:'<circle cx="40" cy="40" r="26" fill="none" stroke="currentColor" stroke-width="6"/><path d="M28 40h24M40 28v24" stroke="currentColor" stroke-width="6"/>',
 body:`<div class="card" id="s1sl"></div>
  <div class="two"><div class="card"><h3>إلى ماذا تشير الخاصية الكيميائية؟</h3><div id="s1q"></div></div>
   <div class="card"><h3>قابل للاشتعال أم غير قابل؟</h3><div id="s1sort"></div></div></div>
  ${vcard('safety','تحذيرات على العبوات',`<div class="two"><div><p>يوضع على بعض المواد تحذيرات لحفظها بعيدة عن الحرارة واللهب؛ بسبب قابليتها للاشتعال. تعرّف هذه الرموز، والتزم بتعليمات <b>الدفاع المدني</b> في بيتك ومدرستك.</p></div><div style="display:flex;gap:10px;justify-content:center">${pic('s56_4a116e65','رمز مادة قابلة للاشتعال','auc-im')}${pic('s56_609a26cf','رمز ممنوع اللهب','auc-im')}</div></div>`)}`,
 init(){let a=false,b=false;const chk=()=>{if(a&&b)G.complete('s1');};
  slides($('#s1sl'),[
   {k:'قابلية التغير',t:'صف ماذا يحدث للخشب بعد احتراقه؟',im:[P('s51_26ed4c44','خشب يحترق'),P('s52_1f89136e','رماد')],html:'<p>جميع الخواص التي درستها واستخدمتها في التصنيف في الدرس السابق هي خواص فيزيائية يمكن ملاحظتها بسهولة. وعندما كانت هذه الخواص تتغير، فإن تركيب المادة الأصلي بقي ثابتًا.</p><p>ومن الواضح أن ما حدث في حالة احتراق الخشب شيء مختلف؛ فبعض الخواص تشير إلى حدوث تغير في التركيب الأصلي للمادة.</p>'},
   {k:'تعريف',t:'الخاصية الكيميائية',im:[P('s54_f369ba7a','تفاحة طازجة وأخرى متغيرة')],html:'<p class="def">الخاصية الكيميائية: هي الخاصية التي تشير إلى ميل المادة لحدوث تغير في تركيبها الأصلي بفعل تفاعل كيميائي مما ينتج مواد جديدة.</p><p>نلاحظ حدوث تغير في تركيب المادة، وكذلك إنتاج مواد جديدة؛ وهذا ما يدلنا على حدوث <b>تغير كيميائي</b>.</p>'},
   {k:'أمثلة',t:'أمثلة توضح بعض الخواص الكيميائية',im:[P('s55_f468d375','اشتعال المغنيسيوم، تفاعل قرص فوار مع الماء، تفاعل الحديد مع الأكسجين')],html:'<p><b>اشتعال المغنيسيوم</b>.</p><p><b>تفاعل قرص الفوار مع الماء</b>.</p><p><b>تفاعل الحديد مع الأكسجين</b> (الصدأ).</p>'},
   {k:'خواص كيميائية شائعة',t:'قابلية الاشتعال أو الاحتراق',im:[P('s56_a89b8516','خشب: قابل للاشتعال'),P('s56_649a1d14','حجر: غير قابل للاشتعال')],html:'<p>ليس شرطًا أن تكون في المختبر لتشاهد التغيرات التي تحدث بسبب الخواص الكيميائية. <b>التغير الكيميائي</b> هو التغير الذي يحدث في تركيب المادة بسبب خواصها الكيميائية وتنتج عنه مادة أو مواد جديدة.</p><p>فالنار المشتعلة في الخشب تُنتج تغيرات كيميائية: يتفاعل الأكسجين الموجود في الهواء مع الخشب فيحترق منتجًا مادة جديدة تُسمّى رمادًا. والخشب مادة قابلة للاحتراق؛ لذا تُسمّى هذه الخاصية <b>قابلية الاشتعال أو الاحتراق</b>.</p>'}],'s1');
  mcq($('#s1q'),{q:'إلى ماذا تشير الخاصية الكيميائية؟',fig:`<div class="center">${pic('s54_c69d1f5a','','auc-im')}</div>`,o:['إلى لون المادة وشكلها','إلى حدوث تغير في تركيب المادة الأصلية وإنتاج مواد جديدة','إلى كتلة المادة وحجمها','إلى حالة المادة فقط'],a:1},'s1',()=>{a=true;chk();});
  sortGame($('#s1sort'),{bins:['قابل للاشتعال','غير قابل للاشتعال'],items:[['🪵 الخشب',0],['🪨 الحجارة',1],['🛍 كيس ورقي',0],['👕 قميص قماشي',0],['🛋 كنبة',0],['🧴 بخاخ مبيد حشري',0]],hint:'هل يحترق إذا اقترب من اللهب؟',done:'لهذا توضع على بعض المواد تحذيرات لحفظها بعيدًا عن الحرارة واللهب.'},'s1',()=>{b=true;chk();});},
 quiz:[{q:'هي الخاصية التي تشير إلى ميل المادة لحدوث تغير في تركيبها الأصلي بفعل تفاعل كيميائي مما ينتج مواد جديدة:',o:['الخاصية الفيزيائية','التغير الحيوي','التغير الكيميائي','الخاصية الكيميائية'],a:3},{q:'أي الخواص التالية تعد خاصية كيميائية؟',o:['الاشتعال','الحجم','الكثافة','الكتلة'],a:0}],
 explain:'<p><b>الخاصية الكيميائية</b> تشير إلى ميل المادة لحدوث تغير في تركيبها الأصلي بفعل تفاعل كيميائي ينتج مواد جديدة. ومن الخواص الكيميائية الشائعة <b>قابلية الاشتعال أو الاحتراق</b>: فالخشب قابل للاشتعال، والحجارة غير قابلة للاشتعال.</p>'});

/* ================= تقييم: سؤال مراجعة ================= */
def('ev1',{n:"تقويم ١",eyebrow:"تقييم · السؤال ١",title:"تقييم: سؤال مراجعة",goal:"السؤال ١ كما في العرض (والسؤال ٢ في المحطة السابقة).",plan:4,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:`<div class="card" id="ev1Box"></div>`,
 init(){const P=[{"no": "س١", "q": "هي درجة الحرارة التي تتحول عندها المادة من الحالة الصلبة إلى السائلة:", "o": ["درجة التجمد", "درجة الغليان", "درجة الانصهار", "الدرجة المثالية"], "a": 2, "why": "سؤال مراجعة من الدرس الأول."}];const box=$('#ev1Box');const solved=P.map(()=>false);box.innerHTML='<div class="prob-list"></div>';const L=box.querySelector('.prob-list');
  P.forEach((q,i)=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+(q.no||i+1)+'</span><span>'+(q.tag||'تقييم')+'</span></div>';const inner=document.createElement('div');d.appendChild(inner);L.appendChild(d);
   const fin=()=>{solved[i]=true;d.classList.add('solved');if(solved.every(Boolean))G.complete('ev1');};if(q.o)mcq(inner,q,'ev1',fin);else calcQ(inner,q,'ev1',fin);});},
 reset(){STN['ev1'].init();},
 explain:"<p>أسئلة تقييم العرض في موضعها من الدرس وبالترتيب نفسه.</p>"});
/* ================= S2: evidence of chemical change ================= */
const EV=[{n:'تصاعد غاز',im:'s57_23d6c3c8',ic:'💨'},{n:'حدوث صوت',im:'s58_df466017',ic:'🔊'},{n:'إنتاج حرارة أو ضوء',im:'s59_7dd3ef03',ic:'✨'},{n:'تغير اللون',im:'s60_611e7027',ic:'🎨'},{n:'خروج فقاعات',im:'s61_ae463b91',ic:'🫧'},{n:'التغير في الرائحة',im:'s62_a96b5f34',ic:'👃'}];
def('s2',{n:'2 · دلائل التغير الكيميائي',eyebrow:'المحطة 2 · وحدة التحقيق',title:'المحقق الكيميائي: دلائل حدوث التغير الكيميائي',goal:'شاهد كل مقطع، وابحث عن الدليل. كيف نعرف أن تغيرًا كيميائيًّا قد حدث؟',plan:7,core:1,
 icon:'<circle cx="34" cy="34" r="20" fill="none" stroke="currentColor" stroke-width="6"/><path d="M48 48l20 20" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>',
 body:`<div class="card"><div class="nb-head"><h2>ملفات الأدلة الستة</h2><span id="s2cnt">0 / 6</span></div><p class="step-text">المس كل ملف لتكشف المقطع، ثم حدّد الدليل الذي تراه.</p><div class="gallery" id="s2g">${EV.map((e,i)=>`<figure class="evf" data-i="${i}" style="cursor:pointer"><div class="evc" style="position:relative">${pic(e.im,e.n)}<div class="evcover" style="position:absolute;inset:0;background:var(--accent);display:grid;place-items:center;color:#fff;font-family:var(--f-display);font-size:2rem;font-weight:800">ملف ${i+1}</div></div><figcaption data-c="${i}">؟</figcaption></figure>`).join('')}</div><div id="s2q" class="mt"></div></div>
  <div class="two"><div class="card"><h3>سؤال تقييم</h3><div id="s2q2"></div></div>
   ${vcard('nation','البخور والعود في ضيافتنا',`${pic('s62_a96b5f34','مبخرة','auc-im')}<p>عند إشعال البخور في المبخرة لاستقبال الضيوف تنتج رائحة جديدة ودخان؛ إنه تغير كيميائي من عاداتنا الأصيلة في الكرم والضيافة.</p>`)}</div>`,
 init(){const found=new Set();let q2=false;const chk=()=>{$('#s2cnt').textContent=found.size+' / 6';if(found.size===6&&q2)G.complete('s2');};
  $$('#s2g .evf').forEach(f=>f.onclick=()=>{const i=+f.dataset.i;if(found.has(i))return;f.querySelector('.evcover').style.display='none';SFX.whoosh();
   $$('#s2g .evf').forEach(x=>x.style.outline='');f.style.outline='3px solid var(--amber)';
   const opts=K.shuffle(EV.map(e=>e.n));mcq($('#s2q'),{q:`ملف ${i+1}: ما دليل التغير الكيميائي الذي تراه؟`,o:opts,a:opts.indexOf(EV[i].n),cols:true},'s2',()=>{found.add(i);f.querySelector('[data-c]').textContent=EV[i].ic+' '+EV[i].n;chk();});});
  mcq($('#s2q2'),{q:'أي مما يلي يعد دليلًا على حدوث تغير كيميائي؟',o:['قطع مكسرة','التغير في حالة المادة','التغير في الحجم','تصاعد الدخان'],a:3},'s2',()=>{q2=true;chk();});
  this.reset=()=>{found.clear();q2=false;$$('#s2g .evcover').forEach(c=>c.style.display='grid');$$('#s2g [data-c]').forEach(c=>c.textContent='؟');chk();};},
 quiz:[{q:'أي مما يلي ليس من دلائل حدوث التغير الكيميائي؟',o:['تصاعد غاز','تغير اللون','تغير الشكل بالقص','خروج فقاعات'],a:2},{q:'الألعاب النارية تُصدر صوتًا وضوءًا؛ وهذا دليل على حدوث:',o:['تغير فيزيائي','تغير كيميائي','تغير في الحالة فقط','لا شيء'],a:1}],
 explain:'<p>بعض دلائل حدوث التغير الكيميائي: 1) تصاعد غاز. 2) حدوث صوت. 3) إنتاج حرارة أو ضوء. 4) تغير اللون. 5) خروج فقاعات. 6) التغير في الرائحة.</p>'});

/* ================= تقييم: الخاصية الكيميائية ================= */
def('ev2',{n:"تقويم ٣",eyebrow:"تقييم · السؤال ٣",title:"تقييم: الخاصية الكيميائية",goal:"السؤال ٣ كما في العرض.",plan:4,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:`<div class="card" id="ev2Box"></div>`,
 init(){const P=[{"no": "س٣", "q": "هي الخاصية التي تشير إلى ميل المادة لحدوث تغير في تركيبها الأصلي بفعل تفاعل كيميائي مما ينتج مواد جديدة:", "o": ["الخاصية الفيزيائية", "التغير الحيوي", "التغير الكيميائي", "الخاصية الكيميائية"], "a": 3}];const box=$('#ev2Box');const solved=P.map(()=>false);box.innerHTML='<div class="prob-list"></div>';const L=box.querySelector('.prob-list');
  P.forEach((q,i)=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+(q.no||i+1)+'</span><span>'+(q.tag||'تقييم')+'</span></div>';const inner=document.createElement('div');d.appendChild(inner);L.appendChild(d);
   const fin=()=>{solved[i]=true;d.classList.add('solved');if(solved.every(Boolean))G.complete('ev2');};if(q.o)mcq(inner,q,'ev2',fin);else calcQ(inner,q,'ev2',fin);});},
 reset(){STN['ev2'].init();},
 explain:"<p>أسئلة تقييم العرض في موضعها من الدرس وبالترتيب نفسه.</p>"});
/* ================= S3: physical vs chemical ================= */
def('s3',{n:'3 · فيزيائي أم كيميائي؟',eyebrow:'المحطة 3 · المقارنة',title:'ميّز التغير الكيميائي من التغير الفيزيائي',goal:'هل نتجت مادة جديدة؟ هل يمكن إرجاع المادة إلى حالتها الأصلية؟ سؤالان يحسمان الأمر.',plan:7,core:1,
 icon:'<path d="M40 6v68" stroke="currentColor" stroke-width="5"/><rect x="8" y="20" width="24" height="40" rx="4" fill="currentColor" opacity=".5"/><rect x="48" y="20" width="24" height="40" rx="4" fill="currentColor"/>',
 body:`<div class="two"><div class="card"><h3>مقارنة بين التغير الفيزيائي والتغير الكيميائي</h3><div class="tablewrap"><table class="data"><thead><tr><th></th><th>التغيرات الفيزيائية</th><th>التغيرات الكيميائية</th></tr></thead><tbody><tr><td>المواد الجديدة</td><td>لا ينتج عنها مواد جديدة</td><td>ينتج عنها مواد جديدة</td></tr><tr><td>الإرجاع</td><td>يمكن إرجاعها لحالتها الأصلية</td><td>لا يمكن إرجاعها لحالتها الأصلية</td></tr></tbody></table></div>
    <div class="two mt"><figure style="margin:0">${pic('s64_37da17ea','تغيرات فيزيائية من حولنا','auc-im')}</figure><figure style="margin:0">${pic('s64_e9092b1d','أمثلة على التغيرات الكيميائية','auc-im')}</figure></div></div>
   <div class="card"><h3>⚡ صنّف بسرعة: فيزيائي أم كيميائي؟</h3><div id="s3tf"></div></div></div>
  <div class="two"><div class="card"><h3>لماذا تُحفظ الفيتامينات في زجاجات بنية معتمة؟</h3><div id="s3q"></div></div>
   <div class="card"><h3>قصة: من البن إلى الفنجان ☕</h3><div id="s3story"></div></div></div>`,
 init(){let a=false,b=false;const chk=()=>{if(a&&b)G.complete('s3');};
  STN.s3.tf=tfRound($('#s3tf'),[['قلي البيضة',false,'تتكون مواد جديدة: تغير كيميائي.','s64_e4395216'],['طي الملابس',true,'يتغير الشكل فقط: تغير فيزيائي.','s25_06a7795e'],['تصاعد البخار من الإبريق',true,'تغير في الحالة: فيزيائي.','s64_85a39f83'],['احتراق الشمعة',false,'احتراق ينتج مواد جديدة: كيميائي.','s64_7b98aa67'],['ذوبان مكعبات الثلج',true,'تغير في الحالة: فيزيائي.','s64_58e85345'],['تفاعل قرص الفوار مع الماء',false,'خروج فقاعات غاز: كيميائي.','s64_e03a8fbe'],['اشتعال الحطب',false,'احتراق: كيميائي.','s57_23d6c3c8'],['تقطيع البطيخ',true,'يتغير الشكل فقط: فيزيائي.','s64_0549f372']],'s3',{secs:12,tl:'فيزيائي',fl:'كيميائي',intro:'تظهر صورة لتغير ما: هل هو فيزيائي أم كيميائي؟',onEnd:()=>{a=true;chk();}});
  mcq($('#s3q'),{q:'لماذا تحفظ الفيتامينات في زجاجات بنية معتمة؟',o:['لكي تبدو جميلة','لكي لا تتعرض للضوء؛ فالفيتامينات يمكن أن تتفاعل مع الضوء','لأن الزجاج البني أخف','لكي لا تتبخر'],a:1,why:'التفاعل بوجود الضوء خاصية كيميائية لبعض المواد.'},'s3',()=>{b=true;chk();});
  story($('#s3story'),{
   a:{k:'المشهد 1',im:'s54_f369ba7a',text:'أمامك حبوب بن خضراء. تريد إعداد القهوة السعودية. أي خطوة تُحدث تغيرًا كيميائيًّا؟',choices:[{t:'تحميص الحبوب على النار',to:'b',pts:6},{t:'طحن الحبوب',to:'c'}]},
   b:{k:'المشهد 2',im:'s59_7dd3ef03',text:'أحسنت! تغيّر لون الحبوب وانطلقت رائحة جديدة: دليلان على التغير الكيميائي. والآن، هل يمكن إرجاع البن المحمّص إلى بن أخضر؟',choices:[{t:'لا يمكن إرجاعه',to:'d',pts:6},{t:'نعم بتبريده',to:'e'}]},
   c:{k:'تنبيه',text:'الطحن يغيّر الشكل والحجم فقط؛ تغير فيزيائي كما تعلمنا في الدرس السابق.',choices:[{t:'جرّب خطوة أخرى',to:'a'}]},
   d:{k:'النهاية',text:'صحيح! التغيرات الكيميائية لا يمكن إرجاعها بطرائق فيزيائية بسيطة.',end:'التحميص تغير كيميائي، والطحن والغلي تغيرات فيزيائية.',good:true,choices:[]},
   e:{k:'تنبيه',text:'التبريد لا يعيد البن أخضر؛ لقد تكونت مواد جديدة.',choices:[{t:'أعد التفكير',to:'b'}]}},'a','s3');},
 leave(){STN.s3.tf&&STN.s3.tf.stop();},
 quiz:[{q:'أي الخواص التالية تعد خاصية فيزيائية؟',o:['الاشتعال','الأكسدة','التبخر','التخمر'],a:2},{q:'التغيرات التي لا يمكن عكسها بطرائق فيزيائية بسيطة هي التغيرات:',o:['الفيزيائية','الكيميائية'],a:1,cols:true}],
 explain:'<p><b>التغيرات الفيزيائية</b> لا ينتج عنها مواد جديدة ويمكن إرجاعها لحالتها الأصلية. <b>التغيرات الكيميائية</b> ينتج عنها مواد جديدة ولا يمكن إرجاعها بطرائق فيزيائية بسيطة.</p><p>تُحفظ الفيتامينات في زجاجات بنية معتمة لكي لا تتعرض للضوء؛ لأنها يمكن أن تتفاعل معه.</p>'});

/* ================= تقييم: الخواص والتغيرات الكيميائية ================= */
def('ev3',{n:"تقويم ٦–٨",eyebrow:"تقييم · الأسئلة ٦–٨",title:"تقييم: الخواص والتغيرات الكيميائية",goal:"الأسئلة ٦ و٧ و٨ كما في العرض.",plan:4,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:`<div class="card" id="ev3Box"></div>`,
 init(){const P=[{"no": "س٦", "q": "أي مما يلي يعد دليلًا على حدوث تغير كيميائي؟", "o": ["قطع مكسرة", "التغير في حالة المادة", "التغير في الحجم", "تصاعد الدخان"], "a": 3}, {"no": "س٧", "q": "أي الخواص التالية تعد خاصية كيميائية؟", "o": ["الاشتعال", "الحجم", "الكثافة", "الكتلة"], "a": 0}, {"no": "س٨", "q": "أي الخواص التالية تعد خاصية فيزيائية؟", "o": ["الاشتعال", "الأكسدة", "التبخر", "التخمر"], "a": 2, "why": "التبخر تغير فيزيائي في حالة المادة، أما الاشتعال والأكسدة والتخمر فتغيرات كيميائية. (الأدق علميًّا أن يُقال: أيها يرتبط بخاصية فيزيائية؟)"}];const box=$('#ev3Box');const solved=P.map(()=>false);box.innerHTML='<div class="prob-list"></div>';const L=box.querySelector('.prob-list');
  P.forEach((q,i)=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+(q.no||i+1)+'</span><span>'+(q.tag||'تقييم')+'</span></div>';const inner=document.createElement('div');d.appendChild(inner);L.appendChild(d);
   const fin=()=>{solved[i]=true;d.classList.add('solved');if(solved.every(Boolean))G.complete('ev3');};if(q.o)mcq(inner,q,'ev3',fin);else calcQ(inner,q,'ev3',fin);});},
 reset(){STN['ev3'].init();},
 explain:"<p>أسئلة تقييم العرض في موضعها من الدرس وبالترتيب نفسه.</p><p>تنبيه للمعلم: صيغة السؤال ٨ في العرض «أي الخواص التالية تعد خاصية فيزيائية؟» وإجابته «التبخر»، والتبخر تغير في الحالة وليس خاصية؛ فأُضيف توضيح في التفسير.</p>"});
/* ================= S4: conservation of mass ================= */
def('s4',{n:'4 · قانون حفظ الكتلة',eyebrow:'المحطة 4 · الميزان لا يكذب',title:'قانون حفظ الكتلة',goal:'هل تختفي الكتلة عندما يحترق الخشب؟ جرّب التفاعل في وعاء مغلق ومفتوح، وراقب الميزان.',plan:8,core:1,
 icon:'<path d="M40 10v54M14 24h52M20 24l-10 22h20zM60 24l-10 22h20zM28 66h24" stroke="currentColor" stroke-width="5" fill="none"/>',
 body:`<div class="card" id="s4sl"></div>
  <div class="two"><div class="stage"><svg id="s4svg" viewBox="0 0 600 340" aria-label="دورق على ميزان"></svg>
    <div class="sim-bar"><span class="seg" id="s4m"><button type="button" data-m="c" class="on">وعاء مغلق (كيس بلاستيكي)</button><button type="button" data-m="o">وعاء مفتوح</button></span><button class="btn" type="button" id="s4go">أضف القرص الفوار 💊</button><button class="tbtn" type="button" id="s4r">أعِد</button></div>
    <p class="hint-line">قيم افتراضية للتوضيح.</p></div>
   <div class="side"><div class="card"><h3>ماذا تلاحظ؟</h3><div id="s4q"></div></div>
    ${vcard('islam','كل شيء بمقدار',`${ayah('وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ','الرعد: 8')}<p class="mt">الكتلة لا تفنى ولا تُستحدث في التفاعل الكيميائي؛ نظام دقيق قدّره الخالق سبحانه.</p>`)}</div></div>
  <div class="card"><h3>مثال: احتراق الخشب — رتّب المعادلة</h3><p class="step-text">صنّف كل مادة: هل هي مادة متفاعلة أم مادة ناتجة؟</p><div id="s4sort"></div></div>`,
 init(){let a=false,b=false,ran={};const chk=()=>{if(a&&b&&ran.c&&ran.o)G.complete('s4');};
  slides($('#s4sl'),[
   {k:'قانون حفظ الكتلة',t:'هل اختفى جزء من الكتلة؟',im:[P('s70_6cc55d62','قبل التفاعل وبعده على الميزان')],html:'<p>إذا قارنت كتلة الرماد المتبقي بعد إحراق كمية من الخشب بكتلة ذلك الخشب، فإنك تجد أن كتلة الرماد أقل بكثير من كتلة الخشب. فهل اختفى جزء من الكتلة خلال عملية الاحتراق؟</p><p class="def">قانون حفظ الكتلة: مجموع كتل المواد الناتجة عن التفاعل الكيميائي يساوي دائمًا مجموع كتل المواد الأصلية (المتفاعلة).</p>'},
   {k:'مثال',t:'احتراق الخشب',im:[P('s71_aeceafe9','خشب'),P('s71_2df9abdc','أكسجين'),P('s52_1f89136e','رماد'),P('s71_6d8fc6c7','غازات')],html:'<p><b>المواد المتفاعلة:</b> خشب + أكسجين.</p><p><b>المواد الناتجة:</b> رماد + بخار ماء + غازات.</p><p class="eq">كتلة المواد المتفاعلة = كتلة المواد الناتجة</p><p>الرماد أخف لأن بخار الماء والغازات تتصاعد في الهواء.</p>'},
   {k:'مراجعة الفصل · وضّح',t:'ماذا يحدث للذرات؟',im:[P('s81_da6f3bc0','قانون حفظ الكتلة')],html:'<p>تتكسر الروابط بين المتفاعلات وتتكون روابط جديدة بين الذرات لتكوين نواتج جديدة، وتصبح جميع الذرات في المواد المتفاعلة جزءًا من المواد المتكوّنة.</p>'}],'s4');
  let mode='c',S;const svg=$('#s4svg');const M0=250.0,GAS=1.8;
  function reset(){S={t:0,run:false,in:false};draw();}
  function draw(){const u=Math.min(1,S.t/3),mass=mode==='o'&&S.in?M0-GAS*u:M0,bub=S.in&&u<1;
   let s=`<rect width="600" height="340" fill="var(--wall)"/><rect y="300" width="600" height="40" fill="var(--bench-top)"/><polygon points="170,300 186,250 414,250 430,300" fill="var(--metal-dark)"/><rect x="166" y="240" width="268" height="14" rx="5" fill="var(--metal)"/><rect x="232" y="262" width="136" height="30" rx="5" fill="var(--lcd)"/><text x="360" y="285" text-anchor="end" font-family="Share Tech Mono" font-size="22" fill="var(--lcdink)">${mass.toFixed(1)} g</text>`;
   s+=`<path d="M270 80 L270 130 L230 230 Q228 240 240 240 L360 240 Q372 240 370 230 L330 130 L330 80 Z" fill="var(--glass)" stroke="var(--glass-edge)" stroke-width="3"/><path d="M246 190 L354 190 L368 232 Q368 238 360 238 L240 238 Q232 238 234 232 Z" fill="var(--water)" opacity=".55"/>`;
   if(bub)for(let k=0;k<14;k++){const x=250+((k*37+S.t*90)%100),y=232-((k*23+S.t*140)%46);s+=`<circle cx="${x}" cy="${y}" r="3.5" fill="#fff" opacity=".85"/>`;}
   if(S.in&&u<.6)s+=`<rect x="290" y="${180+u*60}" width="20" height="8" rx="3" fill="#fff" stroke="#999"/>`;
   if(mode==='c'){const r=24+u*28*(S.in?1:0);s+=`<path d="M268 82 Q300 ${60-r} 332 82" fill="rgba(220,220,230,.6)" stroke="#9aa" stroke-width="2"/><ellipse cx="300" cy="${70-r*.6}" rx="${30+r*.5}" ry="${16+r*.6}" fill="rgba(230,230,240,.55)" stroke="#9aa" stroke-width="2"/>`;}
   else if(S.in&&u<1)for(let k=0;k<6;k++){const y=70-((k*20+S.t*60)%70);s+=`<circle cx="${285+k*6}" cy="${y}" r="5" fill="#cfd8dc" opacity=".7"/>`;}
   s+=`<text x="300" y="30" text-anchor="middle" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="20" fill="var(--ink)">${mode==='c'?'وعاء مغلق: الغاز لا يخرج':'وعاء مفتوح: الغاز يتصاعد إلى الهواء'}</text>`;svg.innerHTML=s;}
  $('#s4m').onclick=e=>{const b=e.target.closest('[data-m]');if(!b||S.run)return;mode=b.dataset.m;$$('#s4m button').forEach(x=>x.classList.toggle('on',x===b));G.tick();reset();};
  $('#s4go').onclick=()=>{if(S.run||S.in)return;S.in=true;S.run=true;SFX.pop();let last=performance.now();const step=now=>{if(!G.paused&&G.cur==='s4')S.t+=(now-last)/1000;last=now;draw();if(S.t<3.2){requestAnimationFrame(step);}else{S.run=false;ran[mode]=1;chk();}};requestAnimationFrame(step);};
  $('#s4r').onclick=reset;reset();
  mcq($('#s4q'),{q:'في الوعاء المفتوح نقصت قراءة الميزان. هل يتعارض ذلك مع قانون حفظ الكتلة؟',o:['نعم، فالكتلة اختفت','لا، فالغاز الناتج خرج إلى الهواء؛ ولو جمعناه لتساوت الكتلة قبل التفاعل وبعده','نعم، لأن القرص فقد وزنه','لا يمكن الحكم'],a:1,why:'في الوعاء المغلق بقيت الكتلة ثابتة رغم حدوث تغير كيميائي نتجت عنه مواد جديدة.'},'s4',()=>{a=true;chk();});
  sortGame($('#s4sort'),{bins:['مواد متفاعلة','مواد ناتجة'],items:[['خشب',0],['أكسجين',0],['رماد',1],['بخار ماء',1],['غازات',1]],hint:'ما الذي كان موجودًا قبل الاحتراق؟'},'s4',()=>{b=true;chk();});
  this.reset=()=>{ran={};a=b=false;reset();};},
 quiz:[{q:'ينص قانون حفظ الكتلة على أن مجموع كتل المواد الناتجة:',o:['أقل دائمًا من كتل المواد المتفاعلة','أكبر دائمًا','يساوي دائمًا مجموع كتل المواد المتفاعلة','لا علاقة له بالمتفاعلة'],a:2},{q:'عند احتراق الخشب تكون كتلة الرماد أقل من كتلة الخشب لأن:',o:['الكتلة تفنى','بخار الماء والغازات تتصاعد في الهواء','الرماد ليس مادة','الأكسجين لا كتلة له'],a:1}],
 explain:'<p><b>قانون حفظ الكتلة:</b> مجموع كتل المواد الناتجة عن التفاعل الكيميائي يساوي دائمًا مجموع كتل المواد المتفاعلة. في احتراق الخشب: خشب + أكسجين ← رماد + بخار ماء + غازات.</p><p>يثبت التفاعل في الوعاء المغلق قانون حفظ الكتلة؛ فبالرغم من حدوث تغير كيميائي نتجت عنه مواد جديدة، بقيت الكتلة ثابتة قبل التفاعل وبعده.</p>'});

/* ================= الخلاصة ================= */
def('sum',{n:"الخلاصة",eyebrow:"الخلاصة · الكتاب صفحة 91",title:'الخلاصة',goal:'أهم أفكار الدرس كما في العرض.',plan:2,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:`<div class="two"><div class="card"><h3>قابلية التغير</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>تؤدي التغيرات الكيميائية إلى تكون مادة أو مواد جديدة.</li></ul></div><div class="card"><h3>خواص كيميائية شائعة</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>قد يؤدي تعرّض المواد إلى الأكسجين أو الضوء أو الحرارة إلى حدوث تفاعلات كيميائية.</li><li>يمكن تصنيف المواد تبعًا لخواصها الكيميائية.</li><li>يمكن عكس التغيرات الفيزيائية أو الرجوع عنها، بينما لا يمكن عكس التفاعلات الكيميائية بطرائق فيزيائية بسيطة.</li></ul></div><div class="card"><h3>قانون حفظ الكتلة</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>مجموع كتل المواد الناتجة عن التفاعل الكيميائي يساوي دائمًا مجموع كتل المواد المتفاعلة.</li></ul></div></div><div class="card"><div class="center">${pic('s73_0cd568a2','أمثلة على التغيرات الكيميائية: الألعاب النارية، قلي البيض، البناء الضوئي، احتراق الخشب، احتراق البروبان، الهضم','auc-im')}</div></div>`,
 init(){},enter(){G.complete('sum');},reset(){},explain:'<p>خلاصة الدرس كما في العرض.</p>'});
/* ================= SELF TEST + CHAPTER REVIEW ================= */
def('self',{n:'اختبر نفسك والمراجعة',eyebrow:'كتاب الطالب ص 95 و99–100',title:'اختبر نفسك ومراجعة الفصل: الأسئلة والحلول',goal:'أسئلة «اختبر نفسك» للدرس الثاني، ثم أسئلة مراجعة الفصل الثالث مع الحلول.',plan:2,
 icon:'<rect x="14" y="8" width="52" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30l6 6 12-12M24 54l6 6 12-12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
 body:`<div class="card"><div class="nb-head"><h2>اختبر نفسك ص 91</h2></div><div id="selfBox"></div></div>
  <div class="card"><div class="nb-head"><h2>مراجعة الأفكار الرئيسة</h2><span>الكتاب صفحة 95</span></div><div class="two"><div><h3>الدرس الأول: الخواص والتغيرات الفيزيائية</h3><ol class="step-text" style="line-height:1.8"><li>أي خاصية للمادة يمكن ملاحظتها أو قياسها هي خاصية فيزيائية.</li><li>حالات المادة الأربع هي: الصلبة، والسائلة، والغازية، والبلازما. تُحدَّد حالة المادة بناءً على طاقة جزيئاتها.</li><li>اللون، والشكل، والطول، والكتلة، والحجم، والكثافة، ودرجة الانصهار، ودرجة الغليان جميعها خواص فيزيائية.</li><li>في التغير الفيزيائي تتغير خواص المادة دون أن يتغير نوعها.</li><li>يمكن تصنيف المواد بناءً على خواصها الفيزيائية.</li></ol></div><div><h3>الدرس الثاني: الخواص والتغيرات الكيميائية</h3><ol class="step-text" style="line-height:1.8"><li>الخاصية الكيميائية هي الخاصية التي تحدد ميل المادة لحدوث تغير في تركيبها الأصلي بفعل تفاعل كيميائي مما ينتج مواد جديدة.</li><li>منَ الخواص الكيميائية العامة: قابلية الاحتراق، والتفاعل مع الأكسجين، والتفاعل مع الحرارة أو الضوء، والتحلل بالكهرباء.</li><li>عند حدوث تغير كيميائي تنتج مواد جديدة ذات خواص مختلفة عن المواد المتفاعلة.</li><li>في التغير الكيميائي يكون مجموع كتل المواد الناتجة عن التفاعل مساويًا لمجموع كتل المواد المتفاعلة.</li></ol></div></div></div><div class="card"><div class="nb-head"><h2>تصوّر الأفكار الرئيسة: خواص المادة</h2><span>افتح كتابك على الصفحة 99 · أكمل المقارنة</span></div><div id="idTab"></div></div><div class="card"><div class="nb-head"><h2>مراجعة الفصل: استخدام المفردات</h2><span>ص 96</span></div><div id="rv1"></div></div>
  <div class="card"><div class="nb-head"><h2>تثبيت المفاهيم</h2><span>اختر الإجابة الصحيحة</span></div><div class="prob-list" id="rv2"></div></div>
  <div class="card"><div class="nb-head"><h2>التفكير الناقد</h2></div><div id="rv3"></div></div>`,
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'عرِّف',q:'عرّف الخاصية الكيميائية. أعطِ أربعة أمثلة عليها.',a:[['التعريف','الخاصية التي تشير إلى ميل المادة لحدوث تغير في تركيبها الأصلي بفعل تفاعل كيميائي مما ينتج مواد جديدة.'],['أمثلة','1) الاحتراق. 2) التفاعل بوجود الكهرباء. 3) التفاعل بوجود الأكسجين. 4) التفاعل بوجود الضوء.']]},
  {k:'حدِّد',q:'حدّد بعض الدلائل التي تشير إلى حدوث تغير كيميائي.',a:[['الدلائل','1) تصاعد غاز. 2) إنتاج صوت. 3) إنتاج ضوء أو حرارة. 4) تغير اللون.']]},
  {k:'التفكير الناقد',q:'إذا رأيت وميضًا ساطعًا، ثم لهبًا خلال عرض في المختبر، فهل يدل ذلك على تغير فيزيائي أم تغير كيميائي؟ فسّر إجابتك.',fig:pic('s76_475fab65','وميض','auc-im'),a:[['الإجابة','يدل ذلك على حدوث تغير كيميائي.'],['التفسير','لأن إنتاج الضوء والحرارة (الوميض واللهب) من دلائل حدوث التغير الكيميائي.']]}],'self',()=>G.complete('self'));
  solutions($('#rv1'),[
   {k:'1',q:'درجة الحرارة التي تتحول عندها المادة من حالة الصلابة إلى حالة السيولة هي ............',a:[['الإجابة','درجة الانصهار.']]},
   {k:'2',q:'الصلبة، والسائلة، والغازية هي أمثلة على ............',a:[['الإجابة','حالات المادة.']]},
   {k:'3',q:'............ هي كتلة وحدة الحجوم من مادة ما.',a:[['الإجابة','الكثافة.']]},
   {k:'4',q:'............ يُنتج مادة جديدة، ولا يمكن الرجوع عنه بطرق فيزيائية.',a:[['الإجابة','التغير الكيميائي.']]}],'self');
  const MQ=[{q:'5. أي مما يلي يعد دليلًا على حدوث تغير كيميائي؟',o:['تصاعد الغاز','قطع مكسرة','التغير في الحجم','التغير في حالة المادة'],a:0},
   {q:'6. أي الخيارات التالية يصف درجة الغليان؟',o:['خاصية كيميائية','تغير فيزيائي','خاصية فيزيائية','ثابتة لجميع المواد'],a:2},
   {q:'7. أي الخواص التالية تعد خاصية كيميائية؟',o:['الحجم','الاشتعال','الكثافة','الكتلة'],a:1},
   {q:'8. أي الخيارات التالية يصف معنى الحجم؟',o:['مساحة عرض','مقدار الحيز الذي يشغله جسم ما','المسافة بين ثلاث نقاط','درجة الحرارة التي يحدث عندها الغليان'],a:1}];
  const box=$('#rv2');MQ.forEach(q=>{const d=document.createElement('div');d.className='prob';box.appendChild(d);mcq(d,q,'self');});
  solutions($('#rv3'),[
   {k:'9 · وضّح',q:'استخدم قانون حفظ المادة لتوضيح ما يحدث للذرات عندما تتحد لإنتاج مادة جديدة.',fig:pic('s81_da6f3bc0','','auc-im'),a:[['الإجابة','تتكسر الروابط بين المتفاعلات وتتكون روابط جديدة بين الذرات لتكوين نواتج جديدة، وتصبح جميع الذرات في المواد المتفاعلة جزءًا من المواد المتكونة.'],['القانون','مجموع كتل المواد الناتجة عن التفاعل الكيميائي يساوي دائمًا مجموع كتل المواد المتفاعلة.']]},
   {k:'10 · صف',q:'صف حالات المادة الأربع. وما أوجه الاختلاف بينها؟',a:[['الصلبة','حركة الدقائق اهتزازية في مكانها، الحجم ثابت، الشكل ثابت، الجزيئات متقاربة جدًّا.'],['السائلة','الدقائق تنزلق فوق بعضها، الحجم ثابت، الشكل حسب الوعاء، الجزيئات متقاربة نوعًا ما.'],['الغازية','الدقائق تتحرك بحرية، الحجم والشكل حسب الوعاء، الجزيئات متباعدة.'],['البلازما','تحدث عند درجات الحرارة العالية جدًّا، كما في مصابيح النيون والبرق.']]},
   {k:'11 · قوّم',q:'ما المعلومات التي تحتاج إليها لإيجاد كثافة مادة ما؟',a:[['الإجابة','الكتلة والحجم؛ لأن الكثافة = الكتلة ÷ الحجم (ث = ك ÷ ح)، وتقاس بوحدة كجم/م³.']]}],'self');
  K.idTable($('#idTab'));},
 reset(){STN.self.s.reset();},explain:'<p>حلول «اختبر نفسك» ص 91، وأسئلة مراجعة الفصل الثالث ص 96 كما في العرض.</p>'});

/* ================= مراجعة درس: أسئلة مختارة ================= */
def('lrev',{n:'مراجعة درس: أسئلة مختارة',eyebrow:'مراجعة درس · الخواص والتغيرات الفيزيائية والكيميائية',title:'مراجعة درس: مجموعة من الأسئلة المختارة',goal:'خمسة أسئلة مختارة تراجع الدرسين كما في نهاية العرض.',plan:6,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
 body:`<div class="card"><div class="nb-head"><h2>السؤال ١: اختر الكلمة المناسبة</h2><span>A–J</span></div><div class="prob-list" id="lr1"></div></div>
  <div class="card"><div class="nb-head"><h2>السؤال ٢: تفسير الرسوم العلمية</h2><span>استعن بالرسوم</span></div><div class="two"><div><svg viewBox="0 0 600 250" style="width:100%;height:auto" aria-label="ثلاث عينات"></svg></div><div class="prob-list" id="lr2"></div></div></div>
  <div class="card"><div class="nb-head"><h2>السؤال ٣: صل العمود الأول بما يناسبه من العمود الثاني</h2></div><div id="lr3"></div></div>
  <div class="card"><div class="nb-head"><h2>السؤال ٤: هل التغيرات التالية فيزيائية (ف) أم كيميائية (ك)؟</h2></div><div id="rv4"></div></div>
  <div class="card"><div class="nb-head"><h2>السؤال ٥: المصطلحات</h2><span>اختر المصطلح ثم تعريفه</span></div><div id="lr5a"></div><div id="lr5b" class="mt"></div></div>`,
 init(){const el=$('#st-lrev');let n=0;const need=4,done=()=>{if(++n>=need)G.complete('lrev');};
  const Q1=[['A','............ مثال على خاصية كيميائية.',['قابلية الاشتعال','كثافة الحديد'],0],['B','عندما يحترق جذع شجرة، يكون مجموع ............ المواد قبل الاحتراق وبعده متساويًا.',['حجوم','كتل'],1],['C','تحوّل لون شرائح التفاح إلى اللون البني هو تغير ............',['فيزيائي','كيميائي'],1],['D','ينتج صدأ الحديد عن تفاعل ............ مع الحديد.',['الأكسجين','الكبريت'],0],['E','الدليل على حدوث التغير الكيميائي في قطعة الكعك هو ............',['تقطيعها إلى قطع أصغر','احتواؤها على فقاقيع هوائية'],1],
   ['F','يُعد ............ تغيرًا كيميائيًّا.',['انصهار الزبدة','احتراق الخشب'],1],['G','يمكن أن تُسبّب ............ تغيرًا كيميائيًّا.',['الكهرباء','قابلية السحب في المادة'],0],['H','الخواص ............ هي خواص لا يُشترط ملاحظتها في المختبر، وتُحدث تغيرًا في تركيب المادة الأصلية.',['الكيميائية','الفيزيائية'],0],['I','التغيرات ............ لا يمكن عكسها بطرائق فيزيائية بسيطة.',['الفيزيائية','الكيميائية'],1],['J','تُحفظ الفيتامينات في علب ملونة؛ لمنع حدوث تفاعلات كيميائية فيها بسبب ............',['الحرارة','الضوء'],1]];
  const b1=$('#lr1');let c1=0;Q1.forEach(q=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+q[0]+'</span></div>';const i=document.createElement('div');d.appendChild(i);b1.appendChild(d);mcq(i,{q:q[1],o:q[2],a:q[3],cols:true},'lrev',()=>{d.classList.add('solved');if(++c1===Q1.length)done();});});
  const svg=el.querySelector('svg');const jar=(x,lab,lid,pts)=>`<g><rect x="${x}" y="40" width="150" height="180" rx="14" fill="var(--glass,#eef6fb)" stroke="var(--glass-edge,#9bb)" stroke-width="3"/>${lid?`<rect x="${x-6}" y="30" width="162" height="14" rx="5" fill="var(--metal-dark,#555)"/>`:''}${pts.map(p=>`<circle cx="${x+p[0]}" cy="${p[1]}" r="11" fill="#4b5563" stroke="#111" stroke-width="1.5"/>`).join('')}<text x="${x+75}" y="244" text-anchor="middle" font-size="20" font-weight="800" fill="var(--ink,#123)">${lab}</text></g>`;
  const sol=[],liq=[],gas=[[30,70],[110,80],[70,110],[40,150],[120,140],[60,190],[115,195],[85,60]];for(let r=0;r<4;r++)for(let c=0;c<4;c++)sol.push([39+c*24,207-r*23]);for(let r=0;r<3;r++)for(let c=0;c<5;c++)liq.push([25+c*25+(r%2)*10,207-r*21]);
  svg.innerHTML=jar(420,'(أ)',false,sol)+jar(225,'(ب)',false,liq)+jar(30,'(ج)',true,gas);
  const Q2=[{q:'A) ما العينة التي في الحالة الصلبة؟ وما العينة التي في الحالة السائلة؟',o:['الصلبة (أ) والسائلة (ب)','الصلبة (ب) والسائلة (ج)','الصلبة (ج) والسائلة (أ)'],a:0},
   {q:'B) ما العينة (أو العينات) التي تتلامس جزيئاتها بعضها مع بعض؟',o:['العينة (ب) فقط','العينتان (أ، ب)','العينة (ج)'],a:1,why:'جزيئات الصلب (أ) والسائل (ب) متلامسة، أما جزيئات الغاز (ج) فمتباعدة. (في العرض: العينة ب فقط، والأدق: أ و ب).'},
   {q:'C) ما العينة (أو العينات) التي تتحرك جزيئاتها؟',o:['العينتان (أ، ب) فقط','العينة (ج) فقط','جميع العينات (أ، ب، ج)'],a:2,why:'جزيئات المادة في حركة دائمة: تهتز في مكانها في الصلب (أ)، وتنزلق في السائل (ب)، وتتحرك بحرية في الغاز (ج). (في العرض: أ و ب، والأدق: جميعها).'}];
  const b2=$('#lr2');let c2=0;Q2.forEach(q=>{const d=document.createElement('div');d.className='prob';b2.appendChild(d);mcq(d,q,'lrev',()=>{d.classList.add('solved');if(++c2===Q2.length)done();});});
  match($('#lr3'),[['لها كتلة، وتشغل حيزًا في الفراغ.','المادة'],['درجة الحرارة التي يتحوّل عندها السائل إلى غاز.','درجة الغليان'],['خواص المادة التي يمكن ملاحظتها وقياسها بسهولة دون تغيّرها.','الخاصية الفيزيائية'],['درجة الحرارة التي يتحوّل عندها الصُّلب إلى سائل.','درجة الانصهار'],['الخواص التي تعطي المادة القدرة على إحداث تغيّر ينتج منه مادة جديدة.','الخاصية الكيميائية'],['نوع من التغيّر مثل الاحتراق أو الصدأ، تتغيّر فيه هوية المادة.','التغير الكيميائي'],['نوع من التغيّر مثل التجمّد أو الذوبان، تبقى فيه المادة الأصلية كما هي.','التغير الفيزيائي']],'lrev',done);
  sortGame($('#rv4'),{bins:['فيزيائي (ف)','كيميائي (ك)'],items:[['تشكيل سلك من قضيب نحاسي',0],['قلي البيض',1],['كسر الزجاج',0],['صبغ الشعر',1],['نقل الجرافيت في قلم الرصاص إلى الورقة بالكتابة',0],['ذوبان مسحوق عصير في الماء',0,'الذوبان تغير فيزيائي؛ لا تتكون مادة جديدة.'],['إشعال المفرقعات النارية',1],['جفاف البرك الصغيرة بعد توقف المطر',0]],hint:'هل تكوّنت مادة جديدة؟'},'lrev',done);
  match($('#lr5a'),[['التغيّر في مكوّنات المادة الأصليّة.','التغير الكيميائي'],['الخاصيّة الفيزيائيّة للمادة التي تُمكن من عمل صفائح منها.','قابلية الطرق'],['التغيّر الذي لا ينجم عنه تغيّر في هوية المادة الأصليّة.','التغير الفيزيائي'],['المسافة بين نقطتين.','الطول'],['درجة الحرارة التي يتحوّل عندها الصُّلب إلى سائل.','درجة الانصهار'],['الكتلة لا تفنى ولا تُستحدث.','قانون حفظ الكتلة'],['خاصيّة تُحدّد كيفية تفاعل المادة.','الخاصية الكيميائية']],'lrev');
  match($('#lr5b'),[['حالة المادة التي تهتز جزيئاتها في مكانها.','الصلبة'],['صُلب، سائل، غاز، بلازما.','حالات المادة'],['الخاصيّة التي يمكن ملاحظتها وقياسها.','الخاصية الفيزيائية'],['وحدة كتلة الحجم.','الكثافة'],['أيّ شيء له كتلة، ويشغل حيزًا في الفراغ.','المادة'],['درجة الحرارة التي يتحوّل عندها السائل إلى غاز دون أن تتغير.','درجة الغليان'],['مقدار الفراغ الذي يشغله الجسم.','الحجم'],['مقدار ما في الجسم من مادة.','الكتلة']],'lrev');},
 reset(){STN.lrev.init();},
 explain:'<p>«مراجعة درس» كما في نهاية العرض: السؤال ١ (A–J)، والسؤال ٢ (تفسير الرسوم)، والسؤال ٣ (صل)، والسؤال ٤ (ف أم ك)، والسؤال ٥ (المصطلحات).</p><p>تصويبات علمية: في السؤال ٢ تتلامس جزيئات العينتين (أ، ب)، وجزيئات العينات الثلاث تتحرك. وفي السؤال ٤ «ذوبان مسحوق عصير في الماء» تغير فيزيائي (ف) لا كيميائي.</p>'});
/* ================= S5: choice board ================= */
def('s5',{n:'إثرائي · لوحة الخيارات',eyebrow:'إثرائي · مراعاة الفروق الفردية',title:'لوحة الخيارات: اختر طريقك',goal:'اختر ثلاث مهام تكوّن خطًّا واحدًا، بالأسلوب الذي يناسبك.',plan:4,core:1,
 icon:'<rect x="10" y="10" width="60" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="6"/><path d="M30 10v60M50 10v60M10 30h60M10 50h60" stroke="currentColor" stroke-width="4"/>',
 body:'<div class="card" id="s5cb"></div>',
 init(){STN.s5.cb=choiceBoard($('#s5cb'),[
   {ic:'✍️',t:'عرّف وأعطِ أمثلة',kind:'كتابة',p:'عرّف الخاصية الكيميائية في دفترك، وأعط أربعة أمثلة عليها.'},
   {ic:'❓',t:'دليل التغير',kind:'اختيار',q:'تغيّر لون شرائح التفاح إلى البني دليل على:',o:['تغير فيزيائي','تغير كيميائي'],a:1,cols:true},
   {ic:'🔬',t:'تجربة منزلية',kind:'تجربة',p:'اترك نصف تفاحة مكشوفًا ساعة، وسجّل ما يحدث للونها. هل هو تغير كيميائي؟ (بإشراف ولي أمرك)'},
   {ic:'🎨',t:'ارسم المعادلة',kind:'رسم',p:'ارسم معادلة احتراق الخشب بالصور: المواد المتفاعلة ← المواد الناتجة.'},
   {ic:'⚖️',t:'حفظ الكتلة',kind:'حساب',p:'تفاعلت 20 جم من مادة مع 12 جم من مادة أخرى في وعاء مغلق. كم كتلة المواد الناتجة؟',v:32,unit:'جم',law:'كتلة النواتج = كتلة المتفاعلات',sol:'20 + 12 = 32 جم'},
   {ic:'❓',t:'رمز التحذير',kind:'اختيار',q:'المادة التي يُكتب على عبوتها «احفظه بعيدًا عن اللهب» لها خاصية:',o:['قابلية الاشتعال','الكثافة','اللمعان','المغناطيسية'],a:0},
   {ic:'📸',t:'رحلة في المطبخ',kind:'ملاحظة',p:'اذكر ثلاثة تغيرات كيميائية تحدث في مطبخ بيتكم، والدليل على كل منها.'},
   {ic:'❓',t:'صنّف',kind:'اختيار',q:'صدأ الحديد ناتج عن تفاعل الحديد مع:',o:['الكبريت','الأكسجين','الضوء فقط','الكهرباء'],a:1},
   {ic:'🗣',t:'اشرح لزميلك',kind:'تواصل',p:'اشرح لزميلك بجملتين الفرق بين التغير الفيزيائي والتغير الكيميائي، مع مثال لكل منهما.'}],'s5',()=>G.complete('s5'));},
 reset(){STN.s5.cb.reset();},explain:'<p>لوحة خيارات 3 × 3 تراعي أنماط التعلم: كتابة، رسم، تجربة، حساب، تواصل. يكفي إنجاز ثلاث مهام في خط واحد.</p>'});

/* ================= S6: competitions ================= */
const BG=[['المادة','كل ما له كتلة ويشغل حيزًا من الفراغ'],['درجة الغليان','درجة الحرارة التي يتحول عندها السائل إلى غاز'],['الخاصية الفيزيائية','خواص المادة التي يمكن ملاحظتها وقياسها بسهولة دون تغيرها'],['درجة الانصهار','درجة الحرارة التي يتحول عندها الصلب إلى سائل'],['الخاصية الكيميائية','الخواص التي تعطي المادة القدرة على إحداث تغير ينتج منه مادة جديدة'],['التغير الكيميائي','نوع من التغير مثل الاحتراق أو الصدأ، تتغير فيه هوية المادة'],['التغير الفيزيائي','نوع من التغير مثل التجمد أو الذوبان، تبقى فيه المادة الأصلية كما هي'],['قابلية الطرق','الخاصية الفيزيائية للمادة التي تمكّن من عمل صفائح منها'],['الطول','المسافة بين نقطتين'],['قانون حفظ الكتلة','الكتلة لا تفنى ولا تُستحدث'],['الصلبة','حالة المادة التي تهتز جزيئاتها في مكانها'],['حالات المادة','صلب، سائل، غاز، بلازما'],['الكثافة','وحدة كتلة الحجم'],['الحجم','مقدار الفراغ الذي يشغله الجسم'],['الكتلة','مقدار ما في الجسم من مادة'],['قابلية الاشتعال','خاصية كيميائية للخشب تجعله يحترق']];
def('s6',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'ساحة التحوّلات: البنغو والصورة المخفية',goal:'مسابقتان جديدتان: «بنغو المصطلحات» من مراجعة الدرسين، و«الصورة المخفية».',plan:4,
 icon:'<rect x="10" y="10" width="60" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="26" cy="26" r="6" fill="currentColor"/><circle cx="40" cy="40" r="6" fill="currentColor"/><circle cx="54" cy="54" r="6" fill="currentColor"/>',
 body:'<div class="card"><div class="nb-head"><h2>🎯 بنغو المصطلحات</h2><span>من «مراجعة درس» في العرض</span></div><div id="s6bg"></div></div><div class="card"><div class="nb-head"><h2>🧩 الصورة المخفية</h2><span>خمّن التغير بأقل عدد من المربعات</span></div><div id="s6pz"></div></div>',
 init(){STN.s6.b=bingo($('#s6bg'),BG,'s6');
  STN.s6.p=puzzle($('#s6pz'),{art:`<image href="${K.img('s58_df466017')}" x="0" y="0" width="600" height="360" preserveAspectRatio="xMidYMid slice"/>`,qs:[
   {q:'يُعد ........ تغيرًا كيميائيًّا:',o:['انصهار الزبدة','احتراق الخشب'],a:1,cols:true},
   {q:'يمكن أن تسبب ........ تغيرًا كيميائيًّا:',o:['الكهرباء','قابلية السحب في المادة'],a:0,cols:true},
   {q:'الخواص ........ هي خواص لا يشترط ملاحظتها في المختبر، وتُحدث تغيرًا في تركيب المادة الأصلية:',o:['الكيميائية','الفيزيائية'],a:0,cols:true},
   {q:'التغيرات ........ لا يمكن عكسها بطرائق فيزيائية بسيطة:',o:['الفيزيائية','الكيميائية'],a:1,cols:true},
   {q:'تُحفظ الفيتامينات في علب ملونة؛ لمنع حدوث تفاعلات كيميائية فيها بسبب:',o:['الحرارة','الضوء'],a:1,cols:true},
   {q:'ينتج صدأ الحديد عن تفاعل ........ مع الحديد:',o:['الأكسجين','الكبريت'],a:0,cols:true}],guess:'ما الذي تُظهره الصورة؟',o:['الألعاب النارية','ذوبان الثلج','قص الورق','طي الملابس'],a:0,why:'الألعاب النارية تُنتج ضوءًا وصوتًا وغازات: دلائل على التغير الكيميائي.'},'s6');},
 reset(){STN.s6.b.reset();STN.s6.p.reset();},explain:'<p>البنغو يراجع مصطلحات الدرسين من «مراجعة درس» في العرض. والصورة المخفية من أسئلة «السؤال رقم 1» في المراجعة.</p>'});

/* ================= CHALLENGE ================= */
def('ch',{n:'تحدي العلماء',plan:2,icon:'<path d="M24 10h32v18a16 16 0 0 1-32 0z" fill="currentColor"/><path d="M40 44v14M28 70h24l-3-12H31z" fill="currentColor"/>',
 eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من تقييمات العرض. لكل سؤال محاولتان.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'المفهوم',q:'هي الخاصية التي تشير إلى ميل المادة لحدوث تغير في تركيبها الأصلي بفعل تفاعل كيميائي مما ينتج مواد جديدة:',o:['الخاصية الفيزيائية','التغير الحيوي','التغير الكيميائي','الخاصية الكيميائية'],a:3},
  {k:'الدلائل',q:'أي مما يلي يعد دليلًا على حدوث تغير كيميائي؟',o:['قطع مكسرة','التغير في حالة المادة','التغير في الحجم','تصاعد الدخان'],a:3},
  {k:'التمييز',t:'multi',q:'اختر كل التغيرات الكيميائية:',items:[['قلي البيضة',1],['احتراق الشمعة',1],['تفاعل قرص الفوار مع الماء',1],['ذوبان الثلج',0],['تقطيع البطيخ',0]],why:'التغيرات الكيميائية تنتج مواد جديدة.'},
  {k:'خاصية كيميائية',q:'أي الخواص التالية تعد خاصية كيميائية؟',o:['الاشتعال','الحجم','الكثافة','الكتلة'],a:0},
  {k:'خاصية فيزيائية',q:'أي الخواص التالية تعد خاصية فيزيائية؟',o:['الاشتعال','الأكسدة','التبخر','التخمر'],a:2},
  {k:'الضوء',q:'لماذا تحفظ الفيتامينات في زجاجات بنية معتمة؟',o:['لكي لا تتعرض للضوء فتتفاعل معه','لأنها أرخص','لكي لا تنكسر','لا سبب لذلك'],a:0},
  {k:'حفظ الكتلة',t:'calc',p:'احترقت 50 جم من الخشب مع 30 جم من الأكسجين، فنتج 8 جم من الرماد وغازات وبخار ماء. كم كتلة الغازات وبخار الماء معًا؟ <span class="hypo">أرقام للتدريب</span>',v:72,unit:'جم',given:'المتفاعلات: 50 + 30 = 80 جم ، الرماد = 8 جم',law:'كتلة المتفاعلات = كتلة النواتج',sol:'80 − 8 = 72 جم'},
  {k:'المقارنة',q:'التغيرات التي يمكن إرجاعها لحالتها الأصلية ولا ينتج عنها مواد جديدة هي:',o:['التغيرات الفيزيائية','التغيرات الكيميائية'],a:0,cols:true}],'ch');},
 reset(){STN.ch.c.reset();},explain:'<p>أسئلة التحدي من تقييمات عرض الدرس الثاني، وسؤال حفظ الكتلة بأرقام تدريبية.</p>'});

/* ================= PLAN (الاستراتيجيات) ================= */
const SROWS={"intro": {"s": ["poe"], "g": "١", "sk": "التنبؤ", "ev": "توقّع: أين ذهب الخشب؟"}, "goals": {"s": ["kwl", "frayer"], "g": "١–٤", "sk": "الاستدعاء", "ev": "لعبة المطابقة"}, "s1": {"s": ["disc", "tps"], "g": "١ و٣", "sk": "الملاحظة والتصنيف", "ev": "سؤال ٢ وتصنيف قابلية الاشتعال"}, "ev1": {"s": ["sticks"], "g": "—", "sk": "التذكر", "ev": "سؤال ١"}, "s2": {"s": ["inq", "coop"], "g": "٢", "sk": "الملاحظة والاستنتاج", "ev": "ملفات التحقيق"}, "lab4": {"s": ["poe", "inq"], "g": "٢", "sk": "التجريب", "ev": "ملاحظة دلائل التغير"}, "ev2": {"s": ["heads"], "g": "١", "sk": "التذكر", "ev": "سؤال ٣"}, "s3": {"s": ["venn", "game"], "g": "٢ و٣", "sk": "المقارنة والتمييز", "ev": "صنّف بسرعة وسؤال ٥"}, "lab5": {"s": ["inq"], "g": "٢", "sk": "التجريب والتمييز", "ev": "ملاحظة التغير"}, "ev3": {"s": ["heads", "sticks"], "g": "١–٣", "sk": "التطبيق", "ev": "تقييم ٦–٨"}, "s4": {"s": ["poe", "prob"], "g": "٤", "sk": "التجريب والاستنتاج", "ev": "الميزان وتصنيف المتفاعلات والنواتج"}, "lab6": {"s": ["inq"], "g": "٤", "sk": "القياس", "ev": "قراءة الميزان قبل وبعد"}, "sum": {"s": ["tl"], "g": "١–٤", "sk": "التلخيص", "ev": "إشارة المرور"}, "self": {"s": ["tps", "cmap"], "g": "١–٤", "sk": "التطبيق والتفكير الناقد", "ev": "اختبر نفسك ومراجعة الفصل"}, "lrev": {"s": ["heads", "game"], "g": "١–٤", "sk": "المراجعة الشاملة", "ev": "مراجعة درس: ٥ أسئلة"}, "s5": {"s": ["coop"], "g": "١–٤", "sk": "مراعاة الفروق", "ev": "لوحة الخيارات"}, "s6": {"s": ["game"], "g": "١–٤", "sk": "التذكر", "ev": "البنغو والصورة المخفية"}, "ch": {"s": ["exit"], "g": "١–٤", "sk": "التقويم الختامي", "ev": "تحدي العلماء"}};
SK.init({key:"g7c3l2",sfx:{pop:()=>SFX.pop(),tick:()=>SFX.tick(),ok:()=>SFX.correct(),no:()=>SFX.wrong()},teams:()=>(G.teams||K.TEAMN.slice(0,4).map((n,i)=>({n,c:K.TEAMC[i]}))).map(t=>({n:t.n,c:t.c})),
 stratRoster:{api:'https://script.google.com/macros/s/AKfycbxp-t4JgGO5WiK6hoacjTyBqFnG-9bSWClplOpVV4VDuTV7T4tY0swB1Ll36kr_djJ7nQ/exec',classes:['1/1','2/1','3/1','4/1']}});
def('plan',{n:'خطة الدرس والاستراتيجيات',after:'goals',eyebrow:'للمعلم والزائر',title:'خطة الدرس: الأهداف والاستراتيجيات والتقويم',goal:'المس أي صف للانتقال إلى محطته، أو شارة الاستراتيجية أعلى المحطة لعرض خطواتها وأدواتها.',plan:1,
 icon:'<rect x="10" y="12" width="60" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M10 28h60M30 28v40" stroke="currentColor" stroke-width="5"/>',body:'<div class="card" id="planBox"></div>',
 init(){const secs=$$('#stations section.st');let k=0;const rows=[];secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;k++;rows.push({i:id,num:k,name:STN[id].n.replace(/^\d+ · /,''),c});});
  $('#planBox').innerHTML=SK.planHTML('',rows);SK.wirePlan($('#planBox'),id=>K.go(id));
  secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;const h=s.querySelector('.st-head');if(h&&!h.querySelector('.stgs')){const b=SK.badges(c);b.style.cssText='display:flex;margin:6px 0 0';h.appendChild(b);}});
  if(!document.getElementById('skfab'))SK.fab('left:14px;bottom:86px');},
 enter(){G.complete('plan');},reset(){},explain:'<p>خطة الدرس: لكل محطة هدفها والاستراتيجية المطبقة ومهارة التفكير وأداة التقويم. الأدوات الصفية: أعواد المثلجات (بأسماء طلاب الفصل من الكشوف)، ومؤقت فكّر-زاوج-شارك، والرؤوس المرقمة.</p>'});
K.boot({chapter:'الفصل الثالث: المادة وتغيراتها',chapterShort:'الفصل الثالث',title:'مختبر التحوّلات',lesson:'الدرس الثاني: الخواص والتغيرات الكيميائية',accent:'#6d28d9',accentDark:'#a78bfa',hook:'أين ذهب الخشب؟',
 riddle:'عندما نحرق الخشب لا يتبقى إلا كومة صغيرة من الرماد. فأين ذهب الخشب؟',predict:{o:['اختفى جزء من الخشب وفنيت كتلته','تحوّل إلى مواد جديدة: رماد وبخار ماء وغازات تصاعدت في الهواء','بقي الخشب كما هو لكنه صار أسود'],a:1},
 answer:'احتراق الخشب تغير كيميائي: يتفاعل الخشب مع الأكسجين فتنتج مواد جديدة هي الرماد وبخار الماء والغازات. والكتلة لم تختفِ؛ فمجموع كتل المواد الناتجة يساوي مجموع كتل المواد المتفاعلة (قانون حفظ الكتلة).',
 finalTitle:'مبارك! أصبحت خبيرًا في التحوّلات الكيميائية',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 91 · <b>تصوّر الأفكار الرئيسة:</b> أكمل الجدول ص 95.',
 concepts:[{n:'الخاصية الكيميائية',t:'ميل المادة لتغير تركيبها بتفاعل كيميائي ينتج مواد جديدة، مثل قابلية الاشتعال.',ic:'<path d="M26 6c8 12 14 18 14 28a14 14 0 0 1-28 0c0-8 5-12 8-17 2 6 6 8 6 8z" fill="var(--accent)"/>'},
  {n:'التغير الكيميائي',t:'تغير في تركيب المادة تنتج عنه مادة أو مواد جديدة.',ic:'<circle cx="14" cy="26" r="8" fill="var(--accent)"/><path d="M24 26h8" stroke="var(--ink)" stroke-width="3"/><circle cx="42" cy="26" r="8" fill="var(--amber)"/>'},
  {n:'الدلائل',t:'غاز، صوت، حرارة أو ضوء، تغير اللون، فقاعات، تغير الرائحة.',ic:'<circle cx="22" cy="22" r="13" fill="none" stroke="var(--accent)" stroke-width="4"/><path d="M32 32l14 14" stroke="var(--accent)" stroke-width="6"/>'},
  {n:'المقارنة',t:'الفيزيائي يمكن إرجاعه ولا ينتج مواد جديدة؛ والكيميائي عكس ذلك.',ic:'<rect x="6" y="12" width="16" height="28" fill="var(--amber)"/><rect x="30" y="12" width="16" height="28" fill="var(--accent)"/>'},
  {n:'قانون حفظ الكتلة',t:'كتلة النواتج = كتلة المتفاعلات.',ic:'<path d="M26 8v36M8 18h36M12 18l-6 14h12zM40 18l-6 14h12z" stroke="var(--accent)" stroke-width="3" fill="none"/>'}]});
})();

