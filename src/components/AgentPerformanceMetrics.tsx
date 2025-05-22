
import React from 'react';
import { Agent } from '../data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import PerformanceChart from './PerformanceChart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AgentPerformanceMetricsProps {
  agent: Agent;
  timeRange: string;
}

const AgentPerformanceMetrics: React.FC<AgentPerformanceMetricsProps> = ({ agent, timeRange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Lead Performance</h3>
            <Table>
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
                <TableRow className="bg-muted/50">
                  <TableCell className="font-medium">Conversion Rate</TableCell>
                  <TableCell className="text-right font-bold">{agent.performance.conversionRate}%</TableCell>
                </TableRow>
                <TableRow className="bg-muted/50">
                  <TableCell className="font-medium">Avg. Response Time</TableCell>
                  <TableCell className="text-right font-bold">{agent.performance.responseTime} hours</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Current Lead Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-3 rounded-lg border text-center">
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-xl font-bold mt-1 text-amber-500">{agent.currentLeads?.pending || 0}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border text-center">
                <p className="text-xs text-gray-500">Follow-up</p>
                <p className="text-xl font-bold mt-1 text-indigo-500">{agent.performance.followUpLeads}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border text-center">
                <p className="text-xs text-gray-500">No Action >24h</p>
                <p className="text-xl font-bold mt-1 text-red-500">{agent.currentLeads?.noAction || 0}</p>
              </div>
            </div>
            
            <h3 className="font-medium mb-2 text-sm">Pending Leads Time Elapsed</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Less than 24h</TableCell>
                  <TableCell className="text-right">{agent.pendingLeadTimes?.lessThan24h || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>24h - 48h</TableCell>
                  <TableCell className="text-right">{agent.pendingLeadTimes?.between24hAnd48h || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>48h - 72h</TableCell>
                  <TableCell className="text-right">{agent.pendingLeadTimes?.between48hAnd72h || 0}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>More than 72h</TableCell>
                  <TableCell className="text-right">{agent.pendingLeadTimes?.moreThan72h || 0}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4">{timeRange === 'month' ? 'Monthly' : 'Historical'} Performance</h3>
          <div className="h-[300px]">
            <PerformanceChart agent={agent} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentPerformanceMetrics;
