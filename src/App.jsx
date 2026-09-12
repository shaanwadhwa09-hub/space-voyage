import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// We will create these page files in the next step
import Home from './pages/Home';
import PlanetHub from './pages/PlanetHub';
import PlanetDetail from './pages/PlanetDetail';
import NotFound from './pages/NotFound';

// Protected Route Wrapper (Meets Syllabus Requirement)
const ProtectedRoute = ({ children }) => {
  const isAstronaut = localStorage.getItem('astronautLoggedIn') === 'true';
  return isAstronaut ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planets" element={<PlanetHub />} />
        <Route path="/planets/:id" element={<PlanetDetail />} />
        
        {/* Protected NASA API Route */}
        <Route 
          path="/control-room" 
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <h1 className="text-2xl font-bold">NASA APOD Control Room (Authorized Access)</h1>
              </div>
            </ProtectedRoute>
          } 
        />
        
        {/* Custom 404 Wildcard Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}