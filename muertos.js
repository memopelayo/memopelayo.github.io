/* Día de Muertos layer: active Nov 1–2 2026 (America/Mexico_City). ?muertos=1 forces on, ?muertos=0 off. */
(function(){var d=document,R=d.documentElement,q=new URLSearchParams(location.search).get('muertos'),on;
try{var ymd=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());on=ymd>='2026-11-01'&&ymd<='2026-11-02'}catch(e){on=false}
try{if(q==='1')sessionStorage.setItem('gp-dm-force','1');if(q==='0')sessionStorage.removeItem('gp-dm-force');if(sessionStorage.getItem('gp-dm-force')==='1')on=true}catch(e){}if(q==='1')on=true;if(q==='0')on=false;if(!on)return;
R.classList.remove('hw');R.classList.add('dm');var l=d.createElement('link');l.rel='stylesheet';l.href='/muertos.css';d.head.appendChild(l);
var C=['#E4007C','#FF6B00','#FFC800','#00A651','#00B5D8','#7B2D8E','#E31B23'];
function flag(c,i){var cut=[ '<path d="M6 12h4v4H6zM14 12h4v4h-4zM24 10l3 3-3 3-3-3zM34 12h4v4h-4z"/>','<path d="M8 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0M24 9l4 7h-8zM32 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/>','<path d="M10 10h6v6h-6zM28 10h6v6h-6zM22 14a2 2 0 1 0 0.1 0"/>'][i%3];
 return '<svg viewBox="0 0 44 30" style="--d:'+(-i*.37)+'s" aria-hidden="true"><mask id="pp'+i+'"><path d="M0 0h44v24l-4 6-4-6-4 6-4-6-4 6-4-6-4 6-4-6-4 6-4-6z" fill="#fff"/><g fill="#000">'+cut+'</g></mask><rect width="44" height="30" fill="'+c+'" mask="url(#pp'+i+')" opacity=".9"/></svg>'}
var JOKES=['RIP Flash (1996\u20132020)','In loving memory of Clip Art','Here lies WordArt (1992\u2013forever)','Gone but not forgotten: the 3D pie chart'];
function go(){var b=d.body,pp=d.createElement('div');pp.className='dm-pp';pp.setAttribute('aria-hidden','true');var n=Math.max(8,Math.round(innerWidth/70)),h='';for(var i=0;i<n;i++)h+=flag(C[i%C.length],i);pp.innerHTML=h;var hd=d.querySelector('header.top'),tk=d.querySelector('.tk'),an=(tk&&hd&&tk.previousElementSibling===hd)?tk:hd;var av=d.querySelector('aside[aria-label=Availability]');if(an===tk&&av)an=av;if(an)an.insertAdjacentElement('afterend',pp);else b.appendChild(pp);
 d.querySelectorAll('.tk-run').forEach(function(r){JOKES.forEach(function(j,i){var s=d.createElement('span');s.textContent=j;var m=d.createElement('em');m.textContent=['\u25a0','\u25cf','\u25b2','\u2715'][i];r.insertBefore(m,r.firstChild);r.insertBefore(s,r.firstChild)})});
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var drop=function(){if(d.hidden)return;var k=3+Math.random()*3|0;for(var i=0;i<k;i++){var p=d.createElement('i');p.className='dm-pet';p.setAttribute('aria-hidden','true');p.style.cssText='--x:'+(Math.random()*100)+'vw;--t:'+(7+Math.random()*5)+'s;--dx:'+(Math.random()*120-60)+'px;--r:'+(Math.random()*540)+'deg;--c:'+(Math.random()<.75?'#f59e0b':'#e4007c')+';animation-delay:'+(Math.random()*2)+'s';b.appendChild(p);setTimeout(p.remove.bind(p),15000)}};setTimeout(drop,1200);setInterval(drop,9000)}
 var k='gp-dm-x';try{if(sessionStorage.getItem(k))return}catch(e){}
 var bn=d.createElement('div');bn.className='dm-ban';bn.setAttribute('role','note');bn.innerHTML='<span>\ud83c\udf3c Feliz D\u00eda de Muertos \u2014 honoring the designers who came before us.<em>\u201cLa Catrina came for the deadline, but the deck was already final_FINAL.\u201d</em></span><button type="button" aria-label="Dismiss D\u00eda de Muertos banner">\u2715</button>';
 bn.querySelector('button').onclick=function(){bn.remove();try{sessionStorage.setItem(k,'1')}catch(e){}};b.appendChild(bn)}
if(d.readyState=='loading')d.addEventListener('DOMContentLoaded',go);else go()})();
/* Día de Muertos home intros (?intro=petals|papel|catrina|velas) + walking xolo */
(function(){var d=document,R=d.documentElement;if(!R.classList.contains('dm'))return;
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches,W=innerWidth,H=innerHeight;
function A(el,k,o){return el.animate(k,Object.assign({fill:'forwards',easing:'ease-in-out'},o))}
function rnd(a,b){return a+Math.random()*(b-a)}
var MARI='<symbol id="dmMari" viewBox="-50 -50 100 100">'+(function(){var s='',rings=[[44,14,'#b8400b',16],[36,13,'#ea6a0c',14],[27,12,'#f7931e',12],[18,10,'#fbb72a',10],[10,8,'#ffd34d',8]];rings.forEach(function(r,j){for(var i=0;i<r[3];i++){var a=360/r[3]*i+j*11;s+='<ellipse cx="0" cy="'+(-r[0]+r[1])+'" rx="'+(r[1]*.62)+'" ry="'+r[1]+'" fill="'+r[2]+'" stroke="#7a2a06" stroke-width="1.4" transform="rotate('+a+')"/>'}});return s+'<circle r="5" fill="#8a3a07"/>'})()+'</symbol>';
/* ---------- intros (home only) ---------- */
(function(){if(!/^\/(index\.html)?$/.test(location.pathname))return;
var kind=new URLSearchParams(location.search).get('intro')||'papel';if(['petals','papel','catrina','velas'].indexOf(kind)<0)kind='papel';
var o=d.createElement('div');o.className='dm-in dm-in-'+kind;o.setAttribute('aria-hidden','true');
o.style.cssText='position:fixed;inset:0;z-index:2000;overflow:hidden;pointer-events:auto;background:#1b0a18';
R.appendChild(o);var gone=false;function kill(){if(!gone){gone=true;o.remove()}}setTimeout(kill,6000);
function finish(at,dur){setTimeout(function(){o.style.pointerEvents='none';A(o,[{opacity:1},{opacity:0}],{duration:dur||350}).onfinish=kill},at)}
if(RM){A(o,[{opacity:1},{opacity:0}],{duration:350}).onfinish=kill;return}
var ns='http://www.w3.org/2000/svg';
if(kind=='petals'){
 o.innerHTML='<svg width="0" height="0" style="position:absolute"><defs>'+MARI+'</defs></svg>';
 [0,1].forEach(function(side){var h=d.createElement('div');h.style.cssText='position:absolute;top:-10vh;bottom:-10vh;width:58vw;'+(side?'right:-4vw':'left:-4vw');
  var S=Math.max(90,Math.min(W,H)/6),cols=Math.ceil(W*.58/(S*.62))+1,rows=Math.ceil(H*1.2/(S*.62))+1,html='';
  for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var x=c*S*.62+rnd(-.3,.3)*S-S*.2+(r%2)*S*.31,y=r*S*.62+rnd(-.3,.3)*S-S*.2,s=S*rnd(.7,1.5);
   html+='<svg class="f" width="'+s+'" height="'+s+'" style="position:absolute;overflow:visible;z-index:'+Math.floor(rnd(0,9))+';left:'+x+'px;top:'+y+'px;transform:rotate('+rnd(0,360)+'deg)"><use href="#dmMari"/></svg>'}
  h.innerHTML=html;o.appendChild(h);
  h.querySelectorAll('.f').forEach(function(f,i){var t=parseFloat(f.style.top);A(f,[{transform:f.style.transform+' translateY(-'+(t+H*.4+200)+'px)'},{transform:f.style.transform}],{duration:rnd(450,800),delay:rnd(0,380),easing:'cubic-bezier(.3,.7,.4,1)',fill:'backwards'})});
  setTimeout(function(){A(h,[{transform:'translateX(0) rotate(0)'},{transform:'translateX('+(side?62:-62)+'vw) rotate('+(side?6:-6)+'deg)'}],{duration:1300,easing:'cubic-bezier(.6,0,.3,1)'})},1250)});
 A(o,[{background:'#1b0a18'},{background:'#1b0a18',offset:.4},{background:'rgba(27,10,24,0)'}],{duration:2400});
 setTimeout(function(){for(var i=0;i<26;i++){var p=d.createElement('i');var s=rnd(12,22);p.style.cssText='position:absolute;left:'+rnd(30,70)+'vw;top:'+rnd(-5,60)+'vh;width:'+s+'px;height:'+(s*.6)+'px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:'+['#f7931e','#ea6a0c','#fbb72a'][i%3];o.appendChild(p);
  A(p,[{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate('+rnd(-30,30)+'vw,'+rnd(30,60)+'vh) rotate('+rnd(200,700)+'deg)',opacity:0}],{duration:rnd(1400,2000),easing:'ease-in'})}},1300);
 finish(2950,300);
}
if(kind=='papel'){
 o.innerHTML='<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="dmSheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity=".04"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient></defs></svg>';var cols=['#E4007C','#FF6B00','#FFC800','#00A651','#00B5D8','#7B2D8E','#E31B23'],cw=Math.ceil(W/5),rh=Math.ceil(H/3)+6,nC=Math.ceil(W/cw)+1;
 function cut(i){var c=50,s='';
  s+='<path d="M0 0h100v104l-5 8-5-8-5 8-5-8-5 8-5-8-5 8-5-8-5 8-5-8-5 8-5-8-5 8-5-8-5 8-5-8-5 8-5-8-5 8-5-8z" fill="#fff"/><g fill="#000">';
  for(var k=0;k<10;k++)s+='<circle cx="'+(5+k*10)+'" cy="7" r="2.4"/>';
  for(var k=0;k<10;k++)s+='<path d="M'+(5+k*10)+' 92l3 4-3 4-3-4z"/>';
  if(i%3==0){for(var k=0;k<8;k++)s+='<ellipse cx="50" cy="38" rx="5" ry="13" transform="rotate('+k*45+' 50 52)"/>';s+='<circle cx="50" cy="52" r="5" fill="#fff"/><circle cx="50" cy="52" r="2.5"/>'}
  else if(i%3==1){s+='<path d="M50 24c-16 0-24 11-24 24 0 8 4 13 9 16v9h30v-9c5-3 9-8 9-16 0-13-8-24-24-24z"/><g fill="#fff"><circle cx="40" cy="50" r="6"/><circle cx="60" cy="50" r="6"/><path d="M50 57l-3 6h6z"/><path d="M40 68h20v3H40z"/></g>'}
  else{s+='<path d="M50 22l14 30-14 30-14-30z"/><g fill="#fff"><path d="M50 36l7 16-7 16-7-16z"/></g><path d="M50 46l3 6-3 6-3-6z"/>'}
  s+='<path d="M14 28l6 6-6 6-6-6zM86 28l6 6-6 6-6-6zM14 68l6 6-6 6-6-6zM86 68l6 6-6 6-6-6z"/></g>';return s}
 for(var r=2;r>=0;r--){var row=d.createElement('div');row.style.cssText='position:absolute;left:-4vw;width:108vw;top:'+(r*(rh-14)-6)+'px;height:'+(rh+20)+'px;display:flex;transform-origin:50% 0';
  var line='<div style="position:absolute;left:0;right:0;top:4px;height:3px;background:#3b1030"></div>';
  for(var c=0;c<nC;c++){var i=r*7+c,col=cols[(r*3+c)%7];line+='<svg viewBox="0 0 100 112" preserveAspectRatio="none" style="flex:0 0 '+(cw+2)+'px;height:100%;margin-right:-2px;transform-origin:50% 0;animation:dmSway '+rnd(1.6,2.2)+'s ease-in-out '+(-rnd(0,2))+'s infinite alternate"><defs><mask id="dmc'+r+'_'+c+'">'+cut(i)+'</mask></defs><rect width="100" height="112" fill="'+col+'" mask="url(#dmc'+r+'_'+c+')" opacity=".93"/><rect width="100" height="112" fill="url(#dmSheen)" mask="url(#dmc'+r+'_'+c+')"/><rect width="100" height="4" fill="#00000033"/></svg>'}
  row.innerHTML=line;o.appendChild(row);
  (function(row,r){setTimeout(function(){A(row,[{transform:'translateY(0) rotate(0)'},{transform:'translateY(-'+(r*rh*.4+30)+'px) rotate('+(r%2?1.5:-1.5)+'deg)',offset:.35},{transform:'translateY(-'+(H+rh*2)+'px) rotate('+(r%2?-2:2)+'deg)'}],{duration:1300,easing:'cubic-bezier(.5,0,.4,1)'})},1050+(2-r)*170)})(row,r)}
 A(o,[{background:'#1b0a18'},{background:'#1b0a18',offset:.45},{background:'rgba(27,10,24,0)'}],{duration:2500});
 finish(2950,300);
}
if(kind=='catrina'){
 o.style.background='radial-gradient(ellipse at 50% 100%,#3a0f36 0%,#140616 65%)';
 var sk=d.createElement('div');sk.style.cssText='position:absolute;left:50%;bottom:0;height:min(86vh,150vw);aspect-ratio:300/340;transform:translate(-50%,100%)';
 var F=function(x,y,s,c1,c2){var p='';for(var k=0;k<6;k++)p+='<ellipse cx="'+x+'" cy="'+(y-s*.55)+'" rx="'+(s*.38)+'" ry="'+(s*.55)+'" fill="'+c1+'" transform="rotate('+k*60+' '+x+' '+y+')"/>';return p+'<circle cx="'+x+'" cy="'+y+'" r="'+(s*.3)+'" fill="'+c2+'"/>'};
 var R2=function(x,y,s,c){return '<circle cx="'+x+'" cy="'+y+'" r="'+s+'" fill="'+c+'"/><path d="M'+(x-s*.6)+' '+y+'a'+(s*.6)+' '+(s*.6)+' 0 1 1 '+(s*1.1)+' -'+(s*.2)+'M'+(x-s*.2)+' '+(y+s*.35)+'a'+(s*.4)+' '+(s*.4)+' 0 1 0 '+(s*.6)+' -'+(s*.5)+'" fill="none" stroke="#00000055" stroke-width="2.2" stroke-linecap="round"/>'};
 sk.innerHTML='<svg viewBox="0 0 300 340" width="100%" height="100%"><defs>'+MARI+'</defs>'+
 '<path d="M150 70C95 70 62 108 62 158c0 30 10 52 26 66l4 34c2 14 14 24 28 26l30 4 30-4c14-2 26-12 28-26l4-34c16-14 26-36 26-66 0-50-33-88-88-88z" fill="#f6efe6" stroke="#2a0d26" stroke-width="5"/>'+
 '<path d="M150 74c-30 0-52 12-64 32 30-10 98-10 128 0-12-20-34-32-64-32z" fill="#ede2d4"/>'+
 '<g transform="translate(115 170)"><g fill="#e4007c">'+(function(){var p='';for(var k=0;k<10;k++)p+='<ellipse cx="0" cy="-27" rx="5" ry="8" transform="rotate('+k*36+')"/>';return p})()+'</g><circle r="21" fill="#1a0817"/><circle cx="6" cy="-6" r="5" fill="#fff"/></g>'+
 '<g transform="translate(185 170)"><g fill="#7c3aed">'+(function(){var p='';for(var k=0;k<10;k++)p+='<ellipse cx="0" cy="-27" rx="5" ry="8" transform="rotate('+k*36+')"/>';return p})()+'</g><g class="eyeR"><circle r="21" fill="#1a0817"/><circle cx="6" cy="-6" r="5" fill="#fff"/></g><path class="lid" d="M-22 2q22 14 44 0" fill="none" stroke="#1a0817" stroke-width="6" stroke-linecap="round" opacity="0"/></g>'+
 '<path d="M150 196c-8 0-12 6-10 12l10 14 10-14c2-6-2-12-10-12z" fill="#1a0817"/>'+
 '<path d="M150 122l6 10-6 10-6-10z" fill="#f97316"/><circle cx="150" cy="132" r="3" fill="#fbbf24"/><path d="M128 112q22-12 44 0" fill="none" stroke="#e4007c" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 7"/>'+
 '<g fill="#e4007c">'+[78,92,206,220].map(function(x,i){return '<circle cx="'+x+'" cy="'+(208+(i%2)*6)+'" r="4"/>'}).join('')+'</g>'+
 '<path d="M104 244q46 26 92 0" fill="none" stroke="#2a0d26" stroke-width="4" stroke-linecap="round"/>'+
 '<g stroke="#2a0d26" stroke-width="3" stroke-linecap="round">'+[114,126,138,150,162,174,186].map(function(x){return '<path d="M'+x+' '+(244+Math.round(8*Math.sin((x-104)/92*Math.PI)))+'v-12M'+x+' '+(244+Math.round(8*Math.sin((x-104)/92*Math.PI)))+'v10"/>'}).join('')+'</g>'+
 
 '<g class="hat"><ellipse cx="150" cy="86" rx="146" ry="26" fill="#2a0d26"/><ellipse cx="150" cy="82" rx="140" ry="21" fill="#4a1745"/>'+
 '<path d="M88 82c0-40 26-66 62-66s62 26 62 66z" fill="#2a0d26"/><path d="M94 78c2-34 24-56 56-56s54 22 56 56" fill="#4a1745"/>'+
 '<path d="M92 70h116v12H92z" fill="#e4007c"/>'+
 '<path d="M206 70c30-30 60-36 84-30-22 2-44 14-62 34" fill="#f97316" stroke="#2a0d26" stroke-width="3"/><path d="M210 66c26-20 48-22 66-20" fill="none" stroke="#2a0d26" stroke-width="2"/>'+
 '<use href="#dmMari" x="96" y="46" width="44" height="44"/><use href="#dmMari" x="160" y="44" width="40" height="40"/>'+R2(136,62,13,'#e4007c')+R2(194,66,11,'#db2777')+F(118,72,10,'#7c3aed','#fbbf24')+F(214,76,9,'#0ea5e9','#fde68a')+R2(80,78,10,'#e4007c')+F(60,84,8,'#f59e0b','#7c2d12')+
 '<g fill="#10b981"><ellipse cx="104" cy="88" rx="10" ry="4" transform="rotate(-20 104 88)"/><ellipse cx="178" cy="86" rx="10" ry="4" transform="rotate(25 178 86)"/><ellipse cx="228" cy="88" rx="9" ry="4" transform="rotate(-15 228 88)"/></g></g></svg>';
 o.appendChild(sk);
 A(sk,[{transform:'translate(-50%,100%) rotate(-6deg)'},{transform:'translate(-50%,6%) rotate(3deg)',offset:.75},{transform:'translate(-50%,8%) rotate(0)'}],{duration:950,easing:'cubic-bezier(.3,1.3,.5,1)'});
 setTimeout(function(){var e=sk.querySelector('.eyeR'),lid=sk.querySelector('.lid');e.style.transformBox='fill-box';e.style.transformOrigin='center';
  A(e,[{transform:'scaleY(1)'},{transform:'scaleY(.08)',offset:.3},{transform:'scaleY(.08)',offset:.7},{transform:'scaleY(1)'}],{duration:520});A(lid,[{opacity:0},{opacity:1,offset:.3},{opacity:1,offset:.7},{opacity:0}],{duration:520});
  A(sk,[{transform:'translate(-50%,8%) rotate(0)'},{transform:'translate(-50%,8%) rotate(-4deg)'},{transform:'translate(-50%,8%) rotate(0)'}],{duration:520})},1250);
 setTimeout(function(){A(sk,[{transform:'translate(-50%,8%) rotate(0)'},{transform:'translate(-50%,-4%) rotate(2deg)',offset:.25},{transform:'translate(-50%,110%) rotate(-8deg)'}],{duration:850,easing:'ease-in'});
  A(o,[{opacity:1},{opacity:1,offset:.3},{opacity:0}],{duration:1100})},2050);
 setTimeout(kill,3250);
}
if(kind=='velas'){
 o.style.background='#050204';var gl=d.createElement('div');gl.style.cssText='position:absolute;left:50%;top:70%;width:60vmax;height:60vmax;margin:-30vmax 0 0 -30vmax;border-radius:50%;background:radial-gradient(circle,#ffd27a 0%,#ff9a3c55 35%,#ff7a1a00 70%);opacity:0';o.appendChild(gl);
 var N=W<600?3:5,hs=[150,190,230,190,150];if(N==3)hs=[170,220,170];
 for(var i=0;i<N;i++){var x=(i+.5)/N*(W<600?84:60)+(W<600?8:20),h=hs[i]*(W<600?.8:1),c=d.createElement('div');
  c.style.cssText='position:absolute;left:'+x+'vw;bottom:14vh;width:56px;margin-left:-28px;height:'+(h+80)+'px';
  c.innerHTML='<div class="halo" style="position:absolute;left:50%;top:0;width:260px;height:260px;margin:-90px 0 0 -130px;border-radius:50%;background:radial-gradient(circle,#ffcf6a99 0%,#ff8a2a33 40%,transparent 70%);opacity:0"></div>'+
  '<svg viewBox="0 0 56 '+(h+80)+'" width="56" height="'+(h+80)+'" style="position:absolute;inset:0;overflow:visible"><defs><linearGradient id="cv'+i+'" x1="0" x2="1"><stop offset="0" stop-color="#d9c3a0"/><stop offset=".45" stop-color="#fff4dc"/><stop offset="1" stop-color="#b89c74"/></linearGradient><radialGradient id="fl'+i+'" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#ffe17a"/><stop offset=".8" stop-color="#ff8a1c"/><stop offset="1" stop-color="#ff5a00" stop-opacity="0"/></radialGradient></defs>'+
  '<rect x="8" y="80" width="40" height="'+h+'" rx="4" fill="url(#cv'+i+')"/><path d="M8 84q10 6 12 20q2 8 6 0q4-12 10-6q4 12 6 2q2-10 6-14v-6H8z" fill="#fff8e8"/>'+
  '<rect x="8" y="'+(80+h*.55)+'" width="40" height="14" fill="#e4007c" opacity=".85"/><path d="M28 64v18" stroke="#2a1a10" stroke-width="2.5"/>'+
  '<g class="fl" style="transform-origin:28px 70px;transform:scale(0)"><path d="M28 26c8 14 14 24 14 34a14 14 0 0 1-28 0c0-10 6-20 14-34z" fill="url(#fl'+i+')"/><path d="M28 46c4 7 6 11 6 15a6 6 0 0 1-12 0c0-4 2-8 6-15z" fill="#fff" opacity=".9"/></g></svg>';
  o.appendChild(c);(function(c,i){setTimeout(function(){var f=c.querySelector('.fl');A(f,[{transform:'scale(0)'},{transform:'scale(1.3)',offset:.5},{transform:'scale(1)'}],{duration:320,easing:'ease-out'});
   f.animate([{transform:'scale(1) skewX(0)'},{transform:'scale(1.04,.96) skewX(3deg)'},{transform:'scale(.97,1.04) skewX(-3deg)'}],{duration:260,delay:330,iterations:Infinity,direction:'alternate'});
   A(c.querySelector('.halo'),[{opacity:0},{opacity:1}],{duration:400})},250+i*(1250/N))})(c,i)}
 setTimeout(function(){A(gl,[{opacity:0,transform:'scale(.4)'},{opacity:1,transform:'scale(1.4)',offset:.5},{opacity:0,transform:'scale(3.2)'}],{duration:1300,easing:'ease-out'});
  A(o,[{background:'#050204'},{background:'rgba(60,24,6,.75)',offset:.45},{background:'rgba(5,2,4,0)'}],{duration:1200})},1750);
 finish(2950,300);
}
})();
/* ---------- xolo walker (all pages) ---------- */
(function(){if(RM)return;
function walk(){if(d.hidden)return;var x=d.createElement('div'),dir=Math.random()<.5?1:-1;x.className='dm-xolo';x.setAttribute('aria-hidden','true');
 x.style.cssText='position:fixed;bottom:4px;left:0;width:190px;height:150px;z-index:1450;pointer-events:none';
 x.innerHTML='<svg viewBox="0 -24 190 150" width="190" height="150" style="transform:scaleX('+dir+');overflow:visible"><g class="xb"><path class="tl" d="M46 54C30 52 20 40 16 22C14 14 18 8 22 6" fill="none" stroke="#2b2d38" stroke-width="4.5" stroke-linecap="round"/><g transform="translate(52 60)"><g class="lg a"><path d="M0 0C10 12 10 24 3 34L1 56" fill="none" stroke="#22242d" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="4" cy="57" rx="6" ry="3.2" fill="#22242d"/></g></g><g transform="translate(128 60)"><g class="lg b"><path d="M0 0C-2 16-1 30 1 42L0 56" fill="none" stroke="#22242d" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="4" cy="57" rx="6" ry="3.2" fill="#22242d"/></g></g><path d="M42 52C40 40 56 34 78 36L118 34C134 32 146 40 148 54C149 66 138 74 124 74C110 74 100 68 86 68C70 68 60 72 52 68C45 64 42 58 42 52Z" fill="#353846" stroke="#5a6078" stroke-width="1.3"/><path d="M54 40C70 35 96 36 118 34C130 33 140 37 144 44" fill="none" stroke="#5d6377" stroke-width="3" stroke-linecap="round"/><g class="hd"><path d="M126 46C130 32 138 22 150 14L164 22C158 32 152 46 148 60Z" fill="#353846" stroke="#5a6078" stroke-width="1.3"/><path d="M150 10C156 2 168 2 174 10L187 21C191 24 189 30 184 30L168 32C159 32 151 27 148 20Z" fill="#353846" stroke="#5a6078" stroke-width="1.3"/><path d="M152 9L146-20L164 4Z" fill="#2b2d38"/><path d="M152 4L149-12L160 3Z" fill="#c46a8c"/><path d="M161 6L167-22L174 9Z" fill="#353846" stroke="#5a6078" stroke-width="1.3"/><path d="M164 4L167-13L171 6Z" fill="#e690b0"/><path d="M150 8C151 2 154-1 156 1C156-3 159-4 160 0C161-3 164-2 163 3" fill="none" stroke="#b9bdc9" stroke-width="2" stroke-linecap="round"/><path d="M158 13C164 9 176 12 184 20" fill="none" stroke="#5d6377" stroke-width="2.4" stroke-linecap="round"/><path d="M161 17Q166 13 171 17Q166 20 161 17Z" fill="#14151b"/><circle cx="167.5" cy="16.2" r="1.2" fill="#fff"/><circle cx="187" cy="23" r="3.2" fill="#14151b"/><path d="M172 30C174 40 180 42 183 38C185 35 182 31 180 29Z" fill="#ff7aa8"/><path d="M177 31L179 38" stroke="#e0507f" stroke-width="1.2"/><path d="M168 31Q176 33 184 30" fill="none" stroke="#14151b" stroke-width="1.6" stroke-linecap="round"/></g><path d="M132 40Q142 46 154 42" fill="none" stroke="#ff8a00" stroke-width="5" stroke-linecap="round"/><g fill="#ffb300" stroke="#e65c00" stroke-width="1"><circle cx="136" cy="43" r="3.4"/><circle cx="143" cy="45" r="3.8"/><circle cx="150" cy="43.5" r="3.4"/></g><g transform="translate(60 62)"><g class="lg c"><path d="M0 0C10 12 10 24 3 34L1 56" fill="none" stroke="#353846" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="4" cy="57" rx="6" ry="3.2" fill="#353846"/></g></g><g transform="translate(136 62)"><g class="lg d"><path d="M0 0C-2 16-1 30 1 42L0 56" fill="none" stroke="#353846" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="4" cy="57" rx="6" ry="3.2" fill="#353846"/></g></g></g></svg>';
 d.body.appendChild(x);var s=x.querySelector('svg'),ph={a:0,b:1,c:1,d:0};
 s.querySelectorAll('.lg').forEach(function(l){var c=l.getAttribute('class').split(' ')[1];l.style.transformBox='fill-box';l.style.transformOrigin='50% 0';l.animate([{transform:'rotate(22deg)'},{transform:'rotate(-22deg)'}],{duration:360,iterations:Infinity,direction:'alternate',delay:ph[c]?-360:0,easing:'ease-in-out'})});
 var t=s.querySelector('.tl');t.style.transformBox='fill-box';t.style.transformOrigin='100% 100%';t.animate([{transform:'rotate(-10deg)'},{transform:'rotate(12deg)'}],{duration:300,iterations:Infinity,direction:'alternate',easing:'ease-in-out'});
 var h=s.querySelector('.hd');h.style.transformBox='fill-box';h.style.transformOrigin='0% 100%';h.animate([{transform:'rotate(-2deg)'},{transform:'rotate(2deg)'}],{duration:360,iterations:Infinity,direction:'alternate',easing:'ease-in-out'});
 s.querySelector('.xb').animate([{transform:'translateY(0)'},{transform:'translateY(-2.5px)'}],{duration:180,iterations:Infinity,direction:'alternate',easing:'ease-in-out'});
 var from=dir>0?-210:innerWidth+20,to=dir>0?innerWidth+20:-210;
 x.animate([{transform:'translateX('+from+'px)'},{transform:'translateX('+to+'px)'}],{duration:Math.max(7000,innerWidth*7),easing:'linear',fill:'forwards'}).onfinish=function(){x.remove()}}
window.gpXolo=walk;
function loop(){setTimeout(function(){walk();loop()},20000+Math.random()*20000)}
setTimeout(function(){walk();loop()},rnd(8000,15000))})();
})();
