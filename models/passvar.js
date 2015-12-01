window.$ = window.jQuery = require('../../libs/jquery.min.js');
var fs = require('fs');

define(["database"], function(database) {

function set_data_to_push(data,to_delete,cant_of_breakbar)
{
  var database = database.DataBase();
  database.putTable("passvar", data,to_delete,cant_of_breakbar);
}

function get_data(to_delete,cant_of_breakbar)
{
  var database = database.DataBase();
  var data = database.getTable("passvar",to_delete,cant_of_breakbar);
  return data;
}

});