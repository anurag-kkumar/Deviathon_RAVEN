import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'API', href: '#api' },
      { name: 'Integrations', href: '#integrations' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Partners', href: '#partners' }
    ],
    legal: [
      { name: 'Privacy', href: '#privacy' },
      { name: 'Terms', href: '#terms' },
      { name: 'Security', href: '#security' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 mb-4"
            >

            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center" style={{ borderRadius: '25%' }}>
            <img src="https://i.postimg.cc/9QK2sdm4/Whats-App-Image-2025-10-09-at-22-04-35-d755a2a6.jpg" alt="Logo" className="w-13 h-13 object-cover border-2 border-white" style={{ borderRadius: '25%' }} />
            </div>
            
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mb-6 max-w-md leading-relaxed"
            >
              AI-powered influencer marketing platform that helps brands discover, analyze, and collaborate with perfect influencers at scale.
            </motion.p>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([category, items], columnIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + columnIndex * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4 capitalize">{category}</h3>
              <ul className="space-y-3">
                {items.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + columnIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-400 text-sm"
          >
            © 2025 Raven. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-6 text-sm text-gray-400"
          >
            <span>Made for Brands and Influencers</span>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute bottom-20 left-10 w-4 h-4 bg-purple-500/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1,
        }}
        className="absolute bottom-32 right-20 w-3 h-3 bg-blue-500/30 rounded-full blur-sm"
      />
    </footer>
  );
};

export default Footer;
