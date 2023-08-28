"use client"
import { useState } from 'react';

interface ToggleProps {
    label: string;
    isChecked: boolean;
    onToggle: () => void;
}

export default function Toggle({ label, isChecked: initialIsChecked, onToggle }: ToggleProps) {
    const [isChecked, setIsChecked] = useState(initialIsChecked);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        onToggle();
    }

    return (
        <div className='grid grid-cols-2 gap-4 items-center'>
            <div className='relative'>{label}</div>
            <div className="relative w-16 h-9 flex items-center justify-between p-0.5 bg-gray-300 rounded-lg mr-1.5">
                <div className={`absolute w-7 h-7 text-center font-bold text-xs leading-7 z-50 ${isChecked ? 'text-stone-50 right-1' : 'text-white left-1'} text-shadow-2px-2px-4px`}>{isChecked ? 'ON' : 'OFF'}</div>
                <input
                    type="checkbox"
                    className="absolute inset-0 m-auto opacity-0 cursor-pointer w-full h-full z-10"
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <div className={`absolute left-1 w-7 h-7 rounded ${isChecked ? 'bg-violet-500 translate-x-7' : 'bg-pink-500'} transition-transform duration-400`}></div>
            </div>
        </div>
    );

}
