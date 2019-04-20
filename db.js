let mysql = require('mysql');


let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MysqlPass,
    database: "flappydb"
});



let updateHighScore = (name, score) => {

    let sql = mysql.format("UPDATE highscore SET name = ?, score = ? WHERE id = 0", [name, score]);
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
};

let getHighScoreObject = callback => {

    let sql = "SELECT * FROM highscore WHERE id = 0";
    con.query(sql, (err, result) => {
        if (err) throw err;
        callback({name: result[0].name, score: result[0].score});
    });

};

module.exports.con = con;
module.exports.updateHighScore = updateHighScore;
module.exports.getHighScoreObject = getHighScoreObject;
