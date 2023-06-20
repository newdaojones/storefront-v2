// components/OrderHeader.tsx
import styles from './order.module.css';

export default function OrderHeader() {
    return (
        <div className={styles.header}>
            <div className={styles.title}>Create Order</div>
        </div>
    );
}
