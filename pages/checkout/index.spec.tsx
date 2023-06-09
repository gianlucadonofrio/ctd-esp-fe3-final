import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkout from "./index.page";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter, useRouter } from "next/router";

const createMockRouter = (router: Partial<NextRouter>): NextRouter => {
  return {
    basePath: "",
    pathname: "/checkout",
    route: "/checkout?comic=82967",
    query: { comic: "82967" },
    asPath: "/checkout?comic=82967",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...router,
  };
};

let router = createMockRouter({});

describe("ComicIDPage", () => {
  beforeEach(() => {
    router = createMockRouter({});
  });

  it("should render the page", () => {
    const { container } = render(
      <RouterContext.Provider value={router}>
        <Checkout />
      </RouterContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
