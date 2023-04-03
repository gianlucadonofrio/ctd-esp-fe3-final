import * as yup from "yup";

export const schema = yup
  .object({
    name: yup
      .string()
      .required(
        "El nombre es un campo requerido, por favor ingrese un nombre válido"
      )

      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre debe tener como máximo 50 caracteres"),

    lastname: yup
      .string()
      .required(
        "El apellido es un campo requerido, por favor ingrese un apellido válido"
      )
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido debe tener como máximo 50 caracteres"),

    email: yup
      .string()
      .required(
        "El email es un campo requerido, por favor ingrese un email válido"
      )
      .email("El email ingresado no es válido"),
  })
  .required();
