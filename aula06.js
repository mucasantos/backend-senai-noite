/**Inicio express com nodejs
 * 1;.Instalar/uso
 * 2.Roteamento
*/
//importando e criando a instância
const express = require('express')
const app = express()
const port = 3001

//Database
const mysql = require( 'mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@12345678",
  database: "estoque" // chamado de Schema no MySQL

});

app.get('/produtos/:id', (req,res)=> {
    //criando variavel
let id = req.params.id
let consulta = "SELECT * FROM produtos WHERE id = " + id

    con.query(consulta, function (err, result, fields) {
        if (err) throw err;
        res.json(result)
      });
})

app.get('/produtos', (req,res)=> {
    con.query("SELECT * FROM produtos", function (err, result, fields) {
        if (err) throw err;
        res.json(result)
      });
})

app.post('/save', (req,res)=> {
    res.send({test: "OK POST"})
})

//iniciar o server
app.listen(port, ()=>{
    console.log("Servidor do ar...")
})

