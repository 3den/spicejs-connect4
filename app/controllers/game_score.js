S.controller("game-score", function(element, options) {
  var model = options.model, tmpl = options.tmpl;

  // Events
  model.on("win", function(player) {
    element.innerHTML = tmpl(model);
    alert(player +" wins!");
    model.start();
  });
});
