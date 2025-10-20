"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import ChaptersMenu from "@/components/chapters-menu"
import GameScreen from "@/components/game-screen"

type AppState = "landing" | "chapters" | "game"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing")
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)

  const handleStartGame = () => {
    setAppState("chapters")
  }

  const handleSelectChapter = (chapterId: number) => {
    setSelectedChapter(chapterId)
    setAppState("game")
  }

  const handleBackToChapters = () => {
    setAppState("chapters")
  }

  const handleBackToLanding = () => {
    setAppState("landing")
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {appState === "landing" && <LandingPage onStart={handleStartGame} />}
      {appState === "chapters" && <ChaptersMenu onSelectChapter={handleSelectChapter} onBack={handleBackToLanding} />}
      {appState === "game" && selectedChapter !== null && (
        <GameScreen chapterId={selectedChapter} onBack={handleBackToChapters} />
      )}
    </main>
  )
}
