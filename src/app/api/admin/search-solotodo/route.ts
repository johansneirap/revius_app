import { verifyAdmin } from '@/lib/admin-auth'
import { searchProducts } from '@/lib/solotodo'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { error } = await verifyAdmin()
  if (error) return error

  const { searchParams } = request.nextUrl
  const q = searchParams.get('q')?.trim()
  const categoryId = searchParams.get('categoryId')

  if (!q) {
    return NextResponse.json({ error: 'Se requiere q' }, { status: 400 })
  }

  const products = await searchProducts(
    q,
    categoryId ? parseInt(categoryId, 10) : undefined,
  )
  return NextResponse.json(products)
}
