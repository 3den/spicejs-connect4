S.controller("board-header", function(element, options) {
  var model = options.model,
    tmpl = options.tmpl,
    game = model.game,
    html = "", i;

  // Printe the top rows
  for(i = 0; i < game.x; i++) html += tmpl({x: i});
  element.innerHTML = "<tr>"+ html +"</tr>";

  // Events
  model.on("update", function(){
    element.dataset.player = game.player;
  });
});
