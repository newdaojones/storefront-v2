import Agent from "@/components/home/agent";
import Begin from "@/components/home/begin";
import Constitution from "@/components/home/constitution";
import styles from '../components/home/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.title}>
          <h1>Storefront</h1>
          <p className={styles.description}>
            Pesonalized Merchant Services
          </p>
        </div>
        <div>
          <Begin />
          <p className={styles.seperator}>·</p>
          <Agent />
          <p className={styles.seperator}>·</p>
          <Constitution />
        </div>
      </div>
    </div>
  );
}
