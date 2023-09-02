/*
 * Objetivo: (25/08/2023)
* iniciar projeto com o npm init - OK
* Criar um server - OK
* Conectar com o database
* Criar uma tabela no Wokbench
* Conectar e expor os dados via endpoint
? Salvar dados na tabela via endpoint
 */
import { createServer } from 'http';
//importar o mysql
import { createConnection } from 'mysql';

var con = createConnection({
    host: "localhost",
    user: "root",
    password: "@12345678",
    database: "escola"
});

const server = createServer(function (request, response) {
    if(request.url ==='/alunos'){
        //Pega as informaçõpes do DB
        con.query("SELECT * FROM alunos", function (err, result, fields) {
            if (err) throw err;
            response.end(JSON.stringify(result))            
          });
    }else {
        console.log(request.url)

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
    
})

server.listen(3001, () => {
    console.log("Servidor no ar...")
})