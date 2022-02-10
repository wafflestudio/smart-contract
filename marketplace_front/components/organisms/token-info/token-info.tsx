import { Typography } from '../../atoms/typography/typography';
import { Token } from '../../templates';

import styles from './token-info.module.scss';

interface Props {
  openToken: Token | null;
}

export const TokenInfo = ({ openToken }: Props) => {
  return (
    <>
      <Typography as="h2">{openToken}</Typography>
      <button className={styles.smallButton}>↵</button>
    </>
  );
};
