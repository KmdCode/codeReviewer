import ts from 'typescript';

export interface Violation {
  message: string;
  line: number;
}

export function analyzeCode(code: string): Violation[] {
  const violations: Violation[] = [];
  const sourceFile = ts.createSourceFile('file.ts', code, ts.ScriptTarget.Latest, true);

  const getLine = (node: ts.Node) => sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;

  const checkNode = (node: ts.Node) => {
    // 1. Class PascalCase
    if (ts.isClassDeclaration(node) && node.name) {
      const name = node.name.text;
      if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
        violations.push({ message: `Class name "${name}" should be PascalCase.`, line: getLine(node) });
      }
    }

    // 2. Const UPPER_CASE
    if (ts.isVariableStatement(node)) {
      const isConst = node.declarationList.flags & ts.NodeFlags.Const;
      node.declarationList.declarations.forEach((decl) => {
        const name = (decl.name as ts.Identifier).text;
        if (isConst && !/^([A-Z0-9_]+)$/.test(name)) {
          violations.push({ message: `Constant "${name}" should be in ALL_UPPER_CASE.`, line: getLine(decl) });
        }
      });
    }

    // 3. Private _camelCase
    if (ts.isPropertyDeclaration(node) && node.modifiers?.some(m => m.kind === ts.SyntaxKind.PrivateKeyword)) {
      const name = (node.name as ts.Identifier).text;
      if (!/^_[a-z][A-Za-z0-9]*$/.test(name)) {
        violations.push({ message: `Private variable "${name}" should start with "_" and be camelCase.`, line: getLine(node) });
      }
    }

    // 4. Functions
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node)
    ) {
      const name = (node.name as ts.Identifier)?.text;
      if (name && !/^[a-z][A-Za-z0-9]*$/.test(name)) {
        violations.push({ message: `Function name "${name}" should be camelCase.`, line: getLine(node) });
      }

      if (!node.type) {
        violations.push({ message: `Function "${name || '<anonymous>'}" is missing return type.`, line: getLine(node) });
      }

      node.parameters.forEach((param) => {
        if (!param.type) {
          const paramName = (param.name as ts.Identifier).text;
          violations.push({ message: `Parameter "${paramName}" is missing a type.`, line: getLine(param) });
        }
      });
    }

    ts.forEachChild(node, checkNode);
  };

  checkNode(sourceFile);
  return violations;
}
