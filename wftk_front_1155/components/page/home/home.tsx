import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { PageTitle } from '../../molecule/page-title/page-title';

export const Home = () => {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>();
  const [address, setAddress] = useState<string | null>();

  const init = useCallback(async () => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    setSigner(signer);
    const address = await signer.getAddress();
    setAddress(address);
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
