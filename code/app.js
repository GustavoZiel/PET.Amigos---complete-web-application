import express from "express";
import sequelize from './src/base_dados/db.js';
import apirouter from "./src/routes/api.routes.js";

const app = express();
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apirouter);

// Testando a conexão
sequelize.authenticate()
.then(() => {
    console.log('Conexão com o banco de dados foi bem-sucedida.');
})
.catch(err => {
    console.log('aaa')
    console.error('Não foi possível conectar ao banco de dados: aaaaaaaaaaaaaaaaaaaaaa', err);
});

const port = 3002;
app.listen(port, function () {
  console.log("Serviço executanto na porta " + port);
});