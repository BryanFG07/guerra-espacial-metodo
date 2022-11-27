let preguntas_aleatorias = true;

window.onload = function () {
  base_preguntas = readText("base-preguntas.json");
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
      title: 'Ha quedado en libertad',
      text:'Pero no por mucho.......',
      confirmButtonText:'Continuar',
      background:'#40724C',
      allowOutsideClick:false,
      allowEscapeKey:false,
      allowEnterKey:false,
      confirmButtonColor:'#389352',
      }).then(function (result) {
      if (result.value) {
          window.location = "/nivel2.html";
      }
  });
  } else {
    btn_correspondiente[i].style.background = "red";
    Swal.fire({
      title: 'Suerte para la proxima',
      text:'La nave enemiga lo ha capturado y no pudo ganar su libertad, tu puntuación es: 15',
      confirmButtonText:'Regresar al inicio',
      background:'#D34D4D',
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
var tiempop=300;
setInterval(TiempoPreguntas,1000);

function TiempoPreguntas(){
  document.getElementById("tiempop").innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;Tiempo: " + tiempop;
  tiempop=tiempop-1;
  if(tiempop==0){
    document.getElementById('tiempop').style.display="none";
    puntostotales=15+puntos;
        Swal.fire({
            title: 'Perdiste',
            text:'El tiempo se ha agotado, tu puntuación es: 15',
            icon:'error',
            confirmButtonText:'Volver al inicio',
            background:'#D34D4D',
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

//CODIGO DE NIVEL****************************************************************************


document.getElementById('jugador').addEventListener("mouseover",SumarPuntos);
var tiempo=57;
var puntos=0;
var puntosnecesario=20;
var ene=document.getElementById('enemigo1');
ene.style.width='80px';
ene.style.height='80px';
var Nivel=2;
var puntostotales=0;
document.getElementById("puntos").innerHTML="Puntos: <b>" + puntos + "/" + puntosnecesario + "  </b>";
document.getElementById('enemigo1').addEventListener("mouseover",Pregunta);

function SumarPuntos(){
    puntos++;
    puntostotales++;
    document.getElementById("puntos").innerHTML="Puntos: <b>" + puntos + "/" + puntosnecesario + "  </b>";
    var NumeroRandom=Math.round(Math.random()*550);
    var NumeroRandom2=Math.round(Math.random()*550);
    document.getElementById("jugador").style.marginTop=NumeroRandom+"px";
    document.getElementById("jugador").style.marginLeft=NumeroRandom2+"px";
    if(puntos==20){
      siguiente();
    }

}

function RestarTiempo(){
    tiempo=tiempo-1;
    document.getElementById("tiempo").innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;Tiempo: " + tiempo + " ";
    if(tiempo==0)
    {
      document.getElementById('tiempo').style.display="none";
      puntostotales=15+puntos;
        Swal.fire({
            title: 'Perdiste',
            text:'El tiempo se ha agotado, tu puntuación es: '+(puntostotales),
            icon:'error',
            confirmButtonText:'Volver al inicio',
            background:'#D34D4D',
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
setInterval(RestarTiempo,1000);

function enemigo1()
{
    NumeroRandom3=Math.round(Math.random()*550);
    NumeroRandom4=Math.round(Math.random()*550);
    document.getElementById("enemigo1").style.marginLeft=NumeroRandom3+"px";
    document.getElementById("enemigo1").style.marginTop=NumeroRandom4+"px";
}

function Mover(){
    enemigo1();
}
setInterval(Mover,1000);

function Pregunta(){
  tiempo=100000;
  document.getElementById('tiempo').style.display="none";
    Swal.fire({
        title: 'Lo ha capturado la nave enemiga',
        text:'Para ser liberado debe de resolver un método',
        icon:'warning',
        confirmButtonText:'Ir a resolverlo',
        background:'#853400',
        allowOutsideClick:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        confirmButtonColor:'#c06500',
    }).then(function (result) {
        if (result.value) {
            window.location = "/preguntas2.html";
        }
    });
}
function siguiente(){
    Nivel++;
    tiempo=100000;
    document.getElementById('tiempo').style.display="none";
    Swal.fire({
        title: 'Felicidades',
        text:'Ha completado el nivel '+(Nivel-1),
        icon:'success',
        confirmButtonText:'Siguiente nivel',
        background:'#40724C',
        allowOutsideClick:false,
        allowEscapeKey:false,
        allowEnterKey:false,
        confirmButtonColor:'#389352',
    }).then(function (result) {
      if (result.value) {
          window.location = "/nivel3.html";
      }
  });
}
