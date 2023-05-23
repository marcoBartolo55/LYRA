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
//Post
router.post('/GerenteSoporte/ActualizarReportesGerenteSoporte',SoporteControllers.ActualizarReportesGerenteSoporte);
router.post('/GerenteSoporte/ActualizarReportesGerenteMantenimiento',SoporteControllers.ActualizarReportesGerenteMantenimiento);
//Gerentete Mantenimiento
router.get('/GerenteMantenimiento',SoporteControllers.PaginaPrincipalGerenteMantenimiento);
//Ingeniero Mantenimiento
router.get('/IngenieroMantenimiento',SoporteControllers.PaginaPrincipalIngenieroMantenimiento);
router.post('/IngenieroMantenimiento/ActualizarReportesIngenieroMantenimiento',SoporteControllers.ActualizarReportesIngenieroMantenimiento);
//Ingeniero Soporte
router.get('/IngenieroSoporte',SoporteControllers.PaginaPrincipalIngenieroSoporte);
router.post('/IngenieroMantenimiento/ActualizarReportesIngenieroSoporte',SoporteControllers.ActualizarReportesIngenieroSoporte);


module.exports= router;