import { Box, Stack, Typography } from "@mui/material";
import Loader from "dh-marvel/components/loader/loader.component";
import {
  getCharacter,
  getCharacters,
} from "dh-marvel/services/marvel/marvel.service";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ICharacter, ICharacterResponse } from "types/ICharacter.type";

interface Props {
  character: ICharacter;
}

const CharacterPage: NextPage<Props> = ({ character }) => {
  const router = useRouter();

  if (router.isFallback) return <Loader />;

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
            margin: "auto",
            maxWidth: "100%",
            maxHeight: "80%",
            border: "3px solid #000",
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
