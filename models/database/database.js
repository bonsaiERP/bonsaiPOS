var fs = require('fs');

var DataBase = function () {


  function getpathproyect(todelete, cant_of_breakbar) {
    actualdir = __dirname
    /*34 es ascii de '\', la primera comparación ve si pertenece el path a windows,
    si pertenece a windows, no hace nada, caso contrario, lo cambia a '/'
    */
    if (actualdir.search('/') != -1) {
      for (i = 0; i < cant_of_breakbar; i++) {
        todelete = todelete.replace(String.fromCharCode(92), '/');
      }
    }
    actualdir = actualdir.replace(todelete, '');
    return actualdir;
  }

  function converpath(toconvert, cant_of_breakbar) {
    actualdir = __dirname
    /*34 es ascii de '\', la primera comparación ve si pertenece el path a windows,
    si pertenece a windows, no hace nada, caso contrario, lo cambia a '/'
    */
    if (actualdir.search('/') != -1) {
      for (i = 0; i < cant_of_breakbar; i++) {
        toconvert = toconvert.replace(String.fromCharCode(92), '/');
      }
    }
    return toconvert;
  }

  //Variables privadas
  var lista = new Array();

  // METODOS PUBLICOS
  this.getTable = function (table_name, to_delete, cant_of_breakbar) {
    var elementos = fs.readFileSync(getpathproyect(to_delete, cant_of_breakbar) + converpath('\\bd\\', 2) + table_name + '.json');
    lista = JSON.parse(elementos);

    return lista;
  }

  this.putTable = function (table_name, table, to_delete, cant_of_breakbar) {
    fs.writeFileSync(getpathproyect(to_delete, cant_of_breakbar) + converpath('\\bd\\', 2) + table_name + '.json', JSON.stringify(table), 'utf8');
  }

  this.getTableDos = function (table_name) {

    var elementos = fs.readFileSync('bd/' + table_name + '.json');
    lista = JSON.parse(elementos);

    return lista;
  }

  this.putTableDos = function (table_name, table) {
    fs.writeFileSync('bd/' + table_name + '.json', JSON.stringify(table), 'utf8');
  }
  
  this.find = function(table_name, campo, value){
    lista = this.getTableDos(table_name);
    
    // for(var i=0; i<lista.length; i++){
    //   if()
    // }
    console.log(lista[0]+"."+campo);
  }
}
