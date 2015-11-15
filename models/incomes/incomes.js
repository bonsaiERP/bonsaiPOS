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
    $('#progressbardiv').show();
    $('#progressbar-2').animate({ width: '100%' }, 1, 'linear').html("Cargando...");

    $.ajax({
      headers: {token: user[0].token},
      method: "POST",
      url: "http://catolica.bonsaierp.com:3000/api/v1/incomes",
      data: {
        income: {
        "date":"2015-11-13",
        "due_date":"2015-11-16",
        "contact_id":1,
        "currency":"BOB",
        "description":"Prueba ingreso",
        "income_details_attributes":[
          {"item_id":1,"price":10.0,"quantity":10,"description":"First item"},
          {"item_id":2,"price":20.0,"quantity":20,"description":"Second item"}
        ]}
      }
    })
    .done(function(resp) {
      console.log("saved", resp);
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
