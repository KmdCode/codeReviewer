'use client';
import { Button, Form, Input, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useStyles } from '../signup/styles/styles';
import Link from 'next/link';

const { Title } = Typography;


const SignInPage = () => {
  const { styles } = useStyles();

  const handleSubmit = () => {
    console.log('Sign Up Data:') 
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Title level={3} className={styles.title}>
          Login to your Account
        </Title>

        <Form
          layout="vertical"
          className={styles.form}
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email address' },
            ]}
          >
            <Input
              size="large"
              placeholder="username or email"
              style={{ color: '#000000'}}
              prefix={<MailOutlined style={{ color: '#999', paddingRight: '0.5rem'}}/>}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter a password' }]}
          >
            <Input.Password
              size="large"
              placeholder="••••••••"
              style={{ color: '#000000'}}
              prefix={<LockOutlined style={{ color: '#999', paddingRight: '0.5rem' }}/>}
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" className={styles.submitBtn}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footerText}>
          Dont have an account?{' '}
          <Link href="/signup">
            <strong>Signup</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;