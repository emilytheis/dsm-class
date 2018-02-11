var appCacheName = 'DSMapp-cache-v0.1';
var filesToCache = [
    '/',
    '/index.html',
    '/style.css',
    'js/app.js',
    'js/jquery-3.2.1.min.js',
    'js/jquery.transit.js',
    'tips/index.html',
    'about/index.html',

  ];

// Add selected files to cache
self.addEventListener( 'install', function( event ) {
  event.waitUntil(
    caches.open( appCacheName )
      .then( function( cache ) {
        return cache.addAll(filesToCache);
      }))
});

// Update cache content if it no longer matches key `appCacheName`
self.addEventListener('activate', function( e ) {
  e.waitUntil(
    caches.keys().then( function( keyList ) {
      return Promise.all( keyList.map( function( key ) {
        if ( key !== appCacheName ) {
          return caches.delete( key );
        }
      }));
    })
  );
  return self.clients.claim();
});

// Serve cached resource if available, get it if not
self.addEventListener( 'fetch', function( e ) {
  e.respondWith(
    caches.match( e.request ).then( function( response ) {
      return response || fetch(e.request);
    } )
  );
} );
