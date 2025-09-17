let ataqueJugador; 
let ataqueEnemigo;

// CLASE PERSONAJE (POO)
class Personaje {
  constructor(nombre, vidas = 3, ataques = ["Punio", "Patada", "Barrida"]) {
    this.nombre = nombre;
    this.vidas = vidas;
    this.ataques = ataques;
  }
}

// LISTADO BASE DE PERSONAJES
const personajes = [
  new Personaje("Zuko"),
  new Personaje("Katara"),
  new Personaje("Aang"),
  new Personaje("Toph"),
  new Personaje("Azula"), 
  new Personaje("Iroh")   
];

// Variables de secciones
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
const sectionReiniciar = document.getElementById('reiniciar');
const sectionReglas = document.getElementById('reglas-del-juego');
const sectionMensajes = document.getElementById('mensajes');

// Variables de botones
const botonPersonajeJugador = document.getElementById('boton-personaje');
const botonReglas = document.getElementById('boton-reglas');
const botonJugar = document.getElementById('boton-jugar');
const botonPunio = document.getElementById('boton-punio');
const botonPatada = document.getElementById('boton-patada');
const botonBarrida = document.getElementById('boton-barrida');
const botonReiniciar = document.getElementById('boton-reiniciar');

// Variables de spans dinámicos
const spanPersonajeJugador = document.getElementById('personaje-jugador');
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

// VARIABLES DE JUEGO (instancias clonadas)
let personajeJugador = null;
let personajeEnemigo = null;

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionReglas.style.display = 'none';
    botonJugar.style.display = 'none';
    sectionSeleccionarPersonaje.style.display = 'block';
    
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);
    botonReglas.addEventListener('click', mostrarReglas);
    botonPunio.addEventListener('click', ataquePunio)
    botonPatada.addEventListener('click', ataquePatada)
    botonBarrida.addEventListener('click', ataqueBarrida)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function mostrarReglas() {
    sectionSeleccionarPersonaje.style.display = 'none';
    sectionReglas.style.display = 'block';
    botonJugar.style.display = 'block';
    botonReglas.style.display = 'none';
    botonJugar.addEventListener('click', volverSeleccionPersonaje);
}

function volverSeleccionPersonaje() {
    sectionReglas.style.display = 'none';
    sectionSeleccionarPersonaje.style.display = 'block';
    botonJugar.style.display = 'none';
    botonReglas.style.display = 'block';
}

function seleccionarPersonajeJugador() {
    const selectedInput = document.querySelector('input[name="personajes"]:checked');

  if (!selectedInput) {
    alert("🚨SELECCIONA UN PERSONAJE");
    return;
  }

  let nombreSeleccionado = selectedInput.value ? selectedInput.value : selectedInput.id;
  
  const base = personajes.find(
    (p) => p.nombre.toLowerCase() === nombreSeleccionado.toLowerCase()
  );

  if (!base) {
    alert("🚨Personaje no encontrado: " + nombreSeleccionado);
    return;
  }

  // clonamos el personaje base para que jugador y enemigo tengan vidas independientes
  personajeJugador = new Personaje(base.nombre, base.vidas, base.ataques);

  // limpiar mensajes previos y actualizar UI
  sectionMensajes.innerHTML = "";
  spanPersonajeJugador.innerHTML = personajeJugador.nombre;
  spanVidasJugador.innerHTML = personajeJugador.vidas;

  sectionSeleccionarAtaque.style.display = "block";
  sectionSeleccionarPersonaje.style.display = "none";
  sectionReglas.style.display = "none";
  botonReglas.style.display = "none";

  seleccionarPersonajeEnemigo()  
}

function seleccionarPersonajeEnemigo(){
  const indice = aleatorio(0, personajes.length - 1);
  const baseEnemigo = personajes[indice];
  personajeEnemigo = new Personaje(baseEnemigo.nombre, baseEnemigo.vidas, baseEnemigo.ataques);

  spanPersonajeEnemigo.innerHTML = personajeEnemigo.nombre;
  spanVidasEnemigo.innerHTML = personajeEnemigo.vidas;
}

function ataquePunio(){
    ataqueJugador = 'Punio';
    ataqueAleatorioEnemigo();
}

function ataquePatada(){
    ataqueJugador = 'Patada';
    ataqueAleatorioEnemigo();
}

function ataqueBarrida(){
    ataqueJugador = 'Barrida';
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo(){
    const ataqueAleatorio = aleatorio(0, personajeEnemigo.ataques.length - 1);
    ataqueEnemigo = personajeEnemigo.ataques[ataqueAleatorio];
    combate();
}

function combate(){

    if(ataqueEnemigo == ataqueJugador){
        crearMensaje("EMPATE")
    } else if(ataqueJugador === 'Punio' && ataqueEnemigo === 'Barrida'){
        crearMensaje("GANASTE")
        personajeEnemigo.vidas--;
        spanVidasEnemigo.innerHTML = personajeEnemigo.vidas;
    } else if(ataqueJugador === 'Patada' && ataqueEnemigo === 'Punio'){
        crearMensaje("GANASTE")
        personajeEnemigo.vidas--;
        spanVidasEnemigo.innerHTML = personajeEnemigo.vidas;
    } else if(ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada'){
        crearMensaje("GANASTE")
        personajeEnemigo.vidas--;
        spanVidasEnemigo.innerHTML = personajeEnemigo.vidas;
    } else{
        crearMensaje("PERDISTE")
        personajeJugador.vidas--;
        spanVidasJugador.innerHTML = personajeJugador.vidas;
    }
    revisarVidas();
}

function revisarVidas(){
    if(personajeEnemigo.vidas <= 0){
        crearMensajeFinal("FELICITACIONES!!!!🎆🎆🎉🎉GANASTE🥳")
    } else if(personajeJugador.vidas <= 0){
        crearMensajeFinal("QUE PENA, HAS PERDIDO😭😭😭")
    }
}

function crearMensajeFinal(resultado){
    sectionReiniciar.style.display = 'block'

    let parrafo = document.createElement('p')
    parrafo.innerHTML = resultado
    sectionMensajes.appendChild(parrafo)

    botonPunio.disabled = true
    botonPatada.disabled = true 
    botonBarrida.disabled = true 

}

function crearMensaje(resultado){
    const parrafo = document.createElement("p");
  parrafo.innerHTML =
    "Tu personaje atacó con " +
    ataqueJugador +
    ", el personaje del enemigo atacó con " +
    ataqueEnemigo +
    ". " +
    resultado;
  sectionMensajes.appendChild(parrafo);
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min) 
}

window.addEventListener('load', iniciarJuego);                                                                                    
