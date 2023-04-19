import { Box, Stack } from "@mui/material";
import CardComicCheckout from "dh-marvel/components/checkout/checkout-card-comic.component";
import StepperForm from "dh-marvel/components/forms/stepper-form.component";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import Loader from "dh-marvel/components/loader/loader-component";
import { getComicById } from "dh-marvel/services/comics/comics.service";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IComic } from "types/IComic.type";

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const { comicId } = router.query;

  const [comicData, setComicData] = useState<IComic>();

  useEffect(() => {
    const id = Number(comicId);
    if (comicId) {
      getComicById(id).then((comic) => setComicData(comic));
    }else{
      router.push('/')
    }
  }, [comicId, router]);

  if (!comicData) return <Loader />;

  return (
    <LayoutCheckout>
      <Head>
        <title>Checkout - Marvel</title>
        <meta name="description" content="Checkout" />
      </Head>
      <Box
        sx={{
          maxWidth: 1500,
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
          alignItems: "center",
        }}
      >
        <Stack
          direction={{ sm: "column", md: "row-reverse" }}
          spacing={{ xs: 15, sm: 15, md: 8, xl: 20 }}
          alignItems={{ xs: "center", sm: "center", md: "self-start" }}
        >
          <Box
            sx={{
              backgroundColor: "#f3f3f3",
              height: "100%",
              padding: "30px",
            }}
          >
            <StepperForm comic={comicData} />
          </Box>
          <Box>
            <CardComicCheckout comic={comicData} />
          </Box>
        </Stack>
      </Box>
    </LayoutCheckout>
  );
};

export default CheckoutPage;
