var fs = require('fs');
var total;
{document.getElementById("btn_cancel").style.display="none";}

(function ($) {
  // Leer
  fs.readFile('bd/products.json', function (err, products) {
    if (err) throw err;
    var myObject = eval('(' + products + ')');
     total = 0;

    $('#form1').on('submit', function (event) {

      $("#alertAddedSuccessful").hide();
      $("#alertAddedWarning").hide();
      $("#alertAddedDanger").hide();

      event.preventDefault();
      var data_table = $("#tblDatos");
      var code_product = $("#code_product").val();
      var resp = false;

      for (var cont = 0; cont < myObject.length; cont++) {
        if (code_product == myObject[cont].code) {

          data_table.append('<tr><td align="center">' + myObject[cont].code + '</td><td align="center">' + myObject[cont].name + '</td><td align="center">' + 1 + '</td><td align="center">' + myObject[cont].price + "</td></tr>");
          myObject[cont].amount = myObject[cont].amount - 1;
          total = total + parseInt(myObject[cont].price);
          $("#total").text(total);
          {document.getElementById("btn_cancel").style.display="block";}


          $("#alertAddedSuccessful").show();
          if (myObject[cont].amount <= 0){
            $('#myWarningModal').modal('show');
            $("#alertAddedSuccessful").hide();
            $("#alertAddedWarning").show();
          }
          resp = true;
          break;
        }
      }
      if (resp == false) {
        $('#myDangerModal').modal('show');
        $("#alertAddedSuccessful").hide();
        $("#alertAddedWarning").hide();
        $("#alertAddedDanger").show();
      }
    });


    $("#btn_confirm").click(function () {
      var products_number = $("#tblDatos tr").length;

      if (products_number > 1) {

        fs.readFile('bd/sales.json', function (err, sales) {
          if (err) throw err;

          var mySales = eval('(' + sales + ')');
          var date = new Date();
          var size = mySales.length;

          mySales.push({ "id": size + 1, "date": date, "total": total });
          fs.writeFileSync("bd/sales.json", JSON.stringify(mySales), 'utf8');

        });


        fs.writeFileSync("bd/products.json", JSON.stringify(myObject), 'utf8');
        alert("Exito en la venta");
        location.reload();
      } else {
        alert("Error, no existen productos en la linea de venta.");
      };
    });

  });
  $("#btn_cancel").click(function(){
      if(confirm("¿Esta seguro de cancelar la venta?")){
          location.reload();
      }
      else{
          alert("no se cancelo la venta");
          return false;
      }
  });

  })(jQuery);
