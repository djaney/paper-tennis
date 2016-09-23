var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var game = require('./src/main.js');

app.use('/tennis', game.router);

io.on('connection', function(socket){
  console.log('user connected')
  game.start(socket);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
