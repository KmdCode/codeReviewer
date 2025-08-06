'use client';
import React, { useEffect } from 'react';
import { Typography, Button, Row, Col, Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useStyles } from './styles/style';
import Navbar from '@/components/navbar/Navbar';
import { useAuthActions } from '@/providers/auth-providers';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { styles } = useStyles();
  const { getDeveloperProfile } = useAuthActions();


  useEffect(() => {
    getDeveloperProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <section className={styles.section}>

        </section>
        <section className={styles.section}>
          <Title level={3}>Why Choose FusionCodeReview?</Title>
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Card className={styles.benefitCard} bordered={false}>
                <Title level={4}>AI-Powered Feedback</Title>
                <Paragraph>
                  Understand not just what’s wrong, but why — with context-aware suggestions.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className={styles.benefitCard} bordered={false}>
                <Title level={4}>Static Analysis</Title>
                <Paragraph>
                  Get rule-based, consistent code checks even without AI.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className={styles.benefitCard} bordered={false}>
                <Title level={4}>Beginner Friendly</Title>
                <Paragraph>
                  Learn and grow — this tool teaches you good coding habits along the way.
                </Paragraph>
              </Card>
            </Col>
          </Row>
          <Button type="primary" size="large" className={styles.demoBtn}>
            <Link href="/review">Review Now</Link>
          </Button>
        </section>

        <section className={styles.section}>
          <Title level={3}>Demo</Title>
          <div className={styles.screenshots}>
            <div className={styles.screenshot}>
              <Image
                src="/images/preview1.jpg"
                alt="Review Page Screenshot"
                width={500}
                height={300}
                layout="responsive"
              />
            </div>
            <div className={styles.screenshot}>
              <Image
                src="/images/preview2.jpg"
                alt="Result Page Screenshot"
                width={500}
                height={300}
                layout="responsive"
              />
            </div>
          </div>
        </section>
        <div className={`${styles.shape} ${styles.circle}`} />
        <div className={`${styles.shape} ${styles.square}`} />
        <div className={`${styles.shape} ${styles.triangle}`} />
        <div className={`${styles.shape} ${styles.rectangle}`} />
      </div>
    </>
  );
}

export default HomePage;