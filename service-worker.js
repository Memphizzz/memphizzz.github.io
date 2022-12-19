importScripts("/precache-manifest.579e8ca5ce149fbfac7f327a5d4d89b6.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

console.log('Hello from sw.js');

if (workbox) {
  console.log('Yay! Workbox is loaded 🎉');
  workbox.precaching.precacheAndRoute(self.__precacheManifest);

  workbox.routing.registerNavigationRoute('/index.html');

  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    })
  );
} else {
  console.log('Boo! Workbox didn\'t load 😬');
}

self.addEventListener('message', event => {
  if (!event.data) {
    return;
  }

  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});

