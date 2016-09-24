var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var game = new (require('.'))(app, 'tennis');

io.on('connection', function(socket){
  game.join(socket,{name: 'Test'});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
