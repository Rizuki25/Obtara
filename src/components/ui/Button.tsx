import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'utility'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  full?: boolean
}

export function Button({
  children,
  variant = 'utility',
  full = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button-${variant}${full ? ' button-full' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
}
