import type { Card, CardType } from "./game-data"

export interface TokenAnalysis {
  totalTokens: number
  byType: Record<CardType, number>
  efficiency: number
  recommendation: string
}

export function calculateTokens(cards: Card[]): TokenAnalysis {
  const totalTokens = cards.reduce((sum, card) => sum + card.cost, 0)

  const byType: Record<CardType, number> = {
    task: 0,
    persona: 0,
    context: 0,
    format: 0,
    vague: 0,
  }

  cards.forEach((card) => {
    byType[card.type] += card.cost
  })

  // Efficiency score: lower is better (fewer tokens for same quality)
  // Base efficiency on card count and token usage
  const cardCount = cards.length
  const efficiency = cardCount > 0 ? Math.round((totalTokens / cardCount) * 10) / 10 : 0

  // Generate recommendation based on token usage
  let recommendation = ""
  if (totalTokens === 0) {
    recommendation = "Add cards to build your prompt"
  } else if (totalTokens < 5) {
    recommendation = "Your prompt is very concise. Consider adding more detail."
  } else if (totalTokens < 15) {
    recommendation = "Good balance of conciseness and detail."
  } else if (totalTokens < 25) {
    recommendation = "Your prompt is detailed. Make sure every card adds value."
  } else {
    recommendation = "Your prompt is quite long. Consider removing unnecessary cards."
  }

  return {
    totalTokens,
    byType,
    efficiency,
    recommendation,
  }
}

export function getTokenColor(tokens: number): string {
  if (tokens < 5) return "text-green-400"
  if (tokens < 15) return "text-cyan-400"
  if (tokens < 25) return "text-yellow-400"
  return "text-orange-400"
}
