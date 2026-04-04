import { verifyAdmin } from '@/lib/admin-auth'
import { getCategories } from '@/lib/solotodo'
import { NextResponse } from 'next/server'

export async function GET() {
  const { error } = await verifyAdmin()
  if (error) return error

  const categories = await getCategories()
  return NextResponse.json(categories)
}
