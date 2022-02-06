import { PropsWithChildren } from 'react';
import styles from './layout.module.scss';
import Head from 'next/head';

interface Props {}

export const Layout = ({ children }: PropsWithChildren<Props>): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head>
        <title>WaffleStudio ERC-1155</title>
        <meta name="description" content="wafflestudio erc 1155 token web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>Waffle Token DApp</header>

      <main className={styles.main}>{children}</main>
    </div>
  );
};
