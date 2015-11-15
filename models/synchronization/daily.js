$(document).ready(function () {

});

var fs = require('fs');
var db = new DataBase();

function isDaily(lista) {
	for (var i = 0; i < lista.length; i++) {
		if (lista[i].type === "daily")
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

	if ("22:44" == time.hour + ":" + time.minute) {
		console.log("es hora");
	} else {
		console.log("no es hora");
	}
	setTimeout("isTime()", 60000);
}

var mySynchronization = db.getTable("synchronization", '\\views\\synchronization', 2);

setTimeout("isTime()", 5000);
