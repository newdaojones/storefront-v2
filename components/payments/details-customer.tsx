
// components/payments/details-customer.tsx
import React from 'react';
import styles from './payments.module.css';
import { Customer } from '@prisma/client';

// Import the type for Payment
export type CustDetails = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  records?: string | null; // number of records
  ltv?: string | null; // lifetime value of customer transactions
};

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  return (
    <div className={styles.expandedDetails}>
      <div className={styles.leftText}>Name:</div>
      <div className={styles.rightText}>{customer.firstName} {customer.lastName}</div>
      <div className={styles.leftText}>Email:</div>
      <div className={styles.rightText}>{customer.email}</div>
      <div className={styles.leftText}>Phone:</div>
      <div className={styles.rightText}>{customer.phoneNumber}</div>
    </div>
  );
}

export default CustomerDetails;
