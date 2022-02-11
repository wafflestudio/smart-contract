import { useState } from 'react';

import classNames from 'classnames';
import Modal from 'react-modal';

import { useMetamaskContext } from '../../../contexts/metamaskContext';
import { Typography } from '../../atoms';
import { TokenInfo } from '../../organisms';

import { buy721, sell721 } from '../../pages/buyAndSell';
import styles from './home-token-list.module.scss';

export enum Token {
  GITHUB = 'Github',
  GITLAB = 'Gitlab',
  BITBUCKET = 'Bitbucket',
}

const tokenData = [
  { token: Token.GITHUB, src: 'https://cdn-icons-png.flaticon.com/512/25/25231.png' },
  { token: Token.GITLAB, src: 'https://cdn.worldvectorlogo.com/logos/gitlab.svg' },
  {
    token: Token.BITBUCKET,
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bitbucket-blue-logomark-only.svg/1200px-Bitbucket-blue-logomark-only.svg.png',
  },
];

interface Props {
  className?: string;
  tokenName?: string;
}

export const HomeTokenList = ({ className }: Props) => {
  const [openToken, setOpenToken] = useState<Token | null>(null);

  const { address } = useMetamaskContext();

  return (
    <>
      <section className={classNames(className, styles.wrapper)}>
        <button onClick={() => sell721(15, 15)}>SELLTEST</button>
        <button onClick={() => buy721(1)}>BUYTEST</button>
        <Typography as="h1">내 토큰</Typography>
        <Typography className={styles.description} as="h4">
          {address ? `내 주소: ${address}` : ''}
        </Typography>
        <div className={styles.previewList}>
          {tokenData.map(({ token, src }) => (
            <img key={token} className={styles.preview} src={src} alt={token} onClick={() => setOpenToken(token)} />
          ))}
        </div>
      </section>
      <Modal
        isOpen={openToken !== null}
        style={{ overlay: { zIndex: 9 } }}
        className={styles.modalContent}
        onRequestClose={() => setOpenToken(null)}
      >
        <TokenInfo openToken={openToken} />
      </Modal>
    </>
  );
};
