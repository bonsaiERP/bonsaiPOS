window.$ = window.jQuery = require('../../libs/jquery.min.js');
  var fs = require('fs');

  var database= new DataBase();

  function set_data_to_push_nameoffice(data,to_delete,cant_of_breakbar)
  {
    database.putTable("nameoffice", data,to_delete,cant_of_breakbar);
  }

function get_data_nameoffice(to_delete,cant_of_breakbar)
  {
    var data = database.getTable("nameoffice",to_delete,cant_of_breakbar);
    return data;
  }
