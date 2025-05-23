
'use client';

import { Box, Typography, Paper, Grid } from '@mui/material';
import { Agent } from '@/app/types/agent';

interface AgentPerformanceMetricsProps {
  agent: Agent;
  timeRange: string;
}

export default function AgentPerformanceMetrics({ agent }: AgentPerformanceMetricsProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Performance Metrics</Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Lead Stats</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">New Leads</Typography>
                <Typography variant="h6">{agent.performance.newLeads}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Contacted</Typography>
                <Typography variant="h6">{agent.performance.contactedLeads}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Follow Up</Typography>
                <Typography variant="h6">{agent.performance.followUpLeads}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Closed</Typography>
                <Typography variant="h6">{agent.performance.closedLeads}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Rejected</Typography>
                <Typography variant="h6">{agent.performance.rejectedLeads}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Conversion Rate</Typography>
                <Typography variant="h6">{agent.performance.conversionRate}%</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Performance Chart
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* In a real app, we would render a performance chart here */}
              <Typography color="text.secondary">Performance chart would be displayed here</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
