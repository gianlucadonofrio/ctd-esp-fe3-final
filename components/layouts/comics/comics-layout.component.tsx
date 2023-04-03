import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import NextLink from "next/link";
import { IComic } from "types/IComic.type";

interface ComicsLayoutProps {
  comics: IComic[];
}

const ComicsLayout: NextPage<ComicsLayoutProps> = ({ comics }) => {
  return (
    <Grid
      container
      alignItems="stretch"
      rowSpacing={{ xs: 3, sm: 2, md: 4 }}
      columnSpacing={{ sm: 2, md: 4 }}
    >
      {comics.map((comic) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          key={comic.id}
          style={{ display: "flex", marginTop: "20px" }}
        >
          <Card
            variant="outlined"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                height="350"
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {comic.title}
                </Typography>
              </CardContent>
            </Box>
            <CardActions
              style={{ justifyContent: "space-between", alignItems: "end" }}
            >
              <NextLink href={`/comics/${comic.id}`} passHref>
                <Button variant="contained" color="primary">
                  Ver detalles
                </Button>
              </NextLink>
              <NextLink href={`/checkout/?comicId=${comic.id}`} passHref>
                <Button variant="contained" color="secondary">
                  Comprar
                </Button>
              </NextLink>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ComicsLayout;
