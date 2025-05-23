
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, 
  Typography, 
  Button, 
  Avatar, 
  Chip, 
  Tabs, 
  Tab, 
  Paper,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { ArrowBack, Description, PictureAsPdf } from '@mui/icons-material';
import { enqueueSnackbar } from 'notistack';
import { Agent } from '@/app/types/agent';
import { getMockAgent } from '@/app/utils/mockData';
import { exportSingleAgentToCSV, exportSingleAgentToPDF } from '@/app/utils/exportUtils';
import AgentPerformanceMetrics from './AgentPerformanceMetrics';
import AgentLeadsChart from './AgentLeadsChart';
import AgentActivityChart from './AgentActivityChart';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`agent-tabpanel-${index}`}
      aria-labelledby={`agent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AgentDetailContent({ agentId }: { agentId: string }) {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [adminNote, setAdminNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<{id: number, note: string, timestamp: string}[]>([]);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year' | 'all' | 'custom'>('month');
  
  useEffect(() => {
    // In a real app, fetch data from an API
    // For this example, we're using mock data
    const fetchedAgent = getMockAgent(agentId);
    if (fetchedAgent) {
      setAgent(fetchedAgent);
      setSavedNotes(fetchedAgent.adminNotes || []);
    }
  }, [agentId]);
  
  if (!agent) {
    return <Typography>Loading agent details...</Typography>;
  }

  const handleBack = () => {
    router.push('/dashboard');
  };
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
      enqueueSnackbar('Admin note saved successfully', { variant: 'success' });
    }
  };
  
  const handleExportCSV = () => {
    exportSingleAgentToCSV(agent, timeRange);
  };
  
  const handleExportPDF = () => {
    enqueueSnackbar(`Generating detailed graphical PDF for ${agent.name}...`, { variant: 'info' });
    exportSingleAgentToPDF(agent, timeRange);
  };
  
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          variant="text"
          color="primary"
        >
          Back to Overview
        </Button>
        
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar 
            src={agent.avatar}
            alt={agent.name}
            sx={{ width: 48, height: 48 }}
          >
            {agent.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h5">{agent.name}</Typography>
              <Chip label={agent.role} color="primary" size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {agent.email} • {agent.phone}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box display="flex" gap={2} justifyContent="flex-end" mb={3}>
        <Button
          variant="outlined"
          color="info"
          startIcon={<Description />}
          onClick={handleExportCSV}
        >
          Export Agent CSV
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<PictureAsPdf />}
          onClick={handleExportPDF}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, rgba(14,165,233,0.1) 0%, rgba(20,184,166,0.1) 100%)',
              transform: 'translateX(-100%)',
              transition: 'transform 0.3s ease-out',
            },
            '&:hover::before': {
              transform: 'translateX(0)',
            }
          }}
        >
          <Box component="span" sx={{ position: 'relative', zIndex: 1 }}>
            Export Graphical PDF
          </Box>
        </Button>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="agent detail tabs">
          <Tab label="Performance" id="agent-tab-0" />
          <Tab label="Leads" id="agent-tab-1" />
          <Tab label="Activity" id="agent-tab-2" />
          <Tab label="Admin Notes" id="agent-tab-3" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <AgentPerformanceMetrics agent={agent} timeRange={timeRange} />
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardHeader title="Lead Statistics" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={500} mb={2}>
                  Leads by Source
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Source</TableCell>
                        <TableCell align="right">Count</TableCell>
                        <TableCell align="right">Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {agent.leadsBySource?.map((source) => (
                        <TableRow key={source.name}>
                          <TableCell>{source.name}</TableCell>
                          <TableCell align="right">{source.count}</TableCell>
                          <TableCell align="right">{source.percentage}%</TableCell>
                        </TableRow>
                      )) || (
                        <TableRow>
                          <TableCell colSpan={3} align="center">No data available</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight={500} mb={2}>
                  Leads by Language
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Language</TableCell>
                        <TableCell align="right">Count</TableCell>
                        <TableCell align="right">Percentage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {agent.leadsByLanguage?.map((lang) => (
                        <TableRow key={lang.name}>
                          <TableCell>{lang.name}</TableCell>
                          <TableCell align="right">{lang.count}</TableCell>
                          <TableCell align="right">{lang.percentage}%</TableCell>
                        </TableRow>
                      )) || (
                        <TableRow>
                          <TableCell colSpan={3} align="center">No data available</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            
            <Box mt={4}>
              <AgentLeadsChart agent={agent} />
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardHeader title="Activity Timeline" />
          <CardContent>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }} elevation={1}>
                  <Typography variant="body2" color="text.secondary">Total Activity Time</Typography>
                  <Typography variant="h6" fontWeight="bold" mt={0.5}>
                    {agent.activityStats?.totalHours || 0} hrs
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }} elevation={1}>
                  <Typography variant="body2" color="text.secondary">Avg. Response Time</Typography>
                  <Typography variant="h6" fontWeight="bold" mt={0.5}>
                    {agent.performance.responseTime} hrs
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }} elevation={1}>
                  <Typography variant="body2" color="text.secondary">Viewings Conducted</Typography>
                  <Typography variant="h6" fontWeight="bold" mt={0.5}>
                    {agent.activityStats?.viewings || 0}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }} elevation={1}>
                  <Typography variant="body2" color="text.secondary">Last Activity</Typography>
                  <Typography variant="body1" fontWeight="bold" mt={0.5}>
                    {agent.activityStats?.lastActive || 'N/A'}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            
            <AgentActivityChart agent={agent} />
          </CardContent>
        </Card>
      </TabPanel>
      
      <TabPanel value={tabValue} index={3}>
        <Card>
          <CardHeader title="Admin Notes" />
          <CardContent>
            <Typography variant="subtitle2" mb={1}>Add New Note</Typography>
            <Box mb={3} display="flex" flexDirection="column" gap={1}>
              <TextField
                label="Private note about this agent"
                multiline
                rows={4}
                fullWidth
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Add private notes about this agent (not visible to the agent)"
                helperText="These notes are only visible to admins"
              />
              <Box alignSelf="flex-start">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSaveNote}
                >
                  Save Note
                </Button>
              </Box>
            </Box>
            
            <Typography variant="subtitle2" mb={1}>Saved Notes</Typography>
            {savedNotes.length > 0 ? (
              <List>
                {savedNotes.map((note) => (
                  <Paper key={note.id} sx={{ mb: 2, p: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                      {new Date(note.timestamp).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">{note.note}</Typography>
                  </Paper>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No admin notes yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      </TabPanel>
    </>
  );
}
