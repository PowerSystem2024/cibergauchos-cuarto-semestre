package cibergauchos.estudiantes.servicios;

import cibergauchos.estudiantes.entidades.Estudiante;

import java.util.List;

public interface IEstudianteServicio {

    public List<Estudiante> listarEstudiantes();
    public Estudiante buscarEstudiantePorId(Integer id);
    public void guardarEstudiante(Estudiante estudiante);
    public void eliminarEstudiante(Estudiante estudiante);

}
