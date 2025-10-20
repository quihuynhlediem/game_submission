import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { levels } from '../data/seedData'
import { GameShell } from '../components/GameShell'

export const PlayPage: React.FC = () => {
  const { chapterId, levelId } = useParams()
  const level = levelId ? levels[levelId] : undefined

  if (!level) return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl">Level not found</h2>
        <Link to="/chapters" className="text-violet-300">Back to Chapters</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(180deg,#020204 0%, #07101a 70%)' }}>
      <div className="max-w-7xl mx-auto">
        <GameShell chapterId={chapterId} levelId={levelId} />
      </div>
    </div>
  )
}

export default PlayPage
