const querys = require('../sql/Querys');
const Controllers={};
Controllers.Principal = async(req,res,next)=>{
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  try{
  const datosUsuario =await querys.buscarUsuario(Usuario);
  res.render('PaginaPrincipalPsicologos',{Usuario,TipoUsu,datosUsuario});
  }catch(error){
    console.error(error);
  }
};

Controllers.EditarDatos = async(req,res,next)=>{
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
  const datosUsuario =await querys.buscarUsuario(Usuario);
  res.render('EditarDatosDoctor',{Usuario,TipoUsu,datosUsuario,alerta});
  }catch(error){
    console.error(error);
  }
};

Controllers.EditarDatosPost = async(req,res,next)=>{
  const {Nombre,Apellidos,Edad,Sexo,Correo} = req.body;
  const Usuario = req.session.usuario;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    if(datosUsuario.length > 0){
      const ActualizardatosDoctor = await querys.ActualizardatosDoctor(datosUsuario[0].id_persona,Nombre,Apellidos,Edad,Sexo,Correo);
      if(ActualizardatosDoctor){
        return res.redirect('/Psicologo/EditarPerfil?alerta=Datos Actualizados');    
      }
    }
  }catch(error){
    return res.redirect('/Psicologo/EditarPerfil?alerta=Error');
  }
};

Controllers.EditarPass = async(req,res,next) =>{
  const Usuario = req.session.usuario;
  const{Pass} = req.body;
  try{
    const PassActualizada = await querys.ActualizarPassDoctor(Usuario, Pass);
    if(PassActualizada){
      return res.redirect('/Psicologo/EditarPerfil?alerta=Pass Actualizada');
    }
  }catch(error){
    console.error(error);
    return res.redirect('/Psicologo/EditarPerfil?alerta=Error Pass');
  }
};
module.exports = Controllers;