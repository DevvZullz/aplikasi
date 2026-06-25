import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const schema = z.object({ message: z.string().min(1).max(1000) });

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return NextResponse.json({ 
        reply: 'Sistem Chat AI belum dikonfigurasi. Tambahkan OPENAI_API_KEY di environment variables.'
      }, { status: 200 });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: parsed.data.message }],
        max_tokens: 500,
        temperature: 0.7,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI error:', data);
      return NextResponse.json({ 
        reply: 'Terjadi kesalahan dengan layanan AI. Coba lagi nanti.'
      }, { status: 200 });
    }

    const reply = data.choices?.[0]?.message?.content || 'Maaf, tidak ada respons dari AI.';

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err: any) {
    console.error('Chat error:', err);
    return NextResponse.json({ 
      reply: 'Terjadi kesalahan server: ' + (err?.message || 'Unknown error')
    }, { status: 200 });
  }
}
