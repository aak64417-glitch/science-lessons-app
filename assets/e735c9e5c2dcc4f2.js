
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

/* ===== تجارب افتراضية — الصفائح الأرضية ===== */
(function(){
const {$,$$,G,STN,def,say,SFX,mcq}=K;const AR='font-family="IBM Plex Sans Arabic"';

/* ---------- 1) محاكي حدود الصفائح ---------- */
const BD=[{k:'div',n:'حدود تباعد',ic:'← →',out:'تتباعد الصفيحتان فتتكون حفرة انهدام وشقوق تخرج منها الصهارة، ويحدث نشاط بركاني وزلازل.'},{k:'con',n:'حدود تقارب (غوص)',ic:'→ ←',out:'تغوص الصفيحة المحيطية الأكبر كثافة أسفل القارية، فتنصهر جزئيًّا وتصعد الصهارة مكونة براكين مركبة، وتحدث زلازل عميقة.'},{k:'tr',n:'حدود جانبية (تحويلية)',ic:'↑ ↓',out:'تنزلق الصفيحتان بمحاذاة بعضهما، فتتراكم الإجهادات وتحدث الزلازل، ولا تتكون براكين عادة.'}];
def('lab1',{after:'s2',n:'🧪 محاكي الحدود',eyebrow:'تجربة افتراضية · مقترحة',title:'محاكي حدود الصفائح: حرّك الصفائح وشاهد النتيجة',goal:'اختر نوع الحد، ثم اسحب منزلق الزمن (ملايين السنين). ماذا يتكون عند الحد؟ وأين تحدث الزلازل والبراكين؟',plan:8,core:1,
 icon:'<path d="M6 40h28M46 40h28M26 32l8 8-8 8M54 32l-8 8 8 8" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="stage"><svg id="p1svg" viewBox="0 0 640 300" aria-label="مقطع في صفيحتين"></svg><div style="padding:10px"><div class="c6-chips" id="p1b"></div><label class="step-text">⏳ الزمن: <b id="p1v">0</b> مليون سنة<input type="range" id="p1r" min="0" max="100" value="0" style="width:100%"></label></div></div>
  <div class="side"><div class="card"><h3>ماذا يحدث؟</h3><div id="p1o" class="step-text muted">اختر نوع الحد وحرّك الزمن.</div></div></div></div>
  <div class="card"><h3>استنتج</h3><div id="p1q"></div></div>`,
 init(){let k=0;const seen=new Set();
  const draw=()=>{const t=+$('#p1r').value/100,b=BD[k];$('#p1v').textContent=Math.round(t*20);let s=`<rect width="640" height="300" fill="#e0f2fe"/><rect y="200" width="640" height="100" fill="#f59e0b" opacity=".55"/><text x="20" y="290" ${AR} font-size="12" fill="#7c2d12">الغلاف المائع</text>`;
   const qk=[];
   if(b.k==='div'){const g=t*80;s+=`<rect x="${20-g}" y="120" width="${300}" height="80" fill="#1e3a8a" opacity=".85"/><rect x="${320+g}" y="120" width="300" height="80" fill="#1e3a8a" opacity=".85"/><rect y="90" width="640" height="30" fill="#60a5fa" opacity=".5"/>`;
    if(g>4)s+=`<path d="M${320-g} 120 L320 200 L${320+g} 120z" fill="#ea580c"/><path d="M320 300 V200" stroke="#ea580c" stroke-width="${6+g/8}"/>`;
    if(t>.3)s+=`<path d="M300 120 l20 -30 l20 30z" fill="#7c2d12"/>`;qk.push([320,150]);
    s+=`<path d="M220 160 h-60 M420 160 h60" stroke="#fff" stroke-width="5" marker-end="url(#pa)"/>`;}
   else if(b.k==='con'){const g=t*90;s+=`<path d="M20 120 H${300+g*0.6} L${330+g} 200 L${290+g} 230 L${270+g*0.4} 200 H20z" fill="#1e3a8a" opacity=".85"/><rect y="90" width="${300+g*.6}" height="30" fill="#60a5fa" opacity=".5"/>`;
    s+=`<path d="M${330+g*.2} 70 H620 V200 H${330+g*.2}z" fill="#a16207"/><path d="M${330+g*.2} 70 H620" stroke="#7c9a4b" stroke-width="10"/>`;
    if(t>.3){s+=`<path d="M${420} 70 l30 -50 l30 50z" fill="#57534e"/><path d="M450 200 Q440 120 450 25" stroke="#ea580c" stroke-width="6" fill="none"/>`;}
    qk.push([340+g*.4,170],[360+g*.5,220]);s+=`<path d="M160 105 h60 M560 140 h-60" stroke="#fff" stroke-width="5" marker-end="url(#pa)"/>`;}
   else{const g=t*120;s+=`<g transform="translate(0 ${-g*.0})"><rect x="20" y="110" width="300" height="90" fill="#a16207"/><path d="M20 110 H320" stroke="#7c9a4b" stroke-width="10"/></g><rect x="322" y="110" width="298" height="90" fill="#b45309"/><path d="M322 110 H620" stroke="#7c9a4b" stroke-width="10"/>`;
    s+=`<path d="M321 100 V210" stroke="#7f1d1d" stroke-width="4"/><text x="170" y="${160}" text-anchor="middle" font-size="26" fill="#fff">⬆</text><text x="470" y="160" text-anchor="middle" font-size="26" fill="#fff">⬇</text>`;
    for(let i=0;i<5;i++){const y=((i*40+g*2)%100);s+=`<rect x="140" y="${112+y*.8}" width="16" height="8" fill="#fde68a"/><rect x="480" y="${190-y*.8}" width="16" height="8" fill="#fde68a"/>`;}
    s+=`<text x="320" y="240" text-anchor="middle" ${AR} font-size="13" fill="#7c2d12">منظر جانبي: الكتلتان تنزلقان أفقيًّا؛ الأولى نحو الداخل والثانية نحو الخارج</text>`;qk.push([321,140],[321,180]);}
   if(t>.15)qk.forEach(([x,y])=>s+=`<g transform="translate(${x} ${y})"><circle r="${8+((Date.now()/80)%10)}" fill="none" stroke="#dc2626" stroke-width="2"/><circle r="4" fill="#dc2626"/></g>`);
   s+='<defs><marker id="pa" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="#fff"/></marker></defs>';
   $('#p1svg').innerHTML=s;if(t>.5){seen.add(b.k);$('#p1o').innerHTML=`<b>${b.n}:</b> ${b.out}<br><span style="color:#dc2626">● زلازل</span>`;if(seen.size===3)G.add(6,'lab1');}};
  $('#p1b').innerHTML=BD.map((b,i)=>`<button class="c6-chip" type="button" data-i="${i}" aria-pressed="${i===0}"><span style="direction:ltr;display:inline-block">${b.ic}</span> ${b.n}</button>`).join('');
  $$('#p1b [data-i]').forEach(x=>x.onclick=()=>{k=+x.dataset.i;$$('#p1b [data-i]').forEach(y=>y.setAttribute('aria-pressed',y===x));$('#p1r').value=0;SFX.tick();draw();});
  $('#p1r').oninput=draw;draw();
  mcq($('#p1q'),{q:'عند أي الحدود تتكون عادة البراكين المركبة؟',o:['حدود التقارب حيث تغوص صفيحة تحت أخرى','الحدود الجانبية','وسط الصفيحة','لا تتكون عند أي حد'],a:0},'lab1',()=>G.complete('lab1'));},
 explain:'<p>محاكاة مبسطة مقترحة لأنواع حدود الصفائح الثلاثة ونتائجها.</p>'});

/* ---------- 2) سلسلة جزر البقعة الساخنة ---------- */
def('lab2',{after:'s3',n:'🧪 البقعة الساخنة',eyebrow:'تجربة افتراضية · مقترحة',title:'صانع الجزر: الصفيحة فوق البقعة الساخنة',goal:'البقعة الساخنة ثابتة في أعماق الأرض، والصفيحة تتحرك فوقها. حرّك الزمن وراقب تكوّن سلسلة جزر مثل هاواي. أي الجزر أقدم؟',plan:6,core:1,
 icon:'<circle cx="40" cy="60" r="10" fill="currentColor"/><path d="M10 30l8-8 8 8M34 30l8-12 8 12M58 30l6-6 6 6" fill="none" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="two"><div class="stage"><svg id="h2svg" viewBox="0 0 640 300" aria-label="بقعة ساخنة"></svg><div style="padding:10px"><label class="step-text">⏳ الزمن: <b id="h2v">0</b> مليون سنة<input type="range" id="h2r" min="0" max="10" value="0" style="width:100%"></label></div></div>
  <div class="side"><div class="card"><div id="h2o" class="step-text"></div></div></div></div><div class="card"><div id="h2q"></div></div>`,
 init(){const draw=()=>{const t=+$('#h2r').value;$('#h2v').textContent=t*1;let s=`<rect width="640" height="300" fill="#e0f2fe"/><rect y="110" width="640" height="10" fill="#3b82f6" opacity=".4"/><rect y="120" width="640" height="60" fill="#1e3a8a"/><rect y="180" width="640" height="120" fill="#f59e0b" opacity=".6"/>`;
   s+=`<path d="M320 300 Q300 230 320 180 Q340 230 320 300" fill="#dc2626"/><text x="320" y="290" text-anchor="middle" ${AR} font-size="13" font-weight="800" fill="#fff">البقعة الساخنة</text>`;
   for(let i=0;i<=t;i+=2){const x=320-(t-i)*28,age=t-i,h=Math.max(18,60-age*5);if(x<10)continue;s+=`<path d="M${x-30} 120 L${x} ${120-h} L${x+30} 120z" fill="${age<1?'#7c2d12':age<4?'#57534e':'#78716c'}"/>${age<1?`<path d="M${x} ${120-h} q-6 -20 6 -30" stroke="#ea580c" stroke-width="4" fill="none"/>`:''}<text x="${x}" y="${100-h}" text-anchor="middle" ${AR} font-size="11" fill="var(--ink)">${age} م.س</text>`;}
   s+=`<path d="M560 150 h-80" stroke="#fff" stroke-width="5" marker-end="url(#ha)"/><text x="520" y="170" text-anchor="middle" ${AR} font-size="12" fill="#fff">اتجاه حركة الصفيحة</text><defs><marker id="ha" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="#fff"/></marker></defs>`;
   $('#h2svg').innerHTML=s;$('#h2o').innerHTML=t?`تكوّنت <b>${Math.floor(t/2)+1}</b> جزيرة. الجزيرة النشطة فوق البقعة الساخنة مباشرة، والجزر الأبعد عنها أقدم وخامدة.`:'حرّك الزمن.';if(t>=8)G.add(0,'lab2');};
  $('#h2r').oninput=()=>{SFX.tick();draw();};draw();
  mcq($('#h2q'),{q:'في سلسلة جزر البقعة الساخنة، أي الجزر أقدم؟',o:['الأبعد عن البقعة الساخنة في اتجاه حركة الصفيحة','الجزيرة النشطة فوق البقعة','جميعها بالعمر نفسه','الأقرب إلى البقعة'],a:0,why:'لأن الصفيحة تحملها بعيدًا بعد تكوّنها، وتتكون جزيرة جديدة فوق البقعة الثابتة.'},'lab2',()=>G.complete('lab2'));},
 explain:'<p>محاكاة مقترحة لتكوّن سلسلة جزر هاواي فوق بقعة ساخنة وسط صفيحة المحيط الهادئ؛ الأعمار توضيحية.</p>'});

/* ---------- 3) خزان تيارات الحمل ---------- */
def('lab3',{after:'s7',n:'🧪 تيارات الحمل',eyebrow:'تجربة افتراضية · مقترحة',title:'خزان تيارات الحمل: كيف تتحرك الصفائح؟',goal:'شغّل مصدر الحرارة (لب الأرض) وزِد شدته. راقب حركة مادة الستار والصفيحتين فوقها.',plan:6,core:1,
 icon:'<path d="M20 60c-10-20 0-40 20-40s30 20 20 40" fill="none" stroke="currentColor" stroke-width="5"/><path d="M30 70h20" stroke="currentColor" stroke-width="6"/>',
 body:`<div class="two"><div class="stage"><svg id="c3svg" viewBox="0 0 640 300" aria-label="خزان الحمل"></svg><div style="padding:10px"><label class="step-text">🔥 شدة التسخين: <b id="c3v">0</b><input type="range" id="c3r" min="0" max="3" value="0" style="width:100%"></label></div></div>
  <div class="side"><div class="card"><div id="c3o" class="step-text">التسخين متوقف: لا حركة.</div></div></div></div><div class="card"><div id="c3q"></div></div>`,
 init(){let ph=0,tm=null,off=0;const P=[...Array(70)].map((_,i)=>({a:i/70*6.28*2,side:i%2}));
  const draw=()=>{const h=+$('#c3r').value;$('#c3v').textContent=['متوقف','ضعيف','متوسط','قوي'][h];let s=`<rect width="640" height="300" fill="#fed7aa"/><rect y="270" width="640" height="30" fill="#7f1d1d"/><text x="320" y="290" text-anchor="middle" ${AR} font-size="13" fill="#fff">لب الأرض (مصدر الحرارة)</text>`;
   s+=`<rect x="${10-off}" y="20" width="300" height="34" fill="#1e3a8a"/><rect x="${330+off}" y="20" width="300" height="34" fill="#1e3a8a"/><text x="${160-off}" y="42" text-anchor="middle" ${AR} font-size="13" fill="#fff">صفيحة</text><text x="${480+off}" y="42" text-anchor="middle" ${AR} font-size="13" fill="#fff">صفيحة</text>`;
   P.forEach(p=>{const cx=p.side?480:160,dir=p.side?-1:1,a=p.a+ph*dir,x=cx+Math.cos(a)*130*dir,y=160+Math.sin(a)*90;const hot=x>250&&x<390||Math.sin(a)>0.5;s+=`<circle cx="${x}" cy="${y}" r="5" fill="${hot?'#dc2626':'#f59e0b'}" opacity=".85"/>`;});
   if(h)s+=`<path d="M320 250 V80" stroke="#dc2626" stroke-width="4" stroke-dasharray="6 6" marker-end="url(#ca)"/><path d="M40 90 V230 M600 90 V230" stroke="#2563eb" stroke-width="4" stroke-dasharray="6 6" marker-end="url(#cb)"/><defs><marker id="ca" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="#dc2626"/></marker><marker id="cb" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="#2563eb"/></marker></defs>`;
   $('#c3svg').innerHTML=s;};
  $('#c3r').oninput=()=>{const h=+$('#c3r').value;clearInterval(tm);if(h){tm=setInterval(()=>{ph+=.01*h;off=Math.min(60,off+.08*h);draw();},40);$('#c3o').innerHTML='المادة الساخنة في الوسط تقل كثافتها فتصعد، ثم تبرد عند الأعلى وتتحرك أفقيًّا ساحبة الصفيحتين بعيدًا عن بعضهما، ثم تنزل عند الأطراف. كلما زاد التسخين أسرعت الحركة.';G.add(3,'lab3');}else $('#c3o').textContent='التسخين متوقف: لا حركة.';draw();};
  STN.lab3.stop=()=>clearInterval(tm);draw();
  mcq($('#c3q'),{q:'لماذا تصعد مادة الستار الساخنة إلى أعلى؟',o:['لأن كثافتها تقل عند تسخينها','لأن كثافتها تزداد','لأن الصفائح تسحبها','بسبب جاذبية القمر'],a:0},'lab3',()=>G.complete('lab3'));},
 leave(){STN.lab3.stop&&STN.lab3.stop();},explain:'<p>نموذج مقترح لفرضية تيارات الحمل.</p>'});
})();

/*@css c2.css*/
/*@include lab6.js*/
/*@include kit.js*/
/*@include skit.js*/
/* ===== الفصل الثاني · الدرس الثالث: الصفائح الأرضية وعلاقتها بالزلازل والبراكين — «أحجية الأرض» ===== */
(function(){
const {$,$$,G,STN,def,mcq,flips,match,sortGame,challenge,say,SFX,pic,slides,escape,auction,riddles,choiceBoard,solutions}=K;
const {fig,grid,reveal,ICO,lst,order,fill,tfx,label}=C6;const P=(n,c)=>[n,c];
const PIC='<path d="M6 30h30l6 10h32M6 50h22l8-10" fill="none" stroke="currentColor" stroke-width="5"/>';

def('intro',{n:'الافتتاحية',plan:3,icon:'<circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" stroke-width="5"/><path d="M14 30h20l6 10 10-4 16 6M20 56l14-6 8 8" fill="none" stroke="currentColor" stroke-width="4"/>',
 body:`<div class="hero"><div class="hero-photo">${pic('s01_bdbd1c64','صدع في سطح الأرض')}<span class="cap">الفصل الثاني: تغيرات الأرض.</span></div>
  <div><span class="eyebrow">أحجية الأرض</span><h2 class="hero-h">قشرة الأرض… قطع أحجية تتحرك!</h2>
   <p class="riddle">يعتقد العلماء أن الأرض تشكلت منذ نحو 4.54 مليار عام. فهل تغيّر شكل الأرض على مدى عمرها؟ ولماذا تتجمع الزلازل والبراكين في أماكن محددة؟</p>
   <p class="q">ما توقعك قبل أن تبدأ؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div>`,init(){}});

const GOALS=['توضح علاقة مواقع البراكين ومراكز الزلازل السطحية بحدود الصفائح.','تشرح كيف تسبب الحرارة في باطن الأرض حركة الصفائح.','تبين الفرق بين أنواع حدود الصفائح.'];
const TERMS=[{t:'اللابة (الحمم)',d:'الصهارة المتدفقة على سطح الأرض. (مراجعة المفردات)'},{t:'الصفيحة',d:'قطعة من الغلاف الصخري المكون من القشرة الأرضية وأعلى الستار.'},{t:'الغلاف المائع',d:'طبقة لدنة من الستار تتحرك عليها الصفائح.'},{t:'البقعة الساخنة',d:'مركز بركاني نشط يظهر بسبب ارتفاع غير عادي في درجة الحرارة في بقعة في أعماق الأرض، وقد يكون وسط الصفيحة.'},{t:'الغلاف الصخري',d:'نطاق صلب سمكه حوالي 100 كم، يتكون من القشرة الأرضية والجزء العلوي من الستار.'},{t:'حفرة الانهدام',d:'شقوق طويلة تتكون بين الصفائح المتباعدة.'}];
def('goals',{n:'الأهداف والمفردات',eyebrow:'الكتاب صفحة 66',title:'الأهداف والمفردات',goal:'تعرّف أهداف الدرس وأهميته ومفرداته.',plan:4,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol><div class="story mt"><b>أهمية الدرس:</b> توضح نظرية الصفائح التكتونية كيف تتشكل الكثير من المعالم الأرضية، وتنتج عن حركتها معظم الزلازل والبراكين.</div></div>
  <div class="card"><h3>مراجعة المفردات</h3><p class="step-text"><b>اللابة (الحمم):</b> الصهارة المتدفقة على سطح الأرض.</p><h3 class="mt">المفردات الجديدة</h3><ul class="tasks plain"><li>الصفيحة</li><li>الغلاف المائع</li><li>البقعة الساخنة</li><li>الغلاف الصخري</li><li>حفرة الانهدام</li></ul></div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المفردات</h2></div><div id="g6f"></div></div><div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2></div><div id="g6m"></div></div>`,
 init(){flips($('#g6f'),TERMS);this.reset();},reset(){match($('#g6m'),TERMS.slice(1).map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));}});

def('s1',{n:'1 · الصفائح الأرضية',eyebrow:'المحطة 1 · الكتاب صفحة 66',title:'نظرية الصفائح الأرضية وتركيبها',goal:'هل تغيّر شكل الأرض على مدى عمرها؟',plan:7,core:1,icon:PIC,
 body:`<div class="card" id="s1sl"></div><div class="two"><div class="card"><h3>عنون مقطع الصفائح</h3><div id="s1l"></div></div><div class="card"><h3>قارن: الصفائح المحيطية والقارية</h3><div id="s1s"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s1');};
  slides($('#s1sl'),[
   {k:'الصفائح الأرضية',t:'منذ 4.54 مليار عام',im:[P('s05_3a4745d3','الأرض')],html:'<p>يعتقد العلماء أن الأرض تشكلت منذ نحو <b>4.54 مليار عام</b>. فهل تغيّر شكل الأرض على مدى عمرها؟</p>'},
   {k:'نظرية الصفائح الأرضية',t:'1960م',im:[P('s06_81cae385','مقطع في الصفائح'),P('s06_9cd4801c','البراكين'),P('s06_78621292','الزلازل')],html:'<p>طوّر العلماء عام 1960م نظرية الصفائح الأرضية اعتمادًا على فرضيات سابقة وضعت لتفسير المعالم والأحداث الجيولوجية على سطح الأرض.</p><p>إن الغلاف الصخري المكون من القشرة الأرضية وأعلى الستار مقسم إلى قطع يسمى كل منها <b>صفيحة</b>. تتحرك هذه القطع على طبقة لدنة من الستار تسمى <b>الغلاف المائع</b>. وينتج عن هذه الحركة جميع المعالم والأحداث الجيولوجية، ومنها الزلازل والبراكين وتكوّن الجبال وتشكّل المحيطات.</p>'},
   {k:'تركيب الصفائح الأرضية',t:'الغلاف الصخري',im:[P('s07_9dadbf17','الغلاف الصخري')],html:'<p>تتكون الصفائح الأرضية من القشرة الأرضية والجزء العلوي من الستار، في ما يعرف بـ<b>الغلاف الصخري</b>، وهو عبارة عن نطاق صلب سمكه حوالي <b>100 كم</b>، وكثافته غالبًا أقل من كثافة المواد التي تقع أسفل منه. وتطفو الصفائح الصلبة، وتتحرك فوق الغلاف المائع.</p>'},
   {k:'تركيب الصفائح الأرضية',t:'محيطية وقارية',im:[P('s09_9dadbf17','الصفائح المحيطية والقارية'),P('s09_dd41d422','خريطة الصفائح')],html:'<p>تقسم الصفائح الأرضية إلى <b>صفائح محيطية</b> تقع أسفل المحيط، و<b>صفائح قارية</b> تشكّل القارات. وتتميز الصفائح المحيطية بأنها <b>أكبر كثافة وأقل سمكًا</b> من الصفائح القارية.</p>'}],'s1');
  label($('#s1l'),{fig:`<svg viewBox="0 0 260 200" style="max-width:280px"><rect width="260" height="40" fill="#bae6fd"/><path d="M0 40h120v20H0z" fill="#1d4ed8"/><path d="M120 30h140v40H120z" fill="#a3c76d"/><path d="M0 60h120v30H0zM120 70h140v30H120z" fill="#b07a43"/><rect y="100" width="260" height="40" fill="#f59e0b"/><rect y="140" width="260" height="60" fill="#dc2626" opacity=".7"/>${[['1',60,52],['2',190,52],['3',130,90],['4',130,124],['5',130,174]].map(([t,x,y])=>`<circle cx="${x}" cy="${y}" r="11" fill="#fff" stroke="#111"/><text x="${x}" y="${y+5}" text-anchor="middle" font-size="13" font-weight="800">${t}</text>`).join('')}</svg>`,slots:[['1','القشرة المحيطية'],['2','القشرة القارية'],['3','الغلاف الصخري (صفيحة)'],['4','الغلاف المائع'],['5','الستار']]},'s1',c);
  sortGame($('#s1s'),{bins:['الصفائح المحيطية','الصفائح القارية'],items:[['تقع أسفل المحيط',0],['أكبر كثافة',0],['أقل سمكًا',0],['تشكّل القارات',1],['أقل كثافة',1],['أكبر سمكًا',1]]},'s1',c);},
 explain:'<p>رسم المقطع المرقّم مبسط ومقترح.</p>'});

def('s2',{n:'2 · حدود الصفائح',eyebrow:'المحطة 2 · نشاط صفي · 5 دقائق · الكتاب صفحة 65–67',title:'حدود الصفائح المتحركة',goal:'تسمى الحدود الفاصلة بين هذه الصفائح حدود الصفائح. ما أنواعها؟',plan:6,core:1,icon:PIC,
 body:`<div class="two"><div class="card">${fig('s10_65207767','نشاط صفي: نمذجة حركة الصفائح بالطاولات',300)}<div class="tablewrap"><table class="c6-table"><thead><tr><th>نوع الحد</th><th>كيف ينتج؟</th></tr></thead><tbody><tr><td>1 · حدود تقارب</td><td>تنتج عندما تتحرك الصفائح بعضها نحو بعض وتتقارب أو تتصادم.</td></tr><tr><td>2 · حدود تباعد</td><td>تنتج عندما تتحرك الصفائح مبتعدة عن بعضها البعض.</td></tr><tr><td>3 · حدود جانبية (تحويلية)</td><td>تنتج عندما تتحرك الصفائح أو تنزلق بعضها بمحاذاة بعض.</td></tr></tbody></table></div><p class="step-text">وينجم عن حركة الصفائح الزلازل والبراكين.</p></div>
  <div class="card"><h3>ماذا قرأت؟ طابق نوع الحد بحركته</h3><div id="s2m"></div>${grid([['s11_10969790','أنواع حدود الصفائح']])}</div></div>`,
 init(){match($('#s2m'),[['حدود تقارب','الصفائح تتحرك بعضها نحو بعض وتتصادم'],['حدود تباعد','الصفائح تتحرك مبتعدة عن بعضها'],['حدود جانبية (تحويلية)','الصفائح تنزلق بعضها بمحاذاة بعض']],'s2',()=>G.complete('s2'));}});

def('s3',{n:'3 · أين تتشكل البراكين؟',eyebrow:'المحطة 3 · الكتاب صفحة 68–69',title:'أين تتشكل البراكين؟',goal:'معظم البراكين تتكون على حدود الصفائح، وتتشكل بطرق مختلفة.',plan:8,core:1,icon:'<path d="M8 70L32 26h16l24 44z" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="card" id="s3sl"></div><div class="card"><h3>صنّف: أين تتشكل هذه البراكين؟</h3><div id="s3s"></div></div>`,
 init(){slides($('#s3sl'),[
  {k:'أين تتشكل البراكين؟',t:'على حدود الصفائح',im:[P('s12_81ba44ab','خريطة البراكين وحدود الصفائح')],html:'<p>معظم البراكين تتكون على <b>حدود الصفائح</b>.</p><p>يتكون الغلاف الصخري للأرض من <b>13 صفيحة</b> رئيسة، وتنتج نشاطات جيولوجية مهمة عند تقارب الصفائح وتباعدها وانزلاق بعضها بمحاذاة بعض عند حدود الصفائح.</p>'},
  {k:'(1) عند حدود الصفائح المتباعدة',t:'حفر الانهدام',im:[P('s13_e1a45bcb','تباعد الصفائح'),P('s13_49195e00','حفرة الانهدام')],html:'<p>تتحرك الصفائح مبتعدًا بعضها عن بعض في أماكن الحدود المتباعدة، ومع تباعد الصفائح تتكون شقوق طويلة بينها تسمى <b>حفر الانهدام</b>.</p><p>تحوي حفر الانهدام شقوقًا تمثل ممرات تسهّل خروج الصهارة التي نشأت في الستار.</p>'},
  {k:'(2) عند حدود الصفائح المتقاربة',t:'غوص الصفائح',im:[P('s14_d0d08f18','غوص الصفيحة'),P('s14_74a12287','البراكين عند الغوص')],html:'<p>إذ تغوص الصفيحة المحيطية التي كثافتها أكبر أسفل الصفيحة الأخرى، فتتشكل البراكين تحت هذه الظروف. ومن أشكال البراكين التي تتكون عند هذه الحدود <b>البراكين المركبة</b>.</p><p>تؤدي حرارة الستار عندها إلى صهر جزء من الصفيحة الغاطسة والصخور التي تعلوها، مكونة الصهارة. تصعد هذه الصهارة إلى أعلى مكونة براكين على السطح.</p>'},
  {k:'(3) فوق البقع الساخنة',t:'البقع الساخنة',im:[P('s15_3679f162','البقعة الساخنة'),P('s15_28f4df5f','جزر هاواي')],html:'<p class="def"><b>البقع الساخنة:</b> مراكز بركانية نشطة، تظهر في بعض الأماكن على الأرض بسبب وجود ارتفاع غير عادي في درجة الحرارة في بقعة في أعماق الأرض، مما يتسبب في اندفاع كتل كبيرة من الصهارة (الماجما) للصعود.</p><p>ولا تكون في حدود الصفائح، بل قد تكون في وسطها، كالتي نتجت عنها <b>جزر هاواي</b> وسط صفيحة المحيط الهادئ.</p>'}],'s3');
  sortGame($('#s3s'),{bins:['مناطق الانهدام (تباعد)','مناطق غوص الصفائح (تقارب)','فوق البقع الساخنة'],items:[['شقوق طويلة تخرج منها الصهارة',0],['صفيحة محيطية تغوص تحت أخرى',1],['براكين مركبة',1],['جزر هاواي',2],['وسط الصفيحة بعيدًا عن حدودها',2]]},'s3',()=>G.complete('s3'));}});

def('s4',{n:'4 · الصفائح تسبب الزلازل',eyebrow:'المحطة 4 · الكتاب صفحة 69–70',title:'حركة الصفائح تسبب الزلازل',goal:'إذا قارنت بين الصورتين فستلاحظ العلاقة بين المواقع السطحية للزلازل وحدود الصفائح.',plan:5,core:1,icon:'<path d="M4 40h12l6-16 8 32 8-40 8 48 8-24 6 12h16" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="card">${grid([['s16_81ba44ab','حدود الصفائح'],['s16_c7a9a3fe','مواقع الزلازل']])}<p class="step-text">تحدث الزلازل عند: حدود التباعد ✓ · حدود التقارب ✓ · حدود التحول ✓</p><p class="step-text">إذا قارنت بين الصورتين فستلاحظ العلاقة بين المواقع السطحية للزلازل وحدود الصفائح. وتنتج عن حركة الصفائح قوى تعمل على توليد الطاقة المسببة للزلازل.</p></div>
  <div class="card">${fig('s17_c7a9a3fe','خريطة تمثل مواقع الزلازل التي حدثت بين عامي 1990–2000م',360)}<div id="s4q"></div></div></div>`,
 init(){mcq($('#s4q'),{q:'ماذا تلاحظ عند مقارنة خريطة الزلازل بخريطة حدود الصفائح؟',o:['تتركز الزلازل على امتداد حدود الصفائح','تتوزع الزلازل عشوائيًّا','تحدث الزلازل وسط القارات فقط','لا تحدث زلازل في المحيطات'],a:0},'s4',()=>G.complete('s4'));}});

def('ev1',{n:'تقويم 1–4',eyebrow:'تقويم · الأسئلة 1–4',title:'تقويم: البراكين والزلازل وحدود الصفائح',goal:'أسئلة التقويم كما في العرض.',plan:5,core:1,icon:ICO.check,
 body:'<div class="two"><div class="card"><h3>1 · أين تتشكل البراكين؟</h3><div id="h1"></div></div><div class="card"><h3>2</h3><div id="h2"></div></div></div><div class="card"><h3>3</h3><div id="h3"></div></div><div class="card"><h3>4 · صح أم خطأ</h3><div id="h4"></div></div>',
 init(){let n=0;const c=()=>{if(++n>=4)G.complete('ev1');};
  order($('#h1'),['في مناطق الانهدام (مناطق الشقوق الناتجة عن التباعد)','في مناطق غوص الصفائح (المناطق التي تغوص فيها صفيحة تحت أخرى عند التقارب)','فوق البقع الساخنة'],'ev1',c,'كما في العرض: ثلاثة أماكن.');
  mcq($('#h2'),{q:'عندما تبتعد الصفائح بعضها عن بعض يتكون فيما بينها شقوق طويلة تسمى:',o:['البقع الساخنة','حفر الانهدام','غوص الصفائح','الحرات'],a:1},'ev1',c);
  mcq($('#h3'),{q:'تحدث معظم الزلازل والبراكين:',o:['داخل الصفائح','عند خط الاستواء','في المحيطات','عند حدود الصفائح'],a:3},'ev1',c);
  tfx($('#h4'),[['عند حدود الصفائح المتباعدة تتحرك الصفائح مبتعدًا بعضها عن بعض.',true],['تتميز الصفائح <u>القارية</u> بأنها أكبر كثافة وأقل سمكًا من الصفائح المحيطية.',false,'المحيطية',['المحيطية','الصلبة','القديمة']],['جزر هاواي من الأمثلة على البراكين التي تتكون بفعل البقع الساخنة.',true],['يتكون الغلاف الصخري للأرض من 13 صفيحة رئيسة.',true]],'ev1',c);}});

def('s5',{n:'5 · صفائح الأرض وباطنها',eyebrow:'المحطة 5 · الكتاب صفحة 71',title:'كيف توصل العلماء إلى معرفة مكونات باطن الأرض؟',goal:'توصل العلماء إلى معرفة الكثير عن باطن الأرض والصفائح من خلال دراسة الموجات الزلزالية.',plan:8,core:1,icon:'<circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="40" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="40" cy="40" r="8" fill="currentColor"/>',
 body:`<div class="card" id="s5sl"></div><div class="card"><h3>تطبيق الرياضيات: زمن وصول موجات P</h3><div class="two"><div><p class="step-text">تختلف سرعة موجات P تبعًا لكثافة الوسط الذي تنتقل خلاله في باطن الأرض.</p><div class="tablewrap"><table class="c6-table"><thead><tr><th>الوسط</th><th>الكثافة</th><th>سرعة موجة P</th></tr></thead><tbody><tr><td>القشرة</td><td>2.8 جم/سم³</td><td>6 كم/ث</td></tr><tr><td>الستار العلوي</td><td>3.3 جم/سم³</td><td>8 كم/ث</td></tr></tbody></table></div>
   <div class="story mt"><b>مثال محلول:</b> كيف يمكنك حساب الزمن الذي تستغرقه موجات P للانتقال عبر 100 كم من قشرة الأرض؟<br>المعطيات: السرعة = 6 كم/ث ، المسافة = 100 كم · المطلوب: الزمن<br>الزمن = المسافة ÷ السرعة = 100 ÷ 6 = <b>16.7 ثانية</b></div></div>
   <div><h3>مسائل تدريبية · خمس دقائق</h3><div id="s5c1"></div><div id="s5c2" class="mt"></div></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('s5');};
  slides($('#s5sl'),[
   {k:'صفائح الأرض وباطنها',t:'الموجات الزلزالية',im:[P('s22_fdcd2ec6','طبقات الأرض'),P('s22_f39c9295','باطن الأرض')],html:'<p>لقد توصل العلماء إلى معرفة الكثير عن باطن الأرض والصفائح الأرضية من خلال دراسة <b>الموجات الزلزالية</b>.</p><p>تختلف سرعة انتقال الموجات الزلزالية حسب الوسط الذي تمر فيه (صلب – سائل – غاز)، وكيفية انتقالها في طبقات الأرض مكّنت العلماء من رسم المناطق الرئيسة للأرض.</p>'},
   {k:'على سبيل المثال',t:'اكتشاف الغلاف المائع (اللدن)',im:[P('s23_092ec8f6','طبقات الأرض'),P('s23_703d172b','سرعة الموجات')],html:'<p>تم اكتشاف الغلاف المائع (اللدن) عندما لاحظ العلماء أن <b>سرعة الموجات الزلزالية تنخفض</b> عندما تتخطى قاع الغلاف الصخري.</p><p>وتشكّل هذه الطبقة المنصهرة جزئيًّا طبقة أكثر سخونة وأقل صلابة، مما يسهل حركة الصفائح الصخرية الباردة فوقها.</p>'}],'s5');
  K.calcQ($('#s5c1'),{p:'1. احسب الزمن الذي تستغرقه موجات P للانتقال مسافة 300 كم في الستار العلوي.',v:37.5,unit:'ثانية',given:'المسافة = 300 كم ، السرعة = 8 كم/ث',want:'الزمن = ؟',law:'الزمن = المسافة ÷ السرعة',sol:'300 ÷ 8 = 37.5 ثانية'},'s5',c);
  K.calcQ($('#s5c2'),{p:'2. ما الزمن الذي تستغرقه موجات P للانتقال 500 كم في القشرة؟ (منزلة عشرية واحدة)',v:83.3,unit:'ثانية',given:'المسافة = 500 كم ، السرعة = 6 كم/ث',want:'الزمن = ؟',law:'الزمن = المسافة ÷ السرعة',sol:'500 ÷ 6 ≈ 83.3 ثانية'},'s5',c);},
 explain:'<p>حلول المسائل التدريبية محسوبة بالقانون نفسه في مثال الكتاب (لم ترد في العرض).</p>'});

def('s6',{n:'6 · الصفيحة العربية',eyebrow:'المحطة 6 · الكتاب صفحة 72',title:'حركة الصفائح والنشاط البركاني في المملكة العربية السعودية',goal:'المس حدود الصفيحة العربية لتتعرف نوع كل حد.',plan:7,core:1,icon:'<path d="M20 20l30-8 14 20-8 30-22 6-16-24z" fill="none" stroke="currentColor" stroke-width="5"/>',
 body:`<div class="two"><div class="stage"><svg id="ar" viewBox="0 0 400 360" aria-label="الصفيحة العربية" style="direction:ltr"></svg></div>
  <div class="side"><div class="card"><div id="arfb" class="step-text">المس حدًّا من حدود الصفيحة العربية.</div></div><div class="card">${lst(['يتركز تأثير حركة الصفائح الأرضية في المملكة العربية السعودية حول حواف الصفيحة العربية.','يتركز في الجهة الغربية على امتداد ساحل البحر الأحمر؛ حيث تمثل حدود الصفيحة العربية مع الصفيحة الإفريقية.','يتركز النشاط الزلزالي في المملكة على امتداد البحر الأحمر وحتى خليج العقبة، حيث تمثل هذه المناطق حدود تباعد بين الصفيحة العربية والصفيحة الإفريقية.'])}</div></div></div>
  <div class="card"><h3>ماذا قرأت؟ ما حدود الصفائح المحيطة بالصفيحة العربية؟</h3><div id="s6m"></div></div>`,
 init(){const B=[{id:'rs',n:'البحر الأحمر',t:'حدود تباعد',c:'#16a34a',d:'M90 70 L150 170 L200 280 L230 300',x:120,y:190,txt:'حدود تباعد مع الصفيحة الإفريقية على امتداد البحر الأحمر: تتباعد الصفيحتان ويتسع البحر الأحمر ببطء.'},{id:'aq',n:'خليج العقبة والبحر الميت',t:'حدود جانبية (تحويلية)',c:'#2563eb',d:'M90 70 L100 20',x:60,y:40,txt:'حدود جانبية تنزلق فيها الصفيحتان بمحاذاة بعضهما على امتداد خليج العقبة والبحر الميت.'},{id:'za',n:'جبال زاغروس',t:'حدود تقارب',c:'#dc2626',d:'M110 20 L230 40 L330 130 L370 200',x:280,y:70,txt:'حدود تقارب مع صفيحة أوراسيا على امتداد الجانب الشرقي والشمالي، وتكونت جبال زاغروس.'},{id:'ad',n:'خليج عدن',t:'حدود تباعد',c:'#16a34a',d:'M230 300 L360 260',x:300,y:300,txt:'حدود تباعد في خليج عدن جنوب الصفيحة.'}];const seen=new Set();
  const draw=sel=>{let s=`<rect width="400" height="360" fill="#bfdbfe"/><path d="M100 20 L230 40 L330 130 L370 200 L360 260 L230 300 L200 280 L150 170 L90 70z" fill="#fde68a" stroke="#a16207"/><text x="230" y="180" text-anchor="middle" ${'font-family="IBM Plex Sans Arabic"'} font-size="18" font-weight="800" fill="#92400e">الصفيحة العربية</text><text x="50" y="240" ${'font-family="IBM Plex Sans Arabic"'} font-size="14" fill="#334155">الصفيحة الإفريقية</text><text x="250" y="20" ${'font-family="IBM Plex Sans Arabic"'} font-size="14" fill="#334155">صفيحة أوراسيا</text>`;
   B.forEach(b=>s+=`<path class="bd" data-b="${b.id}" d="${b.d}" stroke="${b.c}" stroke-width="${sel===b.id?12:8}" fill="none" stroke-linecap="round" style="cursor:pointer"/>`);$('#ar').innerHTML=s;
   $$('#ar .bd').forEach(p=>p.onclick=()=>{const b=B.find(x=>x.id===p.dataset.b);seen.add(b.id);SFX.pop();draw(b.id);say($('#arfb'),'info',`<b>${b.n}:</b> ${b.t}. ${b.txt}`);if(seen.size===4)G.add(4,'s6');});};draw();
  match($('#s6m'),[['حدود تباعد','مع صفيحة إفريقيا على امتداد البحر الأحمر'],['حدود جانبية (تحويلية)','على امتداد خليج العقبة'],['حدود تقارب','مع صفيحة أوراسيا على امتداد الجانب الشرقي والشمالي']],'s6',()=>G.complete('s6'));},
 explain:'<p><b>تصحيح:</b> ورد في شريحة العرض «حدود جانبية مع صفيحة إفريقيا على امتداد البحر الأحمر»، بينما ذكرت الشريحة السابقة لها أن البحر الأحمر حدود تباعد. الصواب: البحر الأحمر حدود تباعد، والحدود الجانبية على امتداد خليج العقبة والبحر الميت، وحدود التقارب مع أوراسيا. الخريطة مبسطة ومقترحة.</p>'});

def('s7',{n:'7 · ما الذي يحرك الصفائح؟',eyebrow:'المحطة 7 · الكتاب صفحة 72',title:'ما الذي يحرك الصفائح؟ تيارات الحمل',goal:'هناك العديد من الفرضيات حول مصدر الطاقة المحركة للصفائح، إحداها: تيارات الحمل.',plan:6,core:1,icon:'<path d="M20 60c-10-20 0-40 20-40s30 20 20 40" fill="none" stroke="currentColor" stroke-width="5"/><path d="M56 56l4 8 6-8" fill="currentColor"/>',
 body:`<div class="two"><div class="card">${grid([['s29_7ba552ba','تيارات الحمل في الستار'],['s29_fbb365f2','باطن الأرض']])}<p class="step-text">هناك العديد من الفرضيات حول مصدر الطاقة المحركة للصفائح، تنص إحداها على أن مادة الستار يتم تسخينها بوساطة لب الأرض، فتقل كثافتها، وتصعد إلى أعلى، ثم تبرد هذه المادة، فتنزل إلى أسفل في اتجاه اللب، مكونة <b>تيارات الحمل</b>.</p><p class="def">تيارات الحمل في باطن الأرض تؤدي إلى تحريك الصفائح.</p></div>
  <div class="card"><h3>رتّب دورة تيار الحمل</h3><div id="s7o"></div></div></div>`,
 init(){order($('#s7o'),['يسخّن لب الأرض مادة الستار','تقل كثافة المادة الساخنة فتصعد إلى أعلى','تبرد المادة قرب الغلاف الصخري فتزداد كثافتها','تنزل المادة إلى أسفل في اتجاه اللب'],'s7',()=>G.complete('s7'),'دورة تيار الحمل كاملة؛ وهي تجرّ الصفائح فوقها.');}});

def('ev2',{n:'تقويم 5–6',eyebrow:'تقويم · الأسئلة 5–6',title:'تقويم: توقّع وارسم',goal:'أسئلة التقويم كما في العرض.',plan:4,core:1,icon:ICO.check,
 body:`<div class="two"><div class="card"><h3>5 · توقّع على أي نوع من حدود الصفائح يحدث نشاط بركاني مصاحب لحفر الانهدام؟</h3><div id="q5"></div></div><div class="card"><h3>6 · ارسم أسهمًا لإظهار اتجاه حركة الصفيحة الأرضية لكل نوع</h3><div id="q6"></div></div></div>`,
 init(){let n=0;const c=()=>{if(++n>=2)G.complete('ev2');};
  mcq($('#q5'),{q:'نوع الحد:',o:['عند حدود الصفائح المتباعدة','عند حدود الصفائح المتقاربة','عند الحدود الجانبية','وسط الصفيحة'],a:0},'ev2',c);
  const T=[['حدود تقارب','→ ←'],['حدود تباعد','← →'],['حدود جانبية','↑ ↓']];const box=$('#q6');const opts=['→ ←','← →','↑ ↓'];let ok=0;
  box.innerHTML=T.map(([n],i)=>`<div class="c6-q"><b>${i+1}. ${n}</b><div class="c6-chips">${opts.map(o=>`<button class="c6-chip" type="button" data-t="${i}" data-o="${o}" style="direction:ltr;font-size:1.3rem">${o}</button>`).join('')}</div></div>`).join('')+'<div class="qfb"></div>';
  box.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const i=+b.dataset.t;if(b.dataset.o===T[i][1]){b.setAttribute('aria-pressed','true');box.querySelectorAll(`[data-t="${i}"]`).forEach(x=>x.disabled=true);G.good();G.add(3,'ev2');if(++ok===3){say(box.querySelector('.qfb'),'ok','أحسنت! تقارب: تتجه الصفيحتان نحو بعض، تباعد: تبتعدان، جانبية: تنزلقان بمحاذاة بعض.');c();}}else{G.bad();b.disabled=true;}});}});

def('sum',{n:'الخلاصة',eyebrow:'الخلاصة · الكتاب صفحة 73',title:'الخلاصة',goal:'أهم أفكار الدرس.',plan:2,icon:ICO.doc,
 body:`<div class="two"><div class="card"><h3>حدود الصفائح المتحركة</h3>${lst(['ينقسم غلاف الأرض الصخري إلى قطع تسمى صفائح، يتحرك بعضها بالنسبة إلى بعض.'])}<h3 class="mt">أين تتشكل البراكين؟</h3>${lst(['تتحرك الصفائح مبتعدة عن بعضها عند الحدود المتباعدة مكوّنة ثورانًا بركانيًّا بين الشقوق.','تتصادم الصفائح عند حدود الصفائح المتقاربة.','يتشكل الكثير من البراكين عند حدود الصفائح المتقاربة.','قد تتشكل البراكين على امتداد حفر الانهدام وفوق البقع الساخنة، وحيث تغوص الصفائح بعضها أسفل بعض.'])}</div>
  <div class="card"><h3>حركة الصفائح تسبب الزلازل</h3>${lst(['تحدث الزلازل عادة على حدود الصفائح.','يستفاد من الموجات الزلزالية في معرفة خصائص باطن الأرض.','قد تؤدي تيارات الحمل إلى تحريك الصفائح.'])}</div></div>`,enter(){G.complete('sum');}});
def('self',{n:'اختبر نفسك',eyebrow:'الواجب · الكتاب صفحة 73 · التسليم يوم الخميس',title:'اختبر نفسك',goal:'إجابات نموذجية مقترحة.',plan:3,icon:ICO.check,body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'1 · حدّد',q:'ما نوع حدود الصفائح التي تشكّل عندها بركان حرة رهط؟',a:[['الإجابة','حدود تباعد؛ فحرة رهط من نشاط بركاني مرتبط بتباعد الصفيحة العربية عن الإفريقية (البحر الأحمر).']]},
  {k:'2 · توقع',q:'على أي نوع من حدود الصفائح يحدث نشاط بركاني مصاحب لحفر الانهدام؟',a:[['الإجابة','عند حدود الصفائح المتباعدة.']]},
  {k:'3 · اشرح',q:'كيف تكوّنت براكين هاواي؟',a:[['الإجابة','فوق بقعة ساخنة وسط صفيحة المحيط الهادئ؛ تصعد الصهارة من أعماق الأرض، ومع تحرك الصفيحة فوق البقعة تتكون سلسلة من الجزر البركانية.']]},
  {k:'4 · السبب والنتيجة',q:'لماذا تكون الزلازل ذات البؤر العميقة مصاحبة للحدود المتقاربة؟',a:[['الإجابة','لأن الصفيحة المحيطية تغوص إلى أعماق كبيرة تحت الصفيحة الأخرى، فتحدث الكسور والزلازل على امتداد الصفيحة الغاطسة في العمق.']]},
  {k:'5 · التفكير الناقد',q:'عندما تغطس صفيحة أسفل صفيحة أخرى عند حدود التقارب تنزل الرسوبيات الغنية بالماء والبازلت إلى أعماق كبيرة في الستار. اشرح كيف تساعد المياه على تكوّن البراكين.',a:[['الإجابة','الماء يخفض درجة انصهار الصخور في الستار، فتنصهر جزئيًّا وتتكون صهارة أقل كثافة تصعد إلى السطح مكونة براكين.']]}],'self',()=>G.complete('self'));},reset(){STN.self.s.reset();},explain:'<p>إجابات نموذجية مقترحة.</p>'});

def('x1',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'أحجية الصفائح ومزاد المعرفة',goal:'غرفة الهروب ثم المزاد.',plan:5,icon:ICO.lock,
 body:'<div class="card"><div id="x1e"></div></div><div class="card"><div class="nb-head"><h2>🔨 مزاد المعرفة</h2></div><div id="x1a"></div></div>',
 init(){STN.x1.e=escape($('#x1e'),{title:'أحجية الصفائح',story:'تبعثرت قطع أحجية الأرض! أجيبوا لتعيدوا تركيبها.',secs:300,locks:[{q:'عدد الصفائح الرئيسة:',o:['13','7','18','3'],a:0,code:'1'},{q:'سُمك الغلاف الصخري تقريبًا:',o:['100 كم','10 كم','1000 كم','1 كم'],a:0,code:'3'},{q:'جزر هاواي تكونت فوق:',o:['بقعة ساخنة','حفرة انهدام','حد جانبي','غوص'],a:0,code:'7'},{q:'تطورت نظرية الصفائح عام:',o:['1960م','1860م','2000م','1700م'],a:0,code:'2'}],outro:'أعدتم تركيب الأحجية!'},'x1');
  STN.x1.a=auction($('#x1a'),[['الصفائح المحيطية أكبر كثافة من القارية.',true],['تحدث معظم الزلازل داخل الصفائح.',false,'عند حدود الصفائح.'],['تيارات الحمل قد تحرك الصفائح.',true],['البحر الأحمر حدود تقارب.',false,'حدود تباعد.'],['تنخفض سرعة الموجات الزلزالية في الغلاف المائع.',true],['البقع الساخنة توجد دائمًا عند حدود الصفائح.',false,'قد تكون وسط الصفيحة.']],'x1');},reset(){STN.x1.e.reset();STN.x1.a.reset();}});
def('x2',{n:'إثرائي · من أنا؟',eyebrow:'إثرائي',title:'من أنا؟ ولوحة الخيارات',goal:'ألغاز ولوحة خيارات.',plan:4,icon:ICO.lens,
 body:'<div class="card"><div id="x2r"></div></div><div class="card"><div id="x2cb"></div></div>',
 init(){riddles($('#x2r'),[{clues:['أنا طبقة في الستار.','أنا لدنة وأكثر سخونة.','تتحرك الصفائح فوقي.'],o:['الغلاف المائع','الغلاف الصخري','القشرة','اللب'],a:0},{clues:['أنا مركز بركاني.','قد أكون وسط الصفيحة.','كوّنت جزر هاواي.'],o:['البقعة الساخنة','حفرة الانهدام','الصدع','الحد الجانبي'],a:0},{clues:['أنا شقوق طويلة.','أتكون عند تباعد الصفائح.','تخرج مني الصهارة.'],o:['حفر الانهدام','غوص الصفائح','البقع الساخنة','الجبال'],a:0},{clues:['أنا تيارات.','أتكون من تسخين مادة الستار.','قد أحرك الصفائح.'],o:['تيارات الحمل','الموجات الزلزالية','التسونامي','الرياح'],a:0}],'x2');
  STN.x2.cb=choiceBoard($('#x2cb'),[{ic:'🧩',t:'نمذجة',kind:'تجربة',p:'قص خريطة العالم إلى قطع على حدود الصفائح وحاول تركيبها.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'الصفائح تطفو فوق:',o:['الغلاف المائع','اللب الداخلي','الغلاف الجوي','المحيط'],a:0},{ic:'🧮',t:'احسب',kind:'حساب',p:'زمن موجة P لمسافة 240 كم في الستار العلوي (8 كم/ث)؟',v:30,unit:'ثانية',law:'الزمن = المسافة ÷ السرعة',sol:'240 ÷ 8 = 30 ثانية'},
   {ic:'❓',t:'سؤال',kind:'اختيار',q:'الحدود مع أوراسيا:',o:['تقارب','تباعد','جانبية','لا حدود'],a:0},{ic:'🎨',t:'ارسم',kind:'رسم',p:'ارسم دورة تيار الحمل في الستار بالأسهم.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'البراكين المركبة تتكون عند:',o:['غوص الصفائح','البقع الساخنة فقط','حفر الانهدام فقط','وسط القارات'],a:0},
   {ic:'🗺',t:'خريطة',kind:'بحث',p:'حدّد على خريطة العالم ثلاث مناطق زلزالية نشطة ونوع حدودها.'},{ic:'❓',t:'سؤال',kind:'اختيار',q:'اكتُشف الغلاف المائع لأن سرعة الموجات فيه:',o:['تنخفض','تزداد','تتوقف','لا تتغير'],a:0},{ic:'✍️',t:'اكتب',kind:'كتابة',p:'اكتب فقرة: لماذا تتركز الزلازل في غرب المملكة؟'}],'x2',()=>G.complete('x2'));},reset(){STN.x2.cb.reset();}});

def('ch',{n:'تحدي العلماء',plan:3,icon:ICO.cup,eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من تقويم العرض.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'حفر الانهدام',q:'عندما تبتعد الصفائح بعضها عن بعض يتكون فيما بينها شقوق طويلة تسمى:',o:['البقع الساخنة','حفر الانهدام','غوص الصفائح','الحرات'],a:1},
  {k:'الحدود',q:'تحدث معظم الزلازل والبراكين:',o:['داخل الصفائح','عند خط الاستواء','في المحيطات','عند حدود الصفائح'],a:3},
  {k:'الكثافة',q:'الصفائح الأكبر كثافة والأقل سمكًا:',o:['المحيطية','القارية','كلاهما','لا شيء'],a:0},
  {k:'الحمل',q:'ما الذي يحرك الصفائح وفق إحدى الفرضيات؟',o:['تيارات الحمل في الستار','الرياح','المد والجزر','دوران القمر'],a:0},
  {k:'P',t:'calc',p:'زمن موجات P لمسافة 300 كم في الستار العلوي (8 كم/ث):',v:37.5,unit:'ثانية',law:'الزمن = المسافة ÷ السرعة',sol:'300 ÷ 8 = 37.5 ث'},
  {k:'البراكين',t:'multi',q:'اختر أماكن تشكل البراكين:',items:[['مناطق الانهدام',1],['مناطق غوص الصفائح',1],['فوق البقع الساخنة',1],['وسط الصحاري دائمًا',0]]},
  {k:'التوقع',q:'النشاط البركاني المصاحب لحفر الانهدام يحدث عند:',o:['حدود الصفائح المتباعدة','الحدود المتقاربة','الحدود الجانبية','وسط الصفيحة'],a:0}],'ch');},reset(){STN.ch.c.reset();}});

C6.plan({intro:{s:['poe','brain'],g:'١–٣',sk:'التنبؤ',ev:'سؤال التوقع'},goals:{s:['frayer'],g:'١–٣',sk:'التذكر',ev:'المطابقة'},s1:{s:['analogy','venn'],g:'٢',sk:'المقارنة',ev:'عنونة المقطع'},s2:{s:['role','coop'],g:'٣',sk:'النمذجة',ev:'مطابقة الحدود'},lab1:{s:['poe','inq'],g:'١ و٣',sk:'التجريب والاستنتاج',ev:'محاكي الحدود'},
 s3:{s:['jigsaw','cards'],g:'١',sk:'التصنيف',ev:'أماكن البراكين'},lab2:{s:['inq','poe'],g:'١',sk:'الاستنتاج',ev:'سلسلة الجزر'},s4:{s:['disc','tps'],g:'١',sk:'المقارنة',ev:'سؤال المقارنة'},ev1:{s:['spot','cards'],g:'١ و٣',sk:'التطبيق',ev:'تقويم 1–4'},
 s5:{s:['prob','heads'],g:'٢',sk:'الحساب',ev:'المسائل التدريبية'},s6:{s:['disc','cmap'],g:'١ و٣',sk:'قراءة الخرائط',ev:'حدود الصفيحة العربية'},s7:{s:['time','analogy'],g:'٢',sk:'الترتيب',ev:'دورة تيار الحمل'},lab3:{s:['poe','inq'],g:'٢',sk:'التجريب',ev:'خزان الحمل'},ev2:{s:['cards'],g:'٣',sk:'التطبيق',ev:'تقويم 5–6'},
 sum:{s:['tl'],g:'١–٣',sk:'التلخيص',ev:'إشارة المرور'},self:{s:['heads','sticks'],g:'١–٣',sk:'التفكير الناقد',ev:'اختبر نفسك'},x1:{s:['game','champ'],g:'١–٣',sk:'الاستدعاء',ev:'الهروب والمزاد'},x2:{s:['who','game'],g:'١–٣',sk:'الاستنتاج',ev:'من أنا؟'},ch:{s:['exit'],g:'١–٣',sk:'التقويم الختامي',ev:'تحدي العلماء'}},'g9c2l3');
K.boot({chapter:'الفصل الثاني: تغيرات الأرض',chapterShort:'الفصل الثاني',title:'أحجية الأرض',lesson:'الدرس الثالث: الصفائح الأرضية وعلاقتها بالزلازل والبراكين',accent:'#4d7c0f',accentDark:'#a3e635',hook:'قشرة الأرض… قطع أحجية تتحرك!',
 riddle:'لماذا تتجمع الزلازل والبراكين في أماكن محددة؟',predict:{o:['لأن الغلاف الصخري مقسم إلى صفائح تتحرك، وتحدث الزلازل والبراكين عند حدودها','بسبب المناخ','لأن الأرض ثابتة لا تتحرك'],a:0},
 answer:'الغلاف الصخري مقسم إلى صفائح تتحرك فوق الغلاف المائع بفعل تيارات الحمل، وعند حدودها (تقارب، تباعد، جانبية) تتولد القوى المسببة للزلازل وتتكون البراكين، إضافة إلى البقع الساخنة.',
 finalTitle:'مبارك! أكملت أحجية الأرض',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 73 · التسليم يوم الخميس.',
 concepts:[{n:'الصفيحة',t:'قطعة من الغلاف الصخري (القشرة وأعلى الستار).',ic:'<path d="M6 20h20l6 8h12M6 32h16" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'الغلاف المائع',t:'طبقة لدنة تتحرك فوقها الصفائح.',ic:'<path d="M4 28c8-6 14 6 20 0s12 6 20 0" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'حدود الصفائح',t:'تقارب، تباعد، جانبية (تحويلية).',ic:'<path d="M6 24h12M30 24h12M14 18l6 6-6 6M34 18l-6 6 6 6" fill="none" stroke="var(--accent)" stroke-width="3"/>'},{n:'أماكن البراكين',t:'الانهدام، غوص الصفائح، البقع الساخنة.',ic:'<path d="M8 40L20 16h8l12 24z" fill="var(--accent)"/>'},{n:'تيارات الحمل',t:'تسخين مادة الستار وصعودها ثم بردها ونزولها.',ic:'<path d="M14 36c-8-14 0-26 10-26s18 12 10 26" fill="none" stroke="var(--accent)" stroke-width="4"/>'},{n:'الصفيحة العربية',t:'تباعد في البحر الأحمر، وجانبية في العقبة، وتقارب مع أوراسيا.',ic:'<path d="M14 10l20 4 8 14-6 14-14 2-10-16z" fill="var(--accent)"/>'}]});
$$('.top h1').forEach(h=>h.dataset.sym='🧩');
})();

