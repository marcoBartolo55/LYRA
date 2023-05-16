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
    const GerenteSop = await querys.buscarGerentesManteni();
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
    const Reportes = await querys.BuscarReportesAbiertos();
    res.render('PaginaPrincipalGerenteSoporte',{Usuario,TipoUsu,alerta,datosUsuario,Reportes,formatearFechaHora});
  }catch(error){
    console.log(error);
  }
};

module.exports = Controllers;