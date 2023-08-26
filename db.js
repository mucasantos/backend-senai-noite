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

    
})

server.listen(3001, () => {
    console.log("Servidor no ar...")
})