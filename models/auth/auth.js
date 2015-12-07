window.$ = window.jQuery = require('./libs/jquery.min.js');
var db = new DataBase();
var employees = db.getTable("employees","",2);


function auth_user(){
  var email = $('#inputEmail').val();
  var password = $('#inputPassword').val();

  var resp = false;
  for(var cont=0 ; cont < employees.length && resp===false; cont++)
  {
    if (email === employees[cont].email && password === employees[cont].password)
    {
      resp = true;
      location.href = "././index.html";
      break;      
    }
  }

}

$(document).ready(function () {
        $("#iniciar").click(function (){
          
          // location.href = "././index.html";
          auth_user();
        });
      });
