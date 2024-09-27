// service-worker.js
const CACHE_NAME = 'TripleCrypt-cache-v2';
const urlsToCache = [
  '/TripleCrypt/'
  ,'/TripleCrypt/index.html'
  ,'/TripleCrypt/styles.css'
  ,'/TripleCrypt/app.js'
  ,'/TripleCrypt/manifest.json'
  //,'/TripleCrypt/TripleCrypt-x24.png'
  ,'/TripleCrypt/TC-600dpi-44px.png'
  ,'/TripleCrypt/TC-600dpi-512px.png'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache).catch(error => {
        console.error('Failed to cache:', error);
      });
    })
  );
});

// Activate service worker and remove old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  console.log('Service Worker Activated');
});

// Fetch event handler with fallback for offline use
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
