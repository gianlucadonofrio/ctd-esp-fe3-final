import { Box, Button } from "@mui/material";
import { getComicById } from "dh-marvel/services/comics/comics.service";
import { useRouter } from "next/router";
import { FC } from "react";
import { IComic } from "types/IComic.type";

interface Props {
  comic: IComic;
}

const BuyNowButton: FC<Props> = ({ comic }) => {
  const router = useRouter();

  const handleBuyNow = async (comicId: number) => {
    const comicResponse = await getComicById(comicId);

    if (comicResponse.stock === 0) {
      router.push(`/comics/${comicResponse.id}`);
    } else {
      router.push(`/checkout?comicId=${comicResponse.id}`);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleBuyNow(comic.id)}
      >
        Compra en 1 click
      </Button>
    </Box>
  );
};

export default BuyNowButton;
