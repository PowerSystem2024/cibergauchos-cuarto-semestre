import { createContext, useContext, useState } from "react";
import {
  listarTareasRequest,
  eliminarTareaRequest,
  crearTareaRequest,
  listarTareaRequest,
  actualizarTareaRequest,
} from "../api/tareas.api";

const TareasContext = createContext();

export const useTareas = () => {
  const context = useContext(TareasContext);
  if (!context) {
    throw new Error("useTareas debe estar dentro del proveedor TareasProvider");
  }
  return context;
};

export const TareasProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const [errors, setErrors] = useState([]);

  const listarTareas = async () => {
    const res = await listarTareasRequest();
    setTareas(res.data);
  };

  const listarTarea = async (id, tarea) => {
    const res = await listarTareaRequest(id, tarea);
    return res.data;
  };

  const crearTarea = async (tarea) => {
    try {
      const res = await crearTareaRequest(tarea);
      if (res.status === 201) {
        setTareas([...tareas, res.data]);
        navigate("/tareas");
      }
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const editarTarea = async (id, tarea) => {
    try {
      const res = await actualizarTareaRequest(id, tarea);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([errors.response.data.message]);
      }
    }
  };

  const eliminarTarea = async (id) => {
    const res = await eliminarTareaRequest(id);
    if (res.status === 204) {
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    }
  };

  return (
    <TareasContext.Provider
      value={{
        tareas,
        listarTareas,
        eliminarTarea,
        crearTarea,
        listarTarea,
        errors,
        editarTarea,
      }}
    >
      {children}
    </TareasContext.Provider>
  );
};

export default TareasContext;
