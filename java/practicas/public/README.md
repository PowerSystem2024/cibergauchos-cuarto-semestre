# ¿Qué es el DOM?

**DOM** significa **Document Object Model** (Modelo de Objetos del Documento).  
Es la forma en que el navegador estructura internamente las etiquetas HTML para que puedan ser manipuladas desde JavaScript.

- El navegador, desde el punto de vista de JavaScript, es representado como un objeto llamado `window`.  
  Cada pestaña del navegador corresponde a una instancia de `window`.

- Dentro de `window` se encuentra el objeto `document`, que representa el contenido HTML de la página:  
  donde colocamos títulos (`<h1>`), párrafos (`<p>`), botones (`<button>`), etc.

- Podemos pensar en `window` como el navegador completo (incluyendo la barra de direcciones y los eventos globales),  
  mientras que `document` representa exclusivamente lo que está dentro de la página web (el HTML).

---

## ¿Qué es un Event Listener? 🔊

Un **Event Listener** (escuchador de eventos) es una función que espera que ocurra un evento específico en el navegador, como:

- Un clic en un botón  
- Que la página haya terminado de cargar  
- Que el tamaño de la ventana cambie  

A estos eventos se les puede **asociar una función**, para que se ejecute automáticamente cuando ocurran.

# La Leyenda de Aang: El Avatar 🎮
 
Creamos la carpeta del Juego del Avatar usando los siguientes comandos:
```
mkdir Juego-Avatar         
cd Juego-Avatar      
mkdir public                
cd public                   
mkdir css                   
mkdir assets                
mkdir js                    
touch README.md             
touch avatar.html           
code .                      
```

- **`<label>`**: Se usa para darle un **indicador o descripción** a los usuarios sobre lo que están seleccionando.
- **`name`**: Se utiliza para **agrupar todos los inputs** relacionados (por ejemplo, en un grupo de botones `radio`) y poder seleccionar uno.
- **`for`**: Atributo que permite **vincular un `label` con un `input`** a través del mismo `id`.

- **`getElementById`**: Se utiliza para **obtener un elemento del HTML** mediante su atributo `id`. Luego se puede modificar, agregar clases, texto, o eventos.
  
- **`checked`**: Es una propiedad usada en **botones tipo `radio` o `checkbox`**. Permite saber si ese botón está seleccionado.

- **`innerHTML`**: Permite cambiar el contenido de un elemento HTML desde JavaScript.

- **`Math.random()`**: Se usa para obtener un número aleatorio. En los juegos, por ejemplo, sirve para que el enemigo elija un ataque o personaje al azar.

- **`alert()`**: Muestra mensajes informativos o advertencias al usuario en una ventana emergente.

- **`setTimeout()`**: Ejecuta una función después de cierto tiempo. Útil para mostrar mensajes temporales, como errores si no se elige un personaje.

- **`createElement()`**: Permite **crear nuevos elementos HTML** dentro del DOM.

- **`appendChild()`**: Permite añadir elementos dinámicamente, mover elementos existentes o clonar y anexar elementos al DOM.

- **`location.reload()`**: Se utiliza para recargar la página actual, como si se presionara el botón de "Actualizar" del navegador.

## CSS 🎨
Agregamos:
```
Color y background al h1
Background a todo el sitio
Tipografía
Flexbox y los tipos de display
Formato y layout a los titulos
Que sea responsive
```
## VARIABLES GLOBALES 
Las variables globales sirven para guardar datos que pueden usarse en todo el programa, no solo dentro de una función o bloque.

👉 Se usan para compartir información entre funciones o para guardar configuraciones generales.

⚠️ Pero hay que usarlas con cuidado, porque si muchas partes del código las cambian, puede generar errores difíciles de encontrar.

## ARRAYS O ARREGLOS
Estos pueden ser cadenas de texto, números, booleanos, entre otros. Existe un tipo de dato llamado Array o 
arreglo que te permite agrupar N cantidad de valores, en una sola variable.
Los arrays son muy dinámicos, permiten hacer muchísimas cosas como recorrer cada valor, filtrar datos, 
convertirlos, entre otras acciones.


## OBJETOS VS ARREGLOS
Los objetos y los arreglos pueden guardar cualquier tipo de estructura de datos que necesites. No hay limitaciones.Incluso puede combinar ambos para guardar niveles de información más complejos.


## CICLOS: manipulando el DOM con iteradores
La información que posean tus variables en el código JavaScript, pueden ser procesadas y renderizadas hacia el DOM para visualizar la información en el navegador web y que el usuario pueda interactuar con los datos.
