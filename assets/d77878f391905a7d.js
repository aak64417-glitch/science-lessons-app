
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
      if(!box||box.querySelector('.qpbar'))continue;box.insertBefore(mk(),ref)}
    var R=document.querySelectorAll('.row-actions');for(var r=0;r<R.length;r++){var ra=R[r];if(ra.getAttribute('data-qp')||ra.querySelectorAll('button').length<2||!ra.parentElement||ra.parentElement.querySelector('.qpbar'))continue;ra.setAttribute('data-qp','1');ra.parentElement.insertBefore(mk(),ra)}}
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

/* ===== تجارب افتراضية — العلم والتقنية والمجتمع ===== */
(function(){
const {$,$$,G,STN,def,say,SFX,mcq}=K;const AR='font-family="IBM Plex Sans Arabic"';
const MED=[{n:'رسالة مع قافلة',ic:'🐪',t:'نحو 3 أشهر',sec:7776000,c:'#b45309'},{n:'رسالة بريدية بالطائرة',ic:'✉️',t:'نحو أسبوع',sec:604800,c:'#2563eb'},{n:'فاكس عبر الهاتف',ic:'📠',t:'نحو دقيقة',sec:60,c:'#7c3aed'},{n:'بريد إلكتروني عبر الإنترنت',ic:'🌐',t:'أقل من ثانية',sec:.3,c:'#0f766e'}];
def('lab1',{after:'s2',n:'🧪 سباق نشر الاكتشاف',eyebrow:'تجربة افتراضية · مقترحة',title:'سباق نشر الاكتشاف: كيف تنشر التقنية المعرفة؟',goal:'عالِم في الرياض اكتشف دواءً جديدًا ويريد إرسال بحثه إلى زميله في طوكيو. اختر وسيلة الإرسال وراقب الزمن.',plan:6,core:1,
 icon:'<circle cx="14" cy="40" r="8" fill="currentColor"/><circle cx="66" cy="40" r="8" fill="currentColor"/><path d="M22 40h36" stroke="currentColor" stroke-width="4" stroke-dasharray="6 5"/>',
 body:`<div class="two"><div class="stage"><svg id="r1svg" viewBox="0 0 640 240" aria-label="سباق الرسالة"></svg><div class="toolbar" id="r1b" style="grid-template-columns:repeat(4,minmax(0,1fr))"></div></div>
  <div class="side"><div class="card"><h3>سجل السباق</h3><div class="tablewrap"><table class="c6-table" id="r1t"></table></div><div id="r1fb"></div></div></div></div>
  <div class="card"><h3>استنتج</h3><div id="r1q"></div></div>`,
 init(){const done={};let tm=null;
  const draw=(m,f)=>{let s=`<rect width="640" height="240" fill="#e0f2fe"/><path d="M0 180 Q160 140 320 170 T640 160 V240 H0z" fill="#bbf7d0"/>
   <g transform="translate(70 150)"><rect x="-30" y="-40" width="60" height="40" fill="#fde68a" stroke="#92400e"/><text x="0" y="22" text-anchor="middle" ${AR} font-size="15" font-weight="800" fill="#0f172a">الرياض</text></g>
   <g transform="translate(570 150)"><rect x="-30" y="-40" width="60" height="40" fill="#fecaca" stroke="#991b1b"/><text x="0" y="22" text-anchor="middle" ${AR} font-size="15" font-weight="800" fill="#0f172a">طوكيو</text></g><path d="M100 120 Q320 30 540 120" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="8 6"/>`;
   if(m){const t=f,x=(1-t)*(1-t)*100+2*(1-t)*t*320+t*t*540,y=(1-t)*(1-t)*120+2*(1-t)*t*30+t*t*120;s+=`<text x="${x}" y="${y+10}" text-anchor="middle" font-size="34">${m.ic}</text>`;}
   $('#r1svg').innerHTML=s;};
  const table=()=>{$('#r1t').innerHTML='<thead><tr><th>الوسيلة</th><th>زمن الوصول</th></tr></thead><tbody>'+MED.map(m=>`<tr><td>${m.ic} ${m.n}</td><td>${done[m.n]?m.t:'—'}</td></tr>`).join('')+'</tbody>';};
  $('#r1b').innerHTML=MED.map((m,i)=>`<button class="tool" type="button" data-i="${i}"><span style="font-size:1.5rem">${m.ic}</span><span>${m.n}</span></button>`).join('');
  $$('#r1b .tool').forEach(b=>b.onclick=()=>{const m=MED[+b.dataset.i];clearInterval(tm);let f=0;const dur=Math.max(6,Math.log10(m.sec+1)*14);SFX.whoosh&&SFX.whoosh();
   tm=setInterval(()=>{f+=1/dur;draw(m,Math.min(1,f));if(f>=1){clearInterval(tm);done[m.n]=1;table();SFX.pop();say($('#r1fb'),'info',`وصل البحث بـ«${m.n}» خلال <b>${m.t}</b>.`);if(Object.keys(done).length===MED.length)G.add(6,'lab1');}},40);});
  draw();table();STN.lab1.stop=()=>clearInterval(tm);
  mcq($('#r1q'),{q:'ماذا تستنتج عن أثر تقنية المعلومات في انتشار الاكتشافات العلمية؟',o:['تختصر زمن وصول المعرفة من أشهر إلى أجزاء من الثانية، فينتشر الاكتشاف في العالم بسرعة','لا تؤثر في سرعة انتشار المعرفة','تبطئ انتشار المعرفة','تجعل المعرفة سرية'],a:0},'lab1',()=>G.complete('lab1'));},
 leave(){STN.lab1.stop&&STN.lab1.stop();},explain:'<p>محاكاة مقترحة؛ الأزمنة تقريبية للتوضيح. تحقق الهدف الثاني: تحليل كيف تسهم التقنية الحديثة في انتشار الاكتشافات العلمية.</p>'});

const SRC=[{t:'«اكتشاف علاج يشفي كل الأمراض في يوم واحد!» — حساب مجهول على وسائل التواصل، بلا مصدر.',ok:0,why:'ادعاء مبالغ فيه، ومصدر مجهول، ولا توجد أدلة.'},
 {t:'دراسة منشورة في مجلة علمية محكّمة، يذكر فيها أسماء الباحثين وطريقة البحث والبيانات.',ok:1,why:'مجلة محكّمة، ومنهجية واضحة، وبيانات يمكن التحقق منها.'},
 {t:'خبر في موقع جهة رسمية (مثل هيئة المساحة الجيولوجية السعودية) عن رصد هزة أرضية.',ok:1,why:'جهة رسمية مختصة، ومعلومة قابلة للتحقق.'},
 {t:'رسالة متداولة: «انشرها ولك الأجر… العلماء أكدوا أن الهاتف ينفجر عند الشحن ليلًا».',ok:0,why:'«العلماء أكدوا» دون ذكر من هم، وطلب النشر علامة على الشائعة.'},
 {t:'مقال على مدونة شخصية بلا تاريخ ولا مراجع، يعرض صورًا معدلة.',ok:0,why:'لا مراجع، ولا تاريخ، وصور معدلة.'},
 {t:'كتاب علمي حديث لمؤلف متخصص صادر عن دار نشر معروفة، فيه قائمة مراجع.',ok:1,why:'مؤلف متخصص ومراجع موثقة.'}];
def('lab2',{after:'s5',n:'🧪 كاشف المصادر',eyebrow:'نشاط تفاعلي · مقترح',title:'كاشف المصادر: هل أثق بهذه المعلومة؟',goal:'أكثر ما يقلق العلماء على الإنترنت دقة المعلومات وصحتها. افحص كل مصدر بالعدسة وقرّر: موثوق أم يحتاج تحققًا؟',plan:6,core:1,
 icon:'<circle cx="34" cy="34" r="20" fill="none" stroke="currentColor" stroke-width="6"/><path d="M48 48l20 20" stroke="currentColor" stroke-width="9" stroke-linecap="round"/><path d="M24 34l7 7 13-14" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="card"><div id="v2"></div></div>`,
 init(){let i=0,right=0;const box=$('#v2');const list=K.shuffle(SRC);
  const show=()=>{if(i>=list.length){box.innerHTML=`<div class="final-hero"><h2>انتهى الفحص</h2><span class="big-score">${right} / ${list.length}</span><p class="step-text">أسئلة المحقق: من الكاتب؟ هل هو متخصص؟ هل توجد أدلة ومراجع؟ ما تاريخ النشر؟ هل يطلب منك النشر دون تحقق؟</p></div>`;G.complete('lab2');return;}
   const s=list[i];box.innerHTML=`<div class="ch-top"><span class="eyebrow">المصدر ${i+1} من ${list.length}</span><div class="prog"><i style="width:${i/list.length*100}%"></i></div></div><div class="story" style="font-size:1.1rem">🔎 ${s.t}</div><div class="row-actions"><button class="btn" type="button" data-v="1">✅ مصدر موثوق</button><button class="btn alt" type="button" data-v="0">⚠️ يحتاج تحققًا</button></div><div class="qfb"></div>`;
   box.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{const ok=+b.dataset.v===s.ok;if(ok){right++;G.good();G.add(4,'lab2');}else G.bad();say(box.querySelector('.qfb'),ok?'ok':'bad',(ok?'صحيح. ':'ليس تمامًا. ')+s.why);box.querySelectorAll('[data-v]').forEach(x=>x.disabled=true);const n=document.createElement('button');n.className='btn';n.type='button';n.textContent='التالي';n.onclick=()=>{i++;show();};box.querySelector('.row-actions').appendChild(n);n.disabled=false;});};
  show();},explain:'<p>نشاط مقترح لتحري الدقة في انتقاء المعلومات من الإنترنت (سؤال التقويم 2-1).</p>'});
})();

/*@css c1.css*/
/*@include lab3.js*/
/*@include kit.js*/
/*@include skit.js*/
/* ===== الفصل الأول · الدرس الثالث: العلم والتقنية والمجتمع — «جسر الاكتشافات» ===== */
(function(){
const {$,$$,G,STN,def,mcq,flips,match,sortGame,challenge,say,SFX,pic,slides,beforeAfter,escape,bingo,tfRound,choiceBoard,solutions,ayah}=K;
const {fig,grid,reveal,ICO,lst,order,fill,tfx}=C6;const P=(n,c)=>[n,c];

def('intro',{n:'الافتتاحية',plan:3,icon:'<path d="M6 60h68M14 60V36h52v24M24 36V24h32v12" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="hero"><div class="hero-photo">${pic('s09_03cd3644','الأقمار الصناعية')}<span class="cap">من فكرة علمية إلى قمر صناعي يدور حول الأرض.</span></div>
  <div><span class="eyebrow">جسر الاكتشافات</span><h2 class="hero-h">كيف غيّر العلم والتقنية حياتك؟</h2>
   <p class="riddle">قبل عقود كان المسافر يقطع الصحراء على الجمل أسابيع، واليوم يقطعها القطار في ساعات، ويرشدك تطبيق الخرائط إلى أي مكان. ما الذي يربط الاكتشاف العلمي بحياتك اليومية؟</p>
   <p class="q">ما توقعك قبل أن تبدأ؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div>`,init(){}});

def('nafs',{n:'سؤال نافس',eyebrow:'برنامج التهيئة لاختبارات نافس · مجال علوم الأرض',title:'ورد هذا السؤال في اختبار نافس',goal:'من نواتج التعلم المستهدفة في مجال علوم الأرض: توضيح أسباب الإجهادات المؤثرة في الصخور المكوّنة لباطن الأرض، ووصف الآثار الناتجة عنها.',plan:2,icon:ICO.check,
 body:`<div class="two"><div class="card"><h3>نواتج التعلم المستهدفة (6-2-3-5-9)</h3>${lst(['يحدد مفهوم الصدع، ويعدد أنواع الصدوع (العادي والعكسي والجانبي أو الانزلاقي)، ويميز بالرسم كل نوع منها.','يعرف الزلزال، والموجات الزلزالية وأنواعها، ويعرف بؤرة الزلزال والمركز السطحي للزلزال، ويميز من خلال الرسم كلًّا منهما.','يوضح الظواهر الناتجة عن الزلازل، ويفسر أسباب حدوثها، ويبين آثارها التدميرية ويشرح طرق السلامة منها.','يعدد أشكال البراكين (الدرعية والمخروطية والمركبة وثوران الشقوق)، ويعرف كلًّا منها، ويميزها، ويذكر مثالًا عليه.'])}</div>
  <div class="card"><h3>القسم الثالث: اختبار العلوم – ثالث متوسط (نموذج 02)</h3><div id="nq"></div><p class="hint-line">ستدرس هذه الموضوعات في الفصل الثاني: تغيرات الأرض.</p></div></div>`,
 init(){mcq($('#nq'),{q:'ما هو التسونامي؟',o:['الموجات الزلزالية المائية','البراكين','قوة الزلزال','صخور منصهرة'],a:0,why:'التسونامي موجات مائية كبيرة تتولد عندما يحدث زلزال في قاع المحيط.'},'nafs',()=>G.complete('nafs'));}});

const GOALS=['تحدد أثر كل من العلم والتقنية في حياتك.','تحلل كيف تسهم التقنية الحديثة في انتشار الاكتشافات العلمية حول العالم.'];
def('goals',{n:'الأهداف والمفردات',eyebrow:'الكتاب صفحة 36',title:'الأهداف والمفردات',goal:'نفتح الكتاب على الصفحة 36، ونكتب اليوم والتاريخ.',plan:3,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><div class="story mt"><b>أهمية الدرس:</b> تمكّن أنظمة الاتصال الحديثة الناس من التواصل، والتعرف على الاكتشافات العلمية، وتشارك المعلومات في جميع أنحاء العالم.</div></div>
  <div class="card"><h3>مراجعة المفردات</h3><p class="step-text"><b>الحاسوب:</b> جهاز كهربائي يمكن برمجته لتخزين البيانات واسترجاعها ومعالجتها.</p><h3 class="mt">المفردات الجديدة</h3><ul class="tasks plain"><li>تقنية المعلومات</li></ul>
   <h3 class="mt">العلم والتقنية والمجتمع</h3><div id="g3m"></div></div></div>`,
 init(){match($('#g3m'),[['العلم','طريقة أو عملية تستخدم في استقصاء ما يجري حولك، ويعينك على توفير إجابات لأسئلتك'],['التقنية','تطبيق العلم لصنع منتجات أو أدوات يستخدمها الناس'],['المجتمع','مجموعة من الأفراد يعيشون في منطقة جغرافية تربطهم أواصر متعددة: اقتصادية، دينية، ثقافية']],'goals',()=>G.complete('goals'));}});

def('s1',{n:'1 · العلم في الحياة',eyebrow:'المحطة 1 · الكتاب صفحة 36',title:'العلم في الحياة اليومية والاكتشافات العلمية',goal:'تؤدي الاكتشافات العلمية إلى إنتاج منتجات جديدة تؤثر في نمط حياتك.',plan:6,core:1,icon:'<circle cx="20" cy="54" r="12" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="60" cy="54" r="12" fill="none" stroke="currentColor" stroke-width="5"/><path d="M20 54l14-24h16l10 24M34 30l-4-10" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="card" id="s1sl"></div><div class="card"><h3>صنّف: في أي مظهر من مظاهر الحياة أثّرت التقنية؟</h3><div id="s1sort"></div></div>`,
 init(){slides($('#s1sl'),[
  {k:'العلم في الحياة اليومية',t:'قال تعالى',im:[P('s07_50a1f1ca','الجهاز النقال'),P('s07_5aa3272f','الدراجة'),P('s07_1406372e','السيارة')],html:`<p style="text-align:center">${ayah('قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ','الزمر: 9')}</p><p>تعلمنا سابقًا أهمية العلم وفائدته في تسهيل الحياة والقيام بالأنشطة المختلفة؛ فمثلًا: الدراجة، وجهازك النقال، والسيارة.</p>`},
  {k:'الاكتشافات العلمية',t:'منتجات جديدة تغيّر نمط الحياة',im:[P('s08_22a20851','أجهزة حديثة')],html:'<p>تؤدي الاكتشافات العلمية إلى إنتاج منتجات جديدة تؤثر في نمط حياتك، ومن مظاهر الحياة التي تأثرت بالتقنية: <b>الصحة، ووسائل الراحة، ووسائل التسلية</b>.</p><p>غيّرت التقنية الحديثة طريقة عمل الناس ووسائل راحتهم.</p>'},
  {k:'الاكتشافات العلمية',t:'الأقمار الصناعية',im:[P('s09_03cd3644','قمر صناعي')],html:'<p>الأقمار الصناعية من الاكتشافات العلمية التي غيّرت الاتصالات والملاحة ورصد الطقس.</p>'}],'s1');
  sortGame($('#s1sort'),{bins:['الصحة','وسائل الراحة','وسائل التسلية'],items:[['جهاز قياس ضغط الدم الرقمي',0],['أجهزة التصوير الطبية',0],['الميكروويف',1],['المكيف',1],['الألعاب الإلكترونية',2],['التلفاز',2]]},'s1',()=>G.complete('s1'));},
 explain:'<p>تؤدي الاكتشافات العلمية إلى منتجات تؤثر في الصحة ووسائل الراحة والتسلية. (أمثلة التصنيف مقترحة.)</p>'});

const PAIRS=[['s11_31628e3e','s11_b32ed4f2','الدفع النقدي','الدفع الإلكتروني'],['s12_64487e28','s12_ab14d7ee','السفر على الجمال','القطار الحديث'],['s13_3fd90a37','s13_91f4eb02','الهاتف القديم','الهاتف الذكي'],['s14_a3935429','s14_9b85b36d','قياس الضغط اليدوي','الجهاز الرقمي'],['s15_48c2a1d3','s15_13cc211d','الخريطة الورقية','تطبيق الخرائط']];
def('s2',{n:'2 · قراءة الصور',eyebrow:'المحطة 2 · استراتيجية قراءة الصور',title:'استراتيجية قراءة الصور: حاول أن تكتشف ماذا تقول الصورة',goal:'اسحب الشريط بين «قبل» و«بعد»، ثم اكتب ملاحظتك عن أثر التقنية.',plan:7,core:1,icon:'<rect x="8" y="14" width="64" height="52" rx="5" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="26" cy="32" r="6" fill="currentColor"/><path d="M8 58l20-16 14 10 12-8 18 14" fill="none" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="card"><div class="c6-chips" id="s2c"></div><div id="s2ba"></div><div id="s2n" class="mt"></div></div>`,
 init(){const seen=new Set();const show=i=>{const [a,b,la,lb]=PAIRS[i];$$('#s2c [data-i]').forEach(x=>x.setAttribute('aria-pressed',+x.dataset.i===i));
   beforeAfter($('#s2ba'),{a:pic(a,la,'ph'),b:pic(b,lb,'ph'),la:'قبل: '+la,lb:'بعد: '+lb});
   $('#s2n').innerHTML=`<label class="step-text"><b>ملاحظتك:</b><textarea rows="2" style="width:100%;font:inherit;border-radius:10px;border:2px solid var(--line);padding:8px;background:var(--surface);color:var(--ink)" placeholder="ماذا تقول الصورة؟ كيف غيّرت التقنية هذا الجانب من الحياة؟"></textarea></label>`;
   seen.add(i);SFX.whoosh&&SFX.whoosh();if(seen.size===PAIRS.length)G.complete('s2');};
  $('#s2c').innerHTML=PAIRS.map((p,i)=>`<button type="button" class="c6-chip" data-i="${i}">${i+1}. ${p[2]} ← ${p[3]}</button>`).join('');
  $$('#s2c [data-i]').forEach(b=>b.onclick=()=>show(+b.dataset.i));show(0);},
 explain:'<p>استراتيجية قراءة الصور كما في العرض (5 أزواج من الصور)؛ ملاحظات الطلاب مفتوحة.</p>'});

def('s3',{n:'3 · اكتشافات غيّرت حياتنا',eyebrow:'المحطة 3 · الكتاب صفحة 36–37',title:'الاكتشافات العلمية والمعرفة التراكمية',goal:'أجهزة التصوير الطبية، والرافعات، والميكروويف… والمعرفة العلمية إنتاج تراكمي.',plan:6,core:1,icon:'<path d="M10 70V20l30-12 30 12v50" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="card" id="s3sl"></div><div class="card"><h3>رتّب تطور الهاتف من الأقدم إلى الأحدث</h3><div id="s3o"></div></div>`,
 init(){slides($('#s3sl'),[
  {k:'الاكتشافات العلمية',t:'أجهزة التصوير الطبية',im:[P('s16_23c8b9a5','أجهزة التصوير الطبية')],html:'<p>ساعدت أجهزة التصوير الطبية الأطباء على رؤية داخل الجسم وتشخيص الأمراض دون جراحة.</p>'},
  {k:'الاكتشافات العلمية',t:'الرافعات',im:[P('s17_5fe8396d','الرافعات')],html:'<p>سهّلت الرافعات رفع الأحمال الثقيلة في البناء.</p>'},
  {k:'الاكتشافات العلمية',t:'الميكروويف',im:[P('s18_352e0f88','الميكروويف')],html:'<p>غيّر الميكروويف طريقة إعداد الطعام وتسخينه.</p>'},
  {k:'المعرفة العلمية إنتاج تراكمي',t:'ابدأ من حيث انتهى الآخرون',im:[P('s19_24784474','تطور الهواتف')],html:'<p>تقول الحكمة: <b>«ابدأ من حيث انتهى الآخرون»</b>.</p><p>تتنافس الشركات في إنتاج الهواتف الذكية باستخدام المعرفة التراكمية، بحيث تستفيد من منافسيها في الوصول لتقنيات أفضل.</p>'}],'s3');
  order($('#s3o'),['هاتف أرضي بقرص دوّار','هاتف نقال كبير بهوائي','هاتف نقال صغير بأزرار','هاتف ذكي بشاشة لمس'],'s3',()=>G.complete('s3'),'كل جيل بُني على معرفة الجيل الذي قبله.');},
 explain:'<p>المعرفة العلمية تراكمية: كل تقنية جديدة تبني على ما سبقها. (شروح الصور الثلاث الأولى مقترحة لأن الشرائح صور فقط.)</p>'});

const SCI=[{n:'ستيفن هوكينغ',y:'1942 – 2018',d:'عالم فيزيائي، درس الكون والثقوب السوداء. وهو ألمع فيزيائي بعد أينشتاين.',im:'s21_38bec04e'},{n:'فريد بيجي',y:'',d:'عالم فيزيائي، درس طرائق إنتاج الطاقة الحرارية دون إلحاق ضرر بالبيئة.',im:'s22_4a3ca7bb'},{n:'د. دانيل هال وليمز',y:'',d:'طبيب، أجرى أول عملية قلب مفتوح وأسس مستشفى.',im:'s24_db7f1abe'},{n:'د. عبدالله بن عبدالعزيز الربيعة',y:'',d:'من أشهر أطباء جراحة فصل التوائم الملتصقة «السيامية» في العالم، ووزير الصحة السعودي سابقًا.',im:'s26_18372667'}];
def('s4',{n:'4 · جهود الناس',eyebrow:'المحطة 4 · الكتاب صفحة 38',title:'العلم والتقنية نتائج لجهود كثير من الناس',goal:'المس بطاقة كل عالِم لتتعرف إسهامه، ثم طابق العالِم بإسهامه.',plan:6,core:1,icon:'<circle cx="26" cy="26" r="10" fill="currentColor"/><circle cx="54" cy="26" r="10" fill="currentColor" opacity=".6"/><path d="M8 66c2-14 10-22 18-22s16 8 18 22M36 66c2-14 10-22 18-22s16 8 18 22" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="card"><div class="c6-grid">${SCI.map((s,i)=>`<button type="button" class="tbtn" data-i="${i}" style="display:block;padding:8px;text-align:center;height:auto"><div style="height:150px">${pic(s.im,s.n)}</div><b>${s.n}</b>${s.y?`<br><small>${s.y}</small>`:''}<div class="step-text" data-d hidden style="margin-top:6px">${s.d}</div></button>`).join('')}</div></div>
  <div class="card"><h3>طابق العالِم بإسهامه</h3><div id="s4m"></div></div>`,
 init(){$$('#st-s4 [data-i]').forEach(b=>b.onclick=()=>{b.querySelector('[data-d]').hidden=false;SFX.pop();});
  match($('#s4m'),SCI.map(s=>[s.n,s.d]),'s4',()=>G.complete('s4'));},
 explain:'<p>العلم والتقنية نتاج جهود علماء من شعوب مختلفة. <b>ملاحظة:</b> ورد في العرض «ستيف هوكينغ» والصواب «ستيفن هوكينغ». ويُعدّ دانيل هال وليمز من أوائل من أجروا عمليات القلب المفتوح الناجحة (1893م).</p>'});

def('s5',{n:'5 · استخدام المعلومات',eyebrow:'المحطة 5 · الكتاب صفحة 38',title:'استخدام المعلومات العلمية',goal:'يوفر العلم معلومات مهمة، لكنه لا يقرر إن كانت جيدة أم سيئة. فما دور الإنترنت؟ وما الذي يقلق العلماء؟',plan:7,core:1,icon:'<circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" stroke-width="5"/><path d="M12 40h56M40 12c-12 14-12 42 0 56M40 12c12 14 12 42 0 56" fill="none" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="card" id="s5sl"></div><div class="two"><div class="card"><h3>برأيك: أي مما يلي يقلق العلماء أكثر عندما يستخدمون الإنترنت؟ ولماذا؟</h3><div id="s5q"></div></div><div class="card"><h3>ما دور شبكة الإنترنت في نشر الاكتشافات الجديدة إلى العالم؟</h3>${fig('s30_755a64d6','شبكة الإنترنت',300)}${reveal('','أسهمت شبكة الإنترنت في سرعة نشر الأبحاث والتواصل بين العلماء، فأصبحت الاكتشافات الجديدة تصل إلى العالم كله خلال وقت قصير.')}</div></div>`,
 init(){slides($('#s5sl'),[
  {k:'استخدام المعلومات العلمية',t:'العلم يوفر المعلومات',im:[P('s28_d609d56b','اتخاذ القرارات'),P('s28_3c7395d2','إنتاج الكهرباء')],html:'<p>يوفر العلم الكثير من المعلومات المهمة التي يحتاجها الناس في: اتخاذ القرارات، واكتشاف الأدوية، وإنتاج الكهرباء، والأقمار الصناعية، وغيرها الكثير…</p><p><b>لا يستطيع العلم</b> أن يقرر ما إذا كانت المعلومات جيدة أم سيئة، أخلاقية أم لا؛ لأن العلوم التجريبية لا تتعرض لمثل هذه الأمور. وبالتالي نقوم بعرضها على <b>الشريعة الإسلامية السمحاء</b> لكي تجيز أو تمنع تلك العلوم أو تطبيقاتها.</p>'},
  {k:'استخدام المعلومات العلمية',t:'مهمة العلم',im:[P('s29_1b12ad5f','المفاعلات النووية'),P('s29_32a46169','الأسلحة البيولوجية')],html:'<p>إن مهمة العلم هي الإجابة عن الأسئلة وتوفير المعلومات، وليس إعطاء قرار إذا كانت المعلومات نافعة أو ضارة. فالمعرفة نفسها قد تُستخدم في المفاعلات النووية لإنتاج الطاقة، أو في صنع الأسلحة.</p>'}],'s5');
  mcq($('#s5q'),{q:'يقلق العلماء أكثر:',o:['توافر المعلومات','سرعة الوصول لها','اللغة','دقة المعلومات وصحتها'],a:3,why:'لأن أي شخص يمكنه نشر معلومات على الإنترنت، فلا بد من التحقق من دقة المصدر وصحته قبل الاعتماد عليه.'},'s5',()=>G.complete('s5'));},
 explain:'<p>العلم يوفر المعلومات ولا يحكم بأنها نافعة أو ضارة؛ نعرضها على الشريعة الإسلامية. والإنترنت سرّع نشر الاكتشافات، لكن دقة المعلومات وصحتها أكثر ما يقلق العلماء.</p>'});

def('s6',{n:'6 · نظرة إلى المستقبل',eyebrow:'المحطة 6 · الكتاب صفحة 39',title:'نظرة إلى المستقبل وتقنية المعلومات',goal:'يساهم تطور التقنية في تطور العلم والمعرفة. ناقش أثر تطور التقنية في كل جانب.',plan:6,core:1,icon:'<path d="M10 50 Q40 10 70 50" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="70" cy="50" r="6" fill="currentColor"/>',
 body:`<div class="two"><div class="card" id="s6sl"></div><div class="card"><h3>ما هي تقنية المعلومات؟</h3><p class="def">هي وسائل يستخدمها العلماء أو الناس ليتواصلوا مع الآخرين، مثل: الهاتف النقال، والحاسوب، وشبكة الإنترنت، والأقمار الصناعية.</p><div id="s6sort"></div></div></div>`,
 init(){slides($('#s6sl'),[
  {k:'على مستوى الطب',t:'المجهر الإلكتروني',im:[P('s32_b86f7f8f','المجهر الإلكتروني')],html:'<p>ناقش أثر تطور التقنية في هذا الجانب.</p>'},
  {k:'على مستوى علم الفلك',t:'المراصد الفلكية',im:[P('s33_a1b9e4c1','المراصد الفلكية')],html:'<p>ناقش أثر تطور التقنية في هذا الجانب.</p>'},
  {k:'على مستوى المواصلات',t:'القطارات الكهربائية',im:[P('s34_4d868a42','القطار الكهربائي')],html:'<p>ناقش أثر تطور التقنية في هذا الجانب.</p>'}],'s6');
  sortGame($('#s6sort'),{bins:['من تقنية المعلومات','ليست منها'],items:[['الهاتف النقال',0],['الحاسوب',0],['شبكة الإنترنت',0],['الأقمار الصناعية',0],['الرافعة',1],['الميكروويف',1]]},'s6',()=>G.complete('s6'));}});

def('ev1',{n:'تقويم',eyebrow:'تقويم',title:'تقويم الدرس',goal:'أسئلة التقويم كما في العرض.',plan:5,core:1,icon:ICO.check,
 body:`<div class="card"><h3>1 · أجب بكلمة (صح) أو (خطأ)</h3><div id="c1"></div></div><div class="two"><div class="card"><h3>2-1</h3><div id="c2"></div></div><div class="card"><h3>2-2</h3><div id="c3"></div></div></div><div class="card"><h3>2-3</h3><div id="c4"></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=4)G.complete('ev1');};
  tfx($('#c1'),[['يوفر العلم معلومات يستخدمها الناس لاتخاذ القرارات.',true],['يساهم تطور التقنية في تطور العلم والمعرفة.',true],['<u>يمكن</u> للعلم أن يقرر إذا كانت هذه المعلومات نافعة أو ضارة، أخلاقية أو لا أخلاقية.',false,'لا يمكن',['لا يمكن','يجب','يُفضَّل']],['تؤدي الاكتشافات العلمية إلى إنتاج منتجات جديدة تؤثر في نمط الحياة.',true]],'ev1',c);
  mcq($('#c2'),{q:'أي معلومات تُجمع من الإنترنت يلزم:',o:['الاعتماد عليها','تحري الدقة في انتقائها','التحيز في انتقائها','جميع ما سبق صحيح'],a:1},'ev1',c);
  mcq($('#c3'),{q:'أسهمت ……… إلى سرعة نشر الأبحاث والتواصل بين العلماء:',o:['اللقاءات العلمية','المؤتمرات العلمية','شبكة الإنترنت','أجهزة تحديد المواقع'],a:2},'ev1',c);
  mcq($('#c4'),{q:'وسائل يستخدمها العلماء أو الناس ليتواصلوا مع الآخرين:',o:['جهاز الحاسوب','شبكة الإنترنت','الهاتف النقال','تقنية المعلومات'],a:3},'ev1',c);}});

def('sum',{n:'الخلاصة',eyebrow:'الخلاصة',title:'الخلاصة',goal:'خلاصة الدرس كما في العرض.',plan:2,icon:ICO.doc,
 body:`<div class="card"><p class="lead">يختلف العلم عن التقنية في أن العلم نظري بينما التقنية تطبيقية، كما أن العلم يتم بالملاحظة والتعلم والحفظ والفهم بشكل قد يكون مقصودًا أو غير مقصود، بينما التقنية تحتاج إلى تدريب وتأهيل مسبق للتمكن من التعامل معها. ويشترك كل منهما في أنهما يخدمان البشرية بشكل كبير، وأنهما أداة حتمية لمستقبل وحياة أفضل.</p></div>`,enter(){G.complete('sum');}});
def('self',{n:'اختبر نفسك',eyebrow:'الواجب · الكتاب صفحة 39 · منصة مدرستي',title:'اختبر نفسك',goal:'الواجب في منصة مدرستي، والتسليم يوم الخميس. إجابات نموذجية مقترحة.',plan:3,icon:ICO.check,body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'1 · حدّد',q:'أحد إسهامات العلم أو التقنية في تحسن صحتك.',a:[['مثال','أجهزة التصوير الطبية، واللقاحات، وجهاز قياس ضغط الدم الرقمي.']]},
  {k:'2 · استنتج',q:'ما الذي يجعل العلماء يغيرون نظرية قديمة عمرها 100 عام؟',a:[['الإجابة','ظهور أدلة وبيانات جديدة لا تدعمها، غالبًا بفضل أدوات وتقنيات أحدث تسمح بملاحظات أدق.']]},
  {k:'3 · اعمل قائمة',q:'بخمس طرائق تمكّن العلماء من التواصل مع بعضهم لنشر آخر مكتشفاتهم.',a:[['الإجابة','المجلات العلمية، الإنترنت والبريد الإلكتروني، المؤتمرات واللقاءات العلمية، الكتب، الهاتف النقال والأقمار الصناعية.']]},
  {k:'4 · صف',q:'تقدمًا تقنيًّا يجعل حياتك أكثر متعة. ما الاكتشافات التي ساهمت في تطور هذه التقنية؟',a:[['مثال','الهاتف الذكي: ساهمت فيه اكتشافات الكهرباء والموجات الكهرومغناطيسية وأشباه الموصلات والحاسوب.']]},
  {k:'5 · التفكير الناقد',q:'وضّح لماذا تعدّ أنظمة الاتصالات الحديثة مهمة للعلماء في أنحاء العالم؟',a:[['الإجابة','لأنها تنقل نتائج الأبحاث بسرعة، فيستفيد منها العلماء الآخرون ويبنون عليها (المعرفة التراكمية) ويحصلون على أفكار جديدة.']]},
  {k:'6 · ابحث',q:'عن أحد علماء المسلمين مستعينًا بمصدرين على الأقل من مصادر المعلومات، ودوّن عشر حقائق حول هذا العالم، ثم اكتب سيرته الذاتية باختصار مستخدمًا برنامج معالج النصوص.',a:[['توجيه','مهمة بحثية؛ يختار الطالب عالمًا (مثل ابن الهيثم أو البيروني أو الخوارزمي) ويوثق مصادره.']]}],'self',()=>G.complete('self'));},
 reset(){STN.self.s.reset();},explain:'<p>الأسئلة من العرض، والإجابات نموذجية مقترحة.</p>'});

def('x1',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'خزنة الاكتشافات وبنغو التقنية',goal:'افتحوا الخزنة ثم تنافسوا في البنغو.',plan:5,icon:ICO.lock,
 body:'<div class="card"><div id="x1e"></div></div><div class="card"><div class="nb-head"><h2>🎯 بنغو التقنية</h2></div><div id="x1b"></div></div>',
 init(){STN.x1.e=escape($('#x1e'),{title:'خزنة الاكتشافات',story:'أربعة أقفال تحمي خزنة الاكتشافات العلمية!',secs:300,locks:[{q:'تطبيق العلم لصنع منتجات:',o:['التقنية','المجتمع','الرأي','الفرضية'],a:0,code:'3'},{q:'جرّاح فصل التوائم السيامية:',o:['د. عبدالله الربيعة','ستيفن هوكينغ','فريد بيجي','دانيل وليمز'],a:0,code:'6'},{q:'أكثر ما يقلق العلماء في الإنترنت:',o:['دقة المعلومات','اللغة','السرعة','التوافر'],a:0,code:'9'},{q:'«ابدأ من حيث انتهى الآخرون» تعني أن المعرفة:',o:['تراكمية','ثابتة','سرية','عشوائية'],a:0,code:'1'}],outro:'فتحتم خزنة الاكتشافات!'},'x1');
  bingo($('#x1b'),[['العلم','طريقة لاستقصاء ما يجري حولك'],['التقنية','تطبيق العلم لصنع منتجات'],['المجتمع','أفراد في منطقة جغرافية تربطهم أواصر'],['الحاسوب','جهاز يُبرمج لتخزين البيانات ومعالجتها'],['تقنية المعلومات','وسائل للتواصل مع الآخرين'],['الأقمار الصناعية','من وسائل تقنية المعلومات'],['الإنترنت','سرّع نشر الأبحاث'],['ستيفن هوكينغ','درس الثقوب السوداء'],['فريد بيجي','الطاقة الحرارية دون ضرر للبيئة'],['دانيل هال وليمز','أجرى أول عملية قلب مفتوح'],['عبدالله الربيعة','فصل التوائم السيامية'],['المجهر الإلكتروني','تطور التقنية في الطب'],['المراصد الفلكية','تطور التقنية في الفلك'],['القطار الكهربائي','تطور التقنية في المواصلات'],['المعرفة التراكمية','ابدأ من حيث انتهى الآخرون'],['الميكروويف','اكتشاف غيّر إعداد الطعام']],'x1');},reset(){STN.x1.e.reset();}});
def('x2',{n:'إثرائي · جولة البرق',eyebrow:'إثرائي',title:'جولة البرق ولوحة الخيارات',goal:'صح أم خطأ بسرعة، ثم لوحة الخيارات.',plan:4,icon:'<path d="M44 6L18 46h18l-6 28 28-42H40z" fill="currentColor"/>',
 body:'<div class="card"><div id="x2t"></div></div><div class="card"><div id="x2cb"></div></div>',
 init(){tfRound($('#x2t'),[['العلم نظري والتقنية تطبيقية.',true],['يقرر العلم إن كانت المعلومة أخلاقية.',false,'نعرضها على الشريعة.'],['كل ما على الإنترنت دقيق.',false,'يجب تحري الدقة.'],['المعرفة العلمية تراكمية.',true],['الأقمار الصناعية من تقنية المعلومات.',true],['التقنية لا تحتاج إلى تدريب.',false,'تحتاج إلى تدريب وتأهيل.']],'x2',{secs:10});
  STN.x2.cb=choiceBoard($('#x2cb'),[{ic:'✍️',t:'اكتب',kind:'كتابة',p:'اكتب فقرة عن جهاز في بيتك وكيف غيّر حياة أسرتك.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'مثال على تقنية المعلومات:',o:['الهاتف النقال','الرافعة','الدراجة','الملعقة'],a:0},{ic:'🔍',t:'تحقق',kind:'بحث',p:'اختر خبرًا علميًّا من الإنترنت وتحقق من صحته من مصدرين موثوقين.'},
   {ic:'❓',t:'سؤال',kind:'اختيار',q:'العالم الذي درس الثقوب السوداء:',o:['ستيفن هوكينغ','فريد بيجي','دانيل وليمز','جون سنو'],a:0},{ic:'🎨',t:'خط زمني',kind:'رسم',p:'ارسم خطًّا زمنيًّا لتطور وسيلة نقل.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'يُعرض حكم استخدام العلم على:',o:['الشريعة الإسلامية','الإنترنت','الشركات','الإعلانات'],a:0},
   {ic:'🗣',t:'قابل',kind:'حوار',p:'اسأل أحد كبار أسرتك: كيف كان التواصل قبل الهاتف النقال؟ وسجّل إجابته.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'من مظاهر تأثر الحياة بالتقنية:',o:['الصحة','الراحة','التسلية','جميع ما سبق'],a:3},{ic:'🗺',t:'خريطة',kind:'تنظيم',p:'خريطة مفاهيم تربط: العلم ← التقنية ← المجتمع.'}],'x2',()=>G.complete('x2'));},reset(){STN.x2.cb.reset();}});

def('ch',{n:'تحدي العلماء',plan:3,icon:ICO.cup,eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من تقويم العرض.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'المعلومات',q:'أي معلومات تُجمع من الإنترنت يلزم:',o:['الاعتماد عليها','تحري الدقة في انتقائها','التحيز في انتقائها','جميع ما سبق صحيح'],a:1},
  {k:'الإنترنت',q:'أسهمت ……… إلى سرعة نشر الأبحاث:',o:['اللقاءات العلمية','المؤتمرات العلمية','شبكة الإنترنت','أجهزة تحديد المواقع'],a:2},
  {k:'تقنية المعلومات',q:'وسائل يستخدمها العلماء أو الناس ليتواصلوا مع الآخرين:',o:['جهاز الحاسوب','شبكة الإنترنت','الهاتف النقال','تقنية المعلومات'],a:3},
  {k:'العلم',q:'هل يمكن للعلم أن يقرر إذا كانت المعلومات نافعة أو ضارة؟',o:['لا، مهمته الإجابة عن الأسئلة وتوفير المعلومات','نعم دائمًا','نعم في الطب فقط','نعم إذا كانت حديثة'],a:0},
  {k:'العلماء',q:'الطبيب الذي أجرى أول عملية قلب مفتوح وأسس مستشفى:',o:['دانيل هال وليمز','فريد بيجي','ستيفن هوكينغ','عبدالله الربيعة'],a:0},
  {k:'التقنية',t:'multi',q:'اختر وسائل تقنية المعلومات:',items:[['الهاتف النقال',1],['الحاسوب',1],['الأقمار الصناعية',1],['الرافعة',0]]}],'ch');},reset(){STN.ch.c.reset();}});

C6.plan({intro:{s:['poe','brain'],g:'١ و٢',sk:'التنبؤ',ev:'سؤال التوقع'},nafs:{s:['cards'],g:'—',sk:'الاستدعاء',ev:'سؤال نافس'},goals:{s:['frayer'],g:'١ و٢',sk:'التذكر',ev:'المطابقة'},s1:{s:['brain','coop'],g:'١',sk:'التصنيف',ev:'مظاهر الحياة'},s2:{s:['tps','analogy'],g:'١',sk:'قراءة الصور',ev:'ملاحظات الطلاب'},lab1:{s:['time','game'],g:'١',sk:'الترتيب',ev:'آلة الزمن'},
 s3:{s:['time','disc'],g:'١',sk:'الترتيب',ev:'تطور الهاتف'},s4:{s:['jigsaw','who'],g:'١',sk:'الربط',ev:'مطابقة العلماء'},s5:{s:['hats','crit'],g:'٢',sk:'التفكير الناقد',ev:'ما يقلق العلماء'},lab2:{s:['crit','inq'],g:'٢',sk:'تقويم المصادر',ev:'كاشف المصادر'},s6:{s:['disc','cards'],g:'٢',sk:'التصنيف',ev:'تقنية المعلومات'},
 ev1:{s:['spot','cards'],g:'١ و٢',sk:'التطبيق',ev:'التقويم'},sum:{s:['tl'],g:'١ و٢',sk:'التلخيص',ev:'إشارة المرور'},self:{s:['heads','sticks'],g:'١ و٢',sk:'التفكير الناقد',ev:'اختبر نفسك'},x1:{s:['game','champ'],g:'١ و٢',sk:'الاستدعاء',ev:'الخزنة والبنغو'},x2:{s:['cards','game'],g:'١ و٢',sk:'الاستدعاء',ev:'جولة البرق'},ch:{s:['exit'],g:'١ و٢',sk:'التقويم الختامي',ev:'تحدي العلماء'}},'g9c1l3');
K.boot({chapter:'الفصل الأول: طبيعة العلم',chapterShort:'الفصل الأول',title:'جسر الاكتشافات',lesson:'الدرس الثالث: العلم والتقنية والمجتمع',accent:'#0f766e',accentDark:'#2dd4bf',hook:'كيف غيّر العلم والتقنية حياتك؟',
 riddle:'ما الذي يربط الاكتشاف العلمي بحياتك اليومية؟',predict:{o:['التقنية: تطبيق العلم لصنع منتجات وأدوات تغير نمط حياتنا','لا علاقة بينهما','الإعلانات التجارية فقط'],a:0},
 answer:'الاكتشافات العلمية تتحول عبر التقنية إلى منتجات تغيّر الصحة ووسائل الراحة والتسلية والتواصل، والمعرفة العلمية تراكمية تنتشر بسرعة عبر تقنية المعلومات.',
 finalTitle:'مبارك! عبرت جسر الاكتشافات',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 39 في منصة مدرستي · التسليم يوم الخميس.',
 concepts:[{n:'العلم',t:'نظري: يجيب عن الأسئلة ويوفر المعلومات.',ic:'<circle cx="24" cy="24" r="14" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'التقنية',t:'تطبيقية: منتجات وأدوات.',ic:'<rect x="8" y="12" width="32" height="22" rx="3" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'المعرفة التراكمية',t:'ابدأ من حيث انتهى الآخرون.',ic:'<path d="M6 40h10V30h10V20h10V10" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'جهود العلماء',t:'هوكينغ، بيجي، وليمز، الربيعة.',ic:'<circle cx="24" cy="18" r="8" fill="var(--accent)"/>'},{n:'استخدام المعلومات',t:'العلم لا يحكم أخلاقيًّا؛ نعرضه على الشريعة.',ic:'<path d="M24 6v36M10 16h28" stroke="var(--accent)" stroke-width="4"/>'},{n:'تقنية المعلومات',t:'الهاتف والحاسوب والإنترنت والأقمار الصناعية.',ic:'<circle cx="24" cy="24" r="14" fill="none" stroke="var(--accent)" stroke-width="4"/><path d="M10 24h28" stroke="var(--accent)" stroke-width="3"/>'}]});
$$('.top h1').forEach(h=>h.dataset.sym='🛰');
})();

