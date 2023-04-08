import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentForm from "./datos-pago-form.component";

describe("PaymentForm", () => {
  it("should render without errors", () => {
    render(
      <PaymentForm
        dataCheckout={{
          number: "",
          nameOnCard: "",
          expDate: "",
          cvc: "",
        }}
        activeStep={1}
        handleSubmitPayment={() => {}}
        handleBack={() => {}}
      />
    );
    expect(screen.getByLabelText("Número de tarjeta")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre de tarjeta")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha de vencimiento")).toBeInTheDocument();
    expect(screen.getByLabelText("Código de seguridad")).toBeInTheDocument();
  });
  it("should update the payment data when the user enters information", () => {
    render(
      <PaymentForm
        dataCheckout={{
          number: "",
          nameOnCard: "",
          expDate: "",
          cvc: "",
        }}
        activeStep={1}
        handleSubmitPayment={() => {}}
        handleBack={() => {}}
      />
    );
    const numberInput = screen.getByLabelText(
      "Número de tarjeta"
    ) as HTMLInputElement;
    const nameInput = screen.getByLabelText(
      "Nombre de tarjeta"
    ) as HTMLInputElement;
    const expDateInput = screen.getByLabelText(
      "Fecha de vencimiento"
    ) as HTMLInputElement;
    const cvcInput = screen.getByLabelText(
      "Código de seguridad"
    ) as HTMLInputElement;

    fireEvent.change(numberInput, { target: { value: "4111111111111111" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(expDateInput, { target: { value: "12/23" } });
    fireEvent.change(cvcInput, { target: { value: "123" } });

    expect(numberInput.value).toBe("4111111111111111");
    expect(nameInput.value).toBe("John Doe");
    expect(expDateInput.value).toBe("12/23");
    expect(cvcInput.value).toBe("123");
  });
});
