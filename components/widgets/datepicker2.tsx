// components/widgets/DateRangePicker.tsx
import { useState } from 'react';

type DateRangePickerProps = {
    onChange: (startDate: Date | null, endDate: Date | null) => void;
    onClose: () => void;
};

const stringToDate = (dateString: string): Date | null => {
    const [month, day, year] = dateString.split('-').map(str => parseInt(str, 10));

    if (isNaN(month) || isNaN(day) || isNaN(year)) {
        return null;
    }

    return new Date(year, month - 1, day);
};

export default function DateRangePicker2({ onChange, onClose }: DateRangePickerProps) {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const handleApply = () => {
        const start = stringToDate(startDate);
        const end = stringToDate(endDate);

        if (start && end) {
            onChange(start, end);
        } else {
            // Handle the error - either show a message to the user or something else
        }
    };

    return (
        <div className=" w-fit date-range-picker grid grid-rows-2 shadow-md bg-gray-500 bg-opacity-40 p-4 border-purps border-4 rounded-md">
            <label className='text-notpurple p-1' >
                🟢 Start
                <input
                    type="text"
                    placeholder="MM-DD-YY"
                    className='bg-gray-500 mx-1 p-1 outline-none caret-ualert rounded-md w-auto grid'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </label>
            <label className='text-notpurple p-1'>
                🔴 End
                <input
                    type="text"
                    placeholder="MM-DD-YY"
                    className='bg-gray-500 m-1 p-1 outline-none caret-ualert rounded-md w-auto grid'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </label>
            <div className='grid grid-cols-2 text-notpurple'>
                <button onClick={handleApply} className='bg-purps rounded-md text-notpurple m-2 py-1 hover:bg-ualert'>Apply</button>
                <button onClick={onClose} className='bg-purps rounded-md text-notpurple m-2 py-1 hover:bg-ualert'>Close</button>
            </div>
        </div>
    );
}
