import { auth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const createSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  description: z.string().optional()
});

export async function GET() {
  try {
    const { data: products, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ products: products || [] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ products: [] });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await req.json();
    const parsed = createSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

    const { data, error } = await supabase.from('products').insert({
      name: parsed.data.name,
      price: parsed.data.price,
      description: parsed.data.description
    }).select().single();

    if (error) throw error;
    return NextResponse.json({ product: data }, { status: 201 });
  } catch (err: any) {
    console.error('Create product error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
