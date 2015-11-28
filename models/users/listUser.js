var id_user;
var db = new DataBase();
var general_list_of_users = db.getTable("users",'\\views\\users',2);

var data2 = new Array("");

getClients();






function get_list_of_all_users(){
  return general_list_of_users;
}
function to_editUser(id_user){
  set_data_to_push(id_user,'\\views\\users',2);
  location.href = "editUser.html";
}
function showAlertMessage(tipeMessage)
{
  $("#alertMessage").removeClass();

  if(tipeMessage=="warning"){
    $("#alertMessage").addClass("alert alert-dismissible alert-danger");
    $("#alertMessage")[0].innerHTML='<p>No existe un cliente con ese nombre</p>';
  }
  $("#alertMessage").show();
}

function getClients() {
  for (var cont = 0; cont < general_list_of_users.length; cont++) {
    data2.push(general_list_of_users[cont].name.toString());
  }
  return data2;
}



  $(document).ready(function(){



     $('#search_client').click(function () {
       //diercto para buscar
       var name_search= $("#client_name").val();
       var existe=false;
       $("#alertMessage").hide();


       var list_of_users = general_list_of_users;

       var data_table = $("#datatable");
       data_table.empty();
       data_table.append('<tr ><th style="text-align: center;">Nombre</th><th style="text-align: center;">Apellido</th><th style="text-align: center;">CI</th><th style="text-align: center;">Opciones</th></tr>');
       if($("#client_name").val()==""){
         for (var i = 0; i < list_of_users.length; i++) {

             data_table.append('<input type="hidden" value="'+ list_of_users[i].id +'" id="hidden_value"');
              data_table.append('<tr> <td style="text-align: center;">' + list_of_users[i].name + '</td> <td style="text-align: center;">' + list_of_users[i].lastname + '</td> <td style="text-align: center;">' + list_of_users[i].ci + '<td style="text-align: center;"> <button onclick="to_editUser('+list_of_users[i].id+')">Editar usuario</button> </td></tr>');
              existe=true;

          }
         }
       for (var i = 0; i < list_of_users.length; i++) {
         if (list_of_users[i].name.toString().toLowerCase()==name_search.toString().toLowerCase()) {
           existe=true;
           data_table.append('<input type="hidden" value="'+ list_of_users[i].id +'" id="hidden_value"');
            data_table.append('<tr> <td style="text-align: center;">' + list_of_users[i].name + '</td> <td style="text-align: center;">' + list_of_users[i].lastname + '</td> <td style="text-align: center;">' + list_of_users[i].ci + '<td style="text-align: center;"> <button onclick="to_editUser('+list_of_users[i].id+')">Editar usuario</button> </td></tr>');


         }


        }
         if (!existe) {
           showAlertMessage("warning");

         }

         $("#client_name").val("");

     });
    // $('#client_name').autocomplete({//no funciona llama al getClients
      //  source: data2
      //});


    });
