import { motion } from 'framer-motion'

const statusCards = [
  { title: 'APIs Monitored', value: '847', color: 'text-white' },
  { title: 'Active Alerts', value: '23', color: 'text-status-yellow' },
  { title: 'Deprecated This Month', value: '5', color: 'text-status-red' },
  { title: 'Stable APIs', value: '812', color: 'text-status-green' },
]

const timelineEvents = [
  {
    timestamp: '2024-02-15 14:30',
    api: 'Twitter API',
    change: 'Major version update',
    severity: 'high',
  },
  {
    timestamp: '2024-02-14 09:15',
    api: 'GitHub REST API',
    change: 'Deprecation notice',
    severity: 'medium',
  },
  {
    timestamp: '2024-02-13 16:45',
    api: 'Stripe Payment API',
    change: 'New features added',
    severity: 'low',
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'text-status-red'
    case 'medium':
      return 'text-status-yellow'
    case 'low':
      return 'text-status-green'
    default:
      return 'text-gray-400'
  }
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-400">Track 847 APIs • 23 Alerts • 5 Critical</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((card) => (
          <motion.div
            key={card.title}
            className="card hover:bg-gray-750 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-sm text-gray-400">{card.title}</h3>
            <p className={`text-2xl font-bold mt-2 ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Recent API Changes</h2>
        <div className="space-y-4">
          {timelineEvents.map((event) => (
            <div key={event.timestamp} className="flex items-start space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{event.timestamp}</span>
                  <span className={`text-sm font-medium ${getSeverityColor(event.severity)}`}>
                    {event.severity.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-medium mt-1">{event.api}</h3>
                <p className="text-sm text-gray-400">{event.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 