'use strict';

const CACHE_NAME = 'Cache-1907101002';

// files to cache here... icons,...
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "favicon.ico",
  "/icons/todo-icon-64x64.png",
  "/icons/todo-icon-128x128.png",
  "/icons/todo-icon-256x256.png",
  "/icons/todo-icon-512x512.png",
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      cache.addAll(FILES_TO_CACHE);
      console.log(`${FILES_TO_CACHE.length} files had been cached`);
      console.table(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // Todo: Remove all previously cached files.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      Promise.all(keyList.map((key) => {
        if(key !== CACHE_NAME){
          caches.delete(key);
        }
      }))
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url + '_-_-_-_-' + evt.request.mode);

  evt.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {                // Open the cache
      return cache.match(evt.request).then(function(response){    // get the requested resourcefrom the cache
        return response || fetch(evt.request).then(function(response){  // if empty
          cache.put(evt.request, response.clone());
          return response;
        });
      });
    }));
});
