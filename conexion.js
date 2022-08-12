const mysql = require("mysql");
const user = "u544016274_antonio";
const password = "_YHHq5xrmXV_q86KS_";
const database = "u544016274_game_starts";
const host = "sql538.main-hosting.eu";

module.exports = mysql.createPool({
  host: host,
  user: user,
  database: database,
  password: password,
});
