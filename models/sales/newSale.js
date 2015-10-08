/* global DataBase */

var fs = require('fs');
var total = 0;
var db = new DataBase();
var myObject = db.getTable("products");
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
    var resp = false;

    for (var cont = 0; cont < myObject.length; cont++) {
      if (code_product == myObject[cont].code) {
        data_table.append("<tr id = " + myObject[cont].code + '><td style="text-align: center;" ' + ">" + myObject[cont].code + "</td><td>" + myObject[cont].name + '</td><td style="text-align: center;">' + 1 + '</td><td style="text-align: center;">' + myObject[cont].price + '</td><td><button class="btn btn-danger btn-sm" onclick=' + "fnselect(" + myObject[cont].code + ")" + ">" + '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' + "</button></td></tr>");
        myObject[cont].amount = myObject[cont].amount - 1;
        total = total + parseInt(myObject[cont].price);
        $("#btn_confirm").show();
        $("#btn_cancel").show();
        $("#total").text(total);
        $("#code_product").val("");
        showAlertMessage("success");

        if (myObject[cont].amount <= 0) {
          showAlertMessage("warning");
        }
        resp = true;
        break;
      }
    }
    if (resp === false) {
      $('#btn_cancelAndAccept')[0].innerHTML="Aceptar";
      $("#modalTitleMessageDanger")[0].innerHTML='Alerta - El producto no existe!';
      $("#modalBodyMessageDanger")[0].innerHTML='<p> El producto que desea agregar a la venta no existe.</p>';
      $('#myDangerModal').modal('show');
      showAlertMessage("danger");

    }
  });

  $("#btn_confirm").click(function () {
      var mySales = db.getTable("sales");
      var date = new Date().toUTCString();
      var size = mySales.length;
      var sale = { "id": size + 1, "date": date, "total": total };
      mySales.push(sale);
      db.putTable("sales", mySales);
      db.putTable("products", myObject);
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

function fnselect(value) {
  var fs = require('fs');
  fs.readFile('bd/products.json', function (err, products) {
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
