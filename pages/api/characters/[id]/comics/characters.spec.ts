import { createMocks } from "node-mocks-http";
import handler from "./index.route";
import { getComicsByCharacterId } from "dh-marvel/services/marvel/marvel.service";
import { comic } from "dh-marvel/test/mocks/comic";

jest.mock("dh-marvel/services/marvel/marvel.service", () => ({
  getComicsByCharacterId: jest.fn(),
}));

describe("GET /api/characters/:id/comics", () => {
  it("should return 200 and the comics", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { id: 1, limit: 1 },
    });

    (getComicsByCharacterId as jest.Mock).mockResolvedValue({
      code: 200,
      status: "Ok",
      data: {
        offset: 0,
        limit: 1,
        total: 1,
        count: 1,
        results: [comic],
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      code: 200,
      status: "Ok",
      data: {
        offset: 0,
        limit: 1,
        total: 1,
        count: 1,
        results: [comic],
      },
    });
  });

  it("should return 404 and the error message", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { id: 1, limit: 1 },
    });

    (getComicsByCharacterId as jest.Mock).mockResolvedValue({
      code: 404,
      status: "Not Found",
      message: "Character not found",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getJSONData()).toEqual({
      error: "Not Found",
      message: {
        code: 404,
        status: "Not Found",
        message: "Character not found",
      },
    });
  });

  it("should return 500 and the error message", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { id: 1, limit: 1 },
    });

    (getComicsByCharacterId as jest.Mock).mockRejectedValue({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getJSONData()).toEqual({
      error: "Internal Server Error",
      message: {
        code: 500,
        status: "Internal Server Error",
        message: "Internal Server Error",
      },
    });
  });
});
