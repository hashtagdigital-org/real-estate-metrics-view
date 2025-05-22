
import React from 'react';
import { Agent } from '../data/mockData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import PerformanceChart from './PerformanceChart';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (metric: string, value: number) => {
    if (metric === 'conversionRate') {
      return value > 30 ? 'bg-green-100 text-green-800' : 
             value > 20 ? 'bg-yellow-100 text-yellow-800' : 
             'bg-red-100 text-red-800';
    } else if (metric === 'responseTime') {
      return value < 2 ? 'bg-green-100 text-green-800' : 
             value < 3 ? 'bg-yellow-100 text-yellow-800' : 
             'bg-red-100 text-red-800';
    }
    return '';
  };

  return (
    <Card className="mb-6 border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className={getStatusColor('conversionRate', agent.performance.conversionRate)}>
            {agent.performance.conversionRate}% Conversion
          </Badge>
          <Badge variant="outline" className={getStatusColor('responseTime', agent.performance.responseTime)}>
            {agent.performance.responseTime}h Response
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">New Leads</TableCell>
                  <TableCell className="text-right">{agent.performance.newLeads}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Contacted</TableCell>
                  <TableCell className="text-right">{agent.performance.contactedLeads}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Follow Up</TableCell>
                  <TableCell className="text-right">{agent.performance.followUpLeads}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Closed</TableCell>
                  <TableCell className="text-right">{agent.performance.closedLeads}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rejected</TableCell>
                  <TableCell className="text-right">{agent.performance.rejectedLeads}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Contact Info</p>
                <p className="text-xs mt-1">{agent.email}</p>
                <p className="text-xs">{agent.phone}</p>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Performance</p>
                <p className="text-xs mt-1">{agent.performance.closedLeads} Closed / {agent.performance.newLeads} New</p>
                <p className="text-xs">{((agent.performance.closedLeads / agent.performance.newLeads) * 100).toFixed(1)}% Success</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Performance Trend</h4>
            <PerformanceChart agent={agent} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
