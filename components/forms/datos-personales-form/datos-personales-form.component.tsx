import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { IPersonalData } from "types/ICheckout.type";
import { schema } from "./schema";
import StepperButtons from "../stepper-buttons.component";
import TextFieldInput from "../text-fiel-input/text-field-input.component";

interface Props {
  dataCheckout: IPersonalData;
  activeStep: number;
  handleSubmitDatosPersonales: (data: IPersonalData) => void;
}

const DatosPersonalesForm: FC<Props> = ({
  dataCheckout,
  activeStep,
  handleSubmitDatosPersonales,
}: Props) => {
  const methods = useForm<IPersonalData>({
    resolver: yupResolver(schema),
    defaultValues: dataCheckout,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: IPersonalData) => {
    handleSubmitDatosPersonales(data);
  };

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput
              name="nombre"
              label="Nombre"
              type="text"
              maxLength={20}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput name="apellido" label="Apellido" maxLength={20} />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput name="email" label="Email" maxLength={50} />
          </Box>
        </FormProvider>
      </form>
      <StepperButtons
        activeStep={activeStep}
        handleNext={handleSubmit(onSubmit)}
        handleBack={() => {}}
      />
    </Stack>
  );
};

export default DatosPersonalesForm;
