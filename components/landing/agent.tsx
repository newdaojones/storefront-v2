"use client"
import { useState } from "react";
import Draggable from "react-draggable";
import styles from './landing.module.css';

export default function Agent() {
    const [chatOpen, setChatOpen] = useState(false);
    const [activeDrags, setActiveDrags] = useState(0);

    const handleChatOpen = () => {
        setChatOpen(true);
    };

    const handleChatClose = () => {
        setChatOpen(false);
    };

    const onStart = () => {
        setActiveDrags(activeDrags + 1);
    };

    const onStop = () => {
        setActiveDrags(activeDrags - 1);
    };

    return (
        <>
            <button onClick={handleChatOpen} className={styles.links}>
                Agent
            </button>

            {chatOpen && (
                <Draggable onStart={onStart} onStop={onStop}>
                    <div className={styles.chatModal}>
                        <button onClick={handleChatClose}>Close chat</button>
                        <div className={styles.chatInput}>
                            <input type="text" placeholder="Start typing..." />
                        </div>
                    </div>
                </Draggable>
            )}
        </>
    );
}
