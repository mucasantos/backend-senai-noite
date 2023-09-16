const express = require('express')
const app = express();
const bodyParser = require('body-parser')






//Agora podemos importar as rotas aqui

const adminRoutes = require('./routes/admin')

//agora colocamos em um middleware

app.use(adminRoutes)

app.use(bodyParser.urlencoded({extended:false}))

app.post('/add-product', (req,res,next) =>{
    console.log(req.body);
    res.send({created: "OK"})
})

app.post('/delete-product', (req,res,next) =>{
    console.log(req.body);
    res.send({deleted: "OK"})
})

app.get('/all-products', (req,res,next) => {
    res.send({products: "OK"})

})


app.listen(3000);