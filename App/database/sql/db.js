const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;


var dbConfig = {

      server : "database-2.croi8mqokugc.ca-central-1.rds.amazonaws.com",
      databse: "database-2e",
      user :'admin',
      password:"hexad2024",
     options :{
       trustedConnection:true,
       trustServerCertificate: true,
     },
 }


// Connect to MSSQL Database
sql.connect(dbConfig)
  .then(() => console.log('Connected to MSSQL database'))
  .catch((err) => console.error('Error connecting to database:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
