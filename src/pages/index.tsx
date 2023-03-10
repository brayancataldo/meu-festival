import { useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AiFillLinkedin } from "react-icons/ai";
import styles from "../styles/Home.module.scss";
import { Login } from "../components/Login";
import { Generate } from "../components/Generate";
import { AuthContext } from "../contexts/auth";
import { Navbar } from "../components/Navbar";

const Home: NextPage = () => {
  const { logged } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <Head>
        <meta property="og:image" content="/src/assets/bg-festival.png" />
        <title>Meu Festival</title>
        <meta
          name="description"
          content="Crie agora um line up com seus artistas preferidos!"
        />
        <meta name="twitter:card" content="summary_large" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />

      {logged ? <Generate /> : <Login />}

      <footer className={styles.footer}>
        <p>Criado por Brayan Cataldo</p>
        <a
          href="https://www.linkedin.com/in/brayan-cataldo-4a4930197/"
          target="_blank"
          rel="noreferrer"
          className={styles.bigButton}
        >
          <AiFillLinkedin size={28} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
