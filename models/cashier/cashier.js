window.$ = window.jQuery = require('../../libs/jquery.min.js');
var fs = require('fs');

define(["database"], function(database) {

//intente llamar aca al archivo daySales.js pero no da, esto para no repetir codigo que ya existe
//en otras palabras quice reusar codigo de este archivo !!!
//var daySales = '../reports/daySales.js';
//document.write('<script src="../reports/daySales.js" type="text/javascript"></script>');

  var database = database.DataBase();
  var general_list_of_sales = database.getTable("sales",'\\views\\cashier',2);
  var myCashiers = database.getTable("cashier",'\\views\\cashier',2);
  //intente llamar aca al archivo daySales.js pero no da, esto para no repetir codigo que ya existe
  //en otras palabras quice reusar codigo de este archivo !!!
  //var daySales = '../reports/daySales.js';
  //document.write('<script src="../reports/daySales.js" type="text/javascript"></script>');

  function showAlertMessage(tipeMessage)
  {
    $("#alertMessage").removeClass();
    if(tipeMessage=="success"){
      $("#alertMessage").addClass("alert alert-dismissible alert-success");
      $("#alertMessage")[0].innerHTML='<p>El monto en caja fue a&ntilde;adido exitosamente.</p>';
    }
    else if (tipeMessage=="warningAmount"){
      $("#alertMessage").addClass("alert alert-dismissible alert-danger");
      $("#alertMessage")[0].innerHTML='<p>Se produjo un error al procesar el cierre de caja.</p>';
    }
    $("#alertMessage").show();
  }

  (function ($) {

    $('#form1').on('submit', function (event) {
      $("#alertMessage").hide();
      event.preventDefault();
      var money = $("#money").val();
      if(money > 0){
         create_cashier(money);
         location.href = "../../index.html";
      }else {
         showAlertMessage("warningAmount");
      }
    });

    $("#btn_confirm").click(function () {
        var total_cash = data_cashier();
        if(total_cash > 0){
          close_cashier(total_cash);
          location.href = "../../views/cashier/opencashier.html";
        }else {
          showAlertMessage("warningAmount");
        }
    });
  })(jQuery);

  function convertdatetoformatofso(date){
    return new Date(date);
  }

  function returnlistofsalesofdatecashier(date){
  var general_list_of_sales = database.getTable("sales",'\\views\\cashier',2);
  var myCashiers = database.getTable("cashier",'\\views\\cashier',2);
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var result = [];
  for (i = 0; i < general_list_of_sales.length; i++) {
    var aux = convertdatetoformatofso(general_list_of_sales[i].date);
    if(aux.getDate() == day && aux.getMonth() == month && aux.getFullYear() == year)
    {
      result.push(general_list_of_sales[i]);
    }
  }
    return result;
  }

  function gettotalofsalescashier(list_of_sales,date_open){
    var tot = 0;
    for (var cont = 0; cont < list_of_sales.length; cont++) {
      if( thehighttimecashier( convertdatetoformatofso(date_open),convertdatetoformatofso( list_of_sales[cont].date) ) )
      {
        tot = tot + list_of_sales[cont].total;
      }
    }
    return tot;
  }

  function data_cashier(){
  var general_list_of_sales = database.getTable("sales",'\\views\\cashier',2);
  var myCashiers = database.getTable("cashier",'\\views\\cashier',2);
  var ultimo = myCashiers.length-1;
  monto = myCashiers[ultimo].money_open;
  $("#monto").text(monto);
  var list_of_sales = returnlistofsalesofdatecashier(new Date());
  total_daySales = gettotalofsalescashier(list_of_sales,myCashiers[ultimo].date_open);
  $("#totalSales").text(total_daySales);
  total = parseInt(monto) + parseInt(total_daySales);
  $("#total").text(total);
  return total;
}

  function thehighttimecashier(time1,time2){
  var aux1 = time1.getFullYear();
  var aux2 = time2.getFullYear();
  if(aux2 != aux1){
    if(aux2 > aux1){
      return true;
    }
    else{
      return false;
      }
    }
    aux1 = time1.getMonth();
    aux2 = time2.getMonth();
    if(aux2 != aux1){
      if(aux2 > aux1){
        return true;
      }
      else{
        return false;
      }
    }
    aux1 = time1.getDate();
    aux2 = time2.getDate();
    if(aux2 != aux1){
      if(aux2 > aux1){
        return true;
      }
      else{
        return false;
      }
    }
    aux1 = time1.getHours();
    aux2 = time2.getHours();
    if(aux2 != aux1){
      if(aux2 > aux1){
        return true;
      }
      else{
        return false;
      }
    }
    aux1 = time1.getMinutes();
    aux2 = time2.getMinutes();
    if(aux2 != aux1){
      if(aux2 > aux1){
        return true;
      }
      else{
        return false;
      }
    }
    aux1 = time1.getSeconds();
    aux2 = time2.getSeconds();
    if(aux2 > aux1){
      return true;
    }
    else {
      return false;
    }
  }

  function getpathproyect(todelete,cant_of_breakbar)
  {
    actualdir = __dirname
    /*34 es ascii de '\', la primera comparación ve si pertenece el path a windows,
    si pertenece a windows, no hace nada, caso contrario, lo cambia a '/'
    */
    if(actualdir.search('/') != -1){
      for(i = 0; i < cant_of_breakbar; i++){
        todelete = todelete.replace(String.fromCharCode(92),'/');
      }
    }
    actualdir = actualdir.replace(todelete,'');
    return actualdir;
  }

  function converpath(toconvert,cant_of_breakbar){
    actualdir = __dirname
    /*34 es ascii de '\', la primera comparación ve si pertenece el path a windows,
    si pertenece a windows, no hace nada, caso contrario, lo cambia a '/'
    */
    if(actualdir.search('/') != -1){
      for(i = 0; i < cant_of_breakbar; i++){
        toconvert = toconvert.replace(String.fromCharCode(92),'/');
      }
    }
    return toconvert;
    }

    function create_cashier(money){
      var general_list_of_sales = database.getTable("sales",'\\views\\cashier',2);
      var myCashiers = database.getTable("cashier",'\\views\\cashier',2);
      var cashier = {"date_open": new Date().toUTCString(), "money_open": money, "date_close": "...", "money_close": "..."};
      myCashiers.push(cashier);
      database.putTable("cashier", myCashiers,'\\views\\cashier',2);
    }
  }

  function create_cashier(money){
    var cashier = {"date_open": new Date().toUTCString(), "money_open": money, "date_close": "...", "money_close": "..."};
    myCashiers.push(cashier);
    database.putTable("cashier", myCashiers,'\\views\\cashier',2);
  }

  function exist_active_cashier(todelete,cant_of_breakbar){
    var myCashiers = database.getTable("cashier",todelete,cant_of_breakbar);
    var ultimo = myCashiers.length-1;
    if(ultimo != -1 && myCashiers[ultimo].date_close == "..."){
      return true;
    }
    else{
      return false;
    }
  }

  function close_cashier(money){
  var general_list_of_sales = database.getTable("sales",'\\views\\cashier',2);
  var myCashiers = database.getTable("cashier",'\\views\\cashier',2);
  var ultimo = myCashiers.length-1;
  myCashiers[ultimo].date_close = new Date().toUTCString();
  myCashiers[ultimo].money_close = money;
  database.putTable("cashier", myCashiers,'\\views\\cashier',2);
}
});
