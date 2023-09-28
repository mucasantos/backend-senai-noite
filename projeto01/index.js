var express = require("express")
//var mysql = require("mysql")
var app = express()
var MongoClient = require('mongodb').MongoClient;



/*
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@12345678",
    database: "escola"
});
*/

var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
}
var requestTime = function (req, res, next) {
    console.log('Eu vim aqui...')
    req.requestTime = Date.now();
    next();
};
//registrando o meu middleware

//app.use(myLogger)
app.use(requestTime)

app.get('/ola', function (req, res) {
    var responseText = 'Hello World!';
    responseText += 'Requested at: ' + req.requestTime + '';
    res.send(responseText);
});
app.post('/salvar', function (req, res) {
    db.query("SELECT * FROM alunos", function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result))            
      });
    
   // res.send('Salvando dados...');

});



MongoClient.connect('mongodb://127.0.0.1:27017/animals', function(err, db) {
  if (err) {
    throw err;
  }

  
  
  db.collection('mammals').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });

  app.listen(3000)
});

