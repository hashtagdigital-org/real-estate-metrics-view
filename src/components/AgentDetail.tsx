
import React, { useState } from 'react';
import { Agent } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AgentActivityChart from './AgentActivityChart';
import AgentLeadsChart from './AgentLeadsChart';
import AgentPerformanceMetrics from './AgentPerformanceMetrics';

interface AgentDetailProps {
  agent: Agent;
  onBack: () => void;
  timeRange: string;
}

const AgentDetail: React.FC<AgentDetailProps> = ({ agent, onBack, timeRange }) => {
  const [adminNote, setAdminNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<{id: number, note: string, timestamp: string}[]>(
    agent.adminNotes || []
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleSaveNote = () => {
    if (adminNote.trim()) {
      const newNote = {
        id: Date.now(),
        note: adminNote,
        timestamp: new Date().toISOString(),
      };
      
      setSavedNotes([newNote, ...savedNotes]);
      setAdminNote('');
      toast.success('Admin note saved successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 px-2" 
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Overview
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {agent.name}
              <Badge className="ml-2">{agent.role}</Badge>
            </h2>
            <p className="text-sm text-gray-500">
              {agent.email} • {agent.phone}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="admin-notes">Admin Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <AgentPerformanceMetrics agent={agent} timeRange={timeRange} />
        </TabsContent>
        
        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Lead Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4">Leads by Source</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                        <TableHead className="text-right">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agent.leadsBySource?.map((source) => (
                        <TableRow key={source.name}>
                          <TableCell className="font-medium">{source.name}</TableCell>
                          <TableCell className="text-right">{source.count}</TableCell>
                          <TableCell className="text-right">{source.percentage}%</TableCell>
                        </TableRow>
                      )) || (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-4">No data available</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Leads by Language</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Language</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                        <TableHead className="text-right">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agent.leadsByLanguage?.map((lang) => (
                        <TableRow key={lang.name}>
                          <TableCell className="font-medium">{lang.name}</TableCell>
                          <TableCell className="text-right">{lang.count}</TableCell>
                          <TableCell className="text-right">{lang.percentage}%</TableCell>
                        </TableRow>
                      )) || (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-4">No data available</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <AgentLeadsChart agent={agent} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-medium mb-2">CRM Usage Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <p className="text-sm text-gray-500">Total Activity Time</p>
                    <p className="text-xl font-bold mt-1">{agent.activityStats?.totalHours || 0} hrs</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <p className="text-sm text-gray-500">Avg. Response Time</p>
                    <p className="text-xl font-bold mt-1">{agent.performance.responseTime} hrs</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <p className="text-sm text-gray-500">Viewings Conducted</p>
                    <p className="text-xl font-bold mt-1">{agent.activityStats?.viewings || 0}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <p className="text-sm text-gray-500">Last Activity</p>
                    <p className="text-md font-bold mt-1">{agent.activityStats?.lastActive || 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <AgentActivityChart agent={agent} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="admin-notes">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Admin Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Add New Note</h3>
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Add private notes about this agent (not visible to the agent)"
                    className="min-h-[100px]" 
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                  />
                  <Button onClick={handleSaveNote}>Save Note</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Saved Notes</h3>
                {savedNotes.length > 0 ? (
                  <div className="space-y-3">
                    {savedNotes.map(note => (
                      <div key={note.id} className="bg-white p-4 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-xs text-gray-500">
                            {new Date(note.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm">{note.note}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No admin notes yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDetail;
