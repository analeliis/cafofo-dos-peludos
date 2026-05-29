const mysql = require('mysql2');
require('dotenv').config();

// Conexão do back-end com o banco MySQL.
// Os dados de acesso são lidos do arquivo .env.
const conexao = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = conexao;