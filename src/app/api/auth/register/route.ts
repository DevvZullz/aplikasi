import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Input tidak valid' },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    // Check existing user
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Insert user via Supabase client
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password_hash: passwordHash,
        role: 'USER',
      })
      .select('id, name, email, role, created_at')
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Gagal membuat user: ' + (error?.message ?? 'Unknown') },
        { status: 500 }
      );
    }

    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    console.error('Register error:', err);
    return NextResponse.json(
      { error: 'Server error: ' + (err?.message ?? 'Unknown') },
      { status: 500 }
    );
  }
}
