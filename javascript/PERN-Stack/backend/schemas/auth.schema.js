import { email, z } from "zod";

export const signupSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un string",
    })
    .min(1, {
      message: "El nombre debe tener al menos 1 caracter",
    })
    .max(255, {
      message: "El nombre debe tener como maximo 255 caracteres",
    }),
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser un string",
    })
    .email({
      message: "El email debe ser un email valido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerido",
      invalid_type_error: "La contraseña debe ser un string",
    })
    .min(6, {
      message: "La contraseña debe ser al menos de 6 caracteres",
    })
    .max(255, {
      message: "La contraseña debe tener menos de 255 caracteres",
    }),
});

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser un string",
    })
    .email({
      message: "El email debe ser un email valido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerido",
      invalid_type_error: "La contraseña debe ser un string",
    })
    .min(6, {
      message: "La contraseña debe ser al menos de 6 caracteres",
    })
    .max(255, {
      message: "La contraseña debe tener menos de 255 caracteres",
    }),
});
