const express = require('express');
const sql = require('mssql');

const app = express();

// Database configuration
const config = {
  user: 'admin',
  password: 'hexad2024',
  server: 'database-2.croi8mqokugc.ca-central-1.rds.amazonaws.com',
  database: 'database-2',
  port: 1433, // Change if your database is using a different port
  options: {
    encrypt: true, // Use this if you're connecting to an Azure database
  },
};

// Create a connection pool
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

// Event listener for connection pool errors
pool.on('error', (err) => {
  console.error('SQL Server Pool Error:', err);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');

  // Handling connection errors on startup
  poolConnect
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((err) => {
      console.error('Error connecting to the database:', err);
      process.exit(1); // Exit the process if the connection cannot be established
    });
});
