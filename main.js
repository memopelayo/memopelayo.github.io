(function(){var d=document,r=d.documentElement,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;r.classList.add('js');
var P='<svg viewBox="0 0 59 18" preserveAspectRatio="none" aria-hidden="true"><path d="M.945.149C12.3 16.142 43.573 22.572 58.785 10.842" pathLength="1"/></svg>';
d.querySelectorAll('nav a:not(.btn),.links a,dd a,.close,.cpy').forEach(function(a){a.classList.add('l13');a.insertAdjacentHTML('beforeend',P)});
var native='onpagereveal' in window&&CSS.supports&&CSS.supports('view-transition-name: a');
if(!native&&!rm)d.addEventListener('click',function(e){var a=e.target.closest('a');if(!a||a.target||e.metaKey||e.ctrlKey)return;var h=a.getAttribute('href')||'';if(!/\.html/.test(h))return;var u=new URL(h,location.href);if(u.pathname===location.pathname)return;e.preventDefault();d.body.classList.add('leaving');if(/index\.html/.test(h))d.body.classList.add('back');setTimeout(function(){location.href=u.href},450)});
var cs=d.querySelectorAll('.card');if(cs.length&&'IntersectionObserver'in window&&!rm){var io=new IntersectionObserver(function(es){var k=0;es.forEach(function(x){if(x.isIntersecting){var c=x.target;c.style.transitionDelay=(k++*90)+'ms';c.classList.remove('rv');io.unobserve(c);setTimeout(function(){c.style.transitionDelay=''},900)}})},{threshold:.15});cs.forEach(function(c){c.classList.add('rv');io.observe(c)})}
})();
(function(){var d=document,r=d.documentElement;if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
r.classList.add('fp');var c=d.getElementById('cur'),mx=-99,my=-99,x=-99,y=-99,ch=d.querySelectorAll('#nm .ch'),dot=d.querySelector('#nm em');
addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;var t=e.target.closest('a,button,.card');if(t&&t.classList.contains('tg'))t=null;c.classList.toggle('view',!!(t&&t.classList.contains('card')));c.classList.toggle('hov',!!t)});
d.addEventListener('mouseleave',function(){mx=my=-99});
(function f(){x+=(mx-x)*.15;y+=(my-y)*.15;c.style.transform='translate('+x+'px,'+y+'px)';
if(ch.length&&mx>0&&!window.__egg){ch.forEach(function(s){var b=s.getBoundingClientRect(),dx=mx-(b.left+b.width/2),dy=my-(b.top+b.height/2),l=Math.hypot(dx,dy)||1,k=Math.max(0,1-l/900)*6;s.style.transform='translate('+(dx/l*k).toFixed(1)+'px,'+(dy/l*k).toFixed(1)+'px) skewX('+(-dx/l*k*.6).toFixed(1)+'deg)'});
var b=dot.getBoundingClientRect(),dx=mx-(b.left+b.width/2),dy=my-(b.top+b.height/2),l=Math.hypot(dx,dy)||1,m=Math.min(10,l/20);dot.style.transform='translate('+(dx/l*m).toFixed(1)+'px,'+(dy/l*m).toFixed(1)+'px)'}
requestAnimationFrame(f)})()})();
(function(){var ms=document.querySelectorAll('.modal');ms.forEach(function(m){var im=m.querySelectorAll('.gal img'),c=m.querySelector('.cnt'),n=im.length;if(!n||!c)return;var p=function(i){return(i<10?'0':'')+i},t;
function upd(){var mid=innerHeight/2,best=-1,bd=1e9;im.forEach(function(x,i){var b=x.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight)return;var d=Math.abs(b.top+b.height/2-mid);if(d<bd){bd=d;best=i}});if(best<0||im[0].getBoundingClientRect().top>innerHeight*.6){c.classList.remove('on');return}c.textContent=p(best+1)+' / '+p(n);c.classList.add('on')}
m.addEventListener('scroll',function(){cancelAnimationFrame(t);t=requestAnimationFrame(upd)},{passive:true})});
function top(){var m=location.hash&&document.querySelector(location.hash+'.modal');if(m){m.scrollTop=0;setTimeout(function(){m.scrollTop=0},60)}}addEventListener('hashchange',top);addEventListener('load',top)})();
/* easter eggs */
(function(){var d=document,r=d.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,raf=requestAnimationFrame;
function msg(t,btn,cb){var m=d.createElement('div');m.className='egg-msg';m.innerHTML='<p>'+t+'</p>'+(btn?'<button type="button">'+btn+'</button>':'');d.body.appendChild(m);raf(function(){m.classList.add('on')});var b=m.querySelector('button');if(b)b.onclick=function(e){e.stopPropagation();cb()};return m}
/* 1 collapse */
var clicks=[],busy=false;
d.addEventListener('click',function(e){if(busy||e.target.closest('a,button,input,label,.card,.case,.modal,.lb,.tg,.egg-dot,.egg-msg,#nm em'))return;var n=Date.now();clicks=clicks.filter(function(t){return n-t<3000});clicks.push(n);if(clicks.length>=7){clicks=[];collapse()}});
function collapse(){busy=true;window.__egg=1;var H=innerHeight,els=[].filter.call(d.querySelectorAll('.ch,#nm em,.sp .lbl span,.role,.enter,.top nav>*,.logo,.tk,h2,.big-t,.card,li,.svc>div,.desc,h4,.sk,.kicker,.links a,.lbl,.bar span'),function(el){var b=el.getBoundingClientRect();return b.bottom>0&&b.top<H&&b.width>0});
var P=els.map(function(el){return{el:el,y:0,x:0,vy:-Math.random()*6,vx:(Math.random()-.5)*6,a:0,va:(Math.random()-.5)*8,t:Math.random()*400}}),t0=performance.now(),done=false;
if(!RM)(function f(now){var k=now-t0;P.forEach(function(p){if(k<p.t)return;p.vy+=.6;p.y+=p.vy;p.x+=p.vx;p.a+=p.va;p.el.style.transform='translate('+p.x+'px,'+p.y+'px) rotate('+p.a+'deg)'});if(!done&&k<2600)raf(f)})(t0);
var m,restore=function(){if(done)return;done=true;m&&m.remove();P.forEach(function(p){p.el.style.transition='transform .6s cubic-bezier(.2,.8,.2,1)';p.el.style.transform=''});setTimeout(function(){P.forEach(function(p){p.el.style.transition=''});busy=false;window.__egg=0},650)};
setTimeout(function(){m=msg('Ok, you broke it.<br><b>Hire me to fix it.</b>','Fix it',restore)},RM?100:1600);setTimeout(restore,7500)}
/* 2 dvd dot */
var dot=d.querySelector('#nm em');if(dot){var dc=[],free=null;dot.style.cursor='pointer';
dot.addEventListener('click',function(e){e.stopPropagation();var n=Date.now();dc=dc.filter(function(t){return n-t<1500});dc.push(n);if(dc.length>=3&&!free){dc=[];escape()}});
function escape(){var b=dot.getBoundingClientRect(),o=d.createElement('div');o.className='egg-dot';o.style.width=b.width+'px';o.style.height=b.height*.22+'px';
var cs=getComputedStyle(r),cols=[cs.getPropertyValue('--red'),'#1f3bff','#ffe14d','#ff5a36','#00c853',cs.getPropertyValue('--ink')],ci=0,x=b.left,y=b.bottom-b.height*.32,vx=5,vy=-4,W,H,on=true,t0=Date.now();
o.style.background=cols[0];d.body.appendChild(o);dot.style.visibility='hidden';free=o;window.__egg=1;
function home(){if(!on)return;on=false;var h=dot.getBoundingClientRect();o.style.transition='transform .7s cubic-bezier(.2,.8,.2,1)';o.style.transform='translate('+h.left+'px,'+(h.bottom-h.height*.32)+'px)';setTimeout(function(){o.remove();dot.style.visibility='';free=null;window.__egg=0},720)}
o.onclick=function(e){e.stopPropagation();home()};
(function f(){if(!on)return;W=innerWidth-o.offsetWidth;H=innerHeight-o.offsetHeight;if(!RM){x+=vx;y+=vy;var hit=false;if(x<0||x>W){vx=-vx;x=Math.max(0,Math.min(W,x));hit=true}if(y<0||y>H){vy=-vy;y=Math.max(0,Math.min(H,y));hit=true}if(hit){ci=(ci+1)%cols.length;o.style.background=cols[ci]}}o.style.transform='translate('+x+'px,'+y+'px)';if(Date.now()-t0>10000)home();else raf(f)})()}}
/* 3 idle sleep */
var q=new URLSearchParams(location.search).get('idle'),IT=(q?+q:45)*1000,it,asleep=false,tk=d.querySelector('.tk');
if(tk){var tm=d.createElement('div');tm.className='tk-msg';tm.textContent="Still there? I'll wait. I'm a designer, I'm used to it.";tk.appendChild(tm)}
var nm=d.getElementById('nm');if(nm){var z=d.createElement('span');z.className='zzz';z.setAttribute('aria-hidden','true');z.innerHTML='<i>z</i><i>z</i><i>z</i>';nm.appendChild(z)}
function sleep(){if(busy||free)return;asleep=true;window.__egg=1;d.querySelectorAll('#nm .ch').forEach(function(s,i){s.style.transform='';s.style.setProperty('--r',((i%3)-1)*4+'deg')});r.classList.add('sleep')}
function wake(){clearTimeout(it);it=setTimeout(sleep,IT);if(!asleep)return;asleep=false;r.classList.remove('sleep');r.classList.add('startle');setTimeout(function(){r.classList.remove('startle');if(!busy&&!free)window.__egg=0},500)}
['mousemove','mousedown','keydown','touchstart','scroll','wheel'].forEach(function(ev){addEventListener(ev,wake,{passive:true,capture:true})});wake()})();
/* modal + lightbox controller */
(function(){var d=document,nav=0,cur=null;
d.querySelectorAll('.modal').forEach(function(m){var b=d.createElement('button');b.type='button';b.className='mx';b.setAttribute('aria-label','Close');b.textContent='✕';b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();closeM()});m.insertBefore(b,m.firstChild);
 m.addEventListener('click',function(e){if(e.target===m)closeM()})});
function cats(m){var W=d.querySelector('.cats-mode');if(!W)return;var h=m?m.getAttribute('data-back'):location.hash,p=h&&h.length>1&&d.getElementById(h.slice(1));if(p&&!p.classList.contains('catp'))p=null;var was=W.querySelector('.catp.on');W.querySelectorAll('.catp').forEach(function(x){x.classList.toggle('on',x===p)});W.classList.toggle('in',!!p);if(!m&&(p||was)&&p!==was){var t=W.getBoundingClientRect().top+scrollY-70;scrollTo(0,Math.max(0,t))}}
function sync(){var h=location.hash,m=h&&h.length>1&&d.getElementById(h.slice(1));if(m&&!m.classList.contains('modal'))m=null;if(cur&&cur!==m){cur.classList.remove('open');}if(m&&m!==cur){m.classList.add('open');m.scrollTop=0;d.body.style.overflow='hidden'}if(!m)d.body.style.overflow='';cur=m||null;if(!m)closeLb(true);cats(m)}
function closeM(){if(lbOn){closeLb();return}if(!cur)return;if(nav>0){nav--;history.back()}else{history.replaceState(null,'',location.pathname+location.search+(cur.getAttribute('data-back')||''));sync()}}
addEventListener('hashchange',function(){nav++;sync()});addEventListener('popstate',function(){if(lbOn&&!(history.state&&history.state.lb))closeLb(true)});sync();
/* lightbox */
var lb=d.createElement('div'),li=d.createElement('img'),lc=d.createElement('div'),set=[],ix=0,lbOn=false;lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Image viewer');
lb.innerHTML='<button type="button" class="lx" aria-label="Close image">✕</button><button type="button" class="lp" aria-label="Previous image">←</button><button type="button" class="ln" aria-label="Next image">→</button>';lb.appendChild(li);lc.className='lc';lb.appendChild(lc);d.body.appendChild(lb);
function show(){li.src=set[ix].currentSrc||set[ix].src;li.alt=set[ix].alt;lc.textContent=(ix+1)+' / '+set.length;lb.querySelector('.lp').style.display=lb.querySelector('.ln').style.display=set.length>1?'':'none'}
function openLb(imgs,i){set=imgs;ix=i;show();lb.classList.add('on');lbOn=true;history.pushState({lb:1},'');lb.querySelector('.lx').focus({preventScroll:true})}
function closeLb(fromPop){if(!lbOn)return;lb.classList.remove('on');lbOn=false;if(!fromPop&&history.state&&history.state.lb)history.back()}
function step(k){if(!set.length)return;ix=(ix+k+set.length)%set.length;show()}
d.addEventListener('click',function(e){var im=e.target.closest('.modal .gal img');if(!im)return;e.preventDefault();e.stopPropagation();var all=[].slice.call(im.closest('.gal').querySelectorAll('img'));openLb(all,all.indexOf(im))});
lb.addEventListener('click',function(e){e.stopPropagation();if(e.target.closest('.lx')||e.target===lb)closeLb();else if(e.target.closest('.lp'))step(-1);else if(e.target.closest('.ln'))step(1)});
var sx,sy,st,multi=false;lb.addEventListener('touchstart',function(e){multi=e.touches.length>1;var t=e.touches[0];sx=t.clientX;sy=t.clientY;st=Date.now()},{passive:true});
lb.addEventListener('touchend',function(e){if(multi||(window.visualViewport&&visualViewport.scale>1.05))return;var t=e.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Date.now()-st>800)return;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))step(dx<0?1:-1);else if(dy>80&&Math.abs(dy)>Math.abs(dx))closeLb()},{passive:true});
d.addEventListener('keydown',function(e){if(e.key==='Escape'){if(lbOn)closeLb();else if(cur)closeM()}else if(lbOn&&e.key==='ArrowRight')step(1);else if(lbOn&&e.key==='ArrowLeft')step(-1)})})();

/* copy email */
(function(){document.querySelectorAll('.cpy').forEach(function(b){var st=b.parentNode.querySelector('.cst'),t;
function ok(){b.classList.add('done');st.textContent='Copied ✓';clearTimeout(t);t=setTimeout(function(){b.classList.remove('done');st.textContent=''},1600)}
function fb(v){var x=document.createElement('textarea');x.value=v;x.setAttribute('readonly','');x.style.cssText='position:fixed;opacity:0;top:0';document.body.appendChild(x);x.select();var r=false;try{r=document.execCommand('copy')}catch(e){}x.remove();if(r)ok();else{var g=document.createRange();g.selectNodeContents(b.querySelector('.cl'));var s=getSelection();s.removeAllRanges();s.addRange(g);st.textContent='Press Ctrl/Cmd+C to copy'}}
b.addEventListener('click',function(e){e.preventDefault();var v=b.getAttribute('data-copy');if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(v).then(ok,function(){fb(v)});else fb(v)})})})();
