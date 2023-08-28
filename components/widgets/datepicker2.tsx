// components/widgets/DateRangePicker.tsx
import { useFormik } from 'formik';
import { useState } from 'react';
import { datePickerSchema } from 'utils/validations';

type DateRangePickerProps = {
    onChange: (startDate: Date | null, endDate: Date | null) => void;
    onClose: () => void;
};

const stringToDate = (dateString: string): Date | null => {
    const [month, day, year] = dateString.split('-').map(str => parseInt(str, 10));

    if (isNaN(month) || isNaN(day) || isNaN(year)) {
        return null;
    }

    const fullYear = 2000 + year;

    return new Date(fullYear, month - 1, day);
};

export default function DateRangePicker2({ onChange, onClose }: DateRangePickerProps) {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: '',
        },
        validationSchema: datePickerSchema,
        onSubmit: (values) => {
            const start = stringToDate(values.startDate);
            const end = stringToDate(values.endDate);
            if (start && end) {
                onChange(start, end);
            }
        },
    });

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
        <form onSubmit={formik.handleSubmit} className=" w-fit date-range-picker grid grid-rows-2 shadow-md bg-gray-500 bg-opacity-40 p-4 border-purps border-4 rounded-md">
            <label className='text-notpurple p-1' >
                🟢 Start
                <input
                    type="text"
                    name='startDate'
                    placeholder="MM-DD-YY"
                    className='bg-gray-500 mx-1 p-1 outline-none caret-ualert rounded-md w-auto grid'
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </label>
            <label className='text-notpurple p-1'>
                🔴 End
                <input
                    type="text"
                    name='endDate'
                    placeholder="MM-DD-YY"
                    className='bg-gray-500 m-1 p-1 outline-none caret-ualert rounded-md w-auto grid'
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </label>
            {formik.touched.endDate && formik.errors.startDate ? (
                <div className='text-red-500'>{formik.errors.startDate}</div>
            ) : null}
            <div className='grid grid-cols-2 text-notpurple'>
                <button onClick={handleApply} className='bg-purps rounded-md text-notpurple m-2 py-1 hover:bg-ualert'>Apply</button>
                <button onClick={onClose} className='bg-purps rounded-md text-notpurple m-2 py-1 hover:bg-ualert'>Close</button>
            </div>
        </form>
    );
}
