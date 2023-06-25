import RangePicker from '../datepicker/datepicker';
import styles from './payments.module.css';

export default function Controller() {
    return (
        <div className={styles.controller}>
            <RangePicker />
            {/* add other controller buttons here */}
        </div>
    );
}
