/* جسر النطق في تطبيق أندرويد: WebView لا يدعم speechSynthesis، فنستبدله بمحرّك النطق في الجهاز */
(function(){var A=window.AndroidTTS;if(!A||window.__ttsShim)return;window.__ttsShim=1;
  var seq=0,live={};
  function U(t){this.text=t||'';this.lang='ar-SA';this.rate=1;this.pitch=1;this.volume=1;this.voice=null;this.onstart=this.onend=this.onerror=null}
  var V=[{name:'صوت الجهاز العربي',lang:'ar-SA',localService:true,'default':true,voiceURI:'android-tts'}];
  var S={speaking:false,pending:false,paused:false,onvoiceschanged:null,_l:[],
    getVoices:function(){try{return A.ready()?V:[]}catch(e){return[]}},
    speak:function(u){var id='u'+Date.now()+'_'+(++seq),st0=false;live[id]=u;S.speaking=true;
      try{A.speak(String(u.text),id,+u.rate||1,+u.pitch||1)}catch(e){delete live[id];S.speaking=false;u.onerror&&u.onerror({error:'synthesis-failed'});return}
      var iv=setInterval(function(){if(!live[id]){clearInterval(iv);return}var r='none';try{r=A.status(id)}catch(e){}
        if((r==='start'||r==='done')&&!st0){st0=true;u.onstart&&u.onstart({})}
        if(r==='done'){clearInterval(iv);delete live[id];S.speaking=Object.keys(live).length>0;u.onend&&u.onend({})}
        else if(r==='error'||r==='stop'){clearInterval(iv);delete live[id];S.speaking=Object.keys(live).length>0;u.onerror&&u.onerror({error:r==='stop'?'interrupted':'synthesis-failed'})}},120)},
    cancel:function(){var ks=Object.keys(live);live={};S.speaking=false;try{A.stop()}catch(e){}ks.forEach(function(){})},
    pause:function(){},resume:function(){},
    addEventListener:function(n,f){if(n==='voiceschanged')S._l.push(f)},removeEventListener:function(){}};
  try{Object.defineProperty(window,'speechSynthesis',{value:S,configurable:true,writable:true})}catch(e){try{window.speechSynthesis=S}catch(e2){}}
  window.SpeechSynthesisUtterance=U;
  var n=0,iv=setInterval(function(){var st=0;try{st=A.state()}catch(e){}if(st!==0||++n>60){clearInterval(iv);S._l.forEach(function(f){try{f()}catch(e){}});S.onvoiceschanged&&S.onvoiceschanged()}},250);
})();
