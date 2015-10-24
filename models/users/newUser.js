

$(document).ready(function(){
	var fs = require('fs');
	var db = new DataBase();
	var name='';
	var lastname='';
	var ci=0;


	$('#btn-new-user').click(function(){
		event.preventDefault();
		var error= false;
		$('#modalBodyMessageDanger').html('');

		if (!$('#name-field').val()) {
			$('#modalBodyMessageDanger').append('<p>El campo <b>nombre</b> deben estar lleno.</p>');
			error=true;
		}

		if (!$('#lastname-field').val()) {
			$('#modalBodyMessageDanger').append('<p>El campo <b>apellido</b> deben estar lleno</p>');
			error=true;
		}

		if (!$('#ci-field').val()) {
			$('#modalBodyMessageDanger').append('<p>El campo <b>CI</b> deben estar lleno</p>');
			error=true;
		}

		if (!$.isNumeric($('#ci-field').val())) {
			$('#modalBodyMessageDanger').append('<p>El <b>CI</b> debe ser un valor numerico.</p>');
			error=true;
		}
		if (error) {
			$('#myDangerModal').modal('show');
		} else{
			name=$('#name-field').val();
			lastname=$('#lastname-field').val();
			ci=$('#ci-field').val();
			// if ($('id-field').val()) {
			// 	ci=$('id-field').val();
			// } else{
			// 	ci=0;
			// };
			saveUser();
		}
	});

	function saveUser() {
      var myUser = db.getTable("users",'\\views\\users',2);
      var date = new Date().toUTCString();
      var size = myUser.length;
			var id = 1;
      if(myUser.length != 0)
      {
        var aux = myUser.length;
        id = myUser[aux-1].id + 1;
      }
      var user = { "id": id, "name": name, "lastname": lastname, "ci" : ci, "date": date };
      myUser.push(user);
      db.putTable("users", myUser,'\\views\\users',2);
      location.reload();
      localStorage.setItem('reload',1);
      $('#alertMessage').html('Cliente creado con &eacute;xito.');
      $('#alertMessage').show;
  };
});
