import { useState } from 'react';

export const usePagination = (initialPage = 1, initialLimit = 10) => {
    const [page, setPage] = useState(initialPage);
    const [total, setTotal] = useState(0);
    const [limit] = useState(initialLimit);

    const nextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    return { page, total, setTotal, limit, nextPage };
};
