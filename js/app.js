$(document).ready(function($) {
  DSMclass.init();
});

var DSMclass = {
  tabletopData: [],

  init: function() {
    var scope = this;
    //this.initServiceWorker();
    this.addEventListeners();
    this.getData().then( function( data ) { 
      scope.tabletopData = data;
      scope.displayData( data );
    } );
  },

  addEventListeners: function() {
    var scope = this;

    $('.js--next-suggestion').on('click', function(event) {
      event.preventDefault();

      $('.animate-content').transition({
        opacity: 0
      }, 500, 'easeOutExpo', 
      function() {
        scope.displayData();
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

  displayData: function( data ) {
    var data = data || this.tabletopData;
    var elements = ['name', 'pride', 'shame', 'song', 'location', 'age'];
    var dbRow = Math.random() * ( data.length - 1 ) + 1;
    dbRow = Math.round(dbRow);
    var momentData = data[dbRow];

    // Grab the content and put 'er in
    elements.forEach( function (el, index, elements) {
      htmlElement = document.getElementById(el);
      if ( htmlElement ) {
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
