import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const POST = async (req: NextRequest) => {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const systemInstruction = `
You are a helpful AI assistant that only answers questions related to programming, software development, or technology.
If the user's question is outside that scope — such as about relationships, entertainment, or personal advice — politely respond that you can only assist with programming and tech-related topics.
`;

    const fullPrompt = `${systemInstruction.trim()}\n\nUser: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error('Gemini error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
};
