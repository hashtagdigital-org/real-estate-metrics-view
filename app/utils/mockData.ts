
import { Agent } from '@/app/types/agent';

// Mock data for demonstration purposes
export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@realestate.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Agent',
    avatar: 'https://i.pravatar.cc/150?u=john',
    performance: {
      newLeads: 45,
      contactedLeads: 38,
      followUpLeads: 32,
      closedLeads: 18,
      rejectedLeads: 10,
      conversionRate: 40,
      responseTime: 3.2,
    },
    activityStats: {
      totalHours: 164,
      viewings: 24,
      lastActive: '2 hours ago',
    },
    currentLeads: {
      pending: 22,
      noAction: 5,
    },
    pendingLeadTimes: {
      lessThan24h: 8,
      between24hAnd48h: 6,
      between48hAnd72h: 4,
      moreThan72h: 4,
    },
    leadsBySource: [
      { name: 'Website', count: 18, percentage: 40 },
      { name: 'Referral', count: 15, percentage: 33 },
      { name: 'Social Media', count: 8, percentage: 18 },
      { name: 'Direct', count: 4, percentage: 9 },
    ],
    leadsByLanguage: [
      { name: 'English', count: 32, percentage: 71 },
      { name: 'Spanish', count: 8, percentage: 18 },
      { name: 'French', count: 3, percentage: 7 },
      { name: 'Other', count: 2, percentage: 4 },
    ],
    adminNotes: [
      { id: 1, note: 'Top performer this month. Consider for team lead position.', timestamp: '2023-05-10T14:30:00Z' },
      { id: 2, note: 'Requested additional training on CRM system.', timestamp: '2023-04-28T09:15:00Z' },
    ]
  },
  // More mock agents would be defined here
];

export const getTeamMetrics = () => ({
  totalLeads: 356,
  activeAgents: 12,
  avgResponseTime: 4.2,
  conversionRate: 32
});

export const getMockAgent = (id: string): Agent | undefined => {
  return mockAgents.find(agent => agent.id === id);
};
