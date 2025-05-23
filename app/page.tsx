
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard after a short delay
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <Box 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 2
      }}
    >
      <CircularProgress />
      <Typography variant="h5">Agent Dashboard</Typography>
      <Typography variant="body2" color="text.secondary">Redirecting to dashboard...</Typography>
    </Box>
  );
}
