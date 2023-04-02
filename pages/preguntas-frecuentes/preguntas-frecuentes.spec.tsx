import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faqs from "./index.page";

describe("Faqs page", () => {
  beforeEach(() => {
    render(<Faqs />);
  });

  it("should render the faqs page", () => {
    expect(screen.getByText("Preguntas frecuentes")).toBeInTheDocument();
  });

  it("should render the click to expand accordion", async () => {
    const question = screen.getByText("¿Cuántos comics tienen?");
    await userEvent.click(question);

    expect(
      screen.getByText(
        "Actualmente disponemos de toda la colección de Marvel. Algunos ejemplares pueden contar con poca o nula disponibilidad por el momento. Para mas información puede acceder a https://marvel.com"
      )
    ).toBeInTheDocument();
  });
});
