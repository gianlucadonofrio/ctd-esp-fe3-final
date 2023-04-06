import * as yup from "yup";

export const paymentSchema = yup
  .object({
    number: yup
      .string()
      .required("El número de tarjeta es un campo requerido")
      .matches(/^[0-9]{16}$/, "El número de tarjeta debe tener 16 dígitos"),
    nameOnCard: yup
      .string()
      .required("El nombre de la tarjeta es un campo requerido"),
    expDate: yup
      .string()
      .required("La fecha de vencimiento es un campo requerido")
      .matches(
        /^[0-9]{2}\/[0-9]{2}$/,
        "La fecha de vencimiento debe tener el formato MM/AA"
      ),
    cvc: yup
      .string()
      .required("El código de seguridad es un campo requerido")
      .matches(/^[0-9]{3,4}$/, "El código de seguridad debe tener 3 dígitos"),
  })
  .required("Por favor complete los datos de pago antes de continuar");
