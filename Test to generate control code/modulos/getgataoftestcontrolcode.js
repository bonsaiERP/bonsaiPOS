var fs = require('fs');

function Obtenerinfo() {
  var db = new DataBase();
  var list = db.getTable("5000CasosPruebaCCVer7",'',0);
  console.log(list.length);
  console.log(list[0].length);


}
