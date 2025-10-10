import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, BarChart3, MessageSquare } from 'lucide-react';
import Header from '../components/Sections/Header.js';
import HowItWorks from '../components/Sections/HowItWorks.js';
import DashboardPreview from '../components/Sections/DashboardPreview.js';
import Testimonials from '../components/Sections/Testimonials.js';
import CTA from '../components/Sections/CTA.js';
import Footer from '../components/Sections/Footer.js';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ influencers: 0, accuracy: 0, roi: 0 }); // Backend data

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate API call for stats
    fetchStatsData();
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Backend se stats data fetch karega
  const fetchStatsData = async () => {
    try {
      // Temporary mock data - backend integration ke baad replace hoga
      const mockStats = {
        influencers: 50000,
        accuracy: 98,
        roi: 3
      };
      setStats(mockStats);
      
      // Actual backend call:
      // const response = await fetch('/api/stats');
      // const data = await response.json();
      // setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // 3D floating particles background
  const FloatingParticles = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-white text-4xl font-bold"
        >
          RAVEN
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      <FloatingParticles />
      {/* Animated Background Gradient */}
      <div 
        className="fixed inset-0 opacity-30 transition-all duration-1000"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.15), transparent 80%)`
        }}
      />

      {/* Hero Section with Video */}
      <section className="relative z-10 px-6 py-20 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Left: Text */}
            <div className="flex-1 text-center md:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Turn Influencer
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Into Data-Driven Success
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Discover, analyze, and reach the perfect influencers automatically with AI-powered precision.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-20"
              >
                <button 
                  onClick={() => window.location.href = '/brand-setup'}
                  className="group bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group border border-gray-600 px-8 py-4 rounded-full font-semibold text-lg hover:border-purple-400 hover:text-purple-300 transition-all duration-300 flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </motion.div>
            </div>
            {/* Right: Video */}
            <div className="flex-1 flex justify-center items-center">
              <div className="w-[450px] h-[450px] bg-gray-900 border-4 border-purple-500 rounded-2xl shadow-lg flex items-center justify-center">
                <video
                  src="https://media.istockphoto.com/id/1448443986/video/creator-hold-magnet-and-megaphone-on-cellphone.mp4?s=mp4-640x640-is&k=20&c=5vgTL6nD7ltkk68ccB92geviHD2EvJopSuFbqwiijag="
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-xl"
                  style={{ animation: 'fadeIn 1s' }}
                />
              </div>
            </div>
          </div>

          {/* Components */}
          <HowItWorks />
          <DashboardPreview />
          <Testimonials />
          <CTA />
          
          {/* Stats - Backend Data Integrated */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20"
          >
            {[
              { icon: Users, number: `${(stats.influencers / 1000).toFixed(0)}K+`, label: 'Influencers' },
              { icon: Star, number: `${stats.accuracy}%`, label: 'Match Accuracy' },
              { icon: BarChart3, number: `${stats.roi}x`, label: 'ROI Increase' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
         
        </div>
      </section>
    </div>
  );
};

export default Home;
