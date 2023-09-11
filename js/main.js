
//obtengo los elementos del DOM
const btnMusica = document.getElementById('musica');
const botonInicio = document.getElementById('iniciar');
const contenedor = document.getElementById('contenedor');
const reglas = document.getElementById('reglasDeJuego');
const puntuacion = document.getElementById('puntuacion');
const temporizador = document.getElementById('temporizador');


//personaje
let pj;
let perdio;
let puntos = 0;
//tiempo
let tiempo = new Date();
let tiempoDelta = 0;
let tiempoRestante = 12000; // Tiempo inicial en milisegundos (2 minutos)


let tiempoHastaObstaculo = 3; // Tiempo hasta la próxima generación de obstáculos
let tiempoMinObs = 1;// Tiempo mínimo entre obstáculos
let tiempoMaxObs = 5;// Tiempo máximo entre obstáculos
let obstaculos = [];
//sonido
let mscMuerte = new Audio('musica/candy-crush.mp3');
let mscInicio = new Audio('musica/inicio.mp3')
let mscSalto = new Audio('musica/salto.mp3')
let mscBonus = new Audio('musica/bonus.mp3')
let mscPlay = false;


function gameStart() {
   pj = new personaje("personaje", contenedor); //Crea instancia del personaje
   pj.crearDiv();
   tiempoRestante =120000;  // Reinicia tiempo restante a 1 minuto
   
   reinicio(); // Reiniciar el juego (eliminar obstáculos existentes)
   //intervalo del juego
   i = setInterval(function () {
      tiempoDelta = (new Date() - tiempo) / 1000; // Calcula tiempo transcurrido desde la última actualización
      tiempo = new Date();
      actualizar();
   },60);
}

function reinicio() {
   if (obstaculos.length >= 1) {
      for (let i = obstaculos.length - 1; i >= 0; i--) {
         //llamo al eliminar div
         obstaculos[i].eliminarDiv();
         obstaculos.splice(i, 1); // Elimina el obstáculo del arreglo
      }
   }
}

//game loop
function actualizar() {
   temporizadorObtaculo();
   MoverObstaculos();
   if (DetectarColision() || tiempoRestante <= 0) { // Verificar si hay colisión o tiempo agotado
      gameOver(); 
   }
   actualizarTemporizador();
}
// Actualizar el temporizador 
function actualizarTemporizador() {
   //PROBLEMA QUE NO SUPE RESOLVER: el tiempo no pasa en segundos , no se que sea lo que no estare acomodando, pasa mas rapido el tiempo

   tiempoRestante -= 120;  // Restar tiempo (120 milisegundos) desde la última actualización
   temporizador.innerHTML = "Tiempo:" + parseInt(tiempoRestante / 1000); //Muestra el tiempo restante
}
// Controlar la generación de obstáculos
function temporizadorObtaculo() {
   tiempoHastaObstaculo = tiempoHastaObstaculo - tiempoDelta; // Restar tiempo desde la última actualización
   if (tiempoHastaObstaculo <= 0) {
      CrearObstaculo();
   }
}

// Crea nuevo obstaculo
function CrearObstaculo() {
   
   obst = Math.floor(Math.random() * 5); // Generar un número aleatorio entre 0 y 4
   //creo un algodon de azucar (lo identifico como reloj por que se suma el tiempo) para aumentar el tiempo
   if (obst == 4) {
      let obs = new obstaculo("reloj", 15, contenedor);
      obs.crearDiv();
      obstaculos.push(obs);
   }
   else{
      let obs = new obstaculo("obstaculo", 15, contenedor);
      
      obs.crearDiv();
   
      obstaculos.push(obs);
   }
   tiempoHastaObstaculo = tiempoMinObs + Math.random() * (tiempoMaxObs - tiempoMinObs); // Establece tiempo hasta el siguiente obstáculo
}
// Mover los obstáculos existentes
function MoverObstaculos() {
   
   for (let i = obstaculos.length - 1; i >= 0; i--) {
    
      if (obstaculos[i].seFueDePantalla()) {
       
         obstaculos[i].eliminarDiv();
       
         obstaculos.splice(i, 1);
        
         puntos += 1;  // Incrementar la puntuación
       
         puntuacion.innerHTML = "Puntuacion:" + puntos; // Actualizar la puntuación en la interfaz
      } else {
         
         obstaculos[i].mover(); // Mover el obstáculo
      }
   }
}
// Detectar colisión entre el personaje y los obstáculos
function DetectarColision() {   
   for (let i = 0; i < obstaculos.length; i++) {
      if (pj.coliciono(obstaculos[i]) && (obstaculos[i].getEstilo() == "reloj")) {
         obstaculos[i].eliminarDiv();
         tiempoRestante += 3000; // Aumentar el tiempo restante en 3 segundos
         obstaculos.splice(i, 1); // Eliminar el obstáculo del arreglo
         mscBonus.play();
      }
      if (pj.coliciono(obstaculos[i]) && !(obstaculos[i].getEstilo() == "reloj")) {
         return true;
      }
   }
}
botonInicio.addEventListener("click", (e) => { // Controlar evento de clic en el botón de inicio/reinicio
   gameStart(); // Iniciar/reiniciar el juego
   mscInicio.play();
   perdio = false; // Restablecer la variable perdio a false
   //Reinicio el puntuador
   puntos = 0;
   puntuacion.innerHTML = "Puntuacion:" + puntos;
   reglas.classList.add('ocultar'); // Ocultar las reglas del juego
   botonInicio.classList.toggle('ocultar'); // Ocultar el botón de inicio
});
// Función para cuando el juego termina
function gameOver() {
   clearInterval(i); // Detener el intervalo del juego
   pj.muerte(); //Ejecuta animacion personaje
   mscMuerte.play(); // Reproducir el sonido de muerte
   perdio = true;
   botonInicio.innerHTML = 'reiniciar'; // Cambiar el texto del botón de inicio a "reiniciar"
   botonInicio.classList.toggle('ocultar');
}

// Controlar eventos de teclado
document.addEventListener("keydown", function (event) {
   const tecla = event.key.toLowerCase();
   if (perdio == false) {
      if ( tecla === " ") {
         pj.salto(); // Realizar un salto del personaje al presionar la tecla de espacio
         mscSalto.play();
      }
   }
});

