/* global DataBase */

var fs = require('fs');
var total = 0;
var db = new DataBase();
var myObject = db.getTable("products",'\\views\\sales',2);
if(localStorage.getItem('reload')==1)
{
  showAlertMessage("successSale");
  $("#alertMessage").show();
  localStorage.removeItem('reload');
}
// {document.getElementById("btn_cancel").style.display="none";}
// {document.getElementById("btn_confirm").style.display="none";}

function showAlertMessage(tipeMessage)
{
  $("#alertMessage").removeClass();
  if(tipeMessage=="success"){
    $("#alertMessage").addClass("alert alert-dismissible alert-success");
    $("#alertMessage")[0].innerHTML='<p>El producto fue a&ntilde;adido exitosamente.</p>';
  }
  else if (tipeMessage=="successSale"){
    $("#alertMessage").addClass("alert alert-dismissible alert-success");
    $("#alertMessage")[0].innerHTML='<p>La venta se realiz&oacute; correctamente.</p>';
  }
  else if (tipeMessage=="warning"){
    $("#alertMessage").addClass("alert alert-dismissible alert-warning");
    $("#alertMessage")[0].innerHTML='<p>El producto no se encuentra disponible, pero se a&ntilde;adi&oacute; a la venta.</p>';
  }
  else if (tipeMessage=="warningAmount"){
    $("#alertMessage").addClass("alert alert-dismissible alert-danger");
    $("#alertMessage")[0].innerHTML='<p>La cantidad del producto debe ser mayor a 0.</p>';
  }
  else{
    $("#alertMessage").addClass("alert alert-dismissible alert-danger");
    $("#alertMessage")[0].innerHTML='<p>El producto no existe.</p>';
  }
  $("#alertMessage").show();
}

(function ($) {

  $('#form1').on('submit', function (event) {
    $("#alertMessage").hide();
    event.preventDefault();
    var data_table = $("#tblDatos");
    var code_product = $("#code_product").val();
    var amount_product = $("#amount_product").val();
    var resp = false;

    if(amount_product > 0){
      for (var cont = 0; cont < myObject.length; cont++) {
        if (code_product == myObject[cont].code) {
          data_table.append("<tr id = " + myObject[cont].code + '><td style="text-align: center;" ' + ">" + myObject[cont].code + "</td><td>" + myObject[cont].name + '</td><td style="text-align: center;">' + amount_product + '</td><td style="text-align: center;">' + myObject[cont].price * amount_product + '</td><td><button class="btn btn-danger btn-sm" onclick=' + "fnselect(" + myObject[cont].code + ")" + ">" + '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' + "</button></td></tr>");
          myObject[cont].amount = myObject[cont].amount - amount_product;
          total = total + parseInt(myObject[cont].price * amount_product);
          $("#btn_confirm").show();
          $("#btn_cancel").show();
          $("#total").text(total);
          $("#code_product").val("");
          $("#amount_product").val("");
          showAlertMessage("success");

          if (myObject[cont].amount <= 0) {
            showAlertMessage("warning");
          }
          resp = true;
          break;
        }
      }
      }
      else {
        showAlertMessage("warningAmount");
        $("#code_product").val("");
        $("#amount_product").val("");
        resp = true;
      }

    if (resp === false) {
      $('#btn_cancelAndAccept')[0].innerHTML="Aceptar";
      $("#modalTitleMessageDanger")[0].innerHTML='Alerta - El producto no existe!';
      $("#modalBodyMessageDanger")[0].innerHTML='<p> El producto que desea agregar a la venta no existe.</p>';
      $('#myDangerModal').modal('show');
      showAlertMessage("danger");

    }
  });
/////////////////////////////////////////

  $('#form2').on('submit', function (event) {
    $("#alertMessage").hide();
    event.preventDefault();
    var data_table = $("#tblDatosBuscados");
    var code_product = $("#search_product").val();
    var resp = false;
    var nombre = "add_btn";

if(code_product.length != 0){
    for (var cont = 0; cont < myObject.length; cont++) {
      //if (code_product == myObject[cont].name) {

      if (myObject[cont].name.search(code_product)!=-1 ) {

        data_table.append("<tr id = " + myObject[cont].name + "><td  " + ">" + myObject[cont].code + "</td><td>" + myObject[cont].name + "</td><td>" + 1 + "</td><td>" + myObject[cont].price + "</td><td><button id = " + nombre +  ">" + "anadir" + "</button></td></tr>");
        //myObject[cont].amount = myObject[cont].amount - 1;
        //total = total + parseInt(myObject[cont].price);
        {document.getElementById("btn_cancel").style.display="block";}



        resp = true;
        //break;
      }
    }
    if (resp == false) {
      $('#myDangerModal').modal('show');
      showAlertMessage("danger");
    }
  }
}

);

/////////////////////////////////////
$("#add_btn").click(function () {
  showAlertMessage("danger");

  //  var mySales = db.getTable("sales",'\\views\\sales',2);
    //var date = new Date().toUTCString();
  //  var size = mySales.length;
    //var sale = { "id": size + 1, "date": date, "total": total };
    //mySales.push(sale);
    //db.putTable("sales", mySales,'\\views\\sales',2);
    //db.putTable("products", myObject,'\\views\\sales',2);
    //location.reload();
    //localStorage.setItem('reload',1);
});
  $("#btn_confirm").click(function () {
      var mySales = db.getTable("sales",'\\views\\sales',2);
      var date = new Date().toUTCString();
      var size = mySales.length;
      var sale = { "id": size + 1, "date": date, "total": total };
      mySales.push(sale);
      db.putTable("sales", mySales,'\\views\\sales',2);
      db.putTable("products", myObject,'\\views\\sales',2);
      location.reload();
      localStorage.setItem('reload',1);
  });

  $("#btn_cancel").click(function(){
    $('#myDangerModal').modal('show');
    $("#modalTitleMessageDanger")[0].innerHTML='Alerta - Esta apunto de cancelar una venta!';
    $("#modalBodyMessageDanger")[0].innerHTML='<p> ¿Esta seguro que desea cancelar la venta actual? </p>';
    $('#btn_cancelAndAccept')[0].innerHTML="Cancelar";
    $('#btn_cancelSale')[0].innerHTML="Aceptar";
    $("#btn_cancelSale").show();
      // if(confirm("¿Esta seguro de cancelar la venta?")){
      //     location.reload();
      // }
      // else{
      //     alert("no se cancelo la venta");
      //     return false;
      // }
  });

  $("#btn_cancelSale").click(function(){
    location.reload();
  });

})(jQuery);

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


function fnselect(value) {
  var fs = require('fs');
  dir = getpathproyect('\\views\\sales',2);
  fs.readFile(dir + converpath('\\bd\\products.json',2), function (err, products) {
    if (err)
      throw err;

    for (var cont = 0; cont < myObject.length; cont++) {
      if (value == myObject[cont].code) {
        myObject[cont].amount = myObject[cont].amount + 1;
        total = total - parseInt(myObject[cont].price);
        $("#total").text(total);
      }
    }



  });
  var element = document.getElementById(value);
  element.remove();
  var rowCount = $('#tblDatos tr').length;
  if(rowCount-1===0){
    $("#btn_confirm").hide();
    $("#btn_cancel").hide();
  }
}
