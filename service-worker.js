var files = [
  // 'assets/intro-car.jpg',
  // 'assets/logo.png',
  // 'assets/quem-somos.jpg',
  // 'manifest.json',
  // 'js/bundle.min.js',
  // 'js/main.min.js',
  // 'css/main.min.css',
  // 'assets/carros/classico-1.jpg',
  // 'assets/carros/classico-2.jpg',
  // 'assets/carros/classico-3.jpg',
  // 'assets/carros/classico-4.jpg',
  // 'assets/carros/classico-5.jpg',
  // 'assets/carros/classico-6.jpg',
  // 'assets/carros/classico-7.jpg',
  // 'assets/carros/lancha-1.jpg',
  // 'assets/carros/lancha-2.jpg',
  // 'assets/carros/lancha-3.jpg',
  // 'assets/carros/lancha-4.jpg',
  // 'assets/carros/moderno-1.jpg',
  // 'assets/carros/moderno-2.jpg',
  // 'assets/carros/moderno-3.jpg',
  // 'assets/carros/moderno-4.jpg',
  // 'assets/carros/moderno-5.jpg',
  ];
// dev only
if (typeof files == 'undefined') {
  var files = [];
} else {
  files.push('./');
}

var CACHE_NAME = 'igrejaetica-v1';

self.addEventListener('activate', function(event) {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME.indexOf(cacheName) == -1) {
            console.log('[SW] Delete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', function(event){
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(
        files.map(function(file){
            return cache.add(file);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('[SW] fetch ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);
  clients.openWindow('/');
});
