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
  spinnerWrapper: css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; // or 100% if replacing the full card
  width: 100%;
`,
formWrapper: css`
  position: relative;
`,

spinnerOverlay: css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.6); /* light overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  border-radius: 1.5rem;
`,

}));