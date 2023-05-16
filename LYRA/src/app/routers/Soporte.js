const express = require('express');
const router = express.Router();
const SoporteControllers = require('../controllers/SoporteControllers');

//Asistente
//Get
router.get('/Asistente',SoporteControllers.PaginaPrincipalAsistente);

//Post
router.post('/Asistente/AgregarReporte',SoporteControllers.AñadirReporte);
//Gerente de Soporte
//Get
router.get('/GerenteSoporte',SoporteControllers.PaginaPrincipalGerenteSoporte);
module.exports= router;