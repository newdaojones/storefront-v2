import Controller from "@/components/payments/controller";
import PaymentsHeader from "@/components/payments/header";
import PaymentList from "@/components/payments/list";
import styles from '../../../components/payments/payments.module.css';


export default function PaymentPage() {
    return (
        <div className={styles.container}>
            <div className={styles.body}>
                <PaymentsHeader />
                <div className={styles.rowContainer}>
                    <PaymentList />
                </div>
            </div>
            <div className={styles.body}>
                <Controller />
            </div>
        </div>
    );
}