
import React from 'react';
import { Agent } from '../data/mockData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PerformanceChartProps {
  agent: Agent;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ agent }) => {
  return (
    <div className="h-56 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={agent.historicalData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="newLeads"
            name="New Leads"
            stroke="#0EA5E9"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="closedLeads"
            name="Closed Leads"
            stroke="#10B981"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
