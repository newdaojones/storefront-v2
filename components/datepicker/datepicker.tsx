"use client"

// DateRangePicker.tsx

import { endOfDay, format, startOfMonth, startOfYear } from 'date-fns';
import React, { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import styles from './datepicker.module.css';

export default function DateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [activeButton, setActiveButton] = useState<string | null>(null);

  let footer: React.ReactNode = <p>Please pick the first day.</p>;
  if (range?.from) {
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

  return (
    <div>
      <button
        className={`${styles.button} ${activeButton === 'MTD' ? styles.active : ''}`}
        onClick={() => {
          setRange(monthToDate);
          setActiveButton('MTD');
        }}
      >
        MTD
      </button>
      <button
        className={`${styles.button} ${activeButton === 'YTD' ? styles.active : ''}`}
        onClick={() => {
          setRange(yearToDate);
          setActiveButton('YTD');
        }}
      >
        YTD
      </button>
      <button
        className={`${styles.button} ${activeButton === 'custom' ? styles.active : ''}`}
        onClick={() => {
          setRange(undefined);
          setActiveButton('custom');
        }}
      >
        Cust
      </button>

      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        footer={footer}
      />
    </div>
  );
}
