export type CardType = 'task' | 'persona' | 'context' | 'format'

export type Card = {
  id: string
  type: CardType
  title: string
  text: string
  tag?: string
  quality?: 'optimized' | 'non-optimized' | 'wrong'
}

export type Level = {
  id: string
  title: string
  challenge: string
  availableCardIds: string[]
  required: CardType[]
  forbidden: CardType[]
  tips: string[]
  userStory?: string
  tuning?: {
    successMultiplier?: number
    penaltyMultiplier?: number
    vagueVariance?: [number, number]
  }
}

export type Chapter = {
  id: string
  title: string
  description: string
  levelIds: string[]
  learnings: string[]
}
