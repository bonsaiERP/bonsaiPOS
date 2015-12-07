var fs = require('fs');
var db = new DataBase();

//var user = db.getTable("token", '\\views\\connectionERP', 2);

function tokenIsHere(table_name, value) {

  var lista = db.getTable(table_name, '\\views\\connectionERP', 2);

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].token == value) {
      return true;
    }
  }
  return false;
}

function resetDropList() {
  $("#list").html("");
}

$(document).ready(function () {
  $("#token").blur(function () {
    var token = $("#token").val();
    
    if (tokenIsHere("token", token)){
      console.log("Usted ya esta registrado");
    }
    else {
      resetDropList();
      if (token !== "") {
        var new_token = { "token": token };
        var list = [];
        list.push(new_token);
        
        db.putTable("token", list, '\\views\\connectionERP', 2);
        var user = db.getTable("token", '\\views\\connectionERP', 2);

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
          if (stores.length !== 0) {
            for (var i = 0; i < stores.length; i++) {
              $("#list").append("<option value=" + response[i].name + ">" + response[i].name + "</option>");
            }
          }
        });
      } else {
        var list = [];
        db.putTable("token", list, '\\views\\connectionERP', 2);
        resetDropList();
      }
    }
  });

  $("#get_name").click(function () {

    var nombre_almacen = $("#list option:selected").text();
    if (nombre_almacen === "") {
      mensaje();
      set_data_to_push_nameoffice("Conectar ERP", '\\views\\bd\\token.json', 2);
      $("#almacen").text("Conectar ERP");
    }
    else {
      set_data_to_push_nameoffice(nombre_almacen, '\\views\\connectionERP', 2);
      $("#almacen").text(nombre_almacen);
    }
  });
});

function mensaje() {
  $('#modalBodyMessageDanger').html("<p>No se puede realizar la conexion</p>");
  $('#myDangerModal').modal('show');
}
