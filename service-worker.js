// service-worker.js
const CACHE_NAME = 'TripleCrypt-cache-v1';
const urlsToCache = [
  '/TripleCrypt/',
  '/TripleCrypt/index.html',
  '/TripleCrypt/styles.css',
  '/TripleCrypt/app.js',
  '/TripleCrypt/manifest.json',
  '/TripleCrypt/favicon_24.png',
  '/TripleCrypt/favicon_48.png',
  '/TripleCrypt/icon-192.png',
  '/TripleCrypt/icon-512.png'
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
