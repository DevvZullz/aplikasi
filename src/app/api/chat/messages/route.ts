import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const postSchema = z.object({ conversationId: z.string().uuid(), content: z.string().min(1).max(2000) });

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = postSchema.safeParse(await req.json());
  if (!body.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

  // Pastikan user adalah participant conversation tsb (otorisasi)
  const isParticipant = await db.conversationParticipant.findUnique({
    where: { conversationId_userId: { conversationId: body.data.conversationId, userId: (session.user as any).id } },
  });
  if (!isParticipant) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const message = await db.message.create({
    data: {
      conversationId: body.data.conversationId,
      senderId: (session.user as any).id,
      content: body.data.content,
    },
  });

  return NextResponse.json(message, { status: 201 });
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');
  const cursor = searchParams.get('cursor'); // pagination cursor-based

  if (!conversationId) return NextResponse.json({ error: 'conversationId wajib diisi' }, { status: 400 });

  const messages = await db.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'desc' },
    take: 30,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  return NextResponse.json(messages);
}
