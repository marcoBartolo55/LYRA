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

//Roberto
db.BuscarPacientes = (Paciente)=>{
  return new Promise(async(resolve, reject)=>{
    const query = `SELECT * FROM usuario WHERE nombre_usuario ='${Paciente}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Roberto
db.BuscarEnlaces = (Paciente)=>{
  return new Promise(async(resolve, reject)=>{
    const query = `SELECT * FROM psicologo_paciente where nombre_Paciente ='${Paciente}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

//Roberto
db.DesplegarPacientes = (Doctor)=>{
  return new Promise(async(resolve, reject) =>{
    const query = `SELECT * FROM vista_pacientes_doctor where nombre_Doctor = '${Doctor}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
};

db.InfoPacientes = (Paciente)=>{
  return new Promise(async(resolve, reject) =>{
    const query = `SELECT * FROM datospaciente where nombre_usuario = '${Paciente}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
};

db.BuscarResumenes=(Paciente)=>{
  return new Promise(async(resolve, reject) =>{
    const query = `SELECT * FROM resumen_conversacion NATURAL JOIN psicologo_paciente where nombre_Paciente ='${Paciente}'`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
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

//Roberto
db.EnlzarPsicoDoc = (Paciente,Psicologo)=>{
  return new Promise(async(resolve, reject) => {
    const query = `INSERT INTO psicologo_paciente values(default,'${Paciente}','${Psicologo}')`;
    con.query(query,(error,result)=>{
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
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