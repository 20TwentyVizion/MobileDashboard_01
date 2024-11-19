import { RiBarChartLine, RiUserLine, RiCalendarLine } from 'react-icons/ri'

export default function Dashboard() {
  return (
    <div className="p-4 pb-24">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <RiBarChartLine size={24} />
          <h3 className="text-lg font-semibold mt-2">Analytics</h3>
          <p className="text-sm opacity-80">Daily Stats</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <RiUserLine size={24} />
          <h3 className="text-lg font-semibold mt-2">Users</h3>
          <p className="text-sm opacity-80">Active Users</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 mb-4">
        <div className="flex items-center mb-4">
          <RiCalendarLine size={20} className="mr-2" />
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-b dark:border-gray-600 pb-2">
              <p className="text-sm">Activity item {item}</p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
