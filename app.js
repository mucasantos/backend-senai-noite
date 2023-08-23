const http = require('http')

/**Verbos HTTP
 * GET -> Pegando recursos/dados do servidor
 * POST -> Utilizamos para GRAVAR recursos
 */

//Criar um endpoint signup que o método seja POST

const server = http.createServer(function (req, res) {

    if (req.url === '/login' && req.method == 'POST') {
        console.log("Caiu em Data...")
        res.end('Tudo certo por aqui...')
        //Verificar as cred
        //if ok --> navegar pra frente
    } else if (req.url === '/signup' && req.method == 'POST') {
        //Variável auxilar
        var body = '';
        //Forma como o nodejs "escuta" os dados vindo de fora (POST)
        req.on('data', function (data) {
            body = body + data
        })
        //Verifica se já finalizou
        req.on('end', function () {
            //Converte para JSON
            var received = JSON.parse(body)
            console.log(received)
            if (received.email === 'muca@gmail.com') {
                res.end("Email OK!!")
            } else {
                
                res.end("Verifique o Email !")
            }
        })
       // res.end("OK")
        return

    } else if (req.url === '/gravar' && req.method == 'POST') {
        res.statusCode = 401

        res.end("Sem autorização!!")
    }
    else {
        res.statusCode = 404
        res.end('Verifique...')
    }

})

server.listen(3001, () => {
    console.log("Servidor on...")
})