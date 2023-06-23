// Import React and styles
import React from 'react';
import styles from './payments.module.css';

// Import the type for Payment
export type CustDetails = {
  name: string;
  email: string;
  phone: string;
  records: string;
  ltv: string;
};

interface CustomerDetailsProps {
  customer: CustDetails;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  return (
    <div className={styles.expandedDetails}>
      <div className={styles.leftText}>Name:</div>
      <div className={styles.rightText}>{customer.name}</div>
      <div className={styles.leftText}>Email:</div>
      <div className={styles.rightText}>{customer.email}</div>
      <div className={styles.leftText}>Phone:</div>
      <div className={styles.rightText}>{customer.phone}</div>
      <div className={styles.leftText}>Records:</div>
      <div className={styles.rightText}>{customer.records}</div>
      <div className={styles.leftText}>LTV:</div>
      <div className={styles.rightText}>{customer.ltv}</div>
    </div>
  );
}

export default CustomerDetails;
