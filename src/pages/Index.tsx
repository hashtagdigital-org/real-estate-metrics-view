
import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { FileText, File } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="text-center mb-6 md:mb-8 pt-4 md:pt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-600">Real Estate CRM</h1>
          <p className="text-base md:text-lg text-gray-600 mt-2">Agent Performance Dashboard</p>
        </div>
        
        <div className="grid place-items-center mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border w-full max-w-md">
            <h2 className="text-lg font-medium mb-3">Dashboard Features:</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />
                <span>Export agent details as CSV</span>
              </li>
              <li className="flex items-center gap-2">
                <File className="h-4 w-4 text-indigo-600" />
                <span>Export agent details as PDF</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <span>View detailed agent performance metrics</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link 
                to="/dashboard" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center block"
              >
                View Full Dashboard
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;
