
'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Tabs, Tab } from '@mui/material';
import { getMockAgent } from '@/app/utils/mockData';
import { Agent } from '@/app/types/agent';
import AgentLeadsChart from './AgentLeadsChart';
import AgentActivityChart from './AgentActivityChart';

export default function AgentDetailContent({ agentId }: { agentId: string }) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // In a real app, we'd fetch from an API here
    const fetchedAgent = getMockAgent(agentId);
    if (fetchedAgent) {
      setAgent(fetchedAgent);
    }
  }, [agentId]);

  if (!agent) {
    return <Typography>Agent not found</Typography>;
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  component="img"
                  src={agent.avatar || "https://via.placeholder.com/150"}
                  alt={agent.name}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <Box>
                  <Typography variant="h5" gutterBottom>{agent.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{agent.role}</Typography>
                  <Typography variant="body2" color="text.secondary">{agent.email}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Typography variant="h6">Performance Summary</Typography>
                <Box display="flex" gap={2} mt={1}>
                  <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">Conversion</Typography>
                    <Typography variant="h6">{agent.performance.conversionRate}%</Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">Leads</Typography>
                    <Typography variant="h6">{agent.performance.newLeads}</Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">Response Time</Typography>
                    <Typography variant="h6">{agent.performance.responseTime}h</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="agent detail tabs">
            <Tab label="Lead Performance" />
            <Tab label="Activity Stats" />
          </Tabs>
        </Box>
        <Box sx={{ py: 3 }}>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Lead Status</Typography>
                    <AgentLeadsChart agent={agent} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Lead Sources</Typography>
                    <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc', borderRadius: '4px' }}>
                      <Typography color="text.secondary">Lead sources chart would be displayed here</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Activity Timeline</Typography>
                    <AgentActivityChart agent={agent} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Activity Stats</Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1">Total Hours: <strong>{agent.activityStats?.totalHours || 0}</strong></Typography>
                      <Typography variant="body1">Viewings: <strong>{agent.activityStats?.viewings || 0}</strong></Typography>
                      <Typography variant="body1">Last Active: <strong>{agent.activityStats?.lastActive || 'Unknown'}</strong></Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}
