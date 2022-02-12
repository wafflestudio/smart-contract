import { useCallback, useState } from 'react';

import { sell721, sell1155 } from '../../../library/buyAndSell';
import { Waffle1155, Waffle721 } from '../../../library/utils';
import { NumberInput, Typography } from '../../atoms';

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
  }, []);

  const onClickSell = () => {
    if (openToken) {
      if ('metadata' in openToken) {
        sell1155(price, openToken.id);
        return;
      } else {
        sell721(price, openToken.id);
      }
    }
  };

  if (openToken) {
    return (
      <div className={styles.container}>
        <Typography as="h2">Token Name: {openToken ? openToken.name : '토큰 이름 없음'}</Typography>
        <label className={styles.input}>
          <Typography as="h3">판매가</Typography>
          <NumberInput min="0" value={price} onChange={(e) => onChangePrice(e.target.value)} />
        </label>
        <button className={styles.sellButton} onClick={() => onClickSell()}>
          Sell Waffle!
        </button>
        <button className={styles.smallButton} onClick={() => setOpenToken(null)}>
          ↵
        </button>
      </div>
    );
  } else return null;
};
