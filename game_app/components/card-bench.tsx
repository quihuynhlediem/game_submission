"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Trash2 } from "lucide-react"
import { CARD_TYPE_COLORS, CARD_TYPE_LABELS, type Card } from "@/lib/game-data"

interface CardBenchProps {
  availableCards: Card[]
  selectedCards: Card[]
  onCardSelect: (card: Card) => void
  onCardRemove: (cardId: string) => void
  onClearBench: () => void
}

export default function CardBench({
  availableCards,
  selectedCards,
  onCardSelect,
  onCardRemove,
  onClearBench,
}: CardBenchProps) {
  const [draggedCard, setDraggedCard] = useState<Card | null>(null)

  const handleDragStart = (card: Card) => {
    setDraggedCard(card)
  }

  const handleDragEnd = () => {
    setDraggedCard(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedCard) {
      onCardSelect(draggedCard)
      setDraggedCard(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-6">
      {/* Available Cards */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Available Cards</h3>
        <p className="text-sm text-muted-foreground">Drag cards to the bench below</p>

        <div className="grid grid-cols-1 gap-3">
          {availableCards.map((card) => (
            <div
              key={card.id}
              draggable
              onDragStart={() => handleDragStart(card)}
              onDragEnd={handleDragEnd}
              className={`${CARD_TYPE_COLORS[card.type]} group cursor-grab active:cursor-grabbing bg-card/50 border border-border/50 rounded-lg p-4 transition-all hover:bg-card/80 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-primary uppercase">{CARD_TYPE_LABELS[card.type]}</span>
                    <span className="text-xs text-muted-foreground">{card.cost} tokens</span>
                  </div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {card.text}
                  </h4>
                  {card.effect && <p className="text-xs text-secondary mt-2">Effect: {card.effect}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Bench */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Your Prompt Bench</h3>
          {selectedCards.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearBench}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="min-h-48 border-2 border-dashed border-primary/30 rounded-lg p-4 bg-card/20 transition-all hover:border-primary/50 hover:bg-card/30"
        >
          {selectedCards.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <p className="text-muted-foreground">Drag cards here to build your prompt</p>
                <p className="text-xs text-muted-foreground mt-1">You can add multiple cards</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedCards.map((card, index) => (
                <div
                  key={`${card.id}-${index}`}
                  className={`${CARD_TYPE_COLORS[card.type]} group bg-card/50 border border-border/50 rounded-lg p-3 flex items-start justify-between hover:bg-card/80 transition-all`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary uppercase">
                        {CARD_TYPE_LABELS[card.type]}
                      </span>
                      <span className="text-xs text-muted-foreground">{card.cost} tokens</span>
                    </div>
                    <p className="font-medium text-foreground text-sm">{card.text}</p>
                  </div>
                  <button
                    onClick={() => onCardRemove(card.id)}
                    className="ml-2 p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
