this.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('v2').then(function(cache){
            console.log("cached");
            return cache.addAll([
                '/index.html',
                '/css/style.css',
                '/js/pwa.js',
                '/img/by-songkick-pink.png',
                '/img/sk-badge-pink.png'
            ])
        })
        .catch(err => {
            console.log("err", err)
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          let responseClone = response.clone();
          
          caches.open('v2').then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        }).catch(function () {
          return caches.match('/img/sk-badge-pink.png');
        });
      }
    }));
  });
