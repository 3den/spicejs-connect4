(function(ConnectN){
  "use strict";

  // The Rules
  ConnectN.rules = {
    n: 4, // connections required to win
    board: [], // The game board
    initialize: function(options) {
      merge(this, options || {});
      return this;
    },

    wins: function(x, y) {
      return this.board[x][y] && (
        this.winsHorizontal(x, y) ||
        this.winsVertical(x, y) ||
        this.winsDiagonalUp(x, y) ||
        this.winsDiagonalDown(x, y)
      );
    },

    winsHorizontal: function(x, y) {
      var connections = 0, player = this.board[x][y], i;
      for (i = y; i >= 0 && this.board[x][i] === player; i--) connections++;
      return connections >= this.n;
    },

    winsVertical: function(x, y) {
      var connections = 0, player = this.board[x][y], i;
      for (x; x < this.board.length && this.board[x][y] === player; x++);
      for (i = x -1; i >= 0 && this.board[i][y] === player; i--) connections++;
      return connections >= this.n;
    },

    winsDiagonalUp: function(x, y) {
      var connections = 0, player = this.board[x][y], i, j;
      for ( i = x, j = y;
            i < this.board.length && j >= 0 && this.board[i][j] === player;
            i++, j-- ) connections++;
      return connections >= this.n;
    },

    winsDiagonalDown: function(x, y) {
      var connections = 0, player = this.board[x][y], i, j;
      for ( i = x, j = y;
            i >= 0 && j >= 0 && this.board[i][j] === player;
            i--, j-- ) connections++;
      return connections >= this.n;
    }
  };

  // The Game
  ConnectN.game = {
    player: "p1",
    winner: undefined,
    x: 6, // width of the board
    y: 6, // height of the board
    n: 4, // connections required to win

    initialize: function(options) {
      merge(this, options || {});
      return this.start();
    },

    play: function(position) {
      if (this.winner) return this;
      playPositon(this, position);
      togglePlayer(this);
      return this;
    },

    start: function() {
      this.winner = undefined;
      this.board = newBoard(this.x, this.y)
      return this;
    }
  };

  // The Factory
  ConnectN.create = function(proto, properties) {
    return Object.create(this[proto]).initialize(properties);
  };

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
    checkWinner(game, position, i)
  }

  function checkWinner(game, x, y) {
    if(ConnectN.create("rules", game).wins(x, y)) game.winner = game.player;
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

// It works on nodejs and the browser
})(typeof exports !== "undefined" ? exports : this.ConnectN = {});
