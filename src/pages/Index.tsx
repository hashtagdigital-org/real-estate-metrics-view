
import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="text-center mb-6 md:mb-8 pt-4 md:pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-600">Real Estate CRM</h1>
          <p className="text-base md:text-lg text-gray-600 mt-2">Agent Performance Dashboard</p>
        </div>
        
        <div className="grid place-items-center">
          <Link 
            to="/dashboard" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base"
          >
            View Full Dashboard
          </Link>
        </div>
        
        <div className="mt-8 md:mt-12">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;
