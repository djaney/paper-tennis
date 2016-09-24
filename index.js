'use strict'

var Lobby = require('./models/Lobby');
var Player = require('./models/Player');

var express = require('express');
var router = express.Router();

var Game = function(app, namespace){
  // routes
  router.get('/', function(req, res){
    res.sendFile('views/index.html');
  });
  app.use('/' + namespace, router);

  var lobby = new Lobby(namespace);

  this.join = function(socket){
    console.log('tennis game started');
    lobby.addPlayer(new Player(socket));
  }
};

module.exports = Game;
