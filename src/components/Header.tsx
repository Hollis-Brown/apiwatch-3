import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <header className="h-16 border-b border-gray-700 flex items-center justify-between px-6">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search APIs..."
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-600"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-sm font-medium">JD</span>
        </div>
      </div>
    </header>
  )
} 