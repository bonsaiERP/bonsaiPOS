window.$ = window.jQuery = require('./libs/jquery.min.js');
var db = new DataBase();

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
		}

		$.ajax(settings).done(function (response) {
			var products =response;
			db.putTable('products',products,'',2);
			console.log(response);
		});
	});
});