import { auth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [usersRes, productsRes] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact' }),
      supabase.from('products').select('id', { count: 'exact' })
    ]);

    return NextResponse.json({
      totalUsers: usersRes.count || 0,
      totalProducts: productsRes.count || 0
    });
  } catch (err: any) {
    console.error('Admin stats error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
