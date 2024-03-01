const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'App/api')));
// app.use(express.static(path.join(__dirname, 'App/database')));

const dbConfig = {
  server: "database-2.croi8mqokugc.ca-central-1.rds.amazonaws.com",
  database: "Hexad",
  user: "admin",
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

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



module.exports = pool;