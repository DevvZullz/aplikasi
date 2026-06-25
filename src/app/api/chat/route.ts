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

    // Placeholder response - ganti dengan OpenAI API jika ada key
    const reply = `Anda mengatakan: "${parsed.data.message}". Ini adalah respons placeholder. Integrasikan OpenAI API untuk chat yang lebih smart.`;

    return NextResponse.json({ reply }, { status: 200 });
  } catch (err: any) {
    console.error('Chat error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
