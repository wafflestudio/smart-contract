import { PropsWithChildren } from 'react';
import styles from '../../../styles/Home.module.css';
import Head from 'next/head';

interface Props {}

const Layout = ({ children }: PropsWithChildren<Props>): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head>
        <title>WaffleStudio ERC-1155</title>
        <meta name="description" content="wafflestudio erc 1155 token web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer} />
    </div>
  );
};

export default Layout;
