var id_user;
var db = new DataBase();
var general_list_of_users = db.getTable("users",'\\views\\users',2);
var clients= [] ;

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
  i = 0;
  for (var cont = 0; cont < general_list_of_users.length; cont++) {
    clients[i] = general_list_of_users[cont].name;
    i++;
  }
}



  $(document).ready(function(){

     $('#search_client').click(function () {
       //diercto para buscar
       for (var cont = 0; cont < general_list_of_users.length; cont++) {
         clients[i] = general_list_of_users[cont].name;
         i++;
       }
       showAlertMessage("warning");
     });
     $("#client_name").autocomplete(clients);//no funciona






    });
