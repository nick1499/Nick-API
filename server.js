const hostname = '134.122.34.37';
const port = 70;

const path = require("path");
const cors = require("cors");
const express = require('express');
const app = express();
const axios = require('axios');

var mysql = require('mysql');
var con = mysql.createConnection({
  socketPath : '/var/run/mysqld/mysqld.sock',
  host: '134.122.34.37',
  port: '80',
  getr: 'root',
  user: 'root',
  password: 'GoodGuy1n',
  database : 'aliens',
  insecureAuth : false 
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});

// we will be adding more endpoints with this structure:

app.use(cors())

var corsOptions = {
  origin: '134.122.34.37',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.get('/create', function(req, res) {

var alien_name1 = req.query.alien_name1;
// //there should be a req.post ability for when you get axios post running

con.query('INSERT INTO aliens (alien_name) VALUES ("'+ alien_name1 +'")' , function (err, rows, fields) {
    
    if (err) throw err
        console.log("record created "+ alien_name1)
        res.send("record created "+ alien_name1)
    })

})


app.get('/delete', function(req, res) {

  con.query('DELETE FROM aliens order by alien_id desc limit 1 ;', function (err, rows, fields) {
      
      if (err) throw err
          console.log("record deleted")
          res.send("record deleted")
      })
  
  })

  app.get('/show', function(req, res) {

    con.query('SELECT * FROM aliens;', function (err, rows, fields) {
        
        if (err) throw err
            console.log(rows)
            res.send(rows)
        })
    
    })

    app.get('/edit', function(req, res) {

      con.query('UPDATE aliens SET alien_name = "Grunt", alien_planet = "Green planet" order by alien_id desc limit 1 ', function (err, rows, fields) {
          
          if (err) throw err
              console.log(rows)
              res.send(rows)
          })
      
      })


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

//   app.listen(8000, function() {
//     console.log('listening on localhost:8000/')
// })
