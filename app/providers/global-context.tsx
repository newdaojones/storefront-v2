import { Order } from '@prisma/client';
import { createContext, useContext, useState } from 'react';

interface GlobalContextType {
    activeComponent: string;
    setActiveComponent: React.Dispatch<React.SetStateAction<string>>;
    focusedIndex: number;
    setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
    hoveredItem: Order | null;
    setHoveredItem: React.Dispatch<React.SetStateAction<Order | null>>;
    focused: boolean;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

interface Props {
    children: React.ReactNode;
    orders: Order[];
}

export const GlobalProvider: React.FC<Props> = ({ children, orders }) => {
    const [activeComponent, setActiveComponent] = useState('Orbital');
    const [focused, setFocused] = useState(true);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [hoveredItem, setHoveredItem] = useState<Order | null>(null);

    // useEffect(() => {
    //     function handleKeyDown(e: KeyboardEvent) {
    //         if (activeComponent !== 'PaymentList') return;

    //         if (e.key === 'ArrowDown') {
    //             setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, orders.length - 1));
    //         } else if (e.key === 'ArrowUp') {
    //             setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    //         }
    //     }

    //     window.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [orders, activeComponent]);

    return (
        <GlobalContext.Provider value={{ activeComponent, setActiveComponent, focusedIndex, setFocusedIndex, hoveredItem, setHoveredItem, focused, setFocused }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};
