
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

/* ===== تجارب افتراضية إضافية — الخواص والتغيرات الفيزيائية ===== */
(function(){
const {$,$$,G,STN,def,mcq,say,SFX,css,sortGame}=K;

/* ---------- objects drawn in SVG ---------- */
const OBJ=[
 {id:'nail',n:'مسمار حديد',color:'رمادي فضي',shape:'أسطواني مدبب',L:'7 سم',m:'12 جم',lus:1,mag:1,
  svg:'<rect x="-6" y="-48" width="12" height="80" fill="#8a949b"/><rect x="-16" y="-56" width="32" height="10" rx="3" fill="#6d777e"/><path d="M-6 32 L0 52 L6 32z" fill="#8a949b"/><rect x="-4" y="-44" width="3" height="74" fill="#fff" opacity=".45"/>'},
 {id:'wood',n:'مكعب خشب',color:'بني',shape:'مكعب',L:'4 سم',m:'38 جم',lus:0,mag:0,
  svg:'<polygon points="-30,-14 -14,-30 34,-30 18,-14" fill="#d6a46b"/><rect x="-30" y="-14" width="48" height="48" fill="#b98545"/><polygon points="18,-14 34,-30 34,18 18,34" fill="#8f6230"/><path d="M-24 0h36M-24 16h36" stroke="#8f6230" stroke-width="2" opacity=".5"/>'},
 {id:'cu',n:'شريط نحاس',color:'برتقالي محمر',shape:'شريط مسطح',L:'10 سم',m:'9 جم',lus:1,mag:0,
  svg:'<path d="M-44 10 L40 -18 L48 -6 L-36 22z" fill="#c7743e"/><path d="M-40 12 L42 -16" stroke="#f3c6a0" stroke-width="3"/>'},
 {id:'glass',n:'كرة زجاجية',color:'شفافة',shape:'كروي',L:'قطرها 2 سم',m:'10 جم',lus:0,mag:0,
  svg:'<circle r="24" fill="rgba(160,215,240,.45)" stroke="#6f9fb4" stroke-width="2"/><ellipse cx="-8" cy="-9" rx="7" ry="4" fill="#fff" opacity=".8"/>'},
 {id:'rub',n:'كرة مطاطية',color:'أحمر',shape:'كروي',L:'قطرها 4 سم',m:'30 جم',lus:0,mag:0,
  svg:'<circle r="30" fill="#d9483b"/><path d="M-30 0 Q0 18 30 0" stroke="#a52f24" stroke-width="3" fill="none"/><ellipse cx="-10" cy="-12" rx="8" ry="5" fill="#fff" opacity=".35"/>'}];
const TOOLS=[{id:'lens',n:'العدسة',ic:'🔍',p:['color','shape'],t:'اللون والشكل'},{id:'ruler',n:'المسطرة',ic:'📏',p:['L'],t:'الطول'},{id:'bal',n:'الميزان',ic:'⚖️',p:['m'],t:'الكتلة'},{id:'lamp',n:'المصباح',ic:'🔦',p:['lus'],t:'اللمعان الفلزي'},{id:'mag',n:'المغناطيس',ic:'🧲',p:['mag'],t:'المغناطيسية'}];
const COLS=[['color','اللون'],['shape','الشكل'],['L','الطول'],['m','الكتلة'],['lus','لمعان فلزي'],['mag','ينجذب للمغناطيس']];
const val=(o,k)=>k==='lus'?(o.lus?'نعم':'لا'):k==='mag'?(o.mag?'نعم':'لا'):o[k];

def('lab1',{after:'s1',n:'🧪 مختبر المحقق',eyebrow:'تجربة افتراضية',title:'مختبر المحقق: افحص الخواص الفيزيائية بالأدوات',goal:'اختر أداة، ثم المس الجسم لتفحصه. سجّل الخواص الفيزيائية لكل جسم دون أن تغيّر المادة.',plan:6,core:1,
 icon:'<circle cx="34" cy="34" r="20" fill="none" stroke="currentColor" stroke-width="6"/><path d="M48 48l20 20" stroke="currentColor" stroke-width="9" stroke-linecap="round"/>',
 body:`<div class="two"><div class="stage"><svg id="l1svg" viewBox="0 0 640 300" aria-label="طاولة عليها خمسة أجسام"></svg>
   <div class="toolbar" id="l1tools" style="grid-template-columns:repeat(5,minmax(0,1fr))"></div><p class="hint-line" id="l1hint">اختر أداة من الأسفل، ثم المس جسمًا على الطاولة.</p></div>
  <div class="side"><div class="card" id="l1card"><h3>نتيجة الفحص</h3><p class="step-text muted">لم تفحص شيئًا بعد.</p></div><div class="card"><h3>صنّف بعد الفحص</h3><div id="l1sort"></div></div></div></div>
  <div class="card"><div class="nb-head"><h2>سجل الخواص</h2><span id="l1cnt"></span></div><div class="tablewrap"><table id="l1t" class="data"></table></div><p class="hint-line" style="padding:6px 0 0">قيم تقريبية للتجربة الافتراضية.</p></div>`,
 init(){let tool=null,sel=null,rec={},fx=null;const svg=$('#l1svg');
  function reset(){tool=null;sel=null;rec={};OBJ.forEach(o=>rec[o.id]={});draw();tools();table();$('#l1card').innerHTML='<h3>نتيجة الفحص</h3><p class="step-text muted">لم تفحص شيئًا بعد.</p>';}
  function draw(){let s=`<rect width="640" height="300" fill="var(--wall)"/><rect y="236" width="640" height="12" fill="var(--bench-top)"/><rect y="248" width="640" height="52" fill="var(--bench)"/>`;
   OBJ.forEach((o,i)=>{const x=70+i*125,y=196;s+=`<g class="l1o" data-o="${o.id}" style="cursor:pointer" transform="translate(${x} ${y})"><circle r="58" fill="transparent"/><ellipse cx="0" cy="40" rx="44" ry="7" fill="rgba(0,0,0,.18)"/>${o.svg}${sel===o.id?'<circle r="58" fill="none" stroke="var(--amber)" stroke-width="3" stroke-dasharray="7 5"/>':''}</g><text x="${x}" y="292" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-size="14" font-weight="700" fill="#fff">${o.n}</text>`;});
   if(fx)s+='<g pointer-events="none">'+fx+'</g>';svg.innerHTML=s;
   svg.querySelectorAll('.l1o').forEach(g=>g.onclick=()=>use(g.dataset.o));}
  function tools(){$('#l1tools').innerHTML=TOOLS.map(t=>`<button type="button" class="tool" data-t="${t.id}" aria-pressed="${tool===t.id}" style="cursor:pointer"><span style="font-size:1.6rem">${t.ic}</span><span>${t.n}</span></button>`).join('');
   $$('#l1tools .tool').forEach(b=>b.onclick=()=>{tool=b.dataset.t;G.tick();tools();$('#l1hint').textContent='الأداة: '+TOOLS.find(t=>t.id===tool).n+' — المس جسمًا لتفحص '+TOOLS.find(t=>t.id===tool).t+'.';});}
  function use(oid){sel=oid;const o=OBJ.find(x=>x.id===oid),i=OBJ.indexOf(o),x=70+i*125;
   if(!tool){draw();say($('#l1card'),'info','اختر أداة أولًا من شريط الأدوات.');return;}
   const t=TOOLS.find(q=>q.id===tool);let fresh=false;t.p.forEach(k=>{if(rec[oid][k]==null){rec[oid][k]=val(o,k);fresh=true;}});
   if(tool==='mag'){fx=`<g transform="translate(${x} 70)"><path d="M-20 0v-30h12v30a8 8 0 0 0 16 0v-30h12v30a20 20 0 0 1-40 0z" fill="#c0392b"/><rect x="-20" y="-34" width="12" height="8" fill="#ddd"/><rect x="8" y="-34" width="12" height="8" fill="#ddd"/>${o.mag?'<path d="M0 30v60" stroke="var(--amber)" stroke-width="3" stroke-dasharray="5 4"/>':''}</g>`;}
   else if(tool==='lamp'){fx=`<path d="M${x-80} 20 L${x} 160 L${x+80} 20z" fill="rgba(255,230,120,.35)"/>${o.lus?`<path d="M${x-10} 170 l-30 -40 M${x+10} 170 l30 -40" stroke="#fff6a8" stroke-width="5"/>`:''}`;}
   else if(tool==='ruler'){fx=`<rect x="${x-60}" y="150" width="120" height="16" fill="#f5d76e" stroke="#b08d1e"/>${Array.from({length:13},(_,k)=>`<line x1="${x-60+k*10}" y1="150" x2="${x-60+k*10}" y2="${k%5?157:162}" stroke="#6b5310"/>`).join('')}`;}
   else if(tool==='bal'){fx=`<rect x="${x-50}" y="120" width="100" height="20" rx="5" fill="var(--lcd)"/><text x="${x+40}" y="136" text-anchor="end" font-family="Share Tech Mono" font-size="15" fill="var(--lcdink)">${o.m}</text>`;}
   else fx=`<circle cx="${x}" cy="196" r="62" fill="none" stroke="var(--accent)" stroke-width="5"/><line x1="${x+44}" y1="240" x2="${x+80}" y2="276" stroke="var(--accent)" stroke-width="9" stroke-linecap="round"/>`;
   draw();SFX.pop();if(fresh){G.add(2,'lab1');}
   $('#l1card').innerHTML=`<h3>${t.ic} ${o.n}</h3>${t.p.map(k=>`<p class="lead"><b>${COLS.find(c=>c[0]===k)[1]}:</b> ${val(o,k)}${k==='lus'&&o.id==='glass'?' (الزجاج يلمع لكن لمعانه ليس فلزيًّا)':''}</p>`).join('')}<p class="step-text muted">فحصت المادة دون أن تتغير: هذه خاصية فيزيائية.</p>`;
   table();}
  function table(){let n=0;const tot=OBJ.length*COLS.length;
   $('#l1t').innerHTML=`<thead><tr><th>الجسم</th>${COLS.map(c=>`<th>${c[1]}</th>`).join('')}</tr></thead><tbody>${OBJ.map(o=>`<tr><td>${o.n}</td>${COLS.map(c=>{const v=rec[o.id][c[0]];if(v!=null)n++;return `<td class="${v==null?'unk':v==='نعم'?'yes':''}">${v==null?'؟':v}</td>`;}).join('')}</tr>`).join('')}</tbody>`;
   $('#l1cnt').textContent=n+' / '+tot;if(n===tot&&STN.lab1.sorted)G.complete('lab1');STN.lab1.full=n===tot;}
  const doSort=()=>sortGame($('#l1sort'),{bins:['ينجذب للمغناطيس','لا ينجذب'],items:OBJ.map(o=>[o.n,o.mag?0:1]),hint:'استخدم المغناطيس للفحص.'},'lab1',()=>{STN.lab1.sorted=true;if(STN.lab1.full)G.complete('lab1');});
  reset();doSort();this.reset=()=>{STN.lab1.sorted=false;reset();doSort();};},
 explain:'<p>تُفحص الخواص الفيزيائية بالحواس وبأدوات القياس دون تغيير تركيب المادة: العدسة للون والشكل، والمسطرة للطول، والميزان للكتلة، والمصباح للمعان الفلزي، والمغناطيس للمغناطيسية.</p>'});

/* ---------- physical-change factory ---------- */
const WS=[
 {id:'cut',n:'المقص والورقة',tool:'✂️ قص',b:'<rect x="-70" y="-50" width="140" height="100" fill="#fff" stroke="#b9b3a0" stroke-width="2"/><path d="M-50 -20h100M-50 0h100M-50 20h70" stroke="#d7d0bd" stroke-width="4"/>',
  a:'<g fill="#fff" stroke="#b9b3a0" stroke-width="2"><rect x="-90" y="-40" width="50" height="40" transform="rotate(-12 -65 -20)"/><rect x="-20" y="-55" width="50" height="40" transform="rotate(8 5 -35)"/><rect x="40" y="-30" width="50" height="40" transform="rotate(-6 65 -10)"/><rect x="-60" y="15" width="50" height="40" transform="rotate(14 -35 35)"/><rect x="10" y="15" width="50" height="40" transform="rotate(-9 35 35)"/></g>',
  q:{q:'ما الخاصية التي تغيرت عند قص الورقة؟',o:['الشكل والحجم','نوع المادة','اللون','الكتلة الكلية'],a:0,why:'تغير الشكل وحجم القطع، وبقي الورق ورقًا.'}},
 {id:'ham',n:'المطرقة وعلبة الألومنيوم',tool:'🔨 اطرق',b:'<rect x="-30" y="-60" width="60" height="110" rx="10" fill="#c9d2d8" stroke="#8a959c" stroke-width="2"/><ellipse cx="0" cy="-60" rx="30" ry="7" fill="#e3e8eb" stroke="#8a959c"/><rect x="-30" y="-20" width="60" height="30" fill="#0b6884"/>',
  a:'<path d="M-70 40 Q-40 30 -10 42 Q20 30 50 40 L70 46 L-70 52z" fill="#c9d2d8" stroke="#8a959c" stroke-width="2"/><rect x="-40" y="38" width="60" height="7" fill="#0b6884"/>',
  q:{q:'سُطّحت العلبة. هل تغيرت مادة الألومنيوم؟',o:['نعم، أصبحت مادة جديدة','لا، تغير شكلها فقط؛ فالفلزات قابلة للطرق'],a:1,cols:true}},
 {id:'butter',n:'السخّان والزبدة',tool:'🔥 سخّن',b:'<rect x="-50" y="10" width="100" height="14" rx="4" fill="#9aa5ab"/><polygon points="-30,-20 -14,-34 30,-34 14,-20" fill="#fff4b0"/><rect x="-30" y="-20" width="44" height="30" fill="#f7e48a"/><polygon points="14,-20 30,-34 30,-4 14,10" fill="#e3cc5d"/>',
  a:'<rect x="-50" y="10" width="100" height="14" rx="4" fill="#9aa5ab"/><ellipse cx="0" cy="8" rx="46" ry="8" fill="#f7e48a"/><ellipse cx="-6" cy="6" rx="20" ry="3" fill="#fff8c8"/>',
  q:{q:'انصهرت الزبدة. ما الذي تغير؟',o:['حالتها من صلبة إلى سائلة','أصبحت مادة جديدة','كتلتها تضاعفت','لونها أصبح أسود'],a:0,why:'الانصهار تغير في الحالة: تغير فيزيائي.'}},
 {id:'freeze',n:'المجمّد والماء',tool:'❄️ جمّد',b:'<path d="M-40 -40 L-34 40 L34 40 L40 -40" fill="none" stroke="#6f8c99" stroke-width="3"/><path d="M-37 -10 L-34 38 L34 38 L37 -10z" fill="#3a9cd4" opacity=".6"/>',
  a:'<path d="M-40 -40 L-34 40 L34 40 L40 -40" fill="none" stroke="#6f8c99" stroke-width="3"/><path d="M-37 -14 L-34 38 L34 38 L37 -14z" fill="#d6f0fb"/><path d="M-20 0l10 10M10 -6l14 12M-6 22l12 -8" stroke="#fff" stroke-width="3"/>',
  q:{q:'تجمّد الماء فأصبح جليدًا. هل تكونت مادة جديدة؟',o:['نعم','لا، الجليد هو الماء نفسه في الحالة الصلبة'],a:1,cols:true}},
 {id:'sugar',n:'السكر والماء',tool:'🥄 حرّك',b:'<path d="M-40 -40 L-34 40 L34 40 L40 -40" fill="none" stroke="#6f8c99" stroke-width="3"/><path d="M-37 -10 L-34 38 L34 38 L37 -10z" fill="#bfe3f5" opacity=".7"/><g fill="#fff" stroke="#ccc">'+[[-60,-60],[-50,-66],[-56,-52],[-44,-58]].map(([x,y])=>`<rect x="${x}" y="${y}" width="7" height="7"/>`).join('')+'</g>',
  a:'<path d="M-40 -40 L-34 40 L34 40 L40 -40" fill="none" stroke="#6f8c99" stroke-width="3"/><path d="M-37 -10 L-34 38 L34 38 L37 -10z" fill="#bfe3f5" opacity=".7"/>',
  q:{q:'اختفى السكر في الماء، لكن طعم الماء صار حلوًا. ماذا حدث للسكر؟',o:['فني السكر','ذاب السكر وما زال موجودًا في الماء: تغير فيزيائي','تحوّل إلى مادة جديدة'],a:1}}];
def('lab2',{after:'s5',n:'🧪 مصنع التغيرات',eyebrow:'تجربة افتراضية',title:'مصنع التغيرات الفيزيائية: خمس ورش',goal:'شغّل الأداة في كل ورشة، وقارن «قبل» و«بعد»، وحدّد ما الذي تغيّر. هل تغيرت هوية المادة؟',plan:6,core:1,
 icon:'<rect x="10" y="22" width="26" height="34" fill="none" stroke="currentColor" stroke-width="5"/><path d="M44 40h12M50 34l6 6-6 6" stroke="currentColor" stroke-width="5" fill="none"/><rect x="60" y="18" width="12" height="18" fill="currentColor"/><rect x="60" y="44" width="12" height="18" fill="currentColor"/>',
 body:`<div class="wgrid" id="l2grid"></div>`,
 init(){const done=new Set();
  const g=$('#l2grid');g.innerHTML=WS.map(w=>`<div class="card wcard" data-w="${w.id}"><h3>${w.n}</h3><div class="stage"><svg viewBox="-110 -80 220 150" data-s><g data-g>${w.b}</g></svg></div><div class="actions"><button class="btn" type="button" data-run>${w.tool}</button><button class="tbtn" type="button" data-back>إرجاع</button></div><div class="ba"><div><b>قبل</b><span data-bt>${w.n.split(' ')[1]||''}</span></div><div><b>بعد</b><span data-at>—</span></div></div><div data-q></div></div>`).join('');
  $$('#l2grid .wcard').forEach(c=>{const w=WS.find(x=>x.id===c.dataset.w);c.querySelector('[data-bt]').textContent='المادة الأصلية';
   c.querySelector('[data-run]').onclick=()=>{const gg=c.querySelector('[data-g]');gg.style.transition='opacity .5s';gg.style.opacity=0;SFX.whoosh();setTimeout(()=>{gg.innerHTML=w.a;gg.style.opacity=1;c.querySelector('[data-at]').textContent='المادة نفسها بشكل/حالة مختلفة';
     if(!c.dataset.asked){c.dataset.asked=1;mcq(c.querySelector('[data-q]'),w.q,'lab2',()=>{done.add(w.id);if(done.size===WS.length)G.complete('lab2');});}},500);};
   c.querySelector('[data-back]').onclick=()=>{const gg=c.querySelector('[data-g]');gg.innerHTML=w.b;c.querySelector('[data-at]').textContent='—';G.tick();};});},
 explain:'<p>في كل ورشة تتغير خاصية فيزيائية (الشكل أو الحجم أو الحالة) وتبقى هوية المادة: قص الورق، وطرق الألومنيوم، وانصهار الزبدة، وتجمد الماء، وذوبان السكر. ولهذا يمكن إرجاع بعضها كتجميد الماء ثم صهره.</p>'});

/* ---------- metals lab ---------- */
const MET=[{n:'حديد',c:'#8a949b',lus:1,ham:'يُطرق إلى صفيحة',el:1,mag:1,metal:1},{n:'نحاس',c:'#c7743e',lus:1,ham:'يُطرق إلى صفيحة',el:1,mag:0,metal:1},{n:'ألومنيوم',c:'#c9d2d8',lus:1,ham:'يُطرق إلى صفيحة',el:1,mag:0,metal:1},{n:'ذهب',c:'#d4a017',lus:1,ham:'يُطرق إلى صفيحة',el:1,mag:0,metal:1},{n:'كبريت',c:'#e8d33a',lus:0,ham:'يتفتت',el:0,mag:0,metal:0},{n:'خشب',c:'#b98545',lus:0,ham:'لا يتشكل صفيحة',el:0,mag:0,metal:0}];
const MT=[['lus','🔦 اللمعان'],['ham','🔨 الطرق'],['el','💡 التوصيل الكهربائي'],['mag','🧲 المغناطيس']];
def('lab3',{after:'s6',n:'🧪 مختبر الفلزات',eyebrow:'تجربة افتراضية',title:'مختبر الفلزات: اختبر العينات الست',goal:'اختر عينة، ثم أجرِ عليها الاختبارات الأربعة. أي العينات فلزات؟',plan:6,core:1,
 icon:'<path d="M16 10v30a24 24 0 0 0 48 0V10H48v30a8 8 0 0 1-16 0V10z" fill="currentColor"/>',
 body:`<div class="two"><div class="stage"><svg id="l3svg" viewBox="0 0 640 300" aria-label="عينة ودائرة كهربائية"></svg>
   <div class="sim-bar"><span class="seg" id="l3s">${MET.map((m,i)=>`<button type="button" data-i="${i}" class="${i?'':'on'}">${m.n}</button>`).join('')}</span></div>
   <div class="sim-bar">${MT.map(t=>`<button class="btn alt" type="button" data-t="${t[0]}">${t[1]}</button>`).join('')}</div></div>
  <div class="side"><div class="card"><h3>نتيجة الاختبار</h3><div id="l3r" class="lead muted">اختر عينة واختبارًا.</div></div><div class="card"><h3>فلز أم لا فلز؟</h3><div id="l3sort"></div></div></div></div>
  <div class="card"><div class="nb-head"><h2>جدول النتائج</h2><span id="l3n"></span></div><div class="tablewrap"><table id="l3t" class="data"></table></div></div>`,
 init(){let si=0,res={},anim=null;const svg=$('#l3svg');
  const txt=(m,k)=>k==='lus'?(m.lus?'لامع (لمعان فلزي)':'غير لامع'):k==='ham'?m.ham:k==='el'?(m.el?'يضيء المصباح':'لا يضيء'):(m.mag?'ينجذب':'لا ينجذب');
  function draw(k){const m=MET[si];let s=`<rect width="640" height="300" fill="var(--wall)"/><rect y="250" width="640" height="50" fill="var(--bench-top)"/>`;
   const flat=k==='ham'&&m.ham.includes('صفيحة'),crumb=k==='ham'&&m.ham==='يتفتت';
   if(flat)s+=`<ellipse cx="320" cy="236" rx="90" ry="12" fill="${m.c}" stroke="rgba(0,0,0,.3)"/>`;
   else if(crumb)s+=[[-40,0],[-10,6],[20,-2],[44,4],[0,-8],[-24,8]].map(([dx,dy])=>`<polygon points="${320+dx},${232+dy} ${330+dx},${224+dy} ${338+dx},${236+dy}" fill="${m.c}"/>`).join('');
   else s+=`<rect x="270" y="196" width="100" height="44" rx="8" fill="${m.c}" stroke="rgba(0,0,0,.25)"/>`;
   if(k==='lus'){s+=`<path d="M200 20 L320 190 L440 20z" fill="rgba(255,230,120,.35)"/>`+(m.lus?`<path d="M300 186l-40-60M340 186l40-60" stroke="#fff6a8" stroke-width="6"/>`:'');}
   if(k==='ham')s+=`<g transform="translate(320 120) rotate(-20)"><rect x="-8" y="-10" width="16" height="90" fill="#8f6230"/><rect x="-40" y="-30" width="80" height="30" rx="4" fill="#5b6870"/></g>`;
   if(k==='el'){const on=m.el;s+=`<path d="M270 218 H140 V80 H260 M370 218 H500 V80 H420" fill="none" stroke="#222" stroke-width="4"/><rect x="150" y="150" width="30" height="50" fill="#333"/><rect x="157" y="144" width="16" height="8" fill="#999"/><circle cx="340" cy="80" r="${on?36:28}" fill="${on?'rgba(255,230,90,.35)':'none'}"/><circle cx="340" cy="80" r="22" fill="${on?'#ffe45c':'#eee'}" stroke="#999" stroke-width="2"/><path d="M260 80 H318 M362 80 H420" stroke="#222" stroke-width="4"/>`;}
   if(k==='mag')s+=`<g transform="translate(320 100)"><path d="M-24 0v-36h14v36a10 10 0 0 0 20 0v-36h14v36a24 24 0 0 1-48 0z" fill="#c0392b"/></g>`+(m.mag?`<path d="M320 130 V190" stroke="var(--amber)" stroke-width="4" stroke-dasharray="6 5"/>`:'');
   s+=`<text x="320" y="285" text-anchor="middle" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="20" fill="#fff">${m.n}</text>`;svg.innerHTML=s;}
  function table(){let n=0;$('#l3t').innerHTML=`<thead><tr><th>العينة</th>${MT.map(t=>`<th>${t[1]}</th>`).join('')}</tr></thead><tbody>${MET.map((m,i)=>`<tr><td>${m.n}</td>${MT.map(t=>{const v=res[i+t[0]];if(v)n++;return `<td>${v||'؟'}</td>`;}).join('')}</tr>`).join('')}</tbody>`;$('#l3n').textContent=n+' / '+MET.length*MT.length;STN.lab3.full=n>=MET.length*MT.length;chk();}
  function chk(){if(STN.lab3.full&&STN.lab3.sorted)G.complete('lab3');}
  $('#l3s').onclick=e=>{const b=e.target.closest('[data-i]');if(!b)return;si=+b.dataset.i;$$('#l3s button').forEach(x=>x.classList.toggle('on',x===b));G.tick();draw();};
  $$('[data-t]',$('#st-lab3')).forEach(b=>b.onclick=()=>{const k=b.dataset.t,m=MET[si];draw(k);k==='ham'?SFX.thud():SFX.pop();const key=si+k;if(!res[key]){res[key]=txt(m,k);G.add(1,'lab3');}$('#l3r').innerHTML=`<b>${m.n}</b> — ${MT.find(t=>t[0]===k)[1]}: ${txt(m,k)}`;table();});
  const doSort=()=>sortGame($('#l3sort'),{bins:['فلز','لا فلز'],items:MET.map(m=>[m.n,m.metal?0:1]),hint:'الفلز لامع، ويُطرق، ويوصل الكهرباء.'},'lab3',()=>{STN.lab3.sorted=true;chk();});
  draw();table();doSort();this.reset=()=>{res={};STN.lab3.sorted=false;draw();table();doSort();};},
 explain:'<p>الفلزات (الحديد والنحاس والألومنيوم والذهب) لامعة، وقابلة للطرق، وموصلة للكهرباء، والحديد وحده بينها ينجذب للمغناطيس. أما الكبريت والخشب فليسا فلزين: غير لامعين، ولا يوصلان الكهرباء، والكبريت يتفتت عند طرقه.</p>'});

/* ---------- plasma corner (added inside states station) ---------- */
K.plasmaCorner=function(el){
  el.innerHTML=`<div class="two"><div class="stage"><canvas width="720" height="300" aria-label="أنبوب غاز نيون"></canvas><div class="ctrl"><label>فرق الجهد على الأنبوب: <b data-v>0</b> %</label><input type="range" min="0" max="100" value="0"></div><div class="sim-bar"><button class="btn" type="button" data-bolt>⚡ أطلق شرارة برق</button></div></div>
   <div><h3>ركن البلازما</h3><p class="step-text">ارفع فرق الجهد على أنبوب فيه غاز النيون. عند طاقة كافية يتوهج الغاز ويصبح <b>بلازما</b>.</p><p class="step-text">تحدث البلازما عند درجات الحرارة العالية جدًّا، كما في أنابيب الفلورسنت الضوئية (النيون) والبرق.</p></div></div>`;
  const cv=el.querySelector('canvas'),c=cv.getContext('2d'),r=el.querySelector('input');let V=0,bolt=0,t=0;
  r.oninput=()=>{V=+r.value;el.querySelector('[data-v]').textContent=V;if(V>=70&&!el.dataset.ok){el.dataset.ok=1;G.add(5,G.cur);K.banner('توهّج الغاز!','أصبح بلازما');}};
  el.querySelector('[data-bolt]').onclick=()=>{bolt=1;SFX.thud();};
  (function f(){t+=.05;c.fillStyle='#0d1620';c.fillRect(0,0,720,300);
    const on=V>=70,glow=on?(V-70)/30:0;
    c.fillStyle=on?`rgba(255,80,60,${.35+glow*.5})`:'rgba(180,200,210,.18)';c.strokeStyle='#9fb1ba';c.lineWidth=3;c.beginPath();c.roundRect?c.roundRect(120,120,480,60,30):c.rect(120,120,480,60);c.fill();c.stroke();
    for(let k=0;k<26;k++){const x=150+((k*53+t*(on?120:20))%420),y=135+((k*31)%30);c.fillStyle=on?'#ffd0c0':'#9fb1ba';c.beginPath();c.arc(x,y,on?3:4,0,7);c.fill();}
    if(on){c.shadowColor='#ff5040';c.shadowBlur=30*glow;c.strokeStyle='rgba(255,120,90,.6)';c.stroke();c.shadowBlur=0;}
    c.fillStyle='#ccc';c.font='700 16px "IBM Plex Sans Arabic"';c.direction='rtl';c.textAlign='center';c.fillText(on?'بلازما متوهجة':'غاز النيون',360,230);c.direction='ltr';
    if(bolt>0){c.strokeStyle=`rgba(200,220,255,${bolt})`;c.lineWidth=5;c.beginPath();let x=600,y=0;c.moveTo(x,y);while(y<110){x+=(Math.random()-.5)*40;y+=18;c.lineTo(x,y);}c.stroke();bolt-=.04;}
    requestAnimationFrame(f);})();
};
})();

/*@include lab5.js*/
/*@include skit.js*/
/* ===== الفصل الثالث · الدرس الأول: الخواص والتغيرات الفيزيائية — «جولة في سوق المواد» ===== */
(function(){
const {$,$$,G,STN,def,mcq,calcQ,levels,flips,match,sortGame,tfRound,challenge,vcard,ayah,say,num,fmt,parseNum,SFX,css,pic,slides,beforeAfter,safety,anticip,story,escape,auction,choiceBoard,solutions}=K;
const img=K.img;
const P=(n,c)=>[n,c];

/* ================= INTRO ================= */
def('intro',{n:'الافتتاحية',plan:3,icon:'<circle cx="40" cy="40" r="26" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="40" cy="40" r="10" fill="currentColor"/>',
 body:`<div class="hero"><div class="hero-photo">${pic('s04_0c21acfe','غواصة أبحاث تحت الماء')}<span class="cap">تهيئة · أبحاث تحت الماء (كتاب الطالب ص 80): كم شكلًا من أشكال المادة تستطيع أن تلاحظ في الصورة؟</span></div>
  <div><span class="eyebrow">جولة في سوق المواد</span><h2 class="hero-h">كل ما حولك له خواص!</h2>
   <p class="riddle">في سوق الأحساء: ذهب يلمع، وقهوة تُطحن، وماء يغلي، وتمر يجف. كيف يمكن للمادة أن يتغير شكلها أو حالتها دون أن تتحول إلى مادة جديدة؟</p>
   <p class="q">ما توقعك قبل أن تبدأ الجولة؟</p><div class="opts" id="introOpts"></div><div id="introFb"></div></div></div>
  <div class="two"><div class="card"><h3>تجربة استهلالية: هل تستطيع تصنيف قطع النقد حسب خواصها؟ <span class="cnt-badge">ص 81</span></h3>
    <div class="two"><div class="hero-photo" style="min-height:200px">${pic('s05_05c3068e','قطع نقدية سعودية')}</div>
    <div><ol class="step-text" style="line-height:1.7;margin:0 0 8px"><li>انظر إلى مجموعة القطع النقدية.</li><li>اختر خاصية تساعدك على فرز النقود، وضعها في مجموعات.</li><li>صنّف النقود وافصل بينها حسب الخاصية التي اخترتها، ثم سجّل بياناتك في جدول تكراري.</li><li>وضّح كيف صنّفت هذه النقود، وقارن طريقتك بطرائق زملائك.</li><li><b>التفكير الناقد:</b> اكتب فقرة في دفتر العلوم توضح فيها الأسلوب الذي استخدمته مجموعتك في التصنيف، وما الصفات الأخرى التي كان يمكن التصنيف بناءً عليها؟</li></ol><div id="coinQ"></div></div></div></div>
   <div class="card teacher-only"><h3>مسار الحصة</h3><div id="introPlan"></div></div></div>`,
 init(){mcq($('#coinQ'),{q:'أي هذه الخواص يمكن استخدامها لتصنيف القطع النقدية دون أن نغيّرها؟',o:['اللون والحجم والشكل','طعمها','ما يحدث لها عند حرقها','لا يمكن تصنيفها'],a:0,why:'اللون والحجم والشكل خواص فيزيائية نلاحظها أو نقيسها دون تغيير المادة. وهذا ما سنتعلمه في الدرس.'},'intro');}
});

/* ================= المطويات وتوجيه القراءة ================= */
def('fold',{n:'المطويات وتوجيه القراءة',eyebrow:'تجربة استهلالية · المطويات · توجيه القراءة',title:'المطويات وتوجيه القراءة وتركيزها',goal:'اعمل المطوية لتنظيم أفكارك، ثم سجّل رأيك في عبارات الفصل قبل القراءة، وعُد إليها بعد الدرسين.',plan:4,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:`<div class="two"><div class="card"><h3>الفكرة العامة للفصل <span class="cnt-badge">ص 84</span></h3><p class="step-text"><b>الدرس الأول · الخواص والتغيرات الفيزيائية:</b> يمكن ملاحظة الخواص الفيزيائية للمادة، وقياسها وتغييرها.</p><p class="step-text"><b>الدرس الثاني · الخواص والتغيرات الكيميائية:</b> للمادة خواص كيميائية، والتغير الكيميائي للمادة يغير ماهيتها.</p></div><div class="card"><h3>المطويات: خواص المادة <span class="cnt-badge">ص 81</span></h3><p class="step-text">اعمل هذه المطوية لتساعدك على تنظيم أفكارك حول خواص المادة.</p><ol class="step-text" style="line-height:1.8;margin:0"><li><b>ارسم</b> علامة في منتصف حافة الورقة، ثم اطوِ حافتي الورقة بحيث تتلامسان نقطة المنتصف.</li><li><b>اطوِ</b> الورقة من منتصفها من حافة إلى أخرى.</li><li><b>اقلب</b> الورقة رأسيًّا، ثم <b>افتحها وقصّها</b> على طول خطَّي الطي، بحيث تنتج أربعة ألسنة.</li><li><b>اكتب</b> عنوانًا لكل لسان: خواص فيزيائية، خواص كيميائية، تغيرات فيزيائية، تغيرات كيميائية.</li></ol><p class="step-text"><b>قارن:</b> قبل قراءتك الفصل عرّف كلًّا من المصطلحات الأربعة، وأثناء القراءة صحّح تعريفاتك واكتب ما تعرفه عنها تحت اللسان المناسب. التسليم: الأحد القادم.</p></div></div><div class="card"><h3>توجيه القراءة وتركيزها · الكتاب صفحة 83 · خمس دقائق</h3><div id="foldAg"></div></div>`,
 init(){anticip($('#foldAg'),[["المادة هي كل شيء له كتلة ويشغل حيزًا من الفراغ.", true], ["تتغير ماهية المادة إذا حدث لها تغير فيزيائي.", false, "في التغير الفيزيائي تبقى هوية المادة الأصلية دون تغيير."], ["من الخواص الفيزيائية للمادة: اللون، والشكل، والطول، والكتلة، والكثافة.", true], ["تتميز المواد غير الفلزية بأنها قابلة للطرق والسحب.", false, "الفلزات هي القابلة للطرق والسحب."], ["حالات المادة ثلاث.", false, "للمادة أربع حالات: الصلبة والسائلة والغازية والبلازما."], ["للمادة خواص كيميائية.", true], ["تعد القابلية للاشتعال من الخواص الفيزيائية.", false, "القابلية للاشتعال خاصية كيميائية."], ["تُفقد الكتلة عند احتراق المادة وعند حدوث التفاعلات الكيميائية.", false, "وفق قانون حفظ الكتلة: مجموع كتل المواد الناتجة يساوي مجموع كتل المواد المتفاعلة."], ["يعد انبعاث الضوء والحرارة من دلائل حدوث تفاعل كيميائي.", true]]);},enter(){G.complete('fold');},reset(){STN['fold'].init();},explain:'<p>المطويات ص 81 و«توجيه القراءة وتركيزها» ص 83 كما في العرض: العبارات التسع تخص الفصل كله، يسجّل الطالب رأيه قبل القراءة ويعود إليها بعد الدرسين.</p>'});
/* ================= GOALS ================= */
const GOALS=['تتعرف الخواص الفيزيائية للمادة.','تفسّر سبب اختلاف الكثافة بين المواد التي تختلف في كتلتها.','تلاحظ كيفية استخدام طريقة الإزاحة لتحديد حجوم الأجسام.','تصف حالات المادة المختلفة.','تحدد أثر تغير درجة الحرارة على المواد.','تصنّف المواد بناءً على خواصها الفيزيائية.'];
const TERMS=[
 {t:'المادة',d:'كل شيء له كتلة ويشغل حيزًا من الفراغ.'},
 {t:'الخاصية الفيزيائية',d:'أي خاصية للمادة يمكن ملاحظتها أو قياسها دون إحداث تغيير في تركيب المادة الأصلي.'},
 {t:'الكثافة',d:'كتلة المادة الموجودة في وحدة الحجوم: الكثافة = الكتلة ÷ الحجم.'},
 {t:'حالات المادة',d:'الصلبة والسائلة والغازية والبلازما. حالة المادة خاصية فيزيائية تُستخدم في تصنيف المواد.'},
 {t:'درجة الانصهار',d:'درجة الحرارة التي تتحول عندها المادة من الحالة الصلبة إلى الحالة السائلة.'},
 {t:'درجة الغليان',d:'النقطة التي تثبت عندها درجة الحرارة عند تحول المادة من الحالة السائلة إلى الحالة الغازية.'},
 {t:'التغير الفيزيائي',d:'تغير الخواص الفيزيائية مع بقاء هوية المادة الأصلية دون تغيير.'}];
def('goals',{n:'الأهداف والمصطلحات',eyebrow:'قبل أن ندخل السوق',title:'خريطة الجولة: الأهداف والمصطلحات',goal:'تعرّف أهداف الدرس، ثم تعرّف المصطلحات.',plan:4,
 icon:'<rect x="12" y="8" width="56" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 26h32M24 40h32M24 54h20" stroke="currentColor" stroke-width="6" stroke-linecap="round"/>',
 body:`<div class="two"><div class="card"><h3>الفكرة العامة</h3><p class="lead"><b>يمكن ملاحظة الخواص الفيزيائية للمادة، وقياسها وتغييرها.</b></p><h3 class="mt">أهداف الدرس</h3><ol class="goals">${GOALS.map(g=>`<li>${g}</li>`).join('')}</ol>
   <div class="story mt"><b>الأهمية:</b> تساعد ملاحظة الخواص الفيزيائية للمادة على فهم العالم من حولنا.</div></div>
  <div class="card"><h3>المفردات الجديدة</h3><ul class="tasks plain"><li>الخاصية الفيزيائية</li><li>الكثافة</li><li>حالات المادة</li><li>درجة الانصهار</li><li>درجة الغليان</li><li>التغير الفيزيائي</li></ul></div></div>
  <div class="card"><div class="nb-head"><h2>بطاقات المصطلحات</h2><span>المس البطاقة لترى التعريف</span></div><div id="g5flips"></div></div>
  <div class="card"><div class="nb-head"><h2>لعبة المطابقة</h2><span>اختر المصطلح ثم تعريفه</span></div><div id="g5match"></div></div>`,
 init(){flips($('#g5flips'),TERMS);this.reset();},
 reset(){match($('#g5match'),TERMS.slice(0,6).map(t=>[t.t,t.d]),'goals',()=>G.complete('goals'));},
 explain:'<p>الأهداف والأهمية والفكرة العامة من عرض الدرس. «توجيه القراءة» في محطة المطويات قبلها.</p>'});

/* ================= S1: senses & physical properties ================= */
def('s1',{n:'1 · الحواس والخواص',eyebrow:'المحطة 1 · بوابة السوق',title:'بوابة السوق: الحواس والخواص الفيزيائية',goal:'كيف نلاحظ الأشياء؟ نستخدم حواسنا لملاحظة المواد. لكن في المختبر للحواس قواعد!',plan:6,core:1,
 icon:'<circle cx="40" cy="40" r="22" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="40" cy="40" r="8" fill="currentColor"/>',
 body:`<div class="card" id="s1sl"></div>
  <div class="two"><div class="card"><h3>🛡 فحص السلامة قبل دخول المختبر</h3><div id="s1gate"></div></div>
   <div class="card"><h3>صنّف: مادة أم ليس مادة؟</h3><div id="s1sort"></div></div></div>
  <div class="two">${vcard('islam','الميزان أمانة',`${ayah('وَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ بِالْقِسْطِ','الأنعام: 152')}<p class="mt">في السوق يزن البائع البضاعة بالميزان، والكتلة خاصية فيزيائية نقيسها بدقة وأمانة.</p>`)}
   ${vcard('nation','موازين أسواقنا',`<p>في أسواق الأحساء ومحلات الذهب تُستخدم الموازين الإلكترونية الدقيقة لقياس الكتلة، والمسطرة أو الشريط المتري لقياس الطول.</p>`)}</div>`,
 init(){let a=false,b=false;const chk=()=>{if(a&&b)G.complete('s1');};
  slides($('#s1sl'),[
   {k:'كيف يمكن ملاحظة الأشياء؟',t:'استخدام الحواس',im:[P('s09_0948a1cf','الحواس الخمس')],html:'<p>يمكنك أن تستخدم حواسك في ملاحظة المواد والأشياء.</p><p class="def">الخاصية الفيزيائية: أي خاصية للمادة يمكن ملاحظتها أو قياسها دون إحداث تغيير في تركيب المادة الأصلي.</p><p>لكن من المهم جدًّا عدم لمس أي مادة في المختبر أو تذوقها أو شمها دون وجود إرشادات تسمح بذلك.</p>'},
   {k:'الخواص الفيزيائية',t:'اللون والشكل',im:[P('s10_44e47175','عبوات مواد التنظيف')],html:'<p class="def">المادة: كل ما له كتلة ويشغل حيزًا.</p><p>للمادة خواص محسوسة نلاحظها برؤيتها أو شمها أو لمسها أو تذوقها. واللون أول خاصية نلاحظها في المادة؛ فأنت تشاهد أكثر من لون لعلب مواد التنظيف مثلًا.</p><p>ولربما لكل قارورة أو علبة شكل مختلف: فبعضها مكعب، وبعضها أسطواني.</p>'},
   {k:'الخواص الفيزيائية',t:'الطول والكتلة',im:[P('s12_9f8f7ab4','الكتلة')],html:'<p>يمكن تحديد بعض الخواص الفيزيائية بالحواس أو بالقياس. فالطول نقيسه بالمسطرة أو الشريط المتري.</p><p class="def">الكتلة: كمية المادة في الجسم، ونستخدم الميزان لقياسها.</p>'}],'s1');
  safety($('#s1gate'),[['أنظر إلى المادة وأصف لونها وشكلها.',true],['أتذوّق المادة لأعرف طعمها.',false,'لا تتذوق أي مادة في المختبر.'],['أشمّ المادة مباشرة من فوهة الأنبوب.',false,'لا تشم المواد في المختبر دون إرشادات المعلم.'],['ألمس المادة بيدي دون إذن المعلم.',false,'لا تلمس المواد في المختبر دون إرشادات.'],['أستمع إلى الصوت الذي يصدر عند طرق الجسم بلطف.',true]],()=>{a=true;chk();});
  sortGame($('#s1sort'),{bins:['مادة','ليس مادة'],items:[['التربة',0,'التربة لها كتلة وتشغل حيزًا.'],['الهواء',0,'الهواء له كتلة ويشغل حيزًا، فهو مادة.'],['الضوء',1,'الضوء ليس له كتلة ولا يشغل حيزًا.'],['الحرارة',1,'الحرارة صورة من صور الطاقة، وليست مادة.']],hint:'هل له كتلة؟ وهل يشغل حيزًا من الفراغ؟'},'s1',()=>{b=true;chk();});},
 quiz:[{q:'أي خاصية للمادة يمكن ملاحظتها أو قياسها دون إحداث تغيير في تركيب المادة الأصلي؟',o:['التغير الفيزيائي','التغير الكيميائي','الخاصية الفيزيائية','الخاصية الكيميائية'],a:2},{q:'كل ما له كتلة ويشغل حيزًا من الفراغ:',o:['الحجم','المادة','الكثافة','الطول'],a:1}],
 explain:'<p>نلاحظ المواد بحواسنا: النظر والسمع، مع الحذر في المختبر فلا نلمس ولا نشم ولا نتذوق دون إرشادات. <b>الخاصية الفيزيائية</b> تُلاحظ أو تُقاس دون تغيير تركيب المادة، مثل: اللون والشكل والطول والكتلة. <b>الكتلة</b> كمية المادة في الجسم.</p>'});

/* ================= S2: volume & density (displacement lab) ================= */
const BALLS=[{n:'الكرة المطاطية',m:24,V:20,c:'#d9483b'},{n:'الكرة الزجاجية',m:30,V:12,c:'#7fc8e8'},{n:'الكرة الخشبية',m:9,V:15,c:'#b07a43'}];
def('s2',{n:'2 · الحجم والكثافة',eyebrow:'المحطة 2 · دكان الموازين',title:'دكان الموازين: الحجم والكثافة',goal:'كيف نقيس حجم جسم غير منتظم الشكل؟ زِن الكرة، واغمرها في المخبار، واحسب كثافتها.',plan:9,core:1,
 icon:'<path d="M28 6v64h24V6" fill="none" stroke="currentColor" stroke-width="5"/><rect x="31" y="36" width="18" height="32" fill="currentColor" opacity=".45"/><circle cx="40" cy="50" r="7" fill="currentColor"/>',
 body:`<div class="card" id="s2sl"></div>
  <div class="two"><div class="stage"><svg id="s2svg" viewBox="0 0 600 360" aria-label="ميزان ومخبار مدرج"></svg>
    <div class="sim-bar"><span class="seg" id="s2b">${BALLS.map((b,i)=>`<button type="button" data-i="${i}" class="${i?'':'on'}">${b.n}</button>`).join('')}</span><button class="btn" type="button" id="s2w">زِن ⚖</button><button class="btn" type="button" id="s2d">اغمر في المخبار 💧</button><button class="tbtn" type="button" id="s2r">أعِد</button></div>
    <p class="hint-line">قيم تقريبية للتجربة الافتراضية. يبدأ المخبار بـ 50 مل من الماء كما في تجربة «تحديد الحجم» في الكتاب.</p></div>
   <div class="side"><div class="card"><h3>قانون الكثافة</h3><p class="eq">ث = ك ÷ ح<small>الكثافة = الكتلة ÷ الحجم · الحجم بالإزاحة = القراءة الثانية − القراءة الأولى</small></p><div id="s2card"></div></div>
    <div class="card"><div class="nb-head"><h2>سجل المختبر</h2><span id="s2n"></span></div><div class="tablewrap"><table id="s2t"></table></div></div></div></div>
  <div class="two"><div class="card"><h3>فكّر معي</h3><div id="s2think"></div></div>${vcard('life','لماذا يطفو الجليد؟',`<p>كثافة الماء في صورته الصلبة (الجليد) أقل من كثافته في صورته السائلة؛ لذلك نلاحظ أن الجليد يطفو فوق سطح الماء.</p>${pic('s48_660792d9','جليد يطفو','auc-im')}`)}</div>`,
 init(){let si=0,S;const svg=$('#s2svg');const rows=[],done=new Set();
  slides($('#s2sl'),[
   {k:'الخواص الفيزيائية',t:'الحجم والكثافة',im:[P('s13_64d9eec4','أجسام منتظمة الشكل'),P('s13_677781d8','جسم غير منتظم')],html:'<p>الكتلة ليست الخاصية الفيزيائية الوحيدة التي تعبر عن مقدار المادة؛ فهناك أيضًا خاصية <b>الحجم</b> التي تعبر عن مقدار الفراغ (الحيز) الذي يشغله الجسم.</p><p class="def">الكثافة: كتلة المادة الموجودة في وحدة الحجوم، وتساوي ناتج قسمة كتلة الجسم على حجمه.</p>'},
   {k:'فكّر معي',t:'كرة بلياردو وكرة قدم',im:[P('s14_d85b2835','كرة بلياردو وكرة قدم')],html:'<p>هل للكرتين الحجم نفسه؟ <b>نعم</b>.</p><p>هل للكرتين الكتلة نفسها؟ <b>لا</b>.</p><p>هل للكرتين الكثافة نفسها؟ <b>لا</b>؛ لأن الكثافة = الكتلة ÷ الحجم، فإذا تساوى الحجم واختلفت الكتلة اختلفت الكثافة.</p>'},
   {k:'الربط مع الرياضيات',t:'قانون الكثافة',im:[P('s13_1995a02e','ريشة'),P('s13_677781d8','صخرة')],html:'<p class="eq" style="font-size:1.6rem">الكثافة = الكتلة ÷ الحجم<br>ث = ك ÷ ح</p><p>وتقاس الكثافة بوحدة <b>كجم/م³</b> أو <b>جم/سم³</b>.</p><p>الأجسام قد تكون منتظمة الشكل أو غير منتظمة؛ ونقيس حجم غير المنتظم بطريقة <b>الإزاحة</b>.</p>'}],'s2');
  function reset(){S={w:false,in:false,tries:0,ok:false,lvl:50};draw();card();}
  function draw(){const b=BALLS[si],W=600,lvl=S.in?50+b.V:50,cx=430,top=40,bot=320,ppm=(bot-top)/100,wy=bot-lvl*ppm,r=10+b.V*0.9;
   let s=`<rect width="600" height="360" fill="var(--wall)"/><rect y="330" width="600" height="30" fill="var(--bench-top)"/>`;
   s+=`<polygon points="40,330 52,280 228,280 240,330" fill="var(--metal-dark)"/><rect x="36" y="270" width="208" height="12" rx="5" fill="var(--metal)"/><rect x="70" y="292" width="120" height="30" rx="5" fill="var(--lcd)"/><text x="182" y="315" text-anchor="end" font-family="Share Tech Mono" font-size="22" fill="var(--lcdink)">${S.w&&!S.in?b.m.toFixed(1):'0.0'} g</text>`;
   s+=`<rect x="${cx-40}" y="${top}" width="80" height="${bot-top}" fill="var(--glass)" stroke="var(--glass-edge)" stroke-width="2"/><rect x="${cx-38}" y="${wy}" width="76" height="${bot-wy}" fill="var(--water)" opacity=".55"/>`;
   for(let k=0;k<=100;k+=5){const y=bot-k*ppm;s+=`<line x1="${cx+40-(k%10?8:16)}" y1="${y}" x2="${cx+40}" y2="${y}" stroke="var(--scale-ink)"/>`;if(k%10===0)s+=`<text x="${cx+46}" y="${y+4}" font-family="Share Tech Mono" font-size="11" fill="var(--scale-ink)">${k}</text>`;}
   s+=`<text x="${cx+46}" y="${top-8}" font-family="Share Tech Mono" font-size="12" fill="var(--scale-ink)">mL</text><rect x="${cx-56}" y="${bot}" width="112" height="8" rx="2" fill="var(--metal-dark)"/>`;
   const bx=S.in?cx:(S.w?140:300),by=S.in?(bot-r-6):(S.w?270-r:330-r);
   s+=`<circle cx="${bx}" cy="${by}" r="${r}" fill="${b.c}" stroke="rgba(0,0,0,.3)" stroke-width="2"/>`;
   if(S.in&&si===2)s+=`<line x1="${cx}" y1="${top-20}" x2="${cx}" y2="${by-r}" stroke="var(--metal-dark)" stroke-width="3"/><text x="${cx-48}" y="${top-6}" text-anchor="end" font-size="12" fill="var(--muted)" font-family="IBM Plex Sans Arabic" direction="rtl">قضيب رفيع يغمرها لأنها تطفو</text>`;
   s+=`<text x="140" y="350" text-anchor="middle" font-size="13" fill="var(--muted)" font-family="IBM Plex Sans Arabic">ميزان إلكتروني</text><text x="${cx}" y="350" text-anchor="middle" font-size="13" fill="var(--muted)" font-family="IBM Plex Sans Arabic">مخبار مدرج</text>`;
   svg.innerHTML=s;}
  function card(){const b=BALLS[si],el=$('#s2card');
   if(!S.w){el.innerHTML='<p class="step-text">1) اضغط «زِن» لتقرأ كتلة الكرة.</p>';return;}
   if(!S.in){el.innerHTML=`<p class="step-text">الكتلة = ${num(b.m)} جم. 2) اضغط «اغمر» واقرأ مستوى الماء الجديد.</p>`;return;}
   const rho=b.m/b.V;el.innerHTML=`<p class="step-text">القراءة الأولى 50 مل، والثانية ${num(50+b.V)} مل. الحجم = ${num(b.V)} سم³. احسب الكثافة:</p><form class="answer" id="s2f" autocomplete="off"><label><input id="s2a" inputmode="decimal" aria-label="الكثافة"><span class="unit">جم/سم³</span></label><button class="btn" type="submit">تحقق</button></form>${G.teacher?`<div class="teacher-hint">للمعلم: ${fmt(rho,2)}</div>`:''}<div id="s2fb"></div>`;
   $('#s2f').onsubmit=e=>{e.preventDefault();if(S.ok)return;const x=parseNum($('#s2a').value);if(isNaN(x))return;
    if(Math.abs(x-rho)<=.03){S.ok=true;G.good();G.add(S.tries?4:10,'s2');rows.push([b.n,b.m,b.V,rho]);done.add(si);table();say($('#s2fb'),'ok',`صحيح: ث = ${b.m} ÷ ${b.V} = ${fmt(rho,2)} جم/سم³. ${rho<1?'كثافتها أقل من كثافة الماء (1 جم/سم³) فهي تطفو.':'كثافتها أكبر من كثافة الماء (1 جم/سم³) فهي تغوص.'}`);if(done.size>=2&&STN.s2.t)G.complete('s2');}
    else{S.tries++;G.bad();say($('#s2fb'),'bad',`اقسم الكتلة على الحجم: ${b.m} ÷ ${b.V}`);}};}
  function table(){$('#s2t').innerHTML=`<thead><tr><th>الجسم</th><th>ك (جم)</th><th>ح (سم³)</th><th>ث (جم/سم³)</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td class="num">${r[1]}</td><td class="num">${r[2]}</td><td class="num">${fmt(r[3],2)}</td></tr>`).join('')||'<tr><td colspan="4" class="empty">لا توجد قياسات بعد.</td></tr>'}</tbody>`;$('#s2n').textContent=rows.length+' / 3';}
  $('#s2b').onclick=e=>{const b=e.target.closest('[data-i]');if(!b)return;si=+b.dataset.i;$$('#s2b button').forEach(x=>x.classList.toggle('on',x===b));G.tick();reset();};
  $('#s2w').onclick=()=>{if(S.in)return;S.w=true;SFX.pop();draw();card();};
  $('#s2d').onclick=()=>{if(!S.w){say($('#s2card'),'info','زِن الكرة أولًا.');return;}if(S.in)return;S.in=true;SFX.thud&&SFX.thud();draw();card();};
  $('#s2r').onclick=reset;reset();table();
  mcq($('#s2think'),{q:'ما الخاصيتان المرتبطتان بقياس الكثافة؟',o:['القوة والوزن','المسافة والزمن','الكتلة والحجم','جميع ما سبق'],a:2,why:'الكثافة = الكتلة ÷ الحجم.'},'s2',()=>{STN.s2.t=true;if(done.size>=2)G.complete('s2');});
  this.reset=()=>{rows.length=0;done.clear();STN.s2.t=false;table();reset();};},
 quiz:[{q:'كتلة المادة الموجودة في وحدة الحجوم:',o:['الكثافة','الكتلة','الحجم','الطول'],a:0},{q:'خاصية فيزيائية تعبر عن مقدار الفراغ (الحيز) الذي يشغله الجسم:',o:['الكثافة','الكتلة','الحجم','اللون'],a:2}],
 explain:'<p><b>الحجم</b> مقدار الحيز الذي يشغله الجسم. ونقيس حجم الجسم غير المنتظم بطريقة <b>الإزاحة</b>: الحجم = قراءة المخبار بعد الغمر − قراءته قبل الغمر.</p><p><b>الكثافة</b> = الكتلة ÷ الحجم (ث = ك ÷ ح)، وتقاس بوحدة كجم/م³ أو جم/سم³. الجسم الأقل كثافة من الماء يطفو، والأكثر كثافة يغوص.</p>'});

/* ================= تدريبات حسابية وتقييم الخواص الفيزيائية ================= */
def('ev1',{n:"تقويم: الخواص الفيزيائية",eyebrow:"تدريبات حسابية وتقييم · الكتاب صفحة 86",title:"تدريبات حسابية وتقييم الخواص الفيزيائية",goal:"حل التدريبات الحسابية، ثم أسئلة التقييم من ١ إلى ٨، ثم راجع ملخص الخواص الفيزيائية.",plan:4,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:`<div class="card"><h3>مُلخّص: الخواص الفيزيائية <span class="cnt-badge">ص 86</span></h3><div style="display:flex;flex-direction:column;align-items:center;gap:10px"><b style="background:#c2410c;color:#fff;border-radius:12px;padding:6px 22px;font-size:1.15rem">الخواص الفيزيائية</b><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px;width:100%"><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">🎨</div>اللون</div><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">🔺</div>الشكل</div><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">📏</div>الطول</div><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">🧊</div>الحجم</div><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">⚖️</div>الكتلة</div><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">🧪</div>الكثافة</div></div></div></div><div class="card" id="ev1Box"></div>`,
 init(){const P=[{"tag": "الربط مع الرياضيات · خمس دقائق", "p": "احسب كثافة جسم صلب كتلته 10 كجم وحجمه 2 م³.", "v": 5, "unit": "كجم/م³", "given": "ك = 10 كجم ، ح = 2 م³", "law": "ث = ك ÷ ح", "sol": "ث = 10 ÷ 2 = 5 كجم/م³"}, {"tag": "حل المعادلات", "p": "كثافة النيكل 8.9 جم/سم³. إذا كان لديك عينة منه حجمها 4 سم³، فما كتلتها؟", "v": 35.6, "unit": "جم", "given": "ث = 8.9 جم/سم³ ، ح = 4 سم³", "want": "ك = ؟", "law": "ك = ث × ح", "sol": "ك = 8.9 × 4 = 35.6 جم", "hint": "من ث = ك ÷ ح نستنتج: ك = ث × ح."}, {"tag": "حل المعادلات", "p": "كثافة الرصاص 11.3 جم/سم³. إذا كان لديك عينة منه حجمها 4 سم³، فما كتلتها؟", "v": 45.2, "unit": "جم", "given": "ث = 11.3 جم/سم³ ، ح = 4 سم³", "want": "ك = ؟", "law": "ك = ث × ح", "sol": "ك = 11.3 × 4 = 45.2 جم"}, {"no": "س١", "q": "أي خاصية للمادة يمكن ملاحظتها أو قياسها دون إحداث تغيير في تركيب المادة الأصلي؟", "o": ["التغير الفيزيائي", "التغير الكيميائي", "الخاصية الفيزيائية", "الخاصية الكيميائية"], "a": 2}, {"no": "س٢", "q": "كل ما له كتلة ويشغل حيزًا من الفراغ:", "o": ["الحجم", "المادة", "الكثافة", "الطول"], "a": 1}, {"no": "س٣", "q": "كمية المادة في الجسم:", "o": ["الحجم", "الكتلة", "الكثافة", "الطاقة"], "a": 1}, {"no": "س٤", "q": "خاصية فيزيائية تعبر عن مقدار الفراغ (الحيز) الذي يشغله الجسم:", "o": ["الكثافة", "الكتلة", "الحجم", "الوزن"], "a": 2, "why": "تكرر هذا السؤال في العرض برقمين (٤ و٥)، فعُرض هنا مرة واحدة."}, {"no": "س٦", "q": "كتلة المادة الموجودة في وحدة الحجوم:", "o": ["الكثافة", "الكتلة", "الحجم", "الوزن"], "a": 0}, {"no": "س٧", "q": "أي العلاقات التالية صحيحة لحساب الكثافة؟", "o": ["الكثافة = الحجم ÷ الكتلة", "الكثافة = الكتلة + الحجم", "الكثافة = الكتلة ÷ الحجم", "الكثافة = الكتلة × الحجم"], "a": 2}, {"no": "س٨", "q": "ما الخاصيتان المرتبطتان بقياس الكثافة؟", "o": ["القوة والوزن", "المسافة والزمن", "الكتلة والحجم", "جميع ما سبق صحيح"], "a": 2}];const box=$('#ev1Box');const solved=P.map(()=>false);box.innerHTML='<div class="prob-list"></div>';const L=box.querySelector('.prob-list');
  P.forEach((q,i)=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+(q.no||i+1)+'</span><span>'+(q.tag||'تقييم')+'</span></div>';const inner=document.createElement('div');d.appendChild(inner);L.appendChild(d);
   const fin=()=>{solved[i]=true;d.classList.add('solved');if(solved.every(Boolean))G.complete('ev1');};if(q.o)mcq(inner,q,'ev1',fin);else calcQ(inner,q,'ev1',fin);});},
 reset(){STN['ev1'].init();},
 explain:"<p>أسئلة تقييم العرض في موضعها من الدرس وبالترتيب نفسه.</p><p>تنبيه للمعلم: السؤالان ٤ و٥ في العرض متطابقان، فعُرضا مرة واحدة.</p>"});
/* ================= S5: physical change ================= */
const PCX=[['s25_9c8de079','تقطيع الفاكهة'],['s25_c93d14e1','ذوبان الثلج'],['s25_de67a087','طحن القهوة'],['s25_7d61b212','قص الورق'],['s25_cfb24928','تكسر الزجاج'],['s25_62d05039','النقش على الخشب'],['s25_06a7795e','طي الملابس'],['s25_5c559a36','غليان الماء']];
const svgIce=(melt)=>`<svg viewBox="0 0 400 250"><rect width="400" height="250" fill="#eaf6fb"/><rect y="200" width="400" height="50" fill="#c8b48a"/>${melt?'<ellipse cx="200" cy="205" rx="120" ry="16" fill="#7fc8e8" opacity=".8"/><ellipse cx="200" cy="200" rx="90" ry="10" fill="#bfe3f5"/>':'<polygon points="150,110 180,90 260,90 230,110" fill="#e8f7ff"/><rect x="150" y="110" width="80" height="90" fill="#c9ecfb"/><polygon points="230,110 260,90 260,180 230,200" fill="#9fd6ef"/>'}<text x="200" y="40" text-anchor="middle" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="24" fill="#14222b">${melt?'ماء سائل':'مكعب جليد'}</text></svg>`;
const svgPaper=(cut)=>`<svg viewBox="0 0 400 250"><rect width="400" height="250" fill="#f6efe2"/>${cut?[[60,70,-12],[170,60,8],[280,80,-6],[110,150,14],[230,150,-10]].map(([x,y,r])=>`<rect x="${x}" y="${y}" width="70" height="60" fill="#fff" stroke="#b9b3a0" transform="rotate(${r} ${x+35} ${y+30})"/>`).join(''):'<rect x="110" y="50" width="180" height="170" fill="#fff" stroke="#b9b3a0"/><path d="M130 90h140M130 120h140M130 150h100" stroke="#cfc8b4" stroke-width="4"/>'}<text x="200" y="36" text-anchor="middle" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="24" fill="#14222b">${cut?'قصاصات ورق':'ورقة كاملة'}</text></svg>`;
def('s5',{n:'3 · التغير الفيزيائي',eyebrow:'المحطة 3 · ورشة الحرفيين',title:'ورشة الحرفيين: التغير الفيزيائي',goal:'اسحب شريط «قبل/بعد»: ما الذي تغيّر؟ وهل بقيت المادة هي نفسها؟',plan:6,core:1,
 icon:'<rect x="10" y="22" width="26" height="34" fill="none" stroke="currentColor" stroke-width="5"/><path d="M44 40h12M50 34l6 6-6 6" stroke="currentColor" stroke-width="5" fill="none"/><rect x="60" y="18" width="12" height="18" fill="currentColor"/><rect x="60" y="44" width="12" height="18" fill="currentColor"/>',
 body:`<div class="card"><div class="two"><div><h3 class="sl-t">التغير الفيزيائي</h3><p class="def" style="font-size:1.1rem">تغير الخواص الفيزيائية مع بقاء هوية المادة الأصلية دون تغيير.</p><p class="step-text">يتغير الشكل أو الحجم أو الحالة، لكن المادة تبقى هي نفسها ولا تتكون مادة جديدة.</p></div>
    <div><div class="seg" id="s5bas"><button type="button" data-i="0" class="on">الجليد</button><button type="button" data-i="1">الورق</button></div><div id="s5ba" class="mt"></div></div></div></div>
  <div class="card"><div class="nb-head"><h2>تغيرات فيزيائية من حولنا</h2><span>من العرض</span></div><div class="gallery">${PCX.map(([n,c])=>`<figure>${pic(n,c)}<figcaption>${c}</figcaption></figure>`).join('')}</div></div>
  <div class="two"><div class="card"><h3>أي مما يلي يُعد تغيرًا فيزيائيًّا؟</h3><div id="s5sort"></div></div><div class="card"><h3>قصة: صباح في ركن القهوة ☕</h3><div id="s5story"></div></div></div>
  ${vcard('nation','السعودية الخضراء وإعادة التدوير',`<p>عند إعادة تدوير العبوات البلاستيكية تُفرز أولًا حسب خواصها الفيزيائية مثل اللون والشكل، ثم تُقطّع وتُصهر لتُشكَّل من جديد. وإعادة التدوير تخدم أهداف مبادرة «السعودية الخضراء» في حماية البيئة.</p>`)}`,
 init(){let a=false,b=false;const chk=()=>{if(a&&b)G.complete('s5');};
  const BA=[{a:svgIce(0),b:svgIce(1),la:'قبل: صلب',lb:'بعد: سائل'},{a:svgPaper(0),b:svgPaper(1),la:'قبل',lb:'بعد'}];
  const showBA=i=>beforeAfter($('#s5ba'),BA[i]);showBA(0);
  $('#s5bas').onclick=e=>{const t=e.target.closest('[data-i]');if(!t)return;$$('#s5bas button').forEach(x=>x.classList.toggle('on',x===t));showBA(+t.dataset.i);G.tick();};
  sortGame($('#s5sort'),{bins:['تغير فيزيائي','ليس تغيرًا فيزيائيًّا'],items:[['انصهار الثلج',0],['نشر الخشب',0],['تفتت الزجاج',0],['احتراق الورق',1,'الاحتراق ينتج مواد جديدة (تغير كيميائي).'],['تعفن التفاح',1,'التعفن ينتج مواد جديدة (تغير كيميائي).'],['صدأ الحديد',1,'الصدأ مادة جديدة (تغير كيميائي).']],hint:'هل بقيت المادة نفسها؟'},'s5',()=>{a=true;chk();});
  story($('#s5story'),{
   a:{k:'المشهد 1',im:'s25_de67a087',text:'في ركن القهوة بسوق الأحساء، أمامك حبوب بن. ماذا تفعل؟',choices:[{t:'أطحن الحبوب في المطحنة',to:'b',pts:4},{t:'أحمّص الحبوب على النار',to:'c'}]},
   b:{k:'المشهد 2',im:'s25_de67a087',text:'صار البن مسحوقًا ناعمًا. تغيّر شكله وحجم حبيباته، لكنه ما زال بنًّا. ما نوع هذا التغير؟',choices:[{t:'تغير فيزيائي',to:'d',pts:6},{t:'مادة جديدة تكوّنت',to:'e'}]},
   c:{k:'المشهد 2',text:'تغيّر لون الحبوب ورائحتها أثناء التحميص وتكوّنت مواد جديدة. هذا ليس تغيرًا فيزيائيًّا، بل سنتعرّفه في الدرس القادم: التغير الكيميائي!',end:'جرّب الطريق الآخر لترى التغير الفيزيائي.',choices:[]},
   d:{k:'النهاية',im:'s37_3f3fabbb',text:'أحسنت! ثم وضعت الماء في الدلّة حتى غلى: تحوّل جزء منه إلى بخار (تغير فيزيائي آخر).',end:'طحن البن وغليان الماء تغيرات فيزيائية: تتغير الخواص وتبقى هوية المادة.',good:true,choices:[]},
   e:{k:'تنبيه',text:'لا! البن المطحون هو البن نفسه؛ لم تتكوّن مادة جديدة.',choices:[{t:'أعد التفكير',to:'b'}]}},'a','s5');
  b=true;},
 quiz:[{q:'تغير الخواص الفيزيائية مع بقاء هوية المادة الأصلية دون تغيير:',o:['التغير الكيميائي','التغير الفيزيائي','الخاصية الكيميائية','الاحتراق'],a:1},{q:'أي مما يلي تغير فيزيائي؟',o:['احتراق الورق','صدأ الحديد','طحن القهوة','تعفن التفاح'],a:2}],
 explain:'<p><b>التغير الفيزيائي</b>: تغير الخواص الفيزيائية مع بقاء هوية المادة. أمثلة من العرض: تقطيع الفاكهة، وذوبان الثلج، وطحن القهوة، وقص الورق، وتكسر الزجاج، والنقش على الخشب، وطي الملابس، وغليان الماء.</p>'});

/* ================= S3: states of matter ================= */
def('s3',{n:'4 · حالات المادة',eyebrow:'المحطة 4 · سوق الماء والتمور',title:'حالات المادة الأربع',goal:'تعتمد حالة المادة على درجة حرارتها ومقدار الضغط الواقع عليها. حرّك منزلق الحرارة وراقب الجسيمات.',plan:7,core:1,
 icon:'<circle cx="20" cy="58" r="8" fill="currentColor"/><circle cx="38" cy="58" r="8" fill="currentColor"/><circle cx="29" cy="43" r="8" fill="currentColor"/><circle cx="60" cy="20" r="8" fill="currentColor" opacity=".6"/><circle cx="66" cy="48" r="8" fill="currentColor" opacity=".6"/>',
 body:`<div class="card" id="s3sl"></div>
  <div class="two"><div class="stage"><canvas id="s3c" width="720" height="420" aria-label="نموذج جسيمات المادة"></canvas>
    <div class="ctrl"><label for="s3T">درجة حرارة الماء: <b id="s3Tv">25</b> °س</label><input type="range" id="s3T" min="-30" max="140" value="25"></div>
    <div class="readouts pad"><div class="ro"><small>الحالة</small><b class="ar" id="s3st">سائلة</b></div><div class="ro"><small>حركة الجسيمات</small><b class="ar" id="s3mv">تنزلق فوق بعضها</b></div></div></div>
   <div class="side"><div class="card"><h3>مقارنة بين حالات المادة</h3><p class="step-text muted" style="font-size:.88rem">اختر الوصف المناسب في كل خانة.</p><div id="s3tab"></div></div></div></div>
  <div class="card" id="s3pl"></div>
  <div class="two"><div class="card"><h3>تغير حالة المادة</h3><p class="step-text">تتغير حالة المادة من حالة إلى أخرى بفعل الحرارة أو الضغط. المس كل سهم لتعرف اسم التحول.</p><svg id="s3cyc" viewBox="0 0 600 260" style="width:100%;height:auto" aria-label="دورة تغير الحالة"></svg><div id="s3cfb"></div></div>
   <div class="side">${vcard('islam','الماء أصل الحياة',`${ayah('وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ','الأنبياء: 30')}<p class="mt">الماء المادة الوحيدة التي نراها في حياتنا اليومية بحالاتها الثلاث: جليدًا وماءً وبخارًا. ومن شكر النعمة ألّا نسرف فيه: ﴿وَكُلُوا وَاشْرَبُوا وَلَا تُسْرِفُوا﴾ [الأعراف: 31].</p>`)}</div></div>`,
 init(){slides($('#s3sl'),[
   {k:'حالات المادة',t:'أربع حالات للمادة',im:[P('s34_d74e9704','الصلبة والسائلة والغازية والبلازما')],html:'<p>للمادة أربع حالات: <b>الصلبة</b> و<b>السائلة</b> و<b>الغازية</b> و<b>البلازما</b>.</p><p class="def">حالة المادة خاصية فيزيائية يمكن استخدامها في تصنيف المواد.</p><p>تعتمد حالة المادة على درجة حرارتها ومقدار الضغط الواقع عليها.</p>'},
   {k:'حالة البلازما',t:'البلازما',im:[P('s27_5915138c','مصابيح النيون')],html:'<p>تحدث البلازما عند درجات الحرارة العالية جدًّا، كما في أنابيب الفلورسنت الضوئية (النيون)، والبرق، وحالة النجوم.</p>'},
   {k:'أمثلة',t:'أمثلة على كل حالة',im:[P('s30_45c7b66a','الثلج: صلب'),P('s37_3f3fabbb','الماء يغلي: سائل وغاز')],html:'<p><b>الصلبة:</b> الزجاج، الخشب، الثلج.</p><p><b>السائلة:</b> الماء، العصير، الزئبق.</p><p><b>الغازية:</b> الهواء، بخار الماء، الأكسجين.</p><p><b>البلازما:</b> مصابيح النيون، البرق، النجوم.</p>'}],'s3');
  K.plasmaCorner($('#s3pl'));
  const cv=$('#s3c'),c=cv.getContext('2d'),W=720,H=420,N=42;let T=25,P0=[];
  for(let i=0;i<N;i++){const col=i%7,row=Math.floor(i/7);P0.push({hx:220+col*40+(row%2)*20,hy:370-row*36,x:220+col*40,y:370-row*36,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2});}
  const st=()=>T<0?'s':T<100?'l':'g';const NAME={s:'صلبة',l:'سائلة',g:'غازية'},MV={s:'اهتزازية في مكانها',l:'تنزلق فوق بعضها',g:'تتحرك بحرية'};const seen=new Set();
  $('#s3T').oninput=e=>{T=+e.target.value;$('#s3Tv').textContent=T;const s=st();$('#s3st').textContent=NAME[s];$('#s3mv').textContent=MV[s];if(!seen.has(s)){seen.add(s);if(seen.size===3)K.banner('شاهدت الحالات الثلاث!','الصلبة والسائلة والغازية');chk();}};
  function frame(){if(G.cur==='s3'&&!G.paused){const s=st(),sp=s==='s'?.6:s==='l'?2.2:5;
    c.fillStyle=css('--surface-2');c.fillRect(0,0,W,H);c.strokeStyle=css('--glass-edge');c.lineWidth=3;c.strokeRect(150,30,420,370);
    if(s==='s'){P0.forEach(p=>{p.x=p.hx+(Math.random()-.5)*4;p.y=p.hy+(Math.random()-.5)*4;p.vx=(Math.random()-.5)*2;p.vy=0;});}
    else{const g=s==='l'?.35:0,damp=s==='l'?.9:1,vmax=s==='l'?2.5:6;
     for(let it=0;it<(s==='l'?4:1);it++)for(let a=0;a<N;a++)for(let b=a+1;b<N;b++){const A=P0[a],B=P0[b],dx=B.x-A.x,dy=B.y-A.y,d=Math.hypot(dx,dy)||1,min=29;if(d<min){const f=(min-d)/2,ux=dx/d,uy=dy/d;A.x-=ux*f;A.y-=uy*f;B.x+=ux*f;B.y+=uy*f;if(s==='g'){const t=A.vx;A.vx=B.vx;B.vx=t;const u=A.vy;A.vy=B.vy;B.vy=u;}}}
     P0.forEach(p=>{p.vy+=g;p.vx+=(Math.random()-.5)*(s==='l'?.8:.2);p.vx*=damp;p.vy*=damp;const v=Math.hypot(p.vx,p.vy);if(s==='g'&&v<4){p.vx*=1.1;p.vy*=1.1;}if(v>vmax){p.vx*=vmax/v;p.vy*=vmax/v;}p.x+=p.vx;p.y+=p.vy;
      if(p.x<165){p.x=165;p.vx=Math.abs(p.vx);}if(p.x>555){p.x=555;p.vx=-Math.abs(p.vx);}if(p.y>385){p.y=385;p.vy=-Math.abs(p.vy)*(s==='l'?.2:1);}if(p.y<45){p.y=45;p.vy=Math.abs(p.vy);}});}
    P0.forEach(p=>{c.fillStyle='#3a9cd4';c.beginPath();c.arc(p.x,p.y,13,0,7);c.fill();c.fillStyle='rgba(255,255,255,.5)';c.beginPath();c.arc(p.x-4,p.y-4,4,0,7);c.fill();});
    c.font='800 22px "Baloo Bhaijaan 2"';c.direction='rtl';c.textAlign='center';c.fillStyle=css('--ink');c.fillText('الماء في الحالة '+NAME[s],W/2,24);c.direction='ltr';}
    requestAnimationFrame(frame);}
  requestAnimationFrame(frame);
  /* comparison table */
  const ROWS=[['حركة الدقائق',['اهتزازية في مكانها','تنزلق فوق بعضها البعض','تتحرك بحرية']],['الحجم',['ثابت','ثابت','حسب شكل الوعاء']],['الشكل',['ثابت','حسب شكل الوعاء','حسب شكل الوعاء']],['تقارب الجزيئات',['متقاربة جدًّا','متقاربة نوعًا ما','متباعدة']]];
  const OPTS=['اهتزازية في مكانها','تنزلق فوق بعضها البعض','تتحرك بحرية','ثابت','حسب شكل الوعاء','متقاربة جدًّا','متقاربة نوعًا ما','متباعدة'];
  let tabOk=false;
  $('#s3tab').innerHTML=`<div class="tablewrap"><table class="data"><thead><tr><th>حالة المادة</th><th>الصلبة</th><th>السائلة</th><th>الغازية</th></tr></thead><tbody>${ROWS.map((r,i)=>`<tr><td>${r[0]}</td>${r[1].map((_,j)=>`<td><select data-r="${i}" data-c="${j}" aria-label="${r[0]}"><option value="">؟</option>${OPTS.map(o=>`<option>${o}</option>`).join('')}</select></td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="row-actions"><button class="btn" type="button" id="s3tc">تحقق</button></div><div id="s3tfb"></div>`;
  $('#s3tc').onclick=()=>{let wrong=0;$$('#s3tab select').forEach(s=>{const ok=s.value===ROWS[+s.dataset.r][1][+s.dataset.c];s.style.borderColor=ok?'var(--ok)':'var(--bad)';if(!ok)wrong++;});
   if(!wrong){if(!tabOk){tabOk=true;G.good();G.add(10,'s3');}say($('#s3tfb'),'ok','جدول صحيح بالكامل!');chk();}else{G.bad();say($('#s3tfb'),'bad',`${wrong} خانات تحتاج إلى مراجعة (باللون الأحمر).`);}};
  /* change-of-state cycle */
  const cyc=$('#s3cyc');const ARR=[{id:'m',n:'الانصهار',d:'تحول المادة من الحالة الصلبة إلى السائلة.',p:'M150 90 Q225 40 290 90'},{id:'f',n:'التجمد',d:'تحول المادة من الحالة السائلة إلى الصلبة.',p:'M290 170 Q225 220 150 170'},{id:'e',n:'التبخر',d:'تحول المادة من الحالة السائلة إلى الغازية.',p:'M330 90 Q395 40 460 90'},{id:'c',n:'التكثف',d:'تحول المادة من الحالة الغازية إلى السائلة.',p:'M460 170 Q395 220 330 170'}];const cseen=new Set();
  cyc.innerHTML=`<defs><marker id="ah" markerUnits="userSpaceOnUse" markerWidth="18" markerHeight="18" refX="10" refY="9" orient="auto"><path d="M0 0L18 9L0 18z" fill="var(--accent)"/></marker><marker id="ahx" markerWidth="1" markerHeight="1"><path d="M0 0L10 5L0 10z" fill="var(--accent)"/></marker></defs>`+[['صلب',100,'#7fc8e8'],['سائل',310,'#3a9cd4'],['غاز',520,'#bfe3f5']].map(([t,x,col])=>`<circle cx="${x}" cy="130" r="56" fill="${col}" opacity=".35" stroke="${col}" stroke-width="4"/><text x="${x}" y="138" text-anchor="middle" font-family="Baloo Bhaijaan 2" font-weight="800" font-size="24" fill="var(--ink)">${t}</text>`).join('')
   +ARR.map(a=>`<g class="cell" data-a="${a.id}" style="cursor:pointer"><path d="${a.p}" fill="none" stroke="var(--accent)" stroke-width="6" marker-end="url(#ah)"/><path d="${a.p}" fill="none" stroke="transparent" stroke-width="30"/><text x="${a.p.split(' ')[2].slice(1)}" y="${a.id==='m'||a.id==='e'?34:244}" text-anchor="middle" font-family="IBM Plex Sans Arabic" font-weight="700" font-size="16" fill="var(--accent)" data-l="${a.id}">؟</text></g>`).join('');
  cyc.querySelectorAll('[data-a]').forEach(g=>g.onclick=()=>{const a=ARR.find(x=>x.id===g.dataset.a);cyc.querySelector(`[data-l="${a.id}"]`).textContent=a.n;cseen.add(a.id);SFX.pop();say($('#s3cfb'),'info',`<b>${a.n}:</b> ${a.d}`);chk();});
  function chk(){if(seen.size>=3&&tabOk&&cseen.size===4)G.complete('s3');}
  this.reset=()=>{seen.clear();cseen.clear();tabOk=false;};},
 quiz:[{q:'يوجد البرق في الحالة:',o:['الغازية','الصلبة','البلازما','السائلة'],a:2},{q:'يمكن أن تتحول المادة من حالة إلى أخرى.',o:['صح','خطأ'],a:0,cols:true}],
 explain:'<p>للمادة أربع حالات. في <b>الصلبة</b> تهتز الدقائق في مكانها وهي متقاربة جدًّا، فالشكل والحجم ثابتان. في <b>السائلة</b> تنزلق فوق بعضها، فالحجم ثابت والشكل حسب الوعاء. في <b>الغازية</b> تتحرك بحرية وهي متباعدة، فلا شكل ثابت ولا حجم ثابت. و<b>البلازما</b> تحدث عند درجات الحرارة العالية جدًّا.</p><p>تتغير حالة المادة بفعل الحرارة أو الضغط: انصهار، تجمد، تبخر، تكثف.</p>'});

/* ================= S4: melting & boiling ================= */
def('s4',{n:'5 · الانصهار والغليان',eyebrow:'المحطة 5 · ركن القهوة',title:'ركن القهوة: درجتا الانصهار والغليان',goal:'سخّن الجليد وراقب منحنى درجة الحرارة مع الزمن. ماذا يحدث لدرجة الحرارة أثناء تغير الحالة؟',plan:7,core:1,
 icon:'<rect x="34" y="6" width="12" height="54" rx="6" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="40" cy="66" r="11" fill="currentColor"/><rect x="37" y="28" width="6" height="34" fill="currentColor"/>',
 body:`<div class="card" id="s4sl"></div>
  <div class="two"><div class="stage"><canvas id="s4g" width="720" height="380" aria-label="منحنى التسخين"></canvas>
    <div class="sim-bar"><button class="btn" type="button" id="s4go">شغّل السخّان 🔥</button><button class="tbtn" type="button" id="s4r">أعِد</button><span class="muted">الزمن مسرّع · ضغط جوي واحد · ماء نقي</span></div>
    <div class="readouts pad"><div class="ro"><small>درجة الحرارة</small><b id="s4T">-20 °C</b></div><div class="ro"><small>ما يحدث الآن</small><b class="ar" id="s4ph">جليد يسخن</b></div></div></div>
   <div class="side"><div class="card"><h3>ماذا لاحظت؟</h3><div id="s4q"></div></div></div></div>
  <div class="two"><div class="card"><h3>فسّر ما ترى <span class="cnt-badge">ص 82</span></h3><div class="two"><div>${pic('s32_77d1fdcc','الماء يغلي عند تفريغ الهواء','story-im')}</div><div><p class="step-text">يُفرَّغ الهواء من فوق الماء الموجود في الدورق، فيبدأ الماء بالغليان رغم أنه لم يُسخَّن!</p><div id="s4q2"></div></div></div></div>
   ${vcard('nation','الدلّة والقهوة السعودية',`<p>عند إعداد القهوة السعودية يغلي الماء في الدلّة. أثناء الغليان تبقى درجة حرارة الماء ثابتة عند درجة غليانه حتى يتحول إلى بخار، فلا فائدة من زيادة اللهب إلا الإسراف في الوقود.</p>`)}</div>`,
 init(){slides($('#s4sl'),[
   {k:'تغير حالة المادة',t:'درجة الانصهار',im:[P('s30_45c7b66a','جليد ينصهر'),P('s30_92b0a05f','الرصاص')],html:'<p class="def">درجة الانصهار: درجة الحرارة التي يحدث عندها تحول المادة من حالة الصلابة إلى الحالة السائلة.</p><p>ينصهر الرصاص عند درجة حرارة <b>327°س</b>، وعندما ينصهر يتحول من الحالة الصلبة إلى السائلة؛ وهذا <b>تغير فيزيائي</b>، بينما تعد درجة انصهاره <b>خاصية فيزيائية</b>.</p>'},
   {k:'تغير حالة المادة',t:'درجة الغليان',im:[P('s31_7e7510a0','النيتروجين السائل'),P('s35_c2667617','ماء يغلي')],html:'<p class="def">درجة الغليان: النقطة التي تثبت عندها درجة الحرارة عند تحول المادة من الحالة السائلة إلى الحالة الغازية.</p><p>درجة غليان الماء تساوي <b>100°س</b> عند ضغط جوي واحد.</p><p>درجة غليان النيتروجين تساوي <b>−195.8°س</b>؛ ولذلك يتحول إلى غاز عند وضعه في الهواء.</p>'}],'s4');
  const g=$('#s4g'),x=g.getContext('2d'),W=720,H=380,L=60,R=20,Tp=20,B=40;let S;const SEG=[[0,-20],[2,0],[6,0],[11,100],[17,100],[19,120]];
  const Tat=t=>{for(let i=1;i<SEG.length;i++){if(t<=SEG[i][0]){const a=SEG[i-1],b=SEG[i];return a[1]+(b[1]-a[1])*(t-a[0])/(b[0]-a[0]);}}return 120;};
  const PH=t=>t<2?'جليد يسخن':t<6?'انصهار: الحرارة ثابتة عند 0°س':t<11?'ماء سائل يسخن':t<17?'غليان: الحرارة ثابتة عند 100°س':'بخار يسخن';
  function reset(){S={t:0,run:false};draw();}
  function draw(){x.fillStyle=css('--surface');x.fillRect(0,0,W,H);x.strokeStyle=css('--line');x.lineWidth=1;x.fillStyle=css('--muted');x.font='12px "Share Tech Mono"';
   for(let v=-20;v<=120;v+=20){const y=H-B-(H-B-Tp)*(v+20)/140;x.beginPath();x.moveTo(L,y);x.lineTo(W-R,y);x.stroke();x.textAlign='right';x.fillText(v,L-6,y+4);}
   [0,100].forEach(v=>{const y=H-B-(H-B-Tp)*(v+20)/140;x.strokeStyle=css('--amber');x.setLineDash([6,5]);x.beginPath();x.moveTo(L,y);x.lineTo(W-R,y);x.stroke();x.setLineDash([]);x.strokeStyle=css('--line');});
   x.fillStyle=css('--ink');x.font='700 13px "IBM Plex Sans Arabic"';x.direction='rtl';x.textAlign='center';x.fillText('الزمن',(W+L)/2,H-10);x.save();x.translate(16,H/2);x.rotate(-Math.PI/2);x.fillText('درجة الحرارة (°س)',0,0);x.restore();x.direction='ltr';
   x.strokeStyle=css('--accent');x.lineWidth=4;x.beginPath();const N=120;for(let i=0;i<=N;i++){const t=S.t*i/N,px=L+(W-L-R)*t/19,py=H-B-(H-B-Tp)*(Tat(t)+20)/140;i?x.lineTo(px,py):x.moveTo(px,py);}x.stroke();
   $('#s4T').textContent=Math.round(Tat(S.t))+' °C';$('#s4ph').textContent=PH(S.t);}
  $('#s4go').onclick=()=>{if(S.run)return;if(S.t>=19)reset();S.run=true;let last=performance.now();const step=now=>{if(!S.run)return;const dt=(now-last)/1000;last=now;if(!G.paused&&G.cur==='s4')S.t=Math.min(19,S.t+dt*1.4);draw();if(S.t>=19){S.run=false;STN.s4.ran=true;chk();return;}requestAnimationFrame(step);};requestAnimationFrame(step);};
  $('#s4r').onclick=()=>{S.run=false;reset();};reset();let q1=false,q2=false;const chk=()=>{if(STN.s4.ran&&q1&&q2)G.complete('s4');};
  mcq($('#s4q'),{q:'ماذا يحدث لدرجة حرارة الماء أثناء الغليان عند ضغط جوي واحد؟',o:['ترتفع باستمرار','تبقى ثابتة عند 100°س حتى يتحول كله إلى بخار','تنخفض','تصبح صفرًا'],a:1,why:'الحرارة تُستهلك في تحويل السائل إلى غاز، فتثبت درجة الحرارة.'},'s4',()=>{q1=true;chk();});
  mcq($('#s4q2'),{q:'لماذا غلى الماء دون تسخين؟',o:['لأن الماء أصبح ساخنًا جدًّا','لأن تقليل الضغط فوق الماء يخفض درجة غليانه','لأن الماء تحوّل إلى مادة جديدة','لأن الهواء دخل إلى الماء'],a:1,why:'حالة المادة تعتمد على درجة حرارتها ومقدار الضغط الواقع عليها؛ فعند تقليل الضغط يغلي الماء عند درجة حرارة أقل.'},'s4',()=>{q2=true;chk();});
  this.reset=()=>{STN.s4.ran=false;q1=q2=false;reset();};},
 quiz:[{q:'هي درجة الحرارة التي تتحول عندها المادة من الحالة الصلبة إلى السائلة:',o:['درجة التجمد','درجة الغليان','درجة الانصهار','الدرجة المثالية'],a:2},{q:'ما التغير الفيزيائي الذي يحدث عند درجة الغليان؟',o:['تغير حالة المادة من السائلة إلى الغازية','تكوّن مادة جديدة','تغير لون المادة','تجمد المادة'],a:0}],
 explain:'<p><b>درجة الانصهار</b> درجة الحرارة التي تتحول عندها المادة من الصلبة إلى السائلة (الرصاص 327°س). <b>درجة الغليان</b> النقطة التي تثبت عندها درجة الحرارة عند تحول السائل إلى غاز (الماء 100°س عند ضغط جوي واحد، والنيتروجين −195.8°س).</p><p>الانصهار والغليان تغيرات فيزيائية، أما درجتا الانصهار والغليان فخاصيتان فيزيائيتان تميزان المادة.</p>'});

/* ================= تقييم حالات المادة وتغير حالتها ================= */
def('ev2',{n:"تقويم: حالات المادة وتغيرها",eyebrow:"تقييم · الأسئلة ٩–١٢",title:"تقييم حالات المادة وتغير حالتها",goal:"أسئلة التقييم من ٩ إلى ١٢ كما في العرض.",plan:4,core:1,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:`<div class="card" id="ev2Box"></div>`,
 init(){const P=[{"no": "س٩", "q": "يوجد البرق في الحالة:", "o": ["الغازية", "الصلبة", "البلازما", "السائلة"], "a": 2}, {"no": "س١٠", "q": "يمكن أن تتحول المادة من حالة لأخرى.", "o": ["صح", "خطأ"], "a": 0, "cols": true}, {"no": "س١١", "q": "هي النقطة التي تثبت عندها درجة الحرارة عند تحول المادة من الحالة السائلة إلى الحالة الغازية:", "o": ["درجة التجمد", "درجة الغليان", "درجة الانصهار", "الدرجة المثالية"], "a": 1}, {"no": "س١١", "q": "هي درجة الحرارة التي تتحول عندها المادة من الحالة الصلبة إلى السائلة:", "o": ["درجة التجمد", "درجة الغليان", "درجة الانصهار", "الدرجة المثالية"], "a": 2}, {"no": "س١٢", "q": "ما التغير الفيزيائي الذي يحدث عند درجة الغليان؟", "o": ["تغير حالة المادة من السائلة إلى الغازية", "تكوّن مادة جديدة", "تغير لون المادة", "تجمد المادة"], "a": 0}];const box=$('#ev2Box');const solved=P.map(()=>false);box.innerHTML='<div class="prob-list"></div>';const L=box.querySelector('.prob-list');
  P.forEach((q,i)=>{const d=document.createElement('div');d.className='prob';d.innerHTML='<div class="ptitle"><span class="tag">'+(q.no||i+1)+'</span><span>'+(q.tag||'تقييم')+'</span></div>';const inner=document.createElement('div');d.appendChild(inner);L.appendChild(d);
   const fin=()=>{solved[i]=true;d.classList.add('solved');if(solved.every(Boolean))G.complete('ev2');};if(q.o)mcq(inner,q,'ev2',fin);else calcQ(inner,q,'ev2',fin);});},
 reset(){STN['ev2'].init();},
 explain:"<p>أسئلة تقييم العرض في موضعها من الدرس وبالترتيب نفسه.</p>"});
/* ================= S6: metals ================= */
def('s6',{n:'6 · خواص الفلزات',eyebrow:'المحطة 6 · سوق الذهب',title:'سوق الذهب: خواص الفلزات',goal:'تأمل هذه المواد: حاول أن تجد صفات مشتركة بينها.',plan:5,core:1,
 icon:'<path d="M16 10v30a24 24 0 0 0 48 0V10H48v30a8 8 0 0 1-16 0V10z" fill="currentColor"/>',
 body:`<div class="card" id="s6sl"></div>
  <div class="two"><div class="card"><h3>اكتشف الخاصية</h3><div id="s6q"></div></div>
   <div class="side">${vcard('islam','الحديد فيه بأس شديد',`${ayah('وَأَنزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ وَمَنَافِعُ لِلنَّاسِ','الحديد: 25')}<p class="mt">من منافع الحديد قابليته للطرق والسحب وانجذابه للمغناطيس، فنصنع منه حديد البناء والأدوات.</p>`)}
    ${vcard('nation','عملات من تاريخ وطني',`${pic('s41_a8d013a8','عملات معدنية سعودية قديمة','auc-im')}<p>العملات المعدنية تُصنع من الفلزات لأنها قابلة للطرق وتتحمل التداول.</p>`)}</div></div>`,
 init(){slides($('#s6sl'),[
   {k:'خواص الفلزات',t:'تأمل هذه المواد',im:[P('s38_c7698838','فلزات مختلفة')],html:'<p>حاول أن تجد صفات مشتركة بين هذه المواد. إنها <b>فلزات</b>، ولها خواص فيزيائية مميزة.</p>'},
   {k:'1',t:'لها بريق ولمعان',im:[P('s39_d37cbdbe','فلزات لامعة')],html:'<p>ينتج البريق واللمعان عن عكس سطح الفلز الضوء الساقط عليه.</p>'},
   {k:'2',t:'قابلة للطرق والسحب',im:[P('s40_e07ec385','صفائح'),P('s40_0abac605','أسلاك'),P('s40_b5ff6271','نموذج من الأسلاك')],html:'<p>يمكن طرقها بأدوات أخرى كالمطرقة لعمل صفائح، ويمكن سحبها أيضًا لعمل أسلاك وغيرها.</p><p>استغل الفنان خاصية السحب التي تمتاز بها الفلزات، فاستخدم الأسلاك في عمل هذا النموذج.</p>'},
   {k:'3',t:'موصلة جيدة للكهرباء والحرارة',im:[P('s42_9502a32e','قدر طبخ'),P('s42_8b1e8047','أسلاك كهربائية')],html:'<p>تُستخدم الفلزات في صناعة أواني الطبخ لأن لها القدرة على توصيل الحرارة بكفاءة عالية.</p><p>وتُستخدم في صناعة أسلاك التوصيل الكهربائي لأن لها القدرة على توصيل الكهرباء بكفاءة عالية.</p>'},
   {k:'4',t:'بعض الفلزات لها خواص مغناطيسية',im:[P('s43_c3a1c66a','مغناطيس رافع'),P('s43_2650b6b4','مغناطيس كهربائي')],html:'<p>يمكن جذبها بوساطة المغناطيس؛ حيث يُستخدم المغناطيس لرفع بعض الأجسام الفلزية الثقيلة التي لها خاصية الانجذاب نحوه.</p><p>هل سمعت عن المغناطيس الكهربائي؟ صمّمه بنفسك!</p>'}],'s6',()=>{STN.s6.sl=true;chk();});
  const Q=[{q:'لماذا تُصنع أواني الطبخ من الفلزات؟',fig:pic('s41_21881bc9','أوانٍ','auc-im'),o:['لأنها لامعة فقط','لأنها موصلة جيدة للحرارة','لأنها تنجذب للمغناطيس','لأنها خفيفة دائمًا'],a:1},
   {q:'خاصية استخدمها الفنان لصنع هذا النموذج:',fig:pic('s40_b5ff6271','نموذج أسلاك','auc-im'),o:['قابلية السحب','التوصيل الكهربائي','المغناطيسية','الانصهار'],a:0},
   {q:'أي مما يلي ليس من خواص الفلزات؟',o:['قابلة للطرق والسحب','موصلة جيدة للكهرباء والحرارة','جميعها لها نفس درجة الغليان والانصهار','بعضها له خواص مغناطيسية'],a:2,why:'لكل فلز درجة انصهار وغليان خاصة به.'}];
  let k=0,ok=0;const box=$('#s6q');const show=()=>{box.innerHTML=`<span class="cnt-badge">${k+1} / ${Q.length}</span><div></div>`;mcq(box.lastChild,Q[k],'s6',()=>{const n=document.createElement('div');n.className='row-actions';n.innerHTML=k<Q.length-1?'<button class="btn" type="button">التالي</button>':'<span class="status">أنجزت الأسئلة ✓</span>';box.appendChild(n);if(k<Q.length-1)n.firstChild.onclick=()=>{k++;show();};else{STN.s6.q=true;chk();}});};show();
  function chk(){if(STN.s6.sl&&STN.s6.q)G.complete('s6');}
  this.reset=()=>{k=0;STN.s6.q=false;show();};},
 quiz:[{q:'ينتج البريق واللمعان في الفلزات عن:',o:['امتصاص الضوء','عكس سطح الفلز الضوء الساقط عليه','حرارة الفلز','مغناطيسية الفلز'],a:1},{q:'كل الفلزات تنجذب للمغناطيس.',o:['صح','خطأ'],a:1,cols:true,why:'بعض الفلزات فقط لها خواص مغناطيسية.'}],
 explain:'<p>خواص الفلزات: 1) لها بريق ولمعان لأن سطحها يعكس الضوء. 2) قابلة للطرق (صفائح) والسحب (أسلاك). 3) موصلة جيدة للكهرباء والحرارة. 4) بعضها له خواص مغناطيسية.</p>'});

/* ================= الخلاصة ================= */
def('sum',{n:"الخلاصة",eyebrow:"الخلاصة · الكتاب صفحة 89",title:'الخلاصة',goal:'أهم أفكار الدرس كما في العرض.',plan:2,
 icon:'<rect x="14" y="10" width="52" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 28h32M24 40h32M24 52h20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:`<div class="two"><div class="card"><h3>الخواص الفيزيائية</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>تضم الخواص الفيزيائية كلًّا من اللون والشكل والطول والكتلة والحجم والكثافة.</li></ul></div><div class="card"><h3>حالات المادة</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>للمادة حالات أربع.</li><li>يمكن للمادة أن تتغير من حالة إلى أخرى.</li><li>تحدد حالة المادة بمقدار طاقة الجسيمات فيها.</li></ul></div><div class="card"><h3>أهمية الخواص الفيزيائية</h3><ul class="step-text" style="margin:0;line-height:1.9"><li>يمكن تصنيف المواد تبعًا لخواصها الفيزيائية.</li></ul></div></div><div class="card"><div style="display:flex;flex-direction:column;align-items:center;gap:10px"><b style="background:#c2410c;color:#fff;border-radius:12px;padding:6px 22px;font-size:1.15rem">الخواص الفيزيائية</b><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:8px;width:100%"><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">🎨</div>اللون</div><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">🔺</div>الشكل</div><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">📏</div>الطول</div><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">🧊</div>الحجم</div><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">⚖️</div>الكتلة</div><div style="border:2px solid var(--line);border-radius:12px;padding:8px 4px;text-align:center;font-weight:700"><div style="font-size:1.8rem">🧪</div>الكثافة</div></div></div></div>`,
 init(){},enter(){G.complete('sum');},reset(){},explain:'<p>خلاصة الدرس كما في العرض.</p>'});
/* ================= SELF TEST ================= */
def('self',{n:'اختبر نفسك',eyebrow:'كتاب الطالب ص 90',title:'اختبر نفسك: الأسئلة والحلول',goal:'أسئلة «اختبر نفسك» في نهاية الدرس مع الحل النموذجي.',plan:3,
 icon:'<rect x="14" y="8" width="52" height="64" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 30l6 6 12-12M24 54l6 6 12-12" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',body:'<div class="card" id="selfBox"></div>',
 init(){STN.self.s=solutions($('#selfBox'),[
  {k:'اذكر',q:'اذكر الخواص الفيزيائية لهذا الكتاب.',a:[['الإجابة','له كتلة، وله لون، وله حجم، وله كثافة، وله شكل... إلخ.']]},
  {k:'سمِّ',q:'سمِّ حالات المادة الأربع، وصف كل واحدة منها، وأعطِ أمثلة عليها.',a:[['الصلبة','دقائقها متقاربة جدًّا وتهتز في مكانها، شكلها وحجمها ثابتان. مثل: الزجاج، الخشب، الثلج.'],['السائلة','دقائقها متقاربة نوعًا ما وتنزلق فوق بعضها، حجمها ثابت وشكلها حسب الوعاء. مثل: الماء، العصير، الزئبق.'],['الغازية','دقائقها متباعدة وتتحرك بحرية، لا شكل ثابتًا ولا حجم ثابتًا. مثل: الهواء، بخار الماء، الأكسجين.'],['البلازما','تحدث عند درجات الحرارة العالية جدًّا. مثل: مصابيح النيون، البرق، النجوم.']]},
  {k:'اشرح',q:'كيف يمكن أن يكون للماء كثافتان مختلفتان؟',a:[['الإجابة','يحدث ذلك عند تغير الضغط أو درجة الحرارة؛ حيث تختلف كثافة الماء في صورته السائلة عن كثافته في صورته الصلبة (الثلج).'],['لذلك','نلاحظ أن الجليد يطفو فوق سطح الماء لأن كثافته أقل.']]},
  {k:'التفكير الناقد',q:'أيهما يتبخر بسرعة أكبر: كحول مُبرَّد أم كحول غير مُبرَّد؟',fig:pic('s49_f64eeb17','عملية التبخر','auc-im'),a:[['الإجابة','الكحول غير المبرَّد.'],['التفسير','لأن درجة حرارته أعلى فتزداد حركة جزيئاته، ويتحول من الحالة السائلة إلى الحالة الغازية بسرعة أكبر.']]}],'self',()=>G.complete('self'));},
 reset(){STN.self.s.reset();},explain:'<p>حلول «اختبر نفسك» كما في عرض الدرس.</p>'});

/* ================= S7: practice — levels + choice board ================= */
def('s7',{n:'إثرائي · مختبر المهارات',eyebrow:'إثرائي · تطبيق ومراعاة الفروق',title:'مختبر المهارات: اختر مستواك أو مهامك',goal:'مسائل الكثافة بثلاثة مستويات، ولوحة خيارات تختار منها ثلاث مهام في خط واحد.',plan:4,core:1,
 icon:'<rect x="10" y="10" width="60" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="6"/><path d="M30 10v60M50 10v60M10 30h60M10 50h60" stroke="currentColor" stroke-width="4"/>',
 body:'<div class="card"><h3>مسائل الكثافة</h3><div id="s7lv"></div></div><div class="card"><h3>لوحة الخيارات 3 × 3</h3><div id="s7cb"></div></div>',
 init(){const L1=[{tag:'الربط مع الرياضيات',p:'احسب كثافة جسم صلب كتلته 10 كجم وحجمه 2 م³.',v:5,unit:'كجم/م³',given:'ك = 10 كجم ، ح = 2 م³',law:'ث = ك ÷ ح',sol:'ث = 10 ÷ 2 = 5 كجم/م³'},
   {tag:'تطبيق',q:'أي العلاقات التالية صحيحة لحساب الكثافة؟',o:['الكثافة = الحجم ÷ الكتلة','الكثافة = الكتلة + الحجم','الكثافة = الكتلة ÷ الحجم','الكثافة = الكتلة × الحجم'],a:2}];
  const L2=[{tag:'حل المعادلات',p:'كثافة النيكل 8.9 جم/سم³. إذا كان لديك عينة منه حجمها 4 سم³، فما كتلتها؟',v:35.6,unit:'جم',given:'ث = 8.9 جم/سم³ ، ح = 4 سم³',want:'ك = ؟',law:'ك = ث × ح',sol:'ك = 8.9 × 4 = 35.6 جم',hint:'من ث = ك ÷ ح نستنتج: ك = ث × ح.'},
   {tag:'حل المعادلات',p:'كثافة الرصاص 11.3 جم/سم³. إذا كان لديك عينة منه حجمها 4 سم³، فما كتلتها؟',v:45.2,unit:'جم',given:'ث = 11.3 جم/سم³ ، ح = 4 سم³',law:'ك = ث × ح',sol:'ك = 11.3 × 4 = 45.2 جم'}];
  const L3=[{tag:'فكّر معي',q:'كرتان لهما الحجم نفسه، لكن كتلة الأولى أكبر. أيهما كثافتها أكبر؟',o:['الأولى','الثانية','متساويتان','لا يمكن المقارنة'],a:0,why:'مع تساوي الحجم، الكتلة الأكبر تعني كثافة أكبر.'},
   {tag:'اشرح',q:'كيف يمكن أن يكون للماء كثافتان مختلفتان؟',o:['بتغير الضغط أو درجة الحرارة؛ فكثافة الجليد أقل من كثافة الماء السائل','بإضافة لون للماء','لا يمكن ذلك أبدًا','بتغيير شكل الإناء'],a:0}];
  STN.s7.lv=levels($('#s7lv'),[L1,L2,L3],'s7');
  STN.s7.cb=choiceBoard($('#s7cb'),[
   {ic:'✍️',t:'اكتب تعريفًا',kind:'كتابة',p:'اكتب في دفترك تعريف الخاصية الفيزيائية، واذكر ثلاثة أمثلة عليها من سوق الأحساء.'},
   {ic:'🧮',t:'احسب الكثافة',kind:'حساب',p:'جسم كتلته 20 جم وحجمه 10 سم³. ما كثافته؟',v:2,unit:'جم/سم³',law:'ث = ك ÷ ح',sol:'20 ÷ 10 = 2 جم/سم³'},
   {ic:'🎨',t:'ارسم الجسيمات',kind:'رسم',p:'ارسم ترتيب الجسيمات في الحالات الثلاث: الصلبة والسائلة والغازية.'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'حالة المادة في النجوم:',o:['صلبة','سائلة','البلازما','غازية فقط'],a:2},
   {ic:'🔬',t:'جرّب في البيت',kind:'تجربة',p:'ضع مكعب ثلج في كأس ماء وسجّل: هل يطفو أم يغوص؟ ولماذا؟ (بإشراف ولي أمرك)'},
   {ic:'❓',t:'تحدٍّ',kind:'اختيار',q:'أي تحول يحدث عند تكوّن قطرات الماء على كأس بارد؟',o:['التبخر','التكثف','الانصهار','التجمد'],a:1},
   {ic:'🗺',t:'خريطة مفاهيم',kind:'تنظيم',p:'اصنع خريطة مفاهيم تبدأ بـ «الخواص الفيزيائية» وتتفرع إلى: اللون، الشكل، الطول، الكتلة، الحجم، الكثافة.'},
   {ic:'❓',t:'سؤال سريع',kind:'اختيار',q:'المادة التي تنجذب للمغناطيس من بين هذه:',o:['الذهب','الحديد','الخشب','الزجاج'],a:1},
   {ic:'📸',t:'صوّر وصنّف',kind:'ملاحظة',p:'اذكر خمسة أشياء في بيتك، وصنّف كلًّا منها: صلبة أم سائلة أم غازية.'}],'s7',()=>G.complete('s7'));},
 reset(){STN.s7.lv.reset();STN.s7.cb.reset();},refresh(){STN.s7.lv.refresh();},
 explain:'<p>مستويات الكثافة: تطبيق مباشر، ثم حساب الكتلة من الكثافة (من «حل المعادلات» في العرض)، ثم تفكير ناقد. ولوحة الخيارات تتيح للطالب اختيار ثلاث مهام بأنماط مختلفة (كتابة، رسم، حساب، تجربة).</p>'});

/* ================= S8: competitions ================= */
def('s8',{n:'إثرائي · المسابقات',eyebrow:'إثرائي · تنافس المجموعات',title:'ساحة السوق: غرفة الهروب والمزاد',goal:'مسابقتان جديدتان: افتحوا أقفال «مخزن السوق» قبل انتهاء الوقت، ثم زايدوا على العبارات في مزاد المعرفة.',plan:4,
 icon:'<rect x="18" y="34" width="44" height="36" rx="5" fill="currentColor"/><path d="M28 34v-8a12 12 0 0 1 24 0v8" fill="none" stroke="currentColor" stroke-width="6"/>',
 body:'<div class="card"><div id="s8esc"></div></div><div class="card"><div class="nb-head"><h2>🔨 مزاد المعرفة</h2><span>زايدوا على ثقتكم بالإجابة</span></div><div id="s8auc"></div></div>',
 init(){STN.s8.e=escape($('#s8esc'),{title:'مخزن سوق المواد',story:'أُغلق باب مخزن السوق بأربعة أقفال! كل قفل يُفتح بإجابة صحيحة ويكشف رقمًا. اجمعوا الأرقام وافتحوا الباب.',secs:360,
   locks:[{q:'كمية المادة في الجسم:',o:['الحجم','الكتلة','الكثافة','الطاقة'],a:1,code:'3'},{q:'درجة غليان الماء عند ضغط جوي واحد:',o:['0°س','50°س','100°س','327°س'],a:2,code:'7'},{q:'في أي حالة تتحرك الجسيمات بحرية وتكون متباعدة؟',o:['الصلبة','السائلة','الغازية','لا شيء'],a:2,code:'1'},{q:'طحن القهوة تغير:',o:['فيزيائي','كيميائي','نووي','لا يُعد تغيرًا'],a:0,code:'9'}],outro:'المواد في المخزن كلها لها خواص فيزيائية تُلاحظ وتُقاس!'},'s8');
  STN.s8.a=auction($('#s8auc'),[['الهواء ليس مادة لأننا لا نراه.',false,'الهواء له كتلة ويشغل حيزًا، فهو مادة.'],['يطفو الجليد فوق الماء لأن كثافته أقل.',true],['ينصهر الرصاص عند 327°س.',true],['الذهب ينجذب للمغناطيس.',false,'الذهب لا ينجذب للمغناطيس؛ بعض الفلزات فقط مغناطيسية.'],['درجة غليان النيتروجين أعلى من درجة غليان الماء.',false,'درجة غليان النيتروجين −195.8°س.'],['قص الورق تغير فيزيائي.',true],['للمادة ثلاث حالات فقط.',false,'للمادة أربع حالات بإضافة البلازما.'],['الكثافة = الكتلة ÷ الحجم.',true]],'s8');},
 leave(){},reset(){STN.s8.e.reset();STN.s8.a.reset();},
 explain:'<p>«غرفة الهروب» مسابقة تعاونية بزمن محدد، و«مزاد المعرفة» يقيس ثقة الطالب بفهمه: الإجابة الصحيحة تربح مبلغ المزايدة والخاطئة تخسره.</p>'});

/* ================= CHALLENGE ================= */
def('ch',{n:'تحدي العلماء',plan:2,icon:'<path d="M24 10h32v18a16 16 0 0 1-32 0z" fill="currentColor"/><path d="M40 44v14M28 70h24l-3-12H31z" fill="currentColor"/>',
 eyebrow:'التقويم الختامي',title:'تحدي العلماء',goal:'أسئلة من تقييمات العرض. لكل سؤال محاولتان.',body:'<div class="card" id="chBox"></div>',
 init(){STN.ch.c=challenge($('#chBox'),[
  {k:'المادة',q:'كل ما له كتلة ويشغل حيزًا من الفراغ:',o:['الحجم','المادة','الكثافة','الطول'],a:1},
  {k:'الكتلة',q:'كمية المادة في الجسم:',o:['الحجم','الكتلة','الكثافة','الطاقة'],a:1},
  {k:'الكثافة',q:'كتلة المادة الموجودة في وحدة الحجوم:',o:['الكثافة','الكتلة','الحجم','الوزن'],a:0},
  {k:'احسب',t:'calc',p:'احسب كثافة جسم صلب كتلته 10 كجم وحجمه 2 م³.',v:5,unit:'كجم/م³',given:'ك = 10 كجم ، ح = 2 م³',law:'ث = ك ÷ ح',sol:'10 ÷ 2 = 5 كجم/م³'},
  {k:'حالات المادة',q:'يوجد البرق في الحالة:',o:['الغازية','الصلبة','البلازما','السائلة'],a:2},
  {k:'الغليان',q:'هي النقطة التي تثبت عندها درجة الحرارة عند تحول المادة من الحالة السائلة إلى الحالة الغازية:',o:['درجة التجمد','درجة الغليان','درجة الانصهار','الدرجة المثالية'],a:1},
  {k:'التغير الفيزيائي',t:'multi',q:'اختر كل التغيرات الفيزيائية:',items:[['انصهار الثلج',1],['نشر الخشب',1],['تفتت الزجاج',1],['احتراق الورق',0],['صدأ الحديد',0]],why:'الاحتراق والصدأ ينتجان مواد جديدة.'},
  {k:'الفلزات',q:'أي مما يلي ليس من خواص الفلزات؟',o:['قابلة للطرق والسحب','موصلة جيدة للكهرباء والحرارة','جميعها لها نفس درجة الغليان والانصهار','لها خواص مغناطيسية'],a:2}],'ch');},
 reset(){STN.ch.c.reset();},explain:'<p>أسئلة التحدي من تقييمات عرض الدرس.</p>'});

/* ================= PLAN (الاستراتيجيات) ================= */
const SROWS={"intro": {"s": ["poe", "brain"], "g": "٦", "sk": "التصنيف والتنبؤ", "ev": "سؤال تصنيف القطع النقدية"}, "fold": {"s": ["kwl", "coop"], "g": "١–٦", "sk": "الاستدعاء والتنبؤ", "ev": "توجيه القراءة قبل/بعد"}, "goals": {"s": ["frayer"], "g": "١–٦", "sk": "التذكر", "ev": "لعبة مطابقة المصطلحات"}, "s1": {"s": ["disc", "sticks"], "g": "١", "sk": "الملاحظة والتصنيف", "ev": "تصنيف مادة/ليس مادة"}, "lab1": {"s": ["inq", "coop"], "g": "١ و٦", "sk": "الملاحظة والقياس", "ev": "سجل الأدوات"}, "s2": {"s": ["inq", "prob"], "g": "٢ و٣", "sk": "القياس والحساب", "ev": "سجل المختبر وسؤال فكّر معي"}, "ev1": {"s": ["heads", "prob"], "g": "١–٣", "sk": "التطبيق والحساب", "ev": "تقييم ١–٨"}, "s5": {"s": ["tps", "story"], "g": "٥", "sk": "المقارنة والتمييز", "ev": "أي مما يلي تغير فيزيائي؟"}, "lab2": {"s": ["poe"], "g": "٥", "sk": "التجريب والتفسير", "ev": "ملاحظة التغير"}, "s3": {"s": ["inq", "cmap"], "g": "٤", "sk": "المقارنة", "ev": "جدول مقارنة حالات المادة"}, "s4": {"s": ["poe", "tps"], "g": "٥", "sk": "التنبؤ والتفسير", "ev": "منحنى التسخين وسؤال فسّر ما ترى"}, "ev2": {"s": ["heads", "sticks"], "g": "٤ و٥", "sk": "التذكر والتطبيق", "ev": "تقييم ٩–١٢"}, "s6": {"s": ["disc", "brain"], "g": "٦", "sk": "الاستنتاج", "ev": "تقييم ١٣"}, "lab3": {"s": ["inq"], "g": "٦", "sk": "التصنيف بالتجريب", "ev": "تصنيف المواد"}, "sum": {"s": ["tl"], "g": "١–٦", "sk": "التلخيص", "ev": "إشارة المرور"}, "self": {"s": ["tps", "sticks"], "g": "١–٦", "sk": "التطبيق والتفكير الناقد", "ev": "اختبر نفسك"}, "s7": {"s": ["prob", "coop"], "g": "٢", "sk": "حل المشكلات", "ev": "مستويات الكثافة"}, "s8": {"s": ["game"], "g": "١–٦", "sk": "التذكر والتطبيق", "ev": "غرفة الهروب والمزاد"}, "ch": {"s": ["exit"], "g": "١–٦", "sk": "التقويم الختامي", "ev": "تحدي العلماء"}};
SK.init({key:"g7c3l1",sfx:{pop:()=>SFX.pop(),tick:()=>SFX.tick(),ok:()=>SFX.correct(),no:()=>SFX.wrong()},teams:()=>(G.teams||K.TEAMN.slice(0,4).map((n,i)=>({n,c:K.TEAMC[i]}))).map(t=>({n:t.n,c:t.c})),
 stratRoster:{api:'https://script.google.com/macros/s/AKfycbxp-t4JgGO5WiK6hoacjTyBqFnG-9bSWClplOpVV4VDuTV7T4tY0swB1Ll36kr_djJ7nQ/exec',classes:['1/1','2/1','3/1','4/1']}});
def('plan',{n:'خطة الدرس والاستراتيجيات',after:'goals',eyebrow:'للمعلم والزائر',title:'خطة الدرس: الأهداف والاستراتيجيات والتقويم',goal:'المس أي صف للانتقال إلى محطته، أو شارة الاستراتيجية أعلى المحطة لعرض خطواتها وأدواتها.',plan:1,
 icon:'<rect x="10" y="12" width="60" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M10 28h60M30 28v40" stroke="currentColor" stroke-width="5"/>',body:'<div class="card" id="planBox"></div>',
 init(){const secs=$$('#stations section.st');let k=0;const rows=[];secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;k++;rows.push({i:id,num:k,name:STN[id].n.replace(/^\d+ · /,''),c});});
  $('#planBox').innerHTML=SK.planHTML('',rows);SK.wirePlan($('#planBox'),id=>K.go(id));
  secs.forEach(s=>{const id=s.id.slice(3),c=SROWS[id];if(!c)return;const h=s.querySelector('.st-head');if(h&&!h.querySelector('.stgs')){const b=SK.badges(c);b.style.cssText='display:flex;margin:6px 0 0';h.appendChild(b);}});
  if(!document.getElementById('skfab'))SK.fab('left:14px;bottom:86px');},
 enter(){G.complete('plan');},reset(){},explain:'<p>خطة الدرس: لكل محطة هدفها والاستراتيجية المطبقة ومهارة التفكير وأداة التقويم. الأدوات الصفية: أعواد المثلجات (بأسماء طلاب الفصل من الكشوف)، ومؤقت فكّر-زاوج-شارك، والرؤوس المرقمة.</p>'});
K.boot({chapter:'الفصل الثالث: المادة وتغيراتها',chapterShort:'الفصل الثالث',title:'جولة في سوق المواد',lesson:'الدرس الأول: الخواص والتغيرات الفيزيائية',accent:'#c2410c',accentDark:'#fb923c',hook:'كل ما حولك له خواص!',
 riddle:'كيف يمكن للمادة أن يتغير شكلها أو حالتها دون أن تتحول إلى مادة جديدة؟',predict:{o:['تتغير خواصها الفيزيائية مثل الشكل والحجم والحالة، وتبقى هويتها كما هي','لا يمكن أن يتغير شكل المادة إلا إذا أصبحت مادة جديدة','تتغير حالتها فقط، أما شكلها فلا يتغير'],a:0},
 answer:'في التغير الفيزيائي تتغير الخواص الفيزيائية للمادة كالشكل والحجم والحالة، مع بقاء هوية المادة الأصلية دون تغيير؛ فالبن المطحون هو البن نفسه، والجليد المنصهر هو الماء نفسه.',
 finalTitle:'مبارك! أنهيت جولتك في سوق المواد',goals:GOALS,homework:'<b>الواجب:</b> «اختبر نفسك» ص 90 · <b>المطويات:</b> خواص المادة ص 81 (التسليم: الأحد القادم).',
 concepts:[{n:'الخاصية الفيزيائية',t:'تُلاحظ أو تُقاس دون تغيير تركيب المادة: اللون، الشكل، الطول، الكتلة، الحجم، الكثافة.',ic:'<circle cx="22" cy="22" r="13" fill="none" stroke="var(--accent)" stroke-width="4"/><path d="M32 32l14 14" stroke="var(--accent)" stroke-width="6" stroke-linecap="round"/>'},
  {n:'الكثافة',t:'ث = ك ÷ ح، وتقاس بوحدة كجم/م³ أو جم/سم³.',ic:'<path d="M20 4v40h14V4" fill="none" stroke="var(--accent)" stroke-width="3"/><rect x="22" y="24" width="10" height="18" fill="var(--amber)"/>'},
  {n:'حالات المادة',t:'صلبة، سائلة، غازية، بلازما؛ وتعتمد على الحرارة والضغط.',ic:'<circle cx="14" cy="38" r="5" fill="var(--accent)"/><circle cx="26" cy="38" r="5" fill="var(--accent)"/><circle cx="40" cy="12" r="5" fill="var(--amber)"/>'},
  {n:'الانصهار والغليان',t:'درجتان ثابتتان تميزان المادة؛ الماء يغلي عند 100°س.',ic:'<path d="M4 44 L16 30 H28 L40 12 H50" fill="none" stroke="var(--accent)" stroke-width="4"/>'},
  {n:'التغير الفيزيائي',t:'تتغير الخواص الفيزيائية وتبقى هوية المادة.',ic:'<rect x="6" y="14" width="18" height="22" fill="none" stroke="var(--accent)" stroke-width="3"/><rect x="30" y="10" width="9" height="14" fill="var(--amber)"/><rect x="30" y="28" width="9" height="14" fill="var(--amber)"/>'},
  {n:'الفلزات',t:'لامعة، قابلة للطرق والسحب، موصلة للحرارة والكهرباء، وبعضها مغناطيسي.',ic:'<path d="M10 6v18a14 14 0 0 0 28 0V6h-9v18a5 5 0 0 1-10 0V6z" fill="var(--accent)"/>'}]});
})();

