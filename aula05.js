/**Revisão
 * 1. Criar um servidor HTTP
 * 2. Comando setHeader (redirect user)
 * 3. Comando write
 * 4. Redirecionando
 * 5. Ler um arquivo do disco local e servir na WEB - html
  */
//Passo 1 => Importar o pacote HTTP (package)
const http = require('http')
//Para leitura de arquivos, vamos importar o pacote "fs"
const fs = require('fs')

//Criar uma função que pega dois params: response e o file (nomes criados por mim)
function readFile(response, file) {
    fs.readFile(file, function (err, data) {
        console.log(err)
        //responde para o usuário com os dados do arquivo
        response.end(data)
    })
}

//Passo 2 => criar servidor
const server = http.createServer((request, response) => {
    //Vamos criar os endpoints da API
    //Dependendo da regra de negócio, criaremos os nossos
    //endpoints

    if (request.url === '/') {
        readFile(response, 'index.html')
    } else if (request.url === '/dogs-racas') {
        readFile(response, 'dogs-racas.json')
    } else if (request.url === '/cats-racas') {
        readFile(response, 'cats-racas.json')
    } else {
        response.end(JSON.stringify({
            error: true,
            message: "Data not found..."
        }))
    }
})
//Passo 3 => abrir a porta do servidor
server.listen(3001, () => {
    console.log("Servidor no ar...")
})

