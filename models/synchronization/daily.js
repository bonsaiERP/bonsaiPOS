window.$ = window.jQuery = require('../../libs/jquery.min.js');

var fs = require('fs');
var db = new DataBase();

//====================================================================



function getProducts() {
	// var products = db.getTable('products', '', 2);
	var products = db.getTableDos('products');
	return products;
}

function sincronizar() {
	// var user = db.getTable('token', '', 2);
	var user = db.getTableDos('token');
	console.log(user[0].token);
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


    $.ajax(items).done(function (response) {
		var products = response;

		$.ajax(stocks).done(function (response) {
			var stocks = response;
			var products_pos = agregarAmount(products, stocks);

			// db.putTable('products', products_pos, '', 2);
			db.putTableDos('products', products_pos);
			setTimeout(function () {
				alert("Los productos fueron actualizados exitosamente.");
			}, 1000);
		});
		$.ajax(stores).done(function (response) {
			var stores = response;
			console.log(response[0].name);
		});
	});

}


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

	var stock = stock_pos(stocks);
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
}

//=====================================================================




function isDaily() {

	// var mySynchronization = db.getTable("synchronization", '\\views\\synchronization', 2);
	var mySynchronization = db.getTableDos("synchronization");

	for (var i = 0; i < mySynchronization.length; i++) {
		if (mySynchronization[i].type === "daily")
			return true;
	}
	return false;
}

function getTime() {
	var date = new Date($.now());
	var hours = date.getHours()
	var minutes = date.getMinutes()

	var time = { hour: hours, minute: minutes };

	return time;
}

function isTime() {
	var time = getTime();
	var respuesta = false;

	if (isDaily()) {
		console.log(time);
		if ("20:18" == time.hour + ":" + time.minute) {
			console.log("es hora");
			respuesta = true;
		} else {
			console.log("no es hora");
			respuesta = false;
		}
	}
	return respuesta;
}

function isLate(){
	var fecha = new Date($.now());
	var hora_establecida = 20
	var minutos_establecidos = 18
	var late = false;
	if(hora_establecida < fecha.getHours()){
		late = true;
	}
	else {
		if(hora_establecida == fecha.getHours()){
			if (minutos_establecidos < fecha.getMinutes()) {
				late = true;
			}
		}
	}
	return late;
}


function sincronizacionDiaria(){
	if(isTime()){
		sincronizar();
	}
	else {
		if(isLate()){
			sincronizar();
		}
	}
	setTimeout("sincronizacionDiaria()", 5000);
}

//
// function synchronisationDaily() {
//
// 	if (isTime()) {
// 		sincronizar();
// 		synchronized = true
// 		remaining_time = 24000
// 		console.log("Sincronizacion diaria ejecutada");
// 	}
// 	setTimeout("synchronisationDaily()", remaining_time);
//
// }

// setTimeout("synchronisationDaily()", 1000);
// synchronisationDaily();
sincronizacionDiaria();
