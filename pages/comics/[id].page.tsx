import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { IComic, IComicResponse } from "types/IComic.type";
import Loader from "dh-marvel/components/loader/loader-component";
import NextLink from "next/link";
import ComicDetailsInfo from "dh-marvel/components/comicDetailsInfo/comic-details-info.component";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

interface Props {
  comic: IComic;
}

const ComicDetailPage: NextPage<Props> = ({ comic }) => {
  const router = useRouter();
  if (router.isFallback === true) {
    return <Loader />;
  }
  const percentOffert = Math.round(
    ((comic.oldPrice - comic.price) / comic.oldPrice) * 100
  );
  return (
    <LayoutGeneral>
      <Head>
        <title>{comic.title}</title>
        <meta
          name="description"
          content={`Comic ${comic.title}.${comic.series}`}
        />
      </Head>
      <Stack
        component="section"
        maxWidth="xl"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          padding: "100px 20px",
        }}
      >
        <Grid container spacing={4} maxWidth="xl">
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                alt={comic.title}
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                sx={{
                  boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
                  margin: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                paddingBottom: "30px",
              }}
            >
              <Typography gutterBottom variant="subtitle1" component="div">
                Serie: {comic.series.name}
              </Typography>
              <Typography gutterBottom variant="h5">
                {comic.title}
              </Typography>
              {comic.isbn !== "" && (
                <Typography gutterBottom variant="subtitle1" component="div">
                  ISBN: {comic.isbn}
                </Typography>
              )}
              <Box
                sx={{
                  padding: "30px 0px",
                }}
              >
                {comic.oldPrice && comic.stock > 0 && (
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                      textDecoration: "line-through",
                      marginBottom: "5px",
                      paddingRight: "15px",
                    }}
                  >
                    ${comic.oldPrice}
                  </Typography>
                )}

                {percentOffert > 0 && (
                  <Typography variant="h6" color="green" component="div">
                    {percentOffert}% OFF!
                  </Typography>
                )}
              </Box>
              <Typography variant="h4">${comic.price}</Typography>
            </Box>
            <Box
              sx={{
                paddingBottom: "90px",
              }}
            >
              {comic.stock > 0 ? (
                <NextLink
                  href={{
                    pathname: "/checkout/",
                    query: `comicId=${comic.id}`,
                  }}
                >
                  <Button variant="contained" color="primary">
                    Comprar
                  </Button>
                </NextLink>
              ) : (
                <Button disabled>Sin stock disponible</Button>
              )}
            </Box>
            <ComicDetailsInfo comic={comic} />
          </Grid>
        </Grid>
      </Stack>
    </LayoutGeneral>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const response = await getComic(Number(id));

  return {
    props: {
      comic: response,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: IComicResponse = await getComics();

  const paths = data.data.results.map((comic) => {
    return { params: { id: comic.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default ComicDetailPage;
