
const CACHE = "appbdbeltran";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
  "lib/document-register-element.js",
  "lib/min.js",
  "lib/polycustom.js",
  "lib/registraServiceWorker.js",
  "lib/util.js",
  "estilos.css",
  "favicon.ico",
  "icono.png",
  "index.html",
  "manifest.json",
  "mi-footer.js",
  "biblioteca.html",
  "libroNuevo.html",
  "__/firebase/7.2.0/firebase-app.js",
  "__/firebase/7.2.0/firebase-firestore.js",
  "__/firebase/init.js",
  '/'
];
 
self.addEventListener("install",
  /** @param {InstallEvent} evt */
  evt => {
    console.log("Service Worker instalado.");
    // Realiza la instalación: carga los archivos requeridos en la caché.
    evt.waitUntil(cargaCache());
  });
// Toma de la caché archivos solicitados. Los otros son descargados.
self.addEventListener("fetch",
  /** @param {FetchEvent} evt */
  evt => {
    if (evt.request.method === "GET") {
      evt.respondWith(usaCache(evt));
    }
  });
self.addEventListener("activate", () => console.log("Service Worker activo."));
 
async function cargaCache() {
  console.log("Intentando cargar cache: " + CACHE);
  const cache = await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado: " + CACHE);
}
async function usaCache(evt) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(evt.request, { ignoreSearch: true });
  if (response) {
    actualizaResponse(cache, evt.request);
    return response;
  } else {
    return fetch(evt.request);
  }
}
async function actualizaResponse(cache, request) {
  const response = await fetch(request);
  cache.put(request, response.clone());
}
