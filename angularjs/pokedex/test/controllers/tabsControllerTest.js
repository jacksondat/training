describe('tabsController', function() {
  var $rootScope;
  var $scope;
  var $controller;

  beforeEach(function() {
    module('pokedex.controllers');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $controller =
        $injector.get('$controller')('TabsController', {$scope: $scope});
    });
  });

  it('Should instantiate tab value to 1', function() {
    expect($scope.tab).toEqual(1);
  });

  it('Should switch tab value to 2', function() {
    $scope.selectTab(2);
    expect($scope.tab).toEqual(2);
  });
});
