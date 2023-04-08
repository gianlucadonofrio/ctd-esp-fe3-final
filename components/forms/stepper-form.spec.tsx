import { render, screen } from "@testing-library/react";
import { comic } from "dh-marvel/test/mocks/comic";
import { FormProvider, useForm } from "react-hook-form";
import { FC, PropsWithChildren } from "react";
import { ICheckout } from "types/ICheckout.type";
import StepperForm from "./stepper-form.component";

describe("StepperForm component", () => {
  const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];

  const Wrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
    const methods = useForm<ICheckout>({
      defaultValues: {
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
      },
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it("should render the component", () => {
    render(<StepperForm comic={comic} />, { wrapper: Wrapper });

    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  
});
