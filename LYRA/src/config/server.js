const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

//configuración
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'../app/views'));
app.use(express.static(path.join(__dirname,'../app/public')));
app.use(session({
    secret: 'yomerocaguamero',
    resave: false,
    saveUninitialized: false,
  }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

//importar rutas
const Principal = ('../app/routers/Principal.js');
const Paciente = ('../app/routers/Paciente.js');
const Psicologo = ('../app/routers/Psicologo.js');
const Soporte = ('../app/routers/Soporte.js');

//rutas
app.use('/',Principal);
app.use('/Paciente',Paciente);
app.use('/Psicologo',Psicologo);
app.use('/Soporte',Soporte);
module.exports = app;

// namas para tener cambios de entradas