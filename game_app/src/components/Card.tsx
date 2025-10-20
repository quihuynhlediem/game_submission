import React from 'react'

export const Card: React.FC<{ children?: React.ReactNode, className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={["rounded-2xl p-4 neon-card", className].join(' ')}>
      {children}
    </div>
  )
}
