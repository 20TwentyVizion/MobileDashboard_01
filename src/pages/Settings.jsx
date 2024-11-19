import { useState, useEffect } from 'react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '')
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value)
    // In a real app, you'd want to securely store this,
    // possibly in a backend service or encrypted storage
  }

  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg"
            >
              {darkMode ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">API Settings</h3>
          <input
            type="password"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter Gemini API Key"
            className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          />
          <p className="text-sm text-gray-500 mt-2">
            API key is stored in environment variables
          </p>
        </div>
      </div>
    </div>
  )
}
