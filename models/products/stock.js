/* global DataBase */
  window.$ = window.jQuery = require('../../libs/jquery.min.js');
  var fs = require('fs');
  var database = new DataBase();
  var myObject = database.getTable("products",'\\views\\products',2);
  var products = [];
  getProducts();
  function getpathproyect(todelete,cant_of_breakbar)
  {
    actualdir = __dirname;
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
    actualdir = __dirname;
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
    if(tipeMessage=="warning"){
      $("#alertMessage").addClass("alert alert-dismissible alert-danger");
      $("#alertMessage")[0].innerHTML='<p>Debe ingresar el nombre o codigo del producto.</p>';
    }
    $("#alertMessage").show();
  }

  (function ($) {
    $('#formStock').on('submit', function (event) {
      $("#alertMessage").hide();
      event.preventDefault();
      var data_table = $("#tblDatos");
      var code_product = $("#code_product").val();
      var resp = false;

      //Vaciar la tabla
      if(data_table.length > 0){
        data_table.empty();
        data_table.append('<tr ><th style="text-align: center;">C&oacute;digo</th><th style="text-align: center;">Nombre del producto</th><th style="text-align: center;">Precio Unitario</th><th style="text-align: center;">Cantidad</th></tr>');
      }
      //Verificar si el text box no esta vacio
      if (code_product !== "") {
        //Verificar si el codigo del producto no nombre del producto
        if(Number(code_product) !== true){
          for (var cont = 0; cont < myObject.length; cont++) {
            if (code_product === myObject[cont].name) {
               code_product = myObject[cont].id;
            }
          }

        }
        //realizar la busqueda del producto en stock
        for (var cont = 0; cont < myObject.length; cont++) {
          if (code_product == myObject[cont].id) {
            data_table.append("<tr id = " + myObject[cont].id + '><td style="text-align: center;" ' + ">" + myObject[cont].code + '</td><td style="text-align: center;">' + myObject[cont].name + '</td><td style="text-align: center;">' + myObject[cont].price  + '</td><td style="text-align: center;">' + myObject[cont].amount + "</td></tr>");
            $("#code_product").val("");
            resp = true;
            break;
          }
        }
        //en caso de no encontrar el producto mostrar mensaje
        if (resp === false) {
          showAlertMessage("danger");
          $("#code_product").val("");
        }
      }
      else {
        showAlertMessage("warning");
      }
    });

  })(jQuery);

  function getProducts() {
    i = 0;
    for (var cont = 0; cont < myObject.length; cont++) {
      products[i] = myObject[cont].name;
      i++;
    }
  }

  $(document).ready(function() {
  		$('#code_product').autocomplete({
  			source: products
  		});
});
