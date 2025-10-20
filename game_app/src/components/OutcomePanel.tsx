import React from 'react'

export const OutcomePanel: React.FC<{
  outcome: any
  onNext?: () => void
}> = ({ outcome, onNext }) => {
  if (!outcome) return null
  return (
    <div className="mt-4 bg-gray-800 p-4 rounded-2xl border border-gray-700">
      <h3 className={outcome.status === 'success' ? 'text-emerald-400 text-xl' : 'text-red-400 text-xl'}>{outcome.status === 'success' ? 'Success!' : 'Failure!'}</h3>
      <div className="mt-2 text-sm text-gray-300">
        {outcome.reason && outcome.reason.map((r: string, i: number) => <div key={i}>{r}</div>)}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <div className="bg-gray-900/30 p-2 rounded">Input: {outcome.inputTokens}</div>
        <div className="bg-gray-900/30 p-2 rounded">Output: {outcome.outputTokens}</div>
        <div className="bg-gray-900/30 p-2 rounded">Total: {outcome.total}</div>
      </div>
      <div className="mt-3 text-sm text-gray-400">Tip: {outcome.tip}</div>
      {outcome.status === 'success' && (
        <div className="mt-4">
          <button className="w-full py-2 bg-violet-500 text-white rounded-md" onClick={onNext}>Next Order</button>
        </div>
      )}
    </div>
  )
}

export default OutcomePanel
