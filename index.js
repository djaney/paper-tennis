'use strict'

var Lobby = require('./models/Lobby');

var express = require('express');
var router = express.Router();

module.exports = function(app, namespace){

  var Game = function(app, namespace){
    // routes
    router.get('/', function(req, res){
      res.sendfile('views/index.html');
    });
    app.use('/' + namespace, router);


    this.join = function(socket){
      console.log('tennis game started');
    }
  };

  return new Game(app, namespace);

};
