this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v2').then(function (cache) {
            console.log("install successfull");
            return cache.addAll([
                    '/',
                    '/pwa/index.html',
                    '/pwa/css/style.css',
                    '/pwa/js/pwa.js',
                    '/pwa/js/jquery-3.3.1.min.js',
                    '/pwa/img/by-songkick-pink.png',
                    '/pwa/img/sk-badge-pink.png'
                ])
                .catch(function (err) {
                    console.log("this in an error ", err);
                })
        })
    );
});

this.addEventListener('fetch', function (event) {

    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
