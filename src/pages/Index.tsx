
import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-6">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-indigo-600">Real Estate CRM</h1>
          <p className="text-lg text-gray-600 mt-2">Agent Performance Dashboard</p>
        </div>
        
        <div className="grid place-items-center">
          <Link 
            to="/dashboard" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View Full Dashboard
          </Link>
        </div>
        
        <div className="mt-12">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;
