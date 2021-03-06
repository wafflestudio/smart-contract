import { PropsWithChildren } from 'react';

import classNames from 'classnames';
import Head from 'next/head';
import Link from 'next/link';

import { WalletButton } from '../../molecules';

import styles from './layout.module.scss';

interface Props {
  title?: string;
  className?: string;
}

export const Layout = ({ children, title = 'Waffle Marketplace', className }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <div className={styles.text}>{title}</div>
        </Link>
        <WalletButton />
      </header>

      <main className={classNames(className, styles.main)}>{children}</main>

      <footer className={styles.footer} />
    </div>
  );
};
