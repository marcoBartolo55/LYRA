const express = require('express');
const router = express.Router();
const SoporteControllers = require('../controllers/SoporteControllers');

//Asistente
//Get
router.get('/Asistente',SoporteControllers.PaginaPrincipalAsistente);

//Post
router.post('/Asistente/AgregarReporte',SoporteControllers.AñadirReporte);
module.exports= router;