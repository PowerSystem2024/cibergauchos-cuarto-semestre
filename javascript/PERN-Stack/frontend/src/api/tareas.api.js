import axios from "./axios";

export const crearTareaRequest = (tarea) => axios.post("/api/tareas", tarea);

export const listarTareasRequest = () => axios.get("/api/tareas");

export const eliminarTareaRequest = (id) => axios.delete(`/api/tareas/${id}`);

export const listarTareaRequest = (id) => axios.get(`/api/tareas/${id}`);

export const actualizarTareaRequest = (id, tarea) =>
  axios.put(`/api/tareas/${id}`, tarea);
