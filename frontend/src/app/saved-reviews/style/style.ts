import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  page: css`
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #f5f7fa, #e4ebf5);
    padding: 4rem 1rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  `,
  content: css`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  headerSection: css`
    text-align: center;
    margin-bottom: 2rem;
  `,
  collapse: css`
    width: 100%;
    background-color: #fff;
    border-radius: 0.75rem;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  `,
  reviewHeader: css`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
  metaInfo: css`
    display: flex;
    gap: 1rem;
    align-items: center;

    .date {
      color: #999;
      font-size: 0.875rem;

      @media (max-width: 768px) {
        display: none;
      }
    }
  `,
  editorWrapper: css`
    border: 1px solid #f0f0f0;
    border-radius: 0.5rem;
    overflow: hidden;
    margin: 0.5rem;
    
  `,
  resultBox: css`
    margin-top: 1.5rem;
    background: #ffffff;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 100%;
    font-family: 'Courier New', Courier, monospace;
  `,
  paragraph: css `
    font-family: 'Courier New', Courier, monospace;
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
    top: 80px;
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
