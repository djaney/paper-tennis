var GameLoop = function(player1, player2, namespace){
  console.log('game loop created', namespace);
  this.namespace = namespace;
  this.players = [player1,player2];

  // add listeners
  for (var i = 0; i < this.players.length; i++) {
    var player = this.players[i];
    player.socket.on(namespace+':status', function(msg){
      player.socket.emit({status: 'dummy status'});
    });
  }



};
module.exports = GameLoop;
