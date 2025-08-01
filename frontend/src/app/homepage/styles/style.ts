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
    margin-top: 2rem;
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
    margin-top: 1rem;
    text-align: left;
    box-shadow: 0 0.375rem 1rem rgba(0, 0, 0, 0.06);
    padding: 1.25rem;
  `,
  shape: css`
    position: absolute;
    opacity: 0.1;
    z-index: 1;
  `,
  circle: css`
    width: 120px;
    height: 120px;
    background: #13c2c2;
    border-radius: 50%;
    top: 20px;
    left: 30px;
  `,
  square: css`
    width: 100px;
    height: 100px;
    background: #722ed1;
    top: 60%;
    left: 5%;
    transform: rotate(15deg);
  `,
  triangle: css`
    width: 0;
    height: 0;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    border-bottom: 100px solid #fa8c16;
    bottom: 80px;
    right: 50px;
  `,
  rectangle: css`
    width: 160px;
    height: 40px;
    background: #2f54eb;
    top: 80%;
    right: 20%;
    transform: rotate(-10deg);
  `,
}));
