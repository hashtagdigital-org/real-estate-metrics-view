
'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1', // crm-indigo
    },
    secondary: {
      main: '#14B8A6', // crm-teal
    },
    error: {
      main: '#EF4444', // crm-red
    },
    warning: {
      main: '#F59E0B', // crm-amber
    },
    info: {
      main: '#0EA5E9', // crm-blue
    },
    success: {
      main: '#10B981', // crm-emerald
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
