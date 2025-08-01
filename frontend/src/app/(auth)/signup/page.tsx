'use client';
import { Button, Form, Input, Typography, Spin } from 'antd';
import type { FormProps } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useStyles } from './styles/styles';
import { useAuthActions, useAuthState } from '@/providers/auth-providers';
import { IUser } from '@/providers/auth-providers/context';
import Link from 'next/link';

const { Title } = Typography;

const SignupPage: React.FC = () => {

  const { styles } = useStyles();
  const { registerDeveloper } = useAuthActions();
  const { isError, isPending } = useAuthState();

  if (isError) {
    return (<div>Registration Error</div>);
  }

  const onFinish: FormProps<IUser>['onFinish'] = (values) => {
    const newUser: IUser = {
      name: values.name,
      surname: values.surname,
      userName: values.userName,
      email: values.email,
      password: values.password,
    };
    registerDeveloper(newUser);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Title level={3} className={styles.title}>
          Create Your Account
        </Title>

        <div>
          <div className={styles.formWrapper}>
            {isPending && (
              <div className={styles.spinnerOverlay}>
                <Spin size="large" />
              </div>
            )}
            <div></div>
            <Form
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input
                  size="large"
                  placeholder="name"
                  style={{ color: '#000000' }}
                  prefix={<UserOutlined style={{ color: '#999', paddingRight: '0.5rem' }} />}
                />
              </Form.Item>
              <Form.Item
                name="surname"
                rules={[{ required: true, message: 'Please enter your surname' }]}
              >
                <Input
                  size="large"
                  placeholder="surname"
                  style={{ color: '#000000' }}
                  prefix={<UserOutlined style={{ color: '#999', paddingRight: '0.5rem' }} />}
                />
              </Form.Item>
              <Form.Item
                name="userName"
                rules={[{ required: true, message: 'Please enter your username' }]}
              >
                <Input
                  size="large"
                  placeholder="Username"
                  style={{ color: '#000000' }}
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
                  style={{ color: '#000000' }}
                  prefix={<MailOutlined style={{ color: '#999', paddingRight: '0.5rem' }} />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter a password' }]}
              >
                <Input.Password
                  size="large"
                  placeholder="••••••••"
                  style={{ color: '#000000' }}
                  prefix={<LockOutlined style={{ color: '#999', paddingRight: '0.5rem' }} />}
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

      </div>
      <div className={`${styles.shape} ${styles.circle}`} />
      <div className={`${styles.shape} ${styles.square}`} />
      <div className={`${styles.shape} ${styles.triangle}`} />
      <div className={`${styles.shape} ${styles.rectangle}`} />
    </div>
  );
}

export default SignupPage;