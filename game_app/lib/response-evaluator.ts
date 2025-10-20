import type { Card, Level } from "./game-data"

export interface ResponseEvaluation {
  quality: "excellent" | "good" | "poor"
  requiresRebuild: boolean
  suggestions: string[]
  score: number
  feedback: string
  responseContent: string
  outputTokens: number
}

export function evaluateResponse(selectedCards: Card[], level: Level): ResponseEvaluation {
  const selectedCardIds = selectedCards.map((c) => c.id)
  const solutionIds = level.solution

  const hasAllRequired = solutionIds.every((id) => selectedCardIds.includes(id))

  const hasExtraCards = selectedCardIds.some((id) => !solutionIds.includes(id))

  // Calculate clarity score (based on card specificity)
  const clarityScore = calculateClarityScore(selectedCards)

  // Calculate efficiency score (based on token cost)
  const efficiencyScore = calculateEfficiencyScore(selectedCards, level)

  let quality: "excellent" | "good" | "poor" = "good"
  let requiresRebuild = false
  let score = 0
  let feedback = ""
  let responseContent = level.responses.good.content
  let outputTokens = level.responses.good.outputTokens

  if (!hasAllRequired) {
    quality = "poor"
    requiresRebuild = true
    score = 30
    feedback = "Your prompt is missing key components. The AI response was incomplete or off-target."
    responseContent = level.responses.poor.content
    outputTokens = level.responses.poor.outputTokens
  } else if (hasExtraCards) {
    quality = "good"
    requiresRebuild = false
    score = 65
    feedback = "Your prompt worked, but it had unnecessary components. The response could be more efficient."
    responseContent = level.responses.goodWithSuggestions.content
    outputTokens = level.responses.goodWithSuggestions.outputTokens
  } else if (clarityScore > 80 && efficiencyScore > 80) {
    quality = "excellent"
    requiresRebuild = false
    score = 95
    feedback = "Perfect! Your prompt was clear, specific, and efficient. The AI provided an excellent response."
    responseContent = level.responses.excellent.content
    outputTokens = level.responses.excellent.outputTokens
  } else if (clarityScore > 70 && efficiencyScore > 70) {
    quality = "good"
    requiresRebuild = false
    score = 80
    feedback = "Good prompt! The response was helpful. Consider optimizing for better efficiency."
    responseContent = level.responses.good.content
    outputTokens = level.responses.good.outputTokens
  } else {
    quality = "good"
    requiresRebuild = false
    score = 70
    feedback = "Your prompt worked, but there's room for improvement in clarity or efficiency."
    responseContent = level.responses.good.content
    outputTokens = level.responses.good.outputTokens
  }

  const suggestions = generateSuggestions(quality, selectedCardIds, solutionIds, clarityScore, efficiencyScore)

  return {
    quality,
    requiresRebuild,
    suggestions,
    score,
    feedback,
    responseContent,
    outputTokens,
  }
}

function calculateClarityScore(selectedCards: Card[]): number {
  if (selectedCards.length === 0) return 0

  // Cards with higher cost tend to be more specific/clear
  const avgCost = selectedCards.reduce((sum, c) => sum + c.cost, 0) / selectedCards.length
  return Math.min(100, (avgCost / 15) * 100)
}

function calculateEfficiencyScore(selectedCards: Card[], level: Level): number {
  if (selectedCards.length === 0) return 0

  const totalCost = selectedCards.reduce((sum, c) => sum + c.cost, 0)
  const solutionCost = selectedCards.filter((c) => level.solution.includes(c.id)).reduce((sum, c) => sum + c.cost, 0)

  // Efficiency is based on how close we are to optimal cost
  const efficiency = (solutionCost / totalCost) * 100
  return Math.min(100, efficiency)
}

function generateSuggestions(
  quality: string,
  selectedCardIds: string[],
  solutionIds: string[],
  clarityScore: number,
  efficiencyScore: number,
): string[] {
  const suggestions: string[] = []

  if (quality === "poor") {
    suggestions.push("Add the missing key components to improve response quality")
    suggestions.push("Review the level objectives to understand what's needed")
  } else if (quality === "good") {
    if (efficiencyScore < 80) {
      suggestions.push("Remove unnecessary cards to make your prompt more efficient")
    }
    if (clarityScore < 80) {
      suggestions.push("Use more specific and detailed cards for better clarity")
    }
    if (suggestions.length === 0) {
      suggestions.push("Try removing extra cards to optimize your prompt")
    }
  }

  return suggestions
}
