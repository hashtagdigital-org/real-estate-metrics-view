
import { Agent } from '../data/mockData';
import { toast } from "sonner";

// Function to filter agents based on time range
export const filterAgentsByTimeRange = (
  agents: Agent[], 
  timeRange: 'day' | 'week' | 'month' | 'year' | 'all' | 'custom'
): Agent[] => {
  // In a real application, this would filter based on actual date ranges
  // For this mock, we'll just return the original data
  toast.success(`Filtered data for time range: ${timeRange}`);
  return agents;
};

// Function to filter agents by custom date range
export const filterAgentsByCustomRange = (
  agents: Agent[],
  fromDate: Date,
  toDate: Date
): Agent[] => {
  // In a real application, this would filter based on the specified date range
  // For this mock, we'll just return the original data
  toast.success(`Filtered data from ${fromDate.toDateString()} to ${toDate.toDateString()}`);
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
  
  toast.success('CSV file exported successfully');
};

// Function to export data to PDF
export const exportToPDF = (agents: Agent[], timeRange: string) => {
  // In a real application, this would generate a PDF file
  // For this mock, we'll just show a toast notification
  toast.success('PDF export initiated');
  setTimeout(() => {
    toast.success('PDF file exported successfully');
  }, 2000);
};
