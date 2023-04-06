import { getComicsByCharacterId } from "dh-marvel/services/marvel/marvel.service";
import { NextApiRequest, NextApiResponse } from "next";

type Data = any | { error: string; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("Content-Type", "application/json");

  const {
    query: { id },
  } = req;

  try {
    const result = await getComicsByCharacterId(Number(id));

    if (result.code === "InvalidCredentials") {
      res.status(401).json("InvalidCredentials");
      return;
    }
    if (result.code === 409) {
      res.status(409).json("InvalidCredentials");
      return;
    }
    if (result.code === 200) {
      res.status(200).json(result);
      return;
    }

    res.status(400).json("Bad Request");
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
}
