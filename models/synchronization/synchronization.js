
$(document).ready(function(){
    var fs = require('fs');
  	var db = new DataBase();
  	var type='';
    var mySynchronization = [];



      $("#checkbox_check").click(function() {

        if($("#daily").is(':checked') &&  $("#change").is(':checked')) {


          var synchronizationDaily = { "id": 1, "type": "daily" };
          mySynchronization.push(synchronizationDaily);
          db.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
          var synchronizationDaily = { "id": 2, "type": "change" };
          mySynchronization.push(synchronizationDaily);
          db.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
          location.reload();
          localStorage.setItem('reload',1);

            alert("Activado: Sincronizacion diaria y por modificacion");
        } else{

          if($("#daily").is(':checked')) {


            var synchronizationDaily = { "id": 1, "type": "daily" };
            mySynchronization.push(synchronizationDaily);
            db.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
            location.reload();
            localStorage.setItem('reload',1);

              alert("Activado: Sincronizacion diaria");
          }

          if($("#change").is(':checked')) {


            var synchronizationDaily = { "id": 1, "type": "change" };
            mySynchronization.push(synchronizationDaily);
            db.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
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
