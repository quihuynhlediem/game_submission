"use client"

import { Button } from "@/components/ui/button"

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card flex flex-col items-center justify-center px-4">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-balance">
            <span className="text-primary">Prompt</span> Engineering <span className="text-secondary">Workshop</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Master the art of crafting effective prompts through interactive card-based learning
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4 text-left">
          <div className="bg-card/50 border border-primary/30 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-primary mb-3">How It Works</h2>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-3">
                <span className="text-secondary">•</span>
                <span>Drag ingredient cards onto your prompt bench</span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary">•</span>
                <span>Learn what makes prompts effective</span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary">•</span>
                <span>See real-time token cost estimates</span>
              </li>
              <li className="flex gap-3">
                <span className="text-secondary">•</span>
                <span>Get instant feedback on your prompt quality</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Getting the Most Efficient Prompts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Context Gathering */}
            <div className="bg-card/50 border border-secondary/30 rounded-lg p-4 backdrop-blur-sm hover:border-secondary/60 transition-colors">
              <h3 className="font-semibold text-secondary mb-2">1. Start with Context</h3>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Provide design references or specifications</li>
                <li>• Attach existing code or requirements</li>
                <li>• Clarify scope and constraints upfront</li>
              </ul>
            </div>

            {/* Right Tool for Job */}
            <div className="bg-card/50 border border-secondary/30 rounded-lg p-4 backdrop-blur-sm hover:border-secondary/60 transition-colors">
              <h3 className="font-semibold text-secondary mb-2">2. Use the Right Tools</h3>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• SearchRepo for code exploration</li>
                <li>• GenerateDesignInspiration for design</li>
                <li>• SearchWeb for current best practices</li>
              </ul>
            </div>

            {/* Craft Prompts */}
            <div className="bg-card/50 border border-secondary/30 rounded-lg p-4 backdrop-blur-sm hover:border-secondary/60 transition-colors">
              <h3 className="font-semibold text-secondary mb-2">3. Craft Specific Prompts</h3>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Be specific, not vague</li>
                <li>• Provide examples and references</li>
                <li>• State constraints and requirements</li>
              </ul>
            </div>

            {/* Code Organization */}
            <div className="bg-card/50 border border-secondary/30 rounded-lg p-4 backdrop-blur-sm hover:border-secondary/60 transition-colors">
              <h3 className="font-semibold text-secondary mb-2">4. Organize Code Well</h3>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Use kebab-case for file names</li>
                <li>• Split components logically</li>
                <li>• Leverage editing comments to skip unchanged code</li>
              </ul>
            </div>

            {/* Design System */}
            <div className="bg-card/50 border border-secondary/30 rounded-lg p-4 backdrop-blur-sm hover:border-secondary/60 transition-colors">
              <h3 className="font-semibold text-secondary mb-2">5. Follow Design Principles</h3>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Limit to 3-5 colors total</li>
                <li>• Use 2 font families maximum</li>
                <li>• Mobile-first responsive design</li>
              </ul>
            </div>

            {/* Iteration */}
            <div className="bg-card/50 border border-secondary/30 rounded-lg p-4 backdrop-blur-sm hover:border-secondary/60 transition-colors">
              <h3 className="font-semibold text-secondary mb-2">6. Iterate Efficiently</h3>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Make one focused change at a time</li>
                <li>• Reference existing patterns</li>
                <li>• Test as you go with previews</li>
              </ul>
            </div>

            {/* Integrations */}
            <div className="bg-card/50 border border-secondary/30 rounded-lg p-4 backdrop-blur-sm hover:border-secondary/60 transition-colors">
              <h3 className="font-semibold text-secondary mb-2">7. Leverage Integrations</h3>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Check available integrations first</li>
                <li>• Use GetOrRequestIntegration for setup</li>
                <li>• No need to leave the platform</li>
              </ul>
            </div>

            {/* Debugging */}
            <div className="bg-card/50 border border-secondary/30 rounded-lg p-4 backdrop-blur-sm hover:border-secondary/60 transition-colors">
              <h3 className="font-semibold text-secondary mb-2">8. Debug Systematically</h3>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Take screenshots to see issues</li>
                <li>• Search codebase for patterns</li>
                <li>• Provide error messages and context</li>
              </ul>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="font-semibold text-primary mb-3">Key Takeaways</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-foreground/80">
              <div className="flex gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Provide context first for better results</span>
              </div>
              <div className="flex gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Be specific about requirements</span>
              </div>
              <div className="flex gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Use parallel tool calls for efficiency</span>
              </div>
              <div className="flex gap-2">
                <span className="text-secondary font-bold">✓</span>
                <span>Follow existing code patterns</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
        >
          Start Learning
        </Button>

        {/* Team Section */}
        <div className="pt-12 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-6">Built by the Prompt Engineering Team</p>
          <div className="flex flex-wrap justify-center gap-8">
            {["Qui Huynh", "Bao Ho", "Hung Do", "Tan Nguyen"].map((name) => (
              <div key={name} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-2" />
                <p className="text-sm font-medium">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
