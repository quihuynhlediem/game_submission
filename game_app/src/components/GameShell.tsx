import React from 'react'
import { Card } from './Card'
import { Button } from './Button'
import { cards, levels } from '../data/seedData'
import { Card as CardType } from '../data/types'
import { estimateTokens } from '../utils/tokenUtils'
import { evaluate } from '../lib/evaluate'
import { PromptCard } from './PromptCard'
import { OutcomePanel } from './OutcomePanel'
import { useNavigate } from 'react-router-dom'

export const GameShell: React.FC<{ chapterId?: string, levelId?: string }> = ({ chapterId, levelId }) => {
  const navigate = useNavigate()
  const initialLevel = levelId && levels[levelId] ? levels[levelId] : levels['l1']
  const [currentLevel, setCurrentLevel] = React.useState(initialLevel)
  const [bench, setBench] = React.useState<CardType[]>([])
  const [available, setAvailable] = React.useState<CardType[]>(initialLevel.availableCardIds.map(id => cards[id]))
  const [outcome, setOutcome] = React.useState<any | null>(null)

  React.useEffect(() => {
    const l = levelId && levels[levelId] ? levels[levelId] : levels['l1']
    setCurrentLevel(l)
    // reset bench and available when level changes
    setBench([])
    setAvailable(l.availableCardIds.map(id => cards[id]))
    setOutcome(null)
  }, [levelId])

  const addToBench = (c: CardType) => {
    setBench(prev => [...prev, c])
    setAvailable(prev => prev.filter(x => x.id !== c.id))
    setOutcome(null)
  }

  const removeFromBench = (c: CardType) => {
    setBench(prev => prev.filter(x => x.id !== c.id))
    setAvailable(prev => [...available, c])
    setOutcome(null)
  }

  const inputTokens = bench.map(b => estimateTokens(b.text)).reduce((a, b) => a + b, 0)

  const craft = () => {
    const r = evaluate(currentLevel, bench)
    setOutcome(r)
    // build prompt text (concatenate bench in order)
    const builtPrompt = bench.map(b => b.text).join('\n\n')
    // navigate to chat page with state
    navigate('/chat', { state: { prompt: builtPrompt, evaluation: r, levelId: currentLevel.id } })
  }

  const onNext = () => {
    // find next level in the chapter
    const ch = chapterId || 'ch1'
    const levelIds = Object.values(levels).filter(l => l.id).map(l => l.id)
    const idx = levelIds.indexOf(currentLevel.id)
    if (idx >= 0 && idx < levelIds.length - 1) {
      const next = levelIds[idx + 1]
      navigate(`/play/${ch}/${next}`)
    } else {
      navigate('/chapters')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card className="bg-gray-800">
            <h2 className="text-2xl font-bold mb-2">The Order</h2>
            <p className="text-gray-400 mb-4">{currentLevel.challenge}</p>

            <h3 className="font-semibold">Bench</h3>
            <div className="mt-2 border-2 border-dashed border-gray-700 rounded-2xl p-4 min-h-[8rem]">
              {bench.length === 0 && <p className="text-gray-500">Drag prompt ingredients here or use the buttons below.</p>}
              <div className="space-y-2 mt-2">
                {bench.map(b => (
                  <PromptCard key={b.id} card={b} inBench onRemove={removeFromBench} />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 font-medium">Input tokens: {inputTokens}</div>
              <Button onClick={craft} className="w-full bg-emerald-600 hover:bg-emerald-500">Craft Prompt</Button>
            </div>
          </Card>

          {outcome && <OutcomePanel outcome={outcome} onNext={onNext} />}
        </div>

        <div>
          <Card className="bg-gray-800">
            <h3 className="text-lg font-semibold mb-2">Available Ingredients</h3>
            <div className="space-y-2">
              {available.map(a => (
                <PromptCard key={a.id} card={a} onAdd={addToBench} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
