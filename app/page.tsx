import Agent from "@/components/landing/agent";
import Begin from "@/components/landing/begin";
import Constitution from "@/components/landing/constitution";
import styles from '../components/landing/landing.module.css';

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
