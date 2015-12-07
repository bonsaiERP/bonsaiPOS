window.$ = window.jQuery = require('./libs/jquery.min.js');
var db = new DataBase();
var clientes = db.getTable('users','',2);
var user = db.getTable('token','',2);

function showAlertMessage(tipeMessage)
{
  $("#alertMessage").removeClass();
  if(tipeMessage=="successProductUpdate"){
    $("#alertMessage").addClass("alert alert-dismissible alert-success");
    $("#alertMessage")[0].innerHTML='<p>Los clientes de la empresa fueron actualizados exitosamente.</p>';
  }
  else{
    $("#alertMessage").addClass("alert alert-dismissible alert-danger");
    $("#alertMessage")[0].innerHTML='<p>Error al Actualizar los clientes de la empresa.</p>';
  }
}

$(document).ready(function () {
	$("#update_clientes").click(function () {
    resp = false;
    for(var cont=0 ; cont < clientes.length ; cont++)
    {
      if (clientes[cont].sync === false)
      {
        resp =true;
        clientes[cont].sync = true;
    $('#progressbardiv').show();
    $('#progressbar-2').animate({ width: '100%' }, 1, 'linear').html("Cargando...");

    $.ajax({
      headers: {token: user[0].token},
      method: "POST",
      url: "http://catolica.bonsaierp.com:3000/api/v1/contacts",
      data: {
        contact: {
        "matchcode": clientes[cont].name + ' ' + clientes[cont].lastname,
        "first_name": clientes[cont].name,
        "last_name": clientes[cont].lastname}}
      })
    .done(function(resp) {
      console.log("saved", resp);
      setTimeout(function(){
        $('#progressbar-2').html("Actualizacion Completa.");
      }, 1000);
    })
    .fail(function (ajaxContext){
     alert("Error al Actualizar los clientes de la empresa");
   $('#progressbar-2').html("Error en la Actualizacion.");
   })
  }
  }
  if(resp === true)
  {
    alert("Los clientes de la empresa fueron actualizados exitosamente");
  }
  else {
    alert("No se tiene ningun cliente nuevo para sincronizar");
  }
  db.putTable("users", clientes,'\\views\\users',2);
	});
  });
