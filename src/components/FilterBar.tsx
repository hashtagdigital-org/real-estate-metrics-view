
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  timeRange: 'day' | 'week' | 'month' | 'year' | 'all';
  setTimeRange: (range: 'day' | 'week' | 'month' | 'year' | 'all') => void;
  onExportCSV: () => void;
  onExportPDF: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  timeRange,
  setTimeRange,
  onExportCSV,
  onExportPDF,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-crm-blue" />
        <h3 className="text-lg font-medium">Time Range</h3>
        <Select 
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as any)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          className="border-crm-teal text-crm-teal hover:bg-crm-teal/10"
          onClick={onExportCSV}
        >
          Export CSV
        </Button>
        <Button
          variant="outline"
          className="border-crm-blue text-crm-blue hover:bg-crm-blue/10"
          onClick={onExportPDF}
        >
          Export PDF
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
