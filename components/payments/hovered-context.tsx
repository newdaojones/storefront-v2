import { Order } from '@prisma/client';
import React, { ReactNode, createContext, useContext, useState } from 'react';

type OrderData = {
    orderId: string;
    orderDate: string;
    orderStatus: string;
    orderAmount: string;
    orderCustomer: string;
};

type HoveredItemContextType = {
    hoveredItem: Order | null;
    setHoveredItem: React.Dispatch<React.SetStateAction<Order | null>>;
};

const HoveredItemContext = createContext<HoveredItemContextType | undefined>(undefined);

type Props = {
    children: ReactNode;
};

export const HoveredItemProvider: React.FC<Props> = ({ children }) => {
    const [hoveredItem, setHoveredItem] = useState<Order | null>(null);

    return (
        <HoveredItemContext.Provider value={{ hoveredItem, setHoveredItem }}>
            {children}
        </HoveredItemContext.Provider>
    );
};

export const useHoveredItem = (): HoveredItemContextType => {
    const context = useContext(HoveredItemContext);
    if (!context) {
        throw new Error('useHoveredItem must be used within a HoveredItemProvider');
    }
    return context;
};
