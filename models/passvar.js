
function set_data_to_push(data,to_delete,cant_of_breakbar)
{
  var db = new DataBase();
  db.putTable("passvar", data,to_delete,cant_of_breakbar);
}

function get_data(to_delete,cant_of_breakbar)
{
  var db = new DataBase();
  var data = db.getTable("passvar",to_delete,cant_of_breakbar);
  return data;
}
