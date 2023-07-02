"use client"
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import styles from './landing.module.css';

export default function Agent() {
    const [chatOpen, setChatOpen] = useState(false);
    const [activeDrags, setActiveDrags] = useState(0);
    const chatModalRef = useRef<HTMLDivElement>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (chatOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [chatOpen]);

    const handleChatOpen = () => {
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(100);
        }
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

    const handleClickOutside = (event: { target: any; }) => {
        if (chatModalRef.current && !chatModalRef.current.contains(event.target)) {
            handleChatClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <>
            <button onClick={handleChatOpen} className={styles.links}>
                Agent
            </button>

            {chatOpen && (
                <Draggable onStart={onStart} onStop={onStop}>
                    <div ref={chatModalRef} className={styles.chatModal}>
                        <button onClick={handleChatClose}>Close chat</button>
                        <div className={styles.chatInput}>
                            <input ref={inputRef} type="text" placeholder="Start typing..." />
                        </div>
                    </div>
                </Draggable>
            )}
        </>
    );
}
