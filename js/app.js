$(document).ready(function($) {
  DSMclass.init();
});

var DSMclass = {
  tabletopData: [],

  init: function() {
    var scope = this;
    this.tabletopData = JSON.parse( localStorage.getItem( this.dataCacheName ) );
    //this.initServiceWorker();
    this.addEventListeners();

    // Get data and cache it if necessary
    if ( this.tabletopData ) {
      scope.displayData( this.tabletopData );

    } else {
      this.getData().then( function( data ) {
        if ( 'localStorage' in window ) {
          scope.cacheData( data );
        }

        scope.displayData( data );
        scope.tabletopData = data;
      } );
    }
  },

  addEventListeners: function() {
    var scope = this;

    $('.js--next-suggestion').on('click', function(event) {
      event.preventDefault();

      $('.animate-content').transition({
        opacity: 0
      }, 500, 'easeOutExpo', 
      function() {
        scope.displayData( scope.tabletopData );
        $('.animate-content').transition({ opacity: 1 });
      });

    });
  },

  getData: function() {
    var scope = this;

    return new Promise( function( resolve, reject ) {
      Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1gqO8_7kPpg9uB2fR45ObdZ82yfFI9HqKHJhH9ZqeMwk/edit?usp=sharing',
        callback: function( data ) { resolve( data ) },
        callbackContext: scope,
        simpleSheet: true
      } );
    } );
  },

  cacheData: function( data ) {
    var scope = this;
    var dataToCache = JSON.stringify( data );
    var cachedData = localStorage.getItem( this.dataCacheName );

    // Only clear and create new cache if today's data hasn't been cached yet
    if ( !cachedData ) {
      localStorage.clear();
      localStorage.setItem( this.dataCacheName,  dataToCache);
    }

    return;
  },

  dataCacheName: function() {
    var today = new Date();
    var name = 'DSMclass' + today.getMonth() + today.getDate();

    return name;
  },

  displayData: function( data ) {
    var elements = ['name', 'pride', 'shame', 'song', 'location', 'age'];
    var dbRow = Math.random() * ( data.length - 1 ) + 1;
    dbRow = Math.round(dbRow);
    var momentData = data[dbRow];

    // Grab the content and put 'er in
    elements.forEach( function (el, index, elements) {
      htmlElement = document.getElementById(el);
      if ( htmlElement &&  momentData[el] ) {
        htmlElement.textContent = momentData[el];
      }
    });

    if($('.beating-hearts-baby').length) {
      $('body').removeClass('beating-hearts-baby');
    }
  },

  initServiceWorker: function() { 
     if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('../service-worker.js')
               .then(function() { console.log('Service Worker Registered'); });
    }
  }
}
