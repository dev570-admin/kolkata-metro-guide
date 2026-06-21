const CACHE_NAME = 'kolkata-metro-v2';

// Install and Skip Waiting
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

// Activate and Clear Old Caches
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Dynamic Fetch Strategy (Network first, fallback to cache)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .then((response) => {
                // Clone and save to cache dynamically
                if (response && response.status === 200) {
                    const resClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(e.request, resClone);
                    });
                }
                return response;
            })
            .catch(() => caches.match(e.request))
    );
});