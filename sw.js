const CACHE_NAME = 'kolkata-metro-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/app.js',
    '/style.css', // আপনার সিএসএস ফাইলের নাম আলাদা হলে সেটা দিন
    '/logo.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Fetch Assets from Cache when Offline
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            return cachedResponse || fetch(e.request);
        })
    );
});