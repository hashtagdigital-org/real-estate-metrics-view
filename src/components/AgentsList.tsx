
import React from 'react';
import { Agent } from '../data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface AgentsListProps {
  agents: Agent[];
  onAgentSelect: (agentId: string) => void;
}

const AgentsList: React.FC<AgentsListProps> = ({ agents, onAgentSelect }) => {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {agents.map((agent) => (
        <Card key={agent.id} className="border shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                  <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">{agent.name}</h3>
                  <p className="text-sm text-gray-500">{agent.role}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={getStatusColor('conversionRate', agent.performance.conversionRate)}>
                  {agent.performance.conversionRate}% Conv.
                </Badge>
                <Badge variant="outline" className={getStatusColor('responseTime', agent.performance.responseTime)}>
                  {agent.performance.responseTime}h Resp.
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 bg-gray-50 border-t">
              <div className="p-3 text-center border-r">
                <p className="text-xs text-gray-500">New</p>
                <p className="font-bold text-crm-blue">{agent.performance.newLeads}</p>
              </div>
              <div className="p-3 text-center border-r">
                <p className="text-xs text-gray-500">Contacted</p>
                <p className="font-bold text-crm-teal">{agent.performance.contactedLeads}</p>
              </div>
              <div className="p-3 text-center border-r">
                <p className="text-xs text-gray-500">Follow-up</p>
                <p className="font-bold text-indigo-500">{agent.performance.followUpLeads}</p>
              </div>
              <div className="p-3 text-center border-r">
                <p className="text-xs text-gray-500">Closed</p>
                <p className="font-bold text-green-500">{agent.performance.closedLeads}</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs text-gray-500">Rejected</p>
                <p className="font-bold text-red-500">{agent.performance.rejectedLeads}</p>
              </div>
            </div>
            
            <div className="p-4 bg-white border-t text-right">
              <Button 
                onClick={() => onAgentSelect(agent.id)}
                variant="default"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AgentsList;
