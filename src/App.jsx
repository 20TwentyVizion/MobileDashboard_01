import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Chatbot from './pages/Chatbot'
import Settings from './pages/Settings'

function App() {
  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chatbot />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navigation />
      </div>
    </div>
  )
}

export default App
