'use client';
import { useState } from 'react';
import { Button, Select, Radio, Typography, Upload, message } from 'antd';
import { UploadOutlined, OpenAIOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { useStyles } from './style/style';
import type { UploadFile } from 'antd/es/upload/interface';
import Navbar from '@/components/navbar/Navbar';

const { Title } = Typography;

const ReviewPage = () => {
    const { styles } = useStyles();
    const [language, setLanguage] = useState('typescript');
    const [reviewType, setReviewType] = useState('static');
    const [code, setCode] = useState('// Paste or upload code');
    const [editorTheme, setEditorTheme] = useState<'vs-light' | 'vs-dark'>('vs-dark');
    const [results, setResults] = useState<string | null>(null);

    const handleUpload = (file: UploadFile) => {
        const actualFile = file.originFileObj;

        if (actualFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === 'string') {
                    setCode(e.target.result);
                }
            };
            reader.readAsText(actualFile);
        }

        return false;
    };

    const handleReview = () => {
        if (!code?.trim()) {
            message.warning('Please enter or upload code before reviewing.');
            return;
        }
        setResults(
            ` Review Type: ${reviewType}\n Language: ${language}\n\n Feedback:\n- No critical issues found.\n- Consider using consistent naming conventions.\n- Add inline comments for clarity.`
        );
    };

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <Title className={styles.pageTitle}>Review Code</Title>

                <div className={styles.header}>
                    <Select
                        className={styles.languageSelector}
                        value={language}
                        onChange={setLanguage}
                        options={[
                            { label: 'TypeScript', value: 'typescript' },
                            { label: 'C#', value: 'csharp' },
                        ]}
                    />
                    <Upload
                        beforeUpload={handleUpload}
                        showUploadList={false}
                        accept=".ts,.cs,.txt"
                    >
                        <Button icon={<UploadOutlined />}>Upload Code</Button>
                    </Upload>
                    <Select
                        className={styles.themeSelector}
                        value={editorTheme}
                        onChange={(value) => setEditorTheme(value)}
                        options={[
                            { label: 'Light Mode', value: 'vs-light' },
                            { label: 'Dark Mode', value: 'vs-dark' }
                        ]}
                    />
                </div>

                <div className={styles.editorWrapper}>
                    <Editor
                        height="24rem"
                        language={language === 'csharp' ? 'csharp' : 'typescript'}
                        value={code}
                        onChange={(value) => setCode(value || '')}
                        theme={editorTheme}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 16, bottom: 16 },
                        }}
                    />
                </div>

                <div className={styles.actions}>
                    <Radio.Group
                        value={reviewType}
                        onChange={(e) => setReviewType(e.target.value)}
                    >
                        <Radio.Button value="static">Static</Radio.Button>
                        <Radio.Button value="ai">AI</Radio.Button>
                    </Radio.Group>

                    <Button type="primary" size="large" onClick={handleReview}>
                        Run Review
                    </Button>
                </div>

                {results && (
                    <div className={styles.results}>
                        <Title level={4}>Review Results</Title>
                        <pre className={styles.resultBox}>{results}</pre>
                        <div className={styles.resultActions}>
                            <Button>Export</Button>
                            <Button icon={<OpenAIOutlined />}>AI Breakdown</Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ReviewPage;