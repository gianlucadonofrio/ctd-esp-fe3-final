import { getComicsByCharacterId } from "dh-marvel/services/marvel/marvel.service";
import { FC, useEffect, useState } from "react";
import { IComic } from "types/IComic.type";

interface Props {
  characterId: number;
}

const ComicsByCharacter: FC<Props> = ({ characterId }) => {
  const [comics, setComics] = useState<IComic[]>();
  useEffect(() => {
    getComicsByCharacterId(characterId).then((res) => {
      setComics(res);
    });
  }, [characterId]);

  return (
    <>
      <h1>{characterId}</h1>
    </>
  );
};

export default ComicsByCharacter;
