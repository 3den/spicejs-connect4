global.ConnectN = require("../lib/connect4");
[
  "../bower_components/riotjs/bdd",
  "./connect4_test"
].forEach(function(file){ require(file + ".js"); });
