import { motion } from 'framer-motion';
import {
  TrophyIcon,
  StarIcon,
  UserCircleIcon,
  ChartBarIcon,
  FireIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

// Sample data
const badges = [
  {
    id: 1,
    name: 'Early Adopter',
    description: 'Joined APIWatch in the first month',
    icon: '🚀',
    rarity: 'rare',
    earnedAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'API Expert',
    description: 'Monitored 10+ APIs for 3 months',
    icon: '⭐',
    rarity: 'epic',
    earnedAt: '2024-02-20',
  },
  {
    id: 3,
    name: 'Community Helper',
    description: 'Received 50+ helpful votes',
    icon: '🤝',
    rarity: 'rare',
    earnedAt: '2024-03-01',
  },
  {
    id: 4,
    name: 'Change Detector',
    description: 'Reported 5 API changes before official announcements',
    icon: '🔍',
    rarity: 'legendary',
    earnedAt: '2024-03-15',
  },
];

const leaderboard = [
  {
    id: 1,
    name: 'John Doe',
    points: 1250,
    rank: 1,
    badges: 8,
    contributions: 45,
  },
  {
    id: 2,
    name: 'Jane Smith',
    points: 980,
    rank: 2,
    badges: 6,
    contributions: 38,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    points: 850,
    rank: 3,
    badges: 5,
    contributions: 32,
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    points: 720,
    rank: 4,
    badges: 4,
    contributions: 28,
  },
  {
    id: 5,
    name: 'Alex Brown',
    points: 680,
    rank: 5,
    badges: 4,
    contributions: 25,
  },
];

const achievements = [
  {
    id: 1,
    name: 'API Explorer',
    description: 'Monitor your first API',
    points: 100,
    progress: 100,
    completed: true,
  },
  {
    id: 2,
    name: 'Community Builder',
    description: 'Start 5 discussions',
    points: 200,
    progress: 60,
    completed: false,
  },
  {
    id: 3,
    name: 'Change Agent',
    description: 'Report 3 API changes',
    points: 300,
    progress: 33,
    completed: false,
  },
  {
    id: 4,
    name: 'Knowledge Sharer',
    description: 'Write 2 guides',
    points: 400,
    progress: 0,
    completed: false,
  },
];

export default function Gamification() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            Community Achievements
          </h1>
          <p className="text-gray-400 mb-6">
            Earn badges, climb the leaderboard, and contribute to the APIWatch
            community.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <TrophyIcon className="w-5 h-5" />
              <span>4 Badges Earned</span>
            </div>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5" />
              <span>Rank #12</span>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5" />
              <span>850 Points</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Your Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="text-4xl mb-4">{badge.icon}</div>
              <h3 className="text-white font-medium mb-2">{badge.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{badge.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span
                  className={`px-2 py-1 rounded-full ${
                    badge.rarity === 'legendary'
                      ? 'bg-purple-500/20 text-purple-400'
                      : badge.rarity === 'epic'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {badge.rarity}
                </span>
                <span className="text-gray-400">Earned {badge.earnedAt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Leaderboard</h2>
        <div className="space-y-4">
          {leaderboard.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      user.rank === 1
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : user.rank === 2
                        ? 'bg-gray-400/20 text-gray-400'
                        : user.rank === 3
                        ? 'bg-yellow-700/20 text-yellow-600'
                        : 'bg-gray-600/20 text-gray-400'
                    }`}
                  >
                    {user.rank}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{user.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{user.badges} badges</span>
                      <span>•</span>
                      <span>{user.contributions} contributions</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrophyIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">{user.points}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Achievements</h2>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-medium">{achievement.name}</h3>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">{achievement.points}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{achievement.progress}%</span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full">
                  <div
                    className={`h-full rounded-full ${
                      achievement.completed
                        ? 'bg-status-green'
                        : 'bg-primary'
                    }`}
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 