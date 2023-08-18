console.log("Início de tudo!!")

//HTTP (VERBOS)
/**
 * GET --> Pegar uma informação
 * POST -> Enviar uma informação
 * DELETE
 * PUT
 * PATCH
 */
//Criar servidor nodejs
// 1 passo - importar o http
const http = require('http');
// 2 Passo --> criar o meu servidor
const myServer = http.createServer((req, res) => {
    //3 Passo Definir as rotas
    console.log(req.url)
    if (req.url === '/products') {
        //4 Passo Responder para o usuário
        res.end("<h1>Mostrando produtos...</h1>")
    } else if (req.url === '/save') {
        res.end('<html><img src="https://www.shutterstock.com/image-illustration/save-floppy-disk-icon-isolated-260nw-1033495240.jpg" alt=""></html>')
    }
    else if (req.url === '/maca') {
        res.end(`
       <html>
       <button>Clique!</button>
       </html>
       `)
    } else {
        res.end("<html>Nao encontrado...</html>")
    }
})
//Abrir a porta do servidor
myServer.listen(3001, () => {
    console.log('Servidor no ar...')
})


/**Atividade 01:
 * 
 * Criar 3 endpoints
 * O primeiro mostra um pequeno formulário de login
 * O Segundo uma página com imagem e texto
 * O terceiro, um video do youtube
 * Caso o usuario digite algum endpoint errado, 
 * mostrar uma imagem 404 (Nao encontrado)
 */
