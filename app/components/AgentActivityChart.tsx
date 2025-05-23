
'use client';

import { Box, Typography } from '@mui/material';
import { Agent } from '@/app/types/agent';

export default function AgentActivityChart({ agent }: { agent: Agent }) {
  return (
    <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc', borderRadius: '4px' }}>
      {/* In a real app, we would render an activity chart here */}
      <Typography color="text.secondary">
        Activity timeline chart for {agent.name} would be displayed here
      </Typography>
    </Box>
  );
}
