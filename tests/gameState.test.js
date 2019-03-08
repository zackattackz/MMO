let gameState = require("../js/gameState");

test("addPlayer method will add a player to state.players", () => {
    gameState.addPlayer("testID");
    expect(gameState.state.players).toEqual({
        "testID": {name: "guest", y: 300, isActive: false, id: "testID"}  //testID should map to a new player
    });
});

test("removePlayer will remove a player given an id", () => {
    gameState.removePlayer("testID");
    expect(gameState.state.players).toEqual({}); //should be empty
});

test("updateY will update a player given an id and new y", () => {
    gameState.addPlayer("testID");
    gameState.updateY("testID", 50);
    expect(gameState.state.players).toEqual({
        "testID": {name: "guest",y: 50, isActive: false, id: "testID"}  //testID player should have updated values
    });
    gameState.removePlayer("testID");
});

test("updateName will update a player given an id and new name", () => {
    gameState.addPlayer("testID");
    gameState.updateName("testID", "newName");
    expect(gameState.state.players).toEqual({
        "testID": {name: "newName",y: 300, isActive: false, id: "testID"}  //testID player should have updated values
    });
    gameState.removePlayer("testID");
});

test("updateIsActive will update a player given an id and new isActive", () => {
    gameState.addPlayer("testID");
    gameState.updateIsActive("testID", true);
    expect(gameState.state.players).toEqual({
        "testID": {name: "guest",y: 300, isActive: true, id: "testID"}  //testID player should have updated values
    });
    gameState.removePlayer("testID");
});

test("findWinner will return a winner's id, or if no winner then ''", () => {
    gameState.addPlayer("testID");
    gameState.updateIsActive("testID",  true);

    gameState.addPlayer("testID2");
    gameState.updateIsActive("testID2", true);

    expect(gameState.findWinner()).toBe(""); //no winner because both are active

    gameState.updateIsActive("testID", false);

    expect(gameState.findWinner()).toBe("testID2"); //since testID2 is only active player it should win

    gameState.updateIsActive("testID2", false);

    expect(gameState.findWinner()).toBe(""); //no active players means no winner
});