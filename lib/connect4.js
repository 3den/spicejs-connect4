(function(root){
  "use strict";

  root.ConnectN = {
    game: {
      player: "p1",
      x: 6, // width of the board
      y: 6, // height of the board
      n: 4, // connections required to win

      initialize: function(options) {
        merge(this, options || {});
        this.board = newBoard(this.x, this.y)
        return this;
      },

      play: function(position) {
        playPositon(this, position);
        togglePlayer(this);
        return this;
      }
    },

    // *** Factory ***//

    create: function(proto, properties) {
      return Object.create(this[proto]).initialize(properties);
    }
  }

  //*** Private Methods ***//

  function merge(obj1, obj2) {
    Object.keys(obj2).forEach(function(key){ obj1[key] = obj2[key]; });
  }

  function togglePlayer(game) {
    game.player = game.player === "p1" ? "p2" : "p1";
  }

  function playPositon(game, position) {
    var i, x = game.x, y = game.y;

    validatePosition(position, x);
    for(i = 0; i < y && game.board[position][i]; i++) i;
    validatePosition(i, y);
    game.board[position][i] = game.player;
  }

  function validatePosition(position, limit) {
    if(position >= limit || position < 0){
      throw {message: "Invalid board position", type: "InvalidPosition"};
    }
  }

  function newBoard(x, y){
    var board = [], i, j;
    board.x = x;
    board.y = y;
    for(i = 0; i < x; i++){
      board[i] = new Array(y);
    }
    return board;
  }

// It works on nodejs or the browser
})(typeof module !== "undefined" ? module.exports : this);
