# 🐍 Python en Entorno Profesional - Parte 6

## Archivo requirements.txt y colaboración en proyectos Python

El archivo `requirements.txt` se utiliza para gestionar todas las dependencias y versiones específicas que requiere un proyecto de Python.  
Gracias a este archivo, es posible asegurar que todas las personas que trabajen en el mismo proyecto utilicen las mismas versiones de las librerías, evitando incompatibilidades.

---

## Creación del archivo requirements.txt

1. Entrar al directorio del proyecto:
   ```bash
   cd python-pip
   ll
   cd app
   ```

2. Activar el entorno virtual:
   ```bash
   source env/bin/activate
   ```

3. Listar las dependencias instaladas:
   ```bash
   pip3 freeze
   ```

4. Guardar todas las dependencias en el archivo `requirements.txt`:
   ```bash
   pip3 freeze > requirements.txt
   ```

5. Verificar el contenido del archivo:
   ```bash
   ll
   cat requirements.txt
   ```

---

## Instalar las mismas dependencias en otro equipo

Si una nueva persona se une al proyecto y necesita las mismas librerías y versiones, debe ejecutar el siguiente comando dentro del entorno virtual:

```bash
pip3 install -r requirements.txt
```

El parámetro `-r` indica que se instalarán las dependencias listadas en el archivo.

---

## Cómo contribuir al proyecto

Si otra persona quiere colaborar, debe seguir estos pasos:

```bash

cd python-pip

# Entrar al directorio del proyecto
cd app

# Crear un entorno virtual 
python3 -m venv env

# Activar el entorno virtual
# En Linux / macOS:
source env/bin/activate
# En Windows (PowerShell o CMD):
env\Scripts\activate

# Instalar las dependencias necesarias
pip3 install -r requirements.txt

# Ejecutar el programa
python3 main.py
```

---

## Actualizar las dependencias del proyecto

Si durante el desarrollo se agregan o actualizan librerías, se debe actualizar el archivo `requirements.txt` antes de subir los cambios al repositorio:

```bash
pip3 freeze > requirements.txt
git add requirements.txt
git commit -m "Actualiza dependencias"
git push
```

---

### En resumen

El archivo `requirements.txt` permite compartir y reproducir el entorno del proyecto, garantizando que todos los desarrolladores trabajen bajo las mismas condiciones.  
Esto mejora la estabilidad, la colaboración y el mantenimiento del código en proyectos Python.


-La librería **Requests** es una de las más utilizadas en Python, ya que permite realizar **peticiones a otros servidores web** directamente desde Python.  

A continuación, veremos un proyecto para comenzar a utilizar esta dependencia, haciendo uso de una **API llamada Dog-API**.

```sh
import requests

def get_razas():
   r = requests.get('https://dog.ceo/api/breeds/list')
   #print(r.text)
   #print(type(r.text)) #Vemos de que tipo es el texto, puede ser un string
   #En este caso es: es un string por el text, pero aqui 
   #encontramos un diccionario con listas 
   razas = r.json()
    
   for raza in razas.values(): #Utilizamos la funcio para los valores
      print(f"Raza de los perritos: {raza[5]}") #Estamos recorriendo los valores del diccionario 

