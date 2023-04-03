import { getComics } from "dh-marvel/services/marvel/marvel.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const { offset, limit } = query;

  try {
    const comics = await getComics(Number(offset), Number(limit));

    if (res.statusCode === 200) {
      res.status(200).json(comics);
    } else {
      res.status(500).json(comics);
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
