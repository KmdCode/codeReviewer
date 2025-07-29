'use client';
import { Button, Typography } from 'antd';
// import Image from 'next/image';
import { useStyles } from './style';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* <Image
          src="/images/logo2.jpg"
          alt="FusionCodeReview"
          width={160}
          height={160}
          priority
        /> */}
        <Title className={styles.title}>Fusion Code Review</Title>
        <Paragraph className={styles.paragraph}>
          Instant AI and Static feedback for your code. Improve quality, catch bugs, and learn better.
        </Paragraph>

        <Link href="/signup">
          <Button
            type="primary"
            className={styles.button}
            size="large"
            href="/review"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;