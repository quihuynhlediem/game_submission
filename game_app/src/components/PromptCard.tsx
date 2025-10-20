import React from 'react'
import { Card as CardType } from '../data/types'
import { estimateTokens } from '../utils/tokenUtils'

const typeBorder: Record<string, string> = {
  task: 'border-l-4 border-blue-500',
  persona: 'border-l-4 border-violet-500',
  context: 'border-l-4 border-emerald-500',
  format: 'border-l-4 border-orange-500',
  vague: 'border-l-4 border-red-500'
}

export const PromptCard: React.FC<{
  card: CardType
  inBench?: boolean
  onAdd?: (c: CardType) => void
  onRemove?: (c: CardType) => void
}> = ({ card, inBench = false, onAdd, onRemove }) => {
  return (
    <div className={["bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-start justify-between neon-glow", typeBorder[card.type]].join(' ')}>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold">{card.title}</div>
          <div className="text-xs text-gray-300 bg-gray-900/20 px-2 py-0.5 rounded">{card.tag}</div>
          {card.quality === 'wrong' && (
            <div className="text-xs text-red-300 bg-red-900/30 px-2 py-0.5 rounded">WRONG</div>
          )}
        </div>
        <div className="text-xs text-gray-400 mt-1">{card.text}</div>
      </div>
      <div className="ml-3 flex flex-col items-end gap-2">
        <div className="text-xs px-2 py-0.5 rounded bg-gray-700">{estimateTokens(card.text)} token</div>
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
