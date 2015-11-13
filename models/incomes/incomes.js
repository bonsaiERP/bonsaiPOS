window.$ = window.jQuery = require('./libs/jquery.min.js');
var db = new DataBase();

function showAlertMessage(tipeMessage)
{
  $("#alertMessage").removeClass();
  if(tipeMessage=="successProductUpdate"){
    $("#alertMessage").addClass("alert alert-dismissible alert-success");
    $("#alertMessage")[0].innerHTML='<p>Los datos de la empresa fueron actualizados exitosamente.</p>';
  }
  else{
    $("#alertMessage").addClass("alert alert-dismissible alert-danger");
    $("#alertMessage")[0].innerHTML='<p>Error al Actualizar los datos de la empresa.</p>';
  }
}

$(document).ready(function () {
	$("#update_incomes").click(function () {

    user = db.getTable('token','',2);

      var content = {"date":"2015-11-12","due_date":"2015-11-15","contact_id":1,"currency":"BOB","bill_number":"I-0003","description":"New income description","tag_ids":["1"],"income_details_attributes":[{"item_id":3,"price":4200.0,"quantity":5,"description":"IPod touch 5ta generacion"}]};
      var incomes = {
  			"url": "http://catolica.bonsaierp.com:3000/api/v1/incomes",
        "method": "POST",
        "crossDomain": true,
        "contentType": 'application/json',
        "processData": false,
        "data": JSON.stringify(content),
        "dataType" : 'json',
        "headers": {
  				"token": user[0].token,
  				"cache-control": "no-cache"
  			}
  		};

			$('#progressbardiv').show();
			$('#progressbar-2').animate({ width: '100%' }, 1, 'linear').html("Cargando...");

    $.ajax(incomes).done(function (response) {
      console.log(content);
			var incomes = response;
			console.log(response);
		   //db.putTable('organisations',organisations,'',2);
         setTimeout(function(){
            // showAlertMessage("successProductUpdate");
            //$("#alertMessage").show();
           alert("Los datos de la empresa fueron actualizados exitosamente.");
           $('#progressbar-2').html("Descarga Completa.");
         }, 1000);
			})
     .fail(function (ajaxContext){
      //showAlertMessage("errorProductUpdate");
      //$("#alertMessage").show();
      alert("Error al Actualizar los datos de la empresa");
    $('#progressbar-2').html("Error en la Descarga.");
    });
	});
  });
