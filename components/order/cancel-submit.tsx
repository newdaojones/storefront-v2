import styles from './order.module.css';

type ButtonsProps = {
    onSubmit: () => void;
    onCancel: () => void;
    isOrderValid: boolean;
};

export default function Buttons({ onSubmit, onCancel, isOrderValid }: ButtonsProps) {
    return (
        <div className="flex flex-row space-x-4">
            <button
                onClick={onCancel}
                className={styles.cancelButton}
            >
                Cancel
            </button>
            <button
                onClick={onSubmit}
                disabled={!isOrderValid}
                className={isOrderValid ? styles.submitButton : styles.submitButtonDisabled}
            >
                Submit
            </button>
        </div>
    );
}