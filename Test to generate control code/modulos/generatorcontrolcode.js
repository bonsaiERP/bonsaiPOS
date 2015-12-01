var fs = require('fs');

var Generatorcontrolcode = function () {

  var verhoeff = new Verhoeff();
  var allegedRC4 = new AllegedRC4();
  var base64 = new Base64();
  var verhoeffsum;
  var number_authorization;
  var number_bill;
  var nitci_client;
  var date;
  var total;
  var dosage_key;
  var concat_string;
  var cypher_key;
  var allegedRC4result;
  var sum_1;
  var sum_2;
  var sum_3;
  var sum_4;
  var sum_5;
  var sum_tot;
  var base64result;
  var result_secure_key;


  function generatecycliverhoeff(number, count)
  {
    resu = String(number);
    tot = "";
    for(i = 0; i < count; i++)
    {
      aux = verhoeff.generate(resu)
      tot = tot + aux;
      resu = resu + aux;
    }
    return tot;
  }

  this.sum1toverhoeffsum = function(verhoeffsum)
  {
    resu = [0,0,0,0,0];
    resu[0] = parseInt(verhoeffsum[0]) + 1;
    resu[1] = parseInt(verhoeffsum[1]) + 1;
    resu[2] = parseInt(verhoeffsum[2]) + 1;
    resu[3] = parseInt(verhoeffsum[3]) + 1;
    resu[4] = parseInt(verhoeffsum[4]) + 1;
    return resu;
  }
  function sum1toverhoeffsum(verhoeffsum)
  {
    resu = [0,0,0,0,0];
    resu[0] = parseInt(verhoeffsum[0]) + 1;
    resu[1] = parseInt(verhoeffsum[1]) + 1;
    resu[2] = parseInt(verhoeffsum[2]) + 1;
    resu[3] = parseInt(verhoeffsum[3]) + 1;
    resu[4] = parseInt(verhoeffsum[4]) + 1;
    return resu;
  }

  this.conver_date_to_literal = function(date)
  {
    date = date.split("/");
    result = "";
    result = result+date[0];
    result = result+date[1];
    result = result+date[2];
    return result;
  }
  function conver_date_to_literal(date)
  {
    date = date.split("/");
    result = "";
    result = result+date[0];
    result = result+date[1];
    result = result+date[2];
    return result;
  }

  this.convert_ascii_with_jumps = function(mesage,start_in)
  {
    result = 0;
    i = 0 + (start_in-1);
    while(i < mesage.length)
    {
      result = result + mesage.charCodeAt(i);
      i = i + 5;
    }
    return result;
  }
  function convert_ascii_with_jumps(mesage,start_in)
  {
    result = 0;
    i = 0 + (start_in-1);
    while(i < mesage.length)
    {
      result = result + mesage.charCodeAt(i);
      i = i + 5;
    }
    return result;
  }

  this.multiply_and_div = function(sum_tot, sum, number_to_div)
  {
    result = sum_tot * sum;
    result = result / number_to_div;
    result = Math.floor(result);
    return result;
  }
  function multiply_and_div(sum_tot, sum, number_to_div)
  {
    result = sum_tot * sum;
    result = result / number_to_div;
    result = Math.floor(result);
    return result;
  }


  this.generatestep1 = function(number_bill1, nitci_client1, date1, total1)
  {
    number_bill = number_bill1 + generatecycliverhoeff(number_bill1,2);
    nitci_client = nitci_client1  + generatecycliverhoeff(nitci_client1,2);
    date = date1 + generatecycliverhoeff(date1,2);
    total = String(parseInt(total1)) + generatecycliverhoeff(parseInt(total1),2);
    verhoeffsum = parseInt(number_bill) + parseInt(nitci_client) + parseInt(date) + parseInt(total);
    verhoeffsum = String(verhoeffsum);
    verhoeffsum = generatecycliverhoeff(verhoeffsum,5);
    return verhoeffsum;
  }
  function generatestep1()
  {
    number_bill = number_bill + generatecycliverhoeff(number_bill,2);
    nitci_client = nitci_client  + generatecycliverhoeff(nitci_client,2);
    date = date + generatecycliverhoeff(date,2);
    total = String(Math.round(total)) + generatecycliverhoeff(Math.round(total),2);
    verhoeffsum = parseInt(number_bill) + parseInt(nitci_client) + parseInt(date) + parseInt(total);
    verhoeffsum = String(verhoeffsum);
    verhoeffsum = generatecycliverhoeff(verhoeffsum,5);
  }


  this.generatestep2 = function()
  {
    var newverhoeffsum = sum1toverhoeffsum(verhoeffsum);
    var aux = parseInt(newverhoeffsum[0]);
    var aux1 = 0
    number_authorization = number_authorization + dosage_key.substr(aux1,aux);
    aux1 = aux1+aux;
    aux = parseInt(newverhoeffsum[1]);
    number_bill = number_bill + dosage_key.substr(aux1,aux);
    aux1 = aux+aux1;
    aux = parseInt(newverhoeffsum[2]);
    nitci_client = nitci_client + dosage_key.substr(aux1,aux);
    aux1 = aux+aux1;
    aux = parseInt(newverhoeffsum[3]);
    date = date + dosage_key.substr(aux1,aux);
    aux1 = aux+aux1;
    aux = parseInt(newverhoeffsum[4]);
    total = total + dosage_key.substr(aux1,aux);
  }
  function generatestep2()
  {
    var newverhoeffsum = sum1toverhoeffsum(verhoeffsum);
    var aux = parseInt(newverhoeffsum[0]);
    var aux1 = 0
    number_authorization = number_authorization + dosage_key.substr(aux1,aux);
    aux1 = aux1+aux;
    aux = parseInt(newverhoeffsum[1]);
    number_bill = number_bill + dosage_key.substr(aux1,aux);
    aux1 = aux+aux1;
    aux = parseInt(newverhoeffsum[2]);
    nitci_client = nitci_client + dosage_key.substr(aux1,aux);
    aux1 = aux+aux1;
    aux = parseInt(newverhoeffsum[3]);
    date = date + dosage_key.substr(aux1,aux);
    aux1 = aux+aux1;
    aux = parseInt(newverhoeffsum[4]);
    total = total + dosage_key.substr(aux1,aux);
  }



  this.generatestep3 = function()
  {
    concat_string = number_authorization + number_bill + nitci_client + date + total;
    cypher_key = dosage_key + verhoeffsum;
    allegedRC4result = allegedRC4.encrypt(concat_string,cypher_key);
  }
  function generatestep3()
  {
    concat_string = number_authorization + number_bill + nitci_client + date + total;
    cypher_key = dosage_key + verhoeffsum;
    allegedRC4result = allegedRC4.encrypt(concat_string,cypher_key);
  }

  this.generatestep4 = function()
  {
    sum_1 = convert_ascii_with_jumps(allegedRC4result,1);
    sum_2 = convert_ascii_with_jumps(allegedRC4result,2);
    sum_3 = convert_ascii_with_jumps(allegedRC4result,3);
    sum_4 = convert_ascii_with_jumps(allegedRC4result,4);
    sum_5 = convert_ascii_with_jumps(allegedRC4result,5);
    sum_tot = sum_1 + sum_2 + sum_3 + sum_4 + sum_5;

  }
  function generatestep4()
  {
    sum_1 = convert_ascii_with_jumps(allegedRC4result,1);
    sum_2 = convert_ascii_with_jumps(allegedRC4result,2);
    sum_3 = convert_ascii_with_jumps(allegedRC4result,3);
    sum_4 = convert_ascii_with_jumps(allegedRC4result,4);
    sum_5 = convert_ascii_with_jumps(allegedRC4result,5);
    sum_tot = sum_1 + sum_2 + sum_3 + sum_4 + sum_5;
  }

  this.generatestep5 = function()
  {
    var newverhoeffsum = sum1toverhoeffsum(verhoeffsum);
    var aux = multiply_and_div(sum_tot,sum_1,newverhoeffsum[0]);
    aux = aux + multiply_and_div(sum_tot,sum_2,newverhoeffsum[1]);
    aux = aux + multiply_and_div(sum_tot,sum_3,newverhoeffsum[2]);
    aux = aux + multiply_and_div(sum_tot,sum_4,newverhoeffsum[3]);
    aux = aux + multiply_and_div(sum_tot,sum_5,newverhoeffsum[4]);
    base64result = base64.encode(String(aux));
  }
  function generatestep5()
  {
    var newverhoeffsum = sum1toverhoeffsum(verhoeffsum);
    var aux = multiply_and_div(sum_tot,sum_1,newverhoeffsum[0]);
    aux = aux + multiply_and_div(sum_tot,sum_2,newverhoeffsum[1]);
    aux = aux + multiply_and_div(sum_tot,sum_3,newverhoeffsum[2]);
    aux = aux + multiply_and_div(sum_tot,sum_4,newverhoeffsum[3]);
    aux = aux + multiply_and_div(sum_tot,sum_5,newverhoeffsum[4]);
    base64result = base64.encode(String(aux));
  }


  function generatestep6()
  {
    var aux = allegedRC4.encrypt(base64result,cypher_key);
    var i=0
    result_secure_key = "";
    while(i < aux.length)
    {
      result_secure_key = result_secure_key + aux[i] + aux[i+1];
      i = i + 2;
      if(i < aux.length)
      {
        result_secure_key = result_secure_key + "-";
      }
    }
  }


  this.generatecontrolcode = function(number_authorization1, number_bill1, nitci_client1, date1, total1, dosage_key1)
  {
    number_authorization = number_authorization1;
    number_bill = number_bill1;
    nitci_client = nitci_client1;
    date = conver_date_to_literal(date1);
    total = parseFloat(total1);
    dosage_key = dosage_key1;
    generatestep1();
    generatestep2();
    generatestep3();
    generatestep4();
    generatestep5();
    generatestep6();
    return result_secure_key;
  }
}
