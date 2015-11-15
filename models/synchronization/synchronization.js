
$(document).ready(function(){
    var fs = require('fs');
  	var db = new DataBase();
  	var type='';



      $("#checkbox_check").click(function() {

        if($("#daily").is(':checked') &&  $("#connections").is(':checked')) {

          var mySynchronization = db.getTable("synchronization",'\\views\\synchronization',2);
          var size = mySynchronization.length;
          var id = 1;
          if(mySynchronization.length != 0)
          {
            var aux = mySynchronization.length;
            id = mySynchronization[aux-1].id + 1;
          }
          var synchronizationDaily = { "id": id, "type": "daily-connection" };
          mySynchronization.push(synchronizationDaily);
          db.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
          location.reload();
          localStorage.setItem('reload',1);

            alert("Activado: Sincronizacion diaria y con conexion");
        } else{

          if($("#daily").is(':checked')) {

            var mySynchronization = db.getTable("synchronization",'\\views\\synchronization',2);
            var size = mySynchronization.length;
            var id = 1;
            if(mySynchronization.length != 0)
            {
              var aux = mySynchronization.length;
              id = mySynchronization[aux-1].id + 1;
            }
            var synchronizationDaily = { "id": id, "type": "daily" };
            mySynchronization.push(synchronizationDaily);
            db.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
            location.reload();
            localStorage.setItem('reload',1);

              alert("Activado: Sincronizacion diaria");
          }

          if($("#connections").is(':checked')) {

            var mySynchronization = db.getTable("synchronization",'\\views\\synchronization',2);
            var size = mySynchronization.length;
            var id = 1;
            if(mySynchronization.length != 0)
            {
              var aux = mySynchronization.length;
              id = mySynchronization[aux-1].id + 1;
            }
            var synchronizationDaily = { "id": id, "type": "connection" };
            mySynchronization.push(synchronizationDaily);
            db.putTable("synchronization", mySynchronization,'\\views\\synchronization',2);
            location.reload();
            localStorage.setItem('reload',1);

              alert("Activado: Sincronizacion con conexion");
          }
         }
         if( !$("#daily").is(':checked') &&  !$("#connections").is(':checked')) {
            alert("Error: Debe selecionar al menos una opcion");
         }


      });

  });
