/* Easter eggs + counter. No deps. */
(function(){var d=document,R=d.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,MAIL='memopelayo@gmail.com';
var ALL=['collapse','escape','play','konami','undo','console','title','copy'],K='gp-eggs';
function got(){try{return JSON.parse(localStorage.getItem(K))||[]}catch(e){return[]}}
var tt;function toast(t,ms){var e=d.querySelector('.gp-toast');if(!e){e=d.createElement('div');e.className='gp-toast mono';e.setAttribute('role','status');e.setAttribute('aria-live','polite');d.body.appendChild(e)}e.textContent=t;e.classList.remove('on');void e.offsetWidth;e.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){e.classList.remove('on')},ms||2800)}
function paint(){var n=got().filter(function(x){return ALL.indexOf(x)>-1}).length;d.querySelectorAll('.gp-eggs b').forEach(function(b){b.textContent=n+'/'+ALL.length})}
function confetti(){if(RM)return;var C=['var(--red)','var(--ink)','#1f3bff','#ffe14d'],w=d.createElement('div');w.className='gp-conf';w.setAttribute('aria-hidden','true');for(var i=0;i<90;i++){var s=d.createElement('i');s.style.left=Math.random()*100+'%';s.style.background=C[i%4];s.style.animationDelay=Math.random()*.6+'s';s.style.setProperty('--dx',(Math.random()*160-80)+'px');s.style.setProperty('--r',(Math.random()*900-450)+'deg');if(i%3==0)s.style.borderRadius='50%';w.appendChild(s)}d.body.appendChild(w);setTimeout(function(){w.remove()},4200)}
var SK='gp-sound',AC=null;function sOn(){try{return localStorage.getItem(SK)==='on'}catch(e){return false}}
function tone(seq){if(!sOn())return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var t=AC.currentTime+.02;seq.forEach(function(n){var o=AC.createOscillator(),g=AC.createGain();o.type='square';o.frequency.value=n[0];g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.06,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+n[1]);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+n[1]+.02);t+=n[1]*.9})}catch(e){}}
function chime(){tone([[988,.08],[1319,.16]])}function fanfare(){tone([[523,.1],[659,.1],[784,.1],[1047,.18],[784,.1],[1047,.32]])}
var SPK='<svg viewBox="0 0 8 7" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 2h2v3h-2zM2 1h1v5h-1zM3 0h1v7h-1z" fill="currentColor"/><path class="w" d="M5 2h1v3h-1zM6 1h1v1h-1zM6 5h1v1h-1zM7 2h1v3h-1z" fill="currentColor"/><path class="x" d="M5 2h1v1h-1zM7 2h1v1h-1zM6 3h1v1h-1zM5 4h1v1h-1zM7 4h1v1h-1z" fill="currentColor"/></svg>';
function sPaint(){d.querySelectorAll('.gp-snd').forEach(function(b){var on=sOn();b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);b.title=on?'Sound on':'Sound off'})}
var bt;function badge(n){var e=d.querySelector('.gp-badge');if(!e){e=d.createElement('div');e.className='gp-badge';e.setAttribute('role','status');e.setAttribute('aria-live','polite');d.body.appendChild(e)}e.innerHTML='<svg viewBox="0 0 7 9" shape-rendering="crispEdges" aria-hidden="true"><path d="M2 0h3v1h1v2h1v4h-1v1h-1v1h-3v-1h-1v-1h-1v-4h1v-2h1z" fill="#fff6d8"/><path d="M2 4h1v1h-1zM4 5h1v1h-1zM3 2h1v1h-1z" fill="#e8401c"/></svg><span><small>Achievement</small><b>Egg found! '+n+'/'+ALL.length+'</b></span>';e.classList.remove('on');void e.offsetWidth;e.classList.add('on');clearTimeout(bt);bt=setTimeout(function(){e.classList.remove('on')},2600)}
window.gpEgg=function(id){var g=got();if(g.indexOf(id)>-1)return;g.push(id);try{localStorage.setItem(K,JSON.stringify(g))}catch(e){}paint();badge(g.filter(function(x){return ALL.indexOf(x)>-1}).length);d.querySelectorAll('.gp-eggs').forEach(function(e){e.classList.remove('pop');void e.offsetWidth;e.classList.add('pop')});if(window.gtag)gtag('event','easter_egg',{name:id});
 var full=ALL.every(function(x){return g.indexOf(x)>-1});if(!full)chime();if(full){setTimeout(function(){fanfare();confetti();toast('You clearly have too much time. Hire me.',5000)},900)}};
function inField(t){return t&&t.closest&&t.closest('input,textarea,select,[contenteditable],[contenteditable=""]')}
/* 1 Konami → Comic Sans 10s */
var KC=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'],ki=0,ct;
d.addEventListener('keydown',function(e){var k=e.key.length==1?e.key.toLowerCase():e.key;ki=(k===KC[ki])?ki+1:(k===KC[0]?1:0);if(ki===KC.length){ki=0;R.classList.add('comic');clearTimeout(ct);ct=setTimeout(function(){R.classList.remove('comic')},10000);toast('A designer somewhere just felt a disturbance.',4000);gpEgg('konami')}
/* 2 Ctrl/Cmd+Z */
 if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&k==='z'&&!inField(e.target)&&!inField(d.activeElement)){toast('Can\u2019t undo. But you can hire me.');gpEgg('undo')}});
/* 3 console */
try{console.log('%c\n  ____ ____  \n / ___|  _ \\ \n| |  _| |_) |\n| |_| |  __/ \n \\____|_|    \n','color:#e8401c;font:bold 14px monospace');
console.log('%cSnooping around? I like you. Let\u2019s talk.%c\n'+MAIL+'\n\nPsst: type hire() to claim an easter egg.','font:bold 16px Inter,sans-serif;color:#1f3bff','font:12px monospace;color:inherit')}catch(e){}
window.hire=function(){gpEgg('console');toast('Found you in the console. '+MAIL);return'\u2709 '+MAIL};
/* 4 hidden tab title */
var T0=d.title;d.addEventListener('visibilitychange',function(){if(d.hidden){T0=d.title;d.title='Come back, the kerning misses you \ud83e\udd7a'}else{d.title=T0;gpEgg('title')}});
/* 5 copy toast */
d.addEventListener('copy',function(e){if(inField(e.target))return;var s=String(getSelection()||'');if(!s.trim())return;toast('Copying is the sincerest form of flattery.');gpEgg('copy')});
/* 6 footer counter */
function addC(){d.querySelectorAll('.sp-foot,.foot').forEach(function(f){if(f.querySelector('.gp-eggs'))return;var s=d.createElement('span');s.className='gp-eggs';s.innerHTML=' \u00b7 Easter eggs found: <b>0/'+ALL.length+'</b>';f.appendChild(s);var b=d.createElement('button');b.type='button';b.className='gp-snd';b.setAttribute('aria-label','Easter egg sound');b.innerHTML=SPK;b.onclick=function(){try{localStorage.setItem(SK,sOn()?'off':'on')}catch(e){}sPaint();if(sOn())chime()};f.appendChild(b)});paint();sPaint()}
if(d.readyState=='loading')d.addEventListener('DOMContentLoaded',addC);else addC();
addEventListener('storage',function(e){if(e.key===K)paint()})})();
