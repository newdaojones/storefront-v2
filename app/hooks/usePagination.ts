import { useState } from "react";

// TODO: Replace this with pagination based on business days
export const usePagination = (initialPage = 1, initialLimit = 10000) => {
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const [limit] = useState(initialLimit);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { page, total, setTotal, limit, nextPage };
};
