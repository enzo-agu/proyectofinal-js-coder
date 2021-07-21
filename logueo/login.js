class Competidor {
  constructor(nombre, apellido, email, cinturon, categoria, password) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.cinturon = cinturon;
    this.categoria = categoria;
    this.password = password;
  }
}

class Torneo {
  constructor(nombre, lugar, fecha, hora, categoria, faixa){
    this.nombre = nombre;
    this.lugar = lugar;
    this.fecha = fecha;
    this.hora = hora;
    this.categoria = categoria;
    this.faixa = faixa;
    this.competidores = [];
  }
}

const cordobaJiujitsu = new Torneo('Cordoba Jiujitsu', 'Cordoba Capital', 'A definirse','A definirse', 'Welter', 'Marron');
localStorage.setItem('torneo', JSON.stringify(cordobaJiujitsu));
// const openCordoba = new Torneo('Open Cordoba', 'Cordoba Capital', 'A definirse','A definirse', 'Pluma', 'Azul');


window.onload = () => {
  document.getElementById('torneo-nombre').innerText = cordobaJiujitsu.nombre;
  document.getElementById('torneo-lugar').innerText = `Lugar: ${cordobaJiujitsu.lugar}`;
  document.getElementById('torneo-fecha').innerText = `Fecha: ${cordobaJiujitsu.fecha}`;
  document.getElementById('torneo-hora').innerText = `Hora: ${cordobaJiujitsu.hora}`;
  document.getElementById('torneo-categoria').innerText = `Cateogria: ${cordobaJiujitsu.categoria}`;
  document.getElementById('torneo-faixa').innerText = `Faixa: ${cordobaJiujitsu.faixa}`;
}

function getCompetidor(email) {
  // Chequeo en mi "base de datos"(localStorage) si existe algun usuario con ese email
  const competidor = JSON.parse(localStorage.getItem(email));
  return competidor; // retorna un objeto o null
}

function validatePassword(competidor, password) {
  return competidor.password === password;
}


/// -----------------INICIO DE SESION DE USUARIOS(COMPETIDORES) REGISTRADOS EN LA APLICACION---------------

function login(e) {
  e.preventDefault();
  // Obtengo los datos del formulario con FormData
  const data = new FormData(e.target);
  // Obtengo los datos de los inputs (email y password)
  const email = data.get('email');
  const password = data.get('password');

  const competidor = getCompetidor(email);

  // Si no existe usuario registrado devuelvo null y termina la funcion
  if (competidor === null) {
    swal({
      title: "Error",
      text: "El usuario no existe en la base de datos",
      icon: "error",
    });
    return;
  }
  console.log(localStorage)


  // Si existe el usuario, chequeo que el password sea correcto
  const checkPassword = validatePassword(competidor, password);

  if (checkPassword === false) {
    swal({
      title: "Error",
      text: "El password es incorrecto",
      icon: "error",
    });
    return;
  }

  //Si el password es correcto devuelvo el usuario logueado
  else {
    localStorage.setItem('competidorLogueado', JSON.stringify(competidor));
    document.getElementById('login-div').hidden = true;
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('user-name').innerText = `Bienvenido, ${competidor.nombre} ${competidor.apellido}`;
    document.getElementById('logged-user').hidden = false;
  }
}


///-------- REGISTRO DE USUARIOS(COMEPTIDORES) A LA APLICACION (PAGINA)-----------------

function registrarCompetidor(e) {
  e.preventDefault();

  const data = new FormData(e.target); // e.target = <form>...</form>;
  const email = data.get('email');

  // Primero chequeo que no exista un usuario(comeptidor) con ese mail registrado
  const existeCompetidor = JSON.parse(localStorage.getItem(email)); // -->  null === no existe registro con ese email
  if (existeCompetidor !== null) {
    swal({
      title: "Error",
      text: "Ya existe un competidor registrado con este mail",
      icon: "error",
    })
    return;
  }
  // Si no existe un usuario(comeptidor) registrado con ese mail, procedo a registrarlo en mi aplicacion  

  const password = data.get('password');
  const nombre = data.get('nombre');
  const apellido = data.get('apellido');
  const cinturon = data.get('faixas');
  const categoria = data.get('categorias');
  const competidor = new Competidor(nombre, apellido, email, cinturon, categoria, password);
  localStorage.setItem(email, JSON.stringify(competidor));
  swal({
    title: "Registrado!",
    text: "Registro exitoso, ahora podes iniciar sesion en la aplicacion",
    icon: "success",
  });
}

//// ----- CIERRE DE SESION --------------------------------

function cerrarSesion(e) {
  e.preventDefault();
  localStorage.removeItem('competidorLogueado');
  document.getElementById('login-div').hidden = false;
  document.getElementById('logged-user').hidden = true;
}

//// ------- REGISTRO A TORNEO ----------------------------

function registrarATorneo(e) {
  e.preventDefault();
  //Se debe registrar al competidor logueado
  const competidor = JSON.parse(localStorage.getItem('competidorLogueado'));
  const torneo = JSON.parse(localStorage.getItem('torneo'));
  if (competidor){
    if(competidor.categoria.toLowerCase() === torneo.categoria.toLowerCase() && 
    competidor.cinturon.toLowerCase() === torneo.faixa.toLowerCase()){
      torneo.competidores.push(competidor); //Registro el competidor al torneo!!
      localStorage.setItem('torneo', JSON.stringify(torneo));
      swal({
        title: "Registrado a torneo!",
        text: `Felicitaciones ${competidor.nombre} ${competidor.apellido}!, te registrate con categoria ${competidor.categoria}
        te notificaremos por mail.`,
        icon: "success",
      })
    } else {
      swal({
        title: "Error",
        text: `Este torneo es para categoria ${torneo.categoria} y cinturon ${torneo.faixa}, 
        tu categoria es ${competidor.categoria} y tu cinturon es ${competidor.cinturon}`,
        icon: "error",
      })
    }
  }
  else {
    swal({
      title: "Para inscribirte al torneo, primero debes registrarte o inciar sesión ",
      text: "No esperes a que pase! ",
      icon: "error",
    })
  }
}

function cancelarInscripcion() {
  const competidor = JSON.parse(localStorage.getItem('competidorLogueado'));
  if (!competidor) {
    swal({
      title: "No existe tu registro",
      text: "Para cancelar debes haberte inscripto",
      icon: "error",
    })
  }
  else {
    const torneo = JSON.parse(localStorage.getItem('torneo')); // torneo.competidores = [{......}]
    const competidoresFiltrado = torneo.competidores.filter((c) => c.email !== competidor.email); // competidoresFiltrado = []
    torneo.competidores = competidoresFiltrado; // torneo.competidores = competidoresFiltrado
    localStorage.setItem('torneo', JSON.stringify(torneo));
    swal({
      title: "Cancelacion!",
      text: "Sin registro!",
      icon: "success",
    });
  }
}