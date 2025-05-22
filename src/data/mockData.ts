
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'follow-up' | 'closed' | 'rejected';
  source: string;
  propertyInterest: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
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
