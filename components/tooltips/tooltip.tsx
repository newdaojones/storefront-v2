import React from 'react';
import styles from './tooltip.module.css';

type TooltipProps = {
    children: React.ReactNode,
    text: string
};

export default function Tooltip({ children, text }: TooltipProps) {
    return (
        <div className={`relative group overflow-visible ${styles.tooltip}`}>
            {children}
            <div className={`${styles.tooltipText} absolute text-xs bg-black text-white p-1 rounded z-50 invisible group-hover:visible`}>
                {text}
            </div>
        </div>
    );
}
