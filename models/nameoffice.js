function set_data_to_push_nameoffice(data,to_delete,cant_of_breakbar)
{
  var db = new DataBase();
  db.putTable("nameoffice", data,to_delete,cant_of_breakbar);
}

function get_data_nameoffice(to_delete,cant_of_breakbar)
{
  var db = new DataBase();
  var data = db.getTable("nameoffice",to_delete,cant_of_breakbar);
  return data;
}
