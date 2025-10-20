"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, CheckCircle, Lightbulb, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Level, Card as CardType } from "@/lib/game-data"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  quality?: "excellent" | "good" | "poor"
  requiresRebuild?: boolean
  suggestions?: string[]
  inputTokens?: number
  outputTokens?: number
}

interface ChatInterfaceProps {
  conversationHistory: ChatMessage[]
  currentLevel: Level
  selectedCards: CardType[]
  onRebuild?: () => void
}

export default function ChatInterface({
  conversationHistory,
  currentLevel,
  selectedCards,
  onRebuild,
}: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (conversationHistory.length > displayedMessages.length) {
      const newMessage = conversationHistory[displayedMessages.length]

      if (newMessage.role === "assistant") {
        setIsTyping(true)
        const timer = setTimeout(() => {
          setDisplayedMessages((prev) => [...prev, newMessage])
          setIsTyping(false)
        }, 800)
        return () => clearTimeout(timer)
      } else {
        setDisplayedMessages((prev) => [...prev, newMessage])
      }
    }
  }, [conversationHistory, displayedMessages])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [displayedMessages, isTyping])

  const lastMessage = displayedMessages[displayedMessages.length - 1]
  const shouldShowRebuildPrompt = lastMessage?.role === "assistant" && lastMessage?.requiresRebuild

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Chat history */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
        {displayedMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div className="space-y-2">
              <p className="text-muted-foreground">Build your prompt using the cards</p>
              <p className="text-sm text-muted-foreground">Then click "Submit Prompt" to see the AI response</p>
            </div>
          </div>
        ) : (
          displayedMessages.map((message, idx) => (
            <div key={idx} className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {message.role === "user" && (
                <div className="flex justify-end">
                  <div className="max-w-2xl px-4 py-3 rounded-lg bg-primary text-primary-foreground rounded-br-none shadow-lg">
                    <p className="text-sm font-medium mb-2">Your Prompt:</p>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.inputTokens && (
                      <div className="mt-3 pt-3 border-t border-primary-foreground/20 text-xs">
                        Input Tokens: <span className="font-bold">{message.inputTokens}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {message.role === "assistant" && (
                <div className="flex justify-start">
                  <div className="max-w-2xl px-4 py-3 rounded-lg bg-card border border-border rounded-bl-none space-y-3 shadow-lg">
                    <div>
                      <p className="text-sm font-medium mb-2">AI Response:</p>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>

                    {message.inputTokens && message.outputTokens && (
                      <div className="border-t border-border/50 pt-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded p-3 space-y-2 border border-secondary/30">
                        <p className="text-xs font-semibold text-secondary mb-2">Efficiency Analysis:</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-card/50 rounded p-2">
                            <p className="text-xs text-muted-foreground">Input Tokens</p>
                            <p className="text-lg font-bold text-foreground">{message.inputTokens}</p>
                          </div>
                          <div className="bg-secondary/10 rounded p-2">
                            <p className="text-xs text-muted-foreground">Output Tokens</p>
                            <p className="text-lg font-bold text-secondary">{message.outputTokens}</p>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-secondary/20">
                          <p className="text-xs text-muted-foreground">Efficiency Ratio</p>
                          <p className="text-sm font-semibold text-secondary">
                            {(message.outputTokens / message.inputTokens).toFixed(2)}x output per input token
                          </p>
                        </div>
                      </div>
                    )}

                    {message.quality && (
                      <div className="border-t border-border/50 pt-3 space-y-2">
                        <div className="flex items-center gap-2">
                          {message.quality === "excellent" && (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500 animate-pulse" />
                              <span className="text-xs font-medium text-green-500">Excellent Response</span>
                            </>
                          )}
                          {message.quality === "good" && (
                            <>
                              <CheckCircle className="w-4 h-4 text-blue-500 animate-pulse" />
                              <span className="text-xs font-medium text-blue-500">Good Response</span>
                            </>
                          )}
                          {message.quality === "poor" && (
                            <>
                              <AlertCircle className="w-4 h-4 text-red-500 animate-pulse" />
                              <span className="text-xs font-medium text-red-500">Poor Response</span>
                            </>
                          )}
                        </div>

                        {message.requiresRebuild && (
                          <div className="bg-red-500/10 border border-red-500/30 rounded p-2 animate-in fade-in">
                            <p className="text-xs text-red-500 font-medium">
                              Your prompt was incomplete. Please rebuild it with the required components.
                            </p>
                          </div>
                        )}

                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2 space-y-1 animate-in fade-in">
                            <div className="flex items-center gap-1 mb-1">
                              <Lightbulb className="w-3 h-3 text-blue-500" />
                              <p className="text-xs font-medium text-blue-500">Suggestions to optimize:</p>
                            </div>
                            <ul className="text-xs text-blue-500/80 space-y-1">
                              {message.suggestions.map((suggestion, i) => (
                                <li key={i} className="flex gap-2">
                                  <span>•</span>
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-2xl px-4 py-3 rounded-lg bg-card border border-border rounded-bl-none">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rebuild prompt section */}
      {shouldShowRebuildPrompt && (
        <div className="border-t border-border/50 pt-4 animate-in fade-in slide-in-from-bottom-2">
          <Button
            onClick={onRebuild}
            variant="outline"
            className="w-full border-red-500/50 text-red-500 hover:bg-red-500/10 bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Rebuild Prompt
          </Button>
        </div>
      )}
    </div>
  )
}
