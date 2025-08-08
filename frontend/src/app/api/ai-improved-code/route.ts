// app/api/ai-improve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const POST = async(req: NextRequest) => {
  try {
    const { code, language } = await req.json();

    if (!code || !language) {
      return NextResponse.json({ error: 'Missing code or language' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
Improve the following ${language} code for:
- Readability
- Performance
- Maintainability

Also be sure to make sure that the following rules are followed:
- Class PascalCase
- Const UPPER_CASE (except for TypeScript and JavaScript)
- Private _camelCase
- Functions: 
    -camel case (Pascal for c#)
    - must declare return type

Return only the improved code with comments of improvements, without explanations.

Code:
\`\`\`${language}
${code}
\`\`\`
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const improvedCode = response.text().replace(/```[\s\S]*?\n|\n```/g, '');

    return NextResponse.json({ improvedCode });
  } catch (error) {
    console.error('AI Improve error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
