const CACHE_NAME = 'lista-compras-v1';
const FILES_TO_CACHE = [
  '/shopping-list.pwa/',
  '/shopping-list.pwa/index.html',
  '/shopping-list.pwa/manifest.json',
  '/shopping-list.pwa/icon-192.png',
  '/shopping-list.pwa/icon-512.png'
];

// Instalação — guarda os arquivos em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Ativação — limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — responde com cache se offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
