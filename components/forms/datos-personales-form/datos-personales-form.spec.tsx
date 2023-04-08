import { render, screen } from "@testing-library/react";
import DatosPersonalesForm from "./datos-personales-form.component";
import userEvent from "@testing-library/user-event";

const defaultData = {
  nombre: "",
  apellido: "",
  email: "",
  direccion: {
    calle: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
  },
};

describe("DatosPersonalesForm", () => {
  it("should render the component", () => {
    render(
      <DatosPersonalesForm
        dataCheckout={defaultData}
        activeStep={0}
        handleSubmitDatosPersonales={jest.fn()}
      />
    );
    expect(screen.getByTestId("nombre-input")).toBeInTheDocument();
    expect(screen.getByTestId("apellido-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
  });

  it("should change the value of the input", async () => {
    render(
      <DatosPersonalesForm
        dataCheckout={defaultData}
        activeStep={0}
        handleSubmitDatosPersonales={jest.fn()}
      />
    );
    const textboxName = screen.getByRole<HTMLInputElement>("textbox", {
      name: "Nombre",
    });
    const textboxLastname = screen.getByRole<HTMLInputElement>("textbox", {
      name: "Apellido",
    });
    const textboxEmail = screen.getByRole<HTMLInputElement>("textbox", {
      name: "Email",
    });
    await userEvent.type(textboxName, "Juan");
    await userEvent.type(textboxLastname, "Perez");
    await userEvent.type(textboxEmail, "juanperez@gmail.com");

    expect(textboxName.value).toBe("Juan");
    expect(textboxLastname.value).toBe("Perez");
    expect(textboxEmail.value).toBe("juanperez@gmail.com");
  });
});
