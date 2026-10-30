/* Halloween layer: active through Oct 31 2026 (America/Mexico_City). ?halloween=1 forces on, ?halloween=0 forces off. */
(function(){var d=document,R=d.documentElement,q=new URLSearchParams(location.search).get('halloween'),on;
try{var ymd=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());on=ymd>='2026-10-24'&&ymd<='2026-10-31'}catch(e){on=false}
if(q==='1')on=true;if(q==='0')on=false;if(!on)return;
R.classList.add('hw');var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
(function fog(){
 var f=d.createElement('div');f.className='hw-fog';f.setAttribute('aria-hidden','true');
 f.style.cssText='position:fixed;inset:0;z-index:2000;pointer-events:none;overflow:hidden;background:#0d0912';
 var L=['radial-gradient(60% 45% at 30% 40%,rgba(205,195,225,.55),transparent 70%)','radial-gradient(55% 50% at 75% 60%,rgba(190,180,215,.5),transparent 70%)','radial-gradient(70% 40% at 50% 85%,rgba(170,160,200,.45),transparent 72%)'];
 L.forEach(function(g,i){var l=d.createElement('i');l.style.cssText='position:absolute;inset:-30%;background:'+g+';filter:blur(28px)';f.appendChild(l);
  if(!RM)l.animate([{transform:'translateX(0) scale(1)'},{transform:'translateX('+(i%2?'-':'')+'14%) scale(1.25)'}],{duration:3500,easing:'ease-out',fill:'forwards'})});
 R.appendChild(f);
 var go=function(){var a=f.animate([{opacity:1,backdropFilter:'blur(0)'},{opacity:.85,offset:.25},{opacity:0}],{duration:RM?300:2500,delay:RM?0:1000,easing:'ease-in',fill:'forwards'});f.style.background='transparent';
  f.animate([{backgroundColor:'#0d0912'},{backgroundColor:'rgba(13,9,18,0)'}],{duration:RM?250:1500,delay:RM?0:1000,easing:'ease-out',fill:'forwards'});
  a.onfinish=function(){f.remove()};setTimeout(function(){if(f.isConnected)f.remove()},6000)};
 if(d.readyState==='complete')go();else addEventListener('load',go);setTimeout(function(){if(f.isConnected&&!f.getAnimations().length)go()},1500)})();
(function bolt(){if(RM)return;var B='<svg viewBox="0 0 60 200" preserveAspectRatio="none" style="position:absolute;top:0;height:62vh;width:14vh;left:VAR;opacity:1;filter:drop-shadow(0 0 12px #fff)"><path d="M34 0L18 78h16L10 200 44 96H28L46 0z" fill="#fff" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>';
 function flash(){if(!d.hidden){var o=d.createElement('div');o.className='hw-zap';o.setAttribute('aria-hidden','true');o.style.cssText='position:fixed;inset:0;z-index:1500;pointer-events:none;background:rgba(235,232,255,.75);opacity:0';
  o.innerHTML=B.replace('VAR',(10+Math.random()*75)+'vw');R.appendChild(o);
  o.animate([{opacity:0},{opacity:.38,offset:.08},{opacity:0,offset:.22},{opacity:.26,offset:.34},{opacity:0,offset:.6},{opacity:0}],{duration:700,easing:'linear'}).onfinish=function(){o.remove()}}}
 function zap(){flash();setTimeout(zap,12000+Math.random()*13000)}
 setTimeout(function(){setTimeout(zap,0)},5000+Math.random()*7000)})();var l=d.createElement('link');l.rel='stylesheet';l.href='/halloween.css';d.head.appendChild(l);
var WEB='<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true"><path d="M0 0L100 100M0 0L50 100M0 0L100 50M0 0L0 100M0 0L100 0"/><path d="M0 22Q12 14 22 0M0 44Q26 30 44 0M0 68Q40 46 68 0M0 92Q55 62 92 0"/><path d="M0 22Q16 22 18 18M18 18Q22 12 22 0"/></svg>';
var BAT='<svg viewBox="0 0 26 12" aria-hidden="true"><path fill="currentColor" d="M13 4c1-2 2-2 2-2l.5 2C18 2 21 0 26 1c-3 1-4 3-4 6-2-1-3 0-4 2-1-1-3-2-5-1-2-1-4 0-5 1-1-2-2-3-4-2 0-3-1-5-4-6 5-1 8 1 10.5 3L11 2s1 0 2 2z"/></svg>';
var JOKES=['Horror story: Comic Sans in a pitch deck','Client: \u201cmake it pop\u201d','Final_FINAL_v7_REAL.pptx','Scariest thing tonight: a 40-bullet slide'];
function go(){var b=d.body;['tl','br'].forEach(function(c){var w=d.createElement('div');w.className='hw-web '+c;w.innerHTML=WEB;b.appendChild(w)});
 [[18,'26s','2s'],[32,'34s','11s'],[12,'30s','19s']].forEach(function(x,i){var e=d.createElement('div');e.className='hw-bat';e.style.cssText='--y:'+x[0]+'vh;--t:'+x[1]+';--d:'+x[2]+';--i:'+i;e.innerHTML=BAT;b.appendChild(e)});
 d.querySelectorAll('.tk-run').forEach(function(r){JOKES.forEach(function(j,i){var s=d.createElement('span');s.textContent=j;var m=d.createElement('em');m.textContent=['\u25a0','\u25cf','\u25b2','\u2715'][i];r.insertBefore(m,r.firstChild);r.insertBefore(s,r.firstChild)})});
 var k='gp-hw-x';try{if(sessionStorage.getItem(k))return}catch(e){}
 var n=d.createElement('div');n.className='hw-ban';n.setAttribute('role','note');n.innerHTML='<span>\ud83d\udc7b Happy Halloween \u2014 this portfolio is haunted until Nov 1.</span><button type="button" aria-label="Dismiss Halloween banner">\u2715</button>';
 n.querySelector('button').onclick=function(){n.remove();try{sessionStorage.setItem(k,'1')}catch(e){}};b.appendChild(n)}
if(d.readyState=='loading')d.addEventListener('DOMContentLoaded',go);else go()})();
