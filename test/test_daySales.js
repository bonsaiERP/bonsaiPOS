var assert = require('assert');
var daySales = require('../models/reports/daySalesTest.js');

describe('GET#time', function() {
  it('Funcion getactualdate deberia obtener la fecha en dia-mes-anio', function() {
    assert.equal(daySales.getactualdate(new Date(2015,9,21)), '21/9/2015');
  });
  it('Funcion thehighttime deberia obtener true si la hora1 es mayor a hora2', function() {
    assert.equal(daySales.thehighttime(new Date(2015,9,21,01,02,05), new Date(2015,9,21,01,02,04)), true);
  });
 it('Funcion getactualtime deberia obtener la hora en horas:min-seg', function() {
    assert.equal(daySales.getactualtime(new Date(2015,9,21,01,02,05)), '1:2:5');
  });
});
