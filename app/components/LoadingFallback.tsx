
import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingFallback() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
      <CircularProgress size={40} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Loading...
      </Typography>
    </Box>
  );
}
