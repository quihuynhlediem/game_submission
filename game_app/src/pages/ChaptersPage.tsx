import React from 'react'
import { Link } from 'react-router-dom'
import { chapters, levels } from '../data/seedData'

export const ChaptersPage: React.FC = () => {
  return (
    <div className="min-h-screen p-8" style={{ background: 'linear-gradient(180deg,#020204 0%, #07101a 70%)' }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 heading-serif">Chapters</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(chapters).map(ch => (
            <div key={ch.id} className="neon-card p-4 rounded-2xl">
              <h3 className="text-lg font-semibold text-white">{ch.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{ch.description}</p>
              <div className="mt-3">
                {ch.levelIds.map(lid => (
                  <div key={lid} className="flex justify-between items-center py-2 border-b border-gray-800">
                    <div className="text-sm text-gray-200">{levels[lid].title}</div>
                    <Link to={`/play/${ch.id}/${lid}`} className="text-violet-300">Play</Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChaptersPage
