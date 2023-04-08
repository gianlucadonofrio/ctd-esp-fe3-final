import "@testing-library/jest-dom";
import { server } from "dh-marvel/test/server";
import { createMocks } from "node-mocks-http";
import handleComics from "dh-marvel/pages/api/comics/index.route";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Comics API", () => {
  describe("when sending a GET request", () => {
    it("should return status 200", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });
      await handleComics(req, res);
      expect(res._getStatusCode()).toBe(200);
    });
  });
});
