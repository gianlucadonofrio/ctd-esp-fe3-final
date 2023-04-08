import { render } from "@testing-library/react";
import CharacterPage from "./[id].page";
import { character } from "dh-marvel/test/mocks/character";

describe("Personajes page", () => {
  const setComics = jest.fn();

  it("should render successfully", () => {
    const { container } = render(<CharacterPage character={character} />);
    expect(container).toMatchSnapshot();
  });

  it("should set comics", () => {
    setComics(character.comics.items);

    expect(setComics).toHaveBeenCalled();
  });
});
