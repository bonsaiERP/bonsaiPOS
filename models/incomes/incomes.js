window.$ = window.jQuery = require('../../libs/jquery.min.js');
  var fs = require('fs');

  var database = new DataBase();
  var resp = false;
  function showAlertMessage(tipeMessage)
  {
    $("#alertMessage").removeClass();
    if(tipeMessage=="successProductUpdate"){
      $("#alertMessage").addClass("alert alert-dismissible alert-success");
      $("#alertMessage")[0].innerHTML='<p>Los datos de la empresa fueron actualizados exitosamente.</p>';
    }
    else{
      $("#alertMessage").addClass("alert alert-dismissible alert-danger");
      $("#alertMessage")[0].innerHTML='<p>Error al Actualizar los datos de la empresa.</p>';
    }
  }

  function addDaysToDate(date,days){
    var d = new Date(date);

    var  miliseconds=parseInt(35*24*60*60*1000);
    var n = d.getDate();
    var day=d.getDate();

    var month=d.getMonth()+1;
    var  year=d.getFullYear();

    time=d.getTime();

    miliseconds=parseInt(days*24*60*60*1000);

    date=d.setTime(time+miliseconds);
    date= new Date(date);
    day=date.getDate();
    month=date.getMonth()+1;
    year=date.getFullYear();
    return  year + "/" + month + "/" + day;

  }

  $(document).ready(function () {
  $("#update_incomes").click(function () {
    var data;
    user = database.getTable('token','',2);
    sales = database.getTable('sales','',2);
    saleProducts = database.getTable('saleProducts','',2);
    //generar cadena para json
    var product;
    var products=[];
    var date=new Date();
    var auxDateThreeDatesMore=new Date();
    $('#progressbardiv').show();
    $('#progressbar-2').animate({ width: '100%' }, 1, 'linear').html("Cargando...");
    for (var cont=0;cont<sales.length;cont++){

      if(sales[cont].sync===false){
        products=[];
      for (var cont2=0;cont2<saleProducts.length;cont2++){
            if(sales[cont].id===saleProducts[cont2].sale_id){
            sales[cont].sync=true;
              date=Date.parse(sales[cont].date);
            resp=true;
             product = { "item_id": parseInt(saleProducts[cont2].product_id), "price":parseInt(saleProducts[cont2].price), "quantity":parseInt(saleProducts[cont2].quantity), "description": saleProducts[cont2].name};
             products.push(product);
            }
      }
          data= JSON.stringify(products);
          auxDateThreeDatesMore=date;
          date=addDaysToDate(date,0);
          auxDateThreeDatesMore= addDaysToDate(auxDateThreeDatesMore,3);
          data=eval("("+ data + ")" );
    //enviar la cadena json a erp
    $.ajax({
      headers: {token: user[0].token},
      method: "POST",
      url: "http://catolica.bonsaierp.com:3000/api/v1/incomes",
      data: {
        income: {
        "date":date,
        "due_date":auxDateThreeDatesMore,
        "contact_id":1,
        "currency":"BOB",
        "description":"Prueba ingreso",
        "income_details_attributes":
        data}
      }
    })
    .done(function(resp) {
      setTimeout(function(){
        alert("Los datos de la empresa fueron actualizados exitosamente.");
        $('#progressbar-2').html("Descarga Completa.");
      }, 1000);
    })
    .fail(function (ajaxContext){
     alert("Error al Actualizar los datos de la empresa");
   $('#progressbar-2').html("Error en la Descarga.");
   });
  }

 }
 if(resp === true){
   alert("Las  de ventas de la empresa fueron actualizados exitosamente");
 }
 else {
   alert("No se tiene ninguna  nueva venta para sincronizar");
 }
     database.putTable('sales',sales,'',2);
   });

 });
