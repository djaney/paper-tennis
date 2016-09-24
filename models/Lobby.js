
var GameLoop = require('./GameLoop');
var Lobby = function(namespace){
  this.namespace = namespace;

  this.playerPool = [];
  this.activeGames = [];

  this.addPlayer = function(player){
    this.playerPool.push(player);
    console.log('player added to pool, players = ', this.playerPool.length);
    this.makeMatch();
  }

  this.makeMatch = function(){
    while(2 <= this.playerPool.length){
      var player1 = this.playerPool[0];
      var player2 = this.playerPool[1];
      this.activeGames.push(new GameLoop(player1, player2, this.namespace));
      this.playerPool.splice(0,2);
    }
  }
};
module.exports = Lobby;
