import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state on component mount
  useEffect(() => {
    const status = localStorage.getItem('astronautLoggedIn') === 'true';
    setIsLoggedIn(status);
  }, []);

  // Handle Protected Route Authentication
  const handleLoginToggle = () => {
    if (isLoggedIn) {
      localStorage.removeItem('astronautLoggedIn');
      setIsLoggedIn(false);
    } else {
      localStorage.setItem('astronautLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/control-room');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col items-center">
      
      {/* CSS-based Space-Time Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
             backgroundSize: '50px 50px',
             transform: 'perspective(500px) rotateX(60deg)',
             transformOrigin: 'top center'
           }}>
      </div>

      <div className="z-10 text-center mt-24 px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Cosmic SPA
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Interactive Space-Time Orbit Lab. Explore planetary telemetry and calculate physical gravitational forces.
        </p>

        {/* Navigation & Auth Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <Link to="/planets" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/30">
            Explore Solar System
          </Link>
          <button 
            onClick={handleLoginToggle}
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-bold transition-all"
          >
            {isLoggedIn ? "Logout of Control Room" : "Astronaut Login"}
          </button>
        </div>

        {/* Responsive Grid Cards (Syllabus Requirement) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2 text-blue-400">Dynamic Routing</h3>
            <p className="text-sm text-slate-400">Navigate seamless views using React Router with dynamic parameters and 404 handling.</p>
          </div>
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2 text-emerald-400">Physics Sandbox</h3>
            <p className="text-sm text-slate-400">Calculate gravitational pulls in real-time with optimized useMemo and useEffect hooks.</p>
          </div>
          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2 text-purple-400">Secure Access</h3>
            <p className="text-sm text-slate-400">Protected route authentication verified via local browser storage states.</p>
          </div>
        </div>
      </div>
    </div>
  );
}