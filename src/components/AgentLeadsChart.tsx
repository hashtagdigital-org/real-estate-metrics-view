
import React from 'react';
import { Agent } from '../data/mockData';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface AgentLeadsChartProps {
  agent: Agent;
}

const AgentLeadsChart: React.FC<AgentLeadsChartProps> = ({ agent }) => {
  // Prepare lead status data for the pie chart
  const leadStatusData = [
    { name: 'New', value: agent.performance.newLeads, color: '#0EA5E9' },
    { name: 'Contacted', value: agent.performance.contactedLeads, color: '#14B8A6' },
    { name: 'Follow Up', value: agent.performance.followUpLeads, color: '#6366F1' },
    { name: 'Closed', value: agent.performance.closedLeads, color: '#10B981' },
    { name: 'Rejected', value: agent.performance.rejectedLeads, color: '#EF4444' },
  ];
  
  // Color settings for the pie chart
  const COLORS = ['#0EA5E9', '#14B8A6', '#6366F1', '#10B981', '#EF4444'];
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={leadStatusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {leadStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value} leads`, name]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgentLeadsChart;
