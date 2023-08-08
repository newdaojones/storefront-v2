"use client"

import { endOfDay, startOfDay, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import DataExport from './data-export';
import DateRangePicker from './datepicker';

type DataItem = {
    property1: string;
    property2: number;
    property3: boolean;
};

export default function Controller() {
    // Initial date range is the past 7 days up to today.
    const [range, setRange] = useState<DateRange>({
        from: startOfDay(subDays(new Date(), 7)),
        to: endOfDay(new Date()),
    });

    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        if (range) {
            // replace this temp route with the actual api route
            fetch('/api/order', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setData(data);
                }).catch((err) => {
                    console.log(err)
                });
        }
    }, [range]);

    return (
        <div className='h-10 bg-white border-2 border-blue-400'>
            <DataExport data={data} />
        </div>
    );
}
