/* global DataBase */

var fs = require('fs');
var db = new DataBase();
var myObject = db.getTable("products",'\\views\\products',2);

function getpathproyect(todelete,cant_of_breakbar)
{
  actualdir = __dirname
  /*34 es ascii de '\', la primera comparación ve si pertenece el path a windows,
  si pertenece a windows, no hace nada, caso contrario, lo cambia a '/'
  */
  if(actualdir.search('/') != -1)
  {
    for(i = 0; i < cant_of_breakbar; i++)
    {
      todelete = todelete.replace(String.fromCharCode(92),'/');
    }
  }
  actualdir = actualdir.replace(todelete,'');
  return actualdir;
}

function converpath(toconvert,cant_of_breakbar)
{
  actualdir = __dirname
  /*34 es ascii de '\', la primera comparación ve si pertenece el path a windows,
  si pertenece a windows, no hace nada, caso contrario, lo cambia a '/'
  */
  if(actualdir.search('/') != -1)
  {
    for(i = 0; i < cant_of_breakbar; i++)
    {
      toconvert = toconvert.replace(String.fromCharCode(92),'/');
    }
  }
  return toconvert;
}


function showAlertMessage(tipeMessage)
{
  $("#alertMessage").removeClass();
  if(tipeMessage=="danger"){
    $("#alertMessage").addClass("alert alert-dismissible alert-danger");
    $("#alertMessage")[0].innerHTML='<p>El producto no existe en el stock.</p>';
  }
  $("#alertMessage").show();
}

(function ($) {
  $('#formStock').on('submit', function (event) {
    $("#alertMessage").hide();
    event.preventDefault();
    var data_table = $("#tblDatos");
    if(data_table.length > 0){
      data_table.empty();
      data_table.append('<tr ><th style="text-align: center;">Id</th><th style="text-align: center;">C&oacute;digo</th><th style="text-align: center;">Nombre del producto</th><th style="text-align: center;">Precio Unitario</th><th style="text-align: center;">Cantidad</th></tr>');
    }
    var code_product = $("#code_product").val();
    var resp = false;
    var refresh = false;
      for (var cont = 0; cont < myObject.length; cont++) {
        if (code_product == myObject[cont].id) {
          data_table.append("<tr id = " + myObject[cont].id + '><td style="text-align: center;" ' + ">" + myObject[cont].id + "</td><td>" + myObject[cont].code + '</td><td style="text-align: center;">' + myObject[cont].name + '</td><td style="text-align: center;">' + myObject[cont].price  + '</td><td style="text-align: center;">' + myObject[cont].amount + "</td></tr>");
          $("#code_product").val("");
          resp = true;
          break;
        }
      }
    if (resp === false) {
      showAlertMessage("danger");
      $("#code_product").val("");
    }
  });

$("#add_btn").click(function () {
  showAlertMessage("danger");
});


})(jQuery);
