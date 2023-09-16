const path = require('path')
const express = require("express");
const router = express.Router(); // Este R tem q ser maiusculo
// importar o path para gerenciamento de endereço dos arquivos 
//para serem servidos

router.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'))
});
router.get("/brands", (req, res) => {
  res.send({ brands: "OK" });
});

//exportar para ter acessos em outros locais
module.exports = router;
