import { useState, useRef, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import ReactMarkdown from 'react-markdown'
import { RiSendPlaneFill, RiTimeLine } from 'react-icons/ri'
import { getTimeOfDay, formatTime, formatDate } from '../utils/timeUtils'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export default function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    const greeting = `Good ${getTimeOfDay()}! I'm MAX (Modular AI eXpert). How can I assist you today?`
    setMessages([{ role: 'assistant', content: greeting }])
  }, [])

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

      // Add context about time and date to the prompt
      const contextPrompt = `Current time: ${formatTime()}
Current date: ${formatDate()}
Time of day: ${getTimeOfDay()}
User message: ${input}

Please provide a response that's contextually aware of the current time and date when relevant.`

      const result = await model.generateContent(contextPrompt)
      const response = await result.response
      const text = response.text()

      setMessages(prev => [...prev, { role: 'assistant', content: text }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 pb-24 bg-dark">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">MAX</h1>
        <div className="flex items-center text-primary-dark text-sm">
          <RiTimeLine className="mr-1" />
          {formatTime()}
        </div>
      </div>
      
      <div className="chat-container overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary text-dark'
                  : 'bg-dark-light text-primary border border-primary-dark'
              }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block bg-dark-light text-primary border border-primary-dark p-3 rounded-lg">
              MAX is thinking...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-16 left-0 right-0 max-w-md mx-auto p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask MAX anything..."
            className="flex-1 p-2 rounded-lg border border-primary-dark bg-dark-light text-primary placeholder-primary-dark/50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-dark p-2 rounded-lg disabled:opacity-50 hover:bg-primary-dark transition-colors"
          >
            <RiSendPlaneFill size={24} />
          </button>
        </div>
      </form>
    </div>
  )
}
