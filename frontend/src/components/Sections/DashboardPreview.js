import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart3, Users, MessageCircle, TrendingUp, Eye, MousePointer } from 'lucide-react';

const DashboardPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [activeTab, setActiveTab] = useState('analytics');

  const metrics = [
    { icon: Users, value: '1,247', label: 'Influencers Found', change: '+12%', color: 'text-blue-400' },
    { icon: MessageCircle, value: '89%', label: 'Response Rate', change: '+8%', color: 'text-green-400' },
    { icon: Eye, value: '2.4M', label: 'Total Reach', change: '+23%', color: 'text-purple-400' },
    { icon: TrendingUp, value: '5.2%', label: 'Engagement Rate', change: '+15%', color: 'text-orange-400' }
  ];

  const campaigns = [
    { name: 'Summer Skincare', progress: 78, status: 'active', influencers: 24 },
    { name: 'Fitness Gear', progress: 45, status: 'active', influencers: 18 },
    { name: 'Eco Fashion', progress: 92, status: 'completed', influencers: 32 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const dashboardVariants = {
    hidden: { 
      opacity: 0,
      rotateX: 15,
      y: 50
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute top-0 left-0 w-full h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-6 py-3 border border-white/10 mb-6"
          >
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold">Live Dashboard</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Real-Time Campaign
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Monitor your influencer campaigns with live metrics, performance insights, and AI-powered recommendations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Preview */}
          <motion.div
            variants={dashboardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            {/* Main Dashboard Card */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-white/10 backdrop-blur-sm shadow-2xl transform hover:scale-105 transition-transform duration-500">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white">Campaign Overview</h3>
                  <p className="text-gray-400">Real-time performance metrics</p>
                </div>
                <div className="flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Live</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      <span className="text-green-400 text-sm font-semibold">{metric.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                    <div className="text-gray-400 text-sm">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Campaign Progress */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-4">Active Campaigns</h4>
                <div className="space-y-3">
                  {campaigns.map((campaign, index) => (
                    <motion.div
                      key={campaign.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium">{campaign.name}</span>
                          <span className="text-gray-400 text-sm">{campaign.influencers} influencers</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${campaign.progress}%` } : {}}
                            transition={{ delay: 1 + index * 0.2, duration: 1 }}
                            className={`h-2 rounded-full ${
                              campaign.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors">
                  New Campaign
                </button>
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors">
                  View Reports
                </button>
              </div>

              {/* Dashboard Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-30 -z-10" />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-500 rounded-lg opacity-60 blur-sm"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-lg opacity-40 blur-sm"
            />
          </motion.div>

          {/* Features List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {[
              {
                icon: TrendingUp,
                title: "Real-time Analytics",
                description: "Live campaign performance metrics with AI-powered insights and predictions"
              },
              {
                icon: MousePointer,
                title: "Interactive Reports",
                description: "Click-through analytics with detailed influencer performance breakdowns"
              },
              {
                icon: BarChart3,
                title: "ROI Tracking",
                description: "Comprehensive return on investment calculations and performance forecasting"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Share dashboards and reports with your team for seamless collaboration"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="flex items-start space-x-4 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="pt-6"
            >
              <button className="group w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3">
                <span>Explore Dashboard</span>
                <MousePointer className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;