import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
console.log(process.env.GEMINI_API_KEY); // should not be undefined

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();

    if (!code || !language) {
      return NextResponse.json({ error: 'Missing code or language' }, { status: 400 });
    }

    const prompt = `
You are an expert in ${language}. Perform a code review on the following code and return a JSON array of issues:
[
  { "line": 1, "message": "Example issue message" },
  ...
]

Code:
${code}
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    const jsonString = text.slice(start, end + 1);
    const violations = JSON.parse(jsonString);

    return NextResponse.json({ violations });
  } catch (error) {
    console.error('Gemini AI Review Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
