import express from "express";
import sequelize from './src/db/db.js';
import apirouter from "./src/routes/api.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apirouter);
app.use(cors());
app.use(express.static('public'))

// Testando a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi bem-sucedida.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados: ', err);
  });

const port = 3000;
app.listen(port, function () {
  console.log("Serviço executanto na porta " + port);
});