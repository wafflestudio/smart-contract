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
      {address ? <p>{address}</p> : <p>+ wallet</p>}
    </button>
  );
};
