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
