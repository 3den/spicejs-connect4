// This is where the coupling happens
// the job of this file is to connect the presenters with Models and the DOM.

// Sets the Board Header
S.control("board-header", document.getElementById("board-header"), {
  tmpl: getTemplateById("play-chip"),
  model: Game
});

// Sets the Board Body
S.control("board-body", document.getElementById("board-body"), {
  tmpl: getTemplateById("chip"),
  model: Game
});

// Sets the Board Body
S.control("game-score", document.getElementById("game-score"), {
  tmpl: getTemplateById("scores"),
  model: Game
});

// Start the game
Game.start();
