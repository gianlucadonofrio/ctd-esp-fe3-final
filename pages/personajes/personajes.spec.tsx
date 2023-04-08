import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterPage from "./[id].page";

const character = {
  id: 1011334,
  name: "Spider Man",
  description: "",
  modified: "2016-02-10T18:30:47-0500",
  resourceURI: "http://gateway.marvel.com/v1/public/characters/1011334",
  thumbnail: {
    path: "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b",
    extension: "jpg",
  },
};

describe("Personajes page", () => {
  beforeEach(() => {
    render(<CharacterPage character={character} />);+
    });

  it("should render the personajes page", () => {
    expect(screen.getByText("Personajes")).toBeInTheDocument();
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
