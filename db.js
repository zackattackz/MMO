const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./highscore.db');

db.run("CREATE TABLE IF NOT EXISTS highscore (name VARCHAR, score INT, id INT);");


let updateHighScore = (name, score) => {

    db.run("UPDATE highscore SET name = ?, score = ? WHERE id = 0", [name, score], err => {
        if(err) throw err;
    });
};

let getHighScoreObject = callback => {

    let sql = "SELECT * FROM highscore WHERE id = 0";
    db.get(sql, (err, row) => {
        if (err) throw err;
        console.log(row);
        callback({name: row.name, score: row.score});
    });

};

module.exports.db = db;
module.exports.updateHighScore = updateHighScore;
module.exports.getHighScoreObject = getHighScoreObject;
