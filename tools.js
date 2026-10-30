/* Playground tools. No deps. */
(function(){var d=document,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return[].slice.call((r||d).querySelectorAll(s))},MAIL='memopelayo@gmail.com';
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function copy(t,btn){var done=function(){var o=btn.textContent;btn.textContent='Copied';setTimeout(function(){btn.textContent=o},1200)};if(navigator.clipboard&&isSecureContext)navigator.clipboard.writeText(t).then(done,done);else{var a=d.createElement('textarea');a.value=t;d.body.appendChild(a);a.select();try{d.execCommand('copy')}catch(e){}a.remove();done()}}
/* ---------- colour math ---------- */
function hex2rgb(h){h=h.replace('#','');if(h.length==3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255]}
function rgb2hex(r){return'#'+r.map(function(v){return('0'+Math.round(Math.max(0,Math.min(255,v))).toString(16)).slice(-2)}).join('')}
function lum(r){return r.map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce(function(a,v,i){return a+v*[.2126,.7152,.0722][i]},0)}
function ratio(a,b){var x=lum(hex2rgb(a)),y=lum(hex2rgb(b));return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function rgb2hsl(c){var r=c[0]/255,g=c[1]/255,b=c[2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),h=0,s=0,l=(mx+mn)/2,dd=mx-mn;if(dd){s=l>.5?dd/(2-mx-mn):dd/(mx+mn);h=mx==r?(g-b)/dd+(g<b?6:0):mx==g?(b-r)/dd+2:(r-g)/dd+4;h*=60}return[h,s,l]}
function hsl2hex(h,s,l){h=((h%360)+360)%360;s=Math.max(0,Math.min(1,s));l=Math.max(0,Math.min(1,l));var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h/60%2-1)),m=l-c/2,r=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return rgb2hex(r.map(function(v){return(v+m)*255}))}
function grade(r){return r>=7?'AAA':r>=4.5?'AA':r>=3?'AA large':'Fail'}
/* ---------- 1. Deck Doctor ---------- */
var DD={text:['Too much text','Cut every slide to one message. Move the paragraphs to speaker notes or an appendix; the slide keeps a 6–10 word headline and up to 3 supporting points.'],
story:['No clear story','Write the headlines first, as sentences, and read them in order. If they don\u2019t tell the story alone, fix the outline before touching layout. Lead with the answer, then the proof.'],
fonts:['Inconsistent fonts / colors','Lock a mini system: 1 typeface (2 weights), 3 sizes, 1 accent color used only for what matters. Rebuild the master slides so every layout pulls from it.'],
charts:['Confusing charts','One chart, one point: put the takeaway in the headline, highlight the key bar or line in the accent color and grey out the rest. Delete gridlines, legends and 3D.'],
many:['Too many slides','Merge or kill slides that repeat a message. Aim for one slide per idea and a 3-slide executive summary up front; everything else can live in the appendix.'],
img:['Low-res images','Replace pixelated or stretched images with high-res ones at their native ratio. Fewer, bigger images beat a collage of small ones.'],
align:['Nothing lines up','Set a grid (margins + columns) in the master and snap every element to it. Consistent margins alone make a deck look 2x more expensive.'],
brand:['Off-brand template','Rebuild the template from the brand guidelines: logo zone, color tokens, type styles and 6–8 reusable layouts, so the team stops improvising.']};
function deck(){var f=$('#dd'),out=$('#dd-out');if(!f)return;f.addEventListener('submit',function(e){e.preventDefault();var k=$$('input:checked',f).map(function(i){return i.value});
 if(!k.length){out.innerHTML='<p class="t-note">Tick at least one symptom. (If your deck has none: congrats, frame it.)</p>';return}
 var sev=k.length>=5?'Critical, but fixable':k.length>=3?'Needs a proper treatment':'Minor surgery',recs=k.slice(0,5).map(function(x){return'<li><b>'+DD[x][0]+'.</b> '+DD[x][1]+'</li>'});
 if(k.length<3)recs.push('<li><b>Test it.</b> Show it to someone for 10 seconds per slide and ask what each one says. Anything they can\u2019t repeat needs work.</li>');
 if(recs.length<3)recs.push('<li><b>Design the last slide.</b> End with the decision or next step you need, not \u201cThank you / Questions?\u201d.</li>');
 var body='Hi Guillermo,%0D%0A%0D%0AThe Deck Doctor flagged: '+encodeURIComponent(k.map(function(x){return DD[x][0]}).join(', '))+'.%0D%0ACould you take a look at my deck?%0D%0A';
 out.innerHTML='<div class="dd-res"><p class="mono t-tag">Diagnosis: '+sev+' \u00b7 '+k.length+' symptom'+(k.length>1?'s':'')+'</p><ol>'+recs.join('')+'</ol>'+
 '<div class="ba"><figure><div class="sl sl-b"><i></i><i></i><i></i><i></i><i></i><i></i><u></u><s></s></div><figcaption class="mono">Before</figcaption></figure><span aria-hidden="true">→</span><figure><div class="sl sl-a"><b></b><em></em><u></u></div><figcaption class="mono">After</figcaption></figure></div>'+
 '<a class="btn" href="mailto:'+MAIL+'?subject='+encodeURIComponent('Deck Doctor: second opinion')+'&body='+body+'">Need a second opinion? Let\u2019s talk \u2192</a></div>'})}
/* ---------- 2. Scope calculator ---------- */
var SC={deck:{n:'Presentation deck',u:'slides',s:[[10,'Up to 10'],[25,'11–25'],[50,'26–50'],[90,'50+']],w:[[1,2],[2,3],[3,5],[5,8]],inc:['Story & outline review','Master template with layouts','Slide design','Charts & diagrams','Editable PowerPoint / Google Slides file']},
report:{n:'Annual / corporate report',u:'pages',s:[[16,'Up to 16'],[40,'17–40'],[80,'41–80'],[150,'80+']],w:[[2,3],[3,5],[5,8],[8,12]],inc:['Editorial concept & grid','Infographics & data visualization','Layout & typesetting','Print-ready PDF + accessible digital PDF']},
book:{n:'Book / catalogue',u:'pages',s:[[64,'Up to 64'],[160,'65–160'],[320,'161–320'],[500,'320+']],w:[[3,4],[4,7],[7,11],[10,16]],inc:['Cover concept','Interior design system','Typesetting & image placement','Proof rounds','Print-ready files for the printer']},
identity:{n:'Brand identity',u:'scope',s:[[1,'Logo only'],[2,'Logo + basic kit'],[3,'Full identity'],[4,'Identity + guidelines']],w:[[2,3],[3,5],[5,7],[6,10]],inc:['Discovery & references','2–3 logo routes','Color & type system','Key applications','Brand guidelines (by scope)']},
social:{n:'Social media kit',u:'pieces',s:[[10,'Up to 10'],[30,'11–30'],[60,'31–60'],[100,'60+ / monthly']],w:[[1,2],[2,3],[3,4],[4,6]],inc:['Visual direction','Editable templates','Post & story designs','Export for each platform']}};
function scope(){var f=$('#sc'),out=$('#sc-out');if(!f)return;var t=$('[name=type]',f),sz=$('[name=size]',f);
 function fill(){var c=SC[t.value];sz.innerHTML=c.s.map(function(s,i){return'<option value="'+i+'">'+s[1]+' '+(c.u=='scope'?'':c.u)+'</option>'}).join('');$('#sc-ul').textContent=c.u=='scope'?'Scope':'Size ('+c.u+')'}
 t.addEventListener('change',fill);fill();
 f.addEventListener('submit',function(e){e.preventDefault();var c=SC[t.value],i=+sz.value,w=c.w[i].slice(),cont=$('[name=content]:checked',f).value,urg=$('[name=urg]:checked',f).value;
  if(cont=='full'){w[0]+=1;w[1]+=2}if(urg=='rush'){w=[Math.max(1,Math.ceil(w[0]*.6)),Math.max(1,Math.ceil(w[1]*.65))]}
  var st=['Kick-off & brief','Concept / direction','Design','Review rounds (2 included)','Final files & handover'];if(cont=='full')st.splice(1,0,'Content: copywriting / structuring');
  var inc=c.inc.slice();if(cont=='full')inc.push('Content support: structure, copy editing and headlines');if(urg=='rush')inc.push('Priority slot (rush): fewer review rounds, faster feedback needed');
  var rng=w[0]==w[1]?w[0]+' week'+(w[0]>1?'s':''):w[0]+'–'+w[1]+' weeks',sum=c.n+' · '+c.s[i][1]+(c.u=='scope'?'':' '+c.u)+' · '+(cont=='full'?'Design + content':'Design only')+' · '+(urg=='rush'?'Rush':'Standard timing');
  var txt='Project: '+sum+'\nEstimated timeline: '+rng+'\n\nIncludes:\n- '+inc.join('\n- ')+'\n\nStages:\n'+st.map(function(s,j){return(j+1)+'. '+s}).join('\n')+'\n\n(Estimate from the scope calculator; final timeline after a short call.)';
  out.innerHTML='<div class="sc-res"><p class="mono t-tag">'+esc(sum)+'</p><p class="sc-big">'+rng+'</p><div class="sc-cols"><div><h4 class="mono">Includes</h4><ul>'+inc.map(function(x){return'<li>'+esc(x)+'</li>'}).join('')+'</ul></div><div><h4 class="mono">Stages</h4><ol>'+st.map(function(x){return'<li>'+esc(x)+'</li>'}).join('')+'</ol></div></div><p class="t-note">Timeline ranges are estimates, not a quote. No prices here: every project gets a proper proposal.</p><a class="btn" href="mailto:'+MAIL+'?subject='+encodeURIComponent('Project scope: '+c.n)+'&body='+encodeURIComponent('Hi Guillermo,\n\n'+txt+'\n\n')+'">Send this scope by email \u2192</a></div>'})}
/* ---------- 3. Palette ---------- */
function palette(){var inp=$('#pl-c'),file=$('#pl-f'),out=$('#pl-out');if(!inp)return;
 function show(cols,src){out.innerHTML='<p class="mono t-tag">'+src+'</p><div class="pl-row">'+cols.map(function(h){var w=ratio(h,'#ffffff'),b=ratio(h,'#0b0b0b'),best=w>=b?'#ffffff':'#0b0b0b',r=Math.max(w,b);
  return'<div class="sw" style="background:'+h+';color:'+best+'"><b>'+h.toUpperCase()+'</b><small>'+(best=='#ffffff'?'White':'Black')+' text '+r.toFixed(1)+':1 · '+grade(r)+'</small><button type="button" class="mono" data-h="'+h+'" style="color:'+best+';border-color:'+best+'">Copy</button></div>'}).join('')+'</div><button type="button" class="btn pl-all" data-h="'+cols.join(', ')+'">Copy all HEX</button>'}
 function fromColor(h){var s=rgb2hsl(hex2rgb(h));show([hsl2hex(s[0],s[1]*.9,.12),hsl2hex(s[0],s[1],s[2]),hsl2hex(s[0]+30,s[1]*.85,Math.min(.75,s[2]+.15)),hsl2hex(s[0]+180,Math.max(.45,s[1]),.55),hsl2hex(s[0]+15,s[1]*.25,.95)],'From '+h.toUpperCase()+': dark · base · analogous · complement · light')}
 inp.addEventListener('input',function(){fromColor(inp.value)});fromColor(inp.value);
 file.addEventListener('change',function(){var f=file.files[0];if(!f)return;var img=new Image();img.onload=function(){var c=d.createElement('canvas'),S=64;c.width=c.height=S;var x=c.getContext('2d');x.drawImage(img,0,0,S,S);var px=x.getImageData(0,0,S,S).data,b={};
  for(var i=0;i<px.length;i+=4){if(px[i+3]<128)continue;var k=(px[i]>>5)+','+(px[i+1]>>5)+','+(px[i+2]>>5);(b[k]=b[k]||[0,0,0,0]);b[k][0]+=px[i];b[k][1]+=px[i+1];b[k][2]+=px[i+2];b[k][3]++}
  var arr=Object.keys(b).map(function(k){var v=b[k];return{c:[v[0]/v[3],v[1]/v[3],v[2]/v[3]],n:v[3]}}).sort(function(a,z){return z.n-a.n}),pick=[];
  arr.forEach(function(a){if(pick.length<5&&pick.every(function(p){return Math.hypot(p[0]-a.c[0],p[1]-a.c[1],p[2]-a.c[2])>48}))pick.push(a.c)});
  while(pick.length<5&&arr[pick.length])pick.push(arr[pick.length].c);
  pick.sort(function(a,z){return lum(a)-lum(z)});show(pick.map(rgb2hex),'Extracted locally from your image (nothing is uploaded)');URL.revokeObjectURL(img.src)};img.src=URL.createObjectURL(f)});
 out.addEventListener('click',function(e){var b=e.target.closest('button[data-h]');if(b)copy(b.getAttribute('data-h'),b)})}
/* ---------- 4. Type pairing ---------- */
var PAIRS=[['Anton','Inter','Condensed poster headline + neutral sans: maximum impact, zero noise. (This site\u2019s pair.)'],['Playfair Display','Source Sans 3','High-contrast serif for elegance, a calm sans that stays readable at small sizes.'],['DM Serif Display','DM Sans','Same family DNA, so proportions match; the serif adds voice, the sans does the work.'],['Space Grotesk','IBM Plex Serif','Techy grotesk headline, bookish serif body: modern but credible, great for reports.'],['Archivo Black','Archivo','One superfamily, two personalities: heavy for statements, regular for everything else.'],['Fraunces','Work Sans','A soft, quirky serif gives warmth; a clean geometric sans keeps it professional.']];
function types(){var h=$('#tp-h'),p=$('#tp-p'),out=$('#tp-out');if(!h)return;
 out.innerHTML=PAIRS.map(function(x){return'<div class="tp"><p class="mono t-tag">'+x[0]+' + '+x[1]+'</p><h4 style="font-family:\''+x[0]+'\',serif"></h4><p class="tp-b" style="font-family:\''+x[1]+'\',sans-serif"></p><p class="t-note">'+x[2]+'</p></div>'}).join('');
 function r(){$$('.tp h4',out).forEach(function(e){e.textContent=h.value||'Your headline here'});$$('.tp .tp-b',out).forEach(function(e){e.textContent=p.value||'Your body text here.'})}h.addEventListener('input',r);p.addEventListener('input',r);r()}
/* ---------- 5. Contrast ---------- */
function contrast(){var a=$('#cc-a'),b=$('#cc-b'),out=$('#cc-out');if(!a)return;
 function r(){var x=ratio(a.value,b.value),q=x>=7?['Chef\u2019s kiss. Readable from space.','AAA: even your grandma\u2019s reading glasses approve.']:x>=4.5?['Solid AA. Your accessibility audit can relax.','Good to go for body text. Ship it.']:x>=3?['Fine for big headlines, risky for body text.','Large text only. Small text will squint back at you.']:['This is a whisper, not a design.','Fail. Even the designer can\u2019t read it, and they picked it.'],qq=q[Math.floor(x*10)%q.length];
  var row=function(l,t){return'<tr><td>'+l+'</td><td class="'+(x>=t?'ok':'ko')+'">'+(x>=t?'Pass':'Fail')+'</td></tr>'};
  out.innerHTML='<div class="cc-prev" style="background:'+b.value+';color:'+a.value+'"><b>Aa</b><span>The quick brown fox pitches a deck.</span></div><p class="sc-big">'+x.toFixed(2)+':1</p><table class="cc-t mono"><tbody>'+row('AA normal text (4.5)',4.5)+row('AA large text (3)',3)+row('AAA normal text (7)',7)+row('AAA large text (4.5)',4.5)+'</tbody></table><p class="cc-q">'+qq+'</p>'}
 a.addEventListener('input',r);b.addEventListener('input',r);$('#cc-sw').addEventListener('click',function(){var t=a.value;a.value=b.value;b.value=t;r()});r()}
/* open card from hash */
function openT(h,scroll){var el=h&&d.getElementById(h);if(!el||el.tagName!='DETAILS')return;$$('details.tc').forEach(function(x){if(x!==el)x.open=false});el.open=true;$$('.pk').forEach(function(c){c.classList.toggle('on',c.getAttribute('data-open')==h)});if(scroll!==false)setTimeout(function(){el.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})},60)}
function hash(){openT(location.hash.slice(1))}

$$('details.tc').forEach(function(x){x.addEventListener('toggle',function(){if(!x.open)$$('.pk').forEach(function(c){if(c.getAttribute('data-open')==x.id)c.classList.remove('on')})})});
if(window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches)$$('.pk').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--rx',(-y*7)+'deg');c.style.setProperty('--ry',(x*9)+'deg');c.style.setProperty('--gx',(x+.5)*100+'%');c.style.setProperty('--gy',(y+.5)*100+'%')});c.addEventListener('mouseleave',function(){c.style.removeProperty('--rx');c.style.removeProperty('--ry')})});
deck();scope();palette();types();contrast();hash();addEventListener('hashchange',hash)})();
