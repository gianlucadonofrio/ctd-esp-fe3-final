import { render, fireEvent } from "@testing-library/react";
import { comic } from "dh-marvel/test/mocks/comic";
import CardComicCheckout from "./checkout-card-comic.component";

describe("CheckoutCardComic", () => {
  const setExpandedMock = jest.fn();

  it("should render the component", () => {
    const { container } = render(<CardComicCheckout comic={comic} />);

    expect(container).toBeInTheDocument();
  });

  it("should render the component with the correct title", () => {
    const { getByText } = render(<CardComicCheckout comic={comic} />);

    expect(getByText(comic.title)).toBeInTheDocument();
  });
});
