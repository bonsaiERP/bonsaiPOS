var fs = require('fs');

function getpathproyect(todelete)
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

function convertdatetoformatofso(date)
{
  return new Date(date);
}

function returnlistofsalesofdate(date)
{
  var db = new DataBase();
  var general_list_of_sales = db.getTable("sales",'\\views\\reports',2);
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

function orderlistbyhour(list_of_sales)
{
  for (var cont = 0; cont < list_of_sales.length; cont++) {
    for (var cont1 = cont + 1; cont1 < list_of_sales.length; cont1++) {
      var aux1 = convertdatetoformatofso(list_of_sales[cont].date);
      var aux2 = convertdatetoformatofso(list_of_sales[cont1].date);
      if(thehighttime(aux1,aux2))
      {
        var extra = list_of_sales[cont1];
        list_of_sales[cont1] = list_of_sales[cont];
        list_of_sales[cont] = extra;
      }
    }
  }
  return list_of_sales;
}

function gettotalofsales(list_of_sales)
{
  var tot = 0;
  for (var cont = 0; cont < list_of_sales.length; cont++) {
    tot = tot + list_of_sales[cont].total;
  }
  return tot;
}

function returndatatoshow(date)
{
  dir= getpathproyect('\\views\\reports',2);
  fs.readFile(dir+converpath('\\bd\\sales.json',2), function (err, sales) {
    if (err) throw err;
    var general_list_of_sales = eval('(' + sales + ')');
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
    for (var cont = 0; cont < result.length; cont++) {
      var aux1 = convertdatetoformatofso(result[cont].date);
      for (var cont1 = cont + 1; cont1 < result.length; cont1++) {
        var aux2 = convertdatetoformatofso(result[cont1].date);
        if(thehighttime(aux1,aux2))
        {
          var extra = result[cont];
          result[cont] = result[cont1];
          result[cont1] = extra;
        }
      }
    }
    var data_table = $("#tblDatos");
      for (var cont = 0; cont < result.length; cont++) {
        var aux = convertdatetoformatofso(result[cont].date);
        data_table.append("<tr> <td>" + getactualtime(aux) + "</td> <td>" + result[cont].id + "</td> <td>" + result[cont].total + "</td></tr>");
      }
  });
}


function thehighttime(time1,time2)
{
  var aux1 = time1.getHours();
  var aux2 = time2.getHours();
  if(aux2 != aux1)
  {
    if(aux2 < aux1)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  var aux1 = time1.getMinutes();
  var aux2 = time2.getMinutes();
  if(aux2 != aux1)
  {
    if(aux2 < aux1)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  var aux1 = time1.getSeconds();
  var aux2 = time2.getSeconds();
  if(aux2 < aux1)
  {
    return true;
  }
  else {
    return false;
  }
}

function getactualdate(date)
{
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var result = day+"/"+month+"/"+year;
  return result;

}

function getactualtime(date)
{
  var minuts = date.getMinutes();
  var hours = date.getHours();
  var seconds = date.getSeconds();
  var result = hours+":"+minuts+":"+seconds;
  return result;
}
