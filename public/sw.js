'use strict';

const CACHE_NAME = 'static-cache-v001';

// files to cache here... icons,...
const FILES_TO_CACHE = [

];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log(`${FILES_TO_CACHE.length} files had been cached`);
      console.table(FILES_TO_CACHE);
      cache.addAll(FILES_TO_CACHE);
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

  if (evt.request.mode !== 'navigate'){
    return;
  }

  evt.respondWith(
    fetch(evt.request)
    .catch(() => {
      return caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.match('offline.html')
      })
    })
  );
});
