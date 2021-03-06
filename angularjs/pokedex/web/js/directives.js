(function() {
  angular.module('pokedex.directives',[])
    .directive('pokemonName', function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-name.html'
      };
    })
    .directive('pokemonImage', function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-image.html'
      };
    })
    .directive('pokemonData', function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-data.html'
      };
    })
    .directive('pokemonStats', function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-stats.html'
      };
    })
    .directive('pokemonEvolution', function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-evolution.html'
      };
    })
    .directive('pokemonType', function() {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-type.html'
      };
    })
    .directive('pokemonComments', ['pokedexService', function(pokedexService) {
      return {
        restrict: 'E',
        templateUrl: 'partials/pokemon-comments.html',
        scope: {
          name: '@name'
        },
        link: function(scope, element, attributes) {
          attributes.$observe('name', function(value) {
            if (value) {
              scope.name = value;
              scope.comments = pokedexService.getComments(value);
            }
          });
        },
        controller: function($scope) {
          console.log($scope.name);
          $scope.comments = pokedexService.getComments($scope.name);
          $scope.comment = {};
          $scope.show = false;

          $scope.toggle = function() {
            $scope.show = !this.show;
          };

          $scope.anonymousChanged = function() {
            if ($scope.comment.anonymous) {
              $scope.comment.email = '';
            }
          };

          $scope.addComment = function() {
            $scope.comment.date = Date.now();
            pokedexService.saveComment($scope.name,$scope.comment);
            $scope.comments.push(this.comment);
            $scope.comment = {};
          };
        }
      };
    }]);
})();
