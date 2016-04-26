(function() {
  angular.module('pokedex.controllers',[])
    .controller('PokedexController',
      ['$scope', '$routeParams', 'pokedexService',
        function($scope, $routeParams, pokedexService) {
          $scope.pokemons = [];

          var pokemonType = $routeParams.type;
          if (pokemonType) {
            pokedexService.byType(pokemonType)
              .then(function(data) {
                $scope.pokemons = data;
              });
          }else {
            pokedexService.all().then(function(data) {
              $scope.pokemons = data;
            });
          }
        }
      ]
    )
    .controller('PokemonController',
      ['$scope', '$routeParams', 'pokedexService',
        function($scope, $routeParams, pokedexService) {
          var name = $routeParams.name;
          $scope.pokemon = {};

          pokedexService.byName(name)
            .then(function(data) {
              $scope.pokemon = data;
            })
            .catch(function() {
              $scope.pokemon = {};
            });
        }
      ]
    )
    .controller('TabsController', ['$scope', function($scope) {
      $scope.tab = 1;

      $scope.selectTab = function(tab) {
        $scope.tab = tab;
      };
    }]);
})();
