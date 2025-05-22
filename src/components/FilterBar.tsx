
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
  timeRange: 'day' | 'week' | 'month' | 'year' | 'all' | 'custom';
  setTimeRange: (range: 'day' | 'week' | 'month' | 'year' | 'all' | 'custom') => void;
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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Calendar className="h-5 w-5 text-crm-blue hidden sm:block" />
        <h3 className="text-base sm:text-lg font-medium">Time Range</h3>
        <Select 
          value={timeRange}
          onValueChange={(value) => setTimeRange(value as any)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2 items-center w-full sm:w-auto justify-between sm:justify-end">
        <Button
          variant="outline"
          className="border-crm-teal text-crm-teal hover:bg-crm-teal/10 flex-1 sm:flex-none"
          onClick={onExportCSV}
        >
          Export CSV
        </Button>
        <Button
          variant="outline"
          className="border-crm-blue text-crm-blue hover:bg-crm-blue/10 flex-1 sm:flex-none"
          onClick={onExportPDF}
        >
          Export PDF
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
