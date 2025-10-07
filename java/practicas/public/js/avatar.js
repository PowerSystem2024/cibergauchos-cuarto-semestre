// ====== CLASES POO MEJORADAS ======

class Personaje {
  constructor(nombre, vidas = 3, elemento = null, descripcion = "") {
    this.nombre = nombre;
    this.vidasMaximas = vidas;
    this.vidasActuales = vidas;
    this.elemento = elemento;
    this.descripcion = descripcion;
    this.ataques = ["Puño", "Patada", "Barrida"];
  }

  // Métodos de la clase Personaje
  atacar(tipoAtaque) {
    return {
      personaje: this.nombre,
      ataque: tipoAtaque,
      elemento: this.elemento
    };
  }

  recibirDano(cantidad = 1) {
    this.vidasActuales = Math.max(0, this.vidasActuales - cantidad);
    return this.vidasActuales;
  }

  curar(cantidad = 1) {
    this.vidasActuales = Math.min(this.vidasMaximas, this.vidasActuales + cantidad);
    return this.vidasActuales;
  }

  estaVivo() {
    return this.vidasActuales > 0;
  }

  obtenerEstado() {
    const porcentajeVida = (this.vidasActuales / this.vidasMaximas) * 100;
    if (porcentajeVida > 66) return 'saludable';
    if (porcentajeVida > 33) return 'herido';
    return 'critico';
  }

  reiniciar() {
    this.vidasActuales = this.vidasMaximas;
  }
}

class Juego {
  constructor() {
    this.personajes = this.inicializarPersonajes();
    this.jugador = null;
    this.enemigo = null;
    this.estado = 'inicio'; // inicio, seleccionando, combate, terminado
    this.historialCombates = [];
    this.rondasJugadas = 0;
    this.efectosSonido = true;
    
    this.inicializarElementosDOM();
    this.configurarEventListeners();
  }

  inicializarPersonajes() {
    return [
      new Personaje("Zuko", 3, "Fuego", "Príncipe del Fuego, maestro en combate cuerpo a cuerpo"),
      new Personaje("Katara", 3, "Agua", "Maestra Agua del Sur, sanadora y guerrera"),
      new Personaje("Aang", 3, "Aire", "El Avatar, maestro de los cuatro elementos"),
      new Personaje("Toph", 3, "Tierra", "Maestra Tierra ciega, la más fuerte del mundo"),
      new Personaje("Azula", 3, "Fuego", "Princesa del Fuego, prodigio y estratega"),
      new Personaje("Iroh", 3, "Fuego", "Dragón del Oeste, sabio y poderoso")
    ];
  }

  inicializarElementosDOM() {
    // Secciones principales
    this.secciones = {
      inicio: document.getElementById('inicio'),
      reglas: document.getElementById('reglas-del-juego'),
      seleccionPersonaje: document.getElementById('seleccionar-personaje'),
      seleccionAtaque: document.getElementById('seleccionar-ataque'),
      mensajes: document.getElementById('mensajes'),
      reiniciar: document.getElementById('reiniciar')
    };

    // Botones
    this.botones = {
      reglas: document.getElementById('boton-reglas'),
      jugar: document.getElementById('boton-jugar'),
      personaje: document.getElementById('boton-personaje'),
      punio: document.getElementById('boton-punio'),
      patada: document.getElementById('boton-patada'),
      barrida: document.getElementById('boton-barrida'),
      reiniciar: document.getElementById('boton-reiniciar')
    };

    // Elementos dinámicos
    this.elementos = {
      personajeJugador: document.getElementById('personaje-jugador'),
      personajeEnemigo: document.getElementById('personaje-enemigo'),
      vidasJugador: document.getElementById('vidas-jugador'),
      vidasEnemigo: document.getElementById('vidas-enemigo')
    };
  }

  configurarEventListeners() {
    this.botones.reglas.addEventListener('click', () => this.mostrarReglas());
    this.botones.jugar.addEventListener('click', () => this.iniciarSeleccionPersonaje());
    this.botones.personaje.addEventListener('click', () => this.seleccionarPersonajeJugador());
    this.botones.punio.addEventListener('click', () => this.ejecutarCombate('Puño'));
    this.botones.patada.addEventListener('click', () => this.ejecutarCombate('Patada'));
    this.botones.barrida.addEventListener('click', () => this.ejecutarCombate('Barrida'));
    this.botones.reiniciar.addEventListener('click', () => this.reiniciarJuego());
    
    // Mejorar selección de personajes con hover
    document.querySelectorAll('input[name="personajes"]').forEach(input => {
      input.addEventListener('change', (e) => this.previsualizarPersonaje(e.target.value));
    });
  }

  // ====== MÉTODOS DE NAVEGACIÓN Y UI ======
  
  iniciarJuego() {
    this.mostrarSeccion('inicio');
    this.estado = 'inicio';
    this.limpiarHistorial();
  }

  mostrarReglas() {
    this.mostrarSeccion('reglas');
    this.estado = 'reglas';
    this.animarSeccion(this.secciones.reglas);
  }

  iniciarSeleccionPersonaje() {
    this.mostrarSeccion('seleccionPersonaje');
    this.estado = 'seleccionando';
    this.crearSelectorPersonajes();
    this.animarSeccion(this.secciones.seleccionPersonaje);
  }

  mostrarSeccion(nombreSeccion) {
    // Ocultar todas las secciones
    Object.values(this.secciones).forEach(seccion => {
      if (seccion) seccion.style.display = 'none';
    });
    
    // Ocultar botón jugar por defecto
    this.botones.jugar.style.display = 'none';
    
    // Mostrar sección específica
    switch(nombreSeccion) {
      case 'inicio':
        this.secciones.inicio.style.display = 'block';
        break;
      case 'reglas':
        this.secciones.reglas.style.display = 'block';
        this.botones.jugar.style.display = 'block';
        break;
      case 'seleccionPersonaje':
        this.secciones.seleccionPersonaje.style.display = 'block';
        break;
      case 'combate':
        this.secciones.seleccionAtaque.style.display = 'block';
        break;
      case 'terminado':
        this.secciones.reiniciar.style.display = 'block';
        break;
    }
  }

  animarSeccion(seccion) {
    seccion.style.opacity = '0';
    seccion.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      seccion.style.transition = 'all 0.5s ease-in-out';
      seccion.style.opacity = '1';
      seccion.style.transform = 'translateY(0)';
    }, 50);
  }

  crearSelectorPersonajes() {
    const container = this.secciones.seleccionPersonaje;
    
    // Limpiar contenido anterior excepto el título y botón
    const titulo = container.querySelector('h2');
    const boton = container.querySelector('button');
    container.innerHTML = '';
    
    if (titulo) container.appendChild(titulo);
    
    // Crear grid de personajes mejorado
    const grid = document.createElement('div');
    grid.className = 'personajes-grid';
    grid.innerHTML = `
      <style>
        .personajes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          width: 100%;
          margin: 20px 0;
        }
        .personaje-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }
        .personaje-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 255, 255, 0.3);
          border-color: #00ffff;
        }
        .personaje-card.selected {
          border-color: #ff6b6b;
          background: rgba(255, 107, 107, 0.2);
          transform: scale(1.05);
        }
        .personaje-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 15px;
          background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          font-weight: bold;
        }
        .personaje-info h3 {
          margin: 10px 0 5px;
          color: #fff;
          font-size: 1.2rem;
        }
        .personaje-elemento {
          background: rgba(0, 255, 255, 0.2);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          margin: 5px 0;
          display: inline-block;
        }
        .personaje-descripcion {
          font-size: 0.9rem;
          color: #ccc;
          margin-top: 10px;
          line-height: 1.4;
        }
      </style>
    `;
    
    this.personajes.forEach((personaje, index) => {
      const card = document.createElement('div');
      card.className = 'personaje-card';
      card.innerHTML = `
        <div class="personaje-avatar">${personaje.nombre.charAt(0)}</div>
        <div class="personaje-info">
          <h3>${personaje.nombre}</h3>
          <div class="personaje-elemento">${personaje.elemento}</div>
          <div class="personaje-descripcion">${personaje.descripcion}</div>
        </div>
        <input type="radio" name="personajes" value="${personaje.nombre}" id="personaje-${index}" style="display: none;">
      `;
      
      card.addEventListener('click', () => {
        // Limpiar selecciones anteriores
        document.querySelectorAll('.personaje-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        // Seleccionar radio button
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
        
        // Previsualizar personaje
        this.previsualizarPersonaje(personaje.nombre);
      });
      
      grid.appendChild(card);
    });
    
    container.appendChild(grid);
    if (boton) container.appendChild(boton);
  }

  previsualizarPersonaje(nombrePersonaje) {
    const personaje = this.personajes.find(p => p.nombre === nombrePersonaje);
    if (personaje) {
      // Aquí podrías agregar una previsualización más detallada
      console.log(`Previsualizando: ${personaje.nombre} - ${personaje.elemento}`);
    }
  }

  // ====== MÉTODOS DE SELECCIÓN Y COMBATE ======

  seleccionarPersonajeJugador() {
    const selectedInput = document.querySelector('input[name="personajes"]:checked');

    if (!selectedInput) {
      this.mostrarNotificacion("🚨 SELECCIONA UN PERSONAJE", 'warning');
      return;
    }

    const nombreSeleccionado = selectedInput.value;
    const personajeBase = this.personajes.find(p => 
      p.nombre.toLowerCase() === nombreSeleccionado.toLowerCase()
    );

    if (!personajeBase) {
      this.mostrarNotificacion("🚨 Personaje no encontrado: " + nombreSeleccionado, 'error');
      return;
    }

    // Crear nueva instancia para el jugador
    this.jugador = new Personaje(
      personajeBase.nombre, 
      personajeBase.vidasMaximas, 
      personajeBase.elemento,
      personajeBase.descripcion
    );

    this.seleccionarPersonajeEnemigo();
    this.iniciarCombate();
  }

  seleccionarPersonajeEnemigo() {
    const indiceAleatorio = this.aleatorio(0, this.personajes.length - 1);
    const personajeBase = this.personajes[indiceAleatorio];
    
    this.enemigo = new Personaje(
      personajeBase.nombre,
      personajeBase.vidasMaximas,
      personajeBase.elemento,
      personajeBase.descripcion
    );
  }

  iniciarCombate() {
    this.estado = 'combate';
    this.mostrarSeccion('combate');
    this.actualizarUI();
    this.limpiarMensajes();
    
    // Animación de entrada al combate
    this.mostrarNotificacion(
      `¡${this.jugador.nombre} vs ${this.enemigo.nombre}! ¡Que comience la batalla!`, 
      'info'
    );
  }

  ejecutarCombate(ataqueJugador) {
    if (this.estado !== 'combate') return;

    this.rondasJugadas++;
    
    // Ataque del enemigo (aleatorio)
    const ataqueEnemigo = this.enemigo.ataques[
      this.aleatorio(0, this.enemigo.ataques.length - 1)
    ];

    // Determinar resultado
    const resultado = this.determinarGanador(ataqueJugador, ataqueEnemigo);
    
    // Aplicar daño
    if (resultado === 'jugador') {
      this.enemigo.recibirDano();
      this.crearEfectoVisual('victoria');
    } else if (resultado === 'enemigo') {
      this.jugador.recibirDano();
      this.crearEfectoVisual('derrota');
    } else {
      this.crearEfectoVisual('empate');
    }

    // Actualizar UI y guardar en historial
    this.actualizarUI();
    this.guardarCombate(ataqueJugador, ataqueEnemigo, resultado);
    this.crearMensajeCombate(ataqueJugador, ataqueEnemigo, resultado);

    // Verificar fin de juego
    setTimeout(() => {
      this.verificarFinJuego();
    }, 1500);
  }

  determinarGanador(ataqueJugador, ataqueEnemigo) {
    if (ataqueJugador === ataqueEnemigo) return 'empate';
    
    const combinacionesGanadoras = {
      'Puño': 'Barrida',
      'Patada': 'Puño', 
      'Barrida': 'Patada'
    };
    
    return combinacionesGanadoras[ataqueJugador] === ataqueEnemigo ? 'jugador' : 'enemigo';
  }

  // ====== MÉTODOS DE UI Y EFECTOS VISUALES ======

  actualizarUI() {
    if (this.elementos.personajeJugador) {
      this.elementos.personajeJugador.textContent = this.jugador.nombre;
    }
    if (this.elementos.personajeEnemigo) {
      this.elementos.personajeEnemigo.textContent = this.enemigo.nombre;
    }
    if (this.elementos.vidasJugador) {
      this.elementos.vidasJugador.textContent = this.jugador.vidasActuales;
      this.actualizarBarraVida('jugador');
    }
    if (this.elementos.vidasEnemigo) {
      this.elementos.vidasEnemigo.textContent = this.enemigo.vidasActuales;
      this.actualizarBarraVida('enemigo');
    }
  }

  actualizarBarraVida(tipo) {
    const personaje = tipo === 'jugador' ? this.jugador : this.enemigo;
    const porcentaje = (personaje.vidasActuales / personaje.vidasMaximas) * 100;
    
    // Crear o actualizar barra de vida si no existe
    const containerId = tipo === 'jugador' ? 'vidas-jugador' : 'vidas-enemigo';
    const container = document.getElementById(containerId).parentNode;
    
    let barraVida = container.querySelector('.barra-vida');
    if (!barraVida) {
      barraVida = document.createElement('div');
      barraVida.className = 'barra-vida';
      barraVida.innerHTML = `
        <div class="barra-vida-fondo">
          <div class="barra-vida-relleno"></div>
        </div>
      `;
      container.appendChild(barraVida);
    }
    
    const relleno = barraVida.querySelector('.barra-vida-relleno');
    relleno.style.width = porcentaje + '%';
    
    // Cambiar color según el estado
    const estado = personaje.obtenerEstado();
    relleno.className = `barra-vida-relleno ${estado}`;
  }

  crearEfectoVisual(tipo) {
    const body = document.body;
    const efecto = document.createElement('div');
    efecto.className = `efecto-combate efecto-${tipo}`;
    
    switch(tipo) {
      case 'victoria':
        efecto.textContent = '💥 ¡GOLPE CRÍTICO! 💥';
        efecto.style.color = '#4CAF50';
        break;
      case 'derrota':
        efecto.textContent = '💢 ¡TE GOLPEARON! 💢';
        efecto.style.color = '#f44336';
        break;
      case 'empate':
        efecto.textContent = '⚡ ¡EMPATE! ⚡';
        efecto.style.color = '#FF9800';
        break;
    }
    
    body.appendChild(efecto);
    
    setTimeout(() => {
      efecto.remove();
    }, 2000);
  }

  mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
      notificacion.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      notificacion.classList.remove('show');
      setTimeout(() => notificacion.remove(), 300);
    }, 3000);
  }

  crearMensajeCombate(ataqueJugador, ataqueEnemigo, resultado) {
    const mensajesContainer = this.secciones.mensajes.querySelector('.scroll-container') || this.secciones.mensajes;
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje-combate';
    
    const iconosAtaque = {
      'Puño': '👊',
      'Patada': '🦵', 
      'Barrida': '👣'
    };
    
    const resultadoTexto = {
      'jugador': 'GANASTE',
      'enemigo': 'PERDISTE',
      'empate': 'EMPATE'
    };
    
    mensaje.innerHTML = `
      <div class="combate-info">
        <span class="ataque-jugador">${this.jugador.nombre} ${iconosAtaque[ataqueJugador]} ${ataqueJugador}</span>
        <span class="vs">VS</span>
        <span class="ataque-enemigo">${this.enemigo.nombre} ${iconosAtaque[ataqueEnemigo]} ${ataqueEnemigo}</span>
      </div>
      <div class="resultado resultado-${resultado}">${resultadoTexto[resultado]}</div>
      <div class="ronda">Ronda ${this.rondasJugadas}</div>
    `;
    
    mensajesContainer.appendChild(mensaje);
    
    // Scroll automático
    mensajesContainer.scrollTop = mensajesContainer.scrollHeight;
  }

  verificarFinJuego() {
    if (!this.jugador.estaVivo()) {
      this.terminarJuego('derrota');
    } else if (!this.enemigo.estaVivo()) {
      this.terminarJuego('victoria');
    }
  }

  terminarJuego(resultado) {
    this.estado = 'terminado';
    
    // Deshabilitar botones de ataque
    this.botones.punio.disabled = true;
    this.botones.patada.disabled = true;
    this.botones.barrida.disabled = true;
    
    const mensajeFinal = resultado === 'victoria' 
      ? "🎆🎉 ¡FELICITACIONES! ¡GANASTE! 🥳🎆" 
      : "😭💔 ¡QUE PENA! ¡HAS PERDIDO! 💔😭";
    
    setTimeout(() => {
      this.crearMensajeFinal(mensajeFinal, resultado);
      this.mostrarSeccion('terminado');
    }, 1000);
  }

  crearMensajeFinal(mensaje, resultado) {
    const mensajesContainer = this.secciones.mensajes.querySelector('.scroll-container') || this.secciones.mensajes;
    const mensajeFinal = document.createElement('div');
    mensajeFinal.className = `mensaje-final resultado-${resultado}`;
    mensajeFinal.innerHTML = `
      <h3>${mensaje}</h3>
      <div class="estadisticas-finales">
        <p>⚔️ Rondas jugadas: ${this.rondasJugadas}</p>
        <p>🏆 Personaje elegido: ${this.jugador.nombre} (${this.jugador.elemento})</p>
        <p>👹 Rival enfrentado: ${this.enemigo.nombre} (${this.enemigo.elemento})</p>
        <p>💪 Vidas restantes: ${this.jugador.vidasActuales}/${this.jugador.vidasMaximas}</p>
      </div>
    `;
    
    mensajesContainer.appendChild(mensajeFinal);
    mensajesContainer.scrollTop = mensajesContainer.scrollHeight;
  }

  // ====== MÉTODOS UTILITARIOS ======

  aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  limpiarMensajes() {
    if (this.secciones.mensajes) {
      this.secciones.mensajes.innerHTML = '';
    }
  }

  limpiarHistorial() {
    this.historialCombates = [];
    this.rondasJugadas = 0;
  }

  guardarCombate(ataqueJugador, ataqueEnemigo, resultado) {
    this.historialCombates.push({
      ronda: this.rondasJugadas,
      ataqueJugador,
      ataqueEnemigo,
      resultado,
      vidasJugador: this.jugador.vidasActuales,
      vidasEnemigo: this.enemigo.vidasActuales
    });
  }

  reiniciarJuego() {
    // Resetear estado del juego
    this.jugador = null;
    this.enemigo = null;
    this.estado = 'inicio';
    this.limpiarHistorial();
    
    // Rehabilitar botones
    this.botones.punio.disabled = false;
    this.botones.patada.disabled = false;
    this.botones.barrida.disabled = false;
    
    // Limpiar UI
    this.limpiarMensajes();
    
    // Resetear selecciones
    document.querySelectorAll('input[name="personajes"]').forEach(input => {
      input.checked = false;
    });
    document.querySelectorAll('.personaje-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    // Volver al inicio
    this.iniciarJuego();
  }
}

// ====== INICIALIZACIÓN DEL JUEGO ======

// Instancia global del juego
let juegoAvatar;

// Inicializar cuando se carga la página
window.addEventListener('load', () => {
  juegoAvatar = new Juego();
  juegoAvatar.iniciarJuego();
});                                                                                    
