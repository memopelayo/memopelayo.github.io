/* Playground tools. No deps (pdf.js loaded on Deck Doctor page only). */
(function(){var d=document,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return[].slice.call((r||d).querySelectorAll(s))},MAIL='memopelayo@gmail.com';

var LANG=((document.documentElement.lang||'')+(document.documentElement.getAttribute('data-lang')||'')).toLowerCase().indexOf('es')>=0?'es':'en';
var I18N={
en:{
  tick:'Tick at least one symptom. (If your deck has none: congrats, frame it.)',
  diag:'Diagnosis',
  symptom:'symptom',symptoms:'symptoms',
  critical:'Critical, but fixable',needs:'Needs a proper treatment',minor:'Minor surgery',
  testIt:'Test it.',testItBody:' Show it to someone for 10 seconds per slide and ask what each one says. Anything they can\u2019t repeat needs work.',
  lastSlide:'Design the last slide.',lastSlideBody:' End with the decision or next step you need, not \u201cThank you / Questions?\u201d.',
  before:'Before',after:'After',
  secondOp:'Need a second opinion? Let\u2019s talk \u2192',
  analyzing:'Analyzing locally\u2026',
  pdfPlease:'Please upload a PDF.',
  pdfBig:'File is over 20 MB. Compress it or pick a smaller deck export.',
  pdfFail:'Could not read this PDF in the browser. Try exporting again from PowerPoint / Keynote. (',
  pdfScan:'PDF scan',pages:'page',pagesP:'pages',firstN:'first',analyzed:'analyzed',stays:'stays in your browser',
  fonts:'Fonts',sizes:'Sizes',images:'Images',sampled:'Sampled palette',charsPer:'Characters per slide',
  pdfNote:'Heuristic client-side scan (pdf.js). Not a full design audit — use the checklist above for the diagnosis.',
  heavyText:'Heavy text (~',charsAvg:' chars/slide avg) — trim to a headline + 3 points.',
  modText:'Moderate text (~',watchDense:' chars/slide). Watch the densest slides.',
  textOk:'Text load looks manageable (~',charsAvgShort:' chars/slide avg).',
  fontMany:' font names detected — aim for 1–2 families.',
  fontDet:' font name',fontDets:' font names detected.',
  sizeMany:' distinct text sizes — lock 3 sizes max.',
  colorMany:'Many color ranges (~',buckets:' grupos) — tighten the palette.',
  colorOk:'Color ranges look contained (~',bucketsOk:' buckets sampled).',
  lowRes:' likely low-res image',lowResS:' likely low-res images found.',
  imgOk:' image',imgOkS:' images found; no obvious tiny bitmaps.',
  noImg:'No embedded images detected in scanned pages.',
  contrastFail:'Possible weak contrast on ',page:' page',pagesOn:' pages',heuristic:' (heuristic).',
  slide:'Slide',
  week:'week',weeks:'weeks',
  designOnly:'Design only',designContent:'Design + content',rush:'Rush',standard:'Standard timing',
  includes:'Includes',stages:'Stages',
  scopeNote:'Timeline ranges are estimates, not a quote. No prices here: every project gets a proper proposal.',
  scopeFn:'How this is calculated: base week ranges by project type and size; +1 / +2 weeks when content help is included; Rush multiplies by ~0.6–0.65 (rounded up). General estimates — not from historical project data.',
  sendScope:'Send this scope by email \u2192',
  copied:'Copied',
  fromColor:'From ',paletteParts:': dark · base · analogous · complement · light',
  extracted:'Extracted locally from your image (nothing is uploaded)',
  copyAll:'Copy all HEX',
  whiteText:'White',blackText:'Black',textWord:' text ',
  recommended:'Recommended',
  pairs:'pairs',previous:'Previous',next:'Next',
  headlinePh:'Your headline here',bodyPh:'Your body text here.',
  toggleOpts:'Toggle options to compare. Recommended: 1 + 2 + 3.',
  green:'Green light',yellow:'Yellow light',red:'Red light',
  plainAAA:'Excellent contrast — AAA for body text. Safe almost everywhere.',
  plainAA:'Good contrast — passes AA for normal text. Fine for body copy.',
  plainLarge:'Borderline — OK for large text only (18pt+ / 14pt bold). Risky for paragraphs.',
  plainFail:'Fail — too weak for text. People will squint or skip it.',
  wcagTable:'WCAG table',
  miniSlide:'Mini-slide preview',
  slideH:'Make the decision easy',
  slideP:'One message per slide. Proof underneath. Ask for the next step.',
  nextStep:'Next step →',
  nearest:'Nearest passing color (AA 4.5:1)',
  alreadyPass:'Already passes AA. No change needed.',
  useColor:'Use this color',
  noNearby:'Could not find a nearby pass — try adjusting the background too.',
  sims:'Simulations',normal:'Normal',projector:'Projector',sun:'Phone in sun',
  ratioScale:'Contrast ratio scale (1–21)',
  marks:'Marks at 3 (AA large), 4.5 (AA), 7 (AAA).',
  aaN:'AA normal text (4.5)',aaL:'AA large text (3)',aaaN:'AAA normal text (7)',aaaL:'AAA large text (4.5)',
  pass:'Pass',fail:'Fail',
  scope:'Scope',size:'Size'
},
es:{
  tick:'Marca al menos un s\u00edntoma. (Si tu <em lang="en">deck</em> no tiene ninguno: felicidades, enm\u00e1rcalo.)',
  diag:'Diagn\u00f3stico',
  symptom:'s\u00edntoma',symptoms:'s\u00edntomas',
  critical:'Cr\u00edtico, pero se puede arreglar',needs:'Necesita un tratamiento de verdad',minor:'Cirug\u00eda menor',
  testIt:'Pru\u00e9balo.',testItBody:' Mu\u00e9straselo a alguien 10 segundos por <em lang="en">slide</em> y pregunta qu\u00e9 dice cada una. Lo que no puedan repetir, hay que trabajarlo.',
  lastSlide:'Dise\u00f1a la \u00faltima <em lang="en">slide</em>.',lastSlideBody:' Cierra con la decisi\u00f3n o el siguiente paso que necesitas, no con \u201cGracias / \u00bfPreguntas?\u201d.',
  before:'Antes',after:'Despu\u00e9s',
  secondOp:'\u00bfSegunda opini\u00f3n? Hablemos \u2192',
  analyzing:'Analizando aqu\u00ed mismo\u2026',
  pdfPlease:'Sube un PDF.',
  pdfBig:'El archivo pesa m\u00e1s de 20 MB. Compr\u00edmelo o elige un <em lang="en">export</em> m\u00e1s chico.',
  pdfFail:'No pude leer este PDF en el navegador. Intenta exportarlo otra vez desde PowerPoint / Keynote. (',
  pdfScan:'Escaneo PDF',pages:'p\u00e1gina',pagesP:'p\u00e1ginas',firstN:'primeras',analyzed:'analizadas',stays:'se queda en tu navegador',
  fonts:'Fuentes',sizes:'Tama\u00f1os',images:'Im\u00e1genes',sampled:'Paleta muestreada',charsPer:'Caracteres por <em lang="en">slide</em>',
  pdfNote:'Escaneo heur\u00edstico en el cliente (pdf.js). No es una auditor\u00eda completa de dise\u00f1o: usa la <em lang="en">checklist</em> de arriba para el diagn\u00f3stico.',
  heavyText:'Mucho texto (~',charsAvg:' caracteres/<em lang="en">slide</em> en promedio) \u2014 deja un titular + 3 puntos.',
  modText:'Texto moderado (~',watchDense:' caracteres/<em lang="en">slide</em>). Cuidado con las <em lang="en">slides</em> m\u00e1s densas.',
  textOk:'La carga de texto se ve manejable (~',charsAvgShort:' caracteres/<em lang="en">slide</em> en promedio).',
  fontMany:' nombres de fuente detectados — mejor 1 o 2 familias.',
  fontDet:' nombre de fuente',fontDets:' nombres de fuente detectados.',
  sizeMany:' tama\u00f1os de texto distintos — m\u00e1ximo 3.',
  colorMany:'Muchos rangos de color (~',buckets:' grupos) — aprieta la paleta.',
  colorOk:'Los rangos de color se ven contenidos (~',bucketsOk:' grupos muestreados).',
  lowRes:' imagen probablemente en baja resoluci\u00f3n',lowResS:' im\u00e1genes probablemente en baja resoluci\u00f3n.',
  imgOk:' imagen',imgOkS:' im\u00e1genes; sin <em lang="en">bitmaps</em> chiquitos a la vista.',
  noImg:'No se detectaron im\u00e1genes embebidas en las p\u00e1ginas escaneadas.',
  contrastFail:'Posible contraste d\u00e9bil en ',page:' p\u00e1gina',pagesOn:' p\u00e1ginas',heuristic:' (heur\u00edstica).',
  slide:'<em lang="en">Slide</em>',
  week:'semana',weeks:'semanas',
  designOnly:'Solo dise\u00f1o',designContent:'Dise\u00f1o + contenido',rush:'Urgente',standard:'Ritmo normal',
  includes:'Incluye',stages:'Etapas',
  scopeNote:'Los rangos de tiempo son estimaciones, no una cotizaci\u00f3n. Aqu\u00ed no hay precios: cada proyecto lleva propuesta.',
  scopeFn:'C\u00f3mo se calcula: rangos base por tipo y tama\u00f1o de proyecto; +1 / +2 semanas si hay ayuda de contenido; Urgente multiplica por ~0.6–0.65 (redondeado al alza). Estimaciones generales — no salen de datos hist\u00f3ricos.',
  sendScope:'Enviar este alcance por correo \u2192',
  copied:'Copiado',
  fromColor:'Desde ',paletteParts:': oscuro · base · an\u00e1logo · complemento · claro',
  extracted:'Extra\u00edda aqu\u00ed en tu navegador (no se sube nada)',
  copyAll:'Copiar todos los HEX',
  whiteText:'Blanco',blackText:'Negro',textWord:' texto ',
  recommended:'Recomendada',
  pairs:'pares',previous:'Anterior',next:'Siguiente',
  headlinePh:'Tu titular aqu\u00ed',bodyPh:'Tu texto de cuerpo aqu\u00ed.',
  toggleOpts:'Activa opciones para comparar. Recomendadas: 1 + 2 + 3.',
  green:'Luz verde',yellow:'Luz amarilla',red:'Luz roja',
  plainAAA:'Excelente contraste — AAA para texto de cuerpo. Seguro casi en todos lados.',
  plainAA:'Buen contraste — pasa AA para texto normal. Sirve para p\u00e1rrafos.',
  plainLarge:'Al l\u00edmite — OK solo para texto grande (18pt+ / 14pt bold). Arriesgado en p\u00e1rrafos.',
  plainFail:'No pasa — el contraste es muy bajo para texto. La gente tiene que forzar la vista… o de plano se lo salta.',
  wcagTable:'Tabla WCAG',
  miniSlide:'Mini <em lang="en">preview</em> de la <em lang="en">slide</em>',
  slideH:'Facilita la decisi\u00f3n',
  slideP:'Un mensaje por <em lang="en">slide</em>. La evidencia abajo. Pide el siguiente paso.',
  nextStep:'Siguiente paso →',
  nearest:'Color cercano que s\u00ed pasa (AA 4.5:1)',
  alreadyPass:'Ya pasa AA. No hace falta cambiarlo.',
  useColor:'Usar este color',
  noNearby:'No encontr\u00e9 un color cercano que pase — prueba ajustar tambi\u00e9n el fondo.',
  sims:'Simulaciones',normal:'Normal',projector:'Proyector',sun:'Celular al sol',
  ratioScale:'Escala de contraste (1–21)',
  marks:'Marcas en 3 (AA grande), 4.5 (AA), 7 (AAA).',
  aaN:'AA texto normal (4.5)',aaL:'AA texto grande (3)',aaaN:'AAA texto normal (7)',aaaL:'AAA texto grande (4.5)',
  pass:'Pasa',fail:'Falla',
  scope:'Alcance',size:'Tama\u00f1o'
}
};
function t(k){return (I18N[LANG]&&I18N[LANG][k]!=null)?I18N[LANG][k]:(I18N.en[k]!=null?I18N.en[k]:k)}

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function copy(t,btn){var done=function(){var o=btn.textContent;btn.textContent=t('copied');setTimeout(function(){btn.textContent=o},1200)};if(navigator.clipboard&&isSecureContext)navigator.clipboard.writeText(t).then(done,done);else{var a=d.createElement('textarea');a.value=t;d.body.appendChild(a);a.select();try{d.execCommand('copy')}catch(e){}a.remove();done()}}
/* ---------- colour math ---------- */
function hex2rgb(h){h=h.replace('#','');if(h.length==3)h=h.replace(/./g,'$&$&');var n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255]}
function rgb2hex(r){return'#'+r.map(function(v){return('0'+Math.round(Math.max(0,Math.min(255,v))).toString(16)).slice(-2)}).join('')}
function lum(r){return r.map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}).reduce(function(a,v,i){return a+v*[.2126,.7152,.0722][i]},0)}
function ratio(a,b){var x=lum(hex2rgb(a)),y=lum(hex2rgb(b));return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function rgb2hsl(c){var r=c[0]/255,g=c[1]/255,b=c[2]/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),h=0,s=0,l=(mx+mn)/2,dd=mx-mn;if(dd){s=l>.5?dd/(2-mx-mn):dd/(mx+mn);h=mx==r?(g-b)/dd+(g<b?6:0):mx==g?(b-r)/dd+2:(r-g)/dd+4;h*=60}return[h,s,l]}
function hsl2hex(h,s,l){h=((h%360)+360)%360;s=Math.max(0,Math.min(1,s));l=Math.max(0,Math.min(1,l));var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h/60%2-1)),m=l-c/2,r=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return rgb2hex(r.map(function(v){return(v+m)*255}))}
function grade(r){return r>=7?'AAA':r>=4.5?'AA':r>=3?'AA large':'Fail'}
function clamp(n,a,b){return Math.max(a,Math.min(b,n))}

/* ---------- 1. Deck Doctor ---------- */
var DD={text:['Too much text','Cut every slide to one message. Move the paragraphs to speaker notes or an appendix; the slide keeps a 6–10 word headline and up to 3 supporting points.'],
story:['No clear story','Write the headlines first, as sentences, and read them in order. If they don\u2019t tell the story alone, fix the outline before touching layout. Lead with the answer, then the proof.'],
fonts:['Inconsistent fonts / colors','Lock a mini system: 1 typeface (2 weights), 3 sizes, 1 accent color used only for what matters. Rebuild the master slides so every layout pulls from it.'],
charts:['Confusing charts','One chart, one point: put the takeaway in the headline, highlight the key bar or line in the accent color and grey out the rest. Delete gridlines, legends and 3D.'],
many:['Too many slides','Merge or kill slides that repeat a message. Aim for one slide per idea and a 3-slide executive summary up front; everything else can live in the appendix.'],
img:['Low-res images','Replace pixelated or stretched images with high-res ones at their native ratio. Fewer, bigger images beat a collage of small ones.'],
align:['Nothing lines up','Set a grid (margins + columns) in the master and snap every element to it. Consistent margins alone make a deck look 2x more expensive.'],
brand:['Off-brand template','Rebuild the template from the brand guidelines: logo zone, color tokens, type styles and 6–8 reusable layouts, so the team stops improvising.']};
var DD_ORDER=['text','story','fonts','charts','many','img','align','brand'];
function ddBa(keys){
  var main=keys[0]||'text';
  var before={
    text:'<div class="sl sl-b sl-text"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>',
    story:'<div class="sl sl-b sl-story"><span class="n1"></span><span class="n2"></span><span class="n3"></span><span class="n4"></span></div>',
    fonts:'<div class="sl sl-b sl-fonts"><b class="f1">Aa</b><b class="f2">Bb</b><b class="f3">Cc</b><em></em><i></i></div>',
    charts:'<div class="sl sl-b sl-charts"><span class="pie"></span><span class="lg"></span><span class="lg"></span><span class="lg"></span></div>',
    many:'<div class="sl sl-b sl-many"><span></span><span></span><span></span><span></span><span></span></div>',
    img:'<div class="sl sl-b sl-img"><u></u><s></s></div>',
    align:'<div class="sl sl-b sl-align"><i></i><i></i><i></i><u></u><s></s></div>',
    brand:'<div class="sl sl-b sl-brand"><i></i><i></i><i></i><em></em><u></u></div>'
  };
  var after={
    text:'<div class="sl sl-a sl-text"><b></b><em></em><em class="e2"></em><em class="e3"></em></div>',
    story:'<div class="sl sl-a sl-story"><span class="a1"></span><span class="a2"></span><span class="a3"></span></div>',
    fonts:'<div class="sl sl-a sl-fonts"><b>Aa</b><em></em><i></i></div>',
    charts:'<div class="sl sl-a"><b></b><em></em><u></u></div>',
    many:'<div class="sl sl-a sl-many"><span></span><span></span><span></span></div>',
    img:'<div class="sl sl-a sl-img"><u></u></div>',
    align:'<div class="sl sl-a sl-align"><b></b><em></em><em class="e2"></em><em class="e3"></em></div>',
    brand:'<div class="sl sl-a sl-brand"><b></b><em></em><u></u></div>'
  };
  return '<div class="ba" data-sym="'+esc(main)+'"><figure>'+(before[main]||before.text)+'<figcaption class="mono">'+t('before')+' · '+esc(DD[main][0])+'</figcaption></figure><span aria-hidden="true">→</span><figure>'+(after[main]||after.text)+'<figcaption class="mono">'+t('after')+'</figcaption></figure></div>';
}
function deck(){var f=$('#dd'),out=$('#dd-out');if(!f)return;
 function render(){var k=$$('input[name=i]:checked',f).map(function(i){return i.value});
  if(!k.length){out.innerHTML='<p class="t-note">'+t('tick')+'</p>';return}
  var sev=k.length>=5?t('critical'):k.length>=3?t('needs'):t('minor'),recs=k.slice(0,5).map(function(x){return'<li><b>'+DD[x][0]+'.</b> '+DD[x][1]+'</li>'});
  if(k.length<3)recs.push('<li><b>'+t('testIt')+'</b>'+t('testItBody')+'</li>');
  if(recs.length<3)recs.push('<li><b>'+t('lastSlide')+'</b>'+t('lastSlideBody')+'</li>');
  var body='Hi Guillermo,%0D%0A%0D%0AThe Deck Doctor flagged: '+encodeURIComponent(k.map(function(x){return DD[x][0]}).join(', '))+'.%0D%0ACould you take a look at my deck?%0D%0A';
  out.innerHTML='<div class="dd-res"><p class="mono t-tag">'+t('diag')+': '+sev+' \u00b7 '+k.length+' '+(k.length>1?t('symptoms'):t('symptom'))+'</p><ol>'+recs.join('')+'</ol>'+
   ddBa(k)+
   '<a class="btn" href="mailto:'+MAIL+'?subject='+encodeURIComponent('Deck Doctor: second opinion')+'&body='+body+'">Need a second opinion? Let\u2019s talk \u2192</a></div>'}
 f.addEventListener('submit',function(e){e.preventDefault();render()});
 $$('input[name=i]',f).forEach(function(cb){cb.addEventListener('change',function(){if(out.querySelector('.dd-res'))render()})});
 /* PDF upload */
 var pdfInp=$('#dd-pdf'),pdfOut=$('#dd-pdf-out');
 if(pdfInp&&pdfOut){
  pdfInp.addEventListener('change',function(){
   var file=pdfInp.files&&pdfInp.files[0];
   if(!file){pdfOut.innerHTML='';return}
   if(file.type&&file.type!=='application/pdf'&&!/\.pdf$/i.test(file.name)){pdfOut.innerHTML='<p class="t-note">'+t('pdfPlease')+'</p>';return}
   if(file.size>20*1024*1024){pdfOut.innerHTML='<p class="t-note">'+t('pdfBig')+'</p>';return}
   pdfOut.innerHTML='<p class="mono t-tag">'+t('analyzing')+'</p>';
   analyzePdf(file).then(function(r){pdfOut.innerHTML=renderPdfReport(r)}).catch(function(err){
    pdfOut.innerHTML='<p class="t-note">'+t('pdfFail')+esc(err&&err.message||err)+')</p>'
   })
  })
 }
}
function loadPdfJs(){return new Promise(function(resolve,reject){
  if(window.pdfjsLib){resolve(window.pdfjsLib);return}
  var s=d.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  s.onload=function(){if(!window.pdfjsLib){reject(new Error('pdf.js missing'));return}
   window.pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
   resolve(window.pdfjsLib)};
  s.onerror=function(){reject(new Error('Could not load pdf.js'))};d.head.appendChild(s)
})}
function analyzePdf(file){return loadPdfJs().then(function(pdfjsLib){return file.arrayBuffer().then(function(buf){
 return pdfjsLib.getDocument({data:buf}).promise.then(function(pdf){
  var n=pdf.numPages,max=Math.min(n,40),fonts={},sizes={},chars=[],colorBuckets={},lowRes=0,imgCount=0,contrastFails=0,pagesDone=0;
  function bucketColor(r,g,b){var k=(r>>5)+','+(g>>5)+','+(b>>5);colorBuckets[k]=(colorBuckets[k]||0)+1}
  function doPage(i){return pdf.getPage(i).then(function(page){
   return page.getTextContent().then(function(tc){
    var c=0,fontSeen={};
    tc.items.forEach(function(it){
     var t=it.str||'';c+=t.replace(/\s/g,'').length;
     if(it.fontName){fonts[it.fontName]=(fonts[it.fontName]||0)+1;fontSeen[it.fontName]=1}
     var h=it.transform&&Math.abs(it.transform[3]||it.transform[0]||0);if(h){var sk=Math.round(h);sizes[sk]=(sizes[sk]||0)+1}
    });
    chars.push(c);
    var vp=page.getViewport({scale:.35}),canvas=d.createElement('canvas');canvas.width=vp.width;canvas.height=vp.height;
    var ctx=canvas.getContext('2d',{willReadFrequently:true});
    return page.render({canvasContext:ctx,viewport:vp}).promise.then(function(){
     try{var data=ctx.getImageData(0,0,canvas.width,canvas.height).data,step=16;
      for(var y=0;y<canvas.height;y+=step)for(var x=0;x<canvas.width;x+=step){var p=(y*canvas.width+x)*4;if(data[p+3]<200)continue;bucketColor(data[p],data[p+1],data[p+2])}
      /* rough contrast: corner bg vs mid text-ish dark pixels */
      var bg=[data[0],data[1],data[2]],dark=null;
      for(var j=0;j<data.length;j+=4*24){var L=.2126*data[j]+.7152*data[j+1]+.0722*data[j+2];if(L<80){dark=[data[j],data[j+1],data[j+2]];break}}
      if(dark){var rr=ratio(rgb2hex(dark),rgb2hex(bg));if(rr<3)contrastFails++}
     }catch(e){}
     return page.getOperatorList().then(function(ops){
      var OPS=pdfjsLib.OPS||{};
      for(var oi=0;oi<ops.fnArray.length;oi++){
       var fn=ops.fnArray[oi];
       if(fn===OPS.paintImageXObject||fn===OPS.paintInlineImageXObject||fn===85||fn===86){
        imgCount++;
        var arg=ops.argsArray[oi];
        if(arg&&arg[0]&&page.objs&&page.objs.has&&page.objs.has(arg[0])){
         try{var im=page.objs.get(arg[0]);if(im&&(im.width<200||im.height<150))lowRes++}catch(e){}
        }else{/* unknown size — sample canvas graininess already covered */}
       }
      }
      pagesDone++;
     })
    })
   })
  })}
  var chain=Promise.resolve();
  for(var i=1;i<=max;i++){(function(i){chain=chain.then(function(){return doPage(i)})})(i)}
  return chain.then(function(){
   var avg=chars.length?Math.round(chars.reduce(function(a,b){return a+b},0)/chars.length):0;
   var colKeys=Object.keys(colorBuckets).sort(function(a,b){return colorBuckets[b]-colorBuckets[a]});
   var topCols=colKeys.slice(0,8).map(function(k){var p=k.split(',').map(Number);return rgb2hex([p[0]*8+4,p[1]*8+4,p[2]*8+4])});
   return{pages:n,scanned:max,charsPer:chars,avgChars:avg,fontCount:Object.keys(fonts).length,sizeCount:Object.keys(sizes).length,fonts:fonts,sizes:sizes,colors:topCols,colorRanges:colKeys.length,imgCount:imgCount,lowRes:lowRes,contrastFails:contrastFails}
  })
 })
})})}
function renderPdfReport(r){
  var flags=[];
  if(r.avgChars>350)flags.push(t('heavyText')+r.avgChars+t('charsAvg'));
  else if(r.avgChars>180)flags.push(t('modText')+r.avgChars+t('watchDense'));
  else flags.push(t('textOk')+r.avgChars+t('charsAvgShort'));
  if(r.fontCount>4)flags.push(r.fontCount+t('fontMany'));
  else flags.push(r.fontCount+(r.fontCount===1?t('fontDet'):t('fontDets')));
  if(r.sizeCount>5)flags.push(r.sizeCount+t('sizeMany'));
  if(r.colorRanges>24)flags.push(t('colorMany')+r.colorRanges+t('buckets'));
  else flags.push(t('colorOk')+r.colorRanges+t('bucketsOk'));
  if(r.lowRes)flags.push(r.lowRes+(r.lowRes>1?t('lowResS'):t('lowRes')));
  else if(r.imgCount)flags.push(r.imgCount+(r.imgCount>1?t('imgOkS'):t('imgOk')));
  else flags.push(t('noImg'));
  if(r.contrastFails)flags.push(t('contrastFail')+r.contrastFails+(r.contrastFails>1?t('pagesOn'):t('page'))+t('heuristic'));
  var sw=r.colors.map(function(h){return'<span class="dd-sw" style="background:'+h+'" title="'+h+'"></span>'}).join('');
  var dens=r.charsPer.map(function(c,i){return'<li>'+t('slide')+' '+(i+1)+': <b>'+c+'</b></li>'}).join('');
  return '<div class="dd-pdf"><p class="mono t-tag">'+t('pdfScan')+' · '+r.pages+' '+(r.pages>1?t('pagesP'):t('pages'))+(r.scanned<r.pages?' ('+t('firstN')+' '+r.scanned+' '+t('analyzed')+')':'')+' · '+t('stays')+'</p>'+
   '<ul class="dd-flags">'+flags.map(function(x){return'<li>'+esc(x)+'</li>'}).join('')+'</ul>'+
   '<div class="dd-meta mono"><span>'+t('fonts')+': '+r.fontCount+'</span><span>'+t('sizes')+': '+r.sizeCount+'</span><span>'+t('images')+': '+r.imgCount+'</span></div>'+
   (sw?'<p class="mono t-tag">'+t('sampled')+'</p><div class="dd-swatch">'+sw+'</div>':'')+
   '<details class="dd-dens"><summary class="mono">'+t('charsPer')+'</summary><ol>'+dens+'</ol></details>'+
   '<p class="t-note">'+t('pdfNote')+'</p></div>';
}

/* ---------- 2. Scope calculator ---------- */
/* Lowered Standard/Rush bases a bit (2026-11). Rush still ×0.6 / ×0.65 ceil. */
var SC={deck:{n:'Presentation deck',u:'slides',s:[[10,'Up to 10'],[25,'11–25'],[50,'26–50'],[90,'50+']],w:[[1,2],[2,3],[3,4],[4,6]],inc:['Story & outline review','Master template with layouts','Slide design','Charts & diagrams','Editable PowerPoint / Google Slides file']},
report:{n:'Annual / corporate report',u:'pages',s:[[16,'Up to 16'],[40,'17–40'],[80,'41–80'],[150,'80+']],w:[[2,3],[3,4],[4,7],[7,10]],inc:['Editorial concept & grid','Infographics & data visualization','Layout & typesetting','Print-ready PDF + accessible digital PDF']},
book:{n:'Book / catalogue',u:'pages',s:[[64,'Up to 64'],[160,'65–160'],[320,'161–320'],[500,'320+']],w:[[2,4],[3,6],[6,9],[8,13]],inc:['Cover concept','Interior design system','Typesetting & image placement','Proof rounds','Print-ready files for the printer']},
identity:{n:'Brand identity',u:'scope',s:[[1,'Logo only'],[2,'Logo + basic kit'],[3,'Full identity'],[4,'Identity + guidelines']],w:[[2,3],[2,4],[4,6],[5,8]],inc:['Discovery & references','2–3 logo routes','Color & type system','Key applications','Brand guidelines (by scope)']},
social:{n:'Social media kit',u:'pieces',s:[[10,'Up to 10'],[30,'11–30'],[60,'31–60'],[100,'60+ / monthly']],w:[[1,2],[2,3],[2,3],[3,5]],inc:['Visual direction','Editable templates','Post & story designs','Export for each platform']}};
/* Spanish labels for Deck Doctor symptoms + recs */
if(LANG==='es'){
  DD={text:['Demasiado texto','Deja cada <em lang="en">slide</em> con un solo mensaje. Mueve los p\u00e1rrafos a notas del presentador o a un ap\u00e9ndice; la <em lang="en">slide</em> se queda con un titular de 6\u201310 palabras y hasta 3 puntos de apoyo.'],
  story:['Sin historia clara','Escribe primero los titulares, como oraciones, y l\u00e9elos en orden. Si solos no cuentan la historia, arregla el <em lang="en">outline</em> antes de tocar <em lang="en">layout</em>. Empieza con la respuesta, luego la prueba.'],
  fonts:['Fuentes / colores inconsistentes','Cierra un mini sistema: 1 tipograf\u00eda (2 pesos), 3 tama\u00f1os, 1 color de acento solo para lo que importa. Reconstruye los <em lang="en">masters</em> para que todo jale de ah\u00ed.'],
  charts:['Gr\u00e1ficas confusas','Una gr\u00e1fica, un punto: pon el <em lang="en">takeaway</em> en el titular, resalta la barra o l\u00ednea clave con el acento y apaga el resto. Adi\u00f3s a rejillas, leyendas y 3D.'],
  many:['Demasiadas <em lang="en">slides</em>','Fusiona o mata las que repiten un mensaje. Apunta a una <em lang="en">slide</em> por idea y un resumen ejecutivo de 3 <em lang="en">slides</em> al frente; lo dem\u00e1s puede vivir en el ap\u00e9ndice.'],
  img:['Im\u00e1genes en baja resoluci\u00f3n','Cambia las pixeladas o estiradas por otras en alta, a su proporci\u00f3n nativa. Menos im\u00e1genes, m\u00e1s grandes, ganan a un collage de chiquitas.'],
  align:['Nada est\u00e1 alineado','Pon una ret\u00edcula (m\u00e1rgenes + columnas) en el <em lang="en">master</em> y pega cada elemento a ella. Solo con m\u00e1rgenes consistentes el <em lang="en">deck</em> se ve 2\u00d7 m\u00e1s caro.'],
  brand:['Plantilla fuera de marca','Reconstruye la plantilla desde la gu\u00eda de marca: zona de logo, <em lang="en">tokens</em> de color, estilos de tipo y 6\u20138 <em lang="en">layouts</em> reutilizables, para que el equipo deje de improvisar.']};
  SC.deck.n='<em lang="en">Deck</em> / presentaci\u00f3n';SC.report.n='Reporte anual / corporativo';SC.book.n='Libro / cat\u00e1logo';SC.identity.n='Identidad de marca';SC.social.n='Kit de redes';
  SC.deck.u='<em lang="en">slides</em>';SC.report.u='p\u00e1ginas';SC.book.u='p\u00e1ginas';SC.social.u='piezas';
  SC.deck.s=[[10,'Hasta 10'],[25,'11–25'],[50,'26–50'],[90,'50+']];
  SC.report.s=[[16,'Hasta 16'],[40,'17–40'],[80,'41–80'],[150,'80+']];
  SC.book.s=[[64,'Hasta 64'],[160,'65–160'],[320,'161–320'],[500,'320+']];
  SC.identity.s=[[1,'Solo logo'],[2,'Logo + kit básico'],[3,'Identidad completa'],[4,'Identidad + manual']];
  SC.social.s=[[10,'Hasta 10'],[30,'11–30'],[60,'31–60'],[100,'60+ / mensual']];
  SC.deck.inc=['Revisi\u00f3n de historia y <em lang="en">outline</em>','<em lang="en">Master</em> con <em lang="en">layouts</em>','Dise\u00f1o de <em lang="en">slides</em>','Gráficas y diagramas','Archivo editable PowerPoint / Google Slides'];
  SC.report.inc=['Concepto editorial y retícula','Infografías y visualización de datos','Diagramación y tipografía','PDF para impresión + PDF digital accesible'];
  SC.book.inc=['Concepto de portada','Sistema de diseño interior','Composición e imágenes','Rondas de prueba','Archivos listos para imprenta'];
  SC.identity.inc=['Discovery y referencias','2–3 rutas de logo','Sistema de color y tipo','Aplicaciones clave','Manual de marca (según alcance)'];
  SC.social.inc=['Dirección visual','Plantillas editables','Diseños de post y story','<em lang="en">Export</em> por plataforma'];
}

function scope(){var f=$('#sc'),out=$('#sc-out');if(!f)return;var t=$('[name=type]',f),sz=$('[name=size]',f);
 function fill(){var c=SC[t.value];sz.innerHTML=c.s.map(function(s,i){return'<option value="'+i+'">'+s[1]+' '+(c.u=='scope'?'':c.u)+'</option>'}).join('');$('#sc-ul').textContent=c.u=='scope'?t('scope'):(t('size')+' ('+c.u+')')}
 t.addEventListener('change',fill);fill();
 f.addEventListener('submit',function(e){e.preventDefault();var c=SC[t.value],i=+sz.value,w=c.w[i].slice(),cont=$('[name=content]:checked',f).value,urg=$('[name=urg]:checked',f).value;
  if(cont=='full'){w[0]+=1;w[1]+=2}if(urg=='rush'){w=[Math.max(1,Math.ceil(w[0]*.6)),Math.max(1,Math.ceil(w[1]*.65))]}
  var st=LANG==='es'?['Kick-off y <em lang="en">brief</em>','Concepto / dirección','Diseño','Rondas de revisión (2 incluidas)','Archivos finales y entrega']:['Kick-off & brief','Concept / direction','Design','Review rounds (2 included)','Final files & handover'];if(cont=='full')st.splice(1,0,LANG==='es'?'Contenido: <em lang="en">copy</em> / estructura':'Content: copywriting / structuring');
  var inc=c.inc.slice();if(cont=='full')inc.push(LANG==='es'?'Soporte de contenido: estructura, edici\u00f3n de <em lang="en">copy</em> y titulares':'Content support: structure, copy editing and headlines');if(urg=='rush')inc.push(LANG==='es'?'Prioridad (urgente): menos rondas, <em lang="en">feedback</em> m\u00e1s r\u00e1pido':'Priority slot (rush): fewer review rounds, faster feedback needed');
  var rng=w[0]==w[1]?w[0]+' '+(w[0]>1?t('weeks'):t('week')):w[0]+'\u2013'+w[1]+' '+t('weeks'),sum=c.n+' · '+c.s[i][1]+(c.u=='scope'?'':' '+c.u)+' · '+(cont=='full'?t('designContent'):t('designOnly'))+' · '+(urg=='rush'?t('rush'):t('standard'));
  var txt='Project: '+sum+'\nEstimated timeline: '+rng+'\n\nIncludes:\n- '+inc.join('\n- ')+'\n\nStages:\n'+st.map(function(s,j){return(j+1)+'. '+s}).join('\n')+'\n\n(Estimate from the scope calculator; final timeline after a short call.)';
  out.innerHTML='<div class="sc-res"><p class="mono t-tag">'+sum+'</p><p class="sc-big">'+rng+'<sup class="sc-ref">1</sup></p><div class="sc-cols"><div><h4 class="mono">'+t('includes')+'</h4><ul>'+inc.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ul></div><div><h4 class="mono">'+t('stages')+'</h4><ol>'+st.map(function(x){return'<li>'+x+'</li>'}).join('')+'</ol></div></div><p class="t-note">'+t('scopeNote')+'</p><p class="sc-fn"><sup>1</sup> <i>'+t('scopeFn')+'</i></p><a class="btn" href="mailto:'+MAIL+'?subject='+encodeURIComponent('Project scope: '+c.n)+'&body='+encodeURIComponent('Hi Guillermo,\n\n'+txt+'\n\n')+'">'+t('sendScope')+'</a></div>'})}

/* ---------- 3. Palette (unchanged) ---------- */
function palette(){var inp=$('#pl-c'),file=$('#pl-f'),out=$('#pl-out');if(!inp)return;
 function show(cols,src){out.innerHTML='<p class="mono t-tag">'+src+'</p><div class="pl-row">'+cols.map(function(h){var w=ratio(h,'#ffffff'),b=ratio(h,'#0b0b0b'),best=w>=b?'#ffffff':'#0b0b0b',r=Math.max(w,b);
  return'<div class="sw" style="background:'+h+';color:'+best+'"><b>'+h.toUpperCase()+'</b><small>'+(best=='#ffffff'?t('whiteText'):t('blackText'))+t('textWord')+r.toFixed(1)+':1 · '+grade(r)+'</small><button type="button" class="mono" data-h="'+h+'" style="color:'+best+';border-color:'+best+'">Copy</button></div>'}).join('')+'</div><button type="button" class="btn pl-all" data-h="'+cols.join(', ')+'">'+t('copyAll')+'</button>'}
 function fromColor(h){var s=rgb2hsl(hex2rgb(h));show([hsl2hex(s[0],s[1]*.9,.12),hsl2hex(s[0],s[1],s[2]),hsl2hex(s[0]+30,s[1]*.85,Math.min(.75,s[2]+.15)),hsl2hex(s[0]+180,Math.max(.45,s[1]),.55),hsl2hex(s[0]+15,s[1]*.25,.95)],t('fromColor')+h.toUpperCase()+t('paletteParts'))}
 inp.addEventListener('input',function(){fromColor(inp.value)});fromColor(inp.value);
 file.addEventListener('change',function(){var f=file.files[0];if(!f)return;var img=new Image();img.onload=function(){var c=d.createElement('canvas'),S=64;c.width=c.height=S;var x=c.getContext('2d');x.drawImage(img,0,0,S,S);var px=x.getImageData(0,0,S,S).data,b={};
  for(var i=0;i<px.length;i+=4){if(px[i+3]<128)continue;var k=(px[i]>>5)+','+(px[i+1]>>5)+','+(px[i+2]>>5);(b[k]=b[k]||[0,0,0,0]);b[k][0]+=px[i];b[k][1]+=px[i+1];b[k][2]+=px[i+2];b[k][3]++}
  var arr=Object.keys(b).map(function(k){var v=b[k];return{c:[v[0]/v[3],v[1]/v[3],v[2]/v[3]],n:v[3]}}).sort(function(a,z){return z.n-a.n}),pick=[];
  arr.forEach(function(a){if(pick.length<5&&pick.every(function(p){return Math.hypot(p[0]-a.c[0],p[1]-a.c[1],p[2]-a.c[2])>48}))pick.push(a.c)});
  while(pick.length<5&&arr[pick.length])pick.push(arr[pick.length].c);
  pick.sort(function(a,z){return lum(a)-lum(z)});show(pick.map(rgb2hex),t('extracted'));URL.revokeObjectURL(img.src)};img.src=URL.createObjectURL(f)});
 out.addEventListener('click',function(e){var b=e.target.closest('button[data-h]');if(b)copy(b.getAttribute('data-h'),b)})}

/* ---------- 4. Glyph Mate (guided + curated pairs) ----------
 * Finding: Google Fonts has NO official pairing API/tool — only the Developer API
 * (family metadata) and Knowledge articles on pairing. We use a curated list. */
var PAIRS=[
 /* use: deck|report|brand|social|web · tone: bold|elegant|friendly|tech|editorial · head: display|serif|sans|slab */
 {h:'Anton',b:'Inter',use:['deck','social'],tone:['bold'],head:['display','sans'],note:'Condensed poster headline + neutral sans: maximum impact, zero noise. (This site\u2019s pair.)'},
 {h:'Playfair Display',b:'Source Sans 3',use:['report','brand','web'],tone:['elegant','editorial'],head:['serif'],note:'High-contrast serif for elegance, a calm sans that stays readable at small sizes.'},
 {h:'DM Serif Display',b:'DM Sans',use:['brand','web','report'],tone:['elegant','friendly'],head:['serif'],note:'Same family DNA, so proportions match; the serif adds voice, the sans does the work.'},
 {h:'Space Grotesk',b:'IBM Plex Serif',use:['report','web','deck'],tone:['tech','editorial'],head:['sans'],note:'Techy grotesk headline, bookish serif body: modern but credible, great for reports.'},
 {h:'Archivo Black',b:'Archivo',use:['deck','social','brand'],tone:['bold'],head:['display','sans'],note:'One superfamily, two personalities: heavy for statements, regular for everything else.'},
 {h:'Fraunces',b:'Work Sans',use:['brand','web','report'],tone:['friendly','editorial'],head:['serif'],note:'A soft, quirky serif gives warmth; a clean geometric sans keeps it professional.'},
 {h:'Oswald',b:'Open Sans',use:['deck','social'],tone:['bold'],head:['sans','display'],note:'Narrow headlines free horizontal space; Open Sans keeps body copy friendly.'},
 {h:'Bebas Neue',b:'Roboto',use:['deck','social'],tone:['bold','tech'],head:['display'],note:'All-caps display energy with a workhorse sans underneath.'},
 {h:'Libre Baskerville',b:'Nunito Sans',use:['report','web'],tone:['editorial','friendly'],head:['serif'],note:'Classic book serif meets a rounded sans — approachable editorial.'},
 {h:'Cormorant Garamond',b:'Montserrat',use:['brand','report'],tone:['elegant'],head:['serif'],note:'Refined old-style serif with a geometric sans for modern brand systems.'},
 {h:'Fjalla One',b:'Lato',use:['deck','social'],tone:['bold','friendly'],head:['sans','display'],note:'Strong condensed sans headline; Lato softens the body.'},
 {h:'Spectral',b:'Karla',use:['report','web'],tone:['editorial'],head:['serif'],note:'News-inspired serif with a clean grotesque body.'},
 {h:'Abril Fatface',b:'Lora',use:['brand','report'],tone:['elegant','editorial'],head:['display','serif'],note:'High-contrast display serif for covers; Lora carries long text.'},
 {h:'Raleway',b:'Merriweather',use:['web','report'],tone:['elegant','editorial'],head:['sans'],note:'Elegant geometric sans over a readable serif — good for long-form sites.'},
 {h:'Poppins',b:'Source Serif 4',use:['web','brand'],tone:['friendly','tech'],head:['sans'],note:'Geometric sans for UI/headlines; Source Serif for credible body.'},
 {h:'Barlow Condensed',b:'Barlow',use:['deck','social'],tone:['bold','tech'],head:['sans','display'],note:'Condensed + regular from one family — tight decks, consistent UI.'},
 {h:'Josefin Sans',b:'EB Garamond',use:['brand','web'],tone:['elegant'],head:['sans'],note:'Fashion-adjacent sans with a classic Garamond body.'},
 {h:'Mukta',b:'Crimson Text',use:['report','web'],tone:['editorial','friendly'],head:['sans'],note:'Humanist sans headlines with a bookish Crimson body.'},
 {h:'Sora',b:'Inter',use:['web','deck'],tone:['tech'],head:['sans'],note:'Modern geometric for product decks; Inter for everything else.'},
 {h:'Syne',b:'Manrope',use:['brand','web','social'],tone:['bold','tech'],head:['display','sans'],note:'Slightly odd display sans that feels designed; Manrope grounds it.'},
 {h:'Outfit',b:'Figtree',use:['web','brand'],tone:['friendly','tech'],head:['sans'],note:'Soft geometric pair for startups and product sites.'},
 {h:'Bricolage Grotesque',b:'Geist',use:['web','deck'],tone:['tech','bold'],head:['sans'],note:'Contemporary grotesque energy (Geist falls back to Inter if needed).'},
 {h:'Instrument Serif',b:'Instrument Sans',use:['brand','web'],tone:['elegant','tech'],head:['serif'],note:'Matched serif/sans from the Instrument family — cohesive brand voice.'},
 {h:'Newsreader',b:'Public Sans',use:['report','web'],tone:['editorial'],head:['serif'],note:'Editorial serif with a civic sans — reports and news products.'},
 {h:'Literata',b:'Source Sans 3',use:['report','web'],tone:['editorial','friendly'],head:['serif'],note:'E-book serif tuned for screens; Source Sans for UI chrome.'},
 {h:'Zilla Slab',b:'Fira Sans',use:['deck','web'],tone:['tech','friendly'],head:['slab'],note:'Mozilla-born slab + humanist sans — tech with personality.'},
 {h:'Roboto Slab',b:'Roboto',use:['deck','report'],tone:['tech'],head:['slab'],note:'Slab headlines, neo-grotesk body — Material-friendly.'},
 {h:'Arvo',b:'Lato',use:['web','report'],tone:['friendly','editorial'],head:['slab'],note:'Geometric slab for section titles; Lato for reading.'},
 {h:'Crete Round',b:'Ubuntu',use:['web','social'],tone:['friendly'],head:['slab'],note:'Rounded slab warmth with Ubuntu\u2019s friendly UI sans.'},
 {h:'Passion One',b:'Roboto Condensed',use:['social','deck'],tone:['bold'],head:['display'],note:'Loud display for posters and social; condensed sans for captions.'},
 {h:'Alfa Slab One',b:'Helvetica Neue',use:['social','deck'],tone:['bold'],head:['slab','display'],note:'Heavy slab punch; pair with a neutral sans (fallback system UI).'},
 {h:'Ultra',b:'PT Sans',use:['social','brand'],tone:['bold','elegant'],head:['display','serif'],note:'Fat-face drama for campaigns; PT Sans for fine print.'},
 {h:'Yeseva One',b:'Josefin Sans',use:['brand','social'],tone:['elegant'],head:['display','serif'],note:'Decorative serif for wordmarks; Josefin for supporting type.'},
 {h:'Cinzel',b:'Fauna One',use:['brand','report'],tone:['elegant'],head:['serif','display'],note:'Trajan-like luxury for brands that want gravitas.'},
 {h:'Cardo',b:'Source Sans 3',use:['report','web'],tone:['editorial'],head:['serif'],note:'Scholarly serif for long reports; Source Sans for captions.'},
 {h:'Gentium Book Plus',b:'Noto Sans',use:['report','web'],tone:['editorial'],head:['serif'],note:'Multilingual-friendly editorial pair.'},
 {h:'IBM Plex Sans',b:'IBM Plex Serif',use:['deck','report','web'],tone:['tech','editorial'],head:['sans'],note:'Full Plex system — corporate decks and dense reports.'},
 {h:'IBM Plex Mono',b:'IBM Plex Sans',use:['web','deck'],tone:['tech'],head:['sans'],note:'Mono for data/code callouts; Sans for the rest.'},
 {h:'Space Mono',b:'Space Grotesk',use:['web','deck'],tone:['tech'],head:['sans'],note:'Sibling mono + grotesk for product and developer brands.'},
 {h:'JetBrains Mono',b:'Inter',use:['web','deck'],tone:['tech'],head:['sans'],note:'Code-native mono with Inter UI — docs and dashboards.'},
 {h:'Unbounded',b:'Onest',use:['brand','web'],tone:['bold','tech'],head:['display','sans'],note:'Contemporary display with a quiet grotesque body.'},
 {h:'Clash Display',b:'Satoshi',use:['brand','social'],tone:['bold','tech'],head:['display','sans'],note:'Modern brand pair (load via GF alternatives if needed: use Syne + Manrope fallback).'},
 {h:'Cabinet Grotesk',b:'General Sans',use:['brand','web'],tone:['tech','friendly'],head:['sans'],note:'Studio-style grotesks for product brands.'},
 {h:'Epilogue',b:'Inter',use:['web','deck'],tone:['tech','friendly'],head:['sans'],note:'Slightly quirky sans headlines; Inter body.'},
 {h:'Red Hat Display',b:'Red Hat Text',use:['web','deck'],tone:['tech'],head:['sans'],note:'Matched Red Hat pair — open-source product feel.'},
 {h:'Exo 2',b:'Roboto',use:['deck','social'],tone:['tech','bold'],head:['sans','display'],note:'Futurist display energy with Roboto reliability.'},
 {h:'Teko',b:'Hind',use:['deck','social'],tone:['bold'],head:['display','sans'],note:'Condensed athletic headlines; Hind for multilingual UI.'},
 {h:'Kanit',b:'Noto Sans',use:['web','social'],tone:['friendly','bold'],head:['sans'],note:'Thai-capable contemporary sans pair.'},
 {h:'Saira Condensed',b:'Saira',use:['deck','social'],tone:['bold','tech'],head:['sans','display'],note:'Condensed family for data-heavy slides.'},
 {h:'Chivo',b:'Source Serif 4',use:['report','web'],tone:['editorial','tech'],head:['sans'],note:'Grotesk headlines, literary body — magazines and annuals.'},
 {h:'Work Sans',b:'Libre Franklin',use:['web','brand'],tone:['friendly'],head:['sans'],note:'Two humanists that stay out of each other\u2019s way.'},
 {h:'Manrope',b:'Source Serif 4',use:['web','report'],tone:['tech','editorial'],head:['sans'],note:'Geometric product sans with a serious serif body.'},
 {h:'Figtree',b:'Literata',use:['web','report'],tone:['friendly','editorial'],head:['sans'],note:'Soft UI sans + screen-tuned serif.'},
 {h:'Lexend',b:'Atkinson Hyperlegible',use:['web','deck'],tone:['friendly'],head:['sans'],note:'Accessibility-first pair for inclusive decks and sites.'},
 {h:'Atkinson Hyperlegible',b:'Source Sans 3',use:['web','report'],tone:['friendly','editorial'],head:['sans'],note:'Maximum legibility for public-sector and health content.'},
 {h:'Bitter',b:'Raleway',use:['web','report'],tone:['editorial','friendly'],head:['slab'],note:'Readable slab for blogs; Raleway for navigation.'},
 {h:'Domine',b:'Open Sans',use:['report','web'],tone:['editorial'],head:['serif'],note:'Robust serif headlines with a ubiquitous body sans.'},
 {h:'Vollkorn',b:'Lato',use:['report','brand'],tone:['editorial','friendly'],head:['serif'],note:'Warm old-style serif; Lato keeps apps approachable.'},
 {h:'Crimson Pro',b:'Nunito',use:['web','report'],tone:['friendly','editorial'],head:['serif'],note:'Bookish Crimson with rounded Nunito for softer brands.'},
 {h:'Bodoni Moda',b:'Jost',use:['brand','social'],tone:['elegant'],head:['serif','display'],note:'Fashion Bodoni contrast with a geometric sans.'},
 {h:'Big Shoulders Display',b:'Inter',use:['social','deck'],tone:['bold'],head:['display'],note:'Condensed poster display for campaigns and city brands.'},
 {h:'Anybody',b:'Inter',use:['brand','web'],tone:['bold','tech'],head:['display','sans'],note:'Variable display personality with Inter UI.'},
 {h:'Schibsted Grotesk',b:'Newsreader',use:['report','web'],tone:['editorial','tech'],head:['sans'],note:'Newsroom grotesque + news serif.'},
 {h:'Geist',b:'Georgia',use:['web','deck'],tone:['tech','editorial'],head:['sans'],note:'Vercel-ish sans with classic Georgia body (system fallback).'},
 {h:'Plus Jakarta Sans',b:'Lora',use:['web','brand'],tone:['friendly','elegant'],head:['sans'],note:'Startup sans with a soft serif for storytelling pages.'},
 {h:'Urbanist',b:'Merriweather',use:['web','report'],tone:['tech','editorial'],head:['sans'],note:'Geometric urban sans; Merriweather for articles.'},
 {h:'Recursive',b:'Inter',use:['web','deck'],tone:['tech'],head:['sans'],note:'Casual-to-strict variable sans for product storytelling.'},
 {h:'Commissioner',b:'Source Serif 4',use:['report','brand'],tone:['editorial','elegant'],head:['sans'],note:'Editorial grotesque with a dependable serif.'},
 {h:'Gloock',b:'Manrope',use:['brand','social'],tone:['elegant','bold'],head:['display','serif'],note:'Contemporary display serif for brand moments.'},
 {h:'Young Serif',b:'Work Sans',use:['brand','web'],tone:['friendly','editorial'],head:['serif'],note:'Approachable serif for warm brands.'},
 {h:'Kalnia',b:'Inter',use:['brand','deck'],tone:['elegant','tech'],head:['serif','display'],note:'Variable serif with modern contrast for key slides.'}
];
/* Replace non-GF speculative names with GF-safe ones */
PAIRS.forEach(function(p){
  var map={Geist:'Inter','Helvetica Neue':'Open Sans','Clash Display':'Syne',Satoshi:'Manrope','Cabinet Grotesk':'Space Grotesk','General Sans':'Outfit'};
  if(map[p.h])p.h=map[p.h];if(map[p.b])p.b=map[p.b];
});

var loadedFonts={};
function loadPairFonts(list){
  var need=[];
  list.forEach(function(p){[p.h,p.b].forEach(function(f){if(!loadedFonts[f]){loadedFonts[f]=1;need.push(f)}})});
  if(!need.length)return;
  var fam=need.map(function(f){return'family='+encodeURIComponent(f).replace(/%20/g,'+')+':wght@400;700'}).join('&');
  var link=d.createElement('link');link.rel='stylesheet';link.href='https://fonts.googleapis.com/css2?'+fam+'&display=swap';d.head.appendChild(link);
}
function types(){var form=$('#tp-form'),out=$('#tp-out'),h=$('#tp-h'),p=$('#tp-p');if(!out)return;
 var page=0,PAGE=20,filtered=PAIRS.slice(),active=[];
 function score(pair){
  if(!active.length)return 0;
  var s=0;
  var use=$('#tp-use')&&$('#tp-use').value,tone=$('#tp-tone')&&$('#tp-tone').value,head=$('#tp-head')&&$('#tp-head').value;
  if(use&&use!=='any'&&pair.use.indexOf(use)>-1)s+=3;
  if(tone&&tone!=='any'&&pair.tone.indexOf(tone)>-1)s+=3;
  if(head&&head!=='any'&&pair.head.indexOf(head)>-1)s+=2;
  return s;
 }
 function sortPairs(list){return list.slice().sort(function(a,b){return score(b)-score(a)||PAIRS.indexOf(a)-PAIRS.indexOf(b)})}
 function card(pair,i,rec){
  return '<div class="tp'+(rec?' tp-rec':'')+'">'+(rec?'<span class="tp-badge mono">'+t('recommended')+'</span>':'')+
   '<p class="mono t-tag">'+esc(pair.h)+' + '+esc(pair.b)+'</p>'+
   '<h4 style="font-family:\''+esc(pair.h)+'\',serif"></h4>'+
   '<p class="tp-b" style="font-family:\''+esc(pair.b)+'\',sans-serif"></p>'+
   '<p class="t-note">'+esc(pair.note)+'</p></div>';
 }
 function paint(){
  var slice=filtered.slice(page*PAGE,(page+1)*PAGE);
  loadPairFonts(slice);
  var html=slice.map(function(pair,i){return card(pair,i,page===0&&i<3&&(active.length||true))}).join('');
  var more=filtered.length>(page+1)*PAGE;
  out.innerHTML='<div class="tp-g">'+html+'</div>'+
   '<div class="tp-pager mono"><span>'+Math.min(filtered.length,(page+1)*PAGE)+' / '+filtered.length+' '+t('pairs')+'</span>'+
   (page>0?'<button type="button" class="btn" id="tp-prev">Previous</button>':'')+
   (more?'<button type="button" class="btn" id="tp-next">Next</button>':'')+'</div>';
  fillText();
  var nx=$('#tp-next'),pv=$('#tp-prev');
  if(nx)nx.onclick=function(){page++;paint()};
  if(pv)pv.onclick=function(){page--;paint()};
 }
 function fillText(){
  var hv=(h&&h.value)||'Your headline here',bv=(p&&p.value)||'Your body text here.';
  $$('.tp h4',out).forEach(function(e){e.textContent=hv});
  $$('.tp .tp-b',out).forEach(function(e){e.textContent=bv});
 }
 function generate(){
  active=['x'];
  filtered=sortPairs(PAIRS).filter(function(pair){
   var use=$('#tp-use')&&$('#tp-use').value,tone=$('#tp-tone')&&$('#tp-tone').value,head=$('#tp-head')&&$('#tp-head').value;
   if(use&&use!=='any'&&pair.use.indexOf(use)<0)return false;
   if(tone&&tone!=='any'&&pair.tone.indexOf(tone)<0)return false;
   if(head&&head!=='any'&&pair.head.indexOf(head)<0)return false;
   return true;
  });
  if(!filtered.length)filtered=sortPairs(PAIRS);
  else filtered=sortPairs(filtered);
  page=0;paint();
 }
 /* defaults shown before choosing */
 filtered=PAIRS.slice();active=[];paint();
 if(h)h.addEventListener('input',fillText);if(p)p.addEventListener('input',fillText);
 if(form)form.addEventListener('submit',function(e){e.preventDefault();generate()});
 var btn=$('#tp-go');if(btn)btn.addEventListener('click',function(e){e.preventDefault();generate()});
}

/* ---------- 5. Lumen Judge (5 reviewable options) ---------- */
function nearestPass(fg,bg,target){
  var base=hex2rgb(fg),hsl=rgb2hsl(base),best=null,bestD=1e9;
  for(var l=0;l<=100;l++){
   var cand=hsl2hex(hsl[0],hsl[1],l/100),r=ratio(cand,bg);
   if(r>=target){var d=Math.abs(l/100-hsl[2]);if(d<bestD){bestD=d;best={hex:cand,ratio:r}}}
  }
  /* also try desaturating */
  for(var s=0;s<=100;s+=5)for(var l2=0;l2<=100;l2+=2){
   var cand2=hsl2hex(hsl[0],s/100,l2/100),r2=ratio(cand2,bg);
   if(r2>=target){var d2=Math.abs(l2/100-hsl[2])*2+Math.abs(s/100-hsl[1]);if(d2<bestD){bestD=d2;best={hex:cand2,ratio:r2}}}
  }
  return best;
}
function simFilter(kind){
  if(kind==='projector')return 'contrast(.85) brightness(1.25) saturate(.7)';
  if(kind==='sun')return 'contrast(1.35) brightness(1.45) saturate(.55)';
  if(kind==='protanopia')return 'url(#cc-prot)';
  if(kind==='deuteranopia')return 'url(#cc-deut)';
  if(kind==='tritanopia')return 'url(#cc-trit)';
  return 'none';
}
function contrast(){var a=$('#cc-a'),b=$('#cc-b'),out=$('#cc-out');if(!a)return;
 if(!$('#cc-svg-filters')){
  var svg=d.createElementNS('http://www.w3.org/2000/svg','svg');svg.id='cc-svg-filters';svg.setAttribute('aria-hidden','true');
  svg.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
  svg.innerHTML='<defs>'+
   '<filter id="cc-prot"><feColorMatrix values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"/></filter>'+
   '<filter id="cc-deut"><feColorMatrix values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"/></filter>'+
   '<filter id="cc-trit"><feColorMatrix values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"/></filter>'+
   '</defs>';d.body.appendChild(svg);
 }
 var opts={1:true,2:true,3:true,4:true,5:true};
 function r(){
  var x=ratio(a.value,b.value);
  var light=x>=7?'go':x>=4.5?'go':x>=3?'warn':'stop';
  var plain=x>=7?t('plainAAA'):x>=4.5?t('plainAA'):x>=3?t('plainLarge'):t('plainFail');
  var jokes=x>=7?['Chef\u2019s kiss. Readable from space.','AAA: even your grandma\u2019s reading glasses approve.']:x>=4.5?['Solid AA. Your accessibility audit can relax.','Good to go for body text. Ship it.']:x>=3?['Fine for big headlines, risky for body text.','Large text only. Small text will squint back at you.']:['This is a whisper, not a design.','Fail. Even the designer can\u2019t read it, and they picked it.'];
  var qq=jokes[Math.floor(x*10)%jokes.length];
  var row=function(l,t){return'<tr><td>'+l+'</td><td class="'+(x>=t?'ok':'ko')+'">'+(x>=t?t('pass'):t('fail'))+'</td></tr>'};
  var suggest=nearestPass(a.value,b.value,4.5);
  var pct=clamp((x-1)/20*100,0,100);
  var html='<div class="cc-opts mono" role="tablist">'+
   [1,2,3,4,5].map(function(n){return'<button type="button" class="cc-tab'+(opts[n]?' on':'')+'" data-opt="'+n+'" aria-pressed="'+(opts[n]?'true':'false')+'">'+n+'</button>'}).join('')+
   '<span class="t-note">Toggle options to compare. '+t('recommended')+': 1 + 2 + 3.</span></div>';
  if(opts[1])html+=
   '<div class="cc-block cc-o1"><div class="cc-light '+light+'"><b>'+(light==='go'?t('green'):light==='warn'?t('yellow'):t('red'))+'</b><span>'+esc(plain)+'</span></div>'+
   '<p class="sc-big">'+x.toFixed(2)+':1</p><p class="cc-q">'+qq+'</p>'+
   '<details class="cc-wcag"><summary class="mono">'+t('wcagTable')+'</summary><table class="cc-t mono"><tbody>'+
   row(t('aaN'),4.5)+row(t('aaL'),3)+row(t('aaaN'),7)+row(t('aaaL'),4.5)+
   '</tbody></table></details></div>';
  if(opts[2])html+=
   '<div class="cc-block cc-o2"><p class="mono t-tag">'+t('miniSlide')+'</p>'+
   '<div class="cc-slide" style="background:'+b.value+';color:'+a.value+'"><h3>'+t('slideH')+'</h3><p>'+t('slideP')+'</p>'+
   '<span class="cc-btn" style="border-color:'+a.value+';color:'+a.value+'">'+t('nextStep')+'</span></div></div>';
  if(opts[3]){
   html+='<div class="cc-block cc-o3"><p class="mono t-tag">'+t('nearest')+'</p>';
   if(x>=4.5)html+='<p class="t-note">'+t('alreadyPass')+'</p>';
   else if(suggest)html+='<div class="cc-suggest"><span class="dd-sw" style="background:'+suggest.hex+'"></span><code class="mono">'+suggest.hex.toUpperCase()+'</code> · '+suggest.ratio.toFixed(2)+':1 '+
    '<button type="button" class="btn" id="cc-use" data-h="'+suggest.hex+'">'+t('useColor')+'</button></div>';
   else html+='<p class="t-note">'+t('noNearby')+'</p>';
   html+='</div>';
  }
  if(opts[4])html+=
   '<div class="cc-block cc-o4"><p class="mono t-tag">'+t('sims')+'</p><div class="cc-sims">'+
   [['none',t('normal')],['projector',t('projector')],['sun',t('sun')],['protanopia','Protanopia'],['deuteranopia','Deuteranopia'],['tritanopia','Tritanopia']].map(function(s){
    return'<figure><div class="cc-sim" style="background:'+b.value+';color:'+a.value+';filter:'+simFilter(s[0])+'"><b>Aa</b><span>Sample</span></div><figcaption class="mono">'+s[1]+'</figcaption></figure>';
   }).join('')+'</div></div>';
  if(opts[5])html+=
   '<div class="cc-block cc-o5"><p class="mono t-tag">'+t('ratioScale')+'</p>'+
   '<div class="cc-bar" role="img" aria-label="Ratio '+x.toFixed(2)+' on a 1 to 21 scale"><i style="width:'+pct+'%"></i>'+
   '<span class="m" style="left:'+(2/20*100)+'%">3</span><span class="m" style="left:'+(3.5/20*100)+'%">4.5</span><span class="m" style="left:'+(6/20*100)+'%">7</span>'+
   '<span class="v" style="left:'+pct+'%">'+x.toFixed(2)+'</span></div>'+
   '<p class="t-note mono">'+t('marks')+'</p></div>';
  out.innerHTML=html;
  $$('.cc-tab',out).forEach(function(btn){btn.addEventListener('click',function(){var n=+btn.getAttribute('data-opt');opts[n]=!opts[n];if(!opts[1]&&!opts[2]&&!opts[3]&&!opts[4]&&!opts[5])opts[n]=true;r()})});
  var use=$('#cc-use',out);if(use)use.addEventListener('click',function(){a.value=use.getAttribute('data-h');r()});
 }
 a.addEventListener('input',r);b.addEventListener('input',r);$('#cc-sw').addEventListener('click',function(){var t=a.value;a.value=b.value;b.value=t;r()});r()}

/* open card from hash */
function openT(h,scroll){var el=h&&d.getElementById(h);if(!el||el.tagName!='DETAILS')return;$$('details.tc').forEach(function(x){if(x!==el)x.open=false});el.open=true;$$('.pk').forEach(function(c){c.classList.toggle('on',c.getAttribute('data-open')==h)});if(scroll!==false)setTimeout(function(){el.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})},60)}
function hash(){openT(location.hash.slice(1))}

$$('details.tc').forEach(function(x){x.addEventListener('toggle',function(){if(!x.open)$$('.pk').forEach(function(c){if(c.getAttribute('data-open')==x.id)c.classList.remove('on')})})});
if(window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches)$$('.pk').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--rx',(-y*7)+'deg');c.style.setProperty('--ry',(x*9)+'deg');c.style.setProperty('--gx',(x+.5)*100+'%');c.style.setProperty('--gy',(y+.5)*100+'%')});c.addEventListener('mouseleave',function(){c.style.removeProperty('--rx');c.style.removeProperty('--ry')})});
deck();scope();palette();types();contrast();hash();addEventListener('hashchange',hash);
})();
