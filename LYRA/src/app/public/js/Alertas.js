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
  
  //Marco
  function SesionCaducada(e){
    swal({
        icon:'error',
        title: '¡Error!',
        text: "Tu sesión se ha caducado, por favor vuelve a iniciar sesión.",
    }).then((confirmar)=>{
      window.location.href='/InicioSesion';
    });
  };
  
  //Marco
  function NoPermisos(e){
    swal({
        icon:'error',
        title: '¡Error!',
        text: "No tienes permiso para acceder a esta función, por favor vuelve a iniciar sesión.",
    }).then((confirmar)=>{
      window.location.href='/InicioSesion';
    });
  };
  
  //Gonzalo
  function DatosNoActulizados(e){
    swal({
        icon:'error',
        title: '¡Error!',
        text: "Perfil no actualizado, porfavor intentelo más tarde",
    });
  };
  
  //Gonzalo
  function PassNoActulizada(e){
    swal({
        icon:'error',
        title: '¡Error!',
        text: "Contraseña no actualizada, porfavor intentelo más tarde",
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
  
  //Gonzalo
  function DatosActulizados(e){
    swal({
        icon:'success',
        title: '¡Éxito!',
        text: "Perfil actualizado.",
    });
  };
  
  //Gonzalo
  function PassActulizada(e){
    swal({
        icon:'success',
        title: '¡Éxito!',
        text: "Contraseña actualizada.",
    });
  };