var fs = require('fs');

function Obtenerinfo() {

  fs.readFile('D:\\Taller de desarrollo de software\\Prototipo para abrir excel con javascript\\pruebaexcel.xlsx', function(err, data) {
    if( err ){
        console.log(err)

    }
    else{
        list_of_data = data.replace('NRO. AUTORIZACION|NRO. FACTURA|NIT/CI|FECHA EMISION|MONTO FACTURADO|LLAVE DOSIFICACION|5 VERHOEFF|CADENA|SUMATORIA PRODUCTOS|BASE64|CODIGO CONTROL','');
        list_of_data = list_of_data.split('|');
    }
});
}
