/**
 * Estimate tokens from text using a simple 1 token ~= 4 characters rule.
 * @param text string
 * @returns number of tokens (integer)
 */
export function estimateTokens(text: string) {
  if (!text) return 0
  return Math.max(0, Math.ceil(text.length / 4))
}

/**
 * Calculate simulated LLM cost.
 * Input tokens have baseInputPrice each. Output tokens are more expensive by outputMultiplier.
 * @param inputTokenCount number
 * @param outputTokenCount number
 * @param baseInputPrice number (dollars per input token)
 * @param outputMultiplier number (e.g., 5 meaning output tokens are 5x price)
 * @returns total cost in dollars
 */
export function calculateLlmCost(inputTokenCount: number, outputTokenCount: number, baseInputPrice: number, outputMultiplier: number) {
  const inputCost = inputTokenCount * baseInputPrice
  const outputCost = outputTokenCount * baseInputPrice * outputMultiplier
  return inputCost + outputCost
}
