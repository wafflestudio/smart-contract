import { PageTitle } from '../../molecule/page-title/page-title';
import { useAddress, useAddressTokenList, useTokenList } from './home.queries';
import { TokenList } from '../../organization/token-list/token-list';

import styles from './home.module.scss';
import { Typography } from '../../atom/typography/typography';
import { contract, provider } from '../../../library/ethers';
import { useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';

export const Home = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [tokenClaimName, setTokenClaimName] = useState<string>('');
  const { data: address, isLoading } = useAddress();

  const { data: tokenList } = useTokenList();
  const { data: myTokenList } = useAddressTokenList(address);

  const claimRandomWaffle = async () => {
    const signer = provider?.getSigner();
    const daiWithSigner = signer && contract?.connect(signer);
    try {
      // @ts-ignore
      await daiWithSigner?.claimRandomWaffle(tokenClaimName, [0, 1, 2]);
      setTokenClaimName('');
      toast.success(
        `Token [${tokenClaimName}] successfully claimed. It may take a few minutes to be applied.`
      );
      setCreateModalOpen(false);
    } catch (err) {}
  };

  return (
    <div>
      <PageTitle
        title={'Token List'}
        content={
          typeof window === 'undefined' || isLoading
            ? ''
            : address
            ? `logged in as ${address}`
            : 'Please check if metamask is connected.'
        }
      />
      <br />
      <Typography as={'h2'}>
        내 토큰
        <button
          style={{ height: 20, marginLeft: 8 }}
          onClick={() => setCreateModalOpen(true)}
        >
          +
        </button>
      </Typography>
      <TokenList className={styles.tokenListWrapper} tokenList={myTokenList} />
      <Typography as={'h2'}>모든 토큰</Typography>
      <TokenList className={styles.tokenListWrapper} tokenList={tokenList} />
      <Modal
        isOpen={isCreateModalOpen}
        style={{
          content: { width: 500, height: 200, margin: 'auto' },
        }}
        onRequestClose={() => {
          setCreateModalOpen(false);
          setTokenClaimName('');
        }}
      >
        Please enter token name to claim.
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={styles.tokenClaimForm}
        >
          <label>
            name
            <input
              value={tokenClaimName}
              onChange={(e) => setTokenClaimName(e.target.value)}
            />
          </label>
          <button onClick={claimRandomWaffle}>claim</button>
        </form>
      </Modal>
    </div>
  );
};
