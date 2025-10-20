import React from 'react'
import { Link } from 'react-router-dom'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen p-12" style={{ background: 'linear-gradient(180deg,#020204 0%, #081018 70%)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl heading-serif text-white">Prompt Craft</h1>
          <p className="text-gray-400 text-lg">An interactive game that teaches prompt engineering using a card-crafting metaphor. Drag ingredients to the bench, craft a prompt, and get instant educational feedback.</p>
          <div className="flex gap-4">
            <Link to="/chapters" className="neon-button px-6 py-3 rounded-2xl">Enter the Workshop</Link>
            <Link to="/chapters" className="px-5 py-3 border border-violet-600 rounded-2xl text-violet-300">Chapters</Link>
          </div>
          <div className="mt-4 text-sm text-gray-500">Team: Qui Huynh · Hung Do · Bao Ho · Tan Nguyen</div>
        </div>
        <div>
          <div className="neon-card p-6 rounded-2xl neon-glow">
            <h3 className="text-xl font-semibold">How to play</h3>
            <ol className="mt-3 text-sm text-gray-300 space-y-2">
              <li>1. Add cards from the Ingredients shelf to the Bench.</li>
              <li>2. Arrange the order to shape the prompt.</li>
              <li>3. Press Craft Prompt to evaluate and learn.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
