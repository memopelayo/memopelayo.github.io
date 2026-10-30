/* GP mini-game: "Kerning Run". No deps. window.GPGame.mount(el) | .open() | .close() */
(function(){var d=document,R=d.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var OBS=['Widow','Orphan','Comic Sans','Lorem ipsum','Low-res JPG','Papyrus','final_v7.pptx','Clip art','Stretched logo','Rivers'];
var OVER=['Your layout collapsed. Ctrl+Z?','Rejected by the client. Again.','That was a widow. You hate widows.','Comic Sans got you. Seek help.','Back to the drawing board (artboard 1).','Lorem ipsum dolor... you died.'];
function hsGet(){try{return +localStorage.getItem('gp-hs')||0}catch(e){return 0}}function hsSet(v){try{localStorage.setItem('gp-hs',v)}catch(e){}}
function mount(box){
 var cv=d.createElement('canvas');cv.className='gg-c';cv.setAttribute('role','img');cv.setAttribute('aria-label','Mini-game: jump the red square over design mistakes. Press space, arrow up, click or tap.');cv.tabIndex=0;box.appendChild(cv);
 var x=cv.getContext('2d'),W,H,G,dpr,st='ready',p,obs,t,sp,sc,hs=hsGet(),next,msg='',raf=0,last=0;
 function col(n){return getComputedStyle(R).getPropertyValue(n).trim()||'#111'}
 function size(){var w=box.clientWidth||320;dpr=Math.min(2,devicePixelRatio||1);W=w;H=w<560?170:210;G=H-34;cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px';x.setTransform(dpr,0,0,dpr,0,0);draw()}
 function reset(){p={x:Math.max(28,W*.08),y:G-22,v:0,s:22,r:0};obs=[];t=0;sc=0;sp=RM?4:(W<560?5:6.2);next=60}
 function jump(){if(st!=='run'){reset();st='run';msg='';last=0;loop(performance.now());return}if(p.y>=G-p.s-.5)p.v=W<560?-10.4:-11.2}
 function add(){var lab=OBS[Math.random()*OBS.length|0],k=Math.random()*3|0,h=k==0?26:k==1?38:30,w=k==2?46:22+Math.random()*16;obs.push({x:W+10,w:w,h:h,k:k,l:lab})}
 function step(){t++;sp+=RM?0:.0016;p.v+=.62;p.y+=p.v;if(p.y>G-p.s){p.y=G-p.s;p.v=0}p.r=p.y<G-p.s?p.r+(RM?0:.12):0;
  if(--next<=0){add();next=(48+Math.random()*60)*(6/sp)}
  for(var i=obs.length;i--;){var o=obs[i];o.x-=sp;if(o.x+o.w<-80)obs.splice(i,1);else if(p.x+p.s-4>o.x&&p.x+4<o.x+o.w&&p.y+p.s-3>G-o.h){st='over';msg=OVER[Math.random()*OVER.length|0];if(sc>hs){hs=sc;hsSet(hs)}}}
  if(t%6==0)sc++}
 function draw(){if(!x)return;var ink=col('--ink'),red=col('--red'),bg=col('--bg');x.clearRect(0,0,W,H);x.fillStyle=ink;x.fillRect(0,G,W,1.5);
  x.font='11px "JetBrains Mono",monospace';x.textBaseline='top';x.textAlign='right';x.fillText('HI '+String(hs).padStart(5,'0')+'   '+String(sc||0).padStart(5,'0'),W-10,10);x.textAlign='left';
  (obs||[]).forEach(function(o){var y=G-o.h;x.fillStyle=ink;if(o.k==0){x.fillRect(o.x,y,o.w,o.h)}else if(o.k==1){x.fillRect(o.x+o.w/2-3,y,6,o.h);x.fillRect(o.x,y,o.w,6)}else{x.beginPath();x.moveTo(o.x,G);x.lineTo(o.x+o.w/2,y);x.lineTo(o.x+o.w,G);x.closePath();x.fill()}
   x.font='10px "JetBrains Mono",monospace';x.textAlign='center';x.fillText(o.l,o.x+o.w/2,y-15);x.textAlign='left'});
  if(p){x.save();x.translate(p.x+p.s/2,p.y+p.s/2);x.rotate(p.r);x.fillStyle=red;x.fillRect(-p.s/2,-p.s/2,p.s,p.s);x.restore()}
  if(st!=='run'){x.fillStyle=ink;x.textAlign='center';x.font=(W<560?20:28)+'px Anton,Impact,sans-serif';x.textBaseline='middle';
   x.fillText(st=='over'?'GAME OVER':'KERNING RUN',W/2,H*.32);x.font='12px "JetBrains Mono",monospace';x.fillText(st=='over'?msg:'Jump the design crimes.',W/2,H*.32+28);
   x.globalAlpha=.7;x.fillText(st=='over'?'Tap / space to try again':'Tap, click, space or ↑ to start',W/2,H*.32+48);x.globalAlpha=1;x.textAlign='left';x.textBaseline='top'}}
 function loop(n){if(st!=='run'){draw();return}var k=last?Math.min(3,Math.round((n-last)/16.7)||1):1;last=n;while(k--&&st=='run')step();draw();raf=requestAnimationFrame(loop)}
 cv.addEventListener('click',function(e){e.stopPropagation()});cv.addEventListener('pointerdown',function(e){e.preventDefault();cv.focus({preventScroll:true});jump()});
 function key(e){if(!box.isConnected||box.offsetParent===null)return;if(e.target.closest&&e.target.closest('input,textarea'))return;var active=st=='run'||d.activeElement===cv||box.closest('.gg-ov');if((e.code=='Space'||e.key=='ArrowUp')&&active){e.preventDefault();jump()}}
 d.addEventListener('keydown',key);addEventListener('resize',size);new MutationObserver(draw).observe(R,{attributes:true,attributeFilter:['data-theme']});
 reset();p.y=G-p.s;size();
 return{stop:function(){cancelAnimationFrame(raf);st='ready';d.removeEventListener('keydown',key);removeEventListener('resize',size)},focus:function(){cv.focus({preventScroll:true})}}}
var ov=null,inst=null,back=null,ot=0;
function open(){if(ov)return;ot=Date.now();back=d.activeElement;ov=d.createElement('div');ov.className='gg-ov';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Kerning Run mini-game');
 ov.innerHTML='<div class="gg-box"><div class="gg-top"><span class="mono">Easter egg · Kerning Run</span><button type="button" class="gg-x" aria-label="Close game">Close ✕</button></div><div class="gg-st"></div><p class="mono gg-help">Space / ↑ / tap to jump. Esc to close.</p></div>';
 d.body.appendChild(ov);inst=mount(ov.querySelector('.gg-st'));ov.querySelector('.gg-x').onclick=close;ov.addEventListener('click',function(e){e.stopPropagation();if(e.target===ov&&Date.now()-ot>700)close()});
 requestAnimationFrame(function(){ov.classList.add('on');inst.focus()});if(window.gtag)gtag('event','easter_egg',{name:'game'});window.gpEgg&&gpEgg('play')}
function close(){if(!ov)return;inst.stop();var o=ov;ov=null;o.classList.remove('on');setTimeout(function(){o.remove()},RM?0:250);if(back&&back.focus)back.focus({preventScroll:true})}
window.GPGame={mount:mount,open:open,close:close};
/* triggers: type "play" anywhere, or long-press the GP logo ~2s */
var buf='';d.addEventListener('keydown',function(e){if(e.key=='Escape'&&ov){close();return}if(e.ctrlKey||e.metaKey||e.altKey||(e.target.closest&&e.target.closest('input,textarea,[contenteditable]')))return;if(e.key.length==1){buf=(buf+e.key.toLowerCase()).slice(-4);if(buf=='play'){buf='';open()}}});
function lp(){var l=d.querySelector('.logo');if(!l)return;var tm,fired=false;l.addEventListener('touchstart',function(){fired=false;tm=setTimeout(function(){fired=true;if(navigator.vibrate)navigator.vibrate(15);open()},1800)},{passive:true});
 ['touchend','touchmove','touchcancel'].forEach(function(n){l.addEventListener(n,function(){clearTimeout(tm)},{passive:true})});l.addEventListener('click',function(e){if(fired){e.preventDefault();e.stopImmediatePropagation();fired=false}},true);l.addEventListener('contextmenu',function(e){if(fired||tm)e.preventDefault()});
 var f=d.querySelector('.sp-foot,.foot');if(f&&!f.querySelector('.gg-hint')){var s=d.createElement('span');s.className='gg-hint';s.innerHTML=matchMedia('(hover:none) and (pointer:coarse)').matches?' · Bored? Hold the GP logo.':' · Bored? Type <kbd>play</kbd>.';f.appendChild(s)}}
if(d.readyState=='loading')d.addEventListener('DOMContentLoaded',lp);else lp()})();
