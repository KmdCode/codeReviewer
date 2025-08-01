import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(() => ({
  container: css`
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa, #e4ebf5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem 2rem;
    position: relative;
    overflow: hidden;
    text-align: center;
  `,
  content: css`
    max-width: 40rem;
    z-index: 2;
  `,
  title: css`
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
  `,
  paragraph: css`
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    color: #595959;
  `,
  button: css`
    height: 2.75rem;
    padding: 0 1.5rem;
    font-weight: 600;
    font-size: 1rem;
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