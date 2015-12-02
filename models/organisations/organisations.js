window.$ = window.jQuery = require('../../libs/jquery.min.js');
var fs = require('fs');

  var database = new DataBase();
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
  	$("#update_organisation").click(function () {
      user = database.getTable('token','',2);

    		var organisations = {
    			"async": true,
    			"crossDomain": true,
    			"url": "http://catolica.bonsaierp.com:3000/api/v1/organisations",
    			"method": "GET",
    			"headers": {
    				"token": user[0].token,
    				"cache-control": "no-cache"
    			}
    		};

  			$('#progressbardiv').show();
  			$('#progressbar-2').animate({ width: '100%' }, 1, 'linear').html("Cargando...");

      $.ajax(organisations).done(function (response) {
  			var organisations = response;
  			console.log(response);
  		   database.putTable('organisations',organisations,'',2);
           setTimeout(function(){
             alert("Los datos de la empresa fueron actualizados exitosamente.");
             $('#progressbar-2').html("Descarga Completa.");
           }, 1000);
  			})
       .fail(function (ajaxContext){
        alert("Error al Actualizar los datos de la empresa");
      $('#progressbar-2').html("Error en la Descarga.");
      });
  	});

});
