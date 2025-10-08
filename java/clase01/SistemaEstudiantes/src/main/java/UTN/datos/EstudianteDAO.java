package UTN.datos;

import static UTN.conexion.Conexion.getConnection;
import UTN.conexion.Conexion;
import UTN.dominio.Estudiante;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EstudianteDAO {
    //Método listar
    public List<Estudiante> listarEstudiantes(){
        List<Estudiante> estudiantes = new ArrayList<>();
        //Creamos algunos objetos que son necesarios para comunicarnos con la base de datos.
        PreparedStatement ps;//Envia la sentencia a la bd
        ResultSet rs; // Obtenemos el resultado de la base de datos
        //creamos un objeto de tipo conexión.
        Connection con = getConnection();
        String sql = "SELECT * from estudiantes.estudiantes ORDER BY idestudiantes2022";
        try {
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                var estudiante = new Estudiante();
                estudiante.setIdEstudiante(rs.getInt("idestudiantes2022"));
                estudiante.setNombre(rs.getNString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setEmail(rs.getString("email"));
                estudiante.setTelefono(rs.getString("telefono"));
                //falta agregarlo a la lista.
                estudiantes.add(estudiante);
            }
        } catch (Exception e){
            System.out.println("Ocurrio un error al selecionar datos." + e.getMessage());
        } finally {
            //siempre cierro la conexion
            try{
                con.close();
            } catch (Exception e){
                System.out.println("Ocurrio un error al cerrar la conexion." + e.getMessage());
            }
        }//fin finally
        return estudiantes;

    } //fin metodo Listar.

    //Método para buscar por id -> find by id

    public boolean buscarEstudiantePorId(Estudiante estudiante) {
        PreparedStatement ps;
        ResultSet rs;
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes.estudiantes WHERE idestudiantes2022 =?";
        try {
            ps = con.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            rs = ps.executeQuery();
            if (rs.next()) {
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                return true; //Se encontro un registro.

            }// Fin if
        } catch (Exception e) {
            System.out.println("Ocurrió un error al buscar estudiante" + e.getMessage());


        }//fin cath
        finally {
            try {
                con.close();
            }//fin try
            catch (Exception e) {
                System.out.println("Error al cerrar la conexion" + e.getMessage());
            }//fin catch
        } //fin finally
        return  false;
    }
    public boolean agregarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "INSERT INTO estudiantes.estudiantes (nombre, apellido,telefono, email) VALUES (?,?,?,?)";
        try {
            ps = con.prepareStatement(sql);
            ps.setString(1,estudiante.getNombre());
            ps.setString(2,estudiante.getApellido());
            ps.setString(3,estudiante.getTelefono());
            ps.setString(4,estudiante.getEmail());
            ps.execute();//execute es solo para insertar
            return true;

        } catch (SQLException e) {
            System.out.println("Ocurrió un error al Agregar un  estudiante" + e.getMessage())
            ;
        }//fin cath
        finally {
            try{
                con.close();
            }//fin try
            catch (Exception e){
                System.out.println("Error al cerrar la conexion" + e.getMessage());
            }//fin cath
        }//fin finally
        return false;
    }//fin método agregar estudiante

    //Método para modificar estudiante
    public boolean modificarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "UPDATE estudiantes.estudiantes set nombre = ?, apellido = ?, telefono = ?, email = ? WHERE idEstudiantes2022 = ?";
        try{
            ps = con.prepareStatement(sql);
            ps.setString(1,estudiante.getNombre());
            ps.setString(2,estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.setInt(5,estudiante.getIdEstudiante());
            ps.execute();
            return  true;
        }
        catch (Exception e) {
            System.out.println("Error al modificar estudiante " + e.getMessage());
        }
        finally {
            try {
                con.close();
            } //fin try
            catch (Exception e) {
                System.out.println("Error al cerrar la conexion" + e.getMessage());
            }//fin cath
        }// fin finally
        return false;
    }//fin metodo modificar estudiante

    public boolean eliminarEstudiante (Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "DELETE from estudiantes where idEstudiantes2022=?";
        try {
            ps= con.prepareStatement(sql);
            ps.setInt(1,estudiante.getIdEstudiante());
            ps.execute();
            return  true;
        }//Fin try
        catch (SQLException e) {
            System.out.println("Error al eliminar estudiante: " + e.getMessage());

        }//fin catch
        finally {
            try {
                con.close();
            } //fin try
            catch (Exception e) {
                System.out.println("Error al Cerrar la conexion" + e.getMessage());
            }//fin cath
        }//fin finally
        return false;
    }//fin metodo eliminar Estudiante

    public static void main(String[] args) {
        //Listar los estudiantes
        var estudianteDao = new EstudianteDAO();// variable global

        //Buscar por id
        //var estudiante1 = new Estudiante(14);
        //System.out.println("Estudiantes antes de la busqueda: " + estudiante1);
        //var encontrado = estudianteDao.buscarEstudiantePorId(estudiante1);
       // if(encontrado)
      //      System.out.println("Estudiante encontrado: " + estudiante1);
       // else
       //     System.out.println("No se encontro estudiante : " + estudiante1.getIdEstudiante());



        //Agregar estudiante
     //   var nuevoEstudiante = new Estudiante("nombre","apellido", "telefono","email@email.com");
      //  var agregado = estudianteDao.agregarEstudiante(nuevoEstudiante);
     //   if (agregado)
      //      System.out.println("Estudiante Agregado" + nuevoEstudiante);
     //   else
      //      System.out.println("No se ha agregado estudiante" + nuevoEstudiante);

        //modificar estudiante
       // var modificarEstudiante = new Estudiante(15,"modNombre","modApellido", "modTelefono","modEmail");
      //  var modificado = estudianteDao.modificarEstudiante(modificarEstudiante);
      //  if (modificado)
       //     System.out.println("Estudiante Modificado" + modificarEstudiante);
      //  else
       //     System.out.println("No se modifico el Estudiante" + modificarEstudiante);
        var eliminarEstudiante = new Estudiante(99);
        var eliminado = estudianteDao.eliminarEstudiante(eliminarEstudiante);
        if (eliminado)
            System.out.println("Estudiante eliminado " + eliminarEstudiante);
        else
            System.out.println("No se puedo eliminar el estudiante: " + eliminarEstudiante);


          System.out.println("Listado de estudiantes");
        List <Estudiante> estudiantes = estudianteDao.listarEstudiantes();
           estudiantes.forEach(System.out::println);//Funcion lambda para imprimir


    }
}
