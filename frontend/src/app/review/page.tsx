'use client';
import { useState, useEffect } from 'react';
import { Button, Select, Radio, Typography, Upload, message, List, Spin } from 'antd';
import { UploadOutlined, OpenAIOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { useStyles } from './style/style';
// import type { UploadFile } from 'antd/es/upload/interface';
import Navbar from '@/components/navbar/Navbar';
import { analyzeCode, Violation } from '@/utils/analyzer/staticAnalyzer';
import type { UploadRequestOption, UploadRequestFile } from 'rc-upload/lib/interface';
import { useReviewActions, useReviewState } from '@/providers/review-provider';
import { useAuthActions} from '@/providers/auth-providers';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AIImprovedCodeModal from '@/components/modals/AIImprovedCodeModal';

const { Title } = Typography;

const ReviewPage = () => {

    const { styles } = useStyles();
    const [language, setLanguage] = useState('typescript');
    const [reviewType, setReviewType] = useState('static');
    const { analyzeCSharpCode } = useReviewActions();
    const { isPending, review } = useReviewState();
    const { getDeveloperProfile } = useAuthActions();
    const [code, setCode] = useState('// Paste or upload code');
    const [editorTheme, setEditorTheme] = useState<'vs-light' | 'vs-dark'>('vs-dark');
    const [results, setResults] = useState<Violation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBreakdownVisible, setIsBreakdownVisible] = useState(false);
    const [improvedCode, setImprovedCode] = useState('');

    useEffect(() => {
        getDeveloperProfile();
    }, []);

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

    const handleReview = async () => {
        if (!code?.trim()) {
            message.warning('Please enter or upload code before reviewing.');
            return;
        }

        if (reviewType === "static" && language === "typescript") {
            setIsLoading(true);
            const issues = analyzeCode(code);
            setResults(issues);
            setIsLoading(false);
            console.log(issues);
        }
        else if (reviewType === "static" && language === "csharp") {

            analyzeCSharpCode(code);
            console.log("Review: ", review);

        }
        else if (reviewType === "ai") {
            setIsLoading(true);
            try {
                const res = await fetch("/api/ai-review", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code, language }),
                });

                const data = await res.json();

                if (data.violations) {
                    setResults(data.violations);
                    message.success("AI review completed!");
                } else {
                    message.error("Failed to retrieve AI results");
                }
            } catch (err) {
                console.error(err);
                message.error("AI review failed");
            }

            setIsLoading(false);
        }
        else {
            console.log("AI Review");
        }
    };

    const exportReviewAsPDF = () => {
        if (!review || review.length === 0) {
            message.warning("No review results to export.");
            return;
        }

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Code Review Results", 14, 22);

        const tableData = review.map(item => {
            const line = item.line !== undefined ? item.line : '';
            const message = item.message !== undefined ? item.message : '';
            return [line, message];
        });

        autoTable(doc, {
            startY: 30,
            head: [["Line", "Message"]],
            body: tableData,
        });

        doc.save("csharp-review-results.pdf");
    };

    const exportReviewAsTsPDF = () => {
        if (!results || results.length === 0) {
            message.warning("No results results to export.");
            return;
        }

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Code Review Results", 14, 22);

        const tableData = results.map(item => {
            const line = item.line !== undefined ? item.line : '';
            const message = item.message !== undefined ? item.message : '';
            return [line, message, code];
        });

        autoTable(doc, {
            startY: 30,
            head: [["Line", "Message"]],
            body: tableData,
        });
        doc.save("typescript-review-results.pdf");
    };

    const handleAIBreakdown = async () => {
        try {
            const res = await fetch("/api/ai-improved-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, language }),
            });

            const data = await res.json();

            if (data?.improvedCode) {
                setImprovedCode(data.improvedCode);
                setIsBreakdownVisible(true);
            } else {
                message.error("Failed to get improved code.");
            }
        } catch (err) {
            console.error(err);
            message.error("AI breakdown failed.");
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
                        <Radio.Button value="ai">AI</Radio.Button>
                    </Radio.Group>

                    <Button type="primary" size="large" onClick={handleReview}>
                        Run Review
                    </Button>
                </div>

                <Spin spinning={isLoading} tip="Reviewing code..." size="large">
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
                                <Button onClick={exportReviewAsTsPDF}>Export</Button>
                                <Button icon={<OpenAIOutlined />} onClick={handleAIBreakdown}>Improve Code</Button>
                            </div>
                        </div>
                    )}
                </Spin>

                <Spin spinning={isPending} tip="Reviewing code..." size="large">
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
                                <Button onClick={exportReviewAsPDF}>Export</Button>
                                <Button icon={<OpenAIOutlined />} onClick={handleAIBreakdown}>Improve Code</Button>
                            </div>
                        </div>
                    )}
                </Spin>
                <AIImprovedCodeModal
                    open={isBreakdownVisible}
                    onClose={() => setIsBreakdownVisible(false)}
                    userCode={code}
                    code={improvedCode}
                    language={language}
                    editorTheme={editorTheme}
                />
            </div>


        </>
    );
}

export default ReviewPage;