import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(() => ({
  page: css`
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa, #e4ebf5);
    display: flex;
    align-items: center;
    justify-content: center;
    
  `,
  container: css`
    width: 100%;
    max-width: 800px;
    background: #ffffff;
    border-radius: 1.5rem;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  title: css`
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
  `,
  chatContainer: css`
    max-height: 50vh;
    min-height: 50vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-right: 0.5rem;

    /* Custom scrollbar */
    scrollbar-width: thin;
    scrollbar-color: #fa541c #ffffff;

    &::-webkit-scrollbar {
      width: 0.6rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #fa541c;
      border-radius: 3rem;
    }

    &::-webkit-scrollbar-track {
      background-color: #ffffff;
    }
  `,
  userMsg: css`
    align-self: flex-end;
    background: #fa541c;
    color: white;
    border-radius: 1rem;
    padding: 1rem;
    max-width: 80%;
    white-space: pre-wrap;
  `,
  aiMsg: css`
    align-self: flex-start;
    background: #f0f0f0;
    color: #000000;
    border-radius: 1rem;
    padding: 1rem;
    max-width: 80%;
    white-space: pre-wrap;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  `,
  inputContainer: css`
    display: flex;
    gap: 0.75rem;
    align-items: flex-end;
  `,
  textArea: css`
    flex: 1;
    color: #000000;
  `,
  sendBtn: css`
    width: 6rem;
    background-color: #fa541c;
    border-color: #fa541c;
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
