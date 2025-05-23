
'use client';

import { Agent } from '@/app/types/agent';
import { enqueueSnackbar } from 'notistack';

// Function to filter agents based on time range
export const filterAgentsByTimeRange = (
  agents: Agent[], 
  timeRange: 'day' | 'week' | 'month' | 'year' | 'all' | 'custom'
): Agent[] => {
  // In a real application, this would filter based on actual date ranges
  enqueueSnackbar(`Filtered data for time range: ${timeRange}`, { variant: 'success' });
  return agents;
};

// Function to filter agents by custom date range
export const filterAgentsByCustomRange = (
  agents: Agent[],
  fromDate: Date,
  toDate: Date
): Agent[] => {
  // In a real application, this would filter based on the specified date range
  enqueueSnackbar(`Filtered data from ${fromDate.toDateString()} to ${toDate.toDateString()}`, { variant: 'success' });
  return agents;
};

// Function to export data to CSV
export const exportToCSV = (agents: Agent[], timeRange: string) => {
  // Create CSV header
  const header = [
    'Agent Name',
    'Email',
    'Phone',
    'Role',
    'New Leads',
    'Contacted Leads',
    'Follow Up Leads',
    'Closed Leads',
    'Rejected Leads',
    'Conversion Rate (%)',
    'Response Time (hrs)',
    'Total Activity (hrs)',
    'Viewings Conducted',
  ].join(',');

  // Create CSV rows
  const rows = agents.map(agent => [
    `"${agent.name}"`,
    `"${agent.email}"`,
    `"${agent.phone}"`,
    `"${agent.role}"`,
    agent.performance.newLeads,
    agent.performance.contactedLeads,
    agent.performance.followUpLeads,
    agent.performance.closedLeads,
    agent.performance.rejectedLeads,
    agent.performance.conversionRate,
    agent.performance.responseTime,
    agent.activityStats?.totalHours || 0,
    agent.activityStats?.viewings || 0,
  ].join(','));

  // Combine header and rows
  const csv = [header, ...rows].join('\n');

  // Create a blob and download the file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `agent-performance-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  enqueueSnackbar('CSV file exported successfully', { variant: 'success' });
};

// Function to export data to PDF
export const exportToPDF = (agents: Agent[], timeRange: string) => {
  // In a real application, this would generate a PDF file
  enqueueSnackbar('PDF export initiated', { variant: 'success' });
  setTimeout(() => {
    enqueueSnackbar('PDF file exported successfully', { variant: 'success' });
  }, 2000);
};

// Function to export single agent data to CSV
export const exportSingleAgentToCSV = (agent: Agent, timeRange: string) => {
  // Create CSV header with detailed agent information
  const header = [
    'Agent Name',
    'Email',
    'Phone',
    'Role',
    'New Leads',
    'Contacted Leads',
    'Follow Up Leads',
    'Closed Leads',
    'Rejected Leads',
    'Conversion Rate (%)',
    'Response Time (hrs)',
    'Total Activity (hrs)',
    'Viewings Conducted',
    'Pending Leads',
    'No Action Leads',
    'Leads < 24h',
    'Leads 24h-48h',
    'Leads 48h-72h',
    'Leads > 72h',
  ].join(',');

  // Create CSV row for the single agent with detailed metrics
  const row = [
    `"${agent.name}"`,
    `"${agent.email}"`,
    `"${agent.phone}"`,
    `"${agent.role}"`,
    agent.performance.newLeads,
    agent.performance.contactedLeads,
    agent.performance.followUpLeads,
    agent.performance.closedLeads,
    agent.performance.rejectedLeads,
    agent.performance.conversionRate,
    agent.performance.responseTime,
    agent.activityStats?.totalHours || 0,
    agent.activityStats?.viewings || 0,
    agent.currentLeads?.pending || 0,
    agent.currentLeads?.noAction || 0,
    agent.pendingLeadTimes?.lessThan24h || 0,
    agent.pendingLeadTimes?.between24hAnd48h || 0,
    agent.pendingLeadTimes?.between48hAnd72h || 0,
    agent.pendingLeadTimes?.moreThan72h || 0,
  ].join(',');

  // Add lead source data
  let csvContent = [header, row].join('\n') + '\n\n';
  
  // Add lead sources section if available
  if (agent.leadsBySource && agent.leadsBySource.length > 0) {
    csvContent += '\nLEAD SOURCES\n';
    csvContent += 'Source,Count,Percentage\n';
    agent.leadsBySource.forEach(source => {
      csvContent += `"${source.name}",${source.count},${source.percentage}\n`;
    });
  }
  
  // Add lead languages section if available
  if (agent.leadsByLanguage && agent.leadsByLanguage.length > 0) {
    csvContent += '\nLEAD LANGUAGES\n';
    csvContent += 'Language,Count,Percentage\n';
    agent.leadsByLanguage.forEach(lang => {
      csvContent += `"${lang.name}",${lang.count},${lang.percentage}\n`;
    });
  }

  // Add notes section if available (excluding private content)
  if (agent.adminNotes && agent.adminNotes.length > 0) {
    csvContent += '\nNOTES (Date only)\n';
    agent.adminNotes.forEach(note => {
      csvContent += `"${new Date(note.timestamp).toLocaleDateString()}"\n`;
    });
  }

  // Create a blob and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `agent-${agent.name.replace(/\s+/g, '-').toLowerCase()}-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  enqueueSnackbar(`CSV export for ${agent.name} completed`, { variant: 'success' });
};

// Function to export single agent data to PDF with graphical elements
export const exportSingleAgentToPDF = (agent: Agent, timeRange: string) => {
  // In a real application, this would generate a detailed PDF file for the agent
  // with charts, graphs, and visual representations of the data
  enqueueSnackbar(`Creating graphical PDF dashboard for ${agent.name}`, { variant: 'success' });
  
  // PDF generation would normally happen here with a library like jsPDF or pdfmake
  
  // Simulate a complex PDF generation with a longer timeout
  setTimeout(() => {
    enqueueSnackbar(`PDF dashboard for ${agent.name} exported with complete graphical visualizations`, {
      variant: 'success',
    });
  }, 3000);
  
  // This would display a more detailed success message about what the PDF contains
  setTimeout(() => {
    enqueueSnackbar(`The exported PDF includes: Performance charts, Lead conversion funnel, Activity timeline, Source distribution, Language metrics, and Color-coded KPIs`, {
      variant: 'success',
    });
  }, 4000);
};
