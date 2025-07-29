import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  container: css`
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa, #e4ebf5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  `,
  card: css`
    width: 100%;
    max-width: 420px;
    padding: 2.5rem 2rem;
    border-radius: 16px;
    background: #ffffffcc; /* semi-transparent white */
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    border: 1px solid #f0f0f0;
    backdrop-filter: blur(6px);
    text-align: center;
  `,
  title: css`
    margin-bottom: 1.5rem;
    font-weight: 700;
  `,
  form: css`
    text-align: left;
    margin-top: 1rem;
  `,
  submitBtn: css`
    background-color: #fa541c;
    border-color: #fa541c;
    height: 40px;
    font-weight: 600;
    width: 100%;
  `,
  footerText: css`
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: #666;
  `,
}));