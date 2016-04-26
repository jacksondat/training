describe('pokemonController', function() {
  var $controller;
  var $service;
  var $scope;
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
        $httpBackend,
        pokedexService) {

        $scope = $rootScope.$new();

        $controller = _$controller_;
        $service = pokedexService;
        $http = $httpBackend;

        allPokemons = readJSON('web/pokemons.json');
      }
    )
  );

  it('Should return Bulbasaur pokemon', function() {
    $http.expectGET('/pokemons.json').respond(200,allPokemons);

    controller = $controller('PokemonController', {
      $scope: $scope,
      $routeParams: {name: 'Bulbasaur'},
      pokedexService: $service
    });

    $http.flush();

    expect($scope.pokemon.name).toEqual('Bulbasaur');
  });

  it('Should return empty Object when no pokemon was found', function() {
    $http.expectGET('/pokemons.json').respond(200,allPokemons);

    controller = $controller('PokemonController', {
      $scope: $scope,
      $routeParams: {name: 'NoPokemon'},
      pokedexService: $service
    });

    $http.flush();

    expect($scope.pokemon).toEqual({});
  });
});
