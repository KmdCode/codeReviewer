import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const getAiReview = async (code: string, language: string) => {


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

    return JSON.parse(jsonString);
}
