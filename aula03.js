/*
1. Gerenciamento com npm (npm init) - OK
2. Instalar nodemon - OK
3. Verbos HTTP -> teste com insomnia (GET/POST) - OK
4. Recebendo dados de fora
*/

/*
//Recebendo dados
const http = require('http')

const server = http.createServer((req, res) => {

    if (req.url === '/data' && req.method == "POST") {
        var body = '';
        req.on('data', function (data) {
            body += data
        })

        req.on('end', function () {
            var received = JSON.parse(body)
            console.log(received)
            if (received.email === 'muca@gmail.com') {
                res.end("Email OK!!")
            }

        })
        return
    }
})

server.listen(3001)

*/