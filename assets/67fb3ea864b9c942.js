
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

/* ===== تجارب افتراضية — مقدمة في الجدول الدوري ===== */
(function(){
const {$,$$,G,STN,def,say,SFX,sortGame}=K;
const num=m=>parseFloat(String(m).replace(/[()]/g,''));
const FAM={1:'#f28b82',2:'#fbbc6b',17:'#a7d58f',18:'#c3a6f2'};

/* ---------- 1) مندليف أم موزلي؟ ---------- */
def('lab1',{after:'s3',n:'🧪 مندليف أم موزلي؟',eyebrow:'تجربة افتراضية · مقترحة',title:'مختبر الترتيب: حسب الكتلة الذرية أم العدد الذري؟',goal:'رتّب أول 54 عنصرًا بطريقة مندليف (الكتلة الذرية) ثم بطريقة موزلي (العدد الذري). المس العناصر التي وقعت في عائلة لا تشبهها.',plan:6,core:1,
 icon:'<rect x="8" y="20" width="18" height="40" rx="3" fill="currentColor"/><rect x="31" y="20" width="18" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="5"/><path d="M54 40h18M64 30l8 10-8 10" stroke="currentColor" stroke-width="5" fill="none"/>',
 body:`<div class="card"><div class="row-actions" id="l1m"><button class="tbtn" type="button" data-m="mass" aria-pressed="true">⚖️ ترتيب مندليف: حسب الكتلة الذرية</button><button class="tbtn" type="button" data-m="z" aria-pressed="false">🔢 ترتيب موزلي: حسب العدد الذري</button></div>
  <div class="stage" id="l1svg" style="padding:6px"></div><div class="c6-leg"><span><i style="background:${FAM[1]}"></i>عائلة الفلزات القلوية (1)</span><span><i style="background:${FAM[2]}"></i>المجموعة 2</span><span><i style="background:${FAM[17]}"></i>الهالوجينات (17)</span><span><i style="background:${FAM[18]}"></i>الغازات النبيلة (18)</span><span>⚠ عنصر في غير عائلته</span></div>
  <p class="hint-line" id="l1h"></p><div id="l1fb"></div></div>
  <div class="card"><h3>ماذا استنتجت؟</h3><div id="l1q"></div></div>`,
 init(){const BASE=PT.EL.slice(0,54);let mode='mass',found=new Set();
  const slots=BASE.map(e=>({p:e.p,g:e.g}));
  const order=()=>mode==='z'?BASE:[...BASE].sort((a,b)=>num(a.m)-num(b.m));
  function draw(){const O=order(),cw=38,ch=40,x0=10,y0=22;let s=`<svg viewBox="0 0 ${x0*2+18*cw} ${y0+5*ch+8}" style="direction:ltr" role="img" aria-label="ترتيب العناصر">`;
   [1,2,17,18].forEach(g=>s+=`<rect x="${x0+(g-1)*cw}" y="2" width="${cw-2}" height="16" rx="3" fill="${FAM[g]}"/><text x="${x0+(g-1)*cw+cw/2-1}" y="14" text-anchor="middle" font-size="10" font-weight="700" fill="#0f172a">${g}</text>`);
   O.forEach((e,i)=>{const sl=slots[i],x=x0+(sl.g-1)*cw,y=y0+(sl.p-1)*ch,bad=e.g!==sl.g,f=FAM[e.g]||'#e2e8f0';
    s+=`<g class="l1t" data-z="${e.z}" data-bad="${bad?1:0}" style="cursor:pointer"><rect x="${x+1}" y="${y+1}" width="${cw-3}" height="${ch-3}" rx="4" fill="${f}" stroke="${found.has(e.z)?'#dc2626':'#475569'}" stroke-width="${found.has(e.z)?3:.8}"/><text x="${x+cw/2-1}" y="${y+19}" text-anchor="middle" font-size="13" font-weight="800" fill="#0f172a">${e.s}</text><text x="${x+cw/2-1}" y="${y+32}" text-anchor="middle" font-size="8.5" fill="#0f172a">${mode==='z'?e.z:num(e.m).toFixed(1)}</text>${found.has(e.z)?`<text x="${x+cw-8}" y="${y+12}" font-size="11">⚠</text>`:''}</g>`;});
   $('#l1svg').innerHTML=s+'</svg>';
   $('#l1h').textContent=mode==='z'?'الرقم أسفل كل رمز هو العدد الذري. هل بقي عنصر في غير عائلته؟':'الرقم أسفل كل رمز هو الكتلة الذرية. ابحث عن 6 عناصر وقعت في عمود لا يشبه خصائصها (3 أزواج).';
   $$('#l1svg .l1t').forEach(t=>t.onclick=()=>{const z=+t.dataset.z,e=PT.EL[z-1];
    if(t.dataset.bad==='1'){if(!found.has(z)){found.add(z);G.good();G.add(4,'lab1');}draw();say($('#l1fb'),'ok',`<b>${e.n} (${e.s})</b> وقع في عمود غير عمود عائلته. وجدت ${found.size} من 6.`+(found.size>=6?' أحسنت! انتقل الآن إلى ترتيب موزلي.':''));}
    else{SFX.tick();say($('#l1fb'),'info',`${e.n} (${e.s}) في مكانه الصحيح: الدورة ${e.p}، المجموعة ${e.g}.`);}});}
  $$('#l1m [data-m]').forEach(b=>b.onclick=()=>{mode=b.dataset.m;$$('#l1m [data-m]').forEach(x=>x.setAttribute('aria-pressed',x===b));SFX.whoosh&&SFX.whoosh();draw();
   if(mode==='z'){say($('#l1fb'),'ok','في ترتيب موزلي عاد كل عنصر إلى عائلته: البوتاسيوم مع الفلزات القلوية، والأرجون مع الغازات النبيلة، واليود مع الهالوجينات.');if(found.size>=6)G.complete('lab1');}});
  draw();
  K.mcq($('#l1q'),{q:'لماذا يُعدّ ترتيب موزلي أدق من ترتيب مندليف؟',o:['لأن الترتيب حسب العدد الذري يضع كل عنصر في عائلة تشبه خصائصه','لأن الكتلة الذرية لا تُقاس','لأن موزلي اكتشف كل العناصر','لأن الترتيب حسب الكتلة يجعل الجدول أصغر'],a:0,why:'الكتلة الذرية لا تتزايد دائمًا مع العدد الذري: الأرجون (39.948) أثقل من البوتاسيوم (39.098)، والتيلوريوم (127.60) أثقل من اليود (126.904).'},'lab1',()=>G.complete('lab1'));},
 explain:'<p>تجربة مقترحة توضح لماذا «كان بعض العناصر يبدو خارج مكانه» في جدول مندليف: ثلاثة أزواج تنعكس فيها الكتلة الذرية: Ar/K وCo/Ni وTe/I.</p>'});

/* ---------- 2) مستكشف الجدول الدوري ---------- */
const MIS=[['اعثر على عنصر في الدورة 3 والمجموعة 17.',e=>e.p===3&&e.g===17],['اعثر على الفلز السائل عند درجة حرارة الغرفة.',e=>e.s==='Hg'],['اعثر على اللافلز السائل عند درجة حرارة الغرفة.',e=>e.s==='Br'],['اعثر على شبه فلز في الدورة 3.',e=>e.p===3&&e.c==='d'],['اعثر على عنصر مُصنَّع في الدورة 5.',e=>e.s==='Tc'],['اعثر على العنصر الذي عدده الذري 57 وتتبعه اللانثانيدات.',e=>e.z===57]];
def('lab2',{after:'s5',n:'🧪 مستكشف الجدول',eyebrow:'تجربة افتراضية · مقترحة',title:'مستكشف مدينة العناصر: 118 بيتًا',goal:'لوّن الجدول بطرق مختلفة، والمس أي عنصر لتقرأ مفتاحه وموقعه. ثم أنجز مهمات المستكشف.',plan:7,core:1,
 icon:'<rect x="8" y="14" width="64" height="52" rx="4" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="46" cy="40" r="10" fill="none" stroke="currentColor" stroke-width="4"/><path d="M53 47l9 9" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="card"><div class="row-actions" id="l2m"><button class="tbtn" type="button" data-m="cat" aria-pressed="true">فلز / لا فلز / شبه فلز</button><button class="tbtn" type="button" data-m="reg" aria-pressed="false">المناطق</button><button class="tbtn" type="button" data-m="st" aria-pressed="false">الحالة في درجة حرارة الغرفة</button><button class="tbtn" type="button" data-m="syn" aria-pressed="false">طبيعي أم مُصنَّع</button></div>
  <div class="stage" id="l2pt" style="padding:6px"></div><div id="l2leg"></div></div>
  <div class="two"><div class="card"><h3>بطاقة العنصر</h3><div id="l2card" class="c6-key"><p class="step-text muted">المس عنصرًا في الجدول.</p></div></div>
   <div class="card"><h3>🧭 مهمات المستكشف <span class="cnt-badge" id="l2cnt">0/${MIS.length}</span></h3><p class="step-text" id="l2mis"></p><div id="l2fb"></div></div></div>`,
 init(){let mode='cat',sel=null,k=0;
  const draw=()=>{$('#l2pt').innerHTML=PT.ptSVG({mode,sel});$('#l2leg').innerHTML=PT.legend(mode);$$('#l2pt .pt-el').forEach(g=>g.onclick=()=>pick(+g.dataset.z));};
  const mis=()=>{$('#l2mis').innerHTML=k<MIS.length?`<b>المهمة ${k+1}:</b> ${MIS[k][0]}`:'🎉 أنجزت كل المهمات!';$('#l2cnt').textContent=`${k}/${MIS.length}`;};
  function pick(z){sel=z;const e=PT.EL[z-1];draw();SFX.pop();
   $('#l2card').innerHTML=`<div>${PT.keyBox(e)}</div><ul class="step-text" style="margin:0;line-height:1.9"><li><b>${e.n}</b> (${e.s})</li><li>العدد الذري: ${e.z} · الكتلة الذرية: ${e.m}</li><li>${e.f!=null?(e.p===6?'سلسلة اللانثانيدات':'سلسلة الأكتنيدات'):`الدورة ${e.p} · المجموعة ${e.g}`}</li><li>المنطقة: العناصر ال${e.reg==='انتقالية داخلية'?'انتقالية الداخلية':e.reg}</li><li>التصنيف: ${PT.CAT[e.c]}</li><li>الحالة: ${PT.ST[e.st]} · ${e.syn?'مُصنَّع':'طبيعي'}</li></ul>`;
   if(k<MIS.length){if(MIS[k][1](e)){G.good();G.add(5,'lab2');say($('#l2fb'),'ok',`صحيح: ${e.n}.`);k++;mis();if(k===MIS.length){G.complete('lab2');K.banner&&K.banner('مستكشف ماهر!','أنجزت كل مهمات مدينة العناصر');}}else say($('#l2fb'),'info','ليس هو. اقرأ بطاقة العنصر وحاول مرة أخرى.');}}
  $$('#l2m [data-m]').forEach(b=>b.onclick=()=>{mode=b.dataset.m;$$('#l2m [data-m]').forEach(x=>x.setAttribute('aria-pressed',x===b));SFX.tick();draw();});
  draw();mis();},
 explain:'<p>مستكشف مقترح لكل العناصر الـ118: التصنيف والمناطق والحالة والطبيعي والمصنّع. العناصر 113–118 خواصها غير مؤكدة لأنها لم تُحضَّر إلا بكميات ضئيلة جدًّا.</p>'});

/* ---------- 3) مختبر الفلزات واللافلزات ---------- */
const SM=[{id:'fe',n:'الحديد',c:0,col:'#8a949b',lus:'لامع (يعكس الضوء)',L:1,cond:2,ham:'يتسطح إلى صفيحة'},
 {id:'cu',n:'النحاس',c:0,col:'#c7743e',lus:'لامع (يعكس الضوء)',L:1,cond:2,ham:'يتسطح إلى صفيحة'},
 {id:'al',n:'الألومنيوم',c:0,col:'#c9d1d6',lus:'لامع (يعكس الضوء)',L:1,cond:2,ham:'يتسطح إلى صفيحة'},
 {id:'s',n:'الكبريت',c:1,col:'#e8d23a',lus:'باهت',L:0,cond:0,ham:'يتفتت (هش)'},
 {id:'p',n:'الفوسفور الأحمر',c:1,col:'#b0362c',lus:'باهت',L:0,cond:0,ham:'يتفتت (هش)'},
 {id:'si',n:'السيليكون',c:2,col:'#6b7a8c',lus:'لامع قليلًا',L:.5,cond:1,ham:'يتكسر (هش)'},
 {id:'ge',n:'الجرمانيوم',c:2,col:'#9aa3ab',lus:'لامع قليلًا',L:.5,cond:1,ham:'يتكسر (هش)'}];
const CND=['لا يوصل (المصباح لا يضيء)','يوصل بدرجة أقل (المصباح خافت)','موصل جيد (المصباح مضيء)'];
def('lab3',{after:'s8',n:'🧪 مختبر الخواص',eyebrow:'تجربة افتراضية · مقترحة',title:'مختبر الخواص: لمعان، توصيل، طَرق',goal:'اختر عينة، ثم أجرِ عليها الاختبارات الثلاثة، وصنّفها: فلز أم لا فلز أم شبه فلز؟',plan:7,core:1,
 icon:'<path d="M18 62l22-22M40 40l12-12 10 10-12 12z" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="20" cy="24" r="8" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l3svg" viewBox="0 0 640 300" aria-label="طاولة المختبر"></svg>
   <div class="toolbar" id="l3tools" style="grid-template-columns:repeat(3,minmax(0,1fr))"><button type="button" class="tool" data-t="lus"><span style="font-size:1.5rem">🔦</span><span>اختبار اللمعان</span></button><button type="button" class="tool" data-t="cond"><span style="font-size:1.5rem">🔋</span><span>دائرة التوصيل</span></button><button type="button" class="tool" data-t="ham"><span style="font-size:1.5rem">🔨</span><span>اختبار الطرق</span></button></div></div>
  <div class="side"><div class="card"><h3>العينات</h3><div class="c6-chips" id="l3s"></div><div id="l3out" class="step-text"></div><div id="l3cls"></div></div></div></div>
  <div class="card"><div class="nb-head"><h2>سجل الاختبارات</h2><span id="l3cnt"></span></div><div class="tablewrap"><table class="c6-table" id="l3t"></table></div><p class="hint-line">احذر: لا تُجرى هذه الاختبارات على الفوسفور في المختبر المدرسي؛ التجربة هنا افتراضية.</p></div>`,
 init(){let cur=SM[0],rec={},fx='',cls={};
  const draw=()=>{const o=cur;let s=`<rect width="640" height="300" fill="var(--wall)"/><rect y="236" width="640" height="12" fill="var(--bench-top)"/><rect y="248" width="640" height="52" fill="var(--bench)"/>`;
   s+=`<g transform="translate(320 200)"><ellipse cx="0" cy="34" rx="70" ry="9" fill="rgba(0,0,0,.2)"/><path d="M-60 30 L-40 -10 L10 -24 L58 -4 L62 30z" fill="${o.col}"/>${o.L?`<path d="M-30 -2 L20 -16" stroke="#fff" stroke-width="${o.L*7}" opacity=".7" stroke-linecap="round"/>`:''}</g><text x="320" y="292" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-size="16" font-weight="700" fill="#fff">${o.n}</text>`;
   $('#l3svg').innerHTML=s+fx;};
  const table=()=>{$('#l3t').innerHTML=`<thead><tr><th>العينة</th><th>اللمعان</th><th>التوصيل الكهربائي</th><th>الطرق</th><th>التصنيف</th></tr></thead><tbody>${SM.map(o=>{const r=rec[o.id]||{};return `<tr><td>${o.n}</td><td>${r.lus||'—'}</td><td>${r.cond||'—'}</td><td>${r.ham||'—'}</td><td>${cls[o.id]||'—'}</td></tr>`;}).join('')}</tbody>`;$('#l3cnt').textContent=`صُنِّف ${Object.keys(cls).length} من ${SM.length}`;};
  const chips=()=>{$('#l3s').innerHTML=SM.map(o=>`<button type="button" class="c6-chip" data-s="${o.id}" aria-pressed="${o===cur}">${cls[o.id]?'✓ ':''}${o.n}</button>`).join('');$$('#l3s [data-s]').forEach(b=>b.onclick=()=>{cur=SM.find(x=>x.id===b.dataset.s);fx='';SFX.tick();chips();draw();out();});};
  const out=()=>{const r=rec[cur.id]||{};$('#l3out').innerHTML=`<b>${cur.n}</b>: ${['lus','cond','ham'].filter(k=>r[k]).length}/3 اختبارات.`;
   const C=$('#l3cls');if(['lus','cond','ham'].every(k=>r[k])&&!cls[cur.id]){C.innerHTML=`<p class="q">صنّف ${cur.n}:</p><div class="c6-chips">${['فلز','لا فلز','شبه فلز'].map((t,i)=>`<button type="button" class="c6-chip" data-c="${i}">${t}</button>`).join('')}</div><div class="qfb"></div>`;
    const Q=C.querySelector('.qfb'),me=cur;C.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{if(cls[me.id]||me!==cur)return;const i=+b.dataset.c;if(i===cur.c){cls[cur.id]=b.textContent;G.good();G.add(6,'lab3');table();chips();out();if(Object.keys(cls).length===SM.length){G.complete('lab3');K.banner&&K.banner('أنهيت مختبر الخواص','صنّفت العينات السبع بالأدلة');}}else{G.bad();say(Q,'bad','راجع نتائج الاختبارات الثلاثة في السجل.');}});}
   else if(!cls[cur.id])C.innerHTML='';else C.innerHTML=`<div class="fb ok">${cur.n}: ${cls[cur.id]}</div>`;};
  $$('#l3tools [data-t]').forEach(b=>b.onclick=()=>{const t=b.dataset.t,o=cur;rec[o.id]=rec[o.id]||{};
   if(t==='lus'){rec[o.id].lus=o.lus;fx=`<g><circle cx="120" cy="80" r="22" fill="#fde047"/><path d="M140 90 L300 180" stroke="#fde047" stroke-width="10" opacity=".6"/>${o.L?`<path d="M330 180 L500 70" stroke="#fde047" stroke-width="${o.L*10}" opacity=".7"/><circle cx="505" cy="66" r="${o.L*16}" fill="#fef9c3" opacity=".8"/>`:''}</g>`;SFX.pop();}
   if(t==='cond'){rec[o.id].cond=CND[o.cond];const gl=['#334155','#fbbf24','#fde047'][o.cond];fx=`<g><rect x="70" y="120" width="60" height="34" rx="5" fill="#1e293b"/><text x="100" y="142" text-anchor="middle" font-size="13" fill="#fff">+ −</text><path d="M130 137 H260 V200 M380 200 V60 H130 V120" fill="none" stroke="#475569" stroke-width="4"/><circle cx="260" cy="60" r="0"/><g transform="translate(200 60)">${o.cond?`<circle r="${o.cond*22}" fill="${gl}" opacity=".45"/>`:''}<circle r="16" fill="${o.cond?gl:'#e2e8f0'}" stroke="#475569" stroke-width="3"/></g><circle cx="260" cy="200" r="6" fill="#111"/><circle cx="380" cy="200" r="6" fill="#111"/></g>`;o.cond===2?SFX.correct():SFX.tick();}
   if(t==='ham'){rec[o.id].ham=o.ham;fx=o.c===0?`<g><rect x="230" y="40" width="80" height="34" rx="6" fill="#64748b"/><rect x="300" y="50" width="120" height="12" rx="5" fill="#92400e"/><rect x="240" y="226" width="160" height="10" rx="3" fill="${o.col}"/></g>`:`<g><rect x="230" y="40" width="80" height="34" rx="6" fill="#64748b"/><rect x="300" y="50" width="120" height="12" rx="5" fill="#92400e"/>${[...Array(9)].map((_,i)=>`<path d="M${250+i*16} ${226-(i%3)*8} l8 -6 l6 8z" fill="${o.col}"/>`).join('')}</g>`;SFX.thud?SFX.thud():SFX.pop();}
   draw();table();out();});
  chips();draw();table();out();},
 explain:'<p>مختبر مقترح: الفلزات لامعة وموصلة جيدة وقابلة للطرق، واللافلزات باهتة ورديئة التوصيل وهشة، وأشباه الفلزات لامعة قليلًا وتوصل بدرجة أقل من الفلزات وهشة.</p>'});
})();

/*@include lab13.js*/
/*@include pt.js*/
/*@include skit.js*/
/* ===== الفصل السادس · الدرس الأول: مقدمة في الجدول الدوري — «خريطة مدينة العناصر» ===== */
(function(){
const {$,$$,G,STN,def,mcq,flips,match,sortGame,challenge,say,SFX,pic,slides,anticip,escape,bingo,riddles,race,choiceBoard,solutions,tfRound}=K;
const P=(n,c)=>[n,c];
const ICO={doc:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
 grid:'<rect x="8" y="14" width="64" height="52" rx="4" fill="none" stroke="currentColor" stroke-width="5"/><path d="M8 32h64M8 49h64M29 14v52M51 14v52" stroke="currentColor" stroke-width="4"/>',
 tile:'<rect x="14" y="12" width="52" height="56" rx="8" fill="none" stroke="currentColor" stroke-width="6"/><text x="40" y="52" text-anchor="middle" font-size="28" font-weight="800" fill="currentColor">H</text>',
 check:'<rect x="14" y="8" width="52" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30l6 6 12-12M24 54l6 6 12-12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>'};

/* ================= INTRO ================= */
def('intro',{n:'الافتتاحية',plan:3,icon:'<rect x="10" y="10" width="26" height="26" rx="4" fill="currentColor"/><rect x="44" y="10" width="26" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="5"/><rect x="10" y="44" width="26" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="5"/><rect x="44" y="44" width="26" height="26" rx="4" fill="currentColor"/>',
 body:`<div class="hero"><div class="hero-photo">${pic('s12_a9a96fe8','لوحة الجدول الدوري للعناصر')}<span class="cap">الجدول الدوري: خريطة تضم كل العناصر المعروفة.</span></div>
  <div><span class="eyebrow">خريطة مدينة العناصر</span><h2 class="hero-h">118 عنصرًا… فكيف نجد أي واحد منها؟</h2>
   <p class="riddle">تخيّل مدينة فيها 118 بيتًا، لكل بيت ساكن له صفاته. لو وُزّعت البيوت عشوائيًّا لصعب الوصول إلى أي ساكن. فكيف رتّب العلماء «بيوت» العناصر بحيث نعرف صفات العنصر من مكانه؟</p>
   <p class="q">ما توقعك قبل أن تبدأ الجولة؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div>`,
 init(){}
});

/* ================= توجيه القراءة ================= */
def('fold',{n:'توجيه القراءة',eyebrow:'نشاط صفي · خمس دقائق · الكتاب صفحة 177',title:'توجيه القراءة وتركيزها: تطوّر الجدول الدوري',goal:'سجّل رأيك (م = موافق، غ م = غير موافق) في كل عبارة قبل القراءة، ثم عُد إليها بعد دروس الفصل.',plan:4,
 icon:ICO.doc,body:`<div class="card"><div id="foldAg"></div></div>`,
 init(){anticip($('#foldAg'),[
  ['اكتشف العلماء كلَّ العناصر التي كان يحتمل وجودها.',false,'ما زال البحث عن عناصر جديدة مستمرًّا حتى يومنا هذا، وبعضها يُصنَّع في المختبر.'],
  ['ترتب العناصر في الجدول الدوري وفقًا لأعدادها الذرية وأعدادها الكتليّة.',false,'ترتب العناصر في الجدول الدوري الحديث حسب تزايد أعدادها الذرية فقط.'],
  ['لعناصر المجموعة الواحدة خصائص متشابهة.',true],
  ['تقع الفلزات في الجهة اليمنى من الجدول الدوري.',false,'تقع الفلزات في الجهة اليسرى من الجدول الدوري، واللافلزات في الجهة اليمنى.'],
  ['عندما يُكتشف عنصر جديد يتم تسميته وفق نظام التسمية الذي وضعه الاتحاد العالمي للكيمياء البحتة والتطبيقية "الأيوباك" IUPAC.',true],
  ['الفلزات فقط توصل الكهرباء.',false,'أشباه الفلزات توصل الكهرباء أيضًا ولكن بدرجة أقل من الفلزات.'],
  ['نادرًا ما تتحد الغازات النبيلة مع غيرها من العناصر.',true],
  ['تتكوّن العناصر الانتقالية من فلزات ولافلزات وأشباه فلزات.',false,'العناصر الانتقالية جميعها فلزات.'],
  ['يمكن تصنيع بعض العناصر في المختبر.',true]]);},
 enter(){G.complete('fold');},reset(){STN.fold.init();},explain:'<p>عبارات «توجيه القراءة وتركيزها» ص 177 كما في العرض، وهي تخص الفصل كله: يسجّل الطالب رأيه قبل القراءة ويعود إليها بعد الدروس الثلاثة.</p>'});

/* ================= GOALS ================= */
const GOALS=['تصف تاريخ الجدول الدوري.','تفسّر المقصود بمفتاح العنصر.','توضح كيفية تنظيم الجدول الدوري.'];
const TERMS=[
 {t:'العنصر',d:'مادة لا يمكن تجزئتها إلى مواد أبسط. (مراجعة المفردات)'},
 {t:'الدورة',d:'صف أفقي في الجدول الدوري يحتوي على عناصر تتغير خصائصها بشكل تدريجي يمكن توقعه.'},
 {t:'المجموعة',d:'عناصر العمود الواحد في الجدول الدوري، وتتشابه في خصائصها الفيزيائية والكيميائية.'},
 {t:'العناصر الممثلة',d:'عناصر المجموعتين 1 و2 والمجموعات 13–18، وفيها فلزات ولافلزات وأشباه فلزات.'},
 {t:'العناصر الانتقالية',d:'العناصر في المجموعات 3–12، وجميعها فلزات.'},
 {t:'الفلزات',d:'عناصر لامعة، موصلة جيدة للحرارة والكهرباء، قابلة للطرق والسحب، صلبة عدا الزئبق.'},
 {t:'اللافلزات',d:'عناصر غازية أو صلبة هشة عند درجة حرارة الغرفة، رديئة التوصيل للحرارة والكهرباء.'},
 {t:'أشباه الفلزات',d:'العناصر التي تقع بين الفلزات واللافلزات، وتشترك في بعض صفاتها مع الفلزات وفي بعضها مع اللافلزات.'}];
def('goals',{n:'الأهداف والمفردات',eyebrow:'الكتاب صفحة 178',title:'خريطة الجولة: الأهداف والمفردات',goal:'تعرّف أهداف الدرس وأهميته، ثم المفردات الجديدة.',plan:4,
 icon:ICO.doc,body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol>
   <div class="story mt"><b>أهمية الدرس:</b> يُسهّل عليك الجدول الدوري الحصول على معلومات حول كل عنصر.</div></div>
  <div class="card"><h3>مراجعة المفردات</h3><p class="step-text"><b>العنصر:</b> مادة لا يمكن تجزئتها إلى مواد أبسط.</p><h3 class="mt">المفردات الجديدة</h3><ul class="tasks plain"><li>الدورة</li><li>المجموعة</li><li>العناصر الممثلة</li><li>العناصر الانتقالية</li><li>الفلزات</li><li>اللافلزات</li><li>أشباه الفلزات</li></ul></div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المفردات</h2><span>المس البطاقة لترى التعريف</span></div><div id="g13flips"></div></div>
  <div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2><span>اختر المصطلح ثم تعريفه</span></div><div id="g13match"></div></div>`,
 init(){flips($('#g13flips'),TERMS);this.reset();},
 reset(){match($('#g13match'),TERMS.slice(1).map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));},
 explain:'<p>الأهداف والأهمية والمفردات كما في العرض (ص 178).</p>'});

/* ================= S1: لماذا ندرس الجدول + تطوره ================= */
const TL=[['عرف الناس في الحضارات القديمة الذهب والفضة والنحاس والقصدير والحديد، وصنعوا منها النقود والأدوات.',0],['بدأ الكيميائيون في القرن التاسع عشر البحث عن عناصر جديدة.',1],['تمكّن العلماء عام 1830م من فصل 55 عنصرًا وتسميتها.',2],['نشر مندليف أول نسخة من جدوله الدوري عام 1869م.',3],['أدرك موزلي قبل أن يتم 27 عامًا من عمره أن الجدول يتحسن إذا رُتّبت العناصر حسب أعدادها الذرية.',4],['ما زال البحث عن عناصر جديدة مستمرًّا حتى يومنا هذا.',5]];
def('s1',{n:'1 · تطوّر الجدول الدوري',eyebrow:'المحطة 1 · بوابة المدينة · الكتاب صفحة 178',title:'لماذا ندرس الجدول الدوري؟ وكيف تطوّر؟',goal:'يُسهّل علينا الجدول الدوري الحصول على معلومات حول كل عنصر. تتبّع رحلة اكتشاف العناصر.',plan:6,core:1,
 icon:'<circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" stroke-width="6"/><path d="M40 22v20l12 8" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="none"/>',
 body:`<div class="card" id="s1sl"></div><div class="card"><div class="nb-head"><h2>⏳ آلة الزمن</h2><span>رتّب الأحداث من الأقدم إلى الأحدث</span></div><div id="s1tl"></div></div>`,
 init(){slides($('#s1sl'),[
   {k:'لماذا ندرس الجدول الدوري؟',t:'خريطة المعلومات',im:[P('s06_238e1db1','الجدول الدوري')],html:'<p class="lead"><b>يُسهّل عليك الجدول الدوري الحصول على معلومات حول كل عنصر.</b></p><p>فمن موقع العنصر في الجدول نعرف إن كان فلزًّا أو لافلزًّا أو شبه فلز، ونتوقع كثيرًا من خصائصه.</p>'},
   {k:'تطور الجدول الدوري',t:'من الحضارات القديمة',im:[P('s07_31c40d3d','قطع نقدية قديمة'),P('s07_51741b0f','أدوات قديمة')],html:'<p>عرف الناس في الحضارات القديمة بعض المواد التي تُسمّى عناصر، فصنعوا القطع النقدية والمجوهرات من الذهب والفضة، كما صنعوا الأدوات والأسلحة من النحاس والقصدير والحديد.</p>'},
   {k:'تطور الجدول الدوري',t:'البحث عن عناصر جديدة',im:[P('s07_487a7473','رموز العناصر قديمًا'),P('s07_e606ddd4','مندليف ومختبره')],html:'<p>وبدأ الكيميائيون في القرن التاسع عشر البحث عن عناصر جديدة، حتى تمكّنوا عام 1830م من فصل وتسمية 55 عنصرًا.</p><p>وما زال البحث عن عناصر جديدة مستمرًّا حتى يومنا هذا.</p>'}],'s1');
  const box=$('#s1tl');let order=K.shuffle(TL.map((_,i)=>i)),sel=null;
  const draw=()=>{box.innerHTML=`<ol class="tasks plain" style="padding:0">${order.map((k,i)=>`<li style="list-style:none;margin:6px 0"><button type="button" class="c6-chip" data-i="${i}" style="width:100%;text-align:start;border-radius:12px" aria-pressed="${sel===i}">${TL[k][0]}</button></li>`).join('')}</ol><p class="hint-line">المس حدثًا ثم حدثًا آخر لتبديل مكانيهما.</p><div class="row-actions"><button class="btn" type="button" data-chk>تحقق من الترتيب</button></div><div class="qfb"></div>`;
   box.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(sel==null){sel=i;G.tick();}else{[order[sel],order[i]]=[order[i],order[sel]];sel=null;SFX.pop();}draw();});
   box.querySelector('[data-chk]').onclick=()=>{const fb=box.querySelector('.qfb');const ok=order.every((k,i)=>TL[k][1]===i);if(ok){G.good();G.add(10,'s1');say(fb,'ok','ترتيب صحيح! المعرفة العلمية تراكمية: كل جيل يبني على من سبقه.');G.complete('s1');}else{G.bad();const r=order.filter((k,i)=>TL[k][1]===i).length;say(fb,'bad',`${r} من ${TL.length} في مكانها الصحيح. حاول مرة أخرى.`);}};};
  draw();},
 quiz:[{q:'لماذا ندرس الجدول الدوري؟',o:['لأنه يُسهّل الحصول على معلومات حول كل عنصر','لحفظ أسماء العناصر فقط','لمعرفة أسعار الفلزات','لأنه يحتوي على المركبات'],a:0},{q:'كم عنصرًا تمكّن العلماء من فصله وتسميته بحلول عام 1830م؟',o:['18','55','92','118'],a:1}],
 explain:'<p>عرف الإنسان قديمًا الذهب والفضة والنحاس والقصدير والحديد، وبدأ البحث المنظم عن العناصر في القرن التاسع عشر حتى عُرف 55 عنصرًا عام 1830م، والبحث مستمر حتى اليوم.</p>'});

/* ================= S2: مندليف ================= */
def('s2',{n:'2 · جدول مندليف',eyebrow:'المحطة 2 · مكتب المخطِّط الأول · الكتاب صفحة 178',title:'جدول مندليف للعناصر',goal:'كيف رتّب مندليف العناصر؟ ولماذا ترك فراغات في جدوله؟',plan:6,core:1,
 icon:'<rect x="10" y="10" width="60" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="5"/><path d="M10 30h60M10 50h60M30 10v60M50 10v60" stroke="currentColor" stroke-width="3"/><rect x="31" y="31" width="18" height="18" fill="currentColor" opacity=".35"/>',
 body:`<div class="card" id="s2sl"></div><div class="two"><div class="card"><h3>سؤال</h3><div id="s2q"></div></div><div class="card"><h3>تحدَّ نفسك: لماذا ترك فراغات؟</h3><div id="s2q2"></div></div></div>`,
 init(){slides($('#s2sl'),[
   {k:'جدول مندليف',t:'1869م',im:[P('s08_71da7106','مسودة جدول مندليف وطابع تذكاري'),P('s08_27a183ff','مندليف')],html:'<p>نشر العالم الروسي ديمتري مندليف عام 1869م النسخة الأولى من جدوله الدوري، وقد رتّب العناصر <b>حسب تزايد أعدادها الكتلية</b>.</p><p>وقد لاحظ مندليف النمطية في الترتيب؛ حيث يكون للعناصر التي في مجموعة واحدة خصائص متشابهة.</p>'},
   {k:'جدول مندليف',t:'فراغات لعناصر مجهولة',im:[P('s08_71da7106','مسودة جدول مندليف')],html:'<p>إلا أنه في ذلك الوقت لم تكن جميع العناصر معروفة، فكان عليه أن يترك <b>ثلاثة فراغات</b> في جدوله لعناصر كانت مجهولة؛ فقد توقّع خصائص هذه العناصر المجهولة.</p><p>وقد شجعت توقعاته الكيميائيين على البحث عن هذه العناصر، فاكتُشفت العناصر الثلاثة خلال 15 سنة، وهي: <b>الجاليوم والسكانديوم والجرمانيوم</b>.</p>'}],'s2');
  mcq($('#s2q'),{q:'رتّب العالم مندليف العناصر في الجدول الدوري، حسب:',o:['التزايد في أعدادها الذرية','التناقص في أعدادها الذرية','التناقص في أعدادها الكتلية','التزايد في أعدادها الكتلية'],a:3,why:'رتّب مندليف العناصر حسب التزايد في أعدادها الكتلية.'},'s2');
  mcq($('#s2q2'),{q:'ما العناصر الثلاثة التي ترك لها مندليف فراغات، ثم اكتُشفت خلال 15 سنة؟',o:['الجاليوم والسكانديوم والجرمانيوم','الذهب والفضة والنحاس','الهيليوم والنيون والأرجون','الصوديوم والبوتاسيوم والليثيوم'],a:0,why:'توقّع مندليف خصائصها قبل اكتشافها، فشجّع ذلك الكيميائيين على البحث عنها.'},'s2',()=>G.complete('s2'));},
 quiz:[{q:'متى نشر مندليف النسخة الأولى من جدوله الدوري؟',o:['1830م','1869م','1913م','1978م'],a:1}],
 explain:'<p>رتّب مندليف العناصر حسب تزايد كتلها الذرية، ولاحظ تشابه خصائص عناصر المجموعة الواحدة، وترك ثلاثة فراغات لعناصر توقع خصائصها: الجاليوم والسكانديوم والجرمانيوم.</p>'});

/* ================= S3: موزلي ================= */
def('s3',{n:'3 · إسهامات موزلي',eyebrow:'المحطة 3 · مكتب المصحِّح · الكتاب صفحة 179',title:'إسهامات موزلي',goal:'بعض العناصر في جدول مندليف بدت خارج مكانها الصحيح. كيف حلّ موزلي المشكلة؟',plan:6,core:1,
 icon:'<circle cx="40" cy="26" r="13" fill="none" stroke="currentColor" stroke-width="5"/><path d="M16 70c2-14 12-22 24-22s22 8 24 22" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="card" id="s3sl"></div><div class="two"><div class="card"><h3>سؤال 1</h3><div id="s3q1"></div></div><div class="card"><h3>سؤال 2</h3><div id="s3q2"></div></div></div>`,
 init(){let a=0;const chk=()=>{if(++a>=2)G.complete('s3');};
  slides($('#s3sl'),[{k:'إسهامات موزلي',t:'الترتيب حسب العدد الذري',im:[P('s10_3434d129','الفيزيائي هنري موزلي'),P('s10_cf96943f','جدول مندليف')],html:'<p>رغم أنّ معظم العناصر المكتشفة رُتّبت بشكل صحيح في جدول مندليف إلا أن بعضها كان يبدو خارج مكانه الصحيح.</p><p>وفي مطلع القرن العشرين <b>أدرك الفيزيائي الإنجليزي هنري موزلي</b> قبل أن يتم 27 عامًا من عمره أنه يمكن تحسين وتطوير جدول مندليف إذا رُتّبت العناصر <b>حسب أعدادها الذرية</b> وليس حسب كتلها الذرية.</p><p>وعندما عدّل موزلي الجدول الدوري تبعًا للتزايد في عدد البروتونات في النواة تبيّن له أن هناك الكثير من العناصر التي لم تكتشف بعد.</p>'}],'s3');
  mcq($('#s3q1'),{q:'رتّب العالم موزلي العناصر في الجدول الدوري، حسب:',o:['التزايد في أعدادها الذرية','التزايد في عدد الإلكترونات','التناقص في أعدادها الكتلية','التزايد في أعدادها الكتلية'],a:0,why:'العدد الذري = عدد البروتونات في النواة.'},'s3',chk);
  mcq($('#s3q2'),{q:'رتّب العالم ........ العناصر في جدوله الدوري حسب التزايد في العدد الذري للعناصر.',o:['دوبرنير','جول','مندليف','موزلي'],a:3},'s3',chk);},
 quiz:[{q:'ما الفرق بين ترتيب مندليف وترتيب موزلي؟',o:['مندليف حسب الكتلة الذرية، وموزلي حسب العدد الذري','كلاهما حسب الكتلة الذرية','مندليف حسب العدد الذري، وموزلي حسب الكتلة','كلاهما حسب الحالة الفيزيائية'],a:0}],
 explain:'<p>رتّب موزلي العناصر حسب تزايد العدد الذري (عدد البروتونات)، فعادت العناصر التي بدت خارج مكانها إلى مواقعها الصحيحة، وتبيّن وجود عناصر لم تكتشف بعد.</p>'});

/* ================= S4: الجدول الدوري الحديث ================= */
def('s4',{n:'4 · الجدول الحديث',eyebrow:'المحطة 4 · شوارع وأحياء · الكتاب صفحة 179',title:'الجدول الدوري الحديث: الدورات والمجموعات',goal:'الدورة «شارع أفقي» والمجموعة «عمود عائلة». المس أي رقم دورة أو مجموعة لإبرازها.',plan:7,core:1,
 icon:ICO.grid,
 body:`<div class="two"><div class="card"><h3>الجدول الدوري الحديث</h3><p class="step-text">تم ترتيب العناصر في الجدول الدوري الحديث حسب تزايد أعدادها الذرية. وقد وُضعت العناصر في <b>سبع دورات</b> مرقمة (1–7).</p><p class="def"><b>الدورة Period:</b> صفّ أفقي في الجدول الدوري يحتوي على عناصر تتغير خصائصها بشكل تدريجي يمكن توقعه.</p><p class="step-text">كما يتكوّن الجدول الدوري من <b>18 عمودًا</b>، وكل عمود يتكوّن من مجموعة أو عائلة من العناصر.</p><p class="def"><b>المجموعة Group:</b> عناصر العمود الواحد، وتتشابه في خصائصها الفيزيائية والكيميائية.</p></div>
  <div class="card"><h3>سؤال</h3><div id="s4q"></div></div></div>
  <div class="card"><div class="nb-head"><h2>مستكشف الشوارع والعائلات</h2><span id="s4lab">المس رقم دورة (يمين الجدول) أو مجموعة (أعلاه)</span></div><div class="row-actions" id="s4btn" style="flex-wrap:wrap"></div><div class="stage" id="s4pt" style="padding:6px"></div></div>`,
 init(){const draw=hl=>{$('#s4pt').innerHTML=PT.ptSVG({hl});};draw();
  const b=$('#s4btn');b.innerHTML=[1,2,3,4,5,6,7].map(p=>`<button class="tbtn" type="button" data-p="${p}">الدورة ${p}</button>`).join('')+[1,2,13,17,18].map(g=>`<button class="tbtn" type="button" data-g="${g}">المجموعة ${g}</button>`).join('')+'<button class="tbtn" type="button" data-x>الكل</button>';
  let seen=new Set();
  b.querySelectorAll('[data-p]').forEach(x=>x.onclick=()=>{const p=+x.dataset.p;draw(e=>e.p===p&&e.f==null);seen.add('p');$('#s4lab').textContent=`الدورة ${p}: صف أفقي، تتغير خصائص عناصره تدريجيًّا من اليسار إلى اليمين.`;SFX.pop();if(seen.size>1)G.complete('s4');});
  b.querySelectorAll('[data-g]').forEach(x=>x.onclick=()=>{const g=+x.dataset.g;draw(e=>e.g===g);seen.add('g');$('#s4lab').textContent=`المجموعة ${g}: عمود واحد، عناصره عائلة متشابهة الخصائص.`;SFX.pop();if(seen.size>1)G.complete('s4');});
  b.querySelector('[data-x]').onclick=()=>draw();
  mcq($('#s4q'),{q:'يتكوّن الجدول الدوري من:',o:['18 دورة و7 مجموعات','7 دورات و18 مجموعة','7 دورات و7 مجموعات','18 دورة و18 مجموعة'],a:1,why:'الدورات صفوف أفقية (7)، والمجموعات أعمدة رأسية (18).'},'s4');},
 quiz:[{q:'الصف الأفقي في الجدول الدوري يسمى:',o:['المجموعة','الدورة','العائلة','المنطقة'],a:1},{q:'لماذا تُسمّى المجموعة عائلة؟',o:['لتشابه خصائص عناصرها الفيزيائية والكيميائية','لأن عناصرها لها الكتلة نفسها','لأنها في الدورة نفسها','لأنها كلها غازات'],a:0}],
 explain:'<p>الجدول الدوري الحديث: 7 دورات (صفوف أفقية تتغير خصائص عناصرها تدريجيًّا) و18 مجموعة (أعمدة تتشابه عناصرها في الخصائص).</p>'});

/* ================= S5: مناطق الجدول ================= */
def('s5',{n:'5 · مناطق الجدول',eyebrow:'المحطة 5 · أحياء المدينة · الكتاب صفحة 179–180',title:'مناطق الجدول الدوري',goal:'يمكن تقسيم الجدول الدوري إلى قطاعات (أحياء). المس اسم المنطقة لتراها على الخريطة.',plan:7,core:1,
 icon:'<rect x="8" y="12" width="14" height="40" fill="currentColor"/><rect x="24" y="28" width="32" height="24" fill="none" stroke="currentColor" stroke-width="5"/><rect x="58" y="12" width="14" height="40" fill="currentColor"/><rect x="24" y="58" width="48" height="10" fill="currentColor" opacity=".5"/>',
 body:`<div class="two"><div class="card"><h3>مناطق الجدول الدوري</h3><p class="step-text">يمكن تقسيم الجدول الدوري إلى قطاعات، وتشمل المنطقة الأولى المجموعتين 1 و2، والمجموعات 13–18، وتسمى هذه المنطقة المكونة من عناصر المجموعات الثماني <b>العناصر الممثلة Representative elements</b>، وفيها فلزات، ولافلزات، وأشباه فلزات.</p><p class="step-text">أمّا العناصر في المجموعات 3–12 فتُسمّى <b>العناصر الانتقالية Transition elements</b>، وجميعها فلزات. وهناك عناصر انتقالية داخلية موجودة أسفل الجدول الدوري، ومنها مجموعتا الأكتينيدات واللانثانيدات؛ لأنّ إحداهما تتبع عنصر اللانثانيوم وعدده الذري 57، والأخرى تتبع عنصر الأكتينيوم الذي عدده الذري 89.</p></div>
  <div class="card"><div class="row-actions" id="s5btn"></div><div class="stage" id="s5pt" style="padding:6px"></div><div id="s5leg"></div></div></div>
  <div class="two"><div class="card"><div class="story"><b>«أستاذ… نحفظ كل العناصر؟!»</b> لا! يكفي أن تفهم <b>كيف</b> رُتّبت؛ فموقع العنصر يخبرك بالكثير عنه.</div><h3 class="mt">صنّف بحسب المنطقة</h3><div id="s5sort"></div></div>
  <div class="card"><h3>تعلّمنا… أجب عن الأسئلة</h3><div id="s5sol"></div></div></div>`,
 init(){const draw=hl=>{$('#s5pt').innerHTML=PT.ptSVG({mode:'reg',hl});$('#s5leg').innerHTML=PT.legend('reg');};draw();
  $('#s5btn').innerHTML=['ممثلة','انتقالية','انتقالية داخلية'].map(r=>`<button class="tbtn" type="button" data-r="${r}">العناصر ال${r.replace('انتقالية داخلية','انتقالية الداخلية')}</button>`).join('')+'<button class="tbtn" type="button" data-x>الكل</button>';
  $$('#s5btn [data-r]').forEach(b=>b.onclick=()=>{draw(e=>e.reg===b.dataset.r);SFX.pop();});$('#s5btn [data-x]').onclick=()=>draw();
  sortGame($('#s5sort'),{bins:['عناصر ممثلة','عناصر انتقالية','انتقالية داخلية'],items:[['الصوديوم Na (المجموعة 1)',0],['الكلور Cl (المجموعة 17)',0],['الحديد Fe (المجموعة 8)',1],['النحاس Cu (المجموعة 11)',1],['اليورانيوم U (الأكتينيدات)',2],['السيريوم Ce (اللانثانيدات)',2],['الكربون C (المجموعة 14)',0]],hint:'انظر إلى رقم المجموعة: 1، 2، 13–18 ممثلة، و3–12 انتقالية.'},'s5',()=>G.complete('s5'));
  STN.s5.sol=solutions($('#s5sol'),[
   {k:'1',q:'كيف تطوّر الجدول الدوري؟',a:[['الإجابة','رتّب مندليف العناصر حسب تزايد كتلها الذرية (1869م)، ثم رتّبها موزلي حسب تزايد أعدادها الذرية.']]},
   {k:'2',q:'كيف تم توزيع العناصر في الجدول الدوري؟',a:[['الإجابة','حسب تزايد أعدادها الذرية في دورات ومجموعات.']]},
   {k:'3',q:'ما هي مناطق الجدول الدوري؟',a:[['الإجابة','العناصر الممثلة، والعناصر الانتقالية، والعناصر الانتقالية الداخلية.']]},
   {k:'4',q:'ماذا تُسمّى الصفوف؟ وماذا تُسمّى الأعمدة؟',a:[['الصفوف','الدورات (7).'],['الأعمدة','المجموعات (18).']]},
   {k:'5',q:'الآن… هل تتذكر تصنيفًا آخر للعناصر؟',a:[['الإجابة','فلزات، ولافلزات، وأشباه فلزات… لندقق أكثر في الجدول الدوري.']]}],'s5');},
 reset(){STN.s5.sol&&STN.s5.sol.reset();},
 quiz:[{q:'العناصر في المجموعات 3–12 تُسمّى:',o:['الممثلة','الانتقالية','الانتقالية الداخلية','الغازات النبيلة'],a:1},{q:'جميع العناصر الانتقالية:',o:['لافلزات','أشباه فلزات','فلزات','غازات'],a:2}],
 explain:'<p>العناصر الممثلة: المجموعات 1، 2، 13–18 (فلزات ولافلزات وأشباه فلزات). العناصر الانتقالية: المجموعات 3–12 (جميعها فلزات). العناصر الانتقالية الداخلية: اللانثانيدات (تتبع اللانثانوم 57) والأكتينيدات (تتبع الأكتينيوم 89).</p>'});

/* ================= S6: الفلزات ================= */
def('s6',{n:'6 · الفلزات',eyebrow:'المحطة 6 · حي الفلزات · الكتاب صفحة 180–182',title:'الفلزات',goal:'إذا تمعّنت في الجدول الدوري ستجده ملونًا بألوان مختلفة تمثّل العناصر الفلزية وغير الفلزية وأشباه الفلزات.',plan:6,core:1,
 icon:'<path d="M10 56l14-30h32l14 30z" fill="currentColor" opacity=".8"/><path d="M24 26l8 30M56 26l-8 30" stroke="#fff" stroke-width="3"/>',
 body:`<div class="two"><div class="card"><h3>الفلزات Metals</h3><p class="step-text">إذا تمعّنت في الجدول الدوري ستجده ملونًا بألوان مختلفة تمثّل العناصر الفلزية وغير الفلزية وأشباه الفلزات. لاحظ أنّ جميع الفلزات صلبة ما عدا الزئبق، ودرجة انصهار معظمها عالية.</p><p class="def"><b>الفلز Metal:</b> عنصر لامع، أي لديه قدرة على عكس الضوء، وموصل جيد للكهرباء والحرارة، وقابل للطَّرق والسَّحب، فيُضغط على هيئة صفائح رقيقة، أو يُسحب في صورة أسلاك.</p><div class="c6-fig" style="max-width:360px">${pic('s20_9627503e','عينات من الفلزات')}</div></div>
  <div class="card"><h3>ماذا قرأت؟ اذكر عددًا من الأشياء المصنوعة من الفلزات</h3><div class="c6-grid">${[['s21_1246691c','سلك نحاس'],['s21_1d3d2483','خاتم'],['s21_dc42f603','هيكل سيارة'],['s21_21881bc9','أواني طهي'],['s21_a8d013a8','قطع نقدية']].map(([n,c])=>`<figure style="margin:0;text-align:center">${pic(n,c)}<figcaption class="step-text">${c}</figcaption></figure>`).join('')}</div>
   <h3 class="mt">سؤال</h3><div id="s6q"></div></div></div>`,
 init(){mcq($('#s6q'),{q:'أي مما يلي ليست من خواص الفلزات:',o:['قابلة للطرق والسحب','موصلة جيدة للكهرباء والحرارة','جميعها لها نفس درجة الغليان والانصهار','لها خواص مغناطيسية'],a:2,why:'لكل فلز درجتا غليان وانصهار خاصتان به؛ فالزئبق مثلًا سائل عند درجة حرارة الغرفة.'},'s6',()=>G.complete('s6'));},
 quiz:[{q:'الفلز الوحيد السائل عند درجة حرارة الغرفة:',o:['الحديد','الزئبق','النحاس','الألومنيوم'],a:1}],
 explain:'<p>الفلزات لامعة، موصلة جيدة للحرارة والكهرباء، قابلة للطرق والسحب، وجميعها صلبة ما عدا الزئبق، ودرجة انصهار معظمها عالية.</p>'});

/* ================= S7: اللافلزات وأشباه الفلزات ================= */
def('s7',{n:'7 · اللافلزات وأشباه الفلزات',eyebrow:'المحطة 7 · حي اللافلزات والحي الحدودي · الكتاب صفحة 182',title:'اللافلزات وأشباه الفلزات',goal:'كم عنصرًا لافلزيًّا يوجد؟ وأين تقع أشباه الفلزات؟ وما نسبة اللافلزات في جسمك؟',plan:6,core:1,
 icon:'<circle cx="28" cy="40" r="16" fill="currentColor" opacity=".6"/><circle cx="54" cy="40" r="16" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="card"><h3>اللافلزات Nonmetals</h3><p class="step-text">تكون اللافلزات عادة غازية أو صلبة هشة عند درجة حرارة الغرفة، ورديئة التوصيل للحرارة والكهرباء، وتشمل <b>17 عنصرًا فقط</b>، وتتضمن عناصر أساسية في حياتنا، منها الكربون والكبريت والنيتروجين والأكسجين والفوسفور واليود.</p><div class="c6-grid">${[['s22_e3060628','الكربون'],['s22_6105c56c','الكبريت'],['s22_fb601efa','الفوسفور'],['s22_b4b8ddbd','اليود']].map(([n,c])=>`<figure style="margin:0;text-align:center">${pic(n,c)}<figcaption class="step-text">${c}</figcaption></figure>`).join('')}</div>
   <h3 class="mt">أشباه الفلزات Metalloids</h3><p class="step-text">أمّا العناصر التي تقع في وسط الجدول الدوري بين الفلزات واللافلزات فتُسمّى <b>أشباه الفلزات</b>، وهي العناصر التي تشترك في بعض صفاتها مع الفلزات وفي بعض صفاتها مع اللافلزات. ومنها: السيليكون والبورون والجرمانيوم والزرنيخ.</p><div class="c6-fig" style="max-width:360px">${pic('s22_f695ecf2','أمثلة على أشباه الفلزات')}</div></div>
  <div class="card"><h3>ماذا قرأت؟ ما عدد العناصر التي تُعدّ لافلزات؟</h3><div id="s7q"></div><div class="stage mt" id="s7pt" style="padding:6px"></div>${PT.legend('cat')}
   <h3 class="mt">الربط مع علم الأحياء: نسبة اللافلزات في جسم الإنسان</h3><div id="s7pie"></div></div></div>`,
 init(){$('#s7pt').innerHTML=PT.ptSVG({mode:'cat',hl:e=>e.c==='n'||e.c==='d'});
  const D=[['الأكسجين',65,'#7c5cbf'],['الكربون',18.5,'#f6c12c'],['الهيدروجين',9.5,'#38bdf8'],['النيتروجين',3.2,'#dc4c4c'],['عناصر أخرى',3.8,'#8fbf5a']];let a=-Math.PI/2,s='<svg viewBox="0 0 360 200" role="img" aria-label="نسبة العناصر في جسم الإنسان">';
  D.forEach(([n,v,c],i)=>{const b=a+v/100*2*Math.PI,x1=100+80*Math.cos(a),y1=100+80*Math.sin(a),x2=100+80*Math.cos(b),y2=100+80*Math.sin(b);s+=`<path d="M100 100L${x1} ${y1}A80 80 0 ${v>50?1:0} 1 ${x2} ${y2}z" fill="${c}" stroke="#fff" stroke-width="2"/>`;s+=`<rect x="205" y="${22+i*32}" width="16" height="16" rx="3" fill="${c}"/><text x="230" y="${35+i*32}" font-size="14" font-weight="700" fill="var(--ink)" font-family="IBM Plex Sans Arabic">${n} ${v}%</text>`;a=b;});
  $('#s7pie').innerHTML=s+'</svg><p class="step-text">نحو <b>97%</b> من كتلة جسم الإنسان لافلزات.</p>';
  mcq($('#s7q'),{q:'عدد العناصر التي تُعدّ لافلزات:',o:['7 عناصر','17 عنصرًا','18 عنصرًا','92 عنصرًا'],a:1,why:'17 عنصرًا فقط، وقد أبرزناها مع أشباه الفلزات على الجدول.'},'s7',()=>G.complete('s7'));},
 quiz:[{q:'العناصر التي تشترك في بعض صفاتها مع الفلزات وفي بعضها مع اللافلزات:',o:['الانتقالية','أشباه الفلزات','الغازات النبيلة','الهالوجينات'],a:1},{q:'أكثر عنصر في جسم الإنسان:',o:['الكربون','الأكسجين','الهيدروجين','النيتروجين'],a:1}],
 explain:'<p>اللافلزات 17 عنصرًا، غازية أو صلبة هشة، رديئة التوصيل. أشباه الفلزات بين الفلزات واللافلزات وتشترك في صفات كل منهما. ونحو 97% من جسمك لافلزات (الأكسجين 65%).</p>'});

/* ================= S8: مقارنة ================= */
def('s8',{n:'8 · مقارنة',eyebrow:'المحطة 8 · لجنة المقارنة · الكتاب صفحة 182',title:'مقارنة: الفلزات واللافلزات وأشباه الفلزات',goal:'أكمل جدول المقارنة: اسحب كل بطاقة إلى عمودها.',plan:6,core:1,
 icon:'<rect x="8" y="12" width="20" height="56" rx="3" fill="currentColor"/><rect x="30" y="12" width="20" height="56" rx="3" fill="currentColor" opacity=".6"/><rect x="52" y="12" width="20" height="56" rx="3" fill="currentColor" opacity=".3"/>',
 body:`<div class="card"><div id="s8sort"></div></div><div class="card"><h3>جدول المقارنة</h3><div class="tablewrap"><table class="c6-table"><thead><tr><th>وجه المقارنة</th><th>الفلزات</th><th>اللافلزات</th><th>أشباه الفلزات</th></tr></thead><tbody>
  <tr><th>الخصائص الفيزيائية</th><td>لها بريق ولمعان · موصلة جيدة للكهرباء والحرارة · قابلة للطرق والسحب · جميعها صلبة عدا الزئبق</td><td>ليس لها بريق ولمعان · غير موصلة للكهرباء والحرارة · غير قابلة للطرق والسحب · منها الصلب والسائل والغاز</td><td>بعضها لامع ولكن ليس لها بريق ولمعان الفلزات · معظمها موصلة للكهرباء والحرارة ولكن بدرجة أقل من الفلزات · جميعها صلبة</td></tr>
  <tr><th>أمثلة عليها</th><td>الحديد، النحاس، الألومنيوم، الذهب، الفضة، الخارصين</td><td>الكربون، الكبريت، الفوسفور، اليود، الأكسجين، النيتروجين</td><td>السيليكون، الجرمانيوم، البورون، الزرنيخ، الأنتيمون، التيلوريوم</td></tr></tbody></table></div></div>`,
 init(){sortGame($('#s8sort'),{bins:['الفلزات','اللافلزات','أشباه الفلزات'],items:[['لها بريق ولمعان',0],['قابلة للطرق والسحب',0],['جميعها صلبة عدا الزئبق',0],['الحديد',0],['الذهب',0],['ليس لها بريق ولمعان',1],['منها الصلب والسائل والغاز',1],['غير موصلة للكهرباء والحرارة',1],['الكبريت',1],['الأكسجين',1],['توصل الكهرباء بدرجة أقل من الفلزات',2],['جميعها صلبة',2],['السيليكون',2],['البورون',2]],hint:'راجع جدول المقارنة أسفل اللعبة.'},'s8',()=>G.complete('s8'));},
 quiz:[{q:'عناصر جميعها صلبة، وتوصل الكهرباء بدرجة أقل من الفلزات:',o:['الفلزات','اللافلزات','أشباه الفلزات','الغازات النبيلة'],a:2}],
 explain:'<p>جدول المقارنة كما في العرض (ص 182). صحّحنا كلمة «أشبه الفلزات» إلى «أشباه الفلزات».</p>'});

/* ================= S9: مفتاح العنصر ================= */
const KE=[['H','غاز'],['Hg','سائل'],['Fe','صلب'],['Tc','مُصنّع']];
def('s9',{n:'9 · مفتاح العنصر',eyebrow:'المحطة 9 · لافتة كل بيت · الكتاب صفحة 183',title:'مفتاح العنصر: كيف نتعرف على خواص العنصر؟',goal:'يُمثَّل كل عنصر في الجدول الدوري بصندوق تُسجَّل فيه معلوماته. عنون الصندوق، ثم استكشف رموز الحالة.',plan:6,core:1,
 icon:ICO.tile,
 body:`<div class="two"><div class="card"><h3>ماذا يُسجَّل في صندوق العنصر؟</h3><ul class="step-text" style="line-height:1.9;margin:0"><li>اسم العنصر.</li><li>رمز العنصر.</li><li>العدد الذري، ويُسجَّل أعلى الرمز والاسم.</li><li>الكتلة الذرية، وتُكتب أسفل الاسم والرمز.</li><li>الحالة الطبيعية (تُميَّز إما بلون الصندوق، أو لون الخط الذي يُكتب به الرمز، أو بعلامة توضع).</li><li>هل هو طبيعي أو مُصنَّع؟ (بطريقة الكتابة أو بوضع علامة).</li></ul>
   <div class="c6-q"><b>في الكتاب:</b> 🎈 غاز (بالون) · 💧 سائل (قطرة) · ⬛ صلب (مكعب) · ◎ مُصنّع (دائرة بنقطة). الرموز الثلاثة العليا تدل على حالة العنصر في درجة حرارة الغرفة، والرمز الرابع يدل على العناصر المصنّعة.</div></div>
  <div class="card"><h3>عنون مفتاح العنصر</h3><div id="s9lab"></div></div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات من مدينة العناصر</h2><span>المس البطاقة لقراءة مفتاحها</span></div><div class="c6-tiles" id="s9t"></div><div id="s9fb" class="mt"></div></div>`,
 init(){C6.label($('#s9lab'),{fig:PT.keyBox(PT.bySym('H'),{fill:'#fde68a'}),slots:[['أعلى الصندوق (1)','العدد الذري'],['الحرف الكبير (H)','رمز العنصر'],['الكلمة (هيدروجين)','اسم العنصر'],['أسفل الصندوق (1.008)','الكتلة الذرية'],['الرسم الصغير (البالون)','حالة المادة']]},'s9',()=>G.complete('s9'));
  $('#s9t').innerHTML=KE.map(([s])=>{const e=PT.bySym(s);return `<button type="button" class="tbtn" data-s="${s}" style="padding:4px;width:120px">${PT.keyBox(e,{w:110,h:125})}</button>`;}).join('');
  $$('#s9t [data-s]').forEach(b=>b.onclick=()=>{const e=PT.bySym(b.dataset.s);SFX.pop();say($('#s9fb'),'info',`<b>${e.n} (${e.s})</b>: العدد الذري ${e.z} · الكتلة الذرية ${e.m} · الحالة في درجة حرارة الغرفة: ${PT.ST[e.st]} · ${e.syn?'عنصر مُصنّع (يُكتب رمزه مفرّغًا)':'عنصر طبيعي'} · ${PT.CAT[e.c]}.`);});},
 quiz:[{q:'أين يُسجَّل العدد الذري في مفتاح العنصر؟',o:['أعلى الرمز والاسم','أسفل الاسم والرمز','داخل الرمز','لا يُسجَّل'],a:0},{q:'تُكتب الكتلة الذرية في مفتاح العنصر:',o:['أعلى الرمز','أسفل الاسم والرمز','بجانب العدد الذري','لا تُكتب'],a:1}],
 explain:'<p>مفتاح العنصر: الاسم، والرمز، والعدد الذري (أعلى)، والكتلة الذرية (أسفل)، والحالة الطبيعية، وهل هو طبيعي أم مُصنّع.</p>'});

/* ================= S10: تطبيق العلوم (رسم بياني تفاعلي) ================= */
const F20=['H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca'];
const OX=[0.5,0,0.5,1,1.5,2,2.5,0,0.5,0,0.5,1,1.5,2,2.5,3,3.5,0,0.5,1];
const CL=[1,0,1,2,3,4,3,2,1,0,1,2,3,4,3,2,1,0,1,2];
def('s10',{n:'10 · تطبيق العلوم',eyebrow:'المحطة 10 · مختبر الأنماط · تطبيق العلوم ص 183',title:'ما الذي تعنيه دورية الصفات في الجدول الدوري؟',goal:'تحديد المشكلة: الرسم البياني يوضح عدد ذرات الأكسجين (الأحمر) وعدد ذرات الكلور (الأخضر) التي تتحد مع أول 20 عنصرًا. ما النمط الذي تلاحظه؟',plan:7,core:1,
 icon:'<path d="M6 62l10-30 10 30 10-30 10 30 10-30 10 30" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>',
 body:`<div class="two"><div class="card"><h3>تحديد المشكلة</h3><p class="step-text">تتحد العناصر عادة بالأكسجين لتكوين الأكاسيد، كما تتحد بالكلور لتكوين الكلوريدات؛ فمثلًا عند اتحاد ذرتي هيدروجين مع ذرة أكسجين يتكوّن الماء H<sub>2</sub>O، أمّا عند اتحاد ذرة صوديوم مع ذرة كلور فيتكوّن كلوريد الصوديوم أو ملح الطعام NaCl. إنّ موقع العنصر في الجدول الدوري يدل على كيفية اتحاده مع عناصر أخرى.</p><div class="c6-fig" style="max-width:150px">${pic('s27_b2e775fd','جزيء كلوريد الهيدروجين')}</div>
   <div class="row-actions" id="s10btn"></div></div>
  <div class="card"><div class="stage" id="s10g" style="padding:6px"></div><p class="hint-line">المس أي عمود في الرسم لقراءة قيمه. القيم من الصيغ الشائعة لأكاسيد العناصر وكلوريداتها (عدد الذرات لكل ذرة من العنصر).</p><div id="s10fb"></div></div></div>
  <div class="two"><div class="card"><h3>حل المشكلة 1</h3><div id="s10q1"></div></div><div class="card"><h3>حل المشكلة 2</h3><div id="s10q2"></div></div></div>`,
 init(){let show={o:true,c:true},sel=null;const g=$('#s10g');
  const draw=()=>{const W=640,H=300,x0=44,y0=20,w=(W-x0-14)/20,h=220,yv=v=>y0+h-v/4*h;let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="رسم بياني لعدد ذرات الأكسجين والكلور" style="direction:ltr">`;
   [0,1,2,3,4].forEach(v=>s+=`<line x1="${x0}" x2="${W-10}" y1="${yv(v)}" y2="${yv(v)}" stroke="var(--line)"/><text x="${x0-8}" y="${yv(v)+4}" text-anchor="end" font-size="12" fill="var(--muted)">${v}</text>`);
   [[2,10],[10,18],[18,20]].forEach(([a,b],i)=>s+=`<rect x="${x0+a*w}" y="${y0}" width="${(b-a)*w}" height="${h}" fill="${i%2?'rgba(124,58,237,.06)':'rgba(14,116,144,.06)'}"/><text x="${x0+(a+b)/2*w}" y="${y0+14}" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="IBM Plex Sans Arabic">الدورة ${i+2}</text>`);
   F20.forEach((e,i)=>{const cx=x0+i*w+w/2;s+=`<rect class="cl" data-i="${i}" x="${x0+i*w}" y="${y0}" width="${w}" height="${h}" fill="${sel===i?'rgba(250,204,21,.25)':'transparent'}" style="cursor:pointer"/><text x="${cx}" y="${y0+h+18}" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">${e}</text><text x="${cx}" y="${y0+h+32}" text-anchor="middle" font-size="10" fill="var(--muted)">${i+1}</text>`;});
   const line=(A,c)=>{let d='';A.forEach((v,i)=>d+=(i?'L':'M')+(x0+i*w+w/2)+' '+yv(v));return `<path d="${d}" fill="none" stroke="${c}" stroke-width="3" pointer-events="none"/>`+A.map((v,i)=>`<circle cx="${x0+i*w+w/2}" cy="${yv(v)}" r="4" fill="${c}" pointer-events="none"/>`).join('');};
   if(show.o)s+=line(OX,'#dc2626');if(show.c)s+=line(CL,'#16a34a');
   s+=`<text x="${W/2}" y="${H-2}" text-anchor="middle" font-size="12" fill="var(--muted)" font-family="IBM Plex Sans Arabic">العدد الذري / العنصر</text></svg>`;g.innerHTML=s;
   g.querySelectorAll('.cl').forEach(r=>r.onclick=()=>{sel=+r.dataset.i;SFX.tick();draw();const e=PT.bySym(F20[sel]);say($('#s10fb'),'info',`<b>${e.n} (${e.s})</b> · المجموعة ${e.g}: ذرات الأكسجين لكل ذرة = ${OX[sel]} · ذرات الكلور لكل ذرة = ${CL[sel]}`);});};
  $('#s10btn').innerHTML='<button class="tbtn" type="button" data-k="o" aria-pressed="true">🔴 الأكسجين</button><button class="tbtn" type="button" data-k="c" aria-pressed="true">🟢 الكلور</button>';
  $$('#s10btn [data-k]').forEach(b=>b.onclick=()=>{show[b.dataset.k]=!show[b.dataset.k];b.setAttribute('aria-pressed',show[b.dataset.k]);draw();});draw();
  let n=0;const chk=()=>{if(++n>=2)G.complete('s10');};
  mcq($('#s10q1'),{q:'حدّد جميع عناصر المجموعة الأولى في الرسم البياني (H، Li، Na، K). ماذا تلاحظ على مواقعها؟',o:['تقع في القيعان نفسها من النمط وتتحد بذرة كلور واحدة','تقع في القمم دائمًا','لا يوجد أي نمط','قيمها تتزايد باستمرار'],a:0,why:'وكذلك عناصر المجموعة 14 (C، Si) تقع على القمم. العناصر في المجموعة نفسها تتكرر قيمها.'},'s10',chk);
  mcq($('#s10q2'),{q:'وضّح هذه العلاقة إحدى خصائص المجموعة. اختر الكلمة الدورية المناسبة:',o:['تتكرر قيم الاتحاد بنمط منتظم كلما بدأت دورة جديدة','قيم الاتحاد عشوائية','كل العناصر تتحد بالعدد نفسه من الذرات','الغازات النبيلة تتحد بأكبر عدد من الذرات'],a:0,why:'تتبع عناصر الجدول الدوري على الرسم البياني بالترتيب نمطًا يتكرر في كل دورة؛ وهذا معنى «الدورية».'},'s10',chk);},
 explain:'<p>تطبيق العلوم ص 183: يتكرر نمط اتحاد العناصر مع الأكسجين والكلور في كل دورة؛ فعناصر المجموعة الواحدة تقع في المواقع نفسها من النمط. <b>ملاحظة:</b> الرسم مُعاد بناؤه من الصيغ الشائعة للأكاسيد والكلوريدات (مقترح)، وصحّحنا في نص العرض «أول 20 عصرًا» إلى «عنصرًا».</p>'});

/* ================= S11: رموز العناصر ================= */
const SYM=[['منديليفيوم','Md','من اسم العالم مندليف.'],['الرصاص','Pb','الاسم اللاتيني Plumbum.'],['ثوريوم','Th','اسم ديني عند الإغريق.'],['بولونيوم','Po','على اسم البلد بولندا حيث ولدت ماري كوري.'],['هيدروجين','H','كلمة إغريقية تعني «مكوّن الماء» Water former.'],['الزئبق','Hg','كلمة إغريقية Haydrargyrum تعني «السائل الفضي».'],['الذهب','Au','كلمة لاتينية Aurum تعني «بزوغ الضوء».']];
def('s11',{n:'11 · رموز العناصر',eyebrow:'المحطة 11 · أسماء البيوت · الكتاب صفحة 184',title:'رموز العناصر وأصل تسميتها',goal:'تُكتب رموز العناصر بحرف أو حرفين. طابق كل عنصر برمزه.',plan:5,core:1,
 icon:'<text x="40" y="54" text-anchor="middle" font-size="38" font-weight="800" fill="currentColor">Au</text>',
 body:`<div class="two"><div class="card"><h3>رموز العناصر</h3><p class="step-text">تُكتب رموز العناصر بحرف أو حرفين، وتكون غالبًا مبنية أو مشتقة من اسم العنصر؛ فالحرف V مثلًا اختصار لاسم العنصر باللغة الإنجليزية Vanadium، والحرفان Sc اختصار للعنصر Scandium. وأحيانًا تجد أن الأحرف لا تتطابق مع اسم العنصر؛ فمثلًا يرمز للفضة Silver بالرمز Ag، وكذلك يرمز للصوديوم Sodium بالرمز Na. فمن أين اشتقت هذه الرموز؟ قد يشتق الرمز من الاسم اللاتيني أو الإغريقي للعنصر، أو من أسماء العلماء أو بلدانهم كالفرانسيوم Fr والبولونيوم Po.</p><p class="step-text">والآن تُعطى العناصر المصنعة أسماء مؤقتة، ورموزًا بثلاثة أحرف مرتبطة مع العدد الذري للعنصر. وقد تبنى الاتحاد العالمي للكيمياء البحتة والتطبيقية «IUPAC» هذا النظام عام 1978م. وعند اكتشاف عنصر ما يحق للمكتشفين اختيار اسم دائم له.</p>
   <div class="c6-grid"><div class="c6-fig">${pic('s28_f81f509c','الفرانسيوم Fr')}</div><div class="c6-fig">${pic('s28_2273a3a0','العالمة مارغريت بيري مكتشفة الفرانسيوم')}</div></div></div>
  <div class="card"><h3>الجدول 1: الرموز الكيميائية وأصل تسميتها</h3><div class="tablewrap"><table class="c6-table"><thead><tr><th>العنصر</th><th>الرمز</th><th>أصل التسمية</th></tr></thead><tbody>${SYM.map(r=>`<tr><td>${r[0]}</td><td style="direction:ltr;text-align:center;font-weight:800">${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div>
   <h3 class="mt">طابق العنصر برمزه</h3><div id="s11m"></div></div></div>`,
 init(){match($('#s11m'),[['الفضة','Ag'],['الصوديوم','Na'],['الذهب','Au'],['الزئبق','Hg'],['الرصاص','Pb'],['الفرانسيوم','Fr']],'s11',()=>G.complete('s11'));},
 quiz:[{q:'رمز الفضة:',o:['S','Si','Ag','Au'],a:2},{q:'المنظمة التي تعتمد أسماء العناصر الجديدة:',o:['IUPAC','NASA','WHO','UNESCO'],a:0}],
 explain:'<p>تُشتق الرموز من الاسم الإنجليزي أو اللاتيني أو الإغريقي، أو من أسماء العلماء والبلدان. ويعتمد IUPAC أسماء العناصر الجديدة (نظام 1978م).</p>'});

/* ================= SUMMARY ================= */
def('sum',{n:'الخلاصة',eyebrow:'الخلاصة · الكتاب صفحة 184',title:'الخلاصة',goal:'أهم أفكار الدرس كما في العرض.',plan:2,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>تطور الجدول الدوري</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>نشر ديمتري مندليف أول نسخة من الجدول الدوري عام 1869م.</li><li>ترك مندليف ثلاثة فراغات لعناصر لم تكن مكتشفة بعد.</li><li>رتّب موزلي الجدول الدوري لمندليف بناءً على العدد الذري وليس الكتلة الذرية.</li></ul></div>
  <div class="card"><h3>الجدول الدوري الحديث</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>الجدول الدوري مقسم إلى قطاعات.</li><li>الدورة صف من العناصر التي تتغير خصائصها تدريجيًّا بشكل يمكن توقعه.</li><li>المجموعتان (1 و2) والمجموعات (13–18) تُسمّى عناصر ممثلة.</li><li>المجموعات (3–12) تُسمّى عناصر انتقالية.</li></ul></div></div>
  <div class="card"><div class="stage" style="padding:6px">${PT.ptSVG({mode:'reg'})}</div>${PT.legend('reg')}</div>`,
 init(){},enter(){G.complete('sum');},reset(){},explain:'<p>خلاصة الدرس كما في العرض.</p>'});

/* ================= SELF TEST ================= */
def('self',{n:'اختبر نفسك',eyebrow:'أسئلة نهاية الدرس · الكتاب صفحة 184',title:'اختبر نفسك: الأسئلة والحلول',goal:'أسئلة «اختبر نفسك» مع حلول نموذجية. تسليم الواجب يوم الخميس.',plan:3,icon:ICO.check,body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'قوّم',q:'كيف تتغيّر الصفات الفيزيائية لعناصر الدورة الرابعة عند تزايد العدد الذري؟',a:[['الإجابة','تتغير تدريجيًّا بشكل يمكن توقعه: تبدأ الدورة بفلزات لامعة موصلة (البوتاسيوم والكالسيوم والعناصر الانتقالية)، ثم أشباه فلزات (الجرمانيوم والزرنيخ)، ثم لافلزات (السيلينيوم والبروم)، وتنتهي بغاز نبيل (الكريبتون).']]},
  {k:'صف',q:'صف مواقع الفلزات واللافلزات وأشباه الفلزات في الجدول الدوري.',a:[['الفلزات','في يسار الجدول ووسطه.'],['اللافلزات','في يمين الجدول (ومعها الهيدروجين أعلى اليسار).'],['أشباه الفلزات','على الخط المتعرّج بين الفلزات واللافلزات.']]},
  {k:'صنّف',q:'صنّف العناصر التالية إلى: فلز ولا فلز وشبه فلز: Fe ،Li ،B ،Cl ،Si ،Na ،Ni.',a:[['فلزات','Fe ،Li ،Na ،Ni'],['لا فلز','Cl'],['أشباه فلزات','B ،Si']]},
  {k:'اكتب قائمة',q:'اكتب قائمة بما يحويه صندوق مفتاح العنصر.',a:[['الإجابة','اسم العنصر، رمزه، عدده الذري، كتلته الذرية، حالته الطبيعية (صلب/سائل/غاز)، وهل هو طبيعي أم مُصنّع.']]},
  {k:'التفكير الناقد',q:'ما الاختلاف الذي يطرأ على الجدول الدوري إذا رُتّبت عناصره حسب الكتلة الذرية؟',a:[['الإجابة','تتبادل بعض العناصر مواقعها، مثل التيلوريوم (127.60) واليود (126.904)، والأرجون والبوتاسيوم، والكوبالت والنيكل؛ فيقع العنصر في مجموعة لا تشبه خصائصه خصائص عناصرها.']]}],'self',()=>G.complete('self'));},
 reset(){STN.self.s.reset();},explain:'<p>الأسئلة من العرض (ص 184)، والحلول نموذجية مقترحة لأن العرض لم يتضمن حلولها.</p>'});

/* ================= التقويم المرحلي ================= */
def('ev1',{n:'تقويم مرحلي 1',eyebrow:'تقويم مرحلي · مفتاح العنصر · صح أم خطأ',title:'تقويم مرحلي: مفتاح العنصر وتصحيح العبارات',goal:'عنون مفتاح العنصر، ثم حدّد الصواب والخطأ وصحّح الكلمة التي تحتها خط.',plan:4,core:1,icon:ICO.check,
 body:`<div class="card"><h3>عنون مفتاح العنصر الآتي باستخدام المفردات أدناه</h3><div id="ev1a"></div></div><div class="card"><h3>صح أم خطأ، وفي حال وجود خطأ صحّح الكلمة التي تحتها خط</h3><div id="ev1b"></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('ev1');};
  C6.label($('#ev1a'),{fig:PT.keyBox(PT.bySym('H'),{fill:'#fff'}),slots:[['1 · الرقم 1 أعلى','العدد الذري'],['2 · الحرف H','رمز العنصر'],['3 · كلمة هيدروجين','اسم العنصر'],['4 · الرقم 1.008','الكتلة الذرية']]},'ev1',c);
  C6.tfx($('#ev1b'),[['العناصر في المجموعات من 3 إلى 12 هي فلزات وتُسمّى العناصر <u>الممثلة</u>.',false,'الانتقالية',['الانتقالية','الغازية','الداخلية']],['تُعدّ العناصر <u>اللافلزية</u> موصلة جيدة للحرارة والكهرباء.',false,'الفلزية',['الفلزية','شبه الموصلة','الغازية']],['رُتّبت العناصر في الجدول الدوري اعتمادًا على <u>أعدادها الذرية</u>.',true],['وُضعت العناصر في الجدول الدوري في سبع <u>مجموعات</u> مرقمة (1–7).',false,'دورات',['دورات','عائلات','مناطق']]],'ev1',c);}});
const KEY5=['C','Na','No','Hg','He'];
def('ev2',{n:'تقويم مرحلي 2',eyebrow:'تقويم مرحلي · مفاتيح العناصر · بنك الكلمات',title:'تقويم مرحلي: اقرأ المفتاح واملأ الفراغ',goal:'بالرجوع إلى مفاتيح العناصر الخمسة، اكتب اسم العنصر الذي يتفق مع وصفه، ثم املأ الفراغات من بنك الكلمات.',plan:5,core:1,icon:ICO.check,
 body:`<div class="card"><div class="c6-tiles">${KEY5.map(s=>`<div style="width:112px">${PT.keyBox(PT.bySym(s),{w:110,h:125,fill:'#fff'})}</div>`).join('')}</div><div id="ev2a" class="mt"></div></div><div class="card"><h3>املأ الفراغ بالكلمة المناسبة</h3><div id="ev2b"></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('ev2');};
  C6.fill($('#ev2a'),{bank:['زئبق','هيليوم','نوبيليوم','كربون','صوديوم'],items:[['سائل عند درجة حرارة الغرفة: ___','زئبق'],['تحتوي نواته على أقل عدد من البروتونات: ___','هيليوم'],['لا يوجد على الأرض بصورة طبيعية: ___','نوبيليوم'],['المتوسط الحسابي للكتلة الذرية له يساوي 12 تقريبًا: ___','كربون'],['تحتوي نواته على 11 بروتونًا: ___','صوديوم']]},'ev2',c);
  C6.fill($('#ev2b'),{bank:['عامل مساعد','الممثلة','دورة','مجموعة','أشباه الفلزات','المصنّعة','الانتقالية','الفلزات','اللافلزات','شبه الموصل'],items:[['صفّ أفقي في الجدول الدوري يحتوي على عناصر تتغير خصائصها تدريجيًّا يسمى ___','دورة'],['تتضمن العناصر ___ الفلزات وأشباه الفلزات واللافلزات.','الممثلة'],['عمود في الجدول الدوري يحتوي على عناصر تتشابه في خصائصها يسمى ___ أو عائلة.','مجموعة'],['___ عناصر عادة لامعة وموصلة جيدة للتيار الكهربائي.','الفلزات'],['___ عناصر قد تكون في الحالة الغازية أو صلبة هشة ورديئة التوصيل للتيار الكهربائي.','اللافلزات'],['___ عناصر لها صفات فلزية ولافلزية.','أشباه الفلزات'],['العنصر الذي يوصل التيار الكهربائي بدرجة أفضل من اللافلز ولكن أقل من الفلز هو ___','شبه الموصل'],['الفلزات مثل الذهب والفضة والنحاس تعد من العناصر ___','الانتقالية'],['المادة التي تزيد من سرعة التفاعل دون أن تتغير تسمى ___','عامل مساعد'],['العناصر ___ هي العناصر التي تُحضَّر في المسارعات النووية.','المصنّعة']]},'ev2',c);},
 explain:'<p><b>تصحيح من العرض:</b> في بنك الكلمات وُضعت «الانتقالية» للعبارة 2 و«الممثلة» للعبارة 8، والصواب العكس: العناصر الممثلة هي التي تتضمن الفلزات وأشباه الفلزات واللافلزات، والذهب والفضة والنحاس عناصر انتقالية.</p>'});
def('ev3',{n:'تقويم مرحلي 3',eyebrow:'تقويم مرحلي · تصنيف · تدريب صفي',title:'تقويم مرحلي: صنّف وطابق',goal:'صنّف العناصر حسب أوصافها إلى فلزات أو لا فلزات أو أشباه فلزات، ثم أقرن العمود الأول بما يناسبه من العمود الثاني.',plan:5,core:1,icon:ICO.check,
 body:`<div class="card"><h3>صنّف العناصر إلى فلزات أو لا فلزات أو أشباه فلزات</h3><div id="ev3a"></div></div><div class="card"><h3>تدريب صفي: أقرن العمود الأول بما يناسبه من العمود الثاني</h3><div id="ev3b"></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('ev3');};
  sortGame($('#ev3a'),{bins:['فلز','لا فلز','شبه فلز'],items:[['غاز عند درجة حرارة الغرفة',1],['رديء التوصيل للتيار الكهربائي',1],['يمكن استخدامها بوصفها أشباه موصلات',2],['يمكن طرقها وتشكيلها على هيئة صفائح رقيقة',0],['هشة ومظهرها باهت',1],['عناصر انتقالية',0],['تُستخدم في رقائق أجهزة الحاسوب',2],['يمكن سحبها إلى أسلاك رفيعة',0]],hint:'تذكر جدول المقارنة.'},'ev3',c);
  match($('#ev3b'),[['عناصر غازية أو صلبة هشة في درجة حرارة الغرفة ورديئة التوصيل للتيار الكهربائي','اللافلزات'],['منطقة في الجدول الدوري تتضمن 8 مجموعات، وتشمل الفلزات وأشباه الفلزات واللافلزات','العناصر الممثلة'],['العناصر المتشابهة في الخصائص الكيميائية والفيزيائية','المجموعة'],['العناصر الواقعة بين عناصر الفلزية واللافلزية في الجدول الدوري','أشباه الفلزات'],['صف أفقي من العناصر في الجدول الدوري تتغير خصائصها بصورة تدريجية ودورية','الدورة'],['منطقة في الجدول الدوري تتألف من المجموعات 3–12','العناصر الانتقالية'],['عدد البروتونات في نواة العنصر','العدد الذري'],['عناصر لامعة، وجيدة التوصيل للحرارة والكهرباء، وصلبة في درجة حرارة الغرفة','الفلزات']],'ev3',c);}});

/* ================= إثرائي: المسابقات ================= */
const BG=[['الدورة','صف أفقي في الجدول الدوري'],['المجموعة','عمود في الجدول الدوري'],['مندليف','رتّب العناصر حسب الكتلة الذرية 1869م'],['موزلي','رتّب العناصر حسب العدد الذري'],['الزئبق','فلز سائل عند درجة حرارة الغرفة'],['اللافلزات','17 عنصرًا رديئة التوصيل'],['أشباه الفلزات','تقع بين الفلزات واللافلزات'],['العناصر الانتقالية','المجموعات 3–12'],['العناصر الممثلة','المجموعات 1، 2، 13–18'],['العدد الذري','عدد البروتونات في النواة'],['الكتلة الذرية','تُكتب أسفل الاسم والرمز في المفتاح'],['IUPAC','الاتحاد الذي يعتمد أسماء العناصر'],['الجاليوم','أحد العناصر التي ترك لها مندليف فراغًا'],['Ag','رمز الفضة'],['Na','رمز الصوديوم'],['الأكسجين','أكثر عنصر في جسم الإنسان (65%)'],['السيليكون','شبه فلز يُستخدم في رقائق الحاسوب'],['اللانثانيدات','تتبع عنصر اللانثانوم 57']];
def('x1',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'ساحة المدينة: غرفة الهروب وبنغو العناصر',goal:'افتحوا أقفال «أرشيف مندليف» قبل انتهاء الوقت، ثم تنافسوا في بنغو المفردات.',plan:5,
 icon:'<rect x="18" y="34" width="44" height="36" rx="5" fill="currentColor"/><path d="M28 34v-8a12 12 0 0 1 24 0v8" fill="none" stroke="currentColor" stroke-width="6"/>',
 body:'<div class="card"><div id="x1esc"></div></div><div class="card"><div class="nb-head"><h2>🎯 بنغو العناصر</h2><span>اختاروا المصطلح المناسب للتعريف</span></div><div id="x1bg"></div></div>',
 init(){STN.x1.e=escape($('#x1esc'),{title:'أرشيف مندليف',story:'أُغلق أرشيف مندليف بأربعة أقفال! كل قفل يُفتح بإجابة صحيحة ويكشف رقمًا. اجمعوا الأرقام لتفتحوا الأرشيف.',secs:360,
   locks:[{q:'عدد الدورات في الجدول الدوري:',o:['7','8','18','12'],a:0,code:'7'},{q:'المجموعات 3–12 تُسمّى العناصر:',o:['الممثلة','الانتقالية','النبيلة','القلوية'],a:1,code:'3'},{q:'رتّب موزلي العناصر حسب:',o:['الكتلة الذرية','العدد الذري','الحالة','اللون'],a:1,code:'1'},{q:'عدد اللافلزات:',o:['17','18','55','7'],a:0,code:'8'}],outro:'فتحتم الأرشيف! الجدول الدوري نتاج جهود علماء كثيرين عبر الزمن.'},'x1');
  STN.x1.b=bingo($('#x1bg'),BG,'x1');},
 reset(){STN.x1.e.reset();STN.x1.b&&STN.x1.b.reset&&STN.x1.b.reset();},explain:'<p>مسابقتان إثرائيتان مقترحتان لمراجعة مفردات الدرس.</p>'});
const RID=[{clues:['أنا فلز.','أنا الوحيد بين الفلزات السائل عند درجة حرارة الغرفة.','رمزي Hg.'],o:['الزئبق','الحديد','الصوديوم','البروم'],a:0},
 {clues:['أنا شبه فلز.','أتوافر بكثرة في الرمال.','أُستخدم في رقائق الحاسوب.'],o:['السيليكون','الكربون','الألومنيوم','الكبريت'],a:0},
 {clues:['أنا عالم روسي.','نشرت أول جدول دوري عام 1869م.','تركت ثلاثة فراغات لعناصر مجهولة.'],o:['مندليف','موزلي','دالتون','رذرفورد'],a:0},
 {clues:['أنا عالم إنجليزي.','عدّلت الجدول الدوري قبل أن أتم 27 عامًا.','رتّبت العناصر حسب عدد البروتونات.'],o:['موزلي','مندليف','طومسون','بور'],a:0},
 {clues:['أنا لافلز غازي.','أشكل 65% من كتلة جسمك.','رمزي O.'],o:['الأكسجين','النيتروجين','الهيدروجين','الكربون'],a:0}];
def('x2',{n:'إثرائي · من أنا؟',eyebrow:'إثرائي · ألغاز ولوحة خيارات',title:'من أنا؟ ولوحة الخيارات',goal:'خمّن العنصر أو العالِم بأقل عدد من الأدلة، ثم اختر ثلاث مهام في خط واحد من لوحة الخيارات.',plan:4,
 icon:'<circle cx="34" cy="34" r="20" fill="none" stroke="currentColor" stroke-width="6"/><path d="M48 48l20 20" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>',
 body:'<div class="card"><div id="x2rid"></div></div><div class="card"><h3>لوحة الخيارات 3 × 3</h3><div id="x2cb"></div></div>',
 init(){riddles($('#x2rid'),RID,'x2');
  STN.x2.cb=choiceBoard($('#x2cb'),[
   {ic:'✍️',t:'اكتب تعريفًا',kind:'كتابة',p:'اكتب في دفترك تعريف الدورة والمجموعة، ومثالًا على كل منهما.'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'العنصر Si:',o:['فلز','لا فلز','شبه فلز','غاز نبيل'],a:2},
   {ic:'🎨',t:'صمّم مفتاحًا',kind:'رسم',p:'صمّم مفتاح عنصر من اختيارك يبيّن الاسم والرمز والعدد الذري والكتلة الذرية والحالة.'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'رمز الذهب:',o:['Ag','Au','Go','Gd'],a:1},
   {ic:'🗺',t:'خريطة مفاهيم',kind:'تنظيم',p:'ارسم خريطة مفاهيم تبدأ بـ «الجدول الدوري» وتتفرع إلى: الدورات، المجموعات، المناطق، الفلزات/اللافلزات/أشباه الفلزات.'},
   {ic:'❓',t:'تحدٍّ',kind:'اختيار',q:'عنصر في الدورة 3 والمجموعة 17:',o:['الصوديوم','الكلور','الأرجون','الفلور'],a:1},
   {ic:'📸',t:'ابحث في بيتك',kind:'ملاحظة',p:'اذكر خمسة أشياء في بيتك مصنوعة من فلزات، وسمِّ الفلز في كل منها.'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'رتّب مندليف العناصر حسب:',o:['العدد الذري','الكتلة الذرية','الحالة','اللون'],a:1},
   {ic:'🔬',t:'قارن',kind:'كتابة',p:'قارن بين الفلزات واللافلزات في ثلاث خواص.'}],'x2',()=>G.complete('x2'));},
 reset(){STN.x2.cb.reset();},explain:'<p>نشاطان إثرائيان مقترحان.</p>'});

/* ================= CHALLENGE ================= */
def('ch',{n:'تحدي العلماء',plan:3,icon:'<path d="M24 10h32v18a16 16 0 0 1-32 0z" fill="currentColor"/><path d="M40 44v14M28 70h24l-3-12H31z" fill="currentColor"/>',
 eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من تقويمات العرض. لكل سؤال محاولتان.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'مندليف',q:'رتّب العالم مندليف العناصر في الجدول الدوري حسب:',o:['التزايد في أعدادها الذرية','التناقص في أعدادها الذرية','التناقص في أعدادها الكتلية','التزايد في أعدادها الكتلية'],a:3},
  {k:'موزلي',q:'رتّب العالم موزلي العناصر حسب:',o:['التزايد في أعدادها الذرية','التزايد في عدد الإلكترونات','التناقص في أعدادها الكتلية','التزايد في أعدادها الكتلية'],a:0},
  {k:'الجدول الحديث',q:'يتكوّن الجدول الدوري من:',o:['18 دورة و7 مجموعات','7 دورات و18 مجموعة','7 دورات و7 مجموعات','18 دورة و18 مجموعة'],a:1},
  {k:'المناطق',q:'العناصر في المجموعات 3–12:',o:['الممثلة','الانتقالية','الانتقالية الداخلية','أشباه الفلزات'],a:1},
  {k:'الفلزات',q:'أي مما يلي ليست من خواص الفلزات:',o:['قابلة للطرق والسحب','موصلة جيدة للكهرباء والحرارة','جميعها لها نفس درجة الغليان والانصهار','لها خواص مغناطيسية'],a:2},
  {k:'التصنيف',t:'multi',q:'اختر كل أشباه الفلزات:',items:[['السيليكون',1],['البورون',1],['الجرمانيوم',1],['الكبريت',0],['النحاس',0]],why:'الكبريت لا فلز، والنحاس فلز.'},
  {k:'مفتاح العنصر',q:'يُسجَّل العدد الذري في مفتاح العنصر:',o:['أسفل الاسم','أعلى الرمز والاسم','داخل الرمز','لا يُسجّل'],a:1},
  {k:'الرموز',q:'الرمز Na يدل على:',o:['النيتروجين','النيون','الصوديوم','النيكل'],a:2}],'ch');},
 reset(){STN.ch.c.reset();},explain:'<p>أسئلة التحدي من تقويمات العرض.</p>'});

/* ================= PLAN ================= */
const SROWS={intro:{s:['poe','brain'],g:'١–٣',sk:'التنبؤ',ev:'سؤال التوقع'},fold:{s:['kwl'],g:'١–٣',sk:'الاستدعاء والتنبؤ',ev:'توجيه القراءة قبل/بعد'},goals:{s:['frayer','cards'],g:'١–٣',sk:'التذكر',ev:'لعبة المطابقة'},
 s1:{s:['time','story'],g:'١',sk:'الترتيب الزمني',ev:'آلة الزمن'},s2:{s:['story','cards'],g:'١',sk:'الاستنتاج',ev:'سؤال مندليف'},lab1:{s:['inq','poe'],g:'١',sk:'المقارنة والاستنتاج',ev:'ترتيب حسب الكتلة/العدد الذري'},s3:{s:['tps','cards'],g:'١',sk:'المقارنة',ev:'سؤالا موزلي'},
 s4:{s:['disc','analogy'],g:'٣',sk:'الملاحظة',ev:'سؤال الدورات والمجموعات'},s5:{s:['coop','cmap'],g:'٣',sk:'التصنيف',ev:'تصنيف حسب المنطقة'},lab2:{s:['inq','game'],g:'٢ و٣',sk:'البحث وتحديد المواقع',ev:'مهمات المستكشف'},
 s6:{s:['brain','cards'],g:'٣',sk:'الملاحظة',ev:'خواص الفلزات'},s7:{s:['disc','heads'],g:'٣',sk:'التفسير',ev:'عدد اللافلزات'},s8:{s:['venn','coop'],g:'٣',sk:'المقارنة',ev:'جدول المقارنة'},lab3:{s:['inq','poe'],g:'٣',sk:'التجريب والتصنيف',ev:'سجل الاختبارات'},
 s9:{s:['frayer','sticks'],g:'٢',sk:'التفسير',ev:'عنونة مفتاح العنصر'},s10:{s:['prob','tps'],g:'٣',sk:'تحليل البيانات',ev:'حل المشكلة'},s11:{s:['jigsaw','game'],g:'٢',sk:'الربط',ev:'مطابقة الرموز'},
 sum:{s:['tl'],g:'١–٣',sk:'التلخيص',ev:'إشارة المرور'},self:{s:['heads','sticks'],g:'١–٣',sk:'التطبيق والتفكير الناقد',ev:'اختبر نفسك'},ev1:{s:['spot','cards'],g:'٢ و٣',sk:'التصحيح',ev:'صح أم خطأ'},ev2:{s:['heads'],g:'٢ و٣',sk:'التطبيق',ev:'بنك الكلمات'},ev3:{s:['coop'],g:'٣',sk:'التصنيف',ev:'التدريب الصفي'},
 x1:{s:['game','champ'],g:'١–٣',sk:'الاستدعاء',ev:'غرفة الهروب والبنغو'},x2:{s:['who','game'],g:'١–٣',sk:'الاستنتاج',ev:'من أنا؟'},ch:{s:['exit'],g:'١–٣',sk:'التقويم الختامي',ev:'تحدي العلماء'}};
SK.init({key:'g9c6l1',sfx:{pop:()=>SFX.pop(),tick:()=>SFX.tick(),ok:()=>SFX.correct(),no:()=>SFX.wrong()},teams:()=>(G.teams||K.TEAMN.slice(0,4).map((n,i)=>({n,c:K.TEAMC[i]}))).map(t=>({n:t.n,c:t.c})),
 stratRoster:{api:'https://script.google.com/macros/s/AKfycbxp-t4JgGO5WiK6hoacjTyBqFnG-9bSWClplOpVV4VDuTV7T4tY0swB1Ll36kr_djJ7nQ/exec',classes:['1/3','2/3','3/3','4/3']}});
def('plan',{n:'خطة الدرس والاستراتيجيات',after:'goals',eyebrow:'للمعلم والزائر',title:'خطة الدرس: الأهداف والاستراتيجيات والتقويم',goal:'المس أي صف للانتقال إلى محطته، أو شارة الاستراتيجية أعلى المحطة لعرض خطواتها وأدواتها.',plan:1,
 icon:'<rect x="10" y="12" width="60" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M10 28h60M30 28v40" stroke="currentColor" stroke-width="5"/>',body:'<div class="card" id="planBox"></div>',
 init(){const secs=$$('#stations section.st');let k=0;const rows=[];secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;k++;rows.push({i:id,num:k,name:STN[id].n.replace(/^\d+ · /,''),c});});
  $('#planBox').innerHTML=SK.planHTML('',rows);SK.wirePlan($('#planBox'),id=>K.go(id));
  secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;const h=s.querySelector('.st-head');if(h&&!h.querySelector('.stgs')){const b=SK.badges(c);b.style.cssText='display:flex;margin:6px 0 0';h.appendChild(b);}});
  if(!document.getElementById('skfab'))SK.fab('left:14px;bottom:86px');},
 enter(){G.complete('plan');},reset(){},explain:'<p>خطة الدرس: لكل محطة هدفها والاستراتيجية المطبقة ومهارة التفكير وأداة التقويم.</p>'});
K.boot({chapter:'الفصل السادس: الجدول الدوري',chapterShort:'الفصل السادس',title:'خريطة مدينة العناصر',lesson:'الدرس الأول: مقدمة في الجدول الدوري',accent:'#be185d',accentDark:'#f472b6',hook:'118 عنصرًا… وخريطة واحدة تجمعها!',
 riddle:'كيف رتّب العلماء العناصر بحيث نعرف صفات العنصر من مكانه؟',predict:{o:['رتّبوها حسب تزايد أعدادها الذرية في صفوف وأعمدة تتشابه فيها العناصر','رتّبوها أبجديًّا حسب أسمائها','رتّبوها حسب تاريخ اكتشافها'],a:0},
 answer:'رُتّبت العناصر في الجدول الدوري الحديث حسب تزايد أعدادها الذرية في 7 دورات و18 مجموعة؛ عناصر المجموعة الواحدة تتشابه في خصائصها، وخصائص عناصر الدورة تتغير تدريجيًّا.',
 finalTitle:'مبارك! رسمت خريطة مدينة العناصر',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 184 · التسليم يوم الخميس.',
 concepts:[{n:'مندليف',t:'رتّب العناصر حسب تزايد الكتلة الذرية (1869م) وترك ثلاثة فراغات.',ic:'<rect x="6" y="6" width="36" height="36" rx="4" fill="none" stroke="var(--accent)" stroke-width="4"/><rect x="18" y="18" width="12" height="12" fill="var(--amber)"/>'},
  {n:'موزلي',t:'رتّب العناصر حسب تزايد العدد الذري.',ic:'<text x="24" y="34" text-anchor="middle" font-size="26" font-weight="800" fill="var(--accent)">Z</text>'},
  {n:'الدورات والمجموعات',t:'7 دورات أفقية و18 مجموعة رأسية.',ic:'<path d="M6 16h36M6 32h36M16 6v36M32 6v36" stroke="var(--accent)" stroke-width="4"/>'},
  {n:'المناطق',t:'ممثلة (1، 2، 13–18) وانتقالية (3–12) وانتقالية داخلية.',ic:'<rect x="4" y="10" width="8" height="28" fill="var(--accent)"/><rect x="14" y="20" width="20" height="18" fill="var(--amber)"/><rect x="36" y="10" width="8" height="28" fill="var(--accent)"/>'},
  {n:'الفلزات واللافلزات',t:'فلزات لامعة موصلة، ولافلزات (17) رديئة التوصيل، وأشباه فلزات بينهما.',ic:'<circle cx="16" cy="24" r="10" fill="var(--accent)"/><circle cx="32" cy="24" r="10" fill="var(--amber)"/>'},
  {n:'مفتاح العنصر',t:'الاسم والرمز والعدد الذري والكتلة الذرية والحالة.',ic:'<rect x="8" y="6" width="32" height="36" rx="4" fill="none" stroke="var(--accent)" stroke-width="4"/><text x="24" y="32" text-anchor="middle" font-size="16" font-weight="800" fill="var(--accent)">H</text>'}]});
$$('.top h1').forEach(h=>h.dataset.sym='Md');
})();

