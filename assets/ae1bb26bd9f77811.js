
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

/* ===== تجارب افتراضية — العناصر الممثلة ===== */
(function(){
const {$,$$,G,STN,def,say,SFX,mcq}=K;
const AR='font-family="IBM Plex Sans Arabic"';

/* ---------- 4) الفلزات القلوية والماء ---------- */
const AM=[{s:'Li',n:'الليثيوم',k:1,g:1,col:'#b9c2c8',fl:null,t:'يطفو ويتفاعل ببطء مع فوران هادئ.'},{s:'Na',n:'الصوديوم',k:2,g:1,col:'#d6dbde',fl:'#ffb300',t:'ينصهر إلى كرة لامعة تنطلق فوق الماء بسرعة مع فوران شديد.'},{s:'K',n:'البوتاسيوم',k:3,g:1,col:'#cfd5d9',fl:'#c084fc',t:'يشتعل فورًا بلهب بنفسجي فاتح.'},{s:'Rb',n:'الروبيديوم',k:4,g:1,col:'#c9cfd3',fl:'#f472b6',t:'تفاعل عنيف جدًّا يتطاير معه الماء.'},{s:'Cs',n:'السيزيوم',k:5,g:1,col:'#e8d9a8',fl:'#60a5fa',t:'تفاعل انفجاري لحظي (لا يُجرى إلا افتراضيًّا).'},{s:'Mg',n:'الماغنسيوم',k:.3,g:2,col:'#aeb6bb',fl:null,t:'يكاد لا يتفاعل مع الماء البارد؛ فقاعات قليلة جدًّا.'},{s:'Ca',n:'الكالسيوم',k:.8,g:2,col:'#c8ccc5',fl:null,t:'يتفاعل بهدوء مع فقاعات منتظمة؛ أقل نشاطًا من الفلزات القلوية.'}];
def('lab4',{after:'s2',n:'🧪 الفلزات والماء',eyebrow:'تجربة افتراضية · مقترحة',title:'حوض النشاط: الفلزات القلوية في الماء',goal:'أسقط قطعة صغيرة من كل فلز في حوض الماء، وقارن شدة التفاعل. هل يزداد النشاط كلما نزلنا في المجموعة؟',plan:7,core:1,
 icon:'<path d="M8 44h64v24H8z" fill="currentColor" opacity=".35"/><rect x="34" y="20" width="12" height="12" rx="2" fill="currentColor"/><path d="M40 8v8" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="two"><div class="stage"><svg id="l4svg" viewBox="0 0 640 320" aria-label="حوض ماء"></svg>
   <div class="toolbar" id="l4b" style="grid-template-columns:repeat(7,minmax(0,1fr))"></div></div>
  <div class="side"><div class="card"><h3>المشاهدة</h3><div id="l4o" class="step-text muted">اختر فلزًّا لتسقطه في الماء.</div><div class="c6-meter mt" aria-label="شدة التفاعل"><i id="l4m" style="width:0"></i></div><p class="hint-line">مؤشر شدة التفاعل</p></div>
   <div class="card"><h3>⚠ سلامتي</h3><p class="step-text">تُحفظ الفلزات القلوية تحت الزيت، ولا تُلمس باليد، ولا تُجرى تجارب البوتاسيوم والروبيديوم والسيزيوم في المختبر المدرسي.</p></div></div></div>
  <div class="card"><h3>بعد التجربة</h3><div id="l4q"></div></div>`,
 init(){let tm=null,t=0,cur=null;const seen=new Set();const svg=$('#l4svg');
  const draw=()=>{let s=`<rect width="640" height="320" fill="var(--wall)"/><rect x="70" y="120" width="500" height="170" rx="10" fill="rgba(125,200,240,.18)" stroke="#7aa9c4" stroke-width="4"/><rect x="74" y="150" width="492" height="136" fill="rgba(56,152,214,.45)"/>`;
   if(cur){const k=cur.k,x=320+Math.sin(t*k*.25)*Math.min(200,k*45),y=146-(cur.k>=4?Math.abs(Math.sin(t*.9))*k*6:0);
    for(let i=0;i<Math.round(k*8);i++){const bx=x+((i*37+t*13)%(30+k*20))-(15+k*10),by=170+((i*23+t*(4+k*3))%110);s+=`<circle cx="${bx}" cy="${300-by+120}" r="${2+(i%3)}" fill="#fff" opacity=".7"/>`;}
    if(cur.fl&&t>3)s+=`<path d="M${x-14} ${y} Q${x} ${y-30-k*8-Math.sin(t)*8} ${x+14} ${y}z" fill="${cur.fl}" opacity=".85"/><path d="M${x-7} ${y} Q${x} ${y-16-k*4} ${x+7} ${y}z" fill="#fff8" />`;
    if(cur.k>=4&&t>4)for(let i=0;i<8;i++)s+=`<circle cx="${x+Math.cos(i)*k*9*Math.sin(t+i)}" cy="${y-20-Math.abs(Math.sin(t+i))*k*10}" r="3" fill="#7dd3fc"/>`;
    s+=`<rect x="${x-10}" y="${y-8}" width="20" height="12" rx="${cur.k>=2?6:2}" fill="${cur.col}" stroke="#555"/>`;
    s+=`<text x="320" y="70" text-anchor="middle" ${AR} font-size="22" font-weight="800" fill="var(--ink)">${cur.n} (${cur.s}) · المجموعة ${cur.g}</text>`;}
   else s+=`<text x="320" y="70" text-anchor="middle" ${AR} font-size="18" fill="var(--muted)">اختر فلزًّا من الأسفل</text>`;
   svg.innerHTML=s;};
  $('#l4b').innerHTML=AM.map(m=>`<button type="button" class="tool" data-s="${m.s}"><b style="font-size:1.3rem">${m.s}</b><span>${m.n}</span></button>`).join('');
  $$('#l4b [data-s]').forEach(b=>b.onclick=()=>{cur=AM.find(x=>x.s===b.dataset.s);t=0;seen.add(cur.s);clearInterval(tm);SFX.pop();$('#l4o').innerHTML=`<b>${cur.n}:</b> ${cur.t}`;$('#l4m').style.width=Math.min(100,cur.k*20)+'%';
   tm=setInterval(()=>{t+=.35;draw();if(t>40)clearInterval(tm);},60);if(cur.k>=2)setTimeout(()=>SFX.thud&&SFX.thud(),300);
   if(['Li','Na','K','Rb','Cs'].every(s=>seen.has(s)))G.add(0,'lab4');});
  draw();
  STN.lab4.stop=()=>clearInterval(tm);
  mcq($('#l4q'),{q:'رتّب النشاط من الأقل إلى الأكثر:',o:['Li ← Na ← K ← Rb ← Cs','Cs ← Rb ← K ← Na ← Li','Mg ← Li ← Ca ← Na','كلها متساوية'],a:0,why:'يزداد نشاط الفلزات القلوية كلما نزلنا إلى أسفل المجموعة، والفلزات القلوية الأرضية (Mg وCa) أقل نشاطًا منها.'},'lab4',()=>G.complete('lab4'));},
 leave(){STN.lab4.stop&&STN.lab4.stop();},
 explain:'<p>تجربة افتراضية مقترحة: نشاط الفلزات القلوية مع الماء يزداد من الليثيوم إلى السيزيوم، والماغنسيوم والكالسيوم (المجموعة 2) أقل نشاطًا.</p>'});

/* ---------- 5) أشباه الموصلات ---------- */
const MAT=[{id:'cu',n:'سلك نحاس (موصل)'},{id:'si',n:'رقاقة سيليكون (شبه موصل)'},{id:'gl',n:'ساق زجاج (عازل)'}];
def('lab5',{after:'s6',n:'🧪 شبه الموصل',eyebrow:'تجربة افتراضية · الربط مع علم الفيزياء · مقترحة',title:'مختبر أشباه الموصلات: تحكّم في التوصيل',goal:'ضع المادة في الدائرة، ثم غيّر الحرارة والضوء والشوائب. أي مادة يتغير توصيلها كثيرًا؟',plan:7,core:1,
 icon:'<rect x="22" y="22" width="36" height="36" rx="4" fill="none" stroke="currentColor" stroke-width="5"/><path d="M8 32h14M8 48h14M58 32h14M58 48h14" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="two"><div class="stage"><svg id="l5svg" viewBox="0 0 640 300" aria-label="دائرة كهربائية"></svg></div>
  <div class="side"><div class="card"><h3>المادة في الدائرة</h3><div class="c6-chips" id="l5m"></div>
   <label class="step-text">🌡 درجة الحرارة: <b id="l5Tv">25</b> °س<input type="range" id="l5T" min="25" max="150" value="25" style="width:100%"></label>
   <label class="step-text">💡 شدة الضوء الساقط: <b id="l5Lv">0</b>%<input type="range" id="l5L" min="0" max="100" value="0" style="width:100%"></label>
   <label class="step-text" style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="l5D"> إضافة شوائب (مثل البورون أو الفوسفور)</label>
   <p class="step-text">شدة التيار (وحدات نسبية): <b id="l5I">0</b></p><div id="l5fb"></div></div></div></div>
  <div class="card"><h3>استنتج</h3><div id="l5q"></div></div>`,
 init(){let m='si',used=new Set();const svg=$('#l5svg');
  const I=()=>{const T=+$('#l5T').value,L=+$('#l5L').value,D=$('#l5D').checked;if(m==='cu')return Math.round(100-(T-25)*.12);if(m==='gl')return 0;return Math.min(100,Math.round(2*Math.exp((T-25)/32)+L*.45+(D?55:0)));};
  const draw=()=>{const i=I(),gl=i/100;$('#l5I').textContent=i;
   let s=`<rect width="640" height="300" fill="var(--wall)"/><rect x="60" y="120" width="80" height="44" rx="6" fill="#1e293b"/><text x="100" y="148" text-anchor="middle" font-size="15" fill="#fff">+ −</text><path d="M140 142 H250 M390 142 H520 V60 H100 V120" fill="none" stroke="#475569" stroke-width="5"/>`;
   const mc=m==='cu'?'#c7743e':m==='si'?'#475569':'#bfe3f2';s+=`<rect x="250" y="122" width="140" height="40" rx="6" fill="${mc}" stroke="#334155" stroke-width="2"/>${m==='si'?'<path d="M262 134h116M262 150h116" stroke="#94a3b8" stroke-width="2"/>':''}<text x="320" y="190" text-anchor="middle" ${AR} font-size="15" font-weight="700" fill="var(--ink)">${MAT.find(x=>x.id===m).n}</text>`;
   s+=`<g transform="translate(310 60)"><circle r="${10+gl*40}" fill="#fde047" opacity="${gl*.55}"/><circle r="20" fill="${gl>0.02?`rgb(${250},${200+gl*55|0},${60+gl*100|0})`:'#e2e8f0'}" stroke="#475569" stroke-width="3"/><path d="M-8 4 Q0 -10 8 4" stroke="#78350f" stroke-width="2" fill="none"/></g>`;
   const L=+$('#l5L').value,T=+$('#l5T').value;if(L>0)s+=`<g opacity="${L/100}"><circle cx="560" cy="200" r="22" fill="#facc15"/><path d="M540 210 L400 150" stroke="#facc15" stroke-width="10" opacity=".5"/></g>`;
   if(T>30)s+=`<g opacity="${(T-25)/125}"><path d="M300 250 q10 -20 0 -40 q-10 -20 0 -40" stroke="#f97316" stroke-width="5" fill="none"/><path d="M340 250 q10 -20 0 -40 q-10 -20 0 -40" stroke="#f97316" stroke-width="5" fill="none"/><rect x="270" y="250" width="100" height="16" rx="4" fill="#991b1b"/></g>`;
   svg.innerHTML=s;
   if(m==='si'){if(T>=90)used.add('T');if(L>=60)used.add('L');if($('#l5D').checked)used.add('D');if(used.size>=2){say($('#l5fb'),'ok','أحسنت! تحكمت في توصيل السيليكون بعاملين مختلفين.');G.complete('lab5');}}};
  $('#l5m').innerHTML=MAT.map(x=>`<button type="button" class="c6-chip" data-m="${x.id}" aria-pressed="${x.id===m}">${x.n}</button>`).join('');
  $$('#l5m [data-m]').forEach(b=>b.onclick=()=>{m=b.dataset.m;$$('#l5m [data-m]').forEach(x=>x.setAttribute('aria-pressed',x===b));SFX.tick();draw();});
  ['l5T','l5L'].forEach(id=>$('#'+id).oninput=()=>{$('#'+id+'v').textContent=$('#'+id).value;draw();});$('#l5D').onchange=()=>{SFX.pop();draw();};draw();
  mcq($('#l5q'),{q:'ما الذي يميز أشباه الموصلات مثل السيليكون؟',o:['توصيلها بين الموصلات والعوازل، ويمكن التحكم فيه بالحرارة والضوء وإضافة الشوائب','توصيلها ثابت لا يتغير','لا توصل الكهرباء أبدًا','توصيلها أكبر من النحاس دائمًا'],a:0},'lab5');},
 explain:'<p>تجربة افتراضية مقترحة بقيم نسبية: يزداد توصيل السيليكون كثيرًا بالتسخين والإضاءة وإضافة الشوائب، بينما يبقى النحاس موصلًا جيدًا والزجاج عازلًا.</p>'});

/* ---------- 6) الهالوجينات والصوديوم ---------- */
const HL=[{s:'F',n:'الفلور',st:'غاز أصفر شاحب',col:'#fef3a3',k:5,salt:'فلوريد الصوديوم NaF'},{s:'Cl',n:'الكلور',st:'غاز أصفر مخضر',col:'#c7e86b',k:4,salt:'كلوريد الصوديوم NaCl (ملح الطعام)'},{s:'Br',n:'البروم',st:'سائل بني محمر',col:'#a2412a',k:3,salt:'بروميد الصوديوم NaBr'},{s:'I',n:'اليود',st:'صلب بنفسجي داكن',col:'#4c1d95',k:2,salt:'يوديد الصوديوم NaI'}];
def('lab6',{after:'s9',n:'🧪 مصنع الأملاح',eyebrow:'تجربة افتراضية · مقترحة',title:'مصنع الأملاح: الهالوجينات مع الصوديوم',goal:'أدخل الصوديوم المسخّن إلى إناء كل هالوجين، وراقب شدة التفاعل والملح الناتج. ثم توقّع سلوك الأستاتين.',plan:6,core:1,
 icon:'<path d="M28 8h24v16l14 40H14l14-40z" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="40" cy="50" r="6" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l6svg" viewBox="0 0 640 300" aria-label="إناء تفاعل"></svg><div class="toolbar" id="l6b" style="grid-template-columns:repeat(4,minmax(0,1fr))"></div></div>
  <div class="side"><div class="card"><h3>سجل المصنع</h3><div class="tablewrap"><table class="c6-table" id="l6t"></table></div></div></div></div>
  <div class="card"><h3>توقّع (تطبيق المهارات)</h3><div id="l6q"></div></div>`,
 init(){const rec={};let tm=null,t=0,cur=null;
  const draw=()=>{let s=`<rect width="640" height="300" fill="var(--wall)"/><rect y="250" width="640" height="50" fill="var(--bench)"/>`;
   s+=`<path d="M250 70 h140 v30 l40 150 h-220 l40 -150z" fill="${cur?cur.col:'#e2e8f0'}" fill-opacity="${cur?(cur.s==='I'?.25:.45):.3}" stroke="#64748b" stroke-width="4"/>`;
   if(cur){const k=cur.k,f=t<20?Math.sin(t)*.5+.5:0;s+=`<path d="M320 40 V160" stroke="#64748b" stroke-width="5"/><circle cx="320" cy="165" r="9" fill="#d6dbde"/>`;
    if(t>2&&t<20)s+=`<circle cx="320" cy="170" r="${10+k*8+f*k*4}" fill="#fde047" opacity="${.25+k*.12}"/><circle cx="320" cy="170" r="${6+k*4}" fill="#fff7cc" opacity=".9"/>`;
    if(t>=8)s+=`<g opacity="${Math.min(1,(t-8)/6)}">${[...Array(14)].map((_,i)=>`<rect x="${270+(i*17)%110}" y="${232-(i%3)*7}" width="7" height="7" fill="#fff" stroke="#cbd5e1"/>`).join('')}</g>`;
    s+=`<text x="320" y="30" text-anchor="middle" ${AR} font-size="18" font-weight="800" fill="var(--ink)">صوديوم + ${cur.n} (${cur.st})</text>`;}
   $('#l6svg').innerHTML=s;};
  const table=()=>{$('#l6t').innerHTML=`<thead><tr><th>الهالوجين</th><th>الحالة</th><th>شدة التفاعل</th><th>الملح الناتج</th></tr></thead><tbody>${HL.map(h=>`<tr><td>${h.n}</td><td>${rec[h.s]?h.st:'—'}</td><td>${rec[h.s]?'🔥'.repeat(h.k-1):'—'}</td><td>${rec[h.s]?h.salt:'—'}</td></tr>`).join('')}<tr><td>الأستاتين</td><td colspan="3">؟ (توقّع)</td></tr></tbody>`;};
  $('#l6b').innerHTML=HL.map(h=>`<button type="button" class="tool" data-s="${h.s}"><b style="font-size:1.3rem">${h.s}₂</b><span>${h.n}</span></button>`).join('');
  $$('#l6b [data-s]').forEach(b=>b.onclick=()=>{cur=HL.find(x=>x.s===b.dataset.s);rec[cur.s]=1;t=0;clearInterval(tm);SFX.pop();tm=setInterval(()=>{t+=.5;draw();if(t>22)clearInterval(tm);},70);table();});
  STN.lab6.stop=()=>clearInterval(tm);draw();table();
  mcq($('#l6q'),{q:'ما قابلية عنصر الأستاتين لتكوين الملح مقارنة بباقي عناصر المجموعة 17؟',o:['أقل؛ لأن نشاط الهالوجينات يقل كلما اتجهنا من أعلى إلى أسفل','أكبر؛ لأنه في أسفل المجموعة','مساوية للفلور','لا يمكن توقعها'],a:0},'lab6',()=>G.complete('lab6'));},
 leave(){STN.lab6.stop&&STN.lab6.stop();},
 explain:'<p>تجربة افتراضية مقترحة: تكوّن الهالوجينات أملاحًا مع الصوديوم، وتقل شدة التفاعل من الفلور إلى اليود، فيُتوقع أن يكون الأستاتين أقلها نشاطًا. (الفلور والكلور شديدا السمية ولا يُستخدمان في المختبر المدرسي.)</p>'});

/* ---------- 7) أنابيب الغازات النبيلة والبالونات ---------- */
const NG=[{s:'He',n:'الهيليوم',c:'#ffb38a'},{s:'Ne',n:'النيون',c:'#ff4d1a'},{s:'Ar',n:'الأرجون',c:'#b57bff'},{s:'Kr',n:'الكريبتون',c:'#e8f0ff'},{s:'Xe',n:'الزينون',c:'#5aa7ff'}];
const BL=[{n:'هيدروجين H₂',d:.07,fire:1},{n:'هيليوم He',d:.14},{n:'نيون Ne',d:.70},{n:'هواء',d:1},{n:'أكسجين O₂',d:1.10},{n:'أرجون Ar',d:1.38}];
def('lab7',{after:'s10',n:'🧪 أضواء ومناطيد',eyebrow:'تجربة افتراضية · مقترحة',title:'أضواء ومناطيد: الغازات النبيلة',goal:'شغّل التفريغ الكهربائي في كل أنبوب ولاحظ لونه. ثم املأ بالونًا بغازات مختلفة: أيها يرتفع؟ وأيها آمن؟',plan:7,core:1,
 icon:'<rect x="30" y="8" width="20" height="56" rx="10" fill="none" stroke="currentColor" stroke-width="5"/><path d="M40 64v10" stroke="currentColor" stroke-width="5"/><path d="M34 20h12M34 32h12M34 44h12" stroke="currentColor" stroke-width="3"/>',
 body:`<div class="card"><div class="nb-head"><h2>⚡ أنابيب التفريغ الكهربائي</h2><button class="tbtn" type="button" id="l7on" aria-pressed="false">تشغيل الجهد العالي</button></div><div class="stage"><svg id="l7a" viewBox="0 0 640 230" aria-label="أنابيب الغازات النبيلة"></svg></div><p class="hint-line">المس أنبوبًا لتعرف الغاز الذي فيه.</p><div id="l7fa"></div></div>
  <div class="two"><div class="stage"><svg id="l7b" viewBox="0 0 640 320" aria-label="بالون"></svg><div class="toolbar" id="l7g" style="grid-template-columns:repeat(3,minmax(0,1fr))"></div></div>
  <div class="side"><div class="card"><h3>نتائج البالون</h3><div id="l7fb" class="step-text muted">اختر غازًا لملء البالون.</div><div class="row-actions"><button class="tbtn" type="button" id="l7fire">🕯 قرّب لهبًا (افتراضيًّا)</button></div></div></div></div>`,
 init(){let on=false,seen=new Set(),bal=null,y=0,tm=null,boom=false,balSeen=new Set();
  const da=()=>{let s=`<rect width="640" height="230" fill="#0b1020"/>`;NG.forEach((g,i)=>{const x=64+i*128;s+=`<g class="ng" data-i="${i}" style="cursor:pointer">${on?`<rect x="${x-26}" y="30" width="52" height="150" rx="26" fill="${g.c}" opacity=".35"/><rect x="${x-14}" y="40" width="28" height="130" rx="14" fill="${g.c}" opacity=".9"/>`:''}<rect x="${x-18}" y="36" width="36" height="138" rx="18" fill="none" stroke="#94a3b8" stroke-width="3"/><rect x="${x-6}" y="20" width="12" height="16" fill="#64748b"/><rect x="${x-6}" y="174" width="12" height="16" fill="#64748b"/><text x="${x}" y="215" text-anchor="middle" font-size="20" font-weight="800" fill="${on?g.c:'#cbd5e1'}">${g.s}</text></g>`;});$('#l7a').innerHTML=s;
   $$('#l7a .ng').forEach(e=>e.onclick=()=>{const g=NG[+e.dataset.i];if(!on){say($('#l7fa'),'info','شغّل الجهد العالي أولًا.');return;}seen.add(g.s);SFX.tick();say($('#l7fa'),'ok',`${g.n} (${g.s}) يتوهج بلونه المميز. شاهدت ${seen.size} من 5.`);chk();});};
  $('#l7on').onclick=()=>{on=!on;$('#l7on').setAttribute('aria-pressed',on);$('#l7on').textContent=on?'إيقاف الجهد العالي':'تشغيل الجهد العالي';on?SFX.correct():SFX.tick();da();};
  const db=()=>{const b=bal;let s=`<rect width="640" height="320" fill="var(--wall)"/><rect y="290" width="640" height="30" fill="var(--bench)"/><text x="600" y="30" text-anchor="end" ${AR} font-size="13" fill="var(--muted)">السقف</text><path d="M0 8h640" stroke="#94a3b8" stroke-width="4"/>`;
   if(b){const cy=230-y;if(boom)s+=`<circle cx="320" cy="${cy}" r="70" fill="#f97316" opacity=".8"/><circle cx="320" cy="${cy}" r="40" fill="#fde047"/>`;else s+=`<path d="M320 ${cy+42} q-6 30 4 ${290-cy-42}" stroke="#334155" stroke-width="2" fill="none"/><ellipse cx="320" cy="${cy}" rx="34" ry="42" fill="#ef4444"/><ellipse cx="308" cy="${cy-14}" rx="8" ry="12" fill="#fff" opacity=".4"/><text x="320" y="${cy+4}" text-anchor="middle" ${AR} font-size="11" font-weight="700" fill="#fff">${b.n.split(' ')[0]}</text>`;}
   $('#l7b').innerHTML=s;};
  $('#l7g').innerHTML=BL.map((b,i)=>`<button type="button" class="tool" data-i="${i}"><span>🎈</span><span>${b.n}</span></button>`).join('');
  $$('#l7g [data-i]').forEach(btn=>btn.onclick=()=>{bal=BL[+btn.dataset.i];y=0;boom=false;clearInterval(tm);balSeen.add(bal.n);SFX.pop();
   const v=bal.d<1?(1-bal.d)*7:bal.d>1?-(bal.d-1)*6:0;tm=setInterval(()=>{y=Math.max(-20,Math.min(185,y+v));db();},50);
   $('#l7fb').innerHTML=`<b>${bal.n}</b>: كثافته ≈ ${bal.d} من كثافة الهواء، ف${bal.d<1?'يرتفع البالون':bal.d>1?'يهبط البالون':'يبقى البالون معلقًا تقريبًا'}.`;chk();});
  $('#l7fire').onclick=()=>{if(!bal)return;if(bal.fire){boom=true;clearInterval(tm);SFX.thud&&SFX.thud();say($('#l7fb'),'bad','💥 اشتعل الهيدروجين! لهذا يُفضّل الهيليوم: لا يشتعل، فهو آمن رغم أن الهيدروجين أخف منه.');}else say($('#l7fb'),'ok',`لم يحدث اشتعال: ${bal.n} لا يشتعل.`);db();};
  function chk(){if(seen.size>=5&&balSeen.size>=3)G.complete('lab7');}
  STN.lab7.stop=()=>clearInterval(tm);da();db();},
 leave(){STN.lab7.stop&&STN.lab7.stop();},
 explain:'<p>تجربة افتراضية مقترحة: لكل غاز نبيل لون مميز عند التفريغ الكهربائي. والهيليوم أخف من الهواء ولا يشتعل، أمّا الهيدروجين فأخف لكنه يشتعل، والأكسجين والأرجون أثقل من الهواء. (الكثافات نسبية تقريبية.)</p>'});
})();

/*@include lab14.js*/
/*@include pt.js*/
/*@include skit.js*/
/* ===== الفصل السادس · الدرس الثاني: العناصر الممثلة — «جولة في أحياء الممثلة» ===== */
(function(){
const {$,$$,G,STN,def,mcq,flips,match,sortGame,challenge,say,SFX,pic,slides,auction,race,riddles,choiceBoard,solutions,tfRound}=K;
const P=(n,c)=>[n,c];
const fig=(n,c,w)=>`<figure class="c6-fig" style="max-width:${w||220}px;text-align:center">${pic(n,c)}<figcaption class="step-text">${c}</figcaption></figure>`;
const grid=a=>`<div class="c6-grid">${a.map(([n,c])=>`<figure style="margin:0;text-align:center">${pic(n,c)}<figcaption class="step-text">${c}</figcaption></figure>`).join('')}</div>`;
const gIcon=t=>`<rect x="14" y="10" width="52" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="6"/><text x="40" y="52" text-anchor="middle" font-size="26" font-weight="800" fill="currentColor">${t}</text>`;
const col=(g,txt)=>`<div class="stage" style="padding:6px">${PT.ptSVG({mode:'cat',hl:e=>e.g===g})}</div><p class="hint-line">${txt||'المجموعة '+g+' مبرزة على الجدول.'}</p>`;
const ICO={doc:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',check:'<rect x="14" y="8" width="52" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30l6 6 12-12M24 54l6 6 12-12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>'};

/* ================= INTRO ================= */
def('intro',{n:'الافتتاحية',plan:3,icon:'<rect x="6" y="14" width="14" height="52" rx="3" fill="currentColor"/><rect x="22" y="26" width="14" height="40" rx="3" fill="currentColor" opacity=".7"/><rect x="44" y="14" width="30" height="52" rx="3" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="hero"><div class="hero-photo">${pic('s02_cfd9b6f0','نموذج الجدول الدوري')}<span class="cap">العناصر الممثلة: المجموعتان 1 و2 والمجموعات 13–18.</span></div>
  <div><span class="eyebrow">جولة في أحياء الممثلة</span><h2 class="hero-h">ثمانية أحياء… ولكل حي طباع سكانه!</h2>
   <p class="riddle">في حيٍّ يسكنه فلزٌّ يشتعل إذا لامس الماء، وفي حي آخر غاز «خامل» لا يكاد يتحد مع أحد، وفي ثالث عنصر ينصهر في راحة يدك. كلها عناصر ممثلة! فلماذا تختلف طباعها إلى هذا الحد؟</p>
   <p class="q">ما توقعك قبل أن تبدأ الجولة؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div>`,init(){}});

/* ================= GOALS ================= */
const GOALS=['تتعرف خصائص العناصر الممثلة.','تحدد استخدامات العناصر الممثلة.','تصنّف العناصر إلى مجموعات، بناءً على تشابه خصائصها.'];
const TERMS=[{t:'العدد الذري',d:'عدد البروتونات في نواة العنصر. (مراجعة المفردات)'},
 {t:'الفلزات القلوية',d:'عناصر المجموعة الأولى (عدا الهيدروجين): لامعة وصلبة، كثافتها ودرجة انصهارها منخفضتان، ويزداد نشاطها كلما نزلنا في المجموعة.'},
 {t:'الفلزات القلوية الأرضية',d:'عناصر المجموعة 2: أكثر كثافة وصلابة وذات درجات انصهار أعلى من الفلزات القلوية، ونشطة لكن أقل منها.'},
 {t:'أشباه الموصلات',d:'مواد صلبة توصيلها الكهربائي بين الموصلات والعوازل، ويمكن التحكم فيه بالحرارة والضوء وإضافة الشوائب، وأشهرها السيليكون.'},
 {t:'الهالوجينات',d:'عناصر المجموعة 17، وتعني «مكوّنات الأملاح»، وتكوّن أملاحًا مع الفلزات القلوية.'},
 {t:'الغازات النبيلة',d:'عناصر المجموعة 18، توجد في الطبيعة منفردة ونادرًا ما تتحد مع عناصر أخرى بسبب نشاطها القليل جدًّا.'}];
def('goals',{n:'الأهداف والمفردات',eyebrow:'الكتاب صفحة 185',title:'خريطة الجولة: الأهداف والمفردات',goal:'تعرّف أهداف الدرس وأهميته، ثم المفردات الجديدة.',plan:4,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><div class="story mt"><b>أهمية الدرس:</b> للعناصر الممثلة دور أساس في جسمك والبيئة المحيطة والأشياء التي تتعامل معها يوميًّا.</div></div>
  <div class="card"><h3>مراجعة المفردات</h3><p class="step-text"><b>العدد الذري:</b> عدد البروتونات في نواة العنصر.</p><h3 class="mt">المفردات الجديدة</h3><ul class="tasks plain"><li>الفلزات القلوية</li><li>الفلزات القلوية الأرضية</li><li>أشباه الموصلات</li><li>الهالوجينات</li><li>الغازات النبيلة</li></ul></div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المفردات</h2><span>المس البطاقة لترى التعريف</span></div><div id="g14flips"></div></div>
  <div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2><span>اختر المصطلح ثم تعريفه</span></div><div id="g14match"></div></div>`,
 init(){flips($('#g14flips'),TERMS);this.reset();},reset(){match($('#g14match'),TERMS.slice(1).map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));},explain:'<p>الأهداف والأهمية والمفردات كما في العرض (ص 185).</p>'});

/* ================= S1: المجموعتان 1 و2 ================= */
def('s1',{n:'1 · المجموعتان 1 و2',eyebrow:'المحطة 1 · حي الفلزات النشطة · الكتاب صفحة 185',title:'المجموعتان 1 و2: الفلزات النشطة',goal:'لماذا لا نجد عناصر المجموعتين 1 و2 منفردة في الطبيعة؟',plan:5,core:1,icon:gIcon('1·2'),
 body:`<div class="two"><div class="card"><h3>المجموعتان 1، 2</h3><p class="step-text">توجد عناصر المجموعتين 1، 2 في الطبيعة <b>دائمًا متحدة مع عناصر أخرى</b>، وتعرف بالفلزات النشطة؛ بسبب ميلها إلى الاتحاد بعناصر أخرى لتكوين مواد جديدة. وجميع عناصرها فلزات ما عدا الهيدروجين، الذي يقع في المجموعة الأولى.</p><div class="c6-q"><b>علّل:</b> تُعرف عناصر المجموعتين 1، 2 بالفلزات النشطة.<br><button class="tbtn" type="button" id="s1rev">إظهار الإجابة</button> <span class="c6-ans" id="s1ans" hidden>لأنها تميل إلى الاتحاد مع عناصر أخرى لتكوين مواد جديدة.</span></div></div>
  <div class="card"><div class="stage" style="padding:6px">${PT.ptSVG({mode:'cat',hl:e=>e.g===1||e.g===2})}</div><p class="hint-line">المجموعتان 1 و2 مبرزتان. لاحظ الهيدروجين: لا فلز في أعلى المجموعة الأولى.</p><div id="s1q"></div></div></div>`,
 init(){$('#s1rev').onclick=()=>{$('#s1ans').hidden=false;SFX.pop();};
  mcq($('#s1q'),{q:'العنصر الوحيد غير الفلزي في المجموعة الأولى:',o:['الليثيوم','الهيدروجين','الصوديوم','البوتاسيوم'],a:1},'s1',()=>G.complete('s1'));},
 quiz:[{q:'توجد عناصر المجموعتين 1 و2 في الطبيعة:',o:['منفردة','متحدة مع عناصر أخرى دائمًا','على شكل غازات','في الفضاء فقط'],a:1}],
 explain:'<p>عناصر المجموعتين 1 و2 فلزات نشطة (عدا الهيدروجين) توجد دائمًا متحدة مع عناصر أخرى لميلها إلى الاتحاد.</p>'});

/* ================= S2: الفلزات القلوية ================= */
def('s2',{n:'2 · الفلزات القلوية',eyebrow:'المحطة 2 · حي القلويات · الكتاب صفحة 185–186',title:'الفلزات القلوية: المجموعة الأولى',goal:'تعرّف خصائص الفلزات القلوية واستخداماتها، ولاحظ كيف يزداد نشاطها كلما نزلنا في المجموعة.',plan:7,core:1,icon:gIcon('Na'),
 body:`<div class="card" id="s2sl"></div><div class="two"><div class="card"><h3>سؤال</h3><div id="s2q"></div></div>
  <div class="card c6-enr"><b>إثراء من العرض · السيزيوم (Cs)</b><p class="step-text">عنصر كيميائي فلزي أبيض فضي لين وشديد التفاعل، يقع في المجموعة الأولى (الفلزات القلوية)، ورقمه الذري 55. يكاد يكون سائلًا عند درجة حرارة الغرفة (ينصهر عند نحو 28°س)، وهو شديد التفاعل مع الماء والهواء.</p><ul class="step-text" style="margin:0"><li>يستخدم في الساعات الذرية لتحديد الوقت بدقة عالية.</li><li>يدخل في تطبيقات طبية وصناعية، مثل الخلايا الشمسية وأجهزة التنقيب عن النفط.</li></ul>${grid([['s09_f4d463c9','السيزيوم'],['s09_6ad51d8c','ساعة ذرية'],['s09_44de4039','خلايا شمسية']])}</div></div>`,
 init(){slides($('#s2sl'),[
   {k:'الفلزات القلوية Alkali metals',t:'أربع خصائص',im:[P('s07_6208361e','اتجاه النشاط في الجدول')],html:'<p>تُسمّى عناصر المجموعة الأولى <b>الفلزات القلوية</b>، وهي:</p><ol><li>لامعة وصلبة.</li><li>لها كثافة منخفضة.</li><li>لها درجة انصهار منخفضة.</li><li>يزداد نشاطها كلما نزلنا إلى أسفل المجموعة.</li></ol><p>وميلها إلى الاتحاد مع عناصر أخرى كبير.</p>'},
   {k:'الفلزات القلوية',t:'في حياتنا',im:[P('s08_236da8a9','بطارية ليثيوم'),P('s08_d92739a4','ملح الطعام')],html:'<p>تتوافر الفلزات القلوية في كثير من المواد التي نحتاج إليها؛ فعلى سبيل المثال يوجد <b>الليثيوم</b> في بطاريات الليثيوم المستعملة في الكاميرات، ويوجد فلز <b>الصوديوم</b> في مركب كلوريد الصوديوم المعروف بملح الطعام.</p>'},
   {k:'الفلزات القلوية',t:'الصوديوم والبوتاسيوم',im:[P('s08_1008bd4b','الموز'),P('s08_542e47b9','البطاطا')],html:'<p>والصوديوم والبوتاسيوم ضروريان لأجسامنا، وهما موجودان بكميات قليلة في البطاطا والموز.</p><p class="def">الصوديوم والبوتاسيوم ضروريان لوظائف الجسم الأساسية مثل تنظيم توازن السوائل ونقل الإشارات العصبية ووظائف العضلات؛ حيث يعملان معًا للحفاظ على وظائف القلب والكلى.</p>'}],'s2');
  mcq($('#s2q'),{q:'أي مما يلي لا ينطبق على عناصر المجموعة الأولى في الجدول الدوري:',o:['تُسمّى الفلزات القلوية','درجة انصهارها عالية','لامعة وصلبة','عناصر نشطة'],a:1,why:'درجة انصهار الفلزات القلوية منخفضة.'},'s2',()=>G.complete('s2'));},
 quiz:[{q:'كلما نزلنا إلى أسفل مجموعة الفلزات القلوية فإن نشاطها:',o:['يقل','يزداد','لا يتغير','ينعدم'],a:1}],
 explain:'<p>الفلزات القلوية لامعة صلبة، كثافتها ودرجة انصهارها منخفضتان، ويزداد نشاطها نزولًا في المجموعة. الليثيوم في البطاريات، والصوديوم في ملح الطعام، والصوديوم والبوتاسيوم ضروريان للجسم.</p>'});

/* ================= S3: القلوية الأرضية ================= */
def('s3',{n:'3 · الفلزات القلوية الأرضية',eyebrow:'المحطة 3 · حي القلويات الأرضية · الكتاب صفحة 185–186',title:'الفلزات القلوية الأرضية: المجموعة 2',goal:'قارن الفلزات القلوية الأرضية بالفلزات القلوية، وسمِّ عناصرها.',plan:5,core:1,icon:gIcon('Mg'),
 body:`<div class="two"><div class="card"><h3>الفلزات القلوية الأرضية Alkaline earth metals</h3><p class="step-text">تقع إلى جوار العناصر القلوية في المجموعة 2. وتمتاز الفلزات القلوية الأرضية بأنها <b>أكثر كثافة وصلابة، وذات درجات انصهار عالية</b> مقارنة بالفلزات القلوية، وهي عناصر نشطة أيضًا، ولكن ليست بمثل نشاط عناصر الفلزات القلوية.</p>${fig('s10_1f7d09c7','عناصر المجموعة الثانية توجد في الكثير من الأشياء، فالبريليوم موجود في الزمرد والزبرجد، أمّا الماغنسيوم فيوجد في كلوروفيل النباتات الخضراء.',420)}</div>
  <div class="card"><h3>ماذا قرأت؟ ما أسماء العناصر التي تنتمي إلى مجموعة الفلزات القلوية الأرضية؟</h3><div id="s3sort"></div><h3 class="mt">قارن</h3><div id="s3q"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s3');};
  sortGame($('#s3sort'),{bins:['قلوية أرضية (المجموعة 2)','ليست منها'],items:[['بريليوم',0],['ماغنسيوم',0],['كالسيوم',0],['سترونتيوم',0],['باريوم',0],['راديوم',0],['صوديوم',1,'الصوديوم فلز قلوي (المجموعة 1).'],['ألومنيوم',1,'الألومنيوم في المجموعة 13.']],hint:'العناصر الستة في العمود الثاني.'},'s3',c);
  mcq($('#s3q'),{q:'مقارنة بالفلزات القلوية، الفلزات القلوية الأرضية:',o:['أكثر كثافة وصلابة وأعلى درجة انصهار وأقل نشاطًا','أقل كثافة وأكثر نشاطًا','غازات خاملة','لافلزات هشة'],a:0},'s3',c);},
 quiz:[{q:'يوجد الماغنسيوم في:',o:['كلوروفيل النباتات الخضراء','الزمرد فقط','ملح الطعام','بطاريات الكاميرات'],a:0}],
 explain:'<p>عناصر المجموعة 2: بريليوم، ماغنسيوم، كالسيوم، سترونتيوم، باريوم، راديوم؛ أكثر كثافة وصلابة وأعلى درجة انصهار من القلوية، وأقل نشاطًا منها.</p>'});

/* ================= S4: المجموعات 13–18 ================= */
def('s4',{n:'4 · المجموعات 13–18',eyebrow:'المحطة 4 · الأحياء الستة · الكتاب صفحة 186',title:'المجموعات 13–18: تنوّع كبير',goal:'لاحظ عناصر المجموعات 13–18: هل جميعها صلبة كالمجموعتين 1 و2؟',plan:4,core:1,icon:gIcon('13'),
 body:`<div class="two"><div class="card"><p class="step-text">لاحظ أنّ العناصر في المجموعات 13–18 في الجدول الدوري <b>ليست جميعها صلبة</b>، كما هو الحال في عناصر المجموعتين الأولى والثانية. وسوف تجد أنّ هناك مجموعة واحدة تضم فلزات ولافلزات وأشباه فلزات، وتوجد في حالات المادة الثلاث الصلبة والسائلة والغازية.</p><div id="s4q"></div></div>
  <div class="card"><div class="row-actions" id="s4b"><button class="tbtn" type="button" data-m="cat" aria-pressed="true">فلز / لا فلز / شبه فلز</button><button class="tbtn" type="button" data-m="st" aria-pressed="false">الحالة</button></div><div class="stage" id="s4pt" style="padding:6px"></div><div id="s4leg"></div></div></div>`,
 init(){const d=m=>{$('#s4pt').innerHTML=PT.ptSVG({mode:m,hl:e=>e.g>=13&&e.f==null});$('#s4leg').innerHTML=PT.legend(m);};d('cat');
  $$('#s4b [data-m]').forEach(b=>b.onclick=()=>{$$('#s4b [data-m]').forEach(x=>x.setAttribute('aria-pressed',x===b));d(b.dataset.m);SFX.tick();});
  mcq($('#s4q'),{q:'أي مما يلي تلاحظه في عناصر المجموعات من 13 إلى 18:',o:['جميعها صلبة','جميعها فلزات','توجد في حالات المادة الثلاث','جميعها مُصنّعة'],a:2,why:'لوّن الجدول حسب الحالة: صلبة وسائلة (البروم) وغازية.'},'s4',()=>G.complete('s4'));},
 explain:'<p>المجموعات 13–18 متنوعة: فيها فلزات ولافلزات وأشباه فلزات، وتوجد في الحالات الثلاث.</p>'});

/* ================= S5: المجموعة 13 ================= */
def('s5',{n:'5 · المجموعة 13',eyebrow:'المحطة 5 · عائلة البورون · الكتاب صفحة 186',title:'المجموعة 13: عائلة البورون',goal:'تعرّف عناصر عائلة البورون واستخداماتها، وصمّم خريطة مفاهيم لأهم استخداماتها.',plan:7,core:1,icon:gIcon('B'),
 body:`<div class="card" id="s5sl"></div><div class="two"><div class="card"><h3>صمّم خريطة مفاهيم لأهم استخدامات عناصر مجموعة البورون</h3><div id="s5map"></div></div><div class="card"><h3>سؤال 1</h3><div id="s5q1"></div><h3 class="mt">سؤال 2</h3><div id="s5q2"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=3)G.complete('s5');};
  slides($('#s5sl'),[
   {k:'المجموعة 13',t:'تُسمّى عائلة البورون',im:[P('s13_2e2550d4','البورون'),P('s17_c32c1533','عائلة البورون')],html:'<p><b>جميع عناصر المجموعة 13 فلزية صلبة</b>، ما عدا البورون الذي هو شبه فلز أسود وهش.</p><p>وتُستخدم عناصر هذه العائلة في صناعة بعض المنتجات.</p>'},
   {k:'استخداماتها',t:'البورون',im:[P('s14_03133ded','البورون'),P('s14_537b2e12','أواني الطهي')],html:'<p>وعاء الطهي المصنوع من البورون يمكننا نقله مباشرة من الثلاجة إلى الفرن دون أن ينكسر.</p>'},
   {k:'استخداماتها',t:'الألومنيوم',im:[P('s15_a155056f','الألومنيوم'),P('s15_5b36c8dc','هياكل الطائرات')],html:'<p>يستخدم الألومنيوم في صناعة:</p><ul><li>علب المشروبات الغازية.</li><li>أواني الطهي.</li><li>هياكل الطائرات.</li><li>ورق الألومنيوم.</li><li>الأبواب والنوافذ.</li></ul>'},
   {k:'استخداماتها',t:'الجاليوم',im:[P('s16_61697912','الجاليوم في راحة اليد'),P('s16_ab36eb58','بطاقة الجاليوم')],html:'<p>من عناصر هذه المجموعة أيضًا فلز الجاليوم الصلب، الذي له درجة انصهار منخفضة جدًّا؛ فقد ينصهر إذا وضعته في يدك.</p><p><b>ماذا تستنتج؟</b> لأن له درجة انصهار منخفضة جدًّا (نحو 29.8°س، أقل من درجة حرارة الجسم 37°س).</p><p>ويُستخدم الجاليوم في صناعة رقاقات الحاسوب.</p>'}],'s5',c);
  const U=[['البورون','أواني طهي تنتقل من الثلاجة إلى الفرن'],['الألومنيوم','علب المشروبات الغازية'],['الألومنيوم','هياكل الطائرات'],['الألومنيوم','ورق الألومنيوم والأبواب والنوافذ'],['الجاليوم','رقاقات الحاسوب']];
  const box=$('#s5map');let s=`<svg viewBox="0 0 560 370" role="img" aria-label="خريطة مفاهيم"><rect x="200" y="125" width="160" height="50" rx="14" fill="var(--accent)"/><text x="280" y="157" text-anchor="middle" font-size="17" font-weight="800" fill="#fff" font-family="IBM Plex Sans Arabic">عائلة البورون</text>`;
  const pos=[[110,40],[450,40],[110,260],[450,260],[280,330]];
  U.forEach((u,i)=>{const [x,y]=pos[i];s+=`<line x1="280" y1="150" x2="${x}" y2="${y}" stroke="var(--line)" stroke-width="3"/><g class="mp" data-i="${i}" style="cursor:pointer"><rect x="${x-95}" y="${y-24}" width="190" height="48" rx="10" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/><text x="${x}" y="${y+5}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)" font-family="IBM Plex Sans Arabic" data-t>؟ المس لكشف الاستخدام</text></g>`;});
  box.innerHTML=s+'</svg>';let open=0;
  box.querySelectorAll('.mp').forEach(g=>g.onclick=()=>{const t=g.querySelector('[data-t]');if(t.dataset.o)return;t.dataset.o=1;const u=U[+g.dataset.i];t.textContent=u[0]+': '+u[1];t.setAttribute('font-size','11.5');SFX.pop();G.add(2,'s5');if(++open===U.length)c();});
  mcq($('#s5q1'),{q:'أي العناصر التالية لا ينتمي للمجموعة 13 في الجدول الدوري؟',o:['الكربون','الألومنيوم','البورون','الجاليوم'],a:0,why:'الكربون في المجموعة 14.'},'s5',c);
  mcq($('#s5q2'),{q:'عدّد ثلاثة من استخدامات الألومنيوم:',o:['هياكل الطائرات، علب المشروبات الغازية، الأبواب والنوافذ','رقاقات الحاسوب، الساعات الذرية، المصابيح','الأسمدة، حمض الكبريتيك، الزجاج','البطاريات، ملح الطعام، الأسنان'],a:0},'s5');},
 quiz:[{q:'العنصر الذي قد ينصهر في راحة يدك:',o:['البورون','الجاليوم','الألومنيوم','الثاليوم'],a:1},{q:'البورون:',o:['فلز لامع','شبه فلز أسود وهش','غاز نبيل','لا فلز سائل'],a:1}],
 explain:'<p>عائلة البورون: كلها فلزات صلبة عدا البورون (شبه فلز). البورون للأواني المقاومة للحرارة، والألومنيوم للعلب والطائرات والأواني والأبواب، والجاليوم ينصهر في اليد ويستخدم في رقاقات الحاسوب.</p>'});

/* ================= S6: المجموعة 14 ================= */
def('s6',{n:'6 · المجموعة 14',eyebrow:'المحطة 6 · مجموعة الكربون · الكتاب صفحة 187',title:'المجموعة 14: مجموعة الكربون',goal:'لاحظ عناصر المجموعة 14 ثم أجب: ما اسمها؟ كم عنصرًا فيها؟ صنّفها. ماذا تستنتج؟',plan:8,core:1,icon:gIcon('C'),
 body:`<div class="two"><div class="card"><h3>لاحظ عناصر المجموعة 14 ثم أجب</h3>${col(14,'المجموعة 14 مبرزة.')}<div id="s6sort"></div></div>
  <div class="card"><div id="s6qs"></div></div></div><div class="card" id="s6sl"></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s6');};
  STN.s6.sol=solutions($('#s6qs'),[{k:'1',q:'اقترح اسمًا مناسبًا لهذه المجموعة.',a:[['الإجابة','مجموعة الكربون.']]},{k:'2',q:'عدّد عناصر هذه المجموعة.',a:[['الإجابة','الكربون، السيليكون، الجرمانيوم، القصدير، الرصاص.']]},{k:'3',q:'صنّف عناصرها إلى: فلزات – لا فلزات – أشباه فلزات.',a:[['لا فلز','الكربون'],['أشباه فلزات','السيليكون والجرمانيوم'],['فلزات','القصدير والرصاص']]},{k:'4',q:'ماذا تستنتج من السؤال السابق؟',a:[['الإجابة','لاحظنا التنوع في عناصر هذه المجموعة: فيها لا فلز وأشباه فلزات وفلزات.']]}],'s6',c);
  sortGame($('#s6sort'),{bins:['لا فلز','شبه فلز','فلز'],items:[['الكربون C',0],['السيليكون Si',1],['الجرمانيوم Ge',1],['القصدير Sn',2],['الرصاص Pb',2]]},'s6',c);
  slides($('#s6sl'),[
   {k:'المجموعة 14',t:'تُسمّى مجموعة الكربون',im:[P('s19_d558261b','الكربون')],html:'<p>إذا نظرت إلى عناصر المجموعة الرابعة عشرة ستجد أنّ الكربون من العناصر اللافلزية، بينما عنصرا السيليكون والجرمانيوم أشباه فلزات، والقصدير والرصاص فلزات.</p>'},
   {k:'الكربون',t:'أشكال مختلفة',im:[P('s20_c132b11a','الألماس'),P('s20_85d22d0b','الجرافيت'),P('s20_e4bbebf0','الفحم')],html:'<p>ولعنصر الكربون أشكال مختلفة، منها <b>الألماس والجرافيت</b> والفحم، كما أنّه يوجد أيضًا في أجسام المخلوقات الحية.</p><p>والجرافيت يُستعمل في صناعة أقلام الرصاص.</p>'},
   {k:'السيليكون',t:'شبه فلز',im:[P('s20_6e4845d6','الرمال'),P('s20_3a3d1f77','الزجاج')],html:'<ol><li>شبه فلز.</li><li>متوفر بكثرة في الرمال؛ حيث يحتوي الرمل على معادن منها الكوارتز الذي يتكوّن من الأكسجين والسيليكون.</li><li>يُعد الرمل مكوّنًا أساسيًّا في صناعة الزجاج.</li></ol>'},
   {k:'السيليكون · الربط مع الصحة',t:'منتجات السيليكون',im:[P('s21_0745c842','كعب للأرجل'),P('s21_2d3ce896','طرف صناعي'),P('s21_1ef660e2','دمية تدريب')],html:'<p>تُستخدم منتجات السيليكون في:</p><ul><li>صناعة كعب للأرجل.</li><li>صناعة الأطراف الصناعية.</li><li>دُمى التدريب.</li></ul>'},
   {k:'الربط مع علم الفيزياء',t:'أشباه الموصلات',im:[P('s22_8dba265a','رقاقة إلكترونية')],html:'<p class="def">أشباه الموصلات: مواد صلبة تمتلك خصائص توصيل كهربائي بين الموصلات والعوازل، ويعد السيليكون أشهرها. وتتميز بأن موصليتها يمكن التحكم بها بواسطة عوامل مثل الحرارة والضوء وإضافة شوائب.</p><p>جرّب ذلك في المختبر الافتراضي التالي.</p>'},
   {k:'المجموعة 14',t:'الرصاص والقصدير',im:[P('s23_778dc828','واقي أشعة X'),P('s23_2ab6a909','بطارية سيارة'),P('s23_b112d738','القصدير')],html:'<p>ونجد في المجموعة 14 أيضًا الرصاص والقصدير، وهما أثقل عناصر المجموعة. وللرصاص استخدامات مهمة في الطب؛ فهو يُستعمل لوقاية الجسم من أشعة X في أثناء تصوير الأسنان، ويدخل أيضًا في صناعة بطاريات السيارة، وفي السبائك التي درجات انصهارها منخفضة، كما يُتخذ جدارًا واقيًا لمنع تسرب الإشعاعات الضارة؛ كما في المفاعلات النووية والمسرّعات النووية، وفي معدات أجهزة أشعة X، وأيضًا في الحاويات التي تستخدم في حفظ ونقل المواد المشعة.</p><p>أمّا القصدير فيستخدم في حشو الأسنان، وفي طلاء علب حفظ الأطعمة الفولاذية من الداخل.</p>'}],'s6');},
 reset(){STN.s6.sol&&STN.s6.sol.reset();},
 quiz:[{q:'من أشكال الكربون:',o:['الألماس والجرافيت','الكوارتز والزجاج','القصدير والرصاص','الرمل والملح'],a:0},{q:'أشهر أشباه الموصلات:',o:['الرصاص','السيليكون','الكربون','القصدير'],a:1}],
 explain:'<p>المجموعة 14 متنوعة: الكربون لا فلز، والسيليكون والجرمانيوم أشباه فلزات، والقصدير والرصاص فلزات. السيليكون شبه موصل أساسي في الإلكترونيات وفي صناعة الزجاج.</p>'});

/* ================= S7: المجموعة 15 ================= */
def('s7',{n:'7 · المجموعة 15',eyebrow:'المحطة 7 · مجموعة النيتروجين · الكتاب صفحة 188',title:'المجموعة 15: مجموعة النيتروجين',goal:'لماذا النيتروجين والفوسفور ضروريان للمخلوقات الحية؟ وكيف نحصل على النيتروجين رغم أننا نتنفسه؟',plan:8,core:1,icon:gIcon('N'),
 body:`<div class="card" id="s7sl"></div><div class="two"><div class="card"><h3>سؤال</h3><div id="s7q"></div></div><div class="card"><h3>علّل</h3><p class="step-text">يجب إبعاد الفوسفور الأبيض عن الأكسجين.</p><div id="s7q2"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s7');};
  slides($('#s7sl'),[
   {k:'المجموعة 15',t:'تُسمّى مجموعة النيتروجين',im:[P('s24_b620a502','النيتروجين'),P('s24_38a4d364','تسميد النبات')],html:'<p>نجد في أعلى المجموعة الخامسة عشرة عنصرين لافلزين هما <b>النيتروجين والفوسفور</b>، وهما ضروريان للمخلوقات الحية، ويدخلان في تركيب المواد الحيوية التي تعمل على تخزين المعلومات الجينية والطاقة في الجسم. كما يدخلان في الكثير من الصناعات.</p><p>النيتروجين والفوسفور ضروريان لنمو النباتات.</p>'},
   {k:'لا بد أنك تتذكر تركيب الـ DNA',t:'القواعد النيتروجينية',im:[P('s25_a68c2884','جزيء DNA')],html:'<p>أحد مكونات الـ DNA <b>القواعد النيتروجينية</b>؛ فالنيتروجين يدخل في تركيب المادة الوراثية.</p>'},
   {k:'النيتروجين في الهواء',t:'لماذا لا نأخذه من الهواء؟',im:[P('s26_642e5b27','مكونات الهواء'),P('s26_36b46b8a','دورة النيتروجين')],html:'<p>نعلم أن الهواء يتكون في معظمه من النيتروجين (نحو <b>78%</b>). ورغم ذلك <b>لا يستطيع</b> الجسم أخذ حاجته من النيتروجين عند استنشاقه؛ إذ يجب أولًا أن تحوّل البكتيريا غاز النيتروجين إلى مواد يسهل على جذور النباتات امتصاصها، ثم يأخذ الجسم حاجته من النيتروجين بتناوله للنبات.</p><p class="hint-line">تصحيح: ورد في العرض والكتاب «أكثر من 80%»، والنسبة الدقيقة نحو 78%.</p>'},
   {k:'الأمونيا NH₃',t:'ما تركيب هذا الغاز؟',im:[P('s28_40716b5b','جزيء الأمونيا'),P('s28_1c851ea4','مظلة من النايلون')],html:'<p>يحتوي غاز <b>الأمونيا</b> على النيتروجين والهيدروجين (ذرة نيتروجين وثلاث ذرات هيدروجين)، ويُستخدم منظفًا ومطهرًا للجراثيم عند إذابته في الماء. وتضاف الأمونيا السائلة إلى التربة بوصفها سمادًا، ويمكن تحويلها إلى سماد صلب. وتُستخدم الأمونيا أيضًا في تجميد الطعام وتجفيفه كما في الثلاجات (الفريزر)، وفي صناعة النايلون المستخدم في المظلات.</p>'},
   {k:'الربط مع المهن',t:'المزارعون',im:[P('s29_08a26f1d','سماد NPK')],html:'<p>يفحص المزارعون كل عام التربة ليحددوا مستوى المواد المغذية فيها، تلك المواد التي تحتاج إليها النباتات حتى تنمو. وتساعدهم نتيجة الفحص على تحديد الكمية المناسبة التي تضاف إلى التربة من النيتروجين والفوسفور والبوتاسيوم؛ لزيادة احتمال الحصول على محاصيل جيدة.</p>'},
   {k:'الفوسفور',t:'الأبيض والأحمر',im:[P('s30_20072108','الفوسفور الأحمر'),P('s30_995e983c','أعواد الثقاب'),P('s30_031f6052','اشتعال الفوسفور الأبيض')],html:'<p>هناك نوعان من الفوسفور، هما الأحمر والأبيض، إلا أنّ الفوسفور الأبيض أكثر نشاطًا؛ لذلك يجب ألا يتعرّض للأكسجين حتى لا ينفجر. ولذلك تصنع رؤوس أعواد الثقاب من الفوسفور الأحمر الأقل نشاطًا؛ فهو يشتعل بفعل الحرارة الناتجة عن احتكاك عود الثقاب.</p><p>ومركبات الفوسفور مكوّن أساسي في صحة الأسنان والعظام. وتحتاج النباتات كذلك إلى الفوسفور، لذلك نجد الفوسفور من المكونات الأساسية للأسمدة.</p>'}],'s7');
  mcq($('#s7q'),{q:'أي العناصر التالية ضرورية لنمو النباتات؟',o:['الكربون والأكسجين','الصوديوم والكلور','النيتروجين والفوسفور','الهيدروجين والهيليوم'],a:2},'s7',c);
  mcq($('#s7q2'),{q:'السبب:',o:['لأنه شديد التفاعل مع الأكسجين؛ فيتأكسد بسرعة كبيرة ويشتعل تلقائيًّا، لذا يُخزّن في وسط خامل مثل الماء','لأنه غاز','لأنه لا يتفاعل مع أي مادة','لأنه يذوب في الهواء'],a:0},'s7',c);},
 quiz:[{q:'تُصنع رؤوس أعواد الثقاب من:',o:['الفوسفور الأبيض','الفوسفور الأحمر','النيتروجين','الأمونيا'],a:1}],
 explain:'<p>النيتروجين والفوسفور لافلزان ضروريان للحياة والنبات. الأمونيا (NH₃) سماد ومنظف وتُستخدم في التبريد وصناعة النايلون. الفوسفور الأبيض أنشط من الأحمر ويشتعل تلقائيًّا في الهواء.</p>'});

/* ================= S8: المجموعة 16 ================= */
def('s8',{n:'8 · المجموعة 16',eyebrow:'المحطة 8 · عائلة الأكسجين · الكتاب صفحة 188–189',title:'المجموعة 16: عائلة الأكسجين',goal:'فكّر معنا: غاز عديم اللون والرائحة والطعم يشكل حوالي 21% من الغلاف الجوي للأرض. من هو؟',plan:7,core:1,icon:gIcon('O'),
 body:`<div class="card" id="s8sl"></div><div class="two"><div class="card"><h3>ماذا تعرف عن أهمية الأكسجين؟</h3><div id="s8sort"></div></div><div class="card"><h3>علّل</h3><p class="step-text">يُستخدم عنصر السيلينيوم في آلات التصوير الضوئي.</p><div id="s8q"></div></div></div>
  <div class="card c6-enr"><b>من العرض · الربط مع التاريخ: تراكم السموم</b><p class="step-text">من المعروف أنّ الزرنيخ (As) يعطّل وظائف المخلوقات الحية؛ وذلك بتعطيل عمليات الأيض. ولأنّ الزرنيخ يتراكم في الشعر فإنّ الطب الجنائي يتمكن من اكتشاف حالات التسمم بالزرنيخ عن طريق فحص عينات من الشعر. وتذكر بعض كتب التاريخ أن نابليون (القائد الفرنسي) قُتل بتسميمه بالزرنيخ الذي وُجدت آثاره بعد فحص عينة من شعره. ابحث في الكتب المرجعية عن شخصية نابليون، وعن سبب قيام أحدهم بتسميمه بالزرنيخ.</p><p class="hint-line">الزرنيخ من عناصر المجموعة 15 (شبه فلز)، وقد ورد في العرض في هذا الموضع. سبب وفاة نابليون ما زال موضع خلاف بين المؤرخين.</p></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s8');};
  slides($('#s8sl'),[
   {k:'المجموعة 16',t:'تُسمّى عائلة الأكسجين',im:[P('s32_7373e098','الأكسجين'),P('s32_25d5fd4b','مكونات الغلاف الجوي')],html:'<p>إذا نظرنا في عناصر المجموعة 16 فسنجد أنّ أول عنصرين فيها هما <b>الأكسجين والكبريت</b>، وهما أساسيان في الحياة. بينما العناصر الأثقل في المجموعة هما التيلوريوم والبولونيوم، وهما أشباه فلزات.</p><p><b>فكّر معنا:</b> غاز عديم اللون والرائحة والطعم يشكل حوالي 21% من الغلاف الجوي للأرض… نعم هو الأكسجين.</p>'},
   {k:'الربط مع علم الأحياء',t:'أهمية الأكسجين',im:[P('s33_662faf67','الخلية والميتوكوندريا'),P('s34_06e9910d','طبقة الأوزون')],html:'<ul><li>تحتاج الخلايا إلى الأكسجين لإنتاج الطاقة.</li><li>يدخل في تركيب الصخور والمعادن.</li><li>ضروري لعملية الاشتعال.</li><li>تحتاجه المخلوقات الحية في عملية التنفس.</li><li>الأوزون (O₃) أحد أشكاله، وهو ضروري لحماية المخلوقات الحية من الإشعاعات الشمسية الضارة.</li></ul><p class="hint-line">تصحيح: ورد في العرض «الأوزون أحد نظائره»، والصواب أنه أحد <b>متآصلاته</b> (أشكاله)، لا نظائره.</p>'},
   {k:'الكبريت',t:'حمض الكبريتيك',im:[P('s35_e44a5111','الكبريت'),P('s35_46062a0b','جزيء حمض الكبريتيك'),P('s35_e0e0228c','عبوات حمض الكبريتيك')],html:'<p>أمّا الكبريت فهو لا فلز صلب، أصفر اللون، يُستخدم بكميات كبيرة في صناعة حمض الكبريتيك، الحمض الأكثر استخدامًا في العالم، والذي يتكوّن من اتحاد الكبريت والأكسجين والهيدروجين (H₂SO₄)؛ حيث يستخدم حمض الكبريتيك في الكثير من الصناعات، ومنها صناعات الطلاء والأسمدة والمنظفات والأنسجة الصناعية والمطاط.</p>'},
   {k:'السيلينيوم',t:'حساس للضوء',im:[P('s36_a6eab265','آلة تصوير'),P('s36_83063244','خلية شمسية')],html:'<p>أمّا السيلينيوم فهو موصل للكهرباء عند تعرضه للضوء، ولذلك يستخدم في الخلايا الشمسية وعدادات الضوء. ونظرًا إلى شدة حساسيته للضوء يستخدم في آلات التصوير الضوئي.</p>'}],'s8');
  sortGame($('#s8sort'),{bins:['من أهمية الأكسجين','ليست من أهميته'],items:[['يحتاجه الجسم لإنتاج الطاقة',0],['يدخل في تركيب الصخور والمعادن',0],['ضروري لعملية الاشتعال',0],['تحتاجه المخلوقات الحية في التنفس',0],['الأوزون أحد أشكاله ويحمينا من الإشعاعات الضارة',0],['يُستخدم في ملء البالونات لأنه أخف من الهواء',1,'الأكسجين أثقل قليلًا من الهواء.'],['غاز نبيل لا يتفاعل',1,'الأكسجين نشط ويتفاعل بسهولة.']]},'s8',c);
  mcq($('#s8q'),{q:'السبب:',o:['لأنه حساس للضوء؛ يوصل الكهرباء عند تعرضه للضوء','لأنه غاز نبيل','لأنه فلز قلوي','لأنه لا يوصل الكهرباء أبدًا'],a:0},'s8',c);},
 quiz:[{q:'الحمض الأكثر استخدامًا في العالم:',o:['حمض الكبريتيك','حمض الهيدروكلوريك','حمض الخل','حمض الستريك'],a:0}],
 explain:'<p>عائلة الأكسجين: الأكسجين والكبريت أساسيان في الحياة، والتيلوريوم والبولونيوم أشباه فلزات. الكبريت لصناعة حمض الكبريتيك، والسيلينيوم حساس للضوء.</p>'});

/* ================= S9: المجموعة 17 ================= */
def('s9',{n:'9 · المجموعة 17',eyebrow:'المحطة 9 · مجموعة الهالوجينات · الكتاب صفحة 190',title:'المجموعة 17: مجموعة الهالوجينات',goal:'لماذا سُمّيت «مكوّنات الأملاح»؟ وما استخدامات الكلور واليود والفلور؟',plan:7,core:1,icon:gIcon('Cl'),
 body:`<div class="two"><div class="card"><h3>سؤال</h3><div id="s9q"></div></div><div class="card">${col(17,'المجموعة 17: أكثر عناصرها نشاطًا الفلور، وأقلها نشاطًا الأستاتين.')}</div></div><div class="card" id="s9sl"></div>
  <div class="card"><h3>ماذا قرأت؟ ماذا ينتج عن اتحاد الهالوجينات مع الفلزات القلوية؟</h3><div id="s9q2"></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s9');};
  mcq($('#s9q'),{q:'ماذا تُسمّى عناصر المجموعة 17 في الجدول الدوري؟',o:['الفلزات القلوية','الفلزات القلوية الأرضية','الهالوجينات','الغازات النبيلة'],a:2},'s9',c);
  slides($('#s9sl'),[
   {k:'المجموعة 17',t:'مجموعة الهالوجينات',im:[P('s38_d10f7c62','كلوريد الصوديوم')],html:'<p>جميع عناصر هذه المجموعة لافلزات ما عدا الأستاتين؛ فهو شبه فلز مشع، وقد سميت هذه المجموعة <b>بالهالوجينات Halogens</b> وتعني «مكوّنات الأملاح»؛ فنجد مثلًا أنّ ملح الطعام أو كلوريد الصوديوم مادة تتكوّن من الصوديوم والكلور. وتكوّن جميع عناصر هذه المجموعة أملاحًا مشابهة عند اتحادها مع الصوديوم أو مع أي عنصر من عناصر الفلزات القلوية.</p>'},
   {k:'المجموعة 17',t:'ترتيب النشاط',im:[P('s39_199de258','عناصر المجموعة 17')],html:'<p>أكثر عناصر المجموعة نشاطًا هو الفلور ثم الكلور فالبروم، ثم اليود الذي يعد أقلّها نشاطًا.</p><p>(الأستاتين في أسفل المجموعة أقلها نشاطًا.)</p>'},
   {k:'الكلور',t:'يُضاف إلى مياه المسابح',im:[P('s39_218819b0','تعقيم المسبح')],html:'<p><b>لماذا؟</b> للتعقيم وقتل البكتيريا.</p>'},
   {k:'اليود',t:'اليود-131',im:[P('s40_b9cad34c','كبسولة يود مشع'),P('s40_d2755847','الغدة الدرقية')],html:'<p>يُستخدم <b>اليود المشع</b> في الطب النووي لعلاج أمراض الغدة الدرقية مثل فرط النشاط، وسرطان الغدة الدرقية.</p>'},
   {k:'الفلور',t:'حماية الأسنان',im:[P('s41_14ad439c','الفلور'),P('s41_5015480f','معجون أسنان بالفلورايد')],html:'<p>يُستخدم الفلور في مركبات مثل معجون الأسنان ومياه الشرب لحماية الأسنان من التسوس وتقويتها.</p>'}],'s9');
  mcq($('#s9q2'),{q:'ينتج عن اتحاد الهالوجينات مع الفلزات القلوية:',o:['أملاح','غازات نبيلة','أحماض','سبائك'],a:0,why:'مثل كلوريد الصوديوم (ملح الطعام).'},'s9',c);},
 quiz:[{q:'أكثر الهالوجينات نشاطًا:',o:['اليود','البروم','الفلور','الكلور'],a:2}],
 explain:'<p>الهالوجينات «مكوّنات الأملاح»: لافلزات (عدا الأستاتين) تكوّن أملاحًا مع الفلزات القلوية. يقل نشاطها من الفلور إلى الأستاتين. الكلور للتعقيم، واليود-131 لعلاج الغدة الدرقية، والفلور لحماية الأسنان.</p>'});

/* ================= S10: المجموعة 18 ================= */
def('s10',{n:'10 · المجموعة 18',eyebrow:'المحطة 10 · الغازات النبيلة · الكتاب صفحة 190–191',title:'المجموعة 18: الغازات النبيلة',goal:'ما سبب التسمية؟ ولماذا تُستخدم في الإضاءة والبالونات؟',plan:8,core:1,icon:gIcon('Ne'),
 body:`<div class="card" id="s10sl"></div><div class="two"><div class="card"><h3>سؤال: أيهما أخف، غاز الأكسجين أم الهيليوم؟</h3><div id="s10q1"></div><h3 class="mt">إذن، لماذا يُستخدم الهيليوم بدلًا من الأكسجين في ملء البالونات والمناطيد؟</h3><div id="s10q2"></div></div>
  <div class="card"><h3>ماذا قرأت؟ لماذا تستخدم الغازات النبيلة في الإضاءة؟</h3>${fig('s46_baea9dbf','ألوان الغازات النبيلة عند التفريغ الكهربائي',420)}<div id="s10q3"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=3)G.complete('s10');};
  slides($('#s10sl'),[
   {k:'المجموعة 18',t:'الغازات النبيلة: ما سبب التسمية؟',im:[P('s42_f6dddb63','الهيليوم')],html:'<p>تُسمّى عناصر المجموعة 18 <b>الغازات النبيلة Noble gases</b>؛ لأنّها توجد في الطبيعة منفردة، ونادرًا ما تتحد مع عناصر أخرى بسبب نشاطها القليل جدًّا.</p>'},
   {k:'الهيليوم',t:'استخداماته',im:[P('s43_711492fe','أسطوانة هيليوم وبالونات')],html:'<p>فالهيليوم عنصر أقل كثافة من الهواء، ولا يشتعل، ولذلك يستخدم في ملء البالونات والمناطيد، ومنها المناطيد التي تحمل كاميرات لتصوير الأحداث الرياضية، أو التي تحمل أجهزة خاصة لقياس عناصر الطقس. ورغم أنّ الهيدروجين أخفّ من الهيليوم إلا أنّ الهيليوم يستخدم أكثر؛ لأنه لا يشتعل، مما يعني أنه آمن.</p>'},
   {k:'الهيليوم',t:'تغيّر الصوت وآثار جانبية',im:[P('s44_5f40b220','تغيّر الصوت بعد استنشاق الهيليوم')],html:'<p>عندما تستنشق الهيليوم، يصبح الصوت الناتج عن اهتزاز الحبال الصوتية أسرع في المرور عبر هذا الغاز الأقل كثافة، مما يرفع من حدة الصوت.</p><p><b>الآثار الجانبية لاستنشاق الهيليوم:</b> يتسبب استنشاق غاز الهيليوم من البالون إلى جانب تغيير الصوت في الإصابة ببعض التأثيرات الجانبية: الدوخة، الغثيان، الدوار، فقدان الوعي. <b>لذا لا تجرّب ذلك.</b></p>'},
   {k:'استخدامات الغازات النبيلة',t:'اللوحات الإعلانية',im:[P('s46_bcb0b466','لوحة إعلانية مضيئة')],html:'<p>تعطي هذه الغازات ألوانها المميزة عند تعرّضها للتفريغ الكهربائي؛ لذا تُستخدم في <b>اللوحات الإعلانية</b> المضيئة.</p>'},
   {k:'استخدامات الغازات النبيلة',t:'الأرجون والكريبتون',im:[P('s47_83d61f75','أنابيب الأرجون والكريبتون والزينون'),P('s47_e40b886b','ليزر الأرجون والشبكية')],html:'<p>الأرجون هو الغاز النبيل الأكثر توافرًا في الطبيعة، وقد اكتُشف عام 1894م، ويستخدم الكربتون مع النيتروجين في مصابيح الإنارة العادية؛ لأنّ هذه الغازات تحفظ الفتيل (سلك التنجستون) من الاحتراق، وإذا استُخدم مزيج من الكربتون والأرجون والزينون في هذه المصابيح فإنّها تدوم فترة أطول.</p><p><b>التخثير الضوئي:</b> يقوم ليزر الأرجون بتوجيه نبضات ضوئية دقيقة إلى المناطق التالفة في الشبكية، مما يخلق نوعًا من «الندبات» التي تساعد على منع تسرب السوائل والبروتينات وتقليل الالتهاب.</p>'},
   {k:'استخدامات الغازات النبيلة',t:'مصابيح الكريبتون',im:[P('s48_29d6c7c4','إنارة مدرج المطار')],html:'<p>وتُستخدم مصابيح الكربتون في إنارة أرضية مدارج المطارات.</p>'},
   {k:'الرادون',t:'غاز مشع',im:[P('s49_2956235d','الرادون والرئة')],html:'<p>ونجد في نهاية الغازات النبيلة «الرادون»، وهو غاز مشع ينتج بشكل طبيعي عند تحلّل اليورانيوم في التربة والصخور. وهذا الغاز مضرّ جدًّا؛ لأنّه يستمرّ في إطلاق الإشعاعات، وقد يسبب سرطان الرئة إذا استمرّ الناس في تنفس الهواء الذي يحوي هذا الغاز.</p>'}],'s10',c);
  mcq($('#s10q1'),{q:'أيهما أخف؟',o:['الهيليوم','الأكسجين','متساويان'],a:0,why:'كتلة الهيليوم الذرية 4.003، وجزيء الأكسجين O₂ كتلته نحو 32.'},'s10',c);
  mcq($('#s10q2'),{q:'السبب:',o:['لأنه أقل كثافة من الهواء ولا يشتعل','لأنه أثقل من الهواء','لأنه ملوّن','لأنه نشط كيميائيًّا'],a:0,why:'أمّا الأكسجين فأثقل قليلًا من الهواء، ويساعد على الاشتعال.'},'s10');
  mcq($('#s10q3'),{q:'السبب:',o:['لأنها تتوهج بألوان برّاقة عند تعرضها للتفريغ الكهربائي، كما أنها غير نشطة كيميائيًّا','لأنها فلزات لامعة','لأنها تشتعل بسهولة','لأنها سائلة'],a:0},'s10',c);},
 quiz:[{q:'الغاز النبيل الأكثر توافرًا في الطبيعة:',o:['الهيليوم','النيون','الأرجون','الرادون'],a:2},{q:'غاز نبيل مشع قد يسبب سرطان الرئة:',o:['الرادون','الزينون','الكريبتون','النيون'],a:0}],
 explain:'<p>الغازات النبيلة نادرًا ما تتحد. الهيليوم للبالونات (أخف من الهواء ولا يشتعل)، والنيون وغيره للوحات المضيئة، والأرجون والكريبتون في المصابيح، وليزر الأرجون لعلاج الشبكية، والرادون غاز مشع ضار.</p>'});

/* ================= SUMMARY + SELF ================= */
def('sum',{n:'الخلاصة',eyebrow:'الخلاصة · الكتاب صفحة 191',title:'الخلاصة',goal:'أهم أفكار الدرس كما في العرض.',plan:2,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>المجموعتان 1، 2</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>تتحد عناصر المجموعتين 1، 2 مع عناصر أخرى.</li><li>عناصر هذه المجموعات فلزات ما عدا الهيدروجين.</li><li>عناصر الفلزات القلوية الأرضية أقل نشاطًا من عناصر الفلزات القلوية.</li></ul></div>
  <div class="card"><h3>المجموعات 13–18</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>نجد في المجموعة الواحدة من هذه المجموعات 13–18 عناصر فلزية ولا فلزية وأشباه فلزات.</li><li>النيتروجين والفوسفور ضروريان للمخلوقات الحية.</li><li>تكوّن الهالوجينات أملاحًا مع الفلزات القلوية.</li></ul></div></div>
  <div class="card"><div class="stage" style="padding:6px">${PT.ptSVG({mode:'cat',hl:e=>e.reg==='ممثلة'})}</div>${PT.legend('cat')}</div>`,init(){},enter(){G.complete('sum');},reset(){},explain:'<p>خلاصة الدرس كما في العرض.</p>'});
def('self',{n:'اختبر نفسك',eyebrow:'الكتاب صفحة 191 · تسليم الواجب يوم الخميس',title:'اختبر نفسك وتطبيق المهارات',goal:'أسئلة «اختبر نفسك» مع حلول نموذجية، ثم سؤال «تطبيق المهارات».',plan:3,icon:ICO.check,body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'قارن',q:'قارن بين عناصر المجموعة 1 وعناصر المجموعة 17.',a:[['المجموعة 1','فلزات قلوية (عدا الهيدروجين) لامعة، صلبة، موصلة، شديدة النشاط ويزداد نشاطها نزولًا في المجموعة.'],['المجموعة 17','هالوجينات لافلزية (عدا الأستاتين شبه فلز)، رديئة التوصيل، نشطة ويقل نشاطها نزولًا في المجموعة.'],['وجه الشبه','كلتاهما نشطة، وتتحدان معًا لتكوين الأملاح مثل كلوريد الصوديوم.']]},
  {k:'اذكر',q:'اذكر استخدامين لعنصر واحد من عناصر كل مجموعة من مجموعات العناصر الممثلة.',a:[['المجموعة 1','الليثيوم: بطاريات الكاميرات · الصوديوم: ملح الطعام.'],['المجموعة 2','الماغنسيوم: في كلوروفيل النبات · البريليوم: في الزمرد.'],['المجموعة 13','الألومنيوم: علب المشروبات وهياكل الطائرات.'],['المجموعة 14','السيليكون: الزجاج وأشباه الموصلات.'],['المجموعة 15','النيتروجين: الأمونيا والأسمدة.'],['المجموعة 16','الكبريت: حمض الكبريتيك · السيلينيوم: آلات التصوير الضوئي.'],['المجموعة 17','الكلور: تعقيم المسابح · الفلور: معجون الأسنان.'],['المجموعة 18','الهيليوم: البالونات · النيون: اللوحات الإعلانية.']]},
  {k:'حدّد',q:'حدّد المجموعة التي لا تتحد عناصرها مع عناصر أخرى.',a:[['الإجابة','المجموعة 18: الغازات النبيلة.']]},
  {k:'التفكير الناقد',q:'عنصر الفرانسيوم فلز قلوي نادر ومشع، يقع في أسفل المجموعة 1، ولم تُدرس خصائصه جيدًا. هل تتوقع أن يتحد الفرانسيوم مع الماء بشكل أكبر من السيزيوم أم أقل؟',a:[['الإجابة','بشكل أكبر؛ لأن نشاط الفلزات القلوية يزداد كلما نزلنا إلى أسفل المجموعة.']]},
  {k:'تطبيق المهارات · توقّع',q:'ما قابلية عنصر الأستاتين لتكوين الملح مقارنة بباقي عناصر المجموعة 17؟ وهل هناك نمط لنشاط عناصر هذه المجموعة؟',a:[['الإجابة','قابلية عنصر الأستاتين لتكوين الملح تكون أقل؛ لأن نشاط العناصر يقل في مجموعة الهالوجينات كلما اتجهنا من أعلى إلى أسفل.']]}],'self',()=>G.complete('self'));},
 reset(){STN.self.s.reset();},explain:'<p>إجابة «تطبيق المهارات» من العرض، وحلول «اختبر نفسك» نموذجية مقترحة.</p>'});

/* ================= التقويم (مقترح) ================= */
def('ev1',{n:'تقويم: صنّف العناصر',eyebrow:'تقويم تكويني · مقترح',title:'تقويم: صنّف إلى المجموعات',goal:'صنّف العناصر إلى مجموعاتها بناءً على تشابه خصائصها (الهدف الثالث)، ثم صحّح العبارات.',plan:5,core:1,icon:ICO.check,
 body:`<div class="card"><div id="ev1a"></div></div><div class="card"><h3>صح أم خطأ، وصحّح الكلمة التي تحتها خط</h3><div id="ev1b"></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('ev1');};
  sortGame($('#ev1a'),{bins:['الفلزات القلوية','القلوية الأرضية','الهالوجينات','الغازات النبيلة'],items:[['الليثيوم',0],['البوتاسيوم',0],['الماغنسيوم',1],['الكالسيوم',1],['الكلور',2],['اليود',2],['النيون',3],['الأرجون',3]]},'ev1',c);
  C6.tfx($('#ev1b'),[['يزداد نشاط الفلزات القلوية كلما <u>صعدنا</u> إلى أعلى المجموعة.',false,'نزلنا',['نزلنا','بقينا','انتقلنا يمينًا']],['البورون <u>شبه فلز</u> أسود وهش.',true],['الهيليوم <u>أثقل</u> من الهواء.',false,'أخف',['أخف','أكثف','أسخن']],['أكثر الهالوجينات نشاطًا <u>الفلور</u>.',true],['تُصنع رؤوس أعواد الثقاب من الفوسفور <u>الأبيض</u>.',false,'الأحمر',['الأحمر','الأسود','الأصفر']]],'ev1',c);}});

/* ================= إثرائي: المسابقات ================= */
const RQ=[{q:'أنشط الفلزات القلوية من بين:',o:['Li','Na','K','Cs'],a:3},{q:'عائلة البورون هي المجموعة:',o:['13','14','15','16'],a:0},{q:'أشهر أشباه الموصلات:',o:['السيليكون','الرصاص','الكبريت','الذهب'],a:0},{q:'غاز يُستخدم في البالونات بأمان:',o:['الهيدروجين','الهيليوم','الأكسجين','الكلور'],a:1},{q:'«مكوّنات الأملاح»:',o:['الغازات النبيلة','الهالوجينات','القلوية','أشباه الموصلات'],a:1},{q:'عنصران ضروريان لنمو النبات:',o:['N وP','He وNe','Na وCl','Cs وFr'],a:0},{q:'يُستخدم في آلات التصوير الضوئي:',o:['السيلينيوم','الكبريت','الأكسجين','التيلوريوم'],a:0},{q:'واقٍ من أشعة X:',o:['الرصاص','القصدير','الألومنيوم','الجاليوم'],a:0},{q:'يوجد في كلوروفيل النبات:',o:['الماغنسيوم','الكالسيوم','الباريوم','البريليوم'],a:0},{q:'غاز نبيل مشع:',o:['الرادون','الأرجون','النيون','الهيليوم'],a:0}];
def('x1',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'سباق الأحياء ومزاد المعرفة',goal:'تسلّقوا هرم العناصر الممثلة، ثم زايدوا على صحة العبارات.',plan:5,
 icon:'<path d="M40 8L72 70H8z" fill="none" stroke="currentColor" stroke-width="6"/><path d="M26 46h28" stroke="currentColor" stroke-width="5"/>',
 body:'<div class="card"><div id="x1race"></div></div><div class="card"><div class="nb-head"><h2>🔨 مزاد المعرفة</h2><span>زايدوا على ثقتكم بالإجابة</span></div><div id="x1auc"></div></div>',
 init(){race($('#x1race'),{theme:'pyramid',title:'هرم العناصر الممثلة',qs:RQ,how:'تتناوب المجموعات على الإجابة، وكل إجابة صحيحة ترفع المجموعة درجة في الهرم.',winSub:'وصلتم إلى قمة الهرم أولًا!'},'x1');
  STN.x1.a=auction($('#x1auc'),[['الهيدروجين فلز قلوي.',false,'الهيدروجين لا فلز رغم وجوده في المجموعة الأولى.'],['الجاليوم قد ينصهر في راحة اليد.',true],['الهواء يتكون في معظمه من الأكسجين.',false,'معظم الهواء نيتروجين (نحو 78%).'],['الكلور يُضاف إلى مياه المسابح للتعقيم.',true],['الأرجون أكثر الغازات النبيلة توافرًا في الطبيعة.',true],['الفلزات القلوية الأرضية أنشط من الفلزات القلوية.',false,'هي أقل نشاطًا.'],['الكربون له أشكال مختلفة منها الألماس والجرافيت.',true],['الأستاتين أنشط الهالوجينات.',false,'الفلور أنشطها.']],'x1');},
 reset(){STN.x1.a.reset();},explain:'<p>مسابقتان إثرائيتان مقترحتان.</p>'});
const RID=[{clues:['أنا فلز من المجموعة 13.','قد أنصهر في راحة يدك.','أُستخدم في رقاقات الحاسوب.'],o:['الجاليوم','الألومنيوم','البورون','الإنديوم'],a:0},
 {clues:['أنا غاز نبيل.','أخف من الهواء ولا أشتعل.','أملأ البالونات والمناطيد.'],o:['الهيليوم','النيون','الأرجون','الرادون'],a:0},
 {clues:['أنا لا فلز من المجموعة 15.','لي نوعان: أحمر وأبيض.','رؤوس أعواد الثقاب من نوعي الأحمر.'],o:['الفوسفور','النيتروجين','الزرنيخ','الكبريت'],a:0},
 {clues:['أنا هالوجين.','أُضاف إلى مياه المسابح.','أتحد مع الصوديوم لأكوّن ملح الطعام.'],o:['الكلور','الفلور','اليود','البروم'],a:0},
 {clues:['أنا فلز قلوي.','أوجد في بطاريات الكاميرات.','أنا أول الفلزات القلوية.'],o:['الليثيوم','الصوديوم','البوتاسيوم','السيزيوم'],a:0}];
def('x2',{n:'إثرائي · من أنا؟',eyebrow:'إثرائي · ألغاز ولوحة خيارات',title:'من أنا؟ ولوحة الخيارات',goal:'خمّن العنصر بأقل عدد من الأدلة، ثم اختر ثلاث مهام في خط واحد.',plan:4,
 icon:'<circle cx="34" cy="34" r="20" fill="none" stroke="currentColor" stroke-width="6"/><path d="M48 48l20 20" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>',
 body:'<div class="card"><div id="x2rid"></div></div><div class="card"><h3>لوحة الخيارات 3 × 3</h3><div id="x2cb"></div></div>',
 init(){riddles($('#x2rid'),RID,'x2');
  STN.x2.cb=choiceBoard($('#x2cb'),[
   {ic:'🗺',t:'خريطة مفاهيم',kind:'تنظيم',p:'صمّم خريطة مفاهيم لاستخدامات عناصر مجموعة البورون (البورون، الألومنيوم، الجاليوم).'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'المجموعة التي تُسمّى الغازات النبيلة:',o:['1','2','17','18'],a:3},
   {ic:'✍️',t:'اكتب فقرة',kind:'كتابة',p:'اكتب فقرة عن أهمية النيتروجين والفوسفور للمزارعين.'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'شبه فلز مشع من الهالوجينات:',o:['الأستاتين','اليود','الفلور','البروم'],a:0},
   {ic:'🔬',t:'جرّب في البيت',kind:'تجربة',p:'اقرأ مكونات معجون أسنانك: هل تجد مركبًا للفلور (فلوريد)؟ سجّل اسمه.'},
   {ic:'❓',t:'تحدٍّ',kind:'اختيار',q:'العنصر الذي يُصنع منه وعاء ينتقل من الثلاجة إلى الفرن دون أن ينكسر:',o:['البورون','الرصاص','الصوديوم','الكبريت'],a:0},
   {ic:'🎨',t:'صمّم ملصقًا',kind:'رسم',p:'صمّم ملصقًا توعويًّا عن خطر استنشاق الهيليوم أو غاز الرادون.'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'شكلان للكربون:',o:['الألماس والجرافيت','الكوارتز والرمل','الأمونيا والنايلون','الكبريت والسيلينيوم'],a:0},
   {ic:'📸',t:'ابحث حولك',kind:'ملاحظة',p:'ابحث في بيتك عن ثلاثة أشياء من الألومنيوم وصوّرها أو ارسمها.'}],'x2',()=>G.complete('x2'));},
 reset(){STN.x2.cb.reset();},explain:'<p>نشاطان إثرائيان مقترحان.</p>'});

/* ================= CHALLENGE ================= */
def('ch',{n:'تحدي العلماء',plan:3,icon:'<path d="M24 10h32v18a16 16 0 0 1-32 0z" fill="currentColor"/><path d="M40 44v14M28 70h24l-3-12H31z" fill="currentColor"/>',
 eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من أسئلة العرض. لكل سؤال محاولتان.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'المجموعة 1',q:'أي مما يلي لا ينطبق على عناصر المجموعة الأولى:',o:['تُسمّى الفلزات القلوية','درجة انصهارها عالية','لامعة وصلبة','عناصر نشطة'],a:1},
  {k:'المجموعات 13–18',q:'أي مما يلي تلاحظه في عناصر المجموعات 13–18:',o:['جميعها صلبة','جميعها فلزات','توجد في حالات المادة الثلاث','جميعها مصنعة'],a:2},
  {k:'المجموعة 13',q:'أي العناصر التالية لا ينتمي للمجموعة 13؟',o:['الكربون','الألومنيوم','البورون','الجاليوم'],a:0},
  {k:'المجموعة 15',q:'أي العناصر التالية ضرورية لنمو النباتات؟',o:['الكربون والأكسجين','الصوديوم والكلور','النيتروجين والفوسفور','الهيدروجين والهيليوم'],a:2},
  {k:'المجموعة 17',q:'ماذا تُسمّى عناصر المجموعة 17؟',o:['الفلزات القلوية','الفلزات القلوية الأرضية','الهالوجينات','الغازات النبيلة'],a:2},
  {k:'المجموعة 18',q:'لماذا تُستخدم الغازات النبيلة في الإضاءة؟',o:['لأنها تتوهج بألوان برّاقة عند التفريغ الكهربائي وغير نشطة','لأنها فلزات','لأنها تشتعل','لأنها ثقيلة'],a:0},
  {k:'القلوية الأرضية',t:'multi',q:'اختر كل الفلزات القلوية الأرضية:',items:[['الماغنسيوم',1],['الكالسيوم',1],['الباريوم',1],['الصوديوم',0],['الألومنيوم',0]],why:'الصوديوم قلوي، والألومنيوم في المجموعة 13.'},
  {k:'تطبيق المهارات',q:'قابلية الأستاتين لتكوين الملح مقارنة بالفلور:',o:['أقل','أكبر','مساوية','لا يكوّن أملاحًا'],a:0}],'ch');},
 reset(){STN.ch.c.reset();},explain:'<p>أسئلة التحدي من أسئلة العرض.</p>'});

/* ================= PLAN ================= */
const SROWS={intro:{s:['poe','brain'],g:'١–٣',sk:'التنبؤ',ev:'سؤال التوقع'},goals:{s:['frayer','cards'],g:'١–٣',sk:'التذكر',ev:'لعبة المطابقة'},
 s1:{s:['disc','cards'],g:'١',sk:'التفسير',ev:'علّل'},s2:{s:['tps','cards'],g:'١ و٢',sk:'الاستنتاج',ev:'سؤال المجموعة الأولى'},lab4:{s:['poe','inq'],g:'١',sk:'التنبؤ والملاحظة',ev:'ترتيب النشاط'},s3:{s:['coop','venn'],g:'١ و٣',sk:'المقارنة',ev:'تصنيف المجموعة 2'},
 s4:{s:['disc'],g:'١',sk:'الملاحظة',ev:'سؤال المجموعات 13–18'},s5:{s:['cmap','jigsaw'],g:'٢',sk:'التنظيم',ev:'خريطة المفاهيم'},s6:{s:['inq','heads'],g:'١–٣',sk:'التصنيف والاستنتاج',ev:'أسئلة المجموعة 14'},lab5:{s:['inq','poe'],g:'٢',sk:'ضبط المتغيرات',ev:'منحنى التوصيل'},
 s7:{s:['story','role'],g:'٢',sk:'الربط',ev:'علّل الفوسفور الأبيض'},s8:{s:['brain','sticks'],g:'٢',sk:'التفسير',ev:'أهمية الأكسجين'},s9:{s:['tps','cards'],g:'١ و٢',sk:'الاستنتاج',ev:'ماذا قرأت؟'},lab6:{s:['poe','inq'],g:'١ و٣',sk:'التنبؤ',ev:'نشاط الهالوجينات'},
 s10:{s:['disc','hot'],g:'١ و٢',sk:'التفسير',ev:'أيهما أخف؟'},lab7:{s:['inq','game'],g:'٢',sk:'الملاحظة',ev:'ألوان الغازات والبالونات'},ev1:{s:['spot','coop'],g:'٣',sk:'التصنيف والتصحيح',ev:'تصنيف وتصحيح'},
 sum:{s:['tl'],g:'١–٣',sk:'التلخيص',ev:'إشارة المرور'},self:{s:['heads','sticks'],g:'١–٣',sk:'المقارنة والتوقع',ev:'اختبر نفسك'},x1:{s:['champ','game'],g:'١–٣',sk:'الاستدعاء',ev:'الهرم والمزاد'},x2:{s:['who','game'],g:'١–٣',sk:'الاستنتاج',ev:'من أنا؟'},ch:{s:['exit'],g:'١–٣',sk:'التقويم الختامي',ev:'تحدي العلماء'}};
SK.init({key:'g9c6l2',sfx:{pop:()=>SFX.pop(),tick:()=>SFX.tick(),ok:()=>SFX.correct(),no:()=>SFX.wrong()},teams:()=>(G.teams||K.TEAMN.slice(0,4).map((n,i)=>({n,c:K.TEAMC[i]}))).map(t=>({n:t.n,c:t.c})),
 stratRoster:{api:'https://script.google.com/macros/s/AKfycbxp-t4JgGO5WiK6hoacjTyBqFnG-9bSWClplOpVV4VDuTV7T4tY0swB1Ll36kr_djJ7nQ/exec',classes:['1/3','2/3','3/3','4/3']}});
def('plan',{n:'خطة الدرس والاستراتيجيات',after:'goals',eyebrow:'للمعلم والزائر',title:'خطة الدرس: الأهداف والاستراتيجيات والتقويم',goal:'المس أي صف للانتقال إلى محطته، أو شارة الاستراتيجية أعلى المحطة لعرض خطواتها وأدواتها.',plan:1,
 icon:'<rect x="10" y="12" width="60" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M10 28h60M30 28v40" stroke="currentColor" stroke-width="5"/>',body:'<div class="card" id="planBox"></div>',
 init(){const secs=$$('#stations section.st');let k=0;const rows=[];secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;k++;rows.push({i:id,num:k,name:STN[id].n.replace(/^\d+ · /,''),c});});
  $('#planBox').innerHTML=SK.planHTML('',rows);SK.wirePlan($('#planBox'),id=>K.go(id));
  secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;const h=s.querySelector('.st-head');if(h&&!h.querySelector('.stgs')){const b=SK.badges(c);b.style.cssText='display:flex;margin:6px 0 0';h.appendChild(b);}});
  if(!document.getElementById('skfab'))SK.fab('left:14px;bottom:86px');},
 enter(){G.complete('plan');},reset(){},explain:'<p>خطة الدرس: لكل محطة هدفها والاستراتيجية المطبقة ومهارة التفكير وأداة التقويم.</p>'});
K.boot({chapter:'الفصل السادس: الجدول الدوري',chapterShort:'الفصل السادس',title:'جولة في أحياء الممثلة',lesson:'الدرس الثاني: العناصر الممثلة',accent:'#0e7490',accentDark:'#22d3ee',hook:'ثمانية أحياء… ولكل حي طباع سكانه!',
 riddle:'لماذا تختلف طباع العناصر الممثلة إلى هذا الحد؟',predict:{o:['لأن عناصر كل مجموعة تتشابه في خصائصها وتختلف عن المجموعات الأخرى','لأنها جميعًا فلزات','لأنها مرتبة أبجديًّا'],a:0},
 answer:'العناصر الممثلة ثماني مجموعات (1، 2، 13–18)، لكل مجموعة خصائص يتشابه فيها أفرادها: فلزات قلوية نشطة، وقلوية أرضية، وعائلات متنوعة، وهالوجينات تكوّن الأملاح، وغازات نبيلة خاملة.',
 finalTitle:'مبارك! أنهيت جولتك في أحياء الممثلة',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 191 · التسليم يوم الخميس.',
 concepts:[{n:'الفلزات القلوية',t:'المجموعة 1: لامعة، منخفضة الكثافة والانصهار، يزداد نشاطها نزولًا.',ic:'<text x="24" y="32" text-anchor="middle" font-size="20" font-weight="800" fill="var(--accent)">Na</text>'},
  {n:'القلوية الأرضية',t:'المجموعة 2: أكثف وأصلب وأقل نشاطًا.',ic:'<text x="24" y="32" text-anchor="middle" font-size="20" font-weight="800" fill="var(--accent)">Mg</text>'},
  {n:'المجموعات 13–16',t:'متنوعة: فلزات ولافلزات وأشباه فلزات.',ic:'<text x="24" y="32" text-anchor="middle" font-size="20" font-weight="800" fill="var(--accent)">Si</text>'},
  {n:'أشباه الموصلات',t:'توصيلها بين الموصلات والعوازل، ويُتحكم فيه بالحرارة والضوء والشوائب.',ic:'<rect x="10" y="10" width="28" height="28" rx="4" fill="none" stroke="var(--accent)" stroke-width="4"/><path d="M4 18h6M4 30h6M38 18h6M38 30h6" stroke="var(--accent)" stroke-width="3"/>'},
  {n:'الهالوجينات',t:'المجموعة 17: مكوّنات الأملاح، يقل نشاطها نزولًا.',ic:'<text x="24" y="32" text-anchor="middle" font-size="20" font-weight="800" fill="var(--accent)">Cl</text>'},
  {n:'الغازات النبيلة',t:'المجموعة 18: نادرًا ما تتحد، وتتوهج عند التفريغ الكهربائي.',ic:'<text x="24" y="32" text-anchor="middle" font-size="20" font-weight="800" fill="var(--accent)">Ne</text>'}]});
$$('.top h1').forEach(h=>h.dataset.sym='Na');
})();

