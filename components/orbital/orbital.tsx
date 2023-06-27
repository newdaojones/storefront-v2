"use client"

import { useEffect, useState } from 'react';
import styles from './Orbital.module.css';

export default function Orbital() {
    const [rotation, setRotation] = useState(0);

    const handleRotation = (direction: number) => {
        setRotation((currentRotation) => currentRotation + (direction * 45));
    };

    useEffect(() => {
        const handleKeyDown = (event: { key: string; }) => {
            if (event.key === 'ArrowRight') handleRotation(1);
            if (event.key === 'ArrowLeft') handleRotation(-1);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className={styles.orbitalContainer}>
            <div className={styles.outerCircle}></div>
            <div className={styles.midCircle}>
                <div className={styles.innerCircle1}>
                    <div className={styles.innerCircle2}>
                        <div className={styles.innerCircle3}></div>
                    </div>
                </div>
            </div>
            <div className={styles.linkContainer} style={{ transform: `rotate(${rotation}deg)`, color: `var(--color-charyo)` }}>
                <a href="/protected/order" className={styles.link} style={{ transform: `rotate(${-rotation}deg)`, color: `var(--color-charyo)` }}>Orders</a>
                <a href="/protected/payments" className={styles.link} style={{ transform: `rotate(${-rotation}deg)`, color: `var(--color-charyo)` }}>Payments</a>
                <a href="/protected/gateway" className={styles.link} style={{ transform: `rotate(${-rotation}deg)`, color: `var(--color-charyo)` }}>Gateway</a>
                <a href="/protected/settings" className={styles.link} style={{ transform: `rotate(${-rotation}deg)`, color: `var(--color-charyo)` }}>Settings</a>
            </div>
        </div>

    );
}


