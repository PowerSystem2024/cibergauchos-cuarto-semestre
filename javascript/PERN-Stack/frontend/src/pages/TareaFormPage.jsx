import { Button, Card, Input, Label, Textarea } from "../components/ui";
import { useForm } from "react-hook-form";
import { useTareas } from "../context/TareasContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TareaFormPage() {
  const {
    crearTarea,
    listarTarea,
    editarTarea,
    errors: tareaError,
  } = useTareas();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const params = useParams();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    let tarea;
    if (!params.id) {
      tarea = await crearTarea(data);
      navigate("/tareas");
    } else {
      tarea = await editarTarea(params.id, data);
      navigate("/tareas");
    }
  });

  useEffect(() => {
    if (params.id) {
      listarTarea(params.id).then((tarea) => {
        setValue("titulo", tarea.titulo);
        setValue("descripcion", tarea.descripcion);
      });
    }
  }, []);

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {tareaError.map((error, index) => (
          <div key={index} className="text-red-500 font-bold">
            {error}
          </div>
        ))}
        <h2 className="font-bold my-4 text-3xl">Formulario de Tareas</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="titulo">Titulo</Label>
          <Input
            type="text"
            label="Titulo"
            placeholder="Escribe el titulo"
            autoFocus
            {...register("titulo", { required: true })}
          />
          {errors.titulo && (
            <span className="text-red-500">El titulo es requerido</span>
          )}

          <Label htmlFor="descripcion">Descripcion</Label>
          {errors.descripcion && (
            <span className="text-red-500">La descripcion es requerida</span>
          )}
          <Textarea
            id="descripcion"
            label="Descripcion"
            placeholder="Escribe la descripcion"
            rows={3}
            {...register("descripcion", { required: true })}
          />

          <Button type="submit">{params.id ? "Aceptar" : "Guardar"}</Button>
        </form>
      </Card>
    </div>
  );
}

export default TareaFormPage;
