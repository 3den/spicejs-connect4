global.ConnectN = require("../lib/connect_n");

[
  "../bower_components/spicejs/bdd",
  "./connect_n_test"
].forEach(function(file){ require(file + ".js"); });
