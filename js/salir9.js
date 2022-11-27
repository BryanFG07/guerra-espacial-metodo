let preguntas_aleatorias = true;

window.onload = function () {
  base_preguntas = readText("base-preguntas2.json");
  interprete_bp = JSON.parse(base_preguntas);
  escogerPreguntaAleatoria();
};

let pregunta;
let posibles_respuestas;
btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];
let npreguntas = [];

let preguntas_hechas = 0;
let preguntas_correctas = 0;

function escogerPreguntaAleatoria() {
  let n;
  if (preguntas_aleatorias) {
    n = Math.floor(Math.random() * interprete_bp.length);
  } else {
    n = 0;
  }
  npreguntas.push(n);
  escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
  let pc = preguntas_correctas;
  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
}

function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) {
  if (posibles_respuestas[i] == pregunta.respuesta) {
    btn_correspondiente[i].style.background = "green";
    Swal.fire({
      title: 'Felicidades, gano 100 puntos extras',
      text:'Su puntuación es '+(100+221),
      confirmButtonText:'Continuar',
      background:'#40724C',
      allowOutsideClick:false,
      allowEscapeKey:false,
      allowEnterKey:false,
      confirmButtonColor:'#389352',
      }).then(function (result) {
      if (result.value) {
          window.location = "/index.html";
      }
  });
  } 
  if (posibles_respuestas[i] == pregunta.incorrecta1) {
    btn_correspondiente[i].style.background = "green";
    Swal.fire({
      title: 'Ha perdido 20 puntos',
      text:'Su puntuación es '+(221-20),
      confirmButtonText:'Continuar',
      background:'#A60909',
      allowOutsideClick:false,
      allowEscapeKey:false,
      allowEnterKey:false,
      confirmButtonColor:'#389352',
      }).then(function (result) {
      if (result.value) {
          window.location = "/index.html";
      }
  });
  } 
  if (posibles_respuestas[i] == pregunta.incorrecta2) {
    btn_correspondiente[i].style.background = "green";
    Swal.fire({
      title: 'Perdio el 50% de los puntos',
      text:'Su puntuación es '+(0.5*221),
      confirmButtonText:'Continuar',
      background:'#A60909',
      allowOutsideClick:false,
      allowEscapeKey:false,
      allowEnterKey:false,
      confirmButtonColor:'#389352',
      }).then(function (result) {
      if (result.value) {
          window.location = "/index.html";
      }
  });
  } 
  if (posibles_respuestas[i] == pregunta.incorrecta3) {
    btn_correspondiente[i].style.background = "green";
    Swal.fire({
      title: 'Felicidades ha ganado 20 puntos extras',
      text:'Su puntuación final es '+(20+221),
      confirmButtonText:'Continuar',
      background:'#40724C',
      allowOutsideClick:false,
      allowEscapeKey:false,
      allowEnterKey:false,
      confirmButtonColor:'#389352',
      }).then(function (result) {
      if (result.value) {
          window.location = "/index.html";
      }
  });
  } 
}
function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}