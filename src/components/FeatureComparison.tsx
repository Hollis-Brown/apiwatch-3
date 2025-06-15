import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const features = [
  { name: 'Monitor APIs', free: '5', pro: '50', enterprise: 'Unlimited' },
  { name: 'Check Frequency', free: 'Daily', pro: 'Hourly', enterprise: 'Real-time' },
  { name: 'Email Alerts', free: true, pro: true, enterprise: true },
  { name: 'Slack Integration', free: false, pro: true, enterprise: true },
  { name: 'Discord Integration', free: false, pro: true, enterprise: true },
  { name: 'Team Features', free: false, pro: false, enterprise: true },
];

export default function FeatureComparison() {
  return (
    <div className="w-full p-4 bg-gray-900 rounded-xl shadow-inner mt-4">
      <h3 className="text-xs font-semibold text-gray-400 mb-4">Feature Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2">Feature</th>
              <th className="text-center py-2">Free</th>
              <th className="text-center py-2">Pro</th>
              <th className="text-center py-2">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.name} className="border-b border-gray-700">
                <td className="py-2">{feature.name}</td>
                <td className="text-center py-2">
                  {typeof feature.free === 'boolean' ? (
                    feature.free ? <CheckIcon className="w-4 h-4 text-status-green mx-auto" /> : <XMarkIcon className="w-4 h-4 text-status-red mx-auto" />
                  ) : (
                    feature.free
                  )}
                </td>
                <td className="text-center py-2">
                  {typeof feature.pro === 'boolean' ? (
                    feature.pro ? <CheckIcon className="w-4 h-4 text-status-green mx-auto" /> : <XMarkIcon className="w-4 h-4 text-status-red mx-auto" />
                  ) : (
                    feature.pro
                  )}
                </td>
                <td className="text-center py-2">
                  {typeof feature.enterprise === 'boolean' ? (
                    feature.enterprise ? <CheckIcon className="w-4 h-4 text-status-green mx-auto" /> : <XMarkIcon className="w-4 h-4 text-status-red mx-auto" />
                  ) : (
                    feature.enterprise
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 