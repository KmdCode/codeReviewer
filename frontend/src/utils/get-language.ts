const extToLangMap: Record<string, string> = {
  js: 'JavaScript',
  ts: 'TypeScript',
  jsx: 'JavaScript (React)',
  tsx: 'TypeScript (React)',
  py: 'Python',
  java: 'Java',
  cpp: 'C++',
  cs: 'C#',
  rb: 'Ruby',
  php: 'PHP',
  go: 'Go',
  rs: 'Rust',
  swift: 'Swift',
};

export const getLanguageFromFilename = (filename: string): string => {
  const ext = filename.split('.').pop()!;
  return extToLangMap[ext] || 'code';
};
