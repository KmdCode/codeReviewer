'use client';
import { Modal } from 'antd';
import Editor from '@monaco-editor/react';
import { useStyles } from './style';

interface AIImprovedCodeModalProps {
  open: boolean;
  onClose: () => void;
  code: string;
  userCode: string;
  language: string;
  editorTheme?: string;
}

const AIImprovedCodeModal = ({ open, onClose, userCode, code, language, editorTheme = 'vs-dark', }: AIImprovedCodeModalProps) => {

  const { styles } = useStyles();

  return (
    <Modal
      title="AI Suggested Code Improvements"
      open={open}
      onCancel={onClose}
      footer={null}
      width={`80%`}

    >
      <div className={styles.reviewedCode}>
        <div className={styles.editorContainer}>
          <h1>Your code</h1>
          <Editor
            height="400px"
            defaultLanguage={language === 'csharp' ? 'csharp' : 'typescript'}
            value={userCode}
            theme={editorTheme}
            className={styles.editor}
            options={{
              readOnly: true,
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>
        <div className={styles.editorContainer}>
          <h1>AI Code</h1>
          <Editor
            height="400px"
            defaultLanguage={language === 'csharp' ? 'csharp' : 'typescript'}
            value={code}
            theme={editorTheme}
            className={styles.editor}
            options={{
              readOnly: true,
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>
      </div>



    </Modal>
  );
};

export default AIImprovedCodeModal;
