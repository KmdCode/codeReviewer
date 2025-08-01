'use client';
import { useState } from 'react';
import { Collapse, Typography, Tag, Button, Empty } from 'antd';
import { useStyles } from './style/style';
import MonacoEditor from '@monaco-editor/react';
import Navbar from '@/components/navbar/Navbar';

const { Title, Paragraph } = Typography;

const dummyReviews = [
  {
    id: 1,
    title: 'Login Service - Bug Fix',
    code: `public class LoginService { /* ... */ }`,
    results: 'AI found 3 suggestions to improve null handling and async usage.',
    language: 'csharp',
    type: 'AI',
    date: '2025-07-29',
  },
  {
    id: 2,
    title: 'User Dashboard UI',
    code: `const Dashboard = () => { return <div>Hello</div>; }`,
    results: 'Static analysis flagged an unused variable.',
    language: 'typescript',
    type: 'Static',
    date: '2025-07-27',
  },
];

const SavedReviewsPage = () => {
  const { styles } = useStyles();

  const renderMeta = (review: typeof dummyReviews[number]) => (
    <div className={styles.metaInfo}>
      <Tag color={review.language === 'csharp' ? 'blue' : 'volcano'}>
        {review.language.toUpperCase()}
      </Tag>
      <Tag color={review.type === 'AI' ? 'green' : 'geekblue'}>
        {review.type} Review
      </Tag>
      <span className="date">{review.date}</span>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.headerSection}>
            <Title level={2}>Saved Reviews</Title>
            <Paragraph type="secondary">
              Review your previously saved code reviews. Expand a card to view the original code and review feedback.
            </Paragraph>
          </div>

          {dummyReviews.length === 0 ? (
            <Empty description="No saved reviews yet">
              <Button type="primary" href="/review">
                Run your first review
              </Button>
            </Empty>
          ) : (
            <Collapse accordion className={styles.collapse}>
              {dummyReviews.map((review) => (
                <Collapse.Panel
                  header={
                    <div className={styles.reviewHeader}>
                      <strong>{review.title}</strong>
                      {renderMeta(review)}
                    </div>
                  }
                  key={review.id}
                >
                  <div className={styles.editorWrapper}>
                    <MonacoEditor
                      height="300px"
                      defaultLanguage={review.language}
                      value={review.code}
                      theme='vs-dark'
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                      }}
                    />
                  </div>
                  <div className={styles.resultBox}>
                    <Title level={5}>Review Result</Title>
                    <Paragraph className={styles.paragraph}>{review.results}</Paragraph>
                  </div>
                  <Button type='primary'>Export</Button>
                </Collapse.Panel>
              ))}
            </Collapse>
          )}
        </div>
        <div className={`${styles.shape} ${styles.circle}`} />
        <div className={`${styles.shape} ${styles.square}`} />
        <div className={`${styles.shape} ${styles.triangle}`} />
      </div>
    </>
  );
}

export default SavedReviewsPage;