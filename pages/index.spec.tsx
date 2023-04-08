import { render } from "@testing-library/react";
import IndexPage from "dh-marvel/pages/index.page";

describe("IndexPage", () => {
  describe("when rendering default", () => {
    it("should render the title", () => {
      const { container } = render(<IndexPage />);

      expect(container).toMatchSnapshot();
    });
  });
});
