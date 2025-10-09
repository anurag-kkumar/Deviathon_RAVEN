import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, Target, MessageSquare, BarChart, Users, Shield, Zap, Sparkles } from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Search,
      title: "Smart Influencer Discovery",
      description: "AI-powered search across Instagram, YouTube with real-time filtering",
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
      stats: "50K+ Influencers",
      details: [
        "Multi-platform search (Instagram, YouTube, TikTok)",
        "Filter by followers, engagement, location",
        "Real-time audience insights",
        "Niche-specific recommendations"
      ],
      animation: "🔍"
    },
    {
      icon: Target,
      title: "Brand Fit Analysis",
      description: "Deep content analysis with AI-powered brand alignment scoring",
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-500",
      stats: "98% Accuracy",
      details: [
        "Content sentiment analysis",
        "Audience demographic matching",
        "Brand tone compatibility",
        "Authenticity verification"
      ],
      animation: "🎯"
    },
    {
      icon: MessageSquare,
      title: "Automated Outreach",
      description: "Personalized message generation with smart timing and follow-ups",
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
      stats: "3x Response Rate",
      details: [
        "AI-generated personalized messages",
        "Optimal send time detection",
        "Automated follow-up sequences",
        "Response rate optimization"
      ],
      animation: "💬"
    },
    {
      icon: BarChart,
      title: "Campaign Tracking",
      description: "Real-time analytics and performance metrics with ROI tracking",
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-r from-orange-500 to-red-500",
      stats: "Real-time Analytics",
      details: [
        "Campaign performance dashboard",
        "ROI and conversion tracking",
        "Engagement rate monitoring",
        "Custom report generation"
      ],
      animation: "📊"
    }
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const detailVariants = {
    hidden: { 
      opacity: 0,
      x: 50 
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
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
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Powerful Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              For Influencer Success
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className={`relative cursor-pointer group ${
                  activeFeature === index ? 'ring-2 ring-white/20' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                {/* Card */}
                <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 rounded-2xl p-6 border border-white/10 backdrop-blur-sm h-full transition-all duration-500 group-hover:border-white/20">
                  
                  {/* Animated Icon */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-${feature.color.split(' ')[1]}/25`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-300">
                      {feature.stats}
                    </span>
                    <motion.span
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className="text-2xl"
                    >
                      {feature.animation}
                    </motion.span>
                  </div>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 rounded-2xl ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
                  
                  {/* Active Indicator */}
                  {activeFeature === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute -inset-1 ${feature.gradient} rounded-2xl opacity-20 -z-20`}
                    />
                  )}
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                  className={`absolute -top-2 -right-2 w-4 h-4 ${feature.gradient} rounded-full opacity-60 blur-sm`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Details Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              variants={detailVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-3xl p-8 border border-white/10 backdrop-blur-sm h-full"
            >
              <div 
  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-5 blur-3xl -z-10 ${features[activeFeature].gradient}`} 
/>

              <h3 className="text-3xl font-bold text-white mb-4">
                {features[activeFeature].title}
              </h3>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {features[activeFeature].description}
              </p>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {features[activeFeature].details.map((detail, index) => (
                  <motion.li
                    key={detail}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 text-gray-300"
                  >
                    <div className={`w-3 h-3 ${features[activeFeature].gradient} rounded-full flex-shrink-0`} />
                    <span className="text-lg">{detail}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Stats Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-semibold text-sm">
                  {features[activeFeature].stats}
                </span>
              </div>

              {/* Background Glow */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${features[activeFeature].gradient} rounded-full opacity-5 blur-3xl -z-10`} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 bg-white/5 rounded-2xl px-6 py-4 border border-white/10">
            <Shield className="w-6 h-6 text-green-400" />
            <span className="text-gray-300">Trusted by 500+ brands worldwide</span>
            <Users className="w-6 h-6 text-blue-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;