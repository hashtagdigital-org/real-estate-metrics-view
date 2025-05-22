
import React, { useState } from 'react';
import { mockAgents, getTeamMetrics } from '../data/mockData';
import { exportToCSV, exportToPDF, filterAgentsByTimeRange, filterAgentsByCustomRange } from '../utils/exportUtils';
import FilterBar from '../components/FilterBar';
import MetricsOverview from '../components/MetricsOverview';
import AgentsList from '../components/AgentsList';
import AgentDetail from '../components/AgentDetail';
import DateRangePicker from '../components/DateRangePicker';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year' | 'all' | 'custom'>('month');
  const [agents, setAgents] = useState(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  
  const metrics = getTeamMetrics();

  const handleTimeRangeChange = (range: 'day' | 'week' | 'month' | 'year' | 'all' | 'custom') => {
    setTimeRange(range);
    
    if (range === 'custom') {
      setShowDateRangePicker(true);
      return;
    }
    
    const filteredAgents = filterAgentsByTimeRange(mockAgents, range);
    setAgents(filteredAgents);
    setSelectedAgent(null);
  };
  
  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    if (range.from && range.to) {
      const filteredAgents = filterAgentsByCustomRange(mockAgents, range.from, range.to);
      setAgents(filteredAgents);
    }
  };

  const handleExportCSV = () => {
    exportToCSV(agents, timeRange);
  };

  const handleExportPDF = () => {
    exportToPDF(agents, timeRange);
  };
  
  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId);
  };
  
  const handleBackToOverview = () => {
    setSelectedAgent(null);
  };

  const selectedAgentData = selectedAgent 
    ? agents.find(agent => agent.id === selectedAgent) 
    : null;

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
      
      {showDateRangePicker && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Custom Date Range</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDateRangePicker(false)}
            >
              Close
            </Button>
          </div>
          <DateRangePicker 
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>
      )}

      {!selectedAgent ? (
        <>
          <MetricsOverview metrics={metrics} />
          <h2 className="text-2xl font-bold mb-4">Agent Performance</h2>
          <AgentsList agents={agents} onAgentSelect={handleAgentSelect} />
        </>
      ) : (
        selectedAgentData && (
          <AgentDetail 
            agent={selectedAgentData} 
            onBack={handleBackToOverview}
            timeRange={timeRange}
          />
        )
      )}
    </div>
  );
};

export default Dashboard;
