import { PropsWithChildren } from 'react';

import classNames from 'classnames';
import Head from 'next/head';

import styles from './layout.module.scss';

interface Props {
  title?: string;
  className?: string;
}

export const Layout = ({ children, title = 'Waffle Token Marketplace', className }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>{title}</header>

      <main className={classNames(className, styles.main)}>{children}</main>

      <footer className={styles.footer} />
    </div>
  );
};
