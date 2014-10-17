// Controller that prints the board
S.controller("board-body", function(element, options) {
  // Define all expected options at the top
  var model = options.model, tmpl = options.tmpl;

  // Model events
  model.on("update", function(board) {
    var html = "", i, j;
    for(j = board.y - 1; j >= 0 ; j--) {
      html += "<tr>";
      for(i = 0; i < board.x; i++) html += tmpl({
        x: i, y: j, player: board[i][j]
      });
      html += "</tr>";
    }
    element.innerHTML =  html;
  });
});
