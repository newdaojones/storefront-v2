// useKeyboardInteraction.ts
import { useCallback } from 'react';

export const useKeyboardInteraction = (setFocusedIndex: React.Dispatch<React.SetStateAction<number>>, ordersLength: number, activeComponent: string, setActiveComponent: React.Dispatch<React.SetStateAction<string>>, disabled: boolean) => {
    return useCallback((e: KeyboardEvent) => {
        if (disabled) {
            return;
        }

        if (activeComponent === 'Orbital') {
            return;
        }

        if (e.code === 'Enter' && e.shiftKey) {
            return setActiveComponent('Orbital');
        }

        if (e.key === 'ArrowDown') {
            setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, ordersLength - 1));
        }

        if (e.key === 'ArrowUp') {
            setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    }, [activeComponent, disabled, ordersLength, setActiveComponent, setFocusedIndex]);
};
