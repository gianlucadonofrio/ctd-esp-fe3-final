import { Pagination, Stack } from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";

interface ComicsPaginationProps {
  pagesQuantity: number;
  setCurrentPage: (page: number) => void;
}

const ComicsPagination: FC<ComicsPaginationProps> = ({
  pagesQuantity,
  setCurrentPage,
}) => {
  const [page, setPage] = useState<number>(1);

  const handlePagination = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="center" margin="20px">
      <Pagination count={pagesQuantity} onChange={handlePagination} />
    </Stack>
  );
};

export default ComicsPagination;
