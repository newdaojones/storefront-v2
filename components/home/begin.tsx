import Link from "next/link";
import styles from './home.module.css';

export default function Begin() {
    return (
        <Link href="/protected" prefetch={false} className={styles.links}>
            Begin
        </Link>
    );
}

