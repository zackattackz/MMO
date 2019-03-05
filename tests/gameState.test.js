let gameState = require("../js/gameState");

test("addPlayer method will add a player to state.players", () => {
    gameState.addPlayer("testID");
    expect(gameState.state.players).toEqual({
        "testID": {y: 300, isActive: false}  //testID should map to a new player
    });
});

test("removePlayer will remove a player given an id", () => {
    gameState.removePlayer("testID");
    expect(gameState.state.players).toEqual({}); //should be empty
});

test("updatePlayer will update a player given an id, new y, and new isActive", () => {
    gameState.addPlayer("testID");
    gameState.updatePlayer("testID", 50, true);
    expect(gameState.state.players).toEqual({
        "testID": {y: 50, isActive: true}  //testID player should have updated values
    });
});

test("findWinner will return a winner's id, or if no winner then ''", () => {
    gameState.addPlayer("testID");
    gameState.updatePlayer("testID", 50, true);

    gameState.addPlayer("testID2");
    gameState.updatePlayer("testID2", 50, true);

    expect(gameState.findWinner()).toBe(""); //no winner because both are active

    gameState.updatePlayer("testID", 50, false);

    expect(gameState.findWinner()).toBe("testID2"); //since testID2 is only active player it should win

    gameState.updatePlayer("testID2", 50, false);

    expect(gameState.findWinner()).toBe(""); //no active players means no winner
});