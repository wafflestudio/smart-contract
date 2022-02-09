import classNames from 'classnames';

import { Typography } from '../../atoms/typography/typography';

import styles from './home-token-list.module.scss';

interface Props {
  className?: string;
}

export const HomeTokenList = ({ className }: Props) => {
  return (
    <section className={classNames(className, styles.wrapper)}>
      <Typography as="h1">내 토큰</Typography>
      <Typography className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <div className={styles.previewList}>
        <img className={styles.preview} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
        <img className={styles.preview} src="https://cdn.worldvectorlogo.com/logos/gitlab.svg" />
        <img
          className={styles.preview}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png"
        />
      </div>
    </section>
  );
};
