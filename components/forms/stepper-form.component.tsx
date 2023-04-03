import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { IComic } from "types/IComic.type";
import DatosPersonalesForm from "./datos-personales-form/datos-personales-form.component";

interface Props {
  comic: IComic;
}

const StepperForm: FC<Props> = ({ comic }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [dataCheckout, setDataCheckout] = useState({
    datosPersonales: {
      nombre: "",
      apellido: "",
      email: "",
    },
    datosEnvio: {
      direccion: "",
      departamento_piso: "",
      ciudad: "",
      provincia: "",
      codigoPostal: "",
    },
    datosPago: {
      numeroTarjeta: "",
      nombreTarjeta: "",
      fechaVencimiento: "",
      codigoSeguridad: "",
    },
    order: {
      comic: comic,
      cantidad: 1,
      total: comic.price,
    },
  });

  const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return "Datos Personales";
      case 1:
        return "Dirección de entrega";
      case 2:
        return "Datos del pago";
      default:
        return "";
    }
  };
  return (
    <Box maxWidth={"900px"}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === steps.length ? (
          <Box>
            <Typography>All steps completed - you&apos;re finished</Typography>
          </Box>
        ) : (
          <Box>
            <Typography>{getStepContent(activeStep)}</Typography>
            {activeStep === 0 && (
              <DatosPersonalesForm
                dataCheckout={dataCheckout.datosPersonales}
                activeStep={activeStep}
                handleNext={handleNext}
              />
            )}
            {activeStep === 1 && (
              <Box>
                <p>dato envio1</p>
                <p>dato envio2</p>
              </Box>
            )}
            {activeStep === 2 && (
              <Box>
                <p>dato pago1</p>
                <p>dato pago2</p>
              </Box>
            )}

            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Anterior
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StepperForm;
