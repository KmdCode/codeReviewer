'use client';
import { useEffect } from 'react';
import { Collapse, Typography, Tag, Button, Empty } from 'antd';
import { useStyles } from './style/style';
import MonacoEditor from '@monaco-editor/react';
import Navbar from '@/components/navbar/Navbar';
import { useAuthActions } from '@/providers/auth-providers';
import { useReviewActions, useReviewState } from '@/providers/review-provider';
import { IReview } from '@/providers/review-provider/context';

const { Title, Paragraph } = Typography;

const SavedReviewsPage = () => {
  const { styles } = useStyles();
  const { getDeveloperProfile } = useAuthActions();
  const { getSavedReviews } = useReviewActions();
  const { myReviews } = useReviewState();

  useEffect(() => {
    getDeveloperProfile();
  }, []);

  useEffect(() => {
    getSavedReviews();
    console.log("review");
  }, []);

  const renderMeta = (review: IReview) => (
    <div className={styles.metaInfo}>
      <Tag color={review.language === 'csharp' ? 'blue' : 'volcano'}>
        {review.language.toUpperCase()}
      </Tag>
      <Tag color={review.reviewType === 'AI' ? 'green' : 'geekblue'}>
        {review.reviewType || 'AI'} Review
      </Tag>
      
      {review.date && <span className="date">{review.date}</span>}
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

          {!myReviews || myReviews.length === 0 ? (
            <Empty description="No saved reviews yet">
              <Button type="primary" href="/developer/review">
                Run your first review
              </Button>
            </Empty>
          ) : (
            <Collapse accordion className={styles.collapse}>
              {myReviews.map((review) => (
                <Collapse.Panel
                  header={
                    <div className={styles.reviewHeader}>
                      <strong>{review.reviewName}</strong>
                      {renderMeta(review)}
                    </div>
                  }
                  key={review.id || review.reviewName}
                >
                  <div className={styles.editorWrapper}>
                    <MonacoEditor
                      height="300px"
                      defaultLanguage={review.language}
                      value={review.code}
                      theme="vs-dark"
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
                    <Paragraph className={styles.paragraph}>
                      {review.reviewResults?.length ? (
                        review.reviewResults.map((res, index) => (
                          <div key={index}>
                            <strong>Line {res.line}:</strong> {res.message}
                          </div>
                        ))
                      ) : (
                        <p>No review results found.</p>
                      )}
                    </Paragraph>
                  </div>

                  <Button type="primary">Export</Button>
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
};

export default SavedReviewsPage;
