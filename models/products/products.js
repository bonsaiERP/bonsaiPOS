window.$ = window.jQuery = require('./libs/jquery.min.js');
var db = new DataBase();

if (localStorage.getItem('reload') == 1) {
  showAlertMessage("successProductUpdate");
  $("#alertMessage").show();
  localStorage.removeItem('reload');
}

function showAlertMessage(tipeMessage) {
  $("#alertMessage").removeClass();
  if (tipeMessage == "successProductUpdate") {
    $("#alertMessage").addClass("alert alert-dismissible alert-success");
    $("#alertMessage")[0].innerHTML = '<p>Los productos fueron actualizados exitosamente.</p>';
  }
  else {
    $("#alertMessage").addClass("alert alert-dismissible alert-danger");
    $("#alertMessage")[0].innerHTML = '<p>Error al Actualizar los productos.</p>';
  }
}

function getProducts() {
  var products = db.getTable('products', '', 2);
  return products;
}

function mensaje() {
  alert("mensaje de product js");
}

function sincronizar() {

  var user = db.getTable('token', '', 2);
  // var user = bd.getTableDos('token');
  var items = {
    "async": true,
    "crossDomain": true,
    "url": "http://catolica.bonsaierp.com:3000/api/v1/items",
    "method": "GET",
    "headers": {
  				"token": user[0].token,
  				"cache-control": "no-cache"
    }
  };

  var stocks = {
    "async": true,
    "crossDomain": true,
    "url": "http://catolica.bonsaierp.com:3000/api/v1/stocks",
    "method": "GET",
    "headers": {
  				"token": user[0].token,
  				"cache-control": "no-cache"
  			}
  		};

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

    $('#progressbardiv').show();
    $('#progressbar-2').animate({ width: '100%' }, 1, 'linear').html("Cargando...");

    $.ajax(items).done(function (response) {
			var products = response;

			$.ajax(stocks).done(function (response) {
				var stocks = response;
				products_pos = agregarAmount(products, stocks);

				db.putTable('products',products_pos,'',2);
				// console.log(response);
        setTimeout(function(){
            //showAlertMessage("successProductUpdate");
            //$("#alertMessage").show();
            alert("Los productos fueron actualizados exitosamente.");
            $('#progressbar-2').html("Descarga Completa.");
        }, 1000);
			});
      $.ajax(stores).done(function (response) {
        var stores = response;

        console.log(response[0].name);

      });
		})
    .fail(function (ajaxContext) {
      //showAlertMessage("errorProductUpdate");
      //$("#alertMessage").show();
      alert("Error al Actualizar los productos.");
      $('#progressbar-2').html("Error en la Descarga.");
    });
}

$(document).ready(function () {

  $("#update").click(function () {
    sincronizar();
  });

});

function stock_pos(stocks) {
  var stock = [];
  var pos = 0;
  for (var i = 0; i < stocks.length; i++) {
    if (stocks[i].store_id == 1) {
      stock[pos] = stocks[i];
      pos++;
    }
  }
  return stock;
}

function agregarAmount(products, stocks) {

  var products_pos = [];
  var cont = 0;

  stock = stock_pos(stocks);
  for (var i = 0; i < stock.length; i++) {
    for (var j = 0; j < products.length; j++) {
      if (stock[i].item_id == products[j].id) {
        products_pos[cont] = products[j];
        products_pos[cont]["amount"] = stock[i].quantity;
        cont++;
      }
    }
  }
  console.log(products_pos.length);

  return products_pos;
  // console.log(products[0]);

}
