import { motion } from 'framer-motion';

interface UsageIndicatorProps {
  used: number;
  limit: number;
  onUpgrade: () => void;
}

export default function UsageIndicator({ used, limit, onUpgrade }: UsageIndicatorProps) {
  const percent = Math.min((used / limit) * 100, 100);
  const isFull = used >= limit;

  return (
    <div className="w-full p-4 bg-gray-900 rounded-xl shadow-inner mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 font-semibold">API Usage</span>
        <span className={`text-xs font-bold ${isFull ? 'text-status-red' : 'text-status-green'}`}>{used}/{limit} APIs used</span>
      </div>
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
        <motion.div
          className={`h-3 rounded-full ${isFull ? 'bg-status-red' : 'bg-status-green'}`}
          initial={{ width: 0 }}
          animate={{ width: percent + '%' }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {isFull && (
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-status-red font-semibold">Upgrade to monitor more APIs</span>
          <button
            className="ml-2 px-3 py-1 rounded bg-status-green text-white text-xs font-semibold hover:bg-green-600 transition"
            onClick={onUpgrade}
          >
            Upgrade
          </button>
        </div>
      )}
    </div>
  );
} 