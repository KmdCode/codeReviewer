'use client';
import { Button, Form, Input, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useStyles } from './styles/styles';
import Link from 'next/link';

const { Title } = Typography;


export default function SignupPage() {
  const { styles } = useStyles();

  const handleSubmit = () => {
    console.log('Sign Up Data:') 
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Title level={3} className={styles.title}>
          Create Your Account
        </Title>

        <Form
          layout="vertical"
          className={styles.form}
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item       
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input
              size="large"
              placeholder="Username"
              prefix={<UserOutlined style={{ color: '#999', paddingRight: '0.5rem' }} />}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email address' },
            ]}
          >
            <Input
              size="large"
              placeholder="you@example.com"
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
              prefix={<LockOutlined style={{ color: '#999', paddingRight: '0.5rem' }}/>}
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" className={styles.submitBtn}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footerText}>
          Already have an account?{' '}
          <Link href="/login">
            <strong>Sign In</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}
