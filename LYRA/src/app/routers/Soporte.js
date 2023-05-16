const express = require('express');
const router = express.Router();
const SoporteControllers = require('../controllers/SoporteControllers');
//Todos
//Get
router.get('/EditarPerfil',SoporteControllers.EditarDatos);
//Post
router.post('/EditarPerfil',SoporteControllers.EditarDatosPost);
router.post('/EditarPass',SoporteControllers.EditarPass);

//Asistente
//Get
router.get('/Asistente',SoporteControllers.PaginaPrincipalAsistente);

//Post
router.post('/Asistente/AgregarReporte',SoporteControllers.AñadirReporte);
//Gerente de Soporte
//Get
router.get('/GerenteSoporte',SoporteControllers.PaginaPrincipalGerenteSoporte);
module.exports= router;