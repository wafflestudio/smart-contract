import { useState } from 'react';

import toast from 'react-hot-toast';

import { provider } from '../../../library/ether';
import { Typography, Input, Button } from '../../atoms';

import styles from './create-token-modal-content.module.scss';

interface Props {
  close: () => void;
}

export const CreateTokenModalContent = ({ close }: Props) => {
  const [tokenClaimName, setTokenClaimName] = useState<string>('');

  const handleClick = async () => {
    const signer = provider?.getSigner();
    const contract = null; // FIXME: import contract

    toast('not implemented');

    // const daiWithSigner = signer && contract?.connect(signer);
    // try {
    //   await daiWithSigner?.claimRandomWaffle(tokenClaimName, [0, 1, 2]);
    //   toast.success(`${tokenClaimName} 토큰이 생성되었습니다.`);
    //   setTokenClaimName('');
    //   close();
    // } catch (err) {
    //   console.log(err);
    //   toast.error(`토큰 생성에 실패했습니다.`);
    // }
  };

  return (
    <>
      <Typography as="h2">Mint new token</Typography>
      <label className={styles.input}>
        이름
        <Input value={tokenClaimName} onChange={(e) => setTokenClaimName(e.target.value)} />
      </label>
      <Button className={styles.button} onClick={handleClick}>
        생성
      </Button>
    </>
  );
};
