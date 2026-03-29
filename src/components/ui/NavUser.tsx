import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from './SignOutButton'

export default async function NavUser() {
  // Forzar lectura de cookies en cada request (sin caché)
  await cookies()

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <Link
        href="/login"
        className="hover:text-primary hidden text-sm font-medium text-slate-600 sm:block dark:text-slate-400"
      >
        Ingresar
      </Link>
    )
  }

  // Obtener perfil desde public.users
  const { data: profile } = await supabase
    .from('users')
    .select('name, avatar_url, level')
    .eq('id', user.id)
    .single()

  const displayName = profile?.name || user.email?.split('@')[0] || 'Usuario'

  const avatarUrl: string | null =
    (profile?.avatar_url as string | null) ??
    (user.user_metadata?.avatar_url as string | null) ??
    null

  const initials = displayName
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="group relative hidden sm:block">
      <button className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={displayName}
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-white">
            {initials}
          </span>
        )}
        <span className="max-w-[120px] truncate text-sm font-medium text-slate-700 dark:text-slate-300">
          {displayName}
        </span>
        <span className="material-icons text-sm text-slate-400">expand_more</span>
      </button>

      {/* Dropdown */}
      <div className="invisible absolute right-0 top-full z-50 mt-2 w-52 origin-top-right scale-95 rounded-2xl border border-slate-200 bg-white py-1 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:scale-100 group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <p className="truncate text-xs font-bold text-slate-500">{user.email}</p>
        </div>
        <Link
          href="/perfil"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="material-icons text-base">person</span>
          Mi perfil
        </Link>
        <Link
          href="/escribir-resena"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="material-icons text-base">edit</span>
          Escribir reseña
        </Link>
        <div className="mt-1 border-t border-slate-100 pt-1 dark:border-slate-800">
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
