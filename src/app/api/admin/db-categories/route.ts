import { verifyAdmin } from '@/lib/admin-auth'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { error } = await verifyAdmin()
  if (error) return error

  const supabase = await createClient()
  const { data, error: dbError } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name')

  if (dbError) {
    return NextResponse.json({ error: 'Error al obtener categorías' }, { status: 500 })
  }

  return NextResponse.json(data ?? [])
}
