import { PlusIcon } from '@heroicons/react/24/outline'
import { useAPI } from '@/contexts/APIContext'

interface SidebarProps {
  onAddClick: () => void;
}

export default function Sidebar({ onAddClick }: SidebarProps) {
  const { apis, setSelectedApi } = useAPI();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'status-dot-green'
      case 'warning':
        return 'status-dot-yellow'
      case 'deprecated':
      case 'changes':
        return 'status-dot-red'
      default:
        return 'status-dot-yellow'
    }
  }

  return (
    <aside className="w-64 bg-sidebar h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">APIWatch</h1>
      </div>
      
      <div className="px-4">
        <h2 className="text-sm font-semibold text-gray-400 mb-4">My APIs</h2>
        <div className="space-y-2">
          {apis.map((api) => (
            <div
              key={api.id}
              onClick={() => setSelectedApi(api)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div className={`status-dot ${getStatusColor(api.status)}`} />
              <div>
                <div className="text-sm font-medium">{api.name}</div>
                <div className="text-xs text-gray-400">{api.version}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4">
        <button
          onClick={onAddClick}
          className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add API</span>
        </button>
      </div>
    </aside>
  )
} 