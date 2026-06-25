import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const schema = z.object({ type: z.enum(['image', 'video']), prompt: z.string().min(1).max(500) });

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

    // Placeholder - ganti dengan Replicate/Stability AI API jika ada key
    const mockUrl = 'https://images.unsplash.com/photo-1579546389341-22a08ce3a460?w=500&h=500';

    return NextResponse.json({ 
      url: mockUrl,
      type: parsed.data.type,
      status: 'completed' 
    }, { status: 200 });
  } catch (err: any) {
    console.error('Create error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
