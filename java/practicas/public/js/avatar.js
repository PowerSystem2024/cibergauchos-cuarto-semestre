let ataqueJugador; 
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

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

// Variables de inputs
const inputZuko = document.getElementById('zuko');
const inputKatara = document.getElementById('katara');
const inputAang = document.getElementById('aang');
const inputToph = document.getElementById('toph');

// Variables de spans dinámicos
const spanPersonajeJugador = document.getElementById('personaje-jugador');
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

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
    sectionSeleccionarAtaque.style.display = 'block'; 
    sectionSeleccionarPersonaje.style.display = 'none' 
    sectionReglas.style.display = 'none';
    botonReglas.style.display = 'none';

    if(inputZuko.checked){
        spanPersonajeJugador.innerHTML = 'Zuko'
    }else if(inputKatara.checked){
        spanPersonajeJugador.innerHTML = 'Katara'
    }else if(inputAang.checked){
        spanPersonajeJugador.innerHTML = 'Aang'
    }else if(inputToph.checked){
        spanPersonajeJugador.innerHTML = 'Toph'
    }else{
       alert('🚨SELECCIONA UN PERSONAJE')
       reiniciarJuego();
    }
    seleccionarPersonajeEnemigo()  
}

function seleccionarPersonajeEnemigo(){
    let personajeAleatorio = aleatorio(1, 4);

    if(personajeAleatorio == 1){
        spanPersonajeEnemigo.innerHTML = 'Zuko'
    }else if(personajeAleatorio == 2){
        spanPersonajeEnemigo.innerHTML = 'Katara'
    }else if(personajeAleatorio == 3){
        spanPersonajeEnemigo.innerHTML = 'Aang'
    }else{
        spanPersonajeEnemigo.innerHTML = 'Toph'
    }
}

function ataquePunio(){
    ataqueJugador = 'Punio'
    ataqueAleatorioEnemigo()
}

function ataquePatada(){
    ataqueJugador = 'Patada'
    ataqueAleatorioEnemigo()
}

function ataqueBarrida(){
    ataqueJugador = 'Barrida'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1, 3);
    
    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'Punio'
    }else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'Patada'
    }else {
        ataqueEnemigo = 'Barrida'
    }
    combate()
}

function combate(){

    if(ataqueEnemigo == ataqueJugador){
        crearMensaje("EMPATE")
    } else if(ataqueJugador == 'Punio' && ataqueEnemigo == 'Barrida'){
        crearMensaje("GANASTE")
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'Patada' && ataqueEnemigo == 'Punio'){
        crearMensaje("GANASTE")
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if(ataqueJugador == 'Barrida' && ataqueEnemigo == 'Patada'){
        crearMensaje("GANASTE")
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else{
        crearMensaje("PERDISTE")
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}

function revisarVidas(){
    if(vidasEnemigo == 0){
        crearMensajeFinal("FELICITACIONES!!!!🎆🎆🎉🎉GANASTE🥳")
    } else if(vidasJugador == 0){
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
    let parrafo = document.createElement('p')

    parrafo.innerHTML = 'Tu personaje atacó con ' + ataqueJugador + ', el personaje del enemigo atacó con ' + ataqueEnemigo + ' ' + resultado

    sectionMensajes.appendChild(parrafo)
}

function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min) 
}

window.addEventListener('load', iniciarJuego);                                                                                    
