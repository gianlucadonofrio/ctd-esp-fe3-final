import { Box, Button, Card, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect, useState } from "react";
import { ICheckout } from "types/ICheckout.type";
import { useRouter } from "next/router";
import Loader from "dh-marvel/components/loader/loader-component";
import NextLink from "next/link";
import Head from "next/head";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";

const ConfirmacionCompraPage = () => {
  const router = useRouter();
  const [dataCheckout, setDataCheckout] = useState<ICheckout>();
  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data !== null) {
      const obj = JSON.parse(data);
      setDataCheckout(obj);
    } else {
      router.push("/");
    }
  }, [router]);

  if (!dataCheckout) {
    return <Loader />;
  }
  return (
    <LayoutCheckout>
      <Head>
        <title>Confirmación de compra</title>
        <meta
          name="description"
          content="Confirmación de compra de DH Marvel"
        />
      </Head>
      <Stack
        component="section"
        sx={{
          maxWidth: 1500,
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Card
          sx={{
            maxWidth: 1000,
            width: "100%",
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 100,
              color: "#00bfa5",
              margin: 5,
            }}
          />

          <Typography variant="h4" paddingBottom={2}>
            ¡Que disfrutes tu compra!
          </Typography>
          <Typography
            variant="h5"
            paddingBottom={2}
            textAlign="center"
            fontWeight="bold"
          >
            {dataCheckout.orderData.nombre}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                component="img"
                alt={dataCheckout.orderData.nombre}
                src={`${dataCheckout.orderData.imagen}`}
                sx={{
                  maxWidth: 400,
                  width: "100%",
                  border: "3px solid #000",
                  height: "auto",
                }}
              />
            </Box>
            <Box
              sx={{
                maxWidth: 400,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" paddingBottom={2}>
                Datos de entrega:
              </Typography>
              <Typography paddingBottom={1}>
                Comprador: {dataCheckout.personalData.nombre}{" "}
                {dataCheckout.personalData.apellido}
              </Typography>
              <Typography paddingBottom={1}>
                Dirección de envío: {dataCheckout.personalData.direccion.calle}
              </Typography>
              <Typography paddingBottom={1}>
                Precio: ${dataCheckout.orderData.total}
              </Typography>
            </Box>
          </Stack>
        </Card>
        <NextLink href="/">
          <Button variant="outlined" sx={{ margin: 5 }}>
            Volver a la home
          </Button>
        </NextLink>
      </Stack>
    </LayoutCheckout>
  );
};

export const getStaticProps = async () => {
  const data = localStorage.getItem("checkoutData");
  if (data !== null) {
    const obj = JSON.parse(data);
    return {
      props: {
        dataCheckout: obj,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export default ConfirmacionCompraPage;
