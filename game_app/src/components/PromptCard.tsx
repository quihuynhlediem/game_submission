import React from 'react'
import { Card as CardType } from '../data/types'
import { estimateTokens } from '../utils/tokenUtils'

const typeStyles: Record<string, { border: string; tag: string; text: string }> = {
  task: {
    border: 'border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]',
    tag: 'bg-blue-400/10 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]',
    text: 'text-blue-300'
  },
  persona: {
    border: 'border border-violet-400/30 shadow-[0_0_15px_rgba(167,139,250,0.2)]',
    tag: 'bg-violet-400/10 text-violet-300 shadow-[0_0_10px_rgba(167,139,250,0.3)]',
    text: 'text-violet-300'
  },
  context: {
    border: 'border border-emerald-400/30 shadow-[0_0_15px_rgba(52,211,153,0.2)]',
    tag: 'bg-emerald-400/10 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.3)]',
    text: 'text-emerald-300'
  },
  format: {
    border: 'border border-orange-400/30 shadow-[0_0_15px_rgba(251,146,60,0.2)]',
    tag: 'bg-orange-400/10 text-orange-300 shadow-[0_0_10px_rgba(251,146,60,0.3)]',
    text: 'text-orange-300'
  }
}

export const PromptCard: React.FC<{
  card: CardType
  inBench?: boolean
  onAdd?: (c: CardType) => void
  onRemove?: (c: CardType) => void
}> = ({ card, inBench = false, onAdd, onRemove }) => {
  // Default to task style if type is not found
  const style = typeStyles[card.type] || typeStyles['task'];

  return (
    <div className={`bg-gray-800/90 p-3 rounded-lg flex items-start justify-between backdrop-blur-sm transition-all duration-200 ${style.border}`}>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className={`text-sm font-semibold ${style.text}`}>{card.title}</div>
          <div className={`text-xs px-2 py-0.5 rounded transition-all duration-200 ${style.tag}`}>{card.tag}</div>
        </div>
        <div className="text-xs text-gray-400 mt-1">{card.text}</div>
      </div>
      <div className="ml-3 flex flex-col items-end gap-2">
        <div className="text-xs px-2 py-0.5 rounded bg-gray-700">{estimateTokens(card.text)} tokens</div>
        {inBench ? (
          <button className="text-xs text-gray-300 px-2 py-1 bg-transparent rounded" onClick={() => onRemove && onRemove(card)}>Remove</button>
        ) : (
          <button className="text-xs text-gray-300 px-2 py-1 bg-transparent rounded" onClick={() => onAdd && onAdd(card)}>Add</button>
        )}
      </div>
    </div>
  )
}

export default PromptCard
