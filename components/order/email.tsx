
// components/CustomerEmail.tsx
import styles from './order.module.css';

type CustomerEmailProps = {
    email: string;
    setEmail: (email: string) => void;
};

export default function CustomerEmail({ email, setEmail }: CustomerEmailProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <div className={styles.customerEmail}>
            <div className={styles.label}>Customer Email</div>
            <div className={styles.boxCustomerEmail}>
                <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
        </div>
    );
}
