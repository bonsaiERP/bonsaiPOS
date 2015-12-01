window.$ = window.jQuery = require('../../libs/jquery.min.js');
var fs = require('fs');

define(["database"], function(database) {

  var database = database.DataBase();
  var user = database.getTableDos("token");
  function getUsers(users, links) {
    var usuarios = [];
    var cont = 0;
    var organisation_id = 1;//id de catolica

    for (var i = 0; i < links.length; i++) {
      if (organisation_id === links[i].organisation_id) {
        for (var j = 0; j < users.length; j++) {
          if (users[j].id === links[i].user_id) {
            usuarios[cont] = users[j];
            usuarios[cont]["organisation_id"] = links[i].organisation_id;
            usuarios[cont]["role"] = links[i].role;
            cont++;
          }
        }
      }
    }
    return usuarios;
  }

  function sincronisation_employees() {
    var users = {
      "async": true,
      "crossDomain": true,
      "url": "http://catolica.bonsaierp.com:3000/api/v1/users",
      "method": "GET",
      "headers": {
        "token": user[0].token,
        "cache-control": "no-cache"
      }
    };

    var links = {
      "async": true,
      "crossDomain": true,
      "url": "http://catolica.bonsaierp.com:3000/api/v1/links",
      "method": "GET",
      "headers": {
        "token": user[0].token,
        "cache-control": "no-cache"
      }
    };

    $.ajax(users).done(function (response) {
      var users = response;
      $.ajax(links).done(function (response) {
        var links = response;
        var employees = getUsers(users, links);
        database.putTableDos('employees', employees);
      });
    });
  }

  $(document).ready(function () {
    $("#update_employees").click(function () {
      sincronisation_employees();
    });
  });

});