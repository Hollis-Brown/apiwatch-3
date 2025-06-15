import { motion } from 'framer-motion';

export default function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 bg-gray-900 rounded-xl shadow-inner mt-4 text-center"
    >
      <p className="text-xs text-gray-400">
        Join <span className="font-bold text-white">2,847</span> developers monitoring APIs
      </p>
    </motion.div>
  );
} 