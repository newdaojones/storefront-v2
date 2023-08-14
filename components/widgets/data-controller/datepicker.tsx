import { addDays, endOfDay, format, startOfMonth, startOfYear } from 'date-fns';
import React from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import Tooltip from '../../tooltips/tooltip';
import styles from './datepicker.module.css';

type DateRangePickerProps = {
  range: DateRange,
  setRange: (range: DateRange) => void
};


export default function DateRangePicker({ range, setRange }: DateRangePickerProps) {
  const [activeButton, setActiveButton] = React.useState<string | null>(null);

  let footer: React.ReactNode = <p>Please pick the first day.</p>;
  if (range.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
        </p>
      );
    }
  }

  const today = endOfDay(new Date());
  const monthToDate = { from: startOfMonth(new Date()), to: today };
  const yearToDate = { from: startOfYear(new Date()), to: today };
  const pastWeek = { from: addDays(new Date(), -7), to: today };

  return (
    <div className='overflow-visible'>
      <Tooltip text="Month to Date">
        <button
          className={`group ${styles.button} ${activeButton === 'MTD' ? styles.active : ''}`}
          onClick={() => {
            setRange(monthToDate);
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
            setRange(yearToDate);
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
            setRange(pastWeek);
            setActiveButton('custom');
          }}
        >
          Cust
        </button>
      </Tooltip>

      <DayPicker
        mode="range"
        selected={range}
        onSelect={(selectedRange) => {
          if (selectedRange) {
            setRange(selectedRange);
          }
        }}
        footer={footer}
      />
    </div>
  );
}
