const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("O Servidor iniciou!");

    verificaBanco();
});

function verificaBanco() {
    const arquivo = fs.existsSync("db.json");

    if(arquivo) {
        console.log("Banco está funcionando!");
    } else {
        const admin = [
            {
                "id": 1,
                "nome": "admin",
                "senha": "senha123",
                "email": "admin@gmail.com"
            }
        ]

        fs.writeFileSync("db.json", JSON.stringify(admin));
    }
}

// cria o usuario
app.post("/criar-usuario", (request, response) => {

//    const data = request.body;

    const { nome, email, senha } = request.body;

    // le o arquivo em bytes
    const arquivo = fs.readFileSync("db.json");
    
    console.log(arquivo);
    // passa o arquivo para string com o .toString();
    const dbEmString = arquivo.toString();

    console.log(dbEmString);

    const db = JSON.parse(dbEmString);

    var id = undefined;

    db.forEach((user) => {
        console.log(user);
        id = user.id;
    });

    const emailEncontrado = db.findIndex((user) => user.email === email);

    if(emailEncontrado > 0 || emailEncontrado == 1) {
        return response.status(400).json({
            msg: "Email já existente"
        });
    }

    db.push({ id: id + 1, nome: nome, email: email, senha: senha });

    fs.writeFileSync("db.json", JSON.stringify(db));

    return response.status(201).json({
        msg: "Usuario criado com sucesso!"
    });
});

// busca todos
app.get("/buscar-usuarios", (request, response) => {
    const users = JSON.parse(fs.readFileSync("db.json").toString());

    return response.status(200).json({
        msg: "Usuarios encontrados!",
        users
    });
});

// busca um único usuario, / id da pessoa
app.get("/buscar-usuario/:id", (request, response) => {
    const { id } = request.params;

    const users = JSON.parse(fs.readFileSync("db.json").toString());
    // Encontrar index do vetor do objeto
    const index = users.findIndex((user) => {
        // Retorna o usuário que tiver o ID igual
        return user.id == id;
    });

    console.log(index);

    console.log(users[index]);

    return response.status(200).json({
        msg: "Encontramos o seu usuário",
        user: users[index]
    })
});

app.delete("/deletar-usuario/:id", (request, response) => {
    const { id } = request.params;

    const users = JSON.parse(fs.readFileSync("db.json").toString());

    const index = users.findIndex((user) => {
        return user.id == id;
    });

    users.splice(index, 1);
    fs.writeFileSync("db.json", JSON.stringify(users));

    return response.status(200).json({
        msg: "Usuario deletado"
    });


});

app.put("/atualizar-usuario/:id", (request, response) => {
    const { id } = request.params;

    const { email, nome, senha } = request.body;

    const users = JSON.parse(fs.readFileSync("db.json").toString());

    users.forEach((user) => {

        if(user.id == id) {
            user.email = email;
            user.nome = nome;
            user.senha = senha;
        }
    });

    fs.writeFileSync("db.json", JSON.stringify(users));

    return response.status(200).json({
        msg: "Usuario atualizado com sucesso"
    })
});

app.get("/", (request, response) => {
    return response.status(200).json({
        msg: "Estamos online!"
    });
});

