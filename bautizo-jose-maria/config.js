/* =========================================================
   CONFIGURACIÓN — lo único que hay que tocar para conectar
   (la usan index.html y admin.html). La clave del panel NO va aquí:
   vive en el Apps Script (Propiedades del script → ADMIN_KEY).
   ========================================================= */
window.CONFIG = {
  // Deja vacío ('') para modo vista previa (simulado, no envía nada).
  // Google Apps Script: pega la URL del "Web app" (termina en /exec).
  // Web3Forms: usa 'https://api.web3forms.com/submit' y llena WEB3FORMS_KEY.
  RSVP_ENDPOINT: '',
  RSVP_PROVIDER: 'apps-script',      // 'apps-script' | 'web3forms'
  WEB3FORMS_KEY: '',                 // access key de Web3Forms (si se usa)
  DESEOS_ENDPOINT: '',               // opcional: mismo esquema para los buenos deseos
  // Álbum de fotos: 'integrado' = fotos en tu Google Drive vía el Apps Script, con galería en vivo (por defecto)
  //                 'externo'   = botón + QR hacia otro servicio (EventPics, Google Fotos…) usando ALBUM_URL
  ALBUM_MODO: 'integrado',
  ALBUM_URL: '',
  FOTOS_POR_LOTE: 20,          // máximo de fotos por envío
  FOTOS_LADO_MAX: 1600,        // px del lado más largo después de comprimir
  FOTOS_CALIDAD: 0.8,          // calidad JPEG
  GALERIA_CADA_SEG: 15,        // cada cuánto se buscan fotos nuevas (solo con la pestaña visible)
  // Cartas cápsula: si se deja vacío, se usa RSVP_ENDPOINT (el mismo Apps Script)
  CARTAS_ENDPOINT: '',
  // A partir de esta fecha la portada y la sección de confirmación cambian a un mensaje de agradecimiento
  AGRADECIMIENTO_DESDE: '2026-11-29',
  // EDITABLE: texto de agradecimiento (EJEMPLO). {nombre} se cambia por la familia si abrieron su liga.
  TEXTO_AGRADECIMIENTO: 'Gracias de corazón por acompañarnos en el bautizo de José María. Tenerlos cerca en un día tan especial fue el mejor regalo. Si tomaron fotos, nos encantaría que las subieran al álbum, y si quieren dejarle unas palabras para cuando sea grande, la carta cápsula sigue abierta.',
  MOSTRAR_EJEMPLO_AGRADECIMIENTO: true, // cambiar a false cuando el texto ya sea el definitivo
  // Mesa: se muestra solo si la familia tiene mesa en guests.txt y a partir de esta fecha ('' = siempre)
  MOSTRAR_MESA_DESDE: '2026-11-27',
  // Cierre de confirmaciones: desde este día (00:00 h CDMX) ya no se muestra el formulario.
  // '2026-11-21' = se puede confirmar hasta el final del viernes 20 de noviembre.
  CIERRE_CONFIRMACION: '2026-11-21',
  // Dirección pública del sitio (para las ligas de WhatsApp del panel)
  SITIO_URL: 'https://memopelayo.github.io/bautizo-jose-maria/',
  // Fecha del evento (America/Mexico_City es UTC-6 todo el año desde 2022)
  INICIO: '2026-11-28T12:00:00-06:00',
};

