
export interface Performance {
  newLeads: number;
  contactedLeads: number;
  followUpLeads: number;
  closedLeads: number;
  rejectedLeads: number;
  conversionRate: number;
  responseTime: number;
}

export interface ActivityStats {
  totalHours: number;
  viewings: number;
  lastActive: string;
}

export interface CurrentLeads {
  pending: number;
  noAction: number;
}

export interface PendingLeadTimes {
  lessThan24h: number;
  between24hAnd48h: number;
  between48hAnd72h: number;
  moreThan72h: number;
}

export interface DataPoint {
  name: string;
  count: number;
  percentage: number;
}

export interface Note {
  id: number;
  note: string;
  timestamp: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
  performance: Performance;
  activityStats?: ActivityStats;
  currentLeads?: CurrentLeads;
  pendingLeadTimes?: PendingLeadTimes;
  leadsBySource?: DataPoint[];
  leadsByLanguage?: DataPoint[];
  adminNotes?: Note[];
}
