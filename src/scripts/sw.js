/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-restricted-globals */
import CacheHelper from './utils/cache-helper.js';

const { assets } = global.serviceWorkerOption;


// EVENT INSTALL HANDLER
self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log(assets);
  event.waitUntil(CacheHelper.precaching(new Set(['/', '/index.html', ...assets])));
});


// EVENT ACTIVATE HANDLER
self.addEventListener('activate', (event) => {
  self.clients.claim();
  event.waitUntil(CacheHelper.deleteOldCache());
});


// EVENT FETCH HANDLER
self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});