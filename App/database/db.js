const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'App/api')));
// app.use(express.static(path.join(__dirname, 'App/database')));

const dbConfig = {
  server: "sql.bsite.net\\MSSQL2016",
  database: "hexad_",
  user: "hexad_",
  password: "hexad2024",
  port: 1433,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

// Connect to MSSQL Database
const pool = new sql.ConnectionPool(dbConfig);

pool.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });


module.exports = pool;