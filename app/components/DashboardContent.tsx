
'use client';

import { useState } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { mockAgents, getTeamMetrics } from '@/app/utils/mockData';
import { exportToCSV, exportToPDF, filterAgentsByTimeRange, filterAgentsByCustomRange } from '@/app/utils/exportUtils';
import { Agent } from '@/app/types/agent';

// This is just a placeholder - in a real conversion we'd have all dashboard components

export default function DashboardContent() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year' | 'all' | 'custom'>('month');
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  
  // Placeholder for dashboard functionality
  return (
    <Paper sx={{ p: 3 }}>
      <Box textAlign="center" p={4}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => window.location.href = '/dashboard/agent/1'}
          sx={{ mx: 1 }}
        >
          View Sample Agent Detail
        </Button>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => exportToCSV(agents, timeRange)}  
          sx={{ mx: 1 }}
        >
          Export CSV Sample
        </Button>
      </Box>
    </Paper>
  );
}
