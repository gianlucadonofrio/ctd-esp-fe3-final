import { ICheckout } from "types/ICheckout.type";
import { render, waitFor } from "@testing-library/react";

describe("checkoutForm", () => {
  const mockData: ICheckout = {
    personalData: {
      nombre: "John",
      apellido: "Doe",
      email: "john@gmail.com",
      direccion: {
        calle: "Calle falsa 123",
        ciudad: "Buenos Aires",
        provincia: "Buenos Aires",
        codigoPostal: "1234",
      },
    },
    paymentData: {
      number: "123456789",
      nameOnCard: "John Doe",
      expDate: "12/22",
      cvc: "123",
    },
    orderData: {
      nombre: "Comic",
      cantidad: 1,
      total: 100,
      imagen: "https://i.annihil.us/u/prod/marvel/i/mg/6/60/4c0035c9c425d.jpg",
    },
  };

  it("should return the expected response when called with valid data", async () => {
    const mockResponse = { success: true };
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });
    global.fetch = mockFetch as any;

    const { checkoutForm } = await import("./checkout.service");

    const response = await checkoutForm(mockData);

    expect(mockFetch).toHaveBeenCalledWith("/api/checkout", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(mockData),
    });
  });
});
