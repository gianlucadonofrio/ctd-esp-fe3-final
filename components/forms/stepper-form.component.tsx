import { Alert, Box, Step, StepButton, Stepper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  ICheckout,
  IDireccion,
  IPaymentData,
  IPersonalData,
} from "types/ICheckout.type";

import { IComic } from "types/IComic.type";
import DatosPersonalesForm from "./datos-personales-form/datos-personales-form.component";
import DireccionForm from "./direccion-form/direccion-form.component";
import PaymentForm from "./datos-pago-form/datos-pago-form.component";
import { useRouter } from "next/router";
import { checkoutForm } from "dh-marvel/services/checkout/checkout.service";
import { Snackbar } from "@mui/material";

interface Props {
  comic: IComic;
}
const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];

const StepperForm: FC<Props> = ({ comic }) => {
  const defaultValue = {
    personalData: {
      nombre: "",
      apellido: "",
      email: "",
      direccion: {
        calle: "",
        ciudad: "",
        provincia: "",
        codigoPostal: "",
      },
    },
    paymentData: {
      cvc: "",
      expDate: "",
      nameOnCard: "",
      number: "",
    },
    orderData: {
      nombre: "",
      cantidad: 0,
      total: 0,
      imagen: "",
    },
  };
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(2);
  const [checkoutData, setCheckoutData] = useState<ICheckout>(defaultValue);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSubmitDatosPersonales = (data: IPersonalData) => {
    setCheckoutData({ ...checkoutData, personalData: { ...data } });
    setActiveStep(activeStep + 1);
  };
  const handleSubmitDireccion = (data: IDireccion) => {
    setCheckoutData({
      ...checkoutData,
      personalData: { ...checkoutData.personalData, direccion: { ...data } },
    });
    setActiveStep(activeStep + 1);
  };

  const handleSubmitPayment = async (data: IPaymentData) => {
    setCheckoutData({
      ...checkoutData,
      paymentData: { ...data },
    });
    const dataToSend = {
      ...checkoutData,
      paymentData: { ...data },
      orderData: {
        nombre: comic.title,
        cantidad: 1,
        total: comic.price,
        imagen: comic.thumbnail.path + "." + comic.thumbnail.extension,
      },
    };

    const response = checkoutForm(dataToSend);
    response.then((res) => {
      console.log(res.data);
      if (!res.data) {
        setError({
          error: true,
          message: res.message,
        });
      } else {
        localStorage.setItem(
          "checkoutData",
          JSON.stringify({
            ...checkoutData,
            paymentData: { ...data },
            orderData: {
              nombre: comic.title,
              cantidad: 1,
              total: comic.price,
              imagen: comic.thumbnail.path + "." + comic.thumbnail.extension,
            },
          })
        );

        router.push(`/confirmacion-compra`);
      }
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === 0 && (
          <DatosPersonalesForm
            dataCheckout={checkoutData.personalData}
            activeStep={activeStep}
            handleSubmitDatosPersonales={handleSubmitDatosPersonales}
          />
        )}
        {activeStep === 1 && (
          <DireccionForm
            dataCheckout={checkoutData.personalData.direccion}
            activeStep={activeStep}
            handleSubmitDireccion={handleSubmitDireccion}
            handleBack={handleBack}
          />
        )}
        {activeStep === 2 && (
          <PaymentForm
            dataCheckout={checkoutData.paymentData}
            activeStep={activeStep}
            handleSubmitPayment={handleSubmitPayment}
            handleBack={handleBack}
          />
        )}
        {error.error && (
          <Snackbar
            open={error.error}
            autoHideDuration={6000}
            onClose={() => setError({ error: false, message: "" })}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginBottom: "3rem",
            }}

          >
            <Alert
              onClose={() => setError({ error: false, message: "" })}
              severity="error"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {error.message}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default StepperForm;
