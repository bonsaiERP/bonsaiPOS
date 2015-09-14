var fs = require('fs');
(function($) {
      // Leer
    fs.readFile('bd/products.json', function (err, products) {
    if (err) throw err;
    var myObject = eval('(' + products + ')');
    var total = 0;
  $('#form1').on('submit', function(event) {
      event.preventDefault();
      var tablaDatos= $("#tblDatos");
      var code_product = $("#code_product").val();
      var resp = false;
         for(var cont=0;cont<myObject.length;cont++)
         {
             if (code_product == myObject[cont].code)
             {
                 if (myObject[cont].amount <= 0) alert("Producto Agotado");
                 tablaDatos.append("<tr><td>"+myObject[cont].code+"</td><td>"+myObject[cont].name+"</td><td>"+1+"</td><td>"+myObject[cont].price+"</td></tr>");
                 myObject[cont].amount = myObject[cont].amount - 1;
                 total = total + parseInt(myObject[cont].price);
                 $("#total").text(total);
                 resp=true;
                 break;
             }
         }
             if (resp == false) alert("Producto Inexistente");

     });
});
})(jQuery);
