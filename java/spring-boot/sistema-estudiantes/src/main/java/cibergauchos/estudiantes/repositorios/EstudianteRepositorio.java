package cibergauchos.estudiantes.repositorios;

import cibergauchos.estudiantes.entidades.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstudianteRepositorio extends JpaRepository<Estudiante, Integer> {
}
