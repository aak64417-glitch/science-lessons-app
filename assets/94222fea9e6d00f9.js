
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

/* ===== تجارب افتراضية — الزلازل ===== */
(function(){
const {$,$$,G,STN,def,say,SFX,mcq}=K;const AR='font-family="IBM Plex Sans Arabic"';

/* ---------- 1) الإجهاد والارتداد المرن ---------- */
def('lab1',{after:'s1',n:'🧪 مختبر الإجهاد',eyebrow:'تجربة افتراضية · مقترحة',title:'مختبر الإجهاد: من التشوه إلى الزلزال',goal:'حرّك منزلق الإجهاد ببطء وراقب الطاقة المختزنة في الصخرة. ماذا يحدث عند تجاوز حد المرونة؟',plan:6,core:1,
 icon:'<path d="M8 40h64" stroke="currentColor" stroke-width="5"/><circle cx="40" cy="40" r="10" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="e1svg" viewBox="0 0 640 280" aria-label="صخرتان على جانبي صدع"></svg><div style="padding:10px"><label class="step-text">↔ الإجهاد المؤثر: <b id="e1v">0</b>%<input type="range" id="e1r" min="0" max="100" value="0" style="width:100%"></label><button class="tbtn" type="button" id="e1z">إعادة</button></div></div>
  <div class="side"><div class="card"><h3>الطاقة المختزنة</h3><div class="c6-meter"><i id="e1m" style="width:0"></i></div><div id="e1o" class="step-text mt">الصخور ساكنة.</div></div><div class="card"><h3>السيزموجراف</h3><svg id="e1g" viewBox="0 0 300 90" style="direction:ltr;background:#fff;border-radius:8px"></svg></div></div></div>`,
 init(){let broke=false,tm=null,amp=0,ph=0;const LIM=80;
  const draw=()=>{const v=+$('#e1r').value,b=broke?0:v;let s=`<rect width="640" height="280" fill="var(--wall)"/>`;
   const bend=b*0.6,shake=broke&&amp>0?Math.sin(ph*3)*amp*.4:0;
   s+=`<g transform="translate(${shake} 0)"><path d="M40 90 L320 90 Q${320} ${150-bend} 320 230 L40 230z" fill="#b07a43" stroke="#7c4a1e" stroke-width="3"/><path d="M60 120h240M60 160h240M60 200h240" stroke="#8f6230" stroke-width="2" opacity=".5"/></g>`;
   s+=`<g transform="translate(${-shake} 0)"><path d="M600 90 L324 90 Q${324} ${150+bend} 324 230 L600 230z" fill="#c08a52" stroke="#7c4a1e" stroke-width="3"/><path d="M340 120h240M340 160h240M340 200h240" stroke="#8f6230" stroke-width="2" opacity=".5"/></g>`;
   s+=`<path d="M322 80 V240" stroke="#7f1d1d" stroke-width="${broke?5:2}" stroke-dasharray="${broke?'0':'6 6'}"/>`;
   if(!broke&&b>0)s+=`<path d="M200 60 h80 M440 260 h-80" stroke="#dc2626" stroke-width="5" marker-end="url(#ah)"/><text x="240" y="50" text-anchor="middle" ${AR} font-size="14" fill="#dc2626">إجهاد</text>`;
   if(broke&&amp>0)for(let r=1;r<5;r++)s+=`<circle cx="322" cy="160" r="${(ph*20+r*40)%180}" fill="none" stroke="#dc2626" stroke-width="2" opacity="${1-((ph*20+r*40)%180)/180}"/>`;
   s+='<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#dc2626"/></marker></defs>';
   $('#e1svg').innerHTML=s;$('#e1v').textContent=v;$('#e1m').style.width=(broke?0:Math.min(100,b/LIM*100))+'%';
   let g='<path d="M0 45H300" stroke="#e2e8f0"/>';let d='M0 45';for(let x=0;x<=300;x+=3){const a=broke?amp*Math.exp(-(((x-150)/60)**2))*Math.sin(x*.6+ph):Math.sin(x*.9)*1;d+=` L${x} ${45-a}`;}$('#e1g').innerHTML=g+`<path d="${d}" fill="none" stroke="#dc2626" stroke-width="1.5"/>`;};
  $('#e1r').oninput=()=>{const v=+$('#e1r').value;if(broke)return;
   if(v>=LIM){broke=true;amp=40;ph=0;SFX.thud&&SFX.thud();$('#e1o').innerHTML='<b style="color:#dc2626">انكسرت الصخور!</b> تحررت الطاقة المختزنة فجأة على صورة اهتزازات (زلزال)، وعادت حواف الصخور إلى وضعها: <b>الارتداد المرن</b>.';G.add(8,'lab1');G.complete('lab1');
    clearInterval(tm);tm=setInterval(()=>{ph+=.4;amp*=.96;draw();if(amp<.5){amp=0;clearInterval(tm);draw();}},50);}
   else $('#e1o').textContent=v<20?'الصخور تتشوه ببطء…':'تتراكم الطاقة داخل الصخور (طاقة وضع)، والصخور تنثني.';draw();};
  $('#e1z').onclick=()=>{broke=false;amp=0;clearInterval(tm);$('#e1r').value=0;$('#e1o').textContent='الصخور ساكنة.';draw();};
  STN.lab1.stop=()=>clearInterval(tm);draw();},
 leave(){STN.lab1.stop&&STN.lab1.stop();},explain:'<p>تجربة مقترحة توضح الارتداد المرن: تراكم الطاقة ثم تحررها فجأة.</p>'});

/* ---------- 2) مولّد الصدوع ---------- */
const FT=[{k:'shd',n:'إجهاد شد ← ⟵ ⟶',f:'الصدع العادي',dx:-30,dy:40},{k:'dgt',n:'إجهاد ضغط ⟶ ⟵',f:'الصدع العكسي',dx:30,dy:-40},{k:'qs',n:'إجهاد قص ⇅',f:'الصدع الجانبي (الانزلاقي)',dx:0,dy:0,side:1}];
def('lab2',{after:'s2',n:'🧪 مولّد الصدوع',eyebrow:'تجربة افتراضية · مقترحة',title:'مولّد الصدوع: اختر الإجهاد وشاهد الصدع',goal:'اختر نوع الإجهاد ثم اضغط «طبّق القوة»، وسمِّ الصدع الناتج.',plan:6,core:1,
 icon:'<path d="M10 30h26l8 20h26M10 50h26" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="stage"><svg id="f2svg" viewBox="0 0 640 300" aria-label="كتلتان صخريتان"></svg><div class="toolbar" id="f2b" style="grid-template-columns:repeat(3,minmax(0,1fr))"></div></div>
  <div class="side"><div class="card"><h3>ما الصدع الناتج؟</h3><div id="f2q" class="step-text muted">طبّق قوة أولًا.</div></div></div></div>`,
 init(){let cur=null,t=0,tm=null;const named=new Set();
  const draw=()=>{const k=cur,p=Math.min(1,t);let s=`<rect width="640" height="300" fill="var(--wall)"/>`;
   const dx=k?k.dx*p:0,dy=k?k.dy*p:0;
   if(k&&k.side){const z=60*p;s+=`<g><polygon points="80,120 300,120 340,90 120,90" fill="#a3c76d"/><polygon points="80,120 300,120 300,240 80,240" fill="#c08a52"/></g><g transform="translate(${z} ${-z*.4})"><polygon points="320,120 560,120 600,90 360,90" fill="#a3c76d"/><polygon points="320,120 560,120 560,240 320,240" fill="#b07a43"/><polygon points="560,120 600,90 600,210 560,240" fill="#8f6230"/></g><path d="M200 70 l-20 0 M470 270 l20 0" stroke="#dc2626" stroke-width="6"/><text x="320" y="285" text-anchor="middle" ${AR} font-size="14" fill="var(--muted)">منظر علوي جانبي: الكتلتان تنزلقان أفقيًّا بمحاذاة بعضهما</text>`;}
   else{s+=`<polygon points="60,100 330,100 270,250 60,250" fill="#c08a52" stroke="#7c4a1e" stroke-width="3"/><path d="M60 100h270" stroke="#7c9a4b" stroke-width="10"/>`;
    s+=`<g transform="translate(${-dx} ${dy})"><polygon points="334,100 600,100 600,250 274,250" fill="#b07a43" stroke="#7c4a1e" stroke-width="3"/><path d="M334 100h266" stroke="#7c9a4b" stroke-width="10"/></g>`;
    s+=`<path d="M332 100 L272 250" stroke="#7f1d1d" stroke-width="3" stroke-dasharray="7 5"/><text x="340" y="80" ${AR} font-size="13" fill="var(--muted)">مستوى الصدع</text>`;
    if(k){const a=k.k==='shd';s+=`<path d="${a?'M150 175 h-80':'M70 175 h80'}" stroke="#dc2626" stroke-width="7" marker-end="url(#a2)"/><path d="${a?'M490 175 h80':'M570 175 h-80'}" stroke="#dc2626" stroke-width="7" marker-end="url(#a2)"/>`;}}
   s+='<defs><marker id="a2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="#dc2626"/></marker></defs>';$('#f2svg').innerHTML=s;};
  $('#f2b').innerHTML=FT.map((f,i)=>`<button class="tool" type="button" data-i="${i}"><span>${f.n}</span><span>طبّق القوة</span></button>`).join('');
  $$('#f2b .tool').forEach(b=>b.onclick=()=>{cur=FT[+b.dataset.i];t=0;clearInterval(tm);SFX.whoosh&&SFX.whoosh();tm=setInterval(()=>{t+=.04;draw();if(t>=1){clearInterval(tm);ask();}},40);});
  function ask(){const k=cur;$('#f2q').innerHTML=`<div class="c6-chips">${FT.map(f=>`<button class="c6-chip" type="button" data-f="${f.f}">${f.f}</button>`).join('')}</div><div class="qfb"></div>`;
   $$('#f2q [data-f]').forEach(b=>b.onclick=()=>{const fb=$('#f2q .qfb');if(b.dataset.f===k.f){named.add(k.k);G.good();G.add(4,'lab2');say(fb,'ok',`صحيح: ${k.f}.${named.size===3?' أنهيت الأنواع الثلاثة!':''}`);if(named.size===3)G.complete('lab2');}else{G.bad();say(fb,'bad','لاحظ اتجاه حركة الكتلة واتجاه القوة.');}});}
  STN.lab2.stop=()=>clearInterval(tm);draw();},leave(){STN.lab2.stop&&STN.lab2.stop();},
 explain:'<p>محاكاة مقترحة: الشد يُهبط الكتلة المعلقة (عادي)، والضغط يرفعها (عكسي)، والقص يجعل الكتلتين تنزلقان أفقيًّا (جانبي).</p>'});

/* ---------- 3) سباق الموجات ---------- */
def('lab3',{after:'s3',n:'🧪 سباق الموجات',eyebrow:'تجربة افتراضية · مقترحة',title:'سباق الموجات الزلزالية: كيف تهتز الجسيمات؟',goal:'أطلق الزلزال وراقب الموجات الثلاث: من يصل أولًا إلى محطة الرصد؟ وكيف تتحرك جسيمات الصخر مع كل موجة؟',plan:7,core:1,
 icon:'<path d="M4 30h8M16 30h4M24 30h8M36 30h4M44 30h8" stroke="currentColor" stroke-width="6"/><path d="M4 54c6-10 10 10 16 0s10 10 16 0 10 10 16 0" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="stage"><svg id="w3svg" viewBox="0 0 700 330" aria-label="سباق الموجات"></svg><div class="row-actions" style="padding:10px"><button class="btn" type="button" id="w3go">⚡ أطلق الزلزال</button><span class="hint-line" id="w3st"></span></div></div>
  <div class="card"><h3>رتّب الموجات حسب وصولها إلى المحطة</h3><div id="w3o"></div></div>`,
 init(){let t=0,tm=null;const W=[{n:'الأولية P',v:6,c:'#2563eb',y:70,typ:'P'},{n:'الثانوية S',v:3.5,c:'#16a34a',y:170,typ:'S'},{n:'السطحية',v:2.6,c:'#dc2626',y:270,typ:'L'}];const arr=[];
  const draw=()=>{let s=`<rect width="700" height="330" fill="var(--wall)"/><rect x="640" y="20" width="50" height="300" fill="#e2e8f0"/><text x="665" y="15" text-anchor="middle" ${AR} font-size="12" fill="var(--ink)">المحطة</text>`;
   W.forEach(w=>{s+=`<text x="10" y="${w.y-34}" ${AR} font-size="14" font-weight="800" fill="${w.c}">${w.n}</text><rect x="40" y="${w.y-26}" width="600" height="52" rx="8" fill="#d6a46b" opacity=".35"/>`;const front=40+w.v*t;
    for(let i=0;i<40;i++){const x0=50+i*15;let x=x0,y=w.y;const on=x0<front;const ph=(x0-front)/40;
     if(on){if(w.typ==='P')x=x0+Math.sin(ph*6.28)*6;else if(w.typ==='S')y=w.y+Math.sin(ph*6.28)*14;else{x=x0+Math.cos(ph*6.28)*7;y=w.y+Math.sin(ph*6.28)*14;}}
     s+=`<circle cx="${x}" cy="${y}" r="5" fill="${on?w.c:'#94a3b8'}"/>`;}
    if(front>=640&&!arr.includes(w.n)){arr.push(w.n);}
    s+=`<path d="M${Math.min(front,640)} ${w.y-30} v60" stroke="${w.c}" stroke-width="3" stroke-dasharray="4 4"/>`;});
   s+=`<text x="40" y="322" ${AR} font-size="12" fill="var(--muted)">P: اهتزاز للأمام والخلف · S: اهتزاز عمودي على اتجاه الحركة · السطحية: حركة التفافية</text>`;
   $('#w3svg').innerHTML=s;$('#w3st').textContent=arr.length?'ترتيب الوصول: '+arr.join(' ← '):'';};
  $('#w3go').onclick=()=>{t=0;arr.length=0;clearInterval(tm);SFX.thud&&SFX.thud();tm=setInterval(()=>{t+=1.6;draw();if(t*2.6>620){clearInterval(tm);SFX.pop();G.add(4,'lab3');}},40);};
  STN.lab3.stop=()=>clearInterval(tm);draw();
  C6.order($('#w3o'),['الأولية P','الثانوية S','السطحية'],'lab3',()=>G.complete('lab3'),'P أسرعها ثم S ثم السطحية الأبطأ والأكثر تدميرًا.');},
 leave(){STN.lab3.stop&&STN.lab3.stop();},explain:'<p>محاكاة مقترحة؛ السرعات نسبية للتوضيح.</p>'});

/* ---------- 4) حدّد المركز السطحي ---------- */
const STA=[{n:'محطة أ',x:140,y:90},{n:'محطة ب',x:520,y:110},{n:'محطة ج',x:300,y:300}];const EPI={x:330,y:170};
def('lab4',{after:'s4',n:'🧪 حدّد المركز السطحي',eyebrow:'تجربة افتراضية · مقترحة',title:'غرفة الرصد: حدّد المركز السطحي للزلزال',goal:'لكل محطة: احسب المسافة من الفرق بين زمن وصول S وP، ثم ارسم الدائرة. المس نقطة التقاء الدوائر الثلاث.',plan:8,core:1,
 icon:'<circle cx="28" cy="34" r="16" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="52" cy="34" r="16" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="40" cy="54" r="16" fill="none" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="two"><div class="stage"><svg id="t4svg" viewBox="0 0 640 400" aria-label="خريطة المحطات" style="cursor:crosshair"></svg></div>
  <div class="side"><div class="card"><h3>بيانات المحطات</h3><div class="tablewrap"><table class="c6-table" id="t4t"></table></div><p class="hint-line">قاعدة مبسطة للتجربة: كل ثانية فرق بين وصول S وP ≈ 8 كم. مقياس الخريطة: 1 وحدة = 1 كم.</p><div id="t4fb"></div></div></div></div>`,
 init(){const D=STA.map(s=>Math.round(Math.hypot(s.x-EPI.x,s.y-EPI.y)));const lag=D.map(d=>+(d/8).toFixed(1));const drawn=new Set();let guess=null;
  const draw=()=>{let s=`<rect width="640" height="400" fill="#dbeafe"/><path d="M0 230 Q160 200 300 240 T640 210 V400 H0z" fill="#bbf7d0"/><path d="M120 0 Q200 140 120 400" stroke="#93c5fd" stroke-width="18" fill="none" opacity=".6"/>`;
   STA.forEach((st,i)=>{if(drawn.has(i))s+=`<circle cx="${st.x}" cy="${st.y}" r="${D[i]}" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6 4"/>`;s+=`<path d="M${st.x} ${st.y-14} l-10 18 h20z" fill="#1e3a8a"/><text x="${st.x}" y="${st.y+22}" text-anchor="middle" ${AR} font-size="13" font-weight="800" fill="#1e3a8a">${st.n}</text>`;});
   if(guess)s+=`<circle cx="${guess.x}" cy="${guess.y}" r="8" fill="${guess.ok?'#16a34a':'#f59e0b'}" stroke="#fff" stroke-width="3"/>`;
   if(guess&&guess.ok)s+=`<text x="${EPI.x}" y="${EPI.y-16}" text-anchor="middle" ${AR} font-size="15" font-weight="800" fill="#16a34a">المركز السطحي</text>`;
   $('#t4svg').innerHTML=s;};
  const table=()=>{$('#t4t').innerHTML=`<thead><tr><th>المحطة</th><th>فرق الوصول S−P</th><th>المسافة</th><th></th></tr></thead><tbody>${STA.map((s,i)=>`<tr><td>${s.n}</td><td>${lag[i]} ث</td><td>${drawn.has(i)?D[i]+' كم':`<input type="number" data-i="${i}" style="width:70px;font:inherit" placeholder="كم">`}</td><td>${drawn.has(i)?'✓':`<button class="tbtn" type="button" data-c="${i}">ارسم</button>`}</td></tr>`).join('')}</tbody>`;
   $$('#t4t [data-c]').forEach(b=>b.onclick=()=>{const i=+b.dataset.c,v=+$(`#t4t input[data-i="${i}"]`).value;if(Math.abs(v-D[i])<=Math.max(3,D[i]*.05)){drawn.add(i);SFX.correct();G.add(3,'lab4');table();draw();if(drawn.size===3)say($('#t4fb'),'info','رُسمت الدوائر الثلاث. المس نقطة التقائها على الخريطة.');}else{SFX.wrong();say($('#t4fb'),'bad',`المسافة = الفرق × 8 = ${lag[i]} × 8. حاول مرة أخرى.`);}});};
  $('#t4svg').onclick=e=>{if(drawn.size<3)return;const r=$('#t4svg').getBoundingClientRect(),x=(e.clientX-r.left)/r.width*640,y=(e.clientY-r.top)/r.height*400;const ok=Math.hypot(x-EPI.x,y-EPI.y)<22;guess={x,y,ok};draw();if(ok){SFX.correct();say($('#t4fb'),'ok','أحسنت! المركز السطحي هو مكان التقاء الدوائر الثلاث.');G.complete('lab4');}else say($('#t4fb'),'bad','ليست نقطة الالتقاء. ابحث عن النقطة المشتركة بين الدوائر الثلاث.');};
  draw();table();},explain:'<p>تجربة مقترحة تطبق طريقة الدوائر الثلاث؛ معامل «8 كم لكل ثانية» تبسيط للتجربة.</p>'});

/* ---------- 5) حاسبة رختر ---------- */
def('lab5',{after:'s5',n:'🧪 حاسبة رختر',eyebrow:'تجربة افتراضية · مقترحة',title:'حاسبة رختر: قارن زلزالين',goal:'حرّك قوتي الزلزالين وقارن: كم مرة تكبر سعة الموجة؟ وكم مرة تكبر الطاقة؟',plan:6,core:1,
 icon:'<rect x="8" y="50" width="10" height="18" fill="currentColor"/><rect x="34" y="20" width="10" height="48" fill="currentColor"/><path d="M54 30l16 0M62 22v16" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="card"><label class="step-text">🇦 الزلزال الأول: <b id="r5a">5.5</b><input type="range" id="r5A" min="3" max="9" step="0.5" value="5.5" style="width:100%"></label><label class="step-text">🇧 الزلزال الثاني: <b id="r5b">6.5</b><input type="range" id="r5B" min="3" max="9" step="0.5" value="6.5" style="width:100%"></label><div id="r5o" class="mt"></div></div>
  <div class="stage"><svg id="r5svg" viewBox="0 0 400 260" aria-label="مقارنة"></svg></div></div><div class="card"><div id="r5q"></div></div>`,
 init(){const draw=()=>{const a=+$('#r5A').value,b=+$('#r5B').value;$('#r5a').textContent=a;$('#r5b').textContent=b;const d=Math.abs(b-a),hi=b>=a?'الثاني':'الأول';
   const amp=Math.pow(10,d),en=Math.pow(32,d);$('#r5o').innerHTML=`<div class="story">الفرق = <b>${d}</b> درجة.<br>سعة موجة الزلزال ${hi} أكبر <b>${amp>=1000?amp.toLocaleString('ar-SA',{maximumFractionDigits:0}):+amp.toFixed(1)}</b> مرة.<br>طاقة الزلزال ${hi} أكبر بنحو <b>${en>=1000?Math.round(en).toLocaleString('ar-SA'):+en.toFixed(1)}</b> مرة.</div>`;
   const ha=Math.min(200,20*Math.pow(10,(a-3)/3)),hb=Math.min(200,20*Math.pow(10,(b-3)/3));
   $('#r5svg').innerHTML=`<rect width="400" height="260" fill="#fff"/><path d="M0 130H400" stroke="#e2e8f0"/>${[['#2563eb',100,ha,a],['#dc2626',300,hb,b]].map(([c,x,h,m])=>{let d='';for(let i=0;i<=160;i+=2){const y=130-Math.sin(i*.35)*h/2*Math.exp(-(((i-80)/40)**2));d+=(i?'L':'M')+(x-80+i)+' '+y;}return `<path d="${d}" fill="none" stroke="${c}" stroke-width="2"/><text x="${x}" y="250" text-anchor="middle" font-size="14" font-weight="800" fill="${c}">${m}</text>`;}).join('')}<text x="200" y="20" text-anchor="middle" ${AR} font-size="12" fill="#64748b">ارتفاع الموجات مضغوط للعرض</text>`;};
  ['r5A','r5B'].forEach(i=>$('#'+i).oninput=()=>{SFX.tick();draw();});draw();
  K.calcQ($('#r5q'),{p:'زلزال قوته 7 وآخر قوته 5. كم مرة تكبر سعة الموجة الزلزالية للأول؟',v:100,unit:'مرة',given:'الفرق = 2 درجة',law:'كل درجة × 10',sol:'10 × 10 = 100 مرة'},'lab5',()=>G.complete('lab5'));},
 explain:'<p>كل درجة على رختر = سعة أكبر 10 مرات وطاقة أكبر نحو 32 مرة. (أداة مقترحة.)</p>'});

/* ---------- 6) محاكي التسونامي ---------- */
def('lab6',{after:'s6',n:'🧪 محاكي التسونامي',eyebrow:'تجربة افتراضية · مقترحة',title:'محاكي التسونامي: من المحيط العميق إلى الشاطئ',goal:'أطلق زلزال قاع المحيط وراقب سرعة الموجة وارتفاعها كلما اقتربت من الشاطئ.',plan:6,core:1,
 icon:'<path d="M4 56c10-30 34-40 48-30-12 0-16 10-12 18 6 10 22 6 36 0v16H4z" fill="currentColor"/>',
 body:`<div class="stage"><svg id="s6svg" viewBox="0 0 700 300" aria-label="محيط وشاطئ"></svg><div class="row-actions" style="padding:10px"><button class="btn" type="button" id="s6go">⚡ زلزال في قاع المحيط</button><span class="step-text" id="s6o"></span></div></div><div class="card"><div id="s6q"></div></div>`,
 init(){let x=-1,tm=null;const depth=X=>X<450?220:220-(X-450)*0.75;
  const draw=()=>{let s=`<rect width="700" height="300" fill="#e0f2fe"/>`;let d='M0 100';for(let X=0;X<=700;X+=5){let h=0;if(x>=0){const dd=Math.abs(X-x);const H=x<450?6:6+((x-450)/250)*80;h=Math.exp(-((dd/(x<450?60:35))**2))*H;}d+=` L${X} ${100-h}`;}
   s+=`<path d="${d} L700 300 L0 300z" fill="#3b82f6" opacity=".75"/><path d="M0 ${100+220} L450 320 L700 132 V300 H0z" fill="#d6a46b"/><path d="M0 300 L450 300" stroke="none"/>`;
   s+=`<path d="M450 320 Q600 200 700 130 V300 H450z" fill="#d6a46b"/><rect x="640" y="80" width="18" height="40" fill="#64748b"/><rect x="662" y="70" width="18" height="50" fill="#94a3b8"/>`;
   s+=`<circle cx="120" cy="300" r="10" fill="#dc2626"/><text x="120" y="290" text-anchor="middle" ${AR} font-size="12" fill="#7f1d1d">بؤرة الزلزال</text>`;
   s+=`<path d="M250 70 l-14 22 h28z" fill="#ef4444"/><text x="250" y="60" text-anchor="middle" font-size="18">⛴</text>`;$('#s6svg').innerHTML=s;
   if(x>=0){const deep=x<450;$('#s6o').innerHTML=deep?'المياه العميقة: السرعة نحو <b>950 كم/ساعة</b>، والارتفاع <b>أقل من متر</b> (السفينة لا تحس بها).':`قرب الشاطئ: الموجة تتباطأ ويزداد ارتفاعها حتى <b>${Math.round(1+(x-450)/250*29)} م</b>.`;}};
  $('#s6go').onclick=()=>{x=120;clearInterval(tm);SFX.thud&&SFX.thud();tm=setInterval(()=>{x+=x<450?9:3;draw();if(x>=690){clearInterval(tm);G.add(5,'lab6');}},40);};
  STN.lab6.stop=()=>clearInterval(tm);draw();
  mcq($('#s6q'),{q:'لماذا يزداد ارتفاع موجة التسونامي عند اقترابها من الشاطئ؟',o:['لأنها تتباطأ بسبب احتكاكها بقاع البحر فيزداد ارتفاعها','لأن الرياح تدفعها','لأن الماء يسخن','لأن الزلزال يتكرر'],a:0},'lab6',()=>G.complete('lab6'));},
 leave(){STN.lab6.stop&&STN.lab6.stop();},explain:'<p>محاكاة مقترحة؛ القيم مأخوذة من العرض (950 كم/ساعة، أقل من متر، حتى 30 مترًا).</p>'});
})();

/*@css c2.css*/
/*@include lab4.js*/
/*@include kit.js*/
/*@include skit.js*/
/* ===== الفصل الثاني · الدرس الأول: الزلازل — «مرصد الهزات» ===== */
(function(){
const {$,$$,G,STN,def,mcq,flips,match,sortGame,challenge,say,SFX,pic,slides,escape,auction,race,riddles,choiceBoard,solutions,ayah,safety}=K;
const {fig,grid,reveal,ICO,lst,order,fill,tfx,label}=C6;const P=(n,c)=>[n,c];

def('intro',{n:'الافتتاحية',plan:3,icon:'<path d="M4 40h12l6-16 8 32 8-40 8 48 8-24 6 12h16" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>',
 body:`<div class="hero"><div class="hero-photo">${pic('s01_53617de8','تشقق الأرض')}<span class="cap">الفصل الثاني: تغيرات الأرض.</span></div>
  <div><span class="eyebrow">مرصد الهزات</span><h2 class="hero-h">ما الذي يجعل الأرض تهتز تحت أقدامنا؟</h2>
   <p class="riddle">لعلك حاولت يومًا ثني غصن شجرة جاف أو كسره. ماذا شعرت لحظة انكساره؟ إن ما يحدث في الغصن يحدث تمامًا في صخور القشرة الأرضية!</p>
   <p class="q">ما توقعك قبل أن تبدأ؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div>`,init(){}});

const GOALS=['توضح كيف تحدث الزلازل نتيجة تراكم الإجهادات في صخور القشرة الأرضية.','تقارن بين الموجات الأولية والثانوية والسطحية.','تتعرف مخاطر الزلازل، وكيف تستعد لها.'];
const TERMS=[{t:'الطاقة',d:'القدرة على إحداث تغيير أو إنجاز شغل. (مراجعة المفردات)'},{t:'الزلزال',d:'اهتزازات في الصخور تنتج عن كسر الصخور وحركتها نتيجة للتحرر المفاجئ للطاقة.'},{t:'الصدع',d:'كسر في الصخر تتحرك فيه الأجزاء المكسورة على جانبي سطح الكسر وتنزلق.'},{t:'الموجة الزلزالية',d:'الموجات التي تصدر عن الزلازل وتنتقل عبر مواد الأرض وعلى سطحها.'},{t:'بؤرة الزلزال',d:'النقطة داخل الأرض التي تبدأ الحركة عندها وتتحرر الطاقة.'},{t:'المركز السطحي للزلزال',d:'النقطة التي على سطح الأرض الواقعة فوق بؤرة الزلزال مباشرة.'},{t:'السيزموجراف',d:'جهاز يُستعمل للحصول على تسجيل للموجات الزلزالية (راسم الهزة).'},{t:'قوة الزلزال',d:'مقدار الطاقة التي تتحرر من الزلزال، ويقيسها مقياس رختر.'},{t:'موجات التسونامي',d:'موجات مائية كبيرة جدًّا تتولد عند حدوث زلزال في قاع المحيط.'},{t:'آمن ضد الزلازل',d:'مبانٍ ومنشآت مصممة لتقليل الضرر الناتج عن الزلازل.'}];
def('goals',{n:'الأهداف والمفردات',eyebrow:'الكتاب صفحة 50–52',title:'الأهداف والمفردات',goal:'تعرّف أهداف الدرس وأهميته ومفرداته.',plan:4,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><div class="story mt"><b>أهمية الدرس:</b> تساعدك دراسة الزلازل على معرفة أماكن حدوثها وكيفية الاستعداد لها.</div></div>
  <div class="card"><h3>مراجعة المفردات</h3><p class="step-text"><b>الطاقة:</b> القدرة على إحداث تغيير أو إنجاز شغل.</p><h3 class="mt">المفردات الجديدة</h3><ul class="tasks plain" style="columns:2">${TERMS.slice(1).map(t=>`<li>${t.t}</li>`).join('')}</ul></div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المفردات</h2></div><div id="g4f"></div></div><div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2></div><div id="g4m"></div></div>`,
 init(){flips($('#g4f'),TERMS);this.reset();},reset(){match($('#g4m'),TERMS.slice(1,7).map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));}});

def('s0',{n:'غضب أم رحمة',eyebrow:'الكتاب صفحة 52',title:'غضب أم رحمة',goal:'الأرض خلق من خلق الله، تأتمر بأمره وتخضع لتدبيره وتقديره.',plan:2,icon:'<path d="M14 64c4-20 20-30 26-50 6 20 22 30 26 50z" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="card"><p class="step-text">لا شك أن الأرض بما فيها خلق من خلق الله، تأتمر بأمره وتخضع لتدبيره وتقديره، وقد أخبر الله عز وجل في محكم آياته عن ظاهرة عظيمة تحدث في الطبيعة؛ وهي ظاهرة الزلازل. قال تعالى:</p><p style="text-align:center">${ayah('إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا','الزلزلة: 1')}</p></div>
  <div class="card">${fig('s05_8f21eeb8','للزلازل حِكم بالغة',260)}<p class="step-text">للزلازل حِكم بالغة، منها: بيان لقدرة الله وعظمته، وضعف العباد وعجزهم، وإهلاك الظالمين بذنوبهم وعصيانهم، وتخويف المؤمنين وتذكيرهم ليتوبوا وينيبوا إلى ربهم.</p></div></div>`,enter(){G.complete('s0');}});

def('s1',{n:'1 · أسباب الزلازل',eyebrow:'المحطة 1 · الكتاب صفحة 52–53',title:'أسباب الزلازل: الارتداد المرن',goal:'عندما لا ينكسر الغصن تختزن طاقة وضع فيه، وعندما ينكسر تتحرر الطاقة على صورة اهتزازات.',plan:7,core:1,icon:'<path d="M8 50c20-6 30-24 32-36M40 14c4 14 16 30 32 36" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
 body:`<div class="card" id="s1sl"></div><div class="two"><div class="card"><h3>تقويم · السؤال 1</h3><div id="s1q1"></div></div><div class="card"><h3>تقويم · السؤال 2</h3>${fig('s10_30ef46ba','مراحل الارتداد المرن',300)}<div id="s1q2"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s1');};
  slides($('#s1sl'),[
   {k:'أسباب الزلازل',t:'الغصن الجاف',im:[P('s06_5f896e9f','عندما لا ينكسر'),P('s06_7bc2afa1','عندما ينكسر')],html:'<p>لعلك حاولت يومًا ثني غصن شجرة جاف أو كسره.</p><ul><li><b>عندما لا ينكسر:</b> تُختزن <b>طاقة وضع</b> في الغصن الجاف عند ثنيه.</li><li><b>عندما ينكسر:</b> تتحرر الطاقة على صورة <b>اهتزازات</b> عندما انكسر الغصن الجاف.</li></ul>'},
   {k:'أسباب الزلازل',t:'الارتداد المرن',im:[P('s07_8173eb43','الغصن عند ثنيه'),P('s07_26dd955e','صخور القشرة')],html:'<p>كما يحدث في غصن الشجرة عند ثنيه، تمامًا يحدث ذلك في صخور القشرة الأرضية؛ فعندما تتعرض الصخور – بمشيئة الله وقدرته – لقوة كافية يتغير شكلها، كما أنها قد تنكسر، ثم تعود حواف الأجزاء المكسورة سريعًا إلى مكانها الأصلي.</p><p class="def">تسمى هذه العملية <b>الارتداد المرن</b>.</p>'},
   {k:'أسباب الزلازل',t:'من الإجهاد إلى الاهتزاز',im:[P('s08_a6495129','تشوه الصخور'),P('s08_1031b845','تكسر الصخور')],html:'<p>تتغير أشكال الصخور عادة أو تتشوه ببطء خلال فترات زمنية طويلة. فمع تعرّض الصخور للإجهادات تتراكم طاقة داخلها، ثم تتحرر هذه الطاقة فجأة نتيجة تكسّر الصخور وتحركها.</p><p>تؤدي هذه التكسرات والحركات إلى حدوث <b>اهتزازات تنتقل</b> خلال الصخر أو أي مادة في الأرض. وإذا كانت هذه الاهتزازات كبيرة لدرجة كافية فسوف نحس بها على هيئة <b>زلزال</b>.</p>'}],'s1');
  mcq($('#s1q1'),{q:'اهتزازات في الصخور تنتج عن كسر الصخور وحركتها نتيجة للتحرر المفاجئ للطاقة:',o:['الصدع','الزلزال','الكسر','الطاقة'],a:1},'s1',c);
  mcq($('#s1q2'),{q:'عندما تتعرض الصخور للإجهادات ثم الكسر فإن القطع المكسورة تعود إلى مكانها الأصلي، وتسمى هذه العملية:',o:['التكسر','البراكين','الارتداد المرن','التجوية'],a:2},'s1',c);}});

def('s2',{n:'2 · أنواع الصدوع',eyebrow:'المحطة 2 · الكتاب صفحة 53',title:'الصدع وأنواع الصدوع',goal:'يعتمد نوع الصدع الناتج على نوع قوة الإجهاد المؤثرة في الصخر.',plan:7,core:1,icon:'<path d="M8 30h28l8 20h28M8 50h28" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="card"><h3>ما معنى الصدع في اللغة العربية؟</h3>${fig('s11_28aeb9c5','الصدع',300)}<p class="step-text">يقول الله عز وجل: ${ayah('وَالْأَرْضِ ذَاتِ الصَّدْعِ','الطارق: 12')}</p><p class="step-text"><b>الصَّدع لغةً:</b> الشَّقُّ في الشيء الصُّلب كالزجاجة والحائط وغيرهما، وجمعه صُدوع.</p><p class="def"><b>الصدع:</b> عندما يُكسر مقطع من الصخر تتحرك الصخور التي على جانبي الكسر نتيجة الارتداد المرن، ويسمى هذا الكسر الصدع؛ وهو كسر في الصخر تتحرك فيه الأجزاء المكسورة على جانبي سطح الكسر وتنزلق.</p></div>
  <div class="card"><h3>أنواع الصدوع</h3><div class="tablewrap"><table class="c6-table"><thead><tr><th>الصدع</th><th>قوة الإجهاد</th></tr></thead><tbody><tr><td>العادي</td><td>ينتج عندما تُسحب الصخور من الجانبين تحت تأثير إجهادات الشد (قوى الشد).</td></tr><tr><td>العكسي</td><td>ينتج عندما تتعرض الصخور لإجهادات ضغط.</td></tr><tr><td>الجانبي (الانزلاقي)</td><td>ينتج عندما تتعرض الصخور لإجهادات قص.</td></tr></tbody></table></div>${grid([['s12_822116d2','الصدع العادي'],['s12_c26d8994','الصدع العكسي'],['s12_ac20e79b','الصدع الجانبي']])}<div id="s2m" class="mt"></div></div></div>
  <div class="card"><h3>لنتأمل الأسئلة التالية</h3>${lst(['من أين تأتي القوى التي تؤدي إلى تشويه الصخور أو كسرها؟','لماذا تتشكل الصدوع؟','لماذا تتكون الزلازل في أماكن محددة؟','كيف تنتج القوى داخل الأرض؟'])}<p class="hint-line">ستجد إجاباتها في درس «الصفائح الأرضية وعلاقتها بالزلازل والبراكين».</p></div>`,
 init(){match($('#s2m'),[['الصدع العادي','إجهادات الشد'],['الصدع العكسي','إجهادات الضغط'],['الصدع الجانبي','إجهادات القص']],'s2',()=>G.complete('s2'));},
 explain:'<p>تنبيه: صور الصدوع الثلاثة من العرض؛ تأكد من مطابقتها للتسمية عند العرض. الصدع العادي (شد)، العكسي (ضغط)، الجانبي (قص).</p>'});

def('s3',{n:'3 · الموجات الزلزالية',eyebrow:'المحطة 3 · الكتاب صفحة 54',title:'الموجات الزلزالية: البؤرة والمركز السطحي وأنواع الموجات',goal:'درست في الصف الثاني المتوسط الموجات وأنواعها. الموجات الزلزالية موجات ميكانيكية تحتاج إلى وسط مادي لكي تنتقل.',plan:8,core:1,icon:'<circle cx="40" cy="56" r="6" fill="currentColor"/><path d="M24 56a16 16 0 0 1 32 0M14 56a26 26 0 0 1 52 0M4 56a36 36 0 0 1 72 0" fill="none" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="card" id="s3sl"></div><div class="two"><div class="card"><h3>عنون الشكل</h3><div id="s3lab"></div></div><div class="card"><h3>قارن بين الموجات</h3><div class="tablewrap"><table class="c6-table"><thead><tr><th>الموجة</th><th>حركتها</th><th>سرعتها</th></tr></thead><tbody><tr><td>الأولية P</td><td>طولية: تهتز جسيمات الصخر إلى الأمام وإلى الخلف في اتجاه سير الموجة.</td><td>كبيرة</td></tr><tr><td>الثانوية S</td><td>مستعرضة: تهتز جسيمات الصخر عموديًّا على اتجاه حركة الموجة.</td><td>متوسطة</td></tr><tr><td>السطحية</td><td>معقدة: التفافية خلفية، وأفقية موازية لسطح الأرض.</td><td>بطيئة</td></tr></tbody></table></div><div id="s3q" class="mt"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s3');};
  slides($('#s3sl'),[
   {k:'ما الموجات؟',t:'الموجات الزلزالية',im:[P('s14_1164b4ba','الموجات'),P('s14_bfc3daa8','الموجات في الصخر')],html:'<p>تحتاج الموجات الميكانيكية إلى وسط مادي لكي تنتقل، كذلك الموجات الناتجة عن الزلازل فإنها تنتقل عبر صخور القشرة الأرضية مسببة هزات أرضية، تسمى <b>الموجات الزلزالية</b>.</p><p class="def"><b>تعريف:</b> الموجات التي تصدر عن الزلازل وتنتقل عبر مواد الأرض وعلى سطحها.</p>'},
   {k:'مناطق الزلزال',t:'البؤرة والمركز السطحي',im:[P('s15_56950327','البؤرة والمركز السطحي')],html:'<p class="def"><b>بؤرة الزلزال:</b> النقطة داخل الأرض التي تبدأ الحركة عندها وتتحرر الطاقة.</p><p class="def"><b>المركز السطحي للزلزال:</b> النقطة التي على سطح الأرض الواقعة فوق بؤرة الزلزال مباشرة.</p><p><b>ماذا قرأت؟ أين توجد بؤرة الزلزال؟</b> داخل باطن الأرض مباشرة أسفل المركز السطحي للزلزال.</p>'},
   {k:'أنواع الموجات',t:'(1) الأولية P',im:[P('s17_f2a6f53d','الموجات P وS')],html:'<p>موجات طولية تنتقل داخل الصخر، مما يؤدي إلى تحرك جسيمات الصخر إلى الأمام وإلى الخلف، أو تهتز في نفس الاتجاه الذي تسير فيه الموجات. <b>سرعتها كبيرة.</b></p>'},
   {k:'أنواع الموجات',t:'(2) الثانوية S',im:[P('s17_f2a6f53d','الموجات P وS')],html:'<p>موجات مستعرضة تنتقل خلال المواد الصخرية، مما يؤدي إلى اهتزاز جسيمات الصخر بشكل عمودي على اتجاه حركة الموجات. <b>سرعتها متوسطة.</b></p>'},
   {k:'أنواع الموجات',t:'(3) السطحية',im:[P('s34_0f0ab0e6','الموجات السطحية')],html:'<p>حركتها معقدة، منها:</p><ul><li>تتحرك على امتداد سطح الأرض فتحرك الصخر والتربة حركة التفافية خلفية.</li><li>تتحرك أفقيًّا وبصورة موازية لسطح الأرض، مما يدمر المنشآت والأبنية.</li></ul><p><b>بطيئة السرعة.</b></p><p class="hint-line">تصحيح: ورد في العرض «السطحية S» والصواب «السطحية» فقط؛ فالرمز S للموجات الثانوية.</p>'}],'s3');
  label($('#s3lab'),{fig:`<svg viewBox="0 0 260 200" style="max-width:260px"><rect width="260" height="70" fill="#bae6fd"/><path d="M0 70 Q70 60 130 70 T260 66 V200 H0z" fill="#d6a46b"/><path d="M60 200 L170 70" stroke="#7c2d12" stroke-width="4" stroke-dasharray="8 5"/>${[20,40,60].map(r=>`<circle cx="140" cy="140" r="${r}" fill="none" stroke="#dc2626" stroke-width="2"/>`).join('')}<circle cx="140" cy="140" r="7" fill="#dc2626"/><path d="M140 70 l-7 -14 h14z" fill="#1d4ed8"/><text x="150" y="146" font-size="18" font-weight="800" fill="#0f172a">1</text><text x="150" y="56" font-size="18" font-weight="800" fill="#0f172a">2</text><text x="40" y="190" font-size="18" font-weight="800" fill="#0f172a">3</text><text x="196" y="110" font-size="18" font-weight="800" fill="#0f172a">4</text></svg>`,slots:[['1','بؤرة الزلزال'],['2','المركز السطحي للزلزال'],['3','الصدع'],['4','الموجات الزلزالية']]},'s3',c);
  mcq($('#s3q'),{q:'أي أنواع الموجات الزلزالية أكثر تدميرًا؟',o:['الأولية','الثانوية','السطحية','جميعها بالدرجة نفسها'],a:2,why:'لأنها تتحرك أفقيًّا موازية لسطح الأرض فتدمّر المنشآت والأبنية.'},'s3',c);}});

def('s4',{n:'4 · قياسات الزلزال',eyebrow:'المحطة 4 · الكتاب صفحة 55–56',title:'التعلم من الزلزال: السيزموجراف وتحديد المركز السطحي',goal:'استخدم العلماء اختلاف سرعة الموجات الزلزالية واختلاف زمن الوصول في حساب البعد عن المركز السطحي للزلزال.',plan:7,core:1,icon:'<rect x="10" y="22" width="60" height="36" rx="5" fill="none" stroke="currentColor" stroke-width="5"/><path d="M16 40h10l4-10 6 20 6-26 6 22 4-6h12" fill="none" stroke="currentColor" stroke-width="3"/>',
 body:`<div class="card" id="s4sl"></div>`,
 init(){slides($('#s4sl'),[
  {k:'التعلم من الزلزال',t:'اختلاف السرعة وزمن الوصول',im:[P('s20_fedd3a27','موجات P وS')],html:'<p>استخدم العلماء اختلاف سرعة الموجات الزلزالية واختلاف زمن الوصول في حساب البعد عن المركز السطحي للزلزال.</p><p>يتم الاعتماد على الاختلاف في السرعة ما بين الموجات الأولية والثانوية لتحديد المسافة عن الموقع السطحي للزلزال.</p>'},
  {k:'قياسات الزلزال',t:'السيزموجراف (راسم الهزّة)',im:[P('s21_ebb5156c','السيزموجراف'),P('s22_f7d8c7c5','تسجيل الموجات')],html:'<p class="def"><b>السيزموجراف:</b> جهاز يُستعمل للحصول على تسجيل للموجات الزلزالية.</p><p><b>صف طريقة عمله؟</b> يُثبّت قلم على ثقل معلق لا يتحرك بسهولة، بينما تهتز الأسطوانة مع الأرض فيرسم القلم الاهتزازات على الورقة. (وصف مقترح)</p><p><b>قوة الزلزال:</b> طول الخط المسجل على الورقة يشير إلى الطاقة التي تحررت من الزلزال.</p>'},
  {k:'قياسات الزلزال',t:'منحنى زمن الوصول',im:[P('s23_f5da0d68','منحنى زمن وصول الموجات')],html:'<p>تنتقل موجات P وS بسرعات مختلفة، ويستخدم الفرق في السرعات لمعرفة مدى قرب محطة الرصد من موقع الزلزال.</p>'},
  {k:'قياسات الزلزال',t:'ثلاث محطات رصد على الأقل',im:[P('s24_530b0292','تقاطع الدوائر الثلاث')],html:'<p>بعد حساب المسافة من ثلاث محطات رصد على الأقل يتم رسمها على الخريطة في صورة دوائر ذات أنصاف أقطار تساوي بعد الزلزال عن المحطة. يكون المركز السطحي للزلزال هو مكان التقاء الدوائر الثلاث.</p><p class="def"><b>خلاصة:</b> يمكن تحديد المركز السطحي إذا تم تسجيل زمن وصول الموجات الزلزالية في ثلاث محطات رصد على الأقل.</p>'}],'s4',()=>G.complete('s4'));},
 explain:'<p>وصف عمل السيزموجراف مقترح لأن العرض طرحه سؤالًا دون إجابة.</p>'});

const RT=[['أقل من 2.0','دقيق','زلازل دقيقة لا يمكن أن يحس بها.','حوالي 8,000 يوميًّا'],['2.0–2.9','صغير جدًّا','لا يشعر به البشر ولكن الأجهزة ترصده.','حوالي 1,000 يوميًّا'],['3.0–3.9','صغير جدًّا','يشعر به البشر، لكن قلما يسبب ضررًا.','49,000 سنويًّا (تقديري)'],['4.0–4.9','خفيف','يشعر البشر بهزة مع تحرك الأشياء وظهور صوت للزلزال، لكنه لا يسبب ضررًا.','6,200 سنويًّا (تقديري)'],['5.0–5.9','معتدل','المباني الضعيفة قد تتضرر بشكل كبير، ولكن المباني القوية لا تتضرر كثيرًا.','800 سنويًّا'],['6.0–6.9','قوي','يمكن أن يسبب ضررًا كبيرًا حتى 160 كم عن نقطة حدوثه.','120 سنويًّا'],['7.0–7.9','كبير','يمكن أن يسبب أضرارًا كبيرة على مساحة كبيرة.','18 سنويًّا'],['8.0–8.9','عظيم','يمكن أن يسبب أضرارًا كبيرة حتى مئات الأميال عن نقطة حدوثه.','1 سنويًّا'],['9.0–9.9','عظيم','يمكن أن يسبب أضرارًا كبيرة حتى آلاف الأميال عن نقطة حدوثه.','مرة لكل 20 سنة']];
def('s5',{n:'5 · قوة الزلزال وشدته',eyebrow:'المحطة 5 · الكتاب صفحة 56–57',title:'مقدار قوة الزلازل: مقياس رختر ومقياس ميركالي',goal:'قوة الزلزال يقيسها رختر (الطاقة)، وشدته يقيسها ميركالي (التدمير).',plan:8,core:1,icon:'<rect x="8" y="50" width="10" height="18" fill="currentColor"/><rect x="24" y="40" width="10" height="28" fill="currentColor"/><rect x="40" y="28" width="10" height="40" fill="currentColor"/><rect x="56" y="12" width="10" height="56" fill="currentColor"/>',
 body:`<div class="card" id="s5sl"></div><div class="card"><h3>مقياس رختر: الوصف والتأثير وتكرار الحدوث</h3><div class="tablewrap"><table class="c6-table"><thead><tr><th>مقياس رختر</th><th>الوصف</th><th>تأثير الزلزال</th><th>تكرر حدوثه</th></tr></thead><tbody>${RT.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>
  <div class="two"><div class="card"><h3>مثال: زلزال الهند 5.5 وزلزال تايوان 6.5</h3>${fig('s29_eb7dda3e','الهند وتايوان',300)}${lst(['ارتفاع الموجة الزلزالية لزلزال تايوان أكبر 10 مرات من ارتفاع الموجة الزلزالية لزلزال الهند.','الطاقة المتحررة من زلزال تايوان أكبر بمقدار 32 مرة من الطاقة المتحررة من زلزال الهند.'])}</div>
   <div class="card"><h3>تدمير الزلزال: مقياس ميركالي</h3><p class="def"><b>شدة الزلزال:</b> قياس لمقدار التدمير الجيولوجي والبنائي الحادث في منطقة معينة بسبب الزلزال، ويستخدم لقياسها مقياس ميركالي.</p><p class="step-text">وتتراوح الشدة بالأرقام الرومانية من رقم I (1) إلى رقم XII (12):</p>${lst(['الزلزال الذي شدته I يحس به قليل من الناس في الظروف العادية.','أما الزلزال الذي شدته VI (أي 6) فيحس به الجميع.','أما الزلزال الذي شدته XII (أي 12) فيسبب تدميرًا كبيرًا في المباني وسطح الأرض.'])}<p class="hint-line">تصحيح: ورد في العرض «XII أي 7» والصواب «XII أي 12».</p></div></div>`,
 init(){slides($('#s5sl'),[
  {k:'مقدار قوة الزلازل',t:'زلازل مدمرة',im:[P('s25_fb4aa408','زلزال تايوان'),P('s25_d956aeb9','دمار الزلزال')],html:'<p>في 20 من سبتمبر عام 1999م ضرب زلزال كبير منطقة في تايوان، وخلّف أكثر من 2400 قتيل و8700 جريح، وترك 100000 شخص بلا مأوى.</p><p class="hint-line">ورد في العرض «زلزال ضرب المكسيك عام 2024 خلف دمارًا كبيرًا»؛ والمعروف أن زلزال المكسيك المدمّر وقع في 19 سبتمبر 2017م (7.1 درجات)، لذا صُحّحت السنة.</p>'},
  {k:'قياسات الزلزال',t:'مقياس رختر',im:[P('s26_ca0186f1','مقياس رختر'),P('s28_13f2a8c5','مقياس قوة الزلازل')],html:'<p>يعتمد مقياس رختر لقياس قوة الزلازل على قياسات سعة (أو ارتفاع) الموجة الزلزالية المسجلة على جهاز السيزموجراف. ويصف مقياس رختر مقدار <b>الطاقة التي تتحرر من الزلزال</b>.</p><p class="def">كل زيادة بمقدار درجة واحدة على مقياس رختر تعني: سعة أكبر موجة زلزالية مسجلة على جهاز الرصد مقدارها <b>10 مرات</b>، وتعني مضاعفة طاقة الزلزال إلى <b>32 ضعفًا</b> تقريبًا.</p>'}],'s5',()=>G.complete('s5'));}});

def('ev1',{n:'تقويم 3–11',eyebrow:'تقويم · الأسئلة 3–11',title:'تقويم: الصدوع والموجات والمقاييس',goal:'أسئلة التقويم كما في العرض.',plan:7,core:1,icon:ICO.check,body:'<div class="card" id="ev1b"></div>',
 init(){STN.ev1.c=challenge($('#ev1b'),[
  {k:'3',q:'أي مما يلي يصف الصدع:',o:['نقطة تقع على سطح الأرض فوق بؤرة الزلزال','سطح تتكسر عليه الصخور وتحدث على امتداده إزاحة','نقطة داخل الأرض بدأت عندها الإزاحة أثناء حدوث الزلزال','عودة الصخر إلى وضعه الأصلي بعد تعرضه لإجهاد ما'],a:1},
  {k:'4',q:'الشكل التالي يمثل الصدع:',fig:K.pic('s32_acd76096','صدع'),o:['العكسي','الجانبي','الانزلاقي','العادي'],a:3,why:'كما في العرض: صدع عادي (الكتلة فوق مستوى الصدع هبطت بفعل الشد).'},
  {k:'5',q:'ماذا تمثل النقطة المشار إليها بالحرف (a) أسفل المركز السطحي؟',o:['المركز السطحي للزلزال','بؤرة الزلزال','الصدع','الموجات'],a:1},
  {k:'6',q:'الموجات الزلزالية المسببة لمعظم الدمار على سطح الأرض:',o:['السطحية','الأولية','الثانوية','جميع ما سبق صحيح'],a:0},
  {k:'7',q:'النقطة التي تقع فوق بؤرة الزلزال مباشرة:',o:['المركز السطحي للزلزال','منشأ الزلزال','الصدع','الفوهة'],a:0},
  {k:'8',q:'أي الموجات الزلزالية أسرع:',o:['الأولية','الثانوية','السطحية','الباطنية'],a:0},
  {k:'9',q:'الجهاز المستخدم في تسجيل الموجات الزلزالية هو:',o:['رختر','ميركالي','البارومتر','السيزموجراف'],a:3},
  {k:'10',q:'المقياس المستخدم في قياس قوة الزلزال:',o:['رختر','ميركالي','السيزموجراف','جميع ما سبق'],a:0,why:'في العرض «الجهاز المستخدم»، والأدق «المقياس»؛ فرختر مقياس وليس جهازًا.'},
  {k:'11',q:'يُستخدم مقياس ميركالي في قياس:',o:['سرعة الموجات الزلزالية','شدة الزلزال','الطاقة المتحررة من الزلزال','الزمن الذي يستغرقه الزلزال'],a:1}],'ev1');},reset(){STN.ev1.c.reset();}});

def('s6',{n:'6 · التسونامي',eyebrow:'المحطة 6 · الكتاب صفحة 57–58',title:'التسونامي',goal:'عند حدوث الزلزال في قاع المحيط تدفع الحركة المفاجئة الماء وتولد موجات مائية كبيرة جدًّا.',plan:6,core:1,icon:'<path d="M4 56c10-30 34-40 48-30-12 0-16 10-12 18 6 10 22 6 36 0v16H4z" fill="currentColor"/>',
 body:`<div class="card" id="s6sl"></div>`,
 init(){slides($('#s6sl'),[
  {k:'التسونامي',t:'كيف يتولد؟',im:[P('s40_c8cfaaab','موجة تسونامي')],html:'<p>عند حدوث الزلزال في قاع المحيط، تدفع الحركة المفاجئة الماء، وتولد <b>موجات مائية كبيرة جدًّا</b> تنتشر في جميع الاتجاهات بعيدًا عن مصدرها آلاف الكيلومترات.</p>'},
  {k:'ماذا تعرف عن التسونامي؟',t:'السرعة والارتفاع',im:[P('s41_c8cfaaab','موجة تسونامي')],html:'<ol><li>يكون ارتفاع الموجة في التسونامي <b>أقل من متر</b> في المياه العميقة، وقد تتجاوزها السفن دون أن تحس بها.</li><li>تصل سرعة موجات التسونامي في المحيطات المفتوحة إلى <b>950 كم/ساعة</b>، وعندما تقترب من الشاطئ فإنها تتباطأ ويزداد ارتفاعها بسبب احتكاكها بقاع البحر، مما يؤدي إلى تكوّن موجات تسونامي بارتفاع يصل إلى <b>30 مترًا</b>.</li></ol><p>جرّب ذلك في محاكي التسونامي التالي.</p>'},
  {k:'التسونامي',t:'تسونامي اليابان 2011',im:[P('s42_528b1a45','تسونامي اليابان'),P('s42_dc0b1515','آثار التسونامي')],html:'<p>تسونامي اليابان 2011: <b>8.9</b> درجة على مقياس رختر، وهو الأعنف في تاريخ اليابان منذ 140 عامًا.</p><p class="hint-line">تحديث: رُفع تقدير قوة هذا الزلزال لاحقًا إلى 9.0–9.1 درجات.</p>'},
  {k:'التسونامي',t:'جهاز رصد التسونامي',im:[P('s43_c3349066','عوامة رصد التسونامي'),P('s44_f1048f95','نظام الإنذار')],html:'<p>تُستخدم عوامات رصد في المحيط مرتبطة بأجهزة في قاع البحر لرصد التسونامي وإرسال الإنذار. تابع معي في الكتاب صفحة 58.</p>'}],'s6',()=>G.complete('s6'));}});

def('s7',{n:'7 · السلامة والتوقع',eyebrow:'المحطة 7 · الكتاب صفحة 59–60',title:'السلامة من الزلازل وتوقعها',goal:'كيف تحمي نفسك؟ وهل يمكن توقع الزلزال؟',plan:7,core:1,icon:'<path d="M40 6l26 10v18c0 18-12 30-26 34C26 64 14 52 14 34V16z" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="card"><h3>🛡 فحص السلامة: ماذا تفعل أثناء الزلزال؟</h3><div id="s7s"></div>${fig('s45_792a6c02','إرشادات السلامة',320)}</div>
  <div class="card"><h3>هل بيتك آمن من الزلازل؟</h3>${grid([['s46_c7be14da','حساس الاهتزاز'],['s46_4938196a','تثبيت الأثاث']])}<p class="step-text">يمكن التقليل من مخاطر التعرض للإصابة عن طريق التحضير المسبق للزلزال. يُستخدم <b>حساس الاهتزاز</b> على خطوط الغاز لكي يغلق جميع خطوط الغاز تلقائيًّا أثناء حدوث الزلزال.</p></div></div>
  <div class="card" id="s7sl"></div>`,
 init(){safety($('#s7s'),[['أبتعد عن النوافذ أو أي شيء يمكن أن يتساقط عليّ.',true],['أحمي رأسي وجسمي.',true],['أقف تحت الثريا لأتفرج.',false,'ابتعد عن كل ما يمكن أن يسقط عليك.'],['أراقب كوابل الكهرباء التي على الأرض، فقد تسبب اندلاع الحرائق.',true],['ألمس الأسلاك المقطوعة لأعرف هل فيها كهرباء.',false,'لا تقترب من الكوابل المقطوعة.'],['أحذر من الحواف الحادة التي تنشأ عن المباني المنهارة.',true]],()=>G.complete('s7'));
  slides($('#s7sl'),[
   {k:'توقع الزلزال',t:'التغيرات التي تسبق الزلزال',im:[P('s47_807c015a','تغير منسوب المياه الجوفية'),P('s47_cb3cd93e','الحركة عند الصدوع'),P('s47_551f7b40','الرصد')],html:'<p>يُمكن توقع حدوث الزلزال في منطقة ما من خلال ملاحظة التغيرات التي تحدث قبل وقوع الزلزال:</p><ul><li>ملاحظة تغيرات الحركة عند الصدوع.</li><li>الاختلاف في منسوب المياه الجوفية.</li><li>تغير الخصائص الكهربائية في بعض الصخور.</li></ul>'},
   {k:'هل حدثت زلازل قوية في مملكتنا الغالية؟',t:'زلازل المملكة',im:[P('s49_1f919be1','حرة في المملكة')],html:'<p>شهدت المملكة العربية السعودية عدة زلازل بالقرب من المدينة المنورة، منها زلزال العيص وزلزال حرة الشاقة الذي بلغت قوته 5.8 على مقياس رختر، وهو أكبر زلزال سُجل رسميًّا على أجهزة الرصد الزلزالي في المملكة.</p>'},
   {k:'آخر رصد زلزالي في المملكة',t:'المركز الوطني للزلازل والبراكين',im:[P('s50_709798cc','رؤية 2030'),P('s50_a15c05e7','هيئة المساحة الجيولوجية')],html:'<p>تولي المملكة العربية السعودية اهتمامًا واضحًا في مجال الرصد الزلزالي؛ فقد أصبحت هيئة المساحة الجيولوجية السعودية المسؤولة عن كافة أعمال الرصد الزلزالي داخل المملكة. وانطلاقًا من هذه المسؤوليات تم تأسيس المركز الوطني للزلازل والبراكين في الهيئة عام 2005م.</p>'}],'s7');}});

def('ev2',{n:'تقويم 12–14',eyebrow:'تقويم · الأسئلة 12–14',title:'تقويم: التسونامي والتوقع',goal:'أسئلة التقويم كما في العرض.',plan:4,core:1,icon:ICO.check,
 body:`<div class="two"><div class="card"><h3>12</h3><div id="d1"></div></div><div class="card"><h3>13 · اذكر اثنين من التنبؤات التي تسبق حدوث الزلازل</h3><div id="d2"></div></div></div><div class="two"><div class="card"><h3>14 · علّل: لم يتوصل العلماء إلى توقع دقيق لوقت حدوث الزلزال</h3>${reveal('','لأنه لا يوجد تغير واحد ثابت في الأرض لجميع الزلازل.')}</div><div class="card"><h3>عن ماذا يعبّر طول الخط المسجل على الورقة في جهاز السيزموجراف؟</h3>${reveal('','يعبّر عن قوة الزلزال.')}</div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('ev2');};
  mcq($('#d1'),{q:'موجات بحرية قوية تنشأ بسبب الزلزال:',o:['التسونامي','الأعاصير البحرية','التورنادو','الهوريكان'],a:0},'ev2',c);
  sortGame($('#d2'),{bins:['تسبق الزلازل','لا علاقة لها'],items:[['الحركة عند الصدوع',0],['اختلاف منسوب المياه الجوفية',0],['تغير الخواص الكهربائية للصخور',0],['تغير لون السماء',1],['زيادة عدد الطيور',1]]},'ev2',c);}});

def('sum',{n:'الخلاصة',eyebrow:'الخلاصة · الكتاب صفحة 60',title:'الخلاصة',goal:'أهم أفكار الدرس.',plan:2,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>أسباب الزلازل</h3>${lst(['تنتج الزلازل عن التحرر المفاجئ للطاقة التي في الصخور والحركة الناتجة عن ذلك.','تعرف الصدوع بأنها كسور يرافقها حركة الكتل الصخرية على امتداد الكسر.'])}<h3 class="mt">الموجات الزلزالية</h3>${lst(['تعرف البؤرة بأنها المكان الذي يحدث فيه الزلزال، أما المركز السطحي فهو المكان الذي يقع فوق البؤرة مباشرة على سطح الأرض.','تولّد الزلازل موجات زلزالية.'])}</div>
  <div class="card"><h3>مقدار قوة الزلزال</h3>${lst(['يقيس مقياس رختر قوة الزلزال.','يقيس مقياس ميركالي شدة الزلزال.'])}<h3 class="mt">السلامة من الزلازل</h3>${lst(['يمكن تشييد المباني بحيث تكون آمنة من الزلازل.'])}</div></div>`,enter(){G.complete('sum');}});
def('self',{n:'اختبر نفسك',eyebrow:'الواجب · الكتاب صفحة 60 · التسليم يوم الخميس',title:'اختبر نفسك',goal:'إجابات نموذجية مقترحة.',plan:3,icon:ICO.check,body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'1 · اشرح',q:'ما يحدث للصخور عند تجاوز حدّ المرونة.',a:[['الإجابة','تنكسر الصخور فجأة وتتحرك على امتداد الكسر (صدع)، ثم تعود حوافها إلى وضعها (الارتداد المرن)، فتتحرر الطاقة المختزنة على صورة موجات زلزالية.']]},
  {k:'2 · حدّد',q:'أيّ أنواع الموجات الزلزالية تسبب معظم الدمار؟',a:[['الإجابة','الموجات السطحية.']]},
  {k:'3 · طبّق',q:'كيف أمكن تحسين المباني لتكون آمنة من الزلازل؟',a:[['الإجابة','بتشييدها على قواعد مرنة تمتص الاهتزاز، واستخدام مواد مقاومة وتقوية الهياكل، وتثبيت الأثاث، وتركيب حساسات الاهتزاز على خطوط الغاز.']]},
  {k:'4 · لخّص',q:'كيف تستخدم الموجات الزلزالية في تحديد موقع مركز الزلزال؟',a:[['الإجابة','يُحسب الفرق بين زمن وصول موجات P وS في ثلاث محطات رصد على الأقل لمعرفة بعد الزلزال عن كل محطة، ثم ترسم دوائر أنصاف أقطارها تساوي هذه المسافات، فيكون المركز السطحي مكان التقاء الدوائر الثلاث.']]},
  {k:'5 · التفكير الناقد',q:'اشرح كيف يمكن تصنيف زلزال بقوة 8 على مقياس رختر بأنّه زلزال ذو شدة قليلة على مقياس ميركالي؟',a:[['الإجابة','لأن رختر يقيس الطاقة المتحررة، أما ميركالي فيقيس مقدار التدمير في منطقة معينة؛ فإذا حدث الزلزال في منطقة غير مأهولة أو بعيدة أو عميقة جدًّا كان التدمير قليلًا.']]}],'self',()=>G.complete('self'));},reset(){STN.self.s.reset();},explain:'<p>إجابات نموذجية مقترحة.</p>'});

const RQ=[{q:'الصدع الناتج عن إجهادات الشد:',o:['العادي','العكسي','الجانبي','لا شيء'],a:0},{q:'أسرع الموجات الزلزالية:',o:['P','S','السطحية','لا فرق'],a:0},{q:'جهاز تسجيل الموجات الزلزالية:',o:['السيزموجراف','البارومتر','الثرمومتر','الأميتر'],a:0},{q:'زيادة درجة واحدة على رختر تعني سعة أكبر:',o:['10 مرات','32 مرة','2 مرة','100 مرة'],a:0},{q:'يقيس ميركالي:',o:['الشدة','القوة','السرعة','الزمن'],a:0},{q:'سرعة التسونامي في المحيط المفتوح تصل إلى:',o:['950 كم/س','95 كم/س','9 كم/س','9500 كم/س'],a:0},{q:'النقطة داخل الأرض التي تبدأ عندها الحركة:',o:['البؤرة','المركز السطحي','الفوهة','الصدع'],a:0},{q:'الموجات المستعرضة:',o:['الثانوية S','الأولية P','السطحية','التسونامي'],a:0},{q:'لتحديد المركز السطحي نحتاج على الأقل إلى:',o:['3 محطات','محطة واحدة','محطتين','10 محطات'],a:0},{q:'الصدع الناتج عن إجهادات القص:',o:['الجانبي','العادي','العكسي','الرأسي'],a:0}];
def('x1',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'سباق الهزات ومزاد المعرفة',goal:'سباق المجموعات، ثم المزاد.',plan:5,icon:ICO.cup,
 body:'<div class="card"><div id="x1r"></div></div><div class="card"><div class="nb-head"><h2>🔨 مزاد المعرفة</h2></div><div id="x1a"></div></div>',
 init(){race($('#x1r'),{theme:'cars',title:'سباق الهزات',qs:RQ,how:'تتناوب المجموعات على الإجابة؛ كل إجابة صحيحة تقدم سيارتكم خطوة.',winSub:'وصلتم أولًا!'},'x1');
  STN.x1.a=auction($('#x1a'),[['الموجات السطحية أسرع الموجات الزلزالية.',false,'الأولية P أسرعها.'],['الصدع العكسي ينتج عن إجهادات الضغط.',true],['زلزال قوته 7 أقوى من زلزال 6 بطاقة تقارب 32 مرة.',true],['يمكن تحديد المركز السطحي بمحطة رصد واحدة.',false,'ثلاث محطات على الأقل.'],['ارتفاع موجة التسونامي في المياه العميقة أقل من متر.',true],['ميركالي يقيس الطاقة المتحررة.',false,'رختر يقيس القوة (الطاقة)، وميركالي يقيس الشدة.']],'x1');},reset(){STN.x1.a.reset();}});
def('x2',{n:'إثرائي · من أنا؟',eyebrow:'إثرائي',title:'من أنا؟ ولوحة الخيارات',goal:'ألغاز بأدلة متدرجة، ثم لوحة الخيارات.',plan:4,icon:ICO.lens,
 body:'<div class="card"><div id="x2r"></div></div><div class="card"><div id="x2cb"></div></div>',
 init(){riddles($('#x2r'),[{clues:['أنا موجة زلزالية.','أسير على امتداد سطح الأرض.','أنا الأكثر تدميرًا.'],o:['السطحية','الأولية','الثانوية','التسونامي'],a:0},{clues:['أنا جهاز.','أسجّل الموجات الزلزالية على ورقة.','يسمونني راسم الهزّة.'],o:['السيزموجراف','رختر','ميركالي','البارومتر'],a:0},{clues:['أنا نقطة على سطح الأرض.','أقع فوق البؤرة مباشرة.','يحددونني بثلاث محطات رصد.'],o:['المركز السطحي','البؤرة','الصدع','الفوهة'],a:0},{clues:['أنا صدع.','أنتج عن إجهادات الضغط.','أنا عكس العادي.'],o:['العكسي','العادي','الجانبي','الانزلاقي'],a:0}],'x2');
  STN.x2.cb=choiceBoard($('#x2cb'),[{ic:'🎨',t:'ارسم',kind:'رسم',p:'ارسم أنواع الصدوع الثلاثة مع أسهم الإجهاد.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'المركز الوطني للزلازل والبراكين تأسس عام:',o:['2005م','1990م','2015م','1980م'],a:0},{ic:'🏠',t:'خطة أسرتي',kind:'تخطيط',p:'اكتب خطة سلامة لأسرتك عند حدوث زلزال.'},
   {ic:'❓',t:'سؤال',kind:'اختيار',q:'الموجات الطولية:',o:['P','S','السطحية','التسونامي'],a:0},{ic:'🧮',t:'احسب',kind:'حساب',p:'زلزال قوته 7.5 وآخر 5.5: كم مرة سعة الأول أكبر؟',v:100,unit:'مرة',law:'10 × 10',sol:'فرق درجتين: 10 × 10 = 100 مرة'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'حساس الاهتزاز يغلق:',o:['خطوط الغاز','النوافذ','الأبواب','الإنارة'],a:0},
   {ic:'🔍',t:'ابحث',kind:'بحث',p:'ابحث في موقع المركز الوطني للزلازل والبراكين عن آخر هزة رُصدت في المملكة.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'شدة XII تعني:',o:['12','7','2','11'],a:0},{ic:'🗺',t:'خريطة',kind:'تنظيم',p:'خريطة مفاهيم: الزلزال ← الأسباب، الموجات، القياس، السلامة.'}],'x2',()=>G.complete('x2'));},reset(){STN.x2.cb.reset();}});

def('ch',{n:'تحدي العلماء',plan:3,icon:ICO.cup,eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من تقويم العرض.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'الزلزال',q:'اهتزازات في الصخور تنتج عن كسرها وحركتها نتيجة للتحرر المفاجئ للطاقة:',o:['الصدع','الزلزال','الكسر','الطاقة'],a:1},
  {k:'الارتداد المرن',q:'عودة القطع المكسورة إلى مكانها الأصلي:',o:['التكسر','البراكين','الارتداد المرن','التجوية'],a:2},
  {k:'الموجات',q:'الموجات المسببة لمعظم الدمار:',o:['السطحية','الأولية','الثانوية','جميع ما سبق'],a:0},
  {k:'المقاييس',q:'يُستخدم مقياس ميركالي في قياس:',o:['سرعة الموجات','شدة الزلزال','الطاقة المتحررة','زمن الزلزال'],a:1},
  {k:'رختر',t:'calc',p:'زلزال قوته 6.5 وآخر 5.5. كم مرة طاقة الأول أكبر من طاقة الثاني تقريبًا؟',v:32,unit:'مرة',given:'الفرق درجة واحدة',law:'كل درجة ≈ 32 ضعف الطاقة',sol:'فرق درجة واحدة = 32 مرة'},
  {k:'التسونامي',q:'موجات بحرية قوية تنشأ بسبب الزلزال:',o:['التسونامي','الأعاصير البحرية','التورنادو','الهوريكان'],a:0},
  {k:'التوقع',t:'multi',q:'اختر التغيرات التي تسبق الزلزال:',items:[['الحركة عند الصدوع',1],['اختلاف منسوب المياه الجوفية',1],['تغير الخواص الكهربائية للصخور',1],['تغير ألوان الأزهار',0]]}],'ch');},reset(){STN.ch.c.reset();}});

C6.plan({intro:{s:['poe','brain'],g:'١–٣',sk:'التنبؤ',ev:'سؤال التوقع'},goals:{s:['frayer'],g:'١–٣',sk:'التذكر',ev:'المطابقة'},s0:{s:['disc'],g:'—',sk:'التأمل',ev:'نقاش'},s1:{s:['analogy','cards'],g:'١',sk:'التشبيه والتفسير',ev:'تقويم 1 و2'},lab1:{s:['poe','inq'],g:'١',sk:'التجريب',ev:'منزلق الإجهاد'},
 s2:{s:['jigsaw','cards'],g:'١',sk:'التصنيف',ev:'مطابقة الصدوع'},lab2:{s:['inq','game'],g:'١',sk:'الاستنتاج',ev:'مولّد الصدوع'},s3:{s:['venn','heads'],g:'٢',sk:'المقارنة',ev:'عنونة الشكل'},lab3:{s:['poe','inq'],g:'٢',sk:'الملاحظة والمقارنة',ev:'سباق الموجات'},
 s4:{s:['disc'],g:'٢',sk:'التفسير',ev:'الشرائح'},lab4:{s:['prob','coop'],g:'٢',sk:'حل المشكلات',ev:'تحديد المركز السطحي'},s5:{s:['prob','tps'],g:'٣',sk:'الحساب والمقارنة',ev:'مثال الهند وتايوان'},lab5:{s:['inq','prob'],g:'٣',sk:'الحساب',ev:'حاسبة رختر'},
 ev1:{s:['cards','heads'],g:'١–٣',sk:'التطبيق',ev:'تقويم 3–11'},s6:{s:['story'],g:'٣',sk:'الربط',ev:'الشرائح'},lab6:{s:['poe','inq'],g:'٣',sk:'التنبؤ',ev:'محاكي التسونامي'},s7:{s:['role','prob'],g:'٣',sk:'اتخاذ القرار',ev:'فحص السلامة'},ev2:{s:['cards'],g:'٣',sk:'التطبيق',ev:'تقويم 12–14'},
 sum:{s:['tl'],g:'١–٣',sk:'التلخيص',ev:'إشارة المرور'},self:{s:['heads','sticks'],g:'١–٣',sk:'التفكير الناقد',ev:'اختبر نفسك'},x1:{s:['champ','game'],g:'١–٣',sk:'الاستدعاء',ev:'السباق والمزاد'},x2:{s:['who','game'],g:'١–٣',sk:'الاستنتاج',ev:'من أنا؟'},ch:{s:['exit'],g:'١–٣',sk:'التقويم الختامي',ev:'تحدي العلماء'}},'g9c2l1');
K.boot({chapter:'الفصل الثاني: تغيرات الأرض',chapterShort:'الفصل الثاني',title:'مرصد الهزات',lesson:'الدرس الأول: الزلازل',accent:'#b45309',accentDark:'#fbbf24',hook:'ما الذي يجعل الأرض تهتز تحت أقدامنا؟',
 riddle:'ماذا يحدث في صخور القشرة الأرضية لحظة الزلزال؟',predict:{o:['تتراكم الطاقة في الصخور بفعل الإجهاد ثم تتحرر فجأة عند انكسارها على صورة موجات','تهتز الأرض بسبب الرياح','تتحرك الصخور بلا سبب'],a:0},
 answer:'تتراكم الإجهادات في الصخور فتختزن طاقة، وعندما تنكسر وتتحرك على امتداد الصدع (الارتداد المرن) تتحرر الطاقة فجأة على صورة موجات زلزالية.',
 finalTitle:'مبارك! أصبحت راصدًا للزلازل',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 60 · التسليم يوم الخميس.',
 concepts:[{n:'الارتداد المرن',t:'تعود حواف الصخور المكسورة إلى مكانها فتتحرر الطاقة.',ic:'<path d="M6 30c12-4 18-16 18-24M24 6c2 10 10 20 18 24" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'الصدوع',t:'عادي (شد)، عكسي (ضغط)، جانبي (قص).',ic:'<path d="M6 18h16l6 12h14" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'البؤرة والمركز السطحي',t:'البؤرة داخل الأرض، والمركز السطحي فوقها مباشرة.',ic:'<circle cx="24" cy="32" r="5" fill="var(--accent)"/><path d="M24 6v20" stroke="var(--accent)" stroke-width="3"/>'},{n:'الموجات',t:'P أسرع وطولية، S مستعرضة، السطحية أكثر تدميرًا.',ic:'<path d="M4 24c6-10 10 10 16 0s10 10 16 0 6-6 8-4" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'رختر وميركالي',t:'رختر للقوة (الطاقة)، وميركالي للشدة (التدمير).',ic:'<rect x="8" y="26" width="8" height="14" fill="var(--accent)"/><rect x="20" y="16" width="8" height="24" fill="var(--accent)"/><rect x="32" y="6" width="8" height="34" fill="var(--accent)"/>'},{n:'التسونامي',t:'موجات مائية كبيرة يولدها زلزال في قاع المحيط.',ic:'<path d="M4 34c8-20 22-24 30-16-8 0-10 8-6 12 4 4 10 2 16-2v10H4z" fill="var(--accent)"/>'}]});
$$('.top h1').forEach(h=>h.dataset.sym='〰');
})();

