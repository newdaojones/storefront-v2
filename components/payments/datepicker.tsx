import { addDays, endOfDay, format, startOfMonth, startOfYear } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Tooltip from '../generics/tooltip';
import styles from './datepicker.module.css';

type DateRangePickerProps = {
  range: DateRange,
  disabled?: boolean
  setRange: (range: DateRange) => void
};


export default function DateRangePicker({ range, setRange, disabled }: DateRangePickerProps) {
  const [activeButton, setActiveButton] = React.useState<string | null>(null);
  const [showModal, setShowModal] = useState(false)
  const calendarRef = useRef<any>(null);
  const dateTextRef = useRef<any>(null)
  const [tempRange, setTempRange] = useState<DateRange>(range);

  useEffect(() => {
    setTempRange(range)
  }, [range])

  const today = endOfDay(new Date());
  const monthToDate = { from: startOfMonth(new Date()), to: today };
  const yearToDate = { from: startOfYear(new Date()), to: today };
  const pastWeek = { from: addDays(new Date(), -7), to: today };


  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // Check if the click occurred outside the parent element
      if (calendarRef.current && !calendarRef.current.contains(event.target) && !dateTextRef.current.contains(event.target)) {
        // Action to be taken when the click is outside the parent element
        setShowModal(false)
        setRange(tempRange)
      }
    };

    // Attach the click event listener to the document
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [tempRange, setRange]);

  return (
    <div className=''>
      <div ref={dateTextRef} className="cursor-pointer bg-white border-2 border-blue-400 relative flex items-center rounded p-2" onClick={() => !disabled && setShowModal(true)}>
        {format(range.from ?? new Date(), 'yyyy-MM-dd')} ~ {format(range.to ?? new Date(), 'yyyy-MM-dd')}
      </div>
      <div className="relative">
        <div ref={calendarRef} className={`absolute ${showModal ? '' : 'hidden'} top-0 bg-white p-4 rounded-md`}>
          <Tooltip text="Month to Date">
            <button
              className={`group ${styles.button} ${activeButton === 'MTD' ? styles.active : ''}`}
              onClick={() => {
                setTempRange(monthToDate);
                setActiveButton('MTD');
              }}
            >
              MTD
            </button>
          </Tooltip>

          <Tooltip text="🖕🏻🖕🏻🖕🏻">
            <button
              className={`group ${styles.button} ${activeButton === 'YTD' ? styles.active : ''}`}
              onClick={() => {
                setTempRange(yearToDate);
                setActiveButton('YTD');
              }}
            >
              YTD
            </button>
          </Tooltip>

          <Tooltip text="Custom">
            <button
              className={`group ${styles.button} ${activeButton === 'custom' ? styles.active : ''}`}
              onClick={() => {
                setTempRange(pastWeek);
                setActiveButton('custom');
              }}
            >
              Cust
            </button>
          </Tooltip>

          <DayPicker
            mode="range"
            selected={tempRange}
            onSelect={(selectedRange) => {
              if (selectedRange) {
                setTempRange(selectedRange);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
