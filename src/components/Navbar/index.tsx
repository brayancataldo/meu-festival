import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Logo from "../../assets/Logo.png";
import Image from "next/image";
import { AuthContext } from "../../contexts/auth";
import axios from "axios";
import Link from "next/link";

export function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const [spotifyOAuth, setSpotifyOAuth] = useState("");

  useEffect(() => {
    axios.get("/api/oauth").then((response) => {
      setSpotifyOAuth(response.data.link);
    });
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link href="/" passHref>
        <button className={styles.bigButton}>
          <div className={styles.containerLogo}>
            <Image
              src={Logo}
              width={120}
              height={60}
              objectFit="contain"
              alt="Logo Meu Festival"
              className={styles.logo}
            />
          </div>
        </button>
      </Link>
      <div>
        {user ? (
          <div className={styles.containerHeader}>
            <button className={styles.bigButton}>
              <div className={styles.containerProfile}>
                <span>{user.name}</span>
                <Image
                  loader={() => user.image}
                  width={34}
                  height={34}
                  // layout="fill"
                  src={user?.image}
                  objectFit="contain"
                  alt="Logo Meu Festival"
                  className={styles.userImage}
                />
              </div>
            </button>

            <button className={styles.bigButton} onClick={logOut}>
              Sair
            </button>
          </div>
        ) : (
          <a href={spotifyOAuth} className={styles.bigButton}>
            Entrar
          </a>
        )}
      </div>
    </nav>
  );
}
