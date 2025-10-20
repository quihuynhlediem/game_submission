"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Send } from "lucide-react"
import { CHAPTERS, type Card, CARD_TYPE_COLORS } from "@/lib/game-data"
import { evaluateResponse } from "@/lib/response-evaluator"
import ChatInterface from "@/components/chat-interface"

interface GameScreenProps {
  chapterId: number
  onBack: () => void
}

export default function GameScreen({ chapterId, onBack }: GameScreenProps) {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)
  const [selectedCards, setSelectedCards] = useState<Card[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<
    Array<{
      role: "user" | "assistant"
      content: string
      quality?: "excellent" | "good" | "poor"
      requiresRebuild?: boolean
      suggestions?: string[]
      inputTokens?: number
      outputTokens?: number
    }>
  >([])
  const [screen, setScreen] = useState<"builder" | "chat">("builder")

  console.log("[v0] GameScreen rendered with chapterId:", chapterId)
  console.log("[v0] CHAPTERS array:", CHAPTERS)
  console.log("[v0] CHAPTERS[chapterId]:", CHAPTERS[chapterId])

  const chapter = CHAPTERS[chapterId]

  if (!chapter) {
    console.error("[v0] Chapter not found for chapterId:", chapterId)
    return <div className="text-red-500">Error: Chapter not found</div>
  }

  const currentLevel = chapter.levels[currentLevelIndex]

  console.log("[v0] currentLevel:", currentLevel)
  console.log("[v0] availableCards:", currentLevel?.availableCards)

  const availableCards =
    currentLevel?.availableCards?.filter((card) => !selectedCards.some((selected) => selected.id === card.id)) || []

  const generatePromptPreview = () => {
    return selectedCards.map((c) => c.text).join("\n\n")
  }

  const handleCardSelect = (card: Card) => {
    setSelectedCards((prev) => [...prev, card])
  }

  const handleCardRemove = (cardId: string) => {
    setSelectedCards((prev) => prev.filter((c) => c.id !== cardId))
  }

  const handleClearBench = () => {
    setSelectedCards([])
  }

  const handleSubmitPrompt = async () => {
    if (selectedCards.length === 0) return

    setIsSubmitting(true)

    try {
      const promptText = selectedCards.map((c) => c.text).join("\n")
      const inputTokens = selectedCards.reduce((sum, c) => sum + c.cost, 0)

      setConversationHistory((prev) => [
        ...prev,
        {
          role: "user",
          content: promptText,
          inputTokens,
        },
      ])

      const evaluation = evaluateResponse(selectedCards, currentLevel)

      setConversationHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: evaluation.responseContent,
          quality: evaluation.quality,
          requiresRebuild: evaluation.requiresRebuild,
          suggestions: evaluation.suggestions,
          inputTokens,
          outputTokens: evaluation.outputTokens,
        },
      ])

      setScreen("chat")
      setSelectedCards([])
    } catch (error) {
      console.error("[v0] Error submitting prompt:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNextLevel = () => {
    if (currentLevelIndex < chapter.levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1)
      setSelectedCards([])
      setConversationHistory([])
      setScreen("builder")
    }
  }

  const handlePreviousLevel = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1)
      setSelectedCards([])
      setConversationHistory([])
      setScreen("builder")
    }
  }

  const handleRebuild = () => {
    setScreen("builder")
    setSelectedCards([])
  }

  const onCardRemove = (cardId: string) => {
    handleCardRemove(cardId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">
                  {chapter.title} - <span className="text-primary">{currentLevel.title}</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Level {currentLevelIndex + 1} of {chapter.levels.length}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePreviousLevel}
                disabled={currentLevelIndex === 0}
                className="text-muted-foreground bg-transparent"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNextLevel}
                disabled={currentLevelIndex === chapter.levels.length - 1}
                className="text-muted-foreground bg-transparent"
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* Main content - Two screen experience */}
        <div className="flex-1 overflow-hidden">
          {screen === "builder" ? (
            <div className="h-full flex gap-6 p-6">
              {/* Left column: Available cards */}
              <div className="flex-1 overflow-y-auto pr-2">
                <div className="space-y-4">
                  <div className="bg-card/50 border border-primary/30 rounded-lg p-6 backdrop-blur-sm">
                    <h2 className="text-lg font-semibold text-primary mb-4">User Story</h2>
                    <p className="text-foreground/80">{currentLevel.userStory}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">Available Cards</h3>
                    <p className="text-sm text-muted-foreground">Drag cards to the bench on the right</p>

                    <div className="grid grid-cols-1 gap-3">
                      {availableCards.map((card) => (
                        <div
                          key={card.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer?.setData("card", JSON.stringify(card))
                          }}
                          className={`${CARD_TYPE_COLORS[card.type]} group cursor-grab active:cursor-grabbing border rounded-lg p-4 transition-all hover:shadow-lg hover:shadow-primary/20`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-primary uppercase">{card.type}</span>
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
                </div>
              </div>

              {/* Right column: Prompt bench, preview, and token calculation */}
              <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                {/* Prompt Bench */}
                <div className="space-y-3 flex-shrink-0">
                  <h3 className="text-lg font-semibold text-foreground">Your Prompt Bench</h3>

                  <div
                    onDrop={(e) => {
                      e.preventDefault()
                      const cardData = e.dataTransfer?.getData("card")
                      if (cardData) {
                        const card = JSON.parse(cardData)
                        handleCardSelect(card)
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    className="h-48 border-2 border-dashed border-primary/30 rounded-lg p-4 bg-card/20 transition-all hover:border-primary/50 hover:bg-card/30 overflow-y-auto"
                  >
                    {selectedCards.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center">
                        <div>
                          <p className="text-muted-foreground">Drag cards here</p>
                          <p className="text-xs text-muted-foreground mt-1">to build your prompt</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {selectedCards.map((card, index) => (
                          <div
                            key={`${card.id}-${index}`}
                            className={`${CARD_TYPE_COLORS[card.type]} group border rounded-lg p-3 flex items-start justify-between hover:shadow-md transition-all`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-primary uppercase">{card.type}</span>
                                <span className="text-xs text-muted-foreground">{card.cost} tokens</span>
                              </div>
                              <p className="font-medium text-foreground text-sm">{card.text}</p>
                            </div>
                            <button
                              onClick={() => onCardRemove(card.id)}
                              className="ml-2 p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedCards.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearBench}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full"
                    >
                      Clear Bench
                    </Button>
                  )}
                </div>

                {/* Prompt Preview Section */}
                {selectedCards.length > 0 && (
                  <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Prompt Preview</h3>
                    <div className="flex-1 bg-card/50 border border-border/50 rounded-lg p-4 overflow-y-auto">
                      <p className="text-foreground/80 whitespace-pre-wrap text-sm leading-relaxed">
                        {generatePromptPreview()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Token Calculation - Highlighted Section */}
                {selectedCards.length > 0 && (
                  <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/50 rounded-lg p-6 backdrop-blur-sm flex-shrink-0">
                    <h3 className="text-lg font-semibold text-secondary mb-4">Token Calculation</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground/80">Total Input Tokens:</span>
                        <span className="text-3xl font-bold text-secondary">
                          {selectedCards.reduce((sum, c) => sum + c.cost, 0)}
                        </span>
                      </div>
                      <div className="border-t border-secondary/30 pt-3 space-y-2">
                        {Object.entries(
                          selectedCards.reduce(
                            (acc, card) => {
                              acc[card.type] = (acc[card.type] || 0) + card.cost
                              return acc
                            },
                            {} as Record<string, number>,
                          ),
                        ).map(([type, tokens]) => (
                          <div key={type} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground capitalize">{type}:</span>
                            <span className="text-foreground font-medium">{tokens} tokens</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmitPrompt}
                      disabled={selectedCards.length === 0 || isSubmitting}
                      className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Submitting..." : "Submit Prompt"}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-6 flex flex-col">
              <div className="max-w-4xl mx-auto w-full flex-1">
                <ChatInterface
                  conversationHistory={conversationHistory}
                  currentLevel={currentLevel}
                  selectedCards={selectedCards}
                  onRebuild={handleRebuild}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
