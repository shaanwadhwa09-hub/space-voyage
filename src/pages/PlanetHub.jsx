import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const PLANET_DATA = [
  { id: 'mercury', name: 'Mercury', type: 'Rocky', gravity: 3.70, mass: '3.30 x 10^23 kg', color: '#888888', description: 'The smallest planet and closest to the Sun.' },
  { id: 'venus', name: 'Venus', type: 'Rocky', gravity: 8.87, mass: '4.87 x 10^24 kg', color: '#e3bb76', description: 'Spinning in opposite direction, Venus is the hottest planet.' },
  { id: 'earth', name: 'Earth', type: 'Rocky', gravity: 9.81, mass: '5.97 x 10^24 kg', color: '#4b9cd3', description: 'Our home planet, the only place with known life.' },
  { id: 'mars', name: 'Mars', type: 'Rocky', gravity: 3.71, mass: '6.39 x 10^23 kg', color: '#e77d11', description: 'The dusty, cold desert world with a thin atmosphere.' },
  { id: 'jupiter', name: 'Gas Giant', type: 'Gas Giant', gravity: 24.79, mass: '1.90 x 10^27 kg', color: '#e0ae6f', description: 'A giant gas world more than twice as massive than others combined.' },
  { id: 'saturn', name: 'Gas Giant', type: 'Gas Giant', gravity: 10.44, mass: '5.68 x 10^26 kg', color: '#ead6b8', description: 'Adorned with a dazzling, complex system of icy rings.' },
  { id: 'uranus', name: 'Ice Giant', type: 'Gas Giant', gravity: 8.69, mass: '8.68 x 10^25 kg', color: '#bfe4e1', description: 'An ice giant uniquely rotating on an extreme 90-degree tilt.' },
  { id: 'neptune', name: 'Ice Giant', type: 'Gas Giant', gravity: 11.15, mass: '1.02 x 10^26 kg', color: '#274687', description: 'The most distant planet, cold, dark, and whipped by supersonic winds.' }
];

export default function PlanetHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredPlanets = useMemo(() => {
    return PLANET_DATA.filter((planet) => {
      const matchesSearch = planet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All' || planet.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Planetary Exploration Deck</h1>
        <p className="text-slate-400">Search and filter active planets across our solar system to inspect telemetry details.</p>
      </header>

      <div className="max-w-6xl mx-auto bg-slate-900/60 border border-slate-800 p-6 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/2">
          <label className="block text-xs text-slate-500 font-bold uppercase mb-2">Search Space Telemetry</label>
          <input 
            type="text"
            placeholder="Type planet name (e.g. Earth)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none transition text-sm"
          />
        </div>

        <div className="w-full md:w-auto flex flex-col items-start self-start md:self-center">
          <label className="block text-xs text-slate-500 font-bold uppercase mb-2">Classification filter</label>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            {['All', 'Rocky', 'Gas Giant'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition ${
                  selectedType === type 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto">
        {filteredPlanets.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-500 text-lg">No telemetry records match your search coordinates.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedType('All'); }}
              className="mt-4 px-4 py-2 bg-indigo-600/20 border border-indigo-500 text-indigo-400 text-xs rounded hover:bg-indigo-600 hover:text-white transition"
            >
              Reset Search Scans
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlanets.map((planet) => (
              <div 
                key={planet.id}
                className="group relative bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.03] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-center mb-6 pt-4">
                    <div 
                      className="w-24 h-24 rounded-full transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110"
                      style={{ 
                        backgroundColor: planet.color,
                        boxShadow: `0 0 35px ${planet.color}80` 
                      }}
                    />
                  </div>

                  <span className={`text-[10px] font-extrabold uppercase px-2 py-1 rounded-full ${
                    planet.type === 'Rocky' ? 'bg-amber-950/40 text-amber-400 border border-amber-900/50' : 'bg-sky-950/40 text-sky-400 border border-sky-900/50'
                  }`}>
                    {planet.type}
                  </span>
                  
                  <h2 className="text-xl font-bold mt-3 mb-2">{planet.name}</h2>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 h-12 overflow-hidden line-clamp-3">
                    {planet.description}
                  </p>
                </div>

                <Link 
                  to={`/planets/${planet.id}`}
                  className="w-full text-center py-2.5 bg-slate-950 hover:bg-indigo-600 border border-slate-800 hover:border-indigo-500 rounded-lg text-xs font-bold transition duration-300 text-slate-300 hover:text-white mt-auto"
                >
                  Inspect Gravity Orbit →
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}