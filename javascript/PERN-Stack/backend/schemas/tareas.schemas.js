import { z } from "zod";
export const createTareasSchema = z.object({
  titulo: z
    .string({
      required_error: "El titulo es requerido",
      invalid_type_error: "El titulo debe ser un string",
    })
    .min(1, {
      message: "El titulo debe contener al menos 1 caracter",
    })
    .max(255, {
      message: "El titulo debe tener como maximo 255 caracteres",
    }),
  descripcion: z
    .string({
      required_error: "La descripción es requerida",
      invalid_type_error: "La descripción debe ser un string",
    })
    .min(1, {
      message: "La descripción debe tener al menos 1 caracter",
    })
    .max(300, {
      message: "La descripción debe tener como maximo 300 caracteres",
    }),
});

export const updateTareasSchema = z.object({
  titulo: z
    .string({
      required_error: "El titulo es requerido",
      invalid_type_error: "El titulo debe ser un string",
    })
    .min(1, {
      message: "El titulo debe contener al menos 1 caracter",
    })
    .max(255, {
      message: "El titulo debe tener como maximo 255 caracteres",
    })
    .optional(),
  descripcion: z
    .string({
      required_error: "La descripción es requerida",
      invalid_type_error: "La descripción debe ser un string",
    })
    .min(1, {
      message: "La descripción debe tener al menos 1 caracter",
    })
    .max(300, {
      message: "La descripción debe tener como maximo 300 caracteres",
    }),
});
