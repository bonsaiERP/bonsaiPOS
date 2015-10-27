/* global DataBase */

var fs = require('fs');
var total = 0;

var ci;

var db = new DataBase();
var myObject = db.getTable("products",'\\views\\sales',2);

if(localStorage.getItem('reload')==1)
{
  showAlertMessage("successSale");
  $("#alertMessage").show();
  localStorage.removeItem('reload');
}

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
    var amount_product = $("#amount_product").val();
    var name_product = $("#name_product").val();

    if(Number(name_product) != true){
      for (var cont = 0; cont < myObject.length; cont++) {
        if (name_product === myObject[cont].name) {
           name_product = myObject[cont].id;
        }
      }

    }
    var resp = false;

    if(amount_product > 0){
      for (var cont = 0; cont < myObject.length; cont++) {
        if (name_product == myObject[cont].id) {
          data_table.append("<tr id = " + myObject[cont].id + '><td style="text-align: center;" ' + ">" + myObject[cont].id + "</td><td>" + myObject[cont].code + '</td><td style="text-align: center;">' + myObject[cont].name + '</td><td style="text-align: center;">' +    '<input type="number" name="quantity"   style="width : 60px; heigth : 1px" min="1" id=' + myObject[cont].id  + '  value=' + amount_product +     '    >  </td><td style="text-align: center;">' + myObject[cont].price  + '</td><td style="text-align: center;">' + myObject[cont].price * amount_product + '</td><td><button class="btn btn-danger btn-sm" onclick=' + "fnselect(" + myObject[cont].id + "," + amount_product +")" + ">" + '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>' + "</button></td></tr>");
          myObject[cont].amount = myObject[cont].amount - amount_product;
          total = total + (myObject[cont].price * amount_product);
          $("#btn_confirm").show();
          $("#btn_cancel").show();
          $("#total").text(total);
          $("#name_product").val("");
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
        $("#name_product").val("");
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
    var lastQuantity = amount_product;
            $("input[id=" + myObject[cont].id + "]").change(function () {

                  if (lastQuantity > $(this).val()) {
                    myObject[cont].amount = myObject[cont].amount + $(this).val();
                    total = total - (myObject[cont].price*$(this).val());
                    $("#total").text(total);
                    lastQuantity = $(this).val();
                  }
                  if (lastQuantity < $(this).val()) {
                    myObject[cont].amount = myObject[cont].amount - amount_product;
                    total = total + (myObject[cont].price * amount_product);
                    $("#total").text(total);
                    lastQuantity = $(this).val();
                  }
                  amount_product = lastQuantity;

            });
  });
  //////////////////

  $('#btn-client').click(function(){
    event.preventDefault();
    var rowCount = $('#tblclient tr').length;
    var clients = db.getTable("users",'\\views\\sales',2);
    var client_id=0
    var aux=""
if(rowCount<1){
    name=$('#name-field').val();
    var data_table = $("#tblclient");



              for (var cont = 0; cont < clients.length; cont++) {
                aux= clients[cont].name.toString()+" "+clients[cont].lastname.toString()
                if (aux == name) {
                  client_id=clients[cont].ci

                }
                ci=client_id;
              }


      if (!$('#name-field').val()) {
        name="sin cliente"
        data_table.append("<tr style='display:none'> <td> <b> Cliente: </b></td><td>" + name +"</td><td> <b>CI:</b>"+client_id +"</td> </tr>")

      }
      else {
        data_table.append("<tr> <td> <b> Cliente: </b></td><td>" + name +"</td><td> <b>CI:</b>"+client_id +"</td> </tr>")

      }




  }
  else {


    $('#myDangerModal2').modal('show');

  }




  });
/////////////////////////////////













$("#add_btn").click(function () {
  showAlertMessage("danger");
});
  $("#btn_confirm").click(function () {

      var mySales = db.getTable("sales",'\\views\\sales',2);
      var date = new Date().toUTCString();
      var client= "sin cliente";
      var size = mySales.length;

      var id = 1;

      if ($('#name-field').val()) {
         client=document.getElementById("tblclient").rows[0].cells[1].innerText;

      }



      if(mySales.length != 0)
      {
        var aux = mySales.length;
        id = mySales[aux-1].id + 1;
      }
      var sale = { "id": id, "date": date, "total": total , "client":client};

      mySales.push(sale);
      db.putTable("sales", mySales,'\\views\\sales',2);
      db.putTable("products", myObject,'\\views\\sales',2);
      generatePDF(sale,client);
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


function fnselect(value, amount_value) {
  var fs = require('fs');
  dir = getpathproyect('\\views\\sales',2);
  fs.readFile(dir + converpath('\\bd\\products.json',2), function (err, products) {
    if (err)
      throw err;

    for (var cont = 0; cont < myObject.length; cont++) {
      if (value == myObject[cont].id) {
        myObject[cont].amount = myObject[cont].amount + amount_value;
        total = total - (myObject[cont].price*amount_value);
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

$(document).ready(function() {

  var clients = db.getTable("users",'\\views\\sales',2);

  var data2 = new Array("");
  for (var cont = 0; cont < clients.length; cont++) {
    data2.push(clients[cont].name.toString()+" "+clients[cont].lastname.toString());
  }

 $("#name-field").autocomplete({ source: data2 });

  var stock = db.getTable("products",'\\views\\sales',2);

  var data = new Array("");
  for (var cont = 0; cont < myObject.length; cont++) {
    data.push(myObject[cont].name.toString());
    }
	$("#name_product").autocomplete({ source: data });
	});


function getProductsFromSalesTable()
{
  var table = document.getElementById('tblDatos')
  var products = [];
  for (var i = 1, row; row = table.rows[i]; i++) {
    row
    var product = { "id": row.cells[0].innerHTML, "code": row.cells[1].innerHTML, "name": row.cells[2].innerHTML , "quantity": String(parseInt(row.cells[5].innerHTML)/parseInt(row.cells[4].innerHTML)), "price": row.cells[4].innerHTML, "total": row.cells[5].innerHTML};
    products.push(product);
  };
  return products;
}

function getTotal()
{
  return $('#total').html();
}

function generatePDF(sale,client)
{
  var doc = new jsPDF();
  doc.setFontSize(22);
  doc.text(20, 20, 'NOTA DE VENTA');

  doc.setFontSize(16);
  doc.text(20, 30, 'FECHA: '+String(sale.date).toUpperCase());

  doc.setFontSize(18);
  doc.text(20, 40, 'DATOS DEL CLIENTE:');

  doc.setFontSize(16);
  doc.text(20, 50, 'NOMBRE: '+String(client).toUpperCase());

  doc.text(20, 60, 'CI: '+String(ci));

  var detail=getProductsFromSalesTable();

  doc.setFontSize(18);
  doc.text(20, 70, 'DETALLE');
  doc.text(20, 75, '------------');

  doc.setFontSize(16);

  var i;

  for (i = 0; i < detail.length ; i++) {
    doc.text(20, 80+60*i, 'ID:'+detail[i].id);
    doc.text(20, (80+10)+60*i, 'CODIGO: '+detail[i].code);
    doc.text(20, (80+20)+60*i, 'NOMBRE: '+detail[i].name.toUpperCase());
    doc.text(20, (80+30)+60*i, 'CANTIDAD: '+detail[i].quantity);
    doc.text(20, (80+40)+60*i, 'PRECIO: '+detail[i].price);
    doc.text(20, (80+50)+60*i, 'SUBTOTAL: '+detail[i].total);
    doc.text(20, (85+50)+60*i, '----');


  };

  doc.text(20, i*60+90, '------------');

  doc.setFontSize(18);
  doc.text(20, i*60+100, 'TOTAL: '+ sale.total);


  doc.save('NotaDeVenta'+String(sale.id)+'.pdf');
}
