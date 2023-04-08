import { render } from "@testing-library/react";
import { comic } from "dh-marvel/test/mocks/comic";
import ComicDetailsInfo from "./comic-details-info.component";

describe("ComicDetailsInfo", () => {
  it("should render the component", () => {
    const { container } = render(<ComicDetailsInfo comic={comic} />);
    expect(container).toBeInTheDocument();
  });

  it("should handle the accordion", () => {
    const { getByTestId } = render(<ComicDetailsInfo comic={comic} />);
    const accordion = getByTestId("accordion");
    expect(accordion).toBeInTheDocument();
  });
});
