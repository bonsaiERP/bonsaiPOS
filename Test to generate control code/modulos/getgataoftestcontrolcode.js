var fs = require('fs');

function Obtenerinfo() {
  var database = new DataBase();
  var list = database.getTable("5000CasosPruebaCCVer7",'',0);
  console.log(list.length);
  console.log(list[0].length);


}
