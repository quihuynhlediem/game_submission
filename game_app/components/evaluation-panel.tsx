"use client"

import type { Card, Level } from "@/lib/game-data"
import { evaluatePrompt } from "@/lib/evaluator"
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react"

interface EvaluationPanelProps {
  selectedCards: Card[]
  currentLevel: Level
}

export default function EvaluationPanel({ selectedCards, currentLevel }: EvaluationPanelProps) {
  const evaluation = evaluatePrompt(selectedCards, currentLevel)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-cyan-400"
    if (score >= 40) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-500/20 border-green-500/50"
    if (score >= 60) return "bg-cyan-500/20 border-cyan-500/50"
    if (score >= 40) return "bg-yellow-500/20 border-yellow-500/50"
    return "bg-red-500/20 border-red-500/50"
  }

  return (
    <div className="space-y-4">
      {/* Score Card */}
      <div className={`border rounded-lg p-6 backdrop-blur-sm ${getScoreBgColor(evaluation.score)}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Prompt Quality</h3>
          {evaluation.passed ? (
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          ) : evaluation.isValid ? (
            <AlertCircle className="w-6 h-6 text-yellow-400" />
          ) : (
            <XCircle className="w-6 h-6 text-red-400" />
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-bold ${getScoreColor(evaluation.score)}`}>{evaluation.score}</span>
            <span className="text-muted-foreground">/100</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all ${getScoreColor(evaluation.score).replace("text-", "bg-")}`}
            style={{ width: `${evaluation.score}%` }}
          />
        </div>
      </div>

      {/* Feedback */}
      {evaluation.feedback.length > 0 && (
        <div className="bg-card/50 border border-primary/30 rounded-lg p-4 backdrop-blur-sm">
          <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Feedback
          </h4>
          <ul className="space-y-2">
            {evaluation.feedback.map((item, index) => (
              <li key={index} className="text-sm text-foreground/80 flex gap-2">
                <span className="text-primary">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {evaluation.warnings.length > 0 && (
        <div className="bg-card/50 border border-yellow-500/30 rounded-lg p-4 backdrop-blur-sm">
          <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Tips for Improvement
          </h4>
          <ul className="space-y-2">
            {evaluation.warnings.map((item, index) => (
              <li key={index} className="text-sm text-foreground/80 flex gap-2">
                <span className="text-yellow-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Status message */}
      {selectedCards.length === 0 ? (
        <div className="bg-card/50 border border-border/50 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Add cards to see evaluation</p>
        </div>
      ) : evaluation.passed ? (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center">
          <p className="text-sm font-semibold text-green-400">Excellent prompt! Ready to move to the next level.</p>
        </div>
      ) : !evaluation.isValid ? (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-center">
          <p className="text-sm font-semibold text-red-400">Fix the issues above to complete this level.</p>
        </div>
      ) : null}
    </div>
  )
}
