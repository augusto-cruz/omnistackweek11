const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Login
routes.post('/sessions', SessionController.create);


// Lista todas as ONGs
routes.get('/ongs', OngController.index);
// Cadastrar Nova ONG
routes.post('/ongs', OngController.create);


// Lista todas os INCIDENTS
routes.get('/incidents', IncidentController.index);
// Cadastrar novo INCIDENT
routes.post('/incidents', IncidentController.create);
// Deleta um INCIDENT
routes.delete('/incidents/:id', IncidentController.delete);


// Lista os INCIDENTS de uma ONG especifica
routes.get('/profile', ProfileController.index);


// Exportando variavel routes
module.exports = routes;