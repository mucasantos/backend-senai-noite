/**Revisão
 * 1. Criar um servidor HTTP
 *2. Conectar database
  */
//Passo 1 => Importar o pacote HTTP (package)
import { createServer } from 'http';
//Para leitura e gravação de arquivos, vamos importar o pacote "fs"
import fs from 'fs';


//Database
import { createConnection } from 'mysql';

var con = createConnection({
  host: "localhost",
  user: "root",
  password: "@12345678",
  database: "escola"

});
 
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Criar um DAtabase = schema
//  con.query("CREATE DATABASE mydb", function (err, result) {
//    if (err) throw err;
//    console.log("Database created");
//  });
});

//error: Qual erro ....

//Passo 2 => criar servidor
const server = createServer((request, response) => {
    //Vamos criar os endpoints da API
    //Dependendo da regra de negócio, criaremos os nossos
    //endpoints

    if (request.url === '/produtos') {
        response.setHeader("Content-Type", "application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        response.write('<html>')
        response.write('<head><title>Digite uma mensagem</title></head>')
        response.write('<body><form action="/message" method="POST"><input type="text"><button type="submit">Enviar</button></form></body>')
        response.write('</html>')
        response.end()
    }

    if(request.url === '/alunos'){
        con.query("SELECT * FROM alunos", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            response.end(JSON.stringify(result))
          });
    }

    if(request.url === '/save' && request.method === 'POST'){

        var body = '';
        var sql = '';
        request.on('data', function (data) {
            body += data
        })

        request.on('end', function () {
            var received = JSON.parse(body)
            console.log(received)
           
            sql = "INSERT INTO alunos (nome, email, telefone, escola) VALUES ('" + received.nome +  "','" + received.email +"', '" + received.telefone+"' , '" + received.escola + "')";
            con.query(sql, function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                response.end(JSON.stringify(result))
              });
        })

        
    }


    if (request.url === '/message' && request.method === 'POST') {

        //lendo os dados
        const body = []
        request.on('data', (data) => {
            console.log(data)

            body.push(data)
        })

        request.on('end', function () {

            console.log(body)
                      
           // fs.writeFileSync('message.txt', body)

        })

        response.statusCode = 302
        response.setHeader('Location', '/')
        response.end()
    }
})
//Passo 3 => abrir a porta do servidor
server.listen(3001, () => {
    console.log("Servidor no ar...")
})

