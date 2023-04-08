import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { getComicById } from "dh-marvel/services/comics/comics.service";
import { comic } from "dh-marvel/test/mocks/comic";
import BuyNowButton from "./buy-now-buttons.component";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("dh-marvel/services/comics/comics.service");

describe("BuyNowButton", () => {
  const routerPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the BuyNowButton component", () => {
    render(<BuyNowButton comic={comic} />);
    const button = screen.getByTestId("buy-now-button");
    expect(button).toBeInTheDocument();
  });

  // it("should call getComicById with the correct comic ID when clicking the button", async () => {
  //   const mockComic = { id: 1, title: "Test Comic", stock: 10 };
  //   (getComicById as jest.Mock).mockResolvedValue(mockComic);
  //   render(<BuyNowButton comic={mockComic} />);
  //   const button = screen.getByTestId("buy-now-button");
  //   fireEvent.click(button);
  //   expect(getComicById).toHaveBeenCalledTimes(1);
  //   expect(getComicById).toHaveBeenCalledWith(mockComic.id);
  // });

  it("should navigate to the checkout page when the comic is in stock", async () => {
    (getComicById as jest.Mock).mockResolvedValue(comic);
    render(<BuyNowButton comic={comic} />);
    const button = screen.getByTestId("buy-now-button");
    fireEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(routerPush).toHaveBeenCalledTimes(1);

    expect(routerPush).toHaveBeenCalledWith(`/checkout?comicId=${comic.id}`);
  });

  it("should navigate to the comic details page when the comic is out of stock", async () => {
    const mockComic = { ...comic, stock: 0 };
    (getComicById as jest.Mock).mockResolvedValue(mockComic);
    render(<BuyNowButton comic={mockComic} />);
    const button = screen.getByTestId("buy-now-button");
    fireEvent.click(button);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(routerPush).toHaveBeenCalledTimes(1);
    expect(routerPush).toHaveBeenCalledWith(`/comics/${mockComic.id}`);
  });
});
