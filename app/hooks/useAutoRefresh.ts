// useAutoRefresh.ts
import { useEffect } from 'react';

type AutoRefreshProps = {
    handleRefresh: () => void;
    interval: number;
};

export const useAutoRefresh = ({ handleRefresh, interval }: AutoRefreshProps) => {
    useEffect(() => {
        const intervalId = setInterval(handleRefresh, interval);
        return () => clearInterval(intervalId);
    }, [handleRefresh, interval]);
};
