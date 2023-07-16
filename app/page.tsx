import Siwe from "@/components/home/siwe";
import styles from '../components/home/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div>
          <Siwe />
        </div>
      </div>
    </div>
  );
}
