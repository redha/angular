'use strict';

const CACHE_NAME = 'Cache-1907151400';


// files to cache here... icons,...
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/img/check-mark.svg",
  "/img/close.svg",
  "/img/upload.svg",
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
  
  //evt.request: does not conatain sockjs-node, nor hot-update
  if (evt.request.url.indexOf("sockjs-node") > 0 || evt.request.url.indexOf("hot-update") > 0){
    console.log(`****!! I'm not gonna cache ${evt.request.url}`);
    evt.respondWith(fetch(evt.request.url));
    console.log("$$$$$ $$$$$ returning....");
    return;
  }
  else{

    evt.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {                // Open the cache
        return cache.match(evt.request).then(function(response){    // get the requested resourcefrom the cache
          return response || fetch(evt.request).then(function(response){  // if empty
            cache.put(evt.request, response.clone());
            return response;
          });
        });
      }));

    }    

  });
