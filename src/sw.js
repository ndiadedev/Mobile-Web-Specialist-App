/*
*Import worbox librery version 3.0.0 from googleapis
*
*/

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded `);

  workbox.precaching.precacheAndRoute([]);

} else {
  console.log(`Boo! Workbox didn't load `);
}

/*
Add routes to the service worker
*/
workbox.routing.registerRoute(
  /(.*)articles(.*)\.(?:png|gif|jpg|jpeg)/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);

/* 
Use a customized networkFirst cache strategy
*/
const articleHandler = workbox.strategies.networkFirst({
  cacheName: 'articles-cache',
  plugins: [
    new workbox.expiration.Plugin({
      maxEntries: 50,
    })
  ]
});
//Handle invalid responses
workbox.routing.registerRoute(/(.*)article(.*)\.html/, args => {
  return articleHandler.handle(args).then(response => {
    if (!response) {
      return caches.match('pages/offline.html');
    } else if (response.status === 404) {
      return caches.match('pages/404.html');
    }
    return response;
  });
});