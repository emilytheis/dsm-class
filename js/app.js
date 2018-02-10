$(document).ready(function($) {
  DSMclass.init();
});

var DSMclass = {
  init: function() {
    this.tabletopData = '';

    this.addEventListeners();
    this.getCardData();
  },

  addEventListeners: function() {
    let scope = this;

    $('.js--next-suggestion').on('click', function(event) {
      event.preventDefault();

      $('.animate-content').transition({
        opacity: 0
      }, 500, 'easeOutExpo', 
      function() {
        scope.randomizeData( scope.tabletopData );
        $('.animate-content').transition({ opacity: 1 });
      });

    });
  },

  getCardData: function() {
    let scope = this;

    Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1gqO8_7kPpg9uB2fR45ObdZ82yfFI9HqKHJhH9ZqeMwk/edit?usp=sharing',
      callback: function(data, tabletop) {
        scope.tabletopData = data;
        scope.randomizeData( scope.tabletopData );
        console.log(scope.tabletopData);

        if($('.beating-hearts-baby').length) {
          $('body').removeClass('beating-hearts-baby');
        }
      },
      simpleSheet: true
    } );
  },

  randomizeData: function ( data ) {
    var dbRow = Math.random() * (data.length - 1) + 1;

    dbRow = Math.round(dbRow);
    var momentData = data[dbRow];
    var elements = ['name', 'pride', 'shame', 'song', 'location', 'age'];

    // Grab the content and put 'er in
    elements.forEach( function (el, index, elements) {
      htmlElement = document.getElementById(el);
      if ( htmlElement ) {
        htmlElement.textContent = momentData[el];
      }
    });
  }
}
