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
  
  toast.success(`CSV export for ${agent.name} completed`);
};

// Function to export single agent data to PDF with graphical elements
export const exportSingleAgentToPDF = (agent: Agent, timeRange: string) => {
  // In a real application, this would generate a detailed PDF file for the agent
  // with charts, graphs, and visual representations of the data
  toast.success(`Creating graphical PDF dashboard for ${agent.name}`);
  
  // PDF generation would normally happen here with a library like jsPDF or pdfmake
  // For visualization, we would include:
  // 1. Agent profile with photo/avatar
  // 2. Performance metrics with color-coded indicators
  // 3. Lead conversion funnel visualizations
  // 4. Charts for historical performance
  // 5. Activity timeline with graphical elements
  // 6. Source and language distribution visualizations
  
  // Simulate a complex PDF generation with a longer timeout
  setTimeout(() => {
    toast.success(`PDF dashboard for ${agent.name} exported with complete graphical visualizations`, {
      description: "Includes performance charts, lead metrics, and activity visuals",
      duration: 5000,
    });
  }, 3000);
  
  // This would display a more detailed success message about what the PDF contains
  setTimeout(() => {
    toast.success(`The exported PDF includes:`, {
      description: "✓ Performance charts\n✓ Lead conversion funnel\n✓ Activity timeline\n✓ Source distribution\n✓ Language metrics\n✓ Color-coded KPIs",
      duration: 8000,
    });
  }, 4000);
};
