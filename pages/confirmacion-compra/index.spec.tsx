import { render } from "@testing-library/react";
import ConfirmacionCompraPage from "./index.page";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ConfirmaCompraPage", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page", () => {
    const { container } = render(<ConfirmacionCompraPage />);
    expect(container).toMatchSnapshot();
  });
});
