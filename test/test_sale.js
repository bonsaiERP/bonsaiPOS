var assert = require('assert');
var daySales = require('../models/sales/newSaleTest.js');

describe('GET#time', function() {
  it('Funcion getactualdate deberia obtener la fecha en dia-mes-anio', function() {
    assert.equal(daySales.getactualdate(new Date(2015,9,21)), '21/9/2015');
  });

});
