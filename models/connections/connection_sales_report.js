var fs = require('fs');
var db = new DataBase();

$(document).ready(function () {

	var sales = {
        "async": true,
        "crossDomain": true,
        "url": "http://catolica.bonsaierp.com:3000/api/v1/incomes",
        "method": "POST",
        "headers": {
          "token": "TCxOmlUloCktzW2cr_g7xfKZAddHAnmdHEzgN5c-QEM",
          "cache-control": "no-cache"
        }
  	};

  	$.ajax(stores).done(function (response) {
        var stores = response;
        for (var i = 0; i < stores.length; i++) {
        	$("#list").append("<option value="+response[i].name+">"+response[i].name+"</option>");
        };

  	});

	$("#get_name").click(function () {
		var nombre_almacen = $("#list option:selected").text();
		$("#almacen").text(nombre_almacen);

	});
});
