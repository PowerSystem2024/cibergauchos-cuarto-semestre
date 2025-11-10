# 🐍 Python en Entorno Profesional - Parte 7

## 🐼 Librería **Pandas** y Creación de un Servidor Web con **FastAPI** y **Docker**

Comenzamos utilizando una de las librerías más conocidas en el ecosistema de Python: **Pandas**.  
Es una herramienta muy utilizada para **leer, manipular y analizar datos provenientes de archivos locales o remotos**.

---

##  Comandos Utilizados

```sh
ll
cd py-proyect
cd python-pip
ll
cd app
source env/bin/activate  # Activamos el entorno virtual
which python
ll
cat requirements.txt
pip3 install pandas
pip3 freeze
pip3 freeze > requirements.txt
cat requirements.txt
```

---

## 🚀 Construyendo Nuestro Propio Servidor Web

Ahora, en lugar de solo **consumir datos**, construiremos una **API** que pueda **servirlos**.  
Para esto, utilizaremos **FastAPI**, un framework moderno y de alto rendimiento para Python.

---

### ⚙️ ¿Qué son FastAPI y Uvicorn?

- **FastAPI:**  
  Es un framework web diseñado para crear APIs con Python.  
  Se destaca por su **rapidez**, **facilidad de uso** y su **documentación automática interactiva** (Swagger UI y ReDoc).

- **Uvicorn:**  
  Es un **servidor ASGI (Asynchronous Server Gateway Interface)** de alto rendimiento.  
  FastAPI utiliza Uvicorn para manejar las peticiones de manera asíncrona, lo que lo hace muy eficiente.

---

## 🧩 Paso a Paso — Creando el Servidor

### 1. Instalación de Dependencias

Activamos el entorno virtual y procedemos a instalar las librerías necesarias:

```sh
# Instalar FastAPI
pip3 install fastapi

# Instalar Uvicorn con soporte estándar
pip3 install "uvicorn[standard]"
```

---


### 2. Creación del Archivo `requirements.txt`

Una vez instaladas las librerías, es buena práctica congelar las dependencias para garantizar la compatibilidad entre entornos.

```sh
pip3 freeze > requirements.txt
```

Esto nos permitirá reproducir el mismo entorno más adelante (por ejemplo, dentro de un contenedor Docker).

---

### 3. Escribiendo Nuestra Primera API — `main.py`

Creamos un archivo llamado **`main.py`** dentro del directorio `web-server` y escribimos el siguiente código:

```python
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

# Creamos nuestra primera instancia de FastAPI
app = FastAPI()

# Endpoint principal (ruta raíz)
@app.get('/')
def get_list():
    # FastAPI convierte automáticamente listas y diccionarios a formato JSON
    return [1, 2, 3]

# Segundo endpoint que devuelve un diccionario
@app.get('/contact')
def get_contact():
    return {'name': 'UTN'}
```

---

## 🐳 ¿Qué es Docker?

**Docker** es una herramienta que permite **aislar entornos** de ejecución dentro de contenedores.  
Esto hace que nuestras aplicaciones sean **portables, reproducibles y seguras**, independientemente del sistema operativo.

---

### 1. Configuración del Entorno Docker

Asegúrate de tener **Docker Desktop** funcionando correctamente.

> 💡 Si estás en **Windows**, activa la integración con **WSL 2 (Windows Subsystem for Linux)**.  
> En caso de problemas de permisos al conectar con el daemon de Docker, ejecuta los comandos con `sudo`.

---

### 2. Preparando los Archivos para Docker

Reutilizaremos la configuración de un proyecto anterior.  
Esta es una práctica común en entornos profesionales: **no reinventar la rueda**.

- **Copia los archivos** `Dockerfile` y `docker-compose.yml` de tu proyecto anterior (`app`) al nuevo proyecto `web-server`.

---

#### 🧾 Modificando el `Dockerfile`

El `Dockerfile` define la receta para construir nuestra imagen de contenedor:

```dockerfile
# Usamos la imagen oficial de Python 3.10.12 como base
FROM python:3.10.12

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo de dependencias
COPY requirements.txt /app/requirements.txt

# Instalamos las dependencias
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Copiamos todo el contenido del proyecto
COPY . /app

# Comando que se ejecutará al iniciar el contenedor
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
```

---

#### ⚙️ Modificando el `docker-compose.yml`

El archivo `docker-compose.yml` nos permite **orquestar y gestionar** el servicio de manera más sencilla:

```yaml
services:
  web-server:  # Nombre del servicio
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"  # Mapeamos el puerto 80 del host al contenedor
    volumes:
      - ./:/app  # Sincronizamos el código local con el contenedor
```

---

### 💡 El Truco de los Volúmenes para el Desarrollo

La línea:

```yaml
volumes:
  - ./:/app
```

permite **sincronizar** el código local con el que corre dentro del contenedor.  
Así, cualquier cambio en `main.py` se refleja **en tiempo real**, sin necesidad de reconstruir la imagen cada vez.

---

### 3. Construcción y Ejecución del Contenedor

Dentro del directorio `web-server`, ejecutamos los siguientes comandos:

```sh
# Construir la imagen del contenedor
docker-compose build

# Levantar el servicio en segundo plano
docker-compose up -d
```

---

## 🌐 Probando la API

Una vez levantado el contenedor, abre tu navegador y accede a:

👉 **http://localhost/contact**
