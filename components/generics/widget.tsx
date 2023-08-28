"use client"

import { useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

type WidgetProps = {
    title: string;
    children: React.ReactNode;
};


export default function Widget({ title, children }: WidgetProps) {
    const [isDraggable, setIsDraggable] = useState(false);


    function handleStart(e: DraggableEvent, data: DraggableData): false | void {
        console.log('Drag started:', data);
    }

    function handleStop(e: DraggableEvent, data: DraggableData): false | void {
        console.log('Drag stopped:', data);
    }

    return (
        <Draggable disabled={!isDraggable} onStart={handleStart} onStop={handleStop}>
            <div className="cursor-move absolute top-[20%] right-[08%] z-50">
                <div className="w-full h-full relative">
                    <div className="w-80 h-152 left-0 top-0 absolute bg-gray-500 bg-opacity-50 backdrop-blur-md rounded-lg shadow border-4 border-purps">
                        <button onClick={() => setIsDraggable(!isDraggable)}>
                            {isDraggable ? 'Lock' : 'Move'}
                        </button>
                    </div>
                    <div className="w-26 left-6 top-5 absolute text-charyo text-lg font-normal leading-normal">
                        {title}

                    </div>
                    <div className=" w-80 h-0 left-0 top-14 absolute border-t-2 border-purps">{children}</div>
                </div>
            </div>
        </Draggable>
    );
}
