let gameState = {
    state: { //shared with and changed by clients/server
        players: {}, //key = socket id of player, value = {name: "guest", isActive: false, y:300, id: id}
        pipes: [], //array of pipe objects (info about pipes moving across screen)
        gameIsActive: false
        //TODO: power-ups??
    },
    //server only info/methods to change the state var ^^

    addPlayer: function(id) {
        this.state.players[id] = {name: "guest", isActive: false, y:300, id: id};
    },

    removePlayer: function(id) {
        delete this.state.players[id];
    },

    updateY: function(id ,y) {
        let player = this.state.players[id];
        player.y = y;
    },

    updateName: function(id, name) {
        let player = this.state.players[id];
        player.name = name;
    },

    updateIsActive: function(id, isActive) {
        let player = this.state.players[id];
        player.isActive = isActive;
    },

    getPlayerCount: function() { //returns number of players
        return Object.keys(this.state.players).length;
    },

    findWinner: function() {
        //If there's 1 or 0 players, there can't be a winner so return ""
        if (this.getPlayerCount() <= 1) return "";
        const players = Object.values(this.state.players);//Get all players
        let activePlayers = 0;
        let winnerId = "";

        for(let player of players) {//for each player
            if (player.isActive) {
                activePlayers++;
                winnerId = player.id;//If there is only 1 active player then winnerId will become the id of that player
            }
        }
        //if there are more than 1 active players, return "" because no winner, else return that player's id
        return activePlayers === 1 ? winnerId : "";

    }
};

module.exports = gameState;