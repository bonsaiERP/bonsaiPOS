
window.$ = window.jQuery = require('../../libs/jquery.min.js');
var fs = require('fs');

var db= new DataBase();

$(document).ready(function(){
    var fs = require('fs');
  	var database = database.DataBase();
  	var type='';
    var mySynchronization = [];

$(document).ready(function () {
        var ckbox = $('#daily');
          $('#daily').on('click', function() {
            if (ckbox.is(':checked')) {
                alert('Debe seleccionar una hora o Se guardara con hora por defecto 9:00pm');
            }
        });
});


      $("#checkbox_check").click(function() {

        if($("#daily").is(':checked') &&  $("#change").is(':checked')) {

          var valor = document.getElementById("time").value;
          var synchronizationDaily = { "id": 1, "type": "daily", "valor": valor };
          mySynchronization.push(synchronizationDaily);
          database.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
          var synchronizationDaily = { "id": 2, "type": "change" };
          mySynchronization.push(synchronizationDaily);
          database.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
          location.reload();
          localStorage.setItem('reload',1);

            alert("Activado: Sincronizacion diaria y por modificacion");
        } else{

          if($("#daily").is(':checked')) {

            var valor = document.getElementById("time").value;
            var synchronizationDaily = { "id": 1, "type": "daily", "valor": valor };
            mySynchronization.push(synchronizationDaily);
            database.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
            location.reload();
            localStorage.setItem('reload',1);


              alert("Activado: Sincronizacion diaria");
          }

          if($("#change").is(':checked')) {


            var synchronizationDaily = { "id": 1, "type": "change" };
            mySynchronization.push(synchronizationDaily);
            database.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
            location.reload();
            localStorage.setItem('reload',1);

              alert("Activado: Sincronizacion por modificacion");
          }
         }
         if( !$("#daily").is(':checked') &&  !$("#change").is(':checked')) {
            alert("Error: Debe selecionar al menos una opcion");
         }
       });
    });
