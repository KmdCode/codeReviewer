'use client';
import { useState, useRef, useEffect } from 'react';
import { Button, Input, Typography, Spin } from 'antd';
import { useStyles } from './style/style';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar/Navbar';

const { Title } = Typography;

interface Message {
    role: 'user' | 'assistant';
    text: string;
    code?: string;
};

const AssistantPage = () => {
    const { styles } = useStyles();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        const container = chatContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
        const res = await fetch('/api/ai-assistant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input }),
        });

        const data = await res.json();

        const assistantMsg: Message = {
            role: 'assistant',
            text: data.reply || 'Sorry, I could not generate a response.',
        };
        setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prev) => [...prev, { role: 'assistant', text: 'Error contacting AI.' }]);
    } finally {
        setLoading(false);
    }
};

    return (
        <>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.container}>
                    <Title level={2} className={styles.title}>AI Assistant</Title>
                    <div ref={chatContainerRef} className={styles.chatContainer}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && <Spin />}
                    </div>

                    <div className={styles.inputContainer}>
                        <Input.TextArea
                            rows={3}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a coding question..."
                            className={styles.textArea}
                        />
                        <Button type="primary" onClick={sendMessage} className={styles.sendBtn}>
                            Send
                        </Button>
                    </div>
                </div>
                <div className={`${styles.shape} ${styles.circle}`} />
                <div className={`${styles.shape} ${styles.square}`} />
                <div className={`${styles.shape} ${styles.triangle}`} />
            </div>

        </>
    );
}

export default AssistantPage;