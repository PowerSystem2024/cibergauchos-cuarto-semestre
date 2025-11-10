# 🐍 Python en Entorno Profesional - Parte 5


## 🧩- Entorno virtual en Python explicado a fondo → *Teoría*

Cuando trabajamos con diferentes proyectos en Python, es común que surjan conflictos entre las librerías o dependencias que cada proyecto necesita. Esto puede generar errores y dificultar el mantenimiento del código.  

Para evitar estos problemas, se utilizan **entornos virtuales**, los cuales permiten **encapsular los módulos y librerías de cada proyecto**. De esta forma, cada proyecto tiene su propio entorno aislado y no comparte sus dependencias con otros. Lo único que permanece compartido entre ellos es la instalación base de **Python**.


### Ventajas de los entornos virtuales

1. **Evitan conflictos entre proyectos:** cada entorno tiene sus propias versiones de librerías, sin interferir con otros.  
2. **Permiten instalar y usar diferentes aplicaciones de manera segura**, sin necesidad de modificar la configuración global del sistema.  
3. **Son portables:** pueden copiarse y moverse fácilmente a otros equipos.  
4. **Facilitan el respaldo y la restauración** de proyectos completos con todas sus dependencias.  
5. **Ofrecen seguridad y flexibilidad**, ya que permiten trabajar con distintas tecnologías o versiones en un mismo equipo sin riesgos.  

---

### En resumen

Los entornos virtuales en Python proporcionan una forma **segura, ordenada y práctica** de gestionar proyectos con diferentes librerías y configuraciones, lo que resulta muy útil tanto para programadores como para equipos de desarrollo.




## Practica del flujo de trabajo con Git y GitHub:

1. Crear un directorio para el proyecto y clonarlo desde GitHub:
   ```bash
   mkdir py-project
   cd py-project
   git clone https://github.com/ArielBetancud22/python-pip.git
   ```
2. Crear y listar ramas:
   ```bash
   git branch second
   git branch profe
   git branch ariel22
   ```
3. Confirmar y subir cambios:
   ```bash
   git add .
   git commit -m "Mi primer archivo"
   git push origin main
   ```
4. Resolver problemas de autenticación generando un **Access Token** desde GitHub  
   (Settings → Developer settings → Personal access tokens → Tokens classic).

---




## Creación y uso de entornos virtuales con `venv`:

1. Instalar el módulo `venv` (si no está disponible):
   ```bash
   sudo apt install -y python3-venv
   ```
2. Crear un entorno virtual:
   ```bash
   python3 -m venv env
   ```
3. Activarlo y desactivarlo:
   ```bash
   source env/bin/activate   # Activar
   deactivate                # Desactivar
   ```
4. Verificar rutas de Python y Pip:
   ```bash
   which python3
   which pip3
   ```
   > Ambas deberían apuntar a la carpeta `env/bin/`.

---


## Gestión de dependencias con `pip` y `requirements.txt`:

- Instalar librerías:
  ```bash
  pip install matplotlib
  ```
- Instalar versiones específicas:
  ```bash
  pip install matplotlib==3.5.0
  ```
- Ver dependencias instaladas:
  ```bash
  pip freeze
  ```
- Exportar dependencias a `requirements.txt`:
  ```bash
  pip freeze > requirements.txt
  ```
- Instalar todas las dependencias desde el archivo:
  ```bash
  pip install -r requirements.txt
  ```

---

## 🧾 Resumen de Comandos Clave

```bash
# Git y GitHub
git clone <url>             # Clonar repositorio
git branch                  # Crear o listar ramas
git add .                   # Agregar cambios
git commit -m "mensaje"     # Confirmar cambios
git push origin main        # Subir cambios
git pull origin main        # Descargar cambios
git merge <rama>            # Fusionar ramas

# Python y entornos virtuales
python3 -m venv env         # Crear entorno virtual
source env/bin/activate     # Activar entorno
deactivate                  # Desactivar entorno
pip install <paquete>       # Instalar librería
pip freeze > requirements.txt # Guardar dependencias
pip install -r requirements.txt # Instalar dependencias
```

---

## Conclusion:

Tenemos ambientes virtuales que aislan los modulos de cada proyecto manteniendolos independientes y que no
choquen sus dependencias entre si, esto es muy importante para el flujo profesional del trabajo en Python.
