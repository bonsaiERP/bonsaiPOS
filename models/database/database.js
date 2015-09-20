var fs = require('fs');

var DataBase = function () {
  
  //Variables privadas 
  var lista = new Array();
    
  // METODOS PUBLICOS
  this.getTable = function (table_name) {
    var elementos = fs.readFileSync('bd/' + table_name + '.json');
    lista = JSON.parse(elementos);
    
    return lista;
  } 
  
  this.putTable = function(table_name, table){
    fs.writeFileSync('bd/' + table_name + '.json', JSON.stringify(table), 'utf8');
  } 
}





