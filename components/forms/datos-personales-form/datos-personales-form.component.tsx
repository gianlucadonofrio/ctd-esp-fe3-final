import { Box, Stack, useFormControl } from "@mui/material";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

interface Props {
  dataCheckout: {
    nombre: string;
    apellido: string;
    email: string;
  };
  activeStep: number;
  handleNext: () => void;
}

const DatosPersonalesForm: FC<Props> = ({
  dataCheckout,
  activeStep,
  handleNext,
}) => {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { ...dataCheckout },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
    handleNext();
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 15, sm: 15, md: 8, xl: 20 }}
      alignItems={{ xs: "center", sm: "center", md: "self-start" }}
    ></Stack>
  );
};

export default DatosPersonalesForm;
