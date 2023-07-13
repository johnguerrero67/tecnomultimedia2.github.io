// Variables de sonido

let monitorear = false;

//------VARIABLES A CALIBRAR-----//
let AMP_MIN = 0.006; // umbral mínimo de amplitud. Señal que supera al ruido de fondo
let AMP_MAX = 0.03; // umbral máximo de amplitud. 
let FREC_MIN = 160;
let FREC_MAX = 900;


//-----ENTRADA DE AUDIO----
let mic;
let pitch;
let audioContext; //motor de audio del navegador
//-----GESTOR DE AMP Y PITCH----//
let gestorPitch;
let gestorAmp;

//-----AMPLITUD----
let amp; //variable donde cargo los valores de amplitud del sonido de entrada
let haySonido = false; // vaiable buleana que de define el ESTADO
let antesHabiaSonido = false; //memoria de la variable "haySonido". Guarda el valor de la variable en fotograma anterior
let antesHabiaFrec = false;
//----FRECUENCIA -----
let frecuencia; //variable donde cargo los valores de frecuencia del sonido de entrada
let frecuenciaAnterior; //memoria de la variable "frecuencia". Guarda el valor de la variable en fotograma anterior

//--- CLASIFICACIÓN PARA RUIDO---//
let classifier;
const options = { probabilityThreshold: 0.9 };
let label = 'aplausos'; //Con label llamo a los ruidos 

let confidence;
let estaAplaudiendo = false;
let estaChistando = false;
let estaChasqueando = false;

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
const clasificación_model = 'https://teachablemachine.withgoogle.com/models/arAnej2EL/';
let soundModel = 'https://teachablemachine.withgoogle.com/models/SyNOd-WVL/';

// Variables de imagen y estado
let trazos = [];
let cantFig = 44;
let B = 0;

//POLARES
let x = 40;
let y = 40;
let goLeft = false;
let goLeftForY = false;

let cam;
let estado = "inicial";
let angulo = 0;
let indiceImagenActual = 0;
/*let marcaDeTiempo;
let limiteInicial = 2000;
let limiteMov = 2000;*/

//FONDO
let capacaminante;
let graphics;
let graphicFondo;
let fondos = [];
let cantidad = 5;
let A = 0;
//clase trazos
let tra;


function preload() {
  //carga de clasificación 
  //classifier = ml5.soundClassifier(clasificación_model + 'model.json', options);
  classifier = ml5.soundClassifier(soundModel + 'model.json');
  // Carga las imágenes
  for (let i = 0; i < cantFig; i++) {
    trazos[i] = loadImage('data/figura' + i + '.png');
  }

  //fondo
  for (let i = 0; i < cantidad; i++) {
    var nombre = loadImage("data/fondo" + i + ".png");
    //console.log( nombre );
    // fondos[i] = loadImage( nombre );
    fondos.push(nombre);
  }



}

function setup() {
  createCanvas(900, 616);
  
  graphicFondo = createGraphics(width, height);
  


  imageMode(CENTER);


  //------CLASIFICADOR-----
  classifier.classify(gotResult);

  //---CONFIG DE MIC Y AUDIO---//
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  //--- LLAMO AL GESTOR DE AMP Y PITCH---//
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial(FREC_MIN, FREC_MAX)


  //---DECLARO VARIABLES---//
  antesHabiaSonido = false;
  cam = new Caminante();
  tra = new Trazos();

}

function draw() {
  background(255);

  image(graphicFondo, width / 2, height / 2);


  //Declaramos e inicializamos variables que ayuden al sonido
  let vol = mic.getLevel();//cargo en vol, la apm del mic (señal cruda)
  gestorAmp.actualizar(vol);
  //empiezo a definir si hay sonido o no, cuando eso ocurre
  haySonido = gestorAmp.filtrada > 0.2; //umbral de ruido, si hay sonido


  let iniciarSonido = haySonido && !antesHabiaSonido; //EVENTO DEL INICIO DEL SONIDO
  let finDelSonido = !haySonido && antesHabiaSonido; // EVENTO DEL FINAL DE UN SONIDO



  //monitoreo de gestorPitch y gestorAmp
  if (monitorear) {
    gestorAmp.dibujar(100, 200);
    gestorPitch.dibujar(100, 350);
  }

  antesHabiaSonido = haySonido;

  //let frec = map(gestorPitch.filtrada, 0, 1, FREC_MIN, FREC_MAX); //Mapeo para la frecuencia 
  //let frec = map(frecuencia, FREC_MIN, FREC_MAX, 0, 255); //true

  // PRIMER FONDO
  graphicFondo.background(fondos[A], width / 2, height / 2, width, height);

  image(trazos[4], x, y, 50, 150);

  // AMPLITUD DE AUSENCIA Y PRESENCIA DE SONIDO
  if (haySonido) {
    tra.dibtrazos();
    diagonal(10, 400);
    
    // ACA SE HACE LO DE LAS FIGURAS EN DIAGONAL
    //diagonal(10, 400);
  }
  
 

  //tra.diagonal();
  if (!haySonido) { //AUSENCIA DE SONIDO, SE MUEVE EL CAMINANTE Y ALGUNAS FIGURAS ROTAN
    cam.mover();
    cam.dibujar(graphics);
    tra.rotacionFig();
  }

  // PARTE DE CLASIFICACIÓN

  if (label > 'aplauso') {
    estaAplaudiendo = true;
  } else {
    estaAplaudiendo = false;
  }

  if (label > 'shh') {
    estaChistando = true;
  } else {
    estaChistando = false;
  }

  /*  if(label > 'chasquear'){
    estaChasqueando = true;
   } else {
    estaChasqueando = false;

   } */
  if (label ==' shh' ){
    label ='';
    cam.clear();
  }
  if (label=='aplauso' ){
    label ='';
   A = A + 1; if (A == 5) { A = 0; }
  }
  tra.dibujarcapa1();
  tra.dibtrazos();
  /*if (estaAplaudiendo) {
    //let cual = int( random(cantidad));
    graphicFondo.background(fondos[A], width / 2, height / 2, width, height);
    tra.clear();
    console.log("aplausos");
  }*/



  if (estaChistando) {

  }

  /* if(estaChasqueando){
     image(trazos[indiceImagenActual], 0, 0, width, height);
     indiceImagenActual++;
    if(indiceImagenActual >= trazos.length){
     indiceImagenActual = 0;
    }
    console.log("anda");

   }*/
}
function diagonal(inicial, posx) {
  
  if (goLeft == false) {
    x = x + 3;
  }
  if (goLeft == true) {
    x = x - 3;
  }
  if (x > posx) {
    goLeft = true;
  }
  if (x < inicial) {
    goLeft = false;
  }

  if (goLeftForY == false) {
    y = y + 3;
  }
  if (goLeftForY == true) {
    y = y - 3;
  }
  if (x > posx) {
    goLeftForY = true;
  }
  if (x < inicial) {
    goLeftForY = false;
  }
}













//--------------------- CLASIFICACION DETECTION------------------------------------//
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  //console.log(results);
  // Show the first label and confidence
  label = results[1].label;
  // etiqueta = label;
}


//---------------------PITCH DETECTION-----------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//--------------------------------------------------------------------
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}
//--------------------------------------------------------------------
function modelLoaded() {
  //select('#status').html('Model Loaded');
  getPitch();
  //console.log( "entro aca !" );

}
//--------------------------------------------------------------------
function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      //  let midiNum = freqToMidi(frequency);
      //console.log( midiNum );

      gestorPitch.actualizar(frequency);
      // console.log(frequency);

    }
    getPitch();
  })
}

//-------Clasificador-----
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}
