"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { CHAPTERS } from "@/lib/game-data"

interface ChaptersMenuProps {
  onSelectChapter: (chapterId: number) => void
  onBack: () => void
}

export default function ChaptersMenu({ onSelectChapter, onBack }: ChaptersMenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card px-4 py-12">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-balance">
              Choose Your <span className="text-primary">Chapter</span>
            </h1>
            <p className="text-muted-foreground mt-2">Select a chapter to begin learning</p>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-6 transition-all hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/20"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-10 transition-opacity" />

              <div className="relative z-10 space-y-4">
                {/* Chapter number */}
                <div className="inline-block">
                  <span className="text-sm font-semibold text-primary">Chapter {chapter.id + 1}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {chapter.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-muted-foreground">{chapter.description}</p>

                {/* Levels info */}
                <div className="flex items-center gap-2 pt-4 border-t border-border/30">
                  <div className="flex gap-1">
                    {Array.from({ length: chapter.levels.length }).map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-primary/50" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{chapter.levels.length} levels</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info section */}
        <div className="mt-12 p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
          <h3 className="font-semibold text-secondary mb-2">Pro Tip</h3>
          <p className="text-sm text-muted-foreground">
            Each chapter contains multiple levels with increasing difficulty. Complete all levels to master prompt
            engineering!
          </p>
        </div>
      </div>
    </div>
  )
}
