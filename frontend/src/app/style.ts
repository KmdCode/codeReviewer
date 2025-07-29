import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(() => ({
  container: css`
    min-height: 100vh;
    background-color: #fff;
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
  blob: css`
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.3;
  `,
  blob1: css`
    width: 400px;
    height: 400px;
    background: #fa541c;
    top: -100px;
    left: -100px;
  `,
  blob2: css`
    width: 300px;
    height: 300px;
    background: #1890ff;
    bottom: -80px;
    right: -80px;
  `,
}));