from conexion import Conexion
from Usuario import Usuario
from logger_base import log
from cursorDelPool import CursorDelPool

class UsuarioDAO:
    _SELECCIONAR = "SELECT * FROM usuario ORDER BY id_usuario"
    _INSERTAR = "INSERT INTO usuario(username, password) VALUES (%s, %s)"
    _ACTUALIZAR = "UPDATE usuario SET username=%s, password=%s WHERE id_usuario=%s"
    _ELIMINAR = "DELETE FROM usuario WHERE id_usuario=%s"

    @classmethod
    def seleccionar(cls):
        with CursorDelPool() as cursor:
            cursor.execute(cls._SELECCIONAR)
            registros = cursor.fetchall()
            usuarios = [] #lista que va a contener los usuarios
            for registro in registros:
                usuario = Usuario(registro[0], registro[1], registro[2])
                usuarios.append(usuario)
            return usuarios
    
    @classmethod
    def insertar(cls, usuario):
        with CursorDelPool() as cursor:
            valores = (usuario.username, usuario.password)
            cursor.execute(cls._INSERTAR, valores)
            log.debug(f"Usuario registrado: {usuario}")
            return cursor.rowcount
        
    @classmethod
    def actualizar(cls, usuario):
        with CursorDelPool() as cursor:
            valores = (usuario.username, usuario.password, usuario.id_usuario)
            cursor.execute(cls._ACTUALIZAR, valores)
            log.debug(f"Usuario actualizado correctamente: {usuario}")
            return cursor.rowcount
        
    @classmethod
    def eliminar(cls, usuario):
        with CursorDelPool() as cursor:
            valores = (usuario.id_usuario,)
            cursor.execute(cls._ELIMINAR, valores)
            log.debug(f"Usuario eliminado: {usuario}")
            return cursor.rowcount

if __name__ == "__main__":

    #Eliminar registro
    # usuario1 = Usuario(id_usuario=4)
    # usuario_eliminado = UsuarioDAO.eliminar(usuario1)
    # log.debug(f"usuarios eliminados: {usuario_eliminado}")

    #Actualizar un registro
    usuario1 = Usuario(3, 'DaniloPietro', '456')
    usuarios_actualizados = UsuarioDAO.actualizar(usuario1)
    log.debug(f"Usuarios actualizados: {usuarios_actualizados}")

    #Insertar registro
    # usuario1 = Usuario(username='GinoP', password='456')
    # usuarios_insertados = UsuarioDAO.insertar(usuario1)
    # log.debug(f"Usuarios insertados: {usuarios_insertados}")

    #Seleccionar
    # usuarios = UsuarioDAO.seleccionar()
    # for usuario in usuarios:
    #     log.debug(usuario)
