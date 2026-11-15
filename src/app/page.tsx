import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1>Bridge homepage</h1>
        {/* use next.js Link, where we define a path and clicking goes to that path */}
        <Link className={styles.link} href="/test">
          Click here to test getUsers service
        </Link>
      </div>
    </main>
  );
}
