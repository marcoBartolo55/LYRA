const encrypt = require('../helpers/EncriptarContraseñas');
const querys = require('../sql/Querys');
const Controllers={};
//Get
Controllers.IndexGet=(req,res,next)=>{
    req.session.destroy();
    res.render('Index');
};
//Marco
Controllers.RegistroPacientesGet=(req,res,next)=>{
    const alerta = req.query.alerta;
    res.render('RegistroPacientes',{alerta});
};
//Marco
Controllers.InicioSesionGet=(req,res,next)=>{
  req.session.destroy();
  const alerta = req.query.alerta;
  res.render('InicioSesion',{alerta});
};
//Marco
Controllers.RegistroPsicolosGet=(req,res,next)=>{
  const alerta = req.query.alerta;
  res.render('RegistroPsicologos',{alerta});
}
//Post
//Marco
Controllers.RegistroPacientesPost = async (req, res, next) => {
  const { Nombre, Apellidos, Edad, Sexo, Usuario, Correo, Pass } = req.body;

  try {
    const usuarioExistente = await querys.buscarUsuario(Usuario);
    
    if (usuarioExistente.length > 0) {
      return res.redirect('/RegistroPacientes?alerta=Usuario ya registrado');
    }

    await querys.RegistrarUsuarios(Nombre, Apellidos, Edad, Sexo, Correo, Usuario, Pass,2);
    return res.redirect('/RegistroPacientes?alerta=Usuario registrado');
  } catch (error) {
    console.error(error);
    return res.redirect('/RegistroPacientes?alerta=Error Servidor');
  }
}
//Marco
Controllers.RegistroPsicologosPost = async (req, res, next) => {
  const { Nombre, Apellidos, Edad, Sexo, Usuario, Correo, Pass } = req.body;

  try {
    const usuarioExistente = await querys.buscarUsuario(Usuario);
    
    if (usuarioExistente.length > 0) {
      return res.redirect('/RegistroPsicologos?alerta=Usuario ya registrado');
    }

    await querys.RegistrarUsuarios(Nombre, Apellidos, Edad, Sexo, Correo, Usuario, Pass,1);
    return res.redirect('/RegistroPsicologos?alerta=Usuario registrado');
  } catch (error) {
    console.error(error);
    return res.redirect('/RegistroPsicologos?alerta=Error Servidor');
  }
}

//Marco 
Controllers.InicioSesionPost = async (req, res, next) => {
  const { Usuario, Pass } = req.body;
  
  try {
    const usuarioExistente = await querys.buscarUsuario(Usuario);

    if (usuarioExistente.length > 0 && await encrypt.compare(Pass, usuarioExistente[0].pass)){
      const idTipoUsuario = usuarioExistente[0].id_tipo_usuario;
      req.session.usuario=Usuario;
      req.session.tipo_usuario=idTipoUsuario;

      switch (idTipoUsuario) {
        case 1:
          res.redirect('/Psicologo');
          break;
        case 2:
          // Código para usuario de tipo 2
          break;
        case 3:
          // Código para usuario de tipo 3
          break;
        case 4:
          // Código para usuario de tipo 4
          break;
        case 5:
          // Código para usuario de tipo 5
          break;
        case 6:
          // Código para usuario de tipo 6
          break;
        case 7:
          // Código para usuario de tipo 7
          break;
        case 8:
          // Código para usuario de tipo 8
          break;
        default:
          // Código para otro caso
      }
    }else{
      return res.redirect('/InicioSesion?alerta=Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error(error);
    return res.redirect('/InicioSesion?alerta=Error Servidor');
  }
};


module.exports = Controllers;