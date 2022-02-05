import { useCallback, useEffect, useState } from 'react';
import { PageTitle } from '../../molecule/page-title/page-title';
import { provider } from '../../../library/ethers';
import toast from 'react-hot-toast';

export const Home = () => {
  const [error, setError] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>();

  const init = useCallback(async () => {
    if (!provider) {
      setError(true);
      toast.error('Metamask 에 연결되어 있는지 확인해 주세요.');
      return;
    }

    const res = await provider.send('eth_requestAccounts', []);
    setAddress(res[0]);
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <PageTitle title={'My Token List'} content={`logged in as ${address}`} />
    </div>
  );
};
