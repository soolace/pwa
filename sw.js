//adds all these files to the cache
this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('pwacache').then(function (cache) {
            console.log("install successfull");
            return cache.addAll([
                    '/',
                    '/pwa/index.html',
                    '/pwa/css/style.css',
                    '/pwa/js/pwa.js',
                    '/pwa/js/jquery-3.3.1.min.js',
                    '/pwa/img/by-songkick-pink.png',
                    '/pwa/img/history.png',
                    '/pwa/img/powered-by-songkick-white.png',
                    '/pwa/img/sk-badge-pink.png',
                    '/pwa/img/bg.jpg',
                    '/pwa/favicon.ico',
                    '/pwa/manifest.json'
                ])
                .catch(function (err) {
                    console.log("this in an error ", err);
                })
        })
    );
});

//gets the files from the cache
this.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});


//push notification
this.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var action = e.action;
  
    if (action === 'close') {
      notification.close();
      console.log("push close");
    } else {
      clients.openWindow('https://www.songkick.com');
      console.log("go to website");
      notification.close();
    }
  });
  
