import { NextRequest, NextResponse } from 'next/server';
import { getAiReview } from '@/utils/reviews/ai-review';


export const POST = async (req: NextRequest) => {

  try {
    const { code, language } = await req.json();

    if (!code || !language) {
      return NextResponse.json({ error: 'Missing code or language' }, { status: 400 });
    }

    const violations = await getAiReview(code, language);

    return NextResponse.json({ violations });
    
  } catch (error) {
    console.error('Gemini AI Review Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
