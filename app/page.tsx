import ImageRight from "@/components/ImageRight";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.section}>
        <div className={styles.left}>
          <h1>Display data using Nasa&apos;s open APIs</h1>

          <p>
            This test is intended to measure your skills for various segments of
            Frontend web development including API documentation reading, remote
            data fetching, parsing and displaying as well as the overall code
            quality.
          </p>
        </div>
        <ImageRight />
      </section>
    </main>
  );
}
