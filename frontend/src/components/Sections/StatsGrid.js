import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, TrendingUp, Target } from 'lucide-react';

const StatsGrid = ({ stats }) => {
  const statCards = [
    {
      icon: Users,
      label: 'Total Influencers',
      value: stats?.totalInfluencers || 0,
      change: '+12%',
      color: 'purple'
    },
    {
      icon: MessageSquare,
      label: 'Active Campaigns',
      value: stats?.activeCampaigns || 0,
      change: '+5%',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      label: 'Response Rate',
      value: `${stats?.responseRate || 0}%`,
      change: '+8%',
      color: 'green'
    },
    {
      icon: Target,
      label: 'Total Reach',
      value: `${(stats?.totalReach || 0).toLocaleString()}+`,
      change: '+15%',
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
            </div>
            <span className={`text-sm font-medium text-${stat.color}-600 dark:text-${stat.color}-400`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {stat.value}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;