import { Router } from "express";
import {
  listarTareas,
  listarTareaId,
  actualizarTarea,
  crearTarea,
  eliminarTarea,
} from "../controllers/tareas.controller.js";

const router = Router();

router.get("/tareas", listarTareas);

router.get("/tareas/:id", listarTareaId);

router.post("/tareas", crearTarea);

router.put("/tareas/:id", actualizarTarea);

router.delete("/tareas/:id", eliminarTarea);

export default router;
