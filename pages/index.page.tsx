import type { NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { useEffect, useState } from "react";
import { getComicsPaginated } from "dh-marvel/services/comics/comics.service";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import ComicsLayout from "dh-marvel/components/layouts/comics/comics-layout.component";
import ComicsPagination from "dh-marvel/components/pagination/comics-pagination.component";
import { IComicResponse } from "types/IComic.type";
import { Typography } from "@mui/material";
import Loader from "dh-marvel/components/loader/loader-component";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";

const QUANTITY_COMICS = 12;

const Index: NextPage = () => {
  const [comics, setComics] = useState<IComicResponse>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getComicsPaginated(QUANTITY_COMICS, currentPage).then(
      (data: IComicResponse) => {
        setComics(data);
      }
    );
  }, [currentPage]);

  const pagesQuantity: number =
    comics?.data?.total !== undefined
      ? Math.ceil(comics.data.total / QUANTITY_COMICS)
      : 1;

  if (!comics) return <Loader />;
  return (
    <LayoutGeneral>
      <Head>
        <title>DH Marvel</title>
        <meta name="description" content="Marvel Comics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodySingle title="Todos los comics">
        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
          Todos los comics de Marvel: {comics?.data?.total}
        </Typography>
        <ComicsLayout
          comics={
            comics?.data?.results !== undefined ? comics.data.results : []
          }
        />
        <ComicsPagination
          pagesQuantity={pagesQuantity}
          setCurrentPage={setCurrentPage}
        />
      </BodySingle>
    </LayoutGeneral>
  );
};

export async function getStaticProps() {
  const comics = await getComics(0, QUANTITY_COMICS);

  return {
    props: {
      comics,
    },
  };
}

export default Index;
