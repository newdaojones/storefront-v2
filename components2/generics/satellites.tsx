"use client"

import { throttle } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SatelliteLink {
    path: string;
    label: string;
}

interface SatellitesProps {
    links: SatelliteLink[];
    radius?: number;
}

export default function Satellites({ links, radius = 100 }: SatellitesProps) {

    const [rotation, setRotation] = useState(0);

    const degreePerLink = 360 / links.length;

    const rotate = (direction: number) => {
        setRotation(prev => prev + degreePerLink * direction);
    };

    const throttledRotate = throttle(rotate, 300);

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                throttledRotate(1);
            } else if (event.key === 'ArrowLeft') {
                throttledRotate(-1);
            }
        };

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [links.length]);

    return (
        <div className='transition-transform duration-300 ease-in-out' style={{ transform: `rotate(${rotation}deg)` }}>
            {links.map((link, index) => {
                const angle = (2 * Math.PI / links.length) * index;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                    <Link
                        key={index}
                        href={link.path}
                        className={`absolute w-0 origin-center`}
                        style={{ transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)` }}
                        aria-label={link.label}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </div>
    );
}
