window.$ = window.jQuery = require('../../libs/jquery.min.js');
var fs = require('fs');

var database = new Database();
var user;
var id = get_data('\\views\\users',2);
var general_list_of_users = database.getTable("users",'\\views\\users',2);
function get_user(){
  for (var i = 0; i < general_list_of_users.length; i++) {
    if(general_list_of_users[i].id == id){
      user = general_list_of_users[i];
      return true;
    }
  }
  return false;
}

function get_id_user(){
  return user.id;
}

function get_name_user(){
  return user.name;
}

function get_lastname_user(){
  return user.lastname;
}

function get_ci_user(){
  return user.ci;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function edit_user()
{
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
    user.name=$('#name-field').val();
    user.lastname=$('#lastname-field').val();
    user.ci=$('#ci-field').val();
    user.id=$('#id-field').val();
    for (var i = 0; i < general_list_of_users.length; i++) {
      if(general_list_of_users[i].id == user.id)
      {
        general_list_of_users[i] = user;
      }
    }
    database.putTable("users", general_list_of_users,'\\views\\users',2);
    $('#modalBodyMessageAccept').html('');
    $('#modalBodyMessageAccept').append('<p>Cliente modificado con &eacute;xito.</p>');
    $('#myAcceptModal').modal('show');
  }
}
