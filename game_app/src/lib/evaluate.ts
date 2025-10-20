import { Level, Card } from '../data/types'

export function estimateTokens(text: string) {
  if (!text) return 0
  return Math.max(0, Math.ceil(text.length / 4))
}

function randBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function evaluate(level: Level, benchCards: Card[]) {
  const typesOnBench = new Set(benchCards.map(c => c.type))
  const inputTokens = benchCards.map(c => estimateTokens(c.text)).reduce((a, b) => a + b, 0)

  const missing = level.required.filter(t => !typesOnBench.has(t))
  const forbiddenPresent = level.forbidden.filter(t => typesOnBench.has(t))
  const hasForbidden = forbiddenPresent.length > 0
  // treat 'vague' as a quality problem on cards (non-optimized or wrong)
  const hasVagueQuality = benchCards.some(c => c.quality === 'non-optimized' || c.quality === 'wrong')

  const cfg = { successMultiplier: 1.0, penaltyMultiplier: 0.5, vagueVariance: [0.1, 2.0] as [number, number], ...level.tuning }

  let status: 'success' | 'failure' = 'success'
  let reason: string[] = []

  if (missing.length) {
    status = 'failure'
    reason.push(`Missing: ${missing.join(', ')}`)
  }
  if (hasForbidden) {
    status = 'failure'
    reason.push(`Forbidden present: ${forbiddenPresent.join(', ')}`)
  }

  let outputTokens: number
  if (status === 'success') {
    outputTokens = Math.round(inputTokens * cfg.successMultiplier * randBetween(0.9, 1.3))
  } else if (hasVagueQuality) {
    outputTokens = Math.round(inputTokens * randBetween(cfg.vagueVariance[0], cfg.vagueVariance[1]))
  } else {
    outputTokens = Math.round(inputTokens * cfg.penaltyMultiplier)
  }

  const total = inputTokens + outputTokens
  const tip = status === 'success' ? 'Nice composition. Notice how context + format stabilizes outputs.' : pick(level.tips)

  return { status, reason, inputTokens, outputTokens, total, tip }
}
