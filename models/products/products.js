window.$ = window.jQuery = require('./libs/jquery.min.js');
var db = new DataBase();
function getProducts() {
	var products = db.getTable('products','',2);
	return products;
}
$(document).ready(function () {

	$("#update").click(function () {


		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "http://demo.bonsaierp.com/api/v1/items",
			"method": "GET",
			"headers": {
				"token": "dLXE2gSxDTN0w0as2YrkEdi18m8GlacZ3UrZvBd3y2A",
				"cache-control": "no-cache"
			}
		};

		$.ajax(settings).done(function (response) {
			var products =response;
			products = agregarAmount(products);

			db.putTable('products',products,'',2);
			// console.log(response);
		});
	});
	var json = JSON.stringify(getProducts());
	var blob = new Blob([json], {type: "application/json"});
	var url  = URL.createObjectURL(blob);

	var file = document.createElement('a');
	file.download    = "_items.json";
	file.href        = url;
	file.textContent = "Items.json";

	document.getElementById('download').appendChild(file);

});

function agregarAmount(products){

	for (var i = 0; i < products.length; i++) {

		products[i]["amount"]= 10;

	}
	console.log(products.length);

	return products;
	// console.log(products[0]);

}
