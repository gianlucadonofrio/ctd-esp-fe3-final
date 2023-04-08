import { getComics } from "dh-marvel/services/marvel/marvel.service";
import { NextApiRequest, NextApiResponse } from "next";
import { IComicResponse } from "types/IComic.type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { offset, limit } = query;

  try {
    const comics: IComicResponse = await getComics(
      Number(offset),
      Number(limit)
    );

    if (comics.code === "InvalidCredentials") {
      res.status(401).json("Invalid credentials");
      return;
    }
    if (comics.code === 200) {
      res.status(200).json(comics);
      return;
    }

    res.status(400).json("Bad request");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
}
