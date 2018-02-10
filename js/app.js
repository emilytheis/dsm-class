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
    $('.js--next-suggestion').on('click', function(event) {
      event.preventDefault();

      $('.animate-content').transition({
        opacity: 0
      }, 500, 'easeOutExpo', 
      function() {
        this.randomizeData( this.tabletopData );
        $('.animate-content').transition({ opacity: 1 });
      });
    });
  },

  getCardData: function() {
    let scope = this;
    
    Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1ZqCUv_Ps0lHS0_I8Onk_xcdP9ThUS2ALtmxre5o7h5Q/pub?output=csv',
      callback: function(data, tabletop) {
        scope.tabletopData = data;
        scope.randomizeData( scope.tabletopData );

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
    var suggestionData = data[dbRow];
    var elements = ['type', 'name', 'suggestion', 'comment'];

    // Grab the content and put 'er in
    elements.forEach( function (el, index, elements) {
      elements[index] = document.getElementById(el);
      elements[index].textContent = suggestionData[el];
    });
  }
}
