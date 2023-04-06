import "react-credit-cards/es/styles-compiled.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { IPaymentData } from "types/ICheckout.type";
import { paymentSchema } from "./schema";
import { Box, Stack } from "@mui/material";
import TextFieldInput from "../text-fiel-input/text-field-input.component";
import StepperButtons from "../stepper-buttons.component";
import { FC, useEffect, useState } from "react";
import Cards from "react-credit-cards";

interface Props {
  dataCheckout: IPaymentData;
  activeStep: number;
  handleSubmitPayment: (data: IPaymentData) => void;
  handleBack: () => void;
}
const defaultPaymentData = {
  cvc: "",
  expDate: "",
  nameOnCard: "",
  number: "",
};
const PaymentForm: FC<Props> = ({
  dataCheckout,
  activeStep,
  handleSubmitPayment,
  handleBack,
}: Props) => {
  const [paymentData, setPaymentData] =
    useState<IPaymentData>(defaultPaymentData);
  const [focused, setFocused] = useState<string>("");

  const methods = useForm<IPaymentData>({
    resolver: yupResolver(paymentSchema),
    defaultValues: dataCheckout,
  });

  const { handleSubmit, watch } = methods;
  const { number, nameOnCard, expDate, cvc } = watch();

  const onSubmit = (data: IPaymentData) => {
    handleSubmitPayment(data);
  };

  const handleInputChange = (e: any) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.defaultValue,
    });
  };
  useEffect(() => {
    setPaymentData({
      number: number,
      nameOnCard: nameOnCard,
      expDate: expDate,
      cvc: cvc,
    });
  }, [number, nameOnCard, expDate, cvc]);

  return (
    <Stack>
      <Box paddingBottom={5}>
        <Cards
          cvc={paymentData.cvc}
          expiry={paymentData.expDate}
          name={paymentData.nameOnCard}
          number={paymentData.number}
          focused={focused === "cvc" ? "cvc" : "number"}
        />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput
              name="number"
              label="Número de tarjeta"
              onInputChange={handleInputChange}
              maxLength={16}
              onFocus={() => setFocused("number")}
              regex={/[^0-9]/g}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput
              name="nameOnCard"
              label="Nombre de tarjeta"
              maxLength={20}
              onInputChange={handleInputChange}
              onFocus={() => setFocused("nameOnCard")}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput
              name="expDate"
              label="Fecha de vencimiento"
              maxLength={20}
              onInputChange={handleInputChange}
              onFocus={() => setFocused("expDate")}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextFieldInput
              name="cvc"
              type="password"
              label="Código de seguridad"
              maxLength={4}
              onInputChange={handleInputChange}
              onFocus={() => setFocused("cvc")}
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

export default PaymentForm;
