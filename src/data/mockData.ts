
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'follow-up' | 'closed' | 'rejected';
  source: string;
  propertyInterest: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  lastActionDate?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  performance: {
    newLeads: number;
    contactedLeads: number;
    followUpLeads: number;
    closedLeads: number;
    rejectedLeads: number;
    conversionRate: number;
    responseTime: number; // in hours
  };
  historicalData: {
    month: string;
    newLeads: number;
    closedLeads: number;
  }[];
  leadsBySource?: {
    name: string;
    count: number;
    percentage: number;
  }[];
  leadsByLanguage?: {
    name: string;
    count: number;
    percentage: number;
  }[];
  currentLeads?: {
    pending: number;
    noAction: number;
  };
  pendingLeadTimes?: {
    lessThan24h: number;
    between24hAnd48h: number;
    between48hAnd72h: number;
    moreThan72h: number;
  };
  activityStats?: {
    totalHours: number;
    viewings: number;
    lastActive: string;
  };
  adminNotes?: {
    id: number;
    note: string;
    timestamp: string;
  }[];
}

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@realestate.com',
    phone: '(555) 123-4567',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Senior Agent',
    performance: {
      newLeads: 45,
      contactedLeads: 38,
      followUpLeads: 15,
      closedLeads: 12,
      rejectedLeads: 8,
      conversionRate: 26.7,
      responseTime: 2.3,
    },
    historicalData: [
      { month: 'Jan', newLeads: 40, closedLeads: 10 },
      { month: 'Feb', newLeads: 42, closedLeads: 12 },
      { month: 'Mar', newLeads: 45, closedLeads: 12 },
      { month: 'Apr', newLeads: 48, closedLeads: 14 },
      { month: 'May', newLeads: 50, closedLeads: 15 },
      { month: 'Jun', newLeads: 45, closedLeads: 12 },
    ],
    leadsBySource: [
      { name: 'Website', count: 20, percentage: 44.4 },
      { name: 'Referral', count: 12, percentage: 26.7 },
      { name: 'Social Media', count: 8, percentage: 17.8 },
      { name: 'Direct', count: 5, percentage: 11.1 }
    ],
    leadsByLanguage: [
      { name: 'English', count: 30, percentage: 66.7 },
      { name: 'Spanish', count: 8, percentage: 17.8 },
      { name: 'Arabic', count: 5, percentage: 11.1 },
      { name: 'Farsi', count: 2, percentage: 4.4 }
    ],
    currentLeads: {
      pending: 15,
      noAction: 3
    },
    pendingLeadTimes: {
      lessThan24h: 8,
      between24hAnd48h: 4,
      between48hAnd72h: 2,
      moreThan72h: 1
    },
    activityStats: {
      totalHours: 165,
      viewings: 18,
      lastActive: '2 hours ago'
    }
  },
  {
    id: '2',
    name: 'Sarah Martinez',
    email: 'sarah.martinez@realestate.com',
    phone: '(555) 234-5678',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'Lead Agent',
    performance: {
      newLeads: 38,
      contactedLeads: 35,
      followUpLeads: 20,
      closedLeads: 15,
      rejectedLeads: 3,
      conversionRate: 39.5,
      responseTime: 1.5,
    },
    historicalData: [
      { month: 'Jan', newLeads: 35, closedLeads: 13 },
      { month: 'Feb', newLeads: 36, closedLeads: 14 },
      { month: 'Mar', newLeads: 38, closedLeads: 15 },
      { month: 'Apr', newLeads: 37, closedLeads: 14 },
      { month: 'May', newLeads: 39, closedLeads: 16 },
      { month: 'Jun', newLeads: 38, closedLeads: 15 },
    ],
    leadsBySource: [
      { name: 'Website', count: 15, percentage: 39.5 },
      { name: 'Referral', count: 14, percentage: 36.8 },
      { name: 'Social Media', count: 6, percentage: 15.8 },
      { name: 'Direct', count: 3, percentage: 7.9 }
    ],
    leadsByLanguage: [
      { name: 'English', count: 20, percentage: 52.6 },
      { name: 'Spanish', count: 12, percentage: 31.6 },
      { name: 'Arabic', count: 4, percentage: 10.5 },
      { name: 'Farsi', count: 2, percentage: 5.3 }
    ],
    currentLeads: {
      pending: 12,
      noAction: 1
    },
    pendingLeadTimes: {
      lessThan24h: 7,
      between24hAnd48h: 3,
      between48hAnd72h: 1,
      moreThan72h: 1
    },
    activityStats: {
      totalHours: 180,
      viewings: 22,
      lastActive: '1 hour ago'
    }
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@realestate.com',
    phone: '(555) 345-6789',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'Junior Agent',
    performance: {
      newLeads: 25,
      contactedLeads: 20,
      followUpLeads: 10,
      closedLeads: 5,
      rejectedLeads: 5,
      conversionRate: 20.0,
      responseTime: 3.2,
    },
    historicalData: [
      { month: 'Jan', newLeads: 15, closedLeads: 2 },
      { month: 'Feb', newLeads: 18, closedLeads: 3 },
      { month: 'Mar', newLeads: 20, closedLeads: 4 },
      { month: 'Apr', newLeads: 22, closedLeads: 4 },
      { month: 'May', newLeads: 24, closedLeads: 5 },
      { month: 'Jun', newLeads: 25, closedLeads: 5 },
    ],
    leadsBySource: [
      { name: 'Website', count: 12, percentage: 48.0 },
      { name: 'Referral', count: 5, percentage: 20.0 },
      { name: 'Social Media', count: 6, percentage: 24.0 },
      { name: 'Direct', count: 2, percentage: 8.0 }
    ],
    leadsByLanguage: [
      { name: 'English', count: 18, percentage: 72.0 },
      { name: 'Spanish', count: 4, percentage: 16.0 },
      { name: 'Arabic', count: 2, percentage: 8.0 },
      { name: 'Farsi', count: 1, percentage: 4.0 }
    ],
    currentLeads: {
      pending: 8,
      noAction: 3
    },
    pendingLeadTimes: {
      lessThan24h: 3,
      between24hAnd48h: 2,
      between48hAnd72h: 2,
      moreThan72h: 1
    },
    activityStats: {
      totalHours: 120,
      viewings: 10,
      lastActive: '4 hours ago'
    }
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.wilson@realestate.com',
    phone: '(555) 456-7890',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'Senior Agent',
    performance: {
      newLeads: 52,
      contactedLeads: 48,
      followUpLeads: 22,
      closedLeads: 18,
      rejectedLeads: 12,
      conversionRate: 34.6,
      responseTime: 1.8,
    },
    historicalData: [
      { month: 'Jan', newLeads: 42, closedLeads: 14 },
      { month: 'Feb', newLeads: 45, closedLeads: 15 },
      { month: 'Mar', newLeads: 48, closedLeads: 16 },
      { month: 'Apr', newLeads: 50, closedLeads: 17 },
      { month: 'May', newLeads: 51, closedLeads: 17 },
      { month: 'Jun', newLeads: 52, closedLeads: 18 },
    ],
    leadsBySource: [
      { name: 'Website', count: 22, percentage: 42.3 },
      { name: 'Referral', count: 18, percentage: 34.6 },
      { name: 'Social Media', count: 8, percentage: 15.4 },
      { name: 'Direct', count: 4, percentage: 7.7 }
    ],
    leadsByLanguage: [
      { name: 'English', count: 35, percentage: 67.3 },
      { name: 'Spanish', count: 10, percentage: 19.2 },
      { name: 'Arabic', count: 5, percentage: 9.6 },
      { name: 'Farsi', count: 2, percentage: 3.8 }
    ],
    currentLeads: {
      pending: 18,
      noAction: 2
    },
    pendingLeadTimes: {
      lessThan24h: 10,
      between24hAnd48h: 5,
      between48hAnd72h: 2,
      moreThan72h: 1
    },
    activityStats: {
      totalHours: 190,
      viewings: 24,
      lastActive: '30 minutes ago'
    }
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@realestate.com',
    phone: '(555) 567-8901',
    avatar: 'https://i.pravatar.cc/150?img=7',
    role: 'Lead Agent',
    performance: {
      newLeads: 35,
      contactedLeads: 30,
      followUpLeads: 18,
      closedLeads: 10,
      rejectedLeads: 7,
      conversionRate: 28.6,
      responseTime: 2.5,
    },
    historicalData: [
      { month: 'Jan', newLeads: 30, closedLeads: 8 },
      { month: 'Feb', newLeads: 32, closedLeads: 9 },
      { month: 'Mar', newLeads: 33, closedLeads: 9 },
      { month: 'Apr', newLeads: 34, closedLeads: 10 },
      { month: 'May', newLeads: 34, closedLeads: 10 },
      { month: 'Jun', newLeads: 35, closedLeads: 10 },
    ],
    leadsBySource: [
      { name: 'Website', count: 16, percentage: 45.7 },
      { name: 'Referral', count: 10, percentage: 28.6 },
      { name: 'Social Media', count: 6, percentage: 17.1 },
      { name: 'Direct', count: 3, percentage: 8.6 }
    ],
    leadsByLanguage: [
      { name: 'English', count: 22, percentage: 62.9 },
      { name: 'Spanish', count: 5, percentage: 14.3 },
      { name: 'Arabic', count: 3, percentage: 8.6 },
      { name: 'Farsi', count: 5, percentage: 14.3 }
    ],
    currentLeads: {
      pending: 14,
      noAction: 2
    },
    pendingLeadTimes: {
      lessThan24h: 8,
      between24hAnd48h: 4,
      between48hAnd72h: 1,
      moreThan72h: 1
    },
    activityStats: {
      totalHours: 155,
      viewings: 16,
      lastActive: '3 hours ago'
    }
  },
];

// Function to get aggregated metrics for all agents
export const getTeamMetrics = () => {
  return mockAgents.reduce(
    (acc, agent) => {
      acc.totalNewLeads += agent.performance.newLeads;
      acc.totalContactedLeads += agent.performance.contactedLeads;
      acc.totalFollowUpLeads += agent.performance.followUpLeads;
      acc.totalClosedLeads += agent.performance.closedLeads;
      acc.totalRejectedLeads += agent.performance.rejectedLeads;
      return acc;
    },
    {
      totalNewLeads: 0,
      totalContactedLeads: 0,
      totalFollowUpLeads: 0,
      totalClosedLeads: 0,
      totalRejectedLeads: 0,
    }
  );
};
