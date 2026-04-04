import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

type AdminCheckOk = { user: User; error: null }
type AdminCheckFail = { user: null; error: NextResponse }

export async function verifyAdmin(): Promise<AdminCheckOk | AdminCheckFail> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      user: null,
      error: NextResponse.json({ error: 'No autorizado' }, { status: 401 }),
    }
  }

  if (!isAdminEmail(user.email)) {
    return {
      user: null,
      error: NextResponse.json({ error: 'Acceso denegado' }, { status: 403 }),
    }
  }

  return { user, error: null }
}

export function isAdminEmail(email: string | undefined | null): boolean {
  const adminEmail = process.env.ADMIN_EMAIL
  return !!adminEmail && email === adminEmail
}
