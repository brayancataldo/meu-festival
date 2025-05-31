"use client";

import React, { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import axios from "axios";
import styles from "./styles.module.scss";

export function Login() {
  const [spotifyOAuth, setSpotifyOAuth] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/api/oauth").then((response) => {
      setSpotifyOAuth(response.data.link);
    });
  }, []);

  return (
    <main className={styles.main}>
      <h2>Line dos Sonhos </h2>
      <p>
        Já pensou em ir no festival feito para você? Descubra agora como seria o
        seu Line Up dos Sonhos!
      </p>

      <a href={spotifyOAuth} className={styles.aba}>
        <button className={styles.spotifyButton}>
          Entrar com Spotify <FaSpotify />
        </button>
      </a>
    </main>
  );
}
