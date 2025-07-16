import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import Text from "../Text";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  dateFormat?: string;
}

export function Datepicker({
  date,
  onDateChange,
  placeholder = "วว/ดด/ปปปป",
  disabled = false,
  className,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [isOpen, setIsOpen] = useState(false);

  // Sync with external date prop
  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
    onDateChange?.(newDate); // ส่งค่ากลับไปยัง parent component
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className={` justify-between font-normal items-center  border-[#4B006E] border-3 p-[22px] ${className}`}
          disabled={disabled}
        >
          <Text
            className={`${
              selectedDate ? "text-black" : "text-muted-foreground"
            } md:text-sm lg:text-[20px]`}
          >
            {selectedDate
              ? selectedDate.toLocaleDateString("th-TH")
              : placeholder}
          </Text>
          <CalendarIcon className="mr-2 h-4 w-4 text-[#4B006E]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          captionLayout="dropdown"
          onSelect={handleDateSelect}
          defaultMonth={selectedDate}
          fromYear={1900}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
}
