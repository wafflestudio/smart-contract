import { useCallback, useState } from 'react';

import { Waffle1155, Waffle721 } from '../../../library/utils';
import { Typography } from '../../atoms';
import { sell721 } from '../../pages/buyAndSell';

import styles from './token-info.module.scss';

interface Props {
  openToken: Waffle721 | Waffle1155 | null;
  setOpenToken: (t: Waffle721 | Waffle1155 | null) => void;
}

export const TokenInfo = ({ openToken, setOpenToken }: Props) => {
  // 소수점 18자리
  const [price, setPrice] = useState<number>(0);
  const onChangePrice = useCallback((s: string) => {
    const n = Number(s);
    if (typeof n === 'number') {
      setPrice(n);
    }
    console.log(n);
  }, []);

  if (openToken) {
    return (
      <div className={styles.container}>
        <Typography as="h2">{openToken ? openToken.name : '토큰 이름 없음'}</Typography>
        <button onClick={() => sell721(price / (10 ^ 18), openToken.id)}>Sell Waffle!</button>
        <button className={styles.smallButton} onClick={() => setOpenToken(null)}>
          ↵
        </button>
        <label>
          <input type="number" min="0" value={price} onChange={(e) => onChangePrice(e.target.value)} />
        </label>
      </div>
    );
  } else return null;
};
