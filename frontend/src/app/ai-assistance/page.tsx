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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg: Message = { role: 'user', text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        setTimeout(() => {
            const assistantMsg: Message = {
                role: 'assistant',
                text: 'Here’s my explanation for your code:',
                
            };
            setMessages((prev) => [...prev, assistantMsg]);
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <Navbar />

            <div className={styles.page}>
                <div className={styles.container}>
                    <Title level={2} className={styles.title}>AI Assistance</Title>
                    <div className={styles.chatContainer}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && <Spin />}
                        <div ref={messagesEndRef} />
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
            </div>

        </>
    );
}

export default AssistantPage;