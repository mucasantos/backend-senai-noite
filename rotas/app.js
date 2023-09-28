
const express = require("express");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//middleware
app.use('/shop',express.static("public"));

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

//Verificar rota nao existente
app.use((req, res) => {
  res.status(404).send({
    error: true,
    message: "Not found...",
  });
});

app.listen(3000, () => {
  console.log("Servidor on line...");
});
