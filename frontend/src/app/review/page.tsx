'use client';
import { useState } from 'react';
import { Button, Select, Radio, Typography, Upload, message, List } from 'antd';
import { UploadOutlined, OpenAIOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { useStyles } from './style/style';
import type { UploadFile } from 'antd/es/upload/interface';
import Navbar from '@/components/navbar/Navbar';
import { analyzeCode, Violation } from '@/utils/analyzer/staticAnalyzer';
import type { UploadRequestOption, UploadRequestFile } from 'rc-upload/lib/interface';
import { useReviewActions, useReviewState } from '@/providers/review-provider';
import { ICode } from '@/providers/review-provider/context';

const { Title } = Typography;

const ReviewPage = () => {

    const { styles } = useStyles();
    const [language, setLanguage] = useState('typescript');
    const [reviewType, setReviewType] = useState('static');
    const { analyzeCSharpCode } = useReviewActions();
    const { isError, review} = useReviewState();
    const [code, setCode] = useState('// Paste or upload code');
    const [editorTheme, setEditorTheme] = useState<'vs-light' | 'vs-dark'>('vs-dark');
    const [results, setResults] = useState<Violation[]>([]);
    const [cSharp, setCSharp] = useState();

    const handleFileUpload = (options: UploadRequestOption<UploadRequestFile>) => {
        const { file, onError } = options;

        const reader = new FileReader();

        reader.onload = (e) => {
            if (typeof e.target?.result === 'string') {
                setCode(e.target.result);
                message.success('File loaded into editor!');
            }
        };

        reader.onerror = () => {
            message.error('Failed to read file.');
            onError?.(new Error('File reading error'));
        };

        reader.readAsText(file as Blob);
    };

    const handleReview = () => {
        if (!code?.trim()) {
            message.warning('Please enter or upload code before reviewing.');
            return;
        }

        if (reviewType === "static" && language === "typescript") {
            const issues = analyzeCode(code);
            setResults(issues);
            console.log(issues);
        }
        else if (reviewType === "static" && language === "csharp") {

            analyzeCSharpCode(code);
            console.log("Review: ",review);
            
        }
        else {
            console.log("AI Review");
        }
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
                        accept=".ts,.cs,.txt"
                        showUploadList={false}
                        customRequest={handleFileUpload}
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
                        onChange={(value) => setCode(value || "")}
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
                        <Radio.Button disabled value="ai">AI</Radio.Button>
                    </Radio.Group>

                    <Button type="primary" size="large" onClick={handleReview}>
                        Run Review
                    </Button>
                </div>

                {results && results.length > 0 && (
                    <div className={styles.results}>
                        <Title level={4}>Review Results</Title>

                        <List
                            bordered
                            dataSource={results}
                            className={styles.resultBox}
                            renderItem={(item) => (
                                <List.Item>
                                    <strong>Line {item.line}</strong>: {item.message}
                                </List.Item>
                            )}
                        />

                        <div className={styles.resultActions}>
                            <Button>Export</Button>
                            <Button icon={<OpenAIOutlined />}>AI Breakdown</Button>
                        </div>
                    </div>
                )}

                {review && review.length > 0 && (
                    <div className={styles.results}>
                        <Title level={4}>Review review</Title>

                        <List
                            bordered
                            dataSource={review}
                            className={styles.resultBox}
                            renderItem={(item) => (
                                <List.Item>
                                    <strong>Line {item.line}</strong>: {item.message}
                                </List.Item>
                            )}
                        />

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