import { Box, Divider, Typography } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { IComic } from "types/IComic.type";

interface Props {
  comic: IComic;
}

const CardComicCheckout: NextPage<Props> = ({ comic }) => {
  return (
    <Box maxWidth={"500px"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            component="img"
            alt={comic.title}
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            sx={{
              boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
              margin: "auto",
              maxWidth: "60%",
            }}
          />
        </Box>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            margin: "20px 0",
          }}
        >
          {comic.title}
        </Typography>

        <Divider
          component="li"
          sx={{ borderBottomWidth: 4 }}
          style={{ listStyle: "none" }}
        />
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            margin: "20px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Pagas: <span>${comic.price}</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default CardComicCheckout;
