import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta content="Rainbowkit connector example" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className={styles.main}>
        <div>
          <ConnectButton chainStatus="name" showBalance={true} />
        </div>
      </main>
    </>
  );
}
