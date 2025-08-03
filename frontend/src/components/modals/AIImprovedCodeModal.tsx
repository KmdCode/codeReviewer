'use client';
import { Modal } from 'antd';
import Editor from '@monaco-editor/react';

interface AIImprovedCodeModalProps {
  open: boolean;
  onClose: () => void;
  code: string;
  language: string;
  editorTheme?: string;
}

const AIImprovedCodeModal = ({open, onClose, code, language,editorTheme = 'vs-dark',}: AIImprovedCodeModalProps) => {
    
  return (
    <Modal
      title="AI Suggested Code Improvement"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      
    >
      <Editor
        height="400px"
        defaultLanguage={language === 'csharp' ? 'csharp' : 'typescript'}
        value={code}
        theme={editorTheme}
        options={{
          readOnly: true,
          fontSize: 14,
          minimap: { enabled: false },
          padding: { top: 16, bottom: 16 },
        }}
      />
    </Modal>
  );
};

export default AIImprovedCodeModal;
