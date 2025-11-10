import Router from "express-promise-router";
import {
  listarTareas,
  listarTareaId,
  actualizarTarea,
  crearTarea,
  eliminarTarea,
} from "../controllers/tareas.controller.js";
import { isAuth } from "../middleware/auth.middleware.js";
import { validateSchema } from "../middleware/validate.middleware.js";
import {
  createTareasSchema,
  updateTareasSchema,
} from "../schemas/tareas.schemas.js";

const router = Router();

router.get("/tareas", isAuth, listarTareas);

router.get("/tareas/:id", isAuth, listarTareaId);

router.post("/tareas", isAuth, validateSchema(createTareasSchema), crearTarea);

router.put(
  "/tareas/:id",
  isAuth,
  validateSchema(updateTareasSchema),
  actualizarTarea
);

router.delete("/tareas/:id", isAuth, eliminarTarea);

export default router;
