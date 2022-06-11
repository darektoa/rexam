import 'regenerator-runtime';
import CONFIG from '../globals/config';

const CacheHelper = {
  async precaching(requests) {
    const cache = await this._openCache();
    return cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((cacheName) => cacheName !== CONFIG.CACHE_NAME)
      .map((filteredCache) => caches.delete(filteredCache));
  },

  async revalidateCache(request) {
    const online = navigator.onLine;
    const cacheResponse = await caches.match(request);

    if (online) {
      const fetchResponse = this._fetchRequest(request);
      return cacheResponse || fetchResponse;
    }

    return cacheResponse;
  },

  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(request) {
    let response;

    try {
      response = await fetch(request);
      await this._putCache(request, response.clone());
      return response;
    } catch (err) {
      return response;
    }
  },

  async _putCache(request, response) {
    const cache = await this._openCache();
    return cache.put(request, response);
  },
};

export default CacheHelper;