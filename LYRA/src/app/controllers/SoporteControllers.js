const querys = require('../sql/Querys');
const Controllers={};

function formatearFechaHora(fecha) {
  const fechaObj = new Date(fecha);

  const dia = fechaObj.getDate().toString().padStart(2, '0');
  const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
  const año = fechaObj.getFullYear().toString();
  const hora = fechaObj.getHours().toString().padStart(2, '0');
  const minutos = fechaObj.getMinutes().toString().padStart(2, '0');

  const formatoFechaHora = `Fecha: ${dia}/${mes}/${año} Hora: ${hora}:${minutos}`;

  return formatoFechaHora;
}

//Asistente
Controllers.PaginaPrincipalAsistente =async (req,res,next) => {
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    const GerenteSop = await querys.buscarGerentesSoporte();
    const PacyDoc = await querys.buscarDoctoresyPacientes();
    const Reportes = await querys.BuscarReportesAbiertos();
    res.render('PaginaPrincipalAsistente',{Usuario,TipoUsu,alerta,datosUsuario,PacyDoc,GerenteSop,Reportes,formatearFechaHora});
  }catch(error){
    console.log(error);
  }
};
Controllers.AñadirReporte = async (req,res,next)=>{
  const Usuario = req.session.usuario;
  const {Solicitante,Gerente,Descripcion} = req.body;
  try{
    const Reporte = await querys.AgregarReporte(Solicitante,Usuario,Gerente,Descripcion);
    if (Reporte) {
      return res.redirect('/Soporte/Asistente?alerta=ReporteAgregado')
    }
  }catch(error){
    console.error(error);
    return res.redirect('/Soporte/Asistente?alerta=Error')
  }  
}

//Gerente de Soporte
Controllers.PaginaPrincipalGerenteSoporte= async (req,res,next)=>{
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    const ReportesAbiertos = await querys.BuscarReportesAbiertos();
    const GerentesMantenimiento = await querys.buscarGerentesMantenimiento();
    const IngenirosSoporte = await querys.buscarIngenierosSoporte();
    const TodosReportes = await querys.Reportes();
    res.render('PaginaPrincipalGerenteSoporte',{Usuario,TipoUsu,alerta,datosUsuario,ReportesAbiertos,TodosReportes,GerentesMantenimiento,IngenirosSoporte,formatearFechaHora});
  }catch(error){
    console.log(error);
  }
};

//Todos los usuario
Controllers.EditarDatos = async(req,res,next)=>{
  const Usuario = req.session.usuario;
  const TipoUsu = req.session.tipo_usuario;
  const alerta = req.query.alerta;
  try{
  const datosUsuario =await querys.buscarUsuario(Usuario);
  res.render('EditarDatosSoporte',{Usuario,TipoUsu,datosUsuario,alerta});
  }catch(error){
    console.error(error);
  }
};

//
Controllers.EditarDatosPost = async(req,res,next)=>{
  const {Nombre,Apellidos,Edad,Sexo,Correo} = req.body;
  const Usuario = req.session.usuario;
  try{
    const datosUsuario =await querys.buscarUsuario(Usuario);
    if(datosUsuario.length > 0){
      const ActualizardatosDoctor = await querys.Actualizardatos(datosUsuario[0].id_persona,Nombre,Apellidos,Edad,Sexo,Correo);
      if(ActualizardatosDoctor){
        return res.redirect('/Soporte/EditarPerfil?alerta=Datos Actualizados');    
      }
    }
  }catch(error){
    return res.redirect('/Soporte/EditarPerfil?alerta=Error');
  }
};
//
Controllers.EditarPass = async(req,res,next) =>{
  const Usuario = req.session.usuario;
  const{Pass} = req.body;
  try{
    const PassActualizada = await querys.ActualizarPass(Usuario, Pass);
    if(PassActualizada){
      return res.redirect('/Soporte/EditarPerfil?alerta=Pass Actualizada');
    }
  }catch(error){
    console.error(error);
    return res.redirect('/Soporte/EditarPerfil?alerta=Error Pass');
  }
};
module.exports = Controllers;