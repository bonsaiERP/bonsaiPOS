var fs = require('fs');

var db = new DataBase();



function tokenIsHere(table_name, value) {
  lista = db.getTableDos(table_name);

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].token == value) {
      return true;
    }
  }
  return false;
  // console.log(lista[0]);
}

function getStores() {

}

$(document).ready(function () {


  $("#token").blur(function () {

    var token = $("#token").val();
    if (tokenIsHere("token", token))
      console.log("ya estas logueado");
    else if(token!="") {
      
      var new_token = { "token": token };
      var list = []
      list.push(new_token);
      db.putTableDos("token", list);
      alert("Token registrado");

      var user = db.getTableDos("token"); 
      var stores = {
        "async": true,
        "crossDomain": true,
        "url": "http://catolica.bonsaierp.com:3000/api/v1/stores",
        "method": "GET",
        "headers": {
          "token": user[0].token,
          "cache-control": "no-cache"
        }
      };

      $.ajax(stores).done(function (response) {
        var stores = response;
        // $("#almacen").text(response[1].name);
        for (var i = 0; i < stores.length; i++) {
          $("#list").append("<option value=" + response[i].name + ">" + response[i].name + "</option>");
        };
      });
    }
  });



  $("#get_name").click(function () {

    var nombre_almacen = $("#list option:selected").text();
    if(nombre_almacen == "")
      alert("Conexion erronea");
    else
      $("#almacen").text(nombre_almacen);



  });
});