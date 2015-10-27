var db = new DataBase();
var mySales = db.getTable("sales",'\\views\\sales',2);

if(localStorage.getItem('reload')==1)
{
  showAlertMessage("successfulDelete");
  $("#alertMessage").show();
  localStorage.removeItem('reload');
}

function showAlertMessage(tipeMessage)
{
  $("#alertMessage").removeClass();
  if (tipeMessage=="successfulDelete"){
    $("#alertMessage").addClass("alert alert-dismissible alert-danger");
    $("#alertMessage")[0].innerHTML='<p>La venta se anul&oacute; exitosamente</p>';
  }
  

  $("#alertMessage").show();
}

$(document).ready(function(){
	for (var i = mySales.length - 1; i >= 0; i--) {
		$('#sales-index-table').append('<tr><td>'+String(mySales[i].id)+'</td> <td>'+String(mySales[i].client)+'</td><td>'+String(mySales[i].date)+'</td><td>$ '+String(mySales[i].total)+'</td> <td> <button class="btn btn-danger btn-sm borrar" id="'+String(mySales[i].id)+'"><span class="glyphicon glyphicon-trash"></span></button></td> </tr>')
	};


	$('.borrar').click(function(){
		$('#deleteModal').modal('show');
		console.log($(this).attr('id'));
		$('#id').val($(this).attr('id'));
	});

	$('#si').click(function(){
		$('#deleteModal').modal('hide');
		var id=$('#id').val();
		console.log(id);
		for (var i = mySales.length - 1; i >= 0; i--) {
			mySales[i]
			if (mySales[i].id==id) {
				mySales.splice(i,1);
			};
		};
      	db.putTable("sales", mySales,'\\views\\sales',2);
      	updateStock(id);
      	location.reload();
     	localStorage.setItem('reload',1);
	});

	$('#no').click(function(){
		$('#deleteModal').modal('hide');
	});
});

function updateStock(id)
{
	var salesProducts=db.getTable("saleProducts",'\\views\\sales',2);
	var products=db.getTable("products",'\\views\\sales',2);

	for (var i = salesProducts.length - 1; i >= 0; i--) {
		if (String(salesProducts[i].sale_id)==String(id)) {
			for (var j = products.length - 1; j >= 0; j--) {
				if (String(products[j].id)== String(saleProducts[i].product_id)) {
					products[j].amount=parseInt(products[j].amount)+parseInt(salesProducts[i].quantity);
				};
			};
		};
	};
	db.putTable('products',products,'\\views\\sales',2);
}