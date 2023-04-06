import { Box, Button, Card, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useEffect, useState } from "react";
import { ICheckout } from "types/ICheckout.type";
import { useRouter } from "next/router";
import Loader from "dh-marvel/components/loader/loader.component";
import NextLink from "next/link";
import Head from "next/head";

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
    <>
      <Head>
        <title>Confirmación de compra</title>
        <meta
          name="description"
          content="Confirmación de compra de DH Marvel"
        />
      </Head>
      <Stack direction="column" alignItems="center" padding={5}>
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

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "100%",
            }}
          >
            <Box sx={{ maxWidth: 400, width: "100%" }}>
              <Typography variant="h5" maxWidth="400px">
                {dataCheckout.orderData.nombre}
              </Typography>
              <Box
                component="img"
                alt={dataCheckout.orderData.nombre}
                src={`${dataCheckout.orderData.imagen}`}
                sx={{
                  maxWidth: 500,
                  width: "100%",
                  border: "3px solid #000",
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
            </Box>
          </Stack>
        </Card>
        <NextLink href="/">
          <Button variant="outlined" sx={{ margin: 5 }}>
            Volver a la home
          </Button>
        </NextLink>
      </Stack>
    </>
  );
};

export default ConfirmacionCompraPage;
