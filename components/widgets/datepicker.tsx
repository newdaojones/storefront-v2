"use client"
// components/widgets/DateRangePicker.tsx
import { useState } from "react";
import DatePicker from "react-datepicker";

type DateRangePickerProps = {
    onChange: (startDate: Date, endDate: Date) => void;
    onClose?: () => void;
};

export default function DateRangePicker({ onChange, onClose }: DateRangePickerProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (date: Date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date) => {
        setEndDate(date);
    };

    const handleApply = () => {
        if (startDate && endDate) {
            onChange(startDate, endDate);
        }
    };

    return (
        <div className="date-range-picker grid grid-flow-row place-content-center gap-0 bg-transparent py-2 space-y-0">
            <div className="calendar w-full inline-block">
                <DatePicker
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleStartDateChange}
                    inline
                />
            </div>
            <div className="calendar w-full inline-block">
                <DatePicker
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleEndDateChange}
                    inline
                />
            </div>
            <button className="  px-4 py-2 rounded text-notpurple bg-purps hover:bg-ualert" onClick={handleApply}>Apply</button>
            <button onClick={onClose}>Close</button>
        </div>
    );

};
