
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
  BarChart,
  Bar,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AgentActivityChartProps {
  agent: Agent;
}

const AgentActivityChart: React.FC<AgentActivityChartProps> = ({ agent }) => {
  // In a real app, this would come from the agent data
  const activityData = [
    { day: 'Mon', hours: 8.2, actions: 42 },
    { day: 'Tue', hours: 7.5, actions: 38 },
    { day: 'Wed', hours: 8.0, actions: 45 },
    { day: 'Thu', hours: 7.8, actions: 40 },
    { day: 'Fri', hours: 6.5, actions: 35 },
    { day: 'Sat', hours: 4.2, actions: 24 },
    { day: 'Sun', hours: 2.1, actions: 12 },
  ];

  // In a real app, this would come from the agent data
  const monthlyData = [
    { month: 'Jan', hours: 160, actions: 820, viewings: 12 },
    { month: 'Feb', hours: 168, actions: 780, viewings: 14 },
    { month: 'Mar', hours: 175, actions: 830, viewings: 18 },
    { month: 'Apr', hours: 182, actions: 890, viewings: 22 },
    { month: 'May', hours: 170, actions: 820, viewings: 20 },
    { month: 'Jun', hours: 165, actions: 780, viewings: 15 },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 w-[300px] mx-auto">
          <TabsTrigger value="weekly">Weekly Activity</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" stroke="#0EA5E9" />
                <YAxis yAxisId="right" orientation="right" stroke="#6366F1" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="hours" name="Hours Active" fill="#0EA5E9" />
                <Bar yAxisId="right" dataKey="actions" name="Actions Taken" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="monthly">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  name="Hours Active" 
                  stroke="#0EA5E9" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="viewings" 
                  name="Viewings" 
                  stroke="#10B981" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentActivityChart;
