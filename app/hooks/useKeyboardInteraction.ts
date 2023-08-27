// useKeyboardInteraction.ts
import { useCallback } from 'react';

export const useKeyboardInteraction = (setFocusedIndex: React.Dispatch<React.SetStateAction<number>>, ordersLength: number, activeComponent: string, setActiveComponent: React.Dispatch<React.SetStateAction<string>>, disabled: boolean) => {
    return useCallback((e: KeyboardEvent) => {
        console.log("useKeyboardInteraction called", { e, disabled, activeComponent, ordersLength });

        if (disabled) {
            console.log("Exiting because disabled is true");
            return;
        }

        if (activeComponent === 'Orbital') {
            console.log("Exiting because activeComponent is 'Orbital'");
            return;
        }

        if (e.code === 'Enter' && e.shiftKey) {
            console.log("Setting activeComponent to 'Orbital'");
            return setActiveComponent('Orbital');
        }

        if (e.key === 'ArrowDown') {
            console.log("ArrowDown pressed");
            setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, ordersLength - 1));
        }

        if (e.key === 'ArrowUp') {
            console.log("ArrowUp pressed");
            setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    }, [activeComponent, disabled, ordersLength, setActiveComponent, setFocusedIndex]);
};

