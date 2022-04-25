import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { User } from "@/types";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface Props {
  data: User;
}

const UserDetailPage = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>User detail page</title>
      </Head>

      <main className={styles.main}>
        <h1>Welcome {data?.name}!</h1>
        <Link href="/users">
          <a>Go back to users page</a>
        </Link>
      </main>
    </div>
  );
};

export default UserDetailPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let data = null;
  let error = null;

  try {
    const res = await fetch(`${process.env.API_URL}/users/${ctx.query.id}`);

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
