//Alertas de Error
//Marco
function UsuarioRegistradoAnteriormente(e){
  swal({
      icon:'error',
      title: '¡Error!',
      text: "El usuario ya está registrado.",
  })
};

//Marco
function UsuarioOConInco(e){
  swal({
      icon:'error',
      title: '¡Error!',
      text: "Contraseña o usuario incorrectos.",
  })
};

function ErrorServidor(e){
  swal({
      icon:'error',
      title: '¡Error!',
      text: "Ocurrió un error con el servidor al realizar esta acción, por favor inténtelo más tarde.",
  })
};
//Alertas acciones completadas
//Marco
function UsuarioRegistrado(e){
  swal({
      icon:'success',
      title: '¡Éxito!',
      text: "El usuario ha sido registrado exitosamente.",
  }).then((confirmar)=>{
    window.location.href='/InicioSesion';
  });
};

