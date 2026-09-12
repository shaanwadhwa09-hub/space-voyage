import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 text-white bg-slate-950 relative">
      
      <div className="relative mb-6">
        <h1 className="text-9xl font-black tracking-widest text-slate-900 select-none animate-pulse">404</h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">
          🧑‍🚀
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">Telemetry Signal Lost!</h2>
      <p className="text-slate-400 max-w-md text-sm mb-8 leading-relaxed">
        You have drifted beyond the boundaries of our charted solar system. Your coordinates do not match any known planetary orbits.
      </p>

      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 font-bold rounded-lg text-sm transition-all duration-300 shadow-lg shadow-blue-600/20"
      >
        Warp Back to Safety (Home)
      </Link>
    </div>
  );
}