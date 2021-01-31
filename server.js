const hostname = '134.122.34.37';
const port = 80;


const path = require("path");

const express = require('express');
const app = express();

app.get('/', function(req, res) {
    console.log("hi")
    res.send("hi")
})

var mysql = require('mysql');
var con = mysql.createConnection({
  socketPath : '/var/run/mysqld/mysqld.sock',
  host: '134.122.34.37',
  port: '80',
  user: 'root',
  password: 'GoodGuy1n',
  database : 'aliens',
  insecureAuth : false 
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});

// we will be adding more endpoings with this structure:

app.get('/create', function(req, res) {

con.query('INSERT INTO aliens (alien_name, alien_planet) VALUES ("Test1","Test2") ;', function (err, rows, fields) {
    
    if (err) throw err
        console.log("record created")
    })

})
//this is the end of the endpoint

// app.listen(8000, function() {
//     console.log('listening on localhost:8000/')
// })

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });