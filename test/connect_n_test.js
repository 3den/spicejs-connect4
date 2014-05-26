"use strict";

describe("ConnectN", function(){
  it("starts player is 'p1'", function(){
    var game = ConnectN.create("game");
    assertPlayer(game, "p1");
  });

  it("toggles the player after each play", function(){
    var game = ConnectN.create("game");
    assertPlayer(game, "p1");
    game.play(0) && assertPlayer(game, "p2");
    game.play(0) && assertPlayer(game, "p1");
  });

  it("starts with a new board", function() {
    var game = ConnectN.create("game", {x: 2, y: 5});
    assert.equal(game.board.length, 2);
    assert.equal(game.board[0].length, 5);
    assert.equal(game.board[0][0], undefined);
    assert.equal(game.board[1][4], undefined);
  });

  it("plays on a given position", function(){
    var game = ConnectN.create("game", {x: 2, y:3});

    game.play(1) && assertPosition(game, 1, 0, "p1");
    game.play(0) && assertPosition(game, 0, 0, "p2");
    game.play(1) && assertPosition(game, 1, 1, "p1");
    game.play(1) && assertPosition(game, 1, 2, "p2");
    assertDeepEqual(game.board, [["p2",null,null], ["p1","p1","p2"]]);
  })

  it("raises an InvalidPosition error on invalid play", function(){
    var game = ConnectN.create("game", {x: 2, y:1});
    assertError("InvalidPosition", function() { game.play(-1); });
    assertError("InvalidPosition", function() { game.play(2); });
    game.play(0) && assertError("InvalidPosition", function() { game.play(0); });
    game.play(1) && assertError("InvalidPosition", function() { game.play(1); });
  });

  it("can win on the game", function() {
    var game = ConnectN.create("game", {x: 3, y:3, n: 2});

    game.play(0) && assert.equal(game.winner, undefined);
    game.play(0) && assert.equal(game.winner, undefined);
    game.play(1) && assert.equal(game.winner, "p1");
  });
});

describe("Rules", function(){
  it("wins with horizontal lines", function() {
    var rules = ConnectN.create("rules", { n: 2, board: [
      ["p2", "p2", undefined],
      ["p1", "p1", undefined],
      [undefined, undefined, undefined]
    ] });

    assert(rules.wins(0, 1), "p2 wins on horizontal");
    assert(rules.wins(1, 1), "p1 wins on horizontal");
    assert(!rules.wins(2, 1), "does not win with undefined");
  });

  it("wins with vertical lines", function() {
    var rules = ConnectN.create("rules", { n: 2, board: [
      ["p1", "p2", undefined],
      ["p1", "p2", undefined],
      ["p1", undefined, undefined]
    ] });

    assert(rules.wins(0, 1), "p2 wins on vertical");
    assert(rules.wins(1, 1), "p2 wins on vertical");
    assert(rules.wins(2, 0), "p1 wins on vertical");
    assert(rules.wins(1, 0), "p1 wins on vertical");
    assert(rules.wins(0, 0), "p1 wins on vertical");
    assert(!rules.wins(2, 2), "does not win with undefined");
  });

  it("wins with diagonal lines", function() {
    var rules = ConnectN.create("rules", { n: 2, board: [
      ["p2", "p1", undefined],
      ["p1", "p2", undefined],
      ["p2", "p1", undefined]
    ] });

    assert(rules.wins(1, 1), "p2 wins on diagonal down");
    assert(rules.wins(2, 1), "p1 wins on diagonal down");
    assert(rules.wins(1, 1), "p2 wins on diagonal up");
    assert(rules.wins(0, 1), "p1 wins on diagonal up");
  });
});

// *** Custom Assertions *** //

function assertPlayer(game, expected) {
  assert.equal(game.player, expected);
}

function assertPosition(game, x, y, expected) {
  assert.equal(game.board[x][y], expected);
}

function assertError(type, callback){
  try {
    callback(); throw {type: "NothingRaised"};
  } catch(e) {
    assert.equal(e.type, type);
  }
}

function assertDeepEqual(obj, expected) {
  assert.equal(typeof obj, typeof expected);
  assert.equal(JSON.stringify(obj), JSON.stringify(expected));
}
