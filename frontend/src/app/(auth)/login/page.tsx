'use client';
import { Button, Form, Input, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useStyles } from '../signup/styles/styles';
import type { FormProps } from "antd";
import { useAuthActions, useAuthState } from '@/providers/auth-providers';
import Link from 'next/link';
import { IUser } from '@/providers/auth-providers/context';

const { Title } = Typography;

const SignInPage = () => {
  const { styles } = useStyles();
  const { loginUser } = useAuthActions();
  const { isError } = useAuthState();

  const onFinish: FormProps<IUser>['onFinish'] = async (values) => {
    const newUser: IUser = {
      userNameOrEmailAddress: values.userNameOrEmailAddress,
      password: values.password
    };
    loginUser(newUser);

  };

  if (isError) {
    return (<div>Login Error</div>);
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Title level={3} className={styles.title}>
          Login to your Account
        </Title>

        <Form
          layout="vertical"
          className={styles.form}
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="userNameOrEmailAddress"
            rules={[
              { required: true, message: 'Please enter your email' }
            ]}
          >
            <Input
              size="large"
              placeholder="username or email"
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