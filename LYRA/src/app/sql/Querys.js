const mysql = require('mysql2');
const encrypt = require('../helpers/EncriptarContraseñas');

const con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "n0m3l0", 
  database: "LYRA"
});

con.connect((err) => {
  if (err) {
    console.error('Error conectando la base de datos:', err);
    throw err;
  }
  console.log('Base de datos conectada');
});

const db = {};
//Consultas
//Marcos
db.buscarUsuario = (nombre_usuario) => {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM usuario NATURAL JOIN persona where nombre_usuario = ?`, [nombre_usuario], (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
// Inserción de datos
// Marcos 
db.RegistrarUsuarios = (nombre, apellido, edad, sexo, correo_electronico, nombre_usuario, pass, id_tipo_usuario) => {
  return new Promise(async(resolve, reject) => {
    const contra = await encrypt.encrypt(pass);
    const query = `CALL agregar_persona_usuario(?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nombre, apellido, edad, sexo, correo_electronico, nombre_usuario, contra, id_tipo_usuario];
    con.query(query, values, (error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
// Modificación de datos
// Gonzalo
db.ActualizardatosDoctor = (Id_Usuario,Nombre,Apellido,Edad,Sexo,Correo)=>{
  return new Promise(async(resolve, reject)=>{
    const query = `CALL actualizar_persona_usuario(?, ?, ?, ?, ?, ?, ?)`;
    const values = [Id_Usuario,Nombre,Apellido,Edad,Sexo,Correo,1];
    con.query(query, values, (error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
//Gonzalo
db.ActualizarPassDoctor = (Usuario,Pass)=>{
  return new Promise(async(resolve, reject) => {
    const PassEn = await encrypt.encrypt(Pass);
    const query = `UPDATE usuario set pass='${PassEn}' where nombre_usuario='${Usuario}'`;
    con.query(query,(error, result) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
// Eliminación de datos
module.exports = db;