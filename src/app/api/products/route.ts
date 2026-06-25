import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, price, description, image_url, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ products: products || [] });
  } catch (err) {
    console.error('Get products error:', err);
    return NextResponse.json({ products: [] });
  }
}
