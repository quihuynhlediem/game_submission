import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'ghost' }

export const Button: React.FC<ButtonProps> = ({ variant = 'default', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-colors focus:outline-none disabled:opacity-50'
  const variants: Record<string, string> = {
    default: ['neon-button px-4 py-2'].join(' '),
    ghost: 'bg-transparent text-gray-300 px-3 py-1'
  }
  return <button className={[base, variants[variant], className].join(' ')} {...props} />
}
