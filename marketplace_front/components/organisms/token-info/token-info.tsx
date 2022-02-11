import { Waffle1155, Waffle721 } from '../../../library/ether';
import { Typography } from '../../atoms';

import styles from './token-info.module.scss';

interface Props {
  openToken: Waffle721 | Waffle1155 | null;
}

export const TokenInfo = ({ openToken }: Props) => {
  return (
    <>
      <Typography as="h2">{openToken ? openToken.name : '토큰 이름 없음'}</Typography>
      <button className={styles.smallButton}>↵</button>
    </>
  );
};
