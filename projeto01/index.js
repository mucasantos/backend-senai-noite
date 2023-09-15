var express = require("express")
var mysql = require("mysql")
var app = express()

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@12345678",
    database: "escola"
});

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



app.listen(3000)