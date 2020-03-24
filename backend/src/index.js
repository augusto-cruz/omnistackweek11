const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// Instanciacao da Aplicacao
const app = express();

// Habilita o CORS
app.use(cors());

// Indica para o express que todas as requisicoes seram no formato JSON
app.use(express.json());

// Usando as rotas criadas
app.use(routes);

// Aplicacao escuta na porta 3333
app.listen(3333);