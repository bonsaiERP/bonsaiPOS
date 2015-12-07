
var fs = require('fs');
var database = new DataBase();
var type='';
var myDosification = [];



$(document).ready(function(){




      $("#button_dosi").click(function() {
        var min = document.getElementById("minim").value;
        var max = document.getElementById("maxim").value;
        var keys = document.getElementById("key_code").value;
        var code = document.getElementById("code_verification").value;
        var dosification_info = { "id": 1, "minim": min, "maxim": max , "key_code": keys,"code_verification": code, "actual": min};
        myDosification.push(dosification_info);
        database.putTable("dosification", myDosification,'\\views\\dosification',2);
        location.reload();
        localStorage.setItem('reload',1);
        alert("Rango de dosificaccion registrada");
      });

  });
