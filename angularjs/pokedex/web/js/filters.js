(function() {
  angular.module('pokedex.filters',[])
    .filter('normalize', function() {
      return function(input) {
        input = input
                  .replace('♀','f')
                  .replace('♂','m')
                  .replace(/\W+/g,'')
                  .toLowerCase();
        return input;
      };
    })
    .filter('imageify', ['$filter', function($filter) {
      return function(input, ext) {
        var url = 'img/pokemons/' +
          $filter('normalize')(input) + '.' + (ext || 'jpg');
        return url;
      };
    }]);
})();
