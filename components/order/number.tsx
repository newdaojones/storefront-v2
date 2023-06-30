// components/CustomerNumber.tsx
import styles from './order.module.css';

type CustomerNumberProps = {
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
};

export default function CustomerNumber({ phoneNumber, setPhoneNumber }: CustomerNumberProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    return (
        <div className={styles.customerNumber}>
            <div className={styles.label}>Customer Number</div>
            <div className={styles.boxCustomerNumber}>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
        </div>
    );
}
