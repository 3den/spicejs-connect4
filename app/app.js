// This is where the coupling happens
// the job of this file is to connect the presenters with Models and the DOM.

// Sets the Board Header
Presenters.boardHeader(document.getElementById("board-header"), {
  tmpl: document.getElementById("play-chip").innerHTML,
  model: Models.Game
});

// Sets the Board Body
Presenters.boardBody(document.getElementById("board-body"), {
  tmpl: document.getElementById("chip").innerHTML,
  model: Models.Game
});
//
// Sets the Board Body
Presenters.gameScore(document.getElementById("game-score"), {
  tmpl: document.getElementById("scores").innerHTML,
  model: Models.Game
});

// Start the game
Models.Game.start();
