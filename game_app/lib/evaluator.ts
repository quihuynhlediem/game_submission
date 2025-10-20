import type { Card } from "./game-data"
import type { Level } from "./game-data"

export interface EvaluationResult {
  isValid: boolean
  score: number
  feedback: string[]
  warnings: string[]
  passed: boolean
}

export function evaluatePrompt(selectedCards: Card[], level: Level): EvaluationResult {
  const feedback: string[] = []
  const warnings: string[] = []
  let score = 0

  const selectedCardIds = selectedCards.map((c) => c.id)
  const solutionIds = level.solution

  // Check if all solution cards are included
  const missingSolution = solutionIds.filter((id) => !selectedCardIds.includes(id))

  if (missingSolution.length > 0) {
    feedback.push(`Missing key card(s) for optimal solution`)
  } else {
    score += 40
    feedback.push("Perfect! You've included all key cards!")
  }

  // Check for extra cards (cards not in solution)
  const extraCards = selectedCardIds.filter((id) => !solutionIds.includes(id))

  if (extraCards.length > 0) {
    const extraCount = extraCards.length
    warnings.push(`You have ${extraCount} extra card(s). Try to match the optimal solution.`)
    score -= extraCount * 5
  } else if (selectedCards.length > 0) {
    score += 20
    feedback.push("No unnecessary cards - efficient!")
  }

  // Check for vague cards
  const hasVague = selectedCards.some((c) => c.type === "vague")
  if (!hasVague && selectedCards.length > 0) {
    score += 20
    feedback.push("No vague cards - excellent clarity!")
  } else if (hasVague) {
    warnings.push("Vague cards reduce prompt effectiveness. Try removing them.")
    score -= 15
  }

  // Check for card diversity
  const uniqueTypes = new Set(selectedCards.map((c) => c.type)).size
  if (uniqueTypes >= 2 && selectedCards.length > 0) {
    score += 10
    feedback.push("Good card diversity!")
  }

  // Check for efficiency (total cost)
  const totalCost = selectedCards.reduce((sum, card) => sum + card.cost, 0)
  const solutionCost = selectedCards.filter((c) => solutionIds.includes(c.id)).reduce((sum, card) => sum + card.cost, 0)

  if (selectedCards.length > 0 && totalCost <= solutionCost + 5) {
    score += 10
    feedback.push("Efficient token usage!")
  }

  const isValid = missingSolution.length === 0 && !hasVague
  const passed = isValid && score >= 70

  return {
    isValid,
    score: Math.min(100, Math.max(0, score)),
    feedback,
    warnings,
    passed,
  }
}
