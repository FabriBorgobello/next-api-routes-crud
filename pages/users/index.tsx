import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { User } from "@/types";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface Props {
  data: User[];
}

const Home = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Users Page</title>
      </Head>

      <main className={styles.main}>
        <h1>Welcome to my Users Page</h1>
        <p>Select a user to see more details:</p>
        <ul>
          {data?.map((user) => (
            <li key={user.id}>
              <Link href="/users/[id]" as={`/users/${user.id}`}>
                <a>{user.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let data = null;
  let error = null;

  try {
    const res = await fetch(`${process.env.API_URL}/users`);

    if (!res.ok) {
      error = { statusCode: res.status, message: res.statusText };
    } else {
      data = await res.json();
    }
  } catch (err) {
    error = err;
  }
  return {
    props: { data, error },
  };
};
