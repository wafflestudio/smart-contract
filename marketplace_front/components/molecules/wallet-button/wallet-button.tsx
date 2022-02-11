import { useState } from 'react';

import classNames from 'classnames';

import { connectWallet } from '../../../library/ether';

import styles from './wallet-button.module.scss';

interface Props {
  className?: string;
}

export const WalletButton = ({ className }: Props) => {
  const [address, setAddress] = useState<string | null>(null);
  const onClickWallet = async () => {
    if (address) {
      setAddress(null);
      return;
    }
    const walletAddress = await connectWallet();
    setAddress(walletAddress ?? null);
  };

  return (
    <button className={classNames(className, styles.walletButton)} onClick={() => onClickWallet()}>
      {address ? (
        <div className={styles.connected}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/32px-MetaMask_Fox.svg.png"
            alt="metamask"
          />
          <p>연결됨</p>
        </div>
      ) : (
        <div>
          <p>연결되지 않음</p>
        </div>
      )}
    </button>
  );
};
