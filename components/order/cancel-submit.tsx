import Tooltip from '../tooltips/tooltip';
import styles from './order.module.css';

type ButtonsProps = {
    onSubmit: () => void;
    onCancel: () => void;
    isOrderValid: boolean;
};

export default function Buttons({ onSubmit, onCancel, isOrderValid }: ButtonsProps) {
    return (
        <div className="flex flex-row space-x-4">
            <Tooltip text={'Cancel will clear the form'}>
                <button
                    onClick={onCancel}
                    className={styles.cancelButton}
                >
                    Cancel
                </button>
            </Tooltip>
            <Tooltip text={'Fill out form before you can submit'}>
                <button
                    onClick={onSubmit}
                    disabled={!isOrderValid}
                    className={isOrderValid ? styles.submitButton : styles.submitButtonDisabled}
                >
                    Submit
                </button>
            </Tooltip>
        </div>
    );
}