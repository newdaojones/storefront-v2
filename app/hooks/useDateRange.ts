import { useState } from "react";

export const useDateRange = (initialStartDate: Date | null, initialEndDate: Date | null) => {
    const [dateRange, setDateRange] = useState({ startDate: initialStartDate, endDate: initialEndDate });

    const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
        if (startDate && endDate) {
            const startDateStr = startDate.toISOString();
            const endDateStr = endDate.toISOString();
        }
        setDateRange({ startDate, endDate });
    };

    return { dateRange, handleDateRangeChange };
};
