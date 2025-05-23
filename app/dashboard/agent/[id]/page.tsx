
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Container, Typography, Box } from '@mui/material';
import AgentDetailContent from '@/app/components/AgentDetailContent';
import LoadingFallback from '@/app/components/LoadingFallback';
import { getMockAgent } from '@/app/utils/mockData';

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  // In a real app, we'd fetch the agent data from an API
  // For this example, we'll use a mock function
  const agentId = params.id;
  const agent = getMockAgent(agentId);
  
  // If agent not found, show 404
  if (!agent) {
    notFound();
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Agent Details
      </Typography>
      <Box mt={3}>
        <Suspense fallback={<LoadingFallback />}>
          <AgentDetailContent agentId={agentId} />
        </Suspense>
      </Box>
    </Container>
  );
}
