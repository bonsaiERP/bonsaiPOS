function get_list_of_all_users()
{
  var db = new DataBase();
  var general_list_of_users = db.getTable("users",'\\views\\users',2);
  return general_list_of_users;
}
