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
import BuyNowButton from "dh-marvel/components/buyNowButton/buy-now-buttons.component";
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
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <NextLink href={`/comics/${comic.id}`} passHref>
                  <Button variant="contained" color="primary">
                    Ver detalles
                  </Button>
                </NextLink>
                <NextLink href={`/comics/${comic.id}`} passHref>
                  <Button variant="contained" color="secondary">
                    Comprar
                  </Button>
                </NextLink>
              </Box>
              <BuyNowButton comic={comic} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ComicsLayout;
