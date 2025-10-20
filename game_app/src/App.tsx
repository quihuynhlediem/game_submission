import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ChaptersPage from './pages/ChaptersPage'
import PlayPage from './pages/PlayPage'
import ChatPage from './pages/ChatPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chapters" element={<ChaptersPage />} />
        <Route path="/play/:chapterId/:levelId" element={<PlayPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  )
}
