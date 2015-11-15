var company;
var id_sale;

var nit_company;
var number_of_bill;
var number_of_authorization;

var nit_buyer;
var name_buyer;
var date_of_sell;

var detail_of_sale;
var sale;




function get_initial_data()
{
  var data = get_data('\\views\\bill',2);
  var db = new DataBase();
  company = db.getTable("organisations",'\\views\\bill',2);
  company = company[0];
  id_sale = data.id_sale;
  console.log(company);

  nit_company = company.nit;
  number_of_bill = "Aquí numero de factura a imprimir"; //Cuando se implemente la funcionalidad de obtener el numero de factura, reemplazar esto
  number_of_authorization = "Aquí numero de autorización"; //Cuando se implemente la funcionalidad de agregar numero de autorizacion, reemplazar esto

  nit_buyer = data.nit_buyer;
  name_buyer = data.name_buyer;
  date_of_sell = data.date;

  detail_of_sale = extract_detail_of_sale();
  sale = extract_sale();
}

function generatebill()
{
  var db = new DataBase();
  var list = db.getTable("bill",'\\views\\bill',2);
  var id = 1
  if(list.length != 0)
  {
    var aux = list.length;
    id = list[aux-1].id + 1;
  }
  var factura = {"id":id,"id_sale":id_sale,"nit_buyer":nit_buyer,"name_buyer":name_buyer,"nit_company":nit_company,"number_of_bill":number_of_bill,"number_of_authorization":number_of_authorization};
  list.push(factura);
  db.putTable("bill", list,'\\views\\bill',2);
  set_data_to_push("",'\\views\\bill',2);
  //El numero de autorización y de factura impresas se debe incrementar 
}

function extract_detail_of_sale()
{
  var db = new DataBase();
  var list_of_sales = db.getTable("saleProducts",'\\views\\bill',2);
  var list = [];;
  for(var i = 0; i < list_of_sales.length; i++)
  {
    if(list_of_sales[i].sale_id == id_sale)
    {
      list.push(list_of_sales[i]);
    }
  }
  return list;
}

function extract_sale()
{
  var db = new DataBase();
  var list_of_sales = db.getTable("sales",'\\views\\bill',2);
  var list = [];
  for(var i = 0; i < list_of_sales.length; i++)
  {
    if(list_of_sales[i].id == id_sale)
    {
      return list_of_sales[i];
    }
  }
  return undefined;
}




function get_name_company()
{
  return company.socialreason;
}

function get_direction_company()
{
  return company.address;
}

function get_city_and_county()
{
  //country_id permitira hacer una mejor selección de pais, pero necesitamos saber a que id le asigno borris a cada pais
  //Hasta que no se sepa el valor del country_id, esto devolvera un valor predeterminado
  return "BOLIVIA";
}

function get_nit_company()
{
  return nit_company
}

function get_number_bill()
{
  return number_of_bill;
}

function get_number_of_authorization()
{
  return number_of_authorization;
}

function get_date_of_sell()
{
  return date_of_sell;
}

function get_name_buyer()
{
  return name_buyer;
}

function get_nit_buyer()
{
  return nit_buyer;
}

function get_detail_of_sale()
{
  return detail_of_sale
}

function get_total_of_sale()
{
  return sale.total;
}

function get_total_of_money_buyer_gave()
{
  return "AQUÍ CUANTO DINERO DIO EL CLIENTE"; //Cuando se implemente cuanto dinero dio el cliente para pagar en la venta, reemplazar esto
}

function get_change()
{
  return "AQUÍ EL CAMBIO";//Cuando se implemente cuanto de cambio hay que darle al cliente en la venta, reemplazar esto
}

function get_literal_number(tot)
{
  return "AQUI LITERAL DEL NUMERO"; //Cuando se obtenga el
}

function get_secure_code()
{
  return "AQUI VA CODIGO DE CONTROL";
}

//############################ FUNCIONES LITERAL ####################################
function Unidades(num){

  switch(num)
  {
    case 1: return "UN";
    case 2: return "DOS";
    case 3: return "TRES";
    case 4: return "CUATRO";
    case 5: return "CINCO";
    case 6: return "SEIS";
    case 7: return "SIETE";
    case 8: return "OCHO";
    case 9: return "NUEVE";
  }

  return "";
}

function Decenas(num){

  decena = Math.floor(num/10);
  unidad = num - (decena * 10);

  switch(decena)
  {
    case 1:   
      switch(unidad)
      {
        case 0: return "DIEZ";
        case 1: return "ONCE";
        case 2: return "DOCE";
        case 3: return "TRECE";
        case 4: return "CATORCE";
        case 5: return "QUINCE";
        default: return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch(unidad)
      {
        case 0: return "VEINTE";
        default: return "VEINTI" + Unidades(unidad);
      }
    case 3: return DecenasY("TREINTA", unidad);
    case 4: return DecenasY("CUARENTA", unidad);
    case 5: return DecenasY("CINCUENTA", unidad);
    case 6: return DecenasY("SESENTA", unidad);
    case 7: return DecenasY("SETENTA", unidad);
    case 8: return DecenasY("OCHENTA", unidad);
    case 9: return DecenasY("NOVENTA", unidad);
    case 0: return Unidades(unidad);
  }
}//Unidades()

function DecenasY(strSin, numUnidades){
  if (numUnidades > 0)
    return strSin + " Y " + Unidades(numUnidades)

  return strSin;
}//DecenasY()

function Centenas(num){

  centenas = Math.floor(num / 100);
  decenas = num - (centenas * 100);

  switch(centenas)
  {
    case 1:
      if (decenas > 0)
        return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2: return "DOSCIENTOS " + Decenas(decenas);
    case 3: return "TRESCIENTOS " + Decenas(decenas);
    case 4: return "CUATROCIENTOS " + Decenas(decenas);
    case 5: return "QUINIENTOS " + Decenas(decenas);
    case 6: return "SEISCIENTOS " + Decenas(decenas);
    case 7: return "SETECIENTOS " + Decenas(decenas);
    case 8: return "OCHOCIENTOS " + Decenas(decenas);
    case 9: return "NOVECIENTOS " + Decenas(decenas);
  }

  return Decenas(decenas);
}//Centenas()

function Seccion(num, divisor, strSingular, strPlural){
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)

  letras = "";

  if (cientos > 0)
    if (cientos > 1)
      letras = Centenas(cientos) + " " + strPlural;
    else
      letras = strSingular;

  if (resto > 0)
    letras += "";

  return letras;
}//Seccion()

function Miles(num){
  divisor = 1000;
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)

  strMiles = Seccion(num, divisor, "UN MIL", "MIL");
  strCentenas = Centenas(resto);

  if(strMiles == "")
    return strCentenas;

  return strMiles + " " + strCentenas;

  //return Seccion(num, divisor, "UN MIL", "MIL") + " " + Centenas(resto);
}//Miles()

function Millones(num){
  divisor = 1000000;
  cientos = Math.floor(num / divisor)
  resto = num - (cientos * divisor)

  strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
  strMiles = Miles(resto);

  if(strMillones == "")
    return strMiles;

  return strMillones + " " + strMiles;

  //return Seccion(num, divisor, "UN MILLON", "MILLONES") + " " + Miles(resto);
}//Millones()

function NumeroALetras(num){
  var data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
    letrasCentavos: "",
    letrasMonedaPlural: "BOLIVIANOS",
    letrasMonedaSingular: "BOLIVIANO"
  };

  if (data.centavos > 0)
    data.letrasCentavos = "CON " + data.centavos + "/100";

  if(data.enteros == 0)
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  if (data.enteros == 1)
    return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
  else
    return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
}//NumeroALetras()

//############################ FIN FUNCIONES LITERAL ####################################