import { useContext } from "react";
import styles from "../../styles/Home.module.scss";

import { Navbar } from "../../components/Navbar";
import { AuthContext } from "../../contexts/auth";
import { useRouter } from "next/dist/client/router";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div>
      <title>{user?.name}</title>
      <main className={styles.container}>
        <Navbar />
        <h1>{user?.name}</h1>
        <h1>Profile</h1>;
      </main>
    </div>
  );
}
