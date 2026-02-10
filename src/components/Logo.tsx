import Link from 'next/link'

export default function Logo({
    size = 'md',
    showText = true,
    className = '',
}: {
    size?: 'sm' | 'md' | 'lg'
    showText?: boolean
    className?: string
}) {
    const sizeClasses = {
        sm: {
            wrapper: 'h-8 w-8 rounded-md',
            icon: 'text-sm',
            text: 'text-lg',
        },
        md: {
            wrapper: 'h-10 w-10 rounded-lg',
            icon: 'text-base',
            text: 'text-xl',
        },
        lg: {
            wrapper: 'h-12 w-12 rounded-xl',
            icon: 'text-xl',
            text: 'text-2xl',
        },
    }

    const { wrapper, icon, text } = sizeClasses[size]

    return (
        <Link href="/" className={`flex items-center gap-2 group transition-opacity hover:opacity-90 ${className}`}>
            <div
                className={`flex ${wrapper} items-center justify-center bg-primary text-white shadow-sm transition-transform group-hover:scale-105`}
            >
                <span className={`material-icons ${icon}`}>rate_review</span>
            </div>
            {showText && (
                <span className={`${text} font-bold tracking-tight text-slate-900 dark:text-white`}>
                    Revius<span className="text-primary">.cl</span>
                </span>
            )}
        </Link>
    )
}
