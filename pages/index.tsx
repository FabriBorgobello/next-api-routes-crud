import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      <main className={styles.main}>
        <h1>Welcome to my Home Page</h1>
        <Link href="/users">
          <a>Go to Users page</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
