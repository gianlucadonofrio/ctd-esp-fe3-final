import * as yup from "yup";

export const deliverySchema = yup
  .object({
    calle: yup.string().required("La calle es un campo requerido"),
    ciudad: yup.string().required("La ciudad es un campo requerido"),
    provincia: yup.string().required("La provincia es un campo requerido"),
    codigoPostal: yup
      .string()
      .required("El código postal es un campo requerido")
      .matches(/^[0-9]{4}$/, "El código postal debe tener 4 dígitos"),
  })
  .required("Por favor complete los datos de envío antes de continuar");
