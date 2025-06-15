import { motion } from 'framer-motion';
import { API, MigrationPlan } from '@/lib/types';
import { useAPI } from '@/contexts/APIContext';

interface SmartRecommendationsProps {
  api: API;
}

export default function SmartRecommendations({ api }: SmartRecommendationsProps) {
  const { getMigrationPlan } = useAPI();
  const migrationPlan = getMigrationPlan(api.id);

  if (!migrationPlan) return null;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Smart Recommendations</h3>

      {/* Action Required Section */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Action Required</h4>
        <div className="space-y-3">
          {migrationPlan.steps.map((step, index) => (
            <motion.div
              key={step.order}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-lg bg-gray-700/50"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-sm font-medium">
                  {step.order}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{step.description}</p>
                  {step.codeSnippet && (
                    <pre className="mt-2 p-2 rounded bg-gray-800 text-xs overflow-x-auto">
                      <code>{step.codeSnippet}</code>
                    </pre>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Estimated time: {step.estimatedTime}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Migration Timeline */}
      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-3">Migration Timeline</h4>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />

          {/* Milestones */}
          <div className="space-y-6">
            {migrationPlan.timeline.milestones.map((milestone, index) => (
              <motion.div
                key={milestone.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-10"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-status-green" />
                </div>

                <div>
                  <p className="text-sm font-medium">{milestone.date}</p>
                  <p className="text-sm text-gray-400 mt-1">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Migration Plan Button */}
      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-status-green hover:bg-status-green/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Plan Migration
        </motion.button>
      </div>
    </div>
  );
} 