import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { connectWallet } from '../library/ether';

interface MetamaskContext {
  address?: string | null; // undefined -> 연결됐는지 아닌지 모름
  setAddress: (e: string) => void;
  clearAddress: () => void;
}

const initialValue: MetamaskContext = {
  address: null,
  setAddress: () => null,
  clearAddress: () => null,
};

const MetamaskContext = createContext<MetamaskContext>(initialValue);

interface Props {}

export const MetamaskProvider = ({ children }: PropsWithChildren<Props>) => {
  const [address, setAddress] = useState<MetamaskContext['address']>();

  const init = useCallback(async () => {
    const address = localStorage.getItem('address');

    if (!address) {
      setAddress(null);
      return;
    }

    try {
      const walletAddress = await connectWallet();
      if (!walletAddress) {
        toast.error('metamask 연결이 끊어졌습니다.');
        return;
      }
      setAddress(walletAddress);
    } catch (err) {
      toast.error('metamask 연결이 끊어졌습니다.');
      setAddress(null);
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <MetamaskContext.Provider
      value={{
        address,
        setAddress: (e) => {
          localStorage.setItem('address', e);
          setAddress(e);
        },
        clearAddress: () => {
          localStorage.removeItem('address');
          setAddress(null);
        },
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};

export const useMetamaskContext = () => useContext(MetamaskContext) as MetamaskContext;
