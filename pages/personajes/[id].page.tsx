import { Box, Stack, Typography } from "@mui/material";
import ComicsLayout from "dh-marvel/components/layouts/comics/comics-layout.component";
import Loader from "dh-marvel/components/loader/loader.component";
import { getComicsByCharacterId } from "dh-marvel/services/comics/comics.service";
import {
  getCharacter,
  getCharacters,
} from "dh-marvel/services/marvel/marvel.service";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ICharacter, ICharacterResponse } from "types/ICharacter.type";
import { IComic } from "types/IComic.type";

interface Props {
  character: ICharacter;
}
const limitComics = 6;

const CharacterPage: NextPage<Props> = ({ character }) => {
  const router = useRouter();
  const [comics, setComics] = useState<IComic[]>([]);

  useEffect(() => {
    if (character) {
      getComicsByCharacterId(character.id, limitComics).then((response) => {
        setComics(response.data?.results);
      });
    }
  }, [character]);

  if (router.isFallback) return <Loader />;
  if (!character) return <Loader />;

  return (
    <>
      <Head>
        <title>{character.name} - Marvel</title>
        <meta name="description" content={`Personaje ${character.name}`} />
      </Head>
      <Stack
        component="section"
        direction="column"
        alignItems="center"
        px={2}
        sx={{ maxWidth: 1500, margin: "0 auto" }}
      >
        <Box
          component="img"
          alt={character.name}
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          sx={{
            boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
            maxWidth: "100%",
            maxHeight: "80%",
            border: "3px solid #000",
            margin: "20px 0",
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            margin: "20px 0",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {character.name}
        </Typography>
        {character.description ? (
          <Typography
            variant="body1"
            component="p"
            sx={{
              margin: "20px 0",
              fontWeight: "bold",
            }}
          >
            {character.description}
          </Typography>
        ) : null}
        {comics.length === 0 ? (
          <Loader />
        ) : (
          <Stack
            component="section"
            direction="column"
            alignItems="center"
            sx={{ width: "100%", margin: "20px 0" }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                margin: "20px 0",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Otros comics de {character.name}
            </Typography>

            {comics.length > 0 ? (
              <ComicsLayout comics={comics} />
            ) : (
              <Typography
                variant="body1"
                component="p"
                sx={{
                  margin: "20px 0",
                  fontWeight: "bold",
                }}
              >
                No hay comics para este personaje
              </Typography>
            )}
          </Stack>
        )}
      </Stack>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const response = await getCharacter(Number(id));

  return {
    props: {
      character: response,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: ICharacterResponse = await getCharacters();

  const paths = data.data.results.map((character) => ({
    params: {
      id: character.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default CharacterPage;
