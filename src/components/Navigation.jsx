import { Link, useLocation } from 'react-router-dom'
import { RiDashboardLine, RiMessage3Line, RiSettings3Line } from 'react-icons/ri'

export default function Navigation() {
  const location = useLocation()
  
  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="flex justify-around p-4">
        <Link to="/" className={`flex flex-col items-center ${location.pathname === '/' ? 'text-blue-500' : 'text-gray-500'}`}>
          <RiDashboardLine size={24} />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link to="/chat" className={`flex flex-col items-center ${location.pathname === '/chat' ? 'text-blue-500' : 'text-gray-500'}`}>
          <RiMessage3Line size={24} />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link to="/settings" className={`flex flex-col items-center ${location.pathname === '/settings' ? 'text-blue-500' : 'text-gray-500'}`}>
          <RiSettings3Line size={24} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </nav>
  )
}
