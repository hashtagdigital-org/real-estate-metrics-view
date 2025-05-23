
import { Container, Typography, Box } from '@mui/material';
import DashboardContent from '@/app/components/DashboardContent';

export const metadata = {
  title: 'Agent Performance Dashboard',
  description: 'Track and analyze your team\'s performance metrics',
};

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agent Performance Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and analyze your team's performance metrics
        </Typography>
      </Box>
      
      <DashboardContent />
    </Container>
  );
}
