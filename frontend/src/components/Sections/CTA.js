import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Zap, Shield, CheckCircle, ArrowRight, Star, Calendar } from 'lucide-react';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      alert('Welcome to Raven! Check your email for next steps.');
    }, 2000);
  };

  const features = [
    { icon: Zap, text: 'Setup in 5 minutes', color: 'text-yellow-400' },
    { icon: Shield, text: 'No credit card required', color: 'text-green-400' },
    { icon: Rocket, text: 'Start with 10 free credits', color: 'text-purple-400' }
  ];

  const stats = [
    { value: '50K+', label: 'Influencers' },
    { value: '98%', label: 'Accuracy' },
    { value: '3x', label: 'Avg. ROI' },
    { value: '500+', label: 'Brands' }
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
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
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
          className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 2,
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        
        {/* Floating Stars */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3 border border-white/20 mb-6 backdrop-blur-sm"
            >
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Limited Time Offer</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Ready to Transform Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Influencer Marketing?
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join 500+ brands already using Raven to find perfect influencers, automate outreach, and drive real results. Start free today.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Free Plan */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-yellow-400/30 transition-all duration-300"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Start Free</h3>
                <div className="text-4xl font-bold text-white mb-2">$0</div>
                <div className="text-gray-400">forever</div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  '10 free outreach credits',
                  'AI influencer discovery',
                  'Basic analytics',
                  'Email support'
                ].map((feature, index) => (
                  <li key={feature} className="flex items-center space-x-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Starting...</span>
                  </>
                ) : (
                  <>
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
                <div className="text-4xl font-bold text-white mb-2">$99</div>
                <div className="text-gray-400">per month</div>
              </div>

              <ul className="space-y-3 mb-6">
                {[
                  'Unlimited outreach credits',
                  'Advanced AI analytics',
                  'Priority support',
                  'Custom workflows',
                  'Team collaboration'
                ].map((feature, index) => (
                  <li key={feature} className="flex items-center space-x-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 border border-white/20 hover:border-white/40">
                Start 14-Day Trial
              </button>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2 border border-white/10"
              >
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className="text-gray-300 text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badge */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
              <Shield className="w-4 h-4" />
              <span>Secure onboarding • 7-day free trial • Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;