'use client'

import { useState } from 'react'
import Link from 'next/link'

type SubItem = { label: string; slug: string }

type Props = {
  label: string
  href: string
  items: SubItem[]
  active?: boolean
}

export default function NavDropdown({ label, href, items, active }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className={
          active
            ? 'border-primary text-primary flex items-center gap-0.5 border-b-2 py-5'
            : 'hover:text-primary flex items-center gap-0.5 py-5 text-slate-600 transition-colors dark:text-slate-400'
        }
      >
        {label}
        <span className="material-icons text-[14px] opacity-60">expand_more</span>
      </Link>

      {open && items.length > 0 && (
        <div className="absolute top-full left-0 z-50 min-w-[180px] overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/categoria/${item.slug}`}
              className="hover:text-primary hover:bg-slate-50 block px-4 py-2.5 text-sm text-slate-700 transition-colors dark:text-slate-300 dark:hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
