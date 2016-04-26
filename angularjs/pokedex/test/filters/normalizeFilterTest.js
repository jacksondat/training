describe('filter.normalize', function() {
  var normalize;

  beforeEach(function() {
    module('pokedex.filters');
  });

  beforeEach(inject(function(_$filter_) {
    normalize = _$filter_('normalize');
  }));

  it('Should normalize to nidoranf when "Nidoran ♀" is passed', function() {
    expect(normalize('Nidoran ♀')).toEqual('nidoranf');
  });

  it('Should normalize to nidoranm when "Nidoran ♂" is passed', function() {
    expect(normalize('Nidoran ♂')).toEqual('nidoranm');
  });

  it('Should normalize to farfetchd when "Farfetch\'d" is passed', function() {
    expect(normalize('Farfetch\'d')).toEqual('farfetchd');
  });
});
