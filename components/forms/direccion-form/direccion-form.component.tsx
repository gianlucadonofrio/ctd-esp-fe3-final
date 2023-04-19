import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IDireccion } from "types/ICheckout.type";
import { deliverySchema } from "./schema";
import { Box, Stack } from "@mui/material";
import TextFieldInput from "../text-fiel-input/text-field-input.component";
import StepperButtons from "../stepper-buttons.component";

interface Props {
  dataCheckout: IDireccion;
  activeStep: number;
  handleSubmitDireccion: (data: IDireccion) => void;
  handleBack: () => void;
}

const DireccionForm: FC<Props> = ({
  dataCheckout,
  activeStep,
  handleSubmitDireccion,
  handleBack,
}: Props) => {
  const methods = useForm<IDireccion>({
    resolver: yupResolver(deliverySchema),
    defaultValues: dataCheckout,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: IDireccion) => {
    handleSubmitDireccion(data);
  };

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput name="calle" label="Calle" maxLength={20} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput name="departamento/piso" label="Departamento/Piso (opcional)" maxLength={20} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput name="ciudad" label="Ciudad" maxLength={20} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput name="provincia" label="Provincia" maxLength={20} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput
              name="codigoPostal"
              label="Código Postal"
              maxLength={20}
            />
          </Box>
        </FormProvider>
      </form>
      <StepperButtons
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
        handleBack={handleBack}
      />
    </Stack>
  );
};

export default DireccionForm;
