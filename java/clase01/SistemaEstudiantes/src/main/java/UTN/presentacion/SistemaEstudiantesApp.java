package UTN.presentacion;

import UTN.conexion.Conexion;
import UTN.datos.EstudianteDAO;
import UTN.dominio.Estudiante;

import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class SistemaEstudiantesApp {
    public static void main(String[] args) {
        var salir = false;// recuerden esto ya lo hicimos antes
        var consola = new Scanner(System.in); /// Esta instancia debe hacerse una vez
        //se crea una instancia de la clase servicio, esto lo hacemos fuera del ciclo
        var estudiantesDao = new EstudianteDAO();// Esta instancia debe hacerse una vez
        while(!salir){//salir sea distinto de false
            try{
                mostrarMenu();//Mostramos el menú
                //Este será el método ejecutar opciones que devolverá un booleano
                salir= ejecutarOpciones(consola, estudiantesDao);//Este arroja una exception
            } catch (Exception e) {
                System.out.println("Ocurrío un error al ejecutar la operación:" + e.getMessage());
            }//fin while
        }

    }//fin main

    private  static void mostrarMenu(){
        System.out.println("""
                ****** Sistema de Estudiantes ******
                1. Listar estudiantes
                2. Buscar estudiante
                3. Agregar estudiante
                4. Modificar estudiante
                5. Eliminar estudiante
                6. Salir
                Elige una opción:
                """);
    }//fin metodo mostrar menú
    //Método para ejecutar las opciones, va a regresar un valor booleano, ya que es el que
    //puede modificar el valor de la variable salir, si es verdadero, termina el ciclo while
    private static boolean ejecutarOpciones(Scanner consola, EstudianteDAO estudianteDAO){
        var opcion = Integer.parseInt(consola.nextLine());
        var salir = false;
        switch (opcion){
            case 1 ->{ // Listar estudiantes
                System.out.println("Listado de Estudiantes...");
                //No muestra la informacin, solo recupera la info y regresa una lista
                var estudiantes = estudianteDAO.listarEstudiantes();//recibe el listado
                //vamos a iterar cada objeto de tipo estudiante
                estudiantes.forEach(System.out::println);//para imprimir la lista
            } // Fin caso 1
            case 2 ->{ //Buscar estudiatne por id
                System.out.println("Introduce el id_estudiante a buscar:");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = new Estudiante(idEstudiante);
                var encontrado = estudianteDAO.buscarEstudiantePorId(estudiante);
                if(encontrado)
                    System.out.printf("Estudiante encontrado: " + estudiante);
                else
                    System.out.println("Estudiante NO encontrado: " + estudiante);
            }//fin caso 2
            case 3 ->{//Agregar estudiante
                System.out.println("Agregar estudiante: ");
                System.out.println("Nombre");
                var nombre = consola.nextLine();
                System.out.println("Apellido");
                var apellido = consola.nextLine();
                System.out.println("Telefono");
                var telefono = consola.nextLine();
                System.out.println("Email");
                var email = consola.nextLine();
                //creamso objeto estudiatnes sin id
                var estudiante = new Estudiante(nombre, apellido,telefono, email);
                var agregado = estudianteDAO.agregarEstudiante(estudiante);
                if(agregado)
                    System.out.println("Estudiante Agregado: " + estudiante);
                else
                    System.out.println("Estudiante NO agregado" + estudiante);

            }//fin caso 3
            case 4 ->{ //Modificar estudiante
                System.out.println("Modificar estudiatne: ");
                System.out.println("Id Estudiante");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                System.out.println("Nombre");
                var nombre = consola.nextLine();
                System.out.println("Apellido");
                var apellido = consola.nextLine();
                System.out.println("Telefono");
                var telefono = consola.nextLine();
                System.out.println("Email");
                var email = consola.nextLine();
                //creamos el objeto estudiante a modificar
                var estudiante=
                        new Estudiante(idEstudiante,nombre,apellido,telefono,email);
                var modificado = estudianteDAO.modificarEstudiante(estudiante);
                if(modificado)
                    System.out.println("Estudiante Modificado: " + estudiante);
                else
                    System.out.println("Estudiante NO modificado: " + estudiante);
            }//fin caso 4
            case 5 -> {//Eliminar estudiante
                System.out.println("Eliminar estudiante: ");
                System.out.println("Id estudiante");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = new Estudiante(idEstudiante);
                var eliminado = estudianteDAO.eliminarEstudiante(estudiante);
                if(eliminado)
                    System.out.println("Estudiante eliminado: " + estudiante);
                else
                    System.out.println("Estudiante NO eliminado: " + estudiante);
            }//fin caso 5
            case    6 -> {
                System.out.println("Hasta pronto");
                salir = true;

            }//fin caso 6
            default -> System.out.println("Opción no reconocída, ingrese otra opción");
        } //fin switch
        return  salir;
    }

}//fin clase