// styles.ts
import { createStyles, css } from "antd-style";

export const useStyles = createStyles(() => ({
  reviewedCode: css`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    align-items: flex-start;
  `,
  editorContainer: css`
    flex: 1 1 100%;
    max-width: 100%;

    @media (min-width: 768px) {
      flex: 1 1 45%;
      max-width: 45%;
    }
  `,
  editor: css`
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  `,
}));
