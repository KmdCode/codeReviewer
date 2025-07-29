import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  container: css`
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa, #e4ebf5);
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  `,
  section: css`
    width: 100%;
    max-width: 68.75rem; /* 1100px */
    text-align: center;
    padding: 0 1rem;
  `,
  demoBtn: css`
    background-color: #fa541c;
    border-color: #fa541c;
    margin-top: 1.5rem;
    font-size: 1rem;
    padding: 0.75rem 2rem;
    height: auto;
  `,
  screenshots: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  `,
  screenshot: css`
    border-radius: 0.75rem;
    overflow: hidden;
    max-width: 31.25rem; /* 500px */
    width: 100%;
    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.05);
  `,
  benefitCard: css`
    border-radius: 0.75rem;
    height: 100%;
    text-align: left;
    box-shadow: 0 0.375rem 1rem rgba(0, 0, 0, 0.06);
    padding: 1.25rem;
  `,
}));
