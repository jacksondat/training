(function() {
  angular.module('pokedex.services',[])
    .factory('pokedexService',
      ['$http', '$q', '$filter', '$window',
        function($http, $q, $filter, $window) {
          var normalize = $filter('normalize');
          var localStorage = $window.localStorage;

          function all() {
            var deferred = $q.defer();

            $http
            .get('/pokemons.json')
            .success(function(data) {
              deferred.resolve(data);
            });

            return deferred.promise;
          }

          function byName(name) {
            var deferred = $q.defer();
            name = normalize(name);

            all().then(function(data) {
              var pokemons = data.filter(function(pokemon) {
                return name === normalize(pokemon.name);
              });

              if (pokemons.length > 0) {
                deferred.resolve(pokemons[0]);
              }else {
                deferred.reject();
              }
            });

            return deferred.promise;
          }

          function byType(type) {
            var deferred = $q.defer();
            type = normalize(type);

            all().then(function(data) {
              var pokemons = data.filter(function(pokemon) {
                return pokemon.type.some(function(t) {
                  return normalize(t) === type;
                });
              });

              deferred.resolve(pokemons);
            });

            return deferred.promise;
          }

          function saveComment(pokemon, comment) {
            comments = getComments(pokemon);

            comments.push(comment);

            localStorage.setItem(pokemon, JSON.stringify(comments));
          }

          function getComments(pokemon) {
            var comments = localStorage.getItem(pokemon);

            if (!comments) {
              comments = [];
            }else {
              comments = JSON.parse(comments);
            }

            return comments;
          }

          return {
            all: all,
            byName: byName,
            byType: byType,
            saveComment: saveComment,
            getComments: getComments
          };

        }
      ]
    );
})();
