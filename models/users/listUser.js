var id_user;

function get_list_of_all_users()
{
  var db = new DataBase();
  var general_list_of_users = db.getTable("users",'\\views\\users',2);
  return general_list_of_users;
}
function to_editUser(id_user)
{
  set_data_to_push(id_user,'\\views\\users',2);
  location.href = "editUser.html";
}
