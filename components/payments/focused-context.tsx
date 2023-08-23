// FocusedItemContext.tsx

import { Order } from '@prisma/client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type FocusedItemContextType = {
    focusedIndex: number;
    setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
};

const FocusedItemContext = createContext<FocusedItemContextType | undefined>(undefined);

type Props = {
    children: React.ReactNode;
    orders: Order[];
};

export const FocusedItemProvider: React.FC<Props> = ({ children, orders }) => {
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'ArrowDown') {
                setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, orders.length - 1));
            } else if (e.key === 'ArrowUp') {
                setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [orders]);

    return (
        <FocusedItemContext.Provider value={{ focusedIndex, setFocusedIndex }}>
            {children}
        </FocusedItemContext.Provider>
    );
};

export const useFocusedItem = (): FocusedItemContextType => {
    const context = useContext(FocusedItemContext);
    if (!context) {
        throw new Error('useFocusedItem must be used within a FocusedItemProvider');
    }
    return context;
};
