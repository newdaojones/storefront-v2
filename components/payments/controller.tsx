import DataExport from '../data-export/data-export';
import RangePicker from '../datepicker/datepicker';
import styles from './payments.module.css';

export default function Controller() {
    return (
        <div className={styles.controller}>
            <RangePicker />
            <DataExport data={[]} />
            {/* add other controller buttons here */}
        </div>
    );
}
