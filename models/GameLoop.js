var GameLoop = function(player1, player2, namespace){
  console.log('game loop created', namespace);
  var __this = this;
  __this.namespace = namespace;
  __this.players = [player1,player2];
  __this.gameLog = [];
  __this.ballLimit = 4;
  __this.ballPosition = 0;
  __this.playerQueue = [];

  // add listeners

  __setListeners();
  __startGame();

  function __getStatus(player){

    return {
      isTurn:__isTurn(player),
      gameLog:__this.gameLog,
      ballPosition: __this.ballPosition,
      points: player.points,
    };
  }

  function __isTurn(player){
    var nextPlayer = __getCurrentPlayer();
    var isTurn = nextPlayer.socket == player.socket;
    return isTurn;
  }
  function __startGame(){
    console.log('start game');
    // ad players to queue
    __this.playerQueue.push(__this.players[0]);
    __this.playerQueue.push(__this.players[1]);
  }

  function __getCurrentPlayer(){
    var next = __this.playerQueue[0];
    return next;
  }

  function __playerDone(){
    console.log('player done');
    __this.playerQueue.push(__this.playerQueue.shift());
  }
  function __getPlayerNumber(player){
    return __this.players.indexOf(player);
  }
  function __setListeners(){
    for (var i = 0; i < __this.players.length; i++) {
      var player = __this.players[i];
      __setPlayerListeners(player);
    }
  }

  function __setPlayerListeners(player){
    player.socket.on(__this.namespace+':status', function(msg){
      __sendStatus(player);
    });
    player.socket.on(__this.namespace+':turn', function(msg){
      if(__isTurn(player)){
        var playerNumber = __getPlayerNumber(__getCurrentPlayer());
        var currentPlayer = __getCurrentPlayer();
        var sign = 1;
        if(0 == playerNumber){
          sign = -1;
        }
        // move a=ball
        __this.ballPosition -= sign;
        // deduct points
        currentPlayer.points -= msg.number || 0;
        __playerDone();
        __sendStatus();
      }

    });
  }

  function __sendStatus(player){
    player = player || null;

    if(player){
      player.socket.emit(__this.namespace+':status', __getStatus(player));
    }else{
      for (var i = 0; i < __this.players.length; i++) {
        var player = __this.players[i];
        __sendStatus(player);
      }
    }

  }

};
module.exports = GameLoop;
