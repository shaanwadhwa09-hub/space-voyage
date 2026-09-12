import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Full dataset matching your hub
const PLANET_DATA = {
  mercury: { name: 'Mercury', gravity: 3.70, color: '#888888', summary: 'The smallest planet and closest to the Sun.' },
  venus: { name: 'Venus', gravity: 8.87, color: '#e3bb76', summary: 'Spinning in opposite direction, Venus is the hottest planet.' },
  earth: { name: 'Earth', gravity: 9.81, color: '#4b9cd3', summary: 'Our home planet, the only place with known life.' },
  mars: { name: 'Mars', gravity: 3.71, color: '#e77d11', summary: 'The dusty, cold desert world of the Red Planet.' },
  jupiter: { name: 'Jupiter', gravity: 24.79, color: '#e0ae6f', summary: 'A giant gas world with a massive gravitational field.' },
  saturn: { name: 'Saturn', gravity: 10.44, color: '#ead6b8', summary: 'Adorned with a dazzling, complex system of icy rings.' },
  uranus: { name: 'Uranus', gravity: 8.69, color: '#bfe4e1', summary: 'An ice giant uniquely rotating on an extreme 90-degree tilt.' },
  neptune: { name: 'Neptune', gravity: 11.15, color: '#274687', summary: 'The most distant planet, cold, dark, and whipped by supersonic winds.' }
};

export default function PlanetDetail() {
  const { id } = useParams();
  const planet = PLANET_DATA[id.toLowerCase()];

  // State for gravity sandbox
  const [objectMass, setObjectMass] = useState(10); // in kg
  const [dropTriggered, setDropTriggered] = useState(false);
  const dropRef = useRef(null);

  if (!planet) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">Planet lost in deep space!</h2>
        <Link to="/planets" className="text-blue-400 underline hover:text-blue-300">Return to Orbit</Link>
      </div>
    );
  }

  // useMemo computes the force of gravity locally to meet syllabus performance expectations
  const gravitationalForce = useMemo(() => {
    return (objectMass * planet.gravity).toFixed(2);
  }, [objectMass, planet.gravity]);

  // Handle the interactive physical drop simulation using useEffect/useRef
  useEffect(() => {
    if (dropTriggered && dropRef.current) {
      const element = dropRef.current;
      // CSS dynamic fallback transition based on gravitational acceleration
      const duration = Math.max(0.2, (2 / planet.gravity)).toFixed(2);
      element.style.transition = `transform ${duration}s cubic-bezier(0.55, 0.085, 0.68, 0.53)`;
      element.style.transform = 'translateY(250px)';
    }
  }, [dropTriggered, planet.gravity]);

  const resetSimulation = () => {
    setDropTriggered(false);
    if (dropRef.current) {
      dropRef.current.style.transition = 'none';
      dropRef.current.style.transform = 'translateY(0px)';
    }
  };

  return (
    <div className="min-h-screen text-white bg-slate-950 p-8">
      <Link to="/planets" className="text-sm text-slate-400 hover:text-white mb-6 inline-block transition-colors">
        ← Back to Solar System
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-6">
        {/* Planet Visual and Enter Animation */}
        <div className="flex flex-col items-center justify-center bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
          <div 
            className="w-48 h-48 rounded-full shadow-2xl transition-transform duration-1000 ease-out hover:scale-110"
            style={{ 
              backgroundColor: planet.color, 
              boxShadow: `0 0 50px ${planet.color}80` 
            }}
          />
          <h1 className="text-4xl font-extrabold mt-6">{planet.name}</h1>
          <p className="text-slate-400 text-center mt-3">{planet.summary}</p>
        </div>

        {/* Physics Lab Component */}
        <div className="bg-slate-900/80 p-8 rounded-2xl border border-blue-900/30">
          <h2 className="text-2xl font-bold mb-4 border-b border-slate-800 pb-2">Gravity Sandbox Lab</h2>
          
          <div className="my-6">
            <label className="block text-slate-400 mb-2">Configure Object Mass: {objectMass} kg</label>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={objectMass} 
              onChange={(e) => { resetSimulation(); setObjectMass(Number(e.target.value)); }}
              className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">PLANETARY ACCELERATION</span>
              <strong className="text-lg text-blue-400">{planet.gravity} m/s²</strong>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">CALCULATED WEIGHT (FORCE)</span>
              <strong className="text-lg text-emerald-400">{gravitationalForce} N</strong>
            </div>
          </div>

          {/* Interactive Simulation Display Area */}
          <div className="relative h-72 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-between p-4">
            <div className="flex justify-between items-start z-10">
              <div ref={dropRef} className="w-8 h-8 rounded bg-red-500 flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                {objectMass}kg
              </div>
              <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded">Altitude: 1000m</span>
            </div>
            
            <div className="border-t-2 border-dashed border-slate-700 pt-2 text-center text-xs text-slate-500 z-0">
              Surface of {planet.name}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => setDropTriggered(true)} className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-500 font-bold rounded-lg transition-colors">
              Initiate Drop Test
            </button>
            <button onClick={resetSimulation} className="py-3 px-6 bg-slate-800 hover:bg-slate-700 font-bold rounded-lg transition-colors border border-slate-700">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}