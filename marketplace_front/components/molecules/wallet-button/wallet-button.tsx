import classNames from 'classnames';
import toast from 'react-hot-toast';

import { useMetamaskContext } from '../../../contexts/metamaskContext';
import { connectWallet } from '../../../library/ether';

import styles from './wallet-button.module.scss';

interface Props {
  className?: string;
}

export const WalletButton = ({ className }: Props) => {
  const { address, setAddress, clearAddress } = useMetamaskContext();
  const onClickWallet = async () => {
    if (address) {
      clearAddress();
      toast.success(`metamask 계정 연결이 해제되었습니다.`);
      return;
    }

    try {
      const walletAddress = await connectWallet();
      if (!walletAddress) throw Error;
      setAddress(walletAddress);
      toast.success(`metamask 계정이 연결되었습니다.`);
    } catch (err) {
      toast.error('metamask 에 연결하던 중 오류가 발생했습니다.');
      clearAddress();
    }
  };

  return (
    <button
      className={classNames(className, styles.walletButton, address ? styles.connected : styles.disconnected)}
      onClick={onClickWallet}
      title={address ?? undefined}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/32px-MetaMask_Fox.svg.png"
        alt="metamask"
      />
      <span>{address ? '연결됨' : '연결되지 않음'}</span>
    </button>
  );
};
