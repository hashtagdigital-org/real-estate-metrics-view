
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, onDateRangeChange }) => {
  const [date, setDate] = React.useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>(dateRange);

  // Update internal state when props change
  React.useEffect(() => {
    setDate(dateRange);
  }, [dateRange]);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const newRange = {
      from: date?.from,
      to: undefined,
    } as { from: Date | undefined; to: Date | undefined };

    if (!date?.from) {
      newRange.from = selectedDate;
    } else if (date.from && !date.to && selectedDate > date.from) {
      newRange.to = selectedDate;
    } else {
      newRange.from = selectedDate;
      newRange.to = undefined;
    }

    setDate(newRange);
    
    if (newRange.from && newRange.to) {
      onDateRangeChange(newRange);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="from" className="text-sm text-gray-600">From Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="from"
                variant="outline"
                className="justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  format(date.from, "PPP")
                ) : (
                  <span>Select start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date?.from}
                onSelect={handleSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="to" className="text-sm text-gray-600">To Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="to"
                variant="outline"
                className="justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.to ? (
                  format(date.to, "PPP")
                ) : (
                  <span>Select end date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date?.to}
                onSelect={handleSelect}
                disabled={(currentDate) => date?.from ? currentDate < date.from : false}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button 
        className="w-full md:w-auto" 
        disabled={!date.from || !date.to}
        onClick={() => onDateRangeChange(date)}
      >
        Apply Date Range
      </Button>
    </div>
  );
};

export default DateRangePicker;
