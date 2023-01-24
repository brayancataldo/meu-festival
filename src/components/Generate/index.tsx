import { useContext, useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { AiOutlineTwitter } from "react-icons/ai";
import axios from "axios";
import html2canvas from "html2canvas";
import { AuthContext } from "../../contexts/auth";
import styles from "./styles.module.scss";
import SpotifyLogo from "../../assets/Spotify_Logo_RGB_White.png";
import Image from "next/image";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
interface ArtistProps {
  id: string;
  name: string;
  popularity: number;
  textColor: string;
}

export function Generate() {
  const [artists, setArtists] = useState<ArtistProps[]>([]);
  const { user } = useContext(AuthContext);
  const url = window.location.href;
  const description =
    "Esse é meu line do Rock the Mountain! Crie agora o seu em www.meu-festival-brasil.vercel.app";

  useEffect(() => {
    axios
      .get(
        "https://api.spotify.com/v1/me/top/artists?limit=30&time_range=long_term",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => {
        const array = response.data.items.map(
          (item: ArtistProps, index: number) => {
            return {
              ...item,
              textColor:
                index % 3 == 0
                  ? "#F7C500"
                  : index % 2 == 0
                  ? "#5BDC2F"
                  : "#6582F0",
            };
          }
        );
        setArtists(array);
      });
  }, []);

  function download() {
    const element = document.querySelector("#festival") as HTMLElement;
    element.style.borderRadius = "0";
    html2canvas(element).then((canvas) => {
      var dataURL = canvas.toDataURL("image/png");
      var link = document.createElement("a");
      console.log(dataURL);
      link.href = dataURL;
      link.download = "meu-festival.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    element.style.borderRadius = "10px";
  }

  return (
    <main className={styles.main}>
      <div className={styles.festival} id="festival">
        <div className={styles.list}>
          {artists.slice(0, 2).map((artist) => {
            return (
              <span
                key={artist.id}
                style={{
                  color: artist.textColor,
                }}
                className={styles.one}
              >
                {artist.name.toUpperCase()}
              </span>
            );
          })}
          <br />
          {artists.slice(2, 10).map((artist) => {
            return (
              <span
                key={artist.id}
                style={{
                  color: artist.textColor,
                }}
                className={styles.two}
              >
                {artist.name.toUpperCase()}
              </span>
            );
          })}
          <br />
          {artists.slice(10, 30).map((artist) => {
            return (
              <span
                key={artist.id}
                style={{
                  color: artist.textColor,
                }}
                className={styles.three}
              >
                {artist.name.toUpperCase()}
              </span>
            );
          })}
          <a
            href="https://spotify.com/"
            target="_blank"
            rel="noreferrer"
            className={styles.bigButton}
          >
            <div className={styles.spotifyLogo}>
              <Image
                src={SpotifyLogo}
                objectFit="contain"
                alt="Ir para Spotify"
              />
            </div>
          </a>
        </div>
      </div>
      <div className={styles.shareContainer}>
        <button className={styles.spotifyButton} onClick={download}>
          Baixar <IoMdDownload />
        </button>
        {/* <a className={styles.shareButton}>
          <TwitterShareButton url={description} className={styles.shareButton}>
            Compartilhar <AiOutlineTwitter />
          </TwitterShareButton>
        </a> */}
      </div>
    </main>
  );
}
