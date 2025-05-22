
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';

interface MetricsOverviewProps {
  metrics: {
    totalNewLeads: number;
    totalContactedLeads: number;
    totalFollowUpLeads: number;
    totalClosedLeads: number;
    totalRejectedLeads: number;
  };
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  const chartData = [
    { name: 'New', value: metrics.totalNewLeads, color: '#0EA5E9' },
    { name: 'Contacted', value: metrics.totalContactedLeads, color: '#14B8A6' },
    { name: 'Follow Up', value: metrics.totalFollowUpLeads, color: '#6366F1' },
    { name: 'Closed', value: metrics.totalClosedLeads, color: '#10B981' },
    { name: 'Rejected', value: metrics.totalRejectedLeads, color: '#EF4444' },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4">
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Team Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {chartData.map((item) => (
              <div key={item.name} className="bg-white p-4 rounded-lg border text-center">
                <p className="text-sm text-gray-500">{item.name} Leads</p>
                <p className="text-2xl font-bold mt-1" style={{ color: item.color }}>{item.value}</p>
              </div>
            ))}
          </div>
          
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Lead Count">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
