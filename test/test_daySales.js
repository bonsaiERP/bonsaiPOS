var assert = require('assert');
var daySales = require('../models/reports/daySalesTest.js');

describe('GET#time', function() {
  it('Funcion getactualdate deberia obtener la fecha en dia-mes-anio', function() {
    assert.equal(daySales.getactualdate(new Date(2015,9,21)), '21/9/2015');
  });
  it('Funcion thehighttime deberia obtener true si la hora1 es mayor a hora2', function() {
    assert.equal(daySales.thehighttime(new Date(2015,9,21,01,02,05), new Date(2015,9,21,01,02,04)), true);
  });
  it('Funcion thehighttime deberia obtener false si la hora1 es menor a hora2', function() {
    assert.equal(daySales.thehighttime(new Date(2015,9,21,01,02,03), new Date(2015,9,21,01,02,04)), false);
  });
 it('Funcion getactualtime deberia obtener la hora en horas:min-seg', function() {
    assert.equal(daySales.getactualtime(new Date(2015,9,21,01,02,05)), '1:2:5');
  });

  it('Funcion orderlistbyhour deberia devolver una lista ordenada de acuerdo al horario', function() {
     var objeto1 = {id:1, date:"Tue, 22 Sep 2015 23:45:45 GMT", total:900};
     var objeto2 = {id:2, date:"Tue, 22 Sep 2015 23:50:45 GMT", total:900};
     var objeto3 = {id:3, date:"Tue, 22 Sep 2015 11:45:45 GMT", total:2400};
     var objeto4 = {id:4, date:"Tue, 22 Sep 2015 11:40:45 GMT", total:2400};
     var lista_a_procesar = [];
     lista_a_procesar.push(objeto1,objeto2,objeto3,objeto4);
     var lista_resu = [];
     lista_resu.push(objeto4,objeto3,objeto1,objeto2)
     var resu = daySales.orderlistbyhour(lista_a_procesar);
     assert.equal(resu[0], lista_resu[0]);
     assert.equal(resu[1], lista_resu[1]);
     assert.equal(resu[2], lista_resu[2]);
     assert.equal(resu[3], lista_resu[3]);
   });
});
