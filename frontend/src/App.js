import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Sections/Header.js';
import Home from './pages/Home.js';
// import BrandSetup from './pages/BrandSetup';
import Dashboard from './pages/Dashboard.js';
import Influencers from './pages/Influencers.js';
import Outreach from './pages/Outreach.js';
// import Analytics from './pages/Analytics';
import Footer from './components/Sections/Footer.js';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/influencers" element={<Influencers />} />
          <Route path="/outreach" element={<Outreach />} />
          <Route path="/footer" element={<Footer />} />
          {/* <Route path="/brand-setup" element={<BrandSetup />} />
          <Route path="/analytics" element={<Analytics />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;