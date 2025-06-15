import { motion } from 'framer-motion';
import { API } from '@/lib/types';

interface APIHealthScoreProps {
  api: API;
}

const getRiskColor = (score: number) => {
  if (score >= 80) return 'bg-status-red';
  if (score >= 50) return 'bg-status-yellow';
  return 'bg-status-green';
};

const getRiskLabel = (score: number) => {
  if (score >= 80) return 'High Risk';
  if (score >= 50) return 'Medium Risk';
  return 'Low Risk';
};

export default function APIHealthScore({ api }: APIHealthScoreProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">API Health Score</h3>
      
      {/* Health Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Overall Health</span>
          <span className="text-sm font-medium">{100 - api.healthScore}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${100 - api.healthScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full ${getRiskColor(api.healthScore)}`}
          />
        </div>
      </div>

      {/* Risk Timeline */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-400">Deprecation Risk Timeline</h4>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Current</span>
            <span className="text-sm font-medium">{getRiskLabel(api.deprecationRisk.current)}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${api.deprecationRisk.current}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${getRiskColor(api.deprecationRisk.current)}`}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">6 Months</span>
            <span className="text-sm font-medium">{getRiskLabel(api.deprecationRisk.sixMonths)}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${api.deprecationRisk.sixMonths}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className={`h-full ${getRiskColor(api.deprecationRisk.sixMonths)}`}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">12 Months</span>
            <span className="text-sm font-medium">{getRiskLabel(api.deprecationRisk.twelveMonths)}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${api.deprecationRisk.twelveMonths}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
              className={`h-full ${getRiskColor(api.deprecationRisk.twelveMonths)}`}
            />
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="mt-6 space-y-4">
        <h4 className="text-sm font-medium text-gray-400">Risk Factors</h4>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Last Major Update</span>
              <span className="text-sm text-gray-400">
                {new Date(api.lastMajorUpdate).toLocaleDateString()}
              </span>
            </div>
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Community Activity</span>
              <span className="text-sm text-gray-400">{api.communityActivity}%</span>
            </div>
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${api.communityActivity}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-purple-500"
              />
            </div>
          </div>
        </div>

        {api.officialStatements.length > 0 && (
          <div className="mt-4">
            <h5 className="text-sm font-medium mb-2">Official Statements</h5>
            <ul className="space-y-2">
              {api.officialStatements.map((statement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-gray-400"
                >
                  {statement}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 