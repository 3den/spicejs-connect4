var Presenters = {
  boardHeader: function(element, options) {
    var tmpl = options.tmpl, game = options.model.game, html = "", i;
    for(i = 0; i < game.x; i++) html += riot.render(tmpl, {x: i});
    element.innerHTML = "<tr>"+ html +"</tr>";

    options.model.on("update", function(){
      element.dataset.player = game.player;
    });

    return element;
  },

  boardBody: function(element, options) {
    options.model.on("update", function(board) {
      var tmpl = options.tmpl, html = "", i, j;
      for(j = board.y - 1; j >= 0 ; j--) {
        html += "<tr>";
        for(i = 0; i < board.x; i++) html += riot.render(tmpl, {
          x: i, y: j, player: board[i][j]
        });
        html += "</tr>";
      }
      element.innerHTML =  html;
    });

    return element;
  },

  gameScore: function(element, o) {
    o.model.on("win", function(player) {
      element.innerHTML = riot.render(o.tmpl, o.model);
      alert(player +" wins!");
      o.model.start();
    });
  }
}

