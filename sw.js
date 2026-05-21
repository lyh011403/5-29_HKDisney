const CACHE_NAME = 'hkdl-pwa-v12';
const urlsToCache = [
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// 安裝並立即啟用
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// 清除舊快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 網路優先 (Network First) 策略，防止開發過程中快取舊版網頁
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 成功取得網路資源，動態更新快取
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // 離線或網路失敗，回退至快取資源
        return caches.match(event.request);
      })
  );
});
