import { useEffect, useState } from 'react';

import classNames from 'classnames';
import Modal from 'react-modal';

import { useMetamaskContext } from '../../../contexts/metamaskContext';
import { Waffle721, Waffle1155, get721Waffles, get1155Waffles } from '../../../library/utils';
import { Typography } from '../../atoms';
import { WaffleDisplay } from '../../molecules';
import { TokenInfo } from '../../organisms';
import { buy721, sell721 } from '../../pages/buyAndSell';

import styles from './home-token-list.module.scss';

interface Props {
  className?: string;
  tokenName?: string;
}

export const HomeTokenList = ({ className }: Props) => {
  const [openToken, setOpenToken] = useState<Waffle721 | Waffle1155 | null>(null);
  const [waffles721, setWaffles721] = useState<Waffle721[]>([]);
  const [waffles1155, setWaffles1155] = useState<Waffle1155[]>([]);
  const { address } = useMetamaskContext();

  // TODO: react-query 사용해서 loading spinner 보여주기
  useEffect(() => {
    async function fetchList(a?: string | null) {
      if (a) {
        const w721: Waffle721[] = await get721Waffles(a);
        const w1155: Waffle1155[] = await get1155Waffles(a);
        setWaffles721(w721);
        setWaffles1155(w1155);
      } else {
        setWaffles721([]);
        setWaffles1155([]);
      }
    }
    if (address) {
      fetchList(address);
    }
    if (!address) {
      setWaffles721([]);
      setWaffles1155([]);
    }
  }, [address]);

  return (
    <>
      <section className={classNames(className, styles.wrapper)}>
        <button onClick={() => sell721(7, 15)}>SELLTEST</button>
        <button onClick={() => buy721(1, 8)}>BUYTEST</button>
        <Typography as="h1">내 토큰</Typography>
        <Typography className={styles.description} as="h4">
          {address ? `내 주소: ${address}` : ''}
        </Typography>
        <div className={styles.previewList}>
          {/* 721Tokens */}
          {waffles721.map((token) => (
            <WaffleDisplay className={styles.preview} key={`waffle721-${token.id}`} token={token} setOpenToken={setOpenToken} />
          ))}
          {waffles1155.map((token) => (
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{ __html: atob(token.metadata.substring(29)).split('"svg" : "')[1].slice(0, -2) }}
              key={`waffle1155-${token.id}`}
              onClick={() => setOpenToken(token)}
            />
          ))}
        </div>
      </section>
      <Modal
        isOpen={openToken !== null}
        style={{ overlay: { zIndex: 9 } }}
        className={styles.modalContent}
        onRequestClose={() => setOpenToken(null)}
      >
        <TokenInfo openToken={openToken} setOpenToken={setOpenToken} />
      </Modal>
    </>
  );
};
