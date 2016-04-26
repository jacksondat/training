describe('pokemonTypeDirective', function() {
  var $compile;
  var $http;
  var controller;

  beforeEach(function() {
    module('pokedex.controllers');
    module('pokedex.services');
    module('pokedex.filters');
    module('pokedex.directives');
    module('partials/pokemon-type.html');
  });

  beforeEach(inject(function(_$compile_, _$rootScope_, $controller, pokedexService, $httpBackend) {
    $http = $httpBackend;
    $compile = _$compile_;
    $scope = _$rootScope_.$new();

    var allPokemons = readJSON('web/pokemons.json');
    $http.expectGET('/pokemons.json').respond(200,allPokemons);

    controller = $controller('PokemonController', {
      $scope: $scope,
      $routeParams: {name: 'Bulbasaur'},
      pokedexService: pokedexService
    });

    $http.flush();
  }));

  it('Replaces the element with the appropriate content', function() {

    var pokemonType = angular.element('<pokemon-type></pokemon-type>');
    // Compile a piece of HTML containing the directive
    var element = $compile(pokemonType)($scope);
    // fire all the watches, so the scope expressions will be evaluated
    $scope.$digest();

    console.log(element.html());
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain('Grass');
  });
});
