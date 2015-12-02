
var allegedRC4 = new AllegedRC4();
var base64 = new Base64();
var database = new DataBase();
var generator = new Generatorcontrolcode();

var list = database.getTable("5000CasosPruebaCCVer7",'',0);




QUnit.test("Las_5000_pruebas_codigocontrol", function( assert ) {
  var i;
  var x;
  var fecha
  for(i = 0; i < list.length; i++)
  {
    x = list[i][4];
    if(x.indexOf(',') != -1)
    {
      x = x.replace(",", ".");
    }
    //NRO. AUTORIZACION|NRO. FACTURA|NIT/CI|FECHA EMISION|MONTO FACTURADO|LLAVE DOSIFICACION|5 VERHOEFF|CADENA|SUMATORIA PRODUCTOS|BASE64|CODIGO CONTROL
    //function(number_authorization1, number_bill1, nitci_client1, date1, total1, dosage_key1)
    fecha = list[i][3].split("/");
    resultado = generator.generatecontrolcode(parseInt(list[i][0]), parseInt(list[i][1]), parseInt(list[i][2]), list[i][3], x, list[i][5]);
    assert.ok(list[i][10] == resultado, resultado + " --- " + list[i][10] );
  }
});

/*QUnit.test("Las_5000_pruebas_verhoeff_de_5", function( assert ) {
  var i;
  var x;
  var fecha
  for(i = 0; i < list.length; i++)
  {
    x = list[i][4];
    if(x.indexOf(',') != -1)
    {
      x = x.replace(",", ".");
    }

    //NRO. AUTORIZACION|NRO. FACTURA|NIT/CI|FECHA EMISION|MONTO FACTURADO|LLAVE DOSIFICACION|5 VERHOEFF|CADENA|SUMATORIA PRODUCTOS|BASE64|CODIGO CONTROL
    //function(number_bill1, nitci_client1, date1, total1)
    fecha = list[i][3].split("/");
    fecha = generator.conver_date_to_literal(new Date(fecha[0], fecha[1], fecha[2], 1, 1, 1, 1))
    resultado = generator.generatestep1(parseInt(list[i][1]), parseInt(list[i][2]), fecha, x);
    assert.ok(list[i][6] == resultado, resultado + " --- " + list[i][6] );
  }
});


QUnit.test("Pruebas_integración", function( assert ) {
  resultado = generator.generatecontrolcode(29040011007, 1503, 4189179011, new Date(2007, 07, 02, 1, 1, 1, 1), "2500", "9rCB7Sv4X29d)5k7N%3ab89p-3(5[A");
  assert.ok("6A-DC-53-05-14" == resultado, resultado );
  resultado = generator.generatecontrolcode(79040011859, 152, 1026469026, new Date(2007, 07, 28, 1, 1, 1, 1), "135", "A3Fs4s$)2cvD(eY667A5C4A2rsdf53kw9654E2B23s24df35F5");
  assert.ok("FB-A6-E4-78" == resultado, resultado );
  resultado = generator.generatecontrolcode(20040010113, 665, 1004141023, new Date(2007, 01, 08, 1, 1, 1, 1), "905.23", "442F3w5AggG7644D737asd4BH5677sasdL4%44643(3C3674F4");
  assert.ok("71-D5-61-C8" == resultado, resultado );
  resultado = generator.generatecontrolcode(1904008691195, 978256, 0, new Date(2008, 02, 01, 1, 1, 1, 1), "26006", "pPgiFS%)v}@N4W3aQqqXCEHVS2[aDw_n%3)pFyU%bEB9)YXt%xNBub4@PZ4S9)ct");
  assert.ok("62-12-AF-1B" == resultado, resultado );
  resultado = generator.generatecontrolcode(10040010640, 9901, 1035012010, new Date(2007, 08, 13, 1, 1, 1, 1), "451.49", "DSrCB7Ssdfv4X29d)5k7N%3ab8p3S(asFG5YU8477SWW)FDAQA");
  assert.ok("6A-50-31-01-32" == resultado, resultado );
  resultado = generator.generatecontrolcode(30040010595, 10015, 953387014, new Date(2007, 08, 25, 1, 1, 1, 1), "5725.90", "33E265B43C4435sdTuyBVssD355FC4A6F46sdQWasdA)d56666fDsmp9846636B3");
  assert.ok("A8-6B-FD-82-16" == resultado, resultado );

});

QUnit.test("Pruebas que no pasan", function( assert ) {
  var i = 8;
  var x;
  var fecha
  x = list[i][4];
  if(x.indexOf(',') != -1)
  {
    x = x.replace(",", ".");
  }

  //NRO. AUTORIZACION|NRO. FACTURA|NIT/CI|FECHA EMISION|MONTO FACTURADO|LLAVE DOSIFICACION|5 VERHOEFF|CADENA|SUMATORIA PRODUCTOS|BASE64|CODIGO CONTROL
  //function(number_authorization1, number_bill1, nitci_client1, date1, total1, dosage_key1)

  resultado = generator.generatecontrolcode(parseInt(list[i][0]), parseInt(list[i][1]), parseInt(list[i][2]), list[i][3] , x, list[i][5]);
  assert.ok(list[i][10] == resultado, resultado + " --- " + list[i][10] );
});*/

QUnit.test("Verificar_base64", function( assert ) {
  resultado = base64.encode("19058106");
  assert.ok("18isw" == resultado, resultado );
  resultado = base64.encode("14142416");
  assert.ok("rylG" == resultado, resultado );
});

QUnit.test("Verificar_calculos_matemáticos_paso5", function( assert ) {
  resultado = generator.multiply_and_div(7720,1548,8);
  assert.ok(1493820 == resultado, resultado );
  resultado = generator.multiply_and_div(7720,1565,3);
  assert.ok(4027266 == resultado, resultado );
});

QUnit.test("Verificar_sumatoria_ascii_con_saltos_paso4", function( assert ) {
  resultado = generator.convert_ascii_with_jumps("69DD0A42536C9900C4AE6484726C122ABdatabaseF95D80A4BA403FB7834B3EC2A88595E2149A3D965923BA4547B42B9528AAE7B8CFB9996BA2B58516913057C9D791B6B748A",1);
  assert.ok("1548" == resultado, resultado );
  resultado = generator.convert_ascii_with_jumps("69DD0A42536C9900C4AE6484726C122ABdatabaseF95D80A4BA403FB7834B3EC2A88595E2149A3D965923BA4547B42B9528AAE7B8CFB9996BA2B58516913057C9D791B6B748A",5);
  assert.ok("1530" == resultado, resultado );
});

QUnit.test("Verificar_funcionamiento_AllegedRC4", function( assert ) {
  resultado = allegedRC4.encrypt("290400110079rCB7Sv4150312X24189179011589d)5k7N2007070201%3a250031b8","9rCB7Sv4X29d)5k7N%3ab89p-3(5[A71621");
  assert.ok("69DD0A42536C9900C4AE6484726C122ABdatabaseF95D80A4BA403FB7834B3EC2A88595E2149A3D965923BA4547B42B9528AAE7B8CFB9996BA2B58516913057C9D791B6B748A" == resultado, resultado );
});

QUnit.test("Verificar_aumentar_en_1_verhoff_de_5_caracteres", function( assert ) {
  resultado = generator.sum1toverhoeffsum("71621");


  assert.ok( 8 == resultado[0], resultado[0] );
  assert.ok( 2 == resultado[1], resultado[1] );
  assert.ok( 7 == resultado[2], resultado[2] );
  assert.ok( 3 == resultado[3], resultado[3] );
  assert.ok( 2 == resultado[4], resultado[4] );
});

QUnit.test("Verificar_genera_verhoff_paso1_guia", function( assert ) {
  resultado = generator.generatestep1(1503, 4189179011, 20070702, 2500);
  assert.ok( "71621" == resultado, resultado );

  resultado = generator.generatestep1(665, 1004141023, 20070108, "905,23");
  assert.ok( "45644" == resultado, resultado );
});

QUnit.test("Verificar_genera_datos_con_datos_dia_y_mes_mayor_2_dígitos", function( assert ) {
  fecha = "2015/10/10"
  assert.ok( "20151010" == generator.conver_date_to_literal(fecha), generator.conver_date_to_literal(fecha) );
});

QUnit.test("Verificar_genera_datos_con_datos_dia_y_mes_menor_2_dígitos", function( assert ) {
  fecha = "2015/08/08"
  assert.ok( "20150808" == generator.conver_date_to_literal(fecha), generator.conver_date_to_literal(fecha) );
});

QUnit.test("Verificar_genera_datos_con_datos_dia_menor_2_dígitos", function( assert ) {
  fecha = "2015/10/08"
  assert.ok( "20151008" == generator.conver_date_to_literal(fecha), generator.conver_date_to_literal(fecha) );
});

QUnit.test("Verificar_genera_datos_con_datos_mes_menor_2_dígitos", function( assert ) {
  fecha = "2015/08/12"
  assert.ok( "20150812" == generator.conver_date_to_literal(fecha), generator.conver_date_to_literal(fecha) );
});
