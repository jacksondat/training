describe('pokedexController', function() {
  var $controller;
  var $scope;
  var $q;
  var deferred;
  var service;
  var $filter;
  var $http;

  var allPokemons;

  beforeEach(function() {
    module('pokedex.controllers');
    module('pokedex.services');
    module('pokedex.filters');
  });

  beforeEach(
    inject(
      function(
        _$controller_,
        $rootScope,
        _$q_,
        $httpBackend,
        _$filter_,
        pokedexService) {

        $q = _$q_;
        $scope = $rootScope.$new();

        // We use the $q service to create a mock instance of defer
        deferred = _$q_.defer();

        $filter = _$filter_;

        service = pokedexService;
        $http = $httpBackend;

        allPokemons = readJSON('web/pokemons.json');

        $controller = _$controller_;
      }
    )
  );

  it('call All pokemons Service when no parameters was passed to controller',
    function() {
      $http.expectGET('/pokemons.json').respond(200,allPokemons);

      controllerWithoutParams = $controller('PokedexController', {
        $scope: $scope,
        $routeParams: {},
        pokedexService: service
      });

      $http.flush();

      expect($scope.pokemons.length).toEqual(151);
      expect($scope.pokemons[0].id).toEqual('001');
      expect($scope.pokemons[150].id).toEqual('151');
    }
  );

  it('Should return Fire type pokemons', function() {
    var normalize = $filter('normalize');

    $http.expectGET('/pokemons.json').respond(200,allPokemons);

    controllerWithoutParams = $controller('PokedexController', {
      $scope: $scope,
      $routeParams: {type: 'Fire'},
      pokedexService: service
    });

    $http.flush();
    $scope.$apply();

    expect($scope.pokemons.length).toEqual(12);

    var firePokemons = $scope.pokemons;
    firePokemons = firePokemons.filter(function(pokemon) {
      return pokemon.type.some(function(t) {
        return normalize(t) === 'fire';
      });
    });

    expect(firePokemons.length).toEqual(12);
  });
});
