import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(() => ({
  container: css`
    min-height: 100vh;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #f5f7fa, #e4ebf5);
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
  pageTitle: css`
    text-align: center;
    font-size: 2rem;
    font-weight: 600;
  `,
  header: css`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: flex-start;
    align-items: center;
  `,
  languageSelector: css`
    min-width: 12rem;
  `,
  actions: css`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    margin-top: 1rem;
  `,
  results: css`
    background: #ffffff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.05);
  `,
  resultBox: css`
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 0.75rem;
    margin-top: 1rem;
    color: #000;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.95rem;
    white-space: pre-wrap;
  `,
  resultActions: css`
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  `,
  editorWrapper: css`
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: 0 0.1rem 0.3rem rgba(0, 0, 0, 0.05);
`,

themeSelector: css`
  min-width: 12rem;
`,

}));
