//importar o express
const express = require("express");
//iniciar as Rotas
const router = express.Router(); // Este R tem q ser maiusculo

//copiar do nosso app.js e apagar de lá. Trocar o verbo
// por router
router.post("/add-product", (req, res) => {

    console.log(req.body.email)
  res.send({
    created: "OK",
    sucess: true,
    method: "POST"

  });
});
router.get("/add-product", (req, res) => {
    res.send({
      created: "OK",
      sucess: true,
      method: "GET"
    });
  });
router.post("/delete-product", function (req, res) {
  res.send({ deleted: "OK" });
  
});

//exportar para ter acessos em outros locais
module.exports = router;
