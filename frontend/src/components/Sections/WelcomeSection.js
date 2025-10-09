import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const WelcomeSection = ({ brandData }) => {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  let greeting = 'Welcome';

  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-white"
    >
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {greeting}, {brandData?.name || 'Team'}!
          </h1>
          <p className="text-purple-100 text-lg mb-4">
            Here's what's happening with your influencer campaigns today.
          </p>
          <div className="flex items-center space-x-2 text-purple-200">
            <Calendar className="w-4 h-4" />
            <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
        >
          <div className="text-2xl font-bold">Live</div>
          <div className="text-sm">Campaigns Active</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeSection;