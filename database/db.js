const mysql = require('mysql2');

const config = require('../config/config-db.json');
const user = "u544016274_antonio";
const password = "_YHHq5xrmXV_q86KS_";
const database = "u544016274_game_starts";
const host = "sql538.main-hosting.eu";

//se crea un objeto con la información de la base de datos del user
const pool = mysql.createPool({
  host: host,
  user: user,
  database: database,
  password: password,
});

module.exports = pool.promise(); //exportamos como una promesa
