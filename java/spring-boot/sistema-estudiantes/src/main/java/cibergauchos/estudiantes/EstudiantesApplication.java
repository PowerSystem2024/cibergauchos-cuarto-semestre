package cibergauchos.estudiantes;

import cibergauchos.estudiantes.entidades.Estudiante;
import cibergauchos.estudiantes.servicios.EstudianteServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {

    @Autowired
    private EstudianteServicio estudianteServicio;
    private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);

    String nl = System.lineSeparator();


    public static void main(String[] args) {
        logger.info("Iniciando la aplicación Sistema de Estudiantes de Cibergauchos...");
        // Levantar la fábrica de Spring
        SpringApplication.run(EstudiantesApplication.class, args);
        logger.info("¡ Aplicación finalizada !");

    }

    @Override
    public void run(String... args) throws Exception {
        logger.info(nl + "Ejecutando el método run de Spring..." + nl);

        var salir = false;
        var consola = new Scanner(System.in);

        while(!salir){
            mostrarMenu();
            salir = ejecutarOpciones(consola);
            logger.info(nl);
        }


    }

    private void mostrarMenu(){
        logger.info(nl);
        logger.info("""
                ************ Sistema Estudiantes Cibergauchos ************
                1. Listar Estudiantes
                2. Buscar Estudiante
                3. Agregar Estudiante
                4. Modificar Estudiante
                5. Eliminar estudiante
                6. Salir
                Elija una opción:"""
        );

    }


    private boolean ejecutarOpciones(Scanner consola){
        var opcion = Integer.parseInt(consola.nextLine());
        var salir = false;

        switch(opcion){
            case 1 -> {
                logger.info(nl+"Listado de estudiantes: "+nl);
                List<Estudiante> estudiantes = estudianteServicio.listarEstudiantes();
                if(estudiantes.isEmpty()){
                    logger.info("No hay estudiantes registrados.");
                } else {
                    estudiantes.forEach((estudiante -> logger.info(estudiante.toString())));
                }
            }
            case 2 -> {
                logger.info(nl+"Buscar estudiante por ID: "+nl);
                logger.info("Ingrese el ID del estudiante a buscar: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
                if(estudiante != null){
                    logger.info("Estudiante encontrado: ");
                    logger.info(estudiante.toString());
                } else {
                    logger.info("Estudiante no encontrado con ID: " + idEstudiante);
                }
            }
            case 3 -> {
                logger.info(nl+"Agregar estudiante: "+nl);
                logger.info("Nombre: ");
                var nombre = consola.nextLine();
                logger.info("Apellido: ");
                var apellido = consola.nextLine();
                logger.info("Teléfono: ");
                var telefono = consola.nextLine();
                logger.info("Email: ");
                var email = consola.nextLine();
                
                var estudiante = new Estudiante();
                estudiante.setNombre(nombre);
                estudiante.setApellido(apellido);
                estudiante.setTelefono(telefono);
                estudiante.setEmail(email);
                
                estudianteServicio.guardarEstudiante(estudiante);
                logger.info("Estudiante agregado: " + estudiante);
            }
            case 4 -> {
                logger.info(nl+"Modificar estudiante: "+nl);
                logger.info("Ingrese el ID del estudiante a modificar: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
                
                if(estudiante != null){
                    logger.info("Estudiante encontrado: " + estudiante);
                    logger.info("Nuevo nombre (actual: " + estudiante.getNombre() + "): ");
                    var nombre = consola.nextLine();
                    if(!nombre.isBlank()) estudiante.setNombre(nombre);
                    
                    logger.info("Nuevo apellido (actual: " + estudiante.getApellido() + "): ");
                    var apellido = consola.nextLine();
                    if(!apellido.isBlank()) estudiante.setApellido(apellido);
                    
                    logger.info("Nuevo teléfono (actual: " + estudiante.getTelefono() + "): ");
                    var telefono = consola.nextLine();
                    if(!telefono.isBlank()) estudiante.setTelefono(telefono);
                    
                    logger.info("Nuevo email (actual: " + estudiante.getEmail() + "): ");
                    var email = consola.nextLine();
                    if(!email.isBlank()) estudiante.setEmail(email);
                    
                    estudianteServicio.guardarEstudiante(estudiante);
                    logger.info("Estudiante modificado: " + estudiante);
                } else {
                    logger.info("Estudiante no encontrado con ID: " + idEstudiante);
                }
            }
            case 5 -> {
                logger.info(nl+"Eliminar estudiante: "+nl);
                logger.info("Ingrese el ID del estudiante a eliminar: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
                
                if(estudiante != null){
                    logger.info("¿Está seguro de eliminar el estudiante: " + estudiante + "? (s/n): ");
                    var confirmacion = consola.nextLine();
                    if(confirmacion.equalsIgnoreCase("s") || confirmacion.equalsIgnoreCase("si")){
                        estudianteServicio.eliminarEstudiante(estudiante);
                        logger.info("Estudiante eliminado correctamente.");
                    } else {
                        logger.info("Operación cancelada.");
                    }
                } else {
                    logger.info("Estudiante no encontrado con ID: " + idEstudiante);
                }
            }
            case 6 -> {
                logger.info(nl+"Saliendo del sistema. ¡Hasta luego!");
                salir = true;
            }
            default -> logger.info("Opción no válida. Por favor, seleccione una opción del 1 al 6.");
        }
        return salir;
    }
}
