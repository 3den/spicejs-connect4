global.ConnectN = require("../lib/connect_n");
[
  "../bower_components/riotjs/bdd",
  "./connect_n_test"
].forEach(function(file){ require(file + ".js"); });
