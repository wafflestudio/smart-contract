import { ChangeEventHandler, useState } from 'react';

import { ethers } from 'ethers';
import toast from 'react-hot-toast';

import { provider, erc721Contract, erc1155Contract } from '../../../library/ether';
import { Typography, Input, Button } from '../../atoms';
import { Radio } from '../../molecules';

import styles from './create-token-modal-content.module.scss';

interface Props {
  close: () => void;
}

enum TokenType {
  ERC1155 = 'ERC-1155',
  ERC721 = 'ERC-721',
}

export const CreateTokenModalContent = ({ close }: Props) => {
  const [tokenClaimName, setTokenClaimName] = useState<string>('');
  const [tokenShape, setTokenShape] = useState<{ hor: [number, number]; ver: [number, number] }>({ hor: [0, 6], ver: [0, 6] });
  const [tokenType, setTokenType] = useState<TokenType | null>(null);

  const handleClick = async () => {
    if (!tokenType) return;

    const signer = provider?.getSigner();

    try {
      if (tokenType === TokenType.ERC721) {
        const daiWithSigner = signer && erc721Contract?.connect(signer);
        console.log(daiWithSigner);
        await daiWithSigner?.claim(tokenClaimName, tokenShape.hor, tokenShape.ver, { value: ethers.utils.parseEther('0.00001') });
      } else {
        const daiWithSigner = signer && erc1155Contract?.connect(signer);
        await daiWithSigner?.claimRandomWaffle(tokenClaimName, [0, 1, 2], { value: ethers.utils.parseEther('0.0001') }); // [0,1,2] 는 아무 값
      }
      toast.success(`${tokenClaimName} 토큰이 생성되었습니다.`);

      setTokenClaimName('');
      setTokenShape({ hor: [0, 6], ver: [0, 6] });
      close();
    } catch (err) {
      console.log(err);
      toast.error(`토큰 생성에 실패했습니다.`);
    }
  };

  const handleShapeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target as HTMLInputElement;
    const nValue = Number(value);

    if (nValue < 0 || nValue > 6) return;

    switch (name) {
      case 'hor[1]':
        return setTokenShape((s) => ({ ...s, hor: [nValue, s.hor[1]] }));
      case 'hor[2]':
        return setTokenShape((s) => ({ ...s, hor: [s.hor[0], nValue] }));
      case 'ver[1]':
        return setTokenShape((s) => ({ ...s, ver: [nValue, s.ver[1]] }));
      case 'ver[2]':
        return setTokenShape((s) => ({ ...s, ver: [s.ver[0], nValue] }));
    }
  };

  return (
    <>
      <Typography as="h2">Mint new token</Typography>
      <Radio<TokenType>
        className={styles.radio}
        name="token-type"
        value={tokenType}
        setValue={setTokenType}
        options={[
          { label: TokenType.ERC721, value: TokenType.ERC721 },
          { label: TokenType.ERC1155, value: TokenType.ERC1155 },
        ]}
      />
      <label className={styles.input}>
        이름
        <Input value={tokenClaimName} onChange={(e) => setTokenClaimName(e.target.value)} />
      </label>
      {tokenType === TokenType.ERC721 && (
        <form className={styles.mintShapeForm}>
          <label>
            가로
            <input type="number" name="hor[1]" value={tokenShape.hor[0]} onChange={handleShapeChange} />~
            <input type="number" name="hor[2]" value={tokenShape.hor[1]} onChange={handleShapeChange} />
          </label>
          <br />
          <label>
            세로
            <input type="number" name="ver[1]" value={tokenShape.ver[0]} onChange={handleShapeChange} />~
            <input type="number" name="ver[2]" value={tokenShape.ver[1]} onChange={handleShapeChange} />
          </label>
        </form>
      )}
      <Button className={styles.button} onClick={handleClick}>
        생성
      </Button>
    </>
  );
};
