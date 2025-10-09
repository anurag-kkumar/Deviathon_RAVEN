import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings, Search, MessageCircle, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  const steps = [
    {
      icon: Settings,
      title: "Brand Setup",
      description: "Tell us about your brand, target audience, and campaign goals",
      color: "from-purple-500 to-pink-500",
      features: ["Product Details", "Target Audience", "Brand Tone", "Campaign Goals"]
    },
    {
      icon: Search,
      title: "AI Discovery & Analysis",
      description: "Our AI finds and analyzes influencers for perfect brand alignment",
      color: "from-blue-500 to-cyan-500",
      features: ["Content Analysis", "Brand Fit Score", "Audience Insights", "Authenticity Check"]
    },
    {
      icon: MessageCircle,
      title: "Personalized Outreach",
      description: "Automated personalized messages that actually get responses",
      color: "from-green-500 to-emerald-500",
      features: ["Custom Messages", "Smart Timing", "Auto Follow-ups", "Response Tracking"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { 
      rotate: -180,
      scale: 0 
    },
    visible: { 
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-6 py-3 border border-white/10 mb-6"
          >
            <Rocket className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold">How It Works</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              From Setup to
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Success in 3 Steps
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered platform transforms influencer marketing from guesswork to data-driven precision
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative"
        >
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full opacity-50" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative group"
            >
              {/* Step Number */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border-2 border-white/20 flex items-center justify-center text-white font-bold text-lg z-20 group-hover:scale-110 transition-transform duration-300"
              >
                {index + 1}
              </motion.div>

              {/* Step Card */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 rounded-3xl p-8 border border-white/10 backdrop-blur-sm group-hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:scale-105 h-full">
                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-6 transition-transform duration-300`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 text-center mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.2 + featureIndex * 0.1 }}
                      className="flex items-center space-x-3 text-gray-300 group-hover:text-white transition-colors"
                    >
                      <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full`} />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Hover Effect Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
                className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${step.color} rounded-full opacity-60 blur-sm`}
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.7
                }}
                className={`absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r ${step.color} rounded-full opacity-40 blur-sm`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <button className="group bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto">
            <span>Start Your First Campaign</span>
            <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-gray-500 mt-4 text-sm">
            No credit card required • Setup in 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;