"use client"

import type { Card, Level } from "@/lib/game-data"
import { calculateTokens, getTokenColor } from "@/lib/token-calculator"

interface PromptDisplayProps {
  selectedCards: Card[]
  currentLevel: Level
}

export default function PromptDisplay({ selectedCards, currentLevel }: PromptDisplayProps) {
  const generatePromptText = () => {
    if (selectedCards.length === 0) {
      return "Your prompt will appear here as you add cards..."
    }

    const parts: string[] = []

    selectedCards.forEach((card) => {
      parts.push(card.text)
    })

    return parts.join("\n\n")
  }

  const analysis = calculateTokens(selectedCards)
  const tokenColor = getTokenColor(analysis.totalTokens)

  return (
    <div className="space-y-4">
      <div className="bg-card/50 border border-primary/30 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-primary mb-4">Generated Prompt</h3>

        <div className="bg-background/50 rounded-lg p-4 min-h-32 border border-border/50 mb-4">
          <p className="text-foreground/80 font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {generatePromptText()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-sm text-muted-foreground">Total Tokens</p>
            <p className={`text-2xl font-bold ${tokenColor}`}>{analysis.totalTokens}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cards Used</p>
            <p className="text-2xl font-bold text-primary">{selectedCards.length}</p>
          </div>
        </div>

        {/* Token breakdown */}
        {selectedCards.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Token Breakdown</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(analysis.byType).map(([type, tokens]) =>
                tokens > 0 ? (
                  <div key={type} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">{type}:</span>
                    <span className="text-foreground font-medium">{tokens}</span>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
          <h4 className="text-sm font-semibold text-green-400 mb-2">Good Output Example</h4>
          <div className="bg-background/50 rounded p-3 text-xs text-foreground/70 font-mono overflow-auto max-h-32">
            {currentLevel.goodOutput}
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
          <h4 className="text-sm font-semibold text-red-400 mb-2">Bad Output Example</h4>
          <div className="bg-background/50 rounded p-3 text-xs text-foreground/70 font-mono overflow-auto max-h-32">
            {currentLevel.badOutput}
          </div>
        </div>
      </div>
    </div>
  )
}
