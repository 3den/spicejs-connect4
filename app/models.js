// Models listen and triggers events, they can also have some business logic.
//
// The best practice is to have all logic is on libs,
// decoupled from any framework and fully tested.
Models = {
  Game: riot.observable({
    p1: 0,
    p2: 0,
    // All the logic is on ConnectN
    game: ConnectN.create("game", {x: 7, y:6}),

    play: function(position) {
      this.game.play(position);
      this.trigger("update", this.game.board);

      if(this.game.winner) {
        this[this.game.winner] += 1;
        this.trigger("win", this.game.winner);
      }
    },

    start: function() {
      this.game.start();
      this.trigger("update", this.game.board);
    }
  })
}
