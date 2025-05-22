
import React, { useState } from 'react';
import { mockAgents, getTeamMetrics } from '../data/mockData';
import { exportToCSV, exportToPDF, filterAgentsByTimeRange } from '../utils/exportUtils';
import FilterBar from '../components/FilterBar';
import MetricsOverview from '../components/MetricsOverview';
import AgentCard from '../components/AgentCard';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year' | 'all'>('month');
  const [agents, setAgents] = useState(mockAgents);
  const metrics = getTeamMetrics();

  const handleTimeRangeChange = (range: 'day' | 'week' | 'month' | 'year' | 'all') => {
    setTimeRange(range);
    const filteredAgents = filterAgentsByTimeRange(mockAgents, range);
    setAgents(filteredAgents);
  };

  const handleExportCSV = () => {
    exportToCSV(agents, timeRange);
  };

  const handleExportPDF = () => {
    exportToPDF(agents, timeRange);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Agent Performance Dashboard</h1>
        <p className="text-gray-500">Track and analyze your team's performance metrics</p>
      </div>

      <FilterBar
        timeRange={timeRange}
        setTimeRange={handleTimeRangeChange}
        onExportCSV={handleExportCSV}
        onExportPDF={handleExportPDF}
      />

      <MetricsOverview metrics={metrics} />

      <h2 className="text-2xl font-bold mb-4">Agent Performance</h2>
      <div className="grid grid-cols-1 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
