describe('filter.imagify', function() {
  var imagify;
  var imagesPath = 'img/pokemons/';

  beforeEach(function() {
    module('pokedex.filters');
  });

  beforeEach(inject(function(_$filter_) {
    imagify = _$filter_('imageify');
  }));

  it('Should be ' + imagesPath + 'nidoranf.jpg when "Nidoran ♀" is passed', function() {
    expect(imagify('Nidoran ♀')).toEqual(imagesPath + 'nidoranf.jpg');
  });
});
