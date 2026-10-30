/* Halloween layer: active through Oct 31 2026 (America/Mexico_City). ?halloween=1 forces on, ?halloween=0 forces off. */
(function(){var d=document,R=d.documentElement,q=new URLSearchParams(location.search).get('halloween'),on;
try{var ymd=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());on=ymd>='2026-10-24'&&ymd<='2026-10-31'}catch(e){on=false}
if(q==='1')on=true;if(q==='0')on=false;if(!on)return;
R.classList.add('hw');var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function boltSVG(x){var p='M50 0L36 92h18L22 210l38-118H40L58 0z',b1='M40 92L8 150l20-6L14 196',b2='M46 140l30 40-14-2 14 34';
 return '<svg viewBox="0 0 90 220" preserveAspectRatio="none" style="position:absolute;top:0;left:'+x+'px;height:88vh;width:26vh;overflow:visible;filter:drop-shadow(0 0 10px #fff) drop-shadow(0 0 28px #cfc4ff) drop-shadow(0 0 60px #a594ff)"><path d="'+b1+'" fill="none" stroke="#fff" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/><path d="'+b2+'" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><path d="'+p+'" fill="#fff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/></svg>'}
function strike(host,peak,z){var o=d.createElement('div');o.setAttribute('aria-hidden','true');o.className='hw-zap';o.style.cssText='position:'+(host===R?'fixed':'absolute')+';inset:0;z-index:'+z+';pointer-events:none';
 var fl=d.createElement('i');fl.style.cssText='position:absolute;inset:0;background:#f6f3ff;opacity:0';o.appendChild(fl);o.insertAdjacentHTML('beforeend',boltSVG(innerWidth*(.2+Math.random()*.55)));host.appendChild(o);var bo=o.lastChild;
 fl.animate([{opacity:0},{opacity:peak,offset:.06},{opacity:.08,offset:.22},{opacity:peak*.85,offset:.34},{opacity:0,offset:.75},{opacity:0}],{duration:800,fill:'forwards'});
 bo.animate([{opacity:0},{opacity:1,offset:.05},{opacity:.25,offset:.22},{opacity:1,offset:.33},{opacity:1,offset:.55},{opacity:0}],{duration:800,fill:'forwards'}).onfinish=function(){o.remove()};return o}
(function clouds(){if(!/^\/(index\.html)?$/.test(location.pathname))return;var W=innerWidth,H=innerHeight,ns='http://www.w3.org/2000/svg';
 var f=d.createElement('div');f.className='hw-fog';f.setAttribute('aria-hidden','true');f.style.cssText='position:fixed;inset:0;z-index:2000;overflow:hidden;pointer-events:auto;background:#140e1c';
 R.appendChild(f);
 if(RM){var a0=f.animate([{opacity:1},{opacity:0}],{duration:350,delay:150,fill:'forwards'});a0.onfinish=function(){f.remove()};setTimeout(function(){if(f.isConnected)f.remove()},1500);return}
 var seed=11;function rnd(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
 var gid=0,TONES=[['#e4dcee','#8a7f9e','#3a3047','#120c18'],['#bdb3cc','#675d78','#2a2234','#0e0914'],['#8e84a0','#4a4158','#221a2c','#0b0710']];
 function cloud(w,tone){var h=w*.62,id='hc'+(gid++),T=TONES[tone];
  var c='<svg xmlns="'+ns+'" viewBox="0 0 200 124" width="'+w+'" height="'+h+'" style="position:absolute;overflow:visible"><defs><linearGradient id="'+id+'" gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="130"><stop offset="0" stop-color="'+T[0]+'"/><stop offset=".35" stop-color="'+T[1]+'"/><stop offset="1" stop-color="'+T[2]+'"/></linearGradient></defs>';
  var B=[[34,90,30],[70,74,40],[116,64,46],[160,82,36],[186,98,22],[100,100,38],[54,104,28],[146,104,30],[92,40,30],[132,36,26],[62,52,22],[166,58,20]],C='';
  B.forEach(function(b){C+='<circle cx="'+(b[0]+rnd()*6-3).toFixed(1)+'" cy="'+(b[1]+rnd()*6-3).toFixed(1)+'" r="'+(b[2]*(0.92+rnd()*0.2)).toFixed(1)+'"/>'});
  c+='<g fill="'+T[3]+'" stroke="'+T[3]+'" stroke-width="7">'+C+'</g><g fill="url(#'+id+')">'+C+'</g><g fill="none" stroke="'+T[0]+'" stroke-width="3" stroke-linecap="round" opacity=".7">';
  [B[1],B[2],B[3],B[8],B[9]].forEach(function(b){var r=b[2]*.82;c+='<path d="M'+(b[0]-r*.7)+' '+(b[1]-r*.55)+'A'+r+' '+r+' 0 0 1 '+(b[0]+r*.35)+' '+(b[1]-r*.9)+'"/>'});
  return c+'</g></svg>'}
 function layer(z){var l=d.createElement('div');l.style.cssText='position:absolute;inset:0;z-index:'+z+';will-change:transform';f.appendChild(l);return l}
 function put(l,x,y,w,tone){l.insertAdjacentHTML('beforeend',cloud(w,tone));var e=l.lastChild;e.style.left=(x-w/2)+'px';e.style.top=(y-w*.31)+'px';return e}
 var M=Math.max(W,H),back=layer(1),midL=layer(2),midR=layer(3),front=layer(4);
 for(var y=-.05;y<1.15;y+=.2)for(var x=-.05;x<1.15;x+=.22)put(back,(x+rnd()*.06)*W,(y+rnd()*.06)*H,M*.38,2);
 for(var y2=-.08;y2<1.15;y2+=.22){put(midL,(.08+rnd()*.14)*W,(y2+rnd()*.05)*H,M*.46,1);put(midL,(.34+rnd()*.1)*W,(y2+.11)*H,M*.4,1);put(midR,(.92-rnd()*.14)*W,(y2+rnd()*.05)*H,M*.46,1);put(midR,(.64-rnd()*.1)*W,(y2+.1)*H,M*.4,1)}
 [[.15,.18],[.85,.16],[.12,.86],[.86,.88],[.5,.08],[.5,.96],[.02,.5],[.98,.52],[.48,.5]].forEach(function(p){put(front,p[0]*W,p[1]*H,M*.6,0)});
 [back,midL,midR,front].forEach(function(l,i){l.animate([{transform:'translate(0,0)'},{transform:'translate('+(i%2?-14:14)+'px,'+(i*2-3)+'px) scale(1.03)'}],{duration:1000,fill:'forwards'})});
 function out(layerEl,dur,delay,dist,sc){layerEl.querySelectorAll('svg').forEach(function(c){var r=c.getBoundingClientRect(),dx=r.left+r.width/2-W/2,dy=r.top+r.height/2-H/2,k=Math.hypot(dx,dy)||1;if(k<40){dx=(rnd()-.5);dy=-1;k=Math.hypot(dx,dy)}
  c.animate([{transform:'translate(0,0) scale(1)'},{transform:'translate('+(dx/k*M*dist)+'px,'+(dy/k*M*dist)+'px) scale('+sc+')'}],{duration:dur,delay:delay,easing:'cubic-bezier(.5,0,.8,.35)',fill:'forwards'})})}
 setTimeout(function(){f.style.pointerEvents='none';
  out(front,800,0,1.4,3.6);
  midL.animate([{transform:'translate(14px,-3px) scale(1.03)'},{transform:'translate('+(-W*.8)+'px,0) scale(1.6)'}],{duration:900,delay:200,easing:'cubic-bezier(.5,0,.8,.35)',fill:'forwards'});
  midR.animate([{transform:'translate(-14px,-1px) scale(1.03)'},{transform:'translate('+(W*.8)+'px,0) scale(1.6)'}],{duration:900,delay:200,easing:'cubic-bezier(.5,0,.8,.35)',fill:'forwards'});
  out(back,1000,450,1.1,2.4);
  f.animate([{backgroundColor:'#140e1c'},{backgroundColor:'rgba(20,14,28,0)'}],{duration:700,delay:650,fill:'forwards'});
  setTimeout(function(){strike(f,.88,9)},950);
  setTimeout(function(){f.animate([{opacity:1},{opacity:0}],{duration:350,fill:'forwards'}).onfinish=function(){f.remove()}},2150)},1000);
 setTimeout(function(){if(f.isConnected)f.remove()},6000)})();
(function bolt(){if(RM)return;function zap(){if(!d.hidden)strike(R,.65,1500);setTimeout(zap,12000+Math.random()*13000)}setTimeout(zap,6000+Math.random()*7000)})();var l=d.createElement('link');l.rel='stylesheet';l.href='/halloween.css';d.head.appendChild(l);
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
