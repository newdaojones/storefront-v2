// useMouseInteraction.ts
import { useState } from 'react';

type MouseInteractionProps = {
    setHoveredItem: React.Dispatch<React.SetStateAction<any>>;
};

export const useMouseInteraction = ({ setHoveredItem }: MouseInteractionProps) => {
    const [isKeyboardMode, setIsKeyboardMode] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const onMouseEnter = (index: number, item: any) => {
        if (!isKeyboardMode) {
            setHoveredItem(item);
            setHoveredIndex(index);
        }
    };

    const onMouseMove = () => {
        setIsKeyboardMode(false);
    };

    return {
        isKeyboardMode,
        hoveredIndex,
        onMouseEnter,
        onMouseMove,
    };
};
