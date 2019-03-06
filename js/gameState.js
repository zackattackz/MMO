let gameState = {
    state: { //shared with and changed by clients/server
        players: {}, //key = socket id of player, value = player info (name, isActive...)
        pipes: [], //array of pipe objects (info about pipes moving across screen)
        gameIsActive: false
        //TODO: power-ups??
    },
    //server only info/methods to change the state var ^^

    addPlayer: function(id) {
        this.state.players[id] = {name: "guest", isActive: false, y:300}
    },

    removePlayer: function(id) {
        delete this.state.players[id]
    },

    updatePlayer: function(id, name, isActive) {
      let player = this.state.players[id];
      player.name = name;
      player.isActive = isActive
    },

    getPlayerCount: function() { //returns number of players
        return Object.keys(this.state.players).length;
    },

    findWinner: function() { //will search through each player and check if only one is active, if so return that player
                             //id else return empty string
        if (this.getPlayerCount() <= 1) return "";
        const playerIds = Object.keys(this.state.players);
        let activePlayers = 0;
        let winnerId = "";

        for(let id of playerIds) {
            if (this.state.players[id].isActive) {
                activePlayers++;
                winnerId = id;
            }
        }

        return activePlayers === 1 ? winnerId : "";

    }
};

module.exports = gameState;