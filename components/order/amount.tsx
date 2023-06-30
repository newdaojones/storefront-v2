
// components/OrderAmount.tsx
import styles from './order.module.css';

type OrderAmountProps = {
    amount: string;
    setAmount: (amount: string) => void;
};

export default function OrderAmount({ amount, setAmount }: OrderAmountProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    return (
        <div className={styles.orderAmount}>
            <div className={styles.label}>Order Amount</div>
            <div className={styles.boxOrderAmount}>
                <input
                    type="number"
                    value={amount}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
        </div>
    );
}
