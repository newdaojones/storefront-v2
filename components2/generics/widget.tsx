"use client"

import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

type WidgetProps = {
    title: string;
    children: React.ReactNode;
};

export default function Widget({ title, children }: WidgetProps) {

    function handleStart(e: DraggableEvent, data: DraggableData): false | void {
        console.log('Drag started:', data);
    }

    function handleStop(e: DraggableEvent, data: DraggableData): false | void {
        console.log('Drag stopped:', data);
    }

    return (
        <Draggable onStart={handleStart} onStop={handleStop}>
            <div className="cursor-move absolute top-[20%] right-[08%] z-50">
                <div className="w-60 h-80 relative">
                    <div className="w-80 h-152 left-0 top-0 absolute bg-stone-200 bg-opacity-50 backdrop-blur-md rounded-lg shadow border-2 border-violet-600"></div>
                    <div className="w-26 left-6 top-5 absolute text-stone-900 text-lg font-normal leading-normal">{title}</div>
                    <div className=" w-80 h-0 left-0 top-14 absolute border-t-2 border-violet-600">{children}</div>
                </div>
            </div>
        </Draggable>
    );
}
