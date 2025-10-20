import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { Button } from '../components/Button'

export const ChatPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  // expecting state: { prompt, evaluation }
  const state = (location.state || {}) as any
  const prompt: string = state.prompt || ''
  const evaluation: any = state.evaluation || null

  // simulate AI response based on evaluation.status and presence of wrong cards
  const [aiResponse] = React.useState(() => {
    if (!evaluation) return 'No evaluation provided.'
    if (evaluation.status === 'success') return 'AI: Here is a polished output matching your prompt. (simulated)'
    if (evaluation.reason && evaluation.reason.some((r: string) => r.includes('Missing'))) return 'AI: The prompt is missing required info; response is incomplete.'
    return 'AI: The prompt is unstable or produced low-quality output.'
  })

  const totalTokens = evaluation ? evaluation.total : 0

  const onRetry = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(180deg,#020204 0%, #07101a 70%)' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl heading-serif text-white mb-4">Craft Result</h2>
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <div className="text-sm text-gray-300 mb-2"><strong>Built Prompt</strong></div>
            <pre className="whitespace-pre-wrap text-sm text-gray-200 bg-gray-900 p-3 rounded">{prompt || '<empty prompt>'}</pre>
            <div className="mt-3 flex justify-between items-center">
              <div className="text-sm text-gray-300">Total tokens: <strong>{totalTokens}</strong></div>
              <div className="flex gap-2">
                <Button onClick={onRetry} className="bg-violet-500">Back to Bench</Button>
                <Link to="/chapters" className="px-3 py-2 rounded-2xl border border-gray-700 text-violet-300">Chapters</Link>
              </div>
            </div>
          </Card>

          <Card>
            <div className="text-sm text-gray-300 mb-2"><strong>AI Response (simulated)</strong></div>
            <div className="text-sm text-gray-200 p-3 bg-gray-900 rounded">{aiResponse}</div>
            <div className="mt-3 text-sm text-gray-400">Evaluation: {evaluation ? evaluation.status : 'unknown'}</div>
            {evaluation && evaluation.status !== 'success' && (
              <div className="mt-2 text-sm text-yellow-300">Tip: {evaluation.tip}</div>
            )}
            {evaluation && evaluation.status === 'success' && (
              <div className="mt-2 text-sm text-emerald-300">Nice work — this prompt is optimized.</div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
