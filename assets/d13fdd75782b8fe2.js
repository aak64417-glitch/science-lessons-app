
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

/* ===== تجارب افتراضية — البراكين ===== */
(function(){
const {$,$$,G,STN,def,say,SFX,mcq}=K;const AR='font-family="IBM Plex Sans Arabic"';

/* ---------- 1) تشريح البركان ---------- */
const VOL=`<svg viewBox="0 0 320 300" style="max-width:340px;direction:ltr"><rect width="320" height="300" fill="#e0f2fe"/><path d="M0 230 L110 70 h100 L320 230z" fill="#7c4a1e"/><path d="M0 230h320v70H0z" fill="#a16207"/>
 <ellipse cx="160" cy="270" rx="70" ry="22" fill="#ea580c"/><path d="M152 248 L150 72 h20 l-2 176z" fill="#f97316"/><path d="M168 90 Q220 130 250 210" stroke="#f97316" stroke-width="10" fill="none"/>
 <path d="M140 70 q-20 -40 10 -50 q10 -20 30 -5 q30 -5 25 25 q20 15 -5 30z" fill="#94a3b8" opacity=".85"/><circle cx="90" cy="40" r="7" fill="#292524"/><circle cx="240" cy="55" r="6" fill="#292524"/>
 ${[['1',160,62],['2',236,170],['3',176,160],['4',160,276],['5',170,22],['6',240,48]].map(([t,x,y])=>`<circle cx="${x}" cy="${y}" r="11" fill="#fff" stroke="#111"/><text x="${x}" y="${y+5}" text-anchor="middle" font-size="13" font-weight="800">${t}</text>`).join('')}</svg>`;
def('lab1',{after:'s1',n:'🧪 تشريح البركان',eyebrow:'نشاط تفاعلي · مقترح',title:'مختبر تشريح البركان: سمِّ الأجزاء',goal:'اختر اسم الجزء من البطاقات ثم المس رقمه في القائمة.',plan:5,core:1,
 icon:'<path d="M8 70L32 26h16l24 44z" fill="none" stroke="currentColor" stroke-width="5"/><path d="M40 26v44" stroke="currentColor" stroke-width="4"/>',body:'<div class="card"><div id="v1"></div></div>',
 init(){C6.label($('#v1'),{fig:VOL,slots:[['1','الفوهة'],['2','اللابة'],['3','قناة الصهارة (المدخنة)'],['4','غرفة الصهارة'],['5','سحابة الرماد والغازات'],['6','القنابل البركانية']],done:'أحسنت! عرفت أجزاء البركان الرئيسة.'},'lab1',()=>G.complete('lab1'));const ck=$('#v1 .c6-key');if(ck)ck.style.gridTemplateColumns='minmax(0,1fr) minmax(0,1fr)';},
 explain:'<p>رسم مبسط مقترح (ليس رسم الكتاب) لأجزاء البركان الواردة في الدرس.</p>'});

/* ---------- 2) مختبر السليكا ---------- */
def('lab2',{after:'s3',n:'🧪 مختبر السليكا',eyebrow:'تجربة افتراضية · مقترحة',title:'مختبر السليكا والغازات: هادئ أم عنيف؟',goal:'غيّر نسبة السليكا وكمية الغازات وبخار الماء، ثم اضغط «ثوران». لاحظ لزوجة اللابة وشدة الثوران.',plan:7,core:1,
 icon:'<path d="M20 70L36 30h8l16 40z" fill="currentColor"/><circle cx="30" cy="16" r="5" fill="currentColor"/><circle cx="50" cy="12" r="4" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l2svg" viewBox="0 0 640 320" aria-label="بركان"></svg><div style="padding:10px"><label class="step-text">نسبة السليكا: <b id="l2sv">50</b>%<input type="range" id="l2s" min="45" max="75" value="50" style="width:100%"></label><label class="step-text">الغازات وبخار الماء: <b id="l2gv">قليلة</b><input type="range" id="l2g" min="0" max="2" value="0" style="width:100%"></label><button class="btn" type="button" id="l2go">🌋 ثوران</button></div></div>
  <div class="side"><div class="card"><h3>اختبار اللزوجة</h3><svg id="l2v" viewBox="0 0 260 150" style="direction:ltr"></svg><p class="hint-line">قطرة من اللابة على سطح مائل.</p></div><div class="card"><div id="l2o" class="step-text"></div></div></div></div>
  <div class="card"><div id="l2q"></div></div>`,
 init(){let tm=null,t=0;const tried=new Set();
  const S=()=>+$('#l2s').value,Gs=()=>+$('#l2g').value;const visc=()=>(S()-45)/30;const pow=()=>Math.min(1,visc()*.7+Gs()*.2);
  const draw=()=>{const v=visc(),p=pow(),run=t>0;let s=`<rect width="640" height="320" fill="#e0f2fe"/><path d="M80 300 L280 120 h80 L560 300z" fill="#57534e"/><rect y="300" width="640" height="20" fill="#a16207"/>`;
   if(run){if(p>.55){const r=t*6;for(let i=0;i<22;i++){const a=-Math.PI/2+(i-11)*.12,d=r*(0.6+((i*37)%10)/14);s+=`<circle cx="${320+Math.cos(a)*d}" cy="${120+Math.sin(a)*d+t*t*.05}" r="${4+i%4}" fill="${i%3?'#292524':'#f97316'}"/>`;}s+=`<path d="M300 120 q-${30+t*3} -${60+t*5} 20 -${90+t*6} q${40+t*2} -${10+t} ${30} ${80+t*4}z" fill="#78716c" opacity=".8"/>`;}
    else{const L=Math.min(200,t*4*(1.2-v));s+=`<path d="M300 120 h40 Q${360+L*.6} ${200} ${360+L} 300 L${280-L} 300 Q${280-L*.6} 200 300 120z" fill="#f97316" opacity=".9"/>`;}}
   $('#l2svg').innerHTML=s;
   const dx=(1-v)*190*Math.min(1,t/30);$('#l2v').innerHTML=`<path d="M10 40 L250 120" stroke="#475569" stroke-width="5"/><circle cx="${30+dx}" cy="${42+dx*.33}" r="${12+v*6}" fill="#f97316"/>`;
   $('#l2sv').textContent=S();$('#l2gv').textContent=['قليلة','متوسطة','كثيرة'][Gs()];};
  $('#l2go').onclick=()=>{t=0;clearInterval(tm);const p=pow();tried.add(p>.55?'v':'q');p>.55?SFX.thud&&SFX.thud():SFX.pop();
   tm=setInterval(()=>{t++;draw();if(t>40)clearInterval(tm);},50);
   $('#l2o').innerHTML=p>.55?`<b style="color:#b91c1c">ثوران عنيف (متفجر)!</b> اللابة لزجة (سليكا ${S()}%) تقاوم التدفق وتحبس الغازات فيتراكم الضغط حتى الانفجار، فتُقذف المقذوفات والرماد.`:`<b style="color:#c2410c">ثوران هادئ:</b> اللابة قليلة اللزوجة (سليكا ${S()}%) تتدفق بسهولة كالنهر، وتتسرب الغازات منها بهدوء.`;
   if(tried.size===2)G.add(5,'lab2');};
  ['l2s','l2g'].forEach(i=>$('#'+i).oninput=()=>{t=0;draw();});STN.lab2.stop=()=>clearInterval(tm);draw();
  mcq($('#l2q'),{q:'ماذا تستنتج؟',o:['كلما زادت السليكا والغازات زادت لزوجة اللابة وشدة الثوران','السليكا تقلل اللزوجة','الغازات لا تؤثر في الثوران','كل البراكين تثور بالطريقة نفسها'],a:0},'lab2',()=>G.complete('lab2'));},
 leave(){STN.lab2.stop&&STN.lab2.stop();},explain:'<p>محاكاة مقترحة؛ نسب السليكا وحد الانفجار تقريبية للتوضيح.</p>'});

/* ---------- 3) باني البراكين ---------- */
const BT=[{n:'درعي',f:(x,k)=>Math.max(0,1-Math.abs(x)/1)*0.28*k,sl:'قليل الانحدار وواسع',ly:'طبقات لابة بازلتية منبسطة'},{n:'مخروطي',f:(x,k)=>Math.max(0,1-Math.abs(x)/.25)*0.38*k,sl:'شديد الانحدار وصغير',ly:'رماد وفتات بركاني'},{n:'مركب',f:(x,k)=>Math.max(0,1-Math.abs(x)/.6)*0.85*k,sl:'شديد الانحدار وكبير',ly:'طبقات متعاقبة: رماد ثم لابة'}];
def('lab3',{after:'s4',n:'🧪 باني البراكين',eyebrow:'تجربة افتراضية · مقترحة',title:'باني البراكين: ثورانًا بعد ثوران',goal:'اختر نوع البركان، ثم اضغط «ثوران» عدة مرات، وراقب كيف تتراكم الطبقات ويتشكل الشكل والانحدار.',plan:6,core:1,
 icon:'<path d="M4 64Q40 40 76 64z" fill="currentColor"/><path d="M28 64L40 30 52 64z" fill="currentColor" opacity=".5"/>',
 body:`<div class="two"><div class="stage"><svg id="b3svg" viewBox="0 0 640 300" aria-label="مقطع بركان"></svg><div class="row-actions" style="padding:10px"><div class="c6-chips" id="b3t"></div><button class="btn" type="button" id="b3go">🌋 ثوران</button><button class="tbtn" type="button" id="b3r">إعادة</button></div></div>
  <div class="side"><div class="card"><h3>البطاقة</h3><div id="b3o" class="step-text"></div></div></div></div>`,
 init(){let ty=0,k=0;const built=new Set();
  const draw=()=>{const T=BT[ty];let s=`<rect width="640" height="300" fill="#e0f2fe"/><rect y="270" width="640" height="30" fill="#a16207"/>`;
   for(let L=k;L>=1;L--){let d='M20 270';for(let X=0;X<=600;X+=6){const x=(X-300)/300;d+=` L${20+X} ${270-T.f(x,L/6)*250}`;}const ash=ty===1||(ty===2&&L%2===1);s+=`<path d="${d} L620 270z" fill="${ash?(L%2?'#78716c':'#a8a29e'):(L%2?'#7c2d12':'#9a3412')}"/>`;}
   if(k)s+=`<path d="M320 ${270-T.f(0,k/6)*250} V270" stroke="#f97316" stroke-width="5"/>`;$('#b3svg').innerHTML=s;
   $('#b3o').innerHTML=`<b>البركان ال${T.n}</b><br>المواد: ${T.ly}.<br>الشكل: ${T.sl}.<br>عدد الثورانات: ${k}`;};
  $('#b3t').innerHTML=BT.map((b,i)=>`<button class="c6-chip" type="button" data-i="${i}" aria-pressed="${i===0}">${b.n}</button>`).join('');
  $$('#b3t [data-i]').forEach(b=>b.onclick=()=>{ty=+b.dataset.i;k=0;$$('#b3t [data-i]').forEach(x=>x.setAttribute('aria-pressed',x===b));draw();});
  $('#b3go').onclick=()=>{if(k<6){k++;SFX.pop();draw();if(k===6){built.add(ty);G.add(3,'lab3');if(built.size===3)G.complete('lab3');}}};$('#b3r').onclick=()=>{k=0;draw();};draw();},
 explain:'<p>نموذج مقترح مبسط: الدرعي واسع قليل الانحدار، والمخروطي صغير شديد الانحدار، والمركب كبير بطبقات متعاقبة.</p>'});
})();

/*@css c2.css*/
/*@include lab5.js*/
/*@include kit.js*/
/*@include skit.js*/
/* ===== الفصل الثاني · الدرس الثاني: البراكين — «فوهة النار» ===== */
(function(){
const {$,$$,G,STN,def,mcq,flips,match,sortGame,challenge,say,SFX,pic,slides,escape,bingo,tfRound,choiceBoard,solutions}=K;
const {fig,grid,reveal,ICO,lst,order,fill,tfx,label}=C6;const P=(n,c)=>[n,c];
const VIC='<path d="M8 70L32 26h16l24 44z" fill="none" stroke="currentColor" stroke-width="5"/><path d="M36 26c0-10 8-14 4-22M44 26c2-8 10-10 8-18" fill="none" stroke="currentColor" stroke-width="4"/>';

def('intro',{n:'الافتتاحية',plan:3,icon:VIC,
 body:`<div class="hero"><div class="hero-photo">${pic('s01_6c612d53','ثوران بركاني')}<span class="cap">الفصل الثاني: تغيرات الأرض.</span></div>
  <div><span class="eyebrow">فوهة النار</span><h2 class="hero-h">لماذا يثور بركان بهدوء… ويثور آخر بعنف؟</h2>
   <p class="riddle">في حرة رهط بالمملكة تدفقت اللابة كأنهار هادئة، وفي براكين أخرى انفجرت الصخور والرماد آلاف الأمتار في الهواء. ما سر هذا الاختلاف؟</p>
   <p class="q">ما توقعك قبل أن تبدأ؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div>`,init(){}});

const GOALS=['تشرح كيف تؤثر البراكين في الناس.','تصف كيف تنتج البراكين مواد مختلفة.','تقارن بين كيفية تكون الأشكال الثلاثة من البراكين.'];
const TERMS=[{t:'الصهارة',d:'صخور مصهورة في باطن الأرض. (مراجعة المفردات)'},{t:'البركان',d:'تلال أو جبال مخروطية (قمعية) الشكل تكونت بفعل ثورانات الصهارة.'},{t:'اللابة',d:'الصهارة عندما تتدفق على سطح الأرض من فوهة البركان.'},{t:'البركان الدرعي',d:'بركان واسع الامتداد، قليل الانحدار، يتكون من تراكم طبقات اللابة البازلتية.'},{t:'البركان المخروطي',d:'مخروط صغير من المواد البركانية يتكون عندما يقذف البركان الرماد واللابة إلى ارتفاعات كبيرة ثم تبرد وتعود إلى الأرض.'},{t:'البركان المركب',d:'بركان شديد الانحدار يتشكل نتيجة تراكم طبقات متعاقبة من الانفجارات العنيفة والثورانات الهادئة.'}];
def('goals',{n:'الأهداف والمفردات',eyebrow:'الكتاب صفحة 61',title:'الأهداف والمفردات',goal:'تعرّف أهداف الدرس وأهميته ومفرداته.',plan:4,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><div class="story mt"><b>أهمية الدرس:</b> قد تعرّض الثورانات البركانية الإنسان والمخلوقات الحية لمخاطر كبيرة.</div></div>
  <div class="card"><h3>مراجعة المفردات</h3><p class="step-text"><b>الصهارة:</b> صخور مصهورة في باطن الأرض.</p><h3 class="mt">المفردات الجديدة</h3><ul class="tasks plain"><li>البركان</li><li>اللابة</li><li>البركان الدرعي</li><li>البركان المخروطي</li><li>البركان المركب</li></ul></div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المفردات</h2></div><div id="g5f"></div></div><div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2></div><div id="g5m"></div></div>`,
 init(){flips($('#g5f'),TERMS);this.reset();},reset(){match($('#g5m'),TERMS.slice(1).map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));}});

def('s1',{n:'1 · كيف تتشكل البراكين؟',eyebrow:'المحطة 1 · الكتاب صفحة 61',title:'كيف تتشكل البراكين؟',goal:'تأمل ما يحدث في الشكل: تتحرك الصخور المنصهرة وتصعد إلى سطح الأرض.',plan:7,core:1,icon:VIC,
 body:`<div class="card" id="s1sl"></div><div class="card"><h3>نظرة عامة: أجزاء البركان</h3><div class="two">${fig('s08_744be083','حاول أن تتعرف على بعض هذه الأجزاء',360)}<div><p class="step-text">حاول أن تتعرف على بعض أجزاء البركان في الشكل، ثم جرّب «مختبر تشريح البركان» التالي.</p></div></div></div>`,
 init(){slides($('#s1sl'),[
  {k:'كيف تتشكل البراكين؟',t:'البركان Volcano',im:[P('s05_67786d02','تشكل البركان')],html:'<p>تتحرك الصخور المنصهرة بفعل الصخور ذات الكثافة العالية وتجبرها على الصعود إلى سطح الأرض، وتؤدي الصهارة الصاعدة إلى حدوث ثوران بركاني، لا يلبث أن يأخذ في التصلب، بينما تستمر الغازات في الخروج منه، ويتشكل في النهاية جبل قمعي الشكل يسمى <b>البركان</b>.</p>'},
  {k:'البركان',t:'التعريف والفوهة واللابة',im:[P('s06_37f49141','لابة'),P('s06_fb1974ba','ثوران'),P('s06_1b6c037b','بركان')],html:'<p class="def"><b>البركان:</b> تلال أو جبال مخروطية (قمعية) الشكل تكونت بفعل ثورانات الصهارة.</p><p>تحتوي البراكين على فتحات دائرية عند قممها تسمى <b>فوهة البركان</b>.</p><p>عندما تتدفق الصهارة على سطح الأرض من فوهة البركان فإنها تسمى <b>اللابة</b>.</p>'},
  {k:'المقذوفات الصلبة',t:'الفتات البركاني',im:[P('s07_3f05d929','سحب الرماد'),P('s07_38b0436f','قنابل بركانية')],html:'<p>تُلقي بعض الثورانات المتفجرة اللابة والصخور في الهواء آلاف الأمتار، وتسمى هذه القطع الصخرية أو اللابة المتصلبة المتساقطة من الهواء <b>المقذوفات</b> (الفتات البركاني).</p><p>يتراوح حجم المقذوفات الصلبة بين غبار ورماد بركاني، وصخور كبيرة تسمى <b>قنابل بركانية</b>.</p>'}],'s1',()=>G.complete('s1'));}});

def('s2',{n:'2 · أخطار البراكين',eyebrow:'المحطة 2 · الكتاب صفحة 62',title:'أخطار البراكين',goal:'كيف تؤثر البراكين في الناس؟',plan:5,core:1,icon:'<path d="M40 8L74 68H6z" fill="none" stroke="currentColor" stroke-width="5"/><path d="M40 28v20M40 56v4" stroke="currentColor" stroke-width="6"/>',
 body:`<div class="card"><div class="c6-grid">${[['s09_843990f0','تدمير المدن والقرى','بسبب الانهيارات والتدفقات الطينية الملتهبة.'],['s09_51d38df2','إغلاق المطارات والموانئ','قد يؤثر الغبار والمقذوفات البركانية على الحركة.'],['s09_dd38bb0e','تدفقات الفتات البركاني','وهي انهيارات سريعة لصخور حارة متوهجة مصحوبة بغازات حارة.']].map(([n,t,d])=>`<div class="card" style="padding:8px">${pic(n,t)}<h3 class="mt">${t}</h3><p class="step-text">${d}</p></div>`).join('')}</div><p class="step-text mt">ويُشكّل الرماد البركاني تدفقًا طينيًّا إذا امتزج بالأمطار.</p></div>
  <div class="card"><h3>طابق الخطر بسببه</h3><div id="s2m"></div></div>`,
 init(){match($('#s2m'),[['تدمير المدن والقرى','الانهيارات والتدفقات الطينية الملتهبة'],['إغلاق المطارات والموانئ','الغبار والمقذوفات البركانية'],['تدفقات الفتات البركاني','انهيارات سريعة لصخور حارة متوهجة مع غازات حارة'],['التدفق الطيني','امتزاج الرماد البركاني بالأمطار']],'s2',()=>G.complete('s2'));}});

def('s3',{n:'3 · أشكال البراكين',eyebrow:'المحطة 3 · الكتاب صفحة 62–63',title:'أشكال البراكين: ثوران عنيف أم هادئ؟',goal:'تصنف البراكين حسب اختلاف أنواع الثوران. فما الذي يحدد ذلك؟',plan:7,core:1,icon:VIC,
 body:`<div class="card" id="s3sl"></div><div class="two"><div class="card"><h3>تقويم 1 · ناقش طريقة ثوران البركانين من خلال الصورتين</h3>${fig('s11_0f9ce9aa','(أ) كمية سليكا عالية · (ب) كمية سليكا قليلة',360)}<div id="s3q"></div></div><div class="card"><h3>صنّف</h3><div id="s3s"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s3');};
  slides($('#s3sl'),[
   {k:'أشكال البراكين',t:'فما الذي يحدد ذلك؟',im:[P('s10_73ee13c0','ثوران عنيف وهادئ')],html:'<p>تُصنف البراكين حسب اختلاف أنواع الثوران: <b>ثوران عنيف</b> و<b>ثوران هادئ</b>. فما الذي يحدد ذلك؟</p><p>تعتمد شدة الثوران على <b>تركيب الصهارة</b>: نسبة السليكا، وكمية بخار الماء والغازات فيها.</p>'},
   {k:'ثوران عنيف',t:'سليكا عالية',im:[P('s11_b892c2e9','ثوران عنيف')],html:'<p>عندما تحتوي اللابة على <b>نسبة عالية من السليكا</b> تكون ذات لزوجة أكبر، ومن ثم تقاوم التدفق أكثر، مما يؤدي إلى ثوران البركان بعنف.</p><p class="hint-line">تصحيح: ورد في العرض «كثافة (لزوجة)»، والمقصود هنا اللزوجة (مقاومة السائل للتدفق) وليس الكثافة.</p>'},
   {k:'ثوران هادئ',t:'سليكا قليلة',im:[P('s12_a327f815','لابة متدفقة')],html:'<p>تتدفق اللابة المحتوية على <b>نسبة قليلة من السليكا</b> ونسبة عالية من <b>الحديد والماغنسيوم</b> بسهولة؛ فتكون ذات لزوجة أقل، مما يؤدي إلى ثوران البركان بهدوء.</p>'}],'s3');
  mcq($('#s3q'),{q:'أي البركانين ثورانه أعنف؟',o:['(أ) لأن كمية السليكا عالية فاللابة أكثر لزوجة','(ب) لأن كمية السليكا قليلة','كلاهما بالشدة نفسها','لا علاقة للسليكا بالثوران'],a:0},'s3',c);
  sortGame($('#s3s'),{bins:['ثوران عنيف','ثوران هادئ'],items:[['سليكا عالية',0],['لابة لزجة تقاوم التدفق',0],['كمية كبيرة من بخار الماء والغازات المحتبسة',0],['سليكا قليلة',1],['غنية بالحديد والماغنسيوم',1],['لابة سائلة سهلة التدفق',1]]},'s3',c);}});

const VT=[{n:'البراكين الدرعية',im:'s15_c4c95aee',sk:'s15_05518c19',d:'تتدفق اللابة البازلتية الغنية بالحديد والماغنسيوم، التي تحوي نسبة قليلة من السليكا، في صورة طبقات أفقية منبسطة. ويؤدي تراكم هذه الطبقات إلى تكوّن بركان واسع الامتداد، له جوانب قليلة الانحدار.',ex:'بركان جبل مار في حرة رهط في المملكة العربية السعودية.'},
 {n:'البراكين المخروطية',im:'s16_8666457c',sk:'s16_4c4c6431',d:'يقذف البركان الرماد البركاني واللابة لتصل إلى ارتفاعات كبيرة في الهواء، ثم تبرد وتعود إلى الأرض مكونة مخروطًا صغيرًا من المواد البركانية. توجد على ارتفاعات أقل من 300 م، وتتشكل عادة على هيئة مجموعات بجانب براكين كبيرة، ولا يدوم ثورانها فترة طويلة؛ لأن الثوران يحدث بسبب المحتوى الغازي العالي، إذ يتوقف بعد تحرر الغازات.',ex:'بركان حرة البرك من الحرات البركانية الكبيرة جنوب المملكة العربية السعودية.'},
 {n:'البراكين المركبة',im:'s17_8a4c5384',sk:'s17_4c4c6431',d:'براكين شديدة الانحدار، تتشكل نتيجة تراكم الطبقات المتعاقبة الناتجة عن الانفجارات البركانية العنيفة، ويتبع ذلك ثوران هادئ للبركان مشكلًا طبقة اللابة.',ex:'بركان جبل القدر شمال شرق المدينة المنورة.'},
 {n:'ثوران الشقوق',im:'s18_7a796a32',sk:'s14_21773049',d:'نوع من البراكين تتميز اللابة فيه بأنها ذات سيولة عالية ولزوجة قليلة، مما يجعل انسيابها سهلًا فوق سطح الأرض.',ex:'حرة رهط.'}];
def('s4',{n:'4 · أنواع البراكين',eyebrow:'المحطة 4 · الكتاب صفحة 63–64',title:'أنواع البراكين',goal:'البراكين الدرعية والمخروطية والمركبة، وهناك نوع رابع يسمى ثوران الشقوق.',plan:8,core:1,icon:VIC,
 body:`<div class="card"><div class="c6-chips" id="s4c"></div><div id="s4v" class="mt" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px"></div></div><div class="card"><h3>طابق النوع بالمثال من المملكة</h3><div id="s4m"></div></div>`,
 init(){const seen=new Set();const show=i=>{const v=VT[i];$$('#s4c [data-i]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.i===i));
   $('#s4v').innerHTML=`<div>${grid([[v.sk,'مقطع'],[v.im,v.ex.split(' في ')[0]]])}</div><div><h3>${i+1}. ${v.n}</h3><p class="step-text">${v.d}</p><p class="step-text"><b>مثال:</b> ${v.ex}</p></div>`;seen.add(i);SFX.pop();if(seen.size===4)G.add(0,'s4');};
  $('#s4c').innerHTML=VT.map((v,i)=>`<button type="button" class="c6-chip" data-i="${i}">${i+1}. ${v.n}</button>`).join('');$$('#s4c [data-i]').forEach(b=>b.onclick=()=>show(+b.dataset.i));show(0);
  match($('#s4m'),[['البراكين الدرعية','جبل مار في حرة رهط'],['البراكين المخروطية','حرة البرك جنوب المملكة'],['البراكين المركبة','جبل القدر شمال شرق المدينة المنورة'],['ثوران الشقوق','حرة رهط (تدفق لابة واسع)']],'s4',()=>G.complete('s4'));}});

def('ev1',{n:'تقويم 2–6',eyebrow:'تقويم · الأسئلة 2–6',title:'تقويم: المقذوفات وأنواع البراكين',goal:'أسئلة التقويم كما في العرض.',plan:6,core:1,icon:ICO.check,
 body:'<div class="card" id="ev1b"></div><div class="card"><h3>6 · صحّح العبارات التالية</h3><div id="ev1c"></div></div>',
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('ev1');};
  STN.ev1.c=challenge($('#ev1b'),[
   {k:'2',q:'القطع الصخرية أو اللابة المتصلبة المتساقطة من الهواء بعد قذفها بالثورانات المتفجرة:',o:['المقذوفات البركانية','اللابة','الفتات البركاني','الصهارة'],a:0,why:'وتسمى أيضًا الفتات البركاني.'},
   {k:'3',q:'تُعد أكبر أنواع البراكين من حيث المساحة التي تغطيها:',o:['الدرعية','المخروطية','المركبة','ثوران الشقوق'],a:0,why:'مثل بركان جبل مار في حرة رهط؛ أمّا ثوران الشقوق فليس بركانًا مخروطيًّا بل تدفقات لابة واسعة.'},
   {k:'4',q:'بركان يتكون بفعل الثوران الهادئ، حيث تتراكم طبقات من اللابة بعضها فوق بعض:',o:['الدرعية','المخروطية','ثوران الشقوق','المركبة'],a:0},
   {k:'5',q:'براكين واسعة الامتداد وارتفاعها قليل، وجوانبها تتكون من اللابة:',o:['ثوران الشقوق','المخروطية','الدرعية','المركبة'],a:2}],'ev1');
  setTimeout(c,0);
  tfx($('#ev1c'),[['تكون اللابة ذات <u>لزوجة عالية</u> إذا احتوت على نسبة قليلة من السليكا.',false,'لزوجة قليلة',['لزوجة قليلة','كثافة عالية','حرارة منخفضة']],['تعتمد شدة ثوران البركان على <u>طقس المنطقة</u>.',false,'تركيب الصهارة',['تركيب الصهارة','عمر البركان','لون الصخور']],['عند تدفق الصهارة على سطح الأرض من فوهة أو فتحة تسمى <u>الرماد البركاني</u>.',false,'اللابة',['اللابة','الفوهة','القنبلة البركانية']]],'ev1',c);},reset(){STN.ev1.c.reset();},
 explain:'<p>في السؤال 3 لم تظهر إجابة العرض نصًّا، واعتمدنا «الدرعية» لأن الشريحة أرفقت صورة بركان جبل مار (درعي)، وهي أكبر البراكين امتدادًا.</p>'});

def('s5',{n:'5 · تطبيق الرياضيات',eyebrow:'تدريب · الكتاب صفحة 65',title:'تطبيق الرياضيات: حل معادلة بسيطة',goal:'يرتفع بركان حرة ثنان 1650 م عن سطح البحر، ويرتفع بركان حرة البرك 381 م. كم مرة يساوي ارتفاع بركان حرة ثنان ارتفاع بركان حرة البرك؟',plan:3,core:1,icon:'<path d="M14 40h20M24 30v20M46 34h20M46 46h20" stroke="currentColor" stroke-width="6"/>',
 body:`<div class="two"><div class="card"><svg viewBox="0 0 400 240" style="direction:ltr"><path d="M20 230 L140 30 L260 230z" fill="#7c4a1e"/><path d="M140 30 V230" stroke="#111" stroke-dasharray="5 5"/><text x="150" y="130" font-size="16" font-weight="800" fill="#1d4ed8">1650 م</text><path d="M260 230 L320 160 L380 230z" fill="#b45309"/><path d="M320 160 V230" stroke="#111" stroke-dasharray="5 5"/><text x="326" y="200" font-size="14" font-weight="800" fill="#1d4ed8">381 م</text><text x="140" y="20" text-anchor="middle" ${'font-family="IBM Plex Sans Arabic"'} font-size="13">حرة ثنان</text><text x="320" y="150" text-anchor="middle" ${'font-family="IBM Plex Sans Arabic"'} font-size="13">حرة البرك</text></svg></div><div class="card"><div id="s5c"></div></div></div>`,
 init(){K.calcQ($('#s5c'),{p:'كم مرة يساوي ارتفاع بركان حرة ثنان ارتفاع بركان حرة البرك؟ (قرّب إلى منزلة عشرية واحدة)',v:4.3,unit:'مرة',given:'ارتفاع حرة ثنان = 1650 م ، ارتفاع حرة البرك = 381 م',law:'عدد المرات = 1650 ÷ 381',sol:'1650 ÷ 381 ≈ 4.3 مرة'},'s5',()=>G.complete('s5'));}});

def('sum',{n:'الخلاصة',eyebrow:'الخلاصة · الكتاب صفحة 65',title:'الخلاصة',goal:'أهم أفكار الدرس.',plan:2,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>كيف تتشكل البراكين؟</h3>${lst(['تتكوّن بعض البراكين نتيجة خروج الصهارة من باطن الأرض إلى السطح.','تتنوع المواد البركانية الناتجة عن ثوران البراكين بين مواد سائلة وصلبة وغازية.'])}</div><div class="card"><h3>أشكال البراكين</h3>${lst(['تؤدي اللابة الغنية بالسليكا إلى تكوّن ثورانات متفجرة، بينما تؤدي اللابة التي تحتوي على نسبة قليلة من السليكا ونسبة عالية من الحديد والماغنسيوم إلى ثوران سائل.','تؤثر كمية بخار الماء والغازات في طريقة ثوران البركان.','تتضمن أنواع البراكين: البراكين الدرعية، والبراكين المخروطية، والبراكين المركبة، وثوران الشقوق.'])}</div></div>`,enter(){G.complete('sum');}});
def('self',{n:'اختبر نفسك',eyebrow:'الواجب · الكتاب صفحة 65 · التسليم يوم الخميس',title:'اختبر نفسك',goal:'إجابات نموذجية مقترحة.',plan:3,icon:ICO.check,body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'1 · حدّد',q:'أي أنواع ثورانات اللابة تغطي أكبر مساحة من سطح الأرض؟',a:[['الإجابة','ثوران الشقوق؛ لأن لابته سائلة قليلة اللزوجة تنساب لمسافات بعيدة مكونة هضابًا بازلتية واسعة.']]},
  {k:'2 · صف',q:'المخاطر الناتجة عن البراكين.',a:[['الإجابة','تدمير المدن والقرى بالانهيارات والتدفقات الطينية الملتهبة، وإغلاق المطارات والموانئ بالغبار والمقذوفات، وتدفقات الفتات البركاني الحارة.']]},
  {k:'3 · اشرح',q:'لماذا تكون جوانب البركان المخروطي حادة؟',a:[['الإجابة','لأنه يتكون من رماد وفتات صلب يُقذف إلى أعلى ثم يتساقط ويتراكم حول الفوهة مباشرة في مساحة صغيرة.']]},
  {k:'4 · اذكر',q:'أنواع المواد التي تتكوّن منها البراكين المركبة.',a:[['الإجابة','طبقات متعاقبة من الرماد والفتات البركاني الناتج عن الانفجارات العنيفة، وطبقات من اللابة الناتجة عن الثورانات الهادئة.']]},
  {k:'5 · التفكير الناقد',q:'لماذا تنفجر الصهارة الغنية بالسليكا؟',a:[['الإجابة','لأن السليكا تزيد لزوجتها فتقاوم التدفق وتحبس بخار الماء والغازات، فيتراكم الضغط حتى ينفجر البركان بعنف.']]}],'self',()=>G.complete('self'));},reset(){STN.self.s.reset();},explain:'<p>إجابات نموذجية مقترحة.</p>'});

def('x1',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'فوهة الأسرار وبنغو البراكين',goal:'افتحوا الأقفال ثم البنغو.',plan:5,icon:ICO.lock,
 body:'<div class="card"><div id="x1e"></div></div><div class="card"><div class="nb-head"><h2>🎯 بنغو البراكين</h2></div><div id="x1b"></div></div>',
 init(){STN.x1.e=escape($('#x1e'),{title:'فوهة الأسرار',story:'اقفلت الصهارة طريق الخروج من فوهة البركان! أجيبوا لفتح الأقفال الأربعة.',secs:300,locks:[{q:'الصهارة على سطح الأرض تسمى:',o:['اللابة','الرماد','القنبلة','الفوهة'],a:0,code:'1'},{q:'السليكا العالية تسبب ثورانًا:',o:['عنيفًا','هادئًا','لا ثوران','بطيئًا جدًّا'],a:0,code:'6'},{q:'بركان جبل القدر:',o:['مركب','درعي','مخروطي','شقوق'],a:0,code:'5'},{q:'البراكين المخروطية على ارتفاعات أقل من:',o:['300 م','3000 م','30 م','1000 م'],a:0,code:'0'}],outro:'هربتم من الفوهة بسلام!'},'x1');
  bingo($('#x1b'),[['البركان','جبل قمعي تكوّن بثورانات الصهارة'],['اللابة','صهارة على سطح الأرض'],['الصهارة','صخور مصهورة في باطن الأرض'],['الفوهة','فتحة دائرية في قمة البركان'],['القنابل البركانية','صخور كبيرة مقذوفة'],['الرماد البركاني','يشكل تدفقًا طينيًّا مع الأمطار'],['البركان الدرعي','واسع قليل الانحدار'],['البركان المخروطي','مخروط صغير من المواد البركانية'],['البركان المركب','شديد الانحدار بطبقات متعاقبة'],['ثوران الشقوق','لابة سائلة قليلة اللزوجة'],['السليكا','تزيد لزوجة اللابة'],['جبل مار','بركان درعي في حرة رهط'],['جبل القدر','بركان مركب شمال شرق المدينة'],['حرة البرك','براكين مخروطية جنوب المملكة'],['تدفقات الفتات','صخور حارة متوهجة وغازات'],['الحديد والماغنسيوم','لابة هادئة الثوران']],'x1');},reset(){STN.x1.e.reset();}});
def('x2',{n:'إثرائي · جولة البرق',eyebrow:'إثرائي',title:'جولة البرق ولوحة الخيارات',goal:'صح أم خطأ بسرعة، ثم لوحة الخيارات.',plan:4,icon:'<path d="M44 6L18 46h18l-6 28 28-42H40z" fill="currentColor"/>',
 body:'<div class="card"><div id="x2t"></div></div><div class="card"><div id="x2cb"></div></div>',
 init(){tfRound($('#x2t'),[['اللابة الغنية بالسليكا لزجة.',true],['البراكين الدرعية شديدة الانحدار.',false,'قليلة الانحدار.'],['ثوران البراكين المخروطية يدوم طويلًا.',false,'لا يدوم طويلًا.'],['يمكن أن يغلق الرماد البركاني المطارات.',true],['جبل القدر بركان مركب.',true],['اللابة هي الصهارة في باطن الأرض.',false,'اللابة على السطح، والصهارة في الباطن.']],'x2',{secs:10});
  STN.x2.cb=choiceBoard($('#x2cb'),[{ic:'🎨',t:'ارسم',kind:'رسم',p:'ارسم مقطعًا للأنواع الثلاثة من البراكين وقارن انحدارها.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'سبب الثوران العنيف:',o:['سليكا عالية','حديد عالٍ','سليكا قليلة','ماء قليل'],a:0},{ic:'🔬',t:'جرّب',kind:'تجربة',p:'قارن سرعة انسياب العسل والماء على لوح مائل، واربطها باللزوجة.'},
   {ic:'❓',t:'سؤال',kind:'اختيار',q:'بركان حرة البرك:',o:['مخروطي','درعي','مركب','شقوق'],a:0},{ic:'🧮',t:'احسب',kind:'حساب',p:'بركان ارتفاعه 900 م وآخر 300 م. كم مرة ارتفاع الأول؟',v:3,unit:'مرة',law:'900 ÷ 300',sol:'3 مرات'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'الرماد البركاني مع الأمطار يشكل:',o:['تدفقًا طينيًّا','لابة','صهارة','قنابل'],a:0},
   {ic:'🗺',t:'خريطة',kind:'بحث',p:'حدّد على خريطة المملكة مواقع: حرة رهط، جبل القدر، حرة البرك.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'أكبر البراكين امتدادًا:',o:['الدرعية','المخروطية','المركبة','لا شيء'],a:0},{ic:'✍️',t:'اكتب',kind:'كتابة',p:'اكتب فقرة عن كيف تؤثر البراكين في الناس.'}],'x2',()=>G.complete('x2'));},reset(){STN.x2.cb.reset();}});

def('ch',{n:'تحدي العلماء',plan:3,icon:ICO.cup,eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من تقويم العرض.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'المقذوفات',q:'القطع الصخرية أو اللابة المتصلبة المتساقطة من الهواء:',o:['المقذوفات البركانية','اللابة','الفتات البركاني','الصهارة'],a:0},
  {k:'الدرعية',q:'براكين واسعة الامتداد وارتفاعها قليل، وجوانبها من اللابة:',o:['ثوران الشقوق','المخروطية','الدرعية','المركبة'],a:2},
  {k:'السليكا',q:'تكون اللابة ذات لزوجة قليلة إذا احتوت على نسبة ……… من السليكا:',o:['قليلة','عالية','متوسطة','لا تحتوي'],a:0},
  {k:'شدة الثوران',q:'تعتمد شدة ثوران البركان على:',o:['تركيب الصهارة','طقس المنطقة','لون الصخور','موقع البركان من البحر'],a:0},
  {k:'المركب',q:'بركان شديد الانحدار من طبقات متعاقبة:',o:['المركب','الدرعي','المخروطي','الشقوق'],a:0},
  {k:'الأخطار',t:'multi',q:'اختر أخطار البراكين:',items:[['تدمير المدن والقرى',1],['إغلاق المطارات والموانئ',1],['تدفقات الفتات البركاني',1],['زيادة الأمطار دائمًا',0]]},
  {k:'الرياضيات',t:'calc',p:'1650 ÷ 381 ≈ ؟ (منزلة عشرية واحدة)',v:4.3,unit:'مرة',law:'القسمة',sol:'≈ 4.3'}],'ch');},reset(){STN.ch.c.reset();}});

C6.plan({intro:{s:['poe','brain'],g:'١–٣',sk:'التنبؤ',ev:'سؤال التوقع'},goals:{s:['frayer'],g:'١–٣',sk:'التذكر',ev:'المطابقة'},s1:{s:['disc'],g:'٢',sk:'الملاحظة',ev:'الشرائح'},lab1:{s:['inq','game'],g:'٢',sk:'التعرف والتسمية',ev:'تشريح البركان'},s2:{s:['coop','cards'],g:'١',sk:'الربط',ev:'مطابقة الأخطار'},
 s3:{s:['poe','venn'],g:'٣',sk:'المقارنة',ev:'تقويم 1 والتصنيف'},lab2:{s:['poe','inq'],g:'٣',sk:'ضبط المتغيرات',ev:'مختبر السليكا'},s4:{s:['jigsaw','cmap'],g:'٣',sk:'المقارنة',ev:'مطابقة الأمثلة'},lab3:{s:['inq','game'],g:'٣',sk:'النمذجة',ev:'باني البراكين'},ev1:{s:['spot','cards'],g:'٢ و٣',sk:'التطبيق',ev:'تقويم 2–6'},s5:{s:['prob'],g:'٣',sk:'الحساب',ev:'تطبيق الرياضيات'},
 sum:{s:['tl'],g:'١–٣',sk:'التلخيص',ev:'إشارة المرور'},self:{s:['heads','sticks'],g:'١–٣',sk:'التفكير الناقد',ev:'اختبر نفسك'},x1:{s:['game','champ'],g:'١–٣',sk:'الاستدعاء',ev:'الأقفال والبنغو'},x2:{s:['cards','game'],g:'١–٣',sk:'الاستدعاء',ev:'جولة البرق'},ch:{s:['exit'],g:'١–٣',sk:'التقويم الختامي',ev:'تحدي العلماء'}},'g9c2l2');
K.boot({chapter:'الفصل الثاني: تغيرات الأرض',chapterShort:'الفصل الثاني',title:'فوهة النار',lesson:'الدرس الثاني: البراكين',accent:'#c2410c',accentDark:'#fb923c',hook:'لماذا يثور بركان بهدوء… ويثور آخر بعنف؟',
 riddle:'ما الذي يحدد طريقة ثوران البركان؟',predict:{o:['تركيب الصهارة: نسبة السليكا والغازات وبخار الماء','حجم البركان فقط','الطقس'],a:0},
 answer:'اللابة الغنية بالسليكا لزجة تحبس الغازات فتنفجر بعنف، واللابة القليلة السليكا الغنية بالحديد والماغنسيوم تتدفق بهدوء؛ وهذا يحدد أشكال البراكين: الدرعية والمخروطية والمركبة وثوران الشقوق.',
 finalTitle:'مبارك! عبرت فوهة النار بسلام',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 65 · التسليم يوم الخميس.',
 concepts:[{n:'البركان',t:'جبل قمعي تكوّن بفعل ثورانات الصهارة.',ic:'<path d="M4 42L18 14h12l14 28z" fill="var(--accent)"/>'},{n:'اللابة',t:'الصهارة المتدفقة على سطح الأرض.',ic:'<path d="M4 40c8-6 14 0 20-6s12 0 20-6" fill="none" stroke="var(--accent)" stroke-width="5"/>'},{n:'السليكا',t:'عالية = لزوجة وثوران عنيف، قليلة = ثوران هادئ.',ic:'<text x="24" y="32" text-anchor="middle" font-size="16" font-weight="800" fill="var(--accent)">SiO₂</text>'},{n:'الدرعية',t:'واسعة قليلة الانحدار (جبل مار).',ic:'<path d="M2 40Q24 20 46 40z" fill="var(--accent)"/>'},{n:'المخروطية',t:'صغيرة حادة الجوانب (حرة البرك).',ic:'<path d="M12 40L24 14 36 40z" fill="var(--accent)"/>'},{n:'المركبة',t:'شديدة الانحدار بطبقات متعاقبة (جبل القدر).',ic:'<path d="M6 40L24 8 42 40z" fill="none" stroke="var(--accent)" stroke-width="4"/><path d="M14 28h20M10 34h28" stroke="var(--accent)" stroke-width="3"/>'}]});
$$('.top h1').forEach(h=>h.dataset.sym='🌋');
})();

